# Color Logic

> **Load when:** building a palette from zero, assigning semantic tokens, checking contrast, or fixing color slop (AI-purple, pastel defaults, washed-out).
> **Skip when:** only animation/motion work, or layout/structure decisions without color changes.
> **Canonical for:** the 16-slot semantic token contract §6, contrast mathematics §7, one-accent discipline §4.

OKLCH-first color engineering for premium UIs. Every value below is taken from or verified
against forensic autopsies of production designs (see `screenshot-autopsy.md` for method).

**Contents:** §1 Why OKLCH (and Its Syntax) · §2 Palette Construction from Zero · §3 The 60-30-10 Distribution · §4 One-Accent Discipline & Chroma Quarantine · §5 Dark/Light Resolution · §6 Semantic Tokens: Primitive → Semantic → Component (16-Var Contract) · §7 Contrast Mathematics (WCAG) · §8 Colored Shadows · §9 Two-Tone Fade Headlines · §10 Common Mistakes (AI-Purple, Pastel Default, Washed-Out) · §11 Reference Palettes (Hex + OKLCH)

---

## 1. Why OKLCH

Use OKLCH for every new palette. Three mechanical reasons:

- **Perceptual uniformity.** In HSL, `#F5820B` (orange) and `#2290FF` (blue) at equal "lightness"
  differ by ~20% in perceived brightness. In OKLCH, equal L = equal perceived lightness. Deriving
  tints/shades by shifting L keeps contrast predictable.
- **No dead gray middle.** sRGB interpolates complementary colors through desaturated mud. OKLCH
  keeps chroma through the ramp (see `gradients-and-easing.md` §2).
- **Contrast fixes become one-dimensional.** To hit a contrast target, move only L; hue and
  chroma stay untouched. Never fix contrast by desaturating.

Syntax:

```css
color: oklch(L C H);            /* L: 0–1 or 0%–100% · C: 0–~0.37 · H: 0–360deg */
color: oklch(72.2% 0.175 55.7); /* = #F5820B, the calendar-selected-day orange */
color: oklch(72.2% 0.175 55.7 / 0.35); /* alpha as 4th arg */
```

Support: Chrome 111+, Safari 16.2+, Firefox 113+. Ship hex fallback first, OKLCH after;
the cascade handles old browsers:

```css
.btn { background: #F5820B; background: oklch(72.2% 0.175 55.7); }
```

---

## 2. Palette construction from zero

Build in this exact order. Never pick colors one-off per component.

1. **Pick the neutral hue first.** Neutrals are never achromatic. Tint them toward the brand
   hue with C = 0.005–0.015 (barely visible, but it kills the "default gray" look).
   Proof: Stride off-white `#F4F5F7` (blue cast), Synais cream `#F4EDE0` (warm cast),
   fitness-app off-white `#F7F7F5`.
2. **Pick one accent** (see §4). Choose by brand meaning, not category reflex
   ("fintech = blue" is a training-data reflex). If the category implies a color, either commit
   harder (IQ Capital's money-green `#003828` + mint `#12F0B4`) or deliberately invert it
   (Finova mauve `#B885A4` for finance, thermondo red→purple `#F60439 → #B105F4` for heating).
3. **Derive the ink.** Body text is not black: off-black tinted to the neutral hue.
   Synais uses `#1E120E` (chocolate ink), priwatt `#132219` (green-black), Agex `#050A18` (navy).
   Off-black, never pure `#000` on light surfaces — unless the design is deliberately brutalist
   (Uber, Xuizver use pure black as a statement).
4. **Derive semantic colors from the palette, not from stock hues.** Success/warning/error must
   share the palette's chroma band. No stock `#22C55E` green dropped into a cream/brown system.
5. **Gamut-check.** Display-P3 chroma above ~0.25 clips in sRGB. Either accept the clamp or ship
   `oklch()` with the hex fallback (clamped) first.

---

## 3. The 60-30-10 distribution

Allocate surface area, not just slots:

| Share | Role | Evidence |
|---|---|---|
| ~60% | Neutral field (canvas, cards, text zones) | Stride: ~60% cream/white |
| ~30% | Ink mass (text, dark sections, frames) | Stride: ~30% navy + black |
| ~10% | Accent — actions, state, one glow source | Stride: ~10% warm photo tones + cyan links |

Variants observed in the wild:

| Design | Split | Note |
|---|---|---|
| Agex (dark AI SaaS) | 70 navy / 20 blue glow / 10 white | dark-mode inversion of 60-30-10 |
| Synais | 80 chocolate / 15 cream / 5 icon confetti | chroma quarantined in 96px tiles |
| Fitness app | 65 white / 25 navy / 10 blue+violet | accent = links + chart highlights |
| Xuizver | 65 white / 25 pixel-blue / 10 black | accent lives in a texture, not fills |

Enforce it by counting: after styling a section, estimate the accent's share of pixels.
Above ~15% the accent stops signaling.

---

## 4. One-accent discipline & chroma quarantine

**Rule: exactly one functional accent per page.** Every premium design in the research base
follows it; every generic one violates it.

Autopsy evidence:

| Design | Accent | Where it appears |
|---|---|---|
| Calendar card | `#F5820B` orange | selected day (state) + "+" FAB (action) — nothing else |
| thermondo | `#F60439` red | buttons, nav underline, promo bar; purple `#B105F4` exists ONLY as gradient tail |
| IQ Capital | `#12F0B4` mint | checkmarks, links, highlights on `#003828` green field |
| Miles | `#2290FF` blue | app-download button, link highlights; rest is black/white |
| Agentos | `#FF4C2C` vermilion | buttons, chips, map dots; cyan `#2FE1FF` allowed ONLY inside data-viz |

Notice the pattern: **accent = affordance.** It marks what is clickable, selected, or alive.
If an accent decorates (headline color, background wash, icon variety), it is wasted.

**Chroma quarantine:** when content needs many saturated colors (integration icons, app tiles),
cage the chroma inside small uniform containers on a desaturated field. Synais runs 16 fully
saturated app icons — pink, blue, orange, violet — but confines each to a 96px cream tile on an
80% chocolate page. It reads as vibrant precisely because everything else is monochrome.

**Multi-hue is only legal inside:**
- data visualization (categorical scales),
- images/photography,
- quarantined tiles,
- status semantics (§6).

---

## 5. Dark/light resolution

Decide mode from the usage scene (who, where, what ambient light), never from category
("developer tools = dark" is a reflex, not a reason).

- **Dark mode is composed, not inverted.** Reverse the lightness mapping explicitly:
  light `background L≈0.96 / ink L≈0.24` becomes dark `background L≈0.15–0.24 / ink L≈0.93`.
  Mid tones need re-picking, not mirroring.
- **Desaturate dark surfaces.** Dark-mode surfaces carry C ≤ 0.04; large dark areas with high
  chroma vibrate (pure `#0A2540` navy fields excepted — commit or don't).
- **Accents get lighter and less chromatic in dark mode** to hold contrast:
  `#F5820B` (L 0.72) on white → `oklch(0.78 0.15 55)` on near-black.
- **Reference values from autopsies:** Agex dark navy `#050A18` field + `#9FB0D6` secondary text
  (≈60% white on navy); Agentos `#0A0A08` warm black; Synais dark `#26140F` chocolate with
  `#C9B6A6` body text.
- **Test contrast in both modes independently** (§7). A pair passing at 4.5:1 in light mode
  often fails in dark because the accent was lightened on the fly.
- **One theme per page.** No inverted middle sections unless the section change is the concept
  (Meska: light lime hero → dark forest proof section is a deliberate narrative flip, with the
  palette inverted *systematically*: headline `#0E3B1E` ↔ `#D8F0A0`).

---

## 6. Semantic tokens: the 16-variable contract

Three layers. Components reference only the bottom layer.

```
primitive:  --green-900: #0E3B1E;  --lime-200: #D8F0A0;
semantic:   --action-primary: var(--green-900);
component:  --btn-bg: var(--action-primary);
```

Ship exactly these 16 semantic slots (shadcn/Tailwind-v4 compatible):

| Token | Role |
|---|---|
| `background`, `foreground` | page canvas + default ink |
| `card`, `card-foreground` | elevated surfaces |
| `primary`, `primary-foreground` | the ONE accent action + text on it |
| `secondary`, `secondary-foreground` | tonal (not outlined) secondaries |
| `muted`, `muted-foreground` | subtle surfaces + secondary text |
| `accent`, `accent-foreground` | hover/selection tints of primary |
| `destructive`, `destructive-foreground` | errors, destructive actions |
| `border`, `ring` | hairlines + focus ring |

Rules:

- **Never raw hex in components.** If a hex appears outside the token file, it is a bug.
- `muted-foreground` on light tinted canvases must be tinted from the surface hue, not generic
  gray: on `#E4F7B2` lime use `#3E5C48`, on `#F4EDE0` cream use `#6E5A50`.
- `secondary` is a tonal fill ~8–12% lightness step from background (Meska `#F2FBC9` on lime,
  Finova beige `#E2DED2` on cream) — not an outline. Outline-secondaries are 2020.
- Dark mode: redeclare all 16 under `.dark` / `@media (prefers-color-scheme: dark)`; never
  override per-component.

---

## 7. Contrast mathematics (WCAG)

Formula: `CR = (L1 + 0.05) / (L2 + 0.05)` with relative luminance per WCAG 2.x.
Thresholds (verify computed values, all states, both themes):

| Element | Minimum | Target |
|---|---|---|
| Body text | 4.5:1 (AA) | 7:1 (AAA) |
| Large text (≥18px, or ≥14px bold) | 3:1 | 4.5:1 |
| UI controls, icons, focus ring, borders that carry meaning | 3:1 | 3:1 |
| Placeholder text | 4.5:1 | — |
| Decorative | none | — |

Measured examples from the autopsies — learn the failure shapes:

| Pair | Ratio | Verdict |
|---|---|---|
| White on `#050A18` navy (Agex) | ≈15:1 | AAA |
| `#0E3B1E` on `#E4F7B2` lime (Meska) | ≈9.5:1 | AAA |
| `#F5820B` orange on white (calendar) | ≈3.2:1 | large text only — hence white text on orange at 17px bold |
| `#9A8578` taupe on `#2E1A16` chocolate (Synais) | ≈4.0:1 | passes only as display type; calculated risk |
| Cream `#F1E7D6` on gold silk highlights (Synais) | ≈2.1:1 | FAILS — rescued by dark vignette zones under text (≈4.5:1) |

Two operational rules:

- **Washed-out secondary text is the #1 contrast failure** (`#9AA` grays on near-white). Push
  body text toward ink before shrinking contrast: `#5F6166` on white (7:1), not `#A3A5A9` (2.6:1).
- **Text over busy imagery needs a scrim.** Synais darkens a radial vignette
  `rgba(38,20,15,0.35)` behind cream type on the gold silk; photo heroes use
  `linear-gradient(0deg, rgba(0,0,0,0.5), transparent)` bottom scrims. Never trust the photo.

---

## 8. Colored shadows

Shadows tinted to the element's fill are the quiet premium differentiator — they read as
"light bouncing off the colored object" instead of "dirty gray drop".

Recipe: shadow color = fill color, alpha 0.25–0.45, small offset, soft blur.

| Evidence | Shadow spec |
|---|---|
| Calendar orange pill | `0 6px 16px rgba(245,130,11,0.35)` |
| Calendar "+" FAB | `0 6px 16px rgba(245,130,11,0.4)` |
| Fitness phone mockup | `0 40px 100px rgba(27,58,140,0.18)` (navy-tinted) |
| Agentos red buttons | `0 4px 16px rgba(233,69,41,0.3)` |
| Synais hand photo | `0 24px 64px rgba(30,18,14,0.25)` (chocolate) |
| Editorial nature sheet | `0 32px 80px rgba(60,70,60,0.14)` (sage-tinted to match artwork) |

```css
.card { box-shadow:
  0 24px 64px oklch(72% 0.17 56 / 0.10),   /* ambient, tinted */
  0 4px 12px oklch(72% 0.17 56 / 0.06);    /* contact, tighter */
}
```

Rules: two-layer stack (ambient + contact) always beats one shadow. Tint toward the surface
hue on neutral elements, toward the fill hue on accent elements. Pure `rgba(0,0,0,…)` shadows
on colored elements look muddy.

---

## 9. Two-tone fade headlines

The defining 2024–26 headline device (6 of 9 batch-1 autopsies): split the headline across
lines and fade the runner line to a low-contrast tone of the ink.

| Design | Active line | Faded line |
|---|---|---|
| Agex | `#FFFFFF` | `#8E9BBE` |
| Data-to-revenue | `#17181A` | `#A3A5A9` |
| Synais dark | `#F1E7D6` | `#9A8578` |
| Synais light | `#1E120E` | `#9C8B7C` |
| seo-labs FAQ | near-black | `#6D70B8` (brand accent as line 2) |

Rules:

- The faded tone is the ink hue at ~55–65% lightness, chroma pulled to ≤0.05 — not a different hue.
- Contrast floor for the faded line: ≥3:1 (display sizes only). Synais runs `#9A8578` at 4.0:1 —
  acceptable at 56px+, never at body size.
- Fade exactly one line or one phrase; fading more reads as a rendering bug.
- Advanced variant (Synais About): a vertical gradient masked to text via
  `background-clip: text`, cream `#E8DFC9` → taupe `#8A7566` line by line. Use once per page.
- Never rainbow gradient-text. The fade is luminance-only within one hue.

---

## 10. Common mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| **AI-purple default** | `#6366F1 → #A855F7` diagonal, indigo glow shadows, violet CTAs | Pick a hue with brand meaning; if purple is the brand, dampen chroma ≤0.15 and commit |
| **Pastel default** | everything in soft mint/blush/lavender at C≈0.05 | Pastels only as *field* colors with a dark ink at ≥7:1 (Finova works because ink is `#000` serif at 88px) |
| **Washed-out** | body text `#9CA3AF` on `#F9FAFB`, borders invisible | Push text to ink (`#1F2937`-class), borders to ≥12% contrast step |
| **Stock semantics** | Tailwind green/red/amber dropped into a custom palette | Derive status hues from the palette's own chroma band |
| **Gray-on-tint** | neutral gray text on colored sections | Tint secondary text from the section hue (§6) |
| **Multi-accent drift** | 3+ saturated hues across sections | One accent; quarantine the rest (§4) |
| **Pure #000/#FFF everywhere** | harsh, template-like | Off-black ink + tinted off-white canvas (§2) |

---

## 11. Reference palettes (from production autopsies)

Use as construction examples, not as defaults to copy blindly.

### Duotone green fintech (Meska)

| Role | Hex | OKLCH |
|---|---|---|
| Field (60%) | `#E4F7B2` lime | `oklch(92% 0.14 122)` |
| Ink/mass (30%) | `#0E3B1E` forest | `oklch(31% 0.07 152)` |
| Highlight (10%) | `#D8F0A0` light lime | `oklch(92% 0.11 122)` |

### Warm editorial (Synais)

| Role | Hex | OKLCH |
|---|---|---|
| Field | `#F4EDE0` cream | `oklch(95% 0.02 83)` |
| Ink | `#2E1A16` chocolate | `oklch(24% 0.03 32)` |
| Faded text | `#9A8578` taupe | `oklch(63% 0.03 54)` |

### Dark AI SaaS (Agex)

| Role | Hex | OKLCH |
|---|---|---|
| Field | `#050A18` navy-black | `oklch(15% 0.03 265)` |
| Accent | `#2E7FFF` electric blue | `oklch(62% 0.21 260)` |
| Secondary text | `#9FB0D6` | `oklch(76% 0.05 263)` |

### Monochrome + one accent (IQ Capital / Miles)

| Role | Hex | OKLCH |
|---|---|---|
| Field (IQ) | `#003828` deep green | `oklch(30% 0.06 167)` |
| Accent (IQ) | `#12F0B4` mint | `oklch(85% 0.17 167)` — same hue family as field, luminous L |
| Canvas (Miles) | `#FFFFFF` | — |
| Accent (Miles) | `#2290FF` blue | `oklch(65% 0.19 254)` — hue unrelated to canvas; rarity does the work |

Note the two legal accent strategies: **monochromatic-luminous** (IQ: accent = same hue,
+55 L steps) or **isolated-complementary** (Miles: accent hue appears nowhere else).
