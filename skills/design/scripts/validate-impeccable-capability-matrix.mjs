#!/usr/bin/env node
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node validate-impeccable-capability-matrix.mjs <matrix.json>')
  process.exit(2)
}

const errors = []
let matrix
try { matrix = JSON.parse(fs.readFileSync(file, 'utf8')) } catch (error) {
  console.error(`FAIL invalid matrix: ${error.message}`)
  process.exit(1)
}

if (matrix.schema !== 'design/impeccable-capability-matrix/v1') errors.push('schema')
if (matrix.source?.full_upstream_not_claimed !== true) errors.push('full upstream claim boundary')
if (!Array.isArray(matrix.capabilities) || matrix.capabilities.length < 4) errors.push('capabilities')

const ids = new Set()
for (const capability of matrix.capabilities || []) {
  if (!capability.id || ids.has(capability.id)) errors.push(`duplicate or missing id: ${capability.id || '<missing>'}`)
  ids.add(capability.id)
  for (const key of ['lens', 'surface', 'scope', 'fixture', 'launch_blocking', 'owner', 'reviewer']) {
    if (!(key in capability)) errors.push(`${capability.id || '<missing>'}: missing ${key}`)
  }
  if (!['available', 'advisory', 'unavailable'].includes(capability.status)) errors.push(`${capability.id}: invalid status`)
  if (capability.status === 'available' && !capability.runner) errors.push(`${capability.id}: available capability needs runner`)
  if (capability.status === 'unavailable' && capability.runner) errors.push(`${capability.id}: unavailable capability cannot have active runner`)
  if (capability.status === 'unavailable' && (!Array.isArray(capability.unavailable_conditions) || capability.unavailable_conditions.length === 0)) errors.push(`${capability.id}: unavailable needs reason`)
  if (capability.status !== 'unavailable' && (!capability.exit_semantics || !('pass' in capability.exit_semantics))) errors.push(`${capability.id}: exit semantics required`)
  if (capability.status === 'unavailable' && capability.exit_semantics?.pass !== 'not-implemented') errors.push(`${capability.id}: unavailable pass must be not-implemented`)
  if (capability.status === 'advisory' && capability.launch_blocking !== 'advisory-disposition-required') errors.push(`${capability.id}: advisory must require disposition`)
}

if (errors.length) {
  for (const error of errors) console.error(`FAIL ${error}`)
  process.exit(1)
}
console.log(`PASS Impeccable capability matrix (${matrix.capabilities.length} capabilities)`)
