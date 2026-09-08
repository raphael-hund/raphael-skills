# EKD — Energiekonzepte Deutschland — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Grundwerte (Pixelmessung mit Pillow auf den PNG, nicht geschätzt):
Akzent-Orange des Header-CTA `#f09122` (`home-desktop-00-fold.png` bei 1316/47).
Hero-CTA über dem abgedunkelten Foto misst an der abgetasteten Stelle `#a15b09` —
die Fläche liegt unter dem dunklen Foto-Wash, der Grundton ist derselbe Orange.
Eyebrow-Zeile und Grundfläche im Fold: dunkles Foto, Grundwert an einer typischen
Stelle `#282829` (700/700), Header-Fläche über dem Foto `#313132` (200/187) —
der Header ist im Fold transparent auf das Foto gelegt, nicht weiß hinterlegt.
Weiße Kartenfläche `#ffffff` (`home-desktop-00-fold.png` bei 300/250 im
Karten-Anschnitt). Warmgraue Sekundärfläche `#edecea` (`home-desktop-16-y11250.png`,
über 20/400, 720/600 und 720/700 identisch gemessen). Orangefläche der
Illustrations-Plinthe `#f2b159` an der hellen Kante (`home-desktop-03-y1500.png`
bei 720/400). Mobile-Fold-Grund `#1f1d1e` / `#1c1918` (`home-mobile-00-fold.png`) —
ebenfalls Foto mit dunklem Wash. Alles Übrige unten ist als Schätzung gekennzeichnet.

Kein Cookie-Overlay und kein Chat-Widget in den gelesenen Shots. Ein kleiner runder
Scroll-nach-oben-Button (heller Kreis, Chevron nach oben) liegt als fixes Overlay
unten rechts in praktisch jedem Desktop-Slice; er ist kein Sektionselement und wird
unten nicht wiederholt erwähnt.

Hinweis zur Capture: `shots/manifest.json` ist im Ordner **nicht vorhanden**
(Basis-URL und Routen konnten daher nicht aus dem Manifest gelesen werden). Die
fünf Routen unten sind aus den Dateinamen-Präfixen abgeleitet: `home`,
`solaranlage__`, `waermepumpe__`, `unternehmen__`, `kundenerfahrungen__`.

## Seite: /

### 01 — Header / Navigationsleiste [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Eine Zeile, sehr breit ausgenutzt — Logo ganz links bei ca. 28 px,
  CTA-Rechteck ganz rechts bis ca. 1412 px. Der Header ist also nicht in einen schmalen
  Content-Container gesperrt, sondern läuft fast randlos. Reihenfolge: Logo, dann sechs
  Nav-Punkte als linksbündige Gruppe direkt nach dem Logo (Energiesystem, Produkte ⌄,
  Ratgeber ⌄, PV-Großanlagen, Kundenerfahrungen, Über uns), dann eine deutliche Lücke,
  dann der Text-Link „Kundenportal", ganz rechts der gefüllte CTA. Zwei der Nav-Punkte
  tragen ein kleines Chevron nach unten als Dropdown-Marker. Im Fold liegt die Leiste
  transparent über dem Hero-Foto (gemessen `#313132` bei 200/187, also Fotoflächenwert,
  keine weiße Leiste). Beim Scrollen wird sie weiß und sticky — `home-desktop-17-y11773.png`
  zeigt sie oben mit weißem Grund und dunklen Labels über der warmgrauen Sektion.
- Buttons/Komponenten: Genau ein Button in der Leiste, „Ersparnis berechnen". Kein Pill,
  sondern ein **Rechteck mit kleinem Radius** (ca. 4–5 px, geschätzt; sichtbar leicht
  gebrochene Ecken), gefüllt `#f09122` (gemessen), Label weiß/sehr hell und halbfett,
  kein Icon, keine Kontur. Höhe ca. 48 px, Breite ca. 190 px (geschätzt). „Kundenportal"
  ist reiner Text ohne Kasten und ohne Unterstreichung — eine sekundäre Stufe zwischen
  Nav und CTA. Die Chevrons sind dünne Linien-Winkel, kein gefülltes Dreieck.
- Typo: Nav-Labels Grotesk, Medium/Semibold, ca. 15–16 px, gemischte Schreibweise, kein
  Caps, kein sichtbares Letterspacing (geschätzt). Über dem Foto sind alle Labels weiß;
  im gescrollten Zustand dunkel. Das Logo ist eine zweizeilige Wortmarke
  „Energiekonzepte / Deutschland" links neben einem orangen Sonnen-Signet aus
  abgesetzten Strahlen-Balken — Bildmarke plus Wortmarke, nicht nur Text.
- Farbe/Fläche: Über dem Fold komplett transparent, alles Weiß bis auf die eine orange
  Fläche. Kein Schatten, keine Trennlinie.
- Abstände/Rhythmus: Leistenhöhe ca. 94 px im Fold (CTA vertikal zentriert bei y≈47),
  zwischen den Nav-Labels ca. 32–40 px, deutlich größere Lücke (ca. 80 px) zwischen
  „Über uns" und „Kundenportal" — die Lücke trennt Navigation von Konto/Aktion.
- Mobil: radikal reduziert (`home-mobile-00-fold.png`). Logo links, rechts das Wort
  „Menu" als Text plus ein Burger-Icon aus zwei ungleich langen Strichen (oberer lang,
  unterer kürzer) daneben. Der orange CTA fällt aus der Leiste weg und existiert nur
  noch als Hero-Button. Leistenhöhe ca. 50 px.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA

### 02 — Hero, Foto vollflächig mit linker Textspalte [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollflächiges Foto über die ganze Breite und Fold-Höhe, Text in einer
  linksbündigen Spalte ab ca. 140 px, die nur etwa die halbe Breite belegt. Rechts unten
  im Foto sitzt der Bewertungs-Proof als **rechtsbündiger Textblock**, ohne Karte, ohne
  Kasten — er steht direkt auf dem Foto. Der Hero ist unten nicht sauber abgeschnitten:
  eine große weiße Fläche mit deutlicher Rundung an den oberen Ecken (Radius ca. 20 px,
  geschätzt) schiebt sich von unten ins Bild und überlappt das Foto ab ca. y=725. In
  dieser weißen Fläche stecken bereits die ersten Karten der Folgesektion angeschnitten —
  eine bewusste Überlappung statt harter Sektionskante.
- Buttons/Komponenten: Genau ein CTA im Fold, „Kostenlose Beratung". Wieder ein
  **Rechteck mit kleinem Radius** (ca. 4–5 px, geschätzt), gefüllt orange, Label dunkel
  bis schwarz statt weiß — anders als der Header-CTA, dessen Label hell ist. Kein Icon.
  Höhe ca. 58 px, also spürbar größer als der Header-Button. Der Bewertungsblock ist
  kein Widget und keine Karte: fünf Sterne in einer Zeile (vier gefüllt orange/gold,
  der fünfte nur als Outline), darunter drei Textzeilen unterschiedlicher Stärke.
- Typo: Dreistufig plus Proof. Eyebrow eine einzelne orange Zeile, ca. 17 px, Regular,
  **keine Caps, kein Letterspacing, keine Pille** — nur farbiger Fließtext, das ist die
  Signatur der Site. H1 sehr groß (ca. 66 px), Grotesk, Regular bis Medium (auffällig
  *nicht* Bold), weiß, drei Zeilen, Zeilenabstand großzügig (ca. 92 px Zeilensprung).
  Verhältnis H1 zu Eyebrow rund 3,9:1 (geschätzt). Der Proof-Block staffelt drei
  Größen: Label ca. 16 px Regular, Kernaussage ca. 17 px Bold, Fußzeile Regular.
  Keine Serif auf der Seite.
- Farbe/Fläche: Dunkles Foto mit gleichmäßigem Wash über die ganze Fläche (gemessen
  `#282829` an einer typischen Stelle) — nicht nur ein Verlauf links. Der Akzent sitzt
  in exakt drei Punkten: Eyebrow-Zeile, CTA-Fläche, Sterne. Harter Hell/Dunkel-Wechsel
  nach unten zur weißen Karten-Fläche.
- Abstände/Rhythmus: Ca. 140 px von der Leiste bis zur Eyebrow, ca. 40 px Eyebrow zu H1,
  ca. 60 px von der H1-Unterkante zum CTA. Links ca. 140 px Rand. Sehr luftig, der
  Textblock nimmt weniger als die Hälfte der Höhe ein.
- Mobil: gleiches Muster, **anderes Motiv** (`home-mobile-00-fold.png`) — statt der
  Wärmepumpe am Haus ein Familien-Standbild von hinten auf einem Gartenweg. Aufbau
  identisch gestapelt: Eyebrow orange, H1 dreizeilig bei ca. 30 px, oranger Rechteck-CTA
  links, Proof-Block **rechtsbündig weiter unten im Foto** statt rechts unten am
  Fold-Rand. Das Foto endet hier mit harter, gerader Kante — die gerundete
  Überlappungs-Fläche des Desktops fehlt mobil; danach beginnt direkt die helle
  Himmel-Illustration.
- Pattern: `P-HERO-PHOTO`

### 03 — Vorteils-Kartenraster, ungleiche Kachelbreiten [home-desktop-02-y750.png | -]
- Anordnung: Zwei Reihen weißer Karten auf weißem Grund, aber **nicht als gleichmäßiges
  Drittel-Raster**. Reihe 1: schmale Karte links (ca. 275 px breit), sehr breite Karte
  Mitte (ca. 570 px), schmale Karte rechts. Reihe 2: zwei Karten in etwa 55/45. Die
  Karten sind unterschiedlich hoch und unterschiedlich breit — ein bewusst asymmetrisches
  Bento-Raster statt Card-Soup. Die rechte Karte der ersten Reihe ist am rechten Rand
  angeschnitten. Inhalt in den Karten wechselt die Reihenfolge: mal Titel oben und Bild
  darunter (links), mal Bild oben und Titel darunter (rechts), mal nur Titel plus
  Fließtext (Mitte).
- Buttons/Komponenten: **Keine Buttons in dieser gesamten Sektion** — die Karten sind
  reine Informationsflächen. Karten: weiße Fläche auf weißem Grund, Radius ca. 8 px
  (geschätzt), abgesetzt nur durch einen sehr weichen, breiten Schatten, keine Kontur.
  Die Bilder in den Karten sind freigestellte Produktrenderings (Speicher, Phone-Mockup)
  bzw. ein Award-Siegel in Gold als eckige, gefaltete Grafik.
- Typo: Zwei Stufen. Karten-Titel als große H2-artige Zeilen, ca. 40 px (Mitte:
  „Maximale Kostenersparnis."), Regular/Medium, in der linken Karte deutlich kleiner
  (ca. 22 px) — die Titelgröße richtet sich nach der Kartenbreite, nicht nach der
  Hierarchie. Fließtext ca. 16 px Regular in mittlerem Grau. Auffällig: die
  „Smart"-Karte setzt ein einzelnes großes Wort (ca. 38 px) über eine kleine Zeile.
- Farbe/Fläche: Weiß auf Weiß, Trennung ausschließlich über Schatten. **Kein Orange in
  dieser Sektion** — der Akzent pausiert vollständig, das ist die ruhigste Fläche der
  Seite.
- Abstände/Rhythmus: Karten-Innenabstand ca. 25–35 px, Lücke zwischen Karten ca. 22 px,
  danach ca. 130 px Luft bis zur nächsten Sektion. Sehr dicht innerhalb der Reihe,
  großzügig nach außen.
- Mobil: nicht in einem eigenen gelesenen Shot belegt (die Mobil-Serie zeigt an dieser
  Stelle bereits die Illustrations-Sektion). Als „nicht belegt" geführt.
- Pattern: `P-OFFER-PAIR` (Lücke: fünf Karten in ungleichen Breiten statt zwei gleich
  hohen Karten) — alternativ Kandidat: Bento-Kartenraster ohne CTA

### 04 — Illustrations-Erklärsektion auf Himmelsverlauf [home-desktop-02-y750.png | home-desktop-04-y2250.png | home-mobile-06-y2110.png]
- Anordnung: Ganzflächige Sektion mit weichem Hintergrundverlauf (Himmel mit weichem
  Wolken-Blur und einer diffusen orangen Sonnenscheibe oben in der Mitte). Text
  linksbündig ab ca. 140 px in einer schmalen Spalte, die isometrische Haus-Illustration
  rechts, deutlich größer und über die Textspalte hinausragend. Die H2 bricht sehr früh
  um (vier kurze Zeilen), obwohl rechts Platz wäre — der Umbruch ist gesetzt, nicht
  durch Containerbreite erzwungen.
- Buttons/Komponenten: Ein einziger CTA „Zum Energiesystem" (`home-desktop-04-y2250.png`).
  Rechteck mit kleinem Radius (ca. 4–5 px, geschätzt), aber **gefüllt in Near-Black**
  statt Orange, Label weiß, kein Icon. Das ist die zweite Button-Variante der Site:
  Orange für die Haupt-Conversion, Dunkel für Navigations-CTAs im Fließtext.
  Höhe ca. 58 px. In der Illustration selbst dient eine große orange Plinthe (gemessen
  `#f2b159` an der hellen Kante) als Sockel mit weißer Prozentzahl.
- Typo: H2 sehr groß (ca. 54 px), Grotesk Regular, Near-Black. Lead darunter ca. 17 px
  Regular in Grau, drei Zeilen. Kein Eyebrow in dieser Sektion. Verhältnis H2 zu Lead
  grob 3,2:1 (geschätzt).
- Farbe/Fläche: Warmer Verlauf von fast Weiß nach blass Pfirsich, orange nur in der
  Sonnenscheibe, den Leitungslinien der Illustration und der Sockel-Plinthe. Der Wechsel
  von der weißen Kartensektion in diesen Verlauf ist weich, ohne Kante.
- Abstände/Rhythmus: Sehr großzügig — ca. 300 px von der Sektionsoberkante bis zur H2,
  die Illustration füllt fast 700 px Höhe. Die luftigste Sektion der Seite.
- Mobil: gestapelt, Text über Illustration (`home-mobile-06-y2110.png` zeigt den
  verwandten Vergleichsblock). Die beiden Illustrationsvarianten stehen dort
  **untereinander** statt nebeneinander, jede mit fetter Zwischenüberschrift darüber
  („Energiesystem von EKD" / „Herkömmliche Solaranlage mit Speicher"), die es desktop
  nicht als eigene Zeile gibt. Die orange Plinthe wird zur eigenen breiten Fläche mit
  linksbündigem „Ersparnis" und großer Zahl.
- Pattern: Kandidat: Isometrische Illustrations-Erklärsektion auf Himmelsverlauf

### 05 — Produkt-Slider, randlos angeschnitten [home-desktop-04-y2250.png | -]
- Anordnung: Horizontaler Slider über die volle Viewportbreite. Die Karten sind bewusst
  **an beiden Rändern angeschnitten** — links ragt eine halbe Karte ins Bild, rechts
  ebenso; drei Karten stehen vollständig. Karten sind hohe Hochformate (ca. 410 px breit,
  545 px hoch, geschätzt), gleich groß, gleicher Abstand (ca. 20 px).
- Buttons/Komponenten: Pfeil-Navigation als zwei **weiße Kreise** (Durchmesser ca. 44 px)
  mit dünnem dunklem Pfeil, links und rechts vertikal mittig **über** den Karten liegend,
  nicht daneben. In jeder Karte unten rechts ein **oranger gefüllter Kreis** (ca. 44 px)
  mit weißem Pfeil, der nach rechts-oben zeigt (diagonal, 45°) — daneben links ein
  weißer Textlink ohne Unterstreichung. Textlink und Kreis-Pfeil bilden zusammen die
  Aktion. Kartenradius ca. 6 px (geschätzt).
- Typo: Kartentitel weiß, sehr groß (ca. 42 px), Regular, oben links in der Karte
  gesetzt — nicht unten beim Link. Textlink ca. 16 px Regular. Titel und Aktion sitzen
  also an gegenüberliegenden Ecken der Karte, dazwischen nur Foto.
- Farbe/Fläche: Weißer Sektionsgrund, die Karten sind dunkle Fotos mit leichtem Wash für
  die Weiß-Lesbarkeit. Akzent nur in den drei Kreis-Pfeilen. Kein Text unter dem Slider.
- Abstände/Rhythmus: Karten randlos bis zum Viewport, keine Container-Grenze. Ca. 100 px
  Luft nach oben und unten. Der Anschnitt signalisiert Scrollbarkeit ohne Scrollbar.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY` (Lücke: Slider mit Anschnitt und Kreis-Pfeil-Aktion statt
  statischer Bildstrecke)

### 06 — Vergleichs-Illustration mit Zahlen-Plinthen [home-desktop-04-y2250.png | home-desktop-06-y3750.png | home-mobile-06-y2110.png]
- Anordnung: Wieder Text links / Illustration rechts, diesmal aber auf einer leicht
  abgesetzten, sehr hellen Fläche mit Rundung. Darunter setzt der eigentliche Vergleich
  an: zwei isometrische Blöcke nebeneinander, jeder auf einer plastischen Plinthe mit
  großer Prozentzahl — links Grau („80 % Ersparnis, Herkömmliche Solaranlage mit
  Speicher"), rechts Orange (mit einer kleinen Bullet-Liste in Weiß auf der orangen
  Fläche). Die Plinthen sind schräg perspektivisch, die Beschriftung läuft auf der
  Schräge mit — Text als Teil der 3D-Illustration, nicht als HTML-Overlay.
- Buttons/Komponenten: Kein Button. Ein kleines oranges Line-Icon (Geldscheine) steht
  allein unter dem Lead als Marker. Zwischen Vergleich und Folgesektion sitzt ein sehr
  großer, breiter **oranger Pfeil nach unten** (ca. 110 px hoch, massiv gefüllt) exakt
  auf der Mittelachse — ein Scroll-/Übergangs-Signal als eigenständiges Grafikelement.
- Typo: H2 ca. 50 px Regular, dreizeilig. Lead ca. 17 px, mit einem **fett gesetzten
  Teilsatz** mitten im Fließtext (die Sparsumme) — Hervorhebung durch Weight, nicht
  durch Farbe. Die Prozentzahlen in den Plinthen sind riesig (ca. 66 px) und in einer
  helleren Schnittstärke gesetzt als der Fließtext, mit dem kleinen Wort „Ersparnis"
  darüber links versetzt.
- Farbe/Fläche: Sehr helles Grau/Weiß als Grundfläche, die einzige Farbfläche ist die
  orange Plinthe rechts und der Übergangspfeil. Bewusstes Gegeneinander: grau = alt,
  orange = eigenes Produkt.
- Abstände/Rhythmus: Der Bereich ist dicht (Illustration füllt die Fläche fast randlos),
  danach ca. 180 px Luft bis zur H2 der Rechner-Sektion.
- Mobil: gestapelt und in der Reihenfolge gedreht (`home-mobile-06-y2110.png`) — das
  **eigene** Produkt steht oben, die herkömmliche Anlage darunter; desktop steht die
  herkömmliche links. Jede Variante bekommt mobil eine eigene fette Zwischenzeile.
  Die Prozentzahl rutscht auf der Plinthe nach rechts unten.
- Pattern: Kandidat: Zwei-Plinthen-Vergleich in Iso-Illustration

### 07 — Ersparnisrechner, mehrstufiges Formular [home-desktop-06-y3750.png | -]
- Anordnung: Vollständig zentriert. H2 zweizeilig auf der Mittelachse, darunter eine
  einzeilige Subline, darunter ein großer hellgrauer Flächenblock (ca. 1092 px breit,
  ca. 650 px hoch, Radius ca. 6 px geschätzt), der den Rechner beherbergt. Im Block
  oben eine Schritt-Leiste, darin zentriert Icon, Frage, Hilfetext, dann zwei große
  Antwort-Flächen nebeneinander.
- Buttons/Komponenten: Drei verschiedene Komponenten in einer Sektion.
  (a) **Step-Chips**: sieben kleine Quadrate mit weichem Radius (ca. 38 px Kantenlänge,
  Radius ca. 4 px geschätzt). Der aktive Chip „1" ist **Near-Black gefüllt mit weißer
  Ziffer** und trägt rechts daneben das Schrittlabel als Text; die inaktiven Chips 2–6
  sind weiß gefüllt mit hellgrauer Ziffer und einer feinen hellen Kontur — Zustand wird
  über Füllung und Textkontrast geführt, nicht über Farbe.
  (b) **Antwort-Karten**: zwei große Near-Black-Rechtecke (je ca. 375 × 175 px,
  Radius ca. 6 px geschätzt) nebeneinander, jeweils mit einem weißen Outline-Kreis-Icon
  (Häkchen bzw. Kreuz, dünne Linie) mittig oben und einem kleinen weißen Label darunter.
  Beide sind gleichwertig gestaltet — es gibt keine visuelle Vorbelegung.
  (c) Ein einzelnes Personen-Line-Icon (dünn, dunkel) über der Frage.
  **Kein Orange in dieser Sektion** — der Rechner arbeitet komplett in Grau und
  Near-Black.
- Typo: H2 ca. 44 px Regular, zweizeilig zentriert. Subline ca. 17 px Regular Grau.
  Frage im Block ca. 26 px Regular, Hilfetext ca. 15 px Grau. Antwort-Labels ca. 15 px.
  Ziffern in den Chips ca. 15 px.
- Farbe/Fläche: Hellgrauer Block auf weißem Grund; die einzigen dunklen Flächen sind der
  aktive Chip und die beiden Antwortkarten. Genau der Aufbau, den S17 beschreibt:
  ruhige Fläche, nur die Aktion trägt Kontrast (hier Dunkel statt Akzentfarbe).
- Abstände/Rhythmus: Ca. 110 px vom Übergangspfeil zur H2, ca. 60 px H2 zu Subline,
  ca. 60 px bis zum Block. Innen: ca. 105 px Blockrand bis Chip-Leiste, ca. 100 px bis
  zum Icon, ca. 60 px bis zu den Antwortkarten, ca. 90 px Blockrand unten. Sehr großzügig
  innen, der Block wirkt eher leer als voll.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CONTACT` (Lücke: mehrstufiger Rechner mit Ja/Nein-Kacheln statt klassischem
  Formular mit Kontaktdaten) — alternativ Kandidat: Step-Chip-Rechner in ruhiger Fläche

### 08 — Marken-Signet als Sektionsauftakt [home-desktop-07-y4500.png | -]
- Anordnung: Einzelnes großes Logo-Signet, exakt zentriert, allein auf einer Fläche mit
  Himmelsverlauf und weichen Wolken. Kein Text daneben, kein Text darunter — reines
  Trennzeichen zwischen Rechner und Zahlen-Band. Ca. 270 px Kantenlänge.
- Buttons/Komponenten: keine. Das Signet ist die orange Sonne aus dem Header-Logo,
  isoliert und stark vergrößert (Strahlen-Balken oben, zwei Winkel unten).
- Typo: keine Textelemente.
- Farbe/Fläche: Verlauf von blass Pfirsich oben nach Warmgrau unten; das Signet ist die
  einzige gesättigte Fläche. Der Verlauf leitet direkt in die warmgraue Fläche der
  nächsten Sektion über, ohne Kante.
- Abstände/Rhythmus: Ca. 150 px Luft über und ca. 200 px unter dem Signet — eine sehr
  teure Pause, die die Seite in zwei Hälften teilt.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Marken-Signet als leerer Sektionstrenner

### 09 — Zahlen-Band mit Belegsätzen und Award [home-desktop-08-y5250.png | -]
- Anordnung: Auf warmgrauer Fläche (gemessen `#edecea` in `home-desktop-16-y11250.png`,
  gleicher Ton). **Zwei** Zahlenspalten links nebeneinander (nicht drei, keine gleiche
  Spaltenbreite: die erste beginnt bei ca. 140 px, die zweite bei ca. 560 px), rechts
  außen bei ca. 1010 px das Award-Siegel als drittes, andersartiges Element. Jede
  Zahlenspalte ist ein Stapel: riesige Zahl, darunter fette Label-Zeile, darunter drei
  Zeilen Belegtext. Keine Karten, keine Trennlinien, keine Rahmen.
- Buttons/Komponenten: keine Buttons. Das Award-Siegel ist eine goldene, unregelmäßig
  gefaltete Grafik (kein Kreis, kein Badge-Standardform) mit rotem Logo-Block oben.
- Typo: Vierstufig. Zahlen ca. 80 px, Grotesk Regular/Light, Near-Black, mit einem
  hochgestellten Zeichen („+" bzw. „Mio €") in etwa halber Größe direkt an der Zahl —
  die Einheit hängt als Superscript an der Ziffer, nicht in einer eigenen Zeile.
  Label ca. 16 px **Bold**, Belegtext ca. 16 px Regular Grau. Verhältnis Zahl zu Label
  rund 5:1 (geschätzt). Die Zahlen sind auffällig **nicht** in Orange gesetzt.
- Farbe/Fläche: Warmgrau statt Dunkel — die Sektion ist hell und ruhig. Gar kein Orange
  außer dem Gold des Siegels (das ist eine Fremdmarke, kein Site-Akzent).
- Abstände/Rhythmus: Ca. 60 px zwischen Zahl und Label, ca. 25 px Label zu Belegtext,
  ca. 150 px bis zur nächsten Überschrift. Die Sektion läuft ohne Zwischenraum in
  Sektion 10 über — beide teilen dieselbe warmgraue Fläche.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-PROOF-STRIP` (Lücke: keine schmale Leiste, sondern ein hohes Band mit
  Belegsätzen unter jeder Zahl)

### 10 — Deutschlandkarte als Akzentfläche [home-desktop-08-y5250.png | home-desktop-10-y6750.png | -]
- Anordnung: Zweispaltiger Kopf auf derselben warmgrauen Fläche — H2 links (dreizeilig,
  ab 140 px), Fließtext rechts (ab ca. 780 px, ca. 445 px breit). Kein Eyebrow. Darunter
  zentriert eine große Deutschlandkarte. Um die Karte herum liegen **kreisrunde
  Foto-Bubbles mit weißem Rand** (Durchmesser ca. 200 px), die die Kartensilhouette links
  und rechts überlappen und jeweils mit einem kleinen weißen Punkt-Zapfen an einen
  Kartenpunkt andocken — Sprechblasen-Logik ohne Sprechblasen-Ecke. Unter der Karte
  zentriert ein Textlink.
- Buttons/Komponenten: Standort-Marker als **weiße gefüllte Kreise mit orangem Plus**
  (ca. 34 px), unregelmäßig über die Karte verteilt. Der Abschluss-Link „Mehr über
  Energiekonzepte Deutschland" ist ein **unterstrichener Textlink in Bold**, kein Button —
  die dritte Aktions-Stufe der Site nach Orange-Rechteck und Dunkel-Rechteck. Der
  Unterstrich sitzt mit sichtbarem Abstand unter der Grundlinie.
- Typo: H2 ca. 44 px Regular, dreizeilig. Rechter Fließtext ca. 16 px Regular Grau,
  sechs Zeilen. Textlink ca. 16 px Bold.
- Farbe/Fläche: Warmgrau als Grund, die Karte ist die **einzige große Akzentfläche der
  Seite** — vollflächig Orange, an den Rändern in ein Punktraster aufgelöst, das nach
  außen ausfranst. Die Fotos in den Bubbles sind der einzige Farbeinsatz daneben.
- Abstände/Rhythmus: Ca. 100 px Kopf zu Karte, Karte ca. 700 px hoch, ca. 90 px Karte zu
  Textlink, danach ca. 150 px bis zur Sektionskante. Danach harter Wechsel Warmgrau auf
  Weiß mit gerader Kante bei ca. y=6750+695.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-MAP`

### 11 — Leistungs-Fotokarten, gestaffelt [home-desktop-10-y6750.png | home-desktop-12-y8250.png | -]
- Anordnung: Zentrierter Kopf (H2 zweizeilig, Subline zweizeilig), darunter drei hohe
  Foto-Karten in einer Reihe (je ca. 370 px breit, ca. 470 px hoch). Sie sind **nicht
  auf gleicher Höhe**: die dritte Karte sitzt sichtbar höher als die ersten beiden und
  ist zusätzlich nach rechts versetzt, sodass sie am Container-Rand herausragt — eine
  gewollte Staffelung. Icon und Label sitzen in jeder Karte unten links über dem Foto.
- Buttons/Komponenten: Keine echten Buttons. Jede Karte trägt unten links ein **weißes
  Line-Icon** (Handschlag, Geldschein, Schild mit Häkchen; dünne Strichstärke, ca. 40 px)
  über einem weißen Label. Nur die dritte Karte zeigt zusätzlich eine kleine Zeile
  „Mehr erfahren" darunter — die Karten sind also nicht einheitlich ausgestattet.
  Kartenradius ca. 4 px (geschätzt), keine Kontur, sehr weicher Schatten.
- Typo: H2 ca. 44 px Regular, zentriert. Subline ca. 17 px Regular Grau. Karten-Labels
  weiß, ca. 22 px Regular, ein- bis zweizeilig. „Mehr erfahren" ca. 15 px Regular.
- Farbe/Fläche: Weißer Grund, die Karten sind gedämpfte Fotos mit dunklem Wash im
  unteren Drittel für die Lesbarkeit der weißen Labels. **Kein Orange.**
- Abstände/Rhythmus: Ca. 150 px Sektionsoberkante zur H2, ca. 70 px H2 zu Subline,
  ca. 80 px zu den Karten, ca. 20 px Kartenabstand, danach ca. 130 px Luft.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY`

### 12 — Prozess, Split plus Schritt-Kacheln [home-desktop-12-y8250.png | -]
- Anordnung: Zweiteilig. Oben ein Split: links Eyebrow, H2, Lead und Textlink (Spalte ab
  140 px, ca. 640 px breit), rechts ein Foto in einer flachen Karte (ca. 450 × 305 px)
  auf gleicher Oberkante wie die H2. Darunter über die volle Containerbreite eine Reihe
  von **fünf Schritt-Kacheln** — alle gleich breit (ca. 210 px), aber **unterschiedlich
  hoch**: Kachel 1 ist die höchste (sie trägt einen Zusatzlink), 2 bis 5 werden nach
  rechts jeweils etwas flacher, sodass die Reihe eine Treppe nach unten bildet. Ihre
  **Unterkanten** liegen ebenfalls gestaffelt, nicht bündig.
- Buttons/Komponenten: (a) Die aktive erste Kachel ist die einzige mit **orangem Outline**
  (1 px Kontur, Radius ca. 8 px geschätzt) und leicht wärmerer Füllung; die übrigen vier
  sind randlos hellgrau gefüllt, gleicher Radius. Zustand über Kontur, nicht über Füllung.
  (b) In Kachel 1 zusätzlich der unterstrichene Bold-Textlink „Jetzt starten".
  (c) Im linken Split der Textlink „Mehr erfahren", ebenfalls unterstrichen und Bold.
  (d) Ganz rechts unten in der Sektion ein weiterer unterstrichener Bold-Link
  („Zur Kundenstory im Video") — rechtsbündig, allein auf einer Zeile, ohne Bezugsblock.
  Keine gefüllten Buttons in dieser Sektion.
- Typo: Eyebrow ca. 15 px Regular in Grau, **ohne Farbe und ohne Caps** — anders als der
  orange Hero-Eyebrow. H2 ca. 48 px Regular, zweizeilig. Lead ca. 16 px Grau. In den
  Kacheln: Ziffer sehr groß (ca. 34 px) und **Light** gesetzt, Label darunter ca. 15 px,
  zentriert, bis zu drei Zeilen umbrechend.
- Farbe/Fläche: Weiß mit hellgrauen Kacheln. Orange erscheint ausschließlich als 1-px-
  Kontur der aktiven Kachel — der sparsamste Akzenteinsatz der ganzen Seite.
- Abstände/Rhythmus: Ca. 60 px Eyebrow zu H2, ca. 70 px H2 zu Lead, ca. 55 px Lead zu
  Textlink, ca. 55 px bis zur Kachelreihe, ca. 22 px Kachelabstand.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-PROCESS-3` (Lücke: fünf Schritte statt drei; die 1–5-Marker sind hier durch
  eine echte Sequenz gedeckt, S11 greift nicht)

### 13 — Video-/Bildstrecke mit Dot-Navigation [home-desktop-14-y9750.png | -]
- Anordnung: Zwei randlose Fotoflächen nebeneinander über die volle Viewportbreite
  (links ca. 50 %, rechts ca. 50 %), ohne Rundung, ohne Abstand zueinander, ohne
  Container. Sie stoßen mit einer geraden 1-px-Fuge aneinander. Darunter zentriert eine
  Punkt-Navigation.
- Buttons/Komponenten: Vier Dots (ca. 8 px), der zweite ist **orange gefüllt**, die drei
  anderen hellgrau. Keine Pfeile in diesem Slice sichtbar. Die Fotos tragen kein Label,
  keinen Titel, keinen Wash.
- Typo: keine Textelemente in dieser Fläche.
- Farbe/Fläche: Volle Fotofarbe ohne Abdunklung — der einzige Ort auf der Seite, an dem
  Bilder unbehandelt und randlos laufen. Akzent nur im aktiven Dot.
- Abstände/Rhythmus: Fotoband ca. 430 px hoch, ca. 45 px bis zur Dot-Reihe, ca. 110 px
  bis zur nächsten H2.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY`

### 14 — FAQ-Akkordeon mit seitlichem CTA-Block [home-desktop-14-y9750.png | home-desktop-16-y11250.png | -]
- Anordnung: Asymmetrischer Zweispalter. Links die H2 und darunter das Akkordeon in einer
  Spalte von ca. 140 bis 772 px. Rechts ab ca. 877 px ein schmaler Block (ca. 420 px)
  mit fetter Frage, drei Zeilen Text und einem Button — er beginnt auf Höhe der ersten
  Akkordeon-Zeile, nicht auf Höhe der H2, und bleibt nach oben eingerückt.
- Buttons/Komponenten: (a) **Akkordeon-Zeilen**: geöffnete Zeile wird zur weißen Karte
  mit Radius (ca. 8 px, geschätzt) und weichem Schatten, die aus der Reihe heraussteht;
  geschlossene Zeilen sind randlos und werden nur durch eine 1-px-Haarlinie am unteren
  Rand getrennt. Rechts in jeder Zeile ein **Kreis-Icon mit dünner Kontur** (ca. 32 px):
  geöffnet ein oranger Kreis mit orangem Minus, geschlossen ein grauer Kreis mit
  dunklem Plus — Zustand über Farbe *und* Zeichen. (b) Der CTA rechts,
  „Kostenlose Beratung vereinbaren", ist ein **Near-Black-Rechteck** (Radius ca. 4–5 px
  geschätzt, Höhe ca. 58 px) mit weißem Bold-Label, kein Icon.
- Typo: H2 ca. 44 px Regular. Fragen ca. 19 px **Bold**; die geöffnete Frage ist
  zusätzlich **orange eingefärbt** — Farbe markiert den offenen Zustand, nicht nur das
  Icon. Antworttext ca. 16 px Regular Grau, Zeilenabstand großzügig. Rechts: Frage
  ca. 17 px Bold, Text ca. 16 px Regular.
- Farbe/Fläche: Weiß. Orange nur in der geöffneten Frage und ihrem Minus-Kreis. Der
  dunkle CTA ist die einzige dunkle Fläche.
- Abstände/Rhythmus: Ca. 130 px Sektionsoberkante zur H2, ca. 140 px H2 zum Akkordeon.
  Geschlossene Zeilen ca. 100 px hoch, die geöffnete Karte ca. 385 px. Innenabstand der
  offenen Karte ca. 38 px.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-FAQ`

### 15 — Download-Split mit rotierendem Siegel [home-desktop-16-y11250.png | -]
- Anordnung: Auf warmgrauer Fläche (gemessen `#edecea`). Links das Cover-Bild einer
  Broschüre als hohes Rechteck (ca. 322 × 455 px) ohne Rundung, rechts ab ca. 733 px die
  Textspalte. Über der oberen rechten Ecke des Covers liegt ein **Kreis-Siegel mit
  umlaufender Schrift** (Durchmesser ca. 120 px), das die Coverkante überlappt und halb
  darüber, halb daneben sitzt — der einzige rotierte Text der Seite.
- Buttons/Komponenten: Das Siegel ist orange Kleinschrift auf einer Kreisbahn mit einem
  massiven orangen Pfeil nach unten in der Mitte, ohne gefüllte Kreisfläche. Die Aktion
  darunter ist wieder ein **unterstrichener Bold-Textlink** („Zur Checkliste"), kein
  Button — obwohl es der Haupt-Download der Sektion ist.
- Typo: H2 ca. 44 px Regular, dreizeilig. Lead ca. 16 px Regular Grau, drei Zeilen.
  Textlink ca. 16 px Bold. Die Siegelschrift ist klein (ca. 10 px), in Caps und stark
  gesperrt, teils kopfstehend — als Fließtext **nicht gut lesbar**, sie wirkt als Ornament.
- Farbe/Fläche: Warmgrau. Akzent nur im Siegel. Das Cover selbst ist ein Fremdmotiv mit
  eigener schwarzer Typo-Fläche und wirkt bewusst wie ein eingelegtes Objekt.
- Abstände/Rhythmus: Ca. 130 px Sektionsoberkante zum Cover, ca. 60 px H2 zu Lead,
  ca. 55 px Lead zu Link, ca. 110 px Luft unten.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID` (Lücke: Fläche ist Warmgrau statt weiß, Aktion ist ein Textlink
  statt eines farbigen Buttons)

### 16 — Dunkles Abschlussband mit Auszeichnungen [home-desktop-16-y11250.png | home-desktop-17-y11773.png | -]
- Anordnung: Harter Wechsel von Warmgrau auf Near-Black mit gerader Kante. Alles
  linksbündig ab 140 px, keine Zentrierung: H2 zweizeilig, darunter ein Textlink,
  darunter mit großem Abstand eine Reihe von drei Auszeichnungs-Logos. Die rechte
  Bildschirmhälfte bleibt **komplett leer** — bewusste Asymmetrie am Seitenende.
- Buttons/Komponenten: Kein gefüllter Button. Nur der weiße, **unterstrichene
  Bold-Textlink** „Broschüre herunterladen". Die drei Logos sind unterschiedlich geformte
  Fremdmarken (goldenes Rechteck, weißes Rechteck mit rotem Signet, gefaltete
  Gold-Grafik) und werden **nicht** auf eine einheitliche Kachel normalisiert — sie
  stehen in ihren Originalformen nebeneinander.
- Typo: H2 ca. 44 px Regular in Weiß, zweizeilig. Textlink ca. 16 px Bold Weiß.
- Farbe/Fläche: Near-Black-Fläche (Schätzung `#21262b`-Bereich, in diesem Slice nicht
  einzeln gemessen). **Kein Orange** — das Abschlussband verzichtet vollständig auf den
  Akzent, entgegen dem üblichen Muster einer farbigen Schlusssektion.
- Abstände/Rhythmus: Ca. 90 px Bandoberkante zur H2, ca. 60 px H2 zu Link, ca. 100 px
  Link zu den Logos. Das Band läuft ohne Trennlinie direkt in den Footer.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-END` (Lücke: Schlussband ohne Akzentfarbe und ohne gefüllten Button)

### 17 — Footer [home-desktop-17-y11773.png | -]
- Anordnung: Auf derselben Near-Black-Fläche wie Sektion 16, ohne Trennkante — Band und
  Footer bilden optisch einen Block. Fünf Spalten: links das Logo (ab 140 px, ca. 175 px
  breit) mit den Social-Icons **weit darunter** am unteren Spaltenende, dann vier
  Linkspalten ab ca. 435 / 655 / 877 / 1097 px in gleichem Abstand. Die Spalten sind
  unterschiedlich lang (8 / 6 / 5 / 5 Einträge) und nicht auf gleiche Höhe aufgefüllt.
  Darunter eine 1-px-Trennlinie über die Containerbreite, darunter eine Rechtszeile.
- Buttons/Komponenten: Keine Buttons. Social-Icons als drei kleine weiße Glyphen
  (LinkedIn, Instagram, Facebook) in einer Zeile, ca. 20 px, ohne Kreis und ohne Kasten.
  Links sind reiner Text ohne Unterstreichung.
- Typo: Spaltenüberschriften ca. 14 px Regular in **gedämpftem Grau** — schwächer als
  die Links darunter, eine ungewöhnliche Umkehrung. Links ca. 16 px Regular in Weiß.
  Rechtszeile ca. 14 px Grau. Keine Caps, kein Letterspacing.
- Farbe/Fläche: Durchgehend Near-Black. **Kein Orange im gesamten Footer** außer im
  Sonnen-Signet des Logos.
- Abstände/Rhythmus: Ca. 340 px von den Auszeichnungs-Logos bis zur Spaltenzeile,
  ca. 34 px Zeilenabstand innerhalb der Linkspalten, ca. 60 px bis zur Trennlinie,
  ca. 55 px bis zur Rechtszeile. Die Rechtszeile bricht rechts unsauber um
  („Allgemeine Einkaufsbedingungen" und „Cookie Einstellungen ändern" laufen zweizeilig
  und stören die Grundlinie der Zeile).
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

### Zustände (Hover)

Grundlage: 12 gelesene Zustands-Shots aus `shots/`, verglichen gegen den Normalzustand
`home-desktop-00-fold.png` bzw. `home-desktop-hover-00-nav1.png` (Nullzustand ohne
Zeiger auf einem Nav-Punkt). **Wichtige Einschränkung für alle Home-Shots:** das
Hero-Foto der Startseite rotiert zwischen den Aufnahmen (in den gelesenen Shots drei
verschiedene Motive: Hand am Smartphone, Mann am Monitor, Aufnahme mit Fensterfront).
Ein Vollbild-Pixeldiff zweier Home-Shots ist deshalb wertlos; belastbar ist nur der
Vergleich des Header-Streifens y=0–80 mit Schwellenwert. Genau so sind die Zahlen unten
gemessen. Alles, was unterhalb des Headers liegt, ist bei Home-Shots als Motivwechsel
und nicht als Hover-Effekt zu lesen.

- Nav-Punkte, Grundeffekt: Der einzige Hover-Effekt auf den Top-Level-Nav-Punkten ist ein
  **1 px hoher Unterstrich in reinem Weiß `#ffffff`**, gemessen auf Zeile y=58 — also
  ca. 12 px unter der Textgrundlinie, in Labelbreite und exakt linksbündig zum Label.
  Kein Farbwechsel des Labels, keine Fläche, kein Schatten, keine Verschiebung: die
  Zeilen y=57 und y=59 messen im Hover-Shot dieselben Fotowerte wie im Nullzustand
  (`#363130`-Bereich, Mittel 54/49,6/46,4 gegen 54,4/49,8/46,8 in
  `home-desktop-hover-00-nav1.png`). Belegt über den Schwellendiff des Header-Streifens
  gegen `home-desktop-hover-00-nav1.png`: `home-desktop-hover-01-Energiesystem.png`
  x=228–335, `home-desktop-hover-13-PV-Großanlagen.png` x=609–730,
  `home-desktop-hover-14-Kundenerfahrungen.png` x=763–910 — jeweils **ausschließlich**
  auf y=58, sonst keine einzige Abweichung über Schwelle im Header.
- „Kundenportal": verhält sich wie ein normaler Nav-Punkt, nicht wie eine eigene Stufe —
  im Hover derselbe weiße Unterstrich unter dem Wort, sichtbar in
  `home-desktop-hover-16-Kundenportal.png`. Das ist bemerkenswert, weil der Link im
  Normalzustand (Sektion 01) ausdrücklich **ohne** Unterstreichung steht: die
  Unterscheidung Nav/Konto existiert also nur über den Abstand, nicht über den
  Hover-Zustand.
- Header-CTA „Ersparnis berechnen": **kein sichtbarer Hover-Effekt.** Die Füllung misst in
  `home-desktop-hover-17-Ersparnis_berechnen.png` an allen vier abgetasteten Stellen
  (1316/47, 1250/30, 1240/47, 1400/47) exakt dieselben Werte wie in
  `home-desktop-00-fold.png` — `#f09122` bzw. `#ef870e`, Byte für Byte identisch. Kein
  Aufhellen, kein Abdunkeln, kein Schatten, keine Skalierung, kein Unterstrich. Der
  einzige Unterschied im Shot ist das gewechselte Hero-Motiv. Für die auffälligste
  Aktion der Seite gibt es damit **keine Hover-Rückmeldung** — Lücke gegen S18.
- Dropdown „Produkte": Der Hover öffnet ein **vollbreites Mega-Menü**, das von der
  Header-Unterkante bis y≈489 reicht und fast die ganze Fensterbreite belegt (x≈28–1412),
  weiße Fläche mit leicht gerundeten unteren Ecken, die sich über das Hero-Foto legt.
  Inhalt: sechs gleich breite weiße Produktkarten nebeneinander (Solaranlage,
  Energiemanagement, Stromspeicher, Wallbox, Wärmepumpe, Stromtarif), je ein
  freigestelltes Produktfoto oben und ein zentriertes Label darunter bei y≈406. Der
  Elternpunkt „Produkte" trägt dabei denselben weißen 1-px-Unterstrich wie ein
  normaler Nav-Punkt. Belegt in `home-desktop-hover-02-Produkte.png` und
  `energiesystem__-desktop-hover-02-Produkte.png`. Ob das Menü ein- oder aufklappt
  (Animation), ist aus Standbildern nicht belegt.
- Karten im „Produkte"-Menü: Der Hover auf einer einzelnen Produktkarte ändert **nur die
  eigene Karte**, nichts sonst. Diffbereich gegen das geöffnete Menü
  (`energiesystem__-desktop-hover-02-Produkte.png`) ist bei
  `energiesystem__-desktop-hover-05-Stromspeicher.png` exakt x=554–690 / y=152–415 und
  bei `energiesystem__-desktop-hover-03-Solaranlage.png` x=28–308 / y=81–489 — also
  jeweils genau eine Kartenspalte. Sichtbar sind zwei Dinge zugleich: das Kartenlabel
  bekommt einen **dunklen Unterstrich** (gemessen y=405 unter „Stromspeicher"), und die
  Karte hebt sich mit **Schatten und leichter Vergrößerung** vom Nachbarn ab — die
  Kartenkante bei x≈506–512 misst im Hover-Shot durchgehend `238` gegen `246–249` im
  Ruhezustand, das Produktfoto rückt zugleich um wenige Pixel nach oben. Ein
  Lift-plus-Unterstrich-Muster, kein Farbwechsel der Kartenfläche.
- Dropdown „Ratgeber": strukturell **anders gebaut als „Produkte"**, nicht dieselbe
  Komponente mit anderem Inhalt. Ebenfalls vollbreites weißes Panel, aber mit eigenem
  Kopf: H2 „Unser Ratgeber" links bei y≈149 plus Fließtext-Unterzeile darunter, dann
  **drei** Bildkarten ungleicher Bildhöhe (Foto oben, Titel darunter bei y≈542) und
  rechts daneben eine schlichte, karten- und bildlose Linkspalte (Magazin, News, Glossar)
  ab x≈1148. Belegt in `home-desktop-hover-09-Ratgeber.png`.
- Karten im „Ratgeber"-Menü: gleicher Doppeleffekt wie im Produkte-Menü, hier deutlich
  ablesbar in `energiesystem__-desktop-hover-12-Alles_Wichtige_zur_Solar.png`: der
  Kartentitel „Alles Wichtige zur Solaranlage" ist unterstrichen, und die ganze Karte
  liegt sichtbar höher als ihre beiden Nachbarn — Foto und Titel der gehoverten Karte
  sitzen ca. 10 px weiter oben, die Karte wirft einen weichen Schatten auf die
  Panel-Fläche. Die Nachbarkarten bleiben unverändert.
- Karussell-Pfeile, Klick (Startseite, Produkt-Slider): `home-desktop-click-y1500-00-Previous.png`
  gegen `home-desktop-click-y1500-01-Next.png` — oberhalb y=1000 sind beide Shots
  praktisch identisch (maximale Kanalabweichung 9, also reines Rendering-Rauschen); alle
  Änderungen liegen in y=1035–1499, dem Slider-Band. Der Versatz zwischen den beiden
  Zuständen beträgt per Kreuzkorrelation auf Zeile 1085 nur **19 px** — der Slider
  springt also **nicht** um eine ganze Karte weiter, sondern zeigt nur eine minimale
  Verschiebung. Ob das ein angefangener Übergang zum Aufnahmezeitpunkt oder der
  komplette Effekt ist, ist aus Standbildern **nicht belegt**. Die Pfeile selbst sind in
  beiden Shots unveränderte weiße Kreise mit dunklem Pfeil-Glyph, links x≈99 und rechts
  x≈1341, vertikal auf Kartenmitte; ein eigener Hover-Zustand der Pfeile ist nicht belegt.
- Karussell auf Unterseiten: `stromspeicher__-desktop-click-y6000-01-Next.png` zeigt
  dasselbe Bauteil in einer anderen Sektion („Alle Performance Features") — weiße
  Kreis-Pfeile links und rechts auf Kartenmitte, hier zusätzlich über die angeschnittene
  dritte Karte gelegt. Bestätigt, dass Pfeilform und Platzierung seitenübergreifend
  dieselbe Komponente sind; ein Zustandswechsel gegenüber Ruhe ist in diesem Einzelshot
  nicht belegt.
- Klick auf Content-Elemente ohne sichtbare Wirkung:
  `energiesystem__-desktop-click-y2250-00-el6.png` zeigt die EKD-365-Sektion mit
  Kundenkarte, Chip-Reihe (Solaranlage, Stromspeicher, IQ, Wallbox, Smart Meter) und dem
  orangen Plus-Button „Mehr erfahren" — **kein geöffnetes Overlay, kein Panel, kein
  ausgeklappter Inhalt.** Der Klick hat in diesem Shot keine sichtbare Zustandsänderung
  erzeugt; die Dot-Navigation unten steht weiter auf dem ersten Punkt. Als „nicht belegt"
  geführt, ob der Plus-Button überhaupt etwas aufklappt.
- Nicht belegt: Hover-Zustände auf Mobil (keine Mobil-Zustands-Shots vorhanden),
  Fokus-/Tastaturzustände, Active-/Pressed-Zustände, Übergangsdauern und Easing sowie
  jeder Hover auf Buttons außerhalb des Headers (Hero-CTA, Formular-Buttons, Footer-Links
  sind in keinem gelesenen Zustands-Shot gehovert).
- Pattern: Kandidat: Weißer 1-px-Unterstrich als einziger Nav-Hover, ohne CTA-Rückmeldung
- Pattern: Kandidat: Vollbreites Mega-Menü mit Karten-Lift plus Titel-Unterstrich

## Seite: /solaranlage/

Diese Route ist als **Ratgeber-Artikel** gebaut, nicht als Landingpage: eine schmale
zentrierte Textspalte, keine Sektionsflächen, keine Illustrationen. Sie zeigt, wie das
Design-System sich auf eine reine Lesestrecke reduziert.

### 18 — Artikel-Kopf, zentrierte Lesespalte [solaranlage__-desktop-00-fold.png | solaranlage__-mobile-00-fold.png]
- Anordnung: **Kein Hero-Foto, kein dunkler Fold.** Der Header steht auf weißem Grund
  (dadurch dunkle Nav-Labels statt weißer wie auf `/` und `/waermepumpe/`), darunter
  eine einzige zentrierte Spalte von ca. 313 bis 1128 px (815 px breit). Reihenfolge
  streng vertikal: H1, Metazeile, Artikelbild, Lead. Nichts liegt nebeneinander, nichts
  überlappt. Der aktive Nav-Punkt „Ratgeber" ist als einziger **unterstrichen** — der
  Aktivzustand der Navigation wird über einen Unterstrich geführt, nicht über Farbe
  oder Weight.
- Buttons/Komponenten: Im Fold **kein einziger Button** außer dem Header-CTA. Das
  Artikelbild ist ein flaches 16:6-Rechteck (815 × 271 px) mit Radius ca. 4 px
  (geschätzt), ohne Bildunterschrift, ohne Rahmen.
- Typo: H1 ca. 62 px Regular, zweizeilig, linksbündig in der Spalte — trotz zentrierter
  Spalte ist der Text nicht mittig gesetzt. Metazeile ca. 17 px Regular Grau. Lead
  ca. 17 px Regular, zweizeilig. Kein Eyebrow, keine Farbe, kein Caps.
- Farbe/Fläche: Durchgehend Weiß. Orange existiert im Fold nur im Header-CTA.
- Abstände/Rhythmus: Ca. 90 px Leiste bis H1, ca. 60 px H1 bis Metazeile, ca. 70 px bis
  Bild, ca. 70 px Bild bis Lead. Gleichmäßiger, ruhiger Vertikalrhythmus ohne die großen
  Sprünge der Startseite.
- Mobil: gestapelt und deutlich enger (`solaranlage__-mobile-00-fold.png`). Spalte
  ca. 20–370 px, H1 dreizeilig bei ca. 27 px, das Artikelbild schrumpft auf ein flaches
  Band (ca. 350 × 97 px). Direkt darunter beginnt bereits die dunkle Angebots-Box,
  die desktop erst unter dem Fold liegt.
- Pattern: Kandidat: Artikel-Kopf ohne Hero, zentrierte Lesespalte

### 19 — Angebots-Box, dunkel im Fließtext [solaranlage__-desktop-02-y750.png | solaranlage__-mobile-00-fold.png]
- Anordnung: Ein Near-Black-Rechteck über die volle Spaltenbreite (815 × 155 px), das
  den Fließtext unterbricht. Innen ein Zweispalter: links zweizeilige Bold-Zeile,
  rechts der Button — beide vertikal zentriert, Button rechtsbündig.
- Buttons/Komponenten: Oranger gefüllter Rechteck-Button „Jetzt Angebot anfordern",
  Radius ca. 4 px (geschätzt), Label **weiß und Bold**. Der Button ist zu schmal für
  sein Label und **bricht mitten im Wort um** („anforde / rn") — ein sichtbarer
  Layoutfehler, kein Design-Merkmal. Höhe ca. 88 px durch den Umbruch.
- Typo: Box-Zeile ca. 19 px Bold Weiß, zweizeilig. Button-Label ca. 16 px Bold.
- Farbe/Fläche: Near-Black-Fläche als einzige dunkle Insel in einem sonst weißen
  Artikel; Orange auf Dunkel ist hier der stärkste Kontrast der Seite.
- Abstände/Rhythmus: Ca. 70 px Lead zur Box, Innenabstand links ca. 42 px, ca. 80 px
  bis zur nächsten Textzeile.
- Mobil: die Box wird hoch statt breit und stapelt (`solaranlage__-mobile-00-fold.png`):
  dreizeilige Bold-Überschrift, darunter der orange Button **rechts eingerückt**, nicht
  über die volle Breite und nicht linksbündig — eine ungewöhnliche Ausrichtung.
- Pattern: `P-CTA-MID` (Lücke: die Fläche ist Near-Black statt `surface`, entgegen S17)

### 20 — Inhaltsverzeichnis [solaranlage__-desktop-02-y750.png | -]
- Anordnung: In derselben Lesespalte, aber eingerückt: die Ziffern stehen bei ca. 335 px,
  die Linktexte bei ca. 373 px — eine klassische nummerierte Liste mit hängendem Einzug,
  kein Kasten, keine Fläche, kein Rahmen.
- Buttons/Komponenten: keine. Die zehn Einträge sind **orange Bold-Textlinks ohne
  Unterstreichung**. Die Ziffern davor bleiben dunkelgrau — Farbe trägt nur der Link.
  Eine unauffällige Metazeile („Lesedauer") steht darüber, ohne Icon.
- Typo: Überschrift „Inhalt" ca. 40 px Regular. Listeneinträge ca. 16 px Bold Orange,
  Zeilenabstand ca. 28 px. Der achte Eintrag bricht zweizeilig und der Umbruch ist nicht
  auf die Ziffernbreite eingerückt.
- Farbe/Fläche: Weiß. Das ist die einzige Stelle im Atlas, an der Orange als **massierte
  Textfarbe über zehn Zeilen** auftritt — sonst immer nur eine Zeile.
- Abstände/Rhythmus: Ca. 60 px Metazeile zu „Inhalt", ca. 45 px bis zur Liste, ca. 130 px
  bis zur ersten H2.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Nummeriertes Inhaltsverzeichnis in Akzentfarbe

### 21 — Artikelkörper, H2-Blöcke mit Fließtext [solaranlage__-desktop-03-y1500.png | solaranlage__-desktop-07-y4500.png | -]
- Anordnung: Reine Vertikale in der 815-px-Spalte, im Wechsel H2 → Absatz → gelegentlich
  Bild oder Tabelle. Bilder laufen über die volle Spaltenbreite (815 px), Höhe variiert
  (271 px bzw. 400 px). Keine Randnotizen, keine Sidebar, keine Zwischen-Karten.
- Buttons/Komponenten: Keine Buttons im Körper. Zwei Auszeichnungsarten im Fließtext:
  **Bold in Textfarbe** für Fachbegriffe und Zahlen, **Orange Regular** für interne
  Links (z. B. „Wie funktioniert das?", „Balkonkraftwerke", „Solarversicherung") — beide
  ohne Unterstreichung. Der Leser unterscheidet Link von Hervorhebung also nur an der
  Farbe. Tabellen (`solaranlage__-desktop-07-y4500.png`): schlicht, 1-px-Linien in
  Hellgrau, Kopfzeile in Bold, keine Zebrastreifen, keine Füllung, keine Rundung.
- Typo: H2 ca. 46 px Regular, ein- bis dreizeilig — **auffällig groß im Verhältnis zum
  Fließtext** (ca. 17 px), Verhältnis rund 2,7:1. Zeilenabstand im Fließtext großzügig
  (ca. 28 px). Tabellentext ca. 16 px. Eine kleinere H3-Stufe (ca. 24 px Regular) steht
  über den Tabellen.
- Farbe/Fläche: Weiß, ohne jeden Flächenwechsel über mehrere tausend Pixel Scrolltiefe.
- Abstände/Rhythmus: Ca. 130 px vor jeder H2, ca. 45 px H2 zum Absatz, ca. 70 px Absatz
  zu Bild. Der Rhythmus ist über den ganzen Artikel konstant.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Ratgeber-Lesestrecke mit Orange-Inline-Links

### 22 — Zwei Info-Boxen zum Artikelende [solaranlage__-desktop-18-y12750.png | -]
- Anordnung: Zwei Boxen in Spaltenbreite untereinander, beide mit ca. 8 px Radius
  (geschätzt), aber **unterschiedlich gebaut**. Box A (Warmgrau): Zweispalter, Bold-Text
  links, Button rechts, vertikal zentriert. Box B (Hellblau): zuerst eine Kopfzeile mit
  Info-Icon links neben einer Bold-Überschrift, darunter ein Zweispalter mit Fließtext
  links und Button rechts — der Button sitzt hier auf Höhe der zweiten Textzeile,
  nicht mittig.
- Buttons/Komponenten: Beide Buttons sind orange gefüllte Rechtecke mit weißem
  Bold-Label und Radius ca. 4 px (geschätzt), Höhe ca. 56 px. Diesmal breit genug, kein
  Umbruch. Das Info-Icon ist ein dünner Outline-Kreis mit „i", ca. 30 px, in Dunkelblau.
- Typo: Box-Überschriften ca. 19 px Bold, drei- bzw. zweizeilig. Fließtext in Box B
  ca. 16 px Regular mit Bold-Hervorhebungen. Button-Labels ca. 16 px Bold.
- Farbe/Fläche: Box A warmgrau (Ton wie `#edecea`, hier nicht einzeln gemessen), Box B
  **hellblau** — die einzige blaue Fläche im gesamten Atlas und damit ein Ausreißer aus
  der Orange/Grau/Near-Black-Palette. Sie wirkt wie ein Editor-Baustein aus einem
  anderen System.
- Abstände/Rhythmus: Ca. 70 px Fließtext zu Box A, ca. 65 px zwischen den Boxen,
  ca. 90 px bis zum dunklen Abschlussband.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID`

### 23 — Abschlussband und Footer [solaranlage__-desktop-18-y12750.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band mit linksbündiger H2,
  unterstrichenem Bold-Link, drei Auszeichnungs-Logos; darunter der Fünf-Spalten-Footer).
  Keine sichtbare Abweichung. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /waermepumpe/

### 24 — Hero, Foto mit Lead-Absatz [waermepumpe__-desktop-00-fold.png | waermepumpe__-mobile-00-fold.png]
- Anordnung: Gleiches Muster wie der Home-Hero, aber **vierstufig statt dreistufig**:
  zusätzlich ein vierzeiliger Lead zwischen H1 und CTA, den die Startseite nicht hat.
  Textspalte links ab 140 px, Foto vollflächig, unten wieder die weiße Fläche mit
  gerundeten oberen Ecken, die ab ca. y=798 ins Bild schiebt und die Folgekarten
  anschneidet. **Kein Bewertungs-Proof** rechts unten — der Platz bleibt leer.
- Buttons/Komponenten: Genau ein CTA „Jetzt beraten lassen!", oranges Rechteck,
  Radius ca. 4 px (geschätzt), Label **dunkel** (wie im Home-Hero, nicht weiß wie im
  Header), Höhe ca. 58 px, kein Icon.
- Typo: Eyebrow eine orange Zeile ca. 17 px Regular ohne Caps. H1 ca. 60 px Regular
  Weiß, zweizeilig. Lead ca. 17 px Regular Weiß, vier Zeilen, deutlich schmaler gesetzt
  (ca. 550 px) als die H1. Verhältnis H1 zu Lead rund 3,5:1 (geschätzt).
- Farbe/Fläche: Backstein-Foto mit gleichmäßigem dunklem Wash, Motiv-Fokus rechts
  (Gerät), Text links im ruhigsten Bildbereich. Akzent nur in Eyebrow und CTA. Der
  Header ist hier **weiß hinterlegt** und liegt als eigene Leiste über dem Foto — anders
  als auf `/`, wo er transparent im Foto steht.
- Abstände/Rhythmus: Ca. 155 px Leiste bis Eyebrow, ca. 35 px zu H1, ca. 55 px H1 zu
  Lead, ca. 45 px Lead zu CTA. Enger getaktet als der Home-Hero, weil eine Stufe mehr.
- Mobil: identisch gestapelt (`waermepumpe__-mobile-00-fold.png`), **gleiches Motiv**
  wie desktop (anders als auf `/`, wo mobil ein anderes Foto läuft). H1 dreizeilig
  ca. 26 px, Lead fünfzeilig, CTA linksbündig. Das Foto endet mit gerader Kante, die
  gerundete Überlappung fehlt mobil.
- Pattern: `P-HERO-PHOTO`

### 25 — Benefit-Bento, sechs ungleiche Kacheln [waermepumpe__-desktop-02-y750.png | -]
- Anordnung: Das interessanteste Raster der Site. Sechs Kacheln in zwei Reihen mit
  **unterschiedlichen Breiten, Höhen und Flächentypen**, teils überlappend: Reihe 1
  schmal (275 px) / breit (570 px, Foto) / mittel (275 px). Reihe 2 breit (565 px) /
  schmal hoch (275 px) / schmal hoch (280 px), darunter noch eine breite Foto-Kachel
  links. Zwei Kacheln überlappen sichtbar ihren Nachbarn: die orange „Erweiterbar"-Kachel
  wird rechts von der Foto-Kachel „Zukunftssicher" überdeckt, sodass ihr Text
  **abgeschnitten** ist („Erweiterba…"). Ebenso wird „Smarte Steuerung" rechts vom
  Nachbarn beschnitten. Das ist ein sichtbarer Layoutfehler, kein Stilmittel.
- Buttons/Komponenten: **Keine Buttons.** Drei Kachel-Typen wechseln sich ab: (a) orange
  Vollfläche mit weißem Text, (b) warmgraue Fläche mit dunklem Text, (c) Foto mit
  weißem Text und leichtem Wash. Alle mit Radius ca. 8 px (geschätzt), keine Kontur,
  weicher Schatten nur unter den Foto-Kacheln. Es gibt **keine Icons** — die Kacheln
  tragen nur Typo.
- Typo: Zweistufig pro Kachel: große Aussage (ca. 36–40 px Regular, zentriert) über
  einer kleinen Fußzeile (ca. 15 px Regular). Die große Zeile bricht in schmalen Kacheln
  auf drei Zeilen. Alles zentriert — die einzige durchgehend zentrierte Kachelfamilie
  der Site.
- Farbe/Fläche: Bewusster Schachbrett-Wechsel Orange / Warmgrau / Foto / Near-Black.
  Zwei Kacheln sind vollflächig Orange — das ist der großzügigste Farbeinsatz aller
  gelesenen Seiten und widerspricht dem sonst sehr sparsamen Akzentgebrauch.
- Abstände/Rhythmus: Kachelabstand ca. 22 px, Innenabstand ca. 35 px oben und ca. 35 px
  unten. Sehr dicht gepackt, danach ca. 190 px Luft.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Benefit-Bento mit wechselnden Flächentypen

### 26 — System-Split mit Iso-Illustration [waermepumpe__-desktop-02-y750.png | waermepumpe__-desktop-04-y2250.png | waermepumpe__-mobile-00-fold.png]
- Anordnung: **Illustration links, Text rechts** — gespiegelt gegenüber der Startseite,
  wo die Illustration rechts steht. Textspalte ab ca. 830 px (ca. 460 px breit), Iso-Haus
  links auf weißem Grund ohne Himmelsverlauf. Der zugehörige Textlink steht darunter
  rechtsbündig auf ca. 915 px (`waermepumpe__-desktop-04-y2250.png`).
- Buttons/Komponenten: Kein gefüllter Button, nur der unterstrichene Bold-Textlink
  „Zum Energiesystem". Im Fließtext mehrere **orange Inline-Links** ohne Unterstreichung
  („Solaranlage", „Stromspeicher", „Ampere.IQ") — dichter gesetzt als anderswo, drei
  Stück in einem Absatz.
- Typo: Eyebrow orange ca. 16 px Regular. H2 ca. 44 px Regular, zweizeilig. Fließtext
  ca. 16 px, sechs Zeilen. Kleinere Stufe als die Startseiten-H2 (dort ca. 54 px).
- Farbe/Fläche: Weiß ohne Verlauf — die Illustration steht ohne Himmel-Hintergrund, was
  sie flacher und technischer wirken lässt als auf `/`.
- Abstände/Rhythmus: Ca. 190 px Kachelraster bis zum Eyebrow, ca. 30 px Eyebrow zu H2,
  ca. 55 px H2 zu Text. Illustration ca. 420 px hoch.
- Mobil: gestapelt, Text **über** Illustration, Eyebrow orange sichtbar im Fold-Anschnitt
  (`waermepumpe__-mobile-00-fold.png`). Die Reihenfolge kehrt sich also um: desktop Bild
  zuerst (links), mobil Text zuerst.
- Pattern: Kandidat: Isometrische Illustrations-Erklärsektion (Spiegelvariante ohne
  Himmelsverlauf)

### 27 — App-Split, Phone-Mockup [waermepumpe__-desktop-04-y2250.png | -]
- Anordnung: Text links ab 140 px (ca. 555 px breit), rechts ein freigestelltes
  Phone-Mockup bei ca. 933–1100 px — also nur ca. 167 px breit und damit **auffällig
  klein** gegenüber der Textspalte. Es steht ohne Rahmen, ohne Fläche, ohne Schatten
  frei auf Weiß, vertikal etwa auf Texthöhe.
- Buttons/Komponenten: Keine Buttons. Ein oranger Inline-Link im ersten Satz. Der
  Screenshot im Mockup ist im gelesenen Shot **nicht lesbar** (Diagramm-Achsen und
  Beschriftungen zu klein).
- Typo: Eyebrow orange ca. 16 px. H2 ca. 44 px Regular, dreizeilig — sie bricht früh um,
  obwohl rechts Platz wäre. Fließtext ca. 16 px, acht Zeilen, ungewöhnlich lang für diese
  Site.
- Farbe/Fläche: Weiß. Akzent nur in Eyebrow und Inline-Link. Direkt darunter folgt ein
  **randloses Vollbreiten-Foto** (1440 × 690 px) ohne Rundung, ohne Text, ohne Overlay —
  ein reiner Bild-Atemzug zwischen zwei Textsektionen.
- Abstände/Rhythmus: Ca. 200 px vom Textlink darüber zum Eyebrow, ca. 55 px H2 zu Text,
  ca. 125 px bis zur Fotokante.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Text-Split mit klein freigestelltem Phone-Mockup

### 28 — Kostenvergleichs-Balken [waermepumpe__-desktop-07-y4500.png | -]
- Anordnung: Eine breite Grafik (ca. 190–1250 px) aus vier vertikalen Segmenten
  nebeneinander, deren **Farbsättigung von links nach rechts zunimmt** (blass Pfirsich →
  kräftig Orange). Jedes Segment trägt oben eine Beschriftung, unten eine Fußzeile mit
  den Rechengrößen. Ganz rechts steht der Ergebniswert deutlich größer. Unter der Grafik
  eine Zeile mit Label links und Summe rechts, über die volle Breite verteilt.
- Buttons/Komponenten: Keine Buttons. Die Segmente sind reine Flächen ohne Rundung, ohne
  Abstand zueinander — sie stoßen aneinander wie ein gestapelter Balken.
- Typo: Segmentköpfe ca. 17 px Regular, Fußzeilen ca. 13 px Regular (klein, aber lesbar).
  Der Ergebniswert ca. 26 px Bold. Die Abschlusssumme ca. 30 px Bold rechtsbündig, das
  zugehörige Label ca. 19 px Regular linksbündig — Label und Zahl liegen also über
  1.000 px auseinander auf derselben Zeile.
- Farbe/Fläche: Der einzige Ort im Atlas, an dem Orange als **Sättigungsverlauf über
  mehrere Stufen** eingesetzt wird statt als eine flache Akzentfarbe.
- Abstände/Rhythmus: Ca. 65 px Grafik bis zur Summenzeile, ca. 220 px bis zur nächsten
  Sektion — eine sehr große Pause nach der Zahlenlast.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Gestufter Kostenbalken mit Sättigungsverlauf

### 29 — Förder-Panel und Plus-Kacheln [waermepumpe__-desktop-07-y4500.png | -]
- Anordnung: Ein warmgraues Panel über die Containerbreite (1160 × 640 px, Radius ca.
  6 px geschätzt) mit Zweispalter innen: links Eyebrow, H2 und — **weit darunter**, mit
  einer auffälligen Lücke von ca. 130 px — der Fließtext; rechts eine freigestellte
  Produktgruppe (zwei Geräte) mit einer kleinen Textliste darüber. Darunter zwei
  Kacheln nebeneinander im Verhältnis ca. 2:1 (Foto-Kachel breit links, orange Kachel
  schmal rechts).
- Buttons/Komponenten: Die Aktion ist hier eine **eigene Komponente**: ein oranger
  gefüllter Kreis (ca. 44 px) mit weißem Plus, links daneben das Label „Mehr erfahren"
  in dunklem bzw. weißem Regular — also derselbe Kreis-Pfeil-Mechanismus wie im
  Home-Produktslider, nur mit Plus statt Pfeil. Er sitzt in allen drei Blöcken unten
  rechts. In der Foto-Kachel überlappt der Kreis das Label leicht.
- Typo: Panel-Eyebrow ca. 16 px Regular **Grau, nicht orange** — die Site führt beide
  Eyebrow-Varianten parallel. H2 ca. 44 px Regular, vierzeilig. Fließtext ca. 16 px.
  In den Kacheln: kleiner Eyebrow weiß ca. 16 px, Titel ca. 38 px Regular, Fließtext
  ca. 16 px. Die orange Kachel setzt ihren Titel **zentriert**, die Foto-Kachel
  linksbündig — inkonsistent innerhalb einer Reihe.
- Farbe/Fläche: Warmgraues Panel, darunter Near-Black-Foto neben Orange-Vollfläche.
  Die Förder-Prozentzahl in der Produktgrafik ist die einzige orange Textzeile im Panel.
- Abstände/Rhythmus: Innenabstand des Panels ca. 48 px links, ca. 55 px oben. Die große
  Lücke zwischen H2 und Fließtext ist ungefüllt und wirkt wie ein Vertical-Align-Artefakt.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-OFFER-PAIR` (für die beiden Kacheln) — Kandidat: Panel mit Plus-Kreis-Aktion

### 30 — Partner-Logoreihe [waermepumpe__-desktop-11-y7500.png | -]
- Anordnung: Sechs Herstellerlogos in einer Zeile, gleichmäßig verteilt zwischen ca. 190
  und 1260 px, vertikal auf einer gemeinsamen Mittelachse. Kein Rahmen, keine Kachel,
  keine Trennlinien.
- Buttons/Komponenten: keine. Die Logos sind **nicht** entsättigt oder auf eine Farbe
  normalisiert — sie stehen in ihren Originalfarben (Schwarz, Grün, Blau, Rot)
  nebeneinander, unterschiedlich groß und unterschiedlich schwer. Das ist visuell
  unruhig, aber markenehrlich.
- Typo: keine eigenen Textelemente (Wortmarken sind Teil der Logos).
- Farbe/Fläche: Weiß.
- Abstände/Rhythmus: Ca. 100 px Luft unter der Reihe, dann harte Kante zum dunklen Band.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-PROOF-STRIP`

### 31 — Dunkles Aktionsband mit orangem CTA [waermepumpe__-desktop-11-y7500.png | -]
- Anordnung: Near-Black-Band über die volle Breite (ca. 510 px hoch) mit hartem Wechsel
  von Weiß. Innen ein Zweispalter mit sehr ungleicher Gewichtung: links H2, Fließtext und
  ein Textlink (ab 140 px, ca. 760 px breit), rechts nur der Button bei ca. 1055 px —
  und dieser sitzt **auf Höhe der Fließtextmitte**, nicht auf H2-Höhe.
- Buttons/Komponenten: Oranges gefülltes Rechteck „Jetzt beraten lassen!", Radius ca.
  4 px (geschätzt), Label **dunkel** auf Orange, Höhe ca. 60 px. Darunter im linken Block
  der weiße unterstrichene Bold-Textlink „SG-Ready Wärmepumpen" — dunkles Band mit zwei
  Aktionsstufen nebeneinander.
- Typo: H2 ca. 44 px Regular Weiß, zweizeilig. Fließtext ca. 16 px Regular in hellem
  Grau, drei Zeilen. Textlink ca. 16 px Bold Weiß. Kein Eyebrow.
- Farbe/Fläche: Near-Black als Fläche, Orange als einzige Farbe. Das ist die
  **Gegenvariante zum Home-Abschlussband** (Sektion 16), das bewusst ohne Orange
  auskommt — hier trägt derselbe Flächentyp einen vollen Akzent-Button.
- Abstände/Rhythmus: Ca. 140 px Bandoberkante zur H2, ca. 70 px H2 zu Text, ca. 55 px
  Text zu Link, ca. 175 px bis zur Bandunterkante.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID`

### 32 — Zentrierter Sektionskopf mit Vollbild-Split [waermepumpe__-desktop-11-y7500.png | -]
- Anordnung: Nach dem Band ein zentrierter Kopf auf Weiß (Eyebrow, H2 zweizeilig,
  Subline zweizeilig, alles mittig), darunter eine breite Bildfläche, aus deren rechter
  Kante ein **Phone-Mockup halb herausragt** — es überlappt die Bildkante und steht zur
  Hälfte auf Weiß. Der Übergang zwischen Bild und Mockup ist ohne Rahmen gebaut.
- Buttons/Komponenten: Keine Buttons. Das Mockup ist diesmal groß (ca. 265 px breit) und
  sein Dashboard-Screenshot ist teilweise lesbar (Prozentwerte, Ringdiagramm); die
  Kleinbeschriftungen darunter sind **nicht lesbar**.
- Typo: Eyebrow orange ca. 16 px Regular, zentriert. H2 ca. 44 px Regular, zweizeilig,
  zentriert. Subline ca. 17 px Regular Grau, zweizeilig, zentriert. Damit ist dies die
  einzige Sektion der Route mit vollständig zentriertem Kopf.
- Farbe/Fläche: Weiß, das Foto bringt Himmelblau und Grün als einzige Fremdfarben.
- Abstände/Rhythmus: Ca. 140 px Bandkante zum Eyebrow, ca. 55 px Eyebrow zu H2, ca. 55 px
  H2 zu Subline, ca. 90 px bis zum Bildband.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Zentrierter Kopf mit überlappendem Mockup am Bildrand

### 33 — Abschlussband und Footer [waermepumpe__-desktop-16-y10740.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band, linksbündige H2,
  unterstrichener Bold-Link, drei Auszeichnungs-Logos, Fünf-Spalten-Footer). Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /unternehmen/

### 34 — Header / Navigationsleiste [unternehmen__-desktop-00-fold.png | unternehmen__-mobile-00-fold.png]
- Identisch zu Sektion 01 der Startseite (Logo links, sechs Nav-Punkte mit zwei
  Chevron-Dropdowns, Text-Link „Kundenportal", genau ein oranger Rechteck-CTA
  „Ersparnis berechnen" rechts). Einzige Abweichung: die Leiste ist hier **weiß
  hinterlegt** und steht als eigene Zeile **über** dem Hero-Foto, das erst unter ihr
  beginnt — wie auf `/waermepumpe/` und anders als auf `/`, wo sie transparent im Foto
  liegt. Der aktive Nav-Punkt „Über uns" trägt eine kurze dunkle Unterstreichung direkt
  unter dem Label; die Startseite zeigt keinen aktiven Zustand. CTA-Fläche gemessen
  `#ef870e` (`unternehmen__-desktop-00-fold.png` bei 1316/30). Mobil wie Sektion 01:
  Logo links, „Menu" plus Burger rechts, kein CTA in der Leiste. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 35 — Hero, Foto mit Lead-Absatz [unternehmen__-desktop-00-fold.png | unternehmen__-mobile-00-fold.png]
- Anordnung: Vierstufig wie der Wärmepumpen-Hero (Eyebrow, H1, Lead, CTA), Textspalte
  linksbündig ab ca. 140 px auf ca. 490 px Breite. Das Foto beginnt erst unter der
  weißen Leiste bei ca. y=95 und läuft randlos bis zur Fold-Unterkante; es endet nicht
  im Fold, sondern zieht sich noch ca. 340 px weiter
  (`unternehmen__-desktop-02-y750.png` zeigt die Unterkante bei ca. y=1090 Gesamt-Scroll).
  **Kein Bewertungs-Proof**, keine gerundete weiße Überlappungsfläche am unteren Rand —
  das Foto endet hier mit **harter gerader Kante** direkt auf Weiß, anders als auf `/`
  und `/waermepumpe/`, wo eine gerundete Fläche ins Bild schiebt. Der Motivfokus (Monteur
  von hinten am PV-Modul) liegt rechts der Mitte, die Textspalte im dunklen Bildbereich.
- Buttons/Komponenten: Genau ein CTA „Zu unserer Vision", oranges gefülltes Rechteck
  (gemessen `#ef870e`), Radius ca. 4 px (geschätzt), Label **dunkel bis schwarz** auf
  Orange — dieselbe Hero-Variante wie auf `/` und `/waermepumpe/`, nicht die helle
  Label-Variante des Header-Buttons. Höhe ca. 58 px, Breite ca. 180 px (geschätzt),
  kein Icon, keine Kontur.
- Typo: Eyebrow „Über uns" eine orange Zeile ca. 17 px Regular, ohne Caps, ohne
  Letterspacing, ohne Pille. H1 ca. 62 px Regular Weiß, **dreizeilig** und damit die
  höchste Hero-Textmasse der fünf Routen. Lead ca. 17 px Regular Weiß, drei Zeilen, auf
  ca. 490 px Breite umgebrochen. Verhältnis H1 zu Lead rund 3,6:1 (geschätzt).
  Kein Bold in der gesamten Textspalte.
- Farbe/Fläche: Sehr dunkles Foto — die linke Bildhälfte ist ein fast schwarzes PV-Modul,
  gemessen `#43474b` an einer mittleren Stelle (`unternehmen__-desktop-04-y2250.png` bei
  700/300 im weitergescrollten Anschnitt). Der Wash ist hier schwächer nötig als auf `/`,
  weil das Motiv selbst dunkel ist. Akzent in exakt zwei Punkten: Eyebrow und CTA-Fläche;
  dazu das orange Logo-Signet auf dem Hoodie des Monteurs — ein Marken-Akzent **im Motiv**
  statt im Layout, das gibt es auf keiner anderen Route.
- Abstände/Rhythmus: Ca. 155 px von der Leistenunterkante bis zur Eyebrow, ca. 30 px
  Eyebrow zu H1, ca. 55 px H1-Unterkante zu Lead, ca. 45 px Lead zu CTA, danach noch
  ca. 165 px Foto bis zur Fold-Unterkante. Links ca. 140 px Rand wie überall.
- Mobil: identisch gestapelt und **gleiches Motiv** wie desktop
  (`unternehmen__-mobile-00-fold.png`). H1 dreizeilig ca. 27 px, Lead vierzeilig ca. 15 px,
  CTA linksbündig ca. 44 px hoch. Das Foto endet auch mobil mit gerader Kante bei ca.
  y=520, danach beginnt unmittelbar Weiß mit der Folgesektion — mobil ist bereits im Fold
  der Beginn von Sektion 36 sichtbar (Eyebrow „Top Player" plus H2), was auf `/` und
  `/waermepumpe/` nicht der Fall ist.
- Pattern: `P-HERO-PHOTO`

### 36 — Zweispalter Text und Jahres-Zeitsprung mit Pfeil [unternehmen__-desktop-02-y750.png | unternehmen__-mobile-00-fold.png]
- Anordnung: Zwei ungleiche Textblöcke übereinander. Oben ein Zweispalter mit H2 links
  (ab 140 px, ca. 400 px breit) und einem langen Fließtextblock rechts (ab ca. 615 px,
  ca. 680 px breit) — **kein Bild, keine Fläche, keine Karte**, reine Typografie auf Weiß.
  Darunter ein zweiter Zweispalter, der zwei Zeitpunkte gegenüberstellt: links „2018"
  ab 140 px, rechts „2025" ab ca. 883 px, und **exakt in der Mitte dazwischen ein großer
  oranger Pfeil nach rechts** (ca. 55 px breit, bei ca. 668/937 gemessen `#ef870e`). Der
  Pfeil ersetzt jede Verbindungslinie und trägt die ganze Zeit-Semantik.
- Buttons/Komponenten: **Keine Buttons, keine Links, keine Icons** außer dem einen
  Richtungspfeil. Das ist die button-freieste Sektion der Route.
- Typo: Eyebrow „Top Player" orange ca. 17 px Regular. H2 ca. 44 px Regular Near-Black,
  zweizeilig, bricht früh um obwohl die Spalte breiter wäre. Fließtext rechts ca. 17 px
  Regular in dunklem Grau, sieben Zeilen. In der Zeitsprung-Reihe: Jahreszahl orange
  ca. 17 px Regular (nicht groß, nicht Bold — die Zahl ist ein Eyebrow, keine Headline),
  darunter eine Zwischenüberschrift ca. 22 px Regular Near-Black, darunter Fließtext
  ca. 16 px. Rechts stehen zwei Absätze, links nur einer — die Spalten sind bewusst
  ungleich lang und werden nicht auf gleiche Höhe gezogen.
- Farbe/Fläche: Reines Weiß ohne jede Fläche, ohne Trennlinie, ohne Rahmen. Akzent nur in
  den beiden Jahreszahlen, dem Eyebrow und dem Pfeil.
- Abstände/Rhythmus: Ca. 130 px von der Fotokante zum Eyebrow, ca. 25 px Eyebrow zu H2,
  ca. 270 px von der H2-Unterkante bis zur Zeitsprung-Reihe — eine sehr große leere
  Fläche unter der H2, weil die linke Spalte kurz und die rechte lang ist. Der Pfeil
  sitzt vertikal auf Höhe der Jahreszahlen, nicht mittig zum Textblock.
- Mobil: gestapelt (`unternehmen__-mobile-00-fold.png` zeigt Eyebrow und H2 im
  Fold-Anschnitt, `unternehmen__-mobile-06-y2110.png` den Fließtext). Die beiden
  Jahresblöcke stehen mobil **untereinander**; der orange Rechtspfeil ist in den
  gelesenen Mobil-Slices **nicht sichtbar** — er entfällt oder rotiert, das ist nicht
  belegt und wird als „nicht belegt" geführt.
- Pattern: Kandidat: Zeitsprung-Zweispalter mit Akzentpfeil als einzigem Bildelement

### 37 — Stats-Band auf Warmgrau [unternehmen__-desktop-04-y2250.png | unternehmen__-mobile-06-y2110.png]
- Anordnung: Drei Zahlenblöcke nebeneinander auf einer vollbreiten warmgrauen Fläche,
  linksbündig ab 140 px, Spaltenbreiten ungleich (ca. 420 / 340 / 370 px). Jeder Block
  ist dreistufig gestapelt: riesige Zahl, darunter ein fettes Label, darunter ein
  mehrzeiliger Belegsatz. Die Blöcke sind **nicht** als Karten abgesetzt — keine Kontur,
  kein Schatten, keine Trennlinie, nur Spaltenabstand.
- Buttons/Komponenten: Keine Buttons, keine Icons. Die Einheit hängt als **hochgestellter
  Zusatz** an der Zahl: „45.000⁺", „90^Mio €", „15⁺" — Superscript statt eigener Zeile,
  optisch an der Oberkante der Ziffern ausgerichtet.
- Typo: Zahl ca. 78 px Regular Near-Black (nicht Bold — dieselbe leichte Schnittstärke
  wie die Headlines, dadurch wirkt das Band ruhig statt marktschreierisch). Superscript
  ca. 26 px. Label ca. 17 px **Bold** — eine der wenigen Bold-Stellen der Site. Belegsatz
  ca. 16 px Regular in dunklem Grau, zwei bis drei Zeilen. Die drei Belegsätze sind
  unterschiedlich lang und werden nicht ausgeglichen.
- Farbe/Fläche: Warmgrau vollflächig, gemessen `#e9e9e6` (`unternehmen__-desktop-12-y8250.png`
  bei 157/1035 und 700/1200 identisch; dieselbe Fläche wie im Stats-Band). **Kein Orange
  in der gesamten Sektion** — der Akzent pausiert, obwohl es die Beweis-Sektion der Seite
  ist. Der Wechsel von Weiß zu Warmgrau ist eine harte Kante ohne Rundung.
- Abstände/Rhythmus: Ca. 145 px Bandoberkante bis zur Zahlenoberkante, ca. 55 px Zahl zu
  Label, ca. 12 px Label zu Belegsatz, ca. 165 px bis zur nächsten Sektion im selben Band.
  Spaltenabstand ca. 80 px.
- Mobil: gestapelt, ein Block pro Zeile (`unternehmen__-mobile-06-y2110.png`). Die Zahl
  bleibt auffällig groß (ca. 52 px) und behält das hochgestellte „+"; Label und Belegsatz
  rücken darunter. Die warmgraue Fläche beginnt mobil mit derselben harten Kante. Die drei
  Blöcke laufen mobil über mehr als eine Bildschirmhöhe — aus dem kompakten Beweis-Band
  wird eine lange Liste.
- Pattern: `P-PROOF-STRIP` (Lücke: drei Zahlen mit Belegsatz auf Warmgrau statt Logo-Reihe)

### 38 — Deutschlandkarte mit Foto-Bubbles [unternehmen__-desktop-04-y2250.png | unternehmen__-desktop-06-y3750.png | -]
- Anordnung: Im selben warmgrauen Band. Oben ein Zweispalter (H2 links ab 140 px, ca.
  420 px breit; Fließtext rechts ab ca. 615 px, ca. 630 px breit), darunter **zentriert**
  eine große Deutschlandkarte als Illustration, ca. 500 px breit und über 700 px hoch. Auf
  der Karte sitzen ca. 14 kleine weiße Kreise mit orangem Plus als Standort-Marker, dazu
  drei große kreisrunde **Foto-Bubbles** mit weißem Rand und Sprechblasen-Spitze, die die
  Kartenkontur nach links, rechts und unten überragen. Die Bubbles zeigen echte Fotos
  (Monteure auf dem Dach, Büroraum, Berater am Telefon) und sind an ihren Spitzen mit
  einem Kartenpunkt verbunden.
- Buttons/Komponenten: Keine Buttons. Die Plus-Marker sind nicht die Plus-Kreis-Aktion aus
  Sektion 29 — sie sind kleiner (ca. 26 px), weiß gefüllt mit orangem Plus statt orange
  gefüllt mit weißem Plus, und tragen kein Label.
- Typo: Eyebrow „EKD vor Ort" orange ca. 17 px Regular. H2 ca. 44 px Regular Near-Black,
  dreizeilig. Fließtext ca. 17 px Regular, fünf Zeilen. **Auf der Karte selbst steht kein
  einziges Wort** — keine Städtenamen, keine Zahlen, keine Legende. Die Karte ist reine
  Fläche plus Marker.
- Farbe/Fläche: Die Kartenfläche ist die **einzige große Orangefläche der Route**,
  gemessen `#ef870e` an einer vollen Stelle; sie ist nicht flach, sondern mit hellen
  Punkten gerastert (Halbton-Optik), die zu den Rändern hin dichter werden. Grund bleibt
  Warmgrau `#e9e9e6`. Bubble-Ränder und Marker in Weiß.
- Abstände/Rhythmus: Ca. 165 px Stats-Band zu Eyebrow, ca. 25 px Eyebrow zu H2, ca. 115 px
  H2-Unterkante bis Kartenoberkante, ca. 175 px Kartenunterkante bis zum Bandende. Die
  Karte allein füllt mehr als eine halbe Viewporthöhe.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-MAP` (Lücke: Illustrationskarte in Akzentfarbe mit Foto-Bubbles statt
  eingebetteter Kartendienst)

### 39 — Zentrierter Textblock ohne Bild [unternehmen__-desktop-06-y3750.png | -]
- Anordnung: Nach der harten Kante zurück auf Weiß ein vollständig **zentrierter**
  Textblock: Eyebrow, H2, ein siebenzeiliger Absatz, alles auf der Mittelachse, Textbreite
  ca. 760 px. Kein Bild, keine Fläche, kein Button, keine Karte — die einzige rein
  typografische Vollsektion der Route.
- Buttons/Komponenten: Keine. Auch kein Textlink.
- Typo: Eyebrow „Volle Expertise" orange ca. 17 px Regular zentriert. H2 ca. 44 px Regular
  Near-Black, einzeilig. Absatz ca. 17 px Regular, sieben Zeilen, mittig gesetzt mit
  flatterndem Rand — der Fließtext ist zentriert, nicht im Blocksatz, die letzte Zeile
  steht als kurzes Wort allein.
- Farbe/Fläche: Weiß. Akzent nur im Eyebrow.
- Abstände/Rhythmus: Ca. 135 px Bandkante zum Eyebrow, ca. 30 px Eyebrow zu H2, ca. 45 px
  H2 zu Absatz, ca. 140 px bis zur Folgesektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Zentrierter Fließtextblock ohne Bild als Sektionspause

### 40 — Partner-Split mit Häkchenliste [unternehmen__-desktop-06-y3750.png | -]
- Anordnung: Text links ab 140 px (ca. 550 px breit), rechts ein rechteckiges Foto
  (ca. 570 × 320 px, drei Monteure) ohne Rundung und ohne Schatten, oben bündig zur
  H2-Oberkante. Unter dem Fließtext eine dreizeilige Häkchenliste, darunter der CTA —
  linksbündig gestapelt, während das Foto rechts bereits endet.
- Buttons/Komponenten: Ein CTA „Montagepartner werden", oranges gefülltes Rechteck
  (gemessen `#ef870e` bei 150/1300), Radius ca. 4 px (geschätzt), Label dunkel, Höhe ca.
  58 px. Die Listenmarker sind **orange Häkchen als dünne Linien-Glyphe** (gemessen
  `#ef8a15` bei 150/1155), kein Kreis, kein Kasten, kein Bullet — die einzige
  Häkchenliste im ganzen Atlas.
- Typo: Eyebrow „Montagepartnerunternehmen werden" orange ca. 16 px Regular — mit Abstand
  der längste Eyebrow der Site, er läuft fast über die halbe Spaltenbreite. H2 ca. 40 px
  Regular, zweizeilig. Fließtext ca. 17 px Regular, drei Zeilen. Listenzeilen ca. 17 px
  Regular, ca. 33 px Zeilenabstand.
- Farbe/Fläche: Weiß. Akzent in Eyebrow, Häkchen und CTA — dieselbe Dreier-Rollenverteilung
  wie im Hero, nur mit Häkchen statt Sternen.
- Abstände/Rhythmus: Ca. 140 px zum Eyebrow, ca. 25 px Eyebrow zu H2, ca. 60 px H2 zu Text,
  ca. 50 px Text zur Liste, ca. 70 px Liste zum CTA. Das Foto ist deutlich kürzer als die
  linke Spalte, rechts unter dem Foto bleibt ca. 190 px leere Fläche.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-OFFER-PAIR` (Lücke: Text-Foto-Split mit Häkchenliste statt zwei Karten)

### 41 — Dunkle Meilenstein-Timeline [unternehmen__-desktop-08-y5250.png | unternehmen__-desktop-10-y6750.png | -]
- Anordnung: Vollbreites Near-Black-Band (über 1.700 px hoch, das höchste Einzelband des
  Atlas). H2 linksbündig ab 140 px über die volle Breite, darunter eine **vertikale
  Timeline**, deren Achse nicht links am Rand, sondern eingerückt bei ca. 351 px sitzt.
  Jeder Eintrag: ein Ring-Punkt auf der Achse, rechts daneben ab ca. 396 px die Jahreszahl
  und darunter eine eingerückte Bullet-Liste ab ca. 425 px. Acht Einträge (2018 bis
  „Aktuell"), unterschiedlich viele Bullets pro Jahr, die Abstände zwischen den Einträgen
  wachsen mit der Anzahl der Bullets — die Achse ist nicht gleichmäßig getaktet.
- Buttons/Komponenten: Keine Buttons, keine Links. Die Marker sind **Ringe**: heller
  Außenkreis ca. 26 px (gemessen `#bcbebf` bei 351/347), darin ein gefüllter Innenpunkt —
  Donut statt Vollkreis. Die verbindende Achse ist eine dünne graue 1-px-Linie (gemessen
  `#42464a` bei 352/420), deutlich dunkler als die Ringe, also bewusst zurückgenommen.
  Bullets sind kleine graue Punkte, keine Häkchen und **nicht orange**.
- Typo: H2 ca. 42 px Regular Weiß, einzeilig über fast 1.130 px. Jahreszahl ca. 25 px
  Regular Weiß. Bullet-Zeilen ca. 17 px Regular in hellem Grau, ca. 28 px Zeilenabstand;
  längere Einträge brechen auf zwei Zeilen und werden bündig zum Bullet eingerückt. Der
  letzte Eintrag heißt „Aktuell" statt einer Jahreszahl und ist **als einziger Bold**
  gesetzt — die Gegenwart wird durch Weight markiert, nicht durch Farbe.
- Farbe/Fläche: Near-Black gemessen `#21262b` (`unternehmen__-desktop-08-y5250.png` bei
  700/700 und 700/100 identisch). **Kein einziger Akzentpunkt im gesamten Band** — die
  längste orange-freie Fläche des Atlas. Das Band endet mit harter Kante auf Weiß.
- Abstände/Rhythmus: Ca. 175 px Bandoberkante zur H2, ca. 125 px H2 zum ersten Ring,
  ca. 145 px durchschnittlicher Sprung zwischen zwei Jahreszahlen, ca. 190 px vom letzten
  Eintrag bis zur Bandunterkante.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Vertikale Ring-Timeline auf Near-Black ohne Akzentfarbe

### 42 — Karriere-Split mit Bewertungs-Siegel [unternehmen__-desktop-10-y6750.png | -]
- Anordnung: Text links ab 140 px (ca. 425 px breit), rechts ein rechteckiges Foto
  (ca. 585 × 330 px, Büroarbeitsplatz). Das Besondere: ein quadratisches Bewertungs-Siegel
  (ca. 158 × 158 px) liegt **überlappend auf der linken oberen Ecke des Fotos** und ragt
  nach oben und links über die Fotokante hinaus — dieselbe Overlap-Geste wie beim
  Phone-Mockup in Sektion 32, hier mit einem Proof-Element.
- Buttons/Komponenten: Ein CTA „Zur Karriere", oranges gefülltes Rechteck (gemessen
  `#ef870e` bei 150/720), Label dunkel, Höhe ca. 58 px, Breite ca. 138 px — der schmalste
  gefüllte CTA des Atlas. Das Siegel ist eine **fremde Marken-Komponente** (kununu): gelbe
  Fläche mit abgerundeten Ecken (gemessen `#ffc217` bei 722/462), darin Wertung, fünf
  Sterne in Dunkelblau (vier gefüllt, einer Outline), Bewertungszahl und Wortmarke. Es
  bricht die Palette bewusst — Gelb und Dunkelblau kommen sonst nirgends vor.
- Typo: Eyebrow „Gesucht: Teamplayer voller Energie!" orange ca. 17 px Regular, mit
  Ausrufezeichen — der einzige Eyebrow des Atlas mit Satzzeichen und Ansprache-Ton.
  H2 ca. 40 px Regular, einzeilig. Fließtext ca. 17 px Regular, vier Zeilen. Im Siegel:
  Wertung ca. 19 px Bold, Kleintext ca. 11 px — die **Kleinschrift im Siegel ist an der
  Auflösungsgrenze, aber noch lesbar**.
- Farbe/Fläche: Weiß. Drei Farbwelten treffen hier aufeinander: oranger CTA, gelbes
  Fremdsiegel, Foto — die unruhigste Farbstelle der Route.
- Abstände/Rhythmus: Ca. 320 px Bandkante zum Eyebrow, ca. 25 px Eyebrow zu H2, ca. 50 px
  H2 zu Text, ca. 55 px Text zum CTA, ca. 200 px bis zur nächsten Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Text-Foto-Split mit überlappendem Fremd-Bewertungssiegel

### 43 — Vision-Sektion auf Sonnenverlauf [unternehmen__-desktop-10-y6750.png | unternehmen__-desktop-12-y8250.png | -]
- Anordnung: Vollbreite Sektion mit Himmelsverlauf und einer **sehr großen, weich
  ausgeblendeten orangen Sonnenscheibe** oben in der Mitte (Durchmesser ca. 490 px,
  gemessen `#f5a841` im Kern bei 700/1150) sowie Wolken-Blur am linken Rand. Text links
  ab ca. 158 px, rechts die isometrische Haus-Illustration mit Solardach, Speicher,
  Wärmepumpe und Ladesäule, verbunden durch orange und blaue Leitungslinien. Anders als
  in Sektion 04 steht die Illustration hier **auf einer hellen Bodenplatte** mit
  Schlagschatten, nicht frei im Verlauf.
- Buttons/Komponenten: Ein CTA „Beratung zum Energiesystem", oranges gefülltes Rechteck,
  Label dunkel, Höhe ca. 58 px, Breite ca. 275 px — der breiteste CTA des Atlas.
  Über der H2 steht die Wortmarke „EKD 365⁺" als eigenes Element (ca. 30 px, das „365"
  in leichterem Schnitt, das Plus hochgestellt und orange) — eine Produktmarke in der
  Eyebrow-Position statt eines Eyebrow-Satzes.
- Typo: Wortmarke ca. 30 px gemischt. H2 „Unsere Vision vom perfekten Energiesystem"
  ca. 50 px Regular Near-Black, vierzeilig, sehr früh umgebrochen. Fließtext ca. 17 px
  Regular, fünf Zeilen, auf ca. 520 px Breite. Kein Bold.
- Farbe/Fläche: Verlauf von blassem Pfirsich oben nach fast Weiß unten, Grund unter der
  Illustration gemessen `#e9e9e6`-nah bzw. `#ffffff` (700/1200 im Folgeslice). Orange nur
  in Sonne, Leitungslinien, Wortmarken-Plus und CTA. Der Verlauf beginnt mit einer
  **harten Oberkante** auf Weiß, endet aber weich.
- Abstände/Rhythmus: Ca. 200 px Sektionsoberkante bis zur Sonne, ca. 300 px bis zur
  Wortmarke, ca. 40 px Wortmarke zu H2, ca. 70 px H2 zu Text, ca. 55 px Text zum CTA,
  ca. 480 px leere Verlaufsfläche unter dem CTA bis zur nächsten Sektion — die größte
  ungefüllte Fläche des Atlas.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Isometrische Illustrations-Erklärsektion auf Himmelsverlauf
  (Vision-Variante mit Produkt-Wortmarke statt Eyebrow)

### 44 — CEO-Zitat mit Porträt [unternehmen__-desktop-12-y8250.png | -]
- Anordnung: Warmgraues Band. Text links ab 140 px (ca. 735 px breit), rechts ein
  **hochformatiges Porträtfoto** (ca. 370 × 370 px, quadratisch), oben etwa auf Höhe der
  Zitatoberkante. Über dem Zitat sitzt eine Anführungszeichen-Glyphe, linksbündig auf
  derselben Achse wie der Text — nicht zentriert wie in den Zitat-Sektionen von
  `/kundenerfahrungen/`.
- Buttons/Komponenten: Keine Buttons, kein Link. Die Anführungszeichen-Glyphe ist ein
  eigenständiges Grafikelement (ca. 30 px, **orange** gemessen `#935308` an einer
  abgeschatteten Stelle bei 296/393 — der Grundton ist derselbe Akzent-Orange, der
  Messpunkt liegt auf der Glyphenkante). Das Porträt hat weder Rundung noch Rahmen
  noch Schatten.
- Typo: Zitat ca. 40 px Regular Near-Black, dreizeilig, **ohne Anführungszeichen im Text**
  (die Glyphe darüber ersetzt sie). Name „Christian Arnold" ca. 25 px Regular, Rolle „CEO"
  ca. 16 px Regular in Grau darunter — Name und Rolle stehen linksbündig unter dem Zitat,
  ohne Avatar daneben. Das ist der Gegenentwurf zur Kundenzitat-Sektion (Sektion 47), wo
  Avatar und Name zentriert nebeneinander stehen.
- Farbe/Fläche: Warmgrau `#e9e9e6` (gemessen bei 700/1200). Akzent ausschließlich in der
  Zitat-Glyphe — ein einziger orangefarbener Punkt auf einer über 600 px hohen Fläche.
- Abstände/Rhythmus: Ca. 125 px Bandoberkante zur Glyphe, ca. 45 px Glyphe zum Zitat,
  ca. 80 px Zitat zum Namen, ca. 5 px Name zu Rolle.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-TESTIMONIAL` (Lücke: Führungs-Zitat mit Porträt statt Kundenstimme)

### 45 — Dreier-Bildkacheln mit Pfeil-Link [unternehmen__-desktop-14-y9750.png | -]
- Anordnung: Drei gleich breite Hochkant-Bilder (je ca. 370 × 455 px) in einer Reihe auf
  demselben warmgrauen Band, gleichmäßig ab 140 px verteilt, Lücke ca. 30 px. Unter jedem
  Bild linksbündig ein Titel und darunter ein Pfeil-Link — Titel und Link stehen **unter**
  der Bildfläche, nicht darauf.
- Buttons/Komponenten: Kein gefüllter Button. Die Aktion ist ein **flacher Linienpfeil**
  aus einem kurzen waagerechten Strich und einem kleinen Chevron, ca. 30 px breit, in
  Near-Black — nicht der orange gefüllte Kreis-Pfeil des Home-Sliders und nicht der
  unterstrichene Bold-Textlink. Damit führt die Site eine **dritte Link-Variante**.
  Auf jedem Foto liegt ein halbtransparentes oranges Grafik-Overlay (eckige Klammer- und
  Pfeilformen aus dem Logo-System), das über Gesichter und Motive läuft — Overlay, kein
  Bildinhalt.
- Typo: Titel ca. 25 px Regular Near-Black, einzeilig („Mehr Energie", „Mehr Autarkie",
  „Mehr Sicherheit") — gleiche Konstruktion, gleiche Länge, sauber parallel gesetzt.
  Kein Fließtext, kein Eyebrow, keine H2 über der Reihe: die Sektion hat **keine
  Überschrift**, sie schließt direkt an das CEO-Zitat an.
- Farbe/Fläche: Warmgrau `#e9e9e6`. Die Fotos bringen Grün, Himmelblau und Hauttöne;
  Akzent nur in den Bild-Overlays.
- Abstände/Rhythmus: Ca. 45 px Bildunterkante zum Titel, ca. 40 px Titel zum Pfeil,
  ca. 105 px Pfeil bis zur Bandunterkante.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY` (Lücke: drei Bildkacheln mit Linienpfeil-Link und Marken-Overlay)

### 46 — Pressekontakt-Split [unternehmen__-desktop-14-y9750.png | -]
- Anordnung: Zurück auf Weiß. Ein **eingerückter, mittig gesetzter** Zweispalter: links
  ein Hochkant-Porträt (ca. 250 × 375 px) ab ca. 340 px, rechts der Textblock ab ca.
  740 px. Beide Spalten stehen also deutlich innerhalb des sonst genutzten Containers —
  die einzige Sektion des Atlas, die nicht am 140-px-Raster links beginnt.
- Buttons/Komponenten: Ein CTA „Zu den Presse-News", oranges gefülltes Rechteck (gemessen
  `#ef870e` bei 750/1110), Label dunkel, Höhe ca. 58 px. Im Textblock steht eine
  **orange E-Mail-Adresse als Inline-Link** ohne Unterstreichung.
- Typo: Eyebrow ist hier ein **Personenname** in Orange, ca. 17 px Regular — nicht ein
  Kategorie- oder Nutzenwort wie sonst. H2 „Pressekontakt" ca. 40 px Regular, einzeilig.
  Darunter drei kurze Textzeilen ca. 17 px Regular mit einem Zeilenumbruch zwischen
  „Julia Neuer" und „E-Mail:" — Kontaktdaten als Fließtext, nicht als Liste oder Tabelle.
- Farbe/Fläche: Weiß. Akzent in Eyebrow, Mail-Link und CTA.
- Abstände/Rhythmus: Ca. 155 px Bandkante zum Porträt, ca. 45 px Eyebrow zu H2, ca. 80 px
  H2 zu Text, ca. 75 px Text zum CTA, ca. 105 px bis zur Magazin-Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Eingerückter Kontakt-Split mit Person als Eyebrow

### 47 — Magazin-Laufschrift und Artikelkarten [unternehmen__-desktop-14-y9750.png | unternehmen__-desktop-16-y11250.png | -]
- Anordnung: Über der Artikelreihe läuft das Wort „Magazin" mehrfach wiederholt als
  **randlose Laufschrift** über die volle Breite und wird rechts angeschnitten — reine
  Outline-Typografie ohne Füllung, ca. 130 px hoch, als Deko-Band statt als Überschrift.
  Darunter drei gleich breite Artikelkarten (je ca. 350 px) ab ca. 128 px: Bild oben
  (ca. 350 × 230 px), Titel darunter, Datum ganz unten. Unter der Reihe **zentriert** ein
  CTA.
- Buttons/Komponenten: Ein CTA „Zum Magazin", oranges gefülltes Rechteck (gemessen
  `#ef870e` bei 660/530 im Folgeslice), Label dunkel, Höhe ca. 58 px, mittig — der einzige
  zentrierte gefüllte CTA der Route. Die Karten haben **keine Fläche, keinen Rahmen,
  keinen Schatten**; sie sind nur Bild plus Text. Der dritte Titel ist **unterstrichen**,
  die ersten beiden nicht — vermutlich ein Hover-/Fokuszustand im Capture, als
  Zustandsunterschied notiert, nicht als Stil.
- Typo: Laufschrift ca. 130 px, nur Kontur in hellem Grau (gemessen `#aaaaaa` an einer
  Konturstelle bei 200/1350). Kartentitel ca. 22 px Regular Near-Black, zwei bis drei
  Zeilen, unterschiedlich lang und **nicht auf gleiche Höhe ausgeglichen** — dadurch
  stehen die Datumszeilen der drei Karten auf drei verschiedenen Höhen. Datum ca. 16 px
  Regular in Grau.
- Farbe/Fläche: Weiß. Akzent nur im CTA.
- Abstände/Rhythmus: Ca. 100 px Laufschrift bis zur Bildoberkante, ca. 40 px Bild zum
  Titel, ca. 30 px Titel zum Datum, ca. 95 px bis zum CTA, ca. 150 px bis zum
  Abschlussband.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY` (Lücke: Artikelkarten ohne Kartenfläche) — Kandidat: Outline-
  Laufschrift als Sektionskopf

### 48 — Abschlussband und Footer [unternehmen__-desktop-16-y11250.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band gemessen `#21262b` bei
  700/900, linksbündige H2 „Bessere Energie für Ihr Zuhause. Das ganze Jahr.",
  unterstrichener Bold-Link „Broschüre herunterladen", drei Auszeichnungs-Logos in Gold;
  darunter der Fünf-Spalten-Footer mit Logo links und vier Linkspalten). Keine sichtbare
  Abweichung. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /kundenerfahrungen/

### 49 — Header / Navigationsleiste [kundenerfahrungen__-desktop-00-fold.png | kundenerfahrungen__-mobile-00-fold.png]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste als eigene
  Zeile über dem Inhalt, Logo links, sechs Nav-Punkte, „Kundenportal" als Text-Link, genau
  ein oranger Rechteck-CTA „Ersparnis berechnen" rechts (gemessen `#ef870e` bei 1316/47).
  Aktiver Nav-Punkt ist hier „Kundenerfahrungen", ebenfalls mit kurzer dunkler
  Unterstreichung. Mobil wie Sektion 01. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 50 — Hero, Textspalte neben Foto-Collage [kundenerfahrungen__-desktop-00-fold.png | kundenerfahrungen__-mobile-00-fold.png]
- Anordnung: **Der einzige Hero des Atlas ohne Vollbild-Foto.** Statt eines
  durchgehenden Motivs steht rechts eine Collage aus neun einzelnen Fotos
  unterschiedlicher Größe und Ausrichtung (ca. 890–1265 px), die zu einem unregelmäßigen
  Mosaik ineinandergreifen: Quer- und Hochformate, ein kleines Quadrat, versetzte Kanten,
  kein gemeinsames Raster und keine gemeinsame Grundlinie. Links die vierstufige
  Textspalte ab ca. 178 px. Der ganze Hero liegt auf einer **eigenen hellen Fläche mit
  abgerundeten Ecken** (ab ca. x=88 bis x=1352, Radius ca. 20 px geschätzt), die vom
  weißen Seitengrund abgesetzt ist — der Hero ist hier eine Karte, kein randloses Band.
  Die Fläche beginnt erst ca. 135 px unter der Leiste; darüber bleibt Weiß.
- Buttons/Komponenten: Genau ein CTA „Jetzt Kunde werden", oranges gefülltes Rechteck
  (gemessen `#ef870e` bei 200/720), Radius ca. 4 px (geschätzt), Label **dunkel**,
  Höhe ca. 58 px, Breite ca. 203 px. Kein Bewertungs-Proof im Fold — anders als auf `/`.
  Zwei der Collagenbilder tragen einen kleinen weißen Play-Dreieck-Marker unten rechts
  und weisen sie als Videostandbilder aus.
- Typo: Eyebrow „Exklusive Einblicke" orange ca. 17 px Regular ohne Caps. H1 ca. 66 px
  Regular **Near-Black statt Weiß** — die einzige dunkle H1 aller fünf Heroes, weil kein
  dunkles Foto dahinterliegt. Sie ist zweizeilig und läuft in der zweiten Zeile bis ca.
  840 px, also **unter die Collage hinein**: das Wort „Kundenerfahrungen" reicht sichtbar
  bis an die linke Kante des ersten Collagebilds und wird von diesem nicht überdeckt,
  aber optisch bedrängt. Lead ca. 17 px Regular in dunklem Grau, drei Zeilen.
- Farbe/Fläche: Heller Cremeton als Herofläche, gemessen `#fffefd` bei 263/310 — praktisch
  Weiß mit minimalem Warmstich, gegen den reinen Seitengrund `#ffffff` (300/890) nur eben
  unterscheidbar. Akzent in exakt zwei Punkten: Eyebrow und CTA.
- Abstände/Rhythmus: Ca. 215 px von der Leiste bis zur Eyebrow, ca. 35 px Eyebrow zu H1,
  ca. 75 px H1 zu Lead, ca. 105 px Lead zum CTA — der größte Abstand zwischen Lead und CTA
  im Atlas. Unter dem CTA bleiben ca. 100 px Fläche bis zur Kartenunterkante.
- Mobil: Die Collage rutscht komplett **unter** den Textblock und ist im Fold nur mit den
  obersten zwei Bildern angeschnitten (`kundenerfahrungen__-mobile-00-fold.png`). Der Hero
  verliert mobil seine abgesetzte Kartenfläche und steht auf Weiß. H1 zweizeilig ca. 27 px,
  wobei „Kundenerfahrungen" die Zeile bis an den rechten Rand füllt und dort **hart an der
  Kante endet** — ein sichtbares Enge-Problem, kein Stilmittel. Lead vierzeilig, CTA
  linksbündig ca. 62 px hoch und damit mobil größer als desktop.
- Pattern: `P-HERO-PHOTO` (Lücke: Foto-Collage auf heller Karte statt Vollbild-Motiv)

### 51 — Bewertungs- und Auszeichnungsband [kundenerfahrungen__-desktop-02-y750.png | -]
- Anordnung: Vollbreites warmgraues Band (ca. 1264 px breit, ca. 290 px hoch, ab x=88 wie
  die Herokarte) mit einem stark ungleichen Zweispalter: links nur eine zweizeilige H2
  (ab ca. 152 px), rechts **rechtsbündig** der komplette Proof-Stapel ab ca. 925 px.
  Rechts stehen von oben nach unten: fünf Sterne, Label, Kernaussage, Fußzeile, darunter
  zwei Auszeichnungs-Logos nebeneinander. Die linke Spalte bleibt darunter leer.
- Buttons/Komponenten: **Keine Buttons, kein Link** — ein reines Beweisband. Die Sterne
  sind fünf Glyphen in einer Zeile, vier gefüllt in Gold, der fünfte als **halb gefüllter
  Stern** (nicht Outline wie im Home-Hero) — die Bewertung wird hier eine Stufe genauer
  dargestellt als auf der Startseite. Die zwei Logos sitzen in eigenen **weißen Kacheln**
  (gemessen `#ffffff` bei 1013/428) auf dem warmgrauen Grund, ohne Rahmen, ohne Radius.
- Typo: H2 ca. 40 px Regular Near-Black, zwei Zeilen, jede Zeile ein abgeschlossener Satz
  mit Punkt. Rechts: Label ca. 17 px Regular, Kernaussage ca. 17 px **Bold**, Fußzeile
  ca. 17 px Regular in Grau — dieselbe dreistufige Proof-Staffelung wie im Home-Hero,
  nur zentriert statt rechtsbündig gesetzt innerhalb der rechten Spalte.
- Farbe/Fläche: Warmgrau gemessen `#e9e9e6` (bei 720/362, 410/470 und 1201/305 identisch).
  **Kein Orange im gesamten Band** — der einzige Farbeinsatz ist das Gold der Sterne und
  der beiden Auszeichnungs-Logos, das bewusst neben, nicht statt der Akzentfarbe steht.
- Abstände/Rhythmus: Ca. 105 px Bandoberkante zur H2, ca. 30 px Sterne zu Label, ca. 30 px
  Kernaussage zur Fußzeile, ca. 40 px Fußzeile zu den Logos, ca. 40 px bis zur
  Bandunterkante. Sehr kompakt für eine so breite Fläche.
- Mobil: gestapelt (`kundenerfahrungen__-mobile-05-y1688.png` zeigt das untere Ende):
  die beiden Auszeichnungs-Logos stehen mobil **untereinander statt nebeneinander**, je
  in eigener weißer Kachel, zentriert auf dem warmgrauen Band. Das Band endet mobil mit
  gerader Kante.
- Pattern: `P-PROOF-STRIP`

### 52 — Zentrierte Zitat-Sektion mit Avatar [kundenerfahrungen__-desktop-02-y750.png | kundenerfahrungen__-desktop-04-y2250.png | kundenerfahrungen__-mobile-05-y1688.png]
- Anordnung: Vollständig **zentriert** auf Weiß: eine Anführungszeichen-Glyphe auf der
  Mittelachse, darunter das Zitat, darunter eine Zeile aus rundem Avatar und daneben
  zweizeiligem Namensblock. Avatar und Text bilden zusammen eine zentrierte Gruppe — der
  Avatar steht **links neben** dem Namen, nicht darüber. Diese Sektion wiederholt sich auf
  der Seite mehrfach als Einleitung vor jeder Fallkarte (belegt in
  `kundenerfahrungen__-desktop-02-y750.png` und `kundenerfahrungen__-desktop-04-y2250.png`).
- Buttons/Komponenten: Keine Buttons, kein Link. Die Anführungszeichen-Glyphe ist ein
  eigenes Element ca. 30 px in Near-Black (gemessen `#000000` bei 719/697) — **dunkel,
  nicht orange** wie beim CEO-Zitat in Sektion 44. Der Avatar ist ein Kreis ca. 55 px,
  randlos, mit Foto gefüllt.
- Typo: Zitat ca. 42 px Regular Near-Black, ein- oder zweizeilig je nach Länge, ohne
  Anführungszeichen im Text. Name ca. 22 px Regular, Rolle bzw. Beleg darunter ca. 15 px
  Regular in Grau. Bemerkenswert: die zweite Instanz setzt statt einer Rolle einen ganzen
  Halbsatz („konnten alle ihre Herausforderungen mit EKD meistern"), der **breiter ist als
  die Namenszeile** und die zentrierte Gruppe optisch nach links verschiebt.
- Farbe/Fläche: Weiß, kein Akzent. Die Sektion trägt keinerlei Farbe — sie ist eine reine
  Zäsur zwischen den Fallkarten.
- Abstände/Rhythmus: Ca. 205 px vom Band bzw. der vorigen Karte bis zur Glyphe, ca. 55 px
  Glyphe zum Zitat, ca. 60 px Zitat zur Avatar-Zeile, ca. 105 px bis zur Fallkarte.
- Mobil: gleiche Struktur, gleiche Reihenfolge (`kundenerfahrungen__-mobile-05-y1688.png`).
  Das Zitat bricht mobil auf drei Zeilen (ca. 26 px), Avatar und Name bleiben **weiterhin
  nebeneinander** und rutschen nicht untereinander.
- Pattern: `P-TESTIMONIAL` (Zitat-Variante ohne Karte)

### 53 — Kunden-Fallkarte, Foto und Datenblock [kundenerfahrungen__-desktop-02-y750.png | kundenerfahrungen__-desktop-04-y2250.png | kundenerfahrungen__-desktop-06-y3750.png | -]
- Anordnung: Die Kernkomponente der Route, mindestens dreimal wiederholt. Eine breite
  Karte (ca. 140–1250 px, über 700 px hoch) mit **hartem Zweispalter ohne Lücke**: links
  ein randlos anschließendes Hochformat-Foto (ca. 545 px breit), rechts ein weißes
  Textfeld. Das Foto sitzt bündig in der Kartenkante — keine Innenabstände, kein Rahmen
  zwischen Bild und Textfeld. Der Textbereich staffelt von oben: Titel, Chip-Reihe,
  Fließtext, große Ersparnis-Zahl mit Label, ganz unten rechts die Aktion.
- Buttons/Komponenten: Zwei Komponenten. (a) **Chips**: Rechtecke mit dünner oranger
  Kontur und orangem Label auf Weiß, Radius ca. 4 px (geschätzt), Höhe ca. 38 px,
  Innenabstand ca. 14 px, Lücke ca. 12 px — reine Outline-Chips ohne Füllung, in einer
  Zeile; bei fünf Chips bricht der letzte auf **zwei Zeilen innerhalb des Chips** um und
  wird dadurch höher als seine Nachbarn (belegt in
  `kundenerfahrungen__-desktop-02-y750.png`), ein sichtbarer Umbruchfehler. (b) Die Aktion
  ist der **orange gefüllte Kreis-Pfeil** (ca. 44 px, weißer Pfeil nach rechts, gemessen
  `#c8710b` an einer abgeschatteten Kreiskante bei 1175/941) mit dem Textlink
  „Zur Kundenstory" links daneben — dasselbe Muster wie im Home-Produktslider, hier aber
  mit waagerechtem statt diagonalem Pfeil.
- Typo: Titel ca. 42 px Regular Near-Black, ein- oder zweizeilig. Chip-Label ca. 15 px
  Bold Orange. Fließtext ca. 17 px Regular, sechs bis acht Zeilen. Die Ersparnis-Zahl
  ca. 58 px Regular mit **hochgestelltem Euro-Zeichen** (ca. 20 px) — dieselbe
  Superscript-Konstruktion wie im Stats-Band der Route `/unternehmen/`. Label darunter
  ca. 17 px Regular in Grau („Ersparnis auf 30 Jahre" bzw. „auf 20 Jahre" — der
  Bezugszeitraum wechselt zwischen den Karten und steht deshalb immer am Wert).
  Textlink ca. 17 px Regular, ohne Unterstreichung.
- Farbe/Fläche: Weiße Karte auf weißem Grund, abgesetzt allein durch einen weichen,
  breiten Schatten unter der rechten Textfläche; Radius ca. 6 px (geschätzt) nur an den
  Außenecken. Akzent in Chips und Kreis-Pfeil — die Ersparnis-Zahl selbst bleibt
  **Near-Black, nicht orange**, obwohl sie das Verkaufsargument ist.
- Abstände/Rhythmus: Innenabstand rechts ca. 48 px links vom Fototrenner, ca. 70 px oben.
  Ca. 55 px Titel zu Chips, ca. 45 px Chips zu Text, ca. 75 px Text zur Zahl, ca. 100 px
  Zahl zur Aktionszeile. Zwischen zwei Fallkarten liegen ca. 205 px inklusive der
  eingeschobenen Zitat-Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot vollständig belegt (die gelesene Mobil-Serie
  zeigt bei `kundenerfahrungen__-mobile-05-y1688.png` nur den Beginn der ersten Karte als
  angeschnittenes Foto). Als „nicht belegt" geführt.
- Pattern: `P-TESTIMONIAL` (Lücke: Fallkarte mit Komponenten-Chips und Ersparnis-Zahl
  statt reiner Kundenstimme)

### 54 — Zentrierter Rechner-Aufruf [kundenerfahrungen__-desktop-06-y3750.png | -]
- Anordnung: Vollständig zentrierter Block auf Weiß: ein Line-Icon auf der Mittelachse,
  darunter H2, Subline, CTA — vier Stufen, alle mittig, Textbreite ca. 690 px.
- Buttons/Komponenten: Ein CTA „Zum Ersparnisrechner", oranges gefülltes Rechteck
  (gemessen `#ef870e` bei 625/675), Label dunkel, Höhe ca. 58 px, mittig gesetzt. Darüber
  ein **oranges Line-Icon** (stilisierte Geldscheine, ca. 62 px breit, nur Kontur) — das
  einzige Icon dieser Route und dasselbe Motiv wie in Sektion 06 der Startseite, dort
  allerdings linksbündig unter dem Lead statt zentriert über der H2.
- Typo: H2 ca. 44 px Regular Near-Black, zweizeilig, zentriert, endet mit Fragezeichen.
  Subline ca. 17 px Regular in Grau, zwei Zeilen, zentriert, endet mit Doppelpunkt und
  leitet damit direkt auf den Button über. Kein Eyebrow.
- Farbe/Fläche: Weiß. Akzent in Icon und CTA.
- Abstände/Rhythmus: Ca. 300 px von der letzten Fallkarte zum Icon, ca. 45 px Icon zur H2,
  ca. 55 px H2 zur Subline, ca. 55 px Subline zum CTA, ca. 105 px bis zum dunklen Band.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID`

### 55 — Dunkles Aktionsband, zweizeilige Ansprache [kundenerfahrungen__-desktop-06-y3750.png | -]
- Anordnung: Near-Black-Band über die volle Breite, aber **auffällig flach** (ca. 190 px
  hoch) — die kompakteste Variante dieses Bandtyps im Atlas. Links ab 140 px zwei
  Textzeilen, rechts bei ca. 1055 px der Button, beide auf derselben vertikalen Mitte.
  Kein Fließtext, kein Zusatzlink.
- Buttons/Komponenten: Ein CTA „Jetzt Kontakt aufnehmen", oranges gefülltes Rechteck
  (gemessen `#ef870e` bei 1060/925), Label dunkel, Höhe ca. 58 px, Breite ca. 248 px.
- Typo: Die Ansprache ist **zweizeilig und komplett Bold** (ca. 22 px Weiß), erste Zeile
  Frage, zweite Zeile Aufforderung. Es gibt hier **keine H2** — das Band arbeitet mit
  einer fett gesetzten Fließtextgröße statt einer Headline und ist dadurch deutlich
  leiser als das Band in Sektion 31, das eine 44-px-H2 trägt.
- Farbe/Fläche: Near-Black gemessen `#21262b` (bei 700/940). Orange als einzige Farbe.
- Abstände/Rhythmus: Ca. 65 px Bandoberkante zur ersten Zeile, ca. 35 px Zeilenabstand,
  ca. 65 px bis zur Bandunterkante — durchgehend enger Takt.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID`

### 56 — Bewertungs-Split mit gesperrtem Widget [kundenerfahrungen__-desktop-06-y3750.png | kundenerfahrungen__-desktop-08-y5250.png | -]
- Anordnung: Text links ab 140 px (ca. 550 px breit), rechts ein Hochformat-Foto
  (ca. 470 × 400 px) mit einer **weißen Proof-Karte, die auf dem Foto liegt** und dessen
  rechte Kante überragt. Unter dem linken Text steht ein unterstrichener Link, darunter
  ein breiter grauer Kasten (ca. 545 × 330 px) mit dem eingebetteten Bewertungs-Widget.
- Buttons/Komponenten: Kein gefüllter CTA. Der Link „Alle Bewertungen" ist ein
  **unterstrichener Bold-Textlink** in Near-Black. Das Widget ist im Capture **nicht
  geladen**: an seiner Stelle steht ein grauer Platzhalterkasten mit zwei angedeuteten
  Karten-Skeletten und einem **Consent-Overlay** aus zwei grünen Schaltflächen
  („Inhalt entsperren" und „Erforderlichen Service akzeptieren und Inhalte entsperren")
  über einem erklärenden Hinweistext. Das Grün gehört **nicht zur Palette der Site**,
  sondern zum Consent-Plugin — als Overlay geführt, nicht als Sektionsfarbe. Der
  Hinweistext im Overlay ist an der Auflösungsgrenze, aber lesbar; die Karten-Skelette
  darunter sind **nicht lesbar**. Die weiße Proof-Karte auf dem Foto trägt wieder Sterne
  (vier gefüllt, einer halb), Label, Bold-Kernaussage und Fußzeile, hier **zentriert**
  gesetzt, mit Radius ca. 6 px (geschätzt) und weichem Schatten.
- Typo: H2 „EKD Bewertungen" ca. 40 px Regular Near-Black, einzeilig. Fließtext ca. 17 px
  Regular, vier Zeilen. Link ca. 17 px Bold unterstrichen. In der Proof-Karte: Label
  ca. 16 px Regular, Kernaussage ca. 17 px Bold, Fußzeile ca. 16 px Regular Grau,
  zweizeilig umbrechend.
- Farbe/Fläche: Weiß als Grund. Der graue Platzhalterkasten ist die einzige mittelgraue
  Vollfläche des Atlas und wirkt als Fremdkörper zwischen den sonst weißen und
  warmgrauen Flächen — Zustandsartefakt des Captures, kein Gestaltungsmittel.
- Abstände/Rhythmus: Ca. 240 px Bandkante zur H2, ca. 45 px H2 zu Text, ca. 45 px Text zum
  Link, ca. 40 px Link zum Widget-Kasten, ca. 210 px bis zur nächsten Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-PROOF-STRIP` (Lücke: eingebettetes Fremd-Widget, im Capture durch
  Consent-Overlay gesperrt)

### 57 — Randloser Foto-Slider mit Punkt-Navigation [kundenerfahrungen__-desktop-08-y5250.png | -]
- Anordnung: Eine Reihe Querformat-Fotos (je ca. 285 × 205 px) über die **volle
  Viewportbreite**, an beiden Rändern angeschnitten — links und rechts ragt je ein Bild
  halb aus dem Bild. Fünf Bilder vollständig oder teilweise sichtbar, gleicher Abstand
  (ca. 45 px), gemeinsame Grundlinie. Darunter zentriert die Navigation.
- Buttons/Komponenten: **Keine Pfeil-Kreise** wie im Home-Slider (Sektion 05), stattdessen
  drei kurze waagerechte **Striche als Positionsanzeige** (je ca. 40 px lang, ca. 3 px
  hoch, ca. 20 px Abstand); der aktive Strich ist Near-Black, die inaktiven hellgrau.
  Das ist die zweite Slider-Navigationsvariante der Site — Striche statt Punkte und ohne
  Vor-/Zurück-Buttons.
- Typo: **Keine Typografie in der gesamten Sektion** — keine Überschrift, keine
  Bildunterschriften, keine Zähler. Die Sektion ist rein visuell.
- Farbe/Fläche: Weiß als Grund, die Fotos bringen Grün und Dachgrau. Kein Akzent, auch
  nicht im aktiven Navigationsstrich.
- Abstände/Rhythmus: Ca. 210 px Luft über der Reihe, ca. 45 px Bildunterkante zur
  Navigation, ca. 190 px bis zur nächsten Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-GALLERY` (Lücke: randloser Foto-Slider mit Strich-Navigation ohne Text)

### 58 — Gewinnspiel-Split mit Konfetti-Grafik [kundenerfahrungen__-desktop-08-y5250.png | kundenerfahrungen__-desktop-10-y6750.png | -]
- Anordnung: Bild links ab ca. 140 px (ca. 570 × 340 px, Übergabe eines Schecks), Text
  rechts ab ca. 833 px (ca. 465 px breit). Um das Foto herum sind **freie Konfetti-Formen**
  gestreut: Kreise, Dreiecke, offene Bögen und kleine Quadrate, teils vor, teils hinter
  der Fotokante, über einen Bereich weit größer als das Foto selbst verteilt.
- Buttons/Komponenten: Kein gefüllter CTA. Die Aktion ist ein **unterstrichener
  Bold-Textlink** „Gewinner kennenlernen" in Near-Black. Die Konfetti-Formen sind reine
  Dekoration ohne Funktion.
- Typo: H2 ca. 50 px Regular Near-Black, dreizeilig, beginnt mit einer Zahl
  („25.000 € für glückliche EKD Kunden") — die Zahl steht hier **in der Headline** statt
  als eigene Kennzahl-Stufe. Fließtext ca. 17 px Regular, fünf Zeilen. Link ca. 17 px Bold.
  Kein Eyebrow.
- Farbe/Fläche: Weiß. Die Konfetti-Formen bringen **Pink, Türkis, Hellblau, Violett und
  Gelb** — eine komplette Fremdpalette, die auf keiner anderen Route und in keiner anderen
  Sektion des Atlas vorkommt. Orange fehlt in dieser Sektion vollständig; der Akzent der
  Marke ist ausgerechnet hier nicht vertreten.
- Abstände/Rhythmus: Ca. 190 px Luft über dem Foto, ca. 55 px H2 zu Text, ca. 55 px Text
  zum Link, ca. 245 px bis zur Prozess-Sektion.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: Kandidat: Foto-Split mit gestreuter Konfetti-Grafik in Fremdpalette

### 59 — Fünf-Schritte-Prozess mit Startkachel [kundenerfahrungen__-desktop-10-y6750.png | kundenerfahrungen__-desktop-11-y7500.png | -]
- Anordnung: Kopf als Zweispalter — Text links ab 140 px (ca. 530 px breit), rechts eine
  freigestellte Produktgruppe (Modul, Wärmepumpe, Speicherturm, Wallbox und ein
  Phone-Mockup davor, ca. 340 px breit) ohne Fläche und ohne Schatten. Darunter fünf
  Kacheln in einer Reihe ab 140 px, **ungleich breit**: die erste ca. 212 px, die vier
  folgenden je ca. 215 px bei gleicher Höhe (ca. 218 px). Alle Kacheln zentrieren ihren
  Inhalt.
- Buttons/Komponenten: Kein gefüllter CTA in der Sektion. Unter dem Kopftext ein
  **unterstrichener Bold-Textlink** „Mehr erfahren". Die erste Kachel ist als aktiver
  Schritt ausgezeichnet: **oranger 1-px-Rahmen** (Radius ca. 8 px, geschätzt) und ein
  eigener unterstrichener Bold-Link „Jetzt starten" darin — die vier übrigen Kacheln haben
  keinen Rahmen und keinen Link. Damit trägt genau eine von fünf Kacheln eine Aktion.
- Typo: Eyebrow „So funktioniert's" orange ca. 17 px Regular. H2 ca. 44 px Regular,
  zweizeilig. Fließtext ca. 17 px Regular, drei Zeilen. In den Kacheln: die Ziffer sehr
  groß (ca. 42 px Regular, hell gesetzt) über einem Label ca. 17 px Regular, das je nach
  Länge auf zwei bis drei Zeilen bricht — die Labels werden **nicht auf gleiche Zeilenzahl
  ausgeglichen**, dadurch stehen die Textblöcke der fünf Kacheln auf unterschiedlichen
  Höhen innerhalb gleich hoher Kacheln.
- Farbe/Fläche: Kachelgrund sehr helles Warmgrau, gegen den weißen Sektionsgrund nur eben
  unterscheidbar (geschätzt, kein sauberer Messpunkt frei von Text). Orange nur im
  Eyebrow und im Rahmen der ersten Kachel — der Akzent markiert hier **Zustand**
  (aktiver Schritt), nicht Aktion.
- Abstände/Rhythmus: Ca. 245 px zur Eyebrow, ca. 30 px Eyebrow zu H2, ca. 60 px H2 zu
  Text, ca. 55 px Text zum Link, ca. 65 px Link zur Kachelreihe. Kachelabstand ca. 25 px,
  danach ca. 145 px bis zum warmgrauen Band.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-PROCESS-3` (Lücke: fünf Schritte, davon einer als aktiver Zustand gerahmt)

### 60 — Beratungs-Panel auf Warmgrau [kundenerfahrungen__-desktop-11-y7500.png | kundenerfahrungen__-desktop-12-y8230.png | -]
- Anordnung: Ein warmgraues Panel (ab x=10 bis x=1430, also fast randlos, Radius ca. 20 px
  geschätzt an den **unteren** Ecken, oben gerade) mit Zweispalter: links ein Querformat-Foto
  (ca. 425 × 240 px) ab ca. 140 px, rechts der Textblock ab ca. 628 px. Das Foto ist
  deutlich kleiner als die Panelhöhe und sitzt vertikal etwa mittig.
- Buttons/Komponenten: Ein CTA „Unverbindlich anfragen", oranges gefülltes Rechteck
  (gemessen `#ef870e` bei 645/235 im Folgeslice), Label dunkel, Höhe ca. 58 px, Breite
  ca. 230 px. Sonst keine Komponenten.
- Typo: Eyebrow „Kostenlose Solar-Beratung" orange ca. 17 px Regular. H2 ca. 44 px Regular
  Near-Black, einzeilig. Fließtext ca. 17 px Regular, drei Zeilen. Auffällig: Eyebrow und
  H2 stehen **ohne Abstand direkt übereinander** (ca. 10 px), enger als in jeder anderen
  Sektion des Atlas, wo 25–30 px üblich sind.
- Farbe/Fläche: Warmgrau, an dieser Stelle etwas heller als das Standard-`#e9e9e6`
  (Schätzung, kein textfreier Messpunkt im Slice). Akzent in Eyebrow und CTA. Das Panel
  läuft unten in eine **abgerundete Kante** aus, unter der sofort das Near-Black des
  Abschlussbands beginnt — die Rundung schneidet in die dunkle Fläche.
- Abstände/Rhythmus: Ca. 100 px Paneloberkante zum Eyebrow, ca. 10 px Eyebrow zu H2,
  ca. 55 px H2 zu Text, ca. 55 px Text zum CTA, ca. 100 px bis zur Panelunterkante.
- Mobil: nicht in einem gelesenen Mobil-Shot belegt. Als „nicht belegt" geführt.
- Pattern: `P-CTA-MID`

### 61 — Abschlussband und Footer [kundenerfahrungen__-desktop-12-y8230.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band gemessen `#21262b` bei
  700/600 und 700/700, linksbündige H2, unterstrichener Bold-Link „Broschüre
  herunterladen", drei Auszeichnungs-Logos in Gold; darunter der Fünf-Spalten-Footer mit
  Logo und drei Social-Icons links, vier Linkspalten rechts, darunter eine Trennlinie und
  die Rechtszeile mit Copyright und sechs Rechtslinks). Keine sichtbare Abweichung.
  Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /ersparnisrechner/

### 62 — Reduzierter Tool-Header ohne Navigation [ersparnisrechner__-desktop-00-fold.png | -]
- Anordnung: **Die einzige Route des Atlas ohne Navigationsleiste.** Statt der sechs
  Nav-Punkte, „Kundenportal" und dem orangen Rechteck-CTA aus Sektion 01 steht hier nur
  ein Zweiklang: Logo links ab ca. 138 px, Bewertungs-Proof rechts bei ca. 1130–1240 px.
  Keine Links, kein Button, keine Dropdown-Chevrons — der Nutzer soll die Seite nicht
  verlassen. Die Leiste ist nicht sticky belegt (der einzige weitere Slice mit
  Seitenoberkante, `ersparnisrechner__-desktop-02-y750.png`, zeigt oben keine Leiste).
- Buttons/Komponenten: **Kein Button in der Leiste.** Der Proof rechts ist wieder eine
  reine Textkomposition ohne Karte und ohne Kasten: fünf Sterne in einer Zeile (vier
  gefüllt orange/gold, der fünfte als Halbstern), darunter zwei zentrierte Textzeilen —
  dasselbe Bauteil wie im Hero der Startseite, nur in die Kopfzeile gehoben.
- Typo: Nur zwei Stufen im Kopf. Logo als zweizeilige Wortmarke neben dem orangen
  Sonnen-Signet, identisch zu Sektion 01. Proof-Zeilen ca. 12–13 px, halbfett, zentriert
  unter den Sternen — deutlich kleiner als der Proof-Block im Startseiten-Hero.
- Farbe/Fläche: Reines Weiß, kein Foto, keine Trennlinie, kein Schatten. Der einzige
  Farbwert im Kopf sind Signet und Sterne in Orange/Gold.
- Abstände/Rhythmus: Leistenhöhe ca. 105 px, Logo-Oberkante ca. 38 px, Sterne ca. 30 px —
  Logo und Proof stehen nicht auf einer gemeinsamen Grundlinie, der Proof sitzt höher und
  läuft mit seiner zweiten Zeile unter die Logo-Unterkante.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Ausstiegsfreier Tool-Header, Logo plus Bewertungs-Proof

### 63 — Rechner-Hero, Textspalte neben Iso-Illustration [ersparnisrechner__-desktop-00-fold.png | -]
- Anordnung: Zweispalter ohne Hintergrundfläche. Links die Textspalte ab ca. 140 px mit
  H1 über zwei Zeilen und einer einzelnen Lead-Zeile, rechts ab ca. 900 px die
  isometrische Haus-Illustration (Satteldach mit Modulen, Speicher, Wallbox, Auto,
  orange Leitungswege) auf einer hellgrauen, leicht gerundeten Grundplatte. Die
  Illustration steht frei auf Weiß, nicht in einer Karte. **Kein Eyebrow** — anders als
  in jedem anderen Hero des Atlas beginnt der Block direkt mit der H1.
- Buttons/Komponenten: **Kein CTA im Hero.** Der Einstieg passiert vollständig über das
  Formular darunter; der Hero trägt nur Text und Bild. Das ist der einzige Hero des
  Atlas ohne Button.
- Typo: Zwei Stufen. H1 ca. 44 px, Grotesk, Regular bis Medium, Near-Black, zwei Zeilen,
  Zeilensprung ca. 62 px — spürbar kleiner als die ca. 66 px der Startseiten-H1, der
  Rechner nimmt sich zurück. Lead eine Zeile ca. 16 px Regular in mittlerem Grau.
  Verhältnis H1 zu Lead rund 2,7:1 (geschätzt).
- Farbe/Fläche: Weiß auf Weiß. Der Akzent sitzt ausschließlich in der Illustration
  (orange Kabelwege, orange Dachmodul-Kanten), nicht in der Typografie — die einzige
  Sektion des Atlas, in der Orange nur illustrativ und nicht als UI-Farbe auftritt.
- Abstände/Rhythmus: Ca. 110 px von der Leiste bis zur H1-Oberkante, ca. 45 px H1 zu
  Lead, ca. 55 px Lead bis zur Oberkante des Formularpanels. Die Illustration überragt
  den Textblock nach oben (Oberkante ca. 100 px) und nach unten (ca. 350 px) — sie ist
  optisch höher gewichtet als der Text.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Lücke: keine Fotofläche, keine Eyebrow, kein CTA — Illustration
  statt Foto) — alternativ Kandidat: Illustrations-Hero ohne Button

### 64 — Rechner-Panel, Schrittleiste und Ja/Nein-Kacheln [ersparnisrechner__-desktop-00-fold.png | ersparnisrechner__-desktop-02-y750.png | -]
- Anordnung: Ein einzelnes großes Panel mit warmgrauer Fläche und deutlichem Radius
  (ca. 16 px, geschätzt), ab ca. x=174 bis ca. x=1266, also spürbar schmaler als der
  Textcontainer darüber und beidseitig eingerückt. Innen alles zentriert auf der
  Panelmittelachse bei ca. 720 px: oben die Schrittleiste, darunter Icon, Frage,
  Hilfszeile, ganz unten zwei gleich große Antwortkacheln nebeneinander.
- Buttons/Komponenten: Drei Bauteile. (a) **Schrittleiste** aus sechs Quadraten mit
  kleinem Radius, ca. 40 x 40 px, Abstand ca. 20 px: das erste ist gefüllt Near-Black
  mit weißer „1" und trägt rechts daneben das ausgeschriebene Schrittlabel
  „Eigentümer"; die Schritte 2 bis 6 sind hell hinterlegt mit grauer Ziffer und ohne
  Label. Der aktive Schritt ist also nicht nur farblich, sondern auch durch das
  zusätzliche Wort markiert. (b) **Zwei Antwortkacheln** „Ja" und „Nein",
  ca. 373 x 240 px, Near-Black gefüllt, Radius ca. 8 px, Lücke zwischen ihnen nur
  ca. 10 px — ungewöhnlich eng für zwei getrennte Wahlflächen. Jede trägt zentriert ein
  Outline-Icon in einem dünnen Kreis (Häkchen bzw. Kreuz, Kreis ca. 55 px) und darunter
  das Label. Kein Rahmen, kein Schatten. (c) Ein Personen-Outline-Icon ca. 46 px über
  der Frage als Sektionsmarker.
- Typo: Frage als H2-artige Zeile ca. 30 px Regular, zentriert, Near-Black. Hilfszeile
  darunter ca. 15 px Regular in mittlerem Grau. Kachel-Labels ca. 15 px Regular in Weiß,
  nicht fett. Schritt-Ziffern ca. 14 px. Auffällig: **die Antwortkacheln sind riesig, die
  Labels darin winzig** — die Fläche trägt die Klickbarkeit, nicht die Schrift.
- Farbe/Fläche: Panel warmgrau, Kacheln Near-Black, Icons und Text weiß. **Kein Orange
  im gesamten Formular** — der Akzent pausiert im Kern-Tool der Seite vollständig, obwohl
  es die Conversion-Fläche ist.
- Abstände/Rhythmus: Ca. 105 px von der Paneloberkante bis zur Schrittleiste, ca. 105 px
  Schrittleiste zum Icon, ca. 35 px Icon zur Frage, ca. 30 px Frage zur Hilfszeile,
  ca. 70 px bis zu den Kacheln, ca. 75 px von der Kachelunterkante bis zur Panelunterkante
  (`ersparnisrechner__-desktop-02-y750.png`). Sehr großzügig — ein Schritt füllt mehr als
  eine volle Foldhöhe.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Ein-Frage-pro-Schritt-Panel mit Nummernleiste und Flächen-Antworten

### 65 — Bewertungs-Split mit gesperrtem Widget [ersparnisrechner__-desktop-02-y750.png | -]
- Anordnung: Zweispalter ohne Sektionsfläche. Links ein schmaler, **zentriert gesetzter**
  Textblock (Sterne plus drei Zeilen) bei ca. 160–390 px, rechts ab ca. 435 px bis
  ca. 1300 px der Widget-Bereich mit zwei angeschnittenen Bewertungskarten und je einem
  Chevron links und rechts als Slider-Pfeile.
- Buttons/Komponenten: Overlay. Der Widget-Bereich ist **nicht der echte Inhalt**,
  sondern ein Consent-Platzhalter: ein grauer Wash liegt über zwei Karten-Attrappen aus
  Balken-Skeletten (schwarze und graue Rechtecke statt Text, roter Punkt oben rechts,
  Kreis-Logo links). Darüber liegt ein Hinweistext und zwei **grüne** Buttons
  („Inhalt entsperren", „Erforderlichen Service akzeptieren und Inhalte entsperren"),
  ca. 265 x 40 px bzw. ca. 265 x 55 px, Radius ca. 3 px, weißes Bold-Label. Das Grün ist
  Fremd-UI des Consent-Tools und **nicht Teil der Palette** — der einzige Ort im Atlas,
  an dem Grün auftritt. Ein grüner Textlink liegt im Hinweisblock, ist aber unter dem
  Wash nicht lesbar.
- Typo: Linker Block dreistufig: Label ca. 15 px, Kernzeile ca. 15 px, Fußzeile ca. 15 px,
  alle zentriert und Regular — anders als der Proof im Startseiten-Hero, der die mittlere
  Zeile fettet. Der Hinweistext im Overlay ca. 13 px Regular, zentriert, teils nicht
  lesbar.
- Farbe/Fläche: Weiß, dazu der dunkelgraue Consent-Wash und die grünen Buttons. Sterne
  orange/gold.
- Abstände/Rhythmus: Ca. 115 px von der Panelunterkante bis zur Widget-Oberkante,
  Widget-Höhe ca. 350 px, danach ca. 85 px bis zum Logo-Band.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Bewertungs-Split mit Consent-gesperrtem Fremdwidget (wie Sektion 56,
  hier ohne umgebende Sektionsfläche)

### 66 — Presse-Logoband auf Warmgrau [ersparnisrechner__-desktop-02-y750.png | ersparnisrechner__-desktop-03-y1500.png | -]
- Anordnung: Ein liegendes Band mit warmgrauer Fläche und Radius (ca. 8 px, geschätzt),
  ab ca. x=90 bis ca. x=1352, Höhe ca. 190 px. Innen eine einzige Zeile: links ab
  ca. 162 px die Überschrift als Fließtext, rechts vier Sender-Logos in gleichmäßigem
  Abstand von ca. 195 px Mitte zu Mitte. Kein Rahmen, keine Trennlinien zwischen den
  Logos.
- Buttons/Komponenten: Keine Buttons, keine Links sichtbar. Die Logos sind Bildmarken in
  Originalform (nicht auf eine Höhe normalisiert): ein großes schwarzes Winkel-Signet,
  eine schwarze Fläche mit weißer Figur, eine gestreifte Kugel mit Verlauf, eine graue
  Wortmarke. **Die Logos sind nicht monochrom vereinheitlicht** — die Kugel behält ihren
  Farbverlauf, die Wortmarke bleibt heller als die übrigen. Größen schwanken stark
  (ca. 100 px bis ca. 175 px Breite).
- Typo: Eine Stufe. Überschrift ca. 27 px Regular, Near-Black, vertikal zentriert auf der
  Logo-Mittelachse — sie steht als Satzanfang zu den Logos, nicht als eigene H2 darüber.
- Farbe/Fläche: Warmgrau als einzige Fläche, Logos in Schwarz/Grau. Kein Orange.
- Abstände/Rhythmus: Ca. 40 px Innenabstand oben und unten, ca. 72 px vom linken Bandrand
  bis zur Überschrift, ca. 80 px von der Überschrift bis zum ersten Logo. Nach dem Band
  ca. 100 px Luft bis zum Zahlen-Band.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Presse-Logoband als gerundetes Warmgrau-Rechteck

### 67 — Zahlen-Band, drei Spalten mit Belegsätzen [ersparnisrechner__-desktop-03-y1500.png | ersparnisrechner__-desktop-04-y1865.png | -]
- Anordnung: Drei gleich breite Spalten auf Weiß, Spaltenachsen bei ca. 140 px, 560 px
  und 930 px, alles linksbündig. Je Spalte drei Stufen untereinander: sehr große Zahl,
  fette Kurzzeile, Fließtext. Die Spalten sind **nicht auf gleiche Höhe gezogen** — der
  Fließtext läuft in Spalte 1 über drei, in Spalte 2 über vier und in Spalte 3 über zwei
  Zeilen, die Unterkanten stehen frei.
- Buttons/Komponenten: Keine Buttons, keine Karten, keine Icons, keine Trennlinien. Die
  Einheiten hängen als **hochgestellte Zeichen** an der Zahl: „+" bei 45.000 und 15,
  „Mio €" bei 90 — deutlich kleiner (ca. 30 px gegen ca. 92 px) und an der Oberkante der
  Ziffern ausgerichtet.
- Typo: Drei Stufen. Zahl ca. 92 px, Grotesk, Regular bis Medium (nicht Bold), Near-Black,
  Ziffern mit weiten Punzen. Kurzzeile ca. 16 px Bold. Fließtext ca. 16 px Regular in
  mittlerem Grau, Zeilenabstand ca. 28 px. Verhältnis Zahl zu Fließtext rund 5,8:1
  (geschätzt) — der größte Typo-Sprung innerhalb einer Sektion auf dieser Route.
- Farbe/Fläche: Reines Weiß, kein Akzent, keine Fläche. Der Kontrast entsteht
  ausschließlich über Schriftgröße.
- Abstände/Rhythmus: Ca. 105 px von der Zahlen-Unterkante bis zur Kurzzeile, ca. 22 px
  Kurzzeile zu Fließtext, ca. 420 px Spaltenabstand Mitte zu Mitte. Nach dem Band
  ca. 130 px Weißraum bis zur harten Kante des dunklen Abschlussbands
  (`ersparnisrechner__-desktop-04-y1865.png`).
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-PROOF-STRIP`

### 68 — Abschlussband und Footer [ersparnisrechner__-desktop-04-y1865.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band mit harter Oberkante,
  zweizeilige linksbündige H2, unterstrichener Bold-Link „Broschüre herunterladen", drei
  Auszeichnungs-Logos in Gold; darunter der Fünf-Spalten-Footer mit Logo und drei
  Social-Icons links, vier Linkspalten rechts, Trennlinie und Rechtszeile). Trotz des
  ausstiegsfreien Kopfs aus Sektion 62 trägt die Seite unten **den vollen Footer mit allen
  Links** — der Ausstieg ist nur oben gesperrt, nicht unten. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /magazin/

### 69 — Header / Navigationsleiste [magazin__-desktop-00-fold.png | -]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste als eigene
  Zeile über dem Inhalt, Logo links, sechs Nav-Punkte, „Kundenportal" als Text-Link, genau
  ein oranger Rechteck-CTA „Ersparnis berechnen" rechts. Aktiver Nav-Punkt ist hier
  **„Ratgeber"**, markiert durch eine kurze dunkle Unterstreichung unter dem Label — der
  Dropdown-Elternpunkt wird also aktiv gesetzt, obwohl die Route selbst nicht „Ratgeber"
  heißt. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 70 — Magazin-Kopf, reiner Textblock ohne Bild [magazin__-desktop-00-fold.png | -]
- Anordnung: Linksbündige Textspalte ab ca. 140 px, Breite ca. 750 px, **rechte
  Foldhälfte vollständig leer** — kein Foto, keine Illustration, keine Karte. Drei Stufen
  gestapelt: H1, zweizeiliger Lead, Textlink. Der Block endet bei ca. y=430 mit einer
  harten Kante zur dunklen Sektion darunter; unter dem Link bleiben nur ca. 55 px Weiß.
- Buttons/Komponenten: **Kein Button.** Der einzige Aktionspunkt ist der Textlink „Alle
  Artikel anzeigen": Bold, Near-Black, mit **durchgehender Unterstreichung** in derselben
  Farbe und ca. 4 px Abstand zur Grundlinie — dasselbe Linkbauteil wie „Broschüre
  herunterladen" im Abschlussband, hier auf hellem Grund. Kein Pfeil, kein Chevron.
- Typo: Drei Stufen. H1 ca. 55 px Regular bis Medium, Near-Black, einzeilig — kleiner als
  die ca. 66 px der Heroes auf `/` und `/kundenerfahrungen/`, die Übersichtsseite steht
  eine Stufe tiefer. Lead ca. 17 px Regular in dunklem Grau über zwei Zeilen,
  Zeilenabstand ca. 28 px. Link ca. 15 px Bold. Kein Eyebrow.
- Farbe/Fläche: Reines Weiß, **kein einziger Orange-Punkt im Fold außer dem Header-CTA** —
  der Kopf selbst ist vollständig achromatisch.
- Abstände/Rhythmus: Ca. 80 px von der Leiste bis zur H1-Oberkante, ca. 55 px H1 zu Lead,
  ca. 55 px Lead zum Link. Sehr kompakt gegenüber den Foto-Heroes: der ganze Kopf ist nur
  ca. 335 px hoch statt einer vollen Foldhöhe.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Kompakter Textkopf ohne Bild mit unterstrichenem Textlink

### 71 — Artikel-Highlights, weiße Karten auf Near-Black [magazin__-desktop-00-fold.png | magazin__-desktop-02-y750.png | -]
- Anordnung: Ganzflächiges dunkles Band mit harter Ober- und Unterkante (keine Rundung,
  keine Überlappung). Innen zuerst ein linksbündiger Sektionskopf ab ca. 140 px (H2 plus
  eine Lead-Zeile), darunter drei **gleich breite** Karten (je ca. 371 px, Lücke ca. 39 px)
  in einer Reihe von ca. 140 px bis ca. 1300 px. Anders als das Bento-Raster der Startseite
  (Sektion 03) ist dies ein sauberes Drittel-Raster.
- Buttons/Komponenten: **Keine Buttons und keine sichtbaren Links in den Karten** — die
  ganze Karte ist die Klickfläche. Karten: weiße Fläche, Radius ca. 4 px (sehr klein,
  fast eckig), kein Schatten (auf Dunkel unnötig), kein Rahmen. Aufbau je Karte: Foto
  randlos über die volle Kartenbreite oben, Höhe ca. 260 px, darunter Textbereich mit
  Titel und Teaser. Die Karten sind **nicht auf gleiche Höhe gezogen**, aber die
  Unterkanten stehen hier zufällig bündig; die Titel laufen über zwei bis vier Zeilen und
  drücken den Teaser unterschiedlich weit nach unten.
- Typo: Vier Stufen. H2 ca. 42 px Regular in Weiß, Lead ca. 17 px Regular in hellem Grau.
  In der Karte: Titel ca. 22 px Regular Near-Black mit Zeilensprung ca. 32 px, Teaser
  ca. 16 px Regular in mittlerem Grau, am Ende mit „…" abgeschnitten. Der Titel ist
  **nicht fett** — die Hierarchie in der Karte läuft allein über Größe und Farbe.
- Farbe/Fläche: Near-Black als Bandfläche, Karten reinweiß. **Kein Orange in der ganzen
  Sektion.** Der Kontrast ist maximal hart: weiße Rechtecke auf fast schwarzem Grund, ohne
  Zwischenton.
- Abstände/Rhythmus: Ca. 105 px von der Bandoberkante bis zur H2, ca. 45 px H2 zu Lead,
  ca. 60 px Lead bis zur Kartenoberkante. In der Karte ca. 63 px Innenabstand oben nach
  dem Foto, ca. 62 px links/rechts, ca. 90 px unten. Nach der Kartenreihe ca. 130 px
  bis zum nächsten Sektionskopf (`magazin__-desktop-02-y750.png`).
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Weiße Artikelkarten im Drittel-Raster auf Near-Black-Band

### 72 — Artikelübersicht, fortlaufendes Kartenraster [magazin__-desktop-02-y750.png | magazin__-desktop-04-y2250.png | -]
- Anordnung: Dasselbe dunkle Band läuft weiter, ein zweiter linksbündiger Sektionskopf
  (H2 plus eine Lead-Zeile) trennt die Blöcke. Darunter ein **mehrreihiges** Raster
  derselben drei Kartenspalten, in `magazin__-desktop-04-y2250.png` sind zwei volle Reihen
  sichtbar. Die Reihen sind streng ausgerichtet, aber die Kartenhöhen innerhalb einer
  Reihe unterscheiden sich sichtbar — die Unterkanten der oberen Reihe stehen versetzt
  (ca. 510 px gegen ca. 490 px).
- Buttons/Komponenten: Kartenbauteil identisch zu Sektion 71 (Foto oben randlos, Titel,
  Teaser, kein Button). Neu: die Fotos sind hier motivisch heterogener (Screenshot-Mockups
  mit App-Oberfläche, Produktgrafik mit Beschriftungen, Reportagefoto) und teils mit
  Text im Bild — das Kartenraster normalisiert die Motive nicht. Am Ende des Rasters
  (`magazin__-desktop-06-y3750.png`) steht **ein einzelner zentrierter Button**
  „Mehr anzeigen": oranges gefülltes Rechteck, ca. 200 x 48 px, Radius ca. 3 px, weißes
  Label ca. 15 px halbfett — der erste und einzige Orange-Button im Seitenkörper dieser
  Route und der einzige zentrierte Button des Atlas.
- Typo: Wie Sektion 71. H2 ca. 42 px Regular Weiß, Lead ca. 17 px. Kartentitel ca. 22 px
  Regular, Teaser ca. 16 px Regular Grau mit „…"-Abbruch.
- Farbe/Fläche: Near-Black, weiße Karten. Das Band endet nach dem „Mehr anzeigen"-Button
  **nicht** — es geht in Weiß über, bevor die Warmgrau-Sektion beginnt
  (`magazin__-desktop-06-y3750.png` zeigt oben die letzten Kartenunterkanten auf Weiß).
  Der Wechsel Dunkel zu Hell liegt also mitten im Raster, nicht an seiner Kante.
- Abstände/Rhythmus: Ca. 130 px vom vorigen Block bis zur H2, ca. 45 px H2 zu Lead,
  ca. 60 px Lead zur ersten Kartenreihe, ca. 55 px Zeilenabstand zwischen den
  Kartenreihen, ca. 95 px von der letzten Reihe bis zum Button.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Endloses Artikelraster mit zentriertem Nachlade-Button

### 73 — Weiterführungs-Trio auf Warmgrau [magazin__-desktop-06-y3750.png | -]
- Anordnung: Warmgraue Sektion über die volle Breite mit harter Ober- und Unterkante.
  Linksbündige H2 ab ca. 140 px, darunter drei Spalten (Achsen ca. 140 px, 560 px,
  980 px) mit je Bild, Titel, Text und einem Aktionspunkt. Die Spalten sind gleich breit
  (ca. 320 px), die Bilder aber **unterschiedlich hoch und unterschiedlich beschnitten**:
  Spalte 1 ein Querformat ca. 320 x 200 px, Spalte 2 eine Illustration auf hellem Grund
  ca. 320 x 205 px, Spalte 3 ein Foto ca. 320 x 200 px. Dadurch stehen die Titel der drei
  Spalten **nicht auf einer gemeinsamen Grundlinie** (ca. 720 px, 733 px, 730 px).
- Buttons/Komponenten: **Drei verschiedene Aktionsstufen in einer Reihe** — das ist die
  auffälligste Inkonsistenz der Route. Spalte 1 endet mit einem gefüllten orangen
  Rechteck-Button „Jetzt Angebot sichern!" (ca. 227 x 55 px, Radius ca. 3 px, weißes
  Label). Spalte 2 und 3 enden mit einem unterstrichenen Bold-Textlink („Zum
  Energiesystem", „Zu den News"), ca. 15 px, Near-Black, ohne Kasten. Gleiche Kartenform,
  drei verschiedene Gewichte.
- Typo: Drei Stufen. H2 ca. 42 px Regular Near-Black. Spaltentitel ca. 30 px Regular,
  über eine bis drei Zeilen (Spalte 1 dreizeilig, Spalte 2 zweizeilig, Spalte 3
  zweizeilig) — die Titelgröße ist gleich, die Blockhöhe nicht. Fließtext ca. 16 px
  Regular in mittlerem Grau. Link ca. 15 px Bold.
- Farbe/Fläche: Warmgrau als Sektionsfläche, Bilder mit eigenem Grund (Spalte 2 hat einen
  eigenen hellen Kasten hinter der Illustration, Spalte 1 und 3 sind randlose Fotos).
  Genau ein Orange-Punkt in der ganzen Sektion: der Button in Spalte 1.
- Abstände/Rhythmus: Ca. 100 px von der Sektionsoberkante bis zur H2, ca. 95 px H2 zu den
  Bildern, ca. 40 px Bild zu Titel, ca. 60 px Titel zu Fließtext, ca. 55 px Fließtext zum
  Aktionspunkt. Die Spalte mit dem Button ist dadurch ca. 60 px höher als die beiden
  Link-Spalten. Nach der Sektion harte Kante zum dunklen Abschlussband.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-OFFER-PAIR` (Lücke: drei statt zwei Spalten, und drei ungleiche
  Aktionsstufen) — alternativ Kandidat: Weiterführungs-Trio mit gemischten Aktionsgewichten

### 74 — Abschlussband und Footer [magazin__-desktop-06-y3750.png | magazin__-desktop-07-y4482.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band, zweizeilige linksbündige
  H2 „Bessere Energie für Ihr Zuhause. Das ganze Jahr.", unterstrichener Bold-Link
  „Broschüre herunterladen", drei Auszeichnungs-Logos in Gold; darunter der
  Fünf-Spalten-Footer). Keine sichtbare Abweichung. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /news/energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip/

### 75 — Header / Navigationsleiste [news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-00-fold.png | -]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste, Logo links,
  sechs Nav-Punkte, „Kundenportal" als Text-Link, oranger Rechteck-CTA rechts. Aktiver
  Nav-Punkt ist auch hier **„Ratgeber"** mit kurzer dunkler Unterstreichung — News-Artikel
  laufen in derselben Navigationsgruppe wie das Magazin. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 76 — Artikelkopf mit Kategorie-Chip und Breadcrumb [news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-00-fold.png | -]
- Anordnung: Linksbündige Lesespalte ab ca. 222 px bis ca. 1220 px — deutlich schmaler
  als der 140-px-Container aller anderen Routen und **beidseitig eingerückt**, aber nicht
  zentriert (links 222 px, rechts 220 px Rand bei 1440 px Viewport, also faktisch
  symmetrisch). Vier Stufen gestapelt: Kategorie-Chip, H1, Datumszeile, dann mit größerem
  Abstand die Breadcrumb-Zeile, darunter das randlose Aufmacherbild.
- Buttons/Komponenten: Zwei eigenständige Bauteile, die sonst nirgends im Atlas
  vorkommen. (a) **Kategorie-Chip** „News": hellgrau gefülltes Rechteck ca. 78 x 35 px mit
  kleinem Radius (ca. 3 px, geschätzt), Label **orange** ca. 15 px Regular — das einzige
  Bauteil des Atlas, das Orange als Textfarbe auf einer grauen Fläche setzt statt als
  Flächenfarbe. (b) **Breadcrumb** als reine Textzeile mit „>"-Trennern: die ersten zwei
  Glieder („Start", „News") sind orange und ohne Unterstreichung, das aktuelle Glied
  Near-Black — Links werden hier also nur farblich, nicht durch Unterstrich markiert,
  anders als der Bold-Unterstrich-Link im Abschlussband. Kein Button im ganzen Kopf.
- Typo: Vier Stufen. Chip-Label ca. 15 px Regular. H1 ca. 44 px Regular Near-Black über
  drei Zeilen, Zeilensprung ca. 62 px; der Titel ist erkennbar der **URL-Slug mit
  Bindestrichen** statt einer gesetzten Überschrift und bricht dadurch mitten in
  Wortverbindungen um. Datumszeile ca. 17 px Regular in dunklem Grau. Breadcrumb ca. 15 px
  Regular. Kein Eyebrow im Sinn der anderen Routen — der Chip übernimmt dessen Platz.
- Farbe/Fläche: Reines Weiß. Akzent in genau zwei Punkten: Chip-Label und die beiden
  aktiven Breadcrumb-Glieder — beide als Textfarbe, keine orange Fläche im Kopf.
- Abstände/Rhythmus: Ca. 80 px von der Leiste bis zum Chip, ca. 30 px Chip zu H1, ca. 45 px
  H1 zur Datumszeile, dann ein auffällig großer Sprung von ca. 90 px bis zur Breadcrumb —
  die Breadcrumb steht optisch beim Bild, nicht beim Titel. Ca. 40 px Breadcrumb zum Bild.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Artikelkopf mit grauem Kategorie-Chip und orangem Textbreadcrumb

### 77 — Aufmacherbild, randlose Grafik in Lesebreite [news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-00-fold.png | news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-02-y750.png | -]
- Anordnung: Ein einzelnes Bild in exakt der Lesespaltenbreite (ca. 222 bis 1220 px),
  Höhe ca. 340 px. **Kein Radius, kein Rahmen, kein Schatten, keine Bildunterschrift** —
  das Bild sitzt hart auf Weiß. Es ist kein Foto, sondern eine Partner-Grafik: ein
  cyanfarben eingefärbtes Gebäudefoto als Grund, darüber ein Wortmarken-Duo (linke Marke
  weiß freigestellt, rechte Marke in einem weißen Kasten) und darüber der Schriftzug
  „PARTNERSCHAFT" in zwei Gewichten.
- Buttons/Komponenten: Keine. Das Bild ist nicht klickbar markiert, kein Play-Marker,
  kein Zoom-Icon.
- Typo: Nur bildinterne Typografie, nicht Seitentypo: „PARTNERSCHAFT" ca. 46 px, erste
  Hälfte Bold, zweite Hälfte Light — ein Gewichtswechsel innerhalb eines Wortes.
- Farbe/Fläche: **Cyan/Türkis als dominante Bildfarbe** — die einzige Stelle im Atlas mit
  einem kalten Blauton als Großfläche. Er stammt aus der Fremdmarke, nicht aus der
  EKD-Palette, und wird von der Seite nicht aufgegriffen.
- Abstände/Rhythmus: Ca. 55 px von der Bildunterkante bis zum ersten Absatz.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Randloses Aufmacherbild in Lesespaltenbreite ohne Rahmen

### 78 — Artikelkörper, durchlaufender Fließtext [news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-02-y750.png | news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-04-y2250.png | -]
- Anordnung: Eine einzige Textspalte in Lesebreite (ca. 998 px), über ca. 1800 px Höhe
  ohne jede Unterbrechung. **Kein Inhaltsverzeichnis, keine H2-Zwischentitel, keine
  Info-Boxen, keine Zitatblöcke** — der Kontrast zur Ratgeber-Route `/solaranlage/`
  (Sektionen 20 bis 22) ist maximal: dort Navigation und Kästen im Text, hier nur Absätze.
  Der einzige Gliederungspunkt ist eine fette Kurzzeile („Über eQ-3-AG") am Textende, die
  wie eine H3 wirkt, aber dieselbe Größe wie der Fließtext hat.
- Buttons/Komponenten: Genau ein Button auf der ganzen Route: **„Pressemitteilung
  herunterladen (PDF-Datei)"** am Ende des Körpers, oranges gefülltes Rechteck
  ca. 400 x 58 px, Radius ca. 3 px, weißes Label ca. 15 px halbfett, **linksbündig an der
  Lesespaltenkante** (ca. 222 px) statt zentriert. Die Klammer mit dem Dateiformat steht
  im Label selbst. Inline im Text liegen orange Textlinks ohne Unterstreichung
  (Fraunhofer-Verweis, zwei Domains am Absatzende) — dieselbe Linkmarkierung wie in der
  Breadcrumb. Zwischen Text und Button steht eine freigestellte Produktgrafik: fünf
  Geräte um einen hellblaugrauen Kreisring angeordnet, mit Beschriftungen in einer
  **fremden, breiteren Grotesk** als der Seitenschrift, ca. 940 x 650 px, ohne Rahmen.
- Typo: Zwei Stufen. Fließtext ca. 17 px Regular Near-Black, Zeilenabstand ca. 28 px,
  Absatzabstand ca. 30 px — auffällig groß gesetzt für eine Pressemitteilung und mit
  ca. 998 px Zeilenlänge deutlich über der üblichen Lesebreite. Fußnotenzeile ca. 16 px.
  Kurzzeile „Über eQ-3-AG" ca. 17 px Bold. Direkte Rede steht in Anführungszeichen im
  Fließtext, **nicht** als abgesetztes Zitat mit Einzug oder Linie.
- Farbe/Fläche: Reines Weiß über die volle Artikellänge, keine Sektionsfläche, keine
  Trennlinie zwischen Absätzen. Akzent nur in den Inline-Links und dem Schluss-Button.
- Abstände/Rhythmus: Ca. 30 px zwischen Absätzen, ca. 55 px vom letzten Absatz zur
  Produktgrafik, ca. 55 px Grafik zum Button, ca. 75 px vom Button bis zur harten Kante
  des dunklen Abschlussbands.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Ungegliederter Pressetext in Lesebreite mit einem Download-Button

### 79 — Abschlussband und Footer [news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-04-y2250.png | news__energiekonzepte-deutschland-setzt-exklusiv-auf-smarthome-loesung-homematic-ip__-desktop-05-y2921.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band mit harter Oberkante,
  zweizeilige linksbündige H2 ab ca. 140 px, unterstrichener Bold-Link „Broschüre
  herunterladen", drei Auszeichnungs-Logos in Gold; darunter der Fünf-Spalten-Footer).
  Bemerkenswert: das Band steht wieder im **breiten** 140-px-Container, während der
  Artikel darüber in der schmalen 222-px-Lesespalte lag — die Kante zwischen beiden
  Containern ist sichtbar. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /karriere/

### 80 — Header / Navigationsleiste [karriere__-desktop-00-fold.png | -]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste als eigene
  Zeile **über** dem Hero-Foto (nicht transparent darauf wie auf `/`), Logo links, sechs
  Nav-Punkte, „Kundenportal", oranger Rechteck-CTA rechts. **Kein Nav-Punkt ist aktiv
  markiert** — `/karriere/` hängt unter „Über uns", bekommt aber keine Unterstreichung,
  anders als `/magazin/` unter „Ratgeber". Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 81 — Karriere-Hero mit Arbeitgeber-Siegel [karriere__-desktop-00-fold.png | karriere__-desktop-02-y750.png | -]
- Anordnung: Vollflächiges Foto unter der weißen Leiste, Höhe ca. 655 px, mit **harter
  Unterkante** ohne die gerundete Überlappung der Startseite. Textspalte linksbündig ab
  ca. 140 px, dreistufig (Eyebrow, H1, CTA), vertikal etwa mittig. Rechts unten im Foto
  bei ca. 1140–1300 px liegt statt des Bewertungs-Textblocks der Startseite ein
  **gelbes Siegel als Karte** — der einzige Hero des Atlas mit einem Proof-Element in
  Kartenform.
- Buttons/Komponenten: Zwei Bauteile. (a) CTA „Zu den Jobs": oranges gefülltes Rechteck
  ca. 137 x 58 px, Radius ca. 3 px, Label **weiß** ca. 15 px halbfett — anders als der
  Hero-CTA auf `/`, dessen Label dunkel ist. Deutlich schmaler als alle anderen Hero-CTAs
  des Atlas. (b) **Kununu-Siegel**: gelbe Karte ca. 160 x 155 px, Radius ca. 8 px, mit
  einem hellen Wellenmuster im Grund; innen zentriert die Note ca. 22 px Bold in
  Dunkelblau, darunter fünf Sterne (vier gefüllt dunkelblau, einer Outline), darunter zwei
  Zeilen ca. 12 px inklusive Wortmarke. **Gelb und Dunkelblau sind Fremdmarkenfarben** und
  kommen sonst nirgends im Atlas vor.
- Typo: Drei Stufen. Eyebrow eine orange Zeile ca. 17 px Regular ohne Caps, hier
  **dreiteilig mit Punkten** gesetzt. H1 ca. 58 px Regular Weiß, zweizeilig, Zeilensprung
  ca. 88 px, mit Gedankenstrich am Ende der ersten Zeile. Verhältnis H1 zu Eyebrow rund
  3,4:1 (geschätzt). Der Hero ist der einzige des Atlas **ohne Lead-Absatz** — auf die H1
  folgt direkt der Button.
- Farbe/Fläche: Kühles, entsättigtes Foto (Solarmodul in Nahsicht mit Helm), deutlich
  heller und blaustichiger als die warmen Dunkelfotos der übrigen Heroes; kein
  gleichmäßiger Wash, sondern natürliche Bildhelligkeit — die weiße H1 steht dadurch auf
  einem Grund von wechselndem Kontrast. Akzent in drei Punkten: Eyebrow, CTA, und
  markenfremd das gelbe Siegel.
- Abstände/Rhythmus: Ca. 205 px von der Leiste bis zur Eyebrow, ca. 30 px Eyebrow zu H1,
  ca. 65 px H1 zum CTA, ca. 150 px vom CTA bis zur Fotounterkante. Das Siegel steht
  ca. 55 px über der Fotounterkante und **ragt nicht** darüber hinaus.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Lücke: kein Lead, harte Fotokante, Proof als Fremdmarken-Karte)

### 82 — Auszeichnungs-Panel, Siegelreihe auf Near-Black [karriere__-desktop-02-y750.png | -]
- Anordnung: Ein liegendes Panel mit Near-Black-Fläche und Radius (ca. 8 px, geschätzt),
  ab ca. x=90 bis ca. x=1350, Höhe ca. 460 px, auf weißem Seitengrund — also **eine
  dunkle Karte, kein durchgehendes Band**. Innen ein Zweispalter mit ungewöhnlicher
  Richtung: links vier Siegel in einer Reihe, rechts der Textblock. Auf allen anderen
  Routen steht der Text links und das Bild rechts; hier ist es gedreht.
- Buttons/Komponenten: **Kein Button, kein Link.** Vier Jahres-Siegel, je ca. 145 x 195 px,
  Abstand ca. 55 px, hochkant, mit weißem Rand. Sie sind **nach Jahr absteigend** gesetzt
  und unterscheiden sich nur in der Füllfarbe des Mittelfelds (Gelb, Blaugrau, Rosa,
  Korall) — eine Farbtreppe, die aus der Fremdmarke stammt und die Palette der Seite
  erneut durchbricht. Die Siegel sind alle exakt gleich groß, anders als die Presselogos
  in Sektion 66.
- Typo: Zwei Stufen. H2 ca. 42 px Regular in Weiß, zweizeilig, **linksbündig in der
  rechten Spalte** (Achse ca. 930 px), mit Ausrufezeichen. Fließtext ca. 16 px Regular in
  hellem Grau, fünf Zeilen, Zeilenabstand ca. 28 px. Kein Eyebrow im Panel.
- Farbe/Fläche: Near-Black als Panelfläche, Text weiß und hellgrau, Siegel bunt. Kein
  Orange im Panel.
- Abstände/Rhythmus: Ca. 90 px Innenabstand oben bis zur H2-Oberkante, ca. 105 px oben bis
  zur Siegel-Oberkante — Siegel und H2 stehen **nicht** auf einer gemeinsamen Oberkante.
  Ca. 70 px H2 zum Fließtext, ca. 95 px vom Fließtext bis zur Panelunterkante. Vor dem
  Panel ca. 120 px Weiß, danach ca. 145 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Dunkles Auszeichnungs-Panel mit Siegelreihe links und Text rechts

### 83 — Arbeitgeber-Split, Text links und Foto rechts [karriere__-desktop-04-y2250.png | -]
- Anordnung: Zweispalter ohne Sektionsfläche. Links ab ca. 140 px ein schmaler Textblock
  (H2 plus sechs Zeilen Fließtext, Breite ca. 545 px), rechts ab ca. 833 px bis ca. 1300 px
  ein Foto ca. 467 x 345 px mit kleinem Radius (ca. 4 px, geschätzt). Das Foto ist
  **oberkantenbündig mit der H2**, nicht mittig zum Textblock — der Text endet ca. 75 px
  über der Fotounterkante.
- Buttons/Komponenten: **Kein Button, kein Link, kein Eyebrow.** Die einzige Sektion der
  Route mit reinem Text-Bild-Paar ohne Aktionspunkt.
- Typo: Zwei Stufen. H2 ca. 38 px Regular Near-Black, einzeilig, mit Gedankenstrich.
  Fließtext ca. 16 px Regular in mittlerem Grau, sechs Zeilen, Zeilenabstand ca. 28 px.
  Verhältnis H2 zu Fließtext rund 2,4:1 (geschätzt).
- Farbe/Fläche: Reines Weiß, kein Akzent. Das Foto (Mitarbeiterin in einer Lagerhalle)
  ist unbearbeitet warm und farbig — kein Wash, kein Duotone.
- Abstände/Rhythmus: Ca. 40 px H2 zum Fließtext. Nach der Sektion ca. 100 px bis zur
  harten Oberkante der Warmgrau-Sektion.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Text-Foto-Split ohne Aktionspunkt

### 84 — Zahlen-Sektion auf Warmgrau, Vierer-Block rechts [karriere__-desktop-04-y2250.png | karriere__-desktop-05-y3000.png | -]
- Anordnung: Warmgraue Sektion über die volle Breite mit harten Kanten. Links ab ca. 140 px
  Eyebrow und zweizeilige H2, rechts ab ca. 760 px ein **2x2-Raster** aus vier Zahlen.
  Anders als das dreispaltige Zahlen-Band der Startseite (Sektion 09) und der
  Ersparnisrechner-Route (Sektion 67) stehen Überschrift und Zahlen hier **nebeneinander**
  statt untereinander. Die Zahlen sind je Zelle **rechtsbündig**, die Labels darunter
  linksbündig zur Zellachse — eine sichtbare Uneinheitlichkeit innerhalb desselben
  Bauteils.
- Buttons/Komponenten: Keine Buttons, keine Karten, keine Trennlinien. Die Einheiten
  hängen wieder als hochgestellte Zeichen an der Zahl, aber **nicht konsistent**: bei
  „300" und „45.000" steht das „+" hochgestellt und kleiner, bei „800+" steht es
  auf gleicher Höhe und in Zahlengröße. Zwei Schreibweisen desselben Zeichens in einem
  Raster.
- Typo: Vier Stufen. Eyebrow eine orange Zeile ca. 16 px Regular. H2 ca. 42 px Regular
  Near-Black, zweizeilig. Zahlen ca. 78 px Regular bis Medium. Labels ca. 16 px Regular
  in mittlerem Grau.
- Farbe/Fläche: Warmgrau als einzige Fläche. Genau ein Akzentpunkt: die Eyebrow. Die
  Zahlen selbst sind Near-Black, nicht orange.
- Abstände/Rhythmus: Ca. 100 px von der Sektionsoberkante bis zur Eyebrow, ca. 35 px
  Eyebrow zu H2, ca. 25 px Zahl zu Label, ca. 115 px Zeilenabstand zwischen den beiden
  Zahlenreihen, ca. 295 px Spaltenabstand. Unter dem Raster bleiben ca. 85 px bis zur
  Sektionsunterkante; der linke Textblock endet dagegen schon ca. 320 px früher — die
  linke Spalte lässt sehr viel Leerraum stehen.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-PROOF-STRIP` (Lücke: 2x2 neben der Überschrift statt Dreierband darunter)

### 85 — Benefit-Slider, Rahmenkarten mit Icon [karriere__-desktop-05-y3000.png | -]
- Anordnung: Sektionskopf linksbündig ab ca. 140 px (Eyebrow, H2, drei Zeilen Fließtext),
  darunter eine **horizontal scrollende Kartenreihe** ab ca. 90 px, die rechts am
  Viewportrand angeschnitten ist: vier Karten voll sichtbar (je ca. 285 px breit, Lücke
  ca. 40 px), die fünfte nur mit ihrer linken Kante. Unter der Reihe eine
  Fortschrittsleiste statt Punkten oder Pfeilen.
- Buttons/Komponenten: Zwei Bauteile. (a) **Benefit-Karte**: weiße Fläche mit **dünner
  grauer 1-px-Kontur** und **ohne Radius** (rechteckig) und ohne Schatten — die einzige
  Kartenform des Atlas mit sichtbarem Rahmen statt Schatten. Innen oben links ein
  Linien-Icon ca. 40 px (Glühbirne, Palme, Hand mit Euro, Kinderwagen), darunter ein
  fetter Titel und zwei bis vier Zeilen Fließtext. Die Karten sind **gleich hoch**
  (ca. 360 px), aber der Inhalt ist **vertikal unterschiedlich verankert**: Karte 1 setzt
  ihr Icon bei ca. 755 px, Karte 2 bei ca. 795 px, Karte 3 bei ca. 780 px — die Icons
  stehen sichtbar auf verschiedenen Höhen. (b) **Fortschrittsleiste**: eine dünne
  hellgraue Linie über ca. 1080 px, darauf ein dunkler Balken von ca. 180 px bis 540 px,
  ca. 3 px stark, ohne Radius. Kein Pfeil, kein Punkt, keine Zählung.
- Typo: Vier Stufen. Eyebrow orange ca. 16 px, H2 ca. 42 px Regular, Fließtext des Kopfs
  ca. 16 px. In der Karte: Titel ca. 16 px **Bold** Near-Black (teils mit Trennstrich
  umbrochen), Text ca. 16 px Regular in mittlerem Grau. Der Kartentitel ist damit **genau
  so groß wie der Fließtext** und unterscheidet sich nur durch das Gewicht — der kleinste
  Typo-Kontrast im ganzen Atlas.
- Farbe/Fläche: Weiß auf Weiß, Trennung ausschließlich über die graue Kontur. Genau ein
  Akzentpunkt in der Sektion: die Eyebrow. Icons sind einfarbig dunkel, nicht orange.
- Abstände/Rhythmus: Ca. 130 px von der Sektionsoberkante bis zur Eyebrow, ca. 45 px
  Eyebrow zu H2, ca. 80 px H2 zum Fließtext, ca. 175 px Fließtext bis zur Kartenoberkante,
  ca. 60 px Karten zur Fortschrittsleiste. Karten-Innenabstand ca. 45 px links,
  ca. 70 px oben.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Angeschnittener Benefit-Slider mit Rahmenkarten und Fortschrittsbalken

### 86 — Mitarbeiter-Zitat-Karussell mit Fokus-Mitte [karriere__-desktop-05-y3000.png | karriere__-desktop-07-y4500.png | -]
- Anordnung: Sektionskopf linksbündig (Eyebrow, zweizeilige H2, zwei Zeilen Fließtext),
  darunter ein **dreispuriges Karussell mit hervorgehobener Mitte**: die mittlere
  Zitatkarte ist voll deckend, die linke und rechte Nachbarkarte sind stark ausgegraut
  und beidseitig am Viewportrand angeschnitten. Unter jeder Karte hängt ein rundes
  Porträt, darunter Name und Rolle, alles mittig zur jeweiligen Spur. Ganz unten eine
  Fünf-Segment-Leiste.
- Buttons/Komponenten: Drei Bauteile. (a) **Aktive Zitatkarte**: oranges gefülltes
  Rechteck ca. 545 x 225 px, Radius ca. 4 px, mit einem **nach unten zeigenden Dreieck**
  (ca. 30 px breit) an der Unterkante, das auf das Porträt zeigt — eine Sprechblase. Innen
  links ein großes graues Anführungszeichen-Glyph ca. 45 px, rechts daneben der Zitattext
  in Weiß. Das Bauteil ist die **einzige orange Großfläche mit Text darauf** im ganzen
  Atlas. (b) **Inaktive Nachbarkarten**: kein Kasten, kein Grund — nur grauer Text mit
  demselben Anführungszeichen-Glyph, auf Weiß. Der Zustandswechsel geht also von
  „Farbfläche" zu „gar keine Fläche", nicht von Farbe zu Grau. (c) **Segmentleiste**:
  fünf gleich lange Striche (je ca. 40 px, Abstand ca. 20 px, ca. 3 px stark), der erste
  orange, die übrigen hellgrau — hier also Segmente statt des durchgehenden
  Fortschrittsbalkens aus Sektion 85. Zwei verschiedene Slider-Indikatoren auf einer Seite.
- Typo: Vier Stufen. Eyebrow orange ca. 16 px. H2 ca. 42 px Regular, zweizeilig. Zitat
  ca. 17 px Regular in Weiß, vierzeilig. Name ca. 17 px Regular **orange**, Rolle ca. 14 px
  Regular orange in hellerem Ton — Name und Rolle sind bei allen drei Spuren orange, auch
  bei den ausgegrauten, dort nur mit reduzierter Deckkraft.
- Farbe/Fläche: Weiß als Grund, Orange als Fokusfläche, Grau für die Nachbarn. Die
  Porträts der inaktiven Spuren sind zusätzlich entsättigt.
- Abstände/Rhythmus: Ca. 105 px von der Kartenunterkante (Dreieckspitze) bis zur
  Porträtmitte, ca. 35 px Porträt zum Namen, ca. 20 px Name zur Rolle, ca. 190 px Rolle
  bis zur Segmentleiste, ca. 100 px bis zum Jobfilter.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Zitat-Karussell mit oranger Sprechblase und ausgegrauten Nachbarn

### 87 — Jobfilter, Suchfeld und Kategorie-Chips [karriere__-desktop-07-y4500.png | -]
- Anordnung: Alles linksbündig ab ca. 90 px — dieser Block nutzt einen **breiteren
  Container als der Rest der Seite** (90 px statt 140 px), die Kante ist gegenüber den
  Sektionsköpfen darüber sichtbar versetzt. Drei Stufen: eine Zählzeile, darunter das
  volle breite Suchfeld (ca. 90 bis 1350 px), darunter die Chips in **drei ungleich
  gefüllten Zeilen** (vier, vier, zwei), links ausgerichtet mit ca. 15 px Lücke.
- Buttons/Komponenten: Drei Bauteile. (a) **Suchfeld**: hellgrau gefülltes Rechteck,
  ca. 1260 x 48 px, **kein Radius**, keine Kontur, kein Lupen-Icon, Platzhaltertext links
  ca. 15 px in mittlerem Grau. Das einzige Eingabefeld des Atlas außerhalb des
  Rechner-Panels. (b) **Kategorie-Chips**: Rechtecke ohne Radius mit dünner grauer
  1-px-Kontur, Höhe ca. 40 px, Breite nach Labellänge (ca. 110 bis 360 px), Label ca. 14 px
  halbfett Near-Black. Der aktive Chip „Alle" ist **orange gefüllt mit weißem Label und
  ohne Kontur** — Zustandswechsel über Fläche, nicht über Rahmenstärke. (c) **Zählzeile**:
  reiner orange Bold-Text ca. 14 px mit „|"-Trennern, kein Kasten.
- Typo: Zwei Stufen. Zählzeile ca. 14 px Bold orange. Chips und Platzhalter ca. 14–15 px.
  Kein Sektionskopf, keine H2 — der Filter beginnt ohne Überschrift direkt nach dem
  Karussell.
- Farbe/Fläche: Weiß, ein hellgraues Feld, weiße Chips mit grauer Kontur, ein oranger
  Chip. Orange trägt hier **zwei verschiedene Rollen gleichzeitig**: aktiver Zustand
  (Chip) und Hervorhebungstext (Zählzeile).
- Abstände/Rhythmus: Ca. 45 px Zählzeile zum Suchfeld, ca. 45 px Suchfeld zur ersten
  Chip-Zeile, ca. 18 px Zeilenabstand zwischen den Chip-Zeilen, ca. 140 px bis zur ersten
  Kategorie-Überschrift der Liste.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Jobfilter mit randlosem Suchfeld und eckigen Kategorie-Chips

### 88 — Stellenliste, Kategoriegruppen mit Zeilen-Links [karriere__-desktop-07-y4500.png | karriere__-desktop-10-y6750.png | -]
- Anordnung: Eine lange, einspaltige Liste ab ca. 90 px bis ca. 1350 px, gegliedert in
  Kategoriegruppen. Je Gruppe eine große Überschrift, darunter die Stellen als volle
  Zeilenbreite. Jede Stellenzeile hat links den Titel und die Metazeile, ganz rechts bei
  ca. 1340 px einen Pfeil — der Klickbereich ist also die volle Zeile, nicht ein Button.
  Unter jeder Zeile eine dünne graue Trennlinie über die volle Breite; die letzte Zeile
  einer Gruppe hat ebenfalls eine Linie, danach folgt großer Weißraum.
- Buttons/Komponenten: **Kein einziger Button in der gesamten Liste.** Zwei Bauteile:
  (a) **Stellenzeile**: kein Rahmen, kein Grund, kein Radius, nur Text plus Unterlinie.
  Titel ca. 22 px Bold Near-Black, darunter die Metazeile ca. 15 px Regular **orange**
  mit einem Mittelpunkt als Trenner zwischen Anstellungsart und Ort. Zeilenhöhe ca. 90 px
  bei ca. 25 px Innenabstand oben. (b) **Pfeil-Icon**: dünner Rechtspfeil ca. 18 px,
  Near-Black, vertikal auf der Titelmitte. Kein Kreis, keine Fläche darum.
- Typo: Drei Stufen. Kategorie-Überschrift ca. 38 px Regular Near-Black, mit
  Gedankenstrich zwischen Bereich und Abteilung. Stellentitel ca. 22 px Bold. Metazeile
  ca. 15 px Regular orange. Auffällig: **die Metazeile ist die einzige durchgehend orange
  gesetzte Textmasse des Atlas** — auf 16 Stellen wiederholt sich der Akzent in jeder
  Zeile, was die Sparsamkeit der übrigen Routen deutlich bricht. Die Ortsangaben sind
  nicht normalisiert (ein Ort steht klein geschrieben).
- Farbe/Fläche: Reines Weiß über die ganze Listenlänge, keine Zebrastreifen, keine
  Gruppenflächen. Struktur entsteht allein aus Trennlinien und Weißraum.
- Abstände/Rhythmus: Ca. 65 px von der Kategorie-Überschrift zur ersten Stellenzeile,
  ca. 90 px Zeilenhöhe, ca. 135 px von der letzten Zeile einer Gruppe bis zur nächsten
  Kategorie-Überschrift — der Gruppenabstand ist damit rund 1,5-mal so groß wie eine
  Listenzeile.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Stellenliste als Zeilen-Links mit oranger Metazeile und Pfeil rechts

### 89 — FAQ-Akkordeon, ganzzeilig mit Plus-Kreis [karriere__-desktop-15-y10500.png | -]
- Anordnung: Eine einspaltige Akkordeonliste, hier **eingerückt** ab ca. 212 px bis
  ca. 1228 px — schmaler als die Stellenliste darüber und wieder mit einer anderen
  Containerkante. Je Zeile links die Frage, ganz rechts bei ca. 1170 px das Plus-Icon,
  darunter eine dünne graue Trennlinie über die volle Blockbreite. Im gelesenen Shot sind
  **alle Zeilen geschlossen** — kein geöffneter Zustand belegt.
- Buttons/Komponenten: Ein Bauteil. **Akkordeonzeile**: kein Grund, kein Rahmen, kein
  Radius. Rechts ein Plus in einem dünnen Kreis-Outline ca. 30 px, Strichstärke ca. 1 px,
  Near-Black. Kein Chevron, kein gefülltes Icon, keine Zustandsfarbe. Zeilenhöhe ca. 89 px,
  gleichmäßig über alle Zeilen. Die Fragen tragen uneinheitliche Interpunktion (eine ohne
  Fragezeichen).
- Typo: Eine Stufe. Frage ca. 17 px **Bold** Near-Black, einzeilig, vertikal zentriert.
  Keine Sektions-H2 im gelesenen Ausschnitt oberhalb der Liste sichtbar.
- Farbe/Fläche: Reines Weiß, kein Akzent — die einzige Sektion der Route ganz ohne Orange.
  Trennlinien in sehr hellem Grau.
- Abstände/Rhythmus: Ca. 89 px Zeilenhöhe bei ca. 30 px Innenabstand oben und unten,
  ca. 205 px von der letzten Zeile bis zur harten Oberkante des Abschlussbands.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Flaches FAQ-Akkordeon mit Plus-Kreis rechts (vgl. Sektion 14, dort
  mit seitlichem CTA-Block, hier ohne)

### 90 — Abschlussband und Footer [karriere__-desktop-15-y10500.png | karriere__-desktop-16-y10729.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band mit harter Oberkante,
  zweizeilige linksbündige H2 ab ca. 140 px, unterstrichener Bold-Link „Broschüre
  herunterladen", drei Auszeichnungs-Logos in Gold; darunter der Fünf-Spalten-Footer mit
  Logo und drei Social-Icons links, vier Linkspalten rechts). Bemerkenswert: das Band
  zeigt dieselben drei **Produkt**-Auszeichnungen wie überall, obwohl die Route oben vier
  eigene **Arbeitgeber**-Siegel führt (Sektion 82) — die beiden Siegelsätze werden nicht
  zusammengeführt. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /energiesystem/

### 91 — Header / Navigationsleiste [energiesystem__-desktop-00-fold.png | -]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste, Logo links,
  sechs Nav-Punkte, „Kundenportal", oranger Rechteck-CTA rechts. Aktiver Nav-Punkt ist
  **„Energiesystem"** mit kurzer dunkler Unterstreichung. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 92 — Persistente Berater-Pille (Overlay) [energiesystem__-desktop-00-fold.png | energiesystem__-desktop-22-y15750.png | -]
- Overlay, kein Sektionselement — hier dokumentiert, weil es in **jedem** gelesenen
  Desktop-Slice dieser Route auftaucht und die Sektionen darunter teilweise verdeckt.
- Anordnung: Fix am unteren Viewportrand, **horizontal zentriert** (ca. 543 bis 897 px),
  Unterkante ca. 40 px über dem Viewportende. Es liegt damit anders als der runde
  Scroll-nach-oben-Button, der unten rechts sitzt; beide Overlays existieren gleichzeitig.
- Buttons/Komponenten: Eine Pille aus drei Teilen: links ein rundes Berater-Porträt
  ca. 50 px mit hellem Ring, mittig ein Label in Weiß, rechts ein oranger Kreis ca. 47 px
  mit weißem Plus. Der Pillenkörper ist Near-Black mit voller Rundung (Radius = halbe
  Höhe, ca. 32 px), Höhe ca. 64 px, Breite ca. 355 px, mit weichem Schatten. Das ist die
  **einzige voll gerundete Pille des Atlas** — alle anderen Buttons sind Rechtecke mit
  3–5 px Radius. In `energiesystem__-desktop-22-y15750.png` liegt sie über den
  Footer-Linkspalten und verdeckt dort Text.
- Typo: Eine Stufe, Label ca. 15 px halbfett in Weiß.
- Farbe/Fläche: Near-Black plus ein oranger Kreis. Das Orange sitzt hier als **Kreis**,
  nicht als Rechteck — die einzige runde Akzentfläche des Atlas.
- Abstände/Rhythmus: Ca. 8 px Innenabstand um das Porträt, ca. 20 px Label zum Pluskreis.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Persistente zentrierte Berater-Pille als Bottom-Overlay

### 93 — Hero auf Himmelsverlauf mit Iso-Illustration [energiesystem__-desktop-00-fold.png | -]
- Anordnung: Vollflächige Sektion mit weichem Himmelsverlauf (helle Wolken, große diffuse
  Sonnenscheibe oben mittig-rechts) statt eines Fotos. Textspalte linksbündig ab
  ca. 158 px, rechts ab ca. 650 px die isometrische Haus-Illustration auf heller
  Grundplatte. Vierstufig: Produktlogo, H1, Lead, CTA. Die Sektion endet unten mit einer
  **weißen Fläche mit gerundeten Oberecken**, die sich ab ca. y=880 ins Bild schiebt —
  dieselbe Überlappungslogik wie im Hero der Startseite.
- Buttons/Komponenten: Genau ein CTA im Fold, „Jetzt Gewinn berechnen": oranges gefülltes
  Rechteck ca. 240 x 58 px, Radius ca. 3 px, Label **dunkel** ca. 15 px halbfett — dieselbe
  dunkellabelige Variante wie der Hero-CTA der Startseite, nicht die weiße wie auf
  `/karriere/`. Dazu die persistente Berater-Pille aus Sektion 92.
- Typo: Vier Stufen. Statt der orangen Eyebrow-Zeile aller anderen Routen steht hier ein
  **gesetztes Produktlogo** „EKD 365" mit hochgestelltem orangem Plus, ca. 30 px, Wortteil
  in zwei Gewichten (Bold plus Light). H1 ca. 58 px Regular Near-Black, dreizeilig,
  Zeilensprung ca. 77 px — **dunkel statt weiß**, weil kein dunkles Foto darunter liegt.
  Lead ca. 17 px Regular in dunklem Grau, zwei Zeilen, mit Geviertstrich.
- Farbe/Fläche: Sehr helle, fast weiße Verlaufsfläche mit orangem Sonnenkreis oben; die
  Illustration bringt Orange als Leitungsfarbe. Akzent damit in vier Punkten: Sonne,
  Plus-Zeichen, CTA-Fläche, Illustrationslinien.
- Abstände/Rhythmus: Ca. 275 px von der Leiste bis zum Produktlogo, ca. 35 px Logo zur H1,
  ca. 65 px H1 zum Lead, ca. 45 px Lead zum CTA. Die Illustration ist mit ca. 680 px Breite
  fast doppelt so breit wie der Textblock.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Lücke: Verlaufsfläche und Illustration statt Foto, Produktlogo
  statt Eyebrow)

### 94 — Bento-Raster auf Warmgrau, fünf ungleiche Kacheln [energiesystem__-desktop-03-y1500.png | -]
- Anordnung: Zwei Reihen warmgrauer Kacheln auf Weiß, bewusst ungleich. Reihe 1: schmal
  (ca. 275 px), breit (ca. 570 px), schmal (ca. 275 px), alle ca. 425 px hoch. Reihe 2:
  zwei Kacheln in etwa 50/50 (je ca. 570 px), ca. 305 px hoch. Der Inhalt wechselt die
  Reihenfolge je Kachel: Titel oben und Bild darunter (links), Titel plus Unterzeile
  (Mitte), Bild oben und Titel darunter (rechts). Dasselbe Prinzip wie Sektion 03 der
  Startseite, aber **auf Warmgrau statt Weiß auf Weiß**.
- Buttons/Komponenten: **Keine Buttons, keine Links.** Kacheln: warmgraue Fläche, Radius
  ca. 8 px (geschätzt), **kein Schatten und keine Kontur** — die Trennung entsteht hier
  allein aus dem Flächenkontrast zum weißen Grund, während Sektion 03 sie über Schatten
  löst. Eine Kachel (unten links) trägt statt eines Titels das Produktlogo „EKD 365" mit
  hochgestelltem orangem Plus auf einem orangen Weichverlauf über einem Wolkenfoto — die
  einzige Kachel mit Bildhintergrund statt Flächenfarbe.
- Typo: Drei Stufen, aber ohne feste Hierarchie. Kachel-Titel je nach Kachelbreite
  ca. 22 px (schmal links), ca. 55 px (breite Mitte), ca. 38 px (schmal rechts) und
  ca. 38 px (Reihe 2) — die Größe folgt wieder der Kachelbreite, nicht dem Rang.
  Unterzeilen ca. 16 px Regular in mittlerem Grau. Auffällig: die Mittelkachel setzt eine
  einzige Aussage über zwei Zeilen in ca. 55 px und darunter nur eine kleine Zeile.
- Farbe/Fläche: Warmgrau auf Weiß. Orange nur im Plus des Produktlogos und im Verlauf der
  einen Bildkachel — der Rest ist achromatisch.
- Abstände/Rhythmus: Lücke zwischen den Kacheln ca. 20 px, Reihenabstand ca. 22 px,
  Innenabstand ca. 25 px. Nach der zweiten Reihe ca. 185 px Weißraum.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-OFFER-PAIR` (Lücke: fünf ungleiche Kacheln, keine CTAs) — alternativ
  Kandidat: Bento-Kartenraster auf Warmgrau ohne Schatten

### 95 — Zentrierter Sektionskopf mit Produktlogo [energiesystem__-desktop-03-y1500.png | energiesystem__-desktop-13-y9000.png | -]
- Anordnung: Ein wiederkehrendes Bauteil dieser Route, mindestens zweimal belegt: alles
  **mittig auf der Seitenachse** (ca. 720 px) — Produktlogo, zweizeilige H2, darunter ein
  zentrierter Absatz von zwei bis vier Zeilen. In `energiesystem__-desktop-13-y9000.png`
  steht dieser Kopf zusätzlich auf einer gerenderten Wolkenbank mit großer diffuser
  Sonnenscheibe, wobei das Produktlogo **direkt in der Sonnenscheibe** liegt. Alle anderen
  Routen des Atlas setzen ihre Sektionsköpfe linksbündig; hier ist die Zentrierung die
  Regel.
- Buttons/Komponenten: Kein Button in diesem Bauteil.
- Typo: Drei Stufen. Produktlogo ca. 25 px mit orangem Plus. H2 ca. 42 px Regular
  Near-Black, zweizeilig, Zeilensprung ca. 65 px. Absatz ca. 17 px Regular in dunklem Grau,
  zentriert, Zeilenabstand ca. 28 px, Zeilenlänge nur ca. 640 px — deutlich schmaler als
  der Textcontainer. Innerhalb des Absatzes wird eine Angabe **fett hervorgehoben**, was
  sonst im Atlas nur im Fließtext der Ratgeber-Route vorkommt.
- Farbe/Fläche: Weiß bzw. Wolken-/Sonnenrendering. Akzent nur im Plus des Logos und in der
  Sonnenscheibe.
- Abstände/Rhythmus: Ca. 35 px Logo zur H2, ca. 60 px H2 zum Absatz, danach ca. 190 px bis
  zum folgenden Block.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Zentrierter Sektionskopf mit Produktlogo über der H2

### 96 — Vergleichs-Diagramm, Split mit Legende [energiesystem__-desktop-07-y4500.png | -]
- Anordnung: Zweispalter. Links ab ca. 140 px eine dreizeilige H2, darunter zwei Zeilen
  Fließtext und darunter eine zweizeilige Legende. Rechts ab ca. 640 px bis ca. 1300 px
  ein Liniendiagramm mit beschrifteten Achsen. Der Textblock ist mit ca. 330 px Breite
  auffällig schmal, das Diagramm nimmt gut die Hälfte der Seitenbreite.
- Buttons/Komponenten: Vier Bauteile. (a) **Diagramm**: zwei Kurven ohne Raster außer zwei
  waagerechten Hilfslinien, je Kurve ein Ringpunkt am Anfang und ein Ringpunkt mit
  Diagonalpfeil am Ende. Achsen nur mit Wortlabeln („Gewinn", „Invest", „Jahre") und drei
  Werten. (b) **Zwei Tooltip-Fahnen** oben: Near-Black gefüllte Rechtecke ca. 122 x 70 px,
  ohne Radius, mit einer dünnen senkrechten Linie nach unten zum Kurvenpunkt — Beschriftung
  zweizeilig weiß ca. 14 px. (c) **Legende**: zwei ausgefüllte Kreise ca. 25 px mit
  Textlabel daneben, links unter dem Fließtext. (d) Ein **großer orangefarbener Pfeil nach
  unten** ca. 105 x 130 px, mittig auf der Seitenachse, als reines Führungselement zwischen
  Diagramm und CTA-Block — ein Bauteil ohne Entsprechung auf anderen Routen.
- Typo: Vier Stufen. H2 ca. 38 px Regular, dreizeilig. Fließtext ca. 16 px Regular grau.
  Legendenlabel ca. 15 px, Achsen- und Tooltiplabel ca. 14 px.
- Farbe/Fläche: Weiß. **Das Diagramm führt Blau als zweite Datenfarbe ein** (die
  Vergleichskurve und ihr Legendenpunkt), gegen Orange für das eigene Produkt. Blau
  erscheint sonst im ganzen Atlas nur in Fremdmarken — hier ist es Teil der eigenen
  Datengrafik.
- Abstände/Rhythmus: Ca. 40 px H2 zum Fließtext, ca. 45 px Fließtext zur Legende,
  ca. 30 px zwischen den Legendenzeilen. Ca. 140 px vom Diagramm bis zum Pfeil.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Amortisations-Diagramm mit Tooltip-Fahnen und Zweifarben-Legende

### 97 — Zentrierter Rechner-Aufruf [energiesystem__-desktop-07-y4500.png | -]
- Anordnung: Alles zentriert auf der Seitenachse, drei Stufen: zweizeilige H2, eine
  Textzeile, ein Button. Ohne Sektionsfläche, direkt auf Weiß, eingeleitet vom orangen
  Pfeil aus Sektion 96.
- Buttons/Komponenten: Genau ein Button, „Zum Ersparnisrechner": oranges gefülltes
  Rechteck ca. 217 x 58 px, Radius ca. 3 px, Label **dunkel** ca. 15 px halbfett,
  **zentriert** — zusammen mit „Mehr anzeigen" auf `/magazin/` einer der wenigen
  zentrierten Buttons des Atlas.
- Typo: Drei Stufen. H2 ca. 42 px Regular Near-Black, zweizeilig, mit Ausrufezeichen.
  Textzeile ca. 16 px Regular in mittlerem Grau, einzeilig. Label ca. 15 px.
- Farbe/Fläche: Weiß, ein Akzentpunkt (der Button) plus der Pfeil darüber.
- Abstände/Rhythmus: Ca. 45 px Pfeil zur H2, ca. 55 px H2 zur Textzeile, ca. 45 px
  Textzeile zum Button.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-CTA-MID`

### 98 — Doppelkachel, Fotokachel neben Donut-Kachel [energiesystem__-desktop-13-y9000.png | energiesystem__-desktop-18-y12750.png | -]
- Anordnung: Ein zweiteiliger Block, zweimal auf der Route belegt und dabei **gespiegelt**:
  in `energiesystem__-desktop-13-y9000.png` steht die dunkle Donut-Kachel links
  (ca. 140–510 px) und die Fotokachel rechts, in `energiesystem__-desktop-18-y12750.png`
  ist es umgekehrt (Foto links ca. 140–905 px, Donut rechts ca. 930–1300 px). Die
  Fotokachel ist rund doppelt so breit wie die Donut-Kachel, beide gleich hoch
  (ca. 710 px). Radius ca. 8 px (geschätzt).
- Buttons/Komponenten: Zwei Bauteile, beide **ohne Button und ohne Link**. (a)
  **Fotokachel**: Renderfoto eines Hauses mit eingezeichneten gelben Energieflusslinien,
  darüber links oben eine zweizeilige H3 in Weiß und zwei Zeilen Kleintext. Der Text liegt
  **ohne Wash direkt auf dem Bild**, weshalb die zweite Textzeile im Winter-Motiv
  (`energiesystem__-desktop-13-y9000.png`) auf dem hellen Himmel nur schwach steht.
  (b) **Donut-Kachel**: Near-Black gefüllt, oben ein Ringdiagramm ca. 275 px Durchmesser
  mit ca. 35 px Ringstärke, zweifarbig Orange/Blau mit zwei kleinen weißen Icons im Ring
  und dünnen Zeigerlinien nach innen; darunter eine zweizeilige Überschrift in Weiß und
  eine Legende aus zwei Kreisen mit zweizeiligen Labels.
- Typo: Drei Stufen. Kachel-H3 ca. 34 px Regular (Foto: Weiß; Donut: Weiß), Kleintext auf
  dem Foto ca. 15 px Regular, Legendenlabels ca. 15 px halbfett Weiß.
- Farbe/Fläche: Der Vergleich läuft über **Orange gegen Blau** im Ring, mit umgekehrten
  Anteilen zwischen den beiden Vorkommen (im Winter-Ring dominiert Blau, im Sommer-Ring
  Orange). Das ist die konsequenteste Datenfarb-Verwendung des Atlas.
- Abstände/Rhythmus: Lücke zwischen den beiden Kacheln ca. 25 px. Innen: ca. 55 px vom
  Ring zur Überschrift, ca. 55 px Überschrift zur Legende, ca. 50 px zwischen den
  Legendenzeilen.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Doppelkachel aus breiter Fotokachel und schmaler Donut-Datenkachel

### 99 — Tarif-Panel mit Anbieter-Kasten [energiesystem__-desktop-18-y12750.png | -]
- Anordnung: Warmgraue Sektion, im gelesenen Ausschnitt nur mit ihrem unteren Teil
  sichtbar: links ab ca. 140 px ein unterstrichener Bold-Textlink, rechts ab ca. 733 px
  bis ca. 1350 px ein Kasten mit vier Anbieterlogos in einer Zeile. Der obere Teil der
  Sektion liegt außerhalb des gelesenen Slices und ist **nicht geprüft**.
- Buttons/Komponenten: Zwei Bauteile. (a) **Textlink** „Dynamischer Stromtarif EKD Flow":
  Near-Black Bold ca. 16 px mit durchgehender Unterstreichung, ohne Kasten. (b)
  **Anbieter-Kasten**: weiße Fläche mit **blauer 1-px-Kontur** und Radius ca. 8 px,
  ca. 617 x 145 px, darin vier Fremdlogos nebeneinander in Originalfarbe (eines rot). Über
  dem Kasten läuft eine blaue Linie von oben herein — der Kasten ist Endpunkt eines
  Diagrammpfads, dessen Anfang außerhalb des Slices liegt. **Blau als Kontur- und
  Linienfarbe** setzt hier die Datenfarbe aus Sektion 96 und 98 fort.
- Typo: Eine Stufe im gelesenen Bereich: Link ca. 16 px Bold. Die Logos tragen eigene
  Fremdtypografie in stark unterschiedlichen Größen und werden nicht normalisiert; ein
  Logo ist am linken Kastenrand **angeschnitten** und dort nicht vollständig lesbar.
- Farbe/Fläche: Warmgrau als Sektionsfläche, weißer Kasten mit blauer Kontur.
- Abstände/Rhythmus: Ca. 100 px von der Kastenunterkante bis zur Sektionsunterkante.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Anbieter-Kasten mit blauer Kontur als Diagramm-Endpunkt

### 100 — Themenraster auf Orangeverlauf, sechs Karten mit Plus [energiesystem__-desktop-22-y15750.png | -]
- Anordnung: Zwei Reihen zu je drei gleich breiten weißen Karten (je ca. 360 px, Lücke
  ca. 40 px) von ca. 140 px bis ca. 1300 px, auf einer **dunklen Fläche mit großem
  diffusem Orangeverlauf** — der Verlauf läuft von links unten nach rechts unten quer
  hinter den Karten durch und ist an der Sektionsunterkante am hellsten. Die Sektion endet
  mit einer sichtbaren Kante zum reinen Near-Black des Abschlussbands; beide sind dunkel,
  aber unterschiedlich.
- Buttons/Komponenten: Ein Bauteil, sechsmal. **Themenkarte**: weiße Fläche, Radius
  ca. 4 px, kein Schatten, kein Rahmen. Oben links der Titel über zwei bis vier Zeilen,
  unten rechts ein Aktionspaar aus dem Wort „Mehr erfahren" (ca. 16 px Regular Near-Black,
  **ohne Unterstreichung**) plus einem orangen gefüllten Kreis ca. 45 px mit weißem Plus.
  Der Kreis ist damit das zweite runde Orange-Bauteil der Route, nach der Berater-Pille.
  Die Karten sind **gleich hoch** (ca. 235 px), obwohl die Titel unterschiedlich lang sind
  — das Aktionspaar sitzt bei allen auf derselben Grundlinie.
- Typo: Zwei Stufen. Kartentitel ca. 22 px Regular Near-Black, Zeilensprung ca. 32 px,
  nicht fett. Aktionslabel ca. 16 px Regular. Kein Teasertext in den Karten.
- Farbe/Fläche: Dunkler Grund mit Orangeverlauf, weiße Karten, orange Kreise. Das ist die
  **einzige Sektion des Atlas, in der Orange als großflächiger Hintergrundverlauf**
  auftritt statt nur punktuell.
- Abstände/Rhythmus: Ca. 40 px Reihenabstand, Innenabstand ca. 50 px links und oben,
  ca. 30 px unten. Nach der zweiten Reihe ca. 145 px bis zur Sektionskante.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Themenraster mit Plus-Kreis-Karten auf Orangeverlauf

### 101 — Abschlussband und Footer [energiesystem__-desktop-22-y15750.png | energiesystem__-desktop-23-y16030.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band, zweizeilige linksbündige
  H2, unterstrichener Bold-Link „Broschüre herunterladen", drei Auszeichnungs-Logos in
  Gold; darunter der Fünf-Spalten-Footer). Abweichung nur durch das Overlay: die
  persistente Berater-Pille aus Sektion 92 liegt in
  `energiesystem__-desktop-22-y15750.png` **über den Footer-Linkspalten** und verdeckt
  dort einen Eintrag der Angebot-Spalte teilweise. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /pv-grossanlagen/

### 102 — Header / Navigationsleiste [pv-grossanlagen__-desktop-00-fold.png | -]
- Identisch zu Sektion 34 der Route `/unternehmen/`: weiß hinterlegte Leiste, Logo links,
  sechs Nav-Punkte, „Kundenportal", oranger Rechteck-CTA rechts. Aktiver Nav-Punkt ist
  **„PV-Großanlagen"** mit kurzer dunkler Unterstreichung. Siehe dort.
- Pattern: Kandidat: Transparenter Foto-Header mit Wort-Burger und genau einem
  Rechteck-CTA (hier in der weiß hinterlegten Variante)

### 103 — Hero, Foto mit Lead und weißem CTA-Label [pv-grossanlagen__-desktop-00-fold.png | pv-grossanlagen__-desktop-02-y750.png | -]
- Anordnung: Vollflächiges Foto unter der weißen Leiste, ca. 655 px hoch, mit **harter
  Unterkante** (`pv-grossanlagen__-desktop-02-y750.png` zeigt die gerade Kante ohne
  Rundung und ohne Überlappung). Textspalte linksbündig ab ca. 140 px, dreistufig plus
  CTA, vertikal etwa mittig gesetzt.
- Buttons/Komponenten: Genau ein CTA, „Jetzt Kontakt aufnehmen": oranges gefülltes
  Rechteck ca. 247 x 58 px, Radius ca. 3 px, Label **weiß** ca. 15 px halbfett — die
  B2B-Route nutzt damit dieselbe weiße Label-Variante wie `/karriere/`, nicht die dunkle
  der Consumer-Heroes. **Kein Bewertungs-Proof im Fold** — der einzige Foto-Hero des Atlas
  ohne Sterne oder Siegel; die Zielgruppe bekommt keinen Consumer-Proof.
- Typo: Drei Stufen. Eyebrow orange ca. 17 px Regular ohne Caps, hier der **Firmenname**
  statt eines Claims. H1 ca. 58 px Regular Weiß, **einzeilig** über ca. 845 px — die
  einzige einzeilige H1 aller Heroes. Lead ca. 17 px Regular Weiß über drei Zeilen,
  Zeilenabstand ca. 28 px. Verhältnis H1 zu Lead rund 3,4:1 (geschätzt).
- Farbe/Fläche: Luftbild eines begrünten Flachdachs mit Modulreihen, natürlich belichtet
  mit hellem Himmel oben — **kein durchgehender dunkler Wash** wie im Hero der Startseite.
  Dadurch steht die weiße Lead-Zeile in der oberen Bildhälfte auf hellem Grund und ist
  dort schwächer lesbar; die zweite und dritte Lead-Zeile laufen über eine hell
  gesprenkelte Dachfläche und sind **stellenweise nicht gut lesbar**.
- Abstände/Rhythmus: Ca. 250 px von der Leiste bis zur Eyebrow, ca. 30 px Eyebrow zu H1,
  ca. 55 px H1 zum Lead, ca. 65 px Lead zum CTA, ca. 165 px CTA bis zur Fotounterkante.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO`

### 104 — Einleitungs-Split, Textblock neben Luftbild [pv-grossanlagen__-desktop-02-y750.png | -]
- Anordnung: Zweispalter ohne Sektionsfläche, aber mit ungewöhnlicher Verteilung: links
  ab ca. 140 px ein sehr langer Textblock (Eyebrow, zweizeilige H2, drei Absätze, Breite
  ca. 695 px), rechts ab ca. 875 px ein einzelnes Luftbild ca. 400 x 265 px mit kleinem
  Radius (ca. 4 px, geschätzt). Das Bild ist **klein gegenüber dem Text** und sitzt auf
  Höhe des ersten Absatzes; unter ihm bleiben ca. 250 px leer, während der Text
  weiterläuft.
- Buttons/Komponenten: **Kein Button, kein Link.** Reiner Text-Bild-Block.
- Typo: Drei Stufen. Eyebrow orange ca. 17 px Regular. H2 ca. 42 px Regular Near-Black,
  zweizeilig, Zeilensprung ca. 55 px. Fließtext ca. 17 px Regular in dunklem Grau,
  Zeilenabstand ca. 28 px, Absatzabstand ca. 30 px — drei Absätze zu drei, fünf und vier
  Zeilen. Der Fließtext ist damit die längste zusammenhängende Textmasse außerhalb der
  Ratgeber- und News-Routen.
- Farbe/Fläche: Reines Weiß. Genau ein Akzentpunkt: die Eyebrow.
- Abstände/Rhythmus: Ca. 130 px von der Fotokante des Heroes bis zur Eyebrow, ca. 35 px
  Eyebrow zu H2, ca. 60 px H2 zum ersten Absatz. Nach dem Block ca. 100 px bis zur
  Beratungs-Leiste.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Text-dominanter Einleitungs-Split mit kleinem Beleg-Bild

### 105 — Beratungs-Leiste auf Warmgrau [pv-grossanlagen__-desktop-04-y2250.png | -]
- Anordnung: Ein flaches, liegendes Band mit warmgrauer Fläche ab ca. x=140 bis
  ca. x=1300, Höhe nur ca. 160 px — deutlich flacher als alle anderen Aktionsbänder des
  Atlas. Innen eine einzige Zeile: links ab ca. 205 px eine zweizeilige Ansprache, rechts
  bei ca. 987–1232 px der Button, beide vertikal zentriert.
- Buttons/Komponenten: Genau ein Button, „Jetzt Kontakt aufnehmen": oranges gefülltes
  Rechteck ca. 245 x 55 px, Radius ca. 3 px, weißes Label ca. 15 px halbfett — dasselbe
  Bauteil wie im Hero, hier auf Warmgrau statt auf Foto.
- Typo: Eine Stufe. Ansprache ca. 20 px **Bold** Near-Black, zweizeilig, mit Fragezeichen
  und Ausrufezeichen in einer Zeile. Es gibt **keine H2 und keine Eyebrow** — die
  Aktionsleiste kommt ohne Sektionskopf aus, anders als `P-CTA-MID` auf den
  Consumer-Routen.
- Farbe/Fläche: Warmgrau als einzige Fläche, kein Radius sichtbar an den Bandecken, ein
  Akzentpunkt.
- Abstände/Rhythmus: Ca. 40 px Innenabstand oben und unten, ca. 65 px vom linken Bandrand
  bis zum Text. Nach dem Band ca. 110 px bis zum Referenz-Kopf.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-CTA-MID` (Lücke: flache Leiste ohne H2, Text und Button in einer Zeile)

### 106 — Referenz-Slider, Fotokacheln mit Textauflage [pv-grossanlagen__-desktop-04-y2250.png | -]
- Anordnung: Linksbündiger Sektionskopf ab ca. 140 px (Eyebrow, H2), darunter eine
  **horizontal scrollende Reihe** von Fotokacheln ab ca. 90 px, rechts angeschnitten:
  vier Kacheln voll sichtbar (je ca. 285 x 270 px, Lücke ca. 40 px), die fünfte nur mit
  ihrer linken Kante. Unter der Reihe zwei Punkte als Seiten-Indikator, **zentriert auf
  ca. 720 px** — obwohl die Kachelreihe linksbündig beginnt, sitzt der Indikator mittig,
  was sichtbar nicht zueinander ausgerichtet ist.
- Buttons/Komponenten: Zwei Bauteile. (a) **Referenzkachel**: randloses Foto mit Radius
  ca. 4 px, darauf **oben zentriert** ein zweizeiliger Titel in Weiß, direkt auf dem Bild
  ohne Wash und ohne Kasten. Auf den helleren Motiven (Kachel 2 und 4) steht der Titel
  dadurch **schwach lesbar**. (b) **Punkt-Indikator**: zwei Punkte ca. 10 px, der aktive
  als **Ring/Outline**, der inaktive als kleiner gefüllter Punkt in Grau — die Umkehrung
  der üblichen Konvention (aktiv gefüllt, inaktiv leer).
- Typo: Drei Stufen. Eyebrow orange ca. 17 px. H2 ca. 42 px Regular Near-Black, einzeilig.
  Kacheltitel ca. 16 px **Bold** Weiß, zentriert, zwei bis drei Zeilen.
- Farbe/Fläche: Weiß als Grund, Fotos als einzige Flächen. Ein Akzentpunkt (Eyebrow).
- Abstände/Rhythmus: Ca. 35 px Eyebrow zu H2, ca. 155 px H2 bis zur Kachelreihe,
  ca. 70 px Kacheln zum Indikator, ca. 165 px bis zur ersten Referenzkarte.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Angeschnittener Referenz-Slider mit Titel direkt auf dem Foto

### 107 — Referenzkarten, Foto-Text-Split mit Tag-Chips und Kennzahlen [pv-grossanlagen__-desktop-04-y2250.png | pv-grossanlagen__-desktop-09-y6000.png | -]
- Anordnung: Ein Bauteil, mehrfach untereinander wiederholt (mindestens vier belegt), je
  ca. 690 px hoch. Jede Karte ist ein Zweispalter innerhalb einer weißen Kartenfläche von
  ca. 140 px bis ca. 1250 px: links ein randloses Foto über die volle Kartenhöhe
  (ca. 545 px breit), rechts der Textbereich ab ca. 730 px. Der Textbereich stapelt fünf
  Stufen: Titel, Chip-Zeile, Fließtext, Kennzahlpaar, Aktionszeile unten rechts. **Alle
  Karten sind gleich aufgebaut**, das ist die konsequenteste Wiederholung des Atlas.
- Buttons/Komponenten: Drei Bauteile. (a) **Tag-Chips**: Rechtecke mit **oranger
  1-px-Kontur, orangem Label und weißem Grund**, Höhe ca. 37 px, Radius ca. 3 px, zwei
  Stück nebeneinander mit ca. 20 px Lücke. Das ist die einzige Outline-Variante des
  Akzents im Atlas — sonst ist Orange immer gefüllt. (b) **Kennzahlpaar**: zwei Zahlen
  nebeneinander mit **tiefgestellter** Einheit (ca. 20 px gegen ca. 55 px) und einem
  Label darunter; die Einheit sitzt hier auf der Grundlinie, während sie auf `/` und
  `/ersparnisrechner/` hochgestellt war — zwei gegensätzliche Setzungen desselben Musters
  innerhalb der Site. (c) **Aktionszeile**: das Wort „Zur Kundenreferenz" ca. 16 px
  Regular Near-Black ohne Unterstreichung, daneben ein oranger gefüllter Kreis ca. 45 px
  mit weißem Rechtspfeil — dasselbe Kreis-Bauteil wie in Sektion 100, hier mit Pfeil statt
  Plus. Die Zeile steht **rechtsbündig** an der Kartenkante.
- Typo: Fünf Stufen. Titel ca. 38 px Regular Near-Black, ein bis drei Zeilen. Chip-Label
  ca. 14 px halbfett orange. Fließtext ca. 16 px Regular grau, vier bis sechs Zeilen.
  Zahl ca. 55 px Regular, Kennzahl-Label ca. 16 px Regular grau. Aktionslabel ca. 16 px.
- Farbe/Fläche: Weiße Kartenfläche mit sehr weichem Schatten auf weißem Grund (wie
  Sektion 03), Foto randlos an der linken Kante bis zur Kartenkante. Akzent in genau drei
  Punkten je Karte: zwei Chip-Konturen und ein Pfeilkreis.
- Abstände/Rhythmus: Ca. 50 px Titel zur Chip-Zeile, ca. 45 px Chips zum Fließtext,
  ca. 90 px Fließtext zum Kennzahlpaar, ca. 25 px Zahl zum Label, ca. 115 px bis zur
  Aktionszeile. Zwischen zwei Referenzkarten ca. 110 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Referenzkarte mit randlosem Foto, Outline-Chips und Kennzahlpaar

### 108 — Argument-Trio mit Linien-Icons [pv-grossanlagen__-desktop-12-y8250.png | -]
- Anordnung: Drei gleich breite Spalten (Achsen ca. 325 px, 720 px, 1115 px), **alles
  zentriert** innerhalb der Spalte: Icon oben mittig, darunter Titel, darunter Fließtext.
  Kein Sektionskopf, keine Karten, keine Trennlinien — die Spalten stehen frei auf Weiß.
  Die Spalten sind **nicht auf gleiche Höhe gezogen**: Titel 1 ist einzeilig, Titel 2 und 3
  sind zweizeilig, wodurch die Fließtexte auf zwei verschiedenen Grundlinien beginnen
  (ca. 190 px gegen ca. 222 px).
- Buttons/Komponenten: **Kein Button, kein Link.** Ein Bauteil: das Linien-Icon oben,
  ca. 40 px, Strichstärke ca. 1,5 px, Near-Black, ohne Kreis oder Fläche darum (Häkchen im
  Kreis, Sparschwein, Haus mit Kreispfeil).
- Typo: Zwei Stufen. Titel ca. 22 px Regular Near-Black, zentriert. Fließtext ca. 16 px
  Regular in mittlerem Grau, zentriert, Zeilenabstand ca. 28 px. Auffällig: **innerhalb
  des Fließtextes sind Teilsätze fett gesetzt** — in allen drei Spalten, jeweils an
  anderer Stelle (Anfang, Mitte, Ende). Das ist die einzige Sektion des Atlas, die
  Fettung als Hervorhebung im Fließtext systematisch einsetzt.
- Farbe/Fläche: Reines Weiß, kein Akzent, keine Fläche.
- Abstände/Rhythmus: Ca. 40 px Icon zum Titel, ca. 35 px Titel zum Fließtext, ca. 395 px
  Spaltenabstand. Nach dem Trio ca. 155 px bis zum Zahlen-Panel.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Zentriertes Argument-Trio mit Linien-Icon und Fettungen im Fließtext

### 109 — Zahlen-Panel auf Near-Black mit oranger H2 [pv-grossanlagen__-desktop-12-y8250.png | -]
- Anordnung: Ein großes Panel mit Near-Black-Fläche ab ca. x=140 bis ca. x=1300, Höhe
  ca. 580 px, ohne sichtbaren Radius. Innen linksbündig ab ca. 188 px: Eyebrow, H2,
  darunter ein **3+2-Raster** aus fünf Kennzahlen (drei in der ersten Reihe, zwei in der
  zweiten). Die fünfte Rasterzelle bleibt leer — das Raster wird nicht umbrochen oder
  zentriert, die Lücke rechts unten bleibt sichtbar stehen.
- Buttons/Komponenten: **Kein Button.** Die Einheiten hängen wieder als **tiefgestellte**
  Zeichen an der Zahl (ca. 20 px gegen ca. 62 px), passend zu Sektion 107 und im
  Widerspruch zur hochgestellten Setzung auf `/`.
- Typo: Vier Stufen. Eyebrow ca. 17 px Regular in hellem Grau (**nicht orange**, anders
  als alle anderen Eyebrows der Route). H2 ca. 42 px Regular **in Orange** — die einzige
  orange gesetzte H2 des ganzen Atlas; der Akzent trägt hier die Überschrift statt einen
  Button. Zahlen ca. 62 px Regular Weiß. Labels ca. 16 px **Bold** Weiß.
- Farbe/Fläche: Near-Black als Panelfläche, Text weiß, ein Akzent in der H2. Der Kontrast
  zu Sektion 82 auf `/karriere/` ist bemerkenswert: gleiche dunkle Panelform, dort ohne
  jedes Orange, hier mit oranger Überschrift.
- Abstände/Rhythmus: Ca. 60 px Innenabstand oben bis zur Eyebrow, ca. 30 px Eyebrow zu H2,
  ca. 70 px H2 zur ersten Zahlenreihe, ca. 25 px Zahl zu Label, ca. 110 px Reihenabstand,
  ca. 65 px bis zur Panelunterkante. Spaltenabstand ca. 362 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-PROOF-STRIP` (Lücke: fünf Werte im 3+2-Raster auf dunklem Panel statt Band)

### 110 — Kontaktformular, zweispaltig mit Consent-Sperre [pv-grossanlagen__-desktop-12-y8250.png | pv-grossanlagen__-desktop-14-y9750.png | -]
- Anordnung: **Zentrierter Sektionskopf** (H2 plus eine Zeile) auf der Seitenachse,
  darunter das Formular als zweispaltiges Raster von ca. 140 px bis ca. 1300 px:
  zwei Felder je Zeile (je ca. 568 px breit, Lücke ca. 25 px), in der letzten Zeile links
  ein einzeiliges Feld und rechts ein hohes Textfeld über ca. 250 px, das die Zeilen der
  linken Spalte überspannt. Ganz unten ein gesperrter Absende-Bereich über die volle
  Formularbreite.
- Buttons/Komponenten: Drei Bauteile. (a) **Eingabefelder**: hellgrau gefüllte Rechtecke,
  Höhe ca. 48 px, **kein Radius, keine Kontur**, Platzhaltertext links ca. 16 px in
  mittlerem Grau, Pflichtfelder mit „*" im Platzhalter markiert — dasselbe randlose
  Feldbauteil wie das Suchfeld auf `/karriere/`. (b) **Textarea**: gleiche Optik, ca.
  250 px hoch, mit einem kleinen Resize-Griff in der rechten unteren Ecke. (c)
  **Consent-Sperre**: ein dunkelgrauer Wash-Block über die volle Formularbreite, ca. 165 px
  hoch, darin links eine reCAPTCHA-Attrappe hinter dem Wash, mittig ein Hinweistext und
  ein grüner Textlink, rechts **zwei grüne Buttons** (ca. 370 x 45 px und ca. 370 x 58 px,
  Radius ca. 3 px, weißes Bold-Label). **Es gibt keinen Absende-Button** — an seiner Stelle
  steht die Sperre; das Formular ist im gelesenen Zustand nicht abschickbar. Das Grün ist
  Fremd-UI des Consent-Tools, wie in Sektion 65.
- Typo: Drei Stufen. H2 ca. 38 px Regular Near-Black, zentriert, einzeilig. Unterzeile
  ca. 16 px Regular grau, zentriert. Platzhalter ca. 16 px Regular. Hinweistext im Overlay
  ca. 13 px, teils **nicht lesbar** unter dem Wash.
- Farbe/Fläche: Weiß, hellgraue Felder, dunkelgrauer Consent-Wash, grüne Fremd-Buttons.
  **Kein Orange im ganzen Formular** — wie schon im Rechner-Panel (Sektion 64) pausiert
  der Akzent ausgerechnet auf der Conversion-Fläche.
- Abstände/Rhythmus: Ca. 45 px H2 zur Unterzeile, ca. 65 px Unterzeile zum ersten Feld,
  ca. 25 px Zeilenabstand zwischen den Feldzeilen, ca. 30 px vom letzten Feld zur Sperre.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Zweispaltiges Kontaktformular mit randlosen Feldern und
  Consent-gesperrtem Absendebereich

### 111 — FAQ-Akkordeon mit offener Karte und seitlichem CTA [pv-grossanlagen__-desktop-14-y9750.png | -]
- Anordnung: Zweispalter mit sehr ungleicher Gewichtung. Links ab ca. 140 px der
  Sektionskopf (Eyebrow, H2) und darunter die Akkordeonliste bis ca. 773 px — also nur
  gut die halbe Seitenbreite. Rechts ab ca. 875 px ein kleiner Hilfeblock, der **weit
  unten** auf Höhe der vierten Akkordeonzeile beginnt und nicht am oberen Rand der Liste
  ausgerichtet ist.
- Buttons/Komponenten: Drei Bauteile. (a) **Offene Akkordeonzeile**: als **weiße Karte mit
  Schatten** vom Rest abgehoben, Radius ca. 4 px; Frage ca. 17 px **Bold in Orange**, das
  Icon rechts ist ein **Minus in einem orangen Kreis-Outline** ca. 30 px, darunter die
  Antwort ca. 16 px Regular grau. Der geöffnete Zustand wechselt damit gleichzeitig
  Fläche (Karte), Schrift**farbe** und Icon — der auffälligste Zustandswechsel des Atlas.
  (b) **Geschlossene Zeilen**: kein Grund, kein Schatten, Frage ca. 17 px Bold Near-Black,
  Plus in dünnem Kreis-Outline Near-Black ca. 30 px, darunter eine graue Trennlinie.
  (c) **CTA rechts**: Button „Anfrage", oranges gefülltes Rechteck ca. 100 x 58 px, Radius
  ca. 3 px, weißes Label — mit ca. 100 px Breite der **schmalste Button des Atlas**.
- Typo: Vier Stufen. Eyebrow orange ca. 17 px. H2 ca. 42 px Regular Near-Black. Fragen
  ca. 17 px Bold, ein- bis zweizeilig. Antwort und Hilfetext ca. 16 px Regular grau. Der
  Hilfeblock rechts hat eine eigene fette Kurzzeile ca. 17 px als Mini-Überschrift.
- Farbe/Fläche: Weiß. Akzent an vier Stellen: Eyebrow, offene Frage, Minus-Kreis,
  CTA-Fläche.
- Abstände/Rhythmus: Ca. 40 px Eyebrow zu H2, ca. 130 px H2 zur ersten Zeile. Offene Karte
  ca. 165 px hoch, geschlossene Zeilen ca. 90 px bei ein- und ca. 105 px bei zweizeiliger
  Frage. Im Hilfeblock ca. 30 px Kurzzeile zum Text, ca. 55 px Text zum Button.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-FAQ` — alternativ Kandidat: FAQ mit karten-hervorgehobener offener Zeile in
  Orange (vgl. Sektion 14 und 89, dort ohne Farbwechsel und ohne Karte)

### 112 — Abschlussband und Footer [pv-grossanlagen__-desktop-16-y11250.png | pv-grossanlagen__-desktop-17-y11883.png | -]
- Identisch zu Sektion 16 und 17 der Startseite (Near-Black-Band mit harter Oberkante,
  zweizeilige linksbündige H2, unterstrichener Bold-Link „Broschüre herunterladen", drei
  Auszeichnungs-Logos in Gold; darunter der Fünf-Spalten-Footer). Die B2B-Route trägt
  damit dasselbe Consumer-Abschlussband wie alle anderen, obwohl ihr Hero bewusst auf
  Consumer-Proof verzichtet (Sektion 103). Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /stromspeicher/

### 113 — Header / Navigationsleiste [stromspeicher__-desktop-00-fold.png | -]
- Anordnung: Identisch zu Sektion 01 der Startseite — Logo links, sechs Nav-Punkte,
  Lücke, „Kundenportal", ganz rechts der orange CTA. Anders als auf der Startseite liegt
  die Leiste hier **nicht transparent über dem Foto**, sondern auf einer weißen Fläche:
  in `stromspeicher__-desktop-00-fold.png` beginnt das Hero-Foto erst bei y≈95, oberhalb
  ist die Leiste weiß. Der Nav-Punkt „Produkte" ist im Ruhezustand **unterstrichen** —
  Aktiv-Markierung der Route, die es auf der Startseite nicht gibt.
- Buttons/Komponenten: Ein CTA „Ersparnis berechnen", Rechteck mit kleinem Radius,
  gemessen `#f09122` (`stromspeicher__-desktop-00-fold.png` bei 1316/47), Label weiß.
  Chevrons an „Produkte" und „Ratgeber" wie im Bestand.
- Typo: Nav-Labels ca. 15–16 px Grotesk Medium, hier durchgehend dunkel statt weiß, weil
  die Leiste weiß hinterlegt ist. Der Unterstrich unter „Produkte" ist ein dünner
  1–2-px-Strich in Textfarbe, kein Akzent-Orange (geschätzt).
- Farbe/Fläche: Weiß, keine Trennlinie, kein Schatten. Der einzige Akzent ist der CTA.
- Abstände/Rhythmus: Leistenhöhe ca. 95 px, CTA vertikal zentriert bei y≈47 — identisch
  zur Startseite.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 01. Kandidat: Weißer Header mit unterstrichenem Aktiv-Nav-Punkt

### 114 — Sekundäre Sprungnavigation, sticky und zentriert [stromspeicher__-desktop-06-y3750.png | stromspeicher__-desktop-25-y17692.png | -]
- Anordnung: Eine zweite, schmalere Leiste **unterhalb** der Hauptnavigation mit genau
  drei zentrierten Textlinks: „Performance  Sicherheit  Langlebigkeit". Sie erscheint
  ab `stromspeicher__-desktop-06-y3750.png` in jedem folgenden Slice ganz oben und bleibt
  dort — also sticky. In `stromspeicher__-desktop-25-y17692.png` sind beide Leisten
  gleichzeitig sichtbar (Hauptnav bei y≈47, Sprungnav bei y≈128), das belegt die
  Stapelung: die Produktnavigation schiebt sich unter den globalen Header, ersetzt ihn
  nicht.
- Buttons/Komponenten: Keine Buttons, keine Kästen, keine Pills — drei reine Textlinks
  ohne Trennzeichen. Keine sichtbare Aktiv-Markierung in den gelesenen Slices (weder
  Unterstrich noch Farbwechsel), obwohl die Seite in drei gleichnamige Kapitel zerfällt.
- Typo: ca. 17 px Grotesk Regular, mittleres Grau (gemessen `#4a4a4a` in
  `stromspeicher__-desktop-08-y5250.png` bei 521/120), gemischte Schreibweise, kein Caps.
  Deutlich leichter gesetzt als die Hauptnav-Labels.
- Farbe/Fläche: Weiß (gemessen `#ffffff` in `stromspeicher__-desktop-02-y750.png` bei
  720/60), volle Breite, keine Trennlinie nach unten. Die Leiste bleibt auch über
  dunklen Sektionen weiß und deckt den Inhalt sichtbar ab.
- Abstände/Rhythmus: Leistenhöhe ca. 68 px, Abstand zwischen den drei Links ca. 30 px.
  Sehr kompakt gegenüber den 95 px der Hauptleiste.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Sticky Kapitel-Sprungnavigation unter dem globalen Header

### 115 — Produkt-Hero, Innenraumfoto mit Auszeichnungs-Kacheln [stromspeicher__-desktop-00-fold.png | -]
- Anordnung: Vollbreites Foto (heller Betoninnenraum mit Lichteinfall, das Produkt real
  im Raum stehend rechts der Mitte), Textspalte linksbündig ab ca. 140 px. Neu gegenüber
  allen bisherigen Heroes: **zwei Auszeichnungs-Kacheln liegen rechts unten direkt auf
  dem Foto** (reddot winner 2025 als weiße Kachel, iF GOLD AWARD 2025 als goldene
  Kachel), nicht als Textblock wie der Bewertungs-Proof der Startseite. Unten schiebt
  sich wieder die weiße Fläche mit gerundeten Oberecken ins Bild (ab y≈795) und zeigt
  die Bento-Kacheln der Folgesektion angeschnitten.
- Buttons/Komponenten: Genau ein CTA „Kostenlose Beratung anfragen", Rechteck mit
  kleinem Radius, gemessen `#cb720b` (`stromspeicher__-desktop-00-fold.png` bei 250/606)
  — derselbe Orange-Grundton wie der Header-CTA, hier vom Foto-Wash abgedunkelt. Label
  dunkel/schwarz statt weiß, wie beim Hero-CTA der Startseite. Höhe ca. 62 px. Die zwei
  Award-Kacheln sind rechteckig ohne Radius, ohne Schatten, direkt aufs Foto gesetzt.
- Typo: Dreistufig. Eyebrow „Speicherrevolution für maximale Energie" orange, ca. 19 px
  Regular, keine Caps, keine Pille. H1 zweizeilig, sehr groß (ca. 76 px), Grotesk
  Regular, weiß, Zeilensprung ca. 88 px — die größte H1 der bisher dokumentierten
  Routen. Darunter zwei Lead-Zeilen ca. 22 px Regular weiß. Der Produktname
  „Ampere.StoragePro" steht als zweite H1-Zeile, nicht als eigene Stufe.
- Farbe/Fläche: Das Foto ist **deutlich heller als die bisherigen Heroes** — gemessen
  `#605a55` (`stromspeicher__-desktop-00-fold.png` bei 720/300) gegenüber `#282829` auf
  der Startseite. Kein flächiger dunkler Wash, der Kontrast der weißen Schrift kommt aus
  der Bildkomposition (dunkle Betonwand hinter dem Text). Akzent nur in Eyebrow und CTA.
- Abstände/Rhythmus: Ca. 125 px von der Leiste bis zur Eyebrow, ca. 30 px Eyebrow zu H1,
  ca. 70 px H1-Unterkante zu Lead, ca. 80 px Lead zu CTA. Links 140 px Rand wie im
  Bestand.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Variante: helles Realfoto statt dunkler Wash, Award-Kacheln
  statt Sterne-Proof)

### 116 — Bento-Raster, sechs Kacheln mit Vollfarb- und Fotoflächen [stromspeicher__-desktop-02-y750.png | -]
- Anordnung: Zwei Reihen ungleicher Kacheln auf weißer, oben gerundeter Fläche. Reihe 1:
  schmale Orange-Kachel links (ca. 275 px), breite Fotokachel Mitte (ca. 570 px), helle
  Kachel rechts, am Rand angeschnitten. Reihe 2: schwarze Fotokachel links, helle Kachel
  Mitte, rechts ein **gestapeltes Paar** — helle Kachel oben, schwarze Kachel unten. Die
  rechte Spalte bricht damit das Reihenraster; die Kachel-Höhen sind nicht einheitlich.
- Buttons/Komponenten: Keine Buttons in der Sektion. Kacheln haben Radius ca. 6 px
  (geschätzt), keine Kontur, keinen Schatten — die Trennung läuft ausschließlich über
  Flächenfarbe, anders als beim Weiß-auf-Weiß-Schattenraster der Startseite (Sektion 03).
- Typo: Kachel-Titel ca. 40–46 px Grotesk Regular, Unterzeile ca. 17 px Regular. Die
  Titelgröße richtet sich wie im Bestand nach der Kachelbreite. In der Orange-Kachel
  sind Titel und Unterzeile **zentriert**, in allen anderen linksbündig — Zentrierung
  wird hier nur als Ausnahme für die Farbkachel eingesetzt. „PowerShield⁺" trägt ein
  hochgestelltes Plus in Orange als einziges typografisches Sonderzeichen.
- Farbe/Fläche: Vier Flächenwerte, alle gemessen — Orange `#ef870e`
  (`stromspeicher__-desktop-02-y750.png` bei 277/300), Warmgrau `#e9e9e6` (ebd. bei
  568/780), Near-Black `#130800` (ebd. bei 278/780) und Weiß als Grund. Der gemessene
  Orange-Wert `#ef870e` liegt sichtbar neben dem Header-Orange `#f09122` — die
  Flächen-Orange der Kacheln ist geringfügig satter als das CTA-Orange.
- Abstände/Rhythmus: Kachel-Lücke ca. 22 px horizontal wie vertikal, Innenabstand
  ca. 45 px, Außenrand ca. 140 px. Nach der zweiten Reihe ca. 150 px Luft bis zum
  nächsten Sektionskopf.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-OFFER-PAIR` (Lücke: sechs Kacheln in vier Flächenfarben statt zwei
  gleicher Karten) — alternativ Kandidat: Bento-Raster mit Vollfarb-Kachel als Akzent

### 117 — Zentrierter Beratungs-Aufruf mit Ja/Nein-Rechner [stromspeicher__-desktop-02-y750.png | stromspeicher__-desktop-04-y2250.png | -]
- Anordnung: Zentrierter Sektionskopf (zweizeilige H2 plus zweizeiliger Lead) über einem
  warmgrauen Panel, das über die halbe Breite läuft (ca. 175–1265 px). Im Panel: oben
  eine dreiteilige Schrittleiste, darunter zentriert ein Linien-Icon, Frage, Hilfszeile
  und zwei gleich breite Auswahl-Kacheln nebeneinander.
- Buttons/Komponenten: Die Schrittleiste besteht aus drei kleinen Quadraten mit Radius
  ca. 6 px — Schritt 1 aktiv gefüllt Near-Black (gemessen `#21262b` in
  `stromspeicher__-desktop-04-y2250.png` bei 600/45) mit weißer Ziffer und dem Label
  „Eigentümer" daneben, Schritte 2 und 3 als helle Kästchen mit grauer Ziffer und ohne
  Label. Die zwei Auswahl-Kacheln „Ja" / „Nein" sind große Rechtecke (ca. 375 × 175 px)
  mit Radius ca. 8 px, gefüllt Near-Black (gemessen `#21262b` bei 527/412 und 912/412) —
  beide gleich stark, keine Vorauswahl, keine Farbunterscheidung zwischen Ja und Nein.
  Jede trägt ein Linien-Icon im Kreis (Haken bzw. Kreuz) über dem Label.
- Typo: H2 zentriert ca. 40 px Regular, Lead ca. 17 px Regular Grau. Im Panel: Frage
  ca. 26 px Medium, Hilfszeile ca. 15 px Regular Grau, Kachel-Labels ca. 17 px Regular
  weiß. Schrittziffern ca. 13 px.
- Farbe/Fläche: Panel warmgrau, gemessen `#eeeeee` (`stromspeicher__-desktop-04-y2250.png`
  bei 720/300) — heller als das Kachel-Warmgrau `#e9e9e6` der Sektion 116, also zwei
  unterscheidbare Grautöne auf derselben Seite. Kein Orange im gesamten Rechner-Panel.
- Abstände/Rhythmus: Panel-Innenabstand oben ca. 45 px bis zur Schrittleiste, ca. 100 px
  bis zum Icon, ca. 60 px Frage zu Kacheln, ca. 105 px unter den Kacheln. Kachel-Lücke
  ca. 10 px — auffällig eng gegenüber den 22 px des Bento-Rasters.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-CALC-TEASER` (vgl. Sektion 64, dort dieselbe Ja/Nein-Mechanik auf der
  Rechner-Route)

### 118 — Vollbreites Produktvideo mit orangem Play-Ring [stromspeicher__-desktop-04-y2250.png | stromspeicher__-desktop-06-y3750.png | -]
- Anordnung: Sektion über die volle Fensterbreite und deutlich mehr als eine Fold-Höhe,
  fast vollständig schwarz. Ein einzelner Play-Button exakt zentriert. Kein Text, keine
  Überschrift, keine Bildunterschrift — die Sektion ist reine Fläche.
- Buttons/Komponenten: Play-Button als **Ring, nicht als gefüllte Scheibe** —
  orange Kontur ca. 3 px, Innenfläche schwarz, Dreieck in Orange, Durchmesser ca. 88 px
  (`stromspeicher__-desktop-04-y2250.png` bei 720/1147, gemessen `#ef870e`). Das ist die
  einzige Ring-Komponente der bisher dokumentierten Routen; alle anderen runden Elemente
  (Slider-Pfeile, Plus-Kreise) sind gefüllt.
- Typo: Keine Typografie in der Sektion.
- Farbe/Fläche: Schwarz, gemessen `#000000` (`stromspeicher__-desktop-06-y3750.png` bei
  400/300). Anders als das Near-Black `#21262b` der Bänder ist das hier echtes Schwarz —
  das Standbild des Videos, nicht eine gesetzte Fläche.
- Abstände/Rhythmus: Die Fläche läuft randlos, kein seitlicher Container. Höhe ca. 1490 px
  über beide Slices, der Play-Ring sitzt bei ca. 60 % der Höhe.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Randloses Video-Standbild mit Ring-Play und ohne Textauflage

### 119 — Kapitelkopf „Performance", zentriert mit oranger Kicker-Zeile [stromspeicher__-desktop-06-y3750.png | -]
- Anordnung: Zentrierter Textblock ohne Bild in schmaler Spalte (ca. 730 px), dreistufig
  gestapelt: orange Kicker-Zeile, zweizeilige H2, dreizeiliger Fließtext. Dieselbe
  Struktur wiederholt sich für die beiden anderen Kapitel („Sicherheit" in
  `stromspeicher__-desktop-08-y5250.png`, „Langlebigkeit" in
  `stromspeicher__-desktop-14-y9750.png`) — ein sauber wiederholtes Kapitel-Muster.
- Buttons/Komponenten: Keine Buttons, keine Karten, keine Trennlinie.
- Typo: Kicker ca. 17 px Regular in Orange, exakt der Wortlaut des Sprungnav-Links. H2
  zweizeilig ca. 46 px Grotesk Regular, Near-Black, Zeilensprung ca. 60 px. Fließtext
  ca. 17 px Regular in Grau, zentriert mit Flatterrand — kein Blocksatz. Verhältnis H2
  zu Kicker rund 2,7:1 (geschätzt).
- Farbe/Fläche: Weiß, kein Container, kein Rahmen. Der Kicker ist der einzige Farbpunkt.
- Abstände/Rhythmus: Ca. 320 px Luft über dem Kicker (nach dem Videoblock), ca. 30 px
  Kicker zu H2, ca. 55 px H2 zu Fließtext, ca. 150 px bis zur ersten Feature-Kachel.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Zentrierter Kapitelkopf mit orangem Kicker gleichen Wortlauts wie
  die Sprungnavigation

### 120 — Feature-Kacheln mit orangem Plus-Kreis [stromspeicher__-desktop-08-y5250.png | stromspeicher__-desktop-12-y8250.png | stromspeicher__-desktop-16-y11250.png | -]
- Anordnung: Das tragende Layoutmuster der ganzen Route, in mehreren Varianten
  wiederholt: eine breite Kachel über die Containerbreite, darunter ein Zweier-Paar in
  ungleichen Breiten (ca. 55/45 bzw. 50/50), teilweise eine große Fotokachel allein. Die
  Kacheln sind mal Fotokachel, mal Farbfläche, mal Warmgrau mit freigestelltem Rendering.
  Titel sitzen je nach Kachel oben (`stromspeicher__-desktop-12-y8250.png`, „geprüfte /
  Sicherheitstechnik") oder unten (ebd., „einzigartige / Lichtbogenerkennung") — die
  Textposition folgt dem Bildmotiv, nicht einer festen Regel.
- Buttons/Komponenten: Jede Kachel trägt unten rechts denselben Affordanz-Baustein:
  Textlabel „Mehr erfahren" plus ein **gefüllter oranger Kreis mit weißem Plus**,
  Durchmesser ca. 40 px, gemessen `#ef870e` (`stromspeicher__-desktop-16-y11250.png` bei
  1016/900 in der orangen Kachel; der Kreis selbst in
  `stromspeicher__-desktop-08-y5250.png` bei 857/583 zeigt das weiße Plus). Das Label
  ist weiß auf dunklen und dunkel auf hellen Kacheln, der Kreis bleibt immer orange.
  Kein Rechteck-Button in der gesamten Kapitelstrecke.
- Typo: Kachel-Titel ca. 40–46 px Regular, Kicker-Zeile darüber ca. 22 px Regular
  („geprüfte", „einzigartige") — der Kicker steht kleingeschrieben und der Titel
  vervollständigt den Satz, ein durchgehaltener Kniff. Fließtext in den Kacheln ca. 17 px
  Regular. „Mehr erfahren" ca. 17 px Regular.
- Farbe/Fläche: Drei Kachelflächen, gemessen — Warmgrau `#e9e9e6`
  (`stromspeicher__-desktop-10-y6750.png` bei 1035/150), Near-Black `#21262b` (ebd. bei
  400/150) und Vollflächen-Orange `#ef870e` (`stromspeicher__-desktop-16-y11250.png` bei
  1016/900). Kein Weiß als Kachelfarbe — die Kacheln setzen sich immer gegen den weißen
  Grund ab.
- Abstände/Rhythmus: Kachel-Lücke ca. 22 px, Innenabstand ca. 48 px. Der Plus-Kreis sitzt
  ca. 45 px vom rechten und ca. 45 px vom unteren Kachelrand.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Feature-Kachel mit Label-plus-Kreis statt Button

### 121 — Feature-Slider mit weißen Pfeil-Kreisen [stromspeicher__-desktop-10-y6750.png | stromspeicher__-desktop-14-y9750.png | stromspeicher__-desktop-click-y6000-00-Previous.png | stromspeicher__-desktop-click-y6000-01-Next.png | -]
- Anordnung: Unter jedem Kapitel steht eine H2 „Alle Performance Features" bzw. „Alle
  Sicherheit Features" (`stromspeicher__-desktop-14-y9750.png`) und darunter ein
  horizontaler Slider aus zwei sichtbaren Kacheln plus einer am rechten Rand
  angeschnittenen dritten. Der Anschnitt rechts ist das Scroll-Signal, es gibt keine
  Dots.
- Buttons/Komponenten: Zwei Navigations-Kreise, **weiß gefüllt mit dunklem Pfeil**,
  Durchmesser ca. 44 px, gemessen `#ffffff` bzw. der Pfeil `#000000`
  (`stromspeicher__-desktop-10-y6750.png` bei 160/253 und 1281/253). Sie liegen
  vertikal mittig **auf** den Kacheln, nicht darüber oder darunter — der linke Pfeil
  überlappt die linke Kachel, der rechte die rechte. Die Kacheln tragen zusätzlich den
  Plus-Kreis-Baustein aus Sektion 120; Pfeil-Kreise (weiß) und Aktions-Kreise (orange)
  sind so farblich klar getrennt.
- Typo: Sektions-H2 zentriert ca. 40 px Regular. Der Titel „Alle Sicherheit Features"
  ist grammatisch unangepasst — der Kapitelname wird ohne Beugung eingesetzt.
  Kachel-Titel ca. 36–40 px, Fließtext ca. 17 px.
- Farbe/Fläche: Kachelflächen wie in Sektion 120 (Near-Black, Warmgrau, Fotokachel). Der
  Slider-Container hat keine eigene Fläche, er läuft auf Weiß.
- Abstände/Rhythmus: Kachelhöhe ca. 425 px, Lücke ca. 25 px, H2 zu Slider ca. 175 px.
  Die Pfeile sitzen ca. 20 px innerhalb der Kachelkanten.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-SLIDER-EDGE` (vgl. Sektion 05 und 57) — hier mit Pfeil-Kreisen statt Dots

### 122 — Konfigurator-Panel, Produktbild mit Leistungswahl [stromspeicher__-desktop-18-y12750.png | -]
- Anordnung: Warmgraues Panel über die Containerbreite. Oben links das EKD-Logo als
  kleine Marke im Panel, mittig groß das freigestellte Produkt, darunter zentriert
  Produktname und die Aufforderung „Wechselrichter wählen", dann zwei Auswahl-Kacheln
  nebeneinander und darunter ein **panelbreiter** Weiter-Button.
- Buttons/Komponenten: Zwei Auswahl-Kacheln „12 kW" / „22 kW", weiß gefüllt (gemessen
  `#ffffff` in `stromspeicher__-desktop-18-y12750.png` bei 546/713 und 896/713), Radius
  ca. 8 px. Die linke trägt eine **orange Kontur** als Auswahl-Markierung, die rechte
  eine hellgraue — die Selektion läuft ausschließlich über die Randfarbe, nicht über
  Füllung oder Schatten. Der Weiter-Button ist ein Rechteck über die volle Panelbreite
  (ca. 680 px), Radius ca. 6 px, gefüllt `#ef870e` (ebd. bei 720/795), Label dunkel.
  Damit ist er der breiteste Button der bisher dokumentierten Routen.
- Typo: Produktname ca. 15 px Regular Grau als Überzeile, „Wechselrichter wählen"
  ca. 22 px Regular dunkel. In den Kacheln: Wert ca. 22 px Regular, darunter „Leistung"
  ca. 15 px Grau. Button-Label ca. 18 px Medium.
- Farbe/Fläche: Panel `#eeeeee` (gemessen bei 720/400 liegt das Produktbild, das Panel
  selbst entspricht dem Rechner-Grau aus Sektion 117). Weiße Kacheln auf grauem Panel —
  die Umkehrung des sonst üblichen Weiß-auf-Weiß.
- Abstände/Rhythmus: Panel-Innenabstand ca. 190 px links und rechts bis zu den Kacheln,
  Kachel-Lücke ca. 22 px, ca. 20 px von den Kacheln zum Weiter-Button, ca. 45 px unter
  dem Button. Sehr dichter Block gegenüber der Höhe des Produktbilds darüber.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Konfigurator-Panel mit Konturauswahl und panelbreitem Weiter-Button

### 123 — Datenblatt-Split auf Near-Black [stromspeicher__-desktop-18-y12750.png | stromspeicher__-desktop-20-y14250.png | -]
- Anordnung: Dunkles Band über die volle Breite, zweispaltig: links eine hochformatige
  Vorschau des PDF-Datenblatts als reales Seitenbild (nicht als Icon), rechts die
  Textspalte mit orangem Kicker, zweizeiliger H2 und darunter Download-Zeilen je
  Leistungsvariante.
- Buttons/Komponenten: Keine gefüllten Buttons — die Downloads sind **unterstrichene
  Bold-Textlinks** („12kW Datenblatt herunterladen"), dieselbe Behandlung wie
  „Broschüre herunterladen" im Abschlussband. Die PDF-Vorschau hat keine Kontur und
  keinen Schatten, sie steht als Bild direkt auf der dunklen Fläche.
- Typo: Kicker „Technische Daten" ca. 17 px Regular Orange, H2 zweizeilig ca. 46 px
  Regular Weiß, Download-Links ca. 18 px Bold Weiß mit Unterstrich.
- Farbe/Fläche: Near-Black, gemessen `#21262b` (`stromspeicher__-desktop-20-y14250.png`
  bei 720/1000 im Bandbereich). Harte Oberkante ohne Rundung, anders als der gerundete
  Übergang im Hero.
- Abstände/Rhythmus: Bandhöhe ca. 950 px, linker Rand 190 px, Spaltenabstand ca. 125 px.
  Ca. 30 px Kicker zu H2, ca. 60 px H2 zur ersten Download-Zeile.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-DOWNLOAD-SPLIT` (vgl. Sektion 15) — hier ohne rotierendes Siegel und in
  Near-Black statt Warmgrau

### 124 — Markenpaar-Kacheln, Wortmarken als Bildinhalt [stromspeicher__-desktop-20-y14250.png | -]
- Anordnung: Zentrierte H2 „Deutsche Ingenieurskunst trifft bestes Design" über zwei
  gleich breiten und gleich hohen Kacheln — das einzige echte 50/50-Paar der Route,
  während alle anderen Kachelreihen ungleich sind.
- Buttons/Komponenten: Beide Kacheln tragen den Plus-Kreis-Baustein aus Sektion 120,
  gemessen weiß bei 424/740 und 1016/740 in `stromspeicher__-desktop-22-y15750.png` für
  die Label-Zeile. Der Inhalt der Kacheln ist jeweils eine **Wortmarke als Hauptgrafik**
  („Ampere" bzw. „Design by STUDIO F·A·PORSCHE"), gesetzt in der jeweiligen
  Fremdmarken-Typografie — das ist der einzige Ort der Route, an dem eine andere
  Schriftart als die Haus-Grotesk sichtbar ist.
- Typo: Sektions-H2 zentriert ca. 40 px Regular. Kachel-Wortmarken ca. 80 px, darunter
  zweizeilige Unterzeile ca. 22 px Regular Weiß. Auffällig: die „Ampere"-Wortmarke ist
  linksbündig gesetzt, die Porsche-Zeile ebenfalls — keine Zentrierung trotz
  symmetrischer Kacheln.
- Farbe/Fläche: Beide Kacheln Near-Black, gemessen `#21262b`
  (`stromspeicher__-desktop-24-y17250.png` bei 720/1000 zeigt denselben Wert im
  Folgeband). Radius ca. 6 px. Kein Orange außer den Plus-Kreisen.
- Abstände/Rhythmus: H2 zu Kacheln ca. 105 px, Kachel-Lücke ca. 25 px, Kachelhöhe
  ca. 360 px, Innenabstand ca. 48 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Symmetrisches Markenpaar mit Fremdwortmarke als Kachelinhalt

### 125 — EKD365+ Systemsplit mit Produkt-Slider [stromspeicher__-desktop-22-y15750.png | stromspeicher__-desktop-24-y17250.png | -]
- Anordnung: Dreiteilig. Oben ein breites Rendering (Haus mit Anlage, Phone-Mockup
  rechts überlappend aus dem Bild ragend), darunter ein Split: links das Produktlogo
  „EKD365+" freistehend, rechts Bold-Lead, Fließtext und CTA. Darunter ein randloser
  Produkt-Slider mit vier angeschnittenen Fotokacheln (Solaranlage, Wärmepumpe,
  Stromspeicher, weitere).
- Buttons/Komponenten: Ein CTA „Zum Energiesystem", Rechteck mit kleinem Radius, gefüllt
  Orange (gemessen `#ef870e` in `stromspeicher__-desktop-22-y15750.png` bei 779/981),
  Label dunkel. Die Slider-Kacheln tragen unten den Baustein „Zur Solaranlage" plus
  **orangem Kreis mit weißem Pfeil nach oben-rechts** (`stromspeicher__-desktop-24-y17250.png`
  bei 700/690, gemessen `#ef870e`) — dieselbe Kreisgröße wie der Plus-Kreis, aber mit
  Pfeil statt Plus: Navigation zu einer anderen Route, nicht Aufklappen. Zusätzlich zwei
  weiße Pfeil-Kreise links und rechts wie in Sektion 121.
- Typo: Lead ca. 22 px **Bold** dunkel — die einzige durchgehend fett gesetzte
  Absatzstufe der Route. Fließtext ca. 17 px Regular Grau. Slider-Kachel-Titel ca. 40 px
  Regular Weiß, oben links im Foto. Das Produktlogo „EKD365+" ist eine gesetzte
  Wortmarke mit orangem hochgestelltem Plus.
- Farbe/Fläche: Weiß als Grund, Fotokacheln als einzige Flächen. Der Split hat keinen
  Container und keine Hintergrundfläche.
- Abstände/Rhythmus: Rendering ca. 430 px hoch, ca. 105 px bis zum Split, Spaltenabstand
  ca. 115 px, ca. 55 px Fließtext zu CTA, ca. 130 px bis zum Slider. Slider-Kacheln
  ca. 445 px breit, Lücke ca. 30 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-SLIDER-EDGE` plus Kandidat: Systemsplit mit freistehendem Produktlogo als
  Bildspalte

### 126 — Beratungs-Panel, gerundet und über die Bandkante geschoben [stromspeicher__-desktop-24-y17250.png | -]
- Anordnung: Warmgraues Panel mit Radius ca. 20 px, links ein Foto (Berater am Telefon)
  im festen Rechteck, rechts Kicker, H2, dreizeiliger Fließtext und CTA. Der Kniff: das
  Panel **überlappt die Oberkante des dunklen Abschlussbands** — das Band beginnt bei
  y≈590, das Panel läuft bis y≈825 und liegt mit seiner unteren Hälfte auf dunklem
  Grund. Dieselbe Überlappungslogik wie im Hero, nur in umgekehrter Richtung.
- Buttons/Komponenten: Ein CTA „Unverbindlich anfragen", Rechteck mit kleinem Radius,
  gefüllt Orange, Label dunkel. Das Foto hat keine Rundung und keinen Rahmen und sitzt
  bündig im Panel-Innenabstand.
- Typo: Kicker „Kostenlose Solar-Beratung" ca. 17 px Regular Orange, H2 einzeilig
  ca. 40 px Regular dunkel, Fließtext ca. 17 px Regular Grau, Button-Label ca. 18 px
  Medium.
- Farbe/Fläche: Panel gemessen `#fef9f3` an der oberen Kante
  (`stromspeicher__-desktop-24-y17250.png` bei 405/135 liegt noch im Slider; die
  Panelfläche entspricht dem hellen Warmgrau des Bestands, hier als Schätzung geführt).
  Der Kontrast zum Near-Black-Band darunter macht die Überlappung sichtbar.
- Abstände/Rhythmus: Panel-Innenabstand ca. 80 px, Spaltenabstand ca. 65 px, ca. 25 px
  Kicker zu H2, ca. 50 px H2 zu Fließtext, ca. 45 px Fließtext zu CTA.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-CONSULT-PANEL` (vgl. Sektion 60) — hier zusätzlich über die Bandkante
  geschoben

### 127 — Abschlussband und Footer [stromspeicher__-desktop-24-y17250.png | stromspeicher__-desktop-25-y17692.png | -]
- Identisch zu Sektion 16 und 17 der Startseite: Near-Black-Band (gemessen `#1f2629` in
  `stromspeicher__-desktop-25-y17692.png` bei 720/900) mit zweizeiliger linksbündiger
  H2 „Bessere Energie für Ihr Zuhause. Das ganze Jahr.", unterstrichenem Bold-Link
  „Broschüre herunterladen" und drei Auszeichnungs-Logos in Gold; darunter der
  Fünf-Spalten-Footer mit Logo, vier Linkspalten, drei Social-Icons und der
  Rechtszeile. Einziger Unterschied zur Startseite: die Bandoberkante wird hier vom
  Beratungs-Panel aus Sektion 126 überlappt statt hart anzusetzen. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe

## Seite: /wallbox/

### 128 — Header / Navigationsleiste [wallbox__-desktop-00-fold.png | -]
- Anordnung: Identisch zu Sektion 113 der Stromspeicher-Route — weiße Leiste über dem
  Hero-Foto, Logo links, sechs Nav-Punkte, Lücke, „Kundenportal", rechts der orange CTA.
  „Produkte" trägt auch hier den Aktiv-Unterstrich. Das Foto beginnt bei y≈95, die
  Leiste bleibt weiß (gemessen `#ffffff` in `wallbox__-desktop-00-fold.png` bei 720/60).
  Damit ist der transparente Foto-Header der Startseite eindeutig ein Startseiten-
  Sonderfall und kein globales Header-Verhalten.
- Buttons/Komponenten: Ein CTA „Ersparnis berechnen", gemessen `#f09122`
  (`wallbox__-desktop-00-fold.png` bei 1316/47) — exakt der Header-Orange-Wert aller
  bisher gemessenen Routen, unverändert.
- Typo: Nav-Labels ca. 15–16 px Grotesk Medium dunkel, Chevrons an „Produkte" und
  „Ratgeber".
- Farbe/Fläche: Weiß, keine Trennlinie, kein Schatten.
- Abstände/Rhythmus: Leistenhöhe ca. 95 px, CTA zentriert bei y≈47.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 01 und 113.

### 129 — Sekundäre Sprungnavigation, sticky [wallbox__-desktop-04-y2250.png | wallbox__-desktop-20-y13821.png | -]
- Anordnung: Dieselbe dreigliedrige Kapitelleiste wie auf der Stromspeicher-Route,
  wortgleich „Performance  Sicherheit  Langlebigkeit". Sie erscheint erst nach dem
  Video-Standbild (`wallbox__-desktop-04-y2250.png`, dort bei y≈1108) und liegt ab dann
  in jedem Slice oben. In `wallbox__-desktop-20-y13821.png` sind wieder beide Leisten
  gestapelt sichtbar (Hauptnav y≈47, Sprungnav y≈128).
- Buttons/Komponenten: Drei Textlinks, keine Kästen, keine Aktiv-Markierung in den
  gelesenen Slices. Bemerkenswert: die Wallbox-Route übernimmt die Kapitelnamen der
  Speicher-Route unverändert, obwohl die Kapitelinhalte andere sind — ein
  Produkt-Template mit festen Kapitelnamen.
- Typo: ca. 17 px Grotesk Regular, mittleres Grau.
- Farbe/Fläche: Weiß über die volle Breite, keine Trennlinie.
- Abstände/Rhythmus: Leistenhöhe ca. 68 px, Linkabstand ca. 30 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 114.

### 130 — Produkt-Hero, zweigeteiltes Foto mit Hersteller-Zeile [wallbox__-desktop-00-fold.png | wallbox__-desktop-02-y750.png | -]
- Anordnung: Der Hero nutzt **zwei nebeneinandergesetzte Fotos** statt eines: links das
  Auto in der Carport-Szene (dunkel, gemessen `#15161d` bei 400/200), rechts die Wallbox
  an der hellen Betonwand (gemessen `#6b6f64` bei 1100/200). Die Naht läuft senkrecht
  bei x≈860 und ist sichtbar hart, kein Verlauf. Textspalte linksbündig ab 140 px im
  dunklen linken Bild. Unten wieder die weiße Fläche mit gerundeten Oberecken, die ab
  y≈800 ins Bild schiebt.
- Buttons/Komponenten: **Kein CTA im Fold** — anders als jeder andere dokumentierte
  Hero. Statt eines Buttons steht unter dem Lead eine zweiteilige Hersteller-Zeile:
  „Engineered by Ampere" und „Design by STUDIO F·A·PORSCHE", beide als kleine
  Label-Zeile plus große Wortmarke, nebeneinander, ohne Kasten, ohne Trennstrich. Das
  ist der einzige Fold der Sammlung, der auf Conversion verzichtet und stattdessen
  Herkunft zeigt.
- Typo: Eyebrow „Die schönste Art aufzutanken" orange ca. 19 px Regular. H1 zweizeilig
  ca. 76 px Grotesk Regular weiß, Zeilensprung ca. 88 px — identisch zur
  Stromspeicher-H1. Lead einzeilig ca. 22 px Regular. Hersteller-Labels ca. 13 px Bold,
  Wortmarken ca. 30 px in Fremdmarken-Typografie.
- Farbe/Fläche: Kein flächiger Wash, der Kontrast kommt aus der dunklen linken
  Bildhälfte. Akzent nur in der Eyebrow — der Fold hat keine orange Fläche.
- Abstände/Rhythmus: Ca. 215 px von der Leiste bis zur Eyebrow, ca. 25 px Eyebrow zu H1,
  ca. 55 px H1 zu Lead, ca. 90 px Lead zur Hersteller-Zeile. Abstand zwischen den zwei
  Hersteller-Blöcken ca. 75 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Variante: Doppelfoto mit harter Naht, kein CTA, Hersteller-
  Zeile statt Proof) — alternativ Kandidat: Fold ohne CTA mit Herkunfts-Wortmarken

### 131 — Bento-Raster, sechs Kacheln mit Orange-Textkachel [wallbox__-desktop-02-y750.png | wallbox__-desktop-04-y2250.png | -]
- Anordnung: Zwei Reihen ungleicher Kacheln auf weißer, oben gerundeter Fläche. Reihe 1:
  zwei etwa gleich breite Fotokacheln (ca. 670 und 470 px), Reihe 2: schmale Fotokachel
  links (ca. 275 px), breite **reine Textkachel in Orange** Mitte (ca. 570 px), rechts
  eine warmgraue Kachel mit freigestelltem Kabel-Rendering; darunter in der Mittelspalte
  noch die schwarze „PowerShield⁺"-Kachel (`wallbox__-desktop-04-y2250.png`). Die Titel
  sitzen in Fotokacheln unten links, in Farb- und Graukacheln zentriert bzw. oben.
- Buttons/Komponenten: Keine Buttons, keine Plus-Kreise in dieser Sektion — das
  unterscheidet das Bento-Raster von den späteren Feature-Kacheln der Route. Radius
  ca. 6 px, keine Kontur, kein Schatten.
- Typo: Kachel-Titel ca. 40–46 px Regular, Unterzeile ca. 17 px Regular. Die
  Orange-Kachel setzt ihren Titel **zentriert und zweizeilig** mit erzwungenem Umbruch
  mitten im Wort („Extrem witterungs / beständig") — die Zeile bricht ohne Bindestrich,
  ein sichtbarer Satzfehler im Bestand. „PowerShield⁺" wiederholt exakt die Kachel der
  Stromspeicher-Route, inklusive orangem Hochgestellt-Plus.
- Farbe/Fläche: Orange gemessen `#ef870e` (`wallbox__-desktop-02-y750.png` bei 720/1280)
  — derselbe Flächen-Orange wie in Sektion 116, also ein konsistenter zweiter Orange-Ton
  neben dem CTA-Orange `#f09122`. Warmgrau `#e9e9e6` (`wallbox__-desktop-10-y6750.png`
  bei 1114/240), Near-Black für die PowerShield-Kachel.
- Abstände/Rhythmus: Kachel-Lücke ca. 22 px, Innenabstand ca. 25 px in den Fotokacheln
  (deutlich enger als die 45 px der Stromspeicher-Kacheln), Außenrand 140 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-OFFER-PAIR` (Lücke) — alternativ Kandidat: Bento-Raster mit
  Vollfarb-Textkachel als Akzent, vgl. Sektion 116

### 132 — Vollbreites Produktvideo mit Textauflage [wallbox__-desktop-04-y2250.png | -]
- Anordnung: Randloses Standbild über die volle Fensterbreite mit derselben Doppelszene
  wie im Hero (Auto links, Wallbox rechts, Naht bei x≈750). Anders als das
  Video-Standbild der Stromspeicher-Route (Sektion 118) trägt dieses eine **zentrierte
  Textzeile** „Energie laden neu definiert" mittig im Bild — und keinen sichtbaren
  Play-Ring in diesem Slice.
- Buttons/Komponenten: Keine Buttons, kein Play-Element im gelesenen Slice. Die
  Textauflage steht ohne Kasten, ohne Schatten und ohne Abdunklung direkt auf dem Foto.
- Typo: Eine Zeile ca. 46 px Grotesk Regular weiß, zentriert. Keine Eyebrow, keine
  Unterzeile.
- Farbe/Fläche: Fotoflächen, gemessen `#8f959a` (`wallbox__-desktop-02-y750.png` bei
  474/900 im hellen Wandbereich) — deutlich heller als das echte Schwarz `#000000` der
  Stromspeicher-Videofläche. Die weiße Schrift steht dadurch stellenweise auf hellem
  Grund und verliert Kontrast; sichtbar an der Wortmitte von „laden neu".
- Abstände/Rhythmus: Bildhöhe ca. 660 px, die Textzeile sitzt bei ca. 50 % der Höhe.
  Randlos, kein Container.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Randloses Video-Standbild mit zentrierter Textauflage (vgl.
  Sektion 118, dort ohne Text und mit Ring-Play)

### 133 — Kapitelkopf, zentriert mit orangem Kicker [wallbox__-desktop-04-y2250.png | wallbox__-desktop-08-y5250.png | wallbox__-desktop-10-y6750.png | -]
- Anordnung: Dasselbe Kapitelmuster wie Sektion 119, dreimal wiederholt: orange
  Kicker-Zeile, zweizeilige zentrierte H2, drei- bis vierzeiliger Fließtext in schmaler
  Spalte (ca. 760 px). „Performance" in `wallbox__-desktop-04-y2250.png`, „Sicherheit"
  in `wallbox__-desktop-08-y5250.png`, „Langlebigkeit" in `wallbox__-desktop-10-y6750.png`.
- Buttons/Komponenten: Keine Buttons, keine Trennlinie, kein Container.
- Typo: Kicker ca. 17 px Regular Orange, wortgleich mit dem Sprungnav-Link. H2
  zweizeilig ca. 46 px Regular Near-Black, Zeilensprung ca. 60 px. Fließtext ca. 17 px
  Regular Grau, zentriert mit Flatterrand.
- Farbe/Fläche: Weiß. Der Kicker ist der einzige Farbpunkt.
- Abstände/Rhythmus: Ca. 180 px Luft über dem Kicker, ca. 30 px Kicker zu H2, ca. 55 px
  H2 zu Fließtext, ca. 145 px bis zur ersten Kachel.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 119.

### 134 — Feature-Kacheln mit orangem Plus-Kreis [wallbox__-desktop-06-y3750.png | wallbox__-desktop-08-y5250.png | wallbox__-desktop-10-y6750.png | wallbox__-desktop-12-y8250.png | -]
- Anordnung: Das tragende Muster der Route, in wechselnden Aufteilungen: Zweier-Paar
  ungleicher Breite (ca. 55/45 in `wallbox__-desktop-06-y3750.png`), Vollbreiten-
  Fotokachel allein (`wallbox__-desktop-08-y5250.png`, „extrem / witterungsbeständig"),
  Zweier-Paar gleicher Breite (`wallbox__-desktop-10-y6750.png`,
  „Ladestromüberwachung" neben „Effizient Laden"). Die Textposition wechselt nach
  Bildmotiv: oben links in der Rennwagen-Kachel, unten links in der Regen-Kachel.
- Buttons/Komponenten: Jede Kachel trägt „Mehr erfahren" plus **gefüllten orangen Kreis
  mit weißem Plus**, Durchmesser ca. 40 px, gemessen `#ef870e`
  (`wallbox__-desktop-10-y6750.png` bei 1252/777) mit weißem Plus (ebd. bei 660/777).
  Kein Rechteck-Button in der ganzen Kapitelstrecke — identisch zur Stromspeicher-Route.
- Typo: Kachel-Titel ca. 40–46 px Regular, teils mit vorangestelltem Kleinbuchstaben-
  Kicker („extrem", „Beste Qualität"), Unterzeile ca. 17 px Regular. In
  `wallbox__-desktop-10-y6750.png` bricht „Ladestrom / überwachung" wie in Sektion 131
  ohne Bindestrich mitten im Wort um.
- Farbe/Fläche: Drei Kachelflächen, gemessen — Warmgrau `#e9e9e6`
  (`wallbox__-desktop-10-y6750.png` bei 424/650), Vollflächen-Orange `#ef870e` (ebd. bei
  1016/650) und Near-Black `#21262b` (`wallbox__-desktop-14-y9750.png` bei 424/1350).
  Kein Weiß als Kachelfarbe.
- Abstände/Rhythmus: Kachel-Lücke ca. 22 px, Innenabstand ca. 48 px, Plus-Kreis ca. 45 px
  vom rechten und unteren Kachelrand.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 120. Kandidat: Feature-Kachel mit Label-plus-Kreis statt Button

### 135 — Feature-Slider mit weißen Pfeil-Kreisen [wallbox__-desktop-12-y8250.png | wallbox__-desktop-click-y12000-00-Previous.png | wallbox__-desktop-click-y12000-01-Next.png | wallbox__-desktop-click-y12750-00-Next.png | -]
- Anordnung: Wie Sektion 121 — zwei sichtbare Kacheln nebeneinander, die dritte am
  rechten Rand angeschnitten, weiße Pfeil-Kreise vertikal mittig auf den Kacheln. Die
  drei Click-States (`wallbox__-desktop-click-y12000-00-Previous.png`,
  `wallbox__-desktop-click-y12000-01-Next.png`,
  `wallbox__-desktop-click-y12750-00-Next.png`) belegen, dass Previous und Next die
  einzigen benannten Slider-Steuerelemente sind; Dots gibt es nicht.
- Buttons/Komponenten: Pfeil-Kreise weiß gefüllt mit dunklem Pfeil, Durchmesser ca. 44 px
  (gemessen `#000000` als Pfeilfarbe in `wallbox__-desktop-18-y12750.png` bei 99/533 und
  1341/533 am Produkt-Slider). Auf den Kacheln zusätzlich der orange Plus-Kreis aus
  Sektion 134 — weiße Kreise navigieren, orange Kreise handeln.
- Typo: Kachel-Titel ca. 36–40 px Regular, Kicker-Zeile ca. 22 px.
- Farbe/Fläche: Kachelflächen wie Sektion 134, Slider läuft auf Weiß ohne eigenen
  Container.
- Abstände/Rhythmus: Kachelhöhe ca. 465 px, Lücke ca. 22 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-SLIDER-EDGE` — siehe Sektion 121.

### 136 — Konfigurator-Panel, leer geladen [wallbox__-desktop-12-y8250.png | -]
- Anordnung: Zentrierte H2 „Jetzt die Wallbox Ampere.ChargePro anschauen" über einem
  warmgrauen Panel, das im gelesenen Slice **bis auf das EKD-Logo oben links leer ist**.
  Das Panel ist deutlich schmaler als das Stromspeicher-Pendant (ca. 320–1120 px statt
  190–1250 px) und hochformatig.
- Buttons/Komponenten: Im gelesenen Zustand keine sichtbaren Bedienelemente — weder
  Produktbild noch Auswahl-Kacheln noch Weiter-Button, anders als das befüllte
  Konfigurator-Panel der Stromspeicher-Route (Sektion 122). Das ist ein
  **Ladezustand ohne Skeleton und ohne Platzhalter**: die Fläche steht leer, es gibt
  keinen Spinner, keine grauen Balken, keinen Hinweistext. Ob das ein 3D-Viewer ist, der
  im Screenshot-Moment noch nicht gerendert war, ist aus den Shots nicht belegbar und
  bleibt nicht geprüft.
- Typo: H2 zentriert ca. 40 px Grotesk Regular Near-Black. Im Panel keine Typografie
  außer der Wortmarke.
- Farbe/Fläche: Panel gemessen `#eeeeee` (`wallbox__-desktop-18-y12750.png` bei 720/1100
  zeigt denselben Panelton im Beratungs-Panel) — dasselbe helle Grau wie die
  Rechner- und Konfigurator-Panels des Bestands, unterscheidbar vom Kachel-Warmgrau
  `#e9e9e6`.
- Abstände/Rhythmus: H2 zum Panel ca. 55 px, Panel-Innenabstand oben ca. 25 px bis zur
  Wortmarke. Panelhöhe im Slice über 780 px ohne Inhalt.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Kandidat: Konfigurator-Panel ohne Ladeplatzhalter (Lücke gegenüber
  Sektion 122)

### 137 — Datenblatt-Split auf Near-Black [wallbox__-desktop-14-y9750.png | -]
- Anordnung: Dunkles Band über die volle Breite, zweispaltig: links die hochformatige
  PDF-Vorschau als reales Seitenbild, rechts Kicker, zweizeilige H2 und ein
  Download-Link. Anders als auf der Stromspeicher-Route gibt es hier **nur eine
  Download-Zeile** („Datenblatt herunterladen") statt einer Zeile je Leistungsvariante —
  das Produkt hat keine Varianten.
- Buttons/Komponenten: Keine gefüllten Buttons; der Download ist ein unterstrichener
  Bold-Textlink (`wallbox__-desktop-14-y9750.png`, gemessen weiß bei 838/655). Die
  PDF-Vorschau steht ohne Kontur und ohne Schatten auf der dunklen Fläche.
- Typo: Kicker „Technische Daten" ca. 17 px Regular Orange, H2 zweizeilig ca. 46 px
  Regular Weiß, Download-Link ca. 18 px Bold Weiß mit Unterstrich.
- Farbe/Fläche: Near-Black, gemessen `#21262b` (`wallbox__-desktop-14-y9750.png` bei
  720/500). Bandoberkante hart, ohne Rundung.
- Abstände/Rhythmus: Bandhöhe ca. 845 px, linker Rand 190 px, Spaltenabstand ca. 125 px,
  ca. 30 px Kicker zu H2, ca. 55 px H2 zum Download-Link. Rechts unter dem Link bleibt
  eine große leere Fläche — die Textspalte füllt die Bandhöhe nicht aus.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-DOWNLOAD-SPLIT` — siehe Sektion 123.

### 138 — Markenpaar-Kacheln [wallbox__-desktop-14-y9750.png | -]
- Anordnung: Zentrierte H2 „Deutsche Ingenieurskunst trifft bestes Design" über zwei
  gleich breiten, gleich hohen Near-Black-Kacheln — wortgleich und layoutgleich zu
  Sektion 124 der Stromspeicher-Route. Links die „Ampere"-Wortmarke, rechts „Design by
  STUDIO F·A·PORSCHE".
- Buttons/Komponenten: Beide Kacheln tragen den orangen Plus-Kreis mit „Mehr erfahren"
  unten rechts. Der Kachelinhalt ist die Fremdwortmarke als Hauptgrafik.
- Typo: H2 zentriert ca. 40 px Regular. Wortmarken ca. 80 px, Unterzeile zweizeilig
  ca. 22 px Regular Weiß, linksbündig trotz symmetrischer Kacheln.
- Farbe/Fläche: Near-Black, gemessen `#21262b` (`wallbox__-desktop-14-y9750.png` bei
  424/1350), Radius ca. 6 px.
- Abstände/Rhythmus: H2 zu Kacheln ca. 105 px, Kachel-Lücke ca. 25 px, Innenabstand
  ca. 48 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: Siehe Sektion 124.

### 139 — EKD365+ Systemsplit mit Produkt-Slider [wallbox__-desktop-16-y11250.png | wallbox__-desktop-18-y12750.png | -]
- Anordnung: Wortgleich und layoutgleich zu Sektion 125: zentrierter Kopf mit orangem
  Kicker „EKD365+ Ganzjahresenergiesystem", zweizeilige H2, Lead; darunter das
  Haus-Rendering mit rechts überlappendem Phone-Mockup; darunter der Split aus
  freistehendem „EKD365+"-Logo links und Bold-Lead, Fließtext und CTA rechts; zuletzt
  der randlose Produkt-Slider mit vier angeschnittenen Fotokacheln.
- Buttons/Komponenten: CTA „Zum Energiesystem", Rechteck mit kleinem Radius, gefüllt
  Orange, Label dunkel (gemessen `#040200` als Labelfarbe in
  `wallbox__-desktop-18-y12750.png` bei 779/110). Die Slider-Kacheln tragen unten den
  Baustein „Zur Solaranlage" / „Zur Wärmepumpe" / „Zum Stromspeicher" plus **orangem
  Kreis mit weißem Pfeil nach oben-rechts** (`wallbox__-desktop-18-y12750.png` bei
  409/764, gemessen weiß als Pfeilfarbe). Zwei weiße Pfeil-Kreise steuern den Slider.
  Da diese Route selbst zu den Produkten gehört, führt der Slider auf Geschwisterrouten
  und lässt die eigene aus.
- Typo: Kicker ca. 17 px Regular Orange, H2 zweizeilig ca. 46 px Regular, Lead ca. 17 px
  Regular Grau zentriert, Bold-Lead im Split ca. 22 px Bold. Slider-Kachel-Titel ca.
  40 px Regular Weiß oben links.
- Farbe/Fläche: Weiß als Grund. Das Produktlogo „EKD365+" trägt ein orangefarbenes
  hochgestelltes Plus als einzigen Akzent der Bildspalte.
- Abstände/Rhythmus: Kopf zu Rendering ca. 95 px, Rendering ca. 600 px hoch, ca. 105 px
  zum Split, Spaltenabstand ca. 115 px, ca. 130 px zum Slider. Slider-Kacheln ca. 420 px
  breit, Lücke ca. 30 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-SLIDER-EDGE` — siehe Sektion 125.

### 140 — Beratungs-Panel auf ganzflächigem Warmgrau [wallbox__-desktop-18-y12750.png | -]
- Anordnung: Links das Berater-Foto im festen Rechteck, rechts Kicker, H2, dreizeiliger
  Fließtext und CTA — inhaltlich identisch zu Sektion 126. **Der Unterschied liegt in
  der Fläche**: hier läuft das Warmgrau randlos über die volle Fensterbreite als
  eigenständige Sektion, statt als gerundetes Panel über die Bandkante geschoben zu
  werden. In `wallbox__-desktop-20-y13821.png` ist das Panel dagegen wieder gerundet und
  überlappt das dunkle Band — die Sektion wechselt beim Scrollen also nicht, sondern die
  beiden Slices zeigen zwei verschiedene vertikale Ausschnitte derselben Anordnung; der
  gerundete Abschluss ist der untere Rand.
- Buttons/Komponenten: Ein CTA „Unverbindlich anfragen", Rechteck mit kleinem Radius,
  gefüllt Orange, Label dunkel. Das Foto ohne Rundung und ohne Rahmen.
- Typo: Kicker „Kostenlose Solar-Beratung" ca. 17 px Regular Orange, H2 einzeilig
  ca. 40 px Regular dunkel, Fließtext ca. 17 px Regular Grau, Button-Label ca. 18 px
  Medium.
- Farbe/Fläche: Gemessen `#eeeeee` (`wallbox__-desktop-18-y12750.png` bei 720/1100) —
  dasselbe helle Grau wie die Rechner- und Konfigurator-Panels, nicht das dunklere
  Kachel-Warmgrau `#e9e9e6`.
- Abstände/Rhythmus: Linker Rand 140 px zum Foto, Spaltenabstand ca. 65 px, ca. 25 px
  Kicker zu H2, ca. 50 px H2 zu Fließtext, ca. 45 px Fließtext zu CTA. Sektionshöhe
  ca. 500 px.
- Mobil: keine Mobil-Shots dieser Route vorhanden. Nicht geprüft.
- Pattern: `P-CONSULT-PANEL` — siehe Sektion 60 und 126.

### 141 — Abschlussband und Footer [wallbox__-desktop-20-y13821.png | -]
- Identisch zu Sektion 16 und 17 der Startseite und zu Sektion 127: Near-Black-Band
  (gemessen `#1f2629` in `wallbox__-desktop-20-y13821.png` bei 720/900) mit zweizeiliger
  linksbündiger H2 „Bessere Energie für Ihr Zuhause. Das ganze Jahr.", unterstrichenem
  Bold-Link „Broschüre herunterladen" und drei Auszeichnungs-Logos in Gold; darunter der
  Fünf-Spalten-Footer mit Logo, vier Linkspalten, drei Social-Icons und der Rechtszeile
  „© 2026 Energiekonzepte Deutschland GmbH". Die Bandoberkante wird vom Beratungs-Panel
  aus Sektion 140 überlappt. Siehe dort.
- Pattern: `P-CTA-END` / Kandidat: Dunkler Fünf-Spalten-Footer ohne Akzentfarbe
