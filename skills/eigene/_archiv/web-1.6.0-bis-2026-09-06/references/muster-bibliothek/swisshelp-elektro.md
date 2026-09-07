# Case: Swisshelp Elektro

| Feld | Wert |
|---|---|
| Slug | `swisshelp-elektro` |
| Quelle | `/root/clients/swisshelp/DESIGN.md`, Stand 20.06.2026 |
| Sektor | `handwerk-local` — Dials 4 / 3 / 5 |
| Typ | House-Case |
| Datum der Studie | 30.08.2026 |
| Urteil | **GO-house-lock** |

Besonderheit: Die Startseite (`public/index.html` plus
`public/styles/home-original.css`) ist die **vom Kunden abgenommene
Referenz**. Alle anderen Seiten sehen genau so aus. Es wird nichts Neues
erfunden; die Werte der Startseite werden in ein geteiltes System gezogen.

Das macht diesen Case zum saubersten Beleg für Systemdisziplin: eine
Button-Familie, eine Typo-Skala, ein Header, ein Footer.

## 1. Capture

**Status: fehlt.** Kein Shot-Sweep vorhanden. Referenz-Viewports für die
spätere Studie sind laut `DESIGN.md` §10 ohnehin gesetzt: 1440 / 1000 / 375
als Einbau-Probe pro Bildstelle.

## 2. Tokens (aus `src/styles/global.css`)

| Token | Wert | Einsatz |
|---|---|---|
| `--color-rot` | `#e11d2a` | Akzent, nur sparsam: ein Punkt, ein Primär-Button, ein Eyebrow-Strich |
| `--color-rot-dunkel` | `#a0151f` | Hover auf rot |
| `--color-bg` | `#f4f2ee` | heller Hintergrund, Standard |
| `--color-bg-dark` | `#0e0e10` | dunkle Sektionen, Footer, dunkle Cards |
| `--color-text` | `#0e0e10` | Text auf hell |
| `--color-text-soft` | `#555555` | Fliesstext, Lead, Sekundäres |
| `--color-line` | `#d5d2cc` | Linien, Rahmen, Trenner |
| `--font-display` | Darker Grotesque | alle Headlines und grosse Zahlen |
| `--font-body` | IBM Plex Sans | Fliesstext, Lead |
| `--font-mono` | IBM Plex Mono | Eyebrows, Labels, Button-Caps |
| `--nav-h` | 72px | ein Token, sitewide, jede erste Sektion hält per `var(--nav-h)` Platz frei |
| Container | max 1280–1320px, Innenabstand `clamp(20px, 4vw, 56px)` |
| Sektionsabstand | `clamp(64px, 9vw, 128px)` |
| Karten-Radius | 4px |

**Typo-Skala, eine Klasse pro Stufe:** `.eyebrow`, `.h1`, `.h2`, `.h3`,
`.lead`, Body. Keine seitenlokalen `.au-h1`, `.sd-h1`, `.dl-h1` mehr.

**Button-Familie, genau eine:** `.btn-primary`, `.btn-secondary`,
`.btn-outline-dark`, `.btn-outline-light`. Alle gleich hoch, gleicher
Innenabstand (`14px 24px`), Mono ~12–13px uppercase, **keine runden Ecken**.
Ein gebrandeter Pfeil-Stil überall.

## 3. Sektionen-Inventar (Section-Frame §7)

| # | Sektion | Pattern-ID | Wie gebaut |
|---|---|---|---|
| 1 | Hero (dunkel) | `P-HERO-PHOTO` | Dunkler Startseiten-Hero, Header dunkel und deckend, nahtloser Übergang. Erste Sektion hält `var(--nav-h)` frei. |
| 2 | Leistungen | `P-OFFER-PAIR` | Ruhige Rahmen, 4px Radius, klare Hover-Tiefe, kein lokaler Button-Stil. |
| 3 | Referenz/Bilder | `P-GALLERY` | Personen immer echtes Foto aus dem Shooting `assets-original/_AMA*.jpg`. |
| 4 | Abschluss-CTA | `P-CTA-END` | Dunkler Block oder klare rote Primär-Aktion, immer dieselbe Button-Familie. |
| 5 | Kontakt | `P-CONTACT` | Kontaktdaten zuletzt (G1). |

Sektionskopf-Reihenfolge ist fix: erst `.eyebrow`, dann genau eine passende
`.h1` oder `.h2`, dann `.lead`.

## 4. Raphael-Urteil

**GO-house-lock.** Begründung:

- „Rot ist Akzent, nie Vollfläche. Keine zweite Akzentfarbe." Klarster S1-Beleg
  im Bestand.
- „Pro Seite genau EINE `.h1`." Klarster S10-Beleg.
- Die dokumentierte Wurzel von „unordentlich" waren drei konkurrierende Header
  (React-`Header.tsx` über `Base.astro`, andere Nav in `Site.astro`, dritte
  Nav auf der Startseite). Ein Header sitewide hat das gelöst.
- Ton: formelles „Sie", kurze Sätze, echte Umlaute, Schweizer ss, **keine
  Em-Dashes**, keine Preise, kein Geschwurbel.

**Ausdrücklich nicht:** keine Proof-Zahlen, keine Stern-Widgets, keine
Testimonial-Slider, kein roter „Ansprechperson"-Balken, keine zweite Schrift,
keine runden Buttons auf einer Seite und scharfe auf der nächsten.

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Eine Akzentfarbe, nie Vollfläche, keine zweite | S1 | GO | verbindlich |
| Dunkel-Hell-Rhythmus, Rot nie als grosse Fläche | S3 | GO | verbindlich |
| Keine runden Ecken auf Buttons | S4 | NO-GO | verbindlich |
| Personen immer echtes Foto, nie KI | S9 / S9-N | GO / NO-GO | verbindlich |
| Genau eine H1 pro Seite | S10 | GO | verbindlich |
| Keine Stern-Widgets, keine Proof-Zahlen | S9-N | NO-GO | verbindlich |
| Eine Button-Familie sitewide, kein lokaler Button-Stil | — | House-Lock | Button-Familie ist kein S14 |
