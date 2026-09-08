# twentyfirst (21st.dev) — Bauanalyse Paket platform-text

Stand: 07.09.2026. Quellen: `research/twentyfirst/homepage.png` (1280×800), `969-preview.png` (710×534), `18191-preview.png` (3840×2880), `8223-preview.png` (1400×1050), `2510-preview.png` (1828×1176), Source-/Demo-Dateien, `REPORT.md`. Farbwerte sind Pixelmessungen (PIL) an genannten Regionen; Maße sind Schätzungen relativ zur Bildbreite. Zustände (Hover etc.) stammen aus Source, nicht aus Beobachtung.

## 1. homepage.png — Startseite bei 1280×800

### 1.1 Header/Nav (Region y 0–48, volle Breite)
- Geometrie: Header ca. 48px hoch, Logo links bei x≈88 (Inhaltskante), vier Nav-Links mittig (x 480–800), rechts „Log in“ + Pill-CTA „Sign up“ (x 1116–1191, ≈75×28px, Radius voll). Kein Border, kein Hintergrundwechsel, Header liegt direkt auf dem Page-Grund.
- Material: Grund `#09090b` (Messung y 0–120 dominant). Nav-Text Muted ≈`#b0b3ba`-Bereich (Antialias-Messung `#50525a` an Kante; Text ist hellgrau, nicht weiß). Logo weiß. CTA `#1132f5` (Messung 1116–1191/10–38), Text weiß.
- Typografie: Nav ~14px, Gewicht 400–500, Sans (General Sans laut REPORT DOM-Messung). Logo als Wortmarke „21ST“ in Bold-Caps mit Icon-Glyphe.
- Nachbau: `<header class="flex items-center justify-between h-12 px-[88px]">`, `nav` als `ul` mit `gap-7`, CTA `a.rounded-full.bg-[#1132f5].text-white.text-sm.px-4.py-1.5`. Kein `border-b`, kein `backdrop-filter`.
- Warum: Der einzige gesättigte Fleck oben rechts ist der CTA; Muted-Nav lenkt nicht ab. Kein Slop.

### 1.2 Hintergrund (ganze Fläche, Schwerpunkt rechts-mitte)
- Beobachtung: Oben links tiefes Schwarzgrau `#09090b`, nach rechts-unten wird es blau: bei (640,400) `#223975`, bei (300,470) `#1d3163`, unten rechts (1250,780) `#101927`. Das Blau ist hellster Bereich mitte-rechts oberhalb der Karten; nach oben rechts läuft es zurück in `#17243f`.
- Material: Radialer Verlauf, Zentrum ungefähr bei x≈55–65 %, y≈50–60 % der Viewport-Höhe, Kernfarbe ≈`#233b77`, außen `#09090b`. Kein Grain sichtbar, keine Linien, kein Raster. REPORT nennt Canvas im DOM; ob Canvas oder CSS, ist aus Pixeln nicht entscheidbar (unlesbar).
- Nachbau: `body{background:#09090b}` plus `section::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 55% at 60% 60%, #2a4a94 0%, #1a2d5c 35%, rgba(9,9,11,0) 75%);pointer-events:none}`. Zusätzlich lineares Overlay oben `linear-gradient(#09090b, transparent 40%)`, damit der Header auf reinem Dunkel sitzt.
- Warum: Der Verlauf liegt gegenüber der links verankerten Headline; Text bleibt auf dunklem Grund, das Blau füllt den leeren rechten Hero-Raum. Fehler: keiner sichtbar; Risiko bei Nachbau ist Banding, daher subtile Noise-Ebene erwägen (nicht im Original).

### 1.3 Hero-Headline (x 88–555, y 150–280)
- Geometrie: Zweizeilig, linksbündig, Zeile 1 „The living library“, Zeile 2 „of interfaces“. Headline-Block beginnt ~150px unter Header-Oberkante (≈100px Abstand nach Header). Zeilenabstand sehr eng: 64px Schrift / 67.84px Zeilenhöhe (REPORT DOM), also 1.06.
- Material: Weiß `#ffffff` (Messung brightest „The“). Wort „living“ in `#1136ff` (brightest in Region 210–370/150–215), kursives Serif mit hohem Strichkontrast.
- Typografie: 64px, Gewicht 500 (nicht Bold), Tracking −1.4px (≈−0.022em). Serif-Wort gleich groß, kursiv, wirkt optisch leicht größer durch Ascender. Serifname nicht messbar (unlesbar).
- Nachbau: `<h1 class="text-[64px] leading-[1.06] font-medium tracking-[-0.022em] text-white max-w-[520px]">The <em class="font-serif italic text-[#1136ff] not-italic-fix">living</em> library<br>of interfaces</h1>`. `em{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-weight:400}`.
- Warum: Ein Wort in Accent + Serif erzeugt Kontrast ohne zweite Farbe im Rest; Gewicht 500 hält die Headline ruhig. Slop-Risiko: Der Serif-Italic-Akzent ist inzwischen ein verbreitetes Muster; ohne inhaltlichen Grund (hier: „living“ = Kernversprechen) wirkt es Deko.

### 1.4 Subline (x 88–480, y 305–350)
- Geometrie: Zwei Zeilen, max-width ≈ 400px, 24px unter Headline, Zeilenhöhe ≈1.45.
- Material: Text hellgrau-blau ≈`#9aa3b8` (Antialias-Messung `#18264d`–`#323a55` auf Blau-Grund; Text ist deutlich gedämpft, nicht weiß). „12,000+“ weiß und unterstrichen (Messung brightest `#ffffff` in 88–150/300–330; Unterstreichung sichtbar als Linie unter der Zahl).
- Typografie: ≈18px, Gewicht 400.
- Nachbau: `<p class="mt-6 max-w-[26rem] text-lg text-white/60"><a class="text-white underline underline-offset-4 decoration-1">12,000+</a> crafted React components …</p>`.
- Warum: Die Zahl ist Proof; sie ist die einzige weiße Stelle im Absatz und trägt Link-Unterstrich. Gute Proof-Typografie ohne Badge.

### 1.5 Kategoriezeile (y 428–456, x 88–1000)
- Geometrie: Label „2,000+ Marketing blocks:“ links, dann 7 Chips in einer Reihe, Gap ≈ 32px zwischen Chip-Labels. Aktiver Chip „Animated heroes“ als Pill ≈126×28px, Radius voll, Padding ≈ 12px horizontal.
- Material: Aktiver Chip Fläche ≈`#435278` (Messung 280–406/428–456), das ist Weiß mit ~20 % Opacity über dem Blau-Grund; Text weiß. Inaktive Chips nur Text, Muted ≈`#8f9bb8` (Messung `#233b77` Antialias). Label „2,000+“ weiß, „Marketing blocks:“ gedämpft.
- Typografie: 14px, Gewicht 500.
- Nachbau: `<div class="flex items-center gap-8 text-sm"><span><b class="text-white">2,000+</b> <span class="text-white/60">Marketing blocks:</span></span><button class="rounded-full bg-white/20 px-3 py-1 text-white">Animated heroes</button><button class="text-white/60 hover:text-white">Hero sections</button>…</div>`.
- Warum: Aktivzustand nur als transluzente Pille, keine Border, keine Schatten. Chips und Label teilen eine Baseline; das erzeugt eine Zeile statt eines Filterblocks.

### 1.6 Produktstreifen (y 530–800, drei Karten, links/rechts angeschnitten)
- Geometrie: Karte 1 x 0–333 (links angeschnitten), Karte 2 x 397–797 (400px breit), Karte 3 x 861–1264. Gap 64px. Karten laufen unten aus dem Viewport. Kein sichtbarer Radius an den Oberkanten (Ecken scharf oder ≤4px). Streifen beginnt ~75px unter der Chipzeile.
- Material: Kartengrund Schwarz `#000000`–`#0e0e0e` (Messungen 600,560 / 1000,560 / 300,700). Kein Border, kein Schatten; die Trennung entsteht allein aus Schwarz auf Dunkelblau. Inhalte sind echte Interface-Renderings: Karte 1 chromatisches Metallobjekt (Raster), Karte 2 Text-Layout mit eingebettetem Thumbnail, Karte 3 Punktraster mit Kupferstich-Illustration und Mono-Titel „ENDLESS PURSUIT“.
- Nachbau: `<div class="flex gap-16 overflow-hidden -mx-[88px] pl-[0]"> <article class="w-[400px] shrink-0 aspect-[4/3] bg-black overflow-hidden"><img …></article>…</div>`; Startversatz negativ, damit die erste Karte angeschnitten ist (`margin-left:-64px` o. ä.).
- Warum: Angeschnittene Kanten signalisieren „mehr“ ohne Pfeile. Schwarze Karten auf blauem Grund = Surface dunkler als Page, invertierte Elevation. Slop-Risiko: Wenn Kartenbilder keine echten Produktpixel sind, kippt das in Deko.

### 1.7 Farblogik Homepage (Rollentabelle)
| Rolle | Wert | Beleg |
|---|---|---|
| Page | `#09090b` | homepage.png 0–120 y |
| Glow/Accent-Surface | `#233b77` → `#1d3163` | homepage.png (640,400),(300,470) |
| Surface (Karten) | `#000000`–`#0e0e0e` | homepage.png Karten y 530+ |
| Action | `#1132f5` | Sign-up 1116–1191 |
| Accent-Text | `#1136ff` | „living“ |
| Text | `#ffffff` | Headline, Zahlen |
| Muted | Weiß bei ~55–65 % Opacity | Subline, Nav, Chips |
| Raised/Selected | Weiß bei ~20 % Opacity | aktiver Chip |
| Border | keine sichtbar | — |

### 1.8 Spacing-Rhythmus Homepage
- Inhaltskante 88px bei 1280 (≈6.9 %). Header 48 → Headline-Start 150 (≈100px Luft) → Subline +24 → Chipzeile +80 → Streifen +75. Rhythmus grob 24 / 80 / 100. Kein 8er-Grid streng ablesbar; die großen Abstände dominieren.

## 2. 969-preview.png — Interactive Hover Button (Default-Zustand)
- Geometrie: Pill 254×82px bei 710px Bildbreite, mittig; das Bild ist wahrscheinlich 2× gerendert (Source: `w-32`=128px, `p-2`=8px, Schrift ~16px → 128×40 CSS-px). Border 1px hell. Punkt Ø≈8px (`h-2 w-2`), Position `left:20%; top:40%`. Label mittig, um 4px nach rechts verschoben (`translate-x-1`).
- Material: Fläche `#ffffff`, Border `#e4e4e7` (Messung Region), Punkt `#18181b`, Text `#09090b`. Kein Schatten, kein Verlauf.
- Typografie: Semibold, Sans, ~16px (im Bild 32px), Tracking normal.
- Nachbau (nativ, ohne React):
  ```html
  <button class="btn-hover" type="button"><span class="a">Button</span><span class="b" aria-hidden="true">Button →</span><i class="dot" aria-hidden="true"></i></button>
  ```
  ```css
  .btn-hover{position:relative;overflow:hidden;border:1px solid #e4e4e7;border-radius:9999px;background:#fff;padding:.5rem 1.25rem;font-weight:600;color:#09090b}
  .dot{position:absolute;left:20%;top:40%;width:8px;height:8px;border-radius:8px;background:#18181b;transition:all .3s}
  .b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:.5rem;color:#fff;opacity:0;transform:translateX(3rem);transition:all .3s;z-index:1}
  .a{display:inline-block;transform:translateX(.25rem);transition:all .3s}
  .btn-hover:hover .dot,.btn-hover:focus-visible .dot{left:0;top:0;width:100%;height:100%;transform:scale(1.8)}
  .btn-hover:hover .a{transform:translateX(3rem);opacity:0}
  .btn-hover:hover .b{transform:translateX(-.25rem);opacity:1}
  @media(prefers-reduced-motion:reduce){.btn-hover *{transition:none}}
  ```
- Warum: Drei Ebenen (Fläche, Label, Punkt) statt Farbwechsel; der Punkt ist im Ruhezustand ein Affordance-Hinweis. Fehler in Source: doppelter Text ohne `aria-hidden`, feste Breite `w-32`, `transition-all` animiert Layout-Properties. Bei Nachbau `aria-hidden` und flexible Breite setzen.

## 3. 18191-preview.png — Mega-Menü (Products geöffnet), 3840×2880 (2×)
- Geometrie (in 1×-CSS-px, Bild/1.92/2 ≈ /3.84... hier auf 2000px-Anzeige bezogen, Faktor ≈0.96): Trigger „Products“ Pill ≈168×56 Anzeige → ≈40px hoch, Radius ≈6px, Padding ≈ 16px horizontal. Trigger-Reihe Gap ≈ 32px. Panel ≈1408px Anzeige-Breite (Source `w-[900px]` + Padding), Höhe ≈ 560 Anzeige, Radius ≈ 8px, Border 1px, Abstand Trigger→Panel ≈ 12px. Innen: `p-4` (16px), drei Spalten, linke zwei Drittel mit 2×3 Items, rechtes Drittel mit 3 Items, vertikale Trennlinie 1px. Item-Padding 12px, Icon 20px, Gap Icon→Titel 8px, Titel→Beschreibung 8px, Item-Gap 12px.
- Material: Panel `#ffffff`, Border/Divider `#e5e5e5` (Messungen 510,1010 und 2284,1500), Trigger-Hover/Open-Fläche `#f5f5f5`, Titel `#0a0a0a`, Beschreibung und Sektionsheading `#737373`. Schatten: kaum sichtbar, sehr weich, geschätzt `0 4px 12px rgba(0,0,0,.05)`. Kein Blur, kein Glas.
- Typografie: Trigger 14–15px Medium. Sektionsheading 14px Semibold Uppercase, Tracking ≈ +0.02em, Muted. Item-Titel 14–15px Semibold, Tracking tight. Beschreibung 14px, Zeilenhöhe 1.375 (`leading-snug`), 2 Zeilen Clamp mit Ellipsis (sichtbar bei „section o…“).
- Nachbau:
  ```html
  <nav><ul class="menubar"><li><button aria-expanded="true">Products <svg chevron/></button>
  <div class="panel" role="region"><section class="cap"><h6>Capabilities</h6><ul class="grid2">…<li><a><span class="row"><svg 20/> Accordion</span><p>…</p></a></li>…</ul></section><section class="feat">…</section></div></li></ul></nav>
  ```
  ```css
  .panel{display:grid;grid-template-columns:2fr 1fr;gap:12px;width:min(900px,calc(100vw - 32px));padding:16px;background:#fff;border:1px solid #e5e5e5;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.05)}
  .feat{border-left:1px solid #e5e5e5;padding-left:16px}
  h6{font:600 14px/1 system-ui;text-transform:uppercase;color:#737373;padding-left:10px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
  li a{display:block;padding:12px;border-radius:6px}li a:hover,li a:focus-visible{background:#f5f5f5}
  li p{margin-top:8px;font-size:14px;line-height:1.375;color:#737373;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  ```
- Warum: Hierarchie aus drei Grautönen (0a/73/e5) und einem Gewichtssprung, keine Farbe. Die Trennlinie ersetzt eine zweite Karte. Fehler: harte 900px, Ellipsis schneidet Sinn ab, Chevron-Rotation und Radix-Fokuslogik nur aus Source.

## 4. 8223-preview.png — Service Cards 2×2 (1400×1050)
- Geometrie: Container max-width ≈ 992px (`max-w-5xl` = 1024 minus Padding), Karten ≈ 484×180px, Gap 24px, Radius 12px (`rounded-xl`), Padding 24px. Titel oben links, CTA unten links (`mt-auto`). Bild 160×160 absolut bei `right:-32px; bottom:-32px`, also an zwei Kanten beschnitten (Kegel/Kugel laufen unten rechts aus der Karte).
- Material: Rot `#fa3e42` (= `bg-red-500/90` über Weiß), Blau `#3c80ff` (`blue-500/90`), Grau `#f3f3f3` (`bg-secondary`), Weiß `#ffffff` mit sehr weichem Schatten (`shadow-sm`, Kante kaum messbar: Randpixel bleiben `#ffffff`, Schatten ≈ `0 1px 3px rgba(0,0,0,.08)`). Bilder: 3D-Raster-Freisteller (Bowling, Schachdame, Spinne, Notizblock), Opacity 0.9. Text auf Rot/Blau weiß, auf Weiß/Grau `#0a0b0a`.
- Typografie: Titel 24px Bold, Tracking tight. CTA „LEARN MORE“ 14px Semibold Uppercase + Lucide-Arrow 16px, Gap 8px.
- Nachbau:
  ```html
  <article class="svc svc--red"><h3>Gamification Marketing</h3><a href="…">Learn more <svg arrow/></a><img src="…" alt="" class="svc__img"></article>
  ```
  ```css
  .svc{position:relative;display:flex;flex-direction:column;min-height:180px;padding:24px;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);transition:transform .3s,box-shadow .3s}
  .svc h3{font:700 24px/1.2;letter-spacing:-.02em}.svc a{margin-top:auto;font:600 14px/1;text-transform:uppercase;display:inline-flex;gap:8px;align-items:center;position:relative;z-index:1}
  .svc__img{position:absolute;right:-32px;bottom:-32px;width:160px;height:160px;object-fit:contain;opacity:.9;transition:transform .4s}
  .svc:hover{transform:scale(1.02);box-shadow:0 10px 15px rgba(0,0,0,.1)}.svc:hover .svc__img{transform:scale(1.1) rotate(3deg) translateX(10px)}
  .svc--red{background:rgba(239,68,68,.9);color:#fff}.svc--blue{background:rgba(59,130,246,.9);color:#fff}.svc--gray{background:#f3f3f3}
  ```
- Warum: Vier Vollflächen ohne Border bilden ein Farbraster; das Motiv wird bewusst beschnitten und wirkt wie ein Objekt, das aus der Karte ragt. Fehler/Slop: Generisches „Learn more“, endlos wippender Pfeil aus Source, ganze Karte nicht klickbar, Alt-Text stimmt nicht mit Bildern überein (Demo sagt Farbeimer/Megafon, Bild zeigt Schachdame/Spinne). 3D-Clipart ist ein Slop-Marker, wenn es keinen Bezug zur Leistung hat.

## 5. 2510-preview.png — Shader-Hintergrund (1828×1176)
- Geometrie: Vollfläche. Linienbündel läuft horizontal durch die Bildmitte, Amplitude links klein, Mitte groß (Bogen bis y≈210), rechts wieder flach. Linien 1–4px breit mit weichem Halo ≈ 12–20px.
- Material: Grund links `#1b194b`→ rechts `#6730c0` (horizontaler Mix aus GLSL `bgColor1 (0.1,0.1,0.3)` und `bgColor2 (0.3,0.1,0.5)`), oben/unten abgedunkelt bis `#04040a` (verticalFade = Cosinus über uv.y). Linienfarbe `#7a45d9` (Messung 780,215) aus `lineColor (0.4,0.2,0.8)` additiv; Kerne fast weiß. Kleine Lichtpunkte auf den Linien (`drawCircle` ×4 Helligkeit). Kein Grain, kein Raster (Grid-Funktionen im Shader definiert, im `main` nicht aufgerufen).
- Nachbau ohne WebGL (statisch): `background:linear-gradient(90deg,#1a1a4d,#4d1a80)` + vertikale Maske `mask-image:linear-gradient(transparent,black 25%,black 75%,transparent)`; darüber ein SVG mit 12–16 `<path>` (kubische Wellen, `stroke:#8b5cf6; stroke-width:1.5; opacity:.7`) und `filter:url(#glow)` (`feGaussianBlur stdDeviation=4` + `feMerge`), plus wenige `<circle r=2 fill=#fff>`. Für Bewegung: Canvas/WebGL nach Source, aber mit `cancelAnimationFrame`, `IntersectionObserver`-Pause, `prefers-reduced-motion` und devicePixelRatio.
- Warum: Dunkler Rand + helle Mitte liefert freien Textbereich oben/unten. Fehler: Source hat kein Cleanup, keine Pause, kein Fallback, negativer z-index fixed über ganze Seite.

## 6. Gemeinsamkeiten im Paket
- Alle vier Komponenten und die Homepage nutzen dieselbe Neutralskala (Zinc/Neutral): `#09090b`/`#0a0a0a` Text bzw. Page, `#737373` Muted, `#e4e4e7`/`#e5e5e5` Border, `#f5f5f5`/`#f3f3f3` Raised. Beleg: 969 Border, 18191 Border/Muted, 8223 Grau, homepage Page.
- Radien: Voll (Pills: Sign-up, Chip, Button 969), 6–8px (Menü-Items, Panel), 12px (Service Cards). Keine 16–24px-Radien.
- Schatten sind minimal oder fehlen (Homepage keine, Menü ≈5 % Alpha, Card `shadow-sm`). Kontrast entsteht aus Fläche gegen Fläche.
- Uppercase-Labels in 14px Semibold für Meta/CTA (18191 Headings, 8223 „LEARN MORE“).
- Bewegung: 300ms als Standarddauer (969, 8223 Card), 400ms für Bilder.
- Beschnitt als Stilmittel: Homepage-Streifen links/rechts, Service-Bild an zwei Kanten.

## 7. Dos
- Eine Accent-Farbe (Blau `#1132f5`) nur für CTA und ein Headline-Wort einsetzen.
- Muted-Text als Weiß mit 55–65 % Opacity auf Dunkel, `#737373` auf Weiß.
- Proof-Zahlen weiß + Unterstrich im sonst gedämpften Satz.
- Headline Gewicht 500, Tracking −0.02em, Zeilenhöhe ≈1.06.
- Karten ohne Border auf farbigem Grund; Elevation durch dunklere/hellere Fläche.
- Dekorative Freisteller bewusst an zwei Kanten beschneiden (negative Offsets + `overflow:hidden`).

## 8. Don'ts
- Keine 3D-Clipart ohne Leistungsbezug; keine Katalog-Alt-Texte übernehmen.
- Kein Endlos-Wippen von Pfeilen; kein `transition:all` auf Layout-Properties.
- Kein festes `w-32`/`w-[900px]`; Breite aus Inhalt bzw. `min(900px, 100vw - 32px)`.
- Kein fixed Canvas mit `z-index:-10` über die ganze Seite; auf Sektion begrenzen.
- Kein doppeltes Label im Accessibility-Tree.
- Serif-Italic-Akzentwort nur, wenn das Wort die Kernaussage trägt.

## 9. Mobile-Hinweise
- Keine mobilen Screenshots im Paket (unlesbar). Aus Source: Service Cards 1 Spalte < 640px; Mega-Menü hat keine Mobile-Variante; Homepage-Streifen benötigt horizontales Scrollen oder Stapeln — nicht beobachtet.

## 10. Unlesbar / nicht belegt
- Serif-Schriftname der Homepage; ob der Hero-Verlauf Canvas oder CSS ist; exakte Schattenwerte von Panel/Card (Randpixel messen weiß); Hover-/Fokus-/Reduced-Motion-Verhalten aller Komponenten (nur Source); Homepage unterhalb y=800.
