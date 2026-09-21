// Documentation regression only: no HTTP requests, audio execution or counter writes.
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
const root=resolve(process.argv[2] || '_site');
const base='/Singing-Stream-Savior-Manual/';
const copy=JSON.parse(readFileSync('_data/stream_routes.json','utf8'));
const locales=['zh-TW','en','ja','ko','zh-CN'];
const order=['output-obs','output-discord','route-modes','singing-profile-defaults','audio-reference'];
const strip=s=>s.replace(/<!--[\s\S]*?-->/g,'');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const attr=(tag,name)=>tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`))?.[1];
for(const lang of locales){
  const prefix=lang==='zh-TW'?'':lang+'/';
  const ap=prefix+'advanced-streaming.html',pp=prefix+'profiles.html';
  const audio=strip(readFileSync(join(root,ap),'utf8'));
  const profile=strip(readFileSync(join(root,pp),'utf8'));
  const positions=order.map(id=>audio.indexOf(`id="${id}"`));
  assert.ok(positions.every(p=>p>=0),`${lang}: output/mode/default/reference sections required`);
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b),`${lang}: task-first order`);
  for(const id of [...order,'advanced-quick-start','obs-output-walkthrough-title','discord-output-walkthrough-title','vb-cable-installation','what-is-a-profile'])
    assert.equal(audio.split(`id="${id}"`).length-1,1,`${lang}: unique ${id}`);
  const tags=audio.match(/<nav\b[^>]*class="[^"]*audio-output-targets[^"]*"[\s\S]*?<\/nav>/)?.[0] || '';
  assert.ok(tags.includes('href="#output-obs"')&&tags.includes('href="#output-discord"'));
  assert.equal((tags.match(/<a\s/g)||[]).length,2,`${lang}: exactly two destination tags`);
  assert.ok(audio.indexOf(tags)<positions[0] && audio.indexOf(tags)>audio.indexOf('data-article-lead'));
  assert.ok(audio.indexOf('id="what-is-a-profile"')>positions[3],`${lang}: profile definition after output tasks`);
  for(const [type,count] of [['obs',4],['discord',5],['default',3]]){
    assert.equal(copy[lang][type+'_steps'].length,count);
    assert.equal(audio.split(`data-route-steps="${type}"`).length-1,1);
    for(const step of copy[lang][type+'_steps'])assert.ok(decode(audio).includes(step.title),`${lang}: missing ${step.title}`);
  }
  const obs=audio.slice(positions[0],positions[1]),dc=audio.slice(positions[1],positions[2]);
  assert.ok(obs.includes('13-obs-add-s3s-audio-source.png'));
  assert.ok(dc.includes('28-discord-virtual-input.png')&&dc.includes('29-discord-studio-mode.png'));
  for(const image of ['01-official-download.jpg','02-extracted-folder.jpg','03-run-x64-setup.jpg','04-install-driver.jpg','05-restart-required.jpg'])
    assert.ok(dc.includes('/vb-cable/'+image),`${lang}: installation moved with Discord`);
  assert.ok(dc.includes('CABLE Input')&&dc.includes('CABLE Output'));
  assert.ok(audio.includes(base+pp),`${lang}: routing links to own Profile chapter`);
  assert.ok(!audio.includes('class="effect-editor-gallery"'),`${lang}: full effects belong in separate chapter`);
  assert.ok(profile.includes('id="profile-prerequisite"'));
  assert.ok(decode(profile).includes(copy[lang].profile_pre),`${lang}: advanced-routing prerequisite`);
  assert.ok(profile.indexOf('id="profile-prerequisite"')<profile.indexOf('id="profile-chain-heading"'));
  assert.ok(profile.includes(base+ap+'#singing-profile-defaults'));
  assert.ok(profile.includes('profile-horizontal-rack.png')&&profile.includes('profile-vertical-rack.png'));
  assert.ok(profile.includes('effect-editors/')&&profile.includes('VST3'));
  const nav=profile.match(/<ol class="chapter-list">[\s\S]*?<\/ol>/)?.[0] || '';
  assert.ok(new RegExp(`href="${base}${pp}"[^>]*aria-current="page"`).test(nav),`${lang}: current Profile chapter`);
  for(const alternate of locales){
    const alternatePath=base+(alternate==='zh-TW'?'':alternate+'/')+'profiles.html';
    assert.ok([...profile.matchAll(/<option\b[^>]*>/g)].some(([tag])=>attr(tag,'data-lang')===alternate&&attr(tag,'value')===alternatePath),`${lang}: Profile language switch ${alternate}`);
  }
  for(const [path,html] of [[ap,audio],[pp,profile]]){
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,`${path}: duplicate IDs`);
    for(const [,url] of html.matchAll(/<(?:a|img|image)\b[^>]*(?:src|href)="([^"]+)"/g)){
      if(!url.startsWith(base))continue;
      const file=decode(url.slice(base.length)).split(/[?#]/)[0];
      assert.ok(existsSync(join(root,file+(file===''||file.endsWith('/')?'index.html':''))),`${path}: missing ${file}`);
    }
  }
  console.log(`${lang}: OBS, Discord, mode/default order, separate Profiles, illustrations and navigation passed`);
}
console.log('Audio documentation regression passed. This is not an audio/hardware test.');
