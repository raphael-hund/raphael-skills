#!/usr/bin/env node
// run-referenz-verweise-check.mjs — loesen die Verweise ZWISCHEN References auf?
//
// LAUFZEIT: 2s (gemessen 03.08.2026) — reines Lesen.
//
//   node evals/run-referenz-verweise-check.mjs
//
// WARUM (Befund 03.08.2026)
// run-verweise-check prueft, was SKILL.md verspricht. Die References verweisen
// aber auch UNTEREINANDER — auf den Zwillings-Skill, auf ops/ im
// Command-Center, auf Nachbar-Seiten im eigenen Ordner. 19 solcher Verweise
// gibt es, und keine Wache sah sie an.
//
// Das ist die teuerste Sorte Verweis: wer eine Reference liest, ist schon tief
// im Thema und folgt dem Zeiger blind. Ein Verweis ins Leere kostet dort mehr
// als in SKILL.md, wo man noch am Anfang steht und leichter umdisponiert.
//
// DREI WURZELN, nicht eine — das war der Grund, warum meine erste Messung 15
// von 19 als kaputt meldete. Die Verweise sind gegen verschiedene Basen
// geschrieben:
//   - relativ zur Datei selbst          ../evals/rubrics/web.md
//   - relativ zur Skill-Wurzel          design/references/taste-kern.md
//   - gegen das Command-Center          ops/review-inbox.md
//   - gegen den globalen Skill-Ordner   methodik/code-review/references/...
// Eine Wache, die nur eine Basis kennt, erfindet 14 Befunde. Ein Waechter, der
// aus vier echten Wegen 15 Fehler macht, wird abgeschaltet.
//
// HERKUNFTSVERMERKE sind keine Verweise. security-audit-playbook.md nennt vier
// fremde Plugins als Quelle ihrer Regeln; die liegen nicht auf diesem Rechner
// und sollen es auch nicht. Erkannt am Wort "Quelle:" am Zeilenanfang.
//
// Exit 0 = jeder Verweis loest auf. Exit 1 = mindestens einer nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.join(HIER, '..', '..', '..');

// Die vier Basen, gegen die in diesen Dateien geschrieben wird (siehe Kopf).
const WURZELN = [
  SKILLS,
  '/root/raphael-command-center',
  '/root/raphael-skills/skills',
];

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

const dateien = [];
for (const skill of ['eigene/web', 'design']) {
  const ordner = path.join(SKILLS, skill, 'references');
  if (!fs.existsSync(ordner)) continue;
  const stapel = [ordner];
  while (stapel.length) {
    const jetzt = stapel.pop();
    for (const e of fs.readdirSync(jetzt, { withFileTypes: true })) {
      const voll = path.join(jetzt, e.name);
      if (e.isDirectory()) stapel.push(voll);
      else if (e.name.endsWith('.md')) dateien.push({ skill, pfad: voll });
    }
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus.
const MINDESTENS = 20;
if (dateien.length < MINDESTENS) {
  console.error(`Nur ${dateien.length} Reference-Dateien gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error(`Zeigt ${SKILLS} noch auf den skills-Ordner? Ohne Dateien prueft`);
  console.error('diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

// Markdown-Link oder Pfad in Backticks. Ein blosser Dateiname ohne Ordner
// zaehlt nicht — "siehe SKILL.md" ist Prosa, kein Zeiger.
const ZIEL_RE = /\]\(([^)\s]+\.md)\)|`((?:\.{1,2}\/)?[a-z0-9-]+\/[a-z0-9./-]+\.md)`/g;

console.log(`Verweise zwischen References — ${dateien.length} Dateien\n`);
console.log('Wer hier liest, ist tief im Thema und folgt dem Zeiger blind:\n');

let geprueft = 0;
let herkunft = 0;
const kaputt = [];

for (const { skill, pfad } of dateien.sort((a, b) => a.pfad.localeCompare(b.pfad))) {
  const text = fs.readFileSync(pfad, 'utf8');
  for (const m of text.matchAll(ZIEL_RE)) {
    const ziel = m[1] || m[2];
    if (ziel.startsWith('http')) continue;

    // Herkunftsvermerk? Dann belegt die Zeile, WOHER eine Regel stammt — sie
    // schickt niemanden dorthin. Erkannt am "Quelle:" im selben Absatz davor.
    const davor = text.slice(Math.max(0, m.index - 200), m.index);
    if (/(^|\n)Quelle:/.test(davor) && !davor.slice(davor.lastIndexOf('Quelle:')).includes('\n\n')) {
      herkunft += 1;
      continue;
    }

    geprueft += 1;
    const kandidaten = [
      path.resolve(path.dirname(pfad), ziel),
      path.join(SKILLS, skill, ziel),
      ...WURZELN.map((w) => path.join(w, ziel)),
    ];
    if (!kandidaten.some((k) => fs.existsSync(k))) {
      kaputt.push(`${skill}/${path.basename(pfad)} -> ${ziel}`);
    }
  }
}

// Ein Lauf ohne einen einzigen geprueften Verweis sieht sauber aus und ist
// leer. Untergrenze unter dem Ist-Stand (19 am 03.08.2026).
if (geprueft < 10) {
  console.error(`Nur ${geprueft} Verweise gefunden (erwartet mindestens 10).`);
  console.error('Das Muster fuer Markdown-Links und Backtick-Pfade greift nicht mehr —');
  console.error('ohne es prueft diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

zeile(kaputt.length === 0, `${geprueft} Verweise zwischen References loesen auf`,
  kaputt.join(' | '));

if (herkunft) {
  console.log(`  [i]    ${herkunft} Herkunftsvermerk(e) uebersprungen — "Quelle:" belegt,`);
  console.log('         woher eine Regel stammt, und schickt niemanden dorthin.');
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Pruefungen wie erwartet.`);
if (fehler) {
  console.log('Ein Verweis schickt den naechsten Leser auf eine Datei, die es nicht gibt.');
  process.exit(1);
}
console.log('Jeder Verweis zwischen zwei References loest auf.');
