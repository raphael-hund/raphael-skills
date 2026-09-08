#!/usr/bin/env node
// Scannt frische .url/.urls.txt-Dateien, legt Cases vor dem Capture an und protokolliert sie idempotent.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const DEFAULT_OUT = path.join(WEB, 'references', 'muster-bibliothek');
const HELP = `Usage:
  node eingang-url-watch.mjs [--eingang /root/eingang] [--tage 7]
    [--out <muster-bibliothek>] [--template <_template.md>]
    [--ledger <eingang-ledger.md>] [--runner <muster-studie.mjs>]
    [--dry-run] [--json]

Liest .url und .urls.txt, dedupliziert nach Host und verarbeitet nur Dateien der
letzten N Tage. Vorhandene Cases werden nach einem Capture-Fehler erneut
verarbeitet; menschliche Eintraege bleiben erhalten. Nur ein erfolgreicher
Ledger-Eintrag mit vorhandenem Case wird uebersprungen.
Dry-run schreibt nichts und startet keinen Capture.`;

const args = process.argv.slice(2);
function value(name, fallback) {
  const index = args.indexOf(`--${name}`);
  if (index < 0) return fallback;
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`--${name} braucht einen Wert`);
  return args[index + 1];
}
function die(message) { console.error(`eingang-url-watch: ${message}\n\n${HELP}`); process.exit(2); }
if (args.includes('--help')) { console.log(HELP); process.exit(0); }
const known = new Set(['--eingang', '--tage', '--out', '--template', '--ledger', '--runner', '--dry-run', '--json', '--help']);
for (const arg of args) if (arg.startsWith('--') && !known.has(arg)) die(`unbekanntes Flag ${arg}`);

let inputDir, days, outDir, templatePath, ledgerPath, runnerPath;
try {
  inputDir = path.resolve(value('eingang', '/root/eingang'));
  days = Number(value('tage', '7'));
  outDir = path.resolve(value('out', DEFAULT_OUT));
  templatePath = path.resolve(value('template', path.join(DEFAULT_OUT, '_template.md')));
  ledgerPath = path.resolve(value('ledger', path.join(DEFAULT_OUT, 'eingang-ledger.md')));
  runnerPath = path.resolve(value('runner', path.join(HIER, 'muster-studie.mjs')));
} catch (error) { die(error.message); }
if (!Number.isFinite(days) || days < 0) die('--tage muss eine Zahl >= 0 sein');
if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) die(`Eingang fehlt: ${inputDir}`);
if (!fs.existsSync(templatePath)) die(`Template fehlt: ${templatePath}`);
if (!fs.existsSync(runnerPath)) die(`Runner fehlt: ${runnerPath}`);

const dryRun = args.includes('--dry-run');
const jsonMode = args.includes('--json');
const cutoff = Date.now() - days * 86400_000;
const candidates = fs.readdirSync(inputDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && (entry.name.toLowerCase().endsWith('.url') || entry.name.toLowerCase().endsWith('.urls.txt')))
  .map((entry) => ({ name: entry.name, file: path.join(inputDir, entry.name), stat: fs.statSync(path.join(inputDir, entry.name)) }))
  .filter((entry) => entry.stat.mtimeMs >= cutoff)
  .sort((a, b) => a.name.localeCompare(b.name));

function canonical(raw) {
  try {
    const url = new URL(raw.trim().replace(/[)>.,;]+$/g, ''));
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hash = '';
    return url.toString();
  } catch { return null; }
}
function slugFor(rawUrl) {
  const host = new URL(rawUrl).hostname.toLowerCase().replace(/^www\./, '');
  const slug = host.normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  return slug || 'website';
}

const byHost = new Map();
for (const candidate of candidates) {
  const raw = fs.readFileSync(candidate.file, 'utf8');
  // InternetShortcut-Dateien koennen weitere URL-artige Felder (z. B. Icons)
  // enthalten; nur das definierte URL= Feld ist die Studienquelle.
  const shortcut = candidate.name.toLowerCase().endsWith('.url') && !candidate.name.toLowerCase().endsWith('.urls.txt');
  const matches = shortcut
    ? [raw.match(/^URL\s*=\s*(https?:\/\/\S+)/mi)?.[1]].filter(Boolean)
    : (raw.match(/https?:\/\/[^\s"'<>]+/gi) || []);
  for (const found of matches) {
    const url = canonical(found);
    if (!url) continue;
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    if (!byHost.has(host)) byHost.set(host, { url, slug: slugFor(url), source: candidate.file });
  }
}
const urls = [...byHost.values()].sort((a, b) => a.slug.localeCompare(b.slug));
const result = { dryRun, scannedFiles: candidates.length, urls, created: 0, retried: 0, skipped: 0, failed: 0, ledgerUpdated: false };

function renderCase(template, row) {
  const date = new Date().toLocaleDateString('de-CH', { timeZone: 'Europe/Zurich', day: '2-digit', month: '2-digit', year: 'numeric' });
  let text = template.replaceAll('<slug>', row.slug).replace('# Case: <Name der Seite>', `# Case: ${new URL(row.url).hostname}`);
  text = text.replace('| Quelle | Kanonische URL plus Abrufdatum oder `Screenshot in /root/eingang/<datei>`; bei Video zusätzlich Video-ID |', `| Quelle | ${row.url} · Abrufdatum ${date} · Eingang \`${row.source}\` |`);
  text = text.replace('| Quelle | Kanonische URL plus Abrufdatum |', `| Quelle | ${row.url} · Abrufdatum ${date} · Eingang \`${row.source}\` |`);
  text = text.replace('| Datum der Studie | TT.MM.JJJJ |', `| Datum der Studie | ${date} |`);
  return text;
}
function ledgerHeader() {
  return '# Eingang-Ledger — Muster-Studien\n\nMaschinell gepflegt durch `eingang-url-watch.mjs`; Urteil bleibt manuell.\n\n| URL | Slug | Eingangsdatei | Status |\n|---|---|---|---|\n';
}
function ledgerStatuses(raw) {
  const statuses = new Map();
  for (const line of raw.split('\n')) {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 4 || !/^https?:\/\//.test(cells[0])) continue;
    try {
      const host = new URL(cells[0]).hostname.toLowerCase().replace(/^www\./, '');
      statuses.set(host, cells[3]);
    } catch { /* Keine maschinelle URL-Zeile. */ }
  }
  return statuses;
}

if (!dryRun) {
  fs.mkdirSync(outDir, { recursive: true });
  const template = fs.readFileSync(templatePath, 'utf8');
  let ledger = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, 'utf8') : ledgerHeader();
  const recorded = ledgerStatuses(ledger);
  for (const row of urls) {
    const casePath = path.join(outDir, `${row.slug}.md`);
    const host = new URL(row.url).hostname.toLowerCase().replace(/^www\./, '');
    const exists = fs.existsSync(casePath);
    if (exists && recorded.get(host) === 'Capture gestartet und erfolgreich') {
      result.skipped++;
      continue;
    }
    // Vertrag: Der Case existiert, bevor der Capture-Runner gestartet wird.
    // Ein Retry rendert ihn nicht neu: das Urteil und menschliche Ergaenzungen
    // gehoeren nicht dem Watcher. muster-studie aktualisiert nur Capture: fehlt.
    if (!exists) {
      fs.writeFileSync(casePath, renderCase(template, row));
      result.created++;
    } else result.retried++;
    const capture = spawnSync(process.execPath, [runnerPath, '--url', row.url, '--slug', row.slug, '--out', outDir], { stdio: jsonMode ? 'pipe' : 'inherit', encoding: jsonMode ? 'utf8' : undefined });
    const code = capture.status == null ? 1 : capture.status;
    const status = code === 0 ? 'Capture gestartet und erfolgreich' : `Capture fehlgeschlagen (Exit ${code})`;
    ledger += `${ledger.endsWith('\n') ? '' : '\n'}| ${row.url} | \`${row.slug}\` | \`${row.source}\` | ${status} |\n`;
    recorded.set(host, status);
    if (code !== 0) result.failed++;
  }
  if (result.created + result.retried > 0 || !fs.existsSync(ledgerPath)) {
    fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
    fs.writeFileSync(ledgerPath, ledger);
    result.ledgerUpdated = true;
  }
}

if (jsonMode) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`${dryRun ? 'Dry-run: ' : ''}${urls.length} URL(s), ${result.created} neu, ${result.retried} wiederaufgenommen, ${result.skipped} erfolgreich vorhanden, ${result.failed} Capture-Fehler.`);
  for (const row of urls) console.log(`- ${row.slug}: ${row.url}`);
}
if (result.failed) process.exit(1);
