import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const locales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const prefix = lang => lang === 'zh-TW' ? '' : `${lang}/`;
const ids = ['desktop-data', 'offline-use', 'online-services', 'diagnostics', 'policy-changes'];
const projectUrls = [
  'https://github.com/tranxuanthang/lrclib',
  'https://github.com/metabrainz/musicbrainz-server',
  'https://musicbrainz.org/doc/Cover_Art_Archive/API',
  'https://github.com/taglib/taglib',
];
const linksValid = links => Array.isArray(links) && links.length > 0 && links.every(link => {
  try { const url = new URL(link.url); return typeof link.label === 'string' && link.label.trim() && url.protocol === 'https:' && !url.username && !url.password; }
  catch { return false; }
});
const appOnly = /CounterAPI|analytics=off|localStorage|website-statistics|website-privacy|官網統計|官网统计/i;
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
const visibleText = html => html.replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/<[^>]*>/g, '').trim();
function checkSource(data) {
  assert.match(data.updated, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(linksValid(data.sources), 'App notice needs valid third-party privacy links');
  assert.ok(linksValid(data.projects), 'App notice needs actual search project links');
  assert.ok(!appOnly.test(JSON.stringify(data.sources)), 'No website counter vendor in app references');
  for (const url of projectUrls) assert.ok(data.projects.some(link => link.url === url), `Missing project: ${url}`);
  for (const lang of locales) {
    const copy = data[lang];
    assert.ok(copy, `${lang}: missing app privacy translation`);
    for (const key of ['title', 'footer_label', 'summary', 'scope', 'contact_title', 'contact_text', 'contact_label', 'sources_title', 'updated_label', 'projects_title', 'projects_intro'])
      assert.ok(typeof copy[key] === 'string' && copy[key].trim(), `${lang}: missing ${key}`);
    assert.deepEqual(copy.sections.map(s => s.id), ids, `${lang}: app-only privacy sections required`);
    for (const section of copy.sections) {
      assert.ok(section.title && section.paragraphs.length);
      assert.ok(section.paragraphs.every(p => typeof p === 'string' && p.trim() && !/[<>]/.test(p)), 'Privacy paragraphs must be plain text');
    }
    assert.ok(!appOnly.test(JSON.stringify(copy)), `${lang}: website copy must stay out of the app notice`);
    const search = copy.sections.find(s => s.id === 'online-services').paragraphs.join('\n');
    for (const term of ['LRCLIB', 'MusicBrainz', 'Cover Art Archive', 'TagLib']) assert.ok(search.includes(term), `${lang}: missing search explanation ${term}`);
  }
}
function checkPublicPage(html, label) {
  // Inspect displayed text and anchors only. The operational counter attributes/scripts must remain intact.
  assert.ok(!/CounterAPI|官網統計|官网统计/i.test(visibleText(html)), `${label}: unwanted visible website statistics copy`);
  for (const [tag] of html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(tag, 'href') || '';
    assert.ok(!/website-privacy\.html|(?:^|\/\/)\S*counterapi\.dev/i.test(href), `${label}: unwanted public statistics link`);
  }
}
const data = JSON.parse(readFileSync(new URL('../_data/privacy.json', import.meta.url), 'utf8'));
checkSource(data);
assert.ok(!existsSync(new URL('../_data/website_privacy.json', import.meta.url)), 'Retired website notice data must be removed');
for (const lang of locales) {
  const front = readFileSync(new URL(`../${prefix(lang)}privacy.md`, import.meta.url), 'utf8');
  assert.ok(front.includes(`lang: ${lang}`) && front.includes('translation_key: privacy'));
  assert.ok(!existsSync(new URL(`../${prefix(lang)}website-privacy.md`, import.meta.url)), `${lang}: retired website page must be removed`);
}
// Six offline negative cases protect scope, translations, project links and public navigation.
const clone = value => JSON.parse(JSON.stringify(value));
let broken = clone(data); broken.en.summary += ' CounterAPI';
assert.throws(() => checkSource(broken));
broken = clone(data); broken.projects = [];
assert.throws(() => checkSource(broken));
broken = clone(data); delete broken.ja;
assert.throws(() => checkSource(broken));
broken = clone(data); broken.en.sections = broken.en.sections.filter(s => s.id !== 'online-services');
assert.throws(() => checkSource(broken));
assert.throws(() => checkPublicPage('<a href="/website-privacy.html">Website privacy</a>', 'fixture'));
assert.throws(() => checkPublicPage('<p>CounterAPI</p>', 'fixture'));
checkPublicPage('<body data-analytics-provider="counterapi-v2"><script>const provider="CounterAPI";</script><h1>App privacy</h1></body>', 'operational-counter fixture');
console.log('Privacy source validation passed: app-only notice, five languages, project links and six negative regressions. Not a legal certification.');

if (process.argv[2]) {
  const root = resolve(process.argv[2]), base = '/Singing-Stream-Savior-Manual/';
  for (const lang of locales) {
    assert.ok(!existsSync(join(root, prefix(lang) + 'website-privacy.html')), `${lang}: retired website notice was published`);
    const file = join(root, prefix(lang) + 'privacy.html');
    assert.ok(existsSync(file), `${lang}: app privacy page missing`);
    const html = readFileSync(file, 'utf8');
    assert.equal(attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang'), lang);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1);
    assert.equal(visibleText(headings[0][1]), data[lang].title, `${lang}: no English fallback`);
    assert.ok(html.includes('data-privacy-content="app"'));
    const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([t]) => t);
    for (const id of [...ids, 'privacy-contact', 'privacy-sources', 'privacy-projects'])
      assert.equal(tags.filter(t => attr(t, 'id') === id).length, 1);
    const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || '';
    assert.ok(main.includes('privacy-main'), 'App notice must retain its standalone layout');
    assert.ok(!appOnly.test(main), 'App article must not contain website metrics');
    for (const project of data.projects) assert.ok(tags.some(t => /^<a\b/i.test(t) && attr(t, 'href') === project.url));
    assert.ok(tags.some(t => attr(t, 'href') === `${base}${prefix(lang)}support.html#temporary-contact`));
    for (const other of locales) {
      const target = `${base}${prefix(other)}privacy.html`;
      assert.ok(tags.some(t => /^<option\b/i.test(t) && attr(t, 'data-lang') === other && attr(t, 'value') === target), `${lang}: language switch ${other}`);
      assert.ok(tags.some(t => /^<link\b/i.test(t) && attr(t, 'hreflang') === other && attr(t, 'href')?.endsWith(target)));
    }
    const nav = html.match(/<nav\b[^>]*class="nav-links"[^>]*>[\s\S]*?<\/nav>/i)?.[0] || '';
    assert.ok(!nav.includes('aria-current="page"'), 'Privacy must not mark the guide as current');
    assert.ok(!/<(?:form|iframe)\b/i.test(main), 'No extra data submission or embeds');
  }
  let pages = 0;
  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) { walk(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const html = readFileSync(file, 'utf8');
      checkPublicPage(html, file);
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) continue;
      const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] || '', 'lang');
      if (!locales.includes(lang)) continue;
      const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0] || '';
      const links = [...footer.matchAll(/<a\b[^>]*>/gi)].map(([tag]) => tag);
      assert.equal(links.filter(t => attr(t, 'href') === `${base}${prefix(lang)}privacy.html`).length, 1, `${file}: exactly one app privacy footer link`);
      pages++;
    }
  };
  walk(root);
  assert.ok(pages >= 10);
  const sitemap = join(root, 'sitemap.xml');
  if (existsSync(sitemap)) assert.ok(!readFileSync(sitemap, 'utf8').includes('website-privacy'), 'Retired pages must not remain in sitemap');
  console.log(`Privacy rendered validation passed: five app notices and ${pages} localized footers; no public statistics page or vendor links.`);
}
