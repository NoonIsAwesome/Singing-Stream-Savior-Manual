import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateBuiltSite } from "./validate-built-site.mjs";

const locales = ["", "en", "ja", "ko", "zh-CN"];
const template = readFileSync(new URL("../_includes/release-entry.html", import.meta.url), "utf8");
const templateTag = template.match(/<article\b[^>]*>/)[0]
  .replace("{% if release.latest %} release-entry--latest{% endif %}", " release-entry--latest")
  .replace("{{ version_anchor }}", "v2-1-5-3");
assert.ok(!templateTag.includes("{%") && !templateTag.includes("{{"), "fixture renders the real article opening");
const current = `${templateTag}<h2>2.1.5.3</h2></article>`;
const old = '<article class="release-entry" id="v2-1-5-2"></article>';
function withSite(changelog, check) {
  const root = mkdtempSync(join(tmpdir(), "s3s-site-validator-"));
  try {
    for (const locale of locales) {
      const directory = join(root, locale);
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, "changelog.html"), `2.0.0.0 → 2.1.5.3\n${changelog}`);
      writeFileSync(join(directory, "open-source.html"), "Ultimate-Vocal-Remover-MIT.txt UVR-MDX-Models-NOTICE.txt UVR-HP-Models-NOTICE.txt");
      writeFileSync(join(directory, "index.html"), '<div data-site-language data-theme-choice="auto" id="homepage-states">OuOb 可以全部自動化！ 自動切換聊天／歌唱效果</div>' + '<div class="capability"></div>'.repeat(5));
      writeFileSync(join(directory, "advanced-streaming.html"), '<h2 id="what-is-a-profile">Profile</h2>');
    }
    check(root, validateBuiltSite(root));
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function rejects(name, html, message) {
  test(name, () => withSite(html, (_, errors) => {
    assert.ok(errors.some((error) => error.includes(message)), errors.join("\n"));
  }));
}
test("accepts actual Liquid template attribute order in all five locales", () => {
  withSite(current + old, (_, errors) => assert.deepEqual(errors, []));
});
test("accepts reversed attributes and single-quoted class tokens", () => {
  withSite("<article id='v2-1-5-3'\nclass='release-entry other release-entry--latest'></article>" + old,
    (_, errors) => assert.deepEqual(errors, []));
});
rejects("rejects an old release marked latest", current.replaceAll("v2-1-5-3", "v2-1-5-2"), "not the rendered current release");
rejects("rejects a current version mentioned only in text", old + "2.1.5.3 release-entry--latest", "not the rendered current release");
rejects("rejects a commented-out current article", `<!--${current}-->${old}`, "not the rendered current release");
rejects("rejects duplicate latest articles", current + current, "expected exactly one");
rejects("rejects duplicate current IDs even without two latest classes", current + '<article class="release-entry" id="v2-1-5-3"></article>', "not the rendered current release");
rejects("rejects a current release hidden below an old entry", old + current, "not the rendered current release");
rejects("rejects a similarly named CSS class", current.replace("release-entry--latest", "release-entry--latest-other"), "not the rendered current release");
test("still rejects missing locale, maintenance files and unresolved assets", () => {
  withSite(current + old, (root) => {
    rmSync(join(root, "ja", "changelog.html"));
    writeFileSync(join(root, "AGENTS.md"), "fixture only");
    writeFileSync(join(root, "bad.html"), '<img src="{{ unresolved }}"><script src="/Singing-Stream-Savior-Manual/missing.js"></script>');
    const errors = validateBuiltSite(root);
    for (const message of ["changelog page is missing", "maintenance file", "unresolved Liquid", "missing design asset"])
      assert.ok(errors.some((error) => error.includes(message)), message);
  });
});
