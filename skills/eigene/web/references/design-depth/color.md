# Farbe: Rollen statt Hexwerte, ein Akzent, Tiefe über Tonwert

Kapitel „color" des Web-Design-Skills. Korpus: 53 Deep-Analysen unter `../studies/design-depth/deep/` (X-Creator-Posts, Mobbin, Refero, designmd, Layers, 21st, shadcn, Prior-Corpus). Jede Zahl ist gemessen (Datei genannt) oder als **Startwert** markiert.

## TLDR

Fast jede gute Seite im Korpus hat genau eine Aktionsfarbe, baut Tiefe über drei Helligkeitsstufen statt Schatten, und lässt Buntfarbe nur dort zu, wo sie Bedeutung trägt.

## Rollen-Modell (Pflicht-Tokens)

Jede Seite definiert genau diese acht Rollen, Komponenten referenzieren nur Rollen, nie Hexwerte (Beleg: `shadcn.md` Token-Convention `--background/--foreground`, `--card/--card-foreground`; `designmd_supply.md` `globals.css:3-8`).

| Rolle | Aufgabe | Typischer Abstand |
|---|---|---|
| Page | Grund der Seite | nie reines #000/#fff (siehe Regel 1) |
| Surface | Karte, Panel, Sheet | 1 Stufe von Page (2–6 % Luminanz) |
| Raised | Chip, Pill, Track, Icon-Button, aktive Nav | 1 Stufe von Surface |
| Text | Headline, Zahlen, Titel | Off-Black oder Off-White |
| Muted | Copy, Label, Achse, Placeholder | zwei Stufen, ≥4.5:1 auf Page |
| Border | Hairline, Divider, Kartenkante | Alpha des Ink oder 1 fester Ton |
| Action | Primär-CTA, Selected, Link, Fokus | genau ein Wert pro Seite |
| Accent | Daten, Status, Deko | nur mit Bedeutung, nie = Action |

## Regeln (mit Beleg)

1. **Page ist nie reines Schwarz oder Weiß.** Dark: `#09090b` (`2096634909263646898.md` Sample x600/y1400; `twentyfirst.md` Header-Band), `#0b0b0b` (`2096931638118871502.md`, `2095863741250474026.md`), `#0f0e0c` warm (`2096876701775261945.md` Pixel 400,3600), `#0a0c10` kalt (`2096891182701793331.md`). Hell: `#f7f7f7` (`2096855995909869867.md`), `#f7f7f5` (`2095797753305612601.md`), `#f8f9fd` Kaltweiß Stripe / `#f4f5f0` Warmweiß Gumroad (`refero-2.md` Samples x700/y150), `#fbfaf6` Papier (`designmd_supply.md` globals.css:4). Ausnahme: App-UIs (Attio, Mocha, Lurni) bleiben `#fff` (`refero-2.md`, `2096215770783199316.md`). Prior-Corpus bestätigt das Verbot (`prior_corpus.md` taste-SKILL.md:585).

2. **Tiefe entsteht aus drei Luminanzstufen plus 1-px-Border, nie aus Schatten.** Dark: `#111 → #181818 → #131313` sunken (`2096175237109092642.md` frame-06 Panel, frame-29 Gap), `#0A0A0A → #111111 → #1B1B1B` + Border `#1E1E1E` (`2096499167225078020.md`), `#0A0C10 → #10141A → #171C23` + `#1E242C` (`2096891182701793331.md`), `#08090b → #101113 → #151618` (`refero-2.md`), shadcn oklch `.145 → .205 → .269` + Ring foreground/10 (`shadcn.md` card.md:632). Hell: `#F2F2F2 → #FAFAFA → #F5F5F5 → #fff` (`2095784926717300835.md` media-0), `#eee → #fff → #eee` nested (`2096192737867350330-video-1.md` second-10), `#f8efe6 → #f9f5f2 → #fcfbf9` warm (`2096929195381457078.md`).

3. **Genau eine Aktionsfarbe pro Seite.** Orange `#ED5B28` trägt Akzentwort, CTA, Proof-Zahlen, Links, Chart (`2095874058697293985.md` media-0 y≈300–470/770/900). Ultramarin `#1a2cff` für Marker, Headline-Akzent, Checks, Button (`2096292759489609818.md`). Lime `#C8F24A` für Marke, CTA, aktive Nav, Status Active, Progress (`2096891182701793331.md`). Blau `#4E81EE` für Klick, Chip, Eyebrow, Link, Headline-Akzent (`designmd-me-1.md`). Blau `#0b5cff` nur Button, Link, Fokus, Auswahl (`mobbin-2.md` 624b905e/781e68e0/82c8b5bc). Prior-Corpus: ein Akzent, Sättigung < 80 % (`prior_corpus.md` taste-SKILL.md:186-189).

4. **Schwarz oder Weiß darf die Aktionsfarbe sein.** `#151518` ist zugleich CTA, KPI-Kachel, aktiver Balken, Tooltip (`2096215770783199316.md`). `#161a23` Navy für gewählte Karte, aktiven Tab, Segment, Apply, CTA (`2096929195381457078.md` Pro-Karte y416–608, CTA y812–858). Weißer Button als einziger heller Block auf Dark (`2096175237109092642-video-1.md` frame-01; `2096634909263646898.md` `#fafafa`). Button ist immer das Inverse der Sektionsfläche (`2096149200178418026.md` `.section--dark{--btn-bg:#fff}` / `.section--light{--btn-bg:#111}`). Notion ersetzt Akzent durch Schwarz (`mobbin-3.md` fcfe2d50).

5. **Datenfarbe ist nie Aktionsfarbe.** Grüne Balken vs. orange CTA (`2095488681796854015.md` HRSr1m5bUAAuYh-), Koralle-Balken vs. blaue CTAs (System B ebd.), Grün-Chart `#2e7d4f` vs. Action `#ff5a1f` (`2096175830624055596.md` HRccl6nbwAAAj5o y≈1020–1190), Orange Daten `#F08A5D` vs. schwarze CTAs (`aakib-tiles.md`). Chart-Linien `#3b82f6`/`#f97316`, Buttons rein grau (`2096833304351961505.md` HRlyaAPa0AAv_I_).

6. **Buntfarbe trägt Bedeutung, sonst Grau.** Grün nur für positives Delta `+14.2%` und Benchmark-Marker (`2096175237109092642-video-2.md` frame-24/25), grüner Statuspunkt `#0fb54f` als einzige Chroma des ganzen Flows (`2096192737867350330.md` second-01 (523,217)), Grün `#02a274` nur im Produkt-Console, nie im Marketing (`2095565814405742911.md` HRTx4-EacAElxZU x2630 y340), Grün `#3f8a55` nur Erfolg/Ersparnis (`2096929195381457078.md` y587/y685). Rot nur Fehler, Blassgrün nur Erfolg, nie Marke (`refero-1.md` 49229bf2/33db4d94). Team-Kacheln als einzige Buntfarbe markieren Entitäten (`2096215770783199316.md` y852–946).

7. **Muted-Text hat zwei Stufen und bleibt lesbar.** `#4A4A5A` Copy / `#8A8A95` Achse (`2095784926717300835.md`), `#727177` einzige Muted-Stufe neben `#0a0a0a` (`2096618423983964587.md` y392 vs y437), Dark `#9A9A9A` + `#7A7A7A` (`2096499167225078020.md`), `#8A93A0` + `#5C6470` (`2096891182701793331.md`). Muted als Alpha des Ink statt eigenes Grau (`mobbin-1.md`; `designmd_supply.md` paper/95|60|45|15). Gemessene Verstöße: `#d9d9d9` auf `#f7f7f7` ≈ 1.4:1 (`2096891319843164276.md` image-1 y=660), `#A5A5A5` auf getöntem Grund ≈ 2.4:1 (`2096944343487852961.md` y≈1640–1900), Gelb `#F0B41A` auf `#FEF7E1` < 2:1 (`2096660897628668066.md` y 1089), Muted ~50 % Weiß auf Braun (`2095928637346472339.md` media-0 y 1025).

8. **Border als Alpha des Ink, ein Ton pro Seite.** `rgb(10 10 10/.08)` hell, `rgb(255 255 255/.1)` dunkel (`designmd_supply.md` globals.css:7), shadcn `.dark{--border:oklch(1 0 0/10%);--input:15%}` (`shadcn.md`), 12 % Weiß auf Dark, `#ECECEC` auf Hell (`2096149200178418026.md`), `rgba(255,255,255,.07)` (`2096634909263646898.md` y 1281), ein Ton `#E6E6E9/#ECECEF` für Karten, Zeilen, Tabs, Zellen (`2096215770783199316.md`).

9. **Raised liegt 3–4 % unter Surface, nie Mittelgrau.** Track `#f7f7f7`, Balken `#f4f4f4`, Squircle `#f6f7f9` (`2095383602431459523.md` media-0 x700–751, media-3 560,760, media-2 520,580), Tiles/Icon-Buttons `#f4f4f4` ohne Border (`2096618423983964587.md` Glocke x1600–1668), Raised minimal wärmer als Page `#F1F1EC` auf `#FAFAF8` (`mobbin-3.md` b1e65803), `#e8e0dd` auf `#f1ece8` (`2095807169346334900.md` image-3 x200 y1728).

10. **Charts monochrom staffeln.** Vier Graustufen `#FFF / #BFBFBF / #6B6B6B / #3A3A3A`, Reihenfolge = Priorität (`2096175237109092642-video-2.md` frame-20 Treemap, frame-17 Stacked). Ein Hue als Monochromskala Grün in 6 Stufen `#15865a → #d5f6e3` (`2096618423983964587.md` Donut x780–1270), Selection = dunkelste Stufe, Rest = hellste (`#15865a` vs `#b1e9ce` ebd. Bars). Heatmap = ein Hue in 4–5 Helligkeiten, Leerzelle `#1A1A1A` (`2096175237109092642-video-2.md` frame-28). Legendenfarbe = Elementfarbe aus demselben Array (`2095784926717300835.md` media-3 Icons y538/650/762 = Legende y860; Gegenbeispiel `2095383602431459523.md` media-0 Legende ≠ Ring).

11. **Text ist nie reines Schwarz; Ink darf Marke tragen.** `#14142B` Navy, `#1E1E30`, `#1A1A1A` (`2095784926717300835.md`), Petrol `#03363D` Zendesk und Navy `#050038` Miro tragen Marke ohne extra Akzent (`mobbin-1.md` 4ae34544), `#0a2540` Stripe (`designmd_supply.md`), Off-White `#fffef6` auf warmem Schwarz (`2096876701775261945.md`). Ausnahme editorial: Ink `#000` auf `#fffffb` (`refero-1.md` 5c404b95).

12. **Dark-Mode-Varianten unterscheiden sich in wenigen Tokens.** Zwei Hero-Varianten teilen Skelett und Footer, nur `--hero-bg`, `--ink-hero`, `--action` wechseln (`2096891319843164276.md` image-1 vs image-2). Dark-Board `#1C1C1E` als Kontrast-Insel mit Raised `#2A2A2C`, Border `#3A3A3C`, Muted `#8A8A8A`, Akzent bleibt `#F04E12` (`2095797753305612601.md` media-2 y≈80–915). shadcn `.dark{}` definiert dieselben Namen neu (`shadcn.md`).

13. **Warm und Kalt nicht mischen.** Warmes Schwarz `#0a050b` mit `#fd7830`, kaltes Schwarz `#050e0d` mit `#ff4a1a` und Pfirsich `#fbbb8f`, pro Sektion eine Temperatur (`2095783930775433616.md` image-1 TL x=960 vs BR x=3800). Warme Neutralskala `#f8efe6 → #fcfbf9` durchgängig (`2096929195381457078.md`). Prior-Corpus: Warm- und Kalt-Grau gemischt ist Verbot (`prior_corpus.md` Zeile 165).

14. **Farbe aus dem Motiv statt aus dem UI.** Alle Chroma kommt aus Foto, UI bleibt Grau + weißer CTA (`2096634909263646898.md` y 1100–1615; `2096149200178418026.md` Bernstein nur im Foto; `2095807169346334900.md` Akzent = Fotofarbe Orange/Petrol). Warmer Verlauf als Canvas, Chrome reines Schwarz, Send-Button `#666` ohne Akzent (`2096165490498695410.md` media-2 (990,2580)). Pastell-Motiv hält Schwarz/Weiß-UI kontrastreich (`2096944343487852961.md` Himmel `#F6CBB1/#EBD3DB/#C9D3E6`).

15. **Akzent in zwei Dosen: Vollton für Punkte, Tint für Flächen.** `#8CFF3B` für Griffe, Satzpunkt, Badge; `#D9FFB0` für Bar, Pills; Text nur `#5FCC1E` (`open_design.md` home-desktop Announcement-Bar y0–44). Orange nur als Kanten-Licht und Icon, nie Fläche oder Text (`2095783930775433616.md` TR/BL Composer-Kante). Accent-Hell `#F4A16A/#F5D8C8` nur in Chart-Flächen (`2095797753305612601.md`). Orange nur Geometrie und CTA-Ecken, nie hinter Text (`2096953356086313312.md`).

## Bauanleitungen (eigene Umsetzung)

### B1 Token-Skelett mit Rollen-Paaren

```html
<button class="btn-primary">Angebot sichern</button>
<article class="card"><p class="muted">Proof-Label</p><strong>+28 %</strong></article>
```

```css
:root{
  --page:#f7f7f6;            /* gemessen: 2096855995909869867 #f7f7f7 / prior_corpus #f7f7f6 */
  --surface:#ffffff;
  --raised:#f4f4f4;          /* 2096618423983964587 Tiles */
  --text:#111113;            /* prior_corpus Off-Black */
  --muted:#6b6b6b;           /* 2095863741250474026 */
  --border:rgb(17 17 19/.08);/* designmd_supply Ink-Alpha */
  --action:#161a23;          /* 2096929195381457078 Navy */
  --action-fg:#f3f0eb;
}
[data-theme=dark]{
  --page:#09090b;--surface:#111113;--raised:#1b1b1d;
  --text:#f4f4f5;--muted:#9a9a9a;--border:rgb(255 255 255/.1);
  --action:#fafafa;--action-fg:#0a0a0a;
}
body{background:var(--page);color:var(--text)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;box-shadow:none}
.raised{background:var(--raised);border:0}
.muted{color:var(--muted)}
.btn-primary{background:var(--action);color:var(--action-fg)}
```

### B2 Tonale Tiefe ohne Schatten (Dark)

```css
:root{--page:#111;--surface:#181818;--sunken:#131313;--raised:#2a2a2a}  /* 2096175237109092642 */
.card{background:var(--surface);border-radius:16px}
.card .panel{background:var(--sunken);border-radius:10px;padding:16px}
.card .chip,.card .seg{background:var(--raised);border-radius:999px}
/* Alternative mit Border statt vierter Stufe: 2096891182701793331 */
.card--lined{background:#10141A;border:1px solid #1E242C}
```

### B3 Tonale Tiefe hell, Karten ohne Border

```css
body{background:#eee}                          /* 2096192737867350330 second-03 (100,120) */
.card,.pill,.input{background:#fff;border:0;box-shadow:none}
.card-header,.day,.skeleton{background:#eee}   /* nested = wieder Page-Ton */
.btn{background:#252525;color:#fff} .btn:disabled{background:#9b9b9b}
```

### B4 Ein-Akzent-Verteilung (Action = Marke)

```css
:root{--accent:#C8F24A;--page:#0A0C10}       /* 2096891182701793331 */
.btn--primary{background:var(--accent);color:var(--page)}
.nav a[aria-current] svg{color:var(--accent)}
.progress>i{background:var(--accent)}
.badge--active{color:var(--accent);background:rgb(200 242 74/.12);border:1px solid rgb(200 242 74/.3)}
.btn--danger{background:none;color:#F26B5B}   /* Destructive bleibt eigener Token */
```

### B5 Daten-Monochromskala

```css
:root{--g900:#15865a;--g700:#24af74;--g500:#45c28a;--g300:#7adaac;--g200:#b1e9ce;--g100:#d5f6e3} /* 2096618423983964587 */
.bar{fill:var(--g200)} .bar.is-active{fill:var(--g900)}
.legend i{background:var(--c)} /* gleiche Variable wie Segment */
/* Mono-Charts Dark: 2096175237109092642-video-2 */
:root{--c1:#fff;--c2:#bfbfbf;--c3:#6b6b6b;--c4:#3a3a3a}
.delta-up{color:#22c55e} .mark{background:#22c55e;width:3px;height:14px}
```

### B6 Heatmap ein Hue

```css
.heat{display:grid;grid-template-columns:repeat(20,1fr);grid-auto-rows:14px;gap:6px}
.cell{border-radius:3px;background:color-mix(in srgb,var(--accent) calc(var(--lvl)*25%),#1a1a1a)}
/* --accent: #22c55e | #3b82f6 | #a855f7 (2096175237109092642-video-2 frame-28) */
```

### B7 Ink-Alpha-Hierarchie statt neue Hues

```css
:root{--paper:#fbfaf6;--ink:#0a0a0a;--muted:#6f6b66;--rule:rgb(10 10 10/.08)} /* designmd_supply */
.on-ink{background:var(--ink);color:rgb(251 250 246/.95)}
.on-ink .sub{color:rgb(251 250 246/.6)} .on-ink .hint{color:rgb(251 250 246/.45)}
.on-ink .chip{background:rgb(251 250 246/.15)}
```

### B8 Sektion invertieren mit drei Tokens

```css
:root{--cream:#efe6d8;--ink:#1f1f1f;--accent:#f45f1e}   /* 2096953356086313312 */
.sec-light{background:var(--cream);color:#232323}
.sec-dark{background:#212121;color:var(--cream)}
svg *{stroke:var(--accent)} /* Akzent nur Geometrie, nie Text */
```

## Varianten je Stilfamilie

### Dark Premium
- Page `#09090b`–`#0b0b0b`, Surface +2–4 %, Raised +4–6 %, Border Weiß 8–12 % (`2096634909263646898.md`, `neuform-1.md` `rgba(255,255,255,.08)`, `layers.md`).
- Action: weißer Button oder eine Signalfarbe (Lime `#C8F24A`, Orange `#fe5f00`, Blau `#4E81EE`); Text `#f5f5f5`, Muted `#9a9a9a`, Achsen `#5a5a5a` (`2096175237109092642-video-2.md`).
- Glow nur warm und dreistufig: Kern `#ffa646`, Mitte `#cf5b28`, Rand `#7d3b1b` in Off-Black `#0b0b0b` (`2096931638118871502.md`). Kein Neon-Outer-Glow (`prior_corpus.md` taste-SKILL.md:600).
- Invertierte Elevation ist erlaubt: Karten `#000` auf Page `#09090b` (`twentyfirst.md`), Raised dunkler als Surface `#1a1a1a → #0a0a0a` (`2096833304351961505.md`).

### Light Editorial
- Page Off-White `#fffffb`/`#f7f7f5`, Ink `#000`–`#111`, Farbe nur in Fotografie (`refero-1.md`, `2095863741250474026.md`).
- Zwei Textfarben reichen: `#0a0a0a` + `#727177` (`2096618423983964587.md`).
- Border `#E5E5E5`–`#ECECEC`, Deko-Linien `#E3–E8` (`2095488681796854015.md`).
- Dunkle Ink darf Marke sein: Petrol, Navy (`mobbin-1.md`).
- Hairline als Ink-Alpha, damit sie auf Papier und Weiß stimmt (`designmd_supply.md`).

### Pastell / Warm
- Page Creme `#f9f0e9`, Surfaces um 1–2 Stufen, Karten über Tonwert statt Border, Border ≤ 8 % Kontrast (`2096832279775486079.md` Page 20/20, Stat 400/620).
- Warme Neutralskala fünfstufig `#f8efe6 → #fcfbf9`, Action Navy-Schwarz (`2096929195381457078.md`).
- Pastell-Verlauf braucht einen dunklen Kontrast-Anker (schwarzer Kreis-Button, `2096891319843164276.md` image-2).
- Pastell-Chips rotieren nach Position, nicht Bedeutung; Portraits neutral (`mobbin-2.md` 71f4d377).
- Pastell-Motiv hinter Schwarz/Weiß-UI, Sättigung notfalls `filter:saturate(.8)` als **Startwert** (`2096944343487852961.md`).
- Gesperrt laut Prior-Corpus: Beige+Brass+Espresso, Cream+Sky (`prior_corpus.md` taste-SKILL.md:194-205).

### Mono
- Sechs Grauwerte ohne Akzent: Page `#eee`, Mark `#e8e8e8`, Surface `#fff`, Ink/Action `#1f1f1f`, Muted `#666`, Disabled `#9f9f9f` (`2096192737867350330-video-2.md`).
- Dark-Mono: Page `#161616`, Card `#1c1c1c`, Raised `#2a2a2a`, Chart-Serien Weiß + drei Graustufen (`2096175237109092642-video-1.md`).
- Einzige Chroma = Statuspunkt oder Delta (`2096192737867350330.md`, `2096175237109092642.md`).
- Schwarz/Weiß/Alpha-Weiß, Farbe aus Fotos (`2096149200178418026.md`).

## Dos

- Rollen-Paare Surface/Foreground definieren, Komponenten nur über Rollen stylen (`shadcn.md`).
- Page → Surface → Raised in 2–6 % Luminanzschritten, Schatten nur für schwebende Elemente wie Tooltip oder Nav-Pille (`2096215770783199316.md`, `mobbin-2.md` 8fb5fbc1).
- Selection = dunkelste Akzentstufe, Rest = hellste (`2096618423983964587.md` Jun-Balken).
- Legende und Elemente aus demselben Datenarray rendern (`2095383602431459523.md` Nachbau-Hinweis).
- Ghost-Button über Foto mit Stroke `currentColor` oder Scrim `rgb(0 0 0/.35)` (`prior_corpus.md` taste-SKILL.md:225).
- Grauen Headline-Anteil nur auf reinem Weiß; auf Foto lokalen Scrim setzen (`2096889729337921598.md`, `2096944343487852961.md`).
- Kontrast: Text 4.5:1, Large Text 3:1 ab 24 px oder 18,67 px fett (`prior_corpus.md` REPORT.md:66).
- Zwei Aktionsfarben nur mit klarer Zonentrennung: Marketing Blau, App Schwarz (`2096889729337921598.md`).
- Palette pro Projekt rotieren: Cold Luxury, Forest, Black+Tan, Cobalt+Cream, Terracotta+Slate, Olive+Brick, Mono+Pop (`prior_corpus.md`).
- Guide-Tokens vor Übernahme am Render prüfen, Herkunft markieren (`designmd_supply.md` derive-tokens.ts; `open_design.md` atelier-tokens vs REPORT).

## Don'ts mit Gegenbeispiel

- **Legendenfarben, die im Chart nicht vorkommen.** Legende Grün `#22d605`/Pink `#f83d6a`, Ringe Cyan/Blau/Orange (`2095383602431459523.md` media-0 Legende y860 vs Ringe y678).
- **Plan- und Status-Semantik teilen Töne.** Pro-Blau = Trial-Blau, Enterprise-Rot = Cancelled-Rot; Rot für Top-Tier liest sich als Fehler (`2096660897628668066.md` HRjV7XdaEAAuM1B x300/x985, y991/y1382).
- **Gelb als Text auf Pastell.** `#F0B41A` auf `#FEF7E1` < 2:1; korrigiert `#a87500` (`2096660897628668066.md` y1089).
- **Text-Faint als Deko.** Copyright `#d9d9d9` auf `#f7f7f7` ≈ 1.4:1 (`2096891319843164276.md` image-1 y=660); Legende `#2c2c2c` auf `#0d0d0d` ≈ 1.4:1 (`2095783930775433616.md` BL).
- **Drei Iconfarben in einer Kartenreihe.** Orange, Rot, Grün brechen die Ein-Akzent-Logik (`2095874058697293985.md` media-0 Icons x≈2650/2990/3335).
- **Zwei Interaktionsfarben.** Grüne Links neben blauen Tabs/AI-Labels (`2096215770783199316.md` Feed y493).
- **Linienfarbe ohne Datenbedeutung wechseln.** Cyan `#18E8C8` vs Lime `#6CFF3A` auf derselben Kurve (`2096499167225078020.md` HRhCVJmaQAA_p8G y=675 vs HRhCVJqbYAAMXxo y=630).
- **CTA ohne Kontrast zur Fläche.** Join-Pille `#f4efec` auf `#f1ece8` ≈ 1.02:1 (`2095807169346334900.md` image-3 x513–683).
- **Muted auf Glas unter 70 % Weiß.** Status `#8c726a` auf `#745952` ≈ 1.4:1 (`2095807169346334900.md` image-1 x898 y1060); Labels ~50 % Weiß auf Braun (`2095928637346472339.md`).
- **Grau-Headline auf gesättigter Bildstelle.** „That" `#8A8F96` auf Blau `#A9CBF0` ≈ 2.5:1 (`2096889729337921598.md` x1380–1525 y348).
- **Weißer Text auf hellem Mint-Material.** Headline auf `#b6ffe6` (`layers.md` soffit-ui x240–490 y210–290).
- **Icon-Buttons unter 3:1.** Icons `#2a2a2a` auf `#131313` (`2095783930775433616.md` TR Composer).
- **Status nur über Farbe.** Lachs `#e9c3b8` vs Lila `#b2a4ef` Dots ohne Form (`2095783930775433616.md` BL).
- **Copy und Proof widersprechen sich.** „monochromatic" versprochen, drei farbige Heatmaps geliefert (`2096175237109092642-video-2.md` frame-28).
- **Gestapelte Verläufe und Grain als Füller.** Mockup-Backdrop mit übersteuertem Grain nie als App-Hintergrund (`2096499167225078020.md`; `prior_corpus.md` unslop-react-design.md:22).

## Gilt nicht wenn

- **Dashboard mit mehr als vier Statuszuständen.** Dann Ampel-Reihenfolge Grün → Blau → Orange → Rot als eigene Semantik-Skala, getrennt vom Action-Token (`2096215770783199316.md` Progress-Bars y1165–1455).
- **Mehrfarbige Kategorie-Daten (Coins, Teams, Avatare).** Sieben Hues als Paar satt/hell erlaubt, aber nur in Daten-/Entitätsobjekten, UI bleibt neutral (`2096855995909869867.md` Karten y830–1170; `2096215770783199316.md` Teams).
- **Brand-Zellen und Poster.** Orange als Vollfläche mit Schwarz-Kanal für Text (`2095783930775433616.md` TL/BR Bänder). Auf Produkt-Flächen bleibt Orange Kanten-Licht.
- **Sektionsinversion als Systemregel.** Creme/Ink-Flip pro Sektion ist legitim, wenn drei Tokens das gesamte System tragen (`2096953356086313312.md`). Prior-Corpus verbietet den Flip nur als ungeplanten Einzelfall (`prior_corpus.md` Zeile 165).
- **Canvas-Apps.** Page darf ein warmer Verlauf sein, wenn Chrome opak schwarz bleibt und Overlays Alpha-Schwarz sind (`2096165490498695410.md`).
- **Editorial mit Fotografie.** Reines `#000` als Ink auf Off-White ist hier gewollt (`refero-1.md` 5c404b95).
- **Premium-Glow-CTA.** Warmer Randschein am Button ist ok als einzelnes Signal, nicht als Flächenglow (`layers.md` vesper-mobile y865–950; `2096891182701793331.md` Lime-Glow 1–2 px).

## Quellen

Analysen unter `../studies/design-depth/deep/`:

- Dashboards/Komponenten: `2095383602431459523.md`, `2095784926717300835.md`, `2096215770783199316.md`, `2096499167225078020.md`, `2096618423983964587.md`, `2096660897628668066.md`, `2096891182701793331.md`, `2096929195381457078.md`, `2096944343487852961.md`
- Mono/Charts: `2096175237109092642.md`, `2096175237109092642-video-1.md`, `2096175237109092642-video-2.md`, `2096192737867350330.md`, `2096192737867350330-video-1.md`, `2096192737867350330-video-2.md`
- Marketing hell: `2095797753305612601.md`, `2095874058697293985.md`, `2095488681796854015.md`, `2095565814405742911.md`, `2095863741250474026.md`, `2096175830624055596.md`, `2096292759489609818.md`, `2096855995909869867.md`, `2096889729337921598.md`, `2096891319843164276.md`, `aakib-tiles.md`
- Marketing dunkel/warm: `2095783930775433616.md`, `2095928637346472339.md`, `2096149200178418026.md`, `2096165490498695410.md`, `2096634909263646898.md`, `2096674796704813174.md`, `2096832279775486079.md`, `2096833304351961505.md`, `2096876701775261945.md`, `2096931638118871502.md`, `2096953356086313312.md`, `2095807169346334900.md`
- Systeme/Kataloge: `shadcn.md`, `designmd_supply.md`, `designmd-me-1.md`, `open_design.md`, `twentyfirst.md`, `layers.md`, `neuform-1.md`, `refero-1.md`, `refero-2.md`, `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`, `prior_corpus.md`, `gap-marcelkargul.md`, `gap-uiux_hamad.md`

Originalbilder: `/Users/raphaelhund/skill-workspace/web-design-depth/research/` (Pfade in den Analysen).
