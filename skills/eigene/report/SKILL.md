---
name: report
version: 0.1.0
description: >
  Feuert für Kundenreports: baut Berichte NUR aus belegbaren, echten Zahlen —
  jede Zahl mit Quelle, sonst Block. Trigger: "Report bauen", "Kundenbericht",
  "Weekly", "Performance-Report", "Ergebnisse zusammenfassen".
class: F
scope: agency
sensitivity: client-confidential
loads: [references/report-template.md]
requires_skills: [eval@^0]
completion_criteria:
  - "Jede Zahl im Report hat eine Quelle (Datei-Export/GSC/Meta-Snapshot) — sonst Block"
  - "Sol hat jede Zahl gegen die Quelle verifiziert"
  - "Kundennachricht/Versand nur mit Raphaels Signatur (Rot-Klasse)"
---

# report — Kundenreport aus echten Zahlen

**Lies zuerst:**
`/root/clients/client-<name>/` (Analytics-Exporte, GSC-/Meta-Snapshots, `state/`),
`/root/clients/client-<name>/wiki/OFFER.md` (versprochene KPIs),
`/root/raphael-command-center/AGENTS.md` (Rot-Klassen: Kundennachrichten).

## Zweck (1 Satz)

Einen ehrlichen Kundenreport bauen, in dem **jede Zahl belegbar** ist — kein geschöntes
"Performance"-Narrativ.

## Ablauf

1. **Quellen sammeln** — nur echte Daten: Datei-Export, read-only GSC-/Meta-Snapshot,
   Analytics. Kein Schätzen, kein Judge-Score als "Ergebnis".
2. **Zahlen extrahieren** — je KPI (CTR/CPL/CVR/Rankings/…) Wert + Zeitraum + Quelle.
3. **Verifikation (Sol)** — Sol prüft jede Zahl gegen die Quelldatei. Unbelegt/unauffindbar
   = **Block** (Zahl raus oder als "Datenlücke" markieren, nie raten).
4. **Narrativ** — nüchtern: was lief, was nicht, nächste Testwelle. Keine Übertreibung (UWG
   gilt auch gegenüber Kunden-Erwartung).
5. **Report schreiben** — nach `references/report-template.md`.
6. **Versand** — **Rot-Klasse Kundennachricht:** nur mit Raphaels Signatur über review-inbox.

## Gotchas

- **Jede Zahl mit Quelle, sonst Block** — das ist die harte Ship-Bedingung. Eine unbelegte
  Zahl blockt den ganzen Report.
- **G2-/Judge-Scores sind KEINE Performance-Zahlen** — sie sind Stil-Checks, kommen nie in
  einen Kundenreport als Ergebnis.
- **Verifier ist Sol (andere Familie), nicht der Autor** — nichts prüft die eigene Arbeit.
- **Versand ist Rot-Klasse** — der Report wird nie autonom an den Kunden geschickt.
- Datenlücke ehrlich benennen ("für Zeitraum X liegen keine verlässlichen Daten vor"), nicht
  interpolieren.
- `sensitivity: client-confidential` + `scope: client:<slug>` — nie ins globale Brain kopieren.
