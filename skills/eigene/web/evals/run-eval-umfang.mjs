#!/usr/bin/env node
/**
 * run-eval-umfang.mjs — hat jede Eval ueberhaupt noch ihre Faelle?
 *
 * LAUFZEIT: rund 13 Minuten (782s gemessen 02.08.2026). Sie faehrt 37 Evals
 * nacheinander — das ist der Preis, kein Defekt. Wer sie ohne diese Angabe
 * startet, haelt sie nach fuenf Minuten fuer haengen geblieben und bricht ab.
 * Fuer den schnellen Blick reicht run-struktur.mjs (13s, dreimal gemessen),
 * das sie bewusst
 * NICHT enthaelt.
 *
 * Befund 30.07.2026: keine der 26 Evals prueft, ob sie ueberhaupt etwas
 * durchlaufen hat. Nachgemessen an run-motion-check.mjs — die Fall-Liste
 * geleert, und der Lauf meldete:
 *
 *     6/6 wie erwartet.   Exit 0
 *
 * Die sechs kamen aus dem Verdrahtungs-Abschnitt; die neun Regel-Faelle waren
 * still verschwunden. Genau dieselbe Falle wie in meinem eigenen Sabotage-Test
 * eine Stunde vorher ("Ran 0 tests" = Erfolg) und wie bei den Werkzeugen selbst
 * (Slop-Scan ueber 0 Dateien, Sweep ohne Bilder, axe ohne gelaufene Regeln).
 *
 * Das Muster ist immer dasselbe: **nichts geprueft sieht aus wie sauber
 * geprueft**. Diese Datei ist die Wache dagegen, eine Ebene hoeher.
 *
 * Sie haelt fest, wie viele Faelle jede Eval MINDESTENS melden muss. Die Zahlen
 * sind kein Selbstzweck: sinkt eine, wurde entweder ein Fall geloescht (dann
 * gehoert die Zahl bewusst angepasst) oder eine Liste ist still leergelaufen
 * (dann ist es genau der Fall, den diese Datei fangen soll).
 *
 * Bewusst KEINE Obergrenze: neue Faelle sind erwuenscht und sollen nicht
 * jedesmal hier nachgetragen werden muessen.
 *
 *   node evals/run-eval-umfang.mjs
 *   node evals/run-eval-umfang.mjs --aktualisieren   # Zahlen neu einlesen
 *
 * Exit 0 = jede Eval meldet mindestens ihre Fallzahl. Exit 1 = eine ist
 * geschrumpft. Exit 2 = eine Eval lief gar nicht.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { umfangPruefen } from './lib/eval-umfang.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));

// Evals, die hier NICHT mitlaufen, mit Grund. Ohne diese Liste sieht "alle
// geprueft" nach Vollstaendigkeit aus, obwohl drei fehlen.
const AUSGENOMMEN = {
  'run-sabotage.mjs': 'beschaedigt Pruefer (gemessen 31.07.2026: 3:31) — eigener Lauf',
  'run-eval-umfang.mjs': 'diese Datei',
  'run-antiset.mjs': 'braucht Browser + Server (gemessen 31.07.2026: 7:54)',
  'run-zahlen-gegen-lauf.mjs': 'faehrt selbst vier Evals — hier liefe jede doppelt',
};

process.exit(umfangPruefen({
  evalOrdner: HIER,
  standDatei: path.join(HIER, 'eval-umfang.json'),
  ausgenommen: AUSGENOMMEN,
  cwd: path.join(HIER, '..'),
  aktualisieren: process.argv.includes('--aktualisieren'),
}));
