#!/usr/bin/env node
/**
 * run-sweep-check.mjs — prueft, ob das Gate einen leeren Screenshot-Sweep merkt.
 *
 * Der Sweep ist die Grundlage jeder Sichtpruefung: was er nicht fotografiert,
 * sieht der Panel-Schritt nie. Bis zum 29.07.2026 hing das Urteil allein an
 * `r.error` im Manifest — vier Sweeps, die nichts fotografiert hatten, kamen
 * damit als Gruen durch (Manifest ohne Routen, Route ohne Bilder, fehlende
 * Routen, Dateinamen ohne Datei). Ein Nichts besteht sonst jede Pruefung.
 *
 * Geprueft wird in beide Richtungen:
 *   falsches Gruen — jedes leere oder unvollstaendige Manifest muss reissen
 *   falsches Rot   — ein echter, vollstaendiger Sweep muss durchgehen
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-sweep-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Wie in run-budget-check.mjs / run-kaputte-ausgaben.mjs: das Gate ist ein
// Skript und laeuft beim Import sofort los. Wir schneiden die beiden Funktionen
// heraus, die das Urteil faellen. Wird eine umbenannt, schlaegt dieser Lauf
// fehl — auch das ist ein Signal.
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
const listeTeil = schneide('function liste(', '\n}\n');
const maengelTeil = schneide('function sweepMaengel(', '\n}\n');
const sweepMaengel = new Function('fs', 'path', `
  ${listeTeil}
  ${maengelTeil}
  return sweepMaengel;
`)(fs, path);

// Ein Ordner mit genau einer echten Datei — so laesst sich "Datei existiert"
// von "Datei behauptet" unterscheiden.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-check-'));
fs.writeFileSync(path.join(tmp, 'da.png'), 'x');

const bild = (f) => ({ file: f, y: 0, kind: 'fold' });

// --- Faelle ---------------------------------------------------------------
// `reisst` heisst: sweepMaengel muss mindestens einen Mangel melden.
const REISSEN = [
  {
    was: 'Manifest ganz ohne Routen',
    manifest: { routes: [] }, verlangt: ['/'],
  },
  {
    was: 'Route ohne einen einzigen Screenshot',
    manifest: { routes: [{ route: '/', status: 200, shots: [] }] }, verlangt: ['/'],
  },
  {
    was: 'nur 1 von 3 verlangten Routen im Manifest',
    manifest: { routes: [{ route: '/', shots: [bild('da.png')] }] },
    verlangt: ['/', '/team', '/preise'],
  },
  {
    was: 'Dateiname im Manifest, aber keine Datei auf der Platte',
    manifest: { routes: [{ route: '/', shots: [bild('gibtsnicht.png')] }] }, verlangt: ['/'],
  },
  {
    was: 'gemeldeter Navigationsfehler (der alte, einzige Fall)',
    manifest: { routes: [{ route: '/', error: 'HTTP 500', shots: [] }] }, verlangt: ['/'],
  },
  {
    was: 'eine Route gut, eine leer',
    manifest: { routes: [
      { route: '/', shots: [bild('da.png')] },
      { route: '/team', shots: [] },
    ] },
    verlangt: ['/', '/team'],
  },
  {
    was: 'shots fehlt als Feld ganz',
    manifest: { routes: [{ route: '/' }] }, verlangt: ['/'],
  },
];

const DURCHLASSEN = [
  {
    was: 'eine Route, ein echtes Bild',
    manifest: { routes: [{ route: '/', status: 200, shots: [bild('da.png')] }] },
    verlangt: ['/'],
  },
  {
    was: 'Schraegstrich am Ende zaehlt als dieselbe Route',
    manifest: { routes: [{ route: '/team/', shots: [bild('da.png')] }] },
    verlangt: ['/team'],
  },
  {
    was: 'Desktop + Mobile: dieselbe Route zweimal im Manifest',
    manifest: { routes: [
      { route: '/', shots: [bild('da.png')] },
      { route: '/', shots: [bild('da.png')] },
    ] },
    verlangt: ['/'],
  },
];

// Kaputte Manifeste duerfen nicht still als "keine Maengel" gelten — dafuer
// sorgt liste(). Sie muss werfen, nicht [] zurueckgeben.
const WERFEN = [
  { was: 'Manifest ohne routes-Feld', manifest: { base: 'x' } },
  { was: 'routes ist eine Zahl',      manifest: { routes: 0 } },
  { was: 'Manifest ist null',         manifest: null },
];

let rot = 0;
const sag = (s) => console.log(s);
const lauf = (f) => sweepMaengel(f.manifest, f.verlangt, tmp);

sag(`Sweep-Check — Testordner ${tmp}\n`);
sag('Diese Manifeste MUESSEN reissen — jedes ist ein Sweep, der nichts gesehen hat:\n');

for (const f of REISSEN) {
  let maengel = null, fehler = null;
  try { maengel = lauf(f); } catch (e) { fehler = e.message; }
  const ok = !fehler && maengel.length > 0;
  if (!ok) rot++;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwarteter Absturz: ${fehler}`);
  else if (!ok) sag('         durchgelassen — kein einziger Mangel gemeldet');
  else sag(`         ${maengel.join(' | ')}`);
}

sag('\nDiese muessen durchgehen — sonst ist das Tor nur in die andere Richtung kaputt:\n');

for (const f of DURCHLASSEN) {
  let maengel = null, fehler = null;
  try { maengel = lauf(f); } catch (e) { fehler = e.message; }
  const ok = !fehler && maengel.length === 0;
  if (!ok) rot++;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwarteter Absturz: ${fehler}`);
  else if (!ok) sag(`         faelschlich gerissen: ${maengel.join(' | ')}`);
}

sag('\nEin unlesbares Manifest ist kein sauberer Sweep — es muss werfen:\n');

for (const f of WERFEN) {
  let geworfen = false, meldung = '';
  try { sweepMaengel(f.manifest, ['/'], tmp); } catch (e) { geworfen = true; meldung = e.message; }
  if (!geworfen) rot++;
  sag(`  [${geworfen ? 'OK' : 'ROT'}]   ${f.was}`);
  if (geworfen) sag(`         ${meldung}`);
  else sag('         still als "keine Maengel" durchgelassen');
}

const gesamt = REISSEN.length + DURCHLASSEN.length + WERFEN.length;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Ein Sweep ohne Bilder kommt als Gruen durch. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
sag('Ein Sweep, der nichts fotografiert hat, besteht nicht mehr.');
