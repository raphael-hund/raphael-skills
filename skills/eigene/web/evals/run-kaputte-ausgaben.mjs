#!/usr/bin/env node
/**
 * run-kaputte-ausgaben.mjs — prueft, ob das Tor einen ABSTURZ ueberlebt.
 *
 * Das Anti-Set (run-antiset.mjs) prueft, ob das Tor Fehler ERKENNT: es baut
 * kaputte Seiten und schaut, ob das Tor rot wird. Es prueft aber nicht, was
 * passiert, wenn ein WERKZEUG mitten im Lauf stirbt und Muell zurueckgibt.
 *
 * Genau da lag der Luna-Befund vom 27.07.2026: neunmal stand `parsed.x || []`
 * im Gate. Liefert ein Werkzeug `{}`, weil es unterwegs gestorben ist, wird
 * daraus eine leere Liste — und damit "0 Probleme gefunden". Ein Absturz
 * meldete Bestnote.
 *
 * Dieser Lauf braucht weder Browser noch Server: er ruft nur die Auswerte-
 * Funktionen des Gates mit absichtlich kaputten Ausgaben auf und verlangt,
 * dass jede einzelne davon NICHT als bestanden gilt.
 *
 *   node evals/run-kaputte-ausgaben.mjs
 *
 * Exit 0 = jede kaputte Ausgabe wurde als kaputt erkannt.
 * Exit 1 = mindestens eine kaputte Ausgabe kam als "bestanden" durch.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import fs from 'node:fs';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Das Gate ist ein Skript, kein Modul — es laeuft beim Import sofort los.
// Statt es auszufuehren, holen wir uns nur die reine Hilfsfunktion heraus.
// Das ist bewusst grob: sie hat keine Abhaengigkeiten und passt in eine
// eigene Funktion. Aendert sich ihr Name, schlaegt dieser Lauf fehl — auch
// das ist ein gewolltes Signal.
const quelle = readFileSync(GATE, 'utf8');
const anfang = quelle.indexOf('function liste(');
if (anfang < 0) {
  console.error('FEHLER: function liste(...) nicht im Gate gefunden — umbenannt?');
  process.exit(1);
}
const ende = quelle.indexOf('\n}\n', anfang) + 3;
const liste = new Function(`${quelle.slice(anfang, ende)}; return liste;`)();

// Jede Zeile: so koennte ein sterbendes Werkzeug antworten.
// KEINE davon darf als "0 Probleme" durchgehen.
const KAPUTT = [
  { was: 'leeres Objekt (Werkzeug gestorben)',        json: {},                      feld: 'violations' },
  { was: 'Feld ist null',                             json: { violations: null },    feld: 'violations' },
  { was: 'Feld ist eine Zahl statt Liste',            json: { violations: 0 },       feld: 'violations' },
  { was: 'Feld ist ein String',                       json: { violations: '' },      feld: 'violations' },
  { was: 'Antwort ist null',                          json: null,                    feld: 'violations' },
  { was: 'Antwort ist eine Zahl',                     json: 7,                       feld: 'violations' },
  { was: 'Antwort ist ein String',                    json: 'Segmentation fault',    feld: 'violations' },
  { was: 'linkinator ohne links-Feld',                json: { skipped: 3 },          feld: 'links' },
  { was: 'craft-check ohne blockers-Feld',            json: { warns: [] },           feld: 'blockers' },
];

// Gegenprobe: eine echte, leere Antwort MUSS durchgehen. Sonst haetten wir das
// Tor nur in die andere Richtung kaputtgemacht — dann meldet es alles rot und
// ist genauso wertlos.
const ECHT_LEER = [
  { was: 'axe: echte 0 Violations',   json: { violations: [], passes: 42 }, feld: 'violations' },
  { was: 'craft: echte 0 Blocker',    json: { blockers: [], warns: [] },    feld: 'blockers' },
];

let fehler = 0;

console.log('Kaputte Werkzeug-Ausgaben — keine davon darf "0 Probleme" bedeuten:\n');
for (const f of KAPUTT) {
  let erkannt = false;
  let wie = '';
  try {
    const r = liste(f.json, f.feld, 'testwerkzeug');
    wie = `kam als Liste mit ${r.length} Eintraegen durch`;
  } catch (e) {
    erkannt = true;
    wie = e.message;
  }
  console.log(`  ${erkannt ? '[OK]  ' : '[FAIL]'} ${f.was}\n         ${wie}`);
  if (!erkannt) fehler++;
}

console.log('\nEchte leere Antworten — diese MUESSEN durchgehen:\n');
for (const f of ECHT_LEER) {
  let ok = false;
  let wie = '';
  try {
    const r = liste(f.json, f.feld, 'testwerkzeug');
    ok = Array.isArray(r) && r.length === 0;
    wie = `Liste mit ${r.length} Eintraegen`;
  } catch (e) {
    wie = `faelschlich abgelehnt: ${e.message}`;
  }
  console.log(`  ${ok ? '[OK]  ' : '[FAIL]'} ${f.was}\n         ${wie}`);
  if (!ok) fehler++;
}

// --- Fehlendes Pruefer-Skript darf kein gruenes Tor ergeben ---------------
// Ein Absturz und eine fehlende Datei sind zwei verschiedene Wege, und nur der
// erste war abgesichert. Fehlte shot-sweep.mjs, gab es SKIP statt FAIL — und
// weil shot-sweep aus gutem Grund keine Pflichtfamilie ist, wurde daraus
// Exit 0: gruenes Tor ohne einen einzigen Screenshot, gegen Raphaels harte
// Screenshot-Pflicht.
//
// Geprueft wird an der ECHTEN Schlusslogik des Tors (Pflichtfamilien aus der
// Quelle gelesen, nicht abgeschrieben) — sonst prueft dieser Fall eine
// Nachbildung, die mit dem Tor auseinanderlaufen kann.
let zusatz = 0;
{
  console.log('\nFehlendes Pruefer-Skript — SKIP darf nicht gruen bedeuten:\n');
  const fam = [...(quelle.match(/const QUALITAET = \[([^\]]+)\]/)?.[1] || '')
    .matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
  const urteil = (shotSweepEintrag) => {
    const results = [...fam.map((f) => ({ name: f, ok: true, skipped: false })), shotSweepEintrag];
    const fehltGanz = fam.filter((q) => !results.some((r) => r.name.startsWith(q) && !r.skipped));
    const failed = results.filter((r) => !r.ok && !r.skipped);
    return fehltGanz.length ? 2 : failed.length ? 1 : 0;
  };

  if (!fam.length) {
    console.log('  [ROT]  QUALITAET-Liste nicht im Tor gefunden — umbenannt?');
    fehler++;
    zusatz += 1;
  } else {
    // Wie das Tor eine fehlende Datei verbucht, wird AUS DER QUELLE gelesen,
    // nicht angenommen. Erster Versuch rechnete nur mit einem selbst gesetzten
    // FAIL — dann liess sich das Tor auf SKIP zuruecksetzen und der Fall blieb
    // gruen. Er prueft dann seine eigene Rechnung, nicht das Tor.
    const stelle = quelle.match(
      /if \(!fs\.existsSync\(sweep\)\) \{\s*record\('shot-sweep',\s*(true|false)/);
    const alsFail = stelle
      ? urteil({ name: 'shot-sweep', ok: stelle[1] === 'true', skipped: stelle[1] === 'true' })
      : null;
    if (!stelle) {
      console.log('  [ROT]  Stelle "shot-sweep.mjs fehlt" nicht im Tor gefunden — umgebaut?');
      fehler++;
    }
    console.log(alsFail === 1
      ? '  [OK]   fehlendes shot-sweep.mjs -> Exit 1, kein gruenes Tor'
      : `  [ROT]  fehlendes shot-sweep.mjs -> Exit ${alsFail}, erwartet 1`);
    if (alsFail !== 1) fehler++;

    // Und der Beleg, dass die alte Form wirklich gruen ergab — sonst waere
    // nicht zu sehen, dass dieser Fall ueberhaupt etwas misst.
    const alsSkip = urteil({ name: 'shot-sweep', ok: true, skipped: true });
    console.log(alsSkip === 0
      ? '  [OK]   Gegenprobe: als SKIP waere es Exit 0 gewesen — der Fall misst etwas'
      : `  [ROT]  Gegenprobe unerwartet: SKIP ergibt Exit ${alsSkip}`);
    if (alsSkip !== 0) fehler++;
    zusatz += 2;
  }
}

// --- compare-recon: leere Aufnahme darf keine Bestnote sein ---------------
// Bis zum 30.07.2026 ergaben zwei leere recon-Dateien "Struktur getroffen:
// 5/5, Bewegung/Bedienung: 5/5" und Exit 0. Zwei leere Listen sind
// rechnerisch identisch — daraus wurde eine perfekte Note fuer einen Klon,
// den niemand angesehen hat. Dieselbe Klasse wie die neun `parsed.x || []`
// im G1-Tor, nur im Klon-Werkzeug.
console.log('\nLeere Aufnahme — zwei leere Listen sind keine Uebereinstimmung:\n');
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'compare-recon-'));
  const pruefer = path.join(HIER, '..', 'scripts', 'web-clone', 'compare-recon.mjs');
  const leer = path.join(ordner, 'leer.json');
  const echt = path.join(ordner, 'echt.json');
  fs.writeFileSync(leer, '{}');
  fs.writeFileSync(echt, JSON.stringify({
    url: 'https://beispiel.de',
    captures: [{
      signals: {
        headings: ['Titel', 'Leistungen', 'Kontakt'],
        counts: { links: 12, images: 4, forms: 1, buttons: 3, inputs: 2, canvas: 0, video: 0 },
      },
      screenshot: 's.png',
    }],
  }));

  const lauf = (a, b, name) => {
    const ziel = path.join(ordner, `${name}.md`);
    let code = 0;
    try {
      execFileSync('node', [pruefer, '--original', a, '--clone', b, '--out', ziel],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) { code = e.status ?? 1; }
    const text = fs.existsSync(ziel) ? fs.readFileSync(ziel, 'utf8') : '';
    return { code, text };
  };

  const a = lauf(leer, leer, 'leer');
  const okLeer = a.code === 2 && /nicht gemessen/.test(a.text) && !/Struktur getroffen: \d\/5/.test(a.text);
  console.log(okLeer
    ? '  [OK]   leere Aufnahme -> Exit 2, keine Note im Bericht'
    : `  [ROT]  leere Aufnahme -> Exit ${a.code}, Bericht enthaelt ${/\d\/5/.test(a.text) ? 'Noten' : 'keinen Hinweis'}`);
  if (!okLeer) fehler++;

  // Gegenprobe: echte Signale muessen weiterhin echte Noten ergeben, sonst
  // ist der Vergleich nur noch ein Verweigerer.
  const b = lauf(echt, echt, 'echt');
  const okEcht = b.code === 0 && /Struktur getroffen: \d\/5/.test(b.text);
  console.log(okEcht
    ? '  [OK]   echte Aufnahme -> Exit 0, Noten im Bericht'
    : `  [ROT]  echte Aufnahme -> Exit ${b.code}, keine Noten — Fehlalarm auf gutem Material`);
  if (!okEcht) fehler++;

  fs.rmSync(ordner, { recursive: true, force: true });
}

const gesamt = KAPUTT.length + ECHT_LEER.length + zusatz + 2;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('\nMindestens eine Ausgabe wurde falsch bewertet — das Tor kann falsches Gruen melden.');
  process.exit(1);
}
console.log('Das Tor unterscheidet "keine Probleme" von "keine Antwort".');
process.exit(0);
