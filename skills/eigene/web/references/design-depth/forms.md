# Forms — Inputs, Selects, Booking-Flows, Auth, Validierung, Multi-Step, Bestätigung

Stand: 2026-09-07. Corpus: 53 Einzelanalysen unter `../studies/design-depth/deep/`. Jede Zahl unten ist entweder **gemessen** (Analyse-Datei genannt) oder als **Startwert (eigen)** markiert. Alle Bauanleitungen sind eigene Umsetzungen, keine kopierten Assets.

## TLDR

Ein Formular gewinnt, wenn genau ein Element dunkel ist (Submit oder gewählter Zustand), Labels sichtbar über dem Feld stehen und der Kontext des Offers neben der Eingabe bleibt.

## Regeln

### R1 Label sichtbar über dem Feld, Pflicht im Label, nie Placeholder-only
- Zoom Scheduler: Labels Semibold über dem Input, Gap Label→Input 4 px (Vorschau-px), Pflichtstern direkt hinter dem Label (`mobbin-1.md` §4, Bild 3d5dcb6c).
- Notion Contact Sales: Labels 11–12 px, roter Stern `#D0342C`, 4 px zum Input (`mobbin-3.md` Bild 7, fcfe2d50).
- shadcn Field: Label 14/500 → Control h36 → Hint 14 Muted → Error; Gap 8 im Feld, 24 zwischen Feldern (`shadcn.md` §4, field.png y488–645).
- Gegenbeleg: Miro mit neun Placeholder-only-Feldern (`mobbin-1.md` §3, 270f478a) und Airtable mit fünf grauen Fill-Inputs ohne Label (`mobbin-3.md` Bild 6, faecc3dd) sind als Anti-Muster gewertet.
- Ausnahme mit Grund: Ein-Frage-Wizard, wo die H2 das Label ist (`2096192737867350330.md` §1.4).

### R2 Eine Aktionsfarbe; Auswahl und Fortschritt trennen sich durch Füllung, nicht durch Hue
- Apollo Booking: gewählter Slot = Outline Blau, Confirm = gefülltes Blau `#1E6FE8` (`mobbin-1.md` §5, 3f3f8266).
- Kargul-Wizard: unselected Chip = nur Text `#5a5a5a`, selected = weisse Pille + 600, Continue = `#252525` (`2096192737867350330.md` §2.2, contact-02).
- Nexora Checkout: genau vier dunkle Flächen (Pro-Karte, Card-Tab, Monthly-Segment, CTA) in `#141b23–#161f26`, Rest Creme (`2096929195381457078.md` §9).

### R3 Fokus als 2–3-px-Ring in Aktionsfarbe, sonst ist das Feld auf Weiss unsichtbar
- Zoom-Form: 2-px-Ring `#0B5CFF` auf First Name, Caret sichtbar (`mobbin-2.md` §6, 82c8b5bc y≈198).
- shadcn: Border `--ring` + 3 px Ring 50 % für Input, Select, Button identisch (`shadcn.md` §4, dialog-open.png Name-Feld).
- designmd.supply: `focus-within` Border ink/40 + Ring 4 px ink/5 (`designmd_supply.md` §1.4, domain-search.tsx:34–60).
- Gegenbeleg: Kargul-Inputs ohne Border und ohne Ring, Fokus nur über Caret (`2096192737867350330-video-2.md` Zeile 43, second-18).

### R4 Kontext des Offers bleibt neben oder über dem Formular
- Zoom: Titel, Host, drei Icon-Metazeilen zwischen zwei 1-px-Linien über dem Formular (`mobbin-1.md` §4; `mobbin-2.md` §6).
- Apollo Schritt 5: linke Spalte mit Dauer, Ort, Datum, Zeitzone neben „Enter details“ (`mobbin-3.md` Bild 5, f3406a72).
- Notion: Logos + Zitat links, Formular rechts; Airtable: Support-Abzweig oben rechts in der Karte (`mobbin-3.md` Bild 6–7).

### R5 Inputs teilen Radius-Familie und Höhe mit den Buttons der Seite
- Produkt-UI: Radius 3–5 px (Apollo 3, Notion 3, Miro 4, Zoom 4) (`mobbin-3.md` Gemeinsamkeiten 1; `mobbin-1.md` Gemeinsamkeiten 2).
- Pill-Familie: Neuform Input 46 px Radius 999 = CTA-Höhe 46 (`neuform-1.md` §1.2, 01-home-desktop.png y472–518); Kargul Input 416×52 = Button 52 (`2096192737867350330.md` §1.4).
- Dashboard: Filter-Chips und Suchfeld teilen Höhe 1.75f, 1-px-Border, Radius 0.35f (`2096660897628668066.md` §4).

### R6 Feldhöhe: 36–46 px Desktop, mind. 44 px Touch; Input-Schrift 16 px auf Mobile
- shadcn h36 (`shadcn.md` §4); Zoom ~36 px CSS (`mobbin-2.md` §6); Neuform 46 px Desktop, 42 px Mobile (`neuform-1.md` §1.2, §3).
- designmd.supply: `text-base/6 sm:text-sm/5` → 16 px Mobile gegen iOS-Zoom, 14 px Desktop (`designmd_supply.md` §1.4, domain-search.tsx:48).
- Prior Corpus: `min-height:44px` (`prior_corpus.md` §1.7, taste-SKILL.md:231).
- Gegenbeleg: Rox-Modal 26 px Inputs „für Touch zu klein“ (`refero-1.md` §5).

### R7 Label-im-Feld nur als statisches Zwei-Zeilen-Feld, nie als Float-Animation
- Nexora: Feld 70 px, Label 12 px Muted oben, Wert 15 px Ink darunter, Radius 10, 1 px `#eeedeb` (`2096929195381457078.md` §5, image-1.jpg y288–442).
- Acne Studios: Fläche `#f4f4f4` 50 px, Label 9 px Uppercase oben, Wert 14 px, 6 px Gap (`refero-1.md` §6, 3acf3200).

### R8 Fehler dreifach codieren: Feldfläche/Border, Textfarbe, Fehlerzeile direkt unter dem Feld
- Rox Payment-Modal: Feld-Fill `#f6ccd0`, Text `#c9282e`, Fehlertext 11 px 8 px darunter, Save disabled (`refero-1.md` §5, 49229bf2 y154–180).
- shadcn: `aria-invalid` → Border destructive + 3 px Ring destructive/20, `FieldError` unter dem Hilfetext (`shadcn.md` §4).
- Beweis der Lücke: `card-invalid.png` zeigt, dass native `checkValidity()` keine Optik auslöst (`shadcn.md` §3).
- Prior Corpus: Error unter Input, Meldung erklärt Reparatur, Eingaben bleiben erhalten (`prior_corpus.md` §1.7, REPORT.md:70).

### R9 Multi-Step: ein Screen, eine Frage, ein Primär-Button; optional = „Skip for now“ statt disabled
- Kargul: 12 Screens, H2 ≈54 px, Input, Back-Textlink + Continue-Pille 114×52, Gap 32 px; Continue disabled `#9b9b9b` bis valide (`2096192737867350330.md` §1.4, §3).
- URL-Schritt: Label wechselt von „Skip for now“ zu „Continue“, sobald Text vorhanden (`2096192737867350330.md` §2.1, second-19).
- Fortschritt: 320×8 px Pille fixed unten, Fill `#1e1e1e`, Steps 8 %→100 % (`2096192737867350330.md` §1.7).
- Nexora: Step-Badge „STEP 1 OF 2“ Pill 96×24 `#fbe4d4` (`2096929195381457078.md` §3).

### R10 Chips/Radio-Gruppen: Auswahl = Materialwechsel, Gruppe wrapt zentriert
- Kargul: `.chips{gap:12px 40px;max-width:520px}`, selected weisse 54-px-Pille + 700 (`2096192737867350330-video-2.md` Zeile 51–56, second-20/21).
- Gemessener Fehler: Bold-Wechsel verschiebt Nachbarchips um 9–10 px (`2096192737867350330-video-2.md` Zeile 56) → Breite reservieren.

### R11 Segmented Control: Track eine Stufe dunkler, aktives Segment weiss oder Aktionsfarbe, 2–5 px Inset
- Track `#f4f4f4`, aktiv weiss + Schatten `0 1px 2px` (`2096618423983964587.md` §Segmented, x0–218 y800–860).
- Milchiger Track rgba(255,255,255,.42) 215×54, Thumb weiss 2 px Inset (`2096674796704813174.md`, image-1.jpg x877–1522).
- Dark: Container `#2a2a2a` 3 px Padding, aktiv weiss, inaktiv `#9a9a9a` (`2096175237109092642-video-1.md` frame-07).
- designmd.me: aktives Segment volle Aktionsfarbe `#4E81EE`, 5 px Inset (`designmd-me-1.md` §5).

### R12 Checkbox: nie vorangehakt; Grösse 16–36 px je nach System; checked = Ink-Fill + Haken
- Notion: 16 px, Radius 2, Fill Ink, im Original vorangehakt → nicht übernehmen (`mobbin-3.md` Bild 7).
- Dashboard: 22 px, Radius 5, Border `#2A2A2A`, checked weiss mit schwarzem Haken (`2096499167225078020.md`, HRhCVKDa0AAPb27 x=610).
- Kargul Fit-Check: 34–36-px-Kreise `#e6e6e6` → `#222`, aber ohne Haken → als Schwäche notiert (`2096192737867350330.md` §1.3).

### R13 Select braucht Chevron, Placeholder heller als Wert
- Miro/Apollo Selects mit Chevron rechts, gleiche Höhe wie Inputs (`mobbin-1.md` §3, 270f478a x558).
- Gegenbeleg: Oqulus „All Plans / All Status“ ohne Pfeil, Placeholder `#4A4A4A` wie Wert (`2096660897628668066.md` §4).
- Placeholder-Werte gemessen: `#9A9A9A` (Notion/Apollo), `#8a8a8a` (Kargul), muted/70 (designmd.supply).

### R14 Suchfeld: 34–46 px, Lupe links, Kbd-Chip rechts, Fill = Page oder Raised, 1 px Border
- 34 px Pill `#fffbf8` + `⌘K` (`2096832279775486079.md` §Topbar); 45 px `#0C0F14` + `⌘K` (`2096891182701793331.md` Zeile 70); 46 px weiss Radius 12 + `/` (`2096889729337921598.md` Zeile 66); 40 px Radius 8 `#D4D4D4` mit nativem Clear (`open_design.md` §2.4); 46 px `#F3F3F5` ohne Border (`2096215770783199316.md`).
- Hero-Suche als Primäraktion: 56 px Pill, rechts 40-px-Ink-Kreis mit Pfeil (`designmd_supply.md` §1.4, 01-home-desktop.png y408–464).

### R15 Auth-Screen: Social-CTA hell → „OR“-Divider → Label-Zeile mit Hilfslink rechts → ein Input → ein Button
- Neuform: Google-Pille 322×46 `#F4F1EA`, OR mit zwei 1-px-Linien, Label „EMAIL / FORGOT“ Mono 10.5 px Tracking .2em, Input 46 px (`neuform-1.md` §1.2).
- shadcn Login-Card: „Forgot your password?“ per `ml-auto` auf der Label-Zeile, Footer `bg-muted/50` mit zwei Full-Width-Buttons (`shadcn.md` §3, card.png).
- Forgot-Screen: Halo statt Schatten, ein blauer Button `#5B63F0` als hellster Fleck; Fehler: drei Blautöne (`neuform-1.md` §5).

### R16 Bestätigung: Icon → H1 → Kontextsatz → Detail-dl → gleichrangige Korrektur-Buttons → Sekundärlink
- Zoom „Confirmed“: Success-Haken `#22C55E`, Detailblock mit 1-px-Border oben, Reschedule/Cancel je `flex:1` Outline (`mobbin-2.md` §1, 624b905e).
- Apollo „Booking complete!“: Kreis 96 px `#1DBF9B`, nested Detail-Karte, Hilfe-Banner Navy (`mobbin-2.md` §3).
- Kargul „Yay, you're booked!“: monochromes Konfetti, aber ohne Terminzusammenfassung → Fehler (`2096192737867350330.md` §2.4).

### R17 Formular-Aktionen: rechtsbündig in Karten/Dialogen, linksbündig klein bei Kontext-Spalte, full-width nur in schmalen Karten
- Zoom: Back grau + Book blau rechts (`mobbin-2.md` §6 y≈393–408); shadcn Dialog-Footer rechts, mobil `column-reverse` (`shadcn.md` §5).
- Apollo/Notion: Submit klein, linksbündig (`mobbin-3.md` Gemeinsamkeiten 7).
- Airtable/Miro: full-width in 400–540-px-Karte (`mobbin-1.md` §3; `mobbin-3.md` Bild 6).

### R18 Ab ~8 Feldern Zwei-Spalten-Grid; Textarea, Grund-Select, Checkbox, Button spannen volle Breite
- Notion: 2 Spalten je ~120 px Vorschau, Gap 14, `span 2` für Reason/Details (`mobbin-3.md` Bild 7).
- Rox: Gruppenlabel links 1fr, Felder rechts 1.6fr, 1-px-Divider zwischen Gruppen (`refero-1.md` §5).
- shadcn: `grid-cols-3 gap-4` für Month/Year/CVV; responsive Orientation per Container Query (`shadcn.md` §4, field.md:91/1106).

## Bauanleitungen

### B1 Feld-Anatomie (Basis, alle Stilfamilien)
```html
<div class="field" data-invalid="false">
  <label for="email">E-Mail <span aria-hidden="true">*</span></label>
  <input id="email" type="email" required aria-describedby="email-help email-err" autocomplete="email">
  <p id="email-help" class="help">Wir antworten innerhalb von 24 h.</p>
  <p id="email-err" class="err" role="alert" hidden>Bitte eine gültige E-Mail eintragen.</p>
</div>
```
```css
.field{display:grid;gap:8px}                 /* shadcn.md §4, prior_corpus.md §1.7 */
.field+.field{margin-top:24px}               /* shadcn.md §4 gap-6 */
label{font:500 14px/1.2 var(--sans);color:var(--ink)}
input,select,textarea{min-height:44px;padding:0 12px;border:1px solid var(--border);border-radius:var(--r-input);background:var(--surface);font:inherit;font-size:16px}
@media(min-width:640px){input,select,textarea{font-size:14px;min-height:36px}}  /* designmd_supply.md domain-search.tsx:48 */
::placeholder{color:var(--muted)}            /* #9A9A9A gemessen mobbin-3.md */
input:focus-visible{outline:none;border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in oklch,var(--ring) 50%,transparent)}
.help{font-size:13px;color:var(--muted)}
.err{font-size:13px;color:var(--danger)}
[data-invalid=true] input{border-color:var(--danger);box-shadow:0 0 0 3px color-mix(in oklch,var(--danger) 20%,transparent)}
[data-invalid=true] label{color:var(--danger)}
select{appearance:none;padding-right:32px;background:var(--surface) url("data:image/svg+xml,...chevron") right 10px center/12px no-repeat}  /* mobbin-1.md §3 */
```

### B2 Label-Zeile mit Hilfslink (Auth)
```html
<div class="label-row"><label for="pw">Passwort</label><a href="/forgot">Vergessen?</a></div>
<input id="pw" type="password" autocomplete="current-password">
```
```css
.label-row{display:flex;align-items:center}
.label-row a{margin-left:auto;font-size:14px;text-underline-offset:4px}   /* shadcn.md §3 card.md:51 */
.label-row a:hover{text-decoration:underline}
/* Mono-Variante: font:400 10.5px monospace;letter-spacing:.2em;text-transform:uppercase;color:#8A8A90 (neuform-1.md §1.2) */
```

### B3 „OR“-Divider und Social-CTA
```html
<button class="btn-social"><svg class="g"/><span>Mit Google fortfahren</span><i class="disc"><svg class="arrow"/></i></button>
<p class="or">oder</p>
```
```css
.btn-social{display:grid;grid-template-columns:18px 1fr 34px;align-items:center;gap:12px;height:46px;padding:0 6px 0 20px;border-radius:999px;background:#F4F1EA;color:#141414}   /* neuform-1.md §1.2 */
.btn-social .disc{width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.08);display:grid;place-items:center}
.or{display:flex;align-items:center;gap:12px;font:10px monospace;letter-spacing:.2em;text-transform:uppercase;color:#7C7C82}
.or::before,.or::after{content:"";flex:1;height:1px;background:rgba(255,255,255,.12)}
```

### B4 Statisches Zwei-Zeilen-Feld (Checkout-Stil)
```html
<label class="field2"><span>Kartennummer</span><input inputmode="numeric" autocomplete="cc-number"><svg class="aux" aria-hidden="true"/></label>
<div class="row2"><label class="field2"><span>Gültig bis</span><input placeholder="MM / YY"></label><label class="field2"><span>CVC</span><input placeholder="123"></label></div>
```
```css
.field2{position:relative;display:flex;flex-direction:column;gap:6px;min-height:70px;padding:14px 16px;border:1px solid #eeedeb;border-radius:10px;background:#fcf8f5}  /* 2096929195381457078.md §5 */
.field2 span{font-size:12px;color:#8a8a8a}
.field2 input{border:0;background:none;font-size:15px;color:#1a1a1a;outline:none}
.field2:focus-within{border-color:#141b23}
.field2 .aux{position:absolute;right:16px;top:50%;translate:0 -50%}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
```

### B5 Chip-Gruppe als Radio (Wizard)
```html
<fieldset class="chips"><legend class="sr-only">Budget</legend>
  <label class="chip"><input type="radio" name="budget" class="sr-only"><span>10–20 K</span></label>
  <label class="chip"><input type="radio" name="budget" class="sr-only"><span>20–50 K</span></label>
</fieldset>
```
```css
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 40px;max-width:520px;margin-inline:auto;border:0}  /* 2096192737867350330.md §2.2 */
.chip span{display:inline-block;height:44px;line-height:44px;padding:0 18px;border-radius:999px;color:#5a5a5a;font-size:16px}
.chip span::after{content:attr(data-label);display:block;height:0;font-weight:700;visibility:hidden}  /* Startwert (eigen): Breite für Bold reservieren, Sprung aus video-2 Zeile 56 vermeiden */
.chip input:checked+span{background:#fff;color:#1a1a1a;font-weight:700}
.chip:has(:focus-visible) span{outline:2px solid #222;outline-offset:2px}
```

### B6 Segmented Control
```html
<div role="radiogroup" class="seg" aria-label="Abrechnung">
  <label><input type="radio" name="bill" checked class="sr-only"><span>Monatlich</span></label>
  <label><input type="radio" name="bill" class="sr-only"><span>Jährlich</span></label>
</div>
```
```css
.seg{display:inline-flex;padding:3px;border-radius:999px;background:#f4f4f4}          /* 2096618423983964587.md, 2096929195381457078.md §4 */
.seg span{display:inline-block;padding:0 14px;line-height:30px;border-radius:999px;color:#6d6e73;font-size:13px}
.seg input:checked+span{background:#fff;color:#0a0a0a;font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.seg--ink input:checked+span{background:#1c2128;color:#fff;box-shadow:none}              /* Nexora-Variante */
```

### B7 Multi-Step-Wizard mit Fortschritt
```html
<main class="step" aria-labelledby="q3">
  <h2 id="q3">Wie heisst dein Unternehmen?</h2>
  <input class="pill-input" aria-label="Unternehmen" placeholder="Firma…">
  <div class="actions"><button type="button" class="link">Zurück</button><button class="primary" disabled>Weiter</button></div>
</main>
<div class="progress" role="progressbar" aria-valuenow="3" aria-valuemax="12" aria-valuetext="Schritt 3 von 12"><i style="--p:25%"></i></div>
```
```css
.step{min-height:100dvh;display:grid;place-content:center;justify-items:center;gap:36px;text-align:center}  /* video-2 Zeile 110: Headline→Control 36, Control→Buttons 32 */
.pill-input{width:min(416px,100% - 32px);height:52px;border:0;border-radius:999px;padding:0 18px;background:#fff;font-size:16px}
.pill-input:focus-visible{outline:2px solid #222;outline-offset:2px}   /* Ergänzung, im Original fehlend */
.actions{display:flex;gap:32px;align-items:center}
.primary{height:52px;padding:0 24px;border-radius:999px;background:#252525;color:#fff;font-weight:600}
.primary:disabled{background:#9b9b9b;color:#f5f5f5;cursor:not-allowed}
.progress{position:fixed;bottom:20px;left:50%;translate:-50% 0;width:min(320px,60vw);height:8px;border-radius:999px;background:#fff;overflow:hidden}
.progress i{display:block;height:100%;width:var(--p);background:#1e1e1e;transition:width .4s ease}
@media(prefers-reduced-motion:reduce){.progress i{transition:none}}
```
Regel im Script: optionales Feld → Label des Primär-Buttons `value ? "Weiter" : "Vorerst überspringen"`, kein disabled (`2096192737867350330.md` §2.1). Fortschritt erst nach Server-Antwort auf 100 % (`video-2.md` Zeile 161).

### B8 Booking-Kalender + Slots
```html
<section class="book">
  <aside class="ctx"><h2>30-Minuten-Gespräch</h2><dl class="meta"><div><svg/><dd>30 Min</dd></div><div><svg/><dd>Zoom</dd></div></dl></aside>
  <div class="cal"><ol role="grid">…<li><button class="day" aria-pressed="true">14</button></li>…</ol></div>
  <ul class="slots"><li><button class="slot">09:30</button></li><li class="picked"><button class="slot" aria-pressed="true">09:45</button><button class="confirm">Bestätigen</button></li></ul>
</section>
```
```css
.book{display:grid;grid-template-columns:150fr 220fr 120fr;border:1px solid #e4e4e8;border-radius:4px;background:#fff}  /* mobbin-3.md Bild 3 */
.book>*{padding:12px}.book>*+*{border-left:1px solid #e4e4e8}
.day{width:36px;aspect-ratio:1;border-radius:50%;background:#eee;font-weight:600}
.day:disabled{background:none;color:#8a8a8a;font-weight:400}
.day.today{box-shadow:inset 0 0 0 1px #2f7fe5;color:#2f7fe5;background:#fff}
.day[aria-pressed=true]{background:#2f7fe5;color:#fff}
.slots{display:grid;gap:6px;max-height:320px;overflow:auto;mask-image:linear-gradient(#000 calc(100% - 32px),transparent)}  /* Fade statt harter Kante, mobbin-3.md Bild 3 Slop */
.slot{width:100%;height:36px;border:1px solid #c9c9c9;border-radius:3px;background:#fff}
.picked{display:grid;grid-template-columns:1fr 1fr;gap:6px}     /* Platz reservieren: mobbin-1.md §5 Layout-Sprung */
.picked .slot{border-color:#1e6fe8;color:#1e6fe8}
.confirm{height:36px;border-radius:3px;background:#1e6fe8;color:#fff;border:0}
@media(max-width:720px){.book{grid-template-columns:1fr}.book>*+*{border-left:0;border-top:1px solid #e4e4e8}}
```

### B9 Bestätigungs-Screen
```html
<main class="done">
  <svg class="ok" aria-hidden="true"/><h1>Bestätigt</h1><p>Du bist gebucht mit <strong>Sam Lee</strong>.</p>
  <section class="summary"><h2>Mentoring Session</h2><ul><li><svg/>Fr, 13. Dez, 09:30–10:00</li><li><svg/>Europe/Berlin</li><li><svg/>Zoom-Link</li></ul></section>
  <div class="fix"><button class="outline">Verschieben</button><button class="outline">Absagen</button></div>
  <a class="more">Weiteren Termin buchen</a>
</main>
```
```css
.done{max-width:460px;margin-inline:auto;text-align:center;display:grid;gap:16px}   /* mobbin-2.md §1 ~460 px CSS */
.ok{width:48px;height:48px;color:#22C55E}
.summary{text-align:left;border-top:1px solid #e4e4e7;padding-top:16px}
.summary li{display:flex;gap:8px;align-items:flex-start;font-size:.85rem;overflow-wrap:anywhere}
.fix{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.outline{height:32px;border:1px solid #d4d4db;border-radius:3px;background:#fff}
```

### B10 Suchfeld mit Kbd-Hint
```html
<form class="search" role="search"><svg class="lupe"/><input type="search" placeholder="Projekte, Personen…"><kbd>⌘K</kbd></form>
```
```css
.search{display:flex;align-items:center;gap:10px;height:40px;padding:0 10px 0 14px;border:1px solid #e4e4e4;border-radius:10px;background:#fff}  /* 2096618423983964587.md; Pill-Variante 34 px 2096832279775486079.md */
.search input{flex:1;border:0;outline:0;background:none;font:inherit;min-width:0}
.search input::placeholder{color:#8a8a8a}
.search kbd{font:11px var(--sans);padding:3px 6px;border-radius:5px;background:#f0ebe6;color:#6f6a66;border:1px solid #e0e0e0}
```

## Varianten je Stilfamilie

| Stilfamilie | Input | Radius | Border | Fokus | Beleg |
|---|---|---|---|---|---|
| Produkt-Tool hell (Zoom, Apollo, Notion, Miro) | 28–36 px, weiss | 3–4 px | 1 px `#C9C9C9–#DCDCE0` | 2 px Ring Blau | `mobbin-1.md`, `mobbin-3.md` |
| Design-System neutral (shadcn) | h36, Fläche input/30 | 8 px (radius×.8) | 1 px weiss 15 % | Border ring + 3 px ring/50 | `shadcn.md` §4 |
| Wizard monochrom (Kargul) | 52 px Pille, weiss auf `#eee` | 999 | keine | fehlt → ergänzen | `2096192737867350330.md` |
| Checkout warm (Nexora) | 70 px Zwei-Zeilen-Feld `#fcf8f5` | 10 px | 1 px `#eeedeb` | unbelegt | `2096929195381457078.md` §5 |
| Fashion-Editorial (Acne) | 50 px Fläche `#f4f4f4` | 0 | keine | unbelegt | `refero-1.md` §6 |
| Dark-Auth (Neuform) | 46 px Pille `#1B1B1E` | 999 | 1 px weiss 10 % | unbelegt | `neuform-1.md` §1.2 |
| Dark-Dashboard (alidalton, Oqulus dark) | 45–56 px, Page-Fill | 10–12 px | 1 px `#1E242C` | unbelegt | `2096891182701793331.md`, `2096499167225078020.md` |
| Newsletter brutal (Launchkit) | 30–32 px weiss, Versalien-Placeholder | 0 | 0, Button weiss | unbelegt | `2096292759489609818.md`, `aakib-tiles.md` §3.8 |
| Hero-Suche (designmd.supply, Gumroad) | 56–62 px, weiss/Page | 999 bzw. 4 px | Hairline / 1 px `#000` | focus-within Ring 4 px | `designmd_supply.md` §1.4, `refero-2.md` Gumroad |
| Composer/Chat (Vault, Mango, Claude-Mock) | 53–58 px Pille, Send-Kreis 32–40 px rechts | 999 / 48 px | 1 px oder keine | unbelegt | `2096165490498695410.md` §3.5, `2095784926717300835.md`, `2095928637346472339.md` |

Faustregel: Marketing-Seite → Pillen in CTA-Höhe; Produkt-Formular → 3–8 px Radius in Button-Höhe; nie beide Familien in einem Formular (Square-Bruch, `mobbin-2.md` §2).

## Dos

- Label sichtbar, Pflichtstern im Label, `required` + `aria-describedby` verdrahtet (R1, R8).
- Ein dunkler Submit pro Formular; Sekundär als Grau-Fläche oder Textlink (`mobbin-2.md` §6; `2096192737867350330.md` §1.4).
- Fokusring identisch für Input, Select, Button (`shadcn.md` Gemeinsamkeiten 2).
- Termin-/Offer-Kontext als `dl` mit Icon-Zeilen neben dem Formular halten (R4).
- Skeleton-Slots im selben Grid wie echte Slots laden (`2096192737867350330.md` §1.6).
- Disabled als eigener Grauwert `#9b9b9b`, nicht Opacity (`video-2.md` Zeile 149); besser: aktiv lassen und validieren (`mobbin-2.md` Don'ts).
- Erfolg als eigener Token (Grün `#22C55E` / `#1DBF9B` / `#3f8a55`), nie Aktionsblau (`mobbin-2.md` Gemeinsamkeiten 3; `2096929195381457078.md` §6).
- Discount-/Optionsblöcke als `<details open>` mit Status `role="status"` (`2096929195381457078.md` §5).
- Rechnung sichtbar und stimmig direkt über dem CTA (`2096929195381457078.md` §5 Summenblock: 99.90 × 0.7 = 69.93).
- Formular auf Mobile: Spalten stapeln, Input 16 px, Aktionen `column-reverse` mit Primär oben (`shadcn.md` §13).
- Optionale Felder als „optional“-Suffix oder Skip-Label markieren, nicht mit Sternchen-Logik überall (`refero-1.md` §6; `2096192737867350330.md` §2.1).

## Don'ts (mit Gegenbeispiel aus dem Corpus)

- **Placeholder-only-Formular.** Miro: neun Felder ohne Label, Bedeutung verschwindet nach Eingabe (`mobbin-1.md` §3, 270f478a). Airtable: fünf `#F2F2F2`-Fill-Inputs ohne Label (`mobbin-3.md` Bild 6).
- **Marketing-Consent vorangehakt.** Notion Checkbox `checked` im Original (`mobbin-3.md` Bild 7, y 323).
- **Input ohne Fokusring auf weissem Feld ohne Border.** Kargul second-18: nur Caret (`2096192737867350330-video-2.md` Zeile 43).
- **Hover = Selected.** Kargul Slots: beide `#f2f2f2` + 600, nicht unterscheidbar (`2096192737867350330.md` §1.6, second-14).
- **Grau-Hover auf Outline-Blau, wenn Grau anderswo disabled heisst.** Zoom Wochenansicht 6:30 AM (`mobbin-2.md` §5).
- **Layout-Sprung bei Auswahl.** Apollo Confirm halbiert den Slot ohne reservierten Platz (`mobbin-1.md` §5); Kargul Bold-Chip schiebt Nachbarn (`video-2.md` Zeile 56).
- **Select ohne Chevron, Placeholder in Textfarbe.** Oqulus „All Plans“, „Search…“ in `#4A4A4A` (`2096660897628668066.md` §4).
- **Fehlerfläche über das ganze Feld, obwohl nur ein Teil falsch ist.** Rox: „MM / YY CVC“ bleibt im roten Kartenfeld (`refero-1.md` §5).
- **Disabled-Submit ohne Erklärung.** Zoom Book `#E5E7EB` (`mobbin-2.md` §6); Kargul Continue `#9b9b9b` (`2096192737867350330.md` §1.3).
- **Progress vor Submit auf 100 %.** Kargul second-28 (`video-2.md` Zeile 87).
- **Bestätigung ohne Terminzusammenfassung.** Kargul „Yay, you're booked!“ (`2096192737867350330.md` §2.4). Zoom-Link abgeschnitten ohne `overflow-wrap:anywhere` (`mobbin-2.md` §1).
- **Konfetti ohne Backend-Erfolg und ohne Reduced-Motion.** Apollo (`mobbin-2.md` §3).
- **Scroll-Liste hart abschneiden.** Apollo Zeitspalte ohne Fade/Scrollbar (`mobbin-3.md` Bild 3).
- **Inputs 26 px im Modal.** Rox (`refero-1.md` §5). Icon-Buttons 24–26 px (`neuform-1.md` §11).
- **Drei Blautöne in einem Auth-Screen.** Neuform Forgot: `#7F98FF`, `#8FA4FF`, `#5B63F0` (`neuform-1.md` §5).
- **Composer als Bild, das wie ein Input aussieht.** Claude-Mock (`2095928637346472339.md` §Slop). Composer ohne Scroll-Mask über Content (`2096165490498695410.md` §3.5).
- **Fixe Badges über Formular/Panel.** designmd.supply Counter über Kartenfuss (`designmd_supply.md` §1.4).
- **Inkonsistente Optionswerte.** „$50k“ vs „$20K“ (`2096192737867350330.md` §2.2).
- **Testdaten sichtbar.** Kartennummer 4242… vorbefüllt (`2096929195381457078.md` §10).

## Gilt nicht wenn

- Ein-Frage-Wizard mit H2 als Label: sichtbares `<label>` darf entfallen, `aria-label` bleibt Pflicht (`2096192737867350330.md` §1.4).
- Hero-Suchfeld als einzige Aktion: Placeholder darf das Label tragen, wenn der Submit-Button ein `aria-label` hat (`designmd_supply.md` §1.4).
- Composer/Chat-Input: Höhe 53–58 px und Pille sind Norm, Zwei-Zeilen-Label passt nicht (`2096165490498695410.md` §3.5).
- Fashion/Editorial-Marken: Radius 0 und Fläche statt Border sind Markenentscheidung, nicht Fehler (`refero-1.md` §6, Acne).
- Admin-Dashboards: 26–36 px Controls sind Produkt-Norm; für Marketing-Formulare nicht übernehmen (`mobbin-1.md` §7; `shadcn.md` §2 Slop-Risiko).
- Dark-Mode-Systeme: Fokus als Ring 50 % Alpha, Border als Weiss-Alpha statt Grau-Hex (`shadcn.md` §8).

## Quellen

- `../studies/design-depth/deep/2096192737867350330.md`, `-video-1.md`, `-video-2.md` — Kargul Booking-Wizard (contact-01/02.jpg, second-*.jpg)
- `../studies/design-depth/deep/mobbin-1.md` — Miro Contact, Zoom Scheduler, Apollo Booking (270f478a, 3d5dcb6c, 3f3f8266)
- `../studies/design-depth/deep/mobbin-2.md` — Zoom Confirmed, Zoom Form, Apollo Complete (624b905e, 82c8b5bc, 6f5acb59)
- `../studies/design-depth/deep/mobbin-3.md` — Apollo Details, Airtable, Notion Contact (f3406a72, faecc3dd, fcfe2d50)
- `../studies/design-depth/deep/shadcn.md` — field.png, card.png, card-invalid.png, dialog-open.png, field.md
- `../studies/design-depth/deep/neuform-1.md` — 01-home-desktop.png, 05-forgot-mobile.png
- `../studies/design-depth/deep/2096929195381457078.md` — Nexora Checkout image-1.jpg
- `../studies/design-depth/deep/refero-1.md` — Rox Payment-Modal (49229bf2), Acne Appointment (3acf3200)
- `../studies/design-depth/deep/refero-2.md` — Gumroad Hero-Suche, Mocha Empty-State-Suche
- `../studies/design-depth/deep/designmd_supply.md` — domain-search.tsx, 01-home-desktop.png
- `../studies/design-depth/deep/designmd-me-1.md` — URL-Card, Toggle, Segmented
- `../studies/design-depth/deep/2096660897628668066.md` — Oqulus Filterleiste
- `../studies/design-depth/deep/2096618423983964587.md`, `2096674796704813174.md`, `2096175237109092642-video-1.md` — Segmented Controls
- `../studies/design-depth/deep/2096832279775486079.md`, `2096891182701793331.md`, `2096889729337921598.md`, `open_design.md`, `2096215770783199316.md`, `2096944343487852961.md` — Suchfelder
- `../studies/design-depth/deep/2096165490498695410.md`, `2095784926717300835.md`, `2095928637346472339.md`, `2095783930775433616.md`, `2096891319843164276.md`, `aakib-tiles.md` — Composer/Frage-Inputs
- `../studies/design-depth/deep/2096499167225078020.md` — Checkbox 22 px, Dark-Suchfeld
- `../studies/design-depth/deep/2096292759489609818.md`, `aakib-tiles.md` — Newsletter-Zeile Radius 0
- `../studies/design-depth/deep/prior_corpus.md` — taste-SKILL.md:228–232, REPORT.md:70
- Original-Bilder: `research/` (bei Unklarheit dort nachmessen)
