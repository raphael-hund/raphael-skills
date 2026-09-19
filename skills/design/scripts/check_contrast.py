#!/usr/bin/env python3
"""
check_contrast.py — WCAG 2.x contrast ratio between two colors, with
AA / AAA verdicts for normal and large text.

Part of the ui-design-mastery skill. Standard library only.

Usage:
    python3 check_contrast.py "#FFFFFF" "#050A18"
    python3 check_contrast.py FFFFFF 050A18
    python3 check_contrast.py --batch pairs.txt

Batch file format (one pair per line, '#' starts a comment):
    #FFFFFF #050A18 hero headline on navy
    #9FB0D6 #050A18 subline on navy

WCAG thresholds (WCAG 2.1 §1.4.3 / §1.4.6):
    normal text: AA 4.5:1, AAA 7.0:1
    large text (>=24px, or >=18.66px bold): AA 3.0:1, AAA 4.5:1
Large-text verdicts also apply to UI components & graphics (§1.4.11, 3:1).
"""

import argparse
import re
import sys


def parse_color(s: str) -> tuple[int, int, int]:
    """Accept #RGB, #RRGGBB, RRGGBB, or rgb(r, g, b)."""
    s = s.strip()
    m = re.fullmatch(r"rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)", s, re.I)
    if m:
        vals = tuple(int(v) for v in m.groups())
        if all(v <= 255 for v in vals):
            return vals
        raise ValueError(f"rgb() channel > 255: {s}")
    h = s.lstrip("#")
    if re.fullmatch(r"[0-9a-fA-F]{3}", h):
        h = "".join(c * 2 for c in h)
    if re.fullmatch(r"[0-9a-fA-F]{6}", h):
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    raise ValueError(f"not a color: '{s}' (use #RGB, #RRGGBB or rgb(r,g,b))")


def relative_luminance(rgb: tuple[int, int, int]) -> float:
    """WCAG relative luminance (sRGB, linearized)."""
    def lin(c8: int) -> float:
        c = c8 / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(c1: tuple[int, int, int], c2: tuple[int, int, int]) -> float:
    l1, l2 = relative_luminance(c1), relative_luminance(c2)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def verdict(ratio: float) -> str:
    def mark(ok: bool) -> str:
        return "PASS" if ok else "FAIL"
    return (
        f"normal text:  AA {mark(ratio >= 4.5)} (4.5:1)   AAA {mark(ratio >= 7.0)} (7.0:1)\n"
        f"large text:   AA {mark(ratio >= 3.0)} (3.0:1)   AAA {mark(ratio >= 4.5)} (4.5:1)\n"
        f"UI/graphics:  {mark(ratio >= 3.0)} (3.0:1, WCAG 1.4.11)"
    )


def suggest_fix(fg: tuple[int, int, int], bg: tuple[int, int, int], ratio: float) -> str:
    """One-line practical advice when a pair fails AA for normal text."""
    if ratio >= 4.5:
        return ""
    l_fg, l_bg = relative_luminance(fg), relative_luminance(bg)
    if l_fg < l_bg:
        return "fix: darken the foreground toward black (or lighten the background) until >= 4.5:1"
    return "fix: lighten the foreground toward white (or darken the background) until >= 4.5:1"


def report(fg_s: str, bg_s: str, label: str = "") -> bool:
    """Print one pair's report. Returns True if AA-normal passes."""
    try:
        fg, bg = parse_color(fg_s), parse_color(bg_s)
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return False
    ratio = contrast_ratio(fg, bg)
    head = f"fg {fg_s.upper()}  on  bg {bg_s.upper()}"
    if label:
        head += f"   ({label})"
    print(head)
    print(f"  contrast ratio: {ratio:.2f}:1")
    for line in verdict(ratio).splitlines():
        print(f"  {line}")
    tip = suggest_fix(fg, bg, ratio)
    if tip:
        print(f"  {tip}")
    print()
    return ratio >= 4.5


def main() -> int:
    p = argparse.ArgumentParser(
        description="WCAG contrast ratio + AA/AAA verdicts for a color pair (or a batch file).",
        epilog="Example: python3 check_contrast.py '#F5820B' '#FFFFFF'",
    )
    p.add_argument("fg", nargs="?", help="Foreground color (#RGB / #RRGGBB / rgb(r,g,b))")
    p.add_argument("bg", nargs="?", help="Background color")
    p.add_argument("--batch", metavar="FILE",
                   help="File with one 'fg bg [label]' pair per line")
    args = p.parse_args()

    if args.batch:
        try:
            lines = open(args.batch, encoding="utf-8").read().splitlines()
        except OSError as e:
            print(f"error: {e}", file=sys.stderr)
            return 1
        pairs = 0
        failures = 0
        for raw in lines:
            # Comment lines start with '#' followed by space/EOL — but hex
            # colors like '#FFFFFF' also start with '#', so match carefully.
            if re.match(r"^\s*#(\s|$)", raw):
                continue
            raw = re.split(r"\s+#\s", raw, maxsplit=1)[0].strip()  # inline '# comment'
            if not raw:
                continue
            parts = raw.split(None, 2)
            if len(parts) < 2:
                print(f"skip malformed line: {raw}", file=sys.stderr)
                continue
            label = parts[2] if len(parts) > 2 else ""
            pairs += 1
            if not report(parts[0], parts[1], label):
                failures += 1
        print(f"batch: {pairs} pair(s), {failures} below AA-normal (4.5:1)")
        return 0 if failures == 0 else 2

    if not (args.fg and args.bg):
        p.error("provide <fg> <bg> or --batch FILE")
    ok = report(args.fg, args.bg)
    return 0 if ok else 2


if __name__ == "__main__":
    sys.exit(main())
