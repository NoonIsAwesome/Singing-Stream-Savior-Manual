import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateBuiltSite } from "./validate-built-site.mjs";

const locales = ["", "en", "ja", "ko", "zh-CN"];
const supportLocales = ["zh-TW", "zh-CN", "en", "ja", "ko"];
const template = readFileSync(new URL("../_includes/release-entry.html", import.meta.url), "utf8");
const templateTag = template.match(/<article\b[^>]*>/)[0]
  .replace("{% if release.latest %} release-entry--latest{% endif %}", " release-entry--latest")
  .replace("{{ version_anchor }}", "v2-1-5-4");
assert.ok(!templateTag.includes("{%") && !templateTag.includes("{{"), "fixture renders the real article opening");
const current = `${templateTag}<h2>2.1.5.4</h2></article>`;
const old = '<article class="release-entry" id="v2-1-5-3"></article>';
const supportCopy = JSON.parse(readFileSync(new URL("../_data/support.json", import.meta.url), "utf8"));
function supportFixture(locale) {
  const lang = locale || "zh-TW";
  const path = `/Singing-Stream-Savior-Manual/${locale ? locale + "/" : ""}support.html`;
  const languages = locales.map((prefix) => {
    const code = prefix || "zh-TW";
    const url = `/Singing-Stream-Savior-Manual/${prefix ? prefix + "/" : ""}support.html`;
    return `<link rel="alternate" hreflang="${code}" href="https://manual.invalid${url}"><option data-lang="${code}" value="${url}">${code}</option>`;
  }).join("");
  return `<html lang="${lang}"><h1>${supportCopy[lang].title}</h1>${languages}
    ${["style.css", "design.css", "reader.css"].map((name) => `<link rel="stylesheet" href="/Singing-Stream-Savior-Manual/assets/css/${name}">`).join("")}
    <nav><a href="${path}" aria-current="page">Support</a></nav>
    <aside><a href="${path}" aria-current="page">Support</a></aside>
    <aside data-support-intake="not-configured"><strong id="support-intake-title">${supportCopy[lang].intake_title}</strong></aside>
    <section id="report-a-bug"></section><section id="share-an-idea"></section>
    <section id="diagnostic-files"></section><details id="temporary-contact"></details></html>`;
}
function withSite(changelog, check) {
  const root = mkdtempSync(join(tmpdir(), "s3s-site-validator-"));
  try {
    for (const locale of locales) {
      const supportUrl = `/Singing-Stream-Savior-Manual/${locale ? locale + "/" : ""}support.html`;
      const directory = join(root, locale);
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, "changelog.html"), `2.0.0.0 → 2.1.5.4\n${changelog}`);
      writeFileSync(join(directory, "open-source.html"), "Ultimate-Vocal-Remover-MIT.txt UVR-MDX-Models-NOTICE.txt UVR-HP-Models-NOTICE.txt");
      writeFileSync(join(directory, "index.html"), '<div data-site-language data-theme-choice="auto" id="homepage-states">OuOb 可以全部自動化！ 自動切換聊天／歌唱效果</div>' + '<div class="capability"></div>'.repeat(5));
      writeFileSync(join(directory, "advanced-streaming.html"), '<h2 id="what-is-a-profile">Profile</h2>');
      writeFileSync(join(directory, "support.html"), supportFixture(locale));
      writeFileSync(join(directory, "about.html"), `<a href="${supportUrl}">Support</a>`);
      const home = join(directory, "index.html");
      writeFileSync(home, readFileSync(home, "utf8") + `<a href="${supportUrl}">Support</a>`);
    }
    mkdirSync(join(root, "assets/css"), { recursive: true });
    for (const name of ["style.css", "design.css", "reader.css"])
      writeFileSync(join(root, "assets/css", name), "/* shared design fixture */");
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
  withSite("<article id='v2-1-5-4'\nclass='release-entry other release-entry--latest'></article>" + old,
    (_, errors) => assert.deepEqual(errors, []));
});
rejects("rejects an old release marked latest", current.replaceAll("v2-1-5-4", "v2-1-5-3"), "not the rendered current release");
rejects("rejects a current version mentioned only in text", old + "2.1.5.4 release-entry--latest", "not the rendered current release");
rejects("rejects a commented-out current article", `<!--${current}-->${old}`, "not the rendered current release");
rejects("rejects duplicate latest articles", current + current, "expected exactly one");
rejects("rejects duplicate current IDs even without two latest classes", current + '<article class="release-entry" id="v2-1-5-4"></article>', "not the rendered current release");
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

function rejectsSupport(name, mutate, expected) {
  test(name, () => withSite(current + old, (root) => {
    const file = join(root, "en/support.html");
    writeFileSync(file, mutate(readFileSync(file, "utf8")));
    const errors = validateBuiltSite(root);
    assert.ok(errors.some((error) => error.includes(expected)), errors.join("\n"));
  }));
}
rejectsSupport("rejects an untranslated support title", (html) => html.replace(/<h1>.*?<\/h1>/, "<h1></h1>"), "one nonempty title");
rejectsSupport("rejects support language falling back to the guide", (html) => html.replace('data-lang="ja" value="/Singing-Stream-Savior-Manual/ja/support.html"', 'data-lang="ja" value="/Singing-Stream-Savior-Manual/ja/guide.html"'), "language switch is missing ja");
rejectsSupport("rejects guide marked current on support", (html) => html.replace('href="/Singing-Stream-Savior-Manual/en/support.html" aria-current="page"', 'href="/Singing-Stream-Savior-Manual/en/guide.html" aria-current="page"'), "select only support");
rejectsSupport("rejects accidental upload UI before storage is configured", (html) => html + '<form><input type="file"></form>', "must not present a submission");
rejectsSupport("rejects missing intake notice", (html) => html.replace('data-support-intake="not-configured"', ''), "availability must be explicit");
rejectsSupport("rejects missing diagnostic section", (html) => html.replace('id="diagnostic-files"', 'id="diagnostics-elsewhere"'), "support section diagnostic-files");
rejectsSupport("rejects removal of the shared reader design", (html) => html.replace('assets/css/reader.css', 'assets/css/new-design.css'), "shared support design stylesheet");
test("rejects missing support locale and old about email entry", () => withSite(current + old, (root) => {
  rmSync(join(root, "ko/support.html"));
  writeFileSync(join(root, "en/about.html"), '<a href="mailto:test@example.invalid">Email</a>');
  const errors = validateBuiltSite(root);
  for (const expected of ["support page is missing", "localized support entry is missing", "software contact must lead"])
    assert.ok(errors.some((error) => error.includes(expected)), expected);
}));
test("support copy is complete and uses one page template in five locales", () => {
  const expectedKeys = Object.keys(supportCopy.en).sort();
  assert.deepEqual(Object.keys(supportCopy).sort(), [...supportLocales].sort());
  for (const lang of supportLocales) {
    assert.deepEqual(Object.keys(supportCopy[lang]).sort(), expectedKeys);
    for (const value of Object.values(supportCopy[lang]))
      assert.ok(typeof value === "string" ? value.trim().length > 0 : Array.isArray(value) && value.length === 3 && value.every((item) => typeof item === "string" && item.trim()));
    const prefix = lang === "zh-TW" ? "" : lang + "/";
    const source = readFileSync(new URL(`../${prefix}support.md`, import.meta.url), "utf8");
    assert.ok(source.includes(`lang: ${lang}`));
    assert.ok(source.includes('translation_key: support'));
    assert.ok(source.includes('{% include support-page.html %}'));
  }
});
