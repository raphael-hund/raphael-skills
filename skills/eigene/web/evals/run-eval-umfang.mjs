#!/usr/bin/env node
/**
 * run-eval-umfang.mjs — hat jede Eval ueberhaupt noch ihre Faelle?
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
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const STAND = path.join(HIER, 'eval-umfang.json');
const AKTUALISIEREN = process.argv.includes('--aktualisieren');

// Evals, die hier NICHT mitlaufen, mit Grund. Ohne diese Liste sieht "alle
// geprueft" nach Vollstaendigkeit aus, obwohl drei fehlen.
const AUSGENOMMEN = {
  'run-sabotage.mjs': 'beschaedigt Pruefer und laeuft ~15 min — eigener Lauf',
  'run-eval-umfang.mjs': 'diese Datei',
  'run-antiset.mjs': 'braucht Browser + Server, laeuft ueber 20 min',
};

const evals = fs.readdirSync(HIER)
  .filter((f) => f.startsWith('run-') && f.endsWith('.mjs'))
  .filter((f) => !AUSGENOMMEN[f])
  .sort();

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// Die Schlusszeile jeder Eval hat die Form "N/M wie erwartet." oder
// "N/M Faelle wie erwartet." — daraus kommt die Zahl. Wer eine Eval ohne diese
// Zeile baut, faellt hier auf: "keine Fallzahl gefunden" ist ein Fehler, kein
// Sonderfall.
function fallzahl(datei) {
  let aus = '';
  try {
    aus = execFileSync('node', [path.join(HIER, datei)],
      { encoding: 'utf8', timeout: 900000, cwd: path.join(HIER, '..') });
  } catch (e) {
    aus = `${e.stdout || ''}${e.stderr || ''}`;
    if (!aus) return { fehlerText: `Lauf abgebrochen: ${String(e.message).split('\n')[0]}` };
  }
  const m = [...aus.matchAll(/^(\d+)\/(\d+)(?: Faelle)? wie erwartet\./gm)].pop();
  if (!m) {
    // Manche Evals melden anders (lib-lookup: "30 Libraries, jede mit einer
    // Aussage"; verweise-check: "Alle Verweise loesen auf"). Die haben keine
    // Fallzahl — das ist in Ordnung, aber es muss auffallen, wenn eine Eval,
    // die bisher eine hatte, plotzlich keine mehr meldet.
    const ersatz = aus.match(/^(\d+) Libraries, jede/m);
    if (ersatz) return { zahl: Number(ersatz[1]), form: 'Libraries' };
    if (/Alle Verweise loesen auf/.test(aus)) return { zahl: null, form: 'ohne Fallzahl' };
    // Nicht jede Eval schreibt eine Schlusszahl. run-lib-lookup.mjs etwa
    // protokolliert Zeile fuer Zeile mit "OK  <was>" und endet mit einem Satz.
    // Dann sind die OK-Zeilen die Faelle — und genau die sollen nicht still
    // weniger werden. Erster Versuch meldete hier "keine Fallzahl gefunden",
    // was formal stimmte und praktisch ein Fehlalarm war: die Eval ist in
    // Ordnung, nur ihre Ausgabeform ist eine andere.
    const okZeilen = (aus.match(/^OK\s{2,}/gm) || []).length;
    if (okZeilen > 0) return { zahl: okZeilen, form: 'OK-Zeilen' };
    return { fehlerText: 'keine Fallzahl in der Ausgabe gefunden' };
  }
  return { zahl: Number(m[2]), gruen: Number(m[1]), form: 'N/M' };
}

const alt = fs.existsSync(STAND) ? JSON.parse(fs.readFileSync(STAND, 'utf8')) : {};
const neu = {};

console.log('\nEval-Umfang — hat jede Eval noch ihre Faelle?\n');
console.log(`${evals.length} Evals, ${Object.keys(AUSGENOMMEN).length} ausgenommen (Gruende in der Datei).\n`);

for (const datei of evals) {
  const r = fallzahl(datei);
  if (r.fehlerText) {
    zeile(false, `${datei}: ${r.fehlerText}`);
    continue;
  }
  if (r.zahl === null) {
    zeile(true, `${datei}: ${r.form} (nichts zu zaehlen)`);
    continue;
  }
  neu[datei] = r.zahl;
  const erwartet = alt[datei];
  if (erwartet === undefined) {
    zeile(true, `${datei}: ${r.zahl} Faelle (neu aufgenommen)`);
  } else if (r.zahl < erwartet) {
    zeile(false, `${datei}: nur noch ${r.zahl} Faelle, erwartet mindestens ${erwartet}`,
      'entweder ein Fall wurde geloescht (dann Zahl mit --aktualisieren anpassen) '
      + 'oder eine Liste ist still leergelaufen');
  } else if (r.zahl > erwartet) {
    zeile(true, `${datei}: ${r.zahl} Faelle (${r.zahl - erwartet} mehr als zuletzt)`);
  } else {
    zeile(true, `${datei}: ${r.zahl} Faelle`);
  }
}

if (AKTUALISIEREN) {
  fs.writeFileSync(STAND, `${JSON.stringify(neu, null, 2)}\n`);
  console.log(`\nStand geschrieben: ${STAND}`);
} else if (!fs.existsSync(STAND)) {
  fs.writeFileSync(STAND, `${JSON.stringify(neu, null, 2)}\n`);
  console.log(`\nErster Lauf — Stand angelegt: ${STAND}`);
}

const gesamt = evals.length;
console.log(`\n${gesamt - fehler}/${gesamt} Evals mit vollem Umfang.`);
if (fehler) {
  console.log('Eine Eval ist geschrumpft oder meldet keine Fallzahl mehr.');
  process.exit(1);
}
console.log('Keine Eval hat still ihre Faelle verloren.');
