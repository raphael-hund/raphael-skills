# Elephant Solar — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Vorbemerkung zu den Farbwerten: Messungen mit Pillow direkt auf den PNG
(`im.getpixel`). Wo ein Messpunkt auf einem Verlauf, einer Kante oder einem
Text-Antialias sitzt, ist der Wert als solcher gekennzeichnet und der
Designwert als Schätzung ausgewiesen. Gemessene Ankerwerte, die mehrfach
wiederkehren: Lime `#e6fa00` (H1-Span `home-desktop-00-fold.png`, Stat-Zahl
und Footer-Spaltentitel), Topbar `#15402a`, Sektions-Verlauf dunkelgrün von
`#1c4b2d` (links/oben) nach `#072923` (rechts/unten), Karten-Grau `#f5f5f5`,
Grundfläche `#ffffff`.

Ein Cookie-Overlay (dunkelgrüne Karte, Lime-Button „Alle akzeptieren",
Outline-Button „Alle ablehnen") steht in **allen** Shots beider Viewports:
desktop unten rechts ca. 280×210 px, mobil als volle Breite am unteren Rand.
Es verdeckt in mehreren Slices die rechte untere Ecke; betroffene Stellen
sind je Sektion vermerkt. Das Overlay ist kein Sektionsbestandteil.

---

## Seite: /

### 01 — Topbar Marken-Switcher [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Schmales Vollbreiten-Band ganz oben, ca. 38 px hoch, zwei Zonen im selben Container wie die Nav darunter: links ein Begrüßungs-/Uhrzeit-Text, rechts ein Label plus zwei Marken-Lockups nebeneinander. Beide Zonen vertikal zentriert, kein Rahmen, keine Trennlinie zur Nav — der Wechsel passiert nur über den Helligkeitssprung dunkelgrün zu weiß.
- Buttons/Komponenten: Keine echten Buttons. Die zwei Marken-Lockups sind Bildmarken (Elefanten-Icon plus Wortmarke) mit ca. 14 px Höhe, im Abstand von ca. 20 px, das zweite optisch identisch gebaut. Der Aufbau der Wortmarke ist zweigewichtig: erstes Wort fett, zweites leicht — dieselbe Logik wie im Hauptlogo.
- Typo: Eine Stufe, ca. 13–14 px, Grotesk, Regular, gemischte Schreibung im linken Text; die Marken-Lockups in Versalien und Condensed. Kein Letterspacing links, deutliches Sperren in den Lockups.
- Farbe/Fläche: Fläche gemessen `#15402a` (dunkles Marken-Grün, leichter Verlauf nach rechts dunkler). Text weiß bzw. sehr helles Grau. Kein Lime in diesem Band — der Akzent startet erst in der H1.
- Abstände/Rhythmus: Sehr flach, Innenabstand oben/unten je ca. 10–12 px, links/rechts auf denselben Container-Rand wie die Nav (ca. 144 px bei 1440). Bewusst dicht, das Band soll unter der Wahrnehmungsschwelle bleiben.
- Mobil: Bleibt erhalten, aber reduziert: nur noch das Marken-Label plus die zwei Lockups, mittig gesetzt; die Begrüßung/Uhrzeit links entfällt komplett.
- Pattern: Kandidat: Marken-Switcher-Topbar

### 02 — Hauptnavigation [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Weiße Leiste unter der Topbar, ca. 62 px hoch, drei Zonen: Logo links, Menü linksbündig direkt daneben (nicht zentriert), Aktions-Paar rechts. Das Menü klebt am Logo statt die Mitte zu suchen — dadurch entsteht rechts ein großer Leerraum vor den zwei Buttons. Beim Scrollen bleibt die Leiste sticky und die Topbar verschwindet (Beleg: `home-desktop-02-y750.png` und alle tieferen Slices zeigen nur noch die weiße Leiste).
- Buttons/Komponenten: Zwei klar unterschiedene CTAs. Links die Telefonnummer als hellgraue Pille, Radius geschätzt ca. 8 px, Fläche sehr helles Grau (Messpunkt `#c6c6c6` liegt auf einem Zeichenrand; Flächenwert geschätzt ca. `#eeeeee`), Text dunkel, Condensed-Versalien. Rechts der Primär-CTA als gefülltes Rechteck mit demselben kleinen Radius, Fläche dunkelgrün (Messpunkt `#688376` sitzt auf einer Glyphkante; Flächenwert geschätzt `#00322f`–`#0a3a2c`), Text weiß in Condensed-Versalien. Kein Icon in beiden Buttons — bemerkenswert, weil die Hero-CTAs direkt darunter beide eines tragen. Der Menüpunkt „Produkte" trägt als einziger ein kleines Chevron nach unten.
- Typo: Menü in Grotesk Regular ca. 16 px, gemischte Schreibung, kein Letterspacing. Die zwei Buttons dagegen in Condensed-Versalien ca. 14 px mit leichtem Sperren — der Bruch zwischen Navigations- und Aktionsschrift ist das eigentliche Erkennungsmerkmal der Leiste.
- Farbe/Fläche: Fläche reinweiß (Messpunkt `#a9a9a9` liegt auf einer Textglyphe; Flächenwert gemessen `#ffffff` an freier Stelle). Genau ein farbiger Block: der grüne CTA. Kein Lime in der Nav.
- Abstände/Rhythmus: Menüpunkte im Abstand von ca. 30–34 px, Buttons ca. 16 px auseinander. Die Leiste ist luftig, weil die rechte Hälfte weitgehend leer bleibt.
- Mobil: Kollabiert vollständig auf Logo links plus Burger rechts (drei Striche, dunkelgrün, kein Rahmen, kein Label). Menüpunkte, Telefon-Pille und Primär-CTA verschwinden aus der Leiste — mobil trägt die Nav keine Aktion mehr, die erste Aktion ist der Hero-CTA.
- Pattern: Kandidat: Split-Nav mit Doppel-CTA

### 03 — Hero [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollflächiges Standbild über die gesamte Fold-Breite und -Höhe, Textspalte links auf ca. 45 % der Breite, das Motiv trägt die rechte Hälfte. Kein Kasten, kein Panel hinter dem Text — die Lesbarkeit kommt allein aus einem dunklen Verlauf, der von links nach rechts ausläuft. Der Textblock sitzt vertikal etwa mittig, leicht nach unten versetzt. Reihenfolge von oben: H1, Lead, CTA-Paar, Proof-Zeile.
- Buttons/Komponenten: Zwei CTAs nebeneinander, beide mit Icon, beide mit stark gerundeten Ecken (Radius geschätzt ca. 10–12 px, deutlich runder als die Nav-Buttons). Der erste ist weiß gefüllt mit dunklem Text und einem Chevron rechts vom Label; der zweite ist eine dunkle, halbtransparente Glasfläche mit hellem Rand, weißem Text und einem Play-Icon links vom Label. Beide Buttons ca. 44 px hoch. Das Muster ist auffällig: nicht gefüllt-vs-outline, sondern hell-vs-dunkeltransparent, und die Icons stehen auf gegenüberliegenden Seiten. Darunter die Proof-Zeile als Komposition aus vier überlappenden runden Avataren (ca. 28 px, weißer Ring, ca. 30 % Überlappung), einem Textblock mit Lime-gefärbter Zahl, einer Reihe von fünf goldgelben Sternen, einer Google-Bildmarke und — hinter einem senkrechten Trennstrich — einem Partner-Logo.
- Typo: Klare dreistufige Hierarchie ohne Eyebrow. H1 zweizeilig, Condensed-Versalien, sehr schwer, ca. 62–66 px bei Zeilenhöhe knapp 1,0 — die zwei Zeilen sitzen fast aufeinander. Lead darunter in Grotesk Regular ca. 17 px, Zeilenhöhe ca. 1,45; das Verhältnis H1 zu Lead liegt bei etwa 3,8:1. Der Kontrast Condensed-Versal-Display gegen normalbreite Fließschrift trägt die ganze Seite. Buttons wieder Condensed, aber hier in gemischter Schreibung statt Versalien — die einzige Stelle im Fold, wo das passiert.
- Farbe/Fläche: Foto in gedeckten Braun-, Blau- und Grautönen. Genau ein Akzent: die zweite H1-Zeile vollständig in Lime, gemessen `#e6fa00`. Der Rest der Typografie ist weiß. Zusätzlich Lime auf der Kennzahl in der Proof-Zeile, dort aber nur auf zwei Zeichen. Sterne in Gold, gemessen ca. `#fec84b`. Kein Farbwash über dem Foto, nur ein Schwarzverlauf für die Lesbarkeit.
- Abstände/Rhythmus: Text startet ca. 144 px vom linken Rand, also auf derselben Kante wie das Logo. Zwischen H1 und Lead ca. 24 px, zwischen Lead und CTA-Paar ca. 30 px, zwischen CTA-Paar und Proof-Zeile ca. 32 px. Die Zeilen der H1 stehen dagegen fast ohne Luft — Dichte oben, Luft unten.
- Mobil: Anderes Foto. Statt der Person im Innenraum ein Dach-/Modulmotiv, das Motiv ist also nicht nur beschnitten, sondern ausgetauscht. Die zwei CTAs stapeln voll breit übereinander und tauschen den Charakter: beide werden zu vollbreiten Blöcken, der erste weiß mit Chevron rechts, der zweite dunkeltransparent mit Play links. Die Proof-Zeile verliert die Avatar-Gruppe, den Trennstrich und das Partner-Logo und behält nur Text, Sterne und die Google-Bildmarke; sie bricht dabei auf zwei Zeilen. Die H1 bleibt zweizeilig, schrumpft aber auf ca. 34 px. Der untere Teil des Folds wird vom Cookie-Overlay verdeckt.
- Pattern: `P-HERO-PHOTO` (mit Abweichung: zwei CTAs im Fold statt genau einem)

### 04 — Video-Testimonial vollbreit [home-desktop-02-y750.png | home-mobile-00-fold.png (nur angeschnitten)]
- Anordnung: Das Hero-Motiv läuft nach unten in eine vollbreite Video-Sektion ohne Container-Begrenzung weiter. Über dem unteren Bilddrittel liegt eine sehr große Untertitelzeile, die die volle Breite von Rand zu Rand ausnutzt und rechts sogar leicht angeschnitten wird. Kein Rahmen, kein Panel, keine Steuerelemente sichtbar.
- Buttons/Komponenten: Keine sichtbaren Bedienelemente in diesem Slice.
- Typo: Eine einzige Stufe, aber extrem groß: Condensed-Versalien, ca. 68–72 px, über die volle Breite gesetzt. Der laufende Untertitel ist zweifarbig — der bereits gesprochene Teil steht in einem abgedunkelten Oliv, der aktuelle Teil in vollem Lime. Der Effekt ist ein Karaoke-artiger Fortschritt innerhalb derselben Zeile.
- Farbe/Fläche: Dunkles Videobild, ein Akzent: Lime `#e6fa00` auf dem aktiven Textteil, gedämpftes Oliv (geschätzt ca. `#6b7a12`) auf dem bereits gelaufenen Teil.
- Abstände/Rhythmus: Bewusst randlos, die Schrift bricht die Container-Kante. Sehr dicht, kein Padding seitlich.
- Mobil: Der Untertitel-Block ist im 390-Fold nicht sichtbar; das Motiv läuft dort direkt in die nächste Sektion. Vollständige Gegenprobe im Mobil-Set nicht lesbar, da der Bereich beim Scroll-Raster zwischen zwei Slices fällt.
- Pattern: Kandidat: Vollbreites Video-Testimonial mit Lauftext

### 05 — Logo-Leiste Qualitätsmarken [home-desktop-03-y1500.png | -]
- Anordnung: Schmales weißes Band, eine einzige Reihe mit sieben Bildmarken, gleichmäßig über die Container-Breite verteilt, alle auf einer gemeinsamen optischen Mittellinie. Darüber eine kurze zentrierte Kopfzeile. Die Reihe ist an beiden Enden angeschnitten — links und rechts steht je ein Logo halb im Bild, was die Leiste als laufendes Band statt als statisches Raster liest.
- Buttons/Komponenten: Nur Bildmarken, keine Karten, keine Rahmen, kein Hintergrund je Logo. Die Logos behalten ihre Originalfarben (rotes, blaues, grünes und mehrfarbiges Material nebeneinander) statt auf Graustufen normalisiert zu werden — ein bewusster Bruch mit der sonst sehr engen Palette.
- Typo: Eine Stufe. Kopfzeile in Grotesk, ca. 13 px, Versalien, kräftiges Letterspacing (geschätzt ca. 0,12 em), mittelgrau bis dunkel. Sie ist als Label gesetzt, nicht als Überschrift — kein Display-Font.
- Farbe/Fläche: Fläche reinweiß, gemessen `#ffffff`. Kein Marken-Grün, kein Lime. Die einzige Farbe kommt aus den Fremdlogos.
- Abstände/Rhythmus: Sehr flach, Padding oben/unten je ca. 40–48 px. Zwischen Kopfzeile und Logoreihe ca. 40 px. Die Sektion ist als Atempause zwischen Hero-Dunkel und Karten-Block gebaut.
- Mobil: Im 390-Set fällt die Leiste zwischen die Scroll-Slices und ist nicht als geschlossene Sektion lesbar; die Anordnung mobil ist damit nicht belegt.
- Pattern: `P-PROOF-STRIP`

### 06 — Produktkarten „Deine Vorteile" [home-desktop-03-y1500.png | -]
- Anordnung: Zentrierter Kopfblock, darunter drei gleich hohe, gleich breite Karten im 3-Spalten-Raster mit ca. 48 px Rinne. Das Besondere: Der Sektionshintergrund wechselt **innerhalb** der Kartenreihe von Weiß auf Dunkelgrün — die Kante läuft quer durch die Karten hindurch, ungefähr auf Höhe der Kartentitel. Die oberen Kartendrittel stehen also auf Weiß, die unteren auf Grün, und weil die Karten selbst dunkelgrün sind, verschmelzen sie unten mit der Fläche und schneiden oben scharf ab. Das ist die auffälligste Layout-Entscheidung der Startseite.
- Buttons/Komponenten: Karten mit Radius geschätzt ca. 12–16 px, oben ein randloses Foto über die volle Kartenbreite mit geradem unteren Abschluss, darunter ein dunkelgrüner Textkörper mit eigenem Verlauf (Messpunkt im Kartenkörper `#0a2f25`). Kein Button, kein Pfeil, kein Badge auf den Karten — sie sind rein informativ und tragen keine eigene Aktion. Die Karten liegen mit einem weichen Schatten auf der Fläche.
- Typo: Vierstufig je Karte. Eyebrow über dem Kopfblock in Grotesk-Versalien ca. 13 px mit weitem Letterspacing; H2 in Condensed-Versalien ca. 44 px; Kartentitel in Condensed-Versalien ca. 34 px; darunter eine zweite Titelzeile ca. 19 px, ebenfalls Condensed-Versalien, aber weiß statt Lime; Kartentext in Grotesk Regular ca. 15 px, zentriert, Zeilenhöhe ca. 1,5. Die zwei Titelzeilen unterschiedlicher Größe direkt übereinander erzeugen die Marken/Untermarken-Staffelung.
- Farbe/Fläche: Oberer Teil weiß, unterer Teil dunkelgrüner Verlauf (gemessen `#1c4b2d` oben links nach `#072923` unten rechts). Der Akzent sitzt ausschließlich auf der jeweils ersten Kartentitelzeile in Lime `#e6fa00`. Die zweite Titelzeile und der Fließtext bleiben weiß — dadurch trägt pro Karte genau ein Wort Farbe.
- Abstände/Rhythmus: Sektions-Padding oben ca. 96 px, Kopfblock zu Karten ca. 72 px. Innerhalb der Karten: Foto bis Titel ca. 40 px, Titel bis Untertitel ca. 12 px, Untertitel bis Text ca. 28 px, unten ca. 40 px. Die Karten sind innen luftig, die Kartenreihe untereinander dicht gestellt.
- Mobil: Im 390-Set liegt der Block zwischen den Slices und ist nicht als vollständige Sektion belegt. Aus den angrenzenden Mobil-Slices ist erkennbar, dass die Sektionsfläche mobil ebenfalls von Weiß auf Grün wechselt; die Kartenstapelung selbst ist nicht lesbar.
- Pattern: `P-OFFER-PAIR` (Lücke: drei statt zwei Karten)

### 07 — Stats-Band [home-desktop-04-y2250.png | home-mobile-10-y3798.png (nur Ausklang)]
- Anordnung: Vollbreite dunkelgrüne Fläche, zentrierter Kopfblock, darunter vier gleich breite Spalten in einer Reihe. Jede Spalte ist strikt linksbündig gesetzt — nicht zentriert wie die Karten darüber. Kein Rahmen, keine Karte, keine Trennlinie zwischen den Spalten; die Gliederung entsteht allein aus dem Spaltenabstand.
- Buttons/Komponenten: Keine Buttons, keine Icons, keine Kacheln. Bewusst reduziert: drei Textzeilen je Spalte, sonst nichts.
- Typo: Dreistufig je Spalte, und das Größenverhältnis ist das eigentliche Gestaltungsmittel. Zahl in Condensed-Versalien ca. 56 px, direkt darunter ein Label in Condensed-Versalien ca. 24 px, darunter ein Belegsatz in Grotesk Regular ca. 15 px. Verhältnis Zahl zu Label etwa 2,3:1, Label zu Fließtext etwa 1,6:1. Die zwei Condensed-Zeilen stehen fast ohne Luft übereinander und bilden optisch einen Block, der Fließtext setzt sich danach ab.
- Farbe/Fläche: Fläche dunkelgrüner Diagonalverlauf, gemessen links `#1c4b2d`, rechts `#072923`. Zahlen in Lime, gemessen `#e6fa00`. Labels weiß, Belegsätze in einem leicht abgesenkten Weiß. Der Akzent trägt hier also vier Elemente gleichzeitig — mehr als in jeder anderen Sektion der Seite.
- Abstände/Rhythmus: Sektions-Padding oben ca. 120 px, unten ca. 130 px. Kopfblock zu Zahlenreihe ca. 80 px. Zwischen Zahl und Label ca. 4 px, zwischen Label und Belegsatz ca. 16 px. Sehr großzügige Sektion, sehr dichte Textblöcke — der Kontrast trägt die Wirkung.
- Mobil: Die Sektion endet im 390-Set mit einem hohen leeren Grünbereich unter dem letzten Belegsatz, bevor scharf auf Weiß gewechselt wird. Die vier Spalten stapeln also untereinander und die Sektion wird deutlich höher; das Padding unten wächst mit.
- Pattern: Kandidat: Stats-Band mit Belegsatz je Zahl

### 08 — Video-Testimonial-Slider [home-desktop-04-y2250.png | home-mobile-10-y3798.png]
- Anordnung: Weiße Fläche, zentrierter Kopfblock mit drei Stufen, darunter ein horizontaler Slider. Die Karten sind bewusst über die Container-Kante hinaus gesetzt: die mittlere Karte steht vollständig, links und rechts wird je eine Nachbarkarte angeschnitten und läuft aus dem Bild. Unter dem Slider zentriert ein Pfeil-Paar.
- Buttons/Komponenten: Videokarten mit Radius geschätzt ca. 12 px, Format etwa 16:10, randloses Standbild. Auf jeder Karte oben links ein zweizeiliges Text-Lockup, dessen zweite Zeile in Lime gesetzt und mit einem handgezeichnet wirkenden Lime-Unterstrich versehen ist — kein geometrischer Balken, sondern ein Marker-Strich mit unregelmäßiger Kante. Unten links auf der Karte ein Play-Chip: dunkle, halbtransparente Pille mit vollem Radius (ca. 100 px), kleinem Play-Icon links und Versal-Label. Die Navigation darunter besteht aus zwei separaten quadratischen Flächen mit abgerundeten Ecken (Radius ca. 8 px), sehr hellgrauer Füllung und je einem dünnen Pfeil — kein Kreis, keine Umrandung, kein Farbakzent.
- Typo: Kopfblock dreistufig: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, H2 in Condensed-Versalien ca. 44 px, Lead in Grotesk Regular ca. 17 px. Auf den Karten Condensed-Versalien in zwei Größen, die zweite Zeile deutlich größer als die erste.
- Farbe/Fläche: Fläche reinweiß, gemessen `#ffffff`. Akzent ausschließlich auf den Kartennamen und deren Marker-Unterstrich in Lime. Die Pfeil-Buttons tragen bewusst keine Farbe.
- Abstände/Rhythmus: Sektions-Padding oben ca. 96 px. Kopfblock zu Slider ca. 64 px, Slider zu Pfeilen ca. 40 px. Zwischen den Karten ca. 30 px Rinne.
- Mobil: Der Slider zeigt nur noch eine Karte, die vollbreit im Container steht und rechts nicht mehr angeschnitten wird — der Peek-Effekt entfällt. Der Kopfblock bricht auf zwei bzw. drei Zeilen. Der Play-Chip bleibt unverändert unten links.
- Pattern: `P-TESTIMONIAL`

### 09 — CTA-Band Mitte [home-desktop-06-y3750.png | -]
- Anordnung: Vollbreites dunkelgrünes Band, zwei Zonen nebeneinander. Links ein Textblock über ca. 55 % der Breite mit Eyebrow, H2 und Fließtext. Rechts eine eigene, leicht abgesetzte Box mit abgerundeten Ecken, die den CTA und darunter eine Telefonzeile enthält. Die rechte Box hat einen minimal helleren Grünton als das Band, ist also als Fläche-in-Fläche gebaut statt als freistehender Button.
- Buttons/Komponenten: Ein einziger CTA, und er ist der einzige Lime-gefüllte Button der gesamten Startseite. Rechteck mit kleinem Radius (geschätzt ca. 6–8 px), Fläche Lime, Text dunkelgrün in Condensed-Versalien, kein Icon. Darunter eine Textzeile mit Telefonnummer, kein Button, nur Text. Die umschließende Box hat Radius ca. 16 px.
- Typo: Eyebrow in Lime, Grotesk-Versalien ca. 13 px mit weitem Letterspacing. H2 in Condensed-Versalien ca. 42 px, weiß. Fließtext in Grotesk Regular ca. 16 px über zwei Zeilen. Verhältnis H2 zu Fließtext etwa 2,6:1.
- Farbe/Fläche: Bandfläche dunkelgrüner Verlauf wie die Stats-Sektion. Der Akzent sitzt zweimal: auf dem Eyebrow als Text und auf dem CTA als Fläche. Das ist die einzige Stelle auf der Seite, wo Lime als Füllung statt nur als Schriftfarbe auftritt.
- Abstände/Rhythmus: Bandhöhe ca. 250 px, Padding oben ca. 70 px, unten ca. 70 px. Textblock und CTA-Box sind vertikal zueinander zentriert. Innerhalb der Box: CTA ca. 40 px unter der Oberkante, Telefonzeile ca. 20 px darunter.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: `P-CTA-MID` (mit Abweichung: Fläche dunkelgrün statt `surface`)

### 10 — Produktkatalog mit Tab-Leiste [home-desktop-06-y3750.png | -]
- Anordnung: Weiße Fläche, zentrierter dreistufiger Kopfblock, darunter eine zentrierte Tab-Leiste mit fünf Reitern, darunter eine breite Produktkarte im 2-Spalten-Split: links Text und Aktionen auf ca. 55 %, rechts eine eigene, hellere Bildfläche mit freigestelltem Produkt. Unter der Karte eine schmale, vollbreite Hinweisleiste. Die Bildzone rechts hat einen eigenen Hintergrundton und reicht bis an die Kartenkante — der Split ist also nicht nur ein Spaltenwechsel, sondern auch ein Flächenwechsel.
- Buttons/Komponenten: Die Tab-Leiste ist eine durchgehende hellgraue Zeile mit Radius ca. 8 px; der aktive Reiter ist als dunkelgrün gefüllter Block darin hervorgehoben (gemessen `#204a32`, Flächenwert geschätzt ca. `#00322f`), die inaktiven stehen ohne eigene Fläche auf dem Leistengrau (gemessen `#eeeeee`). Jeder Reiter trägt links ein feines Linien-Icon und ein Condensed-Versal-Label. Unter der Produktbeschreibung ein Button-Paar mit unterschiedlicher Logik: links ein gefüllter dunkelgrüner Button ohne Icon, rechts ein weißer Button mit dünner grauer Kontur und einem Download-Icon rechts vom Label. Beide mit kleinem Radius ca. 6–8 px und ca. 44 px Höhe. Die Aufzählung darüber ist eine klassische Punktliste mit runden Bullets, kein Icon-Raster. Die Hinweisleiste unten ist eine flache hellgraue Fläche mit zentriertem Text, Radius ca. 8 px, ohne Rahmen.
- Typo: Kopfblock dreistufig wie in Sektion 08. Produkttitel in Condensed-Versalien ca. 36 px. Beschreibung in Grotesk Regular ca. 16 px. Listenpunkte ca. 15 px. Buttons in Condensed-Versalien ca. 14 px. Hinweisleiste ca. 15 px Regular, zentriert.
- Farbe/Fläche: Sektionsfläche weiß, Kartenfläche sehr helles Grau (gemessen `#f5f5f5`), Bildzone rechts nochmals leicht abweichend hell. Kein Lime in dieser Sektion — die einzige größere Sektion der Startseite ohne Akzentfarbe. Die Hierarchie wird hier rein über Grün und Grauwerte gemacht.
- Abstände/Rhythmus: Sektions-Padding oben ca. 110 px. Kopfblock zu Tabs ca. 56 px, Tabs zu Karte ca. 40 px, Karte zu Hinweisleiste ca. 24 px. Innerhalb der Karte links ca. 44 px Innenabstand. Deutlich dichter gesetzt als die Karten-Sektion 06.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: Kandidat: Produktkatalog mit Tab-Umschalter

### 11 — Einzugsgebiet-Split mit Karte [home-desktop-06-y3750.png (Anschnitt) | -]
- Anordnung: 2-Spalten-Split, links Textspalte mit Eyebrow, H2, Fließtext und einem CTA, rechts eine dunkelgrüne Kachel mit abgerundeten Ecken, in der eine flächige Landkarten-Silhouette sitzt. Die Kachel ist deutlich höher als der Textblock und beginnt weiter oben — die zwei Spalten sind nicht auf gemeinsamer Oberkante ausgerichtet.
- Buttons/Komponenten: Kartenkachel mit Radius ca. 16 px. Die Landkarte ist keine Straßenkarte, sondern eine einfarbige Flächenform ohne Beschriftung, Straßen oder Marker. Der CTA links ist im Slice nur angeschnitten und daher in Form und Füllung nicht sicher lesbar.
- Typo: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, dunkel statt Lime — auf weißer Fläche wechselt der Eyebrow also die Farbe. H2 in Condensed-Versalien ca. 44 px. Fließtext Grotesk Regular ca. 16 px über vier Zeilen.
- Farbe/Fläche: Sektionsfläche weiß. Die Kachel trägt den dunkelgrünen Verlauf, die Landkarten-Silhouette ist vollflächig Lime — das ist die einzige Stelle der Seite, an der Lime eine große zusammenhängende Fläche bildet statt nur Text oder einen Button.
- Abstände/Rhythmus: Sektions-Padding oben ca. 120 px. Im Slice nach unten angeschnitten, die Gesamthöhe ist nicht belegt.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: `P-MAP`

### 12 — Team-Split „Wer wir sind" [home-desktop-08-y5250.png | -]
- Anordnung: 2-Spalten-Split auf weißer Fläche, links ein Foto, rechts der Text — also gespiegelt zur Karten-Sektion darüber. Das Foto ist nahezu quadratisch mit Radius ca. 12 px, die Textspalte rechts ist vertikal mittig zum Foto ausgerichtet. Reihenfolge rechts: Eyebrow, zweizeilige H2, Fließtext, ein CTA.
- Buttons/Komponenten: Ein einziger gefüllter Button, Rechteck mit kleinem Radius (ca. 6–8 px), dunkelgrüne Fläche, weißer Condensed-Versal-Text, kein Icon. Deutlich schmaler als die Textspalte, linksbündig unter dem Text.
- Typo: Eyebrow in Grotesk-Versalien ca. 13 px, weites Letterspacing, mittelgrau. H2 zweizeilig in Condensed-Versalien ca. 46 px mit Zeilenhöhe knapp über 1,0. Fließtext Grotesk Regular ca. 16,5 px, Zeilenhöhe ca. 1,55, über vier Zeilen. Verhältnis H2 zu Fließtext etwa 2,8:1.
- Farbe/Fläche: Fläche weiß, gemessen `#ffffff`. Kein Lime in der Typografie dieser Sektion — der einzige Lime-Anteil steckt im Foto selbst (die Fassadenbeschriftung im Motiv). Der Akzent kommt hier also aus dem Bild statt aus dem Layout.
- Abstände/Rhythmus: Sektions-Padding oben ca. 90 px, unten ca. 90 px. Zwischen Foto und Textspalte ca. 80 px Rinne. Eyebrow zu H2 ca. 16 px, H2 zu Fließtext ca. 26 px, Fließtext zu CTA ca. 30 px.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: `P-TEAM`

### 13 — Google-Reviews-Grid [home-desktop-08-y5250.png | -]
- Anordnung: Vollbreite dunkelgrüne Fläche, zentrierter dreistufiger Kopfblock, darunter ein 3-Spalten-Raster aus Zitatkarten in zwei Reihen. Die Karten sind **nicht** gleich hoch — jede Karte endet dort, wo ihr Text endet, und die Autorenzeile rutscht entsprechend mit. Das erzeugt eine sichtbar unruhige Unterkante innerhalb jeder Reihe, ist aber offensichtlich so gewollt, weil keine Kürzung stattfindet.
- Buttons/Komponenten: Karten mit Radius ca. 12 px, Fläche minimal heller als der Sektionshintergrund und mit einer feinen, hellen Kontur abgesetzt — der Kontrast ist sehr niedrig, die Karte ist eher angedeutet als gesetzt. Aufbau je Karte von oben: eine Reihe von fünf goldgelben Sternen, Zitattext, darunter ein eigener Autoren-Chip. Dieser Chip ist selbst eine kleine abgerundete Fläche (Radius ca. 8–10 px) mit noch etwas hellerem Grün, darin links eine kreisrunde weiße Fläche mit der Google-Bildmarke und rechts zwei Textzeilen. Der Chip ist nur so breit wie sein Inhalt, nicht so breit wie die Karte.
- Typo: Kopfblock dreistufig, H2 in Condensed-Versalien ca. 44 px. Zitattext in Grotesk Regular ca. 15,5 px, Zeilenhöhe ca. 1,55. Im Chip: Name in Grotesk Medium ca. 15 px, Quellenzeile darunter ca. 12,5 px in abgesenktem Weiß.
- Farbe/Fläche: Sektionsverlauf dunkelgrün wie Sektion 07. Eyebrow in Lime. Sterne in Gold, geschätzt `#fec84b`. Zitattext und Namen in Weiß bzw. Off-White. Die Karten selbst tragen keinen Akzent — Lime erscheint in dieser Sektion nur ein einziges Mal, im Eyebrow.
- Abstände/Rhythmus: Sektions-Padding oben ca. 110 px. Kopfblock zu Raster ca. 60 px. Rinne zwischen den Karten ca. 32 px horizontal und vertikal. Innerhalb der Karte ca. 26 px Innenabstand, Sterne zu Zitat ca. 20 px, Zitat zu Chip ca. 28 px.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: `P-TESTIMONIAL`

### 14 — Referenz-Grid [home-desktop-10-y6750.png | -]
- Anordnung: Weiße Fläche, zentrierter zweistufiger Kopfblock, darunter ein 3-Spalten-Raster aus sechs Karten in zwei Reihen, darunter zentriert ein einzelner Button. Alle Karten hier sind gleich hoch — anders als im Reviews-Grid.
- Buttons/Komponenten: Die Karten sind zweigeteilt: oben ein Luftbild über die volle Kartenbreite, unten ein dunkelgrüner Datenkörper. Radius ca. 12 px, oben und unten gleich. Auf dem Foto liegt oben rechts ein Badge: dunkelgrüne, leicht transparente Pille mit Radius ca. 6–8 px und hellem Text, ca. 12 px vom Rand eingerückt. Im Datenkörper drei Ebenen: eine Ortszeile, eine große Kennzahlzeile, und darunter eine Reihe aus zwei Fakten-Chips nebeneinander. Diese Chips haben keine eigene Fläche und keinen Rahmen — sie bestehen nur aus einem feinen Linien-Icon links und zweizeiligem Text rechts. Der Sektions-Button darunter ist dunkelgrün gefüllt, Radius ca. 6–8 px, Condensed-Versal-Text, kein Icon, zentriert.
- Typo: Kopfblock zweistufig: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, H2 in Condensed-Versalien ca. 46 px. In der Karte: Ortszeile in Grotesk-Versalien ca. 13 px mit weitem Letterspacing und in Lime; Kennzahlzeile in Condensed-Versalien ca. 24 px in Weiß; Chip-Text in Grotesk Regular ca. 13 px, zweizeilig. Die Ortszeile ist damit typografisch als Eyebrow der Karte gebaut — dasselbe Muster wie im Sektionskopf, nur eine Ebene tiefer.
- Farbe/Fläche: Sektionsfläche weiß. Kartenkörper dunkelgrüner Verlauf. Akzent genau einmal je Karte: die Ortszeile in Lime. Die Badges auf dem Foto tragen keinen Akzent.
- Abstände/Rhythmus: Sektions-Padding oben ca. 90 px. Kopfblock zu Raster ca. 60 px. Rinne ca. 32 px. Innerhalb des Datenkörpers ca. 26 px Innenabstand, Ortszeile zu Kennzahl ca. 8 px, Kennzahl zu Chip-Reihe ca. 20 px. Raster zu Button ca. 56 px.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt; die Karten-Anatomie ist identisch auf `/referenzen` mobil belegt, siehe Sektion 20.
- Pattern: `P-GALLERY`

### 15 — Schluss-CTA [home-desktop-12-y7727.png | -]
- Anordnung: Kein vollbreites Band, sondern eine abgesetzte Kachel innerhalb des Containers, 2-Spalten-Split: links Textzone auf ca. 53 %, rechts ein Foto. Radius ca. 16 px an allen vier Ecken. Zwei Besonderheiten: Erstens läuft der Sektionshintergrund hinter der Kachel im unteren Drittel von Weiß auf Grün um — die Kachel steht also halb auf Weiß, halb auf Grün und geht unten nahtlos in den Footer über. Zweitens ragt das Foto rechts über die Kachel-Unterkante hinaus und wird von der Grünfläche überlagert, wodurch eine sichtbare Überlappung entsteht.
- Buttons/Komponenten: Ein einziger Button, weiß gefüllt, dunkler Condensed-Versal-Text, Radius ca. 6–8 px, kein Icon, linksbündig. Weiße Füllung auf grüner Fläche ist hier bewusst gewählt statt Lime — der Lime-Button bleibt dem mittleren CTA-Band vorbehalten.
- Typo: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, in Lime. H2 zweizeilig in Condensed-Versalien ca. 44 px, weiß. Fließtext Grotesk Regular ca. 16 px über zwei Zeilen.
- Farbe/Fläche: Linke Kachelhälfte trägt einen Grünverlauf, der von oben links heller nach unten rechts dunkler läuft und nach rechts ins Foto ausblendet — es gibt keine harte Kante zwischen Farbfläche und Bild. Akzent nur im Eyebrow.
- Abstände/Rhythmus: Kachelhöhe ca. 370 px. Innenabstand links ca. 48 px, oben ca. 52 px. Eyebrow zu H2 ca. 14 px, H2 zu Fließtext ca. 22 px, Fließtext zu Button ca. 30 px.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: `P-CTA-END`

### 16 — Footer mit Blog-Teasern [home-desktop-12-y7727.png | -]
- Anordnung: Vollbreite dunkelgrüne Fläche in drei horizontalen Zonen. Zone eins: links ein Logo-Block mit Wortmarke, Beschreibungstext und einer Reihe aus vier Social-Icons; rechts daneben vier Linkspalten. Die Linkspalten sind nicht gleich breit verteilt, sondern rechtsbündig zum Container gruppiert, die letzte Spalte ist deutlich breiter als die drei davor. Zone zwei, abgetrennt durch eine dünne helle Linie: vier Blog-Teaser-Karten in einer Reihe. Zone drei: eine Fußzeile mit Copyright links und einer Credit-Zeile mittig.
- Buttons/Komponenten: Social-Icons als vier quadratische Flächen mit abgerundeten Ecken (Radius ca. 8 px), dunklere Füllung als der Footer, helles Linien-Icon zentriert, ca. 36 px Kantenlänge, ca. 12 px Abstand. Die Blog-Teaser sind Karten mit Radius ca. 10 px, aber umgekehrt aufgebaut zu allen anderen Karten der Seite: **oben** eine Metazeile aus zwei Chips und ein Titel, **unten** das Bild. Die zwei Chips sind kleine vollrunde Pillen (Radius ca. 100 px) — der linke Datums-Chip mit einem gedämpften Lime-Ton, der rechte Kategorie-Chip mit einem neutralen Grün. Die Kartenflächen sind hell, nicht grün, und heben sich damit klar vom Footer ab. Eine Kontaktzeile in der letzten Linkspalte trägt einen diagonalen Pfeil nach rechts oben.
- Typo: Spaltentitel in Condensed-Versalien ca. 15 px. Links in Grotesk Regular ca. 15,5 px, gemischte Schreibung, ohne Letterspacing. Beschreibungstext ca. 14,5 px. Blog-Titel ca. 15 px Regular, einzeilig mit Auslassung am Ende. Chips ca. 12 px. Fußzeile ca. 14 px.
- Farbe/Fläche: Footer-Fläche gemessen `#18452c` mit leichtem Verlauf nach unten dunkler. Die vier Spaltentitel in Lime, gemessen `#e6fa00` — das ist der einzige Ort auf der Seite, wo Lime vier gleichrangige Elemente gleichzeitig trägt. Die Wortmarke im Logo ebenfalls Lime. Alle Links in Weiß. Die Blog-Karten brechen die Palette bewusst mit hellen Flächen.
- Abstände/Rhythmus: Footer-Padding oben ca. 100 px. Logo-Block zu Linkspalten ca. 100 px horizontal. Zwischen den Links vertikal ca. 18 px. Linkzone zu Trennlinie ca. 70 px, Trennlinie zu Blog-Reihe ca. 40 px, Blog-Reihe zu Fußzeile ca. 50 px. Rinne zwischen den Teasern ca. 28 px.
- Mobil: Nicht als geschlossene Sektion im 390-Raster belegt.
- Pattern: Kandidat: Footer mit Blog-Teaser-Reihe

### Zustaende (Hover) [home-desktop-hover-00-Wärmepumpen.png | -]

Belegt sind zehn Hover-Shots der Startseite, alle 1440×900 und alle auf dem Fold: `home-desktop-hover-00-Wärmepumpen.png`, `home-desktop-hover-01-Über_Uns.png`, `home-desktop-hover-02-Referenzen.png`, `home-desktop-hover-03-Finanzierung.png`, `home-desktop-hover-04-Blog.png`, `home-desktop-hover-05-_49_0_5136_8042690.png`, `home-desktop-hover-06-JETZT_ANGEBOT_SICHERN.png` sowie `home-hover-00.png`, `home-hover-01.png` und `home-hover-02.png`. Da alle Aufnahmen denselben Seitenzustand zeigen, wurden die Hover-Flächen nicht gegen `home-desktop-00-fold.png` gemessen, sondern gegen den Median der Hover-Serie — der Hero trägt ein laufendes Video, dessen Bildwechsel sonst jede Ganzbild-Differenz überdeckt. Damit isolieren sich die Änderungen sauber auf Topbar und Nav. Alle drei belegten Komponenten liegen im Header (Sektion 02); für Karten, Slider und Footer gibt es keinen Hover-Shot.

### 16a — Hover Navigationspunkt [home-desktop-hover-00-Wärmepumpen.png | -]
- Anordnung: Der Hover erzeugt eine Pille hinter dem Menü-Label, die vorher nicht existiert. Sie sitzt vertikal von y 56 bis y 85, also ca. 30 px hoch, und ist horizontal um ca. 14 px je Seite breiter als das Label. Die Geometrie ist bei allen vier gemessenen Punkten identisch: `home-desktop-hover-00-Wärmepumpen.png` x 394–518, `home-desktop-hover-01-Über_Uns.png` x 527–612, `home-desktop-hover-02-Referenzen.png` x 621–717, `home-desktop-hover-03-Finanzierung.png` x 726–831. Die Pille wächst also mit der Labelbreite mit, die Höhe bleibt konstant. In `home-desktop-hover-04-Blog.png` erscheint dieselbe Pille bei x 840–892 — beim kürzesten Menüpunkt ist sie mit ca. 52 px am schmalsten, aber nach derselben Regel gebaut.
- Buttons/Komponenten: Die Pille ist die einzige Änderung, es kommt weder ein Rahmen noch ein Schatten noch eine Unterstreichung dazu. In `home-desktop-hover-00-Wärmepumpen.png` fällt die Ecke über vier Zeilen um drei Pixel ein (y 56 beginnt bei x 397, y 60 bei x 394) — daraus folgt ein Radius von ca. 6–8 px, also dieselbe kleine Rundung wie bei den Nav-Buttons und nicht die Vollrundung der Footer-Chips. Das Chevron am Punkt „Produkte" bleibt unverändert; ein Flyout oder Dropdown öffnet in keinem der Shots, auch nicht in `home-desktop-hover-00-Wärmepumpen.png`.
- Typo: Unverändert. Schriftgrad, Schnitt, Laufweite und Grundlinie des Labels sind in `home-desktop-hover-02-Referenzen.png` gegenüber dem ungehoverten Zustand derselben Stelle in `home-desktop-hover-00-Wärmepumpen.png` deckungsgleich; das Label wird beim Hover weder fetter noch unterstrichen noch verschoben.
- Farbe/Fläche: Gemessen. Die Pillenfläche ist `#e7ece9`, an mehreren freien Punkten identisch abgelesen (in `home-desktop-hover-00-Wärmepumpen.png` bei x 396/400, y 58 bis y 84; in `home-desktop-hover-01-Über_Uns.png` bei x 530). Dieselbe Stelle ohne Hover misst `#ffffff`. Das ist ein sehr leicht grünstichiges Grau — kein neutrales Grau und kein Lime. Die Textfarbe ändert sich nicht.
- Abstände/Rhythmus: Die Pille verändert das Layout nicht: Die Menüpunkte behalten ihre Positionen, nichts springt. Der Effekt ist rein additiv und bleibt innerhalb der ca. 62 px hohen Nav-Leiste aus Sektion 02.
- Mobil: Nicht geprüft — es gibt keine Mobile-Hover-Shots; das Mobil-Set enthält zu Interaktionen nur `home-mobile-*` Scroll-Slices ohne Zustandsaufnahmen.
- Pattern: Kandidat: Nav-Hover-Pille auf Neutralgrau

### 16b — Hover Telefon-Pille [home-desktop-hover-05-_49_0_5136_8042690.png | -]
- Anordnung: Die hellgraue Telefon-Pille aus Sektion 02 liegt in `home-desktop-hover-05-_49_0_5136_8042690.png` bei x 913–1129. Im Hover verschiebt sich der gesamte Button um ca. 2–3 px nach oben: ungehovert reicht die Fläche in derselben Spalte von y 51 bis y 90, im Hover von y 48 bis y 88. Die horizontale Ausdehnung bleibt exakt gleich (x 913–1129 in beiden Zuständen), es ist also eine reine Vertikalverschiebung und keine Skalierung.
- Buttons/Komponenten: Das Label wandert mit: Die Glyphenzeilen liegen im Hover bei y 62–74, ungehovert bei y 64–76 — dieselbe Verschiebung um 2 px nach oben wie die Fläche. Kein Rahmen, kein Icon und keine Unterstreichung kommen hinzu.
- Typo: Unverändert in Grad und Schnitt, nur um die genannten 2 px angehoben.
- Farbe/Fläche: Gemessen, und die Messung ist das eigentliche Ergebnis: Die Fläche geht von `#eeeeee` auf `#efefef` — ein einziger Stufenwert. Das liegt an der Grenze der Wahrnehmbarkeit und ist praktisch keine Farbänderung. Die Telefon-Pille reagiert also über Bewegung, nicht über Farbe. Ein Schatten ist nicht messbar: unterhalb der Unterkante bleiben die Werte in `home-desktop-hover-05-_49_0_5136_8042690.png` bei `#ffffff`, es gibt keinen Abdunklungssaum.
- Abstände/Rhythmus: Der Lift von ca. 2 px ist die einzige Layoutbewegung; die Nachbarelemente bleiben stehen.
- Mobil: Nicht geprüft — kein Mobile-Hover-Shot vorhanden; mobil entfällt die Telefon-Pille laut Sektion 02 ohnehin aus der Leiste.
- Pattern: Kandidat: Button-Hover als Lift ohne Farbwechsel

### 16c — Hover Primaer-CTA [home-desktop-hover-06-JETZT_ANGEBOT_SICHERN.png | -]
- Anordnung: Der dunkelgrüne Primär-CTA liegt in `home-desktop-hover-06-JETZT_ANGEBOT_SICHERN.png` bei x 1130–1295. Wie die Telefon-Pille hebt er sich im Hover um ca. 2 px: Die Oberkante liegt im Hover bei y 49, ungehovert bei y 51; die Unterkante entsprechend bei y 87 statt y 90. Die Breite ist in beiden Zuständen unverändert (x 1130–1295), also auch hier Translation statt Skalierung.
- Buttons/Komponenten: Radius und Kontur bleiben gleich, es kommt kein Icon und kein Rahmen hinzu. Anders als bei der Telefon-Pille ist die Bewegung hier aber nicht der Hauptreiz, sondern die Aufhellung — der CTA ist die einzige Komponente im Header, die beim Hover deutlich die Farbe wechselt.
- Typo: Der weiße Condensed-Versal-Text bleibt in Grad und Schnitt gleich und wandert nur mit der Fläche nach oben.
- Farbe/Fläche: Gemessen an mehreren freien Flächenpunkten. Oben im Button (x 1180, y 55) geht der Wert von `#194738` ungehovert auf `#2e573f` im Hover; weiter unten (x 1180, y 80) von `#133d29` auf `#2a4f3d`; am rechten Rand (x 1280, y 52) von `#0f3627` auf `#26483c`. Die Fläche trägt einen Verlauf, deshalb sind die Absolutwerte ortsabhängig — die Richtung ist aber überall dieselbe: rund 20 Punkte heller je Kanal, bei leicht steigendem Blauanteil. Als Designwert geschätzt: der dunkelgrüne Grund wird im Hover um etwa 8–10 % aufgehellt, der Verlauf selbst bleibt erhalten. Kein Lime, kein Wechsel auf Weiß.
- Abstände/Rhythmus: Unverändert bis auf den 2-px-Lift; die Telefon-Pille links daneben bleibt an ihrem Platz.
- Mobil: Nicht geprüft — kein Mobile-Hover-Shot; der Primär-CTA fehlt mobil laut Sektion 02 in der Leiste.
- Pattern: Kandidat: CTA-Hover mit Aufhellung plus Lift

### 16d — Hover in der Sticky-Nav [home-hover-02.png | -]
- Anordnung: `home-hover-00.png`, `home-hover-01.png` und `home-hover-02.png` zeigen die Seite gescrollt, mit der Sticky-Leiste aus Sektion 02: Die Topbar ist verschwunden, die weiße Nav sitzt am oberen Rand. `home-hover-00.png` und `home-hover-01.png` sind pixelgleich und liefern den ungehoverten Vergleichszustand. In `home-hover-02.png` erscheint die Hover-Pille bei x 726–831 und y 18–48 — dieselbe x-Spanne wie „Finanzierung" in `home-desktop-hover-03-Finanzierung.png`, nur um die weggefallene Topbar-Höhe nach oben versetzt.
- Buttons/Komponenten: Die Pille ist maßgleich zum ungescrollten Zustand: ca. 31 px hoch, dieselbe Einfallkurve an den Ecken (y 18 beginnt bei x 732, y 23 bei x 726), also wieder Radius ca. 6–8 px. Der Hover-Zustand ist damit unabhängig davon, ob die Leiste sticky ist oder nicht.
- Typo: Unverändert gegenüber `home-hover-00.png`.
- Farbe/Fläche: Gemessen `#e7ece9` an vier freien Punkten in `home-hover-02.png` (x 730 y 22, x 730 y 32, x 828 y 32, x 760 y 46), gegen `#ffffff` an denselben Stellen in `home-hover-00.png`. Exakt derselbe Wert wie in Sektion 16a — die Sticky-Leiste bekommt keinen eigenen Hover-Ton.
- Abstände/Rhythmus: Kein Layoutsprung; die Pille liegt vollständig innerhalb der Leiste.
- Mobil: Nicht geprüft — kein Mobile-Hover-Shot.
- Pattern: Kandidat: Nav-Hover-Pille auf Neutralgrau (identisch zu 16a)

### 16e — Nicht belegte Hover-Zustaende [home-desktop-hover-04-Blog.png | -]
- Anordnung: Alle zehn Hover-Shots stehen auf dem Fold; der tiefste sichtbare Bereich endet bei y 900. Damit liegt keine der Kartensektionen im Bild: Produktkarten (Sektion 06), Reviews-Grid (Sektion 13), Referenz-Grid (Sektion 14) und die Footer-Blog-Teaser (Sektion 16) sind in `home-desktop-hover-04-Blog.png` und allen übrigen Hover-Shots nicht erfasst.
- Buttons/Komponenten: Für Karten-, Slider- und Footer-Hover gibt es folglich keinen Beleg. Die Slider-Pfeile aus Sektion 08 sind nur als Klickzustand dokumentiert (`home-desktop-click-y2250-00-previous_slide.png`, `home-desktop-click-y2250-01-next_slide.png`), die Tab-Leiste aus Sektion 10 ebenfalls nur als Klick (`home-desktop-click-y3000-00-SOLARMODULE.png` und die vier Geschwister-Shots) — Klick ist nicht Hover und wird hier nicht als Hover-Beleg geführt.
- Typo: Nicht geprüft.
- Farbe/Fläche: Nicht geprüft. Zu den unterhalb des Folds liegenden Komponenten lässt sich aus dem vorhandenen Material kein Hover-Verhalten ableiten; eine Übertragung der Header-Regel auf Karten wäre eine Vermutung und wird bewusst nicht notiert.
- Abstände/Rhythmus: Nicht geprüft.
- Mobil: Nicht geprüft — kein Mobile-Hover-Shot im Set.
- Pattern: —

---

## Seite: /produkte/solaranlagen

### 17 — Sub-Hero-Band [produkte__solaranlagen-desktop-00-fold.png | produkte__solaranlagen-mobile-00-fold.png]
- Anordnung: Vollbreites Band direkt unter der Nav, ca. 240 px hoch, kein Bild, kein Split. Alle drei Textelemente strikt zentriert und untereinander: Breadcrumb, H1, ein Lead-Satz. Das Band endet mit einer harten Kante gegen Weiß — kein Verlauf in die nächste Sektion. Dieses Band eröffnet identisch aufgebaut alle vier Unterseiten (siehe Sektionen 22, 24, 27) und ist das stärkste wiederkehrende Element der Site.
- Buttons/Komponenten: Kein Button. Der Breadcrumb ist kein Chip und keine Pille, sondern reiner Text: zwei Versal-Labels, getrennt durch ein kleines gefülltes Chevron nach rechts. Beide Segmente sind gleich gesetzt, es gibt keine visuelle Unterscheidung zwischen Elternebene und aktueller Seite.
- Typo: Dreistufig. Breadcrumb in Grotesk-Versalien ca. 13,5 px mit sehr weitem Letterspacing (geschätzt ca. 0,15 em). H1 einzeilig in Condensed-Versalien ca. 52 px. Lead in Grotesk Regular ca. 16,5 px. Verhältnis H1 zu Lead etwa 3,2:1, also etwas flacher als im Startseiten-Hero. Auffällig: Die H1 ist hier kleiner als die H2 mancher Startseiten-Sektionen — die Unterseiten-H1 ist bewusst zurückgenommen.
- Farbe/Fläche: Diagonalverlauf, gemessen links `#1b4a2d`, mittig oben `#16422a`, rechts unten `#0a2e24` — also derselbe Verlauf wie im Stats-Band, hier aber deutlich flacher, weil das Band niedriger ist. Akzent nur auf dem Breadcrumb in Lime. H1 und Lead weiß.
- Abstände/Rhythmus: Padding oben ca. 60 px, unten ca. 62 px. Breadcrumb zu H1 ca. 24 px, H1 zu Lead ca. 20 px. Sehr kompaktes Band — es dient als Kopfzeile, nicht als Hero.
- Mobil: Wie Desktop gestapelt, alles bleibt zentriert. Die H1 bricht auf zwei Zeilen und schrumpft auf ca. 32 px, der Lead auf zwei Zeilen. Das Band wird dadurch ca. 250 px hoch, also etwa gleich hoch wie am Desktop. Der Breadcrumb bleibt einzeilig und behält Größe und Sperrung bei.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 18 — Intro-Split [produkte__solaranlagen-desktop-00-fold.png | produkte__solaranlagen-mobile-00-fold.png]
- Anordnung: 2-Spalten-Split auf weißer Fläche, links Text auf ca. 45 %, rechts ein Foto mit Radius ca. 12 px im Querformat etwa 3:2. Die Textspalte ist vertikal mittig zum Foto ausgerichtet. Reihenfolge links: Eyebrow, zweizeilige H2, Fließtext, ein Button. Dasselbe Split-Schema wiederholt sich auf dieser Seite in Sektion 21 gespiegelt (Bild links) und auf `/finanzierung` in Sektion 25 und 26.
- Buttons/Komponenten: Ein gefüllter Button, dunkelgrün, Radius ca. 6–8 px, ca. 46 px hoch, weißer Condensed-Versal-Text, kein Icon, linksbündig unter dem Text.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing, mittelgrau. H2 zweizeilig in Condensed-Versalien ca. 46 px, Zeilenhöhe knapp über 1,0. Fließtext Grotesk Regular ca. 16 px über drei Zeilen, Zeilenhöhe ca. 1,5.
- Farbe/Fläche: Fläche reinweiß. Kein Lime in dieser Sektion. Die einzige Farbe ist der grüne Button — auf den Unterseiten wird der Akzent also deutlich sparsamer eingesetzt als auf der Startseite.
- Abstände/Rhythmus: Sektions-Padding oben ca. 96 px. Rinne zwischen den Spalten ca. 80 px. Eyebrow zu H2 ca. 16 px, H2 zu Fließtext ca. 26 px, Fließtext zu Button ca. 30 px.
- Mobil: Stapelt, Text zuerst, Bild darunter — die Bild-links/Bild-rechts-Unterscheidung des Desktops verschwindet also mobil vollständig. Die H2 bricht auf drei Zeilen. Im 390-Fold ist die Sektion durch das Cookie-Overlay unterhalb der H2 abgeschnitten; Button und Bild sind dort nicht sichtbar.
- Pattern: Kandidat: Intro-Split Text/Bild

### 19 — Vorteils-Kachelraster [produkte__solaranlagen-desktop-02-y750.png | -]
- Anordnung: Weiße Fläche, 3-Spalten-Raster aus sechs Kacheln in zwei Reihen, **ohne** Sektionskopf — das Raster steht ohne Eyebrow und ohne H2 direkt im Fluss. Die Kacheln der ersten Reihe sind gleich hoch; in der zweiten Reihe ist eine Kachel höher, weil ihre Überschrift zweizeilig umbricht, und die Nachbarkacheln ziehen mit. Innerhalb jeder Kachel ist der Inhalt oben ausgerichtet, nicht zentriert.
- Buttons/Komponenten: Flache Kacheln, Radius ca. 10 px, sehr helles Grau als Füllung (gemessen `#f5f5f5`), kein Rahmen, kein Schatten, kein Icon, kein Link, kein Badge. Bewusst ohne jedes Ornament — je Kachel nur eine Überschrift und zwei Zeilen Text. Das ist das Gegenteil einer Icon-Karten-Soup: die Reduktion ist hier das Gestaltungsmittel.
- Typo: Zweistufig je Kachel. Überschrift in Condensed-Versalien ca. 25 px, dunkel. Text in Grotesk Regular ca. 15,5 px, Zeilenhöhe ca. 1,5, mittelgrau. Verhältnis etwa 1,6:1 — sehr flach, wodurch die Kacheln ruhig wirken.
- Farbe/Fläche: Sektionsfläche weiß, Kacheln hellgrau. Keinerlei Akzentfarbe, kein Grün, kein Lime. Die einzige Sektion im gesamten Atlas ohne jeden Farbwert außer Grauwerten.
- Abstände/Rhythmus: Rinne ca. 34 px horizontal und ca. 34 px vertikal. Innenabstand je Kachel ca. 24 px. Überschrift zu Text ca. 12 px. Kompakt, aber nicht gedrängt.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-OFFER-PAIR` (Lücke: sechs Kacheln statt zwei)

### 20 — Hersteller-Split [produkte__solaranlagen-desktop-02-y750.png | -]
- Anordnung: 2-Spalten-Split, gespiegelt zu Sektion 18: links das Bild, rechts der Text. Das Bild ist deutlich hochformatiger als in Sektion 18, etwa 1:1, mit Radius ca. 12 px. Die Textspalte rechts ist oben ausgerichtet, nicht mittig — weil der Textkörper hier aus zwei Absätzen besteht und fast die Bildhöhe erreicht. Über den zwei Sektionen 18 und 20 entsteht so ein Zickzack, verstärkt durch eine feine horizontale Trennlinie über die volle Breite zwischen den beiden.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button wie in Sektion 18, identische Form und Größe. Im Bild selbst liegt ein Hersteller-Logo als Bildbestandteil, kein Overlay-Element.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing. H2 einzeilig in Condensed-Versalien ca. 46 px. Zwei Fließtext-Absätze in Grotesk Regular ca. 16 px, Zeilenhöhe ca. 1,55, der erste über acht Zeilen, der zweite über drei.
- Farbe/Fläche: Fläche weiß. Kein Lime. Wieder nur der grüne Button als Farbträger.
- Abstände/Rhythmus: Sektions-Padding oben ca. 90 px, unten ca. 90 px. Rinne ca. 80 px. Zwischen den zwei Absätzen ca. 22 px. Fließtext zu Button ca. 32 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: Kandidat: Intro-Split Text/Bild (gespiegelt)

### 21 — CTA-Band Mitte [produkte__solaranlagen-desktop-02-y750.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: identisch zu Sektion 09 der Startseite, inklusive der rechten CTA-Box mit Lime-Button und Telefonzeile darunter. Auf dieser Seite steht das Band nicht in der Mitte, sondern direkt vor der Schluss-Sektion.
- Mobil: nicht belegt.
- Pattern: `P-CTA-MID` (mit Abweichung: Fläche dunkelgrün statt `surface`)

### 22 — Abschluss-Split, Schluss-CTA und Footer [produkte__solaranlagen-desktop-04-y2215.png | -]
- Anordnung: Drei Sektionen in Folge. Zuerst ein weiterer Bild-links/Text-rechts-Split nach dem Muster aus Sektion 20, mit Eyebrow, zweizeiliger H2, Fließtext und einem gefüllten grünen Button. Darauf folgen die Schluss-CTA-Kachel und der Footer **unverändert** wie auf der Startseite dokumentiert — gleiche Kachel, gleiches Foto, gleicher Verlauf, gleicher weißer Button, gleiche vier Linkspalten mit Lime-Titeln, gleiche vier Blog-Teaser, gleiche Fußzeile.
- Buttons/Komponenten: Wie Sektion 15 und 16.
- Typo: Wie Sektion 15 und 16.
- Farbe/Fläche: Wie Sektion 15 und 16.
- Abstände/Rhythmus: Wie Sektion 15 und 16.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /ueber-uns

### 23 — Sub-Hero-Band [ueber-uns-desktop-00-fold.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17. Unterschied nur im Umfang des Breadcrumb-Elements: hier steht statt zweier Segmente mit Chevron ein einzelnes langes Versal-Label ohne Trenner.
- Mobil: nicht als eigener Shot geprüft; Verhalten nach Sektion 17 zu erwarten, nicht belegt.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 24 — Vollbreites Gebäudefoto [ueber-uns-desktop-00-fold.png | -]
- Anordnung: Ein einzelnes großes Foto im Container, Radius ca. 12 px, das direkt unter dem Sub-Hero-Band beginnt und dabei ca. 250 px in das grüne Band hineinragt — Band und Bild überlappen also, statt aneinander zu stoßen. Das Bild trägt keinen Text, kein Overlay, keine Bildunterschrift. Es läuft im Fold nach unten aus dem Bild.
- Buttons/Komponenten: Keine.
- Typo: Keine.
- Farbe/Fläche: Hinter dem Bild wechselt die Fläche auf Weiß, während das Band darüber grün bleibt — die Überlappung ist dadurch sauber lesbar. Das Motiv trägt selbst Lime (Fassadenbeschriftung), was den Akzent ohne ein einziges gefärbtes UI-Element in die Sektion bringt.
- Abstände/Rhythmus: Bildbreite auf Container-Maß, seitlich ca. 144 px Rand. Überlappung nach oben ca. 250 px.
- Mobil: nicht belegt.
- Pattern: `P-GALLERY` (Einzelbild)

### 25 — Team-Grid Büro [ueber-uns-desktop-04-y2250.png | -]
- Anordnung: Dunkelgrüne Fläche, 4-Spalten-Raster aus Personenkarten über mehrere Reihen. Wie im Reviews-Grid sind die Karten **nicht** gleich hoch: wo ein Name oder eine Rolle zweizeilig umbricht, wird die Karte länger und steht unten aus der Reihe heraus. Die Bildzonen bleiben dabei alle exakt gleich hoch, nur der weiße Textfuß wächst. Innerhalb der Karte ist der Text linksbündig, nicht zentriert.
- Buttons/Komponenten: Karten mit Radius ca. 10 px, zweigeteilt: oben ein Porträt im Hochformat etwa 4:5 über die volle Kartenbreite, unten ein weißer Textfuß. Kein Rahmen, kein Schatten, kein Icon, kein Social-Link, kein Hover-Indikator. Die Porträts folgen einer strengen Serie: gleiche dunkelblaue Jacke mit Lime-Logo, gleiche Kopfhöhe, gleicher Bildausschnitt ab Hüfte, unscharfer Büro-Hintergrund. Diese Konsistenz ist der eigentliche Träger der Sektion.
- Typo: Zweistufig im Fuß, und die Reihenfolge ist ungewöhnlich: **oben** die Rolle, **darunter** der Name. Rolle in Grotesk-Versalien ca. 12,5 px mit leichtem Letterspacing, mittelgrau. Name in Condensed-Versalien ca. 26 px, dunkel. Verhältnis etwa 2,1:1. Die Rolle wird dadurch wie ein Eyebrow behandelt — dasselbe Prinzip wie bei den Referenzkarten in Sektion 14.
- Farbe/Fläche: Sektionsfläche dunkelgrün mit Verlauf. Kartenfuß reinweiß — der harte Hell-Dunkel-Wechsel innerhalb jeder Karte ist das visuelle Raster der Sektion. Kein Lime im UI; Lime erscheint nur als Logo auf der Kleidung in den Fotos.
- Abstände/Rhythmus: Rinne ca. 34 px horizontal, ca. 46 px vertikal. Innenabstand im Fuß ca. 22 px. Rolle zu Name ca. 6 px. Sehr dichtes Raster, weil die Sektion viele Personen tragen muss.
- Mobil: nicht belegt.
- Pattern: `P-TEAM`

### 26 — Team-Grid Montage mit Zwischenkopf [ueber-uns-desktop-09-y6000.png | -]
- Anordnung: Dasselbe 4-Spalten-Kartenraster wie Sektion 25, aber auf **weißer** Fläche statt grün — die Sektion ist also die helle Variante desselben Bausteins. Die letzte Reihe ist unvollständig und bleibt linksbündig stehen, die zwei leeren Rasterplätze rechts werden nicht aufgefüllt oder zentriert. Darunter folgt ein neuer, zentrierter Sektionskopf auf grüner Fläche und ein weiteres Raster desselben Typs — die Seite reiht also mehrere Team-Blöcke aneinander und wechselt zwischen ihnen jeweils die Flächenfarbe.
- Buttons/Komponenten: Karten identisch zu Sektion 25 in Aufbau und Radius. Unterschied nur im Fotostil: dunkle Arbeitsjacken mit Lime-Details vor einem Lager-Hintergrund statt Bürojacken vor Büro-Hintergrund. Innerhalb jedes Blocks bleibt die Serie streng, zwischen den Blöcken wechselt sie bewusst.
- Typo: Wie Sektion 25 — Rolle über Name, gleiche Größen. Der Zwischenkopf ist dreistufig: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing in Lime, H2 in Condensed-Versalien ca. 44 px in Weiß, Lead in Grotesk Regular ca. 16,5 px.
- Farbe/Fläche: Oberer Block auf Weiß, Kartenfüße dort ebenfalls weiß — dadurch verschwindet die Fußfläche optisch und nur die Fotos bilden das Raster. Unterer Block auf dunkelgrünem Verlauf mit weißen Kartenfüßen wie Sektion 25. Der Hell-Dunkel-Wechsel gliedert die sehr lange Seite.
- Abstände/Rhythmus: Rinne wie Sektion 25. Zwischen dem Ende des hellen Rasters und der Grünkante ca. 130 px Luft — ein bewusst großer Absatz vor dem Farbwechsel. Zwischenkopf-Padding oben ca. 70 px, Kopf zu Raster ca. 60 px.
- Mobil: nicht belegt.
- Pattern: `P-TEAM`

---

## Seite: /referenzen

### 27 — Sub-Hero-Band [referenzen-desktop-00-fold.png | referenzen-mobile-00-fold.png]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17, einschließlich zentrierter Dreistufung und harter Unterkante gegen Weiß.
- Mobil: Wie Desktop gestapelt und zentriert. Die H1 bricht auf zwei Zeilen bei ca. 32 px, der Lead auf zwei Zeilen. Der Breadcrumb bleibt einzeilig in Lime. Bandhöhe mobil ca. 260 px.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 28 — Referenz-Grid zweispaltig [referenzen-desktop-00-fold.png | referenzen-mobile-00-fold.png]
- Anordnung: Weiße Fläche, dasselbe Karten-Bauteil wie Sektion 14, aber im **2-Spalten**-Raster statt dreispaltig — die Karten sind dadurch deutlich größer, das Luftbild bekommt mehr Fläche und die Kennzahlzeile wirkt schwerer. Kein Sektionskopf: das Raster startet direkt unter dem Sub-Hero-Band. Die Reihe läuft über die gesamte Seitenlänge durch, ohne Zwischenüberschriften oder Filter.
- Buttons/Komponenten: Karte identisch zu Sektion 14 in Aufbau und Radius: Luftbild oben, PLZ-Pille oben rechts auf dem Foto, dunkelgrüner Datenkörper unten mit Lime-Ortszeile, Condensed-Kennzahl und zwei rahmenlosen Fakten-Chips mit Linien-Icon. Durch die größere Kartenbreite stehen die zwei Chips hier nebeneinander mit viel Luft dazwischen statt gedrängt. Kein Sektions-Button am Ende des Rasters — anders als auf der Startseite.
- Typo: Ortszeile in Grotesk-Versalien ca. 14 px mit weitem Letterspacing in Lime, Kennzahl in Condensed-Versalien ca. 30 px in Weiß, Chip-Text in Grotesk Regular ca. 14 px, hier einzeilig statt zweizeilig. Die Größen wachsen gegenüber Sektion 14 um etwa ein Viertel mit.
- Farbe/Fläche: Fläche weiß, Kartenkörper dunkelgrüner Verlauf, Akzent genau einmal je Karte auf der Ortszeile.
- Abstände/Rhythmus: Raster-Start ca. 76 px unter dem Band. Rinne ca. 34 px horizontal, ca. 40 px vertikal. Innenabstand im Datenkörper ca. 30 px.
- Mobil: Einspaltig, eine Karte pro Reihe über die volle Container-Breite. Die PLZ-Pille bleibt oben rechts auf dem Foto und behält ihre Größe. Der untere Teil der ersten Karte wird im Fold vom Cookie-Overlay verdeckt; die Datenkörper-Anatomie mobil ist daher aus dem Fold-Shot nicht vollständig lesbar.
- Pattern: `P-GALLERY`

### 29 — Schluss-CTA und Footer [referenzen-desktop-10-y6586.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Die letzte Referenzkarte steht dabei allein in der linken Spalte, der rechte Rasterplatz bleibt leer, und darunter folgt direkt die CTA-Kachel.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /finanzierung

### 30 — Sub-Hero-Band [finanzierung-desktop-00-fold.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17. Der Breadcrumb steht hier wie auf `/ueber-uns` als einzelnes Versal-Label ohne Chevron.
- Mobil: nicht belegt.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 31 — Intro-Split [finanzierung-desktop-00-fold.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 18 — Text links, Foto rechts mit Radius ca. 12 px, Eyebrow/zweizeilige H2/Fließtext/gefüllter grüner Button, Rinne ca. 80 px. Das Foto ist hier ein Abendmotiv, der Aufbau ist identisch.
- Mobil: nicht belegt.
- Pattern: Kandidat: Intro-Split Text/Bild

### 32 — Argument-Split gespiegelt [finanzierung-desktop-02-y750.png | -]
- Anordnung: Wie Sektion 20 — Bild links, Text rechts, getrennt von der Sektion darüber durch eine feine horizontale Linie über die volle Breite. Das Bild ist hier querformatiger, etwa 3:2, mit Radius ca. 12 px. Textspalte oben ausgerichtet.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button, Form und Größe identisch zu Sektion 18 und 20.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing. H2 einzeilig in Condensed-Versalien ca. 46 px. Fließtext Grotesk Regular ca. 16 px über fünf Zeilen. Die Kernaussage im Fließtext ist typografisch **nicht** hervorgehoben — keine Fettung, kein Lime, keine eigene Zeile. Die Seite verzichtet an ihrer wichtigsten Stelle bewusst auf Auszeichnung.
- Farbe/Fläche: Fläche weiß, kein Lime, nur der grüne Button.
- Abstände/Rhythmus: Sektions-Padding oben ca. 90 px, unten ca. 90 px. Rinne ca. 80 px. Fließtext zu Button ca. 30 px.
- Mobil: nicht belegt.
- Pattern: Kandidat: Intro-Split Text/Bild (gespiegelt)

### 33 — CTA-Band, Schluss-CTA und Footer [finanzierung-desktop-02-y750.png, finanzierung-desktop-03-y1247.png | -]
- Anordnung: Die drei Schlusssektionen folgen direkt aufeinander und sind unverändert wie dokumentiert: das dunkelgrüne CTA-Band mit rechter Box und Lime-Button (Sektion 09/21), die Schluss-CTA-Kachel mit Grünverlauf links, Foto rechts und weißem Button (Sektion 15), der Footer mit Lime-Spaltentiteln, Social-Icons, vier Blog-Teasern und Fußzeile (Sektion 16). Auf dieser kurzen Seite stehen damit drei CTA-Flächen in Folge, unterbrochen nur durch einen schmalen weißen Streifen zwischen Band und Kachel.
- Buttons/Komponenten: Wie Sektion 09, 15 und 16.
- Typo: Wie Sektion 09, 15 und 16.
- Farbe/Fläche: Wie Sektion 09, 15 und 16. Der weiße Streifen zwischen den zwei grünen Flächen ist ca. 100 px hoch und die einzige Trennung.
- Abstände/Rhythmus: Wie Sektion 09, 15 und 16.
- Mobil: nicht belegt.
- Pattern: `P-CTA-MID` plus `P-CTA-END` plus Footer (siehe Sektion 09, 15, 16)

---

## Seite: /produkte/waermepumpen

Vorbemerkung: Diese Route trägt eine **zweite Marken-Haut**. Logo, Nav-CTA,
Sub-Hero-Band, CTA-Band und alle Primärbuttons sind hier blau statt grün, das
Logo liest „ELEPHANT THERM" statt „ELEPHANT SOLAR" (`produkte__waermepumpen-desktop-01-y0.png`).
Lime kommt auf der ganzen Route erst im Schluss-CTA und im Footer zurück, wo
die Seite wieder auf die Solar-Haut umschaltet (`produkte__waermepumpen-desktop-04-y2250.png`).
Topbar- und Nav-Geometrie bleiben unverändert wie Sektion 01 und 02; Schluss-CTA
und Footer wie Sektion 15 und 16.

### 34 — Sub-Hero-Band Therm-Haut [produkte__waermepumpen-desktop-01-y0.png | produkte__waermepumpen-mobile-00-fold.png]
- Anordnung: Vollbreites Band direkt unter der Nav, ca. 240 px hoch, alle Elemente strikt zentriert und untereinander: ein Pillen-Badge, H1, ein Lead-Satz. Baugleich zu Sektion 17, aber der Breadcrumb ist durch eine gefüllte Pille ersetzt — das ist der einzige Ort im Atlas, an dem der Kopfzeilen-Slot eine Fläche statt reinen Text trägt. Harte Unterkante gegen Weiß, kein Verlauf.
- Buttons/Komponenten: Kein Button. Der Badge ist eine vollrunde Pille (Radius ca. 100 px), ca. 380×32 px, mit **Farbverlauf von Magenta links nach Blau rechts** und weißem Versal-Text. Der Verlauf läuft nicht bis zum Pillenende durch, sondern blendet rechts in die Bandfläche aus — die Pille hat also keine sichtbare rechte Kante.
- Typo: Dreistufig. Badge in Grotesk-Versalien ca. 13,5 px mit sehr weitem Letterspacing (geschätzt ca. 0,15 em). H1 einzeilig in Condensed-Versalien ca. 54 px. Lead in Grotesk Regular ca. 16,5 px. Dieselbe Staffelung wie Sektion 17.
- Farbe/Fläche: Bandfläche Blauverlauf statt Grün, hell oben links nach kräftiger unten rechts (geschätzt ca. `#3ba3e0` nach `#1f7fc4`; Messpunkte liegen auf dem Verlauf). H1 und Lead weiß. Kein Lime auf dieser Fläche.
- Abstände/Rhythmus: Padding oben ca. 58 px, unten ca. 60 px. Badge zu H1 ca. 26 px, H1 zu Lead ca. 20 px. Praktisch identisch zum grünen Sub-Hero-Band.
- Mobil: Wie Desktop gestapelt und zentriert. Die Badge-Pille bricht auf zwei Zeilen und wird dadurch zu einem hohen abgerundeten Block statt einer Pille (`produkte__waermepumpen-mobile-00-fold.png`); der Magenta-Blau-Verlauf bleibt erhalten. H1 bricht auf zwei Zeilen bei ca. 32 px, Lead auf drei Zeilen. Bandhöhe mobil ca. 330 px.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild (Variante mit Badge-Pille)

### 35 — Intro-Split Therm [produkte__waermepumpen-desktop-01-y0.png | produkte__waermepumpen-mobile-00-fold.png]
- Anordnung: 2-Spalten-Split auf weißer Fläche, links Text auf ca. 45 %, rechts ein Foto im Querformat etwa 3:2 mit Radius ca. 12 px. Textspalte vertikal mittig zum Foto. Reihenfolge links: zweizeilige H2, Fließtext, Button-Paar. **Kein Eyebrow** — anders als in Sektion 18, wo derselbe Split mit Eyebrow beginnt.
- Buttons/Komponenten: Button-**Paar** statt Einzelbutton, der zweite Unterschied zu Sektion 18. Links ein gefüllter Primärbutton in Marken-Blau, Radius ca. 6–8 px, ca. 44 px hoch, weißer Condensed-Versal-Text, kein Icon. Rechts ein Sekundärbutton mit sehr hellgrauer Füllung, gleicher Radius und Höhe, dunkler Condensed-Versal-Text, kein Icon, kein Rahmen. Das Paar sitzt linksbündig, Abstand ca. 14 px.
- Typo: H2 zweizeilig in Condensed-Versalien ca. 46 px, Zeilenhöhe knapp über 1,0, dunkel. Fließtext Grotesk Regular ca. 16 px über sieben Zeilen, Zeilenhöhe ca. 1,5. Buttons in Condensed-Versalien ca. 14 px.
- Farbe/Fläche: Fläche reinweiß. Kein Lime, kein Grün. Einziger Farbträger ist der blaue Primärbutton (Flächenwert geschätzt ca. `#1f8ed6`).
- Abstände/Rhythmus: Sektions-Padding oben ca. 80 px. Rinne zwischen den Spalten ca. 80 px. H2 zu Fließtext ca. 26 px, Fließtext zu Button-Paar ca. 30 px. Unter der Sektion eine feine horizontale Trennlinie über die volle Breite.
- Mobil: Stapelt, Text zuerst. Im 390-Fold ist die Sektion ab der zweiten Fließtextzeile vom Cookie-Overlay verdeckt; Button-Paar und Foto sind dort nicht sichtbar.
- Pattern: Kandidat: Intro-Split Text/Bild

### 36 — Vorteils-Kachelraster Therm [produkte__waermepumpen-desktop-02-y750.png | -]
- Anordnung: Weiße Fläche, 3-Spalten-Raster aus sechs Kacheln in zwei Reihen, ohne Sektionskopf — baugleich zu Sektion 19. Alle sechs Kacheln sind hier gleich hoch, weil keine Überschrift umbricht; die Ungleichheit aus Sektion 19 tritt also nicht auf. Inhalt je Kachel oben ausgerichtet.
- Buttons/Komponenten: Flache Kacheln, Radius ca. 10 px, sehr helles Grau als Füllung (Wert wie Sektion 19 `#f5f5f5`), kein Rahmen, kein Schatten, kein Icon, kein Link. Je Kachel nur Überschrift und drei bis vier Textzeilen.
- Typo: Zweistufig. Überschrift in Condensed-Versalien ca. 25 px, dunkel. Text in Grotesk Regular ca. 15,5 px, Zeilenhöhe ca. 1,5, mittelgrau.
- Farbe/Fläche: Sektionsfläche weiß, Kacheln hellgrau. Keinerlei Akzentfarbe — wie Sektion 19 die farbloseste Sektion der Route.
- Abstände/Rhythmus: Rinne ca. 34 px horizontal und vertikal. Innenabstand je Kachel ca. 24 px. Überschrift zu Text ca. 12 px. Nach der zweiten Reihe ca. 60 px Luft bis zur Kante des blauen CTA-Bandes.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-OFFER-PAIR` (Lücke: sechs Kacheln statt zwei)

### 37 — CTA-Band Therm [produkte__waermepumpen-desktop-02-y750.png | -]
- Anordnung: Vollbreites Band, zwei Zonen nebeneinander wie Sektion 09: links Badge-Pille, H2 und zweizeiliger Fließtext über ca. 55 %, rechts eine leicht abgesetzte Box mit Radius ca. 16 px, die den CTA und darunter eine Telefonzeile trägt. Die Box ist minimal heller als das Band, also wieder Fläche-in-Fläche.
- Buttons/Komponenten: Ein einziger CTA, hier **weiß gefüllt mit blauem Text** statt Lime auf Grün — die Therm-Haut kehrt die Logik des Solar-CTA-Bandes um. Rechteck mit Radius ca. 6–8 px, Condensed-Versalien, kein Icon. Darunter eine reine Textzeile mit Telefonnummer. Das Eyebrow ist wie in Sektion 34 als Magenta-Blau-Verlaufspille ausgeführt, nicht als reiner Text — der zweite Auftritt dieses Bauteils.
- Typo: Badge in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, weiß. H2 einzeilig in Condensed-Versalien ca. 44 px, weiß. Fließtext Grotesk Regular ca. 16 px über zwei Zeilen. Verhältnis H2 zu Fließtext etwa 2,7:1.
- Farbe/Fläche: Bandfläche Blauverlauf wie Sektion 34, links heller als rechts. Kein Lime. Der Akzent ist hier die Verlaufspille, nicht die Buttonfüllung.
- Abstände/Rhythmus: Bandhöhe ca. 240 px, Padding oben ca. 60 px, unten ca. 60 px. Textblock und Box vertikal zueinander zentriert. Innerhalb der Box: CTA ca. 46 px unter der Oberkante, Telefonzeile ca. 20 px darunter.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-CTA-MID` (mit Abweichung: Fläche blau statt `surface`, Button weiß statt Akzent)

### 38 — Förder-Split mit Fußnote [produkte__waermepumpen-desktop-03-y1500.png | -]
- Anordnung: 2-Spalten-Split, Bild links, Text rechts — gespiegelt zu Sektion 35, dasselbe Zickzack-Prinzip wie auf `/produkte/solaranlagen`. Bild etwa 4:3 mit Radius ca. 12 px. Textspalte oben ausgerichtet. Reihenfolge rechts: dreizeilige H2, Fließtext, eine kleingesetzte Fußnote, Button-Paar. Die Fußnote **zwischen** Fließtext und Buttons ist die Besonderheit — sie liegt im Aktionsweg statt am Sektionsende.
- Buttons/Komponenten: Button-Paar identisch zu Sektion 35: blau gefüllt links, hellgrau gefüllt rechts, Radius ca. 6–8 px, ca. 44 px hoch, beide ohne Icon.
- Typo: H2 dreizeilig in Condensed-Versalien ca. 46 px, Zeilenhöhe knapp über 1,0 — die drei Zeilen stehen fast aufeinander. Fließtext Grotesk Regular ca. 16 px über vier Zeilen. Fußnote deutlich kleiner, ca. 12 px Regular über zwei Zeilen, mittelgrau, beginnt mit einem Sternchen. Sprung H2 zu Fußnote etwa 3,8:1.
- Farbe/Fläche: Fläche weiß. Kein Lime, kein Grün, nur der blaue Primärbutton als Farbträger.
- Abstände/Rhythmus: Sektions-Padding oben ca. 100 px, unten ca. 90 px. Rinne ca. 80 px. H2 zu Fließtext ca. 24 px, Fließtext zu Fußnote ca. 14 px, Fußnote zu Button-Paar ca. 26 px — die Fußnote klebt bewusst näher am Text als an den Buttons. Abschluss durch eine feine horizontale Trennlinie über die volle Breite.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: Kandidat: Intro-Split Text/Bild (gespiegelt)

### 39 — Erklär-Split mit nummerierter Liste [produkte__waermepumpen-desktop-03-y1500.png | -]
- Anordnung: 2-Spalten-Split, Text links, Bild rechts. Textspalte oben ausgerichtet, Bild etwa 4:3 mit Radius ca. 12 px und vertikal mittig zur Textspalte. Reihenfolge links: zweizeilige H2, Einleitungsabsatz, eine vierstellige nummerierte Liste. Kein Button — die einzige Sektion dieser Route ohne Aktion.
- Buttons/Komponenten: Keine Buttons. Die Liste ist bemerkenswert gebaut: sie trägt **gleichzeitig** runde Bullets und Ziffern im Text („1. …", „2. …"). Es ist also eine Bullet-Liste, deren Ziffern zum Textinhalt gehören, statt einer echten geordneten Liste — sichtbar an dem kleinen runden Punkt links vor jeder Ziffer. Keine Icons, keine Kacheln, keine Nummern-Kreise.
- Typo: H2 zweizeilig in Condensed-Versalien ca. 46 px. Einleitungsabsatz Grotesk Regular ca. 16 px über vier Zeilen. Listenpunkte ca. 15,5 px Regular, jeweils zwei Zeilen mit hängendem Einzug. Verhältnis H2 zu Liste etwa 3:1.
- Farbe/Fläche: Fläche weiß. Keine Akzentfarbe, kein Blau, kein Lime — die Sektion ist rein dunkel auf weiß plus Foto.
- Abstände/Rhythmus: Sektions-Padding oben ca. 110 px, unten ca. 110 px. Rinne ca. 80 px. H2 zu Absatz ca. 26 px, Absatz zu Liste ca. 22 px, zwischen den Listenpunkten ca. 10 px. Abschluss durch eine feine horizontale Trennlinie.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: Kandidat: Erklär-Split mit Schrittliste

### 40 — Ansprechpartner-Split [produkte__waermepumpen-desktop-04-y2250.png | -]
- Anordnung: 2-Spalten-Split, Foto links, Text rechts. Das Foto ist ein Einzelporträt im Querformat etwa 4:3 mit Radius ca. 12 px, unscharfer Innenraum-Hintergrund. Textspalte vertikal mittig zum Foto. Reihenfolge rechts: Eyebrow, zweizeilige H2, Fließtext. Kein Button — die Sektion verweist auf Kontakt, ohne selbst eine Aktion zu tragen.
- Buttons/Komponenten: Keine. Im Foto trägt die Person eine dunkelblaue Jacke mit kleinem Lime-Logo — derselbe Serien-Look wie die Team-Karten in Sektion 25, hier aber als einzelnes Motiv statt im Raster.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing, mittelgrau — hier wieder als reiner Text, nicht als Verlaufspille wie in Sektion 34 und 37. Die Pillen-Variante bleibt also auf die blauen Flächen beschränkt. H2 zweizeilig in Condensed-Versalien ca. 46 px. Fließtext Grotesk Regular ca. 16 px über drei Zeilen.
- Farbe/Fläche: Fläche weiß. Keine Akzentfarbe im UI; das einzige Lime der Sektion sitzt als Logo-Stickerei im Foto.
- Abstände/Rhythmus: Sektions-Padding oben ca. 100 px, unten ca. 90 px. Rinne ca. 80 px. Eyebrow zu H2 ca. 16 px, H2 zu Fließtext ca. 26 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-TEAM` (Einzelperson)

### 41 — Schluss-CTA und Footer, Rückkehr zur Solar-Haut [produkte__waermepumpen-desktop-04-y2250.png | -]
- Anordnung, Buttons, Typo, Abstände: unverändert wie Sektion 15 und 16 — Kachel mit Grünverlauf links, Foto rechts, weißer Button, darunter der grüne Footer mit Lime-Spaltentiteln und Lime-Wortmarke.
- Farbe/Fläche: Der bemerkenswerte Punkt dieser Route: Nach sieben blau geprägten Sektionen springt die Fläche hier ohne Übergang zurück auf den Solar-Grünverlauf und Lime. Marken-Haut und Seiten-Abschluss sind also entkoppelt — die Therm-Haut endet vor dem Schluss-CTA.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /anfrage

### 42 — Konfigurator-Schritt auf Vollfläche [anfrage-desktop-01-y0.png | anfrage-mobile-00-fold.png]
- Anordnung: Die Route hat **kein Sub-Hero-Band**. Direkt unter der Nav beginnt eine vollbreite dunkelgrüne Fläche, die den kompletten Konfigurator trägt — die einzige Seite im Atlas, deren erste Sektion zugleich ihre einzige Inhaltssektion ist. Aufbau: oben links ein dreistufiger Textblock (Eyebrow, H2, Lead) auf ca. 55 % Breite, oben rechts eine Schritt-Anzeige aus drei nebeneinanderliegenden Feldern. Darunter über die volle Container-Breite drei gleich große Auswahlkacheln im 3-Spalten-Raster. Ganz unten eine Fußzeile der Sektion: links ein Fortschritts-Zähler, rechts der Weiter-Button. Unter der Fußzeile stehen ca. 200 px leere Grünfläche, bevor die Sektion endet — die Fläche ist auf den höchsten der drei Schritte dimensioniert und schrumpft nicht mit.
- Buttons/Komponenten: Vier verschiedene Bauteile. Erstens die Schritt-Anzeige: der aktive Schritt ist ein breites Lime-gefülltes Feld (ca. 200×64 px, Radius ca. 12 px) mit einem dunkelgrünen abgerundeten Icon-Quadrat links und zwei Textzeilen rechts; die zwei inaktiven Schritte sind quadratische Felder (ca. 64×64 px, Radius ca. 12 px) mit heller Kontur, transparenter Füllung und einem zentrierten Linien-Icon — inaktiv wird also nicht nur die Farbe entzogen, sondern auch das Label und damit die Breite. Zweitens die Auswahlkacheln: ca. 362×280 px, Radius ca. 12 px, sehr dunkle transparente Füllung mit feiner hellerer Kontur, darin zentriert eine isometrische Illustration; der Kachel-Titel steht **außerhalb** und unterhalb der Kachel, nicht darin. Drittens der Weiter-Button: weiß gefüllt, dunkler Condensed-Versal-Text, Radius ca. 8 px, ca. 44 px hoch, kein Icon, rechtsbündig. Viertens der Zähler links, reiner Text ohne Fläche, mit gemischter Größe (große aktuelle Ziffer, kleiner Schrägstrich und Gesamtzahl).
- Typo: Eyebrow in Grotesk-Versalien ca. 13 px mit weitem Letterspacing, Lime. H2 einzeilig in Condensed-Versalien ca. 34 px, weiß — deutlich kleiner als die H1 der anderen Routen; der Konfigurator tritt bewusst als Werkzeug auf, nicht als Kampagnenseite. Lead in Grotesk Regular ca. 16 px über zwei Zeilen. Im aktiven Schritt-Feld zwei Stufen: Zeile eins ca. 13 px Regular, Zeile zwei in Condensed-Versalien ca. 17 px, beide dunkelgrün. Kacheltitel in Condensed-Versalien ca. 19 px, weiß, zentriert. Zähler-Ziffer ca. 22 px Condensed.
- Farbe/Fläche: Sektionsfläche dunkelgrüner Verlauf wie das Stats-Band, oben links heller. Lime trägt hier zwei Rollen gleichzeitig: den Eyebrow als Text und das aktive Schritt-Feld als Fläche. Das ist neben dem CTA-Band (Sektion 09) der zweite Ort mit Lime als Füllung — und der einzige, an dem Lime einen **Zustand** markiert statt eine Aktion. Die Auswahlkacheln tragen keinen Akzent, auch nicht im Ausgangszustand.
- Abstände/Rhythmus: Sektions-Padding oben ca. 70 px. Textblock zu Kachelraster ca. 60 px. Rinne zwischen den Kacheln ca. 34 px. Kachel zu Titel ca. 22 px. Titelreihe zu Fußzeile ca. 60 px. Zwischen den Schritt-Feldern ca. 16 px.
- Mobil: Die Schritt-Anzeige entfällt im Fold komplett — mobil führt nur noch der Textzähler durch den Fluss. Die drei Auswahlkacheln stapeln einspaltig über die volle Container-Breite und behalten Höhe und Radius. Der Textblock bleibt linksbündig, H2 bricht auf zwei Zeilen bei ca. 30 px. Ab der zweiten Kachel ist der Fold vom Cookie-Overlay verdeckt; Weiter-Button und Zähler sind mobil nicht belegt.
- Pattern: Kandidat: Konfigurator-Schritt mit Kachelauswahl

### 43 — Schluss-CTA und Footer [anfrage-desktop-02-y682.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Die CTA-Kachel folgt direkt auf die Konfigurator-Sektion; dazwischen liegt ein weißer Streifen von ca. 100 px, derselbe Trenner wie auf `/finanzierung` (Sektion 33). Weil die Konfigurator-Fläche bereits dunkelgrün ist, stehen hier drei grüne Flächen mit nur einem weißen Streifen dazwischen.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /karriere

### 44 — Sub-Hero-Band [karriere-desktop-01-y0.png | karriere-mobile-00-fold.png]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17 — zentrierte Dreistufung, harte Unterkante gegen Weiß. Abweichung im ersten Slot: statt eines Breadcrumbs mit Chevron steht hier ein Eyebrow-Satz in Lime-Versalien, also ein beschreibendes Label statt einer Pfadangabe.
- Mobil: Wie Desktop gestapelt und zentriert (`karriere-mobile-00-fold.png`). H1 bricht auf zwei Zeilen bei ca. 32 px, Lead auf drei Zeilen. Der Lime-Eyebrow bleibt einzeilig und behält Größe und Sperrung. Bandhöhe mobil ca. 300 px.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 45 — Leerstatus-Banner [karriere-desktop-01-y0.png | karriere-mobile-00-fold.png]
- Anordnung: Eine einzelne breite Fläche im Container, ca. 1150×135 px, mit zentriertem zweizeiligem Text. Kein Raster, keine Karten, kein Button, kein Icon — die Sektion ist ein reiner Leerstatus und wird trotzdem als eigene Fläche mit Innenabstand gebaut statt als bloßer Absatz. Bemerkenswert, weil das die einzige Stelle im Atlas ist, an der ein Leerzustand überhaupt gestaltet wurde.
- Buttons/Komponenten: Keine. Fläche mit Radius ca. 10 px, ohne Rahmen, ohne Schatten.
- Typo: Zweistufig, beides zentriert. Überschrift in Condensed-Versalien ca. 32 px, dunkel. Untertitel in Grotesk Regular ca. 16 px, mittelgrau. Verhältnis etwa 2:1.
- Farbe/Fläche: Sektionsfläche weiß, Bannerfläche sehr helles Grau (Wert wie die Kacheln in Sektion 19, `#f5f5f5`). Keinerlei Akzentfarbe — kein Lime, kein Grün, nicht einmal im Text.
- Abstände/Rhythmus: Sektions-Padding oben ca. 75 px, unten ca. 75 px. Innenabstand im Banner oben/unten je ca. 44 px. Überschrift zu Untertitel ca. 14 px.
- Mobil: Das Banner bleibt als eigene graue Fläche erhalten und läuft über die volle Container-Breite. Die Überschrift bricht auf zwei Zeilen, der Untertitel ebenfalls; die Fläche wird dadurch ca. 190 px hoch. Alles bleibt zentriert.
- Pattern: Kandidat: Leerstatus-Banner

### 46 — Team-Grid Karriere [karriere-desktop-01-y0.png, karriere-desktop-02-y750.png | -]
- Anordnung: Dunkelgrüne Fläche, zentrierter dreistufiger Kopfblock, darunter ein 4-Spalten-Raster aus Personenkarten über mehrere Reihen — dieselbe Anatomie wie Sektion 25, hier aber mit eigenem Kopfblock statt kopflos. Die Karten sind wieder **nicht** gleich hoch: wo eine Rolle zweizeilig umbricht oder eine E-Mail-Pille fehlt, verschiebt sich die Unterkante. Die Bildzonen bleiben exakt gleich hoch, nur der weiße Textfuß wächst.
- Buttons/Komponenten: Karten mit Radius ca. 10 px, zweigeteilt: oben ein Porträt im Hochformat etwa 4:5 über die volle Kartenbreite, unten ein weißer Textfuß. Neu gegenüber Sektion 25 ist ein drittes Element im Fuß: eine **E-Mail-Pille** unter dem Namen — vollrunde Pille (Radius ca. 100 px) mit sehr hellgrauer Füllung, dunklem Text ca. 13 px, nur so breit wie ihr Inhalt. Sie ist nicht auf allen Karten vorhanden; wo die Adresse fehlt, steht an ihrer Stelle ein kurzer leerer Pillen-Stummel von ca. 20×8 px (`karriere-desktop-02-y750.png`), also ein sichtbarer Platzhalter statt einer Auslassung. Kein Rahmen, kein Schatten, kein Social-Link.
- Typo: Dreistufig im Fuß, Reihenfolge wie in Sektion 25 ungewöhnlich: **oben** die Rolle, **darunter** der Name, **darunter** die Pille. Rolle in Grotesk-Versalien ca. 12,5 px mit leichtem Letterspacing, mittelgrau; sie bricht bei langen Bezeichnungen auf zwei Zeilen und schiebt den Namen nach unten. Name in Condensed-Versalien ca. 26 px, dunkel. Pillentext ca. 13 px Regular, gemischte Schreibung. Kopfblock: Eyebrow in Grotesk-Versalien ca. 13 px in Lime, H2 zweizeilig in Condensed-Versalien ca. 44 px weiß, Lead in Grotesk Regular ca. 16,5 px.
- Farbe/Fläche: Sektionsfläche dunkelgrüner Verlauf. Kartenfuß reinweiß — derselbe harte Hell-Dunkel-Wechsel je Karte wie in Sektion 25. Lime nur einmal, im Eyebrow des Kopfblocks; im Raster selbst erscheint Lime ausschließlich als Logo-Stickerei auf den Jacken.
- Abstände/Rhythmus: Kopfblock-Padding oben ca. 70 px, Kopf zu Raster ca. 56 px. Rinne ca. 34 px horizontal, ca. 46 px vertikal. Innenabstand im Fuß ca. 22 px. Rolle zu Name ca. 6 px, Name zu Pille ca. 14 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-TEAM`

### 47 — Initiativ-Split [karriere-desktop-05-y3000.png | -]
- Anordnung: 2-Spalten-Split auf weißer Fläche, Text links auf ca. 45 %, Foto rechts im Querformat etwa 3:2 mit Radius ca. 12 px. Textspalte vertikal mittig zum Foto. Reihenfolge links: zweizeilige H2, Fließtext, ein Button. Kein Eyebrow — wie in Sektion 35 startet der Split direkt mit der H2.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button, Radius ca. 6–8 px, ca. 46 px hoch, weißer Condensed-Versal-Text, kein Icon, linksbündig unter dem Text. Form und Größe identisch zu Sektion 18.
- Typo: H2 zweizeilig in Condensed-Versalien ca. 46 px, Zeilenhöhe knapp über 1,0. Fließtext Grotesk Regular ca. 16 px über zwei Zeilen, Zeilenhöhe ca. 1,5. Verhältnis etwa 2,9:1.
- Farbe/Fläche: Fläche weiß. Kein Lime im UI; der einzige Lime-Anteil sitzt als Logo-Stickerei auf den Jacken im Foto.
- Abstände/Rhythmus: Sektions-Padding oben ca. 100 px, unten ca. 85 px. Rinne ca. 80 px. H2 zu Fließtext ca. 26 px, Fließtext zu Button ca. 30 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: Kandidat: Intro-Split Text/Bild

### 48 — Schluss-CTA und Footer [karriere-desktop-05-y3000.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /photovoltaik/peine

Standort-Landingpage. Die kürzeste Seite im Atlas; sie besteht fast
ausschließlich aus wiederverwendeten Bausteinen — nur Sub-Hero und Intro-Split
tragen eigenen Zuschnitt (`photovoltaik__peine-desktop-01-y0.png`).

### 49 — Sub-Hero-Band Standort [photovoltaik__peine-desktop-01-y0.png | photovoltaik__peine-mobile-00-fold.png]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17 — zentrierte Dreistufung, harte Unterkante gegen Weiß, Bandhöhe ca. 240 px. Wie auf `/karriere` steht im ersten Slot ein Lime-Eyebrow-Satz statt eines Breadcrumbs; die Standortseite verzichtet also auf jede Pfadangabe.
- Mobil: Wie Desktop gestapelt und zentriert (`photovoltaik__peine-mobile-00-fold.png`). H1 bricht auf zwei Zeilen bei ca. 32 px und trennt dabei innerhalb des Bindestrich-Wortes, der Lead auf zwei Zeilen. Der Lime-Eyebrow bleibt einzeilig. Bandhöhe mobil ca. 270 px.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 50 — Intro-Split Standort [photovoltaik__peine-desktop-01-y0.png | photovoltaik__peine-mobile-00-fold.png]
- Anordnung: 2-Spalten-Split auf weißer Fläche, **Bild links, Text rechts** — die Seite startet also gespiegelt, während `/produkte/solaranlagen` und `/finanzierung` mit Text links beginnen. Bild im Querformat etwa 3:2 mit Radius ca. 12 px. Textspalte vertikal mittig zum Bild. Reihenfolge rechts: Eyebrow, zweizeilige H2, Fließtext, ein Button.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button, Radius ca. 6–8 px, ca. 46 px hoch, weißer Condensed-Versal-Text, kein Icon, linksbündig unter dem Text.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing, mittelgrau. H2 zweizeilig in Condensed-Versalien ca. 46 px. Fließtext Grotesk Regular ca. 16 px über vier Zeilen, Zeilenhöhe ca. 1,5.
- Farbe/Fläche: Fläche reinweiß. Kein Lime. Einziger Farbträger ist der grüne Button — dieselbe Sparsamkeit wie auf den übrigen Unterseiten.
- Abstände/Rhythmus: Sektions-Padding oben ca. 96 px, unten ca. 80 px. Rinne ca. 80 px. Eyebrow zu H2 ca. 16 px, H2 zu Fließtext ca. 26 px, Fließtext zu Button ca. 30 px.
- Mobil: Stapelt, **Text zuerst und Bild darunter** — die Bild-links-Anordnung des Desktops kehrt sich mobil also um, wie schon bei Sektion 18 dokumentiert. H2 bricht auf zwei Zeilen. Ab der dritten Fließtextzeile ist der Fold vom Cookie-Overlay verdeckt; Button und Bild sind mobil nicht belegt.
- Pattern: Kandidat: Intro-Split Text/Bild (gespiegelt)

### 51 — CTA-Band [photovoltaik__peine-desktop-01-y0.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: identisch zu Sektion 09 der Startseite, inklusive der rechten Box mit Lime-Button und Telefonzeile darunter. Das Band steht hier direkt nach dem einzigen Intro-Split, also bereits im oberen Seitendrittel.
- Mobil: nicht belegt.
- Pattern: `P-CTA-MID` (mit Abweichung: Fläche dunkelgrün statt `surface`)

### 52 — Ansprechpartner-Split [photovoltaik__peine-desktop-01-y0.png, photovoltaik__peine-desktop-02-y750.png | -]
- Anordnung: 2-Spalten-Split, Text links, Foto rechts — gespiegelt zu Sektion 50. Einzelporträt im Querformat etwa 4:3 mit Radius ca. 12 px. Textspalte vertikal mittig. Reihenfolge links: Eyebrow, zweizeilige H2, Fließtext, ein Button. Baugleich zu Sektion 40, dort aber ohne Button.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button, Radius ca. 6–8 px, ca. 46 px hoch, kein Icon.
- Typo: Eyebrow in Grotesk-Versalien ca. 13,5 px mit weitem Letterspacing, mittelgrau. H2 zweizeilig in Condensed-Versalien ca. 46 px. Fließtext Grotesk Regular ca. 16 px über drei Zeilen.
- Farbe/Fläche: Fläche weiß. Kein Lime im UI; Lime nur als Logo-Stickerei im Foto.
- Abstände/Rhythmus: Sektions-Padding oben ca. 95 px, unten ca. 85 px. Rinne ca. 80 px. Eyebrow zu H2 ca. 16 px, H2 zu Fließtext ca. 26 px, Fließtext zu Button ca. 30 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: `P-TEAM` (Einzelperson)

### 53 — Schluss-CTA und Footer [photovoltaik__peine-desktop-02-y750.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /blog

### 54 — Sub-Hero-Band Blog [blog-desktop-01-y0.png | blog-mobile-00-fold.png]
- Anordnung, Buttons, Typo, Farbe, Abstände: wie Sektion 17 — zentrierte Dreistufung, harte Unterkante gegen Weiß, Bandhöhe ca. 240 px. Im ersten Slot steht wie auf `/karriere` und `/photovoltaik/peine` ein Lime-Eyebrow-Satz statt eines Breadcrumbs, hier mit einem mittigen Gedankenstrich als Trenner zwischen Markenname und Rubrik.
- Mobil: Wie Desktop gestapelt und zentriert (`blog-mobile-00-fold.png`). H1 bricht auf zwei Zeilen bei ca. 32 px, Lead auf drei Zeilen. Der Lime-Eyebrow bleibt einzeilig und behält seine weite Sperrung. Bandhöhe mobil ca. 300 px.
- Pattern: Kandidat: Sub-Hero-Band ohne Bild

### 55 — Beitrags-Grid zweispaltig [blog-desktop-01-y0.png, blog-desktop-02-y750.png | blog-mobile-00-fold.png]
- Anordnung: Weiße Fläche, 2-Spalten-Raster aus Beitragskarten, das ohne Sektionskopf und ohne Filterleiste direkt unter dem Band startet und über die gesamte Seitenlänge durchläuft. Die Karten sind **nicht** gleich hoch: jede Karte endet dort, wo ihr Auszug endet, wodurch die Autoren-Chips innerhalb einer Reihe auf verschiedenen Höhen sitzen und die Unterkanten sichtbar auseinanderlaufen (`blog-desktop-02-y750.png`). Es gibt keine Kürzung des Auszugs auf eine feste Zeilenzahl — dieselbe Entscheidung wie im Google-Reviews-Grid (Sektion 13).
- Buttons/Komponenten: Karten mit Radius ca. 12 px, zweigeteilt: oben ein randloses Bild über die volle Kartenbreite mit geradem unteren Abschluss, darunter ein dunkelgrüner Textkörper mit eigenem Verlauf. Auf dem Bild liegt oben rechts ein Kategorie-Chip: dunkelgrün gefüllte Fläche mit Radius ca. 8 px, hellem Text ca. 14 px in gemischter Schreibung, ca. 14 px vom Rand eingerückt. Der Chip ist damit deutlich größer und lesbarer gesetzt als die vollrunden Mini-Chips der Footer-Teaser (Sektion 16) — dasselbe Inhaltsprinzip, zwei verschiedene Bauteile. Am Fuß jeder Karte ein Autoren-Chip: eigene abgerundete Fläche (Radius ca. 10 px) in einem etwas helleren Grün, darin links die Elephant-Solar-Wortmarke in Lime als Bildmarke und rechts zwei Textzeilen. Kein Button, kein Pfeil, kein Weiterlesen-Link — die ganze Karte ist die Aktion.
- Typo: Dreistufig im Textkörper. Datumszeile in Grotesk-Versalien ca. 13,5 px mit sehr weitem Letterspacing, in Lime — typografisch als Eyebrow der Karte gebaut, dasselbe Prinzip wie die Ortszeile der Referenzkarten (Sektion 14). Titel in Condensed-Versalien ca. 27 px, weiß, ein- bis dreizeilig. Auszug in Grotesk Regular ca. 15,5 px, Zeilenhöhe ca. 1,55. Im Autoren-Chip: Name ca. 15 px Medium, Zeile darunter ca. 12,5 px in abgesenktem Weiß.
- Farbe/Fläche: Sektionsfläche weiß, Kartenkörper dunkelgrüner Verlauf wie Sektion 06. Akzent genau einmal je Karte: die Datumszeile in Lime, dazu die Lime-Wortmarke im Autoren-Chip. Die Kategorie-Chips tragen bewusst keinen Akzent.
- Abstände/Rhythmus: Raster-Start ca. 80 px unter dem Band. Rinne ca. 40 px horizontal, ca. 46 px vertikal. Innenabstand im Textkörper ca. 38 px. Bild zu Datumszeile ca. 34 px, Datum zu Titel ca. 12 px, Titel zu Auszug ca. 18 px, Auszug zu Autoren-Chip ca. 32 px.
- Mobil: Einspaltig, eine Karte pro Reihe über die volle Container-Breite; das Bild behält sein Seitenverhältnis und der Kategorie-Chip bleibt oben rechts in unveränderter Größe. Ab der Bildmitte der ersten Karte ist der Fold vom Cookie-Overlay verdeckt; Textkörper und Autoren-Chip sind mobil nicht belegt.
- Pattern: `P-GALLERY`

### 56 — Schluss-CTA und Footer [blog-desktop-02-y750.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Sie folgen erst am Ende des sehr langen Rasters; die Seite ist mit ca. 16.800 px Desktop-Höhe die längste im Atlas.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /blog/welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu

### 57 — Artikel-Kopfband auf Hellgrau [blog__welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu-desktop-01-y0.png | blog__welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu-mobile-00-fold.png]
- Anordnung: Vollbreites Band direkt unter der Nav, ca. 250 px hoch, aber — und das ist der Bruch mit allen anderen Routen — **hellgrau statt dunkelgrün** und **linksbündig statt zentriert**. Aufbau von oben: eine Metazeile, H1 über die fast volle Container-Breite, ein Lead-Absatz. Harte Unterkante gegen Weiß. Die Detailseiten verlassen damit das grüne Kopfband-Schema vollständig.
- Buttons/Komponenten: Kein Button, kein Chip, keine Pille. Die Metazeile ist reiner Text aus zwei Versal-Segmenten, getrennt durch einen kleinen mittig gesetzten Punkt statt des Chevrons, das der Breadcrumb in Sektion 17 verwendet.
- Typo: Dreistufig. Metazeile in Grotesk-Versalien ca. 13,5 px mit sehr weitem Letterspacing, mittelgrau statt Lime — auf heller Fläche wechselt der Eyebrow also die Farbe, dieselbe Regel wie in Sektion 11. H1 einzeilig in Condensed-Versalien ca. 52 px, dunkel; sie läuft über ca. 1150 px und ist damit die breiteste einzeilige Überschrift im Atlas. Lead in Grotesk Regular ca. 16 px über zwei Zeilen. Verhältnis H1 zu Lead etwa 3,2:1.
- Farbe/Fläche: Bandfläche sehr helles Grau (Wert wie das Karten-Grau `#f5f5f5`), kein Verlauf, keine Kontur. **Keinerlei Akzentfarbe** — weder Lime noch Grün, auch nicht in der Metazeile. Die Route ist damit neben Sektion 19 und 45 die dritte akzentfreie Fläche im Atlas.
- Abstände/Rhythmus: Padding oben ca. 60 px, unten ca. 60 px, links auf Container-Kante ca. 144 px. Metazeile zu H1 ca. 24 px, H1 zu Lead ca. 18 px.
- Mobil: Bleibt hellgrau und linksbündig. Die H1 bricht auf drei Zeilen bei ca. 33 px, der Lead auf sechs Zeilen; das Band wächst dadurch auf ca. 380 px. Die Metazeile bleibt einzeilig und behält Größe und Sperrung.
- Pattern: Kandidat: Artikel-Kopfband hellgrau

### 58 — Artikelkörper mit Meta-Seitenspalte [blog__welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu-desktop-01-y0.png | -]
- Anordnung: Zweispaltiger Textsatz auf weißer Fläche: links die Fließtextspalte auf ca. 55 % der Container-Breite, rechts eine deutlich schmalere Meta-Spalte auf ca. 27 %, die oben ausgerichtet ist und nicht mitwächst. Zwischen beiden bleibt eine breite leere Rinne — das Layout ist bewusst nicht auf volle Breite gesetzt, die Textspalte hält eine lesbare Zeilenlänge. Die Meta-Spalte enthält von oben: ein Bild, einen Block aus vier Beschriftungspaaren, eine Trennlinie und darunter zwei Marken-Lockups nebeneinander.
- Buttons/Komponenten: Die Meta-Spalte ist eine einzelne Kachel mit Radius ca. 10 px und sehr hellgrauer Füllung; das Bild oben sitzt mit Innenabstand darin und hat einen eigenen kleineren Radius von ca. 8 px, füllt die Kachelbreite also nicht randlos wie bei den Karten der übrigen Routen. Die vier Metafelder sind reine Label-Wert-Paare ohne Fläche, Icon oder Trennlinie. Unten die zwei Marken-Lockups, das erste grün, das zweite blau — der einzige Ort im Atlas, an dem beide Marken gleichrangig nebeneinander im Inhalt stehen statt in der Topbar. Im Fließtext keine Buttons, keine Zwischenüberschriften, keine Zitatblöcke; die Gliederung besteht ausschließlich aus Absätzen und zwei Bullet-Listen.
- Typo: Fließtext in Grotesk Regular ca. 16,5 px, Zeilenhöhe ca. 1,5. Listenpunkte gleich groß mit hängendem Einzug und runden Bullets, ein- bis dreizeilig. In der Meta-Spalte zweistufig je Paar: Label in Grotesk Regular ca. 13 px mittelgrau, Wert darunter ca. 15,5 px in dunkler Regular — der Wert ist also nur leicht größer und nicht in Condensed gesetzt; die Seitenspalte verzichtet komplett auf die Display-Schrift. Die Copyright-Zeile darunter ca. 12,5 px.
- Farbe/Fläche: Sektionsfläche weiß, Meta-Kachel hellgrau. Auch hier keine Akzentfarbe im UI; die einzige Farbe stammt aus dem Foto und den zwei Marken-Lockups.
- Abstände/Rhythmus: Sektions-Padding oben ca. 90 px. Rinne zwischen Textspalte und Meta-Spalte ca. 60 px. Zwischen den Absätzen ca. 24 px, zwischen Absatz und Liste ca. 8 px, zwischen den Listenpunkten ca. 6 px. In der Meta-Kachel: Innenabstand ca. 30 px, Bild zu erstem Metafeld ca. 30 px, zwischen den Feldern ca. 22 px, Trennlinie zu Lockups ca. 26 px.
- Mobil: Im 390-Raster nicht als geschlossene Sektion belegt.
- Pattern: Kandidat: Artikelkörper mit Meta-Seitenspalte

### 59 — Schluss-CTA und Footer [blog__welche-kosten-kommen-bei-einer-pv-anlage-auf-mich-zu-desktop-02-y750.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Die CTA-Kachel folgt unmittelbar auf das Ende des Fließtextes, ohne Trennlinie und ohne weitere Artikel-Empfehlungen — der Blog-Detailseite fehlt eine „Ähnliche Beiträge"-Sektion; die vier Blog-Teaser im Footer übernehmen diese Rolle.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /produkt/aiko-neostar-2s-plus

### 60 — Produkt-Kopfband auf Hellgrau [produkt__aiko-neostar-2s-plus-desktop-01-y0.png | produkt__aiko-neostar-2s-plus-mobile-00-fold.png]
- Anordnung: Vollbreites hellgraues Band unter der Nav, linksbündig, aber deutlich flacher als das Artikel-Kopfband: nur zwei Zeilen, ca. 195 px hoch. Aufbau von oben: H1, darunter eine einzelne Kennwertzeile. Kein Eyebrow, kein Breadcrumb, kein Lead-Absatz — die Detailseiten der Produkte haben den ersten Slot ersatzlos gestrichen. Harte Unterkante gegen Weiß.
- Buttons/Komponenten: Keine.
- Typo: Zweistufig. H1 einzeilig in Condensed-Versalien ca. 44 px, dunkel — kleiner als jede andere H1 im Atlas. Kennwertzeile in Grotesk Regular ca. 16,5 px, mittelgrau, gemischte Schreibung. Verhältnis etwa 2,7:1. Bemerkenswert: die Zeile unter der H1 ist derselbe Satz, der weiter unten als erster Listenpunkt wiederkehrt — der Slot ist also mit einem Kennwert statt einem Lead belegt.
- Farbe/Fläche: Bandfläche sehr helles Grau wie in Sektion 57, kein Verlauf. Keinerlei Akzentfarbe.
- Abstände/Rhythmus: Padding oben ca. 62 px, unten ca. 62 px, links auf Container-Kante ca. 144 px. H1 zu Kennwertzeile ca. 14 px — sehr dicht, die zwei Zeilen bilden optisch einen Block.
- Mobil: Bleibt hellgrau und linksbündig. H1 bleibt einzeilig bei ca. 33 px, die Kennwertzeile ebenfalls einzeilig. Bandhöhe mobil ca. 175 px, also flacher als am Desktop — die einzige Route im Atlas, deren Kopfband mobil schrumpft statt zu wachsen.
- Pattern: Kandidat: Produkt-Kopfband hellgrau

### 61 — Produkt-Split mit Freisteller [produkt__aiko-neostar-2s-plus-desktop-01-y0.png | produkt__aiko-neostar-2s-plus-mobile-00-fold.png]
- Anordnung: 2-Spalten-Split auf weißer Fläche, links Text auf ca. 45 %, rechts eine eigene hellgraue Bildfläche mit Radius ca. 12 px, in der das Produkt freigestellt und mittig schwebt. Die Bildfläche ist deutlich höher als nötig und lässt viel Luft um das Produkt — dieselbe Logik wie die Bildzone im Produktkatalog der Startseite (Sektion 10), hier aber als eigenständige Sektion. Reihenfolge links: H2, Einleitungsabsatz, fünfstellige Bullet-Liste, ein Button. Kein Eyebrow.
- Buttons/Komponenten: Ein gefüllter dunkelgrüner Button, Radius ca. 6–8 px, ca. 44 px hoch, weißer Condensed-Versal-Text, kein Icon, linksbündig — bemerkenswert, weil der entsprechende Datenblatt-Button im Startseiten-Katalog (Sektion 10) ein Download-Icon rechts vom Label trägt; hier fehlt es. Dasselbe Ziel, zwei verschiedene Button-Varianten. Die Liste hat runde Bullets ohne Icons.
- Typo: H2 einzeilig in Condensed-Versalien ca. 34 px — dieselbe zurückgenommene Größe wie im Konfigurator (Sektion 42). Einleitungsabsatz Grotesk Regular ca. 16 px über drei Zeilen. Listenpunkte ca. 15,5 px Regular, ein- bis zweizeilig mit hängendem Einzug. Verhältnis H2 zu Liste etwa 2,2:1, also die flachste Hierarchie im Atlas.
- Farbe/Fläche: Sektionsfläche weiß, Bildfläche hellgrau (Wert wie `#f5f5f5`). Kein Lime. Einziger Farbträger ist der grüne Button; das Produkt selbst ist schwarz auf hellgrau.
- Abstände/Rhythmus: Sektions-Padding oben ca. 70 px, unten ca. 70 px. Rinne ca. 80 px. H2 zu Absatz ca. 22 px, Absatz zu Liste ca. 20 px, zwischen den Listenpunkten ca. 8 px, Liste zu Button ca. 30 px.
- Mobil: Stapelt, Text zuerst. H2 bleibt einzeilig, der Absatz bricht auf vier Zeilen. Ab dem dritten Listenpunkt ist der Fold vom Cookie-Overlay verdeckt; Button und Bildfläche sind mobil nicht belegt.
- Pattern: Kandidat: Produkt-Split mit Freisteller

### 62 — Schluss-CTA und Footer [produkt__aiko-neostar-2s-plus-desktop-01-y0.png | -]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Die Seite besteht damit aus nur zwei eigenen Sektionen vor dem Abschluss und ist mit ca. 3.550 px Mobil-Höhe die kürzeste Route im Atlas.
- Mobil: nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)

---

## Seite: /referenzen/gerd-meyer

### 63 — Referenz-Kopfband auf Hellgrau [referenzen__gerd-meyer-desktop-01-y0.png | referenzen__gerd-meyer-mobile-00-fold.png]
- Anordnung: Vollbreites hellgraues Band unter der Nav, linksbündig, zwei Zeilen, ca. 180 px hoch — baugleich zum Produkt-Kopfband in Sektion 60. Aufbau: H1, darunter eine Ortszeile. Kein Eyebrow, kein Breadcrumb, kein Lead. Harte Unterkante gegen Weiß.
- Buttons/Komponenten: Keine. Anders als auf der Referenz-Übersicht (Sektion 28) trägt die Detailseite **keine** PLZ-Pille — die Postleitzahl ist hier reiner Text am Anfang der Ortszeile.
- Typo: Zweistufig. H1 einzeilig in Condensed-Versalien ca. 46 px, dunkel; sie besteht aus zwei durch einen Halbgeviertstrich verbundenen Kennwerten und übernimmt damit die Rolle, die auf der Übersichtskarte die Kennzahlzeile hatte. Ortszeile in Grotesk Regular ca. 16,5 px, mittelgrau. Verhältnis etwa 2,8:1. Auffällig: Auf der Übersichtskarte steht der Ort **über** der Kennzahl und in Lime-Versalien (Sektion 28), auf der Detailseite steht er **unter** der Kennzahl in grauer Fließschrift — Reihenfolge und typografische Rolle drehen sich also um.
- Farbe/Fläche: Bandfläche sehr helles Grau wie in Sektion 57 und 60. Keinerlei Akzentfarbe, kein Lime, kein Grün.
- Abstände/Rhythmus: Padding oben ca. 62 px, unten ca. 58 px, links auf Container-Kante ca. 144 px. H1 zu Ortszeile ca. 14 px.
- Mobil: Bleibt hellgrau und linksbündig. Die H1 bricht auf zwei Zeilen bei ca. 33 px und trennt dabei zwischen Kennwert und Einheit, die Ortszeile bleibt einzeilig. Bandhöhe mobil ca. 210 px.
- Pattern: Kandidat: Produkt-Kopfband hellgrau

### 64 — Leerer Inhaltsbereich [referenzen__gerd-meyer-desktop-01-y0.png | referenzen__gerd-meyer-mobile-00-fold.png]
- Anordnung: Zwischen dem Kopfband und der Schluss-CTA-Kachel steht ein weißer Bereich von ca. 120 px Höhe ohne jeden Inhalt — kein Luftbild, keine Anlagendaten, keine Fakten-Chips, kein Text. Die Detailseite trägt also **keine** Inhaltssektion; alle Informationen, die die Übersichtskarte in Sektion 28 zeigt (Luftbild, Kennzahl, zwei Fakten-Chips), fehlen auf der Zielseite des Klicks. Der Bereich ist als Fehlstelle vermerkt, nicht als Gestaltung.
- Buttons/Komponenten: Keine.
- Typo: Keine.
- Farbe/Fläche: Reinweiß, ohne Kontur, ohne Trennlinie zur CTA-Kachel darunter.
- Abstände/Rhythmus: Bandunterkante zu CTA-Kachel ca. 120 px.
- Mobil: Ebenfalls leer; zwischen Bandunterkante und der Oberkante der CTA-Kachel liegen ca. 130 px weiße Fläche (`referenzen__gerd-meyer-mobile-00-fold.png`).
- Pattern: nicht geprüft — kein Bauteil vorhanden

### 65 — Schluss-CTA und Footer [referenzen__gerd-meyer-desktop-01-y0.png | referenzen__gerd-meyer-mobile-00-fold.png]
- Anordnung, Buttons, Typo, Farbe, Abstände: unverändert wie Sektion 15 und 16. Weil darüber nichts steht, ist die CTA-Kachel hier die einzige inhaltstragende Fläche der Seite.
- Mobil: Die Kachel wird einspaltig und hochformatig; die Textzone steht oben, das Foto ist im Fold nicht mehr sichtbar. Der Eyebrow bricht auf zwei Zeilen und bleibt in Lime, die H2 bricht auf drei Zeilen bei ca. 30 px. Ab der dritten H2-Zeile ist der Fold vom Cookie-Overlay verdeckt; Fließtext und weißer Button sind mobil nicht belegt.
- Pattern: `P-CTA-END` plus Footer (siehe Sektion 15 und 16)
