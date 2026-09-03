# DECISIONS — raphael-skills

## 2026-09-03 — Web-Setup / Flotte / Transport

- **multi-family bleibt** (Raphael). `claude-only` ist nur Schalter, kein Live-Default.
- Fable ist Controller-only; nie Builder/Reviewer/Fallback-Worker.
- Desktop-Workflows müssen Fremdfamilien als `claude-gw-xai-4.6` / `claude-gw-sol-5.6` / `claude-gw-k3` transportieren. Kanonische IDs `xai/grok-4.6` und `gpt-5.6-sol` werden vom Desktop-Harness vor dem Proxy abgewiesen.
- Geschmacks-Kanon: Raphael stempelt manuell. Agent setzt nie GO/NO-GO. Cases mit `Begründungssatz offen` bleiben `kandidat`.
- Bookmark-Wahrheit: bestehende Brain-Runtime (`bookmarks_sync` venv/wrapper) ist operativ verwaist. Adapter nutzt `/root/.local/bin/twitter` und schreibt nach `/root/raphael-brain/raw/x-bookmarks/<id>.md`.
- Cookie-Werte nur in `/root/.secrets/api-keys.env` bzw. `/root/tools/secrets/bookmarks.env`; nie in Repo, Prompts oder Reports.
- Firecrawl-Key in MCP-Konfig ist ungültig; X-Recherche bleibt vorerst CLI/jina.
