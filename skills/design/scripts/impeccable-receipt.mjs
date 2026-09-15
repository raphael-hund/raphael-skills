#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
if (args.includes('--help') || args.length === 0) {
  console.log('Usage: node impeccable-receipt.mjs --input report.json --out receipt.json --surface static|browser|design-system --run-id ID')
  process.exit(args.includes('--help') ? 0 : 2)
}

function value(flag) {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : undefined
}

const input = value('--input')
const out = value('--out')
const surface = value('--surface')
const runId = value('--run-id')
const validSurfaces = new Set(['static', 'browser', 'design-system'])
if (!input || !out || !runId || !validSurfaces.has(surface)) {
  console.error('Missing --input, --out, --run-id, or invalid --surface')
  process.exit(2)
}
if (!fs.existsSync(input)) {
  console.error(`Missing input report: ${input}`)
  process.exit(2)
}

let report
try {
  report = JSON.parse(fs.readFileSync(input, 'utf8'))
} catch (error) {
  console.error(`Invalid JSON report: ${error.message}`)
  process.exit(2)
}
const findings = Array.isArray(report) ? report : Array.isArray(report.findings) ? report.findings : null
if (!findings) {
  console.error('Input report must be an array or an object with findings[]')
  process.exit(2)
}
const normalized = findings.map((finding) => ({
  id: finding.id || finding.antipattern || null,
  severity: finding.severity || (finding.advisory === true ? 'advisory' : 'warning'),
  category: finding.category || null,
  file: finding.file || null,
  line: Number.isInteger(finding.line) ? finding.line : null,
  snippet: finding.snippet || null,
}))
const invalid = normalized.filter((finding) => !finding.id || !['error', 'warning', 'advisory'].includes(finding.severity))
if (invalid.length) {
  console.error(`Invalid findings: ${invalid.length}`)
  process.exit(2)
}
const counts = Object.fromEntries(['error', 'warning', 'advisory'].map((severity) => [severity, normalized.filter((finding) => finding.severity === severity).length]))
const receipt = {
  schema: 'design/impeccable-receipt/v1',
  run_id: runId,
  surface,
  scope: report.scope || null,
  source: 'impeccable-deterministic-detector',
  findings: normalized,
  counts,
  blocking: counts.error > 0 || counts.warning > 0,
  interpretation: 'deterministic hygiene/design-system result only; not an AAA quality claim',
}
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
fs.writeFileSync(out, `${JSON.stringify(receipt, null, 2)}\n`)
console.log(`PASS impeccable receipt (${surface}: ${normalized.length} findings)`)
