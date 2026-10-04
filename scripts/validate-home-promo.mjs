import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve, posix } from 'node:path';
import { configuredBasePath } from './site-base-path.mjs';

const root = resolve(process.argv[2] || '_site');
const base = configuredBasePath();
const origin = 'https://noonisawesome.dev';
const promo = JSON.parse(readFileSync('_data/promo.json', 'utf8'));
const files = [];
function walk(dir, prefix = '') {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = posix.join(prefix, item.name);
    if (item.isDirectory()) walk(join(dir, item.name), path);
    else if (item.name.endsWith('.html')) files.push(path);
  }
}
walk(root);
const errors = [];
for (const file of files) {
  const html = readFileSync(join(root, file), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const [, raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = raw.replaceAll('&amp;', '&');
    if (/^(?:#|mailto:|tel:|data:|javascript:|https?:\/\/|\/\/)/i.test(value) && !value.startsWith(origin + '/')) continue;
    const url = new URL(value, `${origin}${base}${file}`);
    if (url.origin !== origin) continue;
    let path = decodeURIComponent(url.pathname);
    if (!path.startsWith(base)) { errors.push(`${file}: outside base path ${value}`); continue; }
    path = path.slice(base.length);
    if (path.endsWith('/') || !path) path += 'index.html';
    if (!existsSync(join(root, path))) errors.push(`${file}: missing target ${value}`);
  }
}
assert.deepEqual(errors, [], 'Every rendered internal link and asset must resolve');
for (const lang of ['zh-TW', 'zh-CN', 'en', 'ja', 'ko']) {
  const page = `${lang === 'zh-TW' ? '' : lang + '/'}index.html`;
  const html = readFileSync(join(root, page), 'utf8');
  const video = html.match(/<video\b[^>]*data-hero-promo[^>]*>/)?.[0];
  assert.ok(video, `${page}: video missing`);
  for (const attribute of ['muted', 'playsinline', 'controls']) assert.ok(new RegExp(`\\b${attribute}\\b`).test(video), `${page}: ${attribute}`);
  assert.ok(!/\b(?:autoplay|loop)\b/.test(video), `${page}: JS must check motion/data preferences before playing`);
  assert.ok(video.includes(`poster="${base}${promo.poster.slice(1)}"`), `${page}: real film poster`);
  assert.ok(html.includes(`src="${base}${promo.source.slice(1)}"`), `${page}: film URL`);
  assert.equal((html.match(/<track\b/g) || []).length, 5, `${page}: translated captions`);
  assert.ok(html.includes('data-hero-replay hidden'), `${page}: progressive replay control`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  const graph = graphs.find(value => value['@graph']?.some(item => item['@type'] === 'VideoObject'))?.['@graph'];
  assert.ok(graph, `${page}: product and video metadata`);
  const film = graph.find(item => item['@type'] === 'VideoObject');
  assert.equal(film.contentUrl, origin + promo.source);
  assert.equal(film.thumbnailUrl, origin + promo.poster);
  assert.equal(film.duration, 'PT30S');
  assert.equal(graph.find(item => item['@type'] === 'SoftwareApplication').operatingSystem, 'Windows');
}
assert.ok(readFileSync(join(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('noonisawesome.github.io'));
for (const lang of ['zh-TW', 'zh-CN', 'en', 'ja', 'ko']) assert.ok(readFileSync(join(root, `assets/videos/s3s-home-promo-${lang}.vtt`), 'utf8').startsWith('WEBVTT'));
console.log(`Homepage video/SEO verified in 5 languages; internal targets verified across ${files.length} HTML pages.`);
