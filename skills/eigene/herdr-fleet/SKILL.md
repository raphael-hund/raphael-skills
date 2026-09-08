---
name: herdr-fleet
version: 0.1.0
description: >
  Koordinator-Skill für Herdr auf dem VPS: Fable/Astra als Lead, Worker (Opus für
  Frontend, Codex/Sol für Backend, Grok als Fremd-Reviewer) in eigenen Panes und
  Git-Worktrees, Arbeit als Bean-Datei auf main, Brief-Datei statt langem Prompt,
  Ankündigung per `fleet done`, Watcher routet Review/Followup/Refill, Lead landet
  mechanisch und pusht nie. Trigger: "Herdr", "Flotte", "fleet", "mit Herdr bauen",
  "Worker in Panes", "Koordinator-Modus", "als Team bauen".
class: O
scope: agency
sensitivity: internal
source: >
  Muster von Voxyz_ai (X 2095917499430711319, 2086059460502417772) und andrebrov
  (X 2097134891833917946, 08.09.2026); Herdr 0.9.0 (Apache-2.0, herdrdev/herdr);
  beans (Apache-2.0, hmans/beans). Skript `scripts/fleet` eigenständig geschrieben
  und am 08.09.2026 auf dem VPS live getestet.
loads:
  - scripts/fleet
  - references/koordinator-prompt.md
  - references/vps-befunde.md
requires_skills: [herdr@^0]
completion_criteria:
  - "Jeder Worker wurde mit explizitem Modell und Effort gestartet und `fleet check` zeigt Kind, Modell und Status; fehlt eines, wurde gestoppt statt mit Defaults weitergemacht"
  - "Jeder schreibende Worker hat einen eigenen Worktree auf fleet/<name>; zwei Schreiber teilen nie einen Checkout"
  - "Jeder Auftrag war eine Bean-Datei auf main plus ein Brief unter /root/.fleet/briefs; der Lead hat keinen Feature-Code selbst geschrieben"
  - "Jede DONE-Meldung eines Coders wurde von einem Reviewer eines anderen Harness geprüft; das Review endet mit BEAN/LANDABLE/VERDICT"
  - "Gelandet wurde nur über `fleet land` (Cherry-Pick, Check, merge --no-ff); nichts wurde gepusht, deployt oder gegen Produktion migriert"
  - "Abschluss nennt Ergebnis, Belege, offene Punkte und noch laufende Panes/Worktrees"
---

# herdr-fleet — Lead koordiniert, Worker bauen, Watcher routet

**Lies zuerst:** `references/vps-befunde.md` (was auf diesem VPS anders ist als in den
Posts) und `references/koordinator-prompt.md` (der Prompt, den Raphael dem Lead gibt).

## Zweck (1 Satz)
Fable oder Astra bleibt Lead und verbraucht kein Kontingent fürs Tippen; Opus, Sol und
Grok arbeiten in Herdr-Panes mit eigenen Worktrees, und jede Übergabe ist eine Datei.

## Voraussetzung
```bash
test "${HERDR_ENV:-}" = 1 || echo "Nicht in Herdr: Lead-Session mit 'herdr' oder fleet up + herdr agent attach starten"
fleet up          # Herdr-Server (Session 'fleet', headless) hochfahren
fleet status
```
`fleet` liegt unter `/root/.local/bin/fleet` (Symlink auf `scripts/fleet`). Der Lead darf
`fleet` auch ohne `HERDR_ENV` nutzen, weil `fleet` die Session explizit setzt.

## Rollen und Pools (Stand 08.09.2026, `multi-model`-Skill gilt weiter)
| Rolle | Harness | Standard-Modell | Effort | Worktree |
|---|---|---|---|---|
| Lead | Claude-Hauptsession (Fable) oder Codex (Astra) | — | — | Integrations-Checkout |
| Frontend-Coder | `claude` | `claude-opus-5` | xhigh | eigener |
| Backend/Tests-Coder | `codex` | `gpt-5.6-sol` | xhigh | eigener |
| Reviewer | anderer Harness als der Coder; `grok` (grok-4.6) oder `codex` | high | read-only, geteilter Checkout |

Namensschema: `<task>-<rolle>-<harness>`, klein, kurz: `login-ui-claude`, `login-api-codex`,
`login-review-grok`. Der Name steht im Pane-Header und in `fleet check`.

## Ablauf
1. **Bestand prüfen:** `fleet status`. Ein Worker reicht, wenn die Aufgabe nicht
   unabhängig zerlegbar ist. Zweiter Worker nur bei echter Parallelität oder Review.
2. **Beans anlegen** im Zielrepo (auf `main`, committen!). Ein Bean = ein Ergebnis:
   ```bash
   cd /root/clients/<repo> && beans init   # einmalig
   beans create "Login-Formular validiert E-Mail" -t task -p high -d "$(cat <<'EOF'
   Muss liefern: ...   Darf ändern: src/login/*   Nicht anfassen: prisma/, .env*
   Verifikation: pnpm test src/login   Artefakt: Commit auf fleet/<name> + Screenshot unter /root/.fleet/reports/
   EOF
   )"
   git add .beans && git commit -m "bean: login-formular"
   ```
   Ein Bean, der nicht auf `main` liegt, existiert für die Flotte nicht (Guard im Watcher).
3. **Worker starten** — Modell und Effort immer explizit:
   ```bash
   fleet spawn login-ui-claude  --kind claude --role coder    --repo /root/clients/<repo>
   fleet spawn login-api-codex  --kind codex  --role coder    --repo /root/clients/<repo>
   fleet spawn login-review-grok --kind grok  --role reviewer --repo /root/clients/<repo> --readonly --effort high
   fleet check
   ```
   Zeigt `fleet check` nicht `idle` mit dem erwarteten Kind, `fleet screen <name>` lesen
   und Raphael melden. Nicht mit geerbten Defaults weiterarbeiten.
4. **Zuweisen:** `fleet queue add <bean-id>` (Watcher füllt freie Coder) oder gezielt
   `fleet assign login-ui-claude <bean-id>`. Der Brief liegt dann unter
   `/root/.fleet/briefs/<name>.md`; der Worker bekommt nur den Einzeiler „Lies die Datei …“.
5. **Watcher laufen lassen** (eigene Pane oder Hintergrund):
   ```bash
   fleet watch            # Tick 60 s: Inbox → Review-Lane → Followups → Refill → Artefakt-Check
   fleet watch --once     # ein Durchlauf, wenn der Lead selbst taktet
   ```
6. **Kopfzeilen lesen, nie Logs:** `fleet status` und `/root/.fleet/log/fleet.log`.
   Bei `LANDABLE` den Report unter `/root/.fleet/reports/` lesen; bei Scope-, Sicherheits-
   oder Verhaltensrisiko den Diff des eingefrorenen Commits ansehen (`git -C <worktree> show <commit>`).
   Bei visueller Arbeit Screenshots und die laufende Seite prüfen.
7. **Landen** (nur der Lead, mechanisch):
   ```bash
   fleet land login-ui-claude <commit> --check "pnpm build && pnpm test"
   ```
   Cherry-Pick in `.fleet-verify`, Check, `merge --no-ff` auf `main`, Bean auf `completed`.
   **Kein Push.** Push, Deploy, Produktion und Secrets bleiben bei Raphael.
8. **Abschluss:** Ergebnis, Belege (Commit, Testausgabe, Screenshot-Pfade), offene Punkte,
   laufende Panes/Worktrees (`fleet status`). Aufräumen mit `fleet stop <name>`; Worktrees
   bleiben bis Raphael sie löscht.

## Regeln, die mechanisch feuern (im Skript, nicht in Prosa)
- Coder-DONE → Review auf anderem Harness (`pick_reviewer` schließt gleiche Familie aus).
- Reviewer-CHANGES → Followup-Lane für genau diesen Coder, vor allem aus der Queue.
- DONE ohne freien Fremd-Reviewer → Retry-Lane (`reviews/pending`), jeden Tick erneut, nie verworfen.
- Nicht dispatcht: Bean nicht auf `main`, Status ≠ `todo`, schon in Arbeit, schon im Review,
  Harness `dry` (`fleet credits <kind> dry|ok`; Erkennung über Limit-Text im Pane).
- Meldung für einen Bean, auf dem der Agent nicht sitzt → `STALE`, geloggt, ignoriert.
- Status ist keine Evidenz: `fleet check` zählt Commits seit Dispatch, Alter des letzten
  Commits und Report-mtime. 15 Minuten ohne Commit und Report → `FLAG` im Log.
- Reviewer müssen den Commit cherry-picken und bauen; Verdict ohne die drei Schlusszeilen
  `BEAN:` / `LANDABLE:` / `VERDICT:` zählt als CHANGES.

## Wann NICHT
- Aufgabe unter ~30 Minuten oder ein einziger Dateiedit: direkt in der Hauptsession
  (Router-Regel „Delegation kostet Overhead“).
- Kein Git-Repo: Herdr-Worktrees brauchen ein Repo. Notfalls `--readonly`-Worker.
- Wenn `HERDR_ENV` fehlt und Raphael nicht in Herdr sitzt, trotzdem nur über `fleet`
  arbeiten, nie den Herdr-TUI aus einer fremden Shell fernsteuern.

## Beispiele
- Website-Feature: `login-ui-claude` (Opus, Worktree) baut, `login-review-codex` (Sol)
  prüft, Lead landet. Zwei Harnesses, ein Checkout für die Integration.
- Backend-Migration mit Frontend-Anpassung: `db-api-codex` und `db-ui-claude` parallel in
  zwei Worktrees, disjunkte Pfade im Bean, Grok reviewt beide, Lead integriert nacheinander.

## Quelle
- `references/vps-befunde.md` — Live-Tests 08.09.2026 (Herdr 0.9.0, Codex 0.153.4, Claude 2.1.257).
- X-Posts: Voxyz_ai 2095917499430711319 und 2086059460502417772; andrebrov 2097134891833917946.
