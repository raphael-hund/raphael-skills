# Motion & Animation

> **Load when:** any animation decision — whether to animate at all, easing, durations, springs, gestures, recipes, reduced-motion handling.
> **Skip when:** choosing which library to install (→ `animation-libraries.md`) or the page has no motion at all.
> **Canonical for:** motion doctrine §1 (incl. reduced-motion §1.3), easing canon §2, duration budgets §3, performance rules §7.

Reference for building animation that survives a strict review. Make the call, state the reasoning
in one line, write the code. Never present motion options as a menu. Two failure modes, worst first:
(1) animating something that should not animate; (2) animating the right thing with the wrong
ingredients. Zero lines of code is sometimes the correct output.

**Contents:** 1. Motion Doctrine · 2. Easing Canon · 3. Duration Budgets · 4. Springs ·
5. Gestures & Physicality · 6. Recipes · 7. Performance · 8. Debug & Audit · 9. Library Map


## 1. Motion Doctrine

### 1.1 The Gate — four questions, in order, before any code

**1. Frequency.** Keyboard-initiated actions are a disqualifier, not a judgment call — Raycast has
no open/close animation, correct for something opened hundreds of times a day.

| Frequency | Decision |
|---|---|
| 100+ times/day (shortcuts, command palette) | **No animation. Ever.** |
| Tens of times/day (hover, list navigation) | Near-imperceptible only: fast + subtle, or nothing |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, success, celebration) | The delight budget lives here |

**2. Purpose.** Name one or do not build: **Feedback** · **Spatial consistency** · **State
indication** · **Preventing a jarring change** · **Explanation** (marketing/onboarding only) ·
**Delight** (rare tier only). "It looks cool" on a frequently-seen element is a reason to stop.
**3. Speed.** Must fit the budgets in §3 — no 400ms dropdowns.
**4. Function.** Data the user is reading or acting on does not move for style — a mouse-tracking
effect belongs on a marketing page, not on a graph in a banking app.

### 1.2 Interruptibility — the single most important principle

- Never lock out input during a transition. Animate from the **presentation value** (what is on
  screen now), never the logical target.
- **Transitions, not keyframes**, for anything rapidly triggered (toasts, toggles, tooltips):
  transitions retarget from the current value; keyframes restart from zero.
- **Springs for gestures**: they carry velocity through an interruption; when a gesture reverses,
  blend velocity — do not hard-cut it.

### 1.3 Reduced motion ships with the animation, not as follow-up

Reduced motion means **fewer and gentler, not zero**: keep opacity/color transitions that aid
comprehension, remove movement and position changes; replace slides, springs and parallax with short
cross-fades; drop overshoot. Never the global `animation-duration: 0.01ms !important` kill — that
deletes all feedback.

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { transform: none; transition-property: opacity; }
}
@media (hover: hover) and (pointer: fine) {
  .card:hover { /* hover motion ONLY inside this gate — touch fires false hovers */ }
}
```

In JS: branch the transform values, not the animation — `reduce ? 0 : '-100%'`.


## 2. Easing Canon

No approximated values. Every curve comes from this table. Never invent `cubic-bezier(0.4, 0, 0.2,
1)` because it looks familiar.

```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);   /* strong ease-out: default for UI enter/exit */
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1); /* reveals, hero entrances, landing pages */
  --ease-natural:  cubic-bezier(0.16, 1, 0.3, 1);  /* natural deceleration, scroll-reveals */
  --ease-in-out:   cubic-bezier(0.77, 0, 0.175, 1);/* on-screen movement, morphs */
  --ease-drawer:   cubic-bezier(0.32, 0.72, 0, 1); /* iOS-like drawer/sheet (from Ionic) */
  --ease-pop:      cubic-bezier(0.34, 1.56, 0.64, 1); /* spring-overshoot, use sparingly */
}
```

| Situation | Curve |
|---|---|
| Entering or exiting | `var(--ease-out)` (expo for marketing reveals) |
| Moving/morphing on screen | `var(--ease-in-out)` |
| Hover / color change | built-in `ease` (weak is fine at 150–200ms) |
| Constant motion (marquee, spinner, progress fill) | `linear` |
| Drawers/sheets | `var(--ease-drawer)` |
| Unsure | `var(--ease-out)` |

- **`ease-in` is banned on UI.** It starts slow, delaying the exact moment the user is watching.
  `ease-out` at 200ms *feels* faster than `ease-in` at 200ms. Tolerated only inside an `ease-in-out`
  pair or for exits that accelerate away (rare).
- **Built-in CSS easings are too weak** for anything the user is watching — that is why the tokens
  above exist. Need a new curve? Take it from easing.dev/easings.co, never hand-roll.
- Cohesion exception: match the motion to the mood. Sonner uses plain `ease` at 400ms because
  elegance is the toast's personality, and it works.


## 3. Duration Budgets

| Element | Duration |
|---|---|
| Button press feedback (`:active`) | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects, menus | 150–250ms |
| Modals, drawers | 200–500ms |
| Micro (hover lift, icon nudge, color) | 100–200ms |
| Scroll/marketing reveals | 400–800ms (peak ~600ms) |
| Exit | **60–70% of the enter duration**, same curve family |

- **UI animations stay under 300ms.** A 180ms dropdown feels more responsive than a 400ms one.
  Anything above 300ms on UI needs a named reason.
- **Asymmetric timing:** slow where the user is deciding, fast where the system responds. Hold-to-
  confirm: 2s `linear` fill on press (progress should not ease), 200ms `ease-out` snap on release.
- **Stagger: 30–50ms per item** (80ms absolute max for marketing); longer reads as lag. Cap total
  delay; stagger never blocks interaction while it plays.
- **Tooltips:** initial delay before first open; once one is open, neighbours open instantly —
  `[data-instant] { transition-duration: 0ms; }`. Perceived performance is real: instant-after-first
  tooltips make the whole toolbar feel faster.


## 4. Springs

Reach for a spring when: drag with momentum, interruptible/reversible gestures, elements that should
feel alive, magnetic/mouse-tracking motion. Never for a simple fade or a one-shot entrance.

**Apple parameters (damping ratio / response in seconds):**

| Use | damping | response |
|---|---|---|
| Default UI, move/reposition | 1.0 (critically damped, no bounce) | 0.3–0.4 |
| Rotation / playful | 0.8 | 0.4 |
| Drawer / sheet | 0.8 | 0.3 |

```js
// Web mapping (Motion) — recommended duration-based form:
transition: { type: "spring", duration: 0.5, bounce: 0.2 }
// Equivalent physics form:
transition: { type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

- Bounce 0.1–0.3 max, only when the gesture itself carried momentum (drag-to-dismiss, playful
  interactions). Critically damped is the house style.
- **Velocity handoff:** the animation continues at the finger's exact release velocity.
  `relativeVelocity = gestureVelocity / (targetValue − currentValue)`; Motion takes absolute px/s
  directly.
- Decompose 2D motion into independent X and Y springs so each axis can be grabbed and reversed
  independently.

**Momentum projection and rubber-banding** (Apple's shipped formulas — not the physics-textbook
`v²/2·decel`):

```js
// Flick landing: snap to the target nearest the projection, not the raw position.
const project = (v, d = 0.998) => (v / 1000) * d / (1 - d);
const projectedEndpoint = currentPosition + project(releaseVelocity);
// Progressive resistance at boundaries (iOS overscroll feel):
const rubberband = (overshoot, dimension, c = 0.55) =>
  (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
```


## 5. Gestures & Physicality

- **Kill latency.** Respond on `pointerdown`, not release; lag destroys directness. Feedback is
  continuous *during* the interaction, not just at the end.
- **1:1 tracking.** Content moves with the pointer the whole way. Respect the grab offset — snapping
  to the element's center on grab breaks the illusion immediately.
- Call `setPointerCapture()` once the drag starts; guard multi-touch (`if (isDragging) return`).
- Commit thresholds: ~10px hysteresis before a drag commits to a direction; detect plausible
  gestures in parallel from the first move, cancel the losers.
- **Velocity-based dismissal** — a flick is enough:

```js
const velocity = Math.abs(swipeAmount) / timeTaken;   // px per ms
const shouldDismiss = Math.abs(swipeAmount) >= THRESHOLD || velocity > 0.11;
// Then settle with { type: "spring", duration: 0.5, bounce: 0.2 }.
```

- Past boundaries: rubber-band (§4), friction, never a hard wall. Decide reverse-vs-commit by the
  velocity **sign** at release.
- **Exit the way it entered.** Symmetric paths make swipe-to-dismiss obvious; mirror the easing on
  reversible transitions (inverse cubic-bezier control points).
- Entrance physicality: **never `scale(0)`** — start from `scale(0.9–0.97)` + `opacity: 0` (nothing
  appears from nothing); `transform-origin` at the trigger for popovers/dropdowns/menus/tooltips
  (modals exempt, they stay centered); prefer `translateY(100%)` percentages over hardcoded pixels.


## 6. Recipes

Pick the cheapest tool that works: CSS transition → CSS `@starting-style` → CSS animation → WAAPI →
Motion → GSAP (scroll choreography only). Never install a motion library for a fade.

### 6.1 Text-Reveal Mask (line slide-up — the signature premium reveal)

Wrap every line in an overflow-hidden wrapper; the inner span slides up:

```css
.line { display: block; overflow: hidden; }
.line > .inner {
  display: block; transform: translateY(110%);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i) * 50ms);
}
.is-visible .inner { transform: translateY(0); }
```

Trigger once via IntersectionObserver or Motion `whileInView={{ once: true, amount: 0.3 }}`. Fire
once — re-animating on every scroll-by is an interface fighting its reader.

### 6.2 Char-Split Stagger (kinetic type on hover)

Split text into one `<span style="--i:n">` per character (splitting.js or ~15 lines of JS), then:

```css
.char { display: inline-block; transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        transition-delay: calc(var(--i) * 30ms); }
.title:hover .char { transform: translateY(-8px); }
/* Roll-over variant: duplicate the word, stack copies, hover moves chars -100% */
```

### 6.3 Scramble / Decode Text

Interval that replaces chars with random glyphs and resolves left → right:

```js
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";
function scramble(el, finalText, speed = 30) {
  let frame = 0;
  const id = setInterval(() => {
    el.textContent = finalText.split("").map((c, i) =>
      i < frame ? c : CHARS[(Math.random() * CHARS.length) | 0]).join("");
    if (frame++ >= finalText.length) clearInterval(id);
  }, speed);
}
```

Use for hero headlines, labels, hover states. Ready-made: reactbits.dev "ScrambleText". Under
reduced motion render the final text immediately.

### 6.4 Magnetic Button (Lerp)

Canonical recipe (full React component, strength 0.2–0.35, gating): `buttons.md` §7.
Motion facts here: lerp `current += (target - current) * 0.15` in `requestAnimationFrame`, or
Motion `useMotionValue` + `useSpring` — **never `useState` for continuous pointer values**.
Gate to `@media (hover: hover) and (pointer: fine)`; skip on touch and under
`prefers-reduced-motion`.

### 6.5 3D Tilt Card

```js
card.addEventListener("mousemove", e => {
  const r = card.getBoundingClientRect();
  const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
  card.style.transform = `perspective(800px) rotateX(${dy * -8}deg) rotateY(${dx * 8}deg)`;
  card.style.setProperty("--gx", `${(dx + 0.5) * 100}%`);  // glare position
  card.style.setProperty("--gy", `${(dy + 0.5) * 100}%`);
});
card.addEventListener("mouseleave", () => { card.style.transform = "perspective(800px)"; });
```

```css
.card { transition: transform 0.15s ease-out; }
.card::after {  /* glare follows the cursor */
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%),
              rgb(255 255 255 / 0.15), transparent 60%);
}
```

### 6.6 Image Trail

On `mousemove` throttled to cursor distance > 80px: spawn a thumbnail `<img>` at the cursor, animate
`scale(0.9)` + translate drift + `opacity` → 0 over 600ms, then remove from the DOM. Transform +
opacity only; cap live thumbnails at ~6.

### 6.7 Marquee

```css
.marquee { display: flex; overflow: hidden; }
.marquee-track { display: flex; flex-shrink: 0; animation: scroll 20s linear infinite; }
@keyframes scroll { to { transform: translateX(-100%); } }
.marquee:hover .marquee-track { animation-play-state: paused; }
```

Duplicate the track content exactly once (two identical tracks) so `-100%` loops seamlessly.
`linear` is correct here — constant motion. **Max one marquee per page.**

### 6.8 Custom Cursor

`cursor: none` on the zone + fixed div lerped to the pointer (factor 0.15, see §6.4); `scale(2)`
over links; `mix-blend-mode: difference`. Fine-pointer media query only, keep a visible fallback. It
trades accessibility for style — **hard-banned by default (anti-slop-catalog.md §10 #16)**; ship
only on an explicit expressive/editorial brief of Awwwards class, and document the deviation (anti-slop-catalog.md §12).

### 6.9 Sticky Stack (cards pile up while scrolling) — zero JS

```css
.stack-card { position: sticky; top: 0;
  animation: shrink linear both;              /* shrink the card being covered */
  animation-timeline: view(); animation-range: exit 0% exit 100%; }
@keyframes shrink { to { transform: scale(0.92); opacity: 0.55; } }
```

GSAP equivalent when sequencing is needed: `start: "top top"`, `pin: true`, `pinSpacing: false`,
pin every card except the last, drive the previous card's `scale 0.92 / opacity 0.55` from the NEXT
card's trigger. Common failure: trigger fires mid-scroll instead of pinning at the viewport top.

### 6.10 Horizontal-Scroll Section

```css
.h-wrap { height: 300vh; }  /* scroll runway = N × 100vh */
.h-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.h-track { display: flex; height: 100%;
           animation: pan linear both; animation-timeline: scroll(root block); }
@keyframes pan { to { transform: translateX(calc(-100% + 100vw)); } }
```

GSAP fallback for control: pin wrapper, `end: "+=${track.scrollWidth - innerWidth}"`, `scrub: 1`,
`invalidateOnRefresh: true`.

### 6.11 Parallax (CSS scroll-driven first)

```css
.parallax { animation: shift linear both;
            animation-timeline: view(); animation-range: cover 0% cover 100%; }
@keyframes shift { from { transform: translateY(10%); } to { transform: translateY(-10%); } }
@supports not (animation-timeline: view()) {  /* mandatory fallback */
  .parallax { animation: none; transform: none; }
}
```

Rules: only `transform`, never `background-position` (paint per frame); strength 0.1–0.3×, subtle;
wrap in `@media (prefers-reduced-motion: no-preference)` or collapse to static. `animation-range`
keywords: `entry`, `exit`, `cover`, `contain` (+ %); `timeline-scope` + `view-timeline: --name`
tracks element A and animates B. GSAP ScrollTrigger only for play/pause/reverse, sequenced
timelines, or index-based stagger — ~70% of decorative scroll motion is native in 2026.


## 7. Performance: Layout / Paint / Composite

Pipeline: **Style → Layout → Paint → Composite**. Budget: 16.7ms/frame (8ms at 120Hz). Stay as far
right as possible.

| Cost class | Properties | Rule |
|---|---|---|
| Composite (GPU, cheap) | `transform`, `opacity` (+ `clip-path` sanctioned) | The only motion properties |
| Paint (medium) | `color`, `background-color`, `box-shadow`, `filter` | Hover states OK, never per-frame |
| Layout (expensive) | `width`, `height`, `top/left`, `margin`, `font-size` | Never — use `translate`/`scale` equivalents |

Hard rules:

- **`transform` + `opacity` only.** `clip-path` is the sanctioned third; `height` only for
  accordions (measure content height in JS, never animate to `auto`).
- **`transition: all` is banned.** Name the exact properties.
- Motion library: use full transform strings — `animate={{ transform: "translateX(100px)" }}`. The
  `x`/`y`/`scale` shorthands are not hardware-accelerated and drop frames under load.
- Never drive a child's transform from a CSS variable on the parent (style-recalc storm).
- CSS animations beat JS under load (off the main thread). WAAPI for programmatic control at CSS
  performance: `el.animate(keyframes, { duration, fill: "forwards", easing })`.
- `will-change: transform` only while the animation is imminent/running, then remove. Never blanket-
  apply — every layer costs GPU memory (mobile crashes).
- `filter: blur` under 20px (Safari cost); blur/backdrop-filter never on scrolling containers;
  grain/noise only on fixed `pointer-events-none` pseudo-elements; animate a pseudo-element shadow's
  `opacity` instead of the real `box-shadow`.
- Banned: `window.addEventListener("scroll", …)`, `scrollY` in React state, rAF loops touching React
  state, `getBoundingClientRect()` per scroll frame. Use Motion `useScroll`, IntersectionObserver,
  GSAP ScrollTrigger, or CSS `animation-timeline`.
- Stop loops (marquees, canvases) when offscreen via IntersectionObserver.
- Content is visible in the default state — a script error must not hide the page.


## 8. Debug & Audit

### 8.1 The Ten Non-Negotiables (each violation = a finding)

1. **Justified motion** — purpose named, gate passed.
2. **Frequency-appropriate** — no animation on 100+/day actions.
3. **Responsive easing** — `ease-in` on UI is a block.
4. **Sub-300ms UI** — anything longer needs a named reason.
5. **Origin & physical correctness** — trigger-anchored origins, no `scale(0)`.
6. **Interruptibility** — transitions over keyframes on rapid triggers; springs on gestures.
7. **GPU-only properties** — no layout-property animation, no `transition: all`.
8. **Accessibility** — reduced-motion variant shipped, hover gated.
9. **Asymmetric enter/exit** — exit ~60–70% of enter; symmetric paths for dismissables.
10. **Cohesion** — motion matches the product's personality; when in doubt, delete it.

Remedial hierarchy (prefer earlier): 1. Delete → 2. Reduce → 3. Fix easing → 4. Fix
origin/physicality → 5. Make interruptible → 6. Move to GPU → 7. Asymmetric timing →
8. Polish (blur, stagger, `@starting-style`, springs) → 9. A11y & cohesion.

### 8.2 The 8-Category Audit (with pass targets)

1. **Purpose & frequency** — the strongest fix is often deletion.
2. **Easing & duration** — any `ease-in` on UI; UI duration > 300ms; tooltips not instant-after-
   first.
3. **Physicality & origin** — `scale(0)` entrances; pure-fade entrances with no initial transform;
   `transform-origin: center` on trigger-anchored elements (modals exempt); pressables with no
   `:active` feedback.
4. **Interruptibility** — keyframes on toasts/toggles; fixed-duration tweens on gestures; distance-
   only dismissal (target `|distance|/elapsedMs > ~0.11`); hard stops at boundaries.
5. **Performance** — `transition: all` (always a finding); Motion shorthand props on busy pages;
   CSS-variable-driven child transforms; rAF doing CSS's job; blur ≥ 20px.
6. **Accessibility** — reduced-motion that nukes all feedback instead of going gentler; ungated
   `:hover` motion.
7. **Cohesion & tokens** — five near-identical hand-typed cubic-beziers (consolidate); everything-
   entering-at-once; double-exposing crossfades (mask with 2px blur).
8. **Missed opportunities** — teleporting state changes; spatially-connected UI with no origin
   motion; rare delight moments rendered flat.

### 8.3 Feel-check protocol (not optional)

Play at 2–5× duration or step frame-by-frame in the DevTools Animations panel. In slow motion check:
colors crossfade cleanly? easing starts/stops abruptly? transform-origin correct? coordinated
properties in sync? Test gestures on a real device (LAN IP + remote devtools); toggle `prefers-
reduced-motion`; look again the next day with fresh eyes — motion can be mechanically correct and
still feel wrong.


## 9. Library Map

> Full catalog with sizes, decision matrix, and specialty stacks: `animation-libraries.md`. This is the 60-second version.

| Library | Use when | Not for |
|---|---|---|
| **CSS transitions / `@starting-style` / keyframes** | Hover, press, color, mount entries, predetermined loops | Gesture-driven/interrupted motion |
| **WAAPI** (`el.animate`) | Programmatic control, no bundle cost | Complex sequencing |
| **Motion** (motion.dev, `motion/react`) | Springs, layout + exit animations (`AnimatePresence`), gestures, `useScroll`/`useSpring`/`useMotionValue`. The default animation library | A simple fade (use CSS) |
| **GSAP + ScrollTrigger** | Scroll pinning, scrub, sequenced timelines, scrolltelling | UI state changes (use Motion) |
| **splitting.js / GSAP SplitText** | Char/word splitting for kinetic type | — |
| **reactbits.dev / ui.aceternity.com / magicui.design / cult-ui.com** | Copy-paste recipe sources (scramble, trails, cursors) | Unaudited — retune easing/durations to this canon |
| **Sonner / Vaul / Base UI** | Toasts, drawers, popovers — tuned components over hand-rolling | — |

Isolation rules: never mix GSAP/Three.js with Motion in the same component tree — they fight over
the same frames; GSAP lives in dedicated client-leaf components with cleanup (`gsap.context` +
`ctx.revert()`); one smooth-scroll (Lenis) instance max, coupled to the GSAP ticker. Check
`package.json` before importing anything.
