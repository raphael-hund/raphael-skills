# visual-ship.json — Vertrag

## Schema

```json
{
  "schema": "visual-aaa/ship/v1",
  "ok": true,
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
      "render": "render/05-verantwortung.png",
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
      "beleg": "…",
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

## Validate-Regeln (`validate-ship-manifest.py`)

- `ok` muss `true` sein.
- `self_read` muss `true` sein.
- `g1_exit` muss `0` sein.
- `pages` nicht leer; jede `render`-Datei existiert und size > 10_000 Bytes.
- Jede page_id hat mindestens ein Critic-Verdikt mit `verdict=pass` und
  `confidence=HIGH`.
- Kein Critic-Verdikt mit `verdict=fail` ohne späteren pass derselben page_id
  mit höherer `round`.
- `acceptance_checks` (falls vorhanden): alle `status=pass`.

Exit 0 nur wenn alles gilt — sonst Exit 1 und stdout listet Verstöße.
