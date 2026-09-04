import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DEFAULT_BASE_PATH = "/Singing-Stream-Savior-Manual/";

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
  console.log("Built-site validation passed: no unresolved asset paths or missing images.");
}
