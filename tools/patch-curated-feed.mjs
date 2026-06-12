/**
 * Point the first six Instagram feed posts at curated local tiles.
 * Run: node tools/patch-curated-feed.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const curatedById = {
  "18104840779910405": "/media/instagram-feed/feed-hatchworks.png",
  "18096125648023773": "/media/instagram-feed/feed-audrey-studio.png",
  "18096788864008757": "/media/instagram-feed/feed-vizion-branding.png",
  "17924550996257411": "/media/instagram-feed/feed-social-results.png",
  "18080561033435299": "/media/instagram-feed/feed-instagram-growth.png",
  "17957033043074119": "/media/instagram-feed/feed-brand-proofs.jpg",
};

function patchThumb(obj, url) {
  if (!obj || typeof obj !== "object") return;
  if (Object.prototype.hasOwnProperty.call(obj, "localThumb")) {
    obj.localThumb = url;
  }
  const sizes = obj.sizes;
  if (sizes && typeof sizes === "object") {
    for (const key of Object.keys(sizes)) {
      const size = sizes[key];
      if (size && typeof size.mediaUrl === "string" && size.mediaUrl.startsWith("/media/instagram-feed/")) {
        size.mediaUrl = url;
      }
    }
  }
  if (Array.isArray(obj.children)) {
    obj.children.forEach((child) => patchThumb(child, url));
  }
}

function patchFile(relPath) {
  const filePath = path.join(root, relPath);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(data.posts)) throw new Error(`No posts in ${relPath}`);

  data.posts.forEach((post) => {
    const url = curatedById[post.id];
    if (!url) return;
    patchThumb(post, url);
    post.isReel = false;
    if (post.mediaType === "VIDEO") post.mediaType = "IMAGE";
  });

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`patched ${relPath}`);
}

function patchFallbackJs() {
  const filePath = path.join(root, "instagram-feed-fallback.js");
  let text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/window\.NOBLE_INSTAGRAM_FEED_EMBEDDED\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!match) throw new Error("Could not parse instagram-feed-fallback.js");
  const data = JSON.parse(match[1]);
  if (!Array.isArray(data.posts)) throw new Error("No posts in fallback");

  data.posts.forEach((post) => {
    const url = curatedById[post.id];
    if (!url) return;
    patchThumb(post, url);
    post.isReel = false;
    if (post.mediaType === "VIDEO") post.mediaType = "IMAGE";
  });

  fs.writeFileSync(
    filePath,
    `/* Auto-generated — run: node tools/download-instagram-thumbs.mjs */\nwindow.NOBLE_INSTAGRAM_FEED_EMBEDDED = ${JSON.stringify(data, null, 2)};\n`
  );
  console.log("patched instagram-feed-fallback.js");
}

patchFile("instagram-feed.json");
patchFallbackJs();
