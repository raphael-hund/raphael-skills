# Mobile Rekomposition: das Layout wird neu gebaut, nicht nur gestapelt

## TLDR

Mobile ist keine schmale Desktop-Version: Was wandert, was wegfällt und in welcher Reihenfolge es steht, wird pro Element neu entschieden — bei Touchzielen ab 44 px, Breakpoints aus dem Inhalt und einem Sticky-CTA, der die Safe-Area respektiert.

## Regeln

### Reihenfolge und Rekomposition

1. **Desktop-Split wird zur vertikalen Reihenfolge, nicht zur verkürzten Zeile.** Zwei- und Mehrspalter stapeln in inhaltlicher Reihenfolge: Claim → Proof → Aktion. Beleg: designmd.me stapelt den Desktop-Split zur festen Sequenz Meta → Viewer → Caption → Thumbnail-Strip → Preview → Segmented/Downloads → Code (`designmd-me-1.md`, anthropic-mobile-state2.png); Neuform macht die Desktop-Auth-Säule zur ersten vollbreiten Karte, die Galerie folgt darunter mit 8 px Gap (`neuform-1.md`, 03-home-mobile.png y8–613).

2. **Reihenfolge wird explizit neu gesetzt, nicht vererbt.** Wer auf Desktop einen Proof rechts neben die Headline legt, zieht ihn mobil über `order` an die logische Stelle. Beleg: Arcstone stellt die Preview-Caption mobil über das Bild (Desktop: Caption unter dem Bild, links neben den Dots) und setzt die Dots rechtsbündig unter das Bild — nicht zentriert; die Preview-Karte wandert unter den Hero-Text (`2096149200178418026.md`, media-3.jpg links: Caption Original-y≈2160–2185, Bild y≈2220–2530, Dots y≈2665–2690 mit rechter Kante auf der Bildkante; nachgemessen 07.09.2026). Eigene Ableitung, keine Beobachtung: die Umordnung per `order:-1` ist der Nachbau-Vorschlag der Studie, nicht der belegte Originalcode.

3. **Ragged-Desktop-Rhythmus bekommt auf Mobile ein eigenes Raster.** Miniatur-Grids kopieren wirken gestaucht. Beleg: Arcstone ersetzt das 4-Spalten-Desktop-Grid durch einen Versatz 50 % links / 100 % / 75 % rechts mit 12 px Abstand (`2096149200178418026.md`, media-3.jpg rechts y≈540–1120). Layers fährt die 4-Spalten-Galerie auf 2 Spalten mit Gap 14 statt Desktop-12 (`layers.md`, home-mobile.png Karten x16–182 / x196–362).

4. **Anatomie bleibt, Dichte ändert sich.** Suchfeld, Karte, Tab und Codefenster sehen mobil identisch aus — nur Größe und Padding sinken. Beleg: designmd.supply hält H1 48 px, Seitenpadding 20 px, blendet nur Meta-Hints aus und setzt Tab-Labels auf `flex:1` mit Truncation („CSS variab…", `designmd_supply.md`, 05-stripe-mobile.png Bild-y545–610, 06-home-mobile.png Bild-y170–450). Das ist das Gegenmodell zum blinden Neubauen.

### Weglassen ist Teil der Antwort

5. **Dekoration fliegt zuerst.** Wetter-Widget, Schraffur-Ränder, Deko-Kacheln: alles, was auf Desktop Atmosphäre trägt, aber auf Mobile Fläche frisst, fällt. Beleg: Arcstone lässt das Wetter-Widget auf Mobile komplett weg (`2096149200178418026.md`, media-3.jpg beide Screens, `confidence: high`). Abgeleitet (confidence: low): Bands auf 5 reduzieren (`2095783930775433616`), Coin-Kacheln ausblenden (`2096855995909869867`), Schraffur-Gutter aus (`2095488681796854015`, `2095565814405742911`, `2096292759489609818`).

6. **Preview-Komponenten verlieren ganze Zonen.** Beleg: Neuform zeigt auf der Detailseite mobil nur den Inspector — die Preview entfällt komplett, die Toolbar verliert ihren Titel und behält nur Kreisbuttons und Panel-Toggle (`neuform-1.md`, 04-detail-mobile.png y0–40).

7. **Weggelassen ≠ `display:none` bei Daten.** Eine Datenliste auf Mobile still zu löschen, ist Don'ts-Material (`neuform-1.md` §11, Saltworks-Quelltext). Was Nutzer brauchen (Proof, Preise, Status), wandert um oder scrollt — es verschwindet nicht.

### Touch-Größen

8. **44 px ist die Untergrenze, nicht die Empfehlung.** Gemessene Desktop-Werte liegen systematisch darunter: Layers-Desktop-CTA 39,10 px (DOM-Messung, `layers.md` REPORT), Neuform-Icon-Buttons 26×26 px (`neuform-1.md`, 02-detail-desktop.png), Rox-Modal-Inputs 26 px (`refero-1.md`, 49229bf2), Popover-Menüzeilen 35 px (`2096165490498695410.md`, media-0.jpg). Die Mobile-Varianten heben auf 44–48 px an: Layers-CTA mobil h44, gesperrte Buttons h48 volle Breite (`layers.md`, vesper-mobile.png y715–825, home-mobile.png x76–302 h44); neuform-CTA mobil 45 px (`neuform-1.md`, 03-home-mobile.png y385–430); Acne-Submit 49 px volle Breite (`refero-1.md`, 3acf3200). *Eigener Startwert: Primär-CTA 48 px, Sekundär 44 px, Icon-Buttons 44 px Trefferfläche auch wenn das Icon 24 px groß bleibt.*

9. **Buttons werden mobil vollbreit und gestapelt.** Beleg: open_design stapelt das CTA-Paar — primär 56 px, sekundär 46 px, übereinander (`open_design.md`, home-mobile-settled.png y671–783). Layers setzt gesperrte Buttons auf 100 % Breite (`layers.md`, vesper-mobile.png). Abgeleitet: `flex-direction:column` + `width:100%` als Standardrezept (2096931638118871502, 2096889729337921598, 2095488681796854015 — je confidence: low).

10. **Inputs 16 px Schriftgröße auf Mobile, sonst zoomt iOS.** Beleg: designmd.supply setzt Placeholder/Input `text-base` mobil, `text-sm` erst ab sm (`designmd_supply.md` §1.5, Quellcode). *Eigener Startwert: `input{font-size:16px}` unter 768 px.*

### Header und Navigation

11. **Die Nav schrumpft auf 2–3 Elemente: Logo, ein CTA, Hamburger.** Beleg: designmd.me reduziert mobil auf Discover-Pill + Sign-in + Hamburger-Kreis 62×62 Bild-px mit rotem Alert-Dot (`designmd-me-1.md`, anthropic-mobile-state2.png y0–100); Layers: Logo-Quadrat 40×40, Such-Pille in voller Restbreite, Hamburger-Quadrat 40×40 (`layers.md`, home-mobile.png y52–94); open_design: Logo, Burger 40×40 Outline, Download-Pill (`open_design.md`, home-mobile.png).

12. **Sticky-Header braucht `scroll-margin-top` an Ankern.** Beleg als Gegenbeispiel: open_designs Glas-Header überdeckt den FAQ-Anker, Inhalt beginnt abgeschnitten unter der Kapsel (`open_design.md`, mobile-faq.png y63–127).

### Sticky-CTA und fixe Elemente

13. **Fixe Bottom-Elemente rechnen mit Safe-Area und Body-Padding.** Beleg als Gegenbeispiel: Layers' fixe „Ask AI"-Pille (y792–832) überdeckt exakt die Kartentitel-Zeile „Vesper" (`layers.md`, home-mobile.png x105–273). Das Rezept aus derselben Analyse: `bottom:calc(env(safe-area-inset-bottom)+12px)` plus `padding-bottom` auf `main` (72 px). designmd.supply zeigt denselben Fehler doppelt: fixe Badges überdecken Inhalt in beiden Mobile-Bildern (`designmd_supply.md`, Bild-y1580–1660).

14. **Ein Sticky-CTA unten ist das Mobile-Äquivalent zur Header-Aktion.** Beleg: Arcstone hat mobil den einzigen CTA nur im Header — die Lede hat keine Handlung (`2096149200178418026.md` §6, als Fehler vermerkt). Abgeleitet: Checkout-CTA sticky unten mit opaker Fläche (`2096929195381457078`, confidence: low).

### Breakpoints aus Inhalt

15. **Kein Einspalten-Dogma.** Der Corpus belegt Gegenbeispiele: Layers-Galerie bleibt bei 2 Spalten auf 390 px (`layers.md`, home-mobile.png), Neuforms Swatch-Karte bleibt 2×2 (`neuform-1.md`, 04-detail-mobile.png), prior_corpus zitiert die REPORT-Korrektur: „explizite Anpassung ja, Einspaltigkeit nein; Tabellen dürfen horizontal scrollen, kleine Karten zwei Spalten" (`prior_corpus.md` §4, REPORT.md:72).

16. **Tabellen bekommen eine Overflow-Region mit sticky erster Spalte statt Spalten-Löschung.** Abgeleitet, nicht belegt: `.table-wrap{overflow-x:auto}` mit `td:first-child{position:sticky;left:0}` (`2096660897628668066.md` — Analyse enthält ausdrücklich kein Mobile-Bild). prior_corpus stützt die Richtung (`REPORT.md:72`).

17. **Breiten werden fluid, nie hart.** Belegte Fehlwerte: 21st.dev-Panel hart `w-[900px]` (`twentyfirst.md`, 18191-source.txt) → Rezept `width:min(900px,calc(100vw - 32px))`; Supply-Codeblock hat `max-h` nur ab sm und wird mobil 9.752 px hoch (`designmd_supply.md`, markdown-copy-block.tsx:81, REPORT.md) → Rezept: Höhengrenze auf ALLEN Breakpoints.

18. **`100dvh` statt `100vh`.** Beleg: prior_corpus (`sources/taste-SKILL.md:153`). Arcstone zeigt, warum: Mobile-Hero ≈ 2,2× Breite hoch — mehr als 100 svh, die Preview liegt unter dem Fold (`2096149200178418026.md` §15, media-3.jpg).

### Typografie mobil

19. **H1 fällt auf 30–48 px, harte `<br>` fliegen raus.** Gemessene Mobile-H1: Arcstone 44 px in 3 natürlichen Zeilen ohne erzwungenen Umbruch (`2096149200178418026` — media-3.jpg links), Layers ≈34 px zweizeilig (`layers.md`, home-mobile.png), open_design 30 px (`open_design.md`, home-mobile-settled.png), designmd.supply 48 px dreizeilig (`designmd_supply.md`, 06-home-mobile.png), neuform 38 px (`neuform-1.md`, 03-home-mobile.png). *Eigener Startwert: `h1{font-size:clamp(30px,9vw,48px)}`.*

20. **Der Hero-Textblock darf mobil nicht mehr als etwa ein Drittel des Viewports füllen.** Beleg: open_design Hero-Rahmen y192–496 = 36 % Viewport, CTA-Stack direkt darunter — und die Analyse markiert die fast gleich schwere Subline als Fehler (`open_design.md` §6.1).

21. **Wrap-Zonen brauchen `flex-wrap` von Anfang an.** Belegte Fehler: Neuforms Action-Pills überlappen sich auf Mobile, weil nicht umgebrochen wurde (04-detail-mobile.png y52–72, „Save Skill" liegt ÜBER „Copy"); die Segment-Titelzeile bricht schon auf Desktop (`2096175237109092642-video-2`, frame-27.jpg).

## Bauanleitungen

Alle nicht direkt mit einer Quelldatei kommentierten Maße und Breakpoints in den folgenden Snippets sind eigene Startwerte; die QA verschiebt sie dort, wo der Inhalt sichtbar bricht.

### A. Stacking mit Reihenfolge-Entscheidung

```css
/* Desktop: Claim links, Proof rechts */
.hero{display:grid;grid-template-columns:7fr 5fr;gap:clamp(24px,4vw,64px)}
/* Mobile: ein Fluss, Proof nach dem Claim, CTA zuletzt */
@media(max-width:768px){
  .hero{grid-template-columns:1fr}
  .hero__cta{order:3}
  .hero__proof{order:2}
}
```
Beleg-Vorlage: designmd-me-1 (Meta → Viewer → Code), neuform-1 (Säule → Galerie).

### B. Touch-Größen als Layer, nicht als Rewrite

```css
/* Desktop-Maße bleiben; Mobile hebt nur Trefferflächen an */
.btn{height:40px;padding:0 18px}
@media(max-width:640px){
  .btn{min-height:44px;width:100%}
  .btn--primary{min-height:48px}
  .icon-btn{width:44px;height:44px} /* Icon darf 24px bleiben */
  input,select,textarea{font-size:16px} /* iOS-Zoom-Schutz, belegt designmd_supply */
}
```
Beleg-Vorlage: layers.md §4 (h44/h48), designmd_supply §1.5 (16 px).

### C. Sticky-CTA mit Safe-Area (das korrigierte Layers-Rezept)

```css
.cta-bar{position:fixed;left:16px;right:16px;
  bottom:calc(env(safe-area-inset-bottom) + 12px);
  z-index:40;background:var(--surface);border-radius:14px}
main{padding-bottom:96px} /* Platz, damit die Bar keinen Proof verdeckt */
```
Gegenbeleg: layers.md home-mobile.png y792–832 (Pille verdeckt Titel); designmd_supply Bild-y1580–1660 (Badge über Inhalt).

### D. Tabelle als Overflow-Region

```css
.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
th:first-child,td:first-child{position:sticky;left:0;background:var(--surface)}
@media(max-width:768px){ table td:not(.id,.status,.action){display:none} }
/* Alternative zur Spalten-Löschung: sticky Key-Spalte + Scroll */
```
Ableitung (confidence: low): 2096660897628668066, 2096499167225078020; Richtung belegt durch prior_corpus REPORT.md:72.

### E. Haarlinien-Raster und Galerie-Versatz mobil

```css
@media(max-width:640px){
  :root{--pad:24px}          /* Container-Padding sinkt 96→24, belegt Arcstone */
  .nav__meta{display:none}   /* Deko-Widget fliegt, belegt Arcstone */
  .gallery{display:block}
  .g1{width:50%} .g2{width:100%;margin-top:12px} .g3{width:75%;margin:12px 0 0 auto}
}
```
Beleg: 2096149200178418026, media-3.jpg.

### F. `<br>`-Kontrolle pro Breakpoint

```css
h1 br{display:none}
@media(min-width:900px){h1 br{display:inline}}
```
Beleg: Arcstone bricht mobil in 3 natürliche Zeilen, der Desktop-`<br>` würde den Rhythmus zerstören (`2096149200178418026.md` §5, §15). Ebenso: Footer-Headline ohne hartes `<br>` (`2096891319843164276`, Ableitung).

### G. Menüzeilen auf Touch-Höhe

```css
@media(pointer:coarse){
  [role=menuitem]{min-height:44px}
}
```
Beleg: Popover-Zeilen 35 px unterschreiten das Minimum (`2096165490498695410.md`, media-0.jpg Item-Höhe Δ70 Originalpx = 35 CSS); Rox-Inputs 26 px (`refero-1.md` §5).

## Varianten je Stilfamilie

**Editorial / Architektur (Arcstone, CLOU).** Vollbild-Hero bleibt, aber Text folgt der dunklen Bildzone; Raster-Haarlinien bleiben auf Mobile sichtbar (4 Linien, 2096149200178418026); Preview wird deutlich kleiner (47 % Breite) statt vollbreit. Display-Headline per clamp mehrzeilig neu umbrechen (CLOU 150 px → clamp, refero-1 §3, Ableitung).

**Dark SaaS / Plattform (Layers, Neuform, designmd.me).** Header → Logo + Suche + Hamburger; Modal wird eine einzelne Card (Preview über Meta, Close als 40-px-Quadrat AUSSERHALB der Card, layers.md vesper-mobile.png x322–362); Buttons volle Breite h44–48. Gefahr: Badges und Chips skalieren zu groß (Layers: Badges 16 px, Chips 18 px → Rollen verschwimmen, layers.md §9).

**Helles Marketing (open_design, Supply).** Textbudget deckeln (Hero ≤ 36 % Viewport), Pills wrappen in 2–3 Zeilen, Anatomie jedes Bauteils identisch halten (Supply), Anker mit `scroll-margin-top` schützen.

**App / Dashboard (Oqulus, Chat-Rail).** Sidebar wird Bottom-Tabbar oder Drawer (Ableitung: 2096832279775486079, 2096165490498695410 Rail 64 px → Bottom-Bar 64 px hoch); Tabelle → Overflow-Region mit sticky Key-Spalte; KPIs auf 1–2 Spalten, nie Werte löschen.

**Komponenten-System (shadcn).** Dialog-Footer unter 640 px `column-reverse` — primäre Aktion mobil OBEN (dialog-open.png y490–553; REPORT.md Abschnitt 3), darüber Zeile rechtsbündig; Container-Queries statt Viewport für Field-Orientierung (field.md Zeile 1104–1106).

## Dos

- Reihenfolge pro Element festlegen: Claim → Proof → CTA; mit `order` arbeiten, nicht hoffen (designmd-me-1, neuform-1).
- Trefferflächen auf 44–48 px anheben, Icon-Größe darf kleiner bleiben (layers.md, neuform-1).
- Safe-Area in jedes fixe Bottom-Element einrechnen und dem Content unten Luft geben (layers.md).
- Inputs auf 16 px Schriftgröße mobil (designmd_supply).
- Anatomie der Bauteile über Breakpoints halten; nur Dichte ändern (designmd_supply).
- `<br>` pro Breakpoint schalten oder ganz auf natürlichen Umbruch setzen (2096149200178418026).
- `100dvh` für Hero-Höhen (prior_corpus).
- Breakpoint setzen, wo der Inhalt bricht — die Titelzeile, die auf Desktop schon umkippt, ist der Breakpoint (2096175237109092642-video-2).
- Wrap von Anfang an: `flex-wrap:wrap` auf jeder Zeile aus Chip + Control (neuform-1 Gegenbeleg, 2096833304351961505).

## Don'ts

- **Keine fixen Elemente ohne Safe-Area und Content-Ausgleich.** Gegenbeispiel: Layers' Ask-AI-Pille verdeckt den Kartentitel „Vesper" (home-mobile.png y792–832); Supplys Context-Badge liegt dreimal über Inhalt (designmd_supply §1.4/§1.5).
- **Kein Codeblock ohne Höhengrenze auf Mobile.** Gegenbeispiel: Supply wird 9.752 px hoch, weil `max-h:36rem` erst ab sm greift (markdown-copy-block.tsx:81).
- **Keine harten Pixel-Breiten.** Gegenbeispiel: 21st.dev-Panel `w-[900px]` bricht jeden Viewport unter 932 px (18191-source.txt).
- **Keine Menüzeilen unter 44 px.** Gegenbeispiel: Popover mit 35-px-Zeilen (2096165490498695410); Rox-Inputs 26 px (refero-1).
- **Keine Desktop-CTA-Höhe auf Touch übernehmen.** Gegenbeispiel: Layers-Desktop-CTA 39,10 px (REPORT-Messung).
- **Kein Glas-Header über Ankerzielen ohne `scroll-margin-top`.** Gegenbeispiel: open_design FAQ beginnt abgeschnitten (mobile-faq.png).
- **Keine Datenlisten mobil per `display:none` löschen.** Gegenbeispiel: Saltworks-Quelltext (neuform-1 §11).
- **Keine drei Overlays gleichzeitig.** Gegenbeispiel: Layers Desktop mit Cookie + Tutorial + Ask-Pill + Sale-Streifen (layers.md §1.5) — auf Mobile fatal.
- **Kein Subline-Gewicht wie H1-Gewicht mobil.** Gegenbeispiel: open_design Subline 24 px Semibold neben H1 30 px — Hierarchie kollabiert (open_design §6.1).
- **Kein iOS-Zoom durch 14-px-Inputs auslösen** (designmd_supply).

## Gilt nicht wenn

- **Einspaltigkeit ist kein Zwang:** kleine Kartenpaare (Galerie, Swatches, Stats) bleiben 2-spaltig, wenn die Kachel ≥ ~160 px breit bleibt (layers.md home-mobile.png Karten 166 px; neuform-1 Swatches 155 px; prior_corpus REPORT.md:72).
- **Vergleichstabellen mit echten Daten** dürfen horizontal scrollen statt Spalten zu verlieren (prior_corpus REPORT.md:72) — Spalten-Löschung gilt nur für Priorisierbare (ID/Status/Aktion bleiben, Rest fällt; 2096499167225078020, Ableitung).
- **Kiosks, interne Tools und Desktop-only-Produkte** (z. B. der Desktop-Download von open_design) können Touch-Minima lockern, wenn der ICP nachweislich am Desktop sitzt — die 26-px-Icon-Buttons von Neuform bleiben trotzdem als Desktop-Fehler vermerkt.
- **Kalender und Wochenraster** haben eine physische Untergrenze (~340 px, Ableitung 2096192737867350330); darunter gehört die Ansicht gewechselt (Tages-Tabs), nicht gequetscht (mobbin-2, Ableitung).
- **Viele Mobile-Regeln im Corpus sind Ableitungen ohne Bildbeleg** (confidence: low/uncertain). Wo kein Mobile-Screen existiert, gelten die Bauanleitungen als Startwerte, nicht als beobachtete Praxis.

## Quellen

- `../studies/design-depth/deep/2096149200178418026.md` (Arcstone — einzige voll belegte Desktop+Mobile-Landingpage im Corpus; media-3.jpg)
- `../studies/design-depth/deep/layers.md` (home-mobile.png, vesper-mobile.png; Touch, Sticky-Pille, Modal)
- `../studies/design-depth/deep/neuform-1.md` (03-home-mobile.png, 04-detail-mobile.png, 05-forgot-mobile.png)
- `../studies/design-depth/deep/designmd-me-1.md` (anthropic-mobile-state2.png)
- `../studies/design-depth/deep/designmd_supply.md` (05-stripe-mobile.png, 06-home-mobile.png, Quellcode)
- `../studies/design-depth/deep/open_design.md` (home-mobile-settled.png, mobile-menu.png, mobile-faq.png)
- `../studies/design-depth/deep/shadcn.md` (dialog-open.png, field.md/theming.md Quellen)
- `../studies/design-depth/deep/twentyfirst.md` (18191-source.txt, REPORT.md)
- `../studies/design-depth/deep/prior_corpus.md` (sources/taste-SKILL.md, REPORT.md)
- `../studies/design-depth/deep/refero-1.md` (Rox-Modal, Acne-Flow, On-Drawer)
- `../studies/design-depth/deep/2096165490498695410.md` (Rail/Popover-Maße)
- Ableitungen ohne Mobile-Beleg (confidence: low/uncertain): 2095383602431459523, 2095784926717300835, 2095797753305612601, 2095874058697293985, 2095928637346472339, 2096175237109092642-video-1/-2, 2095783930775433616, 2095807169346334900, 2096618423983964587, 2096634909263646898, 2096674796704813174, 2096832279775486079, 2096855995909869867, 2096891319843164276, 2096929195381457078, 2096192737867350330 (-video-1/-2), 2096499167225078020, 2096660897628668066, 2096833304351961505, 2096876701775261945, 2096931638118871502, 2096953356086313312, 2095488681796854015, 2095565814405742911, 2095863741250474026, 2096292759489609818, 2096889729337921598, 2096944343487852961, mobbin-1/2/3, refero-2, aakib-tiles, designmd-me-1 (teils), gap-marcelkargul, gap-uiux_hamad.
