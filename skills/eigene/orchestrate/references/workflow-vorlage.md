# Workflow-Vorlage (orchestrate — Betriebsarten EINMAL und LOOP)

Jede Substanz-Runde baut ihr Script aus diesem Grundmuster. Anpassen, nicht
blind kopieren — aber die markierten Pflicht-Teile bleiben.

## Grundmuster (Kritik → Verify → Fix → Review)

```javascript
export const meta = {
  name: 'loop-runde-N',
  description: '<was diese Runde verbessert>',
  phases: [
    { title: 'Kritik', detail: 'Sol/Kimi/Luna plus Claude, adversarisch' },
    { title: 'Fix', detail: 'verifizierte Funde chirurgisch fixen' },
    { title: 'Review', detail: 'Sol-Substanz-Check + Gates' },
  ],
}

// PFLICHT: Args defensiv parsen (häufigster Crash)
const items = typeof args === 'string' ? JSON.parse(args) : (args || [])

const FUNDE = { type: 'object', additionalProperties: false, properties: {
  funde: { type: 'array', items: { type: 'object', additionalProperties: false,
    properties: { wo: {type:'string'}, problem: {type:'string'},
                  beleg: {type:'string'}, fix: {type:'string'},
                  schwere: {enum:['KRITISCH','WICHTIG','NICE']} },
    required: ['wo','problem','beleg','fix','schwere'] } },
}, required: ['funde'] }

phase('Kritik')
// PFLICHT: Cross-Vendor-Flotte per agentType. `model:` allein startet nur
// Claude-Workflowmodelle und zaehlt NICHT als Multi-Modell. Fable/Opus nur ueber
// agentType 'fable-architekt'/'opus-builder', nie als rohes model:'fable'.
const kritik = await parallel([
  () => agent(PROMPT_DESIGN, {label:'kritik:sol', phase:'Kritik',
    agentType:'sol-pruefer', schema:FUNDE}),
  () => agent(PROMPT_INHALT, {label:'kritik:kimi', phase:'Kritik',
    agentType:'kimi-recherche', schema:FUNDE}),
  () => agent(PROMPT_MECHANIK, {label:'kritik:luna', phase:'Kritik',
    agentType:'luna-worker', effort:'low', schema:FUNDE}),
  () => agent(PROMPT_INHALT, {label:'kritik:grok', phase:'Kritik',
    agentType:'grok-worker', schema:FUNDE}),
])
const alle = kritik.filter(Boolean).flatMap(k => k.funde)
  .filter(f => f.schwere !== 'NICE')          // NICE nur protokollieren

phase('Fix')
// Jeden Fund erst verifizieren, dann fixen — pipeline, keine Barriere
const fixes = await pipeline(alle,
  f => agent(`Verifiziere adversarisch, ob dieser Fund real ist (Read/Bash-Beleg,
    Default: widerlegt wenn unsicher): ${JSON.stringify(f)}. Gib {real, beleg} zurück.`,
    {label:`verify:${f.wo}`, phase:'Fix', agentType:'luna-worker', effort:'low',
     schema:{type:'object',additionalProperties:false,
             properties:{real:{type:'boolean'},beleg:{type:'string'}},required:['real','beleg']}}),
  async (v, f) => v && v.real
    ? agent(`Fixe chirurgisch: ${JSON.stringify(f)}. Nichts erfinden, nichts
        kürzen, keine Checks aufweichen. Gib {done, notes} zurück.`,
        {label:`fix:${f.wo}`, phase:'Fix', agentType:'luna-worker',
         schema:{type:'object',additionalProperties:false,
                 properties:{done:{type:'boolean'},notes:{type:'string'}},required:['done','notes']}})
    : { skipped: f }
)

phase('Review')
const review = await agent(`Substanz-Review nach den Fixes: git diff der
  betroffenen Pfade lesen. Wurde etwas gekürzt/erfunden/aufgeweicht?
  Gates laufen lassen: <GATES DER MISSION>. Gib {verdict, probleme} zurück.`,
  {label:'review:final', phase:'Review', agentType:'sol-pruefer'})

return { kritik_funde: alle.length, fixes, review }
```

## Varianten

- **Massen-Umbau über N Dateien** (je Datei ein Schreiber + Prüfer):
  `pipeline(dateien, schreib(luna-worker/kimi-worker/grok-worker),
  pruef(grok-worker/luna-worker), fixWennRot(luna-worker))` — Schreiber
  schreiben je EINE eigene Datei (kein Race). Danach Sol-Stichprobe (jede
  ~8. Datei voll lesen, git diff gegen Substanzverlust/Erfindung).
- **Vendoring-Runde:** je Repo ein Luna- oder Kimi-Agent (clone → Lizenz →
  Red-Flags → destillieren in bestehende Skill-References — nie
  Masseninstall), danach Grok-/Luna-Validate und Sol-Abnahme.
- **Streitfall:** llm-council-Muster — N Antworten parallel, anonymes
  Peer-Ranking („Antwort A/B/C", drei Fragen: stärkste? größter blinder Fleck?
  was übersahen ALLE?), Chairman-Synthese. Statt Nutzer-Rückfrage.

## Merkregeln

- `pipeline()` ist Default; `parallel()`-Barriere nur, wenn Stufe N wirklich
  ALLE Ergebnisse von N-1 zusammen braucht (Dedup, Früh-Abbruch).
- `meta` = pures Literal. Kein `Date.now()`, kein `Math.random()`.
- Vor jedem Workflow-Start: `python3
  /root/raphael-skills/skills/eigene/orchestrate/scripts/validate-workflow.py
  <script>` laufen lassen — prüft `meta`-Literal, Date.now/Math.random/new
  Date, Args-Falle, Slice-Falle und `model:'fable'`. Rot (FAIL) = nicht
  starten.
- Bei Fehlschlag: Script-Datei patchen und mit `resumeFromRunId` fortsetzen —
  fertige Agenten kommen aus dem Cache.
- Vor „Ergebnis ist leer"-Diagnosen: `journal.jsonl` im Transcript-Dir lesen.

## Slice-Falle (3x in der Praxis passiert — R13, R15)

Große Zwischenergebnisse NIE per `JSON.stringify(x).slice(0, N)` an
Folge-Agenten übergeben — der Slice kappt still Fälle, und der Folge-Agent
arbeitet unvollständig, ohne es zu merken. Stattdessen: Zwischenergebnis
als Datei ins Scratchpad schreiben (ein kleiner Haiku-Agent oder das
Cockpit) und dem Folge-Agenten den PFAD geben — er liest selbst per Read.
Faustregel: alles über ~8k Zeichen geht als Datei, nicht als Prompt-Text.
