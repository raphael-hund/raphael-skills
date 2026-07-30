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
// Die Namensmenge kommt aus derselben Quelle, die lib-lookup.mjs anzeigt.
// Vorher hatte dieses Skript eine eigene, schwaechere Aufloesung: jedes
// `export * from` liess es aufgeben, also blieben sechs der 30 Libraries
// (u.a. zustand, date-fns, motion, leva) dauerhaft ungeprueft — bei Exit 0
// und der Schlusszeile "Kein erfundener Import".
import { pruefbareNamen, pfadTeilen } from './lib-exporte.mjs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const JSON_OUT = args.includes('--json');

const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';
const SRC = get('src', '.');

// Ein blanker Pfad ohne --src fiel bis zum 30.07.2026 still auf '.' zurueck.
// `node import-check.mjs /pfad/zum/projekt` pruefte dann den Ordner, in dem man
// gerade stand, und meldete darueber Exit 0 — ein gruenes Urteil ueber ein
// Projekt, das nie angesehen wurde. Genau die Klasse Fehler, gegen die dieses
// Skript gebaut ist: es sieht geprueft aus.
const streuner = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--src');
if (streuner.length) {
  console.error(`Pfad ohne --src uebergeben: ${streuner.join(' ')}`);
  console.error('So gemeint?  node import-check.mjs --src ' + streuner[0]);
  console.error('Ohne --src wuerde der aktuelle Ordner geprueft — das waere ein Urteil');
  console.error('ueber das falsche Projekt. Deshalb Abbruch statt Annahme.');
  process.exit(2);
}

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

// Ein Import auf `motion/react` gehoert zu `motion`, `@dnd-kit/core` ist selbst
// schon das Paket. Vorher verglich diese Funktion nur auf Gleichheit — damit
// passte `motion/react` auf keine Library, obwohl genau dieser Pfad in den
// References 75-mal steht. Der meistgelehrte Importpfad des Skills war der
// einzige, den der Pruefer nie ansah.
function libFuer(quelle) {
  const { paket } = pfadTeilen(quelle);
  return TRESOR_LIBS.includes(paket) ? paket : null;
}

const alle = dateien(SRC);
const cache = new Map();
const befunde = [];
// Ein Lauf ueber null Dateien ist kein sauberes Ergebnis. Auf einem leeren oder
// falsch angegebenen Ordner meldete dieses Skript "Kein erfundener Import" mit
// Exit 0 — gruen ueber nichts. motion-check und tastatur-check fangen genau das
// seit dem 29.07.2026 ab; hier fehlte es (gefunden 30.07.2026 beim Abklopfen
// aller Skripte auf dieselbe Luecke).
//
// Wichtig ist die Unterscheidung: NULL DATEIEN ist immer ein Pfadfehler.
// NULL TRESOR-IMPORTE ist dagegen legitim — ein Projekt darf ohne Library aus
// dem Tresor auskommen. Nur der erste Fall bricht ab.
if (alle.length === 0) {
  const meldung = `import-check hat 0 Dateien gelesen — zeigt --src auf den richtigen Ordner? (${SRC})`;
  if (JSON_OUT) console.log(JSON.stringify({ geprueft: 0, dateien: 0, befunde: [], fehler: meldung }, null, 2));
  else console.error(meldung);
  process.exit(1);
}

let geprueft = 0;

for (const f of alle) {
  let text;
  try { text = readFileSync(f, 'utf8'); } catch { continue; }
  for (const { name, quelle, zeile } of importe(text)) {
    const lib = libFuer(quelle);
    if (!lib) continue;
    // Nach Importpfad zwischenspeichern, nicht nach Paket: `motion` und
    // `motion/react` haben verschiedene Exportmengen (`AnimatePresence` gibt es
    // nur im zweiten). Ein Cache pro Paket wuerde die eine Menge fuer die
    // andere ausgeben und damit echte Importe als erfunden melden.
    if (!cache.has(quelle)) cache.set(quelle, pruefbareNamen(quelle));
    const bekannt = cache.get(quelle);
    if (!bekannt) continue;            // unpruefbar → still lassen, nie raten
    geprueft++;
    // `quelle` ist der Pfad, wie er im Code steht (`motion/react`) — das gehoert
    // in den Befund. `lib` ist das Paket (`motion`) — nur das versteht lib-lookup.
    if (!bekannt.has(name)) befunde.push({ datei: relative(SRC, f), zeile, name, quelle, lib });
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify({ geprueft, dateien: alle.length, befunde }, null, 2));
} else {
  console.log(`Import-Check — ${alle.length} Dateien, ${geprueft} Tresor-Imports geprueft`);
  if (!geprueft) console.log('Keine Library aus dem Tresor importiert — nichts zu pruefen.');
  for (const b of befunde) {
    console.log(`[FEHLT] ${b.datei}:${b.zeile} — "${b.name}" wird aus "${b.quelle}" importiert, existiert dort aber nicht.`);
    console.log(`         Echte Exporte: node scripts/lib-lookup.mjs ${b.lib}`);
  }
  console.log(befunde.length
    ? `\n${befunde.length} erfundener Import. Der Build waere gestorben oder die Komponente zur Laufzeit undefined.`
    : '\nKein erfundener Import.');
}

process.exit(befunde.length ? 1 : 0);
