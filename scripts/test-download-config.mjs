import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { validateDownloadConfig, validateRenderedDownloads } from "./validate-download-clicks.mjs";
const views = { provider: "counterapi-v2", production_host: "noonisawesome.github.io", enabled: true, workspace: "fixture-workspace", counter: "views" };
const clicks = { ...views, enabled: false, counter: "clicks" };
test("independent download switch preserves existing page views", () => {
  for (const enabled of [true, false]) assert.deepEqual(validateDownloadConfig(views, { ...clicks, enabled }), []);
  const original = JSON.parse(readFileSync(new URL("../_data/analytics.json", import.meta.url), "utf8"));
  const added = JSON.parse(readFileSync(new URL("../_data/download_clicks.json", import.meta.url), "utf8"));
  assert.deepEqual(validateDownloadConfig(original, added), []);
});
test("reject inconsistent workspace, shared counter, invalid switch and secrets", () => {
  for (const change of [{ workspace: "other" }, { counter: "views" }, { counter: "" }, { enabled: "true" }, { api_key: "DO_NOT_PUBLISH" }, { production_host: "other.example" }, { counter: "../escape" }])
    assert.ok(validateDownloadConfig(views, { ...clicks, ...change }).length);
});
test("rendered validation covers all languages, independent config, loaders and excluded scripts", () => {
  const root = mkdtempSync(join(tmpdir(), "s3s-download-config-"));
  const base = "/Singing-Stream-Savior-Manual/";
  const html = `<body data-counter-workspace="fixture-workspace" data-counter-name="views" data-download-counter-enabled="false" data-download-counter-name="clicks"><script src="${base}assets/js/download-clicks.js?v=test" defer></script><a href="https://github.com/NoonIsAwesome/Singing-Stream-Savior-Updates/releases/download/v9.9.9.9/Singing.Stream.Savior.9.9.9.9.zip">Download</a></body>`;
  try {
    for (const prefix of ["", "en", "ja", "ko", "zh-CN"]) {
      mkdirSync(join(root, prefix), { recursive: true });
      writeFileSync(join(root, prefix, "resources.html"), html);
    }
    mkdirSync(join(root, "assets/js"), { recursive: true });
    writeFileSync(join(root, "assets/js/download-clicks.js"), "// fixture");
    assert.deepEqual(validateRenderedDownloads(root, views, clicks), []);
    for (const invalid of [html.replace('enabled="false"', 'enabled="true"'), html.replace(" defer", ""), html + html, html.replace("9.9.9.9.zip", "9.9.9.9.exe")]) {
      writeFileSync(join(root, "resources.html"), invalid);
      assert.ok(validateRenderedDownloads(root, views, clicks).length);
    }
    const mirror = "https://57.gigafile.nu/0105-o91b142bdcfa3da79b0abc49b8830fcdb";
    const mirrored = html.replace("<body ", `<body data-download-click-mirror-url="${mirror}" `).replace("</body>", `<div data-download-mirror-expires="2027-01-05T00:00:00+09:00"><a data-download-source="gigafile" href="${mirror}">Backup</a></div><script src="${base}assets/js/download-mirror.js" defer></script></body>`);
    writeFileSync(join(root, "resources.html"), mirrored);
    assert.deepEqual(validateRenderedDownloads(root, views, clicks), []);
    for (const invalid of [mirrored.replace('data-download-source="gigafile"', ''), mirrored.replace('data-download-mirror-expires=', 'missing-expiry='), mirrored.replace('download-mirror.js', 'missing.js'), mirrored.replace(`href="${mirror}"`, 'href="https://evil.example/"'), mirrored.replace(`data-download-click-mirror-url="${mirror}"`, ''), mirrored.replaceAll(mirror, mirror + '?query=1')]) {
      writeFileSync(join(root, "resources.html"), invalid);
      assert.ok(validateRenderedDownloads(root, views, clicks).length);
    }
    writeFileSync(join(root, "resources.html"), html);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">');
    assert.deepEqual(validateRenderedDownloads(root, views, clicks), []);
    writeFileSync(join(root, "redirect.html"), '<meta http-equiv="refresh" content="0;url=index.html">' + html);
    assert.ok(validateRenderedDownloads(root, views, clicks).some(e => e.includes("redirect")));
    rmSync(join(root, "redirect.html"));
    rmSync(join(root, "ja/resources.html"));
    assert.ok(validateRenderedDownloads(root, views, clicks).some(e => e.includes("missing")));
    mkdirSync(join(root, "scripts"));
    assert.ok(validateRenderedDownloads(root, views, clicks).some(e => e.includes("Owner-only")));
  } finally { rmSync(root, { recursive: true, force: true }); }
});
