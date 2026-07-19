# ops/ — Betriebs-Skills (Server-/Agenten-Betrieb selbst)

Platzhalter. Noch kein Ops-Skill angelegt (Stand skills v1).

Abgrenzung zu `eigene/`: `eigene/` enthaelt Skills fuer die Kundenarbeit (Loops 1-4:
Onboarding, Web, Ads, SEO) + Quer-Skills (Copywriting, Eval, Orchestrate, Handoff,
Report, Offers). `ops/` ist fuer Skills, die den Agenten-Server selbst betreffen
(z. B. Quota-Pflege, Cron-Runbook-Ausfuehrung, Backup-Verifikation, Restore-Test) —
Dinge, die `raphael-command-center/ops/` operativ ergaenzen, aber als wiederverwend-
bares Skill-Verhalten (nicht als einmaliges Skript) formuliert sind.

Bauordnung wie jeder andere Skill: `SKILL.md` mit Pflicht-Frontmatter
(`name`, `version`, `description`, `completion_criteria`), siehe README.md im
Repo-Wurzelverzeichnis.
