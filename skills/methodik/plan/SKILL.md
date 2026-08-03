---
name: plan
version: 1.0.0
description: >
  DER Planungs-Skill — einer für alles Planen. Führt von der rohen Idee bis
  zum umsetzbaren Plan und wählt selbst die Stufe: GRILL (Entscheidung
  durchbohren), SPEC (Idee zur freigegebenen Spec), PLAN (Spec zum
  bissgroßen Umsetzungsplan), TICKETS (in Tracer-Bullet-Tickets schneiden),
  UMSETZUNG (Subagent je Task). Ersetzt brainstorm, grill, to-spec, tickets
  und sdd. Trigger: "planen", "Plan machen", "plane das", "Umsetzungsplan",
  "brainstorm", "Idee ausarbeiten", "Design-Spec", "Spec schreiben", "PRD",
  "grillen", "grill mich", "Entscheidung durchleuchten", "Tickets schreiben",
  "Backlog bauen", "Plan umsetzen", "Tasks ausführen".
class: M
scope: agency
sensitivity: internal
source: >
  Konsolidierung 03.08.2026 (Raphael: "EIN Skill für Planung"): vereinigt
  brainstorm 0.2.0, grill 0.1.0, plan 0.2.0, to-spec 0.1.0, tickets 0.2.0
  und sdd 0.2.0. Ursprungs-Herkunft je Teil in den references vermerkt
  (superpowers/obra, mattpocock, shadcn/improve — alle bereits vendored/
  fusioniert).
loads:
  - references/grill-fragen.md
  - references/spec-dialog.md
  - references/spec-verdichten.md
  - references/plan-template-vorlage.md
  - references/tickets-schneiden.md
  - references/umsetzung-subagents.md
  - references/reihenfolge.md
completion_criteria:
  - "Die Stufe ist genannt und begründet (GRILL / SPEC / PLAN / TICKETS / UMSETZUNG) — inklusive Einstiegspunkt, wenn frühere Stufen übersprungen wurden"
  - "Bei SPEC: Spec-Datei geschrieben, committet und vom Nutzer explizit freigegeben, bevor Code entsteht"
  - "Bei PLAN: jeder Task hat exakte Dateipfade, vollständigen Code, Verify-Kommando, Drift-Check (Planned-at-SHA) und mindestens eine STOP-Bedingung — keine Platzhalter"
  - "Bei TICKETS: jedes Ticket ist ein vertikaler Slice mit Blocked-by-Kante; Granularität wurde dem Nutzer vorgelegt"
  - "Bei UMSETZUNG: jeder Task hat Implementierung plus Review mit beiden Verdikten; Reviewer-Funde selbst im Diff verifiziert"
  - "Bei GRILL: eine Frage nach der anderen, je Frage eine Empfehlung; Umsetzung erst nach expliziter Bestätigung"
---

# plan — der eine Planungs-Skill

**Zweck (1 Satz):** Von der rohen Idee bis zur laufenden Umsetzung in fünf
Stufen — jede Stufe hat ein prüfbares Artefakt, und nichts wird gebaut, bevor
die Stufe davor freigegeben ist.

## Die Pipeline

```
Idee → [GRILL] → [SPEC] → [PLAN] → [TICKETS] → [UMSETZUNG]
        klären    festhalten  zerlegen   schneiden    bauen lassen
```

Nicht jedes Vorhaben braucht alle fünf. **Einstieg dort, wo der Kontext schon
steht — Ansage in einem Satz, welche Stufen übersprungen werden und warum.**

## Stufe wählen (immer zuerst, immer ansagen)

| Stufe | Wann | Artefakt |
|---|---|---|
| **GRILL** | Annahmen unklar, Entscheidung strittig, „grill mich" | bestätigtes gemeinsames Verständnis |
| **SPEC** | Idee ist da, das Wie ist offen | freigegebene Spec-Datei |
| **PLAN** | Spec (oder klare Anforderungen) liegen vor | Umsetzungsplan mit Tasks |
| **TICKETS** | Plan soll auf Tracker/Backlog oder mehrere Sessions verteilt werden | Tracer-Bullet-Tickets mit Kanten |
| **UMSETZUNG** | Plan liegt vor, jetzt bauen | fertige Tasks, jeweils reviewt |

Faustregeln:
- Gespräch hat schon alles geklärt → **SPEC überspringen ist falsch**, aber
  das Interview entfällt: direkt verdichten (`references/spec-verdichten.md`).
- Geschäftsidee („lohnt sich das?") → erst
  [`idea-filter`](/root/raphael-skills/skills/eigene/idea-filter/SKILL.md),
  dieser Skill setzt „Build" voraus.
- Mehrere plausible Antworten mit Streitwert → Council in
  [`orchestrate`](/root/raphael-skills/skills/eigene/orchestrate/SKILL.md),
  nicht hier diskutieren.
- Kleinst-Änderung (<5 Min, eine Datei): Kurz-Spec in zwei Sätzen im Chat,
  Freigabe, machen — keine Dateien-Zeremonie.

## Die fünf Stufen (Kurzform — Details in den references)

### GRILL — Entscheidung durchbohren (`references/grill-fragen.md`)

Entscheidungsbaum aufspannen, dann **eine Frage nach der anderen**, jede mit
eigener Empfehlung. Fakten (grep/ls/Doku) selbst nachschlagen — nur echte
Entscheidungen (Geschmack, Priorität, Risiko) gehören Raphael. Keine
Fragenbatches. Endet mit expliziter Bestätigung, nie mit „passt schon".

### SPEC — Idee zur freigegebenen Spec (`references/spec-dialog.md`)

Kontext erkunden → Umfang prüfen (mehrere Teilsysteme? erst zerlegen) →
klärende Fragen einzeln → 2–3 Ansätze mit Trade-offs und **Evidenz-Pflicht**
(jeder Vorschlag braucht ein Zitat aus Codebase/Gespräch — generische Ideen
sind Rauschen) → Design abschnittsweise präsentieren → Spec schreiben und
committen (`docs/specs/YYYY-MM-DD-<thema>.md`) → Selbstprüfung (Platzhalter,
Konsistenz, Umfang, Mehrdeutigkeit) → **Freigabe abwarten**.

**Hartes Gate: kein Code, kein Scaffolding vor der Freigabe** — auch bei
scheinbar trivialen Vorhaben. Ist der Kontext schon im Gespräch geklärt:
Verdichtungs-Variante ohne neues Interview (`references/spec-verdichten.md`,
7-Abschnitte-PRD, Test-Seams mit Raphael abgleichen).

### PLAN — Spec zum Umsetzungsplan (`references/plan-template-vorlage.md`)

Für einen Umsetzer schreiben, der **null Kontext** zur Codebasis hat:
Dateistruktur zuerst, dann bissgroße Tasks (atomare 2–5-Minuten-Schritte,
TDD-Zyklus, Commit je Task). Plan-Kopf mit Ziel, Architektur, Tech-Stack,
Global Constraints. Jeder Task: exakte Pfade, vollständiger Code, Interfaces
zu Nachbar-Tasks, Verify-Kommando.

**Pflicht je Plan:** Drift-Check (`Planned at: <SHA>`; geänderter zitierter
Code = STOP, nicht improvisieren) und explizite STOP-Bedingungen.
**Plan-Fehler, nie akzeptabel:** TBD/TODO, „Fehlerbehandlung ergänzen" ohne
Code, „wie Task N" statt wiederholtem Code, referenzierte aber nirgends
definierte Typen. Selbstprüfung: Spec-Abdeckung, Platzhalter-Scan,
Typkonsistenz über Tasks hinweg.

### TICKETS — in Tracer-Bullets schneiden (`references/tickets-schneiden.md`)

Vertikale Slices (Schema→API→UI→Test), je Slice für sich demonstrierbar und
in ein frisches Kontextfenster passend. Jedes Ticket nennt seine
**Blocked-by-Kante** oder „None — kann sofort starten". Tiebreaker: Unblocker
zuerst, Security hoch, „nicht wert" ist ein gültiges Verdikt.
Wide Refactors nie vertikal zwingen → Expand → Migrate-Batches → Contract.
Granularität und Kanten Raphael vorlegen, dann veröffentlichen.

### UMSETZUNG — Subagent je Task (`references/umsetzung-subagents.md`)

Frischer Subagent pro Task (isolierter Kontext, idealerweise Worktree),
danach Task-Review mit **zwei Verdikten** (Spec-Konformität + Code-Qualität)
durch eine **andere Modellfamilie**. Status-Protokoll DONE /
DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED; Verdikt-Tabelle APPROVE /
REVISE (max 2 Runden) / BLOCK. Fortschritt im **Ledger** auf der Platte, nie
nur im Gesprächsgedächtnis. Finaler Gesamt-Review über den Branch, dann
[`finish`](/root/raphael-skills/skills/methodik/finish/SKILL.md).

**Worker-Wahl nach der Familien-Präferenz** (orchestrate/besetzung):
Mechanik → `luna-worker` · Masse/Prototyp → `grok-worker` · Bulk →
`terra-bulk` · Frontend/DE-Text/Denken → `kimi-worker` · Review →
`sol-pruefer`+`opus-builder`-Tandem. Modell + Effort je Dispatch explizit.

## Etappen nacheinander (Kopplung an orchestrate)

Planen liefert die Etappen, orchestrate fährt die Flotte: Etappen laufen
**nacheinander**, parallelisiert wird **innerhalb** einer Etappe. Bei
Substanz-Umsetzung mit Flotte übernimmt `orchestrate` (Betriebsart EINMAL/
GAUNTLET) die Ausführung — dieser Skill bleibt der Planungs-Einstieg und
liefert den Plan, gegen den gebaut wird.

## Kernprinzipien (gelten in jeder Stufe)

- **Eine Frage nach der anderen** — nie Fragenkataloge.
- **Evidenz-Pflicht** — Vorschläge ohne Beleg aus Codebase/Gespräch sind Rauschen.
- **YAGNI** — Unnötiges aus jedem Design streichen.
- **Freigabe-Gates** — jede Stufe endet an einem prüfbaren Artefakt plus
  Raphael-Okay, bevor die nächste beginnt.
- **Auf der Platte, nicht im Kopf** — Spec, Plan, Ledger sind Dateien.
- **Zurückspulen statt diskutieren** — passt eine Stufe nicht, zurück zur
  vorherigen, nicht flicken.

## Gotchas

- Der frühere Drei-Framework-Vergleich (grill → superpowers ODER gstack)
  steht in `references/reihenfolge.md`.
- gstack-Planungs-Skills (`gstack-autoplan`, `gstack-plan-*-review`) sind ein
  eigenes, parallel installiertes System — nicht mischen; für Raphael-Repos
  gilt dieser Skill.
- `marketing-plan` ist Marketing-Strategie, kein Software-Plan — anderes Feld.
- Reviewer nie vorgeben, was er nicht flaggen soll; Findings unvoreingenommen.
- Nie auf main/master umsetzen ohne ausdrückliche Zustimmung.
