# VENDORING — fremder Code und fremdes Wissen in diesem Skill

Zwei Referenzen dieses Skills sagen seit ihrer Entstehung „vollständige
Attribution in `VENDORING.md` dieses Skills" zu. Die Datei gab es nicht —
gefunden am 30.07.2026 durch die Verweis-Prüfung in
`evals/run-verweise-check.mjs`.

Das ist kein Schönheitsfehler. Bei MIT-Lizenz ist die Attribution die
*Bedingung* der Nutzung, und 114 vendorierte Dateien lagen ohne den Lizenztext
im Repo. Ein Versprechen auf eine nicht existierende Datei liest sich wie eine
erfüllte Pflicht.

Diese Datei nennt nur, was in den Referenzen selbst belegt ist. Wo eine Angabe
fehlt, steht das ausdrücklich da, statt sie zu erfinden.

---

## 1. `references/ui-components/` — beUI v2

| | |
|---|---|
| **Herkunft** | `starc007/ui-components` („beUI v2") |
| **Lizenz** | MIT |
| **Copyright** | Saurabh Chauhan, 2026 |
| **Umfang** | 114 Dateien (`motion/`, `lib/`) |
| **Änderungen** | Code unverändert übernommen. Neu ist allein `INDEX.md` — die deutsche Übersetzung der Katalogtabelle aus dem Original-Repo. |

**Pflicht bei Nutzung:** Wird eine dieser Komponenten in einen Kunden-Build
kopiert, muss der MIT-Lizenztext samt Copyright-Zeile mitgehen. Der Volltext
liegt hier nicht vor; er ist im Quell-Repo zu holen, bevor ausgeliefert wird.

## 2. `references/web-clone-playbook.md`

| | |
|---|---|
| **Herkunft** | `claude-skill-web-clone` (Jane / @xiaoerzhan) |
| **Lizenz** | MIT |
| **Umfang** | eine Referenz-Datei |
| **Änderungen** | Kondensiert, nicht wörtlich übernommen — deutsche Fassung mit eigener Gliederung. |

## 3. `scripts/detector/` und `scripts/scan-ai-slop.mjs`

Vendorierter Detektor-Code aus dem `impeccable`-Projekt. Herkunft und
Abgrenzung stehen im Kopf der jeweiligen Dateien; drei Module ohne Aufrufer
sind in `evals/run-verweise-check.mjs` als geduldeter Bestand benannt und
werden bewusst **nicht gelöscht** — ein Löschen macht das nächste
Vendoring-Update zum Konflikt.

---

## Was hier NICHT steht

`references/rebuild-from-image.md` nennt mehrere Higgsfield-Skripte
(`contract-gate.mjs`, `render-strategy.mjs`, `higgsfield-doctor.mjs`) und ihre
JSON-Verträge. Die sind **bewusst nicht vendoriert** — nur ihr inhaltliches
Modell ist eingearbeitet. Kein fremder Code, also keine Attributionspflicht.

## Wenn neuer Fremdcode dazukommt

Eintrag hier ergänzen, bevor der Code im Repo landet — mit Herkunft, Lizenz,
Copyright-Zeile, Umfang und der Frage, ob etwas geändert wurde. Fehlt eine
Angabe, gehört das hingeschrieben; eine Lücke, die man sieht, ist harmlos
gegenüber einer, die niemand kennt.
