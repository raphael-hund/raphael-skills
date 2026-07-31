#!/usr/bin/env node
// axe-run.mjs — axe-core ueber Playwright statt ueber @axe-core/cli.
//
// Grund: @axe-core/cli braucht chromedriver, und der ist auf dieser Maschine
// eine Version voraus (chromedriver 151 vs Chrome 150) — der CLI-Weg stirbt
// mit "session not created". Playwright bringt seinen eigenen, passenden
// Browser mit und laeuft hier nachweislich.
//
//   node axe-run.mjs --url http://localhost:5280/ [--json]
//
// Exit 0 = keine Violations. Exit 1 = Violations gefunden. Exit 2 = Lauf kaputt.

import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const args = process.argv.slice(2);

// Ein unbekanntes Flag ist ein Aufruffehler und muss SO heissen. Bis zum
// 31.07.2026 druckte dieses Skript darauf nur seine Aufrufzeile — die Meldung
// las sich wie "Argument fehlt", und wer sich vertippt hat, sucht am falschen
// Ende. Exit 2 war schon richtig, der Text nicht.
const FLAG_ERLAUBT = ['url', 'json', 'help'];
{
  const fremd = args.filter((a) => a.startsWith('--') && !FLAG_ERLAUBT.includes(a.slice(2)));
  if (fremd.length) {
    console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
    console.error(`Erlaubt: ${FLAG_ERLAUBT.map((k) => `--${k}`).join(' ')}`);
    process.exit(2);
  }
}
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const URL_ = get('url', null);
const AS_JSON = args.includes('--json');
// wcag2a/wcag2aa/wcag21aa = der Umfang, den axe-cli und pa11y als Standard fahren.
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];

// `--help` lief bis zum 31.07.2026 in denselben Zweig wie ein VERGESSENES
// --url: richtige Zeile, aber auf stderr und mit Exit 2. Exit 2 heisst in
// diesem Skill 'Werkzeug kaputt' — wer Hilfe anfordert, hat nichts falsch
// gemacht und soll Exit 0 auf stdout bekommen.
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('usage: axe-run.mjs --url <url> [--json]');
  console.log('Prueft eine laufende Seite mit axe-core auf Barrierefreiheit.');
  console.log('Exit 0 = sauber, 1 = Befund, 2 = Werkzeug/Umgebung kaputt.');
  process.exit(0);
}
if (!URL_) { console.error('usage: axe-run.mjs --url <url> [--json]'); process.exit(2); }

// axe.min.js liegt nur als transitive Dependency vor — erste vorhandene nehmen.
const CANDIDATES = [
  '/usr/lib/node_modules/@axe-core/cli/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/pa11y-ci/node_modules/axe-core/axe.min.js',
  '/usr/lib/node_modules/lighthouse/node_modules/axe-core/axe.min.js',
];
const axePath = CANDIDATES.find((p) => fs.existsSync(p));
if (!axePath) { console.error('axe-core nicht gefunden'); process.exit(2); }

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
let code = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto(URL_, { waitUntil: 'networkidle', timeout: 45000 });
  // NICHT hier beenden: `process.exit()` im try-Block ueberspringt das
  // finally, in dem browser.close() steht. Der Browser blieb offen und
  // hinterliess sein Profil unter /tmp. Gemessen 31.07.2026 gegen einen
  // toten Server: reproduzierbar +1 Profilordner pro Lauf.
  // Werfen statt beenden — der catch unten macht daraus Exit 2, und das
  // finally raeumt vorher auf.
  if (!res || !res.ok()) {
    throw new Error(`Navigation fehlgeschlagen: ${URL_} -> ${res ? res.status() : 'kein Response'}`);
  }

  // Eine Antwort kann HTTP 200 melden und trotzdem unvollstaendig sein: der
  // Server verspricht per Content-Length mehr, als er dann sendet, und schliesst
  // die Verbindung mittendrin. Playwright meldet dafuer weiter res.ok() === true,
  // und Chrome ergaenzt die fehlenden Tags selbst — im DOM sieht die halbe Seite
  // aus wie eine ganze.
  //
  // Gemessen 31.07.2026 gegen einen Server, der 5000 Bytes ankuendigt und nach 44
  // abbricht: craft-check meldete drei BLOCK-Befunde, formular-check "kein
  // Formular auf dieser Seite". Beides sind Urteile ueber Text, der nie ankam —
  // und "kein Formular" ist die gefaehrlichere Haelfte, weil sie gruen ist.
  //
  // res.body() ist der verlaessliche Nachweis: bei abgebrochener Uebertragung
  // wirft es, bei vollstaendiger liefert es genau Content-Length viele Bytes.
  try {
    const roh = await res.body();
    const versprochen = Number(res.headers()['content-length'] || 0);
    if (versprochen && roh.length < versprochen) {
      throw new Error(`Antwort unvollstaendig: ${roh.length} von ${versprochen} Bytes empfangen`);
    }
  } catch (e) {
    if (/unvollstaendig/.test(e.message)) throw e;
    throw new Error(`Antwort nicht lesbar (Uebertragung abgebrochen?): ${e.message.split('\n')[0]}`);
  }

  await page.waitForTimeout(800);

  await page.addScriptTag({ path: axePath });

  // Ein unbekannter Tag laesst axe NICHT fehlschlagen — die Regeln dieses Tags
  // fallen einfach weg. Gemessen 29.07.2026: mit `wcag2a` liefen 89 Regeln, mit
  // `wcag2a-Tippfehler` statt `wcag2a` nur noch 32 — Exit trotzdem 0, Ausgabe
  // "0 Violations". Die halbe a11y-Pruefung war still weg.
  //
  // axe validiert die Liste nur auf Leere ("must be a non-empty array"), nicht
  // auf Existenz der Namen. Also jeden Tag einzeln gegen axe.getRules halten:
  // ein Tag, den keine Regel traegt, ist ein Tippfehler.
  const unbekannt = await page.evaluate(
    (tags) => tags.filter((t) => window.axe.getRules([t]).length === 0), TAGS);
  if (unbekannt.length) {
    console.error(`axe kennt diese Tags nicht: ${unbekannt.join(', ')} — ihre Regeln liefen NICHT.`
      + ' Ein Ergebnis mit 0 Violations waere hier wertlos.');
    process.exit(2);
  }

  const result = await page.evaluate(
    async (tags) => await window.axe.run(document, { runOnly: { type: 'tag', values: tags } }), TAGS);

  // Zweite, unabhaengige Absicherung: eine HTML-Seite hat immer Regeln, die
  // zutreffen oder nicht zutreffen. Sind alle vier Toepfe leer, lief gar nichts
  // (defektes axe-core, leerer DOM) — auch das ist kein bestandener Lauf.
  const violations = result.violations || [];
  const regeln = violations.length + (result.passes || []).length
    + (result.incomplete || []).length + (result.inapplicable || []).length;
  if (regeln === 0) {
    console.error('axe hat keine einzige Regel ausgefuehrt — 0 Violations bedeutet hier NICHT barrierefrei.');
    process.exit(2);
  }

  if (AS_JSON) {
    console.log(JSON.stringify({ url: URL_, violations, passes: (result.passes || []).length, regeln }, null, 2));
  } else {
    console.log(`${URL_}: ${violations.length} Violation(s), ${(result.passes || []).length} Passes, ${regeln} Regeln gelaufen`);
    for (const v of violations) {
      console.log(`  [${v.impact || '?'}] ${v.id} — ${v.help} (${v.nodes.length}x)`);
      for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(' ')}`);
    }
  }
  // NICHT hier beenden. `process.exit()` im try-Block ueberspringt das finally:
  // der Browser blieb offen und hinterliess bei JEDEM Lauf ein Profil unter
  // /tmp/com.google.Chrome.XXXXXX. Gemessen 31.07.2026: 2823 solcher Ordner auf
  // dem Rechner, Zuwachs exakt +1 pro axe-run-Lauf; craft-check, formular-check
  // und shot-sweep hinterliessen nichts — die beenden erst nach dem finally.
  //
  // Der Platz war nie das Problem (12 MB gesamt), die ANZAHL ist es: 2833
  // Eintraege in /tmp verlangsamen jedes readdir, und die eigene
  // g1-gate-Aufraeumung liest dieses Verzeichnis bei jedem Lauf.
  code = violations.length ? 1 : 0;
} catch (e) {
  console.error(`axe-Lauf kaputt: ${e.message}`);
  code = 2;
} finally {
  await browser.close();
}
process.exit(code);
