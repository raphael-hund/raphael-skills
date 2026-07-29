#!/usr/bin/env node
// g1-gate.mjs — deterministisches Auslieferungs-Gate fuer Websites (Regel 14:
// "fertig" ist eine Umgebungstatsache, kein Selbsturteil des Agenten).
//
// Bisheriges Problem: shot-sweep.mjs setzt Exit 1 nur bei Navigationsfehlern,
// visual-diff.mjs nur bei Exception. Kein Skript hat je an Qualitaet blockiert.
// Dieses Gate buendelt die harten Checks und liefert EINEN Exit-Code.
//
//   node g1-gate.mjs --base http://localhost:5280 --routes /,/leistungen
//
// Exit 0 = alle aktivierten Checks bestanden. Exit 1 = mindestens ein Check
// gerissen. Exit 2 = Gate selbst kaputt (Tool fehlt, Server tot) — das ist
// bewusst KEIN Pass, aber unterscheidbar von einem echten Qualitaetsfehler.
//
// Budget-Datei (optional, --budget): ueberschreibt DEFAULT_BUDGET.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const has = (k) => args.includes(`--${k}`);

// Ein vertipptes Flag darf nicht still auf den Default zurueckfallen — sonst prueft das
// Gate klaglos die falsche Adresse und meldet ein gruenes Ergebnis fuer nichts.
const KNOWN = ['base', 'url', 'routes', 'out', 'src', 'budget', 'strict', 'no-shots', 'help'];
const unknown = args.filter((a) => a.startsWith('--') && !KNOWN.includes(a.slice(2)));
if (unknown.length) {
  console.error(`Unbekanntes Flag: ${unknown.join(', ')}\nErlaubt: ${KNOWN.map((k) => `--${k}`).join(' ')}`);
  process.exit(2);
}

// --url ist ein Alias fuer --base (die Doktrin nennt es --url, das Skript hiess --base).
const BASE = get('base', get('url', 'http://localhost:5280')).replace(/\/$/, '');
const ROUTES = get('routes', '/').split(',').map((r) => r.trim()).filter(Boolean)
  .map((r) => (r.startsWith('/') ? r : `/${r}`));

// Ohne --routes prueft das Gate nur die Startseite — und meldet gruen fuers Ganze.
//
// Befund 28.07.2026 (SalsaFlow): der Build hat 28 Seiten. Geprueft wurde eine.
// Die anderen 27 waren nicht "bestanden", sie waren ungesehen; genau das darf ein
// Tor nicht verwechseln. Es entscheidet die Routen nicht selbst — es weigert sich,
// stillschweigend fuer Unbesehenes zu buergen.
//
// Jede Seite liefert BEIDE zulaessigen Schreibweisen (`/team` und `/team.html`),
// weil das Gate nicht wissen kann, ob die Produktion cleanUrls fahrt. Passt eine
// davon, gilt die Seite als benannt.
function seitenImBuild(dir) {
  const raus = [];
  const gehe = (unter, praefix) => {
    for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'assets' || e.name === 'node_modules') continue;
      if (e.isDirectory()) { gehe(path.join(unter, e.name), `${praefix}/${e.name}`); continue; }
      if (!e.name.endsWith('.html') || e.name === '404.html') continue;
      raus.push(e.name === 'index.html'
        ? [praefix || '/', `${praefix}/`]
        : [`${praefix}/${e.name.replace(/\.html$/, '')}`, `${praefix}/${e.name}`]);
    }
  };
  // Kein `catch { return [] }`. Ein unlesbarer Ordner ist nicht dasselbe wie ein
  // Build ohne Unterseiten — der eine Fall waere ein stilles Gruen fuer eine
  // Website, die dieses Skript nie gesehen hat. Es fliegt lieber laut.
  gehe(dir, '');
  return raus;
}
// Ohne --out bekommt JEDER Lauf einen eigenen Ordner. Vorher war es fuer alle
// derselbe (`/tmp/g1-gate`).
//
// Befund 28.07.2026: zwei Anti-Set-Laeufe liefen gleichzeitig, und beide riefen
// `lighthouse --output-path=/tmp/g1-gate/lh_.json` auf. Lauf A schrieb das Ergebnis
// von a3, Lauf B las es als seines. Die Folge war ein Urteil ueber die falsche
// Seite — in beide Richtungen, unreproduzierbar, und niemand haette es gemerkt.
// Betrifft ebenso g1-report.json und die Screenshots.
const OUT = get('out', fs.mkdtempSync(path.join(os.tmpdir(), 'g1-gate-')));
const SKILL_DIR = path.dirname(new URL(import.meta.url).pathname);

// Fehlendes Feld ist NICHT dasselbe wie ein leeres Feld.
//
// Luna-Audit 27.07.2026: neunmal stand `parsed.violations || []` im Gate. Liefert
// ein Werkzeug `{}`, weil es unterwegs gestorben ist, wird daraus eine leere Liste
// und damit "0 Probleme gefunden" — ein Absturz meldete Bestnote. Wer eine Liste
// erwartet, muss eine Liste bekommen; alles andere ist ein kaputter Lauf.
//
// Wirft, statt null zurueckzugeben: der Aufrufer faengt es ohnehin schon und
// meldet dann ehrlich "Ausgabe unlesbar" statt still zu bestehen.
function liste(parsed, feld, werkzeug) {
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`${werkzeug}: Ausgabe ist kein Objekt`);
  }
  const v = parsed[feld];
  if (v === undefined) throw new Error(`${werkzeug}: Feld "${feld}" fehlt in der Ausgabe`);
  if (!Array.isArray(v)) throw new Error(`${werkzeug}: "${feld}" ist ${typeof v}, erwartet Liste`);
  return v;
}

// Budgets. Bewusst konservativ: ein 10k-Website-Ergebnis reisst diese Werte nicht.
const DEFAULT_BUDGET = {
  lighthousePerformance: 0.90,
  lighthouseAccessibility: 1.00,
  lighthouseBestPractices: 0.95,
  lighthouseSeo: 1.00,
  axeViolations: 0,          // hart: web/SKILL.md completion_criteria
  brokenLinks: 0,
  htmlErrors: 0,
  slopScore: 0,              // scan-ai-slop.mjs Exit 1 = Slop gefunden
};

// Ein Budget kann Gruen erkaufen. Also muss es dafuer geradestehen.
//
// Befund 29.07.2026: `--budget` war die einzige Eingabe des Gates ohne jede
// Pruefung. Drei Wege zu falschem Gruen lagen offen:
//   1. `{"axeViolation": 99}` — ein fehlender Buchstabe, und die Lockerung
//      landet still neben dem echten Schluessel. Das Gate laeuft weiter mit
//      Standardwerten und meldet ein Ergebnis, das der Aufrufer anders erwartet.
//      Vertippte FLAGS lehnt das Gate seit dem 26.07. hart ab — vertippte
//      Budget-Schluessel nicht. Dieselbe Gefahr, halb geschlossen.
//   2. Kaputtes JSON oder fehlende Datei liessen einen nackten Node-Stacktrace
//      mit Exit 1 raus. Exit 1 heisst in diesem Tor "Qualitaet gerissen" — ein
//      Werkzeugfehler tarnte sich als Befund. Das ist Exit 2.
//   3. Nichts sagte hinterher, dass ueberhaupt gelockert wurde. Ein erkauftes
//      Gruen sah aus wie ein verdientes.
// Schluessel mit `_` sind Kommentare (siehe evals/antiset-budget.json) und
// werden bewusst ignoriert, nicht abgelehnt.
function budgetLaden(datei) {
  if (!datei) return { budget: { ...DEFAULT_BUDGET }, gelockert: [] };
  let roh;
  try {
    roh = JSON.parse(fs.readFileSync(datei, 'utf8'));
  } catch (e) {
    console.error(`Budget-Datei unbrauchbar (${datei}): ${e.message.split('\n')[0]}`);
    process.exit(2);
  }
  if (roh === null || typeof roh !== 'object' || Array.isArray(roh)) {
    console.error(`Budget-Datei muss ein Objekt enthalten, ist aber ${Array.isArray(roh) ? 'eine Liste' : typeof roh}: ${datei}`);
    process.exit(2);
  }
  const budget = { ...DEFAULT_BUDGET };
  const gelockert = [];
  for (const [k, v] of Object.entries(roh)) {
    if (k.startsWith('_')) continue;
    if (!(k in DEFAULT_BUDGET)) {
      console.error(`Unbekannter Budget-Schluessel "${k}" in ${datei}`);
      console.error(`Erlaubt: ${Object.keys(DEFAULT_BUDGET).join(', ')}`);
      process.exit(2);
    }
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      console.error(`Budget "${k}" ist ${typeof v}, erwartet eine Zahl: ${datei}`);
      process.exit(2);
    }
    budget[k] = v;
    // Lockerung heisst: mehr Verstoesse erlaubt bzw. niedrigere Punktzahl noetig.
    // Beide Richtungen haengen an derselben Frage — ist der Standard schaerfer?
    const strenger = k.startsWith('lighthouse') ? v < DEFAULT_BUDGET[k] : v > DEFAULT_BUDGET[k];
    if (strenger) gelockert.push(`${k}: ${DEFAULT_BUDGET[k]} -> ${v}`);
  }
  return { budget, gelockert };
}

const budgetFile = get('budget', null);
const { budget: BUDGET, gelockert: BUDGET_GELOCKERT } = budgetLaden(budgetFile);

const results = [];
const record = (name, ok, detail, skipped = false) => {
  results.push({ name, ok, skipped, detail });
  const tag = skipped ? 'SKIP' : ok ? 'PASS' : 'FAIL';
  console.log(`[${tag}] ${name} — ${detail}`);
};

function toolExists(bin) {
  try { execFileSync('which', [bin], { stdio: 'pipe' }); return true; } catch { return false; }
}

function run(bin, argv, opts = {}) {
  return execFileSync(bin, argv, { encoding: 'utf8', stdio: 'pipe', maxBuffer: 64 * 1024 * 1024, ...opts });
}

// --- Check 1: Server erreichbar -------------------------------------------
function checkServer() {
  try {
    const code = run('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', `${BASE}${ROUTES[0]}`]).trim();
    if (!/^[23]/.test(code)) { record('server', false, `${BASE}${ROUTES[0]} -> HTTP ${code}`); return false; }
    record('server', true, `${BASE}${ROUTES[0]} -> HTTP ${code}`);
    return true;
  } catch (e) {
    record('server', false, `nicht erreichbar: ${e.message.split('\n')[0]}`);
    return false;
  }
}

// --- Check 2: Lighthouse pro Route ----------------------------------------
function checkLighthouse() {
  if (!toolExists('lighthouse')) { record('lighthouse', true, 'lighthouse nicht installiert', true); return; }
  for (const route of ROUTES) {
    const jsonPath = path.join(OUT, `lh${route.replace(/[^\w]+/g, '_')}.json`);
    try {
      run('lighthouse', [`${BASE}${route}`, '--quiet', '--output=json', `--output-path=${jsonPath}`,
        '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo']);
      const lh = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const s = lh.categories;
      const checks = [
        ['performance', s.performance?.score, BUDGET.lighthousePerformance],
        ['accessibility', s.accessibility?.score, BUDGET.lighthouseAccessibility],
        ['best-practices', s['best-practices']?.score, BUDGET.lighthouseBestPractices],
        ['seo', s.seo?.score, BUDGET.lighthouseSeo],
      ];
      // Eine Kategorie ohne Zahl ist ein kaputter Lauf, kein bestandener.
      // Vorher stand `typeof got === 'number' && got < min` da: fehlte der Score,
      // wurde er als '?' gedruckt und zaehlte nicht als Verstoss — PASS mit Luecke.
      const fehlend = checks.filter(([, got]) => typeof got !== 'number');
      const fmt = checks.map(([k, got]) => `${k}=${typeof got === 'number' ? Math.round(got * 100) : '?'}`).join(' ');
      if (fehlend.length) {
        record(`lighthouse${route}`, false,
          `${fmt} — ohne Score: ${fehlend.map(([k]) => k).join(', ')} (Lauf unvollstaendig)`);
        continue;
      }
      const bad = checks.filter(([, got, min]) => got < min);
      record(`lighthouse${route}`, bad.length === 0, bad.length
        ? `${fmt} — unter Budget: ${bad.map(([k, got, min]) => `${k} ${Math.round(got * 100)}<${Math.round(min * 100)}`).join(', ')}`
        : fmt);
    } catch (e) {
      record(`lighthouse${route}`, false, `Lauf fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 3: axe (a11y, hart 0) ------------------------------------------
// Ueber axe-run.mjs (Playwright), nicht ueber @axe-core/cli: dessen chromedriver
// ist auf dieser Maschine eine Major-Version voraus und stirbt beim Start.
function checkAxe() {
  const runner = path.join(SKILL_DIR, 'axe-run.mjs');
  if (!fs.existsSync(runner)) { record('axe', true, 'axe-run.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json']);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) {
        record(`axe${route}`, false, `axe-Lauf kaputt: ${String(e.stderr || e.message).split('\n')[0]}`);
        continue;
      }
    }
    try {
      const parsed = JSON.parse(out);
      const violations = liste(parsed, 'violations', 'axe');
      record(`axe${route}`, violations.length <= BUDGET.axeViolations,
        violations.length === 0 ? `0 Violations (${parsed.passes} Passes)`
          : `${violations.length} Violations: ${violations.slice(0, 5).map((v) => `${v.id}(${v.impact})`).join(', ')}`);
    } catch {
      record(`axe${route}`, false, `axe-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 4: tote Links ---------------------------------------------------
function checkLinks() {
  if (!toolExists('linkinator')) { record('links', true, 'linkinator nicht installiert', true); return; }
  try {
    const out = run('linkinator', [BASE, '--recurse', '--format', 'json', '--silent']);
    const parsed = JSON.parse(out);
    const alle = liste(parsed, 'links', 'linkinator');
    const broken = alle.filter((l) => l.state === 'BROKEN');
    record('links', broken.length <= BUDGET.brokenLinks,
      broken.length === 0 ? `${alle.length} Links, 0 tot`
        : `${broken.length} tot: ${broken.slice(0, 5).map((l) => l.url).join(', ')}`);
  } catch (e) {
    const stdout = e.stdout ? String(e.stdout) : '';
    try {
      const parsed = JSON.parse(stdout);
      const broken = liste(parsed, 'links', 'linkinator').filter((l) => l.state === 'BROKEN');
      record('links', broken.length <= BUDGET.brokenLinks,
        `${broken.length} tot: ${broken.slice(0, 5).map((l) => l.url).join(', ')}`);
    } catch {
      record('links', false, `linkinator-Lauf kaputt: ${String(e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 5: AI-Slop-Scanner (bestehender design-Skill) ------------------
// scan-ai-slop.mjs greppt QUELLCODE, nicht eine URL — braucht daher --src.
// Ohne --src ist der Check nicht anwendbar und wird ehrlich uebersprungen,
// statt still zu bestehen.
// Der Scanner meldet `hits` als ZAHL und `findings` als Gruppen-Liste. Ein naives
// `parsed.hits || parsed.findings` liefert deshalb die Zahl, und `Array.isArray(4)`
// ist false — das Gate meldete "0 Slop-Tells" fuer eine Seite mit vier Treffern.
// Darum hier explizit: Zahl gewinnt, sonst Treffer ueber alle Gruppen summieren.
function slopZaehlen(parsed) {
  if (typeof parsed.hits === 'number') return parsed.hits;
  if (Array.isArray(parsed.hits)) return parsed.hits.length;
  if (Array.isArray(parsed.findings)) {
    return parsed.findings.reduce((s, g) => s + (Array.isArray(g.hits) ? g.hits.length : 1), 0);
  }
  return null; // unbekanntes Format — nicht als 0 durchwinken
}

function slopNamen(parsed) {
  const g = Array.isArray(parsed.findings) ? parsed.findings : [];
  return g.slice(0, 5).map((x) => x.name || x.id || '?').join(', ');
}

// Der Scanner kennt keine Schweregrade: jede seiner 33 Regeln zaehlt gleich viel.
// Damit wuerde ein "Kicker ueber der Ueberschrift" (in der Doktrin WARN) die
// Auslieferung genauso stoppen wie ein Indigo-Violett-Verlauf (BLOCK). Die
// Einteilung passiert deshalb hier, in denselben Stufen wie craft-check.
// Quelle der Zuordnung: references/agentur-merkmale.md.
const SLOP_BLOCK = new Set([
  '01', // Indigo→Violett-Verlauf (T2)
  '02', // Verlauf in der Headline
  '14', // KI-Textstimme ("nahtlos", "muehelos", "Game-Changer")
  '24', // KI-gezeichnetes SVG-Icon
  '28', // erfundene Statistik-Zeile (T9)
]);

// Der Scanner schreibt die IDs heute als String mit fuehrender Null ("01").
// Wuerde er auf Zahlen umstellen, waere aus "01" die 1 — und `Set.has("1")`
// faende die schlimmste Regel (Indigo-Violett-Verlauf) nicht mehr. Das waere
// ein stilles falsches Gruen, also wird die ID vorher auf zwei Stellen normiert.
const slopId = (id) => String(id).trim().padStart(2, '0');

function slopTeilen(parsed) {
  const g = Array.isArray(parsed.findings) ? parsed.findings : [];
  const zaehle = (x) => (Array.isArray(x.hits) ? x.hits.length : 1);
  const block = g.filter((x) => SLOP_BLOCK.has(slopId(x.id)));
  const warn = g.filter((x) => !SLOP_BLOCK.has(slopId(x.id)));
  return {
    block: block.reduce((s, x) => s + zaehle(x), 0),
    warn: warn.reduce((s, x) => s + zaehle(x), 0),
    blockNamen: block.map((x) => x.name || x.id).join(', '),
    warnNamen: warn.map((x) => x.name || x.id).join(', '),
  };
}

function slopMelden(parsed) {
  const n = slopZaehlen(parsed);
  if (n === null) { record('ai-slop', false, 'Slop-Scan: unbekanntes JSON-Format'); return; }
  const s = slopTeilen(parsed);
  // Die Abkuerzung "n === 0 -> gruen" stand frueher VOR dieser Pruefung. Meldet der
  // Scanner {hits: 0, findings: [...]} — Zaehler kaputt, Funde da —, war das ein
  // stilles Gruen auf einer Seite mit Treffern. Erst Widerspruch pruefen, dann Null.
  if (n === 0 && s.block + s.warn > 0) {
    record('ai-slop', false,
      `Zaehler meldet 0 Tells, die Fundliste enthaelt aber ${s.block + s.warn} — Ausgabe widerspruechlich`);
    return;
  }
  if (n === 0) { record('ai-slop', true, '0 Slop-Tells'); return; }
  // Gesamtzahl und Einteilung lesen zwei verschiedene Felder: `hits` (Zahl) und
  // `findings` (Gruppen). Klaffen sie auseinander, sind Treffer gemeldet, die
  // sich keiner Regel zuordnen lassen — dann ist die Einteilung blind und darf
  // nicht Gruen sagen. Sol-Befund 27.07.2026: {hits:1, findings:[]} meldete Gruen.
  if (s.block + s.warn !== n) {
    record('ai-slop', false,
      `${n} Tells gemeldet, aber nur ${s.block + s.warn} einer Regel zuzuordnen — Einteilung unvollstaendig`);
    return;
  }
  const detail = s.block
    ? `${s.block} Blocker (${s.blockNamen})${s.warn ? `, ${s.warn} Warnung(en): ${s.warnNamen}` : ''}`
    : `0 Blocker, ${s.warn} Warnung(en): ${s.warnNamen}`;
  record('ai-slop', s.block <= BUDGET.slopScore, detail);
}

function checkSlop() {
  const src = get('src', null);
  const scan = path.resolve(SKILL_DIR, '../../../design/scripts/scan-ai-slop.mjs');
  if (!fs.existsSync(scan)) { record('ai-slop', true, `scan-ai-slop.mjs nicht gefunden (${scan})`, true); return; }
  if (!src) { record('ai-slop', true, 'kein --src <projektordner> uebergeben', true); return; }
  if (!fs.existsSync(src)) { record('ai-slop', false, `--src existiert nicht: ${src}`); return; }
  try {
    slopMelden(JSON.parse(run('node', [scan, src, '--json'])));
  } catch (e) {
    // Exit 1 = Tells gefunden (kein kaputter Lauf). JSON steht trotzdem auf stdout.
    try {
      slopMelden(JSON.parse(String(e.stdout || '')));
    } catch {
      record('ai-slop', false, `Slop-Scan kaputt: ${String(e.stderr || e.message).split('\n')[0]}`);
    }
  }
}

// --- Check 6: Handwerks-Merkmale (M1-M25 / T1-T10) ------------------------
function checkCraft() {
  const runner = path.join(SKILL_DIR, 'craft-check.mjs');
  if (!fs.existsSync(runner)) { record('craft', true, 'craft-check.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json', ...(has('strict') ? ['--strict'] : [])]);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) { record(`craft${route}`, false, `craft-check kaputt: ${String(e.stderr || e.message).split('\n')[0]}`); continue; }
    }
    try {
      const parsed = JSON.parse(out);
      const b = liste(parsed, 'blockers', 'craft-check');
      const w = liste(parsed, 'warns', 'craft-check');
      // Mit --strict zaehlen Warnungen als Fehler. Das entscheidet craft-check
      // selbst ueber seinen Exit-Code — wer hier nur `blockers.length` liest,
      // schluckt das Flag stillschweigend und meldet PASS trotz Warnungen.
      const strengeVerletzt = has('strict') && w.length > 0;
      record(`craft${route}`, b.length === 0 && !strengeVerletzt,
        b.length === 0
          ? `0 Blocker, ${w.length} Warnung(en)${strengeVerletzt ? ' — strict: Warnungen zaehlen als Fehler' : ''}`
          : `${b.length} Blocker: ${b.slice(0, 5).map((f) => `${f.id}`).join(', ')} (+${w.length} Warnungen)`);
    } catch {
      record(`craft${route}`, false, `craft-check-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 7: Formularfelder (F1-F7) --------------------------------------
// Eigener Pruefer, weil die Luecke gemessen ist: ein E-Mail-Feld mit
// type="text", ohne autocomplete, ohne inputmode kam am 29.07.2026 durch axe
// (0 Violations, 31 Passes) UND durch craft-check (kein Formular-Befund).
// Auf einer Landingpage ist das Formular die einzige Conversion.
function checkFormular() {
  const runner = path.join(SKILL_DIR, 'formular-check.mjs');
  if (!fs.existsSync(runner)) { record('formular', true, 'formular-check.mjs nicht gefunden', true); return; }
  for (const route of ROUTES) {
    let out = '';
    let code = 0;
    try {
      out = run('node', [runner, '--url', `${BASE}${route}`, '--json', ...(has('strict') ? ['--strict'] : [])]);
    } catch (e) {
      code = e.status ?? 2;
      out = String(e.stdout || '');
      if (code === 2) { record(`formular${route}`, false, `formular-check kaputt: ${String(e.stderr || e.message).split('\n')[0]}`); continue; }
    }
    try {
      const parsed = JSON.parse(out);
      const b = liste(parsed, 'blockers', 'formular-check');
      const w = liste(parsed, 'warns', 'formular-check');
      const strengeVerletzt = has('strict') && w.length > 0;
      record(`formular${route}`, b.length === 0 && !strengeVerletzt,
        b.length === 0
          ? `0 Blocker, ${w.length} Warnung(en)${strengeVerletzt ? ' — strict: Warnungen zaehlen als Fehler' : ''}`
          : `${b.length} Blocker: ${b.slice(0, 5).map((f) => f.id).join(', ')} (+${w.length} Warnungen)`);
    } catch {
      record(`formular${route}`, false, `formular-check-Ausgabe unlesbar (exit ${code})`);
    }
  }
}

// --- Check 8: Screenshot-Sweep muss sauber durchlaufen ---------------------
//
// Das Urteil hing bis zum 29.07.2026 allein an `r.error`. Vier Manifeste kamen
// damit als Gruen durch, jedes davon ein Sweep, der nichts fotografiert hat:
//   { routes: [] }                            -> "0 Screenshots", bestanden
//   [{ route: '/', shots: [] }]               -> "0 Screenshots", bestanden
//   nur 1 von 3 verlangten Routen im Manifest -> "1 Screenshots", bestanden
//   shots nennt eine Datei, die es nicht gibt -> "1 Screenshots", bestanden
// Der Sweep ist die Grundlage jeder Sichtpruefung. Fehlt das Bild, hat der
// Panel-Schritt nichts zu sehen — und ein Nichts besteht sonst jede Pruefung.
function checkSweep() {
  const sweep = path.join(SKILL_DIR, 'shot-sweep.mjs');
  if (!fs.existsSync(sweep)) { record('shot-sweep', true, 'shot-sweep.mjs nicht gefunden', true); return; }
  const shotDir = path.join(OUT, 'shots');
  try {
    run('node', [sweep, '--base', BASE, '--routes', ROUTES.join(','), '--out', shotDir, '--mobile']);
    const manifest = JSON.parse(fs.readFileSync(path.join(shotDir, 'manifest.json'), 'utf8'));
    const maengel = sweepMaengel(manifest, ROUTES, shotDir);
    const shots = liste(manifest, 'routes', 'shot-sweep').reduce((n, r) => n + (r.shots?.length || 0), 0);
    record('shot-sweep', maengel.length === 0,
      maengel.length ? maengel.join(' | ') : `${shots} Screenshots in ${shotDir}`);
  } catch (e) {
    record('shot-sweep', false, `Sweep fehlgeschlagen: ${String(e.message).split('\n')[0]}`);
  }
}

// Getrennt von checkSweep, damit evals/run-sweep-check.mjs sie ohne Browser
// gegen erfundene Manifeste fahren kann.
function sweepMaengel(manifest, verlangt, shotDir) {
  const routen = liste(manifest, 'routes', 'shot-sweep');
  const maengel = [];

  const errs = routen.filter((r) => r.error);
  if (errs.length) maengel.push(`${errs.length} Route(n) fehlerhaft: ${errs.map((r) => r.route).join(', ')}`);

  // Jede verlangte Route muss im Manifest stehen — sonst hat der Sweep sie
  // uebersprungen, ohne einen Fehler zu melden.
  const gesehen = new Set(routen.map((r) => String(r.route).replace(/\/$/, '') || '/'));
  const fehlend = verlangt.filter((r) => !gesehen.has(r.replace(/\/$/, '') || '/'));
  if (fehlend.length) maengel.push(`nie fotografiert: ${fehlend.join(', ')}`);

  // Und jede muss mindestens ein Bild haben. Eine Route mit shots: [] ist kein
  // Fehler im Manifest-Sinn, aber sie ist auch keine Sichtpruefung.
  const leer = routen.filter((r) => !r.error && !(r.shots?.length));
  if (leer.length) maengel.push(`ohne einen einzigen Screenshot: ${leer.map((r) => r.route).join(', ')}`);

  // Ein Dateiname im Manifest ist eine Behauptung. Nachsehen ist billig.
  if (shotDir) {
    const weg = [];
    for (const r of routen) {
      for (const s of r.shots || []) {
        if (!fs.existsSync(path.join(shotDir, s.file))) weg.push(s.file);
      }
    }
    if (weg.length) maengel.push(`${weg.length} Datei(en) im Manifest fehlen auf der Platte: ${weg.slice(0, 3).join(', ')}`);
  }
  return maengel;
}

// --- main ------------------------------------------------------------------
fs.mkdirSync(OUT, { recursive: true });
console.log(`G1-Gate — ${BASE} — Routen: ${ROUTES.join(', ')}`);
if (BUDGET_GELOCKERT.length) {
  console.log(`Budget gelockert (${budgetFile}): ${BUDGET_GELOCKERT.join(' | ')}`);
}
console.log('');

if (!checkServer()) {
  console.log('\nServer nicht erreichbar — Gate kann nicht urteilen.');
  process.exit(2);
}

checkLighthouse();
checkAxe();
checkLinks();
checkSlop();
checkCraft();
checkFormular();
if (!has('no-shots')) checkSweep();

const failed = results.filter((r) => !r.ok && !r.skipped);
const skipped = results.filter((r) => r.skipped);
const reportPath = path.join(OUT, 'g1-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  base: BASE, routes: ROUTES, budget: BUDGET,
  budgetDatei: budgetFile, budgetGelockert: BUDGET_GELOCKERT,
  results,
}, null, 2));

console.log(`\nReport: ${reportPath}`);
if (skipped.length) console.log(`${skipped.length} Check(s) uebersprungen (Tool fehlt): ${skipped.map((r) => r.name).join(', ')}`);

if (failed.length) {
  console.log(`\nG1 GERISSEN — ${failed.length} Check(s): ${failed.map((r) => r.name).join(', ')}`);
  process.exit(1);
}

// Uebersprungen ist nicht bestanden. Fehlt zu viel Werkzeug, hat das Gate nichts
// geprueft und darf kein Gruen melden — sonst liefert ein kaputter Rechner
// jede Seite durch. Exit 2 heisst "Tor kaputt", nicht "Seite gut".
// Namen tragen die Route als Suffix (`lighthouse/`, `axe/preise`), darum Praefix-Vergleich.
//
// Frueher galt "mindestens 2 von 4 gelaufen" als ausreichend. Diese Schwelle war
// willkuerlich: fehlten Lighthouse UND der Slop-Scan, meldeten axe und craft
// allein ein gruenes Tor — Tempo, Suchmaschinen und KI-Tells waren schlicht
// ungeprueft. Jede der vier Familien beantwortet eine eigene Frage, also muss
// jede mindestens einmal gelaufen sein. Wer eine bewusst weglassen will,
// laesst sie weg und liest Exit 2 als das, was es ist: kein Urteil.
//
// 29.07.2026 kam `formular` als fuenfte Familie dazu. Sie beantwortet eine
// Frage, die keine der anderen vier stellt: fuellt sich dieses Formular auf
// einem Telefon ueberhaupt ausfuellen? Fehlt der Pruefer, ist das ungeprueft —
// und auf einer Landingpage ist das Formular die einzige Conversion.
const QUALITAET = ['lighthouse', 'axe', 'ai-slop', 'craft', 'formular'];
const fehltGanz = QUALITAET.filter((q) =>
  !results.some((r) => r.name.startsWith(q) && !r.skipped));
if (fehltGanz.length) {
  console.log(`\nG1 KANN NICHT URTEILEN — kein einziger Lauf in: ${fehltGanz.join(', ')}.`);
  console.log('Uebersprungen ist nicht bestanden. Werkzeug nachinstallieren bzw. --src setzen, dann erneut.');
  process.exit(2);
}
// Letzte Huerde: gruen fuer EINIGE Seiten ist kein gruen fuer die Website.
//
// Die erste Fassung fragte nur, ob --routes ueberhaupt gesetzt ist. Wer 2 von 28
// Seiten nannte, bekam Gruen fuers Ganze — dieselbe Luecke, nur eine Ebene tiefer.
// Es zaehlt nicht, ob Routen genannt wurden, sondern ob ALLE genannt wurden.
const SRC = get('src', null);
if (SRC) {
  const geprueft = new Set(ROUTES.map((r) => r.replace(/\/$/, '') || '/'));
  const ungesehen = seitenImBuild(SRC)
    .filter((schreibweisen) => !schreibweisen.some((s) => geprueft.has(s.replace(/\/$/, '') || '/')))
    .map(([erste]) => erste);
  if (ungesehen.length) {
    const zeigen = ungesehen.slice(0, 12).join(', ');
    console.log(`\nG1 KANN NICHT URTEILEN — ${ungesehen.length} Seite(n) im Build wurden nie geoeffnet.`);
    console.log(`Ungesehen: ${zeigen}${ungesehen.length > 12 ? ` … (+${ungesehen.length - 12})` : ''}`);
    console.log('Ungesehen ist nicht bestanden. Alle Routen mit --routes benennen');
    console.log('(vollstaendige Liste: node scripts/pruefstand.mjs --dir <build> --routen).');
    process.exit(2);
  }
}

// Ein Gruen mit gelockertem Budget ist ein Gruen unter Vorbehalt. Es muss in der
// Schlusszeile stehen, sonst liest der Naechste es als volles Bestehen.
if (BUDGET_GELOCKERT.length) {
  console.log(`\nG1 BESTANDEN MIT GELOCKERTEM BUDGET — ${results.length - skipped.length} Check(s) gruen.`);
  console.log(`Gelockert: ${BUDGET_GELOCKERT.join(' | ')} (Datei: ${budgetFile})`);
} else {
  console.log(`\nG1 BESTANDEN — ${results.length - skipped.length} Check(s) gruen.`);
}
