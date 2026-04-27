const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const HOME_SPLASH_ENABLED = false;

function setYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setFooterBioText() {
  const text =
    "Noble Marketing & Design is a boutique marketing & design studio that helps businesses elevate their online presence with branding and strategic marketing materials.";
  $$(".footer-bio-text").forEach((el) => {
    el.textContent = text;
  });
}

function setFooterCenterIcon() {
  $$(".footer-center-icon").forEach((img) => {
    img.setAttribute("src", "./Logos/Noble Icon.png");
  });
}

function setupFooterSocialIcons() {
  const iconByNetwork = {
    instagram:
      '<svg class="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"></rect><circle cx="12" cy="12" r="4.1"></circle><circle cx="17.5" cy="6.5" r="1.15"></circle></svg>',
    facebook:
      '<svg class="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1z"></path></svg>',
    linkedin:
      '<svg class="footer-social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 8.4A2.2 2.2 0 1 1 6.4 4a2.2 2.2 0 0 1 0 4.4zM4.6 9.8h3.6V20H4.6zM10.3 9.8h3.4v1.4h.1c.5-.9 1.7-1.7 3.5-1.7 3.7 0 4.4 2.4 4.4 5.6V20H18v-4.3c0-1-.1-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V20h-3.6z"></path></svg>',
  };
  const networks = [
    { key: "instagram", href: "https://www.instagram.com/thenoblemarketing/", label: "Instagram" },
    { key: "facebook", href: "https://www.facebook.com/people/Noble-Marketing/100063772796053/", label: "Facebook" },
    { key: "linkedin", href: "https://www.linkedin.com/company/noble-marketing", label: "LinkedIn" },
  ];

  $$(".site-footer").forEach((footer) => {
    const bio = $(".footer-bio", footer);
    if (!(bio instanceof HTMLElement)) return;

    const connectCol = $(".footer-nav-groups .footer-col:last-child", footer);
    let existingLinks = $$(".footer-social-link", connectCol || footer).filter((a) => a instanceof HTMLAnchorElement);
    if (existingLinks.length === 0) {
      existingLinks = networks.map(({ href, label }) => {
        const a = document.createElement("a");
        a.href = href;
        a.textContent = label;
        return a;
      });
    }

    const mapped = networks.map(({ key, label, href: fallbackHref }) => {
      const fromDom =
        existingLinks.find((a) => (a.getAttribute("href") || "").toLowerCase().includes(key)) ||
        existingLinks.find((a) => (a.textContent || "").toLowerCase().includes(label.toLowerCase()));
      return {
        key,
        label,
        href: fromDom?.getAttribute("href") || fallbackHref,
      };
    });

    let bioSocial = $(".footer-social--bio", bio);
    if (!(bioSocial instanceof HTMLElement)) {
      bioSocial = document.createElement("div");
      bioSocial.className = "footer-social footer-social--bio";
      bio.appendChild(bioSocial);
    } else {
      bioSocial.innerHTML = "";
    }

    mapped.forEach(({ key, label, href }) => {
      const a = document.createElement("a");
      a.className = "footer-social-link";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", label);
      a.innerHTML = `${iconByNetwork[key]}<span class="sr-only">${label}</span>`;
      bioSocial.appendChild(a);
    });

    const connectSocial = $(".footer-col:last-child .footer-social", footer);
    connectSocial?.remove();
  });
}

function setupWorkCaseClientProfiles() {
  if (!document.body.classList.contains("page-work-case")) return;

  const slug = (location.pathname.split("/").pop() || "").toLowerCase();
  const left = document.querySelector(".work-case-client-board__left");
  const right = document.querySelector(".work-case-client-board__right");
  const nextLink = document.querySelector(".work-case-client-board__next");
  if (!(left instanceof HTMLElement) || !(right instanceof HTMLElement) || !(nextLink instanceof HTMLAnchorElement)) return;

  const profiles = {
    "work-brookstone-ind.html": {
      name: "Brookstone Industries",
      logo: "./Clients/Brookstone/Logos/Brookstone-Horizontal Logo-Icon - Main.svg",
      services: "Branding + Website",
      niche: "Metal Fabrication / Industrial Manufacturing",
      location: "PA",
      about:
        'Precision sheet metal ductwork and custom metal fabrication company serving industrial, commercial, and residential projects. Known for their "Better Metal Faster" motto, they specialize in HVAC duct fabrication and custom fittings out of Ephrata, PA.',
      links: [
        { label: "Website", href: "https://brookstoneind.com" },
        { label: "Instagram", href: "https://instagram.com/brookstoneindustries" },
        { label: "LinkedIn", href: "https://linkedin.com/company/brookstone-industries" },
      ],
    },
    "work-revd.html": {
      name: "REVD Toys",
      logo: "./Client Logos/black revd.svg",
      services: "Branding + Website",
      niche: "Collectible Toys / Agriculture",
      location: "PA",
      about:
        "Founded in 2025, REVD Toys creates precision-engineered, scale model farm toys and collectibles for serious collectors and ag enthusiasts. Noble delivered full brand identity, custom retail packaging, and a Shopify website.",
      links: [
        { label: "Website", href: "https://revdtoys.com" },
        { label: "Facebook", href: "https://facebook.com/p/REVD-Toys-61577368115099" },
        { label: "Instagram", href: "https://www.instagram.com/revdtoys/" },
      ],
    },
    "work-no-nonsense-neutering.html": {
      name: "No Nonsense Neutering",
      logo: "",
      services: "Website",
      niche: "Nonprofit / Animal Welfare",
      location: "PA",
      about:
        "A 501(c)3 nonprofit founded in 2008 providing affordable sterilization and vaccination services for pets and community cats. Operating three clinic locations across the Lehigh Valley, Reading, and Plains, PA — they have impacted over 190,000 cats and dogs.",
      links: [
        { label: "Website", href: "https://nnnlv.org" },
        { label: "Facebook", href: "https://facebook.com/NoNonsenseNeutering" },
      ],
    },
    "work-everflame-financial.html": {
      name: "Everflame Financial Consulting",
      logo: "./Client Logos/Everflae.svg",
      services: "Branding",
      niche: "Financial Consulting",
      location: "PA",
      about:
        "A financial consulting firm built on themes of rebirth and resilience, guiding individuals, entrepreneurs, and organizations through financial challenges toward their next chapter. Noble crafted a full brand identity centered on the symbolism of an ever-burning flame.",
      links: [],
    },
    "work-hsf.html": {
      name: "Head Strong Flight",
      logo: "./Client Logos/HSF.svg",
      services: "Branding",
      niche: "Archery / Hunting",
      location: "PA",
      about:
        "A custom arrow company rooted in trust, integrity, and precision. The brand identity draws on earthy tones, mountain silhouettes, and archer motifs to reflect the rugged, purposeful spirit of the hunt.",
      links: [
        { label: "Website", href: "https://headstrongflight.com" },
        { label: "Facebook", href: "https://facebook.com/headstrongflightllc" },
        { label: "Instagram", href: "https://instagram.com/headstrongflight" },
        { label: "TikTok", href: "https://tiktok.com/@headstrongflight" },
      ],
    },
    "work-da-targets.html": {
      name: "DA Targets",
      logo: "./Client Logos/DA.svg",
      services: "Social Media + Website Management + Print",
      niche: "Firearms Training / Tactical Equipment",
      location: "PA",
      about:
        "A Pennsylvania-based company making self-healing polymer shooting targets with a patented color-change feature for instant visual feedback. Serving military, law enforcement, and civilian shooters, Noble manages their social media content and print materials.",
      links: [
        { label: "Website", href: "https://da-targets.com" },
        { label: "Facebook", href: "https://facebook.com/DaTargets" },
        { label: "Instagram", href: "https://instagram.com/da_targets" },
      ],
    },
    "work-gradys.html": {
      name: "Grady's Grill & Truckstop",
      logo: "./Client Logos/Background.svg",
      services: "Branding",
      niche: "Food & Beverage / Diner",
      location: "PA",
      about:
        "A beloved community fixture since 1981, Grady's Grill & Truckstop is a roadside diner with deep roots in tradition and local charm. Noble refreshed their brand identity to honor their history while modernizing their visual presence.",
      links: [],
    },
    "work-vizion.html": {
      name: "Vizion Consulting",
      logo: "./Client Logos/Vizion.svg",
      services: "Branding + Website + Social Media",
      niche: "Leadership & Business Consulting",
      location: "PA",
      about:
        "A values-driven consulting firm based in York/Lancaster, PA, helping leaders and organizations achieve meaningful growth through servant leadership, integrity, and strategic guidance. Noble developed their full brand identity and website.",
      links: [
        { label: "Website", href: "https://vizionconsulting.com" },
        { label: "Instagram", href: "https://www.instagram.com/vizion.consulting/" },
      ],
    },
    "work-living-room-church.html": {
      name: "The Living Room Church",
      logo: "",
      services: "Branding",
      niche: "Church / Religious Organization",
      location: "FL",
      about:
        "A community-centered church based in Winter Springs, Florida (near Orlando), focused on authentic connection and gathering. Noble created their brand identity to reflect warmth, belonging, and faith.",
      links: [
        { label: "Website", href: "https://thelivingroomorl.square.site" },
        { label: "Instagram", href: "https://instagram.com/thelivingroomchurchorl" },
        { label: "Facebook", href: "https://facebook.com/TheLivingRoomChurchOrlando" },
      ],
    },
    "work-witness-coffeehouse.html": {
      name: "Wittness Coffeehouse",
      logo: "",
      services: "Branding",
      niche: "Coffee Shop / Cafe",
      location: "PA",
      about:
        "A new coffeehouse in Strasburg, PA built around community, presence, and connection over a great cup of coffee. Noble created a brand identity blending vintage apothecary charm with modern warmth to reflect the cafe's inviting spirit.",
      links: [
        { label: "Website", href: "https://wittnesscoffeehouse.com" },
        { label: "Instagram", href: "https://instagram.com/wittnesscoffeehouse" },
        { label: "Facebook", href: "https://facebook.com/p/Wittness-Coffeehouse-61580196470486" },
      ],
    },
    "work-hey-peaches.html": {
      name: "Hey Peaches",
      logo: "",
      services: "Branding",
      niche: "Women's Fashion Boutique",
      location: "PA",
      about:
        "A women's clothing boutique that received a full rebrand to modernize and elevate its look. The refreshed identity features a soft peach and coral palette, clean typography, and a confident message: style should be fun, effortless, and for every woman.",
      links: [
        { label: "Website", href: "https://shopheypeaches.com" },
        { label: "Instagram", href: "https://instagram.com/shop.heypeaches" },
      ],
    },
    "work-cosmos.html": {
      name: "Cosmo Floral Design",
      logo: "",
      services: "Branding",
      niche: "Floral Design / Events",
      location: "KY",
      about:
        'A floral design studio in Lexington, Kentucky, rooted in intention and storytelling. Inspired by the Greek word for "world," founder Hannah\'s brand was built around natural elegance, warm earthy tones, and deeply personal symbolism.',
      links: [{ label: "Instagram", href: "https://instagram.com/cosmo.floraldesign" }],
    },
    "work-flintrock.html": {
      name: "Flintrock Stables",
      logo: "",
      services: "Social Media",
      niche: "Equestrian / Agriculture",
      location: "PA",
      about:
        "A premier equestrian facility in Lititz, Lancaster County, PA — part of the family-owned Flintrock Corporation. Noble manages their social media, showcasing their riding programs, horse care, and community events.",
      links: [
        { label: "Website", href: "https://flintrockcorporation.com" },
        { label: "Instagram", href: "https://www.instagram.com/flintrock_stables/" },
      ],
    },
    "work-lakewood-reserve.html": {
      name: "Lakewood Reserve",
      logo: "",
      services: "Branding + Website + Social Media",
      niche: "Hospitality / Short-Term Rental / Glamping",
      location: "PA",
      about:
        "A modern lakeside tiny home retreat on Raystown Lake in Pennsylvania, offering elevated comfort surrounded by woods, water, and mountains. Noble handled full brand development, website, and ongoing social media management.",
      links: [{ label: "Instagram", href: "https://instagram.com/lakewoodreserve" }],
    },
    "work-outback-toys.html": {
      name: "Outback Toys",
      logo: "./Client Logos/OBT_Logo_Reverse Primary.svg",
      services: "Branding + Website + Social Media",
      niche: "Retail / Farm Toy & Collectibles",
      location: "PA",
      about:
        "One of the largest farm toy retailers in the United States, Outback Toys is a family-owned store rooted in Lititz, Lancaster County, PA — carrying thousands of die-cast farm toys, construction equipment replicas, collectibles, and farm-branded merchandise for kids and adult collectors alike. With roots going back to the early 1990s and a newly expanded state-of-the-art retail location, Outback Toys serves customers locally, nationally, and internationally through both their in-store experience and outbacktoys.com. Known for their exclusive limited-edition releases and deep agricultural heritage, they are a beloved destination for the farming community and a one-of-a-kind gem in Lancaster County.",
      links: [
        { label: "Website", href: "https://www.outbacktoys.com" },
        { label: "Instagram", href: "https://instagram.com/outbacktoys" },
      ],
    },
    "work-blaze-yoga-fitness.html": {
      name: "Blaze Yoga Lancaster",
      logo: "",
      services: "Social Media",
      niche: "Fitness & Wellness",
      location: "PA",
      about:
        "A Lancaster-based hot yoga studio centered on movement, discipline, and personal growth. Noble supports Blaze Yoga with social media strategy and content that reflects the studio's motivating community culture.",
      links: [],
    },
    "work-blaze-yoga.html": {
      name: "Blaze Yoga Lancaster",
      logo: "",
      services: "Social Media",
      niche: "Fitness & Wellness",
      location: "PA",
      about:
        "A Lancaster-based hot yoga studio centered on movement, discipline, and personal growth. Noble supports Blaze Yoga with social media strategy and content that reflects the studio's motivating community culture.",
      links: [],
    },
    "work-pennwood.html": {
      name: "Pennwood Development Group",
      logo: "",
      services: "Branding",
      niche: "Real Estate / Development",
      location: "PA",
      about:
        "Pennwood Development Group is a regional development and investment team focused on strategic growth projects. Noble developed a clean, modern brand presentation to support long-term positioning and trust.",
      links: [],
    },
    "work-tcc.html": {
      name: "The Cultivate Collective",
      logo: "",
      services: "Branding",
      niche: "Faith-Led Organization",
      location: "PA",
      about:
        "The Cultivate Collective is a values-driven organization with a mission rooted in faith, community, and growth. Noble supported brand direction to communicate purpose with clarity and warmth.",
      links: [],
    },
  };

  const profile = profiles[slug];
  if (!profile) return;

  const logoMarkup = profile.logo
    ? `<figure class="work-case-client-board__logo"><img class="work-case-client-board__mark work-case-client-board__mark--hero" src="${profile.logo}" alt="${profile.name} logo" loading="lazy" decoding="async"></figure>`
    : `<h1 class="work-case-client-board__name">${profile.name}</h1>`;

  const linksMarkup =
    profile.links && profile.links.length > 0
      ? `<p class="work-case-client-board__client-links">${profile.links
          .map(
            (link) =>
              `<a class="work-case-client-board__client-link" href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
          )
          .join("")}</p>`
      : "";

  left.innerHTML = `
    <p class="work-case-client-board__back"><a href="./portfolio.html">Back to portfolio</a></p>
    ${logoMarkup}
    <dl class="work-case-client-board__meta" aria-label="Client details">
      <div><dt>Location</dt><dd>${profile.location}</dd></div>
      <div><dt>Niche</dt><dd>${profile.niche}</dd></div>
      <div><dt>Services by Noble</dt><dd>${profile.services}</dd></div>
    </dl>
    ${linksMarkup}
    <p><a class="work-case-client-board__next" href="${nextLink.getAttribute("href") || "./portfolio.html"}" aria-label="${
    nextLink.getAttribute("aria-label") || "next project: portfolio"
  }">→</a></p>
  `;

  const rightTitle = right.querySelector(".work-case-client-board__about-title");
  if (rightTitle) rightTitle.textContent = "About the Client";
  const about = right.querySelector(".work-case-client-board__about");
  if (about instanceof HTMLElement) {
    about.innerHTML = `<p class="lead">${profile.about}</p>`;
  }
}

/** index.html — full-screen intro: green lines meet at center, Noble mark, ~5s then dismiss */
function setupHomeSplash() {
  const root = document.getElementById("home-splash");
  if (!root) return;

  if (!HOME_SPLASH_ENABLED) {
    document.body.classList.remove("home-splash-active");
    root.remove();
    return;
  }

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dismiss = () => {
    document.body.classList.remove("home-splash-active");
    root.classList.add("home-splash--done");
    root.setAttribute("aria-hidden", "true");
    root.removeAttribute("aria-busy");
    if ("inert" in root) root.inert = true;
    window.setTimeout(() => {
      root.remove();
    }, 480);
  };

  if (prefersReduced) {
    dismiss();
    return;
  }

  const skip = root.querySelector(".home-splash__skip");
  skip?.addEventListener("click", dismiss);

  window.setTimeout(dismiss, 3000);
}

function setupHomeHeaderScrollPin() {
  if (!document.body.classList.contains("home-nav-fixed-bottom")) return;

  const header = document.querySelector("[data-elevate]");
  const hero = document.querySelector("#top.hero");
  if (!(header instanceof HTMLElement) || !hero) return;

  const PIN = "home-header--pinned-top";
  const BODY_TOP = "home-header-nav-top";
  /** Stay pinned until hero clears the bar by this many px (stops pin ↔ unpin flicker at the threshold) */
  const PIN_RELEASE_PX = 10;

  let pinned = false;
  let raf = 0;

  const update = () => {
    const heroRect = hero.getBoundingClientRect();
    const headerH = header.offsetHeight;
    const vh = window.innerHeight;
    const maxTop = Math.max(0, vh - headerH);
    const rawTop = heroRect.bottom - headerH;
    const navTop = Math.max(0, Math.min(rawTop, maxTop));

    header.style.setProperty("top", "0");
    header.style.setProperty("bottom", "auto");
    header.style.setProperty("transform", `translate3d(0, ${navTop}px, 0)`);

    let shouldPin;
    if (pinned) {
      shouldPin = rawTop <= PIN_RELEASE_PX;
    } else {
      shouldPin = navTop <= 0.5;
    }
    pinned = shouldPin;

    document.body.classList.toggle(BODY_TOP, shouldPin);
    header.classList.toggle(PIN, shouldPin);

    header.classList.toggle("is-elevated", window.scrollY > 10 || shouldPin);
  };

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

/** One rAF-throttled scroll handler for header shadow + hide-on-scroll (avoids duplicate scroll listeners sitewide). */
function setupHeaderScrollUi() {
  if (document.body.classList.contains("home-nav-fixed-bottom")) return;

  const header = document.querySelector("[data-elevate]");
  const nav = document.getElementById("site-nav");
  if (!header) return;

  const HIDE = "is-scroll-hidden";
  let lastY = window.scrollY;
  let raf = 0;

  const apply = () => {
    raf = 0;
    const y = window.scrollY;
    header.classList.toggle("is-elevated", y > 10);

    if (nav?.classList.contains("is-open")) {
      header.classList.remove(HIDE);
      lastY = y;
      return;
    }
    if (y < 32) {
      header.classList.remove(HIDE);
    } else if (y > lastY) {
      header.classList.add(HIDE);
    } else {
      header.classList.remove(HIDE);
    }
    lastY = y;
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupMobileNav() {
  const btn = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!btn || !nav) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    if (open) {
      document.querySelector("[data-elevate]")?.classList.remove("is-scroll-hidden");
    }
  };

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    const t = e.target;
    if (t instanceof Element) {
      if (nav.contains(t) || btn.contains(t)) return;
      setOpen(false);
    }
  });

  $$(".nav-link", nav).forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  $$(".nav-dropdown-link", nav).forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  $$(".header-discovery").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
}

function setupActiveNav() {
  const links = $$(".site-nav .nav-link").filter((a) => a.getAttribute("href")?.startsWith("#"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter((s) => s instanceof HTMLElement);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const byId = new Map(links.map((a) => [a.getAttribute("href"), a]));

  const obs = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
      if (!visible) return;

      const id = `#${visible.target.id}`;
      links.forEach((a) => a.classList.remove("is-active"));
      const link = byId.get(id);
      if (link) link.classList.add("is-active");
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: [0.05, 0.12, 0.2] },
  );

  sections.forEach((s) => obs.observe(s));
}

function setupPortfolioFilter() {
  const chips = $$(".chip[data-filter]");
  const tiles = $$(".tile[data-kind], .project-card[data-kind]");
  if (chips.length === 0 || tiles.length === 0) return;

  const setActive = (chip) => {
    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-selected", active ? "true" : "false");
    });
  };

  const applyFilter = (kind) => {
    tiles.forEach((t) => {
      const raw = (t.getAttribute("data-kind") || "").trim();
      const kinds = raw.split(/\s+/).filter(Boolean);
      const show = kind === "all" || kinds.includes(kind);
      t.hidden = !show;
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const kind = chip.getAttribute("data-filter") || "all";
      setActive(chip);
      applyFilter(kind);
    });
  });
}

/** portfolio.html — editorial grid filter */
function setupPortfolioMagazineFilter() {
  const root = document.querySelector("[data-portfolio-magazine]");
  if (!root) return;

  const btns = $$(".portfolio-mag-filter[data-mag-filter]", root);
  const items = $$(".portfolio-mag-item[data-mag-cat]", root);
  if (btns.length === 0 || items.length === 0) return;

  const setActive = (activeBtn) => {
    btns.forEach((b) => {
      const on = b === activeBtn;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  const apply = (kind) => {
    items.forEach((el) => {
      const cat = el.getAttribute("data-mag-cat") || "";
      const cats = cat.split(/\s+/).filter(Boolean);
      const show = kind === "all" || cats.includes(kind);
      el.hidden = !show;
    });
  };

  const activateByKind = (kind) => {
    const match = btns.find((b) => (b.getAttribute("data-mag-filter") || "all") === kind);
    if (match) {
      setActive(match);
      apply(kind);
    }
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.getAttribute("data-mag-filter") || "all";
      setActive(btn);
      apply(kind);
    });
  });

  const applyHashFilter = () => {
    const id = (location.hash || "").replace(/^#/, "");
    if (!id.startsWith("portfolio-filter-")) return;
    const el = document.getElementById(id);
    if (!(el instanceof HTMLElement)) return;
    const kind = el.getAttribute("data-mag-filter");
    if (!kind) return;
    activateByKind(kind);
  };

  applyHashFilter();
  window.addEventListener("hashchange", applyHashFilter);
}

function setupLightbox() {
  const dlg = $("#lightbox");
  const img = $("#lightbox-img");
  const cap = $("#lightbox-caption");
  if (!(dlg instanceof HTMLDialogElement) || !(img instanceof HTMLImageElement) || !(cap instanceof HTMLElement)) return;

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || "Portfolio image";
    cap.textContent = alt || "";

    if (typeof dlg.showModal === "function") dlg.showModal();
    else window.open(src, "_blank", "noopener,noreferrer");
  };

  $$(".tile[data-src], .project-card[data-src]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const alt = btn.getAttribute("data-alt") || btn.querySelector("img")?.getAttribute("alt") || "";
      if (src) open(src, alt);
    });
  });

  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dlg.open) dlg.close();
  });
}

function setupProjectStripAuto() {
  const strip = $(".project-strip");
  if (!(strip instanceof HTMLElement)) return;

  const step = () => {
    const card = strip.querySelector(".project-card");
    if (!(card instanceof HTMLElement)) return Math.min(strip.clientWidth * 0.85, 400);
    const gap = 12;
    return card.getBoundingClientRect().width + gap;
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let intervalId = 0;
  let resumeAfter = 0;
  const stopAuto = () => {
    if (intervalId) window.clearInterval(intervalId);
    intervalId = 0;
  };
  const tick = () => {
    const max = strip.scrollWidth - strip.clientWidth - 2;
    if (max <= 0) return;
    if (strip.scrollLeft >= max - 4) {
      strip.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      strip.scrollBy({ left: step(), behavior: "smooth" });
    }
  };
  const startAuto = () => {
    stopAuto();
    window.clearTimeout(resumeAfter);
    if (reduceMotion.matches) return;
    intervalId = window.setInterval(tick, 5000);
  };
  const scheduleResume = () => {
    window.clearTimeout(resumeAfter);
    resumeAfter = window.setTimeout(startAuto, 3500);
  };

  const onMq = () => {
    stopAuto();
    startAuto();
  };
  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", onMq);
  } else {
    reduceMotion.addListener(onMq);
  }

  strip.addEventListener("pointerdown", () => {
    stopAuto();
    window.clearTimeout(resumeAfter);
  });
  strip.addEventListener("pointerup", scheduleResume);
  strip.addEventListener("pointercancel", scheduleResume);

  startAuto();
}

function setupServiceAccordion() {
  const root = document.querySelector("[data-service-accordion]");
  if (!root) return;

  const leftWrap = root.querySelector(".service-horiz-tabs--left");
  const rightWrap = root.querySelector("[data-service-tabs-right]");
  const tabs = $$(".service-horiz-tab", root);
  const panels = $$(".service-horiz-slide", root);
  if (tabs.length === 0 || panels.length === 0 || tabs.length !== panels.length) return;

  /** Tabs 0..active stay on the left (Branding → +Web → +Social); higher indices return to the right rail. */
  const docked = [false, false, false];

  const syncRightEmpty = () => {
    if (rightWrap) {
      rightWrap.classList.toggle("is-empty", rightWrap.children.length === 0);
    }
  };

  const redistributeTabs = () => {
    if (!leftWrap || !rightWrap) return;
    for (let i = 0; i < tabs.length; i++) {
      if (docked[i]) {
        leftWrap.appendChild(tabs[i]);
      }
    }
    for (let i = 0; i < tabs.length; i++) {
      if (!docked[i]) {
        rightWrap.appendChild(tabs[i]);
      }
    }
    syncRightEmpty();
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeIndex = panels.findIndex((p) => p.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  const syncDockedToActive = (index) => {
    for (let j = 0; j < tabs.length; j++) {
      docked[j] = j <= index;
    }
    if (leftWrap && rightWrap) redistributeTabs();
  };

  syncDockedToActive(activeIndex);

  let busy = false;
  let slideSafetyTimer = 0;

  const slideDirClasses = ["service-horiz-slide--from-next", "service-horiz-slide--from-prev"];

  const finishSlide = (prevPanel, nextPanel) => {
    if (prevPanel) {
      prevPanel.classList.remove("service-horiz-slide--prev");
      prevPanel.setAttribute("aria-hidden", "true");
    }
    if (nextPanel) {
      nextPanel.classList.remove("is-sliding-in", "is-slide-run", ...slideDirClasses);
      nextPanel.style.willChange = "";
    }
    busy = false;
  };

  const setOpen = (index) => {
    if (index < 0 || index >= panels.length || busy) return;
    if (index === activeIndex) return;

    syncDockedToActive(index);

    const prev = activeIndex;
    const instantSwitch = reduceMotion.matches;

    const prevPanel = panels[prev];
    const nextPanel = panels[index];

    const applyUi = (targetIndex) => {
      activeIndex = targetIndex;
      tabs.forEach((t, i) => {
        const on = i === targetIndex;
        t.setAttribute("aria-expanded", on ? "true" : "false");
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
    };

    if (instantSwitch) {
      applyUi(index);
      panels.forEach((p, i) => {
        p.classList.toggle("is-active", i === index);
        p.classList.remove("service-horiz-slide--prev", "is-sliding-in", "is-slide-run", ...slideDirClasses);
        p.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      return;
    }

    busy = true;
    applyUi(index);

    prevPanel.classList.remove("is-active");
    prevPanel.classList.add("service-horiz-slide--prev");
    nextPanel.setAttribute("aria-hidden", "false");

    const fromNext = index > prev;
    nextPanel.classList.remove(...slideDirClasses);
    nextPanel.classList.add("is-active", "is-sliding-in", fromNext ? "service-horiz-slide--from-next" : "service-horiz-slide--from-prev");
    nextPanel.style.willChange = "transform";
    void nextPanel.offsetWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextPanel.classList.add("is-slide-run");
      });
    });

    const cleanup = () => {
      window.clearTimeout(slideSafetyTimer);
      nextPanel.removeEventListener("transitionend", onEnd);
      finishSlide(prevPanel, nextPanel);
    };

    const onEnd = (e) => {
      if (e.target !== nextPanel) return;
      const p = e.propertyName || "";
      if (p !== "transform" && p !== "-webkit-transform") return;
      cleanup();
    };

    nextPanel.addEventListener("transitionend", onEnd);

    slideSafetyTimer = window.setTimeout(cleanup, 720);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setOpen(index));
    tab.addEventListener("keydown", (e) => {
      const n = tabs.length;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % n;
        setOpen(next);
        tabs[next]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + n) % n;
        setOpen(prev);
        tabs[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        setOpen(0);
        tabs[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        setOpen(n - 1);
        tabs[n - 1]?.focus();
      }
    });
  });
}

function setupServicesScrollReveal() {
  if (
    !document.body.classList.contains("page-services") &&
    !document.body.classList.contains("page-blog")
  ) {
    return;
  }
  const sections = document.querySelectorAll("[data-reveal-on-scroll]");
  if (sections.length === 0) return;

  const reveal = (el) => {
    el.classList.add("is-revealed");
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );

  sections.forEach((el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.92 && r.bottom > 0) {
      reveal(el);
    } else {
      io.observe(el);
    }
  });
}

function setupAddonsCarousel() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  $$("[data-addons-carousel]").forEach((root) => {
    const track = $(".addons-carousel-track", root);
    const prev = $(".addons-carousel-arrow--prev", root);
    const next = $(".addons-carousel-arrow--next", root);
    if (!(track instanceof HTMLElement) || !prev || !next) return;

    const scrollStep = () => Math.max(220, Math.floor(track.clientWidth * 0.72));

    const scrollByDir = (dir) => {
      const delta = scrollStep() * dir;
      track.scrollBy({
        left: delta,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    };

    prev.addEventListener("click", () => scrollByDir(-1));
    next.addEventListener("click", () => scrollByDir(1));
  });
}

function formatStatValue(n, decimalsAttr) {
  if (decimalsAttr != null && decimalsAttr !== "") {
    const d = parseInt(String(decimalsAttr), 10);
    if (Number.isFinite(d) && d >= 0) {
      return Number(n).toFixed(d);
    }
  }
  const num = Number(n);
  if (num >= 1000) return num.toLocaleString("en-US");
  return String(Math.round(num));
}

function setupReviewsCarousel() {
  document.querySelectorAll("[data-reviews-carousel]").forEach((root) => {
  const vp = $(".reviews-carousel-viewport", root);
  const prev = $(".reviews-carousel-nav--prev", root);
  const next = $(".reviews-carousel-nav--next", root);
  const track = $(".reviews-carousel-track", root);
  if (!(vp instanceof HTMLElement) || !(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) return;
  if (!(track instanceof HTMLElement)) return;

  const stepScroll = () => {
    const slide = track.querySelector(".reviews-carousel-slide");
    if (!(slide instanceof HTMLElement)) return 320;
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    return slide.getBoundingClientRect().width + gap;
  };

  const maxScroll = () => Math.max(0, vp.scrollWidth - vp.clientWidth);

  const sync = () => {
    const m = maxScroll();
    if (m <= 4) {
      prev.disabled = true;
      next.disabled = true;
      return;
    }
    prev.disabled = false;
    next.disabled = false;
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const scrollByDir = (dir) => {
    const step = stepScroll();
    const max = maxScroll();
    if (max <= 4) return;

    const smooth = reduceMotion.matches ? "auto" : "smooth";
    const jump = reduceMotion.matches ? "auto" : "auto";

    if (dir > 0) {
      if (vp.scrollLeft + step >= max - 2) {
        vp.scrollTo({ left: 0, behavior: jump });
      } else {
        vp.scrollBy({ left: step, behavior: smooth });
      }
    } else if (vp.scrollLeft <= 2) {
      vp.scrollTo({ left: max, behavior: jump });
    } else {
      vp.scrollBy({ left: -step, behavior: smooth });
    }
  };

  prev.addEventListener("click", () => scrollByDir(-1));
  next.addEventListener("click", () => scrollByDir(1));
  vp.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync, { passive: true });

  vp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByDir(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByDir(1);
    }
  });

  /** Auto-advance in a loop; pauses when off-screen, hovered, or reduced-motion */
  const AUTO_MS = 6000;
  let autoTimer = 0;
  let sectionVisible = true;
  let hovered = false;

  const clearAuto = () => {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = 0;
    }
  };

  const syncAuto = () => {
    clearAuto();
    if (reduceMotion.matches) return;
    if (maxScroll() <= 4) return;
    if (!sectionVisible || hovered) return;
    autoTimer = window.setInterval(() => scrollByDir(1), AUTO_MS);
  };

  root.addEventListener("mouseenter", () => {
    hovered = true;
    syncAuto();
  });
  root.addEventListener("mouseleave", () => {
    hovered = false;
    syncAuto();
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        sectionVisible = entries.some((e) => e.isIntersecting);
        syncAuto();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(root);
  }

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", () => syncAuto());
  }

  requestAnimationFrame(() => {
    sync();
    syncAuto();
  });
  });
}

function setupStatsCounter() {
  const root = document.querySelector("[data-stats-counter]");
  if (!root) return;

  const nums = $$(".home-stats-num", root);
  if (nums.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setFinal = () => {
    nums.forEach((el) => {
      const target = Number(el.getAttribute("data-target"));
      if (!Number.isFinite(target)) return;
      const dec = el.getAttribute("data-decimals");
      el.textContent = formatStatValue(target, dec);
    });
  };

  const run = () => {
    if (reduceMotion.matches) {
      setFinal();
      return;
    }

    const duration = 1800;
    const easeOut = (t) => 1 - (1 - t) ** 3;

    nums.forEach((el) => {
      const target = Number(el.getAttribute("data-target"));
      if (!Number.isFinite(target)) return;
      const dec = el.getAttribute("data-decimals");

      const start = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const v = easeOut(t) * target;
        el.textContent = formatStatValue(v, dec);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatStatValue(target, dec);
      };

      requestAnimationFrame(tick);
    });
  };

  let triggered = false;
  const io = new IntersectionObserver(
    (entries) => {
      if (triggered) return;
      if (!entries.some((e) => e.isIntersecting)) return;
      triggered = true;
      run();
      io.disconnect();
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  io.observe(root);
}

/** Case studies + blog posts — count-up animation for `.work-case-growth-value` when strip scrolls into view */
function setupWorkCaseGrowthCounters() {
  const strips = document.querySelectorAll(".work-case-growth-strip");
  if (strips.length === 0) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const formatProgress = (current, finalStr) => {
    const hasDecimal = finalStr.includes(".");
    const hasComma = finalStr.includes(",");
    if (hasDecimal) {
      const dec = (finalStr.split(".")[1] || "").length || 1;
      return Number(current).toFixed(Math.min(dec, 2));
    }
    if (hasComma || Math.abs(Math.round(current)) >= 1000) {
      return Math.round(current).toLocaleString("en-US");
    }
    return String(Math.round(current));
  };

  strips.forEach((strip) => {
    const values = Array.from(strip.querySelectorAll(".work-case-growth-value"));
    if (values.length === 0) return;

    values.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      if (!el.dataset.growthFinal) el.dataset.growthFinal = el.textContent.trim();
    });

    const applyFinals = () => {
      values.forEach((el) => {
        if (!(el instanceof HTMLElement) || !el.dataset.growthFinal) return;
        el.textContent = el.dataset.growthFinal;
      });
    };

    const runAll = () => {
      if (strip.dataset.growthCountDone === "1") return;
      strip.dataset.growthCountDone = "1";

      if (reduceMotion.matches) {
        applyFinals();
        return;
      }

      const specs = values.map((el) => {
        const finalStr = el.dataset.growthFinal || "";
        const target = parseFloat(String(finalStr).replace(/,/g, ""));
        return { el, finalStr, target: Number.isFinite(target) ? target : 0 };
      });

      const duration = 1900;
      const easeOut = (t) => 1 - (1 - t) ** 3;
      const start = performance.now();

      specs.forEach(({ el, finalStr }) => {
        if (el instanceof HTMLElement) el.textContent = formatProgress(0, finalStr);
      });

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const e = easeOut(t);
        specs.forEach(({ el, finalStr, target }) => {
          if (!(el instanceof HTMLElement)) return;
          el.textContent = t >= 1 ? finalStr : formatProgress(e * target, finalStr);
        });
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      runAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        runAll();
        io.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(strip);
  });

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", () => {
      if (!reduceMotion.matches) return;
      strips.forEach((strip) => {
        strip.querySelectorAll(".work-case-growth-value").forEach((el) => {
          if (el instanceof HTMLElement && el.dataset.growthFinal) {
            el.textContent = el.dataset.growthFinal;
          }
        });
      });
    });
  }
}

function setupBrandingCaseAccordion() {
  document.querySelectorAll("[data-branding-case-accordion]").forEach((root) => {
    root.querySelectorAll("details.accordion").forEach((det) => {
      det.addEventListener("toggle", () => {
        if (!det.open) return;
        root.querySelectorAll("details.accordion").forEach((other) => {
          if (other !== det) other.open = false;
        });
      });
    });
  });
}

function setupBrandingCaseScrollArrows() {
  document.querySelectorAll(".branding-case-scroll-wrap").forEach((wrap) => {
    const scroller = wrap.querySelector(".branding-case-scroll");
    const prevBtn = wrap.querySelector('.branding-case-scroll-arrow[data-scroll-direction="prev"]');
    const nextBtn = wrap.querySelector('.branding-case-scroll-arrow[data-scroll-direction="next"]');
    if (!(scroller instanceof HTMLElement) || !(prevBtn instanceof HTMLButtonElement) || !(nextBtn instanceof HTMLButtonElement)) return;

    const firstItem = scroller.querySelector(".branding-case-scroll__item");
    const useItemStep =
      wrap.classList.contains("branding-case-scroll-wrap--arrows-below") && firstItem instanceof HTMLElement;

    const shift = () => {
      if (useItemStep) {
        const gapStr = getComputedStyle(scroller).gap || "0px";
        const gap = Number.parseFloat(gapStr) || 0;
        const w = firstItem.getBoundingClientRect().width;
        return Math.max(1, Math.round(w + gap));
      }
      return Math.max(220, Math.round(scroller.clientWidth * 0.72));
    };
    const refresh = () => {
      const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      prevBtn.disabled = scroller.scrollLeft <= 2;
      nextBtn.disabled = scroller.scrollLeft >= max - 2;
    };

    prevBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: -shift(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: shift(), behavior: "smooth" });
    });
    scroller.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();
  });
}

function setupWorkCaseNextPreview() {
  $$(".work-case-client-board__next").forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    if (link.querySelector(".work-case-client-board__next-preview")) return;

    const aria = link.getAttribute("aria-label") || "";
    const match = aria.match(/next project:\s*(.+)$/i);
    const nextName = (match?.[1] || "").trim();
    if (!nextName) return;

    const preview = document.createElement("span");
    preview.className = "work-case-client-board__next-preview";
    preview.textContent = nextName;
    link.prepend(preview);
  });
}

/** Bottom-of-page next case link (same destination as `.work-case-client-board__next`) */
function setupWorkCaseNextFooter() {
  if (!document.body.classList.contains("page-work-case")) return;
  const main = document.getElementById("main");
  const srcNext = document.querySelector(".work-case-client-board__next");
  if (!(main instanceof HTMLElement) || !(srcNext instanceof HTMLAnchorElement)) return;
  if (main.querySelector(".work-case-next-footer")) return;

  const href = srcNext.getAttribute("href");
  if (!href) return;

  const aria = srcNext.getAttribute("aria-label") || "Next portfolio project";
  const nameMatch = aria.match(/next project:\s*(.+)$/i);
  const nextName = (nameMatch?.[1] || "").trim();

  const nav = document.createElement("nav");
  nav.className = "work-case-next-footer";
  nav.setAttribute("aria-label", "Next portfolio case study");

  const a = document.createElement("a");
  a.className = "work-case-next-footer__link";
  a.href = href;
  a.setAttribute("aria-label", aria);

  const arrow = document.createElement("span");
  arrow.className = "work-case-next-footer__arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "\u2193";

  const kicker = document.createElement("span");
  kicker.className = "work-case-next-footer__kicker";
  kicker.textContent = "Next project";

  a.appendChild(arrow);
  a.appendChild(kicker);
  if (nextName) {
    const nameEl = document.createElement("span");
    nameEl.className = "work-case-next-footer__name";
    nameEl.textContent = nextName;
    a.appendChild(nameEl);
  }

  nav.appendChild(a);
  main.appendChild(nav);
}

function setupIconCollageReveal() {
  const collages = $$("[data-icon-collage]");
  if (collages.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    collages.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  collages.forEach((el) => io.observe(el));
}

function setupFaqAccordion() {
  document.querySelectorAll("[data-faq-accordion]").forEach((root) => {
    root.querySelectorAll(".faq-trigger").forEach((btn) => {
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        const nextOpen = !open;

        root.querySelectorAll(".faq-trigger").forEach((other) => {
          if (other === btn) return;
          other.setAttribute("aria-expanded", "false");
          const oid = other.getAttribute("aria-controls");
          const op = oid ? document.getElementById(oid) : null;
          if (op) op.hidden = true;
          const oicon = other.querySelector(".faq-icon");
          if (oicon) oicon.textContent = "+";
        });

        btn.setAttribute("aria-expanded", nextOpen ? "true" : "false");
        panel.hidden = !nextOpen;
        const icon = btn.querySelector(".faq-icon");
        if (icon) icon.textContent = nextOpen ? "−" : "+";
      });
    });
  });
}

function setupBrandingTierReveal() {
  const section = document.querySelector(".branding-showcase-section--reveal-tier");
  if (!section) return;

  section.querySelectorAll(".branding-showcase-photo-trigger").forEach((btn) => {
    const card = btn.closest(".branding-showcase-card");
    const controls = btn.getAttribute("aria-controls");
    const meta = controls ? document.getElementById(controls) : null;
    if (!(card instanceof HTMLElement) || !meta) return;

    btn.addEventListener("click", () => {
      card.classList.toggle("is-tier-revealed");
      const open = card.classList.contains("is-tier-revealed");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      meta.setAttribute("aria-hidden", open ? "false" : "true");
      let lab = btn.getAttribute("aria-label") || "";
      if (open) {
        if (lab.startsWith("Show ")) btn.setAttribute("aria-label", lab.replace(/^Show /, "Hide "));
      } else if (lab.startsWith("Hide ")) {
        btn.setAttribute("aria-label", lab.replace(/^Hide /, "Show "));
      }
    });
  });
}

function setupContactForm() {
  const form = $("#contact-form");
  if (!(form instanceof HTMLFormElement)) return;

  const emailTo = "audrey@thenoblemarketing.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const projectType = String(fd.get("projectType") || fd.get("interest") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const missing = !name || !email || !projectType || !message;
    if (missing) {
      form.reportValidity();
      return;
    }

    const subject = `Boutique Branding and Design Studio inquiry: ${projectType}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      "",
      message,
    ].join("\n");

    const href =
      `mailto:${encodeURIComponent(emailTo)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  });
}

/** services/index.html — one dialog per service (opened from editorial images) */
function setupServicesPricingModals() {
  const idByKey = {
    branding: "pricing-modal-branding",
    websites: "pricing-modal-websites",
    social: "pricing-modal-social",
  };

  $$(".services-editorial-media-trigger[data-pricing-modal]").forEach((btn) => {
    const key = btn.getAttribute("data-pricing-modal") || "";
    const id = idByKey[key];
    const dlg = id ? document.getElementById(id) : null;
    if (!(dlg instanceof HTMLDialogElement) || typeof dlg.showModal !== "function") return;
    btn.addEventListener("click", () => dlg.showModal());
  });

  $$(".services-pricing-dialog").forEach((el) => {
    if (!(el instanceof HTMLDialogElement)) return;
    const closeBtn = el.querySelector(".services-pricing-dialog-close");
    closeBtn?.addEventListener("click", () => el.close());
    el.addEventListener("click", (e) => {
      if (e.target === el) el.close();
    });
  });
}

/** Resolve a path next to script.js (works when pages live in subfolders). */
function nobleScriptSiblingUrl(relativePath) {
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute("src");
    if (!src) continue;
    try {
      const scriptUrl = new URL(src, window.location.href);
      if (!/\/script\.js(\?|#|$)/.test(scriptUrl.pathname)) continue;
      return new URL(relativePath, scriptUrl).href;
    } catch {
      continue;
    }
  }
  return new URL(relativePath, window.location.href).href;
}

/** Noble Marketing Instagram profile (strip tiles + defensive link wrapper). */
const NOBLE_INSTAGRAM_PROFILE = "https://www.instagram.com/thenoblemarketing/";

/** Ensure each fallback grid photo is inside a link to Noble's Instagram (idempotent). */
function ensureInstagramStripFallbackLinked() {
  document.querySelectorAll(".home-instagram-strip__grid img").forEach((img) => {
    if (img.closest("a[href*='instagram.com/thenoblemarketing']")) return;
    const wrap = document.createElement("a");
    wrap.href = NOBLE_INSTAGRAM_PROFILE;
    wrap.target = "_blank";
    wrap.rel = "noopener noreferrer";
    wrap.className = "home-instagram-strip__tile";
    wrap.setAttribute("aria-label", "Open Noble Marketing on Instagram in a new tab");
    img.replaceWith(wrap);
    wrap.appendChild(img);
  });
}

/** Pre-footer Instagram strip from `instagram-feed.json` (Behold-style payload: profile + horizontal thumbnails). */
function setupNobleInstagramHorizontalFeed() {
  const mounts = document.querySelectorAll("[data-noble-instagram-feed]");
  if (!mounts.length) return;

  const profileHref = (username) => {
    const u = String(username || "").replace(/^@/, "").trim();
    return u ? `https://www.instagram.com/${encodeURIComponent(u)}/` : NOBLE_INSTAGRAM_PROFILE;
  };

  const buildInner = (data) => {
    if (!data || typeof data.username !== "string" || !Array.isArray(data.posts) || data.posts.length === 0) {
      return null;
    }
    const username = String(data.username).replace(/^@/, "").trim();
    if (!username) return null;

    const wrap = document.createElement("div");
    wrap.className = "instagram-feed-section__inner site-instagram-prefooter__inner";

    const profile = document.createElement("div");
    profile.className = "instagram-feed-section__profile";

    const avatarLink = document.createElement("a");
    avatarLink.className = "instagram-feed-section__avatar-link";
    avatarLink.href = profileHref(username);
    avatarLink.target = "_blank";
    avatarLink.rel = "noopener noreferrer";
    const avatar = document.createElement("img");
    avatar.className = "instagram-feed-section__avatar";
    avatar.src = String(data.profilePictureUrl || "").trim();
    avatar.alt = `@${username} on Instagram`;
    avatar.width = 88;
    avatar.height = 88;
    avatar.loading = "lazy";
    avatar.decoding = "async";
    avatarLink.appendChild(avatar);

    const meta = document.createElement("div");
    meta.className = "instagram-feed-section__meta";

    const handle = document.createElement("a");
    handle.className = "instagram-feed-section__handle";
    handle.href = profileHref(username);
    handle.target = "_blank";
    handle.rel = "noopener noreferrer";
    handle.textContent = `@${username}`;

    const statEl = document.createElement("p");
    statEl.className = "instagram-feed-section__stats";
    const fc = typeof data.followersCount === "number" && Number.isFinite(data.followersCount) ? data.followersCount : null;
    const fwc = typeof data.followsCount === "number" && Number.isFinite(data.followsCount) ? data.followsCount : null;
    if (fc != null && fwc != null) {
      statEl.textContent = `${fc.toLocaleString()} followers · ${fwc.toLocaleString()} following`;
    } else if (fc != null) {
      statEl.textContent = `${fc.toLocaleString()} followers`;
    }

    meta.appendChild(handle);
    if (statEl.textContent) meta.appendChild(statEl);

    const bioText = typeof data.biography === "string" ? data.biography.trim() : "";
    if (bioText) {
      const bio = document.createElement("p");
      bio.className = "instagram-feed-section__bio";
      bio.style.whiteSpace = "pre-line";
      bio.textContent = bioText;
      meta.appendChild(bio);
    }

    const siteRaw = typeof data.website === "string" ? data.website.trim() : "";
    if (siteRaw) {
      let href = siteRaw;
      try {
        href = new URL(siteRaw.includes("://") ? siteRaw : `https://${siteRaw}`).href;
      } catch {
        href = siteRaw.includes("://") ? siteRaw : `https://${siteRaw}`;
      }
      const web = document.createElement("a");
      web.className = "instagram-feed-section__website";
      web.href = href;
      web.target = "_blank";
      web.rel = "noopener noreferrer";
      try {
        web.textContent = new URL(href).hostname.replace(/^www\./, "");
      } catch {
        web.textContent = "Website";
      }
      meta.appendChild(web);
    }

    profile.appendChild(avatarLink);
    profile.appendChild(meta);

    const rail = document.createElement("div");
    rail.className = "instagram-feed-section__rail";
    rail.setAttribute("role", "list");

    const feedPostThumbUrl = (post) => {
      if (!post || typeof post !== "object") return "";
      const sizes = post.sizes && typeof post.sizes === "object" ? post.sizes : null;
      const fromSizes = (k) => {
        const b = sizes && sizes[k] && typeof sizes[k].mediaUrl === "string" ? sizes[k].mediaUrl.trim() : "";
        return b && !/\.mp4(\?|$)/i.test(b) ? b : "";
      };
      /* Prefer Behold-hosted sizes first — Instagram CDN URLs in thumbnailUrl/mediaUrl expire often and break thumbnails. */
      const sz =
        fromSizes("large") || fromSizes("medium") || fromSizes("full") || fromSizes("small");
      if (sz) return sz;
      const m = typeof post.mediaUrl === "string" ? post.mediaUrl.trim() : "";
      if (m && !/\.mp4(\?|$)/i.test(m)) return m;
      const t = typeof post.thumbnailUrl === "string" ? post.thumbnailUrl.trim() : "";
      if (t && !/\.mp4(\?|$)/i.test(t)) return t;
      const kids = Array.isArray(post.children) ? post.children : [];
      for (let c = 0; c < kids.length; c++) {
        const ch = kids[c];
        const u = feedPostThumbUrl(ch);
        if (u) return u;
      }
      return "";
    };

    const feedPostThumbFallbackUrl = (post) => {
      if (!post || typeof post !== "object") return "";
      const t = typeof post.thumbnailUrl === "string" ? post.thumbnailUrl.trim() : "";
      if (t && !/\.mp4(\?|$)/i.test(t)) return t;
      const m = typeof post.mediaUrl === "string" ? post.mediaUrl.trim() : "";
      return m && !/\.mp4(\?|$)/i.test(m) ? m : "";
    };

    data.posts.forEach((post, i) => {
      if (!post || typeof post !== "object") return;
      const thumb = feedPostThumbUrl(post);
      const linkUrl = typeof post.permalink === "string" ? post.permalink.trim() : "";
      if (!thumb || !linkUrl) return;

      const a = document.createElement("a");
      a.className = "instagram-feed-section__post";
      a.href = linkUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("role", "listitem");
      const cap =
        typeof post.prunedCaption === "string" && post.prunedCaption.trim()
          ? post.prunedCaption.trim()
          : typeof post.caption === "string"
            ? post.caption.trim()
            : "";
      const aria = cap.length > 118 ? `${cap.slice(0, 118)}…` : cap || `Instagram post ${i + 1}`;
      a.setAttribute("aria-label", aria);

      const span = document.createElement("span");
      span.className = "instagram-feed-section__thumb";

      const img = document.createElement("img");
      img.src = thumb;
      img.alt = "";
      img.width = 320;
      img.height = 400;
      img.loading = "lazy";
      img.decoding = "async";
      const fbUrl = feedPostThumbFallbackUrl(post);
      if (fbUrl && fbUrl !== thumb) {
        img.addEventListener(
          "error",
          () => {
            img.src = fbUrl;
          },
          { once: true },
        );
      }
      span.appendChild(img);

      const isReel = Boolean(post.isReel) || post.mediaType === "VIDEO";
      if (isReel) {
        const badge = document.createElement("span");
        badge.className = "instagram-feed-section__badge";
        badge.textContent = "Reel";
        span.appendChild(badge);
      }

      a.appendChild(span);
      rail.appendChild(a);
    });

    if (!rail.childElementCount) return null;

    const row = document.createElement("div");
    row.className = "instagram-feed-section__row";

    row.appendChild(profile);
    row.appendChild(rail);

    wrap.appendChild(row);
    return wrap;
  };

  const renderFallback = (mount) => {
    mount.textContent = "";
    const p = document.createElement("p");
    p.className = "instagram-feed-section__fallback";
    p.appendChild(document.createTextNode("Follow along on "));
    const a = document.createElement("a");
    a.href = NOBLE_INSTAGRAM_PROFILE;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Instagram";
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
    mount.appendChild(p);
  };

  const fetchNobleInstagramFeedData = async () => {
    const embedded =
      typeof window !== "undefined" &&
      window.NOBLE_INSTAGRAM_FEED_EMBEDDED &&
      typeof window.NOBLE_INSTAGRAM_FEED_EMBEDDED === "object" &&
      typeof window.NOBLE_INSTAGRAM_FEED_EMBEDDED.username === "string"
        ? window.NOBLE_INSTAGRAM_FEED_EMBEDDED
        : null;

    const urlCandidates = Array.from(
      new Set(
        [
          nobleScriptSiblingUrl("./instagram-feed.json"),
          new URL("./instagram-feed.json", window.location.href).href,
        ].filter(Boolean),
      ),
    );

    for (let u = 0; u < urlCandidates.length; u++) {
      try {
        const r = await fetch(urlCandidates[u], { cache: "no-store" });
        if (!r.ok) continue;
        const data = await r.json();
        if (
          data &&
          typeof data.username === "string" &&
          Array.isArray(data.posts) &&
          data.posts.length > 0
        ) {
          return data;
        }
      } catch (_) {
        /* Typical when using file://, offline, or JSON missing on host */
      }
    }

    return embedded;
  };

  const promise = fetchNobleInstagramFeedData();

  mounts.forEach((mount) => {
    promise.then((data) => {
      const inner = buildInner(data);
      mount.textContent = "";
      if (inner) {
        mount.appendChild(inner);
      } else {
        renderFallback(mount);
      }
    });
  });
}

/** Sitewide Instagram strip: optional widget iframe, or Meta embeds from post/reel URLs, else static grid */
function setupHomeInstagramFeed() {
  const embedHost = document.getElementById("home-instagram-embeds");
  const fallback = document.getElementById("home-instagram-fallback");
  if (!embedHost) return;

  ensureInstagramStripFallbackLinked();

  const isValidInstagramMediaUrl = (u) => {
    try {
      const url = new URL(u);
      return (
        url.protocol === "https:" &&
        url.hostname.endsWith("instagram.com") &&
        /\/(p|reel|tv)\//.test(url.pathname)
      );
    } catch {
      return false;
    }
  };

  const showFallbackOnly = () => {
    embedHost.innerHTML = "";
    embedHost.hidden = true;
    if (fallback) fallback.hidden = false;
    ensureInstagramStripFallbackLinked();
  };

  const runEmbeds = (urls) => {
    const unique = [...new Set(urls.filter(isValidInstagramMediaUrl))];
    if (!unique.length) {
      showFallbackOnly();
      return;
    }
    unique.forEach((url) => {
      const bq = document.createElement("blockquote");
      bq.className = "instagram-media";
      bq.setAttribute("data-instgrm-permalink", url);
      bq.setAttribute("data-instgrm-version", "14");
      embedHost.appendChild(bq);
    });
    embedHost.hidden = false;
    if (fallback) fallback.hidden = true;

    const tryProcess = () => {
      const ig = window.instgrm;
      if (ig && ig.Embeds && typeof ig.Embeds.process === "function") {
        ig.Embeds.process();
        return true;
      }
      return false;
    };

    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    }

    let tries = 0;
    const poll = () => {
      if (tryProcess()) return;
      if (++tries > 80) return;
      setTimeout(poll, 50);
    };
    poll();
  };

  const iframeSrc =
    typeof window.NOBLE_INSTAGRAM_IFRAME_SRC === "string" ? window.NOBLE_INSTAGRAM_IFRAME_SRC.trim() : "";

  if (iframeSrc) {
    try {
      const u = new URL(iframeSrc);
      if (u.protocol !== "https:") {
        showFallbackOnly();
        return;
      }
    } catch {
      showFallbackOnly();
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.className = "home-instagram-strip__iframe";
    iframe.src = iframeSrc;
    iframe.title = "Instagram feed — Noble Marketing & Design";
    iframe.loading = "lazy";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    embedHost.appendChild(iframe);
    embedHost.hidden = false;
    if (fallback) fallback.hidden = true;
    return;
  }

  const inlinePosts = Array.isArray(window.NOBLE_INSTAGRAM_POSTS) ? window.NOBLE_INSTAGRAM_POSTS : [];

  fetch(nobleScriptSiblingUrl("./instagram-posts.json"), { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const fromFile = data && Array.isArray(data.posts) ? data.posts : [];
      const merged = [...fromFile, ...inlinePosts].map((x) => String(x).trim()).filter(Boolean);
      runEmbeds(merged);
    })
    .catch(() => {
      runEmbeds(inlinePosts.map((x) => String(x).trim()).filter(Boolean));
    });
}

/** Blaze Yoga — local reel videos (Blaze Videos folder); sound only after explicit tap. */
function setupBlazeYogaNativeReelVideos(mount) {
  if (!(mount instanceof HTMLElement)) return;

  /** Resolve media next to the current HTML document (same as other ./assets on case pages). */
  const blazePageMediaUrl = (folder, file) => {
    const path = `${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
    return new URL(`./${path}`, window.location.href).href;
  };

  const blazeReelsManifestUrl = () => new URL("./Clients/BlazeYoga/blaze-local-reels.json", window.location.href).href;

  const wireTile = (tile, video) => {
    const setOthersSilent = () => {
      mount.querySelectorAll(".blaze-yoga-reel-tile").forEach((t) => {
        const v = t.querySelector(".blaze-yoga-reel-tile__video");
        if (!v || v === video) return;
        v.pause();
        v.muted = true;
        v.setAttribute("muted", "");
        t.classList.remove("is-audio-active");
      });
    };

    const toggle = () => {
      const isThisPlayingWithSound = !video.paused && !video.muted;
      if (isThisPlayingWithSound) {
        video.pause();
        video.muted = true;
        video.setAttribute("muted", "");
        tile.classList.remove("is-audio-active");
        return;
      }
      setOthersSilent();
      video.muted = false;
      video.removeAttribute("muted");
      tile.classList.add("is-audio-active");
      video.play().catch(() => {
        video.muted = true;
        video.setAttribute("muted", "");
        tile.classList.remove("is-audio-active");
      });
    };

    tile.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });

    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    video.addEventListener("ended", () => {
      video.muted = true;
      video.setAttribute("muted", "");
      tile.classList.remove("is-audio-active");
    });
  };

  fetch(blazeReelsManifestUrl(), { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const folder = data && typeof data.basePath === "string" ? data.basePath.trim() : "Blaze Videos";
      const files = data && Array.isArray(data.files) ? data.files : [];
      if (!files.length) return;

      const track = document.createElement("div");
      track.className = "blaze-yoga-reels__video-track";
      track.setAttribute("role", "presentation");

      files.forEach((rawName, i) => {
        const name = String(rawName).trim();
        if (!name) return;
        const tile = document.createElement("article");
        tile.className = "blaze-yoga-reel-tile";
        tile.setAttribute("tabindex", "0");
        tile.setAttribute("role", "group");
        tile.setAttribute("aria-label", `Blaze Yoga video ${i + 1} of ${files.length}. Tap to play with sound.`);

        const video = document.createElement("video");
        video.className = "blaze-yoga-reel-tile__video";
        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");
        video.muted = true;
        video.setAttribute("preload", "metadata");
        video.setAttribute("controlslist", "nodownload");
        video.setAttribute("aria-label", "Blaze Yoga Lancaster studio clip");

        video.src = blazePageMediaUrl(folder, name);
        video.load();

        const hint = document.createElement("p");
        hint.className = "blaze-yoga-reel-tile__hint";
        hint.textContent = "Tap for sound";

        tile.appendChild(video);
        tile.appendChild(hint);
        track.appendChild(tile);
        wireTile(tile, video);
      });

      mount.innerHTML = "";
      mount.appendChild(track);
    })
    .catch(() => {
      mount.innerHTML =
        '<p class="blaze-yoga-reels__error" role="status">Reel list could not be loaded. Open this page through a local or hosted web server (not the raw file preview) so <code>blaze-local-reels.json</code> can load.</p>';
    });
}

/** Blaze Yoga case page — Instagram Reel embeds from reels.json or window.NOBLE_BLAZE_REEL_URLS */
function setupBlazeYogaReelsEmbeds() {
  const nativeMount = document.querySelector("[data-blaze-native-reels]");
  if (nativeMount) {
    setupBlazeYogaNativeReelVideos(nativeMount);
    return;
  }

  const embedHost = document.getElementById("blaze-yoga-reels-embeds");
  const skeleton = document.getElementById("blaze-yoga-reels-skeleton");
  if (!embedHost) return;

  const isValidInstagramMediaUrl = (u) => {
    try {
      const url = new URL(u);
      return (
        url.protocol === "https:" &&
        url.hostname.endsWith("instagram.com") &&
        /\/(p|reel|tv)\//.test(url.pathname)
      );
    } catch {
      return false;
    }
  };

  const showSkeletonOnly = () => {
    embedHost.innerHTML = "";
    embedHost.hidden = true;
    if (skeleton instanceof HTMLElement) skeleton.hidden = false;
  };

  const runEmbeds = (urls) => {
    const unique = [...new Set(urls.map((x) => String(x).trim()).filter(Boolean))].filter(isValidInstagramMediaUrl);
    if (!unique.length) {
      showSkeletonOnly();
      return;
    }
    unique.forEach((url) => {
      const bq = document.createElement("blockquote");
      bq.className = "instagram-media";
      bq.setAttribute("data-instgrm-permalink", url);
      bq.setAttribute("data-instgrm-version", "14");
      embedHost.appendChild(bq);
    });
    embedHost.hidden = false;
    if (skeleton instanceof HTMLElement) skeleton.hidden = true;

    const tryProcess = () => {
      const ig = window.instgrm;
      if (ig && ig.Embeds && typeof ig.Embeds.process === "function") {
        ig.Embeds.process();
        return true;
      }
      return false;
    };

    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    }

    let tries = 0;
    const poll = () => {
      if (tryProcess()) return;
      if (++tries > 80) return;
      setTimeout(poll, 50);
    };
    poll();
  };

  const inlineReels = Array.isArray(window.NOBLE_BLAZE_REEL_URLS) ? window.NOBLE_BLAZE_REEL_URLS : [];

  fetch(nobleScriptSiblingUrl("./Clients/BlazeYoga/reels.json"), { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const fromFile = data && Array.isArray(data.reels) ? data.reels : [];
      const merged = [...fromFile, ...inlineReels].map((x) => String(x).trim()).filter(Boolean);
      runEmbeds(merged);
    })
    .catch(() => {
      runEmbeds(inlineReels.map((x) => String(x).trim()).filter(Boolean));
    });
}

function setupBlogIndexFilters() {
  const root = document.querySelector("[data-blog-filters]");
  const list = document.querySelector(".blog-index--grid");
  if (!root || !list) return;

  const items = Array.from(list.querySelectorAll(".blog-index__item[data-blog-tags]"));
  const chips = Array.from(root.querySelectorAll("[data-blog-filter]"));
  const empty = document.getElementById("blog-empty");
  if (chips.length === 0) return;

  const apply = (filter) => {
    const key = filter === "all" ? "all" : String(filter).toLowerCase();
    let visible = 0;
    items.forEach((li) => {
      const raw = (li.getAttribute("data-blog-tags") || "").toLowerCase();
      const show = key === "all" || raw.split(/\s+/).includes(key);
      li.hidden = !show;
      if (show) visible += 1;
    });
    chips.forEach((btn) => {
      const f = (btn.getAttribute("data-blog-filter") || "all").toLowerCase();
      const on = f === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (empty instanceof HTMLElement) {
      empty.hidden = visible !== 0;
    }
  };

  chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      apply(btn.getAttribute("data-blog-filter") || "all");
    });
  });
}

function setupBackToTop() {
  if ($("#noble-back-to-top")) return;

  const ringR = 22;
  const circumference = 2 * Math.PI * ringR;

  const wrap = document.createElement("div");
  wrap.id = "noble-back-to-top";
  wrap.className = "back-to-top";
  wrap.innerHTML = `<button type="button" class="back-to-top__btn" aria-label="Back to top">
    <svg class="back-to-top__svg" viewBox="0 0 52 52" width="52" height="52" aria-hidden="true">
      <circle class="back-to-top__track" cx="26" cy="26" r="${ringR}" fill="none" stroke-width="2.25" />
      <circle class="back-to-top__progress" cx="26" cy="26" r="${ringR}" fill="none" stroke-width="2.25" transform="rotate(-90 26 26)" />
      <path class="back-to-top__arrow" d="M26 17 L26 31 M19 24 L26 17 L33 24" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
    </svg>
  </button>`;

  document.body.appendChild(wrap);

  const btn = $(".back-to-top__btn", wrap);
  const progressEl = $(".back-to-top__progress", wrap);
  if (!(btn instanceof HTMLButtonElement) || !(progressEl instanceof SVGCircleElement)) return;

  progressEl.style.strokeDasharray = String(circumference);

  const scrollable = () => {
    const el = document.documentElement;
    return Math.max(0, el.scrollHeight - el.clientHeight);
  };

  const update = () => {
    const max = scrollable();
    const y = window.scrollY || document.documentElement.scrollTop;
    const p = max <= 0 ? 0 : Math.min(1, Math.max(0, y / max));
    progressEl.style.strokeDashoffset = String(circumference * (1 - p));

    const showFrom = 180;
    const t = max <= 0 ? 0 : Math.min(1, Math.max(0, (y - showFrom) / 280));
    wrap.style.setProperty("--back-to-top-t", String(t));
    wrap.classList.toggle("is-visible", y > showFrom);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  btn.addEventListener("click", () => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

setYear();
setFooterBioText();
setFooterCenterIcon();
setupFooterSocialIcons();
setupWorkCaseClientProfiles();
setupHomeSplash();
setupHeaderScrollUi();
setupHomeHeaderScrollPin();
setupMobileNav();
setupActiveNav();
setupPortfolioFilter();
setupPortfolioMagazineFilter();
setupLightbox();
setupProjectStripAuto();
setupServiceAccordion();
setupAddonsCarousel();
setupServicesScrollReveal();
setupBlogIndexFilters();
setupContactForm();
setupBrandingTierReveal();
setupBrandingCaseAccordion();
setupBrandingCaseScrollArrows();
setupWorkCaseNextPreview();
setupWorkCaseNextFooter();
setupIconCollageReveal();
setupFaqAccordion();
setupStatsCounter();
setupWorkCaseGrowthCounters();
setupReviewsCarousel();
setupServicesPricingModals();
setupHomeInstagramFeed();
setupNobleInstagramHorizontalFeed();
setupBlazeYogaReelsEmbeds();
setupBackToTop();

