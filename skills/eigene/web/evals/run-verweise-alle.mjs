#!/usr/bin/env node
/**
 * run-verweise-alle.mjs — der Verweis-Pruefer ueber ALLE Skills dieser Familie.
 *
 * run-verweise-check.mjs kann seit dem 30.07.2026 jeden Skill pruefen
 * (`--skill design`). Nur rief das niemand auf: der Standardlauf nimmt `web`,
 * und die anderen fuenf blieben ungeprueft. Eine Faehigkeit, die niemand
 * faehrt, ist Dekoration — dasselbe Muster wie beim Pruefer, den das Tor nie
 * aufrief.
 *
 * Warum das mehr ist als Kosmetik: die Skills verweisen quer aufeinander und
 * ins Brain-Wiki. Ein Verweis, der ins Leere zeigt, schickt einen Agenten auf
 * eine Datei, die es nicht gibt — er baut dann nach, was daneben liegt.
 *
 *   node evals/run-verweise-alle.mjs
 *
 * Exit 0 = jeder Verweis in jedem Skill loest auf.
 * Exit 1 = mindestens einer zeigt ins Leere.
 * Exit 2 = ein Skill fehlt oder der Pruefer lief nicht (nicht geprueft).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, 'run-verweise-check.mjs');

// Die Liste wird NICHT gepflegt, sondern gemessen: jeder Ordner mit SKILL.md
// unter skills/eigene und skills/. Eine handgepflegte Liste haette dieselbe
// Schwaeche wie die Doku-Zahlen — sie veraltet still, wenn ein Skill dazukommt.
const EIGENE = path.join(HIER, '..', '..');
const SKILLS = path.join(EIGENE, '..');
const gefunden = new Set(['web']);
for (const wurzel of [EIGENE, SKILLS]) {
  if (!fs.existsSync(wurzel)) continue;
  for (const e of fs.readdirSync(wurzel, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith('.')) continue;
    if (fs.existsSync(path.join(wurzel, e.name, 'SKILL.md'))) gefunden.add(e.name);
  }
}
const SKILLS_LISTE = [...gefunden].sort();

if (SKILLS_LISTE.length < 2) {
  console.error(`Nur ${SKILLS_LISTE.length} Skill(s) gefunden — der Lauf misst so nichts.`);
  process.exit(2);
}

console.log('\nVerweise ueber alle Skills — zeigt irgendwo etwas ins Leere?\n');

let fehler = 0;
for (const s of SKILLS_LISTE) {
  let aus = '';
  let code = 0;
  try {
    aus = execFileSync('node', [PRUEFER, '--skill', s], { encoding: 'utf8', timeout: 600000 });
  } catch (e) {
    aus = `${e.stdout || ''}${e.stderr || ''}`;
    code = e.status ?? 2;
  }
  // Exit 2 ist "nicht geprueft", nicht "bestanden" — dieselbe Trennung wie im Tor.
  if (code === 2) {
    console.log(`  [!!]   ${s}: Pruefer konnte nicht urteilen`);
    console.log(`         ${aus.trim().split('\n')[0] || 'ohne Ausgabe'}`);
    fehler++;
    continue;
  }
  // Nur die Zeile MIT der Fundliste zaehlt, nicht jede [!!]-Zeile: der Pruefer
  // schreibt die Zahl der geprueften Verweise in dieselbe Form. Erster Versuch
  // meldete deshalb "1 Verweis zeigt ins Leere" und zitierte als Beleg die
  // Zaehlzeile "94 Dateiverweise in 10 Referenz-Datei(en)" — die Aussage war
  // richtig, der Beleg unbrauchbar.
  const tot = [...aus.matchAll(/^\s*\[!!\][^\n]*\n\s*zeigen ins Leere: ([^\n]*)/gm)]
    .flatMap((m) => m[1].split(' | ').map((x) => x.trim()));
  if (code === 0 && tot.length === 0) {
    console.log(`  [OK]   ${s}: alle Verweise loesen auf`);
  } else {
    console.log(`  [!!]   ${s}: ${tot.length || 1} Verweis(e) zeigen ins Leere`);
    for (const t of tot.slice(0, 5)) console.log(`         ${t}`);
    fehler++;
  }
}

console.log(`\n${SKILLS_LISTE.length - fehler}/${SKILLS_LISTE.length} Skills wie erwartet.`);
if (fehler) {
  console.log('Ein Verweis ins Leere schickt den naechsten Agenten auf eine Datei, die es nicht gibt.');
  process.exit(1);
}
console.log('Kein Verweis in keinem Skill zeigt ins Leere.');
