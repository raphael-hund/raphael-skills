---
name: design
description: >
  Master-level UI design craft — how to truly design, end to end. Covers color logic
  (OKLCH, one-accent discipline, semantic tokens), eased gradients (never flat-linear),
  the complete Figma effects cookbook (Background/Layer Blur, Transparency, Border
  Radius, Inner/Outer Glow, Inner/Drop Shadow, Gradient Borders), button engineering,
  a motion canon (easings, springs, scroll-driven), forensic screenshot/site autopsy
  (reverse-engineer designs into tokens + effect specs), image-asset strategy,
  component taxonomy (Refero/Mobbin), typography, anti-slop catalog, and
  React/Tailwind recipes. Use when: designing websites/landing pages/dashboards,
  analyzing or rebuilding screenshots/sites, building components (buttons, cards,
  navbars, pricing, heroes), choosing colors/gradients/effects/animations, generating
  UI assets, or producing design-quality React code. Triggers: "design", "UI",
  "landing page", "make it premium", "gradient", "button", "animation", "looks like
  AI", "analyze this screenshot", "rebuild this site".
license: Complete terms in LICENSE.txt
---

# UI Design Mastery

Teaches genuine design craft, not layout assembly. Every rule ships with concrete values —
`cubic-bezier(0.22,1,0.36,1)` beats "smooth", `oklch(70% 0.15 250)` beats "a nice blue".

## Core convictions

1. **Slop is the absence of a decision.** Every color, radius, shadow, and duration is chosen, or it's slop.
2. **One accent, fully committed.** The palette is a neutral canvas + one chromatic accent, quarantined to actions and state. (Proof: Oura, Miles, IQ Capital, every autopsy in this skill's research base.)
3. **Gradients are eased, never flat-linear.** Distribute stops along an easing curve, interpolate in OKLCH, kill banding with grain. → `references/gradients-and-easing.md`
4. **Effects are engineering, not decoration.** Every blur, glow, shadow and gradient border has parameters, purpose, and failure modes. → `references/figma-effects-cookbook.md`
5. **Motion earns its place.** Frequency gate first; exact easings and duration budgets; exit = 60–70% of enter. → `references/motion-and-animation.md`
6. **Steal like a forensic scientist.** Any screenshot or site can be dissected into tokens and rebuilt better. → `references/screenshot-autopsy.md`
7. **The brief wins.** Client-pinned brand, colors, fonts, and legal constraints override every rule here. Conscious, documented deviation beats blind obedience.

## Modes

Pick the mode from the request; load only the references listed for it.

Quick routing — first matching line wins:

```text
Screenshot/URL to dissect or rebuild?        → Mode A (AUTOPSY)
One component to engineer?                   → Mode C (COMPONENT LAB)
"Design a site/page for X" from nothing?     → Mode B (CREATE)
"Give me the code" / after B or C?           → Mode D (BUILD)
Ambiguous ("make it premium", "redesign")?   → Mode B if greenfield; Mode A on the current site first if one exists
```

### Mode A — AUTOPSY (analyze / reverse-engineer)
Trigger: a screenshot, Figma export, or URL lands in the conversation ("analyze", "rebuild", "what makes this good").
1. Read `references/screenshot-autopsy.md` — follow the 8-step forensic process.
2. Run `scripts/extract_palette.py` on the image; `scripts/check_contrast.py` on key pairs.
3. Classify effects with `references/figma-effects-cookbook.md` (measure, don't guess — mark estimates ±10%).
4. Deliver the Autopsy Report (template in screenshot-autopsy.md): tokens, type system, effect stack, component inventory, asset strategy, "what makes it work" verdict.
5. If asked to rebuild → switch to Mode D with the extracted tokens.

### Mode B — CREATE (design from scratch)
Trigger: "design a landing page / dashboard / site for X".
1. Extract the brief: page type, audience (**the audience chooses the aesthetic**), vibe, pinned brand assets. One clarifying question max, else assume and commit.
2. Direction: pick palette logic (`references/color-logic.md`), type system (`references/typography.md`), structure (`references/layout-and-sections.md`).
3. Effects + gradients: `references/figma-effects-cookbook.md`, `references/gradients-and-easing.md`; use `scripts/gradient_gen.py` for every gradient — never hand-write flat linear stops.
4. Motion: `references/motion-and-animation.md` — gate first, then recipes.
5. Image assets: `references/image-asset-strategy.md` — decide per section which asset type and why; generate with the image_generation plugin when available.
6. Component choices: `references/component-taxonomy.md` + `references/buttons.md`.
7. Output: a complete DESIGN SPEC (tokens, type scale, effect stacks, section plan, asset list, motion plan) — then Mode D if code is wanted.

### Mode C — COMPONENT LAB (engineer one component)
Trigger: "build me a button / card / navbar / pricing table / modal…"
1. Read `references/component-taxonomy.md` for the component's disciplines and variants.
2. Check `references/react-component-libraries.md` first — a curated registry component may already nail it (registry-first rule; always re-bind to your tokens, never ship demo defaults).
3. Buttons specifically: `references/buttons.md` is law — anatomy, variant ladder, state matrix, effect stacks.
4. Apply effects from `references/figma-effects-cookbook.md`; hover physics from `references/motion-and-animation.md`; pick animation libraries via `references/animation-libraries.md`.
5. Deliver spec + code (React/Tailwind per `references/react-tailwind-recipes.md`).

### Mode D — BUILD (production code)
Trigger: "give me the code" or after Mode B/C.
1. Read `references/react-tailwind-recipes.md` — token setup, component recipes, motion setup, quality gates.
2. Emit complete, copy-paste-ready React + Tailwind. No placeholders without slot markers, no fake data presented as real.
3. Run the Pre-Flight checklist from `references/anti-slop-catalog.md` before delivering.

## References (progressive disclosure — load only what the mode needs)

Every reference opens with a header: purpose, when to load, when NOT to load, TOC. Trust it.

| File | ~lines | Load for |
|---|---|---|
| `references/color-logic.md` | 325 | Palettes, OKLCH, one-accent discipline, semantic tokens, contrast |
| `references/gradients-and-easing.md` | 326 | ANY gradient. Eased stops, mesh, blobs, auroras, grain |
| `references/figma-effects-cookbook.md` | 373 | Every Figma effect → CSS/React: blurs, glows, shadows, radii, gradient borders |
| `references/buttons.md` | 276 | Any button, toggle, or CTA |
| `references/motion-and-animation.md` | 445 | Any animation, hover, scroll effect, spring, easing choice (doctrine + recipes) |
| `references/screenshot-autopsy.md` | 340 | Mode A — the forensic method + report template |
| `references/image-asset-strategy.md` | 220 | Choosing/generating photos, 3D renders, mockups, textures |
| `references/component-taxonomy.md` | 239 | Component landscape (Refero/Mobbin distilled), recipe index |
| `references/react-tailwind-recipes.md` | 585 | Mode D — token setup + production component code |
| `references/react-component-libraries.md` | 233 | Choosing/using React UI libraries: registry-first workflow, curated tiers, maker map, quick decisions |
| `references/animation-libraries.md` | 322 | Which animation library for which job — bundle costs, decision matrix, specialty stacks |
| `references/typography.md` | 313 | Type scales, pairings, trends, hierarchy |
| `references/anti-slop-catalog.md` | 214 | Pre-flight QA, anti-pattern checks |
| `references/layout-and-sections.md` | 355 | Grids, spacing, section dramaturgy, hero architectures |

## Scripts

| Script | Use |
|---|---|
| `scripts/extract_palette.py <image> [--top 8] [--regions]` | Dominant colors from any screenshot (hex + OKLCH) |
| `scripts/check_contrast.py <fg> <bg>` | WCAG contrast verdict (AA/AAA) |
| `scripts/gradient_gen.py <from> <to> [--stops 7] [--ease ease-in-out] [--angle 135] [--mesh]` | Eased, OKLCH-interpolated gradient CSS |
| `scripts/shadow_stack.py --level 3 [--color "#hex"]` | Layered realistic shadow stacks |

## Hard no-gos (full catalog: `references/anti-slop-catalog.md`)

- Flat linear gradients without easing/OKLCH — generate, never hand-write.
- `transition: all`, `ease-in` on UI, layout-property animation, missing `prefers-reduced-motion`.
- Default-AI palettes (purple-blue gradients, washed-out pastels), generic Inter-everything with no decision.
- Fake screenshots, fake metrics, fake testimonials, placeholder images without slot markers.
- More than one chromatic accent fighting on the same screen.
- Cards inside cards, split-header heroes, eyebrow labels on every section.
- Reveal animations that hide content by default in CSS and rely on JS to un-hide — reveals are progressive enhancement; no-JS = fully visible.
- Never reference this skill, its files, or its scripts inside deliverables (no "[skill]" markers, no "per the skill" comments). Deliverables read as the work of a senior designer, full stop.
