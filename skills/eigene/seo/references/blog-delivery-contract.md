# Blog-Delivery-Contract (5-Gate-Ablaufdisziplin)

Herkunft: destilliert aus `github.com/AgriciDaniel/claude-blog` (MIT-Lizenz, Commit
`49842ea9e7b9a1f6f8a3774a3fcfb082ab6a7d25`, Datei
`skills/blog/references/blog-delivery-contract.md`, v1.9.0). Kein wörtliches Zitat —
auf unser Loop-4/G1-G2-Modell umgeschrieben und um die eigenen Werkzeuge ergänzt statt
1:1 der `patchright`/`blog_preflight.py`-Implementierung des Originals zu folgen.

## Warum das eine eigene Datei ist, statt in loop4-ablauf.md zu verschmelzen

`loop4-ablauf.md` sagt WELCHE Gates existieren (G1 Research/Tech-QA, G2 Rubrik ≥0.7,
G4 Outcome). Diese Datei ergänzt eine Lücke, die dort fehlt: eine **automatische
Sequenz von Prüfschritten zwischen "Text ist fertig geschrieben" und "Text wird dem
Kunden/Nutzer gezeigt"** — nicht als Ratschlag, sondern als Blocker, der nicht
übersprungen werden kann, ohne es explizit und laut zu vermerken. Der Kernfehler, den
das Original beheben wollte: ein Reviewer-Schritt existierte, lief aber nur beratend —
der Autor hat den Entwurf trotzdem ungeprüft präsentiert. Die Lösung ist Infrastruktur
(ein Ablauf, der real blockiert), nicht mehr Disziplin-Appell.

## Die 5 Gates (auf unseren Kontext übersetzt: Text/Markdown-Auslieferung, kein Patchright-Zwang)

| Gate | Prüft | Blockiert bei | Bei uns konkret |
|---|---|---|---|
| 1. Fähigkeits-Check | Sind die nötigen Werkzeuge/Daten überhaupt da, bevor geschrieben wird? | Kein Bild-Pfad, kein Reviewer verfügbar | Vor `/blog write`: liegt ein SERP-/GSC-Export vor (Belegpflicht aus loop4-ablauf.md)? Ist eval/G2-Rubrik erreichbar? Bild-Pfad (generate_image o.ä.) vorhanden? |
| 2. Format-Vollständigkeit | Alle vereinbarten Liefer-Artefakte existieren | Irgendein Artefakt fehlt | z. B. Markdown + Meta/Schema-Snippet + Hero-Bild, wenn das der vereinbarte Umfang ist — nicht nur der Fließtext |
| 3. Visuelle Verifikation | Gerendertes Ergebnis hat keine Darstellungsfehler | SVG/Chart-Overflow, Konsolenfehler, kaputtes JSON-LD | Nur relevant, wenn tatsächlich HTML/Chart gerendert wird (z. B. `blog-chart`-artige Fälle); sonst entfällt Gate 3 explizit, statt es zu faken |
| 4. Content-Review (BLOCKIEREND) | G2-Rubrik-Score + P0-Filter | Score < Schwelle ODER irgendein P0-Problem, unabhängig vom Score | Bestehendes G2 (Rubrik `evals/rubrics/seo.md`, Schwelle 0.7) wird zum **Blocker statt Empfehlung** erklärt: kein Ausliefern bei Fail, auch nicht bei sonst hohem Score |
| 5. Asset-/Link-Integrität | Jedes Bild, jeder Link, jede Datei-Erwähnung ist real | 404, erfundener Dateiname, Wortzahl-Falschangabe | Jeder `<a href>`/Bildpfad im gelieferten Text wird geprüft, nicht nur behauptet; Wortzahl-Angabe im Text muss zur echten Wortzahl passen (±5 %) |

Alle Gates laufen **sequenziell**; der erste Fail stoppt die Kette und löst die
Iterationsschleife aus (siehe unten). Ein erfolgreicher Durchlauf liefert Text + kurzes
Prüfprotokoll ("Gates 1-5 grün, iteriert: N-mal") statt einfach nur den Text.

## Blockierende Entscheidungsregel für Gate 4 (das eigentlich Neue ggü. bisherigem G2)

Bisher: G2 ≥ 0.7 als weiche Schwelle. Neu übernommen — **P0 ist ein absoluter Filter,
unabhängig vom Zahlenscore**: ein Text kann 0.9 scoren und trotzdem eine einzige
tragende erfundene Zahl enthalten (P0) → Block, Punkt. Score und P0-Check sind zwei
getrennte Prüfungen, nicht eine gewichtete Summe. Ausgabeformat für die Entscheidung,
maschinenlesbar am Ende jedes Reviews:

```
BLOCKING: true (Score 0.62 unter Schwelle; P0 bei erfundener Statistik ohne Quelle)
BLOCKING: false (alle Gates grün)
```

## Iterationsschleife (3 Versuche, dann Stopp mit Diagnose)

1. Diagnose festhalten: welches Gate, welcher konkrete Check ist gescheitert.
2. Gezielten Fix-Auftrag bauen, der GENAU an dem gescheiterten Punkt ansetzt (z. B.
   "P0 bei Abschnitt 3, fehlende Quelle für Zahl X" statt "Text nochmal überarbeiten").
3. Alle 5 Gates NEU von vorn laufen lassen (nicht nur das eine, das gescheitert war —
   ein Fix kann an anderer Stelle etwas kaputt gemacht haben).
4. Nach 3 gescheiterten Durchläufen: stoppen, Diagnose + Teil-Entwurf + letzten
   Review dem Nutzer zeigen, explizit "manueller Fix nötig" sagen. Nicht automatisch
   weiter iterieren — das verbrennt Kontext ohne Erfolgsaussicht.

## Bypass-Mechanismus (explizit, laut, nie stillschweigend)

Standard ist streng (alle 5 Gates müssen grün sein). Ein bewusster Override ist erlaubt,
aber nur mit lauter Kennzeichnung im gelieferten Text/Protokoll:

```
WARNUNG: Delivery-Contract umgangen. Gescheiterte Gates: [Gate 3, Gate 5].
Wird trotzdem gezeigt, weil [Grund]. Nicht ohne manuelle Prüfung veröffentlichen.
```

Zwei legitime Gründe für Bypass: (1) ein Gate schlägt nachweislich falsch-positiv an
und das wurde verifiziert, (2) der Nutzer will bewusst einen Zwischenstand sehen, bevor
alle Gates grün sind. Kein legitimer Grund: Zeitdruck vor dem eigentlichen Publish.

## Abgrenzung zu bereits Vorhandenem (was NICHT übernommen wurde)

- GEO/AEO-Zitier-Taktiken (Statistik-Boost, Flesch-Band, Freshness-Fenster) — bereits
  vollständig in `ideen-ai-sichtbarkeit-aeo.md` (selbe Quelle: AgriciDaniel, dort schon
  aus `claude-seo` @ 6cf1ea9 vendoriert). Reine Wiederholung, kein neuer Inhalt.
- Interne-Verlinkung/Cluster-Logik — bereits in `taktiken-interne-verlinkung-cluster.md`
  abgedeckt; das Original bietet keine Automatik, die darüber hinausgeht (kein Skript,
  nur Prosa-Regeln, die wir in eigenen Worten schon haben).
- Alles Google-API-/Patchright-/Gemini-Bild-spezifische (Gate 1/3-Implementierung im
  Original): technische Werkzeug-Bindung, kein Agentur-Ablaufwissen — für uns
  irrelevant, weil wir keine eigene Blog-Render-Pipeline mit Screenshot-Tests betreiben.

## Anwendung

Bei jedem `/blog write`- oder `/blog rewrite`-artigen Auftrag über den `seo`-/
`copywriting`-Skill: Gate 1 vor dem Schreiben kurz durchgehen (Beleg-Export da? Rubrik
erreichbar?), nach Fertigstellung Gates 2/4/5 verpflichtend, Gate 3 nur wenn tatsächlich
gerendert wird. G2 aus `loop4-ablauf.md` wird durch die P0-Regel aus Gate 4 **verschärft**,
nicht ersetzt.
