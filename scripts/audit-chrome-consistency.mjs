#!/usr/bin/env node
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

function extractBlock(html, startRe, endMarker) {
  const start = html.search(startRe);
  if (start < 0) return null;
  const end = html.indexOf(endMarker, start);
  if (end < 0) return null;
  return html.slice(start, end + endMarker.length);
}

function normalizeNav(html) {
  return extractBlock(html, /<header class="site-header"/, "</header>")
    ?.replace(/\saria-current="[^"]*"/g, "")
    ?.replace(/\s+/g, " ")
    .trim();
}

function normalizeFooter(html) {
  return extractBlock(html, /<footer class="site-footer"/, "</footer>")
    ?.replace(/\s+/g, " ")
    .trim();
}

const navHashes = new Map();
const footerHashes = new Map();
const navVariants = new Map();
const footerVariants = new Map();

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const html = fs.readFileSync(file, "utf8");
  const nav = normalizeNav(html);
  const footer = normalizeFooter(html);
  if (!nav || !footer) {
    console.log("MISSING CHROME:", rel);
    continue;
  }
  const navKey = nav;
  const footerKey = footer;
  navHashes.set(navKey, (navHashes.get(navKey) || 0) + 1);
  footerHashes.set(footerKey, (footerHashes.get(footerKey) || 0) + 1);
  if (!navVariants.has(navKey)) navVariants.set(navKey, []);
  navVariants.get(navKey).push(rel);
  if (!footerVariants.has(footerKey)) footerVariants.set(footerKey, []);
  footerVariants.get(footerKey).push(rel);
}

console.log("NAV variants:", navHashes.size);
for (const [key, files] of navVariants) {
  if (navHashes.get(key) < walk(root).length) {
    console.log(`\n--- NAV (${files.length} files) example: ${files[0]} ---`);
    if (files.length <= 5) console.log(files.join(", "));
    else console.log(files.slice(0, 5).join(", "), `...+${files.length - 5}`);
  }
}

console.log("\nFOOTER variants:", footerHashes.size);
for (const [key, files] of footerVariants) {
  if (footerHashes.get(key) < walk(root).length) {
    console.log(`\n--- FOOTER (${files.length} files) example: ${files[0]} ---`);
    if (files.length <= 5) console.log(files.join(", "));
    else console.log(files.slice(0, 5).join(", "), `...+${files.length - 5}`);
  }
}

if (navHashes.size === 1 && footerHashes.size === 1) {
  console.log("\nAll pages share identical nav and footer (ignoring aria-current).");
}
