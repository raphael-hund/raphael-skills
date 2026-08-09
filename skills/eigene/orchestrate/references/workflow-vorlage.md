# Workflow-Vorlage (orchestrate — EINMAL und LOOP)

Jede Substanz-Runde folgt: **Planen → Zuteilen → Steps ausführen → Verify →
Review**. Ein Synthese-Subagent erzeugt den Missionsplan; diese Vorlage liefert
nur Schema, Gates und Ausführungsmechanik.

## Grundmuster

```javascript
export const meta = {
  name: 'loop-runde-N',
  description: '<was diese Runde verbessert>',
  phases: [
    { title: 'Planen', detail: 'Acht Perspektiven und eine Plan-Synthese' },
    { title: 'Zuteilen', detail: 'Plan validieren und abhängige Steps ordnen' },
    { title: 'Steps ausführen', detail: 'Jeden Plan-Step sequentiell ausführen' },
    { title: 'Verify', detail: 'Jeden Step unabhängig gegen sein Gate prüfen' },
    { title: 'Review', detail: 'Sol und Kimi prüfen die gesamte Runde' },
  ],
}

let rawArgs = {}
try {
  rawArgs = typeof args === 'string' ? JSON.parse(args) : (args || {})
} catch {
  rawArgs = {}
}
const input = rawArgs && typeof rawArgs === 'object' && !Array.isArray(rawArgs) ? rawArgs : {}
if (Object.keys(input).length < 1) throw new Error('Autoritative Mission fehlt in args')
const MAX_WAVE = 6
const AGENT_TYPES = [
  'kimi-worker', 'grok-worker', 'sol-pruefer', 'terra-bulk',
  'luna-worker', 'opus-builder', 'sonnet-worker', 'haiku-worker',
]
const FAMILY = {
  'kimi-worker': 'Kimi', 'grok-worker': 'Grok', 'sol-pruefer': 'Sol',
  'terra-bulk': 'Terra', 'luna-worker': 'Luna', 'opus-builder': 'Opus',
  'sonnet-worker': 'Sonnet', 'haiku-worker': 'Haiku',
}
const PROVIDER_FAMILY = {
  'kimi-worker': 'Kimi', 'grok-worker': 'Grok',
  'sol-pruefer': 'GPT', 'terra-bulk': 'GPT', 'luna-worker': 'GPT',
  'opus-builder': 'Claude', 'sonnet-worker': 'Claude', 'haiku-worker': 'Claude',
}
const LEAD_TYPES = ['opus-builder', 'sonnet-worker']
const CONTRACT = [
  'agentType: explizit und nicht geerbt',
  'ROLLE: genau eine Plan-, Ausführungs- oder Prüfrolle',
  'HARNESS: verwendetes Harness',
  'AUFGABE: ein abgegrenztes Paket mit einem Ergebnis',
  'INPUT: nur der relevante Task-Ausschnitt (TB2)',
  'OUTPUT: strukturiertes Ergebnis nach Schema',
  'GATE: exakter Prüfweg und eingefügter Beleg',
  'TRUST: Ergebnis bleibt untrusted bis zur unabhängigen Prüfung',
  'write_set: bei parallelen Schreibern disjunkt',
  'Kein Reward-Hacking, keine gelöschten oder aufgeweichten Checks',
].join('\n')
const PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { steps: { type: 'array', minItems: 1, items: {
    type: 'object', additionalProperties: false,
    properties: {
      id: { type: 'string', minLength: 1 }, ziel: { type: 'string', minLength: 1 },
      depends_on: { type: 'array', items: { type: 'string', minLength: 1 } },
      agent_types: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
      nested: { type: 'boolean' }, lead_agent_type: { type: 'string' },
      child_agent_types: { type: 'array', items: { type: 'string', minLength: 1 } },
      verify_agent_type: { type: 'string', minLength: 1 }, gate: { type: 'string', minLength: 1 },
    },
    required: ['id', 'ziel', 'depends_on', 'agent_types', 'nested',
      'lead_agent_type', 'child_agent_types', 'verify_agent_type', 'gate'],
  } } },
  required: ['steps'],
}
const PANEL_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    role: { type: 'string', minLength: 1 },
    proposals: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
  },
  required: ['role', 'proposals'],
}
const STEP_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    result: { type: 'string', minLength: 1 }, beleg: { type: 'string', minLength: 1 },
    nested_delegations: { type: 'array', items: { type: 'object', additionalProperties: false,
      properties: {
        child_agent_type: { type: 'string', minLength: 1 },
        child_agent_id: { type: 'string', minLength: 1 },
        wave: { type: 'integer', minimum: 1 },
        child_task: { type: 'string', minLength: 1 },
        child_result: { type: 'string', minLength: 1 },
        beleg: { type: 'string', minLength: 1 },
      }, required: ['child_agent_type', 'child_agent_id', 'wave', 'child_task', 'child_result', 'beleg'],
    } },
  },
  required: ['result', 'beleg', 'nested_delegations'],
}
const LEAD_PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    result: { type: 'string', minLength: 1 }, beleg: { type: 'string', minLength: 1 },
    child_tasks: { type: 'array', minItems: 1, items: { type: 'object', additionalProperties: false,
      properties: {
        child_task_id: { type: 'string', minLength: 1 },
        child_agent_type: { type: 'string', minLength: 1 },
        child_task: { type: 'string', minLength: 1 },
        write_set: { type: 'array', items: { type: 'string', minLength: 1 } },
      }, required: ['child_task_id', 'child_agent_type', 'child_task', 'write_set'],
    } },
  },
  required: ['result', 'beleg', 'child_tasks'],
}
const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { verdict: { enum: ['PASS', 'FAIL'] }, beleg: { type: 'string', minLength: 1 } },
  required: ['verdict', 'beleg'],
}
const REVIEW_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    verdict: { enum: ['PASS', 'FAIL', 'BLOCKED'] }, beleg: { type: 'string', minLength: 1 },
    offene_luecken: { type: 'array', items: { type: 'string', minLength: 1 } },
  },
  required: ['verdict', 'beleg', 'offene_luecken'],
}
function promptFor(step, dependencies, role, task) {
  return [CONTRACT, `AUTORITATIVE MISSION: ${JSON.stringify(input)}`,
    `KONKRETER STEP: ${JSON.stringify(step)}`,
    `BISHERIGE ABHÄNGIGKEITSERGEBNISSE: ${JSON.stringify(dependencies)}`,
    `ROLLE: ${role}`, `AUFGABE: ${task}`].join('\n')
}
const attempts = []
function replacementCandidate(type, allowedTypes) {
  return allowedTypes.find(candidate => candidate !== type && FAMILY[candidate] !== FAMILY[type]) || null
}
async function callAgent(agentType, prompt, options) {
  const { step_id, replacement_types = AGENT_TYPES, ...agentOptions } = options
  async function invoke(type, label) {
    const result = { agent_type: type, family: FAMILY[type], provider_family: PROVIDER_FAMILY[type],
      phase: agentOptions.phase, step_id: step_id || null, output: null, error: null }
    try {
      result.output = (await agent(prompt, { ...agentOptions, label, agentType: type })) || null
      if (result.output === null) result.error = 'Agent returned null'
    } catch (error) { result.error = String(error) }
    return result
  }
  const attempt = await invoke(agentType, agentOptions.label)
  attempts.push(attempt)
  if (attempt.output !== null) return attempt
  const replacementType = replacementCandidate(agentType, replacement_types)
  if (!replacementType) throw new Error(`Route ohne zulässigen Ersatz: ${agentType}`)
  const replacement = await invoke(replacementType, `${agentOptions.label}:replacement`)
  attempt.replacement_agent_type = replacement.agent_type
  attempt.replacement_result = replacement
  attempts.push(replacement)
  if (replacement.output === null) throw new Error(`Primary und Ersatz fehlgeschlagen: ${agentType} → ${replacement.agent_type}`)
  return replacement
}
function currentRouteFailures() {
  return attempts.filter(attempt => attempt.output === null).map(attempt => ({
    agent_type: attempt.agent_type, family: attempt.family,
    provider_family: attempt.provider_family, phase: attempt.phase, step_id: attempt.step_id,
    evidence: attempt.error || 'Agent returned null',
    replacement_agent_type: attempt.replacement_agent_type || null,
    replacement_result: attempt.replacement_result || null,
  }))
}
async function runInWaves(tasks) {
  const results = []
  for (let start = 0; start < tasks.length; start += MAX_WAVE) {
    const wave = []
    for (let index = start; index < tasks.length && index < start + MAX_WAVE; index += 1) wave.push(tasks[index])
    const outputs = await parallel(wave.map(task => () => task.run()))
    results.push(...(outputs || []).filter(Boolean))
  }
  return results
}
function assertKnown(type, where) {
  if (!AGENT_TYPES.includes(type)) throw new Error(`Unbekannter AgentType in ${where}: ${type}`)
}
function validatePlan(plan) {
  if (!plan || !Array.isArray(plan.steps) || plan.steps.length < 1) throw new Error('PLAN_SCHEMA: kein Step')
  const seen = new Set()
  const covered = new Set()
  for (const step of plan.steps) {
    if (!step.id || !step.ziel || !Array.isArray(step.depends_on) || !Array.isArray(step.agent_types)
      || step.agent_types.length < 1 || typeof step.nested !== 'boolean'
      || !Array.isArray(step.child_agent_types) || !step.gate) throw new Error(`Ungültiger PLAN-Step: ${JSON.stringify(step)}`)
    if (seen.has(step.id)) throw new Error(`Doppelte Step-ID: ${step.id}`)
    for (const dependency of step.depends_on) if (!seen.has(dependency)) throw new Error(`Nicht-frühere Abhängigkeit: ${dependency}`)
    for (const type of step.agent_types) { assertKnown(type, `${step.id}.agent_types`); covered.add(type) }
    assertKnown(step.verify_agent_type, `${step.id}.verify_agent_type`); covered.add(step.verify_agent_type)
    if (step.nested) {
      if (!LEAD_TYPES.includes(step.lead_agent_type) || step.agent_types.length !== 1
        || step.agent_types[0] !== step.lead_agent_type) throw new Error(`Ungültiger Lead/Owner: ${step.id}`)
      if (step.child_agent_types.length < 1) throw new Error(`Nested-Step ohne Child: ${step.id}`)
      for (const type of step.child_agent_types) { assertKnown(type, `${step.id}.child_agent_types`); covered.add(type) }
      covered.add(step.lead_agent_type)
    } else if (step.lead_agent_type !== '' || step.child_agent_types.length > 0) throw new Error(`Lead/Child bei nicht-nested Step: ${step.id}`)
    const ownerTypes = step.nested ? [step.lead_agent_type, ...step.child_agent_types] : step.agent_types
    if (ownerTypes.some(type => PROVIDER_FAMILY[type] === PROVIDER_FAMILY[step.verify_agent_type])) {
      throw new Error(`Verify-Providerfamilie ist Owner-/Lead-/Child-Familie: ${step.id}`)
    }
    seen.add(step.id)
  }
  for (const type of AGENT_TYPES) if (!covered.has(type)) throw new Error(`AgentType fehlt im PLAN: ${type}`)
}
function validateChildPlan(step, leadPlan) {
  if (!leadPlan.output || !leadPlan.output.result.trim() || !leadPlan.output.beleg.trim()
    || !Array.isArray(leadPlan.output.child_tasks)
    || leadPlan.output.child_tasks.length !== step.child_agent_types.length) {
    throw new Error(`Child-Plan-Gate rot: ${step.id}`)
  }
  const plannedCounts = new Map()
  for (const type of step.child_agent_types) plannedCounts.set(type, (plannedCounts.get(type) || 0) + 1)
  const actualCounts = new Map()
  const childTaskIds = new Set()
  const writePaths = new Set()
  for (const child of leadPlan.output.child_tasks) {
    assertKnown(child.child_agent_type, `${step.id}.child_tasks`)
    if (!plannedCounts.has(child.child_agent_type) || !child.child_task_id.trim()
      || childTaskIds.has(child.child_task_id) || !child.child_task.trim()
      || !Array.isArray(child.write_set)) throw new Error(`Child-Plan ungültig: ${step.id}`)
    childTaskIds.add(child.child_task_id)
    actualCounts.set(child.child_agent_type, (actualCounts.get(child.child_agent_type) || 0) + 1)
    for (const path of child.write_set) {
      if (!path.trim() || writePaths.has(path)) throw new Error(`Child-write_set überlappt: ${step.id}/${path}`)
      writePaths.add(path)
    }
  }
  for (const [type, count] of plannedCounts) {
    if (actualCounts.get(type) !== count) throw new Error(`Child-Plan-Anzahl falsch: ${step.id}/${type}`)
  }
  return leadPlan.output.child_tasks
}
function validateNestedDelegations(step, leadPlan, lead, nested) {
  if (!lead.output || !lead.output.result.trim() || !lead.output.beleg.trim()
    || nested.length !== step.child_agent_types.length) throw new Error(`Nested-Gate rot: ${step.id}`)
  const childTaskIds = new Set(leadPlan.output.child_tasks.map(child => child.child_task_id))
  const childCallIds = new Set()
  const waveCounts = new Map()
  for (let index = 0; index < nested.length; index += 1) {
    const item = nested[index]
    const expectedWave = Math.floor(index / MAX_WAVE) + 1
    if (!childTaskIds.has(item.child_task_id) || !item.child_call_id.trim()
      || childCallIds.has(item.child_call_id) || item.wave !== expectedWave
      || !item.child_task.trim() || !item.child_result.trim() || !item.beleg.trim()
      || !item.call || !attempts.includes(item.call) || item.call.output === null
      || item.call.step_id !== step.id || item.child_agent_type !== item.call.agent_type
      || item.child_result !== item.call.output.result || item.beleg !== item.call.output.beleg
      || PROVIDER_FAMILY[item.child_agent_type] === PROVIDER_FAMILY[step.verify_agent_type]) {
      throw new Error(`Nested-Runtime-Beleg ungültig: ${step.id}`)
    }
    childCallIds.add(item.child_call_id)
    waveCounts.set(item.wave, (waveCounts.get(item.wave) || 0) + 1)
  }
  for (const count of waveCounts.values()) if (count > MAX_WAVE) throw new Error(`Child-Welle > ${MAX_WAVE}: ${step.id}`)
}

phase('Planen')
const panelStep = { id: 'plan-panel', ziel: 'Plan-Beitrag für die Mission', depends_on: [], agent_types: AGENT_TYPES,
  nested: false, lead_agent_type: '', child_agent_types: [], verify_agent_type: 'sol-pruefer', gate: 'Vorschlag enthält Schritte und Gates' }
const panel = await runInWaves(AGENT_TYPES.map(agentType => ({ run: () => callAgent(
  agentType, promptFor(panelStep, [], 'Plan-Panel', `Liefere als ${agentType} eine Plan-Perspektive für: ${JSON.stringify(input)}`),
  { label: `plan-panel:${agentType}`, phase: 'Planen', step_id: panelStep.id, schema: PANEL_SCHEMA },
) })))
const synthesisStep = { id: 'plan-synthesis', ziel: 'Echten Missionsplan synthetisieren', depends_on: ['plan-panel'],
  agent_types: ['opus-builder'], nested: false, lead_agent_type: '', child_agent_types: [], verify_agent_type: 'sol-pruefer', gate: 'PLAN_SCHEMA und Familienabdeckung erfüllt' }
const synthesisPrompt = promptFor(synthesisStep, panel, 'Plan-Synthese',
  `Erzeuge ausschließlich einen PLAN nach PLAN_SCHEMA für die autoritative Mission. Jeder Step braucht alle Felder. Verwende nur bekannte Typen, ordne Abhängigkeiten sequentiell, decke alle acht AgentTypes über agent_types, Lead, Children oder Verify ab. Owner/Lead/Children und Verify eines Steps müssen aus unterschiedlichen Providerfamilien gemäß ${JSON.stringify(PROVIDER_FAMILY)} kommen. Bei nested=true enthält agent_types ausschließlich den zugelassenen Lead; dieser dispatcht Children später über sein Agent-Tool.`)
const synthesis = await callAgent('opus-builder', synthesisPrompt,
  { label: 'plan-synthesis:opus', phase: 'Planen', step_id: synthesisStep.id, replacement_types: LEAD_TYPES, schema: PLAN_SCHEMA })
const plan = synthesis.output

phase('Zuteilen')
validatePlan(plan)
const step_results = {}
const nested_delegations = []
phase('Steps ausführen')
for (const step of plan.steps) {
  const dependencies = step.depends_on.map(id => ({ id, result: step_results[id] }))
  const ownerReplacementTypes = AGENT_TYPES.filter(
    type => PROVIDER_FAMILY[type] !== PROVIDER_FAMILY[step.verify_agent_type],
  )
  let owners = []
  let nested = []
  if (step.nested) {
    const leadPlan = await callAgent(step.lead_agent_type, promptFor(step, dependencies, 'Nested-Lead-Plan',
      `Definiere exakt einen vollständigen Child-Auftrag pro Eintrag aus ${JSON.stringify(step.child_agent_types)}. Starte selbst keine Agenten: Der Workflow muss die Child-Aufrufe und ihre Parallelität direkt sehen. Jeder Auftrag braucht eindeutige child_task_id, passenden child_agent_type, konkrete child_task und ein zu anderen Children disjunktes write_set.`),
      { label: `step:${step.id}:lead-plan`, phase: 'Steps ausführen', step_id: step.id,
        replacement_types: LEAD_TYPES.filter(
          type => PROVIDER_FAMILY[type] !== PROVIDER_FAMILY[step.verify_agent_type],
        ), schema: LEAD_PLAN_SCHEMA })
    const childTasks = validateChildPlan(step, leadPlan)
    nested = await runInWaves(childTasks.map((child, index) => ({ run: async () => {
      const childCall = await callAgent(child.child_agent_type, promptFor(step, dependencies, 'Nested-Child',
        `Führe nur diesen Child-Auftrag aus: ${child.child_task}. write_set: ${JSON.stringify(child.write_set)}. Du bist ein Leaf-Child: Starte keine weiteren Agenten. Liefere Ergebnis und Gate-Beleg; nested_delegations bleibt leer.`),
        { label: `step:${step.id}:child:${index + 1}:${child.child_agent_type}`,
          phase: 'Steps ausführen', step_id: step.id,
          replacement_types: ownerReplacementTypes, schema: STEP_SCHEMA })
      return { step_id: step.id, lead_agent_type: leadPlan.agent_type,
        child_task_id: child.child_task_id,
        child_call_id: `${step.id}:child:${index + 1}`,
        planned_child_agent_type: child.child_agent_type,
        child_agent_type: childCall.agent_type,
        wave: Math.floor(index / MAX_WAVE) + 1,
        child_task: child.child_task, write_set: child.write_set,
        child_result: childCall.output.result, beleg: childCall.output.beleg,
        call: childCall }
    } })))
    const lead = await callAgent(leadPlan.agent_type, promptFor(step,
      [...dependencies, { child_runtime_results: nested }], 'Nested-Lead-Synthese',
      'Synthetisiere ausschließlich die direkt vom Workflow gestarteten Child-Ergebnisse. Erfinde keine Delegation. Liefere das Step-Ergebnis und den Gate-Beleg; nested_delegations bleibt leer.'),
      { label: `step:${step.id}:lead-synthesis`, phase: 'Steps ausführen', step_id: step.id,
        replacement_types: LEAD_TYPES.filter(
          type => PROVIDER_FAMILY[type] !== PROVIDER_FAMILY[step.verify_agent_type],
        ), schema: STEP_SCHEMA })
    owners = [lead]
    validateNestedDelegations(step, leadPlan, lead, nested)
  } else {
    owners = await runInWaves(step.agent_types.map(agentType => ({ run: () => callAgent(
      agentType, promptFor(step, dependencies, 'Step-Owner', 'Führe genau diesen Plan-Step aus und liefere Ergebnis plus Gate-Beleg.'),
      { label: `step:${step.id}:${agentType}`, phase: 'Steps ausführen', step_id: step.id,
        replacement_types: ownerReplacementTypes, schema: STEP_SCHEMA },
    ) })))
  }
  const expectedOwners = step.nested ? 1 : step.agent_types.length
  if (owners.length !== expectedOwners || owners.some(owner => !owner || !owner.output
    || !owner.output.result.trim() || !owner.output.beleg.trim())) throw new Error(`Owner-Gate rot: ${step.id}`)
  const ownerProviderFamilies = new Set([
    ...owners.map(owner => PROVIDER_FAMILY[owner.agent_type]),
    ...nested.map(item => item.call.provider_family),
  ])
  const verifyReplacementTypes = AGENT_TYPES.filter(
    type => !ownerProviderFamilies.has(PROVIDER_FAMILY[type]),
  )
  const verify = await callAgent(step.verify_agent_type, promptFor(step, [...dependencies, { id: step.id, owner_results: owners }], 'Unabhängiger Verify',
    `Prüfe das echte Ergebnis gegen das Gate. Bei Nested-Steps prüfe die direkt geloggten Child-Runtime-Aufrufe, child_call_id, echte Wellen, disjunkte write_sets und exakte Child-Anzahlen. Gib nur PASS oder FAIL mit einem nichtleeren eingefügten Beleg zurück.`),
    { label: `verify:${step.id}`, phase: 'Verify', step_id: step.id,
      replacement_types: verifyReplacementTypes, schema: VERIFY_SCHEMA })
  if (!verify.output || verify.output.verdict !== 'PASS' || !verify.output.beleg.trim()) throw new Error(`Verify-Gate rot: ${step.id}`)
  step_results[step.id] = { owner: owners.map(owner => owner.agent_type), gate: step.gate,
    result: owners, verify, nested_delegations: nested }
  nested_delegations.push(...nested)
}

phase('Review')
const reviewStep = { id: 'review', ziel: 'Plan, Steps, Gates und Ausfälle prüfen', depends_on: plan.steps.map(step => step.id),
  agent_types: ['sol-pruefer'], nested: false, lead_agent_type: '', child_agent_types: [], verify_agent_type: 'kimi-worker', gate: 'Sol-Review plus Kimi-Gegencheck belegt' }
const REVIEW_AGENTS = {
  sol: { agentType: 'sol-pruefer', role: 'Ship-Gate' },
  kimi: { agentType: 'kimi-worker', role: 'Gegencheck' },
}
const routeFailuresBeforeReview = currentRouteFailures()
const solReplacementTypes = AGENT_TYPES.filter(
  type => PROVIDER_FAMILY[type] !== PROVIDER_FAMILY[reviewStep.verify_agent_type],
)
const sol_review = await callAgent(REVIEW_AGENTS.sol.agentType, promptFor(reviewStep,
  [{ step_results }, { route_failures: routeFailuresBeforeReview }], 'Review und Ship-Gate',
  'Prüfe die gesamte Runde mit pass/fail, nichtleerem Beleg, offenen Lücken und allen bisherigen Routenausfällen.'),
  { label: 'review:sol', phase: 'Review', step_id: reviewStep.id,
    replacement_types: solReplacementTypes, schema: REVIEW_SCHEMA })
const routeFailuresAfterSol = currentRouteFailures()
const kimiReplacementTypes = AGENT_TYPES.filter(
  type => PROVIDER_FAMILY[type] !== PROVIDER_FAMILY[sol_review.agent_type],
)
const kimi_review = await callAgent(REVIEW_AGENTS.kimi.agentType, promptFor(reviewStep,
  [{ step_results }, { sol_review }, { route_failures: routeFailuresAfterSol }], 'Kimi-Gegencheck',
  'Greife das erste Review am echten Ergebnis und an allen bisherigen Routenausfällen an. Liefere pass/fail, nichtleeren Beleg und offene Lücken.'),
  { label: 'review:kimi', phase: 'Review', step_id: reviewStep.id,
    replacement_types: kimiReplacementTypes, schema: REVIEW_SCHEMA })
if (PROVIDER_FAMILY[sol_review.agent_type] === PROVIDER_FAMILY[kimi_review.agent_type]) throw new Error('Review-Providerfamilien nicht unabhängig')
if (!sol_review.output || sol_review.output.verdict !== 'PASS' || !sol_review.output.beleg.trim()) throw new Error('Sol-Review-Gate rot')
if (!kimi_review.output || kimi_review.output.verdict !== 'PASS' || !kimi_review.output.beleg.trim()) throw new Error('Kimi-Review-Gate rot')
const review = { sol: sol_review, kimi: kimi_review }

const family_coverage = {}
for (const attempt of attempts) {
  const entry = family_coverage[attempt.family] || { agent_types_attempted: [], attempted: 0, successful: 0, null_results: 0 }
  if (!entry.agent_types_attempted.includes(attempt.agent_type)) entry.agent_types_attempted.push(attempt.agent_type)
  entry.attempted += 1
  if (attempt.output === null) entry.null_results += 1
  else entry.successful += 1
  family_coverage[attempt.family] = entry
}
const route_failures = currentRouteFailures()
return { plan, step_results, family_coverage, nested_delegations, route_failures, review }
```

## Varianten und Merkregeln

- **Massen-Umbau:** Der Synthese-Subagent teilt nach disjunkten `write_set`s;
  unabhängige Owner laufen nur innerhalb ihres Steps in Wellen von höchstens 6.
- **Vendoring:** Ein Leaf-Worker liest Lizenz und Red Flags; ein unabhängiger
  Verify-Step prüft das echte Destillat. `pipeline()` bleibt Default für
  abhängige Datenflüsse; `parallel()` ist nur innerhalb eines Steps erlaubt.
- Jeder Prompt enthält den vollständigen Kontrakt, die konkrete Step-Struktur und
  bisherige Abhängigkeitsergebnisse. Keine festen Agentenzahlen erfinden.
- Große Zwischenergebnisse nicht durch JSON-Kürzen an Folge-Agenten geben,
  sondern als Datei ablegen und nur den Pfad übergeben. Das ist die
  **Slice-Falle**. Null-Routen mit Beleg, Ersatzkandidat und Wirkung im Return
  und im Runden-Protokoll festhalten.
