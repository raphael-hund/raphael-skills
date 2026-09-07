#!/usr/bin/env node
/**
 * run-video-evidence-check.mjs — aktuelle Web-1.2-Dokumentstruktur sowie
 * historisches Source-to-Decision-Ledger und Runtime-Provenance prüfen.
 *
 * Das ist kein Website- oder Modellverhaltenstest. Der Standardlauf liest den
 * persistierten historischen Plan und die echten U5-Artefakte. Negative
 * Szenarien verändern ausschließlich temporäre Plankopien.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const PLAN_DEFAULT = '/root/raphael-skills/skills/eigene/web/plans/2026-08-31-web-workflow-evidenzvertrag-plan.md';
const WATCH = '/root/.claude/skills/watch-video/SKILL.md';
const BRAIN = '/root/raphael-brain';
const SKILL = path.join(WEB, 'SKILL.md');
const CONTRACT = path.join(WEB, 'references', 'video-evidence-contract.md');
const INSPIRATIONS = path.join(WEB, 'references', 'inspirations-quellen.md');
const QA = path.join(WEB, 'references', 'qa-faecher.md');
const TEMPLATE = path.join(WEB, 'references', 'muster-bibliothek', '_template.md');
const INDEX = path.join(WEB, 'references', 'muster-bibliothek', 'INDEX.md');
const CANDIDATE = path.join(BRAIN, 'wiki', '_candidates', '2026-08-31-webskill-workflow-lehren-aus-fuenf-videos.md');

const VIDEOS = [
  { id: 'WCrnS09vpfo', count: 10, end: '21:15' },
  { id: 'QUI6Ug4cHnE', count: 12, end: '16:45' },
  { id: 'bg0C-2iUUqM', count: 8, end: '20:35' },
  { id: 'VwGrXe2ricE', count: 10, end: '22:19' },
  { id: 'Ysr7oNDajJI', count: 8, end: '12:55' },
];
const DISPOSITIONS = new Set(['ADOPT', 'CONFIRM_EXISTING', 'REJECT', 'DEFER']);

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail = '') => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};
const lese = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
const sauber = (s) => String(s ?? '').replaceAll('**', '').replaceAll('`', '').trim();

function tabellenZeilen(text) {
  return text.split('\n')
    .filter((line) => /^\s*\|.*\|\s*$/.test(line))
    .map((line) => line.trim().slice(1, -1).split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.length && !cells.every((cell) => /^:?-{3,}:?$/.test(cell)));
}

function ledgerPruefen(plan) {
  const errors = [];
  const start = plan.indexOf('### Source-to-Decision Ledger');
  if (start < 0) return ['Source-to-Decision Ledger fehlt'];
  const ledger = plan.slice(start);
  const allLessons = [];
  const dispositionTotals = new Map([...DISPOSITIONS].map((d) => [d, 0]));

  for (let i = 0; i < VIDEOS.length; i++) {
    const video = VIDEOS[i];
    const marker = `#### ${video.id}`;
    const sectionStart = ledger.indexOf(marker);
    if (sectionStart < 0) {
      errors.push(`${video.id}: Abschnitt fehlt`);
      continue;
    }
    const nextMarkers = [
      ...VIDEOS.slice(i + 1).map((v) => ledger.indexOf(`#### ${v.id}`, sectionStart + marker.length)),
      ledger.indexOf('### Ledger Denominator Summary', sectionStart + marker.length),
    ].filter((n) => n >= 0);
    const sectionEnd = nextMarkers.length ? Math.min(...nextMarkers) : ledger.length;
    const rows = tabellenZeilen(ledger.slice(sectionStart, sectionEnd))
      .filter((cells) => sauber(cells[0]).startsWith(`${video.id}-L`));

    if (rows.length !== video.count) errors.push(`${video.id}: ${rows.length}/${video.count} Lessons`);
    const expectedIds = new Set(Array.from({ length: video.count }, (_, n) => `${video.id}-L${String(n + 1).padStart(2, '0')}`));
    const seen = new Set();

    for (const cells of rows) {
      const [lessonRaw, timecode, dispositionRaw, claim, benefit, target, gate, caveat] = cells;
      const lesson = sauber(lessonRaw);
      const disposition = sauber(dispositionRaw);
      if (cells.length !== 8) errors.push(`${lesson}: erwartet 8 Tabellenfelder, gefunden ${cells.length}`);
      if (!expectedIds.has(lesson)) errors.push(`${lesson}: unerwartete Lesson-ID`);
      if (seen.has(lesson)) errors.push(`${lesson}: doppelt`);
      seen.add(lesson);
      allLessons.push(lesson);

      const dispositionCells = cells.filter((cell) => DISPOSITIONS.has(sauber(cell)));
      if (!DISPOSITIONS.has(disposition) || dispositionCells.length !== 1) {
        errors.push(`${lesson}: Disposition nicht genau einmal gebunden`);
      } else {
        dispositionTotals.set(disposition, dispositionTotals.get(disposition) + 1);
      }
      if (!/\b\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2}\b/.test(timecode || '')) {
        errors.push(`${lesson}: Timecode fehlt oder ist kein Bereich`);
      }
      const targets = [...String(target || '').matchAll(/`((?:raphael-skills|raphael-brain|\.claude)\/[^`]+)`/g)].map((m) => m[1]);
      if (!targets.length || targets.some((p) => !/\.[a-z0-9]+$/i.test(p))) {
        errors.push(`${lesson}: exakter Zielpfad fehlt`);
      }
      if (!/\bKTD\d+\b/.test(target || '') || !/\bU\d+\b/.test(target || '')) {
        errors.push(`${lesson}: U/KTD-Referenz fehlt`);
      }
      if (String(gate || '').trim().length < 20
        || !/(PASS|FAIL|BLOCKED|PLAN_VERIFIED|rot|grün|block|bleib|brauch|müss|darf|Gate|Receipt|Fixture|Mutation|invalid|abgelehnt|erzeugt|verliert|prüft|besteh|ändert|entfernt|gesammelt|fällt|lehnt|hält|ohne)/i.test(gate || '')) {
        errors.push(`${lesson}: messbares Gate fehlt`);
      }
      if (String(claim || '').trim().length < 12 || String(benefit || '').trim().length < 12) {
        errors.push(`${lesson}: Claim oder Nutzenbindung fehlt`);
      }
      if (String(caveat || '').trim().length < 12) errors.push(`${lesson}: Caveat fehlt`);
      if (disposition === 'REJECT'
        && !/(unsupported|unverifiziert|unvalidiert|unbelegt|keine|niedrige|promotion|causal|risiko|modelle|geschmack|sprecher|werbung|ungemessen|falsch)/i.test(caveat || '')) {
        errors.push(`${lesson}: konkreter REJECT-Grund fehlt`);
      }
      if (disposition === 'DEFER') {
        const reentry = `${gate || ''} ${caveat || ''}`;
        if (!/(\bbis\b|\berst\b|\bnur\b.*\b(?:wenn|dürfen)\b|\bsobald\b|\bvorliegen\b|\bwiederholten\b|\bdrei\b|Raphael-Lock)/i.test(reentry)) {
          errors.push(`${lesson}: Wiedereintrittsbedingung fehlt`);
        }
      }
    }
    for (const expected of expectedIds) if (!seen.has(expected)) errors.push(`${expected}: fehlt`);
  }

  if (allLessons.length !== 48 || new Set(allLessons).size !== 48) {
    errors.push(`Ledger-Summe ${allLessons.length}, eindeutig ${new Set(allLessons).size}, erwartet 48`);
  }

  const summaryStart = ledger.indexOf('### Ledger Denominator Summary');
  if (summaryStart < 0) {
    errors.push('Ledger Denominator Summary fehlt');
  } else {
    const summaryRows = tabellenZeilen(ledger.slice(summaryStart));
    const byId = new Map(summaryRows.map((cells) => [sauber(cells[0]), cells.map(sauber)]));
    for (const video of VIDEOS) {
      const row = byId.get(video.id);
      if (!row || Number(row[1]) !== video.count || Number(row[6]) !== 0) {
        errors.push(`${video.id}: Summary-Nenner/Unexplained falsch`);
      }
    }
    const total = byId.get('Total');
    if (!total || Number(total[1]) !== 48 || Number(total[2]) !== 11 || Number(total[3]) !== 27
      || Number(total[4]) !== 6 || Number(total[5]) !== 4 || Number(total[6]) !== 0) {
      errors.push('Total-Summary muss 48/11/27/6/4/0 sein');
    }
  }
  const unexplained = [...ledger.matchAll(/`unexplained_lessons=(\d+)`/g)].map((m) => Number(m[1]));
  if (unexplained.length !== 1 || unexplained[0] !== 0) errors.push('unexplained_lessons muss genau einmal 0 sein');
  const expectedDispositionTotals = { ADOPT: 11, CONFIRM_EXISTING: 27, REJECT: 6, DEFER: 4 };
  for (const [name, count] of Object.entries(expectedDispositionTotals)) {
    if (dispositionTotals.get(name) !== count) errors.push(`${name}: ${dispositionTotals.get(name)}/${count}`);
  }
  return errors;
}

function provenancePruefen(plan) {
  const errors = [];
  const start = plan.indexOf('### Runtime Provenance and Limitations');
  const end = plan.indexOf('### Source-to-Decision Ledger', start + 1);
  if (start < 0 || end < 0) return ['Runtime Provenance and Limitations fehlt oder ist nicht abgegrenzt'];
  const section = plan.slice(start, end);

  const workflowRows = (workflowId) => {
    const headingToken = workflowId === 'wf_ef2e1083-612'
      ? `**Research-Workflow \`${workflowId}\`**`
      : `**Dokumentreview-Workflow \`${workflowId}\`:**`;
    const heading = section.indexOf(headingToken);
    if (heading < 0) return [];
    const nextHeading = section.indexOf('\n**', heading + headingToken.length);
    const limit = nextHeading >= 0 ? nextHeading : section.length;
    const subsection = section.slice(heading, limit);
    if (!subsection.includes('| Worker')) return [];
    return tabellenZeilen(subsection)
      .filter((cells) => /^agent-[a-z0-9]+$/.test(sauber(cells[0])))
      .map((cells) => ({
        worker: sauber(cells[0]),
        role: sauber(cells[1]),
        model: sauber(cells[2]),
        disposition: sauber(cells[3]),
      }));
  };

  const researchId = 'wf_ef2e1083-612';
  const reviewId = 'wf_761399ea-c3b';
  const research = workflowRows(researchId);
  const review = workflowRows(reviewId);
  const expected = [
    [researchId, 'agent-a8b91d246a573f5f2', 'Videos 1–2 Transcript-Analyse', 'gpt-5.6-sol', /Strukturiertes Ergebnis geliefert/],
    [researchId, 'agent-ad5324d3618bef292', 'Videos 3–4 Transcript-Analyse', 'gpt-5.6-sol', /Strukturiertes Ergebnis geliefert/],
    [researchId, 'agent-a0f692fd1c978c66b', 'Webskill-Ecosystem-Audit', 'gpt-5.6-sol', /recovered\/unstructured/],
    [reviewId, 'agent-ae8e9a017673f0bb2', 'design-lens', 'gpt-5.6-sol', /Gültige strukturierte Findings/],
    [reviewId, 'agent-aa6ab63865550766a', 'product-lens', 'gpt-5.6-sol', /Gültige strukturierte Findings/],
    [reviewId, 'agent-a66ae599436d3aca4', 'adversarial', 'grok-4.6-build', /Gültige strukturierte Findings/],
    [reviewId, 'agent-ad206c2886324c5d3', 'coherence', 'gpt-5.6-sol', /^FAILED\b.*zählt nicht als Coverage/],
    [reviewId, 'agent-a101c6f19bfe874d8', 'feasibility', 'grok-4.6-build', /^FAILED\b.*zählt nicht als Coverage/],
    [reviewId, 'agent-a6d1dbfc228770c3d', 'scope-guardian', 'gpt-5.6-sol', /^FAILED\b.*zählt nicht als Coverage/],
  ];
  const tuples = new Map();
  for (const [workflow, rows] of [[researchId, research], [reviewId, review]]) {
    for (const row of rows) {
      const key = `${workflow}/${row.worker}`;
      if (tuples.has(key)) errors.push(`${key}: doppelte Provenance-Zeile`);
      tuples.set(key, row);
    }
  }
  if (research.length !== 3) errors.push(`${researchId}: ${research.length}/3 Worker`);
  if (review.length !== 6) errors.push(`${reviewId}: ${review.length}/6 Worker`);
  for (const [workflow, worker, role, model, disposition] of expected) {
    const row = tuples.get(`${workflow}/${worker}`);
    if (!row) {
      errors.push(`${workflow}/${worker}: Tupel fehlt`);
      continue;
    }
    if (row.role !== role) errors.push(`${workflow}/${worker}: Rolle ${row.role}, erwartet ${role}`);
    if (row.model !== model) errors.push(`${workflow}/${worker}: Modell ${row.model}, erwartet ${model}`);
    if (!disposition.test(row.disposition)) errors.push(`${workflow}/${worker}: Disposition falsch oder fehlt`);
  }
  const researchHeadingStart = section.indexOf(`\`${researchId}\``);
  const researchHeadingEnd = section.indexOf('| Worker', researchHeadingStart);
  const researchHeading = researchHeadingStart >= 0 && researchHeadingEnd >= 0 ? section.slice(researchHeadingStart, researchHeadingEnd) : '';
  if (!/Failover[\s\S]*gpt-5\.6-sol/i.test(researchHeading)) errors.push('Research-Workflow: Failover-Hinweis auf gpt-5.6-sol fehlt');
  const ecosystem = tuples.get(`${researchId}/agent-a0f692fd1c978c66b`);
  if (!ecosystem || !/KEIN strukturiertes|failed/i.test(ecosystem.disposition)) errors.push('Ecosystem-Worker: failed/recovered-Bindung fehlt');
  const adversarial = tuples.get(`${reviewId}/agent-a66ae599436d3aca4`);
  if (!adversarial || /fable/i.test(adversarial.model) || !/nicht.*Fable/i.test(adversarial.disposition)) {
    errors.push('Adversarial-Reviewer: grok-Bindung und Nicht-Fable-Disposition fehlen');
  }
  const failed = review.filter((row) => /^FAILED\b/.test(row.disposition));
  if (failed.length !== 3 || failed.some((row) => !/zählt nicht als Coverage/.test(row.disposition))) {
    errors.push('Genau drei FAILED-Reviewer ohne Coverage erforderlich');
  }
  if (!/Metadaten[\s\S]{0,180}kein Runtime-Beweis/i.test(section)) errors.push('Metadata-Labels sind nicht ausdrücklich als Nicht-Runtime-Beweis markiert');
  return errors;
}

function planZelleMutieren(plan, lessonId, index, value) {
  return plan.split('\n').map((line) => {
    if (!line.startsWith(`| ${lessonId} |`)) return line;
    const cells = line.trim().slice(1, -1).split('|').map((cell) => cell.trim());
    cells[index] = value;
    return `| ${cells.join(' | ')} |`;
  }).join('\n');
}

function temporaereMutation(plan, name, mutate, expectedFragment = '') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'web-video-evidence-'));
  const copy = path.join(dir, path.basename(PLAN_DEFAULT));
  try {
    fs.writeFileSync(copy, mutate(plan), 'utf8');
    const changed = fs.readFileSync(copy, 'utf8');
    const errors = [...ledgerPruefen(changed), ...provenancePruefen(changed)];
    const ok = errors.length > 0 && (!expectedFragment || errors.some((error) => error.includes(expectedFragment)));
    zeile(ok, `Historische Temp-Plan-Mutation wird rot: ${name}`, errors[0] || 'Mutation blieb unerkannt');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const argv = process.argv.slice(2);
let planPath = PLAN_DEFAULT;
let planOnly = false;
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--plan' && argv[i + 1]) planPath = argv[++i];
  else if (argv[i] === '--plan-only') planOnly = true;
  else {
    console.error(`Unbekanntes Argument: ${argv[i]}`);
    process.exit(2);
  }
}
if (!fs.existsSync(planPath)) {
  console.error(`Plan fehlt: ${planPath}`);
  process.exit(2);
}
const plan = fs.readFileSync(planPath, 'utf8');
const planSha256 = createHash('sha256').update(plan).digest('hex');
const planErrors = [...ledgerPruefen(plan), ...provenancePruefen(plan)];
if (planOnly) {
  for (const error of planErrors) console.error(`VIDEO_EVIDENCE_FAIL: ${error}`);
  process.exit(planErrors.length ? 1 : 0);
}

console.log('\nAktuelle Web-1.2-Dokumentstruktur (kein Website- oder Modellverhalten)\n');
const skill = lese(SKILL);
const contract = lese(CONTRACT);
zeile(Boolean(contract) && /Quelle und Aussage trennen/.test(contract)
  && /- \*\*Quelle:\*\*/.test(contract) && /- \*\*Coverage:\*\*/.test(contract)
  && /Ein Frame zeigt einen Zustand, eine Bildfolge\s+einen beobachteten Verlauf, das Transkript die Erklärung des Sprechers/.test(contract)
  && /\*\*Coverage:\*\*[\s\S]{0,240}tatsächlich gesehene Bildfolgen mit Zeitmarken und lokalen Belegen/.test(contract),
'Aktuelle Dokumentstruktur: Quelle, Coverage und passende Beobachtungsbelege sind getrennt');
zeile(Boolean(contract)
  && /Audio\/Transkript kann `vorhanden`, `fehlt`, `stumm` oder `nicht geprüft` sein/.test(contract)
  && /Fehlende Sprache blockiert eine belegte rein visuelle Aussage nicht/.test(contract),
'Aktuelle Dokumentstruktur: belegte visuelle Evidenz ist ohne Captions zulässig');
const inspirations = lese(INSPIRATIONS);
zeile(Boolean(skill) && skill.includes('[video-evidence-contract.md](references/video-evidence-contract.md)')
  && skill.includes('[inspirations-quellen.md](references/inspirations-quellen.md)')
  && contract.includes('`inspirations-quellen.md` führt von der untersuchten Eigenschaft zum Einbau')
  && inspirations.includes('**Quelle/konkretes Item → übernommene Eigenschaft → Einsatzort → Prüfung.**'),
'Aktuelle Dokumentstruktur: Web routet die untersuchte Quelle zu Einsatzort und Prüfung');
const qa = lese(QA);
zeile(Boolean(qa) && /Eintritt, Wechsel und\s+Austritt/.test(qa) && /harte Bildkanten/.test(qa)
  && /schmaler Touch-Ansicht\s+die gewählte mobile Variante bedienen/.test(qa)
  && /Bei einer Naht die Stelle dichter erfassen und nach dem\s+Fix erneut prüfen/.test(qa),
'Aktuelle Dokumentstruktur: Scroll-Nähte und die mobile Variante haben gezielte QA');
const watch = lese(WATCH);
const watchContractPointer = '/root/raphael-skills/skills/eigene/web/references/video-evidence-contract.md';
zeile(Boolean(watch) && watch.includes(watchContractPointer),
'Aktuelle Dokumentstruktur: watch-video verweist den Web-Handoff an den Web-Video-Vertrag',
watch ? `Pointer fehlt: ${watchContractPointer}` : `Quelle nicht lesbar: ${WATCH}`);

console.log('\nHistorische Fünf-Video-Artefakte und Ledger-/Runtime-Provenance (kein aktuelles Verhalten)\n');
zeile(planErrors.length === 0, 'Historischer persistierter Plan besteht Ledger und Runtime-Provenance', planErrors.slice(0, 3).join(' | '));

const template = lese(TEMPLATE);
const index = lese(INDEX);
zeile(/\| Status \| `?kandidat/i.test(template) && /Raphael-Urteil/.test(template)
  && /ohne Raphael-Urteil[\s\S]{0,100}kandidat/i.test(template),
'Historisches Muster-Template hält einen Case ohne Raphael-Urteil auf kandidat');
zeile(/ohne Raphael-Urteil[\s\S]{0,120}kandidat/i.test(index) && /Frame-Beleg/i.test(index),
'Historischer Muster-INDEX beschreibt Kandidatenstatus und Frame-Belegschwelle');

for (const video of VIDEOS) {
  const rawPath = path.join(BRAIN, 'raw', `bookmark-2026-08-31-webskill-video-${video.id}.md`);
  const raw = lese(rawPath);
  zeile(Boolean(raw) && /status:\s*candidate/.test(raw) && raw.includes(video.id)
    && raw.includes(`https://youtu.be/${video.id}`) && raw.includes(`00:00–${video.end}`)
    && /## Kernlehren/.test(raw) && /## Caveats/.test(raw) && /Skeptiker[\s\S]{0,100}ausstehend/i.test(raw),
  `Historisches Brain-Raw ${video.id}: Quelle, Coverage, Kernlehren, Caveats und Kandidatenstatus`);
}
const candidate = lese(CANDIDATE);
zeile(Boolean(candidate) && /status:\s*candidate/.test(candidate) && VIDEOS.every((video) => candidate.includes(video.id))
  && /Skeptiker[\s\S]{0,100}ausstehend/i.test(candidate) && /keine (?:Promotion|Änderung).*stil-regeln/i.test(candidate),
'Historischer Brain-Kandidat bindet alle fünf Quellen und seinen damaligen Kandidatenstatus');

for (const [name, mutate, fragment] of [
  ['eingefrorenes Video fehlt', (p) => p.replace('#### WCrnS09vpfo', '#### VIDEO-ID-FEHLT'), 'WCrnS09vpfo'],
  ['Lesson ohne Timecode', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L01', 1, ''), 'Timecode'],
  ['Lesson-Feld Evidence claim fehlt', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L01', 3, ''), 'Claim oder Nutzenbindung'],
  ['Lesson ohne exakten Zielpfad', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L01', 5, 'KTD2 / U2'), 'Zielpfad'],
  ['Lesson ohne U/KTD', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L01', 5, '`raphael-skills/skills/eigene/web/SKILL.md`'), 'U/KTD'],
  ['Lesson ohne messbares Gate', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L01', 6, ''), 'Gate'],
  ['REJECT ohne Ablehnungsgrund', (p) => planZelleMutieren(p, 'WCrnS09vpfo-L09', 7, ''), 'Caveat'],
  ['DEFER ohne Wiedereintrittsbedingung', (p) => planZelleMutieren(planZelleMutieren(p, 'QUI6Ug4cHnE-L05', 6, 'Bleibt offen.'), 'QUI6Ug4cHnE-L05', 7, 'Subjektiv.'), 'Wiedereintritt'],
  ['falscher Ledger-Nenner', (p) => p.replace('| WCrnS09vpfo | 10 | 3 | 6 | 1 | 0 | 0 |', '| WCrnS09vpfo | 9 | 3 | 6 | 1 | 0 | 0 |'), 'Summary'],
  ['unexplained_lessons ungleich null', (p) => p.replace('\n`unexplained_lessons=0`\n', '\n`unexplained_lessons=1`\n'), 'unexplained_lessons'],
  ['Provenance ohne Workflow-ID', (p) => p.replace('wf_ef2e1083-612', 'workflow-id-fehlt'), 'wf_ef2e1083-612'],
  ['Provenance ohne Worker', (p) => p.replace(/^\| agent-ae8e9a017673f0bb2 .*\n/m, ''), 'agent-ae8e9a017673f0bb2'],
  ['Provenance mit falscher Rolle', (p) => p.replace('| agent-ae8e9a017673f0bb2 | design-lens | gpt-5.6-sol |', '| agent-ae8e9a017673f0bb2 | falsche-lens | gpt-5.6-sol |'), 'Rolle'],
  ['Provenance mit falschem Modell', (p) => p.replace('| agent-aa6ab63865550766a | product-lens | gpt-5.6-sol |', '| agent-aa6ab63865550766a | product-lens | grok-4.6-build |'), 'Modell'],
  ['recovered/unstructured-Disposition gelöscht', (p) => planZelleMutieren(p, 'agent-a0f692fd1c978c66b', 3, ''), 'Disposition'],
  ['FAILED-Disposition gelöscht', (p) => planZelleMutieren(p, 'agent-ad206c2886324c5d3', 3, ''), 'Disposition'],
  ['Fable-Claim für Adversarial-Reviewer', (p) => p.replace('| agent-a66ae599436d3aca4 | adversarial | grok-4.6-build |', '| agent-a66ae599436d3aca4 | adversarial | claude-fable-5[1m] |'), 'Modell'],
]) temporaereMutation(plan, name, mutate, fragment);

const planSha256After = createHash('sha256').update(fs.readFileSync(planPath, 'utf8')).digest('hex');
zeile(planSha256After === planSha256, 'Historische Temp-Plan-Mutationen lassen das geprüfte Original unverändert',
  planSha256After === planSha256 ? '' : `${planSha256} → ${planSha256After}`);

console.log(`\n${geprueft - fehler}/${geprueft} Dokument-/Struktur- und historische Integritätschecks wie erwartet.`);
if (fehler) process.exit(1);
console.log('Web-1.2-Dokumentstruktur und historische Fünf-Video-Integrität sind konsistent; Website- und Modellverhalten wurden nicht geprüft.');
