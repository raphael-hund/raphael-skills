# React + Tailwind v4 Production Recipes

> **Load when:** writing React + Tailwind v4 code — token setup, font loading, component recipes, motion setup, pre-ship quality gates (Mode D).
> **Skip when:** design decisions are not yet made (color → `color-logic.md`, motion rules → `motion-and-animation.md`, library choice → `react-component-libraries.md`) or the stack is not React/Tailwind.
> **Canonical for:** Tailwind v4 token setup §1, production component recipes §3, quality gates §7.

Code-first reference for shipping production-grade React UI. Every snippet assumes the token setup in §1. Never hardcode hex, never emit placeholders (`// ...`), never ship before the §7 gates pass. Stack: React 19+, Tailwind CSS v4, TypeScript.

## Contents

1. [Token Setup](#1-token-setup-tailwind-v4) — `@theme inline`, primitive → semantic → component, OKLCH, dark mode
2. [Font Loading](#2-font-loading) — variable fonts, `next/font`, Adobe Fonts, fluid type
3. [Component Recipes](#3-component-recipes) — navbar, button, cards, pricing, testimonials, footer, marquee, header, toggle
4. [Motion Setup](#4-motion-setup) — motion.dev, CSS scroll-driven fallback, reduced-motion guard
5. [Layout Disciplines](#5-layout-disciplines) — z-index scale, breakpoints, container, transition/will-change rules
6. [Library Map](#6-library-map) — shadcn/ui, 21st.dev, Magic UI, Aceternity, react-bits
7. [Quality Gates](#7-quality-gates-pre-flight) — mandatory checklist before output

---

## 1. Token Setup (Tailwind v4)

Three layers: **primitive** (raw values, never used in components) → **semantic** (purpose aliases, themed per mode) → **component** (one-off bindings). Define colors in OKLCH (perceptually uniform, wide gamut). Components reference semantic utilities only (`bg-primary`, `text-muted-foreground`).

```css
/* app/globals.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *)); /* class strategy; replaces media-based default */

/* ---- Layer 1: PRIMITIVES — raw OKLCH scales. Components never touch these. ---- */
@theme {
  --color-neutral-0:   oklch(99.5% 0.002 250);
  --color-neutral-50:  oklch(97.5% 0.004 250);
  --color-neutral-100: oklch(94.5% 0.006 250);
  --color-neutral-200: oklch(90.5% 0.008 250);
  --color-neutral-500: oklch(55%   0.02  250);
  --color-neutral-900: oklch(21%   0.015 250);
  --color-neutral-950: oklch(14%   0.012 250);
  /* ONE accent, fully committed. Chroma < 0.25 keeps saturation disciplined. */
  --color-accent-400:  oklch(70% 0.18 230);
  --color-accent-500:  oklch(62% 0.20 230);
  --color-accent-600:  oklch(54% 0.19 230);
  --radius: 0.75rem; /* shape consistency lock: one radius system per page */
}

/* ---- Layer 2: SEMANTIC — purpose aliases, overridden per mode. ---- */
:root {
  --background: var(--color-neutral-0);
  --foreground: var(--color-neutral-900);
  --card: oklch(100% 0 0);
  --card-foreground: var(--color-neutral-900);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-500);
  --border: var(--color-neutral-200);
  --primary: var(--color-accent-600);
  --primary-foreground: oklch(99% 0 0);
  --secondary: var(--color-neutral-100); /* tonal fill, ~8-12% L step from background — never an outline */
  --secondary-foreground: var(--color-neutral-900);
  --accent: var(--color-neutral-100); /* hover/selection tint of primary context */
  --accent-foreground: var(--color-neutral-900);
  --destructive: oklch(55% 0.2 25);
  --destructive-foreground: oklch(99% 0 0);
  --ring: var(--color-accent-500);
  /* Layer 3: COMPONENT — bind component slots to semantics, not primitives. */
  --navbar-bg: color-mix(in oklch, var(--background) 80%, transparent);
  --button-primary-glow: color-mix(in oklch, var(--primary) 35%, transparent);
}
.dark {
  /* Dark mode = lighter/desaturated tonal variants, never inverted colors. No pure #000. */
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-100);
  --card: oklch(17% 0.012 250);
  --card-foreground: var(--color-neutral-100);
  --muted: oklch(22% 0.012 250);
  --muted-foreground: oklch(68% 0.015 250);
  --border: oklch(26% 0.012 250);
  --primary: var(--color-accent-400);
  --primary-foreground: var(--color-neutral-950);
  --secondary: oklch(22% 0.012 250);
  --secondary-foreground: var(--color-neutral-100);
  --accent: oklch(22% 0.012 250);
  --accent-foreground: var(--color-neutral-100);
  --destructive: oklch(62% 0.19 25);
  --destructive-foreground: var(--color-neutral-950);
  --ring: var(--color-accent-400);
  --navbar-bg: color-mix(in oklch, var(--background) 75%, transparent);
  --button-primary-glow: color-mix(in oklch, var(--primary) 30%, transparent);
}

/* ---- Bridge: expose semantics as utilities (bg-primary, outline-ring, ...) ---- */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-ring: var(--ring);
}
@layer base { body { background: var(--background); color: var(--foreground); } }
```

**Dark-mode strategy — pick one per project:**

- **Class strategy (default, apps with a toggle):** the `@custom-variant` line above + `next-themes`; system preference respected via `defaultTheme="system"`.

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body>
    </html>
  );
}
```

- **Media strategy (static sites, zero JS):** delete `@custom-variant` and the `.dark` block; wrap dark tokens in `@media (prefers-color-scheme: dark) { :root { ... } }`.

Design both modes together; verify contrast per mode independently — dark mode is a palette, not a filter.

---

## 2. Font Loading

Variable fonts only; `font-display: swap` (kills FOIT); self-host or `next/font` — never `<link>` to Google Fonts in production; load only the weights you use.

```tsx
// app/layout.tsx — next/font: self-hosted at build time, zero CLS, zero network waterfall
import { Geist, Geist_Mono } from "next/font/google";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// <html className={`${sans.variable} ${mono.variable}`}>
```

```css
/* globals.css — wire font variables into the theme */
@theme inline {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}

/* Fluid type via clamp() — companion keys set line-height/tracking; used as text-display etc. */
@theme {
  --text-display: clamp(2.5rem, 1.4rem + 4.5vw, 4.5rem);
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.02em; /* negative tracking on large sizes only */
  --text-headline: clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem);
  --text-headline--line-height: 1.12;
  --text-body: 1rem;    /* never below 16px — iOS auto-zooms on smaller inputs */
  --text-body--line-height: 1.6;
}
```

Adobe Fonts (Typekit) has no `next/font` support — preconnect + load the kit CSS in `<head>`, then reference the family in `--font-sans` (Typekit serves `font-display: swap` itself):

```tsx
// <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
// <link rel="stylesheet" href="https://use.typekit.net/<kit-id>.css" />
```

Numbers in data contexts get `tabular-nums` (or the mono font) — prices, stats, timers — to prevent layout shift.

---

## 3. Component Recipes

Copy-paste-ready, all on §1 tokens. Press feedback is `active:scale-[0.97]` on every tappable element.

### 3.1 Glass Navbar (floating capsule)

```tsx
"use client";
import { useEffect, useState } from "react";
// Render <div id="nav-sentinel" aria-hidden className="absolute top-0 h-px" /> above the hero.
// IntersectionObserver, not scroll listeners. backdrop-blur only on fixed/sticky elements.
export function GlassNavbar({ links }: { links: { label: string; href: string }[] }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-4 top-4 z-fixed">
      <nav aria-label="Primary" className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border px-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 ${scrolled ? "border-border bg-[var(--navbar-bg)] shadow-lg shadow-foreground/5" : "border-transparent bg-transparent"}`}>
        <a href="/" className="text-base font-semibold tracking-tight">Wordmark</a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => <li key={l.href}><a href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{l.label}</a></li>)}
        </ul>
        <a href="#cta" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--button-primary-glow)] transition-transform duration-150 active:scale-[0.97]">Get started</a>
      </nav>
    </header>
  );
}
```

### 3.2 Primary Button (inner glow + colored shadow)

```tsx
// Signature: 1px top inner highlight (light catch) + shadow tinted with the accent, never black.
// Named transition properties only — never `transition-all`.
export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-[inset_0_1px_0_0_oklch(100%_0_0/0.25),0_8px_24px_-8px_var(--button-primary-glow)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:brightness-110 hover:shadow-[inset_0_1px_0_0_oklch(100%_0_0/0.25),0_12px_32px_-8px_var(--button-primary-glow)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50">
      {children}
    </button>
  );
}
```

CTA text stays on one line, max 3 words; pair with a ghost/outline secondary, never a second filled primary.

### 3.3 Gradient-Border Card

```css
/* globals.css — double-background technique: solid fill in padding-box, gradient in border-box */
@utility card-gradient-border {
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: linear-gradient(var(--card), var(--card)) padding-box,
    linear-gradient(135deg, color-mix(in oklch, var(--primary) 60%, transparent), transparent 40%, color-mix(in oklch, var(--primary) 25%, transparent)) border-box;
}
```

```tsx
export function GradientBorderCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="card-gradient-border p-6 transition-[box-shadow] duration-200 hover:shadow-[0_16px_48px_-16px_var(--button-primary-glow)]">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </article>
  );
}
```

### 3.4 Stat Card

```tsx
// Numbers get tabular-nums; icon chip at /10 opacity; delta in the accent color.
export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
        {label}
        {delta && <span className="font-medium text-primary">{delta}</span>}
      </p>
    </div>
  );
}
```

### 3.5 Pricing Tier Card (inverted recommended tier)

```tsx
// Highlight the recommended tier by INVERTING it (bg-foreground), not by extra height.
// Grid items stretch; flex-col + mt-auto bottom-aligns the CTAs.
export function PricingTier({ name, price, period, features, cta, recommended = false }: {
  name: string; price: string; period: string; features: string[]; cta: string; recommended?: boolean;
}) {
  const inv = recommended; // inverted tier reads background tokens as foreground
  return (
    <article aria-label={`${name} plan${recommended ? " (recommended)" : ""}`} className={`flex flex-col rounded-2xl p-8 ${inv ? "bg-foreground text-background shadow-xl" : "border border-border bg-card text-card-foreground"}`}>
      {recommended && <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">Recommended</span>}
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-4 text-4xl font-bold tracking-tight tabular-nums">{price}<span className={`text-base font-normal ${inv ? "text-background/60" : "text-muted-foreground"}`}> / {period}</span></p>
      <ul className={`mt-6 mb-8 flex flex-col gap-3 text-sm ${inv ? "text-background/80" : "text-muted-foreground"}`}>
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 fill-none stroke-current stroke-2"><path d="m3 8.5 3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {f}
          </li>
        ))}
      </ul>
      <a href="#signup" aria-label={`${cta} — ${name} plan`} className={`mt-auto inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${inv ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>
        {cta}
      </a>
    </article>
  );
}
// Grid wrapper: <div className="grid gap-6 md:grid-cols-3">
```

### 3.6 Testimonial Grid

```tsx
// Masonry via CSS columns; real quote semantics; quotes stay under 3 lines.
export function TestimonialGrid({ items }: { items: { quote: string; name: string; role: string }[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
      {items.map((t) => (
        <figure key={t.name} className="rounded-2xl border border-border bg-card p-6">
          <blockquote className="text-sm leading-relaxed text-card-foreground"><p>&ldquo;{t.quote}&rdquo;</p></blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{t.name.split(" ").map((w) => w[0]).join("")}</span>
            <span className="text-sm"><span className="block font-medium">{t.name}</span><span className="block text-muted-foreground">{t.role}</span></span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
```

### 3.7 Mega-Wordmark Footer

```tsx
export function MegaWordmarkFooter({ wordmark, columns }: {
  wordmark: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
}) {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_repeat(3,auto)]">
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{/* one-sentence description */}</p>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => <li key={l.href}><a href={l.href} className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">{l.label}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>
      {/* Giant wordmark clipped at the baseline. Flat muted color, no gradient/effects —
          the crop does the work (canonical rule: layout-and-sections.md §6; gradient text
          here would trip anti-slop rule #28 / Pre-Flight #4). */}
      <div aria-hidden className="overflow-hidden">
        <p className="mx-auto -mb-[0.23em] w-full max-w-7xl px-6 text-center text-[clamp(4rem,14vw,14rem)] leading-none font-bold tracking-tighter select-none text-foreground/10">{wordmark}</p>
      </div>
    </footer>
  );
}
```

### 3.8 Logo Marquee

```css
/* globals.css — keyframes inside @theme make the `animate-marquee` utility */
@theme {
  --animate-marquee: marquee 32s linear infinite;
  @keyframes marquee { to { transform: translateX(-50%); } }
}
```

```tsx
// Duplicate the track exactly once (aria-hidden copy), translate -50%, pause on hover,
// hard-stop under reduced motion. Edge fade via mask-image, not overlay divs.
export function LogoMarquee({ logos }: { logos: { name: string; src: string }[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16">
      {logos.map((l) => (
        <li key={l.name}><img src={l.src} alt={hidden ? "" : l.name} width={120} height={32} className="h-8 w-auto opacity-50 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0" /></li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Trusted by" className="py-12">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
```

### 3.9 Section Header (eyebrow + two-tone headline)

```tsx
// Eyebrow restraint: max 1 eyebrow per 3 sections — the headline alone is usually enough.
// Two-tone = muted token on the second phrase, NOT gradient text.
export function SectionHeader({ eyebrow, title, faded, description, align = "center" }: {
  eyebrow?: string; title: string; faded?: string; description?: string; align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{eyebrow}</p>}
      <h2 className="mt-3 text-headline font-semibold text-foreground">{title}{faded && <> <span className="text-muted-foreground">{faded}</span></>}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
```

### 3.10 Segmented Toggle

```tsx
"use client";
import { useState } from "react";
// radiogroup semantics + arrow-key navigation. Indicator moves via transform only.
// auto-cols-fr guarantees equal segment widths, so translateX(index * 100%) lines up exactly.
export function SegmentedToggle({ options, defaultValue, onChange }: {
  options: { value: string; label: string }[];
  defaultValue: string;
  onChange: (value: string) => void;
}) {
  const [active, setActive] = useState(defaultValue);
  const index = options.findIndex((o) => o.value === active);
  const select = (v: string) => { setActive(v); onChange(v); };
  return (
    <div role="radiogroup" aria-label="Options" className="relative inline-grid auto-cols-fr grid-flow-col rounded-xl border border-border bg-muted p-1"
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        select(options[(index + (e.key === "ArrowRight" ? 1 : -1) + options.length) % options.length].value);
      }}>
      <span aria-hidden className="absolute inset-y-1 left-1 rounded-lg bg-card shadow-sm transition-transform duration-200 ease-out" style={{ width: `calc((100% - 0.5rem) / ${options.length})`, transform: `translateX(${index * 100}%)` }} />
      {options.map((o) => (
        <button key={o.value} role="radio" aria-checked={o.value === active} tabIndex={o.value === active ? 0 : -1} onClick={() => select(o.value)}
          className={`relative z-10 cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${o.value === active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

---

## 4. Motion Setup

Cheapest tool that works: CSS transition for hover/press → CSS keyframes for ambient loops → **motion.dev** for springs, layout, exit, gestures. Never `window.addEventListener("scroll")` — use IntersectionObserver, `useScroll()`, or CSS scroll-driven animations. Never `useState` for continuous values (pointer, scroll progress) — use `useMotionValue`/`useTransform`.

```bash
npm i motion   # import from "motion/react" (formerly framer-motion)
```

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
// Canonical scroll reveal: fires once, transform/opacity only, full transform strings (not x/y shorthands).
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }} whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
// Stagger with delay={i * 0.06} (30-80ms per item, never blocking interaction).
// Springs for drag/physics: transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}.
// Exits run at 60-70% of the enter duration.
// NON-NEGOTIABLE — reveals must be no-JS safe: content renders visible by default; the hidden
// state is applied ONLY by JS (motion initial) or behind @supports + media queries in CSS.
// Never ship CSS that sets opacity: 0 unconditionally and relies on JS to undo it —
// no-JS visitors would see blank sections. CSS scroll reveals are safe ONLY inside
// `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: view())`
// (browsers without support never hide anything).
```

```css
/* CSS scroll-driven fallback — zero JS, off the main thread. Progressive enhancement only. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .scroll-reveal {
      animation: scroll-reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;
    }
    @keyframes scroll-reveal {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  }
}
/* Global reduced-motion guard — ships in every project. Canonical rule lives in
   motion-and-animation.md §1.3: "fewer and gentler, not zero". Keep opacity/color
   micro-feedback (it aids comprehension); remove movement, travel and overshoot;
   replace slides/springs/parallax with short cross-fades. NEVER the global
   `animation-duration: 0.01ms !important` kill — that deletes all feedback. */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation: none !important;              /* keyframed movement off entirely */
    transition-property: background-color, border-color, color, opacity, box-shadow !important;
    transition-duration: 150ms !important;   /* gentle state cross-fade, no travel */
  }
  /* transform-driven reveals (motion.dev, CSS view()) render in final state: */
  .scroll-reveal, [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

---

## 5. Layout Disciplines

**z-index scale — declare once (`--z-index-*` namespace), never use arbitrary values:**

```css
@theme {
  --z-index-base: 0;       /* default flow */
  --z-index-sticky: 10;    /* sticky section/table headers */
  --z-index-dropdown: 20;  /* dropdowns, popovers, tooltips */
  --z-index-fixed: 40;     /* fixed/floating navbars → z-fixed */
  --z-index-overlay: 100;  /* modals, drawers, sheets + backdrops */
  --z-index-toast: 1000;   /* toasts, announcements — always on top */
}
```

**Breakpoints — design and verify at exactly these widths:** 375 (mobile) / 768 (tablet) / 1024 (laptop) / 1440 (desktop). Mobile-first classes; asymmetric layouts collapse to one column below 768px; zero horizontal scroll at all four widths.

**Container system — one pattern, no fixed pixel widths:**

```css
@utility container-page {
  margin-inline: auto;
  width: 100%;
  max-width: 80rem; /* 1280px, max-w-7xl equivalent */
  padding-inline: 1rem;
  @media (width >= 48rem) { padding-inline: 1.5rem; }
  @media (width >= 64rem) { padding-inline: 2rem; }
}
/* Full-height shells: min-h-dvh, never h-screen (mobile chrome). Section rhythm: py-16..py-24. */
```

**Transition discipline — name the properties:**

```css
.card { transition: all 300ms ease; } /* BAD — animates layout properties; always a review finding */
/* GOOD — per-property durations: */
.card { transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-color 150ms ease-in-out; }
```

Duration budget: press 100-160ms · tooltips 125-200ms · dropdowns 150-250ms · modals 200-500ms · UI never above 300ms without a named reason. Easing: `ease-out` for entrances/responses, `ease-in-out` for on-screen movement, `linear` only for marquees/progress, never `ease-in` on UI.

**will-change rules:** apply only when animation is imminent (hover intent, active gesture), remove after it ends, never blanket-apply in stylesheets. Composited `transform`/`opacity` usually make it unnecessary — `will-change` on many nodes costs more memory than it saves.

---

## 6. Library Map

Check `package.json` before importing anything; output the install command first. One component source of truth per project — do not mix libraries for the same primitive.

| Library | Use for | Avoid for |
|---|---|---|
| **shadcn/ui** (`npx shadcn@latest add <c>`) | Default base: owned, accessible Radix primitives — Button, Dialog, Form, Table, Select, Tabs | Shipping default styling unchanged; pasting stale web snippets instead of the CLI |
| **21st.dev** | Copy-paste marketing blocks/sections (heroes, pricing, footers) as scaffolding | Production-critical interactive primitives; anything shipped unadapted |
| **Magic UI** | Marketing effects: animated grids, beams, borders, marquees, bento | Dense app UI; more than 1-2 effects per section |
| **Aceternity** | Heavy flair: 3D cards, parallax, spotlight, aurora backgrounds | Dashboards, public-sector, perf-sensitive pages (JS + GPU cost) |
| **react-bits** | Animated text & backgrounds (scramble, split text, particles) | Core layout; more than one "hero effect" per page |

**Adaptation protocol — mandatory after adding any third-party component:**

1. Re-bind every color to §1 semantic tokens; strip hardcoded hex and raw palette classes (`bg-blue-500`).
2. Strip bundled fonts/radii that conflict with the project's locks.
3. Replace `transition-all` with named properties (§5); cap durations at the budget.
4. Add the reduced-motion path (`motion-reduce:` variants or a `useReducedMotion()` branch).
5. Verify focus-visible rings and keyboard operation survive the adaptation.
6. shadcn/ui is already CSS-variable-based — point its variables at your `@theme inline` bridge, never run a second parallel variable set.

---

## 7. Quality Gates (Pre-Flight)

Every box passes honestly before output. A failed gate = the work is not done.

**Tokens & consistency**
- [ ] Zero raw hex / raw palette classes in components — everything resolves to semantic tokens
- [ ] One accent across the whole page; one radius system; one shadow direction
- [ ] Dark mode designed, not inverted; contrast re-verified per mode

**Accessibility**
- [ ] Contrast: body text ≥ 4.5:1, large text and meaningful icons ≥ 3:1 — in both modes
- [ ] Visible `focus-visible` ring on every interactive element (2px, offset, `--ring` token)
- [ ] Full keyboard walkthrough: sane tab order, arrow keys on segmented controls/tabs, no focus traps
- [ ] Pointer targets ≥ 24×24px (44×44px preferred); icon-only buttons carry `aria-label`
- [ ] `prefers-reduced-motion` verified: movement collapses, content reachable, marquee stops
- [ ] Semantic landmarks: one `h1`, sequential headings, `nav`/`main`/`footer`, real `blockquote`

**Responsive**
- [ ] No horizontal scroll at 375 / 768 / 1024 / 1440
- [ ] Hero fits the initial viewport on a small laptop; primary CTA visible without scroll
- [ ] Grids collapse to one column below 768px; nothing overflows or clips

**Performance & motion**
- [ ] `transition: all` count = 0; durations within §5 budget; transform/opacity only
- [ ] `backdrop-blur` only on fixed/sticky elements; no blur or grain layers on scrolling containers
- [ ] Fonts: `display: swap`, variable fonts, no render-blocking `<link>` font chains
- [ ] No `useState` for continuous values (scroll progress, pointer position)

**Output integrity**
- [ ] No placeholders: no `// ...`, no "rest of code", no dead `#` links, no lorem ipsum
- [ ] Every import exists in `package.json`; install commands listed first
- [ ] Copy audit: every visible string re-read; CTAs fit one line; one label per CTA intent
