#!/usr/bin/env python3
"""visual-g1.py — deterministische Pixel-Checks für AAA-Visual-Deliverables.

Kein LLM. Exit 0 = grün, Exit 1 = rot, Exit 2 = Usage/IO-Fehler.

Usage:
  python3 visual-g1.py <render-dir> [--json out.json] [--margin-pct 0.045]
  python3 visual-g1.py file1.png file2.png ...
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError as e:
    print(f"FATAL: needs Pillow+numpy: {e}", file=sys.stderr)
    sys.exit(2)


def load_rgb(path: Path) -> np.ndarray:
    im = Image.open(path).convert("RGB")
    return np.asarray(im, dtype=np.float32)


def check_empty_or_tiny(path: Path, arr: np.ndarray) -> list[dict]:
    out = []
    size = path.stat().st_size
    h, w = arr.shape[:2]
    if size < 10_000:
        out.append(
            {
                "id": "empty-or-tiny",
                "severity": "high",
                "msg": f"{path.name}: file too small ({size} bytes)",
            }
        )
    if h < 200 or w < 200:
        out.append(
            {
                "id": "empty-or-tiny",
                "severity": "high",
                "msg": f"{path.name}: dimensions too small ({w}x{h})",
            }
        )
    return out


def check_hard_black_slab(path: Path, arr: np.ndarray) -> list[dict]:
    """Harter Slab = helles Foto oben stirbt abrupt in tot-schwarzer Platte.

    Weiche Scrims für weisse Headline (Cover) sind OK. Fail nur wenn:
    - obere Hälfte foto-hell
    - untere 30% stark near-black
    - geglätteter Helligkeitsabfall über <10% der Höhe
    - Mittelband noch foto-ähnlich (hohe Varianz), also Motiv wird gekillt
    """
    h, w, _ = arr.shape
    lum = arr.mean(axis=(1, 2))
    # smooth over ~2% height to ignore single-row noise
    win = max(3, int(h * 0.02))
    kernel = np.ones(win, dtype=np.float32) / win
    smooth = np.convolve(lum, kernel, mode="same")

    upper_mean = float(smooth[: int(h * 0.40)].mean())
    mid = arr[int(h * 0.42) : int(h * 0.58), int(w * 0.15) : int(w * 0.85), :]
    mid_std = float(mid.std()) if mid.size else 0.0
    mid_mean = float(mid.mean()) if mid.size else 0.0

    y0 = int(h * 0.70)
    bottom = smooth[y0:]
    black_frac = float((bottom < 22).mean()) if len(bottom) else 0.0

    above = np.where(smooth > 70)[0]
    below = np.where(smooth < 25)[0]
    if len(above) == 0 or len(below) == 0:
        return []
    last_bright = int(above.max())
    first_black_after = below[below > last_bright]
    if len(first_black_after) == 0:
        return []
    first_black = int(first_black_after[0])
    fall_frac = (first_black - last_bright) / float(h)

    # Designed scrim (cover) keeps enough bright text in the LOWER third AND
    # still has structure in the deepest 12%. A hard slab kills the photo into
    # empty near-black — even if a white headline floats higher.
    bottom_rgb = arr[y0:, :, :]
    bottom_lum = bottom_rgb.mean(axis=2)
    bright_text_frac = float((bottom_lum > 170).mean())
    deep = arr[int(h * 0.88) :, :, :]
    deep_lum = deep.mean(axis=2) if deep.size else bottom_lum
    deep_bright = float((deep_lum > 170).mean()) if deep_lum.size else 0.0
    deep_p50 = float(np.percentile(deep_lum, 50)) if deep_lum.size else 0.0
    # Cover-style: lots of white text overall OR deep area still holds text.
    # v14 slab: bright_text≈0.018 (headline only), deep_p50≈13, deep_bright≈0.
    designed_scrim = bright_text_frac >= 0.045 or deep_bright >= 0.02

    findings = []
    # Photo killed into empty plate: bright top, structured mid, short fall,
    # black bottom, NO designed white text sitting on the dark area.
    photo_mid = mid_std > 28 and mid_mean > 55
    dead_deep = deep_p50 < 20 and deep_bright < 0.01
    if (
        upper_mean > 100
        and photo_mid
        and black_frac >= 0.22
        and fall_frac < 0.10
        and (not designed_scrim or dead_deep)
    ):
        findings.append(
            {
                "id": "hard-black-slab",
                "severity": "high",
                "msg": (
                    f"{path.name}: hard black slab — fall {fall_frac:.1%} h, "
                    f"bottom near-black {black_frac:.0%}, mid_std={mid_std:.0f}, "
                    f"deep_p50={deep_p50:.0f}"
                ),
            }
        )
    # extreme dead plate without text
    if (
        not designed_scrim
        and upper_mean > 110
        and black_frac >= 0.45
        and fall_frac < 0.12
        and dead_deep
    ):
        findings.append(
            {
                "id": "hard-black-slab",
                "severity": "high",
                "msg": (
                    f"{path.name}: solid black bottom band "
                    f"{black_frac:.0%} after fall {fall_frac:.1%}"
                ),
            }
        )
    return findings


def check_low_variance_dead_zone(path: Path, arr: np.ndarray) -> list[dict]:
    h, w, _ = arr.shape
    band = arr[int(h * 0.72) : int(h * 0.95), int(w * 0.1) : int(w * 0.9), :]
    if band.size == 0:
        return []
    std = float(band.std())
    mean = float(band.mean())
    # very dark + almost no variance = dead plate
    if mean < 30 and std < 12:
        return [
            {
                "id": "low-variance-dead-zone",
                "severity": "medium",
                "msg": (
                    f"{path.name}: dead zone mean={mean:.1f} std={std:.1f} "
                    f"in lower band"
                ),
            }
        ]
    return []


def check_blur_mirror_band(path: Path, arr: np.ndarray) -> list[dict]:
    """Detect a thin band near bottom that correlates with a flipped copy of
    the band above it (classic mirror-blur outpaint cheat)."""
    h, w, _ = arr.shape
    if h < 400:
        return []
    # compare strip A (above) with vertical flip of strip B (below)
    a0, a1 = int(h * 0.78), int(h * 0.86)
    b0, b1 = int(h * 0.86), int(h * 0.94)
    if a1 <= a0 or b1 <= b0 or (a1 - a0) != (b1 - b0):
        # normalize lengths
        L = min(a1 - a0, b1 - b0)
        if L < 20:
            return []
        A = arr[a0 : a0 + L]
        B = arr[b0 : b0 + L]
    else:
        A = arr[a0:a1]
        B = arr[b0:b1]
        L = A.shape[0]
    Bflip = B[::-1]
    A_flat = (A - A.mean()).reshape(-1)
    B_flat = (Bflip - Bflip.mean()).reshape(-1)
    mad = float(np.mean(np.abs(A_flat - B_flat)))
    denom = float(np.linalg.norm(A_flat) * np.linalg.norm(B_flat))
    corr = float(np.dot(A_flat, B_flat) / denom) if denom > 1e-6 else 0.0
    struct = float(A.std())
    # Real mirror cheats are near-copies after flip. Natural grass rarely
    # hits corr>0.88 with low mad — require both.
    if struct > 22 and corr >= 0.88 and mad < 12:
        return [
            {
                "id": "blur-mirror-band",
                "severity": "high",
                "msg": (
                    f"{path.name}: possible mirror band corr={corr:.2f} "
                    f"mad={mad:.1f} struct={struct:.1f}"
                ),
            }
        ]
    return []


def check_edge_content_crush(path: Path, arr: np.ndarray, margin_pct: float) -> list[dict]:
    """UI-like content crushed into the outer margin (not full-bleed photos).

    Full-bleed photo pages always have variance at left/right/top — that is
    design, not a fail. We only flag the BOTTOM margin when it looks like
    bright/red UI pressed into the frame, and left/right only when a thin
    strip looks like a solid UI bar (low row-variance, mid luminance).
    """
    h, w, _ = arr.shape
    mx = max(2, int(w * margin_pct))
    my = max(2, int(h * margin_pct * 0.7))
    findings = []

    # bottom: bright UI pressed into frame
    bottom = arr[h - my :, int(w * 0.12) : int(w * 0.88), :]
    b_mean = float(bottom.mean())
    b_std = float(bottom.std())
    b_r = float(bottom[:, :, 0].mean())
    b_g = float(bottom[:, :, 1].mean())
    b_b = float(bottom[:, :, 2].mean())
    reddish = b_r > 140 and b_r > b_g * 1.25 and b_r > b_b * 1.25
    if (b_mean > 160 or reddish) and b_std > 20:
        findings.append(
            {
                "id": "edge-content-crush",
                "severity": "high",
                "msg": (
                    f"{path.name}: UI-like content in bottom margin "
                    f"(mean={b_mean:.0f} std={b_std:.0f})"
                ),
            }
        )

    # left/right: only solid mid-tone bars (QR/buttons glued to edge), not photos
    for name, strip in (
        ("left", arr[int(h * 0.2) : int(h * 0.8), :mx, :]),
        ("right", arr[int(h * 0.2) : int(h * 0.8), w - mx :, :]),
    ):
        # per-row means — a solid UI bar has low row-to-row variance
        row_means = strip.mean(axis=(1, 2))
        row_std = float(row_means.std()) if len(row_means) else 999
        mean = float(strip.mean())
        std = float(strip.std())
        if 40 < mean < 220 and std > 35 and row_std < 18:
            findings.append(
                {
                    "id": "edge-content-crush",
                    "severity": "medium",
                    "msg": (
                        f"{path.name}: solid UI bar on {name} edge "
                        f"(mean={mean:.0f} row_std={row_std:.1f})"
                    ),
                }
            )
    return findings


def check_bottom_text_clip_risk(path: Path, arr: np.ndarray) -> list[dict]:
    """Bright/red UI block that ends abruptly at the very bottom frame."""
    h, w, _ = arr.shape
    last = arr[h - 8 : h - 2, int(w * 0.15) : int(w * 0.85), :]
    above = arr[h - 40 : h - 20, int(w * 0.15) : int(w * 0.85), :]
    if last.size == 0 or above.size == 0:
        return []
    # red-ish or very bright content near bottom with sharp cutoff
    last_mean = last.mean(axis=(0, 1))
    above_mean = above.mean(axis=(0, 1))
    last_lum = float(last_mean.mean())
    above_lum = float(above_mean.mean())
    # red button signature: R high, G/B lower
    r, g, b = last_mean
    is_reddish = r > 150 and r > g * 1.3 and r > b * 1.3
    is_bright_ui = last_lum > 180
    sharp_cut = abs(above_lum - last_lum) > 50 and last_lum > 80
    # if last rows are still bright/red, content is pressed to frame
    if (is_reddish or is_bright_ui) and float(last.std()) > 15:
        return [
            {
                "id": "bottom-text-clip-risk",
                "severity": "high",
                "msg": (
                    f"{path.name}: bright/red UI at bottom edge "
                    f"(lum={last_lum:.0f}) — clip risk"
                ),
            }
        ]
    if sharp_cut and above_lum > 120:
        return [
            {
                "id": "bottom-text-clip-risk",
                "severity": "medium",
                "msg": (
                    f"{path.name}: sharp luminance cut near bottom "
                    f"(above={above_lum:.0f} last={last_lum:.0f})"
                ),
            }
        ]
    return []


def analyze_file(path: Path, margin_pct: float) -> list[dict]:
    arr = load_rgb(path)
    findings: list[dict] = []
    findings += check_empty_or_tiny(path, arr)
    findings += check_hard_black_slab(path, arr)
    findings += check_low_variance_dead_zone(path, arr)
    findings += check_blur_mirror_band(path, arr)
    findings += check_edge_content_crush(path, arr, margin_pct)
    findings += check_bottom_text_clip_risk(path, arr)
    for f in findings:
        f["file"] = str(path)
    return findings


def collect_paths(args_paths: list[str]) -> list[Path]:
    paths: list[Path] = []
    for raw in args_paths:
        p = Path(raw)
        if p.is_dir():
            paths.extend(sorted(p.glob("*.png")))
            paths.extend(sorted(p.glob("**/*.png")))
        elif p.is_file():
            paths.append(p)
        else:
            raise FileNotFoundError(raw)
    # unique preserve order
    seen = set()
    out = []
    for p in paths:
        rp = p.resolve()
        if rp in seen:
            continue
        seen.add(rp)
        out.append(p)
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="visual-aaa G1 pixel gate")
    ap.add_argument("paths", nargs="+", help="render dir and/or PNG files")
    ap.add_argument("--json", dest="json_out", default=None)
    ap.add_argument("--margin-pct", type=float, default=0.045)
    args = ap.parse_args()

    try:
        files = collect_paths(args.paths)
    except FileNotFoundError as e:
        print(f"FATAL: not found: {e}", file=sys.stderr)
        return 2

    if not files:
        print("FATAL: no PNG files found", file=sys.stderr)
        return 2

    all_findings: list[dict] = []
    per_file = {}
    for f in files:
        fs = analyze_file(f, args.margin_pct)
        per_file[str(f)] = fs
        all_findings.extend(fs)

    report = {
        "schema": "visual-aaa/g1/v1",
        "ok": len(all_findings) == 0,
        "file_count": len(files),
        "finding_count": len(all_findings),
        "findings": all_findings,
        "per_file": per_file,
    }

    if args.json_out:
        outp = Path(args.json_out)
        outp.parent.mkdir(parents=True, exist_ok=True)
        outp.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")

    if all_findings:
        print(f"G1 FAIL — {len(all_findings)} finding(s) in {len(files)} file(s)")
        for f in all_findings:
            print(f"  [{f['severity']}] {f['id']}: {f['msg']}")
        return 1

    print(f"G1 PASS — {len(files)} file(s), 0 findings")
    return 0


if __name__ == "__main__":
    sys.exit(main())
