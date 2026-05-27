/**
 * Inserts the Google tag immediately after <head> in every site HTML page.
 * Run: node tools/inject-google-analytics.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const MARKER = "G-EW7YY8NJGD";

const SNIPPET = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${MARKER}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${MARKER}');
  </script>
`;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === "node_modules" || name.name === ".git") continue;
      walk(full, out);
    } else if (name.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

let updated = 0;
let skipped = 0;

for (const file of walk(root)) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  if (rel.startsWith("partials/") && !rel.includes("index.html")) continue;

  let html = fs.readFileSync(file, "utf8");
  if (!/<head[\s>]/i.test(html)) continue;
  if (html.includes(MARKER)) {
    skipped++;
    continue;
  }

  const next = html.replace(/<head(\s[^>]*)?>\s*/i, (_, attrs = "") => `<head${attrs}>\n${SNIPPET}\n`);
  if (next === html) {
    console.warn(`no <head> match: ${rel}`);
    continue;
  }

  fs.writeFileSync(file, next, "utf8");
  updated++;
  console.log(`updated ${rel}`);
}

console.log(`Done: ${updated} updated, ${skipped} already had tag.`);
