/**
 * Downloads Instagram post thumbnails into media/instagram-feed/ and patches
 * instagram-feed.json + instagram-feed-fallback.js to use local URLs.
 *
 * Usage:
 *   node tools/download-instagram-thumbs.mjs
 *   BEHOLD_FEED_URL=https://feeds.behold.so/YOUR_ID node tools/download-instagram-thumbs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const feedPath = path.join(root, "instagram-feed.json");
const outDir = path.join(root, "media", "instagram-feed");
const fallbackPath = path.join(root, "instagram-feed-fallback.js");

const BEHOLD_FEED_URL = (process.env.BEHOLD_FEED_URL || "").trim();

async function loadFeed() {
  if (BEHOLD_FEED_URL) {
    const r = await fetch(BEHOLD_FEED_URL, { headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error(`Behold feed ${r.status}: ${BEHOLD_FEED_URL}`);
    return r.json();
  }
  return JSON.parse(fs.readFileSync(feedPath, "utf8"));
}

function pickRemoteThumb(post) {
  const isRemote = (u) =>
    typeof u === "string" && /^https?:\/\//i.test(u.trim()) && !/\.mp4(\?|$)/i.test(u);
  const sizes = post.sizes && typeof post.sizes === "object" ? post.sizes : null;
  const fromSizes = (k) => {
    const u = sizes?.[k]?.mediaUrl;
    return isRemote(u) ? u.trim() : "";
  };
  return (
    fromSizes("large") ||
    fromSizes("medium") ||
    fromSizes("full") ||
    fromSizes("small") ||
    (isRemote(post.thumbnailUrl) ? post.thumbnailUrl.trim() : "") ||
    (isRemote(post.mediaUrl) ? post.mediaUrl.trim() : "")
  );
}

function setLocalThumb(post, localUrl) {
  post.localThumb = localUrl;
  if (!post.sizes || typeof post.sizes !== "object") post.sizes = {};
  for (const key of ["large", "medium", "small", "full"]) {
    if (!post.sizes[key] || typeof post.sizes[key] !== "object") {
      post.sizes[key] = { mediaUrl: localUrl, width: 400, height: 500 };
    } else {
      post.sizes[key].mediaUrl = localUrl;
    }
  }
  if (Array.isArray(post.children)) {
    for (const ch of post.children) setLocalThumb(ch, localUrl);
  }
}

async function downloadWithFetch(url, dest) {
  const r = await fetch(url, {
    headers: {
      Accept: "image/*,*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    redirect: "follow",
  });
  if (!r.ok) return false;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 500) return false;
  fs.writeFileSync(dest, buf);
  return true;
}

async function downloadWithPlaywright(url, dest) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(2500);

    const imageUrl = await page.evaluate(() => {
      const og = document.querySelector('meta[property="og:image"]');
      if (og?.content && !/150x150|profile/i.test(og.content)) return og.content;
      const candidates = [...document.querySelectorAll("article img, main img")];
      let best = "";
      let bestArea = 0;
      for (const img of candidates) {
        const src = img.currentSrc || img.src || "";
        if (!src.startsWith("http") || /150x150|profile_pic|avatar/i.test(src)) continue;
        const w = img.naturalWidth || img.width || 0;
        const h = img.naturalHeight || img.height || 0;
        const area = w * h;
        if (area > bestArea) {
          bestArea = area;
          best = src;
        }
      }
      return best;
    });

    if (!imageUrl) return false;
    const resp = await page.request.get(imageUrl);
    if (!resp.ok()) return false;
    fs.writeFileSync(dest, await resp.body());
    return fs.statSync(dest).size > 8000;
  } finally {
    await browser.close();
  }
}

function writeFallback(feed) {
  const body = `/* Auto-generated — run: node tools/download-instagram-thumbs.mjs */\nwindow.NOBLE_INSTAGRAM_FEED_EMBEDDED = ${JSON.stringify(feed, null, 2)};\n`;
  fs.writeFileSync(fallbackPath, body, "utf8");
}

async function main() {
  const feed = await loadFeed();
  if (!Array.isArray(feed.posts) || !feed.posts.length) {
    throw new Error("Feed has no posts");
  }

  fs.mkdirSync(outDir, { recursive: true });

  let ok = 0;
  for (const post of feed.posts) {
    const id = String(post.id || "").trim();
    const permalink = String(post.permalink || "").trim();
    if (!id || !permalink) continue;

    const dest = path.join(outDir, `${id}.jpg`);
    const localUrl = `/media/instagram-feed/${id}.jpg`;

    if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) {
      setLocalThumb(post, localUrl);
      ok++;
      console.log(`skip ${id} (exists)`);
      continue;
    }

    const remote = pickRemoteThumb(post);
    let saved = remote ? await downloadWithFetch(remote, dest) : false;
    if (!saved) {
      console.log(`playwright ${permalink}`);
      try {
        saved = await downloadWithPlaywright(permalink, dest);
      } catch (e) {
        console.warn(`  playwright failed: ${e.message}`);
      }
    }

    if (saved) {
      setLocalThumb(post, localUrl);
      ok++;
      console.log(`ok ${id}`);
    } else {
      console.warn(`fail ${id} ${permalink}`);
    }
  }

  fs.writeFileSync(feedPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
  writeFallback(feed);
  console.log(`Done: ${ok}/${feed.posts.length} thumbnails → ${outDir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
