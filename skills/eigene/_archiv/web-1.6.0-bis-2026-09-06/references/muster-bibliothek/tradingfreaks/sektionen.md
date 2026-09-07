# TradingFreaks — Sektions-Atlas Startseite `/`

Belegbasis: `shots/` (Sweep 02.09.2026, 1440×900 Fold + 1440×1500 @ 750 px
Scroll, 390×844 Fold + 422 px Scroll). Jede Zeile nennt den Shot, auf dem die
Beobachtung sichtbar ist. Was hier nicht steht, ist nicht geprüft.

## Desktop-Serie 1440

### 1 — Navbar (`home-desktop-00-fold.png`)
Weisse Leiste über der ganzen Breite, Logo links (Wortmarke mit grünem
`TF`-Zeichen), rechts vier Nav-Punkte, davon zwei mit Chevron-Dropdown,
danach der einzige grüne Pill-Button mit Play-Icon. Die Leiste bleibt in allen
Scroll-Shots oben stehen (`home-desktop-05-y3000.png`,
`home-desktop-19-y13500.png` zeigen sie identisch) — `position:sticky` im
CSS (`.navbar-new`). Der Nav-CTA ist auf jedem Shot derselbe grüne Pill.

### 2 — Hero (`home-desktop-00-fold.png`)
Split, Text links, Foto rechts. Über der H1 eine helle Pill-Zeile mit zwei
Trust-Zeichen (Trustpilot-Wertung als Stern-Chip, danach ein zweiter Chip mit
grünem Verifiziert-Zeichen). H1 zweizeilig, sehr gross, fast schwarz. Lead
darunter in Grau, ca. 3 Zeilen, klar schmaler als die H1-Spalte. Darunter ein
CTA-Paar auf einer Zeile: grüner Vollflächen-Button mit Play-Icon links, daneben
ein weisser Button mit Rand und Telefon-Icon. Unter dem CTA-Paar eine flache
Beleg-Leiste: TÜV-Rheinland-Siegel als echte Bildmarke mit ISO-9001-Nummer,
daneben ein Avatar-Stapel aus vier Gesichtern und eine Teilnehmerzahl mit
Plus-Zeichen. Im Foto liegen zwei schwebende weisse Pill-Badges (oben ein
Flaggen-Chip, rechts unten ein Zahl-Chip mit grünem Kreis) über dem Motiv; der
Bildhintergrund trägt eine hellgrüne Kerzenchart-Grafik. Kein Verlauf über dem
Foto, das Motiv bleibt unverfärbt. Cookie-Banner sitzt als Vollbreiten-Leiste
am Fold-Boden.

### 3 — Video-Split (`home-desktop-02-y750.png`)
Split auf der hellen Grundfläche. Links H2 dreizeilig plus Lead, darunter
dasselbe CTA-Paar wie im Hero — grüner Play-Button oben, weisser
Telefon-Button darunter, hier gestapelt statt nebeneinander. Rechts ein
Video-Standbild mit abgerundeten Ecken, mittig ein grosser grüner
Play-Button als Rechteck mit runden Ecken; im Standbild unten rechts ein
eingebrannter Namens-/Rollen-Block (Klarname, Funktion, Domain, Firmierung).

### 4 — Fakten-Raster (`home-desktop-02-y750.png`, `home-desktop-03-y1500.png`)
Raster aus weissen Karten auf hellgrauer Fläche, ungleiche Spaltenbreiten
(schmal/breit im ersten Band, dann drei Karten, dann eine breite). Jede Karte
trägt genau eine Zahl oder einen Fakt und dazu ein eigenes Bildmittel statt
Icon: Teilnehmerzahl mit Avatar-Kreiswolke und grüner Zähl-Blase;
Experten-Zahl mit freigestelltem Team-Gruppenfoto, das über die Kartenkante
hinauswächst; Firmensitz-Karte mit gepunkteter Europakarte, Deutschland in
Grün gepunktet und einer weissen Pill mit Flagge und Firmierung;
Erfahrungs-Karte als Jahres-Kachelreihe (2025 … 2016) in gestaffelter Deckkraft;
Rendite-Karte mit Prozentwert in Grün, Sternchen-Fussnote, echtem
Kurschart in Rot/Grün und einer Zeitraum-Umschaltleiste (1W/MTD/1M/3M/YTD/1J/
Alle); Trade-Karte mit drei Broker-Zeilen (Ticker, LONG/SHORT-Chip,
Ergebniszahl), die oberste voll deckend, die beiden darunter ausgeblendet.
Die Prozent-Karte trägt unter dem Chart eine zweizeilige Kleinschrift-Fussnote
zu historischen Renditen und Risikohinweis.

### 5 — CEO-Zitat-Band (`home-desktop-05-y3000.png`)
Band: eine dunkelblaugraue abgerundete Vollbreiten-Karte auf hellem Grund.
Links langes Zitat in Weiss, in französischen Anführungszeichen, über vier
Zeilen; darunter ein rundes Portraitfoto mit Klarname und Rolle. Keine Karte,
kein Icon, keine Sterne — nur Text plus Gesicht.

### 6 — E-Learning-Säulen, Sticky-Scroll (`home-desktop-05-y3000.png`, `home-desktop-08-y5250.png`)
Layering/Sticky-Scroll auf fast schwarzer Vollflächen-Sektion. Oben zentrierte
zweizeilige H2 in Weiss. Danach links eine Textspalte mit vertikaler heller
Linie als Fortschrittsleiste, je Schritt ein Pill-Chip mit grünem Häkchen und
laufender Nummer („Säule 01" … „Säule 05"), darunter H3 und Fliesstext.
Rechts ein Bild, das beim Scrollen stehen bleibt: dasselbe Büro-Motiv mit
freigestelltem Smartphone, im Display ein Video-Call mit zwei Personen. In
`y3000` steht Säule 01 aktiv, in `y5250` Säule 04/05 — das Bild ist identisch
geblieben. CSS: 13 `position:sticky`-Regeln, aber **keine einzige**
`prefers-reduced-motion`-Regel im Site-CSS.

### 7 — Testimonial-Bühne mit Video-Karten (`home-desktop-11-y7500.png`)
Layering: oben eine abgerundete Vollbreiten-Foto-Bühne (echtes Event-Foto,
vier Männer im Gespräch) mit dunklem Verlauf nach unten; darüber zentriert ein
Trust-Chip-Paar (Sterne-Wertung, Verifiziert-Chip), eine grosse weisse H2 und
darunter eine Trustpilot-Zeile mit Wortlaut-Label, grünem Sterne-Block,
verlinkter Bewertungszahl und dem Trustpilot-Logo. Die Karten-Reihe darunter
ragt in die Bühne hinein: weisse Karten mit Video-Standbild (je mit
TF-Wasserzeichen oben links und Play-Kreis mittig), darunter Vorname,
Sterne-Reihe und Zitat in Anführungszeichen. Versetztes Raster, die aktive
Karte deckend, die Nachbarn abgeblendet.

### 8 — Zitat-Slider (`home-desktop-13-y9000.png`)
Band in einer weissen Karte: grosses Zitat in französischen Anführungszeichen,
darunter Portrait plus Klarname, rechts zwei runde Pfeil-Buttons in hellgrau
für vor/zurück (Beleg der Interaktion:
`home-desktop-click-y8250-00-previous_slide.png`,
`home-desktop-click-y8250-01-next_slide.png`). Unter einer dünnen Trennlinie
ein Fliesstext-Abbinder mit Jahreszahl und Teilnehmerzahl im Fettdruck.

### 9 — TÜV-Zertifikat (`home-desktop-13-y9000.png`)
Split in einer weissen Karte, davor zentriert H2 plus zweizeiliger Lead.
Links das echte Zertifikat als Dokument-Scan (lesbare Registriernummer,
Firmierung mit Anschrift, Gültigkeitsdatum, Unterschrift, IAF-/DAkkS-/
TÜV-Rheinland-Logos). Rechts drei Absätze Fliesstext und eine Bullet-Liste mit
vier Punkten. Kein Siegel-Icon, sondern das Dokument selbst.

### 10 — Buch-Angebot (`home-desktop-15-y10500.png`)
Split in einer sehr hellen Karte. Links ein Produkt-Render (zwei gestapelte
Buchexemplare in Marken-Grün), darauf zwei schwebende weisse Pill-Badges mit
grünem Häkchen. Rechts ein Eyebrow-Chip mit grünem Zeichen, H2 in
Anführungszeichen, Preiszeile mit durchgestrichenem Vorpreis, grüner CTA mit
Play-Icon, darunter eine weisse Versand-Pill mit LKW-Icon und Lieferfrist und
zuletzt ein Avatar-Stapel mit Bestellzahl.

### 11 — Über-uns-Band (`home-desktop-16-y11250.png`)
Band: dunkelblaugraue abgerundete Vollbreiten-Karte, Text links, rechts ein
freigestelltes Portraitfoto, das aus dem Bandrand herauswächst. H2 in Weiss,
drei Absätze Fliesstext, darunter dasselbe CTA-Paar wie im Hero, hier
nebeneinander.

### 12 — FAQ (`home-desktop-16-y11250.png`, Klick-Serie `home-desktop-click-y11250-*.png`)
Akkordeon, Split: links H2 und ein kurzer Hinweistext, rechts weisse
Akkordeon-Zeilen mit fetter Frage und Plus-Zeichen rechts. Die Klick-Shots
belegen vier Fragen-Ziele.

### 13 — Ressourcen-Tabs (`home-desktop-click-y12000-*.png`)
Nur über die Klick-Serie belegt: vier Umschalter (Blogs, Presse, Podcast,
Youtube). Das gerenderte Bild dieser Sektion wurde nicht gelesen.

### 14 — Schluss-CTA-Bühne (`home-desktop-19-y13500.png`)
Band: abgerundete Vollbreiten-Foto-Bühne (echtes Arbeitsplatz-Foto, zwei
Personen an Monitoren) mit dunkler Abdunklung links; rechts ein Trust-Chip mit
Wertung und Zertifikatsnennung, H2 in Weiss, Lead, darunter ein grüner
Vollbreiten-CTA mit Play-Icon und darunter der weisse Telefon-Button.

### 15 — Newsletter (`home-desktop-19-y13500.png`)
Split in einer weissen Karte mit dünnem grünem Rand auf schwarzem Grund.
Links Eyebrow-Pill mit grünem Punkt, H2 zweizeilig, Lead. Rechts zwei
Eingabefelder mit Innen-Label auf hellgrauem Grund und ein grüner
Vollbreiten-Absende-Button, darunter eine Datenschutz-Kleinschrift.

### 16 — Footer (`home-desktop-19-y13500.png`)
Raster auf Schwarz: links Logo und ein Beschreibungsabsatz, rechts vier
Spalten mit Überschrift und Links, die letzte Spalte mit Icon-Zeilen für
soziale Netze.

## Mobil-Serie 390

- Fold (`home-mobile-00-fold.png`): Logo links, Burger-Button rechts als
  hellgraue abgerundete Kachel — der grüne Nav-CTA aus Desktop entfällt. Das
  Hero-Foto entfällt vollständig; die Trust-Chip-Zeile bleibt zweiteilig und
  zentriert, H1 dreizeilig zentriert, Lead zentriert. Das CTA-Paar wird
  gestapelt und vollbreit: grün mit Play-Icon oben, weiss mit Telefon-Icon
  darunter. Darunter beginnt die TÜV-Beleg-Karte, wird aber vom
  Cookie-Banner überdeckt.
- Fakten-Raster (`home-mobile-06-y2110.png`): dasselbe Raster als
  Einspalten-Stapel. Die Karten behalten Bildmittel und Randüberstand
  (Team-Gruppenfoto schneidet an der Kartenkante ab, Europakarte und
  Flaggen-Pill bleiben erhalten). Der grüne WhatsApp-Kreis schwebt unten
  rechts über dem Inhalt.

## Nicht geprüft

Hover-Zustände der Nav-Dropdowns (nur Dateinamen ausgewertet:
`home-desktop-hover-01…04-*.png`), die gerenderten Ressourcen-Tabs, offene
FAQ-Zustände, alle Unterseiten, jede Mobil-Sektion unterhalb `y2110`, das
Verhalten der Sticky-Sektion bei aktiviertem Reduced-Motion.
