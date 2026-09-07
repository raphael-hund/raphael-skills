# JANtronic — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Grundwerte (Pixelmessung mit Pillow auf den PNG, nicht geschätzt):
Akzent-Grün gefüllter CTA `#009755` (`home-desktop-00-fold.png`, Header-Pille bei 1113/34
und Hero-Primär bei 619/630 identisch). Eyebrow-Pill-Text `#339668`, Pill-Fläche
`#ebf5f0`. Sekundär-CTA-Label `#464648` auf nahezu weißer Fläche. Grundfläche `#ffffff`
(85,0 % der Fold-Pixel). Fließtext-Grau `#818182`. Dunkelgrüne Foto-Überlagerung an der
dunkelsten Stelle `#062f1d` (`unternehmen-desktop-00-fold.png` bei 1300/800). Footer-Fläche
`#f9f9f9` (37,1 % Anteil in `home-desktop-19-y13500.png`, dort dominiert die graue
Leaflet-Karte). Alles Übrige unten ist als Schätzung gekennzeichnet.

Ein Chat-Widget (weiße Sprechblase „Willkommen bei JANtronic!" plus grüner runder
Button unten rechts) liegt als fixes Overlay in praktisch jedem Shot. Es ist kein
Sektionselement und wird unten nur dort erwähnt, wo es Inhalt verdeckt. Ein
Cookie-Overlay ist in keinem Shot sichtbar.

## Seite: /

### 01 — Header / Navigationsleiste [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Eine Zeile, nicht randlos — der Inhalt sitzt in einem zentrierten Container
  von ca. 250 px bis 1190 px (940 px breit), links und rechts bleibt weiße Luft. Logo
  links, vier Nav-Labels als Gruppe leicht rechts der Mitte (Untermehmen, Leistungen,
  Hersteller, News), dann Sprach-Flagge und ganz rechts der CTA. Die Leiste ist sticky:
  sie liegt in jedem Scroll-Slice (z. B. `home-desktop-11-y7500.png`) unverändert oben
  und überlagert dort auch dunkle Foto-Bänder mit weißer Fläche. Unter der Leiste eine
  1 px helle Trennlinie, die nur so breit ist wie der Container, nicht randlos.
- Buttons/Komponenten: Ein einziger CTA „Bedarf senden", Vollpille (Radius = halbe Höhe,
  Höhe ca. 40 px, geschätzt), gefüllt `#009755` (gemessen), weißes Label halbfett, kein
  Icon. Sprachschalter als kreisrunder Chip (ca. 34 px) mit Deutschland-Flagge im Kreis
  beschnitten. Nav-Labels sind reiner Text ohne Kasten. Aktiv-Zustand: das Label der
  aktuellen Seite wird dunkler und fetter — Vergleich `home-desktop-00-fold.png` (keins
  aktiv) gegen `leistungen-desktop-00-fold.png` und `hersteller-desktop-00-fold.png`
  (jeweils das eigene Label kräftig, die übrigen grau). Hover verhält sich gleich
  (`home-desktop-hover-01-Leistungen.png`: „Leistungen" dunkel, Rest grau); es klappt
  kein Dropdown auf, das Hover-Bild unterscheidet sich sonst nicht vom Fold.
- Typo: Nav-Labels Grotesk, Regular, ca. 15 px, gemischte Schreibweise, keine Caps, kein
  Letterspacing (geschätzt). CTA-Label eine Spur fetter (Medium/Semibold). Das Logo ist
  eine Wortmarke „JANtronic" mit einer nach rechts auslaufenden Leiterbahn-Linie in Grün,
  die als grafischer Unterstrich über die Wortmarke hinaus nach rechts läuft.
- Farbe/Fläche: Weiße Leiste, alles Grau bis auf genau eine grüne Fläche (den CTA). Kein
  Schatten unter der Leiste, nur die Haarlinie.
- Abstände/Rhythmus: Leistenhöhe ca. 70 px, CTA vertikal zentriert, zwischen den
  Nav-Labels ca. 40 px Abstand, große Lücke zwischen Logo und Nav-Gruppe.
- Mobil: stark reduziert (`home-mobile-00-fold.png`). Nur Logo links, Flaggen-Chip und
  ein Burger-Icon (drei Striche) rechts. Der CTA „Bedarf senden" fällt in der Leiste weg
  und existiert nur noch im Hero. Leiste ca. 60 px hoch.
- Pattern: Kandidat: Schmale Container-Leiste mit genau einem Pill-CTA

### 02 — Hero, zentrierte Typo mit Proof-Widget [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Einspaltig, alles auf der Mittelachse: Eyebrow-Pille, dreizeilige H1,
  eine Zeile Benefit-Bullets, CTA-Paar. Darunter setzt eine gepunktete Weltkarte an, die
  in einer großzügig gerundeten Karte (Radius ca. 24 px, geschätzt) sitzt und im Fold
  angeschnitten ist. Kein Hero-Foto. Auffällig: das ProvenExpert-Widget hängt nicht
  zentriert, sondern links außen und überlappt die Kartenfläche an der linken Kante —
  eine bewusste Asymmetrie im sonst streng zentrierten Aufbau. Im Hintergrund liegt ein
  sehr blasses Raster aus dünnen Linien und diagonalen Schraffuren, sichtbar an den
  Rändern links und rechts.
- Buttons/Komponenten: CTA-Paar nebeneinander, beide Vollpillen gleicher Höhe (ca. 40 px,
  geschätzt). Primär „Bedarf senden" gefüllt `#009755` (gemessen), weißes Label.
  Sekundär „Unsere Geschichte" gefüllt in fast weißem Grau mit dunklem Label `#464648`
  (gemessen) — es ist kein Outline-Button, sondern eine helle Füllung ohne sichtbare
  Kontur. Kein Icon, kein Chevron auf beiden. Eyebrow ist eine Pille mit hellgrüner
  Füllung `#ebf5f0` und grünem Text `#339668` (gemessen). Die Bullet-Zeile nutzt kleine
  runde Punkte als Trenner zwischen den Stichworten. Das ProvenExpert-Widget ist eine
  eigenständige Karte mit Rundung, hellem Beige-Ton, goldenem Siegelkreis, fünf goldenen
  Sternen, einer grünen Vollflächen-Leiste mit der Bewertungszahl und einem
  Drei-Punkte-Menü oben rechts — eine fremde Widget-Ästhetik, die sich vom Rest der Seite
  absetzt.
- Typo: Dreistufig. Eyebrow in Caps, klein (ca. 13 px), mit deutlichem Letterspacing.
  H1 sehr groß (ca. 64 px), Grotesk, Bold/Extrabold, sehr dunkles Anthrazit statt Schwarz,
  Zeilenabstand eng gesetzt, drei Zeilen. Verhältnis H1 zu Bullet-Zeile grob 3,5:1
  (geschätzt). Die Bullet-Zeile ist auffällig groß (ca. 18 px) und damit eher eine Lead-
  als eine Fußzeile. Keine Serif auf der Seite.
- Farbe/Fläche: Weiß, hell. Der Akzent sitzt nur in vier Punkten: Eyebrow-Pille,
  Primär-CTA, die grünen Standort-Punkte auf der Weltkarte, die grüne Zahlen-Leiste im
  Widget. Kein Hell/Dunkel-Wechsel in dieser Sektion.
- Abstände/Rhythmus: Sehr luftig. Ca. 100 px von der Leiste bis zur Eyebrow, ca. 60 px
  von der Bullet-Zeile bis zum CTA-Paar, ca. 24 px zwischen den beiden Buttons. Die
  Textspalte ist auf ca. 790 px begrenzt, deutlich schmaler als der Container.
- Mobil: gestapelt und deutlich enger (`home-mobile-00-fold.png`). Eyebrow-Pille bleibt
  einzeilig, H1 bricht auf drei Zeilen bei ca. 26 px. Die Bullet-Zeile wird nicht
  umbrochen, sondern rechts abgeschnitten — nur „Kostenfreier Expressversand" ist
  vollständig lesbar, der Rest läuft aus dem Viewport (horizontales Overflow, sichtbarer
  Bruch). Das CTA-Paar bleibt nebeneinander statt zu stapeln und füllt fast die volle
  Breite. Das ProvenExpert-Widget rutscht nach links unten und ist im Fold größer
  gewichtet als desktop; die Weltkarte schrumpft auf einen kleinen Rest rechts daneben.
- Pattern: Kandidat: Zentrierter Typo-Hero mit Dritt-Proof-Widget (`P-HERO-PHOTO` greift
  nicht, es gibt kein Foto; `P-PROOF-STRIP` greift nicht, das Widget ist keine Leiste)

### 03 — Weltkarte, Ausklang des Hero [home-desktop-02-y750.png | -]
- Anordnung: Die gerundete Kartenfläche steht als eigenes Objekt im Container, ca.
  270 px bis 1170 px breit, mit weißem Rand ringsum. Die Weltkontinente sind komplett
  aus kleinen grauen Punkten gerastert; einzelne Standorte sind größere grüne Punkte.
  Nach der Karte folgt ein sehr großer leerer weißer Block (ca. 400 px), bevor die
  nächste Sektion beginnt.
- Buttons/Komponenten: keine. Die grünen Punkte sind reine Grafik.
- Typo: keine Textelemente in dieser Fläche.
- Farbe/Fläche: Weiß auf Weiß, das Punktraster in Hellgrau, Akzent nur in den
  Standort-Punkten.
- Abstände/Rhythmus: Der Leerblock danach ist die größte einzelne Lücke der Startseite
  und trennt Hero und Body sehr hart.
- Mobil: verkleinert bereits im Fold sichtbar (`home-mobile-00-fold.png`), kein eigener
  Abschnitt.
- Pattern: Kandidat: Punktraster-Weltkarte als Hero-Sockel

### 04 — Stats-Band „Warum JANtronic" [home-desktop-02-y750.png | -]
- Anordnung: Zentrierter Kopf (Eyebrow-Pille, H2, zweizeilige Subline), darunter drei
  gleich breite Spalten ohne Karten, ohne Trennlinien, ohne Rahmen — nur Zahl über Label,
  jeweils zentriert. Die drei Spalten sitzen im Container, die mittlere exakt auf der
  Mittelachse.
- Buttons/Komponenten: keine Buttons. Die Stats sind kartenlos, das ist der Unterschied
  zur sonst karten-lastigen Seite. Eyebrow „VORTEILE" wieder als hellgrüne Pille.
- Typo: Vierstufig. Eyebrow Caps klein mit Letterspacing, H2 ca. 44 px Bold,
  Subline ca. 17 px Regular in Grau, Stat-Zahlen ca. 40 px Bold in Grün, Stat-Labels
  ca. 12 px Caps mit weitem Letterspacing in Grau. Verhältnis H2 zu Subline grob 2,6:1
  (geschätzt).
- Farbe/Fläche: Weiß. Der Akzent trägt hier ausschließlich die Zahlen — die einzige
  Stelle der Seite, an der Grün als Textfarbe in großem Grad auftritt.
- Abstände/Rhythmus: Ca. 60 px Kopf zu Zahlenreihe, zwischen Zahl und Label ca. 20 px.
  Die Spalten stehen weit auseinander, das Band wirkt breit und leicht.
- Mobil: gestapelt untereinander, jede Zahl mit ihrem Label als eigener Block, mittig
  (Serie `home-mobile-*`, gleiche Reihenfolge wie Desktop).
- Pattern: Kandidat: Kartenloses Stats-Band mit Caps-Label

### 05 — Video-Statement mit CTA-Paar [home-desktop-02-y750.png, home-desktop-04-y2250.png | -]
- Anordnung: Ein vollbreites Video im Container (ca. 120 px bis 1320 px, also breiter als
  die Textspalte), mit abgerundeten Ecken (Radius ca. 12 px, geschätzt). Player-Leiste
  über dem Bildrand unten: links Play-Dreieck, rechts Zeitangabe, Lautstärkesymbol mit
  Slider, Drei-Punkte und Vollbild-Icon. Darunter zentriert wieder das CTA-Paar.
- Buttons/Komponenten: Player-Controls als weiße Icons direkt auf dem Bild, ohne
  Hintergrundleiste — die Bedienelemente liegen frei über dem Foto. Der Lautstärke-Slider
  ist eine dünne grüne Linie mit weißem Knopf, das ist der einzige Akzent auf dem Video.
  CTA-Paar wie in Sektion 02, hier „Bedarf senden" (grün) plus „Zum Newsletter anmelden"
  (hellgrau gefüllt).
- Typo: keine Überschrift über dem Video — die Sektion trägt nur Bild und Buttons.
- Farbe/Fläche: Das Video-Standbild ist das erste dunklere Element der Seite und bricht
  den Weißraum. Rundum bleibt Weiß.
- Abstände/Rhythmus: Ca. 70 px vom Video zum CTA-Paar, danach wieder ein großer weißer
  Block (ca. 200 px) bis zur nächsten Eyebrow.
- Mobil: das Video schrumpft auf Containerbreite, das CTA-Paar bleibt nebeneinander
  (Serie `home-mobile-*`).
- Pattern: Kandidat: Video-Statement mit nachgestelltem CTA-Paar

### 06 — Vorteils-Raster „Dein neuer ~~Broker~~ Partner" [home-desktop-04-y2250.png, home-desktop-06-y3750.png | home-mobile-*]
- Anordnung: Zentrierter Kopf, darunter ein 3×2-Raster aus sechs Karten. Die Karten sind
  nicht gleich hoch und nicht gleich gefüllt — jede trägt eine eigene UI-Miniatur statt
  eines Icons, und die Miniaturen unterscheiden sich stark: gestapelte Zeilen mit
  Verbindungslinie (Stepper), zwei kleine Kärtchen mit Pfeil nach unten, eine
  zweispaltige Chip-Liste, ein Foto mit zwei überlagerten Kreis-Icons, eine
  Monatstabelle. Die Text-Blöcke sitzen in den Karten mal oben (Karte 2, 3, 6), mal unten
  (Karte 1) — die Reihenfolge Bild/Text wechselt bewusst pro Karte.
- Buttons/Komponenten: Karten mit hellgrauer Füllung, weichem Radius (ca. 20 px,
  geschätzt) und sehr zurückhaltendem Schatten. In den Miniaturen: weiße Zeilen-Pillen mit
  Radius ca. 10 px, rechts je ein quadratisches Icon-Kästchen mit hellgrüner Füllung und
  grünem Glyph (Warenkorb, Häkchen, Karte); die aktive Zeile („Zahlung") ist hellgrün
  hinterlegt und ihr Label grün — ein sichtbarer Aktiv-Zustand innerhalb der Illustration.
  Chip-Liste: weiße Pillen mit dünner Kontur, in zwei Spalten, dazwischen eine vertikale
  grüne Verbindungslinie. Mikro-Badge „VERIFIZIERTE HERSTELLER ✓" als grüne Caps-Zeile mit
  Häkchen. Kleine Statuszeichen „Lieferung ✓" als weiße Pille mit grünem Kreis-Häkchen.
  Ein weiterer Chip mit grünem Pfeil-Icon „Faire transparente Preise". Karte 3 hat als
  einzige einen sehr blassen Foto-Hintergrund unter dem Text.
- Typo: Karten-H3 ca. 24 px Bold zentriert, darunter eine graue Zeile ca. 15 px. Der
  H2 der Sektion setzt das Wort „Broker" durchgestrichen — der Strich ist grün, das Wort
  bleibt dunkel. Eyebrow wieder Caps-Pille „VORTEILE". Mikro-Labels in den Illustrationen
  ca. 11–12 px Caps.
- Farbe/Fläche: Weißer Sektionsgrund, Karten in einem Hauch Grau (ca. `#f7f7f7`,
  geschätzt) — die Trennung Karte/Grund ist absichtlich schwach, die Karten heben sich
  fast nur über Schatten und Radius ab. Grün nur punktuell in Icons, Häkchen,
  Verbindungslinien und dem Durchstreichungsstrich.
- Abstände/Rhythmus: Ca. 24 px Rinne zwischen den Karten, ca. 40 px Innenpadding. Nach
  dem Raster folgt das CTA-Paar mit ca. 60 px Abstand, dann wieder ein weiter weißer Block.
  Innerhalb der Karten ist es dicht, zwischen den Sektionen sehr luftig — dieser Kontrast
  ist das Rhythmus-Prinzip der ganzen Seite.
- Mobil: einspaltig gestapelt, jede Karte volle Breite, Reihenfolge unverändert (Serie
  `home-mobile-*` zwischen y2954 und y4642). Die zweispaltigen Chip-Listen in Karte 3
  bleiben zweispaltig, werden nur schmaler.
- Pattern: `P-OFFER-PAIR` (Abweichung: sechs statt zwei Karten, ungleiche Höhen)

### 07 — Vergleichs-Matrix „Mehr als ein Broker" [home-desktop-06-y3750.png | home-mobile-12-y4642.png]
- Anordnung: Bruch mit dem Zentrierungsprinzip — Eyebrow, H2 und Subline stehen hier
  linksbündig am Containerrand, nicht mittig. Darunter eine einzelne große Karte (ca.
  270 px bis 1170 px), die die Tabelle enthält: eine Spalte Merkmal links, drei schmale
  Wertspalten rechts (Broker, Hersteller, JANtronic). Zwischen den Wertspalten laufen
  dünne vertikale Trennlinien, die nur über die Zeilen reichen, nicht über den Kopf.
  Die JANtronic-Spalte ist unaufdringlich hervorgehoben: ihr Kopf-Label ist grün, ihre
  Spaltenfläche minimal heller. Am Kartenfuß eine Reihe aus drei Chips, die über den
  unteren Kartenrand hinausragen und ihn überlappen.
- Buttons/Komponenten: Statuszeichen als gefüllte Kreise mit weißem Glyph — grüner Kreis
  mit Häkchen, roter Kreis mit X, ca. 22 px. Kopf-Labels in Caps. Die drei Fuß-Chips sind
  weiße Pillen mit Schatten und einem grünen Pfeil-Icon vorn. Danach das übliche CTA-Paar
  („Bedarf senden" grün, „Unsere Leistungen" hellgrau).
- Typo: H2 ca. 40 px Bold linksbündig, Subline ca. 17 px Grau zweizeilig, Zeilenlabels
  ca. 16 px Regular, Spaltenköpfe ca. 12 px Caps mit Letterspacing. Chip-Label ca. 14 px
  Semibold.
- Farbe/Fläche: Weißer Grund, Karte in Hellgrau, Radius ca. 24 px (geschätzt). Erstes
  Auftreten von Rot auf der Seite — Rot dient hier ausschließlich als Negativ-Marker und
  taucht sonst nirgends auf.
- Abstände/Rhythmus: Zeilenhöhe ca. 64 px, gleichmäßig, dadurch wirkt die Tabelle ruhig.
  Ca. 70 px Kartenpadding oben.
- Mobil: die Matrix bleibt eine echte Tabelle statt in Karten zu zerfallen
  (`home-mobile-12-y4642.png`): Merkmalspalte links auf ca. 50 % Breite mit
  zweizeiligem Umbruch, die drei Icon-Spalten rechts sehr schmal nebeneinander. Die
  Spaltenköpfe sind über dem sichtbaren Bereich, die Zuordnung ist beim Scrollen nicht
  mehr ablesbar. Die drei Fuß-Chips stapeln untereinander und sind linksbündig statt
  zentriert. Das Chat-Widget verdeckt hier den unteren Rand der Sektion.
- Pattern: Kandidat: Drei-Spalten-Vergleichsmatrix mit Positiv/Negativ-Kreisen

### 08 — Leistungs-Tabs „Kennen Sie das auch?" [home-desktop-08-y5250.png | home-mobile-*]
- Anordnung: Zentrierter Kopf, darunter eine horizontale Tab-Leiste aus vier Pillen,
  zentriert. Darunter eine breite Panel-Karte (ca. 120 px bis 1320 px), innen zweispaltig
  aufgeteilt: links der gesamte Text (H3, Frage, Lösungsabsatz, Chips, CTA-Paar), rechts
  eine leere Fläche mit einem einzelnen großen grünen Icon. Die Icon-Fläche ist eine
  eigene weiße Kachel, die aus dem Panel oben rechts herausragt und dessen Ecke
  überlappt — die auffälligste Überlappung der Seite. Der rechte Bereich unter dem Icon
  bleibt bewusst leer, die Karte ist damit stark asymmetrisch gefüllt.
- Buttons/Komponenten: Tabs als Pillen gleicher Höhe (ca. 40 px). Aktiv = fast schwarz
  gefüllt mit weißem Label; inaktiv = fast weiß gefüllt mit dunklem Label. Das ist der
  einzige Ort der Seite, an dem Schwarz statt Grün als Aktiv-Farbe dient — die
  Klick-Shots `home-desktop-click-y4500-00-Sourcing.png`,
  `home-desktop-click-y4500-01-Sonderbeschaffung.png`,
  `home-desktop-click-y4500-02-Lagerkonzepte.png`,
  `home-desktop-click-y4500-03-Musterartikel.png` und
  `home-desktop-click-y5250-00-Sourcing.png` belegen, dass der schwarze Zustand pro Tab
  mitwandert. Fakten-Chips: weiße Pillen mit dünner Kontur und kleinem dunklen Icon
  (Lupe, Schild) links. CTA-Paar am Kartenfuß linksbündig, nicht zentriert.
- Typo: H2 ca. 44 px Bold zentriert. Karten-H3 ca. 26 px Semibold linksbündig. Das Wort
  „Lösung:" ist grün und fett gesetzt und leitet den Absatz ein — Farbe als
  Lesehilfe im Fließtext, sonst nirgends auf der Seite. Chips ca. 14 px.
- Farbe/Fläche: Weißer Grund, Panel in sehr hellem Grau mit Radius ca. 24 px. Akzent im
  großen Icon (Globus, ca. 44 px, kräftiges Grün), im Wort „Lösung:" und im Primär-CTA.
- Abstände/Rhythmus: Ca. 50 px vom Kopf zur Tab-Leiste, ca. 45 px von der Tab-Leiste zum
  Panel, Panel-Innenpadding ca. 45 px. Der leere rechte Panel-Bereich erzeugt viel Luft
  in einer sonst dichten Karte.
- Mobil: gestapelt; die Tab-Pillen scrollen horizontal statt umzubrechen, das Panel wird
  einspaltig, das große Icon rückt über den Text (Serie `home-mobile-*` um y5486).
- Pattern: Kandidat: Pill-Tabs mit überlappender Icon-Kachel

### 09 — Kontakt-Split mit Formular [home-desktop-08-y5250.png | kontakt-mobile-*]
- Anordnung: Zweispaltig, links Text (Eyebrow-Pille, zweizeilige H2, dreizeiliger
  Absatz), rechts das Formular. Die rechte Hälfte liegt auf einer eigenen sehr hellen
  Fläche mit sichtbarem feinen Linienraster im Hintergrund, die bis an den Containerrand
  reicht und oben abgerundet ist. Das Formular selbst sitzt als weiße Karte auf diesem
  Raster, leicht eingerückt — Karte auf Fläche auf Fläche, drei Ebenen. Die linke
  Textspalte endet weit oberhalb, darunter bleibt viel Leerraum.
- Buttons/Komponenten: Fünf Felder untereinander, jedes mit Label darüber und rotem
  Sternchen für Pflicht. Felder sind weiße Rechtecke mit dünner grauer Kontur und
  moderatem Radius (ca. 8 px, geschätzt) — deutlich eckiger als alles andere auf der
  Seite, hier bricht das Pillen-System. Höhe ca. 44 px, Platzhaltertext in Grau. Das
  letzte Feld „Bedarf" ist ein mehrzeiliges Textarea mit Anfasser unten rechts.
  Submit „Jetzt Anfragen" ist wieder eine Vollpille in `#009755`, linksbündig unter dem
  Formular, nicht volle Breite.
- Typo: H2 ca. 44 px Bold, zweizeilig. Feld-Labels ca. 14 px Medium, Platzhalter ca. 15 px
  Regular Grau.
- Farbe/Fläche: Links Weiß, rechts die gerasterte Hellfläche — ein leiser Hell/Hell-Wechsel
  statt eines Hell/Dunkel-Bruchs. Akzent nur im Submit-Button.
- Abstände/Rhythmus: Ca. 20 px zwischen den Feldern, ca. 8 px zwischen Label und Feld.
  Das Formular ist dicht, die linke Spalte luftig — die Sektion ist bewusst ungleich
  gewichtet.
- Mobil: gestapelt, Text über Formular, Felder volle Breite (Serie `kontakt-mobile-*`).
- Pattern: `P-CONTACT`

### 10 — Gründer-Zitat auf dunkelgrünem Foto [home-desktop-11-y7500.png | home-mobile-*]
- Anordnung: Randloses Band über die volle Viewport-Breite (0 bis 1440), erstmals ohne
  Container-Begrenzung. Hintergrund ist ein stark abgedunkeltes, unscharfes Foto mit
  grünem Farbstich. Darauf zentriert eine weiße Karte mit dem Zitat, darunter — bereits
  wieder auf dem Foto — das CTA-Paar. Die Karte ragt oben aus dem Slice heraus, das Band
  ist also höher als 1500 px angesetzt.
- Buttons/Komponenten: Weiße Zitatkarte mit Radius ca. 20 px, ohne sichtbaren Rand. CTA-Paar
  hier zum ersten Mal auf dunklem Grund: Primär bleibt grün gefüllt, Sekundär „Über Uns"
  wird zu einer weiß gefüllten Pille mit dunklem Label — das Sekundär-Muster passt sich
  dem Untergrund an, bleibt aber gefüllt statt Outline.
- Typo: Zitattext ca. 20 px Regular zentriert, dunkel. Darunter die Signatur als
  Handschrift-Schreibschrift („Jan Pucko", ca. 30 px) — der einzige Auftritt einer
  Script-Type auf der ganzen Site. Darunter die Rolle in Caps ca. 12 px mit
  Letterspacing, Grau. Dreistufig: Zitat / Signatur / Caps-Label.
- Farbe/Fläche: Der erste echte Hell/Dunkel-Wechsel der Startseite. Das Grün des Fotos
  liegt in derselben Familie wie der Akzent, das Band wirkt dadurch nicht wie ein
  Fremdkörper, sondern wie eine abgedunkelte Variante der Markenfarbe.
- Abstände/Rhythmus: Ca. 60 px von der Karte zum CTA-Paar, danach ca. 100 px Foto bis zur
  Bandkante. Die weiße Karte lässt links und rechts ca. 310 px Foto stehen.
- Mobil: Band bleibt randlos, Karte auf Viewportbreite minus Rand, CTA-Paar darunter
  gestapelt (Serie `home-mobile-*`).
- Pattern: Kandidat: Zitat-Karte auf abgedunkeltem Marken-Foto

### 11 — Team-Raster „Das Team dahinter" [home-desktop-11-y7500.png | unternehmen-mobile-*]
- Anordnung: Zentrierter Kopf, darunter ein Raster, das bewusst nicht uniform ist. Die
  erste Karte ist doppelt breit und horizontal geteilt: links das Portrait randabfallend
  über die gesamte Kartenhöhe, rechts der Textblock — ein Split innerhalb der Karte. Die
  übrigen Karten sind einspaltig vertikal: Portrait oben als Rechteck, Text darunter. In
  der ersten Reihe stehen damit eine breite und zwei schmale Karten nebeneinander, in der
  zweiten Reihe vier gleiche. Der Rhythmus ist damit 1 groß + 2 klein, dann 4 klein.
- Buttons/Komponenten: Karten weiß mit weichem Schatten und Radius ca. 16 px. Über der
  Gründer-Karte liegt ein Badge, das die obere Kartenkante überlappt: helle Pille mit
  grünem Schild-Häkchen links und einer Qualifikationszeile. Kontaktzeilen als
  Icon+Text-Paare (Briefumschlag, Telefonhörer, LinkedIn-Quadrat) in Dunkelgrau, ca. 15 px,
  linksbündig untereinander. Nur die Gründer-Karte trägt einen CTA: grüne Vollpille
  „Mit Jan sprechen", linksbündig im Textblock — genau ein Button im gesamten Raster.
  Die Portraits sind unterschiedlich freigestellt: manche vor grauem Studiohintergrund,
  eines vor echtem Büro, der Bildstil ist damit nicht einheitlich.
- Typo: Rolle als Caps-Label ca. 12 px in Grau mit Letterspacing, darunter der Name
  ca. 22 px Bold — Label über Name, nicht darunter. Kontaktzeilen Regular ca. 15 px.
  H2 der Sektion ca. 44 px Bold, Subline zweizeilig Grau.
- Farbe/Fläche: Weißer Grund, weiße Karten, Trennung nur über Schatten. Grün nur im
  Badge-Häkchen und im einen CTA.
- Abstände/Rhythmus: Ca. 24 px Rinne, Innenpadding ca. 30 px. In der Gründer-Karte
  großzügiger Weißraum über dem Rollen-Label.
- Mobil: einspaltig, die breite Gründer-Karte klappt zu Portrait über Text und
  gleicht sich den anderen an (Serie `unternehmen-mobile-*`, gleiche Komponente).
- Pattern: `P-TEAM`

### 12 — Kundenstimmen [home-desktop-14-y9750.png | home-mobile-*]
- Anordnung: Zweispaltig, aber versetzt: die Karten der linken und rechten Spalte
  beginnen nicht auf gleicher Höhe, sondern sind gegeneinander verschoben — ein
  Masonry-artiger Versatz. Jede Karte hat unten links (linke Spalte) bzw. unten links der
  rechten Spalte einen kleinen Sprechblasen-Zipfel, an dem der Autor mit rundem Avatar
  außerhalb der Karte sitzt. Der Autor steht also nicht in, sondern unter der Karte.
- Buttons/Komponenten: Karten weiß mit Radius ca. 16 px und feinem Schatten. Sterne als
  Fünferreihe in kräftigem Orange, ca. 18 px, oben in der Karte. Avatare sind runde
  Kreise (ca. 34 px) mit einem einzelnen weißen Großbuchstaben auf farbigem Grund — die
  Farben wechseln pro Person (Blau, Violett, Orange), eine bewusste Buntheit, die sonst
  auf der Seite nirgends vorkommt. Ein Avatar zeigt statt eines Buchstabens einen
  Schriftzug. Abschließend das CTA-Paar zentriert („Kontakt aufnehmen" grün, „Alle
  Bewertungen ansehen" hellgrau).
- Typo: Zitattext ca. 17 px Regular mit großzügigem Zeilenabstand, dunkelgrau.
  Autorenname ca. 15 px Regular neben dem Avatar. Keine Überschrift innerhalb der Karten.
- Farbe/Fläche: Weiß. Orange und die bunten Avatare sind die einzigen Fremdfarben der
  Startseite neben dem Rot der Matrix.
- Abstände/Rhythmus: Ca. 30 px Innenpadding, ca. 60 px vertikal zwischen den Kartenreihen
  durch den Versatz. Nach dem CTA-Paar ca. 130 px Luft bis zum Schlussband.
- Mobil: einspaltig gestapelt, Versatz entfällt, Autor bleibt unter der Karte (Serie
  `home-mobile-*`).
- Pattern: `P-TESTIMONIAL`

### 13 — Schlussband „Für Einkäufer" auf Foto [home-desktop-14-y9750.png | home-mobile-*]
- Anordnung: Anders als Sektion 10 kein randloses Band, sondern eine große gerundete
  Karte im Container (ca. 120 px bis 1320 px, Radius ca. 28 px, geschätzt). Foto als
  Kartenfüllung, links darüber die Textspalte auf ca. 45 % Breite, rechts bleibt das
  Motiv (drei Personen) frei — die Personen sind bewusst nicht überschrieben. Der
  Farbverlauf geht von sehr dunkel links zu fast klar rechts, damit der Text links liest
  und das Foto rechts wirkt.
- Buttons/Komponenten: Sieben Benefit-Chips untereinander, jeder eine dunkle
  halbtransparente Pille, deren Breite sich dem Textinhalt anpasst — die Chips sind
  dadurch unterschiedlich lang und bilden eine ausgefranste rechte Kante, was den Block
  bewusst unruhig macht. Jeder Chip hat links ein kleines grünes Pfeil-Icon. Genau ein
  CTA am Fuß: grüne Vollpille „Bedarf senden", linksbündig — hier steht der Primär-CTA
  allein, ohne Sekundär-Partner. Das ist die einzige Sektion der Startseite mit nur einem
  Button.
- Typo: H2 ca. 40 px Bold in Weiß, zweizeilig. Subline ca. 17 px Weiß-Grau. In den Chips
  ist das Stichwort Semibold, der Rest Regular in einem leicht abgesenkten Weiß — die
  Zweistufigkeit passiert innerhalb einer Zeile.
- Farbe/Fläche: Dunkles Foto mit grünem Stich, weiße Schrift. Grün nur in den
  Pfeil-Icons und im CTA.
- Abstände/Rhythmus: Chips mit ca. 10 px Abstand sehr dicht gestapelt, dadurch ein
  kompakter Listenblock; darüber und darunter viel Luft (ca. 90 px zum Kartenrand).
- Mobil: die Karte behält ihren Radius, Text und Chips stapeln über dem Foto, das Motiv
  wird beschnitten (Serie `home-mobile-*`).
- Pattern: `P-CTA-END` (Abweichung: dunkles Foto statt Akzent-Vollfläche, dadurch S1-konform)

### 14 — Aktionskarte „Sprich mit uns" [home-desktop-18-y12750.png | -]
- Anordnung: Zentrierte Karte im Container, alles auf der Mittelachse: H2, Subline,
  CTA-Paar. Als Dekoration laufen links und rechts oben gestrichelte grüne Leiterbahnen
  in die Karte hinein und enden frei — sie rahmen den Text von zwei Seiten, ohne ihn zu
  umschließen. Der Vollaufbau dieser Grafik ist in `hersteller-desktop-04-y2250.png`
  sichtbar: dort steht mittig ein großes grünes Chip-Icon in einem gerundeten Quadrat, von
  dem die Bahnen sternförmig nach links und rechts auslaufen.
- Buttons/Komponenten: CTA-Paar zentriert („Bedarf senden" grün, „Kontakt aufnehmen"
  hellgrau). Das Chip-Icon (nur auf `/hersteller` vollständig im Bild) ist ein
  grün gefülltes Quadrat mit Radius ca. 16 px und weißem Mikrochip-Glyph, umgeben von
  einem grauen Rahmen und einer gestrichelten Kontur.
- Typo: H2 ca. 40 px Bold, zweizeilig zentriert. Subline ca. 17 px Grau, zweizeilig.
- Farbe/Fläche: Karte in sehr hellem Grau auf Weiß, Radius ca. 24 px. Grün nur in den
  gestrichelten Bahnen und im Primär-CTA.
- Abstände/Rhythmus: Ca. 60 px Subline zu CTA, Kartenpadding oben ca. 90 px.
- Mobil: nicht separat geprüft, die Karte erscheint in der Mobile-Serie einspaltig
  (nicht im Detail gelesen).
- Pattern: `P-CTA-MID`

### 15 — Newsletter-Band auf Foto [home-desktop-18-y12750.png | -]
- Anordnung: Randloses, volle Breite, wieder ein abgedunkeltes Foto. Diesmal ist der Text
  strikt linksbündig am äußeren Viewportrand (ca. 44 px), nicht im Container — deutlich
  weiter links als jede andere Sektion. Rechts bleibt das Motiv (drei Personen im Lager)
  vollständig frei. Bandhöhe ca. 480 px.
- Buttons/Komponenten: Genau ein CTA, grüne Vollpille „Jetzt anmelden", linksbündig unter
  dem Text — kein Sekundär, kein Eingabefeld. Trotz „Newsletter" ist kein Formular im
  Band, nur der Button.
- Typo: H2 ca. 40 px Bold Weiß, zweizeilig. Absatz ca. 16 px Weiß-Grau, zweizeilig.
- Farbe/Fläche: Dunkel, aber weniger grün gestochen als Sektion 10 — hier wirkt das Foto
  eher neutral abgedunkelt. Damit hat die Seite zwei unterschiedlich getönte Dunkelbänder.
- Abstände/Rhythmus: Ca. 90 px vom Bandanfang zur H2, ca. 60 px vom Absatz zum Button.
  Nach dem Band folgt ohne jede Lücke direkt die Karte — harte Kante, kein Weißraum.
- Mobil: nicht separat geprüft.
- Pattern: `P-CTA-MID` (Variante auf Foto)

### 16 — Standortkarte [home-desktop-19-y13500.png | -]
- Anordnung: Randlose, volle Breite Leaflet-Karte, ca. 600 px hoch, direkt unter dem
  Newsletter-Band ohne Trennung. Der Standortmarker sitzt als einzelner grüner Punkt
  ungefähr mittig. Zoom-Steuerung als zwei quadratische weiße Kästchen (+/−) oben links,
  Attributionszeile unten rechts.
- Buttons/Komponenten: Zoom-Buttons sind eckig mit minimalem Radius — zusammen mit den
  Formularfeldern die einzigen nicht-runden Interaktionselemente. Der Marker ist ein
  schlichter gefüllter Kreis ohne Pin-Form und ohne Label.
- Typo: nur die Kartenbeschriftung der Kartenkacheln, kein eigener Text.
- Farbe/Fläche: Die Karte ist entsättigt grau (gemessen: `#dfdfdf` mit 9,8 % Anteil als
  zweithäufigste Farbe des Slices) — bewusst farblos gehalten, damit der grüne Marker
  der einzige Farbpunkt ist.
- Abstände/Rhythmus: Kein Padding, die Karte stößt oben an das Foto-Band und unten an
  die Footer-Fläche.
- Mobil: nicht separat geprüft.
- Pattern: `P-MAP`

### 17 — Footer [home-desktop-19-y13500.png | -]
- Anordnung: Vierspaltig, aber ungleich: Spalte 1 (Adresse) und Spalte 2 (Kontakt)
  starten erst bei ca. 275 px bzw. 615 px, links davon bleibt ein breiter leerer Rand.
  Rechts sitzen die beiden Siegel untereinander in einer eigenen Spalte. Darunter eine
  zweite Zeile mit Linklisten (Unternehmen, Rechtliches) und dem zweiten Siegel. Ganz
  unten eine Copyright-Zeile links und ein „Website made by"-Vermerk rechts.
  Es gibt keine sichtbare horizontale Trennlinie zwischen den Blöcken.
- Buttons/Komponenten: Keine Buttons, keine Pillen — der Footer ist der einzige Bereich
  ganz ohne CTA. Kontaktzeilen als Icon+Text (Videokamera, Telefonhörer, Briefumschlag),
  Icons in Dunkelgrau. Das ProvenExpert-Siegel wiederholt exakt das Widget aus dem Hero
  (Sektion 02), inklusive Drei-Punkte-Menü. Das IT-ZERT-Siegel darunter ist ein Bild mit
  einer separaten Caps-Zeile „ZERTIFIKAT DOWNLOAD" plus kleinem grünen Download-Icon.
  Links sind schlichter Text ohne Unterstreichung.
- Typo: Spaltenüberschriften ca. 16 px Bold, Einträge ca. 15 px Regular Grau.
  Copyright ca. 13 px. Keine Caps in den Überschriften.
- Farbe/Fläche: Heller Grund `#f9f9f9` (gemessen) — ein sehr leiser Wechsel gegenüber dem
  Weiß darüber, kein dunkler Footer. Grün nur im Download-Icon.
- Abstände/Rhythmus: Ca. 120 px Abstand zwischen dem Adressblock und der Linkliste
  darunter, Zeilen ca. 20 px. Der Footer ist auffällig luftig für einen Abschluss.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Heller Footer mit Doppel-Siegel-Spalte

### Zustände (Hover) [home-hover-06.png | -]
Zustands-Pass vom 31.08.2026 auf `/`, Desktop 1440. Gehovert wurden Nav-Elemente,
Buttons und Karten; die Belege sind die Shots `home-hover-00.png` bis `home-hover-06.png`
sowie die vier Nav-Shots `home-desktop-hover-00-Unternehmen.png`,
`home-desktop-hover-01-Leistungen.png`, `home-desktop-hover-02-Hersteller.png` und
`home-desktop-hover-03-News.png`. Alle Aussagen unten stammen aus einem
Pixelvergleich der Shots gegeneinander, nicht aus dem Augenschein.

- Nav-Label: der einzige nachweisbare Hover-Effekt der Startseite. Der Vergleich
  `home-hover-03.png` gegen `home-hover-06.png` ergibt eine Differenzfläche von genau
  (658, 28) bis (728, 42) — das ist exakt das Label „Leistungen" in der Header-Leiste,
  sonst ändert sich im ganzen 1440×900-Bild kein Pixel. Gemessen wird der dunkelste
  Pixel in diesem Feld: `#5e5e5f` im Ruhezustand (`home-hover-03.png`), `#1c1c1e` im
  Hover (`home-hover-06.png`). Der Effekt ist also eine reine Textfarb-Abdunklung.
  Kein Unterstrich, kein Rahmen, keine Fläche, kein Transform, kein Dropdown — hätte
  sich eine Linie oder ein Kasten aufgebaut, läge die Differenzfläche höher als 14 px.
- Hover-Farbe gleich Aktiv-Farbe: der Hover-Wert `#1c1c1e` aus `home-hover-06.png` ist
  identisch mit dem dunkelsten Wert desselben Labelfelds auf
  `leistungen-desktop-00-fold.png`, wo „Leistungen" die aktive Seite markiert. Hover und
  Aktiv-Zustand sind damit visuell nicht unterscheidbar — beide setzen das Label von
  `#5e5e5f` auf `#1c1c1e`. Das ist eine echte Zustandskollision: beim Überfahren eines
  Labels sieht die Leiste aus, als sei diese Seite bereits geöffnet.
- Header-CTA „Bedarf senden": keine Hover-Reaktion nachweisbar. Die Pillenfläche misst
  bei 1113/34 in `home-hover-03.png`, in `home-hover-06.png` und in
  `home-desktop-00-fold.png` denselben Wert `#009755`. Weder Aufhellung noch
  Abdunklung noch Schattenwechsel; da die Differenzfläche zwischen den Shots die
  CTA-Position gar nicht einschließt, ändert sich dort auch kein Schatten und keine
  Größe.
- Karten im Vorteils-Raster (Sektion 06): kein Hover-Zustand. `home-hover-00.png`,
  `home-hover-01.png` und `home-hover-02.png` zeigen dieselbe Kartenreihe bei
  unterschiedlich gehoverten Karten und sind untereinander pixelidentisch — der
  Differenzvergleich liefert kein Rechteck. Dasselbe gilt für `home-hover-03.png`,
  `home-hover-04.png` und `home-hover-05.png` in der zweiten Kartenreihe. Es gibt also
  keinen Schatten-Anstieg, keine Anhebung, keinen Rahmen und keine Farbänderung auf den
  Karten. Was in `home-hover-02.png` grün wirkt (die Zeile „Zahlung", die Chips
  „Lieferzeit"/„Versandkosten", das Label „Ihr Bedarf"), ist der gezeichnete
  Aktiv-Zustand der Illustration und steht im Ruhezustand genauso da.
- Konsequenz fürs Design: die Site führt Hover praktisch nur in der Navigation und dort
  nur als Farbwechsel. Sämtliche Karten, Chips und Pillen im Body sind visuell statisch,
  obwohl große Flächen davon klickbar sind — im Magazin-Raster (Sektion 40) fällt das am
  stärksten auf, weil dort die ganze Karte ein Link ist und weder Cursor-Affordanz noch
  Zustandswechsel sichtbar wird.

## Seite: /leistungen

### 18 — Foto-Hero [leistungen-desktop-00-fold.png | leistungen-mobile-00-fold.png]
- Anordnung: Randloses, vollflächiges Foto direkt unter der Header-Leiste, deutlich höher
  als der Fold (es läuft bis y ca. 1500, belegt durch `leistungen-desktop-02-y750.png`).
  Der Textblock ist zentriert und sitzt im oberen Drittel: H1 zweizeilig, Lead zweizeilig,
  CTA-Paar. Darunter bleibt das Foto über mehrere hundert Pixel textfrei — der Hero ist
  bewusst überhoch und leer im unteren Bereich.
- Buttons/Komponenten: CTA-Paar zentriert. Primär grün gefüllt, Sekundär „Über Uns" hier
  als weiß gefüllte Pille mit dünner heller Kontur und dunklem Label — auf dem dunklen
  Grund erhält der Sekundär-Button erstmals eine sichtbare Kontur.
- Typo: H1 ca. 56 px Bold Weiß, zweizeilig, zentriert. Lead ca. 18 px, Weiß-Grau,
  zweizeilig. Kein Eyebrow — die Unterseiten-Heros verzichten auf die Pille, die die
  Startseite im Hero führt.
- Farbe/Fläche: Grün abgedunkeltes Foto über die volle Breite, deutlich stärker grün
  gestochen als die Startseiten-Bänder (der grüne Hintergrund im Motiv verstärkt das).
  Kein Weißanteil außer der Schrift und dem Sekundär-Button.
- Abstände/Rhythmus: Ca. 230 px von der Header-Kante zur H1, ca. 100 px vom Lead zum
  CTA-Paar, danach ca. 950 px leeres Foto.
- Mobil: gestapelt, H1 kleiner, CTA-Paar bleibt nebeneinander
  (`leistungen-mobile-00-fold.png`, nicht im Detail gelesen).
- Pattern: `P-HERO-PHOTO` (Abweichung: Text zentriert statt links, zwei CTAs im Fold)

### 19 — Leistungs-Tabs [leistungen-desktop-02-y750.png | -]
- Anordnung und Komponenten identisch zu Sektion 08 der Startseite — gleiche Pill-Tabs,
  gleiches Panel, gleiche überlappende Icon-Kachel, gleicher Aktiv-Zustand in Schwarz.
  Einziger Unterschied ist die Position: hier folgt die Sektion unmittelbar auf den
  Hero. Siehe Sektion 08.
- Pattern: siehe Sektion 08

### 20 — Qualitätsstufen-Raster „Feste Qualitätsstandards" [leistungen-desktop-05-y3000.png | -]
- Anordnung: Zentrierter Kopf mit Eyebrow-Pille „GARANTIE", H2 und einem ungewöhnlich
  langen dreizeiligen Lead. Darunter vier gleich breite Karten nebeneinander. Alle vier
  sind exakt gleich hoch, obwohl ihre Inhalte unterschiedlich lang sind — der Rest wird
  mit Leerraum gefüllt, und die Fußzeile jeder Karte sitzt dadurch bündig auf gleicher
  Höhe. Über jeder Karte, zentriert, eine Medaillen-Illustration, die die obere
  Kartenkante überlappt und halb darüber hinausragt.
- Buttons/Komponenten: Karten hellgrau, Radius ca. 20 px, kein Rand. Medaillen als
  farbige Illustrationen (Gold, Silber, Bronze, Grau) mit Band und Stern — die Farbe
  differenziert die Stufen und ist der einzige Ort auf der Site mit einer bewussten
  Vierfarbigkeit. Listenpunkte als dunkle gefüllte Kreise mit weißem Häkchen (ca. 18 px)
  links vor jeder Zeile — hier dunkelgrau statt grün, im Gegensatz zur Startseiten-Matrix.
  Kartenfuß: eine zentrierte Caps-Zeile in Grau ohne Kasten.
- Typo: Stufenname ca. 26 px Bold zentriert, Listenzeilen ca. 15 px Regular linksbündig
  mit Umbruch, Fußzeile ca. 11 px Caps mit Letterspacing. Verhältnis Stufenname zu
  Listenzeile grob 1,7:1 (geschätzt).
- Farbe/Fläche: Weiß mit hellgrauen Karten. Kein Grün in dieser Sektion außer im
  Sektions-Eyebrow — bemerkenswert, weil es die einzige größere Sektion ohne
  Akzent-Interaktionselement ist.
- Abstände/Rhythmus: Ca. 24 px Rinne, Innenpadding ca. 30 px, Zeilenabstand in den Listen
  ca. 16 px. Die Karten wirken dicht, die Medaillen darüber schaffen Luft.
- Mobil: einspaltig gestapelt (Serie `leistungen-mobile-*`, nicht im Detail gelesen).
- Pattern: Kandidat: Gleich hohe Stufen-Karten mit überlappender Medaillen-Grafik

### 21 — Karten-Trio mit Doppel-CTA [leistungen-desktop-05-y3000.png (oberer Rand), leistungen-desktop-08-y5250.png | -]
- Anordnung: Drei gleich breite, gleich hohe Karten nebeneinander, darunter zentriert ein
  CTA-Paar. Das Muster wiederholt sich auf der Seite mehrfach mit wechselnder
  Kartenfüllung (hellgrün getönt in `leistungen-desktop-05-y3000.png` oben, hellgrau in
  `leistungen-desktop-08-y5250.png` oben).
- Buttons/Komponenten: CTA-Paar hier mit anderer Beschriftung als sonst: „Anfragen und
  profitieren" (grüne Vollpille) plus „Direkt anrufen" (hellgraue Vollpille). Die
  Primärfarbe und Form bleiben, nur das Label wechselt — das CTA-System ist über die
  ganze Site formal konstant und nur textlich variabel.
- Typo: Kartentext ca. 15 px Regular Grau; die Überschriften liegen jeweils oberhalb des
  Slice-Rands und sind hier nicht lesbar.
- Farbe/Fläche: In `leistungen-desktop-05-y3000.png` haben die Karten eine sehr blasse
  grüne Tönung mit hellgrünem Rand — die einzige Stelle der Site mit grün getönten
  Kartenflächen. Im zweiten Vorkommen sind sie neutral grau.
- Abstände/Rhythmus: Ca. 24 px Rinne, ca. 80 px von den Karten zum CTA-Paar.
- Mobil: nicht separat geprüft.
- Pattern: `P-OFFER-PAIR` (Abweichung: drei statt zwei Karten)

### 22 — Finanzierungs-Split mit Zeitachse [leistungen-desktop-08-y5250.png | -]
- Anordnung: Zweispaltig und ungleich gewichtet. Links Eyebrow-Pille
  „FINANZIERUNGSOPTIONEN", eine zweizeilige H2 mit manuellem Umbruch nach dem Komma,
  ein dreizeiliger Absatz und das CTA-Paar. Rechts, deutlich schmaler, eine vertikale
  Kette aus drei Pillen, verbunden durch eine dicke grüne Linie — eine Mini-Zeitachse.
  Über der Kette eine Caps-Zeile als Überschrift. Die Kette ist rechtsbündig am
  Containerrand, zwischen Text und Kette bleibt eine große Lücke.
- Buttons/Komponenten: Die drei Zeit-Pillen sind weiß gefüllt mit deutlichem Schatten,
  Radius = halbe Höhe, mit einem grauen Kalender-Icon links und der Angabe rechts. Die
  Verbindungslinie ist ca. 4 px stark und grün, sie läuft hinter den Pillen durch und
  ist zwischen ihnen sichtbar. CTA-Paar linksbündig unter dem Text.
- Typo: H2 ca. 34 px Bold, zweizeilig, linksbündig — kleiner als die H2 der Startseite.
  Absatz ca. 17 px Grau. Caps-Überschrift der Kette ca. 12 px mit Letterspacing.
  Pillen-Label ca. 17 px Regular.
- Farbe/Fläche: Weiß mit dem gerasterten Hintergrundmuster (dünne Linien, sichtbar am
  linken und rechten Rand). Grün nur in der Verbindungslinie und im Primär-CTA.
- Abstände/Rhythmus: Ca. 120 px zwischen den Pillen der Kette — die Kette ist bewusst weit
  gezogen, damit die grüne Linie sichtbar bleibt. Links dagegen kompakter Textsatz.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Vertikale Pillen-Zeitachse als Bildspalte

### 23 — Google-Bewertungen [leistungen-desktop-08-y5250.png | -]
- Anordnung: Zentriert das mehrfarbige Google-Wortlogo, darunter eine Sterne-Reihe mit
  der Note daneben in einer Zeile. Darunter beginnt das zweispaltige Zitatkarten-Raster,
  identisch aufgebaut zu Sektion 12 der Startseite (gleiche Sprechblasen-Zipfel, gleiche
  farbige Initial-Avatare, gleiche orange Sterne).
- Buttons/Komponenten: Das Google-Logo ist die Original-Wortmarke in ihren vier Farben —
  ein bewusster Fremdkörper im sonst monochrom-grünen System, der als Quellenbeleg dient.
  Sterne orange, Note als Zahl rechts daneben in Bold.
- Typo: Note ca. 24 px Bold. Sonst wie Sektion 12.
- Farbe/Fläche: Weiß. Hier stehen Google-Bunt und Sterne-Orange direkt nebeneinander.
- Abstände/Rhythmus: Ca. 50 px vom Logo zur Kartenreihe.
- Mobil: nicht separat geprüft.
- Pattern: `P-PROOF-STRIP` (Abweichung: keine Leiste, sondern Logo über Kartenraster)

### 24 — Schlussbereich [leistungen-desktop-12-y7874.png | -]
- Kontakt-Split, Aktionskarte, Newsletter-Band, Standortkarte und Footer wiederholen sich
  unverändert. Siehe Sektionen 09, 14, 15, 16, 17.
- Pattern: siehe dort

## Seite: /unternehmen

### 25 — Foto-Hero, linksbündig [unternehmen-desktop-00-fold.png | unternehmen-mobile-00-fold.png]
- Anordnung: Randloses Foto über die volle Breite und weit über den Fold hinaus. Anders
  als auf `/leistungen` steht der Text hier linksbündig am Container (ca. 184 px) und
  nimmt nur die linke Hälfte ein; die rechte Hälfte bleibt dem Motiv (drei Personen).
  H1 zweizeilig, darunter ein vierzeiliger Absatz, darunter das CTA-Paar. Der Text sitzt
  vertikal etwa mittig, das Motiv wird von der Textspalte teilweise überlagert.
- Buttons/Komponenten: CTA-Paar linksbündig. Primär grün, Sekundär „Unsere Leistungen"
  weiß gefüllt mit hellem Rand — dasselbe Dunkelgrund-Verhalten wie auf `/leistungen`.
- Typo: H1 ca. 52 px Bold Weiß, zweizeilig, mit Punkten als Trennung im Satz — die
  Punkte erzeugen einen Stakkato-Rhythmus in der Zeile. Absatz ca. 17 px Weiß-Grau,
  vierzeilig und damit deutlich länger als der Lead auf `/leistungen`.
  Verhältnis H1 zu Absatz grob 3:1 (geschätzt).
- Farbe/Fläche: Kräftig grün eingefärbtes Foto (gemessen an der dunkelsten Stelle
  `#062f1d`) mit einem Verlauf, der links dunkler ist als rechts. Der grüne Wandbereich
  im Motiv selbst verstärkt den Effekt.
- Abstände/Rhythmus: Ca. 300 px von der Header-Kante zur H1, ca. 100 px vom Absatz zum
  CTA-Paar. Unter dem CTA-Paar noch ca. 150 px Foto.
- Mobil: gestapelt (`unternehmen-mobile-00-fold.png`, nicht im Detail gelesen).
- Pattern: `P-HERO-PHOTO`

### 26 — Vision-Split [unternehmen-desktop-03-y1500.png | -]
- Anordnung: Zweispaltig ohne Karte und ohne Rahmen: links nur die H2 „Unsere Vision",
  rechts ein sehr langer Fließtextblock über zwölf Zeilen. Die beiden Spalten sind oben
  bündig, aber extrem ungleich lang — links endet nach einer Zeile, rechts läuft der Text
  weiter, darunter bleibt links reine Leerfläche. Auffällig ist das Hintergrundraster:
  hier ist es kein gleichmäßiges Gitter, sondern ein unregelmäßiges Netz aus
  unterschiedlich großen Rechtecken mit diagonalen Schraffuren an den Außenrändern,
  deutlich sichtbarer als auf den anderen Seiten.
- Buttons/Komponenten: keine. Die Sektion hat weder Button noch Karte noch Icon — die
  reduzierteste Sektion der ganzen Site.
- Typo: H2 ca. 40 px Bold linksbündig. Fließtext ca. 18 px Regular mit weitem
  Zeilenabstand (ca. 30 px) — der Textblock ist bewusst luftig gesetzt und dadurch trotz
  Länge lesbar. Verhältnis H2 zu Fließtext grob 2,2:1 (geschätzt).
- Farbe/Fläche: Weiß, kein Akzent, kein Grün. Die einzige völlig farblose Sektion.
- Abstände/Rhythmus: Die Spalten stehen ca. 100 px auseinander. Nach dem Block ca. 150 px
  Luft.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Zweispaltiger Text-Split ohne Komponenten

### 27 — Zeitstrahl „Aus der Geschichte wurde" [unternehmen-desktop-03-y1500.png, unternehmen-desktop-06-y3750.png | -]
- Anordnung: Zentrierter Kopf (Eyebrow-Pille „HISTORIE", H2). Darunter eine vertikale
  Achse exakt auf der Mittelachse, an der die Jahreskarten abwechselnd rechts und links
  hängen — 2011 rechts, 2014 links, 2020/21 rechts, 2023 links. Die Jahreszahl steht
  jeweils auf der gegenüberliegenden Seite der Achse, direkt neben dem Achsenpunkt, nicht
  in der Karte. Die Achse beginnt und endet mit einem kurzen freien Stück ohne Karte.
- Buttons/Komponenten: Karten weiß mit Radius ca. 16 px und weichem Schatten, ca. 360 px
  breit. Oben in jeder Karte ein kleines grünes Glyph-Icon (Koffer, Globus, Person,
  Blitz) ohne Kasten und ohne Kreis — freistehende Icons, anders als die
  Kästchen-Icons auf der Startseite. Die Achse ist eine dünne graue Linie, die
  Anschlusspunkte sind sehr kleine graue Kreise, nicht grün — der Zeitstrahl selbst trägt
  keinen Akzent.
- Typo: Karten-H3 ca. 22 px Bold, Listenzeilen ca. 15 px Regular Grau, eingeleitet durch
  einen Mittelpunkt statt eines Bullets. Jahreszahl ca. 14 px Regular Grau, unauffällig.
- Farbe/Fläche: Weiß, Grün ausschließlich in den vier Icons.
- Abstände/Rhythmus: Ca. 250 px vertikal zwischen den Achsenpunkten, dadurch ein sehr
  gestreckter, ruhiger Ablauf über zwei volle Slices.
- Mobil: nicht separat geprüft; der Wechsel links/rechts dürfte entfallen.
- Pattern: Kandidat: Alternierender Zeitstrahl mit freistehenden Icons

### 28 — Team-Raster [unternehmen-desktop-06-y3750.png | -]
- Identisch zu Sektion 11 der Startseite, gleiche Karten, gleiches 1-groß-plus-2-klein-
  Raster, gleiches überlappendes Badge, gleicher einzelner CTA auf der Gründer-Karte.
  Siehe Sektion 11.
- Pattern: `P-TEAM`

### 29 — Medien „Der JANtronic Song auf Youtube" [unternehmen-desktop-09-y6000.png | -]
- Anordnung: Kopf linksbündig am Container (Eyebrow-Pille „MEDIEN" über H2), darunter zwei
  gleich große Video-Thumbnails nebeneinander, die zusammen die Containerbreite füllen.
  Darunter zentriert das CTA-Paar — Kopf links, Buttons mittig, das ist innerhalb einer
  Sektion inkonsistent ausgerichtet.
- Buttons/Komponenten: Die Thumbnails sind eingebettete YouTube-Player im Ruhezustand mit
  originaler YouTube-Chrome: runder Kanal-Avatar oben links, Kanalname und Handle
  daneben in Weiß, roter YouTube-Play-Button mittig, Teilen-Pfeil unten links, „Ansehen
  auf YouTube" mit YouTube-Wortmarke unten rechts. Ecken mit Radius ca. 12 px. CTA-Paar
  „Zum Kanal" (grün) plus „Kontakt" (hellgrau) — der Sekundär-Button ist hier auffällig
  kurz, das Paar wirkt dadurch ungleich breit.
- Typo: H2 ca. 34 px Bold linksbündig — kleiner als die zentrierten H2 der Startseite.
  Die Typo in den Thumbnails ist YouTube-eigen und nicht Teil des Systems.
- Farbe/Fläche: Weiß, die Thumbnails sind dunkel mit grünem Platinen-Motiv und gelber
  Schrift. YouTube-Rot ist die Fremdfarbe dieser Sektion.
- Abstände/Rhythmus: Ca. 24 px zwischen den Thumbnails, ca. 70 px zum CTA-Paar, danach
  ca. 250 px Luft.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Eingebettete Video-Thumbnails mit Plattform-Chrome

### 30 — Benefit-Karte „Worauf Sie bei uns zählen können" [unternehmen-desktop-09-y6000.png | -]
- Anordnung: Große hellgraue Karte im Container mit zentrierter zweizeiliger H2. Darunter
  eine linksbündige Liste aus Chips, deren Breite dem Text folgt — wie in Sektion 13,
  aber auf hellem statt dunklem Grund. Der erste Chip ist zweizeilig und dadurch deutlich
  breiter als die folgenden, die Liste verjüngt sich nach unten und bildet eine
  treppenartige rechte Kante.
- Buttons/Komponenten: Chips als weiße Pillen mit Schatten und grünem Pfeil-Icon links.
  Kein CTA innerhalb des sichtbaren Bereichs.
- Typo: H2 ca. 40 px Bold zentriert. In den Chips Stichwort Semibold, Rest Regular
  Grau — gleiche Binnenhierarchie wie Sektion 13.
- Farbe/Fläche: Karte in sehr hellem Grau (Radius ca. 24 px) auf Weiß. Grün nur in den
  Pfeilen. Das ist die helle Zwillingsvariante von Sektion 13.
- Abstände/Rhythmus: Ca. 90 px von der Kartenkante zur H2, ca. 12 px zwischen den Chips —
  dicht gestapelt.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Benefit-Chip-Liste mit ausgefranster Kante (hell)

### 31 — Schlussbereich [unternehmen-desktop-17-y11339.png | -]
- Kontakt-Split, Aktionskarte, Newsletter-Band, Standortkarte und Footer wie auf der
  Startseite. Siehe Sektionen 09, 14, 15, 16, 17.
- Pattern: siehe dort

## Seite: /hersteller

### 32 — Text-Hero ohne Foto [hersteller-desktop-00-fold.png | hersteller-mobile-00-fold.png]
- Anordnung: Der einzige Unterseiten-Hero ohne Bild und der einzige linksbündige
  Text-Hero der Site. H1 linksbündig ab ca. 120 px, darunter zwei Absatzblöcke,
  darunter das CTA-Paar linksbündig. Die Textspalte endet bei ca. 910 px, rechts bleibt
  gut ein Drittel der Breite komplett leer — kein Bild, keine Grafik, nur das blasse
  Hintergrundraster. Diese leere rechte Hälfte ist das prägende Merkmal der Sektion.
  Das Raster ist hier stärker sichtbar als anderswo: mehrere lange horizontale und
  vertikale Linien queren die Fläche und schneiden durch den Text hindurch.
- Buttons/Komponenten: CTA-Paar linksbündig, „Bedarf senden" grün gefüllt plus „Kontakt
  aufnehmen" hellgrau gefüllt. Unter dem Fold zentriert eine Eyebrow-Pille „HERSTELLER",
  die bereits zur nächsten Sektion gehört.
- Typo: H1 ca. 44 px Bold dunkel — kleiner als die Foto-Hero-H1 der anderen Unterseiten.
  Absätze ca. 17 px Regular Grau, der erste dreizeilig mit harten Umbrüchen nach jedem
  Satz, der zweite als geschlossener Block über sechs Zeilen. Der Wechsel von
  Zeilenumbruch-Satz zu Fließsatz innerhalb desselben Blocks ist sichtbar.
- Farbe/Fläche: Weiß, hell, kein Foto, kein Dunkelbereich. Grün nur im Primär-CTA und in
  der Eyebrow-Pille darunter.
- Abstände/Rhythmus: Ca. 160 px von der Header-Kante zur H1, ca. 80 px vom zweiten Absatz
  zum CTA-Paar, danach ca. 190 px bis zur Eyebrow.
- Mobil: nicht separat geprüft (`hersteller-mobile-00-fold.png` liegt vor).
- Pattern: Kandidat: Linksbündiger Text-Hero mit leerer Bildhälfte

### 33 — Hersteller-Raster „Unsere Hersteller" [hersteller-desktop-02-y750.png | -]
- Anordnung: Zentrierter Kopf, darunter zuerst zwei breite Broschüren-Karten
  nebeneinander (je halbe Containerbreite), dann ein sechsspaltiges Raster aus über
  fünfzig kleinen Marken-Kärtchen über neun Zeilen. Die letzte Zeile ist unvollständig
  gefüllt und bricht linksbündig ab. Darunter zentriert das CTA-Paar. Die Dichte
  dieses Rasters steht im deutlichen Gegensatz zum leeren Hero darüber.
- Buttons/Komponenten: Marken-Kärtchen sind weiße Pillen-Rechtecke mit Radius ca. 10 px
  und leichtem Schatten: Markenname links, ein grüner Kreis mit weißem Häkchen rechts,
  vertikal zentriert. Kärtchen mit langem Namen brechen zweizeilig und werden dadurch
  höher als ihre Nachbarn — die Zeilen sind nicht auf gleiche Höhe gezwungen, das Raster
  ist leicht unruhig. Die Broschüren-Karten oben tragen links ein echtes Hersteller-Logo
  (Coilmaster blau, Chiefcron grün), darüber eine Caps-Zeile „BROSCHÜRE", darunter den
  Namen fett, und rechts ein grünes Download-Icon.
- Typo: H2 ca. 40 px Bold zentriert. Markennamen ca. 15 px Regular. Caps-Zeile ca. 11 px
  mit Letterspacing, Broschürenname ca. 18 px Semibold.
- Farbe/Fläche: Weiß, das Grün wiederholt sich über fünfzig Mal in den Häkchen-Kreisen —
  die Sektion mit der höchsten Akzentdichte der ganzen Site.
- Abstände/Rhythmus: Ca. 12 px Rinne zwischen den Kärtchen, sehr dicht. Ca. 60 px vom
  Raster zum CTA-Paar.
- Mobil: nicht separat geprüft (Serie `hersteller-mobile-*`).
- Pattern: Kandidat: Dichtes Marken-Raster mit Häkchen-Chips

### 34 — Broschüren-Filter „Weitere Hersteller" [hersteller-desktop-04-y2250.png | -]
- Anordnung: Oben eine Reihe aus drei Filter-Karten nebeneinander, darunter ein
  dreispaltiges Raster aus Download-Karten (hier elf Stück über vier Zeilen, die letzte
  Zeile unvollständig). Der Zusammenhang ist über die Marken-Kürzel in den Karten
  hergestellt: der aktive Filter „DARFON" färbt das Raster, alle sichtbaren Karten tragen
  das Label DARFON.
- Buttons/Komponenten: Die drei Filter sind Karten mit Radius ca. 12 px, weiß, mit einem
  Auswahl-Indikator links: aktiv = grün gefüllter Kreis mit weißem Häkchen, inaktiv =
  leerer grauer Ring. Daneben das echte Hersteller-Logo (Darfon rot, Lelon rot, Viking
  blau) und rechts der Name in Caps. Die aktive Karte ist zusätzlich einen Tick größer
  und stärker beschattet. Die Download-Karten sind weiße Rechtecke mit Caps-Marke oben,
  Titel fett darunter (bis zu zweizeilig) und einem grünen Download-Icon rechts, vertikal
  zentriert. Karten mit zweizeiligem Titel werden höher, wieder ohne Höhenausgleich.
- Typo: Caps-Marke ca. 11 px mit Letterspacing Grau, Titel ca. 17 px Semibold dunkel.
  Filter-Label ca. 13 px Caps Semibold.
- Farbe/Fläche: Weiß. Die Hersteller-Logos bringen Rot und Blau als Fremdfarben herein,
  neutralisiert durch das Weiß der Karten.
- Abstände/Rhythmus: Ca. 20 px Rinne, ca. 60 px zwischen Filterreihe und Raster.
- Mobil: nicht separat geprüft.
- Pattern: Kandidat: Radio-Filterleiste über Download-Kartenraster

### 35 — Aktionskarte mit Leiterbahn-Grafik [hersteller-desktop-04-y2250.png | -]
- Anordnung: Wie Sektion 14, hier aber vollständig im Bild: die Karte ist quadratischer,
  in ihrer oberen Hälfte sitzt zentriert das große grüne Chip-Icon, von dem gestrichelte
  grüne Bahnen nach links und rechts jeweils dreifach auslaufen (eine gerade, zwei
  diagonal nach oben und unten) und in massiven grauen Strichen enden. Darunter H2,
  Subline, CTA-Paar, alles zentriert.
- Buttons/Komponenten: Das Chip-Icon ist ein grün gefülltes Quadrat mit Radius ca. 18 px
  und weißem Mikrochip-Glyph, umgeben von einem grauen Rahmen mit gestrichelter Kontur.
  Die Bahnen bestehen aus abwechselnd grünen und grauen Strichsegmenten — Grün dominiert
  nahe am Chip, Grau außen, was einen Fluss von innen nach außen suggeriert. CTA-Paar wie
  überall.
- Typo: H2 ca. 40 px Bold zweizeilig zentriert, Subline ca. 17 px Grau zweizeilig.
- Farbe/Fläche: Sehr helle graue Karte, Radius ca. 24 px. Die Leiterbahn ist die
  auffälligste Akzentgrafik der Site.
- Abstände/Rhythmus: Ca. 170 px vom Chip zur H2, Kartenpadding oben ca. 100 px.
- Mobil: nicht separat geprüft.
- Pattern: `P-CTA-MID` (Vollansicht der Sektion 14)

### 36 — Schlussbereich [hersteller-desktop-06-y3084.png | -]
- Kontakt-Split, Newsletter-Band, Standortkarte und Footer wie auf der Startseite.
  Siehe Sektionen 09, 15, 16, 17.
- Pattern: siehe dort

## Seite: /kontakt

### 37 — Kontakt-Split als Seiteneinstieg [kontakt-desktop-00-fold.png | kontakt-mobile-00-fold.png]
- Anordnung: Diese Seite hat keinen Hero — der Kontakt-Split aus Sektion 09 rückt direkt
  unter die Header-Leiste und wird selbst zum Einstieg. Links Eyebrow-Pille, H2, Absatz;
  rechts die gerasterte Hellfläche mit der weißen Formularkarte. Ergänzung gegenüber der
  Startseite: unter dem linken Textblock, mit ca. 250 px Abstand, ein statischer
  Kartenausschnitt als eigenes Bild mit Radius ca. 8 px, ca. 485 px breit — deutlich
  kleiner als die Textspalte und linksbündig darunter gesetzt. Der Kartenausschnitt ist
  farbig (Straßen gelb/weiß, Grünflächen grün) und damit anders behandelt als die
  entsättigte Leaflet-Karte im Footerbereich; der Marker ist ein roter Pin statt eines
  grünen Punkts. Zwei Kartendarstellungen mit gegensätzlicher Behandlung auf derselben
  Seite.
- Buttons/Komponenten: Formular wie Sektion 09 mit fünf Feldern, Pflicht-Sternchen und
  eckigen Feldern. Zusätzlich hier vollständig sichtbar: ein Einwilligungs-Schalter für
  Werbe-Mails, dargestellt als kleiner runder Toggle/Radio in Grau (nicht als
  Checkbox-Quadrat), links neben einem dreizeiligen Kleintext. Darunter ein zweizeiliger
  Rechtshinweis mit unterstrichenem Link „Datenschutzerklärung" — die einzige
  unterstrichene Textstelle der Site. Submit „Jetzt Anfragen" als grüne Vollpille,
  linksbündig, nicht volle Breite.
- Typo: H2 ca. 44 px Bold zweizeilig. Feld-Labels ca. 14 px Medium, Platzhalter Grau.
  Einwilligungs- und Rechtstext ca. 13 px Regular Grau — die kleinste Textgröße der Site.
- Farbe/Fläche: Links Weiß, rechts die gerasterte Hellfläche. Rot erscheint zweimal: in
  den Pflicht-Sternchen und im Kartenmarker.
- Abstände/Rhythmus: Ca. 20 px zwischen den Feldern, ca. 25 px vom Textarea zum
  Einwilligungsblock, ca. 30 px zum Submit. Links dagegen große Leere zwischen Absatz und
  Kartenbild.
- Mobil: gestapelt (`kontakt-mobile-00-fold.png`, nicht im Detail gelesen).
- Pattern: `P-CONTACT`

### 38 — Schlussbereich [kontakt-desktop-02-y357.png | -]
- Diese Seite ist mit drei Desktop-Slices die kürzeste der Site. Unter dem Split folgen
  Standortkarte und Footer wie überall. Siehe Sektionen 16 und 17.
- Pattern: siehe dort

## Seite: /news

### 39 — Magazin-Kopf [news-desktop-00-fold.png | news-mobile-00-fold.png]
- Anordnung: Kein Foto-Hero, kein Dunkelbereich — die Seite startet als reine
  Textzeile auf Weiß. Eyebrow-Pille und H1 stehen linksbündig am Container
  (Pille ab ca. 250 px), nicht zentriert wie auf der Startseite. Die H1 ist einzeilig
  und bleibt allein: es gibt keine Subline, keinen Lead und kein CTA-Paar unter der
  Überschrift. Danach setzt ohne Zwischenelement direkt das Kartenraster an. Von den
  Unterseiten-Einstiegen ist dies der knappste; verglichen mit
  `hersteller-desktop-00-fold.png` (ebenfalls textlich, aber mit zwei Absätzen und
  CTA-Paar) fehlt hier jede Zusatzebene.
- Buttons/Komponenten: Kein Button im gesamten Kopf. Einziges Bauteil ist die
  Eyebrow-Pille „NEWSLETTER" — Fläche `#ebf5f0`, Text `#007c43` (beides Pixelmessung in
  `news-desktop-00-fold.png`). Bemerkenswert ist die Beschriftung: die Pille sagt
  „NEWSLETTER", die Seite ist aber das News-Archiv; Label und Seiteninhalt gehen
  auseinander.
- Typo: H1 „Die neuesten Insights" ca. 46 px Bold in `#1c1c1e` (gemessen), einzeilig,
  linksbündig — kleiner als die Foto-Hero-H1 auf `leistungen-desktop-00-fold.png`
  (ca. 56 px) und als die Startseiten-H1. Eyebrow ca. 13 px Caps mit deutlichem
  Letterspacing.
- Farbe/Fläche: Reines Weiß, `#ffffff` mit 83,8 % Anteil am Fold (gemessen in
  `news-desktop-00-fold.png`), zweitstärkster Wert ist das Textschwarz `#1c1c1e` mit
  1,6 %. Grün erscheint ausschließlich in der Eyebrow-Pille und im Header-CTA. Der
  blasse Rasterhintergrund der übrigen Seiten ist hier im Kopfbereich nicht sichtbar.
- Abstände/Rhythmus: Ca. 130 px von der Header-Kante zur Eyebrow-Pille, ca. 45 px von
  der Pille zur H1, ca. 90 px von der H1 zur ersten Kartenzeile. Der Kopf beansprucht
  damit nur rund ein Drittel des Folds, den Rest übernimmt bereits das Raster — ein
  bewusst kurzer Einstieg zugunsten der Liste.
- Mobil: gleiche Reihenfolge, aber zentriert statt linksbündig
  (`news-mobile-00-fold.png`): die Eyebrow-Pille zieht sich über die volle
  Container-Breite und ihr Text sitzt mittig, die H1 ist ebenfalls mittig gesetzt und
  bleibt einzeilig bei ca. 30 px. Der Wechsel von links (Desktop) auf zentriert (Mobil)
  ist eine echte Ausrichtungsänderung, keine bloße Umbruchfolge.
- Pattern: Kandidat: Magazin-Kopf ohne Lead und ohne CTA

### 40 — Artikel-Raster, zweispaltig versetzt [news-desktop-00-fold.png, news-desktop-02-y750.png | news-mobile-05-y1688.png]
- Anordnung: Zweispaltiges Kartenraster über neun Zeilen bis
  `news-desktop-12-y7608.png`. Die beiden Spalten laufen nicht synchron, sondern
  gegeneinander versetzt: in `news-desktop-00-fold.png` beginnt die linke Karte bei
  ca. y 375, die rechte etwas höher, und in `news-desktop-02-y750.png` sind die
  Kartenkanten der beiden Spalten durchgehend auf unterschiedlicher Höhe. Der Versatz
  entsteht nicht durch Absicht in der Anordnung, sondern durch ungleiche Kartenhöhen —
  die Karten werden nicht auf gleiche Höhe gezwungen. Das ist derselbe Masonry-Effekt
  wie bei den Kundenstimmen in Sektion 12, hier aber über die ganze Seitenlänge.
- Buttons/Komponenten: Karten ohne jeden Button, ohne „Weiterlesen"-Link und ohne
  Pfeil-Affordanz — die gesamte Karte ist die Klickfläche, sichtbar signalisiert wird
  das nicht. Die Karten haben zwei Bauformen, die im selben Raster gemischt sind:
  (a) Text-Karte ohne Bild, nur Datum und Titel, z. B. die beiden ersten in
  `news-desktop-00-fold.png`; (b) Bild-Karte mit randabfallendem Foto im oberen
  Kartendrittel, darunter Datum und Titel, z. B. die Wafer- und FPGA-Karten in
  `news-desktop-02-y750.png`. Beide Bauformen stehen unmittelbar nebeneinander, das
  Raster ist dadurch optisch uneinheitlich. Kartenfüllung ist reines `#ffffff`
  (gemessen, 100 % in einer leeren Kartenfläche von `news-desktop-00-fold.png`) auf
  einem minimal abgesetzten Grund `#fcfcfc` (gemessen im Zwischenraum) — die Karten
  heben sich fast ausschließlich über Radius (ca. 16 px, geschätzt) und einen sehr
  weichen Schatten ab, nicht über Farbe. Einzelne Titel tragen ein Emoji als erstes
  Zeichen (Rakete bei „Neue Speichertechnologie…", Sprechblase bei „Wenn der Markt erst
  leergekauft ist…", beide in `news-desktop-02-y750.png`) sowie eine blaue Raute bei
  „JANtronic erneut nach ISO 9001 zertifiziert…" — die Emojis sitzen im Titel selbst und
  sind kein Icon-System.
- Typo: Datum ca. 14 px Regular in `#5e5e5f` (gemessen), über dem Titel stehend.
  Karten-Titel ca. 22 px Bold in `#1c1c1e` (gemessen), bis zu vierzeilig umbrechend.
  Nur zwei Stufen pro Karte, kein Teaser-Text, keine Kategorie, keine Autorenzeile.
  Auffällig: die Bild-Karten in `news-desktop-02-y750.png` zeigen das Datum teils über,
  teils gar nicht — die rechte Karte „KI-Chips sind stark – aber nur so gut wie ihr
  Test" und die rechte Karte „Elektronikdistribution 2026…" in
  `news-desktop-00-fold.png` tragen keine Datumszeile, ihre Nachbarn dagegen schon. Die
  Feldbelegung ist also nicht durchgängig gepflegt.
- Farbe/Fläche: Weiß auf Weiß. Die einzige Farbe im gesamten Raster kommt aus den
  Artikelbildern selbst (Gold des Wafers, Cyan der FPGA-Grafik in
  `news-desktop-02-y750.png`). Kein Grün, kein Akzent, keine Hover-Marke — das Raster ist
  der farbloseste große Bereich der Site nach dem Vision-Split (Sektion 26).
- Abstände/Rhythmus: Ca. 20 px Rinne zwischen den Spalten, ca. 24 px zwischen den
  Kartenzeilen, Innenpadding ca. 28 px. Die Text-Karten haben unter dem Titel viel
  ungenutzten Weißraum (in `news-desktop-00-fold.png` bei der rechten Karte über 100 px),
  weil die Kartenhöhe offenbar an der Nachbarkarte hängt — der Leerraum ist Nebenprodukt,
  nicht Gestaltung.
- Mobil: einspaltig, Versatz entfällt vollständig (`news-mobile-05-y1688.png`). Die
  Bauform-Mischung bleibt: eine reine Text-Karte („Neue Speichertechnologie macht
  KI-Chips deutlich effizienter") steht direkt über einer Bild-Karte („KI-Chips sind
  stark…"), beide volle Containerbreite. Das Bild sitzt weiterhin oben in der Karte und
  läuft randabfallend bis an die Kartenkanten. Titel brechen auf drei bis vier Zeilen.
- Pattern: Kandidat: Gemischtes Magazin-Raster aus Text- und Bildkarten ohne CTA

### 41 — Schlussbereich [news-desktop-12-y7608.png | -]
- Aktionskarte mit Leiterbahn-Grafik und Footer wie auf den übrigen Seiten. In
  `news-desktop-12-y7608.png` ist die Aktionskarte vollständig im Bild und bestätigt den
  Aufbau aus Sektion 35: zentrales grünes Chip-Icon, sechs gestrichelte Bahnen nach
  links und rechts, darunter zweizeilige H2 „Sprich mit uns oder frage direkt an",
  Subline und das CTA-Paar „Bedarf senden" (grün) plus „Kontakt aufnehmen" (hellgrau).
  Anders als auf `/` und `/leistungen` fehlen hier Kontakt-Split, Newsletter-Band und
  Standortkarte — die Seite geht von der Aktionskarte direkt in den Footer. Siehe
  Sektionen 35 und 17.
- Pattern: siehe dort

## Seite: /news/was-kostet-ein-produktionsstillstand

### 42 — Artikel-Kopf [news__was-kostet-ein-produktionsstillstand-desktop-00-fold.png | news__was-kostet-ein-produktionsstillstand-mobile-01-y0.png]
- Anordnung: Einspaltiger Lesekopf, linksbündig ab ca. 270 px. Reihenfolge Datum, H1,
  Titelbild — das Datum steht über der Überschrift, nicht darunter. Das Titelbild ist
  breiter als die Textspalte (ca. 270 px bis 1170 px) und ca. 590 px hoch, mit Radius
  ca. 16 px (geschätzt). Es gibt keine Rubrik, keinen Teaser, keine Lesezeit und keine
  Zurück-Navigation zum Archiv. Im Hintergrund liegt hier wieder das blasse
  Linienraster, in `news__was-kostet-ein-produktionsstillstand-desktop-00-fold.png` links
  und rechts der Textspalte als lange horizontale und diagonale Linien deutlich sichtbar
  — anders als auf `/news`, wo der Kopf rasterfrei ist.
- Buttons/Komponenten: Keine. Der gesamte Artikel-Kopf trägt kein einziges
  Interaktionselement außer der globalen Header-Leiste.
- Typo: Datum „November 11, 2025" ca. 16 px Regular in `#5e5e5f` (gemessen) — auffällig
  ist das englische Datumsformat auf einer sonst durchgehend deutschen Seite, während
  das Raster auf `/news` deutsches Format „21.07.2026" nutzt
  (`news-desktop-00-fold.png`); zwei Formate für dasselbe Feld. H1 ca. 52 px Bold in
  `#1c1c1e` (gemessen), einzeilig.
- Farbe/Fläche: Weiß, `#ffffff` mit 90,8 % Anteil in einer leeren Randfläche des Folds
  (gemessen). Kein Grün außer im Header-CTA, kein Dunkelbereich. Die einzige Farbe im
  Fold liefert das Foto (Orange des Gabelstaplers).
- Abstände/Rhythmus: Ca. 70 px von der Header-Kante zum Datum, ca. 30 px vom Datum zur
  H1, ca. 60 px von der H1 zum Titelbild. Der Kopf ist dicht gesetzt, im Gegensatz zu den
  luftigen Sektionsköpfen der Startseite.
- Mobil: Die H1 wird nicht umbrochen, sondern rechts abgeschnitten —
  in `news__was-kostet-ein-produktionsstillstand-mobile-01-y0.png` steht
  „Produktionsstills" mit hart am Viewportrand endender Zeile, das Wortende ist nicht
  lesbar. Das ist derselbe horizontale Overflow wie bei der Bullet-Zeile im
  Startseiten-Hero (Sektion 02) und der zweite belegte Fall auf der Site. Das Titelbild
  darunter passt sich korrekt der Containerbreite an.
- Pattern: Kandidat: Schlichter Artikel-Kopf mit Datum über H1

### 43 — Artikel-Fließtext [news__was-kostet-ein-produktionsstillstand-desktop-02-y750.png | news__was-kostet-ein-produktionsstillstand-mobile-01-y0.png]
- Anordnung: Eine einzige Textspalte, linksbündig ab ca. 270 px, Zeilenlänge bis
  ca. 1050 px — mit rund 780 px deutlich breiter als eine typische Lesespalte. Rechts
  daneben bleibt über die gesamte Artikellänge leere Fläche mit dem Hintergrundraster;
  es gibt keine Seitenleiste, kein Inhaltsverzeichnis, keine Teilen-Leiste. Der Artikel
  endet mit einer Autorenzeile und geht danach direkt ins Newsletter-Band über.
- Buttons/Komponenten: Im gesamten Textkörper kein Button, kein Chip, kein Callout und
  keine Karte — der Artikel ist reines Markup ohne Komponenten. Einzige strukturierende
  Elemente sind eine ungeordnete Liste mit vier Punkten (klassische runde Bullets in
  Dunkelgrau, kein grünes Häkchen wie in Sektion 20) und die Autorenzeile am Fuß: runder
  Avatar ca. 24 px, daneben „von" Regular plus „Jan Pucko" Bold. Der Avatar ist der
  kleinste Personenanschnitt der Site.
- Typo: Fließtext ca. 17 px Regular in Dunkelgrau. Der Text arbeitet stark mit fetten
  Einleitungszeilen („Wenn nichts mehr läuft, zählt nur noch eins: Wer liefert.",
  „Fakt ist:", „Deshalb liefern wir:") als Mikro-Zwischenüberschriften im selben Grad
  wie der Fließtext — es gibt keine echte H2-Ebene im Artikel, die Hierarchie entsteht
  allein über Fettung. Ein Zitat ist kursiv gesetzt („Mit freien Distributoren haben wir
  früher zu viel bezahlt."), ohne Anführungsstrich-Grafik und ohne Einzug. Kursiv kommt
  sonst nirgends auf der Site vor.
- Farbe/Fläche: Weiß, keinerlei Akzentfarbe im gesamten Textkörper — auch die fetten
  Einleitungszeilen bleiben dunkelgrau statt grün. Das steht im Gegensatz zur Startseite,
  wo das Wort „Lösung:" grün als Lesehilfe dient (Sektion 08).
- Abstände/Rhythmus: Ca. 26 px zwischen den Absatzblöcken, Listenzeilen ca. 25 px. Vom
  Textende zur Autorenzeile ca. 70 px, von der Autorenzeile zur Kante des
  Newsletter-Bands ca. 110 px.
- Mobil: einspaltig auf Containerbreite
  (`news__was-kostet-ein-produktionsstillstand-mobile-01-y0.png`), Fettungen und
  Kursivsatz bleiben erhalten, Zeilen brechen früher. Der Textkörper ist hier korrekt
  gesetzt — das Overflow-Problem betrifft nur die H1 aus Sektion 42.
- Pattern: Kandidat: Komponentenloser Artikel-Body mit Fettungs-Hierarchie

### 44 — Schlussbereich [news__was-kostet-ein-produktionsstillstand-desktop-02-y750.png | -]
- Newsletter-Band auf Foto und Footer wie auf der Startseite. Im Slice
  `news__was-kostet-ein-produktionsstillstand-desktop-02-y750.png` ist das Band
  vollständig sichtbar und bestätigt Sektion 15: randlos über die volle Breite, Text
  linksbündig am äußeren Viewportrand ab ca. 44 px, H2 „Melde dich für unseren
  Newsletter an" zweizeilig in Weiß, zweizeilige Subline, darunter genau ein CTA
  „Jetzt anmelden" als grüne Vollpille. Kontakt-Split, Aktionskarte und Standortkarte
  entfallen auf dieser Seite. Siehe Sektionen 15 und 17.
- Pattern: siehe dort

## Seite: /newsletter-anmeldung

### 45 — Anmelde-Split mit mehrstufigem Formular [newsletter-anmeldung-desktop-00-fold.png, newsletter-anmeldung-desktop-01-y0.png | newsletter-anmeldung-mobile-00-fold.png, newsletter-anmeldung-mobile-02-y422.png]
- Anordnung: Zweispaltiger Split ohne Hero, direkt unter der Header-Leiste — dieselbe
  Grundfigur wie der Kontakt-Split (Sektion 37), aber mit umfangreicherem Formular.
  Links Eyebrow-Pille, zweizeilige H2 und dreizeiliger Absatz; rechts auf einer eigenen
  gerasterten Hellfläche die weiße Formularkarte. Die linke Spalte endet nach dem Absatz,
  darunter bleiben rund 500 px leer, bis am unteren Ende zwei Kontaktkacheln stehen
  (`newsletter-anmeldung-desktop-01-y0.png`) — die Spalte ist oben und unten belegt, in
  der Mitte leer. Die Formularkarte reicht deutlich über den Fold hinaus und ist erst in
  `newsletter-anmeldung-desktop-01-y0.png` vollständig sichtbar. Die Rasterfläche rechts
  läuft bis an den rechten Viewportrand und über die Karte hinaus nach unten.
- Buttons/Komponenten: Das reichhaltigste Formular der Site, in drei benannte Gruppen
  geteilt („WOHIN SOLL DER NEWSLETTER GEHEN?", „UNTERNEHMENSANGABEN", „INTERESSEN") —
  Gruppenüberschriften gibt es sonst in keinem Formular der Site, das Kontaktformular in
  Sektion 37 hat keine. Feldtypen im Detail:
  Volle Breite mit Pflichtstern („E-Mail Adresse", „Voller Name", „Unternehmensname"),
  danach vier halbbreite Felder in zwei Zeilen („Branche"/„Position",
  „Mitarbeiterzahl"/„Land") — der Wechsel von voller auf halbe Feldbreite gliedert die
  Gruppe optisch. Felder sind weiße Rechtecke mit dünner grauer Kontur und Radius
  ca. 8 px (geschätzt), Höhe ca. 46 px, Platzhalter in Grau; wie in Sektion 09 bricht
  hier das Pillen-System zugunsten eckiger Felder. Die Interessen sind sechs Kästchen in
  zwei Spalten: jedes ist eine eigene umrandete Box in Feldoptik mit einer echten
  quadratischen Checkbox links und Label rechts — im Gegensatz zum runden
  Einwilligungs-Toggle auf `/kontakt` (Sektion 37) sind das erstmals eckige Checkboxen,
  die Site nutzt also beide Formen. Unter den Interessen ein runder Einwilligungs-Toggle
  in Grau mit dreizeiligem Kleintext und unterstrichenem Link „Datenschutzerklärung" —
  identisch zum Muster in Sektion 37. Submit „Jetzt Anmelden" ist eine grüne Vollpille
  (gemessen `#009755` bei 930/891 in `newsletter-anmeldung-desktop-01-y0.png`),
  linksbündig unter dem Formular, nicht volle Breite. Die beiden Kontaktkacheln links
  unten sind eine eigene Komponente, die es sonst nirgends gibt: weiße Rechtecke mit
  Radius ca. 12 px und dünner Kontur, innen zweizeilig — oben eine graue Caps-Zeile
  („DIREKT ANRUFEN", „VIDEOCALL VEREINBAREN"), darunter ein Icon plus Wert
  („+49 170 2968367" bzw. „Calendly"). Zwei nebeneinanderstehende Kacheln, keine
  Buttons, aber offensichtlich klickbar.
- Typo: H2 „Melde dich für unseren Newsletter an" ca. 44 px Bold zweizeilig,
  linksbündig. Absatz ca. 17 px Regular Grau, dreizeilig. Gruppenüberschriften ca. 12 px
  Caps mit Letterspacing in Grün, gemessen `#007c43` (dunkelster Textwert in
  `newsletter-anmeldung-desktop-01-y0.png`) — grüne Caps als Formular-Gliederung ist ein
  Typo-Einsatz, den es sonst auf der Site nicht gibt. Feld-Labels ca. 14 px Medium
  dunkel, Pflichtstern in Rot (gemessen `#f42a2a`). Checkbox-Labels ca. 15 px Regular.
  Kontaktkachel-Caps ca. 11 px, Wert ca. 15 px Medium.
- Farbe/Fläche: Links Weiß, rechts die gerasterte Hellfläche `#f9f9f9` (gemessen, 95,0 %
  Anteil in einer leeren Rasterzone) mit sichtbaren feinen Rechtecklinien; darauf die
  Formularkarte in reinem `#ffffff` (gemessen, 100 % in einer leeren Kartenfläche).
  Derselbe dreistufige Aufbau Karte-auf-Fläche-auf-Fläche wie in Sektion 09. Grün tritt
  an drei Stellen auf: Eyebrow-Pille, die drei Gruppenüberschriften und der Submit. Rot
  nur in den Pflichtsternen.
- Abstände/Rhythmus: Ca. 20 px zwischen den Feldern, ca. 8 px zwischen Label und Feld,
  ca. 30 px zwischen den Feldgruppen — die Gruppenabstände sind nur unwesentlich größer
  als die Feldabstände, die Gliederung trägt deshalb hauptsächlich die grüne Caps-Zeile,
  nicht der Weißraum. Vom letzten Interessen-Kästchen zum Einwilligungsblock ca. 25 px,
  von dort zum Submit ca. 25 px.
- Mobil: gestapelt, Text über Formular (`newsletter-anmeldung-mobile-00-fold.png`). Wie
  auf `/news` wechselt die Ausrichtung: Eyebrow-Pille zieht auf volle Breite mit
  zentriertem Text, H2 und Absatz stehen zentriert statt linksbündig. Die Formularkarte
  beginnt noch im Fold und ragt über die Rasterfläche hinaus, deren obere Kante als
  eigene helle Stufe hinter der Karte sichtbar bleibt. Im Formular selbst
  (`newsletter-anmeldung-mobile-02-y422.png`) bleiben die halbbreiten Felderpaare
  „Branche"/„Position" und „Mitarbeiterzahl"/„Land" nebeneinander statt zu stapeln,
  während die sechs Interessen-Kästchen von zwei Spalten auf eine einzige umbrechen —
  zwei unterschiedliche Umbruchentscheidungen innerhalb desselben Formulars. Die
  Feldbeschriftungen bleiben linksbündig, obwohl der Kopf zentriert ist.
- Pattern: `P-CONTACT` (Abweichung: gruppiertes Formular mit Checkbox-Matrix statt
  fünf Feldern)

### 46 — Schlussbereich [newsletter-anmeldung-desktop-01-y0.png | -]
- Direkt unter dem Split folgt der Footer, vollständig sichtbar in
  `newsletter-anmeldung-desktop-01-y0.png`. Kontakt-Split, Aktionskarte,
  Newsletter-Band und Standortkarte entfallen — bei einer Seite, die selbst die
  Newsletter-Anmeldung ist, würde das Newsletter-Band doppeln. Mit zwei Desktop-Slices
  ist dies nach `/kontakt` die zweitkürzeste Seite der Site. Siehe Sektion 17.
- Pattern: siehe dort

## Nicht erfasst

Die Routen-Discovery lief über die Startseiten- und Footer-Navigation sowie einen
Crawl aller gefundenen Seiten. Eine Sitemap steht nicht zur Verfügung:
`https://www.jantronic.com/sitemap.xml`, `/sitemap_index.xml`, `/sitemap-index.xml` und
`/sitemap.xml.gz` liefern alle die Webflow-404-Seite, `/robots.txt` antwortet mit
Status 200 und leerem Body. Die Navigation führt genau acht Seiten plus das
News-Detail-Template.

- `/impressum`, `/datenschutz` — auftragsgemäß ausgelassen (Rechtstexte).
- `/news/*` — 43 Artikel unter demselben Detail-Template. Erfasst ist genau ein
  Exemplar (`/news/was-kostet-ein-produktionsstillstand`, Sektionen 42 bis 44).
- Leistungs-/Produkt-Detailseiten, Preise, Rechner, Konfigurator, Projekt-/Referenz-
  Detail, Karriere und Team existieren auf dieser Site nicht. Stichproben auf
  `/karriere`, `/jobs`, `/team`, `/preise`, `/projekte`, `/referenzen`, `/produkte`,
  `/shop`, `/blog`, `/rechner`, `/konfigurator`, `/partner`, `/faq`, `/downloads` und
  `/standorte` liefern jeweils Status 404. Die Obergrenze von acht neuen Routen wurde
  daher nicht ausgeschöpft: es gibt nur drei weitere Templates.
- Mobile Zustands-Shots (Hover) sind nicht erfasst — der States-Pass ist laut
  Skript-Kopf ein reiner Desktop-Pass, Hover auf Touch ist ohne Aussage.
