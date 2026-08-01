#!/usr/bin/env node
/**
 * run-struktur-design.mjs — alle Struktur-Wachen dieses Skills in einem Lauf.
 *
 * Der Name traegt den Skill statt nur "run-struktur": eine zweite Datei
 * gleichen Namens meldete run-zwillinge-check sofort als abweichende Kopie —
 * zu Recht, denn wer die eine liest, glaubt die andere zu kennen. Dieselbe
 * Lehre wie bei run-verweise-design und run-flag-wache-check.
 *
 * Der Skill hat 12 Evals. Vier davon pruefen nicht das Ergebnis, sondern den
 * Skill selbst: stimmen die Zahlen, loesen die Verweise auf, beantwortet jedes
 * Werkzeug --help, lehnt jedes ein vertipptes Flag ab.
 *
 * WARUM DIESE DATEI (Befund 01.08.2026)
 * Der web-Skill hat so einen Sammellauf seit dem 30.07.2026 — dieser hier
 * hatte keinen. Wer die design-Wachen fahren wollte, musste fuenf Dateinamen
 * kennen; wer eine vergass, merkte es nicht. Genau die Luecke, wegen der der
 * web-Sammellauf entstand.
 *
 * Nicht drin: run-eval-umfang — es faehrt selbst JEDE Eval des Skills, also
 * auch diese hier, und diese wieder es: der Lauf drehte sich im Kreis und lief
 * nach 900 Sekunden ins Timeout (gemessen 01.08.2026). Der web-Sammellauf hat
 * dasselbe nie getan, weil er eval-umfang von Anfang an nicht nennt. Wer
 * Sammellaeufe baut, muss wissen, welche Wache selbst sammelt.
 *
 * Ebenfalls nicht drin: run-detect-check, run-browser-detect-check,
 * run-variablen-check, run-dna-scaffold-check und run-sabotage. Die pruefen das ERGEBNIS der
 * Detektoren, nicht die Struktur — und run-sabotage beschaedigt dabei Dateien,
 * gehoert also nie in einen Sammellauf neben anderen.
 *
 * Laufzeit gemessen: rund 1:05 (doku-zahlen 60s, der Rest unter 4s).
 * Kein Browser, kein Server.
 *
 * Exit 0 = alle gruen. Exit 1 = mindestens eine hat einen Widerspruch
 * gefunden. Exit 2 = mindestens eine konnte nicht urteilen.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));

const WACHEN = [
  ['run-doku-zahlen.mjs', 'verspricht die Doku den echten Umfang?'],
  ['run-verweise-design.mjs', 'loest jeder Pfad auf, fehlt kein Import?'],
  ['run-hilfe-check.mjs', 'beantwortet jedes Werkzeug --help?'],
  ['run-flag-wache-check.mjs', 'lehnt jedes Werkzeug ein vertipptes Flag ab?'],
];

// Eine Wache, die es nicht mehr gibt, ist kein bestandener Lauf: sonst faellt
// dieser Sammellauf mit jeder geloeschten Datei stiller aus, bis er nichts
// mehr prueft und trotzdem gruen meldet.
const fehlend = WACHEN.filter(([d]) => !fs.existsSync(path.join(HIER, d)));
if (fehlend.length) {
  console.error(`\nFEHLER: ${fehlend.length} Wache(n) nicht gefunden: ${fehlend.map(([d]) => d).join(', ')}`);
  console.error('Umbenannt oder geloescht? Nicht geprueft, nicht bestanden.\n');
  process.exit(2);
}

console.log('\nStruktur-Wachen (design) — stimmt der Skill mit sich selbst ueberein?\n');

let rot = 0;
let unklar = 0;
for (const [datei, frage] of WACHEN) {
  const start = Date.now();
  let code = 0;
  let aus = '';
  try {
    aus = execFileSync('node', [path.join(HIER, datei)],
      { encoding: 'utf8', timeout: 900000, stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    code = e.status ?? 2;
    aus = `${e.stdout || ''}${e.stderr || ''}`;
  }
  const dauer = Math.round((Date.now() - start) / 1000);
  const marke = code === 0 ? 'OK  ' : code === 2 ? '?? ' : '!!  ';
  console.log(`  [${marke}] ${datei.padEnd(26)} ${dauer}s — ${frage}`);
  if (code !== 0) {
    // Die Schlusszeile der Wache nennt den Grund; sie ist die Zeile, die man
    // sonst einzeln nachfahren muesste.
    const letzte = aus.trim().split('\n').filter((z) => z.trim()).slice(-2);
    for (const z of letzte) console.log(`         ${z.trim()}`);
    if (code === 2) unklar++; else rot++;
  }
}

console.log(`\n${WACHEN.length - rot - unklar}/${WACHEN.length} Wachen gruen.`);
if (unklar) {
  console.log(`${unklar} konnte(n) nicht urteilen — uebersprungen ist nicht bestanden.`);
  process.exit(2);
}
if (rot) {
  console.log('Der Skill widerspricht sich selbst. Einzeln nachfahren, dort steht der Grund.');
  process.exit(1);
}
console.log('Der design-Skill stimmt mit sich selbst ueberein.');
