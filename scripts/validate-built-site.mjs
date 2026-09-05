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

export function validateBuiltSite(siteRoot, basePath = DEFAULT_BASE_PATH) {
  const errors = [];

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
    const latestCount = changelogHtml.match(/\brelease-entry--latest\b/g)?.length || 0;
    if (latestCount !== 1) {
      errors.push(
        `${page}: expected exactly one release-entry--latest marker, found ${latestCount}`,
      );
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

  for (const htmlPath of collectHtmlFiles(siteRoot)) {
    const html = readFileSync(htmlPath, "utf8");
    const page = relative(siteRoot, htmlPath).split(sep).join("/");

    const unresolvedAttribute = /(?:src|href)\s*=\s*["'][^"']*(?:\{\{|\{%|\}\}|%\})[^"']*["']/i;
    if (unresolvedAttribute.test(html)) {
      errors.push(`${page}: unresolved Liquid remains in a src/href attribute`);
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
