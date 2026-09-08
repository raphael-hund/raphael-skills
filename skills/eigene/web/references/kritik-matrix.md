# Kritik-Matrix: eine erste Kritik, weitere Stimmen nur nach FAIL

**Owner:** Skill `web`. Diese Datei ist der einzige Spawn-Plan für Kritik. Sie setzt Raphaels Stufenregel vom 08.09.2026 um: nach jedem Bau genau ein Kritiker aus Stufe 2, andere tatsächliche Modellfamilie als der Builder, `effort: high`; vor Auslieferung genau eine Abnahme aus Stufe 1, ebenfalls andere Familie als der Builder. Ein zweiter Kritiker oder `xhigh` läuft nur nach einem FAIL.

## Eingabe

Vor Kritik müssen vorliegen:

- `PRUEFGEGEN.md`: Linse, Referenzdateien, Route/Viewport/Zustand und konkrete Prüffrage.
- frischer Produktionsbuild; `curl` jeder Route belegt h1, Fliesstext, Links und Metadaten im Response-HTML.
- frischer `shot-sweep` gegen diesen Build, `manifest.json`, Build-Revision und Shot-Ledger.
- `BILDLISTE.txt` mit Raphaels Referenzbildern und 1 bis 2 passenden Referenz-Folds.
- deterministische Gates der betroffenen Achsen: axe, onpage, Formular, Tastatur, craft, motion, Werkzeugtabelle und DESIGN.md-Abgleich.

Der Parent liest keine PNG-Binaries. Er führt Befehle aus, vergleicht Manifest/Revision und merged Berichte.

## Auswahl des ersten Kritikers

| Builder-Familie | erster Kritiker (Stufe 2) | Hinweis |
|---|---|---|
| Fable | `grok-critic` (visuell/technisch) oder `opus-critic` (UX/Code) | Opus nach Fable ist als Instanz-Trennung zu kennzeichnen |
| Astra (GPT) | `grok-critic` oder `opus-critic` | andere Familie als GPT |
| Kimi | `grok-critic` oder `opus-critic` | andere Familie als Kimi |
| Opus | `grok-critic` | nie Opus nach Opus |
| Grok (nur Technikpaket) | `opus-critic` | kein `grok-critic` nach Grok |
| Sol (nur Backendpaket) | `opus-critic` oder `grok-critic` | Sol prüft nicht Sol |

`sol-critic` prüft nur Code und Backend. Er sieht keine Bildpfade und übernimmt keine visuelle, Copy- oder SEO-Kritik. Copy- und SEO-Befunde gehen als Text-/HTML-Eingabe an `grok-critic` oder `opus-critic`, zusammen mit `forbidden-check.py` beziehungsweise `onpage-check.mjs`.

Der Kritik-Prompt beginnt mit:

```text
ACTUAL_BUILDER_FAMILY: <Fable|GPT|Kimi|Opus|Grok|Sol>
ANGEFRAGTER KRITIKER: <agentType>
EFFORT: high
```

Die tatsächliche Familie ergibt sich aus der ersten Zeile `ANGEFRAGTES MODELL` plus sichtbarem FAILOVER-Hinweis. Kollabiert der Kritiker durch Fallback auf die Builder-Familie, ist sein Bericht nur ein Parent-Check; ein Kritiker anderer Familie läuft.

## Eine Kritik deckt alle Achsen ab

Der erste Kritiker bekommt höchstens 12 Shot-Kacheln einer zusammenhängenden Route oder Seitenfamilie und die deterministischen Berichte als Text. Sein Auftrag enthält diese Achsen:

1. **Visual:** Hierarchie, Spacing, Typografie, Bildschnitt, mobile Komposition, Zustände.
2. **Usability:** Navigation, CTA, Formular, Fokus, Touch, Fehlermeldungen, Reduced Motion.
3. **Content und Trust:** Copy gegen VOICE/PROOF, echte Claims, sichtbare Belege, keine erfundenen Fakten.
4. **SEO und Technik:** Response-HTML, Titel, Canonical, Links, Status, Routenabdeckung, Build-Frische.
5. **Konsistenz:** Tokens, Komponentenvarianten, Server/Client-Grenze, Registry-Herkunft und Abhängigkeiten.
6. **Blind-Vergleich:** Je Achse `build | referenz | unentschieden` plus eine konkrete Lücke. `referenz` auf Visual bedeutet FAIL.

Ein deterministischer Gate-Bericht ergänzt den visuellen Blick. Screenshots belegen sichtbare Qualität; Response-HTML, Statuscodes und Formularzustellung brauchen eigene Checks.

## Qualitätsschleife

1. Builder baut das Paket und liefert Befehls- sowie Screenshot-Belege.
2. Genau ein Stufe-2-Kritiker anderer Familie prüft mit `effort: high`.
3. Bei PASS geht das Paket weiter. Vor der gesamten Auslieferung läuft genau eine Stufe-1-Abnahme anderer Familie als der Builder.
4. Bei FAIL bekommt derselbe Builder höchstens drei priorisierte Notizen und fixt.
5. Danach laufen frischer Produktionsbuild, betroffene Gates und Sweep erneut. Erst jetzt darf ein zweiter Stufe-2-Kritiker anderer Familie oder `xhigh` prüfen.
6. Maximal drei Fixrunden. Danach `escalate` an Raphael mit Belegen und der offenen Entscheidung.

Kein Panel im ersten Durchlauf. Keine PAGE-, SITE- und LENS-Flotten parallel. Zusätzliche Achsen sind Abschnitte im ersten Auftrag oder deterministische Skripte, keine zusätzlichen Kritiker.

## Drei Ausgänge

| Ausgang | Bedingung | Folge |
|---|---|---|
| `clear` | Kritiker PASS und deterministische Gates grün; vor Auslieferung zusätzlich Stufe-1-Abnahme PASS | Paket fertig |
| `miss-with-feedback` | mindestens ein belegter Befund | höchstens drei Notizen zurück an denselben Builder; Rebuild und Re-Sweep |
| `escalate` | dritter Durchlauf ohne `clear`, widersprüchliche Belege oder Entscheidung nur durch Raphael | keine vierte Runde |

## Deterministischer Gate-Beleg (d)

Ein Copy-, SEO- oder Trust-Befund gilt nur mit deterministischem Gate-Beleg (d): SEO mit der kopierten Ausgabe von `onpage-check.mjs`, Copy mit `forbidden-check.py` oder G1-Stelle, Trust mit Zeile aus `PROOF.md`. Ohne diesen Beleg parkt der Befund als `content-park` oder `ops-park`; er kommt nicht auf die Fixliste. Das Shot-Ledger trägt überall dieselben Spalten: `pfad | viewport | gelesen-von | verdict`.

## Befundklassen

Jeder Befund trägt genau eine Klasse:

- `visual-block`: sichtbarer Qualitäts- oder Referenzabstand.
- `struktur-block`: Ablauf, Sitemap, Informationsarchitektur oder Route falsch.
- `swap`: Text, Bild oder Sektion kann ohne Richtungswechsel ersetzt werden.
- `content-park`: fehlende echte Zahl, Review, Person, Bild oder Claim; Vorschau möglich, Launch blockiert.
- `ops-park`: Domain, Consent, Tracking, Formularziel oder Deploy-Zugang fehlt.
- `sweep-artefakt`: Aufnahmefehler, View-Transition-Hänger oder angeschnittener beliebiger Scrollpunkt; kein Produktbefund ohne Verifikation am Original.

`content-park`, FAKT-GATE und `ops-park` sind nie `biggest_gap` einer visuellen Kritik. Der Web-Skill entscheidet keine Kundenfakten eigenmächtig.

## Rückgabeformat des Kritikers

```yaml
actual_builder_family: Fable
requested_critic: grok-critic
delivered_family: Grok
fallback: false
route_or_family: /
effort: high
verdict: fail
biggest_gap: "Mobile Fold: CTA liegt ausserhalb des ersten Viewports"
blind:
  visual: referenz
  usability: unentschieden
  creativity: build
  content_trust: unentschieden
findings:
  - class: visual-block
    severity: P1
    shot: home-mobile-00-fold.png
    region: hero/cta
    observed: "CTA beginnt unter 844 CSS px"
    fix: "Hero-Höhe und vertikalen Abstand reduzieren"
    retest: "frischer mobile fold"
deterministic_evidence:
  - "onpage-check: exit 0"
  - "axe-run: 0 violations"
```

Maximal drei Findings, wichtigste zuerst. Ein Finding ohne Route/Shot oder Datei:Zeile, konkrete Beobachtung, Fix und Retest wird nicht umgesetzt.

## Stufe-1-Abnahme vor Auslieferung

Genau eine Abnahme aus `fable-critic`, `astra-critic` oder `kimi-critic`, andere Familie als der Builder. Die Abnahme liest den finalen Diff, alle aktuellen Gate-Berichte, repräsentative Desktop-/Mobil-Shots, `DESIGN.md`, `SEO-PAGE-MAP.json` und das Shot-Ledger. Sie baut nichts und startet keine Agenten. FAIL geht an denselben Builder; danach beginnt die Stufe-2-Folge für den neuen Bau erneut.
