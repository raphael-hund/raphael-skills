#!/usr/bin/env node
/**
 * run-craft-check.mjs — loest jede Handwerks-Regel wirklich aus?
 *
 * Befund 29.07.2026: `craft-check.mjs` kennt 28 Regeln (M1-M25, T1-T10). Das
 * Anti-Set belegt davon 9 — gemessen, nicht geschaetzt, indem jede Fixture
 * einzeln durch den Pruefer lief:
 *
 *   _basis T5 · a1 T1,T2,T5 · a2 T5,T8,T9 · a3 M13,T5 · a4 M17,T5
 *   a5 M11,T5 · a6 M24,T5 · a8 T5
 *
 * 19 Regeln hat also nie etwas ausgeloest. Das ist kein Beweis, dass sie falsch
 * sind — aber auch keiner, dass sie funktionieren. Eine Regel ohne Fixture ist
 * eine Regel, von der niemand weiss, ob sie feuert; sie steht in der Liste, im
 * Bericht taucht sie nie auf, und beim naechsten Umbau des Pruefers faellt es
 * nicht auf, wenn sie stillschweigend kaputtgeht.
 *
 * Diese Eval baut pro Regel eine winzige Seite mit GENAU diesem einen Fehler und
 * prueft, dass die Regel-ID im Bericht steht. Dazu eine saubere Kontrollseite,
 * an der keine der Regeln anschlagen darf — sonst waere der Test auch dadurch
 * erfuellbar, dass der Pruefer ueberall alles meldet.
 *
 * Braucht Chrome (der Pruefer liest das gerenderte DOM), aber keinen fremden
 * Server: die Seiten werden als file://-URLs geladen.
 *
 *   node evals/run-craft-check.mjs
 *   node evals/run-craft-check.mjs --nur M6     # eine Regel einzeln
 *
 * Exit 0 = jede geprueft Regel feuert und die Kontrolle bleibt still.
 * Exit 1 = mindestens eine Regel feuert nicht (oder feuert zu oft).
 * Exit 2 = Pruefer/Browser fehlt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, '..', 'scripts', 'craft-check.mjs');
if (!fs.existsSync(PRUEFER)) {
  console.error(`FEHLER: craft-check.mjs nicht gefunden: ${PRUEFER}`);
  process.exit(2);
}
const nurArg = process.argv.indexOf('--nur');
const NUR = nurArg >= 0 ? process.argv[nurArg + 1] : null;

// Ein Grundgeruest, das selbst keine Regel reisst. Jeder Fall fuellt nur
// `kopf` (extra CSS) und `body`. Ohne diese gemeinsame Basis testet man den
// Rahmen mit, nicht die Regel.
const seite = ({ kopf = '', body = '' }) => `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Craft-Eval</title>
<!-- Das Grundgeruest muss ALLE Regeln erfuellen, sonst testet man den Rahmen mit.
     Erster Versuch am 29.07.2026 fehlte beides hier: die Kontrollseite meldete
     M23 (fehlende meta description) und M4 (keine Ueberschrift mit text-wrap).
     Beide Befunde waren korrekt — mein Geruest war unvollstaendig, nicht der
     Pruefer. Genau darum steht die Kontrolle in dieser Eval an erster Stelle. -->
<meta name="description" content="Sanierung von Wohnungen in Karlsruhe. Festpreis nach Ortstermin.">
<meta property="og:title" content="Craft-Eval">
<meta property="og:image" content="/og.png">
<link rel="icon" href="data:,">
<meta name="theme-color" content="#16202b">
<style>
:root{--ink:#16202b;--mut:#5b6875;--line:#e2e6ea;--bg:#fff}
*{box-sizing:border-box;margin:0}
body{font-family:Georgia,serif;color:var(--ink);background:var(--bg);line-height:1.6;padding:24px}
h1,h2,h3{font-family:-apple-system,'Segoe UI',sans-serif;letter-spacing:-.02em;line-height:1.1;text-wrap:balance}
h1{font-size:3rem} h2{font-size:2rem} h3{font-size:1.25rem}
a{color:var(--ink)} a:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
button,a.btn{min-height:44px;min-width:44px;display:inline-flex;align-items:center;
  padding:12px 24px;font-family:-apple-system,sans-serif;border:1px solid var(--line);
  background:#fff;border-radius:12px}
img{display:block;max-width:100%}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
${kopf}
</style></head><body>
<h1>Sanierung in Karlsruhe</h1>
<p>Wir sanieren Wohnungen. Nach dem Ortstermin bekommen Sie einen Festpreis.</p>
<img src="data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="900" height="600" fill="#c8ccd0"/></svg>',
).toString('base64')}" alt="Werkstatt" width="900" height="600">
${body}
</body></html>`;

// Pro Regel: die kleinste Seite, die genau sie ausloest.
// Nur Regeln, die sich ohne Server und ohne echte Bilder herstellen lassen —
// was hier fehlt, steht unten unter NICHT_HIER und ist ehrlich vermerkt.
const FAELLE = {
  T8: {
    was: 'Em-Dash im sichtbaren Text',
    body: '<p>Das ist gut — und guenstig.</p>',
  },
  T9: {
    was: 'erfundene Rundzahl',
    body: '<p>Schon 500+ Projekte und 100% Zufriedenheit.</p>',
  },
  T5: {
    was: 'Kicker-Reflex (3+ uppercase Mini-Label)',
    kopf: '.k{text-transform:uppercase;font-size:.75rem;letter-spacing:.12em;font-family:sans-serif}',
    body: '<p class="k">Leistung</p><h2>Bad</h2><p class="k">Leistung</p><h2>Kueche</h2>'
      + '<p class="k">Leistung</p><h2>Wohnung</h2>',
  },
  M17: {
    was: 'outline:none ohne :focus-visible-Ersatz',
    kopf: 'a.nf{outline:none}',
    body: '<a class="nf" href="#x">Ohne Fokusring</a>',
  },
  M11: {
    was: 'Rahmen und Schatten am selben Kasten',
    kopf: '.gc{border:1px solid var(--line);box-shadow:0 8px 24px rgba(0,0,0,.12);padding:16px;border-radius:12px}',
    // Die Regel greift ab DREI solchen Elementen — ein einzelner Kasten mit
    // Rahmen und Schatten ist eine Entscheidung, drei sind ein Muster. Erster
    // Versuch hatte einen und schlug fehl; die Schwelle stand im Pruefer, nicht
    // im Testfall.
    body: '<div class="gc">Eins</div><div class="gc">Zwei</div><div class="gc">Drei</div>',
  },
  M23: {
    was: 'fehlende meta description im <head>',
    // Herstellbar, seit das Geruest vollstaendig ist: die Zeile wieder
    // herausnehmen. Vorher war dieser Fall nicht von der luecken Kontrollseite
    // zu unterscheiden.
    kopfWeg: /<meta name="description"[^>]*>\n/,
    body: '<p>Kopf unvollstaendig.</p>',
  },
  M4: {
    was: 'keine Ueberschrift mit text-wrap: balance/pretty',
    kopfWeg: /;text-wrap:balance/,
    body: '<h2>Zweite Ueberschrift ohne balance</h2>',
  },
  M22: {
    was: 'Bild ohne explizite width/height (CLS)',
    body: '<img src="data:image/svg+xml;base64,'
      + Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">'
        + '<rect width="400" height="300" fill="#ddd"/></svg>').toString('base64')
      + '" alt="Ohne Masse">',
  },
  M6: {
    was: 'Zahlenreihe ohne tabular-nums',
    body: '<ul><li>1.240</li><li>890</li><li>12.500</li><li>430</li></ul>',
  },
  M10: {
    was: 'zu viele verschiedene Radien',
    kopf: '.r1{border-radius:3px}.r2{border-radius:5px}.r3{border-radius:7px}'
      + '.r4{border-radius:9px}.r5{border-radius:11px}.r6{border-radius:13px}'
      + '.r7{border-radius:15px}.r8{border-radius:17px}'
      + '[class^=r]{border:1px solid var(--line);padding:8px;margin:4px}',
    body: '<div class="r1">1</div><div class="r2">2</div><div class="r3">3</div>'
      + '<div class="r4">4</div><div class="r5">5</div><div class="r6">6</div>'
      + '<div class="r7">7</div><div class="r8">8</div>',
  },
  // --- Die sechs ungeprueften BLOCKER, nachgetragen 29.07.2026 -------------
  // Von den 13 Regeln ohne Fixture waren sechs BLOCK-Stufe: sie stoppen
  // Auslieferungen und niemand wusste, ob sie ausloesen. Das ist die
  // unangenehmste Sorte Luecke — ein Blocker, der nie feuert, faellt nicht
  // auf; einer, der falsch feuert, wird abgeschaltet.
  M8: {
    was: 'flache Hierarchie (alle Textgroessen zu aehnlich)',
    // Der Pruefer verlangt Faktor >= 1.8 zwischen kleinster und groesster
    // Schrift. Hier liegen alle zwischen 15 und 17px.
    kopf: 'h1{font-size:17px}h2{font-size:16px}p,li{font-size:15px}',
    body: '<h2>Leistungen</h2><p>Wir sanieren Wohnungen in Karlsruhe.</p>',
  },
  M3: {
    was: 'Fliesstext breiter als 85 Zeichen',
    kopf: '.breit{max-width:none;width:1400px;font-size:16px}',
    body: '<p class="breit">Der Satzspiegel entscheidet, ob ein Absatz lesbar ist: '
      + 'zu lange Zeilen zwingen das Auge, den Zeilenanfang zu suchen, und genau '
      + 'das bricht den Lesefluss bei jedem Umbruch aufs Neue, weshalb diese Zeile '
      + 'hier absichtlich weit ueber die Grenze hinaus laeuft.</p>',
  },
  M9: {
    was: 'Kind und Eltern mit identischem Radius bei Padding',
    kopf: '.aussen{border-radius:16px;padding:12px;background:var(--line)}'
      + '.innen{border-radius:16px;padding:8px;background:#fff}',
    body: '<div class="aussen"><div class="innen">Konzentrisch waere 4px innen.</div></div>',
  },
  M12: {
    was: 'ein einziger gap-Wert auf allen Flex-Containern',
    // Erster Versuch pruefte Padding gegen Margin — das ist NICHT, was M12
    // messt. Die Regel zaehlt gap-Werte auf Flex/Grid-Containern: mindestens
    // sechs, und alle identisch. Ein Fixture, das die Bedingung nur ungefaehr
    // nachbaut, belegt nichts (29.07.2026, drei Versuche daneben).
    kopf: '.f{display:flex;gap:16px}',
    body: Array.from({ length: 7 }, (_, i) =>
      `<div class="f"><span>A${i}</span><span>B${i}</span></div>`).join(''),
  },
  M16: {
    was: 'Klickflaeche kleiner als 40x40px',
    kopf: '.winzig{display:block;width:24px;height:24px;min-height:24px;padding:0;'
      + 'border:0;background:var(--line);font-size:11px;line-height:1}',
    body: '<div><button type="button" class="winzig" aria-label="Schliessen">x</button></div>',
  },
  M18: {
    was: 'drei animierte Elemente ohne prefers-reduced-motion',
    // Das Grundgeruest traegt selbst eine @media (prefers-reduced-motion)-Regel
    // (Zeile 76) — damit ist hasRM im Pruefer immer true und M18 kann nie
    // feuern. Zwei Fehlversuche gingen darauf zurueck, dass ich die Animation
    // veraenderte statt die Erfuellung wegzunehmen. Genau dafuer gibt es
    // kopfWeg: die Zeile, die das Geruest zur Erfuellung braucht, faellt weg.
    kopfWeg: /@media \(prefers-reduced-motion:reduce\)\{[^}]*\}\}\n/,
    kopf: '.a1,.a2,.a3,.a4{transition:opacity .3s ease;opacity:.9;'
      + 'display:block;padding:4px}',
    body: '<div class="a1">A</div><div class="a2">B</div>'
      + '<div class="a3">C</div><div class="a4">D</div>',
  },
  M24: {
    was: 'kein Bild ueber Icon-Groesse',
    // Der einzige Fall, der das Grundgeruest aendern muss: er ist die ABWESENHEIT
    // eines Bildes. Wird unten sondergebaut.
    ohneBild: true,
    body: '<p>Nur Text auf dieser Seite.</p>',
  },
};

// Regeln, die diese Eval NICHT herstellt — mit Grund. Ohne diese Liste sieht
// "6 von 6 gruen" nach voller Abdeckung aus, und das waere die naechste stille
// Luecke: 28 Regeln, 6 geprueft, und niemand sagt es.
const NICHT_HIER = {
  M13: 'Raster bricht auf 390px nicht um — braucht echtes Viewport-Resize (Anti-Set a3)',
  T1: 'Indigo-Violett-Verlauf — Anti-Set a1',
  T2: 'Inter ueberall — braucht geladene Webfonts (Anti-Set a1)',
  T7: 'Springy-Hover — braucht echte Hover-Simulation (Anti-Set a5, WARN)',
  // Verbleibende WARN-Regeln ohne Fixture. Die fuenf BLOCKER dieser Liste sind
  // am 29.07.2026 nachgetragen (M3, M8, M9, M12, M16, M18) — ein Blocker, der
  // nie feuert, faellt nicht auf, und einer, der falsch feuert, wird
  // abgeschaltet. Bei WARN ist der Schaden geringer, aber die Liste bleibt
  // sichtbar, damit "alles gruen" nicht nach voller Abdeckung aussieht.
  M1: 'nicht hergestellt (WARN, Typo-Skala: braucht >7 Schriftgroessen)',
  M2: 'nicht hergestellt (WARN, vertikaler Rhythmus)',
  M7: 'keine eigene add()-Stelle im Pruefer mehr — Regel-ID verwaist',
  M19: 'nicht hergestellt (WARN, transition: all)',
  M20: 'INFO-Stufe, kein BLOCK/WARN — taucht im Bericht anders auf',
  M25: 'keine eigene add()-Stelle (nur INFO zusammen mit M24)',
  T10: 'keine eigene add()-Stelle im Pruefer mehr — Regel-ID verwaist',
};

function lauf(html) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'craft-eval-'));
  try {
    const datei = path.join(ordner, 'index.html');
    fs.writeFileSync(datei, html);
    let roh = '';
    try {
      roh = execFileSync('node', [PRUEFER, '--url', `file://${datei}`, '--json'],
        { encoding: 'utf8', timeout: 120000 });
    } catch (e) {
      roh = String(e.stdout || '');
      if (!roh) return { kaputt: String(e.stderr || e.message).split('\n')[0], ids: [] };
    }
    let d;
    try { d = JSON.parse(roh); } catch { return { kaputt: 'Ausgabe unlesbar', ids: [] }; }
    const ids = [...new Set([...(d.blockers || []), ...(d.warns || [])].map((x) => x.id))];
    return { ids, roh: d };
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

console.log('\nCraft-Check — feuert jede Regel, die es gibt?\n');

// --- 1. Kontrolle ---------------------------------------------------------
// Zuerst, denn wenn die schon meldet, sagt kein weiterer Fall etwas aus.
console.log('Kontrolle: eine saubere Seite darf keine Regel reissen.\n');
const kontrolle = lauf(seite({}));
if (kontrolle.kaputt) {
  console.error(`\nFEHLER: craft-check laeuft nicht (${kontrolle.kaputt}).`);
  console.error('Chrome/Playwright vorhanden? Das ist kein Befund ueber die Regeln.');
  process.exit(2);
}
zeile(kontrolle.ids.length === 0, 'saubere Seite, 0 Befunde',
  kontrolle.ids.length ? `meldet: ${kontrolle.ids.join(', ')}` : null);

// --- 2. Jede herstellbare Regel ------------------------------------------
console.log('\nJede Regel einzeln — die eigene ID MUSS im Bericht stehen:\n');
for (const [id, f] of Object.entries(FAELLE)) {
  if (NUR && NUR !== id) continue;
  let html = seite(f);
  if (f.ohneBild) html = html.replace(/<img[\s\S]*?>/, '');
  // `kopfWeg` entfernt eine Zeile, die das Geruest zur Erfuellung braucht — so
  // wird die Abwesenheit einer Sache testbar, nicht nur ihre Anwesenheit.
  if (f.kopfWeg) html = html.replace(f.kopfWeg, '');
  const r = lauf(html);
  if (r.kaputt) { zeile(false, `${id}  ${f.was}`, `Pruefer kaputt: ${r.kaputt}`); continue; }
  zeile(r.ids.includes(id), `${id}  ${f.was}`,
    r.ids.includes(id) ? null : `${id} fehlt. Gemeldet wurde: ${r.ids.join(', ') || '(nichts)'}`);
}

// --- 3. Ehrliche Abdeckung ------------------------------------------------
// Die Zahl, die im Bericht fehlte: wie viele der Regeln sind ueberhaupt belegt?
const alleIds = [...new Set(
  fs.readFileSync(PRUEFER, 'utf8').match(/\b(?:M\d{1,2}|T\d{1,2})\b/g) || [],
)];
const hier = Object.keys(FAELLE);
const antiset = ['M13', 'T1', 'T2', 'T7', 'M11', 'M17', 'M24', 'T8', 'T9', 'T5'];
const belegt = new Set([...hier, ...antiset]);
const offen = alleIds.filter((x) => !belegt.has(x));

console.log('\nAbdeckung (die Zahl, die vorher niemand nannte):\n');
console.log(`  ${alleIds.length} Regeln im Pruefer`);
console.log(`  ${belegt.size} belegt — ${hier.length} hier, ${antiset.length} im Anti-Set (Ueberschneidung moeglich)`);
console.log(`  ${offen.length} ohne Fixture: ${offen.join(', ') || '–'}`);
console.log('\n  Eine Regel ohne Fixture ist keine falsche Regel — nur eine, von der');
console.log('  niemand weiss, ob sie feuert. Beim naechsten Umbau faellt ihr Ausfall');
console.log('  nicht auf. Die Liste steht hier, damit sie nicht unsichtbar bleibt.');

const gesamt = 1 + (NUR ? 1 : Object.keys(FAELLE).length);
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens eine Handwerks-Regel urteilt nicht wie behauptet.');
  process.exit(1);
}
console.log('Jede hier gepruefte Regel feuert, die saubere Seite bleibt still.');
