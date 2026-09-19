# Gradients & Easing

> **Load when:** building any gradient, blur blob, aurora, grain finish, or photo-derived backdrop.
> **Skip when:** flat solid-color design, or only component/layout work with no background treatment.
> **Canonical for:** eased stop distribution §1, blur blobs §4, grain recipe + asset §6, photo-as-gradient §7.

The core module. **Thesis: a flat linear gradient is the cheapest-looking element on a page.**
Premium gradients are *eased* — their color stops are distributed along an easing curve, so the
blend decelerates the way real light falls off. Then they are interpolated in OKLCH and sealed
with grain.

**Contents:** §1 Eased Stop Distribution (the Main Technique) · §2 OKLCH Interpolation: Killing the Gray Middle · §3 Mesh Gradients (Stacked Radials) · §4 Blur Blobs · §5 Conic Auroras · §6 Grain / Fine Noise against Banding · §7 Photo-as-Gradient (the Stride Sky Technique) · §8 Deliberate Stepped / Pixel-Mosaic Gradients (Xuizver) · §9 Gradient Borders (Preview) · §10 When NOT to Use a Gradient (Effect Restraint)

---

## 1. Eased stop distribution

### The problem

`linear-gradient(90deg, #A, #B)` moves color at constant velocity. Real light never does:
it falls off fast near the source and decelerates into the surroundings (ease-out), or swells
and settles (ease-in-out). A constant-velocity blend reads as synthetic — this is why most
CSS gradients look "generated".

### The technique

Place N color stops (5–9) at positions sampled from an easing curve instead of evenly.

Formula — for stop `i` of `n` stops:

```
t  = i / (n - 1)
position_i = cubicBezierY(x = t, x1, y1, x2, y2) * 100%
```

i.e. treat the easing function as a position remap: feed evenly spaced input `t`, emit the
bezier's y as the stop position. All stops share the same two colors; only positions move.

`scripts/gradient_gen.py` computes this: pass two colors, stop count, and an easing name
(`ease-out`, `ease-in-out`, `smoothstep`, or raw bezier coords) and it emits the CSS.

### Stop position tables

7 stops, percentages of gradient length:

| Stop # | linear | ease-in-out `(0.42,0,0.58,1)` | ease-out `(0,0,0.2,1)` |
|---|---|---|---|
| 1 | 0% | 0% | 0% |
| 2 | 16.7% | 5.6% | 44.2% |
| 3 | 33.3% | 23.2% | 68.5% |
| 4 | 50% | 50% | 83.9% |
| 5 | 66.7% | 76.8% | 93.4% |
| 6 | 83.3% | 94.4% | 98.5% |
| 7 | 100% | 100% | 100% |

Read the table as physics: ease-out races through the first half (44% by stop 2) then eases
into the end color — perfect for glows, scrims, and light sources. ease-in-out compresses both
ends and expands the middle — perfect for background field-to-field transitions.

### In CSS

Ease-out fade from accent to transparent (glow behind a hero asset):

```css
.glow {
  background: linear-gradient(180deg in oklch,
    oklch(62% 0.21 260 / 0.55) 0%,
    oklch(62% 0.21 260 / 0.40) 44%,
    oklch(62% 0.21 260 / 0.25) 68%,
    oklch(62% 0.21 260 / 0.13) 84%,
    oklch(62% 0.21 260 / 0.05) 93%,
    oklch(62% 0.21 260 / 0.01) 98.5%,
    transparent 100%);
}
```

Ease-in-out between two fields (hero navy → page black, Agex pattern):

```css
.section {
  background: linear-gradient(180deg in oklch,
    #08122B 0%, #071022 5.6%, #060D1D 23.2%, #050A18 50%,
    #04070F 76.8%, #03060C 94.4%, #05080F 100%);
}
```

(The interior hex stops are the OKLCH interpolation of `#08122B → #05080F` at those positions —
run `gradient_gen.py` instead of eyeballing them.)

### Easing choice by use case

| Use case | Easing | Why |
|---|---|---|
| Glow behind an object | ease-out | light decays fast, tails gently |
| Image scrim (photo → text zone) | ease-out | protects text contrast early, releases the photo late |
| Background A → background B | ease-in-out | neither section owns the seam |
| Vignette | ease-in-out, radial | symmetrical settle |
| Shadow simulation (fade of a fake shadow) | ease-out | matches physical shadow falloff |

Never use ease-in for UI gradients (accelerating into the end color reads as a hard edge).

---

## 2. OKLCH interpolation: killing the gray middle

sRGB blends complementary colors through desaturated gray: `#FF0080 → #00D4FF` passes through
mud at 50%. OKLCH interpolates along perceived lightness/chroma and keeps the blend saturated.

Two words fix it — stops may stay hex:

```css
background: linear-gradient(135deg in oklch, #FF0080, #00D4FF);
background: radial-gradient(circle in oklch, #F5E6C4, #2E1A10);   /* Synais gold silk ramp */
background: conic-gradient(from 180deg in oklch, #7C3AED, #06B6D4, #F472B6, #7C3AED);
```

Rules:

- Add `in oklch` to EVERY multi-hue gradient. For same-hue ramps it is still the safer default.
- Control the hue path: `in oklch longer hue` takes the long way around the wheel (rainbow-rich,
  use deliberately); default is shorter.
- Support: Chrome 111+, Safari 16.2+, Firefox 113+. Write the sRGB version first as fallback:

```css
.hero { background: linear-gradient(135deg, #FF0080, #00D4FF);
        background: linear-gradient(135deg in oklch, #FF0080, #00D4FF); }
```

---

## 3. Mesh gradients (stacked radials)

CSS has no `mesh-gradient()`. Simulate: one base `background-color` + 2–4 translucent radial
gradients positioned at different `%` coordinates, each fading to `transparent`.

```css
.hero {
  background-color: #050A18; /* Agex navy base — never skip it, radials are translucent */
  background-image:
    radial-gradient(at 50% 65%, oklch(48% 0.19 260 / 0.80), transparent 55%),  /* portal glow */
    radial-gradient(at 20% 20%, oklch(40% 0.14 255 / 0.35), transparent 50%),
    radial-gradient(at 85% 15%, oklch(30% 0.10 265 / 0.30), transparent 50%);
}
```

Rules:

- 3 radials is the sweet spot; 5+ turns to soup.
- Each radial fades within 50–60% of its box — overlap is what creates the mesh illusion.
- Keep the radials inside one hue family ±40° (Agex: all blues). Cross-complementary meshes are
  where the gray middle returns.
- Anchor the brightest radial where the CTA or mockup sits — the mesh is a spotlight, not wallpaper
  (Agex centers the glow under the email input; Meska blooms behind the card stack).

---

## 4. Blur blobs

Cheap, animatable alternative to huge mesh gradients: 2–4 large colored `<div>`s, heavily blurred.

```css
.blob {
  position: absolute;
  width: 480px; height: 480px;
  border-radius: 40% 60% 70% 30% / 60% 30% 70% 40%; /* organic, or 50% for round */
  background: oklch(62% 0.21 260);
  filter: blur(80px);
  opacity: 0.5;
}
```

Rules:

- Animate `transform: translate()` only (never position/size/blur) — GPU-composited, 60fps.
- Blur radius: 60–120px for hero-scale blobs. Below 40px the blob shows its shape.
- 2–3 blobs max per viewport, one dominant (80% opacity share), the rest supporting.
- Blobs behind content need a solid or near-solid base layer beneath them; over photography they
  smear detail (use §7 scrims instead).
- `overflow: hidden` on the section, or blobs scroll-bleed into neighbors.

---

## 5. Conic auroras

Rotating conic gradient + heavy blur = the "aurora" background.

```css
.aurora::before {
  content: "";
  position: absolute; inset: -20%;
  background: conic-gradient(from 180deg at 50% 50% in oklch,
    oklch(55% 0.20 280), oklch(65% 0.19 220), oklch(72% 0.17 165),
    oklch(65% 0.19 220), oklch(55% 0.20 280)); /* must return to start color */
  filter: blur(60px);
  animation: spin 24s linear infinite;
}
```

Rules:

- The first and last conic stops MUST match, or a hard seam shows.
- Blur 50–80px minimum; an unblurred conic is a color wheel, not an aurora.
- Hue span ≤ 120° for premium; full-wheel auroras are the 2022 AI-startup cliché.
- Respect `prefers-reduced-motion`: freeze the rotation (static aurora still works).

---

## 6. Grain / fine noise against banding

Smooth gradients over large areas band into visible steps on real displays (8-bit panels, dark
ramps). Fine grain dithers the bands away and adds the analog "print" texture that makes
gradients look expensive. (Synais' silk render reads premium partly because photographic noise
kills all banding.)

Overlay `assets/grain.svg` (SVG feTurbulence noise tile) on any large gradient:

```css
.grain::after {
  content: "";
  position: absolute; inset: 0;
  background-image: url("../assets/grain.svg");
  background-size: 180px;          /* tile size; smaller = finer grain */
  opacity: 0.05;                   /* 0.04–0.08 sweet spot; >0.1 reads dirty */
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

Rules:

- Opacity 0.04–0.08. If users can name the grain, it is too strong.
- `overlay` blend on mid-tone fields; use `soft-light` on very dark fields (overlay dies on black).
- One grain layer per viewport region — nested grains moiré.
- Keep it off text-heavy panels; grain under 14px text hurts perceived sharpness.

---

## 7. Photo-as-gradient (the Stride sky technique)

The strongest 2024–26 pattern: let photography BE the gradient. Stride's hero is a real mountain
sky photo (`#5899DD` azure → `#9BBEE8` ice) functioning as a vertical gradient; Finova stages
the whole page on a heavily blurred dark-amber photo; Agentos floats glass pricing cards over a
pastoral sunset; Cybercube presents the site inside an ambient blurred enlargement of itself.

Why it beats CSS: natural photos carry infinite, noise-rich, eased-by-physics color transitions.
No banding, no synthetic constant-velocity blend.

Implementation rules:

- Choose photos with a calm luminance ramp (sky, defocused architecture, haze) — busy photos are
  imagery, not gradients.
- Glass elements (white 20–30% opacity + `backdrop-filter: blur(40–60px)`) sit beautifully on
  photo gradients; flat cards die on them.
- Still guard text: add an eased scrim (§1) where type lands. Never trust the photo's contrast.
- For ambient staging: enlarge the site's hero image ~150%, `filter: blur(80–120px)`, place the
  page card over it (Finova/Cybercube device).

---

## 8. Deliberate stepped / pixel-mosaic gradients (Xuizver)

The anti-gradient gradient: stepped/dithered textures (pixel mosaic, halftone dot fields,
stipple) are a brand-ownable alternative to the mesh-gradient monoculture. Canonical texture
catalog with construction details and observed examples: `image-asset-strategy.md` §6.
This section covers only the gradient-side decision: when to step instead of smooth.

Rules:

- Use as a *signature texture*, not a background fill — Xuizver confines it to the hero panel and
  the outer page frame, keeping the working canvas pure white.
- Steps must be big enough to read as intentional (≥40px blocks or clearly visible dots); 2–4px
  stepping just looks like banding (see §6 — that's the failure grain fixes).
- Pair stepped texture with maximal polish elsewhere (sharp typography, disciplined spacing) —
  the contrast between retro texture and modern rigor IS the aesthetic.
- Concentrate the darkest/most saturated steps where you want attention to leave from
  (Xuizver dissolves toward the chat card so the card pops).

---

## 9. Gradient borders (preview)

A 1px gradient stroke on dark glass/cards is the standard premium edge treatment (Agex input
pill: light blue top → transparent bottom). Preview pattern:

```css
.card {
  border: 1px solid transparent;
  background:
    linear-gradient(#0C1630, #0C1630) padding-box,
    linear-gradient(180deg, rgba(140,170,255,0.35), rgba(140,170,255,0.05)) border-box;
}
```

Full recipes (double borders, animated conic rims, glow combos) live in
`figma-effects-cookbook.md` §Gradient Borders. Use eased stop distribution here too — a
linearly-faded border shows a hard midpoint.

---

## 10. When NOT to use a gradient (effect restraint)

The highest-ranked sites in the research base (Oura 9.5, Miles 9.0, Tend 9.0) use **zero UI
gradients**. Oura: warm ivory canvas, black, one blue — all color enters via product
photography. Miles: monochrome + one blue, flat everywhere. Their premium comes from
typography, photography, and spacing — gradients would dilute it.

Skip gradients when:

- The design's strength is typographic/editorial (Oura, seo-labs, Schmidt Immobilien).
- Photography already carries the color transitions (Stride section 1: "all color transitions
  come from photography").
- The brand signal is flatness/rigor (Dataguard's blueprint aesthetic uses dot density instead;
  thermondo restricts its signature gradient to 4px underlines and edge bars).
- You cannot articulate what the gradient is FOR. A gradient that doesn't seat an element,
  guide the eye, or protect text is decoration — and decoration is slop.

Budget: max 1 gradient *system* per page (one hero mesh, or one glow language, or one scrim
pattern) + functional micro-gradients (button sheens ≤5% luminance shift, chart fades).
Agex works because every gradient serves the single light source; the beam, the glow, and the
section fade are one idea, not three effects.
