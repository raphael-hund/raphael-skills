# Leadfluss — Sektions-Atlas (Design)
Quelle: `shots/` 1440, `shots-mobile/` 390, `shots-routen/` 1440; Stand 02.09.2026.
Nur Sichtbares. Fokus Design, nicht Inhalt.

Gemessene Leitwerte (Pixelmessung auf den PNG, Python/PIL) und Gegenprobe im
Site-CSS (`_next/static/immutable/chunks/3p9_i7ejwsu5f.css`):

- Aktions-Grün `#00c281` — Nav-Button, jeder CTA, Fortschrittsbalken, Icon-Quadrat
  der Lösungsspalte, grün gesetztes Schlüsselwort in H1 und Frage-H2, Branchenzeile
  der Case-Karten. Im CSS zugleich `--brand`, `--signal`, `--ring` und `--chart-1`.
- Navy `#1d2c42` — Fließ- und Headline-Farbe sowie die Fläche des Kontaktbandes.
  Im CSS `--foreground` = `--primary` = `--card-foreground`.
- Grundfläche Weiß `#ffffff`, ruhige Wechselfläche `#f9fbfa` (gemessen; CSS-Nachbarn
  `--muted #eff5f2` / `--secondary #eef6f2`).
- Hairline `#d8e0dc` (= CSS `--border`) — Karten, Chips, FAQ-Zeilen, Kontaktzeilen.
- Hero-Verlauf: `#e2f8f0` oben nach `#f5fcfa` in der Fold-Mitte, kein Vollbild.
- Problem-Rot `#fb2c36` (Randstrich) und `#e7000b` (Icon-Quadrat) — ausschließlich
  in der Problem-Spalte, nie als CTA, nie als Fläche ausserhalb dieser Sektion.
- Sterne `#fcbf02` in den Google-Karten; „Mehr lesen" grün.
- Radius: im CSS `--radius: 0rem`, alle abgeleiteten Radien fallen damit auf 0 —
  sichtbar an den scharfen Ecken von Nav-Button, CTA, Karten und Radio-Kacheln.
  Rund ist nur, wo `9999px` explizit steht: Avatare, Radio-Kreise, der runde
  Slider-Pfeil.
- Schrift: eine Familie (`--font-sans: "Jost"`), keine zweite Textfamilie im CSS.
- Cookie-Overlay: liegt in allen Desktop-Shots unten mittig (ca. y 1290–1480 der
  1500er-Slices) und verdeckt dort den unteren Rand. Aussagen unten stützen sich auf
  unverdeckte Bereiche.

---

## Seite: /

### 01 — Navbar (global, auch auf /anfrage und /faq) [home-desktop-00-fold.png | home-mobile-00-fold.png | anfrage-desktop-00-fold.png | faq-desktop-00-fold.png]
- Anordnung: Dreiteilige Leiste über die volle Breite, Höhe ca. 64 px, unten
  abgeschlossen durch eine Hairline. Logo links bei x≈105, fünf Textlinks als
  Gruppe in der optischen Mitte (x≈505–940), ein Button rechts (x≈1183–1334).
- Buttons/Komponenten: Genau ein Button in der Leiste, gefüllt `#00c281`, weisser
  Text, scharfe Ecken (kein Radius), kein Icon. Die Nav-Links sind reine Textlinks
  ohne Chevron, ohne Unterstrich, ohne Trennlinien.
- Typo: Ein Schnitt für alle Nav-Items, geometrische Grotesk (Jost), ca. 15–16 px,
  Weight ca. 400–500, gemischte Schreibung. Logo-Wortmarke deutlich fetter und
  ca. doppelt so gross, mit vorangestelltem grünem Schleifen-Zeichen.
- Farbe/Fläche: Leiste durchgehend weiss-deckend, auch über dem hellgrünen
  Hero-Verlauf; Links Navy `#1d2c42`. Die Leiste steht auf jedem gelesenen
  Scroll-Slice oben — sticky.
- Abstände/Rhythmus: ca. 30–40 px zwischen den Nav-Items, viel Luft zwischen Logo
  und Link-Gruppe (ca. 240 px). Die Mitte trägt, die Ränder sind offen.
- Mobil (`home-mobile-00-fold.png`): auf zwei Elemente reduziert — Logo links,
  3-Strich-Burger rechts. Der grüne CTA verschwindet aus der Leiste; damit steht
  mobil **keine** Aktion über der Falz.

### 02 — Hero [home-desktop-00-fold.png | home-mobile-00-fold.png]
- Anordnung: Zweistufig. Oben zentriert Eyebrow, H1 und Subline über die
  Mittelspalte (ca. x 200–1240); darunter zweispaltig links ein Foto
  (x≈105–692, y≈460–792) und rechts eine vierzeilige Checkliste plus CTA
  (x≈749–1330).
- Buttons/Komponenten: Genau ein CTA, gefüllt `#00c281`, scharfe Ecken, weisser
  Text mit einem Pfeil-Icon rechts. Die Checkliste nutzt kleine grüne
  Häkchen-Quadrate (`#b8eeda` Fläche, grünes Häkchen) links vom Text — keine
  Karten, keine Trennlinien.
- Typo: Eyebrow in gesperrten Kapitälchen (Navy, ca. 12–13 px, deutliche
  Laufweite). H1 ca. 56–60 px, Weight ca. 700, zweizeilig; darin sind zwei
  Wortgruppen in `#00c281` gesetzt, der Rest bleibt Navy — der Farbwechsel ist
  die einzige Auszeichnung, keine Kursive, kein Unterstrich. Subline ca. 19–20 px,
  Navy, zwei Zeilen, zentriert. Checklisten-Text ca. 15–16 px, normal.
- Farbe/Fläche: Kein Vollbild-Hero. Ein vertikaler Verlauf von `#e2f8f0` unter der
  Navbar nach `#f5fcfa` zur Fold-Mitte trägt die Typo; das Foto ist ein
  rechteckiger Einschub, kein Hintergrund, und bekommt keinen Verlauf und keinen
  Overlay.
- Abstände/Rhythmus: ca. 90 px von Navbar zum Eyebrow, ca. 30 px Eyebrow→H1,
  ca. 40 px H1→Subline, ca. 80 px Subline→Foto/Checkliste.
- Mobil: alles einspaltig und zentriert. Reihenfolge Eyebrow (zweizeilig) → H1
  (fünfzeilig, dieselbe Grün-Auszeichnung) → Subline → Foto → Checkliste. H1
  ca. 34–36 px. Der CTA rutscht unter die Checkliste und liegt damit unter der
  Falz.

### 03 — Kunden-Logowand [home-desktop-02-y750.png]
- Anordnung: Zentrierter Eyebrow, darunter ein 6-spaltiges Raster mit 6 Zeilen
  (36 Plätze) über die Mittelspalte (x≈135–1300, y≈250–620).
- Buttons/Komponenten: Keine. Kein Rahmen, keine Karte, keine Trennlinie um die
  Logos — nur das Raster.
- Typo: Eyebrow in gesperrten Kapitälchen, Navy, ca. 12–13 px. Sonst kein Text.
- Farbe/Fläche: Weisse Fläche. Die Kundenlogos stehen in ihrer Originalform,
  überwiegend graustufig/dunkel, in unterschiedlicher optischer Grösse — sie sind
  nicht auf eine Einheitshöhe normiert und nicht eingefärbt.
- Abstände/Rhythmus: ca. 75 px Eyebrow→erste Logozeile, ca. 65 px Zeilenabstand,
  ca. 130 px Spaltenabstand. Nach unten schliesst die Sektion mit einer Hairline
  gegen die nächste Fläche ab.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 04 — Nutzen-Zickzack [home-desktop-02-y750.png | home-desktop-03-y1500.png]
- Anordnung: Zentrierte zweizeilige H2, darunter drei Blöcke im Zickzack: Block 1
  Text links / Artefakt rechts, Block 2 Artefakt links / Text rechts, Block 3 Text
  links, rechts leer. Jede Halbspalte ca. 490 px breit.
- Buttons/Komponenten: Kein CTA in dieser Sektion. Statt Icons steht gegenüber
  jedem Textblock ein Mockup einer iOS-Push-Benachrichtigung (weisse Kachel mit
  blauem Mail-Icon, fetter Titelzeile, zwei Zeilen Inhalt und „jetzt" rechts),
  leicht schräg/abgesetzt mit weichem Schatten.
- Typo: H2 ca. 36–38 px, Weight 700, Navy, zentriert. Blocktitel als H3 ca. 20–22 px,
  Weight 600. Fliesstext ca. 16 px in `--muted-foreground`-Grau, ca. 4 Zeilen,
  linksbündig, deutlich lockerer Zeilenabstand.
- Farbe/Fläche: Durchgehend die ruhige Fläche `#f9fbfa`; kein Rahmen, keine Karte
  um die Textblöcke. Der einzige Farbreiz ist das Mockup selbst.
- Abstände/Rhythmus: ca. 140 px H2→Block 1, ca. 120 px zwischen den Blöcken.
  Die leere Gegenhälfte in Block 3 bleibt bewusst offen statt gefüllt.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 05 — Kundenergebnisse (Case-Stapel) [home-desktop-04-y2250.png | home-desktop-07-y4500.png]
- Anordnung: Linksbündiger Sektionskopf (Eyebrow, H2, zweizeiliger Lead) über der
  linken Hälfte; darunter untereinander gestapelte, gleich gebaute Karten über die
  volle Mittelspalte (x≈105–1335), Kartenhöhe ca. 500 px. Innerhalb der Karte
  links die Textspalte (x≈152–700), rechts das Foto (x≈744–1287).
- Buttons/Komponenten: Kein CTA je Karte, kein „mehr erfahren"-Link. Zwei
  Umriss-Chips pro Karte (Hairline `#d8e0dc`, scharfe Ecken): Ort mit Pin-Icon,
  Gewerk mit Werkzeug-Icon, beide Icons grün. Darunter das echte Kundenlogo in
  Originalfarben. Über der unteren Bildkante liegt ein fast schwarzer Streifen
  (`#191916`, teiltransparent) mit einem grünen Diagonalpfeil links, einer kleinen
  Kaptionszeile („Ergebnis aus der Zusammenarbeit:") und darunter fett der Zahlwert.
- Typo: Eyebrow in gesperrten grünen Kapitälchen. H2 ca. 36–38 px, Weight 700,
  linksbündig. Firmenname als H3 ca. 28–30 px, Weight 700, Navy. Direkt darunter
  die Branchenzeile in `#00c281`, ca. 17–18 px, Weight 600. Absatz ca. 15–16 px
  grau. Streifen-Kaption ca. 13 px, Zahl ca. 21–22 px Weight 700, beide weiss.
- Farbe/Fläche: Weisse Fläche, Karten weiss mit Hairline-Kontur — die Karte trennt,
  sie färbt nicht. Farbe kommt ausschliesslich aus dem echten Foto, dem Kundenlogo
  und der grünen Branchenzeile.
- Abstände/Rhythmus: ca. 45 px Eyebrow→H2, ca. 35 px H2→Lead, ca. 85 px
  Lead→erste Karte, ca. 40 px zwischen den Karten. Karteninnenabstand ca. 48 px.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 06 — Potenzialanalyse-Funnel [home-desktop-09-y6000.png | home-mobile-21-y8440.png]
- Anordnung: Ganzflächige Foto-Bühne über die volle Breite (Höhe ca. 870 px), darauf
  zentriert Eyebrow, H2 und Subline, darunter eine weisse Karte
  (x≈361–1079, y≈320–765) als Overlay.
- Buttons/Komponenten: Die Karte ist zweigeteilt — Kopfzeile mit rechtsbündigem
  Schrittzähler „Schritt 1 von 5", darunter durch Hairline getrennt der Körper mit
  der Frage und vier Radio-Kacheln im 2×2-Raster (Hairline-Kontur, scharfe Ecken,
  Label links, leerer Kreis rechts). Kein Absende-Button auf Schritt 1: darunter
  steht nur die Hinweiszeile „Tippe auf eine Auswahl". An der Kartenunterkante
  liegt ein 4–5 px hoher Fortschrittsbalken, links `#00c281` auf ca. 20 % Breite,
  Rest `#eff5f2`.
- Typo: Eyebrow in gesperrten grünen Kapitälchen. H2 ca. 34–36 px Weight 700.
  Subline ca. 17 px, zwei Zeilen, zentriert. Frage-H2 in der Karte ca. 26–28 px
  Weight 700, davon der Schlüsselbegriff in `#00c281`. Kachel-Labels ca. 16 px
  normal. Schrittzähler und Hinweiszeile ca. 14 px grau.
- Farbe/Fläche: Das Bühnenfoto ist so stark aufgehellt, dass es fast nur noch als
  Textur wirkt; die weisse Karte hebt sich über einen weichen Schatten ab. Grün
  erscheint hier an genau drei Stellen: Eyebrow, ein Wort in der Frage,
  Fortschrittsbalken.
- Abstände/Rhythmus: ca. 60 px Bühnenoberkante→Eyebrow, ca. 30 px →H2, ca. 40 px
  →Subline, ca. 55 px →Karte. Karteninnenabstand ca. 40 px, Kachelhöhe ca. 62 px,
  Kachelabstand ca. 20 px.
- Mobil: identischer Baustein, einspaltig. Eyebrow, H2 (zweizeilig) und Subline
  (vierzeilig) zentriert auf derselben Bühne, die Karte volle Breite minus Rand,
  Schrittzähler bleibt rechts oben, die vier Kacheln stehen untereinander in voller
  Breite. Weder Zähler noch Fortschrittsbalken werden mobil weggelassen.

### 07 — Google-Bewertungen [home-desktop-09-y6000.png | home-desktop-10-y6750.png]
- Anordnung: Zentrierter Sektionskopf (H2 + eine Zeile Subline), darunter zentriert
  eine Aggregat-Zeile, darunter vier gleich hohe Karten nebeneinander
  (x≈105–1335, Kartenhöhe ca. 390 px); rechts überlappend ein runder Pfeil-Button
  als Slider-Steuerung.
- Buttons/Komponenten: Aggregat-Zeile = grosses Google-G links, daneben
  „Ausgezeichnet auf Google" fett und darunter „5,0" mit fünf gefüllten Sternen
  `#fcbf02` und „(41)" in Grau. Je Karte oben links ein runder echter Avatar mit
  kleinem Google-G als Badge unten rechts, daneben Klarname mit blaugrünem
  Verifiziert-Haken und darunter die Zeitangabe („vor 1 Monat", „vor 6 Monaten").
  Darunter fünf Sterne, dann der Bewertungstext. Lange Texte werden hart auf
  Kartenhöhe abgeschnitten und mit einem grünen „Mehr lesen" beendet — kurze Texte
  bleiben kurz, die Karte wird nicht mit Füllmaterial ausgeglichen.
- Typo: H2 ca. 36–38 px Weight 700 zentriert; Subline ca. 17 px grau. Name ca. 16 px
  Weight 600, Zeitangabe ca. 13 px grau, Bewertungstext ca. 15 px grau mit lockerem
  Zeilenabstand.
- Farbe/Fläche: Weisse Karten auf weisser Fläche, getrennt nur durch Hairline.
  Farbe kommt aus Avatar, Google-G, den gelben Sternen und dem grünen „Mehr lesen".
- Abstände/Rhythmus: ca. 50 px H2→Subline, ca. 75 px →Aggregat, ca. 60 px →Karten,
  ca. 20 px Kartenabstand, Karteninnenabstand ca. 25 px.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 08 — Team [home-desktop-10-y6750.png | home-desktop-11-y7500.png]
- Anordnung: Linksbündiger Kopf (zweizeilige H2 + dreizeiliger Absatz über der
  linken Hälfte), darunter fünf gleich breite Karten nebeneinander
  (x≈105–1335, Karten ca. 225 px breit).
- Buttons/Komponenten: Karte = Hochformat-Porträt oben (ca. 290 px hoch), darunter
  durch Hairline getrennt ein Textfuss mit Name und Rolle, beide zentriert. Kein
  Link, kein Social-Icon, keine Hover-Kachel im Standbild.
- Typo: H2 ca. 36–38 px Weight 700 in zwei Zeilen. Absatz ca. 16 px grau. Name
  ca. 16 px Weight 600 Navy, Rolle ca. 15 px grau.
- Farbe/Fläche: Ruhige Fläche `#f9fbfa`, Karten weiss mit Hairline. Alle fünf
  Porträts sind echte Aufnahmen im selben Setting (Büro/Grünwand), gleiche
  Bildhöhe, gleicher Ausschnitt — die Einheitlichkeit macht die Reihe, nicht ein
  Rahmen.
- Abstände/Rhythmus: ca. 45 px H2→Absatz, ca. 60 px Absatz→Kartenreihe, ca. 25 px
  Kartenabstand.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 09 — Problem / Lösung [home-desktop-11-y7500.png | home-desktop-13-y9000.png]
- Anordnung: Zentrierte H2, darunter zwei Spalten (links x≈105–683, rechts
  x≈758–1335) mit je einem Spaltenlabel und drei Kacheln untereinander, Kachelhöhe
  ca. 215 px. Zwischen den Spalten sitzt pro Zeile mittig ein grüner Pfeil nach
  rechts, der Problem und Lösung als Paar bindet.
- Buttons/Komponenten: Jede Kachel ist ein Foto mit Farbschleier, darauf links ein
  quadratisches Icon-Feld (ca. 48×48, scharfe Ecken) und rechts daneben Titel plus
  zwei Zeilen Text. Links ist das Icon-Quadrat `#e7000b` mit weissem Icon und die
  Kachel trägt am linken Rand einen ca. 3 px breiten Randstrich `#fb2c36`; rechts
  ist das Icon-Quadrat `#00c281` und der Randstrich grün. Kein CTA in der Sektion.
- Typo: H2 ca. 36–38 px Weight 700 zentriert. Spaltenlabels in gesperrten
  Kapitälchen, links rot, rechts grün, ca. 12–13 px. Kacheltitel ca. 21–22 px
  Weight 700, Kacheltext ca. 15–16 px, zwei Zeilen.
- Farbe/Fläche: Weisse Sektionsfläche. Der eigentliche Trick ist die
  Bildbehandlung: links liegt ein dunkler Schleier über dem Foto und der Text ist
  weiss, rechts liegt ein heller Schleier über dem Foto und der Text ist Navy.
  Beide Spalten sind baugleich — nur Helligkeit und Semantikfarbe unterscheiden.
- Abstände/Rhythmus: ca. 80 px H2→Labels, ca. 25 px Labels→erste Kachel, ca. 30 px
  zwischen den Kacheln, ca. 75 px Spaltenabstand.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 10 — Standort Leipzig [home-desktop-13-y9000.png]
- Anordnung: Klassischer Split, links Text (x≈105–690), rechts ein rechteckiges
  Foto (x≈744–1335), beide auf gleicher Oberkante.
- Buttons/Komponenten: Ein CTA, gefüllt `#00c281`, scharfe Ecken, weisser Text mit
  Pfeil — derselbe Bau wie im Hero.
- Typo: Eyebrow in gesperrten grünen Kapitälchen. H2 ca. 36–38 px Weight 700.
  Zwei Absätze à ca. 3 Zeilen, ca. 16 px grau.
- Farbe/Fläche: Weisse Fläche. Das Foto ist eine echte Luftaufnahme der Stadt mit
  erkennbaren Bauten, kein Karten-Rendering und kein Stock-Skyline-Motiv.
- Abstände/Rhythmus: ca. 30 px Eyebrow→H2, ca. 40 px H2→Absatz 1, ca. 30 px
  zwischen den Absätzen, ca. 45 px →CTA.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 11 — Kontakt-Band (einzige dunkle Sektion) [home-desktop-15-y10289.png]
- Anordnung: Vollbreites Band in Navy `#1d2c42` (Höhe ca. 810 px). Innen ein
  Split: links ein quadratisches Karten-Fenster (x≈232–700, ca. 625 px hoch),
  rechts der Textblock (x≈740–1207).
- Buttons/Komponenten: Links ein echtes eingebettetes Google-Maps-Fenster mit
  Info-Karte oben (Firmenname, vollständige Adresse, „5.0 ★ (41)", Öffnen-Icon),
  rotem Standort-Pin, Zoom- und Vollbild-Steuerung und sichtbarem
  Google-Copyright-Fuss — keine stilisierte Karten-Grafik. Rechts ein grüner CTA
  mit Pfeil, darunter drei gleich gebaute Zeilen-Kacheln mit dünner heller Kontur:
  je ein grünes Umriss-Icon links (Uhr, Briefumschlag, Hörer), darüber ein kleines
  graues Label und darunter der Wert fett in Weiss — Geschäftszeiten, E-Mail und
  Telefonnummer stehen im Klartext, nicht hinter einem Formular.
- Typo: H2 ca. 36–38 px Weight 700 in Weiss. Satz darunter ca. 17 px in hellem
  Grau, zwei Zeilen. Label ca. 13 px grau, Wert ca. 17 px Weight 600 weiss.
- Farbe/Fläche: Die einzige dunkle Fläche der Seite, und sie steht als Letztes vor
  dem Footer. Grün bleibt auch hier reine Aktions- und Icon-Farbe.
- Abstände/Rhythmus: ca. 100 px Bandoberkante→Inhalt, ca. 50 px H2→Satz, ca. 55 px
  →CTA, ca. 60 px →erste Zeilen-Kachel, ca. 20 px zwischen den Kacheln.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

### 12 — Footer [home-desktop-15-y10289.png]
- Anordnung: Helle Fläche `#f9fbfa`. Vierspaltig: links Markenblock
  (x≈105–420), rechts drei Link-Spalten bei x≈515, x≈802 und x≈1089. Darunter eine
  Hairline über die volle Mittelspalte, darunter eine Schlusszeile mit Copyright
  links und drei Social-Icons rechts.
- Buttons/Komponenten: Im Markenblock Logo, ein zweizeiliger Satz, ein grüner CTA
  mit Pfeil (dritte Wiederholung desselben Buttons) und darunter Firmenname,
  E-Mail und Telefon als Klartext untereinander. Die Social-Icons (LinkedIn,
  Instagram, YouTube) sitzen in quadratischen Umrissfeldern mit Hairline, scharfe
  Ecken, Icon in Navy.
- Typo: Spaltenüberschriften ca. 16 px Weight 600 Navy; Links ca. 15–16 px grau,
  ohne Unterstrich. Markensatz ca. 15 px grau. Copyright ca. 14 px grau.
- Farbe/Fläche: Kein zweiter dunkler Block — der Footer bleibt hell und übernimmt
  damit nicht die Rolle des Kontaktbandes darüber.
- Abstände/Rhythmus: ca. 55 px Spaltenkopf→erster Link, ca. 32 px Linkabstand;
  ca. 60 px vom letzten Block zur Trennlinie, ca. 30 px Trennlinie→Schlusszeile.
- Mobil: nicht in den gelesenen Mobil-Shots geprüft.

---

## Seite: /anfrage

### 01 — Funnel als eigene Seite [anfrage-desktop-00-fold.png]
- Anordnung: Navbar unverändert, darunter direkt der Sektionskopf zentriert
  (Eyebrow, H1, zweizeilige Subline) und die Funnel-Karte (x≈361–1079,
  y≈322–777). Kein Hero, kein Bild, kein Vorspann.
- Buttons/Komponenten: Exakt derselbe Baustein wie Sektion 06 der Startseite —
  gleiche Kopfzeile „Schritt 1 von 5", gleiche Frage, dieselben vier Radio-Kacheln
  im 2×2-Raster, dieselbe Hinweiszeile, derselbe grüne Fortschrittsbalken auf
  ca. 20 % Breite an der Kartenunterkante.
- Typo: identisch zur Startseiten-Sektion; hier ist die Zeile allerdings die H1
  der Seite.
- Farbe/Fläche: Der Unterschied zur Startseite ist die Bühne: hier steht die Karte
  auf reinem Weiss statt auf einem Foto, und die Karte ist nur durch ihre
  Hairline-Kontur begrenzt statt durch Schatten abgehoben. Unterhalb der Karte
  beginnt bei y≈865 eine weitere Fläche in `#f9fbfa`.
- Abstände/Rhythmus: ca. 90 px Navbar→Eyebrow, ca. 30 px →H1, ca. 30 px →Subline,
  ca. 50 px →Karte.
- Mobil: nicht geprüft.
- Bemerkenswert: Navigation und der grüne „anfragen"-Button der Leiste bleiben auf
  der Funnel-Seite stehen — es gibt hier keinen navigationslosen Ausstiegssperr-
  Funnel.

---

## Seite: /faq

### 01 — Sub-Hero-Band [faq-desktop-00-fold.png]
- Anordnung: Vollbreites Band auf `#f9fbfa` (y≈64–348), Inhalt linksbündig in der
  Mittelspalte: Eyebrow, H1, ein Satz Lead. Rechte Hälfte bleibt leer.
- Buttons/Komponenten: Keine. Kein Bild, kein Breadcrumb, kein CTA im Band.
- Typo: Eyebrow „FAQ" in Grün, ca. 13–14 px. H1 ca. 44–46 px Weight 700 Navy,
  einzeilig. Lead ca. 17 px grau, eine Zeile.
- Farbe/Fläche: Das Band ist gegen den weissen Seitenkörper nur durch die
  Flächenhelligkeit und eine Hairline an der Unterkante abgesetzt.
- Abstände/Rhythmus: ca. 90 px Bandoberkante→Eyebrow, ca. 30 px →H1, ca. 30 px
  →Lead, ca. 90 px bis zur Bandunterkante.
- Mobil: nicht geprüft.

### 02 — Gruppiertes Akkordeon [faq-desktop-00-fold.png]
- Anordnung: Auf Weiss, linksbündig in einer schmalen Spalte (x≈105–872, also
  ca. 60 % der Mittelspalte); die rechte Spalte bleibt vollständig leer.
- Buttons/Komponenten: Über jeder Gruppe ein Kapitälchen-Label. Jede Frage ist eine
  Zeile mit der Fragestellung links und einem Chevron-nach-unten rechts, darunter
  eine Hairline `#d8e0dc` als einziger Trenner. Keine Karten, keine Flächen, keine
  Nummerierung, kein Hintergrundwechsel je Zeile. Alle Zeilen im Shot sind
  geschlossen. Lange Fragen brechen auf zwei Zeilen, die Zeilenhöhe wächst mit —
  der Chevron bleibt vertikal zentriert.
- Typo: Gruppenlabel in gesperrten grünen Kapitälchen, ca. 12–13 px. Fragen
  ca. 18–19 px Weight 500 Navy.
- Farbe/Fläche: Weiss. Grün erscheint auf dieser Seite nur im Eyebrow, den
  Gruppenlabels und dem Nav-Button.
- Abstände/Rhythmus: ca. 90 px Bandunterkante→erstes Gruppenlabel, ca. 45 px
  Label→erste Frage, ca. 77 px Zeilenraster bei einzeiligen Fragen.
- Mobil: nicht geprüft.
