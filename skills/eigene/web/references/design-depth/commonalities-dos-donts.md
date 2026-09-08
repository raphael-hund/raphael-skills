# Kohärenz schlägt Dekoration

## TLDR

Wähle eine Stilfamilie, gib Farbe, Form und Effekt je einen Job, und liefere nach jedem Versprechen sichtbaren Proof statt austauschbarer Deko.

## Leseschlüssel

- `gemessen` bezeichnet einen Wert aus der genannten Analyse-Datei.
- `eigener Startwert` bezeichnet einen bewusst gesetzten Ausgangspunkt, der im echten Viewport geprüft werden muss.
- Ein Quellenhinweis wie `(mobbin-1.md)` belegt die jeweilige Regel im Corpus.
- Eine Einzelquelle beweist eine lokale Stilentscheidung, keine universelle Wahrheit.
- Eine Regel über mehrere Stilfamilien nennt mehrere Beleg-Dateien.

## Regeln

### Erst Skelett, dann Haut

1. Lege die Informationsfolge vor Farben und Effekten fest.
   Wiederkehrende Landingpage-Folge: Nav → Hero → Proof → Prozess → Features → Offer → Stimmen → CTA → Footer.
   Beleg: `aakib-tiles.md`, `2095863741250474026.md`, `2096292759489609818.md`.
2. Formuliere pro Sektion genau einen Job.
   Der Corpus zeigt wiederholt Eyebrow → Headline → Subline → Aktion → Proof.
   Beleg: `2095784926717300835.md`, `2095797753305612601.md`, `2095488681796854015.md`, `aakib-tiles.md`.
3. Lass den Proof direkt auf das Versprechen folgen.
   Geeigneter Proof ist echte UI, eine benannte Zahl, ein Projektbild mit Caption oder ein zugeschriebenes Zitat.
   Beleg: `designmd_supply.md`, `2095928637346472339.md`, `2096149200178418026.md`.
4. Baue Serien aus einer festen Anatomie.
   Karten dürfen inhaltlich wechseln, ihre Slots und Ausrichtungen bleiben gleich.
   Beleg: `2096175237109092642.md`, `2096175237109092642-video-1.md`, `2096175237109092642-video-2.md`.
5. Variiere Grid-Spans nach Informationsgewicht, nicht aus Bento-Gewohnheit.
   Hauptflows dürfen breiter sein; Nebenflows folgen kleiner.
   Beleg: `2095784926717300835.md`, `2095797753305612601.md`, `2095807169346334900.md`.
6. Halte Kontext in Funktionsflows sichtbar.
   Termin, Zeitzone, Auswahl oder Rechnung bleiben neben oder über dem aktuellen Schritt.
   Beleg: `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`, `2096192737867350330.md`.

### Material braucht eine klare Logik

7. Erzeuge Tiefe primär mit Flächenstufen und Hairlines.
   Schatten bleiben Raised- oder Hover-Ebenen vorbehalten.
   Beleg: `mobbin-1.md`, `mobbin-2.md`, `refero-1.md`, `refero-2.md`, `shadcn.md`, `2096215770783199316.md`.
8. Nutze in hellen Systemen Page → Surface → Raised.
   Beispielwerte `#F2F2F2 → #FAFAFA → #FFFFFF` sind gemessen in `2095784926717300835.md`.
9. Nutze in dunklen Systemen Page → Surface → Sunken/Raised.
   Beispielwerte `#111111 → #181818 → #131313/#2A2A2A` sind gemessen in `2096175237109092642.md`.
10. Setze `1 px` Hairlines nur dort ein, wo sie Struktur erklären.
    Der Wert ist gemessen in `mobbin-1.md`, `refero-2.md`, `shadcn.md` und `2096215770783199316.md`.
11. Verwende Schatten nur, wenn ein Element tatsächlich über seiner Ebene schwebt.
    Belegte Fälle sind Tooltip, Hover-Spalte, Modal und Karte auf Verlauf.
    Beleg: `2096215770783199316.md`, `refero-1.md`, `refero-2.md`.
12. Verwende Glas nur auf Bild oder bewegtem Material und nur mit deckender Textebene.
    Beleg: `2095797753305612601.md`, `2095807169346334900.md`, `2096833304351961505.md`.
13. Grain gehört auf Foto, Verlauf oder Brand-Feld, nie unter Pflichttext.
    Beleg: `2095807169346334900.md`, `2095783930775433616.md`, `2096674796704813174.md`, `layers.md`.
14. Ein sichtbares Raster braucht einen Zweck.
    Es darf Grid-Präzision, technische Bühne oder Markenmotiv zeigen; es ist kein Lückenfüller.
    Beleg: `2096149200178418026.md`, `2095874058697293985.md`, `gap-marcelkargul.md`, `prior_corpus.md`.

### Farbe bekommt Rollen statt Stimmung

15. Wähle pro Seite einen Signalwert.
    Nutze ihn für Action, Auswahl oder Status; konkurrierende gesättigte Actions fehlen im guten Corpus.
    Beleg: `aakib-tiles.md`, `mobbin-1.md`, `mobbin-2.md`, `refero-1.md`, `open_design.md`.
16. Trenne Marketing-Action und Produktdaten, wenn beide im selben View erscheinen.
    Beleg: `2095488681796854015.md`, `2096175830624055596.md`, `2096889729337921598.md`.
17. Farbe in Charts codiert Bedeutung.
    Grün steht in den Mono-Charts für positives Delta oder Ziel; Hue-Rampen stehen für Intensität.
    Beleg: `2096175237109092642.md`, `2096175237109092642-video-2.md`.
18. Rendere Chart, Legende, Achse und Tooltip aus demselben Datenobjekt.
    So können Farbe, Wert und Skala nicht auseinanderlaufen.
    Beleg: `2095383602431459523.md`, `2096215770783199316.md`, `2096618423983964587.md`.
19. Gib Status neben Farbe eine zweite Codierung.
    Ergänze Text, Form, Icon oder Muster.
    Beleg: `2095783930775433616.md`, `mobbin-3.md`, `shadcn.md`.
20. Definiere Muted-Farbe als Rolle mit geprüftem Kontrast.
    Sehr schwaches Grau ist kein Premium-Signal.
    Beleg: `2095807169346334900.md`, `2096175237109092642.md`, `2096891182701793331.md`, `prior_corpus.md`.
21. Lass Fotos die Palette tragen, wenn die Stilfamilie bildgeführt ist.
    UI bleibt dann neutral oder greift nur einen Fototon auf.
    Beleg: `2095928637346472339.md`, `2096149200178418026.md`, `2095807169346334900.md`.

### Typografie trennt Aussage, Daten und Meta

22. Nutze maximal zwei Schriftregister mit festen Rollen.
    Sans + Mono trennt Sprache und Daten; Serif + Sans trennt Editorial und Bedienung.
    Beleg: `2096149200178418026.md`, `2096175237109092642.md`, `2095928637346472339.md`, `mobbin-3.md`.
23. Setze Display-Headlines eng und mit ruhigem Gewicht, wenn Bild oder Layout schon laut ist.
    Belegte Tracking-Werte liegen bei `−0.02 em` bis `−0.03 em`, gemessen in `2096149200178418026.md`, `2095874058697293985.md` und `refero-2.md`.
24. Erzeuge Headline-Hierarchie nur auf einer Achse.
    Nutze Grösse, Grauabstufung, ein Accent-Wort oder einen Serif-Wechsel; mische nicht alles.
    Beleg: `aakib-tiles.md`, `2095874058697293985.md`, `designmd-me-1.md`.
25. Nutze Mono nur für echte Meta-Daten.
    Geeignet sind Zeit, Quelle, Token, Achse und Systemstatus.
    Beleg: `2096175237109092642.md`, `2096149200178418026.md`, `designmd_supply.md`.
26. Richte Zahlen rechtsbündig und tabellarisch aus.
    Beleg: `2095383602431459523.md`, `2096215770783199316.md`, `2096618423983964587.md`.
27. Schreibe Fliesstext in Satzschreibung.
    Title Case in Lede oder Intro ist im Corpus als Lesefehler markiert.
    Beleg: `2096149200178418026.md`.
28. Lass Microcopy nie die Funktion imitieren.
    Meta nennt Datenkontext, nicht CSS-Eigenschaften wie „Corner Radius“.
    Beleg: `2096175237109092642.md`, `2096175237109092642-video-2.md`.

### Form ist System, nicht Konfetti

29. Definiere Radius nach Komponentenrolle.
    Pille, Control, Karte und Board dürfen unterschiedliche Radien haben; gleiche Rollen bleiben gleich.
    Beleg: `refero-2.md`, `shadcn.md`, `2095797753305612601.md`, `2096165490498695410.md`.
30. Entscheide zwischen kantig, kompakt gerundet und weich gerundet.
    Mische diese Familien nicht ohne Materialgrenze.
    Beleg: `2095928637346472339.md`, `2096953356086313312.md`, `mobbin-3.md`.
31. Nutze Pillen für kompakte Actions, Filter oder Status, nicht als globale Default-Form.
    Beleg: `refero-2.md`, `prior_corpus.md`, `shadcn.md`.
32. Nutze denselben Icon-Duktus pro Oberfläche.
    Belegte Produkt-UIs halten Outline-Stärke und Icon-Grösse konstant.
    Beleg: `2096165490498695410.md`, `2096215770783199316.md`, `2096660897628668066.md`.
33. Baue interaktiv aussehende UI entweder echt bedienbar oder klar dekorativ.
    Beleg: `2095928637346472339.md`, `2096889729337921598.md`, `prior_corpus.md`.

### Zustand und Motion müssen etwas erklären

34. Unterscheide Auswahl, Fortschritt, Erfolg und Action visuell.
    Eine Farbe darf nicht vier ununterscheidbare Zustände tragen.
    Beleg: `mobbin-1.md`, `mobbin-2.md`, `2096929195381457078.md`.
35. Nutze Disabled als eigenen Materialzustand, nicht als Opacity auf dem ganzen Element.
    Beleg: `2096192737867350330-video-1.md`, `2096192737867350330-video-2.md`.
36. Lass Accordion-Icons den offenen Zustand zeigen.
    Identische Sparkles an offenen und geschlossenen Zeilen sind im Corpus Slop.
    Beleg: `2095928637346472339.md`, `2096215770783199316.md`.
37. Gib Icon-only-Actions einen Namen und Feedback.
    Copy braucht `aria-label` und nach Erfolg eine sichtbare Meldung.
    Beleg: `2096175237109092642.md`, `2096175237109092642-video-1.md`.
38. Animiere Daten nur beim Eintritt oder bei Datenänderung.
    Endlos wechselnde KPI-Zahlen zerstören Vertrauen.
    Beleg: `2096175237109092642.md`, `2096175237109092642-video-2.md`.
39. Respektiere Reduced Motion.
    Beleg: `2096175237109092642-video-1.md`, `2096192737867350330.md`, `designmd_supply.md`.
40. Reserviere Layout vor Zustandswechseln.
    Auswahlgewicht, Buttonlabel und Segmented Control dürfen nichts verschieben.
    Beleg: `2096192737867350330-video-2.md`, `mobbin-1.md`, `2096175237109092642-video-2.md`.

### Proof muss belastbar sein

41. Nenne Rolle, Zeitraum und Einheit jeder Kennzahl.
    Beleg: `2095383602431459523.md`, `2095928637346472339.md`, `2096215770783199316.md`.
42. Zeige bei einem Offer eine stimmige Rechnung vor dem CTA.
    Beleg: `2096929195381457078.md`.
43. Verwende Logos, Namen, Ratings und Claims nur mit realer Quelle.
    Beleg: `2095874058697293985.md`, `2096832279775486079.md`, `prior_corpus.md`.
44. Nutze Projektbilder mit `figure` und `figcaption`, wenn das Werk selbst der Proof ist.
    Beleg: `2096149200178418026.md`.
45. Halte Daten über alle Proof-Flächen konsistent.
    Widersprüchliche Beträge und Dummy-Zeitpunkte sind Anti-Proof.
    Beleg: `2095797753305612601.md`, `2095488681796854015.md`, `2095565814405742911.md`.
46. Prüfe jede sichtbare Copy.
    Tippfehler in Mono-Labels, FAQ, Demo-UI und CTA fallen besonders auf.
    Beleg: `2095874058697293985.md`, `2095797753305612601.md`, `2096944343487852961.md`.

## Anti-Slop-Regeln: Taste- und Unslop-Abgleich

47. Behandle Verbote als Default-Warnungen, nicht als Geschmacksdogma.
    `prior_corpus.md` belegt: Unslop zählt wiederholte Signaturen; der REPORT korrigiert nach Aufgabe und Beleg.
48. Entferne zuerst wiederholte, funktionslose Signaturen.
    Dazu zählen Glow-Blob, Gradient-Text, Blur-Nav, Deko-Dot-Grid, Eyebrow vor jeder Sektion und künstliche Viewport-Höhe.
    Beleg: `prior_corpus.md`.
49. Erlaube ein gebanntes Primitive nur, wenn es einen belegten Job hat.
    Glas als einzige Hero-Eyebrow ist funktional in `2096149200178418026.md`; Glas auf jeder Karte wäre Slop.
50. Erlaube Grain nur als Anti-Banding oder Fotomaterial.
    Beleg: `2095807169346334900.md`, `layers.md`, `2095783930775433616.md`.
51. Erlaube Grid nur als sichtbare Layoutlogik oder Markenmetapher.
    Beleg: `2096149200178418026.md`, `gap-marcelkargul.md`, `2096953356086313312.md`.
52. Erlaube Gradient nur als Material oder Datenfläche.
    Belegt sind Area-Fill, Foto-Fade und Brand-Band; nicht belegt ist Gradient-Text als Default.
    Beleg: `2096175237109092642.md`, `2095807169346334900.md`, `2095783930775433616.md`, `prior_corpus.md`.
53. Erlaube Pillen nur innerhalb einer Radiusgrammatik.
    Eine globale Pill-Klasse widerspricht den komponentengebundenen Familien in `refero-2.md` und `shadcn.md`.
54. Erlaube Wiederholung, wenn Daten oder Navigation sie verlangen.
    Verbiete nur mechanische Dreierkarten ohne unterschiedliche Jobs.
    Beleg: `prior_corpus.md`, `2096175237109092642.md`.
55. Prüfe Slop mechanisch und semantisch.
    Zähle Effektwiederholungen; prüfe danach Copy, Datenbindung, Kontrast, Zustand und ICP-Fit.
    Beleg: `prior_corpus.md`, `2095383602431459523.md`, `2096215770783199316.md`.
56. Prüfe das Offer gegen seine visuelle Sprache.
    Eine ruhige Enterprise-Seite verträgt keinen spielerischen Glow-Mix; ein Creative-Tool darf technische Handles nutzen.
    Beleg: `2095928637346472339.md`, `2096953356086313312.md`, `gap-marcelkargul.md`.

## Bauanleitungen

### Skelett mit echtem Proof

```html
<section class="feature" aria-labelledby="feature-title">
  <div class="feature__copy">
    <p class="feature__label">Workflow</p>
    <h2 id="feature-title">Ein klarer Outcome</h2>
    <p>Ein Satz erklärt, was der ICP danach schneller oder sicherer kann.</p>
    <a class="button" href="/demo">Demo mit echten Daten ansehen</a>
  </div>
  <figure class="feature__proof">
    <div class="product-fragment"><!-- echte DOM-UI --></div>
    <figcaption>Live-Daten · Quelle und Zeitpunkt</figcaption>
  </figure>
</section>
```

```css
.feature{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  gap:clamp(1.5rem,4vw,4rem); /* eigener Startwert */
  align-items:start;
}
.feature__copy{max-width:42rem} /* eigener Startwert */
.feature__proof{margin:0}
@media (max-width:48rem){ /* eigener Startwert */
  .feature{grid-template-columns:1fr}
}
```

Das Muster folgt `designmd_supply.md`, `2096149200178418026.md` und `mobbin-3.md`.

### Rollenbasierte Tokens statt Hex-Streuung

```css
:root{
  --page:#f5f5f2;      /* eigener Startwert */
  --surface:#ffffff;   /* eigener Startwert */
  --raised:#ededeb;    /* eigener Startwert */
  --ink:#181818;       /* eigener Startwert */
  --muted:#626262;     /* eigener Startwert; Kontrast prüfen */
  --line:rgb(24 24 24 / 10%); /* eigener Startwert */
  --action:#181818;    /* eigener Startwert */
  --on-action:#ffffff; /* eigener Startwert */
  --success:#168a46;   /* gemessen in open_design.md */
}
```

Die Rollenlogik ist in `designmd_supply.md`, `shadcn.md`, `open_design.md` und `refero-2.md` belegt.

### Materialebenen ohne Karten-Schatten

```css
.page{background:var(--page);color:var(--ink)}
.card{
  background:var(--surface);
  border:1px solid var(--line); /* 1 px gemessen in mobbin-2.md */
  border-radius:.75rem; /* eigener Startwert */
}
.card__panel{
  background:var(--raised);
  border-radius:.5rem; /* eigener Startwert */
}
.popover{
  background:var(--surface);
  box-shadow:0 .75rem 2rem rgb(0 0 0 / 10%); /* eigener Startwert; nur Raised */
}
```

Die Trennung Card versus Raised folgt `2096215770783199316.md`, `refero-2.md` und `shadcn.md`.

### Datenbindung aus einer Quelle

```html
<figure class="metric" data-metric="revenue">
  <figcaption>Umsatz · letzte Periode</figcaption>
  <output class="metric__value">12.400 €</output>
  <svg role="img" aria-labelledby="revenue-title revenue-desc"></svg>
  <div class="metric__legend"></div>
</figure>
```

```js
const series = getVerifiedSeries();
renderChart(series);
renderLegend(series);
renderAxis(scaleFrom(series));
renderSummary(summaryFrom(series));
```

Die gemeinsame Datenquelle korrigiert die belegten Gegenfehler in `2095383602431459523.md`, `2096215770783199316.md` und `2096618423983964587.md`.

### Funktionsfähiger Zustand statt Deko

```html
<details class="accordion">
  <summary>
    <span>Was passiert nach der Buchung?</span>
    <svg class="accordion__icon" aria-hidden="true"><!-- Plus --></svg>
  </summary>
  <p>Du erhältst Termin, Zeitzone und Änderungslink.</p>
</details>
```

```css
.accordion summary{display:grid;grid-template-columns:1fr auto;align-items:center}
.accordion__icon{transition:transform 180ms ease} /* eigener Startwert */
.accordion[open] .accordion__icon{transform:rotate(45deg)} /* eigener Startwert */
@media (prefers-reduced-motion:reduce){
  .accordion__icon{transition:none}
}
```

Der Zustandswechsel korrigiert `2095928637346472339.md`; Reduced Motion ist in `designmd_supply.md` und `2096175237109092642-video-1.md` belegt.

### Responsive Proof statt Desktop-Verkleinerung

```css
.proof-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr)); /* eigener Startwert */
  gap:1.25rem; /* eigener Startwert */
}
@media (max-width:60rem){ /* eigener Startwert */
  .proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))} /* eigener Startwert */
}
@media (max-width:42rem){ /* eigener Startwert */
  .proof-grid{grid-template-columns:1fr}
  .proof-grid [data-primary="true"]{order:-1} /* eigener Startwert */
}
```

Der Wechsel folgt den Ableitungen in `2095784926717300835.md`, `2096175237109092642-video-2.md` und dem belegten versetzten Mobile-Raster in `2096149200178418026.md`.

## Varianten je Stilfamilie

### Stilfamilie A: Präzises Produkt-UI

- Passt zu SaaS, Admin, Billing, CRM und datenreichen Workflows.
- Nutze Page, Surface, Raised und einen Hairline-Ton.
- Setze kleine Radien auf Controls und mittlere Radien auf Karten.
- Nutze Sans für Sprache und Mono nur für Daten.
- Halte Farbe semantisch: Action, Success, Warning, Danger.
- Baue Tabellen, Filter, Status und Charts als echte DOM- oder SVG-Komponenten.
- Nutze Schatten nur für Popover, Tooltip und Drag.
- Beleg: `mobbin-1.md`, `mobbin-2.md`, `mobbin-3.md`, `shadcn.md`, `2096215770783199316.md`, `2096891182701793331.md`.

### Stilfamilie B: Monochromes Datenlabor

- Passt zu Developer Tools, Observability, Infrastruktur und technischen Katalogen.
- Nutze dunkle Luminanzstufen statt bunter Karten.
- Setze Weiss als Hauptserie und Grau als Vergleich.
- Gib semantischer Farbe nur Intensität, Ziel oder Delta.
- Wiederhole eine feste Kartenanatomie.
- Nutze runde Linienenden nur, wenn die gesamte Formfamilie weich ist.
- Zeige Meta als Datenkontext, nie als Rendering-Prosa.
- Beleg: `2096175237109092642.md`, `2096175237109092642-video-1.md`, `2096499167225078020.md`, `neuform-1.md`.

### Stilfamilie C: Editoriales Foto-System

- Passt zu Architektur, Hospitality, Premium-Service und portfolioartigen Offers.
- Komponiere Text und Motiv gemeinsam.
- Lege Text in eine ruhige, kontrastreiche Bildzone.
- Verwende Caption, Projektname oder Attribution als Proof.
- Lass das Foto die Farbtemperatur liefern.
- Setze Serif nur für eine definierte Rolle oder bleibe bei leichter Sans.
- Nutze keine generischen Produktkarten über dem Bild.
- Beleg: `2095928637346472339.md`, `2096149200178418026.md`, `2095807169346334900.md`, `2096634909263646898.md`.

### Stilfamilie D: Warme Consumer- und Fintech-Boards

- Passt zu verständlichen Consumer-Apps, persönlicher Finance und Subscription-Produkten.
- Nutze warme Neutrals und einen klaren Accent.
- Wiederhole Eyebrow, Headline, Subline und Proof-Fragment.
- Setze Glas nur auf Fotos.
- Nutze Menschen und Geräte als Kontext, nicht als Ersatz für Produkt-Proof.
- Halte CTA und Status farblich getrennt, falls Daten im selben View erscheinen.
- Beleg: `2095797753305612601.md`, `2095784926717300835.md`, `2096889729337921598.md`.

### Stilfamilie E: Technisches Editorial / Blueprint

- Passt zu Studios, Creative Tools, Architektur und designnahen Developer-Angeboten.
- Nutze sichtbare Hairlines, Cut-Marks, Handles oder Schraffur als Grammatik.
- Richte Bilder exakt an Rasterlinien aus.
- Halte die Mitte ruhig; setze Beweise an Flanken oder in klaren Zellen.
- Nutze einen Accent für Marker und Action.
- Entferne jedes technische Ornament ohne Bezug zum Produktjob.
- Beleg: `2095874058697293985.md`, `2096149200178418026.md`, `gap-marcelkargul.md`, `2096953356086313312.md`, `2095565814405742911.md`.

### Stilfamilie F: Atmosphärisches Dark Material

- Passt zu Creative AI, Medienwerkzeugen und experimentellen Produkt-Teasern.
- Nutze Farbe als Licht, Kante oder Hintergrundmaterial.
- Halte Chrome monochrom und deckend.
- Begrenze Glow, Grain und Glas auf jeweils eine klar benannte Rolle.
- Platziere Pflichttext auf stabiler, deckender Fläche.
- Nutze breite Effekte nie als Ersatz für Proof.
- Beleg: `2095783930775433616.md`, `2096165490498695410.md`, `2096674796704813174.md`, `2096833304351961505.md`, `layers.md`, `2096931638118871502.md`.

### Stilfamilie G: Radikal flaches Brand-System

- Passt zu Kultur, Bildung, Editorial und klar positionierten Brands.
- Nutze wenige Vollfarben, keine Schatten und keine Glasflächen.
- Wähle kantige Geometrie oder eine einzige kompakte Radiusfamilie.
- Lass Raster, Typografie und Weissraum die Identität tragen.
- Verwende Accent nicht automatisch als Textfarbe.
- Beleg: `2096953356086313312.md`, `refero-1.md`, `2095783930775433616.md`.

### Stilfamilie H: Schrittweiser Conversion-Flow

- Passt zu Booking, Qualification, Onboarding und Checkout.
- Zeige pro Screen eine Frage und eine Handlung.
- Halte Kontext und Fortschritt sichtbar.
- Trenne Selected, Disabled, Error und Success.
- Nutze persistente Labels bei persönlichen oder zahlungsrelevanten Feldern.
- Zeige nach Erfolg Termin, Zeitzone, Kontakt und Änderungsweg.
- Beleg: `2096192737867350330.md`, `2096192737867350330-video-1.md`, `2096192737867350330-video-2.md`, `2096929195381457078.md`, `mobbin-2.md`.

## Dos

- Wähle eine Leitquelle und höchstens ergänzende Quellen für fehlende Komponenten.
  Beleg: `designmd_supply.md`.
- Schreibe vor dem Bauen eine Merkmal-Tabelle: Merkmal → Quellen → Zweck → Alternative → Risiko.
  Beleg: `prior_corpus.md`.
- Benenne pro Farbe genau eine Primärrolle.
  Beleg: `aakib-tiles.md`, `mobbin-2.md`.
- Definiere Radius nach Komponentenrolle.
  Beleg: `refero-2.md`, `shadcn.md`.
- Baue erst Wireframe, dann tausche Material und Bildwelt.
  Beleg: `2096876701775261945.md`.
- Stelle die Textzone frei.
  Beleg: `2095488681796854015.md`, `2096175830624055596.md`.
- Gib jeder Feature-Karte sichtbaren, relevanten Proof.
  Beleg: `2095784926717300835.md`.
- Verwende `figure` und `figcaption` für benannte visuelle Belege.
  Beleg: `2096149200178418026.md`.
- Nutze `dl` für Kennzahl plus Label und Quelle.
  Beleg: `2095928637346472339.md`.
- Halte Kartenserien anatomisch gleich.
  Beleg: `2096175237109092642.md`.
- Nutze tabellarische Ziffern und rechte Ausrichtung für vergleichbare Werte.
  Beleg: `2095383602431459523.md`, `2096618423983964587.md`.
- Binde Visualisierung, Legende und Summary an dieselben Daten.
  Beleg: `2095383602431459523.md`.
- Gib jedem CTA ein konkretes Objekt oder Outcome.
  Beleg: `2095928637346472339.md`.
- Verwende echte, aktive Labels über Formularfeldern.
  Beleg: `mobbin-2.md`, `mobbin-3.md`, `shadcn.md`.
- Zeige Fokus sichtbar und konsistent.
  Beleg: `shadcn.md`, `2096192737867350330-video-2.md`.
- Halte Mobile als eigene Komposition, nicht als Miniatur-Desktop.
  Beleg: `2096149200178418026.md`, `open_design.md`, `layers.md`.
- Prüfe Bild-Focalpoint und Textkontrast in jedem Breakpoint.
  Beleg: `2096149200178418026.md`, `2095807169346334900.md`.
- Entferne Deko, wenn sie weder Marke, Zustand noch Information trägt.
  Beleg: `prior_corpus.md`, `twentyfirst.md`.

## Don'ts mit konkretem Gegenbeispiel

- Kopiere keine Legende, deren Farben nicht im Chart vorkommen.
  Gegenbeispiel: Grün und Pink neben Cyan, Blau und Orange in `2095383602431459523.md`.
- Zeige keine Achse, die nicht an die Werte gebunden ist.
  Gegenbeispiel: April-Balken oberhalb des Maximum-Labels in `2095383602431459523.md`.
- Mische keine Einheiten in einem Chart.
  Gegenbeispiel: Dollar-Summe neben Enrollment-Achse in `2096215770783199316.md`.
- Zeige keinen Progress, dessen Länge dem Label widerspricht.
  Gegenbeispiel: `78.5 %` bei ungefähr `15 %` Fill in `2096215770783199316.md`; beide Werte sind dort gemessen.
- Mische keine Zahlen-Locale.
  Gegenbeispiel: `$4.802,00` neben `$80,420.50` in `2096618423983964587.md`.
- Nutze keine unbelegten Trust-Zahlen.
  Gegenbeispiel: `1000+`, `90+`, `€10m` und `1%` in `2095874058697293985.md`; Werte dort gemessen.
- Nutze keine Fake-Logos als Proof.
  Gegenbeispiel: Logoipsum-Reihe in `2095874058697293985.md`.
- Nutze keinen Stock-Team-Grid mit Fantasienamen.
  Gegenbeispiel: Team-Sektion in `2095874058697293985.md`.
- Wiederhole keine fremde Template-Copy.
  Gegenbeispiel: Finanz-Features im Kalender-Pricing in `2096292759489609818.md`.
- Wiederhole keine identische Body-Copy über Nachbarkarten.
  Gegenbeispiel: Feature-Karten in `2095784926717300835.md` und `2095874058697293985.md`.
- Nutze keine leere Glasfläche als Proof.
  Gegenbeispiel: Community-Karte in `2095784926717300835.md`.
- Nutze keine Skeleton-Balken als finalen Beweis.
  Gegenbeispiel: Integrationskarte in `2095784926717300835.md`.
- Nutze keine Deko-Meta, die Daten nur imitiert.
  Gegenbeispiel: „Corner Radius: 8px All“ in `2096175237109092642.md`.
- Schneide nicht jede Kartenbeschreibung mit Ellipsis ab.
  Gegenbeispiel: der ganze Chart-Katalog in `2096175237109092642-video-1.md`.
- Lass kein Chart-Panel leer, bis eine Reveal-Animation startet.
  Gegenbeispiel: Candlestick und leere Panels in `2096175237109092642-video-1.md`.
- Nutze keinen Sparkle als universelles Zustandsicon.
  Gegenbeispiel: identische Accordion-Icons in `2095928637346472339.md`.
- Nutze keinen gezeichneten Cursor im Live-UI.
  Gegenbeispiel: Hand-Cursor in `2095783930775433616.md`.
- Baue keinen Screenshot-Input, der bedienbar aussieht.
  Gegenbeispiel: Composer im Foto in `2095928637346472339.md`.
- Lege keine Pflichtinformation unter einen Sticky Composer.
  Gegenbeispiel: abgeschnittene Chat-Zeile in `2096165490498695410.md`.
- Schneide keine Proof-Chips am Kartenrand ab.
  Gegenbeispiel: Pioneer-Statuschips in `2095807169346334900.md`.
- Nutze kein nahezu unsichtbares CTA-Material.
  Gegenbeispiel: Waitlist-Pille `#f4efec` auf `#f1ece8` in `2095807169346334900.md`; Farben dort gemessen.
- Setze keinen kleinen Muted-Text auf Dark unter ausreichendem Kontrast.
  Gegenbeispiel: Footer-Links in `2095797753305612601.md` und Meta in `2096891182701793331.md`.
- Nutze Status nie nur über schwer unterscheidbare Farben.
  Gegenbeispiel: Lachs und Lila im Dot-Grid in `2095783930775433616.md`.
- Mische keine Icon-Stile in derselben Oberfläche.
  Gegenbeispiel: Outline oben und Solid unten in `2096499167225078020.md`.
- Quetsche Segmented Control nicht neben einen umbrechenden Kicker.
  Gegenbeispiel: „MONO CURVED WAVE“ in `2096175237109092642-video-2.md`.
- Blende Mobile-Daten nicht mit `display:none` aus.
  Gegenbeispiel: dokumentierter Saltworks-Fall in `neuform-1.md`.
- Lege Fixed-Badges nicht über Inhalte.
  Gegenbeispiel: Counter über Swatches in `designmd-me-1.md` und Badges in `designmd_supply.md`.
- Nutze keine globale Mischung aus Pillen, eckigen Buttons und grossen Kartenradien.
  Gegenbeispiel: der Formbruch in `mobbin-2.md`; die Gegenregel steht in `refero-2.md`.
- Nutze kein `min-height:100vh` nur für Drama.
  Gegenbeispiel-Regel: `prior_corpus.md`.
- Baue keine Blur-Nav als Reflex.
  Gegenbeispiel-Regel: `prior_corpus.md`.
- Nutze keinen Glow-Blob ohne Marke oder Funktion.
  Gegenbeispiel-Regel: `prior_corpus.md`, bestätigt durch den reinen Stimmungs-Hero in `2096931638118871502.md`.
- Mische nicht Violett, Dark-Glow, Dot-Grid und Pills aus verschiedenen Referenzen.
  Gegenbeispiel-Regel: `mobbin-1.md`.
- Nutze keine zweite gleichwertige CTA im selben Viewport.
  Gegenbeispiel: doppelte Actions in `2095488681796854015.md` und `2096944343487852961.md`.
- Kürze Mobile-CTA nicht bis das Verb verschwindet.
  Gegenbeispiel: „Consultation“ in `2096149200178418026.md`.
- Lass Desktop-Captions nicht auf Mobile verschwinden, wenn sie Proof tragen.
  Gegenbeispiel: Mobile-Galerie in `2096149200178418026.md`.
- Setze kein Wetter-Widget ohne echten Ortsbezug.
  Gegenbeispiel: Arcstone-Header in `2096149200178418026.md`.
- Zeige keine UI-Probe mit Tippfehlern.
  Gegenbeispiele: „Camping“ in `2095874058697293985.md`, „David..!“ in `2096889729337921598.md`, „Number of Task“ in `2096944343487852961.md`.
- Behaupte nicht „monochrom“, wenn der erste Proof farbig ist.
  Gegenbeispiel: Hero und drei Heatmaps in `2096175237109092642-video-2.md`.
- Priorisiere keine dekorative Kugel vor Checkout-Inhalt.
  Gegenbeispiel: linke Spalte in `2096929195381457078.md`.
- Nutze keine Gradient-Headline als automatische Tech-Abkürzung.
  Gegenbeispiel-Regel: `prior_corpus.md`; lokale Ausnahme nur bei klarer Stilentscheidung in `2095784926717300835.md`.

## Gilt nicht wenn

- Ein Design-System schreibt Komponenten, Tokens oder Accessibility-Zustände verbindlich vor.
  Dann gewinnt das System vor dem Corpus.
- Das Medium ist ein Poster, Video-Still oder Social-Ad.
  Dort darf Crop, Cursor oder unvollständige UI als Bildsprache dienen; kennzeichne es nicht als Live-UI.
  Beleg: `2095783930775433616.md`.
- Der ICP erwartet operative Dichte.
  Ein Admin-Dashboard braucht keine Marketing-Luft und keine Display-Headline.
  Beleg: `mobbin-1.md`, `2096215770783199316.md`.
- Der ICP erwartet Atmosphäre vor Bedienung.
  Architektur und Portfolio dürfen Foto und Caption als primären Proof nutzen.
  Beleg: `2096149200178418026.md`.
- Ein Schatten erklärt echte Elevation.
  Modal, Tooltip und Drag dürfen ihn nutzen.
  Beleg: `refero-1.md`, `2096215770783199316.md`.
- Glas ist das eigentliche Material der Produktdemonstration.
  Lege trotzdem Pflichttext auf deckende Innenflächen.
  Beleg: `2096833304351961505.md`.
- Ein Accent codiert mehrere verwandte Zustände eindeutig durch Form, Text und Position.
  Dann ist Token-Wiederverwendung sinnvoll.
  Beleg: `shadcn.md`.
- Eine Serie braucht Wiederholung für Vergleichbarkeit.
  Wiederhole Anatomie, nicht Dummy-Copy.
  Beleg: `2096175237109092642.md`.
- Ein Experiment misst bewusst nur Taste oder Stil.
  Markiere ungeprüfte Zahlen, Claims und Zustände als Demo; verkaufe sie nicht als Proof.
- Mobile ist im Quellpaket nicht sichtbar.
  Behandle jeden Breakpoint als eigene Ableitung und teste ihn, statt ihn als belegt auszugeben.
  Beleg: zahlreiche Einzelanalysen, unter anderem `2095383602431459523.md` und `2095784926717300835.md`.

## Quellen

### X- und Video-Einzelanalysen

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

### Bibliotheken, Design-Systeme und Gap-Analysen

- `../studies/design-depth/deep/aakib-tiles.md`
- `../studies/design-depth/deep/mobbin-1.md`
- `../studies/design-depth/deep/mobbin-2.md`
- `../studies/design-depth/deep/mobbin-3.md`
- `../studies/design-depth/deep/refero-1.md`
- `../studies/design-depth/deep/refero-2.md`
- `../studies/design-depth/deep/designmd-me-1.md`
- `../studies/design-depth/deep/neuform-1.md`
- `../studies/design-depth/deep/layers.md`
- `../studies/design-depth/deep/designmd_supply.md`
- `../studies/design-depth/deep/open_design.md`
- `../studies/design-depth/deep/twentyfirst.md`
- `../studies/design-depth/deep/shadcn.md`
- `../studies/design-depth/deep/prior_corpus.md`
- `../studies/design-depth/deep/gap-marcelkargul.md`
- `../studies/design-depth/deep/gap-uiux_hamad.md`
