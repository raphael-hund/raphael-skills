# Spacing und Layout übersetzen den Offer in eine lesbare Folge aus Hook, Begründung und Proof

## TLDR

Baue erst Sektionsfolge und Ausrichtung, dann Container, Grid und Abstände; jede Fläche muss den Offer erklären, den CTA vorbereiten oder Proof zeigen.

## Regeln

### 1. Leite die Seitenfolge aus der Verkaufslogik ab

- Nutze für eine vollständige SaaS-Landingpage diese gemessene Referenzfolge: Nav → Hero mit Produktbild → Logos → Prozess → Features → Pricing → Testimonials → CTA → Footer (`2095863741250474026.md`).
- Behandle die Folge als Referenz, nicht als Pflicht-Template.
- Stelle die Suche vor erklärende Contribution-Boxen, wenn der Such-Intent bereits klar ist; das Gegenbeispiel zeigt die Box vor der Suche (`open_design.md`).
- Nutze in einer Case Study den belegten Kapitelrhythmus Label → Claim → Warum → Entscheidungsliste → Proof (`gap-uiux_hamad.md`).
- Halte in einer Buchungsreise Kontext, Datum und Dauer sichtbar, während der Nutzer den nächsten Schritt ausfüllt (`mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`).
- Ordne jede Sektion genau einer Aufgabe zu: Hook, Problem, Mechanismus, Proof, Offer, Einwand oder CTA. Das Corpus belegt die wiederkehrende Sektionsgrammatik Eyebrow → Headline → Subline → Aktion → Proof (`aakib-tiles.md`).
- Wiederhole diese Grammatik nicht blind. Der Vor-Corpus begrenzt Eyebrows und fordert mehrere Layout-Familien auf langen Seiten (`prior_corpus.md`).

### 2. Wähle zuerst eine Container-Logik

- Nutze einen festen Max-Container für Marketingseiten mit klarer Mittelachse. Gemessene Beispiele liegen bei `1100px` (`2095863741250474026.md`, `2096876701775261945.md`), `1152px` (`designmd_supply.md`), `1180px` (`2095874058697293985.md`) und `1248px` (`open_design.md`).
- Nutze einen prozentualen Container, wenn das Raster mit dem Viewport atmen soll. Belegt sind `76%` (`2096876701775261945.md`), `77%` (`2095807169346334900.md`) und etwa `79%` (`refero-2.md`).
- Nutze flexible Seitenränder statt Max-Container, wenn Anschnitt Teil der Komposition ist. Belegt sind etwa `4%` (`2096891319843164276.md`) und `5%` beziehungsweise `96px` auf `1920px` (`2096149200178418026.md`).
- Verankere Header, Hero, Galerie und Footer an derselben Inhaltskante. `layers.md` belegt einen durchgängigen Außenrand von `14px` auf Desktop und `16px` auf Mobile.
- Vermeide wechselnde Fensterbreiten für denselben Component-Typ. Das Gegenbeispiel wächst zwischen `536px`, `576px` und `700px`; die Analyse empfiehlt eine feste Breitenregel (`2096833304351961505.md`).
- Nutze für Form-Flows eine schmale, zentrierte Spalte. Gemessene Bereiche reichen von `33–52%` der Fläche (`mobbin-1.md`) bis etwa `460–530px` CSS (`mobbin-2.md`).
- Nutze für Kataloge eine breitere Fläche. Belegt sind `3` Spalten mit `20px`, `24px`, `26px`, `28px` oder `30px` Gutter (`open_design.md`, `designmd-me-1.md`, `2096175237109092642-video-1.md`, `2096175237109092642-video-2.md`, `2096175237109092642.md`).

### 3. Baue das Grid aus Informationsgewicht, nicht aus Symmetrie

- Nutze gleiche Spalten nur für gleichartige Daten. KPI-Reihen mit `4` gleichen Spalten sind belegt (`2096215770783199316.md`); Kataloge mit `3` gleichen Spalten ebenfalls (`designmd-me-1.md`).
- Nutze ungleiche Spans für ungleich wichtige Inhalte. Das Feature-Bento mit `6` Grundspalten verteilt Hauptinhalte über `3` und Nebeninhalte über `2` Spalten (`2095784926717300835.md`).
- Nutze `40/60` für Copy plus datenreichen Proof. Dieses Verhältnis ist in Dashboard- und Bento-Beispielen belegt (`2096618423983964587.md`, `2096876701775261945.md`).
- Nutze `5/7` für einen Prozess-Stepper links und einen größeren Produkt-Shot rechts (`2095863741250474026.md`).
- Nutze `3/2` für breite Daten links und Feed oder Status rechts (`2096215770783199316.md`).
- Nutze eine geteilte Mittelspalte, wenn zwei kleine Karten dieselbe Höhe wie hohe Außenkarten füllen sollen (`2095784926717300835.md`).
- Lasse bei einem Bento keine leeren Deko-Zellen entstehen. Der Vor-Corpus fordert exakt so viele Zellen wie Inhalte (`prior_corpus.md`).
- Nutze Asymmetrie durch Span, Position, Anschnitt oder Licht. Zentrierte Flows bleiben sinnvoll, wenn eine einzige Frage oder ein einziger CTA die gesamte Aufmerksamkeit braucht (`2096192737867350330.md`, `2096674796704813174.md`).

### 4. Entscheide die Ausrichtungsachse pro Sektion

- Zentriere Hero-Copy, wenn Hook, Subline und CTA ein einziger fokussierter Stack sind. Gemessene Textbreiten liegen bei `480–680px` (`2095488681796854015.md`) und etwa `800px` (`2096931638118871502.md`).
- Richte Karteninhalt links aus, auch wenn der Sektionskopf zentriert ist (`2095784926717300835.md`).
- Nutze den Split-Header nur, wenn beide Seiten eigenständige Rollen haben: Claim links und kurze Einordnung oder CTA rechts (`aakib-tiles.md`, `2096944343487852961.md`).
- Vermeide den Split-Header als reflexhaften Stil. `prior_corpus.md` sperrt das Muster als generischen Default und empfiehlt den gestapelten Kopf.
- Setze Bildoberkante und Headline-Oberkante gleich, wenn beide Hälften als parallele Argumente gelesen werden sollen (`2095928637346472339.md`).
- Nutze `margin-top:auto`, wenn eine Feature-Liste oder Stats am unteren Rand der Nachbarfläche enden sollen; setze dafür keinen festen Leerblock (`2095928637346472339.md`, `2095565814405742911.md`).
- Richte Titel und Control in Karten über `grid-template-columns:1fr auto` oben aus. Das verhindert den belegten Versatz bei zweizeiligen Labels (`2096175237109092642-video-1.md`, `2096175237109092642.md`).
- Richte Marker, Label und Wert an wiederkehrenden Achsen aus. Die Chart-Legende als `3`-Spalten-Grid zeigt dieses Prinzip (`2095383602431459523.md`).

### 5. Gib Hero-Kompositionen ein klares Muster

- Wähle einen zentrierten Proof-Stack für einfache SaaS-Angebote: Eyebrow → Headline → Subline → CTA → Produktvorschau (`2095488681796854015.md`, `2096889729337921598.md`).
- Wähle einen asymmetrischen Split für erklärungsbedürftige Offers: Copy links, reales Motiv oder Proof rechts. `prior_corpus.md` nennt `7/5` als belegte Code-Signatur; `designmd-me-1.md` misst `551px` Text plus `488px` Proof.
- Wähle eine diagonale Komposition für Story-Spannung: Copy oben links, Proof unten rechts (`2095928637346472339.md`).
- Wähle ein Beweis-Dreieck für technische Angebote: Terminal links oben, Produkt rechts, Headline links unten (`refero-1.md`).
- Wähle einen Foto-Raster-Hero, wenn Menschen oder Situationen der Proof sind. Das belegt ein `12`-Spalten-Grid mit unterschiedlich großen Randfotos und Copy in der Mitte (`mobbin-2.md`).
- Komponiere Text und Foto gemeinsam. Der Arcstone-Hero legt Text in die dunkle Bildzone und Produktvorschau in die helle Zone (`2096149200178418026.md`).
- Nutze Anschnitt nur, wenn er Fortsetzung oder Tiefe signalisiert. Belegt sind Produktstreifen an beiden Rändern (`twentyfirst.md`) und ein Browser-Mockup am Content-Rahmen (`2096175830624055596.md`).
- Halte die CTA-Zeile vor visuellen Effekten frei. Das dunkle Hero-Beispiel lässt die Lichtformen erst unterhalb der CTA konvergieren (`2096931638118871502.md`).
- Nutze `min-height:100dvh` nur, wenn der Hero echten Inhalt für die Höhe besitzt. Das Gegenmaterial warnt vor leeren Höhenbändern (`prior_corpus.md`).

### 6. Erzeuge Rhythmus mit wenigen, benannten Stufen

- Lege eine lokale Spacing-Skala fest. Das Corpus zeigt `4px`, `6px`, `8px`, `15px`, `30px` und freie Basisraster; es belegt kein universelles Raster (`shadcn.md`, `2096832279775486079.md`, `2096215770783199316.md`, `2096499167225078020.md`, `2095383602431459523.md`).
- Nutze für Marketing-Sektionen als gemessene Spannweite `80–120px` normal (`2095863741250474026.md`, `aakib-tiles.md`) und `128–192px` airy (`prior_corpus.md`).
- Nutze für datenreiche Screens deutlich engere Abstände. Belegt sind `20–24px` Karten-Gap und `24px` Karten-Padding (`2096215770783199316.md`, `2096618423983964587.md`).
- Halte Kopf → Inhalt größer als Abstände innerhalb der Cards. Belegt sind `40px` (`2095863741250474026.md`), `48–64px` (`aakib-tiles.md`) und `64px` (`2095797753305612601.md`).
- Kopple Headline und Subline enger als Subline und Proof. Das Feature-Paket misst Eyebrow → Headline `32px`, Headline → Subline `32–40px` und Subline → Grid `80–110px` (`2095784926717300835.md`).
- Nutze Makro-Luft bewusst. Der Hubmini-Rhythmus misst `120–140px` zwischen Sektionen und `16/16/40/48px` im Hero-Stack (`2095874058697293985.md`).
- Nutze keine einzelne `section > * + *`-Regel für alle Abstände. Der Corpus zeigt je Rolle unterschiedliche Schritte zwischen Label, Headline, CTA und Proof (`2095797753305612601.md`, `designmd_supply.md`).
- Prüfe lange deutsche Copy. Ein Hero-Body soll im belegten Gegenbeispiel auf höchstens `60ch` begrenzt werden (`2096953356086313312.md`).

### 7. Trenne Sektionen mit einer konsistenten Materiallogik

- Nutze Whitespace und eine `1px`-Linie, wenn die Page ruhig und technisch wirken soll (`2096292759489609818.md`, `2096175830624055596.md`).
- Nutze abgerundete Boards auf einer Page-Fläche, wenn jede Phase als eigene Bühne wirken soll. Belegt sind etwa `40px` Radius für Section-Boards (`2095797753305612601.md`).
- Nutze ein einziges Sheet mit Spaltentrennern für kompakte Konfiguratoren. Das Beispiel verwendet das Verhältnis `1 : 1.25 : 1` (`2096929195381457078.md`).
- Nutze Flächenkontrast statt Schatten in Produkt-UI. Das ist über Mobbin, Dashboards und App-Shells wiederholt belegt (`mobbin-1.md`, `2096660897628668066.md`, `2096618423983964587.md`).
- Nutze sichtbare Rasterlinien nur als echte Ausrichtungsgrammatik. Arcstone rastet Foto und Copy auf ein `4`-Spalten-Haarlinienraster (`2096149200178418026.md`); dekorative Crosshairs sind im Vor-Corpus ein Anti-Pattern (`prior_corpus.md`).
- Vermeide harte Sektionskante, wenn der Hero visuell in den nächsten Bereich übergehen soll. Der Sky-Hero blendet nach unten in die Page-Farbe (`2096891319843164276.md`).

### 8. Plane responsive Verhalten als Re-Komposition

- Kollabiere einen Katalog von `3` auf `2` und dann `1` Spalte; konkrete Breakpoints und Gaps sind in `designmd_supply.md` belegt.
- Lasse kleine Cards auf Mobile bei Bedarf in `2` Spalten. `prior_corpus.md` warnt vor der pauschalen Einspalten-Doktrin.
- Staple Split-Hero, Split-Header und Prozess-Grid, bevor Text oder Controls gequetscht werden.
- Erhalte die semantische Reihenfolge: Hook vor CTA, Kontext vor Eingabe, Erklärung vor Proof.
- Nutze `100dvh` statt `100vh`, wenn ein echter Full-Viewport-Flow nötig ist (`prior_corpus.md`).
- Reserviere Platz für fixe Fortschrittsleisten oder Badges. Ein belegter Supply-Badge überdeckt Kartenfüße und Codezeilen (`designmd_supply.md`).
- Lasse angeschnittene Deko auf Mobile nicht den CTA verdecken. Das Corpus zeigt Anschnitt als bewusste Desktop-Komposition, nicht als universelle Regel (`twentyfirst.md`, `2095783930775433616.md`).

## Bauanleitungen

Alle nicht direkt mit einer Beleg-Datei kommentierten Zahlen in den folgenden Snippets sind **eigene Startwerte**. Passe sie nach Copy, Proof und Viewport an.

### A. Landingpage-Shell mit variabler Sektionsdichte

```html
<main class="page-shell">
  <section class="section section--hero">…</section>
  <section class="section section--normal">…</section>
  <section class="section section--proof">…</section>
</main>
```

```css
:root {
  --edge: clamp(1rem, 4vw, 4rem); /* 4% sind in 2096891319843164276.md gemessen; Min/Max sind Startwerte. */
  --content: 72rem; /* Startwert; 1152px sind in designmd_supply.md belegt. */
  --space-section: clamp(5rem, 8vw, 7.5rem); /* Eigener Startwert innerhalb der Corpus-Spanne. */
  --space-proof: clamp(3rem, 6vw, 5rem); /* Eigener Startwert für dichten Proof. */
}
.page-shell { overflow: clip; }
.section {
  width: min(var(--content), calc(100% - 2 * var(--edge)));
  margin-inline: auto;
  padding-block: var(--space-section);
}
.section--proof { padding-block: var(--space-proof); }
```

### B. Asymmetrischer Hero mit echtem Proof

```html
<section class="hero-split">
  <div class="hero-copy">
    <p class="eyebrow">Für den klar benannten ICP</p>
    <h1>Der Hook sagt den Outcome.</h1>
    <p>Die Subline erklärt Mechanismus und Offer ohne zweite Headline.</p>
    <div class="actions">
      <a class="button" href="#offer">Offer ansehen</a>
      <a class="text-link" href="#proof">Proof prüfen</a>
    </div>
  </div>
  <figure class="hero-proof">
    <img src="eigener-proof.webp" alt="Realer Produktzustand mit sichtbarem Ergebnis">
  </figure>
</section>
```

```css
.hero-split {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr); /* 7/5 aus prior_corpus.md. */
  gap: clamp(1.5rem, 4vw, 4rem); /* 24–64px sind in prior_corpus.md belegt. */
  align-items: center;
  padding-block: clamp(3rem, 8vh, 6rem); /* Eigener Startwert; 96px Cap aus prior_corpus.md. */
}
.hero-copy { max-width: 40rem; } /* Startwert. */
.hero-copy > * + * { margin-top: 1.5rem; } /* Startwert. */
.actions { display: flex; flex-wrap: wrap; gap: .75rem; } /* Startwert. */
.hero-proof img { width: 100%; height: auto; object-fit: cover; }
@media (max-width: 48rem) { /* Startwert. */
  .hero-split { grid-template-columns: 1fr; }
  .hero-proof { order: 2; }
}
```

### C. Bento nach Informationsgewicht

```html
<section aria-labelledby="features-title">
  <header class="stacked-head">
    <p>Mechanismus</p>
    <h2 id="features-title">Drei Gründe, nicht drei gleiche Cards</h2>
    <p>Der größte Proof erhält die größte Fläche.</p>
  </header>
  <div class="bento">
    <article class="bento__main">…</article>
    <article class="bento__side">…</article>
    <article class="bento__half">…</article>
    <article class="bento__half">…</article>
  </div>
</section>
```

```css
.bento {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr)); /* 6 Grundspalten in 2095784926717300835.md. */
  gap: 1.25rem; /* Startwert; 20px dort gemessen. */
}
.bento__main { grid-column: span 4; }
.bento__side { grid-column: span 2; }
.bento__half { grid-column: span 3; }
@media (max-width: 48rem) { /* Startwert. */
  .bento > * { grid-column: 1 / -1; }
}
```

### D. Prozess mit Stepper und Produkt-Shot

```html
<section class="process">
  <div>
    <h2>So entsteht der Outcome</h2>
    <ol class="steps">
      <li><strong>Input klären.</strong><span>Der ICP gibt die Ausgangslage.</span></li>
      <li><strong>Mechanismus anwenden.</strong><span>Das Produkt macht den Unterschied sichtbar.</span></li>
      <li><strong>Proof prüfen.</strong><span>Der Nutzer sieht ein reales Ergebnis.</span></li>
    </ol>
    <a class="button" href="#cta">Nächsten Schritt wählen</a>
  </div>
  <figure class="process-proof"><img src="eigener-flow.webp" alt="Drei reale Schritte im Produkt"></figure>
</section>
```

```css
.process {
  display: grid;
  grid-template-columns: 5fr 7fr; /* Gemessen in 2095863741250474026.md. */
  gap: 4rem; /* Startwert; 64px in 2096292759489609818.md belegt. */
  align-items: start;
}
.steps { position: relative; list-style: none; padding: 0; }
.steps::before {
  content: "";
  position: absolute;
  inset-block: .5rem;
  left: .375rem;
  width: .0625rem;
  background: currentColor;
  opacity: .2;
}
.steps li { position: relative; padding: 0 0 1.5rem 2rem; } /* Startwerte. */
.steps li::before {
  content: "";
  position: absolute;
  left: 0;
  top: .25rem;
  width: .75rem;
  aspect-ratio: 1;
  background: currentColor; /* 12px-Marker in 2095863741250474026.md. */
}
@media (max-width: 48rem) { /* Startwert. */
  .process { grid-template-columns: 1fr; }
}
```

### E. Zentrierter Hero mit separater Proof-Zone

```html
<section class="hero-stack">
  <div class="hero-stack__copy">
    <p class="eyebrow">Ein spezifischer Hook</p>
    <h1>Ein klarer Outcome in höchstens zwei Zeilen</h1>
    <p>Eine kurze Erklärung für den ICP.</p>
    <a class="button" href="#proof">Proof ansehen</a>
  </div>
  <figure class="hero-stack__proof">…</figure>
</section>
```

```css
.hero-stack { text-align: center; }
.hero-stack__copy {
  width: min(100%, 42rem); /* 42rem = 672px; innerhalb 480–680px aus 2095488681796854015.md. */
  margin-inline: auto;
  display: grid;
  justify-items: center;
  gap: 1.5rem; /* Startwert. */
}
.hero-stack__proof {
  margin: 4.5rem auto 0; /* Startwert; 72px in 2096855995909869867.md gemessen. */
  width: min(100%, 70rem); /* Startwert. */
}
```

### F. Sektionskopf ohne reflexhaften Split

```html
<header class="section-head-stack">
  <p class="section-label">Proof</p>
  <h2>Die Aussage bleibt mit der Erklärung verbunden</h2>
  <p>Die Copy steht direkt darunter und hält dieselbe Lesekante.</p>
</header>
```

```css
.section-head-stack {
  display: grid;
  gap: .75rem; /* Startwert; gestapelter Kopf aus prior_corpus.md. */
  max-width: 65ch; /* 65ch aus prior_corpus.md. */
  margin-bottom: 3rem; /* Startwert innerhalb 40–64px des Corpus. */
}
```

### G. Fixes UI-Element ohne Überdeckung

```css
:root { --fixed-reserve: 4.5rem; } /* Startwert. */
.page-with-fixed-progress {
  padding-bottom: calc(var(--fixed-reserve) + env(safe-area-inset-bottom));
}
.progress {
  position: fixed;
  inset-inline: 50% auto;
  bottom: max(1rem, env(safe-area-inset-bottom)); /* Startwert. */
  translate: -50% 0;
}
```

- Das reservierte Bottom-Padding repariert das in `designmd_supply.md` belegte Überdeckungsproblem.
- Für einen echten Mehrschritt-Flow sind `320×8px` als gemessene Progress-Größe belegt (`2096192737867350330.md`).

## Varianten je Stilfamilie

### Editorial und Architektur

- Nutze breite Außenränder, sichtbare Achsen und wenige große Flächen.
- Nutze den `4`-Spalten-Haarlinienraster nur, wenn Bild, Caption und Copy wirklich einrasten (`2096149200178418026.md`).
- Nutze eine asymmetrische Statement-Sektion: Label links, Headline rechts, Foto darunter über volle Breite (`2095874058697293985.md`).
- Nutze harte Kanten oder kleine Radien konsequent. `refero-1.md` belegt Editorial- und Fashion-Flächen mit Radius `0`.
- Lasse freie Zonen die Komposition tragen. Das Poster-Board verankert Logo, Motiv, Claim und Pfeil an vier Punkten (`2096953356086313312.md`).

### SaaS-Marketing und Bento

- Nutze den zentrierten Sektionskopf und linksbündige Cards, wenn mehrere Features vergleichbar sind (`2095784926717300835.md`).
- Nutze ungleiche Spans, echte UI-Fragmente und einen dominanten Proof.
- Nutze einen Produktframe unter dem Hero; das belegte Beispiel rückt ihn seitlich etwa `110px` ein (`2096889729337921598.md`).
- Nutze einen Kartenfächer nur als einzelne Hero-Geste. Das Beispiel staffelt `7` Cards über Rotation und Überlappung (`2096855995909869867.md`).
- Vermeide die Folge aus immer gleichen Dreierkarten. `prior_corpus.md` nennt sie explizit als Slop-Signatur.

### Product-UI und Dashboard

- Nutze feste Sidebars plus fluiden Content. Belegt sind etwa `200px`, `212px`, `255px`, `300px` und `330px`, je nach Informationsdichte (`gap-uiux_hamad.md`, `2096832279775486079.md`, `2096944343487852961.md`, `2096215770783199316.md`, `2096889729337921598.md`).
- Nutze `20–24px` Gaps und `24px` Padding als belegte dichte Werte, nicht Marketing-Abstände (`2096215770783199316.md`, `2096618423983964587.md`).
- Nutze Border und Graustufen statt Schatten (`2096660897628668066.md`, `mobbin-1.md`).
- Trenne Live-Objekt und Inspector. Das Neuform-Beispiel nutzt etwa `2/3` links und `1/3` rechts (`neuform-1.md`).
- Nutze Sticky nur für dauerhaft nötige Navigation oder Provenienz (`designmd_supply.md`, `open_design.md`).

### Formular, Booking und Onboarding

- Nutze einen zentrierten Stack für „eine Frage pro Screen“ (`2096192737867350330.md`).
- Zentriere niedrige Steps vertikal; richte hohe Kalender- oder Kartensteps weiter oben aus (`2096192737867350330-video-1.md`, `2096192737867350330-video-2.md`).
- Erweitere eine Booking-Card mit dem Flow von `2` auf `3` Spalten, ohne die Kontextspalte zu verlieren (`mobbin-3.md`).
- Nutze für Kalender ein echtes `7`-Spalten-Grid (`2096192737867350330-video-1.md`, `mobbin-3.md`, `gap-uiux_hamad.md`).
- Halte Back, Continue und Progress geometrisch stabil; reserviere Raum für wechselnde Zustände.

### Immersive Foto- und Portfolio-Seiten

- Setze ein helles oder dunkles Page-Panel auf ein Vollbildmotiv, wenn der Hintergrund die Markenwelt trägt (`2095807169346334900.md`, `2095565814405742911.md`).
- Nutze ein Foto als eine Hälfte eines Splits, nicht als beliebige Card (`refero-1.md`).
- Staffel Konsolen oder Bilder bewusst statt sie zwanghaft in ein symmetrisches Grid zu drücken (`2095565814405742911.md`).
- Halte die Textzone frei von Randdekoration (`2096175830624055596.md`).
- Nutze Anschnitt als Hinweis auf Fortsetzung, nicht als Entschuldigung für unvollständigen Proof (`twentyfirst.md`, `2095783930775433616.md`).

### Linien- und Blueprint-Systeme

- Nutze einen Content-Rahmen mit Sektionslinien statt einzelner Cards (`2096175830624055596.md`).
- Nutze vertikale Containerlinien und eingerückten Inhalt als durchgehende Seitenarchitektur (`2095874058697293985.md`).
- Nutze Linien hinter Marketinginhalt nur, wenn die Headline und Medien daran ausgerichtet sind (`refero-2.md`).
- Nutze Cut-Marks, gepunktete Achsen und Anfasser sparsam als echte System-Signale (`gap-marcelkargul.md`).

## Dos

- Beginne mit einem Sektionsinventar: Aufgabe, Layout-Familie, Ausrichtung, Proof und nächster CTA.
- Lege eine Container-Logik für die ganze Seite fest.
- Gib jeder Sektion eine dominante Achse.
- Verwende gleiche Spalten nur für gleiche Informationsarten.
- Gib dem wichtigsten Proof die größte Fläche.
- Halte Sektionsabstand größer als Card-Innenabstand.
- Koppel Headline und Subline enger als Subline und Proof.
- Setze Karteninhalt linksbündig, wenn Nutzer Details scannen.
- Zentriere nur, wenn der Flow wirklich eine einzige Entscheidung führt.
- Nutze `margin-top:auto` für Boden-Ausrichtung statt künstlicher Leerhöhe.
- Reserviere Raum für fixe Controls, Progress und Safe Areas.
- Prüfe deutsche Copy auf echte Zeilenumbrüche.
- Prüfe das Layout bei schmalem, mittlerem und breitem Viewport.
- Prüfe, ob Anschnitt den Proof verstärkt oder Informationen abschneidet.
- Wiederhole Layouts bei gleichen Daten bewusst; variiere sie bei anderer Funktion.
- Nutze echte HTML-Reihenfolge, nicht nur visuelle Umordnung.

## Don'ts

- Baue nicht acht Sektionen als identische zentrierte Köpfe plus drei gleiche Cards. Das Corpus markiert genau diese Wiederholung als Slop (`prior_corpus.md`).
- Setze nicht vor jede Sektion eine Eyebrow. Der Vor-Corpus nennt maximal eine Eyebrow je drei Sektionen als Referenz (`prior_corpus.md`).
- Nutze keinen Split-Header nur, weil rechts noch Platz ist. Das generische Muster ist im Vor-Corpus ausdrücklich gesperrt (`prior_corpus.md`).
- Strecke dünnen Inhalt nicht mit `min-height:100vh`. Leere Höhenbänder sind ein belegtes Anti-Pattern (`prior_corpus.md`).
- Stelle eine Contribution-Box nicht vor die Suche. Genau diese falsche Reihenfolge ist in `open_design.md` dokumentiert.
- Lasse ein fixes Badge nicht über Card-Fuß oder Code liegen. Das passiert im Supply-Beispiel (`designmd_supply.md`).
- Schneide Chips nicht am Kartenrand ab. Das Portfolio-Beispiel zeigt abgeschnittene Status-Chips (`2095807169346334900.md`).
- Schneide Produkt-UI nicht dort ab, wo der Nutzer den Outcome prüfen muss. Das `2×2`-Banner eignet sich nur als Hero-Teaser (`2095783930775433616.md`).
- Verschiebe Controls nicht, sobald ein Label zweizeilig wird. Das Katalogbeispiel zeigt den Fehler; nutze ein `1fr/auto`-Header-Grid (`2096175237109092642-video-1.md`).
- Halbiere einen Slot nach Auswahl nicht ohne reservierten Platz. Der Apollo-Flow zeigt diesen Layout-Sprung (`mobbin-1.md`).
- Ziehe Admin-Sidebar und Dashboard-Chrome nicht in eine öffentliche Booking-Reise (`mobbin-1.md`).
- Verwende nicht gleichzeitig Board, Hairline-Raster, Glas, Glow und Bento. Jede Stilfamilie im Corpus arbeitet mit wenigen konsistenten Trennmitteln.
- Mische keine frei erfundenen Pixelwerte mit gemessenen Angaben, ohne sie als Startwert zu markieren.

## Gilt nicht wenn

- Nutze ein symmetrisches Grid, wenn die Daten semantisch gleichrangig sind: KPI-Reihen, Kalender, Pricing-Vergleich und Kataloge belegen diese Ausnahme.
- Wiederhole denselben Row- oder Card-Aufbau, wenn gleiche Daten dadurch schneller vergleichbar werden. `prior_corpus.md` erlaubt Kohärenz bei gleichen Daten ausdrücklich.
- Nutze einen Split-Header, wenn rechts ein eigenständiger CTA oder eine knappe Orientierung sitzt und beide Rollen belegt sind (`2096944343487852961.md`, `aakib-tiles.md`).
- Nutze Full-Viewport-Höhe, wenn ein Wizard-Step bewusst genau eine Frage zeigt oder ein echtes Hero-Motiv die Höhe füllt (`2096192737867350330.md`, `mobbin-2.md`).
- Nutze Anschnitt, wenn er eine fortlaufende Galerie, einen Streifen oder eine Bühne signalisiert und keine entscheidende Information verliert (`twentyfirst.md`).
- Nutze einen breiten Container für Tabellen und Vergleichsansichten, auch wenn Formulare derselben Reise schmal bleiben (`mobbin-2.md`).
- Nutze ein sichtbares Raster, wenn alle wichtigen Elemente daran ausgerichtet sind; nutze es nicht als Hintergrundfüller (`2096149200178418026.md`, `prior_corpus.md`).
- Nutze enge Abstände in Datenprodukten. Airy Marketingwerte gelten dort nicht (`2096215770783199316.md`, `2096618423983964587.md`).
- Nutze Boards statt Linien, wenn die Seite bewusst aus eigenständigen Szenen besteht (`2095797753305612601.md`).
- Nutze harte Kanten statt Radius, wenn Editorial, Poster oder Tech-System diese Geometrie konsequent führen (`2095783930775433616.md`, `refero-1.md`, `2096953356086313312.md`).

## Quellen

Alle folgenden Einzelanalysen wurden vollständig gelesen. Messwerte und Bild-IDs stehen in den jeweiligen Dateien.

### Primäranalysen

- `2095383602431459523.md` — Chart-Cards, Achsen und lokaler Rhythmus.
- `2095784926717300835.md` — Feature-Sektionen und Bento-Spans.
- `2095797753305612601.md` — Recurr, Boards und vollständige Seitenphasen.
- `2095874058697293985.md` — Hubmini, Containerlinien und Statement-Asymmetrie.
- `2095928637346472339.md` — Fullbleed-Hero und schwarzer Split.
- `2096149200178418026.md` — Arcstone, sichtbares Raster und Foto-Komposition.
- `2096165490498695410.md` — App-Shell, Rail und Chat-Panel.
- `2096175237109092642-video-1.md` — Katalog-Grid und Header-Wrapping.
- `2096175237109092642-video-2.md` — Chart-Katalog und responsive Grid-Regeln.
- `2096175237109092642.md` — Kartenraster und lokaler Rhythmus.
- `2096215770783199316.md` — Dashboard-Shell, KPI-Grid und Zeilenhöhen.
- `2095783930775433616.md` — diagonales `2×2`-Banner und bewusstes Cropping.
- `2095807169346334900.md` — Page-Panel auf Foto und Content-Breite.
- `2096618423983964587.md` — `40/60`-Dashboard und dichte Abstände.
- `2096634909263646898.md` — schmale Mittelachse und enges Kategorien-Grid.
- `2096674796704813174.md` — vollständig zentrierte Modal-Komposition.
- `2096832279775486079.md` — Drei-Spalten-Shell und Prozessliste.
- `2096855995909869867.md` — Kartenfächer und zweigeteilte Hero-Zonen.
- `2096891319843164276.md` — Hero-Fade, flexible Ränder und Footer-Grid.
- `2096929195381457078.md` — dreispaltiges Sheet und lokale Spacing-Skala.
- `2096192737867350330-video-1.md` — fixe Bühne, Kalender und Slots.
- `2096192737867350330-video-2.md` — zentrierter Step-Stack und Progress.
- `2096192737867350330.md` — eine Frage pro Screen und Full-Viewport-Flow.
- `2096499167225078020.md` — App-Shell und `2×2`-KPI-Grid.
- `2096660897628668066.md` — Appshell-Ebenen ohne Schatten.
- `2096833304351961505.md` — Fensterbreite, Zentrierung und Chrome.
- `2096876701775261945.md` — Wireframe-Bühne, Bento und Containerbreite.
- `2096891182701793331.md` — Settings-Layout und lokale Abstände.
- `2096931638118871502.md` — Hero-Zonen und FX unterhalb der CTA.
- `2096953356086313312.md` — Poster-Board und Vier-Anker-Komposition.
- `2095488681796854015.md` — zentrierter Hero-Stack.
- `2095565814405742911.md` — Split-Hero und gestaffelte Konsolen.
- `2095863741250474026.md` — vier komplette Landingpage-Boards.
- `2096175830624055596.md` — Content-Rahmen, Timeline und Crop.
- `2096292759489609818.md` — Linien-Trennung, Stepper und Footer.
- `2096889729337921598.md` — Hero-Proof-Frame und App-Shell.
- `2096944343487852961.md` — Hero-Zeile, CTA-Ausrichtung und App-Karte.

### Plattform- und Korpusanalysen

- `aakib-tiles.md` — Sektionsgrammatik und vier visuelle Häute.
- `mobbin-1.md` — Marketing-, Formular- und Booking-Dichte.
- `mobbin-2.md` — Booking-Vergleich, Foto-Hero und Proof-Bento.
- `mobbin-3.md` — adaptive Booking-Card und Sales-Split.
- `refero-1.md` — Beweis-Dreieck, Formular-Foto-Split und Geometriefamilien.
- `refero-2.md` — Logo-Anschnitt, Abschluss-CTA und Hilfslinien.
- `designmd-me-1.md` — Detail-, Discover- und Hero-Grid.
- `neuform-1.md` — sticky Auth-Säule, Galerie und Inspector-Split.
- `layers.md` — gemeinsame Außenkante und Modal-Grid.
- `designmd_supply.md` — responsive Container, Guide-Split und Overlay-Fehler.
- `open_design.md` — Katalog, Sticky-Sidebar und Suchreihenfolge.
- `twentyfirst.md` — angeschnittene Produktstreifen und Service-Grid.
- `shadcn.md` — lokale Spacing-Skala und Dialog-Inset.
- `prior_corpus.md` — Anti-Slop-Regeln, Sektionsdichte und Layout-Varianz.
- `gap-marcelkargul.md` — Linien-System, leere Mitte und gemessene Section-Gaps.
- `gap-uiux_hamad.md` — Case-Study-Rhythmus und System-first-Komposition.
