#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const dir = path.resolve(new URL('.', import.meta.url).pathname)
const validator = path.resolve(dir, '../scripts/validate-impeccable-capability-matrix.mjs')
const cases = [
  ['valid.json', 0],
  ['invalid-unavailable-pass.json', 1],
]
const errors = []
for (const [file, expected] of cases) {
  const result = spawnSync(process.execPath, [validator, path.join(dir, 'fixtures/impeccable-capability', file)], { encoding: 'utf8' })
  if ((result.status ?? 1) !== expected) errors.push(`${file}: expected ${expected}, got ${result.status}\n${result.stdout}${result.stderr}`)
}
if (errors.length) {
  for (const error of errors) console.error(`FAIL ${error}`)
  process.exit(1)
}
console.log(`PASS Impeccable capability matrix (${cases.length} fixtures)`)
console.log(`${cases.length}/${cases.length} Faelle wie erwartet.`)
