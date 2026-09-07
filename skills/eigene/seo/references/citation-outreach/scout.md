# Scout — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: read / bounded-write. Nie send, publish, pay.

## Zweck

Zitierte URLs holen, Rohdump von Shortlist trennen, nur redaktionelle Seiten behalten, auf die ein Editor die Marke setzen kann. Domain Rating ist kein Score.

## Inputs

- Client-Config (`--config`): `client_id`, `campaign_id`, `own_domains`, `brand`, `target_pages`, `mode`, `fixtures.citations`.
- Buying-Questions aus dem Kampagnen-Sheet (dieselben Fragen jede Woche).
- Offline: Citation-Fixture. Live: CrowdReply-Connector, nur nach Auth.
- Engines im Pull: ChatGPT, Gemini, Grok, Perplexity, Google AI Mode, Google AI Overviews, Copilot.

## Erlaubte Reads/Writes

Reads: Config, Sheet-Prompts, eigene Domains, CrowdReply-Citation-Pull (live) oder Fixture (offline), Browser nur zur Seitenklassifikation.

Writes (bounded, Engine): `cited_urls`, `shortlist`. Commands: `import-citations`, `build-shortlist`.

Connectors: CrowdReply, Sheets, Browser. Nichts anderes.

## Verbotene Side Effects

- Mailen, Smartlead, Senden, Publizieren, Zahlen.
- Contacts, Drafts, Replies, Placements, Approvals, Weekly-Reports anfassen.
- Enkel-Rollen starten (Finder/Writer/…).
- Secrets loggen. Live-Netz ohne Auth.
- Homepages, Product-Pages, Social/UGC, Review-/Directory-Plattformen, Own-Site in die Shortlist schreiben.

## Statusuebergaenge

`cited_urls`: `captured` → `normalized` → `classified` → `retained` | `excluded` | `blocked`.

`shortlist` grain: eine Editorial-Seite je Kampagne + Canonical-URL.
Eligibility: Blog/News und `page_type` in `article|listicle|comparison|guide|review_roundup`; nicht social/ugc/review/directory/homepage/product/own.
Order: `citation_count DESC`, `distinct_model_count DESC`, `canonical_url ASC`.
Review: Mensch killt Misses (`review_decision`); Scout setzt das nicht selbst auf Send.

## Done-Kriterium

Rohzeilen liegen in `cited_urls`. Shortlist ist der redaktionelle Schnitt, sortiert nach Citation-Häufigkeit, jede mindestens einmal zitierte Editorial-Seite bleibt. Rohdump-Größe ist nicht Done.

## Retry/Blocked

- CrowdReply fehlt oder unauth: kein Pull, Exit 2 / Connector `MISSING|AUTH_REQUIRED`.
- `mode=live` ohne published Non-Homepage-`target_link_url`: `BLOCKED_TARGET_PAGES`.
- Offline: nur Fixtures, `network=false`.
- Dedupe: Schema-Normalisierung (URL lowercase host, drop fragment/default port). Idempotent re-importen.

## Human Gate

Scout gibt keine Send-/Spend-Freigabe. Mensch streicht competitor-owned, Junk-Directories, Seiten mit bestehender Mention. Scout mailt niemanden.

## Gotchas

- Buying-Questions zwischen Wochen nicht wechseln, sonst bricht der Vergleich.
- Shortlist ersetzt den Rohdump nicht.
- Wiederholungsquellen vor Lucky-Screenshots.
- Vendor-Visibility-Zahlen sind kein Kundenbeleg.
- `doctor` vor Live; Secrets nie drucken.
