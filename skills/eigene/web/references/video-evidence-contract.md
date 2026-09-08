# Video-Evidence-Vertrag — externe Lehren bleiben bis zum Beleg Kandidaten

**Verbund (08.09.2026):** Abdeckungsstufen (Kanal-Enumeration, Caption-Analyse, gesehene Frames) und der Methodenindex stehen in [video-coverage.md](video-coverage.md) und [video-methods.md](video-methods.md).

Stand: 01.09.2026.

Dieser Vertrag gilt, wenn `watch-video` Material für den Website-Workflow liefert.
Er trennt beobachtete Quelle, übertragbare Lesson und spätere Regeländerung. Ein
Video ersetzt weder lokale QA noch Raphaels Art-Direction-Urteil.

## 1. Web-Evidence-Handoff

Ein Handoff ist nur vollständig, wenn alle Felder belegt sind. Ein leeres Feld
heißt `nicht geprüft`, nie PASS.

| Feld | Vertrag |
|---|---|
| Video-ID | Stabile Plattform-ID, bei YouTube die elfstellige ID. |
| Titel | Originaltitel der Quelle; nicht aus dem Inhalt erfinden. |
| Quelle | Kanonische URL und Abrufdatum. |
| Quellenfamilie | Familie des Evidence-Autors; sie wird gegen den Skeptiker geprüft. |
| Transcript-Methode | Captions, lokales Whisper oder anderes benanntes Verfahren samt Frame-Gegencheck. |
| Transcript-Anfang / Transcript-Ende | Tatsächlich geprüfter Bereich `MM:SS–MM:SS`; fehlende Endzeit blockiert Bestätigung. |
| Frame-Belege | Zeitmarke plus absoluter Frame-/Sheet-Pfad für jeden visuellen Claim; die Zeitmarke liegt im Lesson-Bereich. |
| Zeitmarken | Pro Lesson mindestens ein Bereich `MM:SS–MM:SS`. |
| Lesson | Eine prüfbare Aussage, keine Geschmacksnote und kein Creator-Score. |
| betroffene Phase | `Strategy/IA`, `Copy/Visual System`, `Basisbuild`, `Motion-Polish`, `QA` oder `visual-aaa`. |
| Caveat | Werbeinteresse, Messlücke, Übertragbarkeitsgrenze oder Gegenbeleg. |
| Confidence | `high`, `medium`, `low` oder `uncertain`, mit kurzer Begründung. |
| Promotion-Status | `kandidat`, `bestätigt` oder `verbindlich`. |
| Skeptiker-Receipt | Ab `bestätigt`: fremde Familie, Datum, Source-Hash, Findings und offene Einschränkungen. |
| Promotion-Receipt | Bei `verbindlich`: Kandidat, Skeptiker-Receipt, Zielrevision und messbares Gate. |

Schemaform:

```yaml
video_id: WCrnS09vpfo
title: "Originaltitel"
source: "https://youtu.be/WCrnS09vpfo"
source_family: creator
transcript_method: captions-plus-frame-check
transcript_start: "00:00"
transcript_end: "21:15"
frames:
  - timecode: "03:08"
    path: "/tmp/watch-video/body/f_54.jpg"
lessons:
  - timecode: "03:08–05:17"
    lesson: "Primary Journey schlägt Featuremenge."
    phase: "Strategy/IA"
    caveat: "Kein pauschales Kürzungsgebot für komplexe Produkte."
    confidence: medium
    visual_claim: false
status: kandidat
skeptic_receipt: null
promotion_receipt: null
```

## 2. Fail-closed Evidence-Regeln

- Fehlende Video-ID, URL, Transcript-Endzeit, Lesson, Lesson-Zeitmarke, Phase,
  Caveat, Confidence oder Promotion-Status verhindert die Promotion zu
  `bestätigt`.
- Ein visueller Claim braucht einen Frame-Beleg mit Zeitmarke und absolutem
  Pfad am behaupteten Zeitpunkt. Ein rein transkriptbasierter visueller Claim
  bleibt `kandidat`.
- Transcript und Frame müssen dieselbe Aussage tragen. Widerspruch senkt die
  Confidence und wird im Caveat sichtbar.
- `bestätigt` braucht einen vollständigen fremdfamiliären Skeptiker-Receipt;
  `verbindlich` zusätzlich einen Promotion-Receipt mit Zielrevision und Gate.
- Creator-Wertungen wie „perfect score“, allgemeine Tool-Versprechen und
  Modell-Rangfolgen werden ohne datierten lokalen Benchmark nie verbindlich.
- Creator-Demos und Werbung belegen eine Beobachtung, aber keine Conversion-
  Wirkung und keine globale Geschmacksregel.
- Jede spätere Regel- oder Eval-Änderung nennt Source, Zeitmarke, Caveat,
  exakten Zielpfad, U/KTD-Referenz und messbares Gate.

## 3. Promotion-Pipeline

Die einzige Reihenfolge lautet **kandidat → bestätigt → verbindlich**.

### kandidat

- Raw-Eintrag und Brain-Kandidat sind persistiert.
- Quelle, Coverage, Lessons und Caveats sind sichtbar.
- Der Eintrag ändert weder `stil-regeln.md` noch Defaults, Router oder
  Produktionsregeln.

### bestätigt

- Das Handoff-Schema ist vollständig und die Quelle ist erreichbar oder als
  eingefrorener Beleg vorhanden.
- Eine fremde Modellfamilie liefert einen **Skeptiker-Receipt**. Sie prüft
  Kernfakten, Frame-/Transcript-Bindung, Übertragbarkeit und Werbeinteressen.
- Der Receipt nennt Prüferfamilie, Datum, Source-Hash, Findings und offene
  Einschränkungen. Dieselbe Familie wie der Evidence-Autor zählt nicht.
- Ein fehlgeschlagener, unstrukturierter oder nur behaupteter Gegencheck zählt
  nicht als Skeptiker-PASS.

### verbindlich

- Der bestätigte Kandidat hat einen exakten Zielpfad und ein ausführbares,
  messbares Gate oder Eval.
- Eine visuelle Geschmacksentscheidung besitzt Raphaels ausdrückliches Urteil.
- Der Promotion-Receipt bindet Kandidat, Skeptiker-Receipt, Zielrevision und
  geändertes Gate. Erst dann darf eine Regel oder ein Default wechseln.

Promotion ist keine Umbenennung im Text. Ohne die Receipts bleibt der Status
`kandidat`, auch wenn die Lesson plausibel klingt.

## 4. Visuelle Cases

Websites und Frames laufen über `muster-bibliothek/_template.md`. Quelle,
Capture, Frame-Beleg, Do-not-copy-Grenze und Lizenzstatus sind Pflicht. Ohne
Raphael-Urteil bleibt der Case `kandidat`; ein Agent setzt kein GO.

## 5. Eingefrorene Erst-Fixture

Der Plan
`/root/raphael-skills/skills/eigene/web/plans/2026-08-31-web-workflow-evidenzvertrag-plan.md`
bindet die fünf IDs `WCrnS09vpfo`, `QUI6Ug4cHnE`, `bg0C-2iUUqM`,
`VwGrXe2ricE` und `Ysr7oNDajJI`. Sein Source-to-Decision Ledger enthält
10/12/8/10/8 Lessons, insgesamt 48, mit den Dispositionen 11 `ADOPT`, 27
`CONFIRM_EXISTING`, 6 `REJECT`, 4 `DEFER` und
`unexplained_lessons=0`. Jede Lesson steht genau einmal im Ledger und bindet
Timecode, exakten Zielpfad, U/KTD, messbares Gate und Caveat. `REJECT` nennt
den Grund; `DEFER` die Wiedereintrittsbedingung. Bis ein fremdfamiliärer
Skeptiker-Receipt vorliegt, bleiben alle fünf Quellen Kandidaten.

## 6. Runtime-Provenance-Gate

Das Gate parst die Tabellen der Plan-Sektion `Runtime Provenance and
Limitations` semantisch und bindet Rolle, tatsächliches Modell und Disposition
an Workflow- und Worker-ID:

- Research `wf_ef2e1083-612`: `agent-a8b91d246a573f5f2`,
  `agent-ad5324d3618bef292` und `agent-a0f692fd1c978c66b` liefen auf
  `gpt-5.6-sol`; der Ecosystem-Worker bleibt `recovered/unstructured`.
- Review `wf_761399ea-c3b`: Design und Product liefen auf `gpt-5.6-sol`,
  Adversarial auf `grok-4.6-build`. Die konkreten drei FAILED-Worker bleiben
  FAILED und zählen nicht als Coverage.
- Workflow-Metadaten und angeforderte Modell-Labels sind kein Runtime-Beweis.
  Maßgeblich bleibt die je Worker gebundene Tabellen-Disposition.

Negativtests schreiben ausschließlich temporäre Plankopien. Fehlende Video-,
Workflow- oder Worker-ID, fehlendes Lesson-Feld, falsche Rolle oder falsches
Modell, gelöschte FAILED-/`recovered/unstructured`-Disposition und ein
Fable-Claim für Adversarial müssen rot werden; der Hash des geprüften Originals
bleibt unverändert.
