# Case: AlpenEnergie (Solar/Wärmepumpe, Basel–Aargau–Zürich)

| Feld | Wert |
|---|---|
| Slug | `alpen-energie` |
| URL | `https://alpen-energie.ch/` |
| Sektor | `clone-parity` (Vorlage des eigenen Kunden-Klons, S18; inhaltlich `handwerk-local` Energie, regional Nordwestschweiz) |
| Typ | House-Case (eigener Kunde — `/root/clients/alpenenergie/DESIGN.md` existiert; die Shots zeigen die Live-Framer-Vorlage) |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

**House-Hinweis:** AlpenEnergie ist zugleich eigener Kunde. Das Designsystem
des Klons ist in `/root/clients/alpenenergie/DESIGN.md` dokumentiert
(„abgeleitet, nicht erfunden") — inklusive dreier bewusster
Kontrast-Abweichungen von der Live-Seite. Diese Studie beschreibt die
**Live-Seite**, wie Raphael sie gestempelt hat; wo Klon und Live abweichen,
steht es dabei.

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture lag bereits vollständig vor:
`references/muster-bibliothek/alpen-energie/shots/` (Manifest
`shots/manifest.json`, `--static`, Viewports wie oben, alle Routen HTTP 200).
Keine neuen Captures. Routen: `/`, `/produkte/solarmodul`, `/referenzen`,
`/ueber-uns`, `/anfrage`.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `alpen-energie/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `alpen-energie/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` | `home-desktop-03-y1500.png`, `-06-y3750.png`, `-09-y6000.png` | ja (Auswahl) |
| Desktop+Mobil `/produkte/solarmodul` | `produkte__solarmodul-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-03-y1500.png` | ja |
| Desktop+Mobil `/referenzen` | `referenzen-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-03-y1500.png` | ja |
| Desktop+Mobil `/ueber-uns` | `ueber-uns-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-05-y3000.png` | ja |
| Desktop+Mobil `/anfrage` | `anfrage-desktop-00-fold.png`, `anfrage-mobile-03-y844.png` | ja |

15 Shots per `Read` angesehen. Nicht geprüft: Footer aller Seiten (letzte
Slices), Hover-/Klick-Zustände, Mega-Menü, restliche Mobile-Serien
(`ueber-uns` mobil läuft bis y24175).

## 2. Tokens (maschinell, nicht geraten)

Quelle: `/root/clients/alpenenergie/DESIGN.md` (jeder Wert an der Live-Seite
gemessen) plus `website/src/index.css` `@theme`. Kein DevTools-Neuextrakt für
diese Studie — die House-Messung ist die Quelle.

| Token | Wert |
|---|---|
| Display-Font | Poppins 600 (Skala 52/45/42/24; gezählt 19.08.2026: d1440 237 Knoten Poppins) |
| Body-Font | Poppins 400/500 (16/14); Inter nur Fließtext der Vorteile-Karten (24 Knoten d1440); Funnel Sans nur Merkmal-Karten der Produktrouten m390 |
| Akzentfarbe (HEX) | live `#e93323` (CTA-Rot, Sterne, Marker); Klon bewusst `#e02d1f` für WCAG AA 4.60:1 |
| Grundfläche | Weiß; helle Karten `#f5f5f5`-Familie (Klon ersetzt Pastell `#f6f6f4`/`#fbfbfa` durch Kaltgrau `#eeeeee` — Kundenansage „Kein Pastell") |
| Dunkle Fläche | Schiefer-Verlauf `rgb(74,92,107)` → `rgb(34,40,47)` (Stats-/CTA-Bänder); Überschriften-Schwarz `#0d0d0d`; Near-Black-Kacheln auf `/produkte/solarmodul` |
| Spacing-Skala | Gaps `10/16/24/20/12` px (Framer-Herkunft, bewusst unregelmäßig — nicht glätten) |
| Radii | `24px` Karten/Bänder · `12px` Kacheln · `15px` Bilder · `8px` Knöpfe |
| Schatten | in den gelesenen Shots kaum sichtbar; Karten arbeiten mit Flächenkontrast (hellgrau/dunkel/Foto), nicht mit Schatten |

Bewegung (aus DESIGN.md, nicht aus Shots): Ticker/Logos -40px/s, Ease
`cubic-bezier(0.16,1,0.3,1)`, 200–320ms; Hero und Kundenstimmen statisch.

## 3. Sektionen-Inventar

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Ticker-Topbar | — (Kandidat: Angebots-Ticker) | Schmale rote Laufleiste „Unser Lager zieht um! Nur für kurze Zeit: Rabatt auf Komponente" über dem Header — die einzige Akzent-Vollfläche der Seite neben den CTAs. |
| 2 | Header | — | Logo links, 6 Nav-Punkte, grauer „Support"-Button plus genau ein roter CTA „Jetzt Offerte sichern" (8px-Radius, keine Pille — S4-konform). |
| 3 | Hero | `P-HERO-PHOTO` | Abendliches Echt-Foto der beiden Gründer vor Haus mit PV und E-Auto, roter Schweizerkreuz-Eyebrow „IHR SOLARSPEZIALIST IN BASEL, AARGAU & ZÜRICH", weiße H1, Lead mit konkreten Namen (Pronovo, IWB, EBL, „Ohne Subunternehmer"), roter Primär-CTA plus grauer Sekundär „Erklärvideo ansehen"; Partner-Bildmarken (SWISSOLAR, EcoFlow, SwissWatt Platin) rechts unten im Fold — mobil dasselbe Motiv und CTA-Paar, Logos unterhalb des Folds. |
| 4 | „Ihr Komplettsystem" | — (Kandidat: Illustrations-Erklärsektion) | Schwarze H2 auf Weiß, System-Illustration mit roter Verlaufslinie (Anschnitt in `home-desktop-03-y1500.png` oben). |
| 5 | Stats-Band „Unsere Erfolge" | — (Kandidat: Stats-Band; keine Katalog-ID, Lücke) | Schiefer-Verlauf, Eyebrow „ZAHLEN DIE ÜBERZEUGEN", links Fließtext mit Belegen (Swissolar-Mitglied, 2.600 MWh ≈ 650 Haushalte, 4,9 Sterne Google), rechts vier Zahlen 280+/4000+/2600+/40+ mit Labels. |
| 6 | „Solaranlage kaufen in…" | — (Text-Bild-Split) | Langer Text mit Ortsbezug (Aesch, Region Basel) neben Echt-Foto eines Monteurs auf dem Gerüst, ein roter CTA „Jetzt Offerte anfordern". |
| 7 | Produkt-Umschalter | — (Kandidat: Tab-Produktschau) | Sechs Tab-Chips (Energiemanager/Solarmodul/Wärmepumpe/Stromspeicher/Wallbox/Ersatzstrom), aktiver Tab rot; darunter Foto-Karte links, hellgraue Karte rechts mit Titel, drei roten Check-Punkten und einem roten CTA „Produkt ansehen". |
| 8 | Aktionsband „Starten Sie Ihre Energiewende" | `P-CTA-MID` (Abweichung: Fläche ist Schiefer-Verlauf, nicht `surface`) | Dunkles Band, links H2 plus zwei Zeilen Text, rechts roter CTA und Telefonnummer als Text. |
| 9 | „Energielösungen aus einer Hand" | — (Text-Bild-Split) | Echt-Foto (Monteur zeigt auf Buderus-Wärmepumpe) links, Text mit „2–4 Tagen", „keine Subunternehmer" und Check-Liste rechts. |
| 10 | Vorteils-Trio | — | Drei Icon-Punkte (Förderungen inklusive / Schnelle Installation / Autark & kontrolliert) auf dunklem Verlauf — Icons klein, Text trägt. |
| 11 | Kundenstimmen | `P-TESTIMONIAL` | Video-Karte „Ronald G., Basel-Land" (echtes Standbild, Play-Button, Name über Verlaufszone) neben Zitat-Karte mit konkretem Inhalt („nicht am billigsten, aber…", drei Wochen, Tablet) und Sternen; darunter weitere Zitat-Karte plus Echt-Foto eines Paars. |

Unterseiten:

| Seite | Muster |
|---|---|
| `/produkte/solarmodul` | `P-HERO-PHOTO` (flacher): Dach-Foto mit dunkler Unterzone, kleine Überzeile, H1 „Solarmodul" — mobil identisch aufgebaut. Danach zweifarbige H2 („Hochleistungsmodul" schwarz / „der Spitzenklasse" grau), Produktbild mit schwebender Badge „40 Jahre Leistungsgarantie". Tiefer (`-desktop-03-y1500.png`) ein Bento-Merkmal-Raster: helle Zahl-Kachel „500 W", dunkle Foto-Kachel „Brandschutzklasse A & Hagelschutzklasse 5", Foto-Kachel „Bifaziale Energie", Text-Kachel, „40 Jahre Garantie — mindestens 88,85% Leistung"; dann dunkler Split „Optimiert für Schweizer Klima" mit konkreter Winterzahl (60–70% der Sommer-Leistung) neben Frost-Foto. |
| `/referenzen` | `P-HERO-PHOTO`: Drohnen-Echt-Foto einer laufenden Montage (Team sichtbar auf dem Dach), H1, genau ein roter CTA „Offerte anfordern"; direkt darunter dasselbe Stats-Band wie auf `/`. Tiefer `P-GALLERY` mit Datenblock: 3-spaltiges Raster echter Anlagen-Fotos, Kundenname als Badge auf dem Bild (Markus K., Familie Flück, René Z., …), unter jedem Foto Modulzahl, kWp und Modultyp (SunPro 450 Wp / SwissWatt One 445–490 Wp). Mobil bricht die H1 „Wärmepum/pe" mitten im Wort ohne Trennstrich (`referenzen-mobile-00-fold.png`). |
| `/ueber-uns` | `P-HERO-PHOTO`: Gruppen-Echt-Foto von sechs Mitarbeitenden im Grünen, H1, SWISSOLAR-Bildmarke „Offizielles Mitglied" im Fold (desktop rechts unten, mobil unter der H1); danach Stats-Band. Tiefer `P-TEAM` (`-desktop-05-y3000.png`): nach Abteilungen gegliedert (Geschäftsführung / Projektleitung / Beratung & Vertrieb), alle Porträts im selben Studio-Stil vor Betonwand, gleiche Pose, Name plus Rolle — durchgehend echte Fotos. |
| `/anfrage` | `P-CONTACT` als Frage-Funnel: H1 „Jetzt Verfügbarkeit prüfen!", drei rote Check-Punkte (bis CHF 7'000 Förderung / PV + Wärmepumpe / bis 40 Jahre Garantie), Tab-Zeile „Frage 1–4", erste Frage „Sind Sie Eigentümer des Hauses?" mit Ja/Nein-Kacheln und rotem „Weiter" — Mikro-Commitment zuerst, keine E-Mail im Fold (G1-Do des Katalogs live belegt). Darunter `P-PROOF-STRIP` „Das spricht für uns:" mit Original-Bildmarken (EUPD Research, Google, Buderus). Mobil tiefer (`anfrage-mobile-03-y844.png`): Sektion „3 Dinge, die wir anders machen" mit Echt-Foto eines Mitarbeiters. |

Sektions-Atlas mit Design-Detail je Sektion (Anordnung, Komponenten, Typo, Farbe, Abstände, Mobil) für alle fünf Routen: `alpen-energie/sektionen.md`.

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Echte Menschen überall: Gründer im Home-Hero, Montage-Drohnenfoto im
  Referenzen-Hero, komplette Team-Galerie im Studio-Stil, Video-Testimonial
  mit Name und Region — kein einziges Stock-Gesicht in den gelesenen Shots
  (S9-konform).
- Beweis mit Messwerten statt Adjektiven: Stats-Band mit Belegsätzen
  (2.600 MWh ≈ 650 Haushalte), Referenz-Karten mit Modulzahl/kWp/Modultyp
  pro Anlage, Produktseite mit 88,85%-Garantiewert und 60–70%
  Winterleistung.
- Disziplinierte Ein-Akzent-Palette: Rot nur als CTA, Check-Icons,
  Eyebrow-Marker, aktiver Tab und Ticker-Leiste; Flächen bleiben Weiß,
  Hellgrau und Schiefer-Verlauf.
- Anfrage als Frage-Funnel mit Eigentümer-Frage zuerst — Mikro-Commitment
  vor Kontaktdaten, exakt das Do von `P-CONTACT`.
- Hohe Systemtreue: jede Unterseite öffnet mit Foto-Hero, weißer H1 und
  genau einem roten Primär-CTA; das Stats-Band wird als identischer
  Beweisblock auf `/`, `/referenzen` und `/ueber-uns` wiederverwendet.

## 5. Regel-Kandidaten

Keine neuen S-IDs vergeben (Regelbuch endet bei S18); neue Muster als
Prosa-Kandidaten, Synthese macht `regel-kandidaten.md`.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Anfrage-Seite als 4-Schritt-Frage-Funnel: „Sind Sie Eigentümer des Hauses?" mit Ja/Nein-Kacheln als erster Schritt, Fortschritts-Tabs „Frage 1–4", ein roter „Weiter"-CTA — Kontaktdaten nicht im Fold (Beleg: `/anfrage` 1440 `anfrage-desktop-00-fold.png`) | `P-CONTACT`-Do-Beleg (G1) + Prosa-Kandidat | GO | kandidat |
| Referenz-Karte trägt Kundenname als Badge auf dem Foto plus Datenblock Modulzahl/kWp/Modultyp unter jedem Bild — jede Referenz ist ein Messwert, kein Lob-Zitat (Beleg: `/referenzen` 1440 `referenzen-desktop-03-y1500.png`) | S9-Beleg + Prosa-Kandidat | GO | kandidat |
| Ein Stats-Band als wiederverwendbarer Beweisblock: identischer Aufbau (Eyebrow „ZAHLEN, DIE ÜBERZEUGEN", Zahlen mit Belegsatz, Schiefer-Verlauf) auf drei Routen (Beleg: `/` 1440 `home-desktop-03-y1500.png`; `/referenzen` 1440 `referenzen-desktop-00-fold.png` unten; `/ueber-uns` 390 `ueber-uns-mobile-00-fold.png` unten) | — (Prosa-Kandidat) | GO | kandidat |
| Team-Galerie im durchfotografierten Studio-Stil: alle Porträts vor derselben Betonwand, gleiche Pose (verschränkte Arme), Name + Rolle, nach Abteilungen gruppiert — Konsistenz macht das Team-Grid ruhig trotz 12+ Gesichtern (Beleg: `/ueber-uns` 1440 `ueber-uns-desktop-05-y3000.png`) | `P-TEAM`/S9-Beleg + Prosa-Kandidat | GO | kandidat |
| Mobiler Hero behält Desktop-Motiv und CTA-Paar exakt bei (gleiche Gründer-Aufnahme, gleiche zwei Buttons), nur die Partner-Logos rutschen unter den Fold (Beleg: `/` 1440+390 `home-desktop-00-fold.png` / `home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |

**Spannungen, ehrlich notiert (keine Urteile):**

- Die rote Ticker-Topbar ist eine schmale Akzent-Vollfläche über dem Header —
  je nach Lesart eine S1-Spannung (Akzent nie als Fläche); auf einer
  `clone-parity`-Vorlage gilt S18: die Live-Seite ist der Maßstab.
- `P-CTA-MID` läuft hier auf dunklem Schiefer-Verlauf statt auf `surface`
  (S17-Abweichung) — funktioniert im Shot, weil die Seite sonst hell bleibt
  und der Verlauf die einzige zweite dunkle Fläche im gelesenen Ausschnitt ist.
- Mobil bricht die Referenzen-H1 „Wärmepum/pe" ohne Trennstrich
  (`referenzen-mobile-00-fold.png`) — sichtbare Schwäche der Vorlage, im Klon
  nicht nachbauen.
- Das Dach-Motiv im Solarmodul-Hero wirkt render-artig; ob Foto oder
  Rendering ist aus dem Shot nicht entscheidbar — nicht geprüft.

Rückverweis-Einträge in `stil-regeln.md` stehen aus — die pflegt die
zentrale Synthese (`regel-kandidaten.md`), nicht dieser Case.
