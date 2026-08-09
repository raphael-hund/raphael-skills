#!/usr/bin/env node
'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const templatePath = path.join(
  root,
  'skills/eigene/orchestrate/references/workflow-vorlage.md',
)
const markdown = fs.readFileSync(templatePath, 'utf8')
const block = markdown.match(/```javascript\n([\s\S]*?)\n```/)
assert.ok(block, 'workflow-vorlage.md has no JavaScript block')

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const workflow = new AsyncFunction(
  'args',
  'agent',
  'parallel',
  'phase',
  'log',
  block[1].replace('export const meta =', 'const meta ='),
)

let currentPlan
let childDelegations = []
let failLabels = new Set()
let failVerdictLabels = new Set()
let omitChildField = null
let addUnexpectedChildField = false
let prompts = {}
let events = []
let logs = []
let activeChildren = 0
let maxChildren = 0

async function mockAgent(prompt, options) {
  const label = options.label
  events.push(label)
  prompts[label] = prompt
  if (failLabels.has(label)) return null
  if (label.startsWith('plan-panel:')) {
    return { role: label, proposals: ['Vorschlag'] }
  }
  if (
    label === 'plan-synthesis:opus' ||
    label === 'plan-synthesis:opus:replacement'
  ) {
    return currentPlan
  }
  if (label.includes(':lead-plan')) {
    const step = currentPlan.steps.find(item =>
      label.includes(`step:${item.id}:`),
    )
    const childTasks = step.child_agent_types.map((type, index) => ({
      child_task_id: `${step.id}-task-${index + 1}`,
      child_agent_type: type,
      rolle: `Rolle ${index + 1}`,
      harness: 'Workflow agent()',
      child_task: `Auftrag ${index + 1}`,
      input: `Input ${index + 1}`,
      output: `Output ${index + 1}`,
      gate: `Gate ${index + 1}`,
      trust: 'Untrusted bis Verify',
      write_set: [`/tmp/${step.id}-${index + 1}`],
    }))
    if (omitChildField) delete childTasks[0][omitChildField]
    if (addUnexpectedChildField) {
      childTasks[0].unexpected_contract_field = 'unexpected'
    }
    return {
      result: 'Child-Plan',
      beleg: '/tmp/lead-plan.txt',
      child_tasks: childTasks,
    }
  }
  if (label.includes(':child:')) {
    activeChildren += 1
    maxChildren = Math.max(maxChildren, activeChildren)
    await new Promise(resolve => setTimeout(resolve, 10))
    activeChildren -= 1
    return {
      result: `Ergebnis ${label}`,
      beleg: `/tmp/${label.replaceAll(':', '-')}.txt`,
      nested_delegations: childDelegations,
    }
  }
  if (label.includes(':lead-synthesis')) {
    return {
      result: 'Synthese',
      beleg: '/tmp/synthese.txt',
      nested_delegations: [],
    }
  }
  if (label.startsWith('step:')) {
    return {
      result: `Owner ${label}`,
      beleg: '/tmp/owner.txt',
      nested_delegations: [],
    }
  }
  if (label.startsWith('verify:')) {
    return {
      verdict: failVerdictLabels.has(label) ? 'FAIL' : 'PASS',
      beleg: '/tmp/verify.txt',
    }
  }
  if (label === 'review:sol' || label === 'review:sol:replacement') {
    return { verdict: 'PASS', beleg: '/tmp/sol.txt', offene_luecken: [] }
  }
  if (label === 'review:kimi' || label === 'review:kimi:replacement') {
    return { verdict: 'PASS', beleg: '/tmp/kimi.txt', offene_luecken: [] }
  }
  throw new Error(`unexpected agent label: ${label}`)
}

const parallel = async thunks => Promise.all(thunks.map(thunk => thunk()))
const phase = () => {}
const log = message => logs.push(message)

const childTypes = [
  'sonnet-worker',
  'haiku-worker',
  'sonnet-worker',
  'haiku-worker',
  'sonnet-worker',
  'haiku-worker',
  'grok-worker',
]

function twoStepPlan() {
  return {
    steps: [
      {
        id: 's1',
        ziel: 'Nested',
        depends_on: [],
        agent_types: ['opus-builder'],
        nested: true,
        lead_agent_type: 'opus-builder',
        child_agent_types: [...childTypes],
        verify_agent_type: 'kimi-worker',
        gate: 'Runtime belegt',
      },
      {
        id: 's2',
        ziel: 'Abhängiger Abschluss',
        depends_on: ['s1'],
        agent_types: ['terra-bulk', 'sol-pruefer', 'luna-worker'],
        nested: false,
        lead_agent_type: '',
        child_agent_types: [],
        verify_agent_type: 'grok-worker',
        gate: 'Abschluss belegt',
      },
    ],
  }
}

function allNonNestedPlan() {
  return {
    steps: [
      {
        id: 'flat-1',
        ziel: 'Breite Ausführung',
        depends_on: [],
        agent_types: [
          'opus-builder',
          'sonnet-worker',
          'haiku-worker',
        ],
        nested: false,
        lead_agent_type: '',
        child_agent_types: [],
        verify_agent_type: 'kimi-worker',
        gate: 'Breite belegt',
      },
      {
        id: 'flat-2',
        ziel: 'Abschluss',
        depends_on: ['flat-1'],
        agent_types: ['sol-pruefer', 'terra-bulk', 'luna-worker'],
        nested: false,
        lead_agent_type: '',
        child_agent_types: [],
        verify_agent_type: 'grok-worker',
        gate: 'Abschluss belegt',
      },
    ],
  }
}

async function run(plan, options = {}) {
  currentPlan = plan
  childDelegations = options.childDelegations || []
  failLabels = new Set(options.failLabels || [])
  failVerdictLabels = new Set(options.failVerdictLabels || [])
  omitChildField = options.omitChildField || null
  addUnexpectedChildField = options.addUnexpectedChildField || false
  prompts = {}
  events = []
  logs = []
  activeChildren = 0
  maxChildren = 0
  return workflow(
    { mission: 'test' },
    mockAgent,
    parallel,
    phase,
    log,
  )
}

async function main() {
  const result = await run(twoStepPlan())
  assert.equal(result.plan.steps.length, 2)
  assert.equal(result.nested_delegations.length, 7)
  assert.equal(maxChildren, 6)
  const nestedVerify = prompts['verify:s1']
  for (const marker of [
    'child_plan',
    'child_runtime_results',
    'child_task_id',
    'child_call_id',
    'planned_child_agent_type',
    'child_agent_type',
    'wave',
    'write_set',
    'child_result',
    'beleg',
  ]) {
    assert.ok(nestedVerify.includes(marker), `nested verifier missing ${marker}`)
  }
  assert.ok(
    events.indexOf('verify:s1') <
      events.findIndex(label => label.startsWith('step:s2:')),
    'dependent step started before its dependency was verified',
  )
  const dispatchBan =
    'Starte weder Agent noch AgentSwarm oder sonstige Subagents; ausschließlich der Workflow startet'
  const boundedLabels = Object.keys(prompts).filter(label =>
    label.startsWith('plan-panel:') || label.includes(':child:')
    || label.startsWith('step:s2:') || label.startsWith('verify:'),
  )
  assert.ok(boundedLabels.length > 0)
  for (const label of boundedLabels) {
    assert.ok(prompts[label].includes(dispatchBan), `${label} missing dispatch ban`)
  }
  const childPrompt = prompts[
    Object.keys(prompts).find(label => label.includes(':child:'))
  ]
  for (const field of [
    'child_agent_type', 'rolle', 'harness', 'child_task',
    'input', 'output', 'gate', 'trust', 'write_set',
  ]) {
    assert.ok(childPrompt.includes(`"${field}"`), `child prompt missing ${field}`)
  }

  const oneStep = { steps: [twoStepPlan().steps[0]] }
  await assert.rejects(() => run(oneStep), /weniger als zwei Steps/)
  await assert.rejects(() => run(allNonNestedPlan()), /kein Nested-Step/)

  const noVerifierBackup = twoStepPlan()
  noVerifierBackup.steps[0].child_agent_types.push('sol-pruefer')
  await assert.rejects(
    () => run(noVerifierBackup),
    /Keine unabhängige Verifier-Ersatzroute: s1/,
  )

  const sameProviderVerifierBackup = twoStepPlan()
  sameProviderVerifierBackup.steps[1].agent_types = [
    'kimi-worker', 'grok-worker', 'sol-pruefer',
    'terra-bulk', 'luna-worker',
  ]
  sameProviderVerifierBackup.steps[1].verify_agent_type = 'opus-builder'
  await assert.rejects(
    () => run(sameProviderVerifierBackup),
    /Keine unabhängige Verifier-Ersatzroute: s2/,
  )

  for (const field of [
    'child_task_id', 'child_agent_type', 'rolle', 'harness', 'child_task',
    'input', 'output', 'gate', 'trust', 'write_set',
  ]) {
    await assert.rejects(
      () => run(twoStepPlan(), { omitChildField: field }),
      /Child-Plan ungültig|Unbekannter AgentType/,
      `missing child contract field accepted: ${field}`,
    )
  }
  await assert.rejects(
    () => run(twoStepPlan(), { addUnexpectedChildField: true }),
    /Child-Plan ungültig/,
    'unexpected child contract field accepted',
  )

  const recoveredVerify = await run(twoStepPlan(), {
    failLabels: ['verify:s1'],
  })
  assert.equal(recoveredVerify.step_results.s1.verify.agent_type, 'sol-pruefer')
  assert.ok(events.includes('verify:s1:replacement'))
  assert.ok(logs.some(item => item.startsWith('ROUTE_FAILURE_RECOVERED ')))

  await assert.rejects(
    () => run(twoStepPlan(), {
      failLabels: ['plan-panel:kimi-worker'],
      failVerdictLabels: ['verify:s2'],
    }),
    /Verify-Gate rot: s2/,
  )
  const recoveredLog = logs.find(item =>
    item.startsWith('ROUTE_FAILURE_RECOVERED '),
  )
  assert.ok(recoveredLog, 'recovered route failure was not logged before later abort')
  assert.match(recoveredLog, /"agent_type":"kimi-worker"/)
  assert.match(recoveredLog, /"agent_type":"grok-worker"/)
  assert.match(recoveredLog, /"error":"Agent returned null"/)

  const hiddenDelegation = [{
    child_agent_type: 'grok-worker',
    child_agent_id: 'hidden-1',
    wave: 1,
    child_task: 'versteckt',
    child_result: 'ausgeführt',
    beleg: '/tmp/hidden.txt',
  }]
  await assert.rejects(
    () => run(twoStepPlan(), { childDelegations: hiddenDelegation }),
    /Nested-Runtime-Beleg ungültig/,
  )

  await assert.rejects(
    () => run(twoStepPlan(), {
      failLabels: [
        'plan-panel:kimi-worker',
        'plan-panel:kimi-worker:replacement',
      ],
    }),
    /Primary und Ersatz fehlgeschlagen: kimi-worker → grok-worker/,
  )
  assert.equal(logs.length, 1)
  assert.match(logs[0], /^ROUTE_FAILURE_BLOCKED /)
  assert.match(logs[0], /"agent_type":"kimi-worker"/)
  assert.match(logs[0], /"agent_type":"grok-worker"/)
  assert.match(logs[0], /"error":"Agent returned null"/)

  console.log('Orchestrate LOOP runtime tests: OK')
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
