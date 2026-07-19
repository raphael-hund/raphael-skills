# methodik/ — Methodik-/Dev-Kern-Skills

Skill-übergreifende Vorgehensweisen (Dev-Kern), vendored aus superpowers (obra) und
mattpocock/skills und auf unser Schema gebracht. Herkunft + Kollisions-Entscheidungen:
`/root/raphael-skills/VENDORING.md` Abschnitt 1.

Aktueller Bestand (12):

| Skill | Zweck (1 Satz) |
|---|---|
| `r-brainstorm` | Idee → freigegebene Design-Spec, bevor Code entsteht (Hard-Gate). |
| `r-plan` | Spec → Umsetzungsplan mit exakten Pfaden + Code je Schritt. |
| `r-sdd` | Plan per frischer Subagenten je Task ausführen, Ledger statt Chat-Gedächtnis. |
| `r-tdd` | Kein Produktionscode ohne vorher gesehenen roten Test (Red-Green-Refactor). |
| `r-finish` | Fertigen Branch strukturiert abschließen (Tests, Merge/PR/Behalten/Verwerfen). |
| `r-code-review` | Cross-Vendor-Review anfordern UND empfangen (+ `references/zwei-achsen-review.md`). |
| `r-grill` | Plan/Entscheidung per Ein-Frage-Interview stresstesten. |
| `r-to-spec` | Vorhandenen Kontext zu einer PRD-Spec verdichten (ohne neues Interview). |
| `r-tickets` | Plan/Spec → vertikale Tracer-Bullet-Tickets mit Blocking-Kanten. |
| `r-handoff-ext` | Übergabe an eine FREMDE Instanz (Subagent/Tool/Person); vgl. `eigene/r-handoff`. |
| `r-research` | Recherche gegen Primärquellen, Ergebnis als zitierte Notiz. |
| `r-writing-skills` | Wie man in DIESEM Repo neue `r-*`-Skills schreibt (+ `references/tdd-fuer-skills.md`). |

Bauordnung wie jeder Skill: `SKILL.md` mit Pflicht-Frontmatter
(`name`, `version`, `description`, `completion_criteria`) — `validate-skill.py` muss grün sein.
