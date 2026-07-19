---
name: r-orchestrate
version: 0.1.0
description: >
  Feuert für Mehr-Agenten-Arbeit: Aufgabe in Leader/Worker/Verifier zerlegen,
  Modell + Effort je Subagent explizit setzen, Dispatch nach ROUTING/quota.
  Trigger: "delegieren", "parallelisieren", "Subagenten", "Task aufteilen", "orchestrieren".
class: O
scope: agency
sensitivity: internal
loads: [references/dispatch.md]
requires_skills: [r-eval@^0]
completion_criteria:
  - "Jeder Subagent-Auftrag nennt Modell UND Effort explizit"
  - "Worker-Output gilt untrusted bis Cross-Review durch andere Familie"
  - "Kleine Tasks solo erledigt (nicht delegiert)"
---

# r-orchestrate — Leader/Worker/Verifier-Dispatch

**Lies zuerst:**
`/root/raphael-command-center/AGENTS.md` (Regeln 2, 7, 8, 17, 18),
`/root/raphael-command-center/ops/ROUTING.md`,
`/root/raphael-command-center/ops/quota.yaml`,
`/root/raphael-command-center/KLARER-PLAN.md` Kap. 3 (Modelle & Effort).

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
   (Regel 7). Effort-Defaults: Sol=medium, Terra/Luna=max, Kimi=high (KLARER-PLAN Kap. 3).
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

## Gotchas

- **Modellwechsel = neue Session** (Regel 6) — mitten drin wechseln zerstört den Prompt-Cache.
- Subagent ohne explizites Effort erbt teures Leader-Effort — immer beides mitgeben.
- Fallback-Reihenfolge bei leerem Konto: Claude 1→2→3→4 · Codex 1→2 · Kimi 1→2 (`ccx`
  rotiert Claude automatisch).
- Native Bausteine (Dynamic Workflows/ultracode, Programmatic Tool Calling, Agent Teams,
  Worktree-Isolation) nur nutzen, wenn in der laufenden Version verfügbar — Quarantäne gilt
  unabhängig sofort.
- Cache-Prefix-Regel (12): stabiler Kontext (Doktrin/Skill) vorne, wechselnde Aufgabe hinten.
