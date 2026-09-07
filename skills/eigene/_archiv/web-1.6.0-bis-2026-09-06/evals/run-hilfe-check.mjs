#!/usr/bin/env node
// run-hilfe-check.mjs — jedes Werkzeug mit CLI muss `--help` beantworten.
//
//   node evals/run-hilfe-check.mjs
//
// WARUM (Befund 31.07.2026)
// Beim Durchprobieren aller Skripte mit `--help` antworteten drei falsch:
//
//   g1-gate.mjs    'help' stand in der KNOWN-Flagliste, also galt --help als
//                  gueltig und wurde ignoriert — das Tor startete einen echten
//                  Lauf mit Browser und Lighthouse statt Hilfe zu zeigen. Ein
//                  ERLAUBTES Flag ohne Wirkung ist schlimmer als ein
//                  unbekanntes, weil die Flag-Wache es durchwinkt.
//   lib-lookup.mjs suchte '--help' als Library-Namen: '"--help" ist nicht im
//                  Tresor', Exit 1.
//   pruefstand.mjs lief bis zum Ordnerzugriff durch: 'Ordner fehlt: <cwd>',
//                  Exit 2.
//
// Die Klasse dahinter: ein Werkzeug, dessen Kopfkommentar einen Aufruf
// beschreibt, den es selbst nicht beantworten kann. Wer das Skript zum ersten
// Mal benutzt, tippt --help — und bekommt entweder eine irrefuehrende
// Fehlermeldung oder, schlimmer, einen echten Lauf mit Nebenwirkungen.
//
// PRUEFUNG
// Fuer jedes Skript mit einer `node <name>`-Aufrufzeile im Kopf:
//   1. Exit 0 (Hilfe ist kein Fehlerfall)
//   2. Ausgabe nennt den eigenen Dateinamen (also die richtige Hilfe, nicht
//      die eines anderen Werkzeugs)
//   3. Ausgabe binnen 20 Sekunden — wer laenger braucht, arbeitet statt zu
//      antworten
//
// Ausgenommen sind Skripte ohne Aufrufzeile im Kopf: Bibliotheken und
// Regeldateien (z.B. lib-exporte.mjs) haben keine CLI und sollen keine haben.
//
// Exit 0 = alle antworten. Exit 1 = mindestens eines nicht.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 20000;

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Nur Skripte mit einer eigenen Aufrufzeile im Kopf haben eine CLI.
//
// Auch scripts/web-clone/: 13 weitere Werkzeuge, die bis zum 31.07.2026 nicht
// mitgeprueft wurden. Sie beantworten --help alle korrekt (von Hand
// nachgesehen) — aber dasselbe galt fuer ihre Flags, bis der Flag-Waechter
// aufgeweitet wurde und zwei undokumentierte fand. Ein Ordner, den keine Eval
// betritt, ist kein sauberer Ordner, sondern ein ungeprüfter.
const CLONE = path.join(SKRIPTE, 'web-clone');
const sammeln = (ordner, praefix = '') => (fs.existsSync(ordner)
  ? fs.readdirSync(ordner)
    .filter((n) => n.endsWith('.mjs'))
    .filter((n) => {
      const kopf = fs.readFileSync(path.join(ordner, n), 'utf8').split('\n').slice(0, 25).join('\n');
      return kopf.includes(`node ${n}`) || kopf.includes(`/${n}`);
    })
    .map((n) => `${praefix}${n}`)
  : []);

const kandidaten = [...sammeln(SKRIPTE), ...sammeln(CLONE, 'web-clone/')].sort();

// Eine leere Kandidatenliste sieht wie ein sauberer Lauf aus — sie bedeutet
// aber, dass die Kopf-Erkennung kaputt ist, nicht dass alles stimmt.
// Untergrenze bewusst deutlich unter dem Ist-Stand (7 am 31.07.2026): sie soll
// stilles Nichtstun fangen, nicht bei jedem geloeschten Skript rot werden.
const MINDESTENS = 5;
if (kandidaten.length < MINDESTENS) {
  console.error(`Nur ${kandidaten.length} Werkzeuge mit CLI gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Die Erkennung ueber die Aufrufzeile im Kopf greift nicht mehr —');
  console.error('ohne sie prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

// Wer wird AUSSORTIERT? Die Untergrenze oben faengt "gar nichts", nicht
// "einer fehlt". Genau der Fall trat am 03.08.2026 ein: bilder.mjs hatte keine
// Aufrufzeile im Kopf, fiel damit still aus der Liste — und `--help` endete
// dort monatelang mit "Unbekanntes Kommando" und Exit 2, ohne dass diese Eval
// je Alarm schlug. Sie meldete 23/23 und meinte 23 von 25.
//
// Ein Werkzeug ohne CLI ist in Ordnung (lib-exporte.mjs ist ein Modul und sagt
// das selbst). Aber die Liste gehoert in den Bericht, damit niemand "alle
// geprueft" liest, wo "alle erkannten geprueft" gemeint ist.
{
  const alle = [];
  for (const [ordner, praefix] of [[SKRIPTE, ''], [CLONE, 'web-clone/']]) {
    if (!fs.existsSync(ordner)) continue;
    for (const n of fs.readdirSync(ordner)) {
      if (n.endsWith('.mjs')) alle.push(`${praefix}${n}`);
    }
  }
  const raus = alle.filter((n) => !kandidaten.includes(n)).sort();
  if (raus.length) {
    console.log(`  [i]    ${raus.length} ohne Aufrufzeile im Kopf, deshalb nicht geprueft:`);
    console.log(`         ${raus.join(', ')}`);
    console.log('         Modul ohne CLI? dann richtig. Sonst Aufrufzeile ergaenzen.');
    console.log('');
  }
}

console.log(`Hilfe-Check — ${kandidaten.length} Werkzeuge mit CLI\n`);

for (const name of kandidaten) {
  const r = spawnSync('node', [path.join(SKRIPTE, name), '--help'], {
    encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
  });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} --help`, `keine Antwort binnen ${FRIST_MS / 1000}s — arbeitet statt zu antworten`);
    continue;
  }
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (r.status !== 0) {
    zeile(false, `${name} --help`, `Exit ${r.status} — Hilfe ist kein Fehlerfall. Ausgabe: ${aus.trim().split('\n')[0].slice(0, 60)}`);
    continue;
  }
  // Die Hilfe muss den eigenen Namen nennen. Sonst koennte ein Werkzeug die
  // Hilfe eines anderen ausgeben und diese Eval merkte nichts.
  // Gegen den DATEINAMEN vergleichen, nicht gegen den Pfad: die
  // Klon-Werkzeuge heissen hier "web-clone/visual-diff.mjs", schreiben in
  // ihrer Hilfe aber "node scripts/visual-diff.mjs". Der Ordner-Praefix ist
  // unsere Buchhaltung, nicht ihre.
  const dateiname = path.basename(name);
  if (!aus.includes(dateiname)) {
    zeile(false, `${name} --help`, `Ausgabe nennt "${dateiname}" nicht — gehoert die Hilfe zu diesem Werkzeug?`);
    continue;
  }
  // Hilfe gehoert auf stdout. Wer sie auf stderr schreibt, zwingt jeden
  // Aufrufer zu `2>&1` — und in einer Kette landet sie im Fehlerkanal, wo
  // Werkzeuge nach Defekten suchen. Gefunden 31.07.2026: shot-sweep antwortete
  // auf --help mit "Unbekanntes Flag: --help" auf stderr, Exit 2.
  //
  // Nur WARNEN, nicht reissen: lib-exporte.mjs erklaert auf stderr, dass es ein
  // Modul und kein Werkzeug ist — das ist richtig so, es HAT keine Hilfe.
  if (!(r.stdout || '').includes(dateiname)) {
    console.log(`  [--]   ${name} --help schreibt auf stderr statt stdout`);
  }
  zeile(true, `${name} --help`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Werkzeuge beantworten --help.`);
process.exit(fehler ? 1 : 0);
