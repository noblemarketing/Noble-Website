#!/usr/bin/env node
/**
 * Cross-page consistency: label capitalization, footer chrome, legacy redirects.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".git") continue;
      walk(p, acc);
    } else if (/\.html$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

/** UI label replacements (longest first). Body copy unchanged. */
const labelReplacements = [
  ["Social media · Print ·", "Social Media · Print ·"],
  ["Social media · April", "Social Media · April"],
  ["Social media · Oct", "Social Media · Oct"],
  ["Social media · Aug", "Social Media · Aug"],
  ["Social media · Jul", "Social Media · Jul"],
  ["Social media · May", "Social Media · May"],
  ['<span class="blog-card__tag">Social media</span>', '<span class="blog-card__tag">Social Media</span>'],
  ['data-blog-filter="social-media" aria-pressed="false">Social media</button>', 'data-blog-filter="social-media" aria-pressed="false">Social Media</button>'],
  ['<span class="portfolio-mag-card__cat">Social media</span>', '<span class="portfolio-mag-card__cat">Social Media</span>'],
  ['<span class="service-horiz-tab-text">Social media</span>', '<span class="service-horiz-tab-text">Social Media</span>'],
  ['<p class="services-split-hero-eyebrow">Social media</p>', '<p class="services-split-hero-eyebrow">Social Media</p>'],
  ['<p class="services-split-hero-eyebrow">Website design</p>', '<p class="services-split-hero-eyebrow">Website Design</p>'],
  ['<span class="service-horiz-tab-text">Branding and design</span>', '<span class="service-horiz-tab-text">Branding and Design</span>'],
  ['<span class="service-horiz-tab-text">Web design</span>', '<span class="service-horiz-tab-text">Website Design</span>'],
  ['<h3 class="about-our-process__step-title">Discovery call</h3>', '<h3 class="about-our-process__step-title">Discovery Call</h3>'],
  ['<p class="about-our-process__eyebrow">OUR PROCESS</p>', '<p class="about-our-process__eyebrow">Our Process</p>'],
  ['<p class="noble-intro-side noble-intro-side--left">marketing</p>', '<p class="noble-intro-side noble-intro-side--left">Marketing</p>'],
  ['<option value="Website design">Website design</option>', '<option value="Website Design">Website Design</option>'],
  ['<option value="Social media">Social media</option>', '<option value="Social Media">Social Media</option>'],
  ['<li><strong>Social media</strong>', '<li><strong>Social Media</strong>'],
];

const canonicalFooterIcon =
  '<img class="footer-center-icon" src="/Logos/noble-icon.png" width="72" height="72" alt="Noble home" />';

function normalizeFooter(html) {
  let out = html;
  out = out.replace(/<img class="footer-center-icon"[^>]*\/>/g, canonicalFooterIcon);
  out = out.replace(
    /<p class="footer-center-copyright">&copy;/g,
    '<p class="footer-center-copyright">©',
  );
  out = out.replace(
    /<p class="footer-center-copyright">© <span id="year">\d+<\/span> Noble Marketing &amp; Design\.<br \/> All rights reserved\.<\/p>/g,
    '<p class="footer-center-copyright">© <span id="year">2026</span> Noble Marketing &amp; Design.<br />\n          All rights reserved.</p>',
  );
  return out;
}

function redirectStub(target, canonicalPath) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://www.thenoblemarketing.com${canonicalPath}" />
  <meta http-equiv="refresh" content="0; url=${target}" />
  <script>location.replace("${target}");</script>
</head>
<body>
  <p><a href="${target}">Continue to Noble Marketing &amp; Design</a></p>
</body>
</html>
`;
}

const legacyRedirects = [
  { file: "branding/index.html", target: "/services/branding", canonical: "/services/branding" },
  { file: "website-design/index.html", target: "/services/website-design", canonical: "/services/website-design" },
  { file: "social-media/index.html", target: "/services/social-media", canonical: "/services/social-media" },
];

let updated = 0;

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  if (["home/index.html", "noble-marketing/index.html"].includes(rel)) continue;
  if (rel.startsWith("noble-marketing/") || rel.startsWith("partials/")) continue;

  let content = fs.readFileSync(file, "utf8");
  let next = content;

  for (const [from, to] of labelReplacements) {
    next = next.split(from).join(to);
  }

  if (next.includes('class="site-footer"')) {
    next = normalizeFooter(next);
  }

  if (next !== content) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
    console.log(`updated: ${rel}`);
  }
}

for (const { file, target, canonical } of legacyRedirects) {
  const full = path.join(root, file);
  const stub = redirectStub(target, canonical);
  const prev = fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
  if (prev !== stub) {
    fs.writeFileSync(full, stub, "utf8");
    updated++;
    console.log(`redirect stub: ${file}`);
  }
}

const redirectsPath = path.join(root, "_redirects");
const redirectLines = [
  "/home    /    301",
  "/home/   /    301",
  "/branding    /services/branding    301",
  "/branding/   /services/branding    301",
  "/website-design    /services/website-design    301",
  "/website-design/   /services/website-design    301",
  "/social-media    /services/social-media    301",
  "/social-media/   /services/social-media    301",
];
fs.writeFileSync(redirectsPath, `${redirectLines.join("\n")}\n`, "utf8");
console.log("updated: _redirects");

console.log(`\nDone. ${updated} file(s) touched.`);
