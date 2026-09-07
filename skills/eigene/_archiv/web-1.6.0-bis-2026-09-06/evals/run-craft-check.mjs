#!/usr/bin/env node
/**
 * run-craft-check.mjs — loest jede Handwerks-Regel wirklich aus?
 *
 * Befund 29.07.2026: `craft-check.mjs` hat 23 echte Pruefstellen. Das Anti-Set
 * belegte davon 9 — gemessen, nicht geschaetzt, indem jede Fixture einzeln
 * durch den Pruefer lief:
 *
 *   _basis T5 · a1 T1,T2,T5 · a2 T5,T8,T9 · a3 M13,T5 · a4 M17,T5
 *   a5 M11,T5 · a6 M24,T5 · a8 T5
 *
 * Die Zahl "28" (M1-M25 + T1-T10) stand zuerst hier und war falsch: sie kam aus
 * einem grep ueber die ganze Datei und zaehlte Kommentar-Erwaehnungen mit. M7,
 * M25 und T10 erschienen dadurch als "ungeprueft", obwohl es fuer sie gar keine
 * add()-Stelle gibt — M25 ist laut Doktrin ausdruecklich "inhaltlich, nicht
 * messbar". Eine Abdeckungszahl, die zu NIEDRIG luegt, kostet genauso Zeit wie
 * eine, die zu hoch luegt: man sucht Fixtures fuer Regeln, die es nicht gibt.
 *
 * 14 Regeln hatten also nie etwas ausgeloest. Das ist kein Beweis, dass sie falsch
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
// Temp-Ordner, die auch beim Abbruch verschwinden. Gemessen 31.07.2026:
// ein abgebrochener Lauf liess je einen craft-eval- und einen
// playwright-artifacts-Ordner liegen; auf dem Rechner lagen 10 bzw. 27.
import { wegwerfOrdner, altlastWeg } from './lib/wegwerf.mjs';

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
// `link` kommt VOR den <style>-Block. Ein `@import` in `kopf` waere wirkungslos:
// dort steht es hinter dem Grundgeruest-CSS, und der Browser ignoriert jedes
// @import, das nicht am Anfang des Blocks steht. Erster Versuch am 30.07.2026
// tat genau das — der Fall meldete "(nichts)" und sah wie ein Pruefer-Fehler aus.
const seite = ({ kopf = '', body = '', link = '' }) => `<!doctype html>
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
${link}
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
    // Der Link ist ein blanker <a> im Fliesstext und damit kleiner als 40x40 —
    // M16 hat sachlich recht. Ein Link nur zum Vergroessern aufzublasen wuerde
    // den Fall verwaessern; darum der Begleiter ausdruecklich benannt.
    // Gefunden von der Mitlaeufer-Pruefung am 29.07.2026, erster Lauf.
    mit: ['M16'],
    // Ein nackter Inline-Link ist zwangsweise kleiner als 40x40px — deshalb
    // meldet dieselbe Fixture M16 mit. Zwei Wege dagegen: den Link auf
    // Klickgroesse bringen, oder M16 als erwarteten Beifang nennen. Das erste
    // ist sauberer, weil die Fixture dann WIRKLICH nur eine Sache falsch macht.
    kopf: 'a.nf{outline:none;display:inline-flex;min-height:44px;min-width:44px;'
      + 'align-items:center;padding:12px 24px}',
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
  M3: {
    was: 'Fliesstext breiter als 75 Zeichen',
    // Ein 1400px breiter Absatz sprengt auf 390px zwangsweise das Raster —
    // M13 hat sachlich recht und ist hier unvermeidbar. Wer eine zu breite
    // Zeile baut, baut auch eine, die mobil nicht umbricht.
    mit: ['M13'],
    // 1600px Breite sprengt auch das Mobil-Raster (M13). Statt beides zu melden:
    // genau so breit machen, dass der Satzspiegel reisst und das Raster haelt —
    // 900px bei 16px Schrift sind rund 110 Zeichen, Ziel ist <= 75.
    kopf: 'p.breit{max-width:900px;font-size:16px}',
    body: '<p class="breit">' + 'Wir sanieren Wohnungen und Haeuser in Karlsruhe und Umgebung, '.repeat(6) + '</p>',
  },
  M16: {
    was: 'Klickflaeche kleiner als 40x40px',
    kopf: 'a.mini{display:inline-block;min-height:0;min-width:0;width:20px;height:20px;padding:0;border:0}',
    body: '<a class="mini" href="#a">x</a>',
  },
  M18: {
    was: 'Animation ohne prefers-reduced-motion',
    // Das Geruest bringt den Reduced-Motion-Block mit; fuer diesen Fall muss er
    // weg UND es muss ueberhaupt animiert werden.
    kopfWeg: /@media \(prefers-reduced-motion:reduce\)\{\*\{transition:none!important;animation:none!important\}\}\n/,
    // Die Regel greift ab DREI animierten Elementen (wie M11 bei drei
    // Geisterkarten). Ein einziges bewegtes Element ist eine Entscheidung.
    kopf: '.anim{transition:transform .2s cubic-bezier(0.23,1,0.32,1)}',
    body: '<div class="anim">Eins</div><div class="anim">Zwei</div>'
      + '<div class="anim">Drei</div><div class="anim">Vier</div>',
  },
  M19: {
    was: 'transition-property: all',
    kopf: '.alles{transition:all .2s cubic-bezier(0.23,1,0.32,1)}',
    body: '<div class="alles">Alles</div>',
  },
  M1: {
    was: 'zu viele verschiedene Textgroessen',
    kopf: [...Array(12)].map((_, i) => `.t${i}{font-size:${11 + i}px}`).join(''),
    body: [...Array(12)].map((_, i) => `<p class="t${i}">Groesse ${i}</p>`).join(''),
  },
  M8: {
    was: 'flache Hierarchie (alle Groessen zu nah beieinander)',
    // Die Regel liest ALLE Textelemente, nicht nur Ueberschriften, und
    // verlangt einen Spannweiten-Faktor >= 1.8. Erster Versuch setzte nur
    // h1/h2/h3/p und liess das <li>/<span> im Geruest bei anderer Groesse —
    // damit war die Spannweite gross genug und die Regel schwieg zu Recht.
    // Also der Stern: jede Textgroesse gleich, Faktor 1.0.
    kopf: '*{font-size:17px!important}',
    body: '<h2>Zwei</h2><h3>Drei</h3><p>Text</p>',
  },
  M9: {
    was: 'Kind und Eltern mit demselben Radius',
    kopf: '.aussen{border-radius:16px;padding:16px;border:1px solid var(--line)}'
      + '.innen{border-radius:16px;padding:8px;background:#f4f4f5}',
    body: '<div class="aussen"><div class="innen">Nicht konzentrisch</div></div>',
  },
  M12: {
    was: 'ein einziger gap-Wert auf allen Containern',
    kopf: '.g{display:flex;gap:16px;margin:8px 0}',
    body: [...Array(6)].map(() => '<div class="g"><span>a</span><span>b</span></div>').join(''),
  },
  // --- Die drei verbleibenden WARN-Regeln, nachgetragen 29.07.2026 ----------
  // Nach den sechs Blockern blieben vier Regeln ohne Fixture. Drei davon sind
  // herstellbar; M20 ist ein bedingungsloser INFO ohne Schwelle und laeuft
  // ohnehin bei jedem Lauf mit.
  M1: {
    was: 'mehr als sieben verschiedene Textgroessen',
    mit: ['M2'],   // krumme Schriftgroessen erzeugen zwangsweise krumme Abstaende
    // Die Schwelle steht bei > 7. Das Grundgeruest bringt schon einige mit,
    // darum hier acht klar verschiedene dazu — sicherer als knapp ueber die
    // Grenze zu zielen.
    kopf: '.s1{font-size:11px}.s2{font-size:13px}.s3{font-size:15px}.s4{font-size:19px}'
      + '.s5{font-size:23px}.s6{font-size:29px}.s7{font-size:37px}.s8{font-size:43px}',
    // Der Text muss LAENGER als ein Zeichen sein: der Pruefer sammelt nur
    // Elemente mit `textContent.trim().length > 1`. Erster Versuch nutzte
    // '<p>a</p>' — acht Groessen auf der Seite, und M1 meldete nichts, weil
    // kein einziges Element in die Messung kam. Direkt am Pruefer nachgemessen
    // (dieselbe Seite mit zweistelligem Text: "9 verschiedene Textgroessen").
    // Nicht die Regel war stumm, sondern mein Fixture unsichtbar.
    body: '<p class="s1">aa</p><p class="s2">bb</p><p class="s3">cc</p><p class="s4">dd</p>'
      + '<p class="s5">ee</p><p class="s6">ff</p><p class="s7">gg</p><p class="s8">hh</p>',
  },
  M2: {
    was: 'Abstaende neben dem 4px-Raster',
    // Verlangt sind >10 gemessene Abstaende, davon >25% nicht durch 4 teilbar.
    // 13 Elemente mit krummen Werten reichen sicher.
    kopf: '.o{margin-bottom:7px;padding-top:9px;padding-bottom:13px}',
    body: Array.from({ length: 13 }, (_, i) => `<div class="o">Zeile ${i}</div>`).join(''),
  },
  M19: {
    was: 'transition-property: all mit echter Dauer',
    // Der Pruefer prueft ausdruecklich die DAUER mit: transitionProperty ist
    // per Default "all", auch ohne jede Transition. Ohne `.3s` meldet die
    // Regel jede statische Seite — deshalb steht die Dauer hier explizit.
    kopf: '.ta{transition:all .3s ease;padding:4px}',
    body: '<div class="ta">Alles animiert</div>',
  },
  'M18-extern': {
    ist: 'M18',
    was: 'Animation in einer EXTERNEN CSS-Datei, kein Reduced-Motion',
    // Nachgetragen 30.07.2026. Alle bisherigen Faelle betten ihr CSS in einen
    // <style>-Block ein; ein echter Build liefert eine .css-Datei. Der Pruefer
    // liest dafuer document.styleSheets und faengt Cross-Origin-Fehler mit
    // einem leeren catch ab — Verdacht war, dass externe Dateien dadurch
    // unsichtbar bleiben und M18 falschen Alarm gibt.
    //
    // Nachgemessen: der Verdacht war UNBEGRUENDET. Mit Reduced-Motion in der
    // externen Datei schweigt M18, ohne meldet es. Beide Richtungen am echten
    // Pruefer geprueft. Der Fall steht hier, weil er das belegt — nicht weil
    // etwas kaputt war.
    kopfWeg: /@media \(prefers-reduced-motion:reduce\)\{\*\{transition:none!important;animation:none!important\}\}\n/,
    dazu: { 'extern.css': '.e1,.e2,.e3{transition:opacity .3s ease}\n' },
    link: '<link rel="stylesheet" href="extern.css">',
    body: '<div class="e1">A</div><div class="e2">B</div><div class="e3">C</div>',
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
  // Verbleibende Regeln ohne Fixture. Die SECHS Blocker dieser Liste sind am
  // 29.07.2026 nachgetragen (M3, M8, M9, M12, M16, M18) — ein Blocker, der nie
  // feuert, faellt nicht auf, und einer, der falsch feuert, wird abgeschaltet.
  // Bei WARN ist der Schaden geringer, aber die Liste bleibt sichtbar, damit
  // "alles gruen" nicht nach voller Abdeckung aussieht.
  //
  // M7, M25 und T10 stehen hier NICHT mehr: sie haben im Pruefer keine
  // add()-Stelle und sind damit keine ungepruefte Regeln, sondern gar keine.
  // M25 ist laut Doktrin ausdruecklich "inhaltlich, nicht messbar", T10 steht
  // nur in der Ueberschrift, M7 nirgends. Sie standen nur in der Liste, weil
  // die Zaehlung Kommentare mitgriff.
  M20: 'INFO ohne Schwelle — laeuft bei jedem Lauf mit; belegt durch den Minimalfall oben',
};

// Reste frueherer SIGKILL-Abbrueche — dagegen hilft kein Handler, nur der
// naechste Lauf. playwright-artifacts- legt Playwright selbst an, wenn ein
// Browser mitten in der Aufzeichnung stirbt.
altlastWeg('craft-eval-', 6);
altlastWeg('playwright-artifacts-', 6);

function lauf(html, dazu = {}) {
  const ordner = wegwerfOrdner('craft-eval-');
  try {
    const datei = path.join(ordner, 'index.html');
    fs.writeFileSync(datei, html);
    // Beidateien fuer Faelle, die ein EXTERNES Stylesheet brauchen. Alle
    // bisherigen Faelle betten ihr CSS ein — ein echter Build tut das nie.
    for (const [name, inhalt] of Object.entries(dazu)) {
      fs.writeFileSync(path.join(ordner, name), inhalt);
    }
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
    // Zusaetzlich die Stufe merken. Bis 30.07.2026 warf diese Eval Blocker und
    // Warnungen in EINEN Topf — und damit blieb der Schweregrad ungeprueft.
    // Gemessen: `add('BLOCK', 'M3', …)` zu `add('WARN', 'M3', …)` geaendert, und
    // die Eval meldete weiter 22/22. Ein Blocker, der heimlich zur Warnung wird,
    // entscheidet aber genau die Frage, ob eine Seite ausgeliefert wird.
    const blockIds = new Set((d.blockers || []).map((x) => x.id));
    // INFOs bleiben BEWUSST aus `ids`: die Mitlaeufer-Pruefung wuerde sonst jeden
    // Fall roetlich melden, weil M24/M25 und M20 auf JEDER Seite als INFO
    // erscheinen. Fuer Faelle, die eine INFO-Regel belegen sollen, gibt es
    // `infoIds` — getrennt gehalten, statt die eine Liste zu verwaessern.
    //
    // Befund 30.07.2026: der M20-Fall meldete "(nichts)", weil `ids` INFOs gar
    // nicht enthielt. Mein Testfall war unerfuellbar gebaut, die Regel lief die
    // ganze Zeit (am echten Pruefer nachgemessen: minimale Seite -> M20 dabei).
    const infoIds = [...new Set((d.infos || []).map((x) => x.id))];
    return { ids, blockIds, infoIds, roh: d };
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
  const r = lauf(html, f.dazu || {});
  if (r.kaputt) { zeile(false, `${id}  ${f.was}`, `Pruefer kaputt: ${r.kaputt}`); continue; }

  // Zwei Fragen, nicht eine. Bis 29.07.2026 stand hier nur `ids.includes(id)`:
  // "hat die Regel ausgeloest?". Was fehlte: "hat GENAU sie ausgeloest?"
  //
  // Eine Fixture, die drei Regeln reisst, war damit von einer praezisen nicht zu
  // unterscheiden. Das faellt spaeter teuer auf — wenn eine Regel nur noch als
  // Mitlaeufer einer anderen feuert, meldet die Eval weiter gruen. Das Anti-Set
  // prueft diese zweite Haelfte seit Tagen ("reisst am erwarteten Check UND an
  // keinem anderen"); hier fehlte sie.
  //
  // `mit` nennt erlaubte Begleiter ausdruecklich: manche Fehler ziehen einen
  // zweiten zwangsweise nach sich (acht Schriftgroessen erhoehen auch die
  // Spannweite). Wer den Begleiter hinschreibt, hat ihn bedacht — wer ihn
  // stillschweigend duldet, weiss nichts.
  // `f.ist` nennt die Regel, wenn der Schluessel ein anderer ist — zwei Faelle
  // fuer dieselbe Regel brauchen zwei Schluessel ('M18' und 'M18-extern'), aber
  // beide pruefen M18. Die Abdeckungszaehlung unten wertet `ist` seit Anfang aus,
  // die Trefferpruefung hier tat es nicht: mein neuer Fall suchte nach der ID
  // "M18-extern", die es im Pruefer gar nicht gibt (30.07.2026, Meldung
  // "M18-extern fehlt. Gemeldet wurde: (nichts)").
  //
  // Eine Eval, die dasselbe Feld an zwei Stellen unterschiedlich liest, meldet
  // Rot fuer einen korrekten Testfall — falscher Alarm aus Inkonsistenz.
  const regel = f.ist || id;
  const erlaubt = new Set([regel, ...(f.mit || [])]);
  const mitlaeufer = r.ids.filter((x) => !erlaubt.has(x));
  const trifft = r.ids.includes(regel);
  zeile(trifft && mitlaeufer.length === 0, `${id}  ${f.was}`,
    !trifft ? `${regel} fehlt. Gemeldet wurde: ${r.ids.join(', ') || '(nichts)'}`
      : mitlaeufer.length ? `reisst zusaetzlich: ${mitlaeufer.join(', ')} — Fixture zu grob oder \`mit\` erweitern`
        : null);
}

// --- 2b. Die eine Ausnahme muss ihre Ausnahme belegen ---------------------
// M20 steht als einzige Regel ohne Fixture in NICHT_HIER, begruendet mit
// "bedingungsloser INFO — laeuft ohnehin bei jedem Lauf mit". Diese Begruendung
// war bisher Prosa.
//
// Am 30.07.2026 haben sich drei solche Begruendungen als falsch erwiesen: die
// Browser-Eval fuehrte 13 Regeln als "braucht Hover/Scroll", alle 13 waren auf
// einer statischen Seite herstellbar. Eine Begruendung, die plausibel klingt,
// ist kein Beweis — besonders wenn sie zum Namen der Regel passt.
//
// Hier stimmt sie (nachgemessen: minimale Seite, nur ein <p>, M20 ist dabei).
// Der Fall haelt das fest. Faellt M20 kuenftig aus, faellt es auf, statt in
// einer Ausnahmeliste zu verschwinden.
console.log('\nDie Ausnahme von der Fixture-Pflicht muss stimmen:\n');
{
  const minimal = seite({ body: '<p>Nur Text.</p>' });
  const r = lauf(minimal);
  const dabei = (r.infoIds || []).some((i) => i.split('/').includes('M20'));
  zeile(dabei, 'M20 laeuft auch auf einer minimalen Seite mit (INFO ohne Schwelle)',
    dabei ? null : `M20 fehlt — dann ist die Begruendung in NICHT_HIER falsch. INFO gemeldet: ${(r.infoIds || []).join(', ') || '(nichts)'}`);
}

// --- 3. Ehrliche Abdeckung ------------------------------------------------
// Die Zahl, die im Bericht fehlte: wie viele der Regeln sind ueberhaupt belegt?
// Gezaehlt werden nur IDs mit einer echten `add()`-Stelle.
//
// Die erste Fassung greppte JEDES Vorkommen von M\d/T\d in der Datei — auch aus
// Kommentaren. Dadurch meldete der Bericht "28 Regeln" und fuehrte M7, M25 und
// T10 als "ohne Fixture", obwohl es fuer sie gar keine Pruefstelle gibt: M25
// steht laut Doktrin ausdruecklich als "inhaltlich, nicht messbar", T10 nur in
// der Ueberschrift, M7 nirgends. Man haette Fixtures fuer Regeln gesucht, die
// es nicht gibt — eine Abdeckungszahl, die zu niedrig LUEGT, kostet genauso
// Zeit wie eine, die zu hoch luegt.
//
// Mehrfach-IDs wie add('INFO', 'M24/M25', ...) werden aufgeteilt.
const alleIds = [...new Set(
  (fs.readFileSync(PRUEFER, 'utf8').match(/add\('[A-Z]+',\s*'([MT][\d/]+)'/g) || [])
    .map((t) => t.match(/'([MT][\d/]+)'$/)[1])
    .flatMap((t) => t.split('/').map((x) => (/^\d/.test(x) ? `M${x}` : x))),
)];
const hier = Object.keys(FAELLE);
const antiset = ['M13', 'T1', 'T2', 'T7', 'M11', 'M17', 'M24', 'T8', 'T9', 'T5'];
// M20 hat keinen Eintrag in FAELLE, wird aber vom Minimalfall oben belegt (siehe
// Abschnitt 2b). Ohne diese Zeile meldete die Abdeckung "1 ohne Fixture: M20",
// obwohl der Beleg zwei Bildschirmzeilen darueber gruen steht — eine Zahl, die
// der eigenen Ausgabe widerspricht.
const belegt = new Set([...hier, ...antiset, 'M20']);
const offen = alleIds.filter((x) => !belegt.has(x));

// --- Die Stufe ist Teil der Regel, nicht nur ihr Name ------------------
// Zehn der 23 Regeln sind BLOCK-Stufe: sie stoppen eine Auslieferung. Wird eine
// davon still zur Warnung, laeuft die Seite durch — und keine Fixture merkt es,
// solange nur nach der ID gefragt wird. Diese Liste steht deshalb hier und
// nicht im Pruefer: sie ist die Erwartung, gegen die er gemessen wird.
const BLOCKER = ['M3', 'M8', 'M9', 'M12', 'M16', 'M17', 'M18', 'M24', 'T2', 'T8'];
console.log('\nJede BLOCK-Regel meldet auch wirklich BLOCK:\n');
{
  // Die Fixtures decken nicht alle zehn ab (T2 braucht Webfonts, M18/M24 haengen
  // an ganzen Seiten) — geprueft wird, was herstellbar ist, und der Rest steht
  // ehrlich daneben.
  const pruefbar = BLOCKER.filter((id) => FAELLE[id] || Object.values(FAELLE).some((f) => f.ist === id));
  const falsch = [];
  for (const id of pruefbar) {
    const f = FAELLE[id] || Object.values(FAELLE).find((x) => x.ist === id);
    let html = seite(f);
    if (f.ohneBild) html = html.replace(/<img[\s\S]*?>/, '');
    if (f.kopfWeg) html = html.replace(f.kopfWeg, '');
    const r = lauf(html);
    if (!r.kaputt && !r.blockIds.has(id)) falsch.push(id);
  }
  // Der Text muss zum Urteil passen — "alle als BLOCK gemeldet" neben einem
  // [!!] widerspricht sich und schickt den Leser in die falsche Richtung.
  // Derselbe Fehler wie im Verweise-Pruefer, beide am 30.07.2026 gefunden,
  // beide erst beim absichtlichen Kaputtmachen sichtbar geworden.
  zeile(falsch.length === 0,
    falsch.length === 0
      ? `${pruefbar.length} von ${BLOCKER.length} Blocker-Regeln mit Fixture, alle als BLOCK gemeldet`
      : `${falsch.length} von ${pruefbar.length} Blocker-Regeln melden nur WARN`,
    falsch.length ? `melden nicht BLOCK: ${falsch.join(', ')}` : null);
  const ohne = BLOCKER.filter((id) => !pruefbar.includes(id));
  if (ohne.length) console.log(`         (ohne Fixture, Stufe ungeprueft: ${ohne.join(', ')})`);
}

console.log('\nAbdeckung (die Zahl, die vorher niemand nannte):\n');
console.log(`  ${alleIds.length} Regeln im Pruefer`);
// `belegt.size` waere hier gelogen: die Menge enthaelt auch Namen, die der
// Pruefer gar nicht (mehr) kennt — etwa Anti-Set-IDs, die inzwischen anders
// heissen. Gezaehlt wird deshalb der Schnitt mit den echten Regeln des Pruefers.
// Sonst stand da "23 belegt von 23 Regeln, 2 ohne Fixture", und das geht nicht auf.
const wirklichBelegt = alleIds.filter((x) => belegt.has(x));
const nurHier = alleIds.filter((x) => hier.includes(x));
const nurAntiset = alleIds.filter((x) => antiset.includes(x) && !hier.includes(x));
// Die Aufschluesselung muss die Gesamtzahl ERGEBEN, sonst ist sie eine dritte
// Zahl neben zwei anderen. Gemessen am 30.07.2026: "23 belegt — 19 hier, 3 nur
// ueber das Anti-Set". 19 + 3 = 22. Die fehlende war M20, belegt vom Minimalfall
// in Abschnitt 2b und deshalb in `belegt`, aber in keiner der beiden Listen.
//
// Die Rechnung stimmte; nur die Anzeige verschwieg eine Kategorie. Das ist die
// leisere Haelfte des Musters dieser Serie: keine falsche Zahl, sondern eine
// Aufteilung, die sich nicht nachrechnen laesst. Wer nachrechnet, sucht den
// Fehler dann in der Summe statt in der Darstellung.
const sonstBelegt = wirklichBelegt.filter((x) => !nurHier.includes(x) && !nurAntiset.includes(x));
console.log(`  ${wirklichBelegt.length} belegt — ${nurHier.length} hier, ${nurAntiset.length} nur ueber das Anti-Set`
  + (sonstBelegt.length ? `, ${sonstBelegt.length} ueber Sonderfaelle (${sonstBelegt.join(', ')})` : ''));
if (nurHier.length + nurAntiset.length + sonstBelegt.length !== wirklichBelegt.length) {
  console.log('  ACHTUNG: die Aufschluesselung ergibt nicht die Gesamtzahl.');
}
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
