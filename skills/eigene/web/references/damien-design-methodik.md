# Damien Ghader — Design-/Build-Methodik (Ideen-Merge)

**Verbund (08.09.2026):** Weitere Creator-Methoden mit Attribution: [creator-methods.md](creator-methods.md).

**Quelle:** X-Posts @damienghader (2026), extrahiert 2026-08-06 im Worktree
`webdesign-skill-upgrade/sources/`. **Kein Vendoring**, keine Lovable-Pflicht —
nur Methodik, die im lokalen Stack (Claude/Next/Tailwind/Motion) gilt.
Bei Konflikt gewinnt `design-doktrin.md` und der `web`-Ablauf.

**Wann laden:** In `art-direction` und `components`, wenn Premium-Look,
Design-System-first oder Motion-heavy Landing verlangt wird. Ergänzt
`lexlin-design-prinzipien.md` (nicht ersetzen).

## 1. Drei Schichten vor jeder Seite

| Schicht | Inhalt | Ohne sie passiert |
|---|---|---|
| **Foundations** | Farb-Tokens, Spacing-Scale, Radius, Type-Scale/Weights, Shadow-Regeln | AI erfindet Werte pro Sektion |
| **Components** | Button (primary/secondary/ghost + States), Card, Input, Nav, Modal | Page-Prompts = Inkonsistenz |
| **Composition** | Stack-Dichte, Section-Gaps, Aufmerksamkeits-Reihenfolge, Empty States | „sieht aus wie Template“ |

**Regel:** Page-first bauen ist verboten, solange Foundations + Kern-Components
fehlen. Erst Tokens, dann Bausteine, dann Layout/Logik.

## 2. Brandbook-Spec (präzise, nicht „premium“)

Vor dem ersten UI-Prompt eine Spec schreiben (Mensch + AI-Hilfe ok):

- 2–3 Farb-Tokens mit Hex **und** erlaubten Einsatzorten (Accent z. B. nur CTA/active, max. N×/Seite)
- Type-Pair: Display + Body (selten dritter Schnitt); Tracking, Line-height, Weight
- Labels: oft uppercase, tracking, feste px-Größe
- Spacing: 8pt-Grid (8/16/24/32/48/64/96)
- Radius-Default, Shadow-Policy (oft: none oder shadow-sm)
- Tone-of-Voice für Copy (kurz)

Diese Spec landet in `client-<name>/web/art-direction.md` (Tokens-Abschnitt) und
wird in **jedem** Component-Prompt referenziert — nie „mach es dark and premium“.

## 3. Component-Prompts (Tailwind-explizit)

Vague Adjektive ersetzen durch Layout-Logik:

- Bad: „modern clean button“
- Gut: „primary: accent bg, near-black text; secondary: surface + 1px border; radius 16px; py-3 px-5; weight 500; hover 150ms ease brightness only; **eine** Component mit variant-Prop“

Bestehende Components **by name** referenzieren („use Button secondary“), nicht neu
erfinden. Before/After mit **Deltas** prompten (p-4→p-6, rounded-lg→rounded-2xl).

Build-Reihenfolge: Button-System → Card → Nav (desktop+mobile) → Inputs → Type-Scale →
**erst dann** Pages als Assembly („dashboard: 240px sidebar nav-component, 3-col card grid gap-8“).

## 4. Ultra-Premium-Prompt-Skelett

Vor dem Prompt drei Sätze: **Product** (konkret) · **Stack** (explizit) · **Aesthetic**.

Prompt-Blöcke in dieser Reihenfolge:

1. **Visual language** — Farben (Hex), Licht/Schatten, Type-Hierarchie in konkreten px, was verboten ist (z. B. keine Gradients/Noise)
2. **Motion** — Bibliothek namentlich: **`motion` / Import `motion/react`**
   (nie `framer-motion` als Paketname — bricht vendorierte `ui-components`).
   Smooth-Scroll (z. B. Lenis) **nur** wenn `tool-usecase-router.md` eine Zeile
   dafür freigibt und sie in der Werkzeugtabelle 5d steht. Scroll- vs. Hover;
   spring physics vs. fade.
3. **Sections** — Reihenfolge und was pro Section passiert
4. **References** — 2–4 benannte Marken/Seiten als Qualitätsanker (Stil, kein 1:1-Clone)
5. **Quality bar** — ein Satz Standard („Awwwards-level“, „museum product page“)

Stack muss **benannt** sein. Ohne explizites `motion`/`motion/react` (plus
optional freigegebenes Smooth-Scroll) kommen Default-CSS-Fades.

Vague → konkret übersetzen:

| Vague | Konkret |
|---|---|
| editorial type | 120px+ Display neben 11px Labels |
| floating product | cinematic light, soft DOF, zentriert in Negativraum |
| modern dashboard | calm, generous spacing, monospace nur für Tech-Werte |

## 5. Conversion-Section-Order (Marketing-Seiten)

Sinnvolle Default-Reihenfolge (anpassen an Dossier, nicht blind kopieren):

1. Hero = eine Big Idea + eine Primär-Aktion  
2. Problem / Agitation (kurz)  
3. Solution / How it works  
4. Proof (Zahlen, Logos, Testimonials)  
5. Offer / Features  
6. Risk reverse / Garantie / FAQ  
7. Final CTA  

Eine Aktion pro Landing; Proof **nah** am CTA. Ads-Landing: zusätzlich
`landingpage-struktur.md` (Formular-Regeln dort gewinnen).

## 6. SEO-Mindestgerüst (Build-Zeit, nicht nur Launch)

Pro Seite: unique title (≤60), meta (≤160), clean slug, eine H1, sinnvolle H2,
JSON-LD wo passend, interne Links, Canonical. Bei App-Router: SSR/SSG für
indexierbare Marketing-Routen — reines Client-Only ohne Prerender blockiert Rankings.
Detail-Gates: `agentur-rubrik.md` + QA Fach 5 (seo-Skill).

## 7. Motion-Landing in 6 Phasen

1. Intent/Brand-Constraints  
2. Scroll-Storyboard (was pro Viewport passiert)  
3. Stack fixieren (Motion-Lib, smooth scroll)  
4. Foundations + Components  
5. Motion-System (springs, stagger, reduced-motion)  
6. Polish (Timing, Bundle, Lighthouse)

Motion ohne Storyboard = Deko. Reduced-Motion Pflicht (`motion-doktrin.md`).

## 8. Targeted Edit statt Ganzseiten-Reprompt

Ein Element/eine Section fixen, System eingefroren halten. Ganzseiten-Reprompt
lädt den Default-Geschmack der KI zurück und zerstört Tokens.

## Referenzen (Belege)

- https://x.com/i/status/2012547182130336033 — Design System 3 Layer  
- https://x.com/i/status/2013979172100551127 — SEO  
- https://x.com/i/status/2014341010600435925 — Conversion order  
- https://x.com/i/status/2033879887233142955 — Animated LP phases  
- https://x.com/i/status/2039684056158195960 — Marketing use-cases / prompt specificity  
- https://x.com/i/status/2054905542926123286 — Ultra-premium single prompt  
- https://x.com/i/status/2070123613466853862 — Brandbook → components → pages  
