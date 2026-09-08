<!-- Private research origin: /root/skill-workspace/skill-updates/2026-09-07-web-design-depth/research/resume/designmd-me.md; images/code remain outside the skill. -->

# designmd.me — ergänzter Quellenbericht

Quelle: https://designmd.me, aufgenommen am 07.09.2026. Root ergänzt den abgebrochenen Child-Bericht aus dessen gespeicherten Artefakten; keine erneute Netzbeschaffung. Sichtung: `../designmd_me/evidence/home-desktop.png`, `discover-desktop.png`, `stripe-desktop.png`, `anthropic-mobile-state2.png`. Raw-Exporte und generierte HTML-Vorschauen liegen im selben Ordner. Das sind verschiedene Evidenzarten.

## Oberfläche und Elementanatomie

Die dunkle Homepage ordnet die URL-Eingabe links und eine Code-/Tokenvorschau rechts an. Blau markiert die ausführbare Aktion; helle Schrift trägt die Aussage, gedämpfte Zeilen die Erklärung. Die Vorschau erklärt das Ergebnis vor dem Start. Übertragung: echtes URL-Formular mit sichtbarem Label, nachvollziehbarem Ladezustand und Ergebnisregion; `pre/code` für lesbaren Export, Copyaktion mit Rückmeldung. Der Split wird mobil zur Reihenfolge Nutzen → Eingabe → Ergebnis, nicht zu zwei zusammengedrückten Spalten.

Discover verwendet drei Spalten aus Screenshotkarten und darüber Filterchips. Screenshot, Quellenname und Zugriff gehören zusammen; Kartenbild zeigt visuelle Identität, Metadaten helfen beim Vergleich. Für die eigene Umsetzung eine Liste mit echten Links, responsive Gridspalten und Filter als Buttons mit erkennbarem Auswahlzustand verwenden. Der sichtbare aktive Filter beweist noch keine Tastaturbedienung. Eine leere Suche benötigt einen Filter-Reset und einen Text, der die Suchsituation benennt.

Die Stripe-Detailansicht hält Markenscreenshot und Tokenübersicht nebeneinander. Raw/Visual/Download sind unterschiedliche Ausgaben. Das mobile Anthropic-Bild zeigt einen verkleinerten Desktop-Markenscreenshot im Viewer. Es ist kein Beleg für die originale mobile Markenwebsite.

## Exportkonflikte und Übertragung

Gespeicherte Raw-/Previewdateien: `stripe-raw-rendered.txt`, `stripe-generated-preview.html`, `anthropic-raw-rendered.txt`, `anthropic-generated-preview.html`. Der dokumentierte Vergleich zeigt schwarze Surface im Raw und weisse Previewfläche; eine Fontliste setzt Inter vor sohne-var. Damit belegt die deklarierte Markenfont nicht die tatsächlich gerenderte Schrift. Die Behauptung eines ausschliesslichen 8er-Rasters passt nicht zu Werten wie 4/12/20. Solche Zahlen müssen nach Rolle und Ursprung klassifiziert werden.

Ein DESIGN.md-Generator ist ein Extraktionsassistent. Vor Verwendung: Originalansicht, Raw-Leitfaden und tatsächlich wirksames CSS für genau dieselbe Rolle vergleichen; Konflikte ausdrücklich entscheiden. Beispiel: `surface.page`, `surface.card`, `text.body` getrennt prüfen statt einen schwarzen globalen Background auf alle Flächen zu übertragen. Rohwert, CSSwert und gewählter Projektwert in einer Konflikttabelle festhalten. Keinen im Preview sichtbaren generischen Button als Original-Stripe-Komponente bezeichnen.

## Grenzen

Keine Original-Markenseite live bedient; kein vollständiges Katalogarchiv; keine erfolgreiche Export-Downloadrunde durch Root neu ausgeführt. Die Screenshots belegen sichtbare Anordnung, nicht Conversion, Barrierefreiheit oder Backendqualität. Kontrast, Fokus, Error-/Loadingstates und lange URLs sind Übertragungsprüfungen für ein künftiges Produkt.
