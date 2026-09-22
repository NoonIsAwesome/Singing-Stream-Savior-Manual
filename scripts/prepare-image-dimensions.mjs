import { readdirSync, statSync, readFileSync, writeFileSync, openSync, readSync, closeSync, existsSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';

const root = resolve(process.argv[2] || '_site');
const base = '/Singing-Stream-Savior-Manual/';
const dimensions = new Map();
const attributeValue = (tag, name) => {
  const match = tag.match(new RegExp('\\s' + name + '\\s*=\\s*(?:"([^"]*)"|\x27([^\x27]*)\x27|([^\\s>]+))', 'i'));
  return match ? match[1] ?? match[2] ?? match[3] : null;
};
let changedImages = 0;
let changedPages = 0;

function pngSize(file) {
  if (dimensions.has(file)) return dimensions.get(file);
  const header = Buffer.alloc(24);
  const descriptor = openSync(file, 'r');
  let length;
  try { length = readSync(descriptor, header, 0, header.length, 0); }
  finally { closeSync(descriptor); }
  const size = length === 24 && header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    ? { width: header.readUInt32BE(16), height: header.readUInt32BE(20) } : null;
  dimensions.set(file, size);
  return size;
}

function processPage(file) {
  const original = readFileSync(file, 'utf8');
  const page = relative(root, file).split(sep).join('/');
  const html = original.replace(/<img\b[^>]*>/gi, tag => {
    const source = tag.match(/\ssrc=(["'])(.*?)\1/i)?.[2];
    if (!source) return tag;
    const url = new URL(source.replace(/&amp;/g, '&'), 'https://manual.invalid' + base + page);
    if (url.origin !== 'https://manual.invalid' || !url.pathname.startsWith(base)) return tag;
    const image = resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    if (!image.startsWith(root + sep) || !existsSync(image) || !/\.png$/i.test(image)) return tag;
    const widthAttr = attributeValue(tag, 'width');
    const heightAttr = attributeValue(tag, 'height');
    if (widthAttr !== null && heightAttr !== null) return tag;
    const size = pngSize(image);
    if (!size?.width || !size.height) return tag;
    if ((widthAttr !== null && !/^\d+$/.test(widthAttr)) || (heightAttr !== null && !/^\d+$/.test(heightAttr))) return tag;
    let width = widthAttr !== null ? Number(widthAttr) : size.width;
    let height = heightAttr !== null ? Number(heightAttr) : size.height;
    if (widthAttr !== null) height = Math.max(1, Math.round(width * size.height / size.width));
    if (heightAttr !== null) width = Math.max(1, Math.round(height * size.width / size.height));
    const attrs = (widthAttr === null ? ` width="${width}"` : '') + (heightAttr === null ? ` height="${height}"` : '');
    changedImages++;
    return tag.replace(/\s*\/?\s*>$/, ending => attrs + ending);
  });
  if (html !== original) { writeFileSync(file, html); changedPages++; }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (name.endsWith('.html')) processPage(file);
  }
}
walk(root);
console.log(`Reserved intrinsic PNG image dimensions: ${changedImages} images across ${changedPages} pages.`);
