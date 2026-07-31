#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
  path.join(__dirname, 'detector', 'detect-antipatterns.mjs'),
  path.join(__dirname, '..', '..', 'cli', 'engine', 'detect-antipatterns.mjs'),
];
const detectorPath = candidates.find(p => fs.existsSync(p));

if (!detectorPath) {
  process.stderr.write('Error: bundled detector not found.\n');
  process.exit(1);
}

// --- Zeigt das Ziel ueberhaupt auf pruefbare Dateien? --------------------
//
// Gemessen am 30.07.2026: ein LEERER Ordner und eine geprueft saubere Seite
// liefern byte-identische Ausgabe — `[]` und Exit 0. Der Aufrufer kann also
// nicht unterscheiden, ob der Detektor nichts gefunden oder nichts gelesen hat.
// Ein fehlender Ordner sagt wenigstens "Warning: cannot access", besteht aber
// ebenfalls mit Exit 0.
//
// Typische Ursachen fuers stille Nichts: Pfad-Tippfehler im richtigen
// Elternordner, Quelle statt Build (oder umgekehrt), vergessenes
// Unterverzeichnis. In allen Faellen liest ein Mensch "keine Anti-Patterns"
// und haelt die Seite fuer geprueft.
//
// Der Detektor selbst ist vendorierter Fremdcode (impeccable) und wird nicht
// angefasst — die Unterscheidung gehoert in diesen Aufrufer, der uns gehoert.
// Exit 2 heisst wie ueberall im Skill: Lauf kaputt, ausdruecklich KEIN Pass.
const ENDUNGEN = ['.html', '.htm', '.css', '.jsx', '.tsx', '.vue', '.svelte', '.astro', '.js', '.ts'];
const UEBERSPRINGEN = new Set(['node_modules', '.git', 'dist', '.next', '.output', 'coverage']);

// Die Tiefengrenze war eine Annahme, kein gemessener Wert.
//
// Gemessen am 31.07.2026: eine Datei neun Ebenen tief. Der Detektor SELBST
// findet den Treffer dort (ai-color-palette, direkt nachgewiesen) — meine
// Vorpruefung von gestern blockte den Lauf vorher mit "keine pruefbare Datei"
// ab. Eine Wache, die enger sieht als das Werkzeug dahinter, meldet Exit 2
// fuer ein Projekt, das der Detektor problemlos scannen wuerde.
//
// Neun Ebenen sind nicht abwegig: monorepo/apps/web/src/components/ui/forms/
// fields/date/ ist schon acht. Die Grenze steht jetzt bei 20 — tief genug fuer
// jeden realen Baum, flach genug gegen Endlos-Symlinks. Sie kostet nichts,
// weil die Zaehlung beim ERSTEN Treffer abbricht.
function zaehlePruefbare(wurzel, tiefe = 0) {
  if (tiefe > 20) return 0;
  let n = 0;
  let einträge;
  try { einträge = fs.readdirSync(wurzel, { withFileTypes: true }); } catch { return 0; }
  for (const e of einträge) {
    if (e.name.startsWith('.') || UEBERSPRINGEN.has(e.name)) continue;
    if (e.isDirectory()) n += zaehlePruefbare(path.join(wurzel, e.name), tiefe + 1);
    else if (ENDUNGEN.includes(path.extname(e.name).toLowerCase())) n += 1;
    if (n > 0 && tiefe === 0) return n;   // einer genuegt als Beweis
  }
  return n;
}

// Ein unbekanntes Flag darf nicht lautlos verschwinden. Bis zum 31.07.2026
// filterte die Zeile unten ALLES mit fuehrendem "-" heraus: `detect.mjs
// --quatsch` gab keine Ausgabe und endete mit Exit 0. Ein Tippfehler sah damit
// aus wie "geprueft und sauber" — bei einem Werkzeug, das eine harte
// Ship-Bedingung ist.
//
// Die Liste stammt aus dem vendorierten Kern (detector/cli/main.mjs),
// nachgelesen statt geraten.
const FLAG_ERLAUBT = ['fast', 'gemini', 'gpt', 'help', 'json',
  'no-config', 'no-design-system', 'no-inline-ignores', 'quiet', 'scope'];
{
  const fremd = process.argv.slice(2)
    .filter((a) => a.startsWith('--'))
    .filter((a) => !FLAG_ERLAUBT.includes(a.slice(2).split('=')[0]));
  if (fremd.length) {
    process.stderr.write(`Unbekanntes Flag: ${fremd.join(', ')}\n`);
    process.stderr.write(`Erlaubt: ${FLAG_ERLAUBT.map((k) => `--${k}`).join(' ')}\n`);
    process.exit(2);
  }
}

// Nur echte Ziele pruefen: URLs kann der Detektor selbst holen, und Flags
// (--json, --quiet) sind keine Pfade.
const ZIELE = process.argv.slice(2).filter((a) => !a.startsWith('-') && !/^https?:\/\//i.test(a));
const URLS = process.argv.slice(2).filter((a) => /^https?:\/\//i.test(a));

// Gar kein Ziel ist kein sauberer Lauf. `node detect.mjs` allein gab bis zum
// 31.07.2026 keine Zeile aus und endete mit Exit 0 — dieselbe Klasse wie das
// verschluckte Flag eine Zeile darueber, nur ohne Tippfehler: wer den Pfad
// vergisst, bekommt ein gruenes Ergebnis ueber nichts.
//
// Die drei Vorpruefungen unten (Ziel nicht gefunden, keine pruefbare Datei im
// Ordner) sagen alle dasselbe: nichts gelesen ist nicht sauber. Nur der Fall
// "nichts uebergeben" fehlte.
// --help ist der eine Aufruf, der bewusst kein Ziel hat. Erster Versuch liess
// ihn mitreissen (Exit 2 auf die Frage nach der Bedienung) — genau der Fehler,
// den ich zwei Runden vorher in tastatur-check und shot-sweep behoben habe.
const WILL_HILFE = process.argv.slice(2).some((a) => a === '--help' || a === '-h');
if (!WILL_HILFE && !ZIELE.length && !URLS.length) {
  process.stderr.write('Fehler: kein Ziel uebergeben.\n');
  process.stderr.write('Aufruf: node detect.mjs <datei-oder-ordner|url> [--json] [--quiet]\n');
  process.stderr.write('Nichts gelesen — das ist kein bestandener Lauf.\n');
  process.exit(2);
}

for (const ziel of ZIELE) {
  let stat;
  try { stat = fs.statSync(ziel); } catch {
    process.stderr.write(`Fehler: Ziel nicht gefunden: ${ziel}\n`);
    process.stderr.write('Nichts gelesen — das ist kein bestandener Lauf.\n');
    process.exit(2);
  }
  if (stat.isDirectory() && zaehlePruefbare(path.resolve(ziel)) === 0) {
    process.stderr.write(`Fehler: keine pruefbare Datei unter ${ziel}\n`);
    process.stderr.write(`Gesucht wurde nach: ${ENDUNGEN.join(' ')}\n`);
    process.stderr.write('Zeigt der Pfad auf den richtigen Ordner? Nichts gelesen ist nicht sauber.\n');
    process.exit(2);
  }
}

const { detectCli } = await import(pathToFileURL(detectorPath));

await detectCli();
