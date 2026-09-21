import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function validateAnalyticsConfig(config) {
  const errors = [];
  if (!config || Array.isArray(config) || config.provider !== "counterapi-v2")
    errors.push("analytics provider must be counterapi-v2");
  if (typeof config?.production_host !== "string"
    || !/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(config.production_host))
    errors.push("production_host must be a lowercase hostname without a scheme or path");
  if (typeof config?.enabled !== "boolean") errors.push("enabled must be a boolean");
  for (const name of ["workspace", "counter"]) {
    const value = config?.[name];
    if (typeof value !== "string" || (value.trim() && !/^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value.trim()))
      || (config?.enabled === true && !value.trim()))
      errors.push(`${name} must be a nonempty V2 slug when enabled`);
  }
  const allowed = ["provider", "production_host", "enabled", "workspace", "counter"];
  if (config && Object.keys(config).some((key) => !allowed.includes(key)))
    errors.push("unexpected analytics field; never put API credentials in public configuration");
  return errors;
}
const attribute = (html, name) => html.match(
  new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, "i"),
)?.[1];
export function validateRenderedAnalytics(siteRoot, config, basePath = "/Singing-Stream-Savior-Manual/") {
  const errors = validateAnalyticsConfig(config);
  if (errors.length) return errors;
  for (const prefix of ["", "en/", "ja/", "ko/", "zh-CN/"])
    if (!existsSync(join(siteRoot, prefix, "index.html"))) errors.push(`${prefix}index.html: localized homepage missing`);
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) { walk(path); continue; }
      if (!entry.name.endsWith(".html")) continue;
      const html = readFileSync(path, "utf8").replace(/<!--[\s\S]*?-->/g, "");
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) {
        if (html.includes("site-analytics.js") || html.includes("data-cf-beacon") || html.includes("api.counterapi.dev"))
          errors.push(`${path}: redirect must not initialize analytics`);
        continue;
      }
      const body = html.match(/<body\b[^>]*>/i)?.[0] || "";
      for (const [name, expected] of Object.entries({
        "data-analytics-provider": config.provider, "data-analytics-host": config.production_host,
        "data-analytics-base-path": basePath, "data-counter-enabled": String(config.enabled),
        "data-counter-workspace": config.workspace.trim(), "data-counter-name": config.counter.trim(),
      })) if (attribute(body, name) !== expected) errors.push(`${path}: rendered analytics configuration mismatch: ${name}`);
      const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag);
      const loaders = scripts.filter((tag) => attribute(tag, "src")?.split("?")[0] === `${basePath}assets/js/site-analytics.js`);
      if (loaders.length !== 1 || !/\sdefer(?:\s|>|=)/i.test(loaders[0] || ""))
        errors.push(`${path}: expected one deferred analytics loader (no duplicate)`);
      if (/data-pageview-endpoint|data-cloudflare-token|data-cf-beacon|cloudflareinsights\.com|api\.counterapi\.dev/.test(html))
        errors.push(`${path}: legacy counter or direct vendor integration present`);
    }
  };
  walk(siteRoot);
  if (!existsSync(join(siteRoot, "assets/js/site-analytics.js"))) errors.push("site-analytics.js is missing from the built site");
  return errors;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const config = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
    const errors = validateRenderedAnalytics(resolve(process.argv[2] || "_site"), config);
    if (errors.length) throw new Error(errors.join("\n"));
    console.log("Rendered CounterAPI V2 checks passed (configuration only; collection is not verified).");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
