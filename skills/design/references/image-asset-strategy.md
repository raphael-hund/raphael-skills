# Image Asset Strategy — When to Create What

> **Load when:** a design needs imagery — hero renders, product shots, device mockups, textures, photos, or generated media.
> **Skip when:** text-only build or imagery already decided; effect parameters → `figma-effects-cookbook.md`, gradient/photo-blend physics → `gradients-and-easing.md` §7.
> **Canonical for:** the asset-type decision table §1, textures as style §6.

> Load this file whenever a design needs imagery: hero visuals, product shots, mockups,
> textures, photos, or generated media. It answers: **which asset type, in which section,
> generated how.** For color-grading rules see `color-logic.md`; for frame/mask effect
> parameters see `figma-effects-cookbook.md`.

## TOC

1. [The Decision Table — Asset Type per Situation](#1-the-decision-table)
2. [Hero-Render Discipline — One Asset per Section](#2-hero-render-discipline)
3. [Masks & Frames — Turning Images into Graphic Devices](#3-masks--frames)
4. [Device Frames — Browser, iPhone, Device Matte](#4-device-frames)
5. [Exploded-UI Compositions](#5-exploded-ui-compositions)
6. [Textures as Style — Halftone, Dither, Stipple, Pixel](#6-textures-as-style)
7. [Image-as-Gradient & Ambient Backdrops](#7-image-as-gradient--ambient-backdrops)
8. [Asset Slots in Layouts — Mark, Never Fake](#8-asset-slots-in-layouts)
9. [Generation Recipes — image_generation Plugin](#9-generation-recipes)
10. [Never List — Fakes & Stock Traps](#10-never-list)
11. [Pre-Flight Checklist](#11-pre-flight-checklist)

---

## 1. The Decision Table

Pick the asset type by **what the section must prove**. One primary type per section.

| Asset type | Use it when… | Best sections | Product fit | Vibe it creates | Cost/effort |
|---|---|---|---|---|---|
| **Real photography** | Trust in people is the product: founders, teams, technicians, customers, real estates, clinics | About, team, testimonials, case studies, local services | Local business, agency, health, real estate, D2C lifestyle | Authenticity, warmth, credibility | High (shoot) — or curated stock with strict filters |
| **3D render / CGI** | The product is abstract (money movement, security, infrastructure) or hardware that must look flawless | Hero, features, product showcase | Fintech, AI, dev tools, hardware, energy tech | Premium, "brand campaign", ownable | High — generate via plugin or build simple scenes |
| **UI mockup / product screenshot** | The product IS the argument; density and specificity sell | Hero proof, features, pricing context | SaaS, dashboards, dev tools, apps | Competence, transparency, "show don't tell" | Medium — build in code, then screenshot |
| **Illustration (flat/isometric)** | No real product surface exists yet, or the concept needs metaphor | How-it-works, empty states, features, onboarding | Consumer apps, education, playful brands | Friendly, explanatory, brand-ownable | Medium — keep one consistent style |
| **Texture (halftone/dither/stipple/pixel/noise)** | The design needs an ownable signature without imagery weight | Backgrounds, section dividers, hero fields | Any — strongest for editorial, dev, security | Craft, retro-tech, tactility | Low — generate procedurally or via plugin |
| **Video / motion asset** | Emotion + scale in the first viewport; product demos; founder presence | Hero background, testimonials, product tour | Consumer brands, lifestyle, mobility | Cinematic, alive | Very high — only when explicitly briefed |

**Secondary decision axes:**

| Criterion | Rule |
|---|---|
| Product has a real UI | Lead with UI mockup, never describe features with clipart |
| Product is physical hardware | 3D render or studio photo; never flat illustration of hardware |
| Product is a service done by humans | Real photography of those humans (founders > models) |
| Budget/time low | Texture + typography + one UI mockup beats cheap 3D or bad stock |
| Dark/cinematic vibe | 3D render, glass, ambient blur — no daylight photography |
| Editorial/warm vibe | Photography + halftone textures — no glossy 3D |

**Observed archetypes (from 21 autopsied sites):** dark AI SaaS = glow + dashboard mockup;
duotone fintech = color-graded 3D object (globe, silk, pebble device); athletic/consumer =
photo-as-gradient + phone mockup; local service/conversion = founder photo + real work photos;
security/dev = texture + diagrammatic UI, zero humans.

---

## 2. Hero-Render Discipline

- **Exactly ONE hero asset per section.** A globe OR a device photo OR a mockup — never a collage of all three in one section. The supporting cast (logos, avatars, icons) orbits it.
- The hero asset sets the section's **light direction, color grade, and scale**. Every other element must match its lighting and palette.
- Color-grade 3D assets into the brand palette (green globe, gold silk) — never paste a neutral render onto a colored page.
- Let the hero asset **break a boundary** (overflow a frame, crop at viewport edge, overlap two zones) — containment looks timid.
- One full-bleed emotional photo is a valid hero asset; reserve it for the emotional payoff section, not every section.

---

## 3. Masks & Frames

Masks turn generic imagery into brand devices. Apply one mask language per site and repeat it.

| Mask | Implementation | Effect | Use for |
|---|---|---|---|
| **Arch** (semicircle top, straight sides) | `border-radius: 50% 50% 0 0 / 35% 35% 0 0` or SVG clip | Editorial trophy frame, calm, architectural | Portraits, hero photos, wellness/health brands |
| **Circle** | `border-radius: 50%`, inscribed in container | Monumental, sun/medal/porthole metaphor | Hero photo inside a black media container |
| **Blob / organic** | `border-radius: 40% 60% 55% 45% / 50% 45% 60% 50%` (vary per asset) | Soft, playful, approachable | Consumer apps, kids, wellness — use sparingly |
| **Rounded sheet / page card** | Whole page floats as a card (r 24–36 px) over blurred ambient backdrop | "Gallery mat" presentation, premium | Entire hero or entire page (Finova, Meska frame) |
| **Cutout PNG** (feathered edge) | Transparent PNG + drop shadow `0 24px 64px rgba(ink,0.25)` | Object rises out of the layout | Hand-held devices, product objects over schematic layers |
| **Bleed crop** | Image cropped by viewport or container edge | Confidence, scale | Mega photos, giant wordmarks |

**Rules:**
- One mask shape = one meaning. Arch = portraits, circle = hero moments, rounded rect = content. Do not mix arch and blob on one page.
- Organic radii: vary the 8 values, keep them between 40–60 %; extreme blobs read as 2018.
- Frame the mask with a contrasting container (black container → circular photo) so negative space does half the work.

---

## 4. Device Frames

| Frame | When | Parameters (starting points) |
|---|---|---|
| **Browser chrome** (Safari-style) | Presenting a web product in portfolio/pitch context | Bar ~44 px, traffic lights `#ED6557/#FDC348/#57D043`, chrome dark `#0B0F12` or light `#F5F5F5`, outer radius 12–14 px, shadow `0 30px 80px rgba(0,0,0,0.4)` |
| **iPhone / phone mockup** | App products; the app is the proof | Bezel 8–10 px black + 2 px metal edge, screen radius ≈ outer − 10, Dynamic Island cutout, colored shadow tinted to palette (e.g. navy shadow for navy system) |
| **"Device matte"** (black bezel, abstract) | Framing UI fragments as exhibited artifacts — not a real device | Solid black frame 8–16 px around a UI inset, outer radius ~20 px, inner radius ~14 px; consistent across all mockups on the page |
| **Floating UI panel** (no frame) | Dashboard proof inside a hero glow | Radius 16–24 px, 1 px border `rgba(accent,0.2)`, shadow stack `0 40px 120px rgba(0,0,0,0.6)` + ambient glow matching hero light |

**Rules:**
- Pick ONE frame family per page and reuse it for every product visual.
- Frame chrome must match the site's radius dialect (marketing chrome sharp 6–12 px vs. product surfaces soft 16–32 px — do not mix dialects inside one frame).
- Screens inside frames must be real or code-built UI. See [§10](#10-never-list).
- Elevate the central device above its orbiting elements (translate −40 px, overlap neighbors) — hierarchy through position, not drop-shadow inflation.

---

## 5. Exploded-UI Compositions

The app's best modules orbit the main mockup as evidence fragments (fitness-app archetype: phone center, 4 stat/chart cards floating around).

**Recipe:**
1. Choose the centerpiece (phone mockup, browser frame, or hero panel).
2. Extract 3–5 genuinely useful UI modules (stat card, chart, streak grid, mini-map) — each must show a real product capability.
3. Place them on one baseline, centerpiece elevated ~40 px and overlapping its neighbors slightly.
4. Give every fragment the same radius/shadow system and one identical micro-CTA or label style.
5. Keep fragments legible at rest — no tilt beyond ±8°, no stacking deeper than 2 layers.

Variants: **UI collage on texture field** (editor + chat bar + phone on stipple noise), **floating capsules** (icon pods scattered on an invisible ellipse around a card stack), **card cascade** (3 offset layers, scale 0.94/0.97).

---

## 6. Textures as Style

Stepped/dot textures replace smooth mesh gradients when the brand needs an ownable signature. See `gradients-and-easing.md` §8 for the stepped-vs-smooth decision rules; grain overlay code in §6 there.

| Texture | Construction | Signal | Observed in |
|---|---|---|---|
| **Halftone dots** | Dot size/density modulated across a shape (wave, portrait) — constant hue, dot *density* fakes the gradient | Print craft, editorial | Botanical halftone artwork, Dataguard dot-matrix wave (`#1F64C9`) |
| **Stipple / dither field** | Monochrome dot density forming organic contours | Code/ink, security, precision | Vorcel topographic noise band |
| **Pixel mosaic** | Hard-stepped blocks (~60–80 px) forming a gradient — zero smoothing | Retro 8-bit, ownable frame | Xuizver pixel-gradient page frame (`#4980F7` edges → white center) |
| **Pixel grass / 8-bit scenes** | Blocky sprite strip | Playful wink, footer finales | Agentos footer strip |
| **Dot-matrix data** | Dot grid where density+hue encode data (world map, heatmap) | Data-as-illustration | Agentos map, GitHub-style heatmaps |
| **Grain overlay** | feTurbulence noise tile over gradients, opacity 0.04–0.08 (recipe: `gradients-and-easing.md` §6) | Kills banding, adds film feel | Universal finishing layer |

**Rules:** one texture system per brand; texture IS the illustration (do not add images on top of a busy dither field); keep dots/blocks aligned to the layout grid.

---

## 7. Image-as-Gradient & Ambient Backdrops

Replace CSS color-stop gradients with photography:

- **Photo-as-gradient hero:** a sky/mountain photo supplies color, gradient, and emotion at once; UI floats on it (stride/archetype: azure sky → pale horizon = the mesh gradient).
- **Ambient blur backdrop:** heavily blurred enlargement of brand imagery (blur 80–120 px) behind a page card or browser frame — Apple-keynote staging. The blur must echo the palette (red brand → red blur field).
- **Scrim gradients:** vertical white/black → transparent fade over artwork so type zones stay clean (fade height ≈ 30 % of image, feather ≥ 40 px).
- **Image fades into page:** photos dissolve into the background color at edges (statue into white, silk vignettes) instead of hard rectangles.
- Contrast duty: if the photo supplies the page's only warm/chromatic tones, keep all UI chrome cool/neutral — and vice versa.

---

## 8. Asset Slots in Layouts

When a real asset does not exist yet, mark the slot — never fill it with a fake.

**Slot annotation format (use in code comments and handoff):**

```html
<!-- ASSET-SLOT: hero-3d-object | type: 3d-render | ratio: 4:5 | min: 1600x2000
     | bg: transparent | grade: duotone(#0E3B1E, #D8F0A0) | light: upper-left -->
<div class="hero-visual" data-asset-slot="hero-3d-object">…</div>
```

**Slot spec fields:** `id`, `type` (photo / 3d-render / ui-mockup / illustration / texture / video), `ratio`, `min size`, `background` (transparent vs. baked), `color grade`, `light direction`, `fallback` (what renders if missing: flat color field or texture — never a grey-box "image here").

**Slot rules:**
- Layout must survive an empty slot gracefully (aspect-ratio box + palette-matched fallback).
- One slot per section follows the hero-render discipline (§2).
- Deliver the generation prompt (§9) alongside the slot so the asset can be produced without re-deriving intent.

---

## 9. Generation Recipes

Use the `image_generation` plugin for placeholder-final assets: 3D objects, textures, atmospheric photos, illustration. **Never generate UI screenshots with fake data** — build real UI in code and screenshot it (see §10).

**Universal prompt skeleton:**
`[subject] + [style anchor] + [palette/grade] + [lighting] + [composition/crop] + [background: transparent | scene] + [aspect/size]`

| Asset type | Prompt recipe | Ratio / size | Background |
|---|---|---|---|
| **3D hero object** (globe, cube, card stack, pebble device) | "3D render, Cinema4D/Blender style, frosted glass [object], [brand color] material accents, soft studio lighting from upper-left, subtle fresnel rim light, minimal, premium, isolated object" | 1:1 or 4:5, ≥1600 px | **Transparent** when it must float over layouts; baked scene when it fills a container |
| **Silk/liquid/cloth render** | "flowing liquid silk cloth simulation, metallic [gold] tones, iridescent dispersion fringes at fold highlights, dark [chocolate] depths, cinematic lighting, full-frame abstract texture" | 16:9 or 21:9, ≥2400 px wide | Baked (fills container) |
| **Texture field** (halftone/stipple/dither) | "black stipple dot pattern forming flowing topographic contours on white, pointillist, varying dot density, high contrast, seamless tile" — for pixel: "large pixel mosaic gradient, hard stepped blocks, [color] to white, no smoothing" | 1:1 tile ≥1024 px, or 16:9 field | Baked; verify tileability for repeats |
| **Photo-as-gradient** | "vast mountain sky at dusk, [azure] fading to pale [ice blue], minimal landscape silhouette at bottom, cinematic, smooth tonal falloff, copy space" | 16:9 or 3:2, ≥2400 px | Baked |
| **Ambient blur backdrop** | Generate the brand scene, then blur in code (`filter: blur(80px)`) — do not prompt for blur | Match frame ratio | Baked |
| **Human/founder photo** | Only for generic mood shots: "documentary photo of [subject], natural light, muted [palette] tones, shallow depth of field" — never for named team members (use real photos) | 4:5 portrait or 3:2 | Baked |
| **Flat/isometric illustration** | "isometric illustration of [system], flat vector style, [3–4 palette colors], clean geometry, no gradients except subtle shading, white background" | 4:3 or 1:1 | Transparent preferred |
| **UI screenshot style** (ONLY as abstract backdrop, never as product proof) | "minimal UI screenshot style, abstract dashboard wireframe, monochrome [palette], no readable text, soft shadows" | 16:10 | Transparent or baked |

**Generation rules:**
- State the **aspect ratio explicitly** in the prompt and match the slot's `ratio`.
- Use **transparent backgrounds** for: floating 3D objects, cutout devices, illustrations that sit on colored sections. Use **baked backgrounds** for: textures, full-bleed photos, silk/cloth fields.
- Request palette by hex names ("deep forest green #0E3B1E and light lime #D8F0A0") so the render is born color-graded.
- Generate 2–3 variants, pick on: palette match, edge cleanliness, light direction matching the section.
- Post-process in code when cheaper than re-prompting: duotone via CSS filters, blur via `filter`, grain via `assets/grain.svg`.
- Respect the one-hero-asset rule: generating five images does not mean placing five images.

---

## 10. Never List

**Fakes (hard bans):**
- Never fake product screenshots with invented UI — build the real component in code, screenshot it, embed it. If no product exists, show an honest wireframe-styled mockup labeled as concept.
- Never invent numbers inside visuals (fake "$45,281.09 balances", fake "124K records", fake dashboards) — any data shown must be the client's real data or clearly illustrative sample data agreed with the client.
- Never fake testimonials, review counts, star ratings, client logos, press logos, or "trusted by" strips.
- Never generate a "realistic screenshot of [famous product]" to imply integration or endorsement.
- Never ship stock-photo team members, fake office photos, or model "customers" for a real business — local trust dies here.

**Stock-photo traps (when stock is unavoidable):**
- Ban: handshake clip-art, smiling-at-laptop whiteboard rooms, generic "diverse team high-five", headset call-center women, blue-suit skyscraper reflections, 3D clipart people, meaningless sparkles/robots for AI products.
- Filters before accepting any stock: natural light, muted grade matching the palette, no direct camera gaze (unless portrait), no visible watermark-composition (centered subject + bokeh), plausible context for the client's industry and region.
- Prefer: real client photos (even imperfect), documentary detail shots, architecture/texture close-ups, or switch the asset type to texture/3D entirely.

---

## 11. Pre-Flight Checklist

1. Every section has **exactly one** hero asset; supporting assets orbit it.
2. Every image is **color-graded** into the palette; lighting direction is consistent.
3. One **mask language** and one **device-frame family** per page.
4. Every generated asset has its **slot spec** (type/ratio/grade/light) recorded.
5. Zero fake screenshots, zero fake numbers, zero fake logos/testimonials.
6. Textures are procedural or tileable; grain overlay applied over large gradients.
7. Empty slots degrade to palette fallbacks, not broken rectangles.
8. Photo-heavy sections balance with texture/UI sections — no three photo sections in a row unless documentary is the concept.
