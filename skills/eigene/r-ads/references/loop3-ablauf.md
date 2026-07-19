# Loop 3 — Ablauf im Detail

## Reihenfolge

voc-mine → angles → hooks → video-scripts → ad-copy → statics → claims-qa → (Signatur) →
Schaltung → perf-analyse → nächste Testwelle.

## Worker-Reuse

Hooks/Skripte/Copy laufen über **denselben Sonnet-Worker je Kunde** (Regel 2), nicht neue
Session pro Hook — der Worker trägt Brand-Voice + Dossier stabil im Cache-Prefix.

## Gates

- **G1 (immer zuerst):** LLM-ismus-/Passiv-Detektor + Meta-Policy-Verbotsliste (deterministisch).
- **G2:** Rubrik `evals/rubrics/ads.md`, Schwelle 0.7. Ship-kritisch = Panel aus 3 Familien
  (Sonnet + Sol + Kimi), Median gegen Rubrik, >20 % Divergenz = Flag an Raphael.
- **claims-qa:** Block-Gate. Output-Zeilenformat siehe claims-verbote.md.
- **G4 (Outcome):** echte CTR/CPL/CVR aus Datei-Export korrigieren Rubriken rückwirkend;
  "Judge liebte es, Markt floppte" → permanentes Anti-Beispiel in evals/anti/.

## Egress (Rot-Klasse Budgets)

Schaltung berührt Geld → kleines deterministisches Bash-Gate (Konto-/Budget-Whitelist) +
`git commit -S` in review-inbox. Nie autonom, kein Schreib-Scope auf Ads-Konten.

## Outputs (Zielpfade)

`client-<name>/wiki/voc.md`, `.../ads/angles.md`, `.../ads/hooks.md`, `.../ads/scripts/`,
`.../ads/copy.md`, `.../ads/statics-briefs.md`, `.../ads/claims-qa-<datum>.md`,
`.../ads/perf-<datum>.md`.
