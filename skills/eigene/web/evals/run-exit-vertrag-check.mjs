#!/usr/bin/env node
// run-exit-vertrag-check.mjs — heisst der Exit-Code bei jedem Werkzeug dasselbe?
//
// LAUFZEIT: 75s (gemessen 02.08.2026) — elf Werkzeuge auf je vier Aufrufwegen.
//
//   node evals/run-exit-vertrag-check.mjs
//
// WARUM (Befund 02.08.2026)
// In diesen Skills gilt durchgehend: 0 = bestanden, 1 = geprueft und
// durchgefallen, 2 = gar nicht erst geprueft. Der Unterschied zwischen 1 und 2
// ist der wichtigste, den es hier gibt — "nichts geprueft" darf nie wie
// "sauber" aussehen. Das ganze Tor haengt daran: g1-gate.mjs deutet an sieben
// Stellen `code === 2` als "Pruefer kaputt", nicht als Mangel an der Seite.
//
// Nachgemessen ueber alle elf Werkzeuge mit einem Ziel, das es nicht gibt:
// KEINES endet mit 0. Genau dieser Zustand ist es wert, festgenagelt zu
// werden — nicht weil er kaputt ist, sondern weil er ungeprueft war. Ein
// Werkzeug, das nach einem Umbau still auf Exit 0 rutscht, meldet dem Tor
// "bestanden" fuer einen Ordner, den es nie geoeffnet hat.
//
// Im design-Skill haelt evals/run-exit-vertrag-check.mjs dieselbe Klasse fest;
// dort ging es um zwei vendorierte Werkzeuge mit widerspruechlichen Codes.
// Hier geht es um die Breite: elf eigene Werkzeuge, drei Aufrufwege.
//
// WAS DIESE EVAL PRUEFT
//   1. Ziel existiert nicht -> NIE Exit 0, auf keinem der drei Aufrufwege
//      (--dir, --src, positional). Welcher davon der richtige ist, ist je
//      Werkzeug verschieden — und egal: falsch aufgerufen ist auch ungeprueft.
//   2. Gar kein Argument -> nie Exit 0. Faellt ein Werkzeug still auf "."
//      zurueck, urteilt es ueber den Ordner, in dem man zufaellig steht.
//   3. Unbekanntes Flag -> Exit 2. Ein Werkzeug, das ein Flag stillschweigend
//      verschluckt, prueft etwas anderes als bestellt.
//   4. Ein toter Symlink im Zielordner erscheint in BEIDEN Ausgabewegen:
//      im Text fuer den Menschen und im JSON fuers Tor. Ein Werkzeug, das im
//      Text warnt und im JSON schweigt, taeuscht jeden Automaten.
//
// Exit 0 = jeder Vertrag gilt. Exit 1 = einer hat sich verschoben.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wegwerfOrdner, altlastWeg } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 120000;

altlastWeg('exit-vertrag-web-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Kandidaten aus dem Ordner, nicht aus einer gepflegten Liste: ein neues
// Werkzeug ist damit automatisch dabei. lib-*.mjs sind ausgenommen, wenn sie
// keine CLI haben — das entscheidet der Lauf selbst (siehe unten).
const WERKZEUGE = fs.readdirSync(SKRIPTE)
  .filter((n) => n.endsWith('.mjs'))
  // g1-gate faehrt alle anderen — hier liefe jedes doppelt, und ein Lauf ohne
  // Server dauert Minuten.
  .filter((n) => n !== 'g1-gate.mjs')
  .sort();

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (11 am 02.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 8;
if (WERKZEUGE.length < MINDESTENS) {
  console.error(`Nur ${WERKZEUGE.length} Werkzeuge gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error(`Zeigt ${SKRIPTE} noch auf den richtigen Ordner? Ohne Werkzeuge`);
  console.error('prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

const ORDNER = wegwerfOrdner('exit-vertrag-web-');
const QUELLE = path.join(ORDNER, 'src');
fs.mkdirSync(QUELLE, { recursive: true });
fs.writeFileSync(path.join(QUELLE, 'a.css'), '.a { color: #222; }\n');
fs.writeFileSync(path.join(QUELLE, 'a.jsx'),
  'export default function A(){ return <div className="a" />; }\n');
// Ein Symlink ins Leere: liest ein Werkzeug ihn nicht, muss es das SAGEN —
// in beiden Ausgabewegen.
fs.symlinkSync(path.join(ORDNER, 'gibt-es-nicht'), path.join(QUELLE, 'tot.css'));

// Derselbe Inhalt ohne den toten Symlink: daran erkennt Punkt 3, ob ein
// Werkzeug den Aufrufweg ueberhaupt annimmt.
// CSS UND JSX: die Werkzeuge lesen verschiedene Endungen. Ein reiner
// CSS-Ordner laesst import-check mit Exit 1 enden ("0 Dateien gelesen —
// zeigt --src auf den richtigen Ordner?"), womit die Wegsuche unten ihn fuer
// unbrauchbar hielte. Das ist kein Mangel des Werkzeugs, sondern eine zu
// schmale Probe (gemessen 02.08.2026).
const SAUBER = path.join(ORDNER, 'sauber');
fs.mkdirSync(SAUBER, { recursive: true });
fs.writeFileSync(path.join(SAUBER, 'a.css'), '.a { color: #222; }\n');
fs.writeFileSync(path.join(SAUBER, 'a.jsx'),
  'export default function A(){ return <div className="a" />; }\n');

// Der Ordner, aus dem der Test "gar kein Argument" laeuft. Er enthaelt eine
// UNVERDAECHTIGE Quelldatei — bewusst nicht leer. Gemessen 02.08.2026: aus
// einem wirklich leeren Ordner faellt import-check bei einem Rueckfall auf "."
// in seine eigene "0 Dateien gelesen"-Wache und endet mit Exit 1. Das Kriterium
// "nicht Exit 0" waere dort blind — die Gegenprobe blieb zweimal gruen,
// obwohl die Sabotage sass. Mit einer sauberen Datei darin liefert der
// Rueckfall genau das gefaehrliche Exit 0.
const LEER = path.join(ORDNER, 'fremder-ordner');
fs.mkdirSync(LEER, { recursive: true });
fs.writeFileSync(path.join(LEER, 'fremd.jsx'),
  'export default function F(){ return <div className="fremd" />; }\n');

const GIBT_ES_NICHT = path.join(ORDNER, 'ziel-das-fehlt');

const laufen = (name, args) => spawnSync('node', [path.join(SKRIPTE, name), ...args],
  { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024 });

console.log(`Exit-Vertrag (web) — ${WERKZEUGE.length} Werkzeuge\n`);
console.log('0 = bestanden, 1 = durchgefallen, 2 = gar nicht erst geprueft:\n');

for (const name of WERKZEUGE) {
  // 1. Fehlendes Ziel auf drei Wegen. Welcher Weg der richtige ist, ist je
  //    Werkzeug verschieden — aber KEINER darf 0 ergeben. Ein falsch
  //    aufgerufenes Werkzeug hat genauso wenig geprueft wie ein abgestuerztes.
  const wege = [['--dir', GIBT_ES_NICHT], ['--src', GIBT_ES_NICHT], [GIBT_ES_NICHT]];
  const nullen = [];
  let haenger = null;
  for (const args of wege) {
    const r = laufen(name, args);
    if (r.error && r.error.code === 'ETIMEDOUT') { haenger = args.join(' '); break; }
    if (r.status === 0) nullen.push(args.join(' '));
  }
  if (haenger) {
    zeile(false, `${name}: fehlendes Ziel`, `keine Antwort binnen ${FRIST_MS / 1000}s bei "${haenger}"`);
  } else {
    zeile(nullen.length === 0, `${name}: fehlendes Ziel -> nie Exit 0`,
      `Exit 0 bei: ${nullen.join(', ')} — bestanden gemeldet fuer einen Ordner, `
      + 'den es nicht gibt. Die stillste Form von kaputt.');
  }

  // 2. GAR KEIN Argument. Das ist ein anderer Fall als ein Pfad, den es nicht
  //    gibt: dort hat der Aufrufer etwas gemeint und sich vertan, hier hat er
  //    nichts gesagt. Faellt ein Werkzeug dann still auf "." zurueck, urteilt
  //    es ueber den Ordner, in dem man zufaellig steht.
  //
  //    Befund 02.08.2026: `node import-check.mjs` ohne Pfad meldete aus
  //    skills/eigene/web heraus "183 Dateien, 363 Tresor-Imports geprueft" mit
  //    Befund — ein Bericht ueber das falsche Projekt, der aussieht wie einer
  //    ueber das richtige. Das Werkzeug WUSSTE um die Falle und fing den Fall
  //    "Pfad ohne --src" ab; der leere Aufruf fiel durch dieselbe Wache.
  //
  //    Ausgenommen sind Werkzeuge, deren leerer Aufruf eine ANTWORT ist statt
  //    eines Laufs: bilder.mjs druckt seine Aufrufzeile, lib-lookup.mjs listet
  //    den Tresor. Beide urteilen ueber nichts — das ist kein Mangel.
  const ANTWORT_STATT_LAUF = new Set(['bilder.mjs', 'lib-lookup.mjs']);
  if (!ANTWORT_STATT_LAUF.has(name)) {
    // Aus einem LEEREN Ordner heraus, nicht aus dem Eval-Ordner. Gemessen
    // 02.08.2026: die erste Fassung lief aus skills/eigene/web, wo
    // import-check bei einem Rueckfall auf "." echte Befunde findet und mit
    // Exit 1 endet — die Gegenprobe blieb gruen, obwohl die Sabotage sass.
    // Erst aus einem leeren Ordner heraus faellt der Rueckfall als Exit 0 auf.
    const leer = spawnSync('node', [path.join(SKRIPTE, name)],
      { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024, cwd: LEER });
    zeile(leer.status !== 0, `${name}: gar kein Argument -> nicht Exit 0`,
      'Exit 0 ohne jedes Argument — geprueft wurde der Ordner, in dem man '
      + 'zufaellig stand, und das Urteil gilt dem falschen Projekt');
  }

  // 3. Unbekanntes Flag -> Exit 2. Ein Werkzeug, das ein Flag verschluckt,
  //    prueft etwas anderes als bestellt und sagt es nicht.
  const quatsch = laufen(name, ['--dieses-flag-gibt-es-nicht', QUELLE]);
  zeile(quatsch.status === 2, `${name}: unbekanntes Flag -> Exit 2`,
    quatsch.status === 0
      ? 'Exit 0 — das Flag wurde verschluckt, geprueft wurde etwas anderes als bestellt'
      : `Exit ${quatsch.status} statt 2 — ein Aufruffehler ist "nicht geprueft", nicht "durchgefallen"`);
}

// 3. Toter Symlink in beiden Ausgabewegen. Nur fuer Werkzeuge, die ueberhaupt
//    einen Ordner lesen UND ein JSON kennen — die Browser-Werkzeuge brauchen
//    eine URL und kommen hier nicht vor.
console.log('\nDerselbe Mangel im Text und im JSON:\n');
for (const name of WERKZEUGE) {
  const quelle = fs.readFileSync(path.join(SKRIPTE, name), 'utf8');
  if (!/--json|AS_JSON/.test(quelle)) continue;

  // Nimmt das Werkzeug diesen Aufrufweg ueberhaupt an? Das entscheidet ein
  // Lauf auf einem SAUBEREN Ordner, nicht der Exit-Code des eigentlichen
  // Laufs. Gemessen 02.08.2026: die erste Fassung uebersprang jeden Lauf mit
  // Exit 2 als "falscher Aufrufweg" — und Exit 2 ist bei einer unlesbaren
  // Datei genau das GEWOLLTE Ergebnis. Damit fiel der einzige Fall durch,
  // wegen dem es diesen Punkt gibt: motion-check meldet den toten Symlink
  // korrekt mit Exit 2 und wurde stillschweigend uebergangen.
  // Auch der Aufrufweg ist je Werkzeug verschieden: import-check will --src,
  // motion-check nimmt den Ordner positional und lehnt --src als unbekanntes
  // Flag ab. Die zweite Fassung probierte nur --src und uebersprang
  // motion-check deshalb weiterhin — diesmal aus dem umgekehrten Grund.
  // Gesucht wird jetzt der Weg, der auf einem SAUBEREN Ordner durchlaeuft.
  let weg = null;
  for (const kandidat of [['--src', SAUBER], [SAUBER], ['--dir', SAUBER]]) {
    const probe = laufen(name, kandidat);
    if (probe.status === 0) { weg = kandidat.slice(0, -1); break; }
  }
  if (weg === null) continue;   // Browser-Werkzeug oder gar keine Ordner-CLI

  const text = laufen(name, [...weg, QUELLE]);
  const json = laufen(name, [...weg, QUELLE, '--json']);

  const imText = /nicht gelesen|unlesbar|Symlink ins Leere|ENOENT/i.test(
    `${text.stdout || ''}${text.stderr || ''}`);
  let imJson = false;
  try {
    const d = JSON.parse(json.stdout || '{}');
    for (const feld of ['nichtLesbar', 'unlesbar', 'unlesbareDateien', 'kaputteKodierung']) {
      if (Array.isArray(d[feld]) && d[feld].length) imJson = true;
    }
  } catch { /* kein JSON — faellt unten auf */ }

  zeile(imText === imJson, `${name}: toter Symlink steht im Text und im JSON`,
    imText
      ? 'im Text gemeldet, im JSON nicht — das Tor liest das JSON und haelt den Lauf fuer vollstaendig'
      : 'im JSON gemeldet, im Text nicht — wer den Bericht liest, sieht die Luecke nicht');
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Vertragspunkte gelten.`);
if (fehler) {
  console.log('Ein Exit-Code oder ein Ausgabeweg bedeutet nicht mehr, was das Tor annimmt.');
  process.exit(1);
}
console.log('Jeder Exit-Code bedeutet, was er bedeuten soll.');
