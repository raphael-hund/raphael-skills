# Effekte bauen Tiefe nur, wenn sie eine räumliche oder funktionale Rolle haben

## TLDR

Nutze Licht, Glas, Grain, Raster oder Schatten nur für eine belegbare Rolle; starte sonst mit Fläche, Hairline und Weißraum.

## Regeln

### Effekt vor Primitive klären

- Benenne zuerst den Job des Effekts: Ebene, Fokus, Material, Bewegung, Zustand oder Markenmotiv.
- Entferne einen Effekt, der nur leeren Raum kaschiert.
- Der Corpus zeigt viele starke Systeme ganz ohne Glow, Grain oder Blur.
- `2096175237109092642.md` baut Tiefe nur aus Page, Surface, Sunken und Raised.
- `2096192737867350330-video-2.md` trennt Weiß von Hellgrau ohne Border und Schatten.
- `2096891182701793331.md` nutzt nur einen flachen Canvas-Verlauf oben.
- `2096953356086313312.md` nutzt nur Raster, Farbquadrate und Opacity-Fade.
- `prior_corpus.md` wertet Glow-Blob, Noise und Dot-Grid als Slop, wenn kein räumlicher Zweck besteht.
- Wähle pro Section höchstens eine dominante Effektfamilie als eigener Startwert.
- Kombiniere nicht automatisch Glow, Glass, Grain, Gradient-Text und 3D.

### Ebenen vor Schatten bauen

- Beginne mit Page → Surface → Surface-2 → Raised.
- Nutze in Light UI Off-White-Stufen von etwa drei bis vier Prozent, wenn der Beleg dies trägt.
- `2095807169346334900.md` misst `#f1ece8` und `#e8e0dd` ohne Border oder Schatten.
- `2095784926717300835.md` zeigt `#F2F2F2 → #FAFAFA → #F5F5F5 → #FFF`.
- `2096660897628668066.md` zeigt `#ECECEC → #F7F7F7 → #FFFFFF` plus Hairline.
- Nutze in Dark UI Page → Surface → Sunken → Raised als Luminanzfolge.
- `2096175237109092642-video-2.md` misst `#0F0F0F → #161616 → #111111 → #232323`.
- `2096891182701793331.md` misst `#0A0C10 → #10141A → #171C23`.
- `shadcn.md` belegt `#0a0a0a → #171717 → #262626` mit 1-px-Ringen.
- Füge erst Schatten hinzu, wenn ein Element tatsächlich über seinem Grund schwebt.

### Glow als Lichtquelle behandeln

- Ein Glow braucht eine Quelle und einen Fall-off.
- Setze den hellsten Punkt an Kreuzung, Kante oder Objektkern.
- Halte die Textzone dunkler als die Lichtzone.
- `2096931638118871502.md` misst drei orange Lichtformen mit rund 150 px weicher Kante.
- Dort liegen die hellsten Punkte an den zwei Kreuzungen der Strahlen und des Bogens.
- Der Text bleibt oberhalb der Glow-Zone auf `#0b0b0b`.
- `twentyfirst.md` setzt einen radialen Blau-Glow rechts der linksbündigen Headline.
- `neuform-1.md` setzt den Halo hinter die Auth-Karte, nicht um jedes Element.
- `2095784926717300835.md` setzt den violetten Halo hinter eine 100-px-Icon-Kachel.
- Nutze keinen Outer-Glow an Text.
- `2096634909263646898.md` zeigt eine klare Foto-Headline ohne Text-Shadow oder Glow.
- Nutze keinen Glow zur Trennung eines CTA von fast gleicher Hintergrundfarbe.
- `2095488681796854015.md` zeigt den Fehler: Blau auf Blau braucht einen Halo und verliert gegen den hellen Sekundär-CTA.

### Lichtbogen und Strahlen in SVG bauen

- Nutze SVG-Pfade für gerichtete Bögen und Strahlen.
- Nutze `feGaussianBlur` nur auf der Lichtgruppe.
- Lege Inhalt als eigenes HTML-Layer darüber.
- `2096931638118871502.md` belegt einen flachen Cubic-Bezier-Bogen und zwei Diagonalstrahlen.
- Dort liegen Stroke-Breiten bei etwa 140–180 px im 2000×1250-ViewBox.
- Dort liegt `stdDeviation` bei etwa 50–55.
- Nutze `mix-blend-mode:screen` nur innerhalb des Effekt-Layers.
- Vermeide gekachelte Partikel.
- `2096931638118871502.md` belegt 25–30 unregelmäßig gesetzte Punkte mit 2–3 px.
- Setze dekorative SVGs auf `aria-hidden="true"`, `focusable="false"` und `pointer-events:none`.
- `2096953356086313312.md` fordert diese Trennung explizit.

### Grain als Material und Anti-Banding nutzen

- Grain gehört auf Verläufe, Fotos oder Materialflächen.
- Grain gehört nicht unter kleine Copy, Inputs oder Controls.
- `2095783930775433616.md` zeigt Grain nur in den Dunkelzonen der Orange-Bänder.
- `2096674796704813174.md` misst starkes farbiges Grain auf dem Modal, aber nicht auf Controls.
- `layers.md` zeigt Grain auf dunklen Lichtwolken gegen Banding.
- `2096855995909869867.md` zeigt Grain auf farbigen Kartenverläufen, nicht auf der Page.
- `2096499167225078020.md` warnt, das starke Mockup-Grain nie als App-Hintergrund zu übernehmen.
- Nutze ein separates Pseudo-Element.
- Setze `pointer-events:none`.
- Begrenze die Deckkraft.
- `2095783930775433616.md` nennt `.08` als gemessene Rekonstruktion.
- `layers.md` nennt `.18` als gemessene Rekonstruktion.
- `2096674796704813174.md` belegt `.55` nur für ein bewusst grobes Modal-Material.
- Behandle `.04` als eigenen Startwert für subtile Seitenkörnung.

### Glas nur vor sichtbarem Hintergrund einsetzen

- Glas braucht ein Motiv, das durchscheinen darf.
- `2095797753305612601.md` nutzt Glas-Karten nur auf Fotos, nie auf Flat-Flächen.
- `2096149200178418026.md` nutzt genau eine Glasfläche pro Screen: die Eyebrow-Pill.
- `2096634909263646898.md` nutzt Glas nur im Foto-Badge.
- `designmd-me-1.md` nutzt helles Glas nur für Overlay-Controls auf Screenshots.
- Lege Text und Daten auf deckende Innenflächen, wenn der Hintergrund unruhig ist.
- `2096833304351961505.md` belegt Milchglas als Hülle und deckendes Anthrazit für Datenkarten.
- Nutze einen opaken Fallback.
- `2096833304351961505.md` nennt `#2a2a2a` für fehlendes `backdrop-filter`.
- `prior_corpus.md` verlangt zusätzlich einen Reduced-Transparency-Fallback.
- Lasse leere Glasflächen weg.
- `2095784926717300835.md` zeigt eine große leere Glasfläche als Gegenbeispiel.
- Fülle Glas nicht mit Mikrocopy.
- `2095797753305612601.md` zeigt 10–11-px-Text in „Recent Activity“ als unlesbar.

### Gradient-Border als Lichtrichtung bauen

- Nutze einen Gradient-Border, wenn eine Kante Lichteinfall zeigen soll.
- Nutze keinen Regenbogenrand ohne Marken- oder Zustandslogik.
- `2096833304351961505.md` belegt einen hellen Stroke oben links und einen fast unsichtbaren Stroke unten rechts.
- `2095783930775433616.md` belegt Orange-Konturen, die oben hell und unten transparent werden.
- `refero-2.md` belegt einen 1-px-Blau-Highlight nur an der Oberkante eines Announcement-Badge.
- Setze die Innenfläche opak, damit der Gradient wirklich nur die Kante zeichnet.
- Nutze Mask-Composite für frei gerundete Rahmen.
- Nutze Inset-Highlight statt Border-Gradient, wenn nur die Oberkante Licht braucht.
- `2096855995909869867.md` zeigt einen 1,5-px-Lichtsaum plus weichen Schatten am dunklen CTA.
- `layers.md` zeigt denselben Top-Highlight-Ansatz am Primary-CTA.

### Schraffur als Rand- oder Materialrolle nutzen

- Halte Schraffur außerhalb der Content-Spalte.
- `2095488681796854015.md` misst 45°-Linien mit 14 px Abstand in den Seitenzonen.
- `2095565814405742911.md` misst 200-px-Streifen mit 60-px-Rapport.
- `2095863741250474026.md` und `2096292759489609818.md` nutzen Schraffur außerhalb des Containers.
- Nutze eine eigenständige Schraffurzeile nur als klaren Abschnittstrenner.
- `2096175830624055596.md` misst 64 px Höhe, 20 px Abstand und 1-px-Linien.
- Nutze Schraffur innerhalb einer Illustration nur als Material für Seitenflächen.
- `gap-marcelkargul.md` belegt 1-px-Linien mit 4 px Abstand in isometrischen Illustrationen.
- Vermeide Schraffur hinter Body-Copy.
- `neuform-1.md` zeigt eine extrem schwache 135°-Schraffur mit 1,5–3 Prozent Weiß als Material, nicht als Dekoband.
- Entferne Rand-Schraffur auf schmalen Viewports als eigener Startpunkt.

### Linienraster an echte Geometrie binden

- Ein Linienraster soll Spalten, Koordinaten oder eine technische Bühne erklären.
- `2096149200178418026.md` bindet 1-px-Linien an Bild- und Content-Kanten.
- `2096891319843164276.md` misst vertikale Linien alle etwa 90 px ohne horizontales Raster.
- `2096931638118871502.md` misst ein 96-px-Quadratraster über dem Glow.
- `2095784926717300835.md` misst ein 40-px-Raster mit radialem Fade im Integrationspanel.
- `aakib-tiles.md` und `2095863741250474026.md` messen 8–12-px-Raster auf Ultramarin-Stages.
- `mobbin-2.md` belegt ein seitenweites Spaltenraster mit Linien an Sektionsgrenzen.
- `2096953356086313312.md` belegt bewusst unregelmäßige Spuren statt gleichförmiger Tapete.
- Setze Farbquadrate nur auf Linien oder Kreuzungen.
- `2096953356086313312.md` misst 48-px- und 15-px-Quadrate auf Rasterpunkten.
- Spare die Textzone aus oder lege einen Scrim darunter.
- `2095874058697293985.md` spart die mittlere Hero-Zone im 95-px-Raster aus.
- `2095488681796854015.md` legt einen radialen Weiß-Scrim hinter Headline und Badge.
- Nutze kein Raster als generischen Füller.
- `prior_corpus.md` nennt Grid-Textur und Dot-Field ohne Zweck als Slop-Signatur.

### Punktraster bewusst begrenzen

- Nutze Punkte für Daten, technische Bühne oder Randtiefe.
- `2096499167225078020.md` nutzt ein maskiertes Punktraster als Chartfläche.
- `2095863741250474026.md` verankert einen Composer mit einem radial ausblendenden Orange-Punktraster.
- `refero-1.md` nutzt Punkte nur als schmalen Randstreifen mit Innenfade.
- `mobbin-1.md` nutzt ein 8-px-Punktraster als Whiteboard-Metapher hinter einem Formular.
- `2095783930775433616.md` nutzt ein Dot-Grid als Datenmodell für Community-Status.
- Wenn Punkte Daten tragen, gib Legende oder Textalternative.
- Status darf nicht nur über Farbton codiert sein.
- `2095783930775433616.md` zeigt Lachs und Lila ohne ausreichende zweite Codierung als Fehler.

### Schatten nach Höhe staffeln

- Schatten gehört an Raised-Flächen, Drag-Zustände, Tooltips, Dialoge und schwebende CTAs.
- `2096215770783199316.md` setzt Schatten nur auf Hover-Spalte und Tooltip.
- `2096618423983964587.md` setzt `0 1px 3px` nur unter Karten und `0 1px 2px` unter das aktive Segment.
- `2096889729337921598.md` setzt Schatten nur an Frame, Drag, Marketing-Button und Badge.
- `designmd_supply.md` nutzt negativen Spread für Codefenster und Hover-Karte.
- `2096944343487852961.md` staffelt Raised-UI, CTA und Produktkarte.
- `2096674796704813174.md` belegt einen bewusst breiten Modal-Schatten mit etwa 130 Design-px Reichweite.
- Töne helle Schatten in Richtung Page-Hue.
- `prior_corpus.md` fordert Schattenfarbe aus dem Grund statt starrem Schwarz.
- Nutze keinen Schatten auf jeder Karte.
- `shadcn.md`, `refero-2.md` und `2095383602431459523.md` zeigen Border- oder Flächenkontrast als Default.

### Reflexionen und Highlights lokal halten

- Nutze einen 1-px-Inset-Highlight für eine beleuchtete Oberkante.
- `2096292759489609818.md` zeigt diesen Reflex auf einem blauen Button.
- `2096931638118871502.md` zeigt Inset-Highlights auf Orange-Pills ohne Outer-Glow.
- `layers.md` zeigt eine helle CTA-Oberkante und dunklere Unterkante.
- Nutze radialen Kugelverlauf nur für runde Objekte.
- `2096855995909869867.md` belegt den Lichtpunkt oben links in Coin-Kreisen.
- Nutze Reflexion nicht als globalen Glasfilter.
- Die Grundfläche bleibt glatt; der Reflex sitzt an der Formkante.

### 3D und Isometrie aus Geometrie oder Asset wählen

- Nutze SVG für lineare Isometrie.
- `2095784926717300835.md` belegt `matrix(0.866,0.5,-0.866,0.5,0,0)` für isometrische Flächen.
- Nutze eine Raute als Bodenreferenz.
- Nutze 1,5-px-Strokes und eine Statusfarbe, wenn der Beleg dies trägt.
- Nutze gestaffelte Platten für Layer-Diagramme.
- `2095863741250474026.md` und `gap-marcelkargul.md` belegen 4–5 Ebenen mit versetzten Konturen.
- Nutze Rasterassets für komplexe, facettierte oder physisch beleuchtete 3D-Objekte.
- `twentyfirst.md` zeigt 3D-Freisteller als Rasterasset.
- `open_design.md` zeigt 3D-Stift, T und Zylinder als transparente Assets außerhalb der Textzone.
- Verzerre keine HTML-UI perspektivisch.
- `2095565814405742911.md` zeigt schräges Kerning und unlesbare Labels bei perspektivischer UI-Rotation.
- Halte eine Rotation bei Raster-Assets unter 1,5° als belegt empfohlene Obergrenze aus `2095565814405742911.md`.
- Entferne 3D, wenn das Objekt keinen Bezug zu Offer, Feature oder Proof hat.
- `twentyfirst.md` und `mobbin-1.md` nennen generische 3D-Clipart als Slop.

### Shader nur als begrenzte Bühne einsetzen

- Setze Canvas oder WebGL als `aria-hidden` Geschwister unter HTML.
- `layers.md` belegt ein Canvas mit 0,75-facher Renderauflösung relativ zur CSS-Fläche.
- Begrenze den Shader auf eine Section.
- `twentyfirst.md` warnt vor einem fixed Canvas mit negativem z-index über der ganzen Seite.
- Skaliere nach DPR, aber deckele die interne Auflösung als eigener Startwert.
- Pausiere mit `IntersectionObserver`, wenn die Section nicht sichtbar ist.
- Stoppe `requestAnimationFrame` beim Unmount.
- Rendere bei `prefers-reduced-motion:reduce` genau ein statisches Frame.
- Liefere ein statisches CSS/SVG-Fallback.
- `twentyfirst.md` belegt einen Indigo→Violett-Grund, 12–16 Wellenpfade und wenige Lichtpunkte als statische Alternative.
- Trenne Lichtgeometrie von Palette.
- `layers.md` zeigt identische Lichtbänder in Magenta und Mint bei getauschten Tokens.

### Fades als Abschluss statt Versteck nutzen

- Nutze Mask-Fades, wenn Inhalt bewusst weiterläuft oder eine Bühne weich endet.
- `2095784926717300835.md` blendet Text und Charts am Panelrand aus.
- `2096876701775261945.md` blendet die zweite Kanban-Reihe aus.
- `shadcn.md` misst einen 80-px-Fade über abgeschnittenem Code.
- `2096175830624055596.md` blendet Foto und Produktvorschau in Page-Weiß oder Page-Schwarz.
- Nutze einen Fade nicht, um schwachen Proof zu verstecken.
- `2096889729337921598.md` und `2096944343487852961.md` zeigen unlesbare Kanban-Inhalte unter dem Fade als Gegenbeispiel.
- Gib Scrollflächen einen Fade nur zusätzlich zu scrollbar oder klarer Interaktion.
- `2096165490498695410.md` zeigt abgeschnittenen Chat-Inhalt hinter dem Composer ohne Fade als sichtbaren Fehler.

## Bauanleitungen

### 1. Effekt-Layer als Basisprimitive

Alle Zahlen in diesem Block sind eigene Startwerte, sofern der Kommentar keine Beleg-Datei nennt.

```html
<section class="fx-stage">
  <div class="fx-stage__decor" aria-hidden="true"></div>
  <div class="fx-stage__content">
    <h2>Offer mit sichtbarem Proof</h2>
    <p>Die Copy bleibt in echtem HTML.</p>
    <a class="cta" href="#proof">Proof ansehen</a>
  </div>
</section>
```

```css
.fx-stage {
  position: relative;
  isolation: isolate;
  overflow: clip;
  background: var(--page);
}
.fx-stage__decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.fx-stage__content {
  position: relative;
  z-index: 1;
}
```

`z-index:0/1` sind hier eigene Startwerte für zwei lokale Layer.

### 2. Räumlicher Glow mit SVG-Lichtbogen

Die Geometrie folgt `2096931638118871502.md`; Pfade und Farben sind neu formuliert.

```html
<div class="beam-scene" aria-hidden="true">
  <svg viewBox="0 0 2000 1250" preserveAspectRatio="xMidYMax slice" focusable="false">
    <defs>
      <filter id="beam-blur">
        <feGaussianBlur stdDeviation="52" />
      </filter>
      <linearGradient id="beam-color" x1="0" x2="1">
        <stop offset="0" stop-color="#ff6a2a" stop-opacity="0" />
        <stop offset=".5" stop-color="#ffa646" />
        <stop offset="1" stop-color="#ff6a2a" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g filter="url(#beam-blur)" class="beam-scene__light">
      <path d="M-100 1030 C520 760 1280 650 2100 1250" stroke="url(#beam-color)" stroke-width="150" fill="none" />
      <path d="M-120 290 L720 980" stroke="#ff7a30" stroke-width="175" stroke-opacity=".52" />
      <path d="M2120 160 L1320 980" stroke="#ff7a30" stroke-width="175" stroke-opacity=".52" />
    </g>
  </svg>
</div>
```

`2000×1250`, `150–175` und `52` liegen im gemessenen Bereich aus `2096931638118871502.md`.

```css
.beam-scene {
  position: absolute;
  inset: 0;
  background: #0b0b0b; /* gemessen: 2096931638118871502.md */
  overflow: hidden;
}
.beam-scene svg {
  width: 100%;
  height: 100%;
}
.beam-scene__light {
  mix-blend-mode: screen;
}
```

Fallback ohne Filter:

```css
@media (prefers-reduced-motion: reduce) {
  .beam-scene__light { filter: none; opacity: .35; } /* eigener Startwert */
}
```

Ohne SVG-Filter bleibt der Verlauf sichtbar, aber nicht räumlich weich.

### 3. Ein Glow-Blob mit räumlichem Zweck

Der Startpunkt folgt `twentyfirst.md`; die Position bleibt an den freien Hero-Raum gebunden.

```css
.hero-light::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    60% 55% at 62% 58%,
    #2a4a94 0%,
    #1a2d5c 35%,
    rgb(9 9 11 / 0) 75%
  );
  pointer-events: none;
}
```

`60/55/62/58/35/75` sind eigene Startwerte nahe der Messung aus `twentyfirst.md`.

### 4. Grain ohne kopiertes Asset

`baseFrequency`, Deckkraft und Blend folgen den Band- und Modal-Belegen.

```css
.material {
  position: relative;
  isolation: isolate;
}
.material::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: .08;
}
.material > * {
  position: relative;
  z-index: 1;
}
```

`.08` folgt `2095783930775433616.md`; `.85`, `2`, `160` und `.8` sind eigene Startwerte.

Subtiler Seiten-Fallback:

```css
@media (max-width: 48rem), (prefers-reduced-motion: reduce) {
  .material::after { opacity: .04; } /* eigener Startwert */
}
```

### 5. Milchglas mit opakem Fallback

Die Hülle folgt `2096833304351961505.md`; die Datenfläche bleibt deckend.

```html
<section class="glass-shell">
  <header class="glass-shell__bar">Produktstatus</header>
  <div class="glass-shell__body">
    <article class="data-card">Echte Daten und Proof</article>
  </div>
</section>
```

```css
.glass-shell {
  overflow: hidden;
  border-radius: 14px; /* gemessener Bereich: 2096833304351961505.md */
  box-shadow: 0 30px 80px rgb(0 0 0 / .45); /* Beleg: 2096833304351961505.md */
}
.glass-shell__bar {
  min-height: 50px; /* gemessen: 2096833304351961505.md */
  background: #1b1b1b;
}
.glass-shell__body {
  padding: 36px; /* gemessen: 2096833304351961505.md */
  background: rgb(120 120 120 / .35);
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
}
.data-card {
  background: rgb(26 26 26 / .94); /* Startwert aus beobachteter Korrektur */
  color: #f5f5f5;
}
@supports not (backdrop-filter: blur(1px)) {
  .glass-shell__body { background: #2a2a2a; }
}
@media (prefers-reduced-transparency: reduce) {
  .glass-shell__body {
    background: #2a2a2a;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
```

### 6. Glass-Pill auf Foto

Die Werte sind in `2096149200178418026.md` gemessen.

```css
.photo-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid rgb(255 255 255 / .18);
  border-radius: 999px;
  background: rgb(255 255 255 / .12);
  color: rgb(255 255 255 / .9);
  backdrop-filter: blur(8px);
}
@supports not (backdrop-filter: blur(1px)) {
  .photo-badge { background: rgb(20 20 20 / .76); } /* eigener Startwert */
}
```

### 7. Gradient-Border ohne doppelten DOM-Rahmen

Die Lichtrichtung folgt `2096833304351961505.md`.

```css
.light-frame {
  position: relative;
  border-radius: 24px; /* gemessen: äußerer Bildrahmen */
}
.light-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(
    160deg,
    rgb(255 255 255 / .45),
    rgb(255 255 255 / .08)
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

`24`, `1`, `160`, `.45` und `.08` sind aus `2096833304351961505.md` abgeleitet oder gemessen.

Fallback:

```css
@supports not (mask-composite: exclude) {
  .light-frame { border: 1px solid rgb(255 255 255 / .22); } /* eigener Startwert */
  .light-frame::after { display: none; }
}
```

### 8. Schraffur-Rand

Die Maße folgen `2095488681796854015.md`.

```html
<div class="blueprint-frame">
  <main class="blueprint-frame__content">…</main>
</div>
```

```css
.blueprint-frame {
  --gutter: max(0px, calc((100vw - 72rem) / 2)); /* 72rem eigener Startwert */
  background:
    repeating-linear-gradient(
      45deg,
      #e8e8e8 0 1px,
      transparent 1px 14px
    );
}
.blueprint-frame__content {
  width: min(72rem, 100%); /* eigener Startwert */
  margin-inline: auto;
  background: #fff;
  border-inline: 1px solid #e5e5e5;
}
@media (max-width: 64rem) {
  .blueprint-frame { background: #fff; } /* Breakpoint eigener Startwert */
  .blueprint-frame__content { border-inline: 0; }
}
```

`45deg`, `1px`, `14px`, `#e8e8e8` und `#e5e5e5` sind aus `2095488681796854015.md`.

### 9. Radial ausblendendes Linienraster

Die 40-px-Zelle folgt `2095784926717300835.md`.

```css
.grid-field {
  background-image:
    linear-gradient(#ececec 1px, transparent 1px),
    linear-gradient(90deg, #ececec 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle, #000 40%, transparent 80%);
  mask-image: radial-gradient(circle, #000 40%, transparent 80%);
}
```

Fallback ohne Mask:

```css
@supports not (mask-image: radial-gradient(circle, #000, transparent)) {
  .grid-field {
    opacity: .35; /* eigener Startwert */
    clip-path: inset(8%); /* eigener Startwert */
  }
}
```

### 10. Vertikales Linienraster mit Fade

Die 90-px-Spur folgt `2096891319843164276.md`.

```css
.vertical-grid {
  background:
    linear-gradient(to bottom, rgb(247 247 247 / .6), transparent 30%, #f7f7f7 90%),
    repeating-linear-gradient(to right, rgb(255 255 255 / .32) 0 1px, transparent 1px 90px),
    linear-gradient(to right, #c1c7e7, #d8cbd0 50%, #f2d4b8);
}
```

Alle Zahlen und Farben stammen aus der rekonstruierten Variante in `2096891319843164276.md`.

### 11. Orange-Punktraster hinter einem Composer

Die Geometrie folgt `2095863741250474026.md` und `aakib-tiles.md`.

```css
.composer {
  position: relative;
  z-index: 0;
}
.composer::before {
  content: "";
  position: absolute;
  inset: -24px -24px -24px 40%;
  z-index: -1;
  background: radial-gradient(#f05a28 1px, transparent 1.5px) 0 0 / 7px 7px;
  -webkit-mask-image: radial-gradient(closest-side, #000, transparent);
  mask-image: radial-gradient(closest-side, #000, transparent);
  pointer-events: none;
}
```

`24`, `40%`, `1`, `1.5` und `7` folgen `2095863741250474026.md`.

### 12. Drei Schattenhöhen

Die Staffelung verbindet `2096618423983964587.md`, `2096944343487852961.md` und `designmd_supply.md`.

```css
:root {
  --shadow-raised: 0 1px 2px rgb(0 0 0 / .06); /* belegt */
  --shadow-float: 0 8px 20px rgb(0 0 0 / .18); /* belegt */
  --shadow-stage: 0 30px 80px rgb(0 0 0 / .18); /* belegt */
  --shadow-hover: 0 18px 40px -22px rgb(10 10 10 / .25); /* belegt */
}
.card { box-shadow: none; }
.card:hover { box-shadow: var(--shadow-hover); }
.tooltip { box-shadow: 0 4px 24px rgb(0 0 0 / .08); } /* 2096215770783199316.md */
.dragging { box-shadow: 0 14px 30px rgb(0 0 0 / .15); } /* 2096889729337921598.md */
```

### 13. Isometrische Line-Art ohne 3D-Engine

Die Matrix folgt `2095784926717300835.md`.

```html
<svg class="iso-flow" viewBox="0 0 420 260" role="img" aria-labelledby="iso-title iso-desc">
  <title id="iso-title">Automationsfluss</title>
  <desc id="iso-desc">Drei Schritte führen zu einem bestätigten Outcome.</desc>
  <g transform="translate(210 28) matrix(.866 .5 -.866 .5 0 0)">
    <rect x="-80" y="-40" width="160" height="80" fill="#f6f6f6" stroke="#d0d0d0" stroke-width="1.5" />
  </g>
  <path d="M90 150 H180" stroke="#444" stroke-width="1" stroke-dasharray="4 6" />
  <polygon points="200,126 232,142 200,158 168,142" fill="#111" />
  <circle cx="200" cy="142" r="11" fill="#fff" />
  <path d="m195 142 4 4 7-9" fill="none" stroke="#22c55e" stroke-width="2" />
</svg>
```

`.866/.5`, `1.5`, `1`, `4 6` und Grün folgen `2095784926717300835.md`; übrige Geometrie ist eigener Startwert.

### 14. Statischer Shader-Fallback als SVG

Die Wellenanzahl und Lichtpunkte folgen `twentyfirst.md`.

```html
<div class="shader-fallback" aria-hidden="true">
  <svg viewBox="0 0 1200 600" preserveAspectRatio="none" focusable="false">
    <defs>
      <filter id="wave-glow">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <g fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity=".7" filter="url(#wave-glow)">
      <path d="M0 320 C240 320 360 110 600 300 S960 320 1200 320" />
      <path d="M0 330 C240 330 360 130 600 310 S960 330 1200 330" />
      <path d="M0 340 C240 340 360 150 600 320 S960 340 1200 340" />
    </g>
    <circle cx="600" cy="300" r="2" fill="#fff" />
  </svg>
</div>
```

Drei sichtbare Pfade sind eigener Minimal-Fallback; die Quelle belegt 12–16 Pfade, `1.5`, `.7`, `4` und `r=2`.

```css
.shader-fallback {
  background: linear-gradient(90deg, #1a1a4d, #4d1a80);
  -webkit-mask-image: linear-gradient(transparent, #000 25%, #000 75%, transparent);
  mask-image: linear-gradient(transparent, #000 25%, #000 75%, transparent);
}
```

### 15. Canvas-Lifecycle für animierte Shader

Alle Zahlen in diesem Block sind eigene Startwerte, außer `0.75`, das `layers.md` belegt.

```js
const canvas = document.querySelector('[data-shader]');
const ctx = canvas.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf = 0;
let visible = true;

function resize() {
  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(devicePixelRatio, 2) * 0.75;
  canvas.width = Math.max(1, Math.round(rect.width * scale));
  canvas.height = Math.max(1, Math.round(rect.height * scale));
}

function render(time = 0) {
  drawShaderFallback(ctx, time);
  if (!reduce && visible) raf = requestAnimationFrame(render);
}

const observer = new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  cancelAnimationFrame(raf);
  if (visible && !reduce) raf = requestAnimationFrame(render);
});

resize();
observer.observe(canvas);
render();

function destroy() {
  observer.disconnect();
  cancelAnimationFrame(raf);
}
```

`2` ist eigener DPR-Cap; `0.75` folgt `layers.md`; `1` verhindert Null-Dimensionen.

### 16. Mask-Fade für Scroll- oder Proof-Rand

```css
.scroll-proof {
  overflow: auto;
  -webkit-mask-image: linear-gradient(#000 0, #000 calc(100% - 64px), transparent 100%);
  mask-image: linear-gradient(#000 0, #000 calc(100% - 64px), transparent 100%);
  scrollbar-width: thin;
}
```

`64px` folgt dem Reparaturvorschlag in `2096165490498695410.md`.

Fallback:

```css
@supports not (mask-image: linear-gradient(#000, transparent)) {
  .scroll-proof { position: relative; }
  .scroll-proof::after {
    content: "";
    position: sticky;
    display: block;
    bottom: 0;
    height: 64px;
    background: linear-gradient(transparent, var(--surface));
    pointer-events: none;
  }
}
```

### 17. Spotlight-Border mit Touch-Fallback

Der Radius von 160 px folgt dem Startrezept in `prior_corpus.md`.

```html
<article class="spot" style="--mx:50%;--my:50%">
  <div class="spot__inner">Proof-Inhalt</div>
</article>
```

```css
.spot {
  position: relative;
  isolation: isolate;
  border-radius: 16px; /* eigener Startwert */
  background: radial-gradient(160px circle at var(--mx) var(--my), var(--accent), transparent 70%);
  padding: 1px;
}
.spot__inner {
  height: 100%;
  border-radius: calc(16px - 1px); /* eigener Startwert */
  background: var(--surface);
}
.spot:focus-within {
  outline: 2px solid var(--focus); /* eigener Startwert */
  outline-offset: 2px; /* eigener Startwert */
}
@media (hover: none) {
  .spot { background: var(--border); }
}
```

```js
const spot = document.querySelector('.spot');
spot?.addEventListener('pointermove', (event) => {
  const r = spot.getBoundingClientRect();
  spot.style.setProperty('--mx', `${event.clientX - r.left}px`);
  spot.style.setProperty('--my', `${event.clientY - r.top}px`);
});
```

## Varianten je Stilfamilie

### Flaches Produkt-UI

- Nutze Page, Surface, Sunken und Raised.
- Nutze 1-px-Hairlines.
- Lasse Glow, Grain, Glass und Kartenschatten weg.
- `2096175237109092642.md`, `2096891182701793331.md`, `shadcn.md` und `2096660897628668066.md` belegen diese Familie.
- Nutze Schatten nur für Tooltip, Dialog, Drag oder aktive Hover-Ebene.
- CTA und Proof bleiben klarer als alle Effekte.

### Editorial auf Foto

- Nutze Focalpoint, lokalen Scrim und Section-Fade.
- Nutze höchstens eine Glass-Pill oder eine Glass-Karte.
- `2096149200178418026.md` zeigt eine Glass-Eyebrow über Architektur-Foto.
- `2095797753305612601.md` zeigt Glass-Overlays auf Menschen- und Produktfotos.
- `2096175830624055596.md` zeigt Foto→Schwarz- und Foto→Weiß-Fades.
- Setze Text nie auf die hellste Fotostelle.

### Blueprint und technische Bühne

- Nutze 1-px-Rahmen, Schraffur, Linienraster, Eckmarken und Quadratmarker.
- `2095488681796854015.md`, `2095863741250474026.md`, `2096292759489609818.md` und `aakib-tiles.md` belegen diese Familie.
- Setze Produktshots auf Vollton-Akzentfläche.
- Nutze das Raster als Koordinatensystem, nicht als Tapete.
- Halte CTA, Hook und Offer in einer ruhigen Textzone.

### Dark Cinematic

- Nutze einen Off-Black-Grund.
- Setze Glow an Ränder, Objektkern oder unteren Bildraum.
- Halte den Lesekorridor dunkel.
- `2096931638118871502.md`, `layers.md`, `twentyfirst.md` und `mobbin-1.md` belegen diese Familie.
- Nutze Grain nur gegen Banding.
- Nutze Partikel unregelmäßig und sparsam.
- Lass Chrome neutral; Farbe gehört ins Motiv.

### Glas und Premium-Consumer

- Nutze transparentes Glas nur über Foto oder bewegtem Motiv.
- Nutze Innenkante, gerichteten Border-Gradient und opaken Fallback.
- `2096833304351961505.md`, `2095797753305612601.md`, `layers.md` und `prior_corpus.md` belegen diese Familie.
- Lege kleine Datenkarten deckend auf das Glas.
- Nutze kein Glas als Standardpolitur für B2B-Dashboards.

### Monochromes Instrumenten-UI

- Nutze Weiß für Primärdaten, Grau für Vergleich, Farbe nur für Ziel oder Delta.
- `2096175237109092642-video-1.md` und `2096175237109092642-video-2.md` belegen vier Graustufen und runde Caps.
- Lasse Gridlines weg, wenn Werte an Punkten oder Bögen stehen.
- `2095383602431459523.md` zeigt denselben flachen Chart-Ansatz in Light UI.
- Nutze keine Glow-Chartlinie, wenn das Chart präzise statt atmosphärisch lesen soll.

### Expressives Daten- oder Trading-Motiv

- Nutze Gradient und Grain innerhalb der Datenobjekte.
- Nutze neutrale Page und neutrale CTA-Chrome.
- `2096855995909869867.md` belegt farbige Karten mit Grain und radialen Coin-Verläufen.
- `2096499167225078020.md` belegt eine leuchtende Chartlinie mit Punktrasterfläche.
- Verbinde Farbe mit Datenrolle.
- Vermeide Farbwechsel ohne Bedeutung.

### Swiss/Brutal und rasterbasiert

- Nutze harte Kanten, 1-px-Linien, unregelmäßige Rasterspuren und Akzentquadrate.
- `2096953356086313312.md` belegt 0 Radius, 0 Schatten und 0 Blur.
- `open_design.md` nutzt Auswahlrahmen und Griffe als Produktmetapher.
- `neuform-1.md` nutzt Eckmarken statt Vollrahmen.
- Halte jedes Ornament an einer Linie oder Ecke fest.

### Juicy Gamification

- Verläufe, Glanz, Konfetti und 3D sind erlaubt, wenn sie echten Erfolg oder Spielstatus markieren.
- `mobbin-2.md` zeigt Konfetti erst nach Booking-Erfolg.
- `2096192737867350330.md` zeigt monochromes Konfetti nach erfolgreicher Buchung.
- `gap-marcelkargul.md` zeigt 3D-Badges und Gradient-Header nur in einer gamifizierten App.
- Nutze `prefers-reduced-motion`.
- Zeige den Outcome zusätzlich als Text; der Effekt ist nie die einzige Bestätigung.

## Dos

- Definiere den Effektjob vor der CSS-Eigenschaft.
- Baue Tiefe zuerst mit Flächenstufen.
- Nutze Glow als Licht, nicht als Dekoration.
- Halte Glow aus Textkanten heraus.
- Nutze Grain gegen Banding oder als Material.
- Lege Grain nie über Controls.
- Nutze Glass nur vor einem sichtbaren Motiv.
- Liefere für Glass einen opaken Fallback.
- Nutze Gradient-Borders für gerichtetes Kantenlicht.
- Nutze Schraffur an Rändern oder in Illustrationsflächen.
- Binde Raster an Spalten, Koordinaten oder Produktmetapher.
- Spare die Textzone im Raster aus.
- Nutze Schatten nur für reale Elevation.
- Töne Schatten in Richtung des Page-Grunds.
- Baue lineare Isometrie als SVG.
- Liefere komplexes 3D als optimiertes Rasterasset.
- Lege Shader unter echtes HTML.
- Pausiere Canvas außerhalb des Viewports.
- Stoppe `requestAnimationFrame` beim Unmount.
- Rendere bei Reduced Motion ein statisches Frame.
- Mache Ornament-Layer `aria-hidden` und nicht interaktiv.
- Lass Hook, Offer, CTA und Proof kontrastreicher als die Effekte.

## Don'ts

- Baue keinen zentralen Glow-Blob hinter jede SaaS-H1.
- `prior_corpus.md` nennt genau diesen Reflex als wiederkehrende Slop-Signatur.
- Staple nicht automatisch drei Radial-Gradients, Grain, Grid und Gradient-Text.
- `2096674796704813174.md` funktioniert nur, weil der starke Verlauf auf ein einziges Modal begrenzt ist.
- Setze kein Glass auf eine Flat-Fläche.
- `2095784926717300835.md` zeigt eine leere violette Glasfläche ohne Proof.
- Fülle Glass nicht mit Mikrocopy.
- `2095797753305612601.md` zeigt die unlesbare „Recent Activity“-Karte als Gegenbeispiel.
- Nutze keinen blauen CTA auf blauem Grund und rette ihn mit Halo.
- `2095488681796854015.md` zeigt, dass der helle Sekundär-CTA dann stärker wirkt.
- Nutze kein Raster, das nur zufällig über dem Glow sichtbar wird.
- `2096931638118871502.md` wertet dies als Artefakt statt System.
- Lass Punkte nicht über Fotos laufen.
- `2095874058697293985.md` zeigt eine Punktreihe über dem vierten Foto als Render-Rest.
- Nutze kein starkes Grain im Produkt-Canvas.
- `2096499167225078020.md` begrenzt es auf den Mockup-Rahmen.
- Verzerre keine HTML-UI für Isometrie.
- `2095565814405742911.md` zeigt schiefes Kerning und unregelmäßige Labels.
- Nutze keine 3D-Clipart ohne Bezug zum Offer.
- `twentyfirst.md` zeigt Bowling, Schachdame und Spinne als generische Service-Deko.
- Lass keinen fixed Shader über die ganze Seite laufen.
- `twentyfirst.md` zeigt fehlendes Cleanup, Pause und Fallback als konkreten Defekt.
- Blende keinen Proof aus, bevor er lesbar ist.
- `2096889729337921598.md` blendet Kanban-Inhalte zu früh aus.
- Nutze keine Schatten-Stacks auf allen Karten.
- `2095383602431459523.md` zeigt, dass Weiß auf Hellgrau ohne Schatten reicht.
- Mische keine Chart-Glow-Sprache mit flachem Instrumenten-UI ohne Rollenwechsel.
- `2096499167225078020.md` nutzt Glow für ein expressives Chart; `2096175237109092642.md` nutzt bewusst keinen.
- Nutze keine Gradient-Border als alleinigen Focus-State.
- `prior_corpus.md` fordert einen unabhängigen Focus-Ring.
- Kachele Partikel nicht regelmäßig.
- `2096931638118871502.md` verlangt Handpositionen statt sichtbarer Wiederholung.

## Gilt nicht wenn

- Der Auftrag verlangt ein strikt flaches Verwaltungssystem.
- Dann gelten `2096175237109092642.md`, `2096891182701793331.md` oder `shadcn.md` als Leitfamilie.
- Der ICP arbeitet in High-Density-Dashboards.
- Dann haben Lesbarkeit, Vergleich und stabile Flächen Vorrang vor Glass, Grain und Glow.
- Der Effekt trägt keine Beziehung zu Hook, Offer, CTA, Proof oder Outcome.
- Dann entferne ihn.
- Der Hintergrund ist bereits ein starkes Foto.
- Dann nutze zuerst Focalpoint, Scrim und Fade statt zusätzlichem Glow.
- Das Gerät meldet Reduced Motion oder Reduced Transparency.
- Dann liefere statische oder opake Varianten.
- Das Ornament wäre die einzige Statuscodierung.
- Dann ergänze Text, Form, Icon oder Wert.
- Das 3D-Objekt enthält wichtige Text-UI.
- Dann rendere die UI gerade als HTML oder liefere das gesamte Objekt als beschriftetes Bild.
- Der Shader senkt Kontrast oder blockiert Rendering.
- Dann ersetze ihn durch statisches CSS/SVG.
- Das Muster liegt nur in einer Portfolio-Montage außerhalb der Website.
- Dann übernimm es nicht als Produkt-UI.
- `2096674796704813174.md`, `2096499167225078020.md` und mehrere X-Analysen trennen Mockup-Bühne und UI ausdrücklich.

## Quellen

Alle folgenden Einzelanalysen wurden vollständig als Corpus gelesen.

- `../studies/design-depth/deep/2095383602431459523.md`
- `../studies/design-depth/deep/2095488681796854015.md`
- `../studies/design-depth/deep/2095565814405742911.md`
- `../studies/design-depth/deep/2095783930775433616.md`
- `../studies/design-depth/deep/2095784926717300835.md`
- `../studies/design-depth/deep/2095797753305612601.md`
- `../studies/design-depth/deep/2095807169346334900.md`
- `../studies/design-depth/deep/2095863741250474026.md`
- `../studies/design-depth/deep/2095874058697293985.md`
- `../studies/design-depth/deep/2095928637346472339.md`
- `../studies/design-depth/deep/2096149200178418026.md`
- `../studies/design-depth/deep/2096165490498695410.md`
- `../studies/design-depth/deep/2096175237109092642-video-1.md`
- `../studies/design-depth/deep/2096175237109092642-video-2.md`
- `../studies/design-depth/deep/2096175237109092642.md`
- `../studies/design-depth/deep/2096175830624055596.md`
- `../studies/design-depth/deep/2096192737867350330-video-1.md`
- `../studies/design-depth/deep/2096192737867350330-video-2.md`
- `../studies/design-depth/deep/2096192737867350330.md`
- `../studies/design-depth/deep/2096215770783199316.md`
- `../studies/design-depth/deep/2096292759489609818.md`
- `../studies/design-depth/deep/2096499167225078020.md`
- `../studies/design-depth/deep/2096618423983964587.md`
- `../studies/design-depth/deep/2096634909263646898.md`
- `../studies/design-depth/deep/2096660897628668066.md`
- `../studies/design-depth/deep/2096674796704813174.md`
- `../studies/design-depth/deep/2096832279775486079.md`
- `../studies/design-depth/deep/2096833304351961505.md`
- `../studies/design-depth/deep/2096855995909869867.md`
- `../studies/design-depth/deep/2096876701775261945.md`
- `../studies/design-depth/deep/2096889729337921598.md`
- `../studies/design-depth/deep/2096891182701793331.md`
- `../studies/design-depth/deep/2096891319843164276.md`
- `../studies/design-depth/deep/2096929195381457078.md`
- `../studies/design-depth/deep/2096931638118871502.md`
- `../studies/design-depth/deep/2096944343487852961.md`
- `../studies/design-depth/deep/2096953356086313312.md`
- `../studies/design-depth/deep/aakib-tiles.md`
- `../studies/design-depth/deep/designmd-me-1.md`
- `../studies/design-depth/deep/designmd_supply.md`
- `../studies/design-depth/deep/gap-marcelkargul.md`
- `../studies/design-depth/deep/gap-uiux_hamad.md`
- `../studies/design-depth/deep/layers.md`
- `../studies/design-depth/deep/mobbin-1.md`
- `../studies/design-depth/deep/mobbin-2.md`
- `../studies/design-depth/deep/mobbin-3.md`
- `../studies/design-depth/deep/neuform-1.md`
- `../studies/design-depth/deep/open_design.md`
- `../studies/design-depth/deep/prior_corpus.md`
- `../studies/design-depth/deep/refero-1.md`
- `../studies/design-depth/deep/refero-2.md`
- `../studies/design-depth/deep/shadcn.md`
- `../studies/design-depth/deep/twentyfirst.md`

Die zusätzlich vorhandene Tombstone-Analyse `../studies/design-depth/deep/gap-marcelkargul-2096970816969703645.md` enthält keinen Design-Beleg und trägt daher keine Regel.
