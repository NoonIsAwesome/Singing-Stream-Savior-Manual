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
  for(const key of ['title','intro','lyrics_title','lyrics_body','youtube_title','youtube_body','modes','caption','image_alt','full_image'])
    assert.ok(typeof copy?.[key]==='string'&&copy[key].trim(),`${lang}: ${key}`);
  const path=lang==='zh-TW'?'lyrics.html':`${lang}/guide.html`;
  const html=readFileSync(join(root,path),'utf8');
  assert.equal((html.match(/id="player-window-buttons"/g)||[]).length,1,`${path}: one guide block only`);
  assert.ok(html.includes(copy.title)&&html.includes(copy.lyrics_title)&&html.includes(copy.youtube_title),`${path}: translated headings missing`);
  assert.ok(html.includes('viewBox="1048 224 456 292"'));
  assert.ok(html.includes('href="/Singing-Stream-Savior-Manual/assets/images/demo-lyrics-preview.png"'));
  assert.ok(html.includes('role="img"')&&html.includes('player-window-buttons-title'));
  console.log(`${path}: fixed-button guide, screenshot crop and language verified`);
}
console.log('Player window guide validation passed; no external requests.');
