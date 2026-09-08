# Analyse mobbin-1 — platform-images (8 Belege)

Stand: 2026-09-07. Alle acht JPEGs mit dem Read-Tool betrachtet (768 px breit, 521–528 px hoch). Alle px-Werte unten sind Vorschau-Pixel im 768er-Bild, keine CSS-Pixel des Originals. Hex-Werte sind Sichtschätzungen. Die dunkle „curated by Mobbin"-Leiste (unteres ~55 px jedes Bildes) gehört zur Quelle, nie zum Layout. Body-Referenz: kleiner Fließtext ≈ 8–9 px im Vorschaubild → als „1 Body" bezeichnet.

---

## 1. `0823c6ef-79d1-4ba5-818a-25cff74d3dda.jpg` — Lemon Squeezy, typografischer Hero

### Header/Nav (obere 45 px, volle Breite)
- Geometrie: Höhe ≈ 45 px (≈ 5 Body). Logo links bei x≈78, Nav-Links ab x≈213 mit ≈ 20 px Gap. Rechts „Sign in" als Text, daneben weiße Pill „Get started →" (Höhe ≈ 22 px, Padding ≈ 1:2.5, Radius voll).
- Material: Header hat keinen eigenen Hintergrund; er liegt direkt auf dem Page-Violett. Kein Border, kein Schatten. Pill: Surface `#FFFFFF`, Text Ink `#1A1A1A`.
- Typo: Nav-Links ≈ 1 Body, Sans, Medium, Farbe `#C9C0FF` (Text auf Violett mit ~70 % Opazität), aktiver Punkt „Pricing" heller/weiß.
- Nachbau: `header{display:flex;align-items:center;justify-content:space-between;padding:12px 78px;background:transparent}` — die Pill: `a.pill{background:#fff;color:#1a1a1a;border-radius:999px;padding:5px 12px;font-size:.85em;font-weight:500}`.
- Warum es funktioniert: Der Header verschmilzt mit dem Hero, dadurch wirkt die Seite als eine Fläche. Die einzige weiße Pille im Header ist ein Vorab-Echo der Haupt-CTA.

### Hero-Block (y ≈ 125–355, zentriert)
- Geometrie: Headline drei Zeilen, Zeilenhöhe ≈ 42 px bei Cap-Height ≈ 30 px → line-height ≈ 1.05. Breite der längsten Zeile ≈ 480 px = 62 % der Viewportbreite. Abstand Headline→Subline ≈ 22 px; Subline→CTA ≈ 24 px; CTA Höhe ≈ 30 px, Breite ≈ 150 px, Radius voll. Vertikal: ≈ 80 px oberhalb der Headline frei, ≈ 110 px unterhalb der CTA bis zum Bildrand.
- Material: Page `#4B2BE5` (kräftiges Blauviolett, durchgehend, kein Verlauf, kein Grain, kein Bild). Headline Text `#FFFFFF`. Subline Muted `#B9AEFF` (≈ 65 % Weiß). CTA Surface `#FFFFFF` mit Ink-Text und Pfeil.
- Typo: Headline ≈ 4.5× Body, Sans (geometrisch, weiche Rundungen), Gewicht Medium/500, Tracking leicht negativ (−1 %). Kein Farbwechsel innerhalb der Headline. Subline zwei Zeilen à ≈ 1 Body, Regular, zentriert, Zeilenhöhe ≈ 1.8.
- Nachbau:
  ```html
  <section class="hero"><h1>…</h1><p class="sub">…<br>…</p><a class="btn">Get started for free →</a></section>
  ```
  `.hero{background:#4b2be5;color:#fff;text-align:center;padding:clamp(80px,14vw,160px) 24px 120px}` · `h1{font-size:clamp(2.2rem,5vw,4rem);line-height:1.05;letter-spacing:-.01em;font-weight:500;max-inline-size:22ch;margin-inline:auto}` · `.sub{color:rgb(255 255 255/.65);line-height:1.8;margin-top:1.4em}` · `.btn{display:inline-block;background:#fff;color:#111;border-radius:999px;padding:.6em 1.6em;margin-top:1.6em}`.
- Warum es funktioniert: Eine Farbe, ein Textblock, ein Button. Kontrast weiß/violett trägt die Hierarchie vollständig; das Auge hat keine Konkurrenz. Der zweite Vertrauenssatz („no trial, no contract, no risk") sitzt exakt zwischen Versprechen und Aktion.
- Fehler/Slop: Die Subline ist mit `#B9AEFF` auf Violett kontrastschwach (geschätzt < 4.5:1). Die harte `<br>`-Struktur der Headline bricht bei deutschem Text. Violett als Page-Farbe ist Markenentscheidung, kein übertragbares Token.

---

## 2. `1c082bfd-e527-418c-af97-002e96fe42ca.jpg` — OFF+BRAND, Fragmentzustand

### Sichtbar
- Header: Wortmarke „OFF+BRAND." links (x≈8, y≈13, Sans, Regular, ≈ 1.6 Body, Tracking weit). Rechts zwei Versal-Links mit ↗-Pfeil („MANIFESTO ↗", „WEBFLOW ENTERPRISE ↗", ≈ 0.9 Body, Tracking +5 %) und eine Outline-Pill „CONTACT →" (Höhe ≈ 20 px, Border 1 px `#C8C8C8`, Radius voll, Hintergrund transparent).
- Page: Zweigeteilter Hintergrund — links `#F4F4F4`, rechts ab x≈395 leicht dunkler `#EDEDED`; Grenze ist eine harte vertikale Kante. Rechts am Rand bei y≈195 ein winziges graues Rechteck (Scrollbar-Thumb).
- Zentrum: sieben schwarze Fragmente (Rechtecke, Striche, ein L-Stück) zwischen x≈205–612, y≈160–330, plus ein pfirsichfarbener Kreis mit weichem Rand bei x≈383,y≈238 (≈ 18 px). Inhalt **unlesbar**.
- Unten: Punkt-Indikator links (y≈469), Hamburger-Icon rechts unten (drei Striche, ≈ 14 px).
- Entscheidung: Kein Hero-Regelwerk ableitbar. Wahrscheinlich Animations-Zwischenstand (Buchstaben-Reveal), unbewiesen. Einzige verwertbare Regeln: Versal-Nav mit externem Pfeil, Outline-Pill als Sekundär-CTA, zwei benachbarte Grautöne als Flächenteilung.
- Nachbau der verwertbaren Teile: `nav a{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em} nav a::after{content:"↗";margin-left:.3em}` · `.pill-outline{border:1px solid #c8c8c8;border-radius:999px;padding:.35em 1em;background:transparent}`.
- Slop-Warnung: Wer diese Fragmente als „minimalistischer Hero" nachbaut, baut ein leeres Bild.

---

## 3. `270f478a-6a90-49fb-8b34-f5751d7254f9.jpg` — Miro, Contact-Sales-Formular

### Header (y 0–45)
- Geometrie: Weiße Leiste ≈ 45 px, innerhalb der Seitenbreite x≈35–735 (der Header ist so breit wie die Content-Karte plus Rand). Logo gelb `#FFD02F` mit Wortmarke schwarz. Nav-Items mit Chevron ▾ (Product, Solutions, Resources), Pricing ohne Chevron. Rechts „Contact Sales" Text, „Login" als Outline-Button (Border 1 px `#D9D9D9`, Radius 4 px, Höhe ≈ 22 px), „Sign up free" gefüllt Action `#4262FF`, Radius 4 px.
- Material: Header Surface `#FFFFFF`, sehr flacher Schatten nach unten (`0 1px 3px rgb(0 0 0/.06)`) — an der Unterkante bei y≈47 sichtbar.
- Typo: Nav ≈ 1.05 Body, Medium, Ink `#050038`-nah.

### Page-Hintergrund
- Material: Offwhite `#F5F5F7` mit regelmäßigem Punktraster (Dot-Grid), Punktabstand ≈ 8 px, Punktfarbe `#E3E3E6`, Punktgröße ≈ 1 px. Sichtbar links x 0–185 und rechts x 585–768, das gesamte Bild hoch.
- Nachbau: `body{background:#f5f5f7 radial-gradient(#e3e3e6 1px,transparent 1.2px) 0 0/8px 8px}`.

### Formular-Karte (x≈185–585, Breite ≈ 400 px = 52 %)
- Geometrie: Weiße Fläche ohne Radius (Kanten laufen oben unter dem Header und unten in die Mobbin-Leiste — Karte also höher als der Viewport). Innen-Padding ≈ 12 px links/rechts. Titel bei y≈60–95, zwei Zeilen. Neun Felder, jedes ≈ 24 px hoch, Gap ≈ 8 px (Verhältnis Feld:Gap = 3:1). Textarea ≈ 50 px. Submit-Button volle Breite, ≈ 24 px hoch, Radius 4 px. Legal-Zeile darunter, zentriert, ≈ 0.8 Body.
- Material: Karte Surface `#FFFFFF`, sehr weicher Schatten seitlich (≈ `0 0 20px rgb(0 0 0/.05)`). Inputs Border 1 px `#DCDCE0`, Radius 4 px, Hintergrund weiß. Placeholder Muted `#9A9AA3`. Select-Chevron rechts ≈ 8 px, grau. Submit Action `#4262FF`, Text weiß. Links in Legal-Zeile Action-Blau.
- Typo: Titel ≈ 2.2× Body, Sans, Regular/400 (nicht fett), Ink `#050038`; Zeilenhöhe ≈ 1.2. Placeholder ≈ 1 Body Regular. Button-Label ≈ 1 Body Medium.
- Nachbau:
  ```html
  <main class="sheet"><h1>Fill out this quick form…</h1><form><input placeholder="First name">…<select>…</select><textarea></textarea><button>Contact sales</button><p class="legal">…</p></form></main>
  ```
  `.sheet{max-inline-size:400px;margin-inline:auto;background:#fff;padding:24px 12px 48px;box-shadow:0 0 24px rgb(0 0 0/.05)}` · `form{display:grid;gap:8px}` · `input,select,textarea{block-size:24px;border:1px solid #dcdce0;border-radius:4px;padding:0 8px;font:inherit}` · `select{appearance:none;background:url(chevron.svg) right 8px center/8px no-repeat}` · `button{background:#4262ff;color:#fff;border:0;border-radius:4px;block-size:24px}`.
- Warum es funktioniert: Eine Spalte, eine Leserichtung, ein Button. Das Punktraster macht den Grund „Werkzeug-haft" (Whiteboard-Metapher) und hebt die weiße Karte ohne harten Border ab. Sehr kleine Radien (4 px) an Input, Button, Login — eine Formfamilie.
- Fehler/Slop: Nur Placeholder, keine persistenten Labels — nach Eingabe verschwindet die Feldbedeutung. Neun Felder für einen Erstkontakt sind Reibung. Kein sichtbarer Pflichtmarker.

---

## 4. `3d5dcb6c-278b-4f62-b097-58567818202b.jpg` — Zoom Scheduler, Detailformular (ausgefüllt)

### Header
- Nur Zoom-Wortmarke links oben (x≈20,y≈13, Action-Blau `#0B5CFF`, ≈ 1.4 Body, Bold). Kein Nav, kein Border, Page ist reines Weiß.

### Zentrale Spalte (x≈257–511, Breite ≈ 254 px = 33 %)
- Geometrie: Schmale mittige Spalte. Blocks: (a) Titel „Mentoring Session" y≈45 + Host-Zeile mit Avatar 14 px rund; (b) Trennlinie 1 px `#E5E5E5` bei y≈78; (c) drei Metazeilen mit Icon links (Kalender, Globus, Kamera; Icon ≈ 10 px, Gap 5 px), Zeilenabstand ≈ 15 px; (d) Trennlinie y≈142; (e) Abschnittstitel „Enter Your Information ⓘ"; (f) drei Felder mit **externen Labels über dem Feld**, Label→Input Gap ≈ 4 px, Input Höhe ≈ 20 px, Feld→Feld ≈ 18 px; (g) Link „Add Attendees" mit Icon, Action-Blau; (h) Textarea ≈ 32 px mit Resize-Griff; (i) Button-Reihe rechtsbündig: „Back" Muted-Surface `#E8E8EA` und „Book" Action `#0B5CFF`, beide Höhe ≈ 16 px, Radius 4 px, Gap 6 px; (j) Footer-Zeile klein, zentriert, Muted.
- Material: Alles auf Page `#FFFFFF`. Inputs Border 1 px `#C9C9CE`, Radius 4 px, Hintergrund weiß, Value-Text Ink `#232333`. Pflichtstern `*` in Ink direkt hinter dem Label. Info-Icon ⓘ grau.
- Typo: Titel ≈ 1.2× Body Bold. Labels ≈ 1 Body Semibold. Metazeilen ≈ 1 Body Regular. Footer ≈ 0.8 Body Muted `#8A8A94`. Alles Sans, enge Größenspreizung (1.2:1:0.8).
- Nachbau:
  ```html
  <article class="booking"><header><h1>Mentoring Session</h1><p class="host"><img alt="">Sam Lee</p></header><hr><dl class="meta"><div><svg/><dd>Friday…</dd></div>…</dl><hr><form><h2>Enter Your Information</h2><label>First Name <span aria-hidden>*</span><input required></label>…<div class="actions"><button type="button" class="ghost">Back</button><button class="primary">Book</button></div></form></article>
  ```
  `.booking{max-inline-size:254px;margin-inline:auto;font-size:.85rem}` · `hr{border:0;border-top:1px solid #e5e5e5;margin:12px 0}` · `label{display:grid;gap:4px;font-weight:600;margin-bottom:18px}` · `input{block-size:20px;border:1px solid #c9c9ce;border-radius:4px;padding:0 8px;font-weight:400}` · `.actions{display:flex;justify-content:flex-end;gap:6px}` · `.ghost{background:#e8e8ea;color:#333}` · `.primary{background:#0b5cff;color:#fff}` — beide `border:0;border-radius:4px;padding:2px 12px`.
- Warum es funktioniert: Zusammenfassung des gewählten Slots bleibt oberhalb des Formulars sichtbar (Kontext nie verloren). Labels außen, Pflicht sichtbar, Aktionen rechts unten wie in einem Dialog. Nur eine Akzentfarbe (Blau) für Logo, Link, Book — Rolle „Action" ist eindeutig.
- Fehler/Slop: Absolute Schriftgrößen sehr klein; Spaltenbreite 33 % lässt viel ungenutzten Raum. Kein sichtbarer Fokus-/Fehlerzustand im Bild (nicht bewertbar).

---

## 5. `3f3f8266-647b-455b-927a-aff3f2120c5d.jpg` — Apollo Booking, Zeit gewählt + Confirm

### Kopf (zentriert, y≈25–55)
- Titel „Book a meeting with Sam Lee" ≈ 1.5× Body Bold Ink `#1B1B1F`; Subline ≈ 0.9 Body Muted `#6B6B75`. Page `#F7F7F8` (sehr helles Grau).

### Karte (x≈137–631, Breite ≈ 494 px = 64 %, y≈72–325)
- Geometrie: Weiße Karte, Radius ≈ 4 px, Border 1 px `#E4E4E8`, kaum Schatten. Drei Spalten durch vertikale 1-px-Linien getrennt: links ≈ 150 px (Kontext), Mitte ≈ 220 px (Kalender), rechts ≈ 120 px (Zeiten). Innen-Padding ≈ 12 px. Spaltentitel ≈ 1 Body Bold („30 minute meeting", „Select date", „Select time").
- Links: zwei Info-Zeilen mit Icon (Uhr, Pin), Text ≈ 0.9 Body Regular.
- Kalender: Monatszeile „‹ February 2025 ›" zentriert; Wochentage Versal ≈ 0.7 Body Muted; Tageszellen ≈ 20 px, verfügbare Tage als runde Muted-Chips `#EEEEF0` (Kreis, Ink-Text), nicht verfügbare Tage ohne Chip in Muted-Text; „heute" (10.) Outline-Kreis Action-Blau 1 px; gewählter Tag (14.) gefüllter Kreis Action `#1E6FE8`, Text weiß. Zeilenabstand der Kalenderzeilen ≈ 25 px. Darunter Label „Time zone" + Select (Höhe ≈ 16 px, Border 1 px, Radius 3 px, Chevron rechts).
- Rechts: Zeit-Slots als Outline-Buttons volle Spaltenbreite, Höhe ≈ 16 px, Gap ≈ 5 px, Border 1 px `#D6D6DB`, Radius 3 px, Text zentriert ≈ 0.85 Body. Gewählter Slot „09:30 AM": Border Action-Blau, Text Blau, halbe Breite; daneben erscheint „Confirm" gefüllt Action-Blau, weiß, gleiche Höhe. Liste läuft unten weiter (letzter Slot angeschnitten → Scrollbereich).
- Material: Karte Surface `#FFFFFF`; alle Linien 1 px Border-Grau; Action-Blau `#1E6FE8` in genau drei Rollen: heute-Outline, gewählt-gefüllt, Confirm.
- Nachbau:
  ```html
  <section class="card"><aside>…</aside><div class="cal"><h2>Select date</h2><nav>‹ February 2025 ›</nav><div class="grid7">…<button class="day">2</button><button class="day is-today">10</button><button class="day is-selected">14</button>…</div><label>Time zone<select/></label></div><div class="times"><h2>Select time</h2><div class="slot is-selected"><button>09:30 AM</button><button class="confirm">Confirm</button></div><button class="time">09:45 AM</button>…</div></section>
  ```
  `.card{display:grid;grid-template-columns:150px 1fr 120px;background:#fff;border:1px solid #e4e4e8;border-radius:4px;max-inline-size:494px;margin-inline:auto}` · `.card>*{padding:12px}.card>*+*{border-left:1px solid #e4e4e8}` · `.grid7{display:grid;grid-template-columns:repeat(7,1fr);row-gap:5px}` · `.day{inline-size:20px;aspect-ratio:1;border-radius:50%;background:#eeeef0;border:0}` · `.day.is-today{background:#fff;box-shadow:inset 0 0 0 1px #1e6fe8;color:#1e6fe8}` · `.day.is-selected{background:#1e6fe8;color:#fff}` · `.time{inline-size:100%;block-size:16px;border:1px solid #d6d6db;border-radius:3px;background:#fff}` · `.slot.is-selected{display:grid;grid-template-columns:1fr 1fr;gap:5px}.slot.is-selected>button:first-child{border-color:#1e6fe8;color:#1e6fe8}.confirm{background:#1e6fe8;color:#fff;border:0}`.
- Warum es funktioniert: Progressive Offenlegung von links nach rechts; jede Spalte ist ein Schritt. Auswahl (Outline-Blau) und Fortschritt (gefülltes Blau) sind zwei getrennte Handlungen im selben Farbton — unterscheidbar durch Füllung. Runde Tages-Chips vs. eckige Zeit-Buttons trennen zwei Objektarten.
- Fehler/Slop: Confirm ersetzt die halbe Slot-Breite → Layout springt bei Auswahl. Mobile: drei Spalten sind ohne Umbau nicht tragbar.

---

## 6. `4ae34544-82ac-4f27-b0d1-2379e088b826.jpg` — Zendesk, Case-Proof

### Header (y 0–48)
- Geometrie: Weiß, Höhe ≈ 48 px, Logo links bei x≈100, Nav zentriert (Products, Pricing, Solutions, Demo, Resources; Gap ≈ 30 px), rechts zwei Buttons ohne Radius: „Free trial" gefüllt Petrol `#03363D`, weiß; „Buy now" Outline 1 px Petrol, Text Petrol. Beide ≈ 26 px hoch, Padding ≈ 1:2. Unterkante Border 1 px `#E8E8E8`.
- Typo: Nav ≈ 1 Body Regular, Ink Petrol `#03363D`.

### Page + drei Proof-Bänder (x≈80–688, Breite ≈ 608 px = 79 %)
- Page `#F3F3F1` (warmes Hellgrau). Drei weiße Flächen, Radius 0, kein Border, kein Schatten; Gap zwischen Bändern ≈ 8 px. Höhen: Zitate ≈ 138 px, Logos ≈ 92 px, Kennzahlen ≈ 96 px.
- Band 1 (Zitate): zwei Spalten, jede Spalte zentriert; Zitat ≈ 1.25× Body Regular, Zeilenhöhe ≈ 1.5, drei Zeilen, in Anführungszeichen; darunter Name ≈ 0.85 Body Bold; darunter Rolle ≈ 0.75 Body Regular. Beide Spalten haben ≈ 30 px Gap zueinander, Text max ≈ 250 px breit.
- Band 2 (Logos): Versal-Eyebrow „PRODUCTS USED" ≈ 0.7 Body Bold, Tracking +10 %, zentriert; darunter fünf Produkt-Wortmarken mit kleinem farbigem Icon (Orange, Rot, Gelb, Grün, Gelb), Wortmarke Petrol ≈ 1.3 Body, Gap ≈ 45 px.
- Band 3 (Kennzahlen): vier Spalten, Label Versal ≈ 0.7 Body Bold Tracking +10 % (zwei bis drei Zeilen), Zahl darunter ≈ 0.9 Body Regular (!) — die Zahl ist nicht größer als das Label.
- Material: Text Ink Petrol `#03363D` überall; kein reines Schwarz. Akzentfarben nur in den Produkt-Icons.
- Nachbau:
  ```html
  <section class="proof"><div class="band quotes"><blockquote><p>…</p><footer><b>Name</b><small>Rolle</small></footer></blockquote>×2</div><div class="band logos"><h3 class="eyebrow">Products used</h3><ul>…</ul></div><dl class="band stats"><div><dt>Websites connected…</dt><dd>60+</dd></div>×4</dl></section>
  ```
  `body{background:#f3f3f1;color:#03363d}` · `.proof{max-inline-size:608px;margin-inline:auto;display:grid;gap:8px}` · `.band{background:#fff;padding:32px 40px;text-align:center}` · `.quotes{display:grid;grid-template-columns:1fr 1fr;gap:30px}` · `blockquote p{font-size:1.25em;line-height:1.5}` · `.eyebrow,dt{font-size:.7em;font-weight:700;letter-spacing:.1em;text-transform:uppercase}` · `.stats{grid-template-columns:repeat(4,1fr)}` · Header-Buttons: `border-radius:0;padding:6px 14px;border:1px solid #03363d`.
- Warum es funktioniert: Drei gleichbreite weiße Bänder auf warmem Grau bilden einen klaren Rhythmus (8-px-Fuge). Alles ist zentriert, eine Ink-Farbe, keine Deko. Versal-Eyebrows sind das einzige Ordnungsmittel und reichen aus.
- Fehler/Slop: Kennzahlen (60+, 10000, 90 %) sind kleiner als ihre Labels — die Zahl verliert, obwohl sie der Beweis ist. Rollen-Zeile ≈ 0.75 Body ist sehr klein. Chat-Bubble unten rechts (Kreis Petrol, ≈ 40 px, Schatten) ist nur mit echtem Kanal gerechtfertigt.

---

## 7. `50e13805-f2a9-4bc2-b254-e8d2c2c96cf0.jpg` — Apollo Admin, Meetings-Dashboard

### Sidebar (x 0–122, volle Höhe)
- Geometrie: Breite ≈ 122 px (16 %), Surface `#FFFFFF`, rechter Border 1 px `#E8E8EA`. Logo oben, Collapse-Chevron „«" rechts. Quick-search-Feld (Höhe ≈ 14 px, Border 1 px, Radius 3 px, Kürzel „⌘K" rechts). Gruppenlabels („Prospect & enrich", „Engage", „Win & close", „Tools & automations") ≈ 0.7 Body Muted, Abstand darüber ≈ 12 px. Items mit Icon 9 px + Label ≈ 0.85 Body, Zeilenhöhe ≈ 16 px; aktives Item „Meetings" mit hellblauer Fläche `#EAF1FF` und Text Action-Blau, Radius 3 px. „New"-Badge grau Outline, ≈ 0.6 Body. Unten gelber Vollflächen-Button „Purchase – 8 days left" `#FFE600`, Ink-Text, Radius 3 px, Höhe ≈ 16 px; darunter Onboarding-Karte mit Progressbar (Track `#E5E5E5`, Fill Ink, 36 %). Ganz unten Settings + Nutzer.
- Material: Sidebar und Content beide weiß; Content-Page leicht grau `#F7F7F8`, sodass Karten weiß darauf abheben.

### Content (x 122–768)
- Topbar: Titel „Meetings" ≈ 1.3 Body Bold; Tabs (All meetings, Scheduling pages [aktiv, Ink-Underline 2 px], Availability & tools, Admin console) ≈ 0.85 Body, Gap ≈ 14 px. Rechts gelber „Create ▾"-Button `#FFE600`.
- Profilkarte (x≈203–687, y≈57–140): weiß, Radius 4 px, Border 1 px; Avatar rund 16 px, Name Bold, URL als Link Action-Blau mit Copy-Icon; Tabs „Your hub / Team's hub"; Suchfeld ≈ 18 px Höhe, Radius 3 px, Muted-Hintergrund `#F3F3F5`.
- Abschnittstitel „All pages" ≈ 1.1 Body Bold mit Border-bottom 1 px. Sub-Header „Your pages" + Beschreibung Muted.
- Drei Karten (je ≈ 150 px breit, Gap ≈ 12 px, Höhe ≈ 122 px, Radius 4 px, Border 1 px `#E4E4E8`, weiß): Toggle-Switch oben links (Ink, aktiv, 16×9 px), Titel ≈ 0.85 Body Medium, „···"-Menü rechts; Body: Dauer, „Single host", Avatar-Chip; Footer rechtsbündig: „Preview" Textlink Ink Medium + „Copy link" Outline-Button (Radius 3 px, 1 px Border).
- Hilfe-Button rechts unten: schwarzer Kreis ≈ 28 px mit „?".
- Nachbau: `body{display:grid;grid-template-columns:122px 1fr}` · `aside{border-right:1px solid #e8e8ea;background:#fff;padding:8px}` · `aside a[aria-current]{background:#eaf1ff;color:#1e6fe8;border-radius:3px}` · `.tabs a[aria-selected]{border-bottom:2px solid #111}` · `.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}` · `.card{background:#fff;border:1px solid #e4e4e8;border-radius:4px;padding:10px;display:flex;flex-direction:column}.card footer{margin-top:auto;display:flex;justify-content:flex-end;gap:8px}` · `.btn-accent{background:#ffe600;color:#111;border-radius:3px}` · Switch: `input[type=checkbox]{appearance:none;inline-size:16px;block-size:9px;border-radius:999px;background:#111;position:relative}input::after{content:"";position:absolute;inset:1px auto 1px 1px;aspect-ratio:1;background:#fff;border-radius:50%}`.
- Warum es funktioniert: Alles ist 1-px-Border und 3–4 px Radius; Gelb ist reserviert für „Geld"-Aktionen (Purchase, Create), Blau für Navigation/Auswahl. Karten enden alle mit derselben Footer-Zeile → Scan-Rhythmus.
- Fehler/Slop: Admin-Screen, gehört nicht in die öffentliche Reise. Sehr kleine Typo (Gruppenlabels ≈ 0.7 Body). Zwei Akzentfarben (Gelb, Blau) plus Schwarz-Switches sind ein volles Produkt-Tokenset, nicht Marketing.

---

## 8. `5125964c-8b12-49cc-b037-8e052fc553f9.jpg` — Clerk, Dark Pricing Hero

### Header (y 0–33)
- Geometrie: Höhe ≈ 33 px, transparent auf Dark-Page. Logo links x≈60. Nav: Product ▾, Docs, Changelog, Pricing, Company ▾ (≈ 0.9 Body, Text `#D7D7DC`). Rechts „Sign in" Text + Pill „Get started →": Surface `#2A2A31` (Raised), Border 1 px `#3A3A42`, Radius voll, Höhe ≈ 18 px, Text weiß.

### Hero (y 35–300)
- Material: Page `#151518` (fast Schwarz, leicht blau). Hintergrund-Ebene 1: sehr schwaches Leiterbahn-Muster (dünne Linien 1 px `#26262C`, rechtwinklige Pfade mit kleinen Knoten-Quadraten), sichtbar rechts oben (x 520–768, y 40–200) und links (x 0–120), Opazität ≈ 15 %. Ebene 2: großes 3D-„C" (≈ 240 px Durchmesser, zentriert x≈380,y≈150), Verlauf von `#5B5FE0` (Violettblau) über `#2D2F6E` nach `#0C0C12`, mit Glow (weicher Rand ≈ 40 px, `#3B3F9A` bei ≈ 30 %). Das C ist ein gerendertes Rasterasset, nicht CSS-nachbaubar in dieser Qualität. Ebene 3: diagonaler dunkler Lichtstreifen von rechts oben (heller `#1E1E24`).
- Headline „Pricing that / scales with you": ≈ 4× Body, Sans, Bold/700, Tracking −2 %, Weiß `#FFFFFF`, zentriert, zwei Zeilen, Zeilenhöhe ≈ 1.05; sie **liegt über dem C** (z-index). Subline zwei Zeilen ≈ 1.1 Body, Farbe Muted `#9A9AA6`; einzelne Wörter („simple", „exceptionally powerful", „you scale") sind weiß bzw. hellblau `#7FA8FF` hervorgehoben → Farbabstufung innerhalb des Satzes.
- Nachbau (ohne 3D-C): `.hero{background:#151518;color:#fff;text-align:center;padding:96px 24px 40px;position:relative;isolation:isolate}` · `.hero::before{content:"";position:absolute;inset:0;background:url(circuit.svg) center/1200px repeat;opacity:.15;z-index:-1}` · `.hero::after{content:"";position:absolute;inset:auto;left:50%;top:20%;inline-size:240px;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,#3b3f9a55,transparent 70%);filter:blur(24px);z-index:-1}` (Glow-Ersatz) · `h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:700;letter-spacing:-.02em;line-height:1.05}` · `.sub{color:#9a9aa6}.sub b{color:#fff;font-weight:400}.sub em{color:#7fa8ff;font-style:normal}`. 3D-C: `<img>` als WebP/AVIF mit `position:absolute`, unter der Headline.

### Pricing-Grid (y 318–475, x≈60–708, drei Spalten ≈ 1:1:1, Breite ≈ 648 px = 84 %)
- Geometrie: Kein Kartenradius, keine Kartenflächen — die Spalten werden nur durch 1-px-Linien getrennt: horizontale Linie oben über alle drei Spalten; vertikale Linien zwischen Spalten. Spalte 3 (Add-ons) mit gestrichelter Linie links `#3A3A42` (dashed). Innen-Padding ≈ 18 px. Plan-Titel ≈ 0.9 Body Bold, „Pro plan" in Cyan `#48D2FF`. Beschreibung Muted ≈ 0.85 Body. Preisblock: „US" ≈ 0.6 Body Muted, Zahl „$0"/„$25" ≈ 3.2× Body Bold Weiß, „per month" ≈ 0.75 Body Muted rechts neben der Zahl, Baseline-bündig. CTA Free: Surface `#2E2E35` Raised, Text weiß, Radius 4 px, Höhe ≈ 16 px. CTA Pro: Cyan `#48D2FF` gefüllt, Text Ink dunkel, Radius 4 px. Unter den CTAs Feature-Gruppentitel („Start building", „Scale your app") Bold weiß, Bullets mit Checkmark (angeschnitten).
- Add-on-Spalte: Zeile mit Checkbox (16 px, Border 1 px, Radius 3 px, leer) + Titel + rechts Preis-Chip „$100 /mo" (Raised `#2A2A31`, Radius 3 px, Padding 2×6 px, Zahl weiß Bold, „/mo" Muted). Darunter vier Feature-Zeilen mit Check ✓ Muted, ≈ 0.8 Body. Zweiter Add-on-Block darunter (angeschnitten).
- Material-Rollen: Page `#151518`, Raised `#2A2A31`, Border `#2E2E36`, Text `#FFFFFF`, Muted `#9A9AA6`, Accent-Primary Cyan `#48D2FF` (nur Pro), Accent-Secondary Blau `#7FA8FF` (Textbetonung), Glow Violett.
- Nachbau:
  ```html
  <section class="plans"><article class="plan"><h2>Free plan</h2><p>…</p><p class="price"><small>US</small><strong>$0</strong><span>per month</span></p><a class="btn-raised">Get started for free</a><h3>Start building</h3><ul>…</ul></article><article class="plan is-pro">…</article><aside class="addons"><label><input type=checkbox><span>Enhanced authentication add-on</span><b class="chip">$100<i>/mo</i></b></label><ul>…</ul></aside></section>
  ```
  `.plans{display:grid;grid-template-columns:1fr 1fr 1fr;border-top:1px solid #2e2e36;max-inline-size:648px;margin-inline:auto}` · `.plans>*{padding:18px;border-left:1px solid #2e2e36}.plans>:first-child{border-left:0}.addons{border-left-style:dashed}` · `.price{display:flex;align-items:baseline;gap:6px}.price strong{font-size:3.2em;font-weight:700}.price small,.price span{color:#9a9aa6;font-size:.75em}` · `.is-pro h2{color:#48d2ff}` · `.btn-raised{background:#2e2e35;color:#fff;border-radius:4px;padding:3px 10px}` · `.is-pro .btn{background:#48d2ff;color:#0c0c12}` · `.chip{background:#2a2a31;border-radius:3px;padding:2px 6px;font-weight:700}.chip i{color:#9a9aa6;font-style:normal;font-weight:400}`.
- Warum es funktioniert: Der Hero investiert alle Deko in ein einziges Objekt (C + Glow); die Tabelle darunter ist reine Linien-Typografie ohne Flächen. Cyan kommt genau dreimal vor (Pro-Titel, Pro-CTA, nirgends sonst) → Empfehlung ohne „Most popular"-Badge. Gestrichelte Linie codiert „Add-on ≠ Plan".
- Fehler/Slop: Unterer Teil angeschnitten → Feature-Vergleich nicht belegbar. Leiterbahn-Muster ist auf Mobile reine Last. Subline-Kontrast Muted `#9A9AA6` auf `#151518` ≈ 5:1 knapp okay, aber die kleinen Add-on-Features ≈ 0.8 Body sind grenzwertig.

---

## Gemeinsamkeiten im Paket

1. **Border-first, Schatten-arm.** Sechs von acht Bildern trennen Flächen mit 1-px-Linien (`#E4E4E8` hell / `#2E2E36` dunkel) statt mit Schatten. Schatten nur bei Miro (Karte + Header, jeweils < 6 % Alpha).
2. **Kleine Radien in Produkt-UI, Voll-Pill nur in Marketing.** Apollo, Zoom, Miro, Clerk-Tabelle: 3–4 px. Lemon Squeezy, Clerk-Header, OFF+BRAND: `999px`-Pills für CTA im Hero/Header. Zendesk: Radius 0 konsequent.
3. **Eine Action-Farbe pro Screen, Rolle klar.** Blau (Zoom `#0B5CFF`, Apollo `#1E6FE8`, Miro `#4262FF`) für Links/Fokus/Fortschritt; Cyan (Clerk) für Empfehlung; Gelb (Apollo Admin) für Kauf; Weiß (Lemon Squeezy) auf farbigem Grund. Nie zwei gleichrangige Akzentfarben im selben Marketing-Block.
4. **Auswahl ≠ Fortschritt.** Apollo (3f3f8266): Outline-Blau = gewählt, gefülltes Blau = Confirm. Zoom (3d5dcb6c): Back grau, Book blau. Beide trennen Zustand und Aktion durch Füllung, nicht durch Farbwechsel.
5. **Kontext bleibt sichtbar.** Zoom und Apollo halten Dauer/Datum/Zeitzone links bzw. oben, während das Formular läuft.
6. **Typo-Spreizung ist gering in Produkt-UI (1.2:1:0.8), groß in Marketing (4:1).** Lemon Squeezy und Clerk Headlines ≈ 4–4.5× Body; Zoom, Apollo, Miro-Formular bleiben unter 2.2×.
7. **Zentrierung als Default für Marketing** (Lemon Squeezy, Clerk, Zendesk, Apollo-Booking-Titel); linksbündig nur in Formularen und Admin.
8. **Muted-Text ist überall ~60–65 % der Ink-Farbe**, nicht ein anderes Grau: Lemon Squeezy Weiß→`#B9AEFF`, Clerk Weiß→`#9A9AA6`, Zoom Ink→`#8A8A94`.

## Farblogik als Rollentabelle (aus dem Paket gesammelt)

| Rolle | Hell (Zoom/Apollo/Miro/Zendesk) | Dunkel (Clerk) | Farbig (Lemon Squeezy) |
|---|---|---|---|
| Page | `#FFFFFF` / `#F7F7F8` / `#F3F3F1` | `#151518` | `#4B2BE5` |
| Surface (Karte) | `#FFFFFF` | — (Linien statt Fläche) | — |
| Raised (Button 2. Ordnung) | `#E8E8EA` (Zoom Back), `#F3F3F5` (Suchfeld) | `#2A2A31`–`#2E2E35` | — |
| Border | `#E4E4E8`, `#DCDCE0`, `#C9C9CE` (Input) | `#2E2E36`, dashed für Add-on | — |
| Text/Ink | `#1B1B1F`, `#050038`, `#03363D` (Petrol) | `#FFFFFF` | `#FFFFFF` |
| Muted | `#6B6B75`–`#9A9AA3` | `#9A9AA6` | `#B9AEFF` |
| Action | `#0B5CFF` / `#1E6FE8` / `#4262FF` / Petrol `#03363D` | Cyan `#48D2FF` (Empfehlung), Pill `#2A2A31` | `#FFFFFF` |
| Selected | Blau gefüllt + weißer Text (Apollo), `#EAF1FF` Fläche (Apollo Admin) | — | — |
| Accent-Text | — | `#7FA8FF` im Satz | — |
| Money/Warn | `#FFE600` (Apollo Admin) | — | — |

## Spacing-Rhythmus (in Vorschau-px, relativ zu Body ≈ 8–9 px)

- Input-Höhe 20–24 px (≈ 2.5 Body), Gap zwischen gestapelten Feldern 8 px (Miro) bzw. 18 px mit Label (Zoom).
- Button-Höhe: Produkt 16–24 px (≈ 2 Body), Marketing-CTA 30 px (≈ 3.5 Body), Padding horizontal ≈ 2.5× vertikal.
- Karten-Innenpadding 10–18 px; Karten-Gap 8–12 px; Band-Gap Zendesk 8 px.
- Hero: 80–96 px oben frei, Headline→Sub ≈ 0.5 Zeilenhöhe der Headline, Sub→CTA ≈ 24 px.
- Trennlinien-Abstand vertikal (Zoom) 12–15 px; Kalenderzeilen 25 px.
- Content-Breite: Formular 33–52 %, Booking-Karte 64 %, Proof-Bänder 79 %, Pricing-Tabelle 84 %, Hero-Textzeile ≤ 62 %.

## Dos

- Flächen mit 1-px-Border trennen, Schatten unter 6 % Alpha oder gar nicht.
- Eine Action-Farbe pro Screen; Auswahl als Outline, Fortschritt als Füllung derselben Farbe.
- Labels außen und Pflichtstern sichtbar (Zoom-Muster), nicht Placeholder-only (Miro).
- Termin-/Angebotskontext neben dem Formular stehen lassen.
- Preiszahl 3× Body, Einheit klein und Baseline-bündig daneben.
- Add-ons durch gestrichelte Trennlinie und Checkbox von Plänen unterscheiden.
- Punktraster und Glow als CSS (`radial-gradient`, `filter:blur`), nur echtes 3D als Rasterasset.
- Hero-Textzeile auf ≤ 22 ch begrenzen und via `clamp()` skalieren; Umbruch mit deutschem Text prüfen.
- Muted-Text als Opazität der Ink-Farbe definieren, nicht als eigenes Grau.

## Don'ts

- Kennzahlen kleiner als ihre Labels setzen (Zendesk 4ae34544, Band 3).
- Neun Placeholder-Felder ohne Labels für Erstkontakt (Miro 270f478a).
- Fragmentierte Animationsstände als Hero-Vorlage nehmen (OFF+BRAND 1c082bfd).
- Admin-Dashboard-Muster (Sidebar, Gelb-Buttons) in die öffentliche Buchungsreise ziehen (Apollo 50e13805).
- Violett, Dark-Glow, Punktraster und Pills aus verschiedenen Marken zu einem Stil mischen.
- Chat-Bubble oder Hilfe-Kreis ohne echten Kanal (Zendesk, Apollo Admin).
- Layout-Sprung beim Auswählen (Apollo Confirm halbiert den Slot) ohne reservierten Platz.
- Leiterbahn-Muster oder 3D-Assets ungefiltert auf Mobile ausliefern.

## Mobile-Hinweise

Kein Bild zeigt einen Mobile-Zustand. Ableitungen: Apollo-Karte (3 Spalten) muss zu gestapelten Schritten werden; Clerk-Tabelle zu einer Spalte mit Add-ons als eigener Abschnitt; Zendesk-Bänder zu 1 Spalte; Zoom-Spalte (33 %) und Miro-Karte (52 %) funktionieren mobil fast unverändert bei `max-inline-size:100%`. OFF+BRAND zeigt einen Hamburger unten rechts — einziges mobiles Nav-Muster im Paket, aber ohne Kontext.

## Unlesbar / nicht belegt

- `1c082bfd` (OFF+BRAND): gesamter Zentralinhalt unlesbar.
- `5125964c` (Clerk): Feature-Listen unterhalb y≈470 abgeschnitten; Leiterbahn-Muster nur grob erkennbar.
- `3f3f8266` (Apollo): Zeitslot-Liste unten abgeschnitten; Hover/Fokus-Zustände nicht sichtbar.
- Alle: Schriftfamilien, echte CSS-Werte, Breakpoints, Kontrastwerte nicht belegt — nur Sichtschätzung.
