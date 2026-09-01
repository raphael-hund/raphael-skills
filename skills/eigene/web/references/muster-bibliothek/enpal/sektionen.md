# Enpal — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Leitwerte (Pixelmessung auf den PNG, Python/PIL): Akzent-Gelb `#ffd233`
(Home-Hero-CTA), Logo-Punkt und Magazin-Akzent `#ffb000`, Navy `#072543` (Footer,
Zeitstrahl, ausgewählte Quiz-Kachel), Karten-/Strip-Grau `#f8f8f8`, Info-Blau
`#ebf2ff`, Grün `#76be74` (Stat-Zahlen, Prozess-Ziffern) und `#7bc079` (Eyebrow),
Sekundärtext `#6a7c8e`, Tabellen-Balken `#f8b004` auf Rest `#e8e8e8`.
Kein Cookie-Overlay in irgendeinem gelesenen Shot — alle Seiten zeigen den nackten
Seitenzustand.

---

## Seite: /

### 01 — Navbar (global, auf allen 5 Routen identisch) [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Dreiteilige Leiste über die volle Breite, Höhe ca. 84 px. Logo links bei
  x≈64, in der optischen Mitte eine einzige weiße Pille (ca. x 362–1106, Radius
  ca. 999 px = echte Pille) die alle 5 Dropdown-Links als Gruppe einfasst, Login rechts
  bei x≈1260–1376. Über dem Hero-Bild schwebt die Leiste transparent, die Pille bleibt
  weiß — auf Weiß-Seiten (`erfahrungen-desktop-00-fold.png`) verschwindet die Pille
  optisch und nur die Links stehen frei.
- Buttons/Komponenten: Nav-Items je mit kleinem Chevron-nach-unten rechts vom Wort,
  ohne Trennlinien. Login ist ein Outline-Button: weiße 1-px-Kontur, transparente
  Füllung über Bild bzw. weiße Füllung auf hellem Grund, Radius ca. 12–14 px (eckig
  gerundet, keine Pille), rechts ein Personen-Icon als Outline-Strich. Auf 390
  (`home-mobile-00-fold.png`) bleibt Login als Outline-Pille sichtbar, daneben ein
  klassisches 3-Strich-Burger-Icon in Navy.
- Typo: Ein Schnitt für alle Nav-Items, Grotesk (geometrisch, runde Punzen — Poppins-
  Charakteristik), Weight ca. 500–600, ca. 15–16 px, keine Caps, leichte positive
  Laufweite. Logo-Wortmarke deutlich fetter (ca. 700) und ca. doppelt so groß.
- Farbe/Fläche: Über dem Hero ist der Leistenhintergrund transparent, Logo weiß mit
  gelbem Punkt (`#ffc229` gemessen); auf allen gescrollten Slices ist die Leiste
  weiß-deckend und das Logo Navy mit gelbem Punkt. Die Leiste ist sticky — sie steht
  auf jedem einzelnen Scroll-Slice aller fünf Seiten oben.
- Abstände/Rhythmus: Innenabstand der Nav-Pille ca. 20 px vertikal, ca. 22 px zwischen
  den Items; sehr viel Luft zwischen Logo und Pille (ca. 190 px) — die Mitte ist
  bewusst geschlossen, die Ränder sind offen.
- Mobil: Nav auf 3 Elemente reduziert (Logo, Login-Outline, Burger), Höhe ca. 62 px,
  Links komplett in den Burger ausgelagert.
- Pattern: Kandidat: Gruppierte Nav-Pille mit Outline-Login

### 02 — Hero Startseite [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollflächiges Bild über die gesamte Fold-Breite und -Höhe (1440×900).
  Der Text sitzt nicht links wie im klassischen Foto-Hero, sondern zentriert: H1 auf
  ca. y 320, darunter mit ca. 160 px Abstand ein einzelner CTA auf ca. y 500–546,
  beides horizontal mittig. Zwei Elemente überlappen das Motiv an den Rändern: unten
  links das CHIP-Siegel als weiße Kachel (x 15–125, y 760–882), unten mittig eine
  dunkle Chip-Leiste (x 441–999, y 838–884), die den unteren Fold-Rand abschließt.
  Der CTA liegt optisch direkt vor dem Hausgiebel — Text und Motiv sind aufeinander
  gesetzt, nicht getrennt.
- Buttons/Komponenten: Ein einziger Primär-CTA: gefüllt gelb (gemessen `#ffd233`),
  Radius geschätzt ca. 14 px (eckig gerundet, klar keine Pille), Breite ca. 260 px,
  Höhe ca. 46 px, Label in Navy Weight ca. 600, rechts ein dünner Pfeil-nach-rechts
  als Outline-Icon mit ca. 12 px Abstand zum Text. Die Chip-Leiste ist eine
  halbtransparente dunkle Pille (Radius ca. 8 px, gemessen `#444633` über dem Rasen,
  also Blend aus Dunkel + Motiv) mit 3 Benefit-Einheiten: je ein grüner Haken-Outline
  plus weißer Text, getrennt durch schmale vertikale Trenner. Das CHIP-Siegel ist die
  echte Original-Bildmarke, unbeschnitten, weiß hinterlegt.
- Typo: Nur zwei Ebenen im Fold, kein Eyebrow und keine Lead-Zeile. H1 sehr groß,
  ca. 64–68 px, Weight ca. 600, Grotesk, weiß, keine Caps, normale bis leicht enge
  Laufweite. CTA-Label ca. 16 px, Chip-Text ca. 15 px — Verhältnis H1:CTA grob 4:1.
  Auffällig: die H1 steht einzeilig und nutzt fast die ganze Breite (x 300–1138).
- Farbe/Fläche: Hell-in-hell — das Render ist tagesbelichtet, der Himmel oben leicht
  abgedunkelt für die weiße H1. Der einzige gesättigte Akzent im ganzen Fold ist der
  gelbe CTA; das grüne Haken-Icon ist der einzige Zweitakzent, und der bleibt klein.
  Kein Wash und kein Verlaufsbalken über dem Motiv.
- Abstände/Rhythmus: Sehr großzügig — ca. 240 px Luft zwischen Nav-Unterkante und H1,
  ca. 160 px zwischen H1 und CTA, ca. 290 px vom CTA bis zur Chip-Leiste. Der Fold
  atmet, das Motiv trägt die Fläche.
- Mobil: Deutlich anderer Aufbau, nicht nur gestapelt. Das Motiv wechselt vom hellen
  Haus-Render zu einer dunklen Studio-Bühne mit goldenem Licht-Swirl um Speicher,
  Modul, Manager und App (gemessen Hintergrund `#1f2c37`). Text linksbündig statt
  zentriert, H1 zweizeilig ca. 30 px. Die Chip-Leiste wird zu einer linksbündigen
  Checkliste mit 3 Zeilen (grüner Haken + Text), das CHIP-Siegel rutscht darunter in
  den Fließ, und der CTA wird vollbreit (x 20–370, Höhe ca. 48 px) statt inline.
  Reihenfolge damit: H1 → Checkliste → Siegel → CTA.
- Pattern: `P-HERO-PHOTO` (Abweichung: 3D-Render statt Foto, Text zentriert statt links)

### 03 — Enpal.One+ Produkt-Teaser-Karte [home-desktop-02-y750.png | home-mobile-00-fold.png]
- Anordnung: Eine große Karte im Content-Container (x 160–1280, also ca. 1120 px
  breit, Höhe ca. 640 px), Split innerhalb der Karte: Text linke Hälfte ab x≈270,
  Produktfoto rechte Hälfte. Das Produkt (Speicher-Fächer) ist freigestellt und
  überlappt die Kartenmitte, ohne den Textblock zu berühren.
- Buttons/Komponenten: Ein Sekundär-CTA in derselben gelben Sprache wie der Hero,
  aber kleiner: ca. 170×48 px, Radius ca. 14 px, gefüllt gelb, Navy-Label ca. 14 px,
  Pfeil rechts. Die Karte selbst hat einen großen Radius (ca. 20–24 px) und keinen
  Schatten — sie trennt sich nur über die Fläche.
- Typo: Dreistufig: Eyebrow („Dank Enpal.One+") ca. 17 px in Weiß bei niedrigem
  Weight, darunter H2 dreizeilig ca. 42 px Weight 600, kein Fließtext. Verhältnis
  Eyebrow:H2 grob 1:2,5. Keine Caps.
- Farbe/Fläche: Silbergrauer Verlauf innerhalb der Karte, dunkler links, heller
  rechts hinter dem Produkt — die Karte ist die einzige Fläche, die Seitenweiß bricht.
  Akzent sitzt ausschließlich im CTA.
- Abstände/Rhythmus: Ca. 110 px Abstand Hero-Unterkante zur Karte, ca. 190 px
  Innenabstand oben im Textblock, ca. 75 px zwischen H2 und CTA. Dicht am Produkt,
  luftig am Text.
- Mobil: Karte zerfällt in gestapelte Blöcke: Eyebrow und H2 zentriert auf Weiß,
  darunter ein Outline-CTA („Mehr erfahren", weiße Füllung, dünne Kontur, Pfeil) und
  erst danach ein separater grauer Bildblock. Der gelbe Fill wird also mobil zum
  Outline heruntergestuft, damit im Fold nur ein gefüllter CTA bleibt.
- Pattern: Kandidat: Produkt-Teaser-Karte mit Verlaufsfläche

### 04 — Produktband Solar (dunkle Bühne) [home-desktop-04-y2250.png | -]
- Anordnung: Abgerundete Vollbild-Bühne im Container (x 160–1280), Bild und Text
  liegen in derselben Fläche: das Studio-Foto des Solarmoduls sitzt links, der
  Textblock rechts ab x≈776 direkt auf dem Bild — kein Split in zwei Spalten, sondern
  Text auf Motiv.
- Buttons/Komponenten: Derselbe gelbe CTA-Typ, ca. 212×46 px, Radius ca. 14 px,
  Navy-Label, Pfeil rechts (gemessen `#f1c833`, leicht gedämpft durch den dunklen
  Bildkontext).
- Typo: Eyebrow ca. 17 px in Weiß (angeschnitten im Slice), H2 zweizeilig ca. 44 px
  Weight 600 weiß, darunter ein vierzeiliger Lead ca. 19 px in gebrochenem Weiß.
  Verhältnis Eyebrow:H2:Lead grob 1:2,6:1,1.
- Farbe/Fläche: Tiefdunkle Studio-Fläche (gemessen `#100d10` im Motivschatten), Radius
  ca. 20 px, keine Kontur. Der gelbe CTA ist der einzige Farbpunkt.
- Abstände/Rhythmus: Innenabstand links des Textblocks ca. 130 px vom Bühnenrand,
  ca. 60 px zwischen Lead und CTA, ca. 40 px Luft zur nächsten Bühne. Dichte Sektion
  im Vergleich zum Hero.
- Mobil: nicht separat gelesen; Muster wie Desktop gestapelt zu erwarten, nicht geprüft.
- Pattern: Kandidat: Dunkle Produktbühne mit Text-auf-Motiv

### 05 — Produktband Wärmepumpe (dunkle Bühne, gespiegelt) [home-desktop-04-y2250.png | -]
- Anordnung: Identische Bühne wie 04, aber gespiegelt: Text links ab x≈270, Produkt
  rechts. Zwei dunkle Bänder stehen damit direkt untereinander, getrennt nur durch
  ca. 40 px Weiß.
- Buttons/Komponenten: Gelber CTA ca. 218×46 px, gleiche Form. Darunter — und das ist
  der Unterschied zu 04 — die echte homeandsmart-Testsieger-Bildmarke als
  rechteckige Kachel (ca. 224×74 px) mit blauem Balken, direkt unter dem Button statt
  neben dem Text.
- Typo: Gleiche Hierarchie wie 04. H2 hier einzeilig und dadurch kürzer, Lead
  dreizeilig. Der Preis steht im Lead-Schnitt, nicht als eigene Preistypo.
- Farbe/Fläche: Dunkler Studioboden mit Betonwand, wieder nur der gelbe CTA als
  Akzent plus die fremdfarbige Siegel-Kachel.
- Abstände/Rhythmus: Textblock startet ca. 480 px unter der Bühnenoberkante — der
  Text sitzt tief, das Produkt darf oben Fläche nehmen.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Dunkle Produktbühne mit Text-auf-Motiv (Spiegelung von 04)

### 06 — Presse-Leiste [home-desktop-04-y2250.png | -]
- Anordnung: Vollbreites Band (0–1440, keine Container-Begrenzung), eine zentrierte
  Zeile Überschrift, darunter eine einzige Reihe Wortmarken, gleichmäßig über die
  volle Breite verteilt (8 Logos sichtbar, das erste und letzte angeschnitten — die
  Reihe läuft als Marquee weiter).
- Buttons/Komponenten: Keine Buttons. Nur Original-Wortmarken als Bildmarken, alle
  auf dieselbe optische Höhe gebracht (ca. 20–26 px), teils farbig (Handelsblatt
  orange, ntv rot, Focus rot), teils grau — nicht auf Graustufen vereinheitlicht.
- Typo: Nur eine Zeile, ca. 15 px in Navy, Weight ca. 500, zentriert. Bewusst klein
  gegenüber den Logos.
- Farbe/Fläche: Warmes Hellgrau (gemessen `#f8f8f8`) als Bandfläche — der erste
  Flächenwechsel der Seite nach zwei dunklen Bühnen.
- Abstände/Rhythmus: Ca. 60 px Bandpadding oben, ca. 50 px zwischen Zeile und Logos,
  Logo-Abstände ca. 100–120 px. Sehr luftige, flache Leiste.
- Mobil: nicht separat gelesen.
- Pattern: `P-PROOF-STRIP`

### 07 — Video-Block [home-desktop-06-y3750.png | -]
- Anordnung: Ein einzelnes Video im Container (x 160–1280), ca. 630 px hoch, ohne
  begleitenden Text — steht allein zwischen zwei Sektionen.
- Buttons/Komponenten: Native Player-Controls in Weiß über dem Standbild:
  Pause-Icon links unten, Zeitanzeige `00:00 / 03:00`, dünne Scrubber-Linie über die
  volle Breite, Mute- und Fullscreen-Icon rechts. In der Bildmitte ein runder
  halbtransparenter Kreis (Ø ca. 90 px) mit Pause-Glyphe.
- Typo: Nur die Player-Zahlen, ca. 12 px weiß.
- Farbe/Fläche: Videostandbild deckt die ganze Karte, Radius ca. 20 px, Seitenfläche
  reines Weiß (gemessen `#ffffff`).
- Abstände/Rhythmus: Ca. 160 px Weiß über dem Video, ca. 145 px darunter bis zur
  nächsten H2 — der Block wird durch Leere isoliert statt durch eine Fläche.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Solitärer Video-Block ohne Rahmentext

### 08 — „Energie endlich günstig" — 3er-Beweisraster [home-desktop-06-y3750.png | home-mobile-14-y5486.png (Nachbarsektion)]
- Anordnung: Zentrierter Kopf (H2 + Subline), darunter ein 3-Spalten-Raster im
  Container: drei gleich breite Bild-Karten (je ca. 284 px breit, Gap ca. 20 px,
  Bildhöhe ca. 200 px, Radius ca. 12 px). Unter jedem Bild vertikal gestapelt:
  grüner Haken zentriert, Titel zentriert, Fließtext linksbündig. Die drei Spalten
  sind exakt gleich breit und oben bündig, unten dagegen ungleich lang.
- Buttons/Komponenten: Keine Buttons. Der grüne Haken ist ein reines Outline-Icon
  (ca. 20 px, kein Kreis, kein Badge) und sitzt frei zwischen Bild und Titel.
- Typo: H2 ca. 40 px Weight 600 Navy, Subline ca. 30 px in Grau (gemessen `#6a7c8e`)
  mit niedrigerem Weight — die Subline ist auffällig groß, nur ca. 25 % kleiner als
  die H2. Karten-Titel ca. 17 px Weight 600, Fließtext ca. 16 px Weight 400.
- Farbe/Fläche: Reines Weiß, keine Kartenfläche unter den Texten — nur die Bilder
  tragen Farbe. Grün ist hier der einzige Akzent, kein Gelb in der Sektion.
- Abstände/Rhythmus: Ca. 65 px zwischen H2 und Subline-Baseline, ca. 60 px bis zum
  Raster, ca. 30 px zwischen Bild und Haken. Mittlere Dichte.
- Mobil: In der Mobil-Serie wird das Raster zur Einspalter-Folge; die benachbarte
  Auszeichnungs-Sektion (`home-mobile-14-y5486.png`) zeigt das generelle
  Mobilprinzip der Seite: H2 zentriert dreizeilig gebrochen, Subline zentriert,
  Elemente untereinander, Container-Padding ca. 20 px.
- Pattern: `P-PROCESS-3`-nah (kein echter Prozess, drei parallele Belege)

### 09 — Erfolgsgeschichten-Slider [home-desktop-08-y5250.png | -]
- Anordnung: Zentrierter Kopf, darunter die Pfeil-Navigation mittig (ungewöhnlich:
  Pfeile stehen über dem Slider, nicht an den Seiten), darunter eine randlose
  Karten-Reihe, die links und rechts über den Container hinausläuft und an beiden
  Bildschirmrändern angeschnitten wird. Fünf Karten sichtbar (je ca. 280×355 px,
  Gap ca. 24 px), die mittlere ist voll gesättigt, die Nachbarn sind aufgehellt —
  ein Fokus-Fade statt Pfeil-Overlay.
- Buttons/Komponenten: Zwei runde Outline-Buttons (Ø ca. 46 px, 1 px Kontur, weiße
  Füllung, Pfeil links/rechts als dünner Strich) nebeneinander mittig. Auf jeder
  Karte oben links ein Regions-Badge: helle Pille (Radius ca. 999 px), Text in
  Grün-Grau, ca. 12 px — echte Pille, im Gegensatz zu den eckigen CTAs.
- Typo: H2 ca. 40 px Navy (im Slice oben angeschnitten), Subline ca. 30 px Grau —
  gleiche Kopf-Formel wie Sektion 08. Badge-Text ca. 12 px.
- Farbe/Fläche: Weiß. Die Karten sind Fotos mit Radius ca. 12 px; der einzige
  Farbeingriff ist die Aufhellung der Randkarten.
- Abstände/Rhythmus: Ca. 72 px vom Kopf zu den Pfeilen, ca. 58 px bis zu den Karten.
- Mobil: nicht separat gelesen.
- Pattern: `P-TESTIMONIAL`

### 10 — Konfigurator-Quiz „Ihr Haus, Ihr Komplettpaket" [home-desktop-08-y5250.png + home-desktop-12-y8250.png | -]
- Anordnung: Zentrierter Kopf, darunter eine zentrierte 3-zeilige Checkliste (Haken +
  Text, linksbündig innerhalb eines schmalen zentrierten Blocks), darunter ein
  handgezeichneter grüner Pfeil, der schräg nach unten links auf den Quiz-Container
  zeigt. Der Quiz selbst sitzt in einer breiten hellgrauen Fläche (x 255–1185),
  darin eine Progress-Zeile ganz oben, eine zentrierte Frage und ein 2×3-Raster aus
  Auswahl-Kacheln (je ca. 228×108 px, Gap ca. 66 px horizontal / 20 px vertikal).
- Buttons/Komponenten: Die Auswahl-Kacheln sind weiße Karten mit Radius ca. 8 px und
  weichem Schatten, Icon zentriert oben (Strichzeichnung mit gelben Fensterpunkten),
  Label zentriert darunter ca. 15 px Weight 600 Navy. Der Hover/Aktiv-Zustand ist in
  `home-desktop-12-y8250.png` sichtbar: die Kachel „Gewerbe" ist vollflächig Navy
  (gemessen `#072543`) mit weißem Label und weißem Icon — Zustandswechsel über
  Flächenfarbe, nicht über Kontur. Progress: dünne Linie mit grün gefülltem
  Fortschritt (gemessen `#6dce71`), am Ende ein grüner Kreis mit weißem Haken, links
  darüber „10 % geschafft" ca. 12 px grau.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau (wieder die Kopf-Formel).
  Checklisten-Zeilen ca. 17 px Weight 600 Navy. Quiz-Frage ca. 19 px Weight 600.
- Farbe/Fläche: Sehr helles Grau als Quiz-Fläche (gemessen `#fafafa`) gegen weiße
  Kacheln — der Kontrast ist minimal, die Kacheln heben sich fast nur über den
  Schatten ab. Grün trägt hier Fortschritt und Haken, Navy trägt den Aktivzustand.
  Bemerkenswert: kein gelber CTA in der ganzen Sektion — das Quiz ersetzt den Button.
- Abstände/Rhythmus: Ca. 80 px Kopf → Checkliste, ca. 55 px Checkliste → Pfeil,
  ca. 40 px Pfeil → Quiz-Fläche; Innenabstand der Quiz-Fläche ca. 30 px oben,
  ca. 55 px bis zur Frage. Die Kacheln stehen weit auseinander, das Raster wirkt
  bewusst luftig.
- Mobil: nicht separat gelesen.
- Pattern: `P-CONTACT`-nah (Bild-Quiz statt Formular, Mikro-Commitment zuerst)

### 11 — Auszeichnungs-Leiste [home-desktop-10-y6750.png | home-mobile-14-y5486.png]
- Anordnung: Vollbreites Band, zentrierter Kopf, darunter ein zentrierter Button,
  darunter eine Reihe aus 5 Siegel-Einheiten (Bildmarke oben, ein- oder zweizeilige
  Beschriftung darunter). Die Reihe läuft über die Containerbreite hinaus: das erste
  und das fünfte Element sind stark aufgehellt und rechts angeschnitten — sichtbarer
  Karussell-Zustand statt statischer Reihe.
- Buttons/Komponenten: „Alle ansehen" ist ein Outline-Button: weiße Füllung, dünne
  Navy-Kontur, Radius ca. 14 px, ca. 164×46 px, Navy-Label ca. 15 px, Pfeil rechts.
  Damit hat die Seite zwei Button-Stufen: gefüllt gelb = Funnel, Outline-Navy =
  Nebenweg. Die Siegel sind echte Original-Bildmarken (CHIP, TÜV Saarland, VDE) und
  zwei schwarze Wortzeichen-Icons, alle unterschiedlich proportioniert und nicht
  normalisiert.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau. Siegel-Beschriftung zweistufig:
  kleine grüne Zeile (Jahr bzw. Wertung, ca. 14 px) über einer Navy-Zeile ca. 18 px.
- Farbe/Fläche: Band in `#f8f8f8`, klarer Hell-Wechsel gegen das Weiß davor und
  danach. Grün als Mikro-Akzent in den Beschriftungen.
- Abstände/Rhythmus: Ca. 85 px Bandpadding oben, ca. 65 px Kopf → Button, ca. 70 px
  Button → Siegel, ca. 60 px unten. Symmetrisch und ruhig.
- Mobil: `home-mobile-14-y5486.png` zeigt: H2 bricht zentriert auf zwei Zeilen,
  Subline auf drei, der Outline-Button bleibt zentriert und wird schmaler
  (ca. 140 px), die Siegel-Reihe wird zum horizontal scrollenden Streifen mit
  angeschnittenem zweitem Element. Nichts entfällt.
- Pattern: `P-PROOF-STRIP`

### 12 — Community-Karte + Trustpilot [home-desktop-10-y6750.png | -]
- Anordnung: Zentrierter Kopf, darunter ein asymmetrischer Zweier: links eine
  Deutschlandkarte als grüne Punktwolke (ca. 480 px breit) mit drei kreisrunden
  Kundenfotos, die als Map-Pins mit spitzem Zipfel auf die Wolke zeigen — die Fotos
  überlappen die Kartenfläche und ragen oben/unten darüber hinaus. Rechts eine
  Review-Karte plus darunter zwei Zeilen Bewertungstext und das Trustpilot-Logo.
  Kein gleichmäßiges 50/50-Grid: die rechte Spalte startet erst bei x≈810 und ist
  schmaler.
- Buttons/Komponenten: Zwei kleine runde Outline-Pfeile (Ø ca. 26 px) links und
  rechts der Review-Karte, direkt auf deren Kanten sitzend — deutlich kleiner als
  die Slider-Pfeile in Sektion 09. Die Review-Karte selbst: hellgraue Fläche ohne
  Radius-Betonung, oben eine echte Trustpilot-Sternreihe (5 grüne Quadrate), darunter
  fetter Titel, Zitat, dann Klarname + Datum. Die Kunden-Pins sind Kreise mit
  ca. 4 px grünem Ring.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau. Review-Titel ca. 17 px Weight 600,
  Zitat ca. 15 px, Bewertungszeile ca. 14 px mit fett gesetzter Zahl.
- Farbe/Fläche: Weiß. Grün ist hier ausnahmsweise die dominante Fläche (Punktwolke,
  Pin-Ringe, Trustpilot-Sterne) — die einzige Sektion der Seite, in der nicht Gelb
  oder Navy führt.
- Abstände/Rhythmus: Ca. 75 px Kopf → Karte, die rechte Spalte ist vertikal in der
  Kartenhöhe zentriert. Dichte Sektion mit vielen kleinen Elementen.
- Mobil: nicht separat gelesen.
- Pattern: `P-TESTIMONIAL` + `P-MAP`-Variante

### 13 — FAQ [home-desktop-10-y6750.png + home-desktop-12-y8250.png | -]
- Anordnung: Zweispaltig asymmetrisch: links ein Textblock („Sie haben Fragen?" +
  Subline) ab x≈160, rechts das Akkordeon ab x≈688 bis 1272. Die linke Spalte bleibt
  beim Scrollen inhaltlich statisch, die rechte trägt die Zeilen. Unter der letzten
  Frage steht eine zentrierte Anschluss-Zeile plus ein handgezeichneter grüner Pfeil,
  der nach unten rechts auf den nächsten Quiz-Block zeigt.
- Buttons/Komponenten: Akkordeon-Zeilen ohne Kartenfläche: Frage links, Chevron-nach-
  unten rechts am Zeilenende, darunter eine 1-px-Trennlinie in hellem Grau. Alle
  Zeilen im geschlossenen Zustand — kein geöffnetes Panel in den Shots.
- Typo: H2 ca. 40 px Navy Weight 600, Fragen ca. 18 px Weight 600 Navy. Die Fragen
  sind fast so schwer gesetzt wie die H2 — hierarchisch flach.
- Farbe/Fläche: Reines Weiß, keine Fläche, kein Akzent außer dem grünen Pfeil.
- Abstände/Rhythmus: Zeilenhöhe ca. 77 px, Trennlinien in gleichmäßigem Raster. Sehr
  ruhig, viel Weißraum links.
- Mobil: nicht separat gelesen.
- Pattern: `P-FAQ`

### 14 — Quiz-Wiederholung am Seitenende [home-desktop-12-y8250.png | -]
- Anordnung: Derselbe Quiz-Container wie Sektion 10, ein zweites Mal ausgespielt, nun
  direkt über dem Footer. Gleiches Raster, gleiche Kacheln, gleiche Progress-Zeile.
- Buttons/Komponenten: Identisch zu 10; hier zusätzlich der Aktivzustand sichtbar
  (Navy gefüllte Kachel „Gewerbe").
- Typo: Wie 10.
- Farbe/Fläche: Wie 10. Darunter eine kleine Fußnote ca. 13 px grau mit unterstrichenem
  Inline-Link — die einzige Fußnoten-Typo der Seite.
- Abstände/Rhythmus: Ca. 60 px unter dem Quiz beginnt der Übergang zum Footer.
- Mobil: nicht separat gelesen.
- Pattern: `P-CONTACT`-nah (Wiederholung von 10 statt eigener Schluss-CTA-Sektion)

### 15 — Footer-Übergang mit gelber Kuppel [home-desktop-13-y8722.png | -]
- Anordnung: Ein visueller Scharnier-Moment: rechts unten sitzt ein großer gelber
  Halbkreis (Ø geschätzt ca. 700 px), aus dem oben drei freigestellte Produkte
  (Wärmepumpe, Speicher, Modul) herausragen. Die Navy-Footerfläche schiebt sich mit
  einer stark gerundeten Oberkante (Radius ca. 40 px links) darüber und schneidet die
  Kuppel an. Zwei Flächen überlappen — kein gerader Sektionsschnitt.
- Buttons/Komponenten: Keine.
- Typo: Nur die Fußnotenzeile ca. 13 px grau mit unterstrichenem „hier".
- Farbe/Fläche: Gelb (`#ffd233`-Familie) als reine Formfläche ohne Text — der einzige
  Ort auf der Seite, an dem die Akzentfarbe großflächig statt punktuell auftritt, und
  sie trägt bewusst keine Aktion.
- Abstände/Rhythmus: Der Übergang ist eng geschnitten; die Kuppel ragt nur ca. 60 px
  über die Footerkante.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Gelbe Kuppel als Footer-Scharnier

### 16 — Footer (global, auf allen 5 Routen identisch) [home-desktop-13-y8722.png | -]
- Anordnung: Vier Blöcke von oben: (a) „Auszeichnungen" mit 6 Siegel-Kacheln in einer
  Reihe plus rechts ein Textlink; (b) 4-Spalten-Linkraster (x-Startpunkte 64 / 336 /
  670 / 982) mit unterschiedlich langen Listen — Spalte 1 hat 11 Einträge, Spalte 3
  nur 5, die Spalten sind oben bündig und unten offen; (c) eine Schlusszeile mit
  Logo links, Rechtslinks + Sprachwahl mittig, Social-Icons rechts. Alles
  linksbündig, keine Zentrierung.
- Buttons/Komponenten: „Mehr erfahren" als reiner Textlink mit Pfeil (kein Rahmen,
  kein Fill). Zwei Badges an Listeneinträgen: gelbe Pillen (Radius ca. 999 px,
  ca. 14 px hoch) mit Navy-Text („300 €", „30+") — die einzigen echten Pillen im
  Footer. Sprachwahl als Globus-Outline-Icon + Label. Social als 6 monochrom weiße
  Glyphen in einer Reihe. Die Siegel-Kacheln sind Original-Bildmarken in Originalfarbe
  (blau, rot, gelb, cyan) auf Navy — bewusst nicht entsättigt.
- Typo: Spaltenüberschriften ca. 22 px Weight 600 weiß, Links ca. 16 px Weight 400 in
  gebrochenem Weiß, Rechtszeile ca. 14 px. Verhältnis Überschrift:Link grob 1,4:1 —
  flache Hierarchie.
- Farbe/Fläche: Navy (gemessen `#072543`) über die volle Breite, Oberkante links
  gerundet. Gelb nur in den zwei Badges und im Logo-Punkt.
- Abstände/Rhythmus: Ca. 90 px Padding oben, ca. 60 px zwischen Siegelreihe und
  Linkraster, Zeilenabstand in den Listen ca. 36 px, ca. 110 px bis zur Schlusszeile.
  Großzügig, trotz hoher Linkdichte.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Navy-Footer mit Siegelreihe und gerundeter Oberkante

### Zustände (Hover) [home-hover-00.png | home-hover-01.png]

Der Hover-Pass der Startseite besteht aus genau zwei Shots (`home-hover-00.png` und
`home-hover-01.png`); beide sind Desktop 1440. Sie zeigen zusammen drei
Hover-Komponenten. Weitere Hover-Ziele (Footer-Links, Auszeichnungs-Siegel,
Produktband-CTA) sind in keinem der beiden Shots aktiv und bleiben nicht geprüft.

- Nav-Item „Über Enpal" (Trigger): Im Ruhezustand trägt kein Nav-Item eine
  Auszeichnung (`home-desktop-00-fold.png`). Bei Hover bekommt das aktive Item eine
  gelbe Unterstreichung: ein ca. 2–3 px hoher Balken in Akzent-Gelb direkt unter dem
  Wort, ca. so breit wie Wort plus Chevron (x≈737–843), Abstand zur Grundlinie
  ca. 10 px. Die Wortfarbe selbst bleibt Navy, der Chevron dreht sich nicht sichtbar —
  die Änderung ist rein die Unterkante (`home-hover-01.png`). Das ist der einzige
  Unterstrich-Hover der Site.
- Nav-Dropdown (Mega-Panel, geöffnet durch denselben Hover): Unter der Leiste klappt
  eine große weiße Karte auf (x≈64–1376, Höhe ca. 490 px, Radius ca. 20–24 px, weicher
  Schatten nach unten), die den Seiteninhalt darunter deutlich weichzeichnet — der
  Blur liegt auf der Seite, nicht auf dem Panel. Innen dreispaltig: links eine
  Link-Liste auf hellgrauer Fläche (ca. 340 px breit), Mitte eine Vorschau-Kachel,
  rechts ein randloses Foto über die volle Panelhöhe (`home-hover-01.png`).
  Der erste Listeneintrag ist im Hover-Zustand eine vollflächige gelbe Pille
  (ca. 285×44 px, Radius ca. 8–10 px, Navy-Label) — der aktive Listenzustand färbt
  also die Fläche, nicht die Schrift. Die übrigen Einträge stehen ohne Fläche in Navy,
  ein Eintrag trägt einen dunklen `300€`-Badge als Pille. In der Mittelspalte sitzt
  ein Navy-Eyebrow-Chip („Über Enpal", dunkle Pille mit weißem Text), darunter Titel
  und zwei Zeilen Lead, darunter ein runder Pfeil-Button (Ø ca. 40 px, hellgraue
  Füllung, dunkler Pfeil) statt des sonst üblichen gelben Rechteck-CTA.
- Slider-Pfeil „zurück" im Erfolgsgeschichten-Slider: Im Ruhezustand sind beide
  runden Pfeil-Buttons weiß mit dünner grauer Kontur
  (`home-desktop-08-y5250.png`). Bei Hover füllt sich der linke Button mit einem sehr
  hellen Gelb, während Kontur, Durchmesser (Ø ca. 46 px) und Pfeilfarbe unverändert
  bleiben; der rechte Button daneben bleibt weiß und zeigt den Unterschied direkt im
  Paar (`home-hover-00.png`). Kein Schatten, keine Skalierung, kein Farbwechsel des
  Icons — Hover ist hier ausschließlich Flächenfüllung.
- Sticky-Leiste „Kostenloser Solarrechner": Im Hover-Shot steht am unteren Rand eine
  weiße schwebende Pille (ca. 438–1002 px breit, Radius ca. 999 px, deutlicher weicher
  Schatten) mit rundem Icon links, zwei Textzeilen und dem gelben CTA
  „Ersparnis berechnen" rechts (`home-hover-01.png`). Sie ist kein Hover-Effekt,
  sondern ein eigenständiges Overlay-Element über dem geblurrten Inhalt — hier
  benannt, weil sie nur in diesem Shot sichtbar ist.
- Nicht geprüft: Ob Karten, Footer-Links oder Buttons einen Schatten- oder
  Transform-Hover haben, ist aus `home-hover-00.png` und `home-hover-01.png` nicht
  ablesbar.
- Pattern: Kandidat: Gelber Unterstrich-Hover mit Mega-Panel und Blur-Hintergrund

---

## Seite: /produkt

### 17 — Dunkler Produkt-Hero [produkt-desktop-00-fold.png + produkt-desktop-02-y750.png | produkt-mobile-00-fold.png]
- Anordnung: Vollflächige dunkle Bühne unter der weißen Navbar (die Nav ist hier
  nicht transparent, sondern weiß-deckend mit harter Kante bei y≈84). Text linksbündig
  ab x≈160, vertikal etwa mittig; rechts die Produktgruppe mit goldenen Licht-Swirls,
  die über die rechte Bildkante hinauslaufen. Die Bühne ist deutlich höher als der
  Fold — sie reicht bis y≈1580 (Ende in `produkt-desktop-02-y750.png`).
- Buttons/Komponenten: Doppel-CTA nebeneinander, ca. 16 px Gap. Links Outline:
  transparente Füllung, dünne weiße Kontur, weißes Label, Radius ca. 14 px,
  ca. 148×46 px, kein Icon. Rechts gefüllt gelb, gleicher Radius und gleiche Höhe,
  Navy-Label, ebenfalls ohne Pfeil — der einzige gelbe CTA der Site ohne Pfeil-Icon.
  Der Outline steht links vom Fill, also vor der Primäraktion in Leserichtung.
- Typo: Kein Eyebrow. H1 zweizeilig ca. 62 px Weight 600 weiß, Lead vierzeilig
  ca. 21 px in gebrochenem Weiß, Zeilenlänge bewusst kurz (bricht bei ca. 560 px).
  Verhältnis H1:Lead ca. 3:1.
- Farbe/Fläche: Sehr dunkles Blaugrau (gemessen `#12202b` links, `#111f2a` im
  Textbereich) mit warmen gelben Lichtspuren und unscharfen Bokeh-Punkten als
  einzigem Akzent — das Gelb ist hier Bildlicht, nicht UI-Farbe.
- Abstände/Rhythmus: Ca. 275 px von der Nav-Kante bis zur H1, ca. 68 px H1 → Lead,
  ca. 45 px Lead → Buttons. Nach unten ca. 700 px reine Bildfläche ohne Text — der
  Hero läuft lange leer aus.
- Mobil: Hero wird kompakter und bekommt zusätzliche Elemente: unter der H1 eine
  3-zeilige Checkliste mit grünen Haken (auf Desktop nicht vorhanden), darunter das
  CHIP-Siegel als weiße Kachel, darunter ein vollbreiter gelber CTA mit Pfeil. Der
  Outline-Button „Mehr erfahren" entfällt mobil ganz — aus dem Doppel-CTA wird ein
  einzelner. Das Produktmotiv rutscht hinter die Checkliste in den rechten
  Bildbereich.
- Pattern: `P-HERO-PHOTO` (Abweichung: Render, Text links, aber zwei CTAs im Fold)

### 18 — Produkt-Split „Unabhängig vom Strompreis" [produkt-desktop-02-y750.png | produkt-mobile-06-y2110.png]
- Anordnung: Zweispaltiger Split, hier Text links / Bild rechts: linke Spalte
  (x 160–823) trägt Kopf und drei gestapelte Karten, rechte Spalte (x 845–1280) ein
  hochformatiges Produktbild mit Radius ca. 12 px. Die Bildspalte startet ca. 20 px
  tiefer als der Textkopf und läuft über die dritte Karte hinaus — die Spalten sind
  bewusst nicht gleich hoch.
- Buttons/Komponenten: Drei identische Benefit-Karten (je ca. 663×134 px, Gap 20 px),
  Fläche `#f8f8f8` gemessen, Radius ca. 12 px, ohne Kontur und ohne Schatten. Inhalt
  je Karte: ein grünes Outline-Icon zentriert oben (ca. 26 px, dünner Strich), darunter
  zentrierter Text. Auffällig: der Karteninhalt ist zentriert, obwohl die Sektion
  linksbündig aufgebaut ist. Keine Buttons in der Sektion.
- Typo: Zweizeiliger Kopf ohne Eyebrow: H2 ca. 34 px Weight 600 Navy, direkt darunter
  eine zweite Zeile ca. 32 px in Grau (`#6a7c8e`) mit niedrigerem Weight — dieselbe
  H2/Subline-Formel wie auf der Startseite, nur linksbündig. Kartentext ca. 17 px
  Weight 500 Navy.
- Farbe/Fläche: Weiß als Seitenfläche, Karten in Grau, Bild in kühlem Hellblaugrau
  (gemessen `#dae5e8`). Grün trägt ausschließlich die Icons; kein Gelb in der Sektion.
- Abstände/Rhythmus: Ca. 80 px von der Hero-Kante zum Kopf, ca. 55 px Kopf → erste
  Karte, 20 px zwischen den Karten, ca. 45 px Innenpadding je Karte. Regelmäßiger,
  fast metronomischer Rhythmus.
- Mobil: Einspaltig, Reihenfolge Kopf → Karten → Bild. Die Karten werden vollbreit
  (x 20–370) und höher, weil der Text auf zwei Zeilen bricht; Icon bleibt zentriert
  über dem Text. Nichts entfällt.
- Pattern: `P-OFFER-PAIR`-Nähe (aber drei Karten statt zwei) / Kandidat: Benefit-Stapel neben Produktbild

### 19 — Produkt-Split Wärmepumpe (gespiegelt) [produkt-desktop-04-y2250.png | produkt-mobile-06-y2110.png]
- Anordnung: Identisches Muster wie 18, gespiegelt: Bild links (x 160–595, quadratisch
  ca. 435×630 px), Text und Karten rechts (x 616–1280). Die Karten sind hier breiter
  (ca. 664 px) als in 18 — das Bild ist schmaler.
- Buttons/Komponenten: Gleiche graue Benefit-Karten mit grünen Outline-Icons, gleiche
  Maße und Radien.
- Typo: Gleiche H2/Subline-Formel, hier ca. 34/32 px.
- Farbe/Fläche: Wie 18.
- Abstände/Rhythmus: Wie 18. Zwischen den beiden Splits ca. 110 px Weiß.
- Mobil: Wie 18 gestapelt — die Spiegelung entfällt mobil, alle Splits laufen als
  Kopf → Karten → Bild bzw. Kopf → Bild → Karten je nach Quellreihenfolge.
- Pattern: Kandidat: Benefit-Stapel neben Produktbild (Spiegelung von 18)

### 20 — Produkt-Split Wallbox [produkt-desktop-04-y2250.png | -]
- Anordnung: Wieder Text links / Bild rechts. Damit ergibt sich über die Seite ein
  strenger Zickzack: links–rechts–links–rechts.
- Buttons/Komponenten: Gleiche Kartenfamilie.
- Typo: Gleiche Formel.
- Farbe/Fläche: Wie 18/19.
- Abstände/Rhythmus: Wie 18.
- Mobil: wie Desktop gestapelt.
- Pattern: Kandidat: Benefit-Stapel neben Produktbild

### 21 — Produkt-Split App [produkt-desktop-06-y3750.png | -]
- Anordnung: Bild links / Text rechts. Neu gegenüber 18–20: zwischen Subline und
  erster Karte steht eine kleine unterstrichene Quellenzeile („Quelle: F.A.Z.-Institut")
  — ein zusätzliches Typo-Element im sonst festen Muster. Die dritte Karte enthält
  kein Icon, sondern eine echte Award-Bildmarke (ca. 96×110 px) — ein Bild in einer
  sonst icon-basierten Kartenreihe.
- Buttons/Komponenten: Kartenfamilie wie 18, aber ungleich hoch: Karte 3 ist deutlich
  höher (ca. 180 px), weil sie ein Bild trägt.
- Typo: H2/Subline wie gehabt; Quellenzeile ca. 13 px, unterstrichen, Navy.
- Farbe/Fläche: Wie 18. Das Bild links ist ein App-Screenshot mit bunten
  Datenbadges (grün, gelb, blau, violett, orange) — die einzige Stelle im Produkt-
  Layout mit Mehrfarbigkeit, und sie sitzt im Motiv, nicht im UI.
- Abstände/Rhythmus: Wie 18, plus ca. 25 px für die Quellenzeile.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Benefit-Stapel neben Produktbild

### 22 — Produkt-Split Enpal.One+ mit gelbem Kreis-Badge [produkt-desktop-06-y3750.png | -]
- Anordnung: Text links / Bild rechts. Über die obere rechte Ecke des Bildblocks
  ragt ein gelber Kreis (Ø ca. 118 px) mit einem weißen Plus-Glyphen, halb außerhalb
  der Bildfläche — die einzige Sektion mit einem Überlappungs-Badge.
- Buttons/Komponenten: Kartenfamilie wie 18. Der gelbe Kreis ist Deko, kein Button
  (kein Label, kein Pfeil).
- Typo: H2 mit hochgestelltem Plus im Wortbild („Enpal.One⁺"), sonst gleiche Formel.
- Farbe/Fläche: Wie 18, plus das gelbe Kreis-Badge als einziger Gelb-Punkt der
  Split-Serie.
- Abstände/Rhythmus: Wie 18.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Benefit-Stapel neben Produktbild (Variante mit Ecken-Badge)

### 23 — Service-Split mit Einsatzfoto [produkt-desktop-08-y5250.png | -]
- Anordnung: Bild links (echtes Reportagefoto: Transporter vor Kundenhaus, ca. 435×
  630 px, Radius ca. 12 px) / Text rechts. Bricht die Render-Serie: erstes echtes
  Foto in der Split-Reihe.
- Buttons/Komponenten: Gleiche graue Benefit-Karten mit grünen Outline-Icons.
- Typo: Gleiche H2/Subline-Formel.
- Farbe/Fläche: Wie 18 — die Sektion wechselt nur das Bildgenre, nicht das Layout.
- Abstände/Rhythmus: Wie 18.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Benefit-Stapel neben Produktbild

### 24 — Zusammenfassungs-Paar „Die Energielösung von Enpal" [produkt-desktop-08-y5250.png | -]
- Anordnung: Zentrierter Kopf, darunter erstmals auf dieser Seite ein echtes
  Zweier-Grid: links eine dunkle Bildkarte (x 160–711) mit Produktkomposition und
  vier kreisrunden gelb umrandeten Produkt-Insets, rechts eine graue Textkarte
  (x 731–1280) mit Lead, Checkliste und CTA. Beide Karten gleich breit-ish, gleich
  hoch beginnend — anders als die vorherigen Splits.
- Buttons/Komponenten: In der rechten Karte eine 3-zeilige Checkliste mit grünen
  Haken (Haken links, Text zweizeilig umbrechend) und darunter ein gelber CTA
  (im Slice angeschnitten). Die Insets links sind Kreise mit ca. 3 px gelbem Ring —
  dieselbe Ringlogik wie die grünen Ringe auf der Startseiten-Karte, hier in Gelb.
- Typo: H2 ca. 40 px Navy zentriert, Subline ca. 30 px Grau zentriert. In der Karte
  ein fetter Lead ca. 17 px, Checklisten-Zeilen ca. 16 px Weight 400 in Grau, ein
  Abschlussabsatz ca. 16 px.
- Farbe/Fläche: Dunkelblau-schwarze Bildkarte gegen `#f8f8f8`-Textkarte — hell/dunkel
  direkt nebeneinander in einer Zeile, das erste Mal auf dieser Seite.
- Abstände/Rhythmus: Ca. 100 px Kopf → Karten, ca. 20 px Gap zwischen den Karten,
  ca. 45 px Innenpadding.
- Mobil: nicht separat gelesen.
- Pattern: `P-OFFER-PAIR`

### 25 — Auszeichnungs-Leiste (/produkt) [produkt-desktop-10-y6750.png | -]
- Anordnung, Komponenten, Typo, Farbe, Abstände: identisch zur Startseiten-Sektion 11
  (`home-desktop-10-y6750.png`), inklusive derselben 5 Siegel, desselben Outline-
  Buttons und desselben `#f8f8f8`-Bandes. Nur die vertikale Position unterscheidet sich.
- Mobil: nicht separat gelesen.
- Pattern: `P-PROOF-STRIP` (siehe Sektion 11)

### 26 — „So funktioniert's" — 3-Schritte-Prozess [produkt-desktop-10-y6750.png | -]
- Anordnung: Zentrierter Kopf, darunter eine zentrierte Erklärzeile, darunter ein
  zentrierter gelber CTA, darunter erst das 3-Spalten-Raster. Der CTA steht also
  mitten in der Sektion, vor dem Inhalt — ungewöhnliche Reihenfolge. Die drei Spalten
  (x-Start 160 / 542 / 925) sind gleich breit; Spalte 1 hat als einzige einen
  zusätzlichen grünen Textlink und darunter einen handgezeichneten grünen Pfeil, der
  auf den folgenden Quiz-Block zeigt — die Spalten sind also nicht symmetrisch befüllt.
- Buttons/Komponenten: Gelber CTA ca. 264×52 px, Radius ca. 14 px, Pfeil rechts —
  etwas größer als der Hero-CTA der Startseite. Die Schrittziffern sind reine Typo:
  große grüne Ziffern 1/2/3 (gemessen `#76be74`), ca. 44 px, kein Kreis, kein Badge,
  kein Verbindungsstrich zwischen den Schritten.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau, Erklärzeile ca. 17 px zentriert.
  Spaltentitel ca. 17 px Weight 600 (zentriert), Fließtext ca. 16 px (linksbündig) —
  in Spalte 1 zusätzlich eine grüne Weight-600-Zeile ca. 15 px.
- Farbe/Fläche: Weiß. Gelb im CTA, Grün in Ziffern, Link und Pfeil. Zwei Akzentfarben
  in einer Sektion, klar getrennt nach Rolle: Gelb = Aktion, Grün = Struktur.
- Abstände/Rhythmus: Ca. 90 px Kopf → Erklärzeile, ca. 50 px → CTA, ca. 85 px → Raster,
  ca. 30 px Ziffer → Titel. Luftig.
- Mobil: nicht separat gelesen.
- Pattern: `P-PROCESS-3`

### 27 — Quiz + Footer (/produkt) [produkt-desktop-10-y6750.png | -]
- Anordnung/Komponenten: Derselbe Quiz-Container wie Startseiten-Sektion 10, hier mit
  der Frage „Wofür interessieren Sie sich?" statt Haustyp — gleiche Progress-Zeile,
  gleiche Kachel-Optik. Danach der globale Footer wie Sektion 16.
- Mobil: nicht separat gelesen.
- Pattern: `P-CONTACT`-nah (siehe Sektion 10) + Footer wie Sektion 16

---

## Seite: /erfahrungen

### 28 — Editorial-Kopf [erfahrungen-desktop-00-fold.png | erfahrungen-mobile-00-fold.png]
- Anordnung: Kein Hero-Bild. Auf weißem Grund direkt unter der Navbar ein zentrierter
  zweizeiliger Textkopf, darunter mit viel Luft das erste Video als Vollcontainer-Karte
  (x 160–1280, Radius ca. 20 px). Die Seite beginnt damit als Typo-Seite, nicht als
  Bildseite — der stärkste Layout-Unterschied zu allen anderen Routen.
- Buttons/Komponenten: Keine Buttons im Fold. Im Video ein runder halbtransparenter
  Play-Kreis (Ø ca. 90 px) mittig mit weißem Dreieck.
- Typo: H1 ca. 42 px Weight 600 Navy zentriert, Subline ca. 32 px Grau (`#6a7c8e`)
  zentriert — dieselbe Kopf-Formel wie die H2/Subline-Paare der anderen Seiten, nur
  als Seitenkopf eingesetzt. Verhältnis H1:Subline ca. 1,3:1.
- Farbe/Fläche: Reines Weiß (gemessen `#ffffff`). Kein Flächenwechsel, kein Akzent
  außer dem, was im Videostandbild steckt.
- Abstände/Rhythmus: Ca. 85 px Nav → H1, ca. 55 px H1 → Subline, ca. 90 px bis zum
  Video. Sehr ruhiger Einstieg.
- Mobil: Kopf bricht zentriert auf drei Zeilen (H1 einzeilig ca. 26 px, Subline
  zweizeilig), Video wird ca. 350×195 px und behält Play-Kreis und Controls. Direkt
  darunter beginnt der Textabsatz — mobil rücken Video und Text enger zusammen.
- Pattern: Kandidat: Typografischer Editorial-Kopf ohne Hero-Bild

### 29 — Video-Testimonial-Serie [erfahrungen-desktop-00-fold.png + erfahrungen-desktop-03-y1500.png | erfahrungen-mobile-00-fold.png]
- Anordnung: Ein einziges wiederholtes Modul: Video-Karte über die volle
  Containerbreite (ca. 1120×630 px, Radius ca. 20 px), darunter ein Absatz in
  derselben Breite, dann wieder Video, dann Absatz — ein streng alternierender
  Vertikalstapel ohne Spalten, ohne Karten, ohne Flächen. In `erfahrungen-desktop-03-y1500.png` sind
  drei Instanzen dieses Rhythmus sichtbar.
- Buttons/Komponenten: Play-Kreis mittig; darunter eine native Controlbar in Weiß
  über dem Bildrand: Play-Dreieck links, `00:00 / 00:00`, dünner Scrubber über die
  Breite, Mute und Fullscreen rechts. Innerhalb des Videobildes sitzt die
  Marken-Grafik: oben links eine weiße Pille mit dem Enpal-Logo (Radius ca. 999 px),
  darunter ein bis zwei gelbe Untertitel-Blöcke (Radius ca. 12 px, ca. 90 px hoch)
  mit sehr großer Navy-Schrift. Diese gelben Blöcke sind gestaffelt (der zweite
  breiter und tiefer versetzt) — sie sind Teil des Videobilds, verhalten sich aber
  wie UI-Komponenten und tragen dieselbe Radius- und Farbsprache wie die Buttons.
- Typo: In den Videos ca. 46–52 px Weight 700 Navy in den gelben Blöcken — die größte
  Schrift der ganzen Site. Im Fließtext darunter: erster Satz fett (Weight 600,
  ca. 17 px), Rest Weight 400 ca. 17 px, linksbündig, Zeilenlänge über die volle
  Containerbreite (ca. 1080 px) — sehr lange Zeilen, kein Textmaß-Limit.
- Farbe/Fläche: Weiß durchgehend. Der Gelb-Navy-Kontrast lebt komplett im Bild; das
  Layout selbst bleibt farblos.
- Abstände/Rhythmus: Ca. 55 px Video → Absatz, ca. 55 px Absatz → nächstes Video.
  Gleichmäßiger, dichter Takt über die gesamte Seitenlänge (17 Desktop-Slices).
- Mobil: Gleicher Stapel, aber der Fließtext ist zentriert statt linksbündig und die
  fette Einleitung bricht über sechs Zeilen. Die gelben Untertitel-Blöcke im Video
  werden vom Play-Kreis teilweise überdeckt.
- Pattern: `P-TESTIMONIAL` (Videovariante)

### 30 — Auszeichnungs-Leiste (/erfahrungen) [erfahrungen-desktop-11-y7500.png | -]
- Anordnung/Komponenten/Farbe: identisch zur Startseiten-Sektion 11, hier ohne den
  „Alle ansehen"-Button im sichtbaren Ausschnitt (der Kopf liegt oberhalb des Slices).
  Gleiche 5 Siegel, gleiche Aufhellung der Randelemente, gleiches `#f8f8f8`-Band.
- Mobil: nicht separat gelesen.
- Pattern: `P-PROOF-STRIP` (siehe Sektion 11)

### 31 — Kundenkarte „Enpal in Ihrer Nachbarschaft" [erfahrungen-desktop-11-y7500.png | -]
- Anordnung: Zentrierter Kopf, darunter eine echte interaktive Karte über die volle
  Containerbreite (x 160–1280, ca. 640 px hoch, Radius ca. 12 px). Zwei Elemente
  liegen als Overlay darauf: oben links ein Suchfeld mit Button, darunter überlappend
  eine hochformatige weiße Info-Karte (ca. 300×520 px), die vom linken Kartenrand
  überlappt wird. Unter der Karte eine kleine graue Hinweiszeile.
- Buttons/Komponenten: Suchfeld als weißes Eingabefeld mit Radius ca. 8 px und
  Platzhaltertext in Grau, direkt daneben ein gelber quadratischer Such-Button
  (ca. 56×56 px, Radius ca. 8 px) mit Lupen-Outline-Icon — die einzige quadratische
  Icon-Only-Taste der Site. Die Map-Pins sind gelbe Tropfenformen mit weißem „E";
  der aktive Pin ist Navy statt Gelb (gleiche Aktiv-Logik wie die Quiz-Kacheln).
  Die Info-Karte hat oben und unten je einen Chevron-Button (auf/ab) zum Durchblättern.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau. Info-Karte: Ortsname ca. 15 px
  Weight 400, darunter die Konfiguration ca. 19 px Weight 600 zentriert.
  Hinweiszeile ca. 13 px grau.
- Farbe/Fläche: Weiß als Sektionsfläche, die Karte bringt Grün- und Grautöne des
  Kartenmaterials mit. Gelb trägt hier Suche und Pins — Akzentfarbe erstmals als
  Datenmarkierung statt als Aktion.
- Abstände/Rhythmus: Ca. 80 px Kopf → Karte, ca. 20 px Suchfeld-Offset vom Kartenrand.
- Mobil: nicht separat gelesen.
- Pattern: `P-MAP`

### 32 — „Wir sind für Sie da" [erfahrungen-desktop-11-y7500.png | -]
- Anordnung: Zentrierter Kopf, darunter eine breite hellgraue Karte (x 160–1280) mit
  zentriertem grünem Outline-Icon oben. Im gelesenen Slice ist nur der Kartenkopf
  sichtbar — der Rest liegt unterhalb.
- Buttons/Komponenten: Karte in `#f8f8f8` mit Radius ca. 12 px, grünes Outline-Icon
  ca. 30 px zentriert. Weitere Inhalte nicht im Slice.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau.
- Farbe/Fläche: Weiß mit grauer Karte, grüner Icon-Akzent.
- Abstände/Rhythmus: Ca. 85 px Kopf → Karte.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Zentrierte Service-Karte

---

## Seite: /ueber-uns

### 33 — Zentrierter Textkopf + Foto/Text-Split [ueber-uns-desktop-00-fold.png | ueber-uns-mobile-00-fold.png]
- Anordnung: Wie /erfahrungen kein Hero-Bild, sondern zentrierter Textkopf auf Weiß.
  Direkt darunter ein asymmetrischer Zweier: links ein hochformatiges Foto
  (x 273–522, also nur ca. 250 px breit — deutlich schmaler als die üblichen
  Bildspalten), rechts eine breite graue Textkarte (x 542–1167). Der Container ist
  hier nicht 160–1280, sondern schmaler und optisch zentriert.
- Buttons/Komponenten: Keine Buttons im Fold. Die Textkarte ist `#f8f8f8` mit Radius
  ca. 12 px, ohne Kontur, ohne Icon — reiner Textcontainer. Das Foto hat denselben
  Radius.
- Typo: H1 ca. 42 px Weight 600 Navy zentriert, Subline ca. 32 px Grau zentriert
  (identische Formel wie /erfahrungen). In der Karte: drei Absätze ca. 17 px Weight 400
  in Grau (`#6a7c8e` gemessen) mit ca. 27 px Zeilenabstand und je ca. 27 px
  Absatzabstand — Fließtext ohne Zwischenüberschriften.
- Farbe/Fläche: Weiß, eine graue Karte. Kein Akzent im Fold — die einzige Seite ohne
  Gelb im ersten Bildschirm.
- Abstände/Rhythmus: Ca. 85 px Nav → H1, ca. 55 px → Subline, ca. 65 px → Split,
  ca. 50 px Innenpadding der Karte.
- Mobil: Reihenfolge Kopf → Foto → Textkarte, alles vollbreit und zentriert gesetzt.
  Das Foto wird querformatiger (ca. 350×265 px), der Kartentext wechselt von
  linksbündig auf zentriert.
- Pattern: Kandidat: Typografischer Editorial-Kopf ohne Hero-Bild (wie Sektion 28)

### 34 — Stat-Karten-Trio [ueber-uns-desktop-00-fold.png + ueber-uns-desktop-02-y750.png | -]
- Anordnung: Drei gleich breite Karten nebeneinander (x-Start 275 / 577 / 879, je
  ca. 285 px, Gap ca. 16 px, Höhe ca. 175 px), oben und unten bündig — das erste echte
  gleichmäßige Drittel-Grid der Site. Inhalt je Karte zweistufig zentriert bzw.
  linksbündig gemischt: Zahl zentriert, Label linksbündig ab Kartenrand.
- Buttons/Komponenten: Karten in `#f8f8f8`, Radius ca. 12 px, kein Rahmen, kein
  Schatten, kein Icon — nur Zahl und Label.
- Typo: Die Zahl ist die dominante Typo: ca. 44 px Weight 700 in Grün (gemessen
  `#76be74`), Label darunter ca. 17 px Weight 400 in Navy, zweizeilig umbrechend.
  Verhältnis Zahl:Label ca. 2,6:1. Bemerkenswert: die Zahl ist grün, nicht navy —
  Grün wird hier zur Zahlenfarbe.
- Farbe/Fläche: Weiß mit drei grauen Karten. Grün als einziger Akzent.
- Abstände/Rhythmus: Ca. 55 px Split → Karten, ca. 40 px Innenpadding oben.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Stat-Karten-Trio mit grüner Zahl

### 35 — „Die Enpal Geschichte" — Intro [ueber-uns-desktop-02-y750.png | -]
- Anordnung: Reiner Textblock, vollständig zentriert: H2, Subline, dann zwei zentrierte
  Absätze mit begrenztem Textmaß (ca. 890 px breit, x 275–1165). Keine Karte, kein
  Bild, keine Spalte.
- Buttons/Komponenten: Keine.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau, Fließtext ca. 17 px Weight 400 in
  Grau, zentriert und mit ca. 27 px Zeilenabstand. Zentrierter mehrzeiliger Fließtext
  ist auf der Site sonst selten — hier bewusst als Editorial-Geste.
- Farbe/Fläche: Weiß, kein Akzent.
- Abstände/Rhythmus: Ca. 145 px Karten → H2, ca. 70 px bis zum ersten Absatz,
  ca. 55 px zwischen den Absätzen, ca. 70 px bis zur nächsten Sektion.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Zentrierter Editorial-Textblock

### 36 — Navy-Zeitstrahl [ueber-uns-desktop-02-y750.png | -]
- Anordnung: Vollbreites dunkles Band (0–1440, ca. 190 px hoch, ohne Radius und ohne
  Container-Begrenzung) mit einer horizontalen Linie über die volle Breite. Fünf
  Jahresmarken sitzen auf der Linie, das aktive Jahr steht mittig und deutlich größer
  über einem gefüllten Punkt; die vier inaktiven Jahre sind kleiner und sitzen über
  Ring-Punkten. Die Linie ist nicht exakt gerade, sondern leicht geschwungen —
  handgezeichneter Charakter.
- Buttons/Komponenten: Unter dem Band, auf Weiß, zwei runde Outline-Pfeile
  (Ø ca. 46 px) mittig — dieselbe Slider-Navigation wie Startseiten-Sektion 09.
  Punkte: aktiv = gefüllter gelber Kreis (Ø ca. 18 px, gemessen `#ffd233`), inaktiv =
  gelber Ring (Ø ca. 12 px, ungefüllt).
- Typo: Aktives Jahr ca. 56 px Weight 700 in Gelb, inaktive Jahre ca. 22 px Weight 600
  ebenfalls Gelb. Verhältnis aktiv:inaktiv ca. 2,5:1 — der Zustandswechsel läuft über
  Größe, nicht über Farbe.
- Farbe/Fläche: Navy (gemessen `#072543`) als einzige dunkle Fläche der Seite, Gelb
  als einzige Farbe darauf. Kein Weiß, kein Grün.
- Abstände/Rhythmus: Ca. 45 px Bandpadding oben, Linie bei ca. 60 % Bandhöhe,
  ca. 35 px unter dem Band die Pfeile.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Navy-Zeitstrahl mit gelben Jahresmarken

### 37 — Zeitstrahl-Detail [ueber-uns-desktop-02-y750.png | -]
- Anordnung: Zweispaltiger Split direkt unter der Slider-Navigation: Text links
  (x 160–800), Foto rechts (x 838–1280, ca. 440×250 px). Der Textblock ist vertikal
  am Bild ausgerichtet.
- Buttons/Komponenten: Keine. Foto mit Radius ca. 12 px.
- Typo: H3 ca. 30 px Weight 600 Navy (kleiner als die H2-Ebene der Seite), Fließtext
  ca. 16 px Weight 400 Grau, linksbündig, Zeilenlänge ca. 640 px.
- Farbe/Fläche: Weiß, kein Akzent.
- Abstände/Rhythmus: Ca. 60 px Pfeile → Split, ca. 40 px H3 → Text.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Zeitstrahl-Detailsplit

### 38 — „Enpal kann mehr" — alternierende Karten-Splits [ueber-uns-desktop-04-y2250.png | -]
- Anordnung: Vier gestapelte Zweier-Zeilen, die exakt alternieren: Foto links / graue
  Textkarte rechts, dann Textkarte links / Foto rechts, usw. Die Bildspalte ist immer
  ca. 296 px breit, die Kartenspalte ca. 800 px — ein festes 1:2,7-Verhältnis. Bild
  und Karte sind gleich hoch und schließen bündig ab; zwischen den Zeilen ca. 22 px.
  Die Bilder überlappen nichts, sie stoßen direkt an die Karte.
- Buttons/Komponenten: Textkarten in `#f8f8f8` (gemessen), Radius ca. 12 px, ohne
  Kontur. Keine Buttons — die Aktion ist jeweils ein unterstrichener Inline-Textlink
  in Blau am Absatzende. Das ist die einzige Stelle der Site, an der ein klassischer
  blauer Unterstrich-Link statt einer Marken-Taste steht.
- Typo: Dreistufig je Karte: grüner Eyebrow ca. 17 px Weight 400 (gemessen `#7bc079`),
  H3 ca. 30 px Weight 600 Navy, Fließtext ca. 16 px Weight 400 Grau. Verhältnis
  Eyebrow:H3 ca. 1:1,8. Der grüne Eyebrow ist das wiederkehrende Erkennungsmerkmal
  dieser Sektion.
- Farbe/Fläche: Weiß mit grauen Karten; Grün trägt die Eyebrows, Blau die Links.
  Kein Gelb in der ganzen Sektion.
- Abstände/Rhythmus: Innenpadding der Karten ca. 55 px links / 45 px oben, ca. 45 px
  Eyebrow → H3, ca. 30 px H3 → Text. Sehr regelmäßig, fast tabellarisch.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Alternierender Foto/Karten-Split mit grünem Eyebrow

### 39 — Auszeichnungs-Leiste (/ueber-uns) [ueber-uns-desktop-08-y5250.png | -]
- Anordnung/Komponenten/Farbe: identisch zu Sektion 11 inklusive „Alle ansehen"-
  Outline-Button und den 5 Siegeln auf `#f8f8f8`.
- Mobil: nicht separat gelesen.
- Pattern: `P-PROOF-STRIP` (siehe Sektion 11)

### 40 — „Gründer und Management" — Team-Trio [ueber-uns-desktop-08-y5250.png | -]
- Anordnung: Zentrierter Kopf, darunter ein zentrierter gelber CTA, darunter drei
  gleich breite Porträtkarten (x-Start 159 / 540 / 921, je ca. 360×455 px, Gap
  ca. 22 px). Unter jedem Bild linksbündig Name und Rolle — Bildraster zentriert,
  Bildunterschriften linksbündig.
- Buttons/Komponenten: Gelber CTA ca. 224×46 px, Radius ca. 14 px, Navy-Label, Pfeil
  rechts — hier als Sekundärziel („Mehr über das Team"), aber in derselben Primärform
  wie die Funnel-CTAs. Porträts mit Radius ca. 12 px, einheitlicher Betonwand-
  Hintergrund und identischem Crop (Brustbild, Blick in die Kamera) — bewusst
  vereinheitlichte Bildregie.
- Typo: H2 ca. 40 px Navy, Subline ca. 30 px Grau. Name ca. 19 px Weight 600 Navy,
  Rolle ca. 17 px Weight 400 Grau.
- Farbe/Fläche: Weiß. Gelb im CTA, sonst neutral. Die Porträts bringen einheitliches
  Grau mit — das Raster wirkt dadurch fast wie eine Fläche.
- Abstände/Rhythmus: Ca. 90 px Kopf → CTA, ca. 65 px CTA → Raster, ca. 25 px Bild →
  Name.
- Mobil: nicht separat gelesen.
- Pattern: `P-TEAM`

### 41 — Schluss-CTA „Größte Energiebewegung Europas" + Video [ueber-uns-desktop-10-y6750.png | -]
- Anordnung: Zentrierter zweizeiliger Kopf, darunter zentrierter gelber CTA, darunter
  eine Video-Karte über die volle Containerbreite (ca. 1120×630 px, Radius ca. 20 px).
  Danach direkt der Footer-Übergang mit den freigestellten Produkten und der Navy-
  Kante — hier ohne die gelbe Kuppel der Startseite.
- Buttons/Komponenten: Gelber CTA ca. 260×46 px mit Pfeil. Video mit Play-Kreis und
  vollständiger Controlbar (`00:00 / 03:28`). Im Videostandbild dieselbe Marken-Grafik
  wie auf /erfahrungen: weiße Logo-Pille oben links und ein großer gelber Farbkeil
  mit Navy-Schrift, der diagonal in die rechte Bildhälfte läuft.
- Typo: H2 zweizeilig ca. 42 px Weight 600 Navy zentriert, keine Subline — die einzige
  Sektion mit H2 ohne graue Zweitzeile.
- Farbe/Fläche: Weiß. Gelb im CTA und großflächig im Videostandbild.
- Abstände/Rhythmus: Ca. 65 px Kopf → CTA, ca. 55 px CTA → Video, ca. 175 px Video →
  Footer-Kante.
- Mobil: nicht separat gelesen.
- Pattern: `P-CTA-END`

---

## Seite: /photovoltaik/solaranlage-kosten

### 42 — Magazin-Artikelkopf [photovoltaik__solaranlage-kosten-desktop-00-fold.png | photovoltaik__solaranlage-kosten-mobile-00-fold.png]
- Anordnung: Zweispaltig asymmetrisch und komplett linksbündig — das erste Layout der
  Site ohne zentrierten Kopf. Links (x 64–830): Breadcrumb, H1, Autorenzeile, Meta-
  Zeile. Rechts oben eine gelbe Verlaufsform (x 1060–1375, ca. 250 px hoch), die an
  der rechten Bildschirmkante klebt und links mit einer konkaven Rundung
  ausgeschnitten ist — eine Formfläche, kein Bild. Darunter links die Info-Box,
  rechts der TOC-Schalter (x 1124–1375) — die rechte Spalte ist eine schmale
  Sidebar-Zone.
- Buttons/Komponenten: TOC als geschlossenes Select-artiges Feld: weiße Füllung,
  hellblaue dünne Kontur, Radius ca. 8 px, ca. 250×48 px, Label links, Chevron-nach-
  unten rechts. Info-Box: hellblaue Fläche (gemessen `#ebf2ff`), Radius ca. 12 px, mit
  einer kräftigeren blauen Akzentkante links (ca. 4 px) — die einzige Komponente der
  Site mit einer farbigen Seitenkante. Autor-Avatar als Kreis (Ø ca. 34 px), Autorname
  als unterstrichener Link. Breadcrumb mit Chevron-Trennern, aktives Glied in Grau
  ohne Link.
- Typo: H1 zweizeilig ca. 34 px Weight 600 Navy (gemessen `#072543`) — deutlich
  kleiner als die H1 der Marketingseiten (dort 42–68 px), weil sie hier Artikeltitel
  ist. Labels „Autor:", „Aktualisiert:", „Lesezeit:" fett ca. 16 px, Werte Weight 400.
  Info-Box-Titel ca. 21 px Weight 600, Bullets ca. 17 px mit ca. 26 px Zeilenabstand.
- Farbe/Fläche: Weiß, ein hellblauer Kasten, eine gelbe Formfläche (gemessen
  `#fac74d`, also ein wärmerer, orangestichiger Gelbton als das CTA-Gelb `#ffd233`).
  Die gelbe Fläche trägt Text („Enpal Magazin"), aber keine Aktion.
- Abstände/Rhythmus: Ca. 60 px Nav → Breadcrumb, ca. 25 px → H1, ca. 40 px → Autor,
  ca. 30 px → Meta, ca. 60 px → Info-Box. Deutlich dichter getaktet als die
  Marketingseiten — Artikelrhythmus statt Sektionsrhythmus.
- Mobil: Einspaltig, alles linksbündig; die gelbe Magazin-Form entfällt komplett. Die
  Meta-Zeile bricht auf zwei Zeilen (Aktualisiert / Lesezeit untereinander). Der TOC
  wird zum schwebenden FAB unten rechts: gelber Kreis (Ø ca. 62 px, gemessen
  `#ffb000` — der wärmere Gelbton) mit weißem Listen-Icon, fix über dem Inhalt.
- Pattern: Kandidat: Magazin-Artikelkopf mit Autor, Meta und Info-Box

### 43 — Artikelkörper mit Sidebar-CTA [photovoltaik__solaranlage-kosten-desktop-02-y750.png | -]
- Anordnung: Der Fließtext bleibt in der linken Spalte (x 64–830, Textmaß ca. 765 px),
  die rechte Spalte trägt nur den TOC oben und — fixiert unten rechts — ein
  Google-Bewertungswidget mit CTA. Der Artikel nutzt also nur gut die Hälfte der
  Breite; rechts steht viel Leere.
- Buttons/Komponenten: Sticky-Widget rechts unten: eine Zeile mit echtem Google-G,
  4,5 gelben Sternen und zweizeiliger Bewertungsangabe, darunter ein gelber CTA
  (ca. 210×50 px, Radius ca. 14 px, Navy-Label, Pfeil rechts) — dieselbe Tastenform
  wie auf allen anderen Seiten, hier als schwebendes Element statt im Fluss.
  Zwischenüberschriften tragen links einen kurzen vertikalen Akzentstrich (ca. 4 px
  breit, gemessen `#ffb000`) — ein Gelb-Marker als Gliederungszeichen. Aufklapp-Zeilen
  („Was kostet eine Solaranlage ohne Speicher?") als Akkordeon mit Chevron rechts und
  1-px-Trennlinie, identisch zum FAQ-Muster der Startseite. Artikelbild mit Radius
  ca. 8 px über die Textbreite.
- Typo: Fließtext ca. 17 px Weight 400 mit ca. 25 px Zeilenabstand, Inline-Links in
  Blau ohne Unterstrich, ein kursiver Hinweisabsatz. H2 im Artikel ca. 21 px Weight 600
  Navy — kleiner als der Fließtext der Marketingseiten. Die Akkordeon-Fragen sind
  ca. 19 px Weight 600.
- Farbe/Fläche: Weiß durchgehend, keine Sektionsflächen. Gelb ausschließlich in
  Akzentstrich, Sternen und CTA; Blau in den Links.
- Abstände/Rhythmus: Absatzabstand ca. 20 px, ca. 45 px vor Zwischenüberschriften,
  Akkordeon-Zeilenhöhe ca. 87 px. Dichter Lesetakt.
- Mobil: nicht separat gelesen (Muster: einspaltig, TOC als FAB, siehe Sektion 42).
- Pattern: Kandidat: Artikelkörper mit sticky Trust-CTA

### 44 — Verwandte-Artikel-Liste [photovoltaik__solaranlage-kosten-desktop-12-y8250.png | -]
- Anordnung: Eine vertikale Liste in der Textspalte: je Zeile links ein Thumbnail
  (ca. 196×115 px, Radius ca. 8 px), rechts der Titel, vertikal zentriert; darunter
  eine 1-px-Trennlinie über die Spaltenbreite. Keine Karten, kein Grid — bewusst als
  Liste statt als Kachelraster gebaut.
- Buttons/Komponenten: Keine Buttons; der ganze Zeilenbereich ist der Link. Kein
  Chevron, kein Pfeil.
- Typo: Titel ca. 19 px Weight 600 Navy, einzeilig.
- Farbe/Fläche: Weiß, Trennlinien in hellem Grau.
- Abstände/Rhythmus: Zeilenhöhe ca. 180 px, ca. 28 px zwischen Thumbnail und Titel.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Thumbnail-Liste verwandter Artikel

### 45 — Datenanalyse mit Balken-Tabelle [photovoltaik__solaranlage-kosten-desktop-12-y8250.png + photovoltaik__solaranlage-kosten-desktop-17-y12000.png | -]
- Anordnung: Ein eigener Analyse-Block innerhalb der Textspalte: Überschrift, Absätze,
  eine Zwischenüberschrift mit gelbem Akzentstrich, dann die Tabelle. Die Tabelle ist
  ca. 730 px breit und vierspaltig: Bundesland (linksbündig), zwei Zahlenspalten
  (rechtsbündig), eine Balkenspalte. Rechts neben der Tabelle, außerhalb, eine
  vertikale Reihe von drei Social-Icons (Facebook, LinkedIn, X) — Share-Leiste am
  Rand statt über dem Inhalt.
- Buttons/Komponenten: Über der Tabelle ein Suchfeld („Suche in Tabelle") mit Lupen-
  Icon links, Radius ca. 6 px, dünne Kontur — die Tabelle ist filterbar. Der
  Tabellenkopf ist ein durchgehender gelber Balken (gemessen `#f8b004`) mit Navy-Text
  ca. 13 px Weight 600 und einem kleinen Sortier-Dreieck in der aktiven Spalte. In der
  Balkenspalte je Zeile ein Inline-Balken: gelb gefüllter Anteil (`#f8b004`) auf
  hellgrauer Restspur (`#e8e8e8`), Wert rechtsbündig im gefüllten Teil — Datenvis
  direkt in der Tabellenzelle statt als separates Chart. Zeilen alternierend weiß /
  sehr hellgrau.
- Typo: Analyse-Überschrift zweizeilig ca. 21 px Weight 600 Navy, Fließtext ca. 17 px.
  Tabellen-Zellen ca. 14 px Weight 400, Balkenwerte ca. 13 px Weight 600.
  Quellenzeile darunter ca. 11 px kursiv grau mit mehreren blauen Inline-Links
  (Daten herunterladen, Einbetten, Datawrapper) — die kleinste Typo der Site.
- Farbe/Fläche: Weiß. Gelb ist hier durchgehend Datenfarbe (Kopfzeile plus alle
  Balken) — die größte zusammenhängende Gelbfläche außerhalb der Footer-Kuppel, und
  sie trägt keine einzige Aktion.
- Abstände/Rhythmus: Tabellenzeilenhöhe ca. 37 px, sehr dicht; darüber und darunter
  je ca. 45 px Luft. Der Block ist der dichteste der ganzen Site.
- Mobil: nicht separat gelesen.
- Pattern: Kandidat: Filterbare Datentabelle mit Inline-Balken

### 46 — „Was macht Enpal?" — Info-Box am Artikelende [photovoltaik__solaranlage-kosten-desktop-17-y12000.png | -]
- Anordnung: Eine breite hellblaue Box über die Textspalte (x 64–830, ca. 570 px hoch)
  mit Titel, drei Absätzen, einer Bullet-Liste und einer abschließenden Link-Zeile.
  Alles linksbündig mit gleichmäßigem Innenabstand.
- Buttons/Komponenten: Kein Button — der Abschluss ist ein blauer Textlink mit
  vorangestelltem `>>`. Bullets als klassische Punkte, kein Icon, kein Haken. Die Box
  hat Radius ca. 12 px und dieselbe hellblaue Fläche (`#ebf2ff`) wie die
  „Das Wichtigste in Kürze"-Box im Kopf — die Klammer um den Artikel.
- Typo: Box-Titel ca. 21 px Weight 600 Navy, Absätze ca. 17 px Weight 400, Bullets
  ca. 17 px. Keine grafische Hierarchie außer Weight.
- Farbe/Fläche: Hellblau als einzige Fläche, Blau in den Links. Kein Gelb, kein Grün.
- Abstände/Rhythmus: Innenpadding ca. 25 px, Absatzabstand ca. 20 px, Bullet-Abstand
  ca. 12 px. Ruhig und textnah.
- Mobil: nicht separat gelesen.
- Pattern: `P-CTA-MID`-Nähe (ruhige Fläche, Aktion nur als Link) / Kandidat: Hellblaue Info-Box als Artikelklammer

---

## Nicht dokumentiert / offen

- Hover-Zustände, geöffnete FAQ- und Akkordeon-Panels sowie die Dropdown-Menüs der
  Navbar sind in keinem gelesenen Shot geöffnet — nur der Quiz-Aktivzustand ist über
  `home-desktop-12-y8250.png` belegt.
- Die Click-Serien `home-desktop-click-y4500-*`, `home-desktop-click-y5250-*` und
  `home-desktop-click-y8722-00-Choose_language.png` wurden für diesen Atlas nicht als
  Bilder gelesen; die Quiz- und Slider-Beschreibungen stützen sich auf die
  Scroll-Slices.
- Mobile Slices wurden nur dort gelesen, wo sie sich vom Desktop unterscheiden
  (Folds aller Seiten, `home-mobile-14-y5486.png`, `produkt-mobile-06-y2110.png`).
  Bei den mit „nicht separat gelesen" markierten Sektionen ist das Mobilverhalten
  nicht geprüft.
- Kein Cookie-Banner und kein sonstiges Overlay in irgendeinem gelesenen Shot.

## Seite: /stromspeicher

### 47 — Dunkler Bokeh-Hero mit Doppel-CTA [stromspeicher-desktop-00-fold.png | -]
- Anordnung: Vollflächige dunkle Bühne über die ganze Fold-Breite unter der weißen
  Nav-Leiste. Links ab x≈160 der Textblock (H1 auf y≈360–480, Lead, CTA-Paar auf
  y≈658–706), rechts das freigestellte Produkt (Speicherturm, x≈835–1185) auf
  gespiegelter Fläche. Anders als der Startseiten-Hero (Sektion 02) ist der Text hier
  linksbündig und das Motiv ein Studio-Render statt einer Hausszene.
- Buttons/Komponenten: Zwei CTAs nebeneinander mit ca. 14 px Abstand. Links ein
  Outline-Button (transparente Füllung, weiße 1-px-Kontur, weißes Label, ca. 148×44 px,
  Radius ca. 10–12 px), rechts der gefüllte gelbe Primär-CTA (ca. 194×44 px, Navy-Label,
  Radius ca. 10–12 px) — hier ohne Pfeil-Icon, anders als der Hero-CTA der Startseite.
  Die Hierarchie ist damit erstmals zweistufig im Fold: Sekundär links, Primär rechts.
- Typo: H1 zweizeilig ca. 56 px Weight 600 weiß, Lead vierzeilig ca. 19 px in
  gebrochenem Weiß mit ca. 31 px Zeilenabstand, CTA-Label ca. 15 px Weight 600.
  Verhältnis H1:Lead grob 3:1. Kein Eyebrow.
- Farbe/Fläche: Sehr dunkles Blaugrau als Grundfläche mit unscharfen gelben und grauen
  Lichtpunkten (Bokeh), die nach oben rechts hin dichter werden; im unteren Bilddrittel
  ein Teppich aus liegenden gelben Strichen als Boden-Andeutung. Gelb tritt zweimal auf:
  als Streulicht im Motiv und als CTA — der Button hebt sich trotzdem ab, weil er die
  einzige gesättigte Fläche ist.
- Abstände/Rhythmus: Ca. 275 px von der Nav-Unterkante bis zur H1, ca. 45 px H1 → Lead,
  ca. 40 px Lead → CTA-Paar. Der Fold läuft unten offen in die nächste Sektion aus,
  ohne Abschlusskante.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Abweichung: Studio-Render mit Bokeh, Text links, CTA-Paar
  statt Einzel-CTA)

### 48 — Quiz-Einstieg „Lohnt sich eine Solaranlage mit Speicher für Sie?" [stromspeicher-desktop-02-y750.png | -]
- Anordnung: Zentrierte H2 über einer breiten hellgrauen Quiz-Fläche (x 255–1185,
  ca. 580 px hoch). Innen oben eine Fortschrittsleiste, darunter linksbündig die Frage,
  dann drei gleich breite Auswahlkarten nebeneinander (je ca. 270×215 px, ca. 20 px
  Spaltenabstand). Unter den Karten bleibt ca. 250 px leere Fläche stehen — der Kasten
  ist auf die höchste Folgefrage dimensioniert und schrumpft nicht.
- Buttons/Komponenten: Auswahlkarten als weiße Kacheln mit sehr weichem Schatten,
  Radius ca. 6–8 px, je ein farbiges Strich-Icon oben mittig (Solarmodul mit gelber
  Sonne / Wärmepumpe mit gelbem Lüfterrad / beides kombiniert) und ein Navy-Label
  ca. 15 px Weight 600 darunter — Icon über Text, nicht daneben. Kein Button, keine
  Kontur, kein Radio; die ganze Kachel ist das Ziel. Die Fortschrittsleiste ist eine
  ca. 3 px dünne Spur in Hellgrün mit gefülltem Anteil links und einem grünen
  Kreis-Haken als Kopfpunkt, darüber das Label „10% geschafft" ca. 11 px.
- Typo: H2 ca. 34 px Weight 600 Navy zentriert, Frage ca. 19 px Weight 600 linksbündig,
  Kachel-Labels ca. 15 px. Auffällig: die Frage steht linksbündig im zentrierten Block.
- Farbe/Fläche: Quiz-Fläche in Karten-/Strip-Grau, Karten in Weiß — Fläche-auf-Fläche
  statt Kontur. Grün ist hier Fortschrittsfarbe, Gelb steckt nur in den Icons; im
  ganzen Block gibt es keinen gefüllten Button.
- Abstände/Rhythmus: Ca. 115 px Hero-Unterkante → H2, ca. 50 px H2 → Kasten,
  ca. 35 px Innenabstand oben, ca. 36 px Frage → Karten.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Quiz-Kachelwahl mit Fortschrittsleiste

### 49 — Alternierende Themen-Splits mit Kreis-Badge [stromspeicher-desktop-05-y3000.png | -]
- Anordnung: Eine Serie gleich gebauter Split-Blöcke, im Wechsel Text links / Bild
  rechts und Bild links / Text rechts. Je Block: zweizeilige Überschrift (Zeile 1 Navy,
  Zeile 2 Grau), darunter ein hellgrauer Textkasten (Radius ca. 12 px), gegenüber ein
  Bild mit Radius ca. 8 px. Diagonal an der äußeren oberen Bildecke klebt ein
  Kreis-Badge, das halb über den Bildrand ragt.
- Buttons/Komponenten: Kreis-Badge als Navy-Scheibe (Ø ca. 118 px) mit zentriertem
  weißen Text in drei Zeilen und einem kleinen grünen Kreis-Haken (Ø ca. 22 px) oben
  rechts auf dem Rand — das einzige Element der Site, das ein Icon auf dem Kreisrand
  sitzen lässt. Kein Button in diesen Blöcken; Aktionen fehlen komplett, der Fluss
  bleibt CTA-frei bis zur nächsten Sektion.
- Typo: Überschriften ca. 30 px Weight 600, wobei die zweite Zeile in Sekundärgrau
  denselben Grad hat — Hierarchie über Farbe statt über Größe. Fließtext im Kasten
  ca. 16–17 px Weight 400, Badge-Text ca. 11–13 px mit einer größeren Kennzahlzeile
  (ca. 19 px Weight 600).
- Farbe/Fläche: Weißer Seitengrund, Textkästen in Karten-/Strip-Grau, Badges in Navy,
  Haken in Grün. Kein Gelb in der ganzen Sektionsserie.
- Abstände/Rhythmus: Blockhöhe ca. 350 px, ca. 130 px Luft zwischen zwei Splits,
  ca. 22 px Überschrift → Kasten, ca. 40 px Innenpadding im Kasten. Sehr gleichmäßiger
  Takt, nur die Seitenwahl wechselt.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-SPLIT-ALT` (Abweichung: Kreis-Badge über der Bildkante, Textkasten statt
  freier Fließtext)

### 50 — „So funktioniert's" mit handgezeichnetem Pfeil [stromspeicher-desktop-08-y5250.png | -]
- Anordnung: Zentrierter Kopf (Titel, graue Unterzeile, einzeiliger Lead), darunter ein
  gelber CTA mittig, darunter das dreispaltige Schrittraster (Spaltenbreite ca. 340 px).
  Jede Spalte: große Ziffer oben, zweizeilige Überschrift, Absatz. Unter Spalte 1 steht
  zusätzlich eine grüne Link-Zeile und darunter ein handgezeichneter grüner
  Schwungpfeil, der nach unten links auf das folgende Quiz zeigt.
- Buttons/Komponenten: Gelber CTA ca. 264×46 px, Radius ca. 12–14 px, Navy-Label mit
  Pfeil-Icon rechts. Der Schwungpfeil ist eine Illustration, kein Icon-Set-Element:
  ca. 45 px breit, ca. 55 px hoch, ungleichmäßige Strichstärke, Pfeilspitze offen —
  das einzige handgezeichnete Element der Site. Ziffern sind reine Typo, keine Kreise
  oder Kacheln.
- Typo: Titel ca. 34 px Weight 600 Navy, Unterzeile ca. 30 px in Sekundärgrau, Lead
  ca. 17 px. Ziffern ca. 40 px Weight 700 in Grün. Schrittüberschriften ca. 17 px
  Weight 600, zentriert über linksbündigem Fließtext ca. 16 px — eine Mischsatzachse
  innerhalb derselben Spalte.
- Farbe/Fläche: Weiß, keine Sektionsfläche. Grün trägt Ziffern, Link und Pfeil; Gelb
  nur den CTA. Der Block ist damit der einzige mit zwei gleichrangigen Akzentfarben.
- Abstände/Rhythmus: Ca. 55 px Titel → Lead, ca. 55 px Lead → CTA, ca. 90 px CTA →
  Ziffernreihe, ca. 25 px Ziffer → Überschrift. Spaltenabstand ca. 40 px.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-STEPS-3`

### 51 — Themen-Tabs über Ratgeberstrecke [stromspeicher-desktop-11-y7500.png | -]
- Anordnung: Zentrierte H2, darunter ein Lead über die volle Container-Breite
  (x 160–1280) und darunter eine zentrierte Reihe von drei Tab-Pillen. Die Tab-Reihe
  ist sticky: sie steht auf jedem folgenden Slice unter der Nav
  (`stromspeicher-desktop-14-y9750.png`, `stromspeicher-desktop-17-y12000.png`,
  `stromspeicher-desktop-20-y13821.png`) an derselben y-Position.
- Buttons/Komponenten: Tabs als echte Pillen (Radius ca. 999 px, Höhe ca. 44 px). Der
  aktive Tab ist navy-gefüllt mit weißem Label, die inaktiven haben weiße Füllung mit
  dünner Navy-Kontur und Navy-Label. Breite folgt dem Text (ca. 108 / 190 / 205 px),
  Abstand ca. 14 px. Das ist die einzige Stelle der Site, an der Navy als Button-Füllung
  auftritt statt Gelb — Navigation wird bewusst nicht in Aktionsgelb kodiert.
- Typo: H2 ca. 36 px Weight 600 Navy zentriert, Lead ca. 17 px mit blauen Inline-Links
  ohne Unterstrich, Tab-Labels ca. 15 px Weight 600.
- Farbe/Fläche: Weiß. Navy als Aktivfarbe, Blau nur in Links.
- Abstände/Rhythmus: Ca. 90 px FAQ-Block → H2, ca. 40 px H2 → Lead, ca. 45 px Lead →
  Tabs, ca. 70 px Tabs → Inhalt.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Sticky-Pillen-Tabs als Ratgeber-Navigation

### 52 — Ratgeberkörper mit rechtem Inhaltsverzeichnis [stromspeicher-desktop-14-y9750.png | -]
- Anordnung: Zweispaltig asymmetrisch: Textspalte links (x 160–925, Textmaß ca. 765 px),
  rechts ab x≈1058 ein schmales Inhaltsverzeichnis (ca. 215 px breit). Beide Spalten
  beginnen auf derselben Oberkante; das Verzeichnis ist sticky und bleibt über mehrere
  Slices stehen (`stromspeicher-desktop-17-y12000.png`).
- Buttons/Komponenten: TOC ohne Kasten und ohne Kontur — nur eine Liste. Der aktive
  Eintrag trägt links einen ca. 3 px breiten gelben Vertikalstrich, steht in Navy
  Weight 600 und ist eingerückt; inaktive Einträge stehen in hellem Grau ohne Strich,
  die untersten laufen zusätzlich in eine Transparenz aus — ein Fade als Längenhinweis
  statt Scrollbalken (`stromspeicher-desktop-14-y9750.png`). Zwischenüberschriften im
  Text tragen denselben gelben Strich links. Hellblaue Info-Boxen (Radius ca. 12 px)
  fassen Merksätze; eine weitere Box erscheint in sehr hellem Beige/Rosé als zweite
  Boxfarbe (`stromspeicher-desktop-17-y12000.png`).
- Typo: TOC-Kopfzeile ca. 13 px in Caps mit weiter Laufweite („INHALTSVERZEICHNIS
  FUNKTION") — die einzige Versalienzeile der Site. TOC-Einträge ca. 14 px.
  H3 im Text ca. 19 px Weight 600, Fließtext ca. 17 px mit ca. 25 px Zeilenabstand,
  Bullets mit klassischen Punkten.
- Farbe/Fläche: Weiß, hellblaue und beige Boxen, Gelb ausschließlich als
  Gliederungsstrich, Blau in den Links.
- Abstände/Rhythmus: Absatzabstand ca. 20 px, ca. 45 px vor H3, TOC-Zeilenabstand
  ca. 21 px. Lesetakt wie im Magazin-Artikel (Sektion 43), nur mit Sidebar rechts
  statt CTA-Widget.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Ratgeberkörper mit sticky TOC und Gelb-Marker

### 53 — Vergleichstabelle auf Beige [stromspeicher-desktop-17-y12000.png | -]
- Anordnung: Eine flächige Tabelle innerhalb der Textspalte (x 160–925), dreispaltig:
  Merkmal linksbündig, zwei Wertespalten. Kopfzeile fett, darunter Zeilen mit dünnen
  Trennlinien nur zwischen den Datenzeilen, nicht außen.
- Buttons/Komponenten: Kein Suchfeld, kein Sortierpfeil, keine Balken — bewusst die
  ruhige Variante gegenüber der Datentabelle in Sektion 45. Die Tabelle steht auf einer
  sehr hellen Beige-/Rosé-Fläche mit Radius ca. 12 px, ohne Kontur; die Fläche ist die
  einzige Rahmung.
- Typo: Kopfzeile ca. 16 px Weight 600 Navy, Zellen ca. 16 px Weight 400. Gleiche Größe
  in Kopf und Körper, Unterschied nur im Weight.
- Farbe/Fläche: Beige/Rosé als dritte Boxfarbe der Site neben Karten-Grau und Info-Blau.
  Kein Gelb, kein Grün, keine Zebrastreifen.
- Abstände/Rhythmus: Zeilenhöhe ca. 42 px, Innenpadding ca. 40 px, Spaltenabstand
  ca. 200 px — deutlich luftiger als die Balken-Tabelle in Sektion 45.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Ruhige Vergleichstabelle auf Tonfläche

### 54 — Akkordeon-Schluss und Footer-Übergang (/stromspeicher) [stromspeicher-desktop-20-y13821.png | -]
- Anordnung: Am Ende der Ratgeberstrecke stehen einzelne Akkordeon-Zeilen in der
  Textspalte, danach ein großer leerer Weißraum von ca. 300 px, dann die gelbe
  Footer-Kuppel mit den drei freigestellten Produkten und der Navy-Footer. Der
  Sprung von Textspalte zu vollbreitem Footer erfolgt ohne Zwischen-CTA.
- Buttons/Komponenten: Akkordeon-Zeile mit Frage links (ca. 19 px Weight 600 Navy) und
  Chevron-nach-unten rechts am Spaltenrand, darunter eine 1-px-Trennlinie — identisch
  zum FAQ-Muster der Startseite (Sektion 13). Die Kuppel ist ein gelber Halbkreis, der
  hinter der Footer-Oberkante hervorschaut; darauf stehen Wärmepumpe, Energiemanager
  und Solarmodul freigestellt nebeneinander. Header/Footer selbst wie in Sektion 01 und
  Sektion 16 beschrieben, hier nicht wiederholt.
- Typo: Wie Sektion 16.
- Farbe/Fläche: Weiß → gelbe Kuppel → Navy-Footer, wie auf der Startseite.
- Abstände/Rhythmus: Ca. 300 px Leerraum zwischen letzter Akkordeon-Linie und
  Kuppel — der größte ungenutzte Weißraum aller gelesenen Seiten.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-CTA-END`-Nähe (Abschluss ohne CTA) / siehe Sektion 15 und 16

---

## Seite: /waermepumpe

### 55 — Hero /waermepumpe [waermepumpe-desktop-00-fold.png | -]
- Anordnung: Baugleich zu Sektion 47: dunkle Bokeh-Bühne, Text links ab x≈160
  (H1 auf y≈375–495), CTA-Paar auf y≈642–690, Produkt rechts (x≈730–1285) auf einem
  dunklen Sockel. Das Motiv ist hier deutlich größer und schneidet unten an der
  Fold-Kante ab, statt frei zu stehen.
- Buttons/Komponenten: Dasselbe CTA-Paar wie in Sektion 47 — Outline links
  (ca. 148×44 px), gelb gefüllt rechts (ca. 194×44 px), beide ohne Pfeil-Icon.
- Typo: H1 zweizeilig ca. 56 px Weight 600 weiß, Lead dreizeilig ca. 19 px mit einer
  hochgestellten Fußnotenziffer am Ende — die einzige Hero-Fußnote der gelesenen Seiten.
- Farbe/Fläche: Wie Sektion 47; die gelben Bokeh-Punkte sitzen hier gedrängter am
  oberen rechten Rand und der Bodenteppich aus Strichen ist breiter.
- Abstände/Rhythmus: Ca. 290 px Nav → H1, ca. 45 px H1 → Lead, ca. 38 px Lead → CTAs.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-HERO-PHOTO` (identische Ausprägung wie Sektion 47)

### 56 — Split-Serie mit Kennzahl-Badge (/waermepumpe) [waermepumpe-desktop-04-y2250.png | -]
- Anordnung: Dieselbe alternierende Split-Serie wie Sektion 49, hier über drei Blöcke
  sichtbar: Bild links / Text rechts, dann gespiegelt, dann wieder gespiegelt. Die
  Kreis-Badges sitzen jeweils an der äußeren oberen Bildecke und überlappen sie.
- Buttons/Komponenten: Badges wie Sektion 49 (Navy-Scheibe Ø ca. 118 px, grüner
  Kreis-Haken auf dem Rand), hier mit Kennzahlen als Mittelzeile („16 kW", „80 %",
  „100%"). Statt Buttons enden die Textkästen in unterstrichenen Inline-Links in
  Navy bzw. Blau — Links statt Tasten, wie in Sektion 49 CTA-frei.
- Typo: Wie Sektion 49 (Überschrift zweizeilig ca. 30 px, zweite Zeile grau;
  Kasten-Fließtext ca. 16–17 px). Die Kennzahl im Badge ca. 19 px Weight 700.
- Farbe/Fläche: Weiß, Kästen in Karten-/Strip-Grau, Badges Navy. Die Bilder wechseln
  zwischen Studio-Render (heller Verlauf) und Außenfoto — beide mit Radius ca. 8 px.
- Abstände/Rhythmus: Blockhöhe ca. 350 px, ca. 130 px zwischen den Splits.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-SPLIT-ALT` (siehe Sektion 49)

### 57 — Bundesland-Kachelwahl und Testimonial-Slider [waermepumpe-desktop-08-y5250.png | -]
- Anordnung: Oben das Ende einer zweispaltigen Kachelliste (2×5 Zeilen, Kachelbreite
  ca. 350 px, Zeilenhöhe ca. 68 px) auf hellgrauer Quiz-Fläche. Darunter ein
  zentrierter Kopf und ein Karten-Slider, dessen Karten links und rechts über den
  Viewport hinauslaufen. Unter dem Slider sitzt eine Navy-Zitatkarte, die per kleiner
  Dreiecksspitze nach oben auf die aktive Slider-Karte zeigt.
- Buttons/Komponenten: Bundesland-Kacheln als weiße Zeilen mit weichem Schatten,
  Radius ca. 6–8 px, links das echte Landeswappen als Bildmarke (ca. 34×34 px), rechts
  das Label; die Auffang-Kachel „Ich lebe in einem anderen Bundesland" hat kein Wappen
  und zentriert stattdessen ihr Label. Slider-Steuerung als Paar runder Outline-Buttons
  (Ø ca. 46 px) mit Pfeil, mittig über den Karten statt an den Seiten. Die aktive
  Slider-Karte ist voll gesättigt, die Nachbarkarten sind stark aufgehellt — Fokus über
  Deckkraft statt Größe. Jede Karte trägt oben links einen hellen Orts-Chip (Pille,
  Radius ca. 999 px). In der Navy-Zitatkarte sitzt rechts ein dunkler Produkt-Chip mit
  Icon.
- Typo: Kopf zweizeilig, Titel ca. 34 px Weight 600 Navy, Unterzeile ca. 30 px grau.
  Zitat ca. 22 px Weight 600 weiß dreizeilig, Namenszeile darüber ca. 15 px in
  gebrochenem Weiß. Kachel-Labels ca. 16 px.
- Farbe/Fläche: Quiz-Fläche grau, Karten weiß, Zitatkarte Navy (Radius ca. 16–20 px).
  Kein Gelb im ganzen Block.
- Abstände/Rhythmus: Ca. 90 px Kachelblock → Kopf, ca. 60 px Kopf → Pfeilpaar,
  ca. 45 px Pfeilpaar → Karten, ca. 30 px Karten → Zitatkarte. Kartenabstand ca. 26 px.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Testimonial-Slider mit Navy-Zitatkarte und Deckkraft-Fokus

### 58 — Ratgeberstrecke mit Sechser-Tabreihe und Prozessgrafik [waermepumpe-desktop-13-y9000.png | -]
- Anordnung: Wie Sektion 51/52, aber mit sechs statt drei Tabs — die Reihe füllt fast
  die volle Container-Breite (x≈183–1257) und bleibt einzeilig. Darunter links die
  Textspalte (x 183–948), rechts das sticky Inhaltsverzeichnis ab x≈1033. In der
  Textspalte sitzt eine eigenständige Prozessgrafik über die Spaltenbreite.
- Buttons/Komponenten: Tab-Pillen wie Sektion 51 (aktiv navy gefüllt, inaktiv weiß mit
  Navy-Kontur), Breiten folgen dem Text (ca. 165 px bis ca. 262 px). Die Prozessgrafik
  ist eine graue Bühne (Radius ca. 8 px, ca. 765×430 px) mit drei nebeneinander
  gestellten Karten, deren Kopfbalken je eine andere Farbe tragen: Mittelblau, Navy und
  Orange — Orange erscheint hier zum einzigen Mal in der ganzen gelesenen Site und
  gehört zur Illustration, nicht zum UI. Aufzählungen sind hier ausnahmsweise nummeriert
  (1.–4.) statt gepunktet. Rechts unten schwebt fix eine helle Kontakt-Pille
  („Kontakt zum Wärmeteam", Radius ca. 8 px, weiße Füllung, Chevron rechts) — ein
  Overlay, das auf allen Slices dieser Route mitläuft
  (`waermepumpe-desktop-04-y2250.png`, `waermepumpe-desktop-08-y5250.png`).
- Typo: TOC-Kopf in Caps ca. 13 px, aktiver TOC-Eintrag Navy Weight 600 mit gelbem
  Strich, inaktive grau mit Ausblendung nach unten. H3 ca. 19 px Weight 600, Fließtext
  ca. 17 px, Bold-Lead-ins („Das Besondere:") im Fließtext.
- Farbe/Fläche: Weiß, Info-Box hellblau, Grafikbühne mittelgrau. Gelb nur als
  TOC- und Überschriftenstrich.
- Abstände/Rhythmus: Tabreihe-Höhe ca. 44 px, ca. 60 px Tabs → Text, Absatzabstand
  ca. 20 px, ca. 45 px vor H3.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Ratgeberstrecke mit Sechser-Tabreihe und Kontakt-Overlay

---

## Seite: /wallbox

### 59 — Hero /wallbox [wallbox-desktop-00-fold.png | -]
- Anordnung: Wie Sektion 47 und 55, aber mit deutlich mehr Weißraum links: H1 einzeilig
  auf y≈425–485, Lead zweizeilig, CTA-Paar auf y≈593–641. Das Produkt sitzt rechts
  (x≈880–1330) und ist im Bild leicht gedreht statt frontal.
- Buttons/Komponenten: CTA-Paar wie Sektion 47; der Outline-Button ist hier schmaler
  (ca. 142×44 px), der gelbe ca. 194×44 px.
- Typo: H1 einzeilig ca. 56 px Weight 600 weiß — die einzige einzeilige Produkt-H1 der
  drei Produktseiten. Lead ca. 19 px zweizeilig.
- Farbe/Fläche: Dieselbe dunkle Bokeh-Bühne, hier mit einem zusätzlichen kalten
  Blau-Akzent: die Wallbox trägt einen leuchtenden blauen Leuchtrahmen, der als
  Zweitfarbe neben dem gelben Streulicht steht. Das ist der einzige Hero mit einem
  nicht-gelben Lichtakzent.
- Abstände/Rhythmus: Ca. 340 px Nav → H1, ca. 40 px H1 → Lead, ca. 40 px Lead → CTAs.
  Am luftigsten der drei Produkt-Heroes.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Ausprägung wie Sektion 47)

### 60 — Benefit-Stapel und Split-Serie (/wallbox) [wallbox-desktop-04-y2250.png | -]
- Anordnung: Links ein vertikaler Stapel gleich breiter grauer Benefit-Kästen
  (je ca. 665×145 px, ca. 20 px Abstand), rechts ein Produktbild derselben Höhe — ein
  Split, bei dem die Textseite selbst wieder in Kacheln zerfällt. Darunter die
  gewohnte alternierende Split-Serie (Sektion 49) mit Kreis-Badges.
- Buttons/Komponenten: Benefit-Kästen mit zentriertem grünen Strich-Icon oben und
  zentriertem Navy-Label darunter, Radius ca. 12 px, ohne Kontur und ohne Aktion.
  Badges wie Sektion 49; hier zusätzlich eine Variante mit reinem Textinhalt
  („Günstig, schnell, sorgenfrei") statt Kennzahl. Die Bilder dieser Serie liegen auf
  einer hellen blaugrauen Fläche statt auf Weiß.
- Typo: Benefit-Labels ca. 16 px Weight 600 zentriert. Split-Überschriften ca. 30 px
  zweizeilig mit grauer zweiter Zeile, Kastentext ca. 16–17 px.
- Farbe/Fläche: Weiß, Kästen in Karten-/Strip-Grau, Bildflächen hell-blaugrau, Badges
  Navy, Icons grün. Kein Gelb im ganzen Block.
- Abstände/Rhythmus: Kastenabstand ca. 20 px, ca. 130 px zwischen den Splits,
  ca. 22 px Überschrift → Textkasten.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-SPLIT-ALT` + Kandidat: Benefit-Kachelstapel als Splithälfte

### 61 — „Warum Enpal?"-Slider und Auszeichnungsband (/wallbox) [wallbox-desktop-08-y5250.png | -]
- Anordnung: Zentrierter Kopf, darunter mittig das Pfeilpaar, darunter ein vierspaltiges
  Kartenraster (Karten ca. 265 px breit) im Slider. Darunter eine eigene hellgraue
  Vollbreiten-Sektion mit zentriertem Kopf, einem Outline-CTA und einer Reihe von fünf
  Siegel-Bildmarken. Am Fuß beginnt „So funktioniert's" wie Sektion 50.
- Buttons/Komponenten: Karten ohne Kontur und ohne Schatten: Bild oben mit Radius
  ca. 8 px (ca. 265×195 px), darunter Titel und Absatz direkt auf Weiß — Karten nur als
  Gruppierung, nicht als Fläche. Pfeilpaar als runde Outline-Buttons (Ø ca. 46 px)
  mittig über dem Raster. Der Auszeichnungs-CTA ist ein Outline-Button (weiße Füllung,
  dünne Navy-Kontur, ca. 165×46 px, Radius ca. 12 px, Pfeil rechts) — Outline statt
  Gelb, weil in dieser Sektion keine Konversion gewollt ist. Die Siegel sind echte
  Original-Bildmarken in Originalfarbe; die äußeren beiden laufen nach links und rechts
  transparent aus und zeigen so an, dass die Reihe scrollbar ist.
- Typo: Kartentitel ca. 17 px Weight 600 Navy, Kartentext ca. 16 px. Sektionstitel
  ca. 34 px Weight 600, Unterzeile ca. 26 px grau. Siegel-Bildunterschriften zweizeilig
  ca. 15 px, obere Zeile teils in Grün.
- Farbe/Fläche: Karten auf Weiß, Auszeichnungsband auf Karten-/Strip-Grau über die
  volle Breite. Der Wechsel Weiß → Grau → Weiß ist die einzige Flächenzäsur der Seite.
- Abstände/Rhythmus: Ca. 55 px Kopf → Pfeile, ca. 55 px Pfeile → Karten, ca. 20 px
  Bild → Titel, Spaltenabstand ca. 20 px. Bandhöhe ca. 520 px mit ca. 80 px Padding.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-LOGOS` (Auszeichnungsband) + Kandidat: Flächenloses Kartenraster im Slider

---

## Seite: /standorte

### 62 — Foto-Hero mit CTA direkt unter der H1 [standorte-desktop-00-fold.png | -]
- Anordnung: Ein Bildstreifen über die volle Breite, aber nur ca. 445 px hoch — kein
  Vollbild-Fold. Die H1 sitzt zentriert auf y≈245–295, direkt darunter mit ca. 30 px
  Abstand der CTA. Unter dem Streifen beginnt sofort weißer Inhalt: zentrierte H2 und
  ein Fließtextabsatz über die volle Container-Breite.
- Buttons/Komponenten: Ein einzelner gelber CTA (ca. 372×48 px, Radius ca. 12–14 px,
  Navy-Label, Pfeil rechts) — der breiteste Button der gelesenen Seiten, weil das
  Label ein ganzer Satz ist. Kein zweiter Button, kein Chip, kein Siegel im Fold.
- Typo: H1 einzeilig ca. 44 px Weight 600 weiß — kleiner als die Produkt-H1 (56 px) und
  ohne Lead. H2 darunter ca. 34 px Weight 600 Navy, Fließtext ca. 17 px über die volle
  Breite (ca. 1120 px Textmaß, deutlich breiter als die ca. 765 px der Artikelseiten).
- Farbe/Fläche: Echtes Reportagefoto (Monteur auf dem Dach) mit warmem Grünton, ohne
  Abdunkelung — die weiße H1 steht ohne Wash direkt auf dem Bild. Der gelbe CTA ist der
  einzige Flächenakzent.
- Abstände/Rhythmus: Ca. 160 px Nav → H1, ca. 30 px H1 → CTA, ca. 90 px Bildkante → H2,
  ca. 45 px H2 → Text. Kompakter Einstieg statt großzügigem Fold.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-HERO-PHOTO` (Abweichung: Streifen statt Vollbild, CTA direkt unter H1)

### 63 — Kundenkarte mit Google-Map und Detailpanel [standorte-desktop-04-y2250.png | -]
- Anordnung: Zentrierter zweizeiliger Kopf, ein Lead über die volle Containerbreite,
  darunter die Karte als breites Rechteck (x 160–1280, ca. 625 px hoch, Radius
  ca. 8 px). Über der Karte schweben drei Ebenen: oben links ein Suchfeld mit
  Suchbutton, darunter linksbündig ein hohes Detailpanel (ca. 305×545 px), rechts unten
  die Google-Zoom- und Zentrieren-Steuerung. Unter der Karte steht eine einzeilige
  Fußnote.
- Buttons/Komponenten: Suchfeld als weiße Pille mit starkem Schatten (ca. 240×48 px,
  Radius ca. 8 px) und daneben ein gelber quadratischer Suchbutton mit Lupe
  (ca. 58×48 px) — die einzige gelbe Fläche der Sektion. Das Detailpanel ist eine helle
  Karte mit je einem Chevron oben und unten als Blätterschalter, einem freigestellten
  Produktbild in der Mitte und zwei Textzeilen darunter. Die Karten-Pins sind gelbe
  Tropfen mit weißem „E"; der aktive Pin ist navy statt gelb — Auswahl über Farbtausch,
  nicht über Größe. Ein Teil der Kartenfläche zeigt eine graue Ersatzfläche mit dem
  Hinweis „Sorry, we have no imagery here." — ein sichtbarer Ladefehler der
  Google-Kachel, kein Designelement.
- Typo: Kopf ca. 34 px Weight 600 Navy plus Unterzeile ca. 30 px grau. Panel-Ortsname
  ca. 15 px, Panel-Titel zweizeilig ca. 19 px Weight 600 zentriert. Fußnote ca. 13 px
  in Sekundärgrau, zentriert.
- Farbe/Fläche: Die Google-Karte bringt ein fremdes Farbsystem (Grün, Beige, Weiß) in
  die sonst reduzierte Palette — der einzige Block der Site mit Drittanbieter-Farben.
  Enpal-Gelb erscheint nur in Pins und Suchbutton.
- Abstände/Rhythmus: Ca. 45 px Kopf → Lead, ca. 45 px Lead → Karte, ca. 22 px Karte →
  Fußnote. Innenabstand des Suchfelds ca. 16 px zur Kartenkante.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Interaktive Kundenkarte mit Pin-Auswahl und Detailpanel

### 64 — Städte-Kartenraster mit Restzeile [standorte-desktop-08-y5250.png | -]
- Anordnung: Ein dreispaltiges Raster (Spaltenbreite ca. 365 px, Abstand ca. 30 px) aus
  Stadt-Blöcken: Bild oben, Titel, Absatz, Link. Die letzte Zeile ist nur mit einem
  einzigen Block besetzt und bleibt links stehen, ohne Zentrierung oder Auffüllung —
  eine sichtbar unaufgefüllte Restzeile. Darunter folgt derselbe Testimonial-Slider mit
  Navy-Zitatkarte wie Sektion 57.
- Buttons/Komponenten: Keine Buttons. Der Abschluss jedes Blocks ist ein blauer
  Textlink ohne Unterstrich und ohne Pfeil. Bilder mit Radius ca. 8 px
  (ca. 365×185 px), keine Karte, keine Kontur, kein Schatten — wie Sektion 61 nur
  Gruppierung.
- Typo: Blocktitel ca. 19 px Weight 600 Navy, Absatz ca. 16 px mit ca. 23 px
  Zeilenabstand, Link ca. 16 px in Blau.
- Farbe/Fläche: Weiß durchgehend, Blau nur in den Links.
- Abstände/Rhythmus: Ca. 20 px Bild → Titel, ca. 14 px Titel → Absatz, ca. 28 px
  Absatz → Link, Zeilenabstand zwischen Rasterzeilen ca. 55 px.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-CARDS-3`

---

## Seite: /magazin

### 65 — Textkopf ohne Bild [magazin-desktop-00-fold.png | -]
- Anordnung: Der einzige Fold der gelesenen Seiten ganz ohne Bild oder Farbfläche:
  zentrierter zweizeiliger Kopf auf y≈145–240, darunter zwei linksbündige
  Fließtextabsätze im Container (x 274–1166, Textmaß ca. 890 px) und darunter mittig
  ein einzelner CTA. Der Text steht linksbündig unter der zentrierten Überschrift.
- Buttons/Komponenten: Ein gelber CTA (ca. 300×46 px, Radius ca. 12–14 px, Navy-Label,
  Pfeil rechts), sonst nichts — kein Suchfeld, kein Filter, keine Breadcrumb.
- Typo: Titel ca. 40 px Weight 600 Navy, Unterzeile ca. 32 px in Sekundärgrau,
  Fließtext ca. 17 px mit ca. 27 px Zeilenabstand. Zwischen den beiden Absätzen eine
  volle Leerzeile statt eines Absatzabstands.
- Farbe/Fläche: Reines Weiß über den ganzen Fold. Der gelbe CTA ist die einzige Farbe
  unterhalb der Nav.
- Abstände/Rhythmus: Ca. 100 px Nav → Titel, ca. 40 px Titel → Text, ca. 60 px Text →
  CTA, ca. 85 px CTA → erste Themenkarte.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Reiner Textkopf ohne Bildfläche

### 66 — Themenkarten mit Tag-Wolke [magazin-desktop-03-y1500.png | -]
- Anordnung: Eine vertikale Folge breiter Blöcke, im Wechsel Bild links / Fläche rechts
  und Fläche links / Bild rechts. Der Textteil ist eine hellgraue Fläche (ca. 800×370 px,
  Radius ca. 12 px), das Bild ein separates Rechteck (ca. 295×370 px bzw. ca. 295×355 px,
  Radius ca. 8 px) ohne Abstand zur Fläche — Bild und Fläche stoßen als zwei
  eigenständige Rechtecke aneinander, statt in einer gemeinsamen Karte zu liegen.
  Innen: Rubriktitel oben, darunter eine frei umbrechende Reihe von Themen-Pillen.
- Buttons/Komponenten: Themen-Pillen als Outline-Chips: weiße Füllung, dünne Navy-
  Kontur, Radius ca. 999 px, Höhe ca. 44 px, Breite folgt dem Label (ca. 155 px bis
  ca. 265 px), Abstand ca. 20 px horizontal und ca. 20 px vertikal. Die Zeilen sind
  unterschiedlich lang und linksbündig gesetzt — bewusst als Wolke, nicht als Raster.
  Kein Icon, kein Chevron, kein gefüllter Zustand sichtbar.
- Typo: Rubriktitel ca. 30 px Weight 600 Navy, Chip-Labels ca. 15 px Weight 600.
  Innerhalb der Blöcke gibt es keinen Fließtext — nur Titel und Chips.
- Farbe/Fläche: Weiß als Grund, Blockflächen in Karten-/Strip-Grau. Kein Gelb, kein
  Grün, kein Blau außerhalb der Bilder — die farbärmste Sektion der Site.
- Abstände/Rhythmus: Blockhöhe ca. 370 px, ca. 30 px zwischen zwei Blöcken,
  ca. 55 px Innenabstand links im Textteil, ca. 60 px Titel → erste Chip-Zeile.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Rubrikblock mit Outline-Chip-Wolke

### 67 — Quiz und Footer am Magazin-Ende [magazin-desktop-06-y3750.png | -]
- Anordnung: Nach der letzten Rubrik folgt die hellgraue Quiz-Fläche (x 255–1185,
  ca. 585 px hoch) wie in Sektion 48, danach ca. 240 px Weißraum, dann Kuppel und
  Footer. Kein eigener Schluss-CTA und kein Newsletter-Block.
- Buttons/Komponenten: Quiz identisch zu Sektion 48 (Fortschrittsleiste, drei weiße
  Auswahlkacheln mit Icon über Label). Footer-Kuppel und Navy-Footer wie Sektion 15 und
  16, hier nicht wiederholt.
- Typo: Wie Sektion 48 und 16.
- Farbe/Fläche: Weiß → Quiz-Grau → Weiß → gelbe Kuppel → Navy.
- Abstände/Rhythmus: Ca. 240 px zwischen Quiz-Unterkante und Kuppel — derselbe große
  Leerraum wie in Sektion 54.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: siehe Sektion 14, 15 und 16

---

## Seite: /faq

### 68 — Halbleerer Textkopf [faq-desktop-00-fold-v2.png | -]
- Anordnung: Kopf und Text stehen ausschließlich in der linken Spalte (x 160–795,
  Textmaß ca. 635 px); die rechte Bildschirmhälfte bleibt über die volle Foldhöhe leer.
  Das ist der einzige Fold der Site mit einer vollständig ungenutzten Hälfte — kein
  Bild, keine Form, keine Illustration füllt sie.
- Buttons/Komponenten: Keine Buttons im Fold. Ein unterstrichener Inline-Link im
  zweiten Absatz ist die einzige Aktion. Ein zweiter Shot-Pass derselben Route
  (`faq-desktop-00-fold.png`) zeigt denselben Aufbau.
- Typo: Titel ca. 40 px Weight 600 Navy, Unterzeile ca. 32 px in Sekundärgrau,
  Fließtext ca. 17 px mit ca. 27 px Zeilenabstand, zwei Absätze mit voller Leerzeile
  dazwischen — dieselbe Kopf-Typo wie Sektion 65.
- Farbe/Fläche: Weiß, ein blauer Link. Keine Fläche.
- Abstände/Rhythmus: Ca. 100 px Nav → Titel, ca. 40 px Titel → Text, ca. 85 px Text →
  Sektionsüberschrift „Allgemein".
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Reiner Textkopf ohne Bildfläche (siehe Sektion 65)

### 69 — Filterzeile mit Select, Suche und Tag-Reihe [faq-desktop-00-fold-v2.png | -]
- Anordnung: Zweispaltig, aber ungleich: links das Kategorie-Select (x 160–805,
  ca. 645×44 px), rechts das Suchfeld (x 826–1280, ca. 455×44 px) auf derselben
  Oberkante. Unter dem Suchfeld — also nur in der rechten Spalte — eine dreizeilige
  Reihe von Tag-Pillen. Unter dem Select beginnt links sofort die Frageliste. Die
  Filter stehen damit auf der einen Seite, die Ergebnisse auf der anderen.
- Buttons/Komponenten: Select als weißes Feld mit sehr heller Kontur, Radius ca. 8 px,
  Label links („Kategorie auswählen") und Chevron-nach-unten rechts. Suchfeld gleich
  hoch, mit Lupen-Outline-Icon links und Platzhaltertext. Tags als Outline-Pillen
  (Radius ca. 999 px, Höhe ca. 40 px, dünne Navy-Kontur, Navy-Label ca. 15 px), am Ende
  der Reihe steht statt einer Pille ein unterstrichener Textlink „Filter zurücksetzen" —
  Zurücksetzen bewusst nicht als Pille. Im geklickten Zustand
  (`faq-desktop-click-y0-00-Kategorie_auswählen-v2.png`) klappt kein Overlay-Menü auf:
  stattdessen erscheint unter dem Select eine zweite, linksbündige Reihe von vier
  Outline-Pillen (Unterkategorien), die die Liste nach unten schiebt und mit einer
  dünnen Linie abschließt. Das Select verhält sich also wie ein Inline-Aufklapper, nicht
  wie ein klassisches Dropdown.
- Typo: Sektionsüberschrift „Allgemein" ca. 26 px Weight 600 Navy. Feldlabels und
  Pillen ca. 15 px, Platzhalter in Sekundärgrau.
- Farbe/Fläche: Weiß, alle Bedienelemente als Outline. In der ganzen Filterzeile kommt
  keine gefüllte Fläche vor.
- Abstände/Rhythmus: Ca. 30 px Überschrift → Felder, ca. 20 px Feldunterkante → erste
  Tag-Zeile, Tag-Abstand ca. 12 px horizontal und ca. 15 px vertikal.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Getrennte Filter- und Ergebnisspalte mit Inline-Aufklapper

### 70 — Fragenliste als graue Zeilenkarten [faq-desktop-03-y1500-v2.png | -]
- Anordnung: Eine einspaltige Liste in der linken Spalte (x 160–805). Jede Frage ist
  eine eigene hellgraue Karte (Breite ca. 645 px, Höhe ca. 100 px bei einzeiliger und
  ca. 118 px bei zweizeiliger Frage, Radius ca. 12 px) mit ca. 28 px Abstand zur
  nächsten. Rechts oben im Panel bleibt viel Leerfläche; erst weit unten steht dort eine
  hellblaue Hinweisbox. Die Filterzeile aus Sektion 69 bleibt beim Scrollen sichtbar
  und wandert mit.
- Buttons/Komponenten: Die Karten sind keine Akkordeons: statt eines Chevrons sitzt
  rechts ein diagonaler Pfeil-nach-oben-rechts als dünnes Outline-Icon — das Signal für
  „führt auf eine eigene Seite" statt „klappt auf". Damit unterscheidet sich diese
  Liste bewusst vom FAQ-Akkordeon der Startseite (Sektion 13) und der Artikelseiten
  (Sektion 43). Die hellblaue Hinweisbox (Radius ca. 12 px, ca. 455×145 px) enthält
  Titel, zwei Zeilen Text und einen blauen Link mit vorangestelltem `>>` — dieselbe
  Machart wie die Info-Box in Sektion 46.
- Typo: Frage ca. 17 px Weight 600 Navy, linksbündig mit ca. 40 px Innenabstand links,
  vertikal zentriert. Box-Titel ca. 16 px Weight 600, Box-Text ca. 14 px.
- Farbe/Fläche: Karten in Karten-/Strip-Grau auf Weiß, Hinweisbox in Info-Blau. Kein
  Gelb auf der ganzen Seite außer im Logo-Punkt und im Footer.
- Abstände/Rhythmus: Kartenabstand ca. 28 px, Innenpadding ca. 40 px links und
  ca. 35 px rechts bis zum Pfeil. Sehr gleichmäßig; die Seite ist mit über 45.000 px
  Gesamthöhe (`faq-desktop-63-y45828-v2.png`) die längste der gelesenen Routen.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: FAQ-Liste als Link-Karten mit Diagonalpfeil

---

## Seite: /energie-lexikon/abschattung

### 71 — Lexikon-Artikelkopf mit gelber Formfläche [energie-lexikon__abschattung-desktop-00-fold.png | -]
- Anordnung: Wie der Magazin-Artikelkopf (Sektion 42) zweispaltig asymmetrisch: links
  (x 64–830) Breadcrumb, H1, Autorenzeile und Meta-Zeile, rechts oben die gelbe
  Verlaufsform. Der Unterschied zu Sektion 42: Die Form ist hier kleiner (x 1058–1375,
  ca. 255 px hoch), hat einen viertelkreisförmig ausgeschnittenen unteren linken Rand
  und trägt zweizeilig „Enpal Energie-Lexikon" statt „Enpal Magazin". Es gibt keine
  Info-Box und keinen TOC-Schalter — die rechte Spalte bleibt unterhalb der Form leer.
- Buttons/Komponenten: Keine Buttons im Kopf. Autor-Avatar als Kreis (Ø ca. 34 px),
  Autorname als unterstrichener Link, Breadcrumb mit Chevron-Trennern und grauem
  aktivem Glied. Zwischenüberschriften im Text tragen links den gelben Vertikalstrich
  (ca. 4 px breit) wie in Sektion 43.
- Typo: H1 einzeilig ca. 34 px Weight 600 Navy — dieselbe Artikel-H1-Größe wie
  Sektion 42, hier aber ohne Umbruch, weil der Begriff ein Wort ist. Labels „Autor:",
  „Aktualisiert:", „Lesezeit:" fett ca. 16 px, Werte Weight 400. Fließtext ca. 17 px
  mit ca. 25 px Zeilenabstand.
- Farbe/Fläche: Weiß, eine gelbe Verlaufsform mit weichem Übergang von hellem zu
  kräftigerem Gelb, Blau in den Inline-Links. Die Form ist reine Dekoration ohne
  Aktion.
- Abstände/Rhythmus: Ca. 80 px Nav → Breadcrumb, ca. 18 px → H1, ca. 32 px → Autor,
  ca. 28 px → Meta, ca. 90 px → erster Absatz. Deutlich knapper getaktet als die
  Marketingseiten.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Magazin-Artikelkopf mit Autor, Meta und Info-Box (Variante ohne
  Info-Box, siehe Sektion 42)

### 72 — Nutzenabfrage-Leiste und Lexikon-Kartenraster [energie-lexikon__abschattung-desktop-02-y750.png | -]
- Anordnung: Nach dem kurzen Artikeltext eine schmale Leiste über die Textspalte
  (x 64–830, ca. 90 px hoch), links Frage und Zusatzzeile, rechts zwei Buttons
  nebeneinander. Darunter mit ca. 130 px Abstand eine Überschrift und ein zweispaltiges
  Kartenraster (Karten ca. 412×205 px), dessen letzte Zeile mit einer breiten Karte
  über beide Spalten (ca. 855×175 px) endet — die Restzeile wird hier also gestreckt
  statt leer gelassen, anders als in Sektion 64.
- Buttons/Komponenten: Die Abfrage-Leiste ist eine weiße Karte mit deutlichem weichen
  Schatten und Radius ca. 12 px — eines der wenigen Elemente der Site mit sichtbarem
  Schatten. Darin zwei Buttons gleicher Form (je ca. 88×46 px, Radius ca. 8 px), beide
  mit Label plus Daumen-Icon rechts: „Ja" in kräftigem Gelb, „Nein" in einem sehr
  hellen Gelb — dieselbe Farbfamilie in zwei Stufen statt Gelb gegen Grau. Die
  Lexikon-Karten sind hellgraue Flächen (Radius ca. 12 px) mit Titel oben links, dem
  diagonalen Pfeil-nach-oben-rechts oben rechts (wie Sektion 70) und zwei bis drei
  Zeilen Definitionstext darunter.
- Typo: Leisten-Frage ca. 17 px Weight 600 Navy, Zusatzzeile ca. 12 px in Sekundärgrau.
  Rasterüberschrift ca. 32 px Weight 600. Kartentitel ca. 16 px Weight 600, Kartentext
  ca. 15 px mit ca. 20 px Zeilenabstand.
- Farbe/Fläche: Weiß, Karten in Karten-/Strip-Grau, zwei Gelbstufen in der Leiste.
  Gelb trägt hier ausnahmsweise auch die Ablehnung („Nein") — die einzige Stelle, an
  der eine negative Aktion in der Akzentfarbe steht.
- Abstände/Rhythmus: Ca. 80 px Text → Leiste, ca. 130 px Leiste → Rasterüberschrift,
  ca. 40 px Überschrift → Karten, Kartenabstand ca. 28 px horizontal und ca. 25 px
  vertikal.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Hilfreich-Abfrage mit Zweistufen-Gelb + `P-CARDS-3` (zweispaltige
  Variante)

---

## Seite: /vertriebspartner-werden

### 73 — Zentrierter Kopf und Bild-Text-Wechsel [vertriebspartner-werden-desktop-00-fold.png | -]
- Anordnung: Zentrierter zweizeiliger Titel auf y≈145–245, darunter ein zentrierter
  Lead über ca. 870 px Breite, darunter direkt der erste Split: Bild links
  (ca. 295×370 px), graue Textfläche rechts (ca. 575×370 px). Der folgende Block ist
  gespiegelt und schmaler. Container ist hier x 274–1166 statt x 160–1280 — die Seite
  läuft insgesamt schmaler als die Marketingseiten.
- Buttons/Komponenten: Kein CTA im Fold. Die Textflächen enthalten nur Titel und
  Bullet-Listen, keine Buttons. Bilder mit Radius ca. 8 px, Flächen mit Radius
  ca. 12 px, beide ohne Kontur und ohne Schatten.
- Typo: Titel zweizeilig ca. 40 px Weight 600 Navy zentriert, Lead ca. 17 px zentriert
  in Sekundärgrau — der einzige zentrierte Lead in Grau statt Navy. Blocktitel ca. 17 px
  Weight 600, Bullets ca. 17 px in Sekundärgrau mit ca. 26 px Zeilenabstand.
  Auffällig: der Fließtext dieser Seite steht durchgehend in Sekundärgrau statt Navy,
  was sie sichtbar leiser wirken lässt als alle anderen Routen.
- Farbe/Fläche: Weiß, Blockflächen in Karten-/Strip-Grau. Kein Gelb, kein Grün, kein
  Blau oberhalb des Footers.
- Abstände/Rhythmus: Ca. 100 px Nav → Titel, ca. 40 px Titel → Lead, ca. 45 px Lead →
  erster Block, ca. 30 px zwischen den Blöcken.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-SPLIT-ALT` (Abweichung: schmalerer Container, Text durchgehend grau)

### 74 — Dreier-Prozess und Kontaktblöcke mit Outline-CTA [vertriebspartner-werden-desktop-03-y1500.png | -]
- Anordnung: Oben drei gleich hohe graue Karten nebeneinander (je ca. 245×310 px,
  ca. 30 px Abstand) mit zweizeiliger Überschrift oben und Absatz darunter. Danach ein
  zentrierter zweizeiliger Kopf und zwei Kontaktblöcke: erst Bild links / Fläche rechts,
  dann Fläche links / Bild rechts. Am Fuß beginnt der Navy-Footer.
- Buttons/Komponenten: Beide Kontaktblöcke enden in einem Outline-Button (weiße
  Füllung, dünne Navy-Kontur, Radius ca. 8 px, ca. 360×46 px bzw. ca. 378×46 px,
  Navy-Label ca. 15 px, kein Icon) — die Seite verwendet in ihrem gesamten Verlauf
  keinen einzigen gefüllten gelben CTA, obwohl beide Buttons klare
  Konversionsziele sind. Das ist die auffälligste Abweichung von der CTA-Sprache der
  übrigen Routen. Die Prozesskarten tragen keine Ziffern und keine Icons, anders als
  „So funktioniert's" (Sektion 50).
- Typo: Karten-Überschriften zweizeilig ca. 21 px Weight 600 Navy, Kartentext ca. 15 px
  in Sekundärgrau. Kopf ca. 34 px Weight 600 plus Unterzeile ca. 30 px grau.
  Blocktitel ca. 17 px Weight 600, Blocktext ca. 15–16 px grau.
- Farbe/Fläche: Weiß mit grauen Flächen. Ein Screenshot-Bild im ersten Kontaktblock
  liegt auf einer gelb-orangen Formfläche, die schräg darunter hervorschaut — das
  einzige Gelb der Seite und wieder reine Dekoration ohne Aktion.
- Abstände/Rhythmus: Karten-Innenpadding ca. 28 px, ca. 145 px Karten → Kopf,
  ca. 90 px Kopf → erster Kontaktblock, ca. 45 px zwischen den Kontaktblöcken.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: `P-STEPS-3` (Abweichung: ohne Ziffern) + Kandidat: Kontaktblock mit
  Outline-CTA

---

## Seite: /waermepumpe-rechner

### 75 — Vollbild-Rechner als Dialog über abgedunkelter Szene [waermepumpe-rechner-desktop-00-fold.png | -]
- Anordnung: Die einzige Route ohne Navbar und ohne normalen Seitenaufbau: eine weiße
  Dialogfläche (x 255–1185, y 78–735, ca. 930×657 px) sitzt mittig über einer
  bildschirmfüllenden Renderszene. Innen zentriert der Titel, darunter die
  Fortschrittsleiste, darunter linksbündig die Frage und ein zweispaltiges Kachelraster
  (2×5, Kachelbreite ca. 350 px, Zeilenhöhe ca. 68 px). Unter der Dialogfläche steht
  freistehend ein TÜV-Siegel auf dem Hintergrundbild.
- Buttons/Komponenten: Kacheln wie in Sektion 57 — weiße Zeilen mit weichem Schatten,
  Radius ca. 6–8 px, echtes Landeswappen links (ca. 34×34 px), Navy-Label ca. 16 px;
  die Auffang-Kachel ohne Wappen mit zentriertem Label. Fortschrittsleiste wie
  Sektion 48 (grüne Spur mit Kreis-Haken, Label „10% geschafft" ca. 11 px). Kein
  Weiter-Button, kein Zurück-Pfeil im ersten Schritt — die Kachelwahl ist der einzige
  Weg vorwärts. Der Dialog hat keine sichtbare Kontur und keinen Radius an der
  Oberkante, er steht als reines Rechteck.
- Typo: Titel ca. 28 px Weight 600 Navy zentriert, Frage ca. 21 px Weight 600
  linksbündig. Wieder die Mischachse aus Sektion 48: zentrierter Kopf über
  linksbündiger Frage.
- Farbe/Fläche: Der Hintergrund ist ein Haus-Render (Terrasse, Wärmepumpe, Wallbox,
  Speicher), stark aufgehellt und entsättigt, sodass er als Textur wirkt statt als
  Bild — ein Wash über dem ganzen Viewport. Die Dialogfläche ist reines Weiß bis sehr
  helles Grau. Kein Gelb außer im TÜV-Siegel.
- Abstände/Rhythmus: Ca. 45 px Dialog-Oberkante → Titel, ca. 45 px Titel →
  Fortschrittsleiste, ca. 42 px → Frage, ca. 35 px → Kacheln, Kachelabstand ca. 20 px
  horizontal und ca. 18 px vertikal, ca. 55 px vom letzten Kachelrand zur
  Dialog-Unterkante.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Vollbild-Rechner als Dialog über gewaschener Szene

### 76 — Reduzierter Footer der Rechner-Route [waermepumpe-rechner-desktop-02-y130.png | -]
- Anordnung: Die Seite ist nur ca. 1080 px hoch. Unter der Renderszene schließt eine
  weiße Leiste (ca. 100 px hoch) mit einer einzigen zentrierten Zeile aus vier
  Textlinks ab. Kein Navy-Footer, keine Siegelreihe, kein Linkraster, keine gelbe
  Kuppel — der Standardfooter (Sektion 16) fehlt auf dieser Route vollständig.
- Buttons/Komponenten: Nur vier Textlinks nebeneinander mit ca. 30 px Abstand, ohne
  Trenner, ohne Unterstrich, ohne Icon. Der Sprachumschalter und die Social-Icons des
  Standardfooters fehlen ebenfalls.
- Typo: Links ca. 15 px Weight 400 in Sekundärgrau — kleiner und leiser als die
  Footer-Links in Sektion 16.
- Farbe/Fläche: Weiß. Die Route enthält damit keine einzige Navy-Fläche.
- Abstände/Rhythmus: Ca. 40 px Bildkante → Linkzeile, ca. 40 px Linkzeile →
  Seitenende.
- Mobil: keine Mobile-Shots für diese Route vorhanden — nicht geprüft.
- Pattern: Kandidat: Minimalfooter für Funnel-Seiten
