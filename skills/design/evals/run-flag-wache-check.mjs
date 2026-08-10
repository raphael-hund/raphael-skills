#!/usr/bin/env node
/**
 * run-flag-wache-check.mjs — verwechselt ein Werkzeug einen Tippfehler mit
 * einem Befund?
 *
 * Umbenannt am 31.07.2026: der web-Skill hat eine gleichnamige Eval mit
 * anderem Inhalt (sie prueft 24 web-Werkzeuge, diese hier 3 design-Werkzeuge).
 * Zwei Dateien gleichen Namens mit verschiedenem Code sind genau das, wovor
 * run-zwillinge-check warnt: wer die eine liest, glaubt die andere zu kennen.
 *
 * Exit 1 heisst in diesem Skill "geprueft und durchgefallen", Exit 2 heisst
 * "konnte nicht urteilen". Ein unbekanntes Flag gehoert eindeutig in die
 * zweite Gruppe: das Werkzeug hat nichts angesehen.
 *
 * Befund 31.07.2026: `detect.mjs --quatsch` gab GAR NICHTS aus und endete mit
 * Exit 0. Die Argument-Zeile filterte alles mit fuehrendem "-" als "kein Pfad"
 * heraus. Ein Tippfehler sah damit aus wie "geprueft und sauber" — bei einem
 * Werkzeug, das laut completion_criteria eine harte Ship-Bedingung ist.
 *
 * Das Gegenstueck zur gleichnamigen Eval im web-Skill; dort deckte derselbe
 * Lauf acht Werkzeuge auf.
 *
 *   node evals/run-aufruffehler-check.mjs
 *
 * Exit 0 = jedes Werkzeug lehnt sauber ab. Exit 1 = mindestens eines nicht.
 * Exit 2 = keine Werkzeuge gefunden (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const UNBEKANNT = '--diesesflaggibtsnichtxyz';
const FRIST_MS = 30000;

// rules.de.mjs ist ein Regelsatz, den scan-ai-slop laedt — kein Werkzeug mit
// eigener Kommandozeile. Es direkt aufzurufen ist kein sinnvoller Fall.
const KEINE_CLI = new Set(['rules.de.mjs']);

// Die Ausnahmeliste selbst pruefen: ein Eintrag fuer eine Datei, die es nicht
// mehr gibt, macht sie zur Muellhalde und deckt spaeter eine echte Luecke zu.
// Dieselbe Wache haengt an jeder anderen Ausnahmeliste beider Skills.
{
  const tot = [...KEINE_CLI].filter((n) => !fs.existsSync(path.join(SKRIPTE, n)));
  if (tot.length) {
    console.error(`\n${tot.length} Ausnahme(n) ohne Datei: ${tot.join(', ')}`);
    console.error('Entfernt oder umbenannt? Die Liste muss mitgezogen werden — sonst');
    console.error('steht dort spaeter eine Begruendung fuer etwas, das es nicht gibt.\n');
    process.exit(2);
  }
}

const werkzeuge = fs.existsSync(SKRIPTE)
  ? fs.readdirSync(SKRIPTE).filter((n) => n.endsWith('.mjs') && !KEINE_CLI.has(n)).sort()
  : [];

// Eine leere Liste sieht wie ein sauberer Lauf aus.
const MINDESTENS = 2;
if (werkzeuge.length < MINDESTENS) {
  console.error(`Nur ${werkzeuge.length} Werkzeug(e) gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

let fehler = 0;
let gezaehlt = 0;
const zeile = (ok, was, detail) => {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
};

console.log('\nEin unbekanntes Flag heisst: nichts geprueft. Also Exit 2, nicht 1:\n');

for (const name of werkzeuge) {
  const r = spawnSync('node', [path.join(SKRIPTE, name), UNBEKANNT], {
    encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
  });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, name, `keine Antwort binnen ${FRIST_MS / 1000}s — arbeitet, statt abzulehnen`);
    continue;
  }
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (r.status !== 2) {
    zeile(false, name, r.status === 1
      ? 'Exit 1 heisst "geprueft und durchgefallen" — geprueft wurde aber nichts'
      : `Exit ${r.status} — ein abgelehnter Aufruf darf nie als bestanden gelten`);
    continue;
  }
  // Die Meldung muss das Flag nennen, sonst weiss der Aufrufer nur DASS etwas
  // falsch war, nicht WAS.
  if (!aus.includes(UNBEKANNT)) {
    zeile(false, name, `Exit 2, aber "${UNBEKANNT}" steht nicht in der Meldung — welcher Aufruf war falsch?`);
    continue;
  }
  zeile(true, name);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Ein falscher Aufruf wird nicht ueberall als solcher behandelt.');
  process.exit(1);
}
console.log('Kein Werkzeug verwechselt einen Tippfehler mit einem Qualitaetsurteil.');
