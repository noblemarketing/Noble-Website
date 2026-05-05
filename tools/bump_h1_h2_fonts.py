"""Wrap heading-related font-size with calc(... + var(--heading-size-add))."""
from __future__ import annotations

import re
from pathlib import Path

CSS_PATH = Path(__file__).resolve().parents[1] / "styles.css"

FRAGMENTS = (
    "hero-title",
    "section-title",
    "home-recent-projects__title",
    "work-case-client-board__name",
    "work-case-client-board__about-title",
    "work-case-challenge-solution__heading",
    "work-case-visual-gallery__title",
    "blog-hero__title",
    "blog-card__title",
    "services-split-hero-moody-title",
    "services-split-hero-overlay-title",
    "reviews-section-editorial-title",
    "contact-page-hero__title",
    "contact-page-grid__heading",
    "contact-page-form-title",
    "home-services-horiz__title",
    "home-who-we-are-split__title",
    "home-partners-strip__title",
    "home-featured-title",
    "portfolio-mag__title",
    "about-hero-split__title",
    "about-how-i-work__title",
    "about-our-process__title",
    "about-remote-collab__title",
    "about-editorial__title",
    "about-who-we-serve__heading",
    "about-how-i-work__title-line",
    "legal-body h2",
    "page-work-case h1",
    "page-work-case h2",
    "blog-post-header .section-title",
    "blog-post-body .section-title",
    "#blog .section-title",
    "services-about-strip .section-title",
)

FONT_LINE = re.compile(r"^(\s*)font-size:\s*(.+?);\s*$")


def heading_selector(sel: str) -> bool:
    s = sel.strip()
    if not s or s.startswith("@import"):
        return False
    if "h1" in s or "h2" in s:
        return True
    return any(frag in s for frag in FRAGMENTS)


def bump_font_lines(body: str) -> str:
    out_lines = []
    for line in body.splitlines(keepends=True):
        m = FONT_LINE.match(line)
        if not m:
            out_lines.append(line)
            continue
        indent, val = m.group(1), m.group(2).strip()
        if "heading-size-add" in val:
            out_lines.append(line)
            continue
        out_lines.append(f"{indent}font-size: calc({val} + var(--heading-size-add));\n")
    return "".join(out_lines)


def extract_rules(css: str) -> list[tuple[str, str]]:
    """Top-level rules only; @media bodies returned as single chunk — caller recurses."""
    rules: list[tuple[str, str]] = []
    i = 0
    n = len(css)
    while i < n:
        while i < n and css[i].isspace():
            i += 1
        if i >= n:
            break
        start = i
        while i < n and css[i] != "{":
            i += 1
        selector = css[start:i].strip()
        if i >= n:
            break
        i += 1
        depth = 1
        body_start = i
        while i < n and depth > 0:
            c = css[i]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            i += 1
        body = css[body_start : i - 1]
        rules.append((selector, body))
    return rules


def process_block(body: str) -> str:
    """Process inner block: bump heading rules; recurse into @media."""
    rules = extract_rules(body)
    if not rules:
        return bump_font_lines(body)

    parts: list[str] = []
    for sel, sub in rules:
        if sel.startswith("@media") or sel.startswith("@supports") or sel.startswith(
            "@keyframes"
        ):
            if sel.startswith("@keyframes"):
                parts.append(sel + "{" + sub + "}")
            else:
                inner = process_block(sub)
                parts.append(sel + "{" + inner + "}")
        elif heading_selector(sel):
            parts.append(sel + "{" + bump_font_lines(sub) + "}")
        else:
            parts.append(sel + "{" + sub + "}")
    return "".join(parts)


def main() -> None:
    raw = CSS_PATH.read_text(encoding="utf-8")
    if "--heading-size-add" not in raw:
        raw = raw.replace(
            "--font-button-size: clamp(14px, 1.1vw, 18px);\n}",
            "--font-button-size: clamp(14px, 1.1vw, 18px);\n"
            "  --heading-size-add: 1pt;\n}",
            1,
        )

    rules = extract_rules(raw)
    out_chunks: list[str] = []
    for sel, body in rules:
        if sel.startswith("@media") or sel.startswith("@supports"):
            out_chunks.append(sel + "{" + process_block(body) + "}")
        elif sel.startswith("@keyframes"):
            out_chunks.append(sel + "{" + body + "}")
        elif heading_selector(sel):
            out_chunks.append(sel + "{" + bump_font_lines(body) + "}")
        else:
            out_chunks.append(sel + "{" + body + "}")

    CSS_PATH.write_text("".join(out_chunks), encoding="utf-8")
    print("Updated", CSS_PATH)


if __name__ == "__main__":
    main()
