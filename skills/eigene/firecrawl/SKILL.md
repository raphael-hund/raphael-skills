---
name: firecrawl
version: 0.1.0
description: >
  Holt sauberen Web-Kontext über die Firecrawl-CLI oder den gehosteten MCP:
  suchen, eine URL scrapen, bei Bedarf klicken, lokale Dateien parsen.
  Trigger: "Firecrawl", "Seite scrapen", "Web suchen", "firecrawl search",
  "firecrawl scrape", "sauberes Markdown von URL".
class: O
scope: agency
sensitivity: internal
source: Ideen-Merge, kein Vendoring. Firecrawl-Onboarding 2026-08-15, CLI v1.20.0.
completion_criteria:
  - "firecrawl --status zeigt Authenticated via FIRECRAWL_API_KEY, ohne den Key auszugeben"
  - "Mindestens ein echter firecrawl search- oder scrape-Lauf liegt als Datei vor und ist nicht leer"
  - "Kein FIRECRAWL_API_KEY steht in Git, Skill, MCP-Config oder Chat-Ausgabe"
---

# firecrawl: Web suchen und scrapen

**Lies zuerst:** `/root/.secrets/README.md` (Key nur in `api-keys.env`).
Login-Klick im eigenen Chrome bleibt [`raphael-chrome`](/root/raphael-skills/skills/raphael-chrome/SKILL.md).

## Herkunft, Job, Problem

Herkunft: Raphael hat einen Firecrawl-Key gegeben. Offizielle Vendor-Skills
sind drei Repos (CLI, Build, Workflows), nicht unser Frontmatter.
Job: Agent holt jetzt Web-Markdown über ein Werkzeug.
Problem: Es gab keinen Raphael-Skill und keinen gemeinsamen MCP für
Grok, Claude und Codex. Deshalb eine neue Datei hier, kein Vendor-Dump.

## Zweck (1 Satz)

Zuerst suchen, dann eine bekannte URL scrapen, nur bei Formularen `interact`.

## Wann nicht

- Eingeloggte Session, Autofill, Captcha → `raphael-chrome`.
- Firecrawl in Kunden-App-Code einbauen → Key aus Secrets, SDK laut
  [docs.firecrawl.dev](https://docs.firecrawl.dev), nicht diesen Skill-Text
  in das Kundenrepo kopieren.
- Primärquellen-Brief → Skill `research`; Firecrawl ist dort nur Beschaffung.

## Setup (einmal)

Key: `FIRECRAWL_API_KEY` in `/root/.secrets/api-keys.env` (chmod 600).
CLI: `firecrawl` (`/usr/bin/firecrawl`).
MCP: `https://mcp.firecrawl.dev/v2/mcp` mit Header
`Authorization: Bearer ${FIRECRAWL_API_KEY}` (Variable, nie der Wert).

| Harness | MCP-Ort | Skill-Ort |
|---|---|---|
| Grok | [`~/.grok/config.toml`](/root/.grok/config.toml) `mcp_servers.firecrawl` | dieser Ordner über `[skills].paths` |
| Claude | [`~/.claude.json`](/root/.claude.json) + [`.mcp.json`](/root/.mcp.json) | `~/.claude/skills/firecrawl` |
| Codex TUI / Lane | `CODEX_HOME` `mcp_servers.firecrawl` | Adapter `raphael-skills/codex/skills/firecrawl` |

Vor der Arbeit:

```bash
set -a; . /root/.secrets/api-keys.env; set +a
firecrawl --status
```

Fertig = Zeile `Authenticated via FIRECRAWL_API_KEY`, Key nicht gedruckt.

## Ablauf (live)

1. `firecrawl search "<frage>"` wenn die URL fehlt.
2. `firecrawl scrape "<url>" -o /tmp/…/seite.md` wenn die URL feststeht.
3. `firecrawl interact` nur wenn Klick oder Formular nötig ist und
   `raphael-chrome` nicht die bessere Session hat.
4. `firecrawl parse ./datei.pdf -o …` nur für lokale Dateien.
5. Schlägt der Job fehl: `firecrawl doctor <jobId>`, nicht raten.

Grok/Claude mit verbundenem MCP: dieselben Schritte über die Firecrawl-Tools.
CLI bleibt der Beweisweg, wenn MCP in der Session fehlt.

## Harte Regeln

- Key nur aus der Umgebung. Nie in Prompt, Commit oder Screenshot.
- Kein `npx firecrawl-cli init --all --browser` in einer Agent-Session.
- Kein Dump der drei Vendor-Skill-Repos nach `raphael-skills`.
- Orca bleibt Desktop-Fenster, nicht Web-Scrape.
