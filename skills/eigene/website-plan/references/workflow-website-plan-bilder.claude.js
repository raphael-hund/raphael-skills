/**
 * website-plan Bilder-Erstellen (optional). VERSION 1.0.0 — Tempo 5c51f3a5
 * Erzeugt ERSTELLEN-Lücken aus 02b-asset-gaps via Higgsfield (oder anderes CLI).
 * TEMPO: 1 Bild pro Agent, max 5 parallel — nie 5 sequentiell in einem Agent.
 */
export const meta = {
  name: 'website-plan-bilder-erstellen',
  description: 'ERSTELLEN-Bilder aus Gaps erzeugen, prüfen, indexieren (parallel, 1 Bild/Agent)',
  phases: [
    { title: 'Briefs', detail: 'Generierungs-Briefs' },
    { title: 'Generieren', detail: '1 Agent pro Bild, max 5 parallel' },
    { title: 'Kritik', detail: 'Visueller Check' },
    { title: 'Retry', detail: 'Nur Fails, 1 Runde' },
    { title: 'Index', detail: '02c-bilder-generiert.md' },
  ],
}

const OUT = '/*MISS:OUT*/'
const IMGDIR = '/*MISS:IMGDIR*/' // default: OUT + '/02c-bilder-generiert'
const TOOL = '/*MISS:TOOL*/' // z.B. higgsfield generate create gpt_image_2 ...
const RULES = '/*MISS:RULES*/' // CI/Invariants Kurzregeln
const KEYS = '/*MISS:KEYS*/' // JSON-Array der Bild-Keys aus 02b, z.B. ["stadt-taucha",...]

if (OUT.includes('MISS:') || KEYS.includes('MISS:')) {
  throw new Error('OUT und KEYS (JSON-Array) setzen')
}

const imgDir = IMGDIR.includes('MISS:') ? (OUT + '/02c-bilder-generiert') : IMGDIR
const keys = JSON.parse(KEYS)

const BRIEFS = {
  type: 'object', required: ['briefs'],
  properties: {
    briefs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['key', 'filename', 'prompt', 'aspect_ratio', 'alt_de'],
        properties: {
          key: { type: 'string' }, filename: { type: 'string' },
          prompt: { type: 'string' }, aspect_ratio: { type: 'string' },
          refs: { type: 'array', items: { type: 'string' } },
          alt_de: { type: 'string' }, slot: { type: 'string' },
        },
      },
    },
  },
}
const GEN = {
  type: 'object', required: ['key', 'file', 'ok'],
  properties: {
    key: { type: 'string' }, file: { type: 'string' },
    ok: { type: 'boolean' }, note: { type: 'string' },
  },
}
const CRIT = {
  type: 'object', required: ['verdicts'],
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object', required: ['key', 'pass', 'problem'],
        properties: {
          key: { type: 'string' }, pass: { type: 'boolean' },
          problem: { type: 'string' }, fix_hint: { type: 'string' },
        },
      },
    },
  },
}

phase('Briefs')
const briefResult = await agent(`Baue Bild-Briefs für Keys: ${JSON.stringify(keys)}.
Lies ${OUT}/02b-asset-gaps.md und ${OUT}/02-asset-inventar.md.
${RULES}
Pro Key: filename, EN-prompt (no text/logos/faces), aspect_ratio, 0–3 absolute refs, alt_de, slot.
mkdir -p ${imgDir}; schreibe ${imgDir}/BRIEFS.md.
Ein Pass, dann Schema-Return.`, {
  label: 'briefs', phase: 'Briefs', agentType: 'luna-worker', schema: BRIEFS, stallMs: 0,
})
const briefs = briefResult.briefs
log('briefs: ' + briefs.map(b => b.key).join(', '))

const GEN_HOWTO = `WERKZEUG: ${TOOL}
1) Generate mit Wait ≤5m (nicht 10m). 2) Ergebnis-URL curl nach ${imgDir}/<filename>.
3) file-Check >100KB. 4) Read einmal. 5) ok=true nur bei echtem Bild.
GENAU DIESES EINE Bild — keine Warteschlangen, keine weiteren Keys.`

// Chunk into waves of 5 (RAM/API)
function chunks(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

phase('Generieren')
let results = []
for (const wave of chunks(briefs, 5)) {
  const waveOut = await parallel(wave.map((b) => () =>
    agent(`Du erzeugst GENAU 1 Bild. Key=${b.key}.
${RULES}
${GEN_HOWTO}
Brief: ${JSON.stringify(b)}
Return key/file/ok/note.`, {
      label: 'gen-' + b.key, phase: 'Generieren',
      agentType: 'luna-worker', schema: GEN, stallMs: 0,
    })
  ))
  results = results.concat(waveOut.filter(Boolean))
  log('wave done: ' + wave.map(b => b.key).join(','))
}

phase('Kritik')
const crit = await agent(`Harter visueller Kritiker. Read jedes Bild in ${imgDir}/.
Briefs: ${JSON.stringify(briefs.map(b => ({ key: b.key, filename: b.filename, slot: b.slot })))}
FAIL bei Text/Logo/Gesicht/Motiv-Fail/kaputter Datei. Default=fail.
Pro Key: pass, problem, fix_hint.`, {
  label: 'kritik', phase: 'Kritik', agentType: 'visual-kritiker', schema: CRIT, stallMs: 0,
})
const fails = (crit && crit.verdicts || []).filter(v => !v.pass)
log('fails: ' + fails.length)

if (fails.length) {
  phase('Retry')
  const failBriefs = fails.map(f => {
    const b = briefs.find(x => x.key === f.key)
    if (!b) return null
    return {
      ...b,
      filename: b.filename.replace(/(\.\w+)$/, '-v2$1'),
      prompt: b.prompt + ' — FIX: ' + (f.fix_hint || f.problem),
    }
  }).filter(Boolean)
  for (const wave of chunks(failBriefs, 5)) {
    await parallel(wave.map((b) => () =>
      agent(`Retry GENAU 1 Bild. ${GEN_HOWTO}\n${RULES}\nBrief: ${JSON.stringify(b)}`, {
        label: 'retry-' + b.key, phase: 'Retry',
        agentType: 'luna-worker', schema: GEN, stallMs: 0,
      })
    ))
  }
}

phase('Index')
await agent(`Schreibe ${OUT}/02c-bilder-generiert.md (ls ${imgDir}): Pfad, Alt, Slot, Status.
Update ${OUT}/02b-asset-gaps.md Verweis. Kein Fake-Status.`, {
  label: 'index', phase: 'Index', agentType: 'luna-worker', schema: {
    type: 'object', required: ['summary'],
    properties: { summary: { type: 'string' }, ok_count: { type: 'number' } },
  }, stallMs: 0,
})

return { status: 'DONE', bilder_dir: imgDir, fails: fails.map(f => f.key) }
