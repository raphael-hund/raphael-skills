# Loop-Primitive

Single source of truth für den Per-Item-Loop.

## Phase-1-Vertrag

Für jedes Item gilt:

- Ein `luna-worker` bearbeitet genau dieses eine Item und liefert ein produktionsreifes Artefakt.
- Der initiale Build zählt nicht als Runde. Danach gibt es höchstens drei sichtbare Kritiker-Runden; eine vierte Runde ist verboten.
- Kein Wechsel auf andere Items und keine Selbstabnahme. Der Worker liefert ausschließlich Artefakt plus AAA-Beleg.
- Für jedes Item läuft ein separater, harter Kritiker. Bei visuellen oder visuellen Spezifikations-Outputs ist sein `agentType` zwingend `visual-kritiker`.
- Der Kritiker prüft das echte Artefakt gegen die Acceptance-Checks, nicht die Begründung des Workers. Er muss die größte konkrete Lücke benennen oder `none` liefern.
- Bei `fail` geht genau `biggest_gap` in die nächste Fix-Runde. Der Fix-Auftrag darf keine zweite Lücke eröffnen oder ein anderes Item anfassen.
- `PASS` ist ein Workflow-Entscheid: Ein Worker-Claim oder ein fehlender/ungültiger Kritiker-Output beendet den Loop nie.

## Aufruf aus einem Workflow-Script

Der Workflow besitzt die Schleife und startet alle sichtbaren Agent-Aufrufe. Beispiel für ein visuelles Item:

```javascript
const MAX_ROUNDS = 3

function validCritic(critic) {
  return critic && typeof critic === 'object'
    && (critic.verdict === 'pass' || critic.verdict === 'fail')
    && typeof critic.biggest_gap === 'string'
    && critic.biggest_gap.trim() !== ''
    && typeof critic.beleg === 'string'
    && critic.beleg.trim() !== ''
    && ['HIGH', 'MED', 'LOW'].includes(critic.confidence)
}

function artifactAAA(item, artifact) {
  if (!artifact || artifact.aaa !== true) return false
  if (!item.is_visual) {
    return typeof artifact.acceptance_proof === 'string'
      && artifact.acceptance_proof.trim() !== ''
  }
  return artifact.g1_exit === 0
    && artifact.self_read === true
    && artifact.ship_manifest_valid === true
}

function aaa(item, artifact, critic) {
  return artifactAAA(item, artifact)
    && validCritic(critic)
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
    // Non-visual items use the separately defined ship-review critic; visual
    // items must use the dedicated image-reading critic.
    const criticType = item.is_visual ? 'visual-kritiker' : 'sol-pruefer'
    const critic = await agent(criticPrompt(item, artifact, [
      'Prüfe ausschließlich das echte Artefakt gegen die Acceptance-Checks.',
      'Akzeptiere keine Behauptung ohne Beleg.',
      'Nenne bei fail genau eine größte konkrete Lücke; bei pass exakt biggest_gap: none.',
    ]), {
      agentType: criticType, phase: 'Harsh-Critic',
      label: `critic:${item.id}:r${round}`, effort: 'max',
    })

    if (aaa(item, artifact, critic)) {
      return { status: 'PASS', item: item.id, round, artifact, critic }
    }
    if (round === MAX_ROUNDS) {
      return { status: 'BLOCKED', item: item.id, round, artifact, critic }
    }
    if (!validCritic(critic) || critic.biggest_gap === 'none') {
      return { status: 'BLOCKED', item: item.id, round, artifact, critic,
        reason: 'invalid critic output or no actionable gap' }
    }

    artifact = await agent(fixPrompt(item, artifact, critic.biggest_gap), {
      agentType: 'luna-worker', phase: 'Per-Item-Loop',
      label: `fix:${item.id}:r${round + 1}`, effort: 'max',
    })
  }
  throw new Error('unreachable: MAX_ROUNDS guard')
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

- Das Artefakt enthält `aaa: true`; ein Worker-Claim allein reicht nie.
- Bei visuellen Items: `visual-g1.py` beendet sich mit Exit `0` (`g1_exit: 0`), jedes gerenderte PNG wurde selbst angesehen (`self_read: true`), und `visual-ship.json` ist gültig, `ok: true` und enthält alle Seiten/Ansichten.
- Bei nichtvisuellen Items: Das Artefakt liefert `acceptance_proof` als nichtleeren, item-spezifischen Beleg; der harte Kritiker prüft ihn am echten Artefakt.
- Ein separater Kritiker meldet `verdict: pass`, `confidence: HIGH` und `biggest_gap: none` mit Beleg. Bei visuellen Items ist sein `agentType` zwingend `visual-kritiker`.
- Ein fehlender, ungültiger oder nicht ausreichend belegter Kritiker-Output beendet den Loop nie mit `PASS`.

## FAIL in Runde 3

Es gibt keine Runde 4. Das Item wird als `BLOCKED` markiert; letzter Stand, Kritiker-Output und `biggest_gap` bleiben als Beleg erhalten. Der Workflow darf nicht shippen und eskaliert das Item mit diesem Beleg an das Cockpit/Raphael.
