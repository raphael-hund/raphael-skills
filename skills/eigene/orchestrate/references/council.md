# Council-Muster — Cross-Vendor-Rat mit anonymem Peer-Review

> Muster nach Karpathys llm-council (3 Stufen: Erstmeinungen → anonymes
> gegenseitiges Ranking → Chairman-Synthese). Quelle ist Lese-Referenz
> (`/root/tools/vendor/llm-council`, keine Lizenz — Idee übernommen, kein
> Code/Text kopiert). Advisor-Variante inspiriert von
> `claude-skills-llm-council` (ebenfalls nur Idee).

## Wofür (und wofür nicht)

Für **offene Entscheidungs- oder Urteilsfragen**, bei denen es mehrere
plausible Antworten gibt und eine Fehlentscheidung teuer ist: Positionierung,
Pricing, Architekturwahl, "Angle A oder B", Kundenstrategie.

**Nicht** für: Fragen mit einer richtigen Antwort (einfach beantworten),
Erstellungs-Tasks (dafür Worker + eval), Bewertung EINES fertigen Artefakts
gegen eine Rubrik (dafür eval-Panel, G2). Merksatz:
**Panel judgt ein Artefakt, Council wählt zwischen Antworten.**

## Die drei Stufen

### Stufe 1 — Erstmeinungen (parallel, unabhängig)

3 Ratsmitglieder aus 3 Modellfamilien, **frische Sessions**, alle parallel:

- **Sonnet** (Claude-Familie)
- **Sol** (GPT-5.6 via Codex, effort high — Dispatch siehe ROUTING.md)
- **Kimi** (K3, effort high)

Jedes Mitglied bekommt dieselbe gerahmte Frage: Kern-Entscheidung, Kontext
(relevante Dateien als Task-Ausschnitt, TB2), was auf dem Spiel steht.
Der Rahmer steuert nicht — keine eigene Meinung in die Frage schmuggeln.
Antwortlänge deckeln (150–300 Wörter), sonst frisst Stufe 2 den Kontext.

Fällt eine Familie aus (Quota, Refusal): mit den verbleibenden weitermachen,
Ausfall im Ergebnis nennen — nie den ganzen Lauf abbrechen.

### Stufe 2 — Anonymes Peer-Ranking

Alle Antworten anonymisieren als **Antwort A/B/C** — Zuordnung
**randomisieren** (nicht immer Sonnet = A, sonst Positions-Bias). Jedes
Mitglied bekommt in einer **neuen frischen Session** alle Antworten inkl.
der eigenen (anonym) und beantwortet:

1. Welche Antwort ist die stärkste — und woran festgemacht (Zitat)?
2. Welche hat den größten blinden Fleck — welcher?
3. Was haben ALLE übersehen?

Dann ein striktes Schlussformat, damit maschinell auswertbar:

```
FINAL RANKING:
1. Antwort C
2. Antwort A
3. Antwort B
```

Nichts nach dem Ranking-Block. Aggregat = mittlere Rangposition je Antwort
über alle Reviewer. Parse-Fallback: "Antwort X"-Muster in Reihenfolge des
Auftretens ziehen.

**Warum anonym:** Mit Modellnamen spielen die Reviewer Favoriten
(Familien-Loyalität, Marken-Bias) statt auf Inhalt zu ranken — Karpathys
Kernbefund. Erst der Leader de-anonymisiert fürs Protokoll.

### Stufe 3 — Chairman-Synthese

Der Leader (Fable) bekommt alles: gerahmte Frage, de-anonymisierte
Antworten, alle Reviews, Aggregat-Ranking. Output-Struktur (fest):

1. **Konsens** — worin die Mitglieder unabhängig übereinstimmen
   (High-Confidence-Signal).
2. **Dissens** — echte Konflikte NICHT glattbügeln; beide Seiten + warum
   vernünftige Mitglieder sich uneins sind.
3. **Blinde Flecken** — was erst durchs Peer-Review sichtbar wurde.
4. **Empfehlung** — eine klare Antwort mit Begründung, kein "kommt drauf
   an". Der Chairman **darf gegen die Mehrheit entscheiden**, wenn die
   Begründung des Dissidenten stärker ist — dann explizit sagen warum.
5. **Erster Schritt** — genau EIN konkreter nächster Schritt.

## Billige Variante: Rollen-Council (eine Familie)

Wenn Cross-Vendor zu teuer/überdimensioniert ist: dieselben 3 Stufen mit
Subagenten EINER Familie, aber künstlich gegensätzlichen Denk-Linsen —
das ist das bestehende Adversariale Distill-Muster plus Ranking-Runde.
Wertvollste Zusatz-Linse aus der Advisor-Variante: der **Outsider** (null
Vorkontext, sieht nur die Frage) — fängt den Fluch des Wissens, z. B.
Fachbegriffe, die der Kunde nicht kennt.

Grenze: eine Familie teilt ihre blinden Flecken. Für ship-kritische oder
teure Entscheidungen immer die Cross-Vendor-Vollform.

## Regeln

- Stufe 1 immer parallel starten — sequenziell färben sich die Meinungen.
- Reviewer ranken auch die eigene (anonyme) Antwort — kein Selbst-Ausschluss
  nötig, die Anonymisierung neutralisiert das.
- Council-Ergebnis ist ein **Entscheidungs-Input**, kein Ship-Gate: was
  daraus gebaut wird, läuft trotzdem durch eval (G1→G2).
- Kein Council für Kleinkram — 3 Familien × 2 Runden + Synthese ist teuer;
  Delegations-Schwelle aus dispatch.md gilt.
- Transkript nur bei tragweiten Entscheidungen ablegen (ops/ bzw.
  Brain-Kandidat), sonst Chat reicht.
