#!/usr/bin/env python3
"""
extract_palette.py — Extract the dominant color palette from any image
(screenshot, mockup, photo) and report each color as HEX, RGB and OKLCH.

Part of the ui-design-mastery skill (Mode A — AUTOPSY).
Standard library + Pillow only.

Usage:
    python3 extract_palette.py <image> [--top 8] [--regions] [--size 200]

Method:
    1. Downscale the image (median-cut quantization is resolution-independent
       enough at ~200px and 100x faster).
    2. Median-cut quantize to N colors via PIL, rank by pixel share.
    3. Convert sRGB -> OKLCH (Ottosson matrices) for design-token output.
    4. --regions additionally averages a 3x3 grid so you can map WHERE colors
       live (hero vs. section vs. footer), not just THAT they exist.
"""

import argparse
import sys

from PIL import Image


# ---------------------------------------------------------------------------
# Color conversion: sRGB -> OKLCH (Björn Ottosson's OKLab, polar form)
# ---------------------------------------------------------------------------

def _srgb_channel_to_linear(c: float) -> float:
    """Inverse sRGB companding for one channel in 0..1."""
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def srgb_to_oklch(r: int, g: int, b: int) -> tuple[float, float, float]:
    """Convert 8-bit sRGB to OKLCH. Returns (L 0..1, C >=0, H degrees 0..360)."""
    import math

    rl = _srgb_channel_to_linear(r / 255.0)
    gl = _srgb_channel_to_linear(g / 255.0)
    bl = _srgb_channel_to_linear(b / 255.0)

    # linear sRGB -> LMS (cube-rooted), OKLab matrices
    l_ = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
    m_ = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
    s_ = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl

    l_c = math.copysign(abs(l_) ** (1 / 3), l_)
    m_c = math.copysign(abs(m_) ** (1 / 3), m_)
    s_c = math.copysign(abs(s_) ** (1 / 3), s_)

    L = 0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c
    a = 1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c
    b2 = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c

    C = math.sqrt(a * a + b2 * b2)
    H = math.degrees(math.atan2(b2, a)) % 360.0
    return L, C, H


def fmt_oklch(r: int, g: int, b: int) -> str:
    L, C, H = srgb_to_oklch(r, g, b)
    return f"oklch({L * 100:.1f}% {C:.3f} {H:.1f})"


def fmt_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02X}{g:02X}{b:02X}"


# ---------------------------------------------------------------------------
# Extraction
# ---------------------------------------------------------------------------

def dominant_colors(img: Image.Image, top: int, work_size: int) -> list[tuple[tuple[int, int, int], float]]:
    """Median-cut quantize; return [(rgb, share)] sorted by share desc."""
    small = img.copy()
    small.thumbnail((work_size, work_size), Image.LANCZOS)
    total_px = small.width * small.height

    # Quantize with headroom, then merge near-duplicate bins (quantization
    # artifacts), folding their pixel share into the surviving bin.
    q = small.quantize(colors=min(256, max(top * 4, 32)), method=Image.MEDIANCUT)
    palette = q.getpalette()  # flat [r,g,b, r,g,b, ...]
    counts = sorted(q.getcolors(), reverse=True)  # [(count, palette_index)]

    results: list[list] = []  # [rgb, share] — share is mutable while merging
    for count, idx in counts:
        rgb = (palette[idx * 3], palette[idx * 3 + 1], palette[idx * 3 + 2])
        share = count / total_px
        match = next(
            (entry for entry in results
             if sum((a - b) ** 2 for a, b in zip(rgb, entry[0])) <= 18 ** 2),
            None,
        )
        if match is None:
            results.append([rgb, share])
        else:
            match[1] += share
        if len(results) >= top:
            break
    return [(entry[0], entry[1]) for entry in results]


def region_grid(img: Image.Image, cells: int = 3, work_size: int = 90) -> list[list[tuple[int, int, int]]]:
    """Average color per cell of an NxN grid (center-weighted: samples the
    middle 60% of each cell to dodge borders/shadows at cell edges)."""
    small = img.copy()
    small.thumbnail((work_size * cells, work_size * cells), Image.LANCZOS)
    px = small.load()
    w, h = small.size
    grid = []
    for row in range(cells):
        line = []
        for col in range(cells):
            x0, x1 = int(w * (col + 0.2) / cells), int(w * (col + 0.8) / cells)
            y0, y1 = int(h * (row + 0.2) / cells), int(h * (row + 0.8) / cells)
            n = max(1, (x1 - x0) * (y1 - y0))
            rs = gs = bs = 0
            for y in range(y0, max(y1, y0 + 1)):
                for x in range(x0, max(x1, x0 + 1)):
                    r, g, b = px[min(x, w - 1), min(y, h - 1)][:3]
                    rs, gs, bs = rs + r, gs + g, bs + b
            line.append((rs // n, gs // n, bs // n))
        grid.append(line)
    return grid


def guess_role(rgb: tuple[int, int, int], share: float) -> str:
    """Heuristic role label — a starting hypothesis, verify visually."""
    L, C, _ = srgb_to_oklch(*rgb)
    if share >= 0.35:
        return "dominant field (likely background)"
    if C < 0.015:
        if L > 0.85:
            return "near-white (surface/text-on-dark)"
        if L < 0.18:
            return "near-black (text/base)"
        return "neutral gray"
    if C >= 0.10 and share < 0.20:
        return "candidate ACCENT (saturated, low share — check if it's the CTA color)"
    return "supporting tone"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    p = argparse.ArgumentParser(
        description="Extract dominant colors from an image as HEX / RGB / OKLCH.",
        epilog="Example: python3 extract_palette.py hero.png --top 8 --regions",
    )
    p.add_argument("image", help="Path to the image (PNG/JPEG/WebP — anything PIL reads)")
    p.add_argument("--top", type=int, default=8, metavar="N",
                   help="Number of dominant colors to report (default: 8)")
    p.add_argument("--regions", action="store_true",
                   help="Also print a 3x3 grid of region averages (maps WHERE colors live)")
    p.add_argument("--size", type=int, default=200, metavar="PX",
                   help="Working downscale size for quantization (default: 200)")
    args = p.parse_args()

    try:
        img = Image.open(args.image).convert("RGB")
    except (OSError, FileNotFoundError) as e:
        print(f"error: cannot open '{args.image}': {e}", file=sys.stderr)
        return 1

    print(f"# Palette: {args.image} ({img.width}x{img.height}px)")
    print(f"# Median-cut quantization @ {args.size}px working size. Values are sampled,")
    print(f"# not design tokens — treat as reconstruction targets (±10%).\n")
    print(f"{'#':>2}  {'HEX':8} {'RGB':16} {'OKLCH':28} {'share':>6}  role hypothesis")
    print("-" * 100)
    for i, (rgb, share) in enumerate(dominant_colors(img, args.top, args.size), 1):
        print(f"{i:>2}  {fmt_hex(*rgb):8} "
              f"{f'rgb{rgb}':16} {fmt_oklch(*rgb):28} {share * 100:>5.1f}%  {guess_role(rgb, share)}")

    if args.regions:
        print(f"\n# 3x3 region map (center-weighted cell averages; row 1 = top of image)")
        for r, line in enumerate(region_grid(img), 1):
            cells = "  ".join(f"{fmt_hex(*c)} {fmt_oklch(*c)}" for c in line)
            print(f"  row {r}: {cells}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
