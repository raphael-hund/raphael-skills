---
name: meta-ads-library
version: 0.1.0
description: >
  CLI für Meta Ad Library API (ads_archive, Graph v26.0). Pullt echte laufende
  Konkurrenz-Ads, filtert nach Laufzeit >= 30 Tage, liefert strukturierte
  JSON-Reports mit Hook-Typ, Story-Aufbau, Szenen-Takt, Beweisform, CTA.
  --compact für Agent-Nutzung (high-gravity fields only). Exit-Codes: 0=success,
  2=usage, 3=not found, 4=auth, 5=API error, 7=rate limited. Auto-JSON wenn
  piped. Nutze wenn: "Konkurrenz-Ads ziehen", "Ad Library", "was schaltet <Firma>".
class: F
scope: agency
sensitivity: internal
provenance: >
  PrintingPress Target 2026-08-09. ads-research hat HTTP 400 / API-Code 10
  (kein Ad-Library-Zugang) gemessen. Dieser CLI ist die standardisierte
  Lösung statt hand-roll fetch. Siehe /root/raphael-skills/skills/eigene/ads-research/SKILL.md:21-24.
completion_criteria:
  - "ads_archive Endpoint + required params (search_terms, ad_reached_countries, fields) implementiert und gegen echte API getestet"
  - "Laufzeit-Filter (>= 30 Tage) + Deep-Analyse nur auf Langläufer implementiert"
  - "--compact Flag liefert nur high-gravity fields (id, page_name, ad_delivery_start_time, ad_creative_body)"
  - "Typed Exit-Codes (0/2/3/4/5/7) + actionable error messages"
  - "Auto-JSON wenn stdout nicht TTY, Table-Output im Terminal"
  - "G1 validate OK, G2 kimi-recherche OK, Dedupe gegen index.json bewiesen"
---

# meta-ads-library — CLI für Meta Ad Library API

## Zweck (1 Satz)

Statt hand-roll fetch in ads-research: standardisierte CLI, die `graph.facebook.com/v26.0/ads_archive` abfragt, nach Laufzeit filtert, strukturierte Reports liefert — und agent-native Flags (`--compact`, auto-JSON, typed exit codes) hat.

## Voraussetzung

`META_ACCESS_TOKEN` mit **Ad Library Zugang** (nicht Ads-Manager-Token). Ohne: HTTP 400 / API-Code 10.

## Installation

```bash
go install github.com/raphael-skills/meta-ads-library@latest
# oder npx @raphael-skills/meta-ads-library
```

## Commands

### search

```bash
meta-ads-library search --terms "make" --countries DE --since 30d --compact
```

**Flags:**
- `--terms` (pflicht): Suchbegriffe
- `--countries` (pflicht): ISO-Codes (DE, AT, CH, ...)
- `--since` (optional): Mindest-Laufzeit in Tagen (default: 30)
- `--limit` (optional): Max Results (default: 50, bounded)
- `--compact` (optional): Nur high-gravity fields (60-80% weniger Tokens)
- `--json` (optional): Force JSON (default: auto wenn piped)
- `--dry-run` (optional): Zeige Query ohne API-Call

**Exit-Codes:**
- 0: Success
- 2: Usage error (missing flag, invalid country)
- 3: Not found (keine Ads)
- 4: Auth error (token ungültig/kein Ad-Library-Zugang)
- 5: API error (Graph Fehler)
- 7: Rate limited

**Output (Terminal):**
```
Showing 12 results. To narrow: add --limit, --json --select, or filter flags.

ID                  Page          Start          Runtime
2385091234567890    MAKE GmbH     2026-06-15     55d
2385098765432109    MAKE GmbH     2026-07-01     39d
...
```

**Output (piped/JSON):**
```json
[
  {
    "id": "2385091234567890",
    "page_name": "MAKE GmbH",
    "ad_delivery_start_time": "2026-06-15",
    "ad_creative_body": "...",
    "runtime_days": 55
  }
]
```

### analyze

```bash
meta-ads-library analyze --id 2385091234567890 --fields hook,story,cta
```

**Fields:** `hook`, `story`, `szenen_takt`, `beweisform`, `cta` (strukturierte Analyse)

### health

```bash
meta-ads-library health
```

Prüft Token, Rate-Limit-Status, API-Verfügbarkeit.

## Gotchas

- Ad Library API hat **keinen offiziellen CLI** — dieser ist der erste standardisierte
- `META_ACCESS_TOKEN` muss **Ad Library Permission** haben (nicht Ads-Manager)
- Rate-Limit: 200 Calls/Hour (Graph v26.0) → `--concurrency 1` default
- `--compact` ist **nicht optional** für Agent-Nutzung — spart 60-80% Tokens

## completion_criteria (beweisbar)

- [ ] `ads_archive` Endpoint + required params implementiert (Beleg: `go test -run TestSearch`)
- [ ] Laufzeit-Filter `>= 30 Tage` implementiert (Beleg: `go test -run TestRuntimeFilter`)
- [ ] `--compact` liefert nur high-gravity fields (Beleg: Token-Count-Vergleich)
- [ ] Typed Exit-Codes + actionable errors (Beleg: `go test -run TestExitCodes`)
- [ ] Auto-JSON wenn piped (Beleg: `meta-ads-library search ... | jq .` funktioniert)
- [ ] G1: `validate-skill.py` OK (Beleg: Exit 0)
- [ ] G2: `kimi-recherche` OK (Beleg: Score >= 0.7)
- [ ] Dedupe: `grep -r meta-ads-library index.json` = 0 Treffer vor Promotion (Beleg: grep)