# AlpenEnergie — Sektions-Atlas (Design)
Quelle: shots/ 1440 + 390, Stand 31.08.2026. Nur Sichtbares. Fokus Design, nicht Inhalt.

Routen im Shot-Satz: `/`, `/produkte/solarmodul`, `/referenzen`, `/ueber-uns`, `/anfrage`.
Kein `manifest.json` im Ordner vorhanden (`ls` zeigt nur PNG) — Basis-URL und Routen sind
aus den Dateinamen abgeleitet, nicht aus einem Manifest belegt.

Farbwerte unten sind Schätzungen aus dem Augenschein der PNG, sofern nicht ausdrücklich
als Messung gekennzeichnet. Die Leitfarbe ist ein sattes Signalrot (Bereich `#e93323`,
Wert aus `alpen-energie.md` §2, hier nicht neu gemessen), die zweite Grundfläche ist ein
kühles Schiefer-Blaugrau als Verlaufsband.

Zwei globale Overlays liegen in praktisch jedem Shot:
- Ein rundes **Chat-Widget** unten rechts, dunkelgrüner Kreis (ca. 56 px) mit weißem
  Sprechblasen-Icon. Kein Sektionselement, unten nur erwähnt, wo es etwas verdeckt.
- Ein **Marquee-Band** ganz oben (rot, laufende Textschleife) — es ist Teil des Headers
  und wird dort beschrieben.
Ein Cookie-Overlay ist in keinem gelesenen Shot sichtbar.

## Seite: /

### 01 — Aktions-Marquee über dem Header [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollbreites Band ganz oben, randlos über die gesamten 1440 px, Höhe ca. 42 px.
  Der Text läuft als horizontale Endlosschleife — sichtbar daran, dass die Kopie links
  angeschnitten beginnt („ser Lager zieht um!") und rechts wieder angeschnitten endet
  („Rabatt"). Drei Wiederholungen der gleichen Zeile passen nebeneinander, in ca. 490 px
  Rhythmus.
- Buttons/Komponenten: keine. Reines Textband, kein Schließen-Kreuz, kein Icon.
- Typo: einzeilig, ca. 14 px, Grotesk. Innerhalb der Zeile ein Weight-Wechsel: der erste
  Teil Regular, der Nutzenteil („Rabatt auf Komponente") Semibold — der einzige
  Hierarchie-Träger in diesem Band. Weiß auf Rot, keine Caps, kein Letterspacing.
- Farbe/Fläche: Vollflächig in der Akzentfarbe. Es ist die einzige Stelle der Startseite,
  an der Rot als Vollfläche über die ganze Breite läuft (die Schluss-CTA-Sektion arbeitet
  stattdessen mit Foto). Das Band scrollt mit weg: in `home-desktop-02-y750.png` ist es
  nicht mehr da, nur die weiße Header-Leiste bleibt.
- Abstände/Rhythmus: Text vertikal zentriert, sonst keine Innenabstände.
- Mobil: identisch aufgebaut (`home-mobile-00-fold.png`), Band ca. 34 px hoch, Textgröße
  gleich, damit passt nur noch gut eine Kopie in die Breite und der Anschnitt ist auf
  beiden Seiten stärker.
- Pattern: Kandidat: Laufband-Aktionsleiste über dem Header

### 02 — Header / Navigationsleiste [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Eine Zeile, sehr breit ausgereizt — Logo links bei ca. 60 px, Nav-Gruppe
  rechts der Mitte (ab ca. 517 px), dann direkt anschließend das Button-Paar bis ca.
  1380 px. Links vom Logo und rechts vom CTA je ca. 60 px Rand, der Container läuft also
  fast randlos. Im Fold liegt die Leiste **transparent über dem Hero-Foto** (keine
  Fläche, weiße Schrift). Beim Scrollen wechselt sie in einen weißen Sticky-Zustand:
  `home-desktop-02-y750.png` bis `home-desktop-15-y10312.png` zeigen dieselbe Leiste mit
  weißer Fläche, dunkler Schrift und einer 1 px hellgrauen Unterkante über die volle
  Breite. Der Zustandswechsel transparent → weiß ist damit belegt, kein Hover-Shot nötig.
- Buttons/Komponenten: Genau zwei Buttons, direkt nebeneinander, gleiche Höhe (ca. 36 px,
  geschätzt), beide leicht gerundet — kein Vollpillen-Radius, sondern ca. 8 px Radius,
  also eher „Softbutton" als Pille (deckt sich mit dem in `alpen-energie.md` §2
  notierten `8px`-Knopf-Radius). Links „Support": helle Füllung (im Fold ein
  halbtransparentes Weiß über dem Foto, im gescrollten Zustand hellgrau `#f2f2f2`,
  geschätzt) mit dunklem Semibold-Label, kein Icon. Rechts „Jetzt Offerte sichern":
  gefüllt in der Akzentfarbe Rot mit weißem Semibold-Label, kein Icon, kein Chevron.
  Der Größenunterschied ist minimal — beide Buttons wirken gleichwertig, der Rang wird
  allein über die Farbe gesetzt. In der Nav trägt genau ein Punkt („Photovoltaik") einen
  kleinen Chevron nach unten als Dropdown-Marker; das aufgeklappte Menü ist in keinem
  Shot zu sehen (nicht belegt).
- Typo: Nav-Labels Grotesk (Poppins-Anmutung), Regular, ca. 15 px, gemischte Schreibweise,
  kein Letterspacing. Button-Labels eine Stufe fetter (Semibold), gleiche Größe. Die
  Wortmarke „AlpenEnergie" setzt „Alpen" Semibold und „Energie" leichter — ein
  Weight-Split innerhalb des Logos, davor ein Rautenkreuz-Signet aus vier roten
  Elementen, das auf der ganzen Seite als Eyebrow-Marker wiederkehrt.
- Farbe/Fläche: Im Fold weiß auf Foto, gescrollt dunkel auf Weiß. Der Akzent sitzt in
  genau einem Element (dem CTA) plus im Logo-Signet.
- Abstände/Rhythmus: Leistenhöhe ca. 60 px, zwischen den Nav-Labels ca. 30 px, zwischen
  den beiden Buttons ca. 12 px. Die Lücke zwischen Logo und Nav-Block ist mit ca. 260 px
  die größte Leerstelle der Leiste.
- Mobil: radikal reduziert (`home-mobile-00-fold.png`). Nur Logo links und ein
  Burger-Icon (drei Striche) rechts. Beide Buttons fallen ersatzlos weg; der einzige CTA
  bleibt im Hero. Leistenhöhe ca. 46 px, Leiste ebenfalls transparent über dem Foto.
- Pattern: Kandidat: Transparent-zu-Weiß-Sticky mit Zweier-Buttonpaar

### 03 — Hero, Foto mit Text links [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Vollbreites Foto (Abenddämmerung, zwei Mitarbeiter freigestellt rechts,
  Haus mit Garage und E-Auto links), Textblock linksbündig ab ca. 60 px in einer auf
  ca. 780 px begrenzten Spalte. Die beiden Personen stehen rechts und überlappen die
  Fotomitte — Text und Personen teilen sich die Fläche ohne Kollision, weil der Text
  vor der dunklen Hausfassade sitzt. Der Hero ist unten hart geschnitten (Kante bei ca.
  672 px), darunter beginnt Weiß. Kein abgerundeter Hero, keine Welle.
- Buttons/Komponenten: CTA-Paar nebeneinander, beide ca. 40 px hoch, Radius ca. 8 px.
  Primär „Jetzt Ersparnis berechnen" rot gefüllt, weißes Semibold-Label. Sekundär
  „Erklärvideo ansehen" hell gefüllt (fast weiß, leicht transparent über dem Foto) mit
  dunklem Label — wieder keine Outline-Variante, sondern helle Füllung. Kein Icon auf
  beiden, obwohl das zweite ein Video meint. Eyebrow ist **keine Pille**, sondern das rote
  Rautenkreuz-Signet plus Caps-Text direkt daneben — das ist die konsistente Eyebrow-Form
  der ganzen Seite. Rechts unten im Foto liegt eine Partnerlogo-Reihe (Swissolar,
  Ecoflow, SwissWatt One Platin Partner) als weiße/graue Bildmarken direkt auf dem Foto,
  ohne Kasten oder Leiste darunter.
- Typo: Vierstufig. Eyebrow Caps, ca. 14 px, moderates Letterspacing, weiß. H1 sehr groß
  (ca. 52 px), Grotesk, Bold, zwei Zeilen, weiß, eng gesetzter Zeilenabstand. Lead
  darunter ca. 16 px Regular in gebrochenem Weiß, über zwei Zeilen bis ca. 825 px Breite.
  Verhältnis H1 zu Lead grob 3,2:1 (geschätzt). Keine Serif.
- Farbe/Fläche: Dunkel — die einzige große dunkle Fläche im oberen Seitendrittel. Das
  Foto trägt selbst eine dunkle Dämmerungsstimmung, zusätzlich liegt links eine sanfte
  Abdunkelung für die Textlesbarkeit (Zonenverlauf, kein Farbschleier — das Motiv bleibt
  farbecht). Der Akzent sitzt in genau zwei Punkten: Eyebrow-Signet und Primär-CTA.
- Abstände/Rhythmus: Ca. 130 px vom Header-Unterkante bis zur Eyebrow, ca. 45 px von der
  Lead-Zeile bis zum CTA-Paar, ca. 16 px zwischen den beiden Buttons. Unter dem CTA
  bleiben ca. 120 px Fotofläche, in denen rechts die Partnerlogos sitzen.
- Mobil: deutlich umgebaut (`home-mobile-00-fold.png`). Das Foto ist auf Hochformat
  beschnitten, die beiden Personen rücken nach oben und der **Text sitzt unter ihnen**
  statt daneben — aus dem Nebeneinander wird ein Übereinander. H1 bricht auf vier Zeilen
  bei ca. 30 px. Die Lead-Zeile fällt im Fold komplett weg. Das CTA-Paar **stapelt** und
  wird linksbündig, beide Buttons in Inhaltsbreite statt volle Breite. Die
  Eyebrow-Caps-Zeile wird rechts abgeschnitten („ZÜRIC"), also horizontaler Überlauf
  am Viewportrand. Partnerlogos sind im mobilen Fold nicht sichtbar.
- Pattern: `P-HERO-PHOTO` (Foto vollflächig, Text links, Zonenverlauf statt Wash) — mit
  der Abweichung, dass zwei CTA im Fold stehen, nicht einer.

### 04 — Intro mit isometrischer Haus-Grafik [home-desktop-02-y750.png | -]
- Anordnung: Zweiteilig untereinander. Oben ein linksbündiger Textkopf (H2 zweizeilig,
  Fließtext dreizeilig, Spaltenbreite ca. 740 px) — die rechte Hälfte bleibt komplett
  leer, was hier bewusst als Weißraum wirkt. Darunter, über die volle Containerbreite
  zentriert, eine große isometrische Illustration eines Einfamilienhauses mit
  Solar-Dachfläche, Wärmepumpe, Ladesäule und Auto. Vier beschriftete Label-Karten
  („Photovoltaik", „Wärmepumpe", „Speicher", „E-Mobilität") liegen **über** der
  Illustration und überlappen deren Kanten — echte Überlappung, keine Randanordnung.
- Buttons/Komponenten: Keine Buttons. Die Label-Karten sind weiße Flächen mit ca. 16 px
  Radius, sehr weichem Schatten und einem quadratischen roten Icon-Chip (ca. 40 px,
  Radius ca. 10 px) obendrauf, Beschriftung darunter zentriert. Zusätzlich liegen kleine
  runde rote Icon-Punkte (ca. 28 px) frei auf der Grafik verteilt — dieselbe Chip-Sprache
  in klein und rund. Rote dünne Linien verbinden die Punkte als Energiefluss-Pfade.
- Typo: H2 ca. 42 px Bold über zwei Zeilen, sehr dunkles Anthrazit. Fließtext ca. 16 px
  Regular in Mittelgrau. Karten-Labels ca. 15 px Regular. Verhältnis H2 zu Fließtext
  grob 2,6:1 (geschätzt).
- Farbe/Fläche: Weiß. Die Illustration ist bewusst entsättigt (Haus und Auto in Grau- und
  Anthrazitstufen), damit das Rot der Icons und Leitungen als einzige Farbe trägt. Kein
  Hell/Dunkel-Wechsel innerhalb der Sektion.
- Abstände/Rhythmus: Sehr luftig. Ca. 100 px vom Fließtext bis zum Beginn der
  Illustration, die Grafik selbst nimmt ca. 650 px Höhe ein, danach ca. 90 px Luft bis
  zur nächsten Kante.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Isometrisches System-Diagramm mit überlappenden Label-Karten

### 05 — Zahlenband auf Schiefer-Verlauf [home-desktop-03-y1500.png | -]
- Anordnung: Vollbreites Band, randlos, ca. 430 px hoch, harte Oberkante ohne Rundung.
  Zweispaltig: links ein Textblock (Eyebrow, H2, sechszeiliger Fließtext) in ca. 490 px
  Breite ab 60 px; rechts ein 2×2-Raster aus vier Kennzahlen, Spaltenstart bei ca. 660 px
  und ca. 960 px. Die Kennzahlen sind kartenlos — kein Rahmen, keine Trennlinie, nur
  Zahl über Label. Das ist der bewusste Kontrast zum karten-lastigen Rest der Seite.
- Buttons/Komponenten: keine. Der Eyebrow nutzt wieder das rote Rautenkreuz-Signet plus
  Caps-Text.
- Typo: Kennzahlen sehr groß (ca. 46 px) in Semibold-Weiß, darunter das Label ca. 15 px
  Regular in gebrochenem Weiß. H2 „Unsere Erfolge" ca. 40 px Bold weiß. Fließtext ca.
  15 px in gedämpftem Weiß, Zeilenabstand großzügig. Verhältnis Kennzahl zu Label grob
  3:1 (geschätzt).
- Farbe/Fläche: Der Hell/Dunkel-Wechsel der Seite. Fläche ist ein diagonaler Verlauf von
  hellerem Blaugrau oben rechts zu dunklerem Schiefer unten links — kein Flat-Ton,
  sondern ein sichtbarer Verlauf. Der Akzent ist hier **nur** das Eyebrow-Signet; die
  Zahlen bleiben weiß, nicht rot. Das ist zurückhaltender als üblich.
- Abstände/Rhythmus: Ca. 100 px Bandpadding oben, ca. 55 px Abstand zwischen der oberen
  und der unteren Kennzahlreihe, ca. 12 px zwischen Zahl und Label.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Dunkles Verlaufsband mit kartenlosem Kennzahlraster

### 06 — Textkolumne mit Foto rechts [home-desktop-03-y1500.png | -]
- Anordnung: Klassisches Zweispalten-Split auf hellgrauer Fläche. Links eine schmale
  Textspalte (ca. 620 px) mit Eyebrow, zweizeiliger H2, vier durch Leerzeilen getrennten
  Absatzblöcken und einem CTA am Fuß. Rechts ein hochformatiges Foto (ca. 650×660 px)
  mit ca. 15 px Radius an allen vier Ecken. Beide Spalten sind oben bündig, unten läuft
  die Textspalte etwas tiefer als das Bild.
- Buttons/Komponenten: Ein einzelner CTA „Jetzt Offerte anfordern", rot gefüllt, ca.
  40 px hoch, Radius ca. 8 px, weißes Semibold-Label, kein Icon. Das Foto trägt keinen
  Rahmen und keinen Schatten — die Rundung allein trennt es von der Fläche.
- Typo: Eyebrow Caps in Grau (nicht rot — nur das Signet davor ist rot), H2 ca. 42 px
  Bold zweizeilig, Fließtext ca. 16 px Regular mit sehr großzügigem Zeilenabstand und
  bewusst kurzen Zeilen (ca. 8–9 Wörter). Der Textblock ist deshalb schlank und hoch.
- Farbe/Fläche: Hellgrau als Sektionsfläche (`#f5f5f5`-Familie, geschätzt), abgesetzt
  vom Weiß darüber. Der Akzent sitzt nur im CTA und im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 90 px Sektionspadding oben, ca. 55 px Spaltengasse zwischen
  Text und Foto, ca. 20 px zwischen den Absatzblöcken, ca. 40 px vom letzten Absatz zum
  CTA.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Lange Textkolumne neben stehendem Foto auf grauer Fläche

### 07 — Auszeichnungs-Karte Platin-Partner [home-desktop-04-y2250.png | -]
- Anordnung: Eine einzelne große weiße Karte, die als Insel in der hellgrauen Fläche
  liegt (ca. 60 px bis 1380 px, Höhe ca. 460 px, Radius ca. 24 px). Innen zweispaltig:
  links das Partner-Siegel als Grafik (Silber-Plakette mit Flügel-Logo, dazu ein roter
  Kreis-Chip mit dem AlpenEnergie-Signet, der die Plakette oben rechts überlappt), rechts
  der Textblock. Der Textblock startet erst bei ca. 528 px, also weit rechts der
  Kartenmitte — die Grafik bekommt deutlich mehr Luft als sie füllt.
- Buttons/Komponenten: kein Button. Zwei Merkmal-Zeilen mit rotem quadratisch-gerundeten
  Häkchen-Chip (ca. 22 px, Radius ca. 6 px) links neben dem Text — das ist die
  Standard-Checkmark der Seite und kehrt in mindestens vier weiteren Sektionen wieder.
  Der rote Kreis-Chip auf der Plakette ist ca. 44 px, vollrund.
- Typo: Eyebrow Caps grau mit Signet. H2 ca. 38 px Bold über zwei Zeilen mit einem
  **Inline-Farbwechsel**: zwei Wörter stehen in Rot, der Rest anthrazit — die einzige
  Stelle der Startseite, an der die Akzentfarbe in einer Überschrift auftaucht. Lead
  ca. 15 px Regular Grau. Merkmal-Zeilen mit fettem Vorlauf, dann Regular im selben Grad
  — Weight statt Größe trägt die Hierarchie.
- Farbe/Fläche: Weiße Karte auf Hellgrau — der Kontrast ist minimal, die Karte hebt sich
  fast nur über die Rundung ab, ohne Schatten. Rot sitzt im Häkchen-Chip, im
  Plaketten-Chip und in zwei Überschriftswörtern.
- Abstände/Rhythmus: Innenabstand der Karte ca. 60 px oben, ca. 40 px links. Auffällig
  ist der große leere Bereich unter dem Text (ca. 120 px), der die Karte höher macht als
  ihr Inhalt braucht.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Einzelne Auszeichnungskarte mit Siegel links

### 08 — Produkt-Tabs mit Zwei-Karten-Panel [home-desktop-05-y3000.png | -]
- Anordnung: Zentrierter Kopf (Eyebrow mittig, einzeilige H2 mittig, einzeilige Subline
  mittig) — der einzige zentrierte Sektionskopf der Startseite, alle anderen sind
  linksbündig. Darunter eine zentrierte Reihe von sechs Tab-Chips. Unter den Tabs ein
  Zwei-Karten-Panel: links eine quadratische Bildkarte (ca. 580 px breit), rechts eine
  gleich hohe Textkarte (ca. 725 px). Zwischen beiden Karten eine schmale Gasse von ca.
  12 px — die beiden Karten wirken als ein Paar, nicht als zwei Objekte.
- Buttons/Komponenten: Die Tab-Chips sind der Kern dieser Sektion: abgerundete Rechtecke
  (Höhe ca. 44 px, Radius ca. 10 px), jeweils mit Linien-Icon links und Label rechts.
  Der aktive Chip ist rot gefüllt mit weißem Label und weißem Icon; die inaktiven sind
  sehr hell gefüllt (fast weiß / hellstes Grau) mit grauem Label und grauem Icon. Kein
  Chip trägt eine Kontur — der Zustand wird rein über Füllung und Textfarbe gesetzt. Die
  Chips sind unterschiedlich breit (Label-abhängig), nicht gleich verteilt. Im Panel
  rechts der CTA „Produkt ansehen", rot gefüllt, Radius ca. 8 px. Drei Merkmal-Zeilen mit
  demselben roten Häkchen-Chip wie in Sektion 07.
- Typo: H2 ca. 40 px Bold zentriert, Subline ca. 16 px Regular Grau zentriert. Der
  Panel-Titel „Energiemanager" ist ca. 36 px Bold linksbündig — fast so groß wie die H2
  darüber, was die Karte typografisch stark macht. Tab-Labels ca. 15 px Medium.
- Farbe/Fläche: Weiße Sektionsfläche, beide Panel-Karten in Hellgrau. Rot trägt genau
  drei Rollen: aktiver Tab, Häkchen, CTA.
- Abstände/Rhythmus: Ca. 95 px vom Sektionskopf zur Tab-Reihe, ca. 45 px von den Tabs zum
  Panel, ca. 12 px zwischen den Chips. Karten-Innenabstand ca. 55 px. Das Panel ist mit
  ca. 455 px Höhe kompakt.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Chip-Tableiste über Zwei-Karten-Panel

### 09 — Ruhiges Aktionsband auf Schiefer [home-desktop-06-y3750.png | -]
- Anordnung: Vollbreites Band, ca. 265 px hoch, deutlich flacher als das Zahlenband (05).
  Zweispaltig links/rechts: links H2 plus zweizeilige Subline, rechts der CTA und
  darunter rechtsbündig eine Telefonzeile. Beide Seiten sind zur Bandmitte hin ausgerichtet
  — links linksbündig, rechts rechtsbündig, mit großer Leere in der Mitte.
- Buttons/Komponenten: Ein einziger CTA „Jetzt Gespräch vereinbaren", rot gefüllt, Radius
  ca. 8 px, ca. 40 px hoch, kein Icon. Die Telefonzeile darunter ist reiner Text ohne
  Icon und ohne Button-Fläche — ein bewusst schwächerer Zweitweg.
- Typo: H2 ca. 32 px Bold weiß, damit kleiner als die H2 der hellen Sektionen. Subline
  ca. 15 px Regular in gedämpftem Weiß. Telefonzeile ca. 15 px Regular. Kein Eyebrow —
  die einzige Sektion ohne Signet-Eyebrow.
- Farbe/Fläche: Derselbe Schiefer-Verlauf wie Sektion 05, gleiche Richtung. Die Fläche
  bleibt ruhig, nur die Aktion trägt Rot — genau das Verhalten, das `S17` beschreibt.
- Abstände/Rhythmus: Ca. 80 px Bandpadding oben und unten, ca. 20 px zwischen H2 und
  Subline, ca. 20 px zwischen CTA und Telefonzeile. Sehr kompaktes Band.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-CTA-MID`

### 10 — Foto links, Merkmalliste rechts [home-desktop-07-y4500.png | -]
- Anordnung: Zweispalten-Split, gespiegelt zu Sektion 06 — hier liegt das Foto **links**
  (ca. 60–672 px, ca. 450 px hoch, Radius ca. 15 px) und der Text rechts (ab ca. 730 px).
  Die Textspalte ist oben bündig mit dem Bild, endet aber mit dem CTA unterhalb der
  Bildunterkante. Der Wechsel Bild-rechts (06) → Bild-links (10) ist das
  Alternierungs-Prinzip der Seite.
- Buttons/Komponenten: CTA „Mehr über uns", rot gefüllt, Radius ca. 8 px. Drei
  Merkmal-Zeilen mit dem roten Häkchen-Chip; die Labels sind hier Semibold, nicht Regular
  — etwas stärker gewichtet als die Merkmal-Zeilen in Sektion 08.
- Typo: H2 zweizeilig ca. 34 px Bold, Fließtext ca. 15 px Regular über sechs Zeilen,
  Merkmal-Labels ca. 15 px Semibold. Kein Eyebrow in dieser Sektion.
- Farbe/Fläche: Weiß. Rot nur in Häkchen und CTA.
- Abstände/Rhythmus: Ca. 95 px Sektionspadding oben, ca. 58 px Spaltengasse, ca. 12 px
  zwischen den Merkmal-Zeilen, ca. 30 px vom letzten Merkmal zum CTA.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-OFFER-PAIR` greift nicht (nur ein Block) — Kandidat: Gespiegelter
  Bild-Text-Split mit Häkchenliste

### 11 — Einzugsgebiet-Karte auf grauer Kartenfläche [home-desktop-07-y4500.png | home-desktop-08-y5250.png | -]
- Anordnung: Eine einzelne hellgraue Karte (ca. 60–1380 px, Höhe ca. 455 px, Radius ca.
  24 px) auf weißer Fläche. Innen zweispaltig: links Text (H2 zweizeilig, Subline
  zweizeilig, drei Häkchen-Zeilen, CTA), rechts eine stilisierte Schweizer Landkarte in
  Rot mit weißem Schweizerkreuz. Die Karte ist keine echte Geo-Karte, sondern eine
  Flächengrafik mit weichem Rand-Verlauf; dahinter liegen große hellgraue Rauten des
  Logo-Signets als Hintergrundmuster, das links unter der Karte hervorschaut.
- Buttons/Komponenten: CTA „Jetzt Offerte sichern", rot gefüllt, Radius ca. 8 px. Drei
  Häkchen-Zeilen im bekannten Muster. Kein Adressfeld, kein Radius-Wert, kein
  Kartendienst — es ist eine dekorative Flächenkarte.
- Typo: H2 ca. 32 px Bold zweizeilig, Subline ca. 15 px Regular Grau zweizeilig,
  Häkchen-Labels ca. 15 px Regular. Kein Eyebrow.
- Farbe/Fläche: Hellgraue Karte auf Weiß. Hier trägt Rot ausnahmsweise eine **große
  Fläche** (die Landkartensilhouette) — das ist neben dem Marquee die zweite große
  Rotfläche der Seite und die einzige, in der Rot dekorativ statt funktional wirkt.
- Abstände/Rhythmus: Karten-Innenabstand ca. 58 px links und oben. Die Kartengrafik läuft
  bis an den rechten Kartenrand und wird dort weich ausgeblendet statt beschnitten.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-MAP` — mit dem Vorbehalt, dass keine Adresse und kein nutzbarer Radius
  gezeigt wird; als Muster eher „dekoratives Einzugsgebiet".

### 12 — Vorteile-Dreier auf Schiefer [home-desktop-08-y5250.png | -]
- Anordnung: Vollbreites dunkles Band, ca. 520 px hoch. Kopf zentriert (Eyebrow, H2,
  zweizeilige Subline auf ca. 1150 px Breite). Darunter drei gleich breite Spalten, jede
  mit einem quadratischen Icon-Chip links und Titel plus Text rechts daneben — also
  **horizontale** Icon-Text-Paare, nicht das übliche Icon-über-Text. Die drei Spalten
  sind ohne Karten, ohne Trennlinien.
- Buttons/Komponenten: keine Buttons. Die Icon-Chips sind ca. 76 px große, abgerundete
  Quadrate (Radius ca. 18 px) in einem etwas helleren Grau als das Band, mit dünnem
  weißem Linien-Icon darin — matt statt rot, also bewusst zurückgenommen. Es ist die
  einzige Icon-Behandlung der Seite ohne Rot.
- Typo: H2 ca. 40 px Bold weiß zentriert, Subline ca. 15 px Regular in gedämpftem Weiß
  zentriert. Spaltentitel ca. 18 px Semibold weiß, Spaltentext ca. 14 px Regular in
  gedämpftem Weiß. Verhältnis H2 zu Spaltentitel grob 2,2:1 (geschätzt).
- Farbe/Fläche: Wieder der Schiefer-Verlauf. Rot sitzt ausschließlich im Eyebrow-Signet.
  Damit ist dies die dritte dunkle Fläche der Seite (05, 09, 12) — die Seite hält sich
  nicht an „höchstens eine dunkle Sektion".
- Abstände/Rhythmus: Ca. 90 px Bandpadding oben, ca. 90 px vom Kopf zu den Spalten, ca.
  20 px zwischen Icon-Chip und Text. Auffällig: die dritte Spalte läuft rechts über den
  Bandrand hinaus und wird abgeschnitten („Mit App und Tablet sehen S…", „Verbrauch und"
  fehlen rechts) — sichtbarer Überlauf am 1440er Viewport, kein Umbruch.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-PROCESS-3` greift nicht (keine Sequenz) — Kandidat: Dunkler Vorteile-Dreier
  mit horizontalen Icon-Text-Paaren

### 13 — Kundenstimmen, gemischtes Karten-Mosaik [home-desktop-09-y6000.png | home-desktop-10-y6750.png | -]
- Anordnung: Die komplexeste Sektion der Seite, dreistufig aufgebaut.
  (a) Linksbündiger Kopf (Eyebrow, H2 zweizeilig, Fließtext dreizeilig) — die rechte
  Hälfte bleibt leer.
  (b) Zwei Reihen zu je zwei Kacheln im **Reissverschluss**: Reihe 1 hat links eine
  Video-Fotokachel und rechts eine graue Textkachel; Reihe 2 dreht es um, links die
  Textkachel, rechts das Foto. Die Fotokachel ist jeweils breiter als die Textkachel
  (ca. 780 zu 515 px), das Raster ist also asymmetrisch.
  (c) Darunter ein Dreier-Raster gleich hoher quadratischer Bildkacheln (ca. 425 px), von
  denen die mittlere aufgeklappt ist und statt des Bildes ein Textzitat über einem
  abgedunkelten Foto zeigt — ein Akkordeon im Kachelraster.
  (d) Ganz unten eine Reihe aus fünf kleinen Vorschaubildern (ca. 245 px breit,
  Radius ca. 12 px) als weitere Auswahl.
- Buttons/Komponenten: Auf der Video-Kachel liegt ein roter Play-Kreis (ca. 58 px, exakt
  mittig auf der Kachel), weißes Dreieck. Auf den quadratischen Bildkacheln sitzt oben
  rechts ein Zustands-Chip: ein halbtransparenter grauer Kreis (ca. 44 px) mit weißem
  Plus bei geschlossenen Kacheln, mit weißem Kreuz bei der geöffneten — Plus/Kreuz ist
  der einzige sichtbare Zustandsindikator. Sterne-Bewertungen erscheinen als fünf kleine
  gelb-goldene Sterne, nicht in der Akzentfarbe. Alle Kacheln haben ca. 20 px Radius.
- Typo: Zitat-Überschriften in den Textkacheln ca. 24 px Semibold, deutlich größer als
  der Zitattext darunter (ca. 14 px Regular Grau) — das Verhältnis ist grob 1,7:1. Namen
  auf den Fotokacheln ca. 20 px Semibold weiß, Ortszeile ca. 14 px Regular weiß darunter,
  beide unten links im Bild ohne eigene Fläche, nur über einem dunklen Foto-Fuß-Verlauf.
- Farbe/Fläche: Weiße Sektionsfläche, Textkacheln in Hellgrau, Bildkacheln vollflächig
  Foto. Rot sitzt nur im Play-Kreis und im Eyebrow-Signet. Gelb als Sternfarbe ist die
  **einzige zweite Farbe der Seite** außerhalb von Rot und Grau.
- Abstände/Rhythmus: Ca. 100 px vom Kopf zur ersten Kachelreihe, ca. 25 px Gasse zwischen
  den Kacheln, ca. 40 px zwischen den Reihen. Die Textkacheln haben viel Innenluft
  (ca. 40 px), zwischen Kachelüberschrift und Zitattext steht eine auffällig große Lücke
  von ca. 60 px.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-TESTIMONIAL` plus `P-GALLERY` — Kandidat für die konkrete Form:
  Reissverschluss-Mosaik aus Foto- und Zitatkacheln mit aufklappbarer Bildreihe

### 14 — Fazit-Band mit freigestellter Person [home-desktop-12-y8250.png | -]
- Anordnung: Vollbreites dunkles Foto-Band (ca. 580 px hoch), Text linksbündig in einer
  ca. 760 px breiten Spalte. Rechts steht eine freigestellte Person, deren Kopf und
  Schultern **über die Oberkante des Bandes hinausragen** — die stärkste Überlappung der
  Seite. Der Bildhintergrund ist ein stark abgedunkeltes Dachfoto, das links fast in
  Schwarz läuft, damit der Text sitzt.
- Buttons/Komponenten: Ein CTA „Offerte anfordern", rot gefüllt, Radius ca. 8 px, kein
  Icon.
- Typo: H2 ca. 36 px Bold weiß zweizeilig. Fließtext ca. 15 px Regular in gebrochenem
  Weiß über zwei Absatzblöcke; einzelne Zahlenangaben stehen inline Semibold — Weight als
  Hervorhebung statt Farbe. Kein Eyebrow.
- Farbe/Fläche: Dunkelste Fläche der Seite. Der Zonenverlauf verdunkelt nur die linke
  Hälfte, das Motiv rechts bleibt farbecht. Rot nur im CTA.
- Abstände/Rhythmus: Ca. 100 px Bandpadding oben, ca. 22 px zwischen den Absatzblöcken,
  ca. 45 px vom Text zum CTA.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Dunkles Fazit-Band mit über die Kante ragender Person

### 15 — FAQ-Akkordeon [home-desktop-13-y9000.png | -]
- Anordnung: Zweispaltig mit sehr ungleicher Gewichtung. Links eine schmale Spalte (ca.
  60–405 px) mit einem zweizeiligen Titel und einer kurzen Hinweiszeile — die Spalte ist
  danach **komplett leer**, über die volle Akkordeonhöhe von ca. 900 px. Rechts ab
  ca. 580 px die gestapelten Akkordeon-Zeilen in ca. 800 px Breite. Die leere linke
  Spalte ist der auffälligste Weißraum der Seite.
- Buttons/Komponenten: Jede Akkordeon-Zeile ist eine hellgraue Fläche mit ca. 16 px
  Radius, ca. 62 px hoch im geschlossenen Zustand. Rechts ein Zustands-Icon: geschlossen
  ein schlichtes graues Plus **ohne Kreisfläche**, geöffnet ein rot gefüllter Kreis
  (ca. 30 px) mit weißem Kreuz. Der Zustandswechsel bringt also gleichzeitig Form (Plus →
  Kreis) und Farbe (Grau → Rot) — kein reiner Chevron-Dreh. Die geöffnete Zeile wächst
  auf ca. 290 px und zeigt den Antworttext, eingeleitet von einem kleinen grauen
  Abbiege-Pfeil (↳) links.
- Typo: Der Titel links ist zweistufig: „Energiekonzept" ca. 34 px Bold in **Hellgrau**
  über „FAQ" ca. 34 px Bold in Anthrazit — gleiche Größe, Hierarchie allein über
  Helligkeit. Fragen ca. 17 px Semibold, Antworttext ca. 15 px Regular Grau mit
  Absatz-Leerzeilen. In der Hinweiszeile links ist ein Wort unterstrichen als Textlink.
- Farbe/Fläche: Weiß, Zeilen in Hellgrau. Rot sitzt ausschließlich im geöffneten
  Zustands-Kreis.
- Abstände/Rhythmus: Ca. 12 px zwischen den Akkordeon-Zeilen, ca. 24 px Innenabstand
  links in der Zeile. Sektionspadding oben ca. 130 px — eine der größten Lücken.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-FAQ`

### 16 — Schluss-CTA auf Rendering [home-desktop-13-y9000.png | home-desktop-15-y10312.png | -]
- Anordnung: Vollbreites Band (ca. 430 px hoch) mit einem hellen 3D-Rendering eines
  Hauses mit Solardach als Hintergrund. Text linksbündig ab 60 px in ca. 600 px Breite;
  das Rendering ist so gelegt, dass das Haus rechts der Mitte steht und links Rasen und
  Himmel als ruhige Fläche bleiben. Die Textzone ist leicht abgedunkelt.
- Buttons/Komponenten: Ein CTA „Jetzt Offerte anfordern", rot gefüllt, Radius ca. 8 px.
  Darunter eine dreiteilige Trust-Zeile („Kostenlos • Unverbindlich • In 2 Minuten
  ausgefüllt") mit kleinen runden Punkten als Trenner — reiner Text, keine Badges.
- Typo: Eyebrow Caps weiß mit rotem Signet, H2 ca. 36 px Bold weiß, Subline ca. 15 px
  Regular zweizeilig, Trust-Zeile ca. 14 px Regular in gebrochenem Weiß.
- Farbe/Fläche: Die Schlusssektion ist **nicht** vollflächig rot — sie nutzt ein Foto
  statt einer Akzentfläche. Rot bleibt auf den CTA beschränkt.
- Abstände/Rhythmus: Ca. 90 px Bandpadding oben, ca. 30 px vom Subtext zum CTA, ca. 25 px
  vom CTA zur Trust-Zeile.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-CTA-END` — in der Ausführung als Foto-Band statt Akzentfläche.

### 17 — Footer, dreiteilig [home-desktop-15-y10312.png | -]
- Anordnung: Vollbreite Schieferfläche, ca. 1100 px hoch, in drei horizontale Etagen
  geteilt.
  (a) Oben ein Vierspalten-Raster: links Logo, Claim und drei nebeneinanderstehende
  Standort-Adressen plus Social-Icons; Mitte zwei Linkspalten („Unternehmen",
  „Produkte"); rechts eine Ansprechpartner-Einheit aus rundem Porträtfoto (ca. 58 px),
  Name, Rolle, einem CTA und zwei Kontaktzeilen mit Linien-Icons.
  (b) Mitte: drei gleich breite Blog-Karten (Bild ca. 210 px hoch mit ca. 12 px Radius,
  darunter Meta-Zeile und zweizeiliger Titel) — die Karten haben **keine Kartenfläche**,
  nur Bild plus Text auf der Footerfläche.
  (c) Unten nach einer 1 px Trennlinie eine Schlusszeile: links Copyright und zwei
  Rechtslinks, mittig ein „Umgesetzt von"-Kredit mit roter Wortmarke, rechts drei
  Ortsnamen.
- Buttons/Komponenten: Ein CTA „Offerte anfordern", rot gefüllt, Radius ca. 8 px — der
  einzige Button im Footer. Social-Icons als schlichte weiße Glyphen ohne Kreisfläche.
  Die Kontaktzeilen tragen quadratisch gerundete Outline-Icons (Telefon, Briefumschlag).
- Typo: Spaltenüberschriften „Unternehmen" und „Produkte" in **Rot**, ca. 20 px Semibold
  — der einzige Ort außer Sektion 07, an dem Rot als Textfarbe für Überschriften dient.
  Links darunter ca. 15 px Regular in gedämpftem Weiß. Adressüberschriften Semibold weiß
  ca. 14 px. Blog-Titel ca. 17 px Semibold weiß zweizeilig, Meta-Zeile ca. 14 px mit
  einem senkrechten Strich als Trenner zwischen Datum und Lesedauer.
- Farbe/Fläche: Schiefer-Verlauf wie die anderen dunklen Bänder, damit ist der Footer
  farblich nicht vom Aktionsband (09) getrennt. Rot in drei Rollen: CTA,
  Spaltenüberschriften, Agentur-Wortmarke.
- Abstände/Rhythmus: Ca. 110 px Footerpadding oben, ca. 30 px zwischen den Linkzeilen,
  ca. 90 px zwischen Linkraster und Blogkarten, ca. 25 px Gasse zwischen den Blogkarten.
- Nicht lesbar: Zwei Linklabels sind rechts abgeschnitten („Referenze",
  „Energiemanagementsystem" ohne Endung) — Überlauf innerhalb der Spaltenbreite.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Dreietagiger Schiefer-Footer mit Ansprechpartner und Blogreihe

### Zustaende (Hover) [home-hover-00.png]

**Die Belegbasis ist dünn und trägt keine Hover-Dokumentation.** Im gesamten Ordner
`shots/` existiert genau **ein** Shot mit `hover` im Namen: `home-hover-00.png`. Es gibt
keinen zweiten, keine Serie pro Komponente, keinen Shot mit sichtbarem Cursor. Eine
Auswahl „ca. 10-15 Shots, so gewählt, dass Nav-, CTA- und Karten-Hover abgedeckt sind"
ist daher nicht möglich; dokumentiert wird der eine vorhandene Shot.

Was `home-hover-00.png` zeigt: den Startseiten-Fold mit Marquee, transparentem Header,
Hero-Text, dem CTA-Paar „Jetzt Ersparnis berechnen" / „Erklärvideo ansehen" und der
Partnerlogo-Reihe im Bild — also denselben Ausschnitt wie `home-desktop-00-fold.png`.

Ein Pixelvergleich beider Dateien (ImageChops-Differenz über die vollen 1440 x 900 px)
liefert genau eine Differenzfläche: die Bounding-Box `x 1328-1440, y 794-900`. Das ist
ausschließlich das runde **Chat-Widget** unten rechts. Gemessene Werte an derselben
Koordinate: Widget-Fläche `rgb(45,106,79)` in `home-hover-00.png` gegen `rgb(51,110,84)`
in `home-desktop-00-fold.png`, dazu ein leicht anderer Kantensaum. Der Unterschied ist
ein minimaler Grünton-Versatz von rund 6 Punkten je Kanal am Rand eines fremden
Drittanbieter-Widgets — das ist als Animations- oder Antialiasing-Frame ebenso gut
erklärbar wie als Hover und wird deshalb **nicht** als Hover-Zustand gewertet.

Daraus folgt komponentenweise:

- **Nav-Links** (`Photovoltaik`, `Wärmepumpen`, `Über uns`, `Referenzen`, `Karriere`):
  Hover **nicht geprüft**. In `home-hover-00.png` liegt kein Nav-Label in der
  Differenzfläche; Farbe, Unterstrich und Transform sind damit unbelegt. Auch das
  Dropdown hinter dem Chevron bei `Photovoltaik` ist in `home-hover-00.png` nicht
  aufgeklappt.
- **Header-Buttons** (`Support`, `Jetzt Offerte sichern`): Hover **nicht geprüft**. Beide
  liegen bei y ca. 91 und damit weit außerhalb der Differenzfläche — kein Farbwechsel,
  kein Schatten, kein Transform belegt.
- **Hero-CTA** (`Jetzt Ersparnis berechnen`, `Erklärvideo ansehen`): Hover **nicht
  geprüft**. Beide Buttons sind in `home-hover-00.png` pixelgleich zu
  `home-desktop-00-fold.png`.
- **Karten** (Produkt-, Testimonial-, Blogkacheln): Hover **nicht geprüft**. Keine Karte
  liegt im Fold-Ausschnitt von `home-hover-00.png`, es existiert kein Hover-Shot weiter
  unten auf der Seite.
- **Chat-Widget** unten rechts: einzige messbare Differenz zwischen `home-hover-00.png`
  und `home-desktop-00-fold.png` (Box `x 1328-1440, y 794-900`, Grünton `rgb(45,106,79)`
  gegen `rgb(51,110,84)`). Als Hover-Regel **nicht verwertbar** — Fremdkomponente,
  Differenz im Bereich einer Animationsphase.

Belegt sind auf dieser Site nur **Nicht-Hover-Zustandswechsel**, die ohne Hover-Shot
auskommen und oben bei den Sektionen stehen: der Header-Wechsel transparent zu weiß beim
Scrollen (Sektion 02, belegt über `home-desktop-00-fold.png` gegen
`home-desktop-02-y750.png`), der aktive gegen inaktive Tab im Produktkatalog (Sektion 82,
`solaranlage-basel-desktop-04-y2250.png`, rot `rgb(233,51,35)` gegen grau
`rgb(245,245,245)`), das offene gegen geschlossene FAQ-Element (Sektion 90,
`solaranlage-basel-desktop-14-y9750.png`) und die aufgeklappte Testimonial-Kachel
(Sektion 86, `solaranlage-basel-desktop-10-y6750.png`).

**Offen:** Für belastbare Hover-Aussagen zu Nav, CTA und Karten fehlen gezielte
Hover-Captures je Komponente. Bis dahin gilt für diesen Abschnitt: nicht geprüft, nicht
geraten.

## Seite: /produkte/solarmodul

### 18 — Produkt-Hero, flaches Foto-Band [produkte__solarmodul-desktop-00-fold.png | produkte__solarmodul-mobile-00-fold.png]
- Anordnung: Deutlich flacher als der Startseiten-Hero (ca. 530 px statt 672 px), sonst
  gleiche Bauweise: vollbreites Foto, Text linksbündig ab 60 px, Header transparent
  darüber. Der Text sitzt hier **im unteren Drittel** des Bandes, nicht auf halber Höhe —
  der obere Bildbereich (Dach und Himmel) bleibt frei. Kein CTA im Fold, keine
  Partnerlogos.
- Buttons/Komponenten: keine. Die Unterseite kommt im Fold ohne Aktion aus, der einzige
  Weg ist der Header-CTA — der schärfste Unterschied zum Startseiten-Hero.
- Typo: Nur zweistufig. Oben eine lange Kicker-Zeile in ca. 20 px Regular Weiß (kein
  Caps, kein Signet, keine Pille — anders als die Eyebrows im Rest der Site), darunter
  ein sehr kurzer H1 „Solarmodul" in ca. 48 px Bold. Das Verhältnis Kicker zu H1 ist
  ungewöhnlich eng, grob 1:2,4 — der Kicker ist fast so laut wie die Überschrift.
- Farbe/Fläche: Dämmerungsfoto in kühlem Grau-Blau, links leicht abgedunkelt. Kein Rot
  in der Sektion außer im Header.
- Abstände/Rhythmus: Ca. 380 px Leerraum über dem Kicker, dann eng gesetzt: ca. 10 px
  Kicker zu H1, ca. 60 px H1 zur unteren Bandkante.
- Mobil (`produkte__solarmodul-mobile-00-fold.png`): Die Kicker-Zeile bricht auf
  **sechs Zeilen** um und wird damit optisch größer als die H1 darunter — die Hierarchie
  kippt bei 390 px. Der Bandanteil des Textes wächst von einem Drittel auf über die
  Hälfte. Sonst wie Desktop gestapelt.
- Pattern: `P-HERO-PHOTO` in der reduzierten Unterseiten-Variante ohne CTA.

### 19 — Produkt-Einleitung mit Spec-Overlay-Karten [produkte__solarmodul-desktop-00-fold.png | -]
- Anordnung: Zweispaltig. Links Text ab 60 px in ca. 640 px Breite, rechts eine
  freigestellte 3D-Darstellung gestapelter Module in Grau. Über der Grafik schweben zwei
  hellgraue Spec-Karten, die die Module überlappen und teilweise hinter deren Kante
  verschwinden — die Karten sind bewusst halbtransparent und stark unscharf gerendert
  (Glasmilch-Effekt), sodass ihr Text nur schwach lesbar ist.
- Buttons/Komponenten: Die Spec-Karten sind ca. 290×130 px, Radius ca. 20 px, mit einem
  dünnen Linien-Icon (Schild, Blitz) oben links und zweizeiligem Label darunter — kein
  Button, kein Rahmen. Weiter unten (`produkte__solarmodul-desktop-02-y750.png`) sitzt
  statt eines Buttons ein **Datei-Link** „Datenblatt": ein graues Dokument-Linien-Icon
  plus Textlabel, ohne Fläche, ohne Unterstreichung — der schwächste Aktionstyp der
  ganzen Site.
- Typo: H2 zweizeilig mit **Helligkeits-Split**: Zeile 1 „Hochleistungsmodul" in
  Anthrazit ca. 40 px Bold, Zeile 2 „der Spitzenklasse" in Hellgrau gleicher Größe und
  Weight. Dasselbe Muster wie im FAQ-Titel der Startseite — Hierarchie über Helligkeit
  statt über Größe, hier als wiederkehrendes Site-Muster belegt. Fließtext ca. 16 px
  Regular in zwei Absatzblöcken mit kurzen Zeilen.
- Farbe/Fläche: Weiß, alles entsättigt. Es gibt **kein Rot** in dieser Sektion — die
  erste Sektion der ganzen Site ohne jeden Akzent.
- Abstände/Rhythmus: Ca. 120 px Sektionspadding oben, ca. 22 px zwischen den
  Absatzblöcken, ca. 50 px vom Text bis zum Datenblatt-Link.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Produkt-Einleitung mit unscharfen Spec-Overlay-Karten

### 20 — Auszeichnungs-Karte Platin-Partner (Wiederholung) [produkte__solarmodul-desktop-02-y750.png | -]
- Identisch zu Sektion 07 der Startseite: gleiche Karte, gleiche Grafik links, gleicher
  Inline-Rotanteil in der H2, gleiche zwei Häkchen-Zeilen, gleiche Maße und gleicher
  Radius. Einziger Unterschied: die Karte liegt hier auf **weißer** statt hellgrauer
  Fläche und die Karte selbst ist hellgrau — also invertiert gegenüber der Startseite.
  Der große Leerbereich unter dem Text ist derselbe.
- Pattern: wie 07.

### 21 — Merkmal-Bento aus fünf ungleichen Kacheln [produkte__solarmodul-desktop-03-y1500.png | -]
- Anordnung: Ein dreispaltiges Bento-Raster mit ungleich hohen Kacheln — die
  interessanteste Layout-Idee der Site. Spalte 1: oben eine flache helle Kachel
  (ca. 200 px), darunter eine hohe dunkle Fotokachel (ca. 420 px). Spalte 2: oben eine
  hohe Fotokachel (ca. 420 px), darunter eine flache helle (ca. 200 px). Spalte 3: oben
  eine hohe helle Textkachel, darunter eine Fotokachel — das Raster ist also über die
  drei Spalten hinweg **versetzt**, keine Zeile fluchtet.
- Buttons/Komponenten: keine Buttons. Die Kacheln kennen drei Bauarten:
  (a) *Zahlkachel* — hellgrau, Radius ca. 20 px, Inhalt zentriert, sehr große Zahl über
  kleinem Label.
  (b) *Fotokachel mit Text im Bild* — Foto vollflächig, Text weiß direkt darüber, oben
  bei „Bifaziale Energie" bzw. unten bei „Brandschutzklasse"; ein dunkler Zonenverlauf
  hält den Text lesbar.
  (c) *Textkachel* — hellgrau, Text linksbündig, Titel plus Fließtext.
  Alle Kacheln teilen denselben Radius, unterscheiden sich aber in Textausrichtung
  (zentriert vs. links) — die Ausrichtung folgt der Kachelart, nicht dem Raster.
- Typo: Die Zahlkacheln setzen die Einheit kleiner und heller als die Zahl („500" groß
  Anthrazit, „W" kleiner in Grau) — ein Mikro-Hierarchiedetail. Kacheltitel ca. 26 px
  Bold, Kacheltext ca. 15 px Regular. Innerhalb des Kacheltextes stehen einzelne
  Halbsätze **Semibold**, das ist die durchgehende Hervorhebungslogik der Site (Weight,
  nie Farbe).
- Farbe/Fläche: Weiß, Kacheln in Hellgrau oder Foto. Kein Rot in der gesamten Sektion.
  Die dunklen Fotokacheln setzen den Kontrast, nicht der Akzent.
- Abstände/Rhythmus: Ca. 18 px Gasse zwischen den Kacheln — enger als das
  Karten-Spacing der Startseite (dort ca. 25 px). Karten-Innenabstand ca. 36 px.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Versetztes Bento aus Zahl-, Foto- und Textkacheln

### 22 — Halbe/halbe Split-Sektion Klima [produkte__solarmodul-desktop-04-y2250.png | -]
- Anordnung: Vollbreites Band ohne Container-Rand, exakt in zwei Hälften geteilt: links
  eine schwarze Fläche mit Text (Kante bei ca. 720 px), rechts randlos ein Foto bis zur
  Viewportkante. Es gibt keine Rundung und keine Gasse — die beiden Hälften stoßen hart
  aneinander. Das ist die einzige Sektion der Site mit einer 50/50-Hartkante.
- Buttons/Komponenten: Ein CTA „Offerte anfordern", rot gefüllt, Radius ca. 8 px, sitzt
  linksbündig unter dem Text.
- Typo: H2 einzeilig ca. 34 px Bold weiß, Fließtext ca. 17 px Regular in gebrochenem
  Weiß über fünf Zeilen — der Fließtext ist hier größer als in den hellen Sektionen
  (dort ca. 15–16 px), was das Band ruhiger und lesbarer macht.
- Farbe/Fläche: Fast schwarze Fläche (deutlich dunkler als der Schiefer-Verlauf der
  Startseite) — die Unterseite nutzt also einen zweiten dunklen Ton. Rot nur im CTA.
- Abstände/Rhythmus: Ca. 155 px Padding oben in der schwarzen Hälfte, ca. 100 px vom
  Text zum CTA — die größte Einzellücke zwischen Text und Button auf der Site.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: 50/50-Hartkante schwarz gegen randloses Foto

### 23 — Bild-Text-Paar Schweizer Qualität [produkte__solarmodul-desktop-05-y3000.png | -]
- Anordnung: Zwei Karten nebeneinander wie im Produkt-Tab-Panel der Startseite (08),
  aber ohne Tabs darüber: links eine quadratische Bildkarte (ca. 430 px), rechts eine
  gleich hohe hellgraue Textkarte (ca. 875 px). Die Textkarte ist doppelt so breit wie
  die Bildkarte — ein bewusst unausgewogenes Paar.
- Buttons/Komponenten: kein Button, keine Häkchen. Die Sektion ist reiner Text.
- Typo: Wieder der Helligkeits-Split in der Überschrift: „Schweizer Qualität." Anthrazit,
  „Schweizer Service." Hellgrau, beide ca. 34 px Bold. Fließtext ca. 16 px Regular über
  drei Zeilen.
- Farbe/Fläche: Weiß, Karten hellgrau bzw. Foto. Kein Rot.
- Abstände/Rhythmus: Ca. 18 px Kartengasse, Karten-Innenabstand ca. 36 px. Auffällig
  ist der große leere Bereich unter dem Text (ca. 120 px), der die Textkarte auf die
  Höhe der Bildkarte zwingt — dasselbe Verhalten wie in Sektion 07.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Ungleiches Bild-Text-Kartenpaar ohne Aktion

### 24 — Komponenten-Karussell [produkte__solarmodul-desktop-06-y3750.png | -]
- Anordnung: Kopfzeile mit **geteilter Ausrichtung**: links Eyebrow und H2 linksbündig,
  rechts auf gleicher Höhe eine zweizeilige Claim-Zeile rechtsbündig — die einzige
  Sektionskopf-Variante der Site mit Text auf beiden Seiten. Darunter eine horizontale
  Reihe flacher Bildkacheln (je ca. 350×150 px, Radius ca. 16 px), die vierte Kachel ist
  am rechten Viewportrand angeschnitten — ein sichtbarer Karussell-Hinweis, kein
  Umbruch.
- Buttons/Komponenten: Jede Kachel ist ein Foto mit einem Zonenverlauf und zwei
  Elementen darauf: links ein weißes Linien-Icon plus weißes Semibold-Label, rechts ein
  runder Chip (ca. 34 px) mit einem diagonalen Pfeil nach oben rechts — der einzige
  Pfeil-Affordance-Typ der Site. Über der angeschnittenen vierten Kachel liegt zusätzlich
  ein halbtransparenter grauer Kreis (ca. 44 px) mit weißem Chevron nach rechts als
  Weiter-Steuerung. Der Chip-Hintergrund ist halbtransparentes Grau, nicht Rot.
- Typo: Eyebrow Caps grau mit Signet, H2 ca. 40 px Bold linksbündig. Die rechte
  Claim-Zeile ca. 18 px Regular mit einem Semibold-Teil in der zweiten Zeile.
  Kachel-Labels ca. 19 px Semibold weiß.
- Farbe/Fläche: Hellgraue Sektionsfläche. Rot nur im Eyebrow-Signet — die Kacheln selbst
  bleiben komplett neutral.
- Abstände/Rhythmus: Ca. 55 px vom Kopf zur Kachelreihe, ca. 18 px Gasse zwischen den
  Kacheln. Die Kacheln sind mit ca. 150 px Höhe sehr flach, fast bandartig.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-GALLERY` als Navigations-Karussell — Kandidat: Flache Bild-Chips mit
  Pfeil-Affordance und angeschnittener Folgekachel

### 25 — Schluss-CTA und Footer (Wiederholung) [produkte__solarmodul-desktop-07-y4443.png | -]
- Identisch zu Sektion 16 und 17 der Startseite: gleiches Rendering-Band mit Eyebrow, H2,
  Subline, rotem CTA und dreiteiliger Trust-Zeile, danach derselbe dreietagige
  Schiefer-Footer mit denselben Spalten, denselben roten Spaltenüberschriften, derselben
  Ansprechpartner-Einheit und denselben drei Blog-Karten. Auch die abgeschnittenen Labels
  („Referenze", „Energiemanagementsystem") wiederholen sich unverändert. Der Footer ist
  damit als globale Komponente belegt und wird für die übrigen Seiten nur noch
  referenziert.
- Pattern: wie 16 und 17.

## Seite: /referenzen

### 26 — Referenz-Hero mit Drohnenfoto [referenzen-desktop-00-fold.png | referenzen-mobile-00-fold.png]
- Anordnung: Das höchste Hero-Band der Site (ca. 760 px), vollbreites Drohnenfoto von
  oben auf ein Flachdach mit Modulreihen. Text linksbündig ab 60 px, im unteren Drittel
  positioniert. Anders als beim Startseiten-Hero gibt es hier weder Eyebrow noch Lead —
  nur H1 und ein Button.
- Buttons/Komponenten: Genau ein CTA „Offerte anfordern", rot gefüllt, Radius ca. 8 px,
  ca. 40 px hoch, kein Icon. Damit ist dieser Hero der einzige mit **einem** statt zwei
  Fold-CTA.
- Typo: Einstufig. H1 ca. 46 px Bold weiß über zwei Zeilen. Keine weitere Textebene.
- Farbe/Fläche: Sommerliches, helles Foto — deutlich heller als der Startseiten-Hero.
  Deshalb liegt hier ein spürbar stärkerer dunkler Zonenverlauf über der linken unteren
  Ecke, damit die weiße Schrift trägt. Rot nur im CTA und im Header.
- Abstände/Rhythmus: Ca. 490 px Foto über dem H1, ca. 40 px vom H1 zum CTA, ca. 100 px
  vom CTA zur Bandunterkante.
- Mobil (`referenzen-mobile-00-fold.png`): H1 bricht auf **fünf Zeilen**, wobei
  „Wärmepumpe" mitten im Wort umbrochen wird („Wärmepum" / „pe") — sichtbarer harter
  Umbruch ohne Silbentrennungslogik. CTA bleibt linksbündig in Inhaltsbreite. Der Hero
  ist mobil ca. 780 px hoch und füllt damit fast den ganzen ersten Screen.
- Pattern: `P-HERO-PHOTO`, reduzierte Variante mit genau einem CTA.

### 27 — Kennzahlen-Zeile auf Weiss [referenzen-desktop-02-y750.png | -]
- Anordnung: Dieselbe Idee wie Sektion 05 der Startseite, aber **hell und einzeilig**
  statt dunkel und 2×2. Links Eyebrow, H2 und eine zweizeilige Subline; rechts drei
  Kennzahlen nebeneinander in einer Reihe (Start bei ca. 560/770/980 px), nicht als
  Raster. Kein Band, kein Flächenwechsel — die Sektion sitzt direkt auf Weiß.
- Buttons/Komponenten: keine. Kennzahlen ohne Karten, ohne Trennlinien.
- Typo: Kennzahlen ca. 40 px Bold Anthrazit (auf der Startseite waren sie weiß), Labels
  ca. 15 px Regular Grau. H2 ca. 38 px Bold. Subline ca. 15 px Regular Grau zweizeilig.
- Farbe/Fläche: Weiß. Rot nur im Eyebrow-Signet. Der direkte Vergleich mit Sektion 05
  zeigt: dasselbe Modul existiert in einer dunklen und einer hellen Fassung.
- Abstände/Rhythmus: Sehr kompakt, Sektionshöhe nur ca. 260 px. Ca. 12 px zwischen Zahl
  und Label, ca. 210 px zwischen den Kennzahlspalten.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Helle einzeilige Kennzahlenreihe neben Sektionskopf

### 28 — Projektraster mit Namens-Badges [referenzen-desktop-02-y750.png | referenzen-desktop-04-y2250.png | -]
- Anordnung: Zentrierter Kopf (Eyebrow mittig, H2 zweizeilig mittig), darunter ein
  striktes Dreispalten-Raster gleich großer Projektkacheln, das über mehrere
  Bildschirmhöhen durchläuft (in `referenzen-desktop-04-y2250.png` sind vier weitere
  Reihen sichtbar, das Raster reicht bis `referenzen-desktop-06-y3750.png`). Anders als
  das Mosaik der Startseite (13) ist dieses Raster **völlig regelmäßig** — gleiche
  Kachelbreite, gleiche Höhe, gleiche Gasse.
- Buttons/Komponenten: Der Kern ist die Kachel selbst, dreiteilig aufgebaut:
  (a) Bild (ca. 425×260 px, Radius ca. 16 px) mit einem **Namens-Badge** oben links: ein
  halbtransparent-graues Pill-Chip (Radius = halbe Höhe, ca. 30 px hoch) mit weißem Label
  in ca. 15 px. Das ist die einzige echte Pillenform auf der ganzen Site — alle Buttons
  sind eckig-gerundet, nur dieses Badge ist eine Pille.
  (b) Darunter außerhalb des Bildes eine Datenzeile: zwei Werte nebeneinander (Modulzahl
  und Leistung) in ca. 22 px Semibold Anthrazit, mit einer großen Lücke von ca. 65 px
  dazwischen statt eines Trenners.
  (c) Darunter eine Herstellerzeile mit kleinem grauem Modul-Linien-Icon und Label in
  ca. 14 px Regular Grau.
  Kein Button, kein Link-Pfeil, keine Karte um das Ganze — Bild und Text stehen nackt
  auf der Fläche.
- Typo: H2 ca. 40 px Bold zentriert zweizeilig. Innerhalb der Datenzeile trägt die Zahl
  Semibold und die Einheit („Module", „kWp") ebenfalls Semibold, aber im selben Grad —
  hier gibt es also **keinen** Einheiten-Downstep wie bei den Bento-Zahlkacheln (21).
- Farbe/Fläche: Hellgraue Sektionsfläche. Absolut kein Rot im gesamten Raster — über
  mehrere Bildschirmhöhen hinweg trägt keine Kachel einen Akzent. Das ist die längste
  akzentfreie Strecke der Site.
- Abstände/Rhythmus: Ca. 25 px Gasse zwischen den Kacheln, ca. 18 px zwischen Bild und
  Datenzeile, ca. 8 px zwischen Datenzeile und Herstellerzeile, ca. 55 px vertikal
  zwischen den Kachelreihen. Die letzte Reihe (`referenzen-desktop-06-y3750.png`) hat
  nur zwei Kacheln und lässt die dritte Spalte leer stehen — kein Umverteilen, kein
  Zentrieren.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-GALLERY` — Kandidat für die konkrete Form: Projektraster mit Pillen-Badge
  und zweiwertiger Datenzeile

### 29 — Einzugsgebiet-Karte (Wiederholung) [referenzen-desktop-06-y3750.png | -]
- Identisch zu Sektion 11 der Startseite: gleiche hellgraue Karte mit ca. 24 px Radius,
  gleicher Text, gleiche drei Häkchen-Zeilen, gleicher roter CTA, gleiche rote
  Schweiz-Silhouette mit weißem Kreuz und gleiches Rauten-Hintergrundmuster. Einziger
  Unterschied: hier liegt die Karte auf **weißer** Fläche statt auf Weiß mit grauem
  Vorlauf — optisch identisch.
- Pattern: wie 11.

### 30 — FAQ-Akkordeon, dreizeiliger Titel [referenzen-desktop-06-y3750.png | -]
- Anordnung: Wie Sektion 15 der Startseite — schmale linke Titelspalte, rechts die
  Akkordeon-Zeilen. Unterschied: der Titel bricht hier auf **drei** Zeilen statt zwei
  und steht komplett in Anthrazit; der Helligkeits-Split der Startseite („Energiekonzept"
  hellgrau über „FAQ" dunkel) entfällt. Die Hinweiszeile mit unterstrichenem Textlink ist
  identisch.
- Buttons/Komponenten: gleiche Akkordeon-Zeilen in Hellgrau mit ca. 16 px Radius,
  gleicher Zustandswechsel graues Plus → roter Kreis mit weißem Kreuz, gleicher grauer
  Abbiege-Pfeil (↳) vor der Antwort.
- Typo: Titel ca. 34 px Bold dreizeilig, Fragen ca. 17 px Semibold, Antworttext ca.
  15 px Regular Grau.
- Farbe/Fläche: Weiß, Zeilen hellgrau, Rot nur im offenen Zustands-Kreis.
- Abstände/Rhythmus: wie 15.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-FAQ`, Variante ohne Titel-Helligkeitssplit.

### 31 — Schluss-CTA und Footer (Wiederholung) [referenzen-desktop-08-y5250.png | -]
- Wie Sektion 16 und 17. Der Slice `referenzen-desktop-08-y5250.png` ist im Rahmen
  dieser Studie nicht per Read geöffnet worden; die Wiederholung ist über
  `produkte__solarmodul-desktop-07-y4443.png` als Site-Muster belegt, für /referenzen
  selbst aber **nicht belegt**.
- Pattern: wie 16 und 17.

## Seite: /anfrage

Die Funnel-Seite bricht als einzige Route mit dem Site-Aufbau: **kein Marquee, kein
Hero-Foto, kein Eyebrow-Signet im Kopf**. Der Header steht sofort im weißen
Sticky-Zustand, direkt darunter beginnt weiße Fläche. Die Seite ist mit ca. 3'790 px
Desktop-Gesamthöhe die kürzeste der Site und trägt genau vier Sektionen vor dem Footer.

### 32 — Header im Weiß-Zustand ohne Marquee [anfrage-desktop-00-fold.png | anfrage-mobile-00-fold.png]
- Wie Sektion 02, aber ohne das Laufband aus Sektion 01 darüber: Die Leiste sitzt bei
  y=0 und trägt von Anfang an weiße Fläche, dunkle Schrift und die 1 px hellgraue
  Unterkante — es gibt auf dieser Route keinen transparenten Zustand, weil kein Foto
  dahinter liegt. Logo, sechs Nav-Labels, Chevron an „Photovoltaik", Button-Paar
  „Support" (hellgrau) und „Jetzt Offerte sichern" (rot, gemessen `#e93323`) sind
  identisch zu Sektion 02.
- Mobil (`anfrage-mobile-00-fold.png`): Logo links, Burger rechts, ebenfalls ohne
  Marquee — der mobile Fold beginnt damit ca. 34 px höher als auf allen anderen Routen.
- Pattern: wie 02, Variante ohne Laufband und ohne Transparenzphase.

### 33 — Funnel-Kopf mit Trust-Zeile [anfrage-desktop-00-fold.png | anfrage-mobile-00-fold.png]
- Anordnung: Vollständig **zentriert** auf weißer Fläche, ohne Band, ohne Karte, ohne
  Container-Rahmen. Drei gestapelte Ebenen: H1 mittig, zweizeilige Subline mittig auf
  ca. 400 px Breite, darunter eine horizontale Trust-Zeile aus drei Punkten. Die
  Trust-Punkte sind auf ca. 730 px verteilt und untereinander mit großen Lücken (ca.
  65 px) statt Trennern gesetzt.
- Buttons/Komponenten: keine Buttons in dieser Ebene. Die Trust-Punkte tragen je einen
  **runden** roten Häkchen-Chip (ca. 24 px, vollrund, gemessen `#e93323`) plus Label
  rechts daneben. Das ist die Rundvariante der sonst quadratisch-gerundeten
  Standard-Checkmark aus Sektion 07 — dieselbe Farbe, andere Form. Kein Eyebrow, kein
  Signet: die einzige Seite, deren Kopf ohne das Rautenkreuz auskommt.
- Typo: H1 ca. 40 px Bold Anthrazit einzeilig, mittig. Subline ca. 16 px Regular in
  Mittelgrau, zweizeilig. Trust-Labels ca. 15 px Regular Anthrazit. Verhältnis H1 zu
  Subline grob 2,5:1 (geschätzt). Nur zweistufig plus Labels — flacher als die
  vierstufige Hero-Typo der Startseite.
- Farbe/Fläche: Reinweiß (gemessen `#ffffff`). Rot sitzt ausschließlich in den drei
  Häkchen-Chips. Kein Foto, kein Verlauf, keine Fläche — der stärkste Bruch zum
  fotolastigen Rest der Site.
- Abstände/Rhythmus: Ca. 65 px vom Header zur H1, ca. 30 px H1 zu Subline, ca. 30 px
  Subline zur Trust-Zeile, ca. 35 px von dort zur Tab-Leiste darunter.
- Mobil (`anfrage-mobile-00-fold.png`): H1 bricht auf zwei Zeilen bei ca. 30 px, die
  Subline auf drei Zeilen. Die **Trust-Zeile mit den drei Häkchen entfällt mobil
  ersatzlos** — aus dem Fold verschwindet damit das einzige rote Element oberhalb des
  Formulars. Tab-Leiste rückt direkt unter die Subline.
- Pattern: Kandidat: Zentrierter Funnel-Kopf mit runder Häkchen-Trustzeile

### 34 — Vierschritt-Funnel mit Tab-Fortschritt [anfrage-desktop-00-fold.png | anfrage-mobile-00-fold.png]
- Anordnung: Das Kernstück der Route, dreiteilig und durchgehend zentriert.
  (a) Eine Fortschrittsleiste aus vier nebeneinanderliegenden Schritt-Labels („Frage 1"
  bis „Frage 4") auf ca. 425 px Gesamtbreite, darunter eine durchgehende 1 px hellgraue
  Linie über die volle Leistenbreite.
  (b) Darunter die Fragezeile, mittig, einzeilig.
  (c) Darunter zwei gleich große Antwortkacheln nebeneinander, dann der Weiter-Button.
  Die Antwortkacheln sind ca. 200×130 px, die Gasse zwischen ihnen ca. 18 px.
- Buttons/Komponenten: Drei Bauteile.
  *Fortschritts-Tab*: kein Chip, keine Fläche — nur Text plus eine ca. 2 px dicke
  **Anthrazit-Unterstreichung** unter dem aktiven Schritt, die als kurzes Segment auf
  der grauen Grundlinie sitzt. Der aktive Zustand ist damit rein typografisch und
  **nicht rot** — der einzige aktive Zustand der Site, der ohne die Akzentfarbe auskommt
  (Kontrast zu den roten Tab-Chips in Sektion 08).
  *Antwortkachel*: hellgraue Fläche (gemessen `#f6f6f6`), Radius ca. 14 px, ohne Kontur
  und ohne Schatten. Innen ein großes dünnes Linien-Glyph zentriert (Häkchen für „Ja",
  Kreuz für „Nein") in Anthrazit, darunter das Label. Die Glyphen sind ca. 46 px groß und
  ungewöhnlich fein gestrichen — kein gefüllter Chip, keine Radio-Optik, kein
  Auswahlzustand in irgendeinem Shot sichtbar (nicht belegt).
  *Weiter-Button*: rot gefüllt (gemessen `#e93323`), Radius ca. 8 px, ca. 48 px hoch und
  ca. 400 px breit — er läuft damit über die volle Breite des Kachelpaars. Als einziger
  Button der ganzen Site trägt er ein **Icon rechts vom Label** (Pfeil nach rechts),
  Abstand Label zu Pfeil ca. 14 px.
- Typo: Fragezeile ca. 26 px Bold Anthrazit mittig. Schritt-Labels ca. 16 px, aktiver
  Schritt Semibold in Anthrazit, inaktive Regular in Hellgrau (gemessen um `#b3b3b3`) —
  wieder Hierarchie über Helligkeit plus Weight statt über Farbe. Kachel-Labels ca. 15 px
  Semibold. Button-Label ca. 16 px Semibold weiß.
- Farbe/Fläche: Weiß, Kacheln hellgrau. Rot trägt genau eine Rolle: den Weiter-Button.
  Die Auswahl selbst bleibt vollständig neutral — Signalfarbe nur auf dem Vorwärtsweg.
- Abstände/Rhythmus: Ca. 40 px von der Fortschrittslinie zur Frage, ca. 40 px von der
  Frage zu den Kacheln, ca. 40 px von den Kacheln zum Button. Sehr gleichmäßiger
  40-px-Takt — der ruhigste Rhythmus der Site.
- Mobil (`anfrage-mobile-00-fold.png`): Die vier Schritt-Labels bleiben **einzeilig
  nebeneinander** und schrumpfen nicht — sie füllen die Breite von Rand zu Rand aus. Die
  Fragezeile bricht auf zwei Zeilen. Die beiden Antwortkacheln bleiben **nebeneinander**
  statt zu stapeln, werden aber flacher (ca. 105 px). Der Weiter-Button läuft mobil über
  die volle Inhaltsbreite. Der komplette Funnel passt damit in den ersten Screen.
- Pattern: Kandidat: Vierschritt-Funnel mit Texttab-Fortschritt und Zweier-Wahlkacheln

### 35 — Trust-Badge-Dreier [anfrage-desktop-00-fold.png | anfrage-desktop-02-y750.png | anfrage-mobile-03-y844.png]
- Anordnung: Zentrierte einzeilige Überschrift, darunter drei gleich breite Karten
  nebeneinander (je ca. 230 px, Gasse ca. 30 px), zusammen mittig auf ca. 755 px. Jede
  Karte ist zweiteilig: oben eine Bildmarke (Fremdlogo), unten zweizeiliger
  Beschreibungstext. Die Karten sind unterschiedlich gefüllt — die dritte trägt zwei
  gestapelte Logos (Buderus, Ecoflow) statt einem.
- Buttons/Komponenten: keine Buttons, keine Häkchen, keine Links. Die Karten sind reine
  Flächen: hellgrau (gemessen `#f6f6f6`), Radius ca. 16 px, ohne Kontur und ohne
  Schatten. Die Fremdlogos stehen **farbecht** darauf (EUPD-Siegel in Grün/Silber, Google
  in Blau-Rot-Gelb-Grün mit goldener Sternreihe, Buderus in Blau) — das ist die einzige
  Stelle der Site mit Fremdfarben in dieser Dichte; sonst sind Partnerlogos entsättigt
  oder weiß (vgl. Sektion 03).
- Typo: Überschrift ca. 28 px Bold Anthrazit mittig — deutlich kleiner als die H2 der
  übrigen Sektionen (dort ca. 38–42 px). Kartentext ca. 14 px Regular Mittelgrau,
  zentriert, zweizeilig.
- Farbe/Fläche: Weiß, Karten hellgrau. **Kein Rot** in der gesamten Sektion.
- Abstände/Rhythmus: Ca. 145 px vom Weiter-Button zur Überschrift — die größte Lücke der
  Seite, sie trennt Funnel und Beweisteil deutlich. Ca. 45 px von der Überschrift zu den
  Karten, Karten-Innenabstand ca. 28 px.
- Mobil (`anfrage-mobile-03-y844.png`): Die drei Karten bleiben **nebeneinander** statt
  zu stapeln und werden auf ca. 106 px Breite gequetscht. Der Kartentext bricht dadurch
  auf drei bis vier sehr kurze Zeilen, und die erste Karte wird oben angeschnitten
  („n mit bis zu / 40 Jahren / Garantie" — der Zeilenanfang fehlt). Sichtbarer
  Textbeschnitt bei 390 px.
- Pattern: Kandidat: Dreier-Trustkarten mit farbechten Fremdlogos

### 36 — Vorteile-Dreier hell mit Nummern-Akkordeon [anfrage-desktop-02-y750.png | anfrage-desktop-03-y1500.png | anfrage-mobile-03-y844.png]
- Anordnung: Vollbreites Band auf hellgrauer Fläche (gemessen `#f5f5f5`), ca. 870 px
  hoch. Kopf zentriert (Eyebrow mit Signet, zweizeilige H2, dreizeilige Subline auf ca.
  445 px). Darunter zweispaltig: links ein hochformatiges Foto (ca. 570×410 px, Radius
  ca. 16 px), rechts eine gestapelte Nummernliste aus drei Zeilen, jede von einer 1 px
  hellgrauen Linie unten abgeschlossen — die dritte Linie schließt die Liste ab, es gibt
  also vier Linien bei drei Einträgen.
- Buttons/Komponenten: keine Buttons. Der Kern ist der **Nummern-Chip**: ein
  quadratisch-gerundetes Feld (ca. 36 px, Radius ca. 8 px) links vor dem Titel. Der Chip
  der ersten, aufgeklappten Zeile ist rot gefüllt (gemessen `#e93323`) mit weißer Ziffer,
  die Chips der beiden geschlossenen Zeilen sind hellgrau gefüllt mit dunkler Ziffer.
  Die erste Zeile zeigt zusätzlich einen vierzeiligen Antworttext unter dem Titel; die
  anderen beiden tragen nur den Titel. Ein Plus/Kreuz- oder Chevron-Indikator fehlt
  vollständig — der Zustand wird **allein über die Chipfarbe und die Zeilenhöhe** gesetzt,
  anders als beim FAQ-Akkordeon (15), das Form und Farbe wechselt.
- Typo: H2 zweizeilig ca. 40 px Bold mit dem **Helligkeits-Split** der Site: Zeile 1
  („3 Dinge, die wir") in Hellgrau (gemessen `#b3b3b3`), Zeile 2 („anders machen") in
  Anthrazit — dasselbe Muster wie im FAQ-Titel (15) und in der Produkt-Einleitung (19),
  hier zum dritten Mal belegt. Subline ca. 16 px Regular Mittelgrau zentriert.
  Zeilentitel ca. 20 px Semibold, offener Titel identisch gesetzt zu den geschlossenen —
  **kein** typografischer Zustandsunterschied. Antworttext ca. 15 px Regular Mittelgrau.
- Farbe/Fläche: Hellgraues Band auf Weiß. Rot in genau zwei Rollen: Eyebrow-Signet und
  aktiver Nummern-Chip.
- Abstände/Rhythmus: Ca. 90 px Bandpadding oben, ca. 80 px vom Kopf zum Zweispalter, ca.
  65 px Spaltengasse, ca. 20 px vom Chip zum Titel. Die geschlossenen Zeilen sind ca.
  84 px hoch, die offene ca. 205 px.
- Mobil (`anfrage-mobile-03-y844.png`): Kopf bleibt zentriert, der Helligkeits-Split der
  H2 bleibt erhalten. Foto und Liste **stapeln**, das Foto steht oben und läuft über die
  volle Inhaltsbreite. Die Subline bricht auf vier Zeilen.
- Pattern: Kandidat: Helles Vorteile-Band mit Nummern-Chip-Akkordeon ohne Zustandsicon

### 37 — Kundenstimmen als regelmäßiges Sechserraster [anfrage-desktop-03-y1500.png | anfrage-desktop-04-y2250.png | -]
- Anordnung: Linksbündiger Kopf (Eyebrow mit Signet, H2 zweizeilig, zweizeiliger
  Fließtext) — die rechte Hälfte bleibt leer wie in Sektion 13. Darunter aber ein
  **striktes 3×2-Raster** aus sechs gleich großen Kacheln (je ca. 445×500 px, Gasse ca.
  35 px) statt des Reissverschluss-Mosaiks der Startseite. Unter dem Raster eine
  zentrierte Google-Zeile.
- Buttons/Komponenten: Jede Kachel ist eine Fotokachel mit Radius ca. 20 px und einem
  Zustands-Chip oben rechts: halbtransparenter grauer Kreis (ca. 44 px) mit weißem Plus
  bei geschlossenen, weißem Kreuz bei geöffneten Kacheln — dieselbe Mechanik wie in
  Sektion 13. Drei der sechs Kacheln sind im Shot **geöffnet**: bei ihnen liegt ein
  starker grauer Schleier über dem Foto, darauf das Zitat. Der Schleier ist so dicht,
  dass Name und Foto darunter nur noch schemenhaft durchkommen — die Namenszeile der
  offenen Kacheln ist entsprechend schwach lesbar (Overlay). Fünf goldgelbe Sterne sitzen
  über dem Zitat bzw. über der Namenszeile; sie sind wieder die einzige zweite Farbe.
  Kein Play-Kreis, keine Vorschaureihe — die Videokachel der Startseite fehlt hier.
- Typo: H2 ca. 40 px Bold zweizeilig linksbündig, Fließtext ca. 15 px Regular Grau.
  Zitattext ca. 21 px Semibold weiß — deutlich größer als der Zitattext der Startseite
  (dort ca. 14 px), weil er hier auf dem Foto statt in einer grauen Textkachel steht.
  Namen ca. 20 px Semibold weiß, Ortszeile ca. 14 px Regular weiß darunter.
- Farbe/Fläche: Weiß, Kacheln vollflächig Foto bzw. Foto plus grauer Schleier. **Kein
  Rot** außer im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 100 px vom Kopf zum Raster, ca. 35 px Gasse, Kachel-Innenabstand
  ca. 24 px. Ca. 75 px vom Raster zur Google-Zeile.
- Google-Zeile: farbechtes Google-„G" links, rechts daneben zweistufig „Und 130+ weitere"
  ca. 22 px Semibold über einer Sternreihe plus Wertung in ca. 14 px. Kein Button, keine
  Fläche, kein Rahmen.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-TESTIMONIAL` — Variante als regelmäßiges Raster statt Mosaik.

### 38 — Footer ohne Schluss-CTA [anfrage-desktop-04-y2250.png | anfrage-desktop-05-y3000.png | -]
- Der dreietagige Schiefer-Footer aus Sektion 17, unverändert in Aufbau, Farbe und
  Maßen: Vierspalten-Raster mit Logo, Claim, drei Standortadressen und Social-Icons,
  zwei roten Spaltenüberschriften („Unternehmen", „Produkte"), Ansprechpartner-Einheit
  mit rundem Porträt, rotem CTA „Offerte anfordern" und zwei Kontaktzeilen; darunter die
  drei Blog-Karten; unten die Schlusszeile mit Copyright, Rechtslinks, „Umgesetzt
  von"-Kredit in roter Wortmarke und drei Ortsnamen.
- Einziger, aber deutlicher Unterschied zu allen anderen Routen: **die Schluss-CTA-Sektion
  (16) fehlt komplett**. Das Kundenstimmen-Raster geht direkt in den Footer über. Das ist
  konsequent — die Seite ist selbst der Funnel und braucht keinen zweiten Weg dorthin.
- Nicht lesbar: dieselben zwei abgeschnittenen Linklabels wie in Sektion 17
  („Referenze", „Energiemanagementsystem" ohne Endung).
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 17, ohne vorangehendes `P-CTA-END`.

## Seite: /ueber-uns

Mit ca. 7'880 px Desktop-Höhe die längste Route der Site. Der Aufbau ist ungewöhnlich
kopflastig: nach Hero, Kennzahlen, Bento und Einzugsgebiet folgt ab ca. y=2'500 px eine
einzige, über fünf Bildschirmhöhen laufende Team-Strecke aus vier Gruppen.

### 39 — Team-Hero mit Gruppenfoto [ueber-uns-desktop-00-fold.png | ueber-uns-mobile-00-fold.png]
- Anordnung: Marquee (wie Sektion 01) und transparenter Header (wie Sektion 02) über
  einem vollbreiten Gruppenfoto von sechs Mitarbeitenden in Firmenpolo vor Grün. Das Band
  ist ca. 755 px hoch und damit das zweithöchste der Site nach dem Referenz-Hero. Der
  H1-Block steht linksbündig ab 60 px im **unteren Drittel**, die Personengruppe steht
  mittig-rechts dahinter. Anders als beim Startseiten-Hero überlappt der Text hier die
  Personen nicht: er endet links neben ihnen.
- Buttons/Komponenten: **kein CTA**, keine Eyebrow, keine Lead-Zeile. Der einzige Weg
  aus dem Fold ist der Header-CTA — dieselbe Reduktion wie beim Produkt-Hero (18), aber
  hier bei ungleich größerer Bandhöhe. Rechts unten auf dem Foto sitzt eine einzelne
  Partner-Bildmarke (Swissolar, weiß) mit der Unterzeile „Offizielles Mitglied", ohne
  Kasten und ohne Leiste.
- Typo: Einstufig. H1 ca. 46 px Bold weiß über **vier** Zeilen — die längste Überschrift
  der Site, sie nimmt allein ca. 210 px Höhe ein. Der Gedankenstrich am Ende von Zeile 2
  ist ein gesetzter Halbgeviertstrich, kein Umbruchartefakt. Partner-Unterzeile ca. 13 px
  Regular in gebrochenem Weiß.
- Farbe/Fläche: Helles, sommerlich-bewölktes Foto — noch heller als der Referenz-Hero.
  Entsprechend liegt ein kräftiger dunkler Zonenverlauf über der linken unteren Hälfte,
  der nach rechts hin ausläuft. Rot nur im Marquee, im Header-CTA und im Logo-Signet.
- Abstände/Rhythmus: Ca. 370 px Foto über der H1, ca. 60 px von der H1-Unterkante zur
  Bandkante. Der obere Bildbereich (Himmel und Baumkronen) bleibt vollständig frei.
- Mobil (`ueber-uns-mobile-00-fold.png`): Der Hero ist ca. 480 px hoch, das Foto auf die
  Personengruppe zugeschnitten. Die H1 ist **inhaltlich verkürzt** auf zwei Zeilen
  („Zukunft beginnt / mit AlpenEnergie") — also nicht nur anders umbrochen, sondern eine
  eigene kurze Fassung; die Vorderteile „Photovoltaik & Wärmepumpe Spezialist – Ihre
  Energie…" fehlen. Die Swissolar-Marke rutscht unter die H1 und wird linksbündig, mit
  der Unterzeile **links** vom Logo statt darunter. Das Marquee ist wie üblich
  rechtsseitig angeschnitten („Rabatt auf Ko").
- Pattern: `P-HERO-PHOTO` — Variante ohne jeden Fold-CTA und ohne Lead.

### 40 — Kennzahlen-Zeile hell, dreiteilig [ueber-uns-desktop-00-fold.png | ueber-uns-desktop-02-y750.png | ueber-uns-mobile-00-fold.png]
- Anordnung: Wie Sektion 27 auf /referenzen: links Eyebrow, H2 und zweizeilige Subline
  in ca. 350 px Breite, rechts drei Kennzahlen in einer Reihe (Spaltenstart ca. 560/770/
  980 px). Kein Band, kein Flächenwechsel, die Sektion sitzt direkt auf Weiß. Der
  Textblock links ist hier schmaler als auf /referenzen, dadurch steht rechts der dritten
  Kennzahl ca. 350 px Leerfläche.
- Buttons/Komponenten: keine. Kennzahlen kartenlos, ohne Trennlinien.
- Typo: Kennzahlen ca. 42 px Bold Anthrazit, Labels ca. 15 px Regular Mittelgrau. H2
  „Unsere Erfolge" ca. 38 px Bold. Subline ca. 15 px Regular Mittelgrau zweizeilig. Die
  Zahlen setzen das „+" im selben Grad und Gewicht wie die Ziffer — **kein**
  Einheiten-Downstep wie bei den Bento-Zahlkacheln (21).
- Farbe/Fläche: Weiß. Rot nur im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 115 px Sektionspadding oben, ca. 12 px zwischen Zahl und Label,
  ca. 210 px zwischen den Kennzahlspalten, ca. 230 px von der Zeile bis zum Bento
  darunter.
- Mobil (`ueber-uns-mobile-00-fold.png`): Der Kopf bleibt linksbündig, die drei
  Kennzahlen **stapeln** untereinander in voller Breite. Der Eyebrow verliert das Komma
  („ZAHLEN DIE ÜBERZEUGEN" statt „ZAHLEN, DIE ÜBERZEUGEN") — sichtbarer Textunterschied
  zur Desktop-Fassung, keine Umbruchfolge.
- Pattern: wie 27.

### 41 — Werte-Bento aus sechs versetzten Kacheln [ueber-uns-desktop-02-y750.png | ueber-uns-desktop-03-y1500.png | ueber-uns-mobile-06-y2110.png]
- Anordnung: Dreispaltiges Bento über zwei Reihen, versetzt wie in Sektion 21, aber mit
  einer anderen Taktung: Spalte 1 hat oben eine hohe Fotokachel (ca. 430×415 px) und
  unten eine flache Textkachel; Spalte 2 dreht es um (oben flache Textkachel, unten hohe
  Fotokachel); Spalte 3 wiederholt Spalte 1. Jede Fotokachel hat also genau eine
  Textkachel als Partner, die Paare sind über die Spalten hinweg gegeneinander versetzt.
  Sechs Kacheln, drei Paare, keine fluchtende Zeile.
- Buttons/Komponenten: keine Buttons. Zwei Bauarten:
  *Fotokachel* — Foto vollflächig, Radius ca. 20 px, mit einem dünnen weißen Linien-Icon
  (Personen-Häkchen, Schild, Kalender) zentriert über einem weißen Titel darunter; ein
  dunkler Zonenverlauf hält beides lesbar. Die mittlere Kachel („Höchste
  Qualitäts-Standards") ist nicht foto- sondern **studiodunkel** (gemessen um `#0d0f0f`)
  und damit die dunkelste Fläche der Route.
  *Textkachel* — hellgrau (gemessen `#f5f5f5`), Radius ca. 20 px, reiner Fließtext
  linksbündig, kein Titel. Titel und Text sind also auf **zwei getrennte Kacheln**
  verteilt — die Kachel trägt die Überschrift, die Nachbarkachel die Erklärung. Das ist
  die auffälligste Layout-Idee der Route und trennt Bento hier klar von Sektion 21, wo
  jede Kachel für sich stand.
- Typo: Kacheltitel ca. 30 px Bold weiß, zweizeilig zentriert. Kacheltext ca. 15 px
  Regular Mittelgrau über vier Zeilen. Kein Eyebrow, keine Sektions-H2 — das Bento steht
  ohne eigenen Kopf direkt unter den Kennzahlen.
- Farbe/Fläche: Weiß, Kacheln hellgrau oder Foto. **Kein Rot** in der gesamten Sektion —
  über ca. 620 px Höhe trägt keine Kachel einen Akzent.
- Abstände/Rhythmus: Ca. 18 px Gasse zwischen den Kacheln, identisch zum Produkt-Bento
  (21) und enger als das 25-px-Karten-Spacing der Startseite. Karten-Innenabstand ca.
  36 px.
- Mobil (`ueber-uns-mobile-06-y2110.png`): Das Bento klappt auf **eine Spalte**. Die
  Paarung Titelkachel/Textkachel bleibt erhalten und wird zur Abfolge Foto-oben,
  Text-darunter — mobil liest sich das Muster damit als klassische Bild-Text-Folge, die
  versetzte Idee geht vollständig verloren. Fotokacheln ca. 260 px hoch, Titel ca. 22 px.
- Pattern: Kandidat: Bento mit getrennten Titel- und Textkacheln

### 42 — Einzugsgebiet-Karte (Wiederholung) [ueber-uns-desktop-03-y1500.png | -]
- Wie Sektion 11 der Startseite: hellgraue Karte mit ca. 24 px Radius auf Weiß, links
  H2 zweizeilig, zweizeilige Subline, drei Häkchen-Zeilen mit dem quadratisch-gerundeten
  roten Chip (gemessen `#e93323`) und der rote CTA „Jetzt Offerte sichern"
  (gemessen `#e93323`); rechts die rote Schweiz-Silhouette mit weißem Kreuz vor dem
  hellgrauen Rauten-Hintergrundmuster, rechts weich ausgeblendet.
- Einziger Unterschied zur Startseite: Die Karte ist hier etwas flacher (ca. 455 px) und
  die Silhouette reicht weiter nach unten über die Kartenkante hinaus, wo sie in
  `ueber-uns-desktop-04-y2250.png` noch als roter Rest über der Kartenoberkante sichtbar
  ist.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 11.

### 43 — Team-Strecke, vier Gruppen im Vierer-Raster [ueber-uns-desktop-04-y2250.png | ueber-uns-desktop-06-y3750.png | ueber-uns-desktop-08-y5250.png | ueber-uns-desktop-10-y6750.png | -]
- Anordnung: Die längste zusammenhängende Sektion der Site, ca. 5'100 px hoch. Zuerst
  ein zentrierter Sektionskopf (H2 einzeilig, zweizeilige Subline mittig auf ca. 540 px),
  darunter vier nacheinander laufende Gruppen, jede eingeleitet von einer **zentrierten
  Gruppenüberschrift** („Geschäftsführung", „Projektleitung", „Backoffice", „Montage &
  Installation"). Jede Gruppe ist ein vierspaltiges Raster aus Porträtkacheln; die letzte
  Reihe jeder Gruppe bleibt links angeschlagen und lässt die restlichen Spalten leer —
  bei „Geschäftsführung" stehen so zwei Kacheln neben zwei leeren Spalten, bei „Montage
  & Installation" endet die Strecke mit einer einzelnen Kachel. Kein Umverteilen, kein
  Zentrieren der Restreihe — dasselbe Verhalten wie im Projektraster (28).
- Buttons/Komponenten: Die Porträtkachel ist konsequent nackt: Bild (ca. 258×230 px,
  Radius ca. 16 px), darunter außerhalb des Bildes Name und Rolle. Keine Karte, kein
  Rahmen, kein Schatten, **kein Hover-Zustand belegt**, kein Link-Pfeil, keine
  Social-Icons, keine Mailadresse. Die Porträts sind uneinheitlich freigestellt: teils
  Studiohintergrund in Hellgrau, teils Hellblau, teils Außenaufnahmen vor Baustelle oder
  Ziegeldach. Das Raster nimmt diese Uneinheitlichkeit ungefiltert auf — es gibt keine
  vereinheitlichende Tönung.
- Typo: Sektions-H2 ca. 36 px Bold mittig. Gruppenüberschriften ca. 32 px Bold mittig,
  also nur eine Spur kleiner als die Sektions-H2 — die Hierarchie zwischen Sektion und
  Gruppe ist typografisch sehr flach. Namen ca. 18 px Semibold Anthrazit, Rollen ca.
  15 px Regular Mittelgrau. Lange Namen und lange Rollen brechen zweizeilig um („Michael
  Lämmermann", „Dipl. Wirtschaftsingenieur FH / Energieberater") und verschieben die
  Grundlinie der Nachbarkacheln nicht — die Zeilen stehen dann ungleich hoch.
- Farbe/Fläche: Durchgehend Weiß. **Kein Rot auf der gesamten Strecke** — über ca.
  5'100 px hinweg trägt kein Element die Akzentfarbe. Das ist die mit Abstand längste
  akzentfreie Passage der Site, länger noch als das Projektraster auf /referenzen (28).
- Abstände/Rhythmus: Ca. 30 px Gasse zwischen den Porträtkacheln, ca. 16 px zwischen Bild
  und Name, ca. 6 px zwischen Name und Rolle, ca. 60 px vertikal zwischen den
  Kachelreihen. Zwischen dem Ende einer Gruppe und der nächsten Gruppenüberschrift liegen
  ca. 120 px — die Gruppen sind allein über diesen Abstand getrennt, es gibt keine
  Trennlinie und keinen Flächenwechsel.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: `P-GALLERY` — Kandidat für die konkrete Form: Gruppiertes Team-Raster mit
  nackten Porträtkacheln

### 44 — Schluss-CTA und Footer (Wiederholung) [ueber-uns-desktop-10-y6750.png | -]
- Wie Sektion 16 und 17: dasselbe Rendering-Band mit Eyebrow „WIR BERATEN SIE!" plus
  Signet, H2 „Bereit für Ihre Energiewende?", zweizeiliger Subline, rotem CTA „Jetzt
  Offerte anfordern" und der dreiteiligen Trust-Zeile mit Punkt-Trennern; danach der
  dreietagige Schiefer-Footer.
- Der Slice zeigt den CTA-Bandanfang; der Footer selbst liegt in
  `ueber-uns-desktop-12-y7883.png` und ist im Rahmen dieser Studie nicht per Read
  geöffnet worden — für /ueber-uns damit **nicht belegt**, als Site-Muster aber über
  Sektion 17 und 38 gesichert.
- Pattern: wie 16 und 17.

## Seite: /projekte/rolf-r.

Die kürzeste Route im Satz: Desktop endet bereits bei `projekte__rolf-r.-desktop-03-y1076.png`,
die eigentliche Inhaltsstrecke ist nur ca. 1'000 px hoch, danach folgen sofort Schluss-CTA und
Footer. Header wie Sektion 02, aber **im weißen Zustand schon im Fold** — siehe 45.

### 45 — Header im Weiß-Zustand ohne Marquee [projekte__rolf-r.-desktop-00-fold.png | projekte__rolf-r.-mobile-00-fold.png]
- Anordnung: Wie Sektion 02, aber ohne das rote Marquee-Band darüber und ohne
  Transparenz-Phase: Die Leiste startet weiß, Logo links bei ca. 60 px, Nav ab ca. 517 px,
  Buttonpaar bis ca. 1380 px, darunter eine 1 px hellgraue Unterkante über die volle Breite
  bei ca. y 96. Das ist derselbe Weiß-Zustand wie auf /anfrage (Sektion 32) — Detailseiten
  verzichten offenbar generell auf das Aktionsband.
- Buttons/Komponenten: unverändert „Support" hellgrau gefüllt plus „Jetzt Offerte sichern"
  rot gefüllt, Radius ca. 8 px. Chevron nur an „Photovoltaik".
- Typo/Farbe/Abstände: wie 02, Leistenhöhe ca. 96 px inkl. Unterkante.
- Mobil: `projekte__rolf-r.-mobile-00-fold.png` zeigt nur Logo links und Burger rechts,
  Leiste weiß, Unterkante ebenfalls sichtbar; Leistenhöhe ca. 76 px.
- Pattern: wie 02, Variante ohne Marquee.

### 46 — Projekt-Kopf, gerahmtes Foto über Kennzahl-Titel [projekte__rolf-r.-desktop-00-fold.png | projekte__rolf-r.-mobile-00-fold.png]
- Anordnung: Kein Hero im Sinn der anderen Seiten. Statt eines vollbreiten Fotos liegt ein
  **eingerücktes** Bild im Container: linke Kante ca. 119 px, rechte ca. 1321 px, also ca.
  1'202 px breit bei ca. 400 px Höhe, Radius ca. 16 px an allen vier Ecken. Zwischen
  Header-Unterkante und Bildoberkante ca. 45 px. Darunter linksbündig der Titel, die
  Subline, dann mit großem Abstand ein Fließtext-Einzeiler und darunter eine
  Navigationszeile. Die rechte Seitenhälfte bleibt unter dem Bild vollständig leer — die
  ganze Textstrecke sitzt in der linken Spalte ab ca. 119 px.
- Buttons/Komponenten: Keine Buttons, keine Karten, kein Badge, kein Eyebrow-Signet — die
  einzige Seite ohne das rote Rautenkreuz im oberen Bereich. Unten eine reine
  Textnavigation aus zwei Nachbar-Links mit Chevron-Zeichen (`Juerg S. ›` links,
  `‹ Sivanayagam G.` rechts daneben), beide in Mittelgrau, ohne Rahmen, ohne Fläche, ohne
  Unterstrich. Auffällig: Beide Links stehen **linksbündig direkt nebeneinander** bei ca.
  119–336 px, nicht als Prev/Next-Paar an den Containerrändern verteilt, und die
  Chevron-Richtung passt nicht zur Leserichtung (der „›" steht beim linken Eintrag).
- Typo: Titel ca. 44 px Bold Anthrazit, einzeilig, mit einer ungewöhnlich breiten Lücke
  zwischen den beiden Angaben („11 Module" — ca. 30 px Leerraum — „5,12 kWp"), was wie ein
  zusammengesetztes Datenfeld ohne Trennzeichen aussieht. Subline ca. 16 px Regular in
  hellem Grau, geringer Kontrast. Fließtext ca. 15 px Regular Anthrazit. Navigationszeile
  ca. 15 px Regular Hellgrau. Verhältnis Titel zu Fließtext grob 2,9:1 (geschätzt).
- Farbe/Fläche: Durchgehend Weiß, **kein Rot in der gesamten Sektion** — auch nicht im
  Logo-Bereich der Seite außerhalb des Headers. Das Foto ist das einzige Farbfeld.
- Abstände/Rhythmus: Ca. 45 px Header bis Bild, ca. 55 px Bild bis Titel, ca. 20 px Titel
  bis Subline, dann ein auffällig großer Sprung von ca. 90 px bis zum Fließtext und
  weitere ca. 60 px bis zur Navigationszeile. Die zwei großen Lücken lassen die kurze
  Textstrecke ausgedünnt wirken.
- Mobil: `projekte__rolf-r.-mobile-00-fold.png` — gleiche Reihenfolge, Bild auf ca. 350 px
  Breite eingerückt (Rand je ca. 20 px) bei ca. 400 px Höhe, Radius wie Desktop. Titel
  bricht nicht, bleibt einzeilig bei ca. 30 px, die Lücke zwischen den beiden Angaben
  bleibt erhalten. Der Fließtext bricht zweizeilig und wird rechts vom Chat-Widget
  überlagert („Leistung." liegt teils unter dem Kreis). Das Chat-Widget liegt mobil ca.
  20 px vom rechten Rand und verdeckt dort Text — auf Desktop kollidiert es nicht.
- Pattern: Kandidat: Projekt-Detail als eingerücktes Foto mit Kennzahl-Titel

### 47 — Schluss-CTA auf Rendering (Wiederholung) [projekte__rolf-r.-desktop-02-y750.png | -]
- Wie Sektion 16: vollbreites Rendering-Band (helles Einfamilienhaus mit Solardach, Tesla
  in der Einfahrt), Textblock links ab ca. 60 px, Eyebrow „WIR BERATEN SIE!" mit rotem
  Rautenkreuz-Signet, H2 ca. 40 px Bold weiß, zweizeilige Subline, roter CTA „Jetzt
  Offerte anfordern" (Radius ca. 8 px, ca. 40 px hoch) und darunter die dreiteilige
  Trust-Zeile mit Punkt-Trennern („Kostenlos • Unverbindlich • In 2 Minuten ausgefüllt").
- Einziger Unterschied hier: Das Band ist mit ca. 500 px flacher als auf der Startseite und
  sitzt direkt an der Textstrecke, ohne trennende Weißfläche davor.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 16.

### 48 — Footer mit Blog-Teaser-Zeile [projekte__rolf-r.-desktop-03-y1076.png | -]
- Anordnung: Der dreietagige Schiefer-Footer aus Sektion 17, hier aber mit einer
  **zusätzlichen vierten Etage**: Unter dem Adress-/Link-Block und über der Rechtszeile
  liegt eine Reihe aus drei gleich breiten Blog-Teasern (je ca. 418 px breit, ca. 32 px
  Gasse). Diese Teaser-Zeile ist auf der Startseite (17) und auf /anfrage (38) nicht
  belegt und damit ein Footer-Ausbau der Detailseiten.
- Buttons/Komponenten: Jeder Teaser ist ein Bild (ca. 418×215 px, Radius ca. 12 px) mit
  darunterliegender Meta-Zeile und Titel — keine Karte, kein Rahmen, keine Fläche hinter
  dem Text, kein „Weiterlesen"-Link. Die Meta-Zeile setzt Datum und Lesedauer mit einem
  senkrechten Strich als Trenner („09.02.2026 | 6 Minuten"), also einem anderen Trenner
  als die Punkt-Trenner der Trust-Zeile. Rechts der Kontaktblock mit rundem Porträt
  (ca. 62 px, Kreis, weißer Ring), Name/Rolle und rotem Button „Offerte anfordern",
  darunter zwei Icon-Zeilen (Telefon-Hörer im Kreis, Brief-Icon) je ca. 24 px.
- Typo: Spaltenüberschriften „Unternehmen" und „Produkte" in **Rot** und Semibold ca. 16 px
  — die einzige Stelle im Footer, an der Rot als Textfarbe statt als Fläche auftritt.
  Links ca. 15 px Regular in gebrochenem Weiß, Claim-Zeile Semibold ca. 15 px,
  Standort-Überschriften Semibold, Adresszeilen Regular. Teaser-Meta ca. 14 px Regular,
  Teaser-Titel ca. 17 px Semibold weiß, zweizeilig umbrechend. Rechtszeile ca. 14 px.
- Farbe/Fläche: Schiefer-Blaugrau vollflächig, oben harte Kante gegen das Rendering-Band.
  Akzentrot in drei Punkten: Spaltenüberschriften, CTA-Button und das „MAKE"-Logo der
  Rechtszeile. Über der Rechtszeile eine 1 px Trennlinie in aufgehelltem Grau über die
  Containerbreite (ca. 60–1380 px).
- Abstände/Rhythmus: Ca. 120 px Oberkante bis Logo, ca. 130 px vom Adressblock bis zur
  Teaser-Zeile, ca. 60 px von den Teasern bis zur Trennlinie, ca. 35 px bis zur
  Rechtszeile. Die Rechtszeile ist dreigeteilt: links Copyright plus Impressum und
  Datenschutz, mittig „Umgesetzt von | MAKE", rechts drei Ortsangaben („Basel", „Aargau",
  „Zürich") ohne Link-Optik.
- Auffällig: Die Link-Labels „Referenzen" und „Energiemanagementsystem" sind in beiden
  gelesenen Shots **rechts angeschnitten** („Referenze", „Energiemanagementsystem" ohne
  Endzeichen) — die Spaltenbreite reicht für das längste Label nicht, ohne dass umbrochen
  wird.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 17, Variante mit Blog-Teaser-Etage.

## Seite: /kontakt

Kurze Route: Desktop endet bei `kontakt-desktop-05-y2615.png`. Aufbau Hero → Formular →
FAQ → Schluss-CTA → Footer. Header wie 02 im transparenten Fold-Zustand, mit Marquee
(anders als /projekte/rolf-r. und /anfrage).

### 49 — Kontakt-Hero mit Team-Gruppenfoto [kontakt-desktop-00-fold.png | kontakt-mobile-00-fold.png]
- Anordnung: Vollbreites Foto (sieben Mitarbeitende in schwarzen Firmen-Polos vor einer
  Fassade mit senkrecht montierten Solarmodulen), harte Unterkante bei ca. 758 px, darunter
  Weiß. Textblock linksbündig ab ca. 60 px in einer auf ca. 540 px begrenzten Spalte, die
  vertikal in der unteren Fotohälfte sitzt (Eyebrow ab ca. 362 px). Anders als im
  Startseiten-Hero (03) läuft die Textspalte **über die Personen** statt neben ihnen: die
  Köpfe der linken drei Personen stehen über der Textspalte, die H2 kreuzt Schultern und
  Oberkörper.
- Buttons/Komponenten: Genau **ein** CTA („Offerte anfordern"), rot gefüllt, weißes
  Semibold-Label, ca. 40 px hoch, Radius ca. 8 px, ca. 176 px breit — kein zweiter,
  sekundärer Button wie im Startseiten-Hero. Keine Partnerlogo-Reihe im Foto. Eyebrow
  „WIR BERATEN SIE!" in Caps ca. 13 px weiß, hier **ohne das rote Rautenkreuz-Signet**,
  das sonst überall davorsteht — die einzige Eyebrow im Satz ohne Signet.
- Typo: H1 ca. 38 px Bold weiß über drei Zeilen, enger Zeilenabstand; deutlich kleiner als
  die 52 px der Startseite, weil der Titel länger ist. Lead ca. 16 px Regular in
  gebrochenem Weiß über zwei Zeilen bis ca. 582 px. Verhältnis H1 zu Lead grob 2,4:1
  (geschätzt).
- Farbe/Fläche: Foto ist überwiegend dunkel (schwarze Polos, schwarze Modulfläche), links
  liegt eine zusätzliche Abdunkelung für die Textzone. Akzent nur im CTA. Das Foto ist
  merklich flacher belichtet als die Renderings der übrigen Seiten — es ist eine echte
  Aufnahme, keine Visualisierung.
- Abstände/Rhythmus: Ca. 300 px vom Header bis zur Eyebrow, ca. 25 px Eyebrow bis H1,
  ca. 30 px H1 bis Lead, ca. 40 px Lead bis CTA, darunter ca. 65 px Restfoto.
- Mobil: `kontakt-mobile-00-fold.png` zeigt ein **anderes Motiv** — nicht die Gruppe,
  sondern zwei Personen von hinten vor einer Fassaden-Solaranlage. Der Foto-Crop ist also
  nicht nur beschnitten, sondern ausgetauscht. Textspalte ab ca. 20 px, H1 bricht auf fünf
  Zeilen bei ca. 27 px, Lead vierzeilig, CTA in Inhaltsbreite (ca. 176 px), nicht
  vollbreit. Fotounterkante bei ca. 758 px.
- Pattern: `P-HERO-PHOTO`, Variante mit nur einem CTA und ausgetauschtem Mobil-Motiv.

### 50 — Kontaktformular, Zweispalter Text links / Felder rechts [kontakt-desktop-02-y750.png | -]
- Anordnung: Zweispaltig auf Weiß. Links ab ca. 60 px eine schmale Spalte (ca. 345 px) mit
  H2, dreizeiligem Fließtext und zwei Kontaktblöcken; rechts ab ca. 487 px das Formular bis
  ca. 1358 px, also ca. 871 px breit — das Formular bekommt gut 2,5-mal so viel Breite wie
  die Textspalte. Die beiden Spalten sind **oben bündig**, aber unterschiedlich hoch; unter
  der linken Spalte bleiben ca. 300 px leer.
- Buttons/Komponenten: Fünf Felder in vier Zeilen, kein Fieldset, keine Labels über den
  Feldern — nur Placeholder im Feld. Zeile 1 „*Vor- und Nachname" vollbreit; Zeile 2
  zweigeteilt „*PLZ" (ca. 430 px) und „Telefonnummer" (ca. 430 px) mit ca. 12 px Gasse;
  Zeile 3 „*E-Mail Adresse" vollbreit; Zeile 4 die Textarea „Ihre Nachricht" ca. 100 px
  hoch mit sichtbarem Resize-Griff unten rechts. Alle Felder: hellgraue Füllung
  (`#f2f2f2`, geschätzt), **kein Rahmen**, Radius ca. 10 px, Höhe ca. 36 px,
  Placeholder-Text ca. 15 px in Mittelgrau. Pflichtfelder sind allein durch das
  vorangestellte Sternchen im Placeholder markiert, es gibt keine gesonderte Auszeichnung
  und keine Legende. Der Absende-Button „Senden" ist rot gefüllt, ca. 240 px breit,
  ca. 38 px hoch, Radius ca. 8 px — er ist **nicht** vollbreit unter dem Formular, sondern
  links angeschlagen und damit deutlich schmaler als die Felder darüber.
- Typo: H2 „Kontakt" ca. 40 px Bold Anthrazit einzeilig. Fließtext ca. 15 px Regular in
  hellem Grau. Die zwei Kontaktblöcke setzen die Bezeichnung („Telefonnummer", „Email")
  Semibold Anthrazit und den Wert darunter Regular — kein Icon, kein Link-Unterstrich,
  keine Telefon-/Brief-Symbole wie im Footer.
- Farbe/Fläche: Weiß, einziges Rot der Sektion ist der Senden-Button. Die hellgrauen
  Felder sind die einzige Flächenstruktur.
- Abstände/Rhythmus: Ca. 220 px Sektionsluft über der H2, ca. 55 px H2 bis Fließtext,
  ca. 55 px Fließtext bis erster Kontaktblock, ca. 45 px zwischen den Kontaktblöcken.
  Im Formular ca. 12 px Zeilenabstand zwischen den Feldern, ca. 35 px von der Textarea bis
  zum Senden-Button, danach ca. 240 px Sektionsluft bis zur FAQ.
- Zustand: `kontakt-desktop-click-y0-00-Senden.png` zeigt die Seite nach Klick auf
  „Senden" mit leeren Pflichtfeldern. Sichtbar ändert sich **nichts**: keine roten
  Feldrahmen, keine Fehlermeldung unter oder neben den Feldern, kein Fokusring, keine
  Erfolgs- oder Fehlermeldung. Ein Validierungs-Fehlerzustand ist damit nicht belegt.
- Mobil: `kontakt-mobile-click-y844-00-Senden.png` liegt vor, wurde aber nicht als Slice
  gelesen — Mobilaufbau des Formulars nicht geprüft.
- Pattern: Kandidat: Rahmenloses Graufeld-Formular mit schmalem, links angeschlagenem
  Absende-Button

### 51 — FAQ-Akkordeon mit erstem Eintrag offen [kontakt-desktop-02-y750.png | kontakt-desktop-03-y1500.png | -]
- Anordnung: Zweispaltig. Links ab ca. 60 px ein Sektionskopf über zwei Zeilen, rechts ab
  ca. 580 px bis ca. 1379 px die Akkordeon-Liste aus acht Einträgen. Die linke Spalte
  bleibt unter dem Kopftext über ca. 500 px vollständig leer — dieselbe Zweispalter-Logik
  wie im Formular darüber.
- Buttons/Komponenten: Jede Zeile ist eine hellgraue Fläche (`#f2f2f2`, geschätzt) mit
  Radius ca. 16 px, ca. 60 px hoch bei einzeiliger, ca. 80 px bei zweizeiliger Frage,
  ca. 16 px Abstand zwischen den Zeilen, ohne Rahmen und ohne Schatten. Rechts in jeder
  Zeile ein Toggle-Icon bei ca. 1340 px: geschlossene Zeilen tragen ein **dünnes graues
  Plus** ohne Kreisfläche, die geöffnete Zeile ein **weißes Kreuz auf rotem Kreis**
  (ca. 26 px). Der Zustandswechsel läuft also über Form *und* Farbe, nicht nur über
  Rotation. Genau der erste Eintrag ist bereits im Ausgangszustand offen — der geöffnete
  Panel-Bereich behält dieselbe graue Fläche wie der Kopf, es gibt keine abgesetzte
  Antwortfläche. Vor dem Antworttext steht ein kleines graues Pfeil-Symbol („↳"), das nur
  in der ersten, offenen Zeile auftaucht.
- Typo: Sektionskopf zweistufig gefärbt: „Energiekonzept" ca. 56 px Bold in **Hellgrau**,
  „FAQ" darunter ca. 56 px Bold in Anthrazit — gleiche Größe, Hierarchie allein über die
  Helligkeit. Darunter ca. 15 px Regular Fließtext, in dem „Jetzt Kontakt aufnehmen"
  Semibold Anthrazit gesetzt ist, ohne Unterstrich und ohne Rot — ein Inline-Link, der
  sich nur über den Weight vom Umfeld absetzt. Fragen ca. 17 px Semibold Anthrazit,
  Antworttext ca. 15 px Regular mit einfachen Zeilenumbrüchen statt Aufzählungszeichen.
- Farbe/Fläche: Weiß mit hellgrauen Zeilen, Akzentrot ausschließlich im Kreuz-Icon der
  offenen Zeile.
- Abstände/Rhythmus: Ca. 60 px vom Sektionsanfang bis zur ersten Zeile, ca. 16 px
  Zeilenabstand, ca. 24 px Innenabstand links in den Zeilen, ca. 24 px Padding oben.
  Nach der letzten Zeile ca. 140 px bis zur harten Oberkante des CTA-Bands.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie Sektion 15, hier mit dem Unterschied, dass ein Eintrag vorgeöffnet ist und
  das Toggle-Icon im offenen Zustand die Farbe wechselt.

### 52 — Schluss-CTA und Footer (Wiederholung) [kontakt-desktop-03-y1500.png | -]
- Wie Sektion 16 und 17: Rendering-Band mit Eyebrow plus Signet, H2 „Bereit für Ihre
  Energiewende?", zweizeiliger Subline, rotem CTA „Jetzt Offerte anfordern" und
  Trust-Zeile mit Punkt-Trennern; danach der Schiefer-Footer. Hier trägt die Eyebrow
  wieder das rote Rautenkreuz, anders als im Hero derselben Seite (49).
- Der Footer selbst liegt in `kontakt-desktop-05-y2615.png` und ist nicht per Read
  geöffnet worden — für /kontakt **nicht belegt**, als Site-Muster über 17, 38 und 48
  gesichert.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 16 und 17.

## Seite: /karriere

Desktop endet bei `karriere-desktop-06-y3450.png`. Aufbau Hero → Textkopf → Vierfeld-Bento
→ dunkles Portraitband → Stellen-Akkordeon → Schluss-CTA → Footer. Header wie 02, im Fold
transparent, ohne Marquee-Band.

### 53 — Karriere-Hero, Foto mit Titel ohne CTA [karriere-desktop-00-fold.png | karriere-mobile-00-fold.png]
- Anordnung: Vollbreites Foto (zwei Monteure auf einem Flachdach beim Verschrauben eines
  Moduls, Wolkenhimmel), harte Unterkante bei ca. 758 px. Textblock linksbündig ab ca.
  60 px, tief im Foto sitzend: Eyebrow bei ca. 494 px, H1 darunter über drei Zeilen bis
  ca. 675 px. Der Text steht auf der reflektierenden Modulfläche im unteren Fotodrittel,
  wo das Motiv am dunkelsten ist.
- Buttons/Komponenten: **Kein CTA im Hero** — die einzige Seite im Satz, deren Hero
  überhaupt keinen Button trägt. Auch keine Trust-Zeile, keine Partnerlogos, kein Signet.
  Die Eyebrow ist reiner Text „AlpenEnergie" in ca. 16 px Regular, gemischte Schreibweise,
  ohne Caps und ohne Rautenkreuz — sie unterscheidet sich damit in Form *und* Schreibweise
  von der Caps-Eyebrow der übrigen Seiten.
- Typo: H1 ca. 44 px Bold weiß, dreizeilig, enger Zeilenabstand. Keine Lead-Zeile — auf die
  H1 folgt direkt die Fotounterkante. Das ist die kürzeste Hero-Textstrecke der Site.
- Farbe/Fläche: Foto insgesamt hell und kühl (Himmel, graue Module) mit dunklerem
  unterem Drittel. Anders als bei den anderen Heros liegt hier **keine erkennbare
  Abdunkelung** über der Textzone — die Lesbarkeit trägt allein der dunkle Bildinhalt.
  Kein Rot in der Sektion.
- Abstände/Rhythmus: Ca. 445 px vom Header bis zur Eyebrow, ca. 20 px Eyebrow bis H1,
  ca. 80 px H1-Unterkante bis Fotokante.
- Mobil: `karriere-mobile-00-fold.png` zeigt einen harten Satzfehler: Die H1 steht bei
  ca. 32 px in einer sehr schmalen Spalte (ca. 175 px, also weniger als die halbe
  Viewportbreite) und bricht deshalb **mitten im Wort** — „AlpenEne / rgie" und
  „Solarinst / allateur" —, ohne Trennstrich. Der Titel läuft dadurch über neun Zeilen
  von ca. 200 px bis ca. 700 px. Die Textspalte wird offenbar nicht auf die Viewportbreite
  gedehnt. Foto-Crop wie Desktop, Unterkante bei ca. 758 px.
- Pattern: `P-HERO-PHOTO`, Variante ohne CTA und ohne Lead.

### 54 — Textkopf mit zweifarbiger Doppelzeile [karriere-desktop-02-y750.png | -]
- Anordnung: Linksbündiger Textkopf ab ca. 60 px, auf ca. 555 px Spaltenbreite begrenzt,
  die rechte Hälfte bleibt leer. Zwei Titelzeilen, darunter ein dreizeiliger Fließtext.
- Buttons/Komponenten: keine.
- Typo: Der Kopf ist zweizeilig zweifarbig gesetzt — „Komm in unser Team" ca. 36 px Bold in
  Anthrazit, direkt darunter „Egal ob für oder miteinander" in **gleicher Größe und
  gleichem Weight, aber Hellgrau**. Dasselbe Mittel wie im FAQ-Kopf auf /kontakt (51):
  Rangfolge über Helligkeit statt über Größe. Fließtext ca. 15 px Regular Anthrazit.
  Im Fließtext steht vor „oder festes" ein doppelter Wortabstand („Vertriebspartner   oder
  festes") — ein sichtbarer Setzfehler.
- Farbe/Fläche: Weiß, kein Akzent.
- Abstände/Rhythmus: Ca. 100 px Sektionsluft über dem Kopf, ca. 8 px zwischen den beiden
  Titelzeilen, ca. 45 px bis zum Fließtext, ca. 100 px bis zum Bento darunter.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Zweizeiliger Kopf mit Hell/Dunkel-Rangfolge

### 55 — Vierfeld-Bento aus Foto- und Textkacheln [karriere-desktop-02-y750.png | -]
- Anordnung: Zwei Reihen zu je zwei Kacheln, im Diagonalwechsel: oben links Foto, oben
  rechts Textkachel, unten links Textkachel, unten rechts Foto/Video. Alle vier Kacheln
  gleich breit (ca. 650 px) mit ca. 20 px Gasse, Reihe 1 ca. 415 px hoch, Reihe 2 ca.
  430 px, ca. 28 px zwischen den Reihen. Der Zickzack ist das ganze Ordnungsprinzip — es
  gibt keine ungleichen Kachelgrößen wie im Bento auf /produkte/solarmodul (21) oder
  /ueber-uns (41).
- Buttons/Komponenten: Fotokacheln sind randlos gefüllte Bilder mit ca. 16 px Radius, ohne
  Bildunterschrift und ohne Overlay-Text. Die Kachel unten rechts trägt mittig einen
  **roten Play-Kreis** (ca. 62 px, weißes Dreieck) als einziges Video-Signal — kein
  Dauer-Badge, keine Fortschrittsleiste, kein Titel. Textkacheln sind hellgraue Flächen
  (`#f2f2f2`, geschätzt) mit ca. 16 px Radius, ohne Rahmen und ohne Schatten, Innenabstand
  ca. 38 px. Keine Buttons und keine Links in den Kacheln.
- Typo: Kachel-Überschriften ca. 26 px Bold Anthrazit, „Teamabende. Ausflüge. Mallorca."
  zweizeilig gesetzt. Fließtext ca. 15 px Regular in Mittelgrau, mit **manuellen
  Zeilenumbrüchen** statt Blocksatz — die Zeilen enden ungleich und deutlich vor der
  Kachelkante, im ersten Absatz nach vier kurzen Zeilen. Zwischen Überschrift und erstem
  Absatz stehen ca. 100 px Leerraum, obwohl der Text darunter nur die halbe Kachelhöhe
  füllt: Die Kacheln sind oben ausgerichtet, der Abstand ist fest, nicht optisch gesetzt.
- Farbe/Fläche: Weiß als Untergrund, Hellgrau in den Textkacheln, Farbe nur in den Fotos
  und im roten Play-Kreis.
- Abstände/Rhythmus: siehe oben; nach der zweiten Reihe ca. 145 px bis zur harten Oberkante
  des dunklen Bands.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Zickzack-Bento aus abwechselnd Foto- und Textkacheln

### 56 — Dunkles Band mit freigestellter Person [karriere-desktop-03-y1500.png | -]
- Anordnung: Vollbreites Band, randlos, ca. 600 px hoch, harte Ober- und Unterkante ohne
  Rundung. Links ab ca. 64 px eine Textspalte (H2 zweizeilig, Fließtext fünfzeilig, ca.
  575 px breit), rechts eine freigestellte Person (Mitarbeiter im schwarzen Polo, verschränkte
  Arme), die von ca. 800 px bis ca. 1225 px reicht und **unten von der Bandkante
  angeschnitten** wird. Die Figur steht nicht mittig in der rechten Hälfte, sondern
  leicht nach links versetzt; rechts von ihr bleiben ca. 215 px leere dunkle Fläche.
- Buttons/Komponenten: Kein CTA, kein Badge, kein Signet — trotz Karriere-Kontext und
  klarem Aufforderungstext („Erfahren Sie mehr über unsere offenen Stellen") gibt es
  keinen Sprung zur Stellenliste darunter.
- Typo: H2 ca. 34 px Bold weiß über zwei Zeilen. Fließtext ca. 15 px Regular in gebrochenem
  Weiß über fünf Zeilen, wieder mit manuellen Umbrüchen. Verhältnis H2 zu Fließtext grob
  2,3:1 (geschätzt).
- Farbe/Fläche: Nahezu schwarzes Anthrazit — **nicht** das Schiefer-Blaugrau der übrigen
  dunklen Bänder (Zahlenband 05, Vorteile-Dreier 12, Footer 17). Damit ist es die einzige
  echt schwarze Fläche der Site und bricht das sonst durchgehende Schiefer-Schema. Kein
  Rot in der Sektion.
- Abstände/Rhythmus: Ca. 190 px von der Bandoberkante bis zur H2, ca. 30 px H2 bis
  Fließtext, unter dem Fließtext ca. 190 px leere dunkle Fläche.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Schwarzes Band mit angeschnittener Freistellerfigur

### 57 — Stellen-Akkordeon mit Bewerben-Button [karriere-desktop-04-y2250.png | -]
- Anordnung: Einspaltig über die volle Containerbreite. Zuerst ein linksbündiger Kopf
  (H2 einzeilig, einzeilige Subline) ab ca. 72 px, darunter zwei Akkordeon-Zeilen von
  ca. 72 px bis ca. 1369 px. Anders als das FAQ auf /kontakt (51) steht diese Liste
  **nicht** in einer rechten Spalte, sondern vollbreit unter dem Kopf.
- Buttons/Komponenten: Zeilenfläche hellgrau (`#f2f2f2`, geschätzt), Radius ca. 16 px,
  ohne Rahmen und ohne Schatten. Toggle-Icon rechts bei ca. 1334 px, exakt wie im FAQ:
  geschlossen ein dünnes graues Plus ohne Fläche, geöffnet ein weißes Kreuz auf rotem
  Kreis (ca. 26 px). Der erste Eintrag ist vorgeöffnet und ca. 200 px hoch, der zweite
  geschlossen und ca. 68 px. Im offenen Panel steht eine einzeilige Merkmalzeile mit
  Punkt-Trennern („Attraktive Entlohnung • Schweizweite Einsätze • …") — derselbe
  Trenner wie in der Trust-Zeile der CTA-Bänder — und darunter ein roter Button
  „Jetzt bewerben" (ca. 158 px breit, ca. 34 px hoch, Radius ca. 8 px). Der Button ist
  der einzige Weg in die Bewerbung; ein Formular oder eine Detailseite ist auf dieser
  Route nicht belegt.
- Typo: H2 ca. 34 px Bold Anthrazit, Subline ca. 17 px Regular Mittelgrau. Stellentitel
  ca. 22 px Semibold Anthrazit inklusive „(m/w/d)". Merkmalzeile ca. 15 px Regular
  Mittelgrau. Kein Ort, kein Pensum, kein Datum, kein Badge an den Zeilen.
- Farbe/Fläche: Weiß mit hellgrauen Zeilen, Rot in genau zwei Punkten: Kreuz-Icon und
  Bewerben-Button.
- Abstände/Rhythmus: Ca. 150 px Sektionsluft über der H2, ca. 25 px H2 bis Subline, ca.
  85 px bis zur ersten Zeile, ca. 28 px zwischen den beiden Zeilen, ca. 160 px bis zur
  Oberkante des CTA-Bands. Innen ca. 30 px Padding links.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 15/51 (Akkordeon), Kandidat für die konkrete Form: Stellenliste als
  Akkordeon mit Merkmalzeile und Bewerben-Button

### 58 — Schluss-CTA und Footer (Wiederholung) [karriere-desktop-04-y2250.png | -]
- Wie Sektion 16 und 17: Rendering-Band mit Eyebrow „WIR BERATEN SIE!" plus rotem
  Rautenkreuz-Signet, H2 „Bereit für Ihre Energiewende?", zweizeiliger Subline, rotem CTA
  „Jetzt Offerte anfordern" und Trust-Zeile mit Punkt-Trennern; danach der
  Schiefer-Footer. Bemerkenswert: Auf einer Karriere-Seite bleibt der Schluss-CTA
  unverändert der Offerten-CTA, es gibt keine Bewerbungs-Variante.
- Der Footer liegt in `karriere-desktop-06-y3450.png` und ist nicht per Read geöffnet
  worden — für /karriere **nicht belegt**, als Site-Muster über 17, 38 und 48 gesichert.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 16 und 17.

## Seite: /produkte/waermepumpe

Übersichtsseite über zwei Marken, Desktop bis `produkte__waermepumpe-desktop-07-y4128.png`.
Aufbau Hero → Kennzahl-Dreier → Marken-Zweispalter → FAQ → Komponenten-Karussell →
Schluss-CTA → Footer mit Blog-Teasern. Header wie 02, ohne Marquee.

### 59 — Wärmepumpen-Hero mit Produkt-Rendering [produkte__waermepumpe-desktop-00-fold.png | produkte__waermepumpe-mobile-00-fold.png]
- Anordnung: Vollbreites Rendering (zwei Wärmepumpen-Außeneinheiten im Vordergrund vor
  einem Haus im Abendlicht, Paar rechts im Hintergrund), harte Unterkante bei ca. 758 px.
  Textblock links ab ca. 60 px auf ca. 565 px Spaltenbreite, tief sitzend: Eyebrow bei
  ca. 462 px. Die beiden Geräte stehen mittig-links und werden von der Textspalte
  **teilweise überlagert** — die H1 läuft über die linke Einheit.
- Buttons/Komponenten: **Kein CTA im Hero**, wie auf /karriere (53). Eyebrow „WÄRMEPUMPEN
  — ÜBERSICHT" in Caps ca. 13 px mit rotem Rautenkreuz-Signet davor, Trennung durch
  Geviertstrich. Kein Badge, keine Partnerlogos.
- Typo: H1 ca. 44 px Bold weiß über zwei Zeilen. Lead ca. 15 px Regular über drei Zeilen,
  darin zwei Markennamen in **Semibold** hervorgehoben („Buderus", „Panasonic Aquarea") —
  Inline-Betonung über den Weight, ohne Farbe und ohne Link-Optik, dasselbe Mittel wie im
  FAQ-Inline-Link auf /kontakt (51).
- Farbe/Fläche: Warmes, goldbraunes Abendlicht — der farbigste Hero im Satz. Links liegt
  eine Abdunkelung unter der Textspalte. Rot nur im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 415 px Header bis Eyebrow, ca. 22 px bis H1, ca. 30 px H1 bis
  Lead, ca. 90 px Lead-Unterkante bis Fotokante.
- Mobil: `produkte__waermepumpe-mobile-00-fold.png` — der Bildausschnitt ist ein **starker
  Ausschnittzoom** auf das Lüftergitter einer Einheit, das Haus und das Paar fallen ganz
  weg; das Motiv ist mobil damit abstrakt statt erzählend. H1 bricht auf vier Zeilen bei
  ca. 30 px, Lead sechszeilig, Semibold-Hervorhebungen bleiben erhalten. Fotounterkante
  bei ca. 758 px.
- Pattern: `P-HERO-PHOTO`, Variante ohne CTA mit Inline-Semibold im Lead.

### 60 — Kennzahl-Dreier als graue Karten [produkte__waermepumpe-desktop-02-y750.png | -]
- Anordnung: Sektionskopf linksbündig ab ca. 60 px (Eyebrow, H2 zweizeilig), darunter drei
  gleich breite Karten nebeneinander von ca. 60 px bis ca. 1380 px, je ca. 424 px breit mit
  ca. 24 px Gasse. Die Karten sind **oben bündig, aber unterschiedlich hoch** (ca. 285,
  260 und 240 px) — sie wachsen mit dem Text mit, statt auf gleiche Höhe gezogen zu
  werden. Das ist der auffälligste Unterschied zum sonst durchgehend gleichhohen
  Dreier-Raster der Startseite (12).
- Buttons/Komponenten: Karten sind hellgraue Flächen (`#f2f2f2`, geschätzt) mit ca. 20 px
  Radius, ohne Rahmen, ohne Schatten, ohne Icon. Innenabstand ca. 30 px. Keine Buttons.
- Typo: Dreistufig je Karte. Die Kennzahl steht ganz oben in ca. 40 px Bold in **Rot** —
  die einzige Stelle im Satz, an der die Akzentfarbe als große Display-Typo statt als
  Fläche eingesetzt wird. Darunter eine Bezeichnungszeile ca. 18 px Semibold Anthrazit,
  darunter Fließtext ca. 14 px Regular Mittelgrau mit manuellen Umbrüchen. Die drei
  Kennzahlen sind unterschiedlich lang („80 %", „15'000 CHF", „6–10 Wo.") und werden
  nicht auf gleiche optische Breite gebracht.
- Farbe/Fläche: Weiß mit grauen Karten, Rot ausschließlich in den drei Kennzahlen und im
  Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 100 px Sektionsluft, ca. 20 px Eyebrow bis H2, ca. 60 px H2 bis
  Kartenreihe, ca. 110 px unter der höchsten Karte bis zur Kante des grauen Bands.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Kennzahl-Karten mit roter Display-Zahl und mitwachsender Höhe

### 61 — Marken-Zweispalter mit Merkmalslisten [produkte__waermepumpe-desktop-02-y750.png | produkte__waermepumpe-desktop-04-y2250.png | -]
- Anordnung: Vollbreites Band in sehr hellem Grau (`#f5f5f5`, geschätzt) mit harten Kanten,
  ca. 1'400 px hoch. Kopf linksbündig ab ca. 60 px (Eyebrow „UNSERE MARKEN", H2 einzeilig,
  zweizeiliger Fließtext, CTA), darunter zwei gleich breite Karten von ca. 60 px bis
  ca. 1380 px, je ca. 650 px breit mit ca. 20 px Gasse.
- Buttons/Komponenten: Jede Markenkarte ist eine **weiße** Fläche (setzt sich vom grauen
  Band ab) mit ca. 16 px Radius; oben ein randlos eingesetztes Foto ca. 325 px hoch mit
  gerundeten Oberkanten, darunter Titel, Fließtext, eine Häkchenliste und ein Button.
  Die Häkchen sind **rote Kreise mit weißem Haken** (ca. 20 px), links in ca. 30 px
  Spalte, Text daneben mehrzeilig umbrechend. Der Karten-Button („Buderus-Details ansehen"
  bzw. „Panasonic-Details ansehen") ist **hellgrau gefüllt mit dunklem Label**, ca. 34 px
  hoch, Radius ca. 8 px — also ein sekundärer Knopf, kein roter. Der einzige rote Button
  der Sektion ist „Jetzt Offerte sichern" oben im Kopf (ca. 200 px breit); der Sprung in
  die Markendetails ist damit visuell schwächer gewichtet als der Offerten-CTA.
- Typo: H2 ca. 34 px Bold einzeilig, hier über die volle Containerbreite laufend statt in
  einer schmalen Spalte. Kartentitel ca. 24 px Semibold, zweizeilig. Häkchentext ca.
  15 px Regular. Auffällig: Die Häkchenzeilen der rechten Karte werden **rechts
  angeschnitten** („aus 1 kWh Strom werden 5 kWh Wärme" und „50+ Jahre Erfahrunɡ" enden
  ohne Endzeichen an der Kartenkante) — der Text läuft über den verfügbaren Innenraum
  hinaus, ohne umzubrechen.
- Farbe/Fläche: Hellgraues Band, weiße Karten, Rot in Häkchen, Eyebrow-Signet und dem
  einen CTA.
- Abstände/Rhythmus: Ca. 100 px Bandkante bis Eyebrow, ca. 22 px bis H2, ca. 30 px bis
  Fließtext, ca. 40 px bis CTA, ca. 50 px bis Kartenreihe. In den Karten ca. 30 px
  Innenabstand, ca. 10 px zwischen den Häkchenzeilen, ca. 30 px von der Liste zum Button.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: Kandidat: Marken-Vergleichskarten mit Häkchenliste und sekundärem Detail-Button

### 62 — FAQ-Akkordeon (Wiederholung) [produkte__waermepumpe-desktop-04-y2250.png | -]
- Wie Sektion 51 auf /kontakt: Zweispalter mit dem zweifarbigen Kopf „Energiekonzept"
  (Hellgrau) über „FAQ" (Anthrazit), Fließtext mit dem Semibold-Inline-Link „Jetzt Kontakt
  aufnehmen", rechts fünf hellgraue Akkordeon-Zeilen mit ca. 16 px Radius. Erster Eintrag
  vorgeöffnet mit rotem Kreuz-Kreis, die übrigen mit grauem Plus.
- Einziger Unterschied: nur fünf Einträge statt acht, und die Fragen sind thematisch auf
  Wärmepumpen gewechselt. Auffällig ist die **Duzform im Antworttext** („dein Haus"),
  während die gesamte übrige Site siezt — ein Bruch in der Ansprache, der nur in diesem
  Panel sichtbar ist.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 15/51.

### 63 — Komponenten-Karussell (Wiederholung) [produkte__waermepumpe-desktop-06-y3750.png | -]
- Wie Sektion 24 auf /produkte/solarmodul: hellgraues Band, Kopf zweigeteilt (links
  Eyebrow „ALPENENERGIE — ENERGIESYSTEM" plus H2 „Weitere Komponenten", rechts eine
  zweizeilige Claim-Zeile mit Semibold-Schlusszeile, die **rechts angeschnitten** wird —
  „für Ihr" und „freie Energieversorgun" enden ohne Endzeichen). Darunter eine Reihe
  flacher Foto-Kacheln (ca. 350 px breit, ca. 180 px hoch, Radius ca. 16 px), jede mit
  Icon plus Label weiß auf dem Bild und einem quadratischen Pfeil-Chip rechts oben
  (ca. 30 px, hellgrau transparent, Diagonalpfeil).
- Karussell-Zustand: Die vierte Kachel („Solarm…") wird rechts vom Viewport angeschnitten;
  darüber liegt ein runder weißer Next-Knopf (ca. 40 px, grauer Chevron) am rechten Rand.
  Ein Prev-Knopf ist im Ausgangszustand nicht sichtbar.
  `produkte__waermepumpe-desktop-click-y3000-00-Next.png` liegt als Zustandsshot vor, wurde
  aber nicht per Read geöffnet — die Wirkung des Next-Klicks ist damit **nicht belegt**.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 24.

### 64 — Schluss-CTA und Footer mit Blog-Teasern (Wiederholung) [produkte__waermepumpe-desktop-06-y3750.png | -]
- Wie Sektion 16 und 48: Rendering-Band mit Eyebrow plus Signet, H2, zweizeiliger Subline,
  rotem CTA „Jetzt Offerte anfordern" und Trust-Zeile; danach der Schiefer-Footer in der
  **ausgebauten Fassung mit Blog-Teaser-Etage** — hier ist die dreiteilige Teaser-Reihe
  im selben Slice sichtbar wie auf /projekte/rolf-r. (48). Die Footer-Links „Referenzen"
  und „Energiemanagementsystem" sind auch hier rechts angeschnitten.
- Mobil: nicht als eigener Slice gelesen (nicht belegt).
- Pattern: wie 16 und 48.

## Seite: /produkte/waermepumpen/buderus

Die längste Produktroute, Desktop bis `produkte__waermepumpen__buderus-desktop-11-y6863.png`.
Markendetailseite unterhalb von /produkte/waermepumpe. Header wie 02, ohne Marquee.
Nicht alle Slices dieser Route sind gelesen worden — die hier nicht genannten Bereiche
(`produkte__waermepumpen__buderus-desktop-10-y6750.png` und
`produkte__waermepumpen__buderus-desktop-11-y6863.png`) sind **nicht geprüft**.

### 65 — Produkt-Hero mit Gerät im Garten [produkte__waermepumpen__buderus-desktop-00-fold.png | -]
- Anordnung: Vollbreites Foto (Buderus-Außeneinheit mittig vor Holzfassade, Terrasse und
  Töpfe seitlich), harte Unterkante bei ca. 758 px. Textblock links ab ca. 60 px,
  Eyebrow bei ca. 551 px, H1 zweizeilig darunter. Anders als in den anderen Heros steht
  das Produkt **freigestellt in der Bildmitte** und die Textspalte bleibt links davon,
  ohne es zu überlagern.
- Buttons/Komponenten: **Kein CTA im Hero**, keine Trust-Zeile, kein Signet. Die Eyebrow
  ist reiner Text „Buderus Logatherm WLW176i AR" ca. 16 px Regular in gebrochenem Weiß,
  gemischte Schreibweise ohne Caps — dieselbe Eyebrow-Sonderform wie auf /karriere (53),
  hier zusätzlich als Modellbezeichnung genutzt.
- Typo: H1 ca. 44 px Bold weiß, zweizeilig, keine Lead-Zeile.
- Farbe/Fläche: Sommerliches Tageslichtfoto, deutlich heller als die Abenddämmerungs-Heros
  der übrigen Seiten. Unter der Textzone links eine leichte Abdunkelung. Kein Rot.
- Abstände/Rhythmus: Ca. 505 px Header bis Eyebrow, ca. 20 px bis H1, ca. 80 px bis
  Fotokante.
- Mobil: `produkte__waermepumpen__buderus-mobile-00-fold.png` liegt vor, ist aber nicht
  gelesen worden — Mobil **nicht geprüft**.
- Pattern: `P-HERO-PHOTO`, Variante ohne CTA und ohne Lead.

### 66 — Textspalte mit schwebenden Merkmal-Chips [produkte__waermepumpen__buderus-desktop-02-y750.png | -]
- Anordnung: Zweispaltig. Links ab ca. 60 px eine Textspalte (ca. 630 px) mit H2
  zweizeilig, zwei Absätzen und einem Button; rechts eine Produktabbildung mit drei
  **freischwebenden Merkmal-Karten**, die die Gerätekante überlappen — eine oben rechts,
  eine links auf halber Höhe, eine unten rechts. Die Karten liegen bewusst versetzt und
  ragen über die Bildkanten hinaus, wie die Label-Karten im Startseiten-Intro (04).
- Buttons/Komponenten: Die Merkmal-Karten sind sehr helle, leicht durchscheinende Flächen
  mit ca. 16 px Radius und weichem Schatten; jede trägt oben ein dünnes Linien-Icon
  (Haken, Aufwärtspfeil, Sonne) und darunter ein ein- bis zweizeiliges Label ca. 15 px
  Regular. Kein Icon-Chip in Rot wie in Sektion 04 — die Icons stehen hier **ohne
  Farbfläche** als reine Striche. Der Button „Datenblatt herunterladen" ist hellgrau
  gefüllt mit dunklem Label, ca. 34 px hoch, Radius ca. 8 px — ein sekundärer Knopf, und
  der einzige Download-Hinweis der Seite; er trägt **kein Datei-Icon** und keine
  Formatangabe.
- Typo: H2 ca. 34 px Bold zweizeilig. Fließtext ca. 15 px Regular Mittelgrau in zwei
  Absätzen mit manuellen Umbrüchen. Verhältnis H2 zu Fließtext grob 2,3:1 (geschätzt).
- Farbe/Fläche: Weiß. Das Produktfoto ist stark entsättigt (schwarzgraues Gerät auf
  hellgrauem Grund), Rot fehlt in der gesamten Sektion.
- Abstände/Rhythmus: Ca. 160 px Sektionsluft, ca. 30 px H2 bis Fließtext, ca. 25 px
  zwischen den Absätzen, ca. 40 px bis zum Button, danach ca. 190 px bis zum Bildband
  darunter.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Textspalte mit überlappenden Merkmal-Chips ohne Farbchip

### 67 — Breitband-Bildkachel mit Punkt-Eyebrow [produkte__waermepumpen__buderus-desktop-02-y750.png | -]
- Anordnung: Eine einzelne, sehr breite Bildkachel von ca. 60 px bis ca. 1380 px, ca.
  335 px hoch, Radius ca. 20 px. Der Text sitzt **innen links** im Bild: Eyebrow oben bei
  ca. 30 px Innenabstand, die Aussage unten links, dazwischen ca. 145 px leere Bildfläche.
  Rechts läuft das Foto (Hand mit Smartphone, Wohnraum) ungestört weiter.
- Buttons/Komponenten: Keine Buttons. Die Eyebrow ist hier ein **kleiner roter Punkt**
  (ca. 8 px Kreis) plus Semibold-Text — nicht das Rautenkreuz-Signet und nicht die
  Caps-Form. Dieser Punkt-Eyebrow ist die dritte Eyebrow-Variante der Site und
  wiederholt sich in Sektion 68 und 69.
- Typo: Eyebrow ca. 17 px Semibold weiß, gemischte Schreibweise. Aussage ca. 26 px Bold
  weiß über drei Zeilen. Kein Fließtext, keine dritte Stufe.
- Farbe/Fläche: Warmes, helles Innenraumfoto; unter der Textzone links eine deutliche
  Abdunkelung, die nach rechts ausläuft. Rot nur im Eyebrow-Punkt.
- Abstände/Rhythmus: Ca. 30 px Innenabstand rundum, ca. 145 px zwischen Eyebrow und
  Aussage, danach ca. 145 px bis zur Kante des hellgrauen Förder-Bands.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Breitband-Bildkachel mit Punkt-Eyebrow und Aussage unten links

### 68 — Förder-Sektion mit annotiertem Produktbild [produkte__waermepumpen__buderus-desktop-04-y2250.png | -]
- Anordnung: Vollbreites, sehr helles Graues Band (`#f5f5f5`, geschätzt). Links ab ca.
  60 px Kopf (Eyebrow mit Signet, H2 zweizeilig), Aufzählung, Zusammenfassungsabsatz,
  Fußnote und CTA; rechts ein Produktbild mit **Beschriftungslinien**, die von der
  Gerätekante nach rechts zu drei Textlabels laufen („Förderprogramm", „Zusatzförderung
  Gemeinde", „Steuerliche Abzugsfähigkeit"), jeweils mit einer kleineren Klammerzeile
  in Caps darunter.
- Buttons/Komponenten: CTA „Jetzt Offerte sichern" rot gefüllt, ca. 200 px breit, ca.
  36 px hoch, Radius ca. 8 px. Die Aufzählung nutzt **einfache runde Bullet-Punkte** in
  Grau — nicht die roten Häkchen-Chips der übrigen Listen (61). Die Annotationslinien
  sind dünne graue Striche ohne Pfeilspitze und ohne Endpunkt-Kreis.
- Typo: Aufzählungstext ca. 17 px Regular Anthrazit, Zusammenfassungsabsatz ca. 17 px
  Regular über zwei Zeilen. Fußnote deutlich kleiner, ca. 13 px Regular in Hellgrau, mit
  vorangestelltem Sternchen. Annotationslabels ca. 17 px Semibold Anthrazit, die
  Klammerzeilen ca. 10 px Caps in Hellgrau — der stärkste Größensprung innerhalb einer
  Komponente auf der ganzen Site (grob 1,7:1 zwischen Label und Klammerzeile).
- Farbe/Fläche: Helles Grau, weißfreies Band, Rot nur im CTA und im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 28 px zwischen den Aufzählungszeilen, ca. 48 px bis zum
  Zusammenfassungsabsatz, ca. 58 px bis zur Fußnote, ca. 58 px bis zum CTA, danach ca.
  135 px bis zur Bandunterkante.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Annotiertes Produktbild mit Beschriftungslinien

### 69 — Dreier-Kachelreihe mit gemischten Flächen [produkte__waermepumpen__buderus-desktop-04-y2250.png | -]
- Anordnung: Drei gleich breite Kacheln nebeneinander (je ca. 418 px, ca. 24 px Gasse) von
  ca. 60 px bis ca. 1380 px, alle ca. 555 px hoch und Radius ca. 20 px — hier **sind** die
  Kacheln auf gleiche Höhe gezogen, anders als beim Kennzahl-Dreier auf
  /produkte/waermepumpe (60). Jede Kachel trägt oben den Punkt-Eyebrow aus Sektion 67 und
  unten eine mehrzeilige Aussage; der Raum dazwischen gehört dem Bild.
- Buttons/Komponenten: Keine Buttons. Die drei Kacheln nutzen **drei verschiedene
  Flächenlogiken**: links ein randfüllendes Foto mit Text direkt darauf (die Schrift dort
  ist im unteren Bereich so dunkel auf dunklem Grund, dass die letzte Zeile
  „komplett emissionsfrei." kaum lesbar ist — Kontrastproblem); Mitte eine hellgraue
  Kachel mit freigestelltem Produktfoto oben und schwarzem Text unten; rechts dieselbe
  hellgraue Logik mit Smartphone-Freisteller. Die linke Kachel ist damit die einzige mit
  weißem Text, die beiden anderen setzen Anthrazit — die Reihe ist visuell nicht
  vereinheitlicht.
- Typo: Eyebrow ca. 17 px Semibold (links weiß, Mitte und rechts Anthrazit), Aussage
  ca. 22 px Bold über zwei bis fünf Zeilen. Die drei Aussagen sind unterschiedlich lang
  und stehen deshalb auf unterschiedlicher Höhe innerhalb der gleich hohen Kacheln —
  unten bündig, nicht oben.
- Farbe/Fläche: Weiß als Untergrund, eine Fotokachel und zwei hellgraue Kacheln. Rot nur
  in den drei Eyebrow-Punkten.
- Abstände/Rhythmus: Ca. 145 px Sektionsluft über der Reihe, ca. 30 px Innenabstand in den
  Kacheln, ca. 140 px unter der Reihe bis zur Kante des Schiefer-Bands.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Dreierreihe mit gemischten Kachelflächen und Punkt-Eyebrow

### 70 — Schiefer-Band mit CTA und Telefonzeile [produkte__waermepumpen__buderus-desktop-04-y2250.png | -]
- Anordnung: Vollbreites Band im Schiefer-Blaugrau, harte Oberkante. Links ab ca. 60 px
  H2 und zweizeiliger Fließtext, **rechts** der CTA plus darunter eine Telefonzeile — die
  einzige Sektion der Site, in der Text links und CTA rechts auf derselben Grundlinie
  stehen statt untereinander in einer Spalte.
- Buttons/Komponenten: CTA „Jetzt Gespräch vereinbaren" rot gefüllt, ca. 265 px breit,
  ca. 38 px hoch, Radius ca. 8 px — abweichendes Label gegenüber dem sonst überall
  gleichen „Jetzt Offerte anfordern". Darunter rechtsbündig „oder anrufen: +41 61 539 15 50"
  als reine Textzeile ca. 15 px Regular, ohne Icon, ohne Unterstrich und ohne
  Button-Optik.
- Typo: H2 ca. 30 px Bold weiß einzeilig, Fließtext ca. 15 px Regular in gebrochenem Weiß.
- Farbe/Fläche: Schiefer-Blaugrau wie Footer und Zahlenband (05, 17). Rot nur im CTA.
- Abstände/Rhythmus: Der sichtbare Teil im gelesenen Slice reicht bis zur Unterkante des
  Shots; die vollständige Bandhöhe ist im gelesenen Material **nicht belegt**.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Schiefer-Band mit seitlichem CTA und Telefon-Fallback

### 71 — Produktübersicht als Zwei-Paket-Vergleich [produkte__waermepumpen__buderus-desktop-06-y3750.png | -]
- Anordnung: Weißer Grund. Kopf linksbündig ab ca. 60 px (H2 einzeilig, drei Zeilen
  Fließtext in zwei Absätzen), darunter zwei gleich breite Spalten (je ca. 650 px, ca.
  20 px Gasse). Jede Spalte besteht aus **zwei getrennt gerundeten Blöcken
  übereinander**: oben ein Bild-plus-Titel-Block, darunter mit ca. 12 px Lücke ein
  eigener Block mit der Häkchenliste. Die Trennung in zwei Flächen statt einer Karte ist
  die auffälligste Formentscheidung der Sektion.
- Buttons/Komponenten: Kein Button, kein Preis, kein „Paket wählen" — der Vergleich endet
  ohne Handlungsangebot. Häkchen sind rote Kreise mit weißem Haken (ca. 20 px) wie in
  Sektion 61. Jeder Block trägt oben den Punkt-Eyebrow („Paket 1", „Paket 2").
- Typo: H2 ca. 34 px Bold. Pakettitel ca. 24 px Bold, zwei- bis dreizeilig. Häkchentext
  ca. 15 px Regular, teils zweizeilig umbrechend.
- Farbe/Fläche: **Hell/Dunkel-Spiegelung** — die linke Spalte ist hellgrau
  (`#f2f2f2`, geschätzt) mit Anthrazit-Text, die rechte fast schwarz mit weißem Text.
  Beide Spalten zeigen dasselbe Produkt in derselben Freisteller-Optik; der Unterschied
  liegt allein in der Flächenfarbe. Rot in den Häkchen und den zwei Eyebrow-Punkten.
- Abstände/Rhythmus: Ca. 165 px Sektionsluft über der H2, ca. 55 px H2 bis Fließtext,
  ca. 115 px bis zu den Spalten, ca. 12 px zwischen oberem und unterem Block einer Spalte,
  ca. 34 px zwischen den Häkchenzeilen.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Zwei-Paket-Vergleich mit gespiegelter Hell/Dunkel-Fläche

### 72 — FAQ und Komponenten-Karussell (Wiederholung) [produkte__waermepumpen__buderus-desktop-08-y5250.png | -]
- FAQ wie 62: derselbe zweifarbige Kopf „Energiekonzept"/„FAQ", derselbe Semibold-Inline-Link,
  dieselben fünf Wärmepumpen-Fragen mit vorgeöffnetem ersten Eintrag, rotem Kreuz-Kreis und
  grauen Plus-Icons. Auch die Duzform im Antworttext („dein Haus") ist identisch.
- Darunter das Komponenten-Karussell wie 24 und 63: hellgraues Band, zweigeteilter Kopf mit
  rechts angeschnittener Claim-Zeile („freie Energieversorgung"), vier flache Foto-Kacheln
  mit Icon, Label und Pfeil-Chip, die vierte rechts angeschnitten, runder weißer Next-Knopf
  am rechten Rand. `produkte__waermepumpen__buderus-desktop-click-y5250-00-Next.png` liegt
  als Zustandsshot vor, wurde aber nicht gelesen — Wirkung **nicht belegt**.
- Mobil: nicht geprüft.
- Pattern: wie 15/51 und 24.

## Seite: /blog

Übersichtsroute, Desktop bis `blog-desktop-06-y3173.png`. Aufbau Kopf → Zweispalten-Liste
→ Schluss-CTA → Footer. Header wie 02 im Weiß-Zustand ohne Marquee.

### 73 — Blog-Kopf ohne Bild [blog-desktop-00-fold.png | blog-mobile-00-fold.png]
- Anordnung: Kein Hero-Foto — die einzige Route im Satz, die **ohne Bildfläche im Fold**
  startet. Unter der weißen Headerleiste beginnt direkt Weiß, darin linksbündig ab ca.
  60 px eine Eyebrow und darunter ein zweizeiliger Titel, begrenzt auf ca. 500 px. Die
  rechte Seitenhälfte bleibt leer.
- Buttons/Komponenten: Keine Buttons, kein Filter, keine Kategorie-Tabs, keine Suche,
  kein Signet vor der Eyebrow. Die Liste darunter ist ungefiltert und unsortiert
  auszeichnungsfrei.
- Typo: Eyebrow „BLOG" in Caps ca. 14 px in Hellgrau, mit moderatem Letterspacing. Titel
  ca. 40 px Bold Anthrazit über zwei Zeilen. Keine Lead-Zeile.
- Farbe/Fläche: Weiß, kein Rot in der gesamten Sektion.
- Abstände/Rhythmus: Ca. 105 px von der Header-Unterkante bis zur Eyebrow, ca. 25 px
  Eyebrow bis Titel, ca. 65 px Titel bis zur ersten Kachelreihe.
- Mobil: `blog-mobile-00-fold.png` — gleicher Aufbau, Titel zweizeilig bei ca. 27 px,
  Eyebrow gleich. Die Liste darunter wird einspaltig.
- Pattern: Kandidat: Bildloser Listenkopf mit Caps-Eyebrow

### 74 — Beitragsliste als Zweispalter ohne Karten [blog-desktop-00-fold.png | blog-desktop-02-y750.png | blog-mobile-00-fold.png]
- Anordnung: Zwei Spalten von ca. 60 px bis ca. 1380 px, je ca. 650 px breit, ca. 20 px
  Gasse, mindestens sieben Reihen tief. Jede Reihe: Bild oben, darunter Meta-Zeile,
  darunter Titel. Die Reihen sind **oben bündig**, aber ihre Titel unterschiedlich lang
  (ein- bis zweizeilig), so dass die Abstände zur nächsten Reihe ungleich ausfallen; es
  gibt keine Ausgleichshöhe.
- Buttons/Komponenten: **Keine Karte** — kein Rahmen, keine Fläche, kein Schatten, kein
  Radius am Textbereich. Nur das Bild ist gerundet (ca. 12 px, ca. 650×215 px). Kein
  „Weiterlesen"-Link, kein Pfeil, kein Kategorie-Badge, keine Autorenangabe. Die
  Meta-Zeile trennt Datum und Lesedauer durch einen senkrechten Strich („09.02.2026 |
  6 Minuten") — derselbe Trenner wie in der Footer-Teaser-Zeile (48) und anders als die
  Punkt-Trenner der Trust-Zeilen.
- Typo: Meta ca. 15 px Regular Mittelgrau, Titel ca. 18 px Semibold Anthrazit. Auffällig
  ist die uneinheitliche Schreibweise der Lesedauer: teils „9 Minuten", teils „9 minuten"
  klein (in `blog-desktop-02-y750.png` in derselben Ansicht nebeneinander sichtbar).
- Farbe/Fläche: Durchgehend Weiß, **kein Rot auf der gesamten Listenstrecke** — wie bei der
  Team-Strecke (43) eine lange akzentfreie Passage.
- Abstände/Rhythmus: Ca. 20 px Bild bis Meta, ca. 12 px Meta bis Titel, ca. 55 px vom
  Titel bis zum nächsten Bild.
- Mobil: `blog-mobile-00-fold.png` zeigt eine Spalte, Bild in Inhaltsbreite (ca. 350 px)
  bei gleicher Rundung, Titel dreizeilig; Reihenfolge und Meta-Zeile unverändert.
- Pattern: `P-GALLERY` — Kandidat für die konkrete Form: Kartenlose Beitragsliste mit
  Strich-Meta

### 75 — Schluss-CTA und Footer (Wiederholung) [blog-desktop-06-y3173.png | -]
- Der Slice `blog-desktop-06-y3173.png` ist der Endslice der Route und **nicht per Read
  geöffnet** worden; das CTA-Band und der Footer sind für /blog damit nicht belegt,
  als Site-Muster aber über 16, 17 und 48 gesichert.
  `blog-desktop-click-y0-00-Kontaktformular_öffnen.png` liegt als Zustandsshot vor, wurde
  nicht gelesen — Wirkung **nicht belegt**.
- Mobil: nicht geprüft.
- Pattern: wie 16 und 17.

## Seite: /blog/solaranlage-einfamilienhaus-kosten-schweiz-2026

Artikelroute, Desktop bis
`blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-06-y3596.png`. Aufbau
Artikel-Hero → Fließtextstrecke → Schluss-CTA → Footer.

### 76 — Artikel-Hero mit Titel und Meta-Zeile [blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-00-fold.png | -]
- Anordnung: Vollbreites Drohnenfoto (Einfamilienhaus mit Solardach von schräg oben),
  harte Unterkante bei ca. 578 px — merklich flacher als die 758 px der übrigen Heros.
  Textblock links ab ca. 120 px (nicht 60 px wie sonst), Titel zweizeilig, darunter eine
  dreiteilige Meta-Zeile.
- Buttons/Komponenten: Kein CTA, keine Eyebrow, kein Signet, kein Zurück-Link zur
  Blogliste. Die Meta-Zeile besteht aus drei Textgruppen (Datum, Autor, Lesedauer), die
  **ohne sichtbaren Trenner** allein durch Wortabstände von ca. 30 px getrennt sind —
  weder Punkt- noch Strich-Trenner, also eine dritte Trennerlogik neben denen aus 48
  und 74. Der Autorname steht in hellerem Weiß als das Datum.
- Typo: Titel ca. 36 px Bold weiß, zweizeilig. Meta ca. 15 px Regular in gebrochenem Weiß.
  Die Lesedauer steht auch hier klein geschrieben („9 minuten").
- Farbe/Fläche: Herbstliches Tageslichtfoto, links unter der Textzone eine Abdunkelung.
  Kein Rot.
- Abstände/Rhythmus: Ca. 275 px Header bis Titel, ca. 30 px Titel bis Meta, ca. 90 px
  Meta bis Fotokante.
- Mobil: `blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-mobile-00-fold.png` liegt
  vor, wurde nicht gelesen — Mobil **nicht geprüft**.
- Pattern: Kandidat: Artikel-Hero mit Titel im Foto und trennerloser Meta-Zeile

### 77 — Artikel-Fließtextstrecke mit Tabelle [blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-00-fold.png | blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-02-y750.png | -]
- Anordnung: **Einspaltige, zentrierte Textsäule** von ca. 340 px bis ca. 1100 px, also
  ca. 760 px breit — die einzige zentrierte Lesespalte der Site; alle anderen Seiten
  setzen linksbündig ab ca. 60 px. Kein Inhaltsverzeichnis, keine Sprungmarken, keine
  Seitenleiste, kein mitlaufender CTA.
- Buttons/Komponenten: Keine Buttons. Als Auszeichnungen kommen vor: **Semibold-Inline**
  für Zahlen und Kernaussagen („CHF 18'000 bis CHF 26'000", „8 bis 10 Jahren"),
  ein **Zitatblock** mit einer ca. 2 px roten Senkrechtlinie links, ca. 24 px eingerückt,
  Text kursiv in Mittelgrau mit Semibold-Vorspann („Exklusiv bei AlpenEnergie:"), und eine
  **Tabelle** mit dünnen grauen Rahmenlinien (1 px, umlaufend und zwischen allen Zellen),
  zwei Spalten (ca. 490 px und ca. 270 px), Kopfzeile in Semibold ohne Hintergrundfläche,
  Summenzeilen ebenfalls Semibold. Kein Zebra-Streifen, keine Rundung an der Tabelle.
- Typo: Fließtext ca. 15 px Regular Anthrazit mit manuellen Zeilenumbrüchen (die Zeilen
  enden ungleich weit vor der Spaltenkante). H2 ca. 26 px Bold, H3 ca. 22 px Bold mit
  vorangestellter Ziffer („1. Photovoltaik-Module & Technik"). Der Sprung von H2 zu H3
  ist mit grob 1,2:1 sehr flach; die beiden Ebenen unterscheiden sich fast nur durch die
  Nummerierung. Ein kursiver Einzeiler dient als Bildunterschrift-Ersatz über der Tabelle.
- Farbe/Fläche: Weiß. Rot erscheint auf der ganzen Textstrecke nur in der einen
  Zitat-Senkrechtlinie — das ist der sparsamste Akzenteinsatz der Site.
- Abstände/Rhythmus: Ca. 55 px über einer H2, ca. 20 px von H2 zum Absatz, ca. 25 px
  zwischen Absätzen, ca. 45 px vor und nach dem Zitatblock, ca. 45 px vor der Tabelle,
  Zeilenhöhe in der Tabelle ca. 45 px.
- Mobil: nicht geprüft. Zur Tabelle ist ohne Mobil-Slice offen, ob sie scrollt oder
  umbricht — **nicht geprüft**, nicht geraten.
- Pattern: Kandidat: Zentrierte Artikelsäule mit roter Zitatlinie und Rahmentabelle

### 78 — Schluss-CTA und Footer (Wiederholung) [blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-06-y3596.png | -]
- Der Endslice ist **nicht per Read geöffnet** worden; CTA-Band und Footer sind für diese
  Route nicht belegt, als Site-Muster über 16, 17 und 48 gesichert.
  `blog__solaranlage-einfamilienhaus-kosten-schweiz-2026-desktop-click-y0-00-Kontaktformular_öffnen.png`
  liegt als Zustandsshot vor, wurde nicht gelesen — Wirkung **nicht belegt**.
- Mobil: nicht geprüft.
- Pattern: wie 16 und 17.

## Seite: /solaranlage-basel

Lokale Landingpage (Ort im Titel). Sie mischt bekannte Site-Bausteine mit vier auf dieser
Route erstmals gelesenen Blöcken: Kennzahl-Band auf Schwarz (81), Produkt-Tabs (82),
Vorteils-Vierfeld auf Schwarz (85) und die Gemeinde-Linkliste (89). Header und Footer sind
die Site-Standards aus 02 und 17. Ein Marquee liegt auf dieser Route **nicht** über dem
Header: `solaranlage-basel-desktop-00-fold.png` beginnt direkt mit der transparenten
Navileiste, anders als `home-desktop-00-fold.png`.

### 79 — Lokal-Hero mit Doppel-CTA und Partnerlogos [solaranlage-basel-desktop-00-fold.png | solaranlage-basel-mobile-00-fold.png]
- Anordnung: Vollbreites Abendfoto (dasselbe Haus-Motiv wie der Startseiten-Hero, aber
  **ohne die freigestellten Mitarbeiter** — vgl. `home-hover-00.png`, wo zwei Personen
  rechts stehen). Textblock linksbündig ab ca. 60 px, Spalte auf ca. 610 px begrenzt und
  auf halber Höhe gesetzt. Header transparent darüber, kein Marquee. Bandhöhe ca. 750 px
  bis zur Logoleiste, also tiefer als der Produkt-Hero (18) und etwa auf Startseiten-Niveau.
  Rechts unten im Foto zwei Partnerlogos (EcoFlow „Official Partner", Buderus) bei ca.
  y 795, weiß auf dem dunklen Bild und deutlich abgesetzt vom Text.
- Buttons/Komponenten: Doppel-CTA nebeneinander bei ca. y 619. Links „Jetzt Ersparnis
  berechnen", rot gefüllt (Messung an `solaranlage-basel-desktop-00-fold.png`:
  `rgb(233,51,35)` = `#e93323`, deckt sich exakt mit der Leitfarbe), weißes Semibold-Label,
  Radius ca. 8 px, Höhe ca. 38 px. Rechts „Erklärvideo ansehen", helle Füllung
  (`rgb(247,247,247)` = `#f7f7f7`, gemessen) mit dunklem Label — kein Play-Icon, obwohl es
  ein Video ankündigt. Gleiche Höhe, gleicher Radius; der Rang läuft wieder allein über
  Farbe, wie im Header (02). Darüber eine Eyebrow-Zeile „ALLES AUS EINER HAND" in Caps mit
  dem roten Rautensignet davor.
- Typo: H1 zweizeilig, ca. 58 px Bold, sehr enge Zeilenhöhe (ca. 1,05) — die zwei Zeilen
  stehen fast auf Block. Der Gedankenstrich am Zeilenende („Solaranlage Basel —") trägt
  den Umbruch. Subtext ca. 16 px Regular, dreizeilig, mit manuellen Umbrüchen. Eyebrow
  ca. 13 px Semibold Caps mit Letterspacing.
- Farbe/Fläche: Foto, kein Overlay-Verlauf erkennbar; die Lesbarkeit kommt aus dem von
  Haus aus dunklen linken Bildbereich. Rot sitzt in genau zwei Elementen: Eyebrow-Signet
  und Primär-CTA.
- Abstände/Rhythmus: Ca. 45 px von Eyebrow zur H1, ca. 30 px von H1 zum Subtext, ca. 45 px
  vom Subtext zum CTA-Paar, ca. 16 px Gasse zwischen den beiden Buttons.
- Mobil: `solaranlage-basel-mobile-00-fold.png` zeigt dieselbe Reihenfolge, aber die
  beiden CTA **stapeln untereinander** statt nebeneinander, beide linksbündig und nicht
  auf volle Breite gezogen — sie behalten ihre Inhaltsbreite. H1 bricht auf drei Zeilen
  (ca. 34 px), der Text rutscht ins untere Drittel, Header auf Logo plus Burger reduziert.
  Die Partnerlogos fallen mobil ersatzlos weg.
- Pattern: `P-HERO-FOTO-LINKS` — hier in der Variante mit Doppel-CTA und Partnerleiste im
  Bild.

### 80 — Logo-Laufband, achtstellig [solaranlage-basel-desktop-02-y750.png | -]
- Anordnung: Vollbreites weißes Band direkt unter dem Hero, ca. 88 px hoch, mit dünner
  Trennlinie oben und unten. Acht Logos in gleichmäßigem Abstand (EcoFlow, SWO, Buderus,
  SWISSOLAR, Schweizerkreuz, dann Wiederholung EcoFlow, SWO, Buderus) — die Wiederholung
  ab Position sechs plus der rechts angeschnittene Buderus-Schriftzug belegen, dass es
  eine laufende Schleife ist, kein statisches Raster.
- Buttons/Komponenten: keine, reine Logoleiste ohne Karten oder Rahmen.
- Typo: nur Wortmarken der Partner, keine eigene Typo, keine Überschrift wie „Unsere
  Partner".
- Farbe/Fläche: Weiß. Die Logos laufen in Grau, nicht in Markenfarbe — an den Rändern
  (`solaranlage-basel-desktop-02-y750.png`, links das EcoFlow bei ca. x 115) sind sie
  zusätzlich ausgeblendet, es liegt also eine Maske über beiden Bandenden.
- Abstände/Rhythmus: Logo-Mittenabstand ca. 175 px, Logohöhe ca. 20 px.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Graues Partner-Logo-Laufband mit Randmaske

### 81 — Kennzahl-Band auf Schwarz, Text links / Vierfeld rechts [solaranlage-basel-desktop-04-y2250.png | -]
- Anordnung: Vollbreite schwarze Fläche, ca. 440 px hoch, in zwei Hälften geteilt. Links
  ab ca. 60 px eine Textsäule (Eyebrow „ZAHLEN DIE ÜBERZEUGEN", H2 „Unsere Erfolge",
  sechszeiliger Fließtext, Spaltenbreite ca. 490 px). Rechts ein 2x2-Raster aus vier
  Kennzahlen, Spaltenstart bei ca. 660 px und ca. 960 px — die beiden Zahlenspalten sind
  also enger gesetzt als die Textspalte breit ist, rechts bleibt ab ca. 1110 px eine große
  Leerfläche stehen. Das ist die auffälligste Asymmetrie der Seite.
- Buttons/Komponenten: keine. Reines Zahlen-Text-Band ohne CTA — ungewöhnlich für ein
  dunkles Band auf dieser Site (vgl. 09 und 83, die beide einen CTA tragen).
- Typo: Kennzahlen ca. 44 px Bold in Weiß mit angehängtem „+", Label darunter ca. 15 px
  Regular. H2 ca. 34 px Bold. Fließtext ca. 15 px Regular in leicht gedämpftem Weiß,
  Zeilenhöhe ca. 1,55. Eyebrow ca. 13 px Caps mit Rautensignet.
- Farbe/Fläche: Gemessen `rgb(26,26,26)` = `#1a1a1a` — ein neutrales Schwarz, **nicht**
  der Schiefer-Verlauf der übrigen dunklen Bänder (Footer misst hier `#59626b`). Auf
  dieser Route ist Schwarz die dunkle Grundfläche, das trennt sie optisch von Startseite
  und Footer. Rot erscheint im Band nur im Eyebrow-Signet.
- Abstände/Rhythmus: Ca. 100 px Bandpadding oben, ca. 55 px zwischen Eyebrow und H2,
  ca. 30 px H2 zum Text. Im Zahlenraster ca. 140 px Zeilenabstand und ca. 300 px
  Spaltenabstand; ca. 12 px von der Zahl zum Label.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Schwarzes Kennzahl-Band, Textsäule links / 2x2-Zahlen rechts

### 82 — Produktkatalog mit Tab-Reihe und Zweispalter-Panel [solaranlage-basel-desktop-04-y2250.png | solaranlage-basel-desktop-06-y3750.png | -]
- Anordnung: Weiße Sektion mit zentriertem Kopf (Eyebrow, zweizeilige H2, Subzeile),
  darunter eine horizontal zentrierte Reihe aus **sechs Tabs** (Energiemanager, Solarmodul,
  Wärmepumpe, Stromspeicher, Wallbox, Ersatzstrom) bei ca. y 1168. Unter den Tabs ein
  Panel aus zwei gleich breiten Karten (je ca. 580 px, Gasse ca. 15 px): links Produktfoto,
  rechts Titel, Fließtext, Häkchenliste und CTA. Der Panelabschluss ist in
  `solaranlage-basel-desktop-06-y3750.png` zu sehen.
- Buttons/Komponenten: Tabs als Pillen mit Icon links und Label, Höhe ca. 44 px, Radius
  ca. 8 px. Der aktive Tab ist rot gefüllt mit weißem Label (Messung an
  `solaranlage-basel-desktop-04-y2250.png`: `rgb(233,51,35)`), die fünf inaktiven tragen
  eine hellgraue Füllung (`rgb(245,245,245)` = `#f5f5f5`, gemessen) mit dunklem Label und
  grauem Icon. Kein Rahmen, keine Unterstreichung — der Zustand läuft rein über die
  Füllfarbe. Im Panel ein roter CTA „Produkt ansehen" (Radius ca. 8 px). Die Häkchenliste
  nutzt rote, abgerundete Quadrat-Icons mit weißem Haken, nicht die sonst üblichen Kreise.
- Typo: H2 ca. 38 px Bold zweizeilig, zentriert. Subzeile ca. 16 px Regular Grau. Panel-
  Titel ca. 34 px Bold linksbündig. Tab-Labels ca. 15 px Regular — auch der aktive Tab
  bleibt Regular, es gibt keinen Weight-Wechsel beim Zustand.
- Farbe/Fläche: Sektionsfläche weiß, Panelkarten in `#f5f5f5` (gemessen) mit ca. 16 px
  Radius. Die Fotokarte links läuft randlos bis an die Kartenkante, ohne Innenabstand.
- Abstände/Rhythmus: Ca. 110 px Sektionspadding oben, ca. 40 px von der Subzeile zu den
  Tabs, ca. 12 px Gasse zwischen den Tabs, ca. 55 px von der Tab-Reihe zum Panel.
- Mobil: nicht geprüft. Ob die sechs Tabs mobil scrollen oder umbrechen, ist damit
  **nicht geprüft** und wird nicht geraten.
- Pattern: Kandidat: Sechs-Tab-Produktkatalog mit Foto/Text-Zweispalter-Panel

### 83 — Schwarzes CTA-Band mit Telefonzeile [solaranlage-basel-desktop-06-y3750.png | -]
- Anordnung: Vollbreites schwarzes Band, ca. 260 px hoch, zweispaltig. Links ab 60 px eine
  Zeile aus H2 und zweizeiligem Subtext (Spalte bis ca. 715 px). Rechts eine
  rechtsbündige Einheit aus CTA und darunterliegender Telefonzeile, endend bei ca. 1380 px.
  Die Mitte bleibt leer — das Band ist bewusst an beide Ränder gezogen.
- Buttons/Komponenten: Ein CTA „Jetzt Gespräch vereinbaren", rot gefüllt, Radius ca. 8 px,
  Höhe ca. 38 px, ca. 290 px breit. Darunter zentriert unter dem Button die Zeile „Oder
  anrufen: +41 61 539 15 50" — die Nummer Semibold, das „Oder anrufen:" Regular. Kein
  Telefon-Icon.
- Typo: H2 ca. 30 px Bold, einzeilig, mit Bindestrich als Trenner („Solaranlage Basel -
  Jetzt starten"). Subtext ca. 15 px Regular, zwei manuelle Zeilen. Telefonzeile ca. 15 px.
- Farbe/Fläche: Dasselbe `#1a1a1a` wie Sektion 81 (Messung dort), also die zweite
  Wiederholung der schwarzen Grundfläche auf dieser Route. Rot nur im CTA.
- Abstände/Rhythmus: Ca. 85 px Bandpadding oben, ca. 20 px von H2 zum Subtext, ca. 25 px
  vom CTA zur Telefonzeile. CTA-Oberkante liegt ca. auf Höhe der H2-Grundlinie.
- Mobil: nicht geprüft.
- Pattern: `P-CTA-END` — hier als Zwischen-CTA mitten auf der Seite, nicht als Abschluss,
  und mit Telefonnummer als zweitem Kontaktweg.

### 84 — Foto-Text-Zweispalter plus Karte mit Schweiz-Silhouette [solaranlage-basel-desktop-06-y3750.png | -]
- Anordnung: Zwei gestapelte Einheiten auf Weiß. (a) Oben ein Zweispalter: links Foto
  (ca. 610 x 315 px, ca. 12 px Radius, Beratungssituation am Tisch), rechts ab ca. 730 px
  H2, Fließtext und CTA. (b) Darunter eine vollbreite helle Karte (ca. 60 px bis 1380 px,
  Radius ca. 16 px, Höhe ca. 435 px): links Text mit zweizeiliger H2, Subzeile,
  Häkchenliste und CTA; rechts eine rot eingefärbte Schweizer Landeskarte mit weißem
  Kreuz, dahinter graue Rauten als Dekor.
- Buttons/Komponenten: Zwei rote CTA, beide Radius ca. 8 px — „Mehr über uns" in (a) und
  „Jetzt Offerte sichern" in (b), letzterer wortgleich mit dem Header-CTA. Häkchenliste
  mit den roten Quadrat-Icons wie in Sektion 82, zwei Einträge.
- Typo: H2 in (a) zweizeilig ca. 30 px Bold mit manuellem Umbruch; H2 in (b) ca. 32 px
  Bold, ebenfalls zweizeilig. Fließtext ca. 15 px Regular Grau, Zeilenhöhe ca. 1,55.
  Häkchen-Labels ca. 15 px.
- Farbe/Fläche: Sektionsfläche weiß, Karte in (b) hellgrau (Messung an
  `solaranlage-basel-desktop-06-y3750.png`: `rgb(245,245,245)` = `#f5f5f5`, dieselbe
  Kartenfläche wie in 82). Die Landeskarte ist die einzige Stelle der Route, an der Rot
  als große Bildfläche statt als Akzent auftritt — sie läuft nach links in einen
  Weichzeichner aus.
- Abstände/Rhythmus: Ca. 90 px von der Bandkante zum Foto, ca. 60 px Gasse zwischen Foto
  und Textspalte, ca. 25 px vom Text zum CTA. In der Karte ca. 60 px Innenabstand links,
  ca. 30 px zwischen den Häkchenzeilen.
- Mobil: nicht geprüft.
- Pattern: `P-SPLIT-FOTO-TEXT` in (a); für (b) Kandidat: Regionskarte mit Landessilhouette
  als Flächengrafik.

### 85 — Vorteils-Vierfeld auf Schwarz mit Icon-Kacheln [solaranlage-basel-desktop-08-y5250.png | -]
- Anordnung: Vollbreite schwarze Sektion, ca. 500 px hoch, mit zentriertem Kopf (Eyebrow
  „IHRE VORTEILE", einzeilige H2) und darunter einem 2x2-Raster. Jedes Feld ist eine
  Zeile aus quadratischem Icon links (ca. 82 px, Radius ca. 20 px) und Textblock rechts.
  Spaltenstart bei ca. 85 px und ca. 745 px, Feldbreite je ca. 600 px.
- Buttons/Komponenten: Vier Icon-Kacheln (Standortnadel, Portemonnaie, Häkchen-Kreis,
  Personengruppe). Die Kacheln sind **nicht rot**, sondern eine dunkelgraue Fläche
  (Messung an `solaranlage-basel-desktop-08-y5250.png`: `rgb(49,49,49)` = `#313131`) mit
  weißem Linien-Icon — auf der schwarzen Fläche entsteht dadurch nur ein schwacher
  Kontrast. Keine Buttons, kein CTA in der Sektion.
- Typo: Feldtitel ca. 19 px Semibold Weiß, Fließtext ca. 15 px Regular in gedämpftem Weiß,
  zweizeilig. H2 ca. 38 px Bold zentriert. Der Abstand Titel zu Text ist mit ca. 8 px sehr
  eng — enger als in vergleichbaren Vorteilsblöcken der Site.
- Farbe/Fläche: Wieder `#1a1a1a` (wie 81 und 83). Rot kommt in der ganzen Sektion nur im
  Eyebrow-Signet vor, das ist der sparsamste Akzenteinsatz aller dunklen Bänder hier.
- Abstände/Rhythmus: Ca. 95 px Sektionspadding oben, ca. 45 px vom Kopf zum Raster,
  ca. 150 px Zeilenabstand im Raster, ca. 60 px Gasse zwischen Icon und Text.
- Nicht lesbar: Zwei Felder tragen denselben Fließtext („Wir kennen die Förderbestimmungen
  von Basel-Stadt und allen Gemeinden in Basel-Landschaft genau.") unter verschiedenen
  Titeln — sichtbarer Dublettenfehler im Feld „Über 70 Projekte in Basel".
- Pattern: Kandidat: Schwarzes Vorteils-Vierfeld mit gerahmten Icon-Kacheln

### 86 — Kundenstimmen aus Video- und Zitatkacheln [solaranlage-basel-desktop-08-y5250.png | solaranlage-basel-desktop-10-y6750.png | -]
- Anordnung: Weiße Sektion mit **linksbündigem** Kopf (Eyebrow „KUNDENSTIMMEN",
  zweizeilige H2, zweizeiliger Subtext) — anders als die zentrierten Köpfe in 82 und 85.
  Darunter ein gemischtes Kachelfeld über mehrere Reihen: Reihe 1 eine breite Videokachel
  links (ca. 785 px) und eine Zitatkachel rechts (ca. 520 px); Reihe 2 dieselbe Aufteilung
  spiegelbildlich (Zitat links, Foto rechts); Reihe 3 ein Dreierraster aus gleich breiten
  Kacheln (je ca. 435 px). Alle Kacheln ca. 12 px Radius.
- Buttons/Komponenten: Auf der Videokachel ein roter Play-Button (Kreis ca. 62 px, weißes
  Dreieck) zentriert im Bild. Auf den Fotokacheln der dritten Reihe sitzt oben rechts ein
  kreisrunder Zustandsknopf: zwei Kacheln zeigen ein `+` auf halbtransparentem Weiß, die
  mittlere ein `x` — die mittlere Kachel ist damit im **aufgeklappten Zustand** und zeigt
  statt des Fotos das Zitat über einem abgedunkelten, weichgezeichneten Bild. Damit ist
  der Umschaltzustand dieser Komponente in einem statischen Shot belegt. Sternreihen
  (fünf gelbe Sterne, ca. 11 px) auf allen Zitat- und Fotokacheln.
- Typo: Zitat-Überschriften ca. 22 px Bold, Fließtext ca. 14 px Regular Grau. Name auf den
  Fotokacheln ca. 20 px Bold Weiß, Ortsangabe darunter ca. 14 px Regular. H2 ca. 40 px Bold.
- Farbe/Fläche: Zitatkacheln in `#f5f5f5` (gemessen in 82, gleiche Fläche), Fotokacheln
  vollflächig Bild mit dunklem Verlauf am unteren Rand für die Namenszeile. Rot nur im
  Play-Button und im `x`-Knopf.
- Abstände/Rhythmus: Ca. 100 px Sektionspadding oben, ca. 60 px vom Kopf zum Kachelfeld,
  ca. 20 px Gasse zwischen den Kacheln waagerecht wie senkrecht.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Testimonial-Bento aus Video-, Zitat- und aufklappbaren Fotokacheln

### 87 — Beratungs-CTA auf Schwarz mit freigestellter Person [solaranlage-basel-desktop-10-y6750.png | solaranlage-basel-desktop-11-y7500.png | -]
- Anordnung: Vollbreites schwarzes Band, ca. 590 px hoch. Links ab 60 px eine Textsäule
  (H2, zwei Absätze, CTA), Spalte bis ca. 625 px. Rechts eine freigestellte Person
  (Mitarbeiter mit verschränkten Armen), die bis an die Bandunterkante läuft und dort
  **angeschnitten** ist — der Zuschnitt endet an der Kante, es gibt keinen Sockel.
- Buttons/Komponenten: Ein roter CTA „Offerte anfordern", Radius ca. 8 px, Höhe ca. 38 px,
  ca. 175 px breit. Sonst keine Komponenten.
- Typo: H2 ca. 40 px Bold einzeilig. Zwei Absätze ca. 15 px Regular in gedämpftem Weiß,
  je zwei manuelle Zeilen, dazwischen ca. 22 px Abstand. Der zweite Absatz trägt die
  inhaltliche Zuspitzung („Lieber kein Auftrag als ein unzufriedener Kunde") in derselben
  Größe wie der erste — kein typografischer Rang.
- Farbe/Fläche: Wieder `#1a1a1a`, die vierte schwarze Fläche der Route. Kein Foto-Overlay,
  die Person steht direkt auf der Fläche.
- Abstände/Rhythmus: Ca. 120 px Bandpadding oben, ca. 40 px von H2 zum ersten Absatz,
  ca. 45 px vom letzten Absatz zum CTA.
- Mobil: nicht geprüft.
- Pattern: `P-CTA-END` — Variante mit freigestellter Person statt Fotoband, verwandt mit
  Sektion 56.

### 88 — Wirtschaftlichkeits-Textblock, Titel zentriert / Text links [solaranlage-basel-desktop-11-y7500.png | solaranlage-basel-desktop-12-y8250.png | -]
- Anordnung: Helle Sektion, ca. 390 px hoch. Die H2 steht **zentriert**, die drei
  Textabsätze darunter dagegen **linksbündig ab ca. 120 px** und nur ca. 815 px breit —
  rechts bleibt über 500 px leer. Diese Mischung aus zentriertem Titel und linksbündigem,
  schmalem Text ist auf der Route einmalig und wirkt wie ein nicht zu Ende gesetzter Block.
- Buttons/Komponenten: keine. Reiner Textblock ohne CTA, ohne Icons, ohne Karten.
- Typo: H2 ca. 36 px Bold einzeilig. Absätze ca. 15 px Regular Anthrazit mit manuellen
  Zeilenumbrüchen (je zwei Zeilen), Zeilenhöhe ca. 1,55.
- Farbe/Fläche: Gemessen `rgb(245,245,245)` = `#f5f5f5` — dieselbe Graufläche, die sonst
  als Kartenfüllung dient, hier über die volle Breite. Kein Rot in der ganzen Sektion.
- Abstände/Rhythmus: Ca. 70 px Sektionspadding oben, ca. 50 px von der H2 zum ersten
  Absatz, ca. 25 px zwischen den Absätzen.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Zentrierter Titel über linksbündiger Schmalspalte

### 89 — Gemeinde-Linkliste, einspaltig zentriert [solaranlage-basel-desktop-12-y8250.png | solaranlage-basel-desktop-14-y9750.png | -]
- Anordnung: Sehr hohe Sektion (über 1600 px) mit zentriertem Kopf (H2, einzeilige
  Subzeile) und darunter einer **einzigen zentrierten Linkspalte**: rund 30 Ortslinks
  („Solaranlage Riehen", „Solaranlage Allschwil" …) plus am Ende zwei Projektlinks
  („Projekt in Basel — Rudolf G.", „Projekt in Basel — Eva T."), alle mittig
  ausgerichtet und untereinander. Kein Raster, keine Spalten, keine Chips — bei dieser
  Menge ist das die auffälligste Layoutentscheidung der Seite und erzeugt links wie
  rechts je über 600 px Leerraum.
- Buttons/Komponenten: keine. Reine Textlinks ohne Unterstreichung, ohne Pfeil, ohne
  Kachel. Ein Hover-Zustand ist für diese Liste **nicht belegt** — es existiert kein
  Hover-Shot dieser Route.
- Typo: Links ca. 15 px Regular Anthrazit, Zeilenabstand ca. 34 px. H2 ca. 40 px Bold
  zentriert. Subzeile ca. 15 px Regular Grau. Die Links sind typografisch nicht von
  Fließtext unterscheidbar.
- Farbe/Fläche: Gemessen `rgb(247,249,245)` = `#f7f9f5` — ein sehr leicht grünstichiges
  Off-White, das sich vom `#f5f5f5` der Nachbarsektion 88 minimal abhebt. Der Wechsel ist
  im Slice als feine Kante bei ca. y 355 sichtbar. Kein Rot.
- Abstände/Rhythmus: Ca. 120 px Sektionspadding oben, ca. 50 px von der Subzeile zur
  Liste, ca. 34 px Zeilenrhythmus in der Liste.
- Mobil: nicht geprüft.
- Pattern: Kandidat: Einspaltige zentrierte Ortslink-Liste (SEO-Verteiler)

### 90 — FAQ, Textsäule links / Akkordeon rechts [solaranlage-basel-desktop-14-y9750.png | -]
- Anordnung: Weiße Sektion, ca. 880 px hoch. Links ab 60 px eine schmale Textsäule
  (zweizeilige H2, Hinweiszeile mit Link), Breite ca. 405 px. Rechts ab ca. 580 px die
  Akkordeon-Spalte bis 1380 px, also gut die doppelte Breite. Sechs Einträge, der erste
  offen.
- Buttons/Komponenten: Akkordeonzeilen als Karten mit ca. 12 px Radius und hellgrauer
  Füllung (`rgb(245,245,245)` = `#f5f5f5`, gemessen), Höhe geschlossen ca. 60 px. Rechts
  in jeder Zeile ein Zustandsknopf: geschlossen ein graues `+` ohne Kreisfläche, offen ein
  **rot gefüllter Kreis mit weißem `x`** (ca. 30 px). Der offene Eintrag zeigt seine
  Antwort eingerückt mit einem kleinen abknickenden Pfeil-Glyph als Marker. Zustand offen
  und geschlossen sind damit in einem Shot belegt, ohne Hover-Aufnahme.
- Typo: Fragen ca. 18 px Semibold Anthrazit, die sechste bricht zweizeilig. Antwort
  ca. 15 px Regular Grau, vierzeilig. H2 zweifarbig gesetzt: „Energiekonzept" in Hellgrau,
  „FAQ" in Anthrazit — derselbe Zweifarben-Trick wie in Sektion 54. Die Hinweiszeile trägt
  „Jetzt Kontakt aufnehmen" als **unterstrichenen** Link in Semibold, der einzige
  unterstrichene Link der Route.
- Farbe/Fläche: Weiß mit grauen Kartenflächen. Rot nur im Schließen-Knopf des offenen
  Eintrags.
- Abstände/Rhythmus: Ca. 130 px Sektionspadding oben, ca. 20 px Abstand zwischen den
  Akkordeonzeilen, ca. 30 px Innenabstand in der offenen Karte.
- Mobil: nicht geprüft.
- Pattern: `P-FAQ-AKKORDEON` — Variante mit Textsäule links statt zentriertem Kopf.

### 91 — Schluss-CTA auf Foto mit Trust-Zeile [solaranlage-basel-desktop-14-y9750.png | solaranlage-basel-desktop-16-y10937.png | -]
- Anordnung: Vollbreites Fotoband (Haus mit PV-Dach im Grünen), ca. 420 px hoch. Textblock
  linksbündig ab 60 px in einer auf ca. 430 px begrenzten Spalte, vertikal etwa mittig.
  Der Fotoinhalt liegt rechts, der Text sitzt im dunkleren linken Bildbereich.
- Buttons/Komponenten: Ein roter CTA „Jetzt Offerte anfordern", Radius ca. 8 px, Höhe
  ca. 38 px. Darunter eine dreiteilige Trust-Zeile „Kostenlos • Unverbindlich • In 2
  Minuten ausgefüllt" mit Punkten als Trenner, ca. 14 px, ohne Icons.
- Typo: H2 ca. 40 px Bold einzeilig, darüber Eyebrow „WIR BERATEN SIE IN BASEL!" in Caps
  mit Rautensignet. Subtext ca. 15 px Regular, zwei manuelle Zeilen.
- Farbe/Fläche: Foto ohne erkennbares Farb-Overlay; der Text steht auf dem von Haus aus
  hellen Bild und bleibt dennoch dunkel-auf-hell lesbar, weil die linke Bildhälfte
  schattig ist. Rot in Eyebrow-Signet und CTA.
- Abstände/Rhythmus: Ca. 90 px Bandpadding oben, ca. 30 px vom Eyebrow zur H2, ca. 25 px
  H2 zum Subtext, ca. 30 px zum CTA, ca. 20 px vom CTA zur Trust-Zeile.
- Mobil: nicht geprüft.
- Pattern: `P-CTA-END` — hier mit Trust-Zeile unter dem Button.

### 92 — Footer, dreietagig (Wiederholung) [solaranlage-basel-desktop-16-y10937.png | -]
- Aufbau identisch zu Sektion 17: Vierspalten-Raster (Logo/Claim/drei Standorte/Social
  links, Linkspalten „Unternehmen" und „Produkte" in Rot, Ansprechpartner Vincent Müller
  rechts mit rundem Porträt und rotem CTA „Offerte anfordern"), darunter drei Blog-Karten
  ohne Kartenfläche, unten die Schlusszeile mit Copyright, „Umgesetzt von MAKE" und den
  drei Ortsnamen Basel / Aargau / Zürich.
- Farbe/Fläche: Messung an `solaranlage-basel-desktop-16-y10937.png`: `rgb(89,98,107)` =
  `#59626b` im oberen Bereich, nach unten dunkler werdend — der Schiefer-Verlauf aus 17,
  bestätigt und hier erstmals gemessen.
- Nicht lesbar: Wie in 17 schneiden zwei Linklabels an der Spaltenkante ab („Referenze",
  „Energiemanagementsystem" ohne Endung) — derselbe Überlauf, also ein Site-Fehler und
  kein Routenproblem.
- Mobil: nicht geprüft.
- Pattern: wie 17.
