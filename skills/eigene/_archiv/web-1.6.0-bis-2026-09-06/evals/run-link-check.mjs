#!/usr/bin/env node
/**
 * run-link-check.mjs — prueft, ob das Gate einen leeren Link-Lauf merkt.
 *
 * Befund 29.07.2026: das Gate rief linkinator mit `--silent` auf. Das Flag
 * unterdrueckt die OK-Links, uebrig bleiben nur die kaputten. Auf der
 * Kontroll-Fixture mit vier href-Attributen meldete das Tor deshalb
 * "0 Links, 0 tot" und bestand — dieselbe Zeile, die auch herauskaeme, wenn
 * linkinator die Seite nie geoeffnet haette. Nachgemessen: dieselbe Seite
 * liefert ohne `--silent` zwei Links mit state 'OK'.
 *
 * Ein Pruefer, dessen Bestanden-Meldung von seinem Nicht-gelaufen-Zustand
 * ununterscheidbar ist, prueft nichts.
 *
 * Geprueft wird in beide Richtungen:
 *   falsches Gruen — leere Liste, fehlendes Feld, kaputte Ausgabe muessen reissen
 *   falsches Rot   — echte OK-Links muessen durchgehen
 *
 * Braucht weder Browser noch Server noch linkinator.
 *
 *   node evals/run-link-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Das Gate ist ein Skript und laeuft beim Import sofort los. Wir schneiden die
// urteilende Funktion heraus. Wird sie umbenannt, schlaegt dieser Lauf fehl —
// auch das ist ein Signal.
const quelle = fs.readFileSync(GATE, 'utf8');
function schneide(marke, schluss) {
  const a = quelle.indexOf(marke);
  if (a < 0) {
    console.error(`FEHLER: "${marke}" nicht im Gate gefunden — umbenannt?`);
    process.exit(1);
  }
  const b = quelle.indexOf(schluss, a);
  if (b < 0) {
    console.error(`FEHLER: Ende von "${marke}" nicht gefunden.`);
    process.exit(1);
  }
  return quelle.slice(a, b + schluss.length);
}
// BUDGET ist im Gate ein Modul-Konstante; hier wird sie als Parameter gereicht.
const linkUrteil = new Function('BUDGET', `
  ${schneide('function liste(', '\n}\n')}
  ${schneide('function linkUrteil(', '\n}\n')}
  return linkUrteil;
`)({ brokenLinks: 0 });

const ok = (url) => ({ url, status: 200, state: 'OK' });
const tot = (url) => ({ url, status: 404, state: 'BROKEN' });

// Muessen REISSEN. Jeder dieser Faelle kam frueher als Gruen durch.
const FALSCHES_GRUEN = [
  {
    was: 'leere Liste (--silent-Falle: kein Link gesehen)',
    json: { links: [], passed: true },
  },
  {
    was: 'leere Liste, passed: false',
    json: { links: [], passed: false },
  },
  {
    was: 'ein toter Link',
    json: { links: [ok('http://x/'), tot('http://x/weg')], passed: false },
  },
  {
    was: 'nur tote Links',
    json: { links: [tot('http://x/a'), tot('http://x/b')], passed: false },
  },
];

// Muessen DURCHGEHEN. Sonst waere das Tor nur in die andere Richtung kaputt.
const ECHT_SAUBER = [
  {
    was: 'nur die Startseite, OK',
    json: { links: [ok('http://x/')], passed: true },
  },
  {
    was: 'mehrere Seiten, alle OK',
    json: { links: [ok('http://x/'), ok('http://x/team'), ok('http://x/bild.svg')], passed: true },
  },
  {
    was: 'SKIPPED zaehlt nicht als tot',
    json: { links: [ok('http://x/'), { url: 'mailto:a@b.de', status: 0, state: 'SKIPPED' }], passed: true },
  },
];

// Muessen WERFEN. Ein unlesbares Ergebnis ist kein sauberer Lauf.
const UNLESBAR = [
  { was: 'Ausgabe ohne links-Feld', json: { passed: true } },
  { was: 'links ist eine Zahl', json: { links: 0 } },
  { was: 'Ausgabe ist null', json: null },
];

let rot = 0;
const sag = (zeile) => console.log(zeile);

sag('Link-Check — kein Browser, kein Server, kein linkinator\n');
sag('Diese muessen reissen — sonst meldet ein leerer Lauf Bestanden:\n');
for (const f of FALSCHES_GRUEN) {
  let u = null, fehler = null;
  try { u = linkUrteil(f.json); } catch (e) { fehler = e.message; }
  const bestanden = fehler === null && u.ok === false;
  if (!bestanden) rot++;
  sag(`  [${bestanden ? 'OK' : 'ROT'}]   ${f.was}`);
  sag(`         ${fehler ? `unerwartet geworfen: ${fehler}` : u.detail}`);
}

sag('\nDiese muessen durchgehen — sonst ist das Tor nur in die andere Richtung kaputt:\n');
for (const f of ECHT_SAUBER) {
  let u = null, fehler = null;
  try { u = linkUrteil(f.json); } catch (e) { fehler = e.message; }
  const bestanden = fehler === null && u.ok === true;
  if (!bestanden) rot++;
  sag(`  [${bestanden ? 'OK' : 'ROT'}]   ${f.was}`);
  if (!bestanden) sag(`         ${fehler || u.detail}`);
}

sag('\nEine unlesbare Ausgabe ist kein sauberer Lauf — sie muss werfen:\n');
for (const f of UNLESBAR) {
  let fehler = null;
  try { linkUrteil(f.json); } catch (e) { fehler = e.message; }
  const bestanden = fehler !== null;
  if (!bestanden) rot++;
  sag(`  [${bestanden ? 'OK' : 'ROT'}]   ${f.was}`);
  sag(`         ${fehler || 'ist NICHT geworfen — waere stilles Gruen'}`);
}

const gesamt = FALSCHES_GRUEN.length + ECHT_SAUBER.length + UNLESBAR.length;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Der Link-Check unterscheidet "nichts gefunden" nicht von "nichts geprueft".');
  process.exit(1);
}
sag('Ein Link-Lauf ohne einen einzigen gesehenen Link besteht nicht mehr.');
