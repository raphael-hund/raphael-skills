#!/usr/bin/env node
// run-hilfe-check.mjs — jedes Werkzeug dieses Skills muss `--help` beantworten.
//
//   node evals/run-hilfe-check.mjs
//
// WARUM (Befund 31.07.2026)
// scan-ai-slop.mjs kannte `--help` nicht als Flag. Es rutschte als WURZELPFAD
// durch: der Scanner las den aktuellen Ordner und meldete
//   "kill-ai-slop — scanned 0 files under . / No slop signals found."
// mit Exit 0. Also gruen ueber nichts — ausgerechnet auf die Anfrage hin, die
// "zeig mir, was du kannst" bedeutet. Wer das Werkzeug zum ersten Mal
// anfasst, bekam als Antwort ein Testat ueber ein Verzeichnis, das er nie
// gemeint hat.
//
// Dieselbe Klasse trat am selben Tag in sechs web-Werkzeugen auf; dort haelt
// eigene/web/evals/run-hilfe-check.mjs sie fest. Diese Eval ist das Gegenstueck
// fuer den design-Skill.
//
// Die Liste steht hier ausdruecklich statt automatisch: der design-Skill hat
// drei Werkzeuge, und zwei davon (detect, scan-ai-slop) sind vendoriert — ihre
// Kopfkommentare folgen fremden Konventionen, aus denen sich keine verlaessliche
// Kandidatenliste ableiten laesst. rules.de.mjs fehlt bewusst: eine Regeldatei
// ohne CLI soll auch keine bekommen.
//
// Exit 0 = alle antworten. Exit 1 = mindestens eines nicht.
// Exit 2 = die Eval selbst kann nicht pruefen (Werkzeug fehlt).

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 25000;

const WERKZEUGE = ['detect.mjs', 'dna-scaffold.mjs', 'scan-ai-slop.mjs'];

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

// Eine Liste, die auf verschwundene Dateien zeigt, prueft nichts und meldet
// trotzdem gruen. Deshalb Exit 2 statt stiller Auslassung.
const fehlend = WERKZEUGE.filter((n) => !fs.existsSync(path.join(SKRIPTE, n)));
if (fehlend.length) {
  console.error(`Werkzeug fehlt: ${fehlend.join(', ')}`);
  console.error('Umbenannt oder geloescht? Diese Liste muss mitgezogen werden —');
  console.error('sonst prueft die Eval weniger, als ihr Name verspricht.');
  process.exit(2);
}

console.log(`Hilfe-Check (design) — ${WERKZEUGE.length} Werkzeuge\n`);

for (const name of WERKZEUGE) {
  const r = spawnSync('node', [path.join(SKRIPTE, name), '--help'], {
    encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
  });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} --help`, `keine Antwort binnen ${FRIST_MS / 1000}s — arbeitet statt zu antworten`);
    continue;
  }
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (r.status !== 0) {
    zeile(false, `${name} --help`, `Exit ${r.status} — Hilfe ist kein Fehlerfall`);
    continue;
  }
  if (!aus.trim()) {
    zeile(false, `${name} --help`, 'keine Ausgabe — Exit 0 ohne Antwort ist die stillste Form von kaputt');
    continue;
  }
  // Ein Werkzeug, das die Hilfe eines anderen ausgibt, faellt sonst nicht auf.
  // detect.mjs nennt sich in seiner vendorten Hilfe "impeccable detect" — der
  // Rumpf des Dateinamens genuegt deshalb als Nachweis.
  const rumpf = name.replace(/\.mjs$/, '');
  if (!aus.includes(rumpf)) {
    zeile(false, `${name} --help`, `Ausgabe nennt "${rumpf}" nicht — gehoert die Hilfe zu diesem Werkzeug?`);
    continue;
  }
  // Der eigentliche Befund vom 31.07.2026: scan-ai-slop ARBEITETE auf --help.
  // Eine Hilfe, die einen Lauf startet, verraet sich an ihrer Bilanzzeile.
  if (/scanned \d+ files|No slop signals found/.test(aus)) {
    zeile(false, `${name} --help`, 'hat gescannt statt geantwortet — --help rutschte als Pfad durch');
    continue;
  }
  zeile(true, `${name} --help`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Werkzeuge beantworten --help.`);
process.exit(fehler ? 1 : 0);
