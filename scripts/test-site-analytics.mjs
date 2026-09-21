import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { validateAnalyticsConfig, validateRenderedAnalytics } from "./validate-site-analytics.mjs";
const source = readFileSync(new URL("../assets/js/site-analytics.js", import.meta.url), "utf8");
const config = { provider: "counterapi-v2", production_host: "noonisawesome.github.io", enabled: true,
  workspace: "fixture-workspace", counter: "pageviews" };
const basePath = "/Singing-Stream-Savior-Manual/";
function browser(options = {}) {
  const calls = [], timers = new Map();
  const dataset = { analyticsProvider: config.provider, analyticsHost: config.production_host,
    analyticsBasePath: basePath, counterEnabled: "true", counterWorkspace: config.workspace,
    counterName: config.counter, ...options.dataset };
  const forbidden = () => { throw Error("analytics must not access storage or load a vendor script"); };
  const document = { body: { dataset, appendChild: forbidden }, createElement: forbidden };
  if (options.noBody) document.body = null;
  Object.defineProperty(document, "cookie", { get: forbidden, set: forbidden });
  const window = { location: { protocol: "https:", hostname: config.production_host,
    pathname: `${basePath}en/guide.html`, search: "", ...options.location },
    doNotTrack: options.windowDnt,
    setTimeout(fn, ms) { assert.equal(ms, 5000); timers.set(1, fn); return 1; },
    clearTimeout(id) { timers.delete(id); },
    fetch(url, init) {
      calls.push({ url, init });
      if (options.fetch) return options.fetch(url, init);
      if (options.failure) return Promise.reject(Error("offline"));
      return Promise.resolve({ ok: !options.status, status: options.status || 200,
        json: async () => { if (options.badJson) throw Error("not json");
          return options.payload ?? { code: "200", data: { up_count: 4, down_count: 1 } }; } });
    },
  };
  if (options.noFetch) delete window.fetch;
  Object.defineProperty(window, "localStorage", { get: forbidden });
  const context = { document, window, navigator: { ...options.navigator }, URLSearchParams,
    AbortController: options.noAbort ? undefined : AbortController };
  return { calls, timers, dataset, run: () => runInNewContext(source, context, { timeout: 1000 }) };
}
test("one public V2 increment, anonymous CORS, no referrer, redirects or extra requests", async () => {
  const b = browser(); await b.run();
  assert.equal(b.calls.length, 1);
  const { url, init } = b.calls[0];
  assert.equal(url, "https://api.counterapi.dev/v2/fixture-workspace/pageviews/up");
  for (const [key, expected] of Object.entries({ method: "GET", mode: "cors", credentials: "omit",
    cache: "no-store", referrerPolicy: "no-referrer", redirect: "error", keepalive: true })) assert.equal(init[key], expected);
  assert.equal(init.headers, undefined);
  assert.equal(b.dataset.analyticsState, "accepted"); assert.equal(b.timers.size, 0);
});
for (const [name, options, state] of [
  ["disabled", { dataset: { counterEnabled: "false" } }, "disabled"],
  ["invalid switch", { dataset: { counterEnabled: "yes" } }, "invalid-config"],
  ["old provider", { dataset: { analyticsProvider: "cloudflare" } }, "invalid-config"],
  ["missing workspace", { dataset: { counterWorkspace: "" } }, "not-configured"],
  ["missing counter", { dataset: { counterName: "  " } }, "not-configured"],
  ["URL injection", { dataset: { counterWorkspace: "../other" } }, "invalid-config"],
  ["query injection", { dataset: { counterName: "views?key=x" } }, "invalid-config"],
  ["localhost", { location: { hostname: "localhost" } }, "excluded"],
  ["HTTP", { location: { protocol: "http:" } }, "excluded"],
  ["file", { location: { protocol: "file:" } }, "excluded"],
  ["other project", { location: { pathname: "/Other/" } }, "excluded"],
  ["prefix collision", { location: { pathname: "/Singing-Stream-Savior-Manual-Preview/" } }, "excluded"],
  ["no base path", { dataset: { analyticsBasePath: "" } }, "excluded"],
  ["no host", { dataset: { analyticsHost: "" } }, "excluded"],
  ["webdriver", { navigator: { webdriver: true } }, "excluded"],
  ["DNT", { navigator: { doNotTrack: "1" } }, "opted-out"],
  ["legacy DNT", { navigator: { msDoNotTrack: "1" } }, "opted-out"],
  ["window DNT", { windowDnt: "1" }, "opted-out"],
  ["DNT yes", { navigator: { doNotTrack: "yes" } }, "opted-out"],
  ["GPC", { navigator: { globalPrivacyControl: true } }, "opted-out"],
  ["URL opt out", { location: { search: "?analytics=off" } }, "opted-out"],
  ["unsupported fetch", { noFetch: true }, "unsupported"],
  ["unsupported abort", { noAbort: true }, "unsupported"],
]) test(`skip ${name}`, async () => {
  const b = browser(options); await b.run(); assert.equal(b.calls.length, 0); assert.equal(b.dataset.analyticsState, state);
});
for (const [status, state] of [[400, "request-failed"], [401, "authentication-required"], [403, "authentication-required"],
  [404, "not-found"], [429, "rate-limited"], [503, "request-failed"]]) test(`HTTP ${status} is not success and never retries`, async () => {
  const b = browser({ status }); await b.run(); await b.run();
  assert.equal(b.dataset.analyticsState, state); assert.equal(b.calls.length, 1); assert.equal(b.timers.size, 0);
});
for (const payload of [{}, { count: 12 }, { code: "404", data: { up_count: 1, down_count: 0 } },
  { code: "200", data: {} }, { code: "200", data: { up_count: null, down_count: 0 } },
  { code: "200", data: { up_count: "4", down_count: 0 } }, { code: "200", data: { up_count: 1.5, down_count: 0 } },
  { code: "200", data: { up_count: 0, down_count: 1 } }, { code: "200", data: { up_count: Infinity, down_count: 0 } },
  { code: "200", data: { up_count: 2 ** 53, down_count: 0 } }]) test(`reject invalid V2 payload ${JSON.stringify(payload)}`, async () => {
  const b = browser({ payload }); await b.run(); assert.equal(b.dataset.analyticsState, "invalid-response");
});
test("valid zero is accepted", async () => {
  const b = browser({ payload: { code: 200, data: { up_count: 0, down_count: 0 } } }); await b.run();
  assert.equal(b.dataset.analyticsState, "accepted");
});
for (const options of [{ failure: true }, { badJson: true }]) test("network or parse failure is isolated, no fallback increment", async () => {
  const b = browser(options); await b.run(); await b.run();
  assert.equal(b.dataset.analyticsState, "request-failed"); assert.equal(b.calls.length, 1); assert.equal(b.timers.size, 0);
});
test("timeout aborts once and does not retry", async () => {
  const b = browser({ fetch: (url, init) => new Promise((resolve, reject) => {
    init.signal.addEventListener("abort", () => reject(Error("aborted")));
  }) });
  const pending = b.run(); b.timers.get(1)(); await pending; await b.run();
  assert.equal(b.calls.length, 1); assert.equal(b.dataset.analyticsState, "request-failed"); assert.equal(b.timers.size, 0);
});
test("two initializations while in flight still increment once", async () => {
  const b = browser(); await Promise.all([b.run(), b.run()]); assert.equal(b.calls.length, 1);
});
test("missing body is harmless", async () => { await browser({ noBody: true }).run(); });
test("trim slugs and preserve their case", async () => {
  const b = browser({ dataset: { counterWorkspace: "  Owner-Site ", counterName: " Views " } }); await b.run();
  assert.equal(b.calls[0].url, "https://api.counterapi.dev/v2/Owner-Site/Views/up");
});
test("repository config is valid; unknown fields and secrets are rejected", () => {
  const actual = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
  assert.deepEqual(validateAnalyticsConfig(actual), []);
  for (const cfg of [null, [], {}, { ...config, enabled: "true" }, { ...config, workspace: "" },
    { ...config, workspace: "https://evil.example" }, { ...config, counter: null },
    { ...config, api_key: "DO_NOT_PUBLISH" }, { ...config, production_host: "https://example.com" }])
    assert.ok(validateAnalyticsConfig(cfg).length);
});
test("rendered validation covers five locales, config, duplicate loader and old integrations", () => {
  const root = mkdtempSync(join(tmpdir(), "s3s-counter-v2-"));
  const html = `<body data-analytics-provider="counterapi-v2" data-analytics-host="${config.production_host}" data-analytics-base-path="${basePath}" data-counter-enabled="true" data-counter-workspace="${config.workspace}" data-counter-name="pageviews"><script src="${basePath}assets/js/site-analytics.js?v=test" defer></script></body>`;
  try {
    for (const prefix of ["", "en", "ja", "ko", "zh-CN"]) {
      mkdirSync(join(root, prefix), { recursive: true }); writeFileSync(join(root, prefix, "index.html"), html);
    }
    mkdirSync(join(root, "assets/js"), { recursive: true }); writeFileSync(join(root, "assets/js/site-analytics.js"), source);
    assert.deepEqual(validateRenderedAnalytics(root, config), []);
    for (const [replacement, expected] of [[html.replace('enabled="true"', 'enabled="false"'), "configuration"],
      [html + html, "duplicate"], [html.replace(" defer", ""), "deferred"],
      [html + '<script data-cf-beacon="{}"></script>', "legacy"],
      [html + '<img src="https://api.counterapi.dev/v1/old/views/up">', "legacy"]]) {
      writeFileSync(join(root, "index.html"), replacement);
      assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes(expected)));
    }
    writeFileSync(join(root, "index.html"), html); rmSync(join(root, "ja/index.html"));
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("localized")));
    writeFileSync(join(root, "ja/index.html"), html);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">');
    assert.deepEqual(validateRenderedAnalytics(root, config), []);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">' + html);
    assert.ok(validateRenderedAnalytics(root, config).some((e) => e.includes("redirect")));
  } finally { rmSync(root, { recursive: true, force: true }); }
});
