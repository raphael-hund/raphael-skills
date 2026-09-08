# Lassie — Sektions-Atlas (Startseite `/`)

Belegbasis: `shots/` (73 Shots, 02.09.2026, Desktop 1440 und Mobil 390).
Jede Zeile nennt den Shot, auf dem die Beobachtung sichtbar ist. Was auf keinem
gelesenen Shot steht, steht hier nicht.

Gelesene Shots: `home-desktop-00-fold`, `-03-y1500`, `-06-y3750`, `-08-y5250`,
`-10-y6750`, `-14-y9750`, `-18-y12750`, `-22-y15759`, `-26-y18750`,
`-28-y20250`, `-31-y22218`; mobil `home-mobile-00-fold`, `-15-y5908`,
`-22-y8573`. Die Seite ist rund 22.200 px hoch; die nicht gelesenen
Zwischen-Slices sind `nicht geprüft`.

## Globales

**Navigation.** Eine schwebende Pillen-Gruppe, horizontal zentriert, oben
freistehend statt als Vollbreiten-Leiste: Logo-Blume in eigener weisser Pille,
danach drei Pillen (`Company`, `Demo`, `Login`), die letzte in Stone gefüllt als
optischer Endpunkt. Identisch auf jedem gelesenen Slice, auch über dem hellen
Stone-Grund (`home-desktop-00-fold.png`, `-18-y12750.png`,
`home-mobile-00-fold.png`). Mobil unverändert dieselbe Pillen-Gruppe, kein
Burger-Menü (`home-mobile-00-fold.png`).

**Grundfläche.** Ausserhalb der Bildbänder trägt die ganze Seite eine warme
Papierfläche (`--color-stone-100 #f9f8f5`), auf der Text fast schwarz-warm
(`--color-black-800 #1a1613`) steht. Kein zweiter Flächenwechsel in den
gelesenen Slices ausser den Vollbild-Medien.

**Typo-Signatur.** Alle Headlines in einer Serif (`abcMarist`), Fliesstext und
Labels in `dmSans`, Zahlen- und Meta-Zeilen in `dmMono` — z. B. das
`Grace Dental`-Label an der Testimonial-Karte und die Copyright-Zeile im Footer
(`home-desktop-22-y15759.png`, `-31-y22218.png`).

## Sektionen von oben nach unten

### 1 — Fold / Hero · Layering
`home-desktop-00-fold.png`, `home-mobile-00-fold.png`

Vollbild-Video einer echten Praxisszene (Arzt und Patient im Behandlungsstuhl,
Tageslicht durchs Fenster) füllt den kompletten Viewport ohne Rahmen und ohne
Farbverlaufs-Overlay. Darüber liegt zentriert die Serif-H1 in Weiss, zweizeilig,
die zweite Zeile kursiv gesetzt — der einzige Kursiv-Akzent im Fold. Darunter
zwei kleine Sans-Zeilen, die zweite mit Kalender-Icon und einer konkreten Zahl
als laufender Statusbeleg. Am unteren Fold-Rand eine einzige Eingabe-Pille:
E-Mail-Feld links, dunkler `Get started`-Button rechts in derselben Pille. Kein
zweiter CTA, keine Logo-Leiste, kein Cookie-Banner im gelesenen Shot.

Mobil (390): dasselbe Video auf Hochkant beschnitten, H1 identisch zweizeilig
mit Kursiv-Zeile, dieselbe E-Mail-Pille am Fold-Boden. Nichts wird weggelassen.

### 2 — Marken-Statement · Stack
`home-desktop-03-y1500.png`

Auf Stone: die Logo-Blume gross und mittig, darunter die zentrierte
Serif-Headline zweizeilig in Schwarz. Sehr viel Luft darüber und darunter, keine
Buttons, kein Bild in der Sektion selbst — reiner Atemzug zwischen Video-Fold
und Produktstrecke.

### 3 — Produkt-Strecke „Was Lassie tut" · Layering/Scroll-Progress
`home-desktop-03-y1500.png`, `-06-y3750.png`, `-08-y5250.png`

Eine grosse, stark abgerundete Medienkarte (Radius-Familie 1,2–3,2 rem) steht
mittig und bleibt beim Scrollen stehen, während die Textblöcke daneben
wechseln. Der Karteninhalt ist ein bewegungsunscharfes Naturbild (gelbe
Blütenwand, Grasfläche, rosa Blüten) — kein Screenshot als Hintergrund; erst
darüber schwebt ein kleines, echt aussehendes UI-Fragment: eine schmale weisse
Statuszeile („Lassie working…", darunter ein laufender Vorgang mit Kassenname),
später ein leeres Eingabefeld mit Plus, Mikro und blauem Senden-Pfeil.

Die begleitende Caption wandert von Sektion zu Sektion die Seite: links neben
der Karte (`-03-y1500.png`), rechts daneben (`-06-y3750.png`), wieder links
(`-08-y5250.png`). Jede Caption ist gleich gebaut: kleine zweizeilige
Serif-Überschrift, darunter drei bis vier Zeilen Sans in Grau. Kein Icon, keine
Bullet-Liste, kein CTA in dieser ganzen Strecke.

### 4 — Stat-Band · Layering/Parallax
`home-desktop-10-y6750.png`, `-14-y9750.png`

Mittig eine sehr grosse Serif-Zahl mit Prozentzeichen und darunter zwei Zeilen
Fliesstext in derselben Serif — die Zahl ist das Bild, es gibt kein Diagramm.
Um diesen Textblock treiben mit unterschiedlichem Tempo kleine Karten mit
verschiedenen Rollen: (a) echte Produkt-UI-Fragmente mit Klarnamen und krummen
Dollar-Beträgen samt Zeitstempel („Received Jan 14, 23:22" / „Posted Jan 16,
10:01"), (b) ein Wochenreport mit drei bezifferten Zeilen, (c) kleine
Foto-Kacheln (Blumenwiese, jemand am Schreibtisch mit Tastatur). Zwischen
`-10-y6750.png` und `-14-y9750.png` verschieben sich dieselben Karten sichtbar
gegeneinander — der Beleg für den Parallax-Versatz. Die zweite Headline
derselben Strecke (`-14-y9750.png`) ist wieder zweizeilig, zentriert, ohne CTA.

### 5 — Verbreitungs-Karte + Testimonials · Layering
`home-desktop-18-y12750.png`, `-22-y15759.png`, `home-mobile-15-y5908.png`

Zentrierte zweizeilige Serif-Headline mit einer konkreten Nutzerzahl, darunter
eine Punktraster-Karte der USA: helles Stone-Punktraster als Landfläche, darauf
dunkle Punkte in verschiedenen Grössen als Standorte — keine Landkarten-Grafik,
keine Ländergrenzen, keine Beschriftung.

Beim Weiterscrollen legt sich eine weisse Testimonial-Karte über diese Karte
(`-22-y15759.png`): links ein echtes Porträtfoto (Arzt in Scrubs vor dem
Praxiseingang), rechts das Zitat in Serif mit einer nachprüfbaren
Stundenersparnis, unten Klarname links und der Praxisname rechts als kleines
Mono-Label auf Stone-Chip. Headline und Karte bleiben gleichzeitig sichtbar —
das Band trägt Reichweite und Einzelbeleg in einer Sektion.

Mobil (`home-mobile-15-y5908.png`): dieselbe Punktkarte oben, darunter die
Testimonials als horizontal angeschnittener Karten-Carousel (die zweite Karte
ragt sichtbar in den rechten Rand), darunter ein dunkler Pill-Button mit
Video-Thumbnail und Play-Dreieck links im Button, der auf die Videostory eines
namentlich genannten Arztes führt.

### 6 — „How Lassie works" · Raster
`home-desktop-26-y18750.png`, `-28-y20250.png`

Zentrierte einzeilige Serif-Headline, darunter ein dreispaltiges Raster
gleichhoher Stone-Karten. Jede Karte zeigt keinen Screenshot der ganzen App,
sondern ein gestapeltes UI-Bruchstück des jeweiligen Arbeitsschritts, senkrecht
durch dünne Verbindungslinien und kleine Status-Chips verkettet
(`Enrolled` / `EFT received`, `Payment connected`, `Claims reconciled`); die
Beträge sind krumm und in Mono gesetzt, Erfolgszustände in Grün. Unter jeder
Karte steht ausserhalb der Kartenfläche eine Sans-Zeile als Schritt-Titel und
darunter zwei Zeilen Beschreibung. Keine Nummerierung 1-2-3, keine Pfeile
zwischen den Karten.

### 7 — FAQ · Akkordeon
`home-desktop-28-y20250.png`, Klick-Serie `home-desktop-click-y20250-00…06`

Sehr grosse zentrierte Serif-Überschrift, darunter eine schmale, mittig
gesetzte Spalte aus sieben weissen Karten mit deutlichem Abstand zueinander —
keine durchgehende Linienliste, jede Frage ist eine eigene abgerundete Karte
mit Chevron rechts. Die sieben Fragen sind über die Klick-Shots einzeln als
aufklappbar belegt.

### 8 — Schluss-CTA · Band
`home-desktop-31-y22218.png`, `home-mobile-22-y8573.png`

Ein abgerundetes Vollbreiten-Band mit einem Nahaufnahme-Blumenfoto (orange
Mohnblüten, warm überstrahlt) als Fläche, darauf zentriert die zweizeilige
Serif-Headline in Weiss und exakt dieselbe E-Mail-plus-Button-Pille wie im Fold.
Der Funnel schliesst also mit demselben einen Einstieg, mit dem er beginnt.

### 9 — Footer · Split
`home-desktop-31-y22218.png`, `home-mobile-22-y8573.png`

Links auf Stone die Marken-Headline erneut zweizeilig mit Kursiv-Zeile, darunter
ein einzelner dunkler `Get started`-Pill-Button. Rechts drei schmale
Link-Spalten mit grauen Mono-artigen Überschriften (`Company`, `Socials`,
`Legal`). Darunter mittig die Logo-Blume und zwei Zeilen Copyright in Mono mit
Ortsangabe.

Abschliessend ein hellblaues Band (`--color-blue-200 #c3eaf4`), in dem der
Markenname als überformatiges weisses Serif-Wort steht, unten angeschnitten —
der Wortmarken-Abschluss, kein Inhalt mehr darunter. Mobil identisch gestapelt:
Headline, Button, Linkspalten zweispaltig, dann dasselbe blaue Wortmarken-Band.

## Nicht geprüft

- Unterseiten `/company`, `/demo`, `/login` (keine Route erfasst, Budget).
- Hover-Zustände ausser den vier Nav-Shots (Dateinamen gesehen, Bilder nicht
  gelesen).
- Die übrigen 20 Desktop- und 19 Mobil-Scroll-Slices zwischen den oben
  genannten.
- Reduced-Motion-Verhalten der Layering-/Parallax-Sektionen: aus statischen
  Shots nicht bestimmbar.
