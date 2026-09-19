# Layout & Sections — Grid, Spacing, Dramaturgy, Composition

> **Load when:** structuring a page — grid, spacing scale, section order/dramaturgy, hero architecture, composition tricks.
> **Skip when:** only restyling an existing structure, or component-internal details (→ `component-taxonomy.md` §9, `buttons.md`); conversion copy depth is out of scope here.
> **Canonical for:** the section skeleton §3, the hero formula §4, grid & spacing scales §1–§2.

Structure pages with a grid, a spacing scale, and a proven section sequence. This
reference covers page skeletons and section composition; conversion copy and funnel
mechanics in depth are out of scope here (§7 covers the essentials).

**Contents:** §1 Grid Systems (Containers, Bleed, Breakpoints) · §2 Spacing Systems (4/8pt Scale, Section Padding, Density Dial) · §3 Section Dramaturgy (the Proven Skeleton, Dark-Section Rhythm) · §4 Hero Architectures (6 Archetypes + the Hero Formula) · §5 Section Archetypes (Feature Grid, Zigzag, Stats, Logos, Pricing, Calculators) · §6 Composition Tricks (Vignette Zones, Edge Bars, Masks, Mega-Type, Ghost Layers) · §7 Funnel Basics (One Funnel, Staged Trust, Measurement)

---

## 1. Grid Systems

**Default: 12-column grid inside a centered container.** Every production leader
(Uber, Miles, Tend, seo-labs) uses it; asymmetric layouts sit on top of it.

**Container widths:**
- Marketing/content: `max-w` 1200–1280px (`max-w-7xl mx-auto` is the default).
- Premium/editorial: down to 960–1100px for text-heavy sections (Oura, WCE).
- Wide/energetic: up to 1400–1440px for dashboard-style pages (Miles ~1400px).
- Text measure: body copy always capped at 60–75ch regardless of container width.
- Side padding: 16px mobile, 24–32px desktop. Never let text touch the viewport edge.

**Three bleed modes — pick per section, mix deliberately:**

```
CONTAINED (text, forms, pricing)     FULL-BLEED (hero photo, dark proof)
┌──────────────────────────────┐     ┌──────────────────────────────┐
│                              │     │██████████████████████████████│
│    ┌──────────────────┐      │     │██████████████████████████████│
│    │   1200px grid    │      │     │████████ content ████████████│
│    └──────────────────┘      │     │██████████████████████████████│
│                              │     └──────────────────────────────┘
└──────────────────────────────┘      asset spans 100vw

HYBRID / EDGE-BARS (framed page: Stride navy bars, blueprint margins)
│▓│  ┌──────────────────┐  │▓│     content contained, but a colored
│▓│  │                  │  │▓│     band (16–24px) runs full height at
│▓│  └──────────────────┘  │▓│     both viewport edges
```

Rule: **content bleeds, controls float** — media may reach the viewport edge, text
and interactive elements stay inside margins + safe areas.

**Breakpoint behavior (structural, not just scaling):**
- < 768px: collapse everything to one column; asymmetric splits stack strictly.
- Reorder, collapse, reflow — never just shrink a desktop layout.
- Grid + `gap`, not flex percent math. Touch targets ≥ 44px. No horizontal scroll.
- `min-h-[100dvh]`, DOM order = visual order.

---

## 2. Spacing Systems

**Base scale: 4/8pt.** Allowed values: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Never invent intermediates; two sizes within 1–2px of each other merge into one.

**2× rule:** gap between groups ≥ 2× gap inside groups. One spacing value
everywhere makes proximity informationless.

**Tool order when separating content:** 1. negative space → 2. background surface
→ 3. hairline divider (last resort only).

**Section vertical padding (py) — the rhythm backbone:**

| Density | Section py | Use for |
|---|---|---|
| compact | py-12–16 (48–64px) | e-commerce catalogs, dense dashboards, Sunday-style shops |
| regular | py-16–24 (64–96px) | default marketing rhythm (Tend ~80px, Uber 96–128px) |
| spacious | py-24–40 (96–160px) | premium/editorial (seo-labs 120–160px, Synais 120–160px) |

- Pick ONE density dial per page and commit. Do not mix compact and spacious on
  the same page.
- More space above a heading than below it.
- Section transition breathing room: ~90–120px of pure background between major
  sections reads as a "page turn" (Synais) — do not fill it.
- Vertical rhythm inside hero: badge→H1 ~32px, H1→sub ~24px, sub→CTA ~40px,
  CTA→hero asset 80–120px.

---

## 3. Section Dramaturgy

**The proven skeleton** (confirmed across 21 analyzed production sites — canonical; other
references point here):

```
1. Nav          one row, ≤80px tall, primary CTA right, sticky or floating pill
2. Hero         benefit H1 + sub + 1 primary CTA + 1 trust signal, first viewport
3. Social proof logo wall / stars / press strip — immediately after hero, never
                only before the footer
4. Features     value props or 3-step "how it works" (Get analysis → Open box → Use)
5. Dark proof   case studies, stats, testimonials on inverted background
6. Calculator/  embedded multi-step funnel — mid-page, after value + trust,
   funnel       never first, never last
7. Process      "In X steps to your goal" — de-complexifies expensive offers;
                step 1 = funnel entry
8. Testimonials mass (counters "140,000 customers") + voices (full-text reviews,
                real names) + local/concrete (places, projects)
9. Pricing      tiers with one elevated recommended plan (if applicable)
10. FAQ         accordion, 3–7 objection-killing questions + mini-CTA
11. Final CTA   big type, one button, one action
12. Footer      mega-footer: grouped link columns, awards, legal, contact
```

**Variants:**
- SaaS/product-led: Hero → logos → product mockup sections → integrations →
  pricing → FAQ → CTA → footer (Synais).
- Trades/energy (Enpal, EKD, thermondo): Hero with CGI/photo → product card row →
  calculator embed → USP grid → reviews → FAQ → CTA → awards in footer.
- Local/regional (haubner, schmidt): real people in hero, phone number in header,
  trust density high (ratings, partnerships), same skeleton underneath.
- Editorial/manifesto (WCE): full-screen video hero → manifesto reveal → proof
  grid → curriculum → FAQ. Drop logos/pricing when the brand sells mystery.

**Dark-section alternation as rhythm instrument:**
- Dark sections mark PROOF (case studies at seo-labs, problem framing at
  Trademania, press at Oura, community at peter.at); light sections carry
  narrative. Alternate canvas instead of drawing dividers (Oura: cream → near-black).
- Discipline: max 1–2 dark sections per page, each earns its inversion with proof
  content; keep the same accent + type system inside; tint secondary text from
  the section hue, never generic gray.
- Transitions: plain background switch or a rounded-top container (Enpal footer
  radius ~32px) — no gradient fades between sections.

**Layout-family discipline:** each layout family max 1× per page; 8 sections need
≥ 4 different families. Zigzag (image+text alternating) max 2× in a row — the
third section must break the pattern.

---

## 4. Hero Architectures

**The hero formula (hard):** benefit-driven H1 (≤ 2 lines, states the outcome, not
the product) + sub (≤ 20 words) + exactly 1 primary CTA in the accent color +
1 trust signal (stars, seal, customer count, avatar stack) — all inside the first
viewport. Max 4 text elements. Banned in hero: logo walls, pricing teasers,
feature bullets, taglines under CTAs. Max 1 ghost/outline secondary CTA.

**Archetype 1 — Centered Stack** (Agex, Trademania, Oura, Bond Vet)
```
┌────────────────────────────────────┐
│        [badge / eyebrow]           │
│      BENEFIT HEADLINE H1           │
│        subline ≤ 20 words          │
│         [ PRIMARY CTA ]            │
│   ┌──────────────────────────┐     │
│   │   product mockup / photo │     │
│   └──────────────────────────┘     │
│   ○ logo  ○ logo  ○ logo  ○ logo   │
└────────────────────────────────────┘
```
Use when: one strong product visual exists and copy is short. Symmetry = calm.
Text column ~700–760px, mockup overlaps into next section or a glow field.

**Archetype 2 — Split (text left / asset right)** (Uber, Bond Vet, haubner, Sunday)
```
┌────────────────────────────────────┐
│  H1 headline          ┌──────────┐ │
│  subline              │          │ │
│  [CTA]  [ghost]       │  photo / │ │
│  ★★★★★ 4.9 · 703      │  form /  │ │
│                       │  render  │ │
│  optional: form card  └──────────┘ │
└────────────────────────────────────┘
```
Use when: the asset is photographic or a working widget (booking form, zip-code
capture). Split ~48/52; German conversion sites put the lead form card on the
right column (haubner). Never put a generic stock photo here.

**Archetype 3 — Floating Mockup Under Fold** (Finova, Trademania, Xuizver)
```
┌────────────────────────────────────┐
│      H1 + sub + CTA (centered)     │
│ ┌────────────────────────────────┐ │
│ │                                │ │
│ │   DASHBOARD SCREENSHOT on a    │ │   mockup floats on a
│ │   colored/textured stage       │ │   stage panel; bottom
│ │                                │ │   is cropped by fold →
│ └────────────────────────────────┘ │   scroll pull
├────────────────────────────────────┤
```
Use when: the product UI is the proof. Stage the shot on a tinted/blurred panel,
never raw on the page background. The fold must cut the mockup — the crop is the
scroll cue.

**Archetype 4 — Full-Bleed Photo with Scrim** (Stride, peter.at, EKD, qu)
```
┌────────────────────────────────────┐
│████████████████████████████████████│
│██ H1 (white)          █████████████│  photo supplies color,
│██ sub                 █████████████│  gradient and emotion;
│██ [CTA]               █████████████│  scrim = dark gradient
│████████████████████████████████████│  only where text sits
└────────────────────────────────────┘
```
Use when: brand is emotional/lifestyle with strong photography or CGI (Enpal,
peter.at). Text left-aligned in a vignette zone (see §6). Overlay only behind
copy, ~40–60% black fading to 0.

**Archetype 5 — Editorial Offset** (Meska, WCE, Agentos)
```
┌────────────────────────────────────┐
│  H1 spanning ~8 cols, left         │
│  (mega-size, tight tracking)       │
│                                    │
│            sub copy block, right   │
│            [CTA]                   │
│   big asset breaking the grid ─────┼──→ overflows frame edge
└────────────────────────────────────┘
```
Use when: VARIANCE is high, brand is confident/editorial. Left-heavy headline +
right-aligned body block; one element deliberately overflows the container or
page frame. Not for conservative B2B.

**Archetype 6 — Exploded UI** (Stride fitness, Synais hero)
```
┌────────────────────────────────────┐
│   H1                               │
│  ┌────┐      ┌────────┐   ┌────┐   │   the app's best screens
│  │stat│      │ PHONE  │   │chart│  │   orbit the central device;
│  │card│ ┌───┐│ MOCKUP │┌──┤card│  │   cards slightly overlap and
│  └────┘ │UI││        ││UI└────┘  │   sit on one baseline, phone
│         └───┘└────────┘└──┘      │   elevated ~40px
└────────────────────────────────────┘
```
Use when: product has several strong screens. Exhibit the app, don't describe it.
Center mockup dominates by height (~2× cards); fragments show real data.

**Hero variant by positioning:** market leader = premium-clean + seals + big
numbers; system vendor = dark/technical + value cards overlapping the hero edge
(EKD); regional/personal = real people (video testimonial as hero), Du-form,
phone in header.

---

## 5. Section Archetypes

Scope: placement and dramaturgy (where a section goes, how often, caps).
Component-level disciplines and exact values are canonical in
`component-taxonomy.md` §9 — pointers below.

**Feature grid** — 3–4 cards or a bento (cell-count discipline:
`component-taxonomy.md` §9), ≥ 2 cells with real visual variation. Use for: parallel value
props. Never 3 identical icon cards as page structure; prefer `divide-y` rows or
asymmetric grids on marketing pages.

**Zigzag / alternating split** — image+text rows alternating sides, 60–100px
internal rhythm. Use for: 2–3 feature deep-dives with screenshots. CAP: max 2 in
a row; the third section breaks the pattern (grid, stat band, or dark proof).

**Stat band** — 3–5 oversized numerals (64px+) + small labels, hairline dividers
between cells (Synais, haubner 4-col, Miles "18.000 Fahrzeuge"). Use for: mass
proof after features. One stat band per page; real, checkable numbers only.

**Logo marquee** — 5–8 monochrome logos, evenly spaced (opacity/band spec:
`component-taxonomy.md` §9); infinite scroll or static. Use for: borrowed credibility directly
under hero. Max 1 marquee per page; grayscale only, real SVG logos.

**Pricing** — 3 tiers, middle elevated and capped with a "recommended" ribbon
(card discipline — inversion, toggle, typographic price parity:
`component-taxonomy.md` §9). Use for: SaaS/commerce. Keep feature lists
to ≤ 6 items.

**Testimonial wall** — 3-col mixed cards: one photo card, one dark, one light
(Stride checkerboard); quote length + attribution discipline:
`component-taxonomy.md` §9.
Use for: voices after mass proof. Real names, real sources — never "Jane Doe".

**Mega-footer** — brand column (blurb + socials) spanning 4 cols, 3–4 link
columns à 2, newsletter block, legal row; optional giant cropped wordmark
bleeding off the bottom edge (Synais) as the signature finale. Use for: every
marketing page — trust + SEO anchor. Group: products, resources, awards, legal,
contact, local places list.

**Calculator / embed section** — multi-step funnel embedded mid-page: numbered
step pills, large clickable option cards instead of text fields, visible
progress, result + CTA at the end (EKD savings calculator, Enpal "Ersparnis
berechnen", thermondo quote funnel, priwatt 4-click calculator). Use for: any
high-consideration offer. Place after value + trust; entry step is trivial
(house type? owner yes/no?); personal data only at the end.

**Integrations icon wall** — 12–16 app-icon tiles (96px rounded squares) in a
staggered masonry: 9 top / 7 bottom, second row offset by ~half a tile, odd
counts avoid the rigid app-store look (Synais). Use for: ecosystem/compatibility
proof. Let icon brand colors be the only chromatic burst on an otherwise
restrained page (chroma quarantine).

---

## 6. Composition Tricks (from the autopsies)

- **Vignette zones for text contrast:** darken only the area behind type
  (radial/linear scrim, ~35% at corners) so text keeps ≥ 4.5:1 even over busy
  imagery (Synais silk container). Never scrim the whole image uniformly.
- **Edge bars:** 16–24px full-height colored strips at both viewport edges frame
  the page like a poster (Stride navy bars) — structural rhythm anchors, zero
  content cost. One per page, brand color, flat.
- **Circle/arch masks:** mask one photo into a perfect circle inscribed in a dark
  container, or an arch (semicircle top + straight sides, Tend portraits, Stride
  circle) — turns stock photography into a graphic device. One masked monument
  per page, not a system of random blob shapes.
- **Staggered masonry:** offset the second row of a card/icon grid by half a cell;
  use odd item counts (9+7). Reads hand-crafted vs. rigid grid.
- **Cropped mega-type:** footer or section wordmark at 400–480px, cropped mid-
  x-height by the container edge — bleed = confidence (Synais footer). Flat
  color, no effects; the crop does the work.
- **Blueprint ghost layers:** stroke-only ghost UI cards + hairline connectors at
  ~10% opacity behind hero content (Synais schematic, Dataguard hatched margins,
  crosshair "+" marks) — depth and engineering signal without competing with the
  foreground. Keep opacity ≤ 12%.
- **Exploded-UI overlap:** let the central mockup overlap its orbiting cards by
  20–40px — depth without 3D.
- **Photo-as-gradient:** pick hero photography whose own tonal falloff acts as
  the background gradient (sky, dusk CGI); UI floats on it. Replaces decorative
  CSS gradients.

---

## 7. Funnel Basics

- **One primary funnel, many entrances:** every CTA on the page ("Ersparnis
  berechnen", "Get started", "Book now") leads into the same multi-step funnel.
  One label per intent across the whole page.
- **CTA rhythm:** repeat the primary CTA after nearly every section; minimum:
  hero, after features, after funnel, after testimonials, before footer. Sticky
  header CTA; for regional audiences the phone number is an equal path in the
  header.
- **Trust staging (never dump all at once):** 1. early (seals/stars/logos at or
  under hero) → 2. mass (counters, customer numbers) → 3. voices (full-text
  reviews, video testimonials) → 4. concrete/local (projects with place, data) →
  5. evidence (awards with sources, guarantees). One real checkable number beats
  three round ones.
- **Commitment ladder:** low (checklist, free check) → mid (consultation) → high
  (quote/purchase). Every readiness level gets an entrance.
- **Measurement points:** define a conversion event per funnel step (funnel start,
  step completion, submit, phone click). "More inquiries" without events is not
  verifiable. Performance budget is part of every spec: LCP < 2.5s, hero image
  priority, WebP/AVIF, lazy-load below fold.
- Detailed conversion mechanics, multi-step funnel design, copy rules, and page
  templates are out of scope for this module — the essentials above are sufficient;
  do not search for an external reference.

---

## Quick Self-Check Before Shipping a Layout

- [ ] One container width + one density dial, committed
- [ ] Section sequence follows the skeleton or a deliberate documented variant
- [ ] ≥ 4 layout families per page; zigzag ≤ 2× in a row; marquee ≤ 1×
- [ ] Hero passes the formula: benefit H1 + sub + 1 CTA + 1 trust signal in view
- [ ] Dark sections contain proof, max 1–2, same accent/type system
- [ ] Funnel entry mid-page; all CTAs point into one funnel
- [ ] Every spacing value on the 4/8pt scale; group gaps ≥ 2× inner gaps
- [ ] Mobile: strict one-column collapse, no horizontal scroll
