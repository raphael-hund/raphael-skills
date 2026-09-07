# Run-Evidence-Vertrag

Kleines revisionsgebundenes Receipt. Kein Scheduler, keine Unit-Checkliste,
kein Fortschritts-Tracker, keine Agent-Orchestrierung.

## Ort

`<run-out>/run-evidence.json` liegt **run-isoliert außerhalb** des
attestierten Git-Baums (nicht im Ziel-Repo). Nur Contract-Dateien wie Plan,
Wahrheitsvertrag oder Designvertrag sind versionierte Inputs.

## Schema `web/run-evidence/v1`

Erlaubte Felder:

| Feld | Inhalt |
|---|---|
| `schema` | genau `web/run-evidence/v1` |
| `run_id` | stabile Lauf-ID |
| `target.repo` | Ziel-Repo (Pfad) |
| `target.revision` | Build-Revision (Git-SHA oder gleichwertig) |
| `target.base_url` | geprüfte Basis-URL |
| `plan.required` | `true`, wenn die Lane einen `website-plan` als Baukanon nennt |
| `plan.path` | genannter Planordner oder `null` |
| `contracts[]` | `{ role, path, sha256 }` — SHA-256 der aktuellen Datei |
| `evidence` | Verweise auf Plan-Receipt, G1-Bericht, Screenshot-Manifest, `visual-ship.json` (je `{ path, sha256 }` oder `null`) |
| `phase` | genau einer von `planned`, `building`, `verifying`, `blocked`, `ready`, `deployed`, `learning` |

Verboten: `units`, `unit_progress`, `checklist`, `progress`, `agents`,
`orchestration`, `tasks`. Unbekannte Schema-Versionen und teilweise
geschriebenes JSON sind `BLOCKED`.

## Receipt-Identität

Plan-Receipt, G1-Bericht und Screenshot-Manifest tragen explizite Schemas
sowie `run_id` und `build_revision`.

| Receipt | Aktuelles Schema |
|---|---|
| Plan-Verification | `website-plan/verification/v3` plus `run_id`, `build_revision` |
| G1-Bericht | `web/g1-report/v2` |
| Screenshot-Manifest | `web/shot-sweep/v2` |
| Ship | `visual-aaa/ship/v2` (`run_id` + `build_revision` zusätzlich zum v1-Vertrag) |

`visual-aaa/ship/v1` bleibt lesbare Historie und zählt **nie** als aktueller
Ship-Beleg. v1 wird nicht still als v2 gelesen.

## Regeln

1. Evidence nur atomar anhängen, wenn `run_id` und `build_revision` zur
   Ziel-Revision passen und die Contract-Hashes noch stimmen.
2. Ein neuer Build (`bind-build`) invalidiert ältere Capture- und QA-Receipts
   (G1, Sweep, Ship). Der Plan-Receipt bleibt, solange der Plan-Hash hält.
3. Zwei grüne Receipts mit unterschiedlichen Run-IDs ergeben keinen Gesamt-PASS.
4. Evidence von Commit A gegen Commit B ist `BLOCKED`.
5. Eine geänderte Plan- oder Design-Datei (Hash-Drift) invalidiert den
   bisherigen Build-/QA-Beleg.
6. Ein optionaler Website-Plan darf fehlen, wenn die Lane keinen
   `website-plan` als Baukanon nennt. Ein **genannter** Plan ist Pflicht
   (PASS-Receipt, Hash, Run-ID, Revision).
7. Werkzeug: `node scripts/run-evidence.mjs`. Exit 0 = `RUN_EVIDENCE=PASS`,
   Exit 1 = `RUN_EVIDENCE=BLOCKED`, Exit 2 = Aufruffehler.

## CLI

Subcommands schreiben atomar (Tempdatei + `rename`) nach
`<run-out>/run-evidence.json`. `--out` darf nicht im Ziel-Repo liegen.

```
node scripts/run-evidence.mjs create --out DIR --run-id ID --repo PATH \
    --revision SHA --base-url URL [--plan DIR] [--plan-required] \
    [--contract role=path]... [--phase PHASE]
node scripts/run-evidence.mjs bind-build --out DIR --revision SHA
node scripts/run-evidence.mjs attach --out DIR --kind plan|g1|sweep|ship --path FILE
node scripts/run-evidence.mjs validate --out DIR [--ready]
```

- `create` legt das Manifest an (`phase` default `planned`, Evidence `null`).
- `bind-build` friert die neue Revision ein und invalidiert Capture/G1/Ship.
  Der Plan-Receipt bleibt nur, wenn Run-ID, Revision und Plan-Hash halten.
- `attach` hängt ein Receipt nur an, wenn Schema, `run_id`, `build_revision`
  und Contract-Hashes passen. `visual-aaa/ship/v1` darf nicht als aktueller
  Ship-Beleg angehängt werden.
- `validate` prüft Schema, Identität, Hashes und verbietet Scheduler-Felder.
  `--ready` verlangt G1, Sweep, Ship/v2 und — falls genannt — den Plan-Receipt.
