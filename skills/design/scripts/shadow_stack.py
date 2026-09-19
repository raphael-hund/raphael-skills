#!/usr/bin/env python3
"""
shadow_stack.py — Generate realistic layered box-shadow stacks per
elevation level (1-5), optionally tinted with a brand color.

Real shadows are never a single blur: they combine a tight CONTACT shadow
(short offset, small blur — grounds the element) with a soft AMBIENT shadow
(long offset, large blur, low opacity — lifts it). This script emits both,
tuned per level, as copy-paste CSS.

Part of the ui-design-mastery skill. Standard library only.

Usage:
    python3 shadow_stack.py --level 3
    python3 shadow_stack.py --level 2 --color "#1B3A8C"     # colored shadow
    python3 shadow_stack.py --level 4 --color "#F5820B" --alpha 0.35
"""

import argparse
import re
import sys

# (contact: y, blur, alpha) and (ambient: y, blur, alpha) per level.
# Numbers follow the pattern observed in high-end product UI:
# ambient blur ≈ 2.5-4x offset; contact alpha ≈ 2x ambient alpha.
LEVELS = {
    1: {"name": "raised (input at rest, subtle card)",
        "contact": (1, 2, 0.06), "ambient": (2, 8, 0.05)},
    2: {"name": "card (default surface elevation)",
        "contact": (2, 4, 0.07), "ambient": (8, 24, 0.08)},
    3: {"name": "floating (dropdown, sticky nav, hover card)",
        "contact": (4, 8, 0.08), "ambient": (16, 48, 0.12)},
    4: {"name": "overlay (modal, popover, floating panel)",
        "contact": (8, 16, 0.10), "ambient": (32, 80, 0.16)},
    5: {"name": "hero mockup (product shot, maximum lift)",
        "contact": (12, 24, 0.12), "ambient": (48, 120, 0.22)},
}


def parse_hex(s: str) -> tuple[int, int, int]:
    h = s.strip().lstrip("#")
    if re.fullmatch(r"[0-9a-fA-F]{3}", h):
        h = "".join(c * 2 for c in h)
    if re.fullmatch(r"[0-9a-fA-F]{6}", h):
        return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    raise ValueError(f"not a hex color: '{s}'")


def rgba(rgb: tuple[int, int, int], alpha: float) -> str:
    return f"rgba({rgb[0]}, {rgb[1]}, {rgb[2]}, {alpha:.2f})"


def darken(rgb: tuple[int, int, int], factor: float) -> tuple[int, int, int]:
    """Shadows are darker than the surface that casts them."""
    return tuple(round(c * factor) for c in rgb)


def main() -> int:
    p = argparse.ArgumentParser(
        description="Layered box-shadow stacks per elevation level (contact + ambient).",
        epilog="Example: python3 shadow_stack.py --level 3 --color '#1B3A8C'",
    )
    p.add_argument("--level", type=int, choices=range(1, 6), default=3, metavar="1-5",
                   help="Elevation level: 1 raised, 2 card, 3 floating, 4 overlay, 5 hero (default: 3)")
    p.add_argument("--color", metavar="HEX",
                   help="Tint the shadow with a brand color (colored shadows = premium signal; "
                        "match the element's fill or the page's dominant hue)")
    p.add_argument("--alpha", type=float, default=None,
                   help="Override ambient opacity (default: per-level tuned value)")
    p.add_argument("--var", dest="varname", default=None, metavar="NAME",
                   help="Wrap output in a CSS custom property, e.g. --var shadow-3")
    args = p.parse_args()

    cfg = LEVELS[args.level]
    cy, cb, ca = cfg["contact"]
    ay, ab, aa = cfg["ambient"]
    if args.alpha is not None:
        if not 0 < args.alpha <= 1:
            p.error("--alpha must be in (0, 1]")
        aa = args.alpha

    if args.color:
        try:
            base = parse_hex(args.color)
        except ValueError as e:
            print(f"error: {e}", file=sys.stderr)
            return 1
        # colored shadow: ambient carries the hue, contact is darker+desaturated
        ambient_rgb = darken(base, 0.55)
        contact_rgb = darken(base, 0.35)
        note = (f"colored shadow tinted from {args.color.upper()} — hue matched to "
                f"source color, darkened for realism")
    else:
        ambient_rgb = contact_rgb = (15, 20, 35)  # near-black with a cool cast,
        note = "neutral shadow (cool near-black — pure #000 shadows look dead on light UIs)"

    contact = f"0 {cy}px {cb}px {rgba(contact_rgb, ca)}"
    ambient = f"0 {ay}px {ab}px {rgba(ambient_rgb, aa)}"
    stack = f"{contact}, {ambient}"

    print(f"/* Elevation level {args.level} — {cfg['name']} */")
    print(f"/* {note} */")
    print(f"/* Stack: contact shadow (grounds it) + ambient shadow (lifts it). */")
    if args.varname:
        name = args.varname if args.varname.startswith("--") else f"--{args.varname}"
        print(f":root {{")
        print(f"  {name}: {stack};")
        print(f"}}")
        print(f".elevated {{")
        print(f"  box-shadow: var({name});")
        print(f"}}")
    else:
        print(f".elevated {{")
        print(f"  box-shadow: {stack};")
        print(f"}}")
    print()
    print(f"/* Hover upgrade: raise one level and add a transition. */")
    if args.level < 5:
        n = LEVELS[args.level + 1]
        ncy, ncb, nca = n["contact"]
        nay, nab, naa = n["ambient"]
        hov = (f"0 {ncy}px {ncb}px {rgba(contact_rgb, nca)}, "
               f"0 {nay}px {nab}px {rgba(ambient_rgb, naa)}")
        print(f".elevated:hover {{")
        print(f"  box-shadow: {hov};")
        print(f"  transition: box-shadow 200ms cubic-bezier(0.22, 1, 0.36, 1);")
        print(f"}}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
