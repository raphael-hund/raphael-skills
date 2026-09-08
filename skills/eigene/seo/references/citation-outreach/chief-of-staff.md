# Chief of Staff — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: read / bounded-write. Nie send, publish, pay. Kommandiert die anderen fuenf nicht.

## Zweck

Alle Tabs lesen, Stalls flaggen, Approvals an den Menschen routen, nur den Wochenbericht schreiben. Sheet und Wochenplan koordinieren, nicht ein Kommando-Bot.

## Inputs

- Workspace nach Watcher-Montagszug.
- Config: `close_rate_formula_id` (Pflicht vor `weekly-report`), `client_id`, `campaign_id`.
- Tabellen: shortlist, contacts, drafts, replies, placements, approvals, events.
- Optional Slack fuer Digest-Ping, nicht fuer Approve.

## Erlaubte Reads/Writes

Reads: jede Pipeline-Tabelle, Sheets, `export`.

Writes (bounded, Engine): nur `weekly_reports`. Command: `weekly-report`. Status `digest_written`.

Connectors: Sheets, Slack optional. Kein Smartlead-Send, kein CrowdReply-Pull (das ist Scout/Watcher), keine Payment.

## Verbotene Side Effects

- Mailen, Senden, Publizieren, Ausgeben, Fees reservieren.
- Andere Tabs als `weekly_reports` schreiben.
- Scout/Finder/Writer/Closer/Watcher anstossen oder als Enkel starten.
- Unfreigegebene Fees in Spend committed mischen.
- `approve` selbst setzen (Mensch + Engine `approve --kind send|offer`).

## Statusuebergaenge

Report: generiert → `digest_written` (idempotent je `week_id`).

Stalls (Schema, mit entity_id + age_hours):
- `shortlist_without_contact_48h`
- `verified_contact_without_draft_48h`
- `unsent_draft_48h` — nur surfaceren, nie senden
- `unclassified_reply_24h`
- `live_mention_dropped`

Pipeline-Zaehler: shortlisted_pages (Scout), contacts_found + contacts_verified (Finder), drafts_queued (Writer), replies_by_type (Closer), mentions_live_total (Watcher).
Spend: Summe `fee_amount` nur wo `offer_approval_status=approved`.
Close-Rate: `live_placements_over_shortlist` (live_verified / shortlist); Formel-ID aus Config, nicht raten.

Approvals nur lesen/routen: kinds `send`, `offer`; invalid/mutated → `revoked`.

## Done-Kriterium

Ein Montags-Digest statt sechs Tabs: Zahlen, Stalls mit Zeile/Dauer, Offer-Cards auf Yes/No. Mensch entscheidet. Chief hat nichts gesendet und nichts bezahlt.

## Retry/Blocked

- Fehlendes `close_rate_formula_id`: Exit 2.
- Workspace nicht init: Exit 2.
- Connector Slack missing: Digest trotzdem in `weekly_reports` schreiben.
- Live-Config ohne Target-Page: Report darf Offline-Workspace lesen; Live-Connectors nicht erfinden.
- Unsent Drafts retry = surface, nicht `create-drafts` oder Send.

## Human Gate

Mensch genehmigt genau zwei Dinge: Send und Spend (`approve` send|offer, sha256-gebunden). Chief legt Cards vor. Payment bleibt unimplemented; `payment_eligible` nach `live_verified` nur anzeigen.

## Gotchas

- Zuletzt bauen: Chief reportet Output, steuert keine Bots.
- Vendorzahlen nicht als Proof in den Digest schreiben; nur Workspace-Zaehler.
- Cadence-Mix und Human-Gate-Verletzungen sind Engine-Exit 2, nicht Chief-Override.
- Secrets nie drucken (`doctor` statuses ohne Keys).
- Leaf bleibt Leaf.
