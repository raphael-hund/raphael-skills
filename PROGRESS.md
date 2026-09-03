# PROGRESS — raphael-skills

## Web-Setup Fable-Controller — 2026-09-03

**Auftrag:** Website-Setup unter Fable 5.1 als Controller so umbauen, dass Agentur-Sites aus Vorbildern statt nur Verboten gebaut werden; Tickets 12/13/15/16 der Wayfinder-Map schließen.

**Erledigt:**
- Live-Profil `multi-family` wiederhergestellt und festgehalten; `claude-only` bleibt Schalter.
- Desktop-Workflow-Transport für Grok/Sol: `claude-gw-xai-4.6` / `claude-gw-sol-5.6` in `/root/.claude/hooks/gateway_aliases.py` + `pin-subagent-model.py`; Hook-Tests 70 OK; Live-Spawn `TRANSPORT_OK`.
- `design` 0.5.0: Detektoren impeccable v4.0.5 (59 Regeln), Craft-Floor Browser-Oberflächen/Refuse, Zwei-Pass + Signature-Element, VENDORING Re-Sync + frontend-design Ideen-Merge.
- `web` 0.31.0: `eingang-url-watch.mjs`, `stamp-batch.mjs`, `video-vorfilter.mjs`, `x-bookmarks-pull.mjs`; Evals `run-kanon-pipeline-check` 20/20 und `run-x-bookmark-pipeline-check` 23/23.
- Acht neue Muster-Cases: seo-labs, leadfluss, pangram, ploy-ai, lassie-ai, cryptory, tradingfreaks, matthias-aumann; INDEX und Regel-Kandidaten nachgezogen.
- Quellen-Ledger 23 Zeilen; Bookmark-Ledger 30 ausgewertet, 2 Website-Kandidaten.
- Wochenjob `weekly-web-reference-stamps` (Mo ~09:00 lokal) aktiv.
- Map/Tickets 12,13,15,16 resolved unter `.scratch/web-setup-fable/`.

**Offen (WIP=1):** MAKE-eigene Website als Pilot-Abnahme mit dem neuen Setup starten (`PLAN.md` + Blind-Abnahme-Kriterium).

**Gates (final gemessen 2026-09-03):**
- design: detect 36/36, browser 40/40, doku-zahlen 10/10, validate-skill OK
- web: kanon 20/20, bookmark 23/23, muster 23/23, referenz-verweise 99 gültig, validate-skill OK
- stamp-batch: 5 Cases mit Quelle + Desktop-/Mobil-Fold + 3 Fragen; schreibt nie
- Secrets im Diff/Raw: 0
- Commit/Push: folgt in diesem Handoff

**Fallen:** siehe `worklog/2026-09-03-handoff-web-setup-fable.md`
