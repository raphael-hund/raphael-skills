# Profil claude-only umsetzen (Agent-Dateien, Arbeitsvertrag, Matrizen, Evals)

Type: task
Status: resolved
Blocked by: 01

## Question

AFK nach Entscheidung in Ticket 01: die 17 fremden model:-Felder in /root/.claude/agents/*.md auf opus/sonnet/haiku umwidmen (oder sonnet-critic/sonnet-builder/haiku-masse neu anlegen und Aliase zeigen lassen), CLAUDE.md §3 um das Profil mit Schalter ergänzen, CLI-PROXY-STABILITY.md Z.21-38 anpassen, orchestrate/references/dispatch.md und web/references/kritik-matrix.md auf Claude-Rollen umschreiben (Sonnet als read-only Kritiker, Opus baut, keine Familien-Pflicht), run-site-build-load-path-check.mjs und run-video-evidence-check.mjs Fixtures nachziehen, test_validate_workflow.py semantisch korrigieren. Beleg: pin-subagent-model.py-Trace zeigt nur Claude-Modelle; validate-skill.py grün; Evals grün. Quelle: Ticket 10.

## Resolution (2026-09-02, Workflows wf_04819f12-3d0 + Nachzug wf_227a4b93-b20; Opus-Bau, Sonnet-Review claude-only/Instanz-Trennung)

- Schalter `/root/tools/fleet-profile.sh {claude-only|multi-family|status}`, Statusdatei `/root/.claude/fleet-profile`, Profilordner `/root/.claude/agent-profiles/{multi-family,claude-only}/` (je 25 Agent-Dateien). claude-only-Prosa: Rolle statt Familien-Identität, Copy-Verbot profilabhängig (Opus-Copy-Leaf), Kritiker mit Label Instanz-Trennung, Routing-Verweis auf CLAUDE.md §3. Backup multi-family: `/root/.claude/agents.bak-multifamily-20260902.tgz`.
- Hooks: `no-billigmodell-subagent.py` profilabhängig inkl. Deny-Text, `pin-subagent-model.py` family() unterscheidet sonnet/haiku; 51 Tests grün in beiden Profilen.
- Policy: CLAUDE.md §3 (jetzt Nachsatz hinter `@~/.agents/AGENTS.md`, fremde Migration 13:26 UTC), CLI-PROXY-STABILITY.md Sichtbare Modelle. orchestrate 2.5.0 (dispatch.md Profil-Tabellen, Validator profilabhängig, 18 Tests). web 0.30.0 (kritik-matrix, rolle-bau, rolle-kritik, agent-roster, orchestrierung, planner-executor, Evals). visual-aaa 1.1.0. copywriting 0.12.0 (Copy-Owner-Zeile profilabhängig).
- Reports: /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/bau/{A..H}-report.md, {A..H}-review.md, CHECKS.md.
- **Live-Profil ist multi-family, nicht claude-only.** Raphael hat um 14:19 UTC in Session 267c4022 gesagt: alle Claude-, GPT-, Grok-, Kimi-Modelle sind da und nutzbar. Diese Session hat darauf ihr Ticket T15 (wayfinder/orchestrator) mit `sudo -n fleet-profile.sh multi-family` um 16:48 UTC geschaltet und live geprüft (Opus, Sol, Grok PASS; Kimi 403). Der F-Fixer hier hat um 16:51 unwissentlich auf claude-only zurückgeschaltet; um 16:5x wieder auf multi-family gestellt; Raphael hat danach bestätigt: „multi-family bleibt“. claude-only bleibt als Schalter für den Fall, dass die Fremdfamilien wieder auf Fable umgeleitet werden.
- Offen: copywriting/SKILL.md Zeilen 30, 163, 206 nennen G2 unbedingt als "andere Modellfamilie" (unter claude-only falsch, eigenes Folgepaket eval/G2). Ohne sudo meldet der Schalter laut T15 Erfolg ohne Dateiwirkung, wenn der Aufrufer keinen Schreibzugriff auf ~/.claude/agents hat; unter uid 997 mit ACL funktioniert er.
