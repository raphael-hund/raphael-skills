# React Component Libraries — Curated Field Guide

> **Load when:** choosing or adopting a React component library, or pulling components from a registry (shadcn, 21st.dev, Magic UI, Aceternity, React Bits).
> **Skip when:** hand-building all components, or concrete Tailwind v4 code is needed (→ `react-tailwind-recipes.md`); animation library choice → `animation-libraries.md`.
> **Canonical for:** component-library choice, registry-first rule §1, token re-binding §7.

Decision-first catalog of the React UI ecosystem (2025/2026). Not a list of 48 libraries — a set of decisions. Rule zero: **search a registry, adapt to your tokens, then — and only then — build by hand.** Every component you adopt is re-bound to your semantic tokens before it ships. Demo defaults are slop (see §5).

## Contents

1. [The Registry-First Rule](#1-the-registry-first-rule) — why you never start from scratch, CLI + MCP workflow
2. [The Stack Map](#2-the-stack-map) — who builds on whom; Radix → Base UI forward path
3. [Curated Tiers](#3-curated-tiers) — Tier S daily drivers, Tier A situational stars, Tier B special cases
4. [Headless Layer](#4-headless-layer) — Radix / Base UI / Headless UI / Ark / Zag / React Aria / Ariakit
5. [Charts](#5-charts) — Tremor vs Recharts vs visx vs Nivo vs shadcn Charts
6. [Maker ↔ Library Map](#6-maker--library-map) — follow makers, not libraries
7. [The Slop Warning](#7-the-slop-warning) — registry boom ≠ blind copying
8. [Quick Decision Table](#8-quick-decision-table) — "I need X" → library

---

## 1. The Registry-First Rule

The shadcn CLI registry protocol is the de-facto distribution standard. Since CLI 3.0 (Aug 2025) registries are namespaced and decentralized — every serious library exposes one. Treat component code as **source you own**, not a dependency you import.

**Workflow, in this order:**

1. **Search a registry.** 21st.dev (12,000+ components) for breadth, then the Tier S registries below. Never write React Bits / Magic UI component code from memory — training data is stale (e.g. agents guess `framer-motion`; the live package is `motion`). Pull the live source.
2. **Install via CLI** into your repo.
3. **Re-bind every token.** Map the component's colors/radii to your semantic tokens (`bg-primary`, `text-muted-foreground`), strip hardcoded hex and raw palette classes — exact procedure: `react-tailwind-recipes.md` §1 token setup + §6 adaptation gate.
4. **Only then build by hand** what no registry covers. That is where your signature lives.

**Exact commands:**

```bash
# One-time project setup
npx shadcn@latest init                    # creates components.json + CSS-var theme

# shadcn/ui core (also Drawer=Vaul, Toast=Sonner, Charts=Recharts wrappers)
npx shadcn@latest add button dialog sidebar command data-table

# Namespaced third-party registries — same CLI
npx shadcn@latest add @magicui/marquee
npx shadcn@latest add @aceternity/3d-card-effect
npx shadcn@latest add @kokonutui/liquid-glass-card
npx shadcn@latest add @intentui/date-picker
npx shadcn@latest add @animate-ui/magnetic-button

# URL-based installs (any registry endpoint)
npx shadcn@latest add https://reactbits.dev/r/split-text

# Own CLI exceptions
npx kibo-ui@latest add ai-conversation    # Kibo UI ships its own CLI
```

**MCP:** many registries ship MCP servers (shadcn official, 21st.dev Magic MCP, Magic UI MCP, ReUI MCP, Neobrutalism MCP). If an MCP server is configured in your environment, use it to search/browse before falling back to the site. 21st.dev also offers "copy the prompt" — paste-ready component prompts.

**Anti-pattern:** adopting three motion registries and ending up with four Button implementations. Standard stack = shadcn/ui base + ONE motion/effects registry + cherry-picked one-offs.

---

## 2. The Stack Map

Know what sits under what — it decides compatibility, a11y quality, and your upgrade path.

| Primitives layer | Built on top | Note |
|---|---|---|
| **Radix Primitives** | shadcn/ui (classic), ReUI, Shadcnblocks, Tailark, BundUI, AlignUI | Best overlay/focus management. **Maintenance mode** — stable, but not the future. |
| **Base UI** (by Radix + MUI + Floating UI authors) | shadcn/ui Base-UI mode, coss ui, Cnippet, neobrutalism.dev | **Forward path for new projects.** `data-*` state attrs, single package, Tailwind-v4 native. |
| **React Aria Components** (Adobe) | HeroUI v3, Intent UI, JollyUI | Best i18n, keyboard, color/date pickers, virtualization. A11y ceiling of the ecosystem. |
| **Ark UI / Zag.js** | Park UI, Chakra v3 | Breadth monsters: Tour, Signature Pad, QR Code, Timer. |
| **Headless UI** (Tailwind Labs) | Catalyst kit | Small, impeccable API, slow cadence. |
| **Recharts** | shadcn Charts, Tremor, Mantine charts, Intent UI charts | The chart engine of the ecosystem. |
| **Tailwind CSS v4** | all of the above (styled layer) | The styling substrate. CSS vars + OKLCH tokens are the shared currency. |

**Rule:** for a new Tailwind project in 2026, default to **Base UI-backed registries** (shadcn Base-UI mode, coss ui). Choose React Aria-backed ones (Intent UI) when a11y compliance is a hard requirement. Radix-backed code is fine — it's everywhere — but don't start a new design system on it.

---

## 3. Curated Tiers

### Tier S — Daily Drivers

Reach for these on nearly every project.

| Library | What it is | Signature components (the best — not all) | Install | When / why | Craft note |
|---|---|---|---|---|---|
| **shadcn/ui** | The reference registry. ~58 components, you own the source. Radix or Base UI under the hood. | Sidebar (full app-shell), Command, Data Table (TanStack recipe), Chart, Input OTP, Form (react-hook-form) | `npx shadcn@latest add …` | Always. This is the app-UI baseline; everything else composes with it. | 10/10 as infrastructure, 0/10 as identity — untouched shadcn defaults are the definition of slop (§7). |
| **21st.dev** | Marketplace registry, 12,000+ community components + marketing blocks + shaders. | Search-driven; quality 6–9 by author. Ruixen catalog (380+) lives here. | shadcn CLI per component / "copy prompt" / MCP | First search stop for any non-trivial component someone else already perfected. | Cherry-pick singles; audit a11y per author. 2 free copies/day without membership. |
| **React Bits** | Animated/interactive registry (~165 free + Pro). Motion/GSAP physics, WebGL backgrounds. | Split Text, Blur Text, Scramble Text; Hyperspeed, Galaxy, Particles backgrounds; Magnet, Blob Cursor | `npx shadcn@latest add https://reactbits.dev/r/…` | Landing pages, heroes, playful marketing. Text-animation suite is unmatched. | Decorative, not semantic — verify reduced-motion + a11y yourself. Budget canvas pieces. |
| **Magic UI** | The most complete animated landing-page kit (~150). | Marquee, Bento Grid, Animated Beam, Globe, Icon Cloud, Dock, Warp Background, Number Ticker | `npx shadcn@latest add @magicui/…` | Marketing sections that need motion; SaaS landing pages. | Pairs on top of shadcn base. One effects registry per project — if Magic UI, not Aceternity too. |
| **Aceternity** | Cinematic marketing effects (~100). | 3D Card Effect, Aurora Background, Hero Parallax, Macbook Scroll, GitHub Globe, Infinite Moving Cards | `npx shadcn@latest add @aceternity/…` | High-drama SaaS heroes and product showcases. | Never stack multiple canvas/3D pieces on one page — perf budget. Pro tier for blocks. |
| **Kibo UI** | AI-first shadcn extension registry (~40), by Hayden Bleasel. | AI Conversation, AI Reasoning, AI Tool, AI Inline Citation, AI Input, Code Block — plus Gantt + Kanban | `npx kibo-ui@latest add …` | AI chat/agent products, internal tools. The only complete AI-chat surface in the ecosystem. | Composable with shadcn primitives; Gantt/Kanban are rare and solid. |
| **coss ui** (ex Origin UI) | Practical everyday app components, ~500 at peak, rebuilt on **Base UI**. | Inputs, selects, date pickers, file upload, OTP, notifications — many variants per component | shadcn CLI | Dense SaaS forms and app chrome where shadcn's single variant isn't enough. | Most "everyday control" coverage; Base UI base makes it the forward-compatible pick. |
| **Animate UI** | "shadcn, but every interaction springs." 580 items, Motion-powered. | Animated Lucide icon set (signature), Magnetic/Liquid buttons, animated Accordion/Tabs/Dialog | `npx shadcn@latest add @animate-ui/…` | When app chrome itself should feel alive without writing motion code. | Spring defaults are tasteful; still reduce amplitude for data-dense screens. |

### Tier A — Situational Stars

Right tool for a specific job; not general default.

| Library | Reach for it when… | Signature | Install |
|---|---|---|---|
| **Cult UI** | Building AI-agent products fast; want full-stack templates | 100+ AI SDK blocks (agent artifacts), Shift Card, Media Carousel | shadcn CLI |
| **Kokonut UI** | Need a "wow" card or AI input with taste | Liquid Glass card (SVG displacement), Apple Activity rings, Morphic Navbar | `npx shadcn@latest add @kokonutui/…` |
| **Skiper UI** | Memorable micro-moments | Animated Theme Toggler (view-transition), Skiper Card 3D tilt, Masked Avatars | shadcn CLI |
| **Intent UI** | A11y-grade components required (React Aria under the hood) + built-in charts | Date/Range pickers, Color pickers, Table, charts | `npx shadcn@latest add @intentui/…` |
| **Shadcnblocks** | Shipping a marketing site this week, budget exists | 600–1,200+ premium blocks, consistent design | copy-paste (paid, one-time) |
| **Tailark** | Want blocks that don't look like generic shadcn | Distinct style kits (Dusk, Mist, Nexus), Radix & Base UI variants | shadcn CLI / copy |
| **tweakcn** | Always, actually — theme-tuning companion | Visual editor: OKLCH colors, radius, shadows → paste into globals.css | tweakcn.com (tool, not lib) |
| **HeroUI v3** | Non-shadcn styled design system with a11y-grade behavior | Beautiful defaults on React Aria + Tailwind v4 | `npm i @heroui/react` |
| **Mantine** | CRUD-heavy internal tools; batteries (forms, dates, charts, spotlight, rich text) | Date pickers, Charts, Spotlight, modals manager | `npm i @mantine/core …` |
| **Tremor** | Analytics dashboards | KPI cards, BarList, Tracker, Spark charts — data widgets, not just charts | `npm i @tremor/react` or copy-paste raw |

### Tier B — Special Cases

Know they exist; deploy deliberately.

| Library | Use when | Warning |
|---|---|---|
| **Uiverse** | Quick CSS-only decorative button/loader/toggle | Community snippets; often non-semantic — rebuild semantics in React. |
| **HyperUI** | Fast unglamorous admin/marketing markup | Plain Tailwind output; restyle to tokens. |
| **neobrutalism.dev** | Brand explicitly wants neobrutalism (hard shadows, thick borders) | **Style lock.** Full shadcn set restyled — mixing it with neutral components looks broken. All-or-nothing. |
| **8bitcn/ui** | Retro/8-bit themed project or game UI | Style lock, same rule. Fun, not enterprise. |
| **Fancy Components** | Micro-interaction details with mobile fallbacks | Unusually thoughtful (hover-simulate fallbacks); copy the care, not just the code. |
| **SmoothUI** | Smooth a11y-default animated primitives | Siri Orb, Dynamic Island are the standouts. |
| **BundUI** | Extra marketing/e-commerce blocks | Breadth over polish; verify per component. |
| **Ruixen** | Hero/marketing pieces (Image Stream Hero, Gooey Dock) | Also on 21st.dev (380+); npm or registry. |
| **Cnippet** | Volume shopping on Base UI (1,000+ items) | Breadth ≠ polish — audit semantics. |
| **JollyUI** | shadcn-style components on React Aria, minimal | Superseded by Intent UI for breadth; fine for small needs. |

---

## 4. Headless Layer

Go headless (unstyled behavior-only) instead of adopting styled code when: you're building a design system, the interaction is a11y-critical (combobox, menu, dialog), or no registry component matches your design and restyling one costs more than styling primitives.

| Library | npm | Pick when | Skip when |
|---|---|---|---|
| **Base UI** | `@base-ui/react` | Default for new Tailwind projects (2026). Single package, `data-*` styling, modern API. | — |
| **React Aria Components** | `react-aria-components` | Hard a11y/i18n requirements, complex pickers, virtualization. Go through Components layer, not raw hooks. | Simple marketing pages — overkill. |
| **Radix Primitives** | `@radix-ui/react-*` | Maintaining a Radix-based codebase; unmatched overlay/focus handling. | New design systems — maintenance mode, Base UI is the successor. |
| **Headless UI** | `@headlessui/react` | Small stable widget set, Tailwind-first taste. | You need bleeding-edge breadth — slow cadence. |
| **Ark UI** | `@ark-ui/react` | Need Tour, Signature Pad, QR, Timer, File Upload out of the box. | — |
| **Zag.js** | `@zag-js/*` | Building your own component library (it's Ark/Chakra's engine). | You just want components — use Ark. |
| **Ariakit** | `@ariakit/react` | Combobox/Select-heavy apps, command palettes, nested async menus. | — |

---

## 5. Charts

| Need | Pick | Why |
|---|---|---|
| Full analytics dashboard | **Tremor** | KPI cards + BarList + Tracker + inputs — dashboard widgets, not just charts. Pair: Tremor for data, shadcn for chrome. |
| On-brand charts inside a shadcn project | **shadcn Charts** (`npx shadcn@latest add chart`) | Recharts wrappers bound to your CSS vars. |
| Custom chart composition | **Recharts** | The ecosystem engine, but mediocre ergonomics — always wrap it (shadcn pattern), never scatter raw Recharts config. |
| Prettiest defaults, exotic types | **Nivo** | Sankey/Chord/Calendar/Waffle; heavier than Recharts for simple dashboards. |
| Bespoke dataviz the others can't express | **visx** | Low-level D3-in-React primitives. Not a drop-in — budget real engineering time. |

---

## 6. Maker ↔ Library Map

Quality follows makers. Follow the accounts; their libraries inherit their taste, their changelogs announce the next wave before roundups do.

| Maker | Ships | Why you follow |
|---|---|---|
| @shadcn | shadcn/ui, registry protocol, CLI/MCP | The substrate. His changelog defines the ecosystem's roadmap. |
| @davidhdev | React Bits (+ Pro), Canvas UI | Fastest-shipping creative-lab in the ecosystem; text/WebGL frontier. |
| @dillionverma | Magic UI, Magic UI MCP | Landing-page motion kit; "UI library for design engineers". |
| @mannupaaji | Aceternity UI | Cinematic marketing effects; ships constantly. |
| @emilkowalski | Sonner, Vaul, animations.dev, design-eng skills | The taste benchmark. Sonner/Vaul are inside shadcn (90M+ npm dl/week). His skills are the anti-slop canon. |
| @pacocoursey | cmdk | The command-palette primitive (inside shadcn's Command). |
| @haydenbleasel | Kibo UI | AI-chat surfaces done right. |
| @korablev + @21st_dev | 21st.dev, Magic MCP | Marketplace + agent-first distribution ("npm for design engineers"). |
| @imskyleen | Animate UI | Spring-everything distribution. |
| @mattgperry | Motion (ex-Framer Motion) | The animation engine everything above depends on. |
| @base_ui / @radix_ui | Base UI / Radix | The primitives transition in real time. |

Also on the radar: @raunofreiberg (micro-interaction writing), @jh3yy (CSS wizardry), @shuding (shaders-in-React), @pqoqubbw (animated icons), @LexnLin (taste-skill).

---

## 7. The Slop Warning

The registry boom means infinite components — it does not mean blind copying is craft.

- **The Indigo Lesson.** Adam Wathan (Tailwind creator), Aug 2025, 1.5M views: *"I'd like to formally apologize for making every button in Tailwind UI `bg-indigo-500` five years ago, leading to every AI generated UI on earth also being indigo."* Defaults propagate forever. Whatever you ship untouched becomes the next default someone copies.
- **shadcn is the new Bootstrap risk.** Called out since 2023: *"all websites started to look the same… I really hope it doesn't go the bootstrap path."* It did — every AI-generated site ships untouched shadcn + Inter + `bg-blue-500` + 3-card grid. The slop vocabulary is formalized; scanners and taste-skills exist to detect it. Don't be the input to those scanners.
- **Style-locked registries are one-way doors.** neobrutalism.dev and 8bitcn restyle the whole shadcn set — adopt them only when the brand IS that aesthetic, and never mix them with neutral components.

**Non-negotiable rules:**

1. **Every adopted component gets re-bound to your semantic tokens** before it ships (`react-tailwind-recipes.md` §1 + §6 gate). Zero raw hex, zero `bg-blue-500`, zero demo copy.
2. **A signature element is mandatory.** One component per page that no registry shipped — custom-built or heavily remixed. Adopted code is the floor, not the ceiling.
3. **Demo defaults are slop.** Marquee at 40px logos, default aurora gradient, stock bento — recognizable on sight. Change the parameters, the content model, or the motion curve.
4. **One effects registry per project.** Magic UI OR Aceternity OR React Bits for motion — plus cherry-picked singles from 21st.dev. Four button implementations = cooked.
5. **Verify what community code skips:** semantics, keyboard paths, reduced-motion. Registries optimize for the demo video, not the audit.

---

## 8. Quick Decision Table

"I need X" → pick. Base is always shadcn/ui unless stated; re-bind tokens before shipping (§7).

| I need… | First pick | Alternative |
|---|---|---|
| Navbar (marketing) | shadcn Navigation Menu + custom glass capsule (`react-tailwind-recipes.md` §3.1) | Aceternity Floating/Resizable Navbar, Kokonut Morphic Navbar |
| Pricing section | `react-tailwind-recipes.md` §3.5 recipe | Magic UI Pricing, Shadcnblocks (paid) |
| Bento grid | Magic UI Bento Grid | React Bits Magic Bento, Kokonut Bento |
| Testimonial marquee | Magic UI Marquee + Tweet Card | Aceternity Infinite Moving Cards / Animated Testimonials |
| Drawer | shadcn Drawer (Vaul) | Intent UI Drawer (React Aria) |
| Toast | shadcn Sonner | — (there is no second pick; Sonner won) |
| Command palette (⌘K) | shadcn Command (cmdk) | Ariakit Combobox for exotic async/nested cases |
| Data table | shadcn Data Table (TanStack recipe) | Mantine Table / MUI X (enterprise grid needs) |
| Charts | shadcn Charts | Tremor (dashboard widgets), visx (bespoke) |
| Dashboard (full) | Tremor + shadcn Sidebar | Mantine (non-Tailwind teams) |
| Date picker | shadcn Calendar/Date Picker | Intent UI Date Range Picker (a11y-grade), Mantine Dates (battery scope) |
| File upload | shadcn + react-dropzone pattern | Kokonut File Upload, coss ui variants, Aceternity File Upload |
| Auth forms | shadcn Form (react-hook-form) + Input OTP | Shadcnblocks login/signup blocks, Cult UI templates |
| 3D / tilt card | Aceternity 3D Card Effect | React Bits Tilted/Spotlight Card, Skiper Card |
| Text effects (split/blur/scramble) | React Bits text suite | Magic UI Text Animate/Aurora Text, Aceternity Typewriter |
| Backgrounds / shaders | React Bits backgrounds (Aurora, Particles, Galaxy) | Magic UI Warp/Flickering Grid, Aceternity Aurora/Vortex, @paper-design/shaders-react |
| Carousel | shadcn Carousel (Embla) | Aceternity Apple Cards Carousel, Kokonut Carousel Cards |
| Accordion | shadcn Accordion | Animate UI animated Accordion (springs) |
| Tabs | shadcn Tabs | Kokonut Smooth Tab, Animate UI Tabs |
| Modal / dialog | shadcn Dialog / Alert Dialog | Aceternity Animated Modal (marketing), HeroUI Modal (non-shadcn) |
| Tooltip | shadcn Tooltip | Aceternity Animated Tooltip |
| Select / combobox | shadcn Select / Combobox | coss ui variants, Ariakit (multi/async/nested) |
| Sidebar / app shell | shadcn Sidebar | Intent UI Sidebar/Navbar (React Aria) |
| Kanban | Kibo UI Kanban | — (rare in ecosystem; build on dnd-kit otherwise) |
| Calendar (scheduling) | Kibo UI Calendar / Mini Calendar | Mantine Schedule (day/week/month/resources), Intent UI Range Calendar |
| AI chat surface | Kibo UI AI (Conversation/Reasoning/Tool/Citation) | Cult UI AI blocks, Kokonut AI inputs, ElevenLabs UI (audio) |
| Theme tuning / branding | tweakcn → paste CSS vars | Manual OKLCH tokens (`react-tailwind-recipes.md` §1) |
| Animated icons | Animate UI icon set | lucide-animated (@pqoqubbw) |
| Neobrutalist / retro theme | neobrutalism.dev | 8bitcn/ui — style lock, all-or-nothing (§7) |

**Final gate before output:** every component resolves to semantic tokens, one signature element exists, one effects registry only, reduced-motion handled, no demo defaults visible. If any box is unchecked, you're shipping slop.
