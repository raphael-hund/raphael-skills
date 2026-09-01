# Loop-Primitive

Single source of truth für sequentielle Per-Item- und Unterseiten-Läufe.

## Controller-Vertrag

Der Controller hält die vollständige Queue und genau einen aktiven Eintrag.
Weitere Sessions werden erst erzeugt, wenn der aktive Eintrag `PASS` oder
`BLOCKED` ist. Die Seitensession ist ein Leaf und erzeugt keine Nachkommen.

Für jedes Item gilt:

- genau ein Builder und genau ein Item
- keine Child-Agenten, Tasks, Workflows oder Provider-CLI-Spawns
- kein Wechsel auf andere Items
- deterministische Checks vor subjektiver Prüfung
- kein Reviewer im Standard
- höchstens ein Reviewer bei hohem Risiko oder ausdrücklicher Nutzeransage
- höchstens ein Follow-up mit genau einer belegten Lücke
- beim zweiten gleichen Fehler `BLOCKED`
- gemeinsame Dateien nur in einem späteren, eigenen Integrationsitem

## Queue-Zustände

`queued -> running -> verifying -> passed | blocked`

Es darf zu jedem Zeitpunkt höchstens einen Eintrag in `running` oder
`verifying` geben. Ein Nutzerkorrektur ersetzt die alte Entscheidung sofort;
betroffene Belege werden ungültig.

## Referenzablauf

```javascript
const results = []
for (const item of items) {
  setState(item, 'running')
  let artifact = await runLeafWorker(item)
  setState(item, 'verifying')
  let check = await controllerVerify(item, artifact)

  if (!check.pass && check.actionableGap && !check.repeatedFailure) {
    artifact = await followUpSameSession(item, check.actionableGap)
    check = await controllerVerify(item, artifact)
  }

  const status = check.pass ? 'passed' : 'blocked'
  setState(item, status)
  results.push({ item: item.id, status, artifact, check })
  if (status === 'blocked') break
}
```

`runLeafWorker` muss den vollständigen Seitenvertrag enthalten: Route, erlaubte
Pfade, aktive und verworfene Entscheidungen, Referenz, Desktop-/Mobil-Viewport,
Prüfbefehle und Stopbedingung.

## Controller-Prüfung

Der Controller übernimmt keinen Worker-Claim blind. Er prüft:

- Diff nur in erlaubten Pfaden
- Build, Typecheck, Lint und relevante Funktionstests
- betroffene Route tatsächlich erreichbar
- bei visueller Arbeit Desktop und Mobil mit richtigem Viewport
- Screenshot wurde geöffnet und zeigt den verlangten Zustand
- keine aktive Negativentscheidung verletzt
- Providerfehler, 401, 403, 408, 429 und 503 bleiben Fehler

Ein optionaler Reviewer liest das echte Artefakt und liefert genau eine größte
Lücke mit Beleg. Er editiert nicht. Ein fehlender Reviewer kann niemals als
Review-PASS gelten, ist aber bei einem Standardlauf ohne Reviewer auch kein
Fehler.

## PASS und BLOCKED

`PASS` braucht grüne vereinbarte Checks und gültige Artefaktbelege. Bei
subjektivem Look bleibt der Status `WAITING_HUMAN`, bis der Nutzer abnimmt.

`BLOCKED` entsteht bei zweimal gleichem Fehler, unklarer Quelle der Wahrheit,
Scope-Konflikt, erforderlichem Provider-Ausfall oder einer materiellen
Produktentscheidung. Der Controller startet dann nicht still die nächste Seite.
Er nennt genau den Blocker und den bisherigen Beleg.

Commit, Push, Deploy und Publish bleiben separate, ausdrückliche Freigaben.
