import fs from "fs";
import path from "path";

const ROOT = process.cwd();

/** @type {Record<string, string>} */
const TITLES = {
  "index.html":
    "Branding & Web Design Studio in South Central PA | Noble",
  "about/index.html":
    "About Audrey — Boutique Branding & Marketing Studio Owner",
  "services/index.html":
    "Branding, Web Design & Social Media Services | Noble Marketing",
  "services/branding/index.html":
    "Brand Identity & Logo Design in Lancaster County, PA | Noble",
  "branding/index.html":
    "Brand Identity & Logo Design in Lancaster County, PA | Noble",
  "services/website-design/index.html":
    "Custom Website Design for Small Businesses in PA | Noble",
  "website-design/index.html":
    "Custom Website Design for Small Businesses in PA | Noble",
  "services/social-media/index.html":
    "Organic Social Media Management & Content | Noble Marketing",
  "social-media/index.html":
    "Organic Social Media Management & Content | Noble Marketing",
  "portfolio/index.html":
    "Branding & Web Design Portfolio | Noble Marketing & Design",
  "blog/index.html":
    "Client Success Stories & Marketing Insights | Noble Marketing",
  "contact/index.html":
    "Book a Discovery Call | Noble Marketing & Design",
  "privacy-policy/index.html": "Privacy Policy | Noble Marketing & Design",
  "terms/index.html": "Terms of Use | Noble Marketing & Design",
  "noble-marketing/index.html": "Noble Marketing Resources & Reference",
  "template-branding-case/index.html": "Branding Case Study Template | Noble",
  "home/index.html":
    "Branding & Web Design Studio in South Central PA | Noble",

  "work-brookstone-ind/index.html":
    "Brookstone Industries Branding Case Study | Noble",
  "work-revd/index.html": "REVD Toys Branding Case Study | Noble",
  "work-no-nonsense-neutering/index.html":
    "No Nonsense Neutering Website Case Study | Noble",
  "work-everflame-financial/index.html":
    "Everflame Financial Branding Case Study | Noble",
  "work-hsf/index.html": "Head Strong Flight Branding Case Study | Noble",
  "work-da-targets/index.html": "DA Targets Social Media Case Study | Noble",
  "work-gradys/index.html": "Grady's Grill Branding Case Study | Noble",
  "work-vizion/index.html": "Vizion Consulting Branding Case Study | Noble",
  "work-living-room-church/index.html":
    "Living Room Church Branding Case Study | Noble",
  "work-wittness-coffeehouse/index.html":
    "Wittness Coffeehouse Branding Case Study | Noble",
  "work-32-below-ice-cream/index.html":
    "32° Below Ice Cream Social Media Case Study | Noble",
  "work-hatchworks/index.html": "Hatchworks Social Media Case Study | Noble",
  "work-brad-zimmerman-team/index.html":
    "Brad Zimmerman Team Social Media Case Study | Noble",
  "work-remax-pinnacle/index.html":
    "RE/MAX Pinnacle Social Media Case Study | Noble",
  "work-hey-peaches/index.html": "Hey Peaches Branding Case Study | Noble",
  "work-cosmos/index.html": "Cosmo Floral Branding Case Study | Noble",
  "work-flintrock/index.html":
    "Flintrock Stables Social Media Case Study | Noble",
  "work-lakewood-reserve/index.html":
    "Lakewood Reserve Branding Case Study | Noble",
  "work-outback-toys/index.html":
    "Outback Toys Social Media Case Study | Noble",
  "work-blaze-yoga/index.html":
    "Blaze Yoga Social Media Case Study | Noble",
  "work-pennwood/index.html":
    "Pennwood Development Branding Case Study | Noble",
  "work-tcc/index.html":
    "Cultivate Collective Branding Case Study | Noble",

  "blog/flint-rock-stables-organic-community-social/index.html":
    "Flintrock Stables Organic Social Growth | Noble Blog",
  "blog/outback-toys-first-month-organic-social/index.html":
    "Outback Toys Organic Social Launch | Noble Blog",
  "blog/blaze-yoga-lancaster-organic-social-reach/index.html":
    "Blaze Yoga Lancaster Organic Reach | Noble Blog",
  "blog/lakewood-reserve-organic-social-growth/index.html":
    "Lakewood Reserve Social Media Growth | Noble Blog",
  "blog/da-targets-hit-iq-shot-show-launch/index.html":
    "DA Targets HIT IQ SHOT Show Launch | Noble Blog",
  "blog/you-have-been-formally-rejected/index.html":
    "Why Brands Get Formally Rejected | Noble Blog",
};

function replaceTitle(filePath, title) {
  const html = fs.readFileSync(filePath, "utf8");
  const next = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  if (next === html) {
    console.warn("no title tag:", filePath);
    return false;
  }
  fs.writeFileSync(filePath, next);
  const len = title.length;
  const flag = len > 60 ? " (>" + len + ")" : "";
  console.log(`${len}${flag}\t${title}`);
  return true;
}

let count = 0;
for (const [rel, title] of Object.entries(TITLES)) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.warn("missing:", rel);
    continue;
  }
  if (replaceTitle(filePath, title)) count++;
}

console.log("\nupdated", count, "pages");
