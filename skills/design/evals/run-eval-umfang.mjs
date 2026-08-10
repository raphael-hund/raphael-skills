#!/usr/bin/env node
/**
 * run-eval-umfang.mjs — hat jede design-Eval ueberhaupt noch ihre Faelle?
 *
 * Gegenstueck zum gleichnamigen Lauf im web-Skill, gemeinsamer Kern in
 * `../eigene/web/evals/lib/eval-umfang.mjs`.
 *
 * Befund 30.07.2026, hier genauso nachgemessen: die Fall-Liste in
 * run-detect-check.mjs geleert, und der Lauf meldete
 *
 *     2/2 wie erwartet.   Exit 0
 *
 * Die zwei kamen aus der Kontrollseite und der Design-System-Gegenprobe; die
 * siebzehn Regel-Faelle waren still verschwunden. Wer die Zeile liest, haelt die
 * Eval fuer bestanden — "nichts geprueft" sieht aus wie "sauber geprueft".
 *
 *   node evals/run-eval-umfang.mjs
 *   node evals/run-eval-umfang.mjs --aktualisieren
 *
 * Exit 0 = jede Eval meldet mindestens ihre Fallzahl. Exit 1 = eine ist
 * geschrumpft.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { umfangPruefen } from '../../eigene/web/evals/lib/eval-umfang.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));

const AUSGENOMMEN = {
  'run-sabotage.mjs': 'beschaedigt Detektoren — eigener Lauf',
  'run-eval-umfang.mjs': 'diese Datei',
  // Der Browser-Lauf startet einen eigenen Server auf festem Port. Zwei
  // gleichzeitige Laeufe kollidieren dort; er bleibt deshalb aussen vor und
  // wird einzeln gefahren.
  'run-browser-detect-check.mjs': 'eigener Server auf festem Port — einzeln fahren',
};

process.exit(umfangPruefen({
  evalOrdner: HIER,
  standDatei: path.join(HIER, 'eval-umfang.json'),
  ausgenommen: AUSGENOMMEN,
  cwd: path.join(HIER, '..'),
  aktualisieren: process.argv.includes('--aktualisieren'),
}));
