import fs from "fs";
import path from "path";

const ROOT = process.cwd();

/** @type {[string, string][]} longest-first */
const REPLACEMENTS = [
  [
    "Case study page stub — Noble is restoring full long-form case content after a file loss. The studio\u2019s original narrative and process detail will return here; until then, this page keeps portfolio routing, SEO slugs, and design-system hooks intact.",
    "Case study page stub — I\u2019m restoring full long-form case content after a file loss. The original narrative and process detail will return here; until then, this page keeps portfolio routing, SEO slugs, and design-system hooks intact.",
  ],
  [
    "Case study page stub &mdash; Noble is restoring full long-form case content after a file loss. The studio's original narrative and process detail will return here; until then, this page keeps portfolio routing, SEO slugs, and design-system hooks intact.",
    "Case study page stub &mdash; I\u2019m restoring full long-form case content after a file loss. The original narrative and process detail will return here; until then, this page keeps portfolio routing, SEO slugs, and design-system hooks intact.",
  ],
  [
    "Noble supported brand, digital, and/or social for this client with the same research-forward process I use across engagements. If you are evaluating fit for your team, the fastest next step is a short discovery call.",
    "I supported brand, digital, and/or social for this client with the same research-forward process I use across every engagement. If you\u2019re evaluating fit, the fastest next step is a short discovery call.",
  ],
  [
    "Noble doesn&apos;t believe in one-size-fits-all design. The process is rooted in a deep commitment to creating unique visuals that reflect the heart of each brand. Every project is approached with care, collaboration, and dedication&mdash;because your business deserves more than a template, it deserves intention.",
    "I don&apos;t believe in one-size-fits-all design. My process is rooted in a deep commitment to creating unique visuals that reflect the heart of each brand. I approach every project with care, collaboration, and dedication&mdash;because your business deserves more than a template, it deserves intention.",
  ],
  [
    "At Noble, I believe great work starts with genuine connection. Taking the time to build intentional relationships with clients&mdash;listening closely to their pain points, goals, and long-term vision&mdash;so every solution feels thoughtful, personal, and purpose-built.",
    "I believe great work starts with genuine connection. I take the time to build intentional relationships with clients&mdash;listening closely to their pain points, goals, and long-term vision&mdash;so every solution feels thoughtful, personal, and purpose-built.",
  ],
  [
    "As a Graphic Designer and Strategic Marketer, Audrey brings a diverse skill set and a deep passion for helping businesses elevate their brands with clarity and intention. Her expertise spans brand identity development, creative direction, and digital marketing, where she focuses on building visually compelling solutions that are not only aesthetically refined, but strategically effective.",
    "As a graphic designer and strategic marketer, I bring a diverse skill set and a deep passion for helping businesses elevate their brands with clarity and intention. My expertise spans brand identity development, creative direction, and digital marketing, where I focus on building visually compelling solutions that are not only aesthetically refined, but strategically effective.",
  ],
  [
    "With hands-on experience across social media platforms, website design and development, and multi-channel marketing, Audrey has worked with businesses in ecommerce, professional services, manufacturing, outdoor and lifestyle brands, hospitality, and creative industries. Her work includes designing and managing social media content, developing conversion-focused websites, and crafting cohesive brand systems that translate seamlessly across digital and print touchpoints.",
    "With hands-on experience across social media platforms, website design and development, and multi-channel marketing, I&apos;ve worked with businesses in ecommerce, professional services, manufacturing, outdoor and lifestyle brands, hospitality, and creative industries. My work includes designing and managing social media content, developing conversion-focused websites, and crafting cohesive brand systems that translate seamlessly across digital and print touchpoints.",
  ],
  [
    "Driven by a commitment to excellence, Audrey is dedicated to exceeding client expectations&mdash;creating work that not only looks polished, but performs with purpose.",
    "Driven by a commitment to excellence, I&apos;m dedicated to exceeding client expectations&mdash;creating work that not only looks polished, but performs with purpose.",
  ],
  [
    "Integrity guides every relationship through honesty, transparency, and purpose. Clear communication and thoughtful decision-making ensure clients feel confident and supported at every step.",
    "I guide every relationship with integrity&mdash;honesty, transparency, and purpose. Clear communication and thoughtful decision-making help clients feel confident and supported at every step.",
  ],
  [
    "Creativity is more than aesthetics&mdash;it&apos;s a problem-solving tool. Each project is approached with fresh perspective and intention, resulting in original, meaningful visuals tailored to every brand&apos;s unique story.",
    "Creativity is more than aesthetics&mdash;it&apos;s a problem-solving tool. I approach each project with fresh perspective and intention, resulting in original, meaningful visuals tailored to every brand&apos;s unique story.",
  ],
  [
    "Strong partnerships are built on trust. Taking the time to listen, understand, and align with client goals creates work that feels collaborative, personal, and grounded in mutual respect.",
    "Strong partnerships are built on trust. I take the time to listen, understand, and align with your goals so the work feels collaborative, personal, and grounded in mutual respect.",
  ],
  [
    "Every project receives focused attention and commitment. With care for detail and a dedication to excellence, each brand is treated with the respect it deserves&mdash;resulting in thoughtful, purpose-driven work. Noble is dedicated to honoring God and others.",
    "Every project receives my focused attention and commitment. With care for detail and a dedication to excellence, I treat each brand with the respect it deserves&mdash;resulting in thoughtful, purpose-driven work. I&apos;m dedicated to honoring God and others.",
  ],
  [
    "Noble Marketing &amp; Design works with <strong>small businesses</strong>, <strong>nonprofits</strong>,",
    "I work with <strong>small businesses</strong>, <strong>nonprofits</strong>,",
  ],
  [
    "Many of Noble&apos;s projects run fully remotely&mdash;clear communication, shared tools, and a steady rhythm so distance",
    "Many of my projects run fully remotely&mdash;clear communication, shared tools, and a steady rhythm so distance",
  ],
  [
    "The studio is located in <strong>South Central Pennsylvania</strong>. I regularly partner with organizations throughout the region,",
    "I&apos;m based in <strong>South Central Pennsylvania</strong>. I regularly partner with organizations throughout the region,",
  ],
  [
    "Noble has also supported clients outside Pennsylvania, including work tied to",
    "I&apos;ve also supported clients outside Pennsylvania, including work tied to",
  ],
  [
    "Explore Noble\u2019s core offerings: strategic branding, editorial website design, and social media support tailored to help your business grow with clarity and consistency.",
    "Explore my core offerings: strategic branding, editorial website design, and social media support tailored to help your business grow with clarity and consistency.",
  ],
  [
    "Explore Noble's core offerings: strategic branding, editorial website design, and social media support tailored to help your business grow with clarity and consistency.",
    "Explore my core offerings: strategic branding, editorial website design, and social media support tailored to help your business grow with clarity and consistency.",
  ],
  [
    "How Noble approaches branding",
    "How I approach branding",
  ],
  [
    "How Noble approaches websites",
    "How I approach websites",
  ],
  [
    "How Noble approaches social media",
    "How I approach social media",
  ],
  [
    "How Noble approaches this",
    "How I approach this",
  ],
  [
    "Noble&apos;s website packages are designed for businesses that are serious about how they show up online. I don&apos;t do cookie-cutter—every site is thoughtfully designed around your brand, your audience, and your goals.",
    "My website packages are designed for businesses that are serious about how they show up online. I don&apos;t do cookie-cutter—every site is thoughtfully designed around your brand, your audience, and your goals.",
  ],
  [
    "The most elevated offering Noble provides. The Premium package is a fully bespoke website built from the ground up—custom-coded, deeply strategic, and engineered for performance.",
    "My most elevated offering. The Premium package is a fully bespoke website built from the ground up—custom-coded, deeply strategic, and engineered for performance.",
  ],
  [
    "Not sure which tier is right? Every Noble website starts with a free 30-minute discovery call—no pressure.",
    "Not sure which tier is right? Every website project starts with a free 30-minute discovery call—no pressure.",
  ],
  [
    "Feeds work when the rhythm is realistic. Noble plans around your voice, seasons, and capacity—pairing caption work with visuals that match the brand system you already have (or one I build with you).",
    "Feeds work when the rhythm is realistic. I plan around your voice, seasons, and capacity—pairing caption work with visuals that match the brand system you already have (or one I build with you).",
  ],
  [
    "Creating cohesive visuals, thoughtful messaging, and strategic content that aligns with your brand and supports long-term growth&mdash;so your online presence feels polished, consistent, and purposeful.",
    "I create cohesive visuals, thoughtful messaging, and strategic content that aligns with your brand and supports long-term growth&mdash;so your online presence feels polished, consistent, and purposeful.",
  ],
  [
    "A quick read on the Noble studio experience before you reach out.",
    "A quick read on working with me before you reach out.",
  ],
  [
    "Ways to reach Noble",
    "Ways to reach me",
  ],
  [
    "Noble partnered on the full launch arc:",
    "I partnered on the full launch arc:",
  ],
  [
    "We built a <strong>pre-show teaser phase</strong>",
    "I built a <strong>pre-show teaser phase</strong>",
  ],
  [
    "We opened with a \u201cclassified\u201d drop",
    "I opened with a \u201cclassified\u201d drop",
  ],
  [
    "We treated the HIT IQ launch as one campaign with shared messaging—not a pile of separate deliverables. Noble developed and executed strategy for:",
    "I treated the HIT IQ launch as one campaign with shared messaging—not a pile of separate deliverables. I developed and executed strategy for:",
  ],
  [
    "How Noble set DA up for a successful drop",
    "How I set DA up for a successful drop",
  ],
  [
    "Noble continues to support social, web, and print so the brand stays as current as the product shelf.",
    "I continue to support social, web, and print so the brand stays as current as the product shelf.",
  ],
  [
    "aligned with the studio's values and voice.",
    "aligned with the client&apos;s values and voice.",
  ],
  ["Noble supports ", "I support "],
  ["Noble supported ", "I supported "],
  ["Noble developed ", "I developed "],
  ["Noble created ", "I created "],
  ["Noble designed ", "I designed "],
  ["Noble delivered ", "I delivered "],
  ["Noble built ", "I built "],
  ["Noble took over ", "I took over "],
  ["Noble led ", "I led "],
  ["Noble refreshed ", "I refreshed "],
  [
    "Noble developed their full brand identity and website.",
    "I developed their full brand identity and website.",
  ],
  [
    "Noble created their brand identity to reflect warmth, belonging, and faith.",
    "I created their brand identity to reflect warmth, belonging, and faith.",
  ],
  [
    "Noble created a brand identity blending vintage apothecary charm with modern warmth to reflect the cafe's inviting spirit.",
    "I created a brand identity blending vintage apothecary charm with modern warmth to reflect the cafe's inviting spirit.",
  ],
  [
    "Noble handled full brand development, website, and ongoing social media management.",
    "I handled full brand development, website, and ongoing social media management.",
  ],
  [
    "Noble supports Blaze Yoga with social media strategy and content that reflects the studio's motivating community culture.",
    "I support Blaze Yoga with social media strategy and content that reflects the studio's motivating community culture.",
  ],
  [
    "Noble developed a clean, modern brand presentation to support long-term positioning and trust.",
    "I developed a clean, modern brand presentation to support long-term positioning and trust.",
  ],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(html|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let fileCount = 0;
let replaceCount = 0;

for (const filePath of walk(ROOT)) {
  const rel = path.relative(ROOT, filePath);
  if (rel === "_fetch_allprojects.html") continue;

  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [from, to] of REPLACEMENTS) {
    if (!content.includes(from)) continue;
    const next = content.split(from).join(to);
    if (next !== content) {
      const n = (content.length - content.replaceAll(from, "").length) / from.length;
      replaceCount += Math.max(1, Math.round(n));
      content = next;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    fileCount++;
    console.log("updated", rel);
  }
}

console.log(`\n${fileCount} files, ~${replaceCount} replacements`);
