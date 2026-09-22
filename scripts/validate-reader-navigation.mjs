import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(process.argv[2] || '_site');
const base='/Singing-Stream-Savior-Manual/';
const chapters=JSON.parse(readFileSync('_data/chapters.json','utf8'));
const locales=['zh-TW','en','ja','ko','zh-CN'];
const errors=[];const files=[];
const walk=dir=>{for(const name of readdirSync(dir)){const file=join(dir,name);if(statSync(file).isDirectory())walk(file);else if(name.endsWith('.html'))files.push(file);}};walk(root);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"');
const documents=new Map(files.map(file=>{const html=readFileSync(file,'utf8');const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>decode(m[1]));return [relative(root,file).split(sep).join('/'),{html,ids:new Set(ids),duplicate:ids.length!==new Set(ids).size}];}));
let links=0;
for(const [file,doc] of documents){
 if(doc.duplicate)errors.push(`${file}: duplicate IDs`);
 for(const [tag] of doc.html.matchAll(/<img\b[^>]*>/gi)){
  const src=tag.match(/\ssrc=(["'])(.*?)\1/i)?.[2];if(!src)continue;
  const url=new URL(decode(src),'https://manual.invalid'+base+file);
  if(url.origin==='https://manual.invalid'&&url.pathname.startsWith(base)&&/\.png$/i.test(url.pathname)){
   if(!/\swidth=["'][1-9]\d*["']/i.test(tag)||!/\sheight=["'][1-9]\d*["']/i.test(tag))errors.push(file+': PNG has no reserved dimensions: '+src);
  }
 }

 if(/\{%\s*(?:include|include_relative|assign|capture|for|if|endif)\b/.test(doc.html))errors.push(`${file}: unrendered Liquid`);
 for(const [,raw] of doc.html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)){
  const url=new URL(decode(raw),'https://manual.invalid'+base+file);
  if(url.origin!=='https://manual.invalid'||!url.pathname.startsWith(base))continue;
  let target=decodeURIComponent(url.pathname.slice(base.length));if(!target||target.endsWith('/'))target+='index.html';
  if(!existsSync(join(root,target))){errors.push(`${file}: missing link ${raw}`);continue;}
  links++;
  if(url.hash&&documents.has(target)){
   const id=decodeURIComponent(url.hash.slice(1));
   if(!documents.get(target).ids.has(id))errors.push(`${file}: missing fragment ${raw}`);
  }
 }
}
for(const lang of locales){
 const prefix=lang==='zh-TW'?'':lang+'/';
 const expectedPath=chapter=>base+(lang==='zh-TW'?chapter.key+'.html':chapter.standalone?prefix+chapter.key+'.html':prefix+'guide.html#'+chapter.key);
 for(const chapter of chapters){
  const file=lang==='zh-TW'||chapter.standalone?prefix+chapter.key+'.html':prefix+'guide.html';
  const html=documents.get(file)?.html||'';
  const aside=html.match(/<aside\b[^>]*id="guide-nav"[\s\S]*?<\/aside>/)?.[0]||'';
  for(const entry of chapters){
   const links=[...aside.matchAll(/<a\b[^>]*>/g)].map(m=>m[0]).filter(tag=>tag.includes(`data-chapter-key="${entry.key}"`));
   if(links.length!==1||!links[0].includes(`href="${expectedPath(entry)}"`))errors.push(`${file}: chapter ${entry.key} destination or count`);
  }
  if(!aside.includes('class="sidebar-close"'))errors.push(`${file}: missing mobile close control`);
  if(chapter.number&&(lang==='zh-TW'||chapter.standalone)){
   const footer=html.match(/<nav class="chapter-navigation"[\s\S]*?<\/nav>/)?.[0]||'';
   for(const [rel,num] of [['prev',chapter.number-1],['next',chapter.number+1]]){
    const entry=chapters.find(c=>c.number===num);if(!entry)continue;
    if(!footer.includes(`rel="${rel}" href="${expectedPath(entry)}"`))errors.push(`${file}: wrong ${rel} chapter`);
   }
  }
 }
 const home=documents.get(prefix+'index.html')?.html||'';
 for(const image of ['full-workspace.png','mini-workspace.png','lyrics-reading-preview.png','profile-horizontal-rack.png']){
  if(!home.includes(`/assets/images/${prefix}${image}`))errors.push(`${prefix}index.html: screenshot is not localized: ${image}`);
 }
}
const guide=documents.get('guide.html');
for(const id of ['player-window-buttons','lyrics-window','first-stream-check'])if(!guide?.ids.has(id))errors.push(`guide.html: missing included content ${id}`);
for(const chapter of chapters.filter(c=>c.number)){
 if(chapter.standalone){if(!guide.html.includes(`href="${base}${chapter.key}.html"`))errors.push(`guide.html: missing standalone ${chapter.key}`);}
 else if(!guide.ids.has(chapter.key))errors.push(`guide.html: missing base chapter ${chapter.key}`);
}
assert.deepEqual(errors,[],errors.join('\n'));
console.log(`Reader navigation: ${documents.size} HTML files, ${links} internal links, five-language chapter paths, nested guide content and localized images passed.`);