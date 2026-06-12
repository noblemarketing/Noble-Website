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
    } else if (/\.(html|js)$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

const missing = [];
const empty = [];

for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const tag = m[0];
    const rel = path.relative(root, file).replace(/\\/g, "/");
    const line = text.slice(0, m.index).split("\n").length;
    if (!/\balt\s*=/.test(tag)) {
      missing.push({ rel, line, tag });
    } else if (/\balt\s*=\s*(["'])\1/.test(tag)) {
      empty.push({ rel, line, tag });
    }
  }
}

console.log("MISSING alt:", missing.length);
for (const x of missing) console.log(`${x.rel}:${x.line}\n  ${x.tag}\n`);
console.log("\nEMPTY alt:", empty.length);
for (const x of empty) console.log(`${x.rel}:${x.line}\n  ${x.tag.slice(0, 160)}\n`);
