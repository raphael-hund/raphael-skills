#!/usr/bin/env node
// muster-studie.mjs — Capture-Wrapper um shot-sweep.mjs. Kein eigenes Playwright.
//
// Usage:
//   node scripts/muster-studie.mjs --url https://example.ch --slug name [--out references/muster-bibliothek]
//
// Spawnt shot-sweep mit --base <url> --out <out>/<slug>/shots --routes /.
// Bei shot-sweep Exit != 0 denselben Exit durchreichen; Case nicht als Capture-fertig behaupten.
// Schreibt keine Urteil-Felder. Optional: Zeile `Capture: fehlt` in <out>/<slug>.md ersetzen.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const SWEEP = path.join(HIER, 'shot-sweep.mjs');

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };

const url = get('url', null);
const slug = get('slug', null);
const outRaw = get('out', path.join(WEB, 'references', 'muster-bibliothek'));

if (!url || !slug) {
  console.error(`muster-studie: --url <url> und --slug <name> sind Pflicht.
Beispiel:
  node ${path.join(HIER, 'muster-studie.mjs')} \\
    --url https://example.ch --slug name [--out references/muster-bibliothek]`);
  process.exit(2);
}

const outDir = path.resolve(outRaw);
const shotsOut = path.join(outDir, slug, 'shots');

const r = spawnSync(process.execPath, [
  SWEEP,
  '--base', url,
  '--out', shotsOut,
  '--routes', '/',
], { stdio: 'inherit' });

const code = r.status;
if (code !== 0) {
  process.exit(code == null ? 1 : code);
}

const casePath = path.join(outDir, `${slug}.md`);
if (fs.existsSync(casePath)) {
  const raw = fs.readFileSync(casePath, 'utf8');
  if (/^Capture: fehlt$/m.test(raw)) {
    fs.writeFileSync(casePath, raw.replace(/^Capture: fehlt$/m, `Capture: ${shotsOut}`));
  }
}
