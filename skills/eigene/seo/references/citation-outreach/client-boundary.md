# Citation-Outreach Client Boundary

Zentral (dieser Skill) haelt Schema, Engine, Templates, Fixtures fuer Demo,
Runbooks. Kundendaten liegen nur im Kundenrepo. Keine zweite Wahrheit zu
`pipeline.schema.json`.

## Zentral erlaubt

Unter `/root/raphael-skills/skills/eigene/seo/`:

- `scripts/citation_outreach.py`
- `references/citation-outreach/pipeline.schema.json`
- `references/citation-outreach-automation.md` und diese Dateien
- `examples/citation-outreach/client-template.json`
- `examples/citation-outreach/make-marketing.json` (Pilot-Config, keine Live-Kontakte)
- `examples/citation-outreach/fixtures/*.jsonl` (synthetisch, `*.example`)
- `tests/test_citation_outreach.py`

Kein Live-Inbox, keine echten Editor-Mails, keine Kunden-SQLite, keine Tokens.

## Kundenrepo

Workspace und Config:

```text
/root/clients/<slug>/seo/citation-outreach/
  config.json
  .citation-outreach-client          # eine Zeile: client_id
  citation_outreach.sqlite
  inbox/citations.jsonl
  inbox/contacts.jsonl
  inbox/replies.jsonl
```

`<slug>` ist der Client-Ordnername unter `/root/clients/`, ohne `client-`-Praefix.
`client_id` in der Config muss zum Marker passen.

Start aus dem Template, nicht aus einer Kopie fremder Kundendaten:

```bash
mkdir -p /root/clients/<slug>/seo/citation-outreach/inbox
cp /root/raphael-skills/skills/eigene/seo/examples/citation-outreach/client-template.json \
  /root/clients/<slug>/seo/citation-outreach/config.json
# client_id, campaign_id, brand, own_domains, target_pages ersetzen

python3 /root/raphael-skills/skills/eigene/seo/scripts/citation_outreach.py \
  --config /root/clients/<slug>/seo/citation-outreach/config.json \
  --workspace /root/clients/<slug>/seo/citation-outreach \
  init
```

`init` schreibt den Marker. Danach lehnt eine Config mit anderem `client_id`
denselben Workspace mit Exit 2 ab.

## Harte Regeln

- Ein Workspace, ein `client_id`. Export aus Workspace A enthaelt nicht die
  Zeilen von Workspace B.
- Default-Workspace neben der Config (`<config_dir>/workspace`) nur fuer lokale
  Tests. Kundenlauf setzt `--workspace` auf den Pfad oben.
- `demo` ohne `--workspace` benutzt ein Temp-Dir und loescht es. Nicht als
  Kundenstate verwenden.
- `own_domains` gehoert in die Kundenconfig. Die Engine excluded die eigene Site.
- Fixture-Pfade in einer Kundenconfig zeigen auf Dateien im Kundenrepo oder auf
  die synthetischen Example-Fixtures. Nie Produktionsmails ins Skill-Repo legen.

## Was nicht zentral liegt

Kanonische Tabellen-Grain, Dedupe, Statuslisten: Schema.
Pilot-Notes zu MAKE (`published: false`, `BLOCKED_TARGET_PAGES` bis die
Wissens-Seiten live sind): Example-Config, nicht als Universal-Default
in den Skill kopieren.
