# Qualitätsschleife — Score-Loop in jedem Bau-Paket (04.09.2026)

**Kern in einem Satz:** Kein Artefakt erreicht Raphael, bevor eine fremde
Instanz es gegen eine Rubrik aus unserer besten Arbeit gemessen hat und die
Zahl über der Schwelle liegt; darunter geht es mit den Notizen an denselben
Builder zurück, bis zu drei Mal, dann Eskalation.

Slop ist ein Systemproblem. Ein Gefühl („klingt nach KI“) lässt sich nicht
fixen, eine Zahl schon. Deshalb ist die Schleife Teil des Pakets, nicht ein
Extra-Schritt am Ende.

Belege aus dem 30-Tage-Scan (04.09.2026): Plan-Execute-Verify-Replan
(arXiv 2603.11445: Score 0–1 je Teilfrage, Ergebnis-Erhalt über Retries,
konfigurierbare Stop-Bedingungen); PROCTOR (arXiv 2609.02246: elf Wege, wie
ein Judge-Signal kippt — Cache-Antworten, kaputte Ground Truth, stiller
Parser-Fallback; Fix war ein struktureller Anker, kein besseres Rubrik-Prosa);
Future AGI (Per-Dimension-Schwellen statt Aggregat: 0.85 gesamt versteckt 0.62
auf einer Achse); Agent Cookbooks agents-orchestrator (Retry-Cap 3, vierter
Fehlschlag eskaliert); Claude-Code-Docs Workflows (Loop im Script, nicht im
Kontext des Controllers).

## Die fünf Schritte je Paket

| # | Schritt | Wer | Beleg |
|---|---|---|---|
| 1 | Bauen | Builder-Leaf (`fable-builder` / `opus-builder` / `sol-builder` / `grok-worker`) | Dateien + Gate-Exit im StructuredOutput |
| 2 | G1 deterministisch | Befehl, ausgeführt von `luna-worker` (Mechanik, kein Urteil) mit Provenienz-Zeile | Exit-Code; rot = zurück an Builder ohne Judge |
| 3 | G2 Judge | Kritiker **anderer Familie**, frische Instanz, sieht nur Artefakt + Rubrik | Score je Dimension 0/1/2, Zitat als Beweis, VETO-Frage |
| 4 | Entscheiden | Script | `PASS` wenn jede Dimension ≥ Schwelle UND kein VETO-Riss; sonst Notizen an Builder |
| 5 | Wiederholen | derselbe Builder mit Notizen, frischer Kontext | max 3 Runden; dann `escalate` mit Belegen |

Raphael sieht nur Runde-PASS oder `escalate`. Zwischenstände stehen im
Journal, nicht im Chat.

## Rubrik aus unserer besten Arbeit

Die Rubrik ist keine Prosa („sieht es gut aus?“), sondern 3–6 Ja/Nein-Fragen,
abgeleitet aus dem, was bei uns nachweislich funktioniert hat:

- **Quelle:** `evals/rubrics/<domain>.md` des Repos (Web: `agentur-rubrik.md`,
  `qa-faecher.md`; Copy: `copywriting` G0/G1 + VOICE; Ads: Referenz-Anzeige
  v10). Fehlt die Rubrik, ist `rubric-author` (Skill `eval`) der erste
  Auftrag, mit 2–3 Golden-Beispielen aus `evals/golden/` als Maßstab.
- **Frage 1 ist immer `[VETO]`** und die harte Ship-Bedingung (0 verbotene
  Claims, Gate exit 0, Köpfe nie angeschnitten). Ein Riss dort = FAIL, egal
  wie die Summe steht.
- **Jede Frage nennt den Beweisort** („Zitat aus data/reviews.ts“, „Shot
  home-desktop-fold.jpg Region CTA“). Ohne Beleg zählt die Zahl nicht.
- **Per Dimension schwellen, nie aggregieren.** Schwelle je Frage ≥ 1 von 2,
  Gesamt ≥ 0.7, VETO = 2. Aggregat allein versteckt den einen Riss.
- **Anti-Beispiele mitgeben:** 1–2 Fälle aus `evals/anti/`, die hoch bewertet
  wurden und gefloppt sind. Das kalibriert den Judge härter als Prosa.

## Was den Judge ehrlich hält (aus PROCTOR)

1. **Externer Anker vor dem Judge.** G1 (Gate-Script, Lint, Test, Pixel-G1,
   `verify-*.mjs`) läuft immer zuerst und entscheidet allein über rot. Der
   Judge misst nur, was G1 schon bestanden hat.
2. **Der Judge sieht nie den Builder-Verlauf**, nur Artefakt, Rubrik,
   Golden/Anti-Beispiele und `ACTUAL_BUILDER_FAMILY`. Er benotet nie eine
   Zusammenfassung.
3. **Antwortform ist strukturell fixiert** (Schema: `scores[]`, `beleg[]`,
   `veto`, `verdict`, `notizen[]`). Keine Freitext-Begründung, kein „erkläre
   deinen Gedankengang“ (Regel 19).
4. **Reward-Hacking-Tore sind Judge-Fragen:** „Wurde ein Check gelöscht,
   aufgeweicht, übersprungen? Ist etwas versteckt (display:none, sr-only,
   aria-hidden), das das Gate täuscht?“ Ein Ja ist VETO.
5. **Notizen sind konkret und wenige.** Max 3 Punkte, jeder mit Datei:Zeile
   oder Shot+Region. Zehn Punkte lähmen den Builder (Gauntlet-Regel).
6. **Ergebnis-Erhalt.** Runde n+1 startet vom Stand n, nicht von null. Der
   Builder bekommt Diff-Stand + Notizen, nicht den ganzen Auftrag neu.

## Baustein für Workflow-Scripts

```javascript
const SCORE = {
  type: 'object', additionalProperties: false,
  properties: {
    scores: { type: 'array', items: { type: 'object', additionalProperties: false,
      properties: { frage: { type: 'string' }, punkte: { type: 'number' }, beleg: { type: 'string' } },
      required: ['frage', 'punkte', 'beleg'] } },
    veto_riss: { type: 'boolean' },
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    notizen: { type: 'array', maxItems: 3, items: { type: 'string' } },
  },
  required: ['scores', 'veto_riss', 'verdict', 'notizen'],
}

// Ein Paket durch die Schleife: bauen → G1 → Judge → ggf. zurück. Max 3 Runden.
async function mitSchleife(paket, opts) {
  // opts: { builderType, judgeType, rubrik, g1Cmd, label, phase, maxRunden = 3, schwelle = 0.7 }
  let notizen = []
  let stand = null
  for (let runde = 1; runde <= (opts.maxRunden || 3); runde++) {
    stand = await agent(`${paket.prompt}\nRUNDE ${runde}. ${notizen.length ? 'NOTIZEN DES JUDGES (jede beheben oder mit Beleg zurückweisen):\n- ' + notizen.join('\n- ') : ''}\nZeitbudget ${paket.minuten || 40} Minuten; 5 Minuten vor Ablauf StructuredOutput mit Stand.`,
      { label: `${opts.label}:bau:r${runde}`, phase: opts.phase, agentType: opts.builderType, effort: 'high', schema: RESULT })
    if (!stand) {
      // 429/Cooldown/Budget: genau ein Retry nach Pause, dann BLOCKED. Nie Folgephasen auf null starten.
      log(`${opts.label}: Builder ohne Rückgabe in Runde ${runde} (Provider/Budget) — ein Retry`)
      stand = await agent(`${paket.prompt}\nRUNDE ${runde} (RETRY nach Provider-Ausfall). Prüfe zuerst den Arbeitsbaum: was ist schon umgesetzt? Nur den Rest bauen.`,
        { label: `${opts.label}:bau:r${runde}:retry`, phase: opts.phase, agentType: opts.builderType, effort: 'high', schema: RESULT })
      if (!stand) return { status: 'BLOCKED', grund: 'Builder zweimal ohne Rückgabe (Provider/Budget)' }
    }
    // Selbstcheck des Builders ist Pflichtfeld: erwartet/geliefert in einem Satz (RESULT.selbstcheck).
    if (stand.selbstcheck && /nicht erreicht|abweich|FAIL|offen/i.test(stand.selbstcheck)) log(`${opts.label}: Builder meldet Abweichung: ${stand.selbstcheck.slice(0, 200)}`)
    // G1 ist ein Script-Schritt: der Builder meldet den Exit, ein Leaf mit Bash bestätigt ihn read-only.
    // G1 ist ein Befehl, kein Urteil: luna-worker (Masse/Mechanik) fuehrt ihn aus, nie der Judge.
    const g1 = await agent(`ACTUAL_BUILDER_FAMILY=${opts.builderFamily} (agentType ${opts.builderType}). Du bist ein Leaf-Worker, read-only Mechanik, kein Urteil. Führe genau aus: ${opts.g1Cmd}. Gib exit-Code und die letzten 30 Zeilen zurück. Nichts ändern, keine Subagenten.`,
      { label: `${opts.label}:g1:r${runde}`, phase: opts.phase, agentType: 'luna-worker', effort: 'low', schema: G1 })
    if (!g1) return { status: 'BLOCKED', klasse: 'PROVIDER', grund: 'G1-Leaf ohne Rückgabe', stand }
    if (g1.exit !== 0) {
      // Fehlerklasse fuer den Builder benennen: leerer Tail = EMPTY (Befehl/Pfad pruefen), sonst ERROR.
      const klasse = (g1.tail || '').trim() ? 'ERROR' : 'EMPTY'
      notizen = [`G1 ${klasse} (exit ${g1.exit}): ${(g1.tail || '(leere Ausgabe — Existenz-Check von Pfad/Befehl zuerst)').slice(0, 600)}`]
      log(`${opts.label}: Runde ${runde} G1 ${klasse} exit ${g1.exit}`)
      continue
    }
    const urteil = await agent(`ACTUAL_BUILDER_FAMILY=${opts.builderFamily} (agentType ${opts.builderType}, Workflow ${opts.label}, Failover nein)\nROLLE: Judge, frische Instanz, andere Familie als der Builder. Du siehst NUR Artefakt, Rubrik, Golden-/Anti-Beispiele. Kein Builder-Verlauf.\nRUBRIK:\n${opts.rubrik}\nARTEFAKT: ${paket.artefakt}\nJe Frage 0/1/2 mit wörtlichem Beleg; Frage 1 ist VETO (<2 = veto_riss). verdict PASS nur wenn keine Frage <1, Summe/Max ≥ ${opts.schwelle || 0.7} und kein VETO-Riss. notizen: max 3, je Datei:Zeile oder Shot+Region. Reward-Hacking-Prüfung: gelöschte/aufgeweichte Checks, versteckte Elemente = VETO.`,
      { label: `${opts.label}:judge:r${runde}`, phase: opts.phase, agentType: opts.judgeType, effort: 'high', schema: SCORE })
    if (!urteil) return { status: 'BLOCKED', klasse: 'PROVIDER', grund: 'Judge ohne Rückgabe (Provider)', stand }
    if (urteil.verdict === 'PASS') return { status: 'PASS', runden: runde, stand, urteil }
    notizen = urteil.notizen
    log(`${opts.label}: Runde ${runde} FAIL — ${notizen.join(' | ')}`)
  }
  // Drei Runden mit derselben Notiz = Aufgabe zu gross, nicht Builder zu dumm: Paket kleiner schneiden.
  return { status: 'ESCALATE', klasse: 'WRONG', grund: 'drei Runden ohne PASS — Paket kleiner schneiden oder anderer Builder', stand, notizen }
}
```

`RESULT` und `G1` (`{ exit: number, tail: string }`) stehen im Script wie in
`workflow-vorlage.md`. `RESULT` trägt seit 04.09.2026 das Pflichtfeld
`selbstcheck` (String: „erwartet X, geliefert Y, Beleg Z“) — der Builder
prüft sein Ergebnis gegen seine Erwartung, bevor der Judge es sieht.

**Fehlerklassen in der Schleife.** Jede Rückgabe `BLOCKED`/`ESCALATE` trägt
`klasse`: `PROVIDER` (Leaf ohne Rückgabe: einmal gleiche Route, dann Ersatz),
`ERROR`/`EMPTY` (G1 rot: Notiz nennt die Klasse, Builder liest zuerst den
Fehlertext bzw. macht den Existenz-Check), `WRONG` (drei Runden ohne PASS:
Paket kleiner schneiden, kein vierter Versuch). Der Controller loggt jede
Klasse nach dem Lauf mit `python3 /root/tools/fixlog.py add …` ins
Fix-Journal, damit die nächste Session den Fehler nicht neu löst. Judge-Familie ≠ Builder-Familie (`dispatch.md`).
Bei Fable-Build und totem Fremd-Gateway: `opus-critic` mit Label
`Instanz-Trennung, gleiche Familie`, im Journal sichtbar.


## Baustein: Kritik mit Fallback (Familie fällt zwischen Preflight und Kritik aus)

Preflight ist eine Momentaufnahme. Jede Kritik-Phase trägt den rollenkompatiblen
Fallback im Script, nicht nur in `dispatch.md` (04.09.2026: Grok-Auth 503 um 14:21,
Preflight um 13:55 war grün; 11 Leaves tot, Report ohne Re-Kritik).

```javascript
// visual-kritiker → grok-critic → opus-critic (Label Instanz-Trennung). Sweep: grok-worker → luna-worker.
async function kritikMitFallback(prompt, opts) {
  const kette = opts.kette || [
    { agentType: 'visual-kritiker', label: '' },
    { agentType: 'grok-critic', label: 'FALLBACK' },
    { agentType: 'opus-critic', label: 'FALLBACK Instanz-Trennung, gleiche Familie' },
  ]
  for (const k of kette) {
    const zusatz = k.label ? `\nLABEL: ${k.label} — vom Controller freigegeben, Provenienz-Gate nicht blockieren; nur Artefakte, nie Build-Verlauf.` : ''
    const r = await agent(prompt + zusatz, { ...opts, agentType: k.agentType, label: `${opts.label}:${k.agentType}${k.label ? ':FALLBACK' : ''}` })
    if (r) return { ...r, kritiker: k.agentType, fallback: !!k.label }
    log(`${opts.label}: ${k.agentType} ohne Rückgabe (Provider) → nächste Familie`)
  }
  return null
}
```

Das Ergebnis trägt `kritiker` und `fallback`; der Report nennt beides je Route.

## Domänen-Anker (welches G1, welche Rubrik)

| Domäne | G1 (deterministisch) | Rubrik-Quelle | Judge |
|---|---|---|---|
| Website-Route | `verify-*.mjs` des Repos, `detect.mjs`, `scan-ai-slop.mjs`, axe | `agentur-rubrik.md`, `qa-faecher.md`, PLAN §-Tabelle | `visual-kritiker` (Shot) + `sol-pruefer` (Text) |
| Copy | `forbidden-check.py` (G0), G1-Regeln | VOICE.md, `evals/golden/` | `opus-critic` (Sol-Copy) / `sol-pruefer` (Fable/Opus-Copy) |
| Code / Backend | Tests, tsc, oxlint | Repo-Rubrik, Ship-Gate | `sol-pruefer` / `grok-critic` |
| Bild / Static | `visual-g1.py` (Pixel) | Referenz-Anzeige, `fail-katalog.md` | `visual-kritiker` |
| Recherche / Brief | Quellen-Check (jede Zahl hat URL) | Brief-Rubrik | `opus-critic` |

## Stop-Bedingungen (fest, nicht verhandelbar im Leaf)

- PASS in Runde ≤ 3 → weiter.
- Runde 3 FAIL → `ESCALATE` an Raphael mit Scores je Runde und den letzten
  Notizen. Keine Runde 4, kein zweiter Builder derselben Familie.
- G1 zweimal hintereinander rot am selben Punkt → `ESCALATE` (Architektur,
  nicht Fix Nr. 3; Skill `debug`).
- Provider-Ausfall des Judge → `BLOCKED`, nie stiller PASS.
- Builder `null` (429, Cooldown, Wall-Clock) → genau ein Retry mit „prüfe erst den Arbeitsbaum“, dann `BLOCKED`. Folgephasen (Sweep, Kritik) starten nie auf `null` (04.09.2026: zehn Kritiker urteilten über einen unveränderten Build).
- Fix-Leaves ≤ 30 Minuten Budget; drei Claude-Sitze tragen Controller + zwei Fable-Leaves, nicht mehr.

## Fallen

- Rubrik als Prosa („ist es überzeugend?“) → Judge rät, Schleife dreht leer.
- Aggregat-Schwelle ohne Per-Dimension → ein Riss versteckt sich.
- Judge liest die Builder-Zusammenfassung → benotet eine Erzählung.
- Kein G1 vor dem Judge → der Judge wird zum einzigen Anker und ist gameable.
- Notizen als Wunschliste → Builder verzettelt sich, Runde 2 ist schlechter.
- Schleife im Controller-Kontext statt im Script → Kontext wächst, Cache platzt.
- G1-Kette mit Zustand aus der Vorrunde (mkdir auf existierende Datei, fester Tempname) → gesundes Paket eskaliert nach drei roten Runden (Beleg: wf_a8156636 token-check, 04.09.). G1 läuft in `mktemp -d`; bei zweimal identischem G1-Fehlertext ohne Builder-Diff die Kette prüfen, nicht Runde 3 starten.
