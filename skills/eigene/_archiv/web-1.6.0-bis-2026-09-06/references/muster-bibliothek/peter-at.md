# Case: peter.at

| Feld | Wert |
|---|---|
| Slug | `peter-at` |
| URL | `https://www.peter.at/` |
| Sektor | `ads-lp` (nächstliegend: PV-Direktvertrieb als Conversion-Funnel; keine exakte Sektor-ID vorhanden) |
| Typ | Extern |
| Datum der Studie | 31.08.2026 |
| Urteil | GO |

**Stamp: GO (Raphael, 31.08.2026).**

## 1. Capture

Bestehende Captures vom 31.08.2026 unter
`/root/raphael-skills/skills/eigene/web/references/muster-bibliothek/peter-at/shots/`
(shot-sweep-Standard: Fold 1440×900 und 390×844, danach 1440×1500 @ 750 px
Scroll; Quelle `manifest.json` im selben Ordner). Kein fullPage. Seiten:
`/` (home), `/erfahrungen`, `/uber-peter-at`, `/anfragen`, `/kontakt` —
jeweils Desktop und Mobil.

| Shot | Pfad (relativ zu `peter-at/shots/`) | gelesen? |
|---|---|---|
| Home Desktop-Fold | `home-desktop-00-fold.png` | ja |
| Home Mobil-Fold | `home-mobile-00-fold.png` | ja |
| Home Scroll | `home-desktop-02-y750.png`, `home-desktop-06-y3750.png`, `home-desktop-13-y9000.png`, `home-desktop-16-y10697.png` | ja |
| Erfahrungen Desktop-Fold | `erfahrungen-desktop-00-fold.png` | ja |
| Erfahrungen Mobil-Fold | `erfahrungen-mobile-00-fold.png` | ja |
| Erfahrungen Scroll | `erfahrungen-desktop-05-y3000.png`, `erfahrungen-desktop-09-y6000.png` | ja |
| Über-uns Desktop-Fold | `uber-peter-at-desktop-00-fold.png` | ja |
| Über-uns Mobil-Fold | `uber-peter-at-mobile-00-fold.png` | ja |
| Über-uns Scroll | `uber-peter-at-desktop-04-y2250.png`, `uber-peter-at-desktop-08-y5250.png` | ja |
| Anfragen Desktop-Fold | `anfragen-desktop-00-fold.png` | ja |
| Anfragen Mobil-Fold | `anfragen-mobile-00-fold.png` | ja |
| Anfragen Scroll | `anfragen-desktop-02-y750.png` | ja |
| Kontakt Desktop-Fold | `kontakt-desktop-00-fold.png` | ja |
| Kontakt Mobil-Fold | `kontakt-mobile-00-fold.png` | ja |
| Übrige Scroll-Slices (Zwischenbereiche) | restliche `*-y*.png` | nein — nicht geprüft |

Sektionsweise Design-Dokumentation aller fünf Seiten (Anordnung, Buttons,
Typo, Farbe, Abstände, Mobil) im Sektions-Atlas
`peter-at/sektionen.md`.

## 2. Tokens (maschinell, nicht geraten)

Kein CSS-/DevTools-Extrakt durchgeführt — alle Zellen `nicht geprüft`.
Sichtbare (nicht extrahierte) Farb-Eindrücke stehen als Prosa darunter.

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

Aus den Shots sichtbar (kein Token, nur Beobachtung): genau eine Akzentfarbe,
ein warmes Gelb, ausschliesslich auf CTA-Buttons, kleinen Badges und
Akzent-Zeilen in Headlines; Grundflächen Weiss und ein sehr dunkles
Schwarz; einzige mehrfarbige Fläche ist der schmale Countdown-Banner
(Verlauf violett→orange) ganz oben. Primär-CTA ist ein Rechteck mit kleinem
Eckenradius, keine Pille (`home-desktop-00-fold.png`).

## 3. Sektionen-Inventar

Reihenfolge von oben nach unten, nur belegte Sektionen; nicht gelesene
Zwischenbereiche sind als Lücke markiert. Pattern-IDs aus `stil-regeln.md` §4.

### Home (`/`)

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 0 | Countdown-Banner „peter Power Week endet in" über dem Header | — (keine Katalog-ID; Prosa unten) | Schmale Verlaufszeile mit Tages/Std/Min/Sek-Zähler, sitewide auf jeder Seite und beiden Viewports (`home-desktop-00-fold.png`, `kontakt-mobile-00-fold.png`). |
| 1 | Hero: Foto/Render Haus mit PV bei Dämmerung, Text links, ein gelber CTA, drei ProvenExpert-Siegel unten rechts | `P-HERO-PHOTO` | Vollflächiges Motiv, dunkle Zone hinter der Textspalte, genau ein gefüllter CTA im Fold (`home-desktop-00-fold.png`). |
| 2 | „Österreichs Partner #1 / für nachhaltige Energie": drei offene Textspalten + Produkt-Slider (Panel, Speicher, Wallbox in Kreisen) | — (offene Typo-Spalten, keine Karten; S2-konform) | Weisse Fläche, zweizeilige Headline mit grauer zweiter Zeile, drei Spalten ohne Card-Rahmen (`home-desktop-02-y750.png`). |
| — | y1500–3600: nicht gelesen | | |
| 3 | „peters Erfolgsgeschichten": Kunden-Foto-Carousel mit Orts-Badges auf Schwarz | `P-TESTIMONIAL` | Echte Kundenfotos (Selfies auf dem eigenen Dach) mit Ortsnamen als gelbe Badges, Dots + Pfeile (`home-desktop-06-y3750.png`). |
| — | y5250–8900: teilweise nicht gelesen | | |
| 4 | Drei Feature-Spalten (Eigenverbrauch, Preissignal, Smart steuern) + App-Screen | — (offene Spalten) | Text-Spalten ohne Karten neben Produkt-Screenshot (`home-desktop-13-y9000.png`, oberer Teil). |
| 5 | „In 3 einfachen Schritten zur Photovoltaikanlage" auf dunklem Haus-Motiv | `P-PROCESS-3` | Echte Sequenz (Rechner → Beratung → Installation) mit 1/2/3-Markern und CTA rechts (`home-desktop-13-y9000.png`). |
| 6 | „Werde zum Held der österreichischen Energiewende" auf Schwarz, gelber CTA | `P-CTA-END` | Schlusssektion: Fläche bleibt dunkel, nur der Button trägt die Akzentfarbe (`home-desktop-16-y10697.png`). |
| 7 | Footer: Linkspalten, Siegel-Reihe, Adresse, riesige „peter.at"-Wortmarke als Abschluss | — (Footer, keine Katalog-ID) | Die Wortmarke füllt als Schlussbild die volle Breite (`home-desktop-16-y10697.png`). |

### Erfahrungen (`/erfahrungen`)

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Hero: echtes Familienfoto vor Haus mit PV, „peter Hero Stories", ein CTA | `P-HERO-PHOTO` | Foto-Hero mit Textspalte links und einem gelben CTA (`erfahrungen-desktop-00-fold.png`, `erfahrungen-mobile-00-fold.png`). |
| 2 | Video-Testimonial-Grid: YouTube-Embeds, je Karte kWp/kWh-Spec, Zitat, „Bis zu … € Ersparnis auf 30 Jahre", Familienname + Ort | `P-TESTIMONIAL` | Drei Spalten gleicher Struktur, echte Namen und Orte, konkrete Anlagen- und Ersparniszahlen statt Sternen (`erfahrungen-desktop-05-y3000.png`). |
| 3 | „Ausgezeichnet und offizieller Partner von": ProvenExpert-Siegel + Partner-Logos (DAH Solar, Raiffeisen) | `P-PROOF-STRIP` | Original-Bildmarken in ruhiger Kachelreihe auf Weiss (`erfahrungen-desktop-09-y6000.png`). |

### Über uns (`/uber-peter-at`)

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Hero: Monteur-Foto auf dem Dach, „Österreichs Energiezukunft beginnt bei peter.", ein CTA | `P-HERO-PHOTO` | Foto-Hero, dunkle Zone für die Textspalte, ein gelber CTA (`uber-peter-at-desktop-00-fold.png`). |
| 2 | „Energie neu gedacht": Mission als reiner Textblock | — (Typo-Sektion) | Weisser Text auf Schwarz, keine Karten (`uber-peter-at-mobile-00-fold.png`, unterer Teil). |
| 3 | Weisse Karte „Mit peter.at investierst du …" mit gelbem CTA mittig | `P-CTA-MID` | Ruhiges Aktionsband: Fläche bleibt hell, nur der Button trägt Farbe — deckt sich mit S17 (`uber-peter-at-desktop-04-y2250.png`). |
| 4 | „Österreichs Partner #1"-Spalten + Event-Sektion (peter.at x DAH Solar) | — (Wiederverwendung der Home-Sektion) | Dieselbe Drei-Spalten-Typo-Sektion wie auf Home (`uber-peter-at-desktop-04-y2250.png`). |
| 5 | Produkt-Explosionsgrafik: Haus-Isometrie mit Labels peter.solar/pro/cool/storage/heat/charge | — (Prosa-Kandidat, siehe §5) | Produktsystem als beschriftete Isometrie statt Icon-Karten (`uber-peter-at-desktop-08-y5250.png`). |
| 6 | „Ausgezeichnet und offizieller Partner von" | `P-PROOF-STRIP` | Identische Siegel-/Logo-Reihe wie auf Erfahrungen (`uber-peter-at-desktop-08-y5250.png`). |

### Anfragen (`/anfragen`)

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | Funnel-Header: keine Navigation, stattdessen „Bereits 71921 PV-Anfragen gestellt" | — (Prosa-Kandidat, siehe §5) | Reduzierter Header nur mit Logo und Live-Zähler als Social Proof (`anfragen-desktop-00-fold.png`). |
| 2 | Multi-Step-Formular: Fortschrittsbalken, Schritt 1 = Bundesland-Auswahl als Kachel-Klick; drei Checkmark-Trustpunkte darüber | `P-CONTACT` | Mikro-Commitment zuerst (ein Klick aufs Bundesland), Kontaktdaten kommen später — nie E-Mail als erstes Feld (`anfragen-desktop-00-fold.png`, `anfragen-mobile-00-fold.png`). |
| 3 | „Partner Hersteller"-Logoleiste (DAH, Huawei, LONGi, Trina, Fronius) + Telefon/E-Mail | `P-PROOF-STRIP` | Original-Herstellerlogos als Beruhigung direkt unter dem Funnel (`anfragen-desktop-02-y750.png`). |

### Kontakt (`/kontakt`)

| # | Sektion | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|
| 1 | „Sag Servus!": links Text + Telefon/E-Mail, rechts Formular (Vorname → Nachname → E-Mail → Telefon → Nachricht) | `P-CONTACT` | Split aus Ansprache und Formular; erstes Feld ist der Vorname, nicht die E-Mail (`kontakt-desktop-00-fold.png`, `kontakt-mobile-00-fold.png`). |

## 4. Raphael-Urteil

**Verdikt:** GO (Raphael, 31.08.2026)

Raphael hat nur den GO-Stempel geliefert, keine Begründung. Die folgenden
Punkte sind vom Agenten beobachtete Stärken aus den Shots — kein erfundenes
Raphael-Zitat:

- Ein einziger, wörtlich identischer Primär-CTA („Jetzt Ersparnis berechnen")
  zieht sich durch Header, Hero, Mittelbänder und Schlusssektion.
- Genau eine Akzentfarbe (Gelb), nie als Vollfläche — nur Buttons, Badges
  und Headline-Akzentzeilen.
- Beweis statt Behauptung: echte ProvenExpert-Siegel, echte Herstellerlogos,
  Video-Testimonials mit Namen, Ort, Anlagengrösse und Euro-Zahlen.
- Der Anfrage-Funnel entfernt die Navigation und startet mit einem
  Ein-Klick-Mikro-Commitment (Bundesland) statt einem Datenfeld.
- Offene Typo-Spalten statt Icon-Karten-Raster in den Erklärsektionen.

## 5. Regel-Kandidaten

Keine neuen S-IDs — das Regelbuch endet bei S18. Die Zeilen sind
Prosa-Kandidaten mit Beleg; die Synthese und ID-Vergabe pflegt die zentrale
Sammlung `regel-kandidaten.md`, nicht diese Datei.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Zweizeilige Headline mit abgestufter zweiter Zeile: Zeile 1 in Textfarbe, Zeile 2 in Akzent-Gelb (auf dunkel) oder Grau (auf hell) — wiederkehrend auf jeder Seite. Beleg: home Desktop `home-desktop-13-y9000.png` („In 3 einfachen Schritten / zur Photovoltaikanlage"), kontakt Desktop `kontakt-desktop-00-fold.png` („Sag Servus! / Und kontaktiere uns"), uber-peter-at Desktop `uber-peter-at-desktop-04-y2250.png`. | — (ID via regel-kandidaten.md) | GO | kandidat |
| Ein wörtlich identischer Primär-CTA sitewide: „Jetzt Ersparnis berechnen" in Header, Hero und Schlusssektion, immer gelb gefüllt mit Pfeil, immer als einziges gefülltes Element im Viewport. Beleg: home Desktop `home-desktop-00-fold.png`, home Desktop `home-desktop-16-y10697.png`, uber-peter-at Desktop `uber-peter-at-desktop-08-y5250.png`. | — | GO | kandidat |
| Funnel-Seite ohne Navigation: `/anfragen` ersetzt das Menü durch einen Zähler („Bereits 71921 PV-Anfragen gestellt") und beginnt mit einer Ein-Klick-Bundesland-Auswahl plus Fortschrittsbalken — kein Datenfeld im ersten Schritt. Beleg: anfragen Desktop `anfragen-desktop-00-fold.png`, anfragen Mobil `anfragen-mobile-00-fold.png`. | — | GO | kandidat |
| Testimonials tragen harte Zahlen statt Sterne: jedes Video-Testimonial zeigt kWp/kWh der Anlage, „Bis zu X € Ersparnis auf 30 Jahre" und Familienname + Ort. Beleg: erfahrungen Desktop `erfahrungen-desktop-05-y3000.png` (z.B. „Bis zu 110.869 €, Familie Prerost aus Biedermannsdorf, 10.1 kWp / 10.2 kWh"). | — | GO | kandidat |
| Riesige Wortmarke als Seitenabschluss: der Footer endet auf allen Seiten mit dem viewportbreiten „peter.at"-Schriftzug als letztes Element. Beleg: home Desktop `home-desktop-16-y10697.png`, anfragen Desktop `anfragen-desktop-02-y750.png`. | — | GO | kandidat |

Weitere Prosa-Kandidaten ohne Tabellenzeile: die Produkt-Isometrie mit
beschrifteten Systemteilen (`uber-peter-at-desktop-08-y5250.png`) als
Alternative zu Icon-Karten; der permanente Countdown-Banner
(`home-desktop-00-fold.png`) ist ein Aktionsdruck-Muster, dessen
GO/NO-GO-Einordnung Raphael nicht einzeln gestempelt hat — `nicht geprüft`.

**Nicht geprüft:** Tokens (kein CSS-Extrakt), nicht gelesene Scroll-Slices
(siehe §1), Hover-/Motion-Verhalten (nur statische Shots).
