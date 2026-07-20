# Testwellen-Disziplin: Signifikanz, Vor-Registrierung, Monitoring (Regeln + Taktik)

Kondensiert aus `AgriciDaniel/claude-ads` (MIT-Lizenz), `skills/ads-test/SKILL.md`
und `skills/ads-monitor/SKILL.md` @ Stand 2026-07-11. Paraphrasiert.

Ergänzt `loop3-ablauf.md` (Kill/Keep/Scale-Engine) um die Statistik-Disziplin
für Testwellen und die Monitoring-Grundregeln.

## Vor jeder Testwelle festschreiben (Regeln)

Vor dem Start, schriftlich, nicht im Nachgang zurechtbiegen:

1. Die Entscheidung, die getroffen werden soll, und die kausale Hypothese.
2. Treatment vs. Control, Randomisierungseinheit, Population.
3. Primäre Metrik + Guardrail-Metriken (was darf nicht kippen).
4. Minimaler relevanter Effekt (nicht "irgendein Unterschied").
5. **Stopp-Regel** — wann wird ausgewertet, und wann nicht vorher geguckt.
6. Ausschlüsse/Qualitätschecks/Analyseplan **vor** dem Start festlegen
   ("Pre-Registrierung") — nicht erst wenn die Zahlen da sind.

## Vor der Auswertung prüfen

- Zuweisungsintegrität (kam wirklich zufällig X% in Treatment?) und
  Datenvollständigkeit — **vor** Effekt-Schätzung.
- Plattform-Restriktionen, überlappende Tests, Conversion-Lag, Saisonalität,
  Interferenz zwischen Varianten.
- Stichprobengröße/Testdauer aus den festgelegten Annahmen berechnen und
  Näherungen offenlegen (nie eine Zahl ohne Berechnungsweg posten).

## Verbotene Muster (harte Regel)

- **Nicht wiederholt peeken und beim ersten guten Ergebnis abbrechen.**
  Das produziert Falsch-Positive, die sich wie ein Gewinner anfühlen.
- Underpowered Rauschen nicht als "Gewinner" verkaufen.
- Ergebnis nicht über die getestete Population hinaus verallgemeinern
  (anderes Land/Objective/Placement ≠ automatisch gleicher Effekt).

## Output

Setup **und** Readout als versioniertes JSON mit einer Klartext-Entscheidung
("Testwelle X: Hook B gewinnt bei Konfidenz Y, weil Z" statt nur Rohzahlen).

## Monitoring (laufendes Konto, nicht Testwelle)

1. Immer **zwei oder mehr vergleichbare Snapshots** laden — gleiche Zeitzone,
   Währung, Metrik- und Attributionsdefinition. Ein Snapshot allein sagt nichts
   über Veränderung.
2. Vor jedem Vergleich: Datenfrische und Finalisierungsfenster prüfen (Meta-
   Reporting kann nachträglich revidieren — nicht am Tag X die Zahl von Tag X
   als final behandeln).
3. Erwartete Learning-Phase, Saisonalität, geplante Änderungen **von**
   unerklärten Anomalien trennen, bevor man Alarm schlägt.
4. Beobachtung, Konfidenz, wahrscheinliche Ursache, nötige weitere Prüfung,
   **und Entscheidungs-Schwelle** zurückgeben — nicht nur "Zahl ist gesunken".
5. Monitoring **mutiert nie das Konto** — reine Beobachtung, Eskalation an
   Menschen.

### Harte Anti-Regel

**Nie bei Prozent-Änderungen mit trivialem Nenner Alarm schlagen** (z. B.
"CTR +200 %" bei 2 Klicks). Wenn die Evidenz Rauschen nicht von einer
materiellen Veränderung unterscheiden kann: das explizit so sagen, statt eine
falsche Sicherheit vorzutäuschen.

## Bezug zu unserem Kill/Keep/Scale (loop3-ablauf.md)

Diese Datei liefert die **Statistik-Disziplin unter** der Kill/Keep/Scale-
Engine: bevor eine Anzeige wegen "schlechter Performance" gekillt wird, erst
prüfen, ob der Snapshot-Vergleich überhaupt vergleichbar ist (gleiches Fenster,
gleiche Conversion-Lag-Reife) und ob der Effekt nicht bloß Rauschen bei
niedrigem Volumen ist.

## Gotcha

Eine Testwelle ohne vorab festgelegte Stopp-Regel ist keine Testwelle — es ist
ein Vorwand, das Ergebnis zu sehen, das man sehen wollte.
