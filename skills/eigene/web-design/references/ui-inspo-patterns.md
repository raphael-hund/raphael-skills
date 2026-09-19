# UI-Inspo-Muster — wie Weltklasse-Interfaces gebaut sind (66 Screens destilliert)

> **Kanon-Verweis (web-Skill):** Doktrin-Regeln in `design-doktrin.md`, Anti-Slop-Gates in
> `review-qa.md` + `qa-faecher.md`, Bild-für-Bild-Details in `ui-inspo-bildanalysen.md`.
> Diese Datei ist die Werte- und Taktik-Bibliothek: Was man bei art-direction/components
> konkret übernimmt. Blind-A/B-Vergleichsmaßstab für `screenshot-kritik-loop.md` 3b.

Quelle: Mikro-Analysen von 66 hochwertigen UI-Screenshots (X/Twitter-Inspirationssammlung),
destilliert aus drei Batches + Vorgänger-Pattern-Datei. Alle px-/Hex-Werte sind Schätzungen
aus der Sichtung (Referenzbreite ~1440px Desktop), als Nachbau-Vorgaben gedacht.

---

## 0. Wie benutzen

- Laden bei art-direction, komponenten-ideation und im Review (Vergleichsmaßstab).
- Übernehmen heißt: System-Transfer (Skalen, Rollen, Budgets), nicht 1:1-Kopie einzelner Screens.
- Der Brief gewinnt immer: Ein Pattern ohne Grund ist Deko. Werte sind Startpunkte, keine Dogmen.
- Pro Projekt EIN Signature-Asset und EINE Akzent-Logik wählen, dann konsequent durchziehen.
- Gegenprobe am Ende: § 4 Anti-Slop-Kern. Jedes Nein ist ein konkreter Fix.

---

## 1. Die zehn Gesetze (batch-übergreifende Gemeinsamkeiten)

1. **Ein-Akzent-Disziplin.** Pro View genau eine Signalfarbe, ausschließlich auf CTA, aktivem
   State, Key-Numbers, Eyebrow (Flächenanteil ≤ ~5–10 %). Sekundärfarben nur mit fester
   semantischer Rolle (Rot/Grün bei Before/After, Alarm-Badge). Warum: Farbe als Ration wirkt
   teuer; Slop verteilt Akzente überall.

2. **Größe schlägt Fett.** Headlines überraschend oft regular/medium (400–500), Autorität kommt
   aus Größe (48–80 px) + negativem Tracking, nicht aus Bold. Warum: Bold überall = Slop-Signal;
   Größenkontrast (H1:Body ≈ 3.5–5:1) erzeugt Hierarchie ohne Schreien.

3. **Dark = Border statt Shadow, Light = Weißraum statt Border.** Dark-Cards `#111`–`#161616`
   auf `#0A0D0B`–`#0D0D0D`, Trennung über 1px `rgba(255,255,255,0.06–0.08)`, praktisch null
   Shadows. Light-Sektionen trennen oft nur über 60–120 px Abstand. Warum: Schatten auf Dark
   wirken matschig; auf Light sind Hairlines/Abstand souveräner.

4. **Signature-Asset-Disziplin.** Jede Marke hat EIN wiedererkennbares Asset, das in ≥ 4
   Sektionen mit Varianten wiederholt wird: Pixel-Treppe (Parnidia), Pfau + Annotationen (B2B3),
   Schach-3D (NLF), Browser-Mockup + Hatch (Cybercube), Tick-Band, Bögen (Coach), Lichtkeil
   (Stacker). Warum: Wiederholung = Marken-Eigenheit; Slop wechselt Deko pro Sektion.

5. **Sheet-on-Background.** Seite/Sektion liegt als abgerundete Card (radius 20–32 px) auf
   farbigem/texturiertem Außen-BG (Markenblau, Ölgemälde, Waldgrün, Grau). Außen-Inset 12–80 px.
   Warum: Rahmung macht die Page zum Objekt — sofort unterscheidbar vom Viewport-füllenden
   Standard-Layout.

6. **Floating-UI über Fotografie.** Mini-Panels (Stat-Cards, Notifications, Tabellen) schweben
   mit radius 12–16 px + weichem Shadow oder Glass über Fotos/3D — Produktbeweis als Overlay.
   Inhalt immer spezifisch ("Active Calls: 2m 14s"), nie Lorem. Warum: Spezifität ist das
   Premium-Signal; Slop füllt Mockups perfekt-generisch.

7. **Schwarz als primärer CTA (Light-UIs).** In hellen Interfaces ist der Primary-Button fast
   immer schwarz gefüllt (`#0A0A0A`–`#1A1A1A`), nicht brandfarbig — Akzentfarbe wird für
   States/Highlights gespart. CTA-Schulen nie mischen: entweder Akzent-Pill ODER Helligkeits-
   Umkehr (weiß auf schwarz / schwarz auf weiß), eine Schule pro Seite. Warum: Monochrom-CTA
   strahlt Souveränität aus und schont das Farb-Budget.

8. **Zustände ohne neue Farben.** Aktiv/inaktiv läuft über Opacity (100/45–60 %), Form
   (Raute vs. Kreis), Textur (45°-Hatch vs. solid) oder Invertierung (schwarze Pill). Warum:
   Jede zusätzliche State-Farbe verwässert das Ein-Akzent-System.

9. **Getönte Neutrale, nie rein.** Light-BG `#F7F4EE`–`#FAF9F6` (warm) oder `#F2F1FB` (Tint),
   Dark-BG `#0A0A0A`–`#121417` oder farb-getönt (`#0A0F0D`, `#12211C`). Kein #FFF, kein #000
   als Seitenfläche. Warum: Reinweiß/-schwarz liest sich als Default, Getöntes als Entscheidung.

10. **Mut zur Leere und zum Ausschnitt.** 30–50 % Weißraum pro Sektion, genau EIN Overlap-Bruch
    (Visual ragt 10–15 % über die Container-Kante), Peek-Karussells mit angeschnittener letzter
    Card, ausfadende Footer-Wordmarks. Warum: Leere ist das Luxus-Signal; Slop füllt jeden Pixel
    und zentriert alles in gleichmäßige Boxen.

---

## 2. Werte-Bibliothek

### Typografie-Skala

| Ebene | Werte | Notizen |
|---|---|---|
| Display H1 | 52–80 px, weight 400–600, tracking −0.02 bis −0.03em, lh 1.0–1.1 | Condensed/All-Caps bis ~110–120 px (Editorial); Pixel-Font 64–80 px uppercase als Brand-Sonderfall |
| H2 Sektion | 40–48 px, gleiche Behandlung wie H1 | Größen-Konsistenz über Sektionen pflegen |
| Quote/Testimonial | 28–32 px REGULAR, lh 1.4 | Ohne Anführungszeichen-Grafik; Serif für "echte Stimme" |
| Body | 15–17 px, lh 1.55–1.65, FG@55–65 % | Dark: `rgba(255,255,255,.55)`; Light: `rgba(0,0,0,.55)`; max-width 52–60ch |
| Subline | 16–19 px, opacity 55–65 %, 1–2 Zeilen | Enthält Zahlen oder konkrete Mechanik; Title-Case = US-Sales, Sentence-Case = EU/Enterprise |
| Eyebrow/Label | 10–13 px, uppercase, tracking 0.06–0.12em, weight 500–600 | Akzentfarbe oder FG@50–60 %; optional Prefix ● / ✱ / Akzent-Strich (2×14 px) / Tint-Badge `rgba(accent,0.12)` padding 6×10 radius 6–8 |
| Meta/Mono | 10–13 px, tracking 0.05–0.1em | Für Daten, Timestamps, Versionen, Quellenzeilen |

- **H1:Body-Verhältnis ≈ 3.5:1 bis 5:1** (Extrem, nicht lauwarme 1.8:1).
- **Font-Rollentrennung absolut:** Serif = Emotion/Stimme/Zitate/Premium-Enterprise, Sans = UI/
  Aktionen, Mono = Daten/Meta/Code. Handschrift = Annotations-Ebene. Max. 2 Font-Welten pro
  Sektion; nie Serif für UI-Text.
- **Headline-Pointillen:** Punkt am Ende ("Companies.", "Wellbeing.") als Editorial-Signal;
  EIN Akzent-Wort in der H1 (Vollfarbe, Rest neutral); alternativ zweifarbige H2 über
  Graustufen (Zeile 1 100 %, Zeile 2 ~45–50 % opacity); En-Dash mit Leerraum; "10×" statt "10x";
  Tausender-Leerzeichen ("2 817 steps", "$ 45.281,09"); NIEMALS Gradient-Text.
- **Stat-Paarung:** Zahl 40–64 px light/regular + Label 11–13 px uppercase opacity 50 %;
  horizontal: Zahl links, 2-zeiliges Label rechts auf Baseline-Mitte. Beträge staffeln:
  Ganzzahl groß, Dezimalstellen kleiner/blasser.

### Farbsysteme

| Regel | Werte |
|---|---|
| Dark-BG | `#0A0A0A`–`#0D0D0D` neutral, `#0A0F0D` (grün-getönt), `#12211C` (waldgrün), `#1A1A1A` (App) |
| Dark-Card | BG + 4–6 % Helligkeit: `#101614`–`#161616`; Trennung primär über Border, nicht Fläche |
| Light-BG | `#F7F4EE`–`#FAF9F6` / `#FAFAF8` (warm), `#F2F1FB` (kühler Tint), `#F4F4F6` (neutral) |
| Akzent-Budget | max. ~5–10 % der Fläche: CTA, aktive Chips, Key-Numbers, Eyebrow — nichts sonst |
| Akzent im 3D-Visual | Rim-Light/Glow/Gravur auf ~10–20 % der Objektfläche (Radial-Glow ~10 % Opacity hinter Hero-Objekten) |
| Status-Semantik | Grün `#4ADE80`/`#34D399` positiv, Rot `#F87171` Alarm; sonst Akzent-Tints 10–15 % Alpha |
| Preis-Darstellung | Neuer Preis Akzent ~64 px, alter Preis FG@40 % durchgestrichen, ~50 % der Größe (Verhältnis ~2:1) |
| Fremdmarken | Kunden-Logos immer Grayscale + opacity 40–50 %; Integrations-Icons originalfarbig (Erkennbarkeit = Conversion) |
| Dual-Theme | Opacity-Tokens exakt gespiegelt (0.55 weiß ↔ 0.5 schwarz); Komponenten ohne Redesign portierbar |
| Foto-Treatment | Nie roh: Duotone/Colorgrading, Motion-Blur, entsättigt, Overlay-Verdunkelung, Grain |

### Radius-System

| Ebene | Radius |
|---|---|
| Pill / Chip / Toggle | 999 px |
| Klein: Badge, Input, kleine Chips | 6–10 px |
| Mittel: Buttons, Standard-Cards, UI-Mocks | 10–16 px |
| Groß: Feature-Panels, Media-Cards, Sheet | 20–32 px |
| Editorial/Brutalist-Ausreißer | 2–4 px (bewusst eckig = souverän; Buttons, CTAs) |

- **Schachtelungs-Regel:** max. 2–3 Ebenen; pro Ebene radius −4 px und Helligkeit 1 Stufe
  abgesetzt (hell: `#FFF` → `#F9FAFB` → `#F3F4F6`). Flächen-Stufen und Radien folgen derselben
  Ebenen-Logik — niemals pro Komponente würfeln.

### Border & Shadow

| Kontext | Werte |
|---|---|
| Dark-Border | 1px `rgba(255,255,255,0.06–0.08)` Cards; 0.10 Listen-Divider; 0.2–0.25 Ghost-Buttons |
| Light-Border | 1px `#E5E5E5` / `rgba(0,0,0,0.08)`; Ghost-Button schwarz 15–25 % |
| Hairlines | 1px `rgba(255,255,255,.10)` dunkel / `rgba(0,0,0,.08)` hell; vertikale KPI-Trenner Höhe ~60 % der Zeile |
| Shadow-Regel | Dark: 0 Shadows. Light: nur Floating-Overlays `0 8–12px 30–40px rgba(0,0,0,0.08–0.14)` |
| Floating Card auf Foto | radius 16 px, bg weiß ODER `rgba(20,20,20,.55)` + backdrop-blur 12–24 px + 1px `rgba(255,255,255,.1)`; Shadow `0 12–24px 40–60px rgba(0,0,0,.1–.15)` |
| Glass-Regel | Glassmorphism NUR auf fotografischem/Gradient-Grund. Auf Flat: 1px Hairlines statt Schatten |
| Text auf Foto | Bottom-Scrim schwarz 0→60 % im unteren Drittel; Text oben = zusätzlicher Top-Scrim |
| Border-statt-Shadow-Sonderfall | Page-Card mit 2px dunklem Border (`#1A3A2E`) statt Shadow (Neubrutalismus-light) |

### Spacing

| Element | Werte |
|---|---|
| Sektions-Padding vertikal | 96–160 px (ruhige Editorial-Sektionen ~120 px) |
| Eyebrow → Headline | ~16 px |
| Headline → Body | ~20 px |
| Body → CTA | ~32 px |
| Card-Padding | 24–28 px |
| Grid-Gaps | Feature-Grids 20–32 px; Bento-Cells 8–24 px (8 px = "ein Objekt"-Look); Logo-Row ~64 px |
| Weißraum-Budget | 30–50 % pro Sektion, Problem-Sektionen ≥ 60 % |
| Sheet-Inset | 12–24 px (mobil) bis 80 px (Showcase); Oben-only-Radius wenn Sheet bis Viewport-Kante läuft |

### Buttons

| Variante | Werte |
|---|---|
| Maße | Höhe 44–56 px, Padding 14–16 × 24–32 px, Label 13–15 px medium/semibold, optional "→"-Suffix mit 8 px Gap |
| Primary Light-UI | bg `#0A0A0A`–`#1A1A1A`, Text weiß, Pill 999 px |
| Primary Dark-UI | Akzent-Fläche + dunkler Text ODER weiße Pill + schwarzer Text; radius 2–12 px |
| Secondary/Ghost | transparent, 1px Border FG@15–25 %, gleiche Höhe/Form wie Primary; kein Fill oder 5 %-Tint |
| CTA-Paar-Choreografie | Primary + Secondary nebeneinander, gleiche Höhe, gleiche Form; Nav-CTA wiederholt Primary exakt (gleiche Formulierung) |
| Pill-Kultur | Light-Mode → Pill 999 px; Dark/Editorial → eckiger (2–12 px) |
| Segmented Control | Container bg `rgba(fg,0.06)`, radius 999/12, padding 4 px; aktives Segment weiß (light) / `#2A2A2A` (dark) + kleiner Shadow, radius container−4 px |

### Chips & Status-Pills

| Typ | Werte |
|---|---|
| Status-Pill | padding 4×10, radius 999, font 10–11 px semibold (uppercase für Kategorien), BG = Akzent 10–12 % Alpha, Text = Akzent gesättigt (z. B. `bg #FEF2F2 / text #DC2626`) — NIE solid-bunt |
| Auswahl-Chip (Pricing/Filter) | inaktiv `#161C19` + 1px Border + FG@60 %; aktiv = Akzentfläche + dunkler Text; Micro-Label über aktivem Chip (10 px uppercase, opacity 50 %: "Most Popular") |
| Benefit-Chip (Step-Card-Fuß) | dunkelgrau `#1C2420`, radius 8 px, kleines Icon links, EIN Chip pro Card |
| Micro-Label über Chips | ~10 px uppercase, opacity 50 % |
| Step-Badge | Tint-Fläche `rgba(akzent,0.12)` + Akzent-Text, radius 8 px ("🛒 STEP 01") |
| Icon-Tile | 40 px, radius 10–12 px, bg schwarz (Light-UI) oder Akzent, Icon 20 px, Strich 1.5–2 px runde Caps |

### Nav

| Element | Werte |
|---|---|
| Höhe | 64–72 px |
| Aufbau | Logo links, 4–8 Links Mitte (13–15 px, opacity 60–70 %, aktiver Link 100 %), rechts CTA + optional Ghost-Login / Language-Dropdown |
| Trenner | Hairline 1px darunter ODER Tick-Mark-Band (Lineal-Pattern) |
| Varianten | Alles-in-Glass-Pill floatend über Foto (aktives Item in dunklerer Pille); Sidebar-Nav ~200 px mit aktivem Item als Akzent-Pille (Editorial/Brutalist) |
| Nav-CTA | Wiederholt Hero-Primary exakt; Live-Dot (8 px, Akzent) im CTA als Status-Detail möglich |

### Cards

| Typ | Werte |
|---|---|
| Standard-Card | radius 16–20 px, padding 24–28 px, border 1px `rgba(fg,0.08)`, bg 1 Stufe abgesetzt, kein Shadow auf Flat |
| Marketing-Card | radius 20–24 px, kein Border, kein Shadow — Unterscheidung nur über BG-Fläche/Gradient |
| UI-Mock-Card (schwebend) | radius 12–14 px, 1px Border `rgba(0,0,0,0.06)` + Shadow `0 8px 24px rgba(0,0,0,0.08)` |
| Feature-Caption | Titel + Body UNTER der Card (nicht darin): Titel 18–22 px semibold, Body 14–15 px grau, ~24 px Abstand |
| Card-Stack | Überlappung ~30 px negative Margins ODER Offset ~12 px (Papierstapel); dezenter Shadow pro Karte für Stapel-Tiefe |
| Regel | Nie 3–6 gleiche Icon-Kacheln mit Titel+Text; pro Card ein anderer Visual-Typ |

### Stats & KPI

| Element | Werte |
|---|---|
| Stat-Block | Zahl 28–64 px light/regular (Mono oder Sans 500), Label 11–13 px uppercase grau, Tausender-Trennung, "+/−"-Präfix farbig (grün/rot) |
| Stat-Row | 3–4 KPIs durch 1px vertikale Hairlines getrennt, direkt im Hero platzierbar; nackt auf BG, keine Card |
| Horizontal-Paarung | Große Zahl links, erklärender Text rechts auf Baseline-Mitte |
| Typo-Stats | Zahl 48–72 px ohne Container/Icon — die Zahl ist das Design; Dezimalstellen kleiner/blasser |
| Konkretheits-Regel | Immer echte Zahlen ("$400k", "4261+ reviews", "60 %", "11.7x"), mit Einheiten-Mix |

### Charts

| Element | Werte |
|---|---|
| Highlight-Regel | Genau 1 Akzent-Datenpunkt, Rest neutral oder gestreift (45°-Hatch, 2 px Strich, 6 px Gap); Ausreißer invers (weiß) |
| Bars | Capsules (radius = ½ Breite); Track+Fill-Overlay (Ziel-vs-Ist); inaktive Bars mit Stripe-Hatching statt Grau |
| Donut/Ring | Stroke ~10–28 px, runde Linecaps, Gap ~4 px zwischen Segmenten; größtes Segment ab 12 Uhr; Label im Ring zentriert; eine Zahl dominiert |
| Gauge | Einzelne Ticks/Segmente statt durchgehender Bogen (~60 Ticks, aktiv Akzent, Rest `#3A3A3A`) |
| Line/Area | Stroke 1.5–2 px, Area-Fill = Akzent 10–20 % → 0; Step-Line für diskrete Zustände; Thresholds dotted statt solid |
| Heatmap | Zellen radius 3 px, Gap 3–4 px, 5-Stufen-Skala des Akzents (10/30/50/75/100 %), Worst-Cell weiß |
| Achsen/Legenden | Mono 12–13 px grau (`#6B7280`); Legende = farbiges Quadrat 10 px + Label + Wert rechtsbündig |
| Tooltip | Schwarz/weiß invers zur Fläche, radius 8 px, kleiner Pfeil; nennt konkrete Cases ("#402 · worst"); dauerhaft am Highlight-Punkt |
| Sparkline | 1.5–2 px Strich, Threshold als dotted Line |

### Forms & Inputs

| Element | Werte |
|---|---|
| Input | radius ~10 px, Fill `#F5F5F5` ohne Border (light) |
| OAuth-Button | weiß, 1px Border `#E5E5E5`, radius 10 px |
| Primary Form-Button | `#1A1A1A`, radius 10–14 px, Höhe ~48–56 px, full-width |
| Divider | Hairline – "or" – Hairline |
| Kalender-Zellen | ~44 px Quadrate, radius 14 px; drei Füllzustände ohne Farbe: disabled transparent / verfügbar `#F3F4F6` / selected SCHWARZ weiße Zahl |
| Time-Slots | 2-Spalten-Pillen, radius 12 px, Höhe ~48 px, abwechselnd Fill/Outline, selected schwarz, führender Dot "● 14:00" |
| Toggle (iOS) | aktiv in Akzentfarbe |
| Keyboard-Hint | "⌘K" im Search-Input als Echtheits-Detail |
| Rules-/Spec-Listen | Label links FG@50 %, Wert rechts Akzent oder FG@90 %, ~14 px; Rows mit 1px Bottom-Hairline `rgba(fg,0.06)` — kein Kästchen-Raster; Sternchen-Fußnoten ("100*") für Legal-Präzision |

### Logo-Reihen & Social Proof

| Element | Werte |
|---|---|
| Logo-Row | Grayscale, opacity 40–50 %, Höhe ~24–30 px, großzügige Gaps (~64 px); davor 1 Zeile Proof-Text zentriert ("30+ Companies…"); optional 1px vertikale Hairline-Divider statt Abstand |
| Trust-Bar | Pills mit Stern-Icons (~14 px gefüllt), Avatar-Stack, 1px vertikale Trennstriche; invertiert als Akzent-Fläche mit dunklem Text möglich |
| Avatar-Stack | 3–5 runde Avatare 24–28 px, Overlap −8 px, 2 px Border/Ring in BG-Farbe; danach Trust-Text oder "+"-Aktionskreis |
| Proof-Pill | Avatare + Text in einer Pill (BG getönt, radius 999), 13 px |
| Testimonial | Quote 28–32 px regular ohne Anführungszeichen-Grafik; unten Avatar+Name \| 1px vertikale Linie \| Metrik (Zahl auf Augenhöhe, ~40 px light); Carousel-Pfeile 48–56 px Square/Pill oben rechts; Paginierung "01/05" (Total opacity 40 %) + Text-Pfeile ← →; Accent-Bar 2 px links statt Quote-Grafik möglich |
| Review-Chips | Echte UI-Texte mit Sternen, schwebend über Mockups ("★★★★★") |

### Footer

| Element | Werte |
|---|---|
| Mega-Wordmark | 12–15 vw (bis ~200–320 px), füllt ~80 % der Breite, unten angeschnitten oder per Gradient ausfadend |
| Struktur | Inset-Card (radius 24–32 px, dunkler als Page, sichtbarer Außenrand 12–16 px = "Sheet im Sheet"); 3 Spalten Linkgruppen |
| Labels | 11 px uppercase, tracking 0.1em, opacity 50 % ("MAIN MENU / CONTACT US") |
| Links | ~20 px, mit "/"-Separatoren |
| Bottom-Bar | 12 px, opacity 50 %; ©-Zeile mit Gedankenstrich ("© 2026 — Copyright …") |
| Details | Back-to-top "↑" text-only; Kontakt-Hierarchie über Farbe (Telefon weiß, E-Mail grau); Eskalations-Variante: Vollflächen-Akzent-Gradient hinter der Wordmark |

---

## 3. Signature-Moves & Micro-Details

Baubare Rezepte für die "teuer machenden" Details. Pro Projekt 1–3 Moves wählen, nicht alle.

### Pixel-Treppen-Maske
- **Was:** Foto/Gradient wird als aufsteigende/absteigende Treppe aus ~8 px-Pixel-Stufen maskiert (~6 Stufen, Schritt ~40 px).
- **Wann:** Hero-Ecken, Testimonial-Visuals; als wiederholtes Marken-Asset über alle Sektionen.
- **Wie:** Clip-Path mit gestuften Rechtecken; Orientierung variieren (von oben rechts, von unten links); Füllung wechseln (Foto ↔ Mesh-Gradient = Abstraktions-Stufen).

### Ghost-Typografie
- **Was:** Riesige Wortmarke/Slogan hinter der Sektion, opacity 8–15 %, oben angeschnitten ("Save Better", "ANCHOR").
- **Wann:** Hinter Bento-Sektionen, in Gradient-CTA-Bändern, wenn Fläche zu leer droht.
- **Wie:** Display-Font ~200 px, absolut positioniert, overflow-crop, keine Interaktion.

### Zweifarbige Headline
- **Was:** Zeile 1 in Textfarbe 100 %, Zeile 2 in ~45–50 % Opacity — derselbe Font, gleiche Größe.
- **Wann:** Prozess-/Why-Sektionen; Alternative zum Akzent-Wort, ganz ohne Farbe.
- **Wie:** Zwei Spans, `color: rgba(fg, 0.45)` auf Zeile 2; Umbruch nach Bedeutungsgruppe.

### Mono-Metadaten mit Middle-Dots
- **Was:** Datenzeilen in Monospace, Felder durch " · " getrennt: "triage-1 · v14 · last 24 h · 12,480 calls".
- **Wann:** Dev-Tools, Dashboards, technisch-seriöse Brands; unter Card-Titeln, als Card-Subtitle.
- **Wie:** Mono 13 px grau; Versionstags ("v14") konsistent überall wiederholen.

### Zeitungs-Ornamente
- **Was:** Editorial-Metazeilen "VOL. II · NO. 04", "ISSUE · 30 APR 2026", "FIG. 01", "§ 02 / PROBLEM → FIELD REPORT", Quellenzeilen "+ SOURCE: STACK OVERFLOW DEV SURVEY '25".
- **Wann:** Editorial/Brutalist-Positionierung; über der H1, an Visuals, unter Stats.
- **Wie:** Mono uppercase 10–11 px, grau; §-Zeichen vor Sektionsnummern; das Design "dokumentiert sich selbst".

### Double-Ring-Button
- **Was:** Primary-Pill mit zweitem äußerem Ring (4 px Offset-Border in Akzent/Transparent).
- **Wann:** EIN Hero-CTA als Juwel; nicht wiederholen.
- **Wie:** `box-shadow: 0 0 0 4px rgba(accent, .35)` oder ::after-Ring um die Pill.

### Gestreifte inaktive Chart-Bars
- **Was:** Inaktive Balken mit 45°-Diagonal-Hatch statt Grau; aktiver Balken solid Akzent.
- **Wann:** Bar-Charts mit Highlight-Logik; auch für negative Segmente statt Rot.
- **Wie:** repeating-linear-gradient 45°, 2 px Strich, 6 px Gap; Zustand über Textur = keine neue Farbe.

### Cursor + "You"-Pill
- **Was:** Schwarzer/farbiger Mauszeiger mit Namens-Pill ("You", schwarz, weißer Text, radius 999) in UI-Mockups — Figma-Multiplayer-Anspielung.
- **Wann:** Kollaborations-, AI- und Dev-Produkte; max. 1 Live-Element pro Sektion.
- **Wie:** 20 px Cursor-SVG + Pill 12 px Text; auf der "aktiven" Card platzieren (mit Akzent-Border).

### Ausfadende Footer-Wordmark
- **Was:** Riesige Wortmarke, die per Gradient-Maske nach unten transparent wird oder den Viewport-Rand cropt.
- **Wann:** Jede Landingpage — Footer wird vom Pflicht-Anhängsel zum Brand-Moment.
- **Wie:** 12–15 vw, tracking −0.02em, `mask-image: linear-gradient(to bottom, black 40%, transparent)`.

### Grain auf Gradients
- **Was:** 4–6 % Noise-Overlay auf jedem größeren Gradient/3D-Fläche.
- **Wann:** Immer bei Gradients — tötet den "AI-Gradient-Look" und Band-Artefakte. Nicht auf kleinen Flächen (unsichtbar).
- **Wie:** SVG-Turbulence-Noise oder PNG-Overlay, `opacity: .04–.06`, `mix-blend-mode: overlay`.

### Oldstyle-/Spiel-Ziffern
- **Was:** Editorial-Eigenheiten wie "8o%" (lowercase-o-Substitution), gestaffelte Dezimalstellen, "9:41"-Statusbar.
- **Wann:** Brands mit Typo-Anspruch; als auffälliges Detail in Hero-Claims.
- **Wie:** Font-Features (`font-feature-settings: "onum"`) oder bewusste Zeichen-Substitution; sparsam.

### Floating-UI über Fotos (organisch)
- **Was:** 1–3 scharfe Mini-Cards (Stat, Notification, Tabelle) schweben versetzt über Fotos — nicht zentriert, sondern "wie zufällig" verteilt; brechen über Kanten.
- **Wann:** Heros und Feature-Sektionen mit menschlicher Komponente; Produktbeweis als Overlay.
- **Wie:** radius 12–16 px, Shadow `0 12px 40px rgba(0,0,0,.12)` oder Glass; Inhalt spezifisch (Telefonnummern mit "…", "2m 14s", Timestamps "1s ago"); genau 1 Kennzahl pro Card, Zahl ~40–48 px.

### Annotation-Layer (Handschrift)
- **Was:** Kursive FG@50–60 % + 1px Pfeillinien mit Node-Dots über Fotos ("YOU", "GENERIC GTM", "AI SLOP").
- **Wann:** Challenger-/Agentur-Brands; verwandelt Stock/AI-Bild in "Briefing-Dokument".
- **Wie:** Max. 3–4 Annotationen pro Visual, ~20 px Handschrift, Pfeile dünn mit Endpunkt-Dots.

### Tick-Mark-Band / Lineal-Ornament
- **Was:** Volle Breite feine vertikale Striche wie ein Lineal, als Sektions-Fuß oder Nav-Trenner.
- **Wann:** Technische/Editorial-Brands; wiederkehrendes Ordnungs-Ornament.
- **Wie:** Repeating-Gradient 1px-Striche, abgestufte Höhen, opacity ~8–15 %.

### Sheet-on-Background
- **Was:** Page/Sektion als Card (radius 20–32 px) auf Markenfarbe, Textur oder sogar Ölgemälde-BG.
- **Wann:** Hero-Rahmung, Footer (schwarze Inset-Card auf Farb-BG), Widget-Showcases.
- **Wie:** Outer-BG vollflächig, Sheet mit Inset 12–80 px; Oben-only-Radius wenn Sheet bis zur Viewport-Kante läuft; 2px-Border-Variante statt Shadow.

### Peek-Karussell ohne Chrome
- **Was:** Angeschnittene Nachbar-Cards (12–20 % sichtbar) ersetzen Pfeile/Dots; Inhalt ist die Affordance.
- **Wann:** Feature-Reihen, Testimonials, Video-Galerien.
- **Wie:** Aktive Card 60–65 % Breite, Seiten-Cards opacity ~40 % (bzw. schwarzes Overlay ~70 % bei Foto-Cards), Gap 20–24 px; nie Peek UND Pfeile voll ausspielen.

### Split-Header / Versetzte Intro-Zeile
- **Was:** H2 links + Erklärtext rechts auf gleicher Grundlinie (oder CTA-Paar rechts oben).
- **Wann:** Feature-Sektionen ab 2-spaltigem Grid; spart vertikalen Raum, wirkt redaktionell.
- **Wie:** H2 max. 20 Wörter ~5 Cols, Sub max. 30 Wörter ~4 Cols, beide baseline-aligned.

### Accent-Bar statt Quote-Grafik
- **Was:** 2 px Akzent-Strich links neben Zitat/Step-Titel statt Anführungszeichen-Illustration.
- **Wann:** Testimonials, Step-Listen (Definition-List-Marker als Nummern-Alternative).
- **Wie:** 2 px breit, volle Zeilenhöhe, Akzentfarbe oder `#111`.

### Modell-/Code-Details als Produkt-Story
- **Was:** Tooltip-Pill mit echtem Modellnamen ("anthropic/claude-3-5-sonnet"), API-Endpunkte mit Produkt-Namen, Install-Chip "$ npm i -g @scope/cli" als zweiter CTA.
- **Wann:** Dev-Tools, AI-Produkte — erzählt Multi-Model/technische Tiefe ohne Text.
- **Wie:** Mono 13–14 px, Chip bg `#F0F0EE` radius 8 px (light); Code-Card mit OS-Chrome (3 Punkte, radius 10 px), dezente Syntaxfarben.

### Live-Clock & Plattform-Chrome
- **Was:** Echte Uhrzeit mit Sekunden ("14:36:29 PM MAR 27, 2024"), Story-Progress-Bars, "Coach 2s"-Timestamp.
- **Wann:** Lab-/Tech-Brands, Social-Formate; Authentizitäts-Detail.
- **Wie:** Mono uppercase 13 px; Plattform-Konventionen (Progress 2–3 px radius 999, aktiv voll/inaktiv 30 %) exakt nachbauen.

### Licht-Reflex auf Farb-Cards
- **Was:** Diagonaler hellerer Farbkeil als festes Grafikelement auf satten Farb-Cards.
- **Wann:** Farbige Content-Cards (Order-Cards, Event-Cards) — macht Fläche plastisch ohne Shadow.
- **Wie:** Clip-Path-Dreieck, weiß ~8–12 % Alpha, diagonal von oben links; konsistent wiederholen.

### Serif-vs-Sans als Bedeutungs-Kodex
- **Was:** Zitat/Stimme = Serif, Struktur/H2 = Sans — im selben Screen als bewusster Kontrast.
- **Wann:** Testimonials (Serif-Quote vs. Sans-Headline), Premium-Enterprise-Heros (Didone ~72–80 px).
- **Wie:** Rollen vor dem Bau festlegen; nie innerhalb einer Ebene mischen.

---

## 4. Anti-Slop-Kern (was diese UIs von generischem AI-Output unterscheidet)

Checkliste gegen jedes fertige Design. Jedes Nein ist ein konkreter Fix.

1. **Genau 1 Akzent** mit ≤ 5–10 % Flächenanteil, nur auf CTA/States/Key-Numbers — nicht auf
   jedem Icon-Tile und jeder Headline-Zeile. (Slop: Akzent überall.)
2. **Headlines regular/medium**, Kontrast über Größe + Opacity. (Slop: alles bold.)
3. **Neutrale getönt** — kein #FFFFFF-BG, kein #000000-Dark, keine sterilen CSS-Gradients ohne
   Grain. (Slop: Default-Weiß, glatte Mesh-Gradients.)
4. **Spezifische Daten** statt Platzhalter: "$100k for $279", "2m 14s", "Signed by founder",
   Case-IDs, echte Timestamps. (Slop: loremartige Perfekt-UI.)
5. **Eigenes Form-Vokabular**, über Sektionen wiederholt (Maske, Band, eckige Buttons,
   Punkt-Headlines). (Slop: Tailwind-Template-Look, jede Sektion neue Deko.)
6. **Asymmetrie & Bleed:** Cards laufen an Ränder, Objekte überlappen Spalten, Karussells
   schneiden an. (Slop: alles zentriert in gleichmäßigen 12-Col-Boxen.)
7. **Bearbeitete Bildwelten:** Duotone, Grading, Blur, Grain, Masken — nie Stock-raw neben
   perfekter UI. (Slop: unbehandelte Fotos/3D-Renders.)
8. **Zustände ohne neue Farben** (Opacity, Form, Textur, Invertierung) und Status-Pills als
   Tints, nie solid-bunt. (Slop: neue Farbe pro State.)
9. **Sichtbare Ordnungssysteme:** Hairlines, Nummerierungen, Raster-Linien, Mono-Metadaten.
   (Slop: Karten im Leeren.)
10. **Negativraum + Ausschnitt:** 30–50 % Leere, 1 Overlap-Bruch pro Sektion, angeschnittene
    Wordmarks/Peek-Cards. (Slop: jeder Pixel gefüllt, alles vollständig im Frame.)

Negativ belegt (fehlt in allen 66 Referenz-Screens): Icon-Kachel-Feature-Grids · Gradient-Text
in Headlines · Reinweiß/Reinschwarz · mehrere rollenlose Akzente · gleiche Visual-Typen im
Feature-Grid · Charts mit Achsenlinien + Grid · nackte Screenshots auf Weiß · Deko-Illustrationen ·
gemischte CTA-Schulen · Glassmorphism als Default-Card-Look.

---

## 5. Verweise

- `ui-inspo-bildanalysen.md` — die 66 Einzelbefunde im Detail (Werte-Herkunft, Projekt-Kontext).
- `design-doktrin.md` — die verbindlichen Regeln/Prinzipien, denen diese Werte dienen.
- `komponenten-ideation.md` — Auswahl und Kombination von Komponenten; hier kommen die Werte rein.
- `effekte.md` — Motion-/Effekt-Rezepte (Grain, Glass, Reveals), die zu diesen Moves passen.
- `impeccable-regelwerk.md` — das volle Qualitäts-Regelwerk (Detector-Regeln, Craft Floor).
- `motion.md` — Animation/Timing; wie diese Interfaces in Bewegung bleiben ohne Slop.
