# -*- coding: utf-8 -*-
"""Fix common UTF-8/Latin-1 mojibake in static site files."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# Triplets seen when UTF-8 bytes are mis-decoded (common Windows-1252 mojibake patterns).
TRIPLETS = {
    "\u00e2\u20ac\u201d": "\u2014",  # em dash
    "\u00e2\u20ac\u2122": "\u2019",  # right single quote
    "\u00e2\u20ac\u0153": "\u201c",  # left double quote (UTF-8 E2 80 9C misread)
    "\u00e2\u20ac\u009d": "\u201c",  # rare variant
    "\u00e2\u20ac\u009c": "\u201d",  # rare variant
}

# Doubled UTF-8 for apostrophe / quotes sometimes appears as:
DOUBLES = {
    "\u00c3\u00a2\u20ac\u0153": "\u201c",
    "\u00c3\u00a2\u20ac\u009d": "\u201d",
}


def fix_text(t: str) -> str:
    out = t
    for bad, good in TRIPLETS.items():
        out = out.replace(bad, good)
    for bad, good in DOUBLES.items():
        out = out.replace(bad, good)
    # Remaining singletons
    out = out.replace("\u00c3\u2014", "\u2014")
    out = out.replace("\u00c3\u2014", "\u2014")
    out = out.replace("\u00c3\u2014", "\u2014")
    # Fix mistaken multiply sign mojibake
    out = out.replace("\u00c3\u2014", "\u00d7")
    return out


def main() -> int:
    targets = [ROOT / "styles.css", ROOT / "portfolio.html", ROOT / "index.html"]
    for path in targets:
        if not path.exists():
            continue
        raw = path.read_text(encoding="utf-8")
        fixed = fix_text(raw)
        if fixed != raw:
            path.write_text(fixed, encoding="utf-8", newline="\n")
            print(f"fixed: {path.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
