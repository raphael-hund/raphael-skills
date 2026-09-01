#!/usr/bin/env node
/**
 * run-video-evidence-check.mjs — Video-Handoff, Source-to-Decision-Ledger
 * und Runtime-Provenance fail-closed prüfen.
 *
 * Der Standardlauf liest den persistierten Plan und die echten U5-Artefakte.
 * Negative Szenarien verändern ausschließlich temporäre Plankopien.
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
const CONTRACT = path.join(WEB, 'references', 'video-evidence-contract.md');
const LOAD = path.join(WEB, 'references', 'load-graph.md');
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
const PHASEN = new Set(['Strategy/IA', 'Copy/Visual System', 'Basisbuild', 'Motion-Polish', 'QA', 'visual-aaa']);
const CONFIDENCE = new Set(['high', 'medium', 'low', 'uncertain']);
const PROMOTION_STATUS = new Set(['kandidat', 'bestätigt', 'verbindlich']);

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

function zeitSekunden(value) {
  const match = /^(\d{1,3}):([0-5]\d)$/.exec(String(value || '').trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function timecodeBereiche(value) {
  return [...String(value || '').matchAll(/(\d{1,3}:[0-5]\d)\s*[–-]\s*(\d{1,3}:[0-5]\d)/g)]
    .map((match) => [zeitSekunden(match[1]), zeitSekunden(match[2])])
    .filter(([start, end]) => start != null && end != null && end > start);
}

function vorhanden(value) {
  return Array.isArray(value) ? value.length > 0 : String(value ?? '').trim().length > 0;
}

function handoffFehler(record, promotion = false) {
  const errors = [];
  for (const key of ['video_id', 'title', 'source', 'source_family', 'transcript_method', 'transcript_start', 'transcript_end', 'frames', 'lessons', 'status']) {
    if (!(key in record) || record[key] === '' || record[key] == null) errors.push(`${key} fehlt`);
  }
  try {
    const source = new URL(record.source);
    if (!['http:', 'https:'].includes(source.protocol)) errors.push('Source-URL ungültig');
  } catch {
    errors.push('Source-URL ungültig');
  }
  const transcriptStart = zeitSekunden(record.transcript_start);
  const transcriptEnd = zeitSekunden(record.transcript_end);
  if (transcriptStart == null || transcriptEnd == null || transcriptEnd <= transcriptStart) {
    errors.push('Transcript-Anfang/Ende ungültig');
  }
  if (!PROMOTION_STATUS.has(record.status)) errors.push('Status ungültig');

  const validFrames = [];
  if (!Array.isArray(record.frames)) {
    errors.push('Frame-Belege ungültig');
  } else {
    for (const frame of record.frames) {
      const frameTime = frame && typeof frame === 'object' ? zeitSekunden(frame.timecode) : null;
      if (frameTime == null || !path.isAbsolute(String(frame?.path || ''))) {
        errors.push('Frame-Beleg braucht Zeitmarke und absoluten Pfad');
      } else {
        validFrames.push({ ...frame, seconds: frameTime });
      }
    }
  }

  if (!Array.isArray(record.lessons) || !record.lessons.length) errors.push('Lessons fehlen');
  for (const lesson of record.lessons || []) {
    for (const key of ['timecode', 'lesson', 'phase', 'caveat', 'confidence']) {
      if (!String(lesson[key] || '').trim()) errors.push(`Lesson ${key} fehlt`);
    }
    const ranges = timecodeBereiche(lesson.timecode);
    if (!ranges.length) errors.push('Lesson-Timecode ungültig');
    if (lesson.phase && !PHASEN.has(lesson.phase)) errors.push(`Lesson phase ungültig: ${lesson.phase}`);
    if (lesson.confidence && !CONFIDENCE.has(lesson.confidence)) errors.push(`Lesson confidence ungültig: ${lesson.confidence}`);
    if (lesson.visual_claim) {
      const matchingFrame = validFrames.some((frame) => ranges.some(([start, end]) => frame.seconds >= start && frame.seconds <= end));
      if (!matchingFrame) errors.push('visueller Claim ohne Frame-Beleg am behaupteten Zeitpunkt');
    }
  }

  if (promotion && ['bestätigt', 'verbindlich'].includes(record.status)) {
    const receipt = record.skeptic_receipt;
    const receiptComplete = receipt && typeof receipt === 'object'
      && ['family', 'date', 'source_hash', 'findings', 'limitations'].every((key) => vorhanden(receipt[key]));
    const sameFamily = receiptComplete
      && String(receipt.family).toLowerCase() === String(record.source_family).toLowerCase();
    if (!receiptComplete || sameFamily) errors.push('vollständiger fremdfamiliärer Skeptiker-Receipt fehlt');
  }
  if (record.status === 'verbindlich') {
    const receipt = record.promotion_receipt;
    if (!receipt || typeof receipt !== 'object'
      || !['candidate_id', 'skeptic_receipt_id', 'target_revision', 'gate'].every((key) => vorhanden(receipt[key]))) {
      errors.push('vollständiger Promotion-Receipt fehlt');
    }
    if (/perfect|score|modell.?rang|model ranking/i.test(record.claim_type || '') && !record.benchmark_receipt) {
      errors.push('Creator-Score oder Modell-Rangfolge ohne Benchmark darf nicht verbindlich sein');
    }
  }
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
    zeile(ok, `Temp-Plan-Mutation wird rot: ${name}`, errors[0] || 'Mutation blieb unerkannt');
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

console.log('\nVideo-Evidence-, Ledger- und Provenance-Vertrag\n');
zeile(planErrors.length === 0, 'Persistierter Plan besteht Ledger und semantische Runtime-Provenance', planErrors.slice(0, 3).join(' | '));

const valid = {
  video_id: 'fixture-video', title: 'Fixture', source: 'https://example.test/video', source_family: 'creator',
  transcript_method: 'captions-plus-frame-check', transcript_start: '00:00', transcript_end: '10:00',
  frames: [{ timecode: '03:10', path: '/tmp/watch-video/frame-001.jpg' }], status: 'bestätigt',
  skeptic_receipt: {
    id: 'skeptic-1', family: 'grok', date: '2026-09-01', source_hash: 'sha256:fixture',
    findings: ['Frame und Transcript gebunden'], limitations: ['Keine Conversion-Messung'],
  },
  lessons: [{ timecode: '03:00–03:20', lesson: 'Basis vor Motion', phase: 'Basisbuild', caveat: 'Creator-Demo', confidence: 'medium', visual_claim: true }],
};
zeile(handoffFehler(valid, true).length === 0, 'Vollständiger Web-Evidence-Handoff kann bestätigt werden');
for (const [label, mutate, marker] of [
  ['fehlende Video-ID', (x) => { delete x.video_id; }, 'video_id'],
  ['fehlende Transcript-Endzeit', (x) => { delete x.transcript_end; }, 'transcript_end'],
  ['fehlendes Lesson-Feld', (x) => { delete x.lessons[0].lesson; }, 'Lesson lesson'],
  ['fehlende Lesson-Zeitmarke', (x) => { x.lessons[0].timecode = ''; }, 'timecode'],
  ['fehlendes Caveat', (x) => { x.lessons[0].caveat = ''; }, 'caveat'],
  ['fehlender Promotion-Status', (x) => { delete x.status; }, 'status'],
]) {
  const fixture = structuredClone(valid); mutate(fixture);
  const errors = handoffFehler(fixture, true);
  zeile(errors.some((error) => error.includes(marker)), `${label} verhindert Promotion`, errors.join(' | '));
}
{
  const fixture = structuredClone(valid); fixture.frames = [];
  const errors = handoffFehler(fixture, true);
  zeile(errors.some((error) => /Frame-Beleg/.test(error)), 'Rein transkriptbasierter visueller Claim bleibt unbestätigt', errors.join(' | '));
}
{
  const fixture = structuredClone(valid); delete fixture.frames[0].path;
  const errors = handoffFehler(fixture, true);
  zeile(errors.some((error) => /absoluten Pfad/.test(error)), 'Frame-Beleg ohne Pfad verhindert Promotion', errors.join(' | '));
}
{
  const fixture = structuredClone(valid); fixture.skeptic_receipt.family = fixture.source_family;
  const errors = handoffFehler(fixture, true);
  zeile(errors.some((error) => /fremdfamiliär/.test(error)), 'Gleichfamiliärer Skeptiker verhindert Promotion', errors.join(' | '));
}
for (const claimType of ['perfect creator score', 'Modell-Rangfolge']) {
  const fixture = structuredClone(valid); fixture.status = 'verbindlich'; fixture.claim_type = claimType; delete fixture.benchmark_receipt;
  const errors = handoffFehler(fixture, true);
  zeile(errors.some((error) => /Rangfolge|Creator-Score/.test(error)), `${claimType} wird ohne Benchmark nicht verbindlich`, errors.join(' | '));
}

const contract = lese(CONTRACT);
zeile(Boolean(contract) && /kandidat\s*→\s*bestätigt\s*→\s*verbindlich/i.test(contract)
  && /Skeptiker/i.test(contract) && /Frame-Beleg/i.test(contract),
'Video-Evidence-Vertrag beschreibt Schema, Promotion-Pipeline und Skeptiker-Pflicht');
const watch = lese(WATCH);
const watchFields = ['Video-ID', 'Titel', 'Quelle', 'Transcript-Methode', 'Anfang', 'Ende', 'Frame-Belege', 'Zeitmarken', 'Lesson', 'betroffene Phase', 'Caveat', 'Confidence'];
zeile(watchFields.every((field) => watch.includes(field)), 'watch-video enthält den optionalen vollständigen Web-Evidence-Handoff', watchFields.filter((field) => !watch.includes(field)).join(', '));

const load = lese(LOAD);
const phases = ['Strategy/IA', 'Copy/Visual System', 'statischer Basisbuild', 'optionaler Motion-Polish', 'QA', '`visual-aaa`'];
let cursor = -1;
const ordered = phases.every((phase) => { const next = load.indexOf(phase, cursor + 1); cursor = next; return next >= 0; });
zeile(ordered && /keine Vorratsloads/i.test(load) && /offene Entscheidung/i.test(load)
  && load.includes('Skill `design`') && load.includes('Skill `copywriting`') && load.includes('Skill `visual-aaa`'),
'Load-Graph bindet Spezialisten an die sechs Phasen und verbietet Vorratsloads');

const template = lese(TEMPLATE);
const index = lese(INDEX);
zeile(/\| Status \| `?kandidat/i.test(template) && /Raphael-Urteil/.test(template)
  && /ohne Raphael-Urteil[\s\S]{0,100}kandidat/i.test(template),
'Muster-Template hält einen Case ohne Raphael-Urteil auf kandidat');
zeile(/ohne Raphael-Urteil[\s\S]{0,120}kandidat/i.test(index) && /Frame-Beleg/i.test(index),
'Muster-INDEX beschreibt Kandidatenstatus und Frame-Belegschwelle');

for (const video of VIDEOS) {
  const rawPath = path.join(BRAIN, 'raw', `bookmark-2026-08-31-webskill-video-${video.id}.md`);
  const raw = lese(rawPath);
  zeile(Boolean(raw) && /status:\s*candidate/.test(raw) && raw.includes(video.id)
    && raw.includes(`https://youtu.be/${video.id}`) && raw.includes(`00:00–${video.end}`)
    && /## Kernlehren/.test(raw) && /## Caveats/.test(raw) && /Skeptiker[\s\S]{0,100}ausstehend/i.test(raw),
  `Brain-Raw ${video.id}: Quelle, Coverage, Kernlehren, Caveats und Kandidatenstatus`);
}
const candidate = lese(CANDIDATE);
zeile(Boolean(candidate) && /status:\s*candidate/.test(candidate) && VIDEOS.every((video) => candidate.includes(video.id))
  && /Skeptiker[\s\S]{0,100}ausstehend/i.test(candidate) && /keine (?:Promotion|Änderung).*stil-regeln/i.test(candidate),
'Brain-Kandidat bindet alle fünf Quellen und bleibt bis zum Skeptiker-Receipt kandidat');

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
zeile(planSha256After === planSha256, 'Temp-Plan-Mutationen lassen das geprüfte Original unverändert',
  planSha256After === planSha256 ? '' : `${planSha256} → ${planSha256After}`);

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log('Video-Evidence, Ledger und Runtime-Provenance sitzen.');
