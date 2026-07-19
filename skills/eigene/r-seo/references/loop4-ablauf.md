# Loop 4 — Ablauf im Detail

## Reihenfolge

research → ia → briefs → produce → tech-qa → Publish (Signatur) → monitor → refresh.

## Gates

- **G1 (immer zuerst):** Research-Format + Klassifikation; Tech-QA 0 Blocker (hart).
- **G2:** IA/Briefs/Content gegen Rubrik `evals/rubrics/seo.md`, Schwelle 0.7.
- **G4 (Outcome):** echte Rankings/GSC-Daten korrigieren Rubriken; Decay triggert Refresh.

## Modell-Arbeitsteilung

- Kimi (1M): großes SERP-/Keyword-Volumen aufräumen.
- Luna: klassifizieren, schnelle Exploration.
- Sonnet: IA, Briefs, Qualitäts-Pass.
- Haiku/Luna: Massen-Produktion + Monitoring/Refresh.

## Egress (Rot-Klasse: Publish auf Produktion)

Publish → Signatur in review-inbox. GSC read-only Snapshot (Mo wöchentlich, täglich bei
aktiver Kampagne) → Outcome-Daten, nie Schreib-Scope.

## Outputs (Zielpfade)

`client-<name>/seo/research.md`, `.../seo/ia.md`, `.../seo/briefs/`, `.../seo/content/`,
`.../seo/tech-qa-<datum>.md`, `.../seo/gsc-<datum>.md`, `.../seo/refresh-<datum>.md`.
