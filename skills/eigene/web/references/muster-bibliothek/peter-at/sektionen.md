# peter.at — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Grundwerte (Pixelmessung auf den PNG, Pillow):
Akzent `#F4C23C` (identisch auf Hero-CTA, Header-CTA, Badges, Akzent-Headline,
Footer-Chip), Grundfläche `#FFFFFF`, ruhige Fläche `#F5F5F5`, dunkle Fläche
`#000000`, Sekundärtext-Grau `#B2B2B2`, Fortschrittsbalken `#30AB66` auf
`#CAEFDB`, Countdown-Verlauf `#6B1F52` → `#FF6B1A`.

## Seite: /

### 01 — Countdown-Banner (sitewide, über dem Header) [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Volle Breite, ca. 70 px hoch, alles in einer zentrierten Zeile. Links Fließtext, rechts vier Zähler-Pillen im Wechsel mit kleinen Einheitenlabels (Tage/Std./Min./Sek.). Sitzt fix über dem Header, scrollt nicht mit — auf jeder Slice erneut sichtbar.
- Buttons/Komponenten: Keine Buttons. Vier Zahlen-Pillen als weiche Rechtecke, Radius ca. 6 px, halbtransparente helle Füllung über dem Verlauf (gemessen an einer Pille `#BC4E41`, also Verlaufsfarbe plus Weiß-Overlay), Ziffern weiß, fett, deutlich größer als die Labels.
- Typo: Alles Grotesk. Fließtext ca. 14 px Regular, Ziffern ca. 20 px Bold, Einheitenlabels ca. 11 px in reduzierter Deckkraft. Kein Caps, kein auffälliges Letterspacing.
- Farbe/Fläche: Einzige mehrfarbige Fläche der ganzen Site — horizontaler Verlauf Violett `#6B1F52` links nach Orange `#FF6B1A` rechts. Text durchgehend weiß. Bricht bewusst mit dem sonst strikten Schwarz/Weiß/Gelb-System.
- Abstände/Rhythmus: Sehr dicht, ca. 18 px vertikales Padding, die Pillen stehen fast auf Kante. Bewusst gedrängt, wirkt wie ein Systembanner.
- Mobil: Zwei Zeilen statt einer — oben der Text, darunter die vier Pillen in eigener Reihe über die volle Breite. Banner wächst dadurch auf ca. 90 px.
- Pattern: Kandidat: Sitewide-Aktionsbanner über dem Header

### 02 — Header / Navigation (sitewide) [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Drei Zonen in einer Reihe auf ca. 88 px Höhe. Links Wortmarke, mittig-links vier Textlinks, ganz rechts der Primär-CTA. Die Links sitzen nicht zentriert, sondern rücken nach links an das Logo heran — rechts bleibt viel Leerraum vor dem CTA. Über dem Foto-Hero ist der Header transparent und liegt über dem Motiv, ab der ersten hellen Sektion wird er weiß und deckend.
- Buttons/Komponenten: Genau ein Button. Rechteck mit kleinem Radius (ca. 6–8 px), ausdrücklich keine Pille. Gefüllt `#F4C23C`, Label schwarz, rechts ein dünner Pfeil nach rechts mit klarem Abstand zum Text. Größe ca. 244 × 40 px. Über dem Foto-Hero ist derselbe Button nur als heller Outline-Rahmen ohne Füllung ausgeführt und wird erst beim Scrollen zur gelben Vollfüllung — Zustandswechsel gut sichtbar zwischen `home-desktop-00-fold.png` und `home-desktop-02-y750.png`.
- Typo: Wortmarke als eigene Schrift mit auffällig geschlossenem, gerundetem `a` in „peter.at". Navigationslinks Grotesk Regular ca. 15 px, keine Caps, normales Letterspacing. Aktive Seite wird nicht unterstrichen, sondern nur ausgegraut (siehe `erfahrungen-desktop-00-fold.png`, wo „Kundenerfahrungen" blass steht).
- Farbe/Fläche: Weiß auf hell, Schriftfarbe nahezu schwarz. Über Fotos komplett transparent mit weißer Schrift. Der Akzent sitzt ausschließlich auf dem einen CTA.
- Abstände/Rhythmus: Innenabstand links/rechts ca. 140 px, Linkabstände ca. 40 px. Ruhig, keine Icons, kein Dropdown-Chevron.
- Mobil: Links Wortmarke, rechts ein Burger aus zwei Strichen. Alle Navigationslinks und der Header-CTA entfallen im Fold komplett — der einzige sichtbare CTA ist der im Hero.
- Pattern: Kandidat: Transparenter Foto-Header mit Outline-CTA, der beim Scrollen füllt

### 03 — Hero [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollflächiges Render (Haus mit PV in der Dämmerung) über die ganze Breite und Höhe des Folds. Textspalte linksbündig auf ca. 570 px Breite, vertikal etwa mittig, beginnt bei ca. x=140. Rechte Bildhälfte bleibt frei von Text, dort steht das Haus. Unten rechts überlappen drei Siegel-Kacheln das Motiv, bündig an der unteren Kante.
- Buttons/Komponenten: Genau ein gefüllter CTA, Rechteck mit Radius ca. 6 px, `#F4C23C` gefüllt, schwarzes Label ca. 16 px, Pfeil rechts, Größe ca. 240 × 46 px. Drei ProvenExpert-Siegel als Original-Bildmarken, je ca. 130 × 130 px, weißer Kartenrand, nebeneinander mit kleinem Abstand — keine nachgebauten Kacheln.
- Typo: Kein Eyebrow. Direkt H1 in zwei Zeilen, Grotesk Regular (nicht Bold), ca. 44 px, weiß, sehr enge Zeilenhöhe. Darunter Lead ca. 17 px in leicht reduziertem Weiß, ca. 3 Zeilen. Verhältnis H1 zu Lead grob 2,6 : 1. Auffällig: die H1 ist nicht fett, die Hierarchie entsteht rein über Größe.
- Farbe/Fläche: Dunkles Foto, links über der Textzone spürbar abgedunkelt, rechts hell belassen — ein Zonen-Verlauf in der Grundfarbe, kein Farbschleier über dem Motiv. Der einzige Akzent im Fold ist der Button.
- Abstände/Rhythmus: Sehr großzügig. Vom Header bis zur H1 ca. 180 px, H1 zu Lead ca. 40 px, Lead zu Button ca. 50 px. Luftig, nicht dicht.
- Mobil: Text stapelt über dem Bild statt darüber zu liegen — die Textspalte sitzt oben auf einer dunkelblauen Fläche, das Haus-Motiv rutscht als eigener Bildblock darunter. H1 auf ca. 24 px, Lead auf 4 Zeilen. CTA wird nicht voll breit, sondern bleibt inhaltsbreit linksbündig. Die drei Siegel rutschen ganz nach unten und werden angeschnitten.
- Pattern: `P-HERO-PHOTO`

### 04 — Drei Textspalten „Österreichs Partner #1" [home-desktop-02-y750.png | home-mobile-04-y1266.png]
- Anordnung: Weiße Sektion. Links oben die zweizeilige Überschrift über ca. 40 % Breite, darunter mit deutlichem Abstand ein Drei-Spalten-Raster über die volle Inhaltsbreite, Spalten gleich breit (ca. 310 px), Abstand ca. 90 px. Alles linksbündig, keine Karten, keine Rahmen, keine Icons, keine Trennlinien.
- Buttons/Komponenten: Keine. Reine Typo-Spalten — bewusst keine Icon-Karten.
- Typo: H2 zweizeilig, ca. 32 px Regular, Zeile 1 fast schwarz, Zeile 2 in Grau `#B2B2B2` — dieselbe Zweizeilen-Mechanik wie überall auf der Site. Spaltenüberschriften ca. 18 px Regular in Schwarz, Fließtext ca. 15 px in mittlerem Grau. Verhältnis H2 zu Spaltenkopf ca. 1,8 : 1.
- Farbe/Fläche: Reines Weiß, kein Akzent in dieser Sektion. Bewusster Hell-Block direkt nach dem dunklen Hero.
- Abstände/Rhythmus: Sektions-Padding oben ca. 130 px. Zwischen H2 und Spalten ca. 75 px. Innerhalb der Spalte Kopf zu Text ca. 20 px. Viel Weißraum, sehr ruhig.
- Mobil: Spalten stapeln in Leserichtung untereinander, volle Breite, Abstand ca. 40 px. Die zweizeilige H2 bleibt zweizeilig.
- Pattern: Kandidat: Offene Drei-Spalten-Typo statt Icon-Karten

### 05 — Produkt-Slider [home-desktop-03-y1500.png | home-mobile-04-y1266.png]
- Anordnung: Direkt unter Sektion 04 in derselben weißen Fläche. Horizontaler Slider mit vier sichtbaren Karten, die vierte wird rechts am Viewportrand angeschnitten — der Anschnitt zeigt, dass es weitergeht. Jede Karte oben ein Produktbild in einem großen weißen Kreis, darunter linksbündig Eyebrow, Produktname, Beschreibung. Unter dem Slider mittig die Steuerung.
- Buttons/Komponenten: Karten als flache Flächen `#F5F5F5` ohne Rahmen und ohne Schatten, Radius sehr klein bis 0, ca. 360 × 520 px. Bildträger ein reiner weißer Kreis ca. 260 px. Steuerung zweiteilig: oben sieben kurze Fortschrittsstriche (aktiver Strich gelb `#F4C23C`, inaktive hellgrau, ca. 60 × 2 px), darunter zwei runde Outline-Buttons ca. 46 px mit Chevron links/rechts, dünner grauer 1-px-Rand, weiße Füllung, kein Schatten.
- Typo: Eyebrow ca. 13 px Grau („Photovoltaik"), Produktname ca. 17 px Schwarz Regular („peter.solar"), Text ca. 15 px Grau. Klein gehaltene Hierarchie, drei Stufen auf engem Raum.
- Farbe/Fläche: Weiß als Sektionsfläche, `#F5F5F5` als Karte, Weiß als Kreis — drei Helligkeitsstufen ohne jede Farbe. Der einzige Farbpunkt ist der aktive Fortschrittsstrich.
- Abstände/Rhythmus: Karteninnenabstand ca. 34 px. Zwischen Karten ca. 40 px. Unter dem Slider ca. 50 px bis zu den Strichen, dann ca. 40 px bis zu den Pfeilen. Eher dicht in der Karte, luftig darum herum.
- Mobil: Eine Karte im Blick, die zweite deutlich angeschnitten. Karte auf ca. 275 px Breite, Kreis entsprechend kleiner. Fortschrittsstriche und Pfeile bleiben identisch, nur gestapelt darunter.
- Pattern: Kandidat: Angeschnittener Produkt-Slider mit Strich-Fortschritt statt Dots

### 06 — Funnel-Block „Starte deine Energiewende" (wiederkehrend) [home-desktop-04-y2250.png | anfragen-mobile-00-fold.png]
- Anordnung: Schwarze Vollflächen-Sektion. Alles zentriert: zweizeilige Überschrift, Lead, darunter eine Reihe aus vier Trust-Punkten über die volle Breite verteilt, darunter eine große helle Formularkarte, die zentriert steht und links/rechts ca. 140 px Rand lässt. In der Karte oben ein Fortschrittsbalken, darunter zentrierte Frage, darunter ein 3×3-Kachelraster.
- Buttons/Komponenten: Neun Auswahlkacheln, weiße Füllung `#FFFFFF` auf `#F5F5F5`-Karte, Radius ca. 4 px, sehr dezenter Schatten, ca. 260 × 78 px, je ein schwarzer Bundesland-Umriss als Piktogramm über der Beschriftung. Kein Button, kein „Weiter" — die Kachel selbst ist die Aktion. Vier Trust-Punkte als weißer Kreis mit schwarzem Häkchen, ca. 22 px, Text daneben. Fortschrittsbalken ca. 2 px hoch, gefüllter Teil `#30AB66` auf `#CAEFDB` — auffällig, weil Grün sonst nirgends vorkommt.
- Typo: H2 zweizeilig ca. 34 px, Zeile 1 weiß, Zeile 2 in Akzent-Gelb `#F4C23C`. Lead ca. 17 px in gedämpftem Weiß. Frage in der Karte ca. 22 px Schwarz. Kachelbeschriftung ca. 15 px. Kein Caps.
- Farbe/Fläche: Harter Wechsel von Weiß auf Schwarz. Innerhalb der schwarzen Fläche liegt die helle Karte als Insel — der Kontrast trägt die Aufmerksamkeit, nicht Farbe. Akzent nur in der zweiten Headline-Zeile.
- Abstände/Rhythmus: Sektions-Padding oben ca. 140 px. Headline zu Trust-Reihe ca. 100 px, Trust-Reihe zu Karte ca. 55 px. Karten-Innenabstand ca. 40 px, Kachelabstand ca. 18 px. Innen dicht, außen weit.
- Mobil: Trust-Punkte stapeln von vier nebeneinander auf vier untereinander, linksbündig statt verteilt. Das 3×3-Raster wird zu 2 Spalten × 5 Reihen. Die Frage bricht auf zwei Zeilen. Karte läuft fast randlos.
- Pattern: `P-CONTACT`

### 07 — Testimonial-Foto-Carousel „peters Erfolgsgeschichten" [home-desktop-06-y3750.png | -]
- Anordnung: Schwarze Sektion. Überschrift zentriert oben, darunter ein Carousel aus Hochformat-Fotos, ca. 360 × 480 px, vier sichtbar, links und rechts je eins angeschnitten. Jedes Foto trägt oben links ein Badge, das auf dem Bild sitzt (Überlappung, kein eigener Balken). Unter dem Carousel wieder die Strich-Navigation plus zwei Pfeile.
- Buttons/Komponenten: Orts-Badge als kleines gelbes Rechteck `#F4C23C`, Radius ca. 3 px, schwarzer Text ca. 12 px, sitzt ca. 16 px vom Bildrand entfernt. 14 Fortschrittsstriche, aktiver gelb. Zwei runde Outline-Pfeile ca. 46 px, hier weiß umrandet auf Schwarz statt grau auf Weiß.
- Typo: H2 zweizeilig zentriert, Zeile 1 weiß, Zeile 2 gelb, ca. 34 px. Darunter eine einzelne graue Unterzeile ca. 16 px. Keine Namen, keine Sterne, keine Zitate im Bild — die Fotos tragen allein.
- Farbe/Fläche: Schwarz. Die einzigen Farbflächen sind die Fotos selbst und die gelben Badges. Bilder sind erkennbar echte Handyfotos, kein Stock-Look, kein einheitlicher Filter.
- Abstände/Rhythmus: Headline zu Carousel ca. 90 px, Bildabstand ca. 40 px, Carousel zu Strichen ca. 40 px. Die Fotos sitzen sehr dicht beieinander und bilden dadurch eine Bildwand.
- Mobil: Nicht separat geprüft; im Mobil-Slice nicht eindeutig isoliert. Erwartbar ein Foto im Blick mit Anschnitt, wie beim Produkt-Slider.
- Pattern: `P-TESTIMONIAL`

### 08 — Produkt-Isometrie „Jedes Zuhause braucht" [home-desktop-08-y5250.png | -]
- Anordnung: Sehr helle Sektion (nahezu Weiß, minimal wärmer). Oben ein zweispaltiger Kopf: links die zweizeilige H2 über ca. 45 % Breite, rechts ein Fließtextblock über ca. 45 % — bewusst asymmetrisch, keine Mittelachse. Darunter über die volle Breite eine große isometrische Haus-Grafik. Links davon schwebt ein Smartphone-Mockup, rechts ein kleiner Label-Stapel; dünne gelbe Linien verbinden Handy, Haus und Labels und laufen weit über die Grafikkanten hinaus.
- Buttons/Komponenten: Keine Buttons. Neun Label-Chips als weiße Sprechblasen mit spitzem Zeiger, Radius ca. 6 px, weicher Schatten, Text ca. 14 px Schwarz. Sie liegen direkt auf der Grafik und überlappen sie — das ist das tragende Layoutmittel der Sektion.
- Typo: H2 zweizeilig, Zeile 1 Schwarz, Zeile 2 Grau `#B2B2B2`, ca. 32 px. Rechter Fließtext ca. 17 px, deutlich größer als der übliche Fließtext, dadurch fast gleichwertig zur H2. Chips einheitlich klein.
- Farbe/Fläche: Fast weiß, sehr hell gehalten, damit die dunklen Chips und die gelben Verbindungslinien tragen. Der Akzent erscheint hier ausnahmsweise als hauchdünne Linie, nicht als Fläche — die einzige Stelle auf der Site, an der Gelb als Linienelement auftritt.
- Abstände/Rhythmus: Sehr großzügig, Sektion über 1250 px hoch. Zwischen Kopf und Grafik ca. 130 px. Um die Grafik viel Leerraum, die Linien dürfen frei auslaufen.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Beschriftete Produkt-Isometrie statt Icon-Raster

### 09 — Community / Österreich-Punktkarte [home-desktop-09-y6000.png | -]
- Anordnung: Schwarze Sektion. Oben links die zweizeilige H2, rechts auf gleicher Höhe eine kurze zweizeilige Nebenzeile — beide linksbündig in ihrer Spalte, kein Zentrieren. Unter der H2 eine Avatar-Gruppe plus Zeile. Darunter mittig eine aus Punkten gerasterte Österreich-Silhouette, die den halben Sektionsraum füllt.
- Buttons/Komponenten: Vier überlappende runde Avatare, ca. 26 px, weiß umrandet, gestaffelt um ca. 12 px versetzt. Keine Buttons. Die Karte ist reine Grafik aus gelben und weißen Punkten unterschiedlicher Größe, kein Kartendienst, keine Beschriftung.
- Typo: H2 zweizeilig, Zeile 1 Weiß, Zeile 2 Gelb, ca. 32 px. Nebenzeile rechts ca. 18 px Weiß. Fließtext unter den Avataren ca. 15 px.
- Farbe/Fläche: Schwarz. Der Akzent ist hier über hunderte Punkte verstreut statt als Fläche — eine dritte Akzent-Verwendung neben Button und Headline-Zeile.
- Abstände/Rhythmus: Sehr weit, die Punktkarte bekommt über 600 px Höhe. Deutlich mehr Luft als Inhalt.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Punktraster-Landkarte als Reichweitenbild

### 10 — Bewertungs-Carousel (Google / Trustpilot) [home-desktop-11-y7500.png | -]
- Anordnung: Schwarze Sektion, drei Spalten nebeneinander, rechts angeschnitten. Jede Spalte ist eine offene Textsäule ohne Karte: Zitat, darunter Name, darunter das Original-Quellenlogo. Darunter zentriert neun Fortschrittsstriche und die zwei runden Pfeile.
- Buttons/Komponenten: Keine Karten, keine Rahmen. Quellenlogos als echte Bildmarken in Originalfarbe (Google mehrfarbig, Trustpilot grüner Stern) — die einzigen Fremdfarben auf der Site außer dem Countdown-Banner. Pfeile wie in Sektion 07.
- Typo: Zitat ca. 16 px Weiß, Name ca. 16 px darunter, Logo ca. 24 px hoch. Flache Hierarchie, das Logo trägt die Autorität statt einer Sternenreihe.
- Farbe/Fläche: Schwarz, weiße Typo, Farbe ausschließlich aus den Fremdlogos.
- Abstände/Rhythmus: Spaltenabstand ca. 90 px, unter dem Block ca. 90 px bis zur Navigation. Ruhig, viel Luft nach unten.
- Mobil: Nicht separat geprüft.
- Pattern: `P-PROOF-STRIP`

### 11 — Finanzierungs-Split „Dein Energiesystem ab 58 € im Monat" [home-desktop-11-y7500.png | -]
- Anordnung: Schwarze Sektion, zwei Spalten. Links Headline, Fließtext und CTA über ca. 40 % Breite. Rechts eine Liste aus drei Zeilen über ca. 35 % Breite, jede Zeile durch eine dünne Trennlinie nach unten abgesetzt. Die rechte Spalte beginnt vertikal etwas tiefer als die linke — kein bündiger Oberkant-Abschluss.
- Buttons/Komponenten: Ein gefüllter gelber CTA `#F4C23C`, Rechteck Radius ca. 6 px, ca. 240 × 46 px, schwarzes Label plus Pfeil — identisch mit dem Header-Button. Die Listenzeilen tragen links einen kleinen gelben Punkt ca. 6 px als Marker, darunter je eine 1-px-Linie in gedämpftem Weiß. Keine Icons, keine Karten.
- Typo: H2 zweizeilig, Zeile 1 Weiß, Zeile 2 Gelb, ca. 32 px. Fließtext ca. 17 px, vier Zeilen. Listenzeilen ca. 16 px. Verhältnis H2 zu Fließtext ca. 1,9 : 1.
- Farbe/Fläche: Schwarz. Akzent an drei Stellen: zweite Headline-Zeile, Button, Listenpunkte — alle klein, keine Fläche.
- Abstände/Rhythmus: Listenzeilen mit ca. 73 px Zeilenhöhe sehr großzügig, dadurch wirkt die rechte Spalte trotz nur drei Punkten hoch genug für die linke. Sektions-Padding oben ca. 190 px.
- Mobil: Nicht separat geprüft.
- Pattern: `P-CTA-MID`

### 12 — App-Feature-Split „Österreichs günstigste Energielösung" [home-desktop-11-y7500.png, home-desktop-13-y9000.png | -]
- Anordnung: Schwarze Sektion, zweiteilig. Oben links Headline und Fließtext, rechts ein großes iPhone-Mockup, das über die Sektionsgrenze hinausragt und rechts angeschnitten wirkt. Darunter über die volle Breite drei gleich breite Textspalten ohne Karten.
- Buttons/Komponenten: Keine Buttons. Das Mockup ist ein realistischer Geräterahmen mit echtem App-Screen (Tabs, Chart, Werte-Kacheln) — kein abstraktes Platzhalter-UI. Innerhalb des Screens erscheinen kleine grüne und rote Akzente, die zum Site-System nicht gehören und klar als App-eigene Farben lesbar sind.
- Typo: H2 zweizeilig Weiß/Gelb ca. 32 px. Spaltenköpfe ca. 17 px Weiß Regular, Spaltentext ca. 15 px in gedämpftem Grau. Dieselbe Spaltenmechanik wie Sektion 04, nur invertiert.
- Farbe/Fläche: Schwarz. Der App-Screen ist die einzige helle Fläche und zieht dadurch den Blick.
- Abstände/Rhythmus: Zwischen Mockup und Spaltenreihe ca. 100 px. Spaltenabstand ca. 90 px. Insgesamt luftig.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Offene Drei-Spalten-Typo statt Icon-Karten (invertiert)

### 13 — Prozess „In 3 einfachen Schritten" [home-desktop-13-y9000.png | -]
- Anordnung: Dunkle Sektion mit einem stark abgedunkelten Haus-Render als Hintergrundbild — das Motiv liegt hinter dem Text und ist nur schemenhaft lesbar. Oben links die zweizeilige H2, oben rechts auf gleicher Höhe der CTA. Darunter drei gleich breite Schrittspalten über die volle Breite, jede beginnt mit einem nummerierten Kreis.
- Buttons/Komponenten: Ein gefüllter gelber CTA rechts oben, identisch zum Header-Button. Drei Nummernmarker als weiße Kreise ca. 32 px mit schwarzer Ziffer 1/2/3 — echte Sequenz, keine dekorative Nummerierung. Keine Karten, keine Linien zwischen den Schritten.
- Typo: H2 zweizeilig, Zeile 1 Weiß, Zeile 2 Gelb, ca. 32 px. Schrittüberschrift ca. 17 px Weiß, kann auf zwei Zeilen brechen. Schritttext ca. 15 px, vier bis fünf Zeilen.
- Farbe/Fläche: Der dunkelste Punkt der Seite. Das Hintergrundbild ist so weit abgedunkelt, dass es fast als Textur wirkt — kein Farbschleier, nur Abdunkelung.
- Abstände/Rhythmus: Sektion über 800 px hoch. Zwischen H2 und Schrittreihe ca. 260 px reiner Bildraum, der das Motiv atmen lässt. Sehr bewusst gesetzte Leere.
- Mobil: Nicht separat geprüft.
- Pattern: `P-PROCESS-3`

### 14 — Schluss-CTA „Werde zum Held" (sitewide) [home-desktop-16-y10697.png | -]
- Anordnung: Schwarze Sektion, alles zentriert auf der Mittelachse. Nur zwei Elemente: zweizeilige Überschrift und darunter ein einzelner Button. Sonst nichts — sehr viel leerer Raum darüber und darunter.
- Buttons/Komponenten: Ein gefüllter gelber CTA `#F4C23C`, Rechteck Radius ca. 6 px, ca. 240 × 46 px, schwarzes Label plus Pfeil. Bemerkenswert: die Schlusssektion trägt die Akzentfarbe nur im Button, die Fläche bleibt schwarz — kein volles Akzentband.
- Typo: H2 zweizeilig zentriert, Zeile 1 Weiß, Zeile 2 Gelb, ca. 32 px Regular. Kein Lead, kein Subtext.
- Farbe/Fläche: Schwarz. Zusammen mit Sektion 06 und 13 ist die Seite überwiegend dunkel im unteren Drittel.
- Abstände/Rhythmus: Ca. 220 px Padding oben, ca. 220 px bis zum Footer. Die Sektion lebt fast nur von Leerraum.
- Mobil: Nicht separat geprüft; erwartbar identisch zentriert gestapelt.
- Pattern: `P-CTA-END`

### 15 — Footer (sitewide) [home-desktop-16-y10697.png | -]
- Anordnung: Schwarz, dreiteilig. Oben links zwei Linkspalten nebeneinander, rechts eine Reihe aus vier Siegel-Kacheln, darunter rechtsbündig die Adresse in zwei Zeilen. Darunter über die volle Breite die riesige Wortmarke „peter.at" als eigenständiges Schlussbild. Ganz unten eine Fußzeile mit Claim links und Copyright rechts.
- Buttons/Komponenten: Keine Buttons. Ein einziges Badge: „Wir suchen" als kleines gelbes Rechteck `#F4C23C`, Radius ca. 3 px, schwarze Schrift ca. 12 px, sitzt direkt neben dem Karriere-Link — der einzige Akzent im ganzen Footer. Vier ProvenExpert-Siegel als Original-Bildmarken auf dunklem Grund, ca. 120 × 120 px.
- Typo: Spaltenüberschriften ca. 15 px in dunklem Grau, also schwächer als die Links darunter — ungewöhnliche Umkehrung der üblichen Hierarchie. Links ca. 16 px Weiß. Die Wortmarke ist mit über 300 px Höhe um Faktor 20 größer als die Links und füllt die Breite von Rand zu Rand bündig aus.
- Farbe/Fläche: Durchgehend Schwarz mit weißer Typo. Die Wortmarke ist reines Weiß und damit die größte helle Fläche der Seite.
- Abstände/Rhythmus: Linkabstand ca. 40 px vertikal. Zwischen Linkblock und Wortmarke ca. 50 px. Die Wortmarke sitzt sehr dicht an der Fußzeile — bewusst als Abschluss, nicht als Deko.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

### Zustaende (Hover) [home-desktop-hover-00-Kundenerfahrungen.png | -]
- Anordnung: Geprüft wurden die fünf Hover-Shots der Startseite (`home-desktop-hover-00-Kundenerfahrungen.png`, `home-desktop-hover-01-Über_uns.png`, `home-desktop-hover-02-Freunde_empfehlen.png`, `home-desktop-hover-03-Kontakt.png`, `home-desktop-hover-04-Jetzt_Ersparnis_berechne.png`) plus der freie Shot `home-hover-00.png`, gegengeprüft auf `presse-desktop-hover-01-Über_uns.png`, `karriere-desktop-hover-02-Freunde_empfehlen.png`, `partnerbetrieb-werden-desktop-hover-03-Kontakt.png`, `weiterempfehlen-desktop-hover-00-Kundenerfahrungen.png` und `news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-hover-00-Kundenerfahrungen.png`. Wichtig für die Auswertung: Nichts an der Anordnung bewegt sich beim Hover. Ein Pixeldiff von `home-desktop-hover-03-Kontakt.png` gegen `home-desktop-hover-00-Kundenerfahrungen.png` ergibt eine Änderungsfläche, die ausschließlich in der Navigationszeile (x ca. 343–982, y ca. 25–117) liegt — kein Versatz, kein Größenwechsel, keine Umbrüche. Der Hover ist rein farblich.
- Buttons/Komponenten: **Navigationslinks (Header, sitewide)** — einziger belegter Hover-Effekt der Site. Der Link unter dem Zeiger wird ausgegraut, alle übrigen bleiben unverändert. Über dem Foto-Hero gemessen auf `home-desktop-hover-02-Freunde_empfehlen.png`: „Freunde empfehlen" fällt von Weiß `#FFFFFF` auf `#B3B6BB`, während die drei Nachbarlinks exakt `#FFFFFF` behalten. Auf weißem Header ist der Wert glatt und eindeutig — auf `presse-desktop-hover-01-Über_uns.png`, `karriere-desktop-hover-00-Kundenerfahrungen.png`, `partnerbetrieb-werden-desktop-hover-03-Kontakt.png` und `news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-hover-02-Freunde_empfehlen.png` misst der gehoverte Link jedes Mal identisch `#7E7E7E` gegen `#000000` der Nachbarn, also exakt 50 % Deckkraft auf weißem Grund. Kein Unterstrich, kein Farbwechsel Richtung Gelb, keine Gewichtsänderung, kein Hintergrund-Chip. **Header-CTA „Jetzt Ersparnis berechnen"** — nicht belegt. Der Shot `home-desktop-hover-04-Jetzt_Ersparnis_berechne.png` trägt den Button zwar im Namen, zeigt ihn aber pixelidentisch zum Normalzustand: Rahmenpixel und Füllung stimmen mit `home-hover-00.png` überein, und die Diff-Fläche endet bei x ca. 982, während der Button erst bei x ca. 1057 beginnt. Dasselbe Bild auf `presse-desktop-hover-04-Jetzt_Ersparnis_berechne.png`, `karriere-desktop-hover-04-Jetzt_Ersparnis_berechne.png` und `weiterempfehlen-desktop-hover-04-Jetzt_Ersparnis_berechne.png`. Der Zeiger hat den Button nicht erreicht — CTA-Hover ist damit **nicht geprüft**, nicht „ohne Effekt". **Karten** (News-, Job-, Produktkarten) — kein Hover-Shot vorhanden. Auf `presse-desktop-hover-01-Über_uns.png` liegen die drei News-Karten unberührt im selben Zustand wie im Normal-Shot; Karten-Hover ist **nicht geprüft**.
- Typo: Beim Hover ändert sich ausschließlich die Füllfarbe der Glyphen. Schriftgröße, Schnitt, Laufweite und Grundlinie bleiben konstant — die Linkbreite ist zwischen `home-desktop-hover-01-Über_uns.png` und `home-desktop-hover-02-Freunde_empfehlen.png` unverändert, es gibt also keinen Wechsel auf einen fetteren Schnitt.
- Farbe/Fläche: Die Hover-Semantik der Site ist Zurücknehmen statt Hervorheben — das Ziel wird blasser, nicht kräftiger. Die Akzentfarbe `#F4C23C` kommt im Hover-Zustand nirgends zum Einsatz. Bemerkenswert: Derselbe Grauwert markiert auch die aktive Seite (Sektion 02 beschreibt „Kundenerfahrungen" auf `erfahrungen-desktop-00-fold.png` als ausgegraut). Aktiv und Hover sind damit visuell nicht unterscheidbar, was auf `weiterempfehlen-desktop-hover-00-Kundenerfahrungen.png` auffällt: Dort liegt über dem dunklen Hero-Foto ein uneinheitlicher Grauschleier über allen vier Links, und der gehoverte Link hebt sich nicht messbar ab.
- Abstände/Rhythmus: Unverändert. Kein Padding-Wachstum, kein Verschieben der Nachbarlinks, kein Aufklappen eines Dropdowns — die Navigation hat keine Untermenüs, die ein Hover öffnen könnte.
- Mobil: Nicht geprüft. Es existiert kein einziger Shot mit `mobile` und `hover` im Namen; auf Touch wäre der Zustand ohnehin nicht auslösbar.
- Pattern: Kandidat: Hover als Abblenden statt Hervorheben (Link auf 50 % statt Akzentfarbe oder Unterstrich)

## Seite: /erfahrungen

### 16 — Hero [erfahrungen-desktop-00-fold.png | erfahrungen-mobile-00-fold.png]
- Anordnung: Wie Sektion 03 aufgebaut, aber ohne Siegel-Kacheln. Vollflächiges Foto (Familie läuft durch eine Wiese vor einem Haus mit PV), Textspalte linksbündig bei x=140, vertikal mittig. Die Personen stehen rechts im Bild, der Text links im ruhigen Bildteil.
- Buttons/Komponenten: Genau ein gefüllter gelber CTA, identisch zu Sektion 03. Der Header-CTA ist hier wieder Outline über dem Foto.
- Typo: H1 dreizeilig statt zweizeilig, ca. 40 px Weiß Regular, keine Akzentzeile — auf Fotos bleibt die Headline durchgehend weiß, die gelbe zweite Zeile gibt es nur auf schwarzen Flächen. Kein Lead unter der H1, der CTA folgt direkt.
- Farbe/Fläche: Warmes Naturfoto, links leicht abgedunkelt für die Lesbarkeit. Akzent nur im Button.
- Abstände/Rhythmus: H1 zu CTA nur ca. 45 px — deutlich dichter als auf der Startseite, weil der Lead fehlt.
- Mobil: Nicht separat geprüft im Detail; der Fold zeigt dieselbe Stapelung wie Sektion 03.
- Pattern: `P-HERO-PHOTO`

### 17 — Video-Testimonial-Raster [erfahrungen-desktop-03-y1500.png, erfahrungen-desktop-05-y3000.png | -]
- Anordnung: Weiße Sektion, striktes Drei-Spalten-Raster über viele Reihen (im Shot mindestens sechs Reihen). Jede Zelle folgt exakt derselben vertikalen Ordnung: Video-Thumbnail, Spec-Zeile, Titel, Zitat, Trennlinie, Ersparnis-Zahl, Unterzeile, Name/Ort. Keine Karten, keine Rahmen — die Spalten sind offen, nur eine dünne Linie trennt Zitat von Zahl. Die letzte Reihe bleibt bewusst unausgefüllt, statt gestreckt zu werden.
- Buttons/Komponenten: YouTube-Embeds mit Original-Play-Button und „Ansehen auf YouTube"-Leiste, ca. 360 × 200 px, Radius 0. Spec-Zeile mit zwei kleinen Strich-Icons (Panel-Raster, Batterie) plus Wert — kein Badge, kein Chip, nur Icon plus Text. Keine Sterne, keine Bewertungszahlen.
- Typo: Spec ca. 14 px Grau, Titel ca. 17 px Schwarz, Zitat ca. 16 px in Anführungszeichen, Ersparnis-Zahl ca. 18 px Schwarz mit ca. 13 px grauer Unterzeile direkt darunter, Name/Ort ca. 16 px. Fünf Textgrößen in einer Zelle, klar gestaffelt.
- Farbe/Fläche: Reines Weiß. Kein Akzent in der ganzen Sektion — die Farbe kommt allein aus den Thumbnails und dem roten YouTube-Button.
- Abstände/Rhythmus: Spaltenabstand ca. 40 px, Reihenabstand ca. 145 px. Innerhalb der Zelle dicht (ca. 20 px zwischen Blöcken), zwischen den Reihen sehr luftig.
- Mobil: Nicht separat geprüft.
- Pattern: `P-TESTIMONIAL`

### 18 — Prämien-Block mit Bildfläche [erfahrungen-desktop-09-y6000.png | -]
- Anordnung: Schwarze Sektion. Zentrierter CTA allein auf der Mittelachse, darunter mit deutlichem Abstand ein einzelnes breites Foto (Gruppe am Gartentisch) über ca. 80 % Breite, Radius 0, ohne Rahmen und ohne Überschrift darunter.
- Buttons/Komponenten: Ein gefüllter gelber CTA mit abweichendem Label und Pfeil, sonst formgleich zu allen anderen Buttons.
- Typo: Im Slice keine Überschrift sichtbar — der Kopf liegt oberhalb des Ausschnitts. Nicht lesbar in diesem Shot.
- Farbe/Fläche: Schwarz, das Foto ist die einzige helle Fläche und trägt warme Farben.
- Abstände/Rhythmus: CTA zu Bild ca. 90 px, Bild ca. 580 px hoch. Danach harter Wechsel auf Weiß.
- Mobil: Nicht separat geprüft.
- Pattern: `P-GALLERY`

### 19 — Auszeichnungen und Partner [erfahrungen-desktop-09-y6000.png | -]
- Anordnung: Weiße Sektion. Zentrierte Überschrift, darunter eine Reihe aus sieben gleich hohen Kacheln über die volle Inhaltsbreite, alle Logos vertikal zentriert.
- Buttons/Komponenten: Sieben Kacheln mit dünnem hellgrauem 1-px-Rand, Radius nahe 0, ca. 168 × 168 px, weiße Füllung, kein Schatten. Inhalt sind Original-Bildmarken in ihren Eigenfarben — ProvenExpert-Siegel türkis und beige, DAH Solar blau, Raiffeisen gelb-schwarz. Keine nachgebauten Buchstabenkacheln.
- Typo: Nur eine H2, ca. 30 px Schwarz Regular, zentriert, einzeilig — hier ausnahmsweise ohne die sonst übliche zweite Farbzeile.
- Farbe/Fläche: Weiß. Die Fremdlogos sind die einzige Farbe und werden bewusst nicht neutralisiert.
- Abstände/Rhythmus: H2 zu Kachelreihe ca. 65 px. Kacheln stoßen fast aneinander (Abstand ca. 8 px) und bilden eine durchgehende Leiste.
- Mobil: Nicht separat geprüft.
- Pattern: `P-PROOF-STRIP`

### 20 — Interview-Slider [erfahrungen-desktop-12-y8250.png | -]
- Anordnung: Schwarze Sektion. Vier Karten nebeneinander, die vierte rechts angeschnitten. Jede Karte: Querformat-Foto oben, darunter Spec-Zeile, Titel, Ort, und als einziges Element mit Aktion ein Button. Darunter zwei Fortschrittsstriche und die zwei runden Pfeile.
- Buttons/Komponenten: Pro Karte ein kleiner gefüllter gelber Button `#F4C23C`, ca. 136 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil — dieselbe Formsprache wie der Haupt-CTA, nur kleiner. Vier gelbe Buttons nebeneinander sind die dichteste Akzenthäufung der ganzen Site. Fotos Radius 0, ca. 360 × 240 px.
- Typo: Spec ca. 14 px, Titel ca. 17 px Weiß, Ort ca. 15 px Grau darunter. Kompakt.
- Farbe/Fläche: Schwarz, Fotos und vier gelbe Buttons als Farbträger.
- Abstände/Rhythmus: Deutlich dichter als die übrigen Slider — Foto zu Text ca. 20 px, Text zu Button ca. 30 px.
- Mobil: Nicht separat geprüft.
- Pattern: `P-GALLERY`

### 21 — Funnel-Block [erfahrungen-desktop-12-y8250.png | -]
- Wie Sektion 06 (Startseite), identisch aufgebaut: schwarze Fläche, zentrierte Weiß/Gelb-Headline, vier Trust-Punkte, helle Formularkarte mit grünem Fortschrittsbalken und 3×3-Kachelraster. Einziger Unterschied: der Lead bricht hier auf zwei statt drei Zeilen.
- Pattern: `P-CONTACT`

### 22 — Schluss-CTA und Footer [erfahrungen-desktop-15-y10309.png | -]
- Identisch zu Sektion 14 und 15 der Startseite, pixelgleich inklusive Wortmarke, Siegelreihe und „Wir suchen"-Badge.
- Pattern: `P-CTA-END` und Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /uber-peter-at

### 23 — Hero [uber-peter-at-desktop-00-fold.png | uber-peter-at-mobile-00-fold.png]
- Anordnung: Wie Sektion 03/16. Vollflächiges Foto eines Monteurs auf dem Dach, Textspalte links bei x=140. Das Motiv ist deutlich dunkler und detailreicher als die anderen Heros, die Textzone liegt über einer ruhigen dunklen Panelfläche.
- Buttons/Komponenten: Ein gefüllter gelber CTA. Der Header-CTA ist Outline, hier besonders schwach lesbar, weil der Hintergrund an dieser Stelle hell ist.
- Typo: H1 zweizeilig, ca. 40 px Weiß Regular, kein Lead, CTA folgt direkt.
- Farbe/Fläche: Kühles graues Foto, links leicht abgedunkelt. Der gelbe Button ist der einzige warme Punkt im Fold.
- Abstände/Rhythmus: H1 zu CTA ca. 45 px, wie auf /erfahrungen.
- Mobil: Nicht separat geprüft im Detail.
- Pattern: `P-HERO-PHOTO`

### 24 — Mission als Textblock [uber-peter-at-desktop-02-y750.png | -]
- Anordnung: Schwarze Sektion. Links oben eine zweizeilige H2 über ca. 30 % Breite, darunter zwei gleich breite Fließtextspalten über je ca. 40 % Breite, mit ca. 65 px Abstand. Keine Bilder, keine Karten, keine Aufzählung. Darunter beginnt ein breites Teamfoto über ca. 80 % Breite.
- Buttons/Komponenten: Keine. Reiner Typo-Block.
- Typo: H2 zweizeilig, hier beide Zeilen Weiß ohne Akzent — Ausnahme zur sonstigen Weiß/Gelb-Mechanik. Ca. 30 px. Fließtext ca. 16 px in leicht gedämpftem Weiß, je vier Zeilen.
- Farbe/Fläche: Schwarz, kein Akzent in der ganzen Sektion.
- Abstände/Rhythmus: Sektions-Padding oben ca. 130 px, H2 zu Textspalten ca. 70 px, Text zu Foto ca. 110 px.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Zweispaltiger Mission-Textblock ohne Bild

### 25 — Weißes Aktionsband [uber-peter-at-desktop-04-y2250.png | -]
- Anordnung: Auf schwarzem Grund liegt eine weiße Karte über die volle Inhaltsbreite (ca. 1160 px), Höhe ca. 350 px. Alles darin zentriert und vertikal mittig: zweizeilige Headline, eine Zeile Subtext, ein Button. Die Karte hat spürbaren Abstand zu den Sektionen darüber und darunter und steht dadurch als Insel.
- Buttons/Komponenten: Ein gefüllter gelber CTA, formgleich zum Header-Button. Die Karte selbst: reines Weiß `#FFFFFF` gemessen, Radius ca. 4 px, kein Rand, kein Schatten.
- Typo: Headline zweizeilig, Zeile 1 Schwarz, Zeile 2 Grau `#B2B2B2` — auf heller Fläche wird die Akzentzeile grau statt gelb, konsistent mit Sektion 04. Ca. 30 px. Subtext ca. 17 px Schwarz.
- Farbe/Fläche: Die Fläche bleibt hell, nur der Button trägt Farbe — deckt sich mit S17.
- Abstände/Rhythmus: Karteninnenabstand oben ca. 95 px, Headline zu Subtext ca. 30 px, Subtext zu Button ca. 30 px. Innen ruhig zentriert.
- Mobil: Nicht separat geprüft.
- Pattern: `P-CTA-MID`

### 26 — Drei Textspalten (wiederverwendet) [uber-peter-at-desktop-04-y2250.png | -]
- Wie Sektion 04, aber invertiert auf schwarzem Grund und mit gelber statt grauer zweiter Headline-Zeile. Spaltenstruktur, Breiten und Abstände sind identisch. Im Shot ist die Sektion als Einblend-Animation halb transparent erfasst — die Spaltentexte erscheinen ausgegraut, das ist ein Scroll-Effekt, kein Farbwert.
- Pattern: Kandidat: Offene Drei-Spalten-Typo statt Icon-Karten

### 27 — Event-Sektion mit Video [uber-peter-at-desktop-04-y2250.png, uber-peter-at-desktop-06-y3750.png | -]
- Anordnung: Sehr dunkle Sektion. Zentrierte zweizeilige Überschrift, darunter ein breiter Videoplayer über die volle Breite ohne seitlichen Rand, mit einem zentrierten Play-Button und einem Fortschrittsbalken am unteren Rand.
- Buttons/Komponenten: Play-Button als runder Outline-Kreis ca. 90 px, dünner weißer 1-px-Rand, transparente Füllung, weißes Dreieck — deutlich größer und offener als die Slider-Pfeile. Fortschrittsbalken 1 px hoch über die volle Breite, gefüllter Teil Weiß.
- Typo: H2 zweizeilig zentriert, ca. 30 px, beide Zeilen Weiß.
- Farbe/Fläche: Nahezu schwarz, das Videobild ist selbst sehr dunkel. Kein Akzent.
- Abstände/Rhythmus: Das Video läuft randlos, was in dieser Site sonst nirgends vorkommt — alle anderen Bildflächen halten Rand.
- Mobil: Nicht separat geprüft.
- Pattern: Kandidat: Randloses Video-Band mit Outline-Play

### 28 — Zertifizierte Bewertungen (ProvenExpert-Widget) [uber-peter-at-desktop-06-y3750.png | -]
- Anordnung: Weiße Sektion. Zentrierte H2, darunter ein einzelnes breites Widget über die volle Inhaltsbreite. Das Widget ist horizontal in fünf Zonen geteilt: Logo links, Sternwertung, Empfehlungsgrafik, zweizeilige Detailwertung, Zitatkasten rechts. Darunter eine abgesetzte Fußzeile mit drei Häkchen-Punkten links und einem Link rechts.
- Buttons/Komponenten: Ein eingebettetes Fremdsystem, das dem Site-Stil sichtbar nicht folgt: eigener Rahmen mit ca. 8 px Radius, eigene Türkis- und Goldtöne, gelbe Sterne, blauer Link. Zitatkasten mit eigenem Rand und Sprechzeiger. Bewusst als Fremdbeleg stehen gelassen statt umgestylt.
- Typo: H2 ca. 30 px Schwarz zentriert, einzeilig ohne Akzentzeile. Innerhalb des Widgets deutlich kleinere Schriften ab ca. 11 px und eine fremde Schriftart — nicht die Site-Grotesk.
- Farbe/Fläche: Weiß. Die Widget-Eigenfarben sind die einzige Farbe.
- Abstände/Rhythmus: H2 zu Widget ca. 60 px. Widget-Innenabstand ca. 24 px, dicht gepackt gegenüber dem sonst luftigen Layout.
- Mobil: Nicht separat geprüft.
- Pattern: `P-PROOF-STRIP`

### 29 — Produkt-Isometrie (wiederverwendet) [uber-peter-at-desktop-06-y3750.png | -]
- Wie Sektion 08 der Startseite, identisch in Aufbau, Kopfzeile und Chip-Mechanik.
- Pattern: Kandidat: Beschriftete Produkt-Isometrie statt Icon-Raster

### 30 — Bundesländer-Slider [uber-peter-at-desktop-10-y6750.png | -]
- Anordnung: Weiße Sektion. Vier Karten nebeneinander, vierte angeschnitten. Jede Karte: großes Kreisbild oben mittig, darunter linksbündig Titel und zwei bis drei Zeilen Text. Darunter sieben Fortschrittsstriche und die zwei runden Pfeile.
- Buttons/Komponenten: Karten als flache `#F5F5F5`-Flächen ohne Rahmen, Radius nahe 0, ca. 360 × 480 px — formgleich mit dem Produkt-Slider aus Sektion 05, nur mit Fotokreis statt Produktkreis. Kreisbilder ca. 260 px, randlos beschnitten. Steuerung identisch, aktiver Strich gelb.
- Typo: Titel ca. 17 px Schwarz Regular, Text ca. 15 px Grau. Zwei Stufen, kein Eyebrow — eine Stufe weniger als beim Produkt-Slider.
- Farbe/Fläche: Weiß mit `#F5F5F5`-Karten. Farbe kommt allein aus den Landschaftsfotos.
- Abstände/Rhythmus: Kartenabstand ca. 40 px. Innen ca. 34 px. Unter dem Slider ca. 45 px bis zu den Strichen.
- Mobil: Nicht separat geprüft.
- Pattern: `P-GALLERY`

### 31 — Funnel-Block, Schluss-CTA, Footer [uber-peter-at-desktop-10-y6750.png | -]
- Wie Sektionen 06, 14 und 15 der Startseite. Der Funnel-Block zeigt hier eine abweichende vierte Trust-Zeile, sonst identisch.
- Pattern: `P-CONTACT`, `P-CTA-END`

## Seite: /anfragen

### 32 — Funnel-Header ohne Navigation [anfragen-desktop-00-fold.png | anfragen-mobile-00-fold.png]
- Anordnung: Weißer Header, zwei Zonen. Links die Wortmarke, ganz rechts eine einzelne Zeile mit eingebettetem Zähler. Dazwischen nichts — keine Navigationslinks, kein CTA. Der Countdown-Banner darüber bleibt.
- Buttons/Komponenten: Kein Button. Statt des CTA ein schwarzes Zähler-Chip, Radius ca. 4 px, ca. 68 × 26 px, weiße Ziffern, dahinter ein kleiner gelber Kreis `#F4C23C` mit Pfeil — der einzige Akzent im Header. Das Chip sitzt mitten in der Textzeile.
- Typo: Zeile ca. 15 px Schwarz, Ziffern im Chip ca. 15 px Weiß fett. Wortmarke wie sitewide.
- Farbe/Fläche: Weiß, deckend. Kein transparenter Zustand, weil hier kein Foto-Hero folgt.
- Abstände/Rhythmus: Höhe ca. 88 px wie der normale Header, wirkt durch die leere Mitte deutlich ruhiger.
- Mobil: Wortmarke links, die Zählerzeile rutscht direkt daneben und bricht auf zwei Zeilen. Kein Burger — es gibt keine Navigation zu öffnen. Das ist der einzige Header der Site ohne Menü.
- Pattern: Kandidat: Funnel-Header ohne Navigation mit Live-Zähler

### 33 — Funnel-Schritt 1 [anfragen-desktop-00-fold.png | anfragen-mobile-00-fold.png]
- Anordnung: Weiße Seitenfläche statt der schwarzen Funnel-Sektion vom Rest der Site. Zentrierte H1, darunter drei Trust-Punkte in einer Reihe zentriert (nicht vier und nicht über die volle Breite verteilt wie in Sektion 06), darunter die helle Formularkarte auf ca. 940 px Breite — schmaler als der Funnel-Block auf den anderen Seiten.
- Buttons/Komponenten: Neun weiße Auswahlkacheln auf `#F5F5F5`-Karte, Radius ca. 4 px, sehr dezenter Schatten, ca. 260 × 78 px, Bundesland-Umriss über der Beschriftung. Trust-Häkchen hier als schwarze Kreise mit weißem Haken — invertiert gegenüber Sektion 06, weil der Grund weiß ist. Fortschrittsbalken `#30AB66` auf `#CAEFDB`, ca. 2 px, füllt etwa ein Neuntel.
- Typo: H1 ca. 30 px Schwarz Regular, zentriert, einzeilig — die einzige H1 der Site ohne zweite Farbzeile. Trust-Text ca. 15 px, Frage in der Karte ca. 22 px, Kacheln ca. 15 px.
- Farbe/Fläche: Durchgehend hell. Der einzige Farbträger ist der grüne Fortschrittsbalken. Keine dunkle Sektion, kein Gelb im ersten Viewport — bewusst reizarm gehalten.
- Abstände/Rhythmus: H1 zu Trust-Reihe ca. 50 px, Trust-Reihe zu Karte ca. 55 px, Karteninnenabstand ca. 55 px oben. Kachelabstand ca. 18 px.
- Mobil: Trust-Punkte stapeln linksbündig untereinander. Kachelraster wird 2 × 5. Die Karte läuft fast randlos, Innenabstand schrumpft auf ca. 16 px. Die Frage bricht auf zwei Zeilen.
- Pattern: `P-CONTACT`

### 34 — Social Proof und Partner-Hersteller [anfragen-desktop-02-y750.png | -]
- Anordnung: Weiße Sektion, drei Blöcke zentriert untereinander. Oben eine Avatar-Gruppe mit zweizeiliger Bildunterschrift. Darunter Überschrift plus Unterzeile. Darunter fünf Herstellerlogos in einer Reihe, gleichmäßig über die volle Breite verteilt, vertikal zentriert. Ganz unten zwei zentrierte Kontaktangaben nebeneinander.
- Buttons/Komponenten: Keine Buttons, keine Kacheln, keine Rahmen — die Logos stehen frei auf Weiß, anders als die gerahmten Kacheln in Sektion 19. Vier überlappende runde Avatare ca. 26 px, weiß umrandet.
- Typo: H2 ca. 30 px Schwarz zentriert, Unterzeile ca. 17 px Grau. Kontaktlabels ca. 15 px Grau über ca. 16 px schwarzen Werten.
- Farbe/Fläche: Weiß. Farbe ausschließlich aus den Original-Herstellerlogos (Huawei rot, LONGi rot, Trina blau, Fronius rot, DAH blau).
- Abstände/Rhythmus: Zwischen den drei Blöcken je ca. 130 px. Logos mit ca. 130 px Abstand sehr großzügig gesetzt, keine gedrängte Leiste.
- Mobil: Nicht separat geprüft.
- Pattern: `P-PROOF-STRIP`

### 35 — Footer [anfragen-desktop-02-y750.png | -]
- Identisch zu Sektion 15, inklusive Wortmarke und „Wir suchen"-Badge. Bemerkenswert: die Funnel-Seite entfernt die Navigation im Header, behält den vollen Footer mit allen Links aber bei.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /kontakt

### 36 — Kontakt-Split [kontakt-desktop-00-fold.png | kontakt-mobile-00-fold.png]
- Anordnung: Weiße Sektion, zwei Spalten mit deutlich unterschiedlicher Breite. Links ca. 40 %: zweizeilige H1, Fließtext, darunter mit großem Abstand zwei Kontaktangaben untereinander. Rechts ca. 35 %: das Formular, beginnt vertikal etwas höher als die H1 links. Zwischen beiden Spalten bleibt ca. 200 px leer — ein auffällig breiter Graben.
- Buttons/Komponenten: Ein gefüllter gelber Submit-Button `#F4C23C`, ca. 188 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label, hier ohne Pfeil — der einzige Button der Site ohne Pfeil. Formularfelder als weiße Rechtecke `#FFFFFF` mit dünnem grauem 1-px-Rand, Radius ca. 4 px, Höhe ca. 42 px, Placeholder in hellem Grau. Vorname und Nachname stehen in einer Zweierreihe, E-Mail und Telefon je über volle Spaltenbreite. Das Telefonfeld hat links ein abgetrenntes Länderfeld mit Flagge und Chevron. Nachricht als Textarea ca. 62 px hoch mit Resize-Griff unten rechts.
- Typo: H1 zweizeilig, Zeile 1 Schwarz, Zeile 2 Grau `#B2B2B2`, ca. 32 px. Fließtext ca. 16 px, drei Zeilen. Feldlabels ca. 15 px Schwarz mit rotem Pflicht-Sternchen — das einzige Rot der Site außerhalb von Fremdlogos. Kontaktlabels ca. 15 px Grau über ca. 16 px schwarzen Werten.
- Farbe/Fläche: Reines Weiß über den ganzen Viewport. Der gelbe Button ist der einzige Akzent, das rote Sternchen der einzige Fremdton.
- Abstände/Rhythmus: Sektions-Padding oben ca. 180 px. Feldabstand ca. 22 px, Label zu Feld ca. 8 px. Rechts dicht, links sehr luftig — die Asymmetrie ist gewollt.
- Mobil: Klare Stapelung: erst der komplette Textblock, dann die beiden Kontaktangaben nebeneinander in zwei Spalten (statt untereinander wie am Desktop), dann das Formular. Vorname und Nachname stapeln von nebeneinander auf untereinander. Alle Felder laufen auf volle Breite. Der Header behält hier den Burger, anders als auf /anfragen.
- Pattern: `P-CONTACT`

### 37 — Footer [kontakt-desktop-02-y317.png | -]
- Identisch zu Sektion 15. Die Seite ist mit ca. 1800 px die kürzeste der Site: Kontakt-Split, dann direkt der Footer, ohne Schluss-CTA — die einzige Seite ohne `P-CTA-END`.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Querschnitt

- Button-System: Genau eine Form für alles — Rechteck mit ca. 6 px Radius, gefüllt `#F4C23C`, schwarzes Label, Pfeil rechts. Varianten nur in der Größe (Header ca. 244 px, Karten-Button ca. 136 px, Submit ca. 188 px). Keine Pille (S4 erfüllt). Zweite Variante nur als Outline über Foto-Heros. Ghost- oder Textbuttons gibt es nicht.
- Headline-System: Zweizeilige Überschrift mit abgestufter zweiter Zeile. Auf dunkel wird Zeile 2 gelb `#F4C23C`, auf hell grau `#B2B2B2`, auf Fotos bleiben beide Zeilen weiß. Konsistent auf allen fünf Seiten. Alle Headlines Regular, nie Bold — die Hierarchie trägt allein die Größe.
- Karten-Disziplin: Karten erscheinen nur dort, wo gleichartige Dinge nebeneinander stehen (Produkt-Slider, Bundesländer-Slider, Funnel-Kacheln, Siegel-Kacheln). Erklärsektionen laufen konsequent als offene Textspalten ohne Rahmen — S2 und S14 werden eingehalten.
- Slider-System: Ein einziges Muster über die ganze Site — angeschnittene vierte Karte rechts, kurze Fortschrittsstriche statt Dots (aktiver Strich gelb), zwei runde Outline-Pfeile ca. 46 px darunter zentriert. Vier Slider auf drei Seiten, alle formgleich.
- Farbdisziplin: Genau eine Akzentfarbe, nie als Vollfläche. Selbst die Schluss-Sektion bleibt schwarz und färbt nur den Button. Fremdfarben treten ausschließlich in Originallogos, im ProvenExpert-Widget, im grünen Fortschrittsbalken und im Countdown-Banner auf — jeweils klar als Fremdsystem erkennbar.
- Cookie-Overlay: Auf keinem der geprüften Shots sichtbar. Entweder nicht ausgelöst oder vor dem Capture geschlossen.

## Nicht geprüft

- Mobile Detailslices der Sektionen 07 bis 15 sowie sämtliche Mobile-Slices von /erfahrungen und /uber-peter-at unterhalb des Folds — dort ist nur „wie Desktop gestapelt" plausibel, aber nicht belegt.
- Hover-, Fokus- und Motion-Zustände: Alle Shots sind statisch (`manifest.json`: `states: false`). Der Header-CTA-Wechsel von Outline zu Füllung ist über zwei Slices belegt, alles Weitere nicht.
- Exakte Schriftfamilie: Als Grotesk erkennbar, aber ohne CSS-Extrakt nicht benennbar. Alle Schriftgrößen und Radien sind aus dem Pixelbild geschätzt, nicht ausgelesen; nur die Farbwerte sind gemessen.
- Sektion 18: Die Überschrift liegt oberhalb des Slice-Ausschnitts und ist nicht lesbar.

## Seite: /karriere

### 38 — Textkopf ohne Foto-Hero [karriere-desktop-00-fold.png | karriere-mobile-00-fold.png]
- Anordnung: Weiße Fläche direkt unter dem Header, kein Bild, kein Overlay. Linksbündige H1 bei x=140, darunter eine einzelne Lead-Zeile. Der Kopf steht allein über ca. 300 px Höhe, rechts daneben bleibt die gesamte Breite leer. Die einzige Seite der Site, die ohne Foto-Hero startet — der Header ist deshalb von Anfang an weiß und deckend statt transparent.
- Buttons/Komponenten: Keine. Weder CTA noch Eyebrow noch Siegel — der Kopf ist reine Typo. Der Header-CTA rechts ist hier im Fold bereits gelb gefüllt (`karriere-desktop-00-fold.png`), nicht als Outline wie über den Foto-Heros.
- Typo: H1 einzeilig ca. 34 px Schwarz Regular, ohne zweite Farbzeile — wie auf `/anfragen` bricht die sonst durchgehende Zweizeilen-Mechanik hier weg. Lead ca. 18 px in mittlerem Grau, einzeilig. Verhältnis H1 zu Lead ca. 1,9 : 1.
- Farbe/Fläche: Reines Weiß über den ganzen Fold. Kein Akzent außerhalb des Header-CTA — der farbärmste Seitenanfang der Site.
- Abstände/Rhythmus: Vom Header bis zur H1 ca. 170 px, H1 zu Lead ca. 30 px, Lead bis zur ersten Kartenreihe ca. 95 px. Luftig, aber deutlich kompakter als ein Hero-Fold.
- Mobil: Identische Ordnung, nur enger. H1 auf ca. 26 px, der Lead bricht auf zwei Zeilen. Die erste Karte beginnt schon bei ca. y=355 (`karriere-mobile-00-fold.png`), also noch im Fold — anders als am Desktop, wo unter dem Kopf zuerst Leerraum steht.
- Pattern: Kandidat: Weißer Typo-Seitenkopf ohne Hero-Bild

### 39 — Job-Karten-Raster [karriere-desktop-00-fold.png, karriere-desktop-02-y750.png | karriere-mobile-00-fold.png]
- Anordnung: Weiße Sektion, striktes Drei-Spalten-Raster über die volle Inhaltsbreite. Sieben Karten in drei Reihen; die letzte Reihe enthält nur eine Karte und bleibt links stehen, ohne gestreckt oder zentriert zu werden — dieselbe Nicht-Streckung wie im Testimonial-Raster von Sektion 17. Jede Karte folgt derselben vertikalen Ordnung: Titel, Beschreibung, zweiteilige Meta-Zeile mit Icons, dann ein Freiraumpuffer und ganz unten der Button. Der Puffer richtet die Buttons aller Karten einer Reihe auf gleiche Grundlinie aus, obwohl die Texte unterschiedlich lang sind.
- Buttons/Komponenten: Erste gerahmte Karte der Site — dünner hellgrauer 1-px-Rand, Radius ca. 6 px, weiße Füllung, kein Schatten, ca. 360 × 365 px, Innenabstand ca. 25 px. Damit weicht `/karriere` von der Karten-Disziplin des Bestands ab, wo Karten flach `#F5F5F5` ohne Rand sind (Sektion 05, 30). Pro Karte ein gefüllter gelber Button `#F4C23C`, ca. 163 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil — kleinste Button-Variante der Site nach dem Karten-Button aus Sektion 20. Meta-Zeile mit zwei dünnen Strich-Icons (Uhr, Pin) plus Wert, kein Chip, kein Badge — gleiche Icon-plus-Text-Mechanik wie die Spec-Zeile in Sektion 17.
- Typo: Titel ca. 17 px Schwarz Regular, Beschreibung ca. 15 px Grau über zwei bis drei Zeilen, Meta ca. 15 px Schwarz. Drei Stufen pro Karte. Der längste Titel bricht auf zwei Zeilen und schiebt den Beschreibungstext nach unten, ohne die Kartenhöhe zu ändern (`karriere-desktop-02-y750.png`).
- Farbe/Fläche: Weiß auf Weiß, die Karte wird allein durch den 1-px-Rand lesbar. Der gelbe Button ist der einzige Farbträger und wiederholt sich sieben Mal — nach Sektion 20 die zweitdichteste Akzenthäufung der Site.
- Abstände/Rhythmus: Spaltenabstand ca. 40 px, Reihenabstand ca. 80 px. Innerhalb der Karte dicht (Titel zu Text ca. 18 px, Text zu Meta ca. 22 px), darunter der ausgleichende Freiraum von 60 bis 130 px je nach Textlänge.
- Mobil: Karten stapeln einspaltig auf volle Breite, Abstand ca. 30 px. Die zweiteilige Meta-Zeile bricht von nebeneinander auf zwei Zeilen untereinander — jede Angabe bekommt ihr eigenes Icon in eigener Zeile. Der Ausgleichspuffer entfällt, der Button folgt direkt auf die Meta-Zeile, dadurch schrumpft die Karte auf ca. 265 px Höhe.
- Pattern: Kandidat: Gerahmte Job-Karte mit grundlinienbündigem Button

### 40 — Initiativbewerbungs-Band [karriere-desktop-02-y750.png, karriere-desktop-03-y1500.png | -]
- Anordnung: Sektion auf ruhiger heller Fläche, alles zentriert auf der Mittelachse. Nur drei Elemente untereinander: zweizeilige Überschrift, dann direkt der Button. Kein Lead, kein Bild, keine Karte. Die Sektion läuft über ca. 395 px Höhe und dient als Puffer zwischen Karten-Raster und Footer.
- Buttons/Komponenten: Ein gefüllter gelber Button `#F4C23C`, ca. 224 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil. Formgleich zum Haupt-CTA, trägt hier aber eine E-Mail-Adresse als Label statt einer Handlungsaufforderung — der einzige Button der Site mit Adress-Label.
- Typo: Überschrift zweizeilig zentriert, ca. 30 px Regular, Zeile 1 Schwarz, Zeile 2 Grau `#B2B2B2`. Damit folgt die Sektion exakt der Hell-Variante der Headline-Mechanik aus Sektion 04 und 25. Button-Label ca. 16 px Schwarz.
- Farbe/Fläche: Sehr helle, minimal von Weiß abgesetzte Fläche — sichtbar als Kante gegen das weiße Karten-Raster darüber (`karriere-desktop-03-y1500.png`, Kante bei ca. y=340). Kein Schwarz-Block: `/karriere` ist die einzige geprüfte Seite ohne dunkle Sektion im Verlauf.
- Abstände/Rhythmus: Sektions-Padding oben ca. 140 px, Headline zu Button ca. 60 px, Button bis Sektionsende ca. 150 px. Sehr viel Leerraum um wenige Elemente — Aufbau wie Sektion 14, nur hell statt schwarz.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: `P-CTA-END`

### 41 — Footer [karriere-desktop-03-y1500.png | -]
- Identisch zu Sektion 15, inklusive Wortmarke, vier Siegel-Kacheln und „Wir suchen"-Badge. Bemerkenswert: Das Badge steht auch auf der Karriereseite selbst neben dem Link zur eigenen Seite, wird also nicht als aktiver Zustand entfernt.
- Kein Schluss-CTA vor dem Footer, weil Sektion 40 diese Rolle bereits einnimmt.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /partnerbetrieb-werden

### 42 — Zentrierter Funnel-Kopf mit voller Navigation [partnerbetrieb-werden-desktop-00-fold.png | partnerbetrieb-werden-mobile-00-fold.png]
- Anordnung: Weiße Fläche, kein Bild. Alles zentriert auf der Mittelachse: H1, darunter ein dreizeiliger Lead auf ca. 760 px Breite, darunter über die volle Inhaltsbreite ein Fortschrittsbalken. Anders als der Funnel auf `/anfragen` behält diese Seite den kompletten Header mit vier Navigationslinks und dem gelben CTA (`partnerbetrieb-werden-desktop-00-fold.png`) — ein Funnel, der nicht abgeschottet wird.
- Buttons/Komponenten: Im Kopf selbst kein Button. Fortschrittsbalken über die volle Inhaltsbreite (ca. 1160 px), ca. 2 px hoch, gefüllter Teil `#30AB66` auf `#CAEFDB` wie in Sektion 06 und 33 — hier aber randlos über die Sektion gezogen statt in einer Karte sitzend. Der gefüllte Anteil beträgt im Fold-Shot ca. ein Fünftel und wächst im Klick-Zustand auf ca. zwei Fünftel (`partnerbetrieb-werden-desktop-click-y0-00-Weiter.png`) — der Balken ist der einzige Schrittanzeiger, es gibt keine Ziffern.
- Typo: H1 einzeilig zentriert ca. 30 px Schwarz Regular, ohne zweite Farbzeile — wie auf `/anfragen` und `/karriere`. Lead ca. 17 px in mittlerem Grau, drei Zeilen, ebenfalls zentriert. Frage darunter ca. 24 px Schwarz und deutlich fetter gesetzt als die H1 — die einzige Stelle der Site, an der ein untergeordnetes Element schwerer wirkt als die H1 darüber.
- Farbe/Fläche: Durchgehend Weiß. Farbe nur im grünen Fortschrittsbalken und im Header-CTA. Keine dunkle Sektion auf der ganzen Seite außer dem Footer.
- Abstände/Rhythmus: Header zu H1 ca. 80 px, H1 zu Lead ca. 35 px, Lead zu Fortschrittsbalken ca. 65 px, Balken zur Frage ca. 45 px. Deutlich dichter gestapelt als die Foto-Heros — der Kopf ist Funktionsfläche, kein Auftritt.
- Mobil: Gleiche zentrierte Ordnung. H1 bricht auf zwei Zeilen, der Lead auf sechs Zeilen. Der Fortschrittsbalken läuft über die volle Viewportbreite mit ca. 20 px Rand. Die Frage bricht auf vier Zeilen. Der Burger bleibt erhalten (`partnerbetrieb-werden-mobile-00-fold.png`).
- Pattern: `P-CONTACT`

### 43 — Slider-Frage mit schwarzem Pill-Button [partnerbetrieb-werden-desktop-00-fold.png | partnerbetrieb-werden-mobile-00-fold.png]
- Anordnung: Unter der Frage eine linksbündige Label-Zeile mit einem eingerahmten Wertfeld daneben, darunter über die volle Inhaltsbreite ein horizontaler Wertschieber. Unter dem Schieber links und rechts je ein Endwert-Label, mittig unter dem Griff eine dunkle Werteblase. Darunter zentriert der Weiter-Button. Kein Kachelraster wie in Sektion 06 oder 33 — dieser Funnel arbeitet mit einem Schieber statt mit Auswahlkacheln.
- Buttons/Komponenten: Der Weiter-Button bricht das Button-System der Site: schwarze Füllung statt `#F4C23C`, weißes Label statt schwarzem, und vollständig abgerundete Pille (Radius ca. 21 px bei ca. 42 px Höhe, ca. 400 × 47 px) statt des sonst durchgehenden 6-px-Rechtecks. Damit ist dies die einzige Pille der ganzen Site und der einzige schwarze Button — im Querschnitt oben steht „Keine Pille", das gilt nach dieser Seite nur noch mit Ausnahme. Der Pfeil rechts bleibt erhalten. Schieber: dünne Spur ca. 3 px, gefüllter Teil Schwarz, ungefüllter Teil Hellgrau, runder schwarzer Griff ca. 15 px ohne Rand und ohne Schatten. Werteblase als schwarzes Rechteck Radius ca. 4 px, ca. 104 × 32 px, weiße Schrift, folgt dem Griff. Wertfeld als weißes Rechteck mit dünnem schwarzem 1-px-Rand, Radius ca. 4 px, ca. 120 × 38 px.
- Typo: Label „Meine Antwort" ca. 15 px Grau, Wert im Feld ca. 16 px Schwarz, Endwert-Labels ca. 14 px Grau, Werteblase ca. 14 px Weiß fett, Button-Label ca. 16 px Weiß.
- Farbe/Fläche: Weiß mit rein schwarzen Bedienelementen. Auffällig: In dieser Sektion kommt der gelbe Akzent gar nicht vor — Schieber, Blase und Button sind alle schwarz. Das ist die einzige Interaktionsfläche der Site ohne jeden Akzentanteil.
- Abstände/Rhythmus: Frage zu Label-Zeile ca. 45 px, Label zu Schieber ca. 20 px, Schieber zu Button ca. 70 px. Der Button steht auffällig frei, mit ca. 130 px Leerraum bis zur nächsten Sektion.
- Mobil: Identische Ordnung, alles auf Viewportbreite gestaucht. Der Button wird nicht voll breit, sondern bleibt bei ca. 330 px und bleibt zentriert. Werteblase und Endwert-Labels überlappen sich fast, weil die Spur nur ca. 330 px lang ist.
- Pattern: Kandidat: Schieber-Funnelschritt mit schwarzer Pill-Navigation

### 44 — Folgeschritt mit Feldgruppe und Zurück-Pfeil [partnerbetrieb-werden-desktop-click-y0-00-Weiter.png, partnerbetrieb-werden-desktop-click-y0-01-el2.png | partnerbetrieb-werden-mobile-click-y0-01-Weiter.png]
- Anordnung: Derselbe Kopf bleibt stehen, nur der Bereich unter dem Fortschrittsbalken tauscht. Statt des Schiebers erscheint eine zentrierte Feldgruppe auf ca. 780 px Breite: ein volles Feld, darunter ein zweites volles Feld, darunter eine Zweierreihe aus schmalem und breitem Feld. Darunter mittig wieder der Weiter-Button, links daneben ein Zurück-Pfeil.
- Buttons/Komponenten: Formularfelder als weiße Rechtecke mit dünnem grauem 1-px-Rand, Radius ca. 4 px, Höhe ca. 46 px, Placeholder in hellem Grau — höher als die Felder auf `/kontakt` (dort ca. 42 px) und ohne Labels darüber, der Placeholder trägt allein. Das fokussierte erste Feld hat einen sichtbar dunkleren, ca. 2 px starken schwarzen Rand statt des grauen (`partnerbetrieb-werden-desktop-click-y0-00-Weiter.png`) — der einzige belegte Fokuszustand der ganzen Site. Zurück-Navigation als reiner schwarzer Pfeil nach links ohne Fläche, ohne Rahmen, ohne Label, ca. 24 px, ca. 40 px links neben dem Pill-Button. Erster und einziger Icon-only-Button der Site.
- Typo: Frage ca. 24 px Schwarz fett, Placeholder ca. 16 px Hellgrau. Keine Feldlabels, kein Pflicht-Sternchen — anders als das Kontaktformular in Sektion 36.
- Farbe/Fläche: Weiß. Die einzigen dunklen Elemente sind der fokussierte Feldrand, der Pfeil und der Pill-Button.
- Abstände/Rhythmus: Frage zum ersten Feld ca. 55 px, Feldabstand ca. 22 px, Zweierreihe mit ca. 25 px Spalte, letztes Feld zum Button ca. 65 px.
- Mobil: Felder stapeln auf volle Breite, die Zweierreihe bleibt als Zweierreihe erhalten und stapelt nicht — anders als Vorname/Nachname auf `/kontakt`.
- Pattern: `P-CONTACT`

### 45 — Drei Argumentspalten [partnerbetrieb-werden-desktop-00-fold.png, partnerbetrieb-werden-desktop-02-y501.png | -]
- Anordnung: Weiße Sektion unter dem Funnel. Drei gleich breite Spalten (je ca. 360 px) über die volle Inhaltsbreite, Abstand ca. 40 px, alles linksbündig. Pro Spalte nur Überschrift und Fließtext, keine Icons, keine Rahmen, keine Trennlinien — dieselbe offene Typo-Spalten-Mechanik wie Sektion 04, hier aber ohne übergeordnete H2 darüber. Die Sektion beginnt direkt mit den Spaltenköpfen.
- Buttons/Komponenten: Keine.
- Typo: Spaltenüberschriften ca. 18 px Schwarz Regular, Fließtext ca. 15 px in mittlerem Grau über vier bis fünf Zeilen. Nur zwei Stufen. Die Spalten sind unterschiedlich lang und werden nicht auf gleiche Höhe gebracht.
- Farbe/Fläche: Reines Weiß, kein Akzent, keine Fläche — der Block wirkt wie eine Fußnote zum Funnel, nicht wie eine eigene Sektion.
- Abstände/Rhythmus: Vom Button darüber ca. 160 px, Kopf zu Text ca. 22 px, bis zum Footer ca. 145 px.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: Kandidat: Offene Drei-Spalten-Typo statt Icon-Karten

### 46 — Footer [partnerbetrieb-werden-desktop-02-y501.png | -]
- Identisch zu Sektion 15, inklusive Wortmarke, Siegelreihe, „Wir suchen"-Badge, Claim links und Copyright rechts in der Fußzeile. Kein Schluss-CTA davor — wie `/kontakt` endet die Seite direkt nach der Inhaltssektion.
- Die Seite ist mit ca. 2100 px nach `/kontakt` die zweitkürzeste der Site.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /presse

### 47 — Textkopf ohne Foto-Hero [presse-desktop-00-fold.png | presse-mobile-00-fold.png]
- Anordnung: Wie Sektion 38 aufgebaut. Weiße Fläche direkt unter dem deckenden Header, linksbündige H1 bei x=140, darunter eine einzelne Lead-Zeile, rechts daneben die volle Breite leer. Kein Bild, kein Overlay, kein CTA.
- Buttons/Komponenten: Keine. Der Header-CTA ist im Fold bereits gelb gefüllt (`presse-desktop-00-fold.png`), weil kein Foto-Hero darunter liegt.
- Typo: H1 einzeilig ca. 34 px Schwarz Regular ohne zweite Farbzeile, Lead ca. 18 px Grau einzeilig. Identische Größenstaffelung wie auf `/karriere`.
- Farbe/Fläche: Reines Weiß.
- Abstände/Rhythmus: Header zu H1 ca. 170 px, H1 zu Lead ca. 30 px, Lead zur ersten Kartenreihe ca. 95 px — pixelgleich zu Sektion 38.
- Mobil: Gleiche Ordnung, H1 auf ca. 26 px, Lead auf zwei Zeilen. Die erste Karte beginnt bei ca. y=352 und ist im Fold schon mit Bild und Titel sichtbar (`presse-mobile-00-fold.png`).
- Pattern: Kandidat: Weißer Typo-Seitenkopf ohne Hero-Bild

### 48 — News-Karten-Raster [presse-desktop-00-fold.png, presse-desktop-02-y750.png | presse-mobile-00-fold.png]
- Anordnung: Weiße Sektion, striktes Drei-Spalten-Raster über mehrere Reihen (im Shot mindestens vier). Jede Karte folgt derselben vertikalen Ordnung: Vollbreites Bild oben ohne Rand, darunter Titel, Beschreibung, Freiraumpuffer, ganz unten der Button. Wie in Sektion 39 richtet der Puffer die Buttons einer Reihe auf gleiche Grundlinie aus, obwohl die Titel ein bis drei Zeilen lang sind.
- Buttons/Komponenten: Gerahmte Karte mit dünnem hellgrauem 1-px-Rand, Radius ca. 6 px, weiße Füllung, kein Schatten, ca. 360 × 530 px. Das Bild sitzt bündig in der oberen Kartenhälfte, ca. 360 × 200 px, Radius 0 oben und schneidet den Kartenradius nicht mit — die Bildecken bleiben eckig, die Kartenecken sind gerundet. Pro Karte ein gefüllter gelber Button `#F4C23C`, ca. 138 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil. Kein Datum, kein Kategorie-Chip, kein Autor — die Karte trägt nur Bild, Titel, Text, Button.
- Typo: Titel ca. 19 px Schwarz Regular über ein bis drei Zeilen, deutlich größer als der Kartentitel im Job-Raster (dort ca. 17 px). Beschreibung ca. 15 px Grau über zwei bis vier Zeilen. Nur zwei Stufen.
- Farbe/Fläche: Weiß auf Weiß mit 1-px-Rand. Die Bilder sind erkennbar echte Firmenfotos in kräftigen Eigenfarben, ohne einheitlichen Filter — dieselbe Bildhaltung wie beim Testimonial-Carousel in Sektion 07. Sie tragen die gesamte Farbigkeit der Seite.
- Abstände/Rhythmus: Spaltenabstand ca. 40 px, Reihenabstand ca. 80 px. Innerhalb der Karte: Bild zu Titel ca. 42 px, Titel zu Text ca. 20 px, Innenabstand seitlich ca. 25 px.
- Mobil: Karten stapeln einspaltig auf volle Breite. Das Bild wird ca. 348 × 190 px und behält das Seitenverhältnis. Titel bricht auf bis zu drei Zeilen. Der Button bleibt inhaltsbreit linksbündig, nicht voll breit.
- Pattern: `P-GALLERY`

### 49 — Presseanfrage-Band [presse-desktop-05-y2712.png | -]
- Anordnung: Wie Sektion 40. Sehr helle Fläche, alles zentriert: zweizeilige Überschrift, darunter der Button. Kein Lead, kein Bild. Höhe ca. 395 px.
- Buttons/Komponenten: Ein gefüllter gelber Button `#F4C23C`, ca. 172 × 42 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil — ebenfalls mit E-Mail-Adresse als Label, wie auf `/karriere`. Damit ist das Adress-Label kein Einzelfall, sondern ein wiederkehrendes Muster auf den Nebenseiten.
- Typo: Überschrift zweizeilig zentriert ca. 30 px Regular, Zeile 1 Schwarz, Zeile 2 Grau `#B2B2B2` — Hell-Variante der Headline-Mechanik.
- Farbe/Fläche: Sehr helle, minimal von Weiß abgesetzte Fläche mit sichtbarer Kante gegen das weiße Karten-Raster darüber (`presse-desktop-05-y2712.png`, Kante bei ca. y=240). Wie `/karriere` kommt auch `/presse` ohne schwarze Sektion aus.
- Abstände/Rhythmus: Sektions-Padding oben ca. 140 px, Headline zu Button ca. 60 px, Button bis Sektionsende ca. 150 px — deckungsgleich mit Sektion 40.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: `P-CTA-END`

### 50 — Footer [presse-desktop-05-y2712.png | -]
- Identisch zu Sektion 15. Kein Schluss-CTA davor, weil Sektion 49 diese Rolle übernimmt.
- Pattern: Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /weiterempfehlen

### 51 — Hero mit gefülltem Header-CTA [weiterempfehlen-desktop-00-fold.png | weiterempfehlen-mobile-00-fold.png]
- Anordnung: Wie Sektion 03/16/23 — vollflächiges Foto (Person am Elektroauto vor einem Haus mit PV), Textspalte linksbündig bei x=140, vertikal mittig, Motiv rechts. Der Text steht auf ca. 570 px Breite.
- Buttons/Komponenten: Ein gefüllter gelber CTA `#F4C23C`, ca. 205 × 46 px, Rechteck Radius ca. 6 px, schwarzes Label plus Pfeil. Abweichung zum Bestand: Der Header-CTA ist hier trotz Foto-Hero bereits gelb gefüllt statt Outline (`weiterempfehlen-desktop-00-fold.png`) — die einzige geprüfte Seite, auf der der Header-CTA über einem Foto nicht als Outline ausgeführt ist. Der Header ist zudem nicht ganz transparent, sondern liegt als leicht aufgehellter Schleier über dem Motiv. Keine Siegel-Kacheln im Hero.
- Typo: H1 zweizeilig ca. 40 px Weiß Regular, darunter ein dreizeiliger Lead ca. 16 px in leicht reduziertem Weiß. Beide Zeilen der H1 bleiben weiß — Foto-Regel des Headline-Systems wird eingehalten. Der aktive Navigationslink „Freunde empfehlen" steht ausgegraut (`weiterempfehlen-desktop-00-fold.png`), wie auf `/erfahrungen`.
- Farbe/Fläche: Warmes Foto, links spürbar abgedunkelt für die Lesbarkeit, rechts hell belassen. Akzent nur im Hero-CTA und im Header-CTA — zwei gelbe Flächen im Fold, sonst nirgends auf der Site.
- Abstände/Rhythmus: Header zu H1 ca. 175 px, H1 zu Lead ca. 40 px, Lead zu CTA ca. 45 px. Der Fold läuft über ca. 910 px, das Motiv setzt sich unter dem Fold noch ca. 600 px fort (`weiterempfehlen-desktop-02-y750.png`) — das längste Hero-Bild der Site.
- Mobil: Nicht separat geprüft im Detail; der Fold-Shot liegt vor, wurde aber nicht ausgewertet.
- Pattern: `P-HERO-PHOTO`

### 52 — Drei Vorteilsspalten mit Bildabschluss [weiterempfehlen-desktop-02-y750.png | -]
- Anordnung: Weiße Sektion. Links oben eine einzeilige H2 über ca. 30 % Breite, darunter mit deutlichem Abstand ein Drei-Spalten-Raster über die volle Inhaltsbreite, Spalten je ca. 355 px, Abstand ca. 40 px, alles linksbündig, keine Karten, keine Icons, keine Trennlinien. Darunter über ca. 80 % Breite ein einzelnes breites Foto (Gruppe am Gartentisch) als Sektionsabschluss.
- Buttons/Komponenten: Keine. Das Foto hat Radius 0 und keinen Rahmen, wie die Bildfläche in Sektion 18.
- Typo: H2 einzeilig ca. 30 px Schwarz Regular ohne zweite Farbzeile — anders als Sektion 04, die dieselbe Spaltenmechanik mit zweizeiliger H2 fährt. Spaltenüberschriften ca. 18 px Schwarz, Fließtext ca. 15 px Grau über drei Zeilen.
- Farbe/Fläche: Reines Weiß, kein Akzent. Die Farbe kommt allein aus dem Abschlussfoto.
- Abstände/Rhythmus: Sektions-Padding oben ca. 145 px, H2 zu Spalten ca. 50 px, Kopf zu Text ca. 22 px, Spalten zum Foto ca. 90 px.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: Kandidat: Offene Drei-Spalten-Typo statt Icon-Karten

### 53 — Nummerierte Schrittfolge „So funktioniert's" [weiterempfehlen-desktop-04-y2250.png | -]
- Anordnung: Schwarze Sektion. Zentrierte einzeilige H2, darunter ein Drei-Spalten-Raster über die volle Inhaltsbreite, aber linksbündig statt zentriert. Jede Spalte beginnt mit einer Nummernscheibe, darunter Titel, darunter Fließtext. Die Spalten sind unterschiedlich lang und werden nicht ausgeglichen.
- Buttons/Komponenten: Drei Nummernscheiben als weiß gefüllte Kreise ca. 32 px mit schwarzer Ziffer — die einzige Nummerierung der ganzen Site. Kein Verbindungsstrich zwischen den Schritten, keine Pfeile, keine Karten. Sonst keine Komponenten.
- Typo: H2 einzeilig zentriert ca. 30 px Weiß Regular, hier ohne gelbe zweite Zeile, obwohl die Fläche schwarz ist — Ausnahme zur Headline-Mechanik, wie schon in Sektion 24. Schritttitel ca. 18 px Weiß, Fließtext ca. 15 px in gedämpftem Weiß über drei bis fünf Zeilen. Ziffer ca. 14 px Schwarz.
- Farbe/Fläche: Schwarz. Kein Akzent — die weißen Kreise tragen die Gliederung allein.
- Abstände/Rhythmus: Sektions-Padding oben ca. 145 px, H2 zu Nummernreihe ca. 90 px, Scheibe zu Titel ca. 30 px, Titel zu Text ca. 20 px, Spalten zur Formularkarte darunter ca. 90 px.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: Kandidat: Nummernscheiben-Schrittfolge ohne Verbindungslinie

### 54 — Weiße Formularkarte auf Schwarz [weiterempfehlen-desktop-04-y2250.png, weiterempfehlen-desktop-05-y3000.png | -]
- Anordnung: Auf der schwarzen Fläche liegt eine weiße Karte über die volle Inhaltsbreite (ca. 1160 px), Höhe ca. 345 px, als Insel — Aufbau wie Sektion 25, aber zweispaltig statt zentriert. Links ca. 40 %: zweizeilige Aufforderung und darunter ein kleiner Erklärtext. Rechts ca. 45 %: Formular aus einer Zweierreihe (Vorname, Nachname), darunter ein volles Feld (E-Mail), darunter der Submit-Button, darunter eine Checkbox mit langem Kleintext.
- Buttons/Komponenten: Formularfelder als graue Vollflächen ohne Rand, Radius ca. 6 px, Höhe ca. 50 px — das dritte und abweichendste Feldmuster der Site: `/kontakt` nutzt weiße Felder mit grauem Rand (ca. 42 px), `/partnerbetrieb-werden` weiße Felder mit grauem Rand (ca. 46 px), hier randlose graue Flächen. Submit als gefüllter gelber Button `#F4C23C`, ca. 260 × 45 px, Radius ca. 6 px, schwarzes Label, mit auffällig langem, dünnem Pfeil rechts statt des sonst kurzen Pfeils. Checkbox als leeres Quadrat ca. 18 px mit dünnem schwarzem Rand, Radius ca. 3 px — die einzige Checkbox der Site.
- Typo: Aufforderung links ca. 19 px Schwarz Regular, zweizeilig. Erklärtext ca. 15 px Grau, dreizeilig. Placeholder ca. 15 px Grau, keine Feldlabels, kein Pflicht-Sternchen. Der Checkbox-Text ist mit ca. 9 px die kleinste Schrift der ganzen Site — am Desktop-Shot gerade noch lesbar, im Detail nicht sicher entzifferbar.
- Farbe/Fläche: Weiße Karte auf Schwarz, graue Felder als dritte Helligkeitsstufe. Der gelbe Button ist der einzige Akzent.
- Abstände/Rhythmus: Karteninnenabstand ca. 40 px oben und seitlich ca. 40 px, Feldabstand ca. 26 px, Feld zu Button ca. 22 px, Button zu Checkbox ca. 30 px.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: `P-CONTACT`

### 55 — Zustände (Fehler) der Formularkarte [weiterempfehlen-desktop-click-y2250-00-Empfehlungscode_erhalten.png | -]
- Anordnung: Identisch zu Sektion 54, nur wächst die Karte auf ca. 465 px Höhe, weil unter jedem Feld eine Fehlerzeile aufklappt und die Elemente darunter nach unten schiebt.
- Buttons/Komponenten: Jedes Feld bekommt einen dünnen roten 1-px-Rand und darunter eine angehängte hellrosa Fehlerfläche, die zur Feldform gehört (gleiche Breite, unten gerundet) — der Fehler ist kein freistehender Text, sondern eine Erweiterung des Feldes. In der Fehlerfläche links ein rotes Kreuz ca. 12 px, daneben die Meldung. Der Submit-Button erhält zusätzlich einen dünnen schwarzen Rand und links im Label ein schwarzes Kreuz vor dem Text — der Button meldet den Fehler also selbst mit, nicht nur die Felder. Die Checkbox bleibt unmarkiert und ohne Fehlerfläche, obwohl sie unausgefüllt ist.
- Typo: Fehlermeldungen ca. 14 px in Rot, ein bis zwei Zeilen. Damit ist Rot hier erstmals als Systemfarbe eingesetzt, nicht nur als Pflicht-Sternchen wie in Sektion 36.
- Farbe/Fläche: Weiße Karte, rote Ränder, hellrosa Fehlerflächen. Der einzige belegte Fehlerzustand der Site.
- Abstände/Rhythmus: Fehlerfläche ca. 46 px hoch, direkt am Feld ohne Zwischenraum.
- Mobil: Nicht geprüft — der Klick-Shot `weiterempfehlen-mobile-click-y2110-00-Empfehlungscode_erhalten.png` liegt vor, wurde aber nicht ausgewertet.
- Pattern: Kandidat: Fehlerfläche als angehängte Feldverlängerung

### 56 — FAQ-Akkordeon [weiterempfehlen-desktop-05-y3000.png, weiterempfehlen-desktop-06-y3750.png | -]
- Anordnung: Schwarze Sektion, zweispaltig asymmetrisch. Links ca. 30 % nur die H2, rechts ca. 55 % eine Liste aus vier Zeilen. Die H2 steht auf Höhe der ersten Zeile und läuft nicht mit — die linke Spalte bleibt darunter komplett leer. Jede Zeile trägt links die Frage, ganz rechts ein Plus-Zeichen, darüber eine feine Trennlinie über die volle Spaltenbreite. Alle vier Zeilen sind im Shot geschlossen, ein geöffneter Zustand ist nicht belegt.
- Buttons/Komponenten: Erstes und einziges Akkordeon der Site. Kein Chevron, sondern ein dünnes Plus-Zeichen ca. 18 px in Weiß. Kein Rahmen, keine Karte, keine Füllung — nur die 1-px-Trennlinie in gedämpftem Weiß über jeder Zeile, keine Linie unter der letzten Zeile.
- Typo: H2 einzeilig ca. 30 px Weiß Regular, wieder ohne gelbe zweite Zeile. Fragen ca. 17 px Weiß Regular, einzeilig.
- Farbe/Fläche: Schwarz, kein Akzent. Das Plus ist weiß, nicht gelb — die Site setzt den Akzent auch hier nicht auf Bedienelemente, sondern nur auf Buttons.
- Abstände/Rhythmus: Zeilenhöhe ca. 61 px, dadurch großzügige Klickflächen. Sektions-Padding oben ca. 200 px, unten ca. 190 px bis zum Schluss-CTA.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: Kandidat: Linienloses Plus-Akkordeon auf Schwarz

### 57 — Schluss-CTA und Footer [weiterempfehlen-desktop-06-y3750.png | -]
- Wie Sektion 14 und 15. Zweizeilige zentrierte Überschrift, Zeile 1 Weiß, Zeile 2 Gelb `#F4C23C`, darunter ein gefüllter gelber CTA ca. 205 × 46 px. Danach der unveränderte Footer inklusive Wortmarke, Siegelreihe und „Wir suchen"-Badge.
- Anders als bei Sektion 14 sitzt der Schluss-CTA hier ohne eigene Flächentrennung direkt an der FAQ-Sektion — beide teilen dieselbe schwarze Fläche, es gibt keine sichtbare Kante dazwischen.
- Pattern: `P-CTA-END` und Kandidat: Viewportbreite Wortmarke als Seitenabschluss

## Seite: /news/neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich

Beispiel-Detailseite für den News-Typ, der in Sektion 48 als Raster verlinkt ist.

### 58 — Artikelkopf ohne Hero [news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-00-fold.png | news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-mobile-00-fold.png]
- Anordnung: Der Artikel beginnt unmittelbar unter dem Header, ohne Abstand und ohne Hero-Fläche — die H1 sitzt bereits bei ca. y=165 und wird am Desktop von der Header-Unterkante fast berührt. Der ganze Artikel läuft in einer einzigen Spalte von ca. 760 px Breite, linksbündig bei x=340 und damit ungefähr mittig im Viewport, aber nicht auf der Mittelachse zentriert: rechts bleiben ca. 340 px, links ca. 340 px. Kein Datum, kein Autor, kein Kategorie-Chip, kein Zurück-Link, keine Breadcrumb.
- Buttons/Komponenten: Keine im Artikelbereich. Kein Teilen-Element, kein Inhaltsverzeichnis. Der Header trägt die volle Navigation mit gefülltem gelbem CTA.
- Typo: H1 zweizeilig ca. 38 px Schwarz Regular, ohne zweite Farbzeile — die größte Schwarz-Headline der Site. Darunter ein Lead ca. 18 px in mittlerem Grau, einzeilig. Fließtext ca. 16 px Schwarz mit weiter Zeilenhöhe (ca. 25 px), Absätze durch Leerraum getrennt, keine Einzüge, keine Zwischenüberschriften im ganzen Artikel. Das Zitat im Text steht in normalen Anführungszeichen im laufenden Absatz statt als abgesetztes Blockquote (`news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-02-y750.png`) — es gibt kein eigenes Zitat-Bauteil.
- Farbe/Fläche: Reines Weiß über die ganze Artikelstrecke. Kein Akzent außerhalb des Header-CTA, keine farbige Fläche, keine Trennlinien.
- Abstände/Rhythmus: H1 zu Lead ca. 30 px, Lead zum Beitragsbild ca. 55 px, Bild zum ersten Absatz ca. 30 px, Absatzabstand ca. 20 px. Sehr gleichmäßig, ohne Rhythmuswechsel.
- Mobil: Die H1 wird oben durch den Header angeschnitten (`news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-mobile-00-fold.png`, die erste Zeile ist nur zur Hälfte sichtbar) — sichtbarer Abstandsfehler, kein Gestaltungsmittel. H1 auf ca. 26 px dreizeilig, Lead auf zwei Zeilen. Der Artikel läuft auf volle Viewportbreite mit ca. 20 px Rand.
- Pattern: Kandidat: Einspaltiger Artikel ohne Meta-Leiste

### 59 — Beitragsbild [news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-00-fold.png | news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-mobile-00-fold.png]
- Anordnung: Ein einzelnes Bild in der Textspaltenbreite (ca. 760 × 425 px), nicht randlos und nicht breiter als der Text — anders als das randlose Video in Sektion 27 und die 80-%-Bildflächen in Sektion 18 und 52. Es steht zwischen Lead und erstem Absatz und ist das einzige Bild im Artikel.
- Buttons/Komponenten: Keine. Kein Rahmen, kein Schatten, Radius 0, keine Bildunterschrift.
- Typo: Keine.
- Farbe/Fläche: Weiß drumherum; das Foto ist der einzige Farbträger der Seite.
- Abstände/Rhythmus: Seitenverhältnis ca. 16:9. Oberhalb ca. 55 px, unterhalb ca. 30 px — bewusst enger an den Folgetext gesetzt als an den Lead darüber.
- Mobil: Bild auf ca. 348 × 195 px, Verhältnis bleibt erhalten, Radius weiterhin 0.
- Pattern: `P-GALLERY`

### 60 — Ähnliche Beiträge (zweispaltiges News-Raster) [news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-02-y750.png | -]
- Anordnung: Weiße Sektion nach dem Artikeltext. Zentrierte einzeilige H2, darunter ein Zwei-Spalten-Raster in der Artikelbreite (ca. 760 px), Karten je ca. 360 px breit, mindestens zwei Reihen. Dieselben Karten wie in Sektion 48, aber im Zweier- statt im Dreierraster — die Karte bleibt gleich breit, das Raster wird schmaler.
- Buttons/Komponenten: Gerahmte Karte mit dünnem hellgrauem 1-px-Rand, Radius ca. 6 px, weiße Füllung, kein Schatten. Bild oben ca. 360 × 200 px, Radius 0. Pro Karte ein gefüllter gelber Button `#F4C23C`, ca. 138 × 42 px. Identisch zu Sektion 48 inklusive Grundlinien-Ausrichtung der Buttons innerhalb einer Reihe.
- Typo: H2 einzeilig zentriert ca. 30 px Schwarz Regular ohne zweite Farbzeile. Kartentitel ca. 19 px Schwarz über ein bis drei Zeilen, Beschreibung ca. 15 px Grau.
- Farbe/Fläche: Weiß, Farbe nur aus den Kartenbildern und den gelben Buttons.
- Abstände/Rhythmus: Artikelende zur H2 ca. 125 px, H2 zur ersten Kartenreihe ca. 65 px, Spaltenabstand ca. 40 px, Reihenabstand ca. 80 px.
- Mobil: Nicht geprüft — im Mobil-Slice-Satz nicht eindeutig isoliert.
- Pattern: `P-GALLERY`

### 61 — Schluss-CTA und Footer [news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-05-y2794.png | -]
- Wie Sektion 14 und 15. Schwarze Fläche, zweizeilige zentrierte Überschrift, Zeile 1 Weiß, Zeile 2 Gelb `#F4C23C`, darunter ein gefüllter gelber CTA ca. 240 × 46 px. Danach der unveränderte Footer.
- Bemerkenswert: Der Schluss-CTA trägt hier dasselbe Label wie der Header-CTA, wodurch zwei formgleiche gelbe Buttons mit identischem Text im selben Viewport stehen (`news__neue-finanzierung-macht-pv-anlagen-ab-58-euro-moglich-desktop-05-y2794.png`).
- Pattern: `P-CTA-END` und Kandidat: Viewportbreite Wortmarke als Seitenabschluss
