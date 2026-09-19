# Screenshot & Website Autopsy — The Forensic Method

> **Load when:** dissecting a screenshot or live site into a design spec — color tokens, type, effects, spacing, components (Mode A).
> **Skip when:** building from a brief with no reference imagery, or implementing specs that are already known.
> **Canonical for:** the 8-step forensic extraction method and the estimate-labeling rule.

**Contents:** §1 The 8-Step Process · §2 Live-Site Autopsy Protocol · §3 Autopsy Report Template · §4 Measurement Tricks — Quick Reference

> Any screenshot or live site can be dissected into a complete design spec:
> color tokens, type system, effect stacks, spacing rhythm, component inventory,
> asset strategy. This is Mode A. Measure, don't admire.

**Ground rule — estimates are labeled, never faked.**
Every value extracted from pixels is an *informed reconstruction*, not an
extracted design token. Mark all measured values with the tolerance:

> *"All hex, radius, blur and shadow values are informed estimates from
> pixel-level inspection — reconstruction targets, ±10%, not source tokens."*

Values pulled from production CSS of a live site are *real tokens* — say so
explicitly and keep the two categories separate in your report.

**Toolkit:** `scripts/extract_palette.py` (dominant colors, OKLCH),
`scripts/check_contrast.py` (WCAG verdicts), an image viewer with zoom,
and (for live sites) browser devtools + curl.

---

## The 8-Step Process

### Step 1 — Coarse style classification (30 seconds, before measuring anything)

Name the aesthetic lineage. This primes every later decision — a brutalist
layout *should* have 0-radius corners; measuring one and "correcting" it to
12 px would be malpractice. Current recurring archetypes (from the research
base):

| Archetype | Signals | Examples from autopsies |
|---|---|---|
| Dark glassy AI SaaS | navy field, glow, glass layers, beam light | Linear/Raycast lineage, Agex |
| Soft-minimal light | matte fills, colored shadows, nested radii | Notion/Linear-calendar |
| Neo-organic duotone | two brand anchors, color-graded 3D assets | Meska fintech |
| Editorial serif | Didone/transitional serif display + grotesque body | Oura, Tend |
| Mixed-type accent | sans headline + italic serif words | WCE, Trademania |
| Blueprint brutalism | mono caps, hairlines, zero radius, technical ornaments | Dataguard |
| Pixel/dither retro | mosaic gradients, bitmap fonts | Xuizver |

Also record: light/dark, chrome density (flat → glassy), radius character
(sharp → pill), and the *one thing* that makes it recognizable.

### Step 2 — Grid & layout reconstruction

- **Image scale first.** Note the screenshot's pixel dimensions and the
  viewport it represents. A 3032×4096 capture of a ~1440 CSS-px page is ~2.1×
  device-pixel ratio — divide all pixel measurements by the DPR before
  reporting CSS values.
- **Columns:** find the widest repeating content block; count columns by
  vertical edge alignments (nav logo left edge = headline left edge = card
  left edge). Most marketing sites: 12-col, max-width 1200–1400 px.
- **Vertical rhythm:** measure gaps between stacked elements in px. Round to
  the nearest multiple of 4; if 80% of gaps land on 8/16/24/32/48, it's an
  8-pt system — say so.
- **Section skeleton:** list sections top→bottom (`nav → hero → logos →
  features → … → footer`). The common production skeleton (canonical:
  `layout-and-sections.md` §3): Hero → social proof → value props /
  how-it-works → feature detail → CTA/app band → footer.
- **Grid breaks are information:** an element overflowing the frame (globe
  breaking the border, beam bleeding into the mockup) is a deliberate energy
  device. Record it as a technique, not an accident.

### Step 3 — Color extraction (programmatic + manual sampling)

**Programmatic pass:**

```bash
python3 scripts/extract_palette.py shot.png --top 8 --regions
```

Median-cut quantization gives dominant colors with pixel share + OKLCH; the
3×3 region map shows *where* colors live (hero vs. mid-page vs. footer — this
reveals the section-by-section background strategy).

**Manual pass for what quantization misses:** dominant-color algorithms bury
small but critical colors (the accent is often <2% of pixels). Zoom to 400%
and sample with PIL directly:

```python
from PIL import Image
px = Image.open("shot.png").convert("RGB").load()
print(px[1520, 480])           # single pixel — CTA fill
# average a 10×10 patch to beat anti-aliasing/JPEG noise:
import statistics
patch = [px[x, y] for x in range(1515, 1525) for y in range(475, 485)]
print(tuple(round(statistics.mean(c[i] for c in patch)) for i in range(3)))
```

Sampling rules:
- **Never sample edges or single anti-aliased pixels** — sample the *center* of
  fills (≥10×10 patch average). JPEG ringing shifts edge pixels by ±15.
- **Text color:** sample the darkest glyph core pixels, not edges.
- **Translucent layers:** a glass navbar's sampled value is a *composite*.
  Solve it, don't eyeball it. Worked example: sample the element's interior
  (patch average, e.g. RGB ≈ 80/112/151) and the immediately adjacent
  background (≈ 155/193/234). Pick a candidate base B and solve
  `composite = α·B + (1−α)·background` per channel; the α that fits all three
  channels is real. A navy fill `rgba(16,50,95,0.45)` fits the numbers above;
  `white/20` does not (it would render milky-light — verify the *sign* of the
  tint: is the element darker or lighter than its backdrop?). Test both a dark
  and a light base candidate before committing. Then check for textures at
  1600% zoom (dot grids, grain) before writing "none detectable".
- **Derive the color logic**, not just the list: neutral field % / accent % /
  text. Production leaders: ~90% neutral, ONE saturated accent quarantined to
  action + state. Duotone brands: two anchors (deep + light), everything
  between.
- **Verify with contrast:** `python3 scripts/check_contrast.py "#9FB0D6"
  "#050A18"` — record the ratio for every text/background pair. Failing pairs
  (e.g. orange on white at 2.6:1) tell you the color is reserved for
  large/bold/short usage — that *is* a design decision.

### Step 4 — Typography identification

You cannot get the exact font from pixels — get its *character* and metrics:

1. **Classification:** grotesque (Inter/SF character: single-story a, circular
   o, tight apertures) / geometric (General Sans, Satoshi) / humanist /
   transitional serif (high stroke contrast, bracketed serifs — Canela-like) /
   Didone display / mono / pixel-bitmap. Name 2–3 candidate families.
2. **Measure the scale in pixels:** measure cap-height or x-height of a known
   string and scale up: font-size ≈ cap-height px ÷ 0.7 (÷ DPR). Round to
   standard values (12/13/14/16/17/18/20/24…). Fewer sizes = more mature
   system (4 sizes is elite restraint).
3. **Weight:** compare stem thickness to x-height ratio against known renders;
   report as estimated (e.g. "560–600").
4. **Tracking & leading:** letter-spacing — measure inter-glyph gaps on
   headlines; negative tracking (−1% to −3%) on display sizes is the current
   premium signal. Line-height = baseline-to-baseline ÷ font-size.
5. **Devices:** record type *tricks* — two-tone headlines (active white /
   muted gray), italic-serif accent words inside sans headlines, uppercase
   tracked mono kickers, tabular numerals in dashboards, small-caps eyebrows.

### Step 5 — Effect measurement (the core forensic skill)

General principle: **measure the transition zone in pixels**, then translate
to effect parameters.

**Drop shadows.** Zoom to 800% at the shadow's bottom edge:
- *Offset Y* = px distance from the element's bottom edge to where the darkest
  shadow band sits.
- *Blur radius* ≈ the full width in px of the gradient transition from solid
  shadow to clean background (the CSS blur spreads roughly across that band).
- *Opacity* = sample the darkest shadow pixel over a known background:
  α ≈ 1 − (sampled/bg) per channel.
- *Count the layers:* a tight dark band near the edge + a wide faint halo =
  two-layer stack (contact + ambient). Report both separately. Level your
  reconstruction with `scripts/shadow_stack.py --level N`.
- *Colored shadows:* if the halo is tinted (orange shadow under an orange
  pill, green under a sheet on a sage backdrop), the shadow color matches the
  fill/backdrop — premium signal. Estimate: darken(fill, ~50%).

**Background blur / glassmorphism.** Blur radius can't be read directly —
estimate from *structure smearing*: find a hard edge behind the glass (grid
line, text) and measure how many px its transition widened. Widened by ~W px
→ blur ≈ W/2 to W. Typical production values: 12 px (chips), 16–24 px
(navbars, cards), 40+ px (hero panels). Record fill `rgba()` + border
(1 px, usually white or brand hue at 10–35% α) + inner top highlight.

**Border radius.** Measure at a corner: radius = side length of the square
that inscribes the corner arc (from straight-edge end to straight-edge end on
each axis — they're equal). Check the **nested-radius rule**: inner radius ≈
outer radius − padding. Report the scale (e.g. 8/12/16/24 + 999 pills) and
whether radius grows with surface size (it should).

**Gradients.** Sample 5–7 points along the gradient axis; check:
- linear vs. radial vs. mesh (multiple color centers = mesh),
- eased vs. flat-linear (perceptually uniform midpoint = OKLCH/eased; muddy
  gray midpoint = naive RGB linear),
- stop count (banding = too few stops; smooth = wide overlapping ranges + blur
  or grain),
- angle (sample brightest/darkest corners).
Rebuild with `scripts/gradient_gen.py` — never transcribe a flat linear.

**Glows** = drop-shadow with 0 offset and large blur: estimate as
`0 0 {blur}px {spread}px rgba(color, α)`; the halo width in px ≈ blur.

**Inner highlights / borders:** 1 px line at the top inner edge, white at
8–15% α = inner shadow `0 1px 0`. Gradient borders: sample border color top
vs. bottom; if it fades, it's a border-image/mask trick.

**Noise/grain:** zoom to 1600% — uniform high-frequency luminance speckle =
grain overlay (feTurbulence), typically 4–8% opacity (sweet spot 4–6). Its presence explains
why gradients don't band.

### Step 6 — Component inventory

List every component instance with: variant, geometry (padding, radius,
height), state styling, and effect stack. Group into the taxonomy: bars
(nav, footer), inputs (buttons, text fields, chips), layout (cards,
accordions), overlays (modals, toasts, FABs), helpers (badges, avatars,
progress), graphics (icons, illustrations, mockups).
For buttons always record the **variant ladder** (primary solid / tonal
secondary / outline / ghost) and how hierarchy is achieved (value contrast vs.
border vs. fill). Record hover states only as labeled guesses ("hover guess:
brighten + glow") — screenshots don't contain states.

### Step 7 — Asset strategy

For every image/render asset: what type (photo / 3D render / UI mockup /
texture / logo), what job it does (prove product depth, humanize, trust,
mood), and how it's integrated (color-graded into palette? masked shape?
device frame?). The strategic question: *why this asset and not another?*
Zero-photography pages (rendered UI + light effects only) and
one-hero-object-per-section are deliberate strategies — name them.

### Step 8 — Write the Autopsy Report

Use the template below. Fill every section; if a dimension is absent ("no
gradients", "no blur") — write that; absence is a finding. End with the
verdict: **what makes it work** (or not) in 3–5 named mechanisms, each tied to
a measurement. Optionally proceed to a rebuild (Mode D) using the extracted
tokens.

---

## Live-Site Autopsy Protocol

Screenshots lie (compression, DPR, rendering); production CSS doesn't. For a
URL, do both.

### A. Browser screenshot protocol

1. Viewport 1440×900 (DPR 1) for truth in px measurements; a second pass at
   2× DPR for crisp type/texture inspection.
2. Full-page capture + separate hero/section/footer shots. Scroll the entire
   page first (lazy-loaded sections must render).
3. Dismiss cookie banners/chat widgets *after* documenting them (overlays are
   part of the autopsy: count them — 3+ stacked overlays is a finding).
4. Dark/light mode both, if toggles exist.

### B. Production CSS extraction

```bash
# 1. Get the HTML and enumerate stylesheets
curl -sL https://example.com | grep -oE '<link[^>]+stylesheet[^>]*>' 

# 2. Pull each stylesheet, then harvest tokens
curl -sL https://example.com/assets/main.css -o main.css
grep -oE '#[0-9a-fA-F]{3,8}\b' main.css | tr 'A-F' 'a-f' | sort | uniq -c | sort -rn | head -30
grep -oE 'oklch\([^)]*\)|rgba?\([^)]*\)' main.css | sort | uniq -c | sort -rn | head -30

# 3. Design tokens live in :root custom properties
grep -oE '\-\-[a-z0-9-]+:\s*[^;]+;' main.css | sort -u | head -60

# 4. Radius / shadow / duration scales
grep -oE 'border-radius:\s*[^;]+' main.css | sort | uniq -c | sort -rn | head
grep -oE 'box-shadow:\s*[^;]+' main.css | sort | uniq -c | sort -rn | head -20
grep -oE '(transition|animation)[^;]*' main.css | grep -oE '[0-9.]+m?s' | sort | uniq -c
```

In devtools, computed styles give what CSS files obfuscate (minified,
utility-generated): inspect the H1 (font-family stack, computed px size,
letter-spacing), primary button (padding, radius, shadow), body (background,
font). With Tailwind/utility CSS, harvest the *theme*: the spacing/radius/
color scales are enumerable from the utility classes actually used.
Font identity: devtools → Network → Fonts reveals the actual font files
(names are usually intact even when CSS is minified).

**Token harvest etiquette:** report real tokens as *extracted* (exact), keep
visual measurements as *estimated* (±10%). If they disagree, trust the CSS —
and note what the CSS can't show (e.g. rendered gradient smoothness, image
art direction).

---

## Autopsy Report Template

```markdown
# Autopsy — <Product/Site name> (<source file or URL>)

> All values marked ~ are informed reconstructions from pixel inspection
> (±10%). Values marked [css] are extracted production tokens.

### Overview / Composition
<2–4 sentences: what it is, the layout stack top→bottom, the signature device.>

### Style Classification
<archetype + lineage, light/dark, chrome density, radius character>

### Color System
- <role>: ~#HEX (oklch(...)) — share/context
- ...
- Color logic: <neutral/accent split, anchor strategy, semantic quarantine>
- Contrast: <pair>: <ratio>:1 (AA/AAA verdict) — <usage implication>

### Gradients
1. <name/location>: <type>, <stops with ~positions>, <angle>, <smoothness method>

### Effects (estimated parameters)
- <element>: <effect> — <measured parameters, e.g. shadow 0 24px 64px rgba(...,0.10)>

### Border-Radius System
<scale, pill usage, nested-radius compliance>

### Typography
- Family character: <classification + 2–3 candidate fonts>
- Scale: <sizes/weights/tracking/leading per level>
- Devices: <two-tone headlines, italic accents, mono kickers...>

### Spacing / Layout
<grid, max-width, vertical rhythm, section skeleton, grid breaks>

### Component Inventory
<grouped list: variant + geometry + effect stack>

### Buttons
<variant ladder, geometry, states (labeled as guesses)>

### Image Assets
1. <asset>: <type> — <job it does, integration method>
- Asset strategy: <the pattern in one sentence>

### What Makes It Work (verdict)
<3–5 named mechanisms, each tied to a measurement. If it doesn't work: name
the failing mechanism the same way.>

### Rebuild Notes (optional)
<token table ready for Mode D, deviations to improve on the original>
```

---

## Measurement Tricks — Quick Reference

| Target | Trick |
|---|---|
| Shadow blur | Width in px of the transition band, shadow → background, at 800% zoom |
| Shadow offset | Distance from element edge to darkest shadow band |
| Shadow opacity | α ≈ 1 − sampled/bg on the darkest shadow pixel |
| Glass blur | Smearing width W of a hard edge behind the glass → blur ≈ W/2–W |
| Glass α | Compare same element over known light vs. dark backgrounds |
| Radius | Inscribe a square in the corner arc; side length = radius |
| Font size | cap-height px ÷ 0.7 ÷ DPR, round to standard scale |
| Tracking | Measure total width of a known word vs. untracked render |
| Gradient stops | Sample 5–7 points along the axis; plot in OKLCH to see the easing |
| Glow | Halo width in px ≈ blur; center color = glow color at full α |
| Grain | 1600% zoom: uniform luminance speckle = feTurbulence overlay @4–8% |
| Translucency | Composite color ≠ fill color; solve α against two known backgrounds |
| DPR | Screenshot px ÷ CSS px (≈ capture width ÷ viewport width) — divide everything |
