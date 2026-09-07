# Writer — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: draft-only. Nie send, publish, pay.

## Zweck

Drei Mails pro Kontakt schreiben (Erst + zwei Follow-ups), in die Queue legen. Der Mensch drueckt Send.

## Inputs

- Contacts mit `status=eligible_for_draft`, ZeroBounce `valid|catch_all`, nicht suppressed.
- Brand-Brief aus Config/Sheet: `name`, `who_for`, `offer`, `target_link_url`, `mention_angle`, `do_not_say`.
- `cadence_profile` aus Config: `hook_2_3` oder `prompt_4_9`. Mix verboten.
- Shortlist-Page-Title (exakter Artikel in Zeile eins).

## Erlaubte Reads/Writes

Reads: `contacts`, `shortlist`, Brand-Felder, Sheets. Smartlead nur als Draft-Queue, ohne Send-Recht.

Writes (bounded, Engine): `drafts` mit `status=drafted`, `send_approval_status=pending`, `sent_at=null`. Command: `create-drafts`. `sent_by_engine=false`.

Copy: 80–120 Woerter, Mention plus Link in die bestehende Liste, eine Non-Homepage-Zielseite, ein Satz ICP. Kein Guest-Post-Pitch (ausser sie bringen ihn).

## Verbotene Side Effects

- Send, Publish, Pay, Kreditkarte, Preis zusagen.
- Homepage als `target_link_url`.
- Cadence mischen. Mehrere parallele Sequences pro Domain.
- Bounce-Suppression pflegen (Finder). Offer-Cards (Closer).
- Enkel starten. Autopilot in Smartlead.

## Statusuebergaenge

Drei Steps, Delays aus Profil:
- `hook_2_3`: Tage 0, 2, 3; Person-Switch 2 Tage.
- `prompt_4_9`: Tage 0, 4, 9; Person-Switch 4 Tage.

`drafts`: created → `drafted` / `pending`. Nach Human-Approve: `send_approval_status=approved` (Engine sendet trotzdem nicht). Mutation des Payloads → Approval `revoked`.
Domain-Reply stoppt die anderen Threads dieser Domain (Betrieb; Engine sendet nicht).
Person 1 zuerst; ohne Reply nach Profil-Switch Person 2, dann 3 derselben Firma.

## Done-Kriterium

Drei Drafts je eligible Kontakt in der Queue, Cadence-ID gesetzt, Ziel-URL Non-Homepage, Wortzahl gehalten, `sent=0`. Queue ist abnahmefaehig. Ungesendete Drafts nach 48h nur anzeigen, nie senden.

## Retry/Blocked

- Cadence-Mix: Exit 2.
- Fehlendes oder Homepage-`target_link_url`: Exit 1.
- Live ohne published Target-Page: `BLOCKED_TARGET_PAGES`.
- Kontakt nicht `eligible_for_draft` oder suppressed: skip.
- Kalte Inbox: nicht volume-senden (Warmup ist Mensch/Infra, nicht Writer-Send).
- Offline: Engine-Drafts ohne Netz.

## Human Gate

Approve-Kind `send`, gebunden an sha256 des kanonischen Draft-JSON. Mutation widerruft. Writer hat keine Senderechte. Erste Freigabe ist Batch-Freigabe, nicht Dauer-Autopilot.

## Gotchas

- Tag-2/3 und Tag-4/9 nicht mitteln; Profil kommt aus Config, Mix ist blocked.
- Verbote aus `do_not_say` (kein Synergy, kein Fake-Kompliment, keine Vendorzahlen).
- Eine Zielseite pro Mail, ein Angle.
- Finder liefert den Kontakt; Bounce nicht an Writer.
- Vendor-Volumenzahlen nicht als Kundenbeleg oder Pflichtquote wiederholen.
