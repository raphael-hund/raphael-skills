# Closer — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: draft-only. Nie send, publish, pay.

## Zweck

Replies in genau eine Klasse sortieren, naechsten Zug draften, Offer-Cards legen. Geld und Preis bleiben beim Menschen.

## Inputs

- Smartlead-Replies (offline: `fixtures.replies`).
- Zugehoerige Contacts/Shortlist/Drafts.
- Brand fuer Mention-Copy (Headline + 60–90 Woerter).
- Optional Slack nur als Ping, dass eine Card wartet — nicht als Approve.

## Erlaubte Reads/Writes

Reads: `replies`, `contacts`, `shortlist`, `drafts`, Sheets, Smartlead-Inbox.

Writes (bounded, Engine): `replies` (Klassifikation + `next_action`), `placements` als Vorschlag. Commands: `import-replies`, `propose-placement`.

Offer-Card Felder: page, proposed copy, position, fee als eine Zahl oder none, page-value (Prompts/Modelle), approve|decline.

Connectors: Smartlead, Sheets, Slack optional. Keine Karte, kein Payment-Connector.

## Verbotene Side Effects

- Senden, Publizieren, Zahlen, Kreditkarte, Preis zusagen, „billig/teuer“ sagen.
- Auto-Pay. Payment-Kind approve (Engine: payment unimplemented).
- Bounce als Fee-Deal behandeln.
- Writer-Queue senden. Watcher-Live erfinden.
- Enkel starten.

## Statusuebergaenge

Reply-Klassen (Schema): `interested_blurb`, `interested_fee`, `not_fit`, `wrong_person`, `out_of_office`, `existing_relationship`, `bounce`.

Next-Action:
- blurb/fee → `propose_placement`
- not_fit → `close`
- wrong_person → `ask_correct_person` (Domain nicht totlegen)
- out_of_office → `waiting`
- bounce → `route_finder_suppress` (Contact suppressed)

`placements.offer`: `proposed` → `approval_pending` → `approved_reserved` | `declined`.
`payment`: `not_due` → `reserved` (nach Offer-Approve) → `eligible_after_live`; `paid` unimplemented.
Ja ohne Fee: trotzdem Copy draften, `fee_type=none`.

## Done-Kriterium

Jede Reply klassifiziert. Interessierte haben eine Offer-Card im Sheet. Bounce hat Finder-Route, keine Card. Kein Geld geflossen (`paid=false`).

## Retry/Blocked

- Unklassifiziert >24h: Stall, retry Klassifikation, nicht senden.
- Placement ohne Reply-Klasse blurb/fee: nicht vorschlagen.
- Offer-Payload mutiert: Approval `revoked`.
- `approve --kind payment`: blocked/unimplemented.
- Live ohne Target-Page: `BLOCKED_TARGET_PAGES`.
- Offline: Fixture-Replies only.

## Human Gate

Approve-Kind `offer`, sha256-gebunden. Approve reserviert die Fee, zahlt nicht. Decline: Bot geht weiter. Copy und Geld im selben Schritt; kein „Blurb spaeter“. Ceiling-Auto-Approve ist kein Default dieses Skills.

## Gotchas

- Sechs Prompt-Klassen plus Bounce-Pfad; Bounce ist keine siebte Preis-Klasse.
- Position konkret schreiben, nicht „irgendwo“.
- Unfreigegebene Fees gehoeren nicht in Spend committed (Chief).
- Vendor-Fee-Beispiele sind keine Preisregel.
- Leaf bleibt Leaf.
