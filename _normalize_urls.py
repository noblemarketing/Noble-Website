# One-off: normalize internal links to root-relative clean URLs. Run from repo root.
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent

# Order matters: longer paths first
RAW_REPLACEMENTS: list[tuple[str, str]] = [
    ("../../services/website-design/index.html", "/services/website-design/"),
    ("../services/website-design/index.html", "/services/website-design/"),
    ("./services/website-design/index.html", "/services/website-design/"),
    ("../../services/social-media/index.html", "/services/social-media/"),
    ("../services/social-media/index.html", "/services/social-media/"),
    ("./services/social-media/index.html", "/services/social-media/"),
    ("../../services/branding/index.html", "/services/branding/"),
    ("../services/branding/index.html", "/services/branding/"),
    ("./services/branding/index.html", "/services/branding/"),
    ("../../services/index.html", "/services/"),
    ("../services/index.html", "/services/"),
    ("./services/index.html", "/services/"),
    ("../../blog/index.html", "/blog/"),
    ("../blog/index.html", "/blog/"),
    ("./blog/index.html", "/blog/"),
    ("../../portfolio.html", "/portfolio/"),
    ("../portfolio.html", "/portfolio/"),
    ("./portfolio.html", "/portfolio/"),
    ("../../contact.html", "/contact/"),
    ("../contact.html", "/contact/"),
    ("./contact.html", "/contact/"),
    ("../../about.html", "/about/"),
    ("../about.html", "/about/"),
    ("./about.html", "/about/"),
    ("../../privacy-policy.html", "/privacy-policy/"),
    ("../privacy-policy.html", "/privacy-policy/"),
    ("./privacy-policy.html", "/privacy-policy/"),
    ("../../terms.html", "/terms/"),
    ("../terms.html", "/terms/"),
    ("./terms.html", "/terms/"),
    ("../../branding.html", "/branding/"),
    ("../branding.html", "/branding/"),
    ("./branding.html", "/branding/"),
    ("../../website-design.html", "/website-design/"),
    ("../website-design.html", "/website-design/"),
    ("./website-design.html", "/website-design/"),
    ("../../social-media.html", "/social-media/"),
    ("../social-media.html", "/social-media/"),
    ("./social-media.html", "/social-media/"),
    ("../../template-branding-case.html", "/template-branding-case/"),
    ("../template-branding-case.html", "/template-branding-case/"),
    ("./template-branding-case.html", "/template-branding-case/"),
]


def replace_assets(content: str) -> str:
    """Normalize stylesheet/script and root asset paths to absolute."""
    for i in range(6, 0, -1):
        prefix = "../" * i
        content = content.replace(f'href="{prefix}styles.css"', 'href="/styles.css"')
        content = content.replace(f'src="{prefix}instagram-feed-fallback.js"', 'src="/instagram-feed-fallback.js"')
        content = content.replace(f'src="{prefix}script.js"', 'src="/script.js"')
    content = content.replace('href="./styles.css"', 'href="/styles.css"')
    content = content.replace('src="./instagram-feed-fallback.js"', 'src="/instagram-feed-fallback.js"')
    content = content.replace('src="./script.js"', 'src="/script.js"')

    def abs_img(m: re.Match) -> str:
        attr = m.group(1)
        rest = m.group(2)
        if rest.startswith(("http://", "https://", "//", "data:", "#")):
            return m.group(0)
        slash = "/" + rest.lstrip("./").replace("../", "")
        while "//" in slash:
            slash = slash.replace("//", "/")
        return f'{attr}="{slash}"'

    # src="./Logos/..." through ../../../../ 
    content = re.sub(
        r'(src)="(\.{1,2}/)+(Logos|Photos|portfolio|Client Logos|Clients|Font)(/[^"]*)"',
        abs_img,
        content,
    )
    # url('./Photos in inline styles
    content = re.sub(
        r"url\((['\"]?)(\.\./)*(Photos|Client Logos|portfolio)([^'\")]*)('\"?)\)",
        lambda m: f"url({m.group(1)}/{m.group(3)}{m.group(4)}{m.group(5)})".replace("//", "/").replace("(/", "("),
        content,
    )
    # Hero style --hero-img: url('...')
    content = re.sub(
        r"url\(\s*(['\"]?)(\.\./)*(\./)?(Photos[^'\)]*)",
        lambda m: f"url({m.group(1)}/{m.group(4)}",
        content,
    )
    return content


def replace_work_blog_links(content: str) -> str:
    # work-foo.html -> /work-foo/
    def w(m: re.Match) -> str:
        name = m.group(1)
        slug = name.replace(".html", "")
        return f'href="/{slug}/"'

    content = re.sub(r'href="(\.{1,2}/)*work-[a-z0-9-]+\.html"', w, content)

    blog_slugs = [
        "blaze-yoga-lancaster-organic-social-reach",
        "flint-rock-stables-organic-community-social",
        "lakewood-reserve-organic-social-growth",
        "outback-toys-first-month-organic-social",
        "studio-notes-branding-clarity",
        "you-have-been-formally-rejected",
    ]
    for slug in blog_slugs:
        content = content.replace(f'href="./{slug}.html"', f'href="/blog/{slug}/"')
        content = content.replace(f'href="../{slug}.html"', f'href="/blog/{slug}/"')
    return content


def replace_self_index(content: str, rel_path: Path) -> str:
    """Map ./index.html in flyouts to correct clean URL by folder."""
    parts = rel_path.parts
    if "services" in parts:
        if parts[-2] == "branding":
            content = content.replace('href="./index.html"', 'href="/services/branding/"')
        elif parts[-2] == "website-design":
            content = content.replace('href="./index.html"', 'href="/services/website-design/"')
        elif parts[-2] == "social-media":
            content = content.replace('href="./index.html"', 'href="/services/social-media/"')
        elif parts[-2] == "services":
            content = content.replace('href="./index.html"', 'href="/services/"')
    # blog article: back to index
    if "blog" in parts and parts[-2] != "blog" and str(rel_path).endswith("blog\\index.html") is False:
        if rel_path.parent.name != "blog":
            content = content.replace('href="./index.html"', 'href="/blog/"')
    return content


def process_file(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8")
    c = raw
    rel = path.relative_to(ROOT)

    for old, new in RAW_REPLACEMENTS:
        c = c.replace(f'href="{old}"', f'href="{new}"')

    c = replace_work_blog_links(c)
    c = replace_assets(c)

    # Remaining relative ../website-design/index.html style in services
    c = re.sub(
        r'href="(\.\./)+website-design/index\.html"',
        'href="/services/website-design/"',
        c,
    )
    c = re.sub(
        r'href="(\.\./)+social-media/index\.html"',
        'href="/services/social-media/"',
        c,
    )
    c = re.sub(
        r'href="(\.\./)+branding/index\.html"',
        'href="/services/branding/"',
        c,
    )

    c = replace_self_index(c, rel)

    # Services hub & nested footer still use ./branding/index.html
    for pat, rep in [
        ('href="./branding/index.html"', 'href="/services/branding/"'),
        ('href="./website-design/index.html"', 'href="/services/website-design/"'),
        ('href="./social-media/index.html"', 'href="/services/social-media/"'),
        ('href="../branding/index.html"', 'href="/services/branding/"'),
        ('href="../website-design/index.html"', 'href="/services/website-design/"'),
        ('href="../social-media/index.html"', 'href="/services/social-media/"'),
    ]:
        c = c.replace(pat, rep)

    # Footer etc.
    for pat, rep in [
        ('href="./services/branding/index.html"', 'href="/services/branding/"'),
        ('href="./services/website-design/index.html"', 'href="/services/website-design/"'),
        ('href="./services/social-media/index.html"', 'href="/services/social-media/"'),
    ]:
        c = c.replace(pat, rep)

    if c != raw:
        path.write_text(c, encoding="utf-8", newline="\n")
        return True
    return False


def main() -> None:
    exts = {".html", ".htm"}
    changed = []
    for p in ROOT.rglob("*"):
        if p.suffix.lower() not in exts:
            continue
        if p.name.startswith("_"):
            continue
        if "node_modules" in p.parts:
            continue
        try:
            if process_file(p):
                changed.append(str(p.relative_to(ROOT)))
        except Exception as e:
            print("ERR", p, e)

    print(f"Updated {len(changed)} files")
    for x in sorted(changed)[:80]:
        print(" ", x)


if __name__ == "__main__":
    main()
