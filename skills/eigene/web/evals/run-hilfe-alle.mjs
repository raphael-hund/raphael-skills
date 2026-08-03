#!/usr/bin/env node
/**
 * run-hilfe-alle.mjs — beantwortet jedes Werkzeug JEDES Skills --help?
 *
 * run-hilfe-check prueft die Werkzeuge dieses Skills, das Gegenstueck in
 * design dessen eigene. Dazwischen liegen die Werkzeuge der uebrigen Skills:
 * kimi-first, ultra-loop, watch, last30days — in Bash und Python, und
 * deshalb von beiden Wachen nie angesehen.
 *
 * Befund 03.08.2026 beim ersten Lauf:
 *   kimi-first.sh --help    -> Exit 2  (Hilfe als Fehlerfall)
 *   watch-extract.sh --help -> Exit 1  (reichte an yt-dlp durch, DESSEN Hilfe kam)
 *
 * Beides in einer Kette gelesen als "Werkzeug kaputt". Und wer die Bedienung
 * sucht, bekommt die eines fremden Programms.
 *
 *   node evals/run-hilfe-alle.mjs
 *
 * Exit 0 = jedes Werkzeug antwortet mit Exit 0 und nennt sich selbst.
 * Exit 1 = mindestens eines nicht. Exit 2 = zu wenige gefunden (nicht geprueft).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = path.join(HIER, '..', '..', '..');
const FRIST_MS = 30000;

// Diese beiden Skills haben eigene Hilfe-Wachen (run-hilfe-check), die mehr
// pruefen als hier moeglich ist. Doppelt zu fahren kostet nur Zeit.
const EIGENE_WACHE = new Set(['eigene/web', 'design']);

// Bibliotheken und vendorierter Code haben keine eigene Kommandozeile.
const KEINE_CLI = /\/(lib|vendor|node_modules|__pycache__)\//;

// Entwickler-Werkzeuge des Upstream-Repos, keine Skill-Werkzeuge: sie bauen
// das Paket, fahren A/B-Vergleiche oder richten den Schluesselbund ein. Ihre
// Kopfzeile nennt jeweils "Usage: bash skills/last30days/scripts/..." — sie
// werden von Hand aufgerufen, nicht aus einer Kette.
//
// Nachgesehen 03.08.2026: compare.sh startet ohne --help-Zweig direkt einen
// Vergleichslauf (ueber 30s), die anderen drei enden mit Exit 1. Sie zu
// aendern hiesse, vendorierten Fremdcode umzubauen — dann ist das naechste
// Upstream-Update ein Konflikt. Genannt statt geaendert.
const FREMDE_ENTWICKLER_WERKZEUGE = new Set([
  'imported/last30days/scripts/build-skill.sh',
  'imported/last30days/scripts/compare.sh',
  'imported/last30days/scripts/setup-keychain.sh',
  'imported/last30days/scripts/test-v1-vs-v2.sh',
]);

function werkzeuge(wurzel, raus = []) {
  for (const e of fs.readdirSync(wurzel, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(wurzel, e.name);
    if (e.isDirectory()) { werkzeuge(p, raus); continue; }
    if (!/\.(sh|py)$/.test(e.name)) continue;
    const rel = path.relative(SKILLS, p);
    if (!rel.includes('/scripts/') || KEINE_CLI.test(`/${rel}`)) continue;
    if ([...EIGENE_WACHE].some((s) => rel.startsWith(`${s}/`))) continue;
    // Testdateien sind keine Werkzeuge.
    if (/^test_|_test\.|\.test\./.test(e.name)) continue;
    if (FREMDE_ENTWICKLER_WERKZEUGE.has(rel)) continue;
    raus.push(rel);
  }
  return raus;
}

const ALLE = werkzeuge(SKILLS).sort();

// Die Ausnahmeliste selbst pruefen: ein Eintrag fuer eine Datei, die es
// nicht mehr gibt, macht sie zur Muellhalde.
{
  const tot = [...FREMDE_ENTWICKLER_WERKZEUGE].filter((f) => !fs.existsSync(path.join(SKILLS, f)));
  if (tot.length) {
    console.error(`\n${tot.length} Ausnahme(n) ohne Datei: ${tot.join(', ')}`);
    console.error('Entfernt oder umbenannt? Die Liste muss mitgezogen werden.\n');
    process.exit(2);
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus.
const MINDESTENS = 3;
if (ALLE.length < MINDESTENS) {
  console.error(`Nur ${ALLE.length} Werkzeug(e) gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

let fehler = 0;
let gezaehlt = 0;
const zeile = (ok, was, detail) => {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
};

console.log(`\nHilfe ausserhalb von web und design — ${ALLE.length} Werkzeuge:\n`);

for (const rel of ALLE) {
  const voll = path.join(SKILLS, rel);
  const interpreter = rel.endsWith('.py') ? 'python3' : 'bash';
  const r = spawnSync(interpreter, [voll, '--help'], {
    encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 8 * 1024 * 1024,
    cwd: path.dirname(voll),
  });

  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(false, `${rel} --help`, `keine Antwort binnen ${FRIST_MS / 1000}s — arbeitet, statt zu antworten`);
    continue;
  }
  if (r.status !== 0) {
    zeile(false, `${rel} --help`, `Exit ${r.status} — Hilfe ist kein Fehlerfall`);
    continue;
  }
  // Die Hilfe muss den eigenen Namen nennen. Sonst reicht das Werkzeug die
  // Frage an ein fremdes Programm durch, und der Aufrufer liest DESSEN
  // Bedienung — genau so meldete watch-extract.sh die Hilfe von yt-dlp.
  const name = path.basename(rel);
  if (!(r.stdout || '').includes(name)) {
    zeile(false, `${rel} --help`, `Ausgabe nennt "${name}" nicht — antwortet ein fremdes Programm?`);
    continue;
  }
  zeile(true, `${rel} --help`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Werkzeuge beantworten --help.`);
if (fehler) {
  console.log('Ein Werkzeug, das seine eigene Hilfe als Defekt meldet, laesst jede Kette stolpern.');
  process.exit(1);
}
console.log('Jedes Werkzeug erklaert sich selbst.');
