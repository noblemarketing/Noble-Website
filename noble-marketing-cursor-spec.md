# Noble Marketing & Design — Cursor Build Spec

## Project Overview
Build a clean, minimal multi-page marketing website for **Noble Marketing & Design**, a creative agency. The aesthetic is soft, neutral, and professional — whitespace-forward with subtle tones.

---

## Tech Stack
- Plain HTML5 + CSS3 (no frameworks)
- Vanilla JavaScript only (no jQuery or libraries)
- One CSS file per page, sharing a `global.css`
- Mobile-first, fully responsive

---

## File Structure

```
noble-marketing/
├── index.html          # Homepage
├── services.html       # Services page
├── portfolio.html      # Portfolio / Case studies
├── about.html          # About / Team
├── contact.html        # Contact page
├── css/
│   ├── global.css      # Shared tokens, reset, nav, footer
│   ├── home.css
│   ├── services.css
│   ├── portfolio.css
│   ├── about.css
│   └── contact.css
├── js/
│   └── main.js         # Nav toggle, scroll effects, form handling
└── assets/
    ├── images/
    └── icons/
```

---

## Design Tokens (global.css)

```css
:root {
  --color-bg:          #FAFAF8;
  --color-surface:     #F4F2EE;
  --color-border:      #E2DED8;
  --color-text:        #2C2A27;
  --color-text-muted:  #7A7570;
  --color-accent:      #4A6358;      /* muted sage green */
  --color-accent-soft: #EAF0ED;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;

  --max-width:  1120px;
  --section-gap: 96px;
}
```

Import Inter and Playfair Display from Google Fonts.

---

## Global Components

### Navigation
- Fixed top nav, white background with subtle bottom border
- Left: Logo (text-based, "Noble" in serif + "Marketing & Design" in sans)
- Center: Links — Home, Services, Portfolio, About, Contact
- Right: CTA button — "Start a Project" (accent background)
- Mobile: hamburger menu that opens a full-width drawer
- Active page link should be visually indicated

### Footer
- Four columns: Logo + tagline + social icons | Services | Company | Contact
- Bottom bar: copyright left, Privacy Policy + Terms right
- Background: `--color-surface`

---

## Pages

---

### 1. Homepage (index.html)

#### Hero Section
- Eyebrow label: "Strategy. Design. Results."
- Headline (serif, large): "We build brands that people remember"
- Subtext: 1–2 short lines about the agency's mission
- Two CTAs: "See Our Work" (primary) + "Learn About Us" (outline)
- Hero image placeholder: full-width image below CTAs (use a light gray placeholder div)

#### Services Section
- Section heading + short subtext, centered
- 3×2 card grid
- Each card: icon placeholder (32×32 rounded box), service name, 2-line description
- Six services: Brand Strategy, Visual Identity, Web Design, Digital Marketing, Print & Collateral, Social Media

#### Portfolio / Work Section
- Section heading: "Selected Work"
- 2×2 grid of project cards
- Each card: image placeholder (aspect ratio 4:3), project name, category tag (pill badge)
- Button below grid: "View All Projects" (outline style)

#### Process Section
- Background: `--color-surface`
- Section heading: "How We Work"
- 5-step horizontal flow with numbered circles and connector lines
- Steps: Discovery, Strategy, Design, Execution, Launch
- Each step has a title and a one-line description

#### Testimonials Section
- Section heading: "What Clients Say"
- 3-column card grid
- Each card: 5 stars, 3-line quote, avatar placeholder + client name + company

#### CTA Banner Section
- Background: `--color-accent` (dark), white text
- Headline: "Ready to elevate your brand?"
- Subtext: "Let's talk about your project."
- Email input + "Get in Touch" button (white button, accent text)

---

### 2. Services Page (services.html)

#### Page Hero
- Simple centered hero: page title (serif), 1-line description
- Background: `--color-surface`

#### Services Detail
- Alternating two-column rows (image left / text right, then flip)
- Each row: image placeholder, service name (h2), 3–4 sentences of description, a short list of deliverables

#### Pricing / Packages (optional section)
- 3-column card grid: Starter, Growth, Custom
- Each card: name, price placeholder, feature list, CTA button
- Highlight the middle card with accent border

---

### 3. Portfolio Page (portfolio.html)

#### Page Hero
- Centered heading + subtext
- Filter tabs: All, Branding, Web, Print, Social

#### Project Grid
- Masonry-style or uniform 3-column grid
- Each card: image placeholder, project title, category tag, hover overlay with "View Project" link

#### Case Study Modal or Linked Page
- Clicking a project card links to a `portfolio/[project-name].html` or opens a lightbox-style panel
- Panel includes: project image, client name, challenge, solution, results

---

### 4. About Page (about.html)

#### Page Hero
- Split layout: left text (heading + paragraph about the agency), right image placeholder

#### Mission / Values
- Background: `--color-surface`
- 3 value cards with icon, title, and short description

#### Team Section
- 3–4 team member cards in a row
- Each: circular avatar placeholder, name, title, short bio

#### Stats / Social Proof
- 4 metric cards: e.g. "10+ Years Experience", "150+ Projects", "40+ Clients", "5 Awards"

---

### 5. Contact Page (contact.html)

#### Two-Column Layout
- Left: contact info (address placeholder, email, phone, social links), embedded map placeholder
- Right: contact form

#### Contact Form
- Fields: Full Name, Email, Company (optional), Service Interest (dropdown), Message (textarea)
- Submit button: "Send Message"
- Basic client-side validation (required fields, email format)
- On success: show inline "Thanks, we'll be in touch!" message

---

## CSS Guidelines

- Mobile-first breakpoints: 480px, 768px, 1024px, 1280px
- Use CSS Grid and Flexbox — no floats
- Transitions: `transition: all 0.2s ease` for hover states
- Hover on cards: subtle `translateY(-3px)` + border color change
- No box shadows — use borders and background shifts instead
- All images use `object-fit: cover` with defined aspect ratios

---

## JavaScript (main.js)

- Mobile nav toggle (hamburger open/close)
- Smooth scroll for anchor links
- Add `.scrolled` class to nav after 60px scroll (for subtle border/bg change)
- Portfolio filter tabs (show/hide cards by category)
- Contact form validation + success state
- Intersection Observer for subtle fade-in on section entry (optional, keep lightweight)

---

## Placeholder Content Notes

- Use "Noble Marketing & Design" as the agency name throughout
- All images: use `<div class="img-placeholder" style="aspect-ratio: X/Y;"></div>` with background `--color-surface`
- Use Lorem Ipsum sparingly — prefer context-appropriate placeholder copy
- Color accent: sage green `#4A6358` — use for CTAs, highlights, active states, and accent elements

---

## Cursor Instructions

Build one page at a time in this order:
1. `global.css` + nav + footer components
2. `index.html` (homepage)
3. `services.html`
4. `portfolio.html`
5. `about.html`
6. `contact.html`

After each page, verify mobile responsiveness at 375px, 768px, and 1280px widths before moving on.
