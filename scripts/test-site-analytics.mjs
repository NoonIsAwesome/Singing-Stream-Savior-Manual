import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { validateAnalyticsConfig, validateRenderedAnalytics } from "./validate-site-analytics.mjs";

const source = readFileSync(new URL("../assets/js/site-analytics.js", import.meta.url), "utf8");
const token = "0123456789abcdef0123456789abcdef"; // Fixture only, never a real vendor token.
const config = { provider: "cloudflare", production_host: "noonisawesome.github.io", cloudflare_token: token };
const basePath = "/Singing-Stream-Savior-Manual/";
function browser(options = {}) {
  const scripts = [];
  const dataset = { analyticsProvider: config.provider, analyticsHost: config.production_host,
    analyticsBasePath: basePath, cloudflareToken: token, ...options.dataset };
  const document = {
    body: { dataset, appendChild: (node) => { scripts.push(node); } },
    querySelector: () => scripts.find((node) => node.attrs?.["data-cf-beacon"]),
    createElement: (tag) => ({ tag, attrs: {}, events: {},
      setAttribute(name, value) { this.attrs[name] = value; },
      addEventListener(name, callback) { this.events[name] = callback; } }),
  };
  if (options.noBody) document.body = null;
  if (options.appendFails) document.body.appendChild = () => { throw Error("blocked"); };
  const forbidden = () => { throw Error("analytics must not access site storage or custom networking"); };
  const window = { location: { protocol: "https:", hostname: config.production_host,
    pathname: `${basePath}en/guide.html`, search: "", ...options.location },
    doNotTrack: options.windowDnt, fetch: forbidden };
  Object.defineProperty(window, "localStorage", { get: forbidden });
  Object.defineProperty(document, "cookie", { get: forbidden, set: forbidden });
  const context = { document, window, navigator: { ...options.navigator }, URLSearchParams };
  const run = () => runInNewContext(source, context, { timeout: 1000 });
  return { scripts, dataset, document, run };
}

test("valid production page loads one official module with SPA tracking disabled", () => {
  const b = browser(); b.run();
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, "https://static.cloudflareinsights.com/beacon.min.js");
  assert.equal(b.scripts[0].type, "module");
  assert.equal(b.scripts[0].async, true);
  assert.deepEqual(JSON.parse(b.scripts[0].attrs["data-cf-beacon"]), { token, spa: false });
  assert.equal(b.dataset.analyticsState, "loading");
});
for (const value of ["", "  ", undefined]) test(`unconfigured token ${JSON.stringify(value)} sends nothing`, () => {
  const b = browser({ dataset: { cloudflareToken: value } }); b.run();
  assert.equal(b.scripts.length, 0); assert.equal(b.dataset.analyticsState, "not-configured");
});
for (const value of ["YOUR_TOKEN", "<script>alert(1)</script>", "abc", token + "?other=1"])
  test(`malformed token ${value} is rejected`, () => {
    const b = browser({ dataset: { cloudflareToken: value } }); b.run();
    assert.equal(b.scripts.length, 0); assert.equal(b.dataset.analyticsState, "invalid-config");
  });
for (const [name, options] of [
  ["localhost", { location: { hostname: "localhost" } }],
  ["HTTP", { location: { protocol: "http:" } }],
  ["file URL", { location: { protocol: "file:" } }],
  ["other project", { location: { pathname: "/Other-Project/" } }],
  ["prefix collision", { location: { pathname: "/Singing-Stream-Savior-Manual-Preview/" } }],
  ["missing base path", { dataset: { analyticsBasePath: "" } }],
  ["missing host", { dataset: { analyticsHost: "" } }],
  ["automation", { navigator: { webdriver: true } }],
]) test(`exclude ${name}`, () => {
  const b = browser(options); b.run(); assert.equal(b.scripts.length, 0);
  assert.equal(b.dataset.analyticsState, "excluded");
});
for (const [name, options] of [
  ["DNT", { navigator: { doNotTrack: "1" } }],
  ["legacy DNT", { navigator: { msDoNotTrack: "1" } }],
  ["window DNT", { windowDnt: "1" }],
  ["DNT yes", { navigator: { doNotTrack: "yes" } }],
  ["GPC", { navigator: { globalPrivacyControl: true } }],
  ["manual opt-out", { location: { search: "?analytics=off&test=1" } }],
]) test(`respect ${name}`, () => {
  const b = browser(options); b.run(); assert.equal(b.scripts.length, 0);
  assert.equal(b.dataset.analyticsState, "opted-out");
});
test("running the loader twice never adds a second beacon", () => {
  const b = browser(); b.run(); b.run(); assert.equal(b.scripts.length, 1);
});
test("vendor load success is not named verified/active", () => {
  const b = browser(); b.run(); b.scripts[0].events.load();
  assert.equal(b.dataset.analyticsState, "beacon-loaded");
});
test("network failure is isolated", () => {
  const b = browser(); b.run(); b.scripts[0].events.error();
  assert.equal(b.dataset.analyticsState, "load-failed");
});
test("blocked insertion cannot break site initialization", () => {
  const b = browser({ appendFails: true }); assert.doesNotThrow(b.run);
  assert.equal(b.dataset.analyticsState, "load-failed");
});
test("missing body is harmless", () => assert.doesNotThrow(browser({ noBody: true }).run));
test("whitespace and uppercase token are accepted without forwarding whitespace", () => {
  const b = browser({ dataset: { cloudflareToken: `  ${token.toUpperCase()}  ` } }); b.run();
  assert.equal(JSON.parse(b.scripts[0].attrs["data-cf-beacon"]).token, token.toUpperCase());
});
test("repository configuration is either disabled or contains only a public site token", () => {
  const actual = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
  assert.deepEqual(validateAnalyticsConfig(actual), []);
});
test("configuration validator rejects malformed configurations", () => {
  for (const cfg of [null, [], {}, { ...config, production_host: "https://example.com/x" },
    { ...config, cloudflare_token: 123 }, { ...config, cloudflare_token: "YOUR_TOKEN" },
    { ...config, provider: "unknown" }]) assert.ok(validateAnalyticsConfig(cfg).length);
  assert.deepEqual(validateAnalyticsConfig({ ...config, cloudflare_token: "" }), []);
});

test("rendered checks catch missing languages, duplicate beacons, legacy counters and mismatched config", () => {
  const root = mkdtempSync(join(tmpdir(), "s3s-analytics-"));
  const html = `<body data-analytics-provider="cloudflare" data-analytics-host="${config.production_host}" data-analytics-base-path="${basePath}" data-cloudflare-token="${token}"><script src="${basePath}assets/js/site-analytics.js?v=test" defer></script></body>`;
  try {
    for (const prefix of ["", "en", "ja", "ko", "zh-CN"]) {
      mkdirSync(join(root, prefix), { recursive: true });
      writeFileSync(join(root, prefix, "index.html"), html);
    }
    mkdirSync(join(root, "assets/js"), { recursive: true });
    writeFileSync(join(root, "assets/js/site-analytics.js"), source);
    assert.deepEqual(validateRenderedAnalytics(root, config), []);
    writeFileSync(join(root, "index.html"), html.replace(token, ""));
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("configuration")));
    writeFileSync(join(root, "index.html"), html + '<script data-cf-beacon="{}"></script>');
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("duplicate")));
    writeFileSync(join(root, "index.html"), html.replace("data-cloudflare-token", "data-pageview-endpoint"));
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("legacy")));
    writeFileSync(join(root, "index.html"), html.replace(" defer", ""));
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("deferred")));
    writeFileSync(join(root, "index.html"), html);
    rmSync(join(root, "ja/index.html"));
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("localized")));
    writeFileSync(join(root, "ja/index.html"), html);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">');
    assert.deepEqual(validateRenderedAnalytics(root, config), []);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">' + html);
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("redirect")));
  } finally { rmSync(root, { recursive: true, force: true }); }
});
