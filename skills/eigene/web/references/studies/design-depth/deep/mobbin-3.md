# mobbin-3 — Belegpaket „platform-images“: Apollo-Booking, Runner-Pricing, Airtable- und Notion-Sales-Formulare

Stand: 2026-09-07. Sieben JPEGs, alle mit dem Read-Tool betrachtet. Vorschaubreite 768 px; Originalseiten sind vermutlich 1440 px breit, Faktor ~1,9. Alle px-Angaben sind **Vorschau-px**, mit Faktor in Klammern, wo relevant. Hex-Werte sind Sichtschätzungen, keine extrahierten Tokens. Die dunkle „curated by Mobbin“-Leiste unten ist Quellen-Chrome und gehört nie ins Layout.

Aussagegrenze: Bilder belegen Gestaltung und Zustand, nicht DOM, Fontfamilie, Breakpoints oder Interaktionslogik.

---

## Bild 1 — `90bc1d39-08ec-44ee-a60b-b5d3c0aaf21e.jpg` (Apollo, Datum wählen, Schritt 2)

**Seite / Layout (gesamtes Bild):** Page #FFFFFF, kein Header, keine Nav. Alles zentriert auf einer Achse. Titel oben bei y≈32, Karte y≈73–328, Footer-Zeile y≈346, Wordmark y≈371. Vertikaler Rhythmus: Titel → Subtitle 12 px, Subtitle → Karte 20 px, Karte → Footer 18 px, Footer → Logo 20 px.

**Headline „Book a meeting with Sam Lee“ (Bildmitte oben):** Sans, Semibold ~13 px (≈24 px real), Farbe #1A1A1A, zentriert, kein Tracking, einzeilig. **Subtitle** ~8 px (≈14 px real), Muted #6B6B6B, Regular. Verhältnis Headline:Body ≈1,7:1, also flach, kein Marketing-Hero.

**Karte (x 197–571, ~374 px breit ≈ 700 px real):** Surface #FFFFFF, Border 1 px #E3E3E3, Radius ~4 px, sehr weicher Schatten (0 1px 2px rgba(0,0,0,.05)), kaum sichtbar. Zwei Spalten, getrennt durch eine 1-px-Linie #E8E8E8 bei x≈350; linke Spalte ~150 px, rechte ~220 px. Innen-Padding ~12 px (≈24 px real).

**Linke Spalte „30 minute meeting“:** Titel Semibold ~8 px #1A1A1A. Zwei Meta-Zeilen mit 8-px-Icons (Uhr, Pin) in Muted #8A8A8A, Text ~7 px #4A4A4A, Zeilenhöhe ~1,4, Icon-Text-Gap 6 px. Zeilenabstand 10 px.

**Kalender (rechte Spalte):** Überschrift „Select date“ Semibold ~8 px. Monatszeile „February 2025“ zentriert, Chevrons links/rechts als 8-px-Icons #1A1A1A, Höhe ~16 px. Wochentage SUN…SAT: Versalien ~5,5 px, Muted #6B6B6B, letter-spacing ~0,05em. Tageszellen: Kreise ~19 px (≈36 px real), Grid 7 Spalten, Gap ~6 px horizontal, ~6 px vertikal. Zustände sichtbar:
- Verfügbar: Fill #EEEEEE, Text #1A1A1A.
- Nicht verfügbar (1, 2, 8, 9, 15, 16, 22, 23): kein Fill, Text #4A4A4A, kleiner Kontrastabfall statt Ausgrauen.
- Heute „10“: transparenter Fill, Ring 1 px #2F7FE5, Text #2F7FE5.
- Wochenende ohne Termine: gleiche Behandlung wie „nicht verfügbar“.

**Timezone-Feld (unten rechts):** Label „Time zone“ Bold ~5,5 px #1A1A1A, darunter Select 140×14 px, Border 1 px #C9C9C9, Radius 3 px, Text ~6,5 px, Chevron rechts.

**Footer:** „Sign Up now to create your own booking link with Apollo.io“ ~7 px, Links #2F7FE5 ohne Underline. Wordmark „Apollo.io“ ~11 px, Schwarz, als Logo-SVG.

**Nachbau:**
```html
<main class="book"><h1>Book a meeting with Sam Lee</h1><p class="sub">…</p>
 <section class="card"><aside class="meta">…</aside><div class="cal">…</div></section></main>
```
`.card{display:grid;grid-template-columns:2fr 3fr;border:1px solid #e3e3e3;border-radius:4px;box-shadow:0 1px 2px rgb(0 0 0/.05)} .cal{border-left:1px solid #e8e8e8}` Tage als `<button class="day" aria-pressed>`, `.day{inline-size:36px;aspect-ratio:1;border-radius:50%;background:#eee} .day[disabled]{background:none;color:#4a4a4a} .day.today{box-shadow:inset 0 0 0 1px #2f7fe5;color:#2f7fe5}`.

**Warum es funktioniert:** Eine Farbe (Blau) trägt genau zwei Bedeutungen: heute und Link. Verfügbarkeit wird über Fill statt über Farbe kodiert. Die Karte wächst mit dem Flow (siehe Bild 3), Kontext links bleibt.
**Fehler/Slop:** Nicht verfügbare Tage sind kaum von verfügbaren unterscheidbar (Fill #EEE vs. weiß, Text fast gleich). Kein sichtbarer Fokus-Stil belegt. Subtitle-Kontrast #6B6B6B auf Weiß ist grenzwertig bei 14 px.

---

## Bild 3 — `b9fa282b-64eb-45bc-8125-de49ee0de13c.jpg` (Apollo, Zeit wählen, Schritt 3)

**Karte (x 137–631, ~494 px ≈ 930 px real):** Gleiche Border/Radius/Schatten. Jetzt drei Spalten: Meta ~150, Kalender ~220, Zeiten ~120 px. Zwei 1-px-Trenner bei x≈288 und x≈510. Karte wächst um 120 px nach beiden Seiten, bleibt zentriert; Kalender wandert nicht, nur die Achse verschiebt sich um ~60 px.

**Ausgewählter Tag „14“ (Kalender, Reihe 3, Spalte FRI):** Fill #2F7FE5 (Action/Selected), Text Weiß. Heute „10“ behält Ring. Beide Zustände koexistieren, keine Verwechslung.

**Zeit-Buttons (rechte Spalte):** 9 sichtbar, je ~96×14 px (≈180×28 real), Border 1 px #C9C9C9, Radius 3 px, Fill Weiß, Text ~6,5 px #1A1A1A zentriert, vertikaler Gap ~6 px. Liste beginnt direkt unter „Select time“ (Semibold ~8 px), letzter Button bei y≈272 vom Kartenrand abgeschnitten → Scroll-Container ohne sichtbaren Fade oder Scrollbar.

**Nachbau:** `.card{grid-template-columns:150fr 220fr 120fr}` bzw. `auto 1fr auto`. Zeiten als `<ul role="list">` mit `<button>`: `.slot{inline-size:100%;block-size:28px;border:1px solid #c9c9c9;border-radius:3px;background:#fff;font-size:13px}` Container `max-block-size:…;overflow:auto`. Ausgewählter Tag `.day[aria-pressed=true]{background:#2f7fe5;color:#fff}`.

**Warum:** Progressive Offenlegung: Zeitspalte erscheint erst nach Datum, Kartenbreite signalisiert Fortschritt. Outline-Buttons für Optionen, Fill nur für den gewählten Zustand.
**Slop:** Abgeschnittene Zeitliste ohne Scroll-Hinweis. Kein Hover/Fokus belegt. Wachsende Karte springt auf Mobile — dort muss die Zeitspalte unter den Kalender.

---

## Bild 5 — `f3406a72-8cb1-4c5b-969f-47eabef921cb.jpg` (Apollo, Details leer, Schritt 5)

**Karte (x 211–557, ~346 px ≈ 650 px real):** Karte schrumpft wieder. Zwei Spalten 148 + 198 px, Trenner bei x≈359.

**„Go back“ (links oben in der Karte):** Chevron-links-Icon 5 px + Text ~6,5 px, beides #2F7FE5. Kein Button-Rahmen, reiner Link. Abstand zum Titel darunter 14 px.

**Zusammenfassung links:** Titel „30 minute meeting“ Semibold ~8 px. Vier Meta-Zeilen mit Icons (Uhr, Pin, Kalender, Globus) Muted #8A8A8A, Text ~6,5 px #4A4A4A. Datum/Zeit in zwei Zeilen: „09:30 AM–10:00 AM“ / „Fri, Feb 14, 2025“. Zeilenabstand 10–12 px. Diese Spalte ist der sichtbare Beweis der Auswahl.

**Formular rechts:** Überschrift „Enter details“ Semibold ~8 px. Labels Bold ~6 px #1A1A1A, 4 px über Input. Inputs 172×15 px (≈320×28 real), Border 1 px #C9C9C9, Radius 3 px, Placeholder #9A9A9A ~6,5 px („Name“, „email@example.com“, „Add email“). Feldabstand 14 px. Helper „Use a space to separate emails“ ~6 px Muted unter Gast-Feld, 4 px Abstand. Textarea 172×40 px, Label zweizeilig mit „(Optional)“. Submit: 36×14 px, Fill #2F7FE5, Text Weiß ~6,5 px Semibold, Radius 3 px, linksbündig, 12 px unter Textarea.

**Nachbau:**
```html
<form><h2>Enter details</h2>
 <label>Full name<input required placeholder="Name"></label>
 <label>Email<input type="email" required></label>
 <label>Guest emails<input aria-describedby="h1"><small id="h1">Use a space…</small></label>
 <label>Please share…<textarea rows="3"></textarea></label>
 <button>Submit</button></form>
```
`input,textarea{border:1px solid #c9c9c9;border-radius:3px;padding:6px 8px;font-size:13px} label{display:grid;gap:4px;font-weight:600;font-size:12px} form{display:grid;gap:14px} button{background:#2f7fe5;color:#fff;border-radius:3px;padding:6px 14px;justify-self:start}`

**Warum:** Persistente Labels über Feldern, kein Placeholder-only. Der Submit ist klein und linksbündig — passt zur Formulargröße, kein Full-Width-Schrei. Zusammenfassung links verhindert Rückfragen.
**Slop:** Pflichtfelder nicht markiert (kein Stern, kein „required“-Hinweis). Placeholder-Kontrast #9A9A9A schwach. Kein Fehlerzustand belegt.

---

## Bild 4 — `dd61455e-a9bd-4cf6-81f0-67fd4bb1a013.jpg` (Apollo, Details gefüllt, Schritt 6)

Identisch zu Bild 5. Unterschied nur im Inhalt: „John Smith“ und „jsmith.mobbin@gmail.com“ in #1A1A1A, Gast-Feld und Textarea leer. Gefüllter Text ist deutlich dunkler als Placeholder — Ink #1A1A1A vs. #9A9A9A, das ist die einzige Zustandscodierung. Kein Border-Wechsel, kein Häkchen, kein Success-Grün am Feld. Submit bleibt unverändert blau — kein Disabled-Zustand vor dem Ausfüllen belegt (Vergleich Bild 5: gleicher Button).

**Regel daraus:** Gefüllt ≠ validiert. Ohne Fokusring oder Inline-Validierung ist die Zustandssprache minimal; für eigene Umsetzung Fokusring (2 px #2F7FE5 outline-offset 1 px) und Fehlerfarbe ergänzen — beides hier unbelegt.

---

## Bild 2 — `b1e65803-d2a9-4349-b305-07046cb2a67c.jpg` (Runner, Pricing)

**Page:** Offwhite #FAFAF8. Titel „Pricing“ Serif (Display, hoher Kontrast, Bodoni-artig — Fontname unbelegt), ~24 px (≈46 px real), Regular, #1A1A1A, linksbündig bei x≈72, y≈45. Punktierte horizontale Linie bei y≈75 über die volle Bildbreite: 1 px, Dot-Muster, #C8C8C4.

**Grid:** Drei Spalten je ~184 px (x 86–268, 293–475, 500–682), Gap ~25 px. Vertikale punktierte Linien bei x≈75 und x≈693 laufen von y≈75 bis Bildende — das ist ein sichtbares Seitenraster, nicht nur Kartenrand. Zwischen den Spalten keine Trenner.

**Plan-Kopf (jede Spalte, y 92–182, ~90 px hoch ≈170 real):** Surface #F1F1EC (Raised, minimal wärmer als Page), Radius ~5 px, kein Border, kein Schatten. Padding ~10 px. Planname Serif ~10 px oben links („Standard“, „Pro“, „Ultra“). Preis unten links: „$50“ Sans ~9 px #1A1A1A, „/month“ ~6 px Muted #6B6B6B, Baseline-aligned. Der Kopf ist bewusst leer in der Mitte — ~50 px Luft zwischen Name und Preis.

**Feature-Listen (y 196–298):** Bullets als schwarze Quadrate 4×4 px, Text Sans ~6,5 px #2A2A2A, Zeilenabstand ~15 px, Bullet-Text-Gap 6 px. Standard 4, Pro 6, Ultra 7 Einträge. Kein Häkchen-Icon, kein Farbakzent. Erste Zeile ist immer das Differenzierungsmerkmal („5x more usage than Standard“).

**Enterprise-Zeile (y 313–378):** Punktierte Linie darüber bei y≈312 und darunter bei y≈378. Links „Teams & Enterprise“ Serif ~9 px, Beschreibung ~6,5 px Muted #6B6B6B, zwei Zeilen, max-width ~380 px. Rechts CTA „Give it a run →“: 184×18 px, Fill #E9E9E4, Radius ~4 px, Text ~6,5 px #1A1A1A links, Pfeil rechts (space-between), kein Border. Die CTA sitzt exakt in der dritten Spalte — Grid-Disziplin.

**Nachbau:**
```html
<section class="pricing"><h2>Pricing</h2>
 <div class="plans"><article><header><h3>Standard</h3><p class="price"><b>$50</b><span>/month</span></p></header><ul>…</ul></article>…</div>
 <div class="ent"><div><h3>Teams & Enterprise</h3><p>…</p></div><a class="cta">Give it a run <span>→</span></a></div></section>
```
`.pricing{background:#fafaf8;border-block:1px dotted #c8c8c4} .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:25px} article header{background:#f1f1ec;border-radius:5px;padding:10px;min-block-size:170px;display:flex;flex-direction:column;justify-content:space-between} .price span{font-size:.65em;color:#6b6b6b} ul{list-style:none;padding:0} li::before{content:"";display:inline-block;inline-size:4px;block-size:4px;background:#1a1a1a;margin-inline-end:6px;vertical-align:middle} .ent{display:grid;grid-template-columns:2fr 1fr;border-block:1px dotted #c8c8c4;padding-block:16px} .cta{display:flex;justify-content:space-between;background:#e9e9e4;border-radius:4px;padding:5px 10px}`
Punktlinien: `border-style:dotted` reicht; für echte runde Dots `background-image:radial-gradient(circle,#c8c8c4 1px,transparent 1px);background-size:6px 1px`.

**Warum:** Serif nur für Namen und Titel, Sans für Zahlen und Listen — zwei Rollen, keine Deko. Kein „Most popular“-Badge, keine Hervorhebung: Vergleich durch Listenlänge. Punktierte Linien geben Struktur ohne Kartenrahmen. Preisblock-Höhe identisch → Listen starten auf gleicher Linie.
**Slop:** Kein CTA pro Plan — Nutzer muss zur Enterprise-Zeile oder anderswohin. Leere Mitte im Preisblock wirkt bei drei identischen Kästen wie Platzhalter. Grau-auf-Grau-CTA (#E9E9E4 auf #FAFAF8) hat kaum Gewicht.

---

## Bild 6 — `faecc3dd-44fc-4b65-a840-76106daaa1df.jpg` (Airtable, Sales-Kontakt-Hero)

**Announcement-Bar (y 0–22):** Fill #F3F3F3, Text ~6 px #1A1A1A zentriert, Link „View webinar →“ #2D7FF9. Höhe ~22 px (≈40 real).

**Nav (y 22–64, ~42 px ≈ 78 real):** Weiß, Logo links (SVG, Farbverlauf-Icon + Wordmark ~11 px). Items „Product ›, Solutions ›, Pricing, Enterprise ›, Resources ›“ ~7 px #1A1A1A, Chevron 4 px rechts vom Text, Gap ~14 px. Rechts: „Contact sales“ Outline-Pill 62×16 px, Border 1 px #1A1A1A, Radius 8 px; „Sign up for free“ Fill #2D7FF9, Weiß, gleiche Maße, Radius 8 px; „Sign in“ Text-Link. Gap zwischen Buttons 6 px. Kein Schatten, keine Unterkante.

**Hero (y 64–475, Fill #333333):** Headline „Explore how Airtable can work for you.“ Sans Semibold ~29 px (≈54 real), Weiß, einzeilig, linksbündig bei x≈78, y≈120, kein Tracking. Verhältnis zu Body (~7 px) ≈4:1. Headline → Karte 30 px.

**Formkarte links (x 78–366, ~288 px ≈ 540 real, y 158 bis Bildende, abgeschnitten):** Surface Weiß, Radius ~4 px oben, kein sichtbarer Border, Padding 16 px. Oben rechts „Looking for help? **Message support**“ ~6 px, Link #2D7FF9. Trennlinie 1 px #E5E5E5 bei y≈206. Überschrift „Ready to chat with sales?“ Semibold ~10 px, 22 px unter Linie. Fünf Inputs 256×20 px (≈480×38 real), Fill #F2F2F2, **kein Border**, Radius 3 px, Text ~7 px #1A1A1A, Gap 13 px. Keine sichtbaren Labels — Placeholder-only (ausgefüllt, drittes Feld unkenntlich gemacht/verschwommen — Inhalt unlesbar, absichtlich). „Next“ 256×16 px Fill #2D7FF9, Weiß, Radius 3 px, zentriert, full-width, 16 px unter letztem Feld. Legal ~4,5 px Muted #6B6B6B, Links unterstrichen.

**Proof rechts (x 390–690):** „We power great companies“ ~13 px Muted #B5B5B5 (nicht Weiß!), Semibold. Beschreibung ~6,5 px #8F8F8F, zwei Zeilen. Logos 3×2 Grid (Intuit, Shopify, BuzzFeed / Netflix, Levi's, TIME), je ~80×20 px, Fill #5C5C5C auf #333333 — sehr niedriger Kontrast (~2,5:1 geschätzt), Gap horizontal ~40 px, vertikal ~30 px. Trennlinie 1 px #4A4A4A bei y≈327. Zwei Zeilen mit Icons (Sprechblase, Hut) 6 px Muted + Text ~6,5 px #8F8F8F, Links #6EA8FF.

**Nachbau:**
```html
<header><div class="bar">…</div><nav>…</nav></header>
<section class="hero"><h1>Explore how Airtable can work for you.</h1>
 <div class="two"><form class="card">…</form><aside class="proof"><h2>We power great companies</h2><p>…</p><ul class="logos">…</ul><hr><ul class="links">…</ul></aside></div></section>
```
`.hero{background:#333;color:#fff;padding:52px 78px} .two{display:grid;grid-template-columns:288fr 300fr;gap:24px;align-items:start} .card{background:#fff;color:#1a1a1a;border-radius:4px;padding:16px} .card input{background:#f2f2f2;border:0;border-radius:3px;block-size:38px;padding:0 10px} .card button{inline-size:100%;background:#2d7ff9;color:#fff;border-radius:3px;block-size:32px} .proof h2{color:#b5b5b5} .logos{display:grid;grid-template-columns:repeat(3,1fr);gap:30px 40px} .logos svg{fill:#5c5c5c} .pill{border-radius:8px;padding:4px 10px;border:1px solid currentColor}`

**Warum:** Tonwertkontrast Weiß-auf-#333 zieht den Blick zwingend auf das Formular; Proof daneben ist bewusst leise. Nav-CTA-Paar Outline + Fill trennt Sales und Self-Service. Support-Abzweig oben rechts in der Karte fängt falsche Anfragen ab.
**Slop:** Placeholder-only-Inputs ohne Labels. Logo-Kontrast #5C5C5C auf #333 fällt unter AA. Karte unten abgeschnitten — Folgeschritt „Next“ nicht belegt. Sechs Logos als Beweis ohne Zahl oder Kontext.

---

## Bild 7 — `fcfe2d50-61b3-4385-a7e5-b18046eb232c.jpg` (Notion, Contact Sales)

**Page:** Weiß, kein Header im Ausschnitt. Zwei Spalten: links x 110–318 (~208 px), rechts x 405–658 (~253 px), Gap ~87 px. Beide Spalten starten bei y≈30.

**Headline „Contact our sales team“:** Sans Bold ~22 px (≈42 real), #1A1A1A, zwei Zeilen, Zeilenhöhe ~1,15, kein Tracking, linksbündig. Beschreibung ~7 px #4A4A4A, drei Zeilen, 14 px unter Headline. Verhältnis ≈3:1.

**Proof-Block links (y 150–185):** „Millions run on Notion everyday“ Bold ~5,5 px #1A1A1A. Vier Logos farbig (Pinterest rot, Amazon schwarz/orange, Toyota rot, Uber schwarz), je ~40×12 px, Gap ~14 px, in einer Zeile. Farbige Logos sind hier akzeptabel, weil sie klein sind und die Seite sonst monochrom ist.

**Testimonial-Karte (x 110–318, y 192–338, 208×146 px):** Fill #F1F1EF, Radius ~8 px, kein Border, Padding 16 px. „OpenAI“ Wordmark ~11 px #1A1A1A oben. Zitat Serif ~7 px #2A2A2A, Zeilenhöhe ~1,5, fünf Zeilen, Anführungszeichen typografisch. Name „Nick Erdenberger“ Bold ~5 px, Rolle „GTM, OpenAI“ ~5 px Muted. 20 px zwischen Zitat und Name.

**Formular rechts:** 2-Spalten-Grid, Spaltenbreite je ~120 px, Gap ~14 px horizontal, ~14 px vertikal. Labels ~6 px #1A1A1A Regular mit rotem Stern #D0342C (Pflicht). Inputs 120×16 px (≈225×30 real), Border 1 px #D9D9D9, Radius 3 px, Placeholder #9A9A9A ~6,5 px („Ada“, „Lovelace“, „Lovelace Inc.“ — persona-basierte Placeholder). Selects mit Chevron 5 px rechts. „Country or region“ vorbelegt „United States“. „Reason for contact *“ und „Provide more details (optional)“ full-width (span 2). Textarea 253×40 px mit Resize-Griff unten rechts. Checkbox 8×8 px Fill #1A1A1A, Häkchen Weiß, Radius 2 px, **vorangehakt** — Text ~6 px daneben. Button „Contact sales“ 68×18 px Fill #1A1A1A, Weiß ~7 px, Radius 4 px, linksbündig, 14 px unter Checkbox. Legal ~5 px #6B6B6B; Links („Notion's websites…“, „Privacy Policy“, „team@makenotion.com“, „Help Center“) mit **lila Hintergrund-Highlight #E6D9F5** — unklar ob Design (Notion-typischer Link-Style) oder Screenshot-Textselektion. Als unsicher markiert, nicht übernehmen.

**Nachbau:**
```html
<section class="contact"><div class="left"><h1>Contact our sales team</h1><p>…</p><p class="eyebrow">Millions run on Notion everyday</p><ul class="logos">…</ul>
 <figure class="quote"><img alt="OpenAI"><blockquote>…</blockquote><figcaption><b>Nick Erdenberger</b><br>GTM, OpenAI</figcaption></figure></div>
 <form class="right"><label>First name <span aria-hidden>*</span><input required placeholder="Ada"></label>…<label class="span2">Reason for contact<select>…</select></label><label class="span2">Provide more details (optional)<textarea></textarea></label><label class="check"><input type="checkbox">I agree…</label><button>Contact sales</button><p class="legal">…</p></form></section>
```
`.contact{display:grid;grid-template-columns:208fr 253fr;gap:87px;padding:30px 110px} .right{display:grid;grid-template-columns:1fr 1fr;gap:14px} .span2{grid-column:span 2} input,select,textarea{border:1px solid #d9d9d9;border-radius:3px;block-size:30px;padding:0 8px;font-size:13px} label{display:grid;gap:4px;font-size:11px} label span{color:#d0342c} .quote{background:#f1f1ef;border-radius:8px;padding:16px} .quote blockquote{font-family:Georgia,serif;line-height:1.5} button{background:#1a1a1a;color:#fff;border-radius:4px;padding:6px 12px;justify-self:start}`

**Warum:** Zwei-Spalten-Grid halbiert die gefühlte Formularlänge (10 Felder wirken wie 6 Zeilen). Sichtbare Labels + Stern = klare Pflichtcodierung. Serif nur im Zitat: Stimme des Kunden bekommt eigene Typo. Schwarzer Button auf weißer Seite ohne Akzentfarbe — Marke bleibt monochrom.
**Slop:** Vorangehakte Marketing-Checkbox (Consent-Default). Lila Link-Highlights unklar. Textarea nur 40 px hoch für „more details“. Kein Fokus-, Fehler-, Erfolgszustand belegt.

---

## Gemeinsamkeiten im Paket

1. **Border-Radius-Familie 3–5 px** für Inputs, Buttons, Kartenköpfe (Apollo 3, Runner 4–5, Notion 3–4, Airtable 3). Nur Notion-Testimonial (8 px) und Airtable-Nav-Pills (8 px) weichen ab. Keine Pill-Buttons im Formularkontext.
2. **Ein Blau pro Produkt für Action + Selected + Link** (Apollo #2F7FE5, Airtable #2D7FF9). Notion und Runner arbeiten ohne Akzentfarbe: Schwarz (Notion) bzw. Grau (Runner) als Action.
3. **1-px-Trenner statt Schatten** für Spaltenteilung (Apollo Karte, Airtable Karte, Runner Punktlinien). Schatten nur bei Apollo, und dort kaum sichtbar.
4. **Labels über Feldern, klein und fett/regular, 4 px Abstand.** Ausnahme Airtable (Placeholder-only) — als Anti-Beispiel werten.
5. **Kontext bleibt neben dem Formular:** Apollo (Termin-Zusammenfassung), Airtable (Logos + Support-Links), Notion (Logos + Zitat). Immer links Beweis/Kontext, rechts Aktion — außer Airtable, das Formular links setzt und mit Tonwert zieht.
6. **Body-Schrift ~13–14 px real, Labels 11–12 px, Headlines 24–54 px** — flache Hierarchie in Funktionsflows (Apollo 1,7:1), steile in Marketing-Kontakt (Airtable 4:1).
7. **Submit-Buttons klein und linksbündig** in Formularen mit Kontext (Apollo, Notion); full-width nur in der schmalen Airtable-Karte.
8. **Serif als Rollen-Schrift:** Runner für Plan- und Sektionstitel, Notion für das Kundenzitat. Nie als Body.

## Farblogik als Rollentabelle (Sichtschätzung)

| Rolle | Apollo | Runner | Airtable | Notion |
|---|---|---|---|---|
| Page | #FFFFFF | #FAFAF8 | #333333 (Hero) | #FFFFFF |
| Surface | #FFFFFF Karte | — | #FFFFFF Karte | — |
| Raised | #EEEEEE (verfügbarer Tag) | #F1F1EC Plan-Kopf | #F2F2F2 Input-Fill | #F1F1EF Zitat-Karte |
| Border | #E3E3E3 / #C9C9C9 Inputs | #C8C8C4 punktiert | #E5E5E5 | #D9D9D9 |
| Text | #1A1A1A | #1A1A1A | #FFFFFF / #1A1A1A in Karte | #1A1A1A |
| Muted | #6B6B6B, #9A9A9A Placeholder | #6B6B6B | #B5B5B5, #8F8F8F | #6B6B6B, #9A9A9A |
| Action | #2F7FE5 | #E9E9E4 (grau!) | #2D7FF9 | #1A1A1A |
| Selected | #2F7FE5 Fill | — | — | #1A1A1A Checkbox |
| Accent/Alert | — | — | — | #D0342C Pflichtstern |

## Spacing-Rhythmus (Vorschau-px, ×1,9 für real)

- Label → Input: 4 px (≈8). Input → nächstes Label: 13–14 px (≈26). Feldgruppen: 14 px.
- Karten-Padding: 12–16 px (≈24–30). Spaltengap in Karten: 1-px-Linie + je 12 px Padding.
- Sektion Headline → Inhalt: 14–30 px (≈26–56). Titel → Subtitle: 12 px.
- Kalenderzellen: 19 px Kreis + 6 px Gap = 25-px-Raster (≈48 real).
- Runner: 3 Spalten je 184 px + 25 Gap; Plan-Kopf 90 px fix; Listenzeile 15 px.
- Nav-Höhe Airtable 42 px (≈78), Announcement 22 px (≈40).

## Dos

- Labels sichtbar über dem Feld; Pflicht mit Stern und `required`.
- Eine Akzentfarbe, drei Bedeutungen maximal (Action, Selected, Link); Zustände zusätzlich über Fill/Ring/Text codieren.
- Kontext neben dem Formular halten: Zusammenfassung, Zitat mit Attribution oder Logos.
- 1-px-Trenner und Raised-Flächen statt Schatten für Struktur.
- Radius-Familie 3–5 px konsistent für alle Controls einer Seite.
- Serif nur für eine klar benannte Rolle (Titel oder Zitat).
- Zwei-Spalten-Formulargrid bei ≥8 Feldern; volle Breite nur für Select-Grund und Textarea.
- Karte darf mit dem Flow wachsen — Achse bleibt zentriert.

## Don'ts

- Placeholder-only-Inputs (Airtable) kopieren.
- Marketing-Consent vorangehakt (Notion).
- Logos mit Kontrast unter 3:1 auf dunklem Grund (Airtable #5C5C5C auf #333).
- Scroll-Listen ohne Fade oder Scrollbar abschneiden (Apollo Zeitspalte).
- Verfügbare und nicht verfügbare Tage nur durch #EEE vs. Weiß trennen.
- Grau-auf-Offwhite als einzige CTA einer Pricing-Sektion (Runner).
- Lila Link-Highlights (Notion) übernehmen — Herkunft unklar.
- Mobbin-Leiste, Beispielnamen, Beispiel-E-Mails ins Produkt tragen.

## Mobile-Hinweise

Kein Mobile-Screenshot im Paket. Ableitungen: Apollo-Karte muss von 3 Spalten auf 1 stapeln (Meta → Kalender → Zeiten); Runner 3 Spalten → 1, Enterprise-CTA full-width; Notion-Formular 2 → 1 Spalte, Testimonial nach dem Formular; Airtable Proof unter die Karte. Alles unbelegt, eigene QA nötig.

## Unlesbar / nicht belegt

- Airtable: drittes Input-Feld absichtlich verwischt, Inhalt unlesbar; Formkarte unten abgeschnitten.
- Apollo Bild 3: letzter Zeit-Button abgeschnitten, Listenlänge unbekannt.
- Notion: lila Link-Highlight — Design oder Selektions-Artefakt nicht entscheidbar.
- Alle: Fontfamilien, Hover-, Fokus-, Fehlerzustände, Breakpoints, exakte Hex-Tokens.
