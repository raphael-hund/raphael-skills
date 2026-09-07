# Case: Schmidt & Co / farisschmidt.de (Webdesign-Agentur, B2B)

| Feld | Wert |
|---|---|
| Slug | `farisschmidt` |
| URL | `https://www.farisschmidt.de/` |
| Sektor | `b2b-dienst` (Agentur-Eigenauftritt, verkauft Websites an B2B) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture: `references/muster-bibliothek/farisschmidt/shots/` (Manifest:
`shots/manifest.json`, 105 Shots, `--static --mobile --no-interact`).
Der Wrapper `muster-studie.mjs` sweept nur `/`; für die verlangten
Unterseiten lief dasselbe `shot-sweep.mjs` (das Werkzeug, das der Wrapper
spawnt) direkt mit 5 Routen — kein Ad-hoc-Playwright.

Seitenwahl-Hinweis: Die Hauptnavigation besteht aus Ankern auf `/`
(#leistungen-details, #projekte, #prozess) — echte Unterseiten laut
`sitemap.xml` sind `/termin`, `/empfehlungsprogramm` und die
`/projekte/*`-Case-Seiten. Genommen: `/termin`, `/empfehlungsprogramm`,
`/projekte/jantronic`, `/projekte/mk-boersenhandel`.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `farisschmidt/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `farisschmidt/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` Desktop | `home-desktop-02…17-*.png` (y750, y1500, y2250, y3000, y4500, y6000, y7500, y8250, y9750, y11250, y11920 gelesen) | ja (Auswahl) |
| Mobil Scroll `/` | `home-mobile-05-y1688.png` | ja |
| Desktop+Mobil `/termin` | `termin-desktop-00-fold.png`, `termin-mobile-*` | ja (Desktop) |
| Desktop `/empfehlungsprogramm` | `empfehlungsprogramm-desktop-00-fold.png`, `-02-y750.png` | ja |
| Desktop `/projekte/jantronic` | `projekte__jantronic-desktop-00-fold.png`, `-03-y1500.png`, `-05-y3000.png` | ja |
| Desktop+Mobil `/projekte/mk-boersenhandel` | `projekte__mk-boersenhandel-desktop-00-fold.png`, `-mobile-00-fold.png` | ja |

Cookie-Banner (weiße Karte unten links, „Kurz gefragt: … Klar, passt /
Nur Notwendiges") steht in allen Shots — die Button-Texte matchen den
Dismiss-Selektor des Sweeps nicht („Okay"/„Akzeptieren"). Er dominiert
die Folds nicht; alle Sektionen bleiben lesbar. Notiert, Shots gültig.

Alle 5 Routen lieferten HTTP 200; nichts BLOCKED. Nicht geprüft:
`/check`, `/webflow-kurs`, `/ressourcen/*`, Hover-/Klick-Zustände
(`--no-interact`), offene FAQ-Akkordeons.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `schmidt-co.webflow.shared.e04bf2a8a.css` (Webflow-CDN, Custom
Properties per Python-Extrakt, 31.08.2026).

| Token | Wert |
|---|---|
| Display-Font | Instrument Serif (`--_design-tokens---fonts--heading: Instrumentserif, Arial`), h1 4rem, 400, ls −.05em — als kursiver Akzent in sonst groteskem H1-Satz |
| Body-Font | Helvetica Neue (`--_design-tokens---fonts--body: Helveticaneue, Arial`), 16px |
| Akzentfarbe | `--accent_primary: #424bee` (Blau-Violett), Sekundär `--secondary-accent: #c6c9fd` |
| Grundfläche | `--background: #fafafa`, Karten weiß, `--light-blue-bg: #f1f1f9` |
| Dunkle Fläche | Heading-Ink `--heading: #0d0f32`, `--dark-shade: #282947`, CTA-Navy `#12132a`-Bereich |
| Grün (Erfolg) | `--_design-tokens---colors--green: #30af32` (nur +75%/+120%-Badges) |
| Spacing-Skala | 10/16/20/24/40px, Sektion 5rem (`--_design-tokens---spacing--*`) |
| Radii | 6/8/12px + `--_design-tokens---radius--pill: 999px` (Buttons, Nav, Badges) |
| Schatten | Akzent-Glow auf Primär-CTA: `0 4px 24px #424bee99, inset -1px -2px 6px #424bee80`; Karten flach `0 0 32px #3436590f`, `0 1px 3px #0000000a` |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas (Design: Anordnung, Buttons, Typo, Farbe, Abstände,
Mobil je Sektion aller 5 Routen): `farisschmidt/sektionen.md`.

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Floating-Pill-Navbar | — (Kandidat `P-NAV-PILL`) | Weiße abgerundete Leiste schwebt über der Seite; Logo links, 4 Anker-Links mittig, blauer Pill-CTA mit Pfeil-Kreis rechts. |
| 2 | Typo-Hero | — (Kandidat `P-HERO-TYPO`; `P-HERO-PHOTO` passt nicht, kein Foto) | Zentrierte H1 auf heller Fläche: „Flaggschiff-Webseiten" in blauem Instrument-Serif-Kursiv, Rest near-black Grotesk; darüber Trust-Pill (Avatar-Stack + „ÜBER 40 DIENSTLEISTER…"), darunter genau ein blauer Pill-CTA + Webflow-Certified-Partner-Badge, dann Webflow-Editor-Mockup mit Performance-Karte (+120 %, +75 %). |
| 3 | Logo-Leiste | `P-PROOF-STRIP` | Kundenlogos (Adrise, JANtronic, WSM, Zenith AI, MK, socialglow, August Productions) als schmale graue Leiste unter dem Hero. |
| 4 | Pain-Sektion „Warum dein Auftritt dich jeden Tag Geld kostet" | — (Kandidat `P-PAIN-3`; S14-nah) | Drei gleich hohe Karten mit UI-Illustrationen und je einem konkreten Schmerz als H3 + 3 Zeilen Text. |
| 5 | „Ergebnisse, die für sich sprechen" | `P-GALLERY` (Variante: Werk-Screenshots) | 10er-Grid echter Website-Screenshots der Kundenprojekte, kein Mockup-Deko. |
| 6 | Bento „Was unsere Flaggschiff Webseiten anders machen" | — (Kandidat `P-BENTO`; `P-OFFER-PAIR`-Lücke: 2+3 Karten) | Zwei breite Karten (Weltklasse Design mit Live-Beispiel-Screenshot, Conversion Optimiert mit Balken-Chart +75 %) über drei schmalen (Marketing-Maschinen, Fertig in Wochen, Webflow Development); darunter ein dunkler Pill-CTA „Projektanfrage". |
| 7 | „Ausgewählte Projekte" | `P-GALLERY` | Karten-Slider mit Kategorie-Label, Projektnamen, Tag-Pills und Screenshot; Punkt-Navigation + Pfeile. |
| 8 | Vergleichs-Matrix „Endlich der richtige Partner" | — (Kandidat `P-COMPARE`) | 4-Spalten-Tabelle (Webagenturen/Kreativ/Marketing/Schmidt & Co) mit ✅/⚠️/❌-Icons, Legende oben rechts, eigene Spalte blass-blau getönt. |
| 9 | Prozess „In 4 Schritten zur Marktführer Positionierung" | `P-PROCESS-3` (Lücke: 4 Schritte, echte Sequenz) | Vertikale Timeline mit Fortschritts-Punkt am Scrollverlauf; je Schritt Nummer, H3, Beschreibung, 3 abgehakte Leistungspunkte und eine Illustrations-Karte rechts. |
| 10 | „Was unsere Kunden sagen" | `P-TESTIMONIAL` | Großes Video-Testimonial (echter Kunde, Name „Joschua Dörr, VSL Media") + drei Zitatkarten mit echten Namen, Firmen und Portrait-Fotos + Zitat-Karte Zenith AI mit Foto; 5-Sterne-Reihen ohne erfundene Zahl. |
| 11 | Founder „Dein Ansprechpartner" | `P-TEAM` | Echtes Foto von Faris Schmidt über blauer Namenskarte („Gründer & Geschäftsführer") mit dunklem CTA „Lass uns sprechen!" + grünem Verfügbarkeits-Marker „Aktuell 2 Projektplätze verfügbar"; rechts Manifest-Text mit einem Serif-Kursiv-Satz in Blau. |
| 12 | „Du wünschst dir eine neue Webseite?" | `P-PROCESS-3` | Drei nächste Schritte als Karten (Design-Konzept, Einzelheiten, Zurücklehnen) + dunkler Pill-CTA mit Verfügbarkeits-Marker. |
| 13 | FAQ | `P-FAQ` | 6 echte Fragen als Akkordeon, Volltext im HTML (per curl belegt); links Headline + „Termin buchen"-CTA. |
| 14 | Schluss-CTA „Bereit, endlich als Marktführer aufzutreten?" | `P-CTA-END` (Abweichung: helle Karte statt Akzent-Vollfläche) | Karte mit feinem Grid-/Dot-Muster, H2 mit Serif-Kursiv-Zeile, blauer Pill-CTA, darunter Avatar-Stack „+40 ZUFRIEDENE KUNDEN". |
| 15 | Footer | — | Minimal (Copyright, Datenschutz, Impressum, Social-Icons) über einer riesigen blass-blauen Wortmarke „Schmidt & Co" als Wasserzeichen. |

Unterseiten:

| Seite | Muster |
|---|---|
| `/termin` | Nur Logo + H1 „Dein kostenloses Design-Konzept" + Cal.com-Embed (Kalender, Slots, „Kostenlose Strategiesession, 30m, Google Meet") — keine Navbar, keine Ablenkung. |
| `/empfehlungsprogramm` | Typo-Hero wie `/` (Eyebrow in Blau-Caps, „Empfehlen *lohnt sich.*" mit Serif-Kursiv), ein Pill-CTA, Proof-Zeile als Textzeile („40+ zufriedene Kunden · Webflow Certified Partner · ø 3 Wochen bis Launch"); 3 nummerierte Schritt-Karten (echte Sequenz); 2 Prämien-Karten (`P-OFFER-PAIR`); dunkle Navy-Schlusssektion mit Serif-Kursiv-Span und Pill-CTA (`P-CTA-END`-Variante dunkel). |
| `/projekte/jantronic` | Zentrierter Text-Hero: Kategorie-Badge „DISTRIBUTION", H1, Lead, 2 Tag-Pills, Doppel-CTA (blaue Pille „Live-Webseite ansehen" + dunkle Pille); danach die gelieferte Website als echte Voll-Screenshots im Browser-Rahmen (Fold + Bento + Vergleichstabelle des Kundenprojekts); Schluss-CTA-Karte + Footer. |
| `/projekte/mk-boersenhandel` | Identischer Aufbau mit Badge „TRADING / FINANZ" — die Projektseiten sind ein striktes Template. |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Extrem konsequentes Ein-Akzent-System: Blau #424bee trägt Serif-Spans,
  CTAs und Marker; Flächen bleiben #fafafa/weiß, genau eine dunkle
  Schlusssektion pro Unterseite (S1/S3-konform).
- Der Typo-Hero verkauft ohne Foto: eine präzise Positionierungs-H1 plus
  Trust-Pill mit echter Zahl direkt darüber — Beweis vor Behauptung.
- Referenzen als echtes Werk: Screenshot-Wall und Projektseiten zeigen
  die gelieferten Websites selbst, nicht Stock oder Deko.
- Ein durchgehendes CTA-System: dieselbe blaue Pille mit Pfeil-Kreis von
  Navbar bis Schluss, sekundär dunkel — nie zwei gefüllte Akzent-CTAs
  nebeneinander im Fold.
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  Primär-CTA ist eine Pille (S4), Instrument Serif steht auf der
  S8-Sperrliste, Pain-/Feature-Karten sind karten-lastig (S2/S14-Nähe),
  5-Sterne-Reihen ohne Quellen-Bildmarke (S9-N-Grauzone, Namen/Firmen
  aber echt und als Video belegt).

## 5. Regel-Kandidaten

Keine neuen S-IDs vergeben — das Regelbuch endet bei S18, und Kandidaten
tragen grundsätzlich keine S-Nummern. Neue Muster stehen als Prosa-Kandidaten
mit Beleg-Shot je Zeile; sie laufen dedupliziert in `regel-kandidaten.md`
zusammen. Eine S-ID vergibt erst `stil-regeln.md`, nachdem Raphael den
Kandidaten GO gestempelt hat — nicht dieser Case.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Typo-Hero ohne Foto: genau das Schlüsselwort der H1 wechselt in Serif-Kursiv + Akzentfarbe, der Rest bleibt near-black Grotesk; Muster wiederholt sich in jeder H2 der Seite (Beleg: `/` 1440 `home-desktop-00-fold.png` + 390 `home-mobile-00-fold.png`; `/empfehlungsprogramm` 1440 fold) | — (Prosa-Kandidat) | GO | kandidat |
| Trust-Pill direkt über der H1: Avatar-Stack + „+40"-Chip + konkrete Aussage in Caps; dieselbe Proof-Zeile kehrt unter dem Schluss-CTA zurück (Beleg: `/` 1440 fold + `home-desktop-17-y11920.png`; `/empfehlungsprogramm` 1440 fold als Textzeile) | — (Prosa-Kandidat) | GO | kandidat |
| Verknappung als Status-Marker im Button: grüner Punkt + „Aktuell 2 Projektplätze verfügbar" als zweite Zeile im CTA, nicht als Countdown oder Fake-Timer (Beleg: `/` 1440 `home-desktop-14-y9750.png` Founder-Karte + `home-desktop-16-y11250.png` „Design Konzept anfragen") | — (Prosa-Kandidat) | GO | kandidat |
| Wettbewerbs-Matrix statt Selbstlob: 4 Spalten mit ✅/⚠️/❌, Legende oben, eigene Spalte blass-akzent getönt und mit Logo — jede Zeile eine prüfbare Eigenschaft (Beleg: `/` 1440 `home-desktop-07-y4500.png`; gleiches Muster im Kundenprojekt auf `/projekte/jantronic` 1440 `-05-y3000.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Projekt-Detailseiten als striktes Template: zentrierter Text-Hero (Badge, H1, Lead, Tag-Pills, Doppel-CTA) + die gelieferte Website als echte Voll-Screenshots im Browser-Rahmen (Beleg: `/projekte/jantronic` 1440 fold + `-03-y1500.png`; `/projekte/mk-boersenhandel` 1440 fold + 390 `-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Konversions-Seite ohne Navigation: `/termin` reduziert auf Logo, H1, Nutzenzeile und Kalender-Embed — kein Menü, kein Footer-Lärm (Beleg: `/termin` 1440 `termin-desktop-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
