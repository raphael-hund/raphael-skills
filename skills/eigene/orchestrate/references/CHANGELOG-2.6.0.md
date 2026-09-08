# orchestrate 2.6.0 — 04.09.2026 (Raphael: „bester Orchestrator, maximale Qualität, Kosten egal“)

## Neu
- **Schritt 0 Preflight** `scripts/preflight.sh <worktree>`: pingt jede Familie über die Session-Base-URL (Fable/Opus/Sol/Luna/Grok), zeigt Leaf-Budget, erkennt fremde laufende Runs im Worktree (Journal-Heuristik). DOWN-Familie = BLOCKED + rollenkompatibler FALLBACK, sichtbar.
- **Schritt 4a Qualitätsschleife** `references/qualitaetsschleife.md`: Bauen → G1 (luna-worker, Befehl) → Judge anderer Familie mit Score je Dimension + VETO → ≤3 Runden mit Notizen an denselben Builder → ESCALATE. Baustein `mitSchleife()` als Script-Code. Probe PASS (wf_90c57cfe-336: Fable baut, Luna G1, Sol judged 8/8).
- **`fable-builder`** als Builder-Leaf in Flotte, Router, dispatch, harness, muster-wahl, workflow-vorlage, Validator (`ERLAUBT`), web-Roster, rolle-bau, kritik-matrix, ultracode, loop, eval, ROLE-CAST, CLI-PROXY-STABILITY.
- **Provenienz-Pflichtzeile** `ACTUAL_BUILDER_FAMILY=…` in dispatch-Feldliste und Vorlage-CONTRACT (Beobachtung 20).
- **Paketgröße nach Budget**: Bau-Paket ≤ 2–3 Routen / ≤ 40 min, Zeitbudget im Prompt (Beobachtungen 19, 21, 22).

## Entfernt
- Alle Kimi-Routen aus SKILL.md, dispatch, harness, stages, gauntlet, council, workflow-vorlage (Kimi tot, 03.09.2026).

## Belege des 30-Tage-Scans (04.09.2026, WebSearch; Firecrawl-Key tot, last30days ohne SCRAPECREATORS_API_KEY)
- Plan-Execute-Verify-Replan (arXiv 2603.11445): Completeness-Score je Teilfrage, Ergebnis-Erhalt über Retries, konfigurierbare Stop-Bedingungen, stärkeres/anderes Modell als Judge.
- PROCTOR / „LLM-as-a-Judge Is Not an Oracle“ (arXiv 2609.02246): elf Judge-Ausfallklassen; Fix = struktureller Anker, deterministische Guardrails vor dem Judge.
- Future AGI Agent-Eval-Guide (05/2026): Per-Dimension-Schwellen, nie Aggregat.
- Agent Cookbooks agents-orchestrator (05/2026): Retry-Cap 3, vierter Fehlschlag eskaliert.
- Claude-Code-Docs Workflows: Loop im Script, nicht im Controller-Kontext; adversariale Review vor dem Report.
- Addy Osmani „Code Agent Orchestra“ (03/2026): Reviewer-as-Gate, Lead sieht nur Grün.
- DEV (05/2026): Gate-Reihenfolge billig→teuer (Format, Lint, Typen, Secrets, Tests, Diff-Größe, dann LLM-Review).
