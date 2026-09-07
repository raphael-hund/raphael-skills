# Case: Pangram (AI-Detektor für Schulen, Hochschulen und Enterprise, USA)

| Feld | Wert |
|---|---|
| Slug | `pangram` |
| Status | `kandidat` |
| Belegschwelle | `offen` — Quelle, Auswahlgrund, Do-not-copy, Lizenz/Provenance und die Desktop-Belege sind gefüllt und gelesen; der **mobile Pflicht-Viewport ist nicht auswertbar**: in **allen 63** 390×844-Fold-/Scroll-Shots liegt der Consent-Dialog als zentrierte Box über dem Fold und verdeckt H1, Subline und CTA (gelesen: `home-mobile-00-fold.png`, `home-mobile-02-y422.png`, `home-mobile-12-y4642.png`; die übrigen 60 per Pixelprüfung, siehe §1). Damit fehlt ein Pflicht-Beleg, die Schwelle bleibt `offen`. |
| Quelle | `https://www.pangram.com/` · abgerufen 02.09.2026 (HTTP 200) |
| Evidence | `pangram/shots/` — gelesen: `home-desktop-00-fold.png`, `-02-y726.png`, `-03-y1500.png`, `-05-y3000.png`, `-07-y4500.png`, `-10-y6750.png`, `-13-y9000.png`, `-16-y11250.png`, `-18-y12750.png`, `-21-y14695.png`, `home-desktop-hover-00-Products.png`, `home-mobile-00-fold.png`, `home-mobile-02-y422.png`, `home-mobile-12-y4642.png` (14 Shots) |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (SaaS-Detektor für Bildung und Enterprise; belegt durch die Zwei-Tab-Sektion „AI Detector for Education / for Enterprise" in `home-desktop-10-y6750.png`) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Klärt zwei offene Art-Direction-Entscheidungen: (1) ob das **laufende Produkt selbst** statt eines Produkt-Screenshots oder eines Hero-Fotos in den Fold darf, und (2) ob ein System mit **sechs gleichwertigen Vollflächen-Farben** (Orange, Gelb, Rosa, Dunkelgrün, Braun, Hellblau) tragen kann, ohne die Ein-Akzent-Regel (S1/S3) zu einem reinen Verbot zu machen. |
| Do-not-copy | Wortmarke „Pangram" und die orangene Papierflieger-/Origami-Bildmarke; die gesamte handgezeichnete Campus-Illustrationswelt (Papierschnitt-/Gouache-Textur, Schulgebäude, Arkaden, Studierende) als Marken-Signatur; alle Porträtfotos identifizierbarer Personen (Alex Imas, Susan Ray, Ryan Nicolace, Jenna Russell, Tuhin Chakrabarty, LiAnna Davis, Elyas Masrour, Destiny Akinode, Max Spero); alle fremden Bildmarken (University of Maryland, University of Chicago Booth, Stony Brook, Substack, Quora, NewsGuard); die lizenzierten Schriften **PP Eiko** und **PP Eiko Italic** in Paarung mit IBM Plex Sans/Mono als Wiedererkennung; sämtliche Copy; und **jede Zahl** (99,9 %+, 99,8/99,6/99,5/99,4 % Accuracy, 0,5 % gegen 2,4 % False-Positive, 1 in 10.000, 20+ Sprachen, 1 Mio. Dokumente, 26 Modelle, Gründung 2023 Brooklyn) — Zahlen sind Belege dieses Unternehmens und werden nie übernommen. |
| Lizenz / Provenance | `ungeklärt` — die Screenshots in `pangram/shots/` sind am 02.09.2026 selbst mit `shot-sweep.mjs` erzeugt und liegen ausschliesslich intern als Studienmaterial in dieser Bibliothek; keine Rechte an Marke, Illustrationen, Fotos oder Fonts, keine Veröffentlichung, keine Weitergabe, keine Verwendung im Kundenbau. `ungeklärt` hält den Case auf `kandidat`. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.
Kein `fullPage` als Kritik-Input.

```bash
cd /root/raphael-skills/skills/eigene/web
node scripts/shot-sweep.mjs --base https://www.pangram.com/ \
  --out references/muster-bibliothek/pangram/shots --routes / --mobile   # Exit 0, 136 Shots
```

Der vorgefundene Capture enthielt nur Desktop-Slices bis `y4500`, keine
mobile Serie und **kein `manifest.json`**. Der Lauf oben hat beides ergänzt und
den Ordner auf 140 PNGs plus Manifest gebracht. Das Manifest führt davon 136;
die vier Reste des Vorlaufs (`home-desktop-02-y737.png`,
`home-desktop-hover-00-Solutions.png`, `-01-Company.png`, `-02-Resources.png`)
stehen nur auf der Platte und zählen nicht als Beleg.

Manifest: `pangram/shots/manifest.json`, `createdAt 2026-09-02T20:28:11.008Z`,
base `https://www.pangram.com`, eine Route `/`, beide Viewports Status 200,
`capture_profile: { static: false, states: false, mobile: true }`,
`viewports: fold 1440×900 · deep 1440×1500 · scrollStepPx 750`.
Shot-Arten laut Manifest: Desktop 1 fold + 21 scroll + 4 hover + 37 click;
Mobil 1 fold + 62 scroll + 10 click. Kein Cloudflare-Block.
Die Startseite ist auf Desktop rund 14.700 px hoch (22 Slices), mobil rund
25.500 px (63 Slices). Gelesen wurde eine Auswahl von 14 Shots nach Budget.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `pangram/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `pangram/shots/home-mobile-00-fold.png` | ja (**Inhalt vom Consent-Dialog verdeckt**) |
| Scroll-Serie Desktop | `home-desktop-02-y726.png`, `-03-y1500.png`, `-05-y3000.png`, `-07-y4500.png`, `-10-y6750.png`, `-13-y9000.png`, `-16-y11250.png`, `-18-y12750.png`, `-21-y14695.png` | ja (Auswahl) |
| Scroll-Serie Mobil | `home-mobile-02-y422.png`, `home-mobile-12-y4642.png` | ja (Auswahl, beide teilverdeckt) |
| Hover Navigation | `home-desktop-hover-00-Products.png` | ja |
| Weitere Hover | `home-desktop-hover-01-Solutions/-02-Company/-03-Resources.png` | nein (nur Dateinamen ausgewertet) |
| Klick-Serie Desktop | `home-desktop-click-y4500-01…04-0X_*`, `-click-y10500-00…02-*`, `-click-y12000/-y12750/-y13500-0XX_*` | nein (nur Dateinamen ausgewertet) |
| Klick-Serie Mobil | `home-mobile-click-y0-00-Close_banner.png`, `-click-y422-00-Open_menu.png` u. a. | nein |

**Consent-Overlay in beiden Viewports (gemessen, nicht geschätzt):** Auf Desktop
liegt in allen 23 Fold-/Scroll-Shots und allen 7 Hover-Shots eine rund 190 px
hohe Consent-Leiste am unteren Bildrand; sie deckt nur diesen Streifen ab, der
Inhalt darüber bleibt lesbar, weshalb die Desktop-Belege trotzdem tragen. Die
37 Desktop-Klick-Shots entstanden nach dem Wegklicken und sind frei. Mobil ist
es keine Leiste, sondern eine zentrierte Box, und sie steht in **allen 63**
390×844-Fold-/Scroll-Shots — nicht nur in den drei gelesenen (Prüfung: Pixel an
`(100,590)` und `(300,590)` = `#FF712E`, der `Allow all`-Fläche).

**Nicht geprüft:** der mobile Fold ohne Consent-Overlay (`home-mobile-click-y0-00-Close_banner.png`
würde diese Lücke schliessen), die übrigen Desktop- und Mobil-Slices, alle
Hover- und Klick-Zustände als Bild, sämtliche Unterseiten (`/pricing`,
`/ai-detector`, `/research`, Blog).

## 2. Tokens (maschinell, nicht geraten)

Quelle der Werte: die vier per curl geholten Next.js-Stylesheets
`https://www.pangram.com/_next/static/css/{a32b5f8dd26dabfd,805a2c9d1c45e124,d0320de32467736e,404d89aea1bddef0}.css`
(02.09.2026) — Custom Properties, `body`-Regel und `@font-face`-Blöcke; die
Schriftnamen zusätzlich aus der `name`-Tabelle der geladenen woff2-Dateien
(`fontTools`), weil das CSS die Familien nur als `headingFont` maskiert.

| Token | Wert |
|---|---|
| Display-Font | **PP Eiko** — `--font-heading: "headingFont"`; woff2 `4b25ba58b96bf829-s.p` meldet `PP Eiko Medium` (weitere Schnitte 300/400 unter `2f66d2cded5eb62b`, `0703289cbb03d1b5`). Kursiv als eigener Schnitt: `--font-heading-italic: "headingItalicFont"` → `PP Eiko Medium Italic` (`b817805ccb9a2b4a-s.woff2`). Fallback beider: `local("Arial")`. |
| Body-Font | **IBM Plex Sans** — `--font-body: "IBM Plex Sans","IBM Plex Sans Fallback"`, `body{font-family:var(--font-body)}`; dazu `--font-mono: "IBM Plex Mono"` für den Technik-Erklärer und die Benchmark-Zahlen. Zusätzlich deklariert, in den gelesenen Shots nicht identifiziert: `--font-imbue: "Imbue"`. |
| Akzentfarbe (HEX) | `#FF6106` (häufigster Hex im Haupt-Stylesheet, u. a. als Unterstreichungs-Schatten `0 -2px 0 0 #FF6106 inset`); `--ring: 22 100% 50%` ist dasselbe Orange in HSL. Daneben drei **semantische** Detektor-Farben: AI `#ff4d06`, Human `#118d57`, Mixed `#ffb215` / `#b77b01` / `#d17a01`. |
| Grundfläche | `body{background-color:rgb(248 247 245)}` = `#F8F7F5` (Variante `#f8f7f6`), Textfarbe `rgb(20 32 30)` = `#14201E`. Weitere Flächen: `#EBEBEB`, `#E7E8E2`, `#F4F6F8`. |
| Dunkle Fläche | `#004237` (das tragende Dunkelgrün der Band-Sektionen, auch als `--tw-ring-offset-color`), dazu `#14201E`, `#15502E`, `#17211B`, `#212630`, `#1F2430`; Braun `#491E01` für das Enterprise-Band und die braunen Karten. |
| Spacing-Skala | Tailwind-Standardleiter in `rem`: `gap` von `.125` über `.25/.375/.5/.625/.75/.875/1/1.25/1.5/1.75/2/2.25/2.5/3/3.5/3.75/4/5` bis `6rem`. Keine eigenen Spacing-Tokens deklariert. |
| Radii | `--radius: 0.5rem` als Basis, abgeleitet `calc(var(--radius) - 2px)` und `-4px`; im Layout zusätzlich `9999px` für Pillen (Nav-Bar, Badges, Kategorie-Chips), `1rem` und `24px` für Karten und Bänder. |
| Schatten | Kein einzelnes Schatten-Token, sondern eine Staffel über `--tw-shadow`: `0 1px 2px rgba(20,32,30,0.04)` / `…0.08)`, `0 12px 24px rgba(145,158,171,0.16)`, `0 12px 24px rgba(0,0,0,0.18)`, `0 14px 36px rgba(20,32,30,0.14)`, `-40px 40px 80px rgba(0,0,0,0.24)` sowie `0 -2px 16px -1px rgba(0,0,0,0.1)`. Dazu die drei **semantischen** Ein-Pixel-Schatten als Textmarker: `--shadow-ai: 0px 1px #ff4d06`, `--shadow-human: 1px 1px #118d57`, `--shadow-mixed: 0px 1px #ffb215` (plus `-hover`- und `-thick`-Stufen). |

**Nicht erhoben:** OKLCH-Werte (die Seite deklariert HEX und HSL-Tripel, kein
OKLCH), benannte Typo-Stufen (das CSS führt nur die Tailwind-`font-size`-Leiter
von `.75rem` bis `3.5rem`, keine semantischen Stufen-Tokens), die
Illustrations-Assets und ihre Herkunft.

**Reduced Motion:** `@media (prefers-reduced-motion:reduce)` kommt genau einmal
vor und liefert nur die Tailwind-Utility `.motion-reduce:hidden` plus
`@keyframes spin`. Ob die Scroll- und Karussell-Strecken tatsächlich einen
Motion-Opt-out bedienen, ist damit **nicht geprüft** — aus statischen Shots
nicht belegbar.

## 3. Sektionen-Inventar

Startseite `/`, Reihenfolge von oben. Pattern-IDs aus `../stil-regeln.md` §4;
wo kein Katalog-Pattern passt, steht ein benannter Kandidat. Layout-Familien
nach `../ui-layouts-catalog.md` §Sektions-Layout-Familien.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Fold / Hero | Split | `P-HERO-SPLIT` (Abweichung: rechts kein Bild, sondern das laufende Werkzeug) | Links Textspalte auf heller Grundfläche mit `NEW`-Pille, zweizeiliger Serif-H1, zwei Sans-Zeilen und einem CTA-Paar (gefülltes Orange plus blasses Pfirsich-Sekundär), darunter eine Trust-Zeile mit fremder Universitäts-Bildmarke; rechts eine randlose Campus-Illustration, auf der als weisse Karte der **echte, sofort benutzbare Detektor** liegt — Tab-Paar, vier Beleg-Chips, Textfeld, drei Beispiel-Chips und zwei Buttons (`home-desktop-00-fold.png`). |
| 2 | Trust-Leiste | Band | `P-PROOF-STRIP` | Serif-Label zweizeilig links (zweite Zeile in Akzent-Orange), rechts vier Original-Wortmarken in Grau ohne Kästen, ohne Zahlen und ohne Sterne, auf weisser Fläche (`home-desktop-02-y726.png`). |
| 3 | Erklär-Band (gelb) | Akkordeon | — (Kandidat: liegendes Akkordeon mit Nummern-Spine) | Ein vollflächig gelbes Band trägt links die Serif-Frage und rechts einen Sekundär-CTA; darunter ein **horizontales** Akkordeon: die inaktiven Schritte stehen als schmale Spalten, in denen der Titel um 90° gedreht steht, oben ein kleines Papierflieger-Glyph und unten die Ordnungszahl `02` / `03` in Orange sitzt; die aktive Karte öffnet sich mit Illustration links, Text rechts und einem dunkelgrünen `Next`-Button mit rosa Pfeil-Kachel (gedrehter Titel und Glyph nur in `home-desktop-02-y726.png` belegt — in `home-desktop-03-y1500.png` ist die Spalte angeschnitten und trägt nur noch die Zahlen). |
| 4 | Modell-Benchmark | Raster | — (Kandidat: Benchmark-Karte mit Prüfdatum) | Hellblaues Eyebrow-Badge, Serif-Frage links und Antwort-Fliesstext rechts; darunter vier gleich hohe helle Karten mit Anbieter-Label in Mono, Modellname in Serif, Accuracy in Orange und Prüfdatum mit Kalender-Icon, gefolgt von einer dreispaltigen Mono-Tabelle „ALSO BENCHMARKED" mit Modell und Prozentwert plus Link auf den vollen Benchmark (`home-desktop-03-y1500.png`). |
| 5 | Produkt-Dreier | Raster | `P-OFFER-PAIR`-Variante (drei statt zwei) | Drei gleich hohe Karten in **je eigener Vollflächenfarbe** (Gelb, Rosa, Dunkelbraun); im oberen Drittel liegt jeweils ein echtes Produkt-UI-Fragment als Bild — Karte 1 und 3 zeigen es aufrecht und angeschnitten, nur Karte 2 fächert einen Stapel auf, bei dem die gekippten Karten hinter der aufrechten Frontkarte hervorschauen —, im unteren die Serif-Überschrift und zwei Zeilen Fliesstext direkt auf der Farbe (`home-desktop-05-y3000.png`). |
| 6 | Unterscheidungs-Band | Raster | — (Kandidat: Lesezeichen-Karte) | Auf dunkelgrüner Vollfläche Eyebrow, Serif-Frage links, Fliesstext rechts; darunter zwei Reihen dunkler Karten, die jede oben links ein farbiges **Lesezeichen-Fähnchen** (gelb, grün, rosa, orange) als einzigen Farbträger haben, dazu ein dünnes Linien-Icon, Serif-Titel und Fliesstext (`home-desktop-05-y3000.png`, `home-desktop-07-y4500.png`). |
| 7 | Über uns + Video | Split | — (Kandidat: Text links, Videokachel rechts) | Rosa Eyebrow-Badge, Serif-Überschrift mit **orangenem Schlusspunkt** als einzigem Akzent, Fliesstext mit Inline-Link; rechts eine abgerundete Videokachel mit rundem Play-Knopf, ohne Overlay-Text (`home-desktop-07-y4500.png`). |
| 8 | „How It Works" | Akkordeon | `P-PROCESS-3` (Abweichung: vier Schritte) | Vier nummerierte Schritte `01 Input your text` … `04 Access past records` als klickbare Liste — **nur aus den Klick-Dateinamen** `home-desktop-click-y4500-01…04-*` abgeleitet, nicht als Bild gelesen; der Sektionskopf ist in `home-desktop-07-y4500.png` angeschnitten sichtbar. |
| 9 | Branchen-Umschalter | Split | — (Kandidat: Zwei-Tab-Umschalter über Illustrationskarten) | Serif-Überschrift und Fliesstext links, orangener `Contact Us`-Button rechts; darunter ein Zwei-Tab-Segment (Education / Enterprise) und zwei gleich breite Karten, in denen je eine ganzflächige Campus-Illustration über Serif-Titel und drei Zeilen Text sitzt (`home-desktop-10-y6750.png`). |
| 10 | Enterprise-Band (braun) | Band | — | Vollflächig dunkelbraunes Band mit hellblauem Eyebrow und grosser heller Serif-Headline als Sektionswechsel (`home-desktop-10-y6750.png`). |
| 11 | Kundenstimmen | Raster | `P-TESTIMONIAL` | Ein ungleichmässiges Kachelraster, in dem jede Karte eine andere Fläche trägt (Hellgrau, Rosa, Dunkelgrün, Braun); je Karte ein Anführungszeichen-Glyph, das Zitat als Fliesstext, wo vorhanden ein **echtes Porträtfoto mit farbigem Namensbalken direkt unter dem Bild**, sonst Klarname und Institution als Zeile, teils mit Original-Universitätslogo (`home-desktop-13-y9000.png`). |
| 12 | Technik-Erklärer | Stack | — (Kandidat: Mono-Whitepaper-Block) | Auf dunkelgrüner Fläche eine gezeichnete Netz-Architektur aus Token-Vektorkacheln, Pfeilen und vier 3D-Achsenkreuzen, darunter zwei Absätze **komplett in Monospace** — kein Icon, kein CTA, keine Karte (`home-desktop-16-y11250.png`). |
| 13 | False-Positive-Vergleich | Split | — (Kandidat: vertikale Tab-Liste mit Balkenbeleg) | Eyebrow „Third Party Evaluation", einzeilige Serif-Headline und eine Quellenzeile mit Link auf die Universitätsstudie; darunter links eine vertikale Liste nummerierter Textsorten (`01 Product review` …) mit Pfeil-Kreis auf dem aktiven Eintrag, rechts ein sehr schmaler Balkenvergleich, der den **namentlich genannten Wettbewerber** einschliesst (`home-desktop-16-y11250.png`). |
| 14 | FAQ | Split + Akkordeon | `P-FAQ` | Links Badge, zweizeilige Serif-Überschrift, zwei Zeilen Text und ein orangener Button; rechts eine Spalte aus 14 einzelnen hellen Karten mit dreistelliger Ordnungszahl in Orange, Serif-Frage und `+`-Kreis, die erste Karte offen mit orangenem Schliess-Kreis (`home-desktop-18-y12750.png`, Klick-Serie `home-desktop-click-y12000/-y12750/-y13500-0XX_*`). |
| 15 | Beitrags-Karussell | Band | — (Kandidat: Redaktions-Karussell mit Autor) | Drei Karten nebeneinander mit Cover-Bild, Kategorie-Pille in Grossbuchstaben, Serif-Titel über einer Trennlinie, Autor-Avatar mit Klarnamen und Datum sowie einem Satz Anriss; Vor-/Zurück-Knöpfe oben rechts (`home-desktop-21-y14695.png`). |
| 16 | Footer | Raster im Band | — (Kandidat: Papierschnitt-Rahmen um Creme-Karte) | Dunkelgrünes Band, in das von rechts hellblaue und gelbe **Papierschnitt-Dreiecke** hineinragen; darin liegt eine grosse cremefarbene Karte mit Logo und fünf Linkspalten unter orangefarbenen Spaltenüberschriften plus Kontakt-E-Mail (`home-desktop-21-y14695.png`). |

**Navigation (global, alle Slices):** eine weisse Vollbreiten-Leiste mit
starker Rundung, Logo links, vier Dropdown-Einträge, ein Klartext-Link und
`Contact Sales` als einziger **oranger Text**-Link, rechts Globus-Icon für die
Sprache, `Login` als Text und ein gefüllter oranger Button
(`home-desktop-00-fold.png`). Das Mega-Menü unter `Products` ist ein Raster aus
sechs Karten in sechs verschiedenen Vollflächenfarben (Orange, Rosa, Dunkelgrün,
Gelb, Hellblau, Braun) mit Titel und einer Zeile Text, rechts eine schmale
Spalte mit Zusatzlinks, Versions-Chip und Social-Icons
(`home-desktop-hover-00-Products.png`). Mobil bleibt nur Logo, der orange
Button und ein Burger (`home-mobile-00-fold.png`).

**Mobiler Befund (eingeschränkt):** Der Consent-Dialog erscheint auf 390×844
als zentrierte, blockierende Box und verdeckt den Fold vollständig; er bleibt
auch bei `y422` und `y4642` im Bild stehen (`home-mobile-00-fold.png`,
`home-mobile-02-y422.png`, `home-mobile-12-y4642.png`). Belegbar ist damit nur,
dass die Sektionen 2 und 5 mobil einspaltig stapeln und die Serif-Headlines
ihre Grösse behalten; die mobile Fassung des Folds ist **nicht geprüft**.

## 4. Raphael-Urteil

**Verdikt:** GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)

**Essenz (max. 3 Sätze).** Der Fold verkauft nicht das Produkt, sondern **lässt
es benutzen**: rechts liegt kein Screenshot und kein Hero-Foto, sondern das
laufende Detektor-Feld mit Tab-Paar, Beispiel-Chips und Absende-Button, sodass
der erste Beweis eine eigene Eingabe ist (`home-desktop-00-fold.png`). Die
Glaubwürdigkeit trägt durchgehend fremde Autorität mit Datum und Quelle —
Benchmark-Karten mit Modellname, Prozentwert und Prüfmonat, ein
Vergleichsbalken gegen den namentlich genannten Wettbewerber und Zitate von
Professorinnen und Professoren mit Klarnamen, Foto und Hochschullogo
(`home-desktop-03-y1500.png`, `-16-y11250.png`, `-13-y9000.png`). Farbe wird
nicht sparsam, sondern **systematisch** eingesetzt: sechs Vollflächenfarben
markieren Sektionen und Produktzweige, während das Orange allein für Aktion,
Zahl und Eyebrow reserviert bleibt (`home-desktop-05-y3000.png`,
`home-desktop-hover-00-Products.png`).

**Do-not-copy.** Marke: Wortmarke „Pangram" und die orangene
Papierflieger-Bildmarke. Bildwelt: die komplette handgezeichnete
Campus-Illustrationsserie in Papierschnitt-Textur einschliesslich der
Footer-Dreiecke — sie ist die eigentliche Wiedererkennung dieser Seite und
wird nie nachgebaut. Menschen: alle Porträts identifizierbarer Personen sowie
alle fremden Instituts- und Partner-Bildmarken. Text und Zahl: sämtliche
Headlines, FAQ-Fragen, Zitate und **alle** Accuracy-, False-Positive- und
Mengenangaben. Typografie: die Paarung PP Eiko (Medium und Medium Italic) mit
IBM Plex Sans/Mono als Signatur.

**Lizenz / Provenance.** `ungeklärt`. Die Screenshots in `pangram/shots/` sind
am 02.09.2026 selbst erzeugt und liegen ausschliesslich intern als
Studienmaterial in dieser Bibliothek; keine Rechte an Marke, Illustrationen,
Fotos oder Fonts, keine Veröffentlichung, keine Weitergabe, keine Verwendung im
Kundenbau. Der Case bleibt damit `kandidat`.

**Status aller Regel-Kandidaten:** `kandidat`.

**Spannungen zum Regelbuch** (für die Synthese, kein Urteils-Override):

- Sechs Vollflächenfarben tragen Sektionen und Menükarten
  (`home-desktop-05-y3000.png`, `home-desktop-hover-00-Products.png`) —
  deutliche Spannung zu **S1** und **S3**; die Seite entgeht dem Bruch nur,
  weil das Orange als *Aktions*-Farbe reserviert bleibt und die übrigen Farben
  nie einen Button einfärben.
- Der Fold trägt **zwei** CTAs nebeneinander (`Try It for Free` gefüllt,
  `Partner With Us` blass) plus den Werkzeug-Button in der Karte
  (`home-desktop-00-fold.png`) — Spannung zu **S1** und zur
  Ein-CTA-Erwartung von `P-HERO-PHOTO`.
- Die Prozessliste hat vier statt drei Schritte und trägt sichtbare
  `01`-Marker (Dateinamen `home-desktop-click-y4500-01…04-*`) — Nähe zu
  **S11**/`P-PROCESS-3`, aber als Bild **nicht geprüft**.
- Deckung mit **S9** und **S9-N**: echte Personen mit Klarnamen, Institution
  und Foto, fremde Original-Bildmarken statt selbstgebauter Siegel, ein offen
  benannter Wettbewerber im Balkenvergleich (`home-desktop-13-y9000.png`,
  `-16-y11250.png`).
- Der mobile Consent-Dialog verdeckt den kompletten Fold
  (`home-mobile-00-fold.png`) — aus Sicht von G1 ein Befund gegen die Seite,
  kein übernehmbares Muster.
- `prefers-reduced-motion: reduce` liefert im CSS nur die Tailwind-Utility;
  ob die Karussell- und Akkordeon-Strecken den Opt-out bedienen, ist
  **nicht geprüft** — nach `../ui-layouts-catalog.md` wäre er Pflicht.

## 5. Regel-Kandidaten

Jede Beobachtung bleibt hier Kandidat. Eintrag in `../stil-regeln.md` erst nach
Raphaels Begründungssatz und erfüllter Lizenz-/Provenance-Lage; der Eintrag
verweist dann auf diese Datei zurück.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Das laufende Werkzeug steht im Fold statt eines Produkt-Screenshots: rechte Fold-Hälfte ist eine weisse Karte mit Tab-Paar, Textfeld, drei Beispiel-Chips und Absende-Button, sodass der erste Beweis eine eigene Eingabe ist (Beleg: `home-desktop-00-fold.png`) | Bezug **S1**, Spannung `P-HERO-PHOTO` | GO | kandidat |
| Fremde Autorität mit Datum statt Selbstlob: Benchmark-Karten nennen Anbieter, Modellname, Prozentwert und Prüfmonat, die Trust-Zeile im Fold nennt zwei Universitäten namentlich (Beleg: `home-desktop-00-fold.png`, `home-desktop-03-y1500.png`) | Bezug **S9-N** | GO | kandidat |
| Offener Wettbewerbsvergleich mit Klarnamen: ein schmaler Balken stellt den eigenen False-Positive-Wert dem namentlich genannten Wettbewerber gegenüber, darüber die Quelle als Link (Beleg: `home-desktop-16-y11250.png`) | Bezug **S9** | GO | kandidat |
| Mehrfarben-System ohne Akzentbruch: sechs Vollflächenfarben markieren Sektionen, Produktkarten und Menükacheln, aber **nur** Orange wird je zu Button, Zahl oder Eyebrow (Beleg: `home-desktop-05-y3000.png`, `home-desktop-13-y9000.png`, `home-desktop-hover-00-Products.png`) | Spannung **S1**, **S3** | GO | kandidat |
| Liegendes Akkordeon mit Nummern-Spine: inaktive Schritte stehen als schmale Spalten mit um 90° gedrehtem Titel und Ordnungszahl am Spaltenfuss, nur die aktive Karte öffnet sich mit Bild und Text (Beleg: `home-desktop-02-y726.png`; in `home-desktop-03-y1500.png` ist die Spalte angeschnitten, dort sind nur die Zahlen im Bild) | — (Prosa-Kandidat) | GO | kandidat |
| Produktkarte trägt echtes UI im oberen Drittel und Text direkt auf der Farbe darunter — kein Icon, kein Rahmen, keine graue Karte (Beleg: `home-desktop-05-y3000.png`) | Bezug **S2**, **S14** | GO | kandidat |
| Lesezeichen-Fähnchen als einziger Farbträger auf dunklen Karten: ein kleines farbiges Band oben links ersetzt Rahmen, Schatten und Icon-Kreis (Beleg: `home-desktop-05-y3000.png`, `home-desktop-07-y4500.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Kundenstimme mit farbigem Namensbalken direkt unter dem Porträt statt einer Signatur-Zeile darunter, Kachelfarbe wechselt je Karte (Beleg: `home-desktop-13-y9000.png`) | Bezug **S9**, `P-TESTIMONIAL` | GO | kandidat |
| Monospace als Signal für Technik-Tiefe: der Architektur-Absatz steht vollständig in Mono auf dunkler Fläche, ohne Icon und ohne CTA — sichtbar getrennt vom Marketing-Teil (Beleg: `home-desktop-16-y11250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Semantische Ein-Pixel-Schatten als Textmarker statt Hintergrundfarbe: `--shadow-ai: 0px 1px #ff4d06`, `--shadow-human: 1px 1px #118d57`, `--shadow-mixed: 0px 1px #ffb215` markieren Textstellen im Produkt (Beleg: CSS `a32b5f8dd26dabfd.css`; Wirkung sichtbar in `home-desktop-05-y3000.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Papierschnitt-Illustration statt Foto als durchgehende Bildwelt: dieselbe handgezeichnete Textur trägt Fold, Branchenkarten und Footer-Rahmen und ersetzt jedes Stockfoto (Beleg: `home-desktop-00-fold.png`, `-10-y6750.png`, `-21-y14695.png`) | Spannung **S9** (echte Menschen), Deckung mit dem Stock-Verbot | GO | kandidat |
| Consent-Dialog verdeckt auf 390×844 den gesamten Fold inklusive H1 und CTA und bleibt über die ganze Seite stehen — in allen 63 mobilen Fold-/Scroll-Shots (Beleg: `home-mobile-00-fold.png`, `home-mobile-02-y422.png`; Grundgesamtheit per Pixelprüfung, §1) | — (G1-Befund) | NO-GO | kandidat |
| Scroll-, Karussell- und Akkordeon-Strecken ohne belegten Reduced-Motion-Opt-out: das CSS enthält `prefers-reduced-motion:reduce` nur als Tailwind-Utility (Beleg: `a32b5f8dd26dabfd.css`) | Spannung **S6**, **S6-N** | offen (nicht geprüft) | kandidat |
