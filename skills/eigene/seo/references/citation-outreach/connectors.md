# Citation-Outreach Connectors

Statusvertrag der Engine. Keine Secrets in stdout, Logs oder dieser Datei.
Tabellen und Config-Keys: `pipeline.schema.json` (`doctor`, `config_contract`).
Nicht hier kopieren.

## Statusvertrag

Erlaubte Status (Schema `doctor.live_statuses`, Engine `ALLOWED_STATUSES`):

| Status | Bedeutung |
|---|---|
| `READY` | Adapter darf laufen. Live-Vendor-APIs erreichen das in diesem Stand nicht. |
| `AUTH_REQUIRED` | Env-Name sichtbar oder Config behauptet Auth-Luecke. Engine ruft die API nicht. |
| `MISSING` | Kein Env, kein READY. Default fuer die acht Live-Connectoren. |
| `BLOCKED` | Hart gesperrt (Config-Override). Live-overall wird `BLOCKED`. |

`doctor` gibt `status` und `env_present` (bool). Keine Key-Werte, keine Tokens,
kein PEM. Probe: Env-Name gesetzt → hoechstens `AUTH_REQUIRED`, nie `READY`.
Config darf `AUTH_REQUIRED` / `MISSING` / `BLOCKED` setzen. Behauptetes `READY`
wird ignoriert. `mode=offline` und Status waere `READY` → `MISSING`.

Overall:

- `mode=offline` → `overall=READY`, unabhaengig von den acht Live-Connectoren.
- `mode=live` → `BLOCKED` wenn einer `BLOCKED`; sonst `MISSING` wenn einer `MISSING`; sonst `AUTH_REQUIRED`.

Feld `offline_adapter` ist `READY`. Das ist der JSONL/CSV-Pfad.

## Offline-JSONL Default

Default-Betrieb ist lokal: JSONL oder CSV importieren. Engine `stdlib_only`,
`network: false`. `demo` meldet `network_calls=0`. Relative Fixture-Pfade ab
`config_dir`.

Import-Commands:

```bash
ENGINE=/root/raphael-skills/skills/eigene/seo/scripts/citation_outreach.py
CONFIG=/root/clients/<slug>/seo/citation-outreach/config.json
WS=/root/clients/<slug>/seo/citation-outreach

python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-citations "$WS/inbox/citations.jsonl"
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-contacts "$WS/inbox/contacts.jsonl"
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-replies "$WS/inbox/replies.jsonl"
```

CSV geht analog (Header-Zeile). Fixture-Beispiele:
`examples/citation-outreach/fixtures/{citations,contacts,replies}.jsonl`.

## Live-Connectoren (dieser Stand)

Doctor listet genau diese acht. Ohne Env und ohne Override: `MISSING`.
Mit Env: `AUTH_REQUIRED`. READY fuer diese Namen behauptet die Engine nicht.

| Name | Env-Namen (Werte nie drucken) | doctor (ohne Env) |
|---|---|---|
| CrowdReply | `CROWDREPLY_API_KEY`, `CROWDREPLY_MCP_TOKEN` | `MISSING` |
| Sheets | `GOOGLE_SHEETS_CREDENTIALS`, `GOOGLE_APPLICATION_CREDENTIALS` | `MISSING` |
| Smartlead | `SMARTLEAD_API_KEY` | `MISSING` |
| Snov | `SNOV_API_KEY`, `SNOV_CLIENT_ID` | `MISSING` |
| Prospeo | `PROSPEO_API_KEY` | `MISSING` |
| Hunter | `HUNTER_API_KEY` | `MISSING` |
| ZeroBounce | `ZEROBOUNCE_API_KEY` | `MISSING` |
| Slack | `SLACK_BOT_TOKEN`, `SLACK_TOKEN` | `MISSING` |

Ist einer dieser Connectoren `MISSING` oder `AUTH_REQUIRED`, bleibt der Lauf
auf Offline-JSONL. Die Engine hat keine Send-/Sheet-/Enrichment-Calls.

Config-Override (kein Secret):

```json
"connectors": {
  "Smartlead": { "status": "AUTH_REQUIRED" },
  "Slack": "MISSING"
}
```

## Browser READY

Browser ist der lokale Operator-Pfad, nicht einer der acht Live-Connectoren.
Doctor listet ihn nicht unter `connectors`. Status: `READY`.

Nutzen: Shortlist-Misses im Browser streichen; Live-Mention oeffnen; Marke und
Link visuell pruefen; Ergebnis an `verify-placement` uebergeben. Das Command
fetcht die URL nicht (`--brand-present` / `--link-present` sind lokale Flags).

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" verify-placement \
  --id p-REPLACE --live-url https://example.com/blog/page --brand-present --link-present
```

## Check

```bash
python3 /root/raphael-skills/skills/eigene/seo/scripts/citation_outreach.py \
  --config /root/raphael-skills/skills/eigene/seo/examples/citation-outreach/make-marketing.json \
  doctor
```

Erwartung offline: `overall=READY`, `offline_adapter=READY`, die acht Namen
`MISSING` (solange keine Env), keine Secret-Substrings in der JSON.
