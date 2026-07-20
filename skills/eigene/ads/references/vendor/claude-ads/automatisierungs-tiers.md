# Automatisierungs-Tiers: Wer hat gerade die Kontrolle? (Regeln)

Kondensiert aus `AgriciDaniel/claude-ads` (MIT-Lizenz),
`ads/references/automation-tier-classifier.md` @ Stand 2026-07-11. Paraphrasiert.

Ergänzt unser bestehendes Gate ("Signatur bei Geld = rot + Budget-Egress-Gate",
siehe `SKILL.md` Gotchas) um eine Klassifikation, **welche Entscheidung** gerade
wem gehört — Meta/Advantage+ delegiert oft nur einzelne Module, nicht alles.

## Neun Dimensionen getrennt beobachten

Nicht "ist die Kampagne automatisiert ja/nein", sondern pro Dimension:

- Ziel-/Conversion-Auswahl · Gebotsstrategie/-ziele · Budget-Verteilung/Pacing ·
  Audience-/Query-Erweiterung + Ausschlüsse · Placement-Auswahl · Creative-
  Generierung/-Variation/-Zieladresse · Kampagnenanlage/Struktur-Änderungen ·
  Monitoring/Pausieren/Incident-Containment · Externer Agent/MCP-Schreibzugriff.

Eine Kampagne kann Bidding an Advantage+ delegieren und trotzdem Budget,
Targeting, Creative und Freigaben komplett unter menschlicher Kontrolle halten.

## Die fünf Tiers

| Tier | Bedeutung | Nötige Aufsicht |
|---|---|---|
| T0 Manuell | Kein Modul delegiert | Standard-QA |
| T1 Assistiert | Automatisierung schlägt vor/entwirft, Mensch wählt & wendet an | Beleg + finalen Diff prüfen |
| T2 Begrenzte Delegation | Module agieren innerhalb expliziter Konto-Limits | Pro Modul: Ziel, Deckel, Monitoring, Rollback |
| T3 Breite Plattform-Delegation | Plattform steuert die meisten Auslieferungs-Module, Mensch besitzt Ziele/Assets/Guardrails | Signalqualität, Objective, Creative, Ausschlüsse, Grenz-Ergebnis prüfen |
| T4 Externer Agent mit Schreibrecht | Externer Agent kann Konto-Objekte anlegen/ändern | Volles Mutation-Gate: Least Privilege, Idempotenz, unabhängige Verifikation, Incident Response |

Das Konto-Tier ist das **höchste aktive** Tier — aber die Dimensions-Karte
behalten, die Zusammenfassung allein reicht nicht zur Entscheidung.

## Bezug zu unserem Ablauf

- Unsere Schaltungs-Regel ("Signatur + Budget-Egress-Gate, nie autonom") ist
  faktisch die T4-Anforderung, unabhängig davon, ob wir selbst der externe
  Agent sind oder ein Kunden-Tool.
- **Automatisierungs-Adoption ist unbewertet.** Advantage+/Automated-Rules
  einzuschalten ist kein Health-Gewinn und kein Health-Verlust an sich — nur
  konkrete, stabile Kontrollen zählen (fehlende Freigabe, fehlender Deckel,
  widersprüchliche Automatisierungen, kaputtes Monitoring, kein Rollback).
- Nie "mehr Automatisierung" oder "mehr manuelle Kontrolle" empfehlen ohne
  ein diagnostiziertes, konkretes Konto-Problem und ein testbares erwartetes
  Ergebnis.

## Gotcha

T0 (rein manuell) ist nicht automatisch "sicherer" oder "gesünder" als T2/T3 —
auch manuelle Prozesse müssen auf Absicht und Monitoring geprüft werden, statt
sie per Default als gut zu bewerten.
