# Buttons, CTAs, Icon-Buttons, Pills, Badges, Tags

## TLDR

Ein Screen hat genau einen Primär-CTA, der durch Luminanz oder eine Fläche gewinnt; alles andere ist Ghost, Text oder grau, und alle Buttons einer Seite teilen eine Höhe und eine Radius-Familie.

## Regeln

Jede Zahl ist gemessen (Datei genannt) oder als **Startwert** markiert.

### R1 Ein Primär-CTA pro Viewport, Hierarchie über Luminanz statt Farbe
- Genau eine weisse Vollfläche pro Viewport ist die Primary Action; alle anderen Buttons bleiben Raised-Grau. Beleg: `2096175237109092642-video-1.md` frame-01.jpg (`View GitHub Repository` y 180–215, einzige weisse Fläche); `2096499167225078020.md` (`Add Member` x 255–455, y 220–275).
- Nur ein CTA pro Preistabelle ist hell (#f3f3f3), alle anderen #26272b; das Set wird nach langen Tabellen wiederholt. Beleg: `refero-2.md` linear-tile-1.jpg y 505–530, linear-tile-3.jpg y 425–465.
- Primär-Pill ist immer das Inverse der Section-Fläche: Weiss auf Dunkel, Schwarz auf Hell. Beleg: `2096149200178418026.md` media-2.jpg (weiss), media-3.jpg (schwarz); `aakib-tiles.md` HRYA2c5acAAMBO-_0 y 525–560.
- Auf dunklem Grund braucht die Nav keine Akzentfarbe: die weisse Pill `Join waitlist` ist der einzige helle Block. Beleg: `2095863741250474026.md` HRYA2c5acAAMBO-.jpg Nav y≈90.
- Primär-Action als Graphit-Pill, nie farbig; Sekundär als Outline-Pill. Beleg: `open_design.md` home-desktop.png CTA-Paar y 452–500.

### R2 Sekundär ist Ghost, Text oder Tonfläche, nie eine zweite Vollfläche
- Sekundär-Button ist Weiss-Transparenz (~22 %, gemessen #474747) auf Schwarz, gleiche Höhe wie Primär, kein Border, kein Icon. Beleg: `2095928637346472339.md` media-1.jpg x 295–488, y 405–460.
- Sekundär = #EDEDED-Fläche mit dunklem Text, gleiche Höhe 40 px, Radius 8, Gap 16. Beleg: `2095874058697293985.md` media-0.jpg Hero y≈745–790 (`Talk to Sales` / `Start free trial`).
- `Back` ist reiner Textbutton Weight 600, 32 px links vom Primär auf gleicher Baseline, nie eine zweite Pill. Beleg: `2096192737867350330-video-2.md` second-17.jpg Back x 576–610, Continue x 641 (Gap ≈31 px).
- Destruktive Aktion steht links vom Primär als roter Text (#F26B5B), nie als gefüllter roter Button. Beleg: `2096891182701793331.md` HRmm6qNawAAvigo.jpg y 386, `Cancel plan` x 570–710 neben `Upgrade` x 755–908.
- Ghost-Pill mit 1 px Border #3d3d3d und Play-Kreis 24 px links, gleiche Höhe wie Primär. Beleg: `2096931638118871502.md` HRmtg4lbwAEwCZ5.jpg Button 1027–1260, 550–622.

### R3 Höhe: Marketing 40–56 px, Produkt-UI 28–36 px, Nav kleiner als Hero
- Hero-CTAs 44 px, Nav-Buttons 36 px. Beleg: `2096876701775261945.md` HRmaNBSbUAE_QzN.jpg CTA-Paar y 770–830, Nav-Button y 290–340; `open_design.md` Header 36 px (y 68–104) vs Hero 50 px (y 452–500), mobil 56 px (home-mobile-settled.png y 671–727).
- Onboarding-Primär-Pill 52–56 px (#1F1F1F / #252525). Beleg: `2096192737867350330-video-2.md` second-17.jpg Continue y 530–585; `2096192737867350330.md` second-03.jpg (650,700)=#252525.
- Produkt-Buttons: shadcn Basis h 32, px 10, Gap 6, 14 px/500 (DOM-Messung). Beleg: `shadcn.md` theming.html `h-8 gap-1.5 px-2.5`.
- Canvas-Controls 28 px, Zoom-Pill 28 px. Beleg: `2096165490498695410.md` media-0.jpg Split-Button x 410–508, y 352–406; media-1.jpg Zoom x 160–358, y 1675–1730.
- Höhen-Skala einer Seite ist keine 8er-Reihe, sondern Font + Padding: 26 · 27 · 32 · 34 · 37 · 42. Beleg: `designmd-me-1.md` Zeile 151.
- Anti-Beispiel: Nav-CTA 60 px neben Hero-CTA 72 px ist fast gleich schwer. Beleg: `2096931638118871502.md` HRmtg4lbwAEwCZ5.jpg Nav-CTA 1695–1860, 45–105.

### R4 Radius: eine Familie pro Seite, nie gemischt
- Entweder Pill (999) oder 4–6 px, nie beides in einer Button-Rolle. Beleg: `2095863741250474026.md` HRYAn9ea8AAjiLg.jpg (Pill) vs HRYAn81bIAAztkn.jpg (Radius 6).
- Zwei Radius-Familien sind erlaubt, wenn die Rolle sie trennt: 999 für Pills/CTA/Chips, 8 für Icon-Cluster und Split-Buttons. Beleg: `designmd-me-1.md` discover-desktop.png CTA y 424–466 (999); stripe-desktop.png Visit/Copy/Like y 224–261 (8).
- Radius pro Komponentenrolle: Controls 4, Karten 16, Nav-Pillen 999. Beleg: `refero-2.md` ac783c6e CTA x 437–622 (4 px), Karten y 775ff (16), About-Pille (999).
- Produkt-UI 3–4 px; Marketing-CTA im Hero Voll-Pill. Beleg: `mobbin-1.md` 3d5dcb6c (Back/Book y 400), 0823c6ef (Pill y 337).
- Radius 0 auf allen Marketing-Elementen inklusive Badge und Nav-Button. Beleg: `2095565814405742911.md` HRTx4-EacAA8TEU.jpg Nav-Button x 2415–2720, y 95–185.
- Guide-Werte nicht blind übernehmen: Linear-Guide fordert Pill, Aufnahme zeigt Nav-Button 72×32 Radius 8. Beleg: `designmd_supply.md` linear-source-home.png x 1520–1594, y 20–52.

### R5 Border, Glow, Gradient: Highlight-Kante innen, Glow nur farbig und nur beim Primär
- Verlauf-Primär: vertikal hell→dunkel, 1 px dunklere Border, Inset-Highlight oben, weicher Drop. Beleg: `2096292759489609818.md` HReHDCKbgAENsSQ.jpg Nav-CTA, Hero-CTA, `Try it now`.
- Blau-Verlauf, Radius 14, Inset 1 px oben, farbiger Glow 0 8px 20px rgba(47,107,232,.35). Beleg: `2096889729337921598.md` HRml921acAEzvBx.jpg Nav-CTA x 1702–1920, y 55–107.
- Orange-Verlauf-Pill 72 px mit Inset-Highlight oben und Inset-Schatten unten, kein Outer-Glow. Beleg: `2096931638118871502.md` HRmtg4lbwAEwCZ5.jpg Button 738–1005, 550–622.
- Violett-Verlauf, Pill, Glow 0 6px 18px rgba(124,77,255,.4). Beleg: `2095784926717300835.md` media-2.jpg Send-Button x 618–745, y 800–855.
- 1-px-Lime-Ring statt Schatten: `box-shadow:0 0 0 1px rgb(200 242 74/.35)`. Beleg: `2096891182701793331.md` HRmm6qNawAAvigo.jpg Upgrade x 755–908, y 355–420.
- Weisser Primär mit weissem Glow 0 0 24px rgba(255,255,255,.18) auf Dunkel. Beleg: `2096499167225078020.md` HRhCVJqbYAAMXxo.jpg x 255–455, y 220–275.
- Outline-Pill mit orange-transparenter Kontur (gemessen #998a61/#87562b ≈ rgba(255,120,40,.55)) auf #242424, kein Fill-Verlauf. Beleg: `2095783930775433616.md` image-1.jpg TR x 2520–2900, y 450–575.
- Gradient-Border-Wrapper für Ghost: 1 px Padding, Verlauf 30 %→5 %→transparent, dunkle Innenfläche. Beleg: `neuform-1.md` 01-home-desktop.png Karte D y 688–742.

### R6 Anatomie: Label + Suffix-Icon; Icon-Tile oder Orb rechts innen als Signatur
- Pfeil-Suffix mit 8–10 px Gap bei Foto- und Sekundär-Pills. Beleg: `2095797753305612601.md` media-0.jpg `Download app for free →` y≈570.
- Weisser Primär mit schwarzem Icon-Kästchen 30–34 px rechts innen, Padding rechts 8 px. Beleg: `2095928637346472339.md` media-0.jpg x 92–360, y 354–408.
- Dunkler Verlaufsblock mit weissem Arrow-Tile 32 px rechts innen, identisch in Nav und Hero. Beleg: `2096855995909869867.md` image-1.jpg Nav x 1645–1825, y 197–252; Hero x 910–1090, y 692–750.
- Dunkle Pill mit weissem Icon-Orb 26 px rechts und 1 px hellem Rand oben. Beleg: `layers.md` 02-home-desktop.png CTA x 535–735, y 333–373.
- Creme-Pill mit drei Zonen: Marken-SVG links, Label linksbündig, Pfeil in grauer Kreisscheibe 34 px rechts. Beleg: `neuform-1.md` 01-home-desktop.png y 366–412.
- Kontrastgeflippter Icon-Kreis 30 px links im Primär. Beleg: `open_design.md` home-desktop.png `Desktop herunterladen` x 480–715, y 452–500.
- Chevron-Suffix bei CTAs in Listen (`Try it now ›`). Beleg: `2096292759489609818.md` HReHDCKbgAENsSQ.jpg Stepper unten.
- Icon-Seite bekommt 2 px weniger Padding; SVG 16 px, shrink-0, pointer-events none. Beleg: `shadcn.md` theming.html `has-data-[icon=inline-start]:pl-2`.

### R7 Zustände: Disabled als eigener Grauwert, Hover als Tonwert, Focus als Ring
- Disabled = eigener Grauton #9b9b9b/#9E9E9E mit hellem Text, nie Opacity auf dem ganzen Button. Beleg: `2096192737867350330.md` second-11.jpg (700,711)=#9b9b9b; `2096192737867350330-video-1.md` second-02.jpg.
- Hover Primär: #252525 → #4d4d4d. Beleg: `2096192737867350330.md` second-14.jpg (700,685)=#4d4d4d.
- Disabled bleibt als Outline-Pille sichtbar, zeigt Textfarbe #5c5c64 plus Schloss-Icon. Beleg: `layers.md` vesper.png `Copy prompt` x 742–905, y 325–367.
- Disabled Icon-Button: transparente Fläche mit Muted-Pfeil #c9c4c0; aktiv #f3ece5. Beleg: `2096832279775486079.md` image-1.jpg Testimonial-Pfeile x 1340/1366, y 840.
- Disabled Submit im Blau-System: #2F4882 statt #4E81EE, opacity 1. Beleg: `designmd-me-1.md` Zeile 51.
- Primär-Hover senkt Deckkraft auf 80 %; Outline-Hover und aria-expanded = Muted-Fläche. Beleg: `shadcn.md` theming.html `hover:bg-primary/80`, `aria-expanded:bg-muted`.
- Focus-visible: Border = Ring plus 3 px Ring bei 50 %; Active: translateY(1px), ausser bei aria-haspopup. Beleg: `shadcn.md` theming.html `focus-visible:ring-3 ring-ring/50 active:not-aria-[haspopup]:translate-y-px`.
- Submit nach Absenden von Fill zu Outline (2 px Schwarz). Beleg: `refero-1.md` 3acf3200 y 563–612 vs 33db4d94.
- Pending hält Breite: `[aria-busy=true]{color:transparent}` plus Spinner. Beleg: `prior_corpus.md` REPORT.md:70.
- Anti-Beispiel: Hover und Selected der Zeitslots sehen identisch aus (#f2f2f2). Beleg: `2096192737867350330.md` second-14.jpg.

### R8 Icon-Buttons: quadratisch zur Buttonhöhe, Kreis oder Radius 8–12
- Exakt quadratisch zur Buttonhöhe (32×32), SVG 16 px. Beleg: `shadcn.md` button.png x 653–686, y 394–428.
- Kreise Ø40 auf #f4f4f4 mit 1.5 px Outline-Icon. Beleg: `2096618423983964587.md` image-1.jpg Glocke x 1600–1668, y 178–244.
- Copy-Button 36×36, Radius 10, Raised #262626. Beleg: `2096175237109092642-video-1.md` frame-07.jpg Icon x 380–408, y 610–640.
- Quadrat 54 px, Radius 12, #141414 mit Border #222; Avatar gleiche Geometrie. Beleg: `2096499167225078020.md` HRhCVJqbYAAMXxo.jpg x 485–690, y 220–275.
- Kreis-Icon-Buttons in vier Grössen 26/34/42/50. Beleg: `2096832279775486079.md` image-1.jpg Projekt-Pfeile x 511/765/1019, y 950; Hero-Pfeile x 990/1030, y 467.
- Kreis 32 px, Raised #1C1C1F, 1 px Border weiss 12 %; Touch auf 44 px. Beleg: `neuform-1.md` 02-detail-desktop.png Toolbar x 520–570.
- Close ohne Kreisfläche: 12 px X, 42 px Inset, Weiss 85 %. Beleg: `2096674796704813174.md` image-1.jpg X x 1840–1877, y 673–710.
- Anti-Beispiel: Icon-Kreise #2a2a2a auf #1f1f1f, Kontrast < 1.3:1. Beleg: `2095783930775433616.md` Zeile 81.

### R9 Split-Buttons und Segmented Controls
- Split: Hauptsegment + 34 px Dropdown-Segment, Trennlinie 1 px weiss 40 %. Beleg: `designmd-me-1.md` stripe-desktop.png Copy Prompt x 827–999, y 224–261, Trennung x 965–968.
- Split `New | ▾` schwarz 34 px, Radius 8, Trennlinie rgba(255,255,255,.25). Beleg: `2096944343487852961.md` HRnXnnKbQAAUnen.jpg x≈1438–1512.
- Segmented: Track #f4f4f4 Radius 10, Padding 3, aktives Segment weiss Radius 8 mit 0 1px 2px Schatten. Beleg: `2096618423983964587.md` image-1.jpg `Month | Year` x 0–218, y 800–860.
- Segmented als Pille 32 px, 3 px Innenpadding, aktiv dunkle Pille #1c2128. Beleg: `2096929195381457078.md` image-1.jpg x 836–976, y 172–204.
- Segmented dunkel: Padding 5, Border #28292E, aktiv Blau #4E81EE. Beleg: `designmd-me-1.md` Zeile 108.

### R10 Pills, Chips, Badges, Tags
- Eyebrow-Chip: weisse Pill 30 px, 12 px Text, Doppel-Schatten; einziges Element mit Schatten. Beleg: `2095874058697293985.md` media-0.jpg `Know about our team` y≈240–285.
- Section-Badge ~80×28, #F6F3EE, 6 px Orange-Punkt + 12 px Text in Orange. Beleg: `2095797753305612601.md` media-0.jpg y≈1050.
- Hero-Badge: Pill mit 10 px Punkt und Caps-Text 11 px, Tracking .06em, #2a2a2a mit Border #353535. Beleg: `2096175237109092642-video-1.md` frame-01.jpg y 15–40.
- Tag-Pill: Mono 10 px, Padding 4/8, #2a2a2a. Beleg: `2096175237109092642-video-1.md` frame-03.jpg y 161.
- Tabellen-Badges: Höhe 1.4f, Radius 0.25f (Rechteck, keine Pille), getönte Fläche, 1 px Border in dunklerer Tönung, Weight 400. Beleg: `2096660897628668066.md` HRjV7XdaEAAuM1B.jpg x 270–430.
- Delta-Pill: 2/8 px Padding, 11 px, #10241a mit #5fd38d. Beleg: `gap-marcelkargul.md` Zeile 89.
- Aktiver Filter-Chip nur als transluzente Pille (Weiss 20 %), inaktive Chips nur Text. Beleg: `twentyfirst.md` Messung 280–406/428–456 ≈#435278.
- Selected-Chip: weiss gefüllte Pille auf Page, unselected nackter Text. Beleg: `2096192737867350330.md` Zeile 90 und 113.
- Filter-Chips: Höhe 1.75f, Border 1 px #E1E1E1, Radius 0.35f, Icon→Text 0.6f, alle Controls gleiche Höhe. Beleg: `2096660897628668066.md` Zeile 105.
- Action-Pills über Karten 22 px mit Icon + 11 px Label müssen mobil wrappen. Beleg: `neuform-1.md` 04-detail-mobile.png y 52–72 (Überlappung Save Skill/Copy).
- Dropdown-Chip 36 px, Border #d2d2d4, Radius 6, Chevron 12 px, 8 px Abstand. Beleg: `2095383602431459523.md` media-0.jpg x 922–1035, y 471–507.

### R11 Label und Kontext
- Label einzeilig, max 3 Wörter, ein Label pro Intent; kein `Get Started`/`Book a Demo`-Reflex. Beleg: `prior_corpus.md` taste-SKILL.md:226-227, unslop-react-design.md:57.
- Mobile-Label darf das Verb nicht verlieren (`Consultation ›` statt `Schedule Consultation`). Beleg: `2096149200178418026.md` media-3.jpg.
- Primär-Breite wechselt mit Label und schiebt `Back` (x 562→576); min-width auf breitestes Label. Beleg: `2096192737867350330-video-2.md` second-18→19.jpg.
- Nav-CTA und Hero-CTA sind eine Komponente, zweimal instanziert. Beleg: `2096855995909869867.md` image-1.jpg y 225 und y 720; `2096944343487852961.md` x≈1403–1578.
- Navigation nie als Base-Button mit `render={<a/>}`; echtes `<a>` mit Button-Klassen. Beleg: `shadcn.md` button.md Zeile 436.
- CTA-Farbe folgt dem Untergrund: Violett auf Weiss, Cyan mit Navy-Text auf Navy; Form bleibt gleich. Beleg: `refero-2.md` 716fcc41 x 145–243 (#6863fe) und x 593–705 (#16d1fe).

## Bauanleitungen

Eigene Umsetzung. Werte aus den Belegen; Startwerte markiert.

### B1 Basis-Button (Vertrag für alle Varianten)
Border immer gesetzt (transparent beim Primär), damit Outline und Fill gleich hoch sind (`shadcn.md`).

```html
<div class="actions">
  <button class="btn btn--primary">Angebot sichern</button>
  <button class="btn btn--ghost">Beispiele ansehen</button>
</div>
```

```css
:root{--h-btn:44px;--r-btn:999px;--action:#111;--on-action:#fff;--ring:#111}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:var(--h-btn);padding:0 20px;border:1px solid transparent;border-radius:var(--r-btn);
  background-clip:padding-box;font:500 15px/1 inherit;white-space:nowrap;cursor:pointer;
  transition:background-color .15s,transform .1s}
.btn--primary{background:var(--action);color:var(--on-action)}
.btn--ghost{background:transparent;border-color:#d4d4d4;color:#1f1f1f}
.btn--text{background:none;border:0;padding:0;font-weight:600;color:#1f1f1f}
.btn:hover.btn--primary{background:#4d4d4d}            /* second-14.jpg */
.btn:hover.btn--ghost{background:#f2f2f2}
.btn:focus-visible{outline:0;border-color:var(--ring);box-shadow:0 0 0 3px color-mix(in srgb,var(--ring) 50%,transparent)}
.btn:active:not([aria-haspopup]){transform:translateY(1px)}
.btn:disabled{background:#9b9b9b;color:#f2f2f2;border-color:transparent;cursor:not-allowed}  /* nie opacity */
.btn[aria-busy=true]{color:transparent;position:relative}
.btn[aria-busy=true]::after{content:"";position:absolute;width:16px;height:16px;border:2px solid currentColor;border-color:#fff #fff transparent;border-radius:50%;animation:spin .7s linear infinite;color:#fff}
@keyframes spin{to{rotate:1turn}}
.actions{display:flex;align-items:center;gap:16px}     /* 14–24 px im Corpus */
.actions>.btn--text{margin-right:16px}                 /* Back 32 px vor Continue */
```

### B2 Section-invertierte Primär-Pill

Die Section setzt den Farbvertrag. Die Button-Variante benennt den Hintergrund, auf dem sie tatsächlich liegt. Nutze `.on-dark` nur innerhalb einer dunklen Section und `.on-light` nur innerhalb einer hellen Section.

```html
<section class="section--dark">
  <a class="btn btn--primary on-dark" href="#demo">Demo buchen</a>
</section>
```

```css
.section--dark{--action:#fff;--on-action:#111}
.section--light{--action:#111;--on-action:#fff}
.btn--primary{background:var(--action);color:var(--on-action)}
.btn--primary.on-dark{box-shadow:0 0 24px rgba(255,255,255,.18)}   /* HRhCVJqbYAAMXxo.jpg */
.btn--primary.on-light{box-shadow:0 8px 24px rgba(0,0,0,.18)}      /* open_design home-desktop.png */
```

### B3 Verlaufs-Primär mit Highlight-Kante (Blau- oder Orange-System)
```css
.btn--gradient{height:54px;padding:0 22px;border-radius:14px;color:#fff;
  background:linear-gradient(#4F86F5,#2F6BE8);border:1px solid #2559c9;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 8px 20px rgba(47,107,232,.35)}  /* HRml921acAEzvBx.jpg */
.btn--gradient.warm{border-radius:999px;background:linear-gradient(#fe6d2c,#fb6727);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -1px 0 rgba(0,0,0,.25)}   /* HRmtg4lbwAEwCZ5.jpg, kein Outer-Glow */
.btn--gradient+.btn--secondary{background:linear-gradient(#F5F7FA,#E6EAEF);color:#1A1A1A;box-shadow:0 6px 16px rgba(0,0,0,.10)}
```
Nur auf hellem oder neutralem Grund. Blau auf Blau ist ein Anti-Beispiel (`2095488681796854015.md` B, `2096175830624055596.md` HRccl6xawAAtmvV.jpg).

### B4 CTA mit Icon-Tile oder Orb rechts innen
```html
<a class="btn btn--tile" href="#demo"><span>Demo buchen</span><i class="tile" aria-hidden="true">→</i></a>
```
```css
.btn--tile{height:45px;padding:6px 6px 6px 16px;border-radius:10px;gap:14px;
  background:linear-gradient(180deg,#3a3a3a,#1c1c1c);color:#fff}             /* image-1.jpg 2096855995909869867 */
.btn--tile .tile{width:32px;height:32px;border-radius:6px;background:#fff;color:#111;display:grid;place-items:center}
.btn--orb{height:44px;padding:0 6px 0 20px;border-radius:999px;background:#17171a;color:#f5f4f7;
  border:1px solid rgba(255,255,255,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}  /* layers 02-home-desktop.png */
.btn--orb .tile{width:26px;height:26px;border-radius:50%;background:#f2f2f4;color:#111}
```

### B5 Ghost-Varianten

Der Gradient-Wrapper braucht genau ein Kind-`span`; der Link bleibt das einzige interaktive Element.

```html
<a class="btn btn--gradient-border" href="#demo"><span>Demo buchen</span></a>
```

```css
.btn--ghost-dark{background:rgba(255,255,255,.22);color:#fff;border:0}                 /* media-1.jpg 2095928637346472339 */
.btn--ghost-line{background:transparent;border:1px solid #3d3d3d;color:#fff}          /* HRmtg4lbwAEwCZ5.jpg */
.btn--ghost-glass{background:rgba(255,255,255,.55);color:#111;backdrop-filter:blur(8px)} /* HRmaNBSbUAE_QzN.jpg */
.btn--ghost-orange{background:#242424;border:1px solid rgba(255,120,40,.55);color:#fff}
.btn--ghost-orange:hover{border-color:#fd7830;box-shadow:0 0 0 3px rgba(253,120,48,.15)} /* image-1.jpg 2095783930775433616 */
.btn--gradient-border{padding:1px;border-radius:0;background:linear-gradient(135deg,rgba(244,241,233,.3),rgba(244,241,233,.05),transparent)}
.btn--gradient-border>span{display:block;background:#0E1418;color:#F4F1E9;padding:13px 27px}  /* neuform 01-home-desktop.png */
```

### B6 Icon-Button und Split-Button
```html
<button class="icon-btn" aria-label="Code kopieren"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"/></svg></button>
<div class="split"><button>Neu</button><button aria-label="Weitere Optionen" aria-haspopup="menu">▾</button></div>
```
```css
.icon-btn{width:36px;height:36px;padding:0;border-radius:10px;background:#262626;color:#bdbdbd;display:grid;place-items:center;border:0}
.icon-btn.round{border-radius:50%;width:40px;height:40px;background:#f4f4f4;color:#111}   /* image-1.jpg 2096618423983964587 */
.icon-btn:disabled{background:transparent;color:#c9c4c0}
.icon-btn svg{width:16px;height:16px;flex-shrink:0;pointer-events:none}
@media(pointer:coarse){.icon-btn{min-width:44px;min-height:44px}}
.split{display:inline-flex;height:34px;border-radius:8px;overflow:hidden;background:#1b1b1b;color:#fff}
.split>button{background:none;border:0;color:inherit;padding:0 12px;font:500 14px/1 inherit}
.split>button+button{width:34px;padding:0;border-left:1px solid rgba(255,255,255,.4)}       /* stripe-desktop.png */
```

### B7 Segmented Control
```html
<div class="seg" role="tablist"><button role="tab" aria-selected="true">Monat</button><button role="tab">Jahr</button></div>
```
```css
.seg{display:inline-flex;padding:3px;border-radius:10px;background:#f4f4f4}
.seg button{padding:0 14px;height:26px;border:0;border-radius:8px;background:none;color:#6d6e73;font:500 13px/1 inherit}
.seg [aria-selected=true]{background:#fff;color:#111;box-shadow:0 1px 2px rgba(0,0,0,.08)}   /* image-1.jpg 2096618423983964587 */
.seg.pill,.seg.pill button{border-radius:999px}
.seg.pill [aria-selected=true]{background:#1c2128;color:#fff;box-shadow:none}               /* image-1.jpg 2096929195381457078 */
```

### B8 Pills, Badges, Tags
```html
<p class="badge"><i class="dot" aria-hidden="true"></i>Neu: 30 Vorlagen</p>
<span class="tag">Pill + Line</span>
<span class="status status--ok">Aktiv</span>
<span class="delta delta--up">+10 %</span>
```
```css
.badge{display:inline-flex;gap:8px;align-items:center;padding:6px 14px;border-radius:999px;background:#2a2a2a;border:1px solid #353535;font:600 11px/1 inherit;letter-spacing:.06em;text-transform:uppercase}
.badge .dot{width:10px;height:10px;border-radius:50%;background:#d8d8d8}
.badge.light{background:#fff;color:#262626;border:0;text-transform:none;font:500 12px/1 inherit;box-shadow:0 1px 3px rgba(0,0,0,.08),0 4px 12px rgba(0,0,0,.04)}
.tag{font:500 10px/1 ui-monospace,monospace;padding:4px 8px;border-radius:999px;background:#2a2a2a;color:#d0d0d0}
.status{display:inline-block;height:1.4em;line-height:1.4em;padding:0 .4em;border-radius:.25em;border:1px solid;font-size:.95em;font-weight:400}
.status--ok{color:#2f9c52;background:#e9f8ee;border-color:#cdeed8}
.delta{padding:2px 8px;border-radius:999px;font-size:11px}
.delta--up{background:#10241a;color:#5fd38d}.delta--down{background:#2b1010;color:#f26d6d}
```

### B9 Signatur-Formen (Chamfer, Corner Brackets, Radius 0)
```css
.btn--chamfer{border-radius:0;padding:10px 40px;font:500 13px/1 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.05em;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%)}          /* HRSr1m5bUAAuYh-.jpg */
.btn--brackets{position:relative;border-radius:0;height:52px;min-width:300px;--c:#f45f1e}
.btn--brackets::before{content:"";position:absolute;inset:-1px;pointer-events:none;
  background:
   linear-gradient(var(--c),var(--c)) 0 0/10px 2px no-repeat,linear-gradient(var(--c),var(--c)) 0 0/2px 10px no-repeat,
   linear-gradient(var(--c),var(--c)) 100% 0/10px 2px no-repeat,linear-gradient(var(--c),var(--c)) 100% 0/2px 10px no-repeat,
   linear-gradient(var(--c),var(--c)) 0 100%/10px 2px no-repeat,linear-gradient(var(--c),var(--c)) 0 100%/2px 10px no-repeat,
   linear-gradient(var(--c),var(--c)) 100% 100%/10px 2px no-repeat,linear-gradient(var(--c),var(--c)) 100% 100%/2px 10px no-repeat}
.btn--block{border-radius:0;height:90px;padding:0 36px;gap:24px;background:#14110a;color:#fff}   /* HRTx4-EacAA8TEU.jpg */
```

## Varianten je Stilfamilie

| Stilfamilie | Primär | Sekundär | Höhe | Radius | Beleg |
|---|---|---|---|---|---|
| Monochrom-Dunkel (Dev-Tools, Portfolio) | Weisse Pill/Fläche, schwarzer Text, optional weisser Glow | Raised-Grau #262626 oder Ghost-Border | 36–54 | 999 oder 10–12 | `2096175237109092642-video-1.md`, `2096499167225078020.md` |
| Monochrom-Hell (Onboarding, Agentur) | Ink-Pill #1F1F1F–#252525 | Textbutton `Back` | 52–56 | 999 | `2096192737867350330*.md` |
| Warm-Editorial (Creme, Foto) | Weisse Pill auf Foto, Schwarz auf Creme | Pill 1–2 % heller ist zu schwach, Outline nehmen | 44–62 | 999 | `2095797753305612601.md`, `2095807169346334900.md` |
| Farb-Verlauf-SaaS (Blau/Orange/Violett) | Vertikaler Verlauf + Inset-Highlight + farbiger Glow | Hellgrau flach oder Ghost-Line | 40–72 | 7–14 oder 999 | `2096292759489609818.md`, `2096889729337921598.md`, `2096931638118871502.md` |
| Akzent-Flat (Orange/Lime/Blau ohne Verlauf) | Vollfläche Akzent, weisser oder schwarzer Text | #EDEDED-Fläche oder Outline in Akzent | 34–48 | 4–12 | `2095874058697293985.md`, `2096891182701793331.md`, `mobbin-2.md` |
| Kantig-Technisch (Chamfer, Brackets, Radius 0) | Orange oder Schwarz, Mono-Versalien | Schwarz oder Ghost mit Orange-Border 55 % | 34–90 | 0 | `2095488681796854015.md`, `2096953356086313312.md`, `2095565814405742911.md` |
| Signatur-Tile/Orb | Dunkler Körper + weisses Icon-Tile/Orb rechts | Kein Sekundär im Hero, Textlink ergänzen | 39–54 | 10 oder 999 | `2096855995909869867.md`, `layers.md`, `2095928637346472339.md` |
| Produkt-UI / Dashboard | Ink oder Indigo 26–40 px, Icon links | Outline 1 px, Icon-Buttons quadratisch | 26–40 | 3–8 | `shadcn.md`, `refero-2.md`, `2096215770783199316.md` |

## Dos

- Setze pro Screen eine einzige Vollfläche als Primär; alle Nebenaktionen als Ghost, Text oder Grau (`2096175237109092642-video-1.md`, `refero-2.md`).
- Invertiere den Primär zur Section-Fläche statt eine Akzentfarbe einzuführen (`2096149200178418026.md`, `2095863741250474026.md`).
- Halte Primär und Sekundär gleich hoch; unterscheide nur durch Fill (`refero-2.md` 9f0c028b, `2095565814405742911.md`).
- Gib Disabled einen eigenen Grauwert und behalte lesbaren Text (`2096192737867350330.md`).
- Lege Radius-Familien schriftlich fest: Controls, Karten, Pills (`refero-2.md` ac783c6e, `prior_corpus.md` taste-SKILL.md:217).
- Nutze Inset-Highlight oben statt Outer-Glow, wenn die Fläche schon gesättigt ist (`2096931638118871502.md`).
- Setze Icon-Buttons exakt quadratisch zur Buttonhöhe und vergrössere die Hit-Area auf 44 px bei Touch (`shadcn.md`, `neuform-1.md`).
- Wiederhole den Hero-CTA in der Nav als dieselbe Komponente, aber kleiner (`open_design.md`, `2096855995909869867.md`).
- Halte den Pending-Zustand in gleicher Breite (`prior_corpus.md`).
- Lass Destruktives als roten Text links vom Primär stehen (`2096891182701793331.md`).

## Don'ts mit Gegenbeispiel

- Zwei gleich grosse CTAs, Hierarchie nur über Farbe (`JOIN US` Orange/Schwarz, je 194×34). Gegenbeispiel: `2095488681796854015.md` HRSr1m5bUAAuYh-.jpg y 405–438.
- Nav-CTA fast so schwer wie Hero-CTA (60 px vs 72 px). Gegenbeispiel: `2096931638118871502.md` HRmtg4lbwAEwCZ5.jpg rechts oben.
- Sekundär-Pill nur 1–2 % heller als die Fläche (#f4efec auf #f1ece8, Kontrast 1.02:1). Gegenbeispiel: `2095807169346334900.md` image-3.jpg x 513–683, y 258–320.
- Blauer Verlaufsbutton auf blauem Grund, nur durch Halo gerettet. Gegenbeispiel: `2095488681796854015.md` HRSr1nFaYAAjoag.jpg x 497–704, y 380–415; `2096175830624055596.md` HRccl6xawAAtmvV.jpg.
- Disabled per Opacity über dem ganzen Button. Gegenbeispiel-Korrektur: `2096192737867350330-video-1.md` second-02.jpg zeigt den richtigen Weg (#9E9E9E); `shadcn.md` `disabled:opacity-50` ist der Default, den der Corpus überstimmt.
- Hover und Selected identisch (#f2f2f2 auf beiden). Gegenbeispiel: `2096192737867350330.md` second-14.jpg.
- Hover-Cursor ohne sichtbares Feedback auf Chips. Gegenbeispiel: `2096192737867350330-video-2.md` second-20/27.jpg.
- Icon-Buttons unter 3:1 Kontrast (Icon #2a2a2a auf #1f1f1f). Gegenbeispiel: `2095783930775433616.md` Zeile 81.
- CTA über Köpfe im Hero-Foto legen. Gegenbeispiel: `2095797753305612601.md` media-0.jpg x≈645–835, y≈550–590.
- Mobile-Label ohne Verb (`Consultation ›`). Gegenbeispiel: `2096149200178418026.md` media-3.jpg.
- Einziger bunter Button sitzt im Nebenelement statt am Haupt-CTA (Peach `Read the docs` im Tutorial-Overlay). Gegenbeispiel: `layers.md` 02-home-desktop.png x 962–1236, y 730–766.
- Zwei Sekundär-Varianten für dieselbe Rolle (Hero hellgrau, CTA-Section dunkelgrau). Gegenbeispiel: `2096292759489609818.md` HReHDCKbgAENsSQ.jpg `Book a Demo` zweimal.
- Eyebrow-Pill mit Punkt als Deko-Reflex, Versionslabel und `Most Popular`-Badge. Gegenbeispiel: `prior_corpus.md` taste-SKILL.md:632-672, unslop-react-design.md:41.
- Action-Pills über Karten ohne `flex-wrap` auf Mobile (Überlappung Save Skill/Copy). Gegenbeispiel: `neuform-1.md` 04-detail-mobile.png y 52–72.
- Ghost-Border 1 px auf Retina bei 1× fast unsichtbar (#3d3d3d auf #0b0b0b). Gegenbeispiel: `2096931638118871502.md` Zeile 165.
- Chips 36 px als Touch-Ziel. Gegenbeispiel: `2095383602431459523.md` Zeile 246 (Dropdown-Chip 36 px unter 44).

## Gilt nicht wenn

- Kantige Marken-Signatur (Chamfer, Brackets, Radius 0) ist gesetzt: dann gilt Radius 0 überall im Marketing, nicht die Pill-Regel (`2095565814405742911.md`, `2096953356086313312.md`).
- Zwei echte gleichrangige Wege existieren (Sales vs Self-Service in der Nav): dann Outline-Pill + Fill-Pill gleicher Masse (`mobbin-3.md` faecc3dd Nav rechts).
- Produkt-UI mit vielen Controls: dort tragen 26–34 px Höhe und Radius 3–8 die Dichte; Marketing-Höhen 44+ wären falsch (`shadcn.md`, `refero-2.md` 6842d157).
- Foto-Hero mit heller Himmelszone: weisse Pill ohne Scrim funktioniert, auf dunklem oder unruhigem Motiv braucht Ghost Scrim oder Stroke (`2095797753305612601.md`, `prior_corpus.md` taste-SKILL.md:225).
- Optionale Felder: statt Disabled ein Label-Wechsel `Skip for now` auf demselben Button (`2096192737867350330.md` Zeile 82).
- Guide widerspricht Aufnahme (Linear Pill vs 72×32 Radius 8): Komponenten pro Kontext (Nav vs Hero) getrennt definieren, nicht global (`designmd_supply.md`).

## Quellen

- `../studies/design-depth/deep/2095383602431459523.md` (Dropdown-Chip, Touch-Ziel)
- `../studies/design-depth/deep/2095488681796854015.md` (Chamfer, gleich grosse CTAs, Blau auf Blau)
- `../studies/design-depth/deep/2095565814405742911.md` (Radius 0, 90 px Block, Ghost #c3beb8)
- `../studies/design-depth/deep/2095783930775433616.md` (Orange-Outline-Pill, unsichtbare Icon-Kreise)
- `../studies/design-depth/deep/2095784926717300835.md` (Violett-Verlauf mit Glow)
- `../studies/design-depth/deep/2095797753305612601.md` (Orange/Weiss-Pills, Section-Badge, CTA über Köpfen)
- `../studies/design-depth/deep/2095807169346334900.md` (Sekundär ohne Kontrast, weisse Pill auf Foto)
- `../studies/design-depth/deep/2095863741250474026.md` (Radius-Familie, weisse Nav-Pill)
- `../studies/design-depth/deep/2095874058697293985.md` (Eyebrow-Chip, CTA-Paar, Ghost auf Akzent)
- `../studies/design-depth/deep/2095928637346472339.md` (Icon-Kästchen, 22 %-Ghost)
- `../studies/design-depth/deep/2096149200178418026.md` (Section-invertierte Pill, Mobile-Label)
- `../studies/design-depth/deep/2096165490498695410.md` (28-px-Controls)
- `../studies/design-depth/deep/2096175237109092642*.md` (ein weisser Primär, Badge, Tag, Copy-Button)
- `../studies/design-depth/deep/2096175830624055596.md` (Chamfer, Blau-Pille Anti, Outline-Offset)
- `../studies/design-depth/deep/2096192737867350330*.md` (Disabled/Hover-Werte, Back-Textbutton, min-width)
- `../studies/design-depth/deep/2096215770783199316.md` (ein dunkler Primär 40/8)
- `../studies/design-depth/deep/2096292759489609818.md` (Blau-Verlauf, Chevron, inkonsistenter Sekundär)
- `../studies/design-depth/deep/2096499167225078020.md` (weisser Glow, 54-px-Icon-Buttons)
- `../studies/design-depth/deep/2096618423983964587.md` (Ghost 10 px, Kreis-Icons, Segmented)
- `../studies/design-depth/deep/2096634909263646898.md` (Play-Pill 32 px)
- `../studies/design-depth/deep/2096660897628668066.md` (Filter-Chips, Tabellen-Badges)
- `../studies/design-depth/deep/2096674796704813174.md` (28 %-Ghost, Close ohne Kreis)
- `../studies/design-depth/deep/2096832279775486079.md` (Icon-Grössen 26/34/42/50, Disabled-Pfeil)
- `../studies/design-depth/deep/2096833304351961505.md` (tonale Fläche 44/10)
- `../studies/design-depth/deep/2096855995909869867.md` (Arrow-Tile)
- `../studies/design-depth/deep/2096876701775261945.md` (44/36, Glas-Ghost)
- `../studies/design-depth/deep/2096889729337921598.md` (Blau-Verlauf Radius 14, Split)
- `../studies/design-depth/deep/2096891182701793331.md` (vier Aktionsgewichte, Lime-Ring, Text-Danger)
- `../studies/design-depth/deep/2096929195381457078.md` (Segment-Pille, Navy-CTA)
- `../studies/design-depth/deep/2096931638118871502.md` (Orange-Verlauf, Ghost-Play, Nav zu schwer)
- `../studies/design-depth/deep/2096944343487852961.md` (62-px-Pill, Split `New | ▾`)
- `../studies/design-depth/deep/2096953356086313312.md` (Corner Brackets)
- `../studies/design-depth/deep/aakib-tiles.md` (Crop-Marks, gepresster Look)
- `../studies/design-depth/deep/mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md` (Produkt-Radius 3–4, Outline-Paare)
- `../studies/design-depth/deep/refero-1.md`, `refero-2.md` (Fill→Outline, ein heller CTA, Radius pro Rolle)
- `../studies/design-depth/deep/designmd-me-1.md`, `designmd_supply.md` (Split, Höhen-Skala, Guide-Widerspruch)
- `../studies/design-depth/deep/neuform-1.md` (Drei-Zonen-CTA, Pill-Wrap)
- `../studies/design-depth/deep/layers.md` (Orb, Disabled-Outline, Peach-Glow)
- `../studies/design-depth/deep/open_design.md` (Graphit-Pill, Icon-Kreis links, 36/50/56)
- `../studies/design-depth/deep/twentyfirst.md` (kleine Pill-CTA, Hover-Button, transluzenter Chip)
- `../studies/design-depth/deep/shadcn.md` (Basis-Vertrag, Zustände, Icon-Button)
- `../studies/design-depth/deep/prior_corpus.md` (Label-Regeln, Pending, Slop-Liste)
- `../studies/design-depth/deep/gap-marcelkargul.md`, `gap-uiux_hamad.md` (Delta-Pill, 48/12 Grün-Buttons)
- Nicht belegt im Corpus: Hover-/Focus-Zustände der meisten Marketing-Screens (Stills). Werte in B1 für Focus/Active stammen aus `shadcn.md` und `prior_corpus.md`, Hover-Grau aus `2096192737867350330.md`.
