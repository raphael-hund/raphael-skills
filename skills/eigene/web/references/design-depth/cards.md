# Cards — Karten, Panels, Feature-Kacheln, Bento, Testimonials, Nesting, Radius-Konzentrik, Trennlinien

Dimension: `cards` · Stand: 2026-09-07 · Corpus: `../studies/design-depth/deep/*.md` (52 Analysen, davon 41 mit Kartenbelegen)
Belege stehen als Analyse-Dateiname in Klammern. Zahlen sind gemessen, wenn eine Datei genannt ist; eigene Startwerte sind als **[Startwert]** markiert.

## TLDR

Eine Karte trennt sich vom Grund durch genau ein Mittel (Helligkeitsstufe, Hairline oder Schatten), hält innen konzentrische Radien und trägt Farbe oder Material nur, wenn sie der Proof oder die Auswahl ist.

## Regeln

### A. Abgrenzung: ein Mittel pro Karte

1. Tiefe entsteht aus drei Helligkeitsstufen, nicht aus Schatten. Dark: Page #0A0A0A → Surface #111 → Raised #1B1B1B plus 1px #1E1E1E (`2096499167225078020.md`); Page #0A0C10 → Surface #10141A → Raised #171C23, Border #1E242C (`2096891182701793331.md`). Light: Page #F2F2F2 → Surface #FAFAFA → Panel #F5F5F5 → Card #FFF (`2095784926717300835.md`); Page #ECECEC → Sidebar #F7F7F7 → Panel #FFF (`2096660897628668066.md`).
2. Tonal-Karte ohne Border und ohne Schatten funktioniert nur bei ausreichendem Luma-Abstand: weiss auf #E2E3E5 (`2095383602431459523.md`), weiss auf #EEE (`2096192737867350330.md`), #F7F3EE auf weiss (`2095797753305612601.md`). Abstand unter ca. 4 Luma-Punkten ist unsichtbar: #FBFBFB auf #FFF trägt nur noch der Border (`2096660897628668066.md`).
3. Border-Karte: 1px Hairline, Dark bei 6–10 % Weiss (`2096175237109092642.md` ~6 %, `2096876701775261945.md` 8 %, `shadcn.md` 10 %), Light bei #E5–#EC (`2096215770783199316.md` #E6E6E9, `2095874058697293985.md` #ECECEC, `2096618423983964587.md` #E8E8E8). Fläche darf dann gleich der Page sein (`2096876701775261945.md` #0C0B09 auf #0F0E0C, sogar dunkler).
4. Schatten-Karte nur, wenn die Karte über Material schwebt (Verlauf, Foto): Stripe `0 8px 24px rgba(0,0,0,.08)` über Rainbow-Verlauf (`refero-2.md`), Flowly-Modal `0 60px 120px -20px` über Lichtszene (`2096674796704813174.md`), Miro `0 0 20px rgb(0 0 0/.05)` über Punktraster (`mobbin-1.md`). Sonst ist ein Schatten unter 0.06 Alpha unsichtbar und ersetzt keinen Border (`2096192737867350330.md` `0 2px 12px .04` zu schwach).
5. Kombination Border + minimaler Schatten ist die sichere Light-Standardkarte: `#fff + 1px #e8e8e8 + r12 + 0 1px 3px rgba(0,0,0,.06)` (`2096618423983964587.md`); shadcn nutzt stattdessen Ring `ring-1 ring-foreground/10` ohne Schatten (`shadcn.md`).
6. Schatten immer im Page-Hue tönen, nie reines Schwarz auf Hell (`prior_corpus.md`, taste-SKILL 215).
7. Glas ist Hülle, nie Datenfläche: Milchglas aussen, deckende Flächen ≥ #1A1A1A innen (`2096833304351961505.md`); Glas-Chips nur auf Fotos (`2095797753305612601.md`, `2096832279775486079.md`); Glas-Karten als Politur zählen als Slop (`prior_corpus.md`, unslop 26).
8. Invertierte Elevation ist legitim: schwarze Karten auf Dunkelblau (`twentyfirst.md`), Sunken-Stat-Karten #F7F0E8 in Creme (`2096832279775486079.md`), Glas → Anthrazit → Schwarz „je dunkler, desto höher“ (`2096833304351961505.md`). Pro Seite eine Richtung wählen.

### B. Radius und Konzentrik

9. Innenradius = Aussenradius − Inset. Belegte Ketten: 24 > 16 > 8 (`2095383602431459523.md`), 20–28 > 12–16 > 8–12 (`2095784926717300835.md`), 40 > 32 > 16 > 8 (`2095807169346334900.md`), 36 aussen / 13 innen bei 6px Rand (`2096855995909869867.md`), 12 − 5 ≈ 8 (`layers.md`), 10 − 3 = 8 im Segmented Control (`2096833304351961505.md`), 24 aussen / 16 innen bei 12px Inset (`2096192737867350330.md`).
10. Radius wächst mit der Kartengrösse: 12 (Grid-Card) → 14 (Input-Card) → 16 (Viewer/Panel) (`designmd-me-1.md`); 6 (Kbd) · 8 (Button) · 10 (Input) · 12 (Karte) · 999 (Pill) (`2096891182701793331.md`); Pille 999 / UI 8–12 / Karte 14 / Rahmen 24 (`2096944343487852961.md`).
11. Multiplikative Radius-Familie statt „minus 4px“-Rezepte: `--radius:10px`, sm 6, md 8, lg 10, xl 14 (`shadcn.md`). Familie schriftlich festlegen, z. B. Buttons pill, Cards 16, Inputs 8 (`prior_corpus.md`, taste-SKILL 217).
12. Radius 0 ist eine Familie, keine Nachlässigkeit: Nest (`2096953356086313312.md`), Jasper-Bento (`mobbin-2.md`), Pricing auf Blau (`2096292759489609818.md`), Testimonial-Karten auf Foto (`2095863741250474026.md`). Dann überall 0, auch Buttons und Chips.
13. Radius-Inkonsistenz zwischen Sektionen ist ein Fehler: Panel 0 vs. Chips 6–14 (`2095928637346472339.md`); Shell 2f vs. Panel 1.2f ohne Konzentrik (`2096660897628668066.md`).
14. Sehr grosse Radien nur bei sehr grossen Karten: 36px ≈ 6.7 % der Breite (`2096674796704813174.md`), 40 bei min-height 800 (`2095807169346334900.md`), 28 bei Padding 36 (`2095797753305612601.md`, `gap-uiux_hamad.md`).

### C. Anatomie und Slots

15. Karte nur mit echten Slots (Header/Content/Footer), nie um jeden Absatz (`shadcn.md`). Alternative bei Dichte > 7 Elemente: 1px-Linien, `divide-y`, Whitespace (`prior_corpus.md`, taste-SKILL 214/568).
16. Feste Slot-Reihenfolge in Chart-Karten: Label + Chip / Stat / Panel (sunken) / Meta / Footer mit Copy-Button; Panel #111–#181818 r10–14, Höhe 175–190, Footer-Divider #262626 (`2096175237109092642.md`).
17. KPI-Karte: Icon-Tile in Rollenfarbe oben links, Titel rechts, Delta, Wert gross unten (`2096499167225078020.md` 46px Wert, Tile 74px r14); oder Label 1f grau → Wert 1.8f 600 schwarz, sonst nichts (`2096660897628668066.md`); Icon-Tile 36–46px r8–10 schwarz + Wert 22–26px + Label 13–16px (`2096944343487852961.md`, `2096889729337921598.md`).
18. Proof-Panel = Mini-UI oder Illustration + Titel + zwei Zeilen Copy; UI-Fragment per `overflow:hidden` angeschnitten (`2095797753305612601.md` Widget r16 an Kartenunterkante, `2095874058697293985.md` UI-Card rechts abgeschnitten, `2096175830624055596.md` Glas-Karte rechts angeschnitten, `twentyfirst.md` Bild `right:-32px;bottom:-32px`).
19. Testimonial-Karte: Sterne / Zitat / Avatar + Name + Rolle. Zitatkarte dunkel mit Padding 24 (`aakib-tiles.md`, `2095863741250474026.md`), helle Karte auf Foto r0–8 Padding 16 (`aakib-tiles.md`), Testimonial-Tile #F1F1EF r8 ohne Border (`mobbin-3.md`), Portrait-Karte 2:3 mit Schwarzverlauf ab 50 % (`aakib-tiles.md`, `2095863741250474026.md`).
20. Zweischichtige Karte: weisse Aussenkarte r24 + grauer Innen-Header #EEE r16 mit 12px Inset (`2096192737867350330.md`); Bildzone mit eigenem Radius innerhalb 5px Padding (`layers.md`); Coin-Karte 6px weisser Aussenrand r18 innen r13 (`2096855995909869867.md`).
21. Pricing-Karten: drei Pläne, Mitte hervorgehoben durch Versatz nach oben (12–28px) und Button-Inversion, nie durch Farbe der Karte (`aakib-tiles.md`, `refero-2.md`, `2096292759489609818.md`, `2095863741250474026.md`).

### D. Trennlinien

22. Divider gruppieren Zeilen, Footer-Zonen und Aktionszeilen: Rows mit `border-bottom`, letzte Row ohne (`2096891182701793331.md`); Footer `border-top` + `bg-muted/50` (`shadcn.md`); ein Trenner pro Karte nur vor der Aktionszeile (`2096833304351961505.md`).
23. Divider-Farbe = Border-Farbe der Karte oder eine Stufe heller: Dark #262626/#1E242C, Light #E3E3E3–#EEE (`2096175237109092642.md`, `2096891182701793331.md`, `2096660897628668066.md`).
24. Gestrichelte Innenlinien ersetzen Kartenflächen in Logo- und Feature-Grids: `1px dashed rgba(255,255,255,.12)`, keine Aussenkante (`2096876701775261945.md`); Punktlinien bei Runner (`mobbin-3.md`).
25. Nie `border-top` und `border-bottom` auf jeder Zeile; eine Linie sparsam (`prior_corpus.md`, taste-SKILL 677). Doppelte Divider zwischen Bell und Avatar sind unnötig (`2096499167225078020.md`).

### E. Bento und Grids

26. Spans nach Informationsgewicht: 2+3 mit einer Akzentkarte (`2095784926717300835.md`), 1.9fr/1fr (`2095807169346334900.md`), 2fr 3fr Bento mit Textspalte links (`2096876701775261945.md`), 2+4 Story oben Breite unten (`mobbin-2.md`).
27. Zellenzahl = Inhaltszahl, keine Leerzelle; 2–3 Zellen mit realer Fläche (Bild, Verlauf, Tint) (`prior_corpus.md`, taste-SKILL 250/259).
28. Akzent-Budget: eine Karte pro Sektion trägt volles Material (Violett-Verlauf + Glas-Panels, `2095784926717300835.md`; Verlauf nur auf Story-Karten, kleine Kacheln flach, `mobbin-2.md`).
29. Selektion = Vollflächen-Inversion: Plan-Karte #161A23 mit radialem Highlight (`2096929195381457078.md`), Pro-Karte #1F1F1F neben Enterprise weiss (`mobbin-2.md`), Mittelkarte weiss neben #000-Karten (`aakib-tiles.md`).
30. Karten-Gap 16–24px, Innenpadding 16–24 (`aakib-tiles.md`, `2096891182701793331.md`, `shadcn.md` 16); grosszügige Marketing-Karten 32–50px (`2095383602431459523.md` 34–50, `2096175237109092642.md` 32–35, `2095797753305612601.md` 36).
31. Angeschnittene Grids signalisieren „mehr“, brauchen aber Scroll oder Fade: Testimonial-Wand rechts abgeschnitten (`2095863741250474026.md`, `2096292759489609818.md`), Produktstreifen links/rechts angeschnitten (`twentyfirst.md`).

### F. Material

32. Gradient-Border per Mask-Composite, oben hell, unten transparent (`2095783930775433616.md`, `2096833304351961505.md` `rgba(255,255,255,.45→.08)`).
33. Grain nur als Overlay auf Material-Karten, nie unter Text: Coin-Karten (`2096855995909869867.md`), Flowly-Modal (`2096674796704813174.md`, Grain unter Text = Fehler), Mockup-Backdrop (`2096499167225078020.md`).
34. Chips überlappen Kanten bewusst: Chip `bottom:-10px` zwischen Bild und Text (`2096832279775486079.md`); Browserfenster ragt 40px über die Kartenoberkante (`refero-2.md`); Empfehlungsband 28px nach oben (`aakib-tiles.md`).

## Bauanleitungen

Eigene Umsetzung, keine kopierten Assets. Werte aus den genannten Belegen.

### 1. Tonale Karte mit Innen-Header (Kargul-Muster, `2096192737867350330.md`)

```html
<article class="card">
  <header class="card__head">
    <h3>Termin</h3><span class="chip">Heute</span>
  </header>
  <div class="card__body">…</div>
</article>
```
```css
.card{--r:24px;--inset:12px;background:#fff;border-radius:var(--r);padding:var(--inset);
  box-shadow:0 1px 3px rgba(0,0,0,.06)}            /* Startwert gegen zu schwaches 0 2px 12px .04 */
.card__head{background:#eee;border-radius:calc(var(--r) - var(--inset));padding:16px 20px;
  display:flex;justify-content:space-between;align-items:center}
.card__body{padding:20px 20px 8px}
```

### 2. Border-Karte Dark mit Slots (Mono-Charts + Kestrel, `2096175237109092642.md`, `2096891182701793331.md`)

```html
<section class="panel">
  <header><span class="label">Umsatz</span><span class="chip">+12 %</span></header>
  <p class="stat">42.180 €</p>
  <figure class="sunken"><svg viewBox="0 0 400 180">…</svg></figure>
  <p class="meta">Letzte 30 Tage</p>
  <footer><span>Quelle: CRM</span><button class="icon" aria-label="Kopieren">⧉</button></footer>
</section>
```
```css
.panel{background:#161616;border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:32px;
  display:grid;gap:16px;color:#fff}
.panel header{display:flex;justify-content:space-between;align-items:center}
.stat{font:500 40px/1 inherit;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.sunken{background:#111;border-radius:12px;height:180px;margin:0}
.meta{color:#8a8a8a;font-size:14px}
.panel footer{display:flex;justify-content:space-between;align-items:center;
  padding-top:16px;border-top:1px solid #262626;color:#8a8a8a;font-size:13px}
.icon{width:36px;height:36px;border-radius:10px;background:#232323;border:0;color:#fff}
```

### 3. Light-Standardkarte mit Rows und Footer (Finance + shadcn, `2096618423983964587.md`, `shadcn.md`)

```css
.card{--sp:16px;background:#fff;border:1px solid #e8e8e8;border-radius:12px;
  box-shadow:0 1px 3px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:var(--sp);
  padding-block:var(--sp)}
.card:has(.card-footer){padding-bottom:0}
.card-header,.card-content{padding-inline:var(--sp)}
.row{display:grid;grid-template-columns:190px 1fr;min-height:55px;align-items:center;
  border-bottom:1px solid #eee}
.row:last-child{border-bottom:0}
.card-footer{padding:var(--sp);border-top:1px solid #e8e8e8;background:#fafafa;
  border-radius:0 0 12px 12px}
```

### 4. Proof-Panel mit angeschnittenem UI-Fragment (Recurr + Hubmini, `2095797753305612601.md`, `2095874058697293985.md`)

```html
<article class="proof">
  <div class="proof__ui" aria-hidden="true"><div class="widget">…</div></div>
  <h3>Rechnungen laufen automatisch</h3>
  <p>Zwei Zeilen Copy, die den Outcome benennen.</p>
</article>
```
```css
.proof{background:#f7f3ee;border-radius:28px;padding:36px;overflow:hidden;position:relative}
.proof__ui{height:220px;position:relative;margin:-36px -36px 24px}
.widget{position:absolute;left:36px;right:-40px;bottom:-24px;background:#fff;border-radius:16px;
  padding:20px;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.proof__ui::after{content:"";position:absolute;inset:auto 0 0;height:60px;
  background:linear-gradient(transparent,#f7f3ee)}
```

### 5. Bento 2+3 mit einer Akzentkarte (`2095784926717300835.md`)

```css
.bento{display:grid;grid-template-columns:repeat(6,1fr);gap:20px}
.bento>*{background:#fff;border-radius:24px;padding:32px}
.bento>.wide{grid-column:span 3}
.bento>.narrow{grid-column:span 2}
.bento>.accent{grid-column:span 3;color:#fff;
  background:linear-gradient(135deg,#5b3df5,#9b6bff)}
.accent .glass{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);
  border-radius:16px;padding:16px;backdrop-filter:blur(12px)}
```

### 6. Auswahl-Karte durch Inversion (Nexora Checkout, `2096929195381457078.md`)

```css
.plan{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;
  border:1px solid #eeede9;border-radius:14px;padding:24px;background:#fff}
.plan[aria-checked=true]{background:#161a23 radial-gradient(circle at 20% 0,rgba(255,255,255,.08),transparent 60%);
  color:#fff;border-color:#161a23}
```

### 7. Gradient-Border (Mango + Flowz, `2095783930775433616.md`, `2096833304351961505.md`)

```css
.glow{position:relative;border-radius:24px;background:#141414;isolation:isolate}
.glow::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(160deg,rgba(255,255,255,.45),rgba(255,255,255,.06));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude}
```

### 8. Zweischichtige Coin-Karte (Stellar, `2096855995909869867.md`)

```css
.coin{--r:18px;--rim:6px;background:#fff;border-radius:var(--r);padding:var(--rim)}
.coin__inner{border-radius:calc(var(--r) - var(--rim));min-height:220px;
  background:linear-gradient(160deg,#ffd27a,#ff8a3c);position:relative;overflow:hidden}
.coin__inner::after{content:"";position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")}
```

### 9. Dashed-Grid statt Karten (Flowz Logos, `2096876701775261945.md`)

```css
.logos{display:grid;grid-template-columns:repeat(5,1fr)}
.logos>li{padding:32px 0;display:grid;place-items:center;
  border-right:1px dashed rgba(255,255,255,.12);border-bottom:1px dashed rgba(255,255,255,.12)}
.logos>li:nth-child(5n){border-right:0}
.logos>li:nth-last-child(-n+5){border-bottom:0}
```

### 10. Testimonial-Portraitkarte (Motivra, `aakib-tiles.md`)

```css
.quote{position:relative;aspect-ratio:2/3;border-radius:12px;overflow:hidden}
.quote img{width:100%;height:100%;object-fit:cover}
.quote::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,.85))}
.quote figcaption{position:absolute;inset:auto 16px 20px;color:#ddd;font-size:12px;z-index:1}
.quote b{display:block;color:#fff;font-size:14px;font-weight:500}
```

## Varianten je Stilfamilie

| Familie | Abgrenzung | Radius | Padding | Belege |
|---|---|---|---|---|
| Tonal Light (SaaS-Marketing) | weiss auf #E2–#EE, kein Border, kein/kaum Schatten | 22–28 | 34–50 | `2095383602431459523.md`, `2096192737867350330.md`, `2095797753305612601.md` |
| Border Light (Dashboard) | #fff + 1px #E5–#EC + optional 0 1px 3px .06 | 8–14 | 16–24 | `2095874058697293985.md`, `2096215770783199316.md`, `2096618423983964587.md`, `2096944343487852961.md` |
| Border Dark (Dashboard/Docs) | Surface +6–10 Luma, 1px 6–10 % Weiss, kein Schatten | 12–20 | 24–35 | `2096499167225078020.md`, `2096891182701793331.md`, `2096175237109092642.md`, `shadcn.md` |
| Dark auf Dark (Editorial) | Karte gleich oder dunkler als Page, nur Hairline | 12 | 24–40 | `2096876701775261945.md`, `refero-2.md` Linear |
| Sharp (Brutal/Swiss) | Radius 0, 1px Linien, Eckmarken | 0 | 16–24 | `2096953356086313312.md`, `mobbin-2.md` Jasper, `2096292759489609818.md`, `aakib-tiles.md` Kalender |
| Material-Akzent | Verlauf, Grain, Glas-Panels; eine Karte pro Sektion | 24–40 | 32–48 | `2095784926717300835.md`, `2096855995909869867.md`, `2096674796704813174.md`, `mobbin-2.md` Amplemarket |
| Glas-Hülle | Milchglas aussen, deckend innen, Stroke-Gradient | 12–24 | 24–36 | `2096833304351961505.md`, `2096175830624055596.md`, `aakib-tiles.md` User-Details |
| Foto-Karte | Foto Vollfläche + Verlauf oder Scrim + Glas-Chip | 12–24 | 16–24 | `2096832279775486079.md`, `aakib-tiles.md` Portraits, `2095807169346334900.md` |
| Linien statt Karten | keine Fläche, 1px Grid, Cut-Marks | — | 32 | `gap-marcelkargul.md`, `refero-1.md` Mercury, `mobbin-1.md` Clerk |

## Dos

- Drei Helligkeitsstufen plus eine Hairline festlegen und für alle Karten der Seite verwenden (`2096499167225078020.md`, `2096891182701793331.md`).
- Radius-Kette vor dem Bauen notieren: Karte > Panel > Element, Innenradius = Aussenradius − Inset (`2095807169346334900.md`, `2096855995909869867.md`).
- Ein Slot-Schema pro Kartentyp und es in jeder Instanz wiederholen (`2096175237109092642.md`, `aakib-tiles.md` Pricing).
- Proof-Karten mit angeschnittenem UI-Fragment und Fade statt hartem Bildschnitt (`2095797753305612601.md`, `2096876701775261945.md`).
- Divider nur vor Aktionszeilen und zwischen Rows; letzte Row ohne (`2096833304351961505.md`, `2096891182701793331.md`).
- Auswahl und Highlight durch Inversion oder Versatz, nicht durch neue Farbe (`2096929195381457078.md`, `aakib-tiles.md`).
- Foto-Karten: Text nur auf der dunkelsten Fläche oder über Scrim (`2095807169346334900.md`, `2096832279775486079.md`).
- Glas mit `@supports not (backdrop-filter)`-Fallback und deckender Titelleiste (`2096833304351961505.md`).
- Schatten in Page-Hue tönen und erst ab 0.06 Alpha einsetzen (`2096618423983964587.md`, `prior_corpus.md`).
- Karten-Gap und Innenpadding aus derselben 4/8-Skala (16/20/24) (`shadcn.md`, `aakib-tiles.md`).

## Don'ts (mit Gegenbeispiel)

- Kein Schatten unter 0.05 Alpha als einzige Abgrenzung: Kargul `0 2px 12px rgba(0,0,0,.04)` ist unsichtbar, Karten verschmelzen mit #EEE (`2096192737867350330.md`).
- Keine Kartenfläche fast in Page-Farbe: Oqulus #FBFBFB auf #FFF, nur der Border zeigt die Form (`2096660897628668066.md`).
- Keine gemischten Radien ohne System: betwnstudios Panel r0 neben Chips r6–14 (`2095928637346472339.md`); Oqulus Shell 2f vs. Panel 1.2f ohne Konzentrik (`2096660897628668066.md`).
- Kein Toggle im Kartenheader, der bei langen Labels überläuft: Mono Charts Header bricht Layout (`2096175237109092642.md`).
- Keine Ellipsis-Beschreibungen in Karten; Text muss in den Slot passen (`2096175237109092642.md`, `2096876701775261945.md` „with a clean“).
- Keine leere Karte in einer Reihe voller Karten: Fastino GLiner-Karte ohne Button, CTA #F4EFEC unsichtbar (`2095807169346334900.md`).
- Keine drei identischen Feature-Karten: Flowz dreimal „Deep Work Mode“ (`2096876701775261945.md`); allgemeine Regel (`prior_corpus.md` taste-SKILL 612).
- Keine Selektionsinkonsistenz: Kargul gewählter Tag dunkle Pill, gewählter Slot helle Pill (`2096192737867350330.md`); Nexora Check-Icons uneinheitlich (`2096929195381457078.md`).
- Keine Chips, die bei Auswahl Layout verschieben: Kargul unselektiert bare Text, selektiert weisse Pill bold (`2096192737867350330.md`).
- Kein Grain unter Text: Flowly-Modal legt Textur über Copy (`2096674796704813174.md`).
- Keine Karten-Alpha, die den Hintergrund die Kartenfarbe verschieben lässt: Flowz Task-Zeile 2 wirkt braun (`2096833304351961505.md`).
- Keine KPI-Karte ohne Vergleichswert oder Zeitraum: Oqulus vier nackte Zahlen; Aloxi vier grüne Deltas ohne Kontext (`2096660897628668066.md`, `2096499167225078020.md`).
- Keine Beweis-Karten ausblenden, bevor Inhalt lesbar ist: Kanban-Karten verschwinden im Fade (`2096944343487852961.md`, `2096175830624055596.md`).
- Kein Body-Text unter 12px in Karten: Mindspace 9.5–10.5px (`2096832279775486079.md`); Testimonial-Wand unlesbar (`2096292759489609818.md`).
- Kein Frosted-Glass als Default-Politur auf B2B/Dashboard-Karten (`prior_corpus.md` unslop 26, taste-SKILL 356).
- Keine Karten um jeden Absatz; `CardTitle` als div ersetzt keine Heading-Semantik (`shadcn.md`).
- Keine bunten 3D-Avatare neben Pastell-Badges in derselben Karte, zwei Farbsysteme (`2096660897628668066.md`).

## Gilt nicht wenn

- Die Seite arbeitet mit Linien statt Karten (Blueprint, Swiss, Mercury): dann keine Flächen, keine Radien, Cut-Marks statt Border (`gap-marcelkargul.md`, `refero-1.md`, `mobbin-1.md` Clerk-Pricing).
- Dichte > 7 Elemente pro Sektion: Tabellenlogik mit 1px-Trennern statt Karten (`prior_corpus.md`, `aakib-tiles.md` Launchkit-Pricing).
- Karte schwebt über Foto oder Verlauf: dann Schatten Pflicht, Border optional (`refero-2.md` Stripe, `2096674796704813174.md`).
- Premium-Consumer oder Media-Overlay: Glas-Rezept mit Highlight-Kante erlaubt (`prior_corpus.md` taste-SKILL 1144–1200).
- Mockup-Rahmen (Seite als Karte auf Board-Canvas, Ampel-Titelleisten): Präsentation, nicht Produkt, nicht nachbauen (`2096499167225078020.md`, `2095488681796854015.md`, `aakib-tiles.md`).
- Mobile: kein Beleg im Corpus; Ableitung nur: Karten-Padding 24 → 16, Bento stapelt, angeschnittene Grids brauchen Scroll-Snap (`2096833304351961505.md`, `aakib-tiles.md`).

## Datenlücken

- Hover-, Fokus- und Drag-Zustände von Karten sind fast nie belegt (Ausnahme Drag-Karte rotiert −4° mit Schatten, `2096889729337921598.md`; Hover-Spalte Lurni, `2096215770783199316.md`).
- Exakte Alpha-Werte von Glas und Borders sind Schätzungen aus JPEG-Samples.
- Kein Mobile-Screenshot mit Karten im Corpus.

## Quellen

Primär (voll gelesen): `2095383602431459523.md`, `2095784926717300835.md`, `2095797753305612601.md`, `2095874058697293985.md`, `2095928637346472339.md`, `2096149200178418026.md`, `2096165490498695410.md`, `2096175237109092642.md` (+ video-1/-2), `2096215770783199316.md`, `2095783930775433616.md`, `2095807169346334900.md`, `2096618423983964587.md`, `2096634909263646898.md`, `2096674796704813174.md`, `2096832279775486079.md`, `2096855995909869867.md`, `2096891319843164276.md`, `2096929195381457078.md`, `2096192737867350330.md` (+ video-1/-2), `2096499167225078020.md`, `2096660897628668066.md`, `2096833304351961505.md`, `2096876701775261945.md`, `2096891182701793331.md`, `2096931638118871502.md`, `2096953356086313312.md`, `2095488681796854015.md`.
Sekundär (gezielt nach Kartenbelegen durchsucht): `shadcn.md`, `prior_corpus.md`, `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`, `refero-1.md`, `refero-2.md`, `designmd-me-1.md`, `designmd_supply.md`, `layers.md`, `twentyfirst.md`, `open_design.md`, `neuform-1.md`, `aakib-tiles.md`, `2095863741250474026.md`, `2096944343487852961.md`, `2096889729337921598.md`, `2096292759489609818.md`, `2096175830624055596.md`, `2095565814405742911.md`, `gap-uiux_hamad.md`, `gap-marcelkargul.md`.
Ohne Kartenbeleg: `2096931638118871502.md` (keine Karten), `gap-marcelkargul-2096970816969703645.md` (Post gelöscht).
