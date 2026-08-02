#!/usr/bin/env node
// run-exit-vertrag-check.mjs — heisst der Exit-Code bei jedem Werkzeug dasselbe?
//
// LAUFZEIT: 20s (gemessen 02.08.2026) — drei Werkzeuge auf zwei kleinen Ordnern.
//
//   node evals/run-exit-vertrag-check.mjs
//
// WARUM (Befund 02.08.2026)
// In diesen Skills gilt durchgehend: 0 = bestanden, 1 = geprueft und
// durchgefallen, 2 = gar nicht erst geprueft. Der Unterschied zwischen 1 und 2
// ist der wichtigste, den es hier gibt — "nichts geprueft" darf nie wie
// "sauber" aussehen.
//
// Nachgemessen an einer CSS-Datei mit drei eingebauten Tells:
//   scan-ai-slop.mjs   3 Treffer gedruckt, Exit 0
//   detect.mjs         3 Funde gedruckt,   Exit 2
//
// Zwei Werkzeuge desselben Skills, dieselbe Datei, dieselbe Befundlage — und
// zwei verschiedene Exit-Codes, von denen KEINER die 1 ist. Schlimmer noch:
// detect.mjs benutzt die 2 auch fuer "nicht scannbar" (cli/main.mjs Zeile 351
// gegen 365). Dieselbe Zahl bedeutet dort "durchgefallen" UND "gar nicht
// geprueft" — genau die Verwechslung, gegen die der ganze Vertrag existiert.
//
// Praktisch geworden ist das in references/qa-faecher.md: dort stand
// "detect.mjs + scan-ai-slop.mjs je Exit 0" als Ship-Bedingung. Fuer
// scan-ai-slop ist das nichtssagend, weil es IMMER 0 liefert. Wer der Zeile
// folgt, hakt das Fach ab, ohne je einen Fund gesehen zu haben.
//
// WAS DIESE EVAL PRUEFT
// Sie fixiert den gemessenen Ist-Zustand, statt ihn zu erzwingen: die beiden
// Werkzeuge sind vendoriert (siehe eigene/web/VENDORING.md), ihr Exit-Verhalten
// zu aendern hiesse, bei jedem Update zu kollidieren. Was diese Wache leistet,
// ist ein Alarm bei stiller AENDERUNG — und ein Ort, an dem der Sonderfall
// schriftlich steht, statt in einer Kommentarzeile im Tor zu verstecken.
//
//   1. saubere Datei -> jedes Werkzeug Exit 0
//   2. Datei mit Tells -> jedes Werkzeug NICHT 0 oder ein Fund im Text
//   3. Zielordner existiert nicht -> Exit 2 ("gar nicht erst geprueft")
//   4. qa-faecher.md macht "Exit 0" nicht zum Kriterium fuer ein Werkzeug,
//      das immer 0 liefert
//
// Exit 0 = jeder Vertrag gilt wie gemessen. Exit 1 = einer hat sich geaendert.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wegwerfOrdner, altlastWeg } from '../../eigene/web/evals/lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const QA = path.join(HIER, '..', '..', 'eigene', 'web', 'references', 'qa-faecher.md');
const FRIST_MS = 60000;

altlastWeg('exit-vertrag-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Der gemessene Ist-Zustand vom 02.08.2026. Aendert ein Update das Verhalten,
// schlaegt diese Wache an — und dann wird hier entschieden, nicht geraten.
// beiFehlendemZiel: hier steht bewusst NICHT ueberall die 2. scan-ai-slop.mjs
// endet mit 1 (Zeile 593: "Scan root must be an existing directory"). Das ist
// vendorierter Code, und VENDORING.md warnt ausdruecklich davor, ihn
// anzufassen — jede Aenderung wird beim naechsten Update zum Konflikt. Beide
// Codes bedeuten "kein sauberer Lauf", die 1 ist hier also nicht gefaehrlich,
// nur uneinheitlich. Sie steht als Zahl da, damit eine STILLE Verschiebung
// auf 0 auffaellt — das waere die gefaehrliche Richtung.
const WERKZEUGE = [
  { name: 'detect.mjs', beiFund: 2, beiFehlendemZiel: 2 },
  { name: 'scan-ai-slop.mjs', beiFund: 0, beiFehlendemZiel: 1, immerNull: true },
];

const fehlend = WERKZEUGE.filter((w) => !fs.existsSync(path.join(SKRIPTE, w.name)));
if (fehlend.length) {
  console.error(`Werkzeug fehlt: ${fehlend.map((w) => w.name).join(', ')}`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

const ORDNER = wegwerfOrdner('exit-vertrag-');
const MIT_TELLS = path.join(ORDNER, 'tells');
const SAUBER = path.join(ORDNER, 'sauber');
fs.mkdirSync(MIT_TELLS, { recursive: true });
fs.mkdirSync(SAUBER, { recursive: true });

// Drei Tells, die beide Werkzeuge kennen: Verlauf im Text, Indigo-Violett,
// Bounce-Kurve. Wenn eine Regel wegfaellt, faellt Punkt 2 auf.
fs.writeFileSync(path.join(MIT_TELLS, 'x.css'),
  '.a { background: linear-gradient(90deg,#6366f1,#a855f7);'
  + ' -webkit-background-clip: text; color: transparent; }\n'
  + '.b { transition: all .3s cubic-bezier(.68,-0.55,.265,1.55); }\n');
fs.writeFileSync(path.join(SAUBER, 'y.css'),
  '.a { color: #222; transition: opacity .15s ease; }\n');

const laufen = (name, ziel) => spawnSync('node', [path.join(SKRIPTE, name), ziel],
  { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024 });

console.log(`Exit-Vertrag — ${WERKZEUGE.length} Werkzeuge\n`);
console.log('0 = bestanden, 1 = durchgefallen, 2 = gar nicht erst geprueft:\n');

for (const { name, beiFund, beiFehlendemZiel, immerNull } of WERKZEUGE) {
  // 1. Saubere Datei: Exit 0. Ein Werkzeug, das ueberall etwas findet, wird
  //    abgeschaltet statt benutzt.
  const rein = laufen(name, SAUBER);
  if (rein.error && rein.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} auf sauberer Datei`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(rein.status === 0, `${name}: saubere Datei -> Exit 0`,
      `Exit ${rein.status} auf einer sauberen Datei — das Werkzeug findet ueberall etwas`);
  }

  // 2. Datei mit Tells: der gemessene Code, UND ein sichtbarer Fund im Text.
  //    Der Code allein genuegt nicht: bei scan-ai-slop ist er immer 0, dort
  //    ist der gedruckte Fund der einzige Beweis, dass ueberhaupt etwas lief.
  const fund = laufen(name, MIT_TELLS);
  const ausF = `${fund.stdout || ''}${fund.stderr || ''}`;
  const sichtbar = /gradient-text|bounce|ai-color|slop \d|anti-pattern/i.test(ausF);
  if (fund.error && fund.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} auf Tells`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(fund.status === beiFund && sichtbar,
      `${name}: Tells -> Exit ${beiFund} und sichtbarer Fund`,
      fund.status !== beiFund
        ? `Exit ${fund.status} statt ${beiFund} — der Vertrag hat sich geaendert, qa-faecher.md und g1-gate.mjs pruefen`
        : 'Exit stimmt, aber kein Fund im Text — dann ist der Code die einzige Spur');
  }

  // 3. Ziel gibt es nicht: Exit 2. "Nichts gelesen" darf nie wie "sauber"
  //    aussehen — das ist der Kern des ganzen Vertrags.
  const weg = laufen(name, path.join(ORDNER, 'gibt-es-nicht'));
  zeile(weg.status === beiFehlendemZiel, `${name}: fehlendes Ziel -> Exit ${beiFehlendemZiel}`,
    weg.status === 0
      ? 'Exit 0 fuer einen Ordner, den es nicht gibt — die stillste Form von kaputt'
      : `Exit ${weg.status} statt ${beiFehlendemZiel} — der gemessene Vertrag hat sich verschoben`);

  // 4. GAR KEIN Argument: immer Exit 2, unabhaengig vom Werkzeug. Das ist ein
  //    anderer Fall als ein Pfad, den es nicht gibt — dort hat der Aufrufer
  //    etwas gemeint und sich vertan, hier hat er nichts gesagt.
  //
  //    Befund 31.07.2026: `node scan-ai-slop.mjs` ohne Pfad scannte den Ordner,
  //    in dem man gerade stand ("scanned 30 files under ."), meldete Funde und
  //    endete mit Exit 0. Ein Bericht ueber das falsche Projekt, der aussieht
  //    wie einer ueber das richtige. Dasselbe Muster wie import-check (--src)
  //    und audit-clone (--project) im web-Skill.
  const ohne = spawnSync('node', [path.join(SKRIPTE, name)],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024 });
  zeile(ohne.status === 2, `${name}: gar kein Argument -> Exit ${ohne.status}`,
    ohne.status === 2 ? null
      : ohne.status === 0
        ? 'Exit 0 ohne jedes Ziel — dann wurde ein Standardordner gescannt, nicht das Projekt'
        : `Exit ${ohne.status} — ein unvollstaendiger Aufruf ist kein Qualitaetsurteil`);

  // 4. Nur fuer Werkzeuge, die IMMER 0 liefern: keine Doku darf ihren
  //    Exit-Code zum Bestehenskriterium machen.
  if (immerNull && fs.existsSync(QA)) {
    const qa = fs.readFileSync(QA, 'utf8');
    const rumpf = name.replace(/\.mjs$/, '');
    // Absatzweise, NICHT satzweise: der Dateiname enthaelt selbst einen Punkt,
    // und eine Trennung an Punkten schneidet mitten in "scan-ai-slop.mjs".
    // Gemessen 02.08.2026: die erste Fassung fand deshalb nur den Bruchstueck-
    // Satz "+ `scan-ai-slop." ohne "Exit 0" darin und blieb still — waehrend
    // die gesuchte Zeile zwei Zeilen weiter unten stand.
    //
    // Der Absatz DARF "Exit 0" enthalten, solange er erklaert, dass dieses
    // Werkzeug nicht daran gemessen wird. Gesucht ist die BEDINGUNG, also
    // "<name> ... Exit 0" ohne Verneinung dazwischen. Gemessen 02.08.2026:
    // ohne diese Ausnahme schlug die Wache auf ihre eigene Korrektur an —
    // ein Waechter, der die Reparatur als Schaden meldet, wird abgeschaltet.
    const entlastet = /IMMER mit Exit 0|nie sein Exit-Code|nicht sein Exit/i;
    const satz = qa.split(/\n\s*\n/)
      .find((s) => s.includes(rumpf) && /Exit 0/.test(s) && !entlastet.test(s));
    zeile(!satz, `qa-faecher.md macht ${name} nicht am Exit-Code fest`,
      `"${(satz || '').trim().slice(0, 90)}" — dieses Werkzeug liefert IMMER 0, `
      + 'die Bedingung ist damit immer erfuellt und prueft nichts');
  }
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Vertragspunkte gelten wie gemessen.`);
if (fehler) {
  console.log('Ein Exit-Code bedeutet nicht mehr, was die Doku annimmt.');
  process.exit(1);
}
console.log('Jeder Exit-Code bedeutet, was er bedeuten soll.');
