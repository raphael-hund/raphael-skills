# Case: Enpal (Solar, Wärmepumpe & Energiemanager, D2C bundesweit)

| Feld | Wert |
|---|---|
| Slug | `enpal` |
| URL | `https://www.enpal.de/` |
| Sektor | `handwerk-local` (Energie-Handwerk, aber bundesweiter D2C-Marktführer — Dials eher DENSITY-hoch als lokal) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture lag bereits vollständig vor: `references/muster-bibliothek/enpal/shots/`
(Manifest: `shots/manifest.json`, 278 Shots vom 31.08.2026, base
`https://www.enpal.de`, `--static`, 5 Routen: `/`, `/produkt`,
`/erfahrungen`, `/ueber-uns`, `/photovoltaik/solaranlage-kosten`).
Keine neuen Captures in dieser Studie.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `enpal/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `enpal/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` Desktop | `home-desktop-02-y750.png`, `-04-y2250.png`, `-07-y4500.png`, `-10-y6750.png` | ja (Auswahl) |
| Mobil Scroll `/` | `home-mobile-08-y2954.png` | ja |
| Desktop+Mobil `/produkt` | `produkt-desktop-00-fold.png`, `-04-y2250.png`, `-08-y5250.png`, `produkt-mobile-00-fold.png` | ja |
| Desktop+Mobil `/erfahrungen` | `erfahrungen-desktop-00-fold.png`, `-03-y1500.png`, `erfahrungen-mobile-00-fold.png` | ja |
| Desktop+Mobil `/ueber-uns` | `ueber-uns-desktop-00-fold.png`, `-04-y2250.png`, `ueber-uns-mobile-00-fold.png` | ja |
| Desktop+Mobil `/photovoltaik/solaranlage-kosten` | `photovoltaik__solaranlage-kosten-desktop-00-fold.png`, `-12-y8250.png`, `-mobile-00-fold.png` | ja |

Kein Cookie-Banner in den gelesenen Shots. Zusätzlich liegen
Interaktions-Shots vor (`home-desktop-click-y5250-*` — Konfigurator-Quiz
Reihenhaus/Flachdach/Einfamilienhaus, Slider-Pfeile, Language-Chooser);
davon nur die Dateinamen ausgewertet, Bilder nicht einzeln gelesen.
Nicht geprüft: übrige Scroll-Slices, Hover-Zustände, offene FAQ-Akkordeons.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `enpal.66013b8282a94b884c137cfd.6f58bd191.opt.min.css` (Webflow-CDN,
per curl extrahiert, 31.08.2026; Custom Properties + Button-/Body-Regeln).

| Token | Wert |
|---|---|
| Display-Font | Poppins (einzige deklarierte `font-family` im Site-CSS; Headlines 500/600, Navy) |
| Body-Font | Poppins, sans-serif (`body` 14px/20px, `#333`) |
| Akzentfarbe (HEX) | `--enpal-gold: #ffd233` (Buttons, Balken, Magazin-Verlauf); Zweitton `--orange: #ffb000` nur als Logo-Punkt/Detail |
| Grundfläche | `--enpal-white: #fff`, Karten `--enpal-grey / white-smoke: #f8f8f8`, Info-Boxen `--alice-blue: #ebf2ff` |
| Dunkle Fläche | `--midnight-blue / enpal-dark-blue: #072543` (häufigste Farbe im CSS, 68×); Text-Sekundär `--enpal-light-blue: #6a7c8e` |
| Grün (Semantik) | `--enpal-text-green: #76be74` (Checkmarks, Stat-Zahlen, Eyebrows), `--enpal-banner-green: #2dab2a` |
| Spacing-Skala | Buttons `1rem 1.5rem`; rem-Raster (.5/1/1.5rem-Gaps in den Button-/Grid-Regeln) |
| Radii | Familie .75–1rem (Buttons `.875rem`, Karten `1rem`/`.8rem`), `6.25rem` nur für Pill-Marker/Badges |
| Schatten | sparsam: `1px 1px 14px #0000004d`, `0 4px 20px #0003`; Karten meist flächig ohne Schatten |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas (Design: Anordnung, Buttons, Typo, Farbe, Abstände,
Mobil je Sektion aller 5 Routen): `enpal/sektionen.md`.

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Navbar | — | Weiße Leiste, Logo links, 5 Dropdowns als gruppierte Mittel-Pille, Login-Button rechts; identisch auf allen 5 Seiten. |
| 2 | Hero | `P-HERO-PHOTO` (Abweichung: 3D-Render statt Foto, Text zentriert statt links) | Vollflächiges Haus-Render mit allen Produkten im Bild (Module, Speicher, Wallbox, Wärmepumpe), zentrierte weiße H1 „Solaranlage & Wärmepumpe", genau ein gelber CTA „Jetzt Ersparnis berechnen", unten dunkle Chip-Leiste mit 3 Checkmark-Benefits (0 € Anzahlung / Einfach Geld sparen / Endlich unabhängig) und CHIP-Testsieger-Siegel unten links; Mobil (390): dunkles Produkt-Render, Benefits als linksbündige Checkliste, CHIP-Siegel, vollbreiter gelber CTA. |
| 3 | Enpal.One+-Karte | — (Kandidat: Produkt-Teaser-Karte) | Silbergraue Verlaufs-Karte, weiße Headline „Deutschlands günstigster Stromtarif", Produktfoto rechts, ein gelber CTA (`home-desktop-02-y750.png`). |
| 4 | Produkt-Bänder Solar + Wärmepumpe | — (Kandidat: dunkle Produktbühne; S3-Spannung: zwei dunkle Bänder in Folge) | Zwei abgerundete dunkle Foto-Bühnen (Studio-Renders der Hardware), je Eyebrow + H2 („Nie wieder hohe Stromkosten" / „Tschüss Öl und Gas!"), konkreter Preis „Ab 7.999 €", ein gelber CTA, echtes Testsieger-Siegel (homeandsmart 92/100) (`home-desktop-04-y2250.png`). |
| 5 | Presse-Leiste | `P-PROOF-STRIP` | „Enpal ist bekannt aus Presse & TV" mit Original-Wortmarken (ZEIT, SZ, Tagesspiegel, Handelsblatt, Gründerszene, ntv, Focus) auf `#f8f8f8`. |
| 6 | „Energie endlich günstig" 3er-Beweis | `P-PROCESS-3`-nah (kein Prozess: 3 Belege) | Drei echte Fotos (Monteur-Team, Kundenpaar mit Hund, Monteur mit Modul) mit grünem Check + je einem überprüfbaren Claim (Regional & persönlich / 5-in-1 Komplettpaket / In 6 Wochen fertig) (`home-desktop-07-y4500.png`, mobil `home-mobile-08-y2954.png`). |
| 7 | Erfolgsgeschichten-Slider | `P-TESTIMONIAL` | Karten-Slider mit echten Kunden-Selfies vor ihren Häusern, Regions-Badge (Berlin, Bremerhaven, Hessen …), Pfeil-Navigation. |
| 8 | Konfigurator „Ihr Haus, Ihr Komplettpaket" | `P-CONTACT`-nah (Quiz-Funnel, Mikro-Commitments zuerst) | Schrittweises Bild-Quiz (Einfamilienhaus/Reihenhaus/Flachdach, Verbrauchsprofil, Zurück-Button) statt Formular — belegt über die Click-Serie `home-desktop-click-y5250-01…08-*.png`. |
| 9 | Auszeichnungen | `P-PROOF-STRIP` | „Vielfach ausgezeichnet": CHIP Testsieger 2025, Solar-Marktführer 2024, TÜV Saarland „Gut (2,1)", Wärmepumpen-Marktführer 2024, VDE-Zertifizierung — alle als echte Siegel-Bildmarken mit Jahr (`home-desktop-10-y6750.png`). |
| 10 | Community-Karte + Trustpilot | `P-TESTIMONIAL` + `P-MAP`-Variante | Deutschland als grüne Punktwolke mit echten Kundenfotos in Kreis-Ausschnitten, daneben Trustpilot-Karte mit echter Zahl „4.2 von 5, basierend auf 29.580 Bewertungen" und Klarname (`home-desktop-10-y6750.png`). |
| 11 | FAQ | `P-FAQ` | „Sie haben Fragen?" links, Akkordeon rechts mit echten Produktfragen. |
| 12 | Footer | — | Navy, Language-Chooser (Click-Shot `home-desktop-click-y8722-00-Choose_language.png`). |

Unterseiten:

| Seite | Muster |
|---|---|
| `/produkt` | Dunkler Produkt-Hero (`#072543`-Bühne mit goldenem Licht-Swirl um Modul, Wärmepumpe, Speicher, App), H1 „Die Enpal Energielösung", Lead, Doppel-CTA (Outline „Mehr erfahren" + gelb „Ersparnis berechnen"); danach je Produkt ein Split: Foto/Render links, rechts 3 gestapelte `#f8f8f8`-Karten mit grünem Line-Icon + je einem messbaren Claim („Bis zu 80 % staatliche Förderung", „Bis zu 45 % günstiger heizen", „4x günstiger als Benzin") (`produkt-desktop-04-y2250.png`); „Der Enpal Service" gleiches Muster mit echtem Einsatz-Foto (Transporter vor Kundenhaus); Abschluss: dunkle Enpal.One+-Karte neben Checklisten-Karte mit gelbem CTA (`produkt-desktop-08-y5250.png`). Mobil-Fold: Checkliste + CHIP-Siegel + vollbreiter gelber CTA wie Home. |
| `/erfahrungen` | Editorial-Stapel auf Weiß: zentrierte Navy-H1 „Enpal Erfahrungen" + hellblaue Subline, dann eine lange Serie echter Kunden-Videos (Video-Standbilder mit gelben Untertitel-Boxen im Marken-Stil) — unter jedem Video ein Absatz mit Klarnamen und Ort („Stefan aus Soltendieck", „Christine und Jurek aus Sachsenheim", „Carina und Marco") und konkreten Anlagen-Details (52 Solarmodule) (`erfahrungen-desktop-00-fold.png`, `-03-y1500.png`, mobil `erfahrungen-mobile-00-fold.png`). |
| `/ueber-uns` | Zentrierte H1 + Subline; Split Foto (echter Monteur mit Modul) / `#f8f8f8`-Textkarte; Stat-Karten mit grünen Zahlen „#1 Marktführer Solaranlagen / 140.000+ Kunden / #1 Wärmepumpen" (`ueber-uns-desktop-00-fold.png`); danach alternierende Karten-Splits mit grünem Eyebrow („Für die Technologie der Zukunft" …) zu Akademie, Entwicklungszentren, Supply Chain, Handwerks-Plattform — jede mit echtem Mitarbeiter-Foto und Textlink (`ueber-uns-desktop-04-y2250.png`). |
| `/photovoltaik/solaranlage-kosten` | Magazin-Template: Breadcrumb, linksbündige H1 „Solaranlage Kosten: Was kostet eine PV-Anlage in 2026?", Autor mit Foto + „Aktualisiert: 28.07.2026" + Lesezeit, gelbe Verlaufs-Grafik „Enpal Magazin" rechts, hellblaue Box „Das Wichtigste in Kürze" mit Fakten-Bullets (15.000–25.000 €, 12–15 Jahre Amortisation), aufklappbares Inhaltsverzeichnis (`…-desktop-00-fold.png`); im Artikel eine eigene Daten-Analyse als durchsuchbare Bundesland-Tabelle mit gelben Inline-Balken (kWp-Werte), Social-Share-Icons, rechts unten schwebendes Google-Widget „4,2 basierend auf 13.256 Rezensionen" + gelber CTA „Ersparnis berechnen" (`…-desktop-12-y8250.png`); mobil schwebender gelber TOC-Button (`…-mobile-00-fold.png`). |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Beweisdichte ohne Fakes: echte Siegel-Bildmarken mit Jahr und Quelle
  (CHIP 2025, TÜV „Gut 2,1", VDE, homeandsmart 92/100), Trustpilot und
  Google mit echten krummen Zahlen (4,2 / 29.580 bzw. 13.256) statt
  selbstgebauter Sterne.
- Strenges Zwei-Farben-System: Navy `#072543` trägt Text und dunkle
  Bühnen, Gold `#ffd233` ist der einzige Aktions-Akzent — jeder CTA der
  fünf Seiten ist dieselbe gelbe Ecken-gerundete Taste mit Pfeil und fast
  immer demselben Wortlaut „(Jetzt) Ersparnis berechnen".
- Echte Menschen als Rückgrat: Kunden-Selfies mit Regions-Badge,
  Video-Testimonials mit Klarnamen + Ort + Anlagen-Daten, Monteur- und
  Mitarbeiter-Fotos statt Stock.
- Jede Unterseite hat einen eigenen Job und ein eigenes Template:
  Produkt = dunkle Bühne + Benefit-Stapel, Erfahrungen = Video-Editorial,
  Über uns = Fakten-Karten, Magazin = Autoren-Artikel mit eigener
  Datenanalyse — Wiedererkennung über Nav, Farben, CTA.
- Statt Kontaktformular ein Bild-Quiz-Funnel (Haustyp → Verbrauch) mit
  Mikro-Commitments zuerst — G1-konform.
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  Hero und Produkt-Bühnen sind 3D-Renders statt Fotos (S9-Spannung; die
  Menschen-Sektionen sind aber echt), zwei dunkle Bänder in Folge plus
  dunkler Produkt-Hero (S3), Benefit-Stapel aus 3 Icon-Karten je Produkt
  (S14-Nähe, aber jede Karte trägt eine messbare Zahl), Poppins steht auf
  der S8-Sperrliste, Doppel-CTA im Produkt-Hero.

## 5. Regel-Kandidaten

Kein neuer S-ID-Eintrag hier — das Regelbuch endet bei S18; neue Muster
stehen als Prosa-Kandidaten, die Synthese pflegt `regel-kandidaten.md`.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Ein einziger Funnel-CTA sitewide: dieselbe gelbe Taste mit demselben Wortlaut „(Jetzt) Ersparnis berechnen" im Home-Hero, in beiden Produkt-Bändern, im Produkt-Hero und als schwebendes Widget im Magazin-Artikel — nie ein konkurrierender „Kontakt"-CTA (Beleg: `/` 1440 `home-desktop-00-fold.png` + `home-desktop-04-y2250.png`; `/produkt` 1440 `produkt-desktop-00-fold.png`; `/photovoltaik/solaranlage-kosten` 1440 `…-desktop-12-y8250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Benefit-Chips im Hero-Fold beider Viewports: genau 3 Checkmark-Claims („0 € Anzahlung / Einfach Geld sparen / Endlich unabhängig"), desktop als dunkle Chip-Leiste am Fold-Boden, mobil als linksbündige Checkliste über dem CTA (Beleg: `/` 1440 `home-desktop-00-fold.png`; `/` 390 `home-mobile-00-fold.png`; identisches Muster `/produkt` 390 `produkt-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Trust nur mit Quelle, Jahr und krummer Zahl: CHIP-Siegel bereits im Fold, Auszeichnungs-Leiste mit 5 echten Siegel-Bildmarken, Trustpilot „4.2 von 5, 29.580 Bewertungen", Google „4,2, 13.256 Rezensionen" — nirgends selbstgebaute Sterne (Beleg: `/` 1440 `home-desktop-00-fold.png` + `home-desktop-10-y6750.png`; `/photovoltaik/solaranlage-kosten` 1440 `…-desktop-12-y8250.png`) | S9-N-Beleg (Positivseite) | GO | kandidat |
| Magazin-Artikel als Beweisstück statt SEO-Füller: Autor mit Foto, „Aktualisiert"-Datum, Lesezeit, „Das Wichtigste in Kürze"-Box mit konkreten Zahlen und eine eigene Datenanalyse als durchsuchbare Tabelle mit Akzent-Inline-Balken (Bundesland/kWp) (Beleg: `/photovoltaik/solaranlage-kosten` 1440 `…-desktop-00-fold.png` + `…-desktop-12-y8250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Testimonial-Videos tragen die Marken-Typo im Bild: gelbe Untertitel-Boxen mit Navy-Text im Video-Standbild machen jede Kundenstory sofort als Enpal erkennbar; darunter Klarname + Ort + Anlagen-Fakten (Beleg: `/erfahrungen` 1440 `erfahrungen-desktop-00-fold.png` + `erfahrungen-desktop-03-y1500.png`; 390 `erfahrungen-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
