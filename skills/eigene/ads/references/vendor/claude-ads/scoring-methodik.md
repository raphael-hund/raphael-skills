# Deterministisches Scoring für Konto-Audits (Regeln)

Kondensiert aus `AgriciDaniel/claude-ads` (MIT-Lizenz), `ads/references/scoring-system.md`
@ Stand 2026-07-11. Paraphrasiert, keine wörtliche Übernahme von Code/Schemas.

Gilt für Meta-Konto-Audits (Kill/Keep/Scale, Health-Checks) — Google/TikTok nur wenn
das Konto dort ebenfalls läuft.

## Vier getrennte Outputs — nie vermischen

1. **health_score** (0-100): beobachtete Performance/Implementierungs-Gesundheit.
2. **evidence_coverage**: Anteil des Kontroll-Gewichts mit bekanntem Ergebnis.
3. **regulatory_exposure**: P0/P1-Risiko getrennt — kein Score-Padding.
4. **opportunities**: unbewertete Beta-/Premium-Features, kein Health-Bestandteil.

**Regel:** Nie eine Buchstaben-Note ("A-Rating") vergeben. Jeder Score bekommt
Coverage-Status + Datenfenster dazu — sonst ist die Zahl irreführend.

## Vier Kontrollzustände (statt binär pass/fail)

| Zustand | Bedeutung |
|---|---|
| `pass` | Beleg erfüllt die Kontrolle |
| `fail` | Beleg erfüllt sie nicht |
| `unknown` | Kontrolle gilt, aber Beleg fehlt/uneindeutig |
| `not_applicable` | Kontrolle gilt für dieses Konto/diese Kampagne nicht |

- `not_applicable` fliegt komplett aus Health- und Coverage-Nenner raus.
- `unknown` fliegt aus der Health-Berechnung, bleibt aber im Coverage-Nenner
  (sonst kann man sich durch "einfach nicht prüfen" hochscoren).

## Schweregewichte

| Schwere | Gewicht | Bedeutung |
|---|---:|---|
| critical | 5 | Sofortiges materielles Risiko (Umsatz/Daten/Konto/Policy) |
| high | 3 | Materielles Performance-/Betriebsrisiko |
| medium | 1 | Sinnvolle Verbesserung, geringere Dringlichkeit |
| informational | 0 | Kontext, kein Score-Beitrag |

Schwere bemisst den Impact **bei Ausfall der Kontrolle** — nie aufblähen, nur weil
ein Feature neu/strategisch interessant ist.

## Rechenweg

```
category_health   = 100 * Σ(pass_weight) / Σ(known_control_weight)   # not_applicable raus
category_coverage = 100 * Σ(known_control_weight) / Σ(applicable_control_weight)
platform_health   = Σ(category_health * category_weight)             # Gewichte summieren zu 100
portfolio_health  = Σ(platform_health * platform_spend_share)        # sonst gleichgewichtet + "provisional"
```

Eine Kategorie ohne anwendbare Kontrollen fällt raus, verbleibende Kategorie-
Gewichte werden neu normiert für diesen Lauf.

## Coverage-Ampel (Reporting-Pflicht)

| Coverage | Status | Regel |
|---:|---|---|
| 80-100 % | graded | Health mit Coverage ausweisen |
| 60-79,99 % | provisional | Health nur als "vorläufig" ausweisen |
| < 60 % | insufficient_evidence | Health **nicht** als Konto-Note präsentieren |

Offene `unknown`-Kontrollen mit Schwere `critical` gehören **immer** in die
Prioritätenliste — auch wenn die Gesamt-Coverage über 80 % liegt.

## Dedupe- und Anwendbarkeits-Regeln

- Eine kausale Ursache = eine bewertete Kontrolle mit mehreren Symptom-Beobachtungen.
  Nicht Root-Cause UND jedes Symptom einzeln bestrafen.
- Feature-Verfügbarkeit, Konto-Eligibility, Geografie, Kampagnentyp, Reifegrad
  **vor** "anwendbar" festhalten.
- Watchlist-/Ankündigungs-Items bleiben unscored, bis sie das Konto tatsächlich
  betreffen. Die reine Adoption eines neu angekündigten Features ist kein
  Health-Gewinn.

## Output-Disziplin (versionierte Reports)

- Roh-Ergebnis zuerst als **versioniertes JSON** persistieren (Schema-Version im
  Dokument), erst danach nach Markdown/HTML rendern. Der JSON-Lauf ist die
  Quelle der Wahrheit, nicht die gerenderte Ansicht.
- Jede Empfehlung zitiert den zugrundeliegenden Befund, nennt eine Konfidenz,
  berücksichtigt Stichprobengröße/Conversion-Lag und läuft vor jeder Konto-
  Änderung durch das Freigabe-Gate (bei uns: Signatur + Budget-Egress-Gate,
  siehe `SKILL.md` Gotchas).
- Scores autorisieren **nie** selbst eine Änderung — sie priorisieren nur die
  Untersuchung.

## Gotcha

Ein deaktiviertes/unvollständiges Scoring-Profil liefert **keine** Konto-Health
und **keine** anerkannte Coverage — nicht so tun, als wäre "kein Profil" gleich
"Konto ist gesund".
