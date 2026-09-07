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
import { execFileSync, spawn, spawnSync } from 'node:child_process';

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
// Selbst zaehlen statt zu rechnen. Die Schlusszeile stand auf
// `KAPUTT.length + ECHT_LEER.length + zusatz + 2` — eine feste Zahl in einer
// Bilanzformel altert still, weil sie plausibel bleibt. Dieselbe Falle steckte
// diese Session schon in sechs anderen Evals.
//
// Gezaehlt wird an der DRUCKSTELLE, nicht an den Listen: diese Eval hat vier
// verschiedene Meldeformen (Template mit Ternary im String, mehrzeiliges
// Ternary, feste Strings). Ein Muster, das die Aufrufe erkennen soll, traf nur
// 4 von 15 — die Kapselung trifft alle.
let gezaehlt = 0;
const sag = (text) => { gezaehlt++; console.log(text); };

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
  sag(`  ${erkannt ? '[OK]  ' : '[FAIL]'} ${f.was}\n         ${wie}`);
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
  sag(`  ${ok ? '[OK]  ' : '[FAIL]'} ${f.was}\n         ${wie}`);
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
    sag('  [ROT]  QUALITAET-Liste nicht im Tor gefunden — umbenannt?');
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
      sag('  [ROT]  Stelle "shot-sweep.mjs fehlt" nicht im Tor gefunden — umgebaut?');
      fehler++;
    }
    sag(alsFail === 1
      ? '  [OK]   fehlendes shot-sweep.mjs -> Exit 1, kein gruenes Tor'
      : `  [ROT]  fehlendes shot-sweep.mjs -> Exit ${alsFail}, erwartet 1`);
    if (alsFail !== 1) fehler++;

    // Und der Beleg, dass die alte Form wirklich gruen ergab — sonst waere
    // nicht zu sehen, dass dieser Fall ueberhaupt etwas misst.
    const alsSkip = urteil({ name: 'shot-sweep', ok: true, skipped: true });
    sag(alsSkip === 0
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
    sag(okLeer
    ? '  [OK]   leere Aufnahme -> Exit 2, keine Note im Bericht'
    : `  [ROT]  leere Aufnahme -> Exit ${a.code}, Bericht enthaelt ${/\d\/5/.test(a.text) ? 'Noten' : 'keinen Hinweis'}`);
  if (!okLeer) fehler++;

  // Gegenprobe: echte Signale muessen weiterhin echte Noten ergeben, sonst
  // ist der Vergleich nur noch ein Verweigerer.
  const b = lauf(echt, echt, 'echt');
  const okEcht = b.code === 0 && /Struktur getroffen: \d\/5/.test(b.text);
    sag(okEcht
    ? '  [OK]   echte Aufnahme -> Exit 0, Noten im Bericht'
    : `  [ROT]  echte Aufnahme -> Exit ${b.code}, keine Noten — Fehlalarm auf gutem Material`);
  if (!okEcht) fehler++;

  fs.rmSync(ordner, { recursive: true, force: true });
}

// --- Nennt das Tor den GRUND, wenn ein Pruefer abstuerzt? -----------------
// Bis zum 01.08.2026 nahm es dafuer e.stderr. Werkzeuge, die ihren Grund ins
// JSON auf stdout legen (tastatur-check, motion-check, import-check seit den
// Symlink-Faellen), hinterliessen ein leeres stderr — und die Meldung fiel auf
// e.message zurueck: "Command failed: node /root/raphael-skills/.claude/..."
//
// Gemessen mit einem toten Symlink im --src: drei Pruefer meldeten genau das.
// Der Nutzer sah einen abgeschnittenen Kommandopfad und keinen Grund.
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'kaputt-grund-'));
  fs.writeFileSync(path.join(ordner, 'index.html'),
    '<!doctype html><html lang="de"><head><meta charset="utf-8">'
    + '<title>T</title></head><body><h1>S</h1></body></html>\n');
  fs.writeFileSync(path.join(ordner, 'a.tsx'), 'export const A = () => null;\n');
  fs.symlinkSync(path.join(ordner, 'gibtsnicht.tsx'), path.join(ordner, 'tot.tsx'));

  let messbar = true;
  const port = Number(process.env.KAPUTT_GRUND_PORT || 5493);

  // Ist der Port frei? Sonst startet python3 gar nicht, und das Tor liefe
  // gegen die FREMDE Seite — der Fall meldete dann gruen ueber ein Ergebnis,
  // das ihm nicht gehoert. Gemessen 02.08.2026: mit einem fremden Server auf
  // 5493 lief diese Eval 16/16 durch, obwohl ihr Testserver nie existierte.
  //
  // Die uebrigen zehn Evals mit festem Port haben so eine Wache seit dem
  // 31.07.2026; diese hier war die letzte ohne.
  const belegt = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${port}/`], { encoding: 'utf8' });
  if ((belegt.stdout || '').trim() !== '000') {
    sag(`  [ROT]  Port ${port} ist fremdbelegt — dieser Fall kann nichts messen`);
    sag(`         Das Tor liefe gegen eine fremde Seite und gaebe deren Ergebnis`);
    sag(`         als eigenes aus. Anderen Port setzen: KAPUTT_GRUND_PORT=<frei>`);
    fehler++;
    fs.rmSync(ordner, { recursive: true, force: true });
    messbar = false;
  }
  const srv = messbar ? spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'],
    { cwd: ordner, stdio: 'ignore' }) : null;
  let bereit = false;
  for (let i = 0; messbar && i < 50 && !bereit; i += 1) {
    const q = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
      '-w', '%{http_code}', `http://127.0.0.1:${port}/`], { encoding: 'utf8' });
    if ((q.stdout || '').trim() === '200') bereit = true;
    else spawnSync('sleep', ['0.2']);
  }

  if (messbar && !bereit) {
    srv.kill('SIGKILL');
    sag(`  [ROT]  Testserver auf ${port} kam nicht hoch — Fall nicht messbar`);
    fehler++;
  } else if (messbar) {
    const r = spawnSync('node', [path.join(HIER, '..', 'scripts', 'g1-gate.mjs'),
      '--url', `http://127.0.0.1:${port}/`, '--src', ordner, '--no-shots'],
      { encoding: 'utf8', timeout: 600000, maxBuffer: 32 * 1024 * 1024 });
    srv.kill('SIGKILL');
    const aus = `${r.stdout || ''}${r.stderr || ''}`;
    const zeilen = aus.split('\n').filter((z) => /\[FAIL\] (tastatur|motion|importe)/.test(z));
    // Jede dieser Zeilen muss den Grund nennen, nicht den Kommandopfad.
    const mitGrund = zeilen.filter((z) => /nicht lesbar|Symlink|ENOENT/i.test(z));
    const nurPfad = zeilen.filter((z) => /Command failed: node \//.test(z));
    const ok = zeilen.length >= 3 && mitGrund.length === zeilen.length && nurPfad.length === 0;
    sag(ok
      ? `  [OK]   Tor nennt den Grund statt des Kommandopfads (${zeilen.length} Pruefer)`
      : `  [ROT]  ${nurPfad.length} von ${zeilen.length} Meldungen zeigen nur "Command failed: node /..."`);
    if (!ok) fehler++;
  }

  fs.rmSync(ordner, { recursive: true, force: true });
}

const gesamt = gezaehlt;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('\nMindestens eine Ausgabe wurde falsch bewertet — das Tor kann falsches Gruen melden.');
  process.exit(1);
}
console.log('Das Tor unterscheidet "keine Probleme" von "keine Antwort".');
process.exit(0);
