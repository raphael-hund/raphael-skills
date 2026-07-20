# methodik/ — Methodik-/Dev-Kern-Skills

Skill-übergreifende Vorgehensweisen (Dev-Kern), vendored aus superpowers (obra) und
mattpocock/skills und auf unser Schema gebracht. Herkunft + Kollisions-Entscheidungen:
`/root/raphael-skills/VENDORING.md` Abschnitt 1.

Aktueller Bestand (12):

| Skill | Zweck (1 Satz) |
|---|---|
| `brainstorm` | Idee → freigegebene Design-Spec, bevor Code entsteht (Hard-Gate). |
| `plan` | Spec → Umsetzungsplan mit exakten Pfaden + Code je Schritt. |
| `sdd` | Plan per frischer Subagenten je Task ausführen, Ledger statt Chat-Gedächtnis. |
| `tdd` | Kein Produktionscode ohne vorher gesehenen roten Test (Red-Green-Refactor). |
| `finish` | Fertigen Branch strukturiert abschließen (Tests, Merge/PR/Behalten/Verwerfen). |
| `code-review` | Cross-Vendor-Review anfordern UND empfangen (+ `references/zwei-achsen-review.md`). |
| `grill` | Plan/Entscheidung per Ein-Frage-Interview stresstesten. |
| `to-spec` | Vorhandenen Kontext zu einer PRD-Spec verdichten (ohne neues Interview). |
| `tickets` | Plan/Spec → vertikale Tracer-Bullet-Tickets mit Blocking-Kanten. |
| `handoff-ext` | Übergabe an eine FREMDE Instanz (Subagent/Tool/Person); vgl. `eigene/handoff`. |
| `research` | Recherche gegen Primärquellen, Ergebnis als zitierte Notiz. |
| `writing-skills` | Wie man in DIESEM Repo neue -Skills schreibt (+ `references/tdd-fuer-skills.md`). |

Bauordnung wie jeder Skill: `SKILL.md` mit Pflicht-Frontmatter
(`name`, `version`, `description`, `completion_criteria`) — `validate-skill.py` muss grün sein.
