#!/usr/bin/env node
// run-axe-check.mjs — prueft, ob der Barrierefreiheits-Pruefer ueberhaupt
// geprueft hat.
//
// Befund 29.07.2026: `window.axe.run(document, {runOnly:{type:'tag',values:[...]}})`
// wirft bei einem UNBEKANNTEN Tag keinen Fehler. Es laeuft dann schlicht keine
// einzige Regel — und meldet 0 Violations. Am Beispiel gemessen, auf einer Seite
// mit vier echten Fehlern (Bild ohne alt, Link ohne Namen):
//
//   values: ['wcag2a']            -> 4 Violations, 2 Passes, 50 inapplicable
//   values: ['wcag2a-Tippfehler'] -> 0 Violations, 0 Passes, 0 inapplicable
//
// Der zweite Lauf beendete sich mit Exit 0. Ein Tippfehler in einer Zeile haette
// die komplette a11y-Pruefung stillgelegt, ohne dass irgendetwas rot wird —
// dieselbe Klasse wie linkinator --silent und der leere --src beim Slop-Scan.
//
// Dieser Lauf braucht einen Browser (axe lebt im DOM), aber keinen Server:
// die Seiten kommen per setContent.
//
//   node evals/run-axe-check.mjs
//
// Exit 0 = alle Faelle wie erwartet. Exit 1 = mindestens einer nicht.

import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const CANDIDATES = [
  '/usr/lib/node_modules/@axe-core/cli/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/pa11y-ci/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/lighthouse/node_modules/axe-core/axe.min.js',
];
const axePath = CANDIDATES.find((p) => fs.existsSync(p));
if (!axePath) { console.error('axe-core nicht gefunden — Lauf nicht moeglich'); process.exit(2); }

// Dieselbe Tag-Liste, die axe-run.mjs fest verdrahtet hat. Weicht sie ab, ist
// dieser Lauf wertlos — darum wird sie unten gegen die Quelle abgeglichen.
const ECHTE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

const KAPUTT = '<html lang="de"><body><img src="x.png"><a href="#"></a></body></html>';
const SAUBER = '<html lang="de"><head><title>Test</title></head><body><main><h1>Titel</h1>'
  + '<p style="color:#111;background:#fff">Text mit ausreichendem Kontrast.</p></main></body></html>';

const FAELLE = [
  { was: 'echte Tags auf kaputter Seite -> Fehler gefunden',
    html: KAPUTT, tags: ECHTE_TAGS, erwartet: (r) => r.violations > 0 && r.regeln > 0 },
  { was: 'echte Tags auf sauberer Seite -> Regeln liefen, keine Fehler',
    html: SAUBER, tags: ECHTE_TAGS, erwartet: (r) => r.violations === 0 && r.regeln > 0 },
  { was: 'Tippfehler im Tag -> KEINE Regel gelaufen (muss auffallen)',
    html: KAPUTT, tags: ['wcag2a-Tippfehler'], erwartet: (r) => r.regeln === 0 },
  { was: 'erfundener Tag -> KEINE Regel gelaufen (muss auffallen)',
    html: KAPUTT, tags: ['gibtesnicht'], erwartet: (r) => r.regeln === 0 },
  // Gegenprobe zur Abgrenzung: axe PRUEFT die Tag-Liste auf Leere und wirft
  // dann ("runOnly.values must be a non-empty array"). Es prueft aber NICHT,
  // ob die Namen darin existieren. Genau diese halbe Validierung ist die Falle:
  // wer den lauten Fall sieht, haelt den stillen faelschlich fuer abgedeckt.
  { was: 'leere Tag-Liste -> axe wirft (lauter Fall, schon abgedeckt)',
    html: KAPUTT, tags: [], erwartet: (r) => r.fehler === true },
  // Der eigentlich gefaehrliche Fall, und der Grund, warum die blosse
  // Regel-Zaehlung nicht reicht: EIN falscher Tag von fuenf. Die anderen vier
  // laufen weiter, es kommt ein plausibles Ergebnis heraus (gemessen: 32 statt
  // 89 Regeln, Exit 0, "0 Violations"). Nur der Namensabgleich faengt das.
  { was: 'EIN Tippfehler von fuenf -> weniger Regeln, aber nicht null',
    html: SAUBER, tags: ['wcag2a-Tippfehler', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    erwartet: (r) => r.regeln > 0 && r.unbekannt === 1 },
  { was: 'alle Tags echt -> kein unbekannter Name',
    html: SAUBER, tags: ECHTE_TAGS, erwartet: (r) => r.unbekannt === 0 },
];

// Gegenprobe an der Quelle: haben sich die Tags in axe-run.mjs geaendert, prueft
// dieser Lauf etwas anderes als das Werkzeug. Dann lieber laut abbrechen.
const quelle = fs.readFileSync(new URL('../scripts/axe-run.mjs', import.meta.url), 'utf8');
for (const t of ECHTE_TAGS) {
  if (!quelle.includes(`'${t}'`)) {
    console.error(`FEHLER: axe-run.mjs kennt den Tag "${t}" nicht mehr — Testliste veraltet.`);
    process.exit(2);
  }
}
// Und beide Schutzschichten muessen noch da sein.
for (const [muster, was] of [['keine einzige Regel', 'Regel-Zaehlung'], ['getRules', 'Tag-Namensabgleich']]) {
  if (!quelle.includes(muster)) {
    console.error(`FEHLER: ${was} fehlt in axe-run.mjs — der Schutz ist weg.`);
    process.exit(2);
  }
}

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
let rot = 0;
try {
  const page = await browser.newPage();
  for (const f of FAELLE) {
    await page.setContent(f.html);
    await page.addScriptTag({ path: axePath });
    const r = await page.evaluate(async (tags) => {
      // Derselbe Namensabgleich, den axe-run.mjs vor dem Lauf macht.
      const unbekannt = tags.filter((t) => window.axe.getRules([t]).length === 0).length;
      try {
        const res = await window.axe.run(document, { runOnly: { type: 'tag', values: tags } });
        return {
          fehler: false, unbekannt,
          violations: res.violations.length,
          regeln: res.violations.length + res.passes.length + res.incomplete.length + res.inapplicable.length,
        };
      } catch (e) {
        return { fehler: true, unbekannt, meldung: String(e.message || e), violations: -1, regeln: -1 };
      }
    }, f.tags);
    const ok = f.erwartet(r);
    if (!ok) rot++;
    console.log(`${ok ? 'OK  ' : 'ROT '} ${f.was}`);
    console.log(r.fehler ? `       axe warf: ${r.meldung}`
      : `       violations=${r.violations} regeln=${r.regeln} unbekannte Tags=${r.unbekannt}`);
  }
} finally {
  await browser.close();
}

// --- Der Exit-Code von axe-run.mjs -------------------------------------
// Bis hierher prueft diese Eval, ob axe UEBERHAUPT Regeln laufen laesst. Was sie
// nicht prueft: ob axe-run.mjs seine Funde auch als Exit-Code weitergibt. Befund
// 30.07.2026 durch den Sabotage-Lauf — `process.exit(violations.length ? 1 : 0)`
// zu `process.exit(0)` geaendert, und keine Eval merkte es. Damit meldet das Tor
// "axe bestanden" fuer jede Seite: der A11y-Pruefer waere tot, ohne dass etwas
// fehlt.
//
// Geprueft am echten Lauf gegen eine Seite mit garantierten Verstoessen (Bild
// ohne alt, Link ohne Namen, kein lang-Attribut).
console.log('');
{
  const { execFileSync } = await import('node:child_process');
  const fsN = await import('node:fs');
  const osN = await import('node:os');
  const pathN = await import('node:path');
  const AXE = pathN.join(pathN.dirname(new URL(import.meta.url).pathname), '..', 'scripts', 'axe-run.mjs');
  const ordner = fsN.mkdtempSync(pathN.join(osN.tmpdir(), 'axe-exit-'));
  const kaputt = pathN.join(ordner, 'kaputt.html');
  fsN.writeFileSync(kaputt,
    '<!doctype html><html><head><meta charset="utf-8"><title>t</title></head><body>'
    + '<img src="data:,x"><a href="#"></a></body></html>');
  let code = 0;
  try {
    execFileSync('node', [AXE, '--url', `file://${kaputt}`], { encoding: 'utf8', timeout: 180000 });
  } catch (e) { code = e.status ?? 1; }
  fsN.rmSync(ordner, { recursive: true, force: true });
  const ok = code === 1;
  if (!ok) rot++;
  console.log(`${ok ? 'OK  ' : 'ROT '} axe-run.mjs endet mit Exit 1 bei echten Violations`);
  if (!ok) console.log(`       bekam Exit ${code} — Funde erreichen das Tor nicht`);
}

console.log(`\n${FAELLE.length + 1 - rot}/${FAELLE.length + 1} Faelle wie erwartet.`);
if (rot) {
  console.log('Der a11y-Pruefer kann still nichts pruefen. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
console.log('Eine 0 aus axe bedeutet jetzt "geprueft und sauber", nicht "gar nicht gelaufen".');
