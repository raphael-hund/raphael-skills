# visual-ship.json — Vertrag

## Schema

```json
{
  "schema": "visual-aaa/ship/v2",
  "run_id": "web-20260901-001",
  "build_revision": "4fd7c21",
  "ok": true,
  "status": "PASS",
  "project": "client-alpenenergie/offerte-v2",
  "version_label": "v15",
  "created_at": "2026-08-06T18:00:00Z",
  "self_read": true,
  "self_read_notes": "path/to/befunde.md",
  "g1_exit": 0,
  "g1_report": "path/to/g1-report.json",
  "pages": [
    {
      "id": "05-verantwortung",
      "render": "/absolute/render/05-verantwortung.png",
      "sha256": "SHA256-of-render",
      "source": "seiten/05-verantwortung.html"
    }
  ],
  "critic_verdicts": [
    {
      "page_id": "05-verantwortung",
      "agent": "grok-worker",
      "round": 2,
      "verdict": "pass",
      "biggest_gap": "none",
      "beleg": "05-verantwortung.png oben zeigt lesbare Ansprechpartner neben dem Serviceablauf.",
      "confidence": "HIGH"
    }
  ],
  "acceptance_checks": [
    {
      "id": "monteure-auf-06",
      "status": "pass",
      "beleg": "render/06-abschluss.png faces row"
    }
  ]
}
```

## Version und Identität

- Neue Ship-Manifeste verwenden ausschließlich `visual-aaa/ship/v2`.
- `run_id` und `build_revision` sind nichtleere Strings und binden den Ship-Beleg
  an genau einen Lauf und Build.
- `visual-aaa/ship/v1` bleibt als Historie lesbar, ist aber ohne diese
  Identitätsfelder kein gültiger neuer Ship-Beleg.
- Der Writer lehnt v1 und unbekannte Schema-Versionen fail-closed ab, bevor er
  die Zieldatei verändert.
- Der Writer schreibt zuerst eine temporäre Datei im Zielverzeichnis und
  veröffentlicht sie anschließend atomar per Replace.

## Validate-Regeln (`validate-ship-manifest.py`)

- `schema` muss für einen neuen Ship-Beleg `visual-aaa/ship/v2` sein.
- `run_id` und `build_revision` müssen nichtleer sein.
- `ok` muss `true` und `status` muss `PASS` sein.
- `self_read` muss `true` sein.
- `g1_exit` muss `0` sein.
- `pages` nicht leer; jede `render`-Datei existiert, size >= 10_000 Bytes und SHA-256 unverändert.
- Jede page_id hat mindestens ein Critic-Verdikt mit `verdict=pass`,
  `biggest_gap=none`, `confidence=HIGH` und einem nichtleeren Beleg.
- Jedes Critic-Verdikt hat exakt die vier Pflichtfelder `verdict`, `biggest_gap`,
  `beleg`, `confidence`; ungültige Werte, Platzhalter oder leere Belege sind rot.
- `fail` mit `biggest_gap=none` ist ungültig; `pass` ohne AAA-Bedingungen ist
  ungültig.
- Kein Critic-Verdikt mit `verdict=fail` ohne späteren pass derselben page_id
  mit höherer `round`.
- `acceptance_checks` (falls vorhanden): alle `status=pass`.

Exit 0 nur wenn alles gilt — sonst Exit 1 und stdout listet Verstöße.

## Web-Eingang

Für Web liest der Writer `--sweep /absolute/manifest.json` (Default:
`<render-dir>/manifest.json`) und übernimmt genau dessen Renderliste,
Routen und Viewports. Kein Verzeichnis-Glob fügt fremde oder alte Shots hinzu.
`base_url` und `inputs.g1`/`inputs.sweep` binden Pfade und SHA-256 der
tatsächlichen Produzenten. Beide Inputs müssen PASS derselben Run-/Build-
Identität und Basis-URL sein. Der Validator prüft diese Bindung erneut.

`--self-read true` besagt, dass die ausführende visuelle Prüfrolle die Bilder
gelesen hat; es verlangt keinen zweiten Read derselben Bilder im Controller.
Ein valides visuelles Ergebnis ist ein Fachbeleg, keine Abnahme der gesamten
Website. Die übrigen verlangten Eigenschaften führt Web über Run-Evidence
zusammen. Nicht-Web-Render bleiben als eigener Anwendungsfall verwendbar.

Writer, Validator und der Web-Empfänger `run-evidence` verwenden denselben
Vertrag aus `manifest_errors`, damit
kein Writer-PASS an einem anders definierten Empfänger scheitert. Fehlerhafte
Inputs erzeugen keinen gültigen Beleg; unbekanntes Schema wird vor dem Schreiben
abgelehnt.
