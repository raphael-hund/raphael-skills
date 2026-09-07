#!/usr/bin/env node
/**
 * run-routen-check.mjs — prueft die Routen-Vollstaendigkeitsregel des Gates.
 *
 * Das Gate weigert sich seit 28.07.2026, gruen zu melden, wenn Seiten im Build
 * liegen, die es nie geoeffnet hat (Befund SalsaFlow: 28 Seiten gebaut, eine
 * geprueft, Gruen fuers Ganze). Diese Regel ist selbst ungeprueft gewesen —
 * genau der "Blocker ohne Fixture", den SKILL.md verbietet.
 *
 * Geprueft wird die reine Funktion `seitenImBuild`. Sie beantwortet die einzige
 * Frage, an der die Regel haengt: welche Seiten liegen ueberhaupt im Build?
 * Zaehlt sie zu wenig, entsteht falsches Gruen (ungesehene Seite gilt als
 * bestanden). Zaehlt sie zu viel, entsteht falsches Rot (das Tor verlangt
 * Routen fuer Dateien, die keine Seiten sind).
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-routen-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens eine Seite falsch gezaehlt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Gleiches Vorgehen wie in run-kaputte-ausgaben.mjs: das Gate ist ein Skript und
// laeuft beim Import sofort los. Wir schneiden nur die reine Funktion heraus.
// Wird sie umbenannt, schlaegt dieser Lauf fehl — auch das ist ein Signal.
const quelle = fs.readFileSync(GATE, 'utf8');
const anfang = quelle.indexOf('function seitenImBuild(');
if (anfang < 0) {
  console.error('FEHLER: function seitenImBuild(...) nicht im Gate gefunden — umbenannt?');
  process.exit(1);
}
const ende = quelle.indexOf('\n}\n', anfang) + 3;
const seitenImBuild = new Function(
  'fs', 'path',
  `${quelle.slice(anfang, ende)}; return seitenImBuild;`,
)(fs, path);

// Ein Build, wie ihn ein Vite/Astro-Lauf hinterlaesst: Startseite, Unterseiten,
// verschachtelte Ordner, plus alles, was KEINE Seite ist.
const BAU = {
  'index.html': '<html></html>',
  '404.html': '<html></html>',              // Fehlerseite, keine Route
  'impressum.html': '<html></html>',
  'team/index.html': '<html></html>',
  'leistungen/sanierung.html': '<html></html>',
  'leistungen/index.html': '<html></html>',
  'assets/app-a1b2.js': 'console.log(1)',   // Bundle-Ordner, ausgeschlossen
  'assets/seite.html': '<html></html>',     // Falle: HTML IN assets/ ist keine Route
  'robots.txt': 'User-agent: *',
  'sitemap.xml': '<urlset/>',
  '.vite/manifest.json': '{}',              // Punktordner, ausgeschlossen
  'node_modules/x/index.html': '<html></html>', // ausgeschlossen
};

const wurzel = fs.mkdtempSync(path.join(os.tmpdir(), 'routen-check-'));
for (const [rel, inhalt] of Object.entries(BAU)) {
  const ziel = path.join(wurzel, rel);
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, inhalt);
}

// Was gefunden werden MUSS — je Seite die erste zulaessige Schreibweise.
// Das Gate akzeptiert beide (`/team` und `/team.html`), weil es nicht wissen
// kann, ob die Produktion cleanUrls fahrt.
const MUSS = ['/', '/impressum', '/team', '/leistungen/sanierung', '/leistungen'];

// Was NICHT als Route gelten darf. Jeder Eintrag hier waere falsches Rot: das
// Tor wuerde eine Route fuer etwas verlangen, das keine Seite ist.
const DARF_NICHT = ['/404', '/assets/seite', '/robots.txt', '/sitemap.xml'];

const gefunden = seitenImBuild(wurzel);
const ersteSchreibweise = gefunden.map(([erste]) => erste);

let fehler = 0;
console.log(`Routen-Check — Testbau unter ${wurzel}\n`);
console.log(`Gefunden: ${ersteSchreibweise.join(', ') || '(nichts)'}\n`);

console.log('Diese Seiten MUESSEN gefunden werden (sonst gilt Ungesehenes als bestanden):\n');
for (const r of MUSS) {
  const ok = ersteSchreibweise.includes(r);
  console.log(`  ${ok ? '[OK]  ' : '[FAIL]'} ${r}`);
  if (!ok) fehler++;
}

console.log('\nDiese duerfen NICHT als Route gelten (sonst falsches Rot):\n');
for (const r of DARF_NICHT) {
  const ok = !ersteSchreibweise.includes(r);
  console.log(`  ${ok ? '[OK]  ' : '[FAIL]'} ${r}`);
  if (!ok) fehler++;
}

// Beide Schreibweisen: ohne die zweite wuerde das Tor bei einem Build ohne
// cleanUrls jede Unterseite als ungesehen melden, obwohl sie geprueft wurde.
//
// Die Startseite ist die Ausnahme: sie heisst `/` und sonst nichts. Beide
// Eintraege gleich zu verlangen waere hier richtig, verschieden zu verlangen
// falsch — die erste Fassung dieses Laufs hat genau das behauptet und die
// Startseite faelschlich als Fehler gemeldet.
console.log('\nJede Seite liefert beide zulaessigen Schreibweisen:\n');
for (const paar of gefunden) {
  const wurzelseite = paar[0] === '/';
  const ok = Array.isArray(paar) && paar.length === 2
    && (wurzelseite ? paar[1] === '/' : paar[0] !== paar[1]);
  console.log(`  ${ok ? '[OK]  ' : '[FAIL]'} ${JSON.stringify(paar)}${wurzelseite ? '  (Startseite: nur eine Schreibweise)' : ''}`);
  if (!ok) fehler++;
}

// Gegenprobe: ein unlesbarer Ordner darf NICHT als "Build ohne Unterseiten"
// durchgehen. Das waere stilles Gruen fuer eine Website, die niemand gesehen hat.
console.log('\nUnlesbarer Ordner muss laut scheitern, nicht leer zurueckkommen:\n');
let lautGescheitert = false;
let wie = '';
try {
  const r = seitenImBuild(path.join(wurzel, 'gibtesnicht'));
  wie = `kam als Liste mit ${r.length} Eintraegen durch`;
} catch (e) {
  lautGescheitert = true;
  wie = e.message;
}
console.log(`  ${lautGescheitert ? '[OK]  ' : '[FAIL]'} fehlender Ordner\n         ${wie}`);
if (!lautGescheitert) fehler++;

fs.rmSync(wurzel, { recursive: true, force: true });

const gesamt = MUSS.length + DARF_NICHT.length + gefunden.length + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('\nDie Seitenliste stimmt nicht — das Tor buergt fuer Ungesehenes oder blockt Nicht-Seiten.');
  process.exit(1);
}
console.log('Das Tor zaehlt genau die Seiten, fuer die es buergen soll.');
process.exit(0);
