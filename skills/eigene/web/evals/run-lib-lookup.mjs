#!/usr/bin/env node
/**
 * run-lib-lookup.mjs — prueft, dass der Tresor-Nachschlager fuer JEDE Library
 * eine brauchbare Antwort gibt.
 *
 * Warum es das braucht: der Tresor existiert, damit niemand Exportnamen raten
 * muss ("ein Import, der nicht in der Export-Zeile steht, existiert nicht").
 * Genau diese Regel bricht, sobald das Werkzeug bei einer Library nichts
 * ausgibt — dann sieht "ich habe nicht hingeschaut" aus wie "es gibt nichts".
 *
 * Befund 29.07.2026: `leva` lieferte Exit 0 mit LEERER Export-Zeile, weil die
 * Typdatei nur `export * from './declarations/src/index.js'` enthaelt. Dieselbe
 * Luecke traf motion (-> framer-motion/dom), zustand (-> zustand/vanilla),
 * date-fns (-> 300 Einzeldateien), clsx (`export =`) und gsap
 * (`/// <reference path=…>` + `declare namespace`). Sechs von 30, alle still.
 *
 *   node evals/run-lib-lookup.mjs
 *
 * Braucht weder Browser noch Server. Exit 0 = jede Library beantwortbar.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPT = path.join(HIER, '..', 'scripts', 'lib-lookup.mjs');
const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';

// Libraries, die eine der sechs Sonderformen nutzen. Sie sind der eigentliche
// Test — bei ihnen war die Ausgabe vorher leer. Erwartet wird ein KONKRETER
// Name, den der Aufrufer wirklich importieren kann.
const SONDERFAELLE = {
  leva:       { erwartet: 'useControls',  form: 'export * auf relativen Pfad' },
  motion:     { erwartet: 'animate',      form: 'export * auf Fremdpaket (framer-motion/dom)' },
  zustand:    { erwartet: 'StoreApi',     form: 'export * auf Unterpfad (zustand/vanilla)' },
  'date-fns': { erwartet: 'addDays',      form: 'export * auf ~300 Einzeldateien' },
  clsx:       { erwartet: 'clsx',         form: 'export = (CommonJS-Default)' },
  gsap:       { erwartet: 'gsap',         form: '/// <reference> + declare namespace' },
  // Zugefuegt 29.07.2026. Zwei Formen auf einmal, beide vorher unbekannt:
  // base-ui legt seine Typen als `.d.mts` ab (der Resolver kannte nur `.d.ts`)
  // UND buendelt jedes Primitive per `export * as Select from ...` — was kein
  // Stern-Reexport ist, sondern genau einen Namen erzeugt. Ergebnis war
  // "UNPRUEFBAR" fuer 42 Subpfade, also fuer jedes Primitive, das die
  // Komponenten-Doku seit demselben Tag fuer neun Widgets empfiehlt. Ein Tresor,
  // der bei der wichtigsten Empfehlung schweigt, laedt zum Raten ein.
  '@base-ui/react': { erwartet: 'Select', form: 'export * as NAME + .d.mts-Typen' },
};

const lauf = (name) => spawnSync('node', [SKRIPT, name], { encoding: 'utf8', timeout: 30000 });

let rot = 0;
const sag = (z) => console.log(z);

sag('Tresor-Nachschlager — Sonderformen der Typdateien\n');

for (const [name, { erwartet, form }] of Object.entries(SONDERFAELLE)) {
  const r = lauf(name);
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  const zeile = (aus.match(/^Export:.*$/m) || [''])[0];

  const abgestuerzt = r.status !== 0;
  // "UNPRUEFBAR" ist die ehrliche Antwort, wenn das Werkzeug wirklich nicht
  // weiterkommt — hier aber ein Fehler, denn fuer diese sechs IST die API
  // lesbar. Sonst waere der Test erfuellt, indem man ueberall aufgibt.
  const kapituliert = /UNPRUEFBAR/.test(zeile);
  const hatNamen = aus.includes(erwartet);

  const ok = !abgestuerzt && !kapituliert && hatNamen;
  sag(`${ok ? 'OK  ' : 'ROT '} ${name.padEnd(10)} ${form}`);
  if (!ok) {
    rot++;
    if (abgestuerzt) sag(`       Absturz, Exit ${r.status}: ${(r.stderr || '').split('\n')[0]}`);
    else if (kapituliert) sag('       Werkzeug gibt auf, obwohl die API in dieser Datei erreichbar ist');
    else sag(`       "${erwartet}" fehlt in der Ausgabe. Zeile war: ${zeile || '(keine Export-Zeile)'}`);
  }
}

// Zweite Richtung: KEINE Library darf abstuerzen oder still schweigen. Das ist
// der Flaechen-Test — die sechs oben sind die bekannten Fallen, hier faellt auf,
// wenn beim naechsten npm-Update eine siebte dazukommt.
sag('\nAlle Libraries im Tresor — keine darf abstuerzen oder schweigen:\n');

let libs = [];
try {
  libs = Object.keys(JSON.parse(fs.readFileSync(path.join(VAULT, 'package.json'), 'utf8')).dependencies || {});
} catch (e) {
  console.error(`Kein Tresor unter ${VAULT}: ${e.message}`);
  process.exit(2);
}
if (!libs.length) { console.error('Tresor hat keine dependencies — Lauf sinnlos.'); process.exit(2); }

const stumm = [];
for (const l of libs) {
  const r = lauf(l);
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  if (r.status !== 0) { stumm.push(`${l} (Absturz, Exit ${r.status})`); continue; }
  // Eine Antwort ist brauchbar, wenn sie Namen nennt ODER ehrlich sagt, warum
  // nicht. Eine leere Export-Zeile ist beides nicht.
  const brauchbar = /^Export:\s*\S/m.test(aus) || /^Intern:\s*\S/m.test(aus);
  if (!brauchbar) stumm.push(`${l} (keine Export-Aussage)`);
}

if (stumm.length) {
  rot += stumm.length;
  for (const s of stumm) sag(`ROT  ${s}`);
} else {
  sag(`OK   ${libs.length} Libraries, jede mit einer Aussage`);
}

sag(`\n${rot === 0 ? 'Der Tresor beantwortet jede Library.' : `${rot} Fall/Faelle offen.`}`);
process.exit(rot ? 1 : 0);
