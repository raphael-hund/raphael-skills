# Case: priwatt (Solaranlagen, Balkonkraftwerke & Wärmepumpen, D2C Leipzig/DACH)

| Feld | Wert |
|---|---|
| Slug | `priwatt` |
| URL | `https://priwatt.de/solaranlagen/` (Raphaels Einstiegs-URL; Haupt-Referenzseite. Startseite `/` als Kontext) |
| Sektor | `handwerk-local` (Energie-Handwerk als D2C-Shop mit Franchise-Fachpartnern — DENSITY eher shopartig hoch) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Der reproduzierbare Scope ist im zeitgestempelten Nenner
`priwatt/route-matrix.json` (`2026-08-31T15:32:18Z`) eingefroren: 59 produktive
Routen aus Sitemap ∪ gleicher-Domain-Navigation, davon 55 über 28 belegte
Template-Repräsentanten abgedeckt und 4 ausdrücklich begründet ausgeschlossen.
Das vollständige Capture-Inventar liegt in
`priwatt/shots/manifest-route-closure.json`; jeder abgedeckte Repräsentant hat
einen realen Desktop- und Mobile-Fold. Zustände sind je Matrixzeile entweder
mit realem Hover-/Click-Pfad belegt oder ausdrücklich `unproven` mit Grund.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/solaranlagen/` | `priwatt/shots/solaranlagen__-desktop-00-fold.png` | ja |
| Mobil 390×844 `/solaranlagen/` | `priwatt/shots/solaranlagen__-mobile-00-fold.png` | ja |
| Scroll-Serie `/solaranlagen/` Desktop | `solaranlagen__-desktop-02-y750.png`, `-04-y2250.png`, `-06-y3750.png`, `-07-y4500.png`, `-09-y6000.png`, `-11-y7500.png` | ja |
| Mobil Scroll `/solaranlagen/` | `solaranlagen__-mobile-08-y2954.png` | ja |
| Desktop+Mobil `/` | `home-desktop-00-fold.png`, `home-mobile-00-fold.png` | ja |
| Desktop `/stecker-solaranlagen/` | `stecker-solaranlagen__-desktop-00-fold.png`, `-04-y2250.png` | ja |
| Mobil `/stecker-solaranlagen/` | `stecker-solaranlagen__-mobile-08-y2954.png` | ja |
| Desktop+Mobil `/waermepumpen/` | `waermepumpen__-desktop-00-fold.png`, `-04-y2250.png`, `waermepumpen__-mobile-00-fold.png` | ja |
| Desktop `/ueber-uns/` | `ueber-uns__-desktop-00-fold.png`, `-03-y1500.png` | ja |

**Capture-Einschränkung:** In allen gelesenen Shots liegt das Cookie-Banner
(„Diese Webseite verwendet Cookies", Button „Alle zulassen" in Hellgrün) über
dem unteren Seitendrittel, und ein halbtransparentes Overlay dimmt die Seite —
die Flächen wirken in den Shots kühler/grauer als die im CSS deklarierte
Cream-Grundfläche. Farbwerte deshalb aus dem CSS, nicht aus den PNGs.
Nicht geprüft: übrige Scroll-Slices, Hover-Zustände, offene FAQ-Akkordeons,
Shots ohne Cookie-Overlay.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `/_next/static/css/0346111fcfb2ffc9.css` + `b08411bba641c5e1.css`
(Next.js-Build, per curl extrahiert 31.08.2026) plus Farbzählung im
gerenderten HTML von `/solaranlagen/`.

| Token | Wert |
|---|---|
| Display-Font | N27 (`--font-n27`, self-hosted `__n27Font` via next/font — Headlines, geometrische Grotesk) |
| Body-Font | Roobert (`--font-roobert`, self-hosted `__roobertFont`; Fallback ui-sans-serif/system-ui) |
| Akzentfarbe (HEX) | Hellgrün `#caf476` (CTAs „Jetzt konfigurieren", WhatsApp-Button, Stat-Karten); Grün-Familie ergänzt um `#45ea8f`/`#3edc99` (Checkmarks, Plus-Icons, Pixel-Deko) |
| Grundfläche | `#fefefb` / Cream `#f3f1e8` (in den Shots durch Cookie-Overlay gedimmt), Topbar-Band `#e3dcb2`-Familie |
| Dunkle Fläche | Tannen-Schwarzgrün `#132219` (häufigste Farbe: 46× im HTML — Text, Über-uns-Hero, Footer); Mittelgrün `#335942` (Beratungs-Bänder, Primär-CTA „Los geht's"/„Jetzt kostenlose Beratung sichern") |
| Spacing-Skala | rem-Raster (Tailwind-Klassen im Markup; Karten/Bänder auf einheitlichem Container) |
| Radii | Familie `.25rem`/`.5rem`/`1.5rem` für Karten und Buttons; `7rem`/`10.5rem` nur als eine abgerundete Riesen-Ecke auf Hero-Bildern und Deko-Flächen; `50%` für Avatare |
| Schatten | in den gelesenen Shots keine sichtbaren Karten-Schatten — Flächen trennen sich über Farbe und feine Linien |

## 3. Sektionen-Inventar

Sektion-für-Sektion-Detail der 13 bestehenden Atlasrouten plus 15 neu
belegter Template-Repräsentanten (Anordnung, Buttons, Typo, Farbe, Abstände,
Mobil, Pattern): `priwatt/sektionen.md`. Die Zuordnung aller 59
Produktivrouten zu Repräsentant oder bewusster Auslassung steht zusätzlich in
`priwatt/route-matrix.md` und maschinenlesbar in `priwatt/route-matrix.json`.

Haupt-Referenzseite `/solaranlagen/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Promo-Topbar + Navbar | — | Oliv-beiges Aktionsband („💡 Speicher deine Mittagssonne … 100€ Rabatt mit Code TAGZUNACHT" + unterstrichener Textlink) über weißer Nav mit Logo, 6 Produkt-Dropdowns, Blog/Service und Warenkorb-Icon; aktiver Nav-Punkt „Solaranlagen" grün eingefärbt, identisch auf allen 5 Seiten. |
| 2 | Hero | `P-HERO-SPLIT` | Links Eyebrow-Badge mit Blitz-Icon („Solaranlage kaufen: Alles aus einer Hand"), H1 „Deine Solaranlage: Beratung & Montage vom Testsieger", Lead und Checkmark-Liste; rechts Haus-Foto mit einer stark abgerundeten Ecke und hellgrünem Pixel-Konfetti; mobil Foto zuerst, dann H1 und genau ein dunkelgrüner CTA „Jetzt kostenlose Beratung sichern" mit Chevron (`solaranlagen__-mobile-00-fold.png`). |
| 3 | Presse-Logoleiste | `P-PROOF-STRIP` | Fünf Original-Wortmarken (Gründerszene, EFAHRER.com, Netzwelt, Home&Smart, Mitteldeutsche Zeitung) einfarbig auf heller Fläche (`solaranlagen__-desktop-02-y750.png`). |
| 4 | Beratungs-Band | `P-CTA-MID` (Abweichung: Fläche dunkelgrün statt `surface`) | Dunkelgrünes Band mit echtem Berater-Foto, Frage „Schnelle und unverbindliche Erstberatung?", Klartext-Telefonnummer +49 151 420 510 42 mit Zeiten „Montag bis Freitag 9–17 Uhr", hellgrünem WhatsApp-CTA und Outline-E-Mail-CTA. |
| 5 | Ersparnis-Rechner | `P-CTA-MID`-Variante (Akzent-Vollfläche; S1/S17-Spannung) | Hellgrüne Vollflächen-Sektion „Deine PV-Anlage: Errechne jetzt Deine Ersparnis!" mit Familien-Foto, „Nur 4 Klicks bis zum unverbindlichen Angebot", 3 Checkmarks und dunkelgrünem CTA „Los geht's" — der Quiz-Funnel ersetzt das Kontaktformular (`solaranlagen__-desktop-02-y750.png`). |
| 6 | Argumente-Raster | — (Kandidat: offenes 2×2-Textraster) | Vier Textblöcke (35 Cent Netzstrom vs. rund 5 Cent Eigenstrom, 10 % Preisanstieg p.a. + 30-Jahre-Leistungsgarantie, Immobilienwert, Nullsteuersatz mit 8–15 kWp / 9–11 Jahren Amortisation) mit Line-Icons, getrennt nur durch feine Linien — keine Karten (`solaranlagen__-desktop-04-y2250.png`). |
| 7 | Full-bleed-Foto | `P-GALLERY`-nah | Randabfallendes Haus-Foto mit PV und Wärmepumpe als Atempause zwischen Text und Angebot (`solaranlagen__-desktop-04-y2250.png` unten). |
| 8 | Komplettset-Paar | `P-OFFER-PAIR` | Zwei gleich hohe Foto-Karten „DIY Komplettsets" / „Komplettsets ohne Montage" mit je einem Satz Subline und grünem Plus-Icon (`solaranlagen__-desktop-06-y3750.png`). |
| 9 | Beratungs-Band (Wiederholung) | `P-CTA-MID` | Identisches dunkelgrünes Berater-Band ein zweites Mal als Sektionstrenner (`solaranlagen__-desktop-06-y3750.png`, `-07-y4500.png`). |
| 10 | Montage-Bento | — (Kandidat: Bento-Beweisraster) | „Professionelle Montage durch unsere Fachpartner": Kachel-Raster aus dunkelgrünen Zahlen-Kacheln („Bis zu 1879 kWh*" mit Strahlenkranz, „Garantierte Montage innerhalb von 4 Wochen nach Kauf"), echtem Montage-Foto, hellgrünen Service-Kacheln (Rundum-Sorglos-Paket, Lebenslanger Profi-Service mit echtem Gesicht, Netzvoranfrage & Netzfertigmeldung) (`solaranlagen__-desktop-07-y4500.png`). |
| 11 | USP-Karten-Leiste | `P-PROOF-STRIP`-Variante | Horizontale Karten-Reihe mit Blitz-Icon und überprüfbaren Claims: Herstellergarantie/30 Jahre, 30 Tage Rückgaberecht, „80.000 zufriedene KundInnen", „90.000 Tonnen CO2 eingespart", Komplett-Sets (`solaranlagen__-desktop-09-y6000.png`). |
| 12 | FAQ mit Sidebar | `P-FAQ` | Links Quicklink-Karten (Beratung, Videos), rechts Akkordeon mit echten Produktfragen („Lohnt sich eine Solaranlage?", „Auf welche Dächer passen Solaranlagen?", Förderung, Anschluss/Anmeldung) (`solaranlagen__-desktop-11-y7500.png`). |
| 13 | Footer | — | Tannen-dunkler Footer `#132219` mit USP-Zeile (Passgenaue Premium-Halterung, 100 % normkonforme Sets, 30 Tage Rückgaberecht) über vierspaltiger Sitemap; Kategorie-Überschriften in Hellgrün (`solaranlagen__-desktop-11-y7500.png`). |

Kontext- und Unterseiten:

| Seite | Muster |
|---|---|
| `/` (Kontext) | Hero ist ein Produkt-Slider statt Marken-Bühne: Full-bleed-Produktfoto „Balkonkraftwerk-Sets mit GoodWe Speicher ESA Athena", Preisanker „Plug & Play, ab 999 €", genau ein hellgrüner CTA „Jetzt konfigurieren", mobil Slider-Dots (`home-desktop-00-fold.png`, `home-mobile-00-fold.png`). |
| `/stecker-solaranlagen/` | Hero-Split mit echtem Foto (Vater und Kind montieren Modul im Garten), H1 „Balkonkraftwerk kaufen: Der schnellste Weg Stromkosten zu senken!" und 3 Checkmarks mit konkreter Zahl „Bis zu 758 € Stromkosten pro Jahr sparen"; danach „Die perfekte Lösung für jeden Montageort" als 5 gleichformatige Foto-Kacheln mit Ein-Wort-Label (Garten/Flachdach/Fassade/Balkon/Schrägdach) und „Inspiration aus der priwatt Community" mit echten Kunden-Installationsfotos („über 80.000") (`stecker-solaranlagen__-desktop-00-fold.png`, `-04-y2250.png`); mobil gestapelte Kacheln plus Sticky-Unterseiten-Nav (Montageorte / priwatt Community / Bestseller) mit permanentem CTA „Jetzt konfigurieren" (`stecker-solaranlagen__-mobile-08-y2954.png`). |
| `/waermepumpen/` | Gleiches Split-Hero-Template wie `/solaranlagen/`: Blitz-Eyebrow „Bis zu 70 % günstiger durch Förderungen", H1 „Viessmann Premium Wärmepumpe kaufen", Checkmark-Lead; mobil grüne Foto-Badge „Bis zu 70 % Förderung möglich" plus dunkelgrüner CTA „Jetzt kostenlos beraten lassen" (`waermepumpen__-desktop-00-fold.png`, `waermepumpen__-mobile-00-fold.png`); dieselbe hellgrüne Rechner-Sektion wie auf `/solaranlagen/` (gleiche 3 Checkmarks, gleicher „Los geht's"-CTA), danach Förder-Sektion: dunkelgrüne Karte mit 30 % Grundförderung / 5 % Effizienzbonus / 20 % Geschwindigkeitsbonus / 30 % Einkommensbonus samt Fußnote „*Gesamtförderpaket auf 70 % gedeckt" auf Full-bleed-Produktfoto (`waermepumpen__-desktop-04-y2250.png`). |
| `/ueber-uns/` | Dunkler Hero `#132219`, große helle Headline „Über uns", hellgrünes Pixel-Konfetti als einzige Deko (`ueber-uns__-desktop-00-fold.png`); danach hellgrüne Stat-Karten mit datierten Zahlen („150 Mio. kWh", „90.000 t CO2 Einsparung* (Stand: August 2025)", „640 Mal hat die Presse unsere Mission bisher geteilt") und „Unser Team"-Slider: echte Mitarbeiter-Fotos mit Klarname, Rolle und Ein-Satz-Zitat (Norman Schulz/B2B, Carola Schumann/Support, Christopher Lemm/Produkt), darunter CTA „Werde Teil unseres Teams" (`ueber-uns__-desktop-03-y1500.png`). |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026; Einstieg über `/solaranlagen/`).
Stichpunkte aus den Shots, die das Urteil tragen:

- Geschlossenes Grün-System statt Buntheit: Tannen-Dunkelgrün `#132219` /
  `#335942` trägt Text, Bänder und Footer, Hellgrün `#caf476` trägt die
  Aktion — jede Seite nutzt dieselben zwei Pole, kein dritter Farbklang.
- Eigenständige Typo-Wahl: N27 + Roobert (self-hosted) statt einer Font von
  der Sperrliste — der Look ist dadurch sofort als priwatt erkennbar.
- Beratung als sichtbares Produkt: das dunkelgrüne Berater-Band mit echtem
  Gesicht, Klartext-Telefonnummer und WhatsApp-Einstieg taucht zweimal pro
  Seite auf; statt Kontaktformular ein Klick-Funnel („Nur 4 Klicks") —
  Mikro-Commitments zuerst.
- Zahlen mit Kante statt Marketing-Runde: 758 €/Jahr, „Bis zu 1879 kWh*",
  „90.000 t CO2 (Stand: August 2025)", 80.000 KundInnen, Förderstaffel
  30/5/20/30 % mit Deckel-Fußnote.
- Unterseiten mit eigenem Job im selben System: Solaranlagen = Beratung +
  Montage-Beweis, Stecker-Solar = Shop mit Montageort-Kacheln und
  Community-Fotos, Wärmepumpen = Förder-Argument, Über uns = Team mit
  echten Gesichtern.
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  mehrere hellgrüne Akzent-Vollflächen pro Seite (Rechner-Sektion,
  Stat-Karten, Service-Kacheln — S1/S17-Spannung), zwei dunkle Bänder plus
  dunkler Footer auf `/solaranlagen/` (S3-Spannung), USP-Leiste als
  5-Karten-Reihe (S14-Nähe, aber jede Karte trägt eine echte Zahl), Emoji
  „💡" in der Promo-Topbar, Cookie-Banner verdeckt in jedem Capture das
  untere Drittel.

## 5. Regel-Kandidaten

Kein neuer S-ID-Eintrag hier — das Regelbuch endet bei S18; neue Muster
stehen als Prosa-Kandidaten, die Synthese pflegt `regel-kandidaten.md`.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Wiederkehrendes Berater-Band als Sektionstrenner: dunkelgrünes Band mit echtem Berater-Foto, Klartext-Telefonnummer + Erreichbarkeitszeiten und zwei Kanal-CTAs (WhatsApp gefüllt, E-Mail Outline) erscheint zweimal auf derselben Seite an Sektionsgrenzen (Beleg: `/solaranlagen/` 1440 `solaranlagen__-desktop-02-y750.png` + `solaranlagen__-desktop-06-y3750.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Ein Funnel-Template über Produktlinien: dieselbe hellgrüne Rechner-Sektion mit identischen 3 Checkmarks („Kostenfrei und unverbindlich / Sicher und transparent / Professionell auf Dich zugeschnitten") und identischem dunkelgrünem „Los geht's"-CTA auf Solar- und Wärmepumpen-Seite — ein Funnel, zweimal montiert statt zweimal erfunden (Beleg: `/solaranlagen/` 1440 `solaranlagen__-desktop-02-y750.png`; `/waermepumpen/` 1440 `waermepumpen__-desktop-04-y2250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Ein einziges Marken-Deko-Element sitewide: hellgrünes Pixel-Konfetti (kleine Winkel-Glyphen) sitzt auf dem Hero-Foto, in der grünen Rechner-Sektion, auf den dunkelgrünen Montage-Kacheln und im dunklen Über-uns-Hero — keine Blobs, Gradients oder wechselnde Ornamente (Beleg: `/solaranlagen/` 1440 `solaranlagen__-desktop-00-fold.png` + `solaranlagen__-desktop-07-y4500.png`; `/ueber-uns/` 1440 `ueber-uns__-desktop-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Varianten-Wahl als Foto-Kachel-Systematik: 5 gleichformatige Foto-Kacheln mit je einem Ein-Wort-Label (Garten/Flachdach/Fassade/Balkon/Schrägdach) machen die Montageort-Entscheidung visuell statt als Dropdown; mobil gestapelt mit Sticky-Unterseiten-Nav plus permanentem Konfigurator-CTA (Beleg: `/stecker-solaranlagen/` 1440 `stecker-solaranlagen__-desktop-04-y2250.png`; 390 `stecker-solaranlagen__-mobile-08-y2954.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Krumme Zahlen mit Fußnote/Stand statt runder Claims: „Bis zu 1879 kWh*", „Bis zu 758 € Stromkosten pro Jahr sparen", „90.000 t CO2 Einsparung* (Stand: August 2025)", Förderstaffel 30/5/20/30 % mit „*Gesamtförderpaket auf 70 % gedeckt" (Beleg: `/solaranlagen/` 1440 `solaranlagen__-desktop-07-y4500.png`; `/stecker-solaranlagen/` 1440 `stecker-solaranlagen__-desktop-00-fold.png`; `/ueber-uns/` 1440 `ueber-uns__-desktop-03-y1500.png`; `/waermepumpen/` 1440 `waermepumpen__-desktop-04-y2250.png`) | S9-N-Beleg (Positivseite) | GO | kandidat |
