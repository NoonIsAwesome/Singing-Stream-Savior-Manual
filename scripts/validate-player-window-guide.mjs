// Read-only documentation regression; no HTTP calls, player execution or counter writes.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, join} from 'node:path';
const root = resolve(process.argv[2] || '_site');
const data = JSON.parse(readFileSync('_data/player_window_buttons.json','utf8'));
const image = readFileSync('assets/images/demo-lyrics-preview.png');
assert.equal(image.readUInt32BE(16),1510);
assert.equal(image.readUInt32BE(20),940);
// Crop coordinates are tied to an existing real screenshot, not a reconstructed UI.
const blob = createHash('sha1').update(Buffer.from(`blob ${image.length}\0`)).update(image).digest('hex');
assert.equal(blob,'2730b6b8fbcf4aea6728bc26b7727405d6ded863','Screenshot changed: recheck annotation coordinates visually');
for(const lang of ['zh-TW','zh-CN','en','ja','ko']) {
  const copy=data[lang];
  for(const key of ['title','intro','lyrics_title','lyrics_body','youtube_title','youtube_body','modes','caption','image_alt','full_image','lyrics_section','youtube_section','obs_section','viewer_alt','viewer_caption','viewer_help'])
    assert.ok(typeof copy?.[key]==='string'&&copy[key].trim(),`${lang}: ${key}`);
  const path=lang==='zh-TW'?'lyrics.html':`${lang}/guide.html`;
  const html=readFileSync(join(root,path),'utf8');
  assert.equal((html.match(/id="player-window-buttons"/g)||[]).length,1,`${path}: one guide block only`);
  assert.ok(html.includes(copy.title)&&html.includes(copy.lyrics_title)&&html.includes(copy.youtube_title),`${path}: translated headings missing`);
  assert.ok(html.includes('viewBox="1048 224 456 292"'));
  assert.ok(html.includes('href="/Singing-Stream-Savior-Manual/assets/images/demo-lyrics-preview.png"'));
  assert.ok(html.includes('role="img"')&&html.includes('player-window-buttons-title'));
  const ids=['lyrics-window','player-window-buttons','youtube-video-window','lyrics-preview-obs'];
  for(const id of ids) assert.equal((html.match(new RegExp(`id="${id}"`, 'g'))||[]).length,1,`${path}: unique ${id}`);
  const positions=ids.map(id=>html.indexOf(`id="${id}"`));
  assert.ok(positions.every((value,index)=>index===0||value>positions[index-1]),`${path}: Lyrics Window, YouTube, OBS must be separate and ordered`);
  const level=lang==='zh-TW'?2:3;
  assert.ok(html.includes(`<h${level} id="lyrics-window">${copy.lyrics_section}</h${level}>`));
  assert.ok(html.includes(`<h${level} id="youtube-video-window">${copy.youtube_section}</h${level}>`));
  assert.ok(html.slice(positions[3],positions[3]+240).includes(copy.obs_section),`${path}: OBS heading missing`);
  const imagePath=`assets/images/${lang==='zh-TW'?'':lang+'/'}lyrics-viewer.png`;
  const viewer=new RegExp(`<img[^>]+src="/Singing-Stream-Savior-Manual/${imagePath.replaceAll('.','\\.')}"[^>]*>`, 'g');
  const viewerTags=[...html.matchAll(viewer)];
  assert.equal(viewerTags.length,1,`${path}: one real opened-window screenshot, not duplicated`);
  assert.ok(viewerTags[0].index>positions[1]&&viewerTags[0].index<positions[2],`${path}: opened window image belongs in Lyrics Window section`);
  assert.ok(viewerTags[0][0].includes(`alt="${copy.viewer_alt}"`),`${path}: localized screenshot alternative text`);
  assert.ok(viewerTags[0][0].includes('loading="lazy"'));
  assert.ok(html.includes(copy.viewer_caption),`${path}: localized screenshot caption`);
  const viewerBytes=readFileSync(imagePath);
  assert.equal(viewerBytes.toString('hex',0,8),'89504e470d0a1a0a');
  assert.deepEqual(readFileSync(join(root,imagePath)),viewerBytes,`${path}: original screenshot published unchanged`);
  const obsImage=lang==='zh-TW'?'assets/images/demo-lyrics-preview.png':`assets/images/${lang}/lyrics-reading-preview.png`;
  assert.ok(html.slice(positions[3]).includes(obsImage),`${path}: existing OBS preview screenshot retained`);
  console.log(`${path}: separate reader/video/OBS sections, opening-button crop and localized opened-window screenshot verified`);
}
console.log('Player window guide validation passed; no external requests.');
