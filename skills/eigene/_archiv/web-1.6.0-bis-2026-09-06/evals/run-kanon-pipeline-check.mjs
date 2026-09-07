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
const VERWEISE = path.join(HIER, 'run-verweise-check.mjs');
const QUELLEN = path.join(WEB, 'references', '_archiv', 'quellen-ledger.md');
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

  const retryInput = path.join(tmp, 'retry-input');
  const retryOut = path.join(tmp, 'retry-out');
  const retryLedger = path.join(retryOut, 'ledger.md');
  const retryCase = path.join(retryOut, 'retry-example.md');
  const retryRunner = path.join(tmp, 'retry-runner.mjs');
  const retryLog = path.join(tmp, 'retry-runner.log');
  const exitFile = path.join(tmp, 'capture-exit');
  fs.mkdirSync(retryInput);
  fs.writeFileSync(path.join(retryInput, 'site.url'), 'URL=https://retry.example/\n');
  fs.writeFileSync(exitFile, '7');
  fs.writeFileSync(retryRunner, `import fs from 'node:fs';\nfs.appendFileSync(${JSON.stringify(retryLog)}, 'capture\\n');\nconst code=Number(fs.readFileSync(${JSON.stringify(exitFile)}, 'utf8'));\nif(code===0) { const file=${JSON.stringify(retryCase)}; fs.writeFileSync(file, fs.readFileSync(file,'utf8').replace(/^Capture: fehlt$/m, 'Capture: retry-example/shots')); }\nprocess.exit(code);\n`);
  const retryArgs = ['--eingang', retryInput, '--out', retryOut, '--template', template, '--ledger', retryLedger, '--runner', retryRunner, '--json'];
  const failure = run(WATCH, retryArgs);
  ok(failure.status === 1 && JSON.parse(failure.stdout).failed === 1 && fs.existsSync(retryCase), 'Fehlgeschlagener Capture hinterlaesst einen wiederaufnehmbaren Case und Exit 1');
  const human = '\n## Menschlicher Zusatz\nGO 05.09.2026 — Hero erhalten; Kundenentscheidung bleibt.\n';
  fs.appendFileSync(retryCase, human);
  const failedCase = fs.readFileSync(retryCase, 'utf8');
  const failedAgain = run(WATCH, retryArgs);
  ok(failedAgain.status === 1 && JSON.parse(failedAgain.stdout).failed === 1 && fs.readFileSync(retryLog, 'utf8').trim().split('\n').length === 2, 'Ein vorhandener Case verdeckt den wiederholten Capture-Fehler nicht');
  ok(fs.readFileSync(retryCase, 'utf8') === failedCase, 'Fehlgeschlagene Wiederaufnahme behaelt menschliche Case-Daten bytegleich');
  fs.writeFileSync(exitFile, '0');
  const resumed = json(run(WATCH, retryArgs), 'watch Wiederaufnahme');
  ok(resumed.created === 0 && resumed.retried === 1 && resumed.failed === 0 && resumed.ledgerUpdated && fs.readFileSync(retryLog, 'utf8').trim().split('\n').length === 3, 'Nach Fehler wird der Capture erneut ausgefuehrt und erfolgreich verbucht');
  const capturedCase = fs.readFileSync(retryCase, 'utf8');
  const capturedLedger = fs.readFileSync(retryLedger, 'utf8');
  ok(capturedCase === failedCase.replace(/^Capture: fehlt$/m, 'Capture: retry-example/shots') && capturedCase.includes(human), 'Erfolg aktualisiert nur Capture-Daten, kein menschliches Urteil');
  ok((capturedLedger.match(/Capture fehlgeschlagen \(Exit 7\)/g) || []).length === 2 && capturedLedger.includes('Capture gestartet und erfolgreich'), 'Ledger erhaelt Fehlerhistorie und erfolgreichen Wiederanlauf');
  const resumedAgain = json(run(WATCH, retryArgs), 'watch nach Erfolg');
  ok(resumedAgain.skipped === 1 && resumedAgain.created === 0 && resumedAgain.retried === 0 && !resumedAgain.ledgerUpdated && fs.readFileSync(retryCase, 'utf8') === capturedCase && fs.readFileSync(retryLedger, 'utf8') === capturedLedger && fs.readFileSync(retryLog, 'utf8').trim().split('\n').length === 3, 'Wiederlauf nach erfolgreichem Retry ist idempotent');

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
  const sourceRows = sourceRaw.split('\n').slice(sourceRaw.split('\n').indexOf(header) + 2).filter((line) => line.startsWith('|')).map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
  ok(['URL', 'Datum', 'Typ', 'Reifegrad', 'Ziel', 'Ablauf'].every((name) => header.includes(` ${name} `)), 'Quellen-Ledger hat das Pflichtschema');
  const validDate = (text) => {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(text)) return false;
    const [day, month, year] = text.split('.').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  };
  ok(sourceRows.length > 0 && sourceRows.every((row) => row.length === 6 && row.every(Boolean) && /^https?:\/\//.test(row[0]) && ['Video', 'X', 'Seite'].includes(row[2]) && ['behauptet', 'belegt', 'ausgewertet'].includes(row[3]) && validDate(row[1]) && validDate(row[5])), 'Jede vorhandene Quelle erfuellt das Schema mit Typ, Reifegrad und gueltigen Datumswerten');
  ok(sourceRows.every((row) => {
    const target = row[4].match(/`(references\/[^`]+)`/);
    return target && fs.existsSync(path.join(WEB, target[1]));
  }), 'Quellen verweisen auf vorhandene Zieldateien, unabhaengig von historischen Mengen');

  const linkSkills = path.join(tmp, 'link-skills');
  const linkWeb = path.join(linkSkills, 'eigene', 'web');
  const linkDesign = path.join(linkSkills, 'design');
  const externalSource = path.join(tmp, 'external-source.md');
  const put = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  const portable = (loads) => `---\nname: web\ndescription: Fixture\nmetadata:\n  raphael-loads: '${JSON.stringify(loads)}'\n  raphael-requires-skills: '["design@^0"]'\n  raphael-completion-criteria: '["design/scripts/detect.mjs existiert"]'\n---\n`;
  put(path.join(linkWeb, 'SKILL.md'), portable(['references/start.md']));
  put(path.join(linkWeb, 'references/start.md'), '[Vertiefung](nested/guide.md)\n\nNach `design/SKILL.md` dessen `scripts/detect.mjs`.\n\n`references/vendor/example.md`\n`references/_archiv/old.md`\n`scripts/shared.mjs`\nLaufzeitausgabe: `<run-out>/run-evidence.json`, `art-direction.md`, `/tmp/web-u5-not-created/report.json`.\n\n**Herkunft:** fremdes Repository,\n`skills/upstream/SKILL.md`.\n\n[Aktive lokale Attribution](../VENDORING.md)\n\nNochmals `design/SKILL.md` und dessen `scripts/detect.mjs`.\n');
  put(path.join(linkWeb, 'VENDORING.md'), 'Historische Attribution: `skills/old-upstream/SKILL.md`.\n');
  put(externalSource, '[Historischer interner Link](not-present.md)\n');
  fs.appendFileSync(path.join(linkWeb, 'references/start.md'), `\n**Quelle:** \`${externalSource}\`\n`);
  put(path.join(linkWeb, 'references/nested/guide.md'), '[Geschwister](../sibling.md)\n`references/start.md`\n');
  put(path.join(linkWeb, 'references/sibling.md'), '# Aktive Referenz\n');
  put(path.join(linkWeb, 'references/vendor/example.md'), '`scripts/missing-vendor-example.mjs`\n');
  put(path.join(linkWeb, 'references/_archiv/old.md'), '[Alte Planung](missing-old.md)\n');
  put(path.join(linkWeb, 'references/retired.md'), '`references/unreachable-missing.md`\n');
  put(path.join(linkWeb, 'scripts/shared.mjs'), '// eigenes Skript\n');
  put(path.join(linkDesign, 'SKILL.md'), '---\nname: design\ndescription: Fixture\nloads:\n  - references/a.md\ncompletion_criteria:\n  - "scripts/detect.mjs existiert"\n---\n');
  put(path.join(linkDesign, 'references/a.md'), '`scripts/detect.mjs`\n`scripts/shared.mjs`\n');
  put(path.join(linkDesign, 'scripts/detect.mjs'), '// Nachbar-Skript\n');
  put(path.join(linkDesign, 'scripts/shared.mjs'), '// anderer Skill, gleicher Kurzpfad\n');
  put(path.join(linkSkills, 'imported/design/SKILL.md'), '---\nname: design\ndescription: Gleichnamige fremde Quelle\n---\n');
  const linkArgs = ['--skill-root', linkWeb, '--skills-root', linkSkills, '--json'];
  const links = json(run(VERWEISE, linkArgs), 'aktive Verweise');
  ok(links.status === 'PASS' && links.checked > 0 && links.missing.length === 0, 'Portables und Legacy-Frontmatter sowie Nachbarskill-Skripte loesen im eigenen Kontext auf');
  ok(links.documents.includes(path.join(linkDesign, 'SKILL.md')) && !links.documents.includes(path.join(linkSkills, 'imported/design/SKILL.md')), 'Kanonischer Nachbarskill hat Vorrang vor gleichnamigem Import');
  ok(!links.documents.includes(externalSource) && links.excluded.some((entry) => entry.target === externalSource && entry.reason === 'external-resource'), 'Externe lokale Quelle muss existieren; ihre Linkhistorie ist kein aktiver Skill-Vertrag');
  ok(links.documents.includes(path.join(linkWeb, 'references/nested/guide.md')) && !links.documents.includes(path.join(linkWeb, 'references/retired.md')) && !links.documents.includes(path.join(linkWeb, 'references/vendor/example.md')) && !links.documents.includes(path.join(linkWeb, 'references/_archiv/old.md')), 'Aktiver Graph folgt Referenzen, aber nicht unverbundenen Dateien, Vendor-Beispielen oder Archiv-Inhalten');
  fs.unlinkSync(path.join(linkDesign, 'scripts/shared.mjs'));
  const wrongContext = run(VERWEISE, linkArgs);
  const wrongContextData = JSON.parse(wrongContext.stdout);
  ok(wrongContext.status === 1 && wrongContextData.missing.some((entry) => entry.source === path.join(linkDesign, 'references/a.md') && entry.target === 'scripts/shared.mjs'), 'Gleicher Kurzpfad in anderem Skill verdeckt kein fehlendes Ziel');
  put(path.join(linkDesign, 'scripts/shared.mjs'), '// wieder vorhanden\n');
  put(path.join(linkWeb, 'SKILL.md'), portable(['references/not-here.md']));
  const missingLoad = run(VERWEISE, linkArgs);
  ok(missingLoad.status === 1 && JSON.parse(missingLoad.stdout).missing.some((entry) => entry.target === 'references/not-here.md'), 'Echte fehlende raphael-loads-Ziele scheitern');
  put(path.join(linkWeb, 'SKILL.md'), portable(['references/start.md']));
  fs.unlinkSync(path.join(linkWeb, 'references/sibling.md'));
  const missingRelative = run(VERWEISE, linkArgs);
  ok(missingRelative.status === 1 && JSON.parse(missingRelative.stdout).missing.some((entry) => entry.source === path.join(linkWeb, 'references/nested/guide.md') && entry.target === '../sibling.md'), 'Fehlende aktive relative Markdown-Ziele scheitern an der richtigen Quelldatei');
  put(path.join(linkWeb, 'references/sibling.md'), '# Wieder vorhanden\n');
  fs.unlinkSync(path.join(linkWeb, 'VENDORING.md'));
  const missingAttribution = run(VERWEISE, linkArgs);
  ok(missingAttribution.status === 1 && JSON.parse(missingAttribution.stdout).missing.some((entry) => entry.target === '../VENDORING.md'), 'Herkunftsangaben verdecken keinen fehlenden aktiven Link im naechsten Absatz');
  put(path.join(linkWeb, 'VENDORING.md'), '# Wieder vorhanden\n');
  fs.unlinkSync(externalSource);
  const missingSource = run(VERWEISE, linkArgs);
  ok(missingSource.status === 1 && JSON.parse(missingSource.stdout).missing.some((entry) => entry.target === externalSource), 'Ein fehlender absoluter Quellenpfad bleibt auch im Herkunftsabsatz ein Fehler');
  put(externalSource, '# Wieder vorhanden\n');
  fs.unlinkSync(path.join(linkWeb, 'references/_archiv/old.md'));
  const missingArchiveTarget = run(VERWEISE, linkArgs);
  ok(missingArchiveTarget.status === 1 && JSON.parse(missingArchiveTarget.stdout).missing.some((entry) => entry.target === 'references/_archiv/old.md'), 'Ein aktiver Verweis ins Archiv muss trotz ausgeschlossener Archiv-Inhalte existieren');
  put(path.join(linkWeb, 'SKILL.md'), "---\nname: web\ndescription: Fehlerhafte Metadata\nmetadata:\n  raphael-loads: 'keine JSON-Liste'\n---\n");
  const invalidMetadata = run(VERWEISE, linkArgs);
  ok(invalidMetadata.status === 1 && JSON.parse(invalidMetadata.stdout).errors.length > 0, 'Unlesbare portable Ladungslisten werden als Fehler gemeldet');
  put(path.join(linkWeb, 'SKILL.md'), '---\nname: web\ndescription: Nur Prosa\n---\nKein Verweis.\n');
  const emptyLinks = run(VERWEISE, linkArgs);
  ok(emptyLinks.status === 2 && JSON.parse(emptyLinks.stdout).status === 'NOT_CHECKED', 'Null gepruefte Verweise liefern kein PASS');

  console.log(`\n${checks}/${checks} Pruefungen wie erwartet.`);
} catch (error) {
  console.error(`\n[FEHLER] ${error.message}`);
  process.exitCode = 1;
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
