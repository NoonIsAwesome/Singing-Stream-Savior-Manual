import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { configuredBasePath } from './site-base-path.mjs';

export const toolData = JSON.parse(readFileSync(new URL('../_data/other_tools.json', import.meta.url), 'utf8'));
export const toolLocales = ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'];
const route = locale => `${locale === 'zh-TW' ? '' : locale + '/'}other-tools.html`;
const attribute = (tag, name) => tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'))?.[1] || '';
const plainText = html => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
export const toolReleaseUrl = tool => `${tool.repository}/releases/download/v${tool.version}/${tool.filename}`;
export const toolDownloadUrl = tool => tool.download_url || toolReleaseUrl(tool);
const hasClass = (tag, name) => attribute(tag, 'class').split(/\s+/).includes(name);

// 驗證實際產出的頁面，防止誤接手冊或歌回救星下載點。 / Validate rendered routes and keep tool downloads separate from the S3S guide.
export function validateOtherTools(root, base = '/', data = toolData) {
  const errors = [];
  for (const locale of toolLocales) {
    const page = route(locale), path = join(root, page);
    if (!existsSync(path)) { errors.push(`${page}: missing tools page`); continue; }
    const html = readFileSync(path, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => tag);
    const links = tags.filter(tag => /^<a\b/i.test(tag));
    if (attribute(tags.find(tag => /^<html\b/i.test(tag)) || '', 'lang') !== locale)
      errors.push(`${page}: incorrect language`);
    const titles = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    // 導覽文字不能代替頁面標題的翻譯。 / A translated navigation label must not hide an untranslated page heading.
    if (titles.length !== 1 || plainText(titles[0][1]) !== data.ui[locale].title)
      errors.push(`${page}: missing localized title`);
    if (/class=["'][^"']*(?:guide-sidebar|reader-toolbar|chapter-navigation)/.test(html))
      errors.push(`${page}: tools must not appear inside the software manual`);
    const active = links.filter(tag => attribute(tag, 'aria-current') === 'page');
    if (active.length !== 1 || attribute(active[0] || '', 'href') !== base + page)
      errors.push(`${page}: only Other tools should be active in site navigation`);
    for (const lang of toolLocales) {
      if (!tags.some(tag => /^<option\b/i.test(tag) && attribute(tag, 'data-lang') === lang
        && attribute(tag, 'value') === base + route(lang)))
        errors.push(`${page}: missing language route ${lang}`);
      if (!tags.some(tag => /^<link\b/i.test(tag) && attribute(tag, 'hreflang') === lang
        && attribute(tag, 'href').endsWith(base + route(lang))))
        errors.push(`${page}: missing alternate ${lang}`);
    }
    for (const tool of data.tools) {
      const expected = toolDownloadUrl(tool);
      const downloads = links.filter(tag => attribute(tag, 'data-tool-download') === tool.id);
      // 主按鈕與備援必須各守其位，且不能借用歌回救星的統計標記。
      // Keep primary and backup roles distinct; never reuse S3S download-counter markers.
      if (!downloads.some(tag => attribute(tag, 'href') === expected && hasClass(tag, 'button')))
        errors.push(`${page}: missing primary download for ${tool.id}`);
      if (!links.some(tag => attribute(tag, 'href') === tool.repository))
        errors.push(`${page}: missing source code link for ${tool.id}`);
      if (!html.includes(tool.sha256) || !html.includes(String(tool.bytes)))
        errors.push(`${page}: incomplete download integrity details for ${tool.id}`);
      if (tool.mirror_url && !downloads.some(tag => attribute(tag, 'href') === tool.mirror_url && !hasClass(tag, 'button')))
        errors.push(`${page}: configured mirror is missing for ${tool.id}`);
      if (downloads.some(tag => /\sdata-(?:download-source|download-mirror|download-counter)\s*=/i.test(tag)))
        errors.push(`${page}: tool downloads must not use Singing Stream Savior markers for ${tool.id}`);
      const text = tool.text[locale];
      if (!html.includes(text.summary) || !html.includes(text.privacy) || !html.includes(text.limits))
        errors.push(`${page}: incomplete localized tool information for ${tool.id}`);
    }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = validateOtherTools(resolve(process.argv[2] || '_site'), configuredBasePath());
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Other tools: five localized routes, navigation, download integrity and source links passed.');
}
