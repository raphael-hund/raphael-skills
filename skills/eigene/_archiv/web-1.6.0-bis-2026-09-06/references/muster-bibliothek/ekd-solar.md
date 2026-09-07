# Case: EKD — Energiekonzepte Deutschland (Solar/Wärmepumpe, bundesweit)

| Feld | Wert |
|---|---|
| Slug | `ekd-solar` |
| URL | `https://www.ekd-solar.de/` |
| Sektor | `handwerk-local` (Energie; Abweichung: bundesweiter D2C-Anbieter, kein lokaler Betrieb — nächstliegender Sektor, Lücke notiert) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

Capture lag bereits vollständig vor:
`references/muster-bibliothek/ekd-solar/shots/` (Manifest `shots/manifest.json`,
`--static`, Viewports wie oben, 5 Routen, alle HTTP 200). Keine neuen Captures.
Routen: `/`, `/solaranlage/`, `/waermepumpe/`, `/unternehmen/`,
`/kundenerfahrungen/`.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 `/` | `ekd-solar/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 `/` | `ekd-solar/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie `/` | `home-desktop-03-y1500.png`, `-04-y2250.png`, `-11-y7500.png` | ja (Auswahl) |
| Desktop+Mobil `/solaranlage/` | `solaranlage__-desktop-00-fold.png`, `-mobile-00-fold.png` | ja |
| Desktop+Mobil `/waermepumpe/` | `waermepumpe__-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-04-y2250.png` | ja |
| Desktop+Mobil `/unternehmen/` | `unternehmen__-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-04-y2250.png` | ja |
| Desktop+Mobil `/kundenerfahrungen/` | `kundenerfahrungen__-desktop-00-fold.png`, `-mobile-00-fold.png`, `-desktop-03-y1500.png` | ja |

16 Shots per `Read` angesehen. Nicht geprüft: Seitenenden/Footer
(letzte Slices der Serien), Hover-/Klick-Zustände, restliche Mobile-Serien.

Sektionsweise Design-Dokumentation aller fünf Routen (61 Sektionen, Anordnung,
Buttons, Typo, Farbe, Abstände, Mobil, Pattern je Sektion):
`ekd-solar/sektionen.md`.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `curl https://www.ekd-solar.de/` — gerendertes Inline-CSS plus
Stylesheet-Links (WordPress, Theme Salient 18.1.1, Fonts via `useanyfont`).

| Token | Wert |
|---|---|
| Display-Font | `pp-telegraf` (PP Telegraf, custom eingebunden via `uaf.css`) |
| Body-Font | `pp-telegraf` / `Circular` (beide geladen; exakte h1/body-Zuordnung im CSS nicht einzeln verifiziert — Plugin-Fallback `Open Sans` nur für Widget-CSS) |
| Akzentfarbe (HEX) | `#ef870e` (Orange; 47 Vorkommen im Dokument-CSS, einzige Akzentfarbe) |
| Grundfläche | `#ffffff`; Sekundärfläche Warmgrau `#e9e9e6` / `#edecea` |
| Dunkle Fläche | `#21262b` (Near-Black-Panels, z.B. Info-Box `/solaranlage/`), `#000000` |
| Spacing-Skala | nicht maschinell extrahiert (Salient-Buildsystem); sichtbar: großzügige Sektionen mit ~120–200 px Vertikalabstand |
| Radii | Buttons `5px` (häufigster Wert im CSS); `100px`/`1000px` nur für runde Pfeil-Buttons und Chips |
| Schatten | in den gelesenen Shots kaum sichtbar; Karten arbeiten mit Flächenkontrast statt Schatten (nicht maschinell extrahiert) |

## 3. Sektionen-Inventar

Startseite `/` (Desktop-Serie), Reihenfolge von oben:

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Header | — | Weißer Logo-Block links, 6 Nav-Punkte, „Kundenportal" als Text-Link, genau ein oranger Button „Ersparnis berechnen" rechts (rechteckig, 5px-Radius). |
| 2 | Hero | `P-HERO-PHOTO` | Vollflächiges Foto (Vaillant-Wärmepumpe am Haus, abgedunkelt), oranger Eyebrow „Immer der günstigste und sauberste Strom.", weiße H1, ein oranger CTA „Kostenlose Beratung"; rechts unten echte Google-Bewertung „4,2 von 5,0 Sternen aus über 1.800 Bewertungen" mit 4 von 5 gefüllten Sternen; mobil anderes Motiv (Familien-Videostandbild), sonst identischer Aufbau. |
| 3 | Vorteils-Karten | `P-OFFER-PAIR` (Lücke: 3 Karten) | Weiße Karten „Perfekt aufeinander abgestimmte Komponenten" / „Maximale Kostenersparnis." mit Produkt-Illustration, direkt an den Fold anschließend. |
| 4 | „Die rentabelste Solaranlage: Das Energiesystem" | — (Kandidat: Illustrations-Erklärsektion) | Isometrische Haus-Illustration mit orangen Leitungslinien auf hellem Himmel-Verlauf, links Text plus ein dunkler CTA „Zum Energiesystem". |
| 5 | Produkt-Slider | `P-GALLERY`-Verwandter | Dunkle Foto-Karten Solaranlage/Wärmepumpe/Stromspeicher/… mit weißem Titel oben und orangem Kreis-Pfeil plus Textlink unten, Pfeil-Navigation. |
| 6 | „Die wirtschaftlichste Lösung" | — (Kandidat: Zahlen-Illustration) | Text mit konkreter Zahl („bis zu 5.000 € pro Jahr sparen") neben derselben isometrischen Illustration mit orangem „110 % Ersparnis EKD365+"-Block. |
| 7 | „Rundum-Sorglos-Paket" | `P-GALLERY`-Verwandter | Drei hohe Foto-Karten mit Line-Icon und Label unten (Energiekonzept.Plus / Finanzierungsfragen / Versicherung) — echte Fotos, kein Icon-Karten-Raster. |
| 8 | „In 5 einfachen Schritten zum…" | `P-PROCESS-3` (Lücke: 5 Schritte) | Echte Prozess-Sequenz mit Eyebrow „So funktioniert's" und Foto (nur Anschnitt im gelesenen Slice). |

**Katalog-Lücken (offener Punkt, `stil-regeln.md` §4/S16):** Sektion 3
weicht vom `P-OFFER-PAIR`-Katalog ab (drei Karten statt „zwei gleich hohe
Leistungskarten"; das §4-Don't „Nicht drei generische Icon-Karten daraus
machen" ist hier nur teilentschärft, weil die Karten Produkt-Illustrationen
statt Icons tragen), Sektion 8 vom `P-PROCESS-3`-Katalog („Drei Schritte",
hier fünf). §4 verlangt, eine solche Lücke nach `art-direction.md` zu
schreiben; diese Studie ist kein Build und hat keine `art-direction.md` —
die beiden Lücken bleiben deshalb hier als offener Punkt geführt und
müssen bei jeder Übernahme des Musters in einen Build in dessen
`art-direction.md` eingetragen werden.

Unterseiten:

| Seite | Muster |
|---|---|
| `/waermepumpe/` | `P-HERO-PHOTO`: Backstein-Foto mit Wärmepumpe, oranger Eyebrow „Kostengünstig Heizen", weiße H1 „Die Wärmepumpe in Ihrem EKD365+ System", Lead-Absatz, ein oranger CTA „Jetzt beraten lassen!" — desktop und mobil deckungsgleich. Tiefer: Split Text/App-Screenshot (Ampere.IQ, orange Wortmarken im Fließtext, konkrete „bis zu 50 % Kosten"-Aussage), danach vollbreites echtes Wärmepumpen-Foto. |
| `/unternehmen/` | `P-HERO-PHOTO`: Monteur mit EKD-Hoodie vor PV-Modulen, Eyebrow „Über uns", H1 „Wir sind Energiekonzepte Deutschland", ein CTA „Zu unserer Vision". Tiefer: Stats-Band auf Warmgrau (45.000+ verbaute Solaranlagen / 90 Mio € Stromkostenersparnis pro Jahr — laut Label/Belegsatz eine jährliche Ersparnis der Kundschaft, keine Unternehmenskennzahl wie Umsatz — / 15+ offizielle Standorte, je mit Belegsatz) und `P-MAP`-Verwandter: orange Deutschlandkarte mit Standort-Markern und echten Foto-Bubbles (Monteure, Büro). |
| `/kundenerfahrungen/` | Hero als Foto-Collage echter Kunden/Anlagen rechts, links Eyebrow „Exklusive Einblicke", H1, ein CTA „Jetzt Kunde werden". Tiefer `P-TESTIMONIAL`: Case-Karte „Matthias aus Leipzig" — Videostandbild links, weiße Karte rechts mit Komponenten-Chips in Orange-Outline, Fließtext und großer Ersparnis-Zahl „176.620 € auf 30 Jahre" plus „Zur Kundenstory"; darunter Zitat-Sektion mit Anführungszeichen-Glyphe. |
| `/solaranlage/` | Ratgeber-Artikel, kein Landing-Muster: H1 „Solaranlagen: So finden Sie die Richtige!", Datumszeile, Artikelbild, Fließtext; mobil eine Near-Black-Info-Box (`#21262b`) „Solaranlage mit Stromspeicher…" mit orangem CTA „Jetzt Angebot anfordern" — Beleg, dass Content-Seiten dasselbe Header/CTA/Farb-System tragen. |

## 4. Raphael-Urteil

**Verdikt: GO** (Raphael, 31.08.2026). Stichpunkte aus den Shots, die das
Urteil tragen:

- Ehrlicher Proof im Fold: „4,2 von 5,0 aus über 1.800 Bewertungen" mit 4
  gefüllten Sternen — eine unbeschönigte echte Zahl statt Fake-5,0 (S9-N-konform).
- Beweis mit Messwerten: Testimonial-Case nennt 176.620 € Ersparnis auf 30
  Jahre, Stats-Band nennt 45.000+ Anlagen mit Belegsatz, Wärmepumpen-Copy
  nennt „bis zu 50 %" — Zahlen statt Adjektive.
- Extrem disziplinierte eine-Akzent-Palette: Orange `#ef870e` nur als
  Eyebrow, ein gefüllter CTA, Kreis-Pfeile und Chips; Flächen bleiben Weiß,
  Warmgrau und Foto (S1-konform in allen 16 gelesenen Shots).
- Ein wiedererkennbares Illustrations-System (isometrisches Haus mit orangen
  Leitungslinien) neben echten Fotos echter Monteure und Kunden.
- Jede Unterseite öffnet mit demselben Hero-Muster (Eyebrow orange, weiße
  H1 auf dunklem Foto, genau ein CTA) — hohe Systemtreue über alle 5 Routen.

## 5. Regel-Kandidaten

Keine neuen S-IDs vergeben (Regelbuch endet bei S18); neue Muster als
Prosa-Kandidaten, Synthese macht `regel-kandidaten.md`.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Bewertungs-Proof im Hero-Fold als echte, unbeschönigte Zahl: „4,2 von 5,0 Sternen aus über 1.800 Bewertungen" mit exakt 4 gefüllten Sternen, desktop wie mobil identisch platziert (Beleg: `/` 1440 `home-desktop-00-fold.png`; `/` 390 `home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Testimonial als Beweis-Karte: Vorname + Stadt als Titel, Komponenten-Chips in Akzent-Outline, große konkrete Ersparnis-Zahl „176.620 € / 30 Jahre" und Link zur vollen Kundenstory — Messwert statt Lobes-Adjektiv (Beleg: `/kundenerfahrungen/` 1440 `kundenerfahrungen__-desktop-03-y1500.png`) | S9/S9-N-Beleg + Prosa-Kandidat | GO | kandidat |
| Eine Akzentfarbe in genau drei Rollen — Eyebrow-Text, ein gefüllter CTA, Kreis-Pfeil-Buttons — konsistent über alle 5 Routen; einzige Akzent-Fläche ist die Deutschlandkarte als Illustration (Beleg: alle 5 Desktop-Folds 1440; `/unternehmen/` 1440 `unternehmen__-desktop-04-y2250.png`) | S1-Beleg | GO | kandidat |
| Identisches Sub-Hero-Muster auf jeder Unterseite: oranger Eyebrow, weiße H1 auf abgedunkeltem Echt-Foto, ein Lead-Absatz, genau ein oranger CTA (Beleg: `/waermepumpe/` 1440+390 `waermepumpe__-desktop-00-fold.png`/`-mobile-00-fold.png`; `/unternehmen/` 1440+390 `unternehmen__-desktop-00-fold.png`/`-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Stats-Band auf Warmgrau statt dunkel: drei große Zahlen mit Label und je einem konkreten Belegsatz darunter — keine nackten Zahlen; die Bezugsgrößen sind gemischt: 45.000+ verbaute Solaranlagen und 15+ offizielle Standorte sind Unternehmenskennzahlen, 90 Mio € ist laut Label „Stromkostenersparnis pro Jahr" der Kundschaft — die Zahlen nie ohne ihre Labels zitieren (Beleg: `/unternehmen/` 1440 `unternehmen__-desktop-04-y2250.png`) | — (Prosa-Kandidat) | GO | kandidat |

Rückverweis-Einträge in `stil-regeln.md` stehen aus — die pflegt die
zentrale Synthese (`regel-kandidaten.md`), nicht dieser Case.
