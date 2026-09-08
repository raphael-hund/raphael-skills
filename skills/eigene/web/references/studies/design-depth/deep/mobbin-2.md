# Analyse mobbin-2 (platform-images): 8 Mobbin-Screens, Bauplan in HTML/CSS/SVG

Stand: 07.09.2026. Quelle: `research/mobbin/images/*.jpg` (768-px-Vorschauen) plus `research/mobbin/REPORT.md`.
Alle Pixelwerte sind Schätzungen im 768-px-Bild, skaliert auf ein typisches 1440-px-Desktop-Layout (Faktor ~1,9). Hex-Werte sind Sichtbefunde, keine Tokens.
Die dunkle Leiste „curated by Mobbin“ am unteren Rand jedes Bildes ist Quellenrahmen, nie Teil des Designs.

Body-Bezug: Ich setze den Fließtext der jeweiligen Seite als 1× (Body ≈ 14–16 px CSS). Alle Größenverhältnisse beziehen sich darauf.

---

## 1. Zoom Booking — Bestätigung (`624b905e-243d-4a66-b6b4-9f4da81fd1b0.jpg`)

### Header (oben links, 0–30 px)
- Geometrie: Nur Wortmarke „zoom“, ca. 40 px breit im Bild, links bündig bei 18 px Rand. Kein Nav, keine Border unter dem Header. Header-Höhe ~30 px Bild (~56 px CSS).
- Material: Page #FFFFFF. Wortmarke Zoom-Blau ~#0B5CFF. Kein Schatten, keine Linie.
- Bau: `<header><a class="logo"><svg/></a></header>`, `padding: 16px 20px`. Kein Border-Bottom.

### Back-Link (Bild oben mittig-links, y≈48 px)
- Geometrie: Pille/Rechteck ~44×16 px Bild, Radius ~3 px, Pfeil-Icon + „Back“. Linksbündig mit dem Inhaltscontainer (x≈258 px), nicht mit der Seite.
- Material: Surface #F1F2F4 (Hellgrau), Text Ink #232333. Kein Border.
- Typo: ~0,85× Body, Regular.
- Bau: `<a class="btn-ghost"><svg arrow/> Back</a>` mit `background:#f1f2f4; border-radius:4px; padding:4px 10px; font-size:.875rem`.

### Erfolgs-Illustration (Bild Mitte, y≈75–110 px)
- Geometrie: Kalender-Icon ~44 px mit grünem Haken-Badge oben rechts (~18 px Kreis). Zentriert.
- Material: Illustration in Zoom-Blau-Tönen (#0B5CFF, #BFD4FF), Haken-Kreis Success ~#22C55E mit weißem Haken, weißer Ring ~2 px.
- Bau: Ein SVG-Symbol, 48×48, `margin-inline:auto`. Success-Badge als zweites `<circle>` + `<path>` im gleichen SVG.

### Headline „Confirmed“ + Subline (y≈115–135 px)
- Typo: Headline ~1,4× Body, Bold, Sans, Ink #1C1C28, tracking normal. Subline 0,8× Body, Regular, Muted #4B4B5C; Name „Sam Lee“ Bold als Inline-Hervorhebung.
- Abstand Illustration→Headline ~8 px Bild, Headline→Subline ~4 px. Alles zentriert.
- Bau: `<h1>Confirmed</h1><p>You are booked with <strong>Sam Lee</strong></p>`, `text-align:center`.

### Trennlinie + Detailblock (y≈145–210 px)
- Geometrie: Container ~240 px Bild breit (~460 px CSS), `max-width` sichtbar an Linienlänge. 1-px-Border oben (#E4E4E7). Detailzeilen: Titel Bold „Mentoring Session (Abigail Smith)“, dann 3 Zeilen mit 12-px-Outline-Icon links (Kalender, Globus, Pin) und Text; Zeilenabstand ~15 px Bild (~1,9× Body Line-Box).
- Typo: Titel 0,9× Body Bold; Zeilen 0,8× Body Regular Ink. Linksbündig innerhalb eines zentrierten Blocks.
- Material: Icons Muted #6B6B7B, 1,5-px-Strichstärke.
- Bau: `<section class="summary"><h2/><ul><li><svg/>Friday…</li>…</ul></section>` mit `border-top:1px solid #e4e4e7; padding-top:16px`. Icon via `display:flex; gap:8px; align-items:flex-start`.

### Aktionspaar Reschedule / Cancel (y≈232–246 px)
- Geometrie: Zwei gleich breite Outline-Buttons (je ~120 px Bild), Gap ~10 px, Höhe ~16 px Bild (~32 px CSS), Radius ~3 px, Border 1 px #D4D4DB. Icon links im Button (Kalender-Reset, X). Buttons füllen die Containerbreite (`flex:1`).
- Material: Fill transparent/weiß, Text Ink. Kein Schatten.
- Typo: 0,8× Body, Regular.
- Bau: `<div class="actions"><button class="btn-outline"><svg/>Reschedule</button><button class="btn-outline"><svg/>Cancel</button></div>` mit `display:grid; grid-template-columns:1fr 1fr; gap:12px`.
- Funktion: Beide Korrekturwege gleichrangig, kein destruktives Rot. Fehler: Cancel bekommt keinerlei Warnfarbe; für einen destruktiven Weg wäre ein leichter Danger-Hint sinnvoll.

### Sekundär-Link „Schedule another event“ (y≈267 px)
- Icon + Link in Action-Blau #0B5CFF, 0,8× Body, zentriert, ~20 px Abstand zum Buttonpaar. Bau: `<a class="link"><svg/>…</a>`.

### Footer (y≈295–312 px)
- Winzige Zeile „zoom Scheduler · Learn More · Buy Now“ (0,65× Body) und reCAPTCHA-Hinweis (0,6× Body, Muted #8E8EA0, Links unterstrichen). Zentriert. Kein Border, kein Hintergrund.
- Bau: `<footer><p class="fine">…</p></footer>`, `font-size:.65rem; color:#8e8ea0`.

### Warum es funktioniert / Slop
- Vertikaler Rhythmus: Icon → H1 → Subline → Divider → Details → Actions → Link → Fine print. Jede Stufe kleiner. Eine Spalte, ~460 px, alles zentriert, Details aber linksbündig (gute Lesbarkeit).
- Farblogik: nur Blau (Marke+Aktion), Grün (Success), Grau-Stufen. Kein Dekor.
- Slop-Risiko: Der Meeting-Link ist abgeschnitten („…pwd=W9HVIFI69f…“). Nachbau braucht `overflow-wrap:anywhere` oder ein Copy-Button.

---

## 2. Square — Hero „Helping every size of business succeed“ (`68afe8ce-0f12-481e-abef-63aa28f25d80.jpg`)

### Doppel-Header (y≈0–70 px Bild)
- Zeile 1 (y≈0–35): Logo-Quadrat 16 px links, dann Nav-Items „Business types · Products · Hardware · Pricing · What's new“ (0,85× Body, Medium, Weiß #FFFFFF, Gap ~10 px Bild ≈ 20 px CSS). Rechts „Sign in · Support“ + Cart-Icon.
- Zeile 2 (y≈40–70): Links Kontexttitel „Square“ (0,85× Body). Rechts zwei Pillen: „Get started“ Outline (1 px Weiß, transparent) und „Contact sales“ gefüllt Weiß mit schwarzem Text. Pillen-Höhe ~28 px Bild (~48 px CSS?), eher 40 px CSS; Radius voll (999 px); Padding horizontal ~1,2× Höhe.
- Material: Page #000000 (echtes Schwarz), Text Weiß. Keine Linien zwischen den Headerzeilen.
- Bau: `<header><nav class="global">…</nav><nav class="context">…</nav></header>`; beide `display:flex; justify-content:space-between; align-items:center; padding:12px 20px`. Pillen: `border-radius:999px; padding:10px 20px; border:1px solid #fff` bzw. `background:#fff; color:#000`.

### Foto-Cutouts (5 Stück, um den Text herum)
- Positionen (Bild): oben links 0–160 × 70–305 (angeschnitten links, Radius nur rechts ~10 px); oben Mitte 343–527 × 70–190 (Radius ~10 px, alle Ecken); rechts 605–768 × 100–380 (angeschnitten rechts, Radius links ~10 px); unten Mitte-links 120–383 × 395–480 (angeschnitten unten); unten rechts 465–648 × 430–480 (angeschnitten unten).
- Material: Fotos farbig, warm, natürliches Licht, Personen bei der Arbeit + Terminal-Screen. Keine Overlays, kein Grain, kein Gradient über den Fotos.
- Grid-Ableitung: 12-Spalten-Grid, Bilder besetzen Spalten 1–3 / 6–8 / 10–12 (Reihe 1) und 2–6 / 8–10 (Reihe 3); Text in Reihe 2, Spalten 4–9. Bilder haben unterschiedliche Aspect-Ratios (3:4, 3:2, 4:7, 3:1, 3:1).
- Bau: `section.hero{display:grid; grid-template-columns:repeat(12,1fr); grid-auto-rows:minmax(120px,auto); gap:24px}`; `img{width:100%; height:100%; object-fit:cover; border-radius:16px}`; angeschnittene Bilder mit negativem Margin oder `grid-column:1/4` bei `overflow:hidden` am Hero. Hero-Höhe ≈ 100 vh.

### Eyebrow + Headline (y≈215–305 px, zentriert)
- Eyebrow „WHY SQUARE?“: Versalien, 0,65× Body, Tracking ~+0,15 em, Weiß, ~30 px Abstand zur Headline.
- Headline: 2 Zeilen, ~2,6× Body je Zeile im Bild (≈ 56–64 px CSS), Weight Regular/Medium (nicht Bold), Tracking leicht negativ (~-0,01 em), Line-height ~1,1. Farbe einheitlich Weiß, keine Abstufung.
- Bau: `<p class="eyebrow">Why Square?</p><h1>Helping every size of<br>business succeed.</h1>` mit `h1{font-size:clamp(2.25rem,5vw,4rem); font-weight:500; letter-spacing:-.01em; line-height:1.1; max-inline-size:14ch; margin-inline:auto}`.

### CTA-Paar (y≈325–350 px)
- „Get started“ gefüllt Action-Blau ~#0057FF, Weiß Text; „Contact sales“ Outline 1 px Blau, Text Blau, transparent. Radius ~4 px (eckig, nicht Pille — bewusster Kontrast zu den weißen Header-Pillen). Höhe ~24 px Bild (~44 px CSS), Padding horizontal ~16 px CSS, Gap ~12 px.
- Typo: 0,8× Body, Medium.
- Bau: `.btn-primary{background:#0057ff; color:#fff; border-radius:4px; padding:12px 20px}` `.btn-secondary{border:1px solid #0057ff; color:#0057ff}`.

### Warum / Slop
- Hierarchie: Schwarz als Page schluckt alles außer Fotos und Weiß; Blau nur für Handlung. Fotos rahmen, überdecken nicht.
- Rhythmus: Große Leerräume (~60 px Bild) zwischen Fotos und Text.
- Slop-Risiko: Zwei Header-Reihen mit vier CTAs (Get started ×2, Contact sales ×2) sind redundant. Blaue Pillen vs. eckige Buttons sind zwei Formfamilien.

---

## 3. Apollo Booking — „Booking complete!“ (`6f5acb59-8765-4e76-8b64-f53f7f48ac18.jpg`)

### Header
- Nur Wortmarke „Apollo.io“ zentriert, y≈45 px, ~45 px breit, Ink #1C1C1C. Kein Nav.
- Page-Hintergrund: Sehr helles Grau ~#F5F5F5 (nicht Weiß).

### Karte (x≈245–525, y≈75–450 px Bild → ~530 px CSS breit)
- Geometrie: Weiße Surface #FFFFFF, Radius ~2–4 px (fast eckig), Border 1 px #E5E5E5 oder sehr weicher Schatten (kaum sichtbar). Innenpadding ~30 px Bild (~56 px CSS) horizontal.
- Konfetti-Zone (y≈80–170): Bunte kleine Rechtecke (Rot #E5484D, Gelb #F5C518, Blau #3B82F6, Grün #22C55E, Orange), rotiert, ~4×8 px Bild, ~30 Stück, verteilt in der oberen Hälfte der Karte.
- Bau: Konfetti als SVG-Gruppe `<g>` mit `<rect>` + `transform="rotate()"`, absolut positioniert, `pointer-events:none`; bei `prefers-reduced-motion` statisch. Kein Canvas nötig.

### Erfolgs-Kreis (y≈105–160, zentriert)
- Kreis ~56 px Bild (~100 px CSS), Fill Success-Türkis ~#1DBF9B, weißer Haken, Strichstärke ~10 px CSS. Kein Ring, kein Schatten.
- Bau: `<div class="success"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="#fff" stroke-width="3" fill="none"/></svg></div>` mit `width:96px; aspect-ratio:1; border-radius:50%; background:#1dbf9b; display:grid; place-items:center`.

### Headline + Subline (y≈185–215)
- „Booking complete!“ ~1,5× Body, Bold, Ink #1C1C1C, zentriert. Subline 0,8× Body, Muted #4B5563, zwei Zeilen; E-Mail als Link Action-Blau #2563EB.
- Bau: `<h1/><p>… <a href="mailto:">…</a></p>`.

### Detail-Karte innerhalb der Karte (x≈275–493, y≈235–380)
- Geometrie: Nested Surface, Border 1 px #E5E7EB, Radius ~4 px, Padding ~12 px Bild (~22 px CSS). Titel „30 minute meeting“ 0,95× Body Bold. Vier Zeilen mit 12-px-Outline-Icons (Uhr, Pin, Kalender, Globus), Text 0,75× Body, Zeilenhöhe ~1,6.
- Footer-Zeile der Detail-Karte: Border-Top 1 px, hellgrauer Fill #F9FAFB, zentrierter Link „Reschedule“ Blau 0,75× Body.
- Bau: `<article class="card-inner"><h2/><dl>…</dl><footer><a>Reschedule</a></footer></article>`, `dl` als Icon-Zeilen via `display:grid; grid-template-columns:16px 1fr; gap:8px 10px`.

### Hilfe-Banner (x≈245–525, y≈400–450) — volle Kartenbreite, unten bündig
- Material: Dunkelnavy #0F1B3D (Help-Rolle), Text Weiß 0,7× Body, „Note:“ Bold. Icon links: Kalender mit rotem Badge (~24 px). Rechts gelber Button „Learn more“ ~#F5C518, Text Ink, Radius ~3 px, Höhe ~16 px Bild.
- Bau: `<aside class="notice"><svg/><p><strong>Note:</strong> …</p><a class="btn-accent">Learn more</a></aside>` mit `display:flex; gap:12px; align-items:center; background:#0f1b3d; color:#fff; padding:16px 20px`.
- Funktion: Tonwertsprung Weiß→Navy zieht das Auge auf die Fehlerprävention. Gelb ist Apollo-Marke; funktioniert hier als „Achtung/Hilfe“.

### Fußzeile unter der Karte (y≈465)
- „Sign Up now to create your own booking link with Apollo.io“, 0,7× Body, Links Blau. Zentriert.

### Warum / Slop
- Drei Surface-Stufen (Page Grau → Karte Weiß → Innenkarte mit Border) erzeugen Tiefe ohne Schatten.
- Slop: Konfetti ist Dekor; ohne Reduced-Motion-Regel und ohne echten Backend-Erfolg ist es Lüge. Der Kartenrand ist fast unsichtbar (Kontrast Grau/Weiß minimal), auf schlechten Displays verschwindet die Karte.

---

## 4. Jasper — Customer Stories Bento (`71f4d377-4e1c-4f04-9adf-23dae73c4794.jpg`)

### Kopf (y≈20–155, zentriert)
- Eyebrow „Customer Stories“: 0,65× Body, Sans, gelbe Hinterlegung #FDF3B4 als Highlight-Marker hinter dem Text (kein Badge mit Radius, eher `background` mit `padding:2px 6px`), Textfarbe Navy.
- Headline: 2 Zeilen, Serif (Display-Serif mit hohem Kontrast), ~3× Body (~52 px CSS), Weight Regular, Navy #0B1B3F, Line-height ~1,05, Tracking leicht negativ. Keine Farbabstufung.
- CTA „Explore Customer Stories“: Rechteck, Radius 0–2 px (kantig), Fill Navy #0B1B3F, Text Weiß 0,75× Body, Höhe ~22 px Bild (~40 px CSS), Padding horizontal ~14 px Bild.
- Bau: `<p class="eyebrow"><mark>Customer Stories</mark></p><h2 class="serif">…</h2><a class="btn-dark">…</a>`; `mark{background:#fdf3b4; color:inherit}`.

### Grid (x≈40–722, y≈178–615)
- 3 Reihen, Fugen ~10 px Bild (~18 px CSS). Spaltenraster: 4 Spalten à ~165 px Bild; Zeile 1: [1][1][2]; Zeile 2: [2][1][1]; Zeile 3: [1][1][2]. Kachelhöhe ~135 px Bild (~250 px CSS), quadratisch-nah.
- Kacheln sind kantig (Radius 0), kein Border, kein Schatten. Pastellflächen: Grün #DDF3D9, Blau #D6E6F7, Rosa #FBE0EE, Gelb #FBF1B8. Portraitkacheln: Weiß/Hellgrau #F3F4F6 Surface mit Foto links (~135×135 Bild, S/W oder stark entsättigt), Zitat rechts.
- Metrik-Kachel Inhalt: oben Zahl in Serif ~1,6× Body („10,000+“, „60%“, „3x“) oder Serif-Wort („Compliant,“, „Time-to-market“), darunter Label 0,7× Body Sans; unten links Logo (S/W, ~1× Body hoch); unten rechts optional Pfeil „→“.
- Trennlinie: Unter der Zahl eine 1-px-Linie in Kachelfarbe-dunkler (bei Cushman & Wakefield sichtbar), nicht überall.
- Portrait-Kachel Inhalt: Foto mit zwei überlagerten Labels unten links: Name auf Weiß #FFFFFF (Ink Text) und Rolle auf Navy #0B1B3F (Weiß Text), beide 0,6× Body, kantig, gestapelt mit ~2 px Versatz. Zitat 0,75× Body Sans Ink, Logo unten rechts.
- Bau:
  ```html
  <section class="bento">
    <article class="tile tile--green"><p class="num">10,000+</p><p class="label">hours saved annually</p><footer><svg logo/><span>→</span></footer></article>
    <article class="tile tile--quote"><figure><img/><figcaption><span class="name">Peter So</span><span class="role">VP of Digital Innovation</span></figcaption></figure><blockquote>…</blockquote><svg logo/></article>
  </section>
  ```
  `.bento{display:grid; grid-template-columns:repeat(4,1fr); gap:18px}` `.tile--quote{grid-column:span 2; display:grid; grid-template-columns:1fr 1fr}` `.tile{padding:20px; display:flex; flex-direction:column}` `.tile footer{margin-top:auto}`; Portrait via `filter:grayscale(1)`.
- Warum: Serif-Zahlen als Display, Sans für Labels — zwei Rollen, zwei Schriften. Pastell trägt Rhythmus, keine Bedeutung. S/W-Portraits verhindern Farbstreit mit den Pastellflächen.
- Slop: Pastell ohne Semantik (Grün ≠ gut, Rosa ≠ schlecht). Wer das kopiert, braucht eine Regel: Farbe rotiert nach Position, nicht nach Inhalt.

---

## 5. Zoom Booking — Wochenansicht Slots (`781e68e0-5472-43fa-b207-96b1fec8e13a.jpg`)

### Layout
- Zwei Spalten: linke Sidebar ~200 px Bild (~26 %), rechte Fläche Rest. Trenner: 1-px-Linie #E5E7EB vertikal (x≈203). Header oben mit Wortmarke, keine Linie.
- Page Weiß.

### Sidebar (x≈20–185)
- Avatar 16 px Kreis + „Sam Lee“ 0,8× Body. Titel „Mentoring Session“ 1,1× Body Bold. Meta-Zeile mit drei Icon-Text-Paaren (One to one, 30 mins, Zoom Meeting) 0,7× Body Muted, Gap ~8 px. Beschreibung 0,7× Body. Border-Bottom 1 px, dann Monatskalender.
- Mini-Kalender: Header „December 2024“ Bold 0,85×, rechts Pille „Today“ (Outline 1 px, Radius 999, 0,65× Body) plus zwei Chevron-Buttons. Wochentagsköpfe S M T W T F S 0,7× Muted. Tage 7 Spalten × 5 Reihen, Zellen ~24 px Bild; vergangene Tage Muted #C4C4CC; verfügbare Tage Bold Blau #0B5CFF; ausgewählter Tag 12: Kreis Fill Blau, Weiß Text, kleiner Punkt darunter (Indikator).
- Bau: `<table class="cal"><thead/><tbody>…<td><button aria-pressed="true">12</button></td></tbody></table>`; `button[aria-pressed=true]{background:#0b5cff; color:#fff; border-radius:50%}`; Punkt via `::after{width:4px;height:4px;border-radius:50%;background:#0b5cff}`.
- Sidebar-Fuß: Scheduler-Fine-Print 0,6× Body, unten links.

### Rechte Fläche
- Kopfzeile (y≈45): Globus-Icon + „(GMT-08:00) Pacific Time - Los Angeles“ + Chevron (Select), 0,75× Body. Rechts „24 hr“ Toggle: Pill ~24×12 px, Off-Zustand Grau #9CA3AF, Knob Weiß.
- Tages-Header (y≈70–95): 5 Spalten (Thursday 12 … Monday 16), Wochentag 0,7× Body Muted, Zahl 0,9× Body; aktiver Tag 12: Zahl auf Blau-Kreis mit Punkt darunter. Links/rechts Chevron-Buttons (Kreis ~14 px, Border 1 px, Muted) für Wochenwechsel.
- Slot-Spalten: Buttons ~85×16 px Bild (~150×32 px CSS), Border 1 px Blau #0B5CFF, Text Blau 0,7× Body, Radius ~3 px, Gap vertikal ~4 px Bild (~8 px CSS), horizontal Spaltenabstand ~15 px Bild. Hover/aktiv (Friday 6:30 AM): Fill Grau #D1D5DB, Text Ink (sieht nach Hover aus, nicht nach Selected — unklar, markiert unter „unlesbar“).
- „No availability“: 0,65× Body Muted zentriert in leerer Spalte.
- Bau: `<div class="week" style="display:grid; grid-template-columns:repeat(5,1fr); gap:24px"><div class="day"><h3/><ul><li><button class="slot">6:00 AM</button></li>…</ul></div>…</div>`; `.slot{width:100%; border:1px solid #0b5cff; color:#0b5cff; border-radius:4px; padding:6px; background:#fff}` `.slot:hover{background:#e5e7eb; color:#111}`.
- Warum: Outline-Buttons in Aktionsfarbe = „wählbar“, Fill = „gewählt/aktiv“. Alles auf 1-px-Linien, kein Schatten. Vergleich über 5 Tage auf einen Blick.
- Slop: 16 Buttons je Spalte × 3 Spalten = 48 gleichwertige Blau-Outlines; auf Mobile nicht tragbar. Der Hover-Grau bricht die Blau-Logik (Grau = deaktiviert in vielen Systemen).

---

## 6. Zoom Booking — Formular (`82c8b5bc-eaab-4000-bca0-511c2220e53d.jpg`)

### Container
- Zentrierte Spalte ~255 px Bild (~480 px CSS), linksbündiger Inhalt. Page Weiß. Header nur Wortmarke.

### Zusammenfassung oben (y≈40–130)
- „Mentoring Session“ 0,9× Body Bold; Avatar 12 px + „Sam Lee“ 0,75×. Border-Bottom 1 px #E5E7EB. Drei Icon-Zeilen (Kalender, Globus, Video) 0,75× Ink, Zeilenabstand ~15 px Bild. Border-Bottom 1 px.
- Bau: `<section class="summary">…</section>` mit `border-block:1px solid #e5e7eb; padding-block:12px`.

### Formular (y≈155–360)
- Abschnittstitel „Enter Your Information“ 0,85× Bold + Info-Icon (Kreis „i“, 12 px, Muted).
- Labels: persistent oberhalb, 0,7× Body, Ink, Pflichtstern „*“ direkt nach dem Label (kein Rot). Abstand Label→Input ~4 px Bild.
- Inputs: volle Breite, Höhe ~18 px Bild (~36 px CSS), Border 1 px #C7C7CF, Radius ~4 px, Weiß. Fokus (First Name): 2-px-Ring Blau #0B5CFF, Caret sichtbar. Abstand zwischen Feldern ~20 px Bild (~1,3× Feldhöhe).
- Link „Add Attendees“ mit Icon, Blau, 0,7×, zwischen E-Mail und Textarea.
- Textarea: Höhe ~35 px Bild (~72 px CSS), Placeholder „Enter your answer here…“ Muted #9CA3AF, Resize-Griff unten rechts sichtbar.
- Bau: `<label for="fn">First Name <span aria-hidden>*</span></label><input id="fn" required>` mit `input{border:1px solid #c7c7cf; border-radius:4px; padding:8px 10px}` `input:focus-visible{outline:2px solid #0b5cff; outline-offset:0}`.

### Aktionen (y≈393–408, rechtsbündig)
- „Back“ Outline/Hellgrau Fill #F3F4F6, Text Ink; „Book“ Fill Grau #E5E7EB, Text Muted (disabled). Beide ~35×16 px Bild, Radius ~3 px, Gap ~8 px. Rechtsbündig am Container.
- Bau: `<div class="actions" style="display:flex; justify-content:flex-end; gap:8px"><button type="button">Back</button><button type="submit" disabled>Book</button></div>`; `button[disabled]{background:#e5e7eb; color:#9ca3af}`; aktiv: `background:#0b5cff; color:#fff` (aus REPORT Screen 3 belegt).
- Warum: Kontext oben, Eingabe Mitte, Handlung unten rechts — Leserichtung. Persistente Labels + Fokusring = zugänglich.
- Slop: Disabled-Submit ohne Erklärung frustriert; besser aktiv lassen und validieren. Textarea-Frage als Label ist lang („Please share anything…“); OK, aber nicht als Placeholder wiederholen.

---

## 7. Amplemarket — Customers Proof Grid (`887f98cc-5dbf-4655-860e-bdd5faaeee19.jpg`)

### Header (y≈8–33)
- Logo links (Wortmarke mit Icon, Ink). Nav mittig: „Product ▾ · Why us ▾ · Customers · Pricing“ 0,75× Body, Regular, Gap ~20 px Bild. Rechts „Open app“ Outline (1 px #D4D4D8, Weiß Fill, Radius ~4 px) und „Get free trial“ Fill Schwarz #111111, Weiß Text, Radius ~4 px; Höhe ~20 px Bild (~36 px CSS).
- Page: Offwhite #F7F7F5 (warmes Grau, nicht Weiß).
- Bau: `header{display:grid; grid-template-columns:1fr auto 1fr; align-items:center; padding:12px 48px}`.

### Kopf (y≈80–150, zentriert)
- Eyebrow „CUSTOMERS“ Versalien 0,6× Body, Tracking +0,1 em, Muted #6B7280.
- Headline 2 Zeilen ~2,4× Body (~44 px CSS), Sans, Weight Regular (Light-ish), Ink #111, Line-height 1,1, Tracking -0,02 em. Keine Farbabstufung.
- Abstand Headline→Grid ~50 px Bild (~90 px CSS).

### Große Karten (2 Stück, x≈103–378 und 388–663, y≈205–358)
- Geometrie: Je ~275×153 px Bild (~520×290 px CSS), Radius ~10 px Bild (~16 px CSS), Border 1 px #E5E7EB? (eher kein Border, Fläche selbst grenzt). Padding ~14 px Bild (~24 px CSS). Gap zwischen Karten ~10 px Bild (~18 px CSS).
- Material Karte 1: Verlauf Mint #C9F5E6 (oben links) → Lindgrün #DDF7B0 (unten rechts), sehr weich, plus leichter Grain sichtbar? (nicht sicher, siehe unlesbar). Karte 2: Verlauf Gelb #FBF3B4 (oben links) → Grün #C8F0C0 (unten rechts) → Hellblau-Hauch rechts unten.
- Inhalt: Headline-Satz 0,9× Body, Regular, Ink, mit Bold auf Kundennamen; Logo oben rechts auf weißer Pille (Radius ~6 px, Padding 4×8 px, Weiß #FFF). Unten zwei Metrik-Panels nebeneinander: halbtransparentes Weiß `rgba(255,255,255,.45)`, Radius ~6 px, Padding ~10 px; Zahl „150+“ 1,1× Body Regular; Label 0,65× Muted unten (Panel-Höhe ~60 px Bild, Label am Boden → `justify-content:space-between`).
- Bau:
  ```html
  <article class="case case--mint"><header><h3>How <b>DataStax</b> created …</h3><span class="logo-pill"><svg/></span></header>
  <dl class="metrics"><div><dt>enterprise opps added</dt><dd>150+</dd></div><div>…</div></dl></article>
  ```
  `.case{border-radius:16px; padding:24px; background:linear-gradient(135deg,#c9f5e6,#ddf7b0)}` `.metrics{display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:auto}` `.metrics>div{background:rgba(255,255,255,.45); border-radius:8px; padding:12px; min-height:110px; display:flex; flex-direction:column; justify-content:space-between}`; Reihenfolge dd vor dt via `display:contents`+`order` oder dd zuerst im Markup.

### Kleine Kacheln (4 Stück, y≈372–450, je ~132×80 px Bild)
- Farben: Rosa #FBD9E6 (wasabi), Offwhite #F1F1EE (ceros), Lavendel #DCD6FA (Vanta), Offwhite (momentum). Radius ~8 px Bild, Padding ~12 px. Logo oben links ~0,9× Body hoch (S/W), Zahl „25%“ 1,1× Body, Label 0,6× Muted. Gap ~10 px.
- Bau: `.mini{display:grid; grid-template-columns:repeat(4,1fr); gap:18px}` `.mini article{border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:20px}`.
- Warum: 2+4-Hierarchie = Story oben, Breite unten. Verlauf nur auf Story-Karten; kleine Kacheln flach — Hierarchie durch Material.
- Slop: Verläufe in Marken-fremden Pastelltönen wirken beliebig; auf Offwhite-Page verlieren die Offwhite-Kacheln (ceros, momentum) fast den Rand. Nachbau braucht mind. 1-px-Border #E5E7EB oder etwas dunklere Surface.

---

## 8. Qatalog — Pricing Pro/Enterprise (`8fb5fbc1-d28e-4109-a136-08a08db99d2f.jpg`)

### Hintergrund
- Page Offwhite #F7F7F7 mit sichtbarem Linienraster: vertikale 1-px-Linien #E8E8E8 bei x≈20, 150, 270, 390, 510, 630, 750 (Bild) → 6 Spalten à ~120 px Bild (~225 px CSS); horizontale Linien bei y≈68, 405, 465. Zusätzlich sehr schwache diagonale/ornamentale Linien hinter dem „Pricing“-Titel (unlesbar, siehe unten).
- Bau: `body{background:#f7f7f7 repeating-linear-gradient(90deg,#e8e8e8 0 1px,transparent 1px 225px)}` plus horizontale Linien als `::before` mit `linear-gradient(#e8e8e8 1px, transparent 1px)` an definierten Sektionsgrenzen — oder Sektionen mit `border-block:1px solid #e8e8e8`.

### Schwebende Navigationspille (x≈197–570, y≈10–45)
- Geometrie: Pille Radius 999, Weiß #FFF, Border 1 px #E5E5E5, Schatten weich `0 4px 16px rgba(0,0,0,.06)`. Höhe ~35 px Bild (~56 px CSS), Breite ~370 px Bild. Innen: Logo links, Nav-Links „Product · Resources · Pricing · Login“ 0,75× Body Ink, Gap ~20 px, rechts CTA-Pille Schwarz „Get started for free ›“ (Radius 999, Höhe ~18 px Bild, Weiß Text 0,7×).
- Sie überlappt den Seitentitel „Pricing“ (~4× Body, Ink, angeschnitten oben) — Sticky-Verhalten wahrscheinlich, nicht belegt.
- Bau: `nav.float{position:sticky; top:12px; margin-inline:auto; width:max-content; border-radius:999px; background:#fff; border:1px solid #e5e5e5; box-shadow:0 4px 16px rgba(0,0,0,.06); padding:8px 8px 8px 20px; display:flex; gap:24px; align-items:center}`.

### Sub-Headline (y≈47) — nur Fragment lesbar: „WITH THE FLEXIBILITY TO SUIT YOUR NEEDS.“ Versalien 0,6× Body, Tracking +0,1 em, Muted.

### Zwei Plankarten (x≈180–380 und 388–588, y≈110–372)
- Geometrie: Je ~200×262 px Bild (~380×500 px CSS), Radius 0 (kantig!), Gap ~8 px Bild (~15 px CSS). Padding ~14 px Bild (~26 px CSS). Beide gleich hoch; CTA am Boden.
- Pro: Fill Dunkel #1F1F1F (Raised-Dark), Text Weiß; Icon-Stern oben links grün #4ADE80 (Outline-Sparkle, 14 px); Badge oben rechts „14 days free trial“ Weiß Fill, Ink Text, Radius ~2 px, 0,55× Body, Padding 2×6 px. Titel „Pro“ 1,4× Body Medium; rechts auf gleicher Zeile Preis „$15/mo per user“ 0,75× Body. Beschreibung 0,75× Muted-on-dark #C4C4C4. „Includes:“ + 6 Bullet-Punkte (echte Disc-Bullets, 0,7× Body, Zeilenabstand ~13 px Bild). CTA „Start your trial“ Fill Blau #1D6FFF, Weiß Text, Radius ~4 px, volle Breite, Höhe ~18 px Bild (~34 px CSS).
- Enterprise: Fill Weiß #FFF, Border 1 px #E5E5E5, Icon-Stern Blau #3B82F6. Titel „Enterprise“ 1,4×. Kein Preis. „Includes Pro, plus:“ + 7 Bullets. CTA „Book a demo“ Fill Schwarz #1A1A1A, Weiß Text, Radius ~4 px, volle Breite.
- Bau:
  ```html
  <section class="plans"><article class="plan plan--dark"><header><svg/><span class="badge">14 days free trial</span></header><h3>Pro <small>$15/mo per user</small></h3><p/><p>Includes:</p><ul>…</ul><a class="btn btn-blue">Start your trial</a></article><article class="plan">…<a class="btn btn-black">Book a demo</a></article></section>
  ```
  `.plans{display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:780px; margin-inline:auto}` `.plan{display:flex; flex-direction:column; padding:28px; border:1px solid #e5e5e5; background:#fff}` `.plan--dark{background:#1f1f1f; color:#fff; border-color:#1f1f1f}` `.plan .btn{margin-top:auto; width:100%; border-radius:4px; padding:10px}` `h3{display:flex; justify-content:space-between; align-items:baseline}`.
- Warum: Dunkel/Hell-Kontrast unterscheidet Self-Service (dunkel, empfohlen) von Sales ohne „Most popular“-Badge. Kantige Karten passen zum Linienraster. CTA-Farbe folgt Weg: Blau = sofort, Schwarz = Gespräch.
- Slop: Hellgrauer Text auf Dunkelgrau (#C4C4C4 auf #1F1F1F) grenzwertig im Kontrast. Der Preis in 0,75× neben 1,4×-Titel wirkt versteckt.

---

## Gemeinsamkeiten im Paket

1. **Linien statt Schatten.** 6 von 8 Screens nutzen 1-px-Borders (#E4E4E7…#E8E8E8) als einziges Trennmittel. Schatten nur bei der Qatalog-Nav-Pille. (Alle Zoom-/Apollo-Screens, Qatalog, Amplemarket)
2. **Eine Aktionsfarbe pro Seite.** Blau in vier Varianten (#0B5CFF Zoom, #0057FF Square, #2563EB Apollo, #1D6FFF Qatalog) — jeweils nur für Buttons, Links, Fokus, Auswahl. Nie für Dekor.
3. **Success = Grün/Türkis, separater Token.** Zoom Haken #22C55E, Apollo Kreis #1DBF9B. Nie mit Aktionsblau vermischt.
4. **Radius-Familien sind konsistent pro Seite:** Zoom/Apollo 3–4 px, Square 16 px Fotos + 4 px Buttons + 999 Pillen (Bruch), Jasper 0, Qatalog 0 Karten + 999 Nav + 4 px Buttons, Amplemarket 16/12/8 px abgestuft.
5. **Booking-Flows: schmale Spalte (~460–530 px CSS) für Form + Success; breite Fläche nur für Vergleich (Zoom Woche).**
6. **Headlines ohne Farbabstufung.** Alle Headlines einfarbig; Hierarchie durch Größe (2,4–3×) und Serif/Sans-Wechsel (Jasper), nicht durch Gradient-Text.
7. **Eyebrows sind Versalien + Tracking** (Square, Amplemarket, Qatalog) oder Marker-Hinterlegung (Jasper). 0,6–0,65× Body.
8. **Logos immer einfarbig (S/W)** in Proof-Grids (Jasper, Amplemarket).
9. **Fine-Print 0,6–0,65× Body, Muted #8E8EA0**, zentriert, ohne Rahmen.

## Farblogik als Rollentabelle (Sichtbefund, keine Tokens)

| Rolle | Zoom | Apollo | Square | Jasper | Amplemarket | Qatalog |
|---|---|---|---|---|---|---|
| Page | #FFFFFF | #F5F5F5 | #000000 | #FFFFFF | #F7F7F5 | #F7F7F7 + Linienraster |
| Surface | #F1F2F4 (Back-Btn) | #FFFFFF (Karte) | — | #F3F4F6 (Quote-Tiles) | Pastell-Kacheln | #FFFFFF (Enterprise) |
| Raised | — | #FFFFFF + 1px | Fotos | Pastell #DDF3D9/#D6E6F7/#FBE0EE/#FBF1B8 | Gradient-Karten | #1F1F1F (Pro, dunkel) |
| Action | #0B5CFF | #2563EB (Links), #F5C518 (Help-CTA) | #0057FF | #0B1B3F (Navy) | #111111 (Schwarz) | #1D6FFF / #1A1A1A |
| Selected | #0B5CFF Fill | — | — | — | — | — |
| Success | #22C55E | #1DBF9B | — | — | — | — |
| Help/Notice | — | #0F1B3D Navy | — | — | — | — |
| Ink | #1C1C28 | #1C1C1C | #FFFFFF | #0B1B3F | #111111 | #1A1A1A / #FFFFFF |
| Muted | #4B4B5C / #8E8EA0 | #4B5563 | #FFFFFF 80 % | #4B5563 | #6B7280 | #C4C4C4 (on dark) |
| Border | #E4E4E7 | #E5E7EB | — | — | #E5E7EB | #E5E5E5 / #E8E8E8 Raster |
| Accent | — | Konfetti (5 Farben) | — | Gelb-Marker #FDF3B4 | — | Grün #4ADE80 / Blau #3B82F6 Icons |

## Spacing-Rhythmus (in Body-Einheiten, 1× ≈ 15 px CSS)

- Booking-Screens: Feld-Gap ~1,3× Feldhöhe; Section-Gap 1,5–2×; Container 30–35× breit.
- Marketing-Grids: Kachel-Gap ~1,2× (Jasper 18 px, Amplemarket 18 px, Qatalog 15 px); Kachel-Padding 1,3–1,8×; Headline→Grid 5–6×.
- Header-Padding: 0,8–1× vertikal, 1,3–3× horizontal.
- Button-Höhe: 2,2–2,9× Body (32–44 px); Button-Padding horizontal ≈ 1,2–1,5× Höhe bei Pillen, ~0,5× Höhe bei eckigen Buttons.

## Dos

- Eine Aktionsfarbe, ein Success-Token, ein Help-Token; alles andere Grau-Stufen. (Zoom, Apollo)
- Trennung durch 1-px-Border in #E5E7EB-Nähe; Schatten nur für schwebende Elemente. (alle)
- Booking-Success: Icon → H1 → Kontextsatz → Detail-`dl` mit Icons → gleichrangige Korrektur-Buttons → Sekundärlink → Fine-Print. (Zoom, Apollo)
- Proof-Grids: Hierarchie durch Material (Verlauf/Serif-Zahl für Story, flach für Breite), Logos einfarbig, Zahl + Einheit + Label. (Amplemarket, Jasper)
- Pricing: Empfehlung über Tonwert (dunkel vs. hell), nicht über Badge; CTA-Verb und -Farbe nach Erwerbsweg. (Qatalog)
- Persistente Labels über Inputs, Pflichtstern im Label, 2-px-Fokusring in Aktionsfarbe. (Zoom Form)
- Foto-Hero: Fotos in Grid-Zellen mit `object-fit:cover`, Text in der Mitte freigestellt, Fotos dürfen am Viewport anschneiden. (Square)

## Don'ts

- Keine Header-Pillen und eckigen Hero-Buttons auf derselben Seite mischen. (Square)
- Kein Konfetti/Erfolgsdekor ohne Backend-Bestätigung und ohne Reduced-Motion-Fallback. (Apollo)
- Keine Pastellflächen, die semantisch wirken (Grün/Rosa) ohne Regel; Farbe rotiert nach Position. (Jasper, Amplemarket)
- Kein Grau-Hover auf Outline-Blau-Buttons, wenn Grau anderswo „disabled“ heißt. (Zoom Woche)
- Kein Disabled-Submit ohne sichtbare Begründung. (Zoom Form)
- Kein Offwhite-auf-Offwhite ohne Border. (Amplemarket Mini-Kacheln)
- Kein Muted-Text unter ~#C4C4C4 auf #1F1F1F. (Qatalog Pro)
- Keine Meeting-Links, die abschneiden — `overflow-wrap:anywhere` oder Copy-Button. (Zoom Success)

## Mobile-Hinweise

- Kein Screen zeigt Mobile. Ableitungen: Zoom-Woche muss auf 1 Tag + Tages-Tabs kollabieren; Square-Fotos auf 2 Zellen reduzieren, Text zuerst; Jasper/Amplemarket-Grids auf 1–2 Spalten mit erhaltener DOM-Reihenfolge; Qatalog-Nav-Pille verliert auf 360 px die Links (Menü nötig). Alles eigene Gestaltung, nicht belegt.

## Unlesbar / nicht belegt

- Qatalog: Seitentitel „Pricing“ oben angeschnitten; ornamentale Linien hinter dem Titel nicht identifizierbar; Sticky-Verhalten der Nav-Pille.
- Zoom Woche: Grau-gefüllter Slot „6:30 AM“ Friday — Hover oder Selected nicht bestimmbar.
- Zoom Success: Meeting-URL abgeschnitten.
- Amplemarket: ob die Verlaufskarten Grain/Noise tragen, ist in 768 px nicht erkennbar.
- Square: Header-Zeile 2 Pillenhöhe (40 vs. 48 px CSS) unsicher; Fotos unten angeschnitten, Gesamthöhe des Hero unbekannt.
- Apollo: Kartenrand (Border vs. Schatten) nicht unterscheidbar.
- Schriftfamilien bei allen: nur Serif/Sans-Klasse erkennbar, keine Namen.
