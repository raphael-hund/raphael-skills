# Citation-Outreach Monday Runbook

Mensch faehrt den Montag. Keine Cron-Installation, kein systemd-Timer, kein
Command-Center-Job. Der aktuelle Command-Center-Contract ist fremd: nicht
hierher kopieren, nicht als installiert behaupten, nicht gegen diese Engine
verdrahten.

Schema, Commands, Stalls: `pipeline.schema.json` und
`../citation-outreach-automation.md`. Rollen-Pointer stehen dort.

## Vor dem ersten Command

- Config liegt im Kundenrepo, nicht im Skill. Workspace:
  `/root/clients/<slug>/seo/citation-outreach`.
- `mode=offline` oder Live mit publizierter Non-Homepage = `brand.target_link_url`.
  Sonst `BLOCKED_TARGET_PAGES`.
- Cadence der Campaign nicht wechseln.
- Inbox-JSONL liegen unter `$WS/inbox/` (oder gleichwertig im Kundenrepo).

```bash
ENGINE=/root/raphael-skills/skills/eigene/seo/scripts/citation_outreach.py
CONFIG=/root/clients/<slug>/seo/citation-outreach/config.json
WS=/root/clients/<slug>/seo/citation-outreach
```

Flags bevorzugt vor dem Subcommand. Nach dem Subcommand geht ebenfalls.

## Montag, in dieser Reihenfolge

1. Doctor. Offline muss `overall=READY` sein. Live-Connectoren duerfen `MISSING`
   / `AUTH_REQUIRED` sein; dann JSONL.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" doctor
```

2. Citations importieren, Shortlist bauen (Scout). Mensch streicht Misses
   (Own-Site, Social, Directory, Homepage) — Engine excluded denselben Satz
   schon beim Import; Rest ist Review.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-citations "$WS/inbox/citations.jsonl"
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" build-shortlist
```

3. Kontakte importieren (Finder), Drafts schreiben (Writer). Engine sendet nicht.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-contacts "$WS/inbox/contacts.jsonl"
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" create-drafts
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" export
```

4. Mensch gibt Send frei (`approve --kind send`). Send-Button bleibt ausserhalb
   der Engine. Volumen, Inbox-Warmup, Smartlead-Queue sind Operator-Arbeit,
   kein Engine-Timer.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" approve --kind send --id d-REPLACE --by raphael
```

5. Replies importieren, Placements vorschlagen (Closer). Bounce unterdrueckt.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" import-replies "$WS/inbox/replies.jsonl"
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" propose-placement
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" approve --kind offer --id p-REPLACE --by raphael
```

6. Live-QA (Watcher) im Browser, dann lokal verbuchen.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" verify-placement \
  --id p-REPLACE --live-url https://REPLACE --brand-present --link-present
```

7. Weekly-Report (Chief of Staff) nach Watcher. `--as-of` setzen, wenn der
   Digest nicht "jetzt" sein soll. Stalls nur surfaceren; ungesendete Drafts
   nicht von der Engine senden.

```bash
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" weekly-report --as-of 2026-09-01T00:00:00Z
python3 "$ENGINE" --config "$CONFIG" --workspace "$WS" export
```

## Was dieser Runbook nicht tut

- Kein `crontab`, kein `systemctl enable`, kein Command-Center-Schedule-Write.
- Kein automatisches Egress, kein Smartlead-Send, kein Slack-Digest aus der Engine.
- Kein Kampagnen-Ende durch die Engine. Naechster Montag: dieselben Commands,
  frische JSONL, idempotente Imports.

MAKE-Pilot bleibt `prompt_4_9` und `mode=offline`, bis eine Vergleichs- oder
Use-Case-Seite `published: true` ist.
