#!/usr/bin/env node
/**
 * run-detect-check.mjs — findet der Detektor, was er zu finden behauptet?
 *
 * `scripts/detect.mjs` ist im web-SKILL eine harte Ship-Bedingung
 * ("impeccable = Exit 0"). Er kennt 36 Anti-Pattern-Regeln — und hatte bis
 * 30.07.2026 keinen einzigen Test. Der design-Skill hatte gar keinen
 * evals-Ordner.
 *
 * Der Befund, der das ausgeloest hat: eine Seite mit
 *
 *     linear-gradient(90deg, #6366f1, #a855f7)   und   font-family: Inter
 *
 * Der erste ist der Indigo→Violett-Verlauf, das bekannteste AI-Tell ueberhaupt.
 * `detect.mjs` meldete NUR die Schriftart. `scan-ai-slop.mjs` fand auf derselben
 * Datei beides (Tell 01 + Tell 32). Zwei Pruefer, eine Seite, einer blind.
 *
 * Grund: `ai-color-palette` hatte nur Tailwind-Zweige (`from-purple-500`) und
 * keinen fuer rohes CSS. Jede andere Regel dort hat beide (siehe bounce-easing);
 * diese eine war schlicht vergessen. Auf einer handgeschriebenen Landingpage
 * ohne Tailwind war der wichtigste Farb-Detektor damit wirkungslos.
 *
 * Diese Eval prueft pro Regel eine winzige Datei mit genau diesem einen Fehler,
 * plus eine saubere Kontrolldatei, an der NICHTS anschlagen darf. Und sie nennt
 * die Abdeckung ehrlich: wie viele der Regeln haben ueberhaupt einen Testfall?
 *
 *   node evals/run-detect-check.mjs
 *
 * Exit 0 = jede geprueft Regel feuert, die Kontrolle bleibt still.
 * Exit 1 = mindestens eine daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const DETECT = path.join(SKILL, 'scripts', 'detect.mjs');
const REGISTRY = path.join(SKILL, 'scripts', 'detector', 'registry', 'antipatterns.mjs');
if (!fs.existsSync(DETECT)) {
  console.error(`FEHLER: detect.mjs nicht gefunden: ${DETECT}`);
  process.exit(1);
}

// Gemeinsames Geruest, das selbst keine Regel reisst. Wie bei der Craft-Eval:
// ohne vollstaendige Basis testet man den Rahmen mit, nicht die Regel.
const seite = ({ style = '', body = '' }) => `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Sanierung von Wohnungen in Karlsruhe.">
<title>Detect-Eval</title>
<style>
:root{--ink:#16202b;--mut:#5b6875;--line:#e2e6ea}
*{box-sizing:border-box;margin:0}
body{font-family:Georgia,'Times New Roman',serif;color:var(--ink);line-height:1.6;padding:24px}
h1,h2,h3{font-family:-apple-system,'Segoe UI',sans-serif;letter-spacing:-.02em;text-wrap:balance}
a:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
${style}
</style></head><body>
<h1>Sanierung in Karlsruhe</h1>
<p>Wir sanieren Wohnungen. Nach dem Ortstermin bekommen Sie einen Festpreis.</p>
${body}
</body></html>`;

const FAELLE = {
  'ai-color-palette': {
    was: 'Indigo→Violett-Verlauf in rohem CSS (der Befund)',
    style: '.v{background:linear-gradient(90deg,#6366f1,#a855f7)}',
    body: '<div class="v">Verlauf</div>',
  },
  'ai-color-palette-tw': {
    ist: 'ai-color-palette',
    was: 'derselbe Verlauf als Tailwind-Klassen',
    body: '<div class="bg-gradient-to-r from-purple-500 to-pink-500">Verlauf</div>',
  },
  'overused-font': {
    was: 'Inter als Schriftart',
    style: 'h1{font-family:Inter,sans-serif}',
  },
  'gradient-text': {
    was: 'Verlauf in der Headline (bg-clip-text)',
    body: '<h2 class="bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Titel</h2>',
  },
  'em-dash-overuse': {
    was: 'sechs Em-Dashes im Fliesstext (Schwelle 5)',
    body: '<p>Eins — zwei — drei — vier — fuenf — sechs — sieben.</p>',
  },
  'marketing-buzzword': {
    was: 'SaaS-Floskeln aus der Buzzword-Liste',
    body: '<p>Industry-leading, enterprise-grade, world-class: transform your business.</p>',
  },
  'numbered-section-markers': {
    was: '01/02/03 als Abschnitts-Nummern',
    body: '<section><span>01</span><h2>Ortstermin</h2></section>'
      + '<section><span>02</span><h2>Festpreis</h2></section>'
      + '<section><span>03</span><h2>Uebergabe</h2></section>',
  },
  'bounce-easing': {
    was: 'Bounce-Animation',
    style: '@keyframes b{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}'
      + '.b{animation:bounce 1s infinite}',
    body: '<div class="b">Hüpft</div>',
  },
};

function lauf(html) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-eval-'));
  try {
    const datei = path.join(ordner, 'index.html');
    fs.writeFileSync(datei, html);
    let roh = '';
    try {
      roh = execFileSync('node', [DETECT, datei, '--json'], { encoding: 'utf8', timeout: 120000 });
    } catch (e) {
      // Exit 2 = Funde. Das JSON steht trotzdem auf stdout.
      roh = String(e.stdout || '');
      if (!roh) return { kaputt: String(e.stderr || e.message).split('\n')[0], ids: [] };
    }
    try {
      return { ids: JSON.parse(roh).map((x) => x.antipattern) };
    } catch {
      return { kaputt: 'Ausgabe unlesbar', ids: [] };
    }
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nDetect-Check — findet der Detektor, was er zu finden behauptet?\n');

// --- 1. Kontrolle zuerst -------------------------------------------------
// Meldet die schon, sagt kein weiterer Fall etwas aus.
console.log('Kontrolle: eine saubere Seite darf nichts melden.\n');
const k = lauf(seite({}));
if (k.kaputt) {
  console.error(`\nFEHLER: detect.mjs laeuft nicht (${k.kaputt}). Das ist kein Befund ueber die Regeln.`);
  process.exit(2);
}
zeile(k.ids.length === 0, 'saubere Seite, 0 Anti-Patterns',
  k.ids.length ? `meldet: ${k.ids.join(', ')}` : null);

// --- 2. Jede Regel einzeln ------------------------------------------------
console.log('\nJede Regel einzeln — die eigene ID MUSS im Bericht stehen:\n');
for (const [schluessel, f] of Object.entries(FAELLE)) {
  const id = f.ist || schluessel;
  const r = lauf(seite(f));
  if (r.kaputt) { zeile(false, `${id}  ${f.was}`, `Detektor kaputt: ${r.kaputt}`); continue; }
  zeile(r.ids.includes(id), `${id}  ${f.was}`,
    r.ids.includes(id) ? null : `${id} fehlt. Gemeldet: ${r.ids.join(', ') || '(nichts)'}`);
}

// --- 3. Ehrliche Abdeckung ------------------------------------------------
// Ohne diese Zahl sieht "6/6 gruen" nach voller Abdeckung aus — und das waere
// dieselbe stille Luecke, die der Craft-Pruefer hatte (28 Regeln, 10 belegt).
const registry = fs.existsSync(REGISTRY) ? fs.readFileSync(REGISTRY, 'utf8') : '';
const alleIds = [...new Set([...registry.matchAll(/^\s*id: '([a-z0-9-]+)'/gm)].map((m) => m[1]))];
const belegt = new Set(Object.entries(FAELLE).map(([k, f]) => f.ist || k));
const offen = alleIds.filter((x) => !belegt.has(x));

console.log('\nAbdeckung:\n');
console.log(`  ${alleIds.length} Regeln in der Registry`);
console.log(`  ${alleIds.filter((x) => belegt.has(x)).length} hier belegt`);
console.log(`  ${offen.length} ohne Fixture:`);
for (let i = 0; i < offen.length; i += 6) console.log(`     ${offen.slice(i, i + 6).join(', ')}`);
// Ein Teil der Registry ist ueber `detect.mjs <datei>` grundsaetzlich nicht
// erreichbar: diese Regeln stehen in `rules/checks.mjs` und brauchen ein
// gerendertes DOM (getComputedStyle, Elementgroessen). Das ist Bauart, keine
// Luecke — nachgemessen 30.07.2026 an tiny-text, all-caps-body und
// justified-text: alle drei liegen dort, keine feuert im Datei-Modus. Wer sie
// pruefen will, braucht den Browser-Pfad, und dort deckt sie craft-check ab.
const NUR_IM_BROWSER = (() => {
  const checks = path.join(SKILL, 'scripts', 'detector', 'rules', 'checks.mjs');
  if (!fs.existsSync(checks)) return new Set();
  const txt = fs.readFileSync(checks, 'utf8');
  return new Set([...txt.matchAll(/id: '([a-z0-9-]+)'/g)].map((m) => m[1]));
})();
const offenRegex = offen.filter((x) => !NUR_IM_BROWSER.has(x));
console.log(`  davon ${offen.length - offenRegex.length} nur ueber den Browser-Pfad erreichbar (rules/checks.mjs — braucht gerendertes DOM)`);
console.log(`  ${offenRegex.length} im Datei-Modus herstellbar und noch ohne Fixture`);

console.log('\n  Eine Regel ohne Fixture ist keine falsche Regel — nur eine, von der');
console.log('  niemand weiss, ob sie feuert. Die Liste steht hier, damit sie nicht');
console.log('  unsichtbar bleibt.');

const gesamt = 1 + Object.keys(FAELLE).length;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Detektor urteilt nicht wie behauptet — und er ist eine harte Ship-Bedingung.');
  process.exit(1);
}
console.log('Jede hier gepruefte Regel feuert, die saubere Seite bleibt still.');
