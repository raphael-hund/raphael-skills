#!/usr/bin/env node
/**
 * run-site-build-load-path-check.mjs — Site-Build laedt keine Einzel-Skills
 * und nutzt den gelieferten Lookup.
 *
 * Treibt die echten Skripte: resource-access.mjs show / check und
 * shot-sweep.mjs ohne --base. Kein Mock der Lookup-Funktion.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const SKILL = path.join(WEB, 'SKILL.md');
const QA = path.join(WEB, 'references', 'qa-faecher.md');
const ACCESS = path.join(WEB, 'scripts', 'resource-access.mjs');
const SWEEP = path.join(WEB, 'scripts', 'shot-sweep.mjs');
const DESIGN = path.join(WEB, '..', '..', 'design', 'SKILL.md');

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

const skill = fs.readFileSync(SKILL, 'utf8');
const qa = fs.readFileSync(QA, 'utf8');
const design = fs.readFileSync(DESIGN, 'utf8');

console.log('\nSite-Build Load-Path — Einzel-Skills nicht Pflicht, Lookup echt\n');

zeile(
  /keine Pflicht-Loads/.test(skill) && /nur `design`/.test(skill),
  'web SKILL.md: design + copywriting, Einzel-Skills keine Pflicht-Loads',
);
zeile(
  !/Mitgeladene Skills \(keine Dateien\): `design`, `impeccable`, `taste`, `ui-ux`/.test(skill),
  'web SKILL.md listet taste/impeccable/ui-ux nicht mehr als Mitgeladen',
);
zeile(
  /requires_skills:\s*\[\]/.test(design) && /Site-Build kommt über/.test(design),
  'design SKILL.md: kein impeccable-Require, Site-Build über web',
);
zeile(
  /AI-Slop-Sequenz/.test(qa) && /design ZUERST/.test(qa) && /copywriting G1→G2/.test(qa),
  'qa-faecher.md: eine Slop-Sequenz (design zuerst, dann copywriting G1→G2)',
);
zeile(
  /rules\.de\.mjs/.test(qa),
  'qa-faecher.md haengt DE-Regeln an scan-ai-slop',
);

function show(name) {
  return spawnSync('node', [ACCESS, 'show', name], { encoding: 'utf8', timeout: 15000 });
}

for (const [name, marker] of [
  ['React Bits', 'reactbits.dev'],
  ['GSAP', 'gsap.com'],
  ['Lucide', 'lucide.dev'],
]) {
  const r = show(name);
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  zeile(
    r.status === 0 && aus.includes(name) && /https:\/\//.test(aus) && aus.includes(marker),
    `resource-access show "${name}" liefert URL/Metadaten`,
    r.status === 0 ? null : (r.stderr || aus).split('\n')[0],
  );
}

{
  const r = show('DieseBibliothekGibtEsNicht');
  const aus = `${r.stderr || ''}${r.stdout || ''}`;
  zeile(
    r.status === 1 && /Resource not found/.test(aus),
    'resource-access show Unbekannt = ehrlicher Fail (Exit 1)',
  );
}

{
  const r = spawnSync('node', [SWEEP], { encoding: 'utf8', timeout: 15000 });
  const aus = `${r.stderr || ''}${r.stdout || ''}`;
  zeile(
    r.status === 2 && /--base/.test(aus),
    'shot-sweep ohne --base = Exit 2 Usage',
  );
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log('Load-Path und Lookups stimmen.');
