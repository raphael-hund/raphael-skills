# Animation Libraries

> **Load when:** choosing which animation library to install, or deciding whether a dependency justifies its kilobytes — before touching `package.json`.
> **Skip when:** motion rules, recipes, or doctrine are needed (easing, durations, reduced-motion → `motion-and-animation.md`), or no animation is planned.
> **Canonical for:** animation library choice — hierarchy, per-job mapping, decision matrix; the craft itself lives in `motion-and-animation.md`.

The library map for motion: **which library for which job**. Physics, easing, durations, doctrine,
recipes, and audits live in `motion-and-animation.md` — do not duplicate them here. This file picks
the tool; that file teaches the craft. Read this file before adding anything to `package.json`.

**Contents:** 1. The Library Hierarchy · 2. The Big Three · 3. Specialty Libraries by Job ·
4. Decision Matrix · 5. Craft Notes · 6. Anti-Patterns


## 1. The Library Hierarchy

Evaluate in this order. Stop at the first rung that solves the job.

1. **Native CSS / WAAPI first — 0 kB.** CSS transitions/keyframes, CSS scroll-driven animations
   (`animation-timeline: view()` / `scroll()`), View Transitions API, `element.animate()`,
   IntersectionObserver. Runs on the compositor, covers ~80% of everyday motion. Never install a
   dependency for what the platform does for free.
2. **Motion (motion.dev) — the default for React.** Springs, layout/FLIP, exit animations,
   gestures, `useScroll`. Component-level UI motion is its territory.
3. **GSAP — for complex timelines.** Scroll pinning, scrub, sequenced choreography, text splitting.
   Page-level storytelling is its territory.
4. **Specialty libraries — for specialty jobs only.** Lenis, sonner, vaul, Embla, NumberFlow,
   R3F, Paper Shaders… each owns exactly one job. Take them for that job and nothing else.

**Bundle-budget rules:**

- Every library must justify its kilobytes. The question is never "is it good?" but "is the effect
  worth ~X kB gz on this page?"
- Sizes below are min+gzip orders of magnitude — verify with Bundlephobia for your exact version
  and import path before committing.
- Anything above ~30 kB (R3F, Spline, dotLottie, postprocessing) ships behind `next/dynamic` or
  `React.lazy` with `ssr: false`. Never in the initial chunk.
- Tree-shake aggressively: `LazyMotion` for Motion, per-helper imports from drei,
  `@tsparticles/slim`, register only what you use in GSAP.
- Check `package.json` before importing: if the effect already exists in an installed library, use
  that — a second engine for the same concern is a defect.


## 2. The Big Three

### 2.1 CSS-native / WAAPI — the zero-dependency baseline

**When:** hover/focus/press states, simple enter/exit, reveal-on-scroll, parallax, marquees,
page fades. Always the first candidate.

**Cost:** 0 kB. Runs on the compositor; beats JS under load.

```css
/* Reveal-on-scroll, no JS. Safe ONLY inside both gates: content stays visible by default
   for reduced-motion users and for browsers without scroll-driven animations.
   (Canonical pattern: react-tailwind-recipes.md §4; motion-and-animation.md §6.) */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal { animation: in linear both;
              animation-timeline: view(); animation-range: entry 0% entry 40%; }
    @keyframes in { from { opacity: 0; transform: translateY(24px); } }
  }
}
```

```js
// WAAPI for programmatic control at CSS performance:
el.animate([{ opacity: 0 }, { opacity: 1 }],
           { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" });
```

**Limits:** no exit/unmount animation in CSS alone, no springs, no pinning, no complex sequencing.
CSS scroll-driven: Chromium + Safari 26+, Firefox in progress → always `@supports`-fallback.

### 2.2 Motion (motion.dev) — the default for React

**When:** component-level motion — layout/FLIP lists, drag with springs, mount/unmount transitions,
`whileHover/whileTap/whileInView`, scroll-linked values via `useScroll`.

```
npm i motion
```

```jsx
import { motion, AnimatePresence } from "motion/react";   // framer-motion is superseded

<motion.div
  initial={{ opacity: 0, transform: "translateY(8px)" }}
  animate={{ opacity: 1, transform: "translateY(0px)" }}
  exit={{ opacity: 0 }}
  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
/>
```

**Cost:** ~18–35 kB gz depending on features; tree-shake via `LazyMotion` + `domAnimation`.

**Limits:** overkill for pure CSS hover states; loses to GSAP for pinned/scrubbed page-level
choreography. Full transform strings only (`transform: "translateX(...)"`) — the `x`/`y` shorthands
are not hardware-accelerated. React-idiomatic: hooks, `AnimatePresence`, `LayoutGroup`.

### 2.3 GSAP — for complex timelines

**When:** scroll-pinned scenes, scrubbed timelines, sequenced choreography, parallax systems,
text splitting (SplitText), award-site storytelling. React integration via `@gsap/react`'s
`useGSAP()` hook with auto-cleanup.

> **GSAP is 100% free since 3.13 (April 2025, Webflow acquisition)** — including ALL former Club
> plugins: ScrollTrigger, ScrollSmoother, SplitText, Flip, MorphSVG, DrawSVG. License is
> "No Charge" GreenSock, not MIT: free for commercial products, no resale/competing tools.

```
npm i gsap @gsap/react
```

```jsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.to(".box", {
    xPercent: -100,
    ease: "none",
    scrollTrigger: { trigger: ".scene", pin: true, scrub: 1, end: "+=2000" },
  });
});   // auto-cleanup via gsap.context()
```

**Cost:** core ~22–25 kB gz; ScrollTrigger +~12 kB; plugins opt-in (SplitText +~4–6 kB).

**Limits:** imperative/ref-based — not idiomatic for component micro-interactions (use Motion).
Lives in dedicated client-leaf components; never fight Motion over the same element (namespace by
responsibility: GSAP = page choreography, Motion = component state).


## 3. Specialty Libraries by Job

One library per job. If two candidates overlap, the table's "Avoid" column names the loser.

### 3.1 Scroll

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **Lenis** (`lenis`, React: `lenis/react`) | Smooth scroll | ~3–4 kB | Buttery scroll on marketing sites; syncs with GSAP ScrollTrigger & WebGL loops; honors reduced motion by default | Content-heavy apps/dashboards (native scroll is correct); untested `syncTouch` |
| **GSAP ScrollSmoother** | Smooth scroll inside GSAP | +~10 kB | Already GSAP + ScrollTrigger everywhere — zero extra deps | Mixed stacks (Lenis is lighter, framework-agnostic) |
| **Scrollama** | Scrollytelling step detection | ~2 kB | Sticky graphic + stepping text; detection only — pair with Motion/GSAP | Plain reveals (use `whileInView`) |
| **react-scroll-parallax** | Declarative parallax | ~7 kB | Quick parallax layers without GSAP | Scroll-story-grade work (→ ScrollTrigger) |
| **AOS** | Attribute reveals (`data-aos`) | ~5 kB + CSS | Legacy-friendly quick reveals | New work — dated feel; CSS `view-timeline` gives more control |
| ~~locomotive-scroll~~ | — | — | **Dead: repo archived, superseded by Lenis, v5 beta has restrictive licensing.** Never start on it | — |

```jsx
// Lenis + React — one instance max, at the root:
import { ReactLenis } from "lenis/react";

<ReactLenis root options={{ lerp: 0.1 }}>
  <App />
</ReactLenis>
// Sync GSAP to Lenis: lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((t) => lenis.raf(t * 1000));
```

### 3.2 3D / WebGL — the kB-cost warning zone

Everything here is heavy. Lazy-load always (`next/dynamic`, `ssr: false`). Ask first whether a
CSS gradient or a static image does the job.

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **@react-three/fiber** | React renderer for three.js | three ~150–180 kB + ~30–40 kB | **Default for code-owned React 3D**: product configurators, 3D heroes, WebGL scroll scenes | Simple gradients or CSS 3D transforms |
| **@react-three/drei** | R3F helper kit | tree-shake per helper | Almost always alongside R3F — audit imports, it is easy to pull in too much | Blind full imports |
| **@react-three/postprocessing** | PostFX: bloom, DOF, vignette | +~30–60 kB | The "Awwwards look" on hero-grade 3D | Low-end mobile targets (GPU cost) |
| **OGL** | Minimal WebGL framework | ~28 kB | Custom shader planes / image effects where three is too heavy | When CSS/Paper shaders cover it |
| **Paper Shaders** (`@paper-design/shaders-react`) | Ready-made animated shaders as components | small per-component runtime, tree-shake per shader | **Shader backgrounds without writing GLSL** — mesh gradients, dot orbits, noise. Apache-2.0; pin versions (0.0.x breaking changes) | When a CSS gradient suffices |
| **Spline** (`@splinetool/react-spline`) | Designer-authored 3D scenes | **~260 kB gz runtime** (~940 kB min) | A designer owns the 3D asset; events without writing 3D code. Proprietary runtime, external scene hosting | Code-owned scenes (→ R3F); any small decorative effect |
| **Babylon.js** | Game-engine-grade 3D | ~1 MB+ | Games, XR, engineering viewers | Website decoration — always |

### 3.3 Text

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **GSAP SplitText** | Char/word/line splitting with masking + a11y | +~4–6 kB on GSAP | **Best-in-class** reveals; rewritten in 3.13, screen-reader safe, **free since Apr 2025** | If GSAP is not already in the stack |
| **Splitting.js** | Splits text into CSS-var-indexed spans | ~2 kB | CSS-only char/word staggers | Masking / responsive reflow (→ SplitText) |
| **react-type-animation** | Typewriter component | ~3–4 kB | Simple hero typewriter lines | Choreographed reveals |
| **react-use-scramble** | Decode/scramble hook | ~2 kB | Terminal/hacker aesthetics | (GSAP ScrambleTextPlugin if GSAP present) |

### 3.4 Carousels

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **CSS scroll-snap** | Snap scrolling, no JS | 0 kB | **Try first** — image strips, horizontal lists | Physics, buttons, autoplay, infinite loop |
| **Embla** (`embla-carousel-react`) | Headless carousel engine | ~5–8 kB | **Default React carousel** — design-system-friendly (shadcn/ui is built on it) | Cases scroll-snap already covers |
| **Swiper** | Feature-complete slider | ~30–35 kB | Built-in effect buffet (coverflow, cube) | Design-system work — heavier, less "yours" than Embla |
| **Keen Slider / Splide** | Alternatives | ~8 / ~12 kB | Touch physics (Keen), a11y defaults (Splide) | Building carousel physics from scratch — never |

### 3.5 Feedback / Micro-Interaction

| Library | Job | ~Size (gz) | Note |
|---|---|---|---|
| **sonner** | Toasts | ~4–5 kB | **Default. The craft standard** (Vercel/shadcn): stacked, swipeable, `toast.promise` |
| **vaul** | Drawers / bottom sheets | ~6 kB | **Default drawer.** Never hand-roll sheet drag physics |
| **canvas-confetti** | Confetti bursts | ~5 kB | **Default celebration.** One-liner, battle-tested |
| **lottie-react / dotLottie** | Designer-authored vector animation | lottie-web ~50–60 kB; dotLottie engine ~150 kB WASM | Prefer **dotLottie** (`.lottie`, compression + state machines) for new work; audit size either way |
| **ldrs** | Loaders/spinners | ~1–3 kB per loader | **Default loader pack** — 40+ web components, register per-loader |
| **react-loading-skeleton** | Content-shaped placeholders | ~3 kB | **Default skeleton**; a spinner is fine when it honestly communicates state |
| **BProgress** (`@bprogress/react` / `/next`) | Top-of-page progress bar | ~1–2 kB | **Use BProgress, not `nprogress`** — the original (and `next-nprogress-bar`) are unmaintained 5+ years |

### 3.6 Gestures

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **Motion `drag` (built-in)** | Drag with springs/constraints | included | **Try first** — covers most draggable UI | — |
| **@use-gesture/react** | Full gesture system: drag, pinch, wheel, hover | ~8–10 kB | **Default for custom gestures** — multi-pointer, rubber-banding; pairs with Motion/react-spring | Simple swipe-direction detection |
| **react-swipeable** | Swipe direction only | ~4 kB | "Which way did they swipe" | Anything with physics/drag feel |
| **interact.js** | Drag-drop builders, resize, snapping | ~30 kB | Whiteboards, builders with inertia/snapping | UI flourishes (Motion `drag` suffices) |

### 3.7 Numbers

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **NumberFlow** (`@number-flow/react`, by Maxwell Barvian) | Digit-spin transitions, Intl formatting, locales, WAAPI-based | ~10–15 kB | **Default number animation** — the Linear/Vercel-style digit roll; respects reduced motion | One-time landing-page count-ups |
| **react-countup / countup.js** | One-shot count-up | ~3–4 kB | Simple stat reveals on scroll into view | Manual `setInterval` counters — never |

### 3.8 Particles

| Library | Job | ~Size (gz) | Use when | Avoid |
|---|---|---|---|---|
| **tsParticles** (`@tsparticles/react`, use `/slim`) | Modular particle engine | ~40 kB full, ~20 kB slim | When particles ARE the design | Most cases — a static shader/CSS gradient is classier at a fraction of the cost |
| **canvas-confetti** | Burst particles | ~5 kB | The right "particles" 90% of the time | tsParticles for a celebration burst |
| ~~particles.js~~ | — | — | **Deprecated** — superseded by tsParticles | — |

### 3.9 Page Transitions

| Library / Pattern | Job | ~Size | Use when | Avoid |
|---|---|---|---|---|
| **View Transitions API (raw)** | `document.startViewTransition` morphs | 0 kB | Theme toggles, tab switches, any DOM-state morph; feature-detect, fall back to instant swap | — |
| **next-view-transitions** | View Transitions wired into Next.js App Router | ~1 kB | **Default for Next.js page transitions** — native, tiny, progressive (`view-transition-name` for shared-element morphs) | Heavy router-transition hacks |
| **Motion `AnimatePresence` pattern** | Exit→enter choreography around routes | incl. w/ Motion | In-page state transitions | Route nav on App Router — exit animations fight streaming; use View Transitions there |
| **Astro View Transitions** | Reference implementation | built-in | Study it for `::view-transition` CSS patterns | N/A for React projects |

```jsx
// next-view-transitions — wrap once in the root layout:
import { ViewTransitions } from "next-view-transitions";

<ViewTransitions>
  <html><body>{children}</body></html>
</ViewTransitions>
// Then: <Link> from "next-view-transitions"; CSS via ::view-transition-old/new.
```


## 4. Decision Matrix

First pass for every motion task. "First choice" wins unless a constraint in "Avoid" applies.

| Job | First choice | Alternative | Avoid / Overkill |
|---|---|---|---|
| Scroll reveal (fade/slide in) | CSS `animation-timeline: view()` or Motion `whileInView` | GSAP ScrollTrigger (batch), AOS (legacy) | react-scroll-parallax for plain reveals; any 3D lib |
| Scroll story / scrollytelling (pinned, scrubbed) | **GSAP ScrollTrigger** (+ ScrollSmoother or Lenis) | Scrollama (steps) + Motion; R3F `ScrollControls` for WebGL stories | AOS, CSS scroll-driven (no pinning) |
| Smooth scrolling feel | **Lenis** (`lenis/react`) | ScrollSmoother if all-GSAP stack | locomotive-scroll (dead); smoothing on data-heavy apps |
| Drag / swipe / gesture physics | Motion `drag` (simple) → **@use-gesture/react** (+ Motion/react-spring) for advanced | react-swipeable (direction only), interact.js (drag-drop builders) | Hand-rolled pointer math |
| Toast / notification | **sonner** | — (it's the standard) | Custom toast systems, react-toastify (dated feel) |
| Drawer / bottom sheet | **vaul** | Motion DIY for exotic cases | Raw drag math |
| 3D hero / product scene (code-owned) | **@react-three/fiber + drei** (+ postprocessing for polish) | Spline if designer-authored; Paper Shaders for 2D shader looks | Babylon (overkill), raw three in React (lifecycle pain) |
| Shader background / gradient | **@paper-design/shaders-react** | OGL (custom GLSL), plain CSS gradients (simplest) | three.js for a static gradient |
| Text effect (char/word reveal) | **GSAP SplitText** (free since 2025) | Splitting.js + CSS; Motion `staggerChildren` on manual spans | Typewriter libs for reveals |
| Typewriter / scramble | react-type-animation / react-use-scramble | GSAP ScrambleTextPlugin (if GSAP present) | — |
| Page transition (Next.js) | **next-view-transitions** (View Transitions API) | Motion `AnimatePresence` for in-page state morphs | Heavy router-transition hacks |
| Loading (indicator) | **ldrs** (spinners), **react-loading-skeleton** (content), **@bprogress/** (route bar) | SVG spinners (tailored) | nprogress (unmaintained), spinners where skeletons fit |
| Carousel / slider | **embla-carousel-react** | CSS scroll-snap (simple), Swiper (feature buffet), Splide (a11y) | Building physics from scratch |
| Number animation | **@number-flow/react** | react-countup (one-shot stats) | Manual interval counters |
| Confetti / celebration | **canvas-confetti** | react-confetti (component form), tsParticles (heavy) | tsParticles for a burst |
| Vector/icon animation (designer-authored) | **@lottiefiles/dotlottie-react** (.lottie) | lottie-react (lottie-web), Rive (strong alternative) | GIF/video for UI animation |
| Layout/FLIP animation (lists, reorder) | Motion `layout` / `LayoutGroup` | AutoAnimate (zero-config), GSAP Flip | Manual FLIP math |
| Exit/unmount animation | Motion `AnimatePresence` | View Transitions for route-level | CSS-only (can't do exit) |
| Marquee / infinite scroll | CSS keyframes (translateX loop) | Motion `useAnimationFrame` | Any 3D/particle lib |


## 5. Craft Notes

**Craft score (1–10)** — used throughout the tables: how much design-craft ceiling a library
enables (feel, polish, expressive range) relative to effort.
10 = industry-defining craft tool (GSAP, three/R3F, SplitText) ·
7–9 = excellent for its job (Motion 9, Lenis 9, sonner 9, vaul 9, NumberFlow 9, Paper Shaders 9) ·
4–6 = utilitarian (AOS 4, typewriter libs 4, AutoAnimate 6) ·
1–3 = legacy/avoid (locomotive-scroll 2, particles.js 2).

Use the score to pick between two candidates for the same job — never as a reason to add a library
you do not need. A 10-scoring tool for the wrong job is still wrong.

**Libraries do not make good animations.** They provide springs, timelines, and gestures — the
easing curve, the 300ms budget, the interruptibility, the reduced-motion variant are yours. Every
choice made with this file must then pass the doctrine in `motion-and-animation.md`: the Gate
(frequency/purpose), the Easing Canon, Duration Budgets, and the Ten Non-Negotiables. Installing
sonner does not excuse a 400ms ease-in dropdown elsewhere.

**Canonical React design-craft stack** (2025/26):
`motion` + `gsap`/`@gsap/react` (marketing choreography only) + `lenis` + `sonner` + `vaul` +
`embla-carousel-react` + `@number-flow/react` + `canvas-confetti` + `ldrs` +
`react-loading-skeleton` + `@bprogress/next` + (`@react-three/fiber` + `drei` **or**
`@paper-design/shaders-react` when 3D/shaders are needed) + `next-view-transitions` on Next.js.

**Accessibility & licenses:** Lenis, NumberFlow, and Motion (`useReducedMotion`) gate on
`prefers-reduced-motion` natively — everything else is your job. GSAP is free but not MIT (No-Charge
license: fine for products, not for competing animation tools). Paper Shaders is Apache-2.0 (pin
0.0.x versions). Spline runtime is proprietary-but-free with external scene hosting implications.


## 6. Anti-Patterns

1. **Library stacking.** GSAP + Motion + react-spring in the same project — three engines, three
   mental models, ~80 kB, and frame-fighting when two touch the same element. Rule: one motion
   engine per concern (Motion = components, GSAP = page choreography), namespace by responsibility,
   never animate the same element with two engines. react-spring: largely superseded by Motion —
   only adopt spring-physics-first if the team explicitly wants it.
2. **The 260 kB hero.** Shipping Spline's ~260 kB gz runtime (+ external scene hosting) for one
   decorative hero. A Paper Shader, an OGL plane, or a CSS gradient delivers the same class at 1–5%
   of the cost. Same class of sin: three.js for a static gradient, tsParticles full bundle for
   dust, Babylon for a website.
3. **An animation framework for a fade.** Motion or GSAP installed to do `opacity: 0 → 1` on hover
   or a simple mount entrance. That is a CSS transition — 0 kB, compositor-native, and already
   written. Install libraries for what CSS cannot do: springs, exit animations, scrub, splitting.
4. **Dead libraries.** Never start on: `locomotive-scroll` (archived, → Lenis), `particles.js`
   (→ tsParticles), `nprogress` / `next-nprogress-bar` (unmaintained 5+ years, → `@bprogress/*`),
   `popmotion` (its DNA lives in Motion), `@studio-freight/*` packages (→ `lenis`). Finding any of
   these in `package.json` on a new project is a finding.
5. **Untracked bundle creep.** R3F/Spline/dotLottie in the initial chunk, full drei imports,
   `@tsparticles` full instead of `/slim`, un-audited lottie-web. Lazy-load, tree-shake, and verify
   with Bundlephobia — bundle discipline is part of the animation, not ops hygiene.
