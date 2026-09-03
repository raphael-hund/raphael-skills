# Synthese-Vorschläge V1 bis V11 als skill-update-Diffs umsetzen

Type: task
Status: resolved
Blocked by: 01, 08

## Question

AFK nach 01 und 08: die 11 Pflichtform-Vorschläge aus /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/recherche/SYNTHESE.md §2/§3.3 je Zieldatei als minimalen Diff (skill-update Schritt 2b Inventar, Semver-Bump, validate-skill.py grün): V1 anfaenger-pfad.md Kanon-leer-Satz; V2 Layering als Layout-Familie (ui-layouts-catalog.md, _template.md); V3 Pain/Person/Promise-Felder in rolle-plan.md; V4 DESIGN.md-Export-Zeile + refero-Anker in tool-usecase-router.md (Lizenz geprüft: siehe Map); V5 drei Kritik-Ausgänge in kritik-matrix.md; V6 Feedback-Pfad 'Kritik hat X übersehen' in SKILL.md; V7 Modell-Eignungs-Katalog in agent-roster.md + evals/; V8 load-graph.md §6 Nach-Projekt-Audit; V9 /cost-Zeile in rolle-bau.md; V10 Dichte-Obergrenze nach Fold in lexlin-design-prinzipien.md; V11 Familien-Zählung im Merge (kritik-matrix.md). Vor jedem Diff Ist-Inhalt der Zieldatei lesen (Synthese hat rolle-*.md, qa-faecher.md, ui-layouts-catalog.md nicht gelesen). Worker: Opus baut, Sonnet reviewt read-only.

## Resolution (2026-09-02, Workflow wf_04819f12-3d0, Opus-Bau, Sonnet-Review claude-only/Instanz-Trennung)

- Paket D (PASS): V5 drei Kritik-Ausgänge und V11 Familien-Zählung in kritik-matrix.md, V6 Feedback-Pfad in web/SKILL.md (0.30.0, netto kürzer), V9 /cost-Zeile in rolle-bau.md; agent-roster.md verweist statt Abbruchlogik. Evals: run-video-evidence-check 42/42, run-site-build-load-path-check 21/25 (vier Fails vorbestehend seit Commit 72712dc vom 01.09., identisch gegen HEAD).
- Paket E (PASS): V1 anfaenger-pfad.md, V2 Layering-Familie in ui-layouts-catalog.md + _template.md (Premium-Ausnahme, Reduced-Motion), V3 Pain/Person/Promise in rolle-plan.md, V4 DESIGN.md-Export + refero-Anker in tool-usecase-router.md, V7 evals/modell-eignung/ (README + drei Fälle; nicht in agent-roster.md), V8 load-graph.md §6, V10 Regel 16 in lexlin-design-prinzipien.md.
- Korrekturen am Auftrag: "Refero Styles" existiert nicht als Katalogname (nur Refero); forbidden.md existiert nicht mehr, G0-Gate ist das copywriting-Script.
- Reports: /tmp/claude-997/-root/eeba6b3f-9784-4222-a9db-d2265e8f025e/scratchpad/bau/{D,E}-report.md, {D,E}-review.md, CHECKS.md.
- Offen (nicht dieses Ticket): validate-skill web FAIL durch vendored resources/components/ui-skills/skills/ui-skills-root/SKILL.md (unverändert im Git); run-eval-umfang läuft separat nach.
