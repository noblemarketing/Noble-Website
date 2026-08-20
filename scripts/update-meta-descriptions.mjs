import fs from "fs";
import path from "path";

const ROOT = process.cwd();

/** @type {Record<string, string>} */
const DESCRIPTIONS = {
  "index.html":
    "Branding, website design, and organic social for South Central PA businesses and beyond. Boutique studio led by Audrey Heller. Book a discovery call today.",
  "home/index.html":
    "Branding, website design, and organic social for South Central PA businesses and beyond. Boutique studio led by Audrey Heller. Book a discovery call today.",
  "about/index.html":
    "Meet Audrey Heller, founder of a boutique branding and marketing studio in South Central PA. Strategy-led design for small businesses, nonprofits, and more.",
  "services/index.html":
    "Branding, custom websites, and organic social media from a boutique studio in South Central PA. Clear steps, thoughtful design. Explore services and packages.",
  "services/branding/index.html":
    "Custom logo and brand identity design in Lancaster, Harrisburg, and across PA. Boutique branding packages starting at $850. Book a discovery call today.",
  "branding/index.html":
    "Custom logo and brand identity design in Lancaster, Harrisburg, and across PA. Boutique branding packages starting at $850. Book a discovery call today.",
  "services/website-design/index.html":
    "Custom, conversion-focused website design for small businesses across Pennsylvania. Built for credibility and lasting quality. Start your project today.",
  "website-design/index.html":
    "Custom, conversion-focused website design for small businesses across Pennsylvania. Built for credibility and lasting quality. Start your project today.",
  "services/social-media/index.html":
    "Cohesive, strategic organic social media content and management that matches your brand. Serving businesses in PA and nationwide. Book a discovery call.",
  "social-media/index.html":
    "Cohesive, strategic organic social media content and management that matches your brand. Serving businesses in PA and nationwide. Book a discovery call.",
  "portfolio/index.html":
    "Browse branding, website, and social media projects from Noble Marketing &amp; Design &mdash; real work for Pennsylvania businesses. Explore the full portfolio.",
  "blog/index.html":
    "Client success stories and marketing insights from Noble Marketing &amp; Design &mdash; branding, websites, and organic social across PA. Read the latest posts.",
  "contact/index.html":
    "Book a discovery call with Noble Marketing &amp; Design in South Central PA. Share your branding, website, or social media goals and get clear next steps.",
  "privacy-policy/index.html":
    "Privacy policy for Noble Marketing &amp; Design &mdash; how we handle information when you visit our site or inquire about branding, web, or social services.",
  "terms/index.html":
    "Terms of use for the Noble Marketing &amp; Design website &mdash; guidelines for browsing our branding, web design, and social media portfolio and services.",
  "noble-marketing/index.html":
    "Reference materials for Noble Marketing &amp; Design &mdash; supporting resources adjacent to our main branding, website design, and social media studio site.",
  "template-branding-case/index.html":
    "Template layout for Noble branding case studies &mdash; placeholder structure for portfolio pages featuring logo design, identity systems, and brand guidelines.",

  "work-brookstone-ind/index.html":
    "Brookstone Industries branding and website case study by Noble in Pennsylvania &mdash; identity, messaging, and digital presence for a manufacturing team. See more.",
  "work-revd/index.html":
    "REVD Toys branding and website case study from Noble &mdash; playful identity and digital design for a Pennsylvania toy brand. See how the brand came together.",
  "work-no-nonsense-neutering/index.html":
    "No Nonsense Neutering website case study by Noble &mdash; clear, mission-driven web design for a Pennsylvania nonprofit serving pet owners. View the project.",
  "work-everflame-financial/index.html":
    "Everflame Financial branding case study by Noble in PA &mdash; polished identity and messaging for a consulting firm ready to look as credible as its advice.",
  "work-hsf/index.html":
    "Head Strong Flight branding case study by Noble &mdash; custom logo and identity design for an aviation training business in Pennsylvania. Explore the brand work.",
  "work-da-targets/index.html":
    "DA Targets social media and web case study by Noble &mdash; organic content, print, and digital support for a Pennsylvania shooting sports brand. View the project.",
  "work-gradys/index.html":
    "Grady&apos;s Grill branding case study by Noble in Pennsylvania &mdash; refreshed identity and visual system for a local restaurant and truck stop. See the case study.",
  "work-vizion/index.html":
    "Vizion Consulting branding case study by Noble in PA &mdash; logo, business cards, website, and social for a strategy firm. See how the brand shows up everywhere.",
  "work-living-room-church/index.html":
    "The Living Room Church branding case study by Noble in Pennsylvania &mdash; warm, welcoming identity design for a faith community. View the full case study.",
  "work-wittness-coffeehouse/index.html":
    "Wittness Coffeehouse branding case study by Noble in PA &mdash; logo, packaging, and visual identity for a Lancaster-area coffee shop. Explore the brand work.",
  "work-32-below-ice-cream/index.html":
    "32&deg; Below Ice Cream social media case study by Noble in Lititz, PA &mdash; on-brand content for a family-owned scoop shop with two locations. View the work.",
  "work-hatchworks/index.html":
    "Hatchworks social media case study by Noble in Lancaster, PA &mdash; cohesive organic content for a coworking space with shared desks, offices, and meeting rooms.",
  "work-brad-zimmerman-team/index.html":
    "Brad Zimmerman Team social media case study by Noble in Lancaster County, PA &mdash; listings, agent highlights, and market content for a RE/MAX Pinnacle team.",
  "work-remax-pinnacle/index.html":
    "RE/MAX Pinnacle social media case study by Noble in Lancaster and Dauphin County, PA &mdash; brokerage content that stays professional and locally rooted. View more.",
  "work-hey-peaches/index.html":
    "Hey Peaches branding case study by Noble in Pennsylvania &mdash; full rebrand with peach and coral palette for a women&apos;s fashion boutique. See the identity work.",
  "work-cosmos/index.html":
    "Cosmo Floral Design branding case study by Noble in PA &mdash; elegant logo and identity for a boutique floral studio. View colors, typography, and applications.",
  "work-flintrock/index.html":
    "Flintrock Stables social media case study by Noble in Pennsylvania &mdash; community-first organic content for an equestrian brand. See posts and results.",
  "work-lakewood-reserve/index.html":
    "Lakewood Reserve branding case study by Noble in Pennsylvania &mdash; brand, website, and social for a Raystown Lake tiny-home retreat. Explore the full project.",
  "work-outback-toys/index.html":
    "Outback Toys social media case study by Noble &mdash; organic content strategy and creative for a Pennsylvania retail brand. See how the feed took shape.",
  "work-blaze-yoga/index.html":
    "Blaze Yoga Lancaster social media case study by Noble in PA &mdash; consistent studio content, class promotion, and community voice on organic social channels.",
  "work-pennwood/index.html":
    "Pennwood Development Group branding case study by Noble in Pennsylvania &mdash; identity and collateral for a commercial development firm. See the brand system.",
  "work-tcc/index.html":
    "The Cultivate Collective branding case study by Noble in PA &mdash; faith-led identity direction with clarity and warmth for a values-driven organization.",

  "blog/flint-rock-stables-organic-community-social/index.html":
    "How Flintrock Stables grew organic social with honest barn moments and community-first content in Pennsylvania &mdash; a Noble case note on what actually performs.",
  "blog/outback-toys-first-month-organic-social/index.html":
    "How Noble structured Outback Toys&apos; first month of organic social &mdash; content pillars, posting cadence, and early optimizations after launch. Read the story.",
  "blog/blaze-yoga-lancaster-organic-social-reach/index.html":
    "How Blaze Yoga Lancaster grew organic reach with educational prompts and movement-first reels &mdash; a Noble blog post on studio social strategy in Lancaster, PA.",
  "blog/lakewood-reserve-organic-social-growth/index.html":
    "How Lakewood Reserve stays visible in slow booking seasons with evergreen escapes and guest-ready storytelling on organic social &mdash; a Noble success story.",
  "blog/da-targets-hit-iq-shot-show-launch/index.html":
    "How Noble helped DA Targets launch HIT IQ at SHOT Show &mdash; teasers, booth collateral, email, and live social from Las Vegas. Read the full launch story.",
  "blog/you-have-been-formally-rejected/index.html":
    "On rejection in creative work &mdash; contracts, committees, and candidacies &mdash; and how to move forward without losing your standards. An essay from Noble Marketing.",
};

function decodeLength(htmlContent) {
  return htmlContent
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&apos;/g, "'")
    .replace(/&deg;/g, "°")
    .replace(/&quot;/g, '"')
    .length;
}

function upsertDescription(html, content) {
  const meta = `  <meta name="description" content="${content}" />\n`;
  if (/<meta name="description"/.test(html)) {
    return html.replace(/<meta name="description" content="[^"]*" \/>/, meta.trimEnd());
  }
  return html.replace(
    /(<link rel="apple-touch-icon"[^>]*\/>)\r?\n/,
    `$1\n${meta}`
  );
}

let count = 0;
for (const [rel, content] of Object.entries(DESCRIPTIONS)) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.warn("missing:", rel);
    continue;
  }
  const len = decodeLength(content);
  const flag =
    len < 145 ? ` SHORT(${len})` : len > 165 ? ` LONG(${len})` : ` (${len})`;
  const html = fs.readFileSync(filePath, "utf8");
  const next = upsertDescription(html, content);
  if (next === html && !/<meta name="description"/.test(html)) {
    console.warn("failed insert:", rel);
    continue;
  }
  fs.writeFileSync(filePath, next);
  console.log(`${flag}\t${rel}`);
  count++;
}

console.log("\nupdated", count, "pages");
