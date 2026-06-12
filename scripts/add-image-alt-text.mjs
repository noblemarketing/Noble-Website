#!/usr/bin/env node
/**
 * Add descriptive alt text to images that currently have alt="".
 * Keeps intentional empty alt on purely decorative images (state markers, labeled links).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const logoAltByFilename = {
  "Brookstone.png": "Brookstone Industries logo",
  "Vizion.svg": "Vizion Consulting logo",
  "obt_logo_reverse-primary.svg": "Outback Toys logo",
  "HSF.svg": "Head Strong Flight logo",
  "Everflae.svg": "Everflame Financial Consulting logo",
  "HeyPeaches.png": "Hey Peaches logo",
  "Gradys.png": "Grady's Truckstop & Grill logo",
  "Cosmo.svg": "Cosmo's Pizza logo",
  "Pennwood-white-icon-logo.png": "Pennwood Development Group logo",
  "LR.png": "Lakewood Reserve logo",
  "red-revd.svg": "REVD Toys logo",
  "hatchworks-logo.png": "Hatchworks Cabinetry logo",
  "brad-zimmerman-team-logo.png": "Brad Zimmerman Team logo",
  "remax-pinnacle-logo-cream.png": "RE/MAX Pinnacle logo",
  "32-below-logo-white.svg": "32 Below Ice Cream logo",
  "flintrock-stables-logo-overlay.png": "Flintrock Stables logo",
};

const photoAltBySrc = {
  "/Photos/AudreyHBranding-7323.jpg": "Designer at a laptop in a light studio",
  "/Photos/AudreyHBranding-8165.png":
    "Branding materials, business cards, and notebook in the Noble studio",
  "/Photos/AudreyHBranding-7647.jpg": "Audrey Noble working on website design at her desk",
  "/Photos/AudreyHBranding-7832.jpg": "Branding mood boards and creative materials with laptop",
  "/Photos/AudreyHBranding-7568.jpg": "Audrey Noble reviewing branding materials",
  "/Photos/da-targets/da-hit-iq-booth-setup.png":
    "DA Targets HIT IQ booth setup at SHOT Show",
  "/Photos/outback-toys/obt-swipe-teaser.png": "Outback Toys organic social media teaser graphic",
  "/Photos/flintrock/flintrock-horses-grazing.png": "Horses grazing at Flintrock Stables",
  "/Photos/formally-rejected/formally-rejected-tribute-card.png":
    "Formally rejected tribute card design",
  "/Photos/blaze-yoga/blaze-mind-body-quote.png": "Blaze Yoga mind and body quote graphic",
  "/Photos/lakewood-reserve/lakewood-cabin-exterior.png": "Lakewood Reserve cabin exterior",
  "/Photos/hatchworks/hatch-brand-01.jpg": "Hatchworks Cabinetry brand photography",
};

/** src paths where empty alt is intentional */
const keepEmptyAlt = new Set([
  "/States/PA.png",
  "/States/FL.png",
  "/States/VA.png",
  "/States/NC.png",
  "/Logos/noble-logo.png",
]);

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

function decodeHtml(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function cardTitleBefore(html, index) {
  const slice = html.slice(index, index + 2500);
  const titleMatch =
    slice.match(/portfolio-mag-card__title[^>]*>([^<]+)</) ||
    slice.match(/home-recent-projects__name[^>]*>([^<]+)</) ||
    slice.match(/blog-card__title[^>]*>([^<]+)</);
  return titleMatch ? decodeHtml(titleMatch[1].trim()) : null;
}

function cardTitleAfter(html, index) {
  const slice = html.slice(Math.max(0, index - 2500), index);
  const titleMatch =
    slice.match(/portfolio-mag-card__title[^>]*>([^<]+)</) ||
    slice.match(/home-recent-projects__name[^>]*>([^<]+)</) ||
    slice.match(/blog-card__title[^>]*>([^<]+)</);
  return titleMatch ? decodeHtml(titleMatch[1].trim()) : null;
}

function altForImg(tag, html, index) {
  const srcMatch = tag.match(/\bsrc="([^"]+)"/);
  if (!srcMatch) return null;
  const src = srcMatch[1];

  if (keepEmptyAlt.has(src)) return null;

  if (photoAltBySrc[src]) return photoAltBySrc[src];

  if (tag.includes("portfolio-mag-card__logo-overlay")) {
    const filename = src.split("/").pop();
    if (logoAltByFilename[filename]) return logoAltByFilename[filename];
  }

  const title = cardTitleBefore(html, index) || cardTitleAfter(html, index);
  if (title) {
    if (tag.includes("portfolio-mag-card__logo-overlay")) return `${title} logo`;
    if (src.includes("/portfolio/") || src.includes("/Photos/")) {
      return `${title} project preview`;
    }
    if (tag.includes("blog-card__media")) return `${title} — featured image`;
  }

  return null;
}

function processHtml(content) {
  const re = /<img\b[^>]*>/gi;
  let changed = false;
  const out = content.replace(re, (tag, offset) => {
    if (!/\balt\s*=\s*(["'])\1/.test(tag)) return tag;
    const alt = altForImg(tag, content, offset);
    if (!alt) return tag;
    changed = true;
    const escaped = alt.replace(/"/g, "&quot;");
    return tag.replace(/\balt\s*=\s*""/, `alt="${escaped}"`);
  });
  return changed ? out : null;
}

let updated = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, "utf8");
  const next = processHtml(original);
  if (next) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
    console.log(`updated: ${path.relative(root, file).replace(/\\/g, "/")}`);
  }
}

console.log(`\nDone. ${updated} file(s) updated.`);
