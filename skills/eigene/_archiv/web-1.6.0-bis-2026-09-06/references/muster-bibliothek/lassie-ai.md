# Case: Lassie (AI-Backoffice für Zahnarzt- und Arztpraxen, USA)

| Feld | Wert |
|---|---|
| Slug | `lassie-ai` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` (Quelle, Auswahlgrund, Do-not-copy, Lizenz/Provenance, Status und Website-Evidence gefüllt und gelesen) |
| Quelle | `https://www.lassie.ai/` · abgerufen 02.09.2026 |
| Evidence | `lassie-ai/shots/` — gelesen: `home-desktop-00-fold.png`, `-03-y1500.png`, `-06-y3750.png`, `-08-y5250.png`, `-10-y6750.png`, `-14-y9750.png`, `-18-y12750.png`, `-22-y15759.png`, `-26-y18750.png`, `-28-y20250.png`, `-31-y22218.png`, `home-mobile-00-fold.png`, `-15-y5908.png`, `-22-y8573.png` |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (SaaS für Praxen; aus dem Seiteninhalt: Abrechnung, EFT-Abgleich, PMS-Buchung für Zahnarztpraxen — belegt in `home-desktop-28-y20250.png`) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Klärt, ob ein Fold ohne Argumentliste und Logo-Leiste trägt und ob eine Layering-/Scroll-Progress-Strecke Produktbeweis liefern kann, ohne App-Screenshots als Sektionsfläche zu zeigen. |
| Do-not-copy | Wortmarke, Blumen-Logo und Blumen-Bildwelt, die Praxis- und Arzt-Fotos (identifizierbare Personen, u. a. Dr. Eric Kwon / Grace Dental), die Schriften abcMarist und DM Sans in Lizenz, sämtliche Copy und alle Zahlen (2.500+, 98 %, Dollar-Beträge, Kassennamen). |
| Lizenz / Provenance | `ungeklärt` — Screenshots liegen nur intern als Studie in `lassie-ai/shots/`, selbst erzeugt am 02.09.2026 mit `muster-studie.mjs` / `shot-sweep.mjs`; keine Rechte an Fotos, Fonts oder Marke, keine Weiterverwendung ausserhalb dieser Bibliothek. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.

```bash
cd /root/raphael-skills/skills/eigene/web
node scripts/muster-studie.mjs --url https://www.lassie.ai/ --slug lassie-ai   # Exit 0, 44 Shots
node scripts/shot-sweep.mjs --base https://www.lassie.ai/ \
  --out references/muster-bibliothek/lassie-ai/shots --routes / --mobile        # Exit 0, Manifest auf 73 Shots
```

`muster-studie.mjs` reicht keinen `--mobile`-Schalter durch; der mobile
Pflicht-Viewport wurde deshalb mit einem zweiten `shot-sweep`-Lauf in denselben
Ordner nachgeholt (gleiches Vorgehen wie bei `ploy-ai`). Manifest:
`lassie-ai/shots/manifest.json`, base `https://www.lassie.ai`, eine Route `/`,
Status 200, keine `--static`-/`--states`-Profile. Kein Cloudflare-Block, kein
Cookie-Banner in den gelesenen Shots. Keine weitere Route erfasst.

Die Startseite ist rund 22.200 px hoch (Desktop 32 Slices, Mobil 23 Slices);
gelesen wurde eine Auswahl von 12 Shots nach Budget. Es liegen keine
`/small/`-JPGs vor, daher wurden die PNGs gelesen.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `lassie-ai/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `lassie-ai/shots/home-mobile-00-fold.png` | ja |
| Scroll-Serie Desktop | `home-desktop-03-y1500.png`, `-06-y3750.png`, `-08-y5250.png`, `-10-y6750.png`, `-14-y9750.png`, `-18-y12750.png`, `-22-y15759.png`, `-26-y18750.png`, `-28-y20250.png`, `-31-y22218.png` | ja (Auswahl) |
| Scroll-Serie Mobil | `home-mobile-15-y5908.png`, `home-mobile-22-y8573.png` | ja (Auswahl) |
| Klick-Serie FAQ | `home-desktop-click-y20250-00…06-*.png` | nein (nur Dateinamen ausgewertet) |
| Hover Navigation | `home-desktop-hover-00…03-*.png` | nein (nur Dateinamen ausgewertet) |

Nicht geprüft: die übrigen Desktop- und Mobil-Slices, Hover- und
Klick-Zustände als Bild, alle Unterseiten (`/company`, `/demo`, `/login`).

## 2. Tokens (maschinell, nicht geraten)

Quelle: `https://www.lassie.ai/_next/static/chunks/12_cj-6yrzn50.css` und
`3vzy0hf5fzbwt.css` (Next.js-Build, per curl geholt 02.09.2026), Custom
Properties und `font-family`-Regeln. Font-Dateien zusätzlich aus den
`<link rel=preload>`-Einträgen der Startseite.

| Token | Wert |
|---|---|
| Display-Font | `abcMarist` (Serif) — `--font-heading: var(--font-abc-marist), serif`; Fallback `Georgia, serif`; geladen als `abcmarist_book` und `abcmarist_bookitalic` (die Kursiv-Zeile im Fold ist ein eigener Schnitt, kein Oblique) |
| Body-Font | `dmSans` — `--font-body: var(--font-dm-sans), sans-serif`, Fallback `system-ui, sans-serif`; zusätzlich `dmMono` als `--font-mono` für Meta-, Zahlen- und Label-Zeilen |
| Akzentfarbe (HEX) | Keine klassische Akzentfarbe: die Aktion trägt Schwarz (`--color-surface-button-primary: var(--color-black-1000) #070503`). Farbe kommt nur als Fläche/Semantik: `--color-blue-200 #c3eaf4` (Wortmarken-Band), `--color-text-brand: var(--color-blue-600) #259bc6`, `--color-text-success: var(--color-green-700) #46a758` |
| Grundfläche | `--color-background-primary: var(--color-stone-100) #f9f8f5`; Karten `--color-surface-button-tertiary: var(--color-stone-200) #f8f6f2`, `--color-surface-quaternary: var(--color-stone-300) #f3f0e9`; Weiss `--color-core-white #fff` für FAQ- und Testimonial-Karten |
| Dunkle Fläche | Dark-Theme-Zweig deklariert (`--color-background-primary: var(--color-black-800) #1a1613`, `--color-background-tertiary: var(--color-black-900) #120c08`), auf den gelesenen Shots der Startseite nicht verwendet. Textfarbe hell: `--color-text-primary: var(--color-black-800) #1a1613` |
| Spacing-Skala | `--spacing: .25rem` als Basis-Schritt; zusätzlich grobe Sektions-Schritte `4rem` und `4.8rem`. Breakpoints `--breakpoint-tablet: 1024px`, `--breakpoint-desktop: 1280px`, `--breakpoint-desktopLarge: 1440px` |
| Radii | Token-Leiter `--radius-xs .125rem` / `sm .25rem` / `md .375rem` / `lg .5rem` / `3xl 1.5rem`; im Layout zusätzlich grosse Flächen-Radien `1.2 / 1.6 / 1.8 / 2.4 / 3.2 / 5.6 / 6.4 / 9.6rem` und `112px` für Pillen (Nav, CTA-Feld) |
| Schatten | Kein Schatten-Token deklariert; im CSS genau eine weiche Regel `box-shadow: 0 .978196px 11.7384px #00000014`. Flächen trennen über Ton, nicht über Schatten |

Nicht erhoben: OKLCH-Werte (die Seite deklariert HEX/`lab()`, kein OKLCH),
Typo-Stufen-Tokens in px (im CSS nicht als benannte Stufen ausgewiesen).

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas (Anordnung, Buttons, Typo, Farbe, Mobil je
Sektion): `lassie-ai/sektionen.md`.

Startseite `/`, Reihenfolge von oben. Pattern-IDs aus `../stil-regeln.md` §4;
wo kein Katalog-Pattern passt, steht ein benannter Kandidat.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Fold / Hero | Layering | `P-HERO-PHOTO` (Abweichung: Video statt Standbild, kein Verlaufs-Overlay) | Vollbild-Video einer echten Praxisszene ohne Overlay, darüber zentriert die zweizeilige Serif-H1 mit kursiver zweiter Zeile, zwei kleine Sans-Zeilen (eine davon mit Icon und laufender Zahl) und am Fold-Boden genau eine Pille aus E-Mail-Feld plus weissem Button mit schwarzer Schrift — kein zweiter CTA, keine Logo-Leiste (`home-desktop-00-fold.png`, `home-mobile-00-fold.png`). |
| 2 | Marken-Statement | Stack | — (Kandidat: Atem-Sektion) | Logo-Blume gross und mittig, darunter die zentrierte zweizeilige Serif-Headline auf Stone, sehr viel Luft, kein Button und kein Bild in der Sektion (`home-desktop-03-y1500.png`). |
| 3 | Produkt-Strecke | Layering/Parallax/Scroll-Progress | — (Kandidat: stehende Medienkarte mit wandernder Caption) | Eine grosse, stark abgerundete Medienkarte mit bewegungsunscharfem Naturbild bleibt beim Scrollen mittig stehen, darauf schwebt je ein kleines echtes UI-Fragment (Statuszeile „Lassie working…", Eingabefeld mit Senden-Pfeil), während die Serif-Caption von links nach rechts und zurück neben der Karte wandert — ohne Icons, Bullets oder CTA (`home-desktop-03-y1500.png`, `-06-y3750.png`, `-08-y5250.png`). |
| 4 | Stat-Band | Layering/Parallax/Scroll-Progress | — (Kandidat: Zahl als Bild mit treibenden Belegkarten) | Eine sehr grosse zentrierte Serif-Prozentzahl ist selbst das Bild (kein Diagramm), darum treiben mit unterschiedlichem Tempo echte Produkt-UI-Karten mit Klarnamen, krummen Dollar-Beträgen und Zeitstempeln sowie kleine Foto-Kacheln — der Versatz zwischen zwei Slices belegt den Parallax (`home-desktop-10-y6750.png`, `-14-y9750.png`). |
| 5 | Verbreitungs-Karte + Testimonial | Layering | `P-MAP`-Variante + `P-TESTIMONIAL` | Zentrierte Serif-Headline mit konkreter Nutzerzahl über einer Punktraster-Karte der USA (helles Raster als Land, dunkle Punkte als Standorte, keine Grenzen, keine Beschriftung); beim Weiterscrollen legt sich eine weisse Testimonial-Karte darüber: Porträtfoto links, Serif-Zitat mit nachprüfbarer Stundenersparnis rechts, unten Klarname und Praxisname als Mono-Chip (`home-desktop-18-y12750.png`, `-22-y15759.png`). |
| 6 | Testimonial-Carousel mobil | Band | `P-TESTIMONIAL` | Auf 390 wird dieselbe Sektion zum horizontal angeschnittenen Karten-Carousel (zweite Karte ragt sichtbar in den Rand), darunter ein dunkler Pill-Button mit Video-Thumbnail und Play-Dreieck zur Videostory eines namentlich genannten Arztes (`home-mobile-15-y5908.png`). |
| 7 | „How Lassie works" | Raster | `P-PROCESS-3` | Zentrierte Serif-Headline über drei gleichhohen Stone-Karten, in denen je ein gestapeltes UI-Bruchstück des Arbeitsschritts durch dünne Linien und Status-Chips (`Enrolled`, `Payment connected`, `Claims reconciled`) verkettet ist; Schritt-Titel und Beschreibung stehen ausserhalb der Kartenfläche darunter, ohne 01/02/03-Marker und ohne Pfeile (`home-desktop-26-y18750.png`, `-28-y20250.png`). |
| 8 | FAQ | Akkordeon | `P-FAQ` | Sehr grosse zentrierte Serif-Überschrift über einer schmalen mittigen Spalte aus sieben einzelnen weissen Karten mit Abstand und Chevron rechts — keine durchgehende Linienliste (`home-desktop-28-y20250.png`, Klick-Serie `home-desktop-click-y20250-00…06`). |
| 9 | Schluss-CTA | Band | `P-CTA-END` | Ein abgerundetes Vollbreiten-Band mit warmem Blumen-Nahaufnahme-Foto als Fläche, darauf zentriert die zweizeilige Serif-Headline in Weiss und exakt dieselbe E-Mail-plus-Button-Pille wie im Fold (`home-desktop-31-y22218.png`, `home-mobile-22-y8573.png`). |
| 10 | Footer | Split | — | Links die Marken-Headline erneut zweizeilig mit Kursiv-Zeile plus ein einzelner dunkler Pill-Button, rechts drei schmale Linkspalten mit grauen Überschriften, darunter mittig Logo-Blume und zweizeiliges Mono-Copyright mit Ortsangabe (`home-desktop-31-y22218.png`). |
| 11 | Wortmarken-Abschluss | Band | — (Kandidat: Wortmarken-Sockel) | Ein hellblaues Band (`#c3eaf4`) trägt den Markennamen als überformatiges weisses Serif-Wort, unten angeschnitten; darunter folgt kein Inhalt mehr, auf Desktop wie mobil identisch (`home-desktop-31-y22218.png`, `home-mobile-22-y8573.png`). |

**Navigation (global, alle Slices):** eine schwebende, horizontal zentrierte
Pillen-Gruppe statt einer Vollbreiten-Leiste — Logo-Blume in eigener Pille,
danach drei Pillen, die letzte in Stone gefüllt; mobil unverändert dieselbe
Gruppe ohne Burger-Menü (`home-desktop-00-fold.png`, `-18-y12750.png`,
`home-mobile-00-fold.png`).

## 4. Raphael-Urteil

**Verdikt:** GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)

**Essenz (max. 3 Sätze).** Die Seite verkauft ein Backoffice-Produkt ohne einen
einzigen App-Screenshot als Sektionsfläche: Produktbeweis kommt als kleines,
echt wirkendes UI-Fragment, das über einem bewegungsunscharfen Naturbild
schwebt, und als treibende Belegkarten mit Klarnamen, krummen Dollar-Beträgen
und Zeitstempeln um eine grosse Serif-Zahl (`home-desktop-06-y3750.png`,
`-10-y6750.png`, `-14-y9750.png`). Der ganze Funnel hat exakt einen Einstieg —
dieselbe E-Mail-plus-Button-Pille im Fold und im Schluss-Band, dazwischen über
rund 22.000 px kein konkurrierender CTA (`home-desktop-00-fold.png`,
`-31-y22218.png`). Reichweite und Einzelbeleg stehen in einer Sektion
übereinander: Punktraster-Karte mit Nutzerzahl, darüber die Testimonial-Karte
mit Porträtfoto, Klarname und Praxisname (`home-desktop-22-y15759.png`).

**Do-not-copy.** Marke: Wortmarke „Lassie", die Blumen-Logomarke und der
überformatige Wortmarken-Sockel im hellblauen Band. Fotos: alle Praxis-,
Arzt- und Patientenaufnahmen (identifizierbare Personen, u. a. Dr. Eric Kwon /
Grace Dental) sowie die Blumen-Bildwelt als Marken-Signatur. Text: sämtliche
Headlines, Captions, FAQ-Fragen und alle Zahlen (2.500+, 98 %, Dollar-Beträge,
Kassen- und Personennamen) — Zahlen sind Belege dieses Unternehmens und werden
nie übernommen. Ebenfalls nicht übernehmbar: die lizenzierten Schriften
abcMarist und DM Sans in dieser Paarung als Wiedererkennung.

**Lizenz / Provenance.** `ungeklärt`. Die Screenshots in `lassie-ai/shots/`
sind am 02.09.2026 selbst erzeugt und liegen ausschliesslich intern als
Studienmaterial in dieser Bibliothek; keine Rechte an Marke, Fotos oder Fonts,
keine Veröffentlichung, keine Weitergabe, keine Verwendung im Kundenbau. Der
Case bleibt damit `kandidat`.

**Status aller Regel-Kandidaten:** `kandidat`.

**Spannungen zum Regelbuch** (für die Synthese, kein Urteils-Override):

- Das Video-Hero trägt keinen Zonen-Verlauf; weisse Serif-Headline und
  hellgraue Subline stehen direkt auf dem bewegten Bild
  (`home-desktop-00-fold.png`) — Spannung zu **S5**, zugleich Deckung mit
  **S5-N** (kein Wash, kein Farbschleier über dem Foto).
- Der Primär-CTA ist Teil einer Pille mit `border-radius: 112px`; im Footer
  steht er als abgerundeter Block (`home-desktop-31-y22218.png`) — Spannung zu
  **S4**.
- Die Produkt- und Stat-Strecken sind Scroll-gebundene Layering-/Parallax-
  Sektionen über mehrere Bildschirmhöhen (`home-desktop-06-y3750.png` gegen
  `-14-y9750.png`) — Spannung zu **S6** (einmalige Eintritts-Animation) und
  **S6-N**; ob Reduced-Motion bedient wird, ist aus statischen Shots
  `nicht geprüft`, nach `../ui-layouts-catalog.md` aber Pflicht.
- Fläche und Typo liegen nahe am gesperrten Cream-plus-Serif-Default
  (`#f9f8f5` Stone plus durchgehende Serif) — Spannung zu **S12**; die Seite
  entgeht ihm nur, weil kein Terracotta-Akzent existiert und die Aktion
  schwarz ist.
- Die drei „How Lassie works"-Karten sind ein Drei-Karten-Raster
  (`home-desktop-28-y20250.png`) — Nähe zu **S14**, aber jede Karte trägt ein
  eigenes UI-Bruchstück statt eines Icons, und die Schritte sind eine echte
  Sequenz ohne 01/02/03-Marker (Deckung mit **S11**).
- Deckung mit **S9** und **S9-N**: echte Menschen in Fold, Testimonial und
  Foto-Kacheln, Zahlen mit Klarname und Praxis statt selbstgebauter Sterne.

## 5. Regel-Kandidaten

Jede Beobachtung bleibt hier Kandidat. Eintrag in `../stil-regeln.md` erst nach
Raphaels Begründungssatz und erfüllter Lizenz-/Provenance-Lage; der Eintrag
verweist dann auf diese Datei zurück.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Genau ein Einstieg über die ganze Seite: dieselbe Pille aus E-Mail-Feld und weissem Button im Fold und im Schluss-Band, dazwischen über rund 22.000 px kein konkurrierender CTA; der Footer wiederholt den Button allein und dort in Schwarz (Beleg: `home-desktop-00-fold.png`, `home-desktop-31-y22218.png`, `home-mobile-00-fold.png`, `home-mobile-22-y8573.png`) | Bezug **S1**, Spannung **S4** | GO | kandidat |
| Produktbeweis ohne App-Screenshot als Sektionsfläche: die Medienkarte zeigt ein bewegungsunscharfes Naturbild, darauf schwebt nur ein kleines echtes UI-Fragment mit Kassenname und laufendem Vorgang — die Software wird angedeutet, nicht ausgestellt (Beleg: `home-desktop-03-y1500.png`, `-06-y3750.png`, `-08-y5250.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Zahl als Bild: die grosse zentrierte Serif-Prozentzahl ersetzt jedes Diagramm, die Glaubwürdigkeit liefern treibende Karten mit Klarnamen, krummen Dollar-Beträgen und Zeitstempeln statt einer Statistik-Grafik (Beleg: `home-desktop-10-y6750.png`, `-14-y9750.png`) | Bezug **S9-N** (Positivseite) | GO | kandidat |
| Reichweite und Einzelbeleg in einer Sektion: Punktraster-Karte mit Nutzerzahl als Fläche, darüber gelegt die Testimonial-Karte mit Porträtfoto, Klarname und Praxisname als Mono-Chip — statt getrennter Karten- und Testimonial-Sektion (Beleg: `home-desktop-18-y12750.png`, `-22-y15759.png`, mobil `home-mobile-15-y5908.png`) | Bezug **S9**, **S13** | GO | kandidat |
| Prozess-Karten tragen UI-Bruchstücke statt Icons: drei gleichhohe Stone-Karten mit gestapelten, durch Linien und Status-Chips verketteten Belegfragmenten, Titel und Beschreibung ausserhalb der Kartenfläche, ohne 01/02/03-Marker und ohne Pfeile (Beleg: `home-desktop-26-y18750.png`, `-28-y20250.png`) | Bezug **S2**, **S11**, Spannung **S14** | GO | kandidat |
| Ein Kursiv-Schnitt als einzige typografische Betonung: die zweite Headline-Zeile in Fold und Footer steht in einem echten Serif-Kursiv-Schnitt (`abcmarist_bookitalic`), sonst gibt es keine Farb-, Fett- oder Grössen-Hervorhebung im Titel (Beleg: `home-desktop-00-fold.png`, `-31-y22218.png`, `home-mobile-00-fold.png`) | Bezug **S20**, **S23** | GO | kandidat |
| Schwarz als Aktionsfarbe statt Akzentfarbe: `--color-surface-button-primary` ist `#070503`, Farbe erscheint nur als Fläche (`#c3eaf4`-Wortmarken-Band) oder als Semantik (Grün für Erfolgszustände) — die Seite kommt ohne Marken-Akzentfarbe aus (Beleg: CSS `12_cj-6yrzn50.css`; sichtbar `home-desktop-31-y22218.png`, `-28-y20250.png`) | Bezug **S1** | GO | kandidat |
| Schwebende Pillen-Navigation statt Vollbreiten-Leiste, mobil unverändert ohne Burger-Menü — dieselbe Gruppe über Video, Stone und Punktkarte (Beleg: `home-desktop-00-fold.png`, `-18-y12750.png`, `home-mobile-00-fold.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Wortmarken-Sockel als Seitenabschluss: ein hellblaues Band trägt den Markennamen als überformatiges, unten angeschnittenes Serif-Wort nach dem Footer, Desktop und mobil identisch (Beleg: `home-desktop-31-y22218.png`, `home-mobile-22-y8573.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Layering-/Parallax-Strecken über mehrere Bildschirmhöhen als tragendes Sektions-Prinzip; nach `../ui-layouts-catalog.md` Premium-Ausnahme mit Reduced-Motion-Pflicht, die hier aus statischen Shots nicht belegbar ist (Beleg: `home-desktop-06-y3750.png` gegen `-14-y9750.png`) | Spannung **S6**, **S6-N** | offen (nicht geprüft) | kandidat |
