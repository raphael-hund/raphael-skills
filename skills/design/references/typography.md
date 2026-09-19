# Typography

> **Load when:** setting type — scale, fluid clamp sizes, leading, tracking, measure, font pairing, or type trends.
> **Skip when:** no text styling decisions are open (pure layout, asset, or motion work).
> **Canonical for:** type scale mathematics §1 (incl. tracking defaults §1.5), the pairing system §2.

Type is the highest-leverage surface in any interface: it is most of the pixels and all of the
meaning. Set it as a **system** (scale, leading, tracking, measure, weight), never as a series of
one-off font-size decisions. Every value below is a starting default, not a suggestion — change it
only with a reason you can state.

**Contents:** §1 Type Scale Mathematics (Fluid Clamp Scales, Ratios, Measure, Leading, Tracking) · §2 Font Pairing System (20 Curated Pairings, System Stacks, Variable Fonts) · §3 Trends with Evidence (Serif Invasion, Mono-Caps Labels, Pixel Fonts, Mega-Wordmark, Two-Tone Headlines) · §4 Kinetic Typography Basics · §5 Common Typography Mistakes

---

## 1. Type Scale Mathematics

### 1.1 Base and ratio

- Set the body base at **16px / 1rem**. Never smaller for running text; 9px "fine print" is a
  defect, not a style. Mobile inputs need 16px minimum (iOS auto-zooms below it).
- Derive every other size from one **modular ratio**. Pick the ratio by content temperament:

| Ratio | Name | Character | Use for |
|---|---|---|---|
| 1.2 | Minor third | Quiet, dense | Dashboards, docs, enterprise tools |
| 1.25 | Major third | Balanced | Most product UI and marketing — **default** |
| 1.333 | Perfect fourth | Assertive | Marketing pages, editorial hybrids |
| 1.5 | Perfect fifth | Poster-like | Portfolios, campaigns, manifesto pages |

- Sizes (px) from base 16, rounded to one decimal:

| Step | -1 | 0 (body) | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|
| 1.2 | 13.3 | 16 | 19.2 | 23 | 27.6 | 33.2 | 39.8 | 47.8 |
| 1.25 | 12.8 | 16 | 20 | 25 | 31.3 | 39.1 | 48.8 | 61 |
| 1.333 | 12 | 16 | 21.3 | 28.4 | 37.9 | 50.5 | 67.3 | 89.8 |
| 1.5 | 10.7 | 16 | 24 | 36 | 54 | 81 | 121.5 | 182 |

- Use **6–8 steps total**. A size that is not on the scale does not exist. If a real need
  appears, extend the scale — do not invent `text-[19px]`.

### 1.2 Fluid scales with clamp()

Scale continuously between two viewports instead of jumping at breakpoints. Formula:

```
preferred = minSize + (maxSize − minSize) × (100vw − minVW) / (maxVW − minVW)
font-size: clamp(minRem, preferredAsRem+vw, maxRem);
```

Canonical fluid scale (375px → 1440px interpolation, ratio ≈ 1.25 growing toward 1.333 at the
top — small screens stay compact, large screens get display presence):

```css
--text-xs:   clamp(0.75rem,  0.72rem + 0.15vw, 0.875rem);
--text-sm:   clamp(0.875rem, 0.83rem + 0.2vw,  1rem);
--text-base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
--text-lg:   clamp(1.125rem, 1rem    + 0.6vw,  1.5rem);
--text-xl:   clamp(1.25rem,  1rem    + 1.2vw,  2rem);
--text-2xl:  clamp(1.5rem,   1.1rem  + 1.9vw,  2.75rem);
--text-3xl:  clamp(1.875rem, 1.2rem  + 3.2vw,  4rem);
--text-4xl:  clamp(2.25rem,  1.2rem  + 5vw,    5.5rem);
```

Edit the extremes to the chosen ratio, then hold the scale constant across the whole product.

### 1.3 Measure (line length)

- Body text: **45–75 characters per line**, target `max-width: 65ch` (Tailwind `max-w-[65ch]`).
  Below 45ch the eye jumps lines too often; past 75ch it loses the return path.
- Mobile: 35–60ch is acceptable; never let text run to the viewport edge — keep container
  padding at every width.
- Headlines: 20–40ch. A headline that wraps to 4+ lines at display size is a **font-size error**,
  not a copy-length error. Fix with a smaller size or a wider container, not with `<br>` hacks.
- Fix orphans on short headings with `text-wrap: balance`; on paragraphs with
  `text-wrap: pretty`. Never glue final words with blanket `&nbsp;`.

### 1.4 Line-height (leading)

Leading tracks size **inversely** — bigger type, tighter leading.

| Context | line-height |
|---|---|
| Display / hero (>48px) | 1.05–1.2 |
| Headings (24–48px) | 1.15–1.3 |
| Body text | 1.5–1.75 (start at 1.5, raise for wide measures and low-x-height faces) |
| Micro-labels / captions | 1.25–1.4 |
| Italic display words containing `y g j p q` | ≥1.1 **plus** `pb-1`/`mb-1` descender clearance — audit every italic word before shipping |

Tight leading on multi-line body text is a defect: start at 1.5 × font size and adjust for the
typeface, not for the grid.

### 1.5 Letter-spacing (tracking)

Tracking is **size-specific** — never one global value (Apple's typography rule).

- Display/headings: **negative**, −0.01em to −0.03em (`tracking-tight` to `tracking-tighter`).
  Above ~64px you may reach −0.04em, but stop before glyphs collide — crushed spacing is a defect.
- Body: near **0**. Wide tracking on paragraphs breaks word shapes and slows reading.
- ALL-CAPS micro-labels: **positive**, +0.05em to +0.2em (`tracking-wider`+). Caps have no
  ascender/descender rhythm; they need air to stay legible.
- Small text (<14px): slightly positive (+0.01em).

### 1.6 Weight, case, numerals

- Build hierarchy from **weight + size + leading as a set**, not size alone. Emphasize with
  weight — it adds presence without taking space. Canonical ladder: body 400, labels 500,
  headings 600–700. Skip 300 at small sizes (illegible) and 800+ unless the face was drawn for it.
- **Sentence case** for headlines and body. Reserve ALL CAPS for short labels, eyebrows, and
  buttons. All-caps body copy is unreadable — word shape is how we read, and caps remove it.
- Use **tabular figures** for data columns, prices, timers, and any number that updates:
  `font-variant-numeric: tabular-nums` (Tailwind `tabular-nums`). Proportional numerals make
  columns jitter.
- Never justify body text on the web (`text-align: justify` leaves rivers of whitespace).
  Start-align; hyphenate only if you have checked every viewport.

---

## 2. Font Pairing System

### 2.1 Pairing rules

1. Ship **at most two families plus one mono**. Three visible families is a bug count, not a palette.
2. One family can carry an entire page. If it feels flat, vary size, weight, and spacing **before**
   reaching for a second family.
3. Emphasize a headline word with the **italic or bold of the same family**. Injecting a random
   serif word into a sans headline is mixed-family emphasis — amateur. Cross-family accents are
   allowed only as a deliberate, repeated system device (see §3.1), executed with intent.
4. Pair by **contrast with shared skeleton**: similar x-height and proportions, different texture
   (Didone + grotesque; geometric sans + mono). Two similar grotesques is the worst pairing —
   close enough to clash, not different enough to mean anything.
5. Serif is **not** the default answer to "creative brief". Use serif display only when the brief
   names it or the brand is genuinely editorial/luxury/heritage, with an articulable reason.
   Dashboards and software UIs: sans only, always.
6. Avoid the overused defaults (Inter, Geist) unless the brief is explicitly neutral/system-flavored
   or public-sector. Familiar defaults make unrelated products look identical.

### 2.2 Curated pairings (from the skill's research base of 74 analyzed pairings)

| # | Pairing | Display | Body | Character — when to use |
|---|---|---|---|---|
| 1 | Classic Elegant | Playfair Display | Inter | Didone luxury; fashion, spa, premium e-commerce |
| 2 | Luxury Serif | Cormorant | Montserrat | High-contrast refinement; jewelry, high-end services |
| 3 | Editorial Classic | Cormorant Garamond | Libre Baskerville | Literary double-serif; publishing, bookish brands |
| 4 | News Editorial | Newsreader | Roboto | Trustworthy journalism texture; content-heavy sites |
| 5 | Magazine Style | Libre Bodoni | Public Sans | Print-magazine authority; editorial SaaS |
| 6 | Legal/Academic | EB Garamond | Lato | Formal tradition; law, institutions, government |
| 7 | Tech Startup | Space Grotesk | DM Sans | Geometric-engineered; dev tools, AI products |
| 8 | Geometric Modern | Outfit | Work Sans | Clean contemporary; agencies, general purpose |
| 9 | Friendly SaaS | Plus Jakarta Sans | Plus Jakarta Sans | Warm geometric single family; B2B, productivity |
| 10 | Premium Sans | DM Sans | DM Sans | Quietly premium single family; modern SaaS, portfolios |
| 11 | Corporate Trust | Lexend | Source Sans 3 | Hyper-readable; enterprise, healthcare, finance |
| 12 | Accessibility First | Atkinson Hyperlegible | Atkinson Hyperlegible | Maximum legibility; government, healthcare, inclusion |
| 13 | Medical Clean | Figtree | Noto Sans | Clinical calm; health apps, pharma |
| 14 | Financial Trust | IBM Plex Sans | IBM Plex Sans (+ Plex Mono) | Engineered credibility; banking, fintech, enterprise |
| 15 | Developer Mono | JetBrains Mono | IBM Plex Sans | Terminal-native; dev tools, docs, CLI brands |
| 16 | Dashboard Data | Fira Sans | Fira Sans (+ Fira Code) | Data-dense UI with true mono numerals |
| 17 | Minimalist Portfolio | Archivo | Space Grotesk | Designer-tool austerity; creative portfolios |
| 18 | Bold Statement | Bebas Neue | Source Sans 3 | Condensed poster caps; events, sports, campaigns |
| 19 | Brutalist Raw | Space Mono | Space Mono | Full-mono starkness; experimental, brutalist briefs |
| 20 | Kinetic Brutalism | Space Grotesk | Space Grotesk | Single dominant geometric for oversized kinetic type |

Pro-grade alternatives beyond Google Fonts (when license/budget allows): Geist + Geist Mono,
Satoshi + JetBrains Mono, Cabinet Grotesk + Inter Tight, Söhne, GT America + IBM Plex Mono,
PP Neue Montreal. Serif display pool for justified editorial briefs (rotate, never repeat the
same serif twice in a row): PP Editorial New, GT Sectra, Reckless Neue, Tiempos, Recoleta,
Schnyder, Tobias, Saol, Canela. Treat Fraunces and Instrument Serif as burned defaults — they
are the two LLM-favorite display serifs.

### 2.3 System font stacks (zero-cost fallback)

Use when brand fonts are unavailable, for prototypes, or for maximum performance:

```css
--font-sans:  ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif;
--font-serif: ui-serif, "New York", Georgia, "Times New Roman", serif;
--font-mono:  ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace;
```

A system stack with disciplined scale/leading/tracking beats a webfont with none.

### 2.4 Variable fonts — use them by default

- One file serves every weight/width: fewer requests, no FOUT cascade, smaller total payload.
- Enable `font-optical-sizing: auto` — the font redraws itself for small vs display sizes.
- Fine-tune weight between named steps (`font-weight: 580`) to balance a heading against its body.
- Animate axes (`wght`, `wdth`) for kinetic type — cheaper than swapping glyph images.
- Loading: self-host or use `next/font`; always `font-display: swap` (never invisible text).
  Never hot-link Google Fonts via `<link>` in production.
- Subset to the languages you ship; check Latin-ext before committing for European languages.

---

## 3. Trends with Evidence

From forensic autopsies of shipped, premium-rated designs (the skill's research base:
analysis of 21 production designs; evidence is already folded into these rules). Trends are tools, not defaults —
each has a discipline attached. The same move, done reflexively, is an AI tell (see
`anti-slop-catalog.md`).

### 3.1 Serif invasion (editorial serif display in SaaS)

- **Evidence:** 4 of 9 premium landings in the autopsied set (Finova, Xuizver, Vorcel, Agentos)
  pair a high-contrast display serif (Reckless/Editorial-New class, ~72–110px, tracking −1.5 to
  −2%, leading ~1.0, sentence case often with a terminal period) with sans body and mono meta.
  Oura runs a full Didone display voice ("Diskret. Leistungsstark.", oversized serif stats).
- **Do:** commit fully — serif display + grotesque body + mono labels, with the serif at true
  display sizes. The tension between serif elegance and product UI is the point.
- **Don't:** reach for it because the brief said "premium". It is the single most-tested AI
  tell when unjustified. An oversized *italic* serif headline specifically ("Beautifully
  crafted…") is a catalogued slop pattern — italic-serif accent words inside sans headlines are
  the mixed-emphasis variant of the same reflex. If you use italic serif accents, make them a
  repeated system device with descender clearance (§1.4), not a one-off garnish.

### 3.2 Mono-caps micro-labels

- **Evidence:** 7 of 9 designs in batch 2 use tracked uppercase monospace labels (~10–13px,
  tracking +8–12%) as eyebrows, meta rows, stat labels, footer chrome — the universal
  "precision" signal. Stride sets entire testimonial quotes in mono caps ("lab report" voice);
  Agentos runs newspaper-ledger chrome ("§ 02 / PROBLEM · FIELD REPORT").
- **Do:** use for metadata, specs, numbers, nav — one consistent mono, positive tracking,
  never longer than one line of content.
- **Don't:** stack a mono eyebrow above every heading, use numbered meta-labels ("SECTION 01")
  that enumerate instead of naming, or set paragraphs in caps. Restraint budget: max one
  eyebrow per three sections.

### 3.3 Pixel / bitmap fonts as a deliberate style device

- **Evidence:** Dataguard sets accent words ("access", "anytime") in a periwinkle pixel font
  inside a heavy grotesque headline — security = terminals, made typographic. Agentos' footer
  uses pixel-grass; Xuizver's whole identity is a dithered pixel gradient.
- **Do:** use pixel type (Departure Mono, Press Start 2P, VT323) when the product's story is
  genuinely retro/terminal/8-bit, at accent-word or label scale, color-keyed to the palette.
- **Don't:** use it for body text or as decoration with no concept behind it.

### 3.4 Mega-wordmark footer

- **Evidence:** Synais ends the page with a ~480px cream "synais." wordmark cropped mid-x-height
  by the viewport bottom — type-as-illustration, zero imagery in the whole footer.
- **Do:** one per page, usually the footer; let it bleed (crop = confidence); flat color, tight
  tracking (−3 to −4%), no effects. The wordmark *is* the asset.
- **Don't:** combine with a second oversized typographic stunt on the same page.

### 3.5 Two-tone fade headlines

- **Evidence:** Agex (white + muted `#8E9BBE` second line), Synais (alternating cream/taupe per
  line, checkerboard rhythm), multiple batch-1 designs (black line 1 / gray line 2).
- **Do:** split by *information rank* — the line that carries the promise stays full-contrast,
  the qualifier drops to a muted tone of the same hue (not a different color, not a gradient).
- **Don't:** fade mid-sentence arbitrarily, use low-contrast tones that fail WCAG, or reach for
  gradient text — gradient headlines are a catalogued slop pattern; tonal fade is not.

### 3.6 Didone vs Grotesk vs Geometric Sans — pick by voice

| Family | Examples | Voice | Use when |
|---|---|---|---|
| Didone / high-contrast serif | Playfair, Bodoni, Editorial New | Luxury, editorial authority, heritage | Fashion, finance-as-luxury, editorial SaaS (§3.1) |
| Neo-grotesque | Neue Haas, Inter Display, Archivo | Neutral competence, system feel | Product UI, dashboards, enterprise, when content must lead |
| Geometric sans | Space Grotesk, Outfit, Syne | Engineered, modern, slightly playful | Startups, dev tools, brands that want a constructed feel |

Rule: the audience picks the family, not your taste. Regulated/public-sector = grotesque or
hyperlegible sans. Serif = only with an articulable brand fit.

---

## 4. Kinetic Typography Basics

Type in motion follows the same gate as all motion — frequency, purpose, budget
(full canon in `motion-and-animation.md`). Type-specific patterns:

- **Reveal on scroll:** clip-path mask reveal (`inset(0 0 100% 0)` → `inset(0 0 0 0)`), ~600ms,
  once (`whileInView`, `once: true`) — never re-animate on every scroll-by.
- **Staggered words/lines:** 30–80ms stagger, opacity + `translateY(8–24px)`, ease-out
  `cubic-bezier(0.16, 1, 0.3, 1)`. Stagger never blocks interaction.
- **Marquee:** max one per page, pause on hover/focus, `linear` easing (constant rate is the one
  legitimate linear), collapses to static under reduced motion.
- **Variable-font kinetic type:** animate `wght`/`wdth` axes on hover or scroll for emphasis —
  GPU-cheap, but only on display sizes and only if the motion means something.
- **Text scramble / typewriter:** rare-tier delight only; never on content the user must read
  to act. A blinking cursor on static copy is a slop pattern.
- **Reduced motion:** replace every transform/clip movement with a short opacity cross-fade.
  The content must be fully visible with all animation removed — reveal-by-animation that fails
  leaves a blank page.

---

## 5. Common Typography Mistakes

1. **Too many fonts.** Three+ families fighting. Fix: two families + one mono, max.
2. **No hierarchy.** Headings, subheads, and body within a few pixels of each other — the page
   cannot be scanned. Fix: one ratio, clear steps, weight ladder (§1.1, §1.6).
3. **Wrong caps usage.** All-caps paragraphs; or lowercase micro-labels with no tracking.
   Fix: caps only ≤1 line, always with +0.05em or more.
4. **The serif reflex.** "Creative brief → serif headline" with no brand justification — the most
   common AI tell in production rounds. Fix: default to a strong sans display; serif only with
   an articulated reason.
5. **Overused defaults.** Inter/Geist on every unrelated product. Fix: pick for character (§2.2)
   or justify neutrality.
6. **Crushed or sprayed tracking.** −0.06em headlines with colliding glyphs; +0.1em body text.
   Fix: tracking is size-specific (§1.5).
7. **Tight leading on body / loose leading on display.** Fix: inverse relationship (§1.4).
8. **Infinite measure.** Body text running 900px wide. Fix: `max-w-[65ch]`.
9. **Eyebrow/badge inflation.** A pill or mono label above every heading, repeating it.
   Fix: delete most of them; the headline alone is enough (budget §3.2).
10. **Icon tile stacked above every heading.** The rounded-square icon chip on every feature
    card. Fix: icon beside the heading, or no container.
11. **Tiny text.** 11px nav, 9px legal, 12px body. Fix: 16px body, ≥12px meta, comfortable
    secondary text.
12. **Mixed-family emphasis.** Random italic serif word in a sans headline. Fix: same-family
    italic/bold — or make cross-family accents a deliberate, repeated system (§3.1).
