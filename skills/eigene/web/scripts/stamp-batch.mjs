#!/usr/bin/env node
// Gibt 3–5 urteils- oder begruendungs-offene Cases fuer eine manuelle Stamp-Nachricht aus. Schreibt nie.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DIR = path.join(HIER, '..', 'references', 'muster-bibliothek');
const HELP = `Usage:
  node stamp-batch.mjs [--dir <muster-bibliothek>] [--min 3] [--max 5] [--json]

Liest Case-Dateien, ignoriert INDEX.md, _template.md und Ledger und gibt hoechstens
3–5 Cases mit ausstehendem Urteil oder offenem Begruendungssatz aus. Das Werkzeug
veraendert keine Datei.`;
const args = process.argv.slice(2);
if (args.includes('--help')) { console.log(HELP); process.exit(0); }
const known = new Set(['--dir', '--min', '--max', '--json', '--help']);
for (const arg of args) if (arg.startsWith('--') && !known.has(arg)) { console.error(`stamp-batch: unbekanntes Flag ${arg}\n\n${HELP}`); process.exit(2); }
function get(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index < 0) return fallback;
  if (!args[index + 1] || args[index + 1].startsWith('--')) { console.error(`stamp-batch: --${name} braucht einen Wert`); process.exit(2); }
  return args[index + 1];
}
const dir = path.resolve(get('dir', DEFAULT_DIR));
const min = Number(get('min', '3'));
const max = Number(get('max', '5'));
if (!Number.isInteger(min) || !Number.isInteger(max) || min < 3 || max > 5 || min > max) {
  console.error('stamp-batch: --min/--max muessen den Bereich 3 bis 5 bilden');
  process.exit(2);
}
if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) { console.error(`stamp-batch: Verzeichnis fehlt: ${dir}`); process.exit(2); }

function field(raw, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return raw.match(new RegExp(`^\\|\\s*${escaped}\\s*\\|\\s*(.*?)\\s*\\|$`, 'mi'))?.[1]?.replaceAll('`', '').trim() || '';
}
function pending(raw) {
  const verdict = field(raw, 'Urteil') || raw.match(/^\*\*Verdikt:\*\*\s*(.+)$/mi)?.[1]?.trim() || '';
  const urteilsOffen = /ausstehend/i.test(verdict) && !/^\s*(GO|NO-GO|gemischt|GO-house-lock)(?:\s|$)/i.test(verdict);
  return urteilsOffen || /begr(?:ü|ue)ndungssatz\s+offen/i.test(verdict);
}
function foldPath(raw, viewport) {
  const rows = raw.split('\n').filter((line) => /^\|/.test(line));
  const row = rows.find((line) => new RegExp(`${viewport}.*Fold`, 'i').test(line));
  if (!row) return 'fehlt';
  const cells = row.split('|').slice(1, -1).map((cell) => cell.trim());
  return cells[1]?.replaceAll('`', '').trim() || 'fehlt';
}
const FRAGEN = [
  'Warum ist dieser Case GO, NO-GO oder gemischt?',
  'Was soll davon als Vorbild übernommen werden?',
  'Was soll ausdrücklich nicht kopiert werden?',
];
const cases = fs.readdirSync(dir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !['INDEX.md', '_template.md', 'eingang-ledger.md'].includes(entry.name))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => {
    const file = path.join(dir, entry.name);
    const raw = fs.readFileSync(file, 'utf8');
    const slug = field(raw, 'Slug') || path.basename(entry.name, '.md');
    return {
      slug,
      quelle: field(raw, 'Quelle') || 'fehlt',
      desktopFold: foldPath(raw, 'Desktop 1440×900'),
      mobilFold: foldPath(raw, 'Mobil 390×844'),
      fragen: FRAGEN,
      file,
      pending: pending(raw),
    };
  })
  .filter((row) => row.pending)
  .slice(0, max)
  .map(({ pending: _, ...row }) => row);

const result = { requested: { min, max }, enough: cases.length >= min, cases };
if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Stamp-Batch: ${cases.length} offene Case(s)${result.enough ? '' : `; fuer einen Batch fehlen ${min - cases.length}`}.`);
  for (const row of cases) {
    console.log(`\n${row.slug} | Quelle: ${row.quelle}`);
    console.log(`Desktop-Fold: ${row.desktopFold}`);
    console.log(`Mobil-Fold: ${row.mobilFold}`);
    row.fragen.forEach((frage, index) => console.log(`${index + 1}. ${frage}`));
  }
}
