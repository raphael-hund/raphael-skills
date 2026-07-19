# Design-Doktrin (fusioniert)

> Fusion aus **impeccable** `[imp]`, **taste-skill** `[taste]`, **ui-ux-pro-max** `[uiux]`.
> Dedupliziert. Jede Regel traegt Herkunfts-Tag(s). Widersprueche sind **ENTSCHIEDEN**
> und im jeweiligen Abschnitt begruendet. Diese Datei gewinnt bei Regel-Konflikten.
>
> Zwei Register (impeccable-Logik): **brand** = Landing/Marketing/Portfolio (Design IST das
> Produkt) · **product** = App/Dashboard/Tool (Design DIENT dem Produkt). Manche Regeln gelten
> registerabhaengig — dann ist es markiert.

---

## 1. Typografie

- **Body-Zeilenlaenge 65–75ch.** `[imp]` (`text-wrap` mit `max-w-[65ch]` `[taste]`). Detektor: `line-length`.
- **Body-Basis 16px, Line-height ~1.5.** `[uiux]` Kein Body-Text < 12px. Detektoren: `tiny-text`, `tight-leading`.
- **Fonts nicht auf Aehnlichkeit paaren** (zwei geometrische / zwei humanistische Sans). Auf Kontrastachse paaren (Serif+Sans, geometrisch+humanistisch) ODER eine Familie in mehreren Gewichten. `[imp]` Detektoren: `overused-font`, `single-font`, `flat-type-hierarchy`.
- **Inter NICHT als Default.** `[taste]`+`[imp]` (Detektor `overused-font` flaggt Inter). Bevorzugt: Geist, Outfit, Cabinet Grotesk, Satoshi, PP Neue Montreal. *Override:* Inter ok bei explizitem "neutral/Linear-Feel" oder Public-Sector/Accessibility-first. `[taste]`
- **SERIF-DISZIPLIN — sehr zurueckhaltend als Default.** `[taste]` "Kreativ = Serif" ist der meistgetestete AI-Tell. Serif nur wenn (a) Brief nennt eine Serif ODER (b) Aesthetik echt editorial/luxury/publication/heritage UND begruendbar. Als Default: **Sans-Display**. Speziell **verboten als Default: Fraunces, Instrument_Serif.** Detektor: `italic-serif-display`.
- **Display-H1-Deckel: `clamp()` max ≤ 6rem (~96px).** `[imp]` Groesser = Schreien, nicht Designen. Detektor: `oversized-h1`. Hierarchie ueber Gewicht+Farbe, nicht rohe Groesse. `[taste]`
- **Letter-Spacing-Floor ≥ -0.04em.** `[imp]` Detektor: `extreme-negative-tracking`.
  - **ENTSCHIEDEN (Konflikt):** taste-Default `tracking-tighter` (= -0.05em in Tailwind) unterschreitet den Floor. **impeccable gewinnt: nie enger als -0.04em.** taste's "tighter" auf `tracking-tight` (-0.025em) begrenzen.
- **`text-wrap: balance`** auf h1–h3, **`text-wrap: pretty`** auf lange Prosa. `[imp]`
- **Kein Justify-/kein All-Caps-Body/kein Wide-Tracking auf Body.** Detektoren: `justified-text`, `all-caps-body`, `wide-tracking`.
- **Heading-Ebenen nicht ueberspringen** (h1->h3). `[uiux]`+`[imp]` Detektor: `skipped-heading`.
- **Italic-Descender-Clearance:** Italic-Display mit `y g j p q` braucht `leading-[1.1]` min + `pb-1`/`mb-1`, sonst Abschnitt. `[taste]`

## 2. Farbe & Theme

- **Kontrast verifizieren (nicht optional).** Body ≥ 4.5:1; grosser Text (≥18px oder bold ≥14px) ≥ 3:1; Placeholder ebenfalls 4.5:1. `[imp]`+`[taste]`+`[uiux]` (Prio 1). Detektoren: `low-contrast`, `gray-on-color`. Haeufigster Fehler: muted-grau auf getoentem Fast-Weiss — Body Richtung Ink schieben.
- **Grauer Text auf farbigem Grund wirkt ausgewaschen** — dunklere Nuance der Grund-Hue oder Transparenz der Textfarbe. `[imp]`
- **Cream/Sand/Beige-Body ist der gesaettigte AI-Default 2026 — verboten als Default.** Ganzes Warm-Neutral-Band OKLCH L 0.84–0.97, C < 0.06, Hue 40–100. Token-Namen `--paper/--cream/--sand/--bone/--linen/--parchment` sind selbst schon Tells. `[imp]` Detektoren: `cream-palette`, `ai-color-palette`. Deckungsgleich mit taste's **Premium-Consumer-Ban** (beige+brass/clay/oxblood/ochre+espresso). `[taste]`
- **AI-Lila/Blau-Glow verboten als Default (LILA-RULE).** Kein automatisches Purple-Button-Glow, keine Random-Neon-Gradients. Neutralbasis (Zinc/Slate/Stone) + EIN hochkontrastiger Akzent. `[taste]` Detektor: `dark-glow`. *Override:* wenn Marke explizit Lila will — dann konsistent, nicht Gradient-Slop.
- **Max 1 Akzentfarbe, Saettigung tendenziell < 80%.** `[taste]` **Color-Consistency-Lock:** ein Akzent, ganze Seite, jede Komponente pruefen.
- **OKLCH nutzen; getoente Neutrals: +0.005–0.015 Chroma Richtung Marken-Hue** (nicht default-warm/kalt toenen). `[imp]`
- **Farbstrategie VOR Farben** (Commitment-Achse): Restrained (Neutrals + 1 Akzent ≤10%, Product-Default) · Committed (1 Farbe 30–60% Flaeche) · Full palette (3–4 Rollen) · Drenched (Flaeche IST die Farbe). `[imp]`
- **Dark vs light ist nie Default** — ein Satz physische Szene (wer/wo/welches Licht/welche Stimmung) muss die Antwort erzwingen. `[imp]`
- **Kein reines `#000000`/`#ffffff`.** Off-black (zinc-950) / Off-white — sonst stirbt die Tiefe. `[taste]`+`[imp]`
- **Semantische Farb-Tokens, kein rohes Hex in Komponenten.** `[uiux]`
- **Page-Theme-Lock:** EINE Theme fuer die ganze Seite. Kein Warm-Paper-Abschnitt zwischen Dark-Sektionen. `[taste]`

## 3. Layout & Spacing

- **Spacing variieren fuer Rhythmus** — kein monotones Padding. `[imp]` Detektor: `monotonous-spacing`.
- **Flexbox fuer 1D, Grid fuer 2D.** Nicht default Grid, wenn `flex-wrap` reicht. `[imp]` Responsive Grid ohne Breakpoints: `repeat(auto-fit, minmax(280px, 1fr))`.
- **Grid statt Flex-Prozentmathematik** (`w-[calc(33%-1rem)]` vermeiden). `[taste]`
- **Semantische z-index-Skala** (dropdown -> sticky -> modal-backdrop -> modal -> toast -> tooltip). Nie 999/9999. `[imp]`+`[taste]`
- **Mobile-first Breakpoints, Viewport-Meta, kein horizontaler Scroll, Zoom nicht deaktivieren.** `[uiux]` (Prio 5).
- **Viewport-Stabilitaet:** `min-h-[100dvh]` statt `h-screen` fuer Full-Height-Hero (iOS-Adressleiste). `[taste]`
- **Body-Text nicht bis an die Viewport-Kante.** Detektor: `body-text-viewport-edge`. Padding nicht zu eng: Detektor `cramped-padding`.
- **Container begrenzen** (`max-w-[1400px] mx-auto` / `max-w-7xl`). `[taste]`
- **Spacing-Skala per Dichte:** spacious 24–96px / standard 16–64px / dense 8–32px. `[uiux]`+`[taste]` (VISUAL_DENSITY-Dial).

## 4. Komponenten

- **Cards — registerabhaengig. ENTSCHIEDEN (Konflikt):**
  - **Landing/brand-Register:** Cards sind die faule Antwort — nur wenn wirklich das beste Affordance. `[imp]`+`[taste]` Keine 3 gleichen Feature-Cards (Detektor `icon-tile-stack`; taste "3-column equal cards" verboten). Stattdessen: `border-t`, `divide-y`, Negativraum, asymmetrisches Grid.
  - **App/product-Register:** KPI-/Datenkarten sind legitime Container. `[uiux]` (Executive/Data-Dense-Dashboard-Muster).
  - **Immer, beide Register:** **verschachtelte Cards sind immer falsch.** `[imp]` Detektor: `nested-cards`.
- **Keine Side-Stripe-Borders** (`border-left/right` > 1px als farbiger Akzent). Nie beabsichtigt. `[imp]` Detektoren: `side-tab`, `border-accent-on-rounded`. Ersetzen: volle Border, Bg-Tint, fuehrende Zahl/Icon, oder nichts.
- **Kein Gradient-Text** (`background-clip: text` + Gradient). `[imp]`+`[taste]` Detektor: `gradient-text`. Emphase ueber Gewicht/Groesse.
- **Glassmorphism nicht als Default** — selten und gezielt, mit 1px Inner-Border + Inner-Shadow, Solid-Fallback unter `prefers-reduced-transparency`. `[imp]`+`[taste]`
- **Shape-Consistency-Lock:** EINE Radius-Skala (all-sharp / all-soft 12–16px / all-pill). Gemischt nur mit dokumentierter Regel. `[taste]` Detektor: `design-system-radius`.
- **Shadows zum Bg-Hue toenen** — kein reines Schwarz auf hellem Grund. `[taste]` Detektor: `gpt-thin-border-wide-shadow`.
- **Icons:** Phosphor / HugeIcons / Radix / Tabler. **Lucide nur auf Wunsch.** Nie SVG-Icons handmalen. Eine Familie pro Projekt, `strokeWidth` global. **Kein Emoji als Icon.** `[taste]`+`[uiux]`
  - *ENTSCHIEDEN (Konflikt):* uiux-DB listet Lucide gleichwertig; **taste gewinnt** (Lucide discouraged).
- **Interaktive Voll-Zyklen:** Loading (Skeleton in Ziel-Form, keine generischen Spinner), Empty (schoen, zeigt wie befuellen), Error (inline an Feld / Toast nur transient), `:active`-Feedback (`-translate-y-[1px]`/`scale-[0.98]`). `[taste]`+`[uiux]`
- **Formulare:** Label UEBER Input, Helper darunter im Markup, Error UNTER Feld. **Kein Placeholder-als-Label.** Kontrast von Placeholder/Focus-Ring/Helper pruefen. `[taste]`+`[uiux]` (Prio 8).
- **Touch-Ziele ≥ 44×44px, ≥ 8px Abstand.** `[uiux]` (Prio 2).
- **Dropdown in `overflow:hidden/auto` wird geclippt** — natives `<dialog>`/Popover, `position:fixed` oder Portal. `[imp]` Detektor: `clipped-overflow-container`.

## 5. Motion

- **Motion ist Teil des Builds, nicht Nachtrag — und muss motiviert sein.** Vor jeder Animation: Was kommuniziert sie? (Hierarchie / Storytelling / Feedback / State). "Sah cool aus" = ungueltig. `[imp]`+`[taste]`
- **Dauer 150–300ms fuer Mikro-Interaktionen.** `[uiux]` (Prio 7).
- **Ease-out mit Exponentialkurven** (quart/quint/expo). **Kein bounce, kein elastic.** `[imp]` Detektor: `bounce-easing`.
- **Keine Layout-Properties animieren** (nur `transform`/`opacity`; nie `top/left/width/height`). `[imp]`+`[taste]` Detektor: `layout-transition`.
- **Kein `window.addEventListener('scroll')` / kein `scrollY` in React-State / kein rAF-Loop auf State.** Stattdessen `useScroll`/ScrollTrigger/IntersectionObserver/CSS `animation-timeline`. `[taste]`
- **Reveal-Animationen verbessern einen bereits sichtbaren Default** — Sichtbarkeit nicht an Klassen-Transition koppeln (feuert nie auf Hidden-Tabs/Headless). `[imp]`
- **Reduced Motion ist Pflicht** fuer alles ueber Mikro-Ebene: `@media (prefers-reduced-motion: reduce)` mit Crossfade/instant. Infinite-Loops/Parallax/Scroll-Hijack/Magnetik kollabieren zu statisch. `[imp]`+`[taste]`
- **Motion behauptet = Motion gezeigt.** Wer MOTION > 4 setzt, muss echte Bewegung liefern; sonst Dial auf 3 und sauber statisch. `[taste]`
- **Marquee max. 1 pro Seite.** `[taste]`
- **Libs nicht mischen:** GSAP/Three.js nicht mit Motion im selben Component-Tree; in `'use client'`-Leaf-Islands isolieren + Cleanup. `[taste]`+`[imp]`

## 6. Anti-Slop (registeruebergreifend)

**Der AI-Slop-Test:** Wenn jemand ohne Zweifel "AI made that" sagen koennte, ist es durchgefallen. `[imp]`
- **Category-Reflex-Check (zwei Ebenen):** (1) Wenn man Theme+Palette allein aus der Kategorie raten koennte -> erster Trainingsdaten-Reflex. (2) Wenn man die Aesthetik aus Kategorie+Anti-Referenz raten koennte -> Falle eine Ebene tiefer. Beide muessen nicht offensichtlich sein. `[imp]`

**Harte Verbote (Match-and-refuse):**
- Side-Stripe-Borders · Gradient-Text · Glassmorphism-als-Default · Hero-Metric-Template · identische Card-Grids. `[imp]`
- **Eyebrows/Section-Kicker rationiert: max. 1 pro 3 Sektionen (Hero zaehlt als 1).** `[taste]` Detektoren: `hero-eyebrow-chip`, `repeated-section-kickers`, `numbered-section-markers`. Nummerierte Marker (01/02/03) nur wenn die Sektion echt eine Sequenz IST.
- **Em-Dash `—` (und `–` als Separator) in sichtbarem Text: NULL. ENTSCHIEDEN (Konflikt):** taste verbietet komplett, impeccable-Detektor (`em-dash-overuse`) flaggt nur Uebernutzung — **taste gewinnt.** Ersatz: Punkt, Komma, Doppelpunkt, Klammern, Zeilenumbruch, normaler Hyphen `-`.
- **Marketing-Buzzwords/Filler-Verben** ("Elevate/Seamless/Unleash/Next-Gen/Revolutionize") — konkrete Verben. `[taste]`+`[imp]` Detektoren: `marketing-buzzword`, `theater-slop-phrase`, `aphoristic-cadence`.
- **"Jane Doe"-Effekt:** keine generischen Namen/Avatare/Acme-Brands/Fake-perfekten Zahlen (99.99%, 50%). `[taste]`
- **Div-basierte Fake-Screenshots/Fake-Product-UI: verboten** (der #1 Tell). Reales Bild, generiertes Bild, echte Mini-Komponente — oder nichts. `[taste]` Detektor: `broken-image`.
- **Text darf seinen Container nicht ueberlaufen** — Heading-Copy auf jedem Breakpoint testen. `[imp]` Detektor: `text-overflow`.
- **Deko-Tells (taste, Landing):** Scroll-Cues, Locale/Zeit/Wetter-Strips, Deko-Status-Dots, `border-t`+`border-b` auf jeder Zeile, Version-Footer auf Marketing, Pills-auf-Bildern, Foto-Credit-Deko, Split-Header (grosse Headline + kleiner Floater rechts). Alle Default-verboten.

## 7. Barrierefreiheit & Performance (Rubrik-Fundament)

- **A11y ist Prio 1** `[uiux]`: Kontrast, Alt-Text, Keyboard-Nav, Aria-Labels; Focus-Ringe nie entfernen; Icon-only-Buttons brauchen Label.
- **Core Web Vitals** `[taste]`: LCP < 2.5s (Hero-Bild `priority`/preload), INP < 200ms, CLS < 0.1 (Platz reservieren). Detektor-adjazent: `repeating-stripes-gradient`, `codex-grid-background` fangen Perf-/Slop-Bg-Muster.
- **Dark Mode fuer consumer-facing Pflicht** — beide Modi von Anfang an, WCAG AA in beiden, Marke bleibt erkennbar. `[taste]`
- **DOM-Kosten:** Grain/Noise nur auf `fixed, pointer-events-none`-Pseudo-Elementen, nie auf Scroll-Containern. `[taste]`

---

## Design-System-Kohaerenz (wenn Projekt-DESIGN.md existiert)
Vorhandene Tokens/Theme respektieren — nicht neu erfinden. impeccable-Detektoren
`design-system-font`, `design-system-color`, `design-system-radius`,
`design-system-font-size` flaggen Abweichungen von einer geladenen `DESIGN.md`.
Identity-Preservation gewinnt gegen Default-Regeln (z.B. Marke ist bereits lila -> bleibt lila).
