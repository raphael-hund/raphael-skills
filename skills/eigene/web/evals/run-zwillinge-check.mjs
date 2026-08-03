#!/usr/bin/env node
/**
 * run-zwillinge-check.mjs — laufen zwei Kopien derselben Datei auseinander?
 *
 * design und web halten beide eine Kopie von dna-scaffold.mjs. Am 30.07.2026
 * habe ich die eine uebersetzt und die andere uebersehen: einen Tag lang gab
 * dieselbe Datei im einen Skill Deutsch und im anderen Chinesisch aus.
 *
 * Der Code ist Zeile fuer Zeile identisch — und genau deshalb gefaehrlich.
 * Wer einen Fehler in der einen Kopie behebt, laesst ihn in der anderen
 * stehen, und nichts sagt etwas. Ein Sicherheitsfix, der nur halb ankommt,
 * sieht aus wie ein ganzer.
 *
 * Verglichen wird nur der CODE, nicht die Kommentare: die duerfen sich
 * unterscheiden (der design-Kopf nennt seine Vendorierungs-Herkunft, der
 * web-Kopf nicht). Ein Vergleich, der auch daran anschlaegt, wird nach dem
 * dritten Fehlalarm abgeschaltet.
 *
 *   node evals/run-zwillinge-check.mjs
 *
 * Exit 0 = jede Doppelung ist im Code identisch (oder ausdruecklich erlaubt).
 * Exit 1 = zwei Kopien sind auseinandergelaufen.
 * Exit 2 = Skills-Ordner nicht gefunden (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.join(HIER, '..', '..', '..');

if (!fs.existsSync(SKILLS)) {
  console.error(`FEHLER: skills/ nicht gefunden (${SKILLS}) — nicht geprueft.`);
  process.exit(2);
}

// Ausdruecklich erlaubte Namensgleichheit: die Wachen jedes Skills heissen
// gleich und sind bewusst verschieden — jede misst ihren eigenen Skill.
// Das ist keine Doppelung, sondern dasselbe Muster an mehreren Orten.
const ERLAUBT = new Set([
  'run-doku-zahlen.mjs', 'run-eval-umfang.mjs', 'run-sabotage.mjs',
  // Dazugekommen 31.07.2026: prueft in jedem Skill dessen EIGENE Werkzeuge auf
  // brauchbare --help-Ausgabe. Die Werkzeugliste ist deshalb notwendig
  // verschieden (design: detect/dna-scaffold/scan-ai-slop), und die Frist ist
  // an die Laufzeit des jeweiligen Skripts angepasst. Gleicher Name, gleiche
  // Frage, anderer Gegenstand — wie bei den drei Wachen darueber.
  'run-hilfe-check.mjs',
  // Ebenfalls dazugekommen 31.07.2026: prueft in jedem Skill dessen EIGENE
  // Werkzeuge auf die Exit-Code-Trennung. Die Listen und die erwarteten Codes
  // sind notwendig verschieden (design: 3 Werkzeuge, web: 11), und die
  // web-Kopie deckt zusaetzlich web-clone/ ab. 152 abweichende Code-Zeilen —
  // das sind zwei eigenstaendige Evals mit gleichem Namen, keine Kopie.
  'run-exit-vertrag-check.mjs',
  // Und 02.08.2026 dazu: beide fahren die Evals ihres EIGENEN Skills nach, und
  // deren Laufzeiten sind grundverschieden. Im web-Skill mussten run-antiset
  // (20+ Min) und run-sabotage (15) ausgenommen werden, sonst lief die Wache
  // in jedes Zeitlimit. In design dauern dieselben Fragen zusammen 75 Sekunden
  // — dort waere die Ausnahme ein blinder Fleck ohne Gegenwert. Gemessen:
  // design-sabotage 35s, browser-detect 31s.
  'run-zahlen-gegen-lauf.mjs',
]);

// Zeilen, die sich zwischen zwei Kopien unterscheiden DUERFEN: relative Pfade
// zeigen je nach Ort woanders hin. dna-scaffold verweist auf
// design/references/design-dna-schema.md — aus design heraus relativ, aus web
// heraus ueber zwei Ebenen. Beide Zeilen sind richtig; sie koennen gar nicht
// gleich sein. Wer das als Abweichung meldet, erzeugt einen Fehlalarm, den
// niemand beheben kann.
const PFADZEILE = /(?:\.\.\/)*[a-z0-9-]*\/?references\/[a-z0-9./-]+\.md/;

function sammeln(dir, raus = new Map()) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'ui-components' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) sammeln(p, raus);
    // Auch .py und .sh: zwei Kopien laufen in jeder Sprache auseinander.
    // Heute gibt es keine doppelten Python-Dateien (nachgezaehlt 03.08.2026)
    // — genau deshalb faellt es auf, wenn welche dazukommen.
    else if (/\.(mjs|py|sh)$/.test(e.name)) {
      if (!raus.has(e.name)) raus.set(e.name, []);
      raus.get(e.name).push(p);
    }
  }
  return raus;
}

// Nur der Code: Kommentarzeilen und Leerzeilen raus.
const nurCode = (datei) => fs.readFileSync(datei, 'utf8')
  .split('\n')
  // Kommentar-Zeichen aller drei Sprachen: // und * (JS), # (Python/Shell).
  .filter((z) => !/^\s*(\/\/|\*|\/\*|#)/.test(z) && z.trim() !== '')
  // Pfadzeilen auf einen Platzhalter ziehen statt sie zu loeschen: faellt eine
  // in EINER Kopie ganz weg, bleibt der Unterschied sichtbar.
  .map((z) => (PFADZEILE.test(z) ? z.replace(PFADZEILE, '<PFAD>') : z))
  .join('\n');

const alle = sammeln(SKILLS);
const doppelt = [...alle].filter(([name, pfade]) => pfade.length > 1 && !ERLAUBT.has(name));

console.log('\nZwillinge — laufen zwei Kopien derselben Datei auseinander?\n');

if (!alle.size) {
  console.error('Keine .mjs-Dateien gefunden — der Lauf misst so nichts.');
  process.exit(2);
}

let fehler = 0;
for (const [name, pfade] of doppelt) {
  const erste = nurCode(pfade[0]);
  const abweichend = pfade.slice(1).filter((p) => nurCode(p) !== erste);
  if (abweichend.length) {
    fehler++;
    console.log(`  [!!]   ${name}: ${pfade.length} Kopien, ${abweichend.length} im Code abweichend`);
    for (const p of pfade) console.log(`         ${path.relative(SKILLS, p)}`);
    console.log('         Ein Fix in einer Kopie laesst die andere kaputt zurueck.');
  } else {
    console.log(`  [OK]   ${name}: ${pfade.length} Kopien, Code identisch`);
  }
}

if (!doppelt.length) console.log('  [OK]   keine unbeabsichtigte Doppelung gefunden');

// Die Ausnahmeliste mitpruefen: ein Eintrag, den es nicht mehr gibt, deckt
// spaeter eine echte Doppelung zu.
const toteAusnahmen = [...ERLAUBT].filter((e) => !alle.has(e));
if (toteAusnahmen.length) {
  fehler++;
  console.log(`  [!!]   ${toteAusnahmen.length} Ausnahme(n) ohne Datei: ${toteAusnahmen.join(', ')}`);
} else {
  console.log(`  [OK]   ${ERLAUBT.size} erlaubte Namensgleichheiten, alle noch vorhanden`);
}

const gesamt = doppelt.length + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Zwei Kopien derselben Datei sagen Verschiedenes.');
  process.exit(1);
}
console.log('Keine Kopie ist heimlich von ihrem Zwilling abgewichen.');
