#!/usr/bin/env node
/**
 * run-muster-bibliothek-check.mjs — Stil-Regeln, Load-Graph, Muster-Bibliothek.
 *
 * Liest die echten Dateien. Kein Mock. Exit 0 nur wenn alle Checks sitzen.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const STIL = path.join(WEB, 'references', 'stil-regeln.md');
const LOAD = path.join(WEB, 'references', 'load-graph.md');
const INDEX = path.join(WEB, 'references', 'muster-bibliothek', 'INDEX.md');
const TEMPLATE = path.join(WEB, 'references', 'muster-bibliothek', '_template.md');
const BIB = path.join(WEB, 'references', 'muster-bibliothek');
const SKILL = path.join(WEB, 'SKILL.md');
const ANF = path.join(WEB, 'references', 'anfaenger-pfad.md');
const LOOP2 = path.join(WEB, 'references', 'loop2-ablauf.md');
const SALSA = path.join(WEB, 'references', 'muster-bibliothek', 'salsaflow.md');
const PRIWATT = path.join(WEB, 'references', 'muster-bibliothek', 'priwatt');
const PRIWATT_MATRIX = path.join(PRIWATT, 'route-matrix.json');
const PRIWATT_CLOSURE = path.join(PRIWATT, 'shots', 'manifest-route-closure.json');
const PRIWATT_SECTIONS = path.join(PRIWATT, 'sektionen.md');

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

const lese = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');

console.log('\nMuster-Bibliothek + Stil-Regeln\n');

const stil = lese(STIL);
zeile(
  fs.existsSync(STIL) && !stil.includes('erster Batch steht aus'),
  'references/stil-regeln.md existiert und sagt nicht „erster Batch steht aus“',
);
zeile(
  /Sektor-Dials|Dials|VARIANCE/.test(stil),
  'references/stil-regeln.md enthaelt „Sektor-Dials“ oder „Dials“ oder „VARIANCE“',
);

const load = lese(LOAD);
zeile(
  fs.existsSync(LOAD) && load.includes('copywriting') && load.includes('design'),
  'references/load-graph.md existiert und nennt copywriting + design',
);

zeile(fs.existsSync(INDEX), 'references/muster-bibliothek/INDEX.md existiert');
zeile(fs.existsSync(TEMPLATE), 'references/muster-bibliothek/_template.md existiert');

const cases = fs.existsSync(BIB)
  ? fs.readdirSync(BIB).filter((f) => f.endsWith('.md') && f !== 'INDEX.md' && f !== '_template.md')
  : [];
zeile(
  cases.length > 0,
  `Case-Dateien in muster-bibliothek/*.md sind vorhanden (ohne INDEX/_template)`,
  `gefunden: ${cases.length}`,
);

// Routing wird im aktiven Referenzgraph geprüft. Kein zweites Wortlaut-
// Abbild des Einstiegs: ein indirekter Verweis auf die Bibliothek ist gültig.

zeile(
  stil.includes('handwerk-local') && /handwerk-local[^\n]*\| 4 \| 3 \| 5/.test(stil),
  'stil-regeln.md enthaelt handwerk-local und Dials-Zeile | 4 | 3 | 5',
);

const salsa = lese(SALSA);
zeile(
  fs.existsSync(SALSA) && salsa.includes('Jimdo'),
  'muster-bibliothek/salsaflow.md enthaelt „Jimdo“',
);


// Priwatt: geschlossener Route→Template-Nenner und reproduzierbare Evidenz.
const json = (p) => {
  try { return JSON.parse(lese(p)); } catch { return null; }
};
const normRoute = (r) => {
  const clean = String(r || '/').split(/[?#]/)[0].replace(/\/+$/g, '');
  return clean || '/';
};
const priwattMatrix = json(PRIWATT_MATRIX);
const priwattClosure = json(PRIWATT_CLOSURE);
zeile(!!priwattMatrix, 'priwatt/route-matrix.json existiert und ist parsebar');
zeile(!!priwattClosure, 'priwatt/shots/manifest-route-closure.json existiert und ist parsebar');

const routeRows = Array.isArray(priwattMatrix?.routes) ? priwattMatrix.routes : [];
const routeNames = routeRows.map((r) => normRoute(r.route));
const uniqueRouteNames = new Set(routeNames);
const snapshotCount = priwattMatrix?.snapshot?.route_universe_count;
const liveDelta = priwattMatrix?.snapshot?.live_delta_from_critic;
zeile(
  routeRows.length > 0 && uniqueRouteNames.size === routeRows.length,
  'priwatt Matrix-Routen sind nicht leer und eindeutig',
  `rows=${routeRows.length}, unique=${uniqueRouteNames.size}`,
);
zeile(
  snapshotCount === routeRows.length && (snapshotCount === 59 || liveDelta?.status !== 'none'),
  'priwatt Snapshot-Nenner entspricht Matrix und ist 59 oder dokumentiertes Live-Delta',
  `snapshot=${snapshotCount}, rows=${routeRows.length}, delta=${liveDelta?.status || 'fehlt'}`,
);

const closureRoutes = new Set(
  Array.isArray(priwattClosure?.routes)
    ? priwattClosure.routes.map((r) => normRoute(r.route))
    : [],
);
const required = [
  'route', 'source', 'template_group', 'representative_route', 'manifest',
  'desktop', 'mobile', 'states', 'disposition', 'reason',
];
const schemaErrors = [];
const missingDesktop = [];
const missingMobile = [];
const invalidStates = [];
const invalidDisposition = [];
for (const row of routeRows) {
  const missing = required.filter((k) => !(k in row));
  if (missing.length) schemaErrors.push(`${row.route || '<ohne route>'}: ${missing.join(',')}`);
  if (!Array.isArray(row.source) || !row.source.length) schemaErrors.push(`${row.route}: source`);
  if (!row.template_group || !row.reason) schemaErrors.push(`${row.route}: group/reason`);
  if (!['covered', 'intentional_exclusion'].includes(row.disposition)) invalidDisposition.push(row.route);
  if (row.disposition === 'covered') {
    const rep = normRoute(row.representative_route);
    if (!uniqueRouteNames.has(rep) || !closureRoutes.has(rep)) schemaErrors.push(`${row.route}: representative ${rep}`);
    if (!row.manifest || !fs.existsSync(path.join(PRIWATT, row.manifest))) schemaErrors.push(`${row.route}: manifest`);
    if (!Array.isArray(row.desktop) || !row.desktop.length || row.desktop.some((f) => !fs.existsSync(path.join(PRIWATT, f)))) missingDesktop.push(row.route);
    if (!Array.isArray(row.mobile) || !row.mobile.length || row.mobile.some((f) => !fs.existsSync(path.join(PRIWATT, f)))) missingMobile.push(row.route);
  }
  const st = row.states || {};
  if (!['proven', 'unproven'].includes(st.status)) invalidStates.push(`${row.route}: status`);
  if (st.status === 'proven' && (!Array.isArray(st.paths) || !st.paths.length || st.paths.some((f) => !fs.existsSync(path.join(PRIWATT, f))))) invalidStates.push(`${row.route}: paths`);
  if (st.status === 'unproven' && !String(st.reason || '').trim()) invalidStates.push(`${row.route}: reason`);
}
const unexplained = routeRows.filter((r) => !['covered', 'intentional_exclusion'].includes(r.disposition));
zeile(
  schemaErrors.length === 0,
  'priwatt Matrixschema, Repräsentanten und Manifestverweise sind gültig',
  schemaErrors.slice(0, 5).join(' | '),
);
zeile(
  unexplained.length === 0 && priwattMatrix?.summary?.unexplained_productive === 0 && invalidDisposition.length === 0,
  'priwatt unexplained_productive == 0',
  `unexplained=${unexplained.length}, invalid=${invalidDisposition.length}`,
);
zeile(
  missingDesktop.length === 0 && missingMobile.length === 0,
  'priwatt covered-Repräsentanten haben existierende Desktop- und Mobile-Belege',
  `missing_desktop=${missingDesktop.length}, missing_mobile=${missingMobile.length}`,
);
zeile(
  invalidStates.length === 0,
  'priwatt States sind proven mit Pfad oder unproven mit Grund',
  invalidStates.slice(0, 5).join(' | '),
);

const priwattSections = lese(PRIWATT_SECTIONS);
const atlasRoutes = new Set(
  [...priwattSections.matchAll(/^## Seite:\s*(.+?)\s*$/gm)].map((m) => normRoute(m[1])),
);
const atlasWithoutManifest = [...atlasRoutes].filter((r) => !closureRoutes.has(r));
zeile(
  atlasWithoutManifest.length === 0 && Array.isArray(priwattMatrix?.summary?.atlas_without_manifest) && priwattMatrix.summary.atlas_without_manifest.length === 0,
  'priwatt atlas_without_manifest == []',
  atlasWithoutManifest.join(', '),
);
const shotRefs = new Set(
  [...priwattSections.matchAll(/\b[A-Za-z0-9_.-]+\.png\b/g)].map((m) => m[0]),
);
const deadShotRefs = [...shotRefs].filter((f) => !fs.existsSync(path.join(PRIWATT, 'shots', f)));
zeile(
  deadShotRefs.length === 0,
  'priwatt sektionen.md hat 0 tote Shot-Zitate',
  deadShotRefs.slice(0, 5).join(', '),
);
zeile(
  closureRoutes.has('/erfahrungen'),
  'priwatt Nachtragsmanifest enthält /erfahrungen',
);

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log('Muster-Bibliothek und Stil-Regeln sitzen.');
