# Case: Elephant Solar (Solar/Wärme, Burgdorf DE)

| Feld | Wert |
|---|---|
| Slug | `elephant-solar` |
| URL | `https://www.elephantsolar.de/` |
| Sektor | `handwerk-local` (Energie-Handwerk, regional Niedersachsen) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture: `references/muster-bibliothek/elephant-solar/shots/` (Manifest:
`shots/manifest.json`, 248 Shots, `--static --mobile --no-interact`).
Der Wrapper `muster-studie.mjs` sweept nur `/`; für die verlangten
Unterseiten lief dasselbe `shot-sweep.mjs` (das Werkzeug, das der Wrapper
spawnt) direkt mit 5 Routen — kein Ad-hoc-Playwright.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `elephant-solar/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `elephant-solar/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` | `elephant-solar/shots/home-desktop-01…12-*.png` (y750, y2250, y3750, y5250, y6750, y7727 gelesen) | ja (Auswahl) |
| Desktop+Mobil `/produkte/solaranlagen` | `produkte__solaranlagen-desktop-00-fold.png`, `-mobile-00-fold.png` | ja |
| Desktop `/ueber-uns` | `ueber-uns-desktop-00-fold.png`, `-04-y2250.png` | ja |
| Desktop+Mobil `/referenzen` | `referenzen-desktop-00-fold.png`, `-03-y1500.png`, `referenzen-mobile-00-fold.png` | ja |
| Desktop `/finanzierung` | `finanzierung-desktop-00-fold.png`, `-02-y750.png` | ja |
| Mobil Scroll-Beispiel | `home-mobile-10-y3798.png` | ja |

Sektionsweise Design-Beschreibung aller 5 Routen (Anordnung, Buttons,
Typo, Farbe, Rhythmus, Mobil): `elephant-solar/sektionen.md`.

Cookie-Banner (Kachel unten rechts, dunkelgrün mit Lime-Button) blieb in
allen Shots stehen — die Buttons matchen den Dismiss-Selektor des Sweeps
nicht. Er dominiert die Folds nicht; Sektionen bleiben lesbar. Notiert,
Shots trotzdem gültig.

Alle 5 Routen lieferten HTTP 200; nichts BLOCKED. Nicht geprüft: `/blog`,
`/anfrage`, Hover-/Klick-Zustände (`--no-interact`).

## 2. Tokens (maschinell, nicht geraten)

Quelle: `elephant-solar.68550e77989ff2ca782e92f3.*.opt.min.css` (Webflow,
CSS-Custom-Properties per curl extrahiert) plus `body{}`/`.heading-style-h1{}`.

| Token | Wert |
|---|---|
| Display-Font | DIN Next Condensed, 700, uppercase (`.heading-style-h1` 4.75rem, lh 1) |
| Body-Font | Inter (Fallback Trebuchet MS), 400, 1rem, lh 1.4 |
| Akzentfarbe | `--brand-contrast: #e6fa00` (Lime) — nur Text-Spans, Labels, einzelne Buttons |
| Markenfarbe | `--brand: #00322f` (`brand-light #034227`) |
| Grundfläche | `#fff` (`--background-primary`), Neutral-Stufen #eee/#ccc/#aaa/#666/#444/#222/#111 |
| Dunkle Fläche | `brand-dark #002422`, Sektions-Verlauf `#225530 → #042422` (`--background-dark` mappt auf `neutral-darker #222`) |
| Spacing-Skala | Client-First-Sektionsklassen aus demselben CSS: `padding-section-xsmall` 2rem, `-large` 6/5/4rem (responsiv), `-section` 11rem oben / 3rem unten, `-cta`/`-legal` 3–4rem; Container `.padding-global` 90 %, max 1280px (1440px ab 1920) |
| Sterne/Rating | `#fec84b`, Off-White auf dunkel `#fefff7` |
| Radii | Familie .4–1rem (Karten ~1rem, Buttons ~.4–.5rem, `100px` nur für Badges/Pill-Marker) |
| Schatten | klein: `0 2px 5px #0003`, `0 1px 1px #2223, 0 4px 8px #2020200d` |
| Schwester-Marke | Elephant Therm: `#2c98db` / Kontrast `#e74b75` (eigene Token-Gruppe im selben System) |

## 3. Sektionen-Inventar

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Topbar Marken-Switcher | — (Kandidat `P-BRAND-BAR`) | Schmale dunkelgrüne Leiste: Begrüßung + Uhrzeit links, Marken Solar/Therm rechts. |
| 2 | Hero | `P-HERO-PHOTO` | Desktop (1440): vollflächiges Video-Standbild eines echten Kunden, Text links, H1 zweizeilig mit Lime-Span, darunter Proof-Zeile (Avatare, „1000+ zufriedene Kunden", 5.0 Google, Ecoflow-Partner). Mobil (390): stattdessen Dach-/Solarmodul-Motiv ohne Person; Proof-Zeile reduziert auf „Mehr als 1000+ zufriedene Kunden" + Sterne + Google-Bildmarke — Avatare und Ecoflow-Logo fehlen im Fold. Abweichung: zweiter heller CTA „Erklärvideo ansehen" im Fold. |
| 3 | Interview-Video | — (Kandidat, Video-Testimonial vollbreit) | Untertiteltes Kunden-Interview als vollbreite Sektion (Lime-Highlight im Untertitel). |
| 4 | Logo-Leiste „Qualitätsmarken" | `P-PROOF-STRIP` | Original-Bildmarken (AIKO, easee, KEBA, Tesla, Buderus, WOLF) als schmale Leiste. |
| 5 | „Deine Vorteile bei uns" | `P-OFFER-PAIR` (Lücke: 3 Karten) | Drei gleich hohe Produktkarten Solaranlage/Wärmepumpe/Wallbox mit echtem Foto oben und Verlaufs-Fläche unten — keine Icon-Card-Soup. |
| 6 | Stats „Zahlen, die überzeugen" | — (Kandidat `P-STATS`) | Vier Lime-Zahlen (2000+/30000+/12000+/500+) mit je einem Belegsatz auf dunkelgrünem Verlauf. |
| 7 | Video-Testimonials „Mach's wie Manfred/Michael/…" | `P-TESTIMONIAL` | Slider mit echten Kunden-Videokarten, Vorname im Lime-Marker-Stil, Pfeil-Navigation. |
| 8 | „Wer wir sind" | `P-TEAM` | Split: echtes Foto von Team am Firmengebäude links, Text plus ein dunkler CTA rechts. |
| 9 | Google-Reviews | `P-TESTIMONIAL` | Sechs Zitatkarten mit echten Namen, Google-G-Bildmarke und „Kund*in auf Google Maps" auf dunkelgrüner Fläche. |
| 10 | Referenz-Grid | `P-GALLERY` | Sechs Anlagen-Fotos mit PLZ-Badge und Datenblock (kWp, Modulzahl, Full-Black, Bauzeit) plus „1000+ weitere ansehen". |
| 11 | Schluss-CTA | `P-CTA-END` | Grüner Verlauf links (Headline + heller CTA), Firmengebäude-Foto rechts. |
| 12 | Footer + Blogkarten | — | Dunkelgrün, Lime-Spaltentitel, 4 Blog-Teaser mit Datum. |

Unterseiten (alle 4 gleich aufgebaut):

| Seite | Muster |
|---|---|
| `/produkte/solaranlagen` | Sub-Hero: dunkelgrünes Verlaufs-Band mit Lime-Breadcrumb + DIN-Condensed-H1; Split Text/Foto; Produktkatalog mit Tab-Leiste (Solarmodule/Wechselrichter/Speicher/Wallbox/Wärmepumpe) und Produktkarte AIKO Neostar 2S+ mit echten Kennzahlen + „Datenblatt"; `P-MAP`: Lime-Niedersachsen-Karte zum 100-km-Radius; `P-CTA-MID`-Verwandter „Bereit für den nächsten Schritt?" (Abweichung: Fläche dunkelgrün statt `surface`, Aktion Lime). |
| `/ueber-uns` | Sub-Hero wie oben; großes Teamfoto am Gebäude; `P-TEAM`-Grid: einheitliche Foto-Serie (alle in Navy-Pullover, gleicher Büro-Hintergrund, Rolle als Label über dem Namen); Google-Reviews wie Startseite. |
| `/referenzen` | Sub-Hero; reines `P-GALLERY`-Grid mit denselben Referenzkarten (PLZ, kWp, Module) über 8000+ px Länge. |
| `/finanzierung` | Sub-Hero; Split-Sektionen („ohne Anzahlung", konkrete 20%-Rate-Aussage); CTA-Band; `P-CTA-END`; Footer. |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Beweis statt Behauptung: echte Kunden-Videos mit Untertiteln, echte
  Google-Zitate mit Namen, Referenzkarten mit kWp/Modulzahl/PLZ — die ganze
  Seite argumentiert mit überprüfbaren Fakten.
- Sehr enge Palette: ein Dunkelgrün-System plus genau ein Lime-Akzent, der
  fast nur Text-Spans, Labels und einzelne Buttons trägt.
- Ein Display-Font (DIN Next Condensed, uppercase) macht jede Headline
  sofort als Marke erkennbar, auf allen 5 Seiten identisch.
- Team-Fotoserie mit einem Stil (Kleidung, Hintergrund, Crop) — S9 par
  excellence.
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  Inter als Body (S7-Konflikt für House-Builds), zweiter heller CTA im
  Hero-Fold, mehrere dunkle Sektionen pro Seite (S3) und CTA-MID auf
  dunkler Fläche statt `surface` (S17).

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Hero Desktop: echtes Kunden-Videostandbild plus vollständige Proof-Zeile (Avatare, 1000+ Kunden, 5.0 Google, Ecoflow-Partner-Logo) direkt im Fold; im 390-Fold nur reduzierte Proof-Zeile (1000+ Kunden, Sterne, Google-Bildmarke) auf Dach-/Modulmotiv ohne Person — Avatare und Partner-Logo entfallen mobil (Beleg: `/` 1440 `home-desktop-00-fold.png`; Gegenprobe 390 `home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Akzentfarbe nur als H1-Wort-Span, Label und Einzel-Button — nie als Fläche; Lime färbt genau ein Wort der Hero-H1 (Beleg: `/` 1440 fold; `/finanzierung` 1440 `finanzierung-desktop-02-y750.png`) | S1-Beleg | GO | kandidat |
| Referenzkarten tragen Messwerte statt Adjektive: PLZ-Badge auf dem Foto, kWp + Modulzahl als Headline, zwei Fakten-Chips (Beleg: `/referenzen` 1440 `referenzen-desktop-03-y1500.png`; `/` 1440 `home-desktop-10-y6750.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Jede Unterseite öffnet mit demselben Sub-Hero-Band: dunkler Marken-Verlauf, Lime-Breadcrumb/Eyebrow, Display-H1, ein Lead-Satz (Beleg: alle 4 Unterseiten-Folds 1440 + `produkte`/`referenzen` 390) | — (Prosa-Kandidat) | GO | kandidat |
| Team-Grid als einheitliche Foto-Serie: gleiche Kleidung, gleicher Hintergrund, Rollen-Label über dem Namen, weiße Namenskarte unter dem Foto (Beleg: `/ueber-uns` 1440 `ueber-uns-desktop-04-y2250.png`) | S9-Beleg | GO | kandidat |
| Stats-Band: vier Zahlen in Akzentfarbe auf dunkler Fläche, jede mit einem konkreten Belegsatz darunter (Beleg: `/` 1440 `home-desktop-04-y2250.png`) | — (Prosa-Kandidat) | GO | kandidat |

Keine S-IDs in diesem Case (Regelbuch endet bei S18). Die Zeilen sind
Prosa-Kandidaten; Deduplizierung, Zähler und die spätere ID-Vergabe nach
Raphael-GO macht die zentrale Sammlung `regel-kandidaten.md`, nicht dieser
Case. `stil-regeln.md` bleibt unangetastet.
