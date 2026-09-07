# priwatt — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene bzw. wiederholt sichtbare Grundwerte (aus den PNG abgelesen, wo eine
Fläche gross genug und nicht überlagert ist — sonst als Schätzung markiert):
Akzent-Hellgrün der gefüllten CTAs (`Jetzt konfigurieren`, `Zum Komplettset`,
`Alle zulassen`) ist ein helles Limette-Grün, in allen Shots identisch
(`home-desktop-02-y750.png`, `home-desktop-05-y3000.png`). Dunkle Fläche ist ein
Tannen-/Schwarzgrün und trägt Berater-Band, Stat-Karten, Footer
(`home-desktop-03-y1500.png`, `home-desktop-08-y5250.png`,
`home-desktop-10-y6730.png`). Ein zweites, kräftigeres Signalgrün (kalt, fast
Mint) sitzt nur in Grafik-Elementen: Plus-Icons auf den Lösungs-Kacheln und die
Dreieck-/Winkel-Deko hinter den Produktbildern (`home-desktop-04-y2250.png`,
`home-desktop-05-y3000.png`). Promo-Topbar ist ein stumpfes Oliv-Beige.
Grundfläche der Seite ist ein sehr helles Creme/Off-White.

**Overlay-Vorbehalt für die gesamte Datei:** In JEDEM Shot dieser Bibliothek
liegt ein Cookie-Layer über der Seite — desktop als weisse, oben abgerundete
Karte über dem unteren Drittel (ca. ab y 1170 im Slice, mit Keks-Icon im Kreis,
Fliesstext, gefülltem hellgrünen Button `Alle zulassen` und darunter der Textlink
`Ablehnen` plus `Anpassen` mit Chevron), mobil als weisse Karte über dem oberen
Bildrand. Zusätzlich dimmt ein halbtransparenter Schleier die ganze Seite, die
Flächen wirken deshalb in allen Shots kühler und grauer als sie sind. Alles, was
unter dieser Karte liegt, ist **nicht belegt** und wird unten nicht beschrieben.
Farbangaben sind aus diesem Grund durchgehend als Schätzung zu lesen.

Zwei Elemente wiederholen sich sitewide und werden nur bei ihrem ersten
Auftreten (Seite `/`) ausbeschrieben, danach nur referenziert: die Promo-Topbar
plus Header (Sektion 01) und der dunkle Footer (Sektion 12).

## Seite: /

### 01 — Promo-Topbar und Sticky-Header [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Zwei gestapelte Bänder, beide randlos über die volle Breite von
  1440 px. Oben ein niedriges Promo-Band (ca. 52 px) mit zentriertem Text in zwei
  Zeilen — Zeile eins die Aktion, Zeile zwei ein unterstrichener Textlink. Darunter
  der Header (ca. 78 px) in drei Zonen: Wortmarke ganz links am Rand (ca. 36 px
  Randabstand, nicht in einem schmalen Mittelcontainer), in der Mitte-links eine
  Reihe von sechs Nav-Labels mit Chevron, rechts abgesetzt `Blog`, `Service` mit
  Chevron und ganz aussen ein Warenkorb-Icon. Zwischen den Nav-Gruppen stehen
  dünne vertikale Trennstriche (sichtbar zwischen `priwatt`-Logo und `Franchise`,
  zwischen `Balkonkraftwerke` und `Speicher`, zwischen `Zubehör` und `Blog`,
  zwischen `Service` und Warenkorb) — ein für eine Handwerker-Seite ungewöhnlich
  shop-artiges Leistendesign. Der Header ist sticky: er liegt in jedem
  Scroll-Slice (`home-desktop-05-y3000.png`, `home-desktop-09-y6000.png`)
  unverändert oben und überlagert dort auch Bild- und Kartenflächen.
- Buttons/Komponenten: In der Leiste kein einziger gefüllter CTA — der Header
  arbeitet ohne Button, die einzige Aktion ist das Warenkorb-Icon (Outline-Strich,
  kein Zähler-Badge sichtbar). Nav-Labels sind reiner Text mit nachgestelltem
  Chevron nach unten (Dropdown-Andeutung, aufgeklappt in keinem Shot belegt).
  Der Promo-Link ist ein unterstrichener Fliesstext-Link, kein Button. Im Promo-Band
  steht links ein Glühbirnen-Emoji als Icon-Ersatz.
- Typo: Wortmarke `priwatt` als reine Kleinschreibung, geometrische Grotesk,
  fett, kein Icon-Symbol daneben. Nav-Labels ca. 15-16 px, Medium, gemischte
  Schreibweise, kein Letterspacing (geschätzt). Promo-Zeile kleiner (ca. 13 px),
  mit einem fett gesetzten Code-Wort in Grossbuchstaben am Zeilenende — der einzige
  Caps-Einsatz im Kopf. Zeile zwei unterstrichen und halbfett.
- Farbe/Fläche: Promo-Band in stumpfem Oliv-Beige mit fast schwarzem Text — ein
  auffällig gedeckter, warmer Ton, der weder Akzentgrün noch Dunkelgrün ist.
  Header darunter deutlich heller (Creme/Off-White, in den Shots durch das Overlay
  grau gedimmt) mit dunklem Text. Kein Schatten, keine sichtbare Trennlinie unter
  dem Header — die Bänder trennen sich allein über den Helligkeitssprung.
- Abstände/Rhythmus: Sehr dichte Leiste für sechs Hauptpunkte: zwischen den
  Nav-Labels nur ca. 24-30 px, die Labels füllen die Zone zwischen Logo und
  rechter Gruppe fast lückenlos. Grosser leerer Korridor zwischen `Zubehör` und
  `Blog` (ca. 130 px) trennt Shop-Navigation von Service-Navigation.
- Mobil: radikal reduziert (`home-mobile-00-fold.png`). Vom Header ist im Fold
  nur ein schmaler Rest links am Bildrand sichtbar, weil die Cookie-Karte den
  oberen Bereich überdeckt — Burger, Logo und Warenkorb sind in diesem Shot
  **nicht belegt**. Die Promo-Topbar ist als schmaler olivfarbener Streifen am
  linken Rand angeschnitten erkennbar.
- Pattern: Kandidat: Shop-Header ohne CTA mit Promo-Topbar

### 02 — Hero-Slider, Foto vollflächig mit Text links [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollflächiges Produktfoto randlos über die ganze Breite, Text
  linksbündig darübergelegt, beginnend bei ca. 90 px vom linken Rand. Kein
  Container, keine Textbox, keine Karte — die Schrift liegt direkt auf dem Foto.
  Das Produktmotiv (Solarmodule plus Speicherschränke) sitzt rechts und wird von
  der H1 überlappt: die Wörter `Speicher` und `ESA Athena` liegen buchstäblich vor
  dem Modul — eine gewollte Überlappung Typo über Objekt statt sauberer Trennung
  links/rechts. Unter dem Text folgt der CTA (sichtbar in
  `home-desktop-02-y750.png`), darunter eine Reihe von drei Feature-Punkten,
  zentriert über die Bildbreite und je mit einem Blitz-Icon darüber. Rechts unten
  drei Slider-Dots.
- Buttons/Komponenten: Genau ein CTA im Fold, `Jetzt konfigurieren`. Form: leicht
  gerundetes Rechteck, kein Pill — Radius geschätzt ca. 6-8 px, Höhe ca. 50 px,
  Breite ca. 200 px. Gefüllt in Akzent-Hellgrün mit fast schwarzem, halbfettem
  Label und einem schlanken Chevron nach rechts am Ende. Kein Outline-Button, kein
  zweiter CTA daneben. Slider-Steuerung als drei Dots unten rechts, der aktive Dot
  ist zu einem hellgrünen Stäbchen (Pill) gestreckt, die inaktiven sind graue
  Kreise — Steuerung ohne Pfeile. Die drei Feature-Punkte sind kartenlos: nur
  Blitz-Icon in Hellgrün über zwei bis drei Zeilen zentriertem Text.
- Typo: Zweistufig, kein Eyebrow. H1 sehr gross (ca. 62-66 px geschätzt),
  geometrische Grotesk, Bold, drei Zeilen, sehr enger Zeilenabstand (die Zeilen
  berühren sich fast). Darunter eine Lead-Zeile deutlich kleiner (ca. 34 px), aber
  im selben Bold — kein Regular-Kontrast, sondern derselbe Weight in kleinerem
  Grad, Verhältnis H1 zu Lead grob 1,9:1 (geschätzt). Alles in gemischter
  Schreibweise, keine Caps, kein Letterspacing. Feature-Zeilen klein (ca. 15 px)
  und halbfett, zentriert. Keine Serif auf der Seite.
- Farbe/Fläche: Kein dunkler Verlauf, kein Wash über dem Foto — die weisse Schrift
  steht auf dem an dieser Stelle ohnehin kühlen, blaugrauen Bild. An der Kante,
  wo die H1 über das helle Modulgehäuse läuft, sinkt der Kontrast sichtbar ab
  (`Speicher` ist über dem hellen Objekt schwächer lesbar als über dem dunklen
  Hintergrund). Der Akzent sitzt an genau drei Stellen: CTA-Fläche, Blitz-Icons,
  aktiver Slider-Dot.
- Abstände/Rhythmus: Sehr grosszügig. Hero-Höhe über 900 px (die Feature-Reihe
  erscheint erst im Slice bei y750). Zwischen Lead-Zeile und CTA ca. 60 px,
  zwischen CTA und Feature-Reihe ein sehr grosser leerer Bildbereich von ca.
  300 px, der bewusst nur das Foto zeigt.
- Mobil: gestapelt und deutlich enger (`home-mobile-00-fold.png`). Das Foto bleibt
  vollflächig, der Text rutscht nach unten in die Bildmitte, linksbündig ab ca.
  16 px Randabstand. H1 auf ca. 26 px, weiterhin dreizeilig. Die Lead-Zeile wird
  einzeilig. Der CTA behält Form und Farbe, wird aber breiter (ca. 200 px von
  375 px Viewport) und bleibt links, nicht zentriert. Die drei Feature-Punkte
  fehlen in diesem Shot komplett — **nicht belegt**, ob sie mobil entfallen oder
  nur weiter unten stehen. Die Slider-Dots sitzen mobil zentriert unten statt
  rechts.
- Pattern: `P-HERO-PHOTO` (mit Abweichung: kein Zonen-Verlauf für die Lesbarkeit,
  die Typo läuft ungeschützt über das Produkt)

### 03 — Community-Band mit Testimonial-Karussell [home-desktop-02-y750.png | -]
- Anordnung: Zweispaltig asymmetrisch. Links eine schmale Textspalte (ca. 300 px)
  mit einem hellgrünen Stern-Sticker oben, darunter H2 und ein kurzer Absatz.
  Rechts ein horizontales Karussell aus Zitatkarten, das an der rechten
  Viewportkante angeschnitten ist — die dritte Karte läuft sichtbar aus dem Bild,
  was den Scroll-Charakter signalisiert. Karten sind gleich breit (ca. 335 px) und
  gleich hoch, Abstand dazwischen ca. 30 px.
- Buttons/Komponenten: Zitatkarten als flache, leicht gerundete Rechtecke (Radius
  geschätzt ca. 4-6 px) in einem Grauton minimal dunkler als die Sektionsfläche,
  ohne Rahmen und ohne Schatten — sie trennen sich nur über den Helligkeitssprung.
  Innen oben links ein grosses graues Anführungszeichen-Icon als Marker, darunter
  der Fliesstext, ganz unten fett der Name. Der Name sitzt auf einer festen
  Grundlinie, nicht direkt unter dem Text — die Karten sind auf gleiche Höhe
  gezogen, bei kurzem Zitat entsteht ein leerer Block. Keine Sterne, keine
  Bewertungszahl, keine Avatare. Der Stern-Sticker links ist eine gezackte
  hellgrüne Fläche (Explosionsstern) mit dreizeiligem dunklem Text darin —
  ein Aufkleber-Element, kein Badge-Chip.
- Typo: H2 dreizeilig, ca. 34 px, Bold, sehr enger Zeilenabstand. Absatz darunter
  ca. 17 px Regular in Dunkelgrau, vierzeilig. Zitat-Fliesstext ca. 15 px Regular,
  Name ca. 14 px Bold. Der Sticker-Text ist ca. 13 px Bold, dreizeilig.
- Farbe/Fläche: Hell. Die Sektion sitzt auf einer eigenen, gegenüber dem Hero
  leicht helleren Fläche; der Wechsel vom dunklen Hero-Foto zu dieser hellen Fläche
  ist der erste Hell/Dunkel-Sprung der Seite. Akzent nur im Stern-Sticker.
- Abstände/Rhythmus: Ca. 60 px Sektionsvorlauf nach dem Hero, Karten-Innenpolster
  ca. 25 px. Der linke Textblock steht oben bündig mit den Karten.
- Mobil: **nicht belegt** in einem eigenen Slice; im Muster der übrigen Sektionen
  ist das Karussell mobil einspaltig angeschnitten (vgl. `home-mobile-08-y2954.png`
  für die Bestseller-Reihe).
- Pattern: `P-TESTIMONIAL`

### 04 — Berater-Band, dunkelgrün [home-desktop-03-y1500.png | -]
- Anordnung: Ein einzelnes horizontales Band als abgesetzte Fläche im Container
  (ca. 36 px bis 1390 px, nicht randlos), Höhe ca. 145 px. Innen drei Zonen auf
  einer Achse: ganz links ein quadratisches Porträtfoto, daneben zweizeiliger Text,
  ganz rechts der CTA. Alles vertikal mittig, dazwischen grosse Leerräume — das
  Band ist bewusst leer in der Mitte.
- Buttons/Komponenten: Porträt als Quadrat mit leichter Rundung (Radius geschätzt
  ca. 4 px), nicht als Kreis-Avatar — ungewöhnlich für ein Berater-Element.
  CTA `Kontakt aufnehmen` als gefülltes, leicht gerundetes Rechteck in
  Akzent-Hellgrün mit dunklem Label und Chevron rechts, Höhe ca. 52 px — formal
  identisch zum Hero-CTA, damit ein wiederverwendetes Button-Bauteil. Auf dunkler
  Fläche wirkt derselbe Button deutlich lauter als auf hellem Grund.
- Typo: Nur eine Textebene, keine Headline: zweizeiliger Satz, ca. 22 px, Regular
  bis Medium, weiss auf Dunkelgrün, linksbündig. Kein Eyebrow, keine Subline.
- Farbe/Fläche: Erste vollflächig dunkle Fläche der Seite — Tannen-/Schwarzgrün
  als Band, nicht als volle Sektionsbreite. Der Akzent sitzt genau einmal, im CTA.
- Abstände/Rhythmus: Band-Innenpolster ca. 32 px, darunter und darüber je ca.
  60-70 px Luft zur Nachbarsektion. Danach folgt ein deutlicher Flächenwechsel
  (die nächste Sektion sitzt auf einer eigenen, minimal dunkleren Fläche mit einer
  weit gerundeten Ecke oben rechts — sichtbar als grosser Radius-Bogen an der
  rechten Kante).
- Mobil: **nicht belegt**.
- Pattern: `P-CTA-MID` (Fläche trägt hier allerdings Farbe, nicht `surface` —
  S17-Spannung)

### 05 — Lösungs-Kacheln, drei Foto-Karten [home-desktop-03-y1500.png, home-desktop-04-y2250.png | -]
- Anordnung: Zentrierter zweizeiliger Kopf, darunter ein 3-Spalten-Raster gleich
  breiter, gleich hoher Foto-Kacheln (je ca. 435 px breit, ca. 505 px hoch,
  Spaltenabstand ca. 25 px), randbündig zum Container. Text liegt IN der Kachel
  oben auf dem Foto, das Plus-Icon unten links auf dem Foto — Kachel und Bild sind
  nicht getrennt, das Foto füllt die Kachel ganz aus.
- Buttons/Komponenten: Kein Button. Statt eines CTA sitzt in jeder Kachel unten
  links ein grosses Plus-Zeichen in kräftigem Signalgrün, ohne Kreis, ohne
  Kasten — ein reines Glyph als Affordance. Die Kacheln haben eine leichte Rundung
  (Radius geschätzt ca. 4-6 px) und keinen Schatten. Am oberen Teil der Kachel
  liegt eine leichte Abdunklung, damit der weisse Titel lesbar bleibt.
- Typo: Sektionskopf zentriert, zweizeilig, ca. 42 px Bold — der grösste Titel
  unterhalb des Hero. In der Kachel zweistufig: Titel ca. 26 px Bold weiss,
  darunter Subline ca. 15 px Bold weiss, zweizeilig. Auch hier ist die Subline
  fett statt Regular, wie schon im Hero — durchgängiges Muster der Seite.
- Farbe/Fläche: Die Sektion steht auf einer eigenen, gegenüber dem Vorgänger
  minimal dunkleren hellen Fläche. Die Kacheln sind Foto, nicht Farbfläche. Der
  Akzent ist hier NICHT das Hellgrün der Buttons, sondern das kalte Signalgrün der
  Plus-Icons — die Seite führt damit zwei verschiedene Grüntöne parallel.
- Abstände/Rhythmus: Ca. 100 px vom Bandende bis zum Sektionskopf, ca. 65 px vom
  Kopf zum Raster, danach ca. 90 px bis zum nächsten Kopf. Das Raster ist dicht
  (schmale Rinnen), die vertikalen Abstände dagegen weit.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: Kandidat: Foto-Kachel-Trio mit Plus-Glyph statt CTA (`P-OFFER-PAIR`
  greift nicht, es sind drei; `P-GALLERY` greift nicht, jede Kachel ist ein
  Einstieg)

### 06 — Bestseller, Tab-Umschalter und Produktkarten [home-desktop-04-y2250.png, home-desktop-05-y3000.png | home-mobile-08-y2954.png]
- Anordnung: Zentrierter H2, darunter mittig ein Zweifach-Tab-Umschalter, darunter
  ein 4-Spalten-Raster Produktkarten (je ca. 320 px breit). Jede Karte ist
  einspaltig aufgebaut: Bild oben, Titel, Subtitel, eine kurze horizontale
  Trennlinie, Merkmalsliste, CTA unten. Die Karten sind NICHT auf gleiche Höhe
  gezogen — die dritte Karte hat einen längeren Titel (vier statt drei Zeilen) und
  ihr CTA sitzt sichtbar tiefer als die der Nachbarn (`home-desktop-05-y3000.png`,
  `home-desktop-06-y3750.png`). Das ist der auffälligste Ausrichtungsbruch der
  Startseite.
- Buttons/Komponenten: Tab-Umschalter als Pillen-Gruppe auf einer hellgrauen
  Pillen-Spur: der aktive Tab ist eine gefüllte dunkle Pille mit weissem Label,
  der inaktive nur grauer Text auf der Spur — Segmented Control, kein
  Dropdown. Produktkarten ohne Rahmen und ohne Schatten; das Bildfeld hat einen
  eigenen hellgrauen Hintergrund mit leichter Rundung, die Textzone darunter sitzt
  direkt auf der Sektionsfläche — die Karte ist also keine geschlossene Fläche,
  sondern nur eine Bild-plus-Text-Kolumne. Hinter jedem freigestellten Produkt
  liegt ein kräftig grünes Winkel-/Dreieck-Element als Deko. CTA `Zum Komplettset`
  wieder als gefülltes hellgrünes Rechteck mit Chevron, hier kleiner (Höhe ca.
  46 px) — dritte Grössenstufe desselben Bauteils. Merkmale sind einfache
  Bullet-Zeilen mit `•`, kein Häkchen-Icon.
- Typo: H2 ca. 42 px Bold zentriert. Kartentitel ca. 24 px Bold, zwei bis vier
  Zeilen, sehr enger Zeilenabstand. Subtitel ca. 16 px Regular in Grau — hier
  bricht die Seite ihr Bold-Subline-Muster und setzt echtes Regular. Bullets ca.
  15 px Regular. Tab-Labels ca. 15 px Medium.
- Farbe/Fläche: Sektion auf hellgrauer Fläche. Vier gefüllte hellgrüne Buttons in
  einer Reihe sind hier die grösste Akzentmenge der Seite — deutlich mehr als eine
  Aktion pro Screen.
- Abstände/Rhythmus: Ca. 65 px H2 zu Tabs, ca. 75 px Tabs zu Raster. Innerhalb der
  Karte eng: Bild zu Titel ca. 30 px, Bullets im Abstand von ca. 43 px, Liste zu
  CTA ca. 30 px.
- Mobil: aus dem 4er-Raster wird ein horizontales Karussell
  (`home-mobile-08-y2954.png`): die erste Karte steht ganz, die zweite ist am
  rechten Rand angeschnitten. H2 und Tab-Gruppe bleiben zentriert, der Tab-Umschalter
  behält Form und Grösse fast unverändert und wirkt dadurch mobil breiter im
  Verhältnis. Kartenbild ca. 310 px breit, Titel auf ca. 22 px. Rechts unten liegt
  zusätzlich ein runder Scroll-to-Top-Button (heller Kreis mit dunklem Pfeil nach
  oben) als fixes Element — desktop in keinem Shot sichtbar.
- Pattern: `P-PRICE` (Produktkarten als Paketvergleich; ohne sichtbaren Preis in
  diesem Ausschnitt)

### 07 — Argumente, Tab-Reiter über Split-Panel [home-desktop-06-y3750.png, home-desktop-07-y4500.png | -]
- Anordnung: Kopfzeile zweigeteilt auf einer Linie — links der zweizeilige H2
  linksbündig, rechts auf gleicher Höhe eine horizontale Tab-Leiste, die am
  rechten Viewportrand angeschnitten ist (der fünfte Reiter läuft sichtbar aus dem
  Bild). Darunter ein zweispaltiger Split: links ein hellgrünes Farbfeld mit Text,
  rechts ein Foto. Beide Felder sind gleich hoch (ca. 615 px), die Farbspalte ist
  deutlich schmaler (ca. 515 px zu ca. 815 px) — kein 50/50-Split, sondern ein
  Verhältnis um 40/60.
- Buttons/Komponenten: Kein Button in dieser Sektion. Die Tab-Leiste ist wieder
  das Segmented Control aus Sektion 06: helle Pillen-Spur, aktiver Reiter als
  gefüllte dunkle Pille mit weissem Label, inaktive als grauer Text. Hier trägt es
  fünf Einträge und ist dadurch zu breit für den Container — der Anschnitt ist
  sichtbarer Overflow, nicht dekorativer Bleed. Farbfeld und Foto haben beide nur
  eine minimale Rundung (geschätzt ca. 4 px), kein Schatten, kein Rahmen.
- Typo: H2 zweizeilig ca. 40 px Bold. Im Farbfeld: Titel ca. 30 px Bold, zweizeilig,
  darunter ein langer Fliesstextabsatz ca. 16 px Regular, zehnzeilig, in fast
  schwarzem Ton auf Grün. Auffällig: der Absatz endet weit oberhalb der
  Feldunterkante, die untere Hälfte des grünen Feldes bleibt komplett leer
  (`home-desktop-07-y4500.png`) — die Feldhöhe folgt dem Foto, nicht dem Text.
- Farbe/Fläche: Hier trägt die Fläche selbst den Akzent: ein volles hellgrünes
  Rechteck als halbe Sektionsbreite. Zusammen mit den vier grünen Buttons aus
  Sektion 06 und den Stat-Karten weiter unten ist das die zweite grosse
  Akzent-Vollfläche der Seite.
- Abstände/Rhythmus: Ca. 80 px vom Sektionsanfang bis zum H2, ca. 75 px vom Kopf
  bis zum Split. Innenpolster im Farbfeld ca. 48 px links, ca. 70 px oben.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: Kandidat: Tab-gesteuertes Argument-Panel mit Farbfeld-Split
  (`P-HERO-SPLIT` beschreibt die Geometrie, ist aber ein Hero-Muster)

### 08 — Interaktives Haus, Hotspot-Bild [home-desktop-07-y4500.png, home-desktop-08-y5250.png | -]
- Anordnung: Zentrierter einzeiliger H2, darunter ein sehr grosses, fast
  containerbreites Foto (ca. 1350 x 630 px) mit leichter Rundung. Auf dem Foto
  liegen zwei überlagerte UI-Ebenen: oben rechts eine dunkelgrüne Info-Karte, die
  in die Bildfläche hineinragt und dort an der Ecke sitzt; unten mittig eine
  dunkle, halbtransparente Leiste mit vier kreisrunden Thumbnails und einem
  kleinen Label darüber. Die Info-Karte oben rechts ist die einzige Stelle der
  Seite, an der ein UI-Element ein Foto überlappt statt daneben zu stehen.
- Buttons/Komponenten: Die Info-Karte ist ein dunkelgrünes Rechteck mit Rundung
  (geschätzt ca. 8 px), innen links ein hellgraues Haus-Piktogramm mit einem
  hellgrünen Balken darin, rechts zweizeilige Headline, darunter eine kleine
  Subline und ganz unten ein Textlink `Mehr erfahren` mit Chevron — der Link ist
  hellgrün eingefärbt, NICHT als Button gebaut. Die Thumbnail-Leiste unten ist ein
  dunkles Panel mit Rundung, darin vier gleich grosse Kreis-Thumbnails (Durchmesser
  ca. 46 px) mit Fotoinhalt, ohne sichtbaren aktiven Zustand; darüber ein kleines
  Label auf eigenem dunklem Chip. Keine Pfeile, kein Slider-Dot.
- Typo: H2 einzeilig, ca. 44 px Bold, zentriert — der grösste H2 der Seite. In der
  Info-Karte: Headline ca. 26 px Bold weiss, zweizeilig, Subline ca. 14 px Regular
  in gedämpftem Weiss, Link ca. 14 px Bold in Hellgrün. Der Chip-Text unten ca.
  12 px Regular.
- Farbe/Fläche: Helles Umfeld, das Foto trägt die Fläche. Die beiden dunkelgrünen
  Overlays sind der einzige Dunkel-Einsatz in diesem Abschnitt und binden zurück
  auf das Berater-Band aus Sektion 04.
- Abstände/Rhythmus: Ca. 145 px vom vorigen Split bis zum H2 — die grösste
  Sektionslücke der Seite. Ca. 80 px vom H2 zum Bild. Die Info-Karte hat ca. 24 px
  Abstand zur oberen und rechten Bildkante.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: Kandidat: Hotspot-Foto mit Overlay-Infokarte und Kreis-Thumbnails

### 09 — Stat-Karten, drei dunkle Kacheln [home-desktop-08-y5250.png, home-desktop-09-y6000.png | -]
- Anordnung: Zentrierter einzeiliger H2, darunter drei gleich breite, gleich hohe
  dunkelgrüne Karten (je ca. 370 px breit, ca. 185 px hoch) in einer Reihe. Das
  Trio ist NICHT containerbreit, sondern schmaler eingerückt (ca. 145 px bis
  1280 px) — die Reihe schwebt zentriert in einer breiteren Fläche, mit sichtbarer
  Luft links und rechts. Innerhalb jeder Karte: Zahl gross zentriert, direkt
  danach in derselben Zeile eine kleine Einheit als Suffix, darunter zentriert die
  Beschriftung.
- Buttons/Komponenten: Keine Buttons, keine Icons, keine Trennlinien in den
  Karten — nur Zahl und Label. Karten mit leichter Rundung (geschätzt ca. 6 px),
  ohne Rahmen, ohne Schatten.
- Typo: H2 ca. 44 px Bold zentriert. Stat-Zahl ca. 42 px, Regular bis Medium (nicht
  Bold — schwächer gesetzt als die Headlines) in Akzent-Hellgrün. Die Einheit
  direkt daneben deutlich kleiner (ca. 16 px) und auf der Grundlinie ausgerichtet,
  ebenfalls hellgrün. Label darunter ca. 15 px Regular in Weiss. Verhältnis Zahl zu
  Label grob 2,8:1 (geschätzt). Das Grün als Textfarbe in grossem Grad tritt nur
  hier auf.
- Farbe/Fläche: Dritter Dunkel-Einsatz der Seite (nach Berater-Band und
  Foto-Overlays), hier als drei getrennte Kacheln auf hellgrauer Fläche statt als
  durchgehendes Band.
- Abstände/Rhythmus: Ca. 145 px vom Bild bis zum H2, ca. 80 px vom H2 zu den
  Karten, Spaltenabstand ca. 15 px — die Karten stehen sehr eng beieinander,
  deutlich enger als das Produktraster.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: Kandidat: Stat-Trio als dunkle Kacheln mit Akzent-Zahl

### 10 — FAQ, Sidebar-Reiter plus Akkordeon [home-desktop-09-y6000.png, home-desktop-10-y6730.png | -]
- Anordnung: Kopfzeile wieder zweigeteilt wie in Sektion 07: links H2, rechts eine
  Segmented-Control-Pillengruppe mit zwei Reitern, rechtsbündig. Darunter ein
  Split aus schmaler linker Sidebar (ca. 330 px) und breitem Akkordeon-Panel (ca.
  1000 px). Die Sidebar ist eine vertikale Liste von drei Kategorie-Buttons, das
  Panel eine Liste von fünf Akkordeon-Zeilen, alle geschlossen.
- Buttons/Komponenten: Drei verschiedene Button-Zustände auf einem Screen: der
  aktive Sidebar-Eintrag `FAQs` ist eine gefüllte dunkle Fläche mit weissem Label
  und einem hellgrünen Icon links; die beiden inaktiven (`Beratung`, `Videos`) sind
  Outline-Buttons — heller Grund mit dünner dunkler Kontur, dunklem Label und
  demselben grünen Icon. Alle drei mit Rundung ca. 8 px (geschätzt), Höhe ca.
  78 px, volle Sidebar-Breite, linksbündiges Icon-plus-Label-Layout. Das ist der
  einzige Outline-Button-Typ der Startseite. Das Akkordeon-Panel ist eine hellgraue
  Fläche mit Rundung, in der die Zeilen ohne eigene Kartenfläche und ohne
  Trennlinien stehen; jede Zeile beginnt mit einem dünnen Plus-Glyph (kein Chevron,
  kein Kreis) und dann fett der Fragetext. Kein geöffneter Zustand belegt.
- Typo: H2 einzeilig ca. 42 px Bold linksbündig. Sidebar-Labels ca. 19 px Bold.
  Akkordeon-Fragen ca. 20 px Bold — die Fragen sind fast so gross wie die
  Sidebar-Labels, das Panel wirkt dadurch schwer.
- Farbe/Fläche: Hell auf hell, das dunkle Element ist nur der aktive
  Sidebar-Eintrag. Akzent-Grün nur in den drei Sidebar-Icons.
- Abstände/Rhythmus: Ca. 115 px von den Stat-Karten zum H2, ca. 75 px vom Kopf zum
  Split. Sidebar-Buttons im Abstand von ca. 12 px, Akkordeon-Zeilen im Abstand von
  ca. 90 px — sehr luftig gesetzte Fragen. Panel-Innenpolster ca. 80 px oben.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: `P-FAQ` (mit vorgeschalteter Kategorie-Sidebar und Tab-Ebene)

### 11 — Trust-Leiste im Footer-Kopf [home-desktop-10-y6730.png | -]
- Anordnung: Erste Zeile des dunklen Footer-Blocks: links die Wortmarke, rechts
  daneben drei Trust-Punkte gleichmässig über die Breite verteilt, jeder als
  Icon-plus-Text-Paar auf einer Linie. Darunter eine dünne, containerbreite
  Trennlinie, die die Leiste vom Linkraster abtrennt.
- Buttons/Komponenten: Keine Buttons. Drei Outline-Strichicons (Lineal/Winkel,
  Schild mit Häkchen, Rückgabe-Pfeil) in hellem Grün, ca. 22 px, jeweils links vom
  Text. Kein Kasten, kein Chip, keine Karte — die Leiste ist rein typografisch
  aufgebaut.
- Typo: Wortmarke wie im Header, hier in Weiss. Trust-Texte ca. 16 px Medium in
  Weiss, gemischte Schreibweise.
- Farbe/Fläche: Tannen-/Schwarzgrün vollflächig randlos — die einzige randlose
  Dunkelfläche der Seite (Berater-Band und Stat-Karten waren eingerückt). Der
  Wechsel hell zu dunkel ist hart, ohne Verlauf.
- Abstände/Rhythmus: Ca. 95 px vom Footer-Anfang bis zur Trust-Zeile, ca. 55 px
  von der Trust-Zeile bis zur Trennlinie.
- Mobil: **nicht belegt**.
- Pattern: `P-PROOF-STRIP`

### 12 — Footer-Linkraster [home-desktop-10-y6730.png | -]
- Anordnung: Vierspaltiges Linkraster über die Containerbreite, jede Spalte mit
  einer farbigen Überschrift und einer vertikalen Linkliste darunter. Die vierte
  Spalte trägt zwei Überschriftenblöcke untereinander (`Speicher`,
  `Wärmepumpen`) — die Spalten sind also nicht symmetrisch befüllt. Ganz links
  unten folgt ein zweiter Block sekundärer Links mit nachgestelltem
  Diagonal-Pfeil-Icon (externe/abgesetzte Ziele). Der untere Teil des Footers liegt
  unter dem Cookie-Layer und ist **nicht belegt**.
- Buttons/Komponenten: Keine Buttons. Einziges Komponentenmerkmal ist der kleine
  Diagonalpfeil hinter den Links des Sekundärblocks (`Newsletter`, `Karriere`,
  `Über uns`, `Presseraum`). Keine Social-Icons, keine Zahlungslogos in diesem
  Ausschnitt sichtbar.
- Typo: Spaltenüberschriften ca. 16 px Bold in Akzent-Hellgrün — die Überschriften
  tragen Farbe, die Links nicht. Links ca. 16 px Regular in Weiss, alle gleich
  gewichtet. Die Sekundärlinks links unten sind Bold statt Regular und heben sich
  dadurch von der Hauptliste ab.
- Farbe/Fläche: Durchgehend dunkles Tannengrün, kein zweiter Flächenton, keine
  Boxen. Grün nur in den Überschriften.
- Abstände/Rhythmus: Zeilenabstand in den Listen ca. 40 px — sehr luftig für
  Footer-Links. Spaltenabstand ca. 345 px Rasterschritt, die Spalten sind
  gleichmässig verteilt und nicht eng gesetzt.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Dunkler Vierspalten-Shopfooter mit Akzent-Spaltenköpfen

## Seite: /solaranlagen/

Header, Promo-Topbar, Trust-Leiste und Footer sind identisch zur Startseite —
siehe Sektionen 01, 11 und 12. Einziger Unterschied im Header: das Nav-Label
`Solaranlagen` ist als Aktiv-Zustand ausgezeichnet und erscheint heller/grauer
statt dunkel (`solaranlagen__-desktop-00-fold.png`) — der Aktiv-Zustand macht das
Label also schwächer, nicht kräftiger, was der üblichen Konvention widerspricht.

### 13 — Hero, Split mit Checkliste [solaranlagen__-desktop-00-fold.png | solaranlagen__-mobile-00-fold.png]
- Anordnung: Zweispaltiger Split, komplett anders gebaut als der Startseiten-Hero
  (dort Vollbild mit Text darauf). Links eine Textspalte ab ca. 36 px Randabstand
  mit Breite ca. 500 px, rechts ein Foto ab ca. 600 px, das bis zur rechten
  Viewportkante läuft und dort randlos abschliesst. Die obere linke Ecke des Fotos
  ist mit einem sehr grossen Radius abgerundet (geschätzt ca. 110-160 px) — eine
  einzelne Riesen-Ecke, die anderen drei Ecken sind spitz. Das ist die
  auffälligste Formgebung der Seite. Reihenfolge in der Textspalte: Eyebrow mit
  Icon-Chip, H1, Lead-Absatz, Checkliste.
- Buttons/Komponenten: Eyebrow als Zeile aus einem kleinen dunklen Quadrat-Chip
  (ca. 18 px, mit hellgrünem Blitz-Glyph darin) plus Text daneben — kein
  Pill-Badge, sondern Chip plus Fliesstext. Die Checkliste nutzt kreisrunde
  hellgrüne Häkchen-Icons (Durchmesser ca. 22 px) mit dunklem Haken, links
  ausgerichtet, zweizeiliger Text daneben. Der CTA liegt desktop unter dem
  Cookie-Layer und ist **nicht belegt** (mobil dagegen sichtbar, siehe unten). Auf
  dem Foto liegt oben rechts das Marken-Deko-Element: gestreute kleine hellgrüne
  Winkel-/Pixel-Glyphen (Konfetti), das sich sitewide wiederholt.
- Typo: Dreistufig plus Liste. Eyebrow ca. 15 px Bold in Dunkelgrau. H1 zweizeilig
  ca. 38 px Bold — deutlich kleiner als die 62 px der Startseite, weil sie hier in
  eine schmale Spalte muss. Lead ca. 17 px Regular in Grau, dreizeilig.
  Checklisten-Text ca. 15 px Bold. Verhältnis H1 zu Lead grob 2,2:1 (geschätzt).
- Farbe/Fläche: Hell. Kein Farbfeld hinter dem Text, kein dunkler Block. Akzent
  in drei Elementen: Eyebrow-Chip-Glyph, Häkchen-Kreise, Foto-Konfetti.
- Abstände/Rhythmus: Textspalte oben ca. 130 px unter dem Header eingerückt, das
  Foto beginnt ca. 40 px höher — die beiden Spalten sind bewusst nicht auf
  gleicher Oberkante. Ca. 30 px Eyebrow zu H1, ca. 40 px H1 zu Lead, ca. 45 px
  Lead zu Liste, Listeneinträge im Abstand von ca. 40 px.
- Mobil: Reihenfolge kippt (`solaranlagen__-mobile-00-fold.png`). Das Foto steht
  OBEN als eigener Block (ca. 200 px hoch, mit derselben grossen Rundung an der
  oberen rechten Ecke statt links), darunter Eyebrow, H1 dreizeilig auf ca. 26 px,
  Lead, dann der CTA und erst danach die Checkliste. Der mobile CTA `Jetzt
  kostenlose Beratung sichern` ist ein gefülltes DUNKELGRÜNES Rechteck mit weissem
  Label und Chevron, fast volle Spaltenbreite (ca. 310 px) — nicht der hellgrüne
  Button der Startseite. Zweite Buttonfarbe im System, desktop an dieser Stelle
  nicht belegt.
- Pattern: `P-HERO-SPLIT`

### 14 — Presse-Logoleiste [solaranlagen__-desktop-02-y750.png | -]
- Anordnung: Eine einzelne horizontale Zeile mit fünf Medienlogos, gleichmässig
  über die volle Containerbreite verteilt (von ca. 45 px bis ca. 1370 px), alle auf
  einer optischen Mittellinie. Keine Überschrift darüber, kein Rahmen, keine
  Karten — die Leiste steht kommentarlos zwischen Hero und Berater-Band.
- Buttons/Komponenten: Nur Logos, keine Links erkennbar, kein Karussell, keine
  Dots. Die Logos sind in unterschiedlichen Originalproportionen belassen (breite
  Wortmarken neben kompakten), nicht auf eine gemeinsame optische Grösse
  normalisiert — die Leiste wirkt dadurch leicht unruhig.
- Typo: Fremdtypografie der Logos, keine eigene. Alle Marken sind auf einen
  einheitlichen Graustufen-Look reduziert, kein Logo trägt Eigenfarbe.
- Farbe/Fläche: Helle Sektionsfläche, Logos in Dunkelgrau bis Mittelgrau. Kein
  Akzent in dieser Sektion.
- Abstände/Rhythmus: Ca. 60 px Luft über der Leiste, ca. 55 px darunter bis zum
  Berater-Band. Sehr flache Sektion (ca. 150 px), reine Zwischenzeile.
- Mobil: **nicht belegt**.
- Pattern: `P-PROOF-STRIP`

### 15 — Berater-Band mit Telefon und zwei Kanal-CTAs [solaranlagen__-desktop-02-y750.png, solaranlagen__-desktop-06-y3750.png, solaranlagen__-desktop-07-y4500.png | -]
- Anordnung: Wie das Berater-Band der Startseite (Sektion 04) ein eingerücktes
  dunkelgrünes Band, hier aber vierteilig statt dreiteilig: Porträt links, Frage,
  dann ein Telefonblock (Nummer gross, Erreichbarkeit klein darunter) und rechts
  ZWEI Buttons nebeneinander. Alles auf einer Mittelachse, Bandhöhe ca. 125 px.
  Dieses Band erscheint auf der Seite dreimal an Sektionsgrenzen — in
  `solaranlagen__-desktop-02-y750.png` nach der Logoleiste, in
  `solaranlagen__-desktop-06-y3750.png` und `solaranlagen__-desktop-07-y4500.png` nach
  den Komplettset-Kacheln. Es ist damit weniger ein CTA als ein wiederkehrender
  Sektionstrenner.
- Buttons/Komponenten: Erstes echtes Button-Paar der Bibliothek und einziger Ort
  mit klarem Primär/Sekundär-Kontrast. Primär `WhatsApp Nachricht senden`: gefüllt
  Akzent-Hellgrün, dunkles Label, Chevron, Radius ca. 6 px, Höhe ca. 50 px.
  Sekundär `E-Mail senden`: echter Outline-Button — transparente Fläche, ca. 1,5 px
  helle Kontur, weisses Label, Chevron, gleiche Höhe. Beide gleich hoch, der
  Primär deutlich breiter (ca. 275 px zu ca. 170 px). Porträt wieder als
  gerundetes Quadrat, nicht als Kreis.
- Typo: Frage ca. 22 px Regular in Weiss. Telefonnummer ca. 19 px Bold in Weiss,
  darunter die Zeitangabe ca. 14 px Regular in gedämpftem Grau-Grün — die einzige
  Stelle mit reduziertem Weiss auf dunklem Grund. Button-Labels ca. 15 px Bold.
- Farbe/Fläche: Tannengrün-Band auf heller Sektionsfläche. Der Kontrast
  hellgrüner Button auf dunkelgrünem Band ist die lauteste Farbkombination der
  Seite.
- Abstände/Rhythmus: Innenpolster ca. 32 px, zwischen den beiden Buttons nur ca.
  14 px — auffällig eng für ein Button-Paar. Zwischen Frage und Telefonblock ca.
  60 px Leerraum.
- Mobil: **nicht belegt**.
- Pattern: `P-CTA-MID` (mit zwei Kanälen statt einer Aktion; Fläche trägt Farbe,
  S17-Spannung wie bei Sektion 04)

### 16 — Rechner-Sektion, hellgrünes Vollfeld [solaranlagen__-desktop-02-y750.png | -]
- Anordnung: Ein grosses hellgrünes Vollfeld über die Containerbreite (ca. 36 px
  bis 1390 px), Höhe ca. 670 px, mit leichter Rundung. Innen zweispaltiger Split:
  links ein Foto als eingesetztes Rechteck mit deutlichem Weissraum ringsum (das
  Bild schwimmt in der Farbfläche statt bündig anzuschliessen), rechts eine
  Textspalte mit H2, Lead, drei Checkpunkten und CTA. Rechts unten im Feld liegt
  wieder das Pixel-Konfetti, hier in einem helleren Grün auf Grün — Ton-in-Ton
  statt Kontrast.
- Buttons/Komponenten: CTA `Los geht's` als gefülltes DUNKELGRÜNES Rechteck mit
  weissem Label und Chevron, Höhe ca. 52 px, Breite ca. 140 px — auf der grünen
  Fläche kehrt sich die Buttonlogik um: dunkel gefüllt statt hellgrün. Die drei
  Checkpunkte nutzen dasselbe Häkchen-Muster wie der Hero, hier aber als flaches
  Häkchen-Glyph ohne Kreisfläche, in Dunkelgrün. Das Foto hat nur minimale Rundung.
- Typo: H2 dreizeilig ca. 40 px Bold in sehr dunklem Grün-Schwarz. Lead ca. 19 px
  Regular, zweizeilig. Checkpunkte ca. 17 px Bold — grösser als die
  Checklisten-Typo im Hero.
- Farbe/Fläche: Zweite grosse Akzent-Vollfläche des Sitesystems (nach dem
  Argumente-Farbfeld der Startseite). Hier trägt die Fläche den Akzent und der
  Button das Dunkel — die exakte Umkehrung der Standardlogik.
- Abstände/Rhythmus: Feld-Innenpolster ca. 115 px links, ca. 105 px oben —
  ungewöhnlich viel, das Feld ist deutlich luftiger als jede andere Sektion.
  Checkpunkte im Abstand von ca. 36 px, ca. 45 px bis zum CTA.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: `P-CTA-MID` (als Konfigurator-Einstieg; Fläche vollflächig in
  Akzentfarbe, damit klare S1/S17-Spannung)

### 17 — Argumente als Vierer-Textraster [solaranlagen__-desktop-04-y2250.png | -]
- Anordnung: Zwei mal zwei Textblöcke in einem Raster ohne Karten. Jede Zelle ist
  links von einer dünnen vertikalen Haarlinie begrenzt, die von der Zellenoberkante
  bis zur Unterkante läuft — die einzige Stelle der Bibliothek, an der vertikale
  Linien statt Flächen gliedern. Aufbau je Zelle: Piktogramm oben, Titel, Absatz.
  Die beiden Spalten sind gleich breit (je ca. 535 px), die Zeilenhöhe folgt dem
  längsten Text.
- Buttons/Komponenten: Keine Buttons. Piktogramm ist ein Outline-Haus in Dunkel
  mit einem kleinen hellgrünen Vollbalken im Inneren, ca. 46 px — dasselbe
  Piktogramm in beiden sichtbaren Zellen wiederholt, also kein individuelles
  Icon-Set, sondern ein einziges Markensymbol.
- Typo: Zelltitel ca. 21 px Bold, einzeilig. Absatz ca. 17 px Regular in
  Dunkelgrau, vier bis sieben Zeilen — sehr textlastige Sektion, deutlich mehr
  Fliesstext als alles auf der Startseite.
- Farbe/Fläche: Hellgraue Sektionsfläche, keine Kartenflächen. Akzent nur im
  Piktogramm-Balken.
- Abstände/Rhythmus: Vertikaler Abstand zwischen den Zeilen ca. 55 px, Einzug der
  Zelle hinter der Linie ca. 18 px. Nach dem Raster folgt ein sehr grosser
  Leerblock (ca. 130 px), dann ein randloses Vollbild-Foto über die ganze
  Viewportbreite ohne Text darauf — ein reiner Bildtrenner.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Vierer-Textraster mit vertikalen Trennlinien

### 18 — Komplettset-Paar, zwei Foto-Kacheln [solaranlagen__-desktop-06-y3750.png | -]
- Anordnung: Zentrierter zweizeiliger Kopf (H2 plus Subline), darunter genau ZWEI
  gleich breite, gleich hohe Foto-Kacheln (je ca. 665 px breit, ca. 510 px hoch).
  Sonst identisch gebaut zu den Lösungs-Kacheln der Startseite (Sektion 05): Titel
  und Subline oben auf dem Foto, Plus-Glyph unten links. Die Sektion sitzt auf
  einer eigenen helleren Fläche, deren obere rechte Ecke wieder mit sehr grossem
  Radius gerundet ist (sichtbarer Bogen an der rechten Kante) — dasselbe
  Formmotiv wie am Hero-Foto.
- Buttons/Komponenten: Kein Button, nur das Signalgrün-Plus als Affordance, exakt
  wie Sektion 05. Kachelrundung ca. 4-6 px.
- Typo: H2 ca. 42 px Bold zentriert, darunter Subline ca. 17 px Regular in Grau —
  hier echtes Regular, anders als bei den Kacheln der Startseite. Kacheltitel ca.
  28 px Bold weiss, Kachel-Subline ca. 16 px Bold weiss.
- Farbe/Fläche: Hell, die Kacheln tragen Foto. Akzent nur in den Plus-Glyphen.
- Abstände/Rhythmus: Ca. 100 px Sektionsvorlauf, ca. 30 px H2 zu Subline, ca. 65 px
  bis zum Kachelpaar, Rinne zwischen den Kacheln ca. 25 px.
- Mobil: **nicht belegt**.
- Pattern: `P-OFFER-PAIR`

### 19 — Montage-Bento, gemischtes Kachelraster [solaranlagen__-desktop-07-y4500.png | -]
- Anordnung: Die komplexeste Sektion der Bibliothek. Ein Bento-Raster aus sechs
  ungleich grossen Kacheln in drei Spalten: links oben eine dunkle Zahlkachel, links
  unten eine hellgraue Kachel mit Produktfoto; in der Mitte eine hohe Fotokachel
  über die volle Sektionshöhe (ca. 500 px, doppelte Zeilenhöhe); rechts oben eine
  dunkelgrüne Textkachel, rechts unten aufgeteilt in zwei schmalere Kacheln
  nebeneinander (eine hellgrüne mit Porträt, eine hellgraue mit Grafik). Die
  Kacheln haben unterschiedliche Höhen und Breiten, sind aber sauber am Raster
  ausgerichtet. H2 linksbündig darüber, nicht zentriert.
- Buttons/Komponenten: Kein einziger Button in der ganzen Sektion — die Kacheln
  sind Informationsträger, keine Einstiege. Jede Kachel nutzt eine andere
  Grafiksprache: ein radialer Strahlenkranz aus dünnen Strichen um eine grosse
  Zahl, ein grosser hellgrüner Häkchen-Glyph, der als Deko hinter dem Foto
  hervorsteht und aus der Kachel ausbricht, das Pixel-Konfetti auf der dunklen
  Kachel, ein freigestelltes Produkt vor einer hellgrünen Winkelform, ein
  Porträt-Freisteller auf hellgrüner Fläche mit Sprechblasen-Outlines, und eine
  Dokument-Grafik mit Häkchen und Stern-Glyph. Kachelrundung durchgehend ca. 8 px.
- Typo: H2 ca. 40 px Bold linksbündig. In den Kacheln stark unterschiedlich: die
  Zahl in der dunklen Kachel ca. 46 px in Akzent-Hellgrün mit kleiner Einheit als
  Suffix (wie die Stat-Karten der Startseite), darüber ein winziges `Bis zu` (ca.
  13 px), darunter dreizeilig ca. 12 px zentriert. In der Fotokachel dreizeilig ca.
  20 px Bold in Dunkel. In der dunkelgrünen Kachel zweistufig, ca. 18 px Regular
  über ca. 18 px Bold. In der Produktkachel eine Mischung aus ca. 16 px Regular
  (`Rundum`) und ca. 44 px Bold (`Sorglos Paket`) untereinander. Sechs Kacheln,
  sechs verschiedene Typo-Rhythmen.
- Farbe/Fläche: Alle vier Flächentöne des Systems auf einem Screen: Dunkelgrün,
  Hellgrün, Hellgrau und Foto. Das ist die farbdichteste Sektion der Bibliothek.
- Abstände/Rhythmus: Kachelrinnen ca. 25 px horizontal, ca. 30 px vertikal.
  Kachel-Innenpolster ca. 25-40 px. Sehr dicht gepackt gegenüber dem sonst luftigen
  Seitenrhythmus.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Bento-Raster aus Zahl-, Foto- und Grafikkacheln ohne CTA

### 20 — USP-Karussell, angeschnittene Karten [solaranlagen__-desktop-09-y6000.png | -]
- Anordnung: Eine horizontale Kartenreihe, die an BEIDEN Viewporträndern
  angeschnitten ist — links läuft eine Karte halb aus dem Bild, rechts ebenso. Es
  gibt keine Überschrift, keine Dots und keine Pfeile: die Reihe steht als reine
  Zwischenzeile zwischen zwei grossen Blöcken. Karten gleich breit (ca. 345 px)
  und gleich hoch (ca. 215 px), Abstand ca. 25 px.
- Buttons/Komponenten: Karten als hellgraue Rechtecke mit Rundung ca. 6 px, ohne
  Rahmen, ohne Schatten. Innen oben links ein kleiner dunkler Quadrat-Chip (ca.
  26 px) mit hellgrünem Blitz-Glyph darin — dasselbe Chip-Bauteil wie im
  Hero-Eyebrow. Kein CTA, kein Link.
- Typo: Zweistufig. Kartentitel ca. 19 px Bold, einzeilig. Text darunter ca. 15 px
  Regular in Dunkelgrau, zwei bis drei Zeilen. Sehr ruhig gegenüber dem
  Bento-Raster darüber.
- Farbe/Fläche: Helle Fläche, graue Karten. Akzent nur im Blitz-Glyph.
- Abstände/Rhythmus: Karten-Innenpolster ca. 20 px, zwischen Chip und Titel ca.
  80 px Leerraum — der Chip sitzt oben, der Text unten, die Mitte bleibt leer.
  Direkt unter der Reihe schliesst randlos ein Vollbild-Foto an, ohne Trennfläche.
- Mobil: **nicht belegt**.
- Pattern: `P-PROOF-STRIP` (als Karten-Karussell statt Logoleiste)

### 21 — FAQ und Footer [solaranlagen__-desktop-11-y7500.png | -]
- Anordnung und Bauweise identisch zu Sektion 10 (FAQ mit Sidebar-Reitern und
  Plus-Akkordeon) und Sektionen 11/12 (Trust-Leiste plus Footer-Linkraster). Nur
  die Fragen unterscheiden sich; das Layout, die Outline-Sidebar-Buttons, die
  Plus-Glyphen, die Panel-Fläche und der Footer-Aufbau sind unverändert
  übernommen. Einzige belegbare Abweichung: eine Akkordeon-Zeile bricht hier auf
  zwei Zeilen um und der Plus-Glyph bleibt dabei auf der ersten Zeile oben
  ausgerichtet statt vertikal zu zentrieren.
- Mobil: **nicht belegt**.
- Pattern: `P-FAQ`

## Seite: /stecker-solaranlagen/

Header, Promo-Topbar, Berater-Band, FAQ-Block, Trust-Leiste und Footer wie
Sektionen 01, 15, 10, 11 und 12. Aktives Nav-Label ist hier `Balkonkraftwerke`,
wieder als abgeschwächtes Grau statt kräftig
(`stecker-solaranlagen__-desktop-00-fold.png`).

### 22 — Hero, Split ohne Eyebrow [stecker-solaranlagen__-desktop-00-fold.png | -]
- Anordnung: Derselbe Split-Bauplan wie Sektion 13 — Text links ab ca. 36 px,
  Foto rechts ab ca. 610 px bis zur Viewportkante, mit einer einzelnen sehr gross
  gerundeten oberen rechten Ecke (geschätzt ca. 130-160 px Radius). Unterschied zur
  Solaranlagen-Seite: KEIN Eyebrow und KEIN Lead-Absatz. Die Reihenfolge ist
  reduziert auf H1, dann direkt die Checkliste, dann der CTA. Die Textspalte ist
  dadurch kompakter und beginnt tiefer (ca. 130 px unter dem Header).
- Buttons/Komponenten: Checkliste mit denselben kreisrunden hellgrünen
  Häkchen-Icons (ca. 22 px), hier drei Punkte, alle einzeilig. Der CTA ist im Shot
  nur als oberer Rand einer hellgrünen Fläche angeschnitten
  (`stecker-solaranlagen__-desktop-00-fold.png`, ca. y 573) — Beschriftung und
  Höhe sind wegen des Cookie-Layers **nicht lesbar**, belegt ist nur die Farbe
  (Akzent-Hellgrün) und die Position links unter der Liste. Auf dem Foto liegt hier
  KEIN Pixel-Konfetti, anders als beim Solaranlagen-Hero.
- Typo: H1 dreizeilig, ca. 40 px Bold — grösster Textblock der Spalte, sonst nichts
  darüber. Checklisten-Text ca. 16 px Regular in Dunkelgrau, NICHT Bold wie bei
  Sektion 13. Das ist eine sichtbare Abweichung zwischen zwei sonst identisch
  gebauten Heroes.
- Farbe/Fläche: Hell, kein Farbfeld. Akzent nur in den Häkchen und dem
  angeschnittenen CTA.
- Abstände/Rhythmus: Ca. 50 px H1 zur Liste, Listeneinträge im Abstand von ca.
  40 px, ca. 45 px bis zum CTA — dichter gesetzt als der Solaranlagen-Hero, weil
  die Zwischenstufen fehlen.
- Pattern: `P-HERO-SPLIT`

### 23 — Produktvergleich mit Preisen [stecker-solaranlagen__-desktop-02-y750.png | -]
- Anordnung: Vierspaltiges Layout, bei dem die ERSTE Spalte kein Produkt ist,
  sondern der Sektionskopf: links steht die zweizeilige H2 mit Subline, rechts
  daneben stehen drei Produktkarten. Der Kopf sitzt damit IN der Rasterzeile statt
  darüber — die einzige Sektion der Bibliothek mit dieser Kopf-als-Spalte-Lösung.
  Karten je ca. 320 px breit, gleich hoch, auf gemeinsamer Grundlinie: alle drei
  Preiszeilen und CTAs liegen exakt auf einer Höhe, anders als beim
  Bestseller-Raster der Startseite.
- Buttons/Komponenten: Über dem Kartentitel sitzt ein Kapazitäts-Chip: kleines
  dunkles Quadrat mit hellgrünem Blitz plus Text daneben — dasselbe Chip-Bauteil
  wie im Solaranlagen-Eyebrow und im USP-Karussell. Unter dem Untertitel eine sehr
  kurze horizontale Haarlinie (ca. 120 px, nicht kartenbreit) als Trenner. Preis
  zweizeilig: aktueller Preis gross mit vorangestelltem kleinen `ab`, darunter der
  Streichpreis in Grau mit Durchstreichung — kein Rabatt-Badge, kein farbiges
  Prozentzeichen, die Ersparnis wird allein typografisch erzählt. CTA `Zum
  Komplettset` als gefülltes hellgrünes Rechteck mit Chevron, hier zweizeilig
  umbrochen (Höhe ca. 68 px, breiter als hoch wirkend) — dieselbe Komponente wie
  auf der Startseite, aber mit Zeilenumbruch im Label. Preis und Button stehen
  nebeneinander auf einer Linie, nicht untereinander.
- Typo: H2 zweizeilig ca. 32 px Bold, Subline ca. 16 px Bold direkt darunter ohne
  Abstand. Kartentitel ca. 26 px Bold, zweizeilig. Untertitel ca. 17 px Regular in
  Grau. Merkmalszeilen ca. 16 px Regular in Grau — hier ohne Bullet-Punkte, nur
  als Zeilen mit grossem Zeilenabstand (ca. 43 px), also luftiger und leiser als
  die Bullet-Liste der Startseite. Preis ca. 30 px Regular, Streichpreis ca. 15 px.
- Farbe/Fläche: Helle Fläche, Karten ohne eigene Fläche (nur die Bildfelder haben
  einen hellgrauen Hintergrund). Hinter jedem Produkt liegt wieder die kräftig
  grüne Winkelform als Deko. Drei hellgrüne Buttons in einer Reihe.
- Abstände/Rhythmus: Bildfeld zu Chip ca. 40 px, Titel zu Untertitel ca. 25 px,
  Linie zu Merkmalen ca. 45 px, Merkmale zu Preiszeile ca. 55 px.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: `P-PRICE`

### 24 — Konfigurator-Band, olivfarben [stecker-solaranlagen__-desktop-02-y750.png | -]
- Anordnung: Ein eingerücktes Band (ca. 36 px bis 1390 px, Höhe ca. 130 px) mit
  drei Zonen: links ein Grafik-Glyph, mittig zweizeiliger Text, rechts der CTA.
  Baugleich zum Berater-Band, aber ohne Porträtfoto und ohne Telefonblock.
- Buttons/Komponenten: Erster und einziger belegter OUTLINE-Button auf heller
  Fläche in der ganzen Bibliothek: `Jetzt konfigurieren` mit transparenter
  Füllung, ca. 1,5 px dunkler Kontur, dunklem Label und Chevron, Radius ca. 6 px,
  Höhe ca. 52 px. Alle anderen Outline-Buttons der Site stehen auf dunklem Grund.
  Links im Band ein gezeichnetes Stern-Häkchen-Glyph in Outline-Optik mit einem
  einzelnen roten Strich — der einzige belegte Rot-Einsatz der gesamten
  Bibliothek, sonst gibt es kein Rot im System.
- Typo: Zweizeiliger Satz ca. 19 px Bold in Dunkel, linksbündig. Keine Headline,
  keine Subline. Button-Label ca. 16 px Bold.
- Farbe/Fläche: Das Band trägt denselben stumpfen Oliv-Beige-Ton wie die
  Promo-Topbar — die einzige Stelle im Seitenkörper, an der dieser Ton
  wiederkommt. Er bindet damit Kopf und Mitte der Seite zusammen und ist bewusst
  KEIN Grün.
- Abstände/Rhythmus: Innenpolster ca. 30 px, Glyph zu Text ca. 55 px, sehr grosser
  Leerraum zwischen Text und Button (ca. 370 px).
- Mobil: **nicht belegt**.
- Pattern: `P-CTA-MID` (Fläche ruhig, nur die Aktion mit Kontur — erfüllt S17
  besser als die grünen Bänder)

### 25 — Montageort-Kacheln, fünf Foto-Quadrate [stecker-solaranlagen__-desktop-04-y2250.png | -]
- Anordnung: Zweispaltiger Kopf auf einer Linie (H2 links, erklärender Absatz
  rechts daneben statt darunter — dasselbe Kopfmuster wie Sektion 07, aber mit
  Text statt Tabs). Darunter fünf gleich grosse, nahezu quadratische Foto-Kacheln
  (je ca. 260 x 320 px) in einer Reihe über die Containerbreite. Jede Kachel trägt
  unten links ein Ein-Wort-Label direkt auf dem Foto.
- Buttons/Komponenten: Keine Buttons, kein Plus-Glyph, keine Chevrons — die
  Kacheln sind reine Bild-plus-Label-Flächen. Kachelrundung minimal (geschätzt ca.
  2-4 px), kein Rahmen, kein Schatten. Über dem unteren Kacheldrittel liegt eine
  leichte Abdunklung für die Lesbarkeit des Labels. Die dritte Kachel (`Fassade`)
  zeigt eine sichtbar hellere, ausgewaschene Abdunklung, ihr Label ist deutlich
  schwächer lesbar als bei den vier Nachbarn — ein Kontrastbruch innerhalb einer
  Reihe.
- Typo: H2 zweizeilig ca. 34 px Bold. Absatz rechts ca. 16 px Regular in
  Dunkelgrau, dreizeilig. Kachel-Labels ca. 19 px Bold in Weiss.
- Farbe/Fläche: Hellgraue Sektionsfläche, alle fünf Kacheln sind Foto. Kein
  Akzentgrün in dieser Sektion — eine der wenigen komplett akzentfreien Sektionen.
- Abstände/Rhythmus: Ca. 75 px vom Kopf zur Kachelreihe, Rinnen zwischen den
  Kacheln nur ca. 13 px — die engste Rasterrinne der Bibliothek, die fünf Kacheln
  wirken fast als durchgehender Streifen.
- Mobil: **nicht belegt** in einem eigenen Slice.
- Pattern: `P-GALLERY` (als Varianten-Wahl, nicht als reine Bildstrecke)

### 26 — Community-Bildstrecke mit lila Konfetti [stecker-solaranlagen__-desktop-04-y2250.png | -]
- Anordnung: Kopf wieder zweispaltig (H2 links, Absatz rechts). Darunter eine
  horizontale Bildreihe aus Kundenfotos, am rechten Viewportrand angeschnitten —
  die fünfte Kachel läuft aus dem Bild. Kacheln ca. 320 px breit, unterschiedliche
  Bildqualität (erkennbar Kundenaufnahmen, kein einheitlicher Studio-Crop), was
  die Reihe bewusst roher wirken lässt als die Produktbilder darüber.
- Buttons/Komponenten: Keine Buttons, keine Dots, keine Pfeile. Über der gesamten
  Sektion liegt gestreutes Winkel-Konfetti wie sonst auch — hier aber in einem
  hellen LILA/Violett statt in Grün, und diesmal nicht auf einem Foto, sondern auf
  der hellen Sektionsfläche, wo es teilweise über den Kopftext läuft und ihn
  minimal stört. Das ist der einzige belegte Einsatz einer dritten Akzentfarbe in
  der ganzen Bibliothek.
- Typo: H2 zweizeilig ca. 34 px Bold. Absatz ca. 16 px Regular, zweizeilig.
  Kacheln ohne Text.
- Farbe/Fläche: Sehr helle Fläche, das Lila ist der einzige Farbträger neben den
  Fotos. Kein Grün in dieser Sektion.
- Abstände/Rhythmus: Ca. 100 px Sektionsvorlauf, ca. 70 px vom Kopf zur Bildreihe,
  Rinnen ca. 15 px.
- Mobil: **nicht belegt**.
- Pattern: `P-GALLERY`

### 27 — E-Book-Split [stecker-solaranlagen__-desktop-07-y4500.png | -]
- Anordnung: Zweispaltiger Split am Seitenende, nach dem FAQ-Block und vor dem
  Footer. Links eine schmale Textspalte (ca. 150 px bis 670 px eingerückt, also
  NICHT randbündig wie die Heroes), rechts ein Bild-Mockup mit einem Tablet, das
  ein Porträt zeigt. Die Textspalte startet ca. 60 px höher als das Bild.
- Buttons/Komponenten: Im belegten Bereich kein Button — H1-artige Headline und
  Bild, alles Weitere liegt unter dem Cookie-Layer und ist **nicht belegt**. Im
  Tablet-Bild liegt ein hellgrünes Winkel-Grafikelement über dem Foto, dasselbe
  Deko-Bauteil wie im Bento-Raster.
- Typo: Headline vierzeilig, ca. 36 px Bold, linksbündig, sehr enger
  Zeilenabstand — für eine Sektion so weit unten auf der Seite ungewöhnlich gross,
  fast auf Hero-Niveau.
- Farbe/Fläche: Sehr helle, fast weisse Fläche — heller als die hellgraue
  FAQ-Fläche darüber, der Wechsel ist als klare Kante sichtbar.
- Abstände/Rhythmus: Ca. 175 px vom FAQ-Panel bis zum Sektionsanfang — die
  grösste Sektionslücke dieser Seite.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Lead-Magnet-Split mit Geräte-Mockup

## Seite: /waermepumpen/

Header wie Sektion 01, aber mit einer belegbaren Abweichung: die Promo-Topbar
FEHLT auf dieser Seite komplett (`waermepumpen__-desktop-00-fold.png` — der
Header sitzt direkt am oberen Viewportrand, Höhe ca. 84 px). Berater-Band wie
Sektion 15, Presse-Logoleiste wie Sektion 14, FAQ-Block wie Sektion 10, Footer
wie Sektionen 11/12. Aktives Nav-Label `Wärmepumpen`, wieder abgeschwächt.

### 28 — Hero, Split mit Icon-Eyebrow [waermepumpen__-desktop-00-fold.png | -]
- Anordnung: Derselbe Split-Bauplan wie Sektionen 13 und 22, mit einem
  Unterschied im Detail: das Foto rechts beginnt hier ca. 55 px tiefer und
  schliesst nicht ganz oben an, wodurch über dem Bild ein breiter heller Streifen
  bleibt. Die grosse Eckenrundung sitzt wieder oben rechts (geschätzt ca.
  130-160 px). Reihenfolge links: Eyebrow-Chip, H1, ein einzelner Checkpunkt.
- Buttons/Komponenten: Eyebrow als dunkler Quadrat-Chip mit hellgrünem Blitz plus
  Text — identisch zu Sektion 13. Nur EIN Checkpunkt mit hellgrünem Kreis-Häkchen,
  dafür dreizeilig; die anderen Seiten haben zwei bis drei einzeilige Punkte. Der
  CTA liegt unter dem Cookie-Layer und ist **nicht belegt**. Auf dem Foto liegt
  oben rechts das hellgrüne Pixel-Konfetti, hier deutlich dichter gestreut als auf
  der Solaranlagen-Seite und über die gerundete Ecke hinauslaufend.
- Typo: H1 dreizeilig ca. 38 px Bold — sie füllt die Spalte fast randvoll, ein
  Wort (`Moderne`) rutscht dabei über die optische Spaltenkante hinaus nach rechts
  und steht damit als einziges Element vor dem Foto. Eyebrow ca. 15 px Bold.
  Checkpunkt-Text ca. 16 px Bold, dreizeilig.
- Farbe/Fläche: Hell. Kein Farbfeld, kein Dunkel. Akzent nur in Chip-Glyph,
  Häkchen und Konfetti.
- Abstände/Rhythmus: Textspalte beginnt ca. 240 px unter dem Header — deutlich
  tiefer als die anderen Heroes, weil hier weniger Elemente stehen und der Block
  optisch mittig gesetzt ist. Ca. 30 px Eyebrow zu H1, ca. 45 px H1 zum Checkpunkt.
- Mobil: **nicht belegt** in diesem Slice.
- Pattern: `P-HERO-SPLIT`

### 29 — Rechner-Sektion, Wiederholung [waermepumpen__-desktop-04-y2250.png | -]
- Anordnung, Bauweise, Buttonfarbe, Checkpunkt-Glyphen, Foto-Position und
  Ton-in-Ton-Konfetti exakt wie Sektion 16 auf der Solaranlagen-Seite — dasselbe
  hellgrüne Vollfeld mit Foto links, Text rechts und dunkelgrünem `Los geht's`-CTA
  (Höhe ca. 52 px, Breite ca. 140 px). Belegbarer Unterschied nur im Foto
  (Wärmepumpe statt Hausansicht) und in der Feldhöhe: das Feld ist hier flacher
  (ca. 520 px statt ca. 670 px), weil der Lead kürzer ist. Die drei Checkpunkte
  sind wortgleich und in derselben Reihenfolge gesetzt — dasselbe
  Funnel-Bauteil, zweimal montiert.
- Pattern: `P-CTA-MID` (Akzent-Vollfläche, S1/S17-Spannung wie Sektion 16)

### 30 — Förderstaffel als Foto-Overlay-Panel [waermepumpen__-desktop-04-y2250.png | -]
- Anordnung: Ein containerbreites Foto (ca. 36 px bis 1390 px) mit mehreren
  aufgesetzten Ebenen. Oben links liegt die Headline direkt auf dem Bild. Darunter,
  ebenfalls auf dem Foto, ein dunkelgrünes Panel, das nur die linke Bildhälfte
  einnimmt (ca. 490 px breit) und dessen obere rechte Ecke mit sehr grossem Radius
  gerundet ist (geschätzt ca. 100 px) — dieselbe Riesen-Ecke wie bei den
  Hero-Fotos, hier auf einem Farbpanel statt auf einem Bild. Im Panel ein 2x2-Raster
  aus Prozentwerten. Unter dem Panel ein zweites, helleres Feld mit Plus-Glyph und
  Text. Rechts unten auf dem Bild ein CTA. Oben rechts ein grosser
  Signalgrün-Plus-Glyph als Deko.
- Buttons/Komponenten: CTA `Zur kostenlosen Erstberatung` als gefülltes hellgrünes
  Rechteck mit Chevron, unten rechts auf das Foto gesetzt (Höhe ca. 52 px). Die
  vier Zellen des 2x2-Rasters sind je durch eine dünne hellgrüne Unterlinie
  abgeschlossen (ca. 175 px breit) — nicht durch Kartenflächen, sondern durch
  Linien gegliedert. Der Plus-Glyph im unteren Feld ist ein hellgrünes Vollzeichen
  und dient hier als Aufzählungsmarke, nicht als Affordance.
- Typo: Headline dreizeilig ca. 34 px Bold in Weiss auf dem Foto, ohne
  Abdunklung darunter — sie steht auf einer hellen Hausfassade und ist deshalb
  merklich kontrastschwach. Im Panel dreistufig je Zelle: Prozentzahl ca. 34 px
  Regular in Akzent-Hellgrün mit kleinerem `%`-Suffix, darunter das Label ca. 15 px
  Bold in Hellgrün, darunter eine Zeile ca. 14 px Regular in gedämpftem Weiss.
  Ganz unten eine Fussnote ca. 12 px. Fünf Textgrössen in einem Panel.
- Farbe/Fläche: Foto plus dunkelgrünes Panel plus helles Zweitfeld plus hellgrüner
  Button — vier Ebenen auf einer Fläche. Die dichteste Overlay-Schichtung der
  Bibliothek.
- Abstände/Rhythmus: Panel-Innenpolster ca. 40 px, Rasterzellen im vertikalen
  Abstand von ca. 55 px. Die Headline sitzt ca. 45 px unter der Bildkante.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Förder-Panel als Overlay auf Vollbild

### 31 — Vierer-Textraster, Wiederholung mit eigenem Icon-Set [waermepumpen__-desktop-06-y3750.png | -]
- Anordnung und Gliederung identisch zu Sektion 17: zwei mal zwei Textzellen,
  jede links von einer vertikalen Haarlinie begrenzt, Piktogramm über Titel über
  Absatz.
- Buttons/Komponenten: Anders als bei Sektion 17 hat hier JEDE Zelle ein eigenes
  Piktogramm statt eines wiederholten Markensymbols: ein Stern mit Häkchen und ein
  Pixel-/Winkel-Cluster sind belegt, beide als Outline-Zeichnung in Dunkel mit
  einem einzelnen hellgrünen Akzentstrich. Die Icons sind ca. 40 px gross und
  visuell uneinheitlich (ein figuratives Zeichen neben einem abstrakten
  Pixelmuster).
- Typo: Zelltitel ca. 21 px Bold, ein- bis zweizeilig. Absatz ca. 17 px Regular in
  Dunkelgrau, drei bis fünf Zeilen. Wie Sektion 17.
- Farbe/Fläche: Hellgraue Fläche, keine Karten. Akzent nur im Icon-Strich.
- Abstände/Rhythmus: Zeilenabstand zwischen den Rasterreihen ca. 55 px, danach ein
  sehr grosser Leerblock (ca. 120 px) vor dem nächsten Sektionskopf.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Vierer-Textraster mit vertikalen Trennlinien (wie Sektion 17)

### 32 — Modell-Überblick, Akkordeon neben Produktbild [waermepumpen__-desktop-06-y3750.png | -]
- Anordnung: Zentrierter zweizeiliger H2, darunter eine grosse helle Panel-Fläche
  (ca. 150 px bis 1280 px, also eingerückt statt containerbreit) mit einem Split
  im Inneren: links ein Akkordeon, rechts ein freigestelltes Produktfoto. Die obere
  linke Ecke der Panel-Fläche ist gerundet (geschätzt ca. 30 px) — deutlich
  kleiner als die Riesen-Ecken der Heroes, aber sichtbar mehr als die üblichen
  4-8 px.
- Buttons/Komponenten: Das einzige belegte OFFENE Akkordeon der ganzen
  Bibliothek: der erste Eintrag `Ideal für die Modernisierung` ist ausgeklappt und
  zeigt darunter einen Fliesstextabsatz. Der Umschalter ist hier ein CHEVRON nach
  oben am rechten Rand der Zeile — nicht der Plus-Glyph der FAQ-Blöcke und nicht
  links, sondern rechts. Zwei verschiedene Akkordeon-Bauteile im selben Design
  System, unterscheidbar an Glyph und Glyph-Position.
- Typo: H2 zweizeilig ca. 40 px Bold zentriert. Akkordeon-Titel ca. 22 px Bold.
  Geöffneter Absatz ca. 17 px Regular in Grau, vierzeilig.
- Farbe/Fläche: Sehr helles Panel auf hellgrauer Sektionsfläche — der
  Helligkeitsunterschied ist minimal, das Panel ist kaum als eigene Fläche
  erkennbar. Kein Akzent in dieser Sektion belegt.
- Abstände/Rhythmus: Ca. 120 px vom Raster zum H2, ca. 70 px vom H2 zum Panel,
  Panel-Innenpolster ca. 35 px.
- Mobil: **nicht belegt**.
- Pattern: `P-FAQ` (als Produkt-Detailakkordeon mit Chevron statt Plus)

### 33 — Kostenvergleich als Balkendiagramm auf Dunkel [waermepumpen__-desktop-08-y5250.png | -]
- Anordnung: Eine randlose, vollflächig dunkelgrüne Sektion über die ganze
  Viewportbreite — die einzige randlose Dunkelsektion ausserhalb des Footers.
  Innen linksbündig ein zweizeiliger H2, darunter vier horizontale Balken
  untereinander, deren Länge dem dargestellten Wert entspricht (der längste oben,
  der kürzeste an dritter Stelle). Jeder Balken trägt links das Label und rechts am
  Balkenende den Wert — der Wert wandert also mit der Balkenlänge nach links und
  steht nicht auf einer festen Spalte. Darunter zwei Blöcke Fussnotentext.
- Buttons/Komponenten: Kein Button, keine Legende, keine Achse, keine Gitterlinien.
  Die Balken sind reine Rechtecke mit leichter Rundung (geschätzt ca. 4 px) und
  arbeiten mit einer Grünstaffel: die drei oberen in blass-mattem Salbeigrün, der
  unterste (`WP + PV & Speicher`) im vollen Akzent-Hellgrün. Der Akzentbalken
  markiert damit das Zielangebot, ohne Beschriftung oder Badge — die Farbe allein
  trägt die Aussage. Balkenhöhe ca. 78 px, sehr wuchtig.
- Typo: H2 zweizeilig ca. 44 px Bold in einem gedämpften Hellgrau-Grün, nicht in
  reinem Weiss. Balken-Labels ca. 17 px Regular in Dunkel auf hellem Balken,
  Werte ca. 38 px Regular — nicht Bold, obwohl es die Kernaussage ist. Fussnoten
  ca. 13 px Regular in gedämpftem Weiss, mit einzelnen fett gesetzten
  Teilstrings.
- Farbe/Fläche: Tannengrün-Vollfläche, darauf eine dreistufige Grünstaffel. Das
  ist die einzige Stelle der Bibliothek, an der mit Farbabstufungen statt mit
  einem einzigen Akzentton gearbeitet wird.
- Abstände/Rhythmus: Sektions-Padding ca. 110 px oben, ca. 100 px vom H2 zum
  ersten Balken, Balkenabstand ca. 25 px, ca. 40 px bis zur Fussnote.
- Mobil: **nicht belegt**.
- Pattern: Kandidat: Balkenvergleich auf Dunkelfläche mit Akzent-Zielbalken

### 34 — Prozess-Schlange, neun Schritte [waermepumpen__-desktop-09-y6000.png | -]
- Anordnung: Zentrierter Kopf (H2 plus Subline), darunter ein Ablaufdiagramm in
  Schlangenform: drei Zeilen zu je drei Stationen, verbunden durch gestrichelte
  Linien mit Pfeilspitzen. Zeile eins läuft nach rechts, dann führt ein gerundeter
  Bogen nach unten, Zeile zwei läuft nach LINKS zurück, wieder ein Bogen, Zeile
  drei nach rechts. Die Stationen sind horizontal nicht auf einem Raster
  ausgerichtet, sondern folgen der Textbreite — die Reihe wirkt dadurch bewusst
  handgezeichnet statt tabellarisch.
- Buttons/Komponenten: Jede Station ist eine echte VOLLPILLE (Radius = halbe
  Höhe, Höhe ca. 30 px) in Akzent-Hellgrün mit dunklem Label — der einzige
  belegte Pilleneinsatz der Bibliothek ausserhalb der Tab-Segmented-Controls, und
  der einzige Ort, an dem die Akzentfarbe neunmal in einer Sektion auftritt. Keine
  Nummerierung, keine Icons in den Pillen. Verbindungslinien sind dünn und
  gestrichelt in Dunkelgrau, die Bögen an den Zeilenenden sind grosszügig gerundet.
- Typo: H2 einzeilig ca. 34 px Bold zentriert, darunter Subline ca. 20 px Bold —
  wieder Bold statt Regular. Pillen-Labels ca. 14 px Bold, alle einzeilig.
- Farbe/Fläche: Helle Sektionsfläche, neun hellgrüne Pillen als einziger
  Farbträger. Sehr leichte, fast diagrammartige Anmutung.
- Abstände/Rhythmus: Ca. 90 px vom Kopf zum Diagramm, Zeilenabstand im Diagramm
  ca. 105 px. Direkt darunter folgt ohne grosse Lücke (ca. 55 px) das
  Berater-Band aus Sektion 15, hier in einer verkürzten Variante OHNE Telefonblock
  — nur Porträt, Frage und das Button-Paar, wodurch die Buttons weiter nach rechts
  rutschen.
- Mobil: **nicht belegt**.
- Pattern: `P-PROCESS-3` (hier als neunstufige Schlange statt dreistufig)

### 35 — USP-Karussell und Presseleiste [waermepumpen__-desktop-11-y7500.png | -]
- Anordnung: Dieselbe an beiden Rändern angeschnittene Kartenreihe wie Sektion 20
  (fünf hellgraue Karten mit dunklem Blitz-Chip oben links, Titel, zwei bis drei
  Zeilen Text), unmittelbar darunter ohne Zwischenfläche die Presse-Logoleiste aus
  Sektion 14. Beide Leisten liegen auf derselben hellgrauen Fläche und sind nur
  durch ca. 60 px Luft getrennt — zwei Trust-Elemente direkt gestapelt.
- Buttons/Komponenten: Wie Sektion 20 und 14, keine Abweichung belegt. Auffällig:
  die Karten dieser Reihe sind unterschiedlich hoch befüllt, der Text der dritten
  Karte beginnt sichtbar tiefer als der der zweiten, weil deren Titel zweizeilig
  ist — die Titel sind oben ausgerichtet, die Texte dadurch nicht.
- Typo: Kartentitel ca. 19 px Bold, Text ca. 15 px Regular. Wie Sektion 20.
- Farbe/Fläche: Hellgrau, Akzent nur in den Blitz-Glyphen.
- Abstände/Rhythmus: Ca. 60 px zwischen Kartenreihe und Logoleiste, ca. 55 px
  darunter bis zur nächsten Sektionsfläche.
- Mobil: **nicht belegt**.
- Pattern: `P-PROOF-STRIP`

### 36 — Ressourcenhub [waermepumpen__-desktop-11-y7500.png | -]
- Anordnung und Bauweise wie Sektion 10 (FAQ mit Sidebar-Reitern und
  Plus-Akkordeon), mit zwei belegbaren Abweichungen: der H2 lautet hier
  `Ressourcenhub` statt `Häufige Fragen & Videos`, und die Sidebar hat nur ZWEI
  Einträge (`FAQs` aktiv gefüllt dunkel, `Beratung` als Outline) statt drei — der
  `Videos`-Reiter fehlt. Ausserdem fehlt der Segmented-Control-Umschalter rechts
  neben dem H2, den die Startseite an dieser Stelle hat. Der Kopf steht damit
  allein linksbündig.
- Buttons/Komponenten: Sidebar-Buttons identisch (Höhe ca. 78 px, Radius ca. 8 px,
  Icon links, aktiv gefüllt / inaktiv Outline). Akkordeon-Zeilen mit Plus-Glyph
  links, alle geschlossen.
- Typo: H2 ca. 42 px Bold. Sidebar-Labels ca. 19 px Bold. Fragen ca. 20 px Bold,
  eine Frage bricht auf zwei Zeilen um.
- Farbe/Fläche: Hell auf hell, Akzent nur in den Sidebar-Icons.
- Abstände/Rhythmus: Ca. 85 px von der Logoleiste zum H2, ca. 75 px vom H2 zum
  Split.
- Mobil: **nicht belegt**.
- Pattern: `P-FAQ`

## Seite: /ueber-uns/

Header, Promo-Topbar, Trust-Leiste und Footer sind identisch zur Startseite —
siehe Sektionen 01, 11 und 12. Eine belegbare Abweichung im Kopf: die
Promo-Topbar fehlt auf dieser Seite komplett, der Header sitzt direkt an der
Viewport-Oberkante (`ueber-uns__-desktop-00-fold.png`); kein Nav-Label ist als
Aktiv-Zustand ausgezeichnet, obwohl `Über uns` als Ziel im Footer existiert.
Diese Seite ist die einzige der Bibliothek, auf der kein einziger Button in
Akzent-Hellgrün mit dunklem Label als Primär-CTA im Fold steht.

### 37 — Hero, dunkle Karte mit Riesen-Ecke und Pixel-Konfetti [ueber-uns__-desktop-00-fold.png, ueber-uns__-desktop-01-y0.png | ueber-uns__-mobile-00-fold.png]
- Anordnung: Kein Foto, kein Split — der Hero ist eine einzelne dunkle Fläche als
  eingerückte Karte: sie beginnt bei ca. 36 px vom linken Rand, endet bei ca.
  1404 px und ist ca. 445 px hoch (y 133 bis 578 im Slice `ueber-uns__-desktop-01-y0.png`). Die
  Karte schwebt also mit sichtbarem Rand auf der Seitenfläche statt randlos zu
  laufen — die einzige Hero-Fläche der Bibliothek, die an allen vier Seiten
  Abstand hält. Die obere rechte Ecke trägt einen sehr grossen Radius (geschätzt
  ca. 130-160 px), die anderen drei Ecken sind spitz; die Riesen-Ecke sitzt hier
  also rechts oben, während sie in den Produkt-Heroes (Sektion 13, 22, 28) links
  oben auf dem Foto sitzt. Die H1 steht linksbündig ab ca. 78 px Innenabstand,
  vertikal unten in der Karte (Grundlinie ca. 55 px über der Unterkante), nicht
  mittig — der obere Zweidrittelbereich bleibt der Deko vorbehalten.
- Buttons/Komponenten: Kein Button, kein Eyebrow, kein Lead, keine Checkliste,
  kein Breadcrumb — der Hero besteht aus genau zwei Elementen: Headline und
  Deko-Muster. Die Deko ist das sitewide Pixel-Konfetti in einer sehr grossen
  Dichte: ca. 25 einzelne Winkel-/L-Glyphen in zwei Grössen, diagonal von rechts
  oben nach links unten gestreut, alle in derselben Rotation (Ecke offen nach
  rechts unten). Die Glyphen haben leicht unterschiedliche Deckkraft — die
  oberen sind kräftiger, die unteren blasser, wodurch ein Fallen-/Regen-Eindruck
  entsteht. Auf keiner anderen Seite tritt das Muster in dieser Menge auf; dort
  sind es je 5-8 Glyphen als Beigabe.
- Typo: Einstufig. H1 `Über uns` einzeilig, ca. 52-56 px, geometrische Grotesk
  Bold, gemischte Schreibweise, kein Letterspacing (geschätzt). Kein Untertitel,
  keine Subline. Das ist die kürzeste Headline der Bibliothek und zugleich die
  einzige, die allein auf einer Fläche steht.
- Farbe/Fläche: Kartenfläche fast schwarz mit Grünstich, gemessen `#020e12` oben
  links und `#020b12` in der oberen Mitte — merklich dunkler und kühler als das
  Tannengrün `#132219` des Footers (gemessen in
  `ueber-uns__-desktop-07-y4433.png`). Innerhalb der Karte läuft ein sehr
  flacher Verlauf von fast Schwarz oben nach leicht Grün unten. Die
  Konfetti-Glyphen messen `#82a265` — ein deutlich abgedunkeltes, entsättigtes
  Akzentgrün, nicht das reine Akzent-Hellgrün der CTAs; der Overlay-Schleier
  dämpft diesen Wert zusätzlich, der wahre Ton liegt heller (Schätzung). Die
  Seitenfläche rundherum misst `#cdd2da`, ein kühles Blaugrau — das ist der
  Overlay-Effekt auf der Creme-Grundfläche, nicht die echte Flächenfarbe
  (Schätzung, Overlay).
- Abstände/Rhythmus: Ca. 55 px vom Header-Unterrand zur Kartenoberkante, ca.
  160 px von der Kartenunterkante bis zum ersten Textabsatz. Die Karte selbst hat
  ca. 78 px Innenabstand links. Sehr luftig für eine reine Titelfläche.
- Mobil: gestapelt und deutlich kleiner (`ueber-uns__-mobile-00-fold.png`). Die
  dunkle Karte bleibt eine eingerückte Karte (ca. 16 px Rand links und rechts),
  Höhe ca. 305 px, die Riesen-Ecke oben rechts bleibt erhalten und wirkt bei der
  geringeren Breite proportional noch stärker. H1 auf ca. 27 px, weiterhin
  einzeilig, linksbündig ca. 20 px vom Kartenrand, weiterhin unten sitzend. Das
  Konfetti bleibt in voller Dichte und füllt hier fast die gesamte Kartenfläche,
  weil die Fläche kleiner ist — mobil wirkt die Deko dadurch dominanter als
  desktop. Der Header ist in diesem Shot von der Cookie-Karte überdeckt und
  damit **nicht belegt** (Overlay).
- Pattern: Kandidat: Titelfläche als eingerückte Dunkelkarte ohne CTA

### 38 — Fliesstext-Block mit Zwischenüberschriften [ueber-uns__-desktop-01-y0.png, ueber-uns__-desktop-02-y750.png | ueber-uns__-mobile-00-fold.png]
- Anordnung: Eine einspaltige Textkolumne, zentriert im Viewport, aber deutlich
  schmaler als der Container der anderen Seiten: sie läuft von ca. 375 px bis
  ca. 1050 px, also ca. 675 px breit bei 1440 px Viewport — links bleiben ca.
  375 px, rechts ca. 390 px leer. Kein Bild, keine Karte, keine Sidebar, kein
  Inhaltsverzeichnis. Abfolge: Einleitungsabsatz, zweiter Absatz, H2, Absatz, H2
  (dreizeilig), zwei Absätze. Die H2 sitzen linksbündig auf derselben Kante wie
  der Fliesstext, ohne Einzug und ohne Marker.
- Buttons/Komponenten: Keine. Der längste komponentenfreie Abschnitt der ganzen
  Bibliothek — über ca. 900 px Höhe kein Button, kein Icon, kein Chip, keine
  Linie, keine Fläche. Auch kein Inline-Link im Fliesstext belegt.
- Typo: Zweistufig. H2 der ersten Ebene (`Was uns motiviert`) ca. 30 px Bold
  einzeilig; die zweite H2 (`Unsere Mission: …`) ist im selben Grad gesetzt,
  bricht aber auf drei Zeilen mit sehr engem Zeilenabstand — beide Überschriften
  tragen denselben Grad, es gibt also keine Hierarchiestufe zwischen ihnen.
  Fliesstext ca. 17 px Regular in Dunkelgrau, Zeilenabstand grosszügig (ca.
  24 px), Absätze drei bis fünf Zeilen. Absatzabstand statt Einzug. Auffällig:
  ein Zahlenwert im Fliesstext (`über 48 GWh`) ist NICHT hervorgehoben — kein
  Bold, kein Akzent, keine Auszeichnung, obwohl die Seite dieselbe Art Zahl
  direkt darunter als grosse Stat-Karte inszeniert.
- Farbe/Fläche: Reine Seitenfläche ohne eigene Sektionsfarbe (gemessen `#cdd2da`
  in `ueber-uns__-desktop-02-y750.png` bei x200/y400 — Overlay-gedimmte
  Creme-Fläche, Schätzung). Kein Akzent in der gesamten Sektion, keine
  Trennlinie zwischen den Textblöcken.
- Abstände/Rhythmus: Ca. 55 px zwischen zwei Absätzen derselben Ebene, ca. 75 px
  vom letzten Absatz zur nächsten H2, ca. 30 px von H2 zum folgenden Absatz. Der
  Rhythmus arbeitet also mit einem klaren Vorne-mehr-Hinten-weniger-Prinzip um
  jede Überschrift. Ca. 145 px vom letzten Absatz bis zu den Stat-Karten.
- Mobil: einspaltig über die volle Breite abzüglich ca. 16 px Rand
  (`ueber-uns__-mobile-00-fold.png`). Fliesstext auf ca. 15 px, Zeilenlänge
  dadurch kurz (ca. 40 Zeichen). Die Textkolumne beginnt mobil ca. 125 px unter
  der Hero-Karte — der grosse Weissraum bleibt also auch mobil erhalten und wird
  nicht zusammengezogen.
- Pattern: Kandidat: Schmale Fliesstext-Kolumne ohne jede Komponente

### 39 — Stat-Karten, drei hellgrüne Kacheln [ueber-uns__-desktop-02-y750.png, ueber-uns__-desktop-03-y1500.png | ueber-uns__-mobile-05-y1688.png]
- Anordnung: Drei gleich breite, gleich hohe Kacheln nebeneinander in einem
  Dreierraster, das von ca. 263 px bis ca. 1160 px läuft — es ist damit weder
  auf die schmale Textkolumne darüber (375-1050 px) noch auf den vollen
  Container ausgerichtet, sondern auf eine dritte, eigene Breite. Kachelbreite
  ca. 296 px, Höhe ca. 210 px, Abstand dazwischen ca. 8 px — die Kacheln stehen
  fast auf Stoss, deutlich enger als jede andere Kartenreihe der Bibliothek. Der
  Inhalt jeder Kachel ist zentriert und dreistufig gestapelt: Eyebrow, Grosszahl,
  Label.
- Buttons/Komponenten: Kein Button, kein Icon, kein Link. Die Kacheln sind reine
  Rechtecke ohne sichtbare Rundung (Radius 0 oder sehr klein, geschätzt unter
  4 px) und ohne Rahmen oder Schatten — anders als die dunklen Stat-Kacheln der
  Startseite (Sektion 09). Die Grosszahl trägt Ziffern-Trennpunkte auf halber
  Höhe (`130·`, `90·000·`, `640·`) als Zierelement, und die Einheit (`Mio.`,
  `t`) steht als kleineres Suffix auf der Grundlinie neben der Zahl. Bei der
  mittleren Kachel steht die Fussnoten-Sternchen direkt im Label, die
  Zeitangabe `(Stand: August 2025)` als zweite Labelzeile in Klammern.
- Typo: Dreistufig je Kachel. Eyebrow `mehr als` ca. 14 px Bold, mittig. Grosszahl
  ca. 62-66 px, geometrische Grotesk Regular bis Medium — nicht Bold, obwohl es
  das dominierende Element ist. Label ca. 14 px Bold, zwei Zeilen, zentriert, mit
  sehr engem Zeilenabstand. Alles in derselben dunklen Textfarbe, kein
  Weiss-auf-Grün-Kontrast.
- Farbe/Fläche: Kachelfläche gemessen `#a3ca70` (in `ueber-uns__-desktop-02-y750.png` bei x300/y840
  und x700/y840) — das Akzent-Hellgrün unter dem Overlay-Schleier; der wahre Ton
  liegt heller und gesättigter (Schätzung, Overlay). Text darauf fast schwarz,
  gemessen `#112226` am Kachelrand. Die Fläche zwischen und um die Kacheln ist
  die normale Seitenfläche. Drei Akzent-Vollflächen direkt nebeneinander sind die
  dichteste Akzentnutzung dieser Seite.
- Abstände/Rhythmus: Ca. 145 px vom Fliesstext zur Kachelreihe, Innenpolster der
  Kacheln ca. 40 px oben und unten, ca. 95 px von der Kachelreihe zur folgenden
  H2 `Unser Team`.
- Mobil: gestapelt zu drei vollbreiten Kacheln untereinander
  (`ueber-uns__-mobile-05-y1688.png`), Rand ca. 16 px, Kachelhöhe ca. 205 px,
  Abstand dazwischen ca. 16 px — mobil also DEUTLICH mehr Luft zwischen den
  Kacheln als desktop (8 px), das Verhältnis kehrt sich um. Grosszahl bleibt
  gross (ca. 58 px), Eyebrow und Label bleiben zentriert. Der Nach-oben-Pfeil des
  Sticky-Scroll-Buttons (graues abgerundetes Quadrat, ca. 40 px) liegt unten
  rechts über der Fläche.
- Pattern: `P-PROOF-STRIP`-Variante (Zahlen-Kacheln in Akzent-Vollfläche; vgl.
  Sektion 09, dort dieselbe Bauform in Dunkelgrün statt Hellgrün)

### 40 — Team-Slider, Porträtkarten mit Zitat [ueber-uns__-desktop-03-y1500.png, ueber-uns__-desktop-04-y2250.png | ueber-uns__-mobile-07-y2532.png]
- Anordnung: Kopfblock in der schmalen Textkolumne (H2 plus zwei Absätze,
  linksbündig ab ca. 375 px), darunter ein horizontales Karussell, das über die
  volle Breite von ca. 36 px bis über die rechte Viewportkante hinausläuft — die
  vierte Karte ist am rechten Rand angeschnitten und signalisiert so den Scroll.
  Karten ca. 425 px breit, ca. 375 px hoch, Abstand ca. 30 px. Der Kopf sitzt
  damit in einem anderen Raster als das Karussell darunter: die H2 beginnt bei
  375 px, die erste Karte bei 36 px — eine sichtbare Kantenverschiebung.
  Karteninhalt zentriert gestapelt: Porträt, Name, Rolle, Zitat.
- Buttons/Komponenten: Karten als flache Rechtecke ohne Rundung und ohne
  Schatten, minimal dunkler als die Sektionsfläche. Das Porträtfoto ist ein
  Hochformat-Rechteck (ca. 130 x 105 px) mit oberer linker Rundung — dieselbe
  Riesen-Ecken-Geste wie in den Heroes, hier im Miniaturformat; KEIN
  Kreis-Avatar, obwohl das Token-Set `50%` für Avatare vorsieht. Hinter dem
  Porträt liegt in jeder Karte ein feines hellgrünes Konfetti-Feld aus sehr
  kleinen Winkel-Glyphen, das die ganze Kartenfläche füllt — die Karte ist damit
  die einzige Stelle, an der die Marken-Deko als Kartentextur statt als
  Akzentbeigabe genutzt wird. Vor dem Zitat steht ein kleines dunkles
  Anführungszeichen-Icon links auf der ersten Zeile, nicht darüber. Die
  Slider-Steuerung sitzt unter dem Karussell rechtsbündig als zwei quadratische
  Outline-Buttons (ca. 40 px, Radius geschätzt ca. 6 px) mit Chevron links und
  rechts — der Zurück-Button ist ausgegraut dargestellt (Anfangszustand), der
  Vor-Button dunkel umrandet. Keine Dots. Darunter zentriert genau ein CTA
  `Werde Teil unseres Teams` mit Chevron: leicht gerundetes Rechteck, gefüllt in
  Akzent-Hellgrün mit dunklem Label, Höhe ca. 45 px, Breite ca. 247 px — der
  einzige gefüllte Akzent-CTA der ganzen Seite.
- Typo: H2 `Unser Team` ca. 44 px Bold, einzeilig — grösser als die H2 der
  Textsektion darüber (ca. 30 px), obwohl beide auf derselben Ebene stehen. Zwei
  Absätze darunter ca. 17 px Regular. In der Karte: Name ca. 20 px Bold in
  Dunkelgrün, direkt darunter die Rolle ca. 16 px Bold in fast Schwarz — zwei
  Bold-Zeilen direkt übereinander, unterschieden nur durch Grad und Farbe. Zitat
  ca. 16 px Regular, drei Zeilen, linksbündig statt zentriert, obwohl Name und
  Rolle zentriert sind — ein Achsenbruch innerhalb der Karte. CTA-Label ca. 16 px
  Bold.
- Farbe/Fläche: Kartenfläche gemessen `#c4c7cb`-nah (leicht dunkler als die
  Seitenfläche `#cdd2da`), also nur ein minimaler Helligkeitssprung ohne Rahmen.
  Konfetti-Textur in blassem Hellgrün. Name in Dunkelgrün, Rolle und Zitat in
  fast Schwarz. Der einzige gesättigte Akzent ist die CTA-Fläche.
- Abstände/Rhythmus: Ca. 95 px von den Stat-Karten zur H2, ca. 30 px von H2 zum
  ersten Absatz, ca. 50 px vom Textblock zum Karussell, ca. 45 px vom Karussell
  zur Steuerung, ca. 100 px bis zum CTA. Karten-Innenpolster ca. 35 px.
- Mobil: eine Karte pro Ansicht über die volle Breite abzüglich ca. 16 px Rand
  (`ueber-uns__-mobile-07-y2532.png`), Kartenhöhe ca. 330 px, keine
  angeschnittene Nachbarkarte — mobil geht der Scroll-Hinweis durch das Anschnitt
  also verloren und wird allein von den Pfeil-Buttons getragen. Die
  Steuerungspfeile sitzen mobil rechtsbündig direkt unter der Karte, der CTA
  darunter linksbündig statt zentriert und schmaler (ca. 245 px von 375 px
  Viewport). Porträt, Konfetti-Textur, Name-Rolle-Zitat-Reihenfolge unverändert.
- Pattern: Kandidat: Team-Karussell mit Konfetti-Textur und Rechteck-Porträt

### 41 — Zeitstrahl mit Akzent-Linie und Zitatkasten [ueber-uns__-desktop-04-y2250.png, ueber-uns__-desktop-05-y3000.png | ueber-uns__-mobile-09-y3376.png]
- Anordnung: Zentrierte H2 über einem vertikalen Zeitstrahl. Links bei ca.
  345 px läuft eine durchgehende senkrechte Linie, auf der vier grosse dunkle
  Punkte sitzen; rechts davon ab ca. 410 px die Inhaltsspalte (Breite ca. 665 px)
  mit Titel, Absätzen und einem eingeschobenen Zitatkasten. Die Punkte sitzen
  nicht auf gleichen Abständen, sondern jeweils auf der Oberkante des zugehörigen
  Textblocks — der Rhythmus folgt dem Inhalt, nicht einem Raster. Die Linie
  beginnt am ersten Punkt und endet ca. 20 px unter dem letzten Textblock, sie
  läuft also nicht über die volle Sektionshöhe. Der H2 steht zentriert, die
  Inhaltsspalte linksbündig — wieder ein Achsenwechsel innerhalb einer Sektion.
- Buttons/Komponenten: Kein Button, kein Datum-Badge, keine Jahreszahl-Marker an
  den Punkten — die Stationen sind unbeschriftet, die Chronologie steht nur im
  Fliesstext. Die Punkte sind volle Kreise (ca. 26 px) in fast Schwarz, nicht in
  Akzentfarbe; die Verbindungslinie dagegen ist ca. 7 px breit in
  Akzent-Hellgrün — Marker dunkel, Linie grün, also die umgekehrte Aufteilung zur
  üblichen Konvention. Der Zitatkasten in der Mitte des Strahls ist ein
  vollflächiges Akzent-Rechteck ohne Rundung (ca. 675 px breit, ca. 165 px hoch)
  mit zweizeiligem Zitat in Anführungszeichen und einer fetten Schlusszeile
  darunter — kein Anführungszeichen-Icon, keine Quellenangabe, kein Autor.
- Typo: H2 `Unsere Geschichte` ca. 46 px Bold zentriert. Blocktitel darunter ca.
  22 px Bold, zweizeilig. Fliesstext ca. 17 px Regular in Dunkelgrau. Im
  Zitatkasten: Zitat ca. 22 px Bold zweizeilig, Schlusszeile ca. 15 px Bold —
  beide Bold, kein Regular-Kontrast im Kasten. Hochgestellte Einheiten im
  Fliesstext (`50-m²`, `4.000 m²`) sind als echte Superskripte gesetzt.
- Farbe/Fläche: Linie und Zitatkasten gemessen `#a3ca70` (in
  `ueber-uns__-desktop-04-y2250.png` bei x345/y700 und x700/y800) — dasselbe
  overlay-gedimmte Akzent-Hellgrün wie die Stat-Karten, die Seite nutzt also
  exakt einen Akzentton für Kachel, Linie und Kasten (Schätzung, Overlay). Punkte
  gemessen `#112226`. Sektionsfläche unverändert die Seitenfläche, kein eigener
  Grund.
- Abstände/Rhythmus: Ca. 90 px vom CTA der Team-Sektion zur H2, ca. 55 px von der
  H2 zum ersten Blocktitel, Abstand zwischen den Textblöcken ca. 50 px, um den
  Zitatkasten je ca. 50 px Luft. Kasten-Innenpolster ca. 40 px.
- Mobil: die Zeitstrahl-Struktur bleibt vollständig erhalten
  (`ueber-uns__-mobile-09-y3376.png`) — Linie links bei ca. 20 px, Punkte
  darauf, Inhaltsspalte rechts ab ca. 48 px. Der Zitatkasten wird schmaler und
  dadurch deutlich höher (Zitat bricht auf fünf statt zwei Zeilen), behält aber
  Vollfläche und Nullrundung. Die H2 bricht mobil auf zwei Zeilen und steht
  linksbündig statt zentriert — der Achsenwechsel des Desktops entfällt mobil.
  Fliesstext ca. 15 px.
- Pattern: Kandidat: Zeitstrahl mit Akzentlinie, dunklen Markern und eingelegtem
  Akzent-Zitatkasten

### 42 — Presse-Zitatkarten mit Medienlogo [ueber-uns__-desktop-05-y3000.png, ueber-uns__-desktop-06-y3750.png | -]
- Anordnung: Linksbündige, dreizeilige H2 ab ca. 36 px Randabstand — der
  einzige Sektionskopf dieser Seite, der ganz an der äusseren Containerkante und
  nicht in der schmalen Textkolumne steht. Darunter ein horizontales Karussell
  aus Zitatkarten, das bei ca. 36 px beginnt; belegt sind zwei Karten
  unterschiedlicher Breite (ca. 512 px und ca. 508 px), rechts daneben bleibt
  eine grosse leere Fläche bis zur Viewportkante — die Reihe füllt die Breite
  nicht, obwohl eine Steuerung Weiteres verspricht. Karteninhalt gestapelt:
  Titel, Textauszug, dann unten auf fester Grundlinie eine Zeile aus rundem
  Medienlogo, Medienname und Autorname.
- Buttons/Komponenten: Karten als flache Rechtecke ohne Rundung, ohne Rahmen,
  ohne Schatten, minimal dunkler als die Sektionsfläche. Die Logo-Zeile ist zwei
  Bauformen gemischt: bei der ersten Karte ein satter blauer Kreis (ca. 66 px) mit
  weisser Wortmarke darin, bei der zweiten ein liegendes Rechteck-Logo ohne
  Kreis, deutlich kleiner und in gedruckter Auflösung sichtbar unscharf — zwei
  Fremdlogos in unterschiedlicher Fassung nebeneinander, das ist die einzige
  Stelle der Bibliothek, an der ein Fremdlogo in Fremdfarbe (Blau) auftritt und
  damit die Grün-Doktrin durchbricht. Die Karten sind auf gleiche Höhe gezogen,
  die Logo-Zeile sitzt in beiden auf derselben Grundlinie, sodass bei der
  kürzeren Karte ein sichtbarer Leerblock zwischen Text und Logo entsteht.
  Steuerung wie in Sektion 40: zwei quadratische Outline-Chevron-Buttons unten
  rechts, beide hier ausgegraut.
- Typo: H2 dreizeilig ca. 46 px Bold, sehr enger Zeilenabstand. Kartentitel ca.
  26 px Bold, zwei bis drei Zeilen — auffällig gross im Verhältnis zum Auszug
  darunter (ca. 17 px Regular, drei Zeilen). Medienname ca. 17 px Bold, Autorname
  darunter ca. 15 px Regular in Grau.
- Farbe/Fläche: Kartenfläche minimal dunkler als die Seitenfläche (gemessen
  `#c4c7cb`-nah in `ueber-uns__-desktop-06-y3750.png` bei x300/y250 gegen
  Seitenfläche `#cdd2da`). Kein Akzentgrün in der ganzen Sektion — die einzige
  Farbe ausser Grau ist das blaue Fremdlogo.
- Abstände/Rhythmus: Ca. 105 px vom Ende des Zeitstrahls zur H2, ca. 65 px von
  der H2 zur Kartenreihe, Karten-Innenpolster ca. 25 px, ca. 45 px von der
  Kartenreihe zur Steuerung.
- Mobil: **nicht belegt** (in den gelesenen Mobil-Slices liegt an dieser Position
  die Cookie-Karte bzw. der Ausschnitt springt vom Zeitstrahl zur
  Newsletter-Sektion).
- Pattern: `P-PROOF-STRIP`-Variante (Presse als Zitatkarte mit Autorenzeile statt
  als Logoleiste; vgl. Sektion 14)

### 43 — Newsletter-Split auf Fliederfläche [ueber-uns__-desktop-06-y3750.png, ueber-uns__-desktop-07-y4433.png | ueber-uns__-mobile-13-y5064.png, ueber-uns__-mobile-15-y5908.png]
- Anordnung: Eine eingerückte Vollfläche (ca. 36 px bis 1390 px, Höhe ca.
  620 px) mit sehr grossem Radius an der oberen rechten Ecke (geschätzt ca.
  150 px), die anderen drei Ecken spitz — dieselbe Riesen-Ecken-Geste wie im Hero
  (Sektion 37), hier auf der gegenüberliegenden Seite der Seite wiederholt und
  damit als Klammer um die Seite gesetzt. Innen ein Split: links Textblock (H2,
  Subline, Deko-Grafik), rechts das Formular ab ca. 810 px. Die linke Spalte ist
  oben ausgerichtet, die rechte beginnt auf derselben Höhe — kein vertikales
  Zentrieren.
- Buttons/Komponenten: Das einzige echte Formular der ganzen Bibliothek. Zwei
  Eingabefelder untereinander (`Dein Vorname`, `E-Mail*`), jeweils mit
  Label darüber und Platzhaltertext im Feld; Felder als helle Rechtecke mit
  dünnem Rahmen, Radius geschätzt ca. 6 px, Höhe ca. 52 px, Breite ca. 435 px.
  Darunter eine Checkbox-Zeile (quadratische Outline-Box ca. 22 px, Radius sehr
  klein) mit dreizeiligem Kleintext und darunter dem aufklappbaren Textlink
  `Mehr lesen` mit Chevron — unterstrichen und fett. Darunter ein
  Cloudflare-Turnstile-Widget als eigene helle Karte mit Rahmen (ca. 300 x 62 px)
  samt Fremdlogo und zwei Kleinlinks — ein sichtbar fremdes Bauteil, das dem
  Design-System nicht folgt (eigener Rahmen, eigene Rundung, eigene Typo). Ganz
  unten der Absende-CTA `Newsletter abonnieren` mit Chevron: gefülltes Rechteck
  in Dunkelgrün mit hellem Label, Höhe ca. 55 px, Breite ca. 228 px — der einzige
  Primär-CTA der Bibliothek, der auf einer Nicht-Grün-Fläche sitzt. Links im
  Textblock eine grosse Deko-Grafik aus einem weissen Explosionsstern mit einem
  fast schwarzen Häkchen darüber (ca. 240 px), kein Foto, kein Icon-Set.
- Typo: H2 zweizeilig ca. 46 px Bold in fast Schwarz. Subline dreizeilig ca.
  25 px Bold in einem gedämpften Grau-Violett — wieder Bold statt Regular, und
  die Subline ist damit fast so gross wie ein H2 anderer Sektionen. Feldlabels ca.
  15 px Bold, Platzhalter ca. 16 px Regular in Grau. Checkbox-Kleintext ca. 12 px
  Regular, dreizeilig. CTA-Label ca. 16 px Bold. Fünf Textgrössen in einer
  Sektion.
- Farbe/Fläche: Sektionsfläche gemessen `#aeabdd` — ein blasses Flieder/Lavendel
  (in `ueber-uns__-desktop-06-y3750.png` bei x300/y600). Das ist die einzige
  Fläche der gesamten Bibliothek ausserhalb des grün-cremen Systems und der
  einzige Ort, an dem eine dritte Farbfamilie eine ganze Sektion trägt; der
  Overlay-Schleier dämpft den Ton, der wahre Wert liegt gesättigter (Schätzung,
  Overlay). Der CTA darauf gemessen `#2f3f42`-nah (dunkelgrün-grau), die
  Eingabefelder in einem hellen Flieder-Weiss. Kein Akzent-Hellgrün in der
  gesamten Sektion.
- Abstände/Rhythmus: Ca. 130 px von der Presse-Steuerung zur Fliederfläche,
  Innenpolster ca. 55 px links und ca. 75 px oben. Zwischen den Formularfeldern
  ca. 25 px, ca. 30 px vom letzten Feld zur Checkbox, ca. 35 px zum
  Turnstile-Widget, ca. 40 px zum CTA.
- Mobil: gestapelt, Textblock zuerst, Formular darunter
  (`ueber-uns__-mobile-13-y5064.png`, `ueber-uns__-mobile-15-y5908.png`). Die
  Reihenfolge im Textblock dreht sich um: mobil steht die Stern-Häkchen-Grafik
  ZUERST, darüber der H2 erst danach — desktop steht die Grafik unter dem Text.
  Die Fliederfläche bleibt eingerückt (ca. 16 px Rand) und behält die
  Riesen-Ecke oben rechts. H2 auf ca. 30 px dreizeilig, Subline ca. 18 px.
  Eingabefelder über die volle Kartenbreite (ca. 310 px). Der CTA wird mobil
  ebenfalls vollbreit (ca. 310 px) statt inhaltsbreit — die einzige belegte
  Stelle, an der ein CTA dieser Bibliothek mobil auf Vollbreite geht.
- Pattern: `P-CTA-MID`-Variante (Abweichung: Fläche in fremder Farbfamilie
  Flieder, und echtes Formular statt Funnel-Einstieg)

### 44 — Fussnotenband und Footer [ueber-uns__-desktop-07-y4433.png | ueber-uns__-mobile-15-y5908.png]
- Anordnung und Bauweise wie Sektionen 11 und 12 (Trust-Leiste mit Wortmarke plus
  drei Icon-Claims, darunter das vierspaltige Linkraster) mit einer belegbaren
  Abweichung: zwischen Newsletter-Sektion und Footer sitzt hier ein eigenes,
  randloses Fussnotenband über die volle Breite mit zwei Zeilen Kleintext
  (Sternchen- und Doppelsternchen-Fussnoten zu Berechnungsgrundlage und
  Standort), linksbündig ab ca. 36 px. Dieses Band trägt einen eigenen, deutlich
  helleren Grünton als der Footer darunter und liest sich dadurch als eigene
  Fläche, nicht als Footer-Kopf.
- Buttons/Komponenten: Im Fussnotenband kein Bauteil ausser Text. Footer
  unverändert: Wortmarke links, drei Claims mit Outline-Icons in Akzent-Hellgrün,
  Haarlinie, dann vier Linkspalten mit hellgrünen Spaltenüberschriften und
  Diagonal-Pfeil-Icons an den abgesetzten Zielen (`Newsletter`, `Karriere`,
  `Über uns`, `Presseraum`).
- Typo: Fussnotenzeilen ca. 15 px Regular in gedämpftem Weiss. Footer wie Sektion
  11/12: Claims ca. 16 px Bold, Spaltenüberschriften ca. 16 px Bold in Hellgrün,
  Links ca. 16 px Regular.
- Farbe/Fläche: Fussnotenband gemessen `#2a4e46` (in
  `ueber-uns__-desktop-07-y4433.png` bei x700/y520) — ein mittleres Tannengrün,
  deutlich heller als der Footergrund direkt darunter, gemessen `#112226` bei
  x700/y800. Zwei Dunkelgrün-Stufen direkt gestapelt, der Sprung ist als Kante
  klar sichtbar. Footer-Akzente (Icons, Spaltenköpfe) gemessen `#a1c76e`, also
  derselbe Akzentton wie die Stat-Karten.
- Abstände/Rhythmus: Ca. 30 px Innenpolster im Fussnotenband oben und unten, ca.
  70 px vom Bandende zur Footer-Wortmarke, danach Rhythmus wie Sektion 11/12.
- Mobil: Fussnotenband und Footer stapeln wie erwartet
  (`ueber-uns__-mobile-15-y5908.png`): die Fussnoten brechen auf drei bzw. zwei
  Zeilen, die Trust-Claims stehen mobil untereinander statt nebeneinander, jeweils
  Icon links und Text rechts, und die Linkspalten rutschen mobil auf drei
  nebeneinander stehende schmale Spalten mit umbrechenden Überschriften
  (`Hilfe & Kontakt` bricht zweizeilig). Der Sticky-Scroll-Nach-oben-Button liegt
  über der Claim-Zeile.
- Pattern: — (wie Sektion 11/12, plus Kandidat: Fussnotenband als eigene
  Dunkelstufe über dem Footer)

## Seite: /erfahrungen/

Nur Desktop geschossen (`erfahrungen__-desktop-*`). Es existiert kein
`erfahrungen__-mobile-*`-Shot — das Mobil-Verhalten dieser Seite ist durchgehend
**nicht geprüft**. Promo-Topbar und Header sind identisch zu Sektion 01, der
dunkle Footer identisch zu Sektion 12 (belegt in
`erfahrungen__-desktop-08-y5092.png`) und werden hier nicht erneut beschrieben.
Das Cookie-Overlay liegt wie überall als Karte über dem unteren Drittel jedes
Slices.

### 45 — Hero, Award-Foto in Kapselform mit Text im Bild [erfahrungen__-desktop-00-fold.png | -]
- Anordnung: Ein einzelnes Querformat-Foto, das nicht randlos läuft, sondern als
  Bildblock in einem Container sitzt (links ca. 36 px Rand, rechts bis ca.
  1400 px). Die rechte obere Ecke ist zu einem sehr grossen Viertelkreis
  abgerundet (Radius geschätzt ca. 200 px), die drei anderen Ecken sind spitz —
  dieselbe asymmetrische Kapselform wie die Hero-Karte auf `/ueber-uns/`
  (Sektion 37), hier aber mit Foto statt Farbfläche gefüllt. Die H1 liegt
  linksbündig direkt auf dem Foto, unten im Bild beginnend bei ca. 74 px vom
  linken Bildrand, zweizeilig. Kein CTA, kein Eyebrow, keine Textbox.
- Buttons/Komponenten: Im Fold kein einziger Button — die Seite startet ohne
  Aktion. Auch keine Slider-Dots, kein Play-Icon, kein Badge. Das Foto zeigt eine
  Preisverleihungs-Szene mit Award-Aufsteller im Hintergrund; das Award-Signet
  ist Bildinhalt, keine gesetzte Grafik.
- Typo: Einstufig. H1 ca. 32-34 px (gemessen an der Zeilenhöhe im Slice,
  deutlich kleiner als die Home-H1 von ca. 62 px), geometrische Grotesk, Bold,
  gemischte Schreibweise, zwei Zeilen mit engem Zeilenabstand (ca. 34 px
  Zeilenversatz). Kein Lead-Text unter der H1 im Fold sichtbar. Auffällig: die
  H1 wechselt nicht die Farbe über hellen und dunklen Bildpartien.
- Farbe/Fläche: Foto in kühlem Grau-Rosa, links ein warmer Verlauf ins
  Orange-Rosa. Weisse H1 ohne Schatten und ohne Verlaufs-Wash — über der hellen
  Bildmitte (`Erfahrungen,` steht auf einer hellgrauen Wand) fällt der Kontrast
  sichtbar ab, dasselbe Lesbarkeitsproblem wie im Home-Hero (Sektion 02). Der
  Streifen zwischen Header und Bildoberkante ist die Creme-Grundfläche.
- Abstände/Rhythmus: Bildoberkante ca. 50 px unter dem Header, Bildhöhe im Fold
  über 450 px sichtbar. Die H1 sitzt nicht mittig, sondern im unteren Drittel des
  Fotos.
- Mobil: **nicht geprüft** (kein Mobile-Shot dieser Route vorhanden).
- Pattern: `P-HERO-PHOTO` (Variante: Foto als Block mit einseitig
  Riesen-Eckradius statt randlos, und ohne CTA)

### 46 — Fliesstext mit fett gesetzten Satzanfängen [erfahrungen__-desktop-02-y750.png | -]
- Anordnung: Einspaltiger Textblock, links ausgerichtet, beginnend bei ca. 375 px
  und endend bei ca. 1035 px — also eine schmale, mittig-links versetzte Spalte
  von ca. 660 px Breite in einem 1440er Viewport, mit sehr viel leerer Fläche
  rechts. Keine Überschrift über dem Block sichtbar, keine Bebilderung, kein
  Rahmen. Am Ende eine Bildnachweis-Zeile.
- Buttons/Komponenten: Keine. Der Block ist reiner Text ohne Link-Chips,
  Aufzählungs-Icons oder Karten. Die Absätze sind über einen typografischen Trick
  strukturiert statt über Zwischenüberschriften: jeder Absatz beginnt mit einem
  halbfetten Teilsatz (`Was uns besonders macht?`, `Rund 80.000 Haushalte in
  ganz Deutschland`), der in denselben Fliesstext weiterläuft — ein
  Inline-Lead-in statt einer H3.
- Typo: Fliesstext ca. 16-17 px, Regular, Zeilenabstand ca. 24 px (gemessen am
  Zeilenversatz im Slice), keine Blocksatz-Ausrichtung. Der fette Lead-in ist im
  selben Grad, nur im Weight abgesetzt. Bildnachweis (`Foto: Pedro Becerra /
  DISQ / ntv`) im selben Grad und Regular, nur durch Abstand getrennt, nicht
  kleiner gesetzt — für eine Credit-Zeile ungewöhnlich gross.
- Farbe/Fläche: Grundfläche Creme (im Shot durch das Overlay grau gedimmt),
  Text fast schwarz. Kein Akzentgrün in diesem Block, keine farbige Hervorhebung
  der fetten Lead-ins.
- Abstände/Rhythmus: Absatzabstand ca. 45 px, deutlich mehr als eine Leerzeile —
  die Absätze lesen sich dadurch als separate Aussagen. Unter dem letzten Absatz
  ca. 70 px bis zur Credit-Zeile.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Fliesstext mit fettem Inline-Lead-in statt Zwischenüberschrift

### 47 — Stat-Karten, drei hellgrüne Kacheln [erfahrungen__-desktop-02-y750.png | -]
- Anordnung: Drei gleich breite Kacheln nebeneinander (je ca. 295 px breit,
  ca. 245 px hoch), Reihe zentriert im Viewport zwischen ca. 263 px und 1162 px.
  Inhalt jeder Kachel dreistufig und zentriert: kleines Vorwort, dann die Zahl,
  dann die Erläuterung.
- Buttons/Komponenten: Keine Buttons, keine Links, keine Icons — reine
  Zahlenkacheln. Rechteck ohne sichtbare Eckrundung (die Ecken laufen spitz aus,
  anders als die Karten in Sektion 03), ohne Rahmen und ohne Schatten. Die Zahl
  trägt eine nachgestellte Einheit in kleinerem Grad (`Mio.`, `t`), die auf der
  Grundlinie sitzt, nicht hochgestellt.
- Typo: Vorwort `mehr als` ca. 13 px halbfett. Zahl sehr gross, ca. 58-62 px,
  Bold, mit auffällig schmalen, fast tabellarischen Ziffern und einem
  Mittelpunkt-Trennzeichen in `90.000` — der grösste Typo-Sprung der Seite,
  Verhältnis Zahl zu Vorwort grob 4,5:1 (geschätzt). Erläuterung darunter
  ca. 14 px halbfett, zwei Zeilen, zentriert.
- Farbe/Fläche: Kachelfläche ist das Akzent-Hellgrün (Limette), Text darauf fast
  schwarz — dieselbe Kombination wie die Stat-Karten auf `/ueber-uns/`
  (Sektion 39), aber im Gegensatz zu den dunklen Stat-Karten der Startseite
  (Sektion 09) invertiert. Die drei Kacheln sind farblich identisch, keine
  Abstufung.
- Abstände/Rhythmus: Kachelabstand ca. 10 px — die Kacheln stehen fast auf
  Stoss, was sie als ein zusammenhängendes Band lesen lässt statt als drei
  Karten. Vor der Reihe ca. 70 px, danach ca. 155 px Luft bis zum Video-Block.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Stat-Band aus drei Akzentkacheln auf Stoss

### 48 — Video-Teaser als breiter Bildblock mit Play-Overlay [erfahrungen__-desktop-03-y1500.png | -]
- Anordnung: Ein einzelner, sehr breiter Bildblock (ca. 1135 px breit, ca. 625 px
  hoch), zentriert im Viewport, ohne Überschrift darüber und ohne Text darunter —
  der Block steht allein in seiner Sektion. Im Bild rechts liegen zwei gestaffelte
  Textbanner übereinander, die als Grafik ins Video eingebrannt sind, nicht als
  HTML gesetzt.
- Buttons/Komponenten: Ein zentriertes Play-Icon als weisses, gefülltes Dreieck
  ohne umgebenden Kreis und ohne Farbfläche — sehr zurückhaltend für den einzigen
  Interaktionspunkt der Sektion. Keine Laufzeit-Angabe, kein Untertitel, keine
  Steuerleiste. Die Bildecken sind minimal gerundet (Radius geschätzt ca. 4 px).
  Die eingebrannten Banner sind zwei gestapelte Balken: oben ein dunkelgrüner
  Balken mit weisser Schrift (`Erfahrungsbericht`), darunter ein grösserer
  hellgrüner Balken mit fast schwarzer Schrift — dieselbe Zweifarb-Logik wie
  Dunkelfläche plus Akzent im Rest der Seite.
- Typo: Nur eingebrannte Bildschrift, kein gesetzter Text. Der hellgrüne Balken
  trägt eine sehr grosse Bold-Zeile (ca. 55 px im Bild), der dunkelgrüne Balken
  darüber ca. 40 px. Beide geometrische Grotesk, gemischte Schreibweise —
  optisch nicht von der Website-Typo zu unterscheiden.
- Farbe/Fläche: Videostandbild in kühlem Blau-Grau (Innenraum am Fenster). Der
  Sektionshintergrund unter dem Block ist die Creme-Grundfläche; darunter beginnt
  bei ca. y 800 im Slice ein leicht kühlerer, grauerer Flächenwechsel, der die
  folgende Testimonial-Sektion abgrenzt — ein Wechsel ohne Linie, nur über
  Helligkeit.
- Abstände/Rhythmus: Über dem Block ca. 100 px, unter dem Block ca. 75 px bis zum
  Flächenwechsel. Der Block nutzt fast die volle Containerbreite, was ihn nach dem
  schmalen Textblock aus Sektion 46 stark aufreissen lässt.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Solitärer Video-Teaser ohne Rahmentext

### 49 — Testimonial-Karussell, angeschnittene Zitatkarten [erfahrungen__-desktop-03-y1500.png, erfahrungen__-desktop-04-y2250.png | -]
- Anordnung: Über der Karten-Reihe eine linksbündige H2 bei ca. 58 px vom Rand.
  Darunter eine horizontale Reihe gleich hoher Karten (je ca. 300 px breit,
  ca. 290 px hoch, Abstand ca. 45 px), die **an beiden Seiten** aus dem Viewport
  läuft: in `erfahrungen__-desktop-03-y1500.png` ist links eine Karte
  angeschnitten und rechts eine weitere — die Reihe ist also bereits in einer
  mittleren Scrollposition, nicht am Anfang. Innerhalb der Karte: Zitat-Icon
  oben links, Zitattext darunter, Namenszeile am unteren Kartenrand.
- Buttons/Komponenten: Karten als flache Rechtecke ohne Rahmen und ohne Schatten,
  Fläche minimal heller als der Sektionsgrund; die Eckrundung ist so klein, dass
  sie im Slice kaum messbar ist (geschätzt 2-4 px). Zitat-Icon als zwei gefüllte
  Anführungszeichen in Dunkelgrün, ca. 22 px. Keine Sterne-Bewertung, kein
  Produktbild, kein Avatar in der Karte — die Attribution ist nur eine
  Textzeile. In diesem Slice **keine** Pfeil-Steuerung sichtbar, anders als beim
  Karussell in Sektion 51.
- Typo: H2 ca. 30-32 px Bold. Zitattext ca. 15 px Regular, Zeilenabstand ca.
  21 px, linksbündig, unterschiedlich lang (3 bis 7 Zeilen) — die Karten sind
  trotzdem gleich hoch, der Rest bleibt leer. Namenszeile ca. 14 px halbfett,
  Muster `Vorname aus Ort`, ohne Titel oder Produktangabe.
- Farbe/Fläche: Kein Akzentgrün in der Karte ausser dem Zitat-Icon. Der
  Sektionsgrund ist der kühlere Grauton, die Karte einen Hauch heller — der
  Kontrast zwischen Karte und Fläche ist so gering, dass die Kartenkanten nur bei
  genauem Hinsehen erkennbar sind.
- Abstände/Rhythmus: Zwischen H2-Unterkante und Kartenoberkante ca. 40 px.
  Innerhalb der Karte ca. 24 px Innenabstand oben und links.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Beidseitig angeschnittenes Zitat-Karussell ohne Steuerung

### 50 — Presse-Logoleiste, fünf Graustufen-Logos [erfahrungen__-desktop-04-y2250.png | -]
- Anordnung: Zentrierte H2 (`Bekannt aus:`) über einer einzeiligen Logo-Reihe aus
  fünf Marken, gleichmässig über die Containerbreite von ca. 45 px bis 1370 px
  verteilt. Keine Karten, keine Trennlinien, kein Rahmen — die Logos stehen frei
  auf der Fläche, optisch auf einer gemeinsamen Mittelachse ausgerichtet trotz
  sehr unterschiedlicher Logo-Proportionen.
- Buttons/Komponenten: Keine Buttons und keine sichtbaren Links. Die Logos sind
  Bilddateien in unterschiedlicher Höhe (ca. 20 px bis 30 px) — sie sind auf
  gleiche optische Grösse getrimmt, nicht auf gleiche Boxhöhe.
- Typo: H2 ca. 28-30 px Bold, zentriert, mit Doppelpunkt am Ende — dieselbe
  Doppelpunkt-Manier wie in Sektion 49 (`Erfahrungen aus der
  priwatt-Community:`), also ein wiederkehrender Stilzug der Seite. Logo-Schrift
  ist Bestandteil der Bilddateien.
- Farbe/Fläche: Alle Logos in Graustufe bzw. sehr dunklem Grau auf der
  Creme-Grundfläche — ein Logo (`MZ.de`) trägt eine kleine dunkle Kachel als
  Signet, ist aber ebenfalls entfärbt. Kein Logo behält seine Markenfarbe. Die
  Sektion sitzt zwischen zwei Flächenwechseln, oberhalb und unterhalb ist der
  Grund minimal kühler.
- Abstände/Rhythmus: Zwischen H2 und Logoreihe ca. 70 px. Der horizontale Abstand
  zwischen den Logos ist nicht gleich, sondern optisch ausgeglichen (ca. 90 bis
  140 px). Sektionshöhe insgesamt ca. 245 px, davon der grösste Teil Leerraum.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Entfärbte Presse-Logoleiste ohne Karten

### 51 — Gründer-Zitat, Porträt neben Grosszitat [erfahrungen__-desktop-04-y2250.png | -]
- Anordnung: Zweispaltig asymmetrisch. Links ein kleines, hochformatiges Porträt
  (ca. 182 px breit, ca. 182 px hoch) mit darunter zentrierter Attribution über
  vier Zeilen. Rechts das Zitat als grosser Text, beginnend bei ca. 548 px. Das
  Zitat wird von zwei Zitat-Icons eingerahmt: eines oben links über dem Text,
  eines unten rechts unter dem Text — eine Klammer statt eines einzelnen
  Icons.
- Buttons/Komponenten: Kein Button, kein Link. Porträt als Rechteck ohne
  Rundung, ohne Rahmen. Die beiden Zitat-Icons sind unterschiedlich gefärbt: das
  obere in einem kräftigeren Grün, das untere in einem helleren Grün — ein
  bewusster Zweiklang, kein Rendering-Zufall.
- Typo: Zitat ca. 24-26 px, Regular (nicht Bold — der einzige grosse Text der
  Seite ohne Bold), vier Zeilen, Zeilenabstand ca. 38 px, mit typografischen
  deutschen Anführungszeichen am Anfang und Ende. Attribution ca. 14 px, Name in
  Bold, Rolle darunter in Regular, alles zentriert unter dem Bild und
  umgebrochen auf vier sehr kurze Zeilen.
- Farbe/Fläche: Creme-Grundfläche, dunkler Text. Die einzigen Farbträger sind die
  zwei Zitat-Icons. Kein Kasten, keine Karte, keine Hintergrundfläche hinter dem
  Zitat — der Block hängt frei in der Fläche.
- Abstände/Rhythmus: Sehr grosszügig, über dem Block ca. 90 px. Der Abstand
  zwischen Porträtspalte und Zitatspalte beträgt ca. 50 px, das Zitat läuft bis
  ca. 1100 px und lässt rechts ca. 340 px leer.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Grosszitat in Icon-Klammer mit Porträtspalte

### 52 — Kundenfoto-Karussell mit Produktlabel im Bild [erfahrungen__-desktop-06-y3750.png | -]
- Anordnung: Eine horizontale Reihe querformatiger Fotokacheln (je ca. 320 px
  breit, ca. 290 px hoch, Abstand ca. 15 px), die rechts aus dem Viewport läuft;
  links ist die erste Karte am Containerrand angeschnitten. In jeder Kachel unten
  links eine zweizeilige Beschriftung direkt auf dem Foto. Unter der Reihe rechts
  aussen ein Pfeil-Paar zur Steuerung.
- Buttons/Komponenten: Steuerung als zwei quadratische Buttons mit abgerundeten
  Ecken (je ca. 40 x 40 px, Radius geschätzt ca. 8 px) mit Chevron links und
  rechts. Sie sind unterschiedlich gestaltet: der Zurück-Button ist ein heller
  Outline-Button mit dünner Kontur und blassem Chevron, der Vor-Button ist
  gefüllt dunkelgrün mit weissem Chevron — der aktive bzw. mögliche Weg ist also
  farblich hervorgehoben. Zwischen den Kacheln liegen kleine violette
  Winkel-/Ecken-Grafiken als Deko auf der Fläche (drei Stück sichtbar), die zu
  keiner Kachel gehören.
- Typo: Beschriftung im Bild zweizeilig, ca. 14 px halbfett: Zeile eins der Name
  mit Ort, Zeile zwei die Produktbezeichnung. Kein Zitat, keine Zahl. Keine
  Sektions-H2 in diesem Slice sichtbar — die Reihe beginnt oberhalb des
  Slice-Rands, die Überschrift ist **nicht belegt**.
- Farbe/Fläche: Fotos in natürlichen Farben (Dächer, Gartenhäuser mit Modulen),
  ohne Verlaufs-Wash. Zeile eins der Beschriftung ist weiss, Zeile zwei in
  Akzent-Hellgrün — die Produktbezeichnung wird also farblich vom Namen
  abgesetzt. Auf hellen Bildpartien (`Rainer aus Halle (Saale)` über heller
  Hauswand) verliert die weisse Zeile sichtbar Kontrast. Die Deko-Winkel sind
  Flieder/Violett, dieselbe Familie wie die Newsletter-Fläche in Sektion 43.
- Abstände/Rhythmus: Unter der Kachelreihe ca. 40 px bis zur Pfeilsteuerung,
  danach ca. 190 px Luft bis zur nächsten H2.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Foto-Karussell mit Produktlabel im Bild und asymmetrischem Pfeilpaar

### 53 — Pressestimmen als Zitatkarten mit Medienlogo [erfahrungen__-desktop-06-y3750.png | -]
- Anordnung: Linksbündige, zweizeilige H2 bei ca. 36 px vom Rand. Darunter zwei
  Karten nebeneinander (je ca. 510 px breit, ca. 395 px hoch, Abstand ca. 15 px),
  die zusammen nur bis ca. 1070 px reichen und rechts ca. 370 px Fläche leer
  lassen — die Reihe ist nicht zentriert, sondern linksbündig zur H2. Unten rechts
  im Viewport wieder ein Pfeil-Paar, das aber nicht unter den Karten, sondern
  deutlich rechts daneben sitzt.
- Buttons/Komponenten: Karten als flache Rechtecke ohne Rahmen und ohne Schatten,
  Fläche wie in Sektion 49 nur minimal von der Grundfläche abgesetzt. Karteninhalt
  dreistufig: Schlagzeile, Anrisstext, dann unten eine Fusszeile aus rundem
  Medienlogo plus zwei Textzeilen. Das Pfeil-Paar hat hier **beide** Buttons im
  hellen Outline-Stil, keiner ist gefüllt — anders als in Sektion 52, wo der
  Vor-Button dunkelgrün gefüllt ist.
- Typo: H2 ca. 34-36 px Bold, zwei Zeilen. Karten-Schlagzeile ca. 22-24 px Bold,
  zwei bis drei Zeilen, Zeilenabstand eng. Anrisstext ca. 15 px Regular. In der
  Fusszeile der Medienname ca. 15 px Bold, darunter der Autorenname ca. 13 px
  Regular in hellerem Grau — der Autor ist also dem Medium klar untergeordnet.
- Farbe/Fläche: Kein Akzentgrün in dieser Sektion, weder in der Karte noch in der
  Steuerung. Die Medienlogos behalten hier ihre Markenfarbe (blauer Kreis mit
  `MZ.de`, buntes Zweitlogo) — das ist der Gegensatz zur entfärbten Logoleiste in
  Sektion 50, obwohl dasselbe Logo dort in Graustufe steht.
- Abstände/Rhythmus: Zwischen H2 und Kartenreihe ca. 45 px. Innerhalb der Karte
  ca. 25 px Innenabstand; zwischen Anrisstext und Fusszeile steht in der linken
  Karte deutlich mehr Leerraum als in der rechten, weil beide Karten auf die Höhe
  der längeren ausgeglichen sind.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Pressekarte mit Medienlogo-Fusszeile

### 54 — Newsletter-Split auf Fliederfläche [erfahrungen__-desktop-08-y5092.png | -]
- Anordnung: Zweispaltig auf einer durchgehenden Farbfläche (ca. 1350 px breit,
  linksbündig bei ca. 36 px beginnend). Links H2 plus Lead-Text und eine grosse
  Deko-Grafik, rechts das Formular. Die Fläche ist ein Rechteck ohne sichtbare
  Eckrundung. Es handelt sich um dieselbe Sektion wie auf `/ueber-uns/`
  (Sektion 43).
- Buttons/Komponenten: Formular mit zwei Eingabefeldern (das obere im Slice
  angeschnitten, das untere `E-Mail*`), einer Einwilligungs-Checkbox mit
  aufklappbarem `Mehr lesen`-Link, einem Cloudflare-Turnstile-Widget als eigener
  heller Kasten mit Rahmen, und dem Absende-Button. Die Felder sind **nicht**
  umrandet, sondern nur weisse Flächen ohne Kontur (Radius geschätzt ca. 4 px,
  Höhe ca. 50 px). Der Button `Newsletter abonnieren` ist gefüllt in
  Dunkelgrün-Schwarz mit weisser Schrift und Chevron — auffällig, weil der
  Primär-CTA sonst überall hellgrün ist; hier wäre Hellgrün auf Flieder
  vermutlich zu schwach. Die Deko ist ein grosser grauer Stern mit einem
  schwarzen Haken darüber.
- Typo: H2 sehr gross (ca. 44-46 px Bold, im Slice angeschnitten), Lead darunter
  ca. 22 px Bold in einem gedeckteren Ton — wieder Bold-auf-Bold statt
  Weight-Kontrast, wie im Home-Hero. Feldlabel ca. 14 px Bold mit Sternchen für
  Pflichtfeld, Platzhaltertext ca. 15 px Regular in Grau. Checkbox-Text ca. 12 px,
  der kleinste Grad der Seite.
- Farbe/Fläche: Grosse Fläche in einem hellen Flieder/Lavendel — die einzige
  Sektion der Seite mit einer nicht-grünen Grossfläche und der Farbträger, den
  auch die Deko-Winkel in Sektion 52 aufgreifen. Text darauf fast schwarz.
  Direkt darunter setzt ohne Übergang der dunkle Footer an.
- Abstände/Rhythmus: Zwischen Formularfeld und Checkbox ca. 30 px, zwischen
  Turnstile-Kasten und Button ca. 30 px. Unterkante der Fläche ca. 60 px unter
  dem Button.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 43 (`/ueber-uns/`), hier ohne Abweichung im
  Aufbau; einziger Unterschied ist die fehlende Mobilbelegung.

## Seite: /career/

Nur Desktop geschossen (`career__-desktop-*`), fünf Slices — die kürzeste Seite
der Bibliothek. Kein `career__-mobile-*`-Shot vorhanden, das Mobil-Verhalten ist
durchgehend **nicht geprüft**. Header wie Sektion 01, Footer wie Sektion 12
(belegt in `career__-desktop-03-y1500.png`). Cookie-Overlay wie überall.

### 55 — Hero, Foto-Block mit Riesen-Eckradius und Textmarke [career__-desktop-00-fold.png, career__-desktop-01-y0.png | -]
- Anordnung: Wie auf `/erfahrungen/` ein Fotoblock im Container (links ca. 36 px,
  rechts bis ca. 1390 px, Höhe ca. 445 px) statt eines randlosen Heros. Die rechte
  obere Ecke ist zu einem sehr grossen Viertelkreis gerundet (Radius geschätzt ca.
  190 px), die übrigen Ecken spitz. H1 linksbündig auf dem Foto, unten links
  beginnend bei ca. 76 px vom Bildrand, zweizeilig. Kein CTA, kein Eyebrow, kein
  Lead — der Hero enthält ausser der H1 nichts.
- Buttons/Komponenten: Kein Button, kein Icon, keine Slider-Steuerung. Der
  gesamte Hero ist ein einziges Bild plus eine Überschrift. Bemerkenswert für eine
  Karriereseite: es gibt hier keinen Sprung-CTA zu den offenen Stellen.
- Typo: H1 ca. 34-36 px Bold, geometrische Grotesk, gemischte Schreibweise, zwei
  Zeilen mit Zeilenversatz ca. 51 px — also relativ lockerer Zeilenabstand
  gegenüber der sehr engen Home-H1. Kein weiterer Text im Hero.
- Farbe/Fläche: Foto in kühlem Blaugrau-Grün (Person am Laptop vor Zimmerpflanze).
  Über der linken Bildhälfte, wo die H1 liegt, ist das Bild sichtbar dunkler
  abgestuft — anders als im Home- und Erfahrungen-Hero liegt hier eine
  Abdunkelung unter der Schrift, die weisse H1 ist durchgehend gut lesbar. Das ist
  die einzige Stelle der Bibliothek, an der ein Lesbarkeits-Wash belegt ist.
- Abstände/Rhythmus: Bildoberkante direkt unter dem Header (ca. 0-5 px Abstand,
  das Foto stösst an die Headerkante). Unter dem Foto ca. 140 px Leerraum bis zur
  nächsten H2 — ein ungewöhnlich grosser Absatz nach dem Hero.
- Mobil: **nicht geprüft**.
- Pattern: `P-HERO-PHOTO` (Variante mit Riesen-Eckradius wie Sektion 45,
  zusätzlich mit Abdunkelung unter der Typo)

### 56 — Werte-Raster, vier Textspalten mit Trennstrichen [career__-desktop-01-y0.png, career__-desktop-02-y750.png | -]
- Anordnung: Über dem Raster eine linksbündige H2 bei ca. 36 px, darunter eine
  kleine Eyebrow-artige Zeile — die Reihenfolge ist umgekehrt zum Üblichen: die
  Überschrift steht **über** dem Kleintext, nicht darunter. Darunter vier gleich
  breite Spalten (je ca. 345 px) über die volle Containerbreite. Jede Spalte:
  Titel oben, Fliesstext darunter. Zwischen den Spalten stehen dünne vertikale
  Trennstriche, die über die volle Spaltenhöhe laufen; auch links vor der ersten
  und rechts nach der letzten Spalte steht je ein Strich, das Raster ist also
  beidseitig eingefasst.
- Buttons/Komponenten: Keine Buttons, keine Links, keine Icons — die vier Spalten
  sind reiner Text. Kein Kartenhintergrund, keine Rundung, kein Schatten: die
  Struktur entsteht ausschliesslich über die Trennlinien. Das unterscheidet dieses
  Raster deutlich vom Vierer-Textraster auf `/solaranlagen/` (Sektion 17), das
  mit Icons arbeitet.
- Typo: H2 ca. 34-36 px Bold. Die Zeile darunter (`Über uns`) ca. 15 px Regular —
  klein, unauffällig und ohne Caps oder Letterspacing, wirkt eher wie eine
  nachgestellte Kategorie als wie ein Eyebrow. Spaltentitel ca. 20-21 px Bold,
  einzeilig. Spaltentext ca. 16 px Regular, Zeilenabstand ca. 27 px, drei bis
  fünf Zeilen je Spalte. Die Spalten sind unterschiedlich lang, unten nicht
  ausgeglichen.
- Farbe/Fläche: Kein Akzentgrün in der ganzen Sektion — weder Titel noch Striche
  noch Text tragen Farbe. Alles fast schwarz auf der Grundfläche. Die
  Trennstriche sind ein sehr helles Grau. Unter dem Raster wechselt die Fläche bei
  ca. y 380 im Slice `career__-desktop-02-y750.png` auf einen etwas kühleren,
  helleren Ton und trennt so die nächste Sektion ohne Linie.
- Abstände/Rhythmus: Zwischen H2 und Kategoriezeile ca. 25 px, zwischen
  Kategoriezeile und Rasteroberkante ca. 40 px. Zwischen Spaltentitel und
  Spaltentext ca. 45 px — auffällig viel, dadurch schwebt der Titel deutlich über
  seinem Text. Spaltenabstand ca. 20 px links und rechts vom Trennstrich.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Vierer-Textraster mit vertikalen Trennstrichen statt Karten

### 57 — Stellenliste im Leerzustand [career__-desktop-02-y750.png | -]
- Anordnung: Zentrierter Zweizeiler auf eigener Farbfläche, sonst nichts. H2
  zentriert, darunter eine einzelne Zeile Statustext. Die Sektion nimmt trotz
  fehlendem Inhalt volle ca. 275 px Höhe ein und ist optisch als eigenes Band
  abgesetzt.
- Buttons/Komponenten: Keine — und genau das ist die Beobachtung: der
  Leerzustand ist ungestaltet. Kein Filter, keine Kategorie-Reiter, keine
  Illustration, kein Icon, kein Ersatz-CTA (etwa `Initiativ bewerben`), obwohl
  direkt darunter ein Bewerbungsformular folgt. Die Meldung ist ein reiner
  Textstring und liest sich wie eine Systemausgabe, nicht wie eine gestaltete
  Leerzustands-Nachricht.
- Typo: H2 ca. 40-42 px Bold, zentriert — deutlich grösser als die H2 der
  Werte-Sektion (ca. 35 px), obwohl darunter kein Inhalt steht. Die Statuszeile
  ca. 20 px halbfett, ebenfalls zentriert, in fast schwarz.
- Farbe/Fläche: Die Sektion sitzt auf einer eigenen, minimal helleren und
  kühleren Fläche als das Werte-Raster darüber; nach unten wechselt die Fläche
  erneut. Drei aufeinanderfolgende Flächen, alle in sehr ähnlichem Grau-Creme —
  die Bänder unterscheiden sich nur um wenige Helligkeitsstufen und sind ohne
  Linie getrennt.
- Abstände/Rhythmus: Zwischen H2 und Statuszeile ca. 30 px. Über der H2 ca. 90 px,
  unter der Statuszeile ca. 90 px — der Leerzustand ist symmetrisch gepolstert.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Ungestalteter Leerzustand einer Stellenliste

### 58 — Bewerbungsformular, Split mit Plus-Deko [career__-desktop-02-y750.png, career__-desktop-03-y1500.png | -]
- Anordnung: Zweispaltig. Links H2 (dreizeilig) plus eine Lead-Zeile und darunter
  eine grosse grafische Form; rechts das Formular in einem zweispaltigen Feldraster
  ab ca. 717 px. Die linke Spalte ist ansonsten leer — die untere Hälfte trägt nur
  die Deko-Grafik. Das Formular ist der einzige Interaktionsbereich der ganzen
  Seite.
- Buttons/Komponenten: Feldraster zweispaltig für die kurzen Felder
  (`Vorname*` / `E-Mail*`, dann `Telefon` / `Stelle`), danach volle Breite für
  `LinkedIn Profil (optional)` und das Textarea `Anschreiben (optional)`. Felder
  sind gefüllte Flächen ohne Rahmen (Höhe ca. 52 px, Radius geschätzt ca. 4 px),
  das Textarea ist ca. 200 px hoch und trägt als einziges Feld einen dünnen
  Rahmen plus einen Resize-Griff unten rechts. `Stelle` ist ein Select mit
  Chevron rechts. Der Datei-Upload ist kein Dropzone-Feld und kein Button,
  sondern eine Textzeile mit zwei Inline-Links (`Anhang` und `Link`) in Blau —
  die einzige blaue Farbe auf der Seite und ein sichtbarer Bruch mit dem
  Farbsystem. Zwei Checkboxen (Datenschutz und Cloudflare-Turnstile im eigenen
  hellen Kasten mit Rahmen). Absende-Button `Bewerbung abschicken` gefüllt in
  Dunkelgrün-Schwarz mit weisser Schrift und Chevron, ca. 232 x 50 px — nicht
  hellgrün wie die Primär-CTAs der Produktseiten.
- Typo: H2 ca. 40-42 px Bold, drei Zeilen, sehr eng gesetzt. Lead darunter ca.
  26 px Bold in gedecktem Grau — wieder Bold-auf-Bold statt Weight-Kontrast.
  Feldlabel ca. 15 px Bold mit Sternchen für Pflichtfelder. Platzhalter ca. 15 px
  Regular in Grau, und zwar mit Beispieldaten statt Feldnamen (`Marina Meier`,
  `marinameier@meier.de`, `+49`) — eine Ausfüllhilfe, kein wiederholtes Label.
  Checkbox-Text ca. 12 px, der kleinste Grad. Auffällig: der Datenschutztext
  siezt (`Ich habe die Datenschutzerklärung gelesen`), während H2 und Lead duzen
  (`Du möchtest Teil des Teams werden?`) — ein Ansprache-Bruch innerhalb einer
  Sektion.
- Farbe/Fläche: Die Sektion liegt auf einer etwas dunkleren Grau-Creme-Fläche,
  die Felder sind darauf nur minimal abgesetzt — Feldflächen und
  Sektionshintergrund liegen sehr nah beieinander, die Felder sind ohne Rahmen
  entsprechend schwach abgegrenzt. Die Deko in der linken Spalte ist ein sehr
  grosses Plus-Zeichen in Akzent-Hellgrün (ca. 250 x 250 px) mit abgerundeten
  Enden — der einzige Farbträger der Sektion und das einzige Vorkommen dieses
  Deko-Elements in dieser Grösse in der Bibliothek.
- Abstände/Rhythmus: Feldabstand vertikal ca. 32 px, horizontal ca. 25 px
  zwischen den beiden Feldspalten. Zwischen Textarea und Datenschutz-Checkbox ca.
  30 px, zwischen Turnstile und Button ca. 40 px. Unter dem Button ca. 110 px bis
  zur Footer-Oberkante.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Bewerbungs-Split mit XXL-Plus-Deko und Beispieldaten als Platzhalter

## Seite: /service/ertragsrechner/

Nur Desktop geschossen (`service__ertragsrechner__-desktop-*`), neun Slices.
Kein Mobile-Shot vorhanden, Mobil-Verhalten **nicht geprüft**. Header wie
Sektion 01, Footer wie Sektion 12. Auffällig im Header: der Nav-Punkt `Service`
ist auf dieser Route sichtbar aufgehellt bzw. ausgegraut gegenüber allen anderen
Labels (`service__ertragsrechner__-desktop-00-fold.png`) — die einzige Stelle der
Bibliothek, an der eine aktive Nav-Sektion markiert ist. Cookie-Overlay wie
überall.

### 59 — Hero, Split mit Eyebrow, Checkliste und Foto [service__ertragsrechner__-desktop-00-fold.png | -]
- Anordnung: Klassischer Split. Links die Textspalte ab ca. 36 px, rechts ein
  Fotoblock ab ca. 600 px bis zum rechten Containerrand bei ca. 1390 px. Der
  Fotoblock hat rechts oben wieder den grossen Viertelkreis-Radius (geschätzt ca.
  180 px), unten läuft er über den Slice-Rand hinaus. Textspalte vierstufig:
  Eyebrow mit Icon, H1, Lead über drei Zeilen, dann eine Checkliste. Der CTA
  liegt unterhalb der Fold-Kante und ist im Fold-Shot **nicht belegt**.
- Buttons/Komponenten: Im Fold kein Button sichtbar. Der Eyebrow ist eine
  Kombination aus einem kleinen dunklen Quadrat mit Blitz-Icon (ca. 20 x 20 px,
  Radius geschätzt 4 px) und einer halbfetten Textzeile daneben — ein
  Icon-Chip-Eyebrow, denselben Typ zeigt Sektion 28 auf `/waermepumpen/`.
  Checkliste als drei Zeilen mit je einem gefüllten Kreis in Akzent-Hellgrün mit
  weissem Haken (ca. 20 px Durchmesser) links vom Text; die dritte Zeile wird vom
  Cookie-Overlay abgeschnitten.
- Typo: Eyebrow ca. 14 px halbfett mit Doppelpunkt am Ende. H1 ca. 44-46 px Bold,
  zweizeilig, enger Zeilenabstand (Versatz ca. 52 px) — deutlich kleiner als die
  Home-H1, aber grösser als die Hero-H1 auf `/erfahrungen/` und `/career/`. Lead
  ca. 16 px Regular über drei manuell umgebrochene Zeilen (die Zeilen enden an
  Sinngrenzen, nicht am Spaltenrand) — der einzige Hero der Bibliothek mit
  echtem Weight-Kontrast zwischen H1 und Lead statt Bold-auf-Bold. Checklisten-Text
  ca. 15 px Regular.
- Farbe/Fläche: Grundfläche Creme, Text fast schwarz — kein Text auf Bild,
  deshalb keine Lesbarkeitsprobleme wie in den Foto-Heros. Akzentgrün nur in den
  drei Haken-Kreisen. Das Foto (Vater und Kind montieren ein Modul auf dem Balkon)
  bleibt unbeschnitten und ohne Wash.
- Abstände/Rhythmus: Zwischen Eyebrow und H1 ca. 30 px, zwischen H1 und Lead ca.
  35 px, zwischen Lead und erster Checklistenzeile ca. 48 px. Checklistenzeilen im
  Abstand von ca. 40 px — sehr locker für eine dreizeilige Liste.
- Mobil: **nicht geprüft**.
- Pattern: `P-HERO-SPLIT` (Variante mit Icon-Chip-Eyebrow und Haken-Checkliste,
  wie Sektion 13 auf `/solaranlagen/`)

### 60 — Rechner-Wizard, Schrittleiste über Auswahlkacheln [service__ertragsrechner__-desktop-02-y750.png | -]
- Anordnung: Dreiteilig gestapelt. Oben eine Schrittleiste über die volle
  Containerbreite mit drei gleich breiten Segmenten (je ca. 355 px), jedes
  Segment mit Label über einer horizontalen Linie; zwischen Segment eins und zwei
  ein Chevron. Darunter zweispaltig: links Frage-H2 plus Erläuterungstext, rechts
  eine Reihe von vier Auswahlkacheln. Ganz unten links das Zurück-/Vor-Pfeilpaar,
  ganz unten rechts der Weiter-Button — die Navigation ist also auf die beiden
  äusseren Ecken auseinandergezogen.
- Buttons/Komponenten: Die vier Auswahlkacheln (je ca. 183 px breit, ca. 280 px
  hoch) sind rahmenlose Flächen; sie tragen oben ein Piktogramm aus Hausdach plus
  Personenfiguren und unten ein Label. Die aktive Kachel (`1 Person`) ist als
  einzige mit einer vollflächigen Fliederfarbe hinterlegt und ihr Piktogramm ist
  dunkel; die drei inaktiven haben keine Fläche und ein Piktogramm in Flieder —
  die Auswahl kehrt also Fläche und Icon-Farbe um, statt nur einen Rahmen zu
  setzen. Zwischen den inaktiven Kacheln stehen dünne vertikale Trennstriche, vor
  der aktiven Kachel fehlt der Strich. Unter der Kachelreihe ein unterstrichener
  Textlink `Optional Verbrauch und Preis eingeben` — kein Button, obwohl er einen
  zweiten Eingabeweg öffnet. Pfeilpaar links: zwei quadratische Outline-Buttons
  (je ca. 42 x 42 px, Radius geschätzt ca. 8 px), beide gleich gestaltet.
  Weiter-Button rechts: gefüllt Dunkelgrün-Schwarz mit weisser Schrift und
  Chevron (ca. 140 x 50 px) — wieder nicht das Akzent-Hellgrün.
- Typo: Schrittlabel ca. 14 px, das aktive halbfett und fast schwarz, die beiden
  kommenden Regular und deutlich blasser. Frage-H2 ca. 40-42 px Bold, drei
  Zeilen. Erläuterung ca. 15 px Regular, vier Zeilen. Kachel-Label ca. 19-20 px
  Bold. Der Kontrast Frage zu Erläuterung ist rund 2,7:1 (geschätzt) — der
  stärkste Typo-Sprung innerhalb einer Sektion auf dieser Seite.
- Farbe/Fläche: Der Wizard sitzt auf einer eigenen, minimal dunkleren Fläche als
  der Hero darüber. Die Fortschrittslinie unter dem aktiven Schritt ist das
  einzige kräftige Grün der Sektion (ein kaltes Signalgrün, nicht das
  Limette-Akzentgrün der CTAs), die beiden kommenden Schritte tragen eine graue
  Linie. Flieder ist hier Auswahlfarbe — dieselbe Farbe, die auf `/erfahrungen/`
  nur Newsletter-Fläche und Deko ist.
- Abstände/Rhythmus: Zwischen Schrittleiste und Frageblock ca. 120 px, zwischen
  Kachelreihe und Textlink ca. 30 px, zwischen Textlink und Navigationszeile ca.
  135 px leere Fläche — der Wizard ist sehr luftig und die Aktionen stehen weit
  vom Inhalt entfernt.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Wizard mit Dreier-Schrittleiste und Flächen-Invertierung als Auswahlzustand

### 61 — Beratungsband, hellgrüne Fläche mit Vierer-Vorteilsraster [service__ertragsrechner__-desktop-02-y750.png, service__ertragsrechner__-desktop-03-y1500.png | -]
- Anordnung: Eine grosse hellgrüne Fläche im Container (ca. 1350 px breit, ca.
  415 px hoch), zweispaltig gefüllt. Links H2, Lead über drei Zeilen und darunter
  der CTA. Rechts ein 2x2-Raster aus Vorteilspunkten, jeder mit Icon links und
  Titel plus zwei bis drei Textzeilen rechts. Die Fläche trägt rechts oben
  denselben grossen Viertelkreis-Radius wie die Fotoblöcke (geschätzt ca. 190 px),
  die anderen drei Ecken sind spitz.
- Buttons/Komponenten: Genau ein CTA, `Jetzt Termin vereinbaren`, gefüllt in
  Dunkelgrün-Schwarz mit weisser Schrift und Chevron (ca. 245 x 52 px, Radius
  geschätzt ca. 6 px). Auf der hellgrünen Fläche ist der dunkle Button die
  einzige mögliche Wahl — das Akzent-Hellgrün wäre hier unsichtbar. Die vier
  Vorteils-Icons sind identisch aufgebaut: ein Haken über einer Stern-/Funken-Form
  in Weiss, ca. 36 x 30 px, gezeichnet in Outline plus gefülltem Haken. Keine
  Karten, keine Trennlinien im 2x2-Raster.
- Typo: H2 ca. 44-46 px Bold, einzeilig, mit Fragezeichen. Lead darunter ca.
  26 px Bold über drei Zeilen — erneut Bold-auf-Bold. Vorteilstitel ca. 17 px
  Bold (ein- oder zweizeilig), Vorteilstext ca. 16 px Regular. Auffällig: Titel
  und Text sind im Grad fast gleich, nur der Weight trennt sie.
- Farbe/Fläche: Die Fläche ist ein mittleres, etwas gedeckteres Grün — kräftiger
  als das Limette-Akzentgrün der CTAs, aber weit heller als das Tannengrün der
  Footer-Fläche. Ein dritter Grünton also, der in dieser Bibliothek sonst nur als
  Sektionsfläche vorkommt. Alle Texte darauf fast schwarz, die Icons weiss.
- Abstände/Rhythmus: Innenabstand links ca. 56 px, oben ca. 90 px. Zwischen Lead
  und CTA ca. 55 px. Vertikaler Abstand zwischen den beiden Rasterzeilen ca.
  60 px, horizontaler zwischen den Spalten ca. 110 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Beratungsband auf Grossfläche mit 2x2-Vorteilsraster

### 62 — E-Book-Split mit Formular und Mockup [service__ertragsrechner__-desktop-03-y1500.png, service__ertragsrechner__-desktop-04-y2250.png | -]
- Anordnung: Zweispaltig, aber stark unausgeglichen. Links H2 (vierzeilig), ein
  Fliesstextblock und darunter ein einspaltiges Formular, das nur ca. 440 px breit
  ist. Rechts ein Produkt-Mockup, das etwa auf Höhe der H2 beginnt und schon
  endet, während links das Formular noch weiterläuft — unter dem Mockup steht ab
  ca. y 470 im Slice `service__ertragsrechner__-desktop-04-y2250.png` eine grosse
  leere Fläche von über 500 px Höhe neben dem Formular.
- Buttons/Komponenten: Drei Textfelder untereinander (`Vorname*`, `Nachname*`,
  `E-Mail*`), je ca. 440 x 52 px, als gefüllte Flächen mit dünnem hellen Rahmen
  und Radius geschätzt ca. 6 px — anders als das Bewerbungsformular in Sektion 58,
  wo die Felder keinen Rahmen tragen. Eine Newsletter-Checkbox mit sehr langem
  Text und aufklappbarem `Mehr lesen`-Link mit Chevron, danach das
  Cloudflare-Turnstile-Widget im eigenen umrandeten Kasten. Absende-Button
  `Jetzt Leitfaden sichern` gefüllt Dunkelgrün-Schwarz mit Chevron (ca. 232 x
  50 px). Das Mockup ist ein Tablet-/Screen-Rahmen mit Schlagschatten, in dem das
  E-Book-Cover liegt — die einzige Stelle der Bibliothek mit einem sichtbaren
  Schatten unter einem Objekt.
- Typo: H2 ca. 40-42 px Bold, vier Zeilen, sehr enger Zeilenabstand. Fliesstext
  ca. 16 px Regular in zwei Absätzen mit manuellen Umbrüchen. Feldlabel ca. 15 px
  Bold mit Sternchen. Platzhalter ca. 16 px Regular in Grau, hier als Aufforderung
  formuliert (`Vornamen eingeben`) statt als Beispieldaten wie in Sektion 58 —
  zwei unterschiedliche Platzhalter-Konventionen innerhalb derselben Website.
  Checkbox-Text ca. 12,5 px, sechs Zeilen lang.
- Farbe/Fläche: Sektionsgrund ist der etwas kühlere Grauton. Kein Akzentgrün in
  der ganzen Sektion ausser innerhalb des E-Book-Covers, wo eine hellgrüne
  Winkel-Grafik und hellgrüne Schrift auf dem Foto liegen. Der Button ist dunkel.
- Abstände/Rhythmus: Feldabstand ca. 32 px. Zwischen letztem Feld und Checkbox ca.
  35 px, zwischen Turnstile und Button ca. 40 px. Unter dem Button ca. 155 px
  Leerfläche bis zum Sektionsende.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Lead-Magnet-Split mit Mockup und einspaltigem Formular

### 63 — Wissens-Akkordeon mit Kategorie-Chips [service__ertragsrechner__-desktop-06-y3750.png | -]
- Anordnung: Eine Liste aus fünf geschlossenen Akkordeon-Zeilen, jede über die
  Containerbreite von ca. 152 px bis 1165 px — die Liste ist also nicht
  linksbündig zum Seitenrand, sondern eingerückt und rechts vor dem Rand
  gestoppt. Jede Zeile besteht aus einem Chip oben links, darunter der Frage-Titel
  (ein- oder zweizeilig), und ganz rechts auf Höhe des Chips ein Plus-Symbol.
  Zwischen den Zeilen dünne horizontale Trennlinien, ebenso über der ersten Zeile.
- Buttons/Komponenten: Der Zustandsanzeiger ist ein reines Plus-Zeichen ohne
  Kreis, ohne Fläche und ohne Rahmen (ca. 22 x 22 px), das oben rechts sitzt und
  nicht vertikal zur Titelzeile zentriert ist — bei den zweizeiligen Titeln steht
  es sichtbar über der Titelmitte. Alle fünf Zeilen sind geschlossen, ein
  geöffneter Zustand ist **nicht belegt**. Der Chip ist eine kleine gefüllte
  Kachel mit sehr geringem Radius (geschätzt ca. 3 px, fast rechteckig) — kein
  Pill. Chips sind nicht anklickbar gestaltet, sie wirken als Kategorie-Label,
  nicht als Filter.
- Typo: Chip-Text ca. 12,5 px Bold, fast schwarz. Frage-Titel ca. 30-32 px Bold,
  gemischte Schreibweise. Der Grössensprung Chip zu Titel ist rund 2,5:1
  (geschätzt) — die Titel sind für eine Akkordeon-Liste ungewöhnlich gross, jede
  Zeile beansprucht ca. 150 px Höhe.
- Farbe/Fläche: Chips in Akzent-Hellgrün, das ist die einzige Farbe der Sektion.
  Titel und Plus fast schwarz, Trennlinien sehr hell. Kein Kartenhintergrund, die
  Zeilen liegen direkt auf der Grundfläche. Direkt unter der letzten Zeile beginnt
  ca. 165 px tiefer die Fliederfläche der Newsletter-Sektion mit demselben grossen
  Viertelkreis-Radius rechts oben.
- Abstände/Rhythmus: Zeilenhöhe ca. 148 px bei einzeiligem, ca. 187 px bei
  zweizeiligem Titel. Zwischen Chip und Titel ca. 25 px, zwischen Titel und
  nächster Trennlinie ca. 35 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Akkordeon mit Kategorie-Chip und blossem Plus statt Chevron

### 64 — Newsletter-Split auf Fliederfläche mit Riesen-Ecke [service__ertragsrechner__-desktop-06-y3750.png | -]
- Anordnung: Wie Sektion 43 und 54 zweispaltig auf Fliederfläche, hier aber mit
  dem grossen Viertelkreis-Radius rechts oben (geschätzt ca. 190 px) — auf
  `/erfahrungen/` (Sektion 54) hat dieselbe Fläche spitze Ecken. Links H2, rechts
  das Formular ab ca. 810 px.
- Buttons/Komponenten: Im Slice sichtbar nur das erste Feld `Dein Vorname` als
  weisse, rahmenlose Fläche (ca. 435 x 52 px). Der restliche Formularaufbau liegt
  unter dem Cookie-Overlay und ist hier **nicht belegt** — für den vollständigen
  Aufbau siehe Sektion 54.
- Typo: H2 ca. 46-48 px Bold, zweizeilig. Feldlabel ca. 15 px Bold, hier **ohne**
  Sternchen und mit persönlicher Ansprache im Label (`Dein Vorname`) statt der
  neutralen Form `Vorname*` aus Sektion 54 und 58 — dritte Label-Konvention
  derselben Website.
- Farbe/Fläche: Fliederfläche wie Sektion 54, Text fast schwarz, Feldfläche weiss.
- Abstände/Rhythmus: Zwischen Flächenoberkante und Feldlabel ca. 70 px.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 43, Abweichung: Riesen-Eckradius rechts oben
  und geduzte Feldlabel ohne Pflichtfeld-Sternchen.

## Seite: /service/faq/

Nur Desktop geschossen (`service__faq__-desktop-*`), sechs Slices. Kein
Mobile-Shot, Mobil-Verhalten **nicht geprüft**. Header wie Sektion 01 (auch hier
ist `Service` als aktive Sektion aufgehellt, belegt in
`service__faq__-desktop-00-fold.png`), Footer wie Sektion 12. Cookie-Overlay wie
überall.

### 65 — Support-Hero mit Suchfeld statt CTA [service__faq__-desktop-00-fold.png, service__faq__-desktop-01-y0.png | -]
- Anordnung: Einspaltig und zentriert-linksbündig in einem schmalen Mittelcontainer
  von ca. 260 px bis 1165 px — also ca. 905 px breit in einem 1440er Viewport,
  auf beiden Seiten grosszügig eingerückt. Vierstufig gestapelt: Icon-Chip-Eyebrow,
  H1, zweizeiliger Lead mit Inline-Link, dann ein Suchfeld mit eigenem Label
  darüber. Kein Bild, keine zweite Spalte, kein Hero-Foto — die einzige Seite der
  Bibliothek mit einem rein textlichen Hero.
- Buttons/Komponenten: Kein Button im gesamten Fold. Die primäre Aktion ist ein
  Suchfeld über die volle Containerbreite (ca. 905 x 52 px), gefüllte Fläche mit
  dünnem hellen Rahmen, Radius geschätzt ca. 6 px, mit einem Info-Kreis-Icon links
  im Feld — bemerkenswert, weil ein Suchfeld sonst eine Lupe trägt; hier steht ein
  `i`-Symbol. Kein Absende-Button neben dem Feld. Der Eyebrow ist derselbe
  Icon-Chip wie in Sektion 59: dunkles Quadrat mit Blitz-Icon plus Textlabel. Im
  Lead ein unterstrichener, halbfetter Inline-Link (`ExpertInnen-Support.`), der
  nicht farblich abgesetzt ist, sondern nur über Unterstreichung und Weight.
- Typo: Eyebrow ca. 15 px halbfett. H1 ca. 52-54 px Bold, einzeilig — die grösste
  H1 nach der Startseite und die einzige einzeilige der neu dokumentierten Routen.
  Lead ca. 17 px Regular über zwei Zeilen. Feldlabel `Hilfe` ca. 14 px Bold,
  Platzhalter ca. 16 px Regular in Grau, als Frage formuliert (`Wie können wir Dir
  helfen?`) — eine wörtliche Wiederholung der H1 im Feld, vierte
  Platzhalter-Konvention der Website neben Beispieldaten (Sektion 58),
  Aufforderung (Sektion 62) und Label-Wiederholung (Sektion 64).
- Farbe/Fläche: Grundfläche einheitlich, kein Flächenwechsel im gesamten Fold.
  Text fast schwarz. Akzentgrün kommt im Hero nur im Blitz-Icon des Eyebrow-Chips
  vor — der Hero ist nahezu farblos.
- Abstände/Rhythmus: Zwischen Eyebrow und H1 ca. 25 px, H1 zu Lead ca. 35 px,
  Lead zu Feldlabel ca. 105 px — ein sehr grosser Sprung, der das Suchfeld optisch
  vom Text ablöst. Feldlabel zu Feld ca. 25 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Support-Hero mit Suchfeld als einzige Aktion

### 66 — Kategorie-Kacheln, gestufte Reihen mit Icon [service__faq__-desktop-01-y0.png, service__faq__-desktop-02-y750.png | -]
- Anordnung: Acht gleich grosse Kacheln (je ca. 212 px breit, ca. 165 px hoch) in
  drei Reihen: drei, drei, zwei. Die dritte Reihe ist nicht linksbündig, sondern
  mittig unter den beiden vollen Reihen ausgerichtet, so dass eine Pyramidenform
  entsteht — die Restkacheln werden also zentriert statt links angehängt.
  Kachelinhalt zweistufig und zentriert: Icon oben, Label darunter.
- Buttons/Komponenten: Kacheln sind gefüllte Flächen mit deutlicher Eckrundung
  (Radius geschätzt ca. 10-12 px), ohne Rahmen und ohne Schatten. Kein Chevron,
  kein Pfeil, kein `Mehr`-Link — dass die Kacheln klickbar sind, zeigt allein die
  Fläche. Die Icons sind Zweifarb-Strichzeichnungen (ca. 46 x 46 px): Grundstrich
  fast schwarz, ein Teilelement in Akzent-Hellgrün — bei jedem Icon ein anderes
  Detail (der Haken im Klemmbrett, der Blitz im Tacho, der Griff des
  Schraubenschlüssels, die Bewegungslinien am Transporter). Ein konsequent
  durchgezogenes Icon-System, das nur einen Farbimpuls pro Symbol setzt. Zwei
  Icons (`Erweiterungssets`, `800-Watt-Update`) sind Ausnahmen: dort ist die
  gesamte Form akzentgrün bzw. teilweise ausgefüllt.
- Typo: Kachel-Label ca. 17-18 px Bold, zentriert, ein- oder zweizeilig,
  gemischte Schreibweise. Kein Zusatztext, keine Anzahl-Angabe der Fragen pro
  Kategorie.
- Farbe/Fläche: Kachelfläche ist ein Grau, das nur wenige Stufen von der
  Grundfläche abweicht — im Shot durch das Overlay zusätzlich abgeflacht, so dass
  die Kachelkanten schwach sind. Kein aktiver oder ausgewählter Zustand belegt:
  alle acht Kacheln sehen identisch aus.
- Abstände/Rhythmus: Kachelabstand horizontal und vertikal je ca. 20 px — ein
  eng gesetztes Raster. Über der ersten Reihe ca. 100 px Abstand zum Suchfeld,
  unter der dritten Reihe ca. 140 px bis zur Hinweiszeile der Fragenliste.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Kategorie-Kachelraster mit Zweifarb-Icons und zentrierter Restreihe

### 67 — Fragenliste als Akkordeon-Karten mit Plus links [service__faq__-desktop-02-y750.png | -]
- Anordnung: Über der Liste eine linksbündige Hinweiszeile bei ca. 260 px.
  Darunter gestapelte Akkordeon-Karten über die Containerbreite von ca. 260 px bis
  1165 px, jede als eigene Karte mit Abstand zur nächsten — anders als beim
  Akkordeon in Sektion 63, das mit durchgehenden Trennlinien statt Karten
  arbeitet. Jede Karte: Plus-Symbol links, Fragentext rechts daneben.
- Buttons/Komponenten: Das Plus-Zeichen steht **links** vor dem Text (ca. 22 x
  22 px, ohne Kreis und ohne Fläche), nicht rechts aussen wie in Sektion 63 — die
  Website benutzt also zwei gegenläufige Akkordeon-Muster. Bei zweizeiligen Fragen
  ist das Plus vertikal zur Kartenmitte zentriert, hier also sauber ausgerichtet.
  Karten mit Eckrundung (Radius geschätzt ca. 8 px), ohne Rahmen und ohne
  Schatten. Alle Karten geschlossen, ein geöffneter Zustand ist **nicht belegt**.
  Am Listenende ein gefüllter Button `Mehr Fragen` in Dunkelgrün-Schwarz mit
  weisser Schrift, zentriert (belegt in `service__faq__-desktop-04-y2250.png`,
  dort oben angeschnitten) — Nachladen statt Paginierung.
- Typo: Hinweiszeile ca. 17 px Bold. Fragentext ca. 21-22 px Bold, ein- oder
  zweizeilig — deutlich kleiner als die Akkordeon-Titel in Sektion 63 (ca. 31 px),
  obwohl beide dieselbe Funktion haben. Kein Kategorie-Chip in der Karte, obwohl
  die Seite oben mit Kategorien arbeitet.
- Farbe/Fläche: Kartenfläche minimal heller/anders als der Grund, Plus-Symbol in
  einem gedeckten Flieder statt in Akzentgrün oder Schwarz — dieselbe Fliederfamilie
  wie die Newsletter-Fläche und die Wizard-Auswahl in Sektion 60. Fragentext fast
  schwarz.
- Abstände/Rhythmus: Kartenhöhe ca. 68 px bei einzeiliger, ca. 95 px bei
  zweizeiliger Frage. Abstand zwischen den Karten ca. 24 px. Zwischen Hinweiszeile
  und erster Karte ca. 30 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Akkordeon-Kartenliste mit Plus links und Nachlade-Button

### 68 — Fremdsystem-Hinweis unter der Liste [service__faq__-desktop-04-y2250.png | -]
- Anordnung: Eine einzelne zentrierte Textzeile unmittelbar unter dem
  `Mehr Fragen`-Button, ca. 45 px darunter, ohne eigene Fläche und ohne Rahmen.
- Buttons/Komponenten: Kein Button. Die Zeile enthält einen unterstrichenen
  Inline-Link auf den Anbieter der Hilfeseite (`OMQ`). Das ist ein
  Provider-Hinweis, kein gestaltetes Element — er steht als Fussnote frei in der
  Fläche.
- Typo: Ca. 14 px Regular in Grau, der Link im selben Grad, unterstrichen und
  einen Hauch dunkler. Auffällig für einen Sektions-Abschluss: kein Bold, keine
  Trennlinie darüber.
- Farbe/Fläche: Grau auf der Grundfläche, kein Farbträger. Direkt darunter, ca.
  40 px tiefer, beginnt die Fliederfläche der Newsletter-Sektion — der Hinweis
  klemmt also zwischen Button und Grossfläche.
- Abstände/Rhythmus: Siehe oben; der Abstand nach unten ist kleiner als nach oben,
  die Zeile hängt optisch an der Fliederfläche statt am Button.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Provider-Fussnote als freie Textzeile

### 69 — Newsletter-Split auf Fliederfläche, vollständig belegt [service__faq__-desktop-04-y2250.png | -]
- Anordnung: Zweispaltig auf Fliederfläche mit grossem Viertelkreis-Radius rechts
  oben (geschätzt ca. 190 px), Fläche von ca. 36 px bis 1390 px, Höhe ca. 600 px.
  Links H2 (zweizeilig), Lead (dreizeilig) und darunter die Stern-mit-Haken-Deko.
  Rechts das vollständige Formular ab ca. 810 px. Dies ist der einzige Shot der
  Bibliothek, in dem diese Sektion **nicht** vom Cookie-Overlay beschnitten ist —
  hier ist der komplette Aufbau belegt.
- Buttons/Komponenten: Zwei Felder (`Dein Vorname` ohne Sternchen, `E-Mail*` mit
  Sternchen — die Pflichtfeld-Kennzeichnung ist also innerhalb desselben Formulars
  uneinheitlich mit der Label-Ansprache gemischt). Beide Felder ca. 435 x 52 px,
  weisse Flächen ohne Rahmen, Radius geschätzt ca. 4 px. Darunter eine
  Einwilligungs-Checkbox mit dreizeiligem Text und einem aufklappbaren
  `Mehr lesen`-Link mit Chevron, dann das Cloudflare-Turnstile-Widget als heller
  Kasten mit Rahmen (ca. 300 x 65 px), dann der Button `Newsletter abonnieren`
  gefüllt Dunkelgrün-Schwarz mit weisser Schrift und Chevron (ca. 228 x 52 px).
  Die Deko ist ein grosser grauer Stern mit einem schwarzen Haken darüber (ca.
  245 x 215 px), der die untere linke Spaltenhälfte füllt und sonst keine Funktion
  hat.
- Typo: H2 ca. 46-48 px Bold, zwei Zeilen. Lead ca. 24-26 px Bold in einem
  gedeckten Grauton, drei Zeilen — Bold-auf-Bold, nur über die Farbe getrennt.
  Feldlabel ca. 15 px Bold. Platzhalter ca. 16 px Regular in Grau, beim ersten
  Feld als Label-Wiederholung (`Dein Vorname`), beim zweiten als Aufforderung
  (`E-Mail adresse eingeben`) — zwei Konventionen in einem Formular, zusätzlich
  ist `E-Mail adresse` klein geschrieben. Checkbox-Text ca. 12 px.
- Farbe/Fläche: Fliederfläche über die gesamte Sektion, alle Texte fast schwarz,
  Felder weiss. Kein Grün in der Sektion. Unmittelbar unter der Flächenunterkante
  beginnt ohne Übergangszone der dunkle Footer.
- Abstände/Rhythmus: Innenabstand links ca. 56 px, oben ca. 75 px. Zwischen den
  Feldern ca. 32 px, Feld zu Checkbox ca. 30 px, Checkbox zu Turnstile ca. 30 px,
  Turnstile zu Button ca. 32 px. Unter dem Button ca. 60 px bis zur
  Flächenunterkante.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 43; dies ist der Referenz-Shot der Sektion,
  weil hier als einzigem alle Formularstufen unverdeckt sichtbar sind.

## Seite: /kontakt/

Nur Desktop geschossen (`kontakt__-desktop-*`), sieben Slices. Kein Mobile-Shot,
Mobil-Verhalten **nicht geprüft**. Header wie Sektion 01 (`Service` wieder als
aktive Sektion aufgehellt, belegt in `kontakt__-desktop-01-y0.png`), Footer wie
Sektion 12. Cookie-Overlay wie überall.

Diese Route ist über weite Strecken dieselbe Seite wie `/service/faq/`: Hero,
Kategorie-Kacheln und Fragenliste sind bis auf zwei Details identisch. Unten
werden deshalb nur die Abweichungen sowie die eine eigene Sektion ausbeschrieben.

### 70 — Support-Hero, Kontakt-Variante ohne Kategorien-Hinweis [kontakt__-desktop-01-y0.png | -]
- Anordnung: Wie Sektion 65 einspaltig im schmalen Mittelcontainer, hier von ca.
  260 px bis 1130 px. Eyebrow-Chip, H1, ein **einzeiliger** Lead, dann das
  Suchfeld mit Label. Die Struktur ist identisch, der Container ist ca. 35 px
  schmaler.
- Buttons/Komponenten: Wie Sektion 65 kein Button, Suchfeld mit Info-Kreis-Icon
  links (ca. 833 x 52 px). Der Eyebrow-Chip ist derselbe dunkle Blitz-Kachel, das
  Label lautet hier `Kontakt` statt `FAQ`. Der Lead enthält im Gegensatz zu
  Sektion 65 **keinen** Inline-Link und keinen Verweis auf die Kategorien darunter
  — obwohl direkt darunter dieselben acht Kategorie-Kacheln stehen; der Text
  nennt nur das Suchfeld.
- Typo: H1 identisch ca. 52-54 px Bold, einzeilig, und wortgleich mit der FAQ-Seite
  (`Hallo, wie können wir Dir helfen?`). Lead ca. 17 px Regular, eine Zeile statt
  zwei. Feldlabel `Hilfe` ca. 14 px Bold, Platzhalter wie auf der FAQ-Seite.
- Farbe/Fläche: Wie Sektion 65 nahezu farblos, Akzentgrün nur im Blitz des
  Eyebrow-Chips.
- Abstände/Rhythmus: Zwischen Lead und Feldlabel ca. 120 px — noch etwas mehr als
  auf der FAQ-Seite, weil der Lead hier nur eine Zeile hat und der Abstand zum
  Feld nicht mitwandert.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 65, Abweichung: einzeiliger Lead ohne
  Inline-Link, Eyebrow-Label `Kontakt`.

### 71 — Kategorie-Kacheln und Fragenliste, Wiederholung [kontakt__-desktop-01-y0.png, kontakt__-desktop-02-y750.png, kontakt__-desktop-03-y1500.png | -]
- Anordnung: Dieselben acht Kacheln in der Pyramidenform drei/drei/zwei und
  dieselbe Akkordeon-Kartenliste wie in Sektion 66 und 67, hier nur um ca. 20 px
  nach rechts versetzt (Kachelblock von ca. 400 px bis 1025 px). Die Fragenliste
  läuft von ca. 297 px bis 1128 px.
- Buttons/Komponenten: Identisch zu Sektion 66 und 67 — Zweifarb-Icons, kein
  Chevron auf den Kacheln, Plus links vor der Frage, Nachlade-Button
  `Mehr Fragen` in Dunkelgrün-Schwarz und darunter die Provider-Fussnote mit
  `OMQ`-Link (belegt in `kontakt__-desktop-03-y1500.png`). Der Fragenbestand ist
  wortgleich derselbe; auch die Hinweiszeile `Bitte wähle eine Kategorie oder
  tippe oben einen Suchbegriff ein` ist identisch — sie widerspricht hier dem
  Hero-Lead, der die Kategorien gar nicht erwähnt.
- Typo: Identisch zu Sektion 66/67. Die Fragen brechen wegen des schmaleren
  Containers teils an anderer Stelle um als auf der FAQ-Seite (etwa `Mein
  Wechselrichter funktioniert nicht ordnungsgemäß, was kann ich tun?`).
- Farbe/Fläche: Identisch; Plus-Symbole in gedecktem Flieder, Kartenflächen
  minimal vom Grund abgesetzt.
- Abstände/Rhythmus: Kachelabstand ca. 20 px, Kartenabstand ca. 24 px wie auf der
  FAQ-Seite.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 66 und 67 ohne gestalterische Abweichung.

### 72 — Kontaktkanäle, drei Textspalten mit Trennstrich und Button [kontakt__-desktop-04-y2250.png | -]
- Anordnung: Drei Spalten nebeneinander (je ca. 285 px breit) ab ca. 152 px, die
  zusammen nur bis ca. 955 px reichen — rechts bleibt rund ein Drittel der Breite
  leer, das Raster ist also linksbündig statt über die Fläche verteilt. Jede
  Spalte vierstufig: Icon oben, Titel, Fliesstext, Button. Vor jeder Spalte steht
  links ein dünner vertikaler Trennstrich über die volle Spaltenhöhe, hinter der
  dritten Spalte fehlt er — die Striche stehen also als Vorsatz vor jeder Spalte,
  nicht zwischen ihnen.
- Buttons/Komponenten: Drei gefüllte Buttons in Dunkelgrün-Schwarz mit weisser
  Schrift, ohne Chevron (im Unterschied zu fast allen anderen CTAs der Website),
  Höhe ca. 47 px, Breite je nach Label unterschiedlich (ca. 227 px, ca. 179 px,
  ca. 215 px) — die Buttons sind also nicht auf gleiche Breite normiert und
  stehen dadurch mit ungleichen rechten Kanten nebeneinander. Die Icons oben sind
  dieselben Zweifarb-Strichzeichnungen wie auf den Kategorie-Kacheln (ca. 44 x
  36 px): Videoplayer, Blog-Fenster, Sprechblasen-Paar, je mit einem
  akzentgrünen Teilelement.
- Typo: Spaltentitel ca. 21-22 px Bold, ein- oder zweizeilig — die Titel sind
  unterschiedlich hoch, die Fliesstexte beginnen dadurch trotzdem auf gleicher
  Höhe, weil ein fester Abstand von der Titeloberkante gesetzt scheint. Fliesstext
  ca. 16 px Regular, drei bis fünf Zeilen. Button-Label ca. 16 px Bold. Auffällig:
  ein Label enthält einen Grammatikfehler (`Hier gehts zur Blog`), was im
  Screenshot klar sichtbar ist.
- Farbe/Fläche: Die Sektion sitzt auf einer eigenen, minimal dunkleren Fläche als
  die Fragenliste darüber; darunter folgt die Fliederfläche der
  Newsletter-Sektion. Kein Akzentgrün ausser in den Icons, die Buttons sind
  dunkel.
- Abstände/Rhythmus: Spaltenabstand ca. 18 px vom Trennstrich zum Text. Zwischen
  Icon und Titel ca. 45 px, zwischen Titel und Fliesstext ca. 45 px, zwischen
  Fliesstext und Button ca. 30 bis 60 px je nach Textlänge — die Buttons sind auf
  eine gemeinsame Grundlinie ausgerichtet, obwohl die Texte unterschiedlich lang
  sind.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Kanal-Spalten mit Vorsatz-Trennstrich und unnormierten Buttons

### 73 — Newsletter-Split auf Fliederfläche, Wiederholung [kontakt__-desktop-04-y2250.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: identisch zu Sektion 69, inklusive
  Riesen-Eckradius rechts oben und der Label-Mischung `Dein Vorname` (ohne
  Sternchen) neben `E-Mail*` (mit Sternchen). Im Slice
  `kontakt__-desktop-04-y2250.png` ist der Block ab der Checkbox vom
  Cookie-Overlay verdeckt und dort **nicht belegt**; für den vollständigen Aufbau
  gilt Sektion 69.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 43 bzw. 69 ohne Abweichung.

## Seite: /store-in-deiner-naehe/

Nur Desktop geschossen (`store-in-deiner-naehe__-desktop-*`), neun Slices. Kein
Mobile-Shot, Mobil-Verhalten **nicht geprüft**. Header wie Sektion 01, hier ist
`Franchise` als aktive Sektion aufgehellt (belegt in
`store-in-deiner-naehe__-desktop-01-y0.png`) statt `Service` wie auf den
Support-Routen. Cookie-Overlay wie überall.

Diese Route weicht als einzige der Bibliothek vom Creme-Grundton ab: sie arbeitet
mit **randlosen dunkelgrünen Vollflächen** und einem kalten Signalgrün, das sonst
nur als Icon-Farbe vorkommt. Sie wirkt wie ein eigener Marken-Layer über demselben
Header/Footer.

### 74 — Hero auf dunkelgrüner Vollfläche mit Bildkarte [store-in-deiner-naehe__-desktop-01-y0.png | -]
- Anordnung: Split auf einer randlos über die volle Breite laufenden dunklen
  Fläche (Höhe ca. 640 px). Links die Textspalte ab ca. 36 px: Icon-Chip-Eyebrow,
  H1 (zweizeilig), Lead (zweizeilig), Haken-Checkliste mit drei Punkten, dann ein
  grosser leerer Block, unten eine Vorspann-Zeile mit Blitz-Icon und darunter der
  CTA. Rechts ab ca. 610 px eine Bildkarte, deren obere Kanten beide gerundet
  sind (links ca. 8 px, rechts ein grosser Viertelkreis von geschätzt ca. 130 px)
  und die oben einen eigenen Kopfbalken trägt.
- Buttons/Komponenten: Genau ein CTA, `Standorte finden`, gefüllt in
  Akzent-Hellgrün mit fast schwarzem Label und Chevron — und zwar über die volle
  Spaltenbreite von ca. 548 px bei ca. 50 px Höhe. Das ist der einzige
  vollbreite Block-CTA der Bibliothek; überall sonst sind CTAs
  inhaltsbreit (ca. 140-250 px). Der Kopfbalken der Bildkarte ist ein
  hellgrün-transparenter Streifen (ca. 90 px hoch) mit einem weissen Winkel-Icon
  links und einer Bold-Zeile daneben — eine Art Bild-Titelleiste, die es sonst
  nirgends gibt. Checkliste als drei Zeilen mit gefülltem Kreis plus Haken in
  Akzentgrün. Eyebrow-Chip wie in Sektion 59 und 65, hier mit hellem Blitz auf
  dunklem Quadrat.
- Typo: Eyebrow ca. 14 px halbfett in Weiss. H1 ca. 38-40 px Bold, zweizeilig,
  in Weiss, gesetzt in drei kurzen Hauptsätzen mit Punkten (`Deine Energielösung.
  Persönlich. Vor Ort.`) — ein Staccato-Satzbau, den keine andere Seite benutzt.
  Lead ca. 16 px Regular in gebrochenem Weiss. Checklistentext ca. 15 px Regular.
  Die Vorspann-Zeile über dem CTA ca. 16 px Bold mit vorangestelltem Blitz-Icon.
  CTA-Label ca. 16 px Bold.
- Farbe/Fläche: Die Fläche ist ein dunkles Tannengrün, deutlich dunkler und
  gesättigter als die Sektionsflächen der anderen Routen und identisch mit dem
  Footer-Grün. Der Hero ist damit die einzige dunkle Hero-Fläche der Bibliothek.
  Der Bildkarten-Kopfbalken liegt halbtransparent über dem Foto und lässt die
  Bildkante darunter durchscheinen.
- Abstände/Rhythmus: Eyebrow zu H1 ca. 22 px, H1 zu Lead ca. 30 px, Lead zu
  Checkliste ca. 30 px, Checklistenzeilen im Abstand von ca. 28 px. Danach ein
  leerer Block von ca. 185 px bis zur Vorspann-Zeile — der CTA wird also
  bewusst an die untere Kante der Textspalte gedrückt, auf Höhe der
  Bildunterkante.
- Mobil: **nicht geprüft**.
- Pattern: `P-HERO-SPLIT` (Variante: dunkle Vollfläche, vollbreiter Block-CTA,
  Bildkarte mit eigenem Kopfbalken)

### 75 — Stat-Karten, drei dunkelgrüne Kacheln mit Einheitszeichen [store-in-deiner-naehe__-desktop-01-y0.png, store-in-deiner-naehe__-desktop-02-y750.png | -]
- Anordnung: Drei Kacheln nebeneinander (je ca. 370 px breit, ca. 175 px hoch),
  Reihe zentriert von ca. 146 px bis 1281 px. Inhalt zweistufig und zentriert:
  Zahl mit nachgestelltem Zeichen, darunter die Erläuterung. Kein Vorwort über
  der Zahl, anders als in Sektion 47.
- Buttons/Komponenten: Keine Buttons. Kacheln mit deutlicher Eckrundung (Radius
  geschätzt ca. 10 px), ohne Rahmen und ohne Schatten. Das Einheitszeichen (`+`,
  `+`, `%`) sitzt klein und hochgestellt rechts an der Zahl — anders als in
  Sektion 47, wo die Einheit auf der Grundlinie steht.
- Typo: Zahl ca. 40-42 px, auffällig **nicht Bold**, sondern in einem leichten
  Weight mit weiten Ziffern — der einzige Ort der Bibliothek, an dem eine grosse
  Zahl nicht fett gesetzt ist. Einheitszeichen ca. 14 px. Erläuterung ca. 14 px
  Regular, einzeilig, zentriert. Verhältnis Zahl zu Erläuterung grob 3:1
  (geschätzt).
- Farbe/Fläche: Kachelfläche im dunklen Tannengrün wie der Hero darüber, aber die
  Kacheln liegen auf der hellen Grundfläche — die dunkle Hero-Fläche endet
  oberhalb der Kacheln, die Kacheln setzen die Dunkelheit als Inseln fort. Die
  Zahlen sind in Akzent-Hellgrün, die Erläuterungen in gebrochenem Weiss. Das ist
  dieselbe Farbrolle wie bei den Stat-Karten der Startseite (Sektion 09), aber
  invers zu Sektion 47 auf `/erfahrungen/`.
- Abstände/Rhythmus: Kachelabstand ca. 15 px. Über der Reihe ca. 85 px, darunter
  ca. 90 px bis zum Flächenwechsel.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 09 mit anderem Zahlen-Weight und
  hochgestellter Einheit.

### 76 — Store-Verzeichnis, Bildkarten mit Adressblock [store-in-deiner-naehe__-desktop-02-y750.png | -]
- Anordnung: Eine zentrierte H2 über der Sektion, darunter linksbündig eine
  zweite, kleinere Überschrift (`Alle Stores`) — zwei Überschriftenebenen mit
  unterschiedlicher Ausrichtung direkt übereinander. Darunter ein vierspaltiges
  Kartenraster (je ca. 320 px breit) über die volle Containerbreite, mindestens
  zwei Reihen (die zweite Reihe ist im Slice angeschnitten). Jede Karte
  viergliedrig: Foto oben, Ortsname, Adress- bzw. Kontaktblock, Öffnungszeiten als
  Zweispalter, dann der Button.
- Buttons/Komponenten: Karten als Flächen mit Eckrundung (Radius geschätzt ca.
  6 px), ohne Rahmen, ohne Schatten; das Foto füllt die obere Kartenhälfte
  randlos bis an die Kartenkanten. Der Button `Zur Store-Seite` ist ein
  **Outline**-Button mit dünner dunkler Kontur, transparenter Fläche, dunklem
  Label und Chevron (ca. 285 x 48 px) — die einzige Stelle der Bibliothek mit
  einem Outline-CTA in einer Karte. Er läuft über die Kartenbreite minus
  Innenabstand. In der vierten Karte (`Freiburg`) fehlt der Button ganz und der
  Kontaktblock enthält statt einer Strassenadresse einen Personennamen und eine
  E-Mail — ein sichtbar unvollständiger Datensatz im selben Raster.
- Typo: H2 zentriert ca. 40-42 px Bold. Zweitüberschrift `Alle Stores`
  linksbündig ca. 30-32 px Bold. Ortsname ca. 17 px Bold. Adresszeilen ca. 15 px
  Regular. Öffnungszeiten als zwei Spalten aus Tages-Label in Bold (ca. 13,5 px)
  und Zeitangabe in Regular, an einer festen Tabulatorposition ausgerichtet — der
  einzige tabellarisch gesetzte Block der Bibliothek. Button-Label ca. 15 px Bold.
- Farbe/Fläche: Sektionsgrund ist wieder das helle Grau-Creme. Kartenfläche nur
  minimal davon abgesetzt. Kein Grün in der Sektion ausser der impliziten
  Button-Kontur; die Fotos sind Stadtansichten in natürlichen Farben und tragen
  keinen Wash und keine Beschriftung.
- Abstände/Rhythmus: Zwischen H2 und `Alle Stores` ca. 105 px, zwischen
  `Alle Stores` und Kartenreihe ca. 30 px. Kartenabstand horizontal ca. 25 px.
  Innerhalb der Karte: Foto zu Ortsname ca. 30 px, Öffnungszeiten zu Button ca.
  30 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Store-Karte mit randlosem Foto, Öffnungszeiten-Tabelle und Outline-CTA

### 77 — Lösungs-Kacheln, drei Fotokarten mit Plus-Marke [store-in-deiner-naehe__-desktop-04-y2250.png | -]
- Anordnung: Zentrierte, zweizeilige H2 über einer Dreier-Reihe aus Fotokacheln
  (je ca. 435 px breit, ca. 505 px hoch) über die Containerbreite. Jede Kachel ist
  ein Vollbild-Foto, auf dem Titel und Beschreibungstext oben liegen; unten links
  in der Kachel sitzt ein Plus-Zeichen.
- Buttons/Komponenten: Kein Button, kein Chevron. Das grosse Plus unten links
  (ca. 45 x 45 px, Strichform mit flachen Enden) ist der einzige Hinweis auf
  Interaktion — dieselbe Kachel-Mechanik wie Sektion 05 auf der Startseite. Ein
  aufgeklappter Zustand ist **nicht belegt**. Kachelecken minimal gerundet
  (geschätzt ca. 6 px).
- Typo: H2 ca. 40-42 px Bold, zentriert, zwei Zeilen. Kacheltitel ca. 25-26 px
  Bold in Weiss. Kacheltext ca. 15-16 px Bold in Weiss, zwei bis drei Zeilen —
  auch hier Bold-auf-Bold statt Weight-Kontrast.
- Farbe/Fläche: Die Fotos tragen keinen durchgehenden Wash; die Typo steht
  ungeschützt auf dem Bild. In der linken Kachel (`Wärmepumpen`) läuft die letzte
  Textzeile über eine sehr helle Hauswand und verliert dort deutlich Kontrast —
  dasselbe Muster wie im Home-Hero (Sektion 02). Das Plus ist in einem kalten,
  fast minzigen Signalgrün gesetzt, nicht im Limette-Akzentgrün — dieselbe
  Sonderfarbe, die die Startseite nur für Grafikelemente benutzt.
- Abstände/Rhythmus: Zwischen H2 und Kachelreihe ca. 55 px, Kachelabstand ca.
  25 px. Innerhalb der Kachel Innenabstand oben ca. 30 px, links ca. 25 px.
  Zwischen Kacheltext und Plus liegt ca. 300 px reine Bildfläche.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 05, Abweichung: Signalgrünes Plus statt
  Akzentgrün, kein Bild-Wash.

### 78 — Prozessband, vier nummerierte Kacheln auf Dunkelgrün [store-in-deiner-naehe__-desktop-04-y2250.png, store-in-deiner-naehe__-desktop-05-y3000.png | -]
- Anordnung: Eine randlose dunkelgrüne Vollflächen-Sektion (Höhe ca. 665 px), die
  oben rechts einen sehr grossen Viertelkreis-Radius trägt (geschätzt ca. 210 px),
  unten aber gerade abschliesst. Darin zentriert die H2, darunter eine Reihe aus
  vier gleich breiten Kacheln (je ca. 320 px, ca. 370 px hoch) über die
  Containerbreite. Kachelinhalt dreistufig linksbündig: Ziffer, Titel, Text.
- Buttons/Komponenten: Keine Buttons und keine Verbindungslinien oder Pfeile
  zwischen den Schritten — die Reihenfolge trägt allein die Ziffer. Das
  unterscheidet dieses Prozessband deutlich von der Prozess-Schlange auf
  `/waermepumpen/` (Sektion 34), die neun Schritte mit Wegführung zeigt. Kacheln
  mit Eckrundung (Radius geschätzt ca. 10 px), ohne Rahmen, ohne Icon.
- Typo: H2 ca. 40-42 px Bold in gebrochenem Weiss, mit Doppelpunkt am Ende.
  Ziffer sehr gross (ca. 55-58 px) und **nicht Bold**, sondern in einem leichten
  Weight mit weiten Ziffernformen — dasselbe untypische Zahlen-Weight wie in
  Sektion 75, was die beiden Sektionen dieser Route verbindet. Kacheltitel ca.
  23-24 px Bold, ein- oder zweizeilig; die Titel sind unterschiedlich hoch,
  wodurch die Fliesstexte in den vier Kacheln auf unterschiedlichen Höhen
  beginnen (Kachel 1 höher als Kachel 2 und 3). Kacheltext ca. 15,5 px Regular
  mit manuellen Zeilenumbrüchen an Sinngrenzen.
- Farbe/Fläche: Sektionsfläche im dunklen Tannengrün, Kacheln im
  Akzent-Hellgrün, Kacheltext fast schwarz — die stärkste Hell-Dunkel-Paarung der
  ganzen Bibliothek. Kein weiterer Farbträger.
- Abstände/Rhythmus: Zwischen H2 und Kachelreihe ca. 80 px, Kachelabstand ca.
  25 px. Innerhalb der Kachel: Innenabstand ca. 38 px links und oben, Ziffer zu
  Titel ca. 45 px, Titel zu Text ca. 30 px. Unter der Kachelreihe ca. 80 px bis
  zur Flächenunterkante.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Vierer-Prozessband, Akzentkacheln auf Dunkelfläche, ohne Wegführung

### 79 — FAQ mit Sidebar-Reiter und Akkordeon [store-in-deiner-naehe__-desktop-05-y3000.png | -]
- Anordnung: Linksbündige H2 bei ca. 36 px. Darunter zweispaltig: links eine
  schmale Spalte (ca. 328 px) mit einem einzelnen Kategorie-Reiter, rechts ab ca.
  388 px die Akkordeon-Liste über die restliche Containerbreite. Im Slice ist nur
  die erste Frage sichtbar, der Rest liegt unter dem Cookie-Overlay und ist
  **nicht belegt**.
- Buttons/Komponenten: Der Reiter links ist eine gefüllte dunkle Kachel (ca. 328 x
  68 px, Radius geschätzt ca. 6 px) mit einem Sprechblasen-Icon links und einem
  Bold-Label daneben — es gibt nur diesen einen Reiter, eine Auswahl zwischen
  mehreren Kategorien ist hier also nicht möglich; der Reiter ist optisch ein
  aktiver Zustand ohne Geschwister. Das Akkordeon rechts liegt auf einer eigenen
  hellen Fläche; das Plus-Zeichen steht links vor der Frage (ca. 24 x 24 px, ohne
  Kreis) wie in Sektion 67, nicht rechts wie in Sektion 63.
- Typo: H2 ca. 40-42 px Bold. Reiter-Label ca. 17 px Bold in Weiss. Fragentext ca.
  21-22 px Bold — derselbe Grad wie in Sektion 67.
- Farbe/Fläche: Sektionsgrund wieder das helle Grau-Creme nach der dunkelgrünen
  Prozessfläche darüber. Der Reiter ist fast schwarz mit einem akzentgrünen Detail
  im Sprechblasen-Icon. Das Plus vor der Frage ist hier fast schwarz, nicht
  flieder wie in Sektion 67 — dieselbe Komponente in zwei Farbfassungen.
- Abstände/Rhythmus: Zwischen H2 und Reiter/Akkordeon ca. 60 px, zwischen Reiter
  und Akkordeon-Fläche ca. 30 px horizontal. Innerhalb der Akkordeonzeile
  Innenabstand ca. 30 px links.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 10 (`/`), Abweichung: nur ein einziger
  Kategorie-Reiter und Plus statt Chevron.

## Seite: /balkonkraftwerk-mit-speicher/

Gelesen wurden die Desktop-Slices `balkonkraftwerk-mit-speicher__-desktop-00-fold.png`,
`balkonkraftwerk-mit-speicher__-desktop-01-y0.png`,
`balkonkraftwerk-mit-speicher__-desktop-02-y750.png`,
`balkonkraftwerk-mit-speicher__-desktop-03-y1500.png`,
`balkonkraftwerk-mit-speicher__-desktop-04-y2250.png`,
`balkonkraftwerk-mit-speicher__-desktop-05-y3000.png`,
`balkonkraftwerk-mit-speicher__-desktop-06-y3750.png` und
`balkonkraftwerk-mit-speicher__-desktop-07-y4258.png`. Mobile-Shots existieren für diese Route
nicht — alle Mobil-Felder sind darum **nicht geprüft**. Der Header (Sektion 01)
und der Footer (Sektion 12) erscheinen unverändert und werden nur referenziert;
im Header ist hier `Balkonkraftwerke` als aktiver Punkt hell abgesetzt. Das
Cookie-Overlay liegt in jedem Slice über dem unteren Drittel und ist ein
Overlay, keine Sektion — es verdeckt ab ca. y 1170 im Slice alles Darunter.

### 80 — Hero, Fototeppich mit linksbündiger H1 ohne CTA [balkonkraftwerk-mit-speicher__-desktop-00-fold.png]
- Anordnung: Vollflächiges Produktfoto ab Header-Unterkante, an der rechten
  oberen Ecke mit einem sehr grossen Viertelkreis-Radius beschnitten (der Bogen
  setzt bei ca. x 1290 an und läuft bis zur Oberkante) — dieselbe Riesen-Ecke wie
  in Sektion 37, hier aber am Foto statt an einer Farbfläche. Die H1 steht
  linksbündig ab ca. 75 px vom Rand, tief im unteren Bilddrittel (Textoberkante
  ca. y 445 im Slice), zweizeilig. Rechts im Bild das Motiv aus drei gestapelten
  Speicherschränken vor zwei aufgestellten Solarmodulen. Was unter der H1 folgt,
  liegt ab ca. y 575 unter dem Cookie-Overlay und ist **nicht belegt** — ob hier
  ein CTA, eine Feature-Reihe oder Slider-Dots stehen, ist aus diesem Shot nicht
  entscheidbar.
- Buttons/Komponenten: Im belegten Bereich **kein einziger** Button, kein
  Eyebrow-Chip, keine Slider-Dots, keine Feature-Icons. Der Hero besteht sichtbar
  nur aus Foto plus Überschrift. Das ist der Unterschied zu Sektion 02, wo der
  CTA `Jetzt konfigurieren` im selben Fold-Ausschnitt sichtbar war.
- Typo: Einstufig. H1 ca. 46-48 px (gemessen an der Versalhöhe von `B` in
  `Balkonkraftwerk`, ca. 34 px, plus Unterlängen), geometrische Grotesk, Bold,
  zwei Zeilen, Zeilenabstand ca. 52 px — also nur knapp über dem Schriftgrad, die
  Zeilen stehen sehr eng. Gemischte Schreibweise, kein Letterspacing, kein
  Eyebrow darüber. Deutlich kleiner als die Startseiten-H1 (dort ca. 62-66 px
  geschätzt) — der Kategorie-Hero ist typografisch eine Stufe leiser als der
  Home-Hero.
- Farbe/Fläche: Schrift in Weiss direkt auf dem Foto, ohne Verlauf und ohne
  Abdunkelung. Das Foto ist an der Textstelle ein warmes, mittleres Braun-Grau
  (Betonwand mit Schattenwurf), der Kontrast trägt gerade so. Kein Akzentgrün im
  ganzen belegten Hero — die Sektion ist vollständig farblos ausser dem Foto.
  Wegen des Cookie-Schleiers sind alle Farbangaben Schätzung.
- Abstände/Rhythmus: Foto beginnt direkt an der Header-Unterkante bei ca. y 137,
  ohne Abstand. Links ca. 40 px Randabstand des Fotos zur Viewportkante (das Bild
  ist also nicht ganz randlos, es sitzt in einem breiten Container mit schmalem
  Aussenrand), rechts läuft es bis ca. x 1400. Von der Fotooberkante bis zur
  H1-Oberkante ca. 310 px reiner Bildraum.
- Mobil: **nicht geprüft** (kein Mobile-Shot für diese Route vorhanden).
- Pattern: `P-HERO-PHOTO` (mit Abweichung: kein CTA im Fold belegt, Foto mit
  Riesen-Eckradius statt randlos)

### 81 — Produktraster, vier Preiskarten mit Leistungs-Chip [balkonkraftwerk-mit-speicher__-desktop-02-y750.png, balkonkraftwerk-mit-speicher__-desktop-03-y1500.png]
- Anordnung: Zentrierte H2 über einem vierspaltigen Kartenraster, das über die
  ganze Containerbreite läuft (erste Karte ab ca. x 65, letzte endet bei ca.
  x 1360). Karten ca. 306 px breit, Spaltenabstand ca. 24 px. Jede Karte ist von
  oben nach unten gleich aufgebaut: Produktbild, Titel, Preiszeile,
  Merkmalsliste, Button. Auffällig: die Karten sind **nicht** auf gleiche Höhe
  gezogen — die Buttons der Karten 3 und 4 sitzen ca. 32 px höher als die der
  Karten 1 und 2, weil deren Merkmalslisten eine Zeile kürzer sind. Das Raster
  richtet also nach Inhalt aus statt nach Kartenrahmen, was in Sektion 06 anders
  gelöst war.
- Buttons/Komponenten: Pro Karte genau ein Button `Zum Komplettset` — gefüllt in
  fast Schwarz-Grün (nicht im Akzent-Hellgrün wie die Haupt-CTAs), Höhe ca. 48 px,
  Breite ca. 190 px, Radius geschätzt ca. 4-6 px, weisses Bold-Label mit
  nachgestelltem Chevron. Vier gleichrangige dunkle Buttons nebeneinander, kein
  hervorgehobener Empfehlungs-Button. Oben links im Produktbild sitzt ein
  Leistungs-Chip (`450 Wp` bis `1800 Wp`) als helles, stark abgerundetes Pill
  (Höhe ca. 28 px, Radius geschätzt ca. 14 px) mit kleinem Blitz-Icon davor. Die
  Merkmale sind eine schlichte Liste mit kleinen Punkt-Markern, ohne Häkchen-Icon.
  Kein Vergleichs-Schalter, keine Tab-Umschaltung über dem Raster — anders als bei
  den Bestsellern auf `/`.
- Typo: H2 ca. 40-42 px Bold, zentriert, einzeilig, gemischte Schreibweise.
  Kartentitel ca. 21-22 px Bold, zweizeilig umbrochen. Preiszeile deutlich grösser
  als der Titel, ca. 30-32 px, aber im leichteren Weight (Regular/Medium statt
  Bold) — die Zahl gewinnt über die Grösse, nicht über die Fettung. Daneben der
  Streichpreis ca. 16 px mit durchgehender Durchstreichlinie. Merkmalszeilen ca.
  15 px Regular. Der Chip-Text ca. 12-13 px Medium.
- Farbe/Fläche: Sektionsgrund das helle Creme/Off-White der Seite. Produktbilder
  auf einer eigenen, minimal dunkleren Bildfläche (ca. 306 x 306 px, Radius
  geschätzt ca. 6 px) — die Karte selbst hat keinen Rahmen und keinen Schatten,
  nur das Bild ist als Fläche abgesetzt. Hinter jedem Produkt liegt eine
  kräftige, kalt-mintgrüne Winkel-/Dreiecksform als Grafikdeko, identisch zu der
  in Sektion 06 beschriebenen. Der Streichpreis ist grau, der aktuelle Preis fast
  schwarz. Kein Rot, kein Rabatt-Badge.
- Abstände/Rhythmus: Von der Header-Unterkante bis zur H2 ca. 105 px, von der H2
  zur Bildoberkante ca. 65 px. Innerhalb der Karte: Bild zu Titel ca. 42 px,
  Titel zu Preis ca. 20 px, Preis zu erster Merkmalszeile ca. 30 px,
  Merkmalszeilen im Abstand von ca. 32 px, letzte Zeile zum Button ca. 32 px.
  Unter der Buttonreihe folgt ein sehr grosser Leerraum von ca. 260 px bis zum
  nächsten Element — die grösste Lücke der Seite.
- Mobil: **nicht geprüft**.
- Pattern: `P-PRICE` (Vierer-Raster mit Streichpreis und Leistungs-Chip;
  Abweichung: dunkle statt akzentgrüne Karten-CTAs, Karten ohne Höhenausgleich)

### 82 — Video-Teaser, breiter Bildblock mit Play und Textmarken [balkonkraftwerk-mit-speicher__-desktop-03-y1500.png, balkonkraftwerk-mit-speicher__-desktop-04-y2250.png]
- Anordnung: Ein einzelner, zentrierter Bildblock ohne Überschrift darüber und
  ohne Text daneben — die Sektion besteht aus genau einem Element. Block ca.
  1135 px breit (von ca. x 146 bis x 1281), Höhe ca. 620 px, alle vier Ecken
  gerundet (Radius geschätzt ca. 10-12 px). Links im Bild eine sitzende Person im
  Interview-Setting, rechts zwei gestapelte, gegeneinander versetzte Textmarken.
  Der Play-Button sitzt nicht in der Bildmitte, sondern deutlich nach links
  versetzt (ca. x 710 von 1135 px Blockbreite, also etwa auf halber Höhe an der
  Nahtstelle zwischen Person und Textmarke) und wird von der unteren Textmarke
  teilweise überlappt.
- Buttons/Komponenten: Ein Play-Dreieck in Weiss ohne umschliessenden Kreis und
  ohne Fläche (ca. 60 x 60 px, geschätzt), direkt auf dem Bild. Die beiden
  Textmarken sind flache Rechtecke mit kleinem Radius: oben eine schmale dunkle
  Marke mit dem Wort `Erfahrungsbericht`, darunter eine deutlich grössere Marke
  im Akzent-Hellgrün mit drei Zeilen. Kein Button, kein Link, keine Dauer-Anzeige,
  keine Untertitel-Leiste — der ganze Block ist eine Klickfläche.
- Typo: Auf der dunklen Marke ca. 34-36 px Bold in Weiss. Auf der hellgrünen
  Marke deutlich grösser, ca. 42-44 px Bold in fast Schwarz, drei Zeilen mit
  engem Durchschuss (ca. 62 px). Ein `+` steht als eigenes Zeichen am Anfang der
  dritten Zeile und ist so gross wie die Wortschrift — Plus als Textzeichen, nicht
  als Icon. Die grösste Schrift der ganzen Seite steht damit im Video-Standbild,
  nicht in einer Überschrift.
- Farbe/Fläche: Das Standbild ist ein kühl belichteter Innenraum vor einem
  Fenster. Die beiden Marken bringen als einzige Stelle der Seite bis hierhin das
  Akzent-Hellgrün und das dunkle Tannengrün flächig zusammen. Ausserhalb des
  Blocks bleibt der Sektionsgrund das helle Creme/Off-White. Kein Rahmen, kein
  Schatten unter dem Block.
- Abstände/Rhythmus: Über dem Block ca. 235 px Leerraum ab der letzten Buttonzeile
  des Produktrasters, darunter ca. 105 px bis zur nächsten Flächenkante. Die
  beiden Textmarken sind vertikal um ca. 55 px versetzt und horizontal um ca.
  35 px gegeneinander verschoben (die grüne Marke ragt links über die dunkle
  hinaus) — der Versatz ist gewollt und nicht bündig gesetzt.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 48 (`/erfahrungen/`), Abweichung: hier ohne
  begleitende Überschrift und mit zwei versetzten Textmarken im Bild statt eines
  reinen Play-Overlays.

### 83 — Presse-Logoleiste auf abgesetztem Band [balkonkraftwerk-mit-speicher__-desktop-04-y2250.png]
- Anordnung: Ein eigenes, randloses Band über die volle Breite von 1440 px, in dem
  fünf Medienlogos in einer Reihe zentriert auf gleicher Grundlinie stehen. Die
  Logos sind gleichmässig verteilt (Mittenabstand ca. 293 px), nicht in einem
  schmaleren Container gruppiert — das erste Logo beginnt bei ca. x 16, das letzte
  endet bei ca. x 1397, die Leiste nutzt also praktisch die ganze Fensterbreite.
- Buttons/Komponenten: Nur Logos, keine Karten, kein Rahmen, keine Zitate, keine
  Pfeile und keine Karussell-Dots. Die Logos haben stark unterschiedliche
  Eigenbreiten (von ca. 180 px bis ca. 210 px) und sind auf gleiche optische Höhe
  statt auf gleiche Breite normalisiert.
- Typo: Reine Logotypografie, keine Fliesstextzeile und kein Label wie
  `Bekannt aus` über der Reihe — die Leiste steht ohne jede Einordnung.
- Farbe/Fläche: Das Band ist minimal dunkler als die Sektionen darüber und
  darunter und trennt sich allein über diesen Helligkeitssprung, ohne Linie. Alle
  fünf Logos sind in Graustufen wiedergegeben, keines trägt seine Markenfarbe —
  konsequente Entsättigung wie in Sektion 14 und Sektion 50.
- Abstände/Rhythmus: Bandhöhe ca. 240 px bei einer Logohöhe von nur ca. 26 px —
  ein sehr luftiges Verhältnis, oben und unten je ca. 105 px Innenabstand.
- Mobil: **nicht geprüft**.
- Pattern: `P-PROOF-STRIP` (Wiederholung von Sektion 14, hier auf eigenem
  Helligkeitsband statt auf der Sektionsfläche)

### 84 — Themen-Akkordeon, Kategorie-Chip über Riesenfrage [balkonkraftwerk-mit-speicher__-desktop-04-y2250.png, balkonkraftwerk-mit-speicher__-desktop-05-y3000.png, balkonkraftwerk-mit-speicher__-desktop-06-y3750.png]
- Anordnung: Eine einspaltige, durch dünne Linien getrennte Liste aus sechs
  geschlossenen Akkordeon-Zeilen, linksbündig ab ca. x 151 und bis ca. x 1165
  breit — die Liste nutzt also nicht die volle Containerbreite, rechts bleibt ein
  breiter Rand von ca. 275 px frei. Jede Zeile besteht aus einem kleinen
  Kategorie-Chip oben links und darunter der Frage-/Themenzeile als grosse
  Überschrift; das Plus sitzt rechts aussen auf Höhe des Chips, nicht auf Höhe der
  Überschrift. Über der Liste steht **keine** übergeordnete H2 — die Sektion
  beginnt direkt mit der ersten Trennlinie. Die sechs Einträge sind:
  `Überblick`/`Balkonkraftwerk mit Speicher kaufen`,
  `Funktionsweise`/`So funktioniert ein Balkonkraftwerk mit Speicher als Komplettset`,
  `Wirtschaftlichkeit`/`So lohnt sich ein Set mit Speicher`,
  `Entscheidungshilfe`/`Welches Set passt zu mir?`,
  `Technik`/`Integrierter Wechselrichter`,
  `Kosten`/`Das kostet ein Balkonkraftwerk mit Speicher`,
  `FAQ`/`Häufig gestellte Fragen zum Balkonkraftwerk mit Speicher`.
- Buttons/Komponenten: Der Kategorie-Chip ist ein kleines, leicht gerundetes
  Rechteck (Höhe ca. 24 px, Radius geschätzt ca. 4 px, Innenabstand ca. 10 px
  links und rechts) im Akzent-Hellgrün mit fast schwarzem Label. Das Plus rechts
  ist ein reines Strichkreuz ca. 26 x 26 px ohne Kreis und ohne Fläche, in fast
  Schwarz — dieselbe Fassung wie in Sektion 79, aber rechts statt links gesetzt.
  Kein einziger Eintrag ist in irgendeinem Slice aufgeklappt; **nicht belegt**, wie
  ein geöffneter Zustand aussieht. Kein Button, kein Sprungmenü.
- Typo: Die Themenzeile ist ungewöhnlich gross für ein Akkordeon: ca. 30-32 px
  Bold, bei Bedarf zweizeilig umbrochen (Zeilenabstand ca. 39 px). Der Chip-Text
  dagegen sehr klein, ca. 12 px Bold. Das Grössenverhältnis Chip zu Zeile liegt
  bei rund 1:2,6 — der Kontrast zwischen Marker und Titel ist stärker als bei den
  Fragenlisten in Sektion 67 und Sektion 79, wo der Fragentext nur ca. 21-22 px
  misst. Diese Liste liest sich dadurch als Kapitelverzeichnis, nicht als FAQ.
- Farbe/Fläche: Sektionsgrund das helle Creme/Off-White. Die Trennlinien sind
  sehr dünne, helle Graustriche, die über die ganze Listenbreite laufen; es gibt
  eine Linie über dem ersten Eintrag und eine unter jedem weiteren, aber
  **keine** unter dem letzten (`FAQ`) — die Liste endet offen. Der Chip ist der
  einzige Farbträger der Sektion.
- Abstände/Rhythmus: Zeilenhöhe je nach Umbruch ca. 148 px (einzeilig) bis ca.
  188 px (zweizeilig). Innerhalb der Zeile: Trennlinie zu Chip ca. 22 px, Chip zu
  Themenzeile ca. 32 px, Themenzeile zur nächsten Trennlinie ca. 45 px. Unter dem
  letzten Eintrag ca. 165 px bis zur nächsten Sektionsfläche.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Kapitel-Akkordeon mit Kategorie-Chip und Riesentitel

### 85 — Newsletter-Split auf Fliederfläche, Wiederholung [balkonkraftwerk-mit-speicher__-desktop-06-y3750.png, balkonkraftwerk-mit-speicher__-desktop-07-y4258.png]
- Anordnung: Identisch zu Sektion 43: zweispaltiger Block auf einer fliederfarbenen
  Fläche mit Riesen-Eckradius rechts oben, links Überschrift plus Lead und eine
  grafische Stern-mit-Häkchen-Marke, rechts das Formular. Die Fläche läuft von
  ca. x 36 bis x 1390, ist also gegen die Viewportkante eingerückt.
- Buttons/Komponenten: Zwei Eingabefelder (`Dein Vorname` optional, `E-Mail*`
  pflichtig), beide ca. 432 px breit und ca. 48 px hoch mit sehr kleinem Radius
  (geschätzt ca. 3-4 px) und Platzhaltertext in Grau. Darunter eine
  Einwilligungs-Checkbox (ca. 20 x 20 px, eckig, nicht rund) mit dreizeiligem
  Kleintext und dem unterstrichenen Ausklapp-Link `Mehr lesen` mit Chevron.
  Darunter ein Cloudflare-Turnstile-Kasten mit eigener Checkbox und Fremdlogo —
  ein sichtbar eingebettetes Drittanbieter-Element mitten im Markenlayout. Der
  Absende-Button `Newsletter abonnieren` ist gefüllt in fast Schwarz-Grün mit
  Chevron, ca. 228 x 52 px — nicht im Akzent-Hellgrün.
- Typo: H2 zweizeilig, ca. 44-46 px Bold. Lead darunter ca. 26-28 px, ebenfalls
  Bold, dreizeilig — derselbe Weight-in-kleinerem-Grad-Kontrast wie im Home-Hero.
  Feldlabels ca. 14 px Bold, Checkbox-Text ca. 13 px Regular, Buttonlabel ca.
  16 px Bold.
- Farbe/Fläche: Fliederfläche als einzige Sektion dieser Seite in einem
  Nicht-Grün-Farbton. Die Eingabefelder sind minimal heller als die Fläche und
  wirken dadurch flach, ohne Rahmen. Die Stern-Marke links ist in einem hellen
  Grau gehalten, das Häkchen darin fast schwarz.
- Abstände/Rhythmus: Innenabstand der Fläche links ca. 56 px, oben ca. 90 px.
  H2 zu Lead ca. 30 px, Lead zur Stern-Marke ca. 30 px. Rechts: Label zu Feld ca.
  12 px, Feld zu nächstem Label ca. 32 px, Checkbox-Block zu Turnstile ca. 30 px,
  Turnstile zum Button ca. 48 px.
- Mobil: **nicht geprüft**.
- Pattern: Wiederholung von Sektion 43 (`/ueber-uns/`), ohne erkennbare Abweichung
  ausser der schmaleren Fläche.

### 86 — Trust-Leiste und Footer, Referenz [balkonkraftwerk-mit-speicher__-desktop-07-y4258.png]
- Anordnung: Wie Sektion 11 und Sektion 12. Auf dunklem Tannengrün zuerst eine
  Zeile mit der Wortmarke links und drei Trust-Punkten rechts daneben
  (`Passgenaue Premium-Halterung`, `100% normkonforme Sets`,
  `30 Tage Rückgaberecht`), je mit einem akzentgrünen Outline-Icon davor. Darunter
  eine dünne Trennlinie, darunter das vierspaltige Linkraster
  (`Hilfe & Kontakt`, `Solaranlagen`, `Balkonkraftwerke`, `Speicher` mit
  `Wärmepumpen` als zweiter Gruppe in derselben Spalte).
- Buttons/Komponenten: Kein Button. Die Links der ersten Spalte unterhalb der
  Hauptliste (`Newsletter`, `Karriere`, `Über uns`, `Presseraum`) tragen je einen
  kleinen diagonalen Pfeil nach rechts oben als Aussenlink-Marker; die
  Rubrikenlinks darüber tragen ihn nicht.
- Typo: Spaltenüberschriften ca. 17 px Bold in Akzent-Hellgrün, Links darunter
  ca. 16 px Regular in einem gebrochenen Weiss. Trust-Punkte ca. 16 px Medium.
- Farbe/Fläche: Durchgehend dunkles Tannengrün, Wortmarke und Fliesstext in Weiss,
  alle Rubriktitel im Akzent-Hellgrün — der Footer ist die einzige Stelle, an der
  Hellgrün als Textfarbe und nicht als Fläche auftritt.
- Abstände/Rhythmus: Zeilenabstand innerhalb der Linkspalten ca. 40 px,
  Spaltenabstand ca. 345 px. Von der Trennlinie bis zur ersten Rubrikzeile ca.
  50 px.
- Mobil: **nicht geprüft**.
- Pattern: Referenz auf Sektion 11 und Sektion 12 (`/`), unverändert.

## Seite: /solaranlagen/komplettsets-ohne-montage/

Gelesen wurden die Desktop-Slices
`solaranlagen__komplettsets-ohne-montage__-desktop-00-fold.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-01-y0.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-02-y750.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-03-y1500.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-04-y2250.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-05-y3000.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-06-y3750.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-07-y4500.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-08-y5250.png`,
`solaranlagen__komplettsets-ohne-montage__-desktop-09-y6000.png` und
`solaranlagen__komplettsets-ohne-montage__-desktop-10-y6232.png`. Mobile-Shots
existieren für diese Route nicht — alle Mobil-Felder sind **nicht geprüft**.
Header (Sektion 01) und Footer (Sektion 12) sind unverändert und werden nur
referenziert; im Header ist hier `Solaranlagen` als aktiver Punkt hell abgesetzt.
Das Cookie-Overlay liegt in jedem Slice über dem unteren Drittel und ist ein
Overlay, keine Sektion. Diese Route ist die einzige der Bibliothek, die Flieder
als Hero-Fläche einsetzt.

### 87 — Hero, Split auf Fliederfläche mit zwei CTAs [solaranlagen__komplettsets-ohne-montage__-desktop-00-fold.png]
- Anordnung: Zweispaltig auf einer randlosen, fliederfarbenen Vollfläche. Links
  ab ca. x 36 die dreizeilige H1, darunter ein Lead-Absatz, darunter zwei
  nebeneinanderliegende Buttons. Rechts ab ca. x 700 ein Foto (Einfamilienhaus mit
  Modulen auf dem Schrägdach), das an der linken Kante gerade abschliesst und
  rechts bis ca. x 1397 läuft. Über der rechten oberen Bildecke liegt ein
  Streufeld aus akzentgrünen Winkel-Zeichen (`L`-förmige Ecken in mehreren
  Grössen), das teils auf dem Foto und teils auf der Fliederfläche sitzt und die
  Bildkante überlagert — dieselbe Konfetti-Sprache wie in Sektion 37, dort in
  Pixelform, hier als Winkel.
- Buttons/Komponenten: Zwei CTAs nebeneinander, beide erst ab ca. y 565 sichtbar
  und darum vom Cookie-Overlay angeschnitten: links ein gefüllter Button im
  Akzent-Hellgrün (ca. 180 px breit), rechts ein zweiter mit hellem Grund und
  dünnem Rahmen (ca. 218 px breit), Abstand dazwischen ca. 22 px. Die Labels
  liegen unter der Overlay-Kante und sind **nicht belegt** — belegt sind nur Form,
  Breite und Farbfassung. Damit ist dies der erste Hero der Bibliothek mit einem
  belegten Primär-plus-Sekundär-Paar; Sektion 02 und Sektion 80 haben nur einen
  bzw. keinen sichtbaren CTA. Kein Eyebrow-Chip, keine Checkliste, keine
  Slider-Dots.
- Typo: H1 ca. 46-48 px Bold, drei Zeilen, Zeilenabstand ca. 52 px, mit einem
  Gedankenstrich als Sinntrenner mitten in der zweiten Zeile — die H1 ist ein
  vollständiger Satz mit Nebensatz, kein Schlagwort. Der Lead darunter ca. 19-20 px
  und gemischt gesetzt: der erste Teilsatz bis zum Doppelpunkt in Bold, der Rest
  in Regular. Dieser Bold-Anlauf im Fliesstext ist dasselbe Mittel wie in
  Sektion 46, hier auf eine einzelne Zeile angewandt.
- Farbe/Fläche: Fliederfläche randlos über die volle Breite und über die ganze
  Hero-Höhe, mit fast schwarzer Schrift darauf — die einzige Seite der Bibliothek,
  die Flieder nicht nur für den Newsletter-Block nutzt. Die Winkel-Deko ist im
  Akzent-Hellgrün. Das Foto trägt keine Abrundung an der linken Kante, nur rechts
  läuft es in den Container aus. Farbangaben sind wegen des Cookie-Schleiers
  Schätzung.
- Abstände/Rhythmus: Von der Header-Unterkante bis zur H1-Oberkante ca. 155 px.
  H1 zu Lead ca. 42 px, Lead zur Buttonreihe ca. 30 px. Das Foto beginnt ca. 35 px
  unter der Header-Unterkante, sitzt also höher als der Text und ist gegen die
  Textspalte nach oben versetzt statt mittig ausgerichtet.
- Mobil: **nicht geprüft**.
- Pattern: `P-HERO-SPLIT` (mit Abweichung: Fliederfläche statt heller Grund, zwei
  CTAs statt einem, Deko-Konfetti über der Bildkante)

### 88 — Zusatz-Option als Checkbox-Zeile über dem Raster [solaranlagen__komplettsets-ohne-montage__-desktop-02-y750.png]
- Anordnung: Über dem Produktraster steht zuerst ein dreizeiliger Fliesstext-Block
  (linksbündig ab ca. x 36, Textbreite ca. 720 px), darunter eine einzelne, breite
  Zeile in einer eigenen Kartenfläche, die von ca. x 36 bis x 940 läuft. In dieser
  Zeile: ganz links eine Checkbox, daneben ein Bold-Titel mit direkt anschliessendem
  Regular-Zusatz im selben Absatz, rechts aussen bündig ein Preiszusatz.
- Buttons/Komponenten: Eine eckige Checkbox ca. 24 x 24 px mit dünnem Rahmen,
  unangehakt in allen Slices — der angehakte Zustand ist **nicht belegt**. Kein
  Button, kein Chevron. Die Zeile ist damit ein Konfigurations-Schalter, der vor
  der Produktauswahl steht und nicht in ihr — eine ungewöhnliche Setzung, weil das
  Häkchen alle vier darunterliegenden Karten gleichzeitig betrifft, ohne dass die
  Verbindung visuell gezogen wird.
- Typo: Der Fliesstext darüber ca. 19-20 px, wieder mit Bold-Anlauf
  (`Jedes Set enthält`) und Regular-Fortsetzung. In der Schalterzeile: Titel ca.
  15 px Bold, Zusatztext ca. 13 px Regular in Grau, Preiszusatz ca. 15 px Bold.
  Der Grössenunterschied zwischen Titel und Zusatz ist gering, die Zeile trennt
  sich vor allem über die Fettung und die Graustufe.
- Farbe/Fläche: Die Schalterzeile liegt auf einer minimal helleren Fläche als der
  Sektionsgrund, mit grossem Radius (geschätzt ca. 10-12 px), ohne Rahmen und ohne
  Schatten. Kein Akzentgrün in dieser Sektion.
- Abstände/Rhythmus: Zwischen Fliesstext und Schalterzeile ca. 40 px, Zeilenhöhe
  der Karte ca. 68 px mit ca. 22 px Innenabstand oben und unten, links ca. 32 px
  bis zur Checkbox. Unter der Zeile ca. 55 px bis zur Oberkante des Produktrasters.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Vorgeschalteter Options-Schalter über dem Produktraster

### 89 — Produktraster, vier Sets mit Zielgruppen-Chip und Stückzahl-Pille [solaranlagen__komplettsets-ohne-montage__-desktop-02-y750.png, solaranlagen__komplettsets-ohne-montage__-desktop-03-y1500.png]
- Anordnung: Vierspaltiges Kartenraster von ca. x 36 bis x 1389, Karten ca. 320 px
  breit, Spaltenabstand ca. 24 px. Aufbau je Karte von oben: Produktbild mit zwei
  überlagerten Markern, Titelzeile, Preiszeile, eine einzelne Zusatzzeile, Button.
  Anders als in Sektion 81 sind hier alle vier Karten inhaltlich gleich lang, die
  Buttons stehen darum auf exakt einer Höhe. Unter dem Raster rechtsbündig eine
  kleine Fussnotenzeile, die den Stern-Marker der Chips auflöst.
- Buttons/Komponenten: Drei Komponententypen liegen übereinander. Erstens der
  Zielgruppen-Chip oben links im Bild (`Für 1-3 Personen **` bis
  `Für Wärmepumpe & E-Auto **`) als abgerundetes Pill (Höhe ca. 30 px, Radius
  geschätzt ca. 8 px) mit kleinem Icon links — die ersten drei Chips tragen ein
  Haus-Icon mit steigender Balkenzahl, der vierte ein Blitz-Icon, das Icon zählt
  also mit. Zweitens eine graue Stückzahl-Pille (`12 St.` bis `24 St.`) mitten im
  Bild direkt an der Modulkante, stark abgerundet (Höhe ca. 30 px, Radius
  geschätzt ca. 15 px), deren vertikale Position von Karte zu Karte wandert (bei
  Karte 1 tiefer, bei Karte 4 höher) — sie folgt dem abgebildeten Modulstapel und
  ist nicht auf ein Raster gesetzt. Drittens der Button `Set konfigurieren`,
  gefüllt in fast Schwarz-Grün, ca. 190 x 48 px mit Chevron. Kein Streichpreis, kein
  Rabatt-Badge — anders als in Sektion 81.
- Typo: Titelzeile zweiteilig gesetzt: Modulanzahl in Bold, danach ein dünner
  senkrechter Trennstrich und die kWp-Angabe in Regular, beides ca. 24-25 px.
  Preiszeile ca. 24-25 px Regular, also im selben Grad wie der Titel und nur über
  den Weight abgesetzt — die Preise treten hier deutlich leiser auf als in
  Sektion 81, wo die Zahl ca. 30-32 px misst. Die Zusatzzeile
  (`Speicher wählbar: 7,6-15,2 kWh`) ca. 16 px Regular in Grau. Chip-Text ca.
  12-13 px Bold, Fussnote ca. 12 px Regular.
- Farbe/Fläche: Bildflächen ca. 320 x 300 px in einem hellen Grau mit Radius
  geschätzt ca. 8 px. Die Chips sind in einem gedämpften Mint-/Salbeigrün gehalten
  und nicht im Akzent-Hellgrün — ein vierter Grünton neben Akzent, Signalgrün und
  Tannengrün. Die Stückzahl-Pille ist neutral grau. Rechts unten am Sektionsrand
  liegt erneut ein akzentgrünes Winkel-Streufeld, das über die Sektionsgrenze
  hinweg in die nächste Sektion läuft.
- Abstände/Rhythmus: Bild zu Titel ca. 46 px, Titel zu Preis ca. 34 px, Preis zur
  Zusatzzeile ca. 56 px, Zusatzzeile zum Button ca. 36 px. Unter der Buttonreihe
  ca. 152 px bis zur Fussnotenzeile.
- Mobil: **nicht geprüft**.
- Pattern: `P-PRICE` (Abweichung: Zielgruppen-Chip statt Leistungs-Chip, zweite
  freistehende Pille im Bild, kein Streichpreis)

### 90 — Komponenten-Bausatz, Kacheln mit Plus-Zeichen dazwischen [solaranlagen__komplettsets-ohne-montage__-desktop-03-y1500.png, solaranlagen__komplettsets-ohne-montage__-desktop-04-y2250.png]
- Anordnung: Linksbündige zweizeilige H2 ab ca. x 145 mit zweizeiligem Lead
  darunter, rechts daneben ein grosses akzentgrünes Winkel-Streufeld als einziger
  Blickfang der oberen Sektionshälfte. Darunter ein Kachelraster in zwei Reihen:
  Reihe eins mit drei Kacheln, Reihe zwei mit nur zwei — die dritte Position der
  zweiten Reihe bleibt leer. Zwischen den Kacheln stehen grosse Plus-Zeichen als
  eigenständige Grafikelemente, und zwar zwischen Kachel 1 und 2, zwischen 2 und 3
  sowie in Reihe zwei zwischen Kachel 4 und 5 — die Bildkacheln lesen sich damit
  als Summenformel. Am Ende der zweiten Reihe steht kein Gleichheitszeichen und
  kein Ergebnis; die Formel bricht ab.
- Buttons/Komponenten: Kein Button, kein Link, keine Karten mit Rahmen. Jede Kachel
  ist eine ca. 324 x 322 px grosse Bildfläche (Radius geschätzt ca. 8 px) mit
  freigestelltem Produktfoto darin, darunter ein Bold-Titel und ein zwei- bis
  dreizeiliger Kleintext. Die Plus-Zeichen sind ca. 52 x 52 px, im Akzent-Hellgrün,
  strichstark und stehen frei zwischen den Kacheln auf halber Bildhöhe. Die fünfte
  Kachel zeigt statt eines Produkts eine Siegel-Grafik (`30 JAHRE` in einer
  Sternform) in einem blassen Flieder — das einzige Kachelmotiv, das kein Bauteil
  ist.
- Typo: H2 ca. 40-42 px Bold, zweizeilig. Lead ca. 19-20 px Regular, zweizeilig.
  Kacheltitel ca. 22-23 px Bold, ein- oder zweizeilig; Kacheltexte ca. 15,5 px
  Regular mit sehr engem Durchschuss (ca. 17 px), die Zeilen stehen fast auf
  Berührung. Der Titel der zweiten Kachel läuft zweizeilig, wodurch deren
  Fliesstext eine Zeile tiefer beginnt als bei Kachel 1 und 3 — dieselbe
  Nicht-Ausrichtung wie in Sektion 78.
- Farbe/Fläche: Sektionsgrund das helle Creme/Off-White, Kachelflächen ein
  minimal dunkleres Grau. Das Akzent-Hellgrün trägt hier nur die Plus-Zeichen und
  das Winkel-Streufeld, keine Fläche. Kein Rahmen, kein Schatten an den Kacheln.
- Abstände/Rhythmus: H2 zu Lead ca. 32 px, Lead zur ersten Kachelreihe ca. 82 px.
  Kachel zu Titel ca. 38 px, Titel zu Text ca. 12 px. Zwischen den beiden
  Kachelreihen ca. 60 px. Horizontaler Kachelabstand ca. 26 px, das Plus sitzt
  mittig darin.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Bausatz-Formel, Bildkacheln mit Plus-Operator statt Liste

### 91 — Zwei-Wege-Vergleich, nummerierte Spalten mit Trennstrich [solaranlagen__komplettsets-ohne-montage__-desktop-04-y2250.png, solaranlagen__komplettsets-ohne-montage__-desktop-05-y3000.png, solaranlagen__komplettsets-ohne-montage__-desktop-06-y3750.png]
- Anordnung: Linksbündige zweizeilige H2 mit einzeiligem Lead, darunter zwei
  Spalten, die durch eine einzelne senkrechte Linie bei ca. x 721 getrennt sind —
  keine Karten, kein Rahmen, keine Fläche. Die Linie beginnt auf Höhe der grossen
  Ziffer und endet erst unter den Buttons; sie ist das einzige Trennmittel
  zwischen den beiden Angeboten. Jede Spalte ist gleich aufgebaut: grosse graue
  Ziffer, Kategorie-Chip, Titel, Fliesstext, Button. Die zweite Spalte hat einen
  um zwei Zeilen kürzeren Fliesstext, ihr Button steht trotzdem auf derselben Höhe
  wie der der ersten Spalte — hier wird also aktiv ausgerichtet, anders als in
  Sektion 81 und Sektion 90.
- Buttons/Komponenten: Der Kontrast zwischen den beiden Wegen wird ausschliesslich
  über die Buttonfarbe gespielt: Weg 1 trägt `Set konfigurieren` gefüllt im
  Akzent-Hellgrün (ca. 190 x 52 px), Weg 2 trägt `Jetzt beraten lassen` in einem
  gedeckten Hellgrau-Grün derselben Grösse. Beide mit Chevron, beide gleich breit
  gerundet — die Hierarchie sitzt allein in der Fläche, nicht in Grösse oder Form.
  Die Kategorie-Chips (`Maximale Ersparnis`, `Rundum sorglos`) sind abgerundete
  Pills mit Icon links, ca. 30 px hoch.
- Typo: Die Ziffern `1` und `2` sind sehr gross (ca. 78-82 px) und in einem hellen
  Grau, das kaum vom Grund absticht — sie wirken als Wasserzeichen, nicht als
  Label. H2 ca. 40-42 px Bold mit einem Gedankenstrich am Anfang der zweiten
  Zeile. Spaltentitel ca. 24-25 px Bold, Fliesstext ca. 17-18 px Regular mit ca.
  27 px Durchschuss. Chip-Text ca. 12-13 px Bold.
- Farbe/Fläche: Sektionsgrund hell. Die Chips sind hier flieder statt salbeigrün
  wie in Sektion 89 — derselbe Chip-Typ in einer zweiten Farbfassung auf derselben
  Seite. Die senkrechte Trennlinie ist ein sehr helles Grau, ca. 1 px.
- Abstände/Rhythmus: H2 zu Lead ca. 32 px, Lead zur Ziffer ca. 78 px. Ziffer zu
  Chip ca. 55 px, Chip zu Titel ca. 20 px, Titel zu Text ca. 34 px, Text zum
  Button ca. 78 px (in Spalte 2 entsprechend mehr Leerraum). Spaltenabstand um die
  Linie herum je ca. 17 px.
- Mobil: **nicht geprüft**.
- Pattern: `P-OFFER-PAIR` (Abweichung: keine Kacheln, nur eine Trennlinie;
  Hierarchie ausschliesslich über die Buttonfarbe)

### 92 — Abhol-Sektion, Adressblock neben Kartenausschnitt [solaranlagen__komplettsets-ohne-montage__-desktop-06-y3750.png]
- Anordnung: Zweispaltig auf einer eigenen, randlosen Vollfläche in gedecktem
  Salbeigrün. Links ab ca. x 133 eine zweizeilige H2, darunter ein dreizeiliger
  Fliesstext, darunter zwei nebeneinanderstehende Datenspalten
  (`Adresse zur Abholung`, `Öffnungszeiten`), die durch eine kurze senkrechte
  Linie bei ca. x 538 getrennt sind. Ganz unten quer über die linke Spaltenbreite
  ein Hinweisband. Rechts ab ca. x 970 ein eingebetteter Kartenausschnitt (ca.
  320 x 320 px), rechts daneben und darüber wieder ein Winkel-Streufeld, hier
  jedoch **flieder statt akzentgrün** — dieselbe Deko-Form in der dritten
  Farbfassung der Seite.
- Buttons/Komponenten: Der Kartenausschnitt ist eine echte Google-Maps-Einbettung
  mit sichtbarer Fremd-UI: ein heller Pill-Button `Open in Maps` mit
  Aussenlink-Icon oben links im Kartenfeld, ein Vollbild-Icon unten rechts, das
  Google-Wortzeichen und die Rechtezeile `Keyboard shortcuts / Map Data / Terms /
  Report a map error` am unteren Kartenrand. Diese Fremd-UI ist nicht überdeckt
  und nicht gestaltet — sie steht unverändert im Markenlayout, wie schon der
  Cloudflare-Kasten in Sektion 85. Das Hinweisband unten ist ein dunkelgrünes
  Rechteck (Radius geschätzt ca. 6 px, ca. 790 x 68 px) mit einem akzentgrünen
  Häkchen-Kreis links und zweizeiligem Text. Kein CTA in der ganzen Sektion.
- Typo: H2 ca. 40-42 px Bold, zweizeilig. Fliesstext ca. 19-20 px Regular mit
  einem fett gesetzten Ortsnamen mitten im Satz. Die Datenspalten: Überschrift ca.
  16 px Bold, Zeilen ca. 16 px Regular; in der Öffnungszeiten-Spalte sind die
  Tageskürzel (`Mo.-Fr.:`, `Sa.:`, `So.:`) fett und die Zeitangaben regular —
  Fettung als Spaltenersatz innerhalb einer Zeile. Im Hinweisband ist nur das Wort
  `Tipp:` fett, ca. 15 px.
- Farbe/Fläche: Die Salbeigrün-Fläche ist ein vierter Flächenton neben Creme,
  Flieder und Tannengrün. Der Kartenausschnitt bringt als einziges Element der
  Bibliothek Fremdfarben (Google-Kartengrau, roter Pin-Ersatz in Dunkelblau) ins
  Layout. Das Hinweisband ist der einzige dunkle Block auf der hellen Fläche.
- Abstände/Rhythmus: Flächenoberkante zur H2 ca. 90 px, H2 zum Fliesstext ca.
  38 px, Fliesstext zu den Datenspalten ca. 48 px, Datenspalten zum Hinweisband
  ca. 40 px, Hinweisband zur Flächenunterkante ca. 95 px.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Abholband mit Adressraster und eingebetteter Fremdkarte

### 93 — Vollbreiter Fotostreifen ohne Text [solaranlagen__komplettsets-ohne-montage__-desktop-06-y3750.png, solaranlagen__komplettsets-ohne-montage__-desktop-07-y4500.png]
- Anordnung: Ein randloses Foto über die volle Breite von 1440 px und ca. 425 px
  Höhe, direkt an die Salbeigrün-Fläche anschliessend, ohne Abstand und ohne
  Rundung. Motiv ist ein Einfamilienhaus mit vollbelegtem Schrägdach in
  Halbtotale. Auf dem Bild liegt nichts: kein Text, keine Marke, kein Button, kein
  Play-Zeichen, keine Bildunterschrift.
- Buttons/Komponenten: Keine. Die Sektion ist ein reiner Bildtrenner zwischen der
  Abhol-Sektion und dem Ressourcenhub — die einzige inhaltsfreie Vollbreiten-Fläche
  der ganzen Bibliothek.
- Typo: Keine.
- Farbe/Fläche: Naturfarbenes Foto mit viel Himmel im oberen Drittel. Ober- und
  Unterkante sind harte Schnitte ohne Verlauf; oben grenzt das Salbeigrün an, unten
  das helle Creme.
- Abstände/Rhythmus: Kein Innenabstand, kein Rand. Unter der Bildunterkante ca.
  100 px bis zur nächsten Überschrift.
- Mobil: **nicht geprüft**.
- Pattern: Kandidat: Vollbreiten-Bildtrenner ohne Inhalt

### 94 — Ressourcenhub, Sidebar-Reiter neben Fragenliste [solaranlagen__komplettsets-ohne-montage__-desktop-07-y4500.png, solaranlagen__komplettsets-ohne-montage__-desktop-08-y5250.png]
- Anordnung: Linksbündige H2 `Ressourcenhub` ab ca. x 36. Darunter zweispaltig:
  links eine schmale Spalte (ca. 328 px) mit einem einzelnen Reiter, rechts ab ca.
  x 388 eine eigene helle Fläche mit sechs geschlossenen Akkordeonzeilen, die bis
  ca. x 1389 läuft. Die sechs Fragen sind
  `Welches Komplettset passt zu meinem Haushalt?`,
  `Wie groß sollte der Batteriespeicher sein?`,
  `Muss ich meine Photovoltaikanlage anmelden?`,
  `Wie hoch ist die Einspeisevergütung aktuell?`,
  `Kann ich mein Set selbst abholen?` und
  `Funktioniert die Anlage bei Stromausfall?`.
- Buttons/Komponenten: Der Reiter links ist eine gefüllte dunkle Kachel (ca.
  328 x 88 px, Radius geschätzt ca. 8 px) mit akzentgrünem Sprechblasen-Icon und
  dem Label `FAQs`. Wie in Sektion 79 steht dieser Reiter allein, ohne
  Geschwister-Reiter, obwohl der Sektionstitel `Ressourcenhub` mehrere Rubriken
  ankündigt — Titel und Komponente versprechen mehr, als das Modul zeigt. Das Plus
  steht links vor jeder Frage (ca. 26 x 26 px, ohne Kreis, fast schwarz). Keine
  Zeile ist in irgendeinem Slice aufgeklappt; der geöffnete Zustand ist **nicht
  belegt**. Zwischen den Fragen gibt es keine Trennlinien — anders als in
  Sektion 84.
- Typo: H2 ca. 40-42 px Bold. Reiter-Label ca. 18 px Bold in Weiss. Fragentext ca.
  21-22 px Bold, durchgehend einzeilig.
- Farbe/Fläche: Sektionsgrund hell. Die Akkordeonfläche rechts ist ein minimal
  dunkleres Grau mit grossem Radius (geschätzt ca. 10-12 px) und trägt alle sechs
  Zeilen als einen zusammenhängenden Block. Der Reiter ist fast schwarz mit
  akzentgrünem Icon-Detail.
- Abstände/Rhythmus: H2 zum Reiter ca. 68 px. Zeilenabstand innerhalb des
  Akkordeons ca. 90 px, Innenabstand der Fläche oben ca. 62 px und unten ca. 62 px,
  links ca. 84 px bis zum Plus. Horizontaler Abstand Reiter zu Akkordeonfläche ca.
  26 px.
- Mobil: **nicht geprüft**.
- Pattern: `P-FAQ` (Wiederholung von Sektion 79, Abweichung: Fragen auf
  gemeinsamer Fläche ohne Trennlinien, Sektionstitel `Ressourcenhub` statt `FAQ`)

### 95 — Beratungsband mit Porträt und zwei Kanal-CTAs [solaranlagen__komplettsets-ohne-montage__-desktop-08-y5250.png]
- Anordnung: Ein einzeiliges, dunkelgrünes Band von ca. x 36 bis x 1389 und ca.
  118 px Höhe, alle Ecken gerundet (Radius geschätzt ca. 8 px). Der Inhalt läuft in
  einer Zeile von links nach rechts: rundes Porträtfoto, zweizeiliger Text,
  Telefonnummer mit Zeitangabe darunter, dann zwei Buttons. Alles vertikal
  zentriert. Das Porträt sitzt ca. 32 px vom linken Bandrand.
- Buttons/Komponenten: Zwei CTAs nebeneinander, klar hierarchisiert:
  `WhatsApp Nachricht senden` gefüllt in einem gedeckten Hellgrün-Grau (ca.
  280 x 52 px), daneben `E-Mail senden` als Outline-Button mit dünnem hellen Rahmen
  auf dunklem Grund (ca. 168 x 52 px), Abstand ca. 16 px. Beide mit Chevron. Das
  Porträt ist ein Kreis von ca. 76 px Durchmesser. Die Telefonnummer ist als
  Bold-Text gesetzt, nicht als Button.
- Typo: Der Text links ist zweizeilig und gemischt: `Sind noch Fragen offen?` in
  Bold, der Anschluss `Wir beraten dich persönlich, kostenlos und unverbindlich.`
  in Regular, beides ca. 20-21 px — wieder der Bold-Anlauf innerhalb eines
  Fliesstexts wie in Sektion 87 und Sektion 88. Telefonnummer ca. 20 px Bold, die
  Zeitangabe darunter ca. 13 px Regular in gedämpftem Weiss. Buttonlabels ca.
  15 px Bold.
- Farbe/Fläche: Dunkles Tannengrün als Bandfläche, Schrift in Weiss. Der gefüllte
  Button ist nicht im Akzent-Hellgrün, sondern in einem blasseren Grünton — auf
  Dunkelgrün wird also eine gedämpftere Fassung verwendet als auf hellem Grund.
  Kein Akzent-Hellgrün im ganzen Band.
- Abstände/Rhythmus: Porträt zu Text ca. 24 px, Text zur Telefonspalte ca. 75 px,
  Telefonspalte zum ersten Button ca. 45 px, rechter Buttonrand zum Bandrand ca.
  32 px. Über dem Band ca. 82 px zur Akkordeonfläche, darunter ca. 42 px zur
  Newsletter-Fläche.
- Mobil: **nicht geprüft**.
- Pattern: `P-CTA-MID` (Wiederholung des Berater-Bands aus Sektion 15, hier
  einzeilig als schmales Band mit Porträt statt als hohe Sektion)

### 96 — Newsletter-Split und Footer, Referenz [solaranlagen__komplettsets-ohne-montage__-desktop-09-y6000.png, solaranlagen__komplettsets-ohne-montage__-desktop-10-y6232.png]
- Anordnung: Erst der Newsletter-Split auf Fliederfläche wie in Sektion 85
  (Riesen-Eckradius rechts oben, links H2 plus Lead plus Stern-Marke, rechts
  Vorname-Feld, E-Mail-Feld, Einwilligungs-Checkbox mit `Mehr lesen`,
  Cloudflare-Turnstile und der dunkle Button `Newsletter abonnieren`), direkt
  darunter ohne Zwischenraum die Trust-Leiste und das vierspaltige Footer-Raster
  wie in Sektion 11 und Sektion 12.
- Buttons/Komponenten: Unverändert gegenüber Sektion 85 und Sektion 86. Bemerkenswert
  ist nur der Anschluss: die Fliederfläche endet bei ca. y 774 im Slice und das
  dunkle Footer-Band beginnt bei ca. y 806 — dazwischen liegen ca. 32 px heller
  Grund, die beiden farbigen Flächen stossen also nicht aneinander.
- Typo: Wie Sektion 85 und Sektion 86.
- Farbe/Fläche: Flieder über Creme über Tannengrün in drei aufeinanderfolgenden
  Bändern — der stärkste Flächenwechsel der Seite und zugleich der Standardabschluss
  aller Routen dieser Bibliothek.
- Abstände/Rhythmus: Innerhalb der Fliederfläche wie Sektion 85. Im Footer
  Zeilenabstand ca. 40 px, Spaltenabstand ca. 345 px.
- Mobil: **nicht geprüft**.
- Pattern: Referenz auf Sektion 43 (Newsletter), Sektion 11 und Sektion 12
  (Footer), unverändert.


## Seite: /blog

Zustände: **unproven** — Closure-Sweep mit `--no-interact`; der persistente Cookie-Layer blieb sichtbar, daher kein belastbarer Hover/Focus/Pressed-Beleg.

### 97 — Kategorie-Navigation und Featured-Story [blog-desktop-00-fold.png | blog-mobile-00-fold.png]
- Anordnung: Unter der globalen Nav liegt eine horizontal scrollende Chip-Zeile; darunter ein Featured-Artikel als breiter Zweispalter, Bild links und Meta/H1/Lead rechts. Mobil werden Chip-Zeile und Story einspaltig; das Bild steht vor Meta und Titel.
- Buttons/Komponenten: Rechteckige Kategorie-Chips mit kleinem Radius, aktiver Chip voll im Akzentgrün, inaktive Chips gedämpft grün. Kein zusätzlicher CTA im Featured-Fold.
- Typo: Featured-H1 ca. 38 px Bold, Meta aus Datum, Kategorie-Chip und Lesezeit. Mobil ca. 28–30 px, linksbündig.
- Farbe/Fläche: Heller Grund; Bilder und Chips liefern den Farbwechsel. Cookie-Layer dimmt die gemessene Darstellung.
- Abstände/Rhythmus: Große Luft zwischen Chips und Featured-Story; mobil enger, aber klare Bild→Meta→Titel-Reihenfolge.
- Mobil: Kategoriezeile horizontal angeschnitten, Story vollständig gestapelt.
- Pattern: Kandidat: Editorial-Index mit Filterchips und Featured-Zweispalter.

### 98 — Dreispaltiges Artikelraster, Pagination und Newsletterabschluss [blog-desktop-02-y750.png, blog-desktop-04-y2250.png | blog-mobile-03-y844.png]
- Anordnung: Desktop drei gleich breite Artikelkarten je Reihe; Bild, Kategorie/Lesezeit, zweizeiliger Titel und Datum. Darunter zentrierte Pagination und ein großer Flieder-Newsletter-Split. Mobil eine Karte pro Zeile.
- Buttons/Komponenten: Karten ohne sichtbaren Rahmen/Schatten; Kategorien als kleine grüne Labels. Pagination mit eckigen Outline-Pfeilen und nackten Zahlen. Newsletter rechts mit Eingabefeldern, Checkbox, Turnstile und dunklem CTA.
- Typo: Kartentitel Bold, Datum gedämpft. Newsletter-H2 deutlich größer als Formularlabel.
- Farbe/Fläche: Artikelbereich hell; Newsletter als fliederfarbene Vollfläche mit großer rechter Rundung.
- Abstände/Rhythmus: Großzügige vertikale Kartenabstände; Newsletter als klarer Abschluss vor Footer.
- Mobil: Bild, Label, Titel und Datum stapeln; Cookie-Layer überdeckt die Oberkante.
- Pattern: Kandidat: Editorial-Grid + Pagination; Referenz auf Newsletter-Split.

## Seite: /blog/viessmann-waermepumpe-vitocal-250-a

Zustände: **unproven** — `--no-interact`, Cookie-Layer; keine belastbare Link-/Share-State-Aufnahme.

### 99 — Artikelkopf mit Autor, Stand und Leadbild [blog__viessmann-waermepumpe-vitocal-250-a-desktop-00-fold.png | blog__viessmann-waermepumpe-vitocal-250-a-mobile-00-fold.png]
- Anordnung: Zentrierte, sehr breite H1; darunter Autorenbild/Name, Veröffentlichung+Aktualisierung, Kategorie und Lesezeit in einer Zeile. Großes Leadbild folgt. Mobil dieselben Metadaten in zwei Reihen unter der zentrierten H1.
- Buttons/Komponenten: Kategorie als grüner Chip; keine CTA-Fläche im Kopf.
- Typo: H1 ca. 48–52 px Bold Desktop, mobil ca. 32 px; Metadaten klein und dunkelgrün.
- Farbe/Fläche: Durchgehend heller Grund; Foto ist der erste große Farbblock.
- Abstände/Rhythmus: Starker Abstand Nav→H1, kompakter Meta-Block, danach großzügiger Bildabstand.
- Mobil: Autor und Datum/Chip werden umgebrochen, ohne Informationsverlust.
- Pattern: Kandidat: Editorial-Detailkopf mit Autor und Aktualisierungsstand.

### 100 — Longform-Lesespalte mit Share-Rail [blog__viessmann-waermepumpe-vitocal-250-a-desktop-02-y750.png, blog__viessmann-waermepumpe-vitocal-250-a-desktop-04-y2250.png | blog__viessmann-waermepumpe-vitocal-250-a-mobile-03-y844.png]
- Anordnung: Schmale Inhaltsachse; links klebt eine vertikale Share-Rail, rechts laufen H2, Absätze, Listen und Bilder. Mobil verschwindet die Rail aus dem sichtbaren Ausschnitt und der Text nutzt fast die volle Breite.
- Buttons/Komponenten: Runde, gedämpfte Social-Icons; Links im Text unterstrichen. Keine Kartenrahmen.
- Typo: H2 ca. 30 px Bold, Body ca. 20 px Desktop mit großer Zeilenhöhe; Mobil ca. 18 px.
- Farbe/Fläche: Einfarbig heller Grund; Hierarchie ausschließlich über Typo und Bilder.
- Abstände/Rhythmus: Lange Lesestrecke mit großen H2-Abständen; Bilder schließen bündig an die Textspalte an.
- Mobil: Text bleibt gut lesbar, Cookie-Layer verdeckt jedoch obere Bereiche.
- Pattern: Kandidat: Editorial-Longform mit Share-Rail.

## Seite: /ebooks

Zustände: **unproven** — `--no-interact`; Karten-/CTA-Hover nicht aufgenommen.

### 101 — Leitfaden-Index als drei farbcodierte Karten [ebooks-desktop-00-fold.png, ebooks-desktop-01-y0.png | ebooks-mobile-00-fold.png]
- Anordnung: Zentrierte H1+Lead, darunter drei gleich breite Karten. Jede Karte: farbige Bildfläche mit Tablet-Cover, Titel, Typ, Kurzbeschreibung und CTA. Mobil eine Karte pro Zeile.
- Buttons/Komponenten: Hellgrüne Rechteck-CTAs mit Chevron; dritte Karte zeigt denselben Buttonrahmen mit Status „Bald verfügbar“.
- Typo: H1 ca. 48 px, Kartentitel ca. 25 px Bold, „E-Book“ als große Regular-Zeile.
- Farbe/Fläche: Kartenbilder in Salbei, Altrosa und Flieder; Seitenfläche neutral hell.
- Abstände/Rhythmus: Symmetrisches Dreiergrid, CTA-Grundlinien auf gleicher Höhe.
- Mobil: Cover wird fast vollbreit, danach Text+CTA; Karten bleiben klar getrennt.
- Pattern: `P-OFFER-PAIR`-Erweiterung auf drei Guide-Karten.

### 102 — Kompakter Indexabschluss und Footer [ebooks-desktop-02-y355.png | ebooks-mobile-03-y844.png]
- Anordnung: Nach den drei Karten folgt ohne weitere Content-Sektion direkt der dunkle Footer.
- Buttons/Komponenten: CTA-System unverändert; Footer als vierspaltiges Linkraster mit Trust-Zeile.
- Typo/Farbe: Footer Tannengrün mit hellgrünen Spaltenüberschriften; Karten bleiben hell.
- Abstände/Rhythmus: Kurze Route; großer Weißraum zwischen Karten und Footer entfällt.
- Mobil: zweite/dritte Karten stapeln; Footer liegt außerhalb des gelesenen Mobile-Slices.
- Pattern: Kandidat: Kurzer Ressourcenindex ohne Zwischensektionen.

## Seite: /ebooks/balkonkraftwerk-bibel

Zustände: **unproven** — Form-, PDF- und CTA-Zustände wurden wegen `--no-interact` nicht ausgelöst.

### 103 — Lead-Magnet-Hero als Text/Bild-Split [ebooks__balkonkraftwerk-bibel-desktop-00-fold.png | ebooks__balkonkraftwerk-bibel-mobile-00-fold.png]
- Anordnung: Links Eyebrow, große H1, vier Checkmark-Benefits und CTA; rechts Familienfoto mit stark gerundeter oberer Ecke. Mobil Foto zuerst, dann Text und Benefits.
- Buttons/Komponenten: Ein hellgrüner CTA mit Chevron; Benefits über runde grüne Checks.
- Typo: H1 ca. 48 px Desktop, mobil ca. 34 px; Benefits ca. 17–18 px.
- Farbe/Fläche: Heller Grund, Echtfoto als Hauptfläche; kein zusätzlicher Deko-Layer.
- Abstände/Rhythmus: Dichte Benefit-Liste, CTA direkt darunter.
- Mobil: Einspaltig, Bild vor H1; Cookie-Layer überdeckt obere Bildzone.
- Pattern: `P-HERO-SPLIT` + Lead-Magnet-Benefits.

### 104 — Inhaltsversprechen, PDF-Viewer und Downloadformular [ebooks__balkonkraftwerk-bibel-desktop-02-y750.png, ebooks__balkonkraftwerk-bibel-desktop-04-y2250.png | ebooks__balkonkraftwerk-bibel-mobile-03-y844.png]
- Anordnung: Zentrierte H2 mit sechsteiligem Checkraster; darunter eingebetteter PDF-Viewer. Im Capture zeigt der Viewer einen realen Ladefehler. Später folgt ein Zweispalter aus Formular links und E-Book-Cover rechts.
- Buttons/Komponenten: PDF-Toolbar mit Zoom/Paginierung; Formular mit drei Feldern, Checkbox, Turnstile und dunklem CTA.
- Typo: H2 groß und zentriert; Formlabels Bold, Hilfetext klein.
- Farbe/Fläche: Viewer auf neutraler Fläche; Form-Split hell, E-Book-Cover als Bildanker.
- Abstände/Rhythmus: Sehr großer Viewerbereich; Formular folgt mit deutlichem Sektionswechsel.
- Mobil: Checkpunkte stapeln; Viewer-/Formzustand im gewählten Slice nicht vollständig sichtbar.
- Pattern: Kandidat: Lead-Magnet-Detail mit eingebettetem Dokument und Form-Gate.

## Seite: /franchise-partner-werden

Zustände: **unproven** — keine belastbaren CTA-/Karten-/Formstates im Closure-Sweep.

### 105 — Franchise-Hero mit Store-Beweis [franchise-partner-werden-desktop-00-fold.png | franchise-partner-werden-mobile-00-fold.png]
- Anordnung: Desktop Textspalte links, echtes Store-Foto rechts; mobil Foto vor Eyebrow/H1/CTA/Benefits.
- Buttons/Komponenten: Dunkelgrüner Primary-CTA mobil vollbreit; drei Checkmark-Benefits.
- Typo: H1 ca. 45 px Desktop, mobil ca. 34 px; Lead kompakt.
- Farbe/Fläche: Heller Grund, Store-Foto mit großer rechter Rundung.
- Abstände/Rhythmus: Hero hat viel Luft; mobil CTA trennt H1 von Lead und Benefits.
- Pattern: `P-HERO-SPLIT` für Partnerakquise.

### 106 — Proof-Metriken und grüner Marken-Split [franchise-partner-werden-desktop-02-y750.png | franchise-partner-werden-mobile-03-y844.png]
- Anordnung: Vier dunkelgrüne Metrikkarten in einer Reihe; darunter hellgrüne Splitfläche mit Store-Foto links und Erklärung rechts. Mobil Metriken einzeln untereinander.
- Buttons/Komponenten: Zahlenkarten ohne CTA; reine Kennzahlen+Label.
- Typo: Zahlen/Schlüsselworte im Akzentgrün, Labels klein hell.
- Farbe/Fläche: Starker Wechsel Dunkelgrün→Akzentgrün; Pixel-Deko als Markenmotiv.
- Abstände/Rhythmus: Großzügiger Abstand zwischen Proof-Reihe und Split.
- Pattern: `P-PROOF-STRIP` + `P-CTA-MID` ohne CTA.

### 107 — Aufgaben-Doppelspalte und Produktkarten [franchise-partner-werden-desktop-04-y2250.png]
- Anordnung: Zwei gleich breite Bild-/Checklisten-Spalten erklären Rollen; darunter drei großformatige Produktkarten mit Foto-Overlay.
- Buttons/Komponenten: Grüne Checkmarks, Karten ohne sichtbaren Button im Slice; Plus-Signet als dekorativer Marker.
- Typo: Rollenpunkte Bold+Regular; Produktnamen groß weiß auf Bild.
- Farbe/Fläche: Neutraler Grund, dunkle Foto-Overlays, Akzentgrün nur Checks/Plus.
- Abstände/Rhythmus: Strenges Zweier-Grid wechselt in Dreier-Grid.
- Mobil: Im gelesenen Material nicht belegt.
- Pattern: Kandidat: Partner-Rollenvergleich + Produktportfolio.

## Seite: /newsletter

Zustände: **unproven** — Formular, Akkordeon und CTA nicht interaktiv aufgenommen.

### 108 — Bild-Hero und Benefit-Liste [newsletter-desktop-00-fold.png | newsletter-mobile-00-fold.png]
- Anordnung: Vollbreites Hausfoto mit großer rechter Rundung und weißer H1 unten links. Mobil bleibt das Foto, darunter folgt eine vertikale Benefit-Liste mit Marken-Check-Glyphen.
- Buttons/Komponenten: Im Hero kein CTA; Benefits durch Linien getrennt.
- Typo: H1 ca. 48 px weiß; mobil ca. 32 px.
- Farbe/Fläche: Dunkles Foto trägt weißen Text; neutraler Grund darunter.
- Abstände/Rhythmus: Hero direkt unter Nav, danach ruhige Textliste.
- Pattern: `P-HERO-PHOTO` ohne Fold-CTA.

### 109 — Fliederfarbenes Newsletter-Formular und Themenakkordeon [newsletter-desktop-02-y750.png, newsletter-desktop-04-y2250.png | newsletter-mobile-03-y844.png]
- Anordnung: Flieder-Split mit H2/Markenglyphe links und Form rechts; mobil alles einspaltig. Weiter unten große Themenzeilen als Akkordeon mit Plus rechts.
- Buttons/Komponenten: Zwei Felder, Einwilligungscheckbox, Turnstile, dunkler CTA; Akkordeonzeilen nur durch horizontale Linien getrennt.
- Typo: H2 sehr groß, Lead in gedämpftem Violett; Akkordeontitel ca. 34 px Bold.
- Farbe/Fläche: Flieder als dominante Formularfläche, dunkler CTA, Akzentgrün nur kleine Labels.
- Abstände/Rhythmus: Große Innenpolster; Themenzeilen sehr hoch und luftig.
- Pattern: Newsletter-Split + `P-FAQ`-ähnliches Themenakkordeon.

## Seite: /presseraum

Zustände: **unproven** — Download- und Artikelkartenstates nicht aufgenommen.

### 110 — Presseintro, Kontaktkarte und Downloadreihe [presseraum-desktop-00-fold.png, presseraum-desktop-01-y0.png | presseraum-mobile-00-fold.png]
- Anordnung: Große linke H1+Lead; darunter Kontakttext links und zentrierte Personenkarte. Danach drei gleich breite Downloadblöcke.
- Buttons/Komponenten: Personenkarte mit quadratischem Porträt, Name und E-Mail; Downloads als breite Outline-Buttons mit Download-Icon.
- Typo: H1 ca. 58 px, Kontakt-H2 ca. 32 px, Buttonlabels Bold.
- Farbe/Fläche: Neutraler Grund, Akzentgrün nur Deko-Plus und Mini-Winkel.
- Abstände/Rhythmus: Sehr viel Weißraum zwischen Intro, Kontakt und Downloads.
- Mobil: Kontaktkarte zentriert; Downloads stapeln vollbreit.
- Pattern: Kandidat: Press-Hub mit Asset-Downloads.

### 111 — Medienlogo-Leiste und Pressestimmen-Grid [presseraum-desktop-02-y750.png | presseraum-mobile-03-y844.png]
- Anordnung: Fünf monochrome Logos in einer Zeile; darunter zentrierte H2 und dreispaltige Artikelkarten.
- Buttons/Komponenten: Artikelkarten ohne Rahmen, Bild+Kategoriechip+Lesezeit+Titel+Datum.
- Typo: H2 ca. 46 px, Kartentitel Bold.
- Farbe/Fläche: Logozeile grau; Bilder liefern Farbe, Chips Akzentgrün.
- Abstände/Rhythmus: Großer Abstand Logozeile→H2, gleichmäßiges Kartenraster.
- Mobil: Download-/Logo-Bereich im gewählten Slice sichtbar, Artikelgrid nicht vollständig belegt.
- Pattern: `P-PROOF-STRIP` + Editorial-Grid.

## Seite: /service

Zustände: **unproven** — Tile-Hover/Focus nicht aufgenommen.

### 112 — Service-Hub als 2×3 Navigationskacheln [service-desktop-00-fold.png, service-desktop-01-y0.png | service-mobile-00-fold.png]
- Anordnung: H1+Lead oben links; darunter sechs gleich große Kacheln in drei Spalten/zweien Reihen. Mobil 2×3.
- Buttons/Komponenten: Ganze Kachel ist Navigationsfläche; oben links Titel, unten rechts eigenständiges Line-Icon mit Mehrfarbakzent.
- Typo: H1 ca. 58 px, Kacheltitel ca. 32 px Desktop/18 px mobil.
- Farbe/Fläche: Graue Karten minimal dunkler als Seitenfläche, ohne Schatten.
- Abstände/Rhythmus: Strenges Raster mit gleichmäßigen Gaps.
- Pattern: Kandidat: Service-Navigation als Icon-Tile-Grid.

### 113 — Wiederverwendeter Newsletter-Split und Footer [service-desktop-02-y750.png | service-mobile-03-y844.png]
- Anordnung: Direkt nach den sechs Tiles folgt der bekannte Flieder-Newsletter-Split, dann Footer.
- Buttons/Komponenten: Formular identisch zur Newsletterroute.
- Typo/Farbe: Gleiche H2/Form-Hierarchie und Flieder/Tannengrün-Folge.
- Abstände/Rhythmus: Hub bleibt kurz; Tile-Raster→Newsletter→Footer ohne weitere Sektion.
- Mobil: Formular einspaltig; Cookie-Layer überdeckt oberen Teil.
- Pattern: Referenz Newsletter-Split.

## Seite: /service/erklaer-videos

Zustände: **unproven** — Video-/Filterstates fehlen; Youtube-Platzhalter ist nur Consent-Zustand im statischen Capture.

### 114 — Video-Hub-Header, Filter und Featured-Karte [service__erklaer-videos-desktop-00-fold.png | service__erklaer-videos-mobile-00-fold.png]
- Anordnung: Eyebrow+große H1, darunter horizontale Filterchips und erste Featured-Videokarte. Mobil Filter horizontal angeschnitten, Karte einspaltig.
- Buttons/Komponenten: Aktiver Filter Akzentgrün; Video ohne Marketingcookies als helle Consent-Karte mit dunklem Button.
- Typo: H1 ca. 58 px, Kartenheadline ca. 30 px.
- Farbe/Fläche: Heller Grund; Chips in gedämpftem Grün, Akzent nur aktiv.
- Abstände/Rhythmus: Große Luft zwischen H1, Filtern und Grid.
- Pattern: Kandidat: Video-Library mit Filterchips.

### 115 — Dreispaltiges Video-Grid [service__erklaer-videos-desktop-02-y750.png, service__erklaer-videos-desktop-04-y2250.png | service__erklaer-videos-mobile-03-y844.png]
- Anordnung: Desktop drei Karten je Reihe; Thumbnail, Kategorie/Datum, Titel, kurzer Teaser. Mobil eine Karte je Reihe.
- Buttons/Komponenten: Youtube-Consent-Platzhalter anstelle Thumbnail, wenn Cookies fehlen; sonst gestaltete Video-Cover.
- Typo: Große zweizeilige Titel, kleine grüne Kategoriechips.
- Farbe/Fläche: Unterschiedliche Coverfarben (Grün, Flieder, Koralle), sonst neutraler Grund.
- Abstände/Rhythmus: Gleichmäßiges Kartenraster ohne Rahmen.
- Pattern: Editorial-Grid für Video-Inhalte.

## Seite: /balkonkraftwerk-speicher

Zustände: **unproven** — Produktkarten-/Tabszustände nicht aufgenommen.

### 116 — Bild-Hero und Benefit-Liste [balkonkraftwerk-speicher-desktop-00-fold.png | balkonkraftwerk-speicher-mobile-00-fold.png]
- Anordnung: Full-bleed dunkles Produktbild mit weißer H1 unten links; mobil Bildkarte mit H1 im Bild, darunter vertikale Benefits.
- Buttons/Komponenten: Kein CTA im sichtbaren Hero; Benefitzeilen mit Markenglyphen und Trennlinien.
- Typo: H1 ca. 48 px weiß, mobil ca. 32 px.
- Farbe/Fläche: Dunkle Produktfotografie, neutraler Inhaltsgrund.
- Abstände/Rhythmus: Hero unmittelbar unter Header; mobil Benefits direkt darunter.
- Pattern: `P-HERO-PHOTO` ohne CTA.

### 117 — Speicher-Produktraster und mobile Sticky-Tabs [balkonkraftwerk-speicher-desktop-02-y750.png, balkonkraftwerk-speicher-desktop-04-y2250.png | balkonkraftwerk-speicher-mobile-03-y844.png]
- Anordnung: GoodWe als vierspaltige Produktreihe, Erweiterungsbatterien darunter; SunEnergyXT zweispaltig. Mobil Karten einzeln.
- Buttons/Komponenten: Kapazitätsbadge, Produktbild, Preis+Streichpreis, Bulletliste, dunkler CTA. Unten mobil klebt eine horizontale Tabnavigation.
- Typo: Produktname Bold, Preis groß Regular, Spezifikation klein.
- Farbe/Fläche: Kartenflächen hellgrau, CTAs Tannengrün, Badges beige/grün.
- Abstände/Rhythmus: Große Produktgruppen-H2 trennen Herstellerfamilien.
- Pattern: `P-PRICE` als technisches Produktvergleichsraster.

## Seite: /zubehoer

Zustände: **unproven** — Kategorie-/FAQ-Interaktionen nicht aufgenommen.

### 118 — Zubehörindex mit vier farbcodierten Kategorien [zubehoer-desktop-00-fold.png, zubehoer-desktop-01-y0.png | zubehoer-mobile-00-fold.png, zubehoer-mobile-03-y844.png]
- Anordnung: Große H1+kompakter Bold-Lead; darunter vier gleich breite Bildkacheln. Mobil einspaltig.
- Buttons/Komponenten: Ganze Kachel als Kategorie-Link; Titel oben links, freigestelltes Produktmotiv unten/rechts.
- Typo: H1 ca. 48 px, Lead ca. 20 px Bold, Kacheltitel ca. 21 px.
- Farbe/Fläche: Vier gedämpfte Farbfelder (Grau-Blau, Salbei, Flieder, Beige).
- Abstände/Rhythmus: Sehr großer Abstand Lead→Kacheln; gleichmäßiges Vierergrid.
- Pattern: Kandidat: Farbcodierter Kategorieindex.

### 119 — Zubehör-FAQ als große Linienzeilen [zubehoer-desktop-02-y750.png]
- Anordnung: Breite Akkordeonzeilen, Labelchip links oben, große Frage darunter, Plus rechts.
- Buttons/Komponenten: Keine Kartenflächen; nur horizontale Trennlinien und Plus-Signet.
- Typo: Fragen ca. 34 px Bold, Chips klein Bold.
- Farbe/Fläche: Neutraler Grund, Akzentgrün nur Chips.
- Abstände/Rhythmus: Sehr hohe Zeilen mit großzügigem Innenraum.
- Mobil: Im gelesenen Mobile-Slice nur Beginn der FAQ sichtbar.
- Pattern: `P-FAQ`.

## Seite: /stecker-solaranlagen/balkon

Zustände: **unproven** — Produktkarten/FAQ/CTA nicht interaktiv aufgenommen.

### 120 — Balkon-Kategorie-Hero und Benefits [stecker-solaranlagen__balkon-desktop-00-fold.png | stecker-solaranlagen__balkon-mobile-00-fold.png]
- Anordnung: Full-bleed Familienfoto am Balkongeländer, weiße H1 unten links mit einem grünen Wort. Mobil Bildkarte, danach drei Benefitzeilen.
- Buttons/Komponenten: Kein Fold-CTA; Benefits mit Markenchecks.
- Typo: H1 ca. 48 px Desktop, mobil ca. 32 px.
- Farbe/Fläche: Foto dominiert; Akzentgrün im H1-Wort und Checks.
- Abstände/Rhythmus: Hero direkt unter Nav, Benefits bilden Mobilübergang zum Produktbereich.
- Pattern: `P-HERO-PHOTO` mit Akzentwort.

### 121 — Produktkonfiguration, Video-Beweis und Info-Split [stecker-solaranlagen__balkon-desktop-02-y750.png, stecker-solaranlagen__balkon-desktop-04-y2250.png | stecker-solaranlagen__balkon-mobile-03-y844.png]
- Anordnung: Dreispaltige Produktkarten nach Modulanzahl; darunter breites Video-Testimonial, später Foto/Text-Split und FAQ.
- Buttons/Komponenten: Leistungsbadge, Preis, dunkler „Module auswählen“-CTA; Mobil Karten einzeln. Video mit Play-Overlay.
- Typo: Produktname Bold, Preis groß Regular, CTA kompakt.
- Farbe/Fläche: Produktbilder mit grünem Geometrie-Layer; Info-Split neutral.
- Abstände/Rhythmus: Produktgrid→Video als deutlicher Beweiswechsel.
- Pattern: `P-PRICE` + Video-Testimonial + `P-FAQ`.

## Seite: /solaranlagen/12-module-5-kwp

Zustände: **unproven** — Variantenkarten/Anfrage-CTA nicht interaktiv aufgenommen.

### 122 — System-Hero und Beratungsband [solaranlagen__12-module-5-kwp-desktop-00-fold.png | solaranlagen__12-module-5-kwp-mobile-00-fold.png]
- Anordnung: Desktop Text links, Hausfoto rechts mit großer Rundung; mobil Foto zuerst, dann H1/Lead/CTA/Benefits. Darunter ein schmales dunkles Beraterband.
- Buttons/Komponenten: Dunkelgrüner Haupt-CTA mobil vollbreit; Beraterband mit Porträt, WhatsApp-Füllbutton und E-Mail-Outline.
- Typo: H1 ca. 34–38 px Desktop, mobil ähnlich groß; Eyebrow Bold.
- Farbe/Fläche: Heller Grund, Tannengrün im CTA/Band, Akzentgrün auf Checks.
- Abstände/Rhythmus: Kompakter Hero; Beraterband als harter Sektionsabschluss.
- Pattern: `P-HERO-SPLIT` + `P-CTA-MID`.

### 123 — Vier Montagevarianten und Detail-Splits [solaranlagen__12-module-5-kwp-desktop-02-y750.png, solaranlagen__12-module-5-kwp-desktop-04-y2250.png | solaranlagen__12-module-5-kwp-mobile-03-y844.png]
- Anordnung: Vierspaltige Variante Schrägdach/Flachdach/Zaun/Carport mit Bild, Terminbadge, Specs und CTA. Danach je Variante großer Text/Fotopaar-Split.
- Buttons/Komponenten: Akzentgrünes Terminband, dunkler „Jetzt anfragen“-CTA; Detailabschnitt mit Checkliste und wiederholtem Beratungsband.
- Typo: Gruppen-H2 sehr groß, Kartentitel ca. 27 px, Specs kleiner.
- Farbe/Fläche: Neutrale Karten, Akzentgrün nur Badge/Checks, Pixel-Deko im Detail.
- Abstände/Rhythmus: Karten auf gemeinsamer Buttonlinie; Details deutlich luftiger.
- Pattern: `P-PRICE`-Variante + `P-HERO-SPLIT` je Montageart.

## Seite: /stecker-solaranlagen/balkon/pribalcony-duo/SW11834.4

Zustände: **unproven** — Konfigurator-Auswahl, Sticky-Cart und Tabs wurden nicht geklickt.

### 124 — Produktdetail als Split-Konfigurator [stecker-solaranlagen__balkon__pribalcony-duo__SW11834.4-desktop-00-fold.png, stecker-solaranlagen__balkon__pribalcony-duo__SW11834.4-desktop-02-y750.png | stecker-solaranlagen__balkon__pribalcony-duo__SW11834.4-mobile-00-fold.png]
- Anordnung: Links großes Produkt-/Lifestylebild, rechts Produktname, Preis, Proofpunkte und gestufter Konfigurator. Mobil Bild vor Titel; Warenkorbkarte sticky am unteren Rand.
- Buttons/Komponenten: Montageort-Kacheln, Modulanzahl-Segmente, Speicheroptionen mit Auswahlrahmen/Check, großer hellgrüner Warenkorb-CTA.
- Typo: Produktname ca. 38 px, Preis groß Regular, Fragen ca. 24 px Bold.
- Farbe/Fläche: Konfigurator neutral hell; selektierte Optionen Tannengrün, CTA Akzentgrün.
- Abstände/Rhythmus: Desktop rechte Spalte lang und schrittweise; linkes Bild bleibt visuell dominant.
- Pattern: Kandidat: Sticky Produkt-Konfigurator.

### 125 — Lieferumfang, Produkttabs und mobile Sticky-Kaufkarte [stecker-solaranlagen__balkon__pribalcony-duo__SW11834.4-desktop-04-y2250.png | stecker-solaranlagen__balkon__pribalcony-duo__SW11834.4-mobile-03-y844.png]
- Anordnung: Lieferumfang als großes Freistellergrid; darunter Tabzeile für Modul/Batterie/Halterung und Produktdetails. Mobil Montageart-Akkordeon plus dauerhaft sichtbare Kaufkarte.
- Buttons/Komponenten: Tab-Unterstrich Akzentgrün, Akkordeonkarten mit Check, Sticky-Cart mit Preis, Rabattcode, Lieferzeit und CTA.
- Typo: Lieferumfangstitel groß, Itemnamen Bold, Specs klein gedämpft.
- Farbe/Fläche: Freisteller auf hellgrauen Kacheln; Sticky-Cart fast weiß mit Akzentgrün.
- Abstände/Rhythmus: Viele Konfigurationszustände, aber klar über Gruppenüberschriften getrennt.
- Pattern: Kandidat: Produktdetail mit Sticky-Cart und gestuftem Optionssystem.

## Seite: /store-in-deiner-naehe/bad-oeynhausen

Zustände: **unproven** — Formular-, Karten- und Mapstates nicht aufgenommen.

### 126 — Standort-Hero mit Kontaktdaten und Doppel-CTA [store-in-deiner-naehe__bad-oeynhausen-desktop-00-fold.png | store-in-deiner-naehe__bad-oeynhausen-mobile-00-fold.png]
- Anordnung: Desktop Kontaktdaten links und Storefoto rechts; mobil Storefoto zuerst, H1, zwei CTAs und Standorttext.
- Buttons/Komponenten: Primär dunkelgrün „Termin anfragen“, Sekundär Outline „Anrufen“; Klartext-Adresse, Telefon, Mail und Einzugsgebiet.
- Typo: H1 ca. 40 px Desktop/32 px mobil; Kontaktdaten Regular.
- Farbe/Fläche: Heller Grund, Storefoto mit großer Rundung.
- Abstände/Rhythmus: Desktop dichter Informationshero; mobil CTAs früh vor Detailtext.
- Pattern: `P-HERO-SPLIT` als Local-Store-Template.

### 127 — Leistungen, Terminanfrage und Anfahrt [store-in-deiner-naehe__bad-oeynhausen-desktop-02-y750.png, store-in-deiner-naehe__bad-oeynhausen-desktop-04-y2250.png | store-in-deiner-naehe__bad-oeynhausen-mobile-03-y844.png]
- Anordnung: Drei große Foto-Overlay-Leistungskarten; danach breites zweispaltiges Formular, anschließend Map links und Flieder-Info rechts.
- Buttons/Komponenten: Leistungskarten mit grünem Plus; Formularfelder, Turnstile und vollbreiter dunkler CTA; Map als eingebettete Karte.
- Typo: Leistungsnamen groß weiß auf Foto, Formular-H2 zentriert, Labels Bold.
- Farbe/Fläche: Foto-Overlays dunkel; Infofläche Flieder; CTA Tannengrün.
- Abstände/Rhythmus: Karten→Form→Map/Info als klarer lokaler Funnel.
- Mobil: Karten einspaltig; Formular/Map im gewählten Mobile-Slice nicht vollständig belegt.
- Pattern: Local-Service-Grid + `P-CONTACT` + Standortkarte.
