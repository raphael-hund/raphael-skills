#!/usr/bin/env node
// Deterministische Integrations-Eval fuer Ticket 15. Alle Mutationen bleiben in /tmp.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const SCRIPTS = path.join(WEB, 'scripts');
const WATCH = path.join(SCRIPTS, 'eingang-url-watch.mjs');
const BATCH = path.join(SCRIPTS, 'stamp-batch.mjs');
const VIDEO = path.join(SCRIPTS, 'video-vorfilter.mjs');
const QUELLEN = path.join(WEB, 'references', 'quellen-ledger.md');
let checks = 0;

function run(script, args = [], options = {}) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: 'utf8',
    timeout: 20_000,
    maxBuffer: 4 * 1024 * 1024,
    ...options,
  });
}
function ok(condition, label, detail = '') {
  checks++;
  if (!condition) throw new Error(`${label}${detail ? `: ${detail}` : ''}`);
  console.log(`  [OK] ${label}`);
}
function json(result, label) {
  assert.equal(result.status, 0, `${label}: ${result.stderr}`);
  try { return JSON.parse(result.stdout); }
  catch (error) { throw new Error(`${label}: ungueltiges JSON: ${error.message}\n${result.stdout}`); }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kanon-pipeline-'));
try {
  console.log('\nKanon-Pipeline\n');

  for (const script of [WATCH, BATCH, VIDEO]) {
    const result = run(script, ['--help']);
    ok(result.status === 0 && /Usage:|Aufruf:/.test(`${result.stdout}${result.stderr}`), `${path.basename(script)} --help`);
  }

  const eingang = path.join(tmp, 'eingang');
  const out = path.join(tmp, 'muster-bibliothek');
  const ledger = path.join(out, 'eingang-ledger.md');
  const template = path.join(tmp, '_template.md');
  const runner = path.join(tmp, 'runner.mjs');
  const runnerLog = path.join(tmp, 'runner.log');
  fs.mkdirSync(eingang, { recursive: true });
  fs.writeFileSync(template, '# Case: <Name der Seite>\n| Feld | Wert |\n|---|---|\n| Slug | `<slug>` |\n| Quelle | Kanonische URL plus Abrufdatum |\n| Datum der Studie | TT.MM.JJJJ |\n| Urteil | ausstehend / GO / NO-GO / gemischt |\n\n## 1. Capture\nCapture: fehlt\n\n## 4. Raphael-Urteil\n**Verdikt:** ausstehend / GO / NO-GO / gemischt\n');
  fs.writeFileSync(path.join(eingang, 'alpha.url'), '[InternetShortcut]\r\nURL=https://www.SEO-Labs.de/path?q=1\r\n');
  fs.writeFileSync(path.join(eingang, 'liste.urls.txt'), '# gesammelt\nhttps://Example.org/a\nhttps://www.seo-labs.de/noch-ein-pfad\nkein link\n');
  fs.writeFileSync(path.join(eingang, 'alt.url'), 'URL=https://old.example/\n');
  const old = new Date(Date.now() - 20 * 86400_000);
  fs.utimesSync(path.join(eingang, 'alt.url'), old, old);
  fs.writeFileSync(runner, `import fs from 'node:fs';\nimport path from 'node:path';\nconst a=process.argv.slice(2); const g=k=>a[a.indexOf('--'+k)+1];\nconst c=path.join(g('out'),g('slug')+'.md');\nif(!fs.existsSync(c)) process.exit(9);\nfs.appendFileSync(${JSON.stringify(runnerLog)}, g('slug')+'\\n');\n`);

  const common = ['--eingang', eingang, '--tage', '7', '--out', out, '--template', template, '--ledger', ledger, '--runner', runner, '--json'];
  const dry = json(run(WATCH, [...common, '--dry-run']), 'watch dry-run');
  ok(dry.urls.length === 2, 'Parsing von .url und .urls.txt dedupliziert URLs je Host');
  ok(dry.urls.some((row) => row.slug === 'seo-labs-de') && dry.urls.some((row) => row.slug === 'example-org'), 'sichere Host-Slugs');
  ok(!fs.existsSync(out) && !fs.existsSync(runnerLog), 'Dry-run mutiert nichts und startet keinen Capture');

  const first = json(run(WATCH, common), 'watch erster Lauf');
  ok(first.created === 2 && first.failed === 0, 'Watcher legt zwei neue Cases an');
  ok(fs.readFileSync(runnerLog, 'utf8').trim().split('\n').length === 2, 'Case existiert vor muster-studie-Aufruf');
  ok(fs.existsSync(path.join(out, 'seo-labs-de.md')) && fs.readFileSync(path.join(out, 'seo-labs-de.md'), 'utf8').includes('https://www.seo-labs.de/path?q=1'), 'Case entsteht aus Template mit kanonischer Quelle');
  const ledgerRows = fs.readFileSync(ledger, 'utf8').split('\n').filter((line) => /^\| https?:\/\//.test(line));
  ok(ledgerRows.length === 2, 'Eingang-Ledger enthaelt genau zwei Datenzeilen');
  const caseBefore = fs.statSync(path.join(out, 'seo-labs-de.md')).mtimeMs;
  const ledgerBefore = fs.statSync(ledger).mtimeMs;
  const second = json(run(WATCH, common), 'watch zweiter Lauf');
  ok(second.created === 0 && second.skipped === 2 && !second.ledgerUpdated && fs.readFileSync(runnerLog, 'utf8').trim().split('\n').length === 2 && fs.statSync(path.join(out, 'seo-labs-de.md')).mtimeMs === caseBefore && fs.statSync(ledger).mtimeMs === ledgerBefore, 'Watcher ist idempotent');

  const batchDir = path.join(tmp, 'batch');
  fs.mkdirSync(batchDir);
  const caseRaw = (slug, verdict, status = 'kandidat') => `# Case: ${slug}\n| Slug | \`${slug}\` |\n| Status | \`${status}\` |\n| Quelle | \`https://${slug}.example/\` · Abruf 02.09.2026 |\n| Auswahlgrund | Hero pruefen |\n| Urteil | ${verdict} |\n\n| Shot | Pfad | gelesen? |\n|---|---|---|\n| Desktop 1440×900 Fold | \`${slug}/shots/home-desktop-00-fold.png\` | ja |\n| Mobil 390×844 Fold | \`${slug}/shots/home-mobile-00-fold.png\` | ja |\n\n**Verdikt:** ${verdict}\n`;
  fs.writeFileSync(path.join(batchDir, '_template.md'), caseRaw('_template', 'ausstehend / GO / NO-GO / gemischt'));
  fs.writeFileSync(path.join(batchDir, 'INDEX.md'), caseRaw('index', 'ausstehend'));
  fs.writeFileSync(path.join(batchDir, 'eingang-ledger.md'), caseRaw('ledger', 'ausstehend'));
  fs.writeFileSync(path.join(batchDir, 'alpha.md'), caseRaw('alpha', 'ausstehend / GO / NO-GO / gemischt'));
  fs.writeFileSync(path.join(batchDir, 'beta.md'), caseRaw('beta', 'GO 02.09.2026 (Raphael-Liste, Begruendungssatz offen)'));
  fs.writeFileSync(path.join(batchDir, 'gamma.md'), caseRaw('gamma', 'GO 02.09.2026 (Raphael-Liste, Begründungssatz offen)'));
  fs.writeFileSync(path.join(batchDir, 'fertig.md'), caseRaw('fertig', 'GO', 'freigegeben'));
  const before = new Map(fs.readdirSync(batchDir).map((name) => [name, fs.readFileSync(path.join(batchDir, name), 'utf8')]));
  const batch = json(run(BATCH, ['--dir', batchDir, '--min', '3', '--max', '5', '--json']), 'stamp batch');
  ok(batch.cases.length === 3 && batch.cases.map((row) => row.slug).join(',') === 'alpha,beta,gamma', 'Stamp-Batch sammelt Urteil-offen und Begruendung-offen, aber keine fertigen oder technischen Dateien');
  ok(batch.cases.every((row) => row.quelle.includes(`https://${row.slug}.example/`) && row.desktopFold === `${row.slug}/shots/home-desktop-00-fold.png` && row.mobilFold === `${row.slug}/shots/home-mobile-00-fold.png`), 'Stamp-Batch liefert Quelle sowie vorhandene Desktop- und Mobil-Foldpfade');
  ok(batch.cases.every((row) => Array.isArray(row.fragen) && row.fragen.length === 3 && row.fragen.every(Boolean)), 'Stamp-Batch liefert genau drei Fragen je Case');
  ok([...before].every(([name, raw]) => fs.readFileSync(path.join(batchDir, name), 'utf8') === raw), 'Stamp-Batch setzt kein Urteil und mutiert nichts');

  const transcript = path.join(tmp, 'transcript.txt');
  fs.writeFileSync(transcript, 'Run /cost, then npm run build. Prompt: "build the landing page". Repo: https://github.com/acme/site and edit src/App.tsx.');
  const positive = json(run(VIDEO, ['--file', transcript, '--json']), 'video positiv');
  ok(positive.marker.length >= 4 && positive.score > 0 && positive.empfehlung === 'vollauswertung', 'Video-Vorfilter erkennt harte Marker positiv');
  fs.writeFileSync(transcript, 'Das Video spricht allgemein ueber schoene Webseiten und neue Modelle.');
  const negative = json(run(VIDEO, ['--file', transcript, '--json']), 'video negativ');
  ok(negative.marker.length === 0 && negative.score === 0 && negative.empfehlung === 'nur-ledger', 'Video-Vorfilter lehnt markerlosen Text ab');

  const sourceRaw = fs.readFileSync(QUELLEN, 'utf8');
  const header = sourceRaw.split('\n').find((line) => /^\| URL \|/.test(line)) || '';
  const sourceRows = sourceRaw.split('\n').filter((line) => /^\| https?:\/\//.test(line));
  ok(['URL', 'Datum', 'Typ', 'Reifegrad', 'Ziel', 'Ablauf'].every((name) => header.includes(` ${name} `)), 'Quellen-Ledger hat das Pflichtschema');
  ok(sourceRows.length === 23, 'Quellen-Ledger enthaelt genau 23 Quellen');
  ok(sourceRows.filter((line) => /\| Video \|/.test(line)).length === 6 && sourceRows.filter((line) => /\| X \|/.test(line)).length === 5 && sourceRows.filter((line) => /\| Seite \|/.test(line)).length === 12, 'Ledger verteilt 6 Videos, 5 X-Quellen und 12 Seiten');

  console.log(`\n${checks}/${checks} Pruefungen wie erwartet.`);
} catch (error) {
  console.error(`\n[FEHLER] ${error.message}`);
  process.exitCode = 1;
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
