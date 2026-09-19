#!/usr/bin/env python3
"""
gradient_gen.py — Generate eased, banding-resistant gradient CSS.

Colors are interpolated in OKLCH (perceptually uniform — no muddy midpoint),
and the stops are distributed along a cubic-bezier easing curve instead of
evenly, so the blend accelerates/decelerates like real light falloff.
Flat evenly-spaced linear gradients are the #1 "AI slop" tell — never ship one.

Part of the ui-design-mastery skill. Standard library only.

Usage:
    python3 gradient_gen.py "#1E5FE0" "#050A18" --stops 7 --ease ease-in-out --angle 180
    python3 gradient_gen.py "#E4F7B2" "#0B2417" --mesh --grain
    python3 gradient_gen.py red "#0E3B1E" "#D8F0A0" --stops 9   # multi-color

Output: copy-paste-ready CSS (modern `oklch()` syntax, Chrome/Safari/FF 2024+).
"""

import argparse
import math
import re
import sys


# ---------------------------------------------------------------------------
# sRGB <-> OKLCH (Ottosson)
# ---------------------------------------------------------------------------

NAMED = {  # tiny named-color convenience set
    "black": (0, 0, 0), "white": (255, 255, 255), "red": (255, 0, 0),
    "green": (0, 128, 0), "blue": (0, 0, 255),
}

def parse_color(s: str) -> tuple[int, int, int]:
    s = s.strip().lower()
    if s in NAMED:
        return NAMED[s]
    m = re.fullmatch(r"rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)", s)
    if m and all(int(v) <= 255 for v in m.groups()):
        return tuple(int(v) for v in m.groups())
    h = s.lstrip("#")
    if re.fullmatch(r"[0-9a-f]{3}", h):
        h = "".join(c * 2 for c in h)
    if re.fullmatch(r"[0-9a-f]{6}", h):
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    raise ValueError(f"not a color: '{s}'")


def _lin(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def srgb_to_oklch(r: int, g: int, b: int) -> tuple[float, float, float]:
    rl, gl, bl = _lin(r / 255), _lin(g / 255), _lin(b / 255)
    l_ = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
    m_ = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
    s_ = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl
    l_c, m_c, s_c = (math.copysign(abs(v) ** (1 / 3), v) for v in (l_, m_, s_))
    L = 0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c
    a = 1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c
    b2 = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c
    return L, math.hypot(a, b2), math.degrees(math.atan2(b2, a)) % 360.0


def oklch_to_srgb(L: float, C: float, H: float) -> tuple[int, int, int]:
    a, b2 = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_c = L + 0.3963377774 * a + 0.2158037573 * b2
    m_c = L - 0.1055613458 * a - 0.0638541728 * b2
    s_c = L - 0.0894841775 * a - 1.2914855480 * b2
    l_, m_, s_ = l_c ** 3, m_c ** 3, s_c ** 3
    rl = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    gl = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_

    def gam(c: float) -> int:
        c = 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
        return round(min(1, max(0, c)) * 255)
    return gam(rl), gam(gl), gam(bl)


def lerp_oklch(c1: tuple[float, float, float], c2: tuple[float, float, float], t: float) -> tuple[float, float, float]:
    """Shortest-path hue interpolation; achromatic endpoints adopt the
    chromatic endpoint's hue (avoids a rainbow detour through gray)."""
    L1, C1, H1 = c1
    L2, C2, H2 = c2
    if C1 < 0.005:
        H1 = H2
    elif C2 < 0.005:
        H2 = H1
    dH = (H2 - H1 + 540.0) % 360.0 - 180.0
    return (L1 + (L2 - L1) * t,
            C1 + (C2 - C1) * t,
            (H1 + dH * t) % 360.0)


# ---------------------------------------------------------------------------
# Easing: cubic-bezier evaluation (same curves as CSS transition-timing)
# ---------------------------------------------------------------------------

EASINGS = {
    "linear": (0.0, 0.0, 1.0, 1.0),
    "ease-in": (0.42, 0.0, 1.0, 1.0),
    "ease-out": (0.0, 0.0, 0.58, 1.0),
    "ease-in-out": (0.42, 0.0, 0.58, 1.0),
    "ease-out-expo": (0.16, 1.0, 0.3, 1.0),   # modern UI workhorse
}


def cubic_bezier(x1: float, y1: float, x2: float, y2: float):
    """Return f(x) -> y for the CSS cubic-bezier(x1,y1,x2,y2)."""
    def bez(t: float, a: float, b: float) -> float:
        u = 1 - t
        return 3 * u * u * t * a + 3 * u * t * t * b + t ** 3

    def f(x: float) -> float:
        lo, hi, t = 0.0, 1.0, x
        for _ in range(40):  # bisection on the x(t) parametric curve
            if abs(bez(t, x1, x2) - x) < 1e-6:
                break
            if bez(t, x1, x2) < x:
                lo = t
            else:
                hi = t
            t = (lo + hi) / 2
        return bez(t, y1, y2)
    return f


# ---------------------------------------------------------------------------
# Gradient construction
# ---------------------------------------------------------------------------

def multicolor_lerp(colors: list[tuple[float, float, float]], t: float) -> tuple[float, float, float]:
    """Interpolate across N colors at global parameter t in [0,1]."""
    if len(colors) == 1:
        return colors[0]
    seg = min(int(t * (len(colors) - 1)), len(colors) - 2)
    local = t * (len(colors) - 1) - seg
    return lerp_oklch(colors[seg], colors[seg + 1], local)


def fmt_oklch(lch: tuple[float, float, float]) -> str:
    L, C, H = lch
    return f"oklch({L * 100:.1f}% {C:.3f} {H:.1f})"


def build_linear(colors_lch, stops: int, ease: str, angle: float) -> str:
    ease_fn = cubic_bezier(*EASINGS[ease])
    lines = []
    for i in range(stops):
        t = i / (stops - 1) if stops > 1 else 0.0
        pos = ease_fn(t) * 100.0           # eased POSITION, uniform COLOR param
        lines.append(f"  {fmt_oklch(multicolor_lerp(colors_lch, t))} {pos:.1f}%")
    body = ",\n".join(lines)
    return f"linear-gradient({angle:g}deg in oklch,\n{body})"


def build_mesh(colors_lch, base: tuple[float, float, float]) -> str:
    """Stacked radial-gradient mesh: each input color becomes a soft blob at a
    different anchor over a solid base (the darkest/end color)."""
    anchors = ["at 15% 20%", "at 85% 15%", "at 50% 95%", "at 90% 80%", "at 10% 85%"]
    blobs = []
    for i, c in enumerate(colors_lch):
        at = anchors[i % len(anchors)]
        blobs.append(f"  radial-gradient({at}, {fmt_oklch(c)} 0%, transparent 55%)")
    body = ",\n".join(blobs)
    return f"background-color: {fmt_oklch(base)};\n  background-image:\n{body};"


GRAIN_SNIPPET = """/* Grain overlay — kills banding, adds analog texture. Keep opacity 0.03-0.06. */
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}"""


def main() -> int:
    p = argparse.ArgumentParser(
        description="Eased, OKLCH-interpolated gradient CSS generator.",
        epilog="Example: python3 gradient_gen.py '#2E7FFF' '#050A18' --stops 7 --ease ease-in-out --angle 180",
    )
    p.add_argument("colors", nargs="+",
                   help="Two or more colors (#RGB / #RRGGBB / rgb(...) / basic names)")
    p.add_argument("--stops", type=int, default=7, metavar="N",
                   help="Number of color stops, distributed along the easing curve (default: 7)")
    p.add_argument("--ease", choices=sorted(EASINGS), default="ease-in-out",
                   help="Easing curve for stop distribution (default: ease-in-out)")
    p.add_argument("--angle", type=float, default=135, metavar="DEG",
                   help="Gradient angle in degrees (default: 135)")
    p.add_argument("--mesh", action="store_true",
                   help="Also emit a stacked radial-gradient mesh variant")
    p.add_argument("--grain", action="store_true",
                   help="Append the SVG-noise grain overlay snippet")
    args = p.parse_args()

    if len(args.colors) < 2:
        p.error("need at least two colors")
    if args.stops < 2:
        p.error("--stops must be >= 2")

    try:
        rgbs = [parse_color(c) for c in args.colors]
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1
    colors_lch = [srgb_to_oklch(*c) for c in rgbs]

    print(f"/* Eased gradient — {args.ease} stop distribution, OKLCH interpolation */")
    print("/* Eased positions bunch stops where the eye is most sensitive -> no visible midpoint band. */")
    print(".gradient {")
    print(f"  background: {build_linear(colors_lch, args.stops, args.ease, args.angle)};")
    print("}")

    if args.mesh:
        print("\n/* Mesh variant — soft blobs of each input color over a base fill. */")
        print("/* Animate blob positions slowly (20s+) for an 'aurora' effect. */")
        print(".gradient-mesh {")
        print(f"  {build_mesh(colors_lch, colors_lch[-1])}")
        print("}")

    if args.grain:
        print()
        print(GRAIN_SNIPPET)

    # Human-readable check line: show midpoint color as hex for quick sanity.
    mid = oklch_to_srgb(*multicolor_lerp(colors_lch, 0.5))
    print(f"\n/* sanity check — perceptual midpoint: #{mid[0]:02X}{mid[1]:02X}{mid[2]:02X} */")
    return 0


if __name__ == "__main__":
    sys.exit(main())
