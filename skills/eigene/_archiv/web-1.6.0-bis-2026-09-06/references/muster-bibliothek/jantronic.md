# Case: JANtronic (Distribution elektronischer Bauteile, Berlin, B2B)

| Feld | Wert |
|---|---|
| Slug | `jantronic` |
| URL | `https://www.jantronic.com/` |
| Sektor | `b2b-dienst` (freier Distributor / Beschaffung elektronischer Bauteile) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

**Stamp: GO (Raphael, 31.08.2026).**

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture lag bereits vollständig vor:
`references/muster-bibliothek/jantronic/shots/` (Manifest `shots/manifest.json`,
31.08.2026, base `https://www.jantronic.com`, `--static`, Viewports wie oben).
Keine neuen Captures. Routen laut Manifest, alle HTTP 200: `/`,
`/leistungen`, `/unternehmen`, `/hersteller`, `/kontakt` — jeweils Desktop
und Mobil.

| Shot | Pfad (relativ zu `jantronic/shots/`) | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` Desktop | `home-desktop-02-y750.png`, `-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`, `-11-y7500.png`, `-14-y9750.png`, `-19-y13500.png` | ja (Auswahl) |
| Desktop `/leistungen` | `leistungen-desktop-00-fold.png` | ja |
| Desktop `/unternehmen` | `unternehmen-desktop-00-fold.png` | ja |
| Desktop `/hersteller` | `hersteller-desktop-00-fold.png` | ja |
| Desktop `/kontakt` | `kontakt-desktop-00-fold.png` | ja |

Zusätzlich liegen Interaktions-Shots vor (`home-desktop-hover-00…03-*.png`
Nav-Hover; `home-desktop-click-y4500/y5250-*-Sourcing/Sonderbeschaffung/
Lagerkonzepte/Musterartikel.png` — Tab-Zustände der Leistungs-Sektion);
davon nur die Dateinamen ausgewertet, Bilder nicht einzeln gelesen.
Ein Chat-Widget („Willkommen bei JANtronic!") steht unten rechts in allen
gelesenen Shots; es dominiert die Folds nicht, Shots gültig.
Nicht geprüft: übrige Desktop-Slices, alle Mobile-Scroll-Serien,
Hover-/Klick-Bilder, Mobil-Folds der Unterseiten.

## 2. Tokens (maschinell, nicht geraten)

Kein CSS-/DevTools-Extrakt durchgeführt — alle Zellen `nicht geprüft`.
Sichtbare (nicht extrahierte) Eindrücke stehen als Prosa darunter.

| Token | Wert |
|---|---|
| Display-Font | nicht geprüft |
| Body-Font | nicht geprüft |
| Akzentfarbe (OKLCH/HEX) | nicht geprüft |
| Grundfläche | nicht geprüft |
| Dunkle Fläche | nicht geprüft |
| Spacing-Skala | nicht geprüft |
| Radii | nicht geprüft |
| Schatten | nicht geprüft |

Aus den Shots sichtbar (kein Token, nur Beobachtung): genau eine grüne
Akzentfarbe (gefüllte CTAs, Stat-Zahlen, Eyebrow-Pills, Check-Icons,
Karten-Punkte); Grundfläche Weiß mit hellgrauen Karten; dunkle Flächen
sind grün abgedunkelte Echt-Fotos (Zitat-Sektion, „Für Einkäufer"-Band,
Unterseiten-Heros); Sterne in den Zitatkarten Orange; Buttons, Chips und
Eyebrows durchgehend als Pillen (S4-Spannung, siehe §4).

## 3. Sektionen-Inventar

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Header | — | Weiße Leiste: Logo links, 4 Nav-Punkte, Sprach-Flagge, genau ein grüner Pill-CTA „Bedarf senden" rechts; identisch auf allen 5 Seiten. |
| 2 | Typo-Hero | — (Kandidat Typo-Hero; `P-HERO-PHOTO` passt nicht, kein Foto — Lücke, siehe Absatz unter der Tabelle) | Helle Fläche, grüne Eyebrow-Pill „SICHER, FLEXIBEL, FAIR - SEIT 2011", zentrierte near-black H1 „Krisensichere und verlässliche Beschaffung elektronischer Bauteile", Bullet-Benefit-Zeile, CTA-Paar (grün „Bedarf senden" + grau „Unsere Geschichte"); darunter echtes ProvenExpert-Widget („SEHR GUT", 5 Sterne, „JANtronic GmbH", „8 Kundenbewertungen", „Authentizität 17.06.2025") über gepunkteter Weltkarte mit grünen Standort-Punkten — mobil identischer Aufbau (`home-mobile-00-fold.png`). |
| 3 | Stats „Warum JANtronic" | — (Kandidat Stats-Band) | Eyebrow-Pill „VORTEILE", H2, Subline „Schnell wie ein Broker. Sorgfältig wie ein Distributor…", drei grüne Zahlen mit Caps-Label (10,000+ erhältliche Produkte / 1,000,000,000+ verkaufte Produkte / 100+ abgeschlossene Projekte) — ohne Belegsätze (`home-desktop-02-y750.png`). |
| 4 | Geschäftsführer-Video | — (Kandidat Video-Statement) | Vollbreites Video-Standbild (echtes Büro, Geschäftsführer mit Rennrad im Bild) mit Player-Leiste, darunter CTA-Paar (grün „Bedarf senden" + grau „Zum Newsletter anmelden") (`home-desktop-02-y750.png`, `-04-y2250.png`). |
| 5 | „Dein neuer ~~Broker~~ Partner" Karten-Raster | `P-OFFER-PAIR` (Lücke: 6 Karten; S14-Nähe) | Sechs Karten mit UI-Illustrationen statt Icons: Keine Vorkasse (Auftrag→Prüfung→Zahlung-Stepper, „Zahlung bis zu 90 Tage nach der Lieferung"), Express ohne Aufpreis, Herstellerunabhängig (Chip-Liste ST/NXP/Infineon/Renesas/ADI), Qualitätsprüfung inklusive, Planungssicherheit, Preisvorteil durch Flexibilität (`home-desktop-04-y2250.png`, `-06-y3750.png`). |
| 6 | Vergleichs-Matrix „Mehr als ein Broker" | — (Kandidat `P-COMPARE`, wie farisschmidt) | Drei Spalten Broker/Hersteller/JANtronic mit rot/grünen Icons je prüfbarer Zeile (Keine Vorkasse, Express ohne Aufpreis, Qualitätsprüfung inkl., …), darunter Chip-Zeile und CTA-Paar (grün + grau „Unsere Leistungen") (`home-desktop-06-y3750.png`). |
| 7 | Leistungs-Tabs „Kennen Sie das auch?" | — (Kandidat Tab-Problemlöser) | Pill-Tab-Leiste Sourcing/Sonderbeschaffung/Lagerkonzepte/Musterartikel; je Tab eine Karte mit Problem-Frage, „Lösung:"-Absatz, Fakten-Chips und CTA-Paar — Tab-Zustände als Click-Shots belegt (`home-desktop-08-y5250.png`, `home-desktop-click-y4500-*.png`). |
| 8 | Kontakt-Split | `P-CONTACT` | Links Eyebrow „KONTAKT" + H2 „Kontaktiere uns oder stelle eine Anfrage" + Text, rechts Formular (Voller Name, E-Mail, Telefonnummer, Unternehmen, Bedarf-Freitext) mit grünem Pill-Submit „Jetzt Anfragen" (`home-desktop-08-y5250.png`). |
| 9 | Gründer-Zitat auf Dunkelgrün | — (Kandidat Zitat-Band) | Grün abgedunkeltes Foto, weiße Zitat-Karte mit Signatur-Schriftzug und Zeile „JAN PUCKO, GESCHÄFTSFÜHRER", darunter CTA-Paar (grün + grau „Über Uns") (`home-desktop-11-y7500.png`). |
| 10 | Team „Das Team dahinter" | `P-TEAM` | „8 Expert:innen — feste Ansprechpartner…": echte Portrait-Fotos, Rollen-Label (Geschäftsführer/Prokuristin/Vertrieb), je Karte direkte E-Mail und Telefonnummer, Badge „Staatlich geprüfter Betriebswirt…" und grüner CTA „Mit Jan sprechen" auf der Gründer-Karte (`home-desktop-11-y7500.png`). |
| 11 | Kundenstimmen | `P-TESTIMONIAL` | Zitatkarten mit oranger 5-Sterne-Reihe, echten Klarnamen (Andreas Kilian, Felix Janowski, Denise Busch, Lele Reschke) und Initial-Avataren; darunter CTA-Paar (grün „Kontakt aufnehmen" + grau „Alle Bewertungen ansehen") (`home-desktop-14-y9750.png`). |
| 12 | „Für Einkäufer: weniger Stress, mehr Wirkung" | `P-CTA-END`-Verwandter (Abweichung: dunkles Foto-Band statt Akzent-Vollfläche) | Grün abgedunkeltes Teamfoto, links H2 + sieben Benefit-Chips mit fettem Stichwort und konkreter Aussage („Kostenkontrolle — transparente Preise, keine Vorkasse…"), genau ein grüner CTA (`home-desktop-14-y9750.png`). |
| 13 | Newsletter-Band + Karte + Footer | `P-MAP` + — | Dunkles Band mit „Jetzt anmelden", vollbreite Leaflet-Karte mit Standort-Punkt Berlin-Lichtenberg, Footer mit echter Adresse (Plauener Str. 163-165, 13053 Berlin), Kontaktzeilen („Videocall vereinbaren", Telefon, E-Mail), erneut das ProvenExpert-Siegel und ein IT-ZERT-ISO-9001:2015-Siegel mit Zertifikat-Download (`home-desktop-19-y13500.png`). |

Sektion 2 hat keine passende Katalog-ID (`P-HERO-PHOTO` verlangt ein
Foto); §4 verlangt, die Lücke nach `art-direction.md` zu schreiben —
diese Studie ist kein Build und hat keine `art-direction.md`, die Lücke
bleibt hier als offener Punkt geführt (ebenso die 6-Karten-Abweichung in
Sektion 5) und gehört bei Übernahme in einen Build in dessen
`art-direction.md`.

Sektion für Sektion im Design-Detail (Anordnung, Buttons, Typo, Farbe, Abstände,
Mobil) beschrieben: `jantronic/sektionen.md` — Sektions-Atlas über alle fünf Routen.

Unterseiten:

| Seite | Muster |
|---|---|
| `/leistungen` | Foto-Sub-Hero: grün abgedunkeltes Teamfoto, zentrierte weiße H1 „Unsere Leistungen für Ihre Produktion", Lead-Satz, CTA-Paar (grün „Bedarf senden" + grau „Über Uns") (`leistungen-desktop-00-fold.png`). |
| `/unternehmen` | `P-HERO-PHOTO`: echtes Dreier-Teamfoto mit grünem Overlay, links H1 „Menschen. Bauteile. Lösungen. Seit 2011 in Berlin.", Lead-Absatz, CTA-Paar (grün + grau „Unsere Leistungen") (`unternehmen-desktop-00-fold.png`). |
| `/hersteller` | Text-Hero ohne Foto: linksbündige H1 „Wer liefert welche Hersteller?", zwei Absätze (herstellerunabhängig, „Schluss mit Linecards"), CTA-Paar (grün + grau „Kontakt aufnehmen"); darunter Eyebrow-Pill „HERSTELLER" (`hersteller-desktop-00-fold.png`). |
| `/kontakt` | Identischer Kontakt-Split wie Home-Sektion 8 (Eyebrow „KONTAKT", H2, Formular mit „Jetzt Anfragen") plus Google-Maps-Ausschnitt links — die Kontakt-Sektion ist ein striktes Template (`kontakt-desktop-00-fold.png`). |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Ehrlicher Proof im Fold: echtes ProvenExpert-Widget mit unbeschönigt
  kleiner Zahl („SEHR GUT", 8 Kundenbewertungen, Authentizität-Datum
  17.06.2025) statt erfundener Masse — S9-N-konform, desktop wie mobil.
- Ein durchgehendes CTA-System: dieselbe grüne Pille „Bedarf senden" plus
  grauer Sekundär-CTA in jedem Fold und nach fast jeder Sektion — nie
  zwei gefüllte Akzent-CTAs nebeneinander.
- Beweis mit Prüfbarem: Vergleichs-Matrix Broker/Hersteller/JANtronic mit
  prüfbaren Zeilen, konkrete Zusagen („Zahlung bis zu 90 Tage nach der
  Lieferung"), ISO-9001-Siegel mit Zertifikat-Download im Footer.
- Echte Menschen mit direktem Draht: 8 Team-Portraits mit Rolle, E-Mail
  und Telefonnummer pro Person, Gründer-Video und Gründer-Zitat.
- Spannungen zum Regelbuch (für die Synthese, kein Urteils-Override):
  alle CTAs sind Pillen (S4), 6 Vorteils-Karten plus Tab-Karten sind
  karten-lastig (S2/S14-Nähe), 5-Sterne-Reihen in den Zitatkarten ohne
  Quellen-Bildmarke (S9-N-Grauzone; das ProvenExpert-Widget trägt die
  Quelle), Stats-Zahlen ohne Belegsätze, sitewide Chat-Bubble.

## 5. Regel-Kandidaten

Keine neuen S-IDs vergeben — das Regelbuch endet bei S18, und Kandidaten
tragen grundsätzlich keine S-Nummern. Neue Muster als Prosa-Kandidaten; sie
laufen dedupliziert in `regel-kandidaten.md` zusammen. Eine S-ID vergibt erst
`stil-regeln.md`, nachdem Raphael den Kandidaten GO gestempelt hat — nicht
dieser Case.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Bewertungs-Proof im Hero-Fold als echtes Dritt-Widget mit unbeschönigter Zahl: ProvenExpert-Siegel „SEHR GUT" mit nur 8 Kundenbewertungen und Authentizität-Datum, desktop wie mobil im Fold (Beleg: `/` 1440 `home-desktop-00-fold.png`; `/` 390 `home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| CTA-Paar als System: genau ein grün gefüllter Primär-CTA plus ein grauer heller Sekundär-CTA, identisch in jedem Fold und nach jeder Sektion (Beleg: `/` 1440 `home-desktop-00-fold.png`; `/leistungen` 1440 `leistungen-desktop-00-fold.png`; `/unternehmen` 1440 `unternehmen-desktop-00-fold.png`; `/hersteller` 1440 `hersteller-desktop-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Team-Karten mit direktem Draht: Rolle als Caps-Label, echtes Portrait, persönliche E-Mail und Telefonnummer je Person statt Sammel-Formular (Beleg: `/` 1440 `home-desktop-11-y7500.png`) | S9-Beleg + Prosa-Kandidat | GO | kandidat |
| Vergleichs-Matrix statt Selbstlob: drei Spalten (Broker/Hersteller/eigene Marke) mit rot/grünen Icons, jede Zeile eine prüfbare Eigenschaft (Beleg: `/` 1440 `home-desktop-06-y3750.png`; gleiches Muster als Kandidat in `farisschmidt.md`) | — (Prosa-Kandidat) | GO | kandidat |
| Benefit-Chips mit Substanz im Schluss-Band: fettes Stichwort plus ein konkreter Halbsatz pro Chip („Kostenkontrolle — transparente Preise, keine Vorkasse…"), genau ein CTA (Beleg: `/` 1440 `home-desktop-14-y9750.png`) | — (Prosa-Kandidat) | GO | kandidat |
