# Experiment-Programm — CRO systematisch statt einmalig testen

**Wofür:** Wenn CRO nicht ein einmaliger Fix bleiben soll, sondern ein
laufendes Programm wird (Ergänzung zum `cro-learn`-Schritt, G4). Liefert das
Vokabular und die Priorisierungslogik, um einen Test-Backlog zu führen statt
Bauchgefühl-Änderungen.

**Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
`skills/ab-testing/SKILL.md`, Abschnitt "Growth Experimentation Program"
(MIT-Lizenz). Statistik-Feinschliff (Sample-Size-Tabellen, Peeking-Problem)
bewusst nur kurz erwähnt, nicht 1:1 übernommen — für Raphaels typische
SMB-Traffic-Volumen meist zu granular; bei Bedarf im Original nachschlagen.

## Der Experiment-Loop

1. Hypothesen sammeln (aus Analytics, Kundenfeedback, Wettbewerb, Support-Fragen).
2. Mit ICE-Score priorisieren.
3. Test designen und laufen lassen.
4. Ergebnis mit echten Zahlen auswerten (G4 — nie aus Judge-Scores).
5. Gewinner ins Playbook aufnehmen.
6. Neue Hypothesen aus den Learnings ableiten.
→ Wiederholen.

## Hypothesen-Format (Pflichtstruktur)

```
Weil [Beobachtung/Daten],
glauben wir, dass [Änderung]
[erwartete Wirkung] bewirkt
für [Zielgruppe].
Wir wissen es, wenn [Metrik].
```

**Schwach:** "Der Button in einer anderen Farbe könnte mehr Klicks bringen."
**Stark:** "Weil Nutzer laut Heatmap Schwierigkeiten haben, den CTA zu finden,
glauben wir, dass ein größerer, kontrastreicherer Button die CTA-Klicks um
15%+ bei Neubesuchern erhöht. Gemessen an der Klickrate von Seitenaufruf zu
Formularstart."

## ICE-Priorisierung

Jede Hypothese auf drei Dimensionen 1–10 bewerten:

| Dimension | Frage |
|---|---|
| **Impact** | Wenn das funktioniert, wie stark bewegt es die Hauptmetrik? |
| **Confidence** | Wie sicher sind wir, dass es funktioniert? (Datenbasis, nicht Bauchgefühl) |
| **Ease** | Wie schnell/günstig lässt es sich umsetzen und messen? |

**ICE-Score** = (Impact + Confidence + Ease) / 3. Höchster Score zuerst
testen. Monatlich neu bewerten, wenn sich der Kontext ändert.

## Eine Metrik, primär

Jeder Test braucht **eine** Primärmetrik (direkt an die Hypothese gekoppelt),
optional Sekundärmetriken (erklären das Warum) und Guardrail-Metriken (dürfen
nicht schlechter werden — bei signifikanter Verschlechterung Test stoppen).

## Peeking-Problem (kurz)

Nicht vorzeitig auf Ergebnisse schauen und abbrechen — das führt zu
Falsch-Positiven. Stichprobengröße vorher festlegen, dem Prozess vertrauen.
Für konkrete Stichprobengrößen-Tabellen: Evan-Miller- oder
Optimizely-Sample-Size-Calculator nutzen (extern, kein Vendoring nötig).

## Das Experiment-Playbook

Jeder gewonnene Test wird dokumentiert, nicht nur umgesetzt:

```
## [Experiment-Name]
Datum:
Hypothese:
Stichprobe:
Ergebnis: Gewinner/Verlierer/nicht eindeutig — [Metrik] verändert um [X %]
Guardrails:
Warum es funktioniert/nicht funktioniert hat:
Muster (übertragbare Erkenntnis): z. B. "Social Proof nahe Preis-CTA erhöht Plan-Wahl"
Anwendbar auf:
Status: umgesetzt / zurückgestellt / braucht Folge-Test
```

Über die Zeit wird das Playbook eine Bibliothek bewährter Wachstumsmuster,
spezifisch für Kunde/Produkt/Zielgruppe.

## Kadenz (Richtwert für Agentur-Betreuung)

- **Wöchentlich (kurz):** laufende Tests auf technische Probleme/Guardrails
  prüfen. Gewinner nicht vorzeitig ausrufen, aber bei klar negativen
  Guardrails stoppen.
- **Alle zwei Wochen:** abgeschlossene Tests auswerten, Playbook updaten,
  nächsten Test aus dem Backlog starten.
- **Monatlich:** Experiment-Velocity, Win-Rate, kumulierten Lift reviewen,
  Backlog auffüllen, ICE neu priorisieren.

## Häufige Fehler

Zu kleine Änderung getestet (nicht messbar) · zu viele Dinge gleichzeitig
geändert (kann Wirkung nicht zuordnen) · keine klare Hypothese · vorzeitig
abgebrochen · während des Tests Varianten verändert · Konfidenzintervalle
ignoriert · Segmente rausgepickt, die zufällig passen.
