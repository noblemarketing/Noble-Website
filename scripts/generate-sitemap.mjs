#!/usr/bin/env node
/**
 * Regenerates /sitemap.xml from public index.html pages.
 *
 * A page is included when it is a real document (not a meta-refresh
 * redirect) and does not carry a noindex robots tag. URLs come from
 * <link rel="canonical"> when that tag is present. Pages without one
 * use a trailing slash, which is the URL GitHub Pages returns 200 for.
 *
 * lastmod is the file's latest git commit date (YYYY-MM-DD), or the
 * file modified date when the file has no commit yet.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://www.thenoblemarketing.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Folders that are not public pages, even if they contain index.html. */
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "noble-marketing",
  "template-branding-case",
  "scripts",
  "tools",
  "partials",
  "Clients",
  "_docx_extract",
  "_faq_extract",
]);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
      walk(path.join(dir, entry.name), acc);
    } else if (entry.name.toLowerCase() === "index.html") {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

function hasNoindex(html) {
  return /<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(html)
    || /<meta\b[^>]*\bcontent\s*=\s*["'][^"']*\bnoindex\b[^"']*["'][^>]*\bname\s*=\s*["']robots["']/i.test(html);
}

function isRedirect(html) {
  return /http-equiv\s*=\s*["']refresh["']/i.test(html);
}

function canonicalHref(html) {
  const tag = html.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i);
  if (!tag) return null;
  const href = tag[0].match(/\bhref\s*=\s*["']([^"']+)["']/i);
  return href ? href[1].trim() : null;
}

function toAbsolute(href) {
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("/")) return `${SITE}${href}`;
  return null;
}

function ownUrl(file) {
  const rel = path.relative(root, path.dirname(file)).replace(/\\/g, "/");
  return rel === "" ? `${SITE}/` : `${SITE}/${rel}/`;
}

function pathKey(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  return `${parsed.origin}${pathname}`;
}

function lastmod(file) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", rel], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    // Untracked or git unavailable: fall through to mtime.
  }
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rootIndex = path.join(root, "index.html");
const files = fs.existsSync(rootIndex)
  ? [rootIndex, ...walk(root).filter((file) => path.resolve(file) !== path.resolve(rootIndex))]
  : walk(root);

const pages = [];
const skipped = [];

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  if (hasNoindex(html)) {
    skipped.push(`${rel} (noindex)`);
    continue;
  }
  if (isRedirect(html)) {
    skipped.push(`${rel} (redirect)`);
    continue;
  }

  const own = ownUrl(file);
  const declared = canonicalHref(html);
  let loc = own;
  if (declared) {
    const absolute = toAbsolute(declared);
    if (!absolute || new URL(absolute).origin !== SITE) {
      skipped.push(`${rel} (canonical is not on ${SITE})`);
      continue;
    }
    if (pathKey(absolute) !== pathKey(own)) {
      skipped.push(`${rel} (canonical points to ${absolute})`);
      continue;
    }
    loc = absolute;
  }

  pages.push({ loc, lastmod: lastmod(file), file: rel });
}

pages.sort((a, b) => {
  if (a.loc === `${SITE}/`) return -1;
  if (b.loc === `${SITE}/`) return 1;
  return a.loc.localeCompare(b.loc);
});

const body = pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");

console.log(`Wrote sitemap.xml with ${pages.length} URLs.`);
for (const page of pages) console.log(`${page.lastmod}  ${page.loc}`);
if (skipped.length) {
  console.log("\nSkipped:");
  for (const line of skipped) console.log(`  ${line}`);
}
