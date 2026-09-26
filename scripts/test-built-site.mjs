import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateBuiltSite, parseCurrentReleaseMetadata } from "./validate-built-site.mjs";

const resources = readFileSync(new URL("../_data/resources.yml", import.meta.url), "utf8");
const currentVersion = parseCurrentReleaseMetadata(resources);
const currentId = `v${currentVersion.replaceAll(".", "-")}`;

const locales = ["", "en", "ja", "ko", "zh-CN"];
const supportLocales = ["zh-TW", "zh-CN", "en", "ja", "ko"];
const template = readFileSync(new URL("../_includes/release-entry.html", import.meta.url), "utf8");
const templateTag = template.match(/<article\b[^>]*>/)[0]
  .replace("{% if release.latest %} release-entry--latest{% endif %}", " release-entry--latest")
  .replace("{{ version_anchor }}", currentId);
assert.ok(!templateTag.includes("{%") && !templateTag.includes("{{"), "fixture renders the real article opening");
const current = `${templateTag}<h2>${currentVersion}</h2></article>`;
const old = '<article class="release-entry" id="v2-1-5-4"></article>';
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
    <header class="site-header"><nav><a href="/Singing-Stream-Savior-Manual/">Home</a></nav></header>
    <aside class="guide-sidebar" id="guide-nav"><a href="${path}" aria-current="page">Support</a></aside>
    <aside data-support-intake="not-configured"><strong id="support-intake-title">${supportCopy[lang].intake_title}</strong></aside>
    <section id="report-a-bug"></section><section id="share-an-idea"></section>
    <section id="diagnostic-files"></section><details id="temporary-contact"></details></html>`;
}
function withSite(changelog, check) {
  const root = mkdtempSync(join(tmpdir(), "s3s-site-validator-"));
  try {
    for (const locale of locales) {
      const directory = join(root, locale);
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, "changelog.html"), `2.0.0.0 → ${currentVersion}\n${changelog}`);
      writeFileSync(join(directory, "open-source.html"), "Ultimate-Vocal-Remover-MIT.txt UVR-MDX-Models-NOTICE.txt UVR-HP-Models-NOTICE.txt");
      writeFileSync(join(directory, "index.html"), '<div data-site-language data-theme-choice="auto" id="homepage-states">OuOb 可以全部自動化！ 自動切換聊天／歌唱效果</div>' + '<div class="capability"></div>'.repeat(5));
      writeFileSync(join(directory, "advanced-streaming.html"), '<h2 id="what-is-a-profile">Profile</h2>');
      writeFileSync(join(directory, "support.html"), supportFixture(locale));
      writeFileSync(join(directory, "about.html"), '<h1>About the author</h1><section id="social-links"></section>');
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
  withSite(`<article id='${currentId}'\nclass='release-entry other release-entry--latest'></article>` + old,
    (_, errors) => assert.deepEqual(errors, []));
});
rejects("rejects an old release marked latest", current.replaceAll(currentId, "v2-1-5-4"), "not the rendered current release");
rejects("rejects a current version mentioned only in text", old + `${currentVersion} release-entry--latest`, "not the rendered current release");
rejects("rejects a commented-out current article", `<!--${current}-->${old}`, "not the rendered current release");
rejects("rejects duplicate latest articles", current + current, "expected exactly one");
rejects("rejects duplicate current IDs even without two latest classes", current + `<article class="release-entry" id="${currentId}"></article>`, "not the rendered current release");
rejects("rejects a current release hidden below an old entry", old + current, "not the rendered current release");
rejects("rejects a similarly named CSS class", current.replace("release-entry--latest", "release-entry--latest-other"), "not the rendered current release");
test("release fixture agrees with the download metadata", () => {
  assert.ok(current.includes(`id="${currentId}"`));
  assert.ok(resources.includes(`  version: "${currentVersion}"`));
});
test("release metadata supports future releases, BOM, CRLF and quoted versions", () => {
  for (const version of ["2.1.7.0", "12.34.56.78"]) {
    for (const quote of ['"', "'", ""]) {
      assert.equal(parseCurrentReleaseMetadata(`\uFEFFsoftware:\r\n  version: ${quote}${version}${quote} # release\r\n  launcher_version: "1.0.0.0"\r\nsupport:\r\n  version: "0.0.0.0"\r\n`), version);
    }
  }
});
test("release metadata rejects missing, malformed and duplicate authority", () => {
  for (const text of ["", 'support:\n  version: "2.1.7.0"\n', 'software:\n  version: "bad"\n', 'software:\n  version: "2.1.7"\n', 'software:\n  version: "2.1.7.0"\n  version: "2.1.6.1"\n', 'software:\n  version: "2.1.7.0"\nsoftware:\n  version: "2.1.6.1"\n']) {
    assert.throws(() => parseCurrentReleaseMetadata(text));
  }
});
test("rejects a stale changelog range even with the correct current article", () => {
  withSite(current + old, (root) => {
    const file = join(root, "en/changelog.html");
    writeFileSync(file, readFileSync(file, "utf8").replace(`2.0.0.0 → ${currentVersion}`, "2.0.0.0 → 2.1.5.4"));
    const errors = validateBuiltSite(root);
    assert.deepEqual(errors, [`en/changelog.html: changelog range does not end at ${currentVersion}`]);
  });
});
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
  for (const expected of ["support page is missing", "about must not contain a bug-report contact section"])
    assert.ok(errors.some((error) => error.includes(expected)), expected);
}));
rejectsSupport("rejects removal of the sidebar support entry", (html) => html.replace(/<aside class="guide-sidebar"[\s\S]*?<\/aside>/, ""), "sidebar must retain");
rejectsSupport("rejects restoring a support link to top navigation", (html) => html.replace('</nav>', '<a href="/Singing-Stream-Savior-Manual/en/support.html">Support</a></nav>'), "top navigation must not contain");
test("rejects a support entry restored on home or about in any locale", () => withSite(current + old, (root) => {
  for (const locale of locales) for (const entry of ["index.html", "about.html"]) {
    const file = join(root, locale, entry);
    writeFileSync(file, readFileSync(file, "utf8") + '<a href="/Singing-Stream-Savior-Manual/support.html">Support</a>');
  }
  const errors = validateBuiltSite(root).filter((message) => message.includes('support entry belongs only'));
  assert.equal(errors.length, 10);
}));
test("source templates expose support only in the manual sidebar", () => {
  const header = readFileSync(new URL('../_includes/site-header.html', import.meta.url), 'utf8');
  const about = readFileSync(new URL('../_includes/about-page.html', import.meta.url), 'utf8');
  const sidebar = readFileSync(new URL('../_includes/guide-sidebar.html', import.meta.url), 'utf8');
  assert.equal((header.match(/<a\b/g) || []).length, 5, 'brand, three navigation items, download');
  assert.doesNotMatch(header, /support_target|support\.html|site\.data\.support/);
  assert.doesNotMatch(about, /support_copy|support_page_target|creator-support-title|SUPPORT/);
  assert.match(about, /id="social-links"/);
  assert.match(about, /class="collaboration-panel"/);
  const chapters = JSON.parse(readFileSync(new URL('../_data/chapters.json', import.meta.url), 'utf8'));
  const support = chapters.filter(chapter => chapter.key === 'support');
  assert.equal(support.length, 1, 'shared navigation retains exactly one support entry');
  assert.equal(support[0].standalone, true, 'support uses its own localized page');
  assert.equal(support[0].group, 'resources');
  assert.match(sidebar, /site\.data\.chapters/);
  assert.match(sidebar, /include chapter-url\.html chapter=chapter/);
});
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
