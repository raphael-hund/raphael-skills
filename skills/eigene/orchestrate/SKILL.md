---
name: orchestrate
version: 0.4.0
description: >
  Feuert für Mehr-Agenten-Arbeit: Aufgabe in Leader/Worker/Verifier zerlegen,
  Cross-Model- und Cross-Harness-Dispatch (Luna, Sol, Terra, Sonnet, Haiku,
  Kimi) explizit setzen, Sub-Actions parallel fahren, nie eine Familie allein
  bauen und prüfen lassen. Für Streitfragen: adversariales Distill-Muster oder
  Council. Trigger: "delegieren", "parallelisieren", "Subagenten",
  "Task aufteilen", "orchestrieren", "Council", "Zweitmeinungs-Rat",
  "Cross-Model", "Cross-Harness", "Flotte".
class: O
scope: agency
sensitivity: internal
loads:
  - references/dispatch.md
  - references/council.md
  - references/cross-model-harness.md
requires_skills: [eval@^0]
completion_criteria:
  - "Jeder Subagent-Auftrag nennt agentType ODER (MODELL + EFFORT) explizit — nie geerbt"
  - "Bei Substanz-Arbeit lief eine Cross-Model-Flotte: mindestens Luna (Mechanik) plus eine zweite Familie (Kimi oder Sol) plus passende Claude-Worker; Solo nur bei <5-Min-Tasks mit genannter Begründung"
  - "Worker-Output gilt untrusted bis Cross-Review durch andere Modellfamilie"
  - "Kleine Tasks solo erledigt (nicht delegiert)"
  - "Bei adversarialem Distill-Muster: der Leader hat nie selbst den finalen Plan geschrieben, nur destilliert"
  - "Bei Council-Muster: Peer-Ranking lief anonymisiert mit randomisierter Zuordnung; Chairman-Verdikt enthält Konsens, Dissens, Empfehlung und genau einen ersten Schritt"
  - "Die Harness-Wahl steht im Auftrag (claude-agent / mcp-codex / mcp-kimi / codex-native / kimi-native) und passt zur laufenden Session (Desktop/Web = nur MCP)"
---

# orchestrate — Cross-Model- und Cross-Harness-Dispatch

**Lies zuerst:**
[`AGENTS.md`](/root/raphael-command-center/AGENTS.md) (Regeln 2, 7, 8, 17, 18),
[`ROUTING.md`](/root/raphael-command-center/ops/ROUTING.md),
[`quota.yaml`](/root/raphael-command-center/ops/quota.yaml),
[`MODELL-MATRIX.md`](/root/raphael-command-center/ops/MODELL-MATRIX.md),
[`HARNESS-ROUTER-MATRIX.md`](/root/raphael-command-center/ops/HARNESS-ROUTER-MATRIX.md),
dazu `references/cross-model-harness.md` (Zuteilung) und
`references/dispatch.md` (Auftragskontrakt).

## Zweck (1 Satz)

Eine Aufgabe so verteilen, dass **mehrere Modellfamilien und das passende
Harness wirklich laufen** — teuer denkt, Luna tippt Mechanik, Kimi/Terra bauen,
Sol/Sonnet prüfen, niemand prüft die eigene Arbeit.

## Abgrenzung zu den Nachbar-Skills

| Skill | Wofür |
|---|---|
| **orchestrate** (dieser) | Zerlegen, Rollen, **welche** Modelle/Harnesses, Muster |
| `dynamic-workflow` | Genau EIN Workflow-Run mit Script |
| `ultra-loop` | Dauer-Cron, jede Runde ein Workflow |
| `codex-first` / `kimi-first` | Ein Paket an **eine** Fremdfamilie, Claude reviewt |
| `eval` | Ein fertiges Artefakt gegen eine Rubrik |

Orchestrate entscheidet *wer* und *wie*; dynamic-workflow und ultra-loop führen
die Flotte aus. codex-first/kimi-first sind ein **Baustein** in der Flotte,
kein Ersatz für sie.

## Rollen

- **Leader** (Fable im Claude-Cockpit, Fallback Opus 1M; nie als Subagent):
  plant, dispatcht, destilliert — nur an 2–3 Checkpoints je Loop.
- **Worker-Flotte** (Pflicht bei Substanz, frei nach Verfügbarkeit):
  - `luna-worker` — Mechanik, Tests, Recherche, begrenzte Umbauten
    (**Standard-Nicht-Claude-Worker**, Max-Effort im Gateway erzwungen)
  - `terra-bulk` — Architektur, große Migrationen über viele Dateien
  - `sonnet-worker` — normale Bau-Arbeit, Drafts, Integration
  - `haiku-worker` — Massen-Lesen, Parsen, billige Klassifikation
  - `kimi-worker` — Frontend-Code, deutsche Marketing-/Verkaufstexte (immer K3)
  - `kimi-recherche` — lesende Dritt-Familie, Gegenperspektive
- **Verifier** (andere Familie, frische Session): `sol-pruefer` (Beschluss B1);
  bei Codex-Ausfall `claude-sonnet-5` als Ersatz und Panel A auf Kimi (Regel 8).
- **Nie Fable oder Opus als Subagent.**

## Cross-Model-Regel (das Herzstück)

Analog zum Cross-Vendor-Gedanken gilt für **jede** substanzielle Orchestrierung:

1. Mindestens **zwei Modellfamilien** im Lauf (Claude + GPT **oder**
   Claude + Kimi; bei Ship oder echtem Streit alle drei).
2. **Luna ist der Default für Mechanik** — isolierbare Sub-Actions (Tests,
   Fixes, Verify-Skripte, Recherche-Häppchen) gehen zuerst an `luna-worker`,
   nicht ans Cockpit und nicht automatisch an Sonnet (Raphael-Ansage 03.08.).
3. Bauen und Prüfen nie dieselbe Familie (Regel 8).
4. Jeder Auftrag nennt `agentType` **oder** MODELL + EFFORT explizit (Regel 7).
5. `model:'opus'|'sonnet'|'haiku'` allein zählt **nicht** als Cross-Model —
   GPT/Kimi/Sol starten ausschließlich über `agentType` bzw. natives Harness.

Zuteilungs-Tabelle, Minimum-Flotten je Aufgabenklasse und Degraded-Pfade:
`references/cross-model-harness.md`.

## Router-Entscheidungsbaum (Reihenfolge zählt)

1. Klein/inline (<5 Min, eine Datei) → selbst machen, kurz begründen.
2. Denken/Entscheiden/Urteil → bleibt beim Cockpit (Fable high; Fallback Opus 1M).
3. Normale Bau-Arbeit → `sonnet-worker`; Massen-Lesen/Mechanik billig → `haiku-worker`.
4. Mechanik/Tests/Recherche, Claude-Quota schonen → **`luna-worker` (bevorzugt)**.
5. Architektur/Bulk über viele Dateien → `terra-bulk`.
6. Frontend-Code oder deutsche Verkaufstexte → `kimi-worker` (K3, nie HighSpeed).
7. Ship-Review/Zweitprüfung → `sol-pruefer`; bei Codex-Ausfall `claude-sonnet-5`
   plus Panel A auf Kimi.
8. Dritte-Familie-Zweitmeinung → `kimi-recherche`.
9. Computer-Use/Browser → Kimi steuert; Tools nur in Claude-Sessions.
10. Harness zuletzt: Terminal-Claude = Agent-Tool über Gateway; Desktop/Web =
    **nur** MCP (`codex_worker`/`kimi_worker`); reiner Codex-Lauf =
    `multi_agent_v2` (Luna/Terra, max_depth=1); reiner Kimi-Lauf = Kimi-Adapter.

Quota-Fehler = weiterlaufen lassen, das Gateway rotiert selbst; ein sichtbarer
Nicht-Fallback ist ein Vorfall. Grok/xAI bleibt gesperrt bis Signatur.

## Dispatch-Regeln (Detail in references/dispatch.md)

1. **agentType/Modell + Effort IMMER explizit** — sonst erbt der Subagent das
   teure Leader-Setup (Regel 7).
2. **Kein Subagent-Limit** — so viele parallel, wie die Aufgabe braucht;
   Dateien vorher partitionieren.
3. **Kleine Tasks solo** (Regel 2).
4. **Effort vor Modell** (Regel 13).
5. **Worker-Output ist untrusted bis Cross-Review** durch eine andere Familie.
6. **Router guilty until proven innocent** — automatische Modellwahl erst gegen
   ein Eval-Set, bevor sie Routine wird.
7. **Quarantäne (Regel 17)** — untrusted rein ODER mächtig raus, nie beides.
8. **Roast-at-Delivery (Regel 18)** — vor jeder Auslieferung ein benannter
   adversarialer Schritt in frischer Session einer anderen Familie.

## Adversariales Distill-Muster (für wichtige Entscheidungen)

Bei hohem Einsatz reicht ein einzelner Planer-Durchlauf nicht — er bestätigt
die eigene erste Idee. Stattdessen mehrere **künstlich gegensätzliche** Rollen
unabhängig ansetzen (Pragmatiker-Skeptiker, Integrations-Tester,
Evidenz-Fordernder, Architekt, Kreativ-Querdenker), Runde 2 greifen sie sich
gegenseitig an, dann **destilliert der Leader nur, was den Angriff überlebt
hat** in Hard-Constraints/Decisions/Risks/Open Questions und dispatcht das an
einen eigenständigen Planer-Agenten. **Der Leader schreibt nie selbst den
finalen Plan.** Für Routine-Dispatches overkill.

## Council-Muster (für offene Entscheidungsfragen)

Mehrere plausible **Antworten** (Positionierung, Pricing, Architekturwahl):
3 Modellfamilien (Sonnet + Sol + Kimi) antworten unabhängig in frischen
Sessions → alle Antworten werden **anonymisiert** und von jedem Mitglied
gerankt (striktes `FINAL RANKING:`-Format) → der Leader synthetisiert als
Chairman: Konsens / Dissens / blinde Flecken / eine Empfehlung / ein erster
Schritt. Der Chairman darf gegen die Mehrheit entscheiden. Abgrenzung:
**eval-Panel judgt ein Artefakt, Council wählt zwischen Antworten** —
Council-Ergebnisse laufen vor Ship trotzdem durch eval. Ablauf und
Billig-Variante: `references/council.md`.

## Subagent-Grundregeln

- Nur in sich geschlossene, unabhängige Pakete delegieren.
- Parallele Subagenten fassen nie dieselben Dateien an — `write_set` disjunkt;
  Index/Lock/gemeinsame Konfiguration bekommen EINEN Owner am Ende.
- Subagenten starten blind — voller Auftrag (Scope, Kontext, Constraints,
  erwarteter Output) gehört in den Prompt.
- Eng und konkret scopen; kleiner Blast-Radius.
- Rückgabe: kurze Zusammenfassung oder konkretes Ergebnis, nie Rohdumps.

## Gotchas

- **Modellwechsel = neue Session** (Regel 6) — mitten drin wechseln zerstört den Cache.
- **Desktop-/Web-Claude:** Gateway-Subagents greifen dort nicht → MCP-Worker nutzen.
- Codex-Seats können serverseitig widerrufen sein → Degraded-Pfad aus der
  MODELL-MATRIX fahren, nicht stumm abbrechen.
- Fallback-Reihenfolge bei leerem Konto: Claude 1→4 · Codex 1→2 · Kimi 1→2.
- `unsupported model` beim Subagent → erst systemd-Log des Failover-Proxys,
  dann direkt gegen Port 8317 testen.
- Native Bausteine (Dynamic Workflows, Agent Teams, Worktree-Isolation) nur
  nutzen, wenn in der laufenden Version verfügbar; Quarantäne gilt sofort.
- Cache-Prefix-Regel (12): stabiler Kontext vorne, wechselnde Aufgabe hinten.
