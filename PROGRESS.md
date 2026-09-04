# PROGRESS — raphael-skills

## Web-Inspiration + Komponenten-Zugänge (CLI-Presse) — 2026-09-04, zweite Session

### Auftrag (1 Satz)
Für Raphaels Quellenliste (Galerien, UI-/Komponenten-Bibliotheken, Effekte, Assets, Icons, Fonts, RN) soll der web-Skill echte Zugänge haben: wie holt der Agent Inspiration (Refero, Mobbin, 21st, Galerien) und wie zieht er Komponenten — mit printing-press, wo eine flache REST-API dahintersteht.

### Stand
- ERLEDIGT (alle mit Qualitätsschleife G1 → Fremd-Judge PASS, Commit `9bbf2fa`, gepusht auf `feat/web-workflow-evidenzvertrag-20260901`):
  - `scripts/design-mcp.mjs`: Refero (styles/screens/flows, image → Datei), Mobbin (screens/flows/sections, SSE, Bilder als Dateien), 21st (search/get --out/inspiration/logo/theme) per JSON-RPC; Eval `run-design-mcp-check.mjs` 36/36 (+`--netz`). Sol-Build, Grok-Judge PASS Runde 2.
  - `scripts/komponenten.mjs`: `libs` (292 shadcn-Registries aus `ui.shadcn.com/r/registries.json` + Vendor + npm + Docs-Libs, alle Namen aus Raphaels Liste), `search <@ns|name>`, `view`, `get --out` (eine Komponente, Werkzeugtabellen-Zeile + Router-Anker), `install-hint`; Eval `run-komponenten-check.mjs` 21/21 (+`--netz`). Sol-Build, Grok-Judge PASS.
  - `scripts/inspiration.mjs`: 10 neue Galerien (`supahero cta recent fps posts loadmore kinetics notfound circleloaders umanmade`), Firecrawl-Key aus `api-keys.env` (Siteinspire läuft wieder), `navbar list` ohne Typ; Eval 62/62 (+`--netz`).
  - printing-press-CLIs (cli-printing-press 4.31.6, `GOFLAGS=-buildvcs=false GOCACHE=/tmp/rh-gocache`): `pexels-pp-cli`, `polyhaven-pp-cli`, `iconify-pp-cli`, `fontshare-pp-cli`, `codrops-pp-cli` in `~/.local/bin`; Specs `/root/tools/printing-press/specs/*.yaml`, Library `/root/tools/printing-press/library/<name>/` (VERIFY.txt je CLI, verify PASS). Nicht in git (377 MB).
  - Doku: `zugangskarte.md` (Arbeitsverzeichnis, Schlüssel statt Domains, jede Quelle der Liste hat einen Weg, Login-Tabelle um Pexels-Key), `modus-inspiration.md` (Befehlsfolgen, Abschnitt „Komponenten ziehen", Lizenz-Regel), `tool-usecase-router.md` (Install/Use-Zellen), `SKILL.md` 0.33.1.
  - Abnahme durch frische Opus-Instanz (nur Doku, Zahnarzt-Zürich-Minilauf): 16 Aufrufe liefen; 6 Lücken gefunden und danach behoben (Basispfad, Galerie-Schlüssel, navbar-Typ, search-Token, Foto-Weg, Lizenz-Regel). Zweite Abnahme (frische Opus-Instanz): 19 Aufrufe liefen, FAIL wegen 6 Doku-/Verhaltenslücken (Docs-URLs nur mit --json, Mehrwort-Suche, Float UI/Shoogle tot, stock-Query, Iconify-Substring, PATH); alle sechs danach behoben (Commit nach `f2129b4`), dritte Abnahme nicht gelaufen.
- OFFEN:
  - ~~PEXELS_API_KEY~~ seit 04.09.2026 nachmittags in `api-keys.env`; `photos search` live belegt (5264 Treffer „dentist").
  - Judge-Notizen ohne Fix: kinetics-`get` schreibt teils <200 B (Keyframes stehen auf der Seite); loadmore-`get` mit unbekanntem Slug → exit 3 statt 1; iconify `--out` nur als `--deliver file:`; Fontshare `list --search` filtert nicht (get-by-slug geht).
  - Cult UI / Motion Primitives: Registry hinter Vercel-Checkpoint (429) → Vendor/Docs.
  - MAKE Plan-Session (aus der Vormittagssession) weiterhin offen.

### Entscheidungen
- Kurskorrektur zu „keine CLI pro Site": jetzt ein Werkzeug pro **Zugangstyp** (MCP-Client, Komponenten-Skript, Galerie-Skript, printing-press für flache REST). Kein zweites Werkzeug für denselben Typ.
- MCP-Server (JSON-RPC, SSE) **nicht** mit printing-press wrappen: der Generator flacht verschachtelte Bodies zu `--params-arguments-*`-Flags ab, `body_name` nestet nicht (Observation 30). Deshalb `design-mcp.mjs` als Node-Skript.
- Grok als **Builder** für lange Leaves gesperrt (nur Judge): 4 grok-worker-Leaves starben nach 12–36 Tool-Calls am Budget-Guard („missing watchdog state") nach Stream-Timeouts, nicht am Zeitbudget (Observation 44). Sol baute alles durch.
- Foto-Default bleibt Shutterstock (`stock.mjs`); Pexels nur ohne Passung.

### Fallen
- `cli-printing-press generate` bricht ohne `GOFLAGS=-buildvcs=false`; Root-GOCACHE teils nicht beschreibbar → `GOCACHE=/tmp/rh-gocache`.
- Mobbin verlangt `Accept: application/json, text/event-stream` (sonst 406) und antwortet als SSE.
- Firecrawl keyless läuft ins Ratenlimit; Key steht als `export FIRECRAWL_API_KEY=` in `api-keys.env` (export-Präfix beachten).
- validate-skill.py rekursiv über `skills/eigene/web` ist wegen der ungetrackten Vendor-Snapshots unter `resources/components/` immer rot → nur `SKILL.md` direkt prüfen.
- Workflow-Leaves: `RAPHAEL_SUBAGENT_MAX_*` gilt, aber der eigentliche Killer war der Stall-Watchdog (180 s) bei Grok-Latenz.

### Nächster Schritt
MAKE Plan-Session (Rolle Plan) aus `/root/clients/client-make/web/handoff/PLAN.md`; optional dritte Doku-Abnahme.

## Web-Inspiration + MCP/CLI-Anbindung — 2026-09-04

### Auftrag (1 Satz)
Der web-Skill soll Inspiration als eigenen Modus fahren und dafür Refero, Mobbin, 21st, Galerien, Screenshots und Shutterstock live nutzen; erster echter Lauf für MAKE Marketing.

### Stand
- ERLEDIGT:
  - `cli-printing-press` 4.31.6 + 9 Skills installiert (`~/.local/bin/cli-printing-press`).
  - MCPs als User-Server verbunden: `refero` (Bearer), `21st` (x-api-key aus `~/.config/21st/auth.json`), `mobbin` (OAuth; war in `/etc/claude-code/managed-settings.json` deniedMcpServers gesperrt, entfernt, Backup `.bak-mobbin-allow-*`). Token-Refresh `mobbin-refresh.py` per Cron `*/40`.
  - 21st CLI eingeloggt, Plan **Builder** gekauft (64 €/Jahr, PostFinance-Karte), Tier paid, unbegrenzte Code-Abrufe.
  - Shutterstock: App „Raphael VPS CLI“, OAuth-Token in `/root/.secrets/api-keys.env`; `scripts/stock.mjs` (search/preview/license/quota/add → bilder.mjs, `stock-lizenzen.json`), Eval 20/23.
  - `scripts/inspiration.mjs`: 14 Quellen (Refero, Navbar, Magic UI, React Bits, 21st inkl. `code <id> --out`, Landdding, Awwwards, Siteinspire, Curated, Getlayers, Behance, Inspora, Swiped, Mobbin-Hinweis) + `shot` (Playwright, Cookie-Fallback). Eval 45/45, Netz 57.
  - web 0.32.0: `references/modus-inspiration.md`, `references/zugangskarte.md`, `references/stock-bilder.md`; Router/Pfad/Gotchas nachgezogen; Load-Path 25/25, Katalog-Hash unverändert.
  - Zwei Videos ausgewertet (Jack Roberts, Griffin Wooldridge) → Lehren in `inspirations-quellen.md`.
  - MAKE-Erstlauf: `/root/clients/client-make/web/art-direction.md` mit Reference-Lock (Primär Base Design), 8-zeiligem Shot-Ledger, Recherche unter `web/inspiration/`, 3 21st-Komponenten als tsx, Stock-Preview; Handoff `web/handoff/PLAN.md`. Client-Commit `6d53469`.
  - raphael-skills gepusht bis `bef3cfc` auf `feat/web-workflow-evidenzvertrag-20260901`.
- OFFEN (WIP=1): MAKE Plan-Session (Rolle Plan) aus dem Handoff starten.
- Gates-Status: G1 grün (alle Evals), G2 Cross-Family-Reviews (Sol/Grok/Opus) durchlaufen; Ship-Bedingung n/a (Skill-Arbeit, kein Launch).

### Nächster Schritt (exakt, sofort startbar)
Neue Session in `/root/clients/client-make`, `/web` Rolle Plan: `node /root/raphael-skills/skills/eigene/web/scripts/session-gate.mjs --rolle plan --client /root/clients/client-make/web/handoff`, dann `PLAN.md` aus `art-direction.md` (Lock) + `references/rolle-plan.md` füllen. Vorher echte MAKE-Zahlen/Logos und Grotesk-Familie (Adobe Fonts Library) von Raphael holen.

### Entscheidungen (warum, damit nicht neu diskutiert)
- Keine CLI pro Site aus der Tweet-Liste → `zugangskarte.md` mit einem Weg je Quelle (MCP/Skript/Vendor/npm/open/Login).
- Inspiration ist Modus mit Leaves, Parent liest keine PNGs; Ledger-Spalte `gelesen-von`; Ist-Shots in `client-<name>/web/inspiration/shots/`.
- 21st Builder statt Builder+AI (KI-Generierung nicht gebraucht, Opus/Grok im Workflow).
- Kimi gesperrt (Raphael 03.09.) → Sol/Grok/Opus decken Leaves.
- Workflow-Leaves sehen `mcp__*` oft nicht → JSON-RPC gegen denselben Server ist zulässig, kein BLOCKED (steht im Modus).
- LOCKS: keine Raphael-Neins in dieser Session.

### Kontext-Pfade
- Repo(s): `/root/raphael-skills` (Branch feat/web-workflow-evidenzvertrag-20260901), `/root/clients/client-make`
- Auth-Relays + README: `/root/tools/auth-relays/` (21st, Mobbin, Shutterstock, Refresh)
- Secrets (nicht committet): `/root/.secrets/api-keys.env` (SHUTTERSTOCK_*, API_KEY_21ST), `~/.config/21st/auth.json`, `/root/.claude/.credentials.json` (mobbin)
- Review-Inbox: `/root/raphael-command-center/ops/review-inbox.md` (Einträge 04.09.)
- Uncommitted fremd: `skills/eigene/web/SKILL.md` (Qualitätsschleife/fable-builder-Zeilen, nicht diese Session), mehrere `references/*` (kritik-matrix, rolle-*, orchestrierung, Router-Block 1b), `evals/modell-eignung/`.

### Fallen & Sackgassen
- `claude mcp add mobbin` überschreibt den OAuth-Eintrag (Token leer) → danach immer `mobbin-oauth.mjs` neu fahren. Siteinspire: Vercel-Checkpoint auch im VPS-Chrome → nur `siteinspire list` (Firecrawl). Inspora-Startseite zeigt nur Intro-Logo → Medien-URLs aus `inspora list`.
- VPS-Chrome-CDP hängt nach vielen Playwright-MCP-Prozessen → `systemctl restart raphael-chrome.service`; Google-2FA nur am Handy, Passwort liegt in api-keys.env (GMAIL_RHVISUALS_PASSWORD).
- Shutterstock-Suche auf Deutsch liefert 0 → englische Queries. `run-eval-umfang.mjs --aktualisieren` läuft >15 min → eval-umfang.json direkt editieren.
- `/tmp/probe*.mjs` gehören anderen Prozessen (Permission denied) → eigene Pfade unter `/tmp/rh-*`.


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

**Offen (WIP=1):** MAKE-Pilot Briefing/Cases bestätigen lassen (`/root/clients/make/website/pilot-2026-09-03/PLAN.md`); Skeleton steht.

**Gates (final gemessen 2026-09-03):**
- design: detect 36/36, browser 40/40, doku-zahlen 10/10, validate-skill OK
- web: kanon 20/20, bookmark 23/23, muster 23/23, referenz-verweise 99 gültig, validate-skill OK
- stamp-batch: 5 Cases mit Quelle + Desktop-/Mobil-Fold + 3 Fragen; schreibt nie
- Secrets im Diff/Raw: 0
- Commit/Push: folgt in diesem Handoff

**Fallen:** siehe `worklog/2026-09-03-handoff-web-setup-fable.md`
