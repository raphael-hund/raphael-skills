# Case: Cryptory (Krypto-Ausbildung für Investoren & Trader, D2C deutschsprachig)

| Feld | Wert |
|---|---|
| Slug | `cryptory` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://cryptory.de/` · abgerufen 02.09.2026 (Shot-Sweep 17:44 UTC) |
| Evidence | `cryptory/shots/` (94 PNG: 30 Desktop inkl. 6 Klick-Shots, 64 Mobil; Manifeste `shots/manifest.json` Desktop + `shots/manifest-mobile.json` Mobil); vierzehn davon gelesen, Tabelle in §1 |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` mit `ads-lp`-Zug — verkauft wird eine hochpreisige Ausbildung an Privatpersonen, die Seite ist eine einzige lange Funnel-Landingpage auf ein Kennenlerngespräch (Beleg: identisches CTA-Paar in `shots/home-desktop-00-fold.png`, `-02-y750.png`, `-03-y1500.png`, `-20-y14250.png`); Dials daher eher `ads-lp` (5/3/6) als klassisch `b2b-dienst` |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Offene Art-Direction-Frage „wie trägt eine Seite ein Vertrauensdefizit-Thema (Krypto/Finanzbildung), ohne in Hype-Optik zu kippen" — Cryptory beantwortet das mit dokumentiertem statt behauptetem Beweis und mit genau einem Akzent auf sonst hellgrauer Fläche |
| Do-not-copy | Marke „Cryptory", Logo und Wortmarke; die Porträt- und Team-Fotos von Georg Borgert, Johannes Schoster und dem Betreuer-Team; das TÜV-Rheinland-Zertifikat und die BVMW-Mitgliedsmarke (fremde Zertifizierung, nie nachbauen); sämtliche Kundenzitate, Namen und Ergebniszahlen; alle Fließtexte und Headlines. Übernommen wird ausschließlich das Struktur- und Layoutmuster. |
| Lizenz / Provenance | `ungeklärt` — Screenshots stammen aus einem eigenen Capture-Lauf der öffentlich erreichbaren Seite und liegen ausschließlich intern als Studienmaterial in `cryptory/shots/`. Keine Nutzungsrechte an Fotos, Logos, Siegeln oder Texten; keine Weiterveröffentlichung, keine Verwendung in Kundenprojekten. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Zwei Läufe am 02.09.2026, beide Exit 0:

```bash
# Desktop-Serie (Wrapper, ohne --mobile)
node scripts/muster-studie.mjs --url https://cryptory.de/ --slug cryptory
# Mobil-Serie: der Wrapper reicht --mobile nicht durch, daher shot-sweep direkt
node scripts/shot-sweep.mjs --base https://cryptory.de/ \
  --out .../cryptory/shots-mobile --routes / --mobile
```

Die Mobil-Shots wurden anschließend nach `cryptory/shots/` gelegt, das
Zweit-Manifest liegt als `shots/manifest-mobile.json`. Nur die Route `/`
wurde erfasst; Unterseiten sind **nicht geprüft**. Es existieren keine
`/small/`-JPGs, gelesen wurden daher die PNGs. Budget 12 Shots, tatsaechlich 14 gelesen (2 Pflicht-Folds plus 12 Serien-Slices).

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `cryptory/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `cryptory/shots/home-mobile-00-fold.png` | ja |
| Desktop Scroll y750 | `cryptory/shots/home-desktop-02-y750.png` | ja |
| Desktop Scroll y1500 | `cryptory/shots/home-desktop-03-y1500.png` | ja |
| Desktop Scroll y3000 | `cryptory/shots/home-desktop-05-y3000.png` | ja |
| Desktop Scroll y4500 | `cryptory/shots/home-desktop-07-y4500.png` | ja |
| Desktop Scroll y6000 | `cryptory/shots/home-desktop-09-y6000.png` | ja |
| Desktop Scroll y8250 | `cryptory/shots/home-desktop-12-y8250.png` | ja |
| Desktop Scroll y10500 | `cryptory/shots/home-desktop-15-y10500.png` | ja |
| Desktop Scroll y12000 | `cryptory/shots/home-desktop-17-y12000.png` | ja |
| Desktop Scroll y12750 | `cryptory/shots/home-desktop-18-y12750.png` | ja |
| Desktop Scroll y14250 | `cryptory/shots/home-desktop-20-y14250.png` | ja |
| Desktop Scroll y16130 (Footer) | `cryptory/shots/home-desktop-23-y16130.png` | ja |
| Mobil Scroll y8018 | `cryptory/shots/home-mobile-20-y8018.png` | ja |
| Übrige Desktop-Slices | `home-desktop-01/04/06/08/10/11/13/14/16/19/21/22-*.png` | nein |
| Übrige Mobil-Serie (63 Shots) | `home-mobile-01…63-*.png` | nein |
| Interaktions-Shots Tabwechsel | `home-desktop-click-y12750-00…03-*.png`, `home-desktop-click-y13500-*.png` | nein (nur Dateinamen ausgewertet: die vier Namen Maximilian Kleeschulte, Fabian Drenkhahn, Karsten Krzyzanowski, Nikolai Gruhn belegen den Tab-Mechanismus der Erfolgsgeschichten) |

Kein Cookie-Banner in den gelesenen Shots. Der Mobil-Lauf brauchte einen
`NAV-FALLBACK` (`networkidle` lief in 45 s Timeout, dann `domcontentloaded`);
in `home-desktop-05-y3000.png` ist die untere Bildhälfte leer, weil die
Sektion beim Capture noch nicht nachgerendert war — kein Layoutbefund.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `cryptory-lp-site.webflow.shared.e5848b782.min.css`
(Webflow-CDN `cdn.prod.website-files.com`, per curl geladen 02.09.2026,
334 KB; Custom Properties, `body`-/Heading-Regeln, Zählung über die
gesamte Datei).

| Token | Wert |
|---|---|
| Display-Font | `Denton, Arial, sans-serif` — Serife, ausschließlich für die kursiv gesetzten Akzentwörter in H1/H2 (26 Regeln); Sans-Anteil der Headlines läuft auf `Inter Display, sans-serif` (11 Regeln) |
| Body-Font | `Inter Tight, sans-serif`, `body` `1rem` / `line-height 1.4`, `letter-spacing -.32px`; `IBM Plex Mono` nur als dritte Familie in 5 Regeln (Zahlen-/Daten-Details) |
| Akzentfarbe (HEX) | `--blue-main: #276dfa` — mit 44 Treffern die klar dominante Farbe der Datei; Design-System-Zweitton `--base-color-brand--blue: #2d62ff` (3 Treffer), `--base-color-system--focus-state: #2d62ff` |
| Grundfläche | `--base-color-neutral--white: #fff`; helle Sekundärfläche `--blue-light-main: #e6ecf8`; Neutrale Stufen `#eee / #ccc / #aaa / #666 / #444 / #222 / #111` als `--base-color-neutral--*` |
| Dunkle Fläche | `body { background-color: #050310 }` (13 Treffer) plus `--base-color-brand--blue-dark: #080331`; `--base-color-neutral--black: #000` als `--background-color--background-primary` |
| Ungenutzte System-Tokens | `--base-color-brand--pink: #dd23bb` (2 Treffer, in den gelesenen Shots nirgends sichtbar), Status-Paare `error #f8e4e4/#3b0b0b`, `success #cef5ca/#114e0b`, `warning #fcf8d8/#5e5515` — Webflow-Starter-Set, nicht Marke |
| Spacing-Skala | Doppelspurig: px-Raster dominiert (`gap:16px` 117×, `20px` 116×, `12px` 85×, `24px` 81×, `10px` 75×, `32px` 57×, `8px` 56×, `40px` 54×), daneben rem-Reihe `.25/.5/.75/1/1.25/1.5/2/2.5/3/3.5rem` |
| Radii | Familie 8–24 px, Schwerpunkt `16px` (43×), dann `12px` (24×), `8px` (17×), `20px` (17×), `24px` (12×); `100%` (22×) für Avatare, `100px` (12×) für Pillen/Chips |
| Schatten | Sehr sparsam und flach: dominierend `0 1.5px #002e8b14` (10×, eine gefärbte Haarlinie statt Schlagschatten), `0 4px 8px #0000000d`; genau **ein** aufwendiger Glow für die Primärtaste (mehrfach inset-weiß plus dreistufig `#276dfa1f/#276dfa14`) |
| Typo-Stufen | `h1` `38px/44px`, `h2` `32px/36px` aus dem Webflow-Basiswerk; überschrieben durch `h2 { font-size: 3rem; font-weight: 700; line-height: 1.2 }`. Der Abstand H1↔H2 der Basisregeln liegt bei 16 % und wäre nach S23 keine Stufe — die tatsächlich gerenderte H1 im Fold ist jedoch deutlich größer als 38 px (`shots/home-desktop-00-fold.png`), die Basisregeln greifen dort nicht. Exakte gerenderte px-Werte: **nicht erhoben** (kein DevTools-Extrakt im Sweep). |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas (Anordnung, Buttons, Typo, Farbe, Abstände,
Mobil): `cryptory/sektionen.md`.

Startseite `/`, Reihenfolge von oben. Pattern-IDs aus `../stil-regeln.md` §4;
`—` heisst: kein passender Katalog-Eintrag, Kandidat.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Nur Logo und ein Flaggen-Chip, keine Menüpunkte im Desktop-Fold; mobil zusätzlich ein Burger-Feld (`shots/home-desktop-00-fold.png`, `shots/home-mobile-00-fold.png`). |
| 2 | Hero | Split | `P-HERO-PHOTO` | Helles Foto zweier Gründer rechts randabfallend **ohne** dunkles Overlay, links Badge, dreizeilige H1 mit genau einem blauen Serifen-Kursiv-Wort, Lead, CTA-Paar und darunter eine Proof-Karte aus Avatar-Stapel + „2.139+", Trustpilot-Sternen „4.9" und zwei echten Siegeln (TÜV, BVMW) (`shots/home-desktop-00-fold.png`). |
| 3 | Logo-Leiste | Band | `P-PROOF-STRIP` | Graustufige Wortmarken (YouTube, World of Trading, Cashflow Conference, Founder Summit, Finanzkongress.de) auf hellgrauer Fläche, direkt am Fold-Boden angeschnitten (`shots/home-desktop-00-fold.png`, `shots/home-desktop-02-y750.png`). |
| 4 | „3 Fakten" | Raster | `P-FEATURE-3` | Drei gleich hohe weiße Karten, jede mit eigener Daten-Illustration (Candlestick, Renditekurve, News-Schnipsel mit Jahreszahlen) über Trennlinie und Absatz; gestaffelte Einblendung sichtbar, danach zentriert dasselbe CTA-Paar (`shots/home-desktop-02-y750.png`). |
| 5 | Problem-Chat | Layering/Parallax/Scroll-Progress | — (Kandidat: simulierter Community-Chat) | Unscharfes Skyline-Foto als Grund, darüber eine weiße Frage-Karte mit Avatar und darunter Chat-Blasen mit Vornamen und blauem Verifiziert-Häkchen, die beim Scrollen nachlaufen (`shots/home-desktop-03-y1500.png`, `shots/home-desktop-05-y3000.png`). |
| 6 | Bento „Lerne das Investieren & Traden" | Raster | — (Kandidat: Bento-Beleg-Raster) | Vier ungleich große Kacheln mit je einer Kennzahl oder einem Ortsbeleg: 3D-Render „Über 10.000+ durchgeführte Trades", dunkle Avatar-Kachel „2.139+ erfolgreiche Teilnehmer/innen", hohe Frankfurt-Skyline mit Chip „Deutsches Unternehmen", breites Team-Foto „Ein Team aus mehr als 12 Krypto-Experten" (`shots/home-desktop-07-y4500.png`). |
| 7 | Zeitstrahl „10+ Jahre" | Band | — | Helle Kachel mit blassen Jahreszahlen 2021–2026 im Grund und einem dunklen Kalenderblatt „2015" als Marker (`shots/home-mobile-20-y8018.png`). |
| 8 | Trust „Warum tausende uns vertrauen" | Split | `P-PROOF-STRIP`-Variante | Links Badge, H2, Absatz und drei Kennzahlen mit Icon über dünnen Linien („Über 2.139 Aktive Mitglieder", „4.9 Sterne Kundenbewertung", „Seit 2026 TÜV-zertifiziert"); rechts das **lesbare TÜV-Rheinland-Zertifikatsdokument** mit ISO 9001:2015, Registriernummer, Frankfurter Anschrift und Gültigkeit 25.02.2026–24.02.2029 (`shots/home-desktop-09-y6000.png`). |
| 9 | Leistungs-Bänder „Das erwartet dich" | Split (Serie) | `P-FEATURE-SPLIT` | Mehrere identisch gebaute hellgraue Karten mit großem Radius: links Chip, H2 mit grauer dritter Zeile und Feature-Zeilen mit Icon über Trennlinien, rechts ein überstehender Produkt-Screenshot (Kurs-Hub im macOS-Fenster, Betreuer-Liste mit Klarnamen und Rollen, Dashboard mit Donut „54,69 %") (`shots/home-desktop-09-y6000.png`, `shots/home-desktop-12-y8250.png`). |
| 10 | Community | Layering/Parallax/Scroll-Progress | — (Kandidat: ausfadendes Event-Foto) | Zentrierte H2 plus Subline, darunter ein breites Event-Foto, das nach oben in Weiß ausfadet, und darauf eine dunkle Kachel „Vor-Ort-Events: Insider-Days & Mastermind"; leitet farblich ins Schwarz der Folgesektion (`shots/home-desktop-15-y10500.png`). |
| 11 | Mentoren-Duo | Raster | `P-TEAM` | Zwei schwarze Porträt-Karten nebeneinander (Georg Borgert / Johannes Schoster), Foto ganzflächig oben, unten Rollen-Chip, Name, zwei Absätze und je eine weiße Outline-Taste mit unterschiedlichem Ziel (Trading-Weg / Investor-Weg) (`shots/home-desktop-17-y12000.png`, `shots/home-desktop-18-y12750.png`). |
| 12 | Erfolgsgeschichten | Split + Akkordeon | `P-TESTIMONIAL` | Vier Personen-Tabs (Foto, Klarname, Beruf) mit blauer Unterstreichung des aktiven Tabs; darunter links ein Video-Standbild mit Play, Ton-Button und Zitat im Bild, rechts drei betitelte Blöcke Ausgangssituation / Ziel / Ergebnis, das Ergebnis als Bullet-Liste mit Zahlen („400% Rendite in wenigen Monaten", „3-4 Stunden pro Woche"); Tabwechsel belegt über `shots/home-desktop-click-y12750-*.png` (`shots/home-desktop-18-y12750.png`). |
| 13 | Trustpilot-Band | Band | `P-PROOF-STRIP` | Echtes eingebettetes Trustpilot-Widget: Wort-Urteil, Sterne, „Basierend auf 398 Bewertungen" als Link, Trustpilot-Logo, daneben ein Karussell einzelner Rezensionen mit Klarname, Datum, Titel, Textanriss und „Verifiziert"-Marke (`shots/home-desktop-20-y14250.png`). |
| 14 | Schluss-Sektion | Band | `P-CTA-END` | Einzige durchgehend schwarze Sektion: Badge, zentrierte H2 mit Serifen-Kursiv-Passage, Lead und dasselbe CTA-Paar wie im Fold, hinterlegt mit einem sehr dunklen Fenster-/Skyline-Foto (`shots/home-desktop-20-y14250.png`). |
| 15 | Social + Ressourcen | Raster | — (Kandidat: Kanal-Karten mit Reichweitenzahl) | Drei gleich hohe weiße Karten (YouTube „40.700+ Abonnenten", Podcast „50.000+ monatliche Streams", Instagram „75.800+ Follower") mit Original-Plattform-Logo, kurzem Text, plattformeigenem Screenshot und je einer kleinen blauen Taste; darunter eine breite Ressourcen-Karte als Split (`shots/home-desktop-23-y16130.png`). |
| 16 | Footer | Band | — | Sehr schmal: eine Zeile Rechtslinks (Impressum, Datenschutz, AGB, Karriere, Werte) über einer Linie, darunter drei Absätze Risikohinweis und Ausschluss der Anlageberatung mit MiCAR-Verweis in kleiner grauer Schrift (`shots/home-desktop-23-y16130.png`). |
| 17 | Sticky-Bodenleiste | Band | — (Kandidat: Nav als Bodenpille) | Ab etwa der Trust-Sektion dauerhaft eingeblendete weiße Pillenleiste mit Logo, vier Textlinks und der blauen Primärtaste rechts — sie ersetzt die im Fold fehlende Navigation (`shots/home-desktop-09-y6000.png`, `shots/home-desktop-12-y8250.png`, `shots/home-desktop-15-y10500.png`). |

## 4. Raphael-Urteil

**Verdikt: GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)**

Der Stamp stammt aus Raphaels URL-Liste; der Begründungssatz liegt noch nicht
vor. Die folgenden Stichpunkte sind der belegte Befund des Agenten, kein
zugeschriebenes Urteil.

**Essenz (max. 3 Sätze).** Cryptory beweist in einem Vertrauensdefizit-Markt
mit Dokumenten statt Behauptungen: das TÜV-Rheinland-Zertifikat liegt als
lesbares Blatt mit Registriernummer und Gültigkeitsdatum neben der Headline,
nicht als nachgebautes Siegel (`shots/home-desktop-09-y6000.png`), und die
Bewertung kommt als echtes Trustpilot-Embed mit 398 Bewertungen, Klarnamen und
Datum (`shots/home-desktop-20-y14250.png`). Die Testimonials sind vollständige
Fälle statt Zitate — Video, Ausgangssituation, Ziel und Ergebnis mit Zahlen,
über eine Personen-Tableiste umschaltbar (`shots/home-desktop-18-y12750.png`).
Getragen wird das von einem extrem strengen Farbsystem: alles bis auf zwei
Sektionen ist Weiß bis Hellgrau, `#276dfa` ist die einzige Signalfarbe, und
die einzige typografische Abweichung ist ein blaues Serifen-Kursiv-Wort pro
Headline (`shots/home-desktop-00-fold.png`).

**Weitere belegte Befunde:**

- Ein einziges CTA-Paar sitewide, primär blau mit Glow und Doppelpfeil,
  sekundär weiß mit Kalender-Icon — wörtlich identisch im Fold, nach der
  Fakten-Sektion, in der Chat-Sektion und in der schwarzen Schluss-Sektion
  (`shots/home-desktop-00-fold.png`, `-02-y750.png`, `-03-y1500.png`,
  `-20-y14250.png`).
- Der Fold trägt keine Navigation. Sie erscheint erst als eingeblendete
  Bodenpille, sobald die Trust-Sektion erreicht ist — der Fold bleibt damit
  ohne Ausstiegspfad neben dem CTA (`shots/home-desktop-09-y6000.png`).
- Kennzahlen sind durchgehend krumm und beschriftet: 2.139+ Teilnehmer,
  10.000+ Trades, 398 Bewertungen, 4.9 Sterne, 143.900+ Follower, aufgeteilt
  in 40.700 / 50.000 / 75.800 je Kanal (`shots/home-desktop-07-y4500.png`,
  `-20-y14250.png`, `-23-y16130.png`).
- Der Footer trägt drei Absätze Risikohinweis und expliziten Ausschluss der
  Anlageberatung samt MiCAR-Verweis statt eines Link-Rasters — die
  Rechtspflicht wird zum sichtbaren Seriositätssignal
  (`shots/home-desktop-23-y16130.png`).
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  **S3** — zwei sehr dunkle Flächen in Folge (Mentoren-Duo schwarz,
  Schluss-Sektion schwarz), dazu die dunkle Bento-Kachel
  (`shots/home-desktop-17-y12000.png`, `-20-y14250.png`).
  **S2** — Karten tragen auch dort, wo nichts Gleichhohes verglichen wird
  (Bento-Kacheln, Leistungs-Bänder als Karten).
  **S9** — der Hero zeigt echte Menschen, aber die Beweis-Illustrationen der
  Fakten-Sektion und mehrere Bento-Kacheln sind 3D-Renders
  (`shots/home-desktop-02-y750.png`, `-07-y4500.png`).
  **S6/Motion** — Karten blenden gestaffelt ein und die Chat-Blasen laufen
  scrollgebunden nach; Reduced-Motion-Verhalten ist **nicht geprüft**, was
  die Layering-Familie nach `../ui-layouts-catalog.md` ohne Beleg zum Fail
  macht.
  **S19** — mehrere H2 sind erst mit dem Badge darüber vollständig
  verständlich (etwa die Schluss-Sektion mit Badge „Für Krypto-Investoren und
  Trader").

**Do-not-copy:** siehe Kopftabelle — Marke, Porträt-/Team-Fotos, das
TÜV-Zertifikat und die BVMW-Marke, alle Zitate, Namen, Ergebniszahlen und
sämtlicher Text. Übernommen wird nur die Struktur.

**Lizenz / Provenance:** `ungeklärt`. Die Screenshots in `cryptory/shots/`
sind ein eigener Capture-Lauf der öffentlich erreichbaren Seite und dienen
ausschließlich intern als Studienmaterial. Keine Rechte an Fotos, Logos,
Siegeln oder Texten; keine Weiterveröffentlichung. Der Case bleibt deshalb
`kandidat`.

## 5. Regel-Kandidaten

Alle Zeilen sind Kandidaten. Eintrag in `../stil-regeln.md` erst nach
Raphaels Begründung und erfüllter Belegschwelle; `regel-kandidaten.md` pflegt
der Integrator, nicht dieser Case.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Zertifizierung als lesbares Dokument statt als nachgebautes Siegel: das TÜV-Rheinland-Zertifikat steht mit ISO-Norm, Registriernummer, Firmenanschrift und Gültigkeitszeitraum in Originalgröße neben der Trust-Headline, das Siegel selbst nur klein darunter (Beleg: `cryptory/shots/home-desktop-09-y6000.png`) | S9-N-nah (Positivseite: Beweis statt Behauptung) | GO | kandidat |
| Testimonial als vollständiger Fall statt als Zitat: Personen-Tableiste mit Klarname und Beruf schaltet zwischen Fällen, jeder Fall zeigt Video mit Zitat im Bild plus die drei Blöcke Ausgangssituation / Ziel / Ergebnis, das Ergebnis als Bullet-Liste mit Zahlen (Beleg: `cryptory/shots/home-desktop-18-y12750.png`, Tabwechsel `cryptory/shots/home-desktop-click-y12750-*.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Genau eine typografische Abweichung pro Headline: ein einziges Wort oder eine Zeile in blauer Serifen-Kursive (Denton) im sonst schwarzen Sans-Satz — nie zwei Akzente in derselben Headline (Beleg: `cryptory/shots/home-desktop-00-fold.png`, `cryptory/shots/home-desktop-09-y6000.png`, `cryptory/shots/home-mobile-00-fold.png`; Token: `Denton` in 26 CSS-Regeln gegen `Inter Display`/`Inter Tight` im Fließsatz) | S1-nah (Akzent-Sparsamkeit auf die Typo übertragen) | GO | kandidat |
| Ein CTA-Paar sitewide statt eines einzelnen CTA: dieselbe blaue Primärtaste mit Glow und Doppelpfeil plus dieselbe weiße Outline-Sekundärtaste mit Kalender-Icon an jeder Wiederholung; die Sekundärtaste hält den unentschlossenen Besucher, ohne den Funnel zu spalten (Beleg: `cryptory/shots/home-desktop-00-fold.png`, `-02-y750.png`, `-03-y1500.png`, `-20-y14250.png`, mobil `home-mobile-00-fold.png`) | S17-nah | GO | kandidat |
| Navigation erst nach dem Fold als eingeblendete Bodenpille: der Desktop-Fold trägt nur Logo und Flaggen-Chip, die volle Leiste mit vier Links und Primärtaste erscheint ab der Trust-Sektion und bleibt (Beleg: `cryptory/shots/home-desktop-00-fold.png` gegen `-09-y6000.png`, `-12-y8250.png`, `-15-y10500.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Reichweite pro Kanal einzeln beziffert statt als Summe: eine Karte je Plattform mit Original-Logo und eigener krummer Zahl (40.700+ / 50.000+ / 75.800+), die Gesamtzahl 143.900+ nur als Badge darüber (Beleg: `cryptory/shots/home-desktop-23-y16130.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Rechtspflicht als Seriositätssignal: der Footer besteht aus einer Zeile Rechtslinks und drei Absätzen Risikohinweis mit ausdrücklichem Ausschluss der Anlageberatung und MiCAR-Bezug — kein Link-Raster, kein Social-Block (Beleg: `cryptory/shots/home-desktop-23-y16130.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Flache Haarlinie statt Schlagschatten als Karten-Trennung: dominierender Schatten der Site ist `0 1.5px #002e8b14`, der einzige aufwendige Glow gehört der Primärtaste (Beleg: CSS-Zählung §2; sichtbar `cryptory/shots/home-desktop-02-y750.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Zwei schwarze Flächen in Folge (Mentoren-Duo, Schluss-Sektion) plus dunkle Bento-Kachel auf einer sonst durchgehend hellen Seite (Beleg: `cryptory/shots/home-desktop-17-y12000.png`, `-20-y14250.png`, `-07-y4500.png`) | S3 | NO-GO (Spannung, kein Übernahme-Kandidat) | kandidat |
| Scrollgebundene Chat-Blasen und gestaffelte Karten-Einblendungen ohne geprüften Reduced-Motion-Pfad; nach `../ui-layouts-catalog.md` ist die Layering-Familie ohne Reduced-Motion-Beleg ein Fail (Beleg: `cryptory/shots/home-desktop-03-y1500.png`, `-05-y3000.png`, `-02-y750.png`; Reduced-Motion **nicht geprüft**) | S6 | NO-GO (Spannung) | kandidat |
