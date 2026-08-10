# Loop-Primitive

Single source of truth für den Per-Item-Loop.

## Phase-1-Vertrag

Für jedes Item gilt:

- Ein `luna-worker` bearbeitet genau dieses eine Item und liefert ein produktionsreifes Artefakt.
- Der Worker arbeitet höchstens drei Runden und gibt nur Artefakt plus AAA-Beleg zurück.
- Kein Wechsel auf andere Items und keine Selbstabnahme.
- Bei visuellen oder visuellen Spezifikations-Outputs ruft der Workflow einen separaten `visual-critic` auf.
- Der Kritiker prüft das echte Artefakt, nicht die Begründung des Workers. Bei `fail` geht genau `biggest_gap` in die nächste Fix-Runde.

## Aufruf aus einem Workflow-Script

Der Workflow besitzt die Schleife und startet alle sichtbaren Agent-Aufrufe. Beispiel für ein visuelles Item:

```javascript
const MAX_ROUNDS = 3

function aaa(artifact, critic) {
  return artifact.g1_exit === 0
    && artifact.self_read === true
    && artifact.ship_manifest_valid === true
    && critic.verdict === 'pass'
    && critic.confidence === 'HIGH'
    && critic.biggest_gap === 'none'
}

async function loopItem(item) {
  let artifact = await agent(buildPrompt(item), {
    agentType: 'luna-worker', phase: 'Per-Item-Loop',
    label: `build:${item.id}:r1`, effort: 'max',
  })

  for (let round = 1; round <= MAX_ROUNDS; round += 1) {
    const critic = await agent(criticPrompt(item, artifact), {
      agentType: 'visual-critic', phase: 'Harsh-Critic',
      label: `critic:${item.id}:r${round}`, effort: 'max',
    })

    if (aaa(artifact, critic)) {
      return { status: 'PASS', item: item.id, round, artifact, critic }
    }
    if (round === MAX_ROUNDS) {
      return { status: 'BLOCKED', item: item.id, round, artifact, critic }
    }

    artifact = await agent(fixPrompt(item, artifact, critic.biggest_gap), {
      agentType: 'luna-worker', phase: 'Per-Item-Loop',
      label: `fix:${item.id}:r${round + 1}`, effort: 'max',
    })
  }
}

const results = await parallel(items.map(item => () => loopItem(item)))
```

`criticPrompt` enthält die echten Render-Pfade und Acceptance-Checks. Der Kritiker liefert ausschließlich:

```text
verdict: pass | fail
biggest_gap: <genau eine Lücke oder none>
beleg: <Datei/Region und sichtbarer Befund>
confidence: HIGH | MED | LOW
```

## AAA-Exit-Kriterien

`PASS` ist nur zulässig, wenn alle Bedingungen erfüllt sind:

- `visual-g1.py` beendet sich mit Exit `0` (`g1_exit: 0`).
- Jedes gerenderte PNG wurde selbst angesehen (`self_read: true`).
- `visual-ship.json` ist gültig, `ok: true` und enthält alle Seiten/Ansichten.
- Ein separater `agentType: 'visual-critic'` meldet `verdict: pass`, `confidence: HIGH` und `biggest_gap: none` mit Beleg.
- Ein Worker-Claim ohne diese Belege beendet den Loop nie.

## FAIL in Runde 3

Es gibt keine Runde 4. Das Item wird als `BLOCKED` markiert; letzter Stand, Kritiker-Output und `biggest_gap` bleiben als Beleg erhalten. Der Workflow darf nicht shippen und eskaliert das Item mit diesem Beleg an das Cockpit/Raphael.
