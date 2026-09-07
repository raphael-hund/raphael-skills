#!/usr/bin/env node
/**
 * run-komponenten-check.mjs — Parser und CLI von komponenten.mjs.
 *
 * Offline gegen Fixtures unter evals/fixtures/komponenten/. Netz nur mit
 * --netz: dann laufen die vier vereinbarten Live-Aufrufe.
 *
 *   node evals/run-komponenten-check.mjs
 *   node evals/run-komponenten-check.mjs --netz
 *
 * Exit 0 = Parser, Hilfe und (optional) Netz wie erwartet.
 * Exit 1 = mindestens eine Prüfung fehlgeschlagen.
 * Exit 2 = Fixture oder Skript fehlt (nicht geprüft).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  itemUrlFromTemplate,
  parseCli,
  parseDocsComponents,
  parsePackageLicense,
  parseRegistries,
  parseRegistryIndex,
  parseRegistryItem,
  parseRegistryTarget,
  parseShadcnSearch,
  parseVendorIndex,
  writeRegistryFiles,
} from '../scripts/komponenten.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FIX = path.join(HIER, 'fixtures', 'komponenten');
const SCRIPT = path.join(HIER, '..', 'scripts', 'komponenten.mjs');
const NETZ = process.argv.includes('--netz');
const UNBEKANNT = process.argv.filter((arg) => arg.startsWith('--') && arg !== '--netz');

if (UNBEKANNT.length) {
  console.error(`FEHLER: unbekanntes Flag ${UNBEKANNT[0]}`);
  process.exit(2);
}

const files = {
  registries: path.join(FIX, 'registries.json'),
  registryIndex: path.join(FIX, 'registry-index.json'),
  registryItem: path.join(FIX, 'registry-item.json'),
  search: path.join(FIX, 'shadcn-search.json'),
  docs: path.join(FIX, 'docs-components.md'),
  package: path.join(FIX, 'license-package.json'),
};
for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) {
    console.error(`FEHLER: Fixture fehlt (${name}): ${file}`);
    process.exit(2);
  }
}
if (!fs.existsSync(SCRIPT)) {
  console.error(`FEHLER: Skript fehlt: ${SCRIPT}`);
  process.exit(2);
}

let fehler = 0;
let geprueft = 0;
function zeile(ok, text, detail = '') {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
}
const read = (file) => fs.readFileSync(file, 'utf8');
const jsonOut = (proc) => {
  try { return JSON.parse(String(proc.stdout || '').trim()); } catch { return null; }
};
const run = (args, timeout = 120_000) => spawnSync(process.execPath, [SCRIPT, ...args], {
  encoding: 'utf8', timeout, maxBuffer: 16 * 1024 * 1024,
});

console.log('\nKomponenten — Parser und CLI (offline)\n');

const registries = parseRegistries(read(files.registries));
zeile(registries.length >= 250, 'parseRegistries liest den Registry-Katalog', `${registries.length} Namespaces`);
zeile(
  ['@magicui', '@aceternity', '@react-bits', '@shadcnblocks'].every((name) => registries.some((row) => row.name === name && row.url.includes('{name}'))),
  'parseRegistries erhält relevante Namespaces und URL-Templates',
);

const index = parseRegistryIndex(read(files.registryIndex), '@magicui');
zeile(index.length === 2 && index[0]?.name === 'marquee' && index[0]?.target === '@magicui/marquee', 'parseRegistryIndex normalisiert Registry-Items');
const search = parseShadcnSearch(read(files.search), '@magicui');
zeile(search.length === 2 && search.every((row) => row.registry === '@magicui') && search.some((row) => row.name === 'marquee'), 'parseShadcnSearch liest shadcn-CLI-JSON');

const item = parseRegistryItem(read(files.registryItem), { name: 'aurora-background' });
zeile(
  item.name === 'aurora-background' && item.files.length === 1 && item.files[0].path === 'components/ui/aurora-background.tsx',
  'parseRegistryItem erhält Name und TSX-Datei',
);
zeile(
  item.dependencies.includes('clsx') && item.registryDependencies.includes('utils') && item.license === 'prüfen',
  'parseRegistryItem erhält Dependencies und Lizenzstatus',
);

const docs = parseDocsComponents(read(files.docs), 'https://daisyui.com/components/');
zeile(docs.length === 4 && docs.every((row) => /^https:\/\/daisyui\.com\/components\//.test(row.url)), 'parseDocsComponents findet vier Komponentenlinks');
zeile(!docs.some((row) => /github|twitter/i.test(row.name)), 'parseDocsComponents filtert Navigationslinks');
zeile(parsePackageLicense(read(files.package)) === 'MIT', 'parsePackageLicense liest MIT');

const vendorFixture = '| Quelle | Lokaler Ordner | Inhalt | Lizenzstatus | Auswahl |\n|---|---|---|---|---|\n| Beispiel | `beispiel/` | Komponenten | MIT | Tests |';
const vendors = parseVendorIndex(vendorFixture, '/tmp/vendor-root');
zeile(vendors.length === 1 && vendors[0].folder === 'beispiel' && vendors[0].path === '/tmp/vendor-root/beispiel', 'parseVendorIndex liest Tabellenzeilen');

const target = parseRegistryTarget('@magicui/marquee');
zeile(target.namespace === '@magicui' && target.name === 'marquee', 'parseRegistryTarget zerlegt @namespace/name');
zeile(itemUrlFromTemplate('https://example.test/r/{name}.json', 'marquee') === 'https://example.test/r/marquee.json', 'itemUrlFromTemplate setzt den Slug ein');
zeile(parseCli(['search', '@magicui', 'marquee', '--json']).flags.json, 'parseCli liest --json');

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'komponenten-eval-'));
try {
  const written = writeRegistryFiles(item, temp);
  zeile(written.length === 1 && fs.existsSync(written[0]) && fs.statSync(written[0]).size > 100, 'writeRegistryFiles schreibt TSX in --out');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

{
  const help = run(['--help'], 15_000);
  const aus = `${help.stdout || ''}${help.stderr || ''}`;
  zeile(help.status === 0 && /libs/.test(aus) && /search/.test(aus) && /get/.test(aus), '--help Exit 0 und nennt Kernkommandos');
}
{
  const unknown = run(['search', 'Diese-Lib-Gibt-Es-Nicht', 'button'], 90_000);
  const aus = `${unknown.stderr || ''}${unknown.stdout || ''}`;
  zeile(unknown.status === 2 && /Bibliothek nicht gefunden/.test(aus), 'unbekannte Lib Exit 2');
}
{
  const libs = run(['libs', '--json']);
  const data = jsonOut(libs);
  const required = [
    'Beautiful UI', 'AI CSS', 'Transitions.dev', 'Amicro', 'Canvas UI',
    'AI Elements', 'AI Canvas', 'Beste UI', 'Paper Shaders', 'Mantine',
    'React Bits', 'Magic UI', '21st.dev', 'Aceternity UI', 'shadcn.io', 'shadcn/ui',
    'Untitled UI React', 'Shadcn Blocks', 'Shoogle', 'Ruixen UI', 'Hover.dev', 'Animata',
    'Motion Primitives', 'Cult UI', 'Park UI', 'Origin UI', 'Float UI', 'Preline UI',
    'HyperUI', 'Meraki UI', 'daisyUI', 'tsParticles', 'Vanta.js', 'Three.js', 'OGL',
    'React Native Reusables', 'gluestack UI', 'Tamagui', 'React Native Paper',
    'React Native UI Lib', 'React Native Elements', 'UI Kitten', 'Composables UI', 'GetWidget',
  ];
  const names = new Set(Array.isArray(data) ? data.map((row) => row.name) : []);
  const missing = required.filter((name) => !names.has(name));
  zeile(libs.status === 0 && Array.isArray(data) && missing.length === 0, 'libs enthält alle Namen aus Raphaels Liste', missing.length ? `fehlt: ${missing.join(', ')}` : `${data?.length || 0} Einträge`);
}

if (NETZ) {
  console.log('\nKomponenten — Netz\n');
  {
    const proc = run(['search', '@magicui', 'marquee', '--json']);
    const data = jsonOut(proc);
    zeile(proc.status === 0 && Array.isArray(data) && data.some((row) => row.name === 'marquee'), 'netz: search @magicui marquee → marquee', `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`);
  }
  {
    const out = '/tmp/rh-komp';
    fs.rmSync(out, { recursive: true, force: true });
    const proc = run(['get', '@aceternity/aurora-background', '--out', out, '--json']);
    const data = jsonOut(proc);
    const tsx = Array.isArray(data?.files) ? data.files.filter((file) => file.endsWith('.tsx')) : [];
    const large = tsx.some((file) => fs.existsSync(file) && fs.statSync(file).size > 1024);
    zeile(proc.status === 0 && large, 'netz: get @aceternity/aurora-background schreibt TSX > 1 kB', `exit ${proc.status} tsx=${tsx.length}`);
  }
  {
    const proc = run(['view', '@react-bits/SplitText-TS-TW', '--json']);
    const data = jsonOut(proc);
    zeile(proc.status === 0 && Array.isArray(data?.files) && data.files.length >= 1 && data.files.every((file) => file.path), 'netz: view @react-bits/SplitText-TS-TW → Dateien', `exit ${proc.status} n=${Array.isArray(data?.files) ? data.files.length : 'kein-json'}`);
  }
  {
    const proc = run(['search', 'hyperui', 'pricing', '--json']);
    const data = jsonOut(proc);
    const links = Array.isArray(data) ? data.filter((row) => /^https?:\/\//.test(row.url || '')) : [];
    zeile(proc.status === 0 && links.length >= 3, 'netz: search hyperui pricing → mindestens 3 Links', `exit ${proc.status} n=${links.length}`);
  }
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log(NETZ ? 'Komponenten-Parser und Netz-Aufrufe stimmen.' : 'Komponenten-Parser und CLI stimmen.');
