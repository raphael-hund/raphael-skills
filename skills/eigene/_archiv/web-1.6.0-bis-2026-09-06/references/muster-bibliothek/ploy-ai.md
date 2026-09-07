# Case: Ploy (KI-Marketing-Plattform / AI Website Builder, B2B-SaaS)

| Feld | Wert |
|---|---|
| Slug | `ploy-ai` |
| Status | `kandidat` |
| Belegschwelle | `erfüllt` |
| Quelle | `https://ploy.ai/` — abgerufen 02.09.2026 |
| Evidence | `ploy-ai/shots/` (Manifest `shots/manifest.json` Desktop, `shots/manifest-mobile.json` Mobil); 12 gelesene Shots, Tabelle in §1 |
| Evidence-Typ | Website |
| Frame-Beleg | `n/a` (Website-Capture) |
| Sektor | `b2b-dienst` (SaaS-Marketing-Plattform, englischsprachig, Self-Serve-Funnel „Start Free"; nicht `handwerk-local`) |
| Typ | Extern |
| Datum der Studie | 02.09.2026 |
| Auswahlgrund | Offene Frage, wie eine Seite ohne Foto-Beweis und ohne Trust-Siegel Charakter erzeugt: Ploy trägt die Wirkung allein über eine kondensierte Display-Schrift, vier benannte Marken-Farbflächen und 3D-Objekte, die sich mit der Typo verschränken. Prüfstein für S1 (eine Akzentfarbe), S3 (eine dunkle Sektion), S14 (Card-Soup) und S20/S23 (Typo-Stufen). |
| Do-not-copy | Wortmarke `ploy` und ihre 3D-Ballon-Ausformung, die Lizenz-Schrift **FK Screamer** (kommerzielle Lizenz nötig, kein Google-Font), sämtliche 3D-Renderobjekte, das Hero-Video, die Kundenlogo-Reihe, die Autoren-Portraits im PloyBooks-Slider und jeder Text der Seite. Übernehmbar ist nur das strukturelle Prinzip, nie ein Asset und nie ein Satz. |
| Lizenz / Provenance | `ungeklärt` — Urheber der Seite: Ploy (Firmenseite, kein Impressum geprüft). Screenshots in `ploy-ai/shots/` sind eigene Captures vom 02.09.2026, **nur intern als Studie**; keine Weitergabe, keine Veröffentlichung, kein Asset-Reuse. Die abgebildeten Marken (FK Screamer, Kundenlogos, Autorenfotos) sind fremd. |
| Urteil | GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen) |

Die Belegschwelle ist erfüllt: Quelle, Auswahlgrund, Do-not-copy,
Lizenz/Provenance, Status und Website-Evidence sind gefüllt und gelesen.
Weil Lizenz/Provenance `ungeklärt` bleibt, bleibt der Status `kandidat`;
der Case ist als visueller Beleg zitierbar, aber kein Asset daraus.

## 1. Capture

Befehl (Desktop, exit 0):

```bash
node /root/raphael-skills/skills/eigene/web/scripts/muster-studie.mjs \
  --url https://ploy.ai/ --slug ploy-ai
```

Der Wrapper reicht `--mobile` nicht durch (`muster-studie.mjs` ruft
`shot-sweep.mjs` fest mit `--base --out --routes /` auf), das Manifest
meldet daher `mobile: false`. Der Pflicht-Viewport `390×844` wurde
deshalb in einem zweiten Lauf direkt mit `shot-sweep.mjs` erfasst
(exit 0) und in dasselbe `shots/`-Verzeichnis gelegt:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base https://ploy.ai/ --out …/ploy-ai/shots-mobile \
  --routes / --mobile --no-interact
```

Gesamt 68 PNG plus zwei Manifeste, nur Route `/`. Keine weiteren Routen
erfasst. Kein `/small/`-Verzeichnis vorhanden, daher PNG gelesen.
In allen Shots steht links unten der Cookie-Banner („Accept" /
„Decline"), er verdeckt jeweils die untere linke Ecke.

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 Fold | `ploy-ai/shots/home-desktop-00-fold.png` | ja |
| Mobil 390×844 Fold | `ploy-ai/shots/home-mobile-00-fold.png` | ja |
| Scroll Desktop y750 | `ploy-ai/shots/home-desktop-02-y750.png` | ja |
| Scroll Desktop y2250 | `ploy-ai/shots/home-desktop-04-y2250.png` | ja |
| Scroll Desktop y3750 | `ploy-ai/shots/home-desktop-06-y3750.png` | ja |
| Scroll Desktop y5250 | `ploy-ai/shots/home-desktop-08-y5250.png` | ja |
| Scroll Desktop y6750 | `ploy-ai/shots/home-desktop-10-y6750.png` | ja |
| Scroll Desktop y7500 | `ploy-ai/shots/home-desktop-11-y7500.png` | ja |
| Scroll Desktop y8250 | `ploy-ai/shots/home-desktop-12-y8250.png` | ja |
| Scroll Desktop y9067 (Footer-Ende) | `ploy-ai/shots/home-desktop-14-y9067.png` | ja |
| Scroll Mobil y2954 | `ploy-ai/shots/home-mobile-08-y2954.png` | ja |
| Übrige Scroll-Slices Desktop (`-01`, `-03`, `-05`, `-07`, `-09`, `-13`) | `ploy-ai/shots/` | nein |
| Hover-Serie (20 Shots) und Click-Serie (2 Shots) | `ploy-ai/shots/home-desktop-hover-*`, `-click-*` | nein |
| Übrige Mobil-Slices (29 Shots) | `ploy-ai/shots/home-mobile-*` | nein |

Zwölf Shots gelesen (Budget 12). Nicht geprüft: Hover- und Aktiv-Zustände,
offene Nav-Dropdowns, Video-Wiedergabe, Slider-Interaktion, sämtliche
Unterseiten.

## 2. Tokens (maschinell, nicht geraten)

Quelle: `https://ploy.ai/_ploy_static/_astro/_slug_.DU78Icx9.css`
(Astro-Build, per curl am 02.09.2026 extrahiert; Custom Properties und
`@font-face`-Regeln). Nichts geraten.

| Token | Wert |
|---|---|
| Display-Font | `--font-heading: FK Screamer` (variabel 100–900, gesetzt via `@font-face` von `cdn.ploy.ai`); Defaults `--font-heading-weight: 700`, `--font-heading-bold-weight: 800`, `--font-heading-line-height: 1.2`, `--font-heading-letter-spacing: -.02em` |
| Body-Font | `--font-body: Geist` (variabel 100–900, selbst gehostet `/fonts/geist-variable-*.woff2`); `--font-body-weight: 400`, `--font-body-bold-weight: 600`, `--font-body-line-height: 1.5`, `--font-body-letter-spacing: -.02em`. Button-/Eyebrow-Font separat: `system-ui, sans-serif, -apple-system`, `--font-button-weight: 500`, `--font-button-line-height: 1` |
| Akzentfarben (HEX) | Vier gleichrangige Marken-Töne, keine Leitfarbe: `--ploy-brand-yellow: #fffa64`, `--ploy-brand-pink: #ffb8fc`, `--ploy-brand-green: #d1f48c`, `--ploy-brand-blue: #c3dbff`. Nebentöne `--ploy-brand-yellow-warm: #f4ef4c`, `--ploy-brand-green-bright: #d1f864`, `--ploy-brand-blue-light: #e7f1ff` |
| Grundfläche | `--ploy-background-primary: #f4f4f4`, Karten/Sekundär `--ploy-background-secondary: #fff`; Text `--ploy-text-primary: #212121`, `--ploy-text-secondary: #555`, `--ploy-text-tertiary: #21212199` |
| Dunkle Fläche | Dark-Token-Satz: `--ploy-background-primary: #000`, `--ploy-background-secondary: #080808`, `--ploy-surface-dark: #3c3c3c`, Border `--ploy-border-primary: #3d3d3d`. Der gerenderte Footer misst `#212121` (= `--ploy-text-primary` als Fläche invertiert) |
| Spacing-Skala | `--spacing: .25rem` als Basiseinheit (Tailwind-v4-Raster, alle Abstände als Vielfache); Container-Stufen `--container-xs 20rem` … `--container-7xl 80rem` |
| Radii | Basis `--radius: .625rem`; Rollen-Aliase `--radius-button: 100rem` (= Vollpille), `--radius-card: .75rem`, `--radius-input: .375rem`; Skala `--radius-xs .125` / `-sm .25` / `-md .375` / `-lg .5` / `-xl .75` / `-2xl 1` / `-3xl 1.5rem` |
| Schatten | Kein flächiger Default-Schatten; drei gestufte weiche Schatten alle relativ zur Textfarbe über `color-mix`: `0 .12em .3em …12%`, `0 .7em 1.15em …22%`, `0 4px 12px …8%, 0 20px 44px …`. Fokus-Ring separat `0 0 0 3px bg, 0 0 0 5px text` |
| Typo-Skala | `--font-size-xs .76rem` · `sm .875` · `base 1` · `lg 1.125` · `xl 1.25` · `2xl 1.3` · `3xl 1.875` · `4xl 2.25` · `5xl 3` · `6xl 3.75` · `7xl 4.5` · `8xl 6` · `9xl 8rem` |
| Reduced Motion | Genau **eine** `@media (prefers-reduced-motion)`-Regel im gesamten Site-CSS (357 989 Bytes) — für die Layering-Sektionen zu wenig belegt, siehe §4 |

## 3. Sektionen-Inventar

Detaillierter Sektions-Atlas mit Anordnung, Typo, Farbe und Mobil-Verhalten
je Sektion: `ploy-ai/sektionen.md`.

Startseite `/`, Reihenfolge von oben. Layout-Familie je Sektion aus
`../ui-layouts-catalog.md` §Sektions-Layout-Familien.

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | Navbar | Band | — | Schwebende weisse Pillen-Leiste über dem Hero, Wortmarke links, sechs Textlinks mittig, rechts das Pillen-Paar „Log in" (weiss) + „Start Free" (schwarz); in allen sieben gelesenen Desktop-Scroll-Shots unverändert sticky an derselben Stelle (`home-desktop-00-fold.png` bis `-14-y9067.png`). |
| 2 | Hero | Layering | `P-HERO-PHOTO`-Variante (Video statt Foto, kein Verlauf) | Vollflächiges Büro-Video in einem gerundeten Container mit sichtbarem Rand zum Viewport, darüber zentriert eine dreizeilige weisse Versal-H1 in FK Screamer, zweizeilige Subline und ein CTA-Paar aus gefüllter weisser Pille + weisser Outline-Pille; kein Siegel, keine Zahl und kein Play-Knopf im Fold (`home-desktop-00-fold.png`) — der runde Play-Knopf sitzt unten rechts im Video-Container und wird erst unterhalb der Falz sichtbar (`-02-y750.png`). |
| 3 | Kundenlogo-Leiste | Band | `P-PROOF-STRIP` | Kleine graue Zeile über neun grauen Wortmarken in einer Reihe, die rechts angeschnitten weiterläuft (Marquee), ohne Kästen, Rahmen oder Karten auf der Grundfläche `#f4f4f4` (`home-desktop-02-y750.png`). |
| 4 | Problem-Sektion | Layering | — (Kandidat: Typo-Durchdringung) | Zweizeilige Versal-Headline, deren erste Zeile schwarz **vor** einem lime 3D-Objekt und deren zweite Zeile hellgrau **hinter** demselben Objekt liegt; darunter eine zentrierte Subline und eine dreispaltige Textleiste auf einer weissen Fläche mit Trennlinien statt drei Einzelkarten (`home-desktop-02-y750.png`). |
| 5 | Pink-Panel „Metriken" | Band + Raster | — (Kandidat: Farbpanel mit überstehendem Karten-Raster) | Vollbreites gerundetes Panel in `#ffb8fc` mit Radial-Verlauf, links oben die Versal-Headline mit einem rosa 3D-Objekt vor dem Zeilenanfang, rechts ein Erklärabsatz, darunter drei gleich hohe weisse Karten mit je Produkt-Badge, sehr grosser Kennzahl (8 / 472 / $10K), farbiger Sparkline, Statuszeile und drei Mikro-Kennzahlen — die Karten ragen unten über die Panel-Kante hinaus (`home-desktop-04-y2250.png`). |
| 6 | Gelb-Panel „Agent-Feed" | Layering | — (Kandidat: Headline als Rahmen um den Inhalt) | Vollbreites gerundetes Panel in `#fffa64`, dessen Headline in zwei Hälften zerlegt ist (erste Hälfte oben links, zweite unten rechts) und zwei weisse System-Benachrichtigungs-Karten mit Uhrzeit, farbiger Kategorie-Pille, @-Handle-Meldezeile und Erklärsatz einrahmt (`home-desktop-04-y2250.png`, `-06-y3750.png`). |
| 7 | Blau-Panel „PloyBooks" | Band + Raster | `P-TESTIMONIAL`-nah (Autoren statt Kunden) | Vollbreites gerundetes Panel in `#c3dbff`, Versal-Headline mit einem hellblauen 3D-Blüten-Objekt zwischen zwei Wörtern, rechts Erklärabsatz plus Pfeil-Paar, darunter ein rechts angeschnittener Karten-Slider, dessen Karten unter einer Trennlinie einen Autoren-Fuss mit rundem Portrait-Foto und Klarnamen tragen (`home-desktop-06-y3750.png`). |
| 8 | „One platform, three engines" | Layering | — (Kandidat: verstreute Wortkomposition) | Vier Versalwörter über die volle Fläche verteilt (oben links, Mitte rechts, unten links, unten rechts) um einen zentralen Cluster aus vier durchscheinenden 3D-Objekten in Blau, Gelb, Grün und Pink, die die Wörter teilweise verdecken; darunter drei Produkt-Spalten auf weisser Fläche mit Trennlinien, je Wortmarke + Badge, Dreiwort-Claim und Bulletliste mit Punkten in der jeweiligen Produktfarbe (`home-desktop-08-y5250.png`). |
| 9 | „Who's Ploy for?" | Split + Akkordeon | `P-FAQ`-Mechanik auf Zielgruppen | Links dunkle Pillen-Badge als Eyebrow und eine Headline in der **Body**-Schrift (die einzige H2 der Seite ohne Display-Schrift), rechts drei gestapelte Karten mit sichtbaren Eck-Punkten: die oberste in `#c3dbff` aufgeklappt mit vier Bulletpoints und CTA-Paar (schwarze Pille + unterstrichener Textlink), die beiden darunter zugeklappt mit nur Versal-Titel und einem Satz (`home-desktop-10-y6750.png`, `-11-y7500.png`). |
| 10 | Abschluss-CTA | Stack | `P-CTA-END` (ohne Akzentfläche) | Auf der normalen Grundfläche eine zweizeilige, seitenweit gesetzte schwarze Versal-Headline — die grösste Type der Seite —, darunter Subline und eine weisse Karte mit Eck-Punkten, in der eine Pillen-Eingabe die schwarze Pille „Start Free →" eingebettet trägt, darunter eine kleine graue Bedingungszeile (`home-desktop-11-y7500.png`, `-12-y8250.png`). |
| 11 | Footer | Stack | — | Gerundetes dunkles Panel `#212121` mit Rand zum Viewport: oben die Wortmarke als vier grosse 3D-Ballon-Buchstaben in Blau, Pink, Grün und Gelb (jede Marken-Farbe genau einmal), dann Firmenzeile + Pfeil-Textlink, nach einer Linie ein eigener Block mit fünf Outline-Pillen (ChatGPT, Claude, Google AI Mode, Grok, Perplexity) als LLM-Zusammenfassungs-Ziel, dann ein fünfspaltiges Linkraster, eine Integrations-Reihe aus 30 Textlinks mit Mittelpunkt-Trennern und die Rechtszeile (`home-desktop-12-y8250.png`, `-14-y9067.png`). |

Mobil `390×844` (`home-mobile-00-fold.png`, `home-mobile-08-y2954.png`):
Die Nav schrumpft auf eine Pille aus Hamburger + Wortmarke plus die
schwarze „Start Free"-Pille, „Log in" entfällt. Das Hero-Video läuft
randlos bis an die Viewport-Kanten statt wie im Desktop mit Rand, die H1
steht linksbündig statt zentriert und bricht auf fünf Zeilen. Im
Pink-Panel stapeln die drei Metrik-Karten vertikal und die Mikro-Kennzahlen
klappen aus der Reihe in eine Label-über-Wert-Liste; die Kennzahlen zeigen
dort andere Werte als im Desktop-Shot (5 statt 8, +26 % statt +28 %) — die
Zahlen zählen also hoch und sind kein statischer Wert.

## 4. Raphael-Urteil

**Verdikt: GO 02.09.2026** (Raphael-Liste; Begründungssatz offen — der
folgende Text ist Agenten-Struktur aus den Shots, kein Urteilstext.)

**Essenz (max. 3 Sätze, belegt am Shot):** Ploy erzeugt Charakter ohne
einen einzigen Trust-Beweis, indem eine einzige kondensierte
Display-Schrift in Versalien jede Sektionsheadline trägt und 3D-Objekte
sich physisch mit dieser Typo verschränken — Buchstaben liegen mal vor,
mal hinter demselben Objekt (`home-desktop-02-y750.png`,
`-08-y5250.png`). Die vier Marken-Farben sind nicht Akzent, sondern
ganze gerundete Panels, die je genau eine Sektion einfärben und in fester
Reihenfolge durchlaufen (Pink → Gelb → Blau,
`home-desktop-04-y2250.png`, `-06-y3750.png`), während jede Aussage über
das Produkt als Produkt-Artefakt gezeigt wird statt als Behauptung:
Metrik-Karten mit Sparkline, System-Benachrichtigungen mit Uhrzeit und
@-Handle, Bulletlisten pro Engine (`-04-y2250.png`, `-08-y5250.png`).
Der Abschluss-CTA verzichtet auf jede Akzentfläche und trägt allein über
Typo-Grösse plus ein Ein-Feld-Formular (`-11-y7500.png`, `-12-y8250.png`).

**Do-not-copy:** Marke `ploy` und die 3D-Ballon-Wortmarke im Footer
(`home-desktop-12-y8250.png`); die Lizenzschrift **FK Screamer** (CDN-Font,
kommerzielle Lizenz nötig); sämtliche 3D-Renderobjekte; das Hero-Video
(`home-desktop-00-fold.png`); die neun Kundenlogos
(`home-desktop-02-y750.png`); die Autoren-Portraits und Klarnamen im
PloyBooks-Slider (`home-desktop-06-y3750.png`); jeder Text der Seite.
Übernehmbar ist nur das strukturelle Prinzip.

**Lizenz / Provenance:** `ungeklärt`. Screenshots in `ploy-ai/shots/`
sind eigene Captures vom 02.09.2026 und ausschliesslich intern als
Studie zu verwenden — keine Weitergabe, keine Veröffentlichung, kein
Asset-Reuse. Deshalb bleibt der Status `kandidat`.

**Status aller Regel-Kandidaten in §5:** `kandidat`.

**Spannungen zum Regelbuch** (für die Synthese, kein Urteils-Override,
jede an einem Shot belegt):

- **S1** (genau eine Akzentfarbe, nie als Vollfläche): Ploy hat vier
  gleichrangige Marken-Töne als benannte Tokens und setzt drei davon als
  vollflächige Panels ein (`home-desktop-04-y2250.png`,
  `-06-y3750.png`). Das ist die klare Gegenposition zum Regelbuch.
- **S3** (höchstens eine dunkle Sektion und eine Akzent-Schlusssektion):
  drei Akzent-Panels in Folge plus dunkler Footer
  (`-04-y2250.png`, `-06-y3750.png`, `-12-y8250.png`). Gegenbeleg —
  gehalten wird es nur, weil zwischen den Panels je eine helle Sektion
  auf `#f4f4f4` liegt (`-08-y5250.png`).
- **S8** (gesperrte Fonts): `--font-body: Geist` steht auf der
  S8-Sperrliste; die Display-Schrift FK Screamer steht nicht darauf.
- **S9** (echte Fotos echter Menschen) / **S9-N** (keine Fake-Sterne):
  Auf der ganzen Startseite gibt es kein Menschenfoto ausser drei
  Mini-Portraits im Slider (`-06-y3750.png`) — dafür aber auch keine
  Sterne, keine Bewertungszahl und kein Siegel. S9-N wird also nicht
  verletzt, S9 aber auch nicht erfüllt.
- **S14** (keine generische Card-Soup aus drei Icon-Karten): Ploy löst
  das Dreier-Muster viermal, aber nie als Icon-Karten-Raster — zweimal
  als Spaltenleiste mit Trennlinien statt Kästen (`-02-y750.png`,
  `-08-y5250.png`), einmal als Karten, die jede eine eigene Kennzahl mit
  Sparkline tragen (`-04-y2250.png`), einmal als Akkordeon
  (`-10-y6750.png`). Positivbeleg für S14.
- **S4** (Primär-CTA nie als Pille): Ploy baut alles als Vollpille —
  `--radius-button: 100rem` als Token, sichtbar in Nav, Hero und
  Abschluss-Formular (`-00-fold.png`, `-12-y8250.png`). Gegenbeleg.
- **S23** (Typo-Stufen müssen sich um ~20 % unterscheiden): Ploy löst das
  nicht über Grösse, sondern über den Schriftschnitt — Poster-Headlines in
  der kondensierten Versal-Display-Schrift, Sektionsheadlines derselben
  Ebene in der Body-Schrift (`-10-y6750.png` gegen `-11-y7500.png`).
  Zwei Lautstärken, aber gemischte Ebenen: die H2 „Who's Ploy for?" steht
  in der Body-Schrift, die Karten-Titel darunter in der Display-Schrift.
- **Layering-Reduced-Motion-Pflicht** (`ui-layouts-catalog.md`): Vier der
  elf Sektionen sind Layering; im gesamten Site-CSS steht genau **eine**
  `prefers-reduced-motion`-Regel. Nach Katalog-Regel ist das ohne
  Reduced-Motion-Beleg ein Fail, kein Geschmacksstreit — hier als offener
  Punkt notiert, nicht als geprüftes Verhalten (Motion wurde nicht
  gemessen, nur statische Shots).

## 5. Regel-Kandidaten

Alle Beobachtungen sind an einen Shot-Pfad gebunden und bleiben
`kandidat`. Kein Eintrag in `../stil-regeln.md` und keine neue S-ID aus
dieser Datei — das macht der Integrator nach Raphaels Begründungssatz.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Ein Farb-Panel pro Sektion statt einer Akzentfarbe: drei vollflächige gerundete Panels in fester Reihenfolge Pink `#ffb8fc` → Gelb `#fffa64` → Blau `#c3dbff`, jeweils durch eine helle Sektion auf `#f4f4f4` getrennt, alle vier Töne als benannte `--ploy-brand-*`-Tokens (Beleg: `home-desktop-04-y2250.png`, `-06-y3750.png`, `-08-y5250.png`) | **S1-Gegenbeleg**, **S3-Gegenbeleg** | NO-GO nach heutigem Regelbuch, als Muster GO | kandidat |
| 3D-Objekt und Versal-Typo durchdringen sich: dieselbe Headline liegt teils vor, teils hinter demselben Objekt (schwarze Zeile vorn, hellgraue Zeile dahinter), und vier Versalwörter werden um einen Objekt-Cluster über die volle Fläche verteilt statt zentriert gesetzt (Beleg: `home-desktop-02-y750.png`, `-08-y5250.png`) | — (Prosa-Kandidat: Typo-Durchdringung) | GO | kandidat |
| Das Dreier-Muster viermal ohne Icon-Karten-Raster gelöst: zweimal Spalten mit Trennlinien statt Kästen, einmal Karten, die jede eine eigene grosse Kennzahl mit Sparkline und drei Mikro-Kennzahlen tragen, einmal Akkordeon mit nur einer offenen Karte (Beleg: `home-desktop-02-y750.png`, `-04-y2250.png`, `-08-y5250.png`, `-10-y6750.png`) | **S14-Positivbeleg** | GO | kandidat |
| Produkt-Beweis als Produkt-Artefakt statt als Claim: System-Benachrichtigungskarten mit Uhrzeit, farbiger Kategorie-Pille und @-Handle-Meldezeile ersetzen den Feature-Absatz; die Kennzahlen zählen hoch (Desktop 8 / +28 %, Mobil 5 / +26 % im selben Feld) (Beleg: `home-desktop-04-y2250.png`, `-06-y3750.png`, `home-mobile-08-y2954.png`) | — (Prosa-Kandidat) | GO | kandidat |
| Zwei Typo-Lautstärken über den Schnitt statt über die Grösse: Poster-Headlines in kondensierten Versalien (FK Screamer), Sektionsheadlines derselben Ebene in der Body-Schrift (Geist) — die Ebenen mischen sich aber, die H2 steht in Body-Schrift, die Karten-Titel darunter in Display-Schrift (Beleg: `home-desktop-10-y6750.png` gegen `-11-y7500.png`) | **S23-Spannung**, S20-nah | gemischt | kandidat |
| Schluss-CTA ohne Akzentfläche: die grösste Type der Seite auf normaler Grundfläche, darunter eine weisse Karte mit einem Ein-Feld-Formular, dessen Absende-Pille in der Eingabe sitzt, plus eine kleine Bedingungszeile — kein farbiges Schlussband (Beleg: `home-desktop-11-y7500.png`, `-12-y8250.png`) | `P-CTA-END`-Variante, **S3-nah** | GO | kandidat |
| Footer als eigenes gerundetes dunkles Panel mit Rand zum Viewport, das die Wortmarke einmal gross in allen vier Marken-Farben zeigt und einen eigenen LLM-Block mit fünf Outline-Pillen (ChatGPT, Claude, Google AI Mode, Grok, Perplexity) als Zusammenfassungs-Ziel trägt (Beleg: `home-desktop-12-y8250.png`, `-14-y9067.png`) | — (Prosa-Kandidat: AEO-Footer) | GO | kandidat |
| Alles ist Vollpille: `--radius-button: 100rem` als Token, sichtbar in Nav-Leiste, beiden Hero-CTAs, der Nav-Pille mobil und der Formular-Eingabe (Beleg: `home-desktop-00-fold.png`, `-12-y8250.png`, `home-mobile-00-fold.png`) | **S4-Gegenbeleg** | NO-GO nach Regelbuch | kandidat |
| Vier Layering-Sektionen von elf, aber genau eine `prefers-reduced-motion`-Regel im gesamten Site-CSS (357 989 Bytes) — nach `ui-layouts-catalog.md` §Sektions-Layout-Familien ohne Reduced-Motion-Beleg ein Fail; Motion selbst wurde nicht gemessen (Beleg: CSS-Extrakt §2, Sektionen 2/4/6/8 in §3) | Layering-Pflicht (Katalog) | NO-GO | kandidat |
