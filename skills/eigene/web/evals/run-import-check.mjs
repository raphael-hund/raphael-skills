#!/usr/bin/env node
/**
 * run-import-check.mjs — prueft, ob der Import-Pruefer wirklich prueft.
 *
 * Bis zum 29.07.2026 hatte `import-check.mjs` eine eigene, schwaechere
 * Export-Aufloesung als `lib-lookup.mjs`. Drei Wege zu falschem Gruen:
 *
 *   1. Jedes `export * from` liess es aufgeben. Sechs der 30 Libraries
 *      (zustand, date-fns, motion, leva, clsx, gsap) wurden nie geprueft —
 *      ein erfundener Import kam durch, Schlusszeile "Kein erfundener Import".
 *   2. Subpfade fielen ganz raus: `libFuer` verglich nur auf Gleichheit, also
 *      passte `motion/react` auf keine Library. Das ist der einzige Motion-Pfad,
 *      den der Skill ueberhaupt lehrt (75-mal in den References) — der
 *      meistgenutzte Importpfad war der einzige ungepruefte.
 *   3. Verschachtelte `exports`-Bedingungen wurden nicht aufgeloest. Bei `clsx`
 *      las der Pruefer die CommonJS-Typdatei (`export = clsx`), waehrend jedes
 *      ESM-Projekt die `.d.mts` mit `export function clsx` benutzt — und meldete
 *      `import { clsx } from "clsx"` im eigenen `lib/utils.ts` des Skills als
 *      erfundenen Import.
 *
 * Geprueft wird in beide Richtungen, denn beide Fehler kosten:
 *   falsches Gruen — ein erfundener Import darf nie durchgehen
 *   falsches Rot   — ein echter Import darf nie gemeldet werden
 *
 * Braucht weder Browser noch Server, nur den Tresor.
 *
 *   node evals/run-import-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 * Exit 2 = Tresor fehlt — dann ist nichts pruefbar.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, '..', 'scripts', 'import-check.mjs');
const VAULT = process.env.UIKIT_VAULT || '/root/tools/uikit-vault';

if (!fs.existsSync(path.join(VAULT, 'package.json'))) {
  console.error(`Kein Tresor unter ${VAULT} — ohne echte Exporte ist nichts pruefbar.`);
  process.exit(2);
}

// Der Pruefer meldet Befunde ueber den Exit-Code UND die JSON-Ausgabe. Beides
// wird gelesen: ein Werkzeug, das Exit 1 sagt, aber keinen Befund nennt, ist
// genauso kaputt wie eines, das schweigt.
function lauf(quelltext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'import-check-'));
  fs.mkdirSync(path.join(dir, 'src'));
  fs.writeFileSync(path.join(dir, 'src', 'a.tsx'), quelltext);
  let roh = '';
  let code = 0;
  try {
    roh = execFileSync('node', [PRUEFER, '--src', dir, '--json'], { encoding: 'utf8' });
  } catch (e) {
    roh = e.stdout || '';
    code = e.status ?? 1;
  }
  fs.rmSync(dir, { recursive: true, force: true });
  let daten = null;
  try { daten = JSON.parse(roh); } catch { /* unlesbar bleibt null */ }
  return { code, daten, roh };
}

const FAELLE = [
  // --- falsches Gruen: jeder erfundene Name MUSS auffallen -----------------
  {
    was: 'erfundener Name aus sonner (der alte, einzige Fall)',
    code: `import { toast, ToastProvider } from 'sonner';`,
    erwartet: ['ToastProvider'],
  },
  {
    was: 'zustand — Weiterleitung per export *',
    code: `import { create, gibtEsNichtInZustand } from 'zustand';`,
    erwartet: ['gibtEsNichtInZustand'],
  },
  {
    was: 'date-fns — export * ueber ~300 Einzeldateien',
    code: `import { format, dasHierIstErfunden } from 'date-fns';`,
    erwartet: ['dasHierIstErfunden'],
  },
  {
    was: 'leva — Weiterleitung auf declarations/',
    code: `import { useControls, erfundenerRegler } from 'leva';`,
    erwartet: ['erfundenerRegler'],
  },
  {
    was: 'motion/react — der Subpfad, den der Skill 75-mal lehrt',
    code: `import { motion, AnimatePresenceX } from 'motion/react';`,
    erwartet: ['AnimatePresenceX'],
  },
  {
    was: 'mehrere erfundene Namen in einer Zeile',
    code: `import { toast, ErfundenA, ErfundenB } from 'sonner';`,
    erwartet: ['ErfundenA', 'ErfundenB'],
  },
  {
    was: 'umbenannter Import (as) prueft den Quellnamen',
    code: `import { gibtEsNicht as t } from 'sonner';`,
    erwartet: ['gibtEsNicht'],
  },
  {
    // Der Gegenpol zum clsx-Fehlalarm weiter unten: dort darf nichts gemeldet
    // werden, hier muss etwas gemeldet werden. Ohne beide Faelle sieht ein
    // Pruefer, der clsx schlicht ueberspringt, in der einen Richtung gruen aus —
    // genau der Zustand vor dem 29.07.2026, als die CommonJS-Typdatei gelesen
    // wurde und nach dem Filtern eine leere Menge uebrigblieb.
    was: 'clsx wird wirklich geprueft, nicht nur nicht gemeldet',
    code: `import { clsxx } from 'clsx';`,
    erwartet: ['clsxx'],
  },
  {
    // Bis 29.07.2026 meldete der Tresor @base-ui/react als UNPRUEFBAR: die
    // Typen liegen als `.d.mts` (der Resolver kannte nur `.d.ts`) und jedes
    // Primitive wird per `export * as Select from ...` gebuendelt — kein
    // Stern-Reexport, sondern genau ein Name. Damit war die Library komplett
    // ungeprueft, und zwar genau die, die die Komponenten-Doku seit demselben
    // Tag fuer neun Widgets empfiehlt.
    was: '@base-ui/react — .d.mts-Typen und export * as NAME',
    code: `import { Select, GibtEsNichtInBaseUi } from '@base-ui/react';`,
    erwartet: ['GibtEsNichtInBaseUi'],
  },

  // --- falsches Rot: echte Importe duerfen NIE gemeldet werden ------------
  {
    was: 'echte sonner-Exporte',
    code: `import { Toaster, toast } from 'sonner';`,
    erwartet: [],
  },
  {
    // Die andere Richtung zum Fall oben: haette der Fix nur "gib bei base-ui
    // auf" gelautet, waere der Fund-Fall gruen und dieser hier auch. Erst beide
    // zusammen zeigen, dass die Namen wirklich gelesen werden.
    was: 'echte base-ui-Primitives (Select/Popover/Tooltip)',
    code: `import { Select, Popover, Tooltip } from '@base-ui/react';`,
    erwartet: [],
  },
  {
    was: 'motion/react mit AnimatePresence (liegt NICHT in motion)',
    code: `import { motion, AnimatePresence, useScroll } from 'motion/react';`,
    erwartet: [],
  },
  {
    was: 'clsx aus der ESM-Typdatei — der Fehlalarm im eigenen lib/utils.ts',
    code: `import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';`,
    erwartet: [],
  },
  {
    was: 'zustand + date-fns + leva, alles echt',
    code: `import { create } from 'zustand';\nimport { format, addDays } from 'date-fns';\nimport { useControls } from 'leva';`,
    erwartet: [],
  },
  {
    was: 'Scoped Package mit Subpfad (@dnd-kit/core)',
    code: `import { DndContext, useDraggable } from '@dnd-kit/core';`,
    erwartet: [],
  },
  {
    was: 'gsap — Namespace-API, kein benannter Import pruefbar',
    code: `import gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';`,
    erwartet: [],
  },
  {
    was: 'Fremd-Library ausserhalb des Tresors wird ignoriert',
    code: `import { irgendwas } from 'react';\nimport { nochwas } from './lokal';`,
    erwartet: [],
  },
  {
    was: 'Typ-Import zaehlt nicht als Wert-Import',
    code: `import { type ClassValue } from 'clsx';`,
    erwartet: [],
  },
];

let rot = 0;
// Selbst zaehlen statt zu rechnen. Die Schlusszeile stand auf
// `FAELLE.length + (eigene ? 1 : 0) + 3` — eine feste Zahl in einer
// Bilanzformel altert still, weil sie plausibel bleibt. Dieselbe Falle
// steckte diese Session schon in fuenf anderen Evals.
let gezaehlt = 0;
console.log(`Import-Check-Pruefstand — ${FAELLE.length} Faelle gegen ${VAULT}\n`);

for (const f of FAELLE) {
  const { code, daten } = lauf(f.code);
  if (!daten) {
    gezaehlt++;
    console.log(`  [ROT]  ${f.was}`);
    console.log('         Ausgabe war kein lesbares JSON — der Pruefer selbst ist kaputt');
    rot++;
    continue;
  }
  const gemeldet = daten.befunde.map((b) => b.name).sort();
  const soll = [...f.erwartet].sort();
  const gleich = gemeldet.length === soll.length && gemeldet.every((n, i) => n === soll[i]);
  // Exit-Code und Befundliste muessen zusammenpassen, sonst liest ein Runner
  // das Gegenteil dessen, was die Ausgabe sagt.
  const codeOk = code === (soll.length ? 1 : 0);
  if (gleich && codeOk) {
    gezaehlt++;
    console.log(`  [OK]   ${f.was}`);
    if (soll.length) console.log(`         gefangen: ${gemeldet.join(', ')}`);
  } else {
    rot++;
    gezaehlt++;
    console.log(`  [ROT]  ${f.was}`);
    if (!gleich) console.log(`         erwartet [${soll.join(', ')}], gemeldet [${gemeldet.join(', ')}]`);
    if (!codeOk) console.log(`         Exit ${code}, erwartet ${soll.length ? 1 : 0}`);
  }
}

// Der Pruefer darf nicht dadurch gruen werden, dass er nichts anschaut. Die
// eigene Komponenten-Bibliothek ist die groesste echte Stichprobe im Repo:
// 113 Dateien, ueber 300 Tresor-Importe, alle von Hand geschrieben.
const eigene = path.join(HIER, '..', 'references', 'ui-components');
if (fs.existsSync(eigene)) {
  console.log('\nDie eigene Komponenten-Bibliothek als Flaechenprobe:\n');
  let daten = null;
  let code = 0;
  try {
    daten = JSON.parse(execFileSync('node', [PRUEFER, '--src', eigene, '--json'], { encoding: 'utf8' }));
  } catch (e) {
    try { daten = JSON.parse(e.stdout || ''); } catch { /* bleibt null */ }
    code = e.status ?? 1;
  }
  const MINDESTENS = 200;
  if (!daten) {
    gezaehlt++;
    console.log('  [ROT]  Pruefer lieferte kein lesbares JSON');
    rot++;
  } else if (daten.befunde.length || code !== 0) {
    gezaehlt++;
    console.log(`  [ROT]  ${daten.befunde.length} Fehlalarm(e) auf eigenem, funktionierendem Code`);
    for (const b of daten.befunde.slice(0, 5)) console.log(`         ${b.datei}:${b.zeile} "${b.name}" aus ${b.quelle}`);
    rot++;
  } else if (daten.geprueft < MINDESTENS) {
    // Ohne diese Schwelle waere ein Pruefer, der alles ueberspringt, hier gruen.
    gezaehlt++;
    console.log(`  [ROT]  nur ${daten.geprueft} Importe geprueft, erwartet mindestens ${MINDESTENS}`);
    console.log('         Ein Pruefer, der nichts anschaut, hat immer recht.');
    rot++;
  } else {
    gezaehlt++;
    console.log(`  [OK]   ${daten.geprueft} echte Importe in ${daten.dateien} Dateien, kein Fehlalarm`);
  }
}

// --- Aufruf ohne --src ----------------------------------------------------
// `node import-check.mjs /pfad/zum/projekt` sah aus wie ein Aufruf und war
// keiner: der Pfad wurde still verworfen, geprueft wurde der aktuelle Ordner,
// und darueber kam Exit 0. Ein gruenes Urteil ueber ein Projekt, das der
// Pruefer nie gesehen hat — dieselbe Klasse Fehler, gegen die er gebaut ist.
console.log('\nAufruf-Form — ein verworfener Pfad darf kein Urteil erzeugen:\n');
{
  const leer = fs.mkdtempSync(path.join(os.tmpdir(), 'import-arg-'));
  let code = 0;
  let aus = '';
  try {
    aus = execFileSync('node', [PRUEFER, leer], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    code = e.status ?? 1;
    aus = `${e.stdout || ''}${e.stderr || ''}`;
  }
  fs.rmSync(leer, { recursive: true, force: true });
  // Exit 2 = "nicht geprueft", nicht "bestanden" — dieselbe Trennung wie im Tor.
  const ok = code === 2 && /--src/.test(aus);
  gezaehlt++;
  console.log(ok
    ? '  [OK]   Pfad ohne --src -> Exit 2 mit Hinweis, kein stilles Urteil'
    : `  [ROT]  Pfad ohne --src -> Exit ${code}, erwartet 2 mit --src-Hinweis`);
  if (!ok) rot++;
}

// --- Lauf ueber null Dateien ----------------------------------------------
// Ein leerer oder falsch angegebener Ordner ergab "Kein erfundener Import" und
// Exit 0 — gruen ueber nichts. Die Unterscheidung, auf die es ankommt: null
// DATEIEN ist immer ein Pfadfehler, null TRESOR-IMPORTE dagegen legitim (ein
// Projekt darf ohne Library auskommen). Beide Richtungen werden geprueft.
console.log('\nLeerer Ordner — gruen ueber nichts ist kein Ergebnis:\n');
{
  const leer = fs.mkdtempSync(path.join(os.tmpdir(), 'import-leer-'));
  const lauf = (ordner) => {
    try {
      execFileSync('node', [PRUEFER, '--src', ordner], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      return 0;
    } catch (e) { return e.status ?? 1; }
  };

  const codeLeer = lauf(leer);
  const okLeer = codeLeer === 1;
  gezaehlt++;
  console.log(okLeer
    ? '  [OK]   0 Dateien -> Exit 1, kein stilles "sauber"'
    : `  [ROT]  0 Dateien -> Exit ${codeLeer}, erwartet 1`);
  if (!okLeer) rot++;

  // Gegenprobe: echter Code ohne Tresor-Import darf NICHT abbrechen.
  fs.writeFileSync(path.join(leer, 'x.ts'), 'export const a = 1;\n');
  const codeOhne = lauf(leer);
  const okOhne = codeOhne === 0;
  gezaehlt++;
  console.log(okOhne
    ? '  [OK]   Datei ohne Tresor-Import -> Exit 0, kein Fehlalarm'
    : `  [ROT]  Datei ohne Tresor-Import -> Exit ${codeOhne}, erwartet 0`);
  if (!okOhne) rot++;

  fs.rmSync(leer, { recursive: true, force: true });
}

// --- Unlesbarer Tresor ----------------------------------------------------
// Die Existenz der Tresor-package.json wird geprueft, ihre LESBARKEIT stand
// bis zum 01.08.2026 nicht: eine zerstoerte Datei ergab 12 Zeilen Stacktrace
// und Exit 1 — in diesem Skill "geprueft und durchgefallen". Geprueft wurde
// nichts; ohne Abhaengigkeitsliste weiss der Check gar nicht, welche
// Libraries existieren.
{
  const tresor = fs.mkdtempSync(path.join(os.tmpdir(), 'import-check-tresor-'));
  fs.writeFileSync(path.join(tresor, 'package.json'), '{ kaputt ohne Anfuehrungszeichen }');
  const quelle = fs.mkdtempSync(path.join(os.tmpdir(), 'import-check-quelle-'));
  fs.writeFileSync(path.join(quelle, 'a.tsx'), "import { toast } from 'sonner';\n");

  const r = spawnSync('node', [PRUEFER, '--src', quelle],
    { encoding: 'utf8', env: { ...process.env, UIKIT_VAULT: tresor } });
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  gezaehlt++;
  const ok = r.status === 2 && /unbrauchbar|kein lesbares JSON/i.test(aus);
  if (!ok) rot++;
  console.log(ok
    ? '  [OK]   unlesbare Tresor-package.json -> Exit 2 mit Klartext'
    : `  [ROT]  unlesbare Tresor-package.json -> Exit ${r.status}, erwartet 2`);
  if (!ok) console.log(`         ${aus.trim().split('\n')[0].slice(0, 70)}`);

  fs.rmSync(tresor, { recursive: true, force: true });
  fs.rmSync(quelle, { recursive: true, force: true });
}

// --- Unlesbare Datei ------------------------------------------------------
// Ein Lesefehler wurde bis zum 01.08.2026 still verschluckt (`catch { continue }`).
// Gemessen mit chmod 000: der Lauf meldete "Kein erfundener Import", Exit 0 —
// ein Testat ueber eine Datei, die nie geoeffnet wurde.
//
// Nicht nur Rechte: defekter Sektor, weggezogener Netzmount, eine Datei die
// waehrend des Laufs verschwindet. Selten, aber dann still.
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'import-check-rechte-'));
  const zu = path.join(ordner, 'zu.tsx');
  fs.writeFileSync(zu, "import { toast } from 'sonner';\n");
  fs.chmodSync(zu, 0o000);

  const r = spawnSync('node', [PRUEFER, '--src', ordner], { encoding: 'utf8' });
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  gezaehlt++;
  const ok = r.status === 2 && /nicht gelesen werden/i.test(aus);
  if (!ok) rot++;
  console.log(ok
    ? '  [OK]   unlesbare Datei -> Exit 2, kein stilles "sauber"'
    : `  [ROT]  unlesbare Datei -> Exit ${r.status}, erwartet 2`);
  if (!ok) console.log(`         ${aus.trim().split('\n').slice(-1)[0].slice(0, 66)}`);

  // Gegenrichtung: lesbar gemacht, dann muss normal geurteilt werden. Eine
  // Wache, die auch saubere Ordner ablehnt, wird abgeschaltet statt benutzt.
  fs.chmodSync(zu, 0o644);
  const r2 = spawnSync('node', [PRUEFER, '--src', ordner], { encoding: 'utf8' });
  gezaehlt++;
  const ok2 = r2.status !== 2;
  if (!ok2) rot++;
  console.log(ok2
    ? '  [OK]   dieselbe Datei lesbar -> normales Urteil'
    : '  [ROT]  lesbare Datei -> Exit 2, die Wache ist zu scharf');

  fs.rmSync(ordner, { recursive: true, force: true });
}

const gesamt = gezaehlt;
console.log(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  console.log('Der Import-Pruefer urteilt falsch. Erst reparieren, dann damit bauen.');
  process.exit(1);
}
console.log('Erfundene Importe fallen auf, echte kommen durch — auch ueber Weiterleitungen und Subpfade.');
