# Workflow-Vorlage für ultra-loop-Runden

Jede Substanz-Runde baut ihr Script aus diesem Grundmuster. Anpassen, nicht
blind kopieren — aber die markierten Pflicht-Teile bleiben.

## Grundmuster (Kritik → Verify → Fix → Review)

```javascript
export const meta = {
  name: 'loop-runde-N',
  description: '<was diese Runde verbessert>',
  phases: [
    { title: 'Kritik', detail: '3 Kritiker opus/sonnet/haiku, adversarisch' },
    { title: 'Fix', detail: 'verifizierte Funde chirurgisch fixen' },
    { title: 'Review', detail: 'Opus-Substanz-Check + Gates' },
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
// PFLICHT: Modell-Mix. opus = Urteil/Design, sonnet = Inhalt/Qualität,
// haiku = Mechanik/Pfade/Lint. NIE model:'fable'.
const kritik = await parallel([
  () => agent(PROMPT_DESIGN,  {label:'kritik:design',  phase:'Kritik', model:'opus',   schema: FUNDE}),
  () => agent(PROMPT_INHALT,  {label:'kritik:inhalt',  phase:'Kritik', model:'sonnet', schema: FUNDE}),
  () => agent(PROMPT_MECHANIK,{label:'kritik:mechanik',phase:'Kritik', model:'haiku',  effort:'low', schema: FUNDE}),
])
const alle = kritik.filter(Boolean).flatMap(k => k.funde)
  .filter(f => f.schwere !== 'NICE')          // NICE nur protokollieren

phase('Fix')
// Jeden Fund erst verifizieren, dann fixen — pipeline, keine Barriere
const fixes = await pipeline(alle,
  f => agent(`Verifiziere adversarisch, ob dieser Fund real ist (Read/Bash-Beleg,
    Default: widerlegt wenn unsicher): ${JSON.stringify(f)}. Gib {real, beleg} zurück.`,
    {label:`verify:${f.wo}`, phase:'Fix', model:'haiku', effort:'low',
     schema:{type:'object',additionalProperties:false,
             properties:{real:{type:'boolean'},beleg:{type:'string'}},required:['real','beleg']}}),
  async (v, f) => v && v.real
    ? agent(`Fixe chirurgisch: ${JSON.stringify(f)}. Nichts erfinden, nichts
        kürzen, keine Checks aufweichen. Gib {done, notes} zurück.`,
        {label:`fix:${f.wo}`, phase:'Fix', model:'sonnet',
         schema:{type:'object',additionalProperties:false,
                 properties:{done:{type:'boolean'},notes:{type:'string'}},required:['done','notes']}})
    : { skipped: f }
)

phase('Review')
const review = await agent(`Substanz-Review nach den Fixes: git diff der
  betroffenen Pfade lesen. Wurde etwas gekürzt/erfunden/aufgeweicht?
  Gates laufen lassen: <GATES DER MISSION>. Gib {verdict, probleme} zurück.`,
  {label:'review:final', phase:'Review', model:'opus'})

return { kritik_funde: alle.length, fixes, review }
```

## Varianten

- **Massen-Umbau über N Dateien** (je Datei ein Schreiber + Prüfer):
  `pipeline(dateien, schreib(sonnet), pruef(haiku), fixWennRot(sonnet))` —
  Schreiber schreiben je EINE eigene Datei (kein Race). Danach Opus-Stichprobe
  (jede ~8. Datei voll lesen, git diff gegen Substanzverlust/Erfindung).
- **Vendoring-Runde:** je Repo ein Sonnet-Agent (clone → Lizenz → Red-Flags
  → destillieren in bestehende Skill-References — nie Masseninstall), danach
  Haiku-Validate.
- **Streitfall:** llm-council-Muster — N Antworten parallel, anonymes
  Peer-Ranking („Antwort A/B/C", drei Fragen: stärkste? größter blinder Fleck?
  was übersahen ALLE?), Chairman-Synthese. Statt Nutzer-Rückfrage.

## Merkregeln

- `pipeline()` ist Default; `parallel()`-Barriere nur, wenn Stufe N wirklich
  ALLE Ergebnisse von N-1 zusammen braucht (Dedup, Früh-Abbruch).
- `meta` = pures Literal. Kein `Date.now()`, kein `Math.random()`.
- Vor jedem Workflow-Start: `python3
  /root/raphael-skills/skills/eigene/ultra-loop/scripts/validate-workflow.py
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
