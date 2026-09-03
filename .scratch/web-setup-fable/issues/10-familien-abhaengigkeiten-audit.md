# Audit: welche Stellen im Setup setzen fremde Modellfamilien voraus

Type: research
Status: resolved
Blocked by: 

## Question

Alle Stellen in web (SKILL.md, kritik-matrix.md, rolle-bau.md, rolle-kritik.md, agent-roster.md, orchestrierung.md, run-evidence-contract.md, scripts, evals), design, visual-aaa, copywriting, orchestrate und /root/.claude/CLAUDE.md §3, die Kimi/Grok/Sol/Luna/Terra oder 'andere Familie' hart verlangen. Je Fundstelle: datei:zeile, was bricht unter claude-only, kleinster Ersatz (Sonnet-Kritiker, deterministisches Gate, Streichung).

## Answer

Report: /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/10-familien-audit.md. Ca. 230 Fundstellen, davon ca. 55 harte Prosa-Gates (dispatch.md, cross-model-harness.md, stages.md, kritik-matrix.md, rolle-kritik.md, rolle-bau.md, agent-roster.md, CLAUDE.md §3 Z.25-41, CLI-PROXY-STABILITY.md Z.21-38). Nur 5 Scripts mit Code-Hardcode; einziger Runtime-Hebel ist /root/.claude/hooks/pin-subagent-model.py, der das model:-Feld aus /root/.claude/agents/<agentType>.md liest: 17 von 24 Agent-Dateien tragen fremde Modelle, ohne deren Änderung spawnt kimi-worker weiter kimi-k3 (heute auf Fable umgeleitet = BLOCKED). validate-workflow.py warnt nur (WARN seit 25.07.), zwei web-Evals (run-site-build-load-path-check.mjs, run-video-evidence-check.mjs) asserten Grok/Kimi-Strings hart. Rollen-Mapping claude-only: opus-builder/opus-critic unverändert; sol-*/kimi-*/grok-* → Sonnet (Kritiker read-only, Copy, Technik); luna/massen → Haiku; terra-bulk → Opus; visual-kritiker → Sonnet; fable-advisor bleibt. Reihenfolge: Agent-Dateien → CLAUDE.md §3 → CLI-PROXY-STABILITY → dispatch.md → kritik-matrix.md, dann Evals.
