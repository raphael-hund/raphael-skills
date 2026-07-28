---
name: orchestrate
version: 0.3.0
description: >
  Feuert für Mehr-Agenten-Arbeit: Aufgabe in Leader/Worker/Verifier zerlegen,
  Modell + Effort je Subagent explizit setzen, Dispatch nach ROUTING/quota.
  Für schwierige Entscheidungen: adversariales Cross-Critique-Muster
  (mehrere gegensätzliche Rollen greifen sich an, nur Überlebendes geht an
  den Planer — der Leader plant nie selbst) oder Council-Muster (3
  Modellfamilien antworten unabhängig, ranken sich anonym, Chairman
  synthetisiert). Trigger: "delegieren", "parallelisieren", "Subagenten",
  "Task aufteilen", "orchestrieren", "Council", "Zweitmeinungs-Rat".
class: O
scope: agency
sensitivity: internal
loads: [references/dispatch.md, references/council.md]
requires_skills: [eval@^0]
completion_criteria:
  - "Jeder Subagent-Auftrag nennt Modell UND Effort explizit"
  - "Worker-Output gilt untrusted bis Cross-Review durch andere Familie"
  - "Kleine Tasks solo erledigt (nicht delegiert)"
  - "Bei adversarialem Distill-Muster: der Leader hat nie selbst den finalen Plan geschrieben, nur destilliert"
  - "Bei Council-Muster: Peer-Ranking lief anonymisiert mit randomisierter Zuordnung; Chairman-Verdikt enthält Konsens, Dissens, Empfehlung und genau einen ersten Schritt"
---

# orchestrate — Leader/Worker/Verifier-Dispatch

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Regeln 2, 7, 8, 17, 18),
`/root/raphael-command-center/ops/ROUTING.md`,
`/root/raphael-command-center/ops/quota.yaml`,
`/root/raphael-command-center/ops/MODELL-MATRIX.md` (Modelle & Effort;
ersetzt das beim Aufräumen 274a4ff gelöschte KLARER-PLAN.md Kap. 3 —
Historie bei Bedarf: `git show 274a4ff^:KLARER-PLAN.md`).

## Zweck (1 Satz)

Eine Aufgabe kostenbewusst auf Leader/Worker/Verifier verteilen — teuer denkt, billig tippt,
niemand prüft die eigene Arbeit.

## Rollen

- **Leader** (Fable, Fallback Opus): plant, entscheidet, finale Reviews. Nur an **2–3
  Checkpoints je Loop** — nicht dauernd (Orchestrierungs-Aufschlag).
- **Worker** (Sonnet/Terra/Luna/Kimi): baut. **Reuse je Kunde** — gleicher Worker über
  mehrere Artefakte, nicht neue Session pro Hook (Cache-Prefix stabil).
- **Verifier** (andere Familie, frische Session): prüft. Fable prüft nie Fable (Regel 8).

## Dispatch-Regeln (Detail in references/dispatch.md)

1. **Modell + Effort IMMER explizit** je Subagent — sonst erbt er das teure Leader-Setup
   (Regel 7). Effort-Defaults: Sol=medium, Terra/Luna=max, Kimi=high (ops/MODELL-MATRIX.md).
2. **Kein Subagent-Limit** — so viele parallel, wie die Aufgabe braucht.
3. **Kleine Tasks solo** — Delegation kostet Aufschlag; unter der Schwelle selbst machen (Regel 2).
4. **Effort vor Modell** — erst `effort high` auf dem günstigeren Modell, dann erst aufrüsten (Regel 13).
5. **Worker-Output ist untrusted bis Cross-Review** — von einer anderen Modellfamilie
   geprüft, bevor er in einen Ship-Pfad geht.
6. **Router guilty until proven innocent** — jede automatische Modellwahl erst gegen ein
   Eval-Set, bevor sie Routine wird.
7. **Quarantäne (Regel 17)** — ein Agent mit Web-/Ingest-Zugriff bekommt nie High-Privilege-
   Aktionen. Untrusted rein ODER mächtig raus, nie beides in einer Session.
8. **Roast-at-Delivery (Regel 18)** — vor jeder Auslieferung ein benannter adversarialer
   Schritt (frische Session, andere Familie) zerreißt das fertige Stück.

## Adversariales Distill-Muster (für wichtige Entscheidungen)

Bei hohem Einsatz (Architekturentscheidung, teure Umsetzung) reicht ein
einzelner Planer-Durchlauf oft nicht: er bestätigt die eigene erste Idee.
Stattdessen: mehrere **künstlich gegensätzliche** Rollen unabhängig ansetzen
(z. B. Pragmatiker-Skeptiker, Integrations-Tester, Evidenz-Fordernder,
Architekt, Kreativ-Querdenker) → Runde 2: die Rollen greifen sich
gegenseitig an, verteidigen oder verwerfen Punkte → der Leader **destilliert
nur, was den Angriff überlebt hat** in Hard-Constraints/Decisions/Risks/Open
Questions und dispatcht das an einen eigenständigen Planer-Agenten. **Der
Leader schreibt nie selbst den finalen Plan** — reine Selbstbestätigung
sonst unvermeidbar. Für Routine-Dispatches overkill; nur bei Entscheidungen
mit echtem Streitwert einsetzen.

## Council-Muster (für offene Entscheidungsfragen)

Wenn es mehrere plausible **Antworten** gibt (Positionierung, Pricing,
Architekturwahl) statt eines zu prüfenden Artefakts: 3 Modellfamilien
(Sonnet + Sol + Kimi) antworten unabhängig in frischen Sessions → alle
Antworten werden **anonymisiert** (randomisierte Buchstaben) und von jedem
Mitglied gegenseitig gerankt (striktes `FINAL RANKING:`-Format) → der
Leader synthetisiert als Chairman: Konsens / Dissens / blinde Flecken /
eine Empfehlung / ein erster Schritt. Der Chairman darf gegen die Mehrheit
entscheiden. Abgrenzung: **eval-Panel judgt ein Artefakt gegen eine Rubrik,
Council wählt zwischen Antworten** — Council-Ergebnisse laufen vor Ship
trotzdem durch eval. Ablauf, Prompt-Formate und Billig-Variante (eine
Familie, gegensätzliche Linsen inkl. Outsider): `references/council.md`.

## Subagent-Grundregeln

- Nur in sich geschlossene Aufgaben delegieren — Subtasks ohne
  gegenseitige Abhängigkeit; nur unabhängige Arbeit parallelisieren.
- Parallele Subagenten fassen nie dieselben Dateien an — Arbeit
  partitionieren oder in einem Agenten halten.
- Subagenten starten blind — sie sehen nichts vom eigenen Kontext. Der
  volle Auftrag (Scope, Kontext, Constraints, exakter erwarteter Output)
  gehört in den Prompt.
- Eng und konkret scopen: "erklär, wie Payments funktioniert" schlägt
  "erklär alles" — ein begrenzter Task, kleiner Blast-Radius.
- Subagenten liefern kurze Zusammenfassungen oder konkrete Ergebnisse
  zurück, nie Rohdumps/volle Transkripte — hält den eigenen Kontext sauber.

## Gotchas

- **Modellwechsel = neue Session** (Regel 6) — mitten drin wechseln zerstört den Prompt-Cache.
- Subagent ohne explizites Effort erbt teures Leader-Effort — immer beides mitgeben.
- Fallback-Reihenfolge bei leerem Konto: Claude 1→2→3→4 · Codex 1→2 · Kimi 1→2 (`ccx`
  rotiert Claude automatisch).
- Native Bausteine (Dynamic Workflows/ultracode, Programmatic Tool Calling, Agent Teams,
  Worktree-Isolation) nur nutzen, wenn in der laufenden Version verfügbar — Quarantäne gilt
  unabhängig sofort.
- Cache-Prefix-Regel (12): stabiler Kontext (Doktrin/Skill) vorne, wechselnde Aufgabe hinten.
