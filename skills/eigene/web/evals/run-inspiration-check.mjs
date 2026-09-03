#!/usr/bin/env node
/**
 * run-inspiration-check.mjs — Parser und CLI von inspiration.mjs.
 *
 * Offline gegen Fixtures unter evals/fixtures/inspiration/. Netz nur mit --netz:
 * dann laufen fuenf Live-Aufrufe (Refero, Magic UI, React Bits, Navbar, 21st).
 *
 *   node evals/run-inspiration-check.mjs
 *   node evals/run-inspiration-check.mjs --netz
 *
 * Exit 0 = Parser, Hilfe und (optional) Netz wie erwartet.
 * Exit 1 = mindestens eine Pruefung fehlgeschlagen.
 * Exit 2 = Fixture oder Skript fehlt (nicht geprueft).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseReferoSearch,
  parseReferoStyle,
  parseNavbarList,
  parseNavbarItem,
  parseRegistryList,
  parse21stSearch,
  parse21stItem,
} from '../scripts/inspiration.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FIX = path.join(HIER, 'fixtures', 'inspiration');
const SCRIPT = path.join(HIER, '..', 'scripts', 'inspiration.mjs');
const NETZ = process.argv.includes('--netz');

const files = {
  referoSearch: path.join(FIX, 'refero-search.md'),
  referoStyle: path.join(FIX, 'refero-style.md'),
  navbarList: path.join(FIX, 'navbar-list.md'),
  navbarItem: path.join(FIX, 'navbar-item.md'),
  registry: path.join(FIX, 'registry.json'),
  search21: path.join(FIX, '21st-search.md'),
  item21: path.join(FIX, '21st-item.md'),
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
function zeile(ok, text, detail) {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
}

const read = (file) => fs.readFileSync(file, 'utf8');

console.log('\nInspiration — Parser (offline) und CLI\n');

const refero = parseReferoSearch(read(files.referoSearch));
zeile(refero.length >= 3, 'parseReferoSearch findet mindestens 3 Styles', `${refero.length} Treffer`);
zeile(
  refero.some((row) => row.styleId === 'a0630421-7b66-48b4-aa14-6194a3b2c2b9' && /Fey/i.test(row.title) && /styles\.refero\.design\/style\//.test(row.url)),
  'parseReferoSearch: Fey hat title, url, styleId',
);
zeile(
  refero.every((row) => row.title && row.url && row.styleId && /^[0-9a-f-]{36}$/.test(row.styleId)),
  'parseReferoSearch: jedes Item hat title/url/styleId',
);

const style = parseReferoStyle(read(files.referoStyle));
zeile(/^# Fey — Style Reference/m.test(style) && !style.includes('```'), 'parseReferoStyle extrahiert DESIGN.md ohne Fence');
zeile(!/Footer noise/.test(style) && /--color-fey-ink/.test(style), 'parseReferoStyle: Tokens bleiben, Footer fällt weg');

const navs = parseNavbarList(read(files.navbarList));
zeile(navs.length >= 5, 'parseNavbarList findet mindestens 5 Navbar-Einträge', `${navs.length} Treffer`);
zeile(
  navs.some((row) => row.url.endsWith('/navbar/chesapeake-plywood') && /Chesapeake Plywood/i.test(row.name)),
  'parseNavbarList: Name + /navbar/<slug>',
);

const navItem = parseNavbarItem(read(files.navbarItem));
zeile(/Chesapeake Plywood/i.test(navItem.title) && /Mega Menu/i.test(navItem.type), 'parseNavbarItem: Titel und Typ');
zeile(
  navItem.images.length >= 1 && /wood solutions partner/.test(navItem.description),
  'parseNavbarItem: Beschreibung und Bild-URL',
);

const registry = JSON.parse(read(files.registry));
const magic = parseRegistryList(registry, { grep: 'marque' });
zeile(magic.length === 1 && magic[0].name === 'marquee', 'parseRegistryList --grep findet marquee');
const bitsDefault = parseRegistryList(registry, { variant: '-TS-TW' });
const bitsAll = parseRegistryList(registry);
zeile(
  bitsDefault.every((row) => row.name.endsWith('-TS-TW')) && bitsDefault.length === 2 && bitsAll.length > bitsDefault.length,
  'parseRegistryList Default-Filter TS-TW, --all zeigt mehr',
);

const found21 = parse21stSearch(read(files.search21));
zeile(found21.length >= 3, 'parse21stSearch findet mindestens 3 Komponenten', `${found21.length} Treffer`);
zeile(
  found21.some((row) => row.author === 'ncdai' && /hero-01/.test(row.url) && /Hero Golden Spiral/i.test(row.title)),
  'parse21stSearch: title, author, /@author/components/slug',
);

const item21 = parse21stItem(read(files.item21));
zeile(/Hero Golden Spiral/i.test(item21.title) && /golden spiral/.test(item21.description), 'parse21stItem: Titel und Beschreibung');
const item21b = parse21stItem(read(path.join(FIX, '21st-item-ohne-titelzeile.md')));
zeile(item21b.title === 'SaaS Template' && /^Modern Hero Section/.test(item21b.description) && !/^import/.test(item21b.description),
  'parse21stItem: ohne "/Titel"-Zeile Titel aus Header, Beschreibung erste Prosazeile');
zeile(
  /Hero01/.test(item21.usage) && /lucide-react/.test(item21.dependencies) && /MIT/.test(item21.license) && /github\.com/.test(item21.source || ''),
  'parse21stItem: Usage, Dependencies, License, Source',
);

{
  const help = spawnSync(process.execPath, [SCRIPT, '--help'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${help.stdout || ''}${help.stderr || ''}`;
  zeile(help.status === 0, '--help Exit 0');
  zeile(
    /inspiration\.mjs/.test(aus)
      && /Refero, Navbar Gallery, 21st/.test(aus)
      && /Magic UI \(MIT\)/.test(aus)
      && /art-direction\.md/.test(aus)
      && /#sections\/#motion\/#background/.test(aus),
    '--help nennt Lizenzregel und Dateiname',
  );
}

{
  const unknown = spawnSync(process.execPath, [SCRIPT, '--unknown-flag'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${unknown.stderr || ''}${unknown.stdout || ''}`;
  zeile(unknown.status === 2 && /unbekanntes Flag/.test(aus), 'unbekanntes Flag Exit 2');
}

{
  const source = spawnSync(process.execPath, [SCRIPT, 'landbook', 'search', 'x'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${source.stderr || ''}${source.stdout || ''}`;
  zeile(source.status === 2 && /unbekannte Quelle/.test(aus), 'unbekannte Quelle Exit 2');
}

if (NETZ) {
  console.log('\nInspiration — Netz\n');
  const run = (args, timeout = 90000) => spawnSync(process.execPath, [SCRIPT, ...args, '--json'], {
    encoding: 'utf8',
    timeout,
    maxBuffer: 12 * 1024 * 1024,
  });
  const parseOut = (proc) => {
    const raw = (proc.stdout || '').trim();
    try { return JSON.parse(raw); } catch { return null; }
  };

  {
    const proc = run(['refero', 'search', 'fintech', '--limit', '5']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].styleId,
      'netz: refero search fintech ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['magicui', 'get', 'marquee']);
    const blob = `${proc.stdout || ''}${proc.stderr || ''}`;
    zeile(
      proc.status === 0 && /Marquee/i.test(blob),
      'netz: magicui get marquee enthält Marquee',
      `exit ${proc.status}`,
    );
  }
  {
    const proc = run(['reactbits', 'list'], 120000);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 100,
      'netz: reactbits list ≥100',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
  {
    const proc = run(['navbar', 'list', 'mega-menu', '--limit', '10']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 5,
      'netz: navbar list mega-menu ≥5',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
  {
    const proc = run(['21st', 'search', 'hero', '--limit', '5']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && /21st\.dev\/@/.test(data[0]?.url || ''),
      'netz: 21st search hero ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log(NETZ ? 'Inspiration-Parser und Netz-Aufrufe stimmen.' : 'Inspiration-Parser und CLI stimmen.');
