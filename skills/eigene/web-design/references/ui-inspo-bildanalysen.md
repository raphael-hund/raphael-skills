# UI-Inspo-Bildanalysen — 66 Screens im Einzelbefund

> **Kanon-Verweis:** Die Destillation (Gesetze, Werte-Bibliothek, Signature-Moves) steht in
> `ui-inspo-patterns.md`. Diese Datei ist das Appendix-Archiv: Bild für Bild, gruppiert nach
> Projekt/System. Alle px-/Hex-Werte sind Schätzungen aus der Sichtung (Referenzbreite
> ~1440–1650 px Desktop bzw. Story-Formate ~1080 px), als Nachbau-Vorgaben gedacht.
> Quelle: X/Twitter-Inspirationssammlung, drei Analyse-Batches konsolidiert.

## Index

| Projekt / System | Bilder | Charakter |
|---|---|---|
| Next Level Funded (Prop-Trading) | 3 | Dark-Green, Neongrün-Akzent, Schach-3D |
| B2B3 (Marketing-Agentur, "Peacock") | 2 | Dark + Light, Violett/Gelb, Handschrift-Annotationen |
| Redocap (Microsoft-Partner) | 1 | Corporate-Serif, Light, Glass-Stats |
| Routinemodels (Safety-SaaS) | 1 | Skandinavisch-clean, Light, Understatement |
| Cybercube (Mining Digital Twin) | 4 | Monochrom-Dark, Browser-Mockup-Framing, Hatch |
| Parnidia / Neria (AI-Customer-Service) | 8 | Dark + Light Dual-Theme, Pixel-Treppe, Tick-Band |
| Wellness-App (Corporate-Wellbeing) | 2 | Light-Lavendel, Navy, App-Store-Ästhetik |
| Slip (Post-Purchase-E-Commerce) | 3 | Cream + Dark, Lime-Akzent, Retail-Fotografie |
| RevCraft (VC/Revenue-Group) | 1 | Dark, Orange-Red, 3D-Berg |
| Agentos / Lumen (AI-Dev-Tools) | 2 | Zeitungs-/Terminal-Mashup bzw. Light-Editorial-Serif |
| Myniq (Fintech) | 1 | Light, Aurora-Gradients |
| Iconly (Icon-Set-Marketing) | 4 | Tab-Bar-Showcase, Slide-Template |
| RevOps (Data-SaaS) | 1 | Light-Botanical, Steps mit Progress-Underline |
| Dark Analytics-Card-System (Observability) | 4 | Terminal-präzise, Mint-Akzent, Mono-Daten |
| Nike Run Club | 1 | Foto-Card, Light-Streaks, Text-Overlap |
| SEO/AEO Glass-Card | 1 | Glassmorphism auf Motion-Blur-Foto |
| Elasti (AI-Comms-App) | 3 | Teal-Glass, Mono-Nav, Live-Clock |
| DUNE (Strategy-SaaS) | 1 | Full-Bleed-Foto, Pixel-Display-Font |
| Scheduler/Calendar-Component | 1 | Light, Booking-Widget, Füllzustände ohne Farbe |
| HQ Finder (Office-Leasing) | 2 | Full-Bleed-Foto, Serif, Tungsten-Grading |
| Meska / Monee (Fintech) | 4 | Lime-on-Forest, Sheet-in-Sheet, Double-Ring |
| Anchor (Enterprise-Revenue) | 1 | Natur-Foto, Orange-Red, KPI-Hairlines |
| Sales-AI | 2 | Light, Mesh-Gradient-Cards, Cursor+You-Pill |
| Recline (Sales-Inbox) | 1 | Login + App-Preview, Tiefenstaffelung |
| Coach (Sales-Coach) | 4 | Story-Formate, Serif + Bogen-Motiv, Grün-Duotone |
| Widget-Trio (Kalender, Bar-Chart, Donut) | 3 | Showcase-Framing, Orange-Akzent, Capsule-Charts |
| Flink (B2B-Fintech) | 1 | Ölgemälde-BG, Sheet, Noise-Gradients |
| Stacker (No-Code-Portale) | 4 | Blau-Sheet, Lichtkeil, Card-Stacks |

---

## Next Level Funded (3 Screens)

### `HO4kc1SXYAEne0C.jpeg` — Hero
- **Was:** Hero, Prop-Trading/Finanz, aggressiv-premium ("Get Funded", Discount-Code).
- **Layout:** Links Text (~55 %), rechts 3D-Render (2 Schachbauern auf Podest, versetzte Höhen). Dreistufig oben: Trust-Bar → Nav → Promo-Banner. Volle Viewport-Höhe.
- **Typo:** Geometrische Sans durchgehend. H1 uppercase extrabold ~72–80 px, tracking −0.02em, H1:Body ≈ 5:1. Body ~16 px regular, weiß 85 %.
- **Farbe:** BG `#0A0F0D`, Flächen `#111815`. Akzent Neongrün `#4ADE80`–`#34D399` NUR für CTAs, aktive Chips, Icons. Radial-Glow hinter 3D-Figur (grün, ~10 % Opacity). Trust-Bar invertiert: grüne Fläche, schwarzer Text.
- **Radien/Border/Shadow:** Buttons radius 8 px, keine Borders, kein Shadow. Promo-Banner dunkle Card radius ~12 px, 1px Border `rgba(255,255,255,0.06)`. Grüner Glow als Shadow-Ersatz.
- **Komponenten:** Nav ~64 px, Logo links, 8 Links Mitte (13–14 px, opacity 70 %), rechts "Log In" (Ghost) + "Get Funded" (grün, 10×20) + "EN ⌄". Trust-Bar: 3 Pills mit Stern-Icons, Avatar-Stack (überlappend ~24 px), 1px vertikale Trennstriche. Primary CTA mit eingebettetem Chevron-Chip (▶ in abgedunkeltem Grün-Square).
- **Micro-Details:** 1px-Seitenrail links; Promo-Code als grüner Chip "CODE: 2XBOGO"; konkrete Zahlen im Subtext ("$400k", "$279"); Sterne gefüllt ~14 px; 3D metallisch-dunkel mit grünem Rim-Light.

### `HO4kc1VXsAAOGit.jpeg` — Prozess-Sektion
- **Was:** "How it works", 3 Steps.
- **Layout:** Asymmetrisch 2-spaltig: links sticky Headline + CTA + 3D-Springer, rechts drei gestapelte Step-Cards, leicht überlappend/versetzt (obere Karte ragt aus der Reihe).
- **Typo:** Eyebrow "THE PROCESS" ~11 px uppercase tracking ~0.12em Grün `#4ADE80`. H2 uppercase extrabold ~48 px. Card-Titel uppercase ~28 px semibold. Body ~15 px `rgba(255,255,255,0.55)`.
- **Farbe:** Cards `#101614` auf BG `#0A0F0D` — Kontrast nur ~4–6 % Helligkeit, Trennung primär über Border.
- **Radien/Border/Shadow:** Cards radius 16 px, 1px Border `rgba(255,255,255,0.07)`, kein Shadow. Step-Badge: Tint `rgba(74,222,128,0.12)` + grüner Text, radius 8 px.
- **Komponenten:** Step-Card: Icon-Badge "🛒 STEP 01" → Titel → 3 Zeilen Body → grauer Benefit-Chip am Fuß ("Instant Credential Delivery", `#1C2420`, radius 8 px, Icon links). Erste Karte mit grünem Dreieck-Marker (Progress).
- **Micro-Details:** "STEP 01/02/03" statt Bullets; EIN konkreter Benefit-Chip pro Card (beweist statt behauptet); Em-Dashes mit Leerraum; Duotone-Icons Strich 1.5 px; 3D-Springer füllt tote Ecke mit grünem Rim-Light.

### `HO4kc1wWEAAR6AF.jpeg` — Pricing
- **Was:** Interaktiver Pricing-Konfigurator + Checkout-Card.
- **Layout:** Header links, 3D-Schlüssel rechts oben (überlappt Whitespace). Drei Zeilen Chip-Selektoren (Typ → Variante → Größe), darunter 2 Cards: links "Account Rules" (Definition-List), rechts Preis-Card.
- **Typo:** Preis `$329` ~64 px grün, Streichpreis `$659` kleiner grau — Neu:Alt ≈ 2:1. Rules: Label links grau 60 %, Wert rechts grün/weiß, ~14 px.
- **Farbe:** Ausgewählte Chips volle Grünfläche + schwarzer Text; inaktive `#161C19` weiß 60 %. Micro-Labels über Chips ("Most Popular", "Best Value") ~10 px uppercase opacity 50 %.
- **Radien/Border/Shadow:** Chips radius 8 px, 1px Border. Cards radius 20 px, 1px Border `rgba(255,255,255,0.07)`. Rules-Rows 1px Bottom-Border `rgba(255,255,255,0.06)` — Tabelle ohne Raster.
- **Komponenten:** Plattform-Auswahl als 3 Segment-Buttons (aktiv grün). CTA full-width grün ~52 px, radius 12 px, Text enthält Preis ("Purchase Challenge - $329"). Payment-Icons zentriert darunter, grayscale ~14 px. Currency-Dropdown "$ EN ⌄".
- **Micro-Details:** 3D-Schlüssel mit eingelassenem Logo ("Key to funding"); Sternchen-Fußnoten ("100*", "On-Demand*") = Legal-Präzision; "Signed by founder spencer todd" Trust-Zeile mit Check; Trust-Bar identisch zum Hero wiederholt; Check-Icons in Kreisen grün 16 px.

---

## B2B3 (2 Screens)

### `HOsuRFsWMAA0DgI.jpeg` — Hero (Dark)
- **Was:** Agentur-Hero, B2B-Marketing, provokant-editorial.
- **Layout:** Links 45 % Text, rechts Full-Bleed-Foto (Pfau unter Tauben, lila colorgraded). Unten volle Breite: 4er-Stat-Leiste. Handschrift-Annotationen mit Pfeilen über dem Foto.
- **Typo:** Komprimierte Grotesk (Anton/Archivo-Black-Typ), uppercase, ~110 px, lh ~0.95. Farbwechsel in der H1: "PEACOCK" Violett `#8B30F0`, Rest weiß. Eyebrow gelb `#E3E83C` ~13 px uppercase tracking 0.08em semibold. Stats: Zahl gelb ~28 px bold + Label ~11 px uppercase grau.
- **Farbe:** BG `#0A0A0A`. Zwei Akzente mit Aufgabenteilung: Violett = Marke/H1/Primary-Button, Gelb = Annotationen/Stats/Eyebrow. Foto auf Dunkelheit abgestimmt.
- **Radien/Border/Shadow:** Buttons eckig (radius ~2–4 px): Primary Violett solid, Secondary 1px Border weiß 40 % transparent. Keine Shadows.
- **Komponenten:** Nav ~72 px, Links uppercase 13 px semibold tracking 0.04em. Stat-Leiste: Icon (violett outline) + Zahl + Label, nackt auf BG.
- **Micro-Details:** "YOU" in Display-Font gelb über dem Pfau (Bild wird Teil der Headline); Pfeil-Annotationen wie Whiteboard-Notizen ("GENERIC GTM", "AI SLOP", "SAME POSITIONING"); "$0–$1M ARR" gelb im Fließtext; Stats mit Einheiten-Mix ("11.7x", "100%", "20+").

### `HOsuRGCWgAAyYj3.jpeg` — Hero (Light)
- **Was:** Dieselbe Seite als Light-Mode — System-Portierung im direkten Vergleich.
- **Layout:** Identisch, Foto-Komposition anders (Pfau größer, Feld hell). H1 links ~40 %.
- **Typo:** Gleiche Fonts. H1 Schwarz + "B*'LLOCKS" in Violett — Zensur-Asterisk als Provokation. Eyebrow violett statt gelb (Rollentausch der Akzente).
- **Farbe:** BG warmes Off-White `#F4F2ED`. Tauben desaturiert → Grayscale, Pfau behält Violett/Gold (selektive Farbe). Gelb nur noch für "YOU?".
- **Radien/Border/Shadow:** Buttons eckig; Secondary 1px Border schwarz 25 %; Nav-CTA transparent mit Border.
- **Komponenten:** Identisch zu Dark — System trägt beide Modi ohne Komponenten-Redesign.
- **Micro-Details:** Avatar-Foto des Founders im Auge des Pfaus (winziger ~32 px Kreis — persönliche Marke im Maskottchen); "B*'LLOCKS" als Kompromiss Provokation/Seriosität.

---

## Redocap (1 Screen)

### `HOsuRHfXMAAzwGN.jpeg` — Hero
- **Was:** Corporate-Consulting-Hero (Microsoft-Partner), seriös-enterprise.
- **Layout:** 2-Spalten (Text links ~45 %, Visual rechts). Visual = unscharfes grünes Natur-Foto (Motion-Blur) mit zwei darüberschwebenden Glass-Stat-Cards.
- **Typo:** Serifen-Display (Editorial-Art) ~64 px, normal weight, lh ~1.05, Satz mit Punkt ("Companies."). Body Sans ~17 px grau. Card-Labels 10 px uppercase tracking 0.1em, mono-artig.
- **Farbe:** BG `#FAFAF8`. Akzent zurückhaltend: grüner Status-Dot im Nav-Button, Chart-Linie `#2F6B4F`. Primary Button ist SCHWARZ.
- **Radien/Border/Shadow:** Stat-Cards radius ~12 px, kaum Border, weicher Shadow `0 8px 30px rgba(0,0,0,0.08)` + leichte Transparenz (Glass über Foto). Nav-Pill "Book a Call": 1px Border `#E5E5E0`, radius 999, grüner Dot 8 px.
- **Komponenten:** Stat-Card: Label mono-uppercase → Riesenzahl Serif "+38%" → Erklärtext Sans; Sparkline (2 px) bzw. Donut (Ring ~10 px Strich, Rest grau 10 %). Logo mit Micro-Tagline darunter (~7 px).
- **Micro-Details:** Grüner Live-Dot im Nav-CTA; Zahl/Einheit unterschiedlich gewichtet; Donut-Label "AUTOMATION RATE" im Ring zentriert; Tagline 1/3 der Logogröße; Microsoft-Logo-Square als 12 px-Miniatur vor dem Eyebrow; Motion-Blur-Foto statt Stock-Kitsch.

---

## Routinemodels (1 Screen)

### `HOsuRIyWEAERajY.jpeg` — Hero + Social Proof
- **Was:** B2B-SaaS-Hero (Occupational Health), skandinavisch-nüchtern.
- **Layout:** Text links (~48 %), rechts Architektur-Foto (Brücke von unten, Teal-Gradient), exakt an rechter Kante abgeschnitten, volle Höhe. Darunter Logo-Reihe + Stat/Testimonial-Zeile in 3 Spalten.
- **Typo:** Geometrische Sans, H1 ~56 px tracking −0.03em regular-medium (NICHT extrabold — Understatement). Body 18 px `rgba(0,0,0,0.65)`, max-width ~52ch. Stats: Zahl ~56 px light + Label 14 px rechts daneben (2-zeilig).
- **Farbe:** BG `#FAF9F6`. Kein Akzent außer Navy-Button `#101828`. Foto liefert einzige Farbe (Teal `#3D7A80`). Logos Grayscale opacity ~50 %.
- **Radien/Border/Shadow:** "Request Demo" radius 8 px solid navy, 14×24. Nav-CTA "Book Demo" `#F0EFEA` radius 8 px. Keine Shadows/Borders außer Hairline unter Nav.
- **Komponenten:** Nav ~68 px, Wortmarke lowercase-semibold. Logo-Leiste mit riesig viel Luft. Stat-Blöcke horizontal: Zahl links, Text rechts auf Baseline-Mitte.
- **Micro-Details:** Testimonial ohne Card — Zitat + Avatar + Name nackt; dünne Zahlen ("200+", "80%") wirken teurer als bold; Foto atmet nach links in den Text; kein einziges Icon.

---

## Cybercube (4 Screens)

### `HOy1rjAXMAAoeGv.jpeg` — Feature-Cards (Browser-Mockup)
- **Was:** Feature-Übersicht (4 Cards), Mining-SaaS, im Browser-Chrome-Mockup auf rotem Gradient (Dribbble-Framing).
- **Layout:** Header 2-spaltig (Headline links, Beschreibung rechts oben — Text-Text-Split). Darunter 4 gleich breite Cards. Seitenränder mit diagonalem Hatch-Pattern gefüllt.
- **Typo:** H2 ~40 px medium white. Card-Titel 20 px medium, Body 14 px `rgba(255,255,255,0.5)`, lh 1.55.
- **Farbe:** BG `#0D0D0D`, Cards `#161616`. Kein Farbakzent im UI — Monochrom-Disziplin, Rot nur im Framing.
- **Radien/Border/Shadow:** Cards radius ~12 px, 1px Border `rgba(255,255,255,0.06)`. Interne Thumbnails radius 8 px, dunkler `#0A0A0A` — 2 Ebenen Schachtelung.
- **Komponenten:** Card = Thumbnail (16:10) + Titel + 3 Zeilen Body, kein CTA. Mini-UI mit Form-Labels "Tag: Type: User:" (Doppelpunkt-Konvention).
- **Micro-Details:** Hatch-Bänder 45°, ~1px Linien, 6 % Opacity als Seitenrahmen; Browser-Chrome mit echten Traffic-Lights; Thumbnails = dunkle 3D-Renderings der echten Software (Produkt als Bildwelt); Header-Split vermeidet Doppel-Zentrierung.

### `HOy1s3hWYAALb6c.jpeg` — 3D-Perspektiv-Shot
- **Was:** Showcase: UI-Cards als 3D-Ebenen im Raum (~15° rotiert), über roten 3D-Container-Stacks.
- **Layout:** Kein Raster — bewusste Schrägstellung, Cards überlappen mit Tiefe; Annotation-Label "AUTOMATION SCENARIOS." schwebt mit Verbindungslinien zu Map-Pins.
- **Typo:** Floating-Chip-Label 11 px uppercase tracking 0.1em.
- **Farbe:** Schwarz + Rot `#D42020` als Environment (Frachtcontainer-Textur). UI bleibt monochrom — Dramaturgie macht die 3D-Szene.
- **Radien/Border/Shadow:** Floating-Chip radius 8 px, 1px Border weiß 20 %, dunkel-transluzent. Weiche gerenderte Schatten unter Ebenen.
- **Komponenten:** Gauge (Halbkreis aus einzelnen Ticks), Status "✓ Safe" gefüllter Check-Circle 20 px, Chip "PRODUCTIVITY ✓" als Pill.
- **Micro-Details:** Gauge-Ticks als einzelne abgerundete Segmente; Satzpunkt am Label-Ende ("SCENARIOS.") — Terminus-Ästhetik; Annotation-Linien 1px weiß 40 % mit Node-Dots an beiden Enden.

### `HOy1suUXUAA0wyK.jpeg` — 2×2-Benefit-Grid
- **Was:** Benefit-Sektion 2×2, wieder im Browser-Mockup.
- **Layout:** Striktes 2×2, Gap ~24 px. Jede Zelle: Titel + 1-Zeilen-Body oben, Thumbnail unten — Text AUSSERHALB des Bildes.
- **Typo:** Zellentitel 22 px regular (selbstbewusste Ruhe), Body 14 px grau 50 %, exakt 1 Zeile pro Benefit.
- **Farbe:** Durchgehend monochrom, Rot nur im Framing.
- **Radien/Border/Shadow:** Zellen ohne Border, nur Thumbnails radius 10 px. Trennung rein durch Abstand (~60 px vertikal).
- **Komponenten:** Thumbnail 4: Kontext-Panel "Equipment info" mit 3 Icon-Buttons in eigener dunklerer Toolbar-Leiste (36 px quadratisch, radius 6 px).
- **Micro-Details:** Copy-Disziplin Titel + exakt 1 Satz; Annotation-Chip "AUTOMATION SCENARIOS." wiederholt sich (Systematik); alle 4 Thumbnails gleiche Kameraposition/Licht.

### `HOy1tFEX0AAWG4D.jpeg` — Hero
- **Was:** Zentrierter Hero mit 3D-Code-Cube.
- **Layout:** Vertikale Symmetrie: Nav → H1 (2 Zeilen) → Subline (max 60ch) → CTA → großes 3D-Visual (Würfel mit Code-Textur, leicht gekippt, Wireframe-Blueprint darunter).
- **Typo:** H1 ~52 px regular (!), tracking −0.01em. Subline 16 px `rgba(255,255,255,0.55)`. CTA-Text 12 px uppercase tracking 0.08em.
- **Farbe:** Monochrom Schwarz. Einziger Farbpunkt: roter 4 px-Dot im Logo ("CYBERCUBE•").
- **Radien/Border/Shadow:** CTA Ghost: transparent, 1px Border `rgba(255,255,255,0.25)`, radius 2 px (fast eckig), 14×28 — gleiche Form in der Nav wiederholt.
- **Komponenten:** Nav ~64 px, Links 14 px opacity 60 %, aktiver Link 100 %. Logo-Dot als Trademark-Ersatz.
- **Micro-Details:** Roter Logo-Dot als einziges Farb-Equity; Code auf dem Würfel ist echter lesbarer JS-Code (~8 px Mono); CTA zweimal identisch (Wiederholung als System); Ghost-Button als PRIMARY — souveränes Anti-Pattern zu Neon.

---

## Parnidia / Neria (8 Screens, Dual-Theme)

### `HP68IjgXYAAmCwH.jpeg` — Feature-Bento (Dark)
- **Was:** 2er-Feature-Wechsel (diagonales Bento), AI-Customer-Service.
- **Layout:** 2×2 diagonal versetzt (Text/Foto wechseln), Cards exakt gleiche Höhe, Gap ~8 px (sehr eng — wirkt wie ein Objekt). Cards bleeden an Viewport-Ränder.
- **Typo:** Feature-H2 ~36 px regular white, 2 Zeilen. Body 15 px grau 55 %, max 40ch. Keine Eyebrows.
- **Farbe:** BG `#0A0A0A`. Fotos warm-orange (sepia-warm) — heiß/kalt-Kontrast. App-Icons (WhatsApp, Instagram, Slack, Messenger) originalfarbig als Farbtupfer.
- **Radien/Border/Shadow:** Cards radius ~16 px, 1px Border `rgba(255,255,255,0.08)`. Buttons Pill 999: Primary weiß mit schwarzem Text (!), Secondary `#1A1A1A`. Daten-Card im Foto weiß, radius 12 px, Shadow `0 4px 20px rgba(0,0,0,0.3)`.
- **Komponenten:** Floating-UI über Foto: "Active Calls"-Tabelle (Caller/Type/Duration, 6 Zeilen, 12 px, Header grau uppercase 10 px). App-Icons als 56 px-Squares, radius 14 px, weiß, über dem Foto verstreut (Constellation).
- **Micro-Details:** Telefonnummern mit "…" abgeschnitten (Privacy-Realismus); Dauern "2m 14s"; UI-Cards organisch verteilt statt grid; AI-Avatar (3D) rund mit orangem Rahmen.

### `HP68IjiWwAATiXe.jpeg` — Testimonial (Dark)
- **Was:** Testimonial/Case-Card mit Metrik.
- **Layout:** Logo oben links, Pfeil-Buttons oben rechts (Carousel). Quote links groß (max ~55 %), rechts unten Pixel-Treppen-Bildmaske. Unten: Avatar + Name | vertikale 1px-Linie | Metrik.
- **Typo:** Quote ~32 px regular (!), weiß 90 %, lh 1.4 — keine Anführungszeichen-Grafik. Metrik "60%" ~40 px light, Label 13 px grau.
- **Farbe:** BG `#0A0A0A`. Treppen-Bild warm-orange (Bildwelt-Konsistenz).
- **Radien/Border/Shadow:** Pfeil-Buttons 48 px-Squares radius 10 px `#1A1A1A`. Avatar-Platzhalter weiß 64 px radius 12 px. Vertikale Trennlinie 1px `rgba(255,255,255,0.2)`.
- **Komponenten:** Carousel-Chevrons dezent; Kunden-Logo als Text+Plus-Icon-Komposit (weiß).
- **Micro-Details:** PIXEL-TREPPEN-MASKE: Foto als aufsteigende Treppe aus ~8 px-Pixel-Stufen (Signature, 4–6× wiederholt); Metrik neben der Person statt unter dem Quote — Zahlen-Beweis auf Augenhöhe.

### `HP68IjxW0AAZDU5.jpeg` — Hero (Dark)
- **Was:** Hero + Logo-Leiste.
- **Layout:** Text links (~50 %), Pixel-Treppe rechts oben (von oben rechts absteigend). Darunter 1px-Trennlinie, Social-Proof-Zeile zentriert, 5 Logos in Reihe.
- **Typo:** H1 ~56 px regular white, tracking −0.02em. Subline 16 px grau 55 % Title-Case. Nav-Links 14 px grau.
- **Farbe:** BG `#0A0A0A`. Logo-Reihe Grayscale opacity ~45 %.
- **Radien/Border/Shadow:** Buttons Pill 999, ~52 px: eine `#1A1A1A` mit Border, eine weiß. Nav-CTA weiße Pill.
- **Komponenten:** Nav ~72 px, Wortmarke lowercase. Hairline `rgba(255,255,255,0.08)` über volle Breite, dann "30+ Companies…" 15 px opacity 60 %, dann Logo-Row.
- **Micro-Details:** Treppe wächst hier von oben rechts (Varianten-System); Tick-Mark-Band (Lineal-Striche) unter der Nav; Kunden-Logos als Icon+Wordmark-Kombis einheitlich gegrayt.

### `HP68IlEXIAAk1Nl.jpeg` — 3er-Feature (Dark)
- **Was:** "Why teams switch", 3 Spalten.
- **Layout:** Headline oben links, 3 gleich breite Spalten: Foto-Panel mit Floating-UI oben, Titel + 2-Zeilen-Body unten. Spalten durch 1px-Linien getrennt.
- **Typo:** H2 ~40 px regular. Spalten-Titel 22 px regular, Body 14 px grau 50 %.
- **Farbe:** Fotos warm-sepia. AI-Chat-Bubble Koralle `#E85D4A` (einziger Signalfarb-Einsatz). "Before $30k/mo" rot, "After $3k/mo" grün — Semantik über Farbe.
- **Radien/Border/Shadow:** Floating-Bubbles radius 14 px weiß, weicher Shadow. Chat-Bubbles links weiß (User), rechts koralle (AI), radius 16 px mit Tail.
- **Komponenten:** Before/After als zwei Bubbles mit gestrichelter Verbindungskurve. Chat-Mock mit "1s ago"/"just now". Hub-and-Spoke-Diagramm (Logo-Kreis → 3 Avatar-Kreise, gestrichelt dash ~6/gap 4).
- **Micro-Details:** Gestrichelte Linien als Konnektor-Motiv; Timestamps verkaufen Geschwindigkeit; $30k→$3k als Dialog-Blasen statt Tabelle; 3D-Avatare (roter Panda) mit farbigem Ring.

### `HPl0_oOWIAA7FaU.jpeg` — Problem-Sektion (Light)
- **Was:** Problem-Agitation ("Why hire people…"), Light-Mode.
- **Layout:** Links 3D-Kugel (Gradient rot→orange→gelb, ~40 %, vertikal zentriert), rechts Headline + 3 Absätze. Unten volles Tick-Mark-Band.
- **Typo:** H2 ~40 px regular schwarz, tracking −0.02em. Body 16 px `rgba(0,0,0,0.5)` — bewusst niedriger Kontrast (Hierarchie über Opacity).
- **Farbe:** BG `#FAFAF8`. Kugel trägt gesamte Farbe: Mesh `#E8402A`→`#F5A623`→`#F7E14A` mit Grain.
- **Radien/Border/Shadow:** Nichts — komplett flach, Sektion atmet über Weißraum (~120 px Padding).
- **Komponenten:** Keine. Reine Editorial-Sektion.
- **Micro-Details:** Rhetorische Frage als H2; 3 kurze Absätze statt Bullets (Text-Disziplin); Grain ~5 % auf der Kugel macht den Gradient "teuer"; Tick-Band als wiederkehrender Sektions-Fuß.

### `HPl0_oOXwAArrHX.jpeg` — Prozess + CTA (Light)
- **Was:** "How it works"-Step + Final-CTA.
- **Layout:** Oben links quadratische Gradient-Fläche (grün-blau Mesh) mit Hub-Diagramm, rechts Text mit vertikaler Linie. Unten zentrierter CTA-Block, flankiert von zwei Gradient-Treppen (links aufsteigend, rechts absteigend — Symmetrie).
- **Typo:** H2 ~40 px regular, "3–4 weeks" mit En-Dash. Step-Titel 28 px, Body 15 px grau. CTA-H2 identisch zur Feature-H2 (Größen-Konsistenz).
- **Farbe:** Light-System; Gradient-Flächen mit Grain.
- **Radien/Border/Shadow:** Vertikale 2px-Linie `#111` neben Step-Titel (Definition-List-Marker). Buttons Pill: Primary schwarz, Secondary `#F0F0EC` — Invertierung des Dark-Systems.
- **Komponenten:** Hub-Diagramm: weiße Icon-Squares (48 px, radius 12 px) mit gestrichelten Linien auf Gradient, Zentrum = Logo. Dokument-Icons outline 1.5 px.
- **Micro-Details:** Treppe hier OHNE Foto (Gradient-Füllung = Abstraktions-Stufe); vertikaler Marker-Strich statt Nummern; Title-Case in Subline (US-Sales-Ton).

### `HPl0_onXIAAb2z4.jpeg` — Hero (Light)
- **Was:** Light-Variante des Dark-Heros.
- **Layout:** Identisch: Text links, Treppe rechts oben, Hairline, Logo-Row. Tick-Band direkt unter Nav.
- **Typo:** H1 ~52 px regular mit Oldstyle-Spiel: "8o%", "6o" (lowercase-o-Substitution/Font-Eigenheit — Editorial-Pointe).
- **Farbe:** BG `#FAFAF8`. Treppe mit grün-blau-Mesh + Grain.
- **Radien/Border/Shadow:** Pill 999: Primary schwarz, Secondary `#F0F0EC`. Nav-CTA schwarze Pill.
- **Komponenten:** Identisch zum Dark-Hero — konsistentes Dual-Theme.
- **Micro-Details:** Konkrete Zahlen im Claim ("80%", "60 days") statt "Automate your chats"; Treppen-Maske als Marken-Asset über beide Themes; Logo-Row opacity ~40 %.

### `HPl0_pyWMAAJwcu.jpeg` — Testimonial (Light)
- **Was:** Light-Variante des Testimonials.
- **Layout:** Identisch: Quote links, Treppe rechts (grün-Gradient), Person | Linie | Metrik unten.
- **Typo:** Quote ~30 px regular, `rgba(0,0,0,0.85)`.
- **Farbe:** Light-System. Pfeil-Buttons `#F0F0EC`.
- **Radien/Border/Shadow:** Vertikale Trennlinie 1px `rgba(0,0,0,0.15)`. Buttons radius 10 px.
- **Komponenten:** Carousel-Controls oben rechts; Kunden-Logo schwarz (Plus-Icon + 3-zeilige gestaffelte Wordmark).
- **Micro-Details:** Dark/Light-Paar beweist Token-System: Opacity-Werte exakt invertiert (0.55 weiß ↔ 0.5 schwarz); Treppe als Farbträger im farblosen Layout.

---

## Wellness-App (2 Screens)

### `HQE8WgsW4AASkrb.jpeg` — Feature-Carousel
- **Was:** Feature-Karussel (3 sichtbare Cards, dritte ~15 % angeschnitten), Corporate-Wellbeing.
- **Layout:** Headline links oben + Carousel-Pfeile rechts oben. Horizontal scrollende Cards (~620 px), bleeden links an den Rand. Angeschnittene Card = Scroll-Affordance.
- **Typo:** H2 ~44 px bold navy `#1B1F3B`. Card-Titel 28 px semibold weiß, Body 15 px weiß 70 % — Overlay unten links über Gradient.
- **Farbe:** BG weiß. Cards: Grayscale-Sportler-Fotos bzw. Periwinkle-Fläche `#8E9BF0`. Pfeil-Buttons navy solid.
- **Radien/Border/Shadow:** Cards radius ~28 px, kein Border. Pfeil-Buttons 56 px radius 16 px navy. Bottom-Gradient schwarz 60 %→0 für Lesbarkeit.
- **Komponenten:** Card = Foto/Visual + Overlay-Titel + 2 Zeilen Body. 3 Phone-Mockups (rotiert ±5°, überlappend) mit schwebenden Review-Chips ("Easy to use and run ★★★★★", weiße Cards mit Shadow).
- **Micro-Details:** Angeschnittene dritte Card als Scroll-Signal; Review-Chips zeigen echten UI-Text (auch finnisch — Authentizität); Overlay-Gradient nur im unteren Drittel.

### `HQE8WhYWMAANrr2.jpeg` — Hero
- **Was:** App-Hero mit Device + Floating-UI, freundlich-B2C.
- **Layout:** Text links (~45 %), rechts iPhone-Mockup (leicht schräg, wächst aus Viewport unten) mit 3 schwebenden UI-Cards. Pastell-Blob (Periwinkle) halb hinter dem Phone.
- **Typo:** H1 ~64 px bold navy, tracking −0.03em, Punkt am Ende. Body 17 px grau. Proof-Pill 13 px.
- **Farbe:** BG `#F2F1FB`. Primary navy `#1B1F3B`. Mini-Card-Icons: Magenta/Grün/Orange/Blau/Gelb als 24 px-Squares (Gamification, klein dosiert → nicht grell).
- **Radien/Border/Shadow:** Buttons Pill 999 navy, 16×32. Floating-Cards radius 16 px weiß, Shadow `0 12px 40px rgba(27,31,59,0.12)`. Avatar-Stack: 5 × 28 px, −8 px Overlap, 2 px weißer Ring.
- **Komponenten:** Proof-Pill (Avatare + "4261+ User reviews on Capterra, Play Store, and Trustmary", BG `#E8E6F5`, radius 999). "MY DAY"-Card: farbige Icon-Squares (24 px, radius 6 px) + Label + Punkte-Chip + Chevron.
- **Micro-Details:** Tausender-Leerzeichen ("2 817 steps", "+6 000 p") — europäische Formatierung; "10× more" mit Multiplikationszeichen; Notification-Card überlappt Phone-Kante; Blob bricht die Rechteckigkeit.

---

## Slip (3 Screens)

### `HQeBQ4MWIAArtrg.jpeg` — Feature-Carousel (Cream)
- **Was:** Feature-Karussel, Post-Purchase-E-Commerce, Premium-Retail-Ton.
- **Layout:** Zentriertes Label + H1 + Subline, darunter Card-Row (3 voll + 1 angeschnitten), Cards ~25 % Viewport, Gap ~20 px.
- **Typo:** Eyebrow-Chip "HOW SLIP WORKS" 11 px uppercase tracking 0.1em, weiß auf dunkelbraun Pill `#3A2E28`. H1 ~48 px semibold tracking −0.02em, Punkt am Ende. Card-Titel 26 px semibold weiß oben links auf Foto, Body 14 px weiß 75 % unten.
- **Farbe:** BG warmes Cream `#F7F4EE`. Fotos dunkel-warm (Boutique). Notification-Chips: Gelb-Grün `#D8F26E` Icon-Square + dunkel-transluzente Glass-Bar.
- **Radien/Border/Shadow:** Cards radius ~20 px. Notifications Glass: `rgba(30,25,20,0.55)` + backdrop-blur, radius 14 px, Icon-Square 36 px radius 10 px Signalfarbe.
- **Komponenten:** Card = Full-Foto + Titel oben + Floating-Notification mittig + Body unten. Notifications im iOS-Push-Stil: Label uppercase 10 px opacity 70 % + Nachricht 14 px.
- **Micro-Details:** Wortspiel in Subline ("used to Slip through the cracks" — Marke im Verb); Notification-Texte produkt-scharf ("Gift shopper detected", "Complete the look"); Text oben UND unten über eigenen Scrims (Top + Bottom).

### `HQeBQxLXkAAO1g2` — Tab-Feature-Sektion (Dark)
- **Was:** Feature-Sektion mit Tab-Switcher (CRM & Loyalty / Marketing / Technology), ruhig-premium.
- **Layout:** Full-Bleed Schwarz; oben zentrierte 3-Segment-Pill (gleich breite Segmente); darunter große Card (~24 px radius), intern 40/60: links Text, rechts Foto.
- **Typo:** Eyebrow "FOR MARKETING TEAMS" ~12 px uppercase mit Akzent-Strich davor. H1 ~56 px/1.05 regular (!), Body ~17 px, 60 % opacity.
- **Farbe:** BG #000; Card `#0A0A0A`; Akzent Lime ~`#DDFB8C` nur für: aktiven Tab, Eyebrow-Strich, CTA, Icon-Tiles. Weiß 100 % Headline / 60 % Body.
- **Radien/Border/Shadow:** Tab-Container radius ~14 px, aktive Pille ~10 px; Card ~24 px; Foto ~16 px; keine Schatten, Trennung über Flächenkontrast.
- **Komponenten:** Aktiver Tab = Lime + schwarze Schrift; inaktiv transparent + 1px Border `#1F1F1F`. CTA "Explore Marketing" Lime-Pille, radius ~10 px, 14×24, 15 px medium. Status-Chip "Campaign ready" 1px outline radius 8 px. Glass-Card auf Foto mit Icon-Tile + Micro-Label + Wert; zwei Kennzahlen (38 % / +24 %) ~40 px mit 11 px uppercase Labels.
- **Micro-Details:** Akzent-Vertikalstrich vor Eyebrow; Glass nur auf der schwebenden Card, sonst flat; "+"-Präfix bei Zahlen; Foto füllt Card-Seite kantenlos (inset 0).

### `HQeBQy8XgAAwavQ` — Homepage-Hero (Light)
- **Was:** Zentrierter SaaS-Hero, Retail-Tech, warm/freundlich.
- **Layout:** Zentrierte Achse: Logo+Nav → Trust-Pill → H1 → Subline → 2 Buttons → Device-Mockup mit schwebenden Karten, läuft unten aus dem Viewport.
- **Typo:** H1 ~80 px, weight ~500, tracking −0.03em, lh ~1.0. Subline ~19 px, 60 % schwarz. Nav 15 px.
- **Farbe:** Warmes Creme (`#F4F1EA`) über weichgezeichnetem Foto (Bokeh-Laub) — Hintergrund ist Foto, nicht Flat. Lime nur in Mini-Chips; Status-Chip "READY" grün `#4ADE80`.
- **Radien/Border/Shadow:** Buttons/Trust-Pill 999; Floating Cards ~16 px; Phone-Frame ~40 px. Floating Cards Shadow `0 12px 40px rgba(0,0,0,.12)`.
- **Komponenten:** Primary schwarz Pill, Secondary weiß mit 1px Border; Nav-CTA schwarze Pill "Book a demo". Floating Cards: Icon in schwarzem Tile (radius 10 px), Micro-Label 10 px grau uppercase, Titel 16 px 600, Sub 13 px grau, Avatar-Stack (3, 1px white ring).
- **Micro-Details:** Trust-Pill = uppercase Text + Avatar-Stack in einer Pille; Logo mit zwei gestapelten Mini-Chips; "9:41" in der Phone-Statusbar (Apple-Konvention); Cards brechen seitlich über das Phone hinaus (versetzte Höhen = Parallax-Anmutung).

---

## RevCraft (1 Screen)

### `HQjK9U-WkAAznop` — Hero (Dark, VC/Revenue-Group)
- **Was:** Hero für B2B-Growth-/VC-Gruppe, ernst, ambitioniert.
- **Layout:** Text links (~45 %), rechts monochromes 3D-Berg-Render bis an den Rand; unten Logo-Marquee "Our portfolio".
- **Typo:** H1 ~72 px regular, tracking −0.02em, lh 1.05. Body 17 px grau. Nav 15 px.
- **Farbe:** BG #000; Akzent Orange-Red ~`#F4520B` nur für CTAs + Logo-Detail. Berg in Sepia/Mono entsättigt, damit Orange trägt.
- **Radien/Border/Shadow:** Buttons Pill 999; keine Cards.
- **Komponenten:** Primary Orange-Pill, Secondary 1px white/20 outline-Pill. Nav-CTA identische Orange-Pill ("Apply to Partner With Us") — CTA-Dopplung Nav+Hero mit gleichem Wortlaut.
- **Micro-Details:** Hintergrund-Textur aus dunklen abgerundeten Quadraten (`#0F0F0F` Tiles, radius ~6, Grid ~64 px) NUR partiell hinter dem Text — Tiefe ohne Noise; Micro-Caps-Unterzeile unter dem Wordmark; "Our portfolio" klein grau zentriert über Marquee.

---

## Agentos / Lumen (2 Screens)

### `HR2bhjnboAELWUa` — Agentos, Multi-Page-Showcase (Dark Editorial/Brutalist)
- **Was:** Collage mehrerer Seiten eines AI-Agent-SaaS (Hero, Pricing, Testimonials, Problem, Footer). Zeitungs-/Terminal-Mashup.
- **Layout:** Sidebar-Nav links (fixed, ~200 px) mit aktivem Item als rot-schwarze Pille; Content in Panelen mit 1px Hairlines; Stat-Zeile als 5-Spalten-Raster unten im Hero.
- **Typo:** Drei-Ebenen-Mix: Serif (Headlines ~48 px, Italic-Akzente), Sans (Body), Mono uppercase 10–11 px für Meta ("VOL. II · NO. 04", "ISSUE · 30 APR 2026", "FIG. 01", "§ 02 / PROBLEM → FIELD REPORT : 2026").
- **Farbe:** BG #000/`#0A0A0A`; Akzent Signalrot-Orange ~`#FF3B1F` (CTAs, aktive Nav-Pille, Icon-Tiles, Karten-Dots); Text Weiß/Grau-Stufen.
- **Radien/Border/Shadow:** Fast alles eckig (0–4 px) — bewusst brutalistisch; Buttons radius ~4 px.
- **Komponenten:** Sidebar 14 px, aktives Item weiß auf rot-schwarzer Pille; "Sign in" unten, CTA "Start free →" rot. Stat-Zeile: "01 / BUILDERS" 10 px mono grau + Wert 28 px mono. Demo-Chip "▶ Demo · 2:14" outline-Pill. Testimonials mit 5 roten Sternen + Velocity-Badge.
- **Micro-Details:** Zeitungs-Metazeile über der H1 (VOL/ISSUE/EDITION/BUILDERS ONLINE); "FIG. 01" an Visuals; Quellenzeilen unter Feature-Bullets ("+ SOURCE: STACK OVERFLOW DEV SURVEY '25"); §-Zeichen vor Sektionsnummern; Dot-Matrix-Weltkarte (rote Dots Nordamerika); 3D-Natur-Renders hinter Pricing/CTA; Footer mit riesigem angeschnittenem Wordmark.

### `HR2bjWfa8AAwQkR` — Lumen, Multi-Page-Showcase (Light Editorial)
- **Was:** AI-Dev-Tool-Landingpage (Hero, Pricing, FAQ, Footer). Serif-Editorial auf technischem Raster.
- **Layout:** Sichtbares Spaltenraster: vertikale Hairlines (`#E5E5E5`) über die gesamte Breite (12-Col); Sektions-Marker "02 / AI-native", "10 / Get started", "11 / Footer".
- **Typo:** Serif-Display (Times-artig, ~64 px regular, Kapitälchen-Anmutung "Build Software At The Speed Of Thought."); Sans Body 17 px; Mono für Code-Chip "$ npm i -g @lumen/cli" + Micro-Labels.
- **Farbe:** BG `#FAFAFA`/`#F5F5F5`; Text `#111`; Akzent praktisch keiner — Schwarz ist der Akzent. Botanical-Illustrationen (gedrückte Blumen, Schmetterlinge) als einzige Farbwelt.
- **Radien/Border/Shadow:** Buttons Pill; Pricing-Cards ~16 px mit 1px Border `#E5E5E5`; Screenshots ~12 px.
- **Komponenten:** Schwarze Pill "Start building free →" + Mono-Code-Chip als zweiter CTA. Pricing: Toggle "Annual · save 14% / Monthly", "MOST POPULAR" schwarze Mini-Chip, Preis groß + Streichpreis, Circle-Checks 14 px. FAQ auf dunkler Sektion ("Frequently Asked." serif italic) mit Plus-Reihen.
- **Micro-Details:** Vertikale Raster-Linien als durchgehendes Ordnungssystem; Announcement-Zeile über H1 ohne Pill — nur Text; Footer-Wordmark riesig, halb transparent, gesperrt ("L U M E N A I"); Product-Screenshots auf Botanical-Collagen (organisch vs. Tech).

---

## Myniq (1 Screen)

### `HR8HQuYaMAAiq-L` — Fintech-Landingpage (Light Aurora)
- **Was:** Komplette Page: Hero mit Dashboard-Screenshot, Features, Steps, Pricing, FAQ, Footer.
- **Layout:** Zentriert klassisch SaaS; Dashboard-Screenshot unter Hero mit Fade-out nach unten (Gradient-Maske); Steps als 3er-Reihe mit durchgehender Trennlinie oben.
- **Typo:** H1 ~64 px/500 tracking −0.02em; Section-Headlines ~40 px; Body 16 px grau.
- **Farbe:** BG `#F4F4F6`; Akzente = weiche Aurora-Gradients (Rosa→Orange→Blau, ~20–30 % Sättigung, stark geblurt) als Blobs hinter Hero/Pricing/Footer; schwarze Pill-CTAs; Statusfarben Grün (+53.12%) / Rot (−25.32%).
- **Radien/Border/Shadow:** Cards 16–20 px; Buttons/Chips Pill 999; Icon-Tiles 12 px schwarz mit weißem Icon.
- **Komponenten:** Pricing-Cards mit Aurora-Header-Zone, Preis 40 px + "/month", schwarze Pill "Get Started Now", Checkliste; Enterprise-Banner als eigene breite Card; Steps mit nummerierten Farb-Pills "01 | Sync" (Orange), "02 | Optimize" (Lila), "03 | Scale" (Blau) — getönte BG (~10 %) + farbige Schrift; FAQ-Accordion Chevron.
- **Micro-Details:** Notification-Badge (roter Dot mit Zahl) am Inbox-Item; farbige Prozent-Chips in Stat-Cards; Footer mit riesigem "Myniq"-Wordmark, per Gradient nach unten ausfadend; Mini-Nav-Pills als Sektions-Eyebrows mit farbigem Dot; Chart-Tooltips als farbige Pills auf dem Graph.

---

## Iconly (4 Screens)

### `HRhUaV4` / `HRhUaVF` / `HRhUaVG` / `HRhUaVH` — Tab-Bar-Showcase (4 Varianten)
- **Was:** Icon-Set-Marketing: 4 App-Tab-Bars (Finance, Meditation, Crypto, Workout) auf Präsentations-Slides.
- **Layout:** Slide-Template: BG `#EDEDED`, Slide-Nummer in weißer Pill oben zentriert, Titel 48 px 600 zentriert, Subline grau, gestrichelter Annotation-Rahmen (dashed 1px `#CCC`, radius ~48 px) um die Komponente; Footer "iconly.pro" / "Swipe for More →".
- **Varianten:** **Finance:** weiße Pill-Bar (radius 999, weicher Shadow), aktiv = schwarzes gefülltes Icon + Label "Home", inaktiv nur Outline; separater FAB blauer Kreis (`#4F46E5`, ~64 px) mit Plus, außerhalb der Bar. **Meditation:** zentraler erhöhter Kreis (Orange-Gradient `#FDBA74`→`#FB923C`, Sonnen-Icon), ragt über die Bar-Oberkante; Labels unter allen Icons 12 px. **Crypto:** 5 Items; aktiv = schwarzes Icon + 600-Label, inaktiv `#9CA3AF`. **Workout:** Frosted-Glass-Bar (backdrop-blur, weiß ~50 %), aktives Item in weißer Pill-Kapsel, zentraler blauer FAB (`#2563EB`) integriert.
- **Icons:** Line-Icons ~2 px Strich, runde Caps/Joins, 24 px Box; aktiv → filled Variante desselben Icons.
- **Micro-Details:** Dashed Annotation-Frame als "Bauteil-Vitrine"; Nummer-Pill als Slide-Index; konsistentes Template über die Serie — Systematik macht sie teuer.

---

## RevOps (1 Screen)

### `HSGjHDeaAAEtgM2` — "Four Steps"-Sektion (Light, Botanical)
- **Was:** Prozess-Sektion "From data to revenue in four simple steps", B2B-Data-SaaS.
- **Layout:** Riesige Off-White-Card (`#F7F6F3`, radius ~32 px) auf Salbeigrün-Foto-BG; innen links gestapelte UI-Cards über Landschaftsfoto, rechts 4-Schritte-Liste.
- **Typo:** Headline zweifarbig: Zeile 1 schwarz, Zeile 2 grau `#9CA3AF`, ~48 px. Aktiver Schritt 20 px schwarz, inaktive 20 px grau; Beschreibung 15 px grau.
- **Farbe:** Weiß/Off-White + Orange (`#F97316`) für Health-Bar, Status-Pill, Progress-Strich; Status-Pill "All Systems Operational" orange getönt.
- **Komponenten:** Schritte-Liste ohne Cards: aktiver Schritt schwarz + Beschreibung + kurzer ORANGER Progress-Underline (~64 px breit, 2 px) unter dem Text. UI-Card "Connected Systems": Salesforce-Row (Logo-Tile, "Active" grüner Dot), Key-Value-Zeilen (Label grau links / Wert schwarz rechts), Health-Bar orange auf grauem Track, Footer "Total Records 325K / Avg Sync 2.8s / Auto-sync enabled".
- **Micro-Details:** Progress-Underline statt Bullet/Nummer; Key-Value-Paare streng zweispaltig; Kebab-Icon (⋮); Cards leicht versetzt gestapelt (3 Ebenen Tiefe).

---

## Dark Analytics-Card-System (4 Screens)

### `HSKNCFC` / `HSKNDnx` / `HSKNEoL` / `HSKNFMb` — Observability-Cards
- **Was:** Dashboard-Karten (Context Window, Tool Call Graph, Alert Rules, Latency Heatmap, Deployments). Dev-Tool, Terminal-präzise.
- **System:** BG `#1A1A1A`/`#111`; Cards `#161616`–`#1C1C1C`, radius ~20 px, padding ~28 px. Header = Icon in dashed-outline Tile (radius 10 px) + Titel 18 px Sans 600 + Subtitle 13 px mono grau ("triage-1 · v14 · last 24 h · 12,480 calls" — Middle-Dots).
- **Typo:** Alle Daten Mono (JetBrains-artig): Big Number 40–56 px, Labels 13 px, Achsen 12 px grau `#6B7280`. Sans nur für Card-Titel.
- **Farbe:** EIN Akzent Emerald/Mint `#3DDC97`–`#34D399` für positiv/live/aktiv; Rot `#F87171` nur für "Firing"; Sekundär-Füllungen = Akzent 10–15 % opacity.
- **Details pro Card:** **Context Window:** Radial-Gauge aus ~60 Ticks (aktiv Mint, Rest `#3A3A3A`), Zentrum 56 px "71%", darunter "of 128,000 tokens" 13 px mono; Legenden = farbiges Quadrat 10 px + Label + Wert rechtsbündig. **Tool Call Graph:** Punkt-Raster-BG (2 px Dots, 24 px Grid, `#2A2A2A`); kurvige graue Kanten, aktiver Pfad gestrichelt Mint; Nodes mit Dot + mono-Name + "p50 212 ms" + Error-Chip ("0.4% err" grau / "2.9% err" Mint-getönt); Segmented Tabs (Calls/Latency/Errors, aktiv `#2A2A2A`); Footer 4-Spalten-Stats. **Alert Rules:** Zeilen = mono Regelname + Threshold mono grau + Sparkline (1.5 px, Threshold dotted) + Status-Pill (Firing rot-getönt, Ok mint-getönt, Muted grau) + iOS-Toggle (aktiv Mint). **Latency Heatmap:** 7×24 Grid (Zellen radius 3 px, ~18×10 px), Grün-Skala, Worst-Cell weiß; Legende Gradient-Bar mit weißem Marker + "worst"-Label. **Deployments:** Step-Line (Mint 2 px + Area 10 %), Threshold dotted "min 0.88"; Versions-Timeline mit Dots, Modellwechsel als Mint-Diamond "→o4-mini"; Tooltip mit Pfeil ("regression −4.4 pts · rolled back in 38 min"); Status-Chips "live v14 · o4-mini" mint-getönt.
- **Micro-Details:** Middle-Dot-Separatoren überall; Versionstags "v14" konsistent; Error-Werte als Chips; Tooltip nennt Case "#402 · worst"; Tausender-Kommas/Thin-Spaces; Sparkline-Thresholds dotted.

---

## Nike Run Club (1 Screen)

### `HSKdFpIbMAAiefG` — App-Card (Ranking)
- **Was:** Karte in "TOP 10"-Ranking-Liste, Sport/Lifestyle.
- **Layout:** Vollflächiges Hintergrundfoto (Kornfeld, Lens-Flare/Light-Streaks); zentrierte Card ~340 px: oben Foto (Runner, goldenes Licht), unten weißer Content — Headline sitzt auf der Foto/Text-Kante (Overlap ~40 px).
- **Typo:** "Nike Run Club" ~28 px 600; Body 14 px grau, 2 Zeilen; Swoosh zentriert.
- **Radien/Border/Shadow:** Card ~28 px; Foto oben mit gleichem Radius maskiert.
- **Komponenten:** Segmented Toggle "TOP | 10" oben links: schwarze Pill + weiße Pill kombiniert (2 Segmente, je ~8 px padding, 12 px) — Ranglisten-Toggle als Zwitter aus Badge und Control.
- **Micro-Details:** Light-Streak-Overlay (diagonale weiße Striche ~30 % opacity) über dem ganzen Bild = Motion-Gefühl; Hintergrundfoto thematisch identisch zum Card-Foto — Card wirkt wie Ausschnitt.

---

## SEO/AEO Glass-Card (1 Screen)

### `HSKdFrKbcAA4Lhy` — Feature-Card (Dark Green)
- **Was:** Feature-Card einer Agency-Site, Glassmorphism auf Foto.
- **Layout:** Zentrierte dunkle Glass-Card auf radial motion-geblurtem Grün-Foto (Wald, Zoom-Blur); darin Radial-Chart (konische Segmente Weiß/Grau/Blaugrau), 2 schwebende Glass-Tooltips, unten Headline + Body.
- **Typo:** Headline 24 px 600 weiß; Body 15 px `rgba(255,255,255,.6)`; Tooltip-Titel 13 px, Wert grün 12 px.
- **Farbe:** Card `rgba(20,30,20,.55)` + backdrop-blur ~24 px + 1px Border `rgba(255,255,255,.08)`; Akzentgrün `#4ADE80` für Zahlen; Emojis als Icons (🚀 📈 🌍).
- **Komponenten:** Tooltip-Cards Glass radius 12 px: Emoji links, Titel weiß, "↗ 50%" grün + Label grau; Prozent-Ring-Labels rotiert (16.7 %, 33.3 %, 50 %, 66.7 %).
- **Micro-Details:** Ring-Chart mit feinen Gradlinien + rotierten Labels (Instrumenten-Look); Tooltips überlappen den Chart-Rand; radialer BG-Blur zieht das Auge zur Card; Emojis gezielt in Content-Tooltips, nicht im UI-Chrome.

---

## Elasti (3 Screens)

### `HSKjBbHb` (3×) — Mobile-App-Screens (Teal Glass)
- **Was:** Mobile Screens einer AI-Comms-App: CTA-Card, Menü, Footer/Timestamp. Teal-Gradient-Welt.
- **Layout:** BG = vertikaler Teal-Gradient (`#0B3B3B` → `#2DD4BF`-artig) mit softem Radial-Glow; Panels = Glass (`rgba(255,255,255,~.08–.12)`, blur, 1px Border `rgba(255,255,255,.12)`, radius ~24 px); Content top- und bottom-anchored, Mitte leer (Atemraum als Designelement, ~60 % Leere).
- **Typo:** Headline 28 px weiß 500; Nav + Meta in MONO uppercase ("HOME", "USE CASES", "© 2024 ELASTI, INC.", "14:36:29 PM MAR 27, 2024") 13–14 px, weites Tracking; aktiv weiß 100 %, inaktiv weiß 45 %.
- **Komponenten:** CTA "START FOR FREE" = weiße Pill, schwarze mono uppercase Schrift ~12 px, tracking 0.05em. Menü = rechts einschiebendes Glass-Panel (halbe Breite) mit Logo, Links linksbündig, Tagline mono unten. Footer-Panel: Live-Clock, Theme-Toggle-Icons (Mond/Sonne, 1.5 px outline), "X / LINKEDIN" mono.
- **Micro-Details:** Echte Uhrzeit mit Sekunden als Deko (Lab-Feeling); nächste Card unten angeschnitten (Stack-Hinweis); Copyright in Mono; Asterisk-Logo-Mark (✳); Glass über Gradient ohne Textur — Sauberkeit durch Reduktion.

---

## DUNE (1 Screen)

### `HSL3bVEa0AAlufq` — Hero (Full-Bleed Photo, Pixel-Font)
- **Was:** Strategy-SaaS-Hero, düster-episch (Dune-/Wüsten-Ästhetik).
- **Layout:** 100vh Foto (Wüstendüne, Dämmerung Orange/Teal) mit schwarzem Gradient unten (~50 % Höhe); Logo-Chip oben links, Nav-Pill oben rechts, Textblock unten links, Logo-Leiste ganz unten mit vertikalen Hairlines.
- **Typo:** H1 in PIXEL/DOT-MATRIX-Display-Font, uppercase, ~72 px, weiß — extrem wiedererkennbar. Body Sans 17 px 70 % weiß.
- **Farbe:** Foto liefert die Palette (Burnt Orange `#C2571B`, Teal `#1E3A3A`); UI komplett neutral — kein eigener Akzent nötig.
- **Komponenten:** Logo = schwarze Chip (radius 6 px) mit orangem Icon. Nav = schwarze Glass-Pill mit 4 Items, aktives Item ("Platform") in dunkelgrauer Pille `#262626`. CTA "Book a demo" = graue Box (`#3A3A3A`, radius ~6 px, KEINE Pill — passt zur Härte der Pixel-Font). Logo-Leiste: 7 Logos, graustufig, durch 1px vertikale Linien getrennt, in schwarzer Footer-Zeile.
- **Micro-Details:** Display-Font als einziges Branding-Element reicht; Logo-Wand mit Hairline-Dividern statt Abstand; Nav-Pill floatet ohne Border über dem Foto (Shadow statt Outline).

---

## Scheduler/Calendar-Component (1 Screen)

### `HSL5cnHWIAAcPvz` — Booking-Widget (Light)
- **Was:** Kalender + Time-Slots (Calendly-artig), sehr clean.
- **Layout:** Hellgraue Stage (`#EFEFEF`), weiße Card (radius ~24 px, soft shadow), intern 50/50 mit 1px vertikalem Divider; links Monatsgrid, rechts "Monday 14" + Slot-Liste.
- **Typo:** "September 2026" 22 px 600; Wochentage 11 px uppercase `#9CA3AF` tracking 0.05em; Tageszahlen 15 px; Slots 15 px.
- **Komponenten:** Tageszellen abgerundete Quadrate (~44 px, radius 14 px): verfügbar = `#F3F4F6`, ausgewählt = SCHWARZES Quadrat weiße Zahl, Rest transparent. Slots = 2-Spalten-Pillen (radius 12 px, Höhe ~48 px), abwechselnd hellgrau gefüllt / 1px outline `#E5E5E5`, ausgewählt schwarz, führender Dot "● 14:00". 12h/24h Mini-Segmented-Control (radius 10 px, aktiv weiß mit Shadow auf grauem Track). Primary "Schedule call" full-width schwarz (radius 14 px, Höhe 56 px, 16 px medium).
- **Micro-Details:** Drei Füllzustände (disabled/verfügbar/selected) komplett ohne Farbe; Dot vor Uhrzeit als Glyphen-Detail; Monats-Pfeile als dünne Chevron-Texte; Slot-Bereich mit eigenem Padding-System (Verschachtelung).

---

## HQ Finder (2 Screens)

### `HSLWM4iXoAAaBFf` — Hero
- **Was:** Full-Bleed-Hero, Office-Leasing (Finnland), warm, persönlich, premium-Beratung.
- **Layout:** Foto 100vw/100vh. Textblock links ab ~4 % Rand, vertikal leicht oberhalb Mitte. Nav: Logo links, 4 Links zentriert, CTA rechts. Logozeile am unteren Rand volle Breite, rechts Trust-Badge.
- **Typo:** H1 große Serif (Didone-Art, ~72–80 px, weiß, lh ~1.05). Body Sans ~16 px/1.5, weiß 90 %. Nav-Links ~14 px medium. H1:Body ≈ 4.5:1.
- **Farbe:** Kein Akzent-System — nur Weiß auf warm-dunklem Foto (Tungsten-Grading, Braun/Olive). Kontrast rein durch Bilddunkelheit links/unten.
- **Radien/Border/Shadow:** Suchleiste radius ~10 px, 1px Border `rgba(255,255,255,0.25)`, dunkles rgba-Fill, kein Shadow. Chips ~8 px, Buttons ~8 px/Pill.
- **Komponenten:** Nav ~72 px, CTA "Get assistance" weiße Pill schwarzer Text 10×20. Suchfeld mit integriertem weißem "Search"-Button rechts innen (Inset-Pattern). Standort-Chips (Helsinki/Espoo/Vantaa) weiß, schwarzer Text, 1px Border. Ghost-Pill "Hundreds of workplace projects" rechts unten.
- **Micro-Details:** Foto trägt die gesamte Markenwärme (inszeniertes Portrait, shallow depth — keine Stock-Ästhetik); Logozeile monochrom weiß ~60 % auf dunklem Gradient-Overlay; Logos ~26–30 px hoch, Gaps ~64 px; Search-Icon 1.5 px.

### `HSLWNBbXcAA3ONY` — Video-Testimonial-Karussell
- **Was:** Testimonial-Sektion mit Video-Karussell, dunkel.
- **Layout:** Header: H2 links, Ghost-Button rechts. Karussell: aktive Card mittig ~62 % Breite, Nachbarn angeschnitten (Peek ~12–15 %), volle Breite ohne Container-Rand.
- **Typo:** H2 Sans ~40 px weiß regular/medium. Zitat auf Card Serif ~26–30 px weiß mit Serifen-Anführungszeichen — Serif = "echte Stimme".
- **Farbe:** BG `#0A0A0A`. Karten = Fotos; inaktive mit schwarzem Overlay ~70 % (fast schwarz).
- **Radien/Border/Shadow:** Cards radius ~16 px. Ghost-Button 1px Border `#333`–`#444`, radius ~6–8 px, 8×16, 13 px. Keine Shadows.
- **Komponenten:** Play-Button Kreis ~56 px: Fill `rgba(255,255,255,0.12)` + backdrop-blur + 1px Border `rgba(255,255,255,0.2)`, Dreieck zentriert. "See more videos" dezenter Outline-Button.
- **Micro-Details:** Peek-Cards = Karussell-Affordanz ohne Pfeile/Dots; Serifen-Zitat vs. Sans-H2 als Stimme-vs-Struktur-Kontrast; warmes Grading konsistent mit Hero.

---

## Meska / Monee (4 Screens)

### `HSLd8P3aQAAQm3G` — Feature + Testimonial (dark green)
- **Was:** Feature-Sektion mit nummerierter Liste + Phone-Mockup, darunter Testimonial. Fintech, "Lime on Forest".
- **Layout:** 2-Spalten: links Text + 01–04-Liste + CTA, rechts Phone auf hellerer Panel-Fläche. Testimonial darunter: Quote links, Personenfoto rechts, Paginierung unten.
- **Typo:** H1 ~52–56 px Lime zentriert, tracking leicht negativ. Body ~15 px Grau-Grün/1.55. Listen-Nummern "01" ~15 px Lime semibold; Item-Text ~16 px weiß. H1:Body ≈ 3.5:1.
- **Farbe:** BG `#12211C`/`#0E1B17`. Akzent Lime `#D9F99D`–`#BEF264` nur für H1, Nummern, CTA, aktive Chart-Elemente. Panel-Fill `rgba(255,255,255,0.04)`.
- **Radien/Border/Shadow:** Panel radius ~24 px. Listen-Items durch 1px Hairlines `rgba(255,255,255,0.1)` getrennt (keine Cards!). Phone radius ~28 px mit feinem inneren Border.
- **Komponenten:** CTA "Get Started →" Lime-Pill 999, dunkelgrüner Text, 14×28. Label "● SMART FINANCE PLATFORM": 8 px grüner Punkt + 12 px uppercase tracking ~0.08em opacity ~60 %. Testimonial-Paginierung "01/05" (aktiv weiß, "/05" opacity 40 %) + Text-Pfeile.
- **Micro-Details:** Avatar-Stack (3 Kreise, 2 px Border in BG-Farbe) + Trust-Text; Chart-Bars inaktiv mit diagonalem Stripe-Hatching, aktiver Balken voll Lime; Tooltip "Avr $1000" weiße Pill; Dezimalstellen der Balance kleiner/blasser ($280.120.**.23**); Statusbar 9:41.

### `HSLd8Q1XUAAZGfr` — Footer
- **Was:** Seitenende: Testimonial-Wiederholung + großer Footer.
- **Layout:** Footer als schwarze Inset-Card (radius ~24–32 px) im grünen Page-BG, ~12–16 px sichtbarer Außenrand — "Sheet im Sheet". Oben 3-Spalten-Links, unten riesige Wortmarke.
- **Typo:** Labels "MAIN MENU / CONTACT US / FOLLOW US" 11 px uppercase tracking ~0.1em opacity 50 %. Links ~20 px weiß, "/" separiert. Wortmarke "Meska" ~280–320 px Sans bold weiß. Bottom-Bar 12 px opacity 50 %.
- **Farbe:** Footer-Card `#0B0F0D` auf Waldgrün; Logo-Icon in zwei Grüntönen (Lime + Oliv) als einziger Farbklecks.
- **Radien/Border/Shadow:** Footer-Card radius ~28 px; keine Borders, Trennung über Flächenkontrast.
- **Komponenten:** Back-to-top "↑" text-only rechts mittig. Kontakt: Telefon weiß, E-Mail grau (Hierarchie über Farbe).
- **Micro-Details:** Slash-Separatoren ("Feartures / Solutions / Resources"); "© 2026 — Copyright Monee" mit Gedankenstrich; Mega-Wortmarke füllt die Card-Breite (Buchstaben laufen fast in den Radius); Marken-Icon (WiFi-Bögen) ~1:1 zur Wortmarke.

### `HSLd8QAbEAAIrLn` — Hero (light) + Payment-Sektion
- **Was:** Hero (hell) + Payment-Feature (dunkel), gleiche Marke.
- **Layout:** Hero = abgerundete Page-Card (radius ~24 px, 2px dunkler Border `#1A3A2E`) auf hellerem Outer-BG — Neubrutalismus-light. Innen 2-Spalten, H1 links, 3D-Globus rechts überlappend. Payment: zentriertes Headline-Duo (H2 links, Sub rechts), Karten-Stack mittig mit schwebenden Icon-Tiles.
- **Typo:** H1 ~64 px dunkelgrün, tracking −0.02em. Sub ~16 px. Label "FAST & SECURE PAYMENTS" (Punkt + uppercase) wie gehabt.
- **Farbe:** Hero-BG Lime-Gradient (`#E9FFB3` → `#D0F281`), Text `#17352A`. Dunkle Sektion mit Lime-Überschriften. Globus Glasgrün mit Lime-Pins + Glow.
- **Radien/Border/Shadow:** Page-Card 2px Border + radius 24 px (Border statt Shadow!). Primary: dunkelgrüne Pill + zweiter äußerer Ring (4 px Offset-Border Lime/Transparent) — Double-Ring-Detail. Kreditkarten radius ~18 px, gestapelt mit ~16 px Versatz.
- **Komponenten:** Nav auf der Card, CTA "Download Now →" getönte Pill (Lime-30 %-Fill). "New"-Badge dunkle Pill + Text + Chevron. Ghost "Explore Features" Lime-30 %, kein Border.
- **Micro-Details:** 3 Karten im Stack (Glass: Fill + Blur, Chip-Icon); Logozeile Dunkelgrün monochrom auf Lime; Balance im europäischen Format ($ 45.281,09); Icon-Tiles radius ~12 px, rotiert ±6–10°; konzentrische Kreis-Outlines (1px, opacity 8 %) als BG-Textur der dunklen Sektion.

### `HSLd8Rkb0AAWr7G` — Security-Bento
- **Was:** Feature-Bento (3 Cards) auf invertiertem Farbschema.
- **Layout:** Helle Lime-Card (radius ~32 px) auf dunkelgrünem BG. Dahinter riesiges Ghost-Wordmark "Save Better" (~200 px bold, opacity ~8–10 %, oben angeschnitten). Innen 3 gleich breite dunkle Cards, Gap ~20 px.
- **Typo:** H2 links ~44 px dunkelgrün, Sub rechts oben ~15 px (Split-Header). Card-Titel 18 px semibold weiß, Body 14 px grau.
- **Farbe:** Inversion: hell außen (`#D9F99D`), dunkel innen (`#12211C` Cards). Lime für Charts/Badges auf dunklen Cards. Teal-Highlight (`#2DD4BF`) am Progress-Bar.
- **Radien/Border/Shadow:** Outer-Card 32 px, Inner-Cards ~20 px, Badges 999. Keine Shadows — Kontrast nur über Flächen.
- **Komponenten:** Badges "EXCELLENT PROTECTION"/"100% SECURE" grün getönte Pills, 10 px uppercase tracking 0.06em. "Learn More →" Ghost-Pills (1px Border weiß 15 %). Ring-Chart Lime-Stroke ~10 px auf dunklem Track, rundes Linecap.
- **Micro-Details:** Ghost-Typo hinter der Sektion; gestreifte/solide Bars wiederholt; Zahl "98" groß + "%" klein hochgestellt; Zahl + Badge + Sparkline als Mini-Stat-Card in Card (Tiefe 3).

---

## Anchor (1 Screen)

### `HSLjX4-bwAABdLl` — Enterprise-Revenue-SaaS (Seitenmosaik)
- **Was:** Komplette Landingpage als Mosaik-Präsentation. Seriös, naturverbunden.
- **Layout:** Hero: Foto (Nebelwald) mit dunklem Overlay; H1 links, Sub, Stat-Zeile: 4 KPIs durch 1px vertikale Hairlines `rgba(255,255,255,0.2)` getrennt. Logozeile darunter auf Weiß. Values auf Foto-BG mit weißen Karten. Team-Grid. CTA-Band mit Rot-Orange-Gradient.
- **Typo:** H1 ~56 px Sans semibold auf Foto. KPI-Zahlen ~36 px semibold, Labels 13 px opacity 70 %. H2 ~32 px, zweizeilig mit Zeile 2 in Grau (~45 %: "Make Enterprise / Revenue Predictable").
- **Farbe:** Natur-Foto + Weiß + EIN Akzent Orange-Red (`#F05623`) für Logo, Icons, CTAs. CTA-Band Gradient `#FF4D2E` → `#FF8A00`.
- **Radien/Border/Shadow:** Karten radius ~16 px weiß auf Foto, Shadow weich (`0 12px 32px rgba(0,0,0,0.12)`). Buttons radius ~8 px.
- **Komponenten:** Nav als Floating-Bar auf dem Foto (blur, radius 12 px). "Request Demo" weiße Pill auf Foto / rote Pill mit Pfeil auf Karten. Team-Cards: Avatar links, Name semibold, Rolle 12 px grau.
- **Micro-Details:** Ghost-Wordmark "ANCHOR" (opacity ~15 %, weiß) im CTA-Band; KPI-Hairlines; Quote mit roter 2px Accent-Bar links statt Anführungszeichen-Grafik; Stat-Row direkt im Hero; Icons 20 px outline orange.

---

## Sales-AI (2 Screens)

### `HSMkbpmboAAW4am` — Feature-Trio (hell)
- **Was:** 3er-Feature-Grid, AI-Sales-Tool, "Apple-esque".
- **Layout:** Label + H1 oben links (max-w ~60 %), darunter 3 gleich große Cards (Gap ~24 px). Caption (Titel+Text) UNTERHALB der Card.
- **Typo:** Label "✱ FEATURES": Asterisk (blau) + 12 px uppercase tracking ~0.08em grau. H1 ~56 px tracking −0.03em schwarz. Card-Titel 18 px semibold, Body 15 px grau `#6B7280`/1.6.
- **Farbe:** BG weiß. Cards: weiche Mesh-Gradients (Eisblau `#DBEAFE` → Pfirsich `#FDE8D8`), jede leicht anders. Kein sonstiger Akzent.
- **Radien/Border/Shadow:** Cards radius ~24 px, kein Border/Shadow. Schwebende UI-Mini-Cards radius ~12 px weiß, Shadow `0 8px 24px rgba(0,0,0,0.08)` + 1px Border `#F0F0F0`.
- **Komponenten:** Mock-Cards mit echtem Inhalt (Qualified Pipeline, Notification mit "2:21 PM" in grauer Mini-Pill, Key-Value-Rows "Deal Stage → Proposal"). Schwarzer Cursor-Pfeil mit "You"-Pill (schwarz, weißer Text, 999) — Figma-Multiplayer.
- **Micro-Details:** Cursor+"You"; Timestamps als Mini-Pills; Chip-Values ("Proposal", "Follow up Friday") hellgraue Inline-Chips; mittlere Card = Personenfoto zwischen zwei UI-Cards (UI–Mensch–UI-Rhythmus); Meet/HubSpot-Brand-Icons in Mocks.

### `HSMkbpwbgAAvHFi` — Feature-Trio (Variante)
- **Was:** Gleiche Sektion, alternative Ausarbeitung (blauer Gradient, Code-Card).
- **Layout:** Wie oben, zusätzlich zwei CTAs rechts auf H1-Höhe ("Request a Demo" schwarze Pill + "Watch Demo" outlined mit Play-Icon).
- **Typo:** Feature-Titel mit vorangestelltem 20 px-Outline-Icon (Buch, Sparkle) — Icon+H3-Zeile.
- **Farbe:** Cards einheitlich Blau-Gradient (`#7DB8F0` → `#BFDBFE`); Code-Syntax: Keywords blau/lila, Strings grün.
- **Radien/Border/Shadow:** Mock-Cards radius ~14 px; weißer 2px-Border/Ring um gestapelte Cards (Offset ~12 px, untere Karte als hellerer Rand sichtbar).
- **Komponenten:** Notification-Cards versetzt gestapelt (2 Ebenen). Code-Fenster Mono ~13 px mit Tooltip-Pill schwarz "anthropic/claude-3-5-sonnet" (Model-Auswahl-Andeutung) und grünem String "openai/gpt-4o".
- **Micro-Details:** Modell-Name-Dropdown als Multi-Model-Story ohne Text; Card-Stack-Offset als "Papierstapel"; API-Endpoint zeigt Produkt-Namen (Easter-Egg-Branding); Foto (Hände am Phone) halb hinter Cards → Überlappungstiefe.

---

## Recline (1 Screen)

### `HSMw2cia8AA2Gc4` — Login + App-Preview
- **Was:** Sign-In links, Produkt-Screenshot rechts. Sales-Inbox-SaaS.
- **Layout:** Grauer Outer-BG (`#A9A9A9`), weiße Page-Card radius ~24 px mit ~80 px Inset. Innen 45/55: Formular zentriert links (max-w ~380 px), rechts App-Preview auf Foto-Panel (Blumenwiese, radius 16 px), App-Fenster darauf als eigenes Sheet.
- **Typo:** H2 24 px semibold, Sub 15 px grau. Formular 14–15 px. "Sign Up" blau + underlined — einziger Farblink.
- **Farbe:** Neutral Weiß/`#F5F5F5`/`#1A1A1A`; Akzent nur im Foto-Panel und Status-Chips (rot/grün getönt).
- **Radien/Border/Shadow:** Input + Google-Button radius ~10 px; Input-Fill `#F5F5F5` ohne Border; Google-Button weiß 1px `#E5E5E5`. Primary "Sign In" `#1A1A1A`, radius 10 px, Höhe ~48 px.
- **Komponenten:** "or"-Divider Hairline–Text–Hairline. App-UI 3-spaltig (Sidebar `#FAFAFA` / Liste / Thread), Tabs "All 56 · Unread 32…" mit Counts 12 px grau, aktiver Tab 2px Underline. Status-Chips: "Not Interested" (`bg #FEF2F2 / text #DC2626`), "Interested" grün-getönt — Pastell-Tint + gesättigter Text, 11 px.
- **Micro-Details:** Drei Verschachtelungsebenen (grau → weiß → Foto → App) als Tiefenstaffelung; "⌘K"-Hint im Search; relative Zeitstempel ("2m", "20m"); Star-Icon nur bei einzelnen Zeilen (Selektivität = Echtheit); "✦ Generate"-AI-Button schwarz klein; Avatare 32 px mit Online-Dot.

---

## Coach (4 Screens)

### `HSOUeQ0aIAAFvjU` — Story-Format: Event
- **Was:** Instagram-Story-Design für Sales-Coach (Event-Ankündigung), zwei Story-Screens.
- **Layout:** Story-Cards radius ~16 px auf `#EFEFEF`. Story-Chrome: Progress-Bars oben (aktiv voll, inaktiv 30 %), Avatar + "Coach 2s", "…" + X. Content: Serif-Headline oben, riesiges Bogen-Motiv mittig.
- **Typo:** Headline Serif (Antiqua, ~64 px, Grün `#6FA025`); Datum "17 – 07" weiß ~56 px vertikal gestapelt im Bogen.
- **Farbe:** Weiß + Marken-Grün (Oliv/Lime `#8FBE3F` → `#5C8A1E`). Bogen: radiale Grün-Gradient-Ringe, hell nach außen.
- **Radien/Border/Shadow:** Story-Card radius 16 px, Progress-Bar 2–3 px radius 999.
- **Komponenten:** Reine Story-Nachbildung (Progress, Avatar-Bubble, Close) — Plattform-Konventionen als Designelement.
- **Micro-Details:** Bogen-Motiv trägt das Datum wie eine Laufbahn-Anzeige; "2s"-Timestamp als Authentizitäts-Detail; links angeschnitten: Silhouetten-Basketballer + Korb (Line-Art schwarz) auf Grün-Gradient.

### `HSOUeQxaUAAvub4` — Keyvisual
- **Was:** Marken-Keyvisual/OG-Image.
- **Layout:** Vollfläche, Logo zentriert-rechts, Silhouetten über die Fläche gestreut (oben kleiner = Perspektive/Tiefe).
- **Typo:** Serif-Wordmark "Coach" ~200 px Grün; Subline "Your Personal Sales Brain" Sans ~28 px weiß.
- **Farbe:** Diagonal-Gradient Hellgelb-Grün `#EDF6CC` → Saftgrün `#8FBE3F`. Silhouetten Duotone Dunkelgrün/Schwarz-Grün.
- **Micro-Details:** Perspektivische Staffelung der Figurengrößen = Tiefe ohne Schatten; Serif-Wortmarke als Premium-Positionierung gegen Sans-SaaS-Einheitsbrei; Figuren wie Ameisenperspektive auf grüner Wiese.

### `HSOUeQybkAAVuME` — Story-Triptychon
- **Was:** Drei Story-Screens als Serie.
- **Layout:** 3 Cards nebeneinander, radius ~20 px, Gap ~40 px. Konsistent: Serif-Headline + Motiv + Sub.
- **Typo:** Headlines Grün oder Weiß (je nach BG), Serif ~44–56 px. Sub Sans 15 px.
- **Farbe:** Weiß-Card, Grün-Gradient-Card, Weiß-Card — rhythmische Abfolge. Handshake-Foto in Grün-Duotone.
- **Komponenten:** Wiederholte Story-Chrome; riesige angeschnittene Wortmarke "Coac(h)" unten links als Bildausschnitt; Bogen-Motiv auf Card 3 mit CTA "Unlock Your Personal Sales Brain".
- **Micro-Details:** Serien-Logik: gleiche Headline-Position, wechselnde Bildwelt; Fotos IMMER in Markengrün getont — kein unbearbeitetes Foto.

### `HSOUeQza8AA8gWy` — Web-Banner
- **Was:** Zwei Web-Banner/Ads, gleiches System.
- **Layout:** Banner 1: Bogen-Motiv links angeschnitten, Serif-H rechts zentriert. Banner 2: Gradient-Feld, Bögen rechts, Silhouetten.
- **Typo:** "Your Personal / Sales Brain" Serif ~64 px Grün, Umbruch nach "Personal".
- **Farbe:** Weiß + Grün-Skala; Banner 2 Hellgelb-Grün-Gradient.
- **Micro-Details:** Bögen als Crop-Motiv (laufen aus dem Frame); Motiv-Kontinuität über alle Touchpoints (Story → Keyvisual → Banner): dieselben Bögen, dieselbe Serif, dasselbe Grün — Markensystem statt Einzeldesigns.

---

## Widget-Trio (3 Screens)

### `HSP0aQ7asAAOUDA` — Kalender-Widget
- **Was:** Isolierte Kalender-Komponente (Widget-Showcase), Produktivitäts-App.
- **Layout:** Karte zentriert auf `#ECECEC` mit viel Leere (Showcase-Framing). Karte: Header, Wochenzeile, Event-Row.
- **Typo:** "Calendar" 20 px semibold; Wochentag 14 px grau, Datum 20 px semibold; Event-Titel 17 px semibold, Zeit 15 px grau.
- **Farbe:** Weiß/Grau-Neutral + EIN Akzent Orange `#F97316` (aktiver Tag, Plus-Button).
- **Radien/Border/Shadow:** Karte radius ~28 px, Shadow kaum sichtbar. Aktiver Tag Orange-Tile radius ~12 px. Plus-Button Kreis 40 px orange, weißes Plus.
- **Komponenten:** Monats-Dropdown ("July ⌄" grau); Pfeil-Nav text-only; Event-Row als Inset-Panel `#F5F5F5` radius 16 px; "Google Meet"-Chip (Icon + Text, weiß, radius 8 px, 1px `#EEE`); Avatar-Stack (3) + Plus rechts.
- **Micro-Details:** Wochentag über Datum als zweizeilige Zelle; aktiver Tag als einzige Farbfläche → sofortiger Fokus; orangenes "+" als viertes Avatar-Element (Einladen-Affordanz); "•••"-Meatball grau.

### `HSP0bluawAAI4ZN` — Bar-Chart-Karte
- **Was:** Task-Statistik-Widget.
- **Layout:** Titel links, Legende rechts oben; Chart mittig; Wochentage unten. Gleiches Showcase-Framing auf `#ECECEC`.
- **Typo:** Titel 20 px medium ("32 Overall Task"), Legende 15 px, Tooltip 13 px weiß.
- **Farbe:** Plan = Lavendel `#A5A6F6`, Completed/aktiv = Orange `#FF8A3D`, Track `#F0F0F0`. Tooltip schwarz `#1A1A1A`.
- **Radien/Border/Shadow:** Karte radius ~28 px. Bars als CAPSULES (radius = Breite/2, ~14 px). Tooltip radius 8 px mit Spitzen-Pfeil.
- **Komponenten:** Zwei-Zustands-Bars: Track-Capsule dahinter (hell), Fill-Capsule davor; einziger aktiver Tag orange + Tooltip "89% Complete" dauerhaft darüber.
- **Micro-Details:** Track+Fill-Overlay = Ziel-vs-Ist-Metapher; permanenter Tooltip auf dem Highlight-Tag (Showcase-Konvention); Höhen organisch variierend; Legenden-Dots 10 px.

### `HSP0co3aEAAhHhE` — Donut-Karte
- **Was:** Task-Verteilungs-Widget (Schwestercard).
- **Layout:** Titel + "•••" oben; Donut zentriert; Legende unten mittig.
- **Typo:** Zentrum "80%" ~44 px semibold + "Tasks Completed" 16 px regular; Legende 16 px grau.
- **Farbe:** Segmente: Orange `#FF8A3D`, Gold/Oliv `#B08A1E`, Lavendel `#A5A6F6`, Rest-Track `#E8E8E8` — Palette konsistent mit den Schwestern.
- **Radien/Border/Shadow:** Donut-Stroke ~28 px mit runden Linecaps an Segment-Enden (Gap ~4 px zwischen Segmenten).
- **Komponenten:** Legenden-Dots + Labels horizontal.
- **Micro-Details:** Round-Cap-Segmentierung statt Kuchenstücke (freundlicher); größtes Segment ab 12 Uhr im Uhrzeigersinn; "80%" dominiert — die Karte kommuniziert eine Zahl, nicht das Diagramm.

---

## Flink (1 Screen)

### `HSPUSCbaYAABq7g` — Why-Sektion (B2B-Fintech)
- **Was:** "Why us"-Sektion mit 3 Gradient-Cards, Banken-Zielgruppe.
- **Layout:** WEISSE Sheet-Seite auf dunklem Ölgemälde-Textur-BG, flankiert von zwei 1px vertikalen Hairlines (Framing über die gesamte Höhe). Content zentriert: Chip, H1, Sub, 3 Cards (Gap ~32 px).
- **Typo:** H1 ~48 px semibold, Sub 17 px grau, zentriert. Card-Text weiß: Titel 16 px semibold, Sub 13 px 85 % weiß.
- **Farbe:** Cards: satte Mesh-Gradients (Gelb→Orange, Blau→Grün, Rot→Pink) MIT Noise-Textur. Panels auf Cards: dunkles Glass (`rgba(0,0,0,0.35)` + Blur). Progress-Fill Cyan.
- **Radien/Border/Shadow:** Cards radius ~20 px; Glass-Panels ~14 px; Chip "Why Flink" 1px Border `#DDD`, radius 999, 6×14, 13 px.
- **Komponenten:** Card 1: Spend-Übersicht mit Mini-Donut + Kategorien-Icon-Grid (5 getönte Icon-Tiles mit Werten). Card 2: Spar-Liste mit 3D-Emoji-Objekten (Burger, Gitarre, Karte) + Lock-Icons + Progress-Bars. Card 3: Feature-Liste mit blauen Circle-Icons 40 px.
- **Micro-Details:** ÖLGEMÄLDE-Hintergrund (Old-Master-Textur) hinter SaaS-UI = absichtlicher Anachronismus, extrem memorable; Noise auf allen Gradients; vertikale Hairlines als "Museumsrahmen"; ₹-Währung (Indien-Markt); Lock-Icon 16 px.

---

## Stacker (4 Screens)

### `HSQDPSubwAA9-hN` — Hero
- **Was:** SaaS-Hero (No-Code-Portale/CRM auf Airtable).
- **Layout:** BLAUER Vollbleed-BG (`#2563EB`), weiße Sheet mit radius ~24 px nur oben — die Seite liegt als Karte auf Markenfarbe. Innen: Nav, H1 zentriert-links, Feature-Tab-Pills, UI-Mock-Grid (blaue Order-Card + graue Action-Pills + Foto-Card), Copy-Block, dunkle Upsell-Sektion.
- **Typo:** H1 ~64 px tracking −0.02em schwarz. Body 17 px. Card-Betrag "$2,490.00" ~40 px weiß.
- **Farbe:** Markenblau `#2E7CF6`/`#2563EB` als BG + Order-Card; Weiß-Sheet; dunkle Sektion `#111`; Profil-Button Lila `#7C5CFC`.
- **Radien/Border/Shadow:** Sheet radius 24 px; Order-Card radius ~16 px mit diagonalem hellerem Farbkeil (Licht-Reflex als festes Grafikelement); Action-Pills `#F3F4F6` radius 12 px.
- **Komponenten:** Nav-Links mit Chevron-Dropdowns (Product ⌄, Solutions ⌄), KEIN CTA-Button in Nav (ungewöhnlich). Feature-Pills: aktiv = hellgrauer Fill + Icon + schwarzer Text; inaktiv = grauer Text/Icon, kein Fill.
- **Micro-Details:** Lichtkeil auf Farb-Cards (wiederholt sich); Datumsformat "18 Jan, 2023"; weißer Sheet-Rand macht die Page zur "App-Karte"; Cube/People/Node-Icons 20 px outline.

### `HSQDPSvaUAAldyA` — Event-Cards
- **Was:** Event-/Webinar-Card-Stack (Komponenten-Showcase).
- **Layout:** Drei Karten ÜBERLAPPEND (negative Margins, stacking left→right), laufen rechts aus dem Frame.
- **Typo:** Datum 28 px medium + "FEBRUARY" 12 px uppercase tracking 0.06em opacity 60 %. Titel 20 px medium, Zeit 15 px.
- **Farbe:** Karte 1 Weiß/`#FAFAFA`, Karte 2 Orange `#FF5A1F`, Karte 3 Blau `#2E7CF6` mit Lichtkeil. Text auf Farbe weiß, auf Weiß schwarz/grau.
- **Radien/Border/Shadow:** Radius ~20 px; Überlappung ~30 px; dezenter Shadow unter jeder Karte verstärkt Stapel-Tiefe.
- **Komponenten:** Reine Content-Cards ohne Buttons — Datum oben, Titel mittig-unten, Zeit darunter.
- **Micro-Details:** Farb-Rotation Weiß→Orange→Blau als wiederholbares Muster; Überlappung statt Grid = "Kartenstapel"-Haptik; identische Innenstruktur bei wechselnder Farbe (System-Denken).

### `HSQDPSwbsAA6Czl` — Task-Management-Feature
- **Was:** Feature-Card (Kanban-Mockup) — Pattern "Label + H3 + UI-Mock + Checkliste".
- **Layout:** Hellgrau-Card (`#F5F5F5`, radius 24 px) auf Weiß, zentriert, max-w ~800 px. Innen: Label, H3, 2-Spalten-Kanban (TO DO/DONE), darunter 2 Checklisten-Punkte.
- **Typo:** Label "TASK MANAGEMENT" 13 px uppercase tracking ~0.08em grau `#6B7280`. H3 28 px semibold. Card-Titel 17 px medium, Datum 15 px grau.
- **Farbe:** Neutral + Phase-Chips als Pastell-Tints: PHASE 2 orange (`bg #FFEDD5`/`text #EA580C`), PHASE 1 grün, PHASE 4 blau, PHASE 3 lila. Aktive Task-Card: 2px Orange-Border.
- **Radien/Border/Shadow:** Spalten-Panels radius 16 px (`#EBEBEB`, Inset-Look), Task-Cards radius 14 px weiß, Chips 999, 11 px uppercase.
- **Komponenten:** Oranger Cursor + "You"-Pill (orange, weißer Text) auf der aktiven Card — Multiplayer-Detail. Checks unten: graue ✓ + 16 px grauer Fließtext.
- **Micro-Details:** Leere Phasen-Chips als "Ghost-Cards" angedeutet (nur Chip + leere Card); State über Border-Farbe statt Fill; Checkliste verbindet Visual mit Benefit-Copy.

### `HSQDPbRbQAAcA4t` — Collaboration-Feature
- **Was:** Feature-Card (Kommentar-Thread) — gleiches Pattern, invertiertes Farbkleid.
- **Layout:** ORANGE Vollbleed (`#FF5A1F`), weiße Card radius 24 px zentriert. Innen: Label, H3, zwei Kommentar-Bubbles (zweite eingerückt ~80 px), Checkliste.
- **Typo:** Wie oben. Name 15 px grau medium, Kommentar-Text 17 px schwarz, @Mentions blau `#2563EB`.
- **Farbe:** Orange BG; Avatar-Kreise kräftig Lila `#7C3AED` / Grün `#22C55E` mit weißem Initial.
- **Radien/Border/Shadow:** Bubbles radius ~14 px weiß, Shadow `0 8px 20px rgba(0,0,0,0.06)`; Reaction-Chips 999, getönte BGs (rot/gelb/blau ~10 % opacity).
- **Komponenten:** Emoji-Reactions mit Count (📌 8 · ⭐ 3 · 🚀 7) + "Add-Reaction"-Ghost-Chip (Icon nur, opacity 40 %).
- **Micro-Details:** Echte Emojis statt Line-Icons (menschlich, produktnah); Reaction-Counts als Social Proof im Mock; Thread-Einrückung zeigt Antwort-Logik ohne Linien; Avatare = Initialen-Kreise (kein Foto) 36 px.
