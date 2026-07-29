#!/usr/bin/env node
/**
 * run-budget-check.mjs — prueft die Budget-Eingabe des Gates.
 *
 * `--budget` ist die einzige Stelle, an der ein Aufrufer dem Tor sagen darf,
 * weniger streng zu sein. Genau deshalb ist sie der bequemste Weg zu falschem
 * Gruen: eine Datei, ein Zahlenwert, und das Tor winkt durch, was es sonst
 * gestoppt haette. Befund 29.07.2026 — die Stelle war vollstaendig ungeprueft.
 *
 * Dieser Lauf prueft `budgetLaden` in beide Richtungen:
 *   falsches Gruen  — vertippter Schluessel, kaputte Datei, falscher Typ duerfen
 *                     nicht still zu Standardwerten fuehren
 *   falsches Rot    — legitime Lockerungen und `_`-Kommentare muessen durchgehen
 *   Sichtbarkeit    — jede echte Lockerung muss gemeldet werden, sonst sieht ein
 *                     erkauftes Gruen aus wie ein verdientes
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-budget-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Gleiches Vorgehen wie run-kaputte-ausgaben.mjs / run-routen-check.mjs: das Gate
// ist ein Skript und laeuft beim Import sofort los. Wir schneiden die reine
// Funktion samt ihrer Konstante heraus. Wird eine davon umbenannt, schlaegt
// dieser Lauf fehl — auch das ist ein Signal.
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
const defTeil = schneide('const DEFAULT_BUDGET = {', '\n};\n');
const fnTeil = schneide('function budgetLaden(', '\n}\n');
if (!defTeil.includes('axeViolations') || !fnTeil.includes('budgetLaden')) {
  console.error('FEHLER: DEFAULT_BUDGET oder budgetLaden nicht sauber ausgeschnitten.');
  process.exit(1);
}

// process.exit(2) faengt der Lauf ab, statt selbst zu sterben. `fs` wird
// durchgereicht, weil budgetLaden die Datei selbst liest.
class Exit2 extends Error {}
const bauen = new Function('fs', 'console', 'process', `
  ${defTeil}
  ${fnTeil}
  return { budgetLaden, DEFAULT_BUDGET };
`);
let ausgabe = [];
const { budgetLaden, DEFAULT_BUDGET } = bauen(
  fs,
  { error: (...a) => ausgabe.push(a.join(' ')), log: (...a) => ausgabe.push(a.join(' ')) },
  { exit: (c) => { throw new Exit2(String(c)); } },
);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'budget-check-'));
const datei = (name, inhalt) => {
  const p = path.join(tmp, name);
  fs.writeFileSync(p, typeof inhalt === 'string' ? inhalt : JSON.stringify(inhalt));
  return p;
};

// --- Faelle ---------------------------------------------------------------
// `code: 2` heisst: das Tor muss abbrechen. `gelockert` heisst: es laeuft weiter,
// muss die Lockerung aber melden.
const ABLEHNEN = [
  { was: 'vertippter Schluessel (axeViolation)', inhalt: { axeViolation: 99 } },
  { was: 'erfundener Schluessel',                inhalt: { egal: 1 } },
  { was: 'kaputtes JSON',                        inhalt: '{ kaputt' },
  { was: 'leere Datei',                          inhalt: '' },
  { was: 'JSON ist eine Liste',                  inhalt: [1, 2] },
  { was: 'JSON ist null',                        inhalt: 'null' },
  { was: 'JSON ist eine Zahl',                   inhalt: '7' },
  { was: 'Wert ist ein String',                  inhalt: { axeViolations: '5' } },
  { was: 'Wert ist null',                        inhalt: { axeViolations: null } },
  { was: 'Wert ist true',                        inhalt: { brokenLinks: true } },
  { was: 'Wert ist NaN-artig (Infinity)',        inhalt: '{"brokenLinks": 1e999}' },
];

const ANNEHMEN = [
  { was: 'keine Datei -> Standard',        pfad: null,                                     gelockert: [] },
  { was: '_Kommentare werden ignoriert',   inhalt: { _warum: 'Text', _befund: 'mehr Text' }, gelockert: [] },
  { was: 'echte Lockerung: mehr Verstoesse', inhalt: { axeViolations: 3 },                 gelockert: ['axeViolations'] },
  { was: 'echte Lockerung: Tempo aus',     inhalt: { lighthousePerformance: 0 },           gelockert: ['lighthousePerformance'] },
  { was: 'Verschaerfung meldet keine Lockerung', inhalt: { lighthousePerformance: 0.99 },  gelockert: [] },
  { was: 'gleicher Wert ist keine Lockerung',    inhalt: { axeViolations: 0 },             gelockert: [] },
  { was: 'Anti-Set-Budget wie es real benutzt wird',
    inhalt: { _warum: 'Kommentar', _befund: 'Kommentar', lighthousePerformance: 0 },
    gelockert: ['lighthousePerformance'] },
];

let rot = 0;
const sag = (s) => console.log(s);

sag(`Budget-Check — Testdateien unter ${tmp}\n`);
sag('Diese Eingaben MUESSEN das Tor stoppen (Exit 2, nicht Exit 1):\n');

for (const f of ABLEHNEN) {
  ausgabe = [];
  const p = datei(`${f.was.replace(/\W+/g, '_')}.json`, f.inhalt);
  let ergebnis;
  try {
    const r = budgetLaden(p);
    ergebnis = `durchgelassen (budget.axeViolations=${r.budget.axeViolations})`;
  } catch (e) {
    ergebnis = e instanceof Exit2 ? `Exit ${e.message}` : `Absturz: ${e.message}`;
  }
  const ok = ergebnis === 'Exit 2';
  if (!ok) rot++;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (!ok) sag(`         erwartet Exit 2, bekommen: ${ergebnis}`);
  else if (ausgabe.length) sag(`         ${ausgabe[0]}`);
}

sag('\nDiese muessen durchgehen — und jede echte Lockerung muss gemeldet werden:\n');

for (const f of ANNEHMEN) {
  ausgabe = [];
  const p = 'pfad' in f ? f.pfad : datei(`ok_${f.was.replace(/\W+/g, '_')}.json`, f.inhalt);
  let r, fehler = null;
  try { r = budgetLaden(p); } catch (e) { fehler = e instanceof Exit2 ? `Exit ${e.message}` : e.message; }
  const gemeldet = fehler ? [] : r.gelockert.map((z) => z.split(':')[0]);
  const ok = !fehler
    && gemeldet.length === f.gelockert.length
    && f.gelockert.every((k) => gemeldet.includes(k));
  if (!ok) rot++;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwartet gestoppt: ${fehler}`);
  else if (!ok) sag(`         Lockerung erwartet [${f.gelockert.join(', ')}], gemeldet [${gemeldet.join(', ')}]`);
  else if (r.gelockert.length) sag(`         gemeldet: ${r.gelockert.join(' | ')}`);
}

// Gegenprobe auf die Standardwerte selbst: haette jemand DEFAULT_BUDGET
// aufgeweicht, waeren alle Faelle oben weiterhin gruen und trotzdem waere das
// Tor stumpf. Die harten Werte stehen in SKILL.md completion_criteria.
sag('\nDie Standardwerte selbst duerfen nicht heimlich aufgeweicht sein:\n');
const HART = { axeViolations: 0, brokenLinks: 0, slopScore: 0, lighthouseAccessibility: 1, lighthouseSeo: 1 };
for (const [k, soll] of Object.entries(HART)) {
  const ok = DEFAULT_BUDGET[k] === soll;
  if (!ok) rot++;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${k} = ${DEFAULT_BUDGET[k]}${ok ? '' : ` — erwartet ${soll}`}`);
}

const gesamt = ABLEHNEN.length + ANNEHMEN.length + Object.keys(HART).length;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Ueber --budget laesst sich Gruen erkaufen, ohne dass es auffaellt. Erst reparieren.');
  process.exit(1);
}
sag('Ein gelockertes Budget kommt nicht unbemerkt durch.');
