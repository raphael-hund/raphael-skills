#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const dir = path.resolve(new URL('.', import.meta.url).pathname)
const script = path.resolve(dir, '../scripts/impeccable-receipt.mjs')
const fixture = path.join(dir, 'fixtures/impeccable-receipt.json')
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'impeccable-receipt-')), 'receipt.json')
const result = spawnSync(process.execPath, [script, '--input', fixture, '--out', out, '--surface', 'browser', '--run-id', 'eval-impeccable-receipt'], { encoding: 'utf8' })
if (result.status !== 0) {
  console.error(result.stdout + result.stderr)
  process.exit(1)
}
const receipt = JSON.parse(fs.readFileSync(out, 'utf8'))
const errors = []
if (receipt.schema !== 'design/impeccable-receipt/v1') errors.push('schema')
if (receipt.surface !== 'browser') errors.push('surface')
if (receipt.counts.warning !== 1 || receipt.counts.advisory !== 1 || receipt.counts.error !== 0) errors.push('severity counts')
if (receipt.blocking !== true) errors.push('warning must block the technical gate')
if (/AAA quality claim/.test(receipt.interpretation) === false) errors.push('boundary')
if (errors.length) {
  console.error(`FAIL impeccable receipt: ${errors.join(', ')}`)
  process.exit(1)
}
console.log('PASS impeccable receipt (surface separation and severity counts)')
console.log('1/1 Faelle wie erwartet.')
