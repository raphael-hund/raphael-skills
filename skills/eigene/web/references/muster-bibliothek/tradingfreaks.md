# Case: TradingFreaks (Trading-Ausbildung / e-Learning, DACH)

| Feld | Wert |
|---|---|
| Slug | `tradingfreaks` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://www.tradingfreaks.com/` — abgerufen 02.09.2026 |
| Evidence | `tradingfreaks/shots/` (94 Dateien, Sweep 02.09.2026); gelesen: `home-desktop-00-fold.png`, `home-desktop-02-y750.png`, `home-desktop-03-y1500.png`, `home-desktop-05-y3000.png`, `home-desktop-08-y5250.png`, `home-desktop-11-y7500.png`, `home-desktop-13-y9000.png`, `home-desktop-15-y10500.png`, `home-desktop-16-y11250.png`, `home-desktop-19-y13500.png`, `home-mobile-00-fold.png`, `home-mobile-06-y2110.png` |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (Wissens-/Ausbildungsdienstleistung mit Beratungs-Funnel; DENSITY hoch wie `ads-lp`, VARIANCE niedrig) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Klärt, wie eine Seite in einem Feld mit hohem Misstrauens-Grundrauschen Seriosität visuell beweist statt behauptet — und wie ein Ein-Akzent-System (ein Grün) über eine sehr lange Seite ohne Farb-Inflation durchhält. |
| Do-not-copy | Wortmarke, Logo und Grünton von TradingFreaks; alle Personenfotos (Team, CEO, Teilnehmer), die Video-Standbilder, das TÜV-Zertifikat und die Buch-Renders; jeder Zahlen-Claim (Teilnehmerzahl, Bewertungszahl, Renditewert, Trade-Ergebnisse) — diese Zahlen gehören dem Anbieter und dürfen nie als Platzhalter übernommen werden; sämtliche Copy. |
| Lizenz / Provenance | `ungeklärt` — Screenshots sind ein eigener Capture vom 02.09.2026 (`scripts/muster-studie.mjs` + `scripts/shot-sweep.mjs`) und liegen ausschliesslich intern als Studienmaterial. Kein Asset, kein Foto und kein Textbaustein wird weiterverwendet; Urheber aller Motive ist TradingFreaks / TF Daytrading GmbH. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

```bash
cd /root/raphael-skills/skills/eigene/web
node scripts/muster-studie.mjs --url https://www.tradingfreaks.com/ --slug tradingfreaks
# Exit 0, 38 Shots (Desktop, Hover, Klick)
node scripts/shot-sweep.mjs --base https://www.tradingfreaks.com/ \
  --out .../tradingfreaks/shots-mobile --routes / --mobile --no-interact
# Exit 0, mobile Serie; danach in shots/ zusammengeführt
```

Der Wrapper `muster-studie.mjs` reicht kein `--mobile` an `shot-sweep.mjs`
durch, deshalb der zweite Aufruf für den Pflicht-Viewport `390×844`. Beide
Läufe meldeten `NAV-ERR … networkidle` und fielen laut Ausgabe auf
`domcontentloaded` zurück; die Route lieferte danach `200`. Es gibt keine
`/small/`-JPGs in diesem Sweep, gelesen wurden die PNGs. Budget: 12 Shots.

Nur die Startseite wurde erfasst; keine weitere Route.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `tradingfreaks/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `tradingfreaks/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie Desktop | `home-desktop-02-y750.png`, `-03-y1500.png`, `-05-y3000.png`, `-08-y5250.png`, `-11-y7500.png`, `-13-y9000.png`, `-15-y10500.png`, `-16-y11250.png`, `-19-y13500.png` | ja (9 von 20) |
| Scroll-Serie Mobil | `home-mobile-06-y2110.png` | ja (1 von 54) |
| Hover-Serie Nav | `home-desktop-hover-00…04-*.png` | nein (nur Dateinamen ausgewertet) |
| Klick-Serie Slider/FAQ/Tabs | `home-desktop-click-y8250-*`, `-y11250-*`, `-y12000-*.png` | nein (nur Dateinamen ausgewertet) |

Ein Cookie-Banner liegt in **jedem** gelesenen Shot als Vollbreiten-Leiste am
unteren Rand und verdeckt dort Inhalt; im Mobil-Fold überdeckt es die
Beleg-Karte unter dem CTA-Paar. Nicht geprüft: alle Unterseiten, offene
FAQ-Zustände, Hover-Zustände, Mobil unterhalb `y2110`.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `trading-freaks.webflow.6755d6ec7e43f830d142f5a8.2c6a48bac.opt.min.css`
(Webflow-CDN, per curl geladen 02.09.2026; Custom Properties, `body`-,
Heading-, `border-radius`-, `box-shadow`- und `gap`-Regeln ausgezählt).

| Token | Wert |
|---|---|
| Display-Font | Outfit (`h1` 38px/44px 700, `h2` 2.75rem/1.1 600 bzw. 32px/36px 700, `h3` 24px 700) |
| Body-Font | Outfit, Arial, sans-serif (`body` 14px/20px, `#333`); Inter und Roboto stehen je nur in Einzelregeln im CSS |
| Akzentfarbe (HEX) | `--green-brand: #13f97b` (23 Treffer im CSS), Zweitton `--green-secondary: #09e06a`; dunkles Pendant `--_text---color--light-cta: #09502a` (8 Treffer) und `--_text---color--nav-dark: #032b16` |
| Grundfläche | `#fff` (`--white`), Seiten-Grund `#f1f3f5`; Karten weiss auf hellgrauer Sektion |
| Dunkle Fläche | `#000` (`--black`) sowie die fast schwarzen Grüntöne `#081e14`, `#04120b`, `#0b100d`; Blaugrau-Bänder `#0d101a` / `#0d111a`; `--_text---color--dark-cta: #07110e` |
| Sekundärtext | `--_text---color--grey-on-light: #5d6b82`, `--_text---color--grey-on-dark: #9fa9ba` |
| Weitere deklarierte Farben | `--amber: #ffc857` / `--amber-secondary: #ffb000`, `--orange: #ff9a3d` / `--orange-secondary: #ff7a1a`, `--trust-blue: #4ea3ff` / `--trust-blue-secondary: #2d8cff` — in keinem gelesenen Shot sichtbar |
| Spacing-Skala | px-Raster, häufigste `gap`-Werte 20px (128×), 16px (84×), 10px (79×), 40px (67×), 30px (58×); Paddings 1rem (16×), 24px (6×), 1.5rem (6×) |
| Radii | Familie 8/10/12/16/20/24px (10px 19×, 8px 18×, 12px 15×, 20px 14×, 16px 14×); Pill separat über `100px`, `999rem`, `60px`, `48px`; `100%` nur für runde Avatare |
| Schatten | sehr flach: `0 2px 5px #00000026`, `0 2px 5px #0000001a`, `0 1px 20px #0000001f`; farbige Ausnahme `0 2px 5px #09502a1a`, `0 2px 5px #13f97b7d` und `0 24px 32px -20px #13f97bb8` unter dem grünen CTA; 12× explizit `box-shadow:none` |
| Reduced Motion | `prefers-reduced-motion` kommt im Site-CSS **0×** vor, bei 13 `position:sticky`-Regeln |

Nicht erhoben: gerenderte Font-Größen pro Breakpoint (nur CSS-Deklaration),
Letter-Spacing-Skala, Container-Breiten.

## 3. Sektionen-Inventar

Detail-Atlas je Sektion (Anordnung, Buttons, Typo, Farbe, Abstände, Mobil):
`tradingfreaks/sektionen.md`.

Startseite `/`, Reihenfolge von oben. Pattern-IDs aus `../stil-regeln.md` §4;
`—` heisst: kein Katalog-Pattern trifft.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Weisse Sticky-Leiste, Logo links, vier Nav-Punkte (zwei mit Chevron-Dropdown), rechts der einzige grüne Pill-CTA mit Play-Icon; auf allen gelesenen Scroll-Shots identisch (`home-desktop-00-fold.png`, `-05-y3000.png`, `-19-y13500.png`). |
| 2 | Hero | Split | `P-HERO-SPLIT` (Fläche links, Bildspalte rechts; kein vollflächiges Foto, daher nicht `P-HERO-PHOTO`) | Text links / Foto rechts: Trust-Chip-Zeile (Trustpilot-Wertung + Verifiziert-Chip) über der zweizeiligen H1, Lead, CTA-Paar nebeneinander (grün mit Play, weiss mit Telefon), darunter eine Beleg-Leiste aus echtem TÜV-Rheinland-Siegel mit ISO-Nummer plus Avatar-Stapel und Teilnehmerzahl; das Foto trägt zwei schwebende weisse Pill-Badges und einen unverfärbten Bildhintergrund (`home-desktop-00-fold.png`). |
| 3 | Video-Split | Split | — | Links H2 + Lead + dasselbe CTA-Paar gestapelt, rechts ein Video-Standbild mit grossem grünem Play-Button und eingebranntem Klarname-/Rollen-Block im Bild (`home-desktop-02-y750.png`). |
| 4 | Fakten-Raster | Raster | `P-PROOF-STRIP`-nah (Karten statt Leiste); die Firmensitz-Karte allein ist `P-MAP` | Weisse Karten in ungleichen Spaltenbreiten, je Karte genau eine Zahl plus ein eigenes Bildmittel statt Icon: Avatar-Wolke, freigestelltes Team-Gruppenfoto über die Kartenkante, gepunktete Europakarte mit Flaggen-Pill, Jahres-Kachelreihe, Kurschart mit Zeitraum-Umschaltern und Risiko-Fussnote, Broker-Zeilen mit LONG/SHORT-Chips (`home-desktop-02-y750.png`, `-03-y1500.png`). |
| 5 | CEO-Zitat-Band | Band | `P-TESTIMONIAL` | Eine dunkelblaugraue abgerundete Vollbreiten-Karte, vierzeiliges Zitat in Weiss, darunter rundes Portrait mit Klarname und Rolle — keine Sterne, kein Icon (`home-desktop-05-y3000.png`). |
| 6 | E-Learning-Säulen | Layering/Parallax/Scroll-Progress | `P-PROCESS-3`-nah (fünf Schritte) | Fast schwarze Sektion: links Schritt-Spalte mit vertikaler Fortschrittslinie und nummerierten Häkchen-Chips „Säule 01…05" plus H3 und Text, rechts ein Bild, das über den Scroll stehen bleibt — in `-05-y3000.png` bei Säule 01, in `-08-y5250.png` bei Säule 04/05 dasselbe Motiv. |
| 7 | Testimonial-Bühne | Layering/Parallax/Scroll-Progress | `P-TESTIMONIAL` | Abgerundete Foto-Bühne mit dunklem Verlauf, darauf Trust-Chips, weisse H2 und eine Trustpilot-Zeile mit Sterne-Block, verlinkter Bewertungszahl und Trustpilot-Logo; die weissen Video-Karten (Standbild mit TF-Wasserzeichen, Vorname, Sterne, Zitat) ragen im versetzten Raster in die Bühne hinein (`home-desktop-11-y7500.png`). |
| 8 | Zitat-Slider | Band | `P-TESTIMONIAL` | Weisse Karte mit grossem Zitat, Portrait + Klarname, rechts zwei runde graue Pfeil-Buttons; unter einer Trennlinie ein Abbinder-Satz mit Jahreszahl und Teilnehmerzahl (`home-desktop-13-y9000.png`, Interaktion `home-desktop-click-y8250-00/01-*.png`). |
| 9 | TÜV-Zertifikat | Split | `P-PROOF-STRIP` (Dokument statt Siegel) | Zentrierte H2 + Lead, darunter links der echte Zertifikat-Scan mit lesbarer Registriernummer, Firmierung, Anschrift, Gültigkeitsdatum und Prüfer-Logos, rechts drei Absätze plus Vier-Punkt-Bulletliste (`home-desktop-13-y9000.png`). |
| 10 | Buch-Angebot | Split | `P-CTA-END`-nah (Produkt-Offer) | Links Produkt-Render mit zwei schwebenden Häkchen-Badges, rechts Eyebrow-Chip, H2 in Anführungszeichen, Preiszeile mit durchgestrichenem Vorpreis, grüner CTA, weisse Versand-Pill mit Lieferfrist, Avatar-Stapel mit Bestellzahl (`home-desktop-15-y10500.png`). |
| 11 | Über-uns-Band | Band | — | Dunkelblaugraue abgerundete Vollbreiten-Karte, links H2 und drei Absätze, rechts ein freigestelltes Portrait, das über den Bandrand hinauswächst, darunter dasselbe CTA-Paar (`home-desktop-16-y11250.png`). |
| 12 | FAQ | Akkordeon | `P-FAQ` | Links H2 und kurzer Hinweistext, rechts weisse Akkordeon-Zeilen mit fetter Frage und Plus-Zeichen (`home-desktop-16-y11250.png`; vier Frage-Ziele belegt über `home-desktop-click-y11250-00…03-*.png`). |
| 13 | Ressourcen-Tabs | Raster | — | Vier Umschalter (Blogs, Presse, Podcast, Youtube), nur über die Klick-Dateinamen `home-desktop-click-y12000-00…03-*.png` belegt; das gerenderte Bild wurde nicht gelesen. |
| 14 | Schluss-CTA-Bühne | Band | `P-CTA-END` | Abgerundete Foto-Bühne mit echtem Arbeitsplatz-Foto und einseitiger Abdunklung, rechts Trust-Chip mit Wertung und Zertifikatsnennung, weisse H2, Lead, grüner Vollbreiten-CTA und darunter der weisse Telefon-Button (`home-desktop-19-y13500.png`). |
| 15 | Newsletter | Split | `P-CONTACT` | Weisse Karte mit dünnem grünem Rand auf schwarzem Grund: links Eyebrow-Pill, H2, Lead; rechts zwei Felder mit Innen-Label und grüner Vollbreiten-Absende-Button plus Datenschutz-Kleinschrift (`home-desktop-19-y13500.png`). |
| 16 | Footer | Raster | — | Schwarze Fläche, links Logo und Beschreibungsabsatz, rechts vier Linkspalten, die letzte mit Icon-Zeilen für soziale Netze (`home-desktop-19-y13500.png`). |

Mobil (390): Der Nav-CTA weicht einem Burger-Button, das Hero-Foto entfällt
ganz, H1 und Lead werden zentriert, das CTA-Paar stapelt vollbreit
(`home-mobile-00-fold.png`); das Fakten-Raster wird zum Einspalten-Stapel und
behält Bildmittel und Kartenüberstand (`home-mobile-06-y2110.png`).

## 4. Raphael-Urteil

**Verdikt: GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)** — der
Begründungssatz steht aus, deshalb bleibt Status `kandidat` und alle
Regel-Kandidaten in §5 bleiben `kandidat`.

**Essenz (max. 3 Sätze, am Shot belegt).** Die Seite beweist Seriosität mit
prüfbaren Dokumenten statt mit Trust-Grafik: das TÜV-Zertifikat liegt als
lesbarer Scan mit Registriernummer, Firmierung und Gültigkeitsdatum in voller
Grösse auf der Seite (`home-desktop-13-y9000.png`), das Siegel steht bereits im
Fold neben einer Trustpilot-Wertung (`home-desktop-00-fold.png`), und die
Bewertungszeile nennt Wertung, Bewertungszahl und verlinkt die Plattform statt
selbstgebauter Sterne (`home-desktop-11-y7500.png`). Jede Zahl bekommt ein
eigenes Bildmittel statt eines Icons — Avatar-Wolke, freigestelltes
Team-Gruppenfoto, gepunktete Europakarte, Jahres-Kachelreihe, echter Kurschart
mit Zeitraum-Umschaltern und Risiko-Fussnote —, sodass das Fakten-Raster nicht
als Card-Soup liest (`home-desktop-02-y750.png`, `-03-y1500.png`). Über 20
Scroll-Slices bleibt genau ein CTA-Paar bestehen, grüner Play-Button plus
weisser Telefon-Button, in Hero, Video-Split, Über-uns-Band und Schlussbühne
identisch (`home-desktop-00-fold.png`, `-02-y750.png`, `-16-y11250.png`,
`-19-y13500.png`).

**Spannungen zum Regelbuch** (für die Synthese, kein Urteils-Override):

- S3: mehr als eine dunkle Sektion — fast schwarze Säulen-Sektion
  (`home-desktop-05-y3000.png`), zwei dunkelblaugraue Bänder
  (`-05-y3000.png`, `-16-y11250.png`), dunkle Foto-Bühnen (`-11-y7500.png`,
  `-19-y13500.png`) und schwarzer Newsletter-/Footer-Grund (`-19-y13500.png`).
- S4: der Primär-CTA ist im Nav eine Pille (`home-desktop-00-fold.png`); im
  Seitenkörper ist derselbe CTA ein Rechteck mit weichen Ecken.
- S11: „Säule 01 … 05" nummeriert — hier aber eine echte Sequenz, also im
  Rahmen der S11-Ausnahme (`home-desktop-05-y3000.png`, `-08-y5250.png`).
- Layering-Familie ohne Reduced-Motion-Beleg: Sticky-Scroll in der
  Säulen-Sektion, 13 `position:sticky`-Regeln, aber `prefers-reduced-motion`
  kommt im Site-CSS 0× vor — nach `../ui-layouts-catalog.md` §Sektions-Layout-
  Familien wäre das ein Fail, kein Geschmacksstreit.
- Cookie-Banner verdeckt in jedem gelesenen Shot den unteren Seitenrand,
  mobil sogar die Beleg-Karte direkt unter dem CTA-Paar
  (`home-mobile-00-fold.png`).
- Zwei aufeinanderfolgende Sektionen tragen dasselbe Portrait-Motiv des CEO
  nicht — geprüft und nicht verletzt; das Säulen-Bild wiederholt sich aber
  über fünf Schritte innerhalb einer Sektion (`-05-y3000.png`, `-08-y5250.png`).
- Deklariert, aber unbenutzt: Amber, Orange und Trust-Blue stehen als Tokens
  im CSS und tauchen in keinem gelesenen Shot auf — Token-Set und sichtbares
  System decken sich nicht (S25-Nähe).

**Do-not-copy** (siehe Kopftabelle): Marke, Logo, Grünton, alle Personenfotos,
das TÜV-Zertifikat, die Buch-Renders, jeder Zahlen-Claim und sämtliche Copy.

**Lizenz / Provenance:** `ungeklärt`. Die Screenshots sind ein eigener Capture
und bleiben ausschliesslich intern als Studienmaterial; kein Asset wird
weiterverwendet.

## 5. Regel-Kandidaten

Alle Einträge `kandidat`. Der Urteils-Stamp trägt den Begründungssatz noch
nicht; ein Eintrag in `../stil-regeln.md` erfolgt erst danach und durch den
Integrator, nicht hier.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Zertifikat als lesbares Dokument statt als Siegel-Icon: der TÜV-ISO-9001-Scan liegt in voller Grösse mit Registriernummer, Firmierung, Anschrift, Gültigkeitsdatum und Prüfer-Logos auf der Seite; das kleine Siegel im Fold verweist nur darauf (Beleg: `home-desktop-13-y9000.png`, `home-desktop-00-fold.png`) | S9-N (Positivseite) | GO | kandidat |
| Bewertungen nur mit Plattform, Wertung und Bewertungszahl, dazu die Plattform-Wortmarke und ein Link auf die Bewertungszahl — nie selbstgebaute Sterne als Deko (Beleg: `home-desktop-11-y7500.png`, Fold-Chip `home-desktop-00-fold.png`) | S9-N | GO | kandidat |
| Jede Zahl bekommt ein eigenes Bildmittel statt eines Icons: Avatar-Wolke, freigestelltes Gruppenfoto über die Kartenkante, gepunktete Landkarte, Jahres-Kachelreihe, Kurschart mit Zeitraum-Umschaltern, Broker-Zeilen mit LONG/SHORT-Chips — so wird ein 6er-Karten-Raster keine Card-Soup (Beleg: `home-desktop-02-y750.png`, `home-desktop-03-y1500.png`, mobil `home-mobile-06-y2110.png`) | S14 (Gegenprobe) | GO | kandidat |
| Ein CTA-Paar sitewide statt eines Einzel-CTA: grüner Button mit Play-Icon für den Selbstbedienungsweg plus weisser Umriss-Button mit Telefon-Icon für den Gesprächsweg, in Hero, Video-Split, Über-uns-Band und Schlussbühne identisch, mobil vollbreit gestapelt (Beleg: `home-desktop-00-fold.png`, `-02-y750.png`, `-16-y11250.png`, `-19-y13500.png`, `home-mobile-00-fold.png`) | S1 / S4 (Spannung, siehe §4) | GO | kandidat |
| Ein Renditewert wird nie nackt gezeigt: Prozentzahl mit Sternchen, echter Kurschart mit rotem Verlustabschnitt, Zeitraum-Umschalter und zweizeilige Fussnote zu historischen Renditen und Risiko direkt unter dem Chart (Beleg: `home-desktop-03-y1500.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Sticky-Scroll-Sektion ohne Reduced-Motion-Absicherung: fünf nummerierte Schritte laufen an einem stehenden Bild vorbei, 13 `position:sticky`-Regeln, `prefers-reduced-motion` 0× im Site-CSS (Beleg: `home-desktop-05-y3000.png`, `home-desktop-08-y5250.png`; CSS-Zählung §2) | Layering-Familie, `../ui-layouts-catalog.md` | NO-GO | kandidat |
| Deklarierte, nie benutzte Farb-Tokens (Amber, Orange, Trust-Blue) neben dem einen sichtbaren Grün — Token-Set und sichtbares System fallen auseinander (Beleg: CSS-Custom-Properties §2 gegen alle 12 gelesenen Shots) | S25 | NO-GO | kandidat |
