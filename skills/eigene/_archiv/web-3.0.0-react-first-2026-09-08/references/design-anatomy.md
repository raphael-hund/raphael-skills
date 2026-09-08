# Elementanatomie für Websites

Nach [design-depth.md](design-depth.md) laden, wenn aus Bildern konkrete Komponenten werden. Quellen über [Studienindex](design-depth-sources.md). Tiefe Kapitel mit Bauanleitungen und Messwerten über den [Design-Depth Router](design-depth/INDEX.md): [Spacing/Layout](design-depth/spacing-layout.md), [Farbe](design-depth/color.md), [Typografie](design-depth/typography.md), [Buttons](design-depth/buttons.md), [Cards](design-depth/cards.md), [Tabellen/Daten](design-depth/tables-data.md), [Mobile](design-depth/mobile.md). Werte unten sind **eigene Startwerte**, ausser ausdrücklich als gemessener Quellenwert bezeichnet. Immer an Marke, Schrift, Inhalt und Gerät anpassen.

## Buttons: Körper, Handlung, Zustand

Ein Button besteht aus Trefferfläche, sichtbarem Körper, Label, optionalem Icon, Kontur/Material und Fokusindikator. Erst Aktion und Gewicht festlegen: primäre Weiterführung, sekundäre Alternative, unauffälliges Werkzeug oder destruktive Aktion. Kestrel trennt Upgrade, Update, PDF und Cancel; shadcn zeigt Linkdarstellung über `buttonVariants`, ohne die Linksemantik aufzugeben.

| Teil | Konstruktion | Prüfung |
|---|---|---|
| Semantik | Navigation/Download als `a`, Zustandsänderung als `button`; `type` ausdrücklich wählen | Enter/Space entsprechend Element, kein verschachtelter interaktiver Inhalt |
| Körper | `inline-flex`, Mitte, relativer Innenabstand, `min-block-size` statt starrer Höhe | Label darf bei Übersetzung wachsen; keinen Text abschneiden |
| Label/Icon | ein zugänglicher Name; dekoratives SVG `aria-hidden`; Icon separat dimensionieren | Zwei animierte Textkopien nicht zweimal vorlesen lassen (21st Button) |
| Kontur | Border für Geometrie, Pseudoelement für Licht/Gradient | Fokus darf nicht durch `overflow:hidden` verschwinden |
| State | default/hover/focus-visible/active/loading/disabled, bei Toggle pressed | Loadingstatus hörbar, doppelte Submission verhindern, kein Hover als einzige Info |

Eigener adaptierbarer Ausgangspunkt:

```css
.action {
  display: inline-flex; align-items: center; justify-content: center;
  gap: .5em; min-block-size: 2.75rem; padding: .65em 1em;
  border: 1px solid var(--action-border); border-radius: var(--radius-control);
  color: var(--action-text); background: var(--action-bg);
  font: inherit; font-weight: 600; line-height: 1.2;
}
.action:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }
.action svg { inline-size: 1em; block-size: 1em; flex: none; }
```

2.75rem ist hier ein komfortabler Start für Touch, kein aus der Quelle gemessener Universalwert. shadcn zeigte auch 32px hohe kompakte Buttons mit 14/20 Typografie und 10px Radius; deren Kontext ist dichter als eine mobile Hauptaktion. WCAG-Zielgrösse und Abstandsausnahmen separat beurteilen. Kontrast von Text, Rand und Fokus gegen den tatsächlichen Hintergrund prüfen; weisse Schrift auf Mint ist nicht automatisch gut lesbar.

## Karten und Verschachtelung

Karte nur bei eigenständiger Einheit: Objekt, Angebot, Beleg, Werkzeug. Eine normale Textsektion braucht nicht automatisch einen Rahmen. Aussenfläche gruppiert; innenliegende Mini-UI beweist eine konkrete Funktion (Zahra Featurekarten), statt eine zweite zufällige Dekoschicht zu erzeugen.

Anatomie: Kopf mit Identität/Aktion → Hauptinhalt → optionaler Kontext → Abschlussaktion. Einheitliche Abstände entstehen aus Rollen: Kopfabstand, Zeilenabstand, Gruppenabstand. In shadcn wurden `--card-spacing` 16/12 und abhängige Radien beobachtet; nicht jeden Cardtyp auf dieselbe starre Höhe setzen. Bei konzentrischen Ecken ist innerer Radius näherungsweise äusserer Radius minus Inset; optisch prüfen und nicht negativ werden lassen.

Ganzkartenlink nur ohne konkurrierende Controls. Sonst Titel verlinken und zusätzliche Aktionen getrennt halten. Hover darf die Trefferfläche nicht vom Cursor wegschieben. Mobile Kartenreihenfolge folgt Information, nicht der Desktopposition. Rasterspans aus Beweisgewicht: ein Diagramm braucht eventuell mehr Breite als ein Kennwert, ein Testimonial mehr Höhe als ein Logo.

## Typografie und Rhythmus

Rollen vor Fontnamen: Display/Headline, Fliesstext, UIlabel, Metadaten, Datenziffern. Arcstone nutzt kleine technische Labels gegen grosse Architekturheadline; Nest kontrastiert Serif mit präziser Geometrie; Oqulus reduziert Kontraste zugunsten dichter Daten. Nicht alle gleichzeitig in eine Seite übernehmen.

Headlinebreite, Zeilenhöhe und Umbruch bewusst bestimmen; `clamp()` nur mit geprüften Zwischenbreiten. Body bleibt lesbar bei Zoom und langen deutschen Wörtern. `font-variant-numeric: tabular-nums` für wechselnde Zahlen und Tabellen; Mono nur bei technischem Inhalt oder gewählter Markenrolle. Graue Headlineteile sind weiterhin Inhalt und brauchen ausreichenden Kontrast. Letterspacing in korrekter Einheit behandeln; ein zehnfacher Exportfehler darf nicht als Markensignal landen (Oxide).

Makroabstände trennen Abschnitte und Fragen; Mikroabstände binden Label an Wert. Ein 4/8-basierter Rhythmus ist Startstruktur, keine Behauptung, dass jede Marke streng im 8er-Raster arbeitet. Optische Korrekturen und unterschiedliche Dichten zulassen und benennen. Desktopgrosszügigkeit darf mobil weder Leerstrecken noch unlesbare Miniaturen erzeugen.

## Farbe als Rollenvertrag

Definiere Page/Surface/Raised, Text/Muted/Inverse, Border, Action/ActionText, Focus, Selected, Danger/Warning/Success und Chartserien. Ein Markenorange kann Aktion sein; ein oranges Chartsegment kann Auswahl sein; beides muss nicht dieselbe Bedeutung tragen. Kestrel Lime ist Upgrade/Aktivität, Rot Kündigung. Filow demonstriert, warum Bogenfarbe und Legende aus derselben Zuordnung stammen müssen.

Nicht jeden Badge einfärben. Status zusätzlich ausschreiben; Datenserien zusätzlich durch Label/Strichform unterscheiden. Darkmode braucht eigene Flächen- und Kontrasthierarchie statt bloss invertierter Hexwerte. Semi-transparente Textflächen an hellster/dunkelster Bildstelle testen. Zielwerte WCAG AA: normaler Text 4.5:1, grosser Text 3:1, notwendige nichttextliche UIindikatoren 3:1; Logo-Ausnahmen rechtfertigen keine schwer lesbare Produktinformation.

## Medienkomposition und elementweiser Bau

Bildrolle bestimmen: atmosphärisches Motiv, echte Person/Projekt, Produktübersicht, Detailbeweis oder rein geometrische Illustration. Aakib trennt ruhige Textzone, Landschaft und Produktpreview; Recurr zeigt Hand/Telefon als Medium neben echter Erklärung; Arcstone belegt unterschiedliche mobile Focalpoints.

HTML trägt Headlines, Preise, Listen und Controls. CSS trägt Flächen, Raster, Schraffur, Konturen und einfache Verläufe. SVG trägt skalierbare Geometrie/Diagramme. Raster trägt Foto, komplexe Materialtextur und genehmigte Produktabbildung. Canvas/WebGL nur bei tatsächlicher prozeduraler oder interaktiver Notwendigkeit. Ein Browserrahmen ist CSS, ein funktionales Dashboard braucht echte Daten/UI; eine ausdrücklich illustrative Produktvorschau darf Bild sein und muss als solche erkennbar bleiben.

Für jedes Motiv Focalpoint und Safearea festhalten. `object-fit:cover` mit bewusstem `object-position`; mobile eigene Crops bei Bedarf. Scrim lokal hinter Text, nicht pauschal über das ganze Bild. Fade darf keine kaufrelevante Information oder scheinbar aktive Controls verschlucken. Referenzlogos, Kundennamen und Personen nicht als eigene Beweise übernehmen.

## Tabellen, Charts und dichte Oberflächen

Oqulus/Lurni/Aloxi zeigen den Nutzen von ausgerichteten Spalten, klaren Filtern und ruhigen Zeilen. Echte `table`, `caption`, `th scope` verwenden; Zahlen rechts, Bezeichnungen links, Einheiten sichtbar. Sortierung hat Status, Pagination Zähler, Auswahl Namen. Mobile kritische Spalten erhalten, Details zugänglich auslagern oder benannten horizontalen Scrollbereich anbieten.

Diagrammform nach Frage: Zeit→Linie, Kategorienvergleich→Balken, Anteil→nur bei sinnvoller Gesamtheit, Fluss→Sankey nur bei erhaltener Menge. SVG und Legende aus einer Datenquelle; Label, Tooltip und Tabellenalternative konsistent. Währungen ohne Wechselkurs nicht summieren. Unterschiedliche Einheiten wie ROAS und Spend brauchen erklärte getrennte Skalen oder getrennte Charts. Prozentbalken aus Wert/Nenner berechnen: 78.5% darf nicht als kurzer roter Restbalken erscheinen, sofern nicht genau dieser Rest bezeichnet wird.

## Responsive Abnahme

Prüfe schmale Ansicht, Inhaltsbruchstellen und grosse Ansicht anhand echter längster Inhalte; Breakpoints folgen dem Überlauf, nicht dem Screenshotmodell. Gridkinder `min-inline-size:0`, Text `overflow-wrap` wo nötig; keine pauschalen Ellipsen auf wichtige Werte. Panoramaslices sind keine drei mobilen Screens. Navigation, Filter, Rechnung und CTA müssen auch bei 200% Zoom erreichbar sein. Gute mobile Gestaltung komponiert neu: Arcstone setzt Projektpreview unter den Hero statt alles proportional zu schrumpfen.

## Kernregeln aus den tiefen Kapiteln (2.2.0)

Je Kapitel die zehn wichtigsten Regeln. Messwerte stehen mit Analyse-Datei im Kapitel; hier nur die Regel. Bauanleitungen, Stilfamilien-Varianten und Gegenbeispiele im jeweiligen Kapitel.

### Spacing und Layout → [design-depth/spacing-layout.md](design-depth/spacing-layout.md)

1. Sektionsfolge aus der Verkaufslogik: Hook → Problem → Mechanismus → Proof → Offer → Einwand → CTA; jede Sektion genau ein Job.
2. Container-Logik zuerst wählen: fester Max-Container (1100–1440 px), prozentual (76–77 %) oder flexible Ränder mit Anschnitt; Header, Hero, Galerie und Footer an derselben Kante.
3. Gleiche Spalten nur für gleichartige Daten; ungleiche Spans nach Informationsgewicht (40/60 Copy+Proof, 5/7 Stepper+Shot, 3/2 Daten+Feed).
4. Bento ohne Leerzellen: Zellenzahl = Inhaltszahl.
5. Ausrichtungsachse pro Sektion entscheiden; Karteninhalt links, auch unter zentriertem Sektionskopf. Split-Header nur bei zwei eigenständigen Rollen.
6. Hero-Muster benennen: zentrierter Proof-Stack, asymmetrischer Split, Diagonale, Beweis-Dreieck oder Foto-Raster; CTA-Zeile frei von Effekten.
7. Lokale Spacing-Skala mit wenigen Stufen; Marketing-Sektionen 80–120 px, datenreiche Screens 20–24 px Gap.
8. Kopf → Inhalt grösser als Abstände innerhalb der Karte; Headline und Subline enger als Subline und Proof. Keine einzelne `section > * + *`-Regel.
9. Sektionstrennung mit einer Materiallogik: Whitespace + 1 px Linie, abgerundete Boards, ein Sheet mit Spaltentrennern oder Flächenkontrast; nicht mischen.
10. Responsive als Re-Komposition: Katalog 3 → 2 → 1, semantische Reihenfolge erhalten, `100dvh`, Platz für fixe Leisten reservieren.

### Farbe → [design-depth/color.md](design-depth/color.md)

1. Acht Pflichtrollen: Page, Surface, Raised, Text, Muted, Border, Action, Accent; Komponenten referenzieren nur Rollen.
2. Page ist nie reines Schwarz oder Weiss.
3. Tiefe aus drei Luminanzstufen plus 1 px Border, nicht aus Schatten.
4. Genau eine Aktionsfarbe pro Seite; Schwarz oder Weiss darf diese Aktionsfarbe sein.
5. Datenfarbe ist nie Aktionsfarbe; Charts monochrom staffeln oder einen Hue als Skala nutzen.
6. Buntfarbe trägt Bedeutung (Delta, Status), sonst Grau.
7. Muted in zwei Stufen, beide ≥ 4.5:1 auf Page; Muted als Alpha des Ink auf Dunkel, Hex-Grau auf Hell.
8. Border als Alpha des Ink, ein Ton pro Seite; Raised 3–4 % unter Surface, nie Mittelgrau.
9. Warm und Kalt nicht mischen; pro Sektion eine Temperatur. Farbe darf aus dem Motiv kommen, UI bleibt dann grau.
10. Akzent in zwei Dosen: Vollton für Punkte und Marker, Tint für Flächen; Text nur in der dunkleren Stufe.

### Typografie → [design-depth/typography.md](design-depth/typography.md)

1. Drei Rollen-Systeme: eine Sans für alles; Sans + Serif-Italic-Akzentwort; Sans + Mono für Meta. Nie mehr.
2. Display-Gewicht 400–600, kein Bold-Reflex; Tracking −0.01 bis −0.04 em; Zeilenhöhe 0.98–1.15.
3. Headline/Body-Verhältnis: Marketing 2.6–5.5×, Produkt-UI 1.2–1.7×.
4. Farbliche Abstufung in Headlines nur an einer semantischen Einheit; ein Grau pro Headline mit geprüftem Kontrast.
5. Eyebrow 11–13 px, Uppercase, Tracking +0.08 bis +0.18 em, gedämpft; höchstens eine Eyebrow pro drei Sektionen.
6. Hierarchie über Grösse und Farbe, nicht über Gewicht; Meta-Ebenen kleiner und grauer.
7. Body-Zeilenhöhe 1.25–1.7, Zeilenlänge in `ch` begrenzen (Hero-Body ≤ 60ch).
8. Headline-Umbruch manuell nach Sinn-Einheiten oder `text-wrap: balance`; harte `<br>` fliegen mobil raus.
9. Tabellarische Ziffern für KPIs, Beträge, Tabellen; grosse Zahl und kleine Einheit auf einer Baseline; Fine Print 0.6–0.65× Body, nie unter 13 px für Inhalt.
10. Fonts selbst hosten mit `font-display: swap`; keinen vermuteten Fontnamen aus einem Screenshot übernehmen.

### Buttons → [design-depth/buttons.md](design-depth/buttons.md)

1. Ein Primär-CTA pro Viewport; Hierarchie über Luminanz oder Fläche, nicht über zweite Farbe.
2. Sekundär ist Ghost, Text oder Tonfläche, nie eine zweite Vollfläche.
3. Höhe: Marketing 40–56 px, Produkt-UI 28–36 px, Nav kleiner als Hero; alle Buttons einer Seite teilen Höhe und Radius-Familie.
4. Radius: eine Familie pro Seite (Pille, kompakt gerundet, Radius 0, Chamfer), nie gemischt.
5. Highlight-Kante innen (1 px Inset), Glow nur farbig und nur am Primär; kein Glow zur Trennung von gleichfarbigem Grund.
6. Anatomie: Label + Suffix-Icon; Icon-Tile oder Orb rechts innen als Signatur, nie zwei Icons.
7. Zustände: Disabled als eigener Grauwert (keine Opacity), Hover als Tonwert, Focus als Ring; Pending hält Breite und Namen.
8. Icon-Buttons quadratisch zur Buttonhöhe, Kreis oder Radius 8–12, zugänglicher Name.
9. Split-Buttons und Segmented Controls: Track eine Stufe dunkler, aktives Segment weiss oder Aktionsfarbe, 2–5 px Inset.
10. Pills, Chips, Badges, Tags: Status nie nur über Farbe; Badge ist kein Button.

### Cards → [design-depth/cards.md](design-depth/cards.md)

1. Eine Karte trennt sich vom Grund durch genau ein Mittel: Tonstufe, Hairline oder Schatten.
2. Tonal-Karte ohne Border nur bei ausreichendem Luma-Abstand; Border-Karte Dark 6–10 % Weiss, Light #E5–#EC.
3. Schatten nur, wenn die Karte über Material schwebt; Schatten im Page-Hue tönen.
4. Glas ist Hülle, nie Datenfläche; innen deckende Flächen.
5. Innenradius = Aussenradius − Inset; Radius wächst mit Kartengrösse; Familie schriftlich festlegen. Radius 0 ist eine Familie.
6. Karte nur mit echten Slots (Header/Content/Footer), nie um jeden Absatz; bei Dichte > 7 Elementen Linien statt Karten.
7. Feste Slot-Reihenfolge je Kartentyp (Chart, KPI, Proof-Panel, Testimonial, Pricing).
8. Divider gruppieren Zeilen, letzte Zeile ohne Linie; Divider-Farbe = Border oder eine Stufe heller; nie oben und unten auf jeder Zeile.
9. Bento nach Informationsgewicht, keine Leerzelle, eine Akzentkarte pro Sektion; Selektion = Vollflächen-Inversion.
10. Gap 16–24 px, Innenpadding 16–24 (Marketing 32–50); angeschnittene Grids brauchen Scroll oder Fade.

### Tabellen und Daten → [design-depth/tables-data.md](design-depth/tables-data.md)

1. Erst die Aufgabe: KPI-Kachel für einen Wert, Liste zum Erkennen, Tabelle zum Vergleichen, `dl` für Eigenschaften, Chart nur wenn Form schneller lesbar ist.
2. Namen und Daten links, Zahlen rechts, tabellarische Ziffern; Schlüsselspalte breiter als Status, Datum, Betrag.
3. Tiefe aus Page/Surface/Raised/Border; Divider gezielt, kein Zebra bei klarem Raster.
4. Selektion mit mindestens zwei Signalen; Status als Wort plus Punkt oder Badge.
5. Dieselbe Signalfarbe nie für zwei Taxonomien; Richtung zusätzlich zum Vorzeichen.
6. Suche und Filter direkt über den Daten, gleiche Höhe/Border/Radius, Selects mit Chevron, Placeholder heller als Wert.
7. Sortierung als Button im `th`, `aria-sort` nur auf der aktiven Spalte; Filter im URL-State, wenn teilbar.
8. Einheit am Wert oder im Kopf; Delta immer mit Bezugszeitraum; `time`/`datetime`; relative und absolute Zeit nicht ungeklärt mischen.
9. Chart, Legende, Achse und Tooltip aus demselben Datenobjekt; getrennte Skalen für getrennte Einheiten; Zeitpunkte proportional; Ring-Charts nicht über 100 %.
10. KPI-Kacheln: ein Hauptwert, Vergleichswert oder Zeitraum, keine leere Höhe, Akzent nur für relevante Veränderung.

### Mobile → [design-depth/mobile.md](design-depth/mobile.md)

1. Desktop-Split wird zur vertikalen Folge Claim → Proof → Aktion; Reihenfolge per `order` explizit setzen.
2. Ragged-Desktop-Rhythmus bekommt ein eigenes Mobile-Raster; Anatomie bleibt, Dichte sinkt.
3. Dekoration fliegt zuerst; Daten nie still per `display:none` löschen.
4. 44 px ist die Touch-Untergrenze; Buttons mobil vollbreit und gestapelt.
5. Inputs 16 px Schrift auf Mobile, sonst zoomt iOS.
6. Nav schrumpft auf Logo, ein CTA, Burger; Anker unter Sticky-Header brauchen `scroll-margin-top`.
7. Fixe Bottom-Elemente rechnen mit Safe-Area und Body-Padding; ein Sticky-CTA ersetzt die Header-Aktion.
8. Kein Einspalten-Dogma: kleine Karten dürfen zweispaltig bleiben; Tabellen als Overflow-Region mit sticky erster Spalte.
9. Breiten fluid (`min()`, `calc()`), `100dvh` statt `100vh`, `flex-wrap` von Anfang an.
10. H1 30–48 px ohne harte `<br>`; Hero-Textblock höchstens ein Drittel des Viewports.
