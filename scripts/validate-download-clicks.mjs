import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { validateAnalyticsConfig } from "./validate-site-analytics.mjs";

export function validateDownloadConfig(views, clicks) {
  const errors = [...validateAnalyticsConfig(views), ...validateAnalyticsConfig(clicks)];
  if (errors.length) return errors;
  if (views.provider !== clicks.provider || views.production_host !== clicks.production_host
    || views.workspace.trim() !== clicks.workspace.trim())
    errors.push("Download clicks must use the same provider, host and workspace as page views");
  if (!clicks.counter.trim() || views.counter.trim() === clicks.counter.trim())
    errors.push("Download clicks need a separate, nonempty counter; never reuse the page-view counter");
  return errors;
}
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
export function validateRenderedDownloads(root, views, clicks, base = "/Singing-Stream-Savior-Manual/") {
  const errors = validateDownloadConfig(views, clicks);
  if (errors.length) return errors;
  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) { walk(file); continue; }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) {
        if (html.includes("download-clicks.js")) errors.push(`${file}: redirect must not bind click counting`);
        continue;
      }
      const body = html.match(/<body\b[^>]*>/i)?.[0] || "";
      if (attr(body, "data-download-counter-enabled") !== String(clicks.enabled)
        || attr(body, "data-download-counter-name") !== clicks.counter.trim()
        || attr(body, "data-counter-workspace") !== clicks.workspace.trim()
        || attr(body, "data-counter-name") !== views.counter.trim())
        errors.push(`${file}: download/page-view configuration mismatch`);
      const tags = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag);
      const loaders = tags.filter(tag => attr(tag, "src")?.split("?")[0] === `${base}assets/js/download-clicks.js`);
      if (loaders.length !== 1 || !/\sdefer(?:\s|>|=)/i.test(loaders[0] || ""))
        errors.push(`${file}: exactly one deferred download loader is required`);
    }
  };
  walk(root);
  for (const prefix of ["", "en/", "ja/", "ko/", "zh-CN/"]) {
    const path = join(root, prefix, "resources.html");
    if (!existsSync(path)) { errors.push(`${prefix}resources.html: download page missing`); continue; }
    const html = readFileSync(path, "utf8");
    const urls = [...html.matchAll(/<a\b[^>]*>/gi)].map(([tag]) => attr(tag, "href") || "");
    if (!urls.some(url => /^https:\/\/github\.com\/NoonIsAwesome\/Singing-Stream-Savior-Updates\/releases\/download\/[^/]+\/Singing[ ._-]+Stream[ ._-]+Savior[ ._-]+v?\d+(?:\.\d+){1,3}\.zip(?:[?#]|$)/i.test(url)))
      errors.push(`${prefix}resources.html: expected official full-package download link`);
  }
  if (!existsSync(join(root, "assets/js/download-clicks.js"))) errors.push("download-clicks.js missing from built site");
  if (existsSync(join(root, "scripts"))) errors.push("Owner-only maintenance scripts must not be published to Pages");
  return errors;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const views = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
    const clicks = JSON.parse(readFileSync(new URL("../_data/download_clicks.json", import.meta.url), "utf8"));
    const errors = validateRenderedDownloads(resolve(process.argv[2] || "_site"), views, clicks);
    if (errors.length) throw new Error(errors.join("\n"));
    console.log(`Download click wiring validated; collection enabled=${clicks.enabled}. This does not verify the external counter.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
