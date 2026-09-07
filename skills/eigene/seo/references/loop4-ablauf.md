# Loop 4 — Ablauf im Detail

## Reihenfolge

research → ia → briefs → produce → tech-qa → Publish (Signatur) → monitor → refresh.

## Gates

- **G1 (immer zuerst):** Research-Format + Klassifikation; Tech-QA 0 Blocker (hart).
- **G2:** IA/Briefs/Content gegen Rubrik `evals/rubrics/seo.md`, Schwelle 0.7.
- **G4 (Outcome):** echte Rankings/GSC-Daten korrigieren Rubriken; Decay triggert Refresh.

## Belege: Texte an echte Statistik-Exporte koppeln (Belegpflicht)

Kein Brief und kein Text mit erfundenen Zahlen. Jede Behauptung (Suchvolumen, Position,
Trend, „gefragt wird nach…") zeigt auf einen abgelegten Export mit Quelle + Datum:

- **Research-Input:** SERP-Ausriss (Top-10 + PAA/Related) und GSC-Query-Export
  (Impressions/Klicks/CTR/Position) unter `client-<name>/seo/exports/` ablegen.
- **Brief-Referenz:** im Brief jede Zahl mit `[Quelle: gsc-<datum>.csv]` o. ä. taggen.
  Ohne Tag gilt die Zahl als erfunden → raus aus dem Text (G2-Fail).
- **Refresh (G4):** GSC-Decay ist der Trigger — reale Positions-/CTR-Verluste, nicht der
  Kalender. Der Export von heute ist der Beleg für die Refresh-Entscheidung.

## Kanal-Diagnose & Brand-Protect (Trigger vor der Arbeit)

- **Suchnachfrage prüfen:** erscheinen für die Kundenleistung Wettbewerber als Google-Anzeigen,
  existiert Nachfrage → SEO/SEA sinnvoll. Sonst zuerst Nachfrage über FB/IG erzeugen (ads).
- **Brand-Protect:** bei signifikantem FB/IG-Spend eine Branded-Search-Kampagne (Marken-Keywords)
  als r-seo-Aufgabe anlegen — die Social-erzeugte Direktsuche ist der günstigste Lead. Mit ads
  koordinieren, damit kein Wettbewerber die Marken-Suche abgreift.

## Modell-Arbeitsteilung

- Kimi (1M): großes SERP-/Keyword-Volumen aufräumen.
- Luna: klassifizieren, schnelle Exploration.
- Sol oder Grok: IA, Briefs, Qualitäts-Pass.
- Luna: Massen-Produktion + Monitoring/Refresh.

## Egress (Rot-Klasse: Publish auf Produktion)

Publish → Signatur in review-inbox. GSC read-only Snapshot (Mo wöchentlich, täglich bei
aktiver Kampagne) → Outcome-Daten, nie Schreib-Scope.

## Outputs (Zielpfade)

`client-<name>/seo/research.md`, `.../seo/ia.md`, `.../seo/briefs/`, `.../seo/content/`,
`.../seo/tech-qa-<datum>.md`, `.../seo/gsc-<datum>.md`, `.../seo/refresh-<datum>.md`.

**Ranking-Plan** (eigener Zweig, nicht jeder Loop-4-Lauf):
`client-<name>/seo/ranking-plan-<datum>.md` — Pflichtfelder in `ranking-plan.md`.
GSC-Read: `gsc-read.md` / `scripts/gsc_read.py`. Graustufen nur nach Go: `graustufen.md`.
