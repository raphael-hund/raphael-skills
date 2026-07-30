#!/usr/bin/env node
/**
 * run-browser-detect-check.mjs — feuern die Regeln, die NUR im Browser laufen?
 *
 * Befund 30.07.2026, zwei Teile.
 *
 * ERSTENS: 24 der 46 Detektor-Regeln sind ueber `detect.mjs <datei>`
 * grundsaetzlich nicht erreichbar — sie messen gerenderte Groessen, berechnete
 * Farben, Zeilenlaengen. Im SKILL stand dazu "dort deckt craft-check sie ab".
 * Nachgezaehlt war das falsch: 11 haben ein craft-Pendant, 2 deckt axe, rund 24
 * bleiben. Diese 24 hatte nie etwas geprueft.
 *
 * ZWEITENS: der offizielle Browser-Pfad (`detect.mjs http://...`) laeuft auf
 * diesem Rechner gar nicht. Er verlangt puppeteer:
 *
 *   $ node scripts/detect.mjs http://localhost:5392/
 *   Error: puppeteer is required for URL scanning. Install: npm install puppeteer
 *
 * Installiert ist playwright — der ganze Rest des Skills benutzt das.
 * `page.setViewport` (Puppeteer) gegen `setViewportSize` (Playwright) ist der
 * Unterschied; ein Austausch waere ein Umbau am vendorten Detektor.
 *
 * Der injizierte Detektor selbst ist browserneutral: er haengt an
 * `window.impeccableScan()` und weiss nichts von seinem Wirt. Diese Eval laedt
 * ihn deshalb per Playwright direkt in die Seite. Damit sind die 24 Regeln zum
 * ersten Mal pruefbar — und der Umweg ist dokumentiert, statt dass jemand
 * spaeter denselben Sackgassen-Weg nochmal geht.
 *
 * Braucht Playwright und einen freien Port (kein Netz).
 *
 *   node evals/run-browser-detect-check.mjs
 *
 * Exit 0 = jede geprueft Regel feuert, die saubere Seite bleibt still.
 * Exit 1 = mindestens eine daneben. Exit 2 = Browser fehlt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const BROWSER_JS = path.join(SKILL, 'scripts', 'detector', 'detect-antipatterns-browser.js');
const CHECKS = path.join(SKILL, 'scripts', 'detector', 'rules', 'checks.mjs');
if (!fs.existsSync(BROWSER_JS)) {
  console.error(`FEHLER: detect-antipatterns-browser.js nicht gefunden: ${BROWSER_JS}`);
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('/usr/lib/node_modules/playwright/index.mjs'));
} catch (e) {
  console.error(`FEHLER: Playwright nicht ladbar (${e.message}). Das ist kein Befund ueber die Regeln.`);
  process.exit(2);
}

const PORT = Number(process.env.BROWSER_EVAL_PORT || 5396);

// Gemeinsames Geruest, das selbst keine Regel reisst — dieselbe Disziplin wie in
// der Datei-Eval: ohne vollstaendige Basis testet man den Rahmen mit.
const seite = ({ style = '', body = '' }) => `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Sanierung von Wohnungen in Karlsruhe.">
<title>Browser-Eval</title>
<style>
:root{--ink:#16202b;--mut:#5b6875;--line:#e2e6ea}
*{box-sizing:border-box;margin:0}
body{font-family:Georgia,'Times New Roman',serif;color:var(--ink);line-height:1.6;padding:32px;background:#fff}
h1{font-family:-apple-system,'Segoe UI',sans-serif;font-size:44px;letter-spacing:-.02em;text-wrap:balance}
p{max-width:60ch;font-size:17px}
${style}
</style></head><body>
<h1>Sanierung in Karlsruhe</h1>
<p>Wir sanieren Wohnungen und Haeuser. Nach dem Ortstermin bekommen Sie einen Festpreis und ein Datum.</p>
${body}
</body></html>`;

// Nur Regeln, die sich mit einer statischen Seite herstellen lassen. Was fehlt,
// steht unten in der Abdeckung — nicht verschwiegen.
const FAELLE = {
  // --- Drei aus der "offen"-Liste, nachgetragen 30.07.2026 ------------------
  // Die Liste fuehrte sie als "braucht mehr als eine statische Seite". Am
  // echten Browser-Pfad nachgemessen stimmte das fuer diese drei nicht — sie
  // brauchen nur die richtige Seite. Eine Regel als unerreichbar zu fuehren,
  // die es nicht ist, ist dieselbe Sorte Fehler wie eine erfundene Luecke:
  // man hoert auf zu suchen.
  'ai-color-palette': {
    was: 'Indigo-Violett-Verlauf, im gerenderten DOM gemessen',
    style: '.v{background:linear-gradient(90deg,#6366f1,#a855f7);padding:40px;color:#fff}',
    body: '<div class="v">Verlauf</div>',
    // Der Verlauf auf Weiss reisst zusaetzlich den Kontrast — sachlich richtig.
    mit: ['low-contrast'],
  },
  'overused-font': {
    was: 'Inter als Hauptschrift ueber 15% der Textelemente',
    // Die Regel greift erst ab 20 Textelementen (Absicht: auf einer
    // Drei-Zeilen-Seite ist "Hauptschrift" keine Aussage). Erster Versuch hatte
    // drei und meldete nichts — das Fixture war zu klein, nicht die Regel stumm.
    style: 'body{font-family:Inter,sans-serif}',
    body: Array.from({ length: 24 },
      (_, i) => `<p>Absatz ${i + 1} mit genug Text zum Messen.</p>`).join(''),
    mit: ['single-font'],
  },
  'single-font': {
    was: 'nur eine einzige Schrift auf der ganzen Seite',
    style: 'body{font-family:Inter,sans-serif}',
    body: Array.from({ length: 24 },
      (_, i) => `<p>Absatz ${i + 1} mit genug Text zum Messen.</p>`).join(''),
    mit: ['overused-font'],
  },
  // --- Drei weitere aus der "offen"-Liste, 30.07.2026 -----------------------
  // Auch diese standen als "braucht mehr als eine statische Seite". Am echten
  // Browser-Pfad nachgemessen: alle drei brauchen nur die richtige Seite.
  // Damit ist die Liste zum zweiten Mal in derselben Runde zu lang gewesen —
  // eine Regel als unerreichbar zu fuehren, die es nicht ist, kostet genauso
  // viel wie eine erfundene Luecke: man hoert auf zu suchen.
  'hero-eyebrow-chip': {
    was: 'getracktes Uppercase-Label ueber der H1',
    // Verlangt ausdruecklich eine H1 — erster Versuch nutzte h2 und meldete
    // nichts. Das Fixture war falsch, nicht die Regel stumm.
    style: '.eyebrow{text-transform:uppercase;font-size:12px;letter-spacing:.14em;'
      + 'color:#5b6875;margin:0}h1{font-size:48px;margin:4px 0 24px}',
    body: '<p class="eyebrow">Sanierung</p><h1>Wohnungen in Karlsruhe</h1>'
      + '<p>Nach dem Ortstermin bekommen Sie einen Festpreis.</p>',
  },
  'repeated-section-kickers': {
    was: 'drei Uppercase-Kicker ueber drei Ueberschriften',
    style: '.kicker{text-transform:uppercase;font-size:12px;letter-spacing:.14em;'
      + 'color:#5b6875}h2{font-size:32px;margin:4px 0 24px}',
    body: '<p class="kicker">Leistung</p><h2>Bad sanieren</h2>'
      + '<p class="kicker">Leistung</p><h2>Kueche bauen</h2>'
      + '<p class="kicker">Leistung</p><h2>Wohnung raeumen</h2>',
  },
  'clipped-overflow-container': {
    was: 'overflow:hidden schneidet ein absolut positioniertes Kind ab',
    style: '.clip{overflow:hidden;position:relative;height:80px;background:#eee;margin:16px 0}'
      + '.raus{position:absolute;top:-40px;left:10px;width:120px;height:120px;background:#c33}',
    body: '<div class="clip"><div class="raus"></div></div>',
  },
  'tiny-text': {
    was: 'Fliesstext unter der Lesbarkeitsgrenze',
    style: '.klein{font-size:9px;max-width:none}',
    body: '<p class="klein">Viel zu kleiner Fliesstext auf einer echten Seite hier.</p>',
  },
  'all-caps-body': {
    was: 'Fliesstext komplett in Grossbuchstaben',
    style: '.schrei{text-transform:uppercase}',
    body: '<p class="schrei">Dieser Absatz steht komplett in Grossbuchstaben und liest sich deutlich schlechter als normaler Satz.</p>',
  },
  'justified-text': {
    was: 'Blocksatz ohne Silbentrennung',
    style: 'p.block{text-align:justify}',
    body: '<p class="block">Blocksatz erzeugt im Browser Loecher, weil die Silbentrennung fehlt und Woerter gestreckt werden muessen.</p>',
  },
  'line-length': {
    was: 'Fliesstext ueber der Satzspiegel-Grenze',
    style: 'p.breit{max-width:none;width:1500px}',
    body: '<p class="breit">' + 'Wir sanieren Wohnungen und Haeuser in Karlsruhe und Umgebung. '.repeat(4) + '</p>',
  },
  'nested-cards': {
    was: 'Karte in Karte',
    // `isCardLikeDOM` liest den Rahmen NUR aus der Klasse (`/\bborder\b/`),
    // nicht aus dem berechneten Stil — Schatten dagegen aus beidem. Ein Kasten
    // mit `border:1px` per CSS und ohne Klasse gilt dort also nicht als Karte.
    // Erster Versuch setzte den Rahmen per CSS und den Schatten nur aussen;
    // damit war der innere Kasten keine Karte und die Regel schwieg zu Recht.
    // Beide brauchen einen Schatten.
    style: '.a{box-shadow:0 1px 3px rgba(0,0,0,.08);border-radius:16px;padding:20px;background:#fff}'
      + '.i{box-shadow:0 1px 2px rgba(0,0,0,.06);border-radius:12px;padding:14px;background:#f7f7f8}',
    body: '<div class="a"><h2>Aussen</h2><div class="i"><h3>Innen</h3><p>Text in der inneren Karte.</p></div></div>',
  },
  'wide-tracking': {
    was: 'Laufweite ueber 0.05em im Fliesstext',
    // Schwelle am Code gelesen: letterSpacingPx / fontSize > 0.05.
    // 17px * 0.08em sind 1.36px, also klar drueber.
    style: 'p.weit{letter-spacing:0.08em}',
    body: '<p class="weit">Ein Absatz mit deutlich zu weiter Laufweite liest sich zaeh, weil die Woerter auseinanderfallen.</p>',
  },
  'skipped-heading': {
    was: 'Ueberschriften-Ebene uebersprungen (h1 -> h3)',
    body: '<h3>Direkt zur dritten Ebene</h3><p>Text darunter.</p>',
  },
  'single-font': {
    was: 'nur eine Schriftart auf der ganzen Seite',
    // Zwei Bedingungen, beide am Code gelesen: die Seite braucht mindestens
    // 20 Textelemente (`totalTextElements >= 20`), und danach darf nur EINE
    // Schrift uebrig sein. Erster Versuch zog nur die H1 auf Georgia — drei
    // Elemente, also lief der ganze Block nie an. Nicht die Regel war stumm,
    // sondern die Seite zu klein.
    style: 'h1{font-family:Georgia,serif}',
    body: [...Array(22)].map((_, i) => `<p>Absatz Nummer ${i + 1} mit genug Text darin.</p>`).join(''),
  },
  'cream-palette': {
    was: 'creme-/beigefarbener Seitenhintergrund',
    // isCreamColor: alle Kanaele >= 209, warme Ordnung r>=g>=b, Waerme 6-48.
    // #faf6ef ist 250/246/239 — Waerme 11, passt.
    style: 'body{background:#faf6ef}',
  },
  'oversized-h1': {
    was: 'H1 beherrscht den Viewport',
    // DREI Bedingungen, alle am Code gelesen, nachdem zwei Anlaeufe schiefgingen:
    //   fontSize >= 72px, Textlaenge >= 40 Zeichen, UND die H1 muss >= 28% der
    //   Viewport-Hoehe (oder 25% der Flaeche) einnehmen.
    // Zweiter Versuch hatte 150px und 59% Hoehe — gemessen im Browser — und
    // meldete trotzdem nichts. Der Grund war die Textlaenge: 29 Zeichen bei
    // Mindestens 40. Die Ueberschrift des Geruests ist zu kurz fuer diese Regel,
    // also bringt der Fall seine eigene mit.
    style: 'h1{font-size:150px;line-height:1.05;max-width:14ch}',
    body: '<h1>Sanierung und Komplettumbau von Altbauwohnungen in Karlsruhe</h1>',
  },
  'cramped-padding': {
    was: 'Innenabstand zu klein fuer die Schriftgroesse',
    // vThresh = max(4, fontSize*0.3). Bei 20px sind das 6px; 2px liegt drunter.
    style: '.eng{border:1px solid var(--line);border-radius:8px;padding:2px 4px;font-size:20px;background:#f7f7f8}',
    body: '<div class="eng">Ein Kasten mit viel zu wenig Luft um den Text herum.</div>',
  },
  'gray-on-color': {
    was: 'grauer Text auf farbigem Grund',
    // isGray: Textfarbe ohne Chroma (< 20), Luminanz 0.05-0.85. Der Grund muss
    // Chroma >= 40 haben. #6b7280 auf #1d4ed8 erfuellt beides.
    // Erster Versuch nahm #6b7280 auf #1d4ed8 — das meldete low-contrast statt
    // gray-on-color, weil das Grau auf dem dunklen Blau schlicht unlesbar war.
    // Zwei verschiedene Fehler; die Fixture soll GENAU einen zeigen. Helleres
    // Grau auf demselben Blau erfuellt beides: Chroma < 20, Luminanz im Fenster
    // 0.05-0.85, und der Kontrast reicht.
    style: '.bunt{background:#1d4ed8;padding:20px;border-radius:12px}.bunt p{color:#d4d4d8;max-width:none}',
    body: '<div class="bunt"><p>Grauer Text auf kraeftig blauem Grund liest sich schlecht.</p></div>',
  },
  'extreme-negative-tracking': {
    was: 'Laufweite enger als -0.05em',
    // Bedingungen: direkter Text, > 20 Zeichen, trackingEm <= -0.05.
    // 44px * -0.06em = -2.64px.
    style: 'h2.eng{font-size:44px;letter-spacing:-0.06em}',
    body: '<h2 class="eng">Sanierung mit sehr enger Laufweite hier</h2>',
  },
  'flat-type-hierarchy': {
    was: 'Groessen-Spannweite unter 2:1',
    // Braucht >= 3 verschiedene Groessen und ein Verhaeltnis < 2.0 zwischen
    // groesster und kleinster. 18/22/26 sind Faktor 1.44.
    style: 'h1{font-size:26px}h2{font-size:22px}p{font-size:18px}',
    body: '<h2>Zweite Ebene</h2><p>Ein Absatz Text.</p>',
  },
  'italic-serif-display': {
    was: 'kursive Serif als Display-Ueberschrift',
    // Nur h1 (oder h2 ab 48px), Schrift >= 48px, Serif — und kursiv.
    style: 'h1{font-family:Georgia,serif;font-size:64px;font-style:italic}',
  },
  'text-overflow': {
    was: 'Text laeuft aus dem Kasten (kein Scroll-Bereich)',
    // delta = scrollWidth - clientWidth >= 16, und weder das Element noch ein
    // Vorfahr darf overflow auto/scroll haben.
    style: '.raus{width:120px;overflow:hidden;white-space:nowrap;border:1px solid var(--line);padding:8px}',
    body: '<div class="raus">Ein deutlich zu langer Text fuer diesen schmalen Kasten hier drin</div>',
  },
  'low-contrast': {
    was: 'Text unter der Kontrast-Grenze',
    style: 'p.blass{color:#b8bcc2;max-width:none}',
    body: '<p class="blass">Dieser Text ist auf weissem Grund kaum zu lesen.</p>',
  },
  'side-tab': {
    was: 'dicker Rahmen nur an einer Seite plus Radius',
    // isSide + radius > 0. Ein farbiger Akzentstreifen links an einer
    // abgerundeten Box — das typische "Tab am Rand"-Muster.
    style: '.tab{border-left:4px solid #1d4ed8;border-radius:10px;padding:14px;background:#f7f7f8}',
    body: '<div class="tab">Kasten mit Akzentstreifen links.</div>',
  },
  'border-accent-on-rounded': {
    was: 'Akzentstreifen OBEN an einer abgerundeten Box',
    // Die beiden Regeln sind ein if/else, nicht zwei Sichten auf dasselbe:
    //   links/rechts  -> side-tab
    //   oben/unten    -> border-accent-on-rounded  (radius > 0 und w >= 2)
    // Erster Versuch nahm border-left und erwartete beide Namen. Das war meine
    // Annahme, nicht der Code — am Zweig nachgelesen, dann korrigiert.
    style: '.oben{border-top:4px solid #1d4ed8;border-radius:10px;padding:14px;background:#f7f7f8}',
    body: '<div class="oben">Kasten mit Akzentstreifen oben.</div>',
  },
  'theater-slop-phrase': {
    was: '"X theater" als Marketing-Floskel',
    body: '<p>We are ending the meeting theater in your company for good.</p>',
  },
  'repeating-stripes-gradient': {
    was: 'Streifenmuster als Flaechendekoration',
    style: '.streifen{background:repeating-linear-gradient(45deg,#f0f0f2 0 10px,#fff 10px 20px);height:120px;border-radius:8px}',
    body: '<div class="streifen"></div>',
  },
  'gpt-thin-border-wide-shadow': {
    was: 'zwei duenne Rahmen plus weicher Schatten',
    // visibleThinBorders.length >= 2 UND Schatten-Blur >= 16px.
    style: '.gpt{border:1px solid #e2e6ea;box-shadow:0 8px 28px rgba(0,0,0,.14);border-radius:12px;padding:18px;background:#fff}'
      + '.gpt2{border:1px solid #e2e6ea;box-shadow:0 8px 28px rgba(0,0,0,.14);border-radius:12px;padding:18px;background:#fff;margin-top:12px}',
    body: '<div class="gpt">Erster Kasten</div><div class="gpt2">Zweiter Kasten</div>',
  },
  'dark-glow': {
    was: 'farbiger Leuchtschatten auf dunklem Grund',
    // Braucht dunklen Hintergrund und einen Schatten mit Blur > 4px in Farbe.
    style: 'body{background:#0b0f14;color:#e6e8ea}'
      + '.leucht{box-shadow:0 0 32px rgba(99,102,241,.55);border-radius:12px;padding:18px;background:#141a22}',
    body: '<div class="leucht">Leuchtender Kasten</div>',
  },
  'ai-color-palette': {
    was: 'violette Ueberschriftenfarbe im DOM',
    // Browser-Zweig: Chroma >= 50 UND Farbton 260-310 UND (h1/h2/h3 oder >= 20px).
    // #7c3aed liegt bei Hue ~270.
    style: 'h1{color:#7c3aed}',
  },
  'gradient-text': {
    was: 'Verlauf in der Headline (background-clip: text)',
    style: 'h1{background:linear-gradient(90deg,#1d4ed8,#0891b2);-webkit-background-clip:text;background-clip:text;color:transparent}',
  },
  'overused-font': {
    was: 'Inter als Hauptschrift auf >= 15% der Textelemente',
    // Zwei Bedingungen: >= 20 Textelemente auf der Seite, und die Schrift muss
    // >= 15% davon tragen. Wie bei single-font laeuft der Block sonst nie an.
    style: 'body{font-family:Inter,sans-serif}',
    body: [...Array(22)].map((_, i) => `<p>Absatz Nummer ${i + 1} mit genug Text darin.</p>`).join(''),
  },
  'monotonous-spacing': {
    was: 'ein Abstandswert dominiert alles',
    // Die Regel liest NICHT das berechnete DOM, sondern greppt den HTML-Text:
    // Tailwind-Klassen (p-4, gap-6 …) und `rem`-Werte in inline-Styles. Ein
    // Stylesheet in px sieht sie nicht — erster Versuch nutzte `.m div{padding:16px}`
    // und die Regel schwieg zu Recht. Ausserdem braucht sie >= 10 Werte, davon
    // > 60% derselbe und <= 3 verschiedene.
    body: '<div class="p-4 gap-4">'
      + [...Array(12)].map((_, i) => `<div class="p-4 mb-4">Block ${i + 1}</div>`).join('')
      + '</div>',
  },
  'codex-grid-background': {
    was: 'Hairline-Raster als Hintergrund',
    // hairlineCount >= 2 — zwei Verlaeufe mit haarfeinen Stops (typisches
    // generiertes Gitter).
    style: '.gitter{background-image:linear-gradient(to right,#eee 1px,transparent 1px),'
      + 'linear-gradient(to bottom,#eee 1px,transparent 1px);background-size:24px 24px;height:160px}',
    body: '<div class="gitter"></div>',
  },
  'body-text-viewport-edge': {
    was: 'Fliesstext klebt am Viewport-Rand',
    // widthRatio > 0.5 und links ODER rechts dicht am Rand, ohne eigenen
    // Hintergrund und nicht in Nav/Header.
    style: 'body{padding:0}p.rand{max-width:none;width:100%;margin:0}',
    body: '<p class="rand">Dieser Absatz laeuft ohne jeden Innenabstand bis an die Fensterkante, was auf keinem Bildschirm gut aussieht.</p>',
  },
  'tight-leading': {
    was: 'Zeilenabstand zu eng fuer Fliesstext',
    style: 'p.eng{line-height:1.05}',
    body: '<p class="eng">Ein Absatz mit sehr engem Zeilenabstand liest sich schlecht, weil die Zeilen ineinanderlaufen und das Auge die naechste Zeile nicht findet.</p>',
  },
};

// --- Mini-Server, damit die Seite eine echte http-URL hat ----------------
// file:// waere einfacher, aber der Detektor misst auch Dinge, die bei
// file:// anders laufen (Fonts, Layout-Timing). Naeher am Ernstfall ist http.
const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'browser-eval-'));
const server = spawn('python3', ['-m', 'http.server', String(PORT)], {
  cwd: ordner, stdio: 'ignore', detached: false,
});
const aufraeumen = () => {
  try { server.kill('SIGKILL'); } catch { /* egal */ }
  fs.rmSync(ordner, { recursive: true, force: true });
};
process.on('exit', aufraeumen);
await new Promise((r) => setTimeout(r, 1500));

const script = fs.readFileSync(BROWSER_JS, 'utf8');
const browser = await chromium.launch();

async function lauf(html) {
  fs.writeFileSync(path.join(ordner, 'index.html'), html);
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.evaluate(script);
    // Das Format ist { el, findings: [{ type, detail }] }. `el` haelt eine echte
    // DOM-Referenz — rekursiv durchlaufen laeuft in einen Zyklus (RangeError,
    // beim ersten Versuch passiert). Also nur die findings lesen.
    return await page.evaluate(() => {
      const res = window.impeccableScan();
      const out = new Set();
      for (const g of (Array.isArray(res) ? res : [])) {
        for (const f of (g.findings || [])) if (f.type) out.add(f.type);
      }
      return [...out];
    });
  } finally {
    await page.close().catch(() => {});
  }
}

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nBrowser-Detektor — feuern die Regeln, die nur im DOM messbar sind?\n');

// --- 1. Kontrolle zuerst -------------------------------------------------
console.log('Kontrolle: eine saubere Seite darf nichts melden.\n');
const k = await lauf(seite({}));
zeile(k.length === 0, 'saubere Seite, 0 Anti-Patterns',
  k.length ? `meldet: ${k.join(', ')}` : null);

// --- 2. Jede Regel einzeln -----------------------------------------------
console.log('\nJede Regel einzeln — die eigene ID MUSS im Bericht stehen:\n');
for (const [id, f] of Object.entries(FAELLE)) {
  const ids = await lauf(seite(f));
  zeile(ids.includes(id), `${id}  ${f.was}`,
    ids.includes(id) ? null : `${id} fehlt. Gemeldet: ${ids.join(', ') || '(nichts)'}`);
}

// --- 3. Der Datei-Modus sieht davon nichts -------------------------------
// Der Grund, warum es diese Eval gibt: dieselbe Seite, zwei Pfade, ein Pfad
// blind. Steht als pruefbare Aussage da, damit es auffaellt, falls jemand die
// Regeln spaeter doch in den Regex-Pfad holt (dann ist diese Eval teilweise
// ueberfluessig — auch das soll man merken).
console.log('\nGegenprobe: derselbe Fehler im Datei-Modus (muss stumm bleiben):\n');
{
  const { execFileSync } = await import('node:child_process');
  const datei = path.join(ordner, 'nur-datei.html');
  fs.writeFileSync(datei, seite(FAELLE['tiny-text']));
  let ids = [];
  try {
    const roh = execFileSync('node', [path.join(SKILL, 'scripts', 'detect.mjs'), datei, '--json'],
      { encoding: 'utf8', timeout: 120000 });
    ids = JSON.parse(roh).map((x) => x.antipattern);
  } catch (e) {
    try { ids = JSON.parse(String(e.stdout || '[]')).map((x) => x.antipattern); } catch { ids = []; }
  }
  zeile(!ids.includes('tiny-text'),
    'detect.mjs <datei> findet tiny-text NICHT — dafuer ist der Browser-Pfad da',
    ids.includes('tiny-text') ? 'findet es jetzt doch — Eval-Zweck pruefen' : null);
}

// --- 4. Ehrliche Abdeckung ------------------------------------------------
const alleBrowser = [...new Set(
  [...fs.readFileSync(CHECKS, 'utf8').matchAll(/id: '([a-z0-9-]+)'/g)].map((m) => m[1]),
)];
const belegt = Object.keys(FAELLE);
const offen = alleBrowser.filter((x) => !belegt.includes(x));
console.log('\nAbdeckung im Browser-Pfad:\n');
console.log(`  ${alleBrowser.length} Regeln in rules/checks.mjs`);
console.log(`  ${belegt.length} hier belegt`);
console.log(`  ${offen.length} ohne Fixture:`);
for (let i = 0; i < offen.length; i += 6) console.log(`     ${offen.slice(i, i + 6).join(', ')}`);
console.log('\n  Viele davon brauchen mehr als eine statische Seite (Hover, Scroll,');
console.log('  dunkles Theme, echte Bilder). Die Liste steht hier, damit die Luecke');
console.log('  sichtbar bleibt statt in einer Prozentzahl zu verschwinden.');

await browser.close();

const gesamt = 1 + Object.keys(FAELLE).length + 1;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der Browser-Detektor urteilt nicht wie behauptet.');
  process.exit(1);
}
console.log('Die Regeln, die kein Datei-Scan sehen kann, sind jetzt belegt.');
// Ohne dieses exit haengt der Lauf: der python3-Server ist ein Kindprozess und
// haelt die Event-Loop offen, auch nach server.kill(). Beim ersten Mal lief die
// Eval deshalb ins Zeitlimit, OBWOHL sie 8/8 gemeldet hatte — eine Eval, die
// nach dem Urteil nicht zurueckkommt, gilt in jeder Schleife als kaputt.
process.exit(0);
