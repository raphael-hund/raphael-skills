#!/usr/bin/env node
/**
 * run-struktur.mjs — alle Struktur-Wachen in einem Lauf.
 *
 * Der Skill hat 33 Evals. Sechs davon pruefen nicht das Ergebnis, sondern den
 * Skill selbst: stimmen die Zahlen, loesen die Verweise auf, haengt jeder
 * Pruefer am Tor, laufen zwei Kopien auseinander, steht jede Komponente im
 * Katalog, kann Raphael jeden Bericht lesen.
 *
 * Sie alle einzeln zu kennen ist eine Zumutung — und wer eine vergisst, merkt
 * es erst, wenn die Doku laengst luegt. Zusammen brauchen sie unter einer
 * Minute (gemessen 31.07.2026: 15 Sekunden, davon 15 fuer die Verweise).
 *
 * NICHT dabei: alles, was Browser oder Server braucht (Anti-Set, craft,
 * formular, axe, sweep). Das sind Minuten bis Stunden und gehoert in einen
 * eigenen Lauf — sonst faehrt diesen hier auch niemand.
 *
 *   node evals/run-struktur.mjs
 *
 * Exit 0 = jede Wache gruen. Exit 1 = mindestens eine reisst.
 * Exit 2 = eine konnte nicht urteilen (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));

const WACHEN = [
  ['run-doku-zahlen.mjs', 'verspricht die Doku den echten Umfang?'],
  ['run-verweise-check.mjs', 'loest jeder Pfad und jeder loads-Eintrag auf?'],
  ['run-naht-check.mjs', 'haengt jeder Pruefer am Tor und wird er ausgeloest?'],
  ['run-zwillinge-check.mjs', 'laufen zwei Kopien derselben Datei auseinander?'],
  ['run-katalog-check.mjs', 'steht jede Komponente im Katalog?'],
  ['run-sprache-check.mjs', 'kann Raphael jeden Bericht lesen?'],
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

console.log('\nStruktur-Wachen — stimmt der Skill mit sich selbst ueberein?\n');

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
console.log('Der Skill stimmt mit sich selbst ueberein.');
