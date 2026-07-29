#!/usr/bin/env node
/**
 * run-bilder-check.mjs — loescht `reject` nur im Asset-Ordner?
 *
 * `bilder.mjs reject` ist die EINZIGE Stelle im ganzen web-Skill, die
 * unwiderruflich loescht: `rmSync` ohne Papierkorb, ohne Rueckfrage. Bis
 * 29.07.2026 hatte sie keinen einzigen Test.
 *
 * Befund, nachgemessen statt vermutet: der zu loeschende Pfad kam aus dem
 * Index-Feld `datei` und ging ungeprueft an join(). Mit
 *
 *     {"images":[{"id":"x1","datei":"../opfer.txt"}]}
 *
 * meldete `reject /tmp/bt/assets x1` brav "geloescht + aus Index entfernt:
 * ../opfer.txt", Exit 0 — und /tmp/bt/opfer.txt war weg. Den Index schreiben
 * Agenten; ein Eintrag darf bestimmen, WELCHE Datei im Ordner drankommt, nicht
 * dass es eine ausserhalb ist.
 *
 * Diese Eval prueft beide Richtungen. Der wichtigere Teil ist der zweite:
 * `reject` MUSS im Normalfall loeschen. Ein Waechter, der auch das blockiert,
 * waere kein Schutz, sondern ein kaputtes Werkzeug — und die naechste Session
 * baut die Pruefung wieder aus.
 *
 * Braucht kein ffmpeg (nur `add` konvertiert, und das wird hier nicht getestet).
 *
 *   node evals/run-bilder-check.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPT = path.join(HIER, '..', 'scripts', 'bilder.mjs');
if (!fs.existsSync(SKRIPT)) {
  console.error(`FEHLER: bilder.mjs nicht gefunden: ${SKRIPT}`);
  process.exit(1);
}

// Jeder Fall baut einen frischen Ordnerbaum:
//   <wurzel>/opfer.txt        darf NIE verschwinden
//   <wurzel>/assets/          der Asset-Ordner mit Index
function bauen(eintraege, dateien = ['gut.avif']) {
  const wurzel = fs.mkdtempSync(path.join(os.tmpdir(), 'bilder-eval-'));
  const assets = path.join(wurzel, 'assets');
  fs.mkdirSync(assets);
  fs.writeFileSync(path.join(wurzel, 'opfer.txt'), 'darf nicht verschwinden');
  for (const d of dateien) fs.writeFileSync(path.join(assets, d), 'x');
  fs.writeFileSync(path.join(assets, 'bilder-index.json'),
    JSON.stringify({ images: eintraege }, null, 2));
  return { wurzel, assets };
}

function reject(assets, key) {
  try {
    const out = execFileSync('node', [SKRIPT, 'reject', assets, key],
      { encoding: 'utf8', timeout: 60000 });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
}

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nBilder-Werkzeug — loescht reject nur im eigenen Ordner?\n');

// --- 1. Ausbrechen muss scheitern ----------------------------------------
console.log('Diese Index-Eintraege duerfen NICHTS loeschen:\n');
const ausbrueche = [
  ['relativ nach oben', '../opfer.txt'],
  ['zweimal nach oben', '../../etc/hostname'],
  ['absoluter Pfad', '/etc/hostname'],
  ['getarnt mit Unterordner', 'unter/../../opfer.txt'],
  ['Unterordner im Asset-Ordner', 'tief/datei.avif'],
];
for (const [was, datei] of ausbrueche) {
  const { wurzel, assets } = bauen([{ id: 'x1', datei, typ: 'TBD' }]);
  try {
    const r = reject(assets, 'x1');
    const opferDa = fs.existsSync(path.join(wurzel, 'opfer.txt'));
    // Der Index darf beim Abbruch NICHT geschrieben werden — sonst waere der
    // Eintrag weg und die Datei noch da, also der Index eine Luege.
    const idx = JSON.parse(fs.readFileSync(path.join(assets, 'bilder-index.json'), 'utf8'));
    const eintragDa = idx.images.some((im) => im.id === 'x1');
    const ok = r.code !== 0 && opferDa && eintragDa;
    zeile(ok, `${was}  ("${datei}")`, ok ? null
      : `Exit ${r.code}, Opfer ${opferDa ? 'da' : 'WEG'}, Index-Eintrag ${eintragDa ? 'da' : 'entfernt'}`);
  } finally {
    fs.rmSync(wurzel, { recursive: true, force: true });
  }
}

// --- 2. Der Normalfall muss funktionieren ---------------------------------
// Ohne diesen Teil waere die Pruefung auch durch "loesche nie" erfuellbar, und
// das Werkzeug damit unbrauchbar.
console.log('\nDiese muessen wirklich loeschen — sonst ist das Werkzeug kaputt:\n');
{
  const { wurzel, assets } = bauen([{ id: 'ok', datei: 'gut.avif', typ: 'TBD' }]);
  try {
    const r = reject(assets, 'ok');
    const weg = !fs.existsSync(path.join(assets, 'gut.avif'));
    const idx = JSON.parse(fs.readFileSync(path.join(assets, 'bilder-index.json'), 'utf8'));
    const ok = r.code === 0 && weg && idx.images.length === 0;
    zeile(ok, 'normale Datei im Asset-Ordner (per id)', ok
      ? null : `Exit ${r.code}, Datei ${weg ? 'weg' : 'DA'}, Index ${idx.images.length} Eintraege`);
  } finally {
    fs.rmSync(wurzel, { recursive: true, force: true });
  }
}
{
  const { wurzel, assets } = bauen([{ id: 'ok', datei: 'gut.avif', typ: 'TBD' }]);
  try {
    const r = reject(assets, 'gut.avif');   // per Dateiname statt id
    const weg = !fs.existsSync(path.join(assets, 'gut.avif'));
    zeile(r.code === 0 && weg, 'dieselbe Datei per Dateiname',
      r.code === 0 && weg ? null : `Exit ${r.code}, Datei ${weg ? 'weg' : 'DA'}`);
  } finally {
    fs.rmSync(wurzel, { recursive: true, force: true });
  }
}
{
  // Index-Eintrag ohne Datei auf der Platte: kein Fehler, der Eintrag geht raus.
  const { wurzel, assets } = bauen([{ id: 'ok', datei: 'fehlt.avif', typ: 'TBD' }], []);
  try {
    const r = reject(assets, 'ok');
    const idx = JSON.parse(fs.readFileSync(path.join(assets, 'bilder-index.json'), 'utf8'));
    zeile(r.code === 0 && idx.images.length === 0,
      'Eintrag ohne Datei — Index wird trotzdem bereinigt',
      r.code === 0 ? null : `Exit ${r.code}`);
  } finally {
    fs.rmSync(wurzel, { recursive: true, force: true });
  }
}
{
  // Unbekannter Schluessel: sauber scheitern, nichts anfassen.
  const { wurzel, assets } = bauen([{ id: 'ok', datei: 'gut.avif', typ: 'TBD' }]);
  try {
    const r = reject(assets, 'gibtEsNicht');
    const da = fs.existsSync(path.join(assets, 'gut.avif'));
    zeile(r.code !== 0 && da, 'unbekannter Schluessel faellt auf, loescht nichts',
      r.code !== 0 && da ? null : `Exit ${r.code}, gut.avif ${da ? 'da' : 'WEG'}`);
  } finally {
    fs.rmSync(wurzel, { recursive: true, force: true });
  }
}

const gesamt = ausbrueche.length + 4;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('reject loescht falsch — das ist die einzige unwiderrufliche Stelle im Skill.');
  process.exit(1);
}
console.log('reject bleibt im Asset-Ordner und tut dort weiter seine Arbeit.');
