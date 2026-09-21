import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function validateAnalyticsConfig(config) {
  const errors = [];
  if (!config || Array.isArray(config) || config.provider !== "cloudflare")
    errors.push("analytics provider must be cloudflare");
  if (typeof config?.production_host !== "string"
    || !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(config.production_host))
    errors.push("analytics production_host must be a lowercase hostname, without a scheme or path");
  if (typeof config?.cloudflare_token !== "string"
    || (config.cloudflare_token.trim() && !/^[a-f0-9]{32}$/i.test(config.cloudflare_token.trim())))
    errors.push("cloudflare_token must be blank or the 32-hex public site token, never an API key");
  return errors;
}

const attribute = (html, name) => html.match(
  new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, "i"),
)?.[1];

export function validateRenderedAnalytics(siteRoot, config, basePath = "/Singing-Stream-Savior-Manual/") {
  const errors = validateAnalyticsConfig(config);
  if (errors.length) return errors;
  for (const prefix of ["", "en/", "ja/", "ko/", "zh-CN/"])
    if (!existsSync(join(siteRoot, prefix, "index.html")))
      errors.push(`${prefix}index.html: localized homepage missing`);
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) { walk(path); continue; }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(path, "utf8").replace(/<!--[\s\S]*?-->/g, "");
      // Redirects must not count an extra view before their destination loads.
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) {
        if (html.includes("site-analytics.js") || html.includes("data-cf-beacon"))
          errors.push(`${path}: redirect must not initialize analytics`);
        continue;
      }
      const body = html.match(/<body\b[^>]*>/i)?.[0] || "";
      if (attribute(body, "data-analytics-provider") !== config.provider
        || attribute(body, "data-analytics-host") !== config.production_host
        || attribute(body, "data-analytics-base-path") !== basePath
        || attribute(body, "data-cloudflare-token") !== config.cloudflare_token.trim())
        errors.push(`${path}: rendered analytics configuration does not match _data/analytics.json`);
      const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag);
      const loaders = scripts.filter((tag) =>
        attribute(tag, "src")?.split("?")[0] === `${basePath}assets/js/site-analytics.js`);
      if (loaders.length !== 1 || !/\sdefer(?:\s|>|=)/i.test(loaders[0] || ""))
        errors.push(`${path}: expected one deferred analytics loader`);
      if (html.includes("data-pageview-endpoint") || html.includes("api.counterapi.dev")
        || scripts.some((tag) => /\sdata-cf-beacon\s*=/.test(tag)))
        errors.push(`${path}: legacy counter or duplicate direct beacon present`);
    }
  };
  walk(siteRoot);
  if (!existsSync(join(siteRoot, "assets/js/site-analytics.js")))
    errors.push("site-analytics.js is missing from the built site");
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const config = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
    const errors = validateRenderedAnalytics(resolve(process.argv[2] || "_site"), config);
    if (errors.length) throw new Error(errors.join("\n"));
    console.log("Rendered analytics checks passed (configuration only; ingestion is not verified).");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
