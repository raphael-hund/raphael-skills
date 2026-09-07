# Schmidt & Co / farisschmidt.de — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Grundwerte (Pixelmessung per Pillow auf den PNG, Regionen-Dominanz):
Grundfläche `#fafafa`, Karten `#ffffff`, Akzent `#424bee`, Ink/Dunkelfläche `#0d0f32`,
blass-blaue Tönung `#f0f1f9`/`#f1f1f9`, Erfolgs-Grün `#00bf00` (Matrix-Haken).
Alle mit "gemessen" markierten Werte stammen aus diesen Messungen; alles andere ist
als Schätzung gekennzeichnet.

Globaler Hinweis: In **allen** Shots steht unten links das Cookie-Overlay als weiße
Karte (~340×130, Radius ~12) mit fetter Frage-Zeile, gefülltem Pill-Button
`#424bee` (gemessen) und hellgrauem Pill daneben, darunter unterstrichener
Datenschutz-Link. Es überdeckt jeweils die linke untere Bildecke — in der
Projekt-Galerie, im Founder-Bereich und im FAQ-Block verdeckt es Teile der linken
Spalte. Unten rechts sitzt zusätzlich ein schwarzer runder WhatsApp-FAB (~96 px)
mit blauem Punkt-Badge oben links. Beides ist Overlay, keine Sektion.

---

## Seite: /

### 01 — Floating-Pill-Navbar [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Freistehende weiße Leiste, die über dem Inhalt schwebt statt am Rand zu kleben — ca. 80 px vom linken und rechten Viewportrand eingerückt, ~24 px Abstand nach oben. Drei Zonen in einer Zeile: Logo-Lockup links, Link-Reihe optisch mittig, CTA rechts. Der CTA hängt bündig an der rechten Innenkante und überragt die Leistenhöhe leicht nach unten, sodass die Pille aus der Leiste herauszuwachsen scheint.
- Buttons/Komponenten: Leiste selbst ist eine Pille mit ~48 px Radius, Fläche `#ffffff` auf `#fafafa`-Grund (gemessen), sehr flacher Schatten. Primär-CTA ist eine vollgefüllte Pille `#424bee` (gemessen, Regionen-Dominanz 76 %), Radius = halbe Höhe (~22 px), weißer Text, rechts ein separater heller Kreis (~26 px) mit dünnem Pfeil nach rechts darin — der Pfeil sitzt in einem eigenen Kreis, nicht frei neben dem Text. Nav-Links ohne Kasten, reiner Text; der aktive Link steht in dunklem Ink, die inaktiven deutlich heller ausgegraut.
- Typo: Wortmarke ~19 px, halbfett, Grotesk, mit vorangestelltem Bildzeichen (zwei diagonale Schwünge in Akzentblau). Nav-Links ~15 px Regular. CTA-Label ~15 px Medium. Kein Caps, kein Letterspacing.
- Farbe/Flaeche: Weiß auf `#fafafa`; genau ein farbiges Element in der ganzen Leiste — der CTA. Logo-Bildzeichen ebenfalls blau, Wortmarke schwarz-ink.
- Abstaende/Rhythmus: Leistenhöhe ~68 px, Innenpadding links/rechts ~24 px; Abstand zwischen den Nav-Links ~40 px. Viel Luft in der Mitte, weil die vier Links nicht ausfüllen, sondern zentriert schweben.
- Mobil: Leiste wird deutlich schmaler und auf zwei Elemente reduziert — nur Bildzeichen (ohne Wortmarke) links, Burger-Icon (drei Striche) rechts. Nav-Links und CTA verschwinden komplett in das Menü. Auf `projekte__mk-boersenhandel-mobile-00-fold.png` identisch.
- Pattern: Kandidat: Floating-Pill-Navbar mit Pfeil-Kreis-CTA

### 02 — Typo-Hero mit Produkt-Mockup [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Streng einspaltig und mittelachsig, kein Split, kein Foto. Vertikale Sequenz: Trust-Pill, H1, Lead, CTA-Zeile, darunter das Produkt-Mockup. Das Mockup ist kein Vollbild, sondern eine breite helle Karte, die unten aus dem Fold herausläuft und angeschnitten bleibt — die Fold-Kante schneidet sie bewusst. Über dem Mockup liegt rechts überlappend eine kleine weiße Performance-Karte (Website Performance, +120 %, Balkenreihe in Gelb-zu-Orange-Verlauf), links unten analog eine Karte mit Tacho-Grafik und +75 %-Chip (sichtbar in `home-desktop-02-y750.png`). Diese Karten sind absolut positioniert und brechen über die Mockup-Kante hinaus.
- Buttons/Komponenten: Genau ein gefüllter CTA im Fold — Pille `#424bee` (gemessen), Höhe ~48 px, Radius = halbe Höhe, weißer Text ~16 px, rechts wieder der abgesetzte helle Pfeil-Kreis. Rechts daneben, durch einen dünnen vertikalen Trennstrich getrennt, ein Webflow-Certified-Partner-Badge als eigenständige blaue Marke (nicht als Button gestylt, keine Pille — rechteckig mit kleinem Radius). Trust-Pill über der H1: helle graue Pille, links ein Avatar-Stack aus drei überlappenden runden Fotos plus ein „+40"-Kreis in Dunkel, rechts zweizeiliger Caps-Text.
- Typo: Hierarchie Trust-Pill (Caps, ~11 px, gesperrt, ~0.08em Letterspacing geschätzt) → H1 → Lead. H1 ~60 px, dreizeilig, gemischter Satz: das erste Schlüsselwort steht in Instrument-Serif-Kursiv in `#424bee`, der gesamte Rest in schwerer Grotesk in `#0d0f32` (gemessen). Verhältnis H1:Lead grob 60:18, also ~3,3:1. Lead in mittlerem Grau, zweizeilig, deutlich schmaler gesetzt als die H1.
- Farbe/Flaeche: Fläche `#fafafa`. Im Hintergrund liegt ein sehr blasses, großes Gitternetz (dünne helle Linien, ~130 px Raster), das nur an den Rändern und um das Mockup herum sichtbar wird. Akzent sitzt an genau drei Stellen: Serif-Wort, CTA-Pille, Webflow-Badge.
- Abstaende/Rhythmus: Von der Navbar bis zur Trust-Pill ~70 px, Pill bis H1 ~35 px, H1 bis Lead ~45 px, Lead bis CTA ~50 px, CTA bis Mockup ~60 px. Sehr großzügig, klar atmend; die H1 selbst ist eng geführt (Zeilenabstand ~1,05).
- Mobil: Alles gestapelt und zentriert. Trust-Pill wird schmaler und bricht die Caps-Zeile auf zwei Zeilen. H1 fällt auf ~28 px, jetzt vierzeilig, das Serif-Wort bleibt in Zeile 1. CTA wird zur nahezu vollbreiten Pille (~350 px, Rand ~20 px) mit dem Pfeil-Kreis ganz rechts außen. Das Webflow-Badge rutscht unter den CTA in eine eigene Zeile statt daneben. Mockup schrumpft stark und wird vom Cookie-Overlay teilweise überdeckt.
- Pattern: Kandidat: Typo-Hero ohne Foto mit Serif-Kursiv-Schlüsselwort

### 03 — Logo-Leiste [home-desktop-02-y750.png | -]
- Anordnung: Eine einzige horizontale Reihe, sieben Logos plus ein achtes rechts angeschnittenes, gleichmäßig auf die volle Inhaltsbreite verteilt, alle auf gemeinsamer optischer Mittellinie. Kein Rahmen, keine Karte, keine Trennstriche.
- Buttons/Komponenten: Keine. Nur Original-Wortmarken der Kunden in unterschiedlicher Eigen-Typografie (Serif, Grotesk, Script gemischt) — bewusst nicht vereinheitlicht.
- Typo: Fremdlogos, daher keine eigene Hierarchie. Größen sind auf optisches Gewicht angeglichen, nicht auf Pixelhöhe.
- Farbe/Flaeche: `#fafafa`-Grundfläche. Logos in Graustufen bis Schwarz, teils leicht ausgegraut — kein Akzentblau in dieser Zeile, damit sie sich dem Hero unterordnet.
- Abstaende/Rhythmus: Sehr schmales Band, Bandhöhe nur ~60 px, davor ~90 px Luft zum Mockup, danach ~180 px zur nächsten Sektion. Die Leiste ist bewusst dünn und leise.
- Mobil: In den Mobile-Slices nicht als eigene lesbare Zeile isolierbar; nicht separat dokumentiert.
- Pattern: `P-PROOF-STRIP`

### 04 — Pain-Sektion, drei Karten [home-desktop-02-y750.png | -]
- Anordnung: Zentrierter Kopf (H2 zweizeilig + Lead), darunter ein 3-Spalten-Grid mit gleich hohen Karten und gleicher Gutter-Breite (~24 px). Jede Karte ist zweigeteilt: oben ein Illustrationsfeld, das die volle Kartenbreite einnimmt und randlos oben abschließt, unten ein Textblock. Alle drei Illustrationen sitzen auf gleicher Höhe, alle drei H3 beginnen auf gleicher Grundlinie.
- Buttons/Komponenten: Karten mit ~12 px Radius, weiß bis sehr hell, feine 1-px-Kontur in hellem Grau, extrem flacher Schatten. Die Illustrationsfelder tragen einen blass-lila Verlauf mit Punktraster-Textur oben links; darin liegen abstrahierte UI-Fragmente (Browserfenster mit Ampelpunkten, gestapelte Karten, Icon-Kacheln), keine Fotos. In Karte 2 und 3 sitzen kleine dunkle Label-Pillen („Deine Webseite", „Andere Webseiten") und ein dunkler Kreis mit ≠-Zeichen als Verbinder. Kein Button in der Sektion.
- Typo: H2 ~44 px, zweizeilig, Grotesk halbfett, komplett in Ink — hier ausnahmsweise **ohne** Serif-Akzent. Lead ~15 px hellgrau, zweizeilig, schmal. H3 in der Karte ~20 px halbfett, zweizeilig. Kartentext ~14,5 px, hellgrau, dreizeilig. Verhältnis H2:H3 ~2,2:1.
- Farbe/Flaeche: Sektionsfläche bleibt `#fafafa`, Karten heben sich in Weiß ab. Der einzige Farbeinsatz ist das blass-lila Illustrationsfeld — kein gesättigtes Blau, kein Akzent-CTA. Die Sektion ist bewusst farbarm.
- Abstaende/Rhythmus: Sektions-Padding oben ~150 px. Kopf bis Kartenreihe ~55 px. Karten-Innenpadding ~28 px, Illustration nimmt ~55 % der Kartenhöhe. Zwischen H3 und Fließtext ~14 px. Dicht im Text, luftig zwischen den Blöcken.
- Mobil: In `home-mobile-05-y1688.png`/`home-mobile-06-y2110.png` als Einzelspalte gestapelt, Karten volle Breite mit ~20 px Seitenrand, Illustration bleibt oben.
- Pattern: Kandidat: Pain-Karten-Triptychon mit UI-Illustration (nahe `P-OFFER-PAIR`, aber drei statt zwei)

### 05 — Werk-Galerie „Ergebnisse" [home-desktop-03-y1500.png | home-mobile-07-y2532.png]
- Anordnung: Zentrierte einzeilige H2, darunter ein 5×2-Raster aus zehn Screenshot-Kacheln. Alle Kacheln exakt gleich breit, gleiche Höhe, gleiche Lücke (~18 px) — ein sehr strenges, gleichförmiges Raster ohne Masonry, ohne hervorgehobene Hero-Kachel. Die Kacheln sind oben und unten hart beschnitten, zeigen also Ausschnitte echter Seiten, keine gerahmten Mockups.
- Buttons/Komponenten: Keine Buttons, keine Overlays, keine Hover-Labels sichtbar (statischer Shot). Kacheln mit sehr kleinem Radius (~6 px geschätzt), kein Rahmen, kein Schatten — die Bildinhalte selbst tragen die Sektion.
- Typo: Nur die H2, ~44 px: „Ergebnisse," in Grotesk-Ink, danach „die für sich sprechen" in Instrument-Serif-Kursiv `#424bee` (gemessen). Kein Lead, kein Eyebrow — die Sektion springt direkt vom Titel ins Raster.
- Farbe/Flaeche: `#fafafa` als Bühne. Die Kacheln sind selbst sehr farbig und überwiegend dunkel (schwarze und dunkelblaue Kundenseiten), wodurch das Raster als kompakter dunkler Block auf hellem Grund wirkt — ein bewusster Hell-Dunkel-Wechsel ohne eigene Flächenfarbe.
- Abstaende/Rhythmus: H2 bis Raster ~60 px. Rasterblock ~290 px hoch. Danach ~185 px Luft zur nächsten Sektion. Innerhalb des Rasters sehr dicht, außen sehr luftig — starker Dichtekontrast.
- Mobil: Wird von 5 auf **2 Spalten** reduziert, weiterhin gleich hohe Kacheln, Lücke ~10 px; das Raster wird dadurch fünfreihig und deutlich höher. H2 bricht auf zwei Zeilen, das Serif-Kursiv wandert in die zweite Zeile und bleibt zentriert.
- Pattern: `P-GALLERY`

### 06 — Bento „Was unsere Flaggschiff Webseiten anders machen" [home-desktop-04-y2250.png | -]
- Anordnung: Zweistufiges Bento. Obere Reihe zwei gleich hohe, gleich breite Karten (je ~50 %); untere Reihe drei gleich breite Karten (je ~33 %) mit derselben Gutter. Innerhalb der Karten ist der Aufbau invertiert zur Pain-Sektion: hier steht der **Text oben** (H3 + Beschreibung, beide zentriert) und die Grafik darunter. In Karte 1 überlappen zwei Browser-Screenshots einander versetzt; in Karte 2 sitzt ein eigenes weißes Chart-Panel mit Balkendiagramm in der Karte, also eine Karte in der Karte.
- Buttons/Komponenten: Karten ~12 px Radius, Fläche sehr hell (heller Verlauf gegen Weiß), 1-px-Kontur. In Karte 2 ein grüner Chip „+75 %" mit Pill-Radius oben rechts im Chart-Panel — der einzige grüne Punkt der Sektion. Der hervorgehobene Balken im Chart ist ein blauer Verlaufsbalken mit Glow, alle anderen Balken neutralgrau. Untere Karten tragen große zentrierte Icon-Kompositionen (Kreisbahnen mit Icon-Kacheln, Blitz-Symbol, Webflow-Logo im Strahlenkranz) in Blau-Lila-Verlauf.
- Typo: H2 ~44 px zweizeilig mit Serif-Kursiv-Span „Flaggschiff Webseiten" in Blau. Lead ~15 px hellgrau zweizeilig, zentriert. Karten-H3 ~20 px halbfett, zentriert. Karten-Body ~15 px hellgrau, zentriert, ein bis zwei Zeilen. Auffällig: In dieser Sektion ist **alles** in den Karten zentriert, während die Pain-Karten linksbündig waren.
- Farbe/Flaeche: `#fafafa`-Bühne, Karten fast weiß. Akzent tritt nur in den Grafiken auf (blauer Balken, blau-lila Icons) und im grünen Chip — keine farbige Kartenfläche, keine dunkle Karte.
- Abstaende/Rhythmus: Sektions-Padding oben ~180 px. Kopf bis erste Kartenreihe ~65 px, zwischen den Reihen ~28 px. Karten-Innenpadding ~32 px oben. Die Grafikflächen sind großzügig und nehmen mehr Platz ein als der Text — Verhältnis Text:Grafik grob 1:2.
- Mobil: In `home-mobile-08-y2954.png` ff. als Einzelspalte gestapelt in derselben Reihenfolge (2 breite, dann 3 schmale); Grafiken behalten ihre Position unter dem Text.
- Pattern: Kandidat: Bento 2+3 mit Text oben, Grafik unten

### 07 — Projekt-Slider „Ausgewählte Projekte" [home-desktop-06-y3750.png | -]
- Anordnung: Zentrierter Kopf, darunter ein horizontaler Karten-Slider. Die aktive Karte steht mittig auf voller Lesbarkeit; links und rechts ragen die Nachbarkarten angeschnitten und deutlich abgeblasst ins Bild — ein klassisches Peek-Layout, das die Wischbarkeit sichtbar macht. Innerhalb der aktiven Karte zweispaltiger Split: links Textspalte (Kategorie-Eyebrow, Projektname, Beschreibung, Tag-Pills), rechts ein Bildbereich mit **zwei überlappenden** Screenshots — einer dunkel oben rechts, einer hell darunter versetzt, sodass sie sich gegenseitig überdecken.
- Buttons/Komponenten: Slider-Karte mit ~16 px Radius, sehr helle Fläche. Tag-Pills: Outline-Pillen mit dünner blauer 1-px-Kontur, transparenter Füllung und blauem Label (`#424bee` im Text gemessen), Höhe ~34 px, Radius = halbe Höhe. Slider-Steuerung darunter zentriert: links und rechts je ein dunkler Kreisbutton (~40 px, `#0d0f32`) mit weißem Chevron, dazwischen eine Punkt-Reihe aus elf Indikatoren, bei der der aktive Punkt zu einem breiten blauen Balken (~34 px) gestreckt ist statt nur eingefärbt zu werden. Darunter ein sekundärer CTA als dunkle Pille `#0d0f32` (gemessen, 76 %) mit weißem Text und weißem Pfeil-Kreis rechts — formgleich zum blauen Primär-CTA, nur andere Füllung.
- Typo: H2 ~44 px, „Ausgewählte" Grotesk-Ink + „Projekte" Serif-Kursiv-Blau. Lead ~15 px, einzeilig, hellgrau. Kategorie-Eyebrow ~12 px Caps, stark gesperrt (~0.12em geschätzt), grau. Projektname ~26 px halbfett. Beschreibung ~15 px hellgrau, dreizeilig.
- Farbe/Flaeche: `#fafafa`; die Karte ist nur eine Spur heller. Farbe kommt aus den Screenshot-Inhalten und den blauen Tag-Konturen. Die dunklen Steuer-Kreise und der dunkle CTA sind die einzigen dunklen Vollflächen.
- Abstaende/Rhythmus: Kopf bis Slider ~120 px. Karte ~480 px hoch. Slider bis Punkt-Navigation ~60 px, Navigation bis CTA ~70 px. Innerhalb der Textspalte: Eyebrow bis Name ~240 px Abstand (der Text sitzt vertikal mittig, der Eyebrow oben in der Karte) — eine bewusst große Lücke, die die Karte atmen lässt.
- Mobil: Nicht in einem eigenen Mobile-Slice sauber isolierbar; nicht separat dokumentiert.
- Pattern: `P-GALLERY` (Slider-Variante)

### 08 — Vergleichs-Matrix „Endlich der richtige Partner" [home-desktop-07-y4500.png | -]
- Anordnung: Erstmals **kein** zentrierter Kopf: die H2 steht linksbündig am linken Rasterrand, die Legende als eigene Komponente rechtsbündig auf derselben Höhe — ein Kopf-Split über die volle Breite. Darunter eine echte Tabelle mit 5 Spalten (Merkmalsspalte + 4 Anbieterspalten) und 6 Zeilen, alle Zellen gleich hoch (~94 px), Merkmale linksbündig, alle Bewertungs-Icons exakt spaltenmittig.
- Buttons/Komponenten: Tabelle in weißer Karte mit ~12 px Außenradius und 1-px-Rahmen; horizontale Trennlinien in sehr hellem Grau zwischen allen Zeilen, vertikale Trennlinien nur zwischen den Spalten. Die eigene Spalte ganz rechts ist flächig blass-blau `#f0f1f9` (gemessen, 95 %) hinterlegt und trägt im Kopf statt eines Textlabels das Logo-Lockup. Bewertungs-Icons als gefüllte Kreise: rotes X, grünes Häkchen `#00bf00` (gemessen), gelbes Warndreieck. Legende oben rechts ist eine eigene weiße Pill-Karte mit drei durch senkrechte Striche getrennten Icon-plus-Label-Paaren.
- Typo: H2 ~40 px, „Endlich der" Grotesk-Ink + „richtige Partner" Serif-Kursiv-Blau, einzeilig. Spaltenköpfe ~15 px Regular, zentriert. Merkmalszeilen ~14,5 px, linksbündig, Ink. Legendenlabels ~13 px.
- Farbe/Flaeche: Weiße Tabelle auf `#fafafa`. Die einzige getönte Fläche ist die eigene Spalte — sie gewinnt allein durch die blasse Blaufläche und das Logo, nicht durch fette Typo oder eine farbige Umrandung. Ampelfarben (Rot/Gelb/Grün) sind hier die einzige Stelle im ganzen Seiten-Design mit einer Mehrfarb-Semantik.
- Abstaende/Rhythmus: Sektions-Padding oben ~200 px. Kopfzeile bis Tabelle ~50 px. Zellenpadding horizontal ~24 px. Gleichmäßiger Zeilentakt ohne Ausreißer; die Tabelle wirkt ruhig und sachlich statt beworben.
- Mobil: Nicht in einem eigenen Mobile-Slice sauber isolierbar; nicht separat dokumentiert.
- Pattern: Kandidat: Wettbewerbs-Matrix mit getönter Eigenspalte

### 09 — Prozess-Timeline „In 4 Schritten" [home-desktop-09-y6000.png | -]
- Anordnung: Zweispaltig mit durchlaufender vertikaler Achse ganz links. Linke Spalte trägt die Schritt-Texte, rechte Spalte je eine große Illustrations-Karte auf gleicher Höhe wie ihr Schritt. Die Achse ist eine ~4 px schmale vertikale Linie, deren oberer Teil in Akzentblau mit Verlauf gefüllt und deren unterer Teil hellgrau ungefüllt ist — ein Scroll-Fortschrittsbalken. Auf der Achse sitzen runde Knoten: der aktive Knoten ist ein großer weißer Kreis mit blauem Ring, die kommenden Knoten sind kleinere weiße Kreise mit grauem Punkt, spätere ein voller dunkler Punkt. Auffällig: Schritt 1 ist voll deckend, Schritt 2 leicht, Schritt 3 stark ausgeblasst — die Sektion staffelt ihre eigene Opazität nach unten.
- Buttons/Komponenten: Illustrations-Karten mit ~14 px Radius, sehr hell, 1-px-Kontur, innen jeweils ein weiteres verschachteltes Panel (Farbfeld-Palette mit Lupe, großes „Aa"-Typo-Panel, Webflow-Canvas mit Werkzeugleiste, Browserfenster mit URL-Zeile). Leistungspunkte als Liste mit blauem, gefülltem Kreis-Häkchen (~18 px) links vor jeder Zeile. Keine Buttons in der Sektion.
- Typo: Schrittnummer sehr groß (~40 px) aber in blassem Grau — sie ist Dekor, nicht Hierarchie. Darunter H3 ~28 px halbfett Ink, direkt darunter eine graue Unterzeile ~15 px, dann die Häkchenliste ~15 px Ink. Die Nummer überlappt optisch mit der H3, weil dazwischen fast kein Abstand liegt (~4 px) — bewusst enges Paar.
- Farbe/Flaeche: `#fafafa` durchgehend. Akzent nur an drei Stellen: Fortschrittsachse, Häkchen-Kreise, blaue Details in den Illustrationen. Keine dunkle Fläche.
- Abstaende/Rhythmus: Abstand zwischen zwei Schritten ~380 px — sehr große vertikale Takte, die Sektion ist die längste der Seite. Textspalte ~440 px breit, Illustrations-Karte ~510 px, dazwischen ~90 px Lücke.
- Mobil: In `home-mobile-15-y5908.png` ff. gestapelt; die Achse rutscht an den linken Bildrand, Illustration steht unter dem jeweiligen Text.
- Pattern: `P-PROCESS-3` (Abweichung: vier Schritte)

### 10 — Video-Testimonial + Zitatkarten [home-desktop-11-y7500.png | -]
- Anordnung: Zentrierte H2, darunter eine große weiße Rahmenkarte, die ein 16:9-Videofeld nahezu randlos umschließt (~20 px Innenrand). Unter dem Video innerhalb derselben Karte eine Sterne-Reihe und ein Zitat. Es folgt (in `home-desktop-13-y9000.png`) eine 3-Spalten-Reihe gleich hoher Zitatkarten und darunter eine einzelne breite Zitatkarte über die volle Breite — die Sektion geht also von 1 auf 3 auf 1 Spalte.
- Buttons/Komponenten: Play-Button als runder Kreis (~78 px) in Akzentblau mit weißem Dreieck, exakt bildmittig. Darunter eine native Videoleiste mit Scrubber, Zeitanzeige, Lautstärkeregler und Vollbild-Icon. Zitatkarten: weiß, ~12 px Radius, 1-px-Kontur, sehr flacher Schatten. Personenzeile am Kartenfuß: rundes Portraitfoto (~44 px) links, daneben zweizeilig Name halbfett und Firma in Grau. Sterne als kleine blaue Fünfer-Reihe (~12 px) über dem Zitat. In der breiten Schlusskarte sitzt rechts ein freigestelltes Portraitfoto vor einer großen blau-lila Anführungszeichen-Grafik, die als Hintergrundform aus der Karte herausragt.
- Typo: H2 ~44 px mit Serif-Kursiv-Span „Kunden sagen". Zitattext ~16 px, normal gewichtet, in Ink, mit klarem Zeilenabstand (~1,6). Name ~16 px halbfett, Firma ~14 px hellgrau. In der Video-Karte liegt ein Serif-Kursiv-Label „Kundenstimme" direkt über dem Namen — dasselbe Serif-Motiv wandert also bis in die Bildunterschrift.
- Farbe/Flaeche: `#fafafa`-Bühne, weiße Karten. Das Video ist der dunkelste Block der Sektion und schafft dadurch einen starken Hell-Dunkel-Kontrast, ohne dass eine Fläche eingefärbt wäre. Akzent nur in Play-Button, Sternen und der Zitat-Grafik.
- Abstaende/Rhythmus: H2 bis Videokarte ~115 px. Videokarte ~660 px hoch. Zwischen den drei Zitatkarten ~24 px Gutter, Karten-Innenpadding ~30 px. Zur breiten Schlusskarte ~24 px. Die Sektion ist deutlich dichter gepackt als die Timeline.
- Mobil: In `home-mobile-23-y9284.png` ff. gestapelt, Zitatkarten volle Breite untereinander.
- Pattern: `P-TESTIMONIAL`

### 11 — Founder „Dein Ansprechpartner" [home-desktop-13-y9000.png, home-desktop-15-y10500.png | -]
- Anordnung: Asymmetrischer Zweispalter mit sehr ungleicher Gewichtung: links eine schmale Spalte (~320 px) mit Eyebrow, Portraitfoto und darunter einer blauen Namenskarte; rechts eine breite Textspalte (~800 px) mit dem Manifest-Text. Die blaue Karte schließt **direkt** unter dem Foto an, ohne Lücke — Foto und Karte bilden einen zusammenhängenden Block, bei dem das Foto oben und die Farbfläche unten sitzt. Der rechte Text beginnt auf Höhe der Fotomitte, nicht bündig oben.
- Buttons/Komponenten: Blaue Karte flächig `#424bee` (gemessen, 90 %), ~12 px Radius. Darin: kursive Serif-Zeile in Weiß, Name in weißer Grotesk halbfett, Rolle darunter kleiner, dann eine dünne weiße Trennlinie über die Kartenbreite, darunter ein **eingebetteter** CTA als dunkle Pille `#0d0f32` (gemessen, 77 %) mit weißem Pfeil-Kreis rechts. Dieser CTA ist zweizeilig: Label oben, darunter kleiner ein grüner Punkt plus Verfügbarkeitszeile — ein Status-Marker im Button statt daneben. Eyebrow-Zeile darüber trägt links einen blauen Ring-Punkt als Bullet.
- Typo: Eyebrow ~12 px Caps, gesperrt, grau, mit blauem Punkt. Serif-Kursiv „Dein Ansprechpartner:" ~19 px weiß. Name ~24 px halbfett. Rolle ~14 px. CTA-Label ~16 px halbfett, Statuszeile ~11 px. Rechte Textspalte sehr groß gesetzt: ~30 px Zeilen in hellem Grau, dazwischen eine komplett in Serif-Kursiv-Blau gesetzte Absatzzeile — hier trägt der Serif-Akzent einen ganzen Satz, nicht nur ein Wort.
- Farbe/Flaeche: Erste gesättigte Vollfläche der Seite (die blaue Karte) — bis hierher war Blau nur in Buttons und Wörtern. Der Rest bleibt `#fafafa`. Der dunkle Button auf der blauen Karte erzeugt eine Dreistufigkeit Blau → Dunkel → Weiß auf engem Raum.
- Abstaende/Rhythmus: Sektions-Padding oben ~180 px. Karten-Innenpadding ~24 px. Zwischen Textspalten-Absätzen ~40 px. Die linke Spalte ist dicht gepackt, die rechte sehr luftig — der Dichtekontrast trägt die Asymmetrie.
- Mobil: In `home-mobile-27-y10972.png` ff. gestapelt: Foto und blaue Karte oben, Manifest-Text darunter.
- Pattern: `P-TEAM`

### 12 — Nächste Schritte „Du wünschst dir eine neue Webseite?" [home-desktop-15-y10500.png | -]
- Anordnung: Zentrierter Kopf, darunter **eine** breite helle Container-Karte, die alle drei Schritte gemeinsam umschließt — nicht drei Einzelkarten. Innerhalb der Karte drei gleich breite Spalten, jede zentriert mit Icon-Kreis oben, H3, Beschreibung. Zwischen den Icon-Kreisen laufen horizontale gestrichelte blaue Verbindungslinien, die die Sequenz sichtbar machen und exakt auf der Kreis-Mittelachse liegen.
- Buttons/Komponenten: Container-Karte ~16 px Radius, sehr helle Fläche, 1-px-Kontur. Icon-Kreise ~76 px Durchmesser, gefüllt mit einem Blau-Verlauf (`#676ef1` gemessen im Kreisinneren), darin weiße Linien-Icons (Telefon, Handschlag, Rakete). Darunter, außerhalb der Karte und zentriert, ein dunkler Pill-CTA `#0d0f32` mit weißem Pfeil-Kreis — wieder zweizeilig mit grünem Punkt und Verfügbarkeitszeile, formgleich zum CTA in der Founder-Karte.
- Typo: H2 ~42 px zweizeilig, „Du wünschst dir eine" Grotesk-Ink + „neue Webseite?" Serif-Kursiv-Blau in Zeile 2. Lead ~15 px einzeilig grau. H3 ~19 px halbfett zentriert. Beschreibung ~14,5 px hellgrau, dreizeilig zentriert.
- Farbe/Flaeche: `#fafafa`-Bühne. Die Karte ist nur minimal heller. Farbe steckt ausschließlich in den drei Icon-Kreisen und der gestrichelten Linie; der CTA ist dunkel, nicht blau — damit bleibt der blaue Fold-CTA der stärkere.
- Abstaende/Rhythmus: Kopf bis Karte ~55 px. Karten-Innenpadding ~48 px oben/unten, ~40 px seitlich. Icon bis H3 ~50 px. Karte bis CTA ~50 px. Gleichmäßig und ruhig.
- Mobil: In `home-mobile-31-y12660.png` ff. gestapelt; die gestrichelten Verbinder entfallen bzw. sind vertikal nicht mehr als Linie erkennbar.
- Pattern: `P-PROCESS-3`

### 13 — FAQ-Akkordeon [home-desktop-15-y10500.png, home-desktop-17-y11920.png | -]
- Anordnung: Asymmetrischer Zweispalter: links eine schmale Spalte mit H2 und einem CTA, rechts die Akkordeon-Liste über etwa zwei Drittel der Breite. Die linke Spalte bleibt beim Scrollen inhaltlich statisch und trägt nur Titel plus Handlungsaufforderung; alle sechs Fragen stehen rechts untereinander.
- Buttons/Komponenten: Jede Frage ist eine eigenständige weiße Karte (~10 px Radius, 1-px-Kontur, flacher Schatten) mit ~28 px Innenpadding — also kein klassisches Listen-Akkordeon mit Trennlinien, sondern gestapelte Einzelkarten mit ~16 px Abstand. Rechts in jeder Karte ein dünner Chevron nach unten (grau, ~16 px). Alle Karten sind im Shot geschlossen, keine Antwort sichtbar. Links unten ein blauer Pill-CTA „Termin buchen" mit Pfeil-Kreis, teilweise vom Cookie-Overlay verdeckt.
- Typo: H2 links ~42 px (im Shot vom Overlay teilweise überdeckt). Fragen ~18 px halbfett Ink, linksbündig; längere Fragen brechen zweizeilig und die Karte wächst mit, wodurch die Kartenhöhen bewusst ungleich sind.
- Farbe/Flaeche: `#fafafa`, weiße Karten, keine Akzentfläche. Der einzige Farbträger ist der linke CTA.
- Abstaende/Rhythmus: Kartenabstand ~16 px, Kartenhöhe geschlossen ~100 px (zweizeilige Frage ~136 px). Sektions-Padding oben ~150 px.
- Mobil: In `home-mobile-35-y14348.png` ff. einspaltig; Kopf und CTA stehen über der Fragenliste.
- Pattern: `P-FAQ`

### 14 — Schluss-CTA „Bereit, endlich als Marktführer aufzutreten?" [home-desktop-17-y11920.png | -]
- Anordnung: Eine einzelne, sehr breite Karte über die volle Rasterbreite, Inhalt streng zentriert und vertikal mittig: H2, Lead, CTA, Trust-Zeile. Der Karteninhalt nimmt nur etwa die mittlere Hälfte der Kartenbreite ein — links und rechts bleibt großzügig leere Musterfläche stehen.
- Buttons/Komponenten: Karte ~16 px Radius, sehr helle Fläche mit zwei überlagerten Mustern: ein großflächiges feines Liniengitter (~95 px Raster) über die ganze Karte und ein Punktraster-Halbkreis, der oben mittig hinter der H2 dichter wird und nach unten ausfranst. Primär-CTA wieder die blaue Pille `#424bee` mit weißem Pfeil-Kreis — identisch zum Hero-CTA, damit schließt die Seite formal mit demselben Element, mit dem sie öffnete. Darunter der Avatar-Stack (drei überlappende Rundfotos) plus Caps-Label und ein kurzer senkrechter Trennstrich rechts.
- Typo: H2 ~46 px zweizeilig, Zeile 1 Grotesk-Ink, Zeile 2 komplett Serif-Kursiv-Blau — hier trägt eine ganze Zeile den Serif-Akzent, die stärkste Ausprägung des Motivs auf der Seite. Lead ~15 px zweizeilig grau. Trust-Label ~11 px Caps gesperrt.
- Farbe/Flaeche: Bewusst **keine** Akzent-Vollfläche und keine dunkle Fläche — der Schluss-CTA bleibt hell und arbeitet nur mit Muster und dem einen blauen Button. Das ist die auffälligste Abweichung vom üblichen Akzent-Schlussband.
- Abstaende/Rhythmus: Kartenhöhe ~470 px, Innenpadding oben ~85 px. H2 bis Lead ~30 px, Lead bis CTA ~65 px, CTA bis Trust-Zeile ~28 px.
- Mobil: In `home-mobile-41-y16880.png` gestapelt und zentriert, CTA nahezu vollbreit.
- Pattern: `P-CTA-END` (Abweichung: helle Musterkarte statt Akzentfläche)

### 15 — Footer mit Wortmarken-Wasserzeichen [home-desktop-17-y11920.png | -]
- Anordnung: Zweistufig. Oben eine sehr niedrige Utility-Zeile in drei Zonen: Copyright links, zwei Rechtslinks mittig, zwei Social-Icons rechts. Darunter — und optisch dahinterliegend — eine riesige Wortmarke „Schmidt & Co", die über die volle Viewportbreite läuft, unten angeschnitten wird und als Wasserzeichen fungiert. Die Utility-Zeile liegt **über** dem oberen Rand der Riesenschrift, es gibt also eine bewusste Überlappung.
- Buttons/Komponenten: Keine Buttons. Social-Icons als dünne Linien-Glyphen (Instagram, TikTok) in hellem Grau. Rechtslinks als reiner Text ohne Unterstreichung.
- Typo: Utility-Text ~14 px, hellgrau. Wasserzeichen-Wortmarke ~180 px, dieselbe Grotesk halbfett wie die Navbar-Wortmarke, nur in extremer Größe.
- Farbe/Flaeche: Wasserzeichen in blassem Blau-Lila (`#f1f1f9` gemessen als dominante Nicht-Weiß-Farbe der Region) auf Weiß — so hell, dass es Textur statt Text ist. Kein dunkler Footer, kein Farbblock.
- Abstaende/Rhythmus: Utility-Zeile ~60 px hoch. Der Wasserzeichen-Block darunter ~200 px, hart am Seitenende abgeschnitten. Sehr leise für einen Seitenabschluss.
- Mobil: In `home-mobile-42-y17253.png` gestapelt; Wortmarke entsprechend kleiner, weiterhin angeschnitten.
- Pattern: Kandidat: Wasserzeichen-Footer mit übergroßer Wortmarke

### Zustaende (Hover) [home-desktop-hover-01-Leistungen.png | home-desktop-click-y11250-00-Wie_viel_kostet_eine_Web.png]
- Methodik-Befund zuerst, damit nichts überinterpretiert wird: Der Hover-Pass lief mit `--static`, und genau dieses Flag schaltet Transitions und Animationen hart ab. Die sieben Hover-Shots `home-desktop-hover-00-Home.png`, `home-desktop-hover-01-Leistungen.png`, `home-desktop-hover-02-Referenzen.png`, `home-desktop-hover-03-Prozess.png`, `home-hover-00.png`, `home-hover-01.png` und `home-hover-02.png` sind byte-identisch untereinander und byte-identisch zu `home-desktop-00-fold.png` (gleiche MD5, Pixeldiff exakt 0). Das ist ein Capture-Artefakt, **kein** Beleg dafür, dass die Seite keine Hover-Stile hat. Hover-Farbe, -Schatten, -Unterstrich und -Transform auf Nav-Links, Buttons und Karten sind aus diesem Material **nicht lesbar** und bleiben ungeprüft; sie brauchen einen Lauf ohne `--static`.
- Was dagegen real belegt ist, sind Klick-/Offen-Zustände aus demselben Pass. Im FAQ-Akkordeon zeigt `home-desktop-click-y11250-00-Wie_viel_kostet_eine_Web.png` den geöffneten Eintrag „Wie viel kostet eine Webseite?": Der Zustandswechsel läuft ausschließlich über das Icon rechts — geschlossene Zeilen tragen einen dünnen dunklen Chevron nach unten ohne Fläche, die geöffnete Zeile einen gefüllten hellgrauen Kreis (~30 px) mit Chevron nach oben darin. Die Kartenfläche selbst bleibt weiß, der Radius bleibt gleich, es kommt kein Rahmen und kein Schatten hinzu.
- Die geöffnete Karte wächst nur in der Höhe: Unter der Frage erscheint der Antworttext in ~16 px Grau mit ~1,55 Zeilenabstand, die darunterliegenden Fragen werden nach unten geschoben. Kein Ein-/Ausblenden per Overlay, keine Farbänderung der Frage-Typo, kein Akzentblau im offenen Zustand — der Akkordeon-Zustand ist bewusst monochrom gelöst. Gegenprobe in `home-desktop-click-y11250-02-Sind_die_Webseiten_SEO_o.png`: dort ist derselbe Kreis-Chevron an der jeweils angeklickten Zeile, alle übrigen Zeilen stehen wieder auf dem geschlossenen Chevron, es ist also ein Single-Open-Akkordeon.
- Auf der Unterseite bestätigt `checkliste-mobile-click-y0-00-menu.png` den zweiten echten Zustand: Das mobile Burger-Icon wechselt beim Öffnen auf eine graue gefüllte Kachel (~64 px, kleiner Radius) und darunter klappt die Navigation als linksbündige Textliste (Home, Leistungen, Referenzen, Prozess) in ~16 px Grau auf weißer Fläche auf — kein Vollbild-Overlay, sondern ein Panel, das den Seiteninhalt nach unten drückt. Der Header-CTA taucht im offenen Menü nicht auf.
- Pattern: Kandidat: Monochromes Single-Open-Akkordeon mit Kreis-Chevron als einzigem Zustandsträger

---

## Seite: /termin

### 16 — Konversions-Seite ohne Navigation, Kalender-Embed [termin-desktop-00-fold.png | termin-mobile-00-fold.png]
- Anordnung: Radikal reduziert und einspaltig zentriert. Keine Navbar, kein Footer, keine Sektionsfolge — nur Logo-Lockup, H1, Lead und darunter das Buchungs-Embed. Das Embed selbst ist ein Dreispalter in einer weißen Karte: links Anbieter-Panel (Avatar, Name, Titel, Häkchenliste, Dauer, Meeting-Tool), Mitte Monatskalender, rechts eine scrollende Slot-Liste. Die drei Spalten sind durch dünne vertikale Linien getrennt, nicht durch Lücken.
- Buttons/Komponenten: Kalender-Zellen sind quadratische Kacheln mit kleinem Radius (~6 px); der aktive Tag ist eine ausgefüllte blaue Kachel `#424bee` mit weißer Ziffer und kleinem Punkt darunter, buchbare Tage sind hellgraue Kacheln, nicht buchbare nur Zahlen ohne Fläche. Slot-Buttons rechts sind volle Breite, Outline-Stil: weiße Füllung, 1-px-graue Kontur, ~8 px Radius, zentrierte Zeitangabe, gleichmäßig ~8 px gestapelt. Oben rechts ein 12h/24h-Umschalter als Segmented Control (graue Pill-Hülle, aktives Segment als weiße Kachel). Monatsnavigation als zwei schlanke Chevrons. Häkchenliste im linken Panel nutzt grüne Emoji-Häkchen statt Icon-Glyphen.
- Typo: H1 ~36 px halbfett Grotesk, **ohne** Serif-Kursiv-Akzent — die einzige H1 der Site ohne das Serif-Motiv. Lead ~15 px grau, zweizeilig. Im Embed: Name ~14 px grau, Titel ~19 px halbfett, Listen ~14 px, Wochentagsköpfe ~12 px Caps gesperrt. Die Embed-Typografie weicht sichtbar von der Site-Typografie ab (fremde Systemschrift), das Embed ist erkennbar zugekauft.
- Farbe/Flaeche: `#fafafa`-Grund, weiße Embed-Karte. Akzent nur an einer einzigen Stelle: der ausgewählte Tag. Ansonsten reines Grau-Weiß-System.
- Abstaende/Rhythmus: Logo bis H1 ~75 px, H1 bis Lead ~20 px, Lead bis Embed ~30 px. Das Embed reicht bis über die Fold-Kante hinaus. Sehr wenig Luft im Vergleich zur Startseite — die Seite drängt zum Kalender.
- Mobil: In `termin-mobile-00-fold.png`/`termin-mobile-02-y422.png` bricht das Embed vom Dreispalter auf eine Spalte: Anbieter-Panel oben, darunter Kalender, darunter Slot-Liste. Logo und H1 bleiben zentriert; die H1 bricht mehrzeilig.
- Pattern: Kandidat: Konversions-Landeseite ohne Navigation mit Kalender-Embed

---

## Seite: /empfehlungsprogramm

### 17 — Navbar [empfehlungsprogramm-desktop-00-fold.png | -]
- Wie Seite `/`, Sektion 01 — identische Floating-Pill-Navbar, gleiche Zonen, gleicher blauer Pfeil-Kreis-CTA. Einziger Unterschied: kein Link ist als aktiv hervorgehoben, alle vier Nav-Labels stehen in gleichem Grau.
- Pattern: Kandidat: Floating-Pill-Navbar mit Pfeil-Kreis-CTA

### 18 — Typo-Hero mit Eyebrow [empfehlungsprogramm-desktop-00-fold.png | empfehlungsprogramm-mobile-00-fold.png]
- Anordnung: Einspaltig zentriert, aber schlanker als der Home-Hero: Eyebrow, H1, Lead, ein CTA, darunter eine reine Textzeile als Proof. Kein Mockup, kein Bild, keine Karte — der Hero endet nach der Textzeile und die Fläche wechselt darunter hart zu Weiß.
- Buttons/Komponenten: Genau ein Button: blaue Pille `#424bee` mit weißem Label und Pfeil-Kreis rechts, hier etwas kompakter als auf der Startseite (~52 px hoch, ~300 px breit). Keine Trust-Pill mit Avataren wie auf `/`, stattdessen eine schlichte graue Textzeile mit Mittelpunkt-Trennern (·) zwischen drei Belegen — dieselbe Aussage, aber als Typo statt als Komponente gelöst.
- Typo: Eyebrow ~12 px Caps in Akzentblau, stark gesperrt (~0.15em geschätzt) — auf `/` war der Eyebrow grau, hier blau. H1 ~54 px einzeilig: „Empfehlen" Grotesk-Ink + „lohnt sich." Serif-Kursiv-Blau. Lead ~17 px grau, dreizeilig, mittig, spürbar größer als der Home-Lead. Proof-Zeile ~14 px hellgrau.
- Farbe/Flaeche: `#fafafa` mit einem sehr feinen, gleichmäßigen Punktraster über die gesamte Herofläche (auf `/` war das Hintergrundmuster ein Liniengitter, hier sind es Punkte). Die Sektion endet mit einer harten Kante zur weißen Fläche darunter — ein klarer Flächenwechsel statt eines weichen Übergangs.
- Abstaende/Rhythmus: Navbar bis Eyebrow ~75 px, Eyebrow bis H1 ~35 px, H1 bis Lead ~45 px, Lead bis CTA ~50 px, CTA bis Proof-Zeile ~35 px, dann ~90 px bis zur Flächenkante.
- Mobil: Gestapelt und zentriert, H1 bricht zweizeilig, CTA wird nahezu vollbreit, Proof-Zeile bricht auf zwei bis drei Zeilen um.
- Pattern: Kandidat: Typo-Hero ohne Foto mit Serif-Kursiv-Schlüsselwort

### 19 — Drei nummerierte Schritt-Karten [empfehlungsprogramm-desktop-00-fold.png, empfehlungsprogramm-desktop-02-y750.png | -]
- Anordnung: Zentrierter Kopf aus Eyebrow und H2, darunter drei gleich breite, gleich hohe Karten nebeneinander. Anders als in Sektion 12 sind es hier **drei getrennte Karten** ohne umschließenden Container und ohne Verbindungslinien; die Sequenz wird allein über die Ziffern getragen. Karteninhalt linksbündig, nicht zentriert.
- Buttons/Komponenten: Karten weiß, ~12 px Radius, 1-px-Kontur in hellem Grau, sehr flacher Schatten, ~28 px Innenpadding. Oben links in jeder Karte ein gefüllter blauer Kreis (~44 px, `#424bee`) mit weißer Ziffer 1/2/3 — Nummernmarker als Kreis, nicht als Text-Eyebrow. Keine Icons, keine Illustrationen, keine Buttons in den Karten.
- Typo: Eyebrow ~12 px Caps blau gesperrt. H2 ~38 px, hier **komplett in Grotesk-Ink ohne Serif-Span** — die Sektionsüberschriften dieser Seite verzichten auf das Serif-Motiv, das nur H1 und Schlusssektion tragen. Karten-H3 ~19 px halbfett, ein- bis zweizeilig. Karten-Body ~15 px grau, drei bis vier Zeilen.
- Farbe/Flaeche: Sektionsfläche ist **weiß**, nicht `#fafafa` — der Wechsel zur Herofläche ist dadurch sichtbar. Karten liegen in sehr hellem Grau/Weiß auf Weiß und werden fast nur über ihre Kontur lesbar. Einziger Farbträger sind die drei Nummernkreise.
- Abstaende/Rhythmus: Kopf bis Karten ~60 px, Gutter ~28 px, Kartenhöhe ~260 px. Sektionsende ~90 px unter den Karten, dann Flächenwechsel.
- Mobil: In `empfehlungsprogramm-mobile-03-y844.png` ff. einspaltig gestapelt, Karten volle Breite, Nummernkreis bleibt oben links.
- Pattern: `P-PROCESS-3`

### 20 — Prämien-Paar [empfehlungsprogramm-desktop-02-y750.png | empfehlungsprogramm-mobile-05-y1688.png]
- Anordnung: Zentrierter Kopf (Eyebrow, H2), darunter genau zwei gleich hohe, gleich breite Karten nebeneinander, mittig gruppiert — sie nehmen zusammen nur etwa die mittleren zwei Drittel der Rasterbreite ein, links und rechts bleibt Rand. Darunter eine zentrierte, zweizeilige graue Fußnote als Relativierung.
- Buttons/Komponenten: Beide Karten ~12 px Radius, 1-px-Kontur, ~32 px Innenpadding, Inhalt linksbündig. Unterschied im Detail: Karte 1 ist rein weiß, Karte 2 trägt eine blass-blaue Tönung, die von oben nach unten leicht zunimmt, und eine minimal bläulichere Kontur — die zweite Option wird also nur über eine sehr zurückhaltende Flächentönung bevorzugt, nicht über Badge, Rahmen oder Größe. Keine Buttons, keine Preise, keine Icons.
- Typo: Eyebrow ~12 px Caps blau. H2 ~38 px Grotesk-Ink, einzeilig, ohne Serif-Span. Karten-H3 ~21 px halbfett. Body ~15 px grau, dreizeilig. Fußnote ~14 px hellgrau, zentriert.
- Farbe/Flaeche: Sektionsfläche zurück auf `#fafafa`, Karten weiß bzw. blass-blau getönt. Die Seite wechselt damit im Takt hell-grau → weiß → hell-grau → dunkel.
- Abstaende/Rhythmus: Kopf bis Karten ~75 px, Gutter ~32 px, Kartenhöhe ~190 px, Karten bis Fußnote ~48 px, Fußnote bis Sektionsende ~120 px.
- Mobil: Untereinander gestapelt, beide volle Breite; die Tönung der zweiten Karte bleibt erhalten und ist im Stapel besser erkennbar als nebeneinander.
- Pattern: `P-OFFER-PAIR`

### 21 — Dunkle Schluss-CTA-Karte [empfehlungsprogramm-desktop-02-y750.png, empfehlungsprogramm-desktop-03-y883.png | -]
- Anordnung: Eine breite dunkle Karte, die nicht bis an den Viewportrand läuft, sondern mit ~245 px Seitenabstand als eingerückter Block auf hellem Grund liegt. Inhalt streng zentriert: H2, Lead, CTA. Die Karte hat oben abgerundete Ecken und läuft nach unten aus dem Slice.
- Buttons/Komponenten: Kartenfläche `#0d0f32` (gemessen, 99,2 % Regionen-Dominanz), ~16 px Radius, darüber ein sehr feines dunkles Punktraster als Textur. CTA ist eine blaue Pille `#424bee` mit weißem Label und weißem Pfeil-Kreis — derselbe Button wie auf hellem Grund, unverändert; die Site invertiert ihren Primär-CTA auf dunkler Fläche also nicht.
- Typo: H2 ~40 px zweizeilig: Grotesk in **Weiß** plus Serif-Kursiv-Span, der hier in Akzentblau `#424bee` (gemessen) auf dunklem Grund steht — der Serif-Akzent behält seine Farbe, statt auf Weiß oder ein helleres Blau zu wechseln, was ihn auf der dunklen Fläche deutlich zurücknimmt. Lead ~15 px in hellem Grau-Blau, zweizeilig.
- Farbe/Flaeche: Der einzige dunkle Vollflächenblock dieser Seite und damit der klare Schlusspunkt. Hell-Dunkel-Wechsel erfolgt hart an der Kartenkante, ohne Verlauf.
- Abstaende/Rhythmus: Karten-Innenpadding oben ~95 px, H2 bis Lead ~28 px, Lead bis CTA ~50 px. Sehr großzügig, die Karte wirkt als eigener Raum.
- Mobil: In `empfehlungsprogramm-mobile-06-y2110.png`/`empfehlungsprogramm-mobile-07-y2439.png` als vollbreite dunkle Fläche mit gestapeltem, zentriertem Inhalt.
- Pattern: `P-CTA-END` (dunkle Variante)

### 22 — Footer [empfehlungsprogramm-desktop-03-y883.png | -]
- Wie Seite `/`, Sektion 15 — Utility-Zeile plus übergroßes Wortmarken-Wasserzeichen, identische Aufteilung und Farbigkeit.
- Pattern: Kandidat: Wasserzeichen-Footer mit übergroßer Wortmarke

---

## Seite: /projekte/jantronic

### 23 — Navbar [projekte__jantronic-desktop-00-fold.png | -]
- Wie Seite `/`, Sektion 01. Kein Nav-Link aktiv markiert.
- Pattern: Kandidat: Floating-Pill-Navbar mit Pfeil-Kreis-CTA

### 24 — Projekt-Hero mit Badge und Doppel-CTA [projekte__jantronic-desktop-00-fold.png | projekte__jantronic-mobile-00-fold.png]
- Anordnung: Einspaltig zentriert, sehr kompakt: Kategorie-Badge, H1, Lead, Tag-Pill-Reihe, CTA-Paar. Auffällig ist die Überlappung am Fuß: die beiden CTA-Buttons sitzen so eng unter den Tag-Pills, dass sie diese teilweise **überdecken** — die blaue CTA-Pille schiebt sich sichtbar über die untere Kante der linken Tag-Pill. Das wirkt wie ein Layoutfehler und nicht wie eine gestalterische Absicht, ist aber in beiden Projekt-Shots identisch reproduziert. Die beiden CTAs stehen zudem nicht auf gleicher Grundlinie: die blaue Pille sitzt ~5 px tiefer als die dunkle.
- Buttons/Komponenten: Kategorie-Badge als graue Outline-Pille mit hellem Fond `#f1f1f9` (gemessen), Caps-Label, ~34 px hoch. Tag-Pills als Outline-Pillen mit dünner blauer Kontur und blauem Label, transparent gefüllt, ~30 px hoch. CTA-Paar: links Primär als blaue Pille `#424bee` mit **großem** weißem Pfeil-Kreis (~42 px, deutlich größer als der Pfeil-Kreis in der Navbar), rechts Sekundär als dunkle Pille `#0d0f32` (gemessen) mit reinem Textlabel **ohne** Pfeil-Kreis — der Unterschied zwischen primär und sekundär wird also doppelt markiert: über die Füllung und über die An-/Abwesenheit des Icons.
- Typo: Badge ~12 px Caps gesperrt grau. H1 ~50 px Grotesk-Ink, einzeilig, **ohne** Serif-Kursiv — auf Projektseiten trägt die H1 den Markennamen des Kunden und verzichtet deshalb auf das Serif-Motiv. Lead ~16 px grau, zweizeilig. Tag-Labels ~14 px.
- Farbe/Flaeche: `#fafafa` mit demselben blassen Liniengitter wie auf der Startseite, hier deutlich sichtbar im unteren Herobereich. Akzent an drei Stellen: Tag-Konturen, Primär-CTA, Pfeil.
- Abstaende/Rhythmus: Navbar bis Badge ~72 px, Badge bis H1 ~30 px, H1 bis Lead ~35 px, Lead bis Tags ~40 px, Tags bis CTAs ~0 px (Überlappung). Danach ~180 px Luft bis zur ersten Screenshot-Karte. Der Hero ist mit ~500 px sehr flach.
- Mobil: In `projekte__jantronic-mobile-00-fold.png` und `projekte__mk-boersenhandel-mobile-00-fold.png` gestapelt: Badge, H1, Lead, Tag-Pills nebeneinander in einer Zeile, dann die beiden CTAs **untereinander** als vollbreite Pillen — blau oben, dunkel darunter. Der Pfeil-Kreis der blauen Pille rückt an den rechten Rand. Die Desktop-Überlappung verschwindet im Stapel.
- Pattern: Kandidat: Projekt-Hero mit Badge, Tag-Pills und Doppel-CTA

### 25 — Werk-Vollansicht in Rahmenkarten [projekte__jantronic-desktop-00-fold.png, projekte__jantronic-desktop-02-y750.png | -]
- Anordnung: Der Seitenkörper besteht aus mehreren sehr hohen weißen Rahmenkarten, in denen jeweils ein zusammenhängender Vollbild-Ausschnitt der gelieferten Kundenwebseite liegt. Die Karten stehen untereinander mit deutlicher Lücke (~65 px) und laufen jeweils über die volle Rasterbreite. Die Screenshots sind oben und unten hart beschnitten, sodass eine Karte an einer beliebigen Stelle der Kundenseite beginnt und endet — es wird nicht auf Sektionsgrenzen kaschiert.
- Buttons/Komponenten: Rahmenkarte ~16 px Radius, reinweiße Fläche, 1-px-Kontur, kein Browser-Chrome, keine Adressleiste, kein Geräterahmen — die fremde Seite steht nackt in der Karte. Alle sichtbaren Buttons in diesem Bereich (grüner „Bedarf senden"-Button, Outline-Sekundärbutton, grüne Chips, Badge-Grafik) gehören zum **Kundendesign**, nicht zum Schmidt-&-Co-Design; ihr Grün und ihre eckigeren Radien stehen bewusst im Kontrast zum blauen Wirtssystem.
- Typo: Die Typografie innerhalb der Karten ist die des Kunden (schwere Grotesk, grüne Caps-Eyebrows). Vom Wirtsystem trägt dieser Abschnitt keine eigene Überschrift — es gibt keine Sektions-H2 zwischen den Karten, die Bilder stehen unkommentiert.
- Farbe/Flaeche: `#fafafa`-Bühne, weiße Karten. Das Wirtsystem tritt in diesem Bereich farblich komplett zurück; die einzige Schmidt-&-Co-Farbe im Viewport ist die Navbar-CTA-Pille oben.
- Abstaende/Rhythmus: Kartenhöhen ~880 px und mehr, Lücke ~65 px. Sehr großer, ruhiger Takt — die Seite ist im Kern eine Bildstrecke.
- Mobil: In `projekte__jantronic-mobile-02-y422.png` ff. dieselben Karten in voller Breite und entsprechend schmaler; der Kundenscreenshot wird mitskaliert, nicht neu beschnitten, wodurch die Kundentypografie sehr klein wird — Details darin sind bei 390 nicht lesbar.
- Pattern: `P-GALLERY` (Werk-Vollansicht)

### 26 — Schluss-CTA [projekte__jantronic-desktop-06-y3019.png | -]
- Anordnung: Wie Seite `/`, Sektion 14 — eine helle Musterkarte über die volle Breite mit zentriertem Inhalt. Unterschiede zur Startseite: die H2 ist **einzeilig** und trägt **keinen** Serif-Kursiv-Span, sie steht komplett in Grotesk-Ink; die Trust-Zeile mit Avatar-Stack unter dem Button entfällt ersatzlos. Der CTA steht dadurch als letztes Element allein.
- Buttons/Komponenten: Identische blaue Pille `#424bee` mit weißem Pfeil-Kreis. Kartenmuster identisch: Liniengitter plus Punktraster-Halbkreis oben mittig.
- Typo: H2 ~40 px einzeilig. Lead ~15 px zweizeilig grau. Deutlich flacherer Kontrast als auf `/`, weil der Serif-Akzent fehlt.
- Farbe/Flaeche: Hell, keine Akzentfläche, keine dunkle Fläche.
- Abstaende/Rhythmus: Kartenhöhe ~370 px, also ~100 px flacher als die Startseiten-Variante; Innenpadding oben ~85 px, Lead bis CTA ~90 px.
- Mobil: In `projekte__jantronic-mobile-05-y1577.png` gestapelt und zentriert.
- Pattern: `P-CTA-END` (Abweichung: helle Musterkarte statt Akzentfläche)

### 27 — Footer [projekte__jantronic-desktop-06-y3019.png | -]
- Anordnung: Hier ist der Footer im Slice **doppelt** sichtbar (Utility-Zeile bei ~1243 px und noch einmal bei ~1465 px), weil der Scroll-Schritt am Dokumentende überlappt — ein Capture-Artefakt, kein doppelter Footer im Design.
- Aufbau ansonsten wie Seite `/`, Sektion 15: Copyright links, Datenschutz und Impressum mittig, zwei Social-Icons rechts. Das Wortmarken-Wasserzeichen ist in diesem Slice nicht angeschnitten sichtbar.
- Pattern: Kandidat: Wasserzeichen-Footer mit übergroßer Wortmarke

---

## Seite: /projekte/mk-boersenhandel

### 28 — Projektseiten-Template, zweite Instanz [projekte__mk-boersenhandel-desktop-00-fold.png | projekte__mk-boersenhandel-mobile-00-fold.png]
- Anordnung: Pixelgleich zu Sektion 24 aufgebaut — Badge, H1, Lead, zwei Tag-Pills, Doppel-CTA in derselben Anordnung, mit derselben Überlappung von CTA-Paar und Tag-Pills und demselben ~5-px-Höhenversatz zwischen blauer und dunkler Pille. Die Positionen von Badge, H1, Lead, Tags und Buttons sind auf der Y-Achse identisch zu `jantronic`; nur die Textlängen unterscheiden sich. Das belegt ein striktes Template statt individueller Layouts.
- Buttons/Komponenten: Identisch — graue Badge-Pille, zwei blaue Outline-Tag-Pills, blaue Primär-Pille mit großem Pfeil-Kreis, dunkle Sekundär-Pille ohne Icon.
- Typo: Identische Skala. H1 ~50 px Grotesk-Ink ohne Serif-Span; Lead hier zweizeilig und dadurch etwas breiter laufend als bei `jantronic`.
- Farbe/Flaeche: `#fafafa` mit Liniengitter. Die erste Screenshot-Karte darunter ist bei diesem Kunden sehr dunkel (schwarz-blauer Verlauf), sodass der Hell-Dunkel-Sprung direkt unter dem Hero deutlich härter ausfällt als bei `jantronic`, wo die Kundenseite hell ist. Das Wirtsystem gleicht das nicht aus — es rahmt beide Fälle gleich.
- Abstaende/Rhythmus: Identisch zu Sektion 24: Hero ~500 px flach, danach ~180 px bis zur ersten Rahmenkarte.
- Mobil: Wie Sektion 24 mobil — CTAs untereinander vollbreit, Tag-Pills nebeneinander in eigener Zeile, Überlappung aufgelöst.
- Pattern: Kandidat: Projekt-Hero mit Badge, Tag-Pills und Doppel-CTA

### 29 — Werk-Vollansicht, Schluss-CTA und Footer [projekte__mk-boersenhandel-desktop-02-y750.png, projekte__mk-boersenhandel-desktop-06-y3019.png | -]
- Wie `/projekte/jantronic`, Sektionen 25 bis 27: weiße Rahmenkarten mit hart beschnittenen Vollansichten der Kundenseite, danach die helle Musterkarte als Schluss-CTA und der Wasserzeichen-Footer. Auch hier zeigt der letzte Slice die Utility-Zeile doppelt (Capture-Überlappung am Dokumentende).
- Einziger sichtbarer Unterschied: die Kundenseite ist durchgehend dunkel gestaltet, wodurch die weißen Rahmenkarten als helle Ränder um dunkle Bildblöcke wirken, während bei `jantronic` Karte und Inhalt beide hell sind.
- Pattern: `P-GALLERY` (Werk-Vollansicht) + `P-CTA-END` (helle Musterkarte)

---

## Seite: /check

### 30 — Chromeloser Lead-Lander, Eyebrow-Pille und Serif-Kursiv-H1 [check-desktop-00-fold.png | check-mobile-00-fold.png]
- Anordnung: Wie `/termin` ein Konversions-Template ohne Navbar und ohne Footer, aber deutlich enger geführt. Alles sitzt in einer einzigen zentrierten Spalte von ~460 px Breite, die auf 1440 px Viewport von sehr breiten leeren Flanken (je ~490 px) eingefasst wird — der Leerraum links und rechts ist die eigentliche Gestaltung. Vertikale Sequenz ohne Ausnahme: Eyebrow-Pille, H1, Lead, drei nummerierte Schritt-Karten, zwei Formularfelder, CTA, Kleingedrucktes, Trust-Zeile. Kein Bild, kein Mockup, keine Illustration auf der ganzen Seite. In `check-desktop-00-fold.png` passt die komplette Seite in den ersten Fold, es gibt praktisch nichts zu scrollen.
- Buttons/Komponenten: Eyebrow-Pille oben ist eine flache Kapsel mit Fläche `#f1f1f9` (gemessen, 85,9 % Regionen-Dominanz), Radius = halbe Höhe (~16 px), dünner blasser Rand, darin links ein kleiner runder Punkt in `#424bee` (gemessen) und Caps-Text in demselben Blau. Die drei Schritt-Karten sind weiße Rechtecke (`#ffffff`, ~95 % der Region) mit ~14 px Radius, 1-px-hellgrauer Kontur und sehr flachem Schatten; links in jeder Karte ein quadratisches Zahlen-Badge (~38 px, Radius ~10 px) mit Verlauf um `#666df0`/`#7d83f2` (gemessen) und weißer Ziffer. Die beiden Eingabefelder sind vollbreite Pillen (Radius = halbe Höhe, ~26 px), Fläche `#ffffff` (94,9 % gemessen), 1-px-Kontur in hellem Grau, Placeholder linksbündig in Grau. Der Primär-CTA ist die auffälligste Abweichung von der Startseite: **kein flaches `#424bee`**, sondern ein horizontaler Verlauf von `#7278f1` links nach `#5961ef` rechts (Pixelreihe y=710 gemessen), vollbreit wie die Felder, Radius = halbe Höhe, weißes Label ~17 px und rechts ein separater weißer Kreis mit dunklem Pfeil. Zum Vergleich misst dieselbe Reihe im Startseiten-CTA `home-desktop-00-fold.png` durchgehend flaches `#424bee`.
- Typo: Eyebrow ~12 px Caps, stark gesperrt (~0,12em geschätzt), in Akzentblau. H1 ~40 px, zweifarbig und zweistilig im selben Satz — Grotesk halbfett in `#0d0f32` plus das Schlüsselwort „verklagt" in Instrument-Serif-Kursiv in Akzentblau, exakt dasselbe Motiv wie in Sektion 02, nur kleiner. Das Fragezeichen nach dem Serif-Wort steht wieder in Grotesk, der Stilwechsel endet also mitten im Wort-Umfeld. Lead ~15,5 px in Grau, dreizeilig, mit einem in Ink gesetzten Fettteilsatz am Ende („In 10 Minuten weißt du, wo du stehst.") — Hervorhebung über Farbe und Gewicht statt über eine eigene Zeile. Karten-Titel ~15 px halbfett Ink, direkt gefolgt vom grauen Zusatz in derselben Zeile und Größe.
- Farbe/Flaeche: Grundfläche durchgehend `#fafafa` (in der Region links der Spalte zu 100 % gemessen, also wirklich flach). Darüber liegt sehr blass ein Verlauf nach Blau-Lila in den oberen Ecken, am deutlichsten oben rechts. Farbe kommt an genau vier Stellen vor: Eyebrow-Pille samt Punkt, Serif-Wort, die drei Zahlen-Badges, der CTA. Alles andere ist Weiß, Grau und Ink.
- Abstaende/Rhythmus: Von der Oberkante bis zur Eyebrow-Pille ~55 px, Pille bis H1 ~40 px, H1 bis Lead ~30 px, Lead bis erste Karte ~50 px, Karten untereinander ~14 px, letzte Karte bis erstes Feld ~35 px, Felder untereinander ~12 px, Feld bis CTA ~20 px, CTA bis Kleingedrucktes ~15 px. Der Rhythmus verdichtet sich also von oben nach unten systematisch — großzügig im Kopf, eng im Formular.
- Mobil: In `check-mobile-00-fold.png` bleibt die Reihenfolge exakt gleich, die Spalte geht auf ~350 px bei ~20 px Seitenrand. H1 fällt auf ~26 px und bricht auf zwei Zeilen, wobei das Serif-Wort komplett in Zeile 2 rutscht. Die Schritt-Karten behalten Badge links und brechen ihren Text zweizeilig. Das Cookie-Overlay verdeckt hier das zweite Eingabefeld und den CTA vollständig; beide sind erst in `check-mobile-02-y110.png` frei lesbar.
- Pattern: Kandidat: Chromeloser Lead-Lander mit Eyebrow-Pille, Schritt-Karten und Verlauf-CTA

---

## Seite: /ressourcen/kostenlose-checkliste

### 31 — Zweite URL desselben Lead-Landers [ressourcen__kostenlose-checkliste-desktop-00-fold.png | ressourcen__kostenlose-checkliste-mobile-00-fold.png]
- Anordnung: Identisch zu Sektion 30. Der Vergleich von `ressourcen__kostenlose-checkliste-desktop-00-fold.png` mit `check-desktop-00-fold.png` zeigt dieselbe zentrierte Spalte, dieselbe Eyebrow-Pille, dieselbe H1 mit Serif-Kursiv-Wort, dieselben drei Schritt-Karten, dieselben zwei Formularfelder und denselben Verlauf-CTA an denselben Y-Positionen. Es handelt sich um dasselbe Template unter zweiter URL, nicht um eine Variante; designseitig gibt es hier nichts Eigenes zu dokumentieren.
- Buttons/Komponenten: Wie Sektion 30 — Eyebrow-Kapsel `#f1f1f9`, Zahlen-Badges mit Blau-Verlauf, Pillen-Eingabefelder, CTA mit Verlauf `#7278f1` → `#5961ef`.
- Typo: Wie Sektion 30, gleiche Skala und gleicher Stilwechsel Grotesk/Instrument-Serif-Kursiv.
- Farbe/Flaeche: Wie Sektion 30 — `#fafafa` mit blassem Blau-Lila-Verlauf in den oberen Ecken.
- Abstaende/Rhythmus: Wie Sektion 30, gleiche Verdichtung von Kopf zu Formular.
- Mobil: `ressourcen__kostenlose-checkliste-mobile-00-fold.png` entspricht `check-mobile-00-fold.png`; auch hier verdeckt das Cookie-Overlay CTA und zweites Feld, frei lesbar erst in `ressourcen__kostenlose-checkliste-mobile-02-y110.png`.
- Pattern: Kandidat: Chromeloser Lead-Lander mit Eyebrow-Pille, Schritt-Karten und Verlauf-CTA

---

## Seite: /checkliste

### 32 — Navbar [checkliste-desktop-00-fold.png | -]
- Wie Seite `/`, Sektion 01 — dieselbe Floating-Pill-Navbar mit Logo-Lockup links, vier Nav-Links mittig und blauem Pfeil-Kreis-CTA rechts. Anders als auf `/check` trägt diese Seite die volle Site-Navigation, sie ist also als reguläre Unterseite und nicht als chromeloser Lander gebaut. Der Link „Home" steht in dunklem Ink, die übrigen drei ausgegraut.
- Pattern: Kandidat: Floating-Pill-Navbar mit Pfeil-Kreis-CTA

### 33 — Werkzeug-Kopf mit Hinweisbanner und Fortschrittskarte [checkliste-desktop-00-fold.png | checkliste-mobile-00-fold.png]
- Anordnung: Zentrierter Kopf über voller Inhaltsbreite (~680 px Textspalte), darunter zwei volle Breitbausteine (~680 px) untereinander: erst ein flaches Hinweisbanner, dann eine Fortschrittskarte. Das ist der einzige Seitentyp der Site mit einem persistenten Statusobjekt direkt unter dem Hero — die Seite verhält sich wie ein Werkzeug, nicht wie eine Verkaufsseite.
- Buttons/Komponenten: Eyebrow-Pille wie in Sektion 30. Das Hinweisbanner ist ein Rechteck mit ~12 px Radius und Fläche `#efeff9` (gemessen, 90,2 % Dominanz) ohne Rand und ohne Schatten, mit zentriertem Text in Akzentblau und einem unterstrichenen Textlink „Hier freischalten →" rechts daneben — Unterstreichung als einziges Link-Signal, kein Button. Die Fortschrittskarte darunter ist weiß mit ~14 px Radius und 1-px-Kontur; sie enthält links das Label „Dein Stand", rechts den Zähler „0 von 15 gecheckt" in Grau und darunter eine vollbreite Fortschrittsleiste als sehr flache Kapsel (~6 px hoch) in `#f1f1f9` (in der Leerregion zu 100 % gemessen) — bei Nullstand ohne gefüllten Anteil.
- Typo: H1 ~38 px, zweizeilig, Grotesk-Ink mit dem Schlüsselwort „Abmahnung" in Instrument-Serif-Kursiv in Akzentblau; das Serif-Wort steht hier am Zeilenende statt am Anfang. Lead ~15,5 px Grau, dreizeilig. Bannertext ~14,5 px in Akzentblau. Kartenlabel ~15 px Ink halbfett, Zähler ~13,5 px Grau.
- Farbe/Flaeche: `#fafafa`-Grund mit demselben blassen Blau-Lila-Verlauf oben rechts wie auf `/check`. Auffällig ist die Staffelung dreier sehr ähnlicher blasser Blautöne in unmittelbarer Nähe: Eyebrow-Pille `#f1f1f9`, Hinweisbanner `#efeff9`, Fortschrittsleiste `#f1f1f9` (alle gemessen) — die Unterschiede liegen im Bereich weniger Prozent und sind mit bloßem Auge kaum trennbar.
- Abstaende/Rhythmus: Navbar bis Eyebrow ~75 px, Eyebrow bis H1 ~45 px, H1 bis Lead ~30 px, Lead bis Banner ~55 px, Banner bis Fortschrittskarte ~25 px, Karte bis erste Gruppenüberschrift ~55 px.
- Mobil: In `checkliste-mobile-00-fold.png` bricht das Hinweisbanner zweizeilig, der Freischalt-Link rutscht als eigene Zeile unter den Bannertext und behält die Unterstreichung. Die Fortschrittskarte bleibt einzeilig mit Label links und Zähler rechts.
- Pattern: Kandidat: Werkzeug-Kopf mit Fortschrittskarte und blassem Hinweisbanner

### 34 — Nummerierte Gruppen mit Checkbox-Karten [checkliste-desktop-00-fold.png, checkliste-desktop-05-y3000.png | checkliste-mobile-04-y1266.png]
- Anordnung: Der Seitenkörper ist eine lange Folge nummerierter Gruppen. Jede Gruppe beginnt mit einer Kopfzeile aus quadratischem Zahlen-Badge links und zweizeiligem Titel-plus-Unterzeile rechts daneben; darunter stapeln sich Checkbox-Karten über volle Breite. Innerhalb der Karte gilt ein strenger Zweispalter: links die Checkbox in fester Spalte (~46 px), rechts der komplette Textblock — alle Zeilen des Textblocks fluchten auf derselben linken Kante, auch über mehrere Absätze hinweg.
- Buttons/Komponenten: Zahlen-Badge ~32 px, Radius ~9 px, Blau-Verlauf wie auf `/check`, weiße Ziffer. Checkbox ist ein leeres abgerundetes Quadrat (~24 px, Radius ~7 px) mit 1,5-px-grauer Kontur und weißer Füllung, ungehakt in allen Shots. Karten weiß, ~14 px Radius, 1-px-Kontur, sehr flacher Schatten. Innerhalb vieler Karten sitzt unten ein eigener Hinweis-Chip: flaches Rechteck mit ~8 px Radius in `#f2f2fe` (gemessen, 79,4 % Dominanz) mit Text in Akzentblau, sichtbar in `checkliste-desktop-00-fold.png` und `checkliste-desktop-05-y3000.png`. Am Ende der Liste steht ein andersartiger neutraler Hinweisblock in Grau mit kleinem Info-Kreis-Icon links (`checkliste-desktop-05-y3000.png`) — bewusst ohne Blau, damit er sich von den Fixier-Chips absetzt.
- Typo: Gruppentitel ~21 px halbfett Ink, Unterzeile ~14 px Grau direkt darunter. Karten-Titel ~16 px halbfett Ink, meist einzeilig. Kartentext ~14,5 px Grau mit ~1,55 Zeilenabstand; darin werden einzelne Teilsätze in Ink und halbfett hervorgehoben, wieder Hervorhebung im Fluss statt als eigenes Element. Chip-Text ~13 px in Akzentblau.
- Farbe/Flaeche: `#fafafa`-Grund, weiße Karten, ein einziger Akzent-Blauton für Badges und Chips. Die Sektion hat keinerlei Bild, Icon-Set oder Illustration — sie trägt allein über Kartenrhythmus und Chip-Farbe.
- Abstaende/Rhythmus: Gruppenkopf bis erste Karte ~30 px, Karten untereinander ~14 px, Karten-Innenpadding ~26 px, Titel bis Text ~10 px, Text bis Chip ~14 px, Gruppenabstand ~60 px. Sehr regelmäßig, fast tabellarisch.
- Mobil: In `checkliste-mobile-04-y1266.png` bleibt der Zweispalter aus Checkbox und Text erhalten — die Checkbox rutscht nicht über den Text, sondern behält ihre linke Spalte, der Textblock wird schmaler und bricht entsprechend häufiger. Chips laufen vollbreit und werden mehrzeilig.
- Pattern: Kandidat: Checkbox-Karten-Liste mit nummerierten Gruppen und Fixier-Chip

### 35 — Dunkle Frage-Karte als Schluss-CTA [checkliste-desktop-05-y3000.png | checkliste-mobile-12-y4642.png]
- Anordnung: Nach der letzten Gruppe folgt ein einzelner dunkler Block als abgesetzte Karte mit deutlichem Seitenabstand (~380 px bis ~1060 px auf 1440 px Viewport), nicht als vollbreites Band. Inhalt streng mittelachsig gestapelt: H2, Lead, eine Punktreihe als Fortschrittsanzeige, Frage-Label, Eingabefeld, Button.
- Buttons/Komponenten: Die Karte ist dunkel in `#0d0f32` (gemessen, 50,5 % der Region) mit ~20 px Radius; darüber liegt ein sehr blasser Aufhellungs-Verlauf zur oberen rechten Ecke. Die Fortschrittsanzeige besteht aus sechs kleinen Punkten (~6 px), der erste in Akzentblau gefüllt, die übrigen dunkel-transparent — Schrittanzeige ohne Zahlen und ohne Balken. Das Eingabefeld ist eine vollbreite Pille mit dunklerer Fläche als die Karte (~`#1b1d3e` gemessen) und hellem Placeholder, ohne sichtbare Kontur. Der Button darunter ist wieder vollbreit und trägt denselben Blau-Verlauf wie auf `/check` (Pixelreihe y=960 in der Karte misst `#7379f1`), diesmal jedoch **ohne** Pfeil-Kreis — nur zentriertes weißes Label.
- Typo: H2 ~28 px, Grotesk-Weiß mit dem Schlüsselwort „selbst" in Instrument-Serif-Kursiv; auf dunkler Fläche steht das Serif-Wort in einem helleren Blau-Lila statt im normalen Akzentblau, damit es überhaupt Kontrast hat. Lead ~15 px in gedämpftem Hellgrau, zweizeilig. Frage-Label ~15,5 px halbfett Weiß. Button-Label ~16 px Weiß.
- Farbe/Flaeche: Der einzige dunkle Block dieser Seite und damit ein harter Bruch nach der durchgehend hellen Kartenliste. Die Karte wiederholt exakt das Ink `#0d0f32` aus dem globalen Grundwertsatz.
- Abstaende/Rhythmus: Karten-Innenpadding oben ~60 px, H2 bis Lead ~20 px, Lead bis Punktreihe ~40 px, Punktreihe bis Frage-Label ~35 px, Label bis Feld ~25 px, Feld bis Button ~15 px, Button bis Kartenunterkante ~55 px.
- Mobil: In `checkliste-mobile-12-y4642.png` behält die Karte ihren Seitenabstand und ihren Radius, wird aber schmaler; H2 bricht dreizeilig, Feld und Button bleiben vollbreit gestapelt.
- Pattern: `P-CTA-END`, hier als dunkle Variante statt der hellen Musterkarte

### 36 — Footer [checkliste-desktop-05-y3000.png | -]
- Wie Seite `/`, Sektion 15 — dieselbe zweistufige Anlage aus schmaler Utility-Zeile (Copyright links, „Datenschutz" und „Impressum" mittig, zwei Social-Glyphen rechts) über der übergroßen Wortmarke „Schmidt & Co" als blasses Wasserzeichen in `#f1f1f9`, unten angeschnitten. In `checkliste-desktop-05-y3000.png` überdeckt das Cookie-Overlay die linke Hälfte der Utility-Zeile, das Copyright ist dort **nicht lesbar**.
- Pattern: Kandidat: Wasserzeichen-Footer mit übergroßer Wortmarke

---

## Seite: /webflow-kurs

### 37 — Social-Gate-Lander mit gestaffelt deaktivierten Schritten [webflow-kurs-desktop-00-fold.png | webflow-kurs-mobile-00-fold.png]
- Anordnung: Wieder chromelos ohne Navbar und Footer, wieder eine zentrierte ~400-px-Spalte, aber mit einer gestalterisch eigenen Idee: Die drei Schritt-Karten sind nicht gleichwertig, sondern gestaffelt aktiv. Karte 1 steht voll ausgezeichnet, Karte 2 und 3 sind sichtbar heruntergedimmt. Der Lander erzählt seinen Ablauf also allein über Deckkraft, ohne Schloss-Icon, ohne Beschriftung und ohne Trennlinie. Reihenfolge: Eyebrow-Pille, H1, Lead, drei Schritt-Karten, CTA, Trust-Zeile. Kein Formular — anders als `/check` sammelt diese Seite keine E-Mail, sondern führt nach außen.
- Buttons/Komponenten: Eyebrow-Pille wie Sektion 30. Karte 1 ist weiß (`#ffffff`, 94,5 % gemessen) mit 1-px-Kontur und Zahlen-Badge in kräftigem Blau-Verlauf; Karte 2 misst in derselben Region `#fcfcfc` mit deutlich hellerer Kontur (`#d4d4d4`) und einem Badge, das auf blasses Grau reduziert ist — der Farbunterschied der Fläche beträgt nur wenige Prozent, die Deaktivierung wird fast ausschließlich über Text- und Badge-Kontrast getragen, nicht über die Kartenfläche. Der CTA ist eine vollbreite Pille mit dem bekannten Verlauf `#7278f1` → `#5b63f0` (Pixelreihe y=678 gemessen); links im Label sitzt ein Instagram-Glyph als Outline-Icon, rechts steht **kein** Pfeil-Kreis. Darunter eine Trust-Zeile aus kleinem Schild-Icon und grauem Text.
- Typo: H1 ~40 px einzeilig, Grotesk-Ink plus „am schnellsten" in Instrument-Serif-Kursiv in Akzentblau — hier steht das Serif-Wort am Zeilenende und ist zweiwortig. Lead ~15,5 px dreizeilig Grau mit fettem Ink-Einschub („Komplett kostenlos, ohne Werbung."). Karten-Titel ~15 px halbfett; in den gedimmten Karten sind Titel und Zusatz auf dieselbe helle Graustufe gesetzt, wodurch die Titel-Hierarchie dort komplett verschwindet. CTA-Label ~17 px Weiß.
- Farbe/Flaeche: `#fafafa` mit blassem Blau-Lila-Verlauf oben rechts, identisch zu `/check`. Genau drei farbige Elemente: Eyebrow, Badge der aktiven Karte, CTA.
- Abstaende/Rhythmus: Oberkante bis Eyebrow ~155 px — dieser Lander startet deutlich tiefer als `/check` (~55 px) und wirkt dadurch schwebender. Eyebrow bis H1 ~45 px, H1 bis Lead ~30 px, Lead bis erste Karte ~55 px, Karten untereinander ~14 px, letzte Karte bis CTA ~35 px, CTA bis Trust-Zeile ~35 px. Die ganze Seite endet bei ~760 px, darunter bleibt reine Fläche.
- Mobil: `webflow-kurs-mobile-00-fold.png` stapelt identisch bei ~350 px Spaltenbreite; H1 bricht zweizeilig mit dem Serif-Teil in Zeile 2, die Staffelung der gedimmten Karten bleibt unverändert erhalten. Das Cookie-Overlay verdeckt hier den CTA.
- Pattern: Kandidat: Social-Gate-Lander mit gedimmten Folgeschritten

---

## Seite: /ressourcen/claude-seo

### 38 — Social-Gate-Lander, zweistufige Variante [ressourcen__claude-seo-desktop-00-fold.png | ressourcen__claude-seo-mobile-00-fold.png]
- Anordnung: Dasselbe Template wie Sektion 37, aber mit zwei statt drei Schritt-Karten — Karte 1 aktiv, Karte 2 gedimmt. Dadurch rückt der gesamte Block nach oben und die Seite endet noch früher (~720 px). Bestätigt, dass die Schrittzahl ein Parameter des Templates ist und nicht Teil des Layouts.
- Buttons/Komponenten: Wie Sektion 37 — Eyebrow-Kapsel, weiße Karte mit Blau-Verlauf-Badge gegen gedimmte Karte mit grauem Badge, vollbreiter Verlauf-CTA mit Instagram-Glyph und ohne Pfeil-Kreis, darunter Schild-Icon plus Trust-Zeile. Der CTA trägt hier exakt dasselbe Label wie auf `/webflow-kurs`, ist also derselbe Ausgang.
- Typo: H1 ~40 px zweizeilig; das Serif-Kursiv-Wort steht diesmal mitten in Zeile 1 statt am Ende, der Rest der H1 läuft in Grotesk-Ink weiter. Lead ~15,5 px zweizeilig mit fettem Ink-Einschub in Zeile 2. Sonst gleiche Skala wie Sektion 37.
- Farbe/Flaeche: `#fafafa` mit blassem Blau-Lila-Verlauf oben rechts; drei farbige Elemente wie in Sektion 37.
- Abstaende/Rhythmus: Oberkante bis Eyebrow ~190 px, also noch tiefer angesetzt als `/webflow-kurs` — die kürzere Karten-Liste wird durch mehr Kopfluft ausgeglichen, sodass der optische Schwerpunkt beider Lander gleich bleibt. Übrige Abstände wie Sektion 37.
- Mobil: `ressourcen__claude-seo-mobile-00-fold.png` wie Sektion 37 mobil; Cookie-Overlay verdeckt auch hier den CTA-Bereich.
- Pattern: Kandidat: Social-Gate-Lander mit gedimmten Folgeschritten

---

## Nicht erfasst

Vollständigkeitshalber, damit nichts still weggelassen wirkt:

- `/impressum`, `/datenschutz` — per Auftrag ausgelassen (Rechtsseiten).
- Neun weitere Projekt-Detailseiten aus der Sitemap (`/projekte/adrise`, `/projekte/doerrzapf-besetzt`, `/projekte/jonah-struck`, `/projekte/katara-carwash`, `/projekte/mk-labs`, `/projekte/rasenkante-metall`, `/projekte/socialglow-media`, `/projekte/tom-und-jerry`, `/projekte/vsl-media`, `/projekte/wallstreet-models`, `/projekte/zenith-ai`) — dasselbe Massen-Template, bereits durch die zwei Exemplare in den Sektionen 24 bis 29 abgedeckt. Ein Größenvergleich der ausgelieferten HTML-Dokumente (26,3 bis 26,5 KB über alle Stichproben) stützt die Template-Gleichheit.
- Leistungs-, Preis-, Rechner-, Blog-, Magazin-, Karriere- und Team-Templates existieren auf dieser Domain **nicht**: `/leistungen`, `/preise`, `/blog`, `/projekte` (Übersicht), `/ueber-mich` und `/kontakt` liefern jeweils HTTP 404, und die Sitemap führt insgesamt nur 23 URLs. Die Site besteht ausschließlich aus Startseite, Konversions-Landern, der Checklisten-Anwendung, Projekt-Details und Rechtsseiten.
- Hover-Zustände sind mangels brauchbarem Material offen, siehe Begründung im Abschnitt „Zustaende (Hover)" unter Seite `/`.
