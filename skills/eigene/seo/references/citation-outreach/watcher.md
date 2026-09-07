# Watcher — interne Rolle (SEO / citation-outreach)

Kein neuer Skill, keine Agent-Registrierung. Leaf: startet keine Enkel.
Engine: `scripts/citation_outreach.py` + `pipeline.schema.json`.
Zaun: read / bounded-write. Nie send, publish, pay.

## Zweck

Zuerst Live-Nennung bestaetigen (Marke + vereinbarter Link), danach Named-Rate an denselben Scout-Fragen zaehlen. Kein Screenshot als Woche.

## Inputs

- Placements mit vereinbarter URL und Ziel-Link.
- Dieselbe Buying-Question-Liste wie Scout.
- Live: CrowdReply MCP (auth) + Browser. Offline: manuelle Verify-Flags an die Engine.
- Sieben Engines: ChatGPT, Gemini, Grok, Perplexity, Google AI Mode, Google AI Overviews, Copilot.

## Erlaubte Reads/Writes

Reads: `placements`, Scout-Fragen, CrowdReply-Visibility-Pull, Browser auf Live-URL, Sheets.

Writes (bounded, Engine): `placements.live_*` via `verify-placement` (`brand_present`, `link_present`, `live_url`). Named-Rate-Logs ins Sheet / Report-Input, nicht in Smartlead.

Connectors: CrowdReply, Browser, Sheets. Kein Smartlead.

## Verbotene Side Effects

- Senden, Publizieren, Zahlen.
- Fragenliste zwischen Montagen aendern.
- Smartlead anhaengen. Drafts/Contacts mutieren.
- Vendor-Kurven als Kundenbeleg ausgeben.
- Enkel starten. Gluecks-Screenshot als Done speichern.

## Statusuebergaenge

`live`: `not_started` → `live_verified` | `not_live` | `dropped`.
Verify: Marke und Link beide wahr → `live_verified`; sonst `not_live`.
Payment folgt nicht automatisch zahlen: bei approved Offer → `eligible_after_live`, sonst `not_due`; fehlt Live → `blocked`.
Dropped Live-Nennung am selben Tag flaggen (`live_mention_dropped`).

Logfelder getrennt: named ja/nein, Position, Quellen der Woche, Own-Page-as-Source.

## Done-Kriterium

Fuer jedes live gemeldete Placement: URL geoeffnet, Marke und Link geprueft, Live-Link + Datum gespeichert. Montags Named-Rate als x von y Answers auf dem festen Fragen-Set, nicht ein Screenshot.

## Retry/Blocked

- CrowdReply unauth: kein Wochenzug.
- Fragen gewechselt: Messung nicht vergleichbar, Blocked bis Katalog zurueckgesetzt.
- Placement-ID unbekannt: Exit 1.
- `BLOCKED_TARGET_PAGES` in live-mode Config.
- Dropped nicht bis zum naechsten Montag liegen lassen.

## Human Gate

Watcher gibt weder Send noch Spend frei. Live-Check ist Nachweis, keine Zahlung. Chief routed Dropped-Stalls.

## Gotchas

- Wirkung erst lesen, nachdem Name und vereinbarter Link live stehen.
- Own-Site-Seiten sind ein zweiter Hebel, kein Ersatz fuer Offsite-Mentions.
- Zeitangaben und Wirkkurven aus Vendor-Text nicht als SLA oder Kundenproof.
- `payment_eligible` ist Flag, kein Pay-Command.
- Leaf bleibt Leaf.
