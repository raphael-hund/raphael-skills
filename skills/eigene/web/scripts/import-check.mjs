#!/usr/bin/env node
// import-check.mjs — jeder Import aus einer Tresor-Library muss dort wirklich existieren.
//
//   node import-check.mjs --src <projekt>          # scannt .ts/.tsx/.js/.jsx
//   node import-check.mjs --src <projekt> --json
//
// Warum: Modelle erfinden Exportnamen. `import { ToastProvider } from 'sonner'`
// sieht plausibel aus, existiert aber nicht — der Build stirbt erst spaeter, oder
// (bei JS ohne Typen) die Komponente ist zur Laufzeit `undefined`. Dieses Skript
// vergleicht jeden benannten Import gegen die echten Exporte aus dem Tresor.
//
// Exit 0 = kein erfundener Import gefunden (oder nichts zu pruefen).
// Exit 1 = mindestens ein Import existiert nicht.
// Exit 2 = Pruefer selbst kaputt (Tresor fehlt, Ordner fehlt) — bewusst KEIN Pass.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const JSON_OUT = args.includes('--json');

const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';
const SRC = get('src', '.');

if (!existsSync(SRC)) {
  console.error(`Ordner fehlt: ${SRC}`);
  process.exit(2);
}
if (!existsSync(join(VAULT, 'package.json'))) {
  console.error(`Kein Tresor unter ${VAULT} — ohne echte Exporte kann nichts geprueft werden.`);
  process.exit(2);
}

const TRESOR_LIBS = Object.keys(
  JSON.parse(readFileSync(join(VAULT, 'package.json'), 'utf8')).dependencies || {}
);

// --- echte Exporte einer Library lesen ------------------------------------
// Bewusst dieselbe grobe Extraktion wie lib-lookup.mjs: es geht um die Namen,
// nicht um vollstaendiges Typ-Parsing.
const TYPE_KANDIDATEN = [
  'dist/index.d.ts', 'index.d.ts', 'dist/index.d.mts',
  'types/index.d.ts', 'dist/types/index.d.ts', 'lib/index.d.ts',
];

function typenDatei(lib) {
  const base = join(VAULT, 'node_modules', lib);
  let entry = null;
  try {
    const pj = JSON.parse(readFileSync(join(base, 'package.json'), 'utf8'));
    entry = pj.types || pj.typings || null;
  } catch { /* Kandidatenliste reicht */ }
  for (const k of entry ? [entry, ...TYPE_KANDIDATEN] : TYPE_KANDIDATEN) {
    const p = join(base, k.replace(/^\.\//, ''));
    if (existsSync(p)) return p;
  }
  return null;
}

function exporte(lib) {
  const dts = typenDatei(lib);
  if (!dts) return null;              // null = unpruefbar, NICHT leere Menge
  const text = readFileSync(dts, 'utf8');
  const namen = new Set();
  for (const m of text.matchAll(/^export\s*\{([^}]+)\}/gm)) {
    for (const teil of m[1].split(',')) {
      const n = teil.trim().split(/\s+as\s+/).pop().trim();
      if (n && n !== 'type') namen.add(n.replace(/^type\s+/, ''));
    }
  }
  for (const m of text.matchAll(/^export\s+(?:declare\s+)?(?:const|function|class|type|interface|enum)\s+([A-Za-z0-9_$]+)/gm)) {
    namen.add(m[1]);
  }
  // Ein `export *` macht die Menge unvollstaendig — dann lieber gar nicht urteilen,
  // als einen echten Export faelschlich als erfunden zu melden.
  if (/^export\s+\*/m.test(text)) return null;
  return namen.size ? namen : null;
}

// --- Projektdateien einsammeln --------------------------------------------
const ENDUNGEN = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);
const RAUS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage']);

function dateien(dir, gesammelt = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') && e.name !== '.') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (RAUS.has(e.name)) continue;
      dateien(p, gesammelt);
    } else if (ENDUNGEN.has(extname(e.name)) && statSync(p).size < 2_000_000) {
      gesammelt.push(p);
    }
  }
  return gesammelt;
}

// --- benannte Imports aus einer Datei ziehen -------------------------------
// Nur `import { a, b as c } from 'lib'`. Default- und Namespace-Imports haben
// keinen pruefbaren Namen und werden bewusst uebersprungen.
function importe(text) {
  const raus = [];
  for (const m of text.matchAll(/import\s+(?:[\w$]+\s*,\s*)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const quelle = m[2];
    // Zeile aus der Fundstelle der import-Anweisung. Vorher wurde sie aus dem
    // ERSTEN Vorkommen des Namens im Dateitext berechnet — der steht aber meist
    // weiter unten, wo die Komponente benutzt wird. Ein Befund, der auf die
    // falsche Zeile zeigt, kostet beim Nachschauen mehr Zeit, als er spart.
    const zeile = text.slice(0, m.index).split('\n').length;
    for (const teil of m[1].split(',')) {
      const roh = teil.trim();
      if (!roh || roh.startsWith('type ')) continue;   // Typ-Imports: eigene Namensmenge
      const name = roh.split(/\s+as\s+/)[0].trim();
      if (/^[A-Za-z_$][\w$]*$/.test(name)) raus.push({ name, quelle, zeile });
    }
  }
  return raus;
}

// Ein Import auf 'sonner/dist/x' gehoert zu 'sonner'. Subpath-Exporte haben eigene
// Typdateien, die wir hier nicht aufloesen — die werden uebersprungen, nicht geraten.
function libFuer(quelle) {
  const treffer = TRESOR_LIBS.filter((l) => quelle === l);
  return treffer[0] || null;
}

const alle = dateien(SRC);
const cache = new Map();
const befunde = [];
let geprueft = 0;

for (const f of alle) {
  let text;
  try { text = readFileSync(f, 'utf8'); } catch { continue; }
  for (const { name, quelle, zeile } of importe(text)) {
    const lib = libFuer(quelle);
    if (!lib) continue;
    if (!cache.has(lib)) cache.set(lib, exporte(lib));
    const bekannt = cache.get(lib);
    if (!bekannt) continue;            // unpruefbar → still lassen, nie raten
    geprueft++;
    if (!bekannt.has(name)) befunde.push({ datei: relative(SRC, f), zeile, name, lib });
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ geprueft, dateien: alle.length, befunde }, null, 2));
} else {
  console.log(`Import-Check — ${alle.length} Dateien, ${geprueft} Tresor-Imports geprueft`);
  if (!geprueft) console.log('Keine Library aus dem Tresor importiert — nichts zu pruefen.');
  for (const b of befunde) {
    console.log(`[FEHLT] ${b.datei}:${b.zeile} — "${b.name}" wird aus "${b.lib}" importiert, existiert dort aber nicht.`);
    console.log(`         Echte Exporte: node scripts/lib-lookup.mjs ${b.lib}`);
  }
  console.log(befunde.length
    ? `\n${befunde.length} erfundener Import. Der Build waere gestorben oder die Komponente zur Laufzeit undefined.`
    : '\nKein erfundener Import.');
}

process.exit(befunde.length ? 1 : 0);
