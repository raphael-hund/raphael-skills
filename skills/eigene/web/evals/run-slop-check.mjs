#!/usr/bin/env node
/**
 * run-slop-check.mjs — prueft, ob das Gate einen leeren Slop-Scan merkt.
 *
 * Befund 29.07.2026: `scan-ai-slop.mjs` auf einem Ordner ohne eine einzige
 * HTML-Datei meldet `{filesScanned: 0, hits: 0, findings: []}`. Das Gate machte
 * daraus "0 Slop-Tells", bestanden. Ein `--src`, das auf den Quellordner statt
 * auf den Build zeigt, auf einen Tippfehler oder auf ein leeres dist/, ergab
 * damit ein gruenes Urteil ueber nichts — dieselbe Zeile wie bei einer
 * tatsaechlich sauberen Seite.
 *
 * Dazu kommen drei aeltere Faelle als Regressionsschutz, alle schon behoben:
 *   {hits: 0, findings: [...]}   Zaehler kaputt, Funde da  (27.07.)
 *   {hits: 1, findings: []}      Funde gemeldet, keiner zuzuordnen (Sol, 27.07.)
 *   IDs als Zahl statt "01"      SLOP_BLOCK-Set faende den schlimmsten Fund nicht
 *
 * Braucht weder Browser noch Server noch den Scanner selbst.
 *
 *   node evals/run-slop-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

const quelle = fs.readFileSync(GATE, 'utf8');
function schneide(marke, schluss) {
  const a = quelle.indexOf(marke);
  if (a < 0) {
    console.error(`FEHLER: "${marke}" nicht im Gate gefunden — umbenannt?`);
    process.exit(1);
  }
  const b = quelle.indexOf(schluss, a);
  if (b < 0) {
    console.error(`FEHLER: Ende von "${marke}" nicht gefunden.`);
    process.exit(1);
  }
  return quelle.slice(a, b + schluss.length);
}

// slopMelden ruft `record(name, ok, detail)` auf. Wir reichen ein eigenes record
// hinein und lesen das Urteil ab, statt es aus der Konsolenausgabe zu fischen.
const bauen = new Function('record', 'BUDGET', `
  ${schneide('const SLOP_BLOCK = new Set(', '\n]);\n')}
  ${schneide('const slopId =', '\n')}
  ${schneide('function slopZaehlen(', '\n}\n')}
  ${schneide('function slopNamen(', '\n}\n')}
  ${schneide('function slopTeilen(', '\n}\n')}
  ${schneide('function slopMelden(', '\n}\n')}
  return slopMelden;
`);

function urteil(json) {
  let ergebnis = null;
  const record = (name, ok, detail) => { ergebnis = { ok, detail }; };
  bauen(record, { slopScore: 0 })(json);
  return ergebnis;
}

const gruppe = (id, name, treffer) => ({ id, name, hits: new Array(treffer).fill('x') });

// Muessen REISSEN.
const FALSCHES_GRUEN = [
  {
    was: 'Scanner hat 0 Dateien gelesen (falscher --src)',
    json: { filesScanned: 0, groups: 0, hits: 0, findings: [] },
  },
  {
    was: 'Zaehler meldet 0, Fundliste ist voll (27.07.)',
    json: { filesScanned: 12, hits: 0, findings: [gruppe('01', 'Indigo-Verlauf', 3)] },
  },
  {
    was: 'Funde gemeldet, keiner zuzuordnen (Sol, 27.07.)',
    json: { filesScanned: 12, hits: 1, findings: [] },
  },
  {
    was: 'ein BLOCK-Fund (Indigo-Violett-Verlauf)',
    json: { filesScanned: 12, hits: 2, findings: [gruppe('01', 'Indigo-Verlauf', 2)] },
  },
  {
    was: 'ID als Zahl statt "01" — darf den Blocker nicht verlieren',
    json: { filesScanned: 12, hits: 2, findings: [gruppe(1, 'Indigo-Verlauf', 2)] },
  },
  {
    was: 'unbekanntes Format (kein hits, kein findings)',
    json: { filesScanned: 12, ergebnis: 'ok' },
  },
];

// Muessen DURCHGEHEN.
const ECHT_SAUBER = [
  {
    was: 'echte 0 Tells auf 12 gelesenen Dateien',
    json: { filesScanned: 12, groups: 0, hits: 0, findings: [] },
  },
  {
    was: 'nur WARN-Funde (Kicker ueber jeder Ueberschrift)',
    json: { filesScanned: 12, hits: 3, findings: [gruppe('07', 'kicker above heading', 3)] },
  },
  {
    was: 'filesScanned fehlt ganz (aeltere Scanner-Version) + 0 Tells',
    json: { hits: 0, findings: [] },
  },
];

let rot = 0;
const sag = (z) => console.log(z);

sag('Slop-Check — kein Browser, kein Server, kein Scanner\n');
sag('Diese muessen reissen — sonst besteht ein Lauf ueber nichts:\n');
for (const f of FALSCHES_GRUEN) {
  const u = urteil(f.json);
  const bestanden = u !== null && u.ok === false;
  if (!bestanden) rot++;
  sag(`  [${bestanden ? 'OK' : 'ROT'}]   ${f.was}`);
  sag(`         ${u ? u.detail : 'kein Urteil gefaellt'}`);
}

sag('\nDiese muessen durchgehen — sonst ist das Tor nur in die andere Richtung kaputt:\n');
for (const f of ECHT_SAUBER) {
  const u = urteil(f.json);
  const bestanden = u !== null && u.ok === true;
  if (!bestanden) rot++;
  sag(`  [${bestanden ? 'OK' : 'ROT'}]   ${f.was}`);
  if (!bestanden) sag(`         ${u ? u.detail : 'kein Urteil gefaellt'}`);
}

const gesamt = FALSCHES_GRUEN.length + ECHT_SAUBER.length;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Der Slop-Check unterscheidet "nichts gefunden" nicht von "nichts gelesen".');
  process.exit(1);
}
sag('Ein Slop-Scan ohne eine einzige gelesene Datei besteht nicht mehr.');
