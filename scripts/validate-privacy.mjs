import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const prefix = lang => lang === 'zh-TW' ? '' : `${lang}/`;
const specs = [
  { scope: 'app', key: 'privacy', file: 'privacy.json', ids: ['desktop-data', 'offline-use', 'online-services', 'diagnostics', 'policy-changes'] },
  { scope: 'website', key: 'website-privacy', file: 'website_privacy.json', ids: ['website-statistics', 'browser-preferences', 'website-choices'] },
];
const linksValid = links => Array.isArray(links) && links.length > 0 && links.every(link => {
  try { const url = new URL(link.url); return typeof link.label === 'string' && link.label.trim() && url.protocol === 'https:' && !url.username && !url.password; }
  catch { return false; }
});
function checkSource(data, spec) {
  assert.match(data.updated, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(linksValid(data.sources), `${spec.key}: invalid service links`);
  if (spec.scope === 'app') {
    assert.ok(linksValid(data.projects), 'App notice needs the actual project links');
    for (const url of ['https://github.com/tranxuanthang/lrclib', 'https://github.com/metabrainz/musicbrainz-server', 'https://musicbrainz.org/doc/Cover_Art_Archive/API', 'https://github.com/taglib/taglib'])
      assert.ok(data.projects.some(link => link.url === url), `Missing verified project: ${url}`);
  }
  for (const lang of locales) {
    const copy = data[lang];
    assert.ok(copy, `${lang}: missing ${spec.key} translation`);
    for (const key of ['title', 'footer_label', 'summary', 'scope', 'contact_title', 'contact_text', 'contact_label', 'sources_title', 'updated_label'])
      assert.ok(typeof copy[key] === 'string' && copy[key].trim(), `${lang}: missing ${key}`);
    assert.deepEqual(copy.sections.map(s => s.id), spec.ids, `${lang}: incorrect ${spec.key} sections`);
    for (const section of copy.sections) {
      assert.ok(section.title && section.paragraphs.length);
      assert.ok(section.paragraphs.every(p => typeof p === 'string' && p.trim() && !/[<>]/.test(p)), 'Privacy paragraphs must be plain text');
    }
    const text = JSON.stringify(copy);
    if (spec.scope === 'app') {
      assert.ok(!/CounterAPI|analytics=off|localStorage|website-statistics/.test(text), `${lang}: website disclosure must stay out of app copy`);
      for (const term of ['LRCLIB', 'MusicBrainz', 'Cover Art Archive', 'TagLib']) assert.ok(text.includes(term), `${lang}: missing search explanation ${term}`);
      assert.ok(copy.projects_title && copy.projects_intro, `${lang}: missing translated project description`);
    } else {
      for (const term of ['CounterAPI', 'GitHub Pages', 'localStorage', 'analytics=off', 'DNT', 'GPC', 'IP'])
        assert.ok(text.includes(term), `${lang}: missing website disclosure ${term}`);
    }
  }
}
for (const spec of specs) {
  spec.data = JSON.parse(readFileSync(new URL(`../_data/${spec.file}`, import.meta.url), 'utf8'));
  checkSource(spec.data, spec);
  for (const lang of locales) {
    const front = readFileSync(new URL(`../${prefix(lang)}${spec.key}.md`, import.meta.url), 'utf8');
    assert.ok(front.includes(`lang: ${lang}`) && front.includes(`translation_key: ${spec.key}`));
  }
}
// Offline negative regressions: scope leaks, missing translations and missing project links must fail.
const clone = value => JSON.parse(JSON.stringify(value));
let broken = clone(specs[0].data); broken['en'].summary += ' CounterAPI';
assert.throws(() => checkSource(broken, specs[0]));
broken = clone(specs[0].data); broken.projects = [];
assert.throws(() => checkSource(broken, specs[0]));
broken = clone(specs[1].data); delete broken.ja;
assert.throws(() => checkSource(broken, specs[1]));
broken = clone(specs[1].data); broken.en.sections = broken.en.sections.filter(s => s.id !== 'website-choices');
assert.throws(() => checkSource(broken, specs[1]));
console.log('Privacy source validation passed: separate app/site notices, five languages, project links and four negative regressions. Not a legal certification.');

if (process.argv[2]) {
  const root = resolve(process.argv[2]), base = '/Singing-Stream-Savior-Manual/';
  const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
  const text = html => html.replace(/<[^>]*>/g, '').trim();
  for (const spec of specs) for (const lang of locales) {
    const file = join(root, prefix(lang) + spec.key + '.html');
    assert.ok(existsSync(file), `${lang}: ${spec.key} missing`);
    const html = readFileSync(file, 'utf8');
    assert.equal(attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang'), lang);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1);
    assert.equal(text(headings[0][1]), spec.data[lang].title, `${lang}: no English fallback`);
    assert.ok(html.includes(`data-privacy-content="${spec.scope}"`));
    const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([t]) => t);
    for (const id of [...spec.ids, 'privacy-contact', 'privacy-sources', ...(spec.scope === 'app' ? ['privacy-projects'] : [])])
      assert.equal(tags.filter(t => attr(t, 'id') === id).length, 1);
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || '';
    assert.ok(main.includes('privacy-main'), 'Both notices use the readable standalone layout');
    if (spec.scope === 'app') {
      assert.ok(!/CounterAPI|analytics=off|localStorage|website-statistics/.test(main), 'App article must not contain website metrics');
      for (const project of spec.data.projects) assert.ok(tags.some(t => /^<a\b/i.test(t) && attr(t, 'href') === project.url));
    } else for (const term of ['CounterAPI', 'analytics=off', 'localStorage']) assert.ok(main.includes(term));
    assert.ok(tags.some(t => attr(t, 'href') === `${base}${prefix(lang)}support.html#temporary-contact`));
    for (const other of locales) {
      const target = `${base}${prefix(other)}${spec.key}.html`;
      assert.ok(tags.some(t => /^<option\b/i.test(t) && attr(t, 'data-lang') === other && attr(t, 'value') === target), `${lang}: language switch ${other}`);
      assert.ok(tags.some(t => /^<link\b/i.test(t) && attr(t, 'hreflang') === other && attr(t, 'href')?.endsWith(target)));
    }
    const nav = html.match(/<nav\b[^>]*class="nav-links"[^>]*>[\s\S]*?<\/nav>/i)?.[0] || '';
    assert.ok(!nav.includes('aria-current="page"'), 'Privacy must not mark the guide as current');
    assert.ok(!/<(?:form|iframe)\b/i.test(main), 'No extra data collection or embeds');
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
      const links = [...footer.matchAll(/<a\b[^>]*>/gi)].map(([tag]) => tag);
      for (const spec of specs) assert.equal(links.filter(t => attr(t, 'href') === `${base}${prefix(lang)}${spec.key}.html`).length, 1, `${file}: distinct footer link ${spec.key}`);
      pages++;
    }
  };
  walk(root);
  assert.ok(pages >= 10);
  console.log(`Privacy rendered validation passed: 10 localized notices and ${pages} footers with separate app/site links.`);
}
