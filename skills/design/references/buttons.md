# Button Engineering — Complete Reference

> **Load when:** any interactive control is being built or restyled — buttons, CTAs, submit/toggle controls.
> **Skip when:** no interactive control is being built; layout, color, type, or asset work only.
> **Canonical for:** button metrics, height scale, variant ladder, state matrix, effect stacks, magnetic button §7.

Build buttons as engineered components: fixed height scale, tokenized variants, a complete state matrix, and layered effect stacks. All values are forensic reconstruction targets from production autopsies (Agex, Synais, Meska, Stride, Xuizver, Finova, Vorcel, Agentos, Cybercube, Calendar card) and live-site analyses (Oura, Miles, Uber, Tend, Bond Vet).

**Universal rules:** min touch target 44×44px (expand hit area with pseudo-element if the visual is smaller); label never wraps; one primary per view; every interactive state is designed, never browser-default.

**Contents:** §1 Anatomy & Metrics · §2 Height Scale · §3 Radius per Size · §4 Variant Ladder · §5 State Matrix · §6 Effect Stacks per Variant · §7 Hover Micro-Interactions · §8 Primary:Secondary Pairing · §9 Anti-Patterns · §10 Production Recipes (Glass / Pill-CTA / Black-White / Coffee-Luxe / Island)

---

## 1. Anatomy & Metrics

```
┌──────────────────────────────────────────┐
│  [icon 16–20px] gap:8px Label gap:8px [→]│  ← padding-x
└──────────────────────────────────────────┘
        height H, radius R(H), label = 0.28–0.32 × H
```

- **Padding math:** `padding-inline ≈ 0.5–0.75 × height` (≤44px tall) or fixed 24–36px on large CTAs. Verified: Agex submit 14×36, Meska 16×32, Xuizver 14×28, Synais 16×32, Cybercube 14×28.
- **Icon spacing:** icon 16–20px (stroke 1.5–2px), `gap: 8px` icon↔label. Trailing arrow gets `gap: 8px` + `translateX` on hover. Buttons in a group: `gap: 12px` (Meska, Synais hero pairs).
- **Vertical rhythm:** label optically centered — if the font sits low, correct with `padding-top: 1px` or `leading-none`, never by eyeballing margins.
- **Layout:** `display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; user-select: none;`.

## 2. Height Scale

| Size | Height | padding-x | Label | Weight | Icon | Use |
|---|---|---|---|---|---|---|
| xs | 32px | 12–16px | 12–13px | 500–600 | 14–16px | Table actions, chips, dense toolbars |
| sm | 36px | 16–20px | 13–14px | 500–600 | 16px | Nav secondary, card footers |
| md | 40px | 20–24px | 14–15px | 500–600 | 16–18px | Default product button |
| lg | 44px | 24–28px | 15–16px | 600 | 18px | Nav primary, min touch target |
| xl | 48px | 28–32px | 15–16px | 600 | 18–20px | Hero CTA (Synais 52px card CTA, Finova primary) |
| 2xl | 56px | 32–36px | 16–17px | 600 | 20px | Marketing mega-CTA, pricing cards |

Compact nav variants mirror the hero pair at ~60–75% height (Synais nav Log in/Sign up ≈ 44px vs hero 48–52px; Agex nav "Log in" 10×24 vs submit 14×36).

## 3. Radius per Size

| Height | Sharp dialect | Balanced dialect | Pill |
|---|---|---|---|
| 32–36px | 0–6px | 6–8px | 999px |
| 40–44px | 6–8px | 8–10px | 999px |
| 48–56px | 8–10px | 10–12px | 999px |

Rules:
- Radius grows with size: 8px on a 32px chip reads rounder than 8px on a 56px CTA. Scale accordingly (Stride: 8–12px buttons; Synais: 8px small, 10px card CTA).
- **Dialect consistency:** marketing site sharp (Xuizver 6–8px, Dataguard 0px, Cybercube 6–8px) vs product app soft (16px+). Never mix dialects in one row.
- Full pill = `999px` (Uber, Oura, Tend, Bond Vet, Meska — dominant marketing geometry). Icon-only circular = `999px` at equal width/height (Calendar 44px FAB, Stride 64px back-to-top).
- Squircle chips (section markers, tags): 8–10px, *not* full pill (Synais eyebrow chips, 8px).

## 4. Variant Ladder

Hierarchy = fill strength. One row per decision level; never two variants of equal weight side by side.

| Variant | Fill | Text | Border | Shadow | Use / Evidence |
|---|---|---|---|---|---|
| Primary solid | Accent or ink | Inverse (white/cream) | none | Colored, α 0.25–0.4 | Agex `#2F6BFF`, Meska `#0E3B1E`, Synais `#3B241D` |
| Secondary tonal | Accent at 8–15% or warm neutral | Accent-dark / ink | none (modern) | none or hairline | Meska `#F2FBC9`, Finova beige `#E2DED2` — "tonal, not outlined" |
| Outline | transparent/white | ink | 1px solid (ink 0.1–1.0) | minimal | Xuizver white + 1px black; Synais white + `rgba(30,18,14,0.10)` |
| Ghost | transparent → hover fill 0.06–0.08 | ink 60–100% | none | none | Nav links (Agex hover `rgba(255,255,255,0.08)`) |
| Pill | any of the above | — | — | — | Geometry, not a color: radius 999 |
| Icon-only | tonal/ghost | icon 16–20px | optional hairline | optional | 32/40/44px square or circle; chevrons, FAB, overflow |
| Link-style | none | accent color | underline on hover | none | 11–13px caps tracked +4–6% + arrow (Stride "EXPLORE OUR MENU →", `#2D91CF`) |
| Segmented toggle | track tonal, active segment solid/ink | active inverse | none | active: `0 2px 8px α0.3` | Synais Monthly/Annually (track `#F4EDE0` r10 p4, segment `#2E1A16` r8); Stride Daily/Weekly/Monthly |

**Segmented toggle spec:** track padding 4px, track radius = segment radius + 2px (12/10 Stride, 10/8 Synais — nested radius math applies to controls too); active segment gets its own small colored shadow.

## 5. State Matrix

Exact deltas per state. Durations: color 150–200ms, transform 150–250ms, shadow crossfade 200ms. Easing `cubic-bezier(0.32, 0.72, 0, 1)` for movement, `ease-out` for color.

| State | Primary solid | Tonal | Outline | Ghost |
|---|---|---|---|---|
| Default | token fill | token fill | 1px border | transparent |
| Hover | lighten/darken 6–10% (Agex `#2F6BFF→#3E7DFF`; Meska `#0E3B1E→#164A28`) + optional `translateY(-1px)` + glow/shadow +20% | deepen fill one tier (`#F2FBC9→#E4F7B2`), border may appear | fill appears α 0.04–0.06, border darkens | bg α 0.06–0.08 pill |
| Active/pressed | `scale(0.98)` or `translateY(1px)`, shadow collapses to contact layer only | same | same | same |
| Focus-visible | `outline: 2px solid accent; outline-offset: 2px` (or `box-shadow: 0 0 0 2px bg, 0 0 0 4px accent`) — ALWAYS visible, never `outline: none` without replacement | same | same | same |
| Disabled | `opacity: 0.4–0.5` + `cursor: not-allowed` + no shadow; or desaturated fill (gray, α 0.12) — never just "gray text" | same | same | same |
| Loading | label → spinner (16–18px, `border-top` spinner or SVG circle), width LOCKED (measure label first, set explicit width), `pointer-events: none`, `aria-busy="true"` | same | same | — |

```css
.btn {
  transition: background-color 180ms ease-out, transform 180ms cubic-bezier(0.32,0.72,0,1),
              box-shadow 200ms ease-out, color 180ms ease-out; /* NEVER "all" */
}
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: scale(0.98); transition-duration: 80ms; }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn[disabled] { opacity: 0.45; cursor: not-allowed; box-shadow: none; }
```

## 6. Effect Stacks per Variant

**Premium primary (gradient fill + inner glow + colored outer shadow)** — the Agex/Calendar formula:
```css
.btn-primary {
  background: linear-gradient(180deg, #3a77ff, #2a5be4);       /* subtle 180° gradient */
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.25),                      /* inner top highlight */
    inset 0 -1px 0 rgb(0 0 0 / 0.15),
    0 6px 16px rgb(47 107 255 / 0.35);                          /* colored shadow = fill hue */
}
.btn-primary:hover {
  background: linear-gradient(180deg, #4a85ff, #3366ee);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.3),
              0 6px 16px rgb(47 107 255 / 0.35),
              0 0 20px rgb(47 107 255 / 0.5);                   /* hover glow appears */
}
```
Rules: gradient barely visible (depth, not skeuomorphism); colored shadow alpha 0.25–0.4, blur ≈ 2–3× Y-offset (Calendar orange `0 6px 16px rgba(245,130,11,0.35)`); hover adds glow, never swaps hue.

**Outline with gradient border** (see figma-effects-cookbook §9): technique B — `background: linear-gradient(fill) padding-box, linear-gradient(180deg, accent/0.7, accent/0.05) border-box; border: 1px solid transparent;`.

**Ghost:** zero effects. Separation purely via hover fill. No shadow ever.

**Icon-only FAB:** colored shadow + `inset 0 1px 0 white/0.35` top candy highlight (Calendar "+" 44px: `0 6px 16px rgba(245,130,11,0.4)`).

**Dark tonal (Cybercube):** fill `#1D1D1D`, 1px `#333` border, `inset 0 1px 0 white/0.04`, faint accent edge glow `0 0 12px red/0.25` — the only glow on the page, reserved for the single CTA.

## 7. Hover Micro-Interactions

Pick ONE per button family. All transform/opacity only.

**Magnetic button** (cursor attraction — hero CTAs only):
```tsx
import { useRef } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`; // 0.2–0.35 strength
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transition = "transform 500ms cubic-bezier(0.32,0.72,0,1)"; // spring back
    el.style.transform = "translate(0,0)";
    setTimeout(() => (el.style.transition = ""), 500);
  };
  return <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</button>;
}
```
Smoother variant: lerp in `requestAnimationFrame` (`current += (target - current) * 0.15`, see motion-and-animation.md §6.4) or motion.dev `useSpring`. Gate to `@media (hover: hover) and (pointer: fine)` (never breakpoint-based) and disable under `prefers-reduced-motion`.

**Arrow-slide:** trailing arrow `transition: transform 200ms`; hover `translateX(4px)`. For diagonal (Island buttons): `translate(2px, -2px) scale(1.05)`.

**Char-split roll:** two stacked copies of the label; hover translates upper chars `translateY(-100%)` out, lower in, stagger via `transition-delay: calc(var(--i) * 30ms)`. Wrap each char in `<span style={{"--i": idx}}>`. Libs: splitting.js, GSAP SplitText.

**TranslateY-lift:** `translateY(-1px to -2px)` + shadow layer crossfade (`::after` with hover shadow, `opacity 0→1`, 200ms). Never animate `box-shadow` directly.

## 8. Primary : Secondary Pairing

- **Same geometry, different fill strength** — the dominant pattern (Meska, Synais, Finova, Xuizver, Vorcel): identical height/radius/padding, hierarchy via fill contrast only.
- **Gap 12px** between the pair (Meska, Synais).
- **Inversion trick:** on the emphasized card, give the primary the *dark* treatment and others white (Synais recommended plan: dark button on dark card, white buttons on cream cards — hierarchy via contrast direction).
- **Nav mirrors hero:** same pair, compact size (Synais, Xuizver nav = hero CTA geometry at ~75%).
- Max 2 buttons per cluster; third action becomes a link-style.

## 9. Anti-Patterns

- `transition: all` — animates layout properties accidentally; list properties explicitly.
- Missing `:focus-visible` — keyboard users get nothing. `outline: none` without a replacement ring = fail.
- Radius mixing without semantics: 8px and 999px buttons in one row (unless pill = tag, sharp = action — declare the rule).
- Pure black single shadows `rgba(0,0,0,0.3)` (the generic `shadow-md` tell) — use 2–3 tinted layers.
- Full-width primary outside of cards/forms; marketing CTAs stay `width: auto`.
- Two primaries in one viewport; gradient fill + gradient border + glow simultaneously (pick 2).
- `50%` radius on rectangular buttons (ellipse artifact) — use `999px`.
- Animating `width/height/padding` on hover; text wrap in labels; icon naked next to label without consistent gap.
- Loading state that changes button width (layout shift) — lock width before swapping to spinner.
- Sharp site-radius buttons inside soft app-radius product UI (dialect collision, Xuizver keeps them in separate zones).

## 10. Production Recipes

### 10.1 Glass Button (Agex)
Dark glass pill over the hero glow: blur, gradient border, inner highlight, hover glow.
```css
.btn-glass {
  height: 48px; padding: 0 32px; border-radius: 999px;
  display: inline-flex; align-items: center; gap: 8px;
  background: rgb(15 30 70 / 0.45);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid transparent;
  background-image: linear-gradient(180deg, rgb(140 170 255 / 0.5), rgb(140 170 255 / 0.05));
  background-origin: border-box; background-clip: padding-box, border-box;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.12);
  color: #fff; font-size: 15px; font-weight: 600;
  transition: box-shadow 200ms ease-out, background-color 180ms ease-out;
}
.btn-glass:hover { box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 0 20px rgb(47 107 255 / 0.6); }
```
Companion chip ("View detail"): `rgba(255,255,255,0.06)` fill, 1px `rgba(255,255,255,0.12)` border, 12px label, radius 999.

### 10.2 Pill CTA (Oura / Miles)
Matte solid pill, zero chrome — confidence through restraint.
```css
.btn-pill {
  height: 48px; padding: 0 28px; border-radius: 999px;
  background: #1a1a1a; /* Oura near-black — or accent blue #2A72DE / Miles #2290FF */
  color: #fff; font-size: 15px; font-weight: 600;
  border: none; box-shadow: none;
  transition: background-color 180ms ease-out, transform 180ms cubic-bezier(0.32,0.72,0,1);
}
.btn-pill:hover { background: #333; transform: translateY(-1px); }
.btn-pill:active { transform: scale(0.98); }
```
Uber variant: white pill + black text on black surfaces (inversion = the entire hierarchy). Pair with arrow-slide on the trailing `→`.

### 10.3 Black / White Pair (Xuizver)
Corporate-sharp duo — radius 6–8px, strict monochrome.
```css
.btn-black { /* "Get Started" */
  height: 44px; padding: 0 28px; border-radius: 8px;
  background: #000; color: #fff; font-size: 14px; font-weight: 500;
  border: none;
}
.btn-black:hover { background: #1f1f1f; }
.btn-white { /* "Talk To Sales" — identical geometry */
  height: 44px; padding: 0 28px; border-radius: 8px;
  background: #fff; color: #000; font-size: 14px; font-weight: 500;
  border: 1px solid #000;
}
.btn-white:hover { background: #f5f5f5; }
```
Vorcel softens the same pair: charcoal `#262626` instead of pure black, border `#E5E5E5`, plus `inset 0 1px 0 white/0.06` sheen on the primary. Radius story: these sharp buttons live in marketing chrome only — the product UI inside uses 16px+ radii.

### 10.4 Coffee-Luxe (Synais)
Warm editorial primary — full-width inside cards, colored maroon shadow.
```css
.btn-coffee {
  width: 100%; height: 52px; border-radius: 10px; /* full width = card padding box */
  background: #3b241d; color: #f4ede0;
  font-size: 15px; font-weight: 600;
  border: none;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 8px 20px rgb(74 35 32 / 0.35);
  transition: background-color 180ms ease-out, transform 180ms cubic-bezier(0.32,0.72,0,1), box-shadow 200ms ease-out;
}
.btn-coffee:hover { background: #4a2e24; transform: translateY(-1px); }
.btn-coffee:active { transform: scale(0.98); }
```
Secondary on cream cards: identical geometry, `#fff` fill, `#1E120E` label, 1px `rgba(30,18,14,0.08)` border, `0 2px 8px rgba(30,18,14,0.08)`. Recommended-card inversion: the dark button belongs on the dark card.

### 10.5 Island Button (taste "soft" skill)
Nested icon architecture: the trailing arrow lives in its own circular island flush with the button's inner padding — never naked next to the text.
```tsx
export function IslandButton({ label }: { label: string }) {
  return (
    <button className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5
      bg-neutral-900 text-white text-sm font-medium
      transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]
      hover:-translate-y-px active:scale-[0.98]">
      <span>{label}</span>
      <span className="grid size-8 place-items-center rounded-full bg-white/10
        transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
        <ArrowUpRightIcon className="size-4" />
      </span>
    </button>
  );
}
```
Geometry: outer pill `rounded-full px-6 py-3` (or `py-1.5` when the icon island sets the height); island circle diameter = height − 2×inner padding (e.g. 48px button, 6px padding → 36px island). On hover the island translates diagonally (+x, −y) and scales 1.05. Pair with the **Double-Bezel** card context: outer shell `bg-black/5 ring-1 ring-black/5 p-1.5 rounded-[2rem]` + inner core `rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]` — concentric radius math, machined-hardware feel.

---

## Pre-Ship Checklist
- Height from the 32/36/40/44/48/56 scale; radius from the dialect table; padding-x ≈ 0.5–0.75 × height.
- All 6 states implemented (default/hover/active/focus-visible/disabled/loading); focus ring visible against both light and dark surfaces.
- Transitions property-listed (never `all`); movement ≤ 250ms with `cubic-bezier(0.32,0.72,0,1)`; `active: scale(0.98)`.
- One primary per view; primary:secondary = same geometry, different fill; group gap 12px.
- Shadows tinted to the fill (α 0.25–0.4, blur 2–3× Y); hover adds glow or lift, never a hue swap.
- Reduced-motion: disable magnetic/lift/char-split; keep color transitions.
