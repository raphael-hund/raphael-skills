# Finder — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: read / bounded-write. Nie send, publish, pay.

## Zweck

Pro Shortlist-Seite den Menschen finden, der eine Mention setzen kann, Mail verifizieren, hoechstens fuenf Kontakte pro Domain liefern. Benannte Editoren zuerst.

## Inputs

- Shortlist-Zeilen (Editorial, Canonical-URL, Domain, Page-Title).
- Client-Config: `client_id`, `campaign_id`, `mode`, `fixtures.contacts`.
- Toolkette, stoppen bei Name plus verifizierter Mail: Snov → Prospeo → Hunter → Google (Last Resort).
- ZeroBounce auf jede Adresse.

## Erlaubte Reads/Writes

Reads: `shortlist`, Domain/Byline, Connector-Lookups, Sheets.

Writes (bounded, Engine): `contacts`. Command: `import-contacts`.

Rueckgabe je Zeile: page, person, role, email, source (`snov|prospeo|hunter|google|pattern`), ZeroBounce-Status.

Connectors: Snov, Prospeo, Hunter, ZeroBounce, Sheets. Google nur Last Resort. Kein Smartlead, kein CrowdReply-Send.

## Verbotene Side Effects

- Mailen, Sequence laden, Senden, Publizieren, Zahlen.
- `editor@` / `info@` erfinden, nur um einen Slot zu fuellen.
- Drafts, Replies, Placements, Approvals schreiben.
- Enkel starten. Secrets loggen.

## Statusuebergaenge

Keep: `valid`, `catch_all`. Drop: invalid Email, ZeroBounce `invalid`.
Caps: `max_per_domain=5`, `generic_max=2` (nur zuletzt, nur wenn sonst niemand).
Rollen: Byline-Autor; kleine Firma Founder/Owner/CEO; grosse Firma Content-Head/Editor/SEO-Head; danach Partnerships.
Bounce-Pfad: tot auf Suppression, naechste Person derselben Domain, nicht Writer.

Eligible nach Verify: `eligible_for_draft`. Bounce: `bounced` + `suppression_status=suppressed`.

## Done-Kriterium

Pro Shortlist-Seite mindestens ein benannter Kontakt mit Verify-Status — oder Slot leer, wenn nur erfundene Generics uebrig waeren. Nicht: fuenf geratene Inboxes.

## Retry/Blocked

- Keine Shortlist: nicht suchen.
- Connector `MISSING|AUTH_REQUIRED`: dieser Pass skippen, naechstes Tool, nicht fake-fuellen.
- `BLOCKED_TARGET_PAGES` in live: keine Live-Lookups.
- Invalid droppen, naechste Person. Pattern-Mail nur gegen Domainliste, wenn Name da und Mail fehlt.
- Offline: nur Contact-Fixture.

## Human Gate

Finder sendet nicht. Kein Send-/Offer-Approve. Mensch sieht die Liste spaeter im Writer-Batch.

## Gotchas

- Ein benannter Editor schlaegt generische Inboxes.
- Catch-all behalten (Schema: keep), nicht als invalid droppen.
- Bounce geht zurueck an Finder, nicht an Writer.
- Vendor-Toolrangfolge ist Stack, kein A/B-Beleg.
- Leaf bleibt Leaf.
