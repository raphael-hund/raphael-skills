# rubric-author — Rubriken schreiben

## Prinzipien
- **3–6 Fragen.** Mehr wird gegamed und verwässert das Signal.
- **Binär + überprüfbar.** Jede Frage muss mit Ja/Nein aus dem Artefakt beantwortbar sein,
  nicht "wie gut ist X" (Geschmack).
- **Beweis-Anker.** Jede Frage nennt, WO der Beleg stehen muss ("Zitat aus PROOF.md").
- **Ship-Bedingung zuerst UND als Veto.** Die harte Bedingung des Loops ist Frage 1 (z. B. "0
  verbotene Claims", "Lighthouse/axe = 0", "jede Zahl belegt"). Sie ist ein **Veto-Kriterium mit
  eigener Schwelle**: erreicht Frage 1 nicht die volle 2, ist das Gesamt-Verdikt FAIL — egal wie
  hoch die aggregierte Summe ist. Der aggregierte 0.7-Schwellwert darf einen katastrophalen Riss
  auf der Ship-Bedingung nie überdecken. Markiere Veto-Fragen mit `[VETO]`.
  (Idee: Inspect-AI wertet je Score-Achse unabhängig mit eigener Metrik/Schwelle aus statt nur
  einen aggregierten Wert zu schwellen — `docs/multiple-scorers.qmd`, MIT.)

## Vorlage

```
# Rubrik: <Domain> (evals/rubrics/<domain>.md)
Schwelle: 0.7   Skala je Frage: 0/1/2

1. [VETO] <harte Ship-Bedingung als Ja/Nein> — Beleg: <wo>   (< 2 ⇒ Gesamt-FAIL)
2. <Kern-Qualität> — Beleg: <wo>
3. <Brand-Voice / Zielgruppen-Fit> — Beleg: <wo>
4. <Format/Struktur> — Beleg: <wo>
(optional 5-6)
```

## Kalibrierung (G4-Rückkopplung)
Wenn echte Outcome-Daten (CTR/CPL/CVR/Rankings) zeigen, dass ein hoch bewerteter Output
floppte, wird der Fall zum Anti-Beispiel (`evals/anti/`) und die Rubrik nachgeschärft —
nicht der Judge beschönigt. Rubriken sind lebende Dokumente.

## Anti-Muster
- Vage Fragen ("ist es gut/überzeugend?").
- Doppelfragen ("ist es klar UND kurz?") — trennen.
- Fragen, die der Autor selbst bejahen kann, ohne Beleg.
