# agents/ — Subagenten-Definitionen

Platzhalter. Noch keine Subagenten-Definition angelegt (Stand skills v1).

Regel 7 (AGENTS.md, Command-Center): "Subagents immer mit festem Modell UND Effort
losschicken — sonst erben sie das teure Leader-Setup." Dieser Ordner ist der Ort fuer
wiederverwendbare Subagenten-Rollen (Leader/Worker/Verifier-Profile: Modell + Effort +
Auftrag-Schablone fest verdrahtet), analog zu `.claude/agents/*.md` im
Repo-Template — hier zentral gepflegt und per Symlink in alle Harnesses verteilt,
damit nicht jedes Kundenrepo seine eigene Kopie pflegt.

Format (wenn der erste Agent angelegt wird): ein `.md` je Rolle mit Frontmatter
(`name`, `model`, `effort`, `description`) + Systemprompt-Koerper. Erst anlegen,
wenn eine Rolle 2x wiederholt echt gebraucht wurde (Regel 10, "Erst Schmerz, dann
Werkzeug") — kein Agenten-Bloat auf Vorrat.
