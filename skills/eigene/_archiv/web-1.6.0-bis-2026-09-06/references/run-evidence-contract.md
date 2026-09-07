# Run-Evidence-Vertrag

`web` besitzt den Gesamtabschluss. Dieses kleine Receipt verbindet die für den
Auftrag verlangten Nachweise. Es ist kein Scheduler, keine Unit-Checkliste und
kein zweiter Fortschritts-Tracker.

## Ort und Version

`<run-out>/run-evidence.json` liegt run-isoliert außerhalb des Ziel-Repos.
Contract-Dateien bleiben versionierte Inputs. Neue Manifeste verwenden
`web/run-evidence/v2`: v1 hatte keine auftragsbezogene Anforderungsliste und
wird nicht still als aktueller PASS interpretiert. Einen alten Lauf mit den
aktuellen Contract-Dateien und tatsächlich verlangten Nachweisen neu anlegen.

| Feld | Inhalt |
|---|---|
| `schema`, `run_id` | `web/run-evidence/v2`, nichtleere Lauf-ID |
| `target` | `repo`, `revision`, `base_url` des geprüften Ziels |
| `plan` | `required` und vorhandener Planpfad oder `path: null` |
| `contracts[]` | `{role, path, sha256}` der aktuellen Eingaben |
| `requirements` | `required`, `routes`, optional `checks` und `states` |
| `evidence` | Hashgebundene Referenzen für `plan`, `g1`, `sweep`, `ship`, `functional` oder `null` |
| `phase` | `planned`, `building`, `verifying`, `blocked`, `ready`, `deployed`, `learning` |

`requirements.required` nennt mindestens eine tatsächliche Receipt-Art;
`routes` die nichtleere beauftragte Routenliste. `checks` benennt bei Bedarf
verlangte G1-Prüfer. `states` benennt genaue funktionale Schlüssel aus
`route`, `viewport`, `target`, `state` und verlangt dann `functional` als
Pflichtbeleg. Es werden keine zusätzlichen Qualitätsdimensionen aus einem
Dateinamen oder Auftragstext erraten.

Verboten bleiben `units`, `unit_progress`, `checklist`, `progress`, `agents`,
`orchestration`, `tasks`. Unbekannte Schemas, teilweise geschriebenes JSON,
fehlende Ergebnisse und Hash-Drift sind `BLOCKED`.

## Ergebnis und Abdeckung

| Art | Schema | Erforderlicher Inhalt |
|---|---|---|
| Plan | `website-plan/verification/v3` | PASS, `plan_id`, `manifest`, `manifest_sha256`; aktueller v3-Plan und gebundene Artefakthashes |
| G1 | `web/g1-report/v2` | PASS, `ok: true`, nichtleere tatsächliche `results`, kein fehlgeschlagener/übersprungener Prüfer; beauftragte Routen und Checks |
| Sweep | `web/shot-sweep/v2` | PASS, tatsächliche Shots pro Route mit SHA-256, vorhandene unveränderte Dateien, deklarierte Zustände mit exakter Abdeckung |
| Visuelles Urteil | `visual-aaa/ship/v2` | PASS, gehashte Renderdateien, jüngstes belegtes visuelles PASS pro Seite, aktuelle G1-/Sweep-Inputs |
| Funktion | `web/functional/v1` | PASS, nichtleere `checks` mit exaktem Schlüssel, `expected`, `actual` und gehashten Belegdateien |

Build-Belege tragen dieselbe `run_id`, `build_revision` und `base_url` beziehungsweise
`base`. Der Plan ist ein Build-unabhängiger Input: `create --plan DIR` validiert
den vorhandenen v3-Plan und bindet Manifest plus referenzierte Artefakte als
Contracts. Sein echtes Producer-Receipt braucht keine erfundenen Run-Felder.
Planprüfungen verändern weder den Plan noch das ursprüngliche Receipt. `FAIL`, `BLOCKED`, `NOT_RUN`,
`NOT_CHECKED`, leere Abdeckung und widersprüchliches `ok: false` ergeben nie
ready. Ein optionaler Website-Plan darf fehlen; ein ausdrücklich genannter
Plan braucht seinen gültigen Receipt. `visual-aaa/ship/v1` ist nur Historie,
nie ein aktueller Ship-Beleg.

Ein funktionaler Check enthält beispielsweise:

```json
{
  "route": "/kontakt",
  "viewport": "mobile",
  "target": "contact",
  "state": "success",
  "status": "PASS",
  "expected": {"http_status": 200, "ui": "success"},
  "actual": {"http_status": 200, "ui": "success", "mode": "mocked"},
  "evidence": [{"path": "/absolute/run/response.json", "sha256": "SHA256"}]
}
```

`expected` und `actual` sind nichtleere Texte oder Objekte. Ein simulierter
Backend-Response belegt den beschriebenen Testweg, keine echte CRM-Zustellung.
Ein Source-Scan oder Feldstrukturcheck wird nie automatisch zu Funktions-PASS.

## CLI

```bash
node scripts/run-evidence.mjs create --out DIR --run-id ID --repo PATH \
  --revision SHA --base-url URL [--routes /,/kontakt] \
  [--plan DIR] [--plan-required] [--contract role=path]... \
  [--requirements FILE] [--phase PHASE]
node scripts/run-evidence.mjs bind-build --out DIR --revision SHA
node scripts/run-evidence.mjs attach --out DIR --kind plan|g1|sweep|ship|functional --path FILE
node scripts/run-evidence.mjs validate --out DIR [--ready]
```

Ohne `--requirements` bleibt der vorhandene Umfang G1 + Sweep + Ship mit
explizit genannten Routen (`/` als kompatibler Einrouten-Default). Für einen
anderen maschinellen Abnahmeumfang ist `--requirements` optional nutzbar;
die Datei wird als Contract mit SHA-256 gebunden. Eine kleine Textänderung
braucht keinen zusätzlichen Dateisatz, sofern sie keinen solchen Gesamtbeleg
benötigt. Beispiel für einen vorhandenen funktionalen QA-Vertrag:

```json
{
  "required": ["functional"],
  "routes": ["/kontakt"],
  "states": [{"route": "/kontakt", "viewport": "mobile", "target": "contact", "state": "success"}]
}
```

`bind-build` invalidiert G1, Sweep, Ship und Funktion. Plan-Hashes werden
weiter kontrolliert; unveränderte Planung bleibt gültig, alte Build-Belege nicht.
`attach` ersetzt eine Referenz atomar erst nach Prüfung. Ein neuer G1-/Sweep-Beleg
invalidiert sein früheres visuelles Urteil; ein neuer Sweep invalidiert auch
den daran gebundenen Funktionsbeleg. Ein erneuter erfolgreicher Lauf darf denselben
Receiptpfad ersetzen, ohne Contract-Hash-Prüfungen zu umgehen. Ein gültiger Attach
belegt die erfolgte Operation; nur `validate --ready` belegt den vollständigen
angeforderten Nachweissatz. Änderungen an beauftragten Anforderungen, Plan,
Design oder Belegdateien invalidieren den bisherigen Abschluss.

Exit 0 = `RUN_EVIDENCE=PASS`, Exit 1 = `RUN_EVIDENCE=BLOCKED`, Exit 2 =
Aufruffehler. Schreiben erfolgt über Tempdatei und Rename.

## Producer

G1 verlangt `--base --run-id --build-revision`. `--checks` wählt aus
`lighthouse,axe,links,ai-slop,craft,formular,importe,motion,tastatur,shot-sweep`;
ohne Auswahl laufen die bisherigen technischen Prüfer. Web-Ship-Writer und
Run-Evidence verwenden denselben `validate-ship-manifest.py`-Vertrag; dessen
Inputhashes, vollständige Renderliste und belegte Urteile werden erneut geprüft. Fehlende ausgewählte
Werkzeuge bleiben ungeprüft. G1 führt keine geschäftliche Formularaktion aus.
`--state-spec` reicht deklarierte Szenarien an den Sweep weiter. Ohne Szenarien
sind weder Focus/Open noch andere Interaktionen pauschal Pflicht.
