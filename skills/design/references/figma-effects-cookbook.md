# Figma Effects Cookbook — Engineering Recipes

> **Load when:** implementing a specific visual effect — glass/blur, glow, shadows, radius systems, gradient borders, liquid glass — with exact parameters.
> **Skip when:** no effects on the page, or the question is gradient/grain/texture *rules* rather than effect parameters (canon: `gradients-and-easing.md` §4/§6, `image-asset-strategy.md` §6).
> **Canonical for:** Figma-effect → CSS parameter mappings (blur tiers, shadow stacks, gradient borders §9).

Every effect as a build recipe: what it is, when to use it, exact CSS/React code, parameter ranges, failure modes, and evidence from forensic screenshot autopsies (Agex, Synais, Meska, Stride, Xuizver, Finova, Cybercube, Agentos, Calendar card). Cited pixel values are reconstruction targets (±10%), not extracted tokens.

**Universal rules:** max 3 shadow layers per element; max 2 glow sources per viewport; blur cost = area × radius (live blur only on fixed/sticky chrome and small blobs); animate only `transform`/`opacity` (shadows: crossfade a pseudo-element layer via `opacity`); every animated effect needs a `prefers-reduced-motion` fallback.

**Contents:** §1 Background Blur (`backdrop-filter`) · §2 Layer Blur (`filter: blur`) · §3 Opacity/Glass Tiers · §4 Border Radius Systems · §5 Inner Glow · §6 Outer Glow · §7 Inner Shadow · §8 Drop/Outer Shadow · §9 Gradient Borders (4 Techniques) · §10 Specular Highlights / Liquid Glass · §11 Blend Modes & Grain

---

## 1. Background Blur (`backdrop-filter`)

**What:** Blurs whatever sits *behind* a translucent element. The glassmorphism primitive.
**When:** Floating navbars, glass cards over imagery/gradients, modals, badge pills over heroes. Never over flat solid backgrounds — invisible and wasteful.

| Figma panel | CSS |
|---|---|
| Background blur, N px | `backdrop-filter: blur(Npx)` (+ `-webkit-` prefix for Safari < 18) |
| Fill color + opacity % | `background: rgb(R G B / alpha)` — alpha MUST be < 1 |
| Stroke 1px Inside | `border: 1px solid rgb(255 255 255 / 0.1–0.4)` |
| Inner shadow (top highlight) | `box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.12–0.25)` |

```css
.glass-nav { /* Agex navbar pill */
  background: rgb(10 20 45 / 0.35);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  border: 1px solid rgb(140 170 255 / 0.25);
  border-radius: 16px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.15);
}
```
```tsx
export function GlassNav({ children }: { children: React.ReactNode }) {
  return <nav className="glass-nav fixed top-6 inset-x-0 z-50">{children}</nav>;
}
```

**Parameter ranges:**

| Context | blur | bg alpha | border | Evidence |
|---|---|---|---|---|
| Floating navbar | 12–24px | 0.30–0.45 | 0.15–0.25 | Agex navbar: blur 20–24, `rgba(10,20,45,0.35)` |
| Badge / input pill | 12–24px | 0.35–0.45 | 0.25–0.35 | Agex badge: blur 16, fill `rgba(30,50,100,0.35)` |
| Stat card over imagery | 40–60px | 0.20–0.35 | white 0.4 inner | Stride "Your Run Today": white 25–35%, blur 40–60 |
| Frosted panel over photo | 30–40px | 0.55–0.65 dark | white 0.12 | Agentos pricing glass over sunset photo |
| Glass over UI mockup | ~12px | ~0.5 | 0.2 | Agex stat cards on dashboard |

**The saturate trick:** `blur(Npx) saturate(1.4–1.8)` is the "Apple look" — without it glass reads muddy gray. Blur depth encodes z-distance: cards on a mockup get *less* blur (12px) than the nav (24px). Pick 2–3 blur tokens max (e.g. 12/24/40).

**Failure modes:** opaque background → blur invisible (alpha ≤ 0.65); live `backdrop-filter` on large scrolling containers → frame drops; text over bright imagery fails contrast → darken under-layer or raise alpha; inconsistent radii across the page → broken "focal depth".

---

## 2. Layer Blur (`filter: blur`)

**What:** Blurs the element *itself*. Never confuse with background blur in Figma handoff — completely different property.
**When:** Ambient glow blobs, light beams, defocused photo backdrops, aurora backgrounds, portal glows behind mockups.

| Figma panel | CSS |
|---|---|
| Layer blur, N px | `filter: blur(Npx)` |
| Blend mode Screen/Overlay | `mix-blend-mode: screen` etc. |

Blob code (size, organic border-radius, transform-only animation rules): **canonical in `gradients-and-easing.md` §4**.

```css
.beam { /* Agex light beam: tall narrow blurred column */
  width: 120px; height: 80vh; filter: blur(60px);
  background: linear-gradient(180deg, transparent, #bfd9ff 48%, #bfd9ff 52%, transparent);
}
```

**Parameter ranges:** small glow dots 4–8px (Agex star dots: 2–4px circles, or duplicate layer + blur 4px + `screen`); blobs/aurora 60–120px (below 40px the blob shows its shape); ambient presentation backdrop 80–120px — Cybercube puts the whole page on a heavily blurred enlargement of itself (rose `#C4ACAC` → red `#BD2524` → maroon `#902E2D`, Apple-style ambient bleed). Photo-as-gradient: blur a real photo 60–120px as page backdrop (Finova: blurred amber photo `#2E2D29` behind the cream page card).

**Failure modes:** animating the blur value per frame (move blobs with `transform` instead); blobs clipped by ancestor `overflow: hidden` (isolate them in a dedicated absolute layer); mobile — halve blur radius and blob count below 768px.

---

## 3. Transparency / Opacity Systems (Glass Tiers)

**What:** A tokenized alpha ladder with a semantic job per tier — never ad-hoc opacities.

| Tier | Alpha | Job | Evidence |
|---|---|---|---|
| Whisper | 0.03–0.06 | Panel tints, hover fills | Agex chips `rgba(255,255,255,0.06)` |
| Light glass | 0.06–0.12 | Standard dark-UI glass fill | classic `.glass` white/0.08 |
| Hairline | 0.08–0.15 | Borders on dark glass | Agex card borders `rgba(120,150,220,0.15)` |
| Mid glass | 0.15–0.35 | Emphasized borders, badge fills | Agex badge border 0.35 |
| Strong glass | 0.20–0.35 | Cards over busy photography | Stride stat card white 25–35% |
| Frosted panel | 0.35–0.65 | Over high-frequency imagery | Agentos pricing black 55–65% |

**Rules:** busy/bright backdrop → raise alpha AND blur together; flat dark backdrop → 0.04–0.10 fill suffices, the border separates; borders always brighter than fills (0.06–0.10 fill ↔ 0.12–0.25 border); disabled text at 0.3–0.5 opacity (Agex secondary `#9FB0D6` ≈ 60% white).

**Failure modes:** alpha > 0.7 + blur = "dirty window"; border alpha < 0.03 invisible on non-Retina; mixing warm and cool alphas in one stack.

---

## 4. Border Radius Systems

**What:** A semantic scale tied to surface size and brand dialect — decide the dialect before building anything.

**Canonical scale (px):** `0 / 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32 / 999`

**Nested radius math — the premium tell:** `innerRadius ≈ outerRadius − padding`. Verified in every high-end autopsy: Calendar card 24 → 16 → 12 → 10; Synais features 32 → 20 → 14 → 10 → 5 (five levels); data-to-revenue 24 → 16 → 10.

```css
.card { border-radius: 24px; padding: 8px; }
.card-inner { border-radius: 16px; } /* 24 − 8 */
```

**Radius dialects (site-sharp vs app-soft):**

| Dialect | Marketing chrome | Product surfaces | Pills | Evidence |
|---|---|---|---|---|
| Sharp/corporate | 6–8px | 16–28px | 999 | Xuizver: buttons 6–8, app UI 16–999 — two dialects separate "site" from "app" |
| Blueprint/brutalist | 0–2px | 0 (chips 10) | rare | Dataguard: radius-0 buttons, engineering sheet |
| Balanced SaaS | 8–12px | 16–24px | 999 | Synais: buttons 8–10, cards 20, tiles 22 |
| Soft consumer | 12–16px | 16–32px | 999 | Stride: glass card 24, tab bar 24 |

**Pill radii:** `border-radius: 999px`, or rem-based `7rem–10.5rem` in rem systems. Never `50%` on non-square rectangles — it produces ellipses.

**Squircle approximation:** CSS has no continuous corners. True squircle → SVG clip-path; practical fake → radius ≈ 22–25% of the shorter side reads squircle-ish on small tiles (Synais 96px app tiles at 22px radius; 8px squircle eyebrow chips — deliberately *not* full pills).

```css
.squircle { clip-path: url(#squircle); } /* SDF path: M0,50 C0,10 10,0 50,0 S100,10 100,50 S90,100 50,100 S0,90 0,50 Z */
.icon-tile { border-radius: 22px; }      /* fake-squircle on a 96px tile */
```

**Failure modes:** mixing dialects without semantic reason; child radius ≥ parent radius (corner bleed); radius not scaling with surface size (Stride: thumbnails 12–16, testimonial cards 32–40 — radius grows with the surface).

---

## 5. Inner Glow

**What:** Inset shadow in the *accent color* (or white) bleeding inward — light caught inside the surface.
**When:** Premium primary buttons, active/selected states, glass edge definition, neon-adjacent dark UIs.

| Figma panel | CSS |
|---|---|
| Inner shadow, accent color, Y0, blur 8–24 | `box-shadow: inset 0 0 16px rgb(accent / 0.3)` |
| Inner shadow white, Y1, blur 0 | `box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25)` |

```css
.btn-premium {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.25),  /* top specular line */
    inset 0 -1px 0 rgb(0 0 0 / 0.2),        /* bottom occlusion */
    inset 0 0 20px rgb(47 107 255 / 0.35);  /* accent inner glow */
}
```

**Parameter ranges:** top highlight alpha 0.08–0.35 (Synais CTA white 0.08; Calendar selected day 0.35); accent glow blur 8–24px, alpha 0.2–0.4. Also: Cybercube button inner top shadow white 0.04; Agex input `inset 0 1px 0 rgba(255,255,255,0.12)`.

**Failure modes:** inner glow + outer glow + gradient border at once = noise (pick 2); glow hue mismatched to fill; inner glow on light surfaces is invisible — use a darker tint.

---

## 6. Outer Glow

**What:** A colored, zero-offset, large-blur shadow reading as emitted light.
**When:** Dark UIs only; ONE coherent light source per composition (Agex works because badge → input → mockup share one blue source). CTAs, badges, data nodes, hero portals.

| Figma panel | CSS |
|---|---|
| Drop shadow X0 Y0, blur 24–240, spread 0–40, accent color | `box-shadow: 0 0 120px 40px rgb(accent / 0.55)` |

```css
.portal { /* Agex portal glow feeding the dashboard mockup */
  box-shadow:
    0 0 120px 40px rgb(46 127 255 / 0.55),  /* core */
    0 0 240px 0 rgb(46 127 255 / 0.25);     /* halo */
}
.badge-glow { box-shadow: 0 0 24px rgb(60 110 255 / 0.35); }  /* Agex badge */
.node-ring  { box-shadow: 0 0 16px rgb(216 240 160 / 0.6); }  /* Meska globe nodes */
.cta-edge   { box-shadow: 0 0 12px rgb(229 25 34 / 0.25); }   /* Cybercube red edge glow */
```

**Parameter ranges:** UI glows 12–24px blur, alpha 0.25–0.6; hero/ambient glows 100–240px blur, alpha 0.25–0.55, spread ≤ 40px.

**Failure modes:** glows on light backgrounds look like dirt — use tinted drop shadows instead; two glow hues in one viewport; glow clipped by parent `overflow: hidden`.

---

## 7. Inner Shadow

**What:** Inset dark shadow — recessed depth (wells, inputs, pressed states), the opposite of elevation.
**When:** Text inputs, inset panels, toggle off-states, "cutout" surfaces.

```css
.input-dark { /* Synais newsletter input */
  background: #17100c; border: 1px solid #2c2019; border-radius: 10px;
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.4);
}
.input-light { background: rgb(0 0 0 / 0.03); box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.08); }
```

**Parameter ranges:** Y 1–2px, blur 2–6px, alpha 0.08–0.4 (dark themes 0.3–0.4, light themes ≤ 0.1).

**Failure modes:** inset + outset on the same plane contradicts the lighting model (inset = recessed, outset = raised); too-dark insets on light themes read as grime; CSS `inset` cannot overflow bounds like Figma — use a pseudo-element ring for partial inner edges.

---

## 8. Drop / Outer Shadow

**What:** Elevation. Realistic shadows are 2–3-layer stacks, never a single heavy blur.

| Figma panel | CSS |
|---|---|
| X, Y, Blur, Spread, Color+% | `box-shadow: Xpx Ypx Blurpx Spreadpx rgb(R G B / α)` — map 1:1, then split into 2–3 layers |

```css
.shadow-float { /* realistic 3-tier stack — beats any single Figma shadow */
  box-shadow:
    0 1px 2px rgb(0 0 0 / 0.06),    /* contact */
    0 4px 8px rgb(0 0 0 / 0.06),    /* penumbra */
    0 12px 32px rgb(0 0 0 / 0.08);  /* ambient */
}
.shadow-card { /* "expensive floating card" (Calendar card) */
  box-shadow: 0 24px 64px rgb(20 20 40 / 0.10), 0 4px 12px rgb(20 20 40 / 0.06);
}
```

**Colored shadows — the quiet premium differentiator.** Shadow hue matches the fill: take the fill color, alpha 0.25–0.4, blur ≈ 2–3× the Y-offset.

```css
.chip-orange { box-shadow: 0 6px 16px rgb(245 130 11 / 0.35); }  /* Calendar selected day + FAB */
.phone-navy  { box-shadow: 0 40px 100px rgb(27 58 140 / 0.18); } /* Stride phone mockup */
.btn-maroon  { box-shadow: 0 8px 20px rgb(74 35 32 / 0.35); }    /* Synais primary CTA */
.btn-red     { box-shadow: 0 4px 16px rgb(233 69 41 / 0.30); }   /* Agentos Upgrade */
```

**Green-tinted ambient shadows:** match the shadow to the *environment* — data-to-revenue sheet floats over sage artwork with `0 32px 80px rgba(60,70,60,0.14)`; Synais hero hand photo `0 24px 64px rgba(30,18,14,0.25)`.

| Elevation | Layers | Example |
|---|---|---|
| Resting card | 1–2, Y2–8, blur 8–24, α 0.04–0.10 | Synais white CTA `0 2px 8px /0.08` |
| Floating panel | 2, Y12–24, blur 40–80, α 0.10–0.14 | Xuizver chat card Y24 blur80 α0.10 |
| Hero mockup | 2, Y24–40, blur 80–120, α 0.15–0.6 | Agex dashboard `0 40px 120px /0.6` + blue ambient `0 -20px 160px /0.35` |

**Failure modes:** single pure-black α0.3 shadows (the generic `shadow-md` tell); shadows darker than the surface beneath; per-frame `box-shadow` animation — crossfade a `::after` shadow layer's `opacity`.

---

## 9. Gradient Borders (4 techniques)

**What:** A 1px stroke whose color is a gradient — typically light-top → transparent-bottom on glass. Evidence: Agex email input gradient border.

**A — `border-image`** (fastest, NO radius support):
```css
.chip {
  border: 1px solid transparent;
  border-image: linear-gradient(180deg, rgb(140 170 255 / 0.6), rgb(140 170 255 / 0)) 1;
}
```

**B — double background + `background-clip`** (keeps radius — the reliable default):
```css
.btn-gradient-border {
  border: 1px solid transparent; border-radius: 12px;
  background:
    linear-gradient(#0f1e46, #0f1e46) padding-box,             /* fill */
    linear-gradient(180deg, rgb(140 170 255 / 0.7), rgb(140 170 255 / 0.05)) border-box;
}
```

**C — pseudo-element mask** (full control, animatable — best for cursor-tracking spotlight borders):
```css
.card { position: relative; border-radius: 16px; }
.card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  padding: 1px; /* border thickness */
  background: linear-gradient(135deg, rgb(255 255 255 / 0.4), transparent 40%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

**D — stacked inset rings** (cheapest "machined edge": two 1px lines sell the light direction — Synais/Vorcel top-inner highlights):
```css
.bevel-edge { box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), inset 0 -1px 0 rgb(0 0 0 / 0.3); }
```

**Failure modes:** borders > 1.5px look cheap; forgetting `border-radius: inherit` on the pseudo-element; `border-image` silently dropping your radius.

---

## 10. Specular Highlights / Liquid Glass

**What:** Simulated refraction — bright edge streaks, saturation boost, optional real light-bending via SVG displacement.
**When:** Hero glass showpieces, premium CTA surfaces. One liquid element per viewport, max.

```css
.liquid { /* classic specular stack — cross-browser safe */
  position: relative;
  background: rgb(255 255 255 / 0.08);
  backdrop-filter: blur(16px) saturate(1.6);       /* saturate = Apple look */
  border: 1px solid rgb(255 255 255 / 0.15);
  border-radius: 16px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.25), 0 8px 32px rgb(0 0 0 / 0.2);
}
.liquid::after { /* specular streak, top-left — always pair with a faint opposite rim */
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: linear-gradient(115deg, rgb(255 255 255 / 0.18), transparent 30%);
  pointer-events: none;
}
```
Meska globe reference: specular streak white @70% fading over ~15% of diameter + fresnel rim light opposite edge. Light direction must match the page's established source.

**True refraction (SVG displacement):**
```html
<svg width="0" height="0"><filter id="lens">
  <feImage href="displacement-map.png" result="map"/>
  <feDisplacementMap in="SourceGraphic" in2="map" scale="40" xChannelSelector="R" yChannelSelector="G"/>
</filter></svg>
```
Displacement map: rounded-rect SDF, R/G channels = X/Y offset, B = specular mask; optional 3-pass RGB split for chromatic aberration. `backdrop-filter: url()` is Chromium-only.

**Production shortcut:** `@samasante/liquid-glass` (glass.samasante.com) — refracts the *live DOM* (text stays selectable), Chrome + Safari + Firefox, zero deps. Prefer over WebGL snapshot libs (frozen screenshots).

**Failure modes:** displacement scale > 60 destroys legibility; liquid effects on scrolling regions (perf); specular streak on the wrong side of the light source.

---

## 11. Blend Modes & Grain Overlays

**What:** `mix-blend-mode` compositing + SVG-noise overlays that kill banding and make gradients look expensive.
**When:** Over every large gradient/glow composition; duotone imagery; print-texture aesthetics.

Grain recipe + shipped asset (`assets/grain.svg`): **canonical in `gradients-and-easing.md` §6** — feTurbulence tile overlay, opacity 0.04–0.08 sweet spot (>0.1 reads dirty), `mix-blend-mode: overlay` (`soft-light` on very dark fields). Alternatively inline the noise tile as a data-URI SVG with `feTurbulence fractalNoise, baseFrequency 0.8, 2 octaves` when the asset file is not available.

| Mode | Use | Evidence |
|---|---|---|
| `overlay` | Grain on gradients | standard grain overlay |
| `multiply` | Halftone/dither on light paper | brutalist print texture |
| `screen` | Glow dots, duplicated blurred layers | Agex star dots (blur 4px + screen) |
| `soft-light` | Photo color-grading into palette | Synais photography color-cast on brand |

**Texture-as-gradient trend (stepped, not smooth):** pixel-mosaic, halftone-dot, and stipple textures replace smooth mesh gradients as brand-ownable signatures — canonical catalog + construction table: `image-asset-strategy.md` §6 (when to step instead of smooth: `gradients-and-easing.md` §8). Ship as generated static asset — zero runtime cost.

**Failure modes:** grain opacity > 0.1 reads dirty (canon: `gradients-and-easing.md` §6); blend modes breaking text contrast (grain layer stays `pointer-events: none` and under/above content at low opacity); JS-animated noise — use a static tile with `steps()` position shifts instead.

---

## Quick Decision Table

| Need | Recipe |
|---|---|
| Floating nav over hero | §1: blur 20 + saturate 1.6 + white/0.15 border + inner top line |
| Ambient color behind mockup | §2: blob blur 60–100px, transform-only motion |
| Card separation on dark UI | §3: fill 0.06 + border 0.15, no shadow |
| "Machined" nesting | §4 radius math + §9D inset 1px highlight |
| Premium primary button | §5 inner glow + §8 colored outer shadow + gradient fill |
| Dark hero focal point | §6: one glow, blur ≥ 100px, single hue |
| Input / recessed well | §7: Y2 blur4 α0.3 + darker fill |
| Floating card on light UI | §8: 2–3 layer tinted stack, hue matched to fill |
| Glass edge definition | §9B or §9C, 1px |
| Hero glass showpiece | §10 stack; `@samasante/liquid-glass` if true refraction |
| Banding / flat gradients | §11: grain 0.04–0.08 overlay (recipe: `gradients-and-easing.md` §6) |
