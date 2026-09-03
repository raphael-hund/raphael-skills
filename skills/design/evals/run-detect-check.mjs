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
import { execFileSync, spawnSync } from 'node:child_process';
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
  // Nachgetragen 30.07.2026. Die einzige Regel aus detect-text.mjs, die im
  // Datei-Modus herstellbar war und keinen Fall hatte — belegt durch die
  // Abdeckungszeile dieser Eval selbst, nicht geschaetzt.
  //
  // Die Regel hat ZWEI Varianten (leeres src, fehlendes src), also braucht sie
  // zwei Faelle. Ein Fall haette die zweite Haelfte gruen aussehen lassen.
  'broken-image': {
    was: '<img> mit leerem src',
    body: '<img src="" alt="Werkstatt">',
  },
  'broken-image-ohne-src': {
    ist: 'broken-image',
    was: '<img> ohne jedes src-Attribut',
    body: '<img alt="Werkstatt" width="800" height="600">',
  },
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
  // --- Die zwei ungedeckten Zweige, nachgetragen 30.07.2026 ----------------
  // `ai-color-palette` hat VIER Zweige im Detektor, die Eval hatte zwei
  // Fixtures. Aufgefallen bei der Sabotage-Pruefung: sie schaltet EINEN Zweig ab
  // und die Eval riss trotzdem — weil ein anderer Zweig weiter meldete. Ein
  // Regelname mit mehreren Zweigen braucht pro Zweig einen Fall, sonst deckt ein
  // Fall die Luecke des anderen zu.
  //
  // Beide verlangen eine UEBERSCHRIFT in derselben Zeile: eine violette Akzentfarbe
  // irgendwo ist eine Entscheidung, eine violette Headline ist der Tell. Erster
  // Versuch nutzte <p> und meldete nichts — Fixture falsch, nicht Detektor stumm.
  'ai-color-palette-css-heading': {
    ist: 'ai-color-palette',
    was: 'violette Ueberschriftenfarbe in rohem CSS',
    // Der Detektor verlangt Ueberschrift UND Farbe in DERSELBEN Zeile ("eine
    // violette Akzentfarbe irgendwo ist eine Entscheidung, eine violette
    // Headline ist der Tell"). Zwei Fehlversuche, beide gemessen:
    //   `style: 'h1{color:#7c3aed}'` — CSS landet im <style>-Block, das <h1>
    //     neun Zeilen tiefer im Body. Zwei Zeilen, keine Meldung.
    //   `<h1 style="color:#7c3aed">` — der Regex verlangt `color:` am
    //     Zeilenanfang oder nach `;{`, im style-Attribut steht ein `"` davor.
    // Was greift: eine CSS-Regel mit font-size in derselben Zeile.
    style: 'h1 { color: #7c3aed; font-size: 48px }',
    body: '<h1>Violette Ueberschrift</h1>',
  },
  'ai-color-palette-tw-heading': {
    ist: 'ai-color-palette',
    was: 'Tailwind text-purple auf einer Ueberschrift',
    body: '<h1 class="text-purple-500 text-4xl">Violett</h1>',
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
  // 02.09.2026, Sync auf impeccable v4.0.5: die Regel heisst dort
  // `numbered-section-labels` (nicht `numbered-section-markers`) UND liegt nur
  // noch im DOM-Pfad (rules/checks.mjs) — der Regex-Analyzer, den der vendorte
  // Stand hatte, ist im Original entfallen. Ein Fixture im Datei-Modus kann sie
  // darum nicht mehr belegen; der Fall steht jetzt in
  // run-browser-detect-check.mjs. Hier ersatzlos entfernt statt umbenannt: ein
  // Fixture, das nie feuern kann, ist kein Beleg, sondern ein Dauerrot.
  // --- Neu mit impeccable v4.0.5, 02.09.2026 --------------------------------
  // Von den 14 neuen Regeln sind genau diese zwei im Datei-Modus herstellbar:
  // beide sind CSS-Text-Scanner und laufen ueber detect-text.mjs (dort Zeile
  // 666 und 673). Die uebrigen zwoelf haengen am gerenderten DOM (Groessen,
  // Ueberdeckung, Scroll-Kante) und stehen in der Abdeckungsliste unten.
  'marquee': {
    was: 'Endlos-Schleife, die horizontal um 100% wandert',
    // Nur Prozent-Reisen zaehlt (>= 20%): Pixel-Schleifen sind bespoke
    // Produktanimationen, keine Ticker. Am Code gelesen, checks.mjs:1104-1113.
    style: '@keyframes lauf{from{transform:translateX(0)}to{transform:translateX(-100%)}}'
      + '.ticker{animation:lauf 20s linear infinite}',
    body: '<div class="ticker">Logos, die vorbeiziehen.</div>',
  },
  'radial-halo': {
    was: 'radialer Farbschleier auf dunkler Seite',
    // Drei Bedingungen, alle am Code gelesen (checks.mjs:782, 825, 829, 831):
    // die Seite muss dunkel sein, der letzte Stop transparent (Alpha <= 0.05)
    // und der erste kraeftig (Alpha >= 0.7) UND bunt (Kanal-Spanne >= 24).
    // Erster Versuch nutzte rgba(...,.55) und meldete nichts — nicht die Regel
    // war stumm, der Schleier war zu blass fuer ihre Schwelle.
    style: 'body{background:#0a0a12;color:#eee}'
      + '.halo{background:radial-gradient(circle at 50% 0%, rgba(99,102,241,.85), transparent 60%)}',
    body: '<div class="halo">Hero mit Schleier.</div>',
  },
  'design-system-font': {
    designMd: true,
    was: 'Schriftart nicht in DESIGN.md erklaert',
    style: 'h1{font-family:"Playfair Display",serif}',
  },
  'design-system-color': {
    designMd: true,
    was: 'Farbe nicht in DESIGN.md erklaert',
    style: 'h1{color:#c026d3}',
  },
  'design-system-radius': {
    designMd: true,
    was: 'Radius neben der DESIGN.md-Skala (9px bei 4/12/16)',
    style: '.k{border-radius:9px;border:1px solid var(--line);padding:8px}',
    body: '<div class="k">Kasten</div>',
  },
  'design-system-font-size': {
    designMd: true,
    was: 'Schriftgroesse neben der Ramp (37px bei 14/16/48)',
    style: 'h1{font-size:37px}',
  },
  'aphoristic-cadence': {
    was: 'drei aphoristische Konstruktionen (Schwelle 3)',
    // Die Regel sucht zwei Formen: "Not a X. Y." und "Satz. No/Just ..." — ab
    // drei Treffern zusammen. Am Code nachgelesen, nicht geschaetzt: die
    // Schwelle steht bei `count < 3`, und beide Muster brauchen einen
    // Grossbuchstaben-Satzanfang nach dem Punkt.
    body: '<p>Not a tool. A way of working. Not a template. A decision.</p>'
      + '<p>Everything is configurable. Just three fields.</p>',
  },
  'bounce-easing': {
    was: 'Bounce-Animation',
    style: '@keyframes b{0%{transform:scale(1)}50%{transform:scale(1.2)}100%{transform:scale(1)}}'
      + '.b{animation:bounce 1s infinite}',
    body: '<div class="b">Hüpft</div>',
  },
};

// Die vier design-system-*-Regeln vergleichen gegen eine DESIGN.md im
// Projektordner. Ohne sie schweigen sie — richtig so: ein Projekt ohne erklaertes
// System hat keine Abweichung, an der man es messen koennte. Getestet werden
// koennen sie also nur MIT dieser Datei, und das Frontmatter-Format ist genau
// vorgegeben: `typography` erwartet Rollen mit `fontFamily`/`fontSize`, keine
// Strings. Erster Versuch schrieb `display: Fraunces` — zwei der vier Regeln
// blieben stumm, und zwar zu Recht.
const DESIGN_MD = `---
typography:
  display:
    fontFamily: Fraunces, serif
    fontSize: 48px
  body:
    fontFamily: Georgia, serif
    fontSize: 16px
  small:
    fontFamily: Georgia, serif
    fontSize: 14px
colors:
  ink: "#16202b"
  mut: "#5b6875"
  line: "#e2e6ea"
rounded:
  sm: 4px
  md: 12px
  lg: 16px
---
# Design-System der Eval
`;

function lauf(html, mitDesignMd = false) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-eval-'));
  try {
    const datei = path.join(ordner, 'index.html');
    fs.writeFileSync(datei, html);
    if (mitDesignMd) fs.writeFileSync(path.join(ordner, 'DESIGN.md'), DESIGN_MD);
    let roh = '';
    try {
      // cwd auf den Testordner: von dort sucht der Detektor die DESIGN.md.
      roh = execFileSync('node', [DETECT, datei, '--json'],
        { encoding: 'utf8', timeout: 120000, cwd: ordner });
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
// Selbst zaehlen, statt die Summe unten aus einer Formel zu rechnen.
//
// Bis 30.07.2026 stand dort `1 + Object.keys(FAELLE).length + 1`. Die Formel
// kennt nur die Faelle aus der FAELLE-Tabelle; jeder von Hand geschriebene
// Abschnitt lief mit, zaehlte aber nicht. Beim Zufuegen von drei Faellen fiel
// es auf: sie standen als [OK] im Bericht, und die Summe blieb bei 19/19.
// Ein Fehler in genau diesen Faellen wuerde `fehler` zwar hochzaehlen, aber die
// Bezugsgroesse waere falsch — "18/19" statt "21/22", also ein Bericht, der
// weniger Pruefungen behauptet, als er gemacht hat.
let gepruefte = 0;
const zeile = (ok, text, detail) => {
  gepruefte++;
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

// Typo-Skala in CSS-Variablen — beide Richtungen.
//
// Befund 31.07.2026: die Regel `flat-type-hierarchy` las nur fest
// geschriebene Groessen. Eine Seite mit ordentlicher Skala in Tokens
// (`--t-3xl: 3.25rem`, benutzt als `font-size: var(--t-3xl)`) zeigte ihr nur
// die vier Reste — gemeldet "11.5px … 16px, ratio 1.4:1", tatsaechlich 11.5px
// bis 52px, ratio 4.5:1. Ein Fehlalarm auf genau der Seite, die das G1-Tor
// gruen nennt: zwei Pruefer, eine Seite, widerspruechliches Urteil.
//
// Beide Faelle zusammen, weil ein Fix in eine Richtung hier besonders billig
// waere: wer die Variablen einfach ignoriert, hat keinen Fehlalarm mehr und
// findet auch keine echte flache Skala in Tokens.
{
  const gute = lauf(seite({
    style: ':root{--t-s:0.72rem;--t-l:1.25rem;--t-3xl:3.25rem}'
      + 'p{font-size:var(--t-s)}h2{font-size:var(--t-l)}h1{font-size:var(--t-3xl)}',
    body: '<h1>Gross</h1><h2>Mittel</h2><p>Klein</p>',
  }));
  zeile(!gute.ids.includes('flat-type-hierarchy'),
    'echte Skala in CSS-Variablen (0.72–3.25rem) -> kein Fehlalarm',
    gute.ids.includes('flat-type-hierarchy') ? 'die Variablen werden nicht aufgeloest' : null);

  const flache = lauf(seite({
    style: ':root{--t-s:0.9rem;--t-m:1rem;--t-l:1.1rem}'
      + 'p{font-size:var(--t-s)}h2{font-size:var(--t-m)}h1{font-size:var(--t-l)}',
    body: '<h1>Gross</h1><h2>Mittel</h2><p>Klein</p>',
  }));
  zeile(flache.ids.includes('flat-type-hierarchy'),
    'flache Skala in CSS-Variablen (0.9–1.1rem) -> gefunden',
    flache.ids.includes('flat-type-hierarchy') ? null
      : 'die Regel sieht durch Variablen hindurch nichts mehr');
}

// Schatten in CSS-Variablen — dieselbe Luecke, eine Regel weiter.
//
// Befund 31.07.2026, gefunden beim Nachklopfen aller Regeln, die rohe
// CSS-Werte lesen: `box-shadow: 0 0 60px rgba(99,102,241,.6)` auf dunklem
// Grund wurde gefunden, derselbe Wert als Token (`--glow: …` + `var(--glow)`)
// nicht. Design-Systeme legen Schatten IMMER in Tokens ab — die Regel war auf
// genau den Projekten blind, fuer die sie gebaut ist.
{
  const dunkel = 'body{background:#0a0a12;color:#eee}';
  const glowVar = lauf(seite({
    style: `:root{--glow:0 0 60px rgba(99,102,241,.6)}${dunkel}.k{box-shadow:var(--glow)}`,
    body: '<div class="k">A</div>',
  }));
  zeile(glowVar.ids.includes('dark-glow'),
    'farbiger Glow als CSS-Variable auf dunkler Seite -> gefunden',
    glowVar.ids.includes('dark-glow') ? null : 'die Variable wird nicht aufgeloest');

  // Auch der HINTERGRUND kommt aus einem Token. Die Aufloesung stand zuerst
  // hinter der Hintergrund-Pruefung — dann war die Regel weiter blind, sobald
  // `background: var(--bg)` dastand statt eines Hex-Werts. Vierter Fall
  // derselben Klasse, in einer Regel, die eine Stunde vorher schon repariert
  // schien.
  const beidesVar = lauf(seite({
    style: ':root{--bg:#0a0a12;--glow:0 0 60px rgba(99,102,241,.6)}'
      + 'body{background:var(--bg);color:#eee}.k{box-shadow:var(--glow)}',
    body: '<div class="k">A</div>',
  }));
  zeile(beidesVar.ids.includes('dark-glow'),
    'dunkler Grund UND Glow beide als Variable -> gefunden',
    beidesVar.ids.includes('dark-glow') ? null : 'die Aufloesung greift zu spaet in der Regel');

  // Gegenprobe: ein grauer Schatten ist kein Glow, auch nicht als Variable.
  // Ohne sie waere die Regel auch dadurch "bestanden", dass sie auf jeden
  // Schatten anschlaegt.
  const grauVar = lauf(seite({
    style: `:root{--s:0 4px 12px rgba(0,0,0,.12)}${dunkel}.k{box-shadow:var(--s)}`,
    body: '<div class="k">A</div>',
  }));
  zeile(!grauVar.ids.includes('dark-glow'),
    'grauer Schatten als CSS-Variable -> kein Fehlalarm',
    grauVar.ids.includes('dark-glow') ? 'jeder Schatten gilt jetzt als Glow' : null);
}

// Abstaende in CSS-Variablen — der dritte Fall derselben Blindheit.
//
// 14 Bloecke mit `padding: 16px` wurden als monotoner Rhythmus gefunden,
// dieselben 14 mit `padding: var(--s)` nicht. Ab hier loest eine gemeinsame
// Funktion (varsAufloesen) auf, statt es je Regel zu wiederholen.
{
  const bloecke = (klasse) => Array.from({ length: 14 }, (_, i) => `<div class="${klasse}${i}">x</div>`).join('');
  const gleich = lauf(seite({
    style: `:root{--s:16px}${Array.from({ length: 14 }, (_, i) => `.a${i}{padding:var(--s)}`).join('')}`,
    body: bloecke('a'),
  }));
  zeile(gleich.ids.includes('monotonous-spacing'),
    '14x derselbe Abstand als CSS-Variable -> gefunden',
    gleich.ids.includes('monotonous-spacing') ? null : 'die Variable wird nicht aufgeloest');

  // Gegenprobe: eine echte Abstands-Skala in Tokens ist kein monotoner
  // Rhythmus. Ohne sie waere die Regel auch dadurch "bestanden", dass sie auf
  // jedes Projekt mit Design-Tokens anschlaegt.
  const variiert = lauf(seite({
    style: ':root{--s1:8px;--s2:16px;--s3:32px;--s4:64px}'
      + Array.from({ length: 14 }, (_, i) => `.b${i}{padding:var(--s${(i % 4) + 1})}`).join(''),
    body: bloecke('b'),
  }));
  zeile(!variiert.ids.includes('monotonous-spacing'),
    'echte Abstands-Skala in Variablen (8/16/32/64) -> kein Fehlalarm',
    variiert.ids.includes('monotonous-spacing') ? 'jedes Token-Projekt gilt jetzt als monoton' : null);
}

// --- 2. Jede Regel einzeln ------------------------------------------------
console.log('\nJede Regel einzeln — die eigene ID MUSS im Bericht stehen:\n');
for (const [schluessel, f] of Object.entries(FAELLE)) {
  const id = f.ist || schluessel;
  const r = lauf(seite(f), f.designMd === true);
  if (r.kaputt) { zeile(false, `${id}  ${f.was}`, `Detektor kaputt: ${r.kaputt}`); continue; }
  zeile(r.ids.includes(id), `${id}  ${f.was}`,
    r.ids.includes(id) ? null : `${id} fehlt. Gemeldet: ${r.ids.join(', ') || '(nichts)'}`);
}

// --- 2b. Gegenprobe zur DESIGN.md ----------------------------------------
// Die vier design-system-Regeln koennen auch dadurch "bestehen", dass sie auf
// ALLES anschlagen — dann waere jedes Projekt mit erklaertem System unbenutzbar.
// Also: eine Seite, die ihrer eigenen DESIGN.md folgt, muss still bleiben.
console.log('\nEine Seite, die ihrer DESIGN.md folgt, darf nichts melden:\n');
{
  // Der Kasten unten benutzt die Linienfarbe — die muss also in der DESIGN.md
  // stehen. Erster Versuch hatte sie vergessen, und der Detektor meldete zu
  // Recht `design-system-color: #e2e6ea`. Wieder ein unvollstaendiger Testfall,
  // kein Fehler im Pruefer (wie schon bei M23/M4 in der Craft-Eval).
  const treu = lauf(seite({
    style: 'h1{font-family:Fraunces,serif;font-size:48px;color:#16202b}'
      + '.k{border-radius:12px;border:1px solid #e2e6ea;padding:8px}'
      + 'p{font-family:Georgia,serif;font-size:16px;color:#5b6875}',
    body: '<div class="k">Kasten nach Skala</div>',
  }), true);
  const ds = treu.ids.filter((x) => x.startsWith('design-system'));
  zeile(ds.length === 0, 'Fraunces/Georgia, 48px/16px, Radius 12px, erklaerte Farben',
    ds.length ? `Fehlalarm: ${ds.join(', ')}` : null);
}

// --- 2c. Nichts gelesen darf nicht wie sauber aussehen -------------------
// Gemessen am 30.07.2026: ein LEERER Ordner und diese geprueft saubere Seite
// lieferten byte-identische Ausgabe — `[]` und Exit 0. Der `diff` zwischen
// beiden Laeufen war leer. Wer "keine Anti-Patterns" liest, haelt die Seite
// fuer geprueft, obwohl keine einzige Datei geoeffnet wurde. Ursachen im
// Alltag: Pfad-Tippfehler im richtigen Elternordner, Quelle statt Build,
// vergessenes Unterverzeichnis.
//
// Geprueft wird der Exit-Code, nicht der Meldungstext: ein Test auf den
// Wortlaut waere auch gruen, wenn der Lauf danach trotzdem besteht — und
// genau das Bestehen ist der Schaden.
console.log('\nEin Ziel ohne pruefbare Dateien ist kein bestandener Lauf:\n');
{
  const leer = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-leer-'));
  const fehlt = path.join(leer, 'gibtsnicht');
  const rufe = (ziel) => spawnSync('node', [DETECT, ziel, '--json'],
    { encoding: 'utf8', timeout: 120000 });

  // Gar kein Ziel: `node detect.mjs` allein gab bis zum 31.07.2026 keine Zeile
  // aus und endete mit Exit 0. Wer den Pfad vergisst, bekam ein gruenes
  // Ergebnis ueber nichts — dieselbe Klasse wie der leere Ordner darunter, nur
  // ohne dass ueberhaupt ein Pfad im Spiel war.
  {
    const ohne = spawnSync('node', [DETECT], { encoding: 'utf8', timeout: 120000 });
    zeile(ohne.status === 2,
      `ohne Ziel -> Exit ${ohne.status}`,
      ohne.status === 2 ? null : 'nichts uebergeben, nichts gelesen — das darf nie Exit 0 sein');

    // Gegenprobe: --help hat bewusst kein Ziel und ist trotzdem kein Fehler.
    // Erster Versuch liess ihn mitreissen (Exit 2 auf die Frage nach der
    // Bedienung) — genau der Fehler, den tastatur-check und shot-sweep zwei
    // Runden vorher hatten.
    const hilfe = spawnSync('node', [DETECT, '--help'], { encoding: 'utf8', timeout: 120000 });
    zeile(hilfe.status === 0,
      `--help ohne Ziel -> Exit ${hilfe.status}`,
      hilfe.status === 0 ? null : 'Hilfe ist kein Fehlerfall');
  }

  // Tief verschachtelte Projekte muessen durchlaufen.
  //
  // Die Vorpruefung in detect.mjs zaehlt pruefbare Dateien, bevor der Detektor
  // startet. Ihre Tiefengrenze war eine Annahme (8 Ebenen) — gemessen am
  // 31.07.2026 lehnte sie ein Projekt mit neun Ebenen ab, obwohl der Detektor
  // den Treffer dort SELBST findet. Eine Wache, die enger sieht als das
  // Werkzeug dahinter, meldet Exit 2 fuer ein scanbares Projekt.
  //
  // Neun Ebenen sind nicht abwegig: monorepo/apps/web/src/components/ui/forms/
  // fields/date/ ist schon acht.
  {
    const tief = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-tief-'));
    const pfad = path.join(tief, ...Array.from({ length: 12 }, (_, i) => `e${i}`));
    fs.mkdirSync(pfad, { recursive: true });
    fs.writeFileSync(path.join(pfad, 'seite.html'),
      '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>T</title></head>'
      + '<body><h1>Titel</h1><p>Ein normaler Absatz mit genug Text.</p></body></html>');
    const t = rufe(tief);
    zeile(t.status === 0, 'Projekt mit 12 Ebenen laeuft durch',
      t.status === 0 ? null : `exit=${t.status} — die Vorpruefung sieht enger als der Detektor`);
    fs.rmSync(tief, { recursive: true, force: true });
  }

  // Die Grenze selbst: was passiert JENSEITS von 20 Ebenen?
  //
  // Sie bleibt (sie schuetzt gegen Endlos-Symlinks), aber die Meldung log:
  // "keine pruefbare Datei unter <pfad>" — obwohl welche da sind, nur tiefer.
  // Wer das liest, sucht den Fehler im Pfad statt in der Tiefe. Gemessen
  // 02.08.2026: 19 Ebenen laufen durch, 21 nicht.
  {
    const bau = (ebenen) => {
      const w = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-grenze-'));
      const pfad = path.join(w, ...Array.from({ length: ebenen }, (_, i) => `e${i}`));
      fs.mkdirSync(pfad, { recursive: true });
      fs.writeFileSync(path.join(pfad, 'seite.html'),
        '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>T</title></head>'
        + '<body><h1>Titel</h1><p>Ein normaler Absatz mit genug Text.</p></body></html>');
      return w;
    };

    const zuTief = bau(22);
    const rTief = rufe(zuTief);
    const ausTief = `${rTief.stdout || ''}${rTief.stderr || ''}`;
    zeile(/20 Verzeichnisebenen/.test(ausTief),
      'jenseits der Tiefengrenze nennt die Meldung die Grenze',
      'meldet nur "keine pruefbare Datei" — wer das liest, sucht den Fehler im Pfad');
    fs.rmSync(zuTief, { recursive: true, force: true });

    // Gegenrichtung: innerhalb der Grenze darf der Hinweis NICHT erscheinen.
    // Ein Hinweis in jedem Bericht wird ueberlesen.
    const flach = bau(3);
    const rFlach = rufe(flach);
    const ausFlach = `${rFlach.stdout || ''}${rFlach.stderr || ''}`;
    zeile(!/20 Verzeichnisebenen/.test(ausFlach),
      'innerhalb der Grenze schweigt der Hinweis',
      'meldet die Tiefengrenze, wo sie nie erreicht wurde');
    fs.rmSync(flach, { recursive: true, force: true });
  }

  const a = rufe(leer);
  zeile(a.status === 2, 'leerer Ordner endet mit Exit 2',
    a.status === 2 ? null
      : `exit=${a.status}, Ausgabe: ${(a.stdout || '').trim().slice(0, 20) || '(leer)'} — nicht unterscheidbar von einer sauberen Seite`);

  const b = rufe(fehlt);
  zeile(b.status === 2, 'fehlendes Ziel endet mit Exit 2', b.status === 2 ? null : `exit=${b.status}`);

  // Gegenrichtung: der Waechter darf echte Laeufe nicht abwuergen. Ohne diesen
  // Fall koennte er auf ALLES anschlagen und beide Faelle oben bestehen.
  const echt = fs.mkdtempSync(path.join(os.tmpdir(), 'detect-echt-'));
  fs.writeFileSync(path.join(echt, 'index.html'),
    '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>T</title></head>'
    + '<body><h1>Titel</h1><p>Ein normaler Absatz mit genug Text.</p></body></html>');
  const c = rufe(echt);
  zeile(c.status === 0, 'echte Datei laeuft weiter durch (Exit 0)', c.status === 0 ? null : `exit=${c.status}`);

  fs.rmSync(leer, { recursive: true, force: true });
  fs.rmSync(echt, { recursive: true, force: true });
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
// Nachgezogen 02.09.2026 mit dem Detektor-Sync auf impeccable v4.0.5: die
// Suche las nur `id:` in `checks.mjs`. Die dortigen Pruefungen melden ihre
// Funde aber teils als `type:`, und `script-error` liegt gar nicht in
// checks.mjs, sondern im URL-Motor. Vier neue Browser-Regeln standen damit als
// "in KEINEM Pfad erreichbar" da, obwohl der Browser-Pfad sie prueft — eine
// Falschmeldung der Wache, nicht eine Luecke im Detektor.
const NUR_IM_BROWSER = (() => {
  const quellen = [
    path.join(SKILL, 'scripts', 'detector', 'rules', 'checks.mjs'),
    path.join(SKILL, 'scripts', 'detector', 'engines', 'browser', 'detect-url.mjs'),
  ];
  const ids = new Set();
  for (const q of quellen) {
    if (!fs.existsSync(q)) continue;
    const txt = fs.readFileSync(q, 'utf8');
    for (const m of txt.matchAll(/(?:id|type): '([a-z0-9-]+)'/g)) ids.add(m[1]);
  }
  return ids;
})();
const offenRegex = offen.filter((x) => !NUR_IM_BROWSER.has(x));
console.log(`  davon ${offen.length - offenRegex.length} nur ueber den Browser-Pfad erreichbar (rules/checks.mjs — braucht gerendertes DOM)`);
console.log(`  ${offenRegex.length} im Datei-Modus herstellbar und noch ohne Fixture`);

console.log('\n  Eine Regel ohne Fixture ist keine falsche Regel — nur eine, von der');
console.log('  niemand weiss, ob sie feuert. Die Liste steht hier, damit sie nicht');
console.log('  unsichtbar bleibt.');

// Die Gesamtrechnung ueber BEIDE Pfade — als Pruefung, nicht nur als Bericht.
//
// Die Zahlen oben stehen einzeln da und laden zu einem Trugschluss ein: "13 von
// 46 belegt" klingt nach einer riesigen Luecke, "0 im Datei-Modus offen" nach
// Vollstaendigkeit. Keins von beidem stimmt allein. Erst zusammen mit dem
// Browser-Pfad ergibt sich das Bild, und das hat am 30.07.2026 niemand
// nachgerechnet — ich musste es von Hand tun:
//
//   46 Regeln = 9 nur Datei-Pfad + 33 nur Browser-Pfad + 4 in beiden
//
// Solange die Rechnung aufgeht, ist keine Regel ungeprueft. Geht sie NICHT auf,
// verschieben die zwei Evals die Verantwortung gegenseitig aufeinander und
// keine deckt die Regel wirklich ab — genau die Luecke, die zwischen zwei
// Pruefern entsteht und in keinem von beiden auffaellt.
//
// Geprueft wird hier nur die Erreichbarkeit, nicht ob die Browser-Eval ihre
// Fixtures wirklich hat. Das misst sie selbst (37/37 am 30.07.2026); es hier
// nachzubauen hiesse, ihre Fixture-Liste ein zweites Mal zu pflegen.
{
  const ungedeckt = alleIds.filter((id) => !belegt.has(id) && !NUR_IM_BROWSER.has(id));
  zeile(ungedeckt.length === 0,
    `alle ${alleIds.length} Registry-Regeln sind einem Pfad zugeordnet`,
    ungedeckt.length
      ? `${ungedeckt.length} in KEINEM Pfad erreichbar: ${ungedeckt.join(', ')}`
      : null);
}

// Sicherung gegen die Gegenrichtung: wenn ein ganzer Abschnitt still ausfaellt
// (fruehes `continue`, verschluckte Ausnahme), zaehlt `gepruefte` einfach
// weniger — und "12/12 wie erwartet" saehe wieder gruen aus. Die Faelle aus der
// FAELLE-Tabelle sind die bekannte Untergrenze; sie MUESSEN alle gelaufen sein.
const MINDESTENS = Object.keys(FAELLE).length + 1;   // + Kontrolle
if (gepruefte < MINDESTENS) {
  console.log(`\nNur ${gepruefte} Pruefungen gelaufen, mindestens ${MINDESTENS} erwartet.`);
  console.log('Ein Abschnitt ist still ausgefallen — das ist kein bestandener Lauf.');
  process.exit(2);
}
console.log(`\n${gepruefte - fehler}/${gepruefte} wie erwartet.`);
if (fehler) {
  console.log('Der Detektor urteilt nicht wie behauptet — und er ist eine harte Ship-Bedingung.');
  process.exit(1);
}
console.log('Jede hier gepruefte Regel feuert, die saubere Seite bleibt still.');
