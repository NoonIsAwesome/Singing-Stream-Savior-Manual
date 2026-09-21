import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const ids = ['desktop-data', 'offline-use', 'online-services', 'website-statistics', 'local-storage', 'diagnostics', 'policy-changes'];
const data = JSON.parse(readFileSync(new URL('../_data/privacy.json', import.meta.url), 'utf8'));
assert.match(data.updated, /^\d{4}-\d{2}-\d{2}$/);
const prefix = lang => lang === 'zh-TW' ? '' : `${lang}/`;
for (const lang of locales) {
  const copy = data[lang];
  assert.ok(copy, `${lang}: missing privacy translation`);
  for (const key of ['title', 'summary', 'scope', 'contact_title', 'contact_text', 'contact_label', 'sources_title', 'updated_label'])
    assert.ok(typeof copy[key] === 'string' && copy[key].trim(), `${lang}: missing ${key}`);
  assert.deepEqual(copy.sections.map(s => s.id), ids, `${lang}: incomplete privacy sections`);
  for (const section of copy.sections) {
    assert.ok(section.title && section.paragraphs.length);
    assert.ok(section.paragraphs.every(p => typeof p === 'string' && p.trim() && !/[<>]/.test(p)), 'Privacy paragraphs must be plain text');
  }
  const front = readFileSync(new URL(`../${prefix(lang)}privacy.md`, import.meta.url), 'utf8');
  assert.ok(front.includes(`lang: ${lang}`) && front.includes('translation_key: privacy'));
}
console.log('Privacy source validation passed: five languages and seven scoped sections. Not a legal-compliance certification.');
if (process.argv[2]) {
  const root = resolve(process.argv[2]), base = '/Singing-Stream-Savior-Manual/';
  const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
  const text = html => html.replace(/<[^>]*>/g, '').trim();
  for (const lang of locales) {
    const path = join(root, prefix(lang) + 'privacy.html');
    assert.ok(existsSync(path), `${lang}: privacy page missing`);
    const html = readFileSync(path, 'utf8');
    assert.equal(attr(html.match(/<html\b[^>]*>/i)[0], 'lang'), lang);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1);
    assert.equal(text(headings[0][1]), data[lang].title, `${lang}: translated privacy content must not fall back to English`);
    const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([t]) => t);
    for (const id of [...ids, 'privacy-contact', 'privacy-sources']) assert.equal(tags.filter(t => attr(t, 'id') === id).length, 1);
    assert.ok(html.includes('analytics=off') && html.includes('localStorage') && html.includes('LRCLIB'));
    assert.ok(tags.some(t => attr(t, 'href') === `${base}${prefix(lang)}support.html#temporary-contact`), `${lang}: contact target missing`);
    for (const other of locales) {
      assert.ok(tags.some(t => /^<option\b/i.test(t) && attr(t, 'data-lang') === other && attr(t, 'value') === `${base}${prefix(other)}privacy.html`), `${lang}: language switch ${other}`);
      assert.ok(tags.some(t => /^<link\b/i.test(t) && attr(t, 'hreflang') === other && attr(t, 'href')?.endsWith(`${base}${prefix(other)}privacy.html`)));
    }
    assert.ok(!/<(?:form|iframe)\b/i.test(html), 'Privacy page must not add data submission or embeds');
  }
  let pages = 0;
  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) { walk(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const html = readFileSync(file, 'utf8');
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) continue;
      const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang');
      if (!locales.includes(lang)) continue;
      const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0] || '';
      assert.ok(footer.includes(`${base}${prefix(lang)}privacy.html`), `${file}: footer privacy link missing`);
      pages++;
    }
  };
  walk(root);
  assert.ok(pages >= 10);
  console.log(`Privacy rendered validation passed: five translated pages and ${pages} localized footers.`);
}
