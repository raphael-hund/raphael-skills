# Case: Matthias Aumann / Mission Mittelstand (Unternehmertraining für Handwerk & Mittelstand)

| Feld | Wert |
|---|---|
| Slug | `matthias-aumann` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://www.matthias-aumann.de/` — Abruf 02.09.2026 (Shot-Sweep 17:44–17:50 UTC) |
| Evidence | `matthias-aumann/shots/` (Desktop 1440, 23 Shots) und `matthias-aumann/shots-mobile/` (Desktop+Mobil 390, 59 Shots); gelesene Pfade in §1 |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (Unternehmer-Coaching/Training; Zielgruppe laut Hero-Eyebrow Geschäftsführer aus Handwerk & Mittelstand, `shots/home-desktop-00-fold.png`) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Offene Entscheidung „Wie trägt eine Ein-Ziel-Landingpage ohne Navigation über 11.000 px Länge?" — dieser Case zeigt eine Seite mit genau einem CTA-Wortlaut, ohne Menü, mit Serif-Display-Typo und einem einzigen Grün-Akzent. |
| Do-not-copy | Wortmarken „MISSION MITTELSTAND" und „MA MATTHIAS AUMANN", alle Personenfotos (Matthias Aumann, Berater, Kundenporträts, Team-Panorama, Video-Standbilder), alle Kundenzitate mit Klarnamen und Firmen, die vorher/heute-Umsatzzahlen und die Zahlen 5.500 / 50+ / 700+ / 25+. Übernommen wird ausschliesslich die Struktur- und Layout-Logik. |
| Lizenz / Provenance | `ungeklärt` — Urheber der Fotos und Videos nicht ausgewiesen, keine Lizenzangabe auf der Seite. Screenshots liegen ausschliesslich intern als Studie in diesem Ordner; keine Weiterverwendung von Bild-, Text- oder Markenmaterial. Case bleibt deshalb `kandidat`. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

Die Belegschwelle ist erfüllt: Quelle, Auswahlgrund, Do-not-copy,
Lizenz/Provenance, Status und die Website-Belege sind gefüllt und die in §1 mit
„ja" markierten Shots sind gelesen. Der Status bleibt `kandidat`, weil
Lizenz/Provenance `ungeklärt` ist und Raphaels Begründungssatz zum Stamp noch
fehlt; ein Agent setzt hier keinen Stil-Default.

## 1. Capture

**Befehl (Pflicht-Viewports, Exit 0):**

```bash
cd /root/raphael-skills/skills/eigene/web
node scripts/muster-studie.mjs --url https://www.matthias-aumann.de/ --slug matthias-aumann
node scripts/shot-sweep.mjs --base https://www.matthias-aumann.de/ \
  --out references/muster-bibliothek/matthias-aumann/shots-mobile \
  --routes / --mobile --static
```

Der zweite Lauf war nötig, weil `muster-studie.mjs` `shot-sweep` ohne `--mobile`
spawnt und der Pflicht-Viewport `390×844` sonst fehlt. Beide Läufe endeten mit
Exit 0; beide meldeten `NAV-ERR … Timeout 45000ms` auf `networkidle` und fielen
per `NAV-FALLBACK` auf `domcontentloaded` zurück, Status danach `200`.
Route: nur `/` — die Seite führt in keinem gelesenen Shot eine Navigation, es
gibt keine zweite Route im Budget. Keine `/small/`-JPGs vorhanden, daher PNGs
gelesen. Kein Cookie-Banner in den gelesenen Shots.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `matthias-aumann/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `matthias-aumann/shots-mobile/home-mobile-00-fold.png` | ja |
| Scroll-Serie Desktop | `shots/home-desktop-02-y750.png`, `-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`, `-10-y6750.png`, `-11-y7500.png`, `-12-y8250.png`, `-13-y9000.png`, `-15-y10500.png`, `-16-y11250.png`, `-17-y11335.png` | ja |
| Scroll-Serie Mobil | `shots-mobile/home-mobile-04-y1266.png`, `home-mobile-08-y2954.png` | ja |
| Interaktions-Shots | `shots/home-desktop-click-y0-00-video_starten.png`, `shots/home-desktop-click-y10500-00-…`, `shots/home-desktop-click-y11250-00…02-…`, `shots-mobile/home-mobile-click-y10550-*`, `-y10972-*` | nein (nur Dateinamen ausgewertet) |

Gelesen: 14 Shots (Budget 12 für die Startseiten-Serie, plus die zwei Folds).
Nicht geprüft: übrige Scroll-Slices, Hover- und Öffnungs-Zustände, der
Trust-Bildmarken-Streifen unter „Es ist deine Entscheidung" (in
`home-desktop-10-y6750.png` nur angeschnitten).

## 2. Tokens (maschinell, nicht geraten)

Quelle der Werte: `mm-stage.shared.321eba1ed.min.css` (Webflow-CDN
`cdn.prod.website-files.com/60409487e249e4142ca8942a/css/…`, per curl abgerufen
02.09.2026). Ausgelesen wurden die Custom-Property-Blöcke der auf dieser Seite
gesetzten Klassen `.body-new`, `.home_section_header`,
`.home_section_testimonial-vision` sowie die `@font-face`-Regeln. Die Datei ist
ein geteiltes Multi-Site-Stylesheet — Werte aus anderen Token-Sets sind hier
nicht übernommen.

| Token | Wert |
|---|---|
| Display-Font | `Ivarheadline, Arial, sans-serif` (`--_typography---font-styles--heading`); `@font-face` lädt `IvarHeadline-Regular.otf` (400) und `IvarHeadline-MediumItalic.otf` (500 italic) |
| Body-Font | `Suisseintl, Arial, sans-serif` (`--_typography---font-styles--body`); `@font-face` `SuisseIntl-Regular.woff2` (400). Zusätzlich lädt die Seite per `WebFont.load` `Lato` und `Cinzel` sowie den Typekit-Kit `yez0rkg` — in den gelesenen Shots nicht sichtbar zugeordnet |
| Akzentfarbe (HEX) | `#009460` (`--_color-schemes---leadmagnet--accent`, identisch `--…--button-color` und `--…--button-color-secondary`); Abstufungen nur als `color-mix(… 75%/50%/25%, transparent)` |
| Grundfläche | `#efefef` (`--_color-schemes---leadmagnet--background`) |
| Dunkle Fläche | `#071c1f` (`--_color-schemes---leadmagnet--background-dark-green`, zugleich `--…--text` und `--…--text-bold`) |
| Weitere Fläche | `#d9d9d2` (`--_color-schemes---leadmagnet--foreground`, das beige Band) |
| Spacing-Skala | Eine durchgehende Clamp-Leiter: `tiny .25→.3rem`, `xxsmall .5→.6`, `xsmall 1→1.2`, `small 1.5→1.8`, `medium 2→2.4`, `large 3→3.6`, `xlarge 4→4.8`, `xxlarge 5→6`, `huge 6→7.2`, `xhuge 7→8.4`, `xxhuge 10→12rem`; Sektionspolster `padding-section--small/medium/large` = `large` / `clamp(3.5rem,6vw,6rem)` / `clamp(5.5rem,10vw,10rem)`; Container `large 82rem`, `medium 78rem` |
| Radii | `--_ui-styles---radius--small: .5rem`, `--medium: 1rem`, `--large: 1.5rem` (Pillen laufen über die Elementhöhe, kein eigenes Round-Token in diesem Block) |
| Schatten | sparsam und nur an drei Bauteilen: Lösungs-Bildkarte `3px 4px 20px 4px #0003, 0 8px 9px #0003` (`.home_solution_item-top`), CTA-Trenner `0 10px 8px #0003` (`.home_cta_divider`), Hero-Video-Wrap `0 -5px 21px 6px` in `--…--text-bold` (`.home_header_video-wrap`) |
| Typo-Stufen | H1 `clamp(2.75rem, 1.143rem + 4.286vw, 3.5rem)`, H2 `clamp(2.25rem, 1.036rem + 3.571vw, 3rem)`, H3 `clamp(2rem, .929rem + 2.857vw, 2.5rem)`; Body `clamp(1rem, 1vw, 1.125rem)`, small `.85rem`, tiny `.75rem`; negatives Kerning je Stufe (`h1 -.16rem`, `h2 -.12rem`, `h3 -.125rem`) |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas (Anordnung, Farbe, Typo, Aktion, Mobil je Sektion):
`matthias-aumann/sektionen.md`.

Startseite `/`, Reihenfolge von oben. Es gibt keine Unterseite im Capture.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Weisse Vollbreiten-Leiste mit ausschliesslich der zentrierten Wortmarke, ohne Links und ohne CTA, in jedem gelesenen Scroll-Shot identisch oben (`shots/home-desktop-00-fold.png`, `-08-y5250.png`, `-16-y11250.png`). |
| 2 | Hero | Stack | `P-HERO-TYPO`-nah | Zentrierter Stapel auf Himmel-Foto mit Verlauf ins Dunkelgrün: Outline-Pill-Eyebrow, zweizeilige Serif-H1, schmaler Fliesstext, genau ein grüner CTA mit Kreis-Pfeil, darunter 5 überlappende Kundenporträts plus Kleintext (`shots/home-desktop-00-fold.png`; mobil vierzeilige H1 und vollbreiter CTA, `shots-mobile/home-mobile-00-fold.png`). |
| 3 | Video-Karte | Layering | — (Kandidat: überlappende Medien-Karte) | Abgerundete Karte mit Polaroid-Collage echter Kundenfotos und grünem Play-Knopf, die aus dem Hero in die dunkle Folgesektion hineinragt (`shots/home-desktop-00-fold.png`, `shots/home-desktop-02-y750.png`). |
| 4 | Drei-Check-Leiste | Band | `P-PROOF-STRIP`-nah | Eine Zeile mit drei Häkchen-Claims auf Dunkelgrün, ohne Karten und ohne Icons ausser dem Häkchen (`shots/home-desktop-02-y750.png`). |
| 5 | Referenz-Slider vorher/heute | Band | `P-TESTIMONIAL` | Randlos angeschnittener Karten-Slider mit 7 sichtbaren Kundenkarten, je Klarname + Firma + Porträtfoto und zwei beschrifteten Balken „vorher"/„Heute" mit Euro-Beträgen, deren Längenunterschied die Aussage trägt; darüber 5 grüne Sterne mit Bewertungszahl (`shots/home-desktop-02-y750.png`, mobil `shots-mobile/home-mobile-04-y1266.png`). |
| 6 | Problem-Sektion | Layering | `P-PROBLEM`-nah | Zentrierte Serif-Frage-H2 über einem grossflächigen dunklen Foto, darauf ein 2×2-Raster halbtransparenter Karten mit Line-Icon + Serif-H3 + Absatz, Abschluss mit demselben grünen CTA; die Sektion endet in einer grossen unteren Rundung (`shots/home-desktop-02-y750.png`, `shots/home-desktop-04-y2250.png`; mobil einspaltig, `shots-mobile/home-mobile-04-y1266.png`). |
| 7 | Lösungs-Stapel | Stack | `P-BENEFIT` + `P-TESTIMONIAL` verschränkt | Vier identisch gebaute Einheiten untereinander: grosse Bildkarte mit grüner Kategorie-Pille oben links und weisser Serif-Aussage im Bildfuss, direkt darunter ein kursives Kundenzitat mit rechtsbündigem Klarnamen, Firma und Porträt (`shots/home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`; mobil `shots-mobile/home-mobile-08-y2954.png`). |
| 8 | Kurzvideo-Wand | Layering | `P-TESTIMONIAL` | Zwei-Ton-Serif-H2 über einem Fächer aus fünf überlappenden, leicht gedrehten Hochkant-Video-Standbildern echter Handwerker, das mittlere aufrecht vorn mit grünem Play-Knopf (`shots/home-desktop-08-y5250.png`). |
| 9 | CTA-Zwischenband | Band | `P-CTA-MID` | Beiges Band mit ausschliesslich dem grünen CTA und der 5-Porträt-Reihe samt identischem Kleintext wie im Hero (`shots/home-desktop-10-y6750.png`). |
| 10 | Team-Panorama | Band | `P-TEAM` | Randloses Gruppenfoto der gesamten Belegschaft über zwei Etagen im eigenen Headquarter, grün überstrahlt, nach unten in Weiss ausblendend, ohne Text im Bild (`shots/home-desktop-10-y6750.png`, `-11-y7500.png`). |
| 11 | „Es ist deine Entscheidung" | Stack | `P-CTA-MID` | Zentrierte Serif-H2, schmaler Fliesstext, grüner CTA; darunter beginnt ein Streifen Trust-Bildmarken, der im gelesenen Shot nur angeschnitten ist (`shots/home-desktop-10-y6750.png`). |
| 12 | Angebots-Splits | Split | `P-BENEFIT` | Auf Dunkelgrün alternierende Zwei-Spalten-Karten (Foto ~50 % / hellgraue Textfläche ~50 % unter gemeinsamer Aussenrundung), Textseite je mit Outline-Pill-Eyebrow, Serif-H3, Fliesstext mit Fettungen und demselben grünen CTA (`shots/home-desktop-12-y8250.png`, `-13-y9000.png`). |
| 13 | Netzwerk-Split | Split | `P-BENEFIT` | Dasselbe Split-Bauteil wie 12, Foto links, Serif-H3 mit Zahl, Fliesstext mit Fettungen, grüner CTA (`shots/home-desktop-15-y10500.png`). |
| 14 | Abschluss-CTA | Layering | `P-CTA-END` | Dunkelgrün überlagertes Foto der eigenen Büroflächen als Hintergrund, darauf zentriert zweizeilige Serif-H2, zwei Zeilen Fliesstext, der grüne CTA und erneut die 5-Porträt-Reihe (`shots/home-desktop-15-y10500.png`, `-16-y11250.png`). |
| 15 | FAQ | Akkordeon | `P-FAQ` | Fünf geschlossene Zeilen auf Dunkelgrün, je grünes Chevron links, Frage in Serif und dünne Trennlinie unten — keine Karten, kein Rahmen (`shots/home-desktop-16-y11250.png`; Öffnung belegt über `shots/home-desktop-click-y11250-*.png`). |
| 16 | Footer | Band | — | Fast schwarzes Band, links zwei durch eine senkrechte Linie getrennte Wortmarken, darunter Trennlinie und eine Zeile Copyright links / vier Rechts- und Cookie-Links rechts; keine Sitemap-Spalten, kein Newsletter, kein Social-Block (`shots/home-desktop-17-y11335.png`). |

## 4. Raphael-Urteil

**Verdikt: GO** — Stamp `GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)`.
Raphael hat die URL auf die Liste gesetzt; der eigene Begründungssatz fehlt noch.
Die Stichpunkte unten sind Agenten-Struktur am Shot, kein erfundenes Urteil.

**Essenz (3 Sätze, am Shot belegt).** Die Seite fährt über 11.335 px genau einen
Aktionswortlaut in genau einer grünen Taste und wiederholt ihn in sechs
Sektionen, ohne dass je ein zweiter, konkurrierender CTA erscheint (`shots/home-desktop-00-fold.png`,
`-04-y2250.png`, `-10-y6750.png`, `-12-y8250.png`, `-15-y10500.png`,
`-16-y11250.png`). Der Beweis läuft nicht über Behauptungen, sondern über ein
einziges Bauteil, das man ansieht statt liest: die vorher/heute-Karte mit zwei
verschieden langen Balken und zwei Euro-Beträgen unter einem echten Porträt und
Firmennamen (`shots/home-desktop-02-y750.png`). Und die Marke trägt sich allein
über eine Display-Serif in Dunkelgrün-Schwarz gegen ein einziges Grün — es gibt
kein Menü, keine zweite Akzentfarbe und keine Icon-Kartenreihe als Ersatz für
Inhalt (`shots/home-desktop-00-fold.png`, `shots/home-desktop-16-y11250.png`).

Weitere Stichpunkte:

- Kein Navigationsmenü: die Leiste trägt nur die Wortmarke, es gibt keinen Weg
  aus der Seite heraus ausser dem CTA (`shots/home-desktop-00-fold.png`,
  `-08-y5250.png`, `-16-y11250.png`).
- Echte Menschen tragen jede Beweis-Sektion: Kundenporträts im Slider,
  Firmen-Gruppenfoto vor der eigenen Halle, Selfie-Videos von Handwerkern,
  Team-Panorama der Belegschaft — kein Stock-Motiv in den gelesenen Shots
  (`shots/home-desktop-02-y750.png`, `-06-y3750.png`, `-08-y5250.png`,
  `-10-y6750.png`).
- Jedes Lösungsversprechen ist unmittelbar an ein Kundenzitat mit Klarnamen und
  Firma gekoppelt; Aussage und Beleg stehen im selben Bauteil statt in getrennten
  Sektionen (`shots/home-desktop-06-y3750.png`, `-08-y5250.png`).
- Mobil kommt ein sticky CTA am unteren Rand dazu, den es auf Desktop in keinem
  gelesenen Shot gibt; er überdeckt sichtbar Inhalt darunter
  (`shots-mobile/home-mobile-04-y1266.png`, `home-mobile-08-y2954.png`).
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override): weit mehr
  als eine dunkle Sektion pro Seite — Hero-Auslauf, Problem-Sektion,
  Angebots-Splits, Abschluss-CTA, FAQ und Footer sind alle dunkelgrün bis
  schwarz (S3, Beleg `-02-y750`, `-04-y2250`, `-12-y8250`, `-16-y11250`,
  `-17-y11335`); die Sternereihe über dem Slider ist eine gezeichnete
  Sterne-Grafik ohne Plattform-Bildmarke und ohne Quellenlink im gelesenen Shot
  (S9-N-Spannung, `-02-y750`); das 2×2-Problem-Raster ist ein Icon-Karten-Raster
  im Sinn von S14 (`-04-y2250`), trägt aber je Karte einen eigenen Textinhalt
  statt eines Schlagworts; die Layering-Sektionen (3, 6, 8, 14) verlangen nach
  `ui-layouts-catalog.md` einen Reduced-Motion-Beleg, der aus einem Shot-Sweep
  nicht ableitbar ist.

## 5. Regel-Kandidaten

Jede Beobachtung bleibt Kandidat. Eintrag in `stil-regeln.md` erst nach
Raphaels Begründungssatz und geklärter Provenance; die Synthese pflegt
`regel-kandidaten.md`.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Ein einziger Aktions-Wortlaut in einer einzigen grünen Taste über die ganze Seite, sechsmal wiederholt, nie ein zweiter oder sekundärer CTA daneben (Beleg: `shots/home-desktop-00-fold.png`, `-04-y2250.png`, `-10-y6750.png`, `-12-y8250.png`, `-15-y10500.png`, `-16-y11250.png`) | S17-Beleg (Positivseite), S1-nah | GO | kandidat |
| Referenz als messbares Bauteil statt als Zitatkarte: Porträt + Klarname + Firma + zwei beschriftete Balken „vorher"/„Heute" mit Euro-Beträgen, deren Längenunterschied die Aussage visuell trägt (Beleg: `shots/home-desktop-02-y750.png`; mobil `shots-mobile/home-mobile-04-y1266.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Versprechen und Beleg im selben Bauteil: Bildkarte mit Kategorie-Pille und Aussage, direkt darunter ohne Sektionswechsel das kursive Kundenzitat mit Klarname, Firma und Porträt — viermal identisch gebaut (Beleg: `shots/home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`) | S2-nah (Karte trägt echten Vergleich) | GO | kandidat |
| Landingpage ohne Navigation: die fixierte Leiste trägt nur die Wortmarke, kein Menü, kein Login, kein Leisten-CTA — der einzige Ausgang ist der Funnel-CTA (Beleg: `shots/home-desktop-00-fold.png`, `-08-y5250.png`, `-16-y11250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Display-Serif (Ivar Headline) trägt jede H1/H2/H3 gegen eine reine Sans (Suisse Int'l) im Fliesstext, mit negativem Kerning je Stufe; die Marke entsteht ohne zweite Akzentfarbe (Beleg: `shots/home-desktop-00-fold.png`, `-12-y8250.png`, `-16-y11250.png`; Tokens §2) | S8-nah (keine gesperrte Font im Einsatz), S23-Prüfung offen | GO | kandidat |
| Mobiler Sticky-CTA am unteren Rand ab Verlassen des Folds, den es auf Desktop nicht gibt — er überdeckt sichtbar Inhalt darunter, was gegen ihn spricht (Beleg: `shots-mobile/home-mobile-04-y1266.png`, `home-mobile-08-y2954.png`; Desktop-Gegenprobe `shots/home-desktop-04-y2250.png`) | — (Prosa-Kandidat) | gemischt | kandidat |
| Selfie-Video-Fächer statt Testimonial-Slider: fünf überlappende, leicht gedrehte Hochkant-Standbilder echter Handwerker, nur das mittlere aufrecht mit Play-Knopf (Beleg: `shots/home-desktop-08-y5250.png`) | S9-Beleg (Positivseite) | GO | kandidat |
| Gezeichnete Sternereihe mit Bewertungszahl ohne Plattform-Bildmarke und ohne Quellenlink im gelesenen Shot — als Muster nicht übernehmen (Beleg: `shots/home-desktop-02-y750.png`) | S9-N | NO-GO | kandidat |
| Sechs dunkelgrüne bis schwarze Sektionen auf einer Seite (Hero-Auslauf, Problem, Angebots-Splits, Abschluss-CTA, FAQ, Footer) — trägt hier, widerspricht aber der Ein-dunkle-Sektion-Grenze (Beleg: `shots/home-desktop-02-y750.png`, `-04-y2250.png`, `-12-y8250.png`, `-16-y11250.png`, `-17-y11335.png`) | S3 | gemischt | kandidat |
