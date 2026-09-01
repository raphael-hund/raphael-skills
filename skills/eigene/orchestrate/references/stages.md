# Stages — auflistbare Task-Queue mit festen Gates

Eine Mission wird als **eingefrorene, auflistbare Task-Liste** geführt: `id`,
`stage`, `owner`, `depends_on`, `gate`, `status`. Der Controller listet sie vor
Start einmal, friert sie ein und arbeitet sie strikt in der Stage-Reihenfolge ab.

## Die fünf Stages (in dieser Reihenfolge)

| Stage | Name | Inhalt | Beendet wenn |
|---|---|---|---|
| 1 | Planen | Scope, Negativentscheidungen, Task-Liste erzeugen | Liste eingefroren, jedes Task hat Gate |
| 2 | Zuteilen | Tasks validieren, `depends_on` ordnen, `agentType` je Task | Jeder Owner bekannt, Verify-Familie ≠ Owner-Familie |
| 3 | Steps ausführen | Jeden Plan-Step in Abhängigkeitsreihenfolge | Jeder Step hat Ergebnis + Beleg |
| 4 | Verify | Jeden Step unabhängig gegen sein Gate | Jeder Step PASS oder BLOCKED mit Beleg |
| 5 | Review | Gesamte Runde prüfen | Reviewer-Urteil + Familienabdeckung belegt |

Compound-Engineering-Mapping: Research (last30days/research) läuft VOR Stage 1
und speist Stage 1; ce-plan ≙ Stage 1–2; ce-work ≙ Stage 3–4; ce-code-review /
ce-compound ≙ Stage 5.

## Task-Format

```
- id:         <eindeutig, z. B. T1>
  stage:      1..5
  owner:      <agentType, z. B. luna-worker | opus-builder | sol-pruefer>
  depends_on: [<Task-IDs, leer bei Stage 1/2>]
  gate:       <ausführbarer Prüfbefehl oder benanntes eval-Gate>
  status:     pending | running | pass | blocked | failed
```

Regeln: `stage` nur aus den fünf Werten; `depends_on` zeigt nur auf frühere
Tasks; `gate` ist immer ausführbar (Shell-Befehl, Testlauf, Screenshot-Vergleich)
— keine reine Prosa-Abnahme; `status` schreibt nur der Controller.

## Auflisten und Eintragen

Der Controller meldet zu Rundenbeginn und bei jedem Statuswechsel die Queue
kompakt, z. B.:

```
STAGES T1..T4
  T1 [pass]    stage=3 owner=luna-worker   gate=pytest -q
  T2 [running] stage=3 owner=opus-builder  depends=T1
  T3 [pending] stage=4 owner=sol-pruefer   depends=T2
  T4 [pending] stage=5 owner=sol-pruefer   depends=T3
```

Ein Task wechselt nur `pending → running → pass|blocked|failed`. Ein `failed`
bei rotem Gate löst keine Ersatzwelle aus, sondern genau ein Follow-up an
denselben Owner; danach `blocked` mit Beleg. Der volle Stand landet im
Runden-Protokoll (`references/runden-protokoll.md`) als Plan-Step-Map.

## Failover-Routing (Gateway-gekoppelt)

Fremdmodelle laufen über das Failover-Gateway (Port 8317/8318), nicht als rohe
Modell-Overrides. Der Router kennt die Familien je `agentType`:

| agentType | Familie | Primär | Ersatz (andere Familie) |
|---|---|---|---|
| `luna-worker` | GPT | gpt-5.6-luna | kimi-worker oder opus-builder |
| `terra-bulk` | GPT | gpt-5.6-terra | opus-builder |
| `sol-pruefer` | GPT | gpt-5.6-sol | opus-builder + kimi-recherche (Panel; wie Degraded-Pfad in cross-model-harness.md) |
| `kimi-worker` / `kimi-recherche` | Kimi | kimi-k3 | luna-worker (Mechanik) / opus-builder |
| `grok-worker` | Grok | xai/grok-4.6 | luna-worker |
| `opus-builder` | Claude | opus[1m] | — (Claude bleibt Claude) |

Routing-Regeln:

1. Ein leeres oder fehlerhaftes Ergebnis (`null`, Timeout, 429) ist ein
   **Routenausfall** — der Controller protokolliert ihn mit Beleg und setzt den
   Ersatz aus einer ANDEREN Familie ein. Kein stiller Provider-Wechsel.
2. Verify-Owner und Step-Owner kommen aus unterschiedlichen Familien; der
   Ersatz-Verifier muss ebenfalls familienfremd zu beiden sein.
3. Quota-Fehler = weiterlaufen, das Gateway rotiert die Seats; ein sichtbarer
   Nicht-Fallback ist ein Vorfall und wird gemeldet.
4. Modell-Verbote werden nicht hier gepflegt — sie stehen einmal in den
   Rot-Linien von SKILL.md (Sonnet/Haiku nie, Opus nur `opus-builder`, Fable
   nur `fable-advisor`) und gelten hier unverändert.
5. Jeder Routenausfall und jeder Ersatz steht im Runden-Protokoll unter
   „Routenausfälle/Ersatz".
