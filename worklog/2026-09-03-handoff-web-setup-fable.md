# Handoff — Web-Setup Fable-Controller — 2026-09-03

## Auftrag
Website-Setup für Claude Code mit Fable 5.1 als Controller: Design-Refresh, Kanon-/Bookmark-Pipelines, fremdfamiliäre Reviews, Betriebsjob.

## Stand
- Tickets 12/13/15/16 resolved.
- design 0.5.0, web 0.31.0.
- 8 neue Studien, 30 Bookmark-Triples, Wochenjob aktiv.
- Live-Profil multi-family.

## Gates
Siehe `PROGRESS.md` dieses Repos (final gemessen).

## Fallen & Sackgassen
- Workflow-Scripts dürfen keine Markdown-Backticks in Template-Literals tragen — Parser bricht.
- String-Match auf `FAIL`/`BLOCKED` in Review-Texten ist zu grob: Formulierungen wie „kein FAILOVER“ oder „fail-closed“ lösen Fake-Fixrunden aus. Verdict muss am Label `verdict: PASS|FAIL` geparst werden.
- Kanonische Fremdmodell-IDs im Desktop-Workflow sterben vor dem Proxy. Immer Desktop-Transport-IDs nutzen; Familie über `canonical_model` ableiten.
- Parallel-Sessions können `/root/.claude/fleet-profile` umschalten. Vor Review/Bau Live-Profil prüfen; Umschalten nur über `/root/tools/fleet-profile.sh`.
- Alte Brain-Doku zu `bookmarks_sync` ist veraltet (venv/wrapper/cron fehlen). Keinen zweiten Downloader „reparieren“, solange die `twitter`-CLI funktioniert.
- `stamp-batch` schreibt nie und darf nie Auto-Urteile setzen. Pending = Urteil ausstehend ODER Begründungssatz offen.
- Nie `git add -A`: Repos sind massiv fremd-dirty (`design/vendor`, `rules.de.mjs` de-14-AUS, Katalog-Subskills).
- Hooks unter `/root/.claude/hooks/` liegen außerhalb eines normalen Repo-Roots; Stand nur live auf dem VPS, nicht über `raphael-skills` versioniert.

## Kontext
- Map: `.scratch/web-setup-fable/map.md`
- Runtime-Notiz: `.scratch/web-setup-fable/live-runtime-entscheidung-2026-09-02.md`
- Bookmark-Iststand: `.scratch/web-setup-fable/brain-bookmark-iststand-2026-09-02.md`
