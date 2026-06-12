#!/usr/bin/env node
/**
 * Rename image paths that contain spaces to hyphenated lowercase names,
 * and update all references in site source files.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function sanitizeFilename(name) {
  const ext = path.extname(name);
  const base = name.slice(0, -ext.length);
  return base.replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase() + ext.toLowerCase();
}

const folderRenames = [{ from: "Client Logos", to: "client-logos" }];

const fileRenames = [
  { dir: "Logos", from: "Noble Icon.png", to: "noble-icon.png" },
  { dir: "Logos", from: "Noble Logo.png", to: "noble-logo.png" },
  { dir: "client-logos", from: "Grady 1.svg", to: "grady-1.svg" },
  { dir: "client-logos", from: "Grady 2.svg", to: "grady-2.svg" },
  { dir: "client-logos", from: "Grady 3.svg", to: "grady-3.svg" },
  { dir: "client-logos", from: "Grady 4.svg", to: "grady-4.svg" },
  { dir: "client-logos", from: "Gradys 2.svg", to: "gradys-2.svg" },
  { dir: "client-logos", from: "HSF bW.svg", to: "hsf-bw.svg" },
  {
    dir: "client-logos",
    from: "Lakewood reserv Horizontal.svg",
    to: "lakewood-reserv-horizontal.svg",
  },
  { dir: "client-logos", from: "OBT black.svg", to: "obt-black.svg" },
  {
    dir: "client-logos",
    from: "OBT_Logo_Reverse Primary.svg",
    to: "obt_logo_reverse-primary.svg",
  },
  { dir: "client-logos", from: "red revd.svg", to: "red-revd.svg" },
  { dir: "client-logos", from: "Stamp Espresso.svg", to: "stamp-espresso.svg" },
  { dir: "client-logos", from: "Stamp Rust.svg", to: "stamp-rust.svg" },
  { dir: "client-logos", from: "Wittness Logo.svg", to: "wittness-logo.svg" },
];

function gitMv(from, to) {
  const fromPath = path.join(root, from);
  const toPath = path.join(root, to);
  if (!fs.existsSync(fromPath)) {
    console.warn(`skip missing: ${from}`);
    return;
  }
  if (fs.existsSync(toPath)) {
    console.warn(`skip exists: ${to}`);
    return;
  }
  fs.mkdirSync(path.dirname(toPath), { recursive: true });
  execSync(`git mv ${JSON.stringify(fromPath)} ${JSON.stringify(toPath)}`, {
    stdio: "inherit",
    cwd: root,
  });
  console.log(`renamed: ${from} → ${to}`);
}

function walkFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      walkFiles(full, acc);
    } else if (/\.(html?|css|js|mjs|py|json)$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function encodePathSegment(segment) {
  return segment.replace(/ /g, "%20");
}

function buildReplacements() {
  const replacements = [];

  // Folder
  replacements.push(["/Client%20Logos/", "/client-logos/"]);
  replacements.push(["/Client Logos/", "/client-logos/"]);
  replacements.push(["Client Logos/", "client-logos/"]);

  // Noble logos
  replacements.push(["/Logos/Noble%20Icon.png", "/Logos/noble-icon.png"]);
  replacements.push(["/Logos/Noble Icon.png", "/Logos/noble-icon.png"]);
  replacements.push(["/Logos/Noble%20Logo.png", "/Logos/noble-logo.png"]);
  replacements.push(["/Logos/Noble Logo.png", "/Logos/noble-logo.png"]);

  // Brookstone — use client-logos copy instead of Clients path with spaces
  replacements.push([
    "/Clients/Brookstone/Logos/Brookstone-Horizontal Logo-Icon - Main.svg",
    "/client-logos/Brookstone-Horizontal-Logo-Icon-Main.svg",
  ]);
  replacements.push([
    "/Clients/Brookstone/Logos/Brookstone-Horizontal%20Logo-Icon%20-%20Main.svg",
    "/client-logos/Brookstone-Horizontal-Logo-Icon-Main.svg",
  ]);

  for (const { from, to } of fileRenames) {
    const encoded = encodePathSegment(from);
    replacements.push([`/client-logos/${encoded}`, `/client-logos/${to}`]);
    replacements.push([`/client-logos/${from}`, `/client-logos/${to}`]);
    replacements.push([`/Client%20Logos/${encoded}`, `/client-logos/${to}`]);
    replacements.push([`/Client%20Logos/${from}`, `/client-logos/${to}`]);
    replacements.push([`/Client Logos/${from}`, `/client-logos/${to}`]);
    replacements.push([`/Client Logos/${encoded}`, `/client-logos/${to}`]);
  }

  // Longest first to avoid partial replacements
  replacements.sort((a, b) => b[0].length - a[0].length);
  return replacements;
}

function applyReplacements(content, replacements) {
  let out = content;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

// --- execute ---
for (const { from, to } of folderRenames) {
  gitMv(from, to);
}

for (const { dir, from, to } of fileRenames) {
  gitMv(path.join(dir, from), path.join(dir, to));
}

const replacements = buildReplacements();
const sourceFiles = walkFiles(root);
let updated = 0;

for (const file of sourceFiles) {
  if (file.includes(`${path.sep}scripts${path.sep}rename-image-paths.mjs`)) continue;
  const original = fs.readFileSync(file, "utf8");
  const next = applyReplacements(original, replacements);
  if (next !== original) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
    console.log(`updated: ${path.relative(root, file)}`);
  }
}

console.log(`\nDone. ${updated} source file(s) updated.`);
