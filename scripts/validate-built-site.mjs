import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DEFAULT_BASE_PATH = "/Singing-Stream-Savior-Manual/";
const FORBIDDEN_ROOT_FILES = ["AGENTS.html", "AGENTS.md", "查看網站統計.cmd"];
const CHANGELOG_PAGES = [
  "changelog.html",
  "en/changelog.html",
  "ja/changelog.html",
  "ko/changelog.html",
  "zh-CN/changelog.html",
];
const OPEN_SOURCE_PAGES = [
  "open-source.html",
  "en/open-source.html",
  "ja/open-source.html",
  "ko/open-source.html",
  "zh-CN/open-source.html",
];
const EXPECTED_CURRENT_RELEASE = "2.1.5.4";
const EXPECTED_CURRENT_RELEASE_ID = "v2-1-5-4";

function collectHtmlFiles(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) {
        visit(path);
      } else if (entry.toLowerCase().endsWith(".html")) {
        files.push(path);
      }
    }
  };
  visit(root);
  return files;
}

function localAssetPath(siteRoot, htmlPath, source, basePath) {
  if (!source || /^(?:data:|https?:|blob:|mailto:|javascript:)/i.test(source)) {
    return null;
  }

  const pagePath = `/${relative(siteRoot, htmlPath).split(sep).join("/")}`;
  const resolvedUrl = new URL(source, `https://manual.invalid${basePath}${pagePath.slice(1)}`);
  let assetPath = decodeURIComponent(resolvedUrl.pathname);
  if (assetPath.startsWith(basePath)) {
    assetPath = assetPath.slice(basePath.length);
  } else {
    assetPath = assetPath.replace(/^\//, "");
  }
  return resolve(siteRoot, assetPath);
}

// The support chapter is informational until a receiving service is configured.
// Check the rendered navigation and language URLs, not just source-file presence.
const SUPPORT_LOCALES = ["zh-TW", "zh-CN", "en", "ja", "ko"];
const attributeValue = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
  return match?.[1] ?? match?.[2] ?? "";
};
const supportPath = (locale) => `${locale === "zh-TW" ? "" : locale + "/"}support.html`;

export function validateSupportPages(siteRoot, basePath = DEFAULT_BASE_PATH) {
  const errors = [];
  for (const locale of SUPPORT_LOCALES) {
    const page = supportPath(locale);
    const path = join(siteRoot, page);
    if (!existsSync(path)) { errors.push(`${page}: support page is missing`); continue; }
    const html = readFileSync(path, "utf8").replace(/<!--[\s\S]*?-->/g, "");
    const target = basePath + page;
    const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => tag);
    const openings = (name) => tags.filter((tag) => new RegExp(`^<${name}\\b`, "i").test(tag));
    if (attributeValue(openings("html")[0] || "", "lang") !== locale)
      errors.push(`${page}: support language is incorrect`);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    if (headings.length !== 1 || !headings[0][1].replace(/<[^>]*>/g, "").trim())
      errors.push(`${page}: support needs one nonempty title`);
    for (const id of ["report-a-bug", "share-an-idea", "diagnostic-files", "temporary-contact"])
      if (tags.filter((tag) => attributeValue(tag, "id") === id).length !== 1)
        errors.push(`${page}: missing or duplicate support section ${id}`);
    if (!tags.some((tag) => attributeValue(tag, "data-support-intake") === "not-configured")
      || !/<strong\b[^>]*id=["']support-intake-title["'][^>]*>[^<\s][\s\S]*?<\/strong>/i.test(html))
      errors.push(`${page}: support intake availability must be explicit`);
    if (openings("form").length || openings("iframe").length
      || openings("input").some((tag) => attributeValue(tag, "type") === "file"))
      errors.push(`${page}: unconfigured support must not present a submission or upload form`);
    const active = openings("a").filter((tag) => attributeValue(tag, "aria-current") === "page");
    if (active.length !== 2 || active.some((tag) => attributeValue(tag, "href") !== target))
      errors.push(`${page}: header and chapter navigation must select only support`);
    for (const alternate of SUPPORT_LOCALES) {
      const expected = basePath + supportPath(alternate);
      if (!openings("option").some((tag) => attributeValue(tag, "data-lang") === alternate
        && attributeValue(tag, "value") === expected))
        errors.push(`${page}: support language switch is missing ${alternate}`);
      if (!openings("link").some((tag) => attributeValue(tag, "hreflang") === alternate
        && attributeValue(tag, "href").endsWith(expected)))
        errors.push(`${page}: support alternate link is missing ${alternate}`);
    }
    for (const name of ["style.css", "design.css", "reader.css"])
      if (!openings("link").some((tag) => attributeValue(tag, "href").split("?")[0].endsWith(`/assets/css/${name}`)))
        errors.push(`${page}: shared support design stylesheet ${name} is missing`);
    const prefix = locale === "zh-TW" ? "" : locale + "/";
    for (const entry of ["index.html", "about.html"]) {
      const entryPath = join(siteRoot, prefix + entry);
      const source = existsSync(entryPath) ? readFileSync(entryPath, "utf8") : "";
      const links = [...source.replace(/<!--[\s\S]*?-->/g, "").matchAll(/<a\b[^>]*>/gi)];
      if (!links.some(([tag]) => attributeValue(tag, "href") === target))
        errors.push(`${prefix}${entry}: localized support entry is missing`);
      if (entry === "about.html" && links.some(([tag]) => /^mailto:/i.test(attributeValue(tag, "href"))))
        errors.push(`${prefix}${entry}: software contact must lead to the support chapter`);
    }
  }
  return errors;
}

export function validateBuiltSite(siteRoot, basePath = DEFAULT_BASE_PATH) {
  const errors = [];
  errors.push(...validateSupportPages(siteRoot, basePath));

  for (const file of FORBIDDEN_ROOT_FILES) {
    if (existsSync(join(siteRoot, file))) {
      errors.push(`${file}: maintenance file must not be published`);
    }
  }

  for (const page of CHANGELOG_PAGES) {
    const changelogPath = join(siteRoot, ...page.split("/"));
    if (!existsSync(changelogPath)) {
      errors.push(`${page}: changelog page is missing`);
      continue;
    }

    const changelogHtml = readFileSync(changelogPath, "utf8");
    // Inspect attributes on actual article openings, irrespective of order.
    // Text, comments and similarly named CSS classes are not release markers.
    const articleHtml = changelogHtml.replace(/<!--[\s\S]*?-->/g, "");
    const attribute = (tag, name) => {
      const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
      return match?.[1] ?? match?.[2] ?? "";
    };
    const releases = [...articleHtml.matchAll(/<article\b[^>]*>/gi)]
      .map(([tag]) => ({ id: attribute(tag, "id"), classes: attribute(tag, "class").split(/\s+/) }))
      .filter((entry) => entry.classes.includes("release-entry"));
    const latest = releases.filter((entry) => entry.classes.includes("release-entry--latest"));
    const latestCount = latest.length;
    if (latestCount !== 1) {
      errors.push(
        `${page}: expected exactly one release-entry--latest marker, found ${latestCount}`,
      );
    }
    if (!changelogHtml.includes(`2.0.0.0 → ${EXPECTED_CURRENT_RELEASE}`)) {
      errors.push(`${page}: changelog range does not end at ${EXPECTED_CURRENT_RELEASE}`);
    }
    if (releases[0]?.id !== EXPECTED_CURRENT_RELEASE_ID
      || latest[0]?.id !== EXPECTED_CURRENT_RELEASE_ID
      || releases.filter((entry) => entry.id === EXPECTED_CURRENT_RELEASE_ID).length !== 1) {
      errors.push(`${page}: ${EXPECTED_CURRENT_RELEASE} is not the rendered current release`);
    }
  }

  for (const page of OPEN_SOURCE_PAGES) {
    const openSourcePath = join(siteRoot, ...page.split("/"));
    if (!existsSync(openSourcePath)) {
      errors.push(`${page}: open-source license page is missing`);
      continue;
    }

    const openSourceHtml = readFileSync(openSourcePath, "utf8");
    for (const requiredNotice of [
      "Ultimate-Vocal-Remover-MIT.txt",
      "UVR-MDX-Models-NOTICE.txt",
      "UVR-HP-Models-NOTICE.txt",
    ]) {
      if (!openSourceHtml.includes(requiredNotice)) {
        errors.push(`${page}: missing required UVR notice ${requiredNotice}`);
      }
    }
  }

  // Verify the shared design and complete server-rendered translations on every homepage.
  for (const locale of ["zh-TW", "zh-CN", "en", "ja", "ko"]) {
    const prefix = locale === "zh-TW" ? "" : locale + "/";
    const homepage = join(siteRoot, prefix, "index.html");
    if (!existsSync(homepage)) {
      errors.push(prefix + "index.html: localized homepage is missing");
      continue;
    }
    const html = readFileSync(homepage, "utf8");
    const capabilityCount = html.match(/class="capability"/g)?.length || 0;
    if (capabilityCount !== 5) errors.push(prefix + "index.html: expected five combined playback/automation capabilities");
    if (!html.includes('data-site-language') || !html.includes('data-theme-choice="auto"')) errors.push(prefix + "index.html: language or system theme controls are missing");
    if (!html.includes('id="homepage-states"') || !html.includes('OuOb')) errors.push(prefix + "index.html: playback demo or updated founder story is missing");
    if (locale === "zh-TW" && (!html.includes('可以全部自動化！') || !html.includes('自動切換聊天／歌唱效果'))) errors.push('index.html: approved Traditional Chinese copy is missing');
    const guide = join(siteRoot, prefix, "advanced-streaming.html");
    if (!existsSync(guide) || !readFileSync(guide, "utf8").includes('id="what-is-a-profile"')) errors.push(prefix + "advanced-streaming.html: Profile introduction is missing");
  }

  for (const htmlPath of collectHtmlFiles(siteRoot)) {
    const html = readFileSync(htmlPath, "utf8");
    const page = relative(siteRoot, htmlPath).split(sep).join("/");

    const unresolvedAttribute = /(?:src|href)\s*=\s*["'][^"']*(?:\{\{|\{%|\}\}|%\})[^"']*["']/i;
    if (unresolvedAttribute.test(html)) {
      errors.push(`${page}: unresolved Liquid remains in a src/href attribute`);
    }

    for (const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)\s*=\s*["']([^"']+\.(?:css|js)(?:\?[^"']*)?)["'][^>]*>/gi)) {
      const assetPath = localAssetPath(siteRoot, htmlPath, match[1], basePath);
      if (assetPath && !existsSync(assetPath)) errors.push(page + ': missing design asset ' + match[1]);
    }

    for (const match of html.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi)) {
      const source = match[1].trim();
      const assetPath = localAssetPath(siteRoot, htmlPath, source, basePath);
      if (assetPath && !existsSync(assetPath)) {
        errors.push(`${page}: missing image ${source}`);
      }
    }
  }
  return errors;
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (import.meta.url === invokedPath) {
  const siteRoot = resolve(process.argv[2] || "_site");
  if (!existsSync(siteRoot)) {
    console.error(`Built site directory not found: ${siteRoot}`);
    process.exit(1);
  }

  const errors = validateBuiltSite(siteRoot);
  if (errors.length) {
    console.error(`Built-site validation failed (${errors.length} issue(s)):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    "Built-site validation passed: assets resolve, maintenance files are excluded, each changelog has one current release, and localized open-source pages include the required UVR notices.",
  );
}
