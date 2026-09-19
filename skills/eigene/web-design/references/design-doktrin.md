# Design-Doktrin: Typografie, Farbe, Spacing, Layout, Komponenten, Assets

Die harten, mechanisch prüfbaren Regeln. Bei Konflikten gewinnen entschiedene
Präzedenzfälle (Abschnitt 7) und danach: exakte Werte schlagen Faustregeln.

Inhalt: 1 Typografie · 2 Farbe · 3 Spacing & Gruppierung · 4 Layout-Disziplin ·
5 Komponenten · 6 Bilder & Assets · 7 Entschiedene Regelkonflikte

---

Die Code-Rezepte zu dieser Doktrin (Clamp-Skala, Token-Struktur, konzentrische
Radien, Shadows, Grid, Controls mit allen States) stehen in `handwerk.md`. Diese
Datei sagt, was gilt; jene zeigt, wie es geschrieben wird.

## 1. Typografie

**Floors (hart):**
- Body 16px (mobil auch Inputs ≥ 16px, sonst iOS-Zoom), UI/Menüs 14px, Captions 13px, nie < 12px.
- Zeilenlänge Body 60–75ch (`max-w-[65ch]`), Display-H1 gedeckelt via `clamp()` ≤ 6rem.
- Line-height unitless: Headings ~1.05–1.1, Body 1.5–1.6. Line-height invers zur Größe. Alles, was 3+ Zeilen umbricht, mindestens 1.4.
- Tracking-Floor **−0.04em** (besser −0.02 bis −0.03em); große Headings leicht negativ, kleine Caps-Labels leicht positiv, Fließtext keines.
- Weight-Floor: unter 18px mindestens 400; Weights < 300 sind Display-only (ab 28px).
- Wrapping-Quartett mit Einsatzort: `text-wrap: balance` auf h1–h3, `text-wrap: pretty` auf Descriptions/lange Prosa (gegen Widows; in Longform weder balance noch pretty), `overflow-wrap: break-word` auf lange IDs/URLs, `white-space: nowrap` auf Labels/Badges.

**Hierarchie:**
- Hierarchie aus Set: Size + Weight + Leading + Space + Tone, nie Size allein. Betonung über Weight.
- Referenz-Skala (Size/Line-Height/Weight als eine Entscheidung): Display 36/1.1/600 · Title 24/1.2/600 · Heading 18/1.3/600 · Body 16/1.5/400 · Caption 13/1.4/400. Emphase = ein Weight-Step (400→500), nie Size-Wechsel.
- Skala mit echtem Kontrast (≥ 1.25×-Schritte); zwei Größen innerhalb von 1–2px mergen. Flache Hierarchie (alles 14–18px) = AI-Tell.
- Umkehrfehler: ganzer Marketingsatz in Display-Größe → Kernaussage auf 2–3 Wörter komprimieren.
- Heading-Ebenen nicht überspringen; tiefere Ebene rendert nie größer als höhere.
- Über einer Überschrift mehr Platz als darunter.

**Font-Wahl:**
- Max 2–3 Schriften; Pairing über Kontrastachse (Serif+Sans) ODER eine Familie in mehreren Gewichten. Nie zwei fast identische Sans.
- **Kein LLM-Default-Font**: Inter, Space-Grotesk+Inter, Manrope, Plus Jakarta Sans sind Herkunftssignale. Bevorzugt: Geist, Outfit, Cabinet Grotesk, Satoshi, PP Neue Montreal. Override: expliziter Brief-Wunsch oder Public-Sector/A11y-first.
- **Serif-Disziplin**: Serif nur wenn (a) der Brief sie nennt ODER (b) echt editorial/luxury/heritage UND begründbar. Fraunces/Instrument Serif als Default verboten. Nie ein Serif-Einzelwort in eine Sans-Headline injizieren.
- Emphase im gleichen Font (Italic/Bold derselben Familie). Italic-Display mit Descendern (y g j p q): `leading-[1.1]+` + `pb-1` Reserve.
- Light-on-Dark kompensieren: mehr Line-Height, etwas Tracking, eine Gewichtsstufe mehr.

**Technik:**
- `.woff2`, Self-Hosting oder `next/font`, `font-display: swap`, `font-synthesis: none`, nur genutzte Weights laden, metrik-kompatible Fallbacks (kein FOIT/Reflow).
- `font-variant-numeric: tabular-nums` auf sich ändernden Zahlen/Datentabellen.
- `text-box: trim-both cap alphabetic` als Progressive Enhancement (Chromium 133+, Safari 18.2+): trimmt die Font-Leading-Reserve, Text sitzt in Buttons/Badges optisch zentriert statt zu tief.
- Underlines aus Font-Metriken: `text-underline-position: from-font`, `text-decoration-thickness: from-font`. Animierte Underlines als separates Element bauen (nur Color animiert zuverlässig).
- Font-Smoothing (`antialiased`) genau einmal auf Root, nie pro Komponente.
- Kein Justify, kein All-Caps-Body, kein Wide-Tracking auf Body. Abstand ODER Einzug bei Absätzen, nie beides.
- **Dash-Verbot (präzise)**: Kein Gedankenstrich mit Leerzeichen (`–`/`—` mit Spaces davor und dahinter) in sichtbarem Text. Erlaubt: Bindestrich (Zahn-Aligner), Bis-Strich ohne Leerzeichen (1–3). Ersatz: Punkt, Komma, Doppelpunkt, Klammern, Zeilenumbruch. Self-Check vor Output: Grep auf Gedankenstrich plus Leerzeichen muss leer sein.
- Spacing in rem/em (Zoom/User-Font-Size respektieren), logische Properties für RTL.

## 2. Farbe

**Strategie vor Farben** (Commitment-Achse): Restrained (Neutrals + 1 Akzent ≤ 10 % Fläche) · Committed (1 Farbe 30–60 %) · Full palette · Drenched. Dann committen.

**Locks (hart):**
- **Color-Lock: max 1 Akzentfarbe** für die ganze Seite; jede Komponente vor Ship prüfen. Der Akzent gehört idealerweise dem Primär-CTA (Rarity gibt Kraft).
- **Page-Theme-Lock**: EINE Theme pro Seite, keine invertierten Zwischensektionen.
- Kein reines #000/#fff → Off-black (z. B. zinc-950) / Off-white.
- **LILA-Rule**: AI-Purple/Blue-Glow (`#6366f1 → #a855f7`-Diagonalen, Neon-Gradients, Glow-Schatten) als Default verboten; nur echte Marke, dann gedämpft.
- **Premium-Palette-Ban**: Beige/Cream + Messing/Ocker + Espresso-Text (cookware/wellness/artisan-AI-Default) verboten, samt Token-Namen wie `--paper`/`--cream`. Alternativen rotieren: Cold Luxury, Forest, Cobalt+Cream, Terracotta+Slate, Monochrome + 1 Pop. Nie zweimal hintereinander dieselbe Familie.
- **Category-Reflex-Check**: Palette allein aus Branche (oder Branche + Anti-Referenz) erratbar = Trainingsdaten-Reflex → neu entscheiden.

**Konstruktion:**
- **OKLCH** für neue Paletten: 9 Stufen (50–950), getönte Neutrals +0.005–0.015 Chroma Richtung Marken-Hue, Kontrast-Fixes nur über den L-Kanal, Gamut-clampen, P3 mit sRGB-Fallback. Dark Mode = Lightness-Mapping umkehren, explizit komponieren (nie mechanisch invertieren).
- Ramp-Generierung (ausführbares Rezept): `delta = 0.4`, `minL = max(0.05, baseL − 0.4)`, `maxL = min(0.95, baseL + 0.4)`; Lightness gleichmäßig von 50→950; Chroma pro Step auf `(chromaPercentage/100) × maxChroma(L, hue)` clampen; Multi-Hue über gleiche Chroma-Prozente, nie absolute Werte. Steps dichter am hellen Ende, beide Enden stoppen vor Schwarz/Weiß.
- HSL-Warnung: HSL ist kaputt für Paletten (Hue-Drift ~16° Richtung Purple bei hellen Varianten, Brightness-Inkonsistenz Gelb vs. Blau bei gleichem L).
- Token-Grammatik: `--color-{role}-{variant}-{state}`, zwei Tiers (Primitives wie `--blue-500` nie in Komponenten; Semantics einzige Referenz). `accent` für Brand reservieren; `primary` = prominentestes Element seiner Gruppe (Kollision `--color-primary` vs. `--color-text-primary` vermeiden). Separator und Border sind verschiedene Rollen, auch bei gleichem Wert.
- Gradient-Interpolation: `in oklab` als Default; `in oklch`, wenn zwei Hues in der Mitte grau werden. sRGB-Default mutet den Midpoint.
- Rollen statt Swatch-Bag: canvas/elevated, primary/secondary text, action/focus/selection, borders, success/warning/error/info. Explizite Farben > Ketten transluzenter Overlays.
- Auf Farbflächen: Sekundärtext aus dem Hue der Fläche tönen, **nie generisches Grau**.
- Semantische Farben aus der eigenen Palette ableiten; kein Stock-Blau/Amber/Grün/Rot, keine "eine Hue in drei Opazitäten"-Statusboxen.
- Light vs. Dark aus der Nutzungsszene (wer/wo/welches Licht), nie aus Kategorie.
- Farbe nie alleiniger Informationskanal (+ Text/Form/Icon/Position).

**Kontrast (verifizieren, computed, alle States, beide Themes):**
- WCAG 2 für formale Compliance: Body ≥ 4.5:1 (auch Placeholder), Großtext (≥ 18px / ≥ 14px bold) ≥ 3:1, Controls/Icons/Focus ≥ 3:1.
- **APCA als Design-Default**: |Lc| 75 Body (90 preferred) · 60 Non-Body · 45 Large (≥ 36px) · 30 UI/Disabled · 15 Discernibility-Floor.
- Gegen den tatsächlich gerenderten Hintergrund messen (Karte ≠ Page-Bg; bei Translucency hellste und dunkelste mögliche Unterlage prüfen). Kontrast-Fix immer über Lightness, nie über Hue.
- 73-%-Crossover: bei 60–73 % perceived lightness misst Weiß besser als Schwarz, obwohl die Fläche hell wirkt. Mid-Lightness-Backgrounds (~75 %) deckeln den erreichbaren Kontrast (selbst Schwarz ≈ Lc 60): der Hintergrund muss weichen.
- **Report, don't repaint**: failing Pair melden statt Farben eigenmächtig ändern (Farben sind Design-Entscheidung). Nie einen Kontrastwert nennen, der nicht gemessen wurde.
- Häufigster Fehler: muted-grau auf getöntem Fast-Weiß → Body Richtung Ink schieben.

## 3. Spacing & Gruppierung

- **Werkzeug-Reihenfolge**: 1. Negativer Raum → 2. Hintergrundflächen → 3. Trennlinien (letzte Wahl).
- **2×-Regel**: Abstand zwischen Gruppen ≥ 2× Abstand innerhalb. Ein einziger Spacing-Wert überall macht Proximität informationslos → Skala mit echten Sprüngen (4/8/16/32/64).
- Spacing-Skalen nach DENSITY: spacious 24–96px (Section-Gaps py-32–48) · standard 16–64px (py-16–24) · dense 8–32px.
- Control-Gaps: 12px zwischen Controls mit Border/Füllung, 24px um randlose, 24px+ zwischen Gruppen. `gap` für Sibling-Rhythmus statt Child-Margins.
- Wenige gemeinsame Ausrichtungskanten; jede Streukante liest als Rauschen.
- Squint-Test: Primär-, Sekundärelement und Gruppenreihenfolge müssen verwischt erkennbar bleiben.

## 4. Layout-Disziplin (Landing; Bruch = kaputte Arbeit)

- **Hero**: Viewport-Fit (H1 ≤ 2 Zeilen, Sub ≤ 20 Wörter, CTA sichtbar), Top-Padding ≤ pt-24, max 4 Textelemente (Eyebrow ODER Brand-Strip zählt), Logo-Wall darunter.
- **Nav**: eine Zeile, ≤ 80px hoch (Default 64–72px).
- **Eyebrow-Restraint**: max 1 uppercase-getracktes Label pro 3 Sektionen (Hero zählt mit). Im Zweifel löschen.
- **Split-Header-Ban**: "große Headline links + kleiner Absatz rechts oben" als Sektionskopf verboten → vertikal stapeln (max-w-65ch).
- **Zigzag-Cap**: max 2 aufeinanderfolgende Image+Text-Splits; die 3. Sektion bricht das Muster.
- **Section-Layout-Repetition-Ban**: jede Layout-Familie max 1× pro Seite; 8 Sektionen → ≥ 4 Familien.
- **Bento**: exakte Zellenzahl (N Inhalte = N Zellen, keine leeren), ≥ 2–3 Zellen mit echter visueller Variation, kein Weiß-auf-Weiß-Typo-Grid.
- **Anti-Center-Bias**: bei VARIANCE > 4 kein zentrierter Hero (Split-Screen, linksbündig, asymmetrischer Weißraum). Override: Editorial/Manifesto.
- Keine 3 gleichen Feature-Cards, kein Icon-Kachel-Raster als Seitenstruktur, kein Hero-Metrik-Template (große Zahl + Label + Stats).
- **Responsive strukturell**: reorder/collapse/reflow statt nur skalieren; asymmetrische Layouts kollabieren < 768px strikt einspaltig; Mobile-Collapse pro Sektion explizit; `min-h-[100dvh]` statt `h-screen`; Container `max-w-7xl mx-auto`; Grid statt Flex-Prozentmathematik; Breakpoints aus dem Inhalt; Touch-Targets ≥ 44px; kein Horizontal-Scroll; Zoom nie deaktivieren; DOM- = visuelle Reihenfolge.
- **Content blutet, Controls schweben**: Medien bis an Viewport-Kante, Text/Controls innerhalb der Margins + Safe-Areas.
- Progressive Disclosure braucht ein Signal (Peeking-Items 16–32px, konkretes "Mehr anzeigen").
- Wachstum einplanen: keine festen Höhen auf Textcontainern, Pseudo-Lokalisierung testen, Primäraktionen nie in Clipping-Zonen.

## 5. Komponenten

- **Cards registerabhängig**: Landing = faule Antwort (lieber `divide-y`, Negativraum, asymmetrisches Grid); App = legitim. **Verschachtelte Cards immer falsch.**
- **Elevation einmal deklarieren**: Border ODER Shadow (Hairline + breiter Weichschatten = "Ghost-Card"). Shadow zum Bg-Hue tönen, Offset + weicher Blur; Halo ohne Offset = Deko.
- **Shadow-as-Border-Tokens**: Light dreilagig `0 0 0 1px oklch(0 0 0/0.06), 0 1px 2px -1px oklch(0 0 0/0.06), 0 2px 4px 0 oklch(0 0 0/0.04)` (Hover 0.08/0.08/0.06). Dark nur ein White-Ring `0 0 0 1px oklch(1 0 0/0.08)` (Hover 0.13): layered Shadows sind auf dunkel unsichtbar. Borders behalten für Divider, Tabellenzellen, Input-Outlines (A11y), Hairlines.
- **Shape-Lock**: EINE Radius-Skala pro Seite (all-sharp / all-soft 12–16px / all-pill). **Concentric Radius**: `outer = inner + padding`. Pills nur kleine Controls.
- **Buttons**: Label ≤ 3 Wörter (primäre CTAs), eine Zeile Desktop, Text lesbar gegen Hintergrund, `:active`-Feedback (`scale(0.96)`), kein Duplicate-CTA-Intent.
- **Optical Alignment**: Icon-Seite Padding = Text-Seite − 2px; Play-Triangle `translateX(2px)`; asymmetrische Icons im SVG selbst fixen.
- **WCAG 2.2 neu**: focus-not-obscured (Sticky-UI darf das fokussierte Element nie verdecken) · Target-Size-Floor 24×24 CSS-px (Spacing-Exception: 20px-Target mit 4px-Gap erlaubt) · accessible-authentication (Paste und Password-Manager erlauben, keine Cognitive-Tests) · dragging-alternative · redundant-entry (bereits eingegebene Daten wiederverwenden).
- **Formulare**: Label ÜBER Input, Helper im Markup, Error UNTER dem Feld, nie Placeholder-als-Label, Touch-Ziele ≥ 44×44px, Hit-Areas überlappen nie.
- **Icons**: eine Familie pro Projekt (Phosphor > HugeIcons > Radix > Tabler; Lucide nur auf Wunsch), globales strokeWidth, nie Emoji/Unicode als Icon, nie handgemalte SVG-Icons. Stroke ans Textgewicht koppeln: 1.5px neben 400 (14–16px), 2px neben 500–600, 2.5px neben Bold 700. Outline = Default, Fill = Active (State-Paar, nie mischen). Ein SVG mit `currentColor`, States via CSS (hardcoded Fills strippen). Bei Render-Größe designen (auf 16px testen, native Grids 16/20/24, kein fraktionales Scaling). RTL: richtungsgebundene Icons flippen (`scale: -1 1`), Logos/Checkmarks/Media-Playback nicht.
- **States vollständig**: default, hover, focus, active, disabled, loading (Skeleton in Ziel-Form, kein Spinner), empty (orientiert + eine nächste Aktion), error (inline am Feld, Toast nur transient).
- **Dropdowns/Popover** nicht in `overflow:hidden` clippen → Portal/`<dialog>`/fixed. **z-index** semantische Skala (sticky → modal → toast → tooltip), nie 9999.
- **Browser-Oberflächen mitgestalten** (billigstes Craft-Signal): Text-Selection, Caret, Scrollbars, Focus-Rings, Underline-Offset.
- **Transluzente Layer** (wenn Glass): `backdrop-filter: blur()+saturate()` + halbtransparenter Bg + 1px Inner-Border; nie helle Transluzenz auf heller stapeln; Solid-Fallback bei `prefers-reduced-transparency`; kein Glass als Default-Deko.
- Marquee max 1× pro Seite. Keine Side-Stripe-Borders (>1px farbiger border-left) auf Cards/Callouts. Kein Gradient-Text. Keine Sektionsnummern (01/02/03), außer die Sequenz trägt echte Information.

## 6. Bilder & Assets

- Landing/Portfolio sind visuelle Produkte: auch minimalistische Seiten brauchen 2–3 echte Bilder; der Hero braucht ein echtes Visual.
- **Div-basierte Fake-Screenshots/Fake-Produkt-UI = AI-Tell #1 → verboten.** Echtes Bild/Screenshot, generiertes Bild, echte Mini-Komponente oder nichts. Letzte Option: klar markierte Slots + Hinweis an den Nutzer.
- Placeholder nur als `picsum.photos/seed/{beschreibender-seed}/{w}/{h}`, keine kaputten Stock-Links, keine leeren src, keine data-URIs.
- **Logo-Walls**: echte SVGs (Simple Icons CDN), in Light+Dark renderbar, nur Logos ohne Kategorie-Labels; erfundene Marke → einfaches SVG-Monogramm statt Text-Wordmark.
- Keine sketchy Doodle-SVGs, kein `feTurbulence`-Grain, keine `repeating-linear-gradient`-Overlays ohne realen Grund. Erlaubt: SVG als saubere Geometrie (Diagramme, Vektorformen). Grain/Noise nur auf `fixed, pointer-events-none`-Pseudo-Elementen.
- Geometrische Masken (Circle/Polygon) als Fake-Cutout für Fotos verboten. Nie Bilder on hover animieren: der Container bekommt das Feedback.
- Bilder-Outline: `outline: 1px solid oklch(0 0 0/0.1)` (light) / `oklch(1 0 0/0.1)` (dark), `outline-offset: -1px`. `outline` statt `border`, weil layout-neutral. Nie hue-getönt (slate/zinc/`#0a0a0a`): eine getönte Outline nimmt die Fläche darunter auf und liest sich als Schmutz am Bildrand.
- Bei Rebuild-Aufträgen: Asset-URLs/Namen sind sakrosankt (kein Umbenennen, keine Unterordner, keine lokalen Imports, keine Ersetzung).

## 7. Entschiedene Regelkonflikte (Präzedenzfälle)

- **Em-Dash**: Totalverbot schlägt "nur Übernutzung vermeiden" → null `—`.
- **Tracking**: Floor −0.04em schlägt `tracking-tighter` (−0.05em).
- **Cards**: registerabhängig; verschachtelt immer falsch.
- **Icons**: Lucide nur auf expliziten Wunsch.
- **Exakte Werte schlagen Faustregeln**: scale 0.96 nicht 0.9; blur 4px nicht 2px.
- **Signature-Element bleibt Pflicht** auf jedem Dial-Level; Ausschlag skaliert mit VARIANCE.
- **Identity-Preservation schlägt Default-Regeln**: eine Marke, die bereits lila/beige ist, bleibt es.
- **Fix-Reihenfolge**: erst Tokens/Theme, dann Komponenten, dann Einzelstellen, zuletzt Copy, kleinstmöglicher Diff.
