import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const BEFORE = "89b38c6~1";
const SKIP = new Set(["work-hatchworks/index.html", "work-brad-zimmerman-team/index.html"]);

const changed = execSync(`git diff ${BEFORE} 89b38c6 --name-only`, { encoding: "utf8" })
  .trim()
  .split(/\r?\n/)
  .filter((f) => f.startsWith("work-") && f.endsWith("/index.html"));

const galleryRe =
  /\r?\n    <section class="work-case-visual-gallery section"[\s\S]*?\r?\n    <\/section>/;

const headerRe =
  /\s*<header class="work-case-visual-gallery__header">\s*<h2 class="work-case-visual-gallery__title">Brand in motion<\/h2>\s*<\/header>/g;

function normalizeGallery(section) {
  return section
    .replace('aria-label="Brand in motion"', 'aria-label="Gallery"')
    .replace(headerRe, "");
}

const afterChallengeRe =
  /(<section class="work-case-challenge-solution[\s\S]*?<\/section>)/;

function insertGallery(current, gallery) {
  if (galleryRe.test(current)) {
    return current.replace(galleryRe, gallery);
  }
  if (afterChallengeRe.test(current)) {
    return current.replace(afterChallengeRe, `$1${gallery}`);
  }
  const marker = /\r?\n    <div class="branding-case-accordion/;
  if (marker.test(current)) {
    return current.replace(marker, `${gallery}\n\n    <div class="branding-case-accordion`);
  }
  return current;
}

for (const file of changed) {
  if (SKIP.has(file)) {
    console.log("skip (already has gallery)", file);
    continue;
  }
  let oldHtml;
  try {
    oldHtml = execSync(`git show ${BEFORE}:${file}`, { encoding: "utf8" });
  } catch {
    console.log("no old version", file);
    continue;
  }
  const match = oldHtml.match(galleryRe);
  if (!match) {
    console.log("no gallery in old", file);
    continue;
  }
  const gallery = normalizeGallery(match[0]);
  const current = fs.readFileSync(file, "utf8");
  const next = insertGallery(current, gallery);
  if (next === current) {
    console.log("unchanged", file);
    continue;
  }
  fs.writeFileSync(file, next);
  console.log("restored", file);
}
