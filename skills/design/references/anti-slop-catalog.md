# Anti-Slop Catalog

> **Load when:** before shipping any page (Pre-Flight gate), or auditing a design against the 67 rules and hard bans.
> **Skip when:** still building tokens, components, or layout — build first, run this as the final gate; rule details live in the topical files.
> **Canonical for:** the 67-rule catalog, Taste hard bans §10, Pre-Flight checklist §11.

The complete anti-pattern checklist: the 67 impeccable.style rules (61 detector + 6 design-review),
condensed, plus the Taste-skill hard bans and a machine-checkable Pre-Flight list. Slop is the
absence of a decision — every pattern below is a place where a default shipped instead of a choice.

**How to use:** run it before shipping any page. A finding is a reason to look closer, not an
automatic rewrite — check the page, the task, and any intentional choice first. Types: **S** =
checkable in source (grep-able), **B** = needs the rendered page, **R** = design-review judgment.

**Contents:** §1 Design System (4) · §2 Visual Details (8) · §3 Typography (11) · §4 Color & Contrast (7) · §5 Layout & Space (12) · §6 Motion (6) · §7 Copy (5) · §8 Imagery (4) · §9 General Quality (10) · §10 Taste-Skill Hard Bans (beyond the 67) · §11 Pre-Flight Checklist (~20 machine-assisted checks) · §12 The Deviation Rule

---

## 1. Design System (4)

With a documented system (DESIGN.md / tokens), anything outside it is a finding.

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 1 | Font outside system | S | Is this font in the documented type system? | Use an approved font, or update the system if intentional. |
| 2 | Color outside system | S | Is this color in the documented palette? | Use a palette color, or add it to the system. |
| 3 | Radius outside scale | S | Is this corner radius in the documented scale? | Use an existing radius, or extend the scale. |
| 4 | Font size outside scale | S | Is this size on the documented type scale? | Use an existing step, or add a new step. |

## 2. Visual Details (8)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 5 | Decorative grid-line background | S | Do grid lines help anyone use the page? | Keep grids for canvases/maps/measurement only. |
| 6 | Border accent on rounded element | S | Does a thick colored border fight the card's radius? | Lighter border, or let the background define the card. |
| 7 | Glassmorphism everywhere | R | Do blur/glass/glow solve a real layering problem? | Remove decorative glass; keep it where layers genuinely overlap. |
| 8 | Side-tab accent border | S | Does a colored stripe mark a real status or alert? | Remove the stripe when there is nothing to signal. |
| 9 | Hairline border + wide shadow | S | Do a 1px border and a broad shadow define the same edge? | Choose the border **or** the shadow, not both. |
| 10 | Repeating-gradient stripes | S | Are stripes filling space with noise? | Plain surface, or a texture that belongs to the design. |
| 11 | Extreme border-radius on cards | R | Does a huge radius squeeze the content (blob cards)? | Reduce the curve to suit the card's size. |
| 12 | Rough SVG illustrations | R | Does a hastily drawn mascot make the page feel unfinished? | Use well-made imagery or none. |

## 3. Typography (11)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 13 | Label above a heading | S | Does the eyebrow repeat the heading? | Delete it, or work its useful words into the heading. |
| 14 | Tiny interface text | S | Can nav/links/controls be read without zooming? | Increase size; ≥12px meta, comfortable secondary text. |
| 15 | Flat type hierarchy | S | Are headings and body nearly the same size/weight? | Clearer differences via scale, weight, spacing. |
| 16 | Icon tile stacked above heading | S | Rounded icon square on every feature card? | Icon beside the heading, or drop the container. |
| 17 | Italic serif display headline | S | Oversized italic serif used as a reflex "editorial" look? | Pick a type style that fits the product's character. |
| 18 | Badge above the main headline | S | Does a pill above the hero compete with the message? | Remove it, or put the info into headline/subtext. |
| 19 | Oversized hero headline | S | Does a long headline at display size fill the first screen? | Shorten it or reduce size; leave room for offer + action. |
| 20 | Crushed letter spacing | S | Are glyphs colliding from over-tight tracking? | Loosen until each character is clear at small sizes. |
| 21 | Overused font | S | Inter/Geist defaults making this product interchangeable? | Choose type for character; keep brand fonts that fit. |
| 22 | Single font for everything | R | Is the page flat despite sizes/weights? | Vary size, weight, spacing first; add a second family only if needed. |
| 23 | All-caps body text | S | Long passages in uppercase? | Sentence case for body; caps only for short labels/headings. |

## 4. Color & Contrast (7)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 24 | Radial-gradient background halo | S | Does a glow on a dark page serve the content? | Remove halos that compete with content or mean nothing. |
| 25 | Soft spotlight behind content | S | Is a faint glow substituting for emphasis? | Use spacing, contrast, or a clear heading instead. |
| 26 | AI color palette | S | Purple gradients / bright cyan on dark — the model default? | Build the palette from the product's identity. |
| 27 | Dark mode with glowing accents | S | Neon borders turning the dark UI into a wall of glow? | Reduce glow so information stands out. |
| 28 | Gradient text | S | Is color changing across a headline just for decoration? | One solid color; use size/weight for emphasis. |
| 29 | Gray text on colored background | S | Does neutral gray wash out on a tinted surface? | Darker tint or light text; re-check contrast on the real bg. |
| 30 | Cream / beige palette | S | Is cream the reflex substitute for a considered palette? | Keep it only when it belongs to the product. |

## 5. Layout & Space (12)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 31 | Tiny numbered section labels | S | "01 Discover 02 Design" with no sequence to follow? | Keep numbering only for real steps/order. |
| 32 | Cards flush against scroller edge | B | Do first/last cards touch the scroller edge? | Match space at both ends of the scroll region. |
| 33 | Text covered by another element | B | Does an opaque layer sit over readable text? | Move the layer or give the text clear space. |
| 34 | Unbalanced opening columns | B | Does one column run far below its neighbor? | Rebalance, or move the longer section below both. |
| 35 | Heading closer to previous section | B | Is a heading nearer the block above than its own content? | More space above the heading than below. |
| 36 | Hero metric layout | R | Is the huge-number-plus-stats block a template reflex? | Lead with a metric only when it explains the product. |
| 37 | Identical card grids | R | Same icon+heading+text card repeated for every point? | Group related ideas; vary layout where content differs. |
| 38 | Monotonous spacing | S | Equal gaps everywhere — nothing reads as grouped? | Related items close, real space between groups. |
| 39 | Nested cards | S | Cards inside cards inside cards? | Flatten: spacing, typography, dividers instead of nesting. |
| 40 | Line length too long | B | Does running text exceed ~75 characters? | Constrain to 65–75ch, adjusted for font and screen. |
| 41 | Content overflowing container | B | Does content spill or force sideways scroll? | Let text wrap, elements shrink; scroll region if needed. |
| 42 | Clipped menus and popovers | B | Does a container cut off a menu/tooltip/popover? | Allow overflow or render the layer outside the clipper. |

## 6. Motion (6)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 43 | Pulsing status dot | S | Does a dot pulse even when nothing changes? | Keep static status still; motion only for real activity. |
| 44 | Decorative blinking cursor | B | Blinking cursor on text nobody can edit? | Remove from static copy; keep where people type. |
| 45 | Auto-scrolling marquee | S | Must readers read at the page's pace? | Keep still, or provide pause/browse controls. |
| 46 | Bounce or elastic easing | S | Do routine dialogs spring in with overshoot? | Settle quickly; save playful motion for fitting moments. |
| 47 | Animation that changes layout | S | Do width/height/spacing animations shift nearby content? | Use transforms; check performance if layout must move. |
| 48 | Images that move on hover | S | Zoom/rotate on every image hover, no purpose? | Keep images still unless motion explains an action. |

## 7. Copy (5)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 49 | Same text repeated in one container | S | Does one label appear in several slots of a card? | Keep it once, where it matters. |
| 50 | Em-dash overuse | S | A dash in every sentence — the AI writing habit? | Full stops between thoughts; vary punctuation. |
| 51 | Generic marketing claims | S | "Supercharge", "world-class", "next-generation"? | Say what people can do and what improves for them. |
| 52 | Forced contrast | S | "Not a feature. A platform." slogan pattern? | State the useful information directly. |
| 53 | Calling things "theater" | S | Dismissal replacing explanation? | Name what is ineffective and explain why. |

## 8. Imagery (4)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 54 | Placeholder-style illustrations | S | Generic circles-and-blocks scenes? | Imagery that says something specific about the product. |
| 55 | Jagged image masks | S | CSS pretending to be a torn/organic edge? | Use a prepared cut-out asset, or a clean crop. |
| 56 | Images hidden under overlays | S | A ~94% wash hiding the image you added? | Reduce the overlay until the image contributes — or cut it. |
| 57 | Broken or placeholder image | S | Missing/empty/placeholder `src`? | Ship the real asset and verify it loads, or remove it. |

## 9. General Quality (10)

| # | Rule | T | Check | Fix |
|---|---|---|---|---|
| 58 | JavaScript errors on load | B | Uncaught errors breaking controls or content? | Fix the error first; polish after the page works. |
| 59 | Content stuck waiting to appear | B | Content stuck at `opacity: 0` when a reveal fails? | Visible by default; animation is enhancement, not gate. |
| 60 | Cramped padding | B | Text pressed against button/card edges? | Padding from the spacing scale, separating content from chrome. |
| 61 | Body text touching page edge | B | Paragraphs flush with the viewport at any width? | Horizontal container padding, verified at narrow widths. |
| 62 | Justified text | S | Uneven word rivers from justified paragraphs? | Start-align; hyphenate only after checking each screen size. |
| 63 | Low-contrast text | S | Text blending into its background? | WCAG AA: ≥4.5:1 normal text, ≥3:1 large text. |
| 64 | Skipped heading level | S | h1 → h3 with no h2? | Match heading levels to the page structure, no skips. |
| 65 | Tight line height | S | Crammed multi-line body text? | Start at 1.5 × font size; adjust for face and measure. |
| 66 | Tiny body text | S | Body below ~16px, 9px fine print? | ~16px base; check the actual typeface on phone and desktop. |
| 67 | Wide letter spacing on body | S | Spread-out tracking breaking word shapes? | Body near default spacing; wide tracking for short labels only. |

---

## 10. Taste-Skill Hard Bans (beyond the 67)

Production-tested AI tells, banned outright unless the brief explicitly demands them:

1. **Inter as the default font.** Also burned: Fraunces and Instrument Serif as default display serifs.
2. **AI-purple/blue gradients and glows** — neutral base + one high-contrast accent instead.
3. **Em-dashes (`—`) and en-dash separators (`–`)** in any user-visible string. Ranges use hyphens.
4. **Div-based fake screenshots** — never simulate product UI out of rectangles; use real assets.
5. **Scroll cues** — "Scroll", `↓`, animated mouse-wheel icons.
6. **Meta-labels that enumerate** — "SECTION 01", "QUESTION 05", "01 / 4". Labels name the topic.
7. **Eyebrow inflation** — max 1 eyebrow per 3 sections; the headline alone is usually enough.
8. **Three equal feature cards** — the horizontal 3-identical-card row. Use zig-zag, asymmetric
   grid, bento with exact cell count, or horizontal scroll.
9. **Split-header default** — big headline left + small explainer right, reflexively. Stack instead.
10. **Centered hero bias** — at variance above minimal, force split/asymmetric composition.
11. **`h-screen` heroes** — use `min-h-[100dvh]`. Hero must fit the first viewport: headline ≤2
    lines, subtext ≤20 words, CTAs visible without scroll, top padding ≤ `pt-24`.
12. **Duplicate CTA intent** — "Get in touch" / "Contact us" / "Let's talk" on one page. One
    label per intent. Primary CTA ≤3 words, never wraps.
13. **Placeholder-as-label** in forms. Ever. Label above, error below, helper in markup.
14. **Fake-precise numbers** (`99.99%`, `4.1×`) without real data; generic names ("John Doe",
    "Acme"); filler verbs ("Elevate", "Seamless", "Unleash", "Revolutionize", "Delve").
15. **Pills/tags overlaid on images; photo-credit captions as decoration; version footers
    (`v1.4.2`) on marketing pages; decorative colored status dots; middle-dot (`·`) chains
    (max 1 per line).**
16. **Custom mouse cursors** — outdated, accessibility- and performance-hostile. Sole exception:
    an explicit expressive/editorial brief (Awwwards-class portfolio), with fine-pointer-only
    gating and a visible fallback — recipe: `motion-and-animation.md` §6.8; document the deviation.
17. **Pure `#000000` / `#FFFFFF`** in dark/light themed surfaces — use off-black/off-white.
18. **One-off shape mixing** — one corner-radius scale per page (all-sharp / all-soft / all-pill).
19. **Hand-rolled SVG icons and illustrations** as a default; emoji as icons. Use a real icon set.
20. **Theme flipping mid-page** — one theme per page; tints within the family are fine.

---

## 11. Pre-Flight Checklist

Run before shipping. Mechanical checks are grep-able; visual checks need the rendered page
(open it at 375 / 768 / 1024 / 1440px, in both themes, with reduced motion on).

1. **Em/en dashes:** `grep -rnP '[\x{2013}\x{2014}]' src/ --include='*.{tsx,jsx,html,css,md}'` → 0 hits in user-visible strings.
2. **AI gradient palette:** `grep -rniE 'linear-gradient\([^)]*(purple|violet|#7c3aed|#8b5cf6|#6366f1)|from-purple|to-(blue|cyan)' src/` → 0 unjustified hits.
3. **Overused font default:** `grep -rniE "font[-_]?family[^;]*(Inter|Geist|Fraunces|Instrument Serif)" src/` → each hit has a documented reason.
4. **Gradient text:** `grep -rnE 'bg-clip-text|background-clip:\s*text' src/` → 0 decorative hits.
5. **Hero height:** `grep -rn 'h-screen' src/` → 0 (expect `min-h-[100dvh]` / `min-h-dvh`).
6. **`transition: all`:** `grep -rnE 'transition:\s*all|transition-all' src/` → 0.
7. **Layout animation:** `grep -rnE 'transition[^;}]*(width|height|top|left|margin|padding)' src/` → 0 outside accordions; motion uses transform/opacity only.
8. **`scale(0)` entrances:** `grep -rnE 'scale\(0(\.0+)?\)' src/` → 0.
9. **Missing reduced-motion:** `grep -rn 'prefers-reduced-motion' src/` → present wherever animation exists.
10. **Ungated hover motion:** hover rules with transforms live under `@media (hover: hover) and (pointer: fine)`.
11. **Placeholder-as-label:** `grep -rn '<input' src/ | grep -c placeholder` → every hit has a visible `<label>`; no placeholder-only fields.
12. **Images without alt / broken src:** `grep -rn '<img' src/ | grep -v 'alt='` → 0; no `src=""`, no lorem picsum without a deliberate seed strategy.
13. **Lorem & fake data:** `grep -rniE 'lorem|ipsum|John Doe|Acme' src/` → 0.
14. **Pure black/white surfaces:** `grep -rnE '#000000|#000\b|#ffffff|#fff\b' src/ --include='*.css'` → themed surfaces use off-values.
15. **Eyebrow budget:** `grep -rcE 'uppercase[^;]*tracking' src/` per section → ≤ ceil(sections / 3).
16. **All-caps body:** no `text-transform: uppercase` on elements with >1 line of content.
17. **Contrast (visual):** body text ≥4.5:1, large text/CTAs ≥3:1 — including placeholders, focus rings, ghost buttons over imagery (scrim/stroke present).
18. **Type scale discipline:** every font-size in the build maps to a documented scale step; no orphan `text-[19px]` values (check: `grep -rnoE 'text-\[[0-9.]+px\]|font-size:\s*[0-9.]+px' src/` → all values on scale).
19. **Radius discipline:** every border-radius maps to the documented scale; one shape language per page (`grep -rnoE 'rounded(-\w+)?|border-radius:\s*[0-9]+(px|rem)' src/` → consistent set).
20. **Rendered page sweep (visual):** no horizontal scroll at 375px; hero fits first viewport with CTA visible; headings group with their own content; no nested cards >1 deep; no content stuck at `opacity: 0` with JS disabled; console clean of errors.

## 12. The Deviation Rule

Conscious, justified deviation beats blind obedience. These rules encode defaults that models
reach for *without thinking* — if you have thought, and the brief, brand, or audience demands a
listed pattern, use it. Requirements for a deviation:

1. State the rule you are breaking.
2. State the reason (brief constraint, brand asset, audience need) — in a code comment, commit
   message, or DESIGN.md, wherever the next agent will find it.
3. Execute the deviation **with intent**: a serif because the brand is heritage, executed
   impeccably, is design; a serif because the model defaults to it is slop.

An undocumented deviation is indistinguishable from slop. Document it or don't do it.
