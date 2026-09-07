# Case: BRAUN Services (Umzug und Reinigung)

| Feld | Wert |
|---|---|
| Slug | `braun-services` |
| URL | `https://umzug-braun.ch` (belegt: `/root/clients/braun-services/website-plan/04-seo-plan.md:8`) |
| Sektor | `handwerk-local` — Dials 4 / 3 / 5 |
| Typ | House-Case |
| Datum der Studie | 30.08.2026 |
| Urteil | **GO-house-lock** |

Quelle der Wahrheit ist `/root/clients/braun-services/DESIGN.md` (Status:
verbindlich) plus der Code im Repo-Root. Alte Mockups und Branches sind keine
Quelle.

## 1. Capture

**Status: fehlt.** Es liegt kein Shot-Sweep vor. Dieser Case stützt sich auf
die gelockte `DESIGN.md`, nicht auf ein Bild. Er darf nicht als visueller
Beweis zitiert werden, bis der Sweep läuft:

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base https://umzug-braun.ch --out /tmp/muster-braun \
  --routes / --static --mobile
```

## 2. Tokens

| Token | Wert |
|---|---|
| Display-Font | Alternate Gothic Condensed A |
| Body-Font | Lato |
| Akzentfarbe | Orange (Aktionsfarbe, Token in `app/globals.css`) |
| Grundfläche | Creme (`--paper`) |
| Dunkle Fläche | warmes Schwarz (`--dark`) |
| Flächenstufen | genau vier: `--paper`, `--surface`, `--surface-deep`, `--dark` |
| Radii | genau vier: `--radius-sq` 8px, `--radius-card` 16px, `--radius-media` 22px, `--radius-pill` nur Marker |
| Spacing | zwei Stufen: `--sec-y` tragend, `--sec-y-eng` beantwortend |
| Motion-Easing | zwei Tokens: `--motion-out`, `--motion-in-out` |

Werte aus `DESIGN.md` §Marke, §Flächen und Rhythmus. Exakte HEX-Werte kommen
aus `app/globals.css`, nicht aus diesem Case.

## 3. Sektionen-Inventar (Startseite, aus DESIGN.md)

| # | Sektion | Pattern-ID | Wie gebaut |
|---|---|---|---|
| 1 | Home-Hero | `P-HERO-PHOTO` | Foto über die ganze Fläche, drei Verläufe in `--dark` mit je einer Aufgabe, genau eine gefüllte Hauptaktion im Fold. |
| 2 | Zwei Leistungen | `P-OFFER-PAIR` | Umzug und Reinigung als gleichwertige, gleich hohe Einstiege. Eine der drei erlaubten Karten-Stellen. |
| 3 | Ablauf | `P-PROCESS-3` | Echter Ablauf, trägt den Transporter als Motiv. |
| 4 | Galerie | `P-GALLERY` | Anderes Motiv als der Ablauf (S13). |
| 5 | Mittleres Aktionsband | `P-CTA-MID` | Fläche `surface`, nur die Aktion trägt Orange. |
| 6 | Kundenstimmen | `P-PROOF-STRIP` | Drei Stimmen, Google-Stimmen mit farbigem Google-G, Konsumentenbund-Siegel als Original. |
| 7 | Schluss | `P-CTA-END` | Eine vollorange Schlusssektion. |

## 4. Raphael-Urteil

**GO-house-lock.** Begründung aus der gelockten `DESIGN.md`:

- Die Seite soll wie ein geplanter Einsatz wirken, nicht wie ein
  Komponenten-Katalog. Karten sind ausdrücklich nicht das Standardmuster.
- Der Foto-Hero mit Zonen-Verläufen ist die abgenommene Hero-Sprache
  (20.08.2026). Er ersetzt den harten Split vom 11.08.
- Das mittlere Aktionsband kam aus einem Blindvergleich: Ohne mittlere Aktion
  musste ein überzeugter Besucher bis ans Seitenende scrollen.
- Ehrlich benannter Rest: Der gesamte Reinigungsbestand sind Handy-Fotos aus
  einem Hotel. Ein Editorial-Look für Reinigung braucht neue Aufnahmen.

**Überholt, nie wieder zitieren:**
- Harter Split „links flaches `--paper`, rechts Foto-Spalte mit harter Kante"
  (11.08.2026). Das Foto begann erst unter dem Header und schnitt einem
  Mitarbeiter den Kopf ab.
- Soft-Gradient, OKLAB-Staffel und warmer Wash im Home-Hero (abgelehnt
  11.08.2026).

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Karte nur zum Vergleichen gleich hoher Dinge | S2 | GO | verbindlich |
| Max eine dunkle Sektion plus eine Akzent-Schlusssektion | S3 | GO | verbindlich |
| Hauptaktion nie als Pille | S4 | NO-GO | verbindlich |
| Foto-Hero als Zonen-Verlauf in der Grundfarbe | S5 | GO | verbindlich |
| Kein Wash, keine OKLAB-Staffel, kein `color-mix` über Fotos | S5-N | NO-GO | verbindlich |
| Einmaliger Entrance, danach Ruhe | S6 | GO | verbindlich |
| Kein WebGL, kein Ken-Burns-Loop, kein Scroll-Scrub | S6-N | NO-GO | verbindlich |
| Kein Motiv zweimal in Folge-Sektionen | S13 | NO-GO | verbindlich |
| Mittleres Aktionsband bleibt ruhig | S17 | GO | bestätigt |
