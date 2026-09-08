# Rolle: Kritik-Phase

Die Kritik-Phase prüft einen frischen Produktionsbuild und schreibt `KRITIK-n.md`. Sie ändert keinen Code. Der Parent liest keine PNG-Binaries.

## Start der Phase

```bash
node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs \
  --rolle kritik --client /root/clients/<kunde>/web/handoff
```

Exit 2: Plan oder `PRUEFGEGEN.md` fehlt. Zur Vorphase zurück.

## Pflichtfolge

1. `PLAN.md`, `PRUEFGEGEN.md`, `SEO-PAGE-MAP.json`, `DESIGN.md`, `STATUS.md` und die höchste `KRITIK-n.md` lesen.
2. Build-Frische belegen. Next.js-Standard: `SITE_URL=<url> npx next build`; bei statischem Export muss `out/` neu sein.
3. Produktionsbuild über `scripts/pruefstand.mjs` oder `raphael-preview` ausliefern.
4. Jede Route der Seitenkarte mit `curl` und `scripts/onpage-check.mjs` prüfen. h1, Fliesstext, Links, Titel und Canonical stehen im Response-HTML.
5. Deterministische Gates der betroffenen Achsen ausführen: axe, Formular, Tastatur, craft, motion, Werkzeugtabelle, DESIGN.md- und Komponentenherkunft.
6. `scripts/shot-sweep.mjs --base <url> --routes <liste> --out <dir> --static --mobile --states` ausführen. Manifest bindet Run-ID und Build-Revision.
7. `/root/tools/shots-verkleinern.sh <shot-dir>` erzeugt Originalmassstab-Kacheln. Pro Kritiker höchstens 12 Shots.
8. Genau einen Stufe-2-Kritiker anderer Familie nach `kritik-matrix.md` starten, `effort: high`.
9. Bericht prüfen: Provenienz, Blind-Vergleich, höchstens drei Findings, konkrete Belege und Retests.
10. `KRITIK-n.md` schreiben und Shot-Ledger aktualisieren.

## Kritikfolge

Der erste Durchlauf hat genau einen Kritiker. Weitere Kritiker oder `xhigh` laufen nur nach FAIL und nach einem neuen Bau mit frischem Sweep. Sol prüft nur Code/Backend und bekommt keine Bildpfade. Copy/SEO gehen an Grok oder Opus als Text-/HTML-Prüfung mit deterministischem Gate-Bericht.

## Build-Frische

Ein grüner Test gegen alte Dateien zählt nicht. Vor dem Sweep:

- Git-Revision und `out/`-Zeitstempel festhalten.
- `find app components lib -type f -newer out/index.html` muss leer sein oder der Build läuft erneut.
- Dynamisch importierte oder getrennt deployte Backend-Module mit Hash notieren.
- Domain und Preview müssen denselben Build ausliefern; Mixed-Revision-Evidenz ist keine Freigabe.

## Shot-Vertrag

- Desktop-Fold 1440×900 und Mobil 390×844 sind Pflicht.
- Fullpage dient nur dem Kontext; lesbare Viewports und Details sind Kritik-Input.
- Fonts und Bilder müssen geladen/dekodiert sein; laufende Animationen stabilisieren oder eine definierte Phase erfassen.
- Bei `@view-transition{navigation:auto}` headed unter `xvfb-run -a` oder `reducedMotion:'reduce'`, wenn nicht die Animation selbst geprüft wird.
- Leere async-Bildflächen in Fullpage-Captures zuerst als Capture-Verdacht behandeln und am Original prüfen.
- Nach jedem Fix alle betroffenen Shots ersetzen. Alte und neue Revision nie mischen.

## Merge und Klassen

Es gibt im ersten Durchlauf keinen Panel-Merge. Der einzelne Kritiker liefert `clear`, `miss-with-feedback` oder `escalate`. Die Klassen `visual-block`, `struktur-block`, `swap`, `content-park`, `ops-park`, `sweep-artefakt` kommen aus `kritik-matrix.md`.

Für deterministische Aussagen gilt die Regel (d) aus `kritik-matrix.md`: ohne Gate-Beleg parkt der Befund (`content-park`/`ops-park`) und geht nicht auf die Fixliste. Shot-Ledger-Spalten: `pfad | viewport | gelesen-von | verdict`.

| Linse | Beleg |
|---|---|
| SEO | kopierte Ausgabe aus `scripts/onpage-check.mjs` plus Response-HTML |
| Copy | `forbidden-check.py` und Copy-G1 mit Datei/Stelle |
| Trust | Zeile aus `PROOF.md` oder dokumentiertes Fehlen |
| Formular | echter Endpoint und Erfolg/Fehler; ein Toast allein belegt keine Zustellung |
| Komponenten | jede Datei in `components/ui/` einem Registry-Item oder einer Eigenbau-Begründung in `DESIGN.md` zugeordnet |

## `KRITIK-n.md`

Erste Zeile: `clear`, `miss-with-feedback` oder `escalate`. Danach:

- Builder-Familie, angefragter Kritiker, gelieferte Familie, Fallback, Effort.
- Build-Revision, Produktions-URL, Manifest-Pfad.
- Gelesene Shots und Referenzbilder.
- Deterministische Gates mit Exit-Code.
- Blind-Vergleich je Achse.
- Höchstens drei überlebende Findings mit Klasse, Beleg, Fix und Retest.
- Shot-Ledger: `pfad | viewport | gelesen-von | verdict`.

Bei `miss-with-feedback` geht die Fixliste an denselben Builder. Danach startet die Bau-Phase, baut, führt Gates und Sweep neu aus; erst die folgende Kritik darf einen zweiten Stufe-2-Kritiker nutzen.
