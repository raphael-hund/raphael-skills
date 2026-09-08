# Design aus Referenzen ableiten

Einstieg für explizites Referenzlernen, detaillierte Bildanalyse und die Übertragung von Inspirationsseiten in einen eigenen HTML-first Entwurf. Ergänzt [service-learning.md](service-learning.md), [image-to-code.md](image-to-code.md) und [design-contract.md](design-contract.md). Für konkrete Konstruktion [Anatomie](design-anatomy.md), [Effekte](design-effects.md), [UX-Entscheidungen](design-ux-decisions.md) nach Bedarf laden. Für Bauanleitungen, Messwerte und Stilfamilien den [Design-Depth Router](design-depth/INDEX.md) mit vierzehn tiefen Kapiteln nutzen; Einzelanalysen unter [studies/design-depth/deep/](studies/design-depth/deep/).

## 1. Die richtige Quelle für die Entscheidung

| Frage | Quelle und belegte Auswahl | Was daraus folgt |
|---|---|---|
| Wie organisieren reale Produkte Beweise, Preise und Formulare? | [Mobbin](https://mobbin.com), 12 Sektionen, Apollo 7 Screens, Zoom 4 Screens; [Refero](https://refero.design/search), vier Styles/neun Screens inkl. Acne-Dreischritt | Layout-/Statebelege; archivierte Bilder beweisen keinen funktionierenden Flow |
| Wie bindet eine Marke Bild, Schrift und UI zusammen? | Refero CLOU, Gumroad, Oxide, Attio; X Arcstone, Nest, Aakib | Ganze Kompositionsgrammatik untersuchen, nicht Lieblingsdetails mitteln |
| Wie zerlege ich einen Effekt? | [GetLayers](https://getlayers.ai), Vesper/Soffit; [Neuform](https://neuform.ai), Systema/SALTWORKS | Preview, wirklicher Source und Inspector können unterschiedliche Dinge zeigen |
| Wie baue ich eine Komponente? | [shadcn/ui](https://ui.shadcn.com), [21st.dev](https://21st.dev) | Semantik, States, Imports, Cleanup und Lizenz separat prüfen |
| Wie komme ich zu DESIGN.md? | [designmd.supply](https://designmd.supply), [designmd.me](https://designmd.me), [OpenDesign](https://open-design.ai) | Extraktion als Kandidat; Screenshot, Preview und CSS gemeinsam abgleichen |
| Wie erkenne ich austauschbare Wiederholung? | [Unslop](https://github.com/mshumer/unslop), [Taste](https://github.com/Leonxlnx/taste-skill) | Merkmale zählen und ihren Zweck prüfen; keine pauschalen Schrift-/Layoutverbote |

Der datierte [Studienindex](design-depth-sources.md) erschliesst die Einzelberichte und privaten Bildbelege. Diese Auswahl ist kein vollständiges Archiv der Plattformen. Eine frühere Zugangssperre ist keine zeitlose Produkteigenschaft; verfügbare Verbindungen bei neuem Auftrag tatsächlich entdecken.

## 2. Evidenz vor Interpretation

Jede Quelle erhält URL, Abrufdatum, Originaldatei, Medientyp, Viewport soweit bekannt, sichtbaren Zustand und Sichtungsumfang. Bei X zwischen eindeutiger Post-ID, Anhängen und byte-eindeutigen Motiven unterscheiden. Panorama-Slices gehören zusammen; ein Detailcrop ist kein zweites unabhängiges Design. Ein Monitor-Mockup ist Präsentation, kein Layoutbestandteil. Vollseitenboards dürfen mehrere Seitenabschnitte nebeneinander montieren.

Bilder tatsächlich öffnen. Lange Fullpages zuerst als Gesamtrhythmus, danach in lesbaren Ausschnitten bei Originalbreite mit Überlappung ansehen. Kleine Labels unbestätigt lassen, wenn sie nicht lesbar sind. Videos mit Dauer, Sampling, Kontaktbögen und entscheidenden grossen Frames dokumentieren; Übergänge, Audio und Backend nur behaupten, wenn sie wirklich geprüft wurden.

Kennzeichne jede Aussage:

- **Beobachtet:** sichtbarer Aufbau/Zustand im geöffneten Bild oder Browser.
- **Gemessen:** DOM/CSS/Pixel/Timing mit Messweg, Viewport und Einheit.
- **Quellenbehauptung:** Posttext, Generatorleitfaden, Inspector oder Produktversprechen.
- **Eigene Ableitung:** empfohlene Bauweise oder plausible Erklärung, noch keine Originaltechnik.

„Wirkt wie Glas“ erlaubt CSS-Glas als Umsetzungsvorschlag; es beweist weder `backdrop-filter` noch WebGL. Ein stiller Kartenfächer beweist keine Hoverbewegung. Eine Erfolgsansicht beweist keinen erfolgreichen Serverwrite. Lizenzen und Nutzungsrechte gelten unabhängig von der technischen Downloadbarkeit.

## 3. Elementkarte statt Adjektivliste

Für jedes relevante Element eine Zeile/kurze Karte ausfüllen:

`Quelle + Ausschnitt → Besucheraufgabe → Anatomie → Typorolle → Flächen/Farbe → Abstände/Alignment → States → Medium/Primitive → responsive Regel → Risiko → Übernahmeentscheidung`.

Beispiel Kestrel Billing: aktueller Plan und Nutzung erklären Upgrade; dunkle Gruppe mit Label/Wert, Limeaktion, neutrales Update, rotes Cancel; `dl`, `progress` und echte Buttons/Links; Nutzung aus demselben Datensatz; mobil Plan vor Historie, Rechnungsdetails erreichbar; keine fiktiven Limits. Der Wert liegt in der Entscheidungshierarchie, nicht im Kopieren einer Limetönung.

Erst die Gesamtordnung bestimmen: Abschnittsjob, dominante Masse, Text-/Bildanteil, Dichte, Blickführung. Danach Mikrodetails: Baselines, Innenabstände, Ränder, Radien, Icongewicht, optische Mitte. Abschliessend Zustände und mobile Rekombination. Keine präzisen Tokens erfinden, wo nur ein Screenshot vorliegt; Schätzwerte als Startwerte deklarieren.

## 4. Konfliktgate für exportierte Systeme

Bei DESIGN.md-Generatoren und Komponentenbibliotheken eine Tabelle führen: Rolle | Screenshot | Source/CSS | Leitfaden/Inspector | Projektentscheidung | Nachprüfung.

Belegte Konflikte: designmd.supply leitet DESIGN.md und CSS separat ab; der Linear-Export ist unvollständig. designmd.me zeigt Raw-/Preview-Surfaceabweichungen. OpenDesign Atelier kombiniert widersprüchliche Font-/Palettenangaben. Neuform Systema behauptet 160px Headline, Source verwendet responsive 36/48/60; SALTWORKS ist Canvas2D. Refero Attio-Text fordert Serif trotz sichtbarer Sans; Oxide-Angaben widersprechen sich bei Radius und Tracking. Diese Quellen nicht zu einem vermeintlich exakten Tokensystem zusammenrechnen.

Für den eigenen Bau eine kanonische Tokenquelle wählen, semantische Rollen benennen und DESIGN.md daraus abgleichen. Screenshots sind Gestaltungsbelege, exportierte Zahlen Hypothesen bis zur Prüfung. Webpreview einer Marke kann generisches Mockup sein (OpenDesign), eine Video-Vorschau (Vesper) oder eine skalierte Desktopabbildung (designmd.me mobil).

## 5. Gemeinsamkeiten ohne Durchschnittsdesign

Im Corpus wiederholen sich ruhige Textzonen vor reichen Bildern, getrennte Produktbeweise, konsistente innere Kartenanatomien und akzentuierte Entscheidungen. Die Ausführung unterscheidet sich: Arcstone lebt von Architektur/Focalpoints, Nest von geometrischer Druckgrafik, Oqulus von Tabellendichte, Kestrel von Handlungsrollen, Gumroad von spielerischen Konturen. Eine Seite soll eine zusammenhängende dieser Logiken verfolgen, sofern der Brief sie trägt.

Für eine Häufigkeitsbehauptung Merkmal, konkrete IDs, n/N und Zähleinheit notieren. Duplikate, Panoramen und Bildvarianten nicht als unabhängige Stimmen aufblasen. Keine Prozentwerte aus einer unsystematischen Favoritenliste. Unslop als Diagnose anwenden: wiederkehrendes Merkmal → Zweck im aktuellen Brief → brauchbare Alternative bei fehlendem Zweck. Inter, zentrierter Hero, drei Tarife und FAQ sind nicht automatisch schlecht. Falsche Copy, erfundene Beweise und unbedienbare Controls bleiben Fehler, auch in einem schönen Referenzbild.

## 6. Abnahme der Übertragung

Vergleiche Referenz und eigene Umsetzung bei gleicher Rolle und sinnvoll vergleichbaren Viewports. Prüfe Hierarchie, Dichte, Bildfokus, Lesbarkeit und jedes wichtige Statepaar. Ein gewählter Stil muss auch lange Inhalte, Fehler, leere Daten, mobile Umordnung und reduced motion tragen. Speichere verworfene Details mit Grund: z.B. kontrastarme Mintaktion (Soffit), unlesbarer OFF+BRAND-Frame (Mobbin), falsche Produktnamen (X Nexus/Tasklify), inkonsistente Chartlegenden (Filow). Das verhindert, dass dieselbe Schwäche beim nächsten Abruf wieder als Vorbild auftaucht.

## 7. Kohärenz schlägt Dekoration (Kernregeln, 2.2.0)

Aus [design-depth/commonalities-dos-donts.md](design-depth/commonalities-dos-donts.md), dem Kapitel über alle 54 Einzelanalysen mit acht Stilfamilien (präzises Produkt-UI, monochromes Datenlabor, editoriales Foto-System, warme Consumer-/Fintech-Boards, technisches Editorial/Blueprint, atmosphärisches Dark Material, radikal flaches Brand-System, schrittweiser Conversion-Flow). Die zehn wichtigsten Regeln:

1. Erst Skelett, dann Haut: Informationsfolge vor Farben und Effekten; pro Sektion ein Job; Proof folgt direkt auf das Versprechen.
2. Serien aus einer festen Anatomie; Grid-Spans nach Informationsgewicht, nicht aus Bento-Gewohnheit; Kontext in Funktionsflows sichtbar halten.
3. Tiefe primär mit Flächenstufen und Hairlines; Schatten nur bei echtem Schweben; Glas nur auf Bild oder bewegtem Material mit deckender Textebene; Grain nie unter Pflichttext; ein sichtbares Raster braucht einen Zweck.
4. Ein Signalwert pro Seite; Marketing-Action und Produktdaten trennen; Chart-Farbe codiert Bedeutung; Chart, Legende, Achse und Tooltip aus demselben Datenobjekt; Status mit zweiter Codierung.
5. Maximal zwei Schriftregister mit festen Rollen; Display eng und ruhig, wenn Bild oder Layout laut ist; Hierarchie auf einer Achse; Mono nur für Meta; Zahlen rechts und tabellarisch; Microcopy imitiert keine Funktion.
6. Form ist System: Radius nach Komponentenrolle, eine Formfamilie (kantig, kompakt gerundet, weich gerundet), Pillen nicht als globale Default-Form, ein Icon-Duktus, interaktiv aussehende UI entweder bedienbar oder klar dekorativ.
7. Zustand und Motion erklären etwas: Auswahl, Fortschritt, Erfolg und Action unterscheiden; Disabled als Material, nicht als Opacity; Daten nur beim Eintritt oder bei Änderung animieren; Reduced Motion respektieren; Layout vor Zustandswechseln reservieren.
8. Proof belastbar: Rolle, Zeitraum, Einheit jeder Kennzahl; stimmige Rechnung vor dem CTA; Logos, Namen, Ratings nur mit realer Quelle; Projektbilder mit `figure`/`figcaption`; Daten über alle Proof-Flächen konsistent; jede Copy geprüft.
9. Anti-Slop: Verbote sind Default-Warnungen, kein Dogma. Zuerst wiederholte funktionslose Signaturen entfernen; ein gebanntes Primitive (Grain, Grid, Gradient, Pille, Wiederholung) bleibt nur mit belegtem Job. Slop mechanisch und semantisch prüfen.
10. Das Offer gegen seine visuelle Sprache prüfen: Eine Einzelquelle beweist eine lokale Stilentscheidung, keine universelle Wahrheit; Stilfamilie wählen und konsequent durchziehen, statt Lieblingsdetails zu mitteln.

Vorrangregeln bei Widersprüchen zwischen Modulen stehen im [Router](design-depth/INDEX.md#vorrangregeln-bei-widerspruch).
