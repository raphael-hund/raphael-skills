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
let gezaehlt = 0;
const sag = (s) => console.log(s);
const lauf = (f) => sweepMaengel(f.manifest, f.verlangt, tmp);

sag(`Sweep-Check — Testordner ${tmp}\n`);
sag('Diese Manifeste MUESSEN reissen — jedes ist ein Sweep, der nichts gesehen hat:\n');

for (const f of REISSEN) {
  let maengel = null, fehler = null;
  try { maengel = lauf(f); } catch (e) { fehler = e.message; }
  const ok = !fehler && maengel.length > 0;
  if (!ok) rot++;
  gezaehlt += 1;
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
  gezaehlt += 1;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwarteter Absturz: ${fehler}`);
  else if (!ok) sag(`         faelschlich gerissen: ${maengel.join(' | ')}`);
}

sag('\nEin unlesbares Manifest ist kein sauberer Sweep — es muss werfen:\n');

for (const f of WERFEN) {
  let geworfen = false, meldung = '';
  try { sweepMaengel(f.manifest, ['/'], tmp); } catch (e) { geworfen = true; meldung = e.message; }
  if (!geworfen) rot++;
  gezaehlt += 1;
  sag(`  [${geworfen ? 'OK' : 'ROT'}]   ${f.was}`);
  if (geworfen) sag(`         ${meldung}`);
  else sag('         still als "keine Maengel" durchgelassen');
}

// --- Der Exit-Code von shot-sweep.mjs selbst ---------------------------
// Bis hierher prueft diese Eval die AUSWERTUNG des Manifests im Gate. Was sie
// nicht prueft: ob shot-sweep seine fehlgeschlagenen Routen ueberhaupt als
// Exit-Code weitergibt. Befund 30.07.2026 durch den Sabotage-Lauf —
// `process.exitCode = 1` zu `= 0` geaendert, und keine Eval merkte es. Ein
// Sweep, der nichts fotografiert hat, meldet dann Erfolg, und der Panel-Schritt
// kritisiert Bilder, die es nicht gibt.
//
// Geprueft am echten Lauf gegen eine Route, die es nicht gibt (HTTP 404).
sag('');
{
  const { execFileSync, spawn, spawnSync } = await import('node:child_process');
  const fsN = await import('node:fs');
  const osN = await import('node:os');
  const pathN = await import('node:path');
  const HIER_ = pathN.dirname(new URL(import.meta.url).pathname);
  const SWEEP = pathN.join(HIER_, '..', 'scripts', 'shot-sweep.mjs');
  const ordner = fsN.mkdtempSync(pathN.join(osN.tmpdir(), 'sweep-exit-'));
  // Eine ECHTE Seite: shot-sweep meldet eine fast leere Seite selbst als Fehler
  // ("leere Seite, 4 Zeichen Text") — dann waere der Exit-Code aus dem falschen
  // Grund 1, und der Test bewiese nichts.
  fsN.writeFileSync(pathN.join(ordner, 'index.html'),
    '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Sweep</title></head><body>'
    + '<h1>Sanierung in Karlsruhe</h1>'
    + '<p>Wir sanieren Wohnungen und Haeuser. Nach dem Ortstermin bekommen Sie einen '
    + 'Festpreis, einen Ansprechpartner und ein Datum zum Einzug.</p>'
    + '<p>Bad, Kueche, komplette Wohnungen — meist in elf Werktagen.</p></body></html>');
  const PORT_ = Number(process.env.SWEEP_EXIT_PORT || 5453);
  let messbar = true;

  // Vor dem Start pruefen, ob der Port frei ist. Ist er fremdbelegt, startet
  // python3 gar nicht — der Test lief dann gegen die FREMDE Seite und meldete
  // trotzdem gruen. Gemessen 31.07.2026: mit einem fremden Server auf 5453
  // ergab dieser Lauf 13/13, obwohl der eigene Server nie existierte.
  const belegt = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${PORT_}/`], { encoding: 'utf8' });
  if (belegt.stdout && belegt.stdout.trim() !== '000') {
    sag(`ROT  Port ${PORT_} ist fremdbelegt — dieser Fall kann nicht messen`);
    sag('       Ohne eigenen Server liefe der Test gegen eine fremde Seite');
    sag('       und meldete ihr Ergebnis als eigenes. SWEEP_EXIT_PORT setzen.');
    rot++;
    messbar = false;
  }

  const server = messbar
    ? spawn('python3', ['-m', 'http.server', String(PORT_)], { cwd: ordner, stdio: 'ignore' })
    : null;

  // Aktiv warten statt blind schlafen: 1500 ms reichen auf dieser Maschine,
  // auf einer langsameren nicht — und ein Test, der zufaellig durchfaellt,
  // wird abgeschaltet statt repariert.
  let bereit = false;
  for (let i = 0; messbar && i < 40 && !bereit; i += 1) {
    const q = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
      '-w', '%{http_code}', `http://127.0.0.1:${PORT_}/`], { encoding: 'utf8' });
    if (q.stdout && q.stdout.trim() === '200') bereit = true;
    else spawnSync('sleep', ['0.2']);
  }
  if (messbar && !bereit) {
    server.kill('SIGKILL');
    fsN.rmSync(ordner, { recursive: true, force: true });
    sag(`ROT  eigener Testserver auf ${PORT_} antwortet nicht — nichts gemessen`);
    rot++;
    messbar = false;
  }
  let code = 0;
  if (messbar && bereit) try {
    execFileSync('node', [SWEEP, '--base', `http://localhost:${PORT_}`,
      '--routes', '/,/gibt-es-nicht', '--out', pathN.join(ordner, 'out')],
      { encoding: 'utf8', timeout: 300000 });
  } catch (e) { code = e.status ?? 1; }
  if (server) server.kill('SIGKILL');
  fsN.rmSync(ordner, { recursive: true, force: true });
  // Bei nicht messbarem Fall ist die Zeile oben schon rot gezaehlt — hier
  // nicht doppelt zaehlen und nicht faelschlich gruen melden.
  const ok = messbar && bereit && code === 1;
  if (!ok && messbar && bereit) rot++;
  // Bei nicht messbarem Fall steht der Grund schon oben. Eine zweite rote
  // Zeile ueber dieselbe Ursache liest sich wie ein zweiter Defekt.
  if (messbar && bereit) sag(`${ok ? 'OK  ' : 'ROT '} shot-sweep.mjs endet mit Exit 1, wenn eine Route fehlschlaegt`);
  if (!ok) sag(`       bekam Exit ${code} — ein Sweep ohne Bilder meldet Erfolg`);
}

// Selbst zaehlen statt Listen zu addieren.
//
// Hier stand `... + 1` fuer eine Zusatzpruefung, die es nicht (mehr) gibt:
// gemessen am 31.07.2026 druckt der Lauf 13 Zeilen und behauptete 14. Die
// Listen haben 7 + 3 + 3 Eintraege; die +1 zaehlte eine Pruefung, die
// nirgends stattfindet. Ein zu HOHER Sollwert ist die stillere Haelfte des
// Problems: die Eval meldet dauerhaft "13/14" und sieht aus, als fehle
// dauerhaft etwas.
//
// Fuenfter Formel-Fall dieser Serie (detect-check, naht-check, craft-check,
// doku-zahlen, jetzt sweep-check).
// Untergrenze gegen die Gegenrichtung: faellt eine Zaehlstelle oder ein
// ganzer Abschnitt aus, zaehlt `gezaehlt` einfach weniger und "10/10" saehe
// gruen aus. Genau das trat bei der Gegenprobe am 31.07.2026 ein. Die drei
// Listen sind die bekannte Untergrenze.
const MINDESTENS = REISSEN.length + DURCHLASSEN.length + WERFEN.length;
if (gezaehlt < MINDESTENS) {
  sag(`\nNur ${gezaehlt} Pruefungen gelaufen, mindestens ${MINDESTENS} erwartet.`);
  sag('Ein Abschnitt ist still ausgefallen — das ist kein bestandener Lauf.');
  process.exit(2);
}
const gesamt = gezaehlt;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Ein Sweep ohne Bilder kommt als Gruen durch. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
sag('Ein Sweep, der nichts fotografiert hat, besteht nicht mehr.');
