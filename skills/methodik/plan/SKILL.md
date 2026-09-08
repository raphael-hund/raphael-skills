---
name: plan
version: 1.1.0
description: >
  DER Planungs-Skill — einer für alles Planen. Führt von der rohen Idee bis
  zum umsetzbaren Plan und wählt selbst die Stufe: GRILL (Entscheidung
  durchbohren), SPEC (Idee zur freigegebenen Spec), PLAN (Spec zum
  bissgroßen Umsetzungsplan), TICKETS (in Tracer-Bullet-Tickets schneiden),
  UMSETZUNG (Subagent je Task). Ersetzt brainstorm, grill, to-spec, tickets
  und sdd. Trigger: "planen", "Plan machen", "plane das", "Umsetzungsplan",
  "brainstorm", "Idee ausarbeiten", "Design-Spec", "Spec schreiben", "PRD",
  "grillen", "grill mich", "Entscheidung durchleuchten", "Tickets schreiben", "Plan schreiben",
  "Spec in Tasks zerlegen", "implementation plan",
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
  - "Bei SPEC: Spec-Datei geschrieben, committet und auf Konsistenz, Umfang und Mehrdeutigkeit geprüft; Code entsteht nur, wenn der Nutzerauftrag auch Umsetzung umfasst"
  - "Bei PLAN: jeder Task nennt Ziel, betroffene Pfade, Abhängigkeiten und Verify-Kommando; offene Entscheidungen und relevante Code-Änderungen seit der Planung sind benannt"
  - "Bei TICKETS: jedes Ticket ist ein vertikaler Slice mit Blocked-by-Kante; Granularität wurde dem Nutzer vorgelegt"
  - "Bei UMSETZUNG: jeder Task hat Implementierung plus auftragsbezogene Checks; ein Review ergänzt nur, wenn Risiko oder zusätzlicher Erkenntniswert es rechtfertigt, und Befunde werden im Diff verifiziert"
  - "Bei GRILL: eine Frage nach der anderen, je Frage eine Empfehlung; Umsetzung erst nach expliziter Bestätigung"
---

# plan — der eine Planungs-Skill

**Zweck (1 Satz):** Von der rohen Idee bis zur laufenden Umsetzung in fünf
Stufen — jede Stufe hat ein prüfbares Artefakt, und Code entsteht nur in einem
autorisierten Implementierungsauftrag.

Website-Aufträge (bauen, planen, kritisieren, relaunchen, clonen) gehören zu
Skill `web`, nicht hierher. `/plan` bleibt der eine Plan-Skill für alles
Nicht-Website: Specs, Umsetzungspläne, Grill, Tickets. Wenn der Auftrag eine
Kunden-Website ist, sofort `web` laden und hier aufhören.

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
| **SPEC** | Idee ist da, das Wie ist offen | geprüfte Spec-Datei |
| **PLAN** | Spec (oder klare Anforderungen) liegen vor | Umsetzungsplan mit Tasks |
| **TICKETS** | Plan soll auf Tracker/Backlog oder mehrere Sessions verteilt werden | Tracer-Bullet-Tickets mit Kanten |
| **UMSETZUNG** | Plan liegt vor, jetzt bauen | fertige Tasks mit auftragsbezogenen Checks; Review nach Risiko und Erkenntniswert |

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
  dann im autorisierten Umfang machen — keine Dateien-Zeremonie.
- Bei Delegation muss eine bounded Task-Definition vorliegen. Unabhängige Pakete
  dürfen parallel laufen; zusätzliche Reviews folgen Risiko und Erkenntniswert.

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
Konsistenz, Umfang, Mehrdeutigkeit) → Spec-Stand festhalten; offene Produkt-
oder Scope-Entscheidungen bleiben beim Nutzer.

**Plan-only-Gate:** Eine Planungsanfrage autorisiert keinen Code und kein
Scaffolding. Ein autorisierter Implementierungsauftrag darf innerhalb seines
Umfangs starten, sobald Kontext und Checks feststehen; offene Produkt- oder
Scope-Entscheidungen bleiben beim Nutzer. Ist der Kontext schon im Gespräch
geklärt: Verdichtungs-Variante ohne neues Interview
(`references/spec-verdichten.md`, 7-Abschnitte-PRD, Test-Seams mit Raphael
abgleichen).

### PLAN — Spec zum Umsetzungsplan (`references/plan-template-vorlage.md`)

Ein umsetzbarer Plan nennt Ziel, betroffene Pfade, Schnittstellen,
Abhängigkeiten und passende Verify-Kommandos. Details nur so weit ausarbeiten,
wie sie eine offene Entscheidung klären; Implementierungscode gehört in den
Build. Keine feste Taskdauer, kein Commit pro Kleinschritt und keine
wiederholten Codeblöcke. Vor Umsetzung relevante Änderungen gegenüber dem
geplanten Stand prüfen und den Plan bei Bedarf innerhalb des Auftrags anpassen.

### TICKETS — in Tracer-Bullets schneiden (`references/tickets-schneiden.md`)

Vertikale Slices (Schema→API→UI→Test), je Slice für sich demonstrierbar und
in ein frisches Kontextfenster passend. Jedes Ticket nennt seine
**Blocked-by-Kante** oder „None — kann sofort starten". Tiebreaker: Unblocker
zuerst, Security hoch, „nicht wert" ist ein gültiges Verdikt.
Wide Refactors nie vertikal zwingen → Expand → Migrate-Batches → Contract.
Granularität und Kanten Raphael vorlegen, dann veröffentlichen.

### UMSETZUNG — Delegierte Tasks (`references/umsetzung-subagents.md`)

Bei delegierter Umsetzung: isolierter Kontext je delegiertem Task (idealerweise
Worktree), passende Checks zuerst und ein Review danach nur, wenn Risiko oder
zusätzlicher Erkenntniswert es rechtfertigt. Befunde selbst im Diff verifizieren.
Status-Protokoll DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED. Fortschritt
im **Ledger** auf der Platte, nie nur im Gesprächsgedächtnis. Ein finaler
Gesamt-Review über den Branch ergänzt die Checks nur bei entsprechendem Risiko
oder Erkenntniswert, dann
[`finish`](/root/raphael-skills/skills/methodik/finish/SKILL.md).

**Worker-Wahl** folgt dem aktuellen Nutzer-/Hostvertrag und der Aufgabe; keine
historische Besetzung erzwingen. Modell + Effort je Dispatch explizit.

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
- **Prüfbare Übergänge** — jede Stufe endet an einem prüfbaren Artefakt. Offene
  Produkt- oder Scope-Entscheidungen bleiben beim Nutzer; autorisierte Umsetzung
  braucht keine zusätzliche Bestätigung.
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
- Nie auf main/master umsetzen, wenn der Auftrag oder Hostvertrag diesen
  Zielzweig nicht autorisiert.
