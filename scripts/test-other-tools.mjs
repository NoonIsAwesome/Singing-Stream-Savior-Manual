import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { runInNewContext } from 'node:vm';
import { toolData, toolLocales, validateOtherTools } from './validate-other-tools.mjs';

test('tool releases have one complete metadata authority and five complete translations', () => {
  assert.equal(new Set(toolData.tools.map(tool => tool.id)).size, toolData.tools.length);
  const uiKeys = Object.keys(toolData.ui.en).sort();
  for (const locale of toolLocales) {
    assert.deepEqual(Object.keys(toolData.ui[locale]).sort(), uiKeys);
    const prefix = locale === 'zh-TW' ? '' : locale + '/';
    const source = readFileSync(new URL(`../${prefix}other-tools.html`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`^lang: ${locale}$`, 'm'));
    assert.match(source, /^translation_key: other-tools$/m);
    assert.ok(!source.includes('XFanArtDownloader.exe'), 'locale wrappers do not duplicate release metadata');
  }
  for (const tool of toolData.tools) {
    assert.match(tool.version, /^\d+(?:\.\d+){3}$/);
    assert.match(tool.sha256, /^[a-f0-9]{64}$/);
    assert.ok(Number.isSafeInteger(tool.bytes) && tool.bytes > 0);
    assert.match(tool.repository, /^https:\/\/github\.com\/NoonIsAwesome\/[A-Za-z0-9_-]+$/);
    assert.ok(!tool.filename.includes('/') && !tool.filename.includes('\\'));
    for (const locale of toolLocales) {
      const text = tool.text[locale];
      for (const key of ['summary', 'privacy', 'limits']) assert.ok(text[key]?.trim());
      for (const key of ['features', 'steps']) assert.ok(text[key].length >= 2 && text[key].every(line => line.trim()));
    }
  }
});

function withFixture(change, check) {
  const root = mkdtempSync(join(tmpdir(), 'noon-other-tools-'));
  try {
    for (const locale of toolLocales) {
      const prefix = locale === 'zh-TW' ? '' : locale + '/';
      mkdirSync(join(root, prefix), { recursive: true });
      const languages = toolLocales.map(lang => {
        const path = '/' + (lang === 'zh-TW' ? '' : lang + '/') + 'other-tools.html';
        return `<option data-lang="${lang}" value="${path}"></option><link hreflang="${lang}" href="https://noonisawesome.dev${path}">`;
      }).join('');
      const tools = toolData.tools.map(tool => `<a href="${tool.repository}/releases/download/v${tool.version}/${tool.filename}" data-tool-download="${tool.id}">Download</a><a href="${tool.repository}">Source</a>${tool.sha256} ${tool.bytes} ${tool.text[locale].summary} ${tool.text[locale].privacy} ${tool.text[locale].limits}`).join('');
      let html = `<html lang="${locale}"><h1>${toolData.ui[locale].title}</h1><a aria-current="page" href="/${prefix}other-tools.html">Tools</a>${languages}${tools}</html>`;
      html = change(html, locale);
      writeFileSync(join(root, prefix, 'other-tools.html'), html);
    }
    check(validateOtherTools(root));
  } finally { rmSync(root, { recursive:true, force:true }); }
}
test('rendered tools validator accepts all localized routes', () => withFixture(html => html, errors => assert.deepEqual(errors, [])));
test('localized navigation cannot hide an English fallback page heading', () => withFixture((html, locale) => html
  .replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${toolData.ui.en.title}</h1>`)
  .replace('</html>', `<nav><span>${toolData.ui[locale].title}</span></nav></html>`), errors => {
    assert.equal(errors.length, 4);
    assert.ok(errors.every(error => error.endsWith(': missing localized title')));
  }));
test('rendered tools validator detects accidental guide navigation', () => withFixture(html => html.replace('aria-current="page" href="/', 'aria-current="page" href="/guide/'), errors => assert.equal(errors.length, 5)));
test('rendered tools validator detects stale or absent download integrity details', () => withFixture(html => html.replace(toolData.tools[0].sha256, 'stale'), errors => assert.equal(errors.length, 5)));
test('rendered tools validator detects missing source and translation routes', () => withFixture(html => html.replace(`href="${toolData.tools[0].repository}"`, 'href="#"').replace('data-lang="ja"', 'data-lang="invalid"'), errors => assert.equal(errors.length, 10)));

test('FanArt downloads never increment the Singing Stream Savior download counter', async () => {
  const listeners = {}, calls = [];
  const dataset = { analyticsProvider:'counterapi-v2', analyticsHost:'noonisawesome.dev', analyticsBasePath:'/', counterWorkspace:'fixture', counterName:'visits', downloadCounterEnabled:'true', downloadCounterName:'s3s-downloads', downloadClickMirrorUrl:'https://updates.noonisawesome.dev/releases/v2.1.8.10/Singing.Stream.Savior.2.1.8.10.zip' };
  const document = { body:{ dataset }, addEventListener(type, callback) { listeners[type] = callback; } };
  const window = { location:{ protocol:'https:', hostname:'noonisawesome.dev', pathname:'/other-tools.html', search:'', href:'https://noonisawesome.dev/other-tools.html' }, fetch(...args) { calls.push(args); }, setTimeout, clearTimeout };
  runInNewContext(readFileSync(new URL('../assets/js/download-clicks.js', import.meta.url), 'utf8'), { document, window, navigator:{}, URL, URLSearchParams, AbortController });
  const tool = toolData.tools[0];
  for (const href of [`${tool.repository}/releases/download/v${tool.version}/${tool.filename}`, 'https://updates.noonisawesome.dev/tools/fanart-downloader/v3.0.0.0/XFanArtDownloader.exe']) {
    listeners.click({ type:'click', button:0, detail:1, isTrusted:true, defaultPrevented:false, target:{ closest:() => ({ href, getAttribute:() => 'fanart-downloader' }) } });
  }
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(calls, []);
});
