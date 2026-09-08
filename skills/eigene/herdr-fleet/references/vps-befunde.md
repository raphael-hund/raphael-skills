# VPS-Befunde 08.09.2026 — was hier anders ist als in den Posts

Alles unten ist live getestet (Herdr 0.9.0, Codex 0.153.4, Claude Code 2.1.257, Grok CLI).

## Installiert
- `herdr` → `/root/.local/bin/herdr` (Install-Skript herdr.dev, SHA-geprüft). Headless:
  `HERDR_SESSION=fleet herdr server` (macht `fleet up`). Socket unter
  `~/.config/herdr/sessions/fleet/herdr.sock`.
- `beans` → `/root/.local/bin/beans` (go install, Go 1.26.5). Beans liegen als Markdown in
  `.beans/` mit Frontmatter `status|type|priority|tags`. IDs `<prefix>-<4 zeichen>`.
- Herdr-Skill (Original aus dem Binary, `herdr --skill`) liegt als `imported/herdr`.

## Stolperfallen, die `fleet` abfängt
1. **tmux-Menü in neuen Panes.** `~/.bashrc` startet bei SSH-Logins ein Zahlenmenü. In
   Herdr-Panes war die Shell dadurch „not an available shell“. Fix: Guard um `-z "$HERDR_ENV"`
   erweitert (Backup `~/.bashrc.bak-vor-herdr-20260908`).
2. **`claude` ist Shell-Funktion + Wrapper.** Beides leitet in den Command-Center-Launcher
   (`raphael-unified-vscode`) um, der in `/root/raphael-command-center` startet und dort mit
   „Request too large (max 32MB)“ scheitert. Worker starten deshalb das echte Binary
   `/opt/raphael/claude-code/<version>/claude` über `raphael-claude-process-wrapper`
   (Rechteabgabe an `raphael-claude`, Cwd bleibt der Worktree). `herdr agent start --kind claude`
   nicht für Worker verwenden; `fleet spawn` nutzt `pane run` + `agent rename`.
3. **Trust-Dialoge.** Claude fragt „trust this folder“ in neuen Worktrees; Codex fragt
   „Do you trust the contents“ und einmalig nach Hooks („Press t to trust all“, kam von
   `~/.codex/hooks.json` gh-axi/chrome-devtools-axi). `settle_dialogs` klickt beide weg.
4. **`agent prompt --wait` meldet `agent_prompt_stalled`** bei Claude, wenn der Text als
   Paste hängen bleibt. `send_pointer` schickt danach `enter`. Prompt-Text kurz halten,
   deshalb Brief-Datei + Einzeiler.
5. **Codex zeigt Effort im Header** (`model: gpt-5.6-sol xhigh`), Claude im Banner
   („Opus 5 with xhigh effort“). Grok-CLI kennt `--model` und `--reasoning-effort`.
6. **Rechte.** Worktrees unter `/root/.herdr/worktrees/` haben ACL für `raphael-claude`
   (rwx, default). `/root/.fleet` ebenso. Neue Repos außerhalb `/root/clients` ggf. mit
   `setfacl -R -m u:raphael-claude:rwx` freigeben.
7. **Effort-Antwort ist keine Evidenz.** Sol antwortete „EFFORT=ultra“, Opus „EFFORT=high“
   trotz `xhigh`-Flag. Maßgeblich sind Startbefehl (`argv` in der Herdr-Antwort), Header
   und `/status` (Codex: „reasoning xhigh“ bestätigt).

## Nicht getestet / offen
- Kein Ende-zu-Ende-Lauf mit echtem Kundenrepo. Getestet: spawn (claude/codex/grok),
  worktree create, prompt-Roundtrip, Datei schreiben aus Worker, Ankündigung, Watcher-Tick,
  Review-Routing, `land` in einem Testrepo (siehe Abschlussbericht 08.09.2026).
- `opencode`/GLM und `agy` aus dem andrebrov-Post sind hier nicht eingerichtet
  (`opencode` liegt unter `/usr/bin`, ohne Seats). Bewusst weggelassen.
- Grok als Reviewer: Start und Idle geprüft; ein voller Review-Lauf mit Cherry-Pick steht aus.
- Load: die 16 Kerne tragen ~4–6 Worker. 25 Agenten wie im Post sind hier nicht sinnvoll
  (Search-Runaway-Guard und Fleet-Reap greifen bei Speicherfressern).

## Nachtrag aus dem Ende-zu-Ende-Lauf (08.09.2026, Testrepo /root/fleet-e2e)
- Durchlauf: Bean auf main → `fleet spawn` (Opus-Coder im Worktree, Sol-Reviewer read-only)
  → Queue → Dispatch per Brief → Coder DONE mit Commit und Report → Watcher routet an
  Cross-Harness-Reviewer → Review mit Cherry-Pick, Tests, `BEAN: MET / LANDABLE: YES /
  VERDICT: APPROVE` → `fleet land` (Cherry-Pick in losgelösten Verify-Worktree, pytest,
  `merge --no-ff`). Nichts gepusht.
- **Globaler Git-Hook:** `core.hooksPath=/root/.config/git/hooks` startet bei jedem Commit
  kein LLM-Review-Hook mehr (Ponytail am 08.09.2026 auf Raphaels Wunsch entfernt);
  der Bean-Status-Commit in `fleet land` nutzt deshalb `--no-verify`. Merge-Commits lösen
  den Pre-Commit-Hook nicht aus.
- Codex-Reviewer lud selbstständig das Plugin `compound-engineering` (ce-code-review) und
  brauchte 31 Minuten für ein Zwei-Zeilen-Review. Für kleine Beans Grok als Reviewer nehmen
  oder im Brief „keine Plugin-Skills laden“ ergänzen.
- `herdr status` liefert Exit 0 auch ohne Server; `fleet` prüft Leben über `agent list`.
- Herdr meldet nach abgeschlossenem Turn `done`, nicht `idle`; beide gelten als bereit.
- Umlaute in Bean-Titeln: Git quotet Pfade; `fleet` setzt `core.quotepath=off`.
