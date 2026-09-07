# Case: <Name der Seite>

> Kopie dieser Datei nach `<slug>.md`. Jede Rubrik wird gefüllt. Leere Rubrik
> heisst „nicht geprüft", nie PASS.

| Feld | Wert |
|---|---|
| Slug | `<slug>` |
| Status | `kandidat` bis zu Raphaels Urteil und erfüllter Belegschwelle |
| Belegschwelle | `offen` / `erfüllt` |
| Quelle | Kanonische URL plus Abrufdatum oder `Screenshot in /root/eingang/<datei>`; bei Video zusätzlich Video-ID |
| Evidence | Gelesene Capture-/Screenshot-/Frame-Pfade; visuellen Befund direkt an Pfad und Zeitmarke binden |
| Evidence-Typ | Website / Screenshot / Video-Frame |
| Frame-Beleg | Quelle plus Zeitmarke und Frame-Pfad; `n/a` nur bei Website-Capture |
| Sektor | `handwerk-local` / `kita` / `tanz-community` / `ads-lp` / `b2b-dienst` / `clone-parity` |
| Typ | House-Case (eigener Kunde) oder Extern |
| Datum der Studie | TT.MM.JJJJ |
| Auswahlgrund | Welche offene Art-Direction-Entscheidung dieser Case verändert |
| Do-not-copy | Konkrete Originalitätsgrenze |
| Lizenz / Provenance | Lizenzstatus `belegt` / `ungeklärt` plus Urheber, Herkunft oder Bezugspfad; ungeklärt bleibt kandidat |
| Urteil | ausstehend / GO / NO-GO / gemischt / GO-house-lock |

Die Belegschwelle ist erst `erfüllt`, wenn Quelle, Auswahlgrund, Do-not-copy,
Lizenz/Provenance, Status und die zum Evidence-Typ gehörenden Belege vollständig
gefüllt und gelesen sind. Ein visueller Claim ohne Frame-Beleg bleibt
unbestätigt. Ohne Raphael-Urteil **oder** erfüllte Belegschwelle bleibt der Case
`kandidat`; ein Agent setzt weder GO noch einen verbindlichen Stil-Default.

## 1. Capture

**Pflicht-Viewports:** `1440×900` (Desktop-Fold) und `390×844` (mobil).
Danach `1440×1500` @ 750 px Scroll, sequentiell pro Seite.
**Kein `fullPage` als Kritik-Input** — fullPage höchstens als Übersichts-Anhang.
Derselbe Standard wie `shot-sweep.mjs`. Bei einem Video-Frame ersetzt der
Frame-Beleg den Live-Capture nicht pauschal: Quelle, Zeitmarke, Frame-Pfad und
die sichtbare Beobachtung werden direkt gebunden.

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base <URL> --out /tmp/muster-<slug> --routes / --static --mobile
```

| Shot | Pfad | gelesen? |
|---|---|---|
| Desktop 1440×900 | `…/desktop-fold.png` | ja/nein |
| Mobil 390×844 | `…/mobile-fold.png` | ja/nein |
| Scroll-Serie | `…/scroll-*.png` | ja/nein |

Jedes PNG wird per `Read` angesehen. Ein Grep im Quelltext ersetzt keinen Shot.

## 2. Tokens (maschinell, nicht geraten)

| Token | Wert |
|---|---|
| Display-Font | |
| Body-Font | |
| Akzentfarbe (OKLCH/HEX) | |
| Grundfläche | |
| Dunkle Fläche | |
| Spacing-Skala | |
| Radii | |
| Schatten | |

Quelle der Werte nennen: `globals.css`, `@theme`, DevTools-Extrakt oder
`muster-studie.mjs`. Geraten ist kein Token.

## 3. Sektionen-Inventar

Reihenfolge von oben nach unten. Pattern-ID aus `stil-regeln.md` §4.
Layout-Familie: genau eine aus **Split / Stack / Band / Raster / Akkordeon /
Layering-Parallax-Scroll-Progress** (Liste und Reduced-Motion-Pflicht der
letzten: `../ui-layouts-catalog.md` §Sektions-Layout-Familien).

| # | Sektion | Layout-Familie | Pattern-ID | Wie gebaut (1 Satz) |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

## 4. Raphael-Urteil

**Verdikt:** ausstehend / GO / NO-GO / gemischt / GO-house-lock

3–5 Stichpunkte, warum. Raphael liefert kurz, der Agent strukturiert. Ein
Agent erfindet hier kein Urteil. `ausstehend` hält den Status auf `kandidat`.

- …
- …
- …

## 5. Regel-Kandidaten

Jede Beobachtung bleibt zunächst hier als Kandidat. Erst Raphaels Urteil und
die Belegschwelle aus `../video-evidence-contract.md` erlauben einen Eintrag in
`stil-regeln.md`; der Eintrag verweist auf diese Datei zurück.

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| | S… | GO / NO-GO | kandidat / bestätigt / verbindlich |
