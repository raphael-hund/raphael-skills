#!/usr/bin/env node
/**
 * run-verweise-check.mjs — zeigt jeder genannte Pfad auf etwas Echtes?
 *
 * Der `web`-Skill ist ein Dach: er verweist auf 27 eigene References, auf den
 * `design`-Skill, auf `copywriting`, auf `code-review` und auf Rubriken im
 * Betriebs-Repo. Jeder dieser Pfade ist eine Behauptung — und ein toter
 * Verweis faellt beim Lesen nicht auf, sondern erst, wenn jemand mitten in der
 * Arbeit eine Datei sucht, die es nicht gibt.
 *
 * Befund 30.07.2026 beim ersten Lauf: kein einziger toter Pfad, aber DREI
 * Fehlalarme in meinem eigenen Muster, alle aus derselben Wurzel — ich habe
 * Pfade gegen den falschen Wurzelordner geprueft:
 *
 *   design/references/…      liegt in skills/design, nicht skills/eigene/design
 *   copywriting/references/… liegt in skills/eigene, eine Ebene tiefer
 *   evals/rubrics/web.md     liegt im BETRIEBS-Repo, nicht im Skill
 *
 * Der dritte war der lehrreichste: `evals/rubrics/web.md` sah aus wie ein
 * kaputter Skill-Pfad und ist in Wahrheit die Rubrik in
 * /root/raphael-command-center/evals/rubrics/ — genau so, wie der eval-Skill es
 * vorgibt ("Rubriken unter evals/rubrics/ des jeweiligen Repos"). Wer hier
 * "repariert", ohne nachzusehen, macht einen richtigen Verweis kaputt.
 *
 * Deshalb prueft dieser Lauf jeden Pfad gegen ALLE plausiblen Wurzeln und
 * meldet nur, was nirgends existiert.
 *
 *   node evals/run-verweise-check.mjs
 *
 * Exit 0 = jeder Verweis loest auf. Exit 1 = mindestens einer zeigt ins Leere.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');                    // skills/eigene/web
const EIGENE = path.join(WEB, '..');                  // skills/eigene
const SKILLS = path.join(EIGENE, '..');               // skills

// Welcher Skill geprueft wird, ist ein Parameter — nicht festverdrahtet.
//
// Am 30.07.2026 habe ich die Verweise des design-Skills von Hand nachgezaehlt,
// weil diese Eval nur `web` kannte. Ergebnis des Handlaufs: ein "toter" Verweis,
// der keiner war — mein grep griff `references/floskel-verbote.md` und pruefte
// gegen den design-Ordner, obwohl im Text `copywriting/references/...` steht.
// Genau der Fehlalarm, den der Kopf dieser Datei schon dreimal beschreibt.
//
// Handarbeit wiederholt den Fehler; ein Parameter erledigt es einmal.
//   node evals/run-verweise-check.mjs                  # web (Standard)
//   node evals/run-verweise-check.mjs --skill design   # jeder andere
const skillArg = process.argv.indexOf('--skill');
const SKILL_NAME = skillArg >= 0 ? process.argv[skillArg + 1] : 'web';
const ZIEL = SKILL_NAME === 'web' ? WEB
  : (fs.existsSync(path.join(EIGENE, SKILL_NAME)) ? path.join(EIGENE, SKILL_NAME)
    : path.join(SKILLS, SKILL_NAME));
if (!fs.existsSync(path.join(ZIEL, 'SKILL.md'))) {
  console.error(`Kein SKILL.md unter ${ZIEL} — Skill "${SKILL_NAME}" nicht gefunden.`);
  process.exit(2);
}
const REPO = '/root/raphael-command-center';          // Betriebs-Repo
const BRAIN = '/root/raphael-brain';                   // Wissens-Repo (Router-Ziele)

// Reihenfolge egal — ein Pfad gilt als gut, sobald EINE Wurzel ihn aufloest.
// Manche Verweise nennen eine Datei, die als `.example` daneben liegt
// (`rules.ru.mjs` -> `rules.ru.mjs.example`, ausdruecklich "kept as a template").
// Der Text beschreibt sie korrekt; nur der Dateiname im Fliesstext laesst die
// Endung weg. Sechster Fehlalarm desselben Laufs.
const AUCH_ALS_BEISPIEL = true;

const WURZELN = [
  ['im Skill', ZIEL],
  ['Nachbar-Skill (eigene/)', EIGENE],
  ['Skill-Wurzel', SKILLS],
  // Ein Verweis kann das `skills/`-Praefix SELBST mitbringen
  // (`skills/design/references/taste-kern.md`). Gegen SKILLS geprueft entstuende
  // `skills/skills/design/...`. Beide Schreibweisen sind im Bestand ueblich und
  // beide richtig — nur eine Wurzel kannte die Eval. Befund 30.07.2026 beim Lauf
  // ueber alle 23 Skills.
  ['Skills-Elternebene', path.dirname(SKILLS)],
  ['Betriebs-Repo', REPO],
  ['absolut', '/'],
];

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// Dateien, die der Skill selbst ausmacht.
function markdownDateien(unter) {
  const raus = [];
  for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(unter, e.name);
    if (e.isDirectory()) raus.push(...markdownDateien(p));
    else if (e.name.endsWith('.md')) raus.push(p);
  }
  return raus;
}

// Nur PFADE, nicht blosse Dateinamen. Der Unterschied ist entscheidend:
// `OFFER.md` im Satz "das Dossier aus OFFER.md" ist eine Nennung, keine
// Wegbeschreibung — und liegt je nach Kunde woanders. `references/x.md` dagegen
// behauptet einen Ort und ist pruefbar.
//
// Erster Versuch nahm jeden Dateinamen und meldete 118 "tote Verweise", davon
// praktisch alle falsch: OFFER.md, team.html, lib/utils.ts, a6-ohne-bildwelt.html
// — Beispiele, Kundendateien, Fixture-Namen im Fliesstext. Ein Pruefer mit 118
// Fehlalarmen wird nicht gelesen, er wird geloescht.
//
// Also: mindestens ein Schraegstrich, und der erste Teil muss ein Ordner sein,
// den es in diesem Zusammenhang wirklich gibt.
const PFAD_RE = /(?:^|[\s`("'|])((?:\.{0,2}\/)?(?:references|scripts|evals|vendor|design|copywriting|impeccable|taste|ui-ux|eval|code-review|methodik|skills)\/[A-Za-z0-9_./-]*\.(?:md|mjs|js|py|json|html|tsx?|sh))/g;

// Was bewusst nicht existieren muss.
const AUSNAHMEN = [
  /^https?:/,                    // URLs
  /^package\.json$/,             // generische Nennung
  /^index\.html$/,               // Beispiel-Dateiname
  /<|>|\{|\}/,                   // Platzhalter wie <datei>.md
  /^client-/,                    // Kundenrepos, die es hier nicht gibt
  /^[a-z-]+\.(tsx?|jsx?)$/,      // Beispiel-Komponenten im Fliesstext
  // Dateien in FREMDEN Repos, die per Namen zitiert werden. Sie sollen hier
  // nicht existieren; der Zusatz "im Vendor-Repo" steht jeweils daneben.
  /^skills\/improve\//,
  // Ebenso fremd: `skills/taste-skill/SKILL.md` steht in VENDORING.md als Angabe,
  // WOHER der Skill kommt. Hier heisst der Ordner `eigene/taste`; der zitierte
  // Pfad ist der des Ursprungs-Repos und soll gar nicht aufloesen.
  /^skills\/taste-skill\//,
  // Eine Datei, die als `.example` daneben liegt. `rules.ru.mjs` ist im Text
  // ausdruecklich "a shipped Russian example (kept as a template, not wired in)"
  // — vorhanden ist `rules.ru.mjs.example`. Der Fliesstext laesst die Endung weg,
  // und das ist richtig so: die Datei HEISST rules.ru.mjs, sobald man sie nutzt.
  //
  // Bewusst eng: nur wenn die .example-Fassung wirklich existiert. Sonst waere es
  // ein Filter, der jeden toten .mjs-Verweis verschluckt.
  (pfad, ziel) => /\.mjs$/.test(pfad)
    && fs.existsSync(path.join(ziel, `${pfad}.example`)),
];

const dateien = markdownDateien(ZIEL);
const gefunden = new Map();      // pfad -> [quelle:zeile]
for (const f of dateien) {
  const rel = path.relative(ZIEL, f);
  const alleZeilen = fs.readFileSync(f, 'utf8').split('\n');
  // Codebloecke sind KEINE Verweisliste.
  //
  // Befund 30.07.2026 beim ersten Lauf gegen `design`: sieben "tote" Verweise,
  // kein einziger echt. Fuenf davon standen in einem Verzeichnisbaum, dessen
  // Wurzel zwei Zeilen darueber steht:
  //
  //     design/vendor/ui-ux-db/
  //       scripts/search.py        # CLI
  //
  // Die Eval las `scripts/search.py` als eigenstaendigen Pfad — die Datei liegt
  // korrekt unter vendor/. Ein Baum beschreibt eine Struktur, er verweist nicht.
  // Wer hier "repariert", zerschiesst eine richtige Doku.
  // Relativ zum ORDNER DER VERWEISENDEN DATEI, nicht nur zur Skill-Wurzel.
  //
  // `vendor/ui-ux-db/references/pro-rules.md` nennt `references/quick-reference.md`
  // — die Datei liegt direkt daneben, der Verweis ist aus Sicht seines Ordners
  // korrekt. Ein vendorierter Unterbaum hat seine eigene Wurzel; wer nur gegen
  // die Skill-Wurzel prueft, erklaert jeden internen Verweis fuer tot.
  const eigenerOrdner = path.dirname(f);
  let imCodeblock = false;
  for (const [i, zeile_] of alleZeilen.entries()) {
    if (/^\s*```/.test(zeile_)) { imCodeblock = !imCodeblock; continue; }
    if (imCodeblock) continue;
    // Herkunftsangaben laufen oft ueber zwei Zeilen:
    //   **Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
    //   `skills/cro/SKILL.md` (MIT-Lizenz).
    // Der Pfad steht dann in Zeile 2, das Wort "Herkunft" in Zeile 1. Ein Test
    // auf die EINE Zeile findet ihn nicht — dritter Fehlalarm-Schub desselben
    // Laufs. Also die Vorzeile mitlesen.
    const umfeld = [alleZeilen[i - 3], alleZeilen[i - 2], alleZeilen[i - 1], zeile_]
      .filter((x) => x !== undefined).join('\n');
    PFAD_RE.lastIndex = 0;
    let m;
    // Herkunftsangaben sind KEINE lokalen Verweise. "kondensiert aus
    // `coreyhaines/marketingskills`, `skills/cro/SKILL.md`" nennt eine Datei in
    // einem FREMDEN Repo — die soll hier nicht existieren, und ihr Fehlen ist
    // kein Fehler. Zweiter Fehlalarm-Schub am 30.07.2026: sechs von zehn
    // Restmeldungen waren genau das (skills/cro, skills/ab-testing,
    // skills/improve, skills/site-architecture, skills/ops-and-setup/…).
    // Wer die "reparieren" will, erfindet Pfade fuer Repos, die es hier nie gab.
    // Auch ENGLISCH. Die vendorierten Dateien unter references/vendor/ tragen
    // ihre Herkunft auf Englisch ("Vendored near-verbatim from
    // coreyhaines31/marketingskills, `skills/ads/references/rsa-output-spec.md`
    // (MIT license)"). Die deutsche Wortliste traf davon nichts — vierter
    // Fehlalarm-Schub am 30.07.2026, diesmal ueber vier Skills verteilt
    // (ads, ads-video, offers, seo).
    //
    // Und: der Pfad steht dort DREI Zeilen unter dem Wort "Vendored", nicht
    // eine. Ein Zitat laeuft ueber so viele Zeilen, wie der Satz braucht.
    const istHerkunft = /Herkunft|Quelle|kondensiert|destilliert|vendoriert|Original|github\.com/i
      .test(umfeld)
      || /vendored|adapted from|derived from|upstream|MIT licen[sc]e|near-verbatim/i.test(umfeld);
    while ((m = PFAD_RE.exec(zeile_)) !== null) {
      const p = m[1];
      if (AUSNAHMEN.some((a) => (typeof a === 'function' ? a(p, ZIEL) : a.test(p)))) continue;
      if (istHerkunft) continue;
      if (!gefunden.has(p)) gefunden.set(p, []);
      gefunden.get(p).push(`${rel}:${i + 1}`);
    }
  }
}

// `von` ist der Ordner der verweisenden Datei — als Wurzel VOR allen anderen.
// Erster Versuch setzte ihn direkt in die Schleife: `loest()` ist eine eigene
// Funktion und kannte die Variable nicht, beide Skills brachen mit
// ReferenceError ab (30.07.2026). Ein Fix, der die Eval unbrauchbar macht,
// faellt nur auf, wenn man sie danach laufen laesst.
function loest(p, von = null) {
  // Ein vendorierter Unterbaum hat seine EIGENE Wurzel. `pro-rules.md` liegt in
  // vendor/ui-ux-db/references/ und nennt `references/quick-reference.md` — das
  // ist relativ zu vendor/ui-ux-db/, nicht zum Ordner der Datei.
  //
  // Erster Versuch nahm den Dateiordner und suchte references/references/… —
  // nachgemessen, nicht geraten. Darum werden vom Dateiordner aus auch die
  // Elternordner mitprobiert, bis zur Skill-Wurzel.
  const kette = [];
  let cur = von;
  while (cur && cur.startsWith(SKILLS) && cur !== SKILLS) {
    kette.push([`relativ zu ${path.relative(SKILLS, cur) || '.'}`, cur]);
    cur = path.dirname(cur);
  }
  const wurzeln = [...kette, ...WURZELN];
  for (const [name, wurzel] of wurzeln) {
    if (fs.existsSync(path.resolve(wurzel, p))) return name;
  }
  return null;
}

console.log('\nVerweise-Check — zeigt jeder genannte Pfad auf etwas Echtes?\n');
const tot = [];
const proWurzel = new Map();
for (const [p, stellen] of gefunden) {
  const wo = loest(p, path.dirname(path.join(ZIEL, (stellen[0] || "").split(":")[0])));
  if (wo) proWurzel.set(wo, (proWurzel.get(wo) || 0) + 1);
  else tot.push([p, stellen]);
}

console.log(`${gefunden.size} genannte Pfade in ${dateien.length} Markdown-Dateien.\n`);
for (const [name, n] of [...proWurzel].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)} aufgeloest ${name}`);
}
console.log('');

zeile(tot.length === 0, `${tot.length} Verweis(e) zeigen ins Leere`,
  tot.length ? tot.slice(0, 12).map(([p, s]) => `${p}  (${s[0]})`).join('\n         ') : null);

// Zweite Frage, die eine Pfad-Pruefung allein nicht stellt: existieren die
// Werkzeuge, die der Skill in seinen completion_criteria VERSPRICHT? Ein
// Kriterium, das ein fehlendes Skript nennt, ist nie erfuellbar.
// Dritte Frage: laedt der Skill auch, was er als verbindlich bezeichnet?
//
// `loads:` im Kopf bestimmt, was beim Aufruf mitkommt. Eine Datei, die im Text
// als Pflicht steht, aber nicht in `loads:`, wird beim Arbeiten nicht gelesen —
// sie ist da, sie stimmt, und sie wirkt nicht.
//
// Befund 30.07.2026: `references/screenshot-kritik-loop.md` stand zweimal in der
// web-SKILL.md ("bei jeder visuellen Arbeit verbindlich") und fehlte in loads:.
// Genau die Datei, die den Ablauf fuer die haerteste Regel des Skills beschreibt.
//
// Bewusst nur WARNUNG statt Fehler: nicht jede genannte Datei muss vorgeladen
// werden — eine Referenz, die nur ein Sonderfall braucht, gehoert nicht in den
// Kopf. Der Lauf nennt sie, die Entscheidung bleibt beim Menschen.
console.log('\nWas der Text als verbindlich nennt, sollte in loads: stehen:\n');
{
  const roh = fs.readFileSync(path.join(ZIEL, 'SKILL.md'), 'utf8');
  const kopfEnde = roh.indexOf('\n---', 4);
  const kopf = kopfEnde > 0 ? roh.slice(0, kopfEnde) : '';
  // Nur der loads:-BLOCK, nicht der ganze Frontmatter-Kopf.
  //
  // Bis 30.07.2026 wurde der gesamte Kopf nach `references/...` durchsucht. Der
  // taste-Skill hat `loads: []` — leer — und trotzdem meldete die Wache
  // "references/taste-kern.md in loads:, aber NICHT VORHANDEN". Der Treffer
  // stammte aus dem Feld `source:`, einer HERKUNFTSANGABE:
  //
  //   source: pointer — taste-Kern ist vendored im design-Skill
  //     (skills/design/references/taste-kern.md aus Leonxlnx/taste-skill, MIT)
  //
  // Der Pfad ist vollstaendig und richtig; mein Muster griff nur den Endteil und
  // suchte ihn im falschen Skill. Ein Waechter, der eine korrekte Quellenangabe
  // als fehlende Datei meldet, bestraft die Sorgfalt — dieselbe Ueberlegung wie
  // bei der Abgrenzungs-Erkennung in der Fliesstext-Pruefung weiter unten.
  // YAML kennt beide Schreibweisen, und beide kommen im Bestand vor:
  //   loads:                        loads: [references/a.md, references/b.md]
  //     - references/a.md
  // Mein erstes Muster kannte nur die mehrzeilige Form. copywriting nutzt die
  // einzeilige — die Zaehlung fiel dort von 10 auf 0, und die Wache meldete
  // prompt zehn "im Text genannt, aber nicht geladen". Ein Fehlalarm, der aus
  // einer verschwundenen Grundmenge entsteht, sieht aus wie ein echter Befund.
  // (Denselben Fehler hatte ich am 30.07.2026 schon einmal an dieser Stelle:
  // ein sed erwartete mehrzeilig und meldete sechs Skills falsch.)
  const loadsBlock = (kopf.match(/^loads:\s*\n((?:[ \t]+-[^\n]*\n)*)/m) || [])[1]
    || (kopf.match(/^loads:\s*\[([^\]]*)\]/m) || [])[1] || '';
  const geladen = new Set([...loadsBlock.matchAll(/references\/[a-z0-9./-]+\.(?:md|html)/g)].map((m) => m[0]));
  const refOrdner = path.join(ZIEL, 'references');
  const imOrdner = fs.existsSync(refOrdner)
    ? fs.readdirSync(refOrdner).filter((f) => f.endsWith('.md')) : [];
  // Nur Dateien, die der Text auch WIRKLICH nennt — eine ungenutzte Referenz im
  // Ordner ist kein Befund, sondern Vorrat.
  const rumpf = kopfEnde > 0 ? roh.slice(kopfEnde) : roh;
  const genanntNichtGeladen = imOrdner
    .filter((f) => !geladen.has(`references/${f}`) && rumpf.includes(f));
  // "10 in loads:, 4 im Ordner" las sich wie eine Luecke von sechs Dateien.
  // Nachgemessen (30.07.2026, ads): alle zehn existieren — sechs liegen in
  // Unterordnern (references/vendor/...), und `readdirSync` liest nur die
  // oberste Ebene. Zwei Zahlen nebeneinander, die verschiedene Mengen zaehlen,
  // laden zu genau dem Fehlschluss ein, den ich hier eine Stunde lang verfolgt
  // habe. "oberste Ebene" dazuschreiben kostet vier Woerter.
  //
  // Wichtiger: die Pruefung fragte nur nach "genannt, aber nicht geladen".
  // Die Gegenrichtung — GELADEN, aber nicht vorhanden — fehlte, und die ist
  // die schlimmere: eine Referenz in loads:, die es nicht gibt, laedt beim
  // Start ins Leere und niemand merkt es.
  const geladenFehlt = [...geladen].filter((r) => !fs.existsSync(path.join(ZIEL, r)));
  zeile(genanntNichtGeladen.length === 0 && geladenFehlt.length === 0,
    `${geladen.size} Referenz(en) in loads:, ${imOrdner.length} direkt im Ordner (ohne Unterordner)`,
    [
      genanntNichtGeladen.length
        ? `im Text genannt, aber nicht geladen: ${genanntNichtGeladen.join(', ')}` : null,
      geladenFehlt.length
        ? `in loads:, aber NICHT VORHANDEN: ${geladenFehlt.join(', ')}` : null,
    ].filter(Boolean).join(' | ') || null);
}

// Vierte Frage: existiert jeder Skill aus `requires_skills:`?
//
// Ein Skill, der einen nicht vorhandenen verlangt, ist beim Laden kaputt — und
// anders als bei `loads:` faellt das nicht durch einen Pfad auf, weil dort nur
// Namen stehen.
//
// BEWUSST NICHT GEPRUEFT: ob der verlangte Skill im Text vorkommt. Am 30.07.2026
// nachgemessen — sieben Skills schienen `eval` bzw. `offers` unbenutzt zu
// fuehren, alle sieben Fehlalarm: `eval` wird ueber sein GATE G2 genutzt, nie
// ueber den Namen; `offers` steckt im Kundendossier `OFFER.md`. Eine Abhaengigkeit
// zeigt sich an ihrer Wirkung, nicht an ihrer Nennung. Wer hier "aufraeumt",
// entfernt eine Abhaengigkeit, die taeglich benutzt wird.
// Fuenfte Frage: ruft irgendwer die Skripte auf, die im Skill liegen?
//
// Ein Skript ohne Aufrufer ist nicht kaputt, aber es ist eine Behauptung: es
// steht da, als wuerde es gebraucht. Beim naechsten Umbau pflegt es jemand mit,
// ohne dass sich etwas aendert.
//
// Befund 30.07.2026 (design-Skill): drei Dateien unter scripts/lib/ mit
// insgesamt vier Exporten, null Nutzer — design-parser.mjs (parseDesignMd),
// is-generated.mjs (isGeneratedFile), target-args.mjs (parseTargetPath,
// parseTargetOptions). Geprueft mit UND ohne Dateiendung, weil ESM-Importe die
// Endung weglassen duerfen.
//
// NUR WARNUNG, und bewusst nichts geloescht: das ist vendorierter Detektor-Code.
// Die Doktrin ist eindeutig — fremden Dead Code nennen, nicht loeschen. Vielleicht
// gehoert er zu einem Pfad, den dieser Skill nicht nutzt, das Upstream-Projekt
// aber schon; ein Loeschen macht das naechste Vendoring-Update zum Konflikt.
console.log('\nSkripte im Skill haben einen Aufrufer:\n');
{
  const skriptOrdner = path.join(ZIEL, 'scripts');
  if (!fs.existsSync(skriptOrdner)) {
    zeile(true, 'keine scripts/ — nichts zu pruefen');
  } else {
    const alle = [];
    const geheDurch = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const pfad = path.join(d, e.name);
        if (e.isDirectory()) geheDurch(pfad);
        else if (e.name.endsWith('.mjs')) alle.push(pfad);
      }
    };
    geheDurch(skriptOrdner);
    // Alles lesen, was aufrufen KOENNTE: Skill-Doku und alle anderen Skripte.
    const suchtext = [...dateien, ...alle].map((f) => {
      try { return fs.readFileSync(f, 'utf8'); } catch { return ''; }
    });
    const ohneAufrufer = alle.filter((f) => {
      const n = path.basename(f);
      const ohneEndung = n.replace(/\.mjs$/, '');
      return !suchtext.some((txt, i) =>
        [...dateien, ...alle][i] !== f
        && (txt.includes(n) || new RegExp(`['"\\./]${ohneEndung}['"]`).test(txt)));
    }).map((f) => path.relative(skriptOrdner, f));
    // Bekannter, bewusst geduldeter Bestand. Ein Wächter, der dauerhaft rot
    // steht, wird abgeschaltet und nimmt die echten Befunde mit — dieselbe
    // Ueberlegung wie bei den Falsch-Positiven im deutschen Regelsatz.
    //
    // Diese drei sind vendorierter Detektor-Code (30.07.2026 nachgemessen: vier
    // Exporte, null Nutzer, mit und ohne Dateiendung geprueft). Sie bleiben
    // liegen, weil fremder Dead Code genannt und nicht geloescht wird — ein
    // Loeschen macht das naechste Vendoring-Update zum Konflikt.
    const GEDULDET = new Set([
      'lib/design-parser.mjs', 'lib/is-generated.mjs', 'lib/target-args.mjs',
    ]);
    const neu = ohneAufrufer.filter((f) => !GEDULDET.has(f));
    const bekannt = ohneAufrufer.filter((f) => GEDULDET.has(f));
    zeile(neu.length === 0,
      `${alle.length} Skript(e), ${alle.length - ohneAufrufer.length} mit Aufrufer`
        + (bekannt.length ? `, ${bekannt.length} bekannt ohne (vendoriert)` : ''),
      neu.length ? `NEU ohne Aufrufer: ${neu.join(', ')}` : null);
  }
}

// --- Benutzt jede Datei nur, was sie auch importiert? -------------------
//
// `node --check` prueft die GRAMMATIK, nicht die Bedeutung: ein fehlender
// Import meldet "Syntax ok" und knallt erst zur Laufzeit — im schlimmsten Fall
// mitten in einem 15-Minuten-Lauf, nach den ersten zwanzig gruenen Faellen.
//
// Mir am 30.07.2026 ZWEIMAL passiert: `spawnSync` benutzt, aber `execFileSync`
// importiert; spaeter `os.tmpdir()` ohne `import os`. Beide Male sagte die
// Syntaxpruefung "ok", beide Male fiel es nur beim Durchsehen der Import-Zeilen
// auf. Eine Pruefung, die man von Hand macht, macht man irgendwann nicht mehr.
//
// Bewusst eng: nur die Node-Kernmodule als Namensraum-Objekt (fs.x(), os.x(),
// path.x()). Benannte Importe zu pruefen hiesse, jede lokale Funktion mit
// gleichem Namen als Fehlalarm zu melden — und ein Waechter mit Fehlalarmen
// wird abgeschaltet.
console.log('\nJede Datei importiert, was sie benutzt:\n');
{
  const KERN = ['fs', 'os', 'path', 'crypto', 'util', 'zlib'];
  const dateienJs = [];
  const sammle = (unter) => {
    if (!fs.existsSync(unter)) return;
    for (const e of fs.readdirSync(unter, { withFileTypes: true })) {
      if (e.name === 'node_modules' || e.name.startsWith('.') || e.name === 'vendor') continue;
      const p = path.join(unter, e.name);
      if (e.isDirectory()) sammle(p);
      else if (e.name.endsWith('.mjs')) dateienJs.push(p);
    }
  };
  for (const u of ['scripts', 'evals']) sammle(path.join(ZIEL, u));

  const fehlend = [];
  for (const f of dateienJs) {
    const txt = fs.readFileSync(f, 'utf8');
    // Kommentare raus: sie nennen Modulnamen im Fliesstext ("os.tmpdir() ohne
    // import os"), und ein Waechter, der seine eigene Begruendung als Befund
    // liest, ist genau der Fehlalarm, den er verhindern soll.
    const code = txt.split('\n')
      .filter((z) => !z.trim().startsWith('//') && !z.trim().startsWith('*'))
      .join('\n');
    // Beide Anfuehrungsarten. Mein erster Handlauf kannte nur ' und meldete
    // deshalb dna-scaffold.mjs als kaputt — die Datei nutzt ".
    const importiert = new Set(
      [...txt.matchAll(/import\s+(\w+)\s+from\s+['"]node:(\w+)['"]/g)].map((m) => m[1]),
    );
    for (const mod of KERN) {
      if (new RegExp(`\\b${mod}\\.\\w+\\(`).test(code) && !importiert.has(mod)) {
        fehlend.push(`${path.relative(ZIEL, f)}: ${mod}`);
      }
    }
  }
  zeile(fehlend.length === 0, `${dateienJs.length} Datei(en) auf fehlende Kernmodul-Importe geprueft`,
    fehlend.length ? `benutzt ohne Import: ${fehlend.join(' | ')}` : null);

  // Zweite Haelfte: BENANNTE Importe (`spawnSync`, `readFileSync`).
  //
  // Die Pruefung oben faengt nur Namensraum-Objekte (os.tmpdir()). Von meinen
  // zwei Fehlern am 30.07.2026 war das der zweite; der ERSTE war ein benannter
  // Import — `spawnSync(...)` benutzt, aber nur `execFileSync` importiert.
  // Gemessen: `spawnSync` aus dem Import von run-ordner-check entfernt, die
  // Wache oben blieb gruen und `node --check` ebenfalls. Die haeufigere Haelfte
  // war offen.
  //
  // Der Grund fuer die Zurueckhaltung war richtig: ein naiver Namensabgleich
  // meldet jede lokale Funktion gleichen Namens. Die Loesung ist, nur Namen zu
  // pruefen, die WIRKLICH aus einem Kernmodul stammen — und die kennt Node
  // selbst. Keine Liste zum Pflegen, kein Raten.
  //
  // Ausgelassen werden Namen, die auch als lokale Funktion plausibel sind
  // (`format`, `join`, `parse`, `resolve`, `inspect`): dort ueberwiegt die
  // Fehlalarm-Gefahr den Nutzen.
  const HEIKEL = new Set(['format', 'join', 'parse', 'resolve', 'inspect', 'types', 'promisify']);
  const kernNamen = new Map();     // Name -> Modul
  for (const mod of ['fs', 'os', 'path', 'child_process', 'crypto', 'zlib']) {
    // eslint-disable-next-line no-await-in-loop
    const m = await import(`node:${mod}`);
    for (const [k, v] of Object.entries(m.default || m)) {
      if (typeof v === 'function' && !HEIKEL.has(k) && !kernNamen.has(k)) kernNamen.set(k, mod);
    }
  }

  const fehlendBenannt = [];
  for (const f of dateienJs) {
    const txt = fs.readFileSync(f, 'utf8');
    // Kommentare UND Zeichenketten raus. Die Sabotage-Eval traegt fremden Code
    // als Daten ("von: \"if (existsSync(p) ...\"") — das ist kein Aufruf in
    // DIESER Datei, sondern ein Suchmuster fuer eine andere. Ohne diesen Filter
    // meldete die Wache fuenf Treffer, alle falsch: drei aus Sabotage-Strings,
    // einer aus einem dynamischen `await import()`, einer aus `os.type` als
    // Wort in einer Zeichenkette.
    //
    // Ein Waechter mit fuenf Fehlalarmen beim ersten Lauf wird nicht gelesen,
    // er wird geloescht — dieselbe Ueberlegung wie bei den 118 Fehlalarmen der
    // Pfad-Pruefung weiter oben.
    const code = txt.split('\n')
      .filter((z) => !z.trim().startsWith('//') && !z.trim().startsWith('*'))
      .join('\n')
      .replace(/'(?:[^'\\]|\\.)*'/g, "''")
      .replace(/"(?:[^"\\]|\\.)*"/g, '""')
      .replace(/`(?:[^`\\]|\\.)*`/g, '``');
    // Alles, was die Datei importiert ODER selbst definiert, ist erlaubt.
    const bekannt = new Set();
    for (const m of txt.matchAll(/import\s*\{([^}]+)\}\s*from/g)) {
      for (const teil of m[1].split(',')) bekannt.add(teil.trim().split(/\s+as\s+/).pop());
    }
    // Dynamischer Import: `const { execFileSync } = await import('node:child_process')`.
    // run-axe-check macht das, weil es das Modul erst spaet braucht. Der Name ist
    // dann genauso importiert — nur eben nicht am Dateikopf.
    for (const m of txt.matchAll(/(?:const|let)\s*\{([^}]+)\}\s*=\s*(?:await\s+)?(?:import|require)\s*\(/g)) {
      for (const teil of m[1].split(',')) bekannt.add(teil.trim().split(':').pop().trim());
    }
    for (const m of code.matchAll(/(?:function|const|let|var)\s+(\w+)/g)) bekannt.add(m[1]);
    // Methoden in Objekten und Klassen: `async close() {`, `close() {`.
    // Sie SIND die Definition des Namens, kein Aufruf eines fremden. Der
    // design-Skill hat genau so einen Fall (detect-url.mjs, `async close()`),
    // und die Wache meldete ihn als "close (aus fs)" — ein Name, den es in fs
    // wirklich gibt, hier aber selbst definiert.
    for (const m of code.matchAll(/(?:^|[{,;]|\basync)\s*(\w+)\s*\([^)]*\)\s*\{/gm)) bekannt.add(m[1]);
    // Auch Parameternamen: `(close) => ...` waere sonst ein Treffer.
    for (const m of code.matchAll(/\(([^)]*)\)\s*=>/g)) {
      for (const t of m[1].split(',')) bekannt.add(t.trim().split(/[=:\s]/)[0]);
    }
    for (const [name, mod] of kernNamen) {
      if (bekannt.has(name)) continue;
      // Nur als Aufruf am Zeilenanfang oder nach Zuweisung/Klammer — nicht als
      // Methode (`obj.spawnSync()` gehoert dem Objekt, nicht dem Modul).
      if (new RegExp(`(?<![.\\w])${name}\\s*\\(`).test(code)) {
        fehlendBenannt.push(`${path.relative(ZIEL, f)}: ${name} (aus ${mod})`);
      }
    }
  }
  // Ein Skill ohne Code ist nicht "sauber", er ist ungeprueft.
  //
  // Am 30.07.2026 die Wache ueber zehn weitere Skills laufen lassen: alle zehn
  // meldeten "sauber". Nachgemessen hatten alle zehn NULL Dateien — es sind
  // reine Wissens-Skills, nur Markdown. Die Aussage "zehn Skills geprueft" war
  // wertlos, und die Zeile las sich identisch zu einem echten Sauber-Befund.
  //
  // Genau das Kernthema dieses Skills, diesmal in meiner eigenen Pruefung:
  // nichts geprueft sieht aus wie sauber geprueft. Dieselbe Falle wie beim
  // Slop-Scan ueber 0 Dateien, beim leeren --src im G1-Tor und beim leeren
  // Detektor-Ziel.
  if (dateienJs.length === 0) {
    zeile(true, `keine .mjs-Datei in diesem Skill — NICHTS geprueft (kein Sauber-Befund)`,
      'reiner Wissens-Skill? Dann ist das richtig. Sonst zeigt ZIEL auf den falschen Ordner.');
  } else {
    zeile(fehlendBenannt.length === 0,
      `${kernNamen.size} Kernmodul-Namen gegen ${dateienJs.length} Datei(en) geprueft`,
      fehlendBenannt.length ? `benutzt ohne Import: ${fehlendBenannt.slice(0, 5).join(' | ')}` : null);
  }
}

// --- Dateinamen im Fliesstext der Referenzen ----------------------------
// Die Wiki-Verweise oben sind [[doppelt eckig]]. Daneben nennen die Referenzen
// Dateien in Backticks (`scripts/g1-gate.mjs`, `shadcn-index.json`) — die hat
// bisher nichts geprueft. Am 30.07.2026 von Hand nachgemessen: 129 solcher
// Verweise, und alle loesen auf. Der Wert liegt nicht im heutigen Ergebnis,
// sondern darin, dass eine geloeschte oder umbenannte Datei ab jetzt auffaellt.
//
// Vier Wege der Aufloesung, weil ein Verweis auf verschiedene Arten gemeint
// sein kann: relativ zur nennenden Datei, zum Skill, zum skills/-Baum, oder als
// absoluter Pfad auf dieser Maschine. Meine erste Handmessung kannte nur die
// ersten beiden und meldete deshalb `shadcn-index.json` als tot — die Datei
// liegt unter /root/tools/uikit-vault/registry/ und wird im selben Satz mit
// genau diesem Pfad genannt. Ein Waechter, der den Kontext nicht mitliest,
// erfindet Befunde.
console.log('\nDateinamen im Fliesstext der Referenzen loesen auf:\n');
{
  // Erst nach einem Lauf vorhanden (Build-Ausgabe, Manifeste). Ihr Fehlen ist
  // kein kaputter Verweis, sondern der Normalzustand vor dem ersten Lauf.
  const LAUFZEIT = new Set([
    'package.json', 'manifest.json', 'bilder-index.json', 'index.html',
    'report.json', 'components.json', 'tsconfig.json',
    // Erkennungsmerkmale fremder Oekosysteme. ui-ux-db-nutzung.md listet sie
    // auf, um aus einer Projektdatei den Stack zu erraten ("`composer.json`
    // =Laravel"). Das ist eine Nennung, keine Wegbeschreibung — die Datei soll
    // in einem KUNDENPROJEKT liegen, nicht hier.
    'composer.json', 'Package.swift', 'go.mod', 'Gemfile', 'pubspec.yaml',
    // Laufzeit-Zustand eines fremden Harness. eval/references/
    // verifikations-vertrag.md stellt in einer Tabelle "Original vs. hier"
    // gegenueber, was der Python-State-Machine-Harness schreibt und was
    // stattdessen hier gilt. Die Datei gehoert zum Original und soll hier
    // gerade NICHT existieren — das ist die Aussage der Tabelle.
    'state.json',
  ]);
  const refOrdner = path.join(ZIEL, 'references');
  // Auch SKRIPT-Koepfe, nicht nur references/*.md.
  //
  // Vendorierte Skripte tragen ihren Herkunftsnachweis im Kopfkommentar
  // ("Vendoriert aus kill-ai-slop ... Details: ../VENDORING.md"). Das ist
  // dieselbe Zusage wie in einer Referenz — nur stand sie ausserhalb der
  // Pruefung. Am 30.07.2026 gemessen: nach dem Umbenennen von
  // VENDORING-NOTE.md auf die Repo-Konvention blieben FUENF tote Verweise in
  // vier Dateien liegen, zwei davon in design/scripts/. Die Wache meldete
  // Exit 0, weil sie Skripte gar nicht ansieht.
  const skriptKoepfe = [];
  for (const unter of ['scripts', 'evals']) {
    const o = path.join(ZIEL, unter);
    if (!fs.existsSync(o)) continue;
    try {
      for (const f of fs.readdirSync(o, { recursive: true })) {
        if (typeof f !== 'string' || !/\.(mjs|js)$/.test(f)) continue;
        if (f.includes('node_modules') || f.includes('vendor/')) continue;
        // Diese Datei nicht: ihre Kommentare DOKUMENTIEREN vergangene
        // Fehlalarme ("rules.ru.mjs", "OFFER.md", "shadcn-index.json") und
        // nennen die Beispiele beim Namen. Ein Waechter, der seine eigene
        // Begruendung als toten Verweis meldet, ist genau der Fehlalarm, den
        // sie beschreibt — sofort beim ersten Lauf dreimal passiert.
        if (path.basename(f) === 'run-verweise-check.mjs') continue;
        skriptKoepfe.push(path.join(o, f));
      }
    } catch { /* unlesbar: uebergehen */ }
  }
  const mdDateien = (fs.existsSync(refOrdner)
    ? fs.readdirSync(refOrdner, { recursive: true })
      .filter((f) => typeof f === 'string' && f.endsWith('.md'))
      .map((f) => path.join(refOrdner, f))
    : []).concat(skriptKoepfe);

  let gezaehlt = 0;
  const tot = [];
  for (const datei of mdDateien) {
    const txt = fs.readFileSync(datei, 'utf8');
    // Zwei Schreibweisen: in Backticks (Referenz-Prosa) und blank nach
    // "Details:" / "siehe" (Skript-Koepfe). Die Gegenprobe am 30.07.2026 lief
    // ins Leere, weil `scan-ai-slop.mjs` seinen Vendoring-Hinweis OHNE
    // Backticks schreibt ("Details: ../VENDORING.md.") — die Erweiterung auf
    // Skript-Koepfe brachte also echte Verweise dazu, aber nicht die, wegen
    // derer ich sie gebaut hatte. Ein Test, der nicht anschlaegt, misst die
    // Luecke; hier war es meine eigene.
    const treffer = [...txt.matchAll(/`([a-z0-9][a-z0-9._/-]*\.(?:mjs|js|json|md|html))`/gi)];
    // Kleinbuchstabe am Anfang verlangt: "Haupt-SKILL.md" im Satz "siehe
    // Haupt-SKILL.md, Abschnitt Launch" ist eine UMSCHREIBUNG ("das
    // Haupt-SKILL.md"), kein Dateiname — die Datei heisst SKILL.md.
    // Ausserdem Endung .js ausgeschlossen: g1-gate schreibt "siehe
    // evals/antiset-budget.json", und das Muster griff bis `.js` und liess das
    // `on` stehen. Beide Fehlalarme am 30.07.2026 beim ersten Lauf.
    // Das `i`-Flag ist noetig — und war die Ursache eines stillen Ausfalls.
    //
    // Gegen "siehe Haupt-SKILL.md" (eine Umschreibung, kein Dateiname) habe ich
    // am 30.07.2026 den Anfang auf [a-z] verengt UND dabei das `i` entfernt.
    // Damit traf das Muster gar nichts mehr: `VENDORING.md` faengt gross an.
    // Die Gegenprobe schlug nicht an, und der eine sichtbare Fund
    // (design-dna.md) kam aus der Backtick-Erkennung — er sah aus wie ein
    // Beweis, dass die blanke Erkennung arbeitet. Sie tat es nicht.
    //
    // Loesung: `i` zurueck, Grossbuchstaben-Umschreibungen stattdessen ueber
    // den Bindestrich ausschliessen (Haupt-SKILL.md, Teil-README.md). Ein
    // Dateiname mit Grossbuchstaben MITTEN im Wort nach einem Bindestrich ist
    // im Bestand immer eine Umschreibung.
    for (const m of txt.matchAll(/(?:Details|siehe|Quelle|vgl\.):?\s+((?:\.\.?\/)?[A-Za-z][A-Za-z0-9._/-]*\.(?:mjs|json|md|html))(?![a-z0-9])/g)) {
      if (/-[A-Z]/.test(path.basename(m[1]))) continue;   // "Haupt-SKILL.md
      treffer.push(m);
    }
    for (const m of treffer) {
      const ziel = m[1];
      const name = ziel.split('/').pop();
      if (LAUFZEIT.has(name)) continue;
      gezaehlt++;
      const wurzeln = [path.dirname(datei), ZIEL, SKILLS, REPO];
      // Die eigene VENDORING.md ist KEINE fremde Herkunft.
      //
      // Vendoring-Koepfe nennen beides in zwei Zeilen: das Quell-Repo
      // ("github.com/yetone/kill-ai-slop") und die eigene Attributionsdatei
      // ("Details: ../VENDORING.md"). Die Herkunfts-Ausnahme unten sah das
      // github.com im selben Satzfenster und verwarf den Verweis — also
      // ausgerechnet die Zusage ueber den EIGENEN Baum, die stimmen muss.
      //
      // Am 30.07.2026 dreimal hintereinander als "Gegenprobe schlaegt nicht an"
      // erschienen, bevor ich die Ausnahme als Ursache gemessen habe. Genau
      // deshalb steht die Pruefung hier VOR den Ausnahmen.
      if (/^(?:\.\.?\/)?VENDORING\.md$/.test(ziel)) {
        if (!wurzeln.some((w) => fs.existsSync(path.join(w, ziel)))) {
          tot.push(`${path.relative(ZIEL, datei)} -> ${ziel}`);
        }
        continue;
      }
      if (wurzeln.some((w) => fs.existsSync(path.join(w, ziel)))) continue;
      // Fuenfter Weg: das Brain. Router-Tabellen wie design/references/
      // wissens-router.md nennen Wiki-Seiten mit blossem Dateinamen — sie
      // liegen unter /root/raphael-brain/wiki/ bzw. raw/. Ohne diesen Weg
      // meldet die Wache eine korrekt gefuellte Wissensseite als toten
      // Verweis. Am 30.07.2026 an drei Faellen gemessen (morflax-device-
      // mockup-workflow, feralui-gradient-workflow, typography-system):
      // alle drei existieren, nur eben nicht im Skill-Baum.
      if (fs.existsSync(BRAIN)) {
        let imBrain = false;
        // Auch die Wurzel: `raphael-brain/PROGRESS.md` liegt nicht unter wiki/
        // oder raw/. Ohne diesen Fall meldet die Wache eine Datei als tot, die
        // im Text sogar mit Repo-Praefix genannt wird.
        if (fs.existsSync(path.join(BRAIN, name))) continue;
        for (const unter of ['wiki', 'raw']) {
          const b = path.join(BRAIN, unter);
          if (!fs.existsSync(b)) continue;
          try {
            if (fs.readdirSync(b, { recursive: true })
              .some((f) => typeof f === 'string' && f.endsWith(name))) { imBrain = true; break; }
          } catch { /* unlesbar: gilt als nicht gefunden */ }
        }
        if (imBrain) continue;
      }
      // Als blosser Name irgendwo im Skill oder im skills/-Baum?
      let gefunden = false;
      for (const w of [ZIEL, SKILLS]) {
        try {
          if (fs.readdirSync(w, { recursive: true })
            .some((f) => typeof f === 'string' && f.endsWith(name))) { gefunden = true; break; }
        } catch { /* unlesbar: gilt als nicht gefunden */ }
      }
      if (gefunden) continue;
      // Absoluter Pfad im Umfeld genannt? Dann ist der Verweis eine Kurzform.
      // 300 Zeichen waren zu eng: shadcn-arbeitsweise.md nennt den absoluten
      // Registry-Pfad einmal in Zeile 13 und die Datei danach mehrfach als
      // Kurzform. Das Fenster muss den ganzen Abschnitt fassen, sonst gilt
      // dieselbe Datei einmal als aufgeloest und dreimal als tot.
      const umfeld = txt.slice(Math.max(0, m.index - 2000), m.index + 600);
      const absolut = [...umfeld.matchAll(/\/root\/[a-z0-9._/-]+/gi)].map((x) => x[0]);
      if (absolut.some((a) => fs.existsSync(a) || fs.existsSync(path.join(a, name)))) continue;
      // Ausdrueckliche Abgrenzung: die Referenz nennt die Datei, um zu sagen,
      // dass sie NICHT uebernommen wurde. rebuild-from-image.md macht das
      // vorbildlich ("bewusst nicht uebernommen", "die Scripts selbst nicht
      // vendoriert") und listet die Vendor-JSONs, die dazugehoeren. Solche
      // Stellen sind das Gegenteil eines toten Verweises — sie dokumentieren
      // eine Entscheidung. Wer sie als Fehler meldet, bestraft die sauber
      // begruendete Abgrenzung und laesst die stille Luecke ungestraft.
      if (/nicht (?:uebernommen|vendoriert|portiert|dabei)|kein portabler|ohne Bezug zu dieser Umgebung|nicht Teil dieses Skills/i
        .test(umfeld)) continue;
      // Fremde Herkunft: die Datei liegt in einem anderen Projekt und wird als
      // QUELLE genannt ("aus offiziellem `video-layout.md`", "Vorlage",
      // "Skill X + `PICKER.md`, MIT"). Sie soll hier gar nicht existieren.
      // "Kondensiert aus <repo>, `pfad`" kam erst beim Lauf ueber alle 29 Skills
      // vor (ads, offers) — meine Muster stammten aus zwei Skills und waren an
      // einem zu kleinen Ausschnitt gemessen.
      const satz = txt.slice(Math.max(0, m.index - 200), m.index + 200);
      // `MIT licen[sc]e` klein geschrieben kommt in den englischen
      // Vendor-Dateien vor (offers/references/vendor/coreyhaines-offers/) —
      // dieselbe Herkunftsangabe, nur nicht auf Deutsch.
      // ABER: eine Herkunftsangabe kann auf eine Datei IM EIGENEN SKILL zeigen —
      // "MIT-Lizenz) — vollstaendige Attribution in `VENDORING.md` dieses
      // Skills". Das ist eine Zusage ueber den eigenen Baum, kein Verweis in ein
      // Fremdrepo, und sie muss stimmen. Am 30.07.2026 gemessen: `VENDORING.md`
      // in `VENDORING-NOTE.md` umbenannt, und die Wache meldete Exit 0 — die
      // Ausnahme griff auf das "MIT)" im selben Satz. Eine Ausnahme, die den
      // halben Satz mitnimmt, deckt mehr ab als sie soll.
      const zeigtHierher = /diese[sr]? Skills|hier im Skill|in diesem Skill|dieses Repos/i.test(satz);
      if (!zeigtHierher
        && /Quelle:|aus offiziellem|Vorlage|MIT\)|MIT licen[sc]e|Upstream|github\.com|plugins\/|[Kk]ondensiert aus|[UÜu]ebernommen aus|[Üü]bernommen aus/
          .test(satz)) continue;
      // Umbenannt: der Text nennt den ALTEN Namen und direkt dahinter mit Pfeil
      // den neuen Ort. Die Zusage ist das Pfeil-Ziel, nicht der historische
      // Name davor. ads/references/wissens-router.md macht das sechsmal:
      //   `lead-qualitaet.md` (→ `messung/2026-07-20-lead-qualifizierung….md`)
      // Das Pfeil-Ziel wurde geprueft und existiert; der alte Name liegt heute
      // im Brain-Archiv. Wer hier "repariert", loescht eine Herkunftsangabe.
      const danach = txt.slice(m.index, m.index + 220);
      const pfeil = danach.match(/(?:→|->)\s*`([^`]+)`/);
      if (pfeil) {
        const zielName = pfeil[1].split('/').pop();
        let pfeilOk = false;
        for (const w of [path.dirname(datei), ZIEL, SKILLS, REPO, BRAIN]) {
          if (fs.existsSync(path.join(w, pfeil[1]))) { pfeilOk = true; break; }
        }
        if (!pfeilOk && fs.existsSync(BRAIN)) {
          try {
            pfeilOk = fs.readdirSync(BRAIN, { recursive: true })
              .some((f) => typeof f === 'string' && f.endsWith(zielName));
          } catch { /* unlesbar */ }
        }
        if (pfeilOk) continue;
      }
      // Beispielname: "e.g. `scripts/build-sub-pages.js`", "z. B. `x.mjs`".
      // Der Text erklaert eine KLASSE von Dateien, nicht eine bestimmte. Kam
      // erst mit den Skript-Koepfen dazu (30.07.2026) — Kommentare in Code
      // erklaeren haeufiger mit Beispielen als Referenz-Prosa.
      if (/\b(?:e\.g\.|z\. ?B\.|zum Beispiel|etwa)\s*`?[^`\n]{0,30}$/i
        .test(txt.slice(Math.max(0, m.index - 40), m.index))) continue;
      // Negativ-Befund: die Referenz nennt die Datei, um ihr FEHLEN als Mangel
      // zu beschreiben ("kein `SECURITY.md`"). Ein Waechter, der das als toten
      // Verweis meldet, verlangt, dass der Mangel behoben wird, den der Text
      // gerade beschreiben will.
      if (new RegExp(`(?:kein|keine|ohne|fehlt|fehlende[sr]?)\\s+\`?${name.replace('.', '\\.')}`, 'i').test(satz)) continue;
      // Ausgabe des Ablaufs: die Referenz beschreibt, was BEIM LAUF entsteht
      // (Berichte, Audits, Teardowns). Diese Dateien im Skill zu verlangen
      // hiesse, das Ergebnis vor der Arbeit zu fordern.
      if (/^[A-Z][A-Z_]+\.md$/.test(name)
        && /schreib|erzeug|entsteh|Ausgabe|liefer|zusaetzlich|Bedarf|Vergleichstabelle|dokumentier/i.test(satz)) continue;
      tot.push(`${path.relative(ZIEL, datei)} -> ${ziel}`);
    }
  }
  // Null Verweise ist kein Sauber-Befund, sondern eine Leermeldung.
  //
  // Beim Lauf ueber zwoelf Skills (30.07.2026) meldeten elf "sauber". Bei
  // fuenf davon (taste, ui-ux, debug, watch, report) stand dahinter
  // "0 Dateiverweise in 0 Referenz-Datei(en)" — mit [OK]. Dieselbe Falle, die
  // ich in der Import-Wache zwei Runden vorher geschlossen habe, hier nur
  // nicht mitgezogen: nichts geprueft sieht aus wie sauber geprueft.
  //
  // Zeiger-Skills wie taste haben wirklich keine eigenen Referenzen; dort ist
  // das die richtige Antwort. Der gefaehrliche Fall ist der andere: ZIEL zeigt
  // auf den falschen Ordner, und die Wache schweigt statt zu warnen.
  if (gezaehlt === 0) {
    zeile(true, `keine Dateiverweise gefunden (${mdDateien.length} Datei(en) gelesen) — NICHTS geprueft`,
      'Zeiger-Skill ohne eigene Referenzen? Dann richtig. Sonst zeigt ZIEL auf den falschen Ordner.');
  } else
  zeile(tot.length === 0, `${gezaehlt} Dateiverweise in ${mdDateien.length} Referenz-Datei(en)`,
    tot.length ? `zeigen ins Leere: ${tot.slice(0, 6).join(' | ')}` : null);
}

// --- Fremder Code braucht eine Attribution -------------------------------
//
// Ein `vendor/`-Ordner enthaelt fremden Code unter fremder Lizenz. Bei MIT und
// Apache-2.0 ist die Attribution die BEDINGUNG der Nutzung — fehlt sie, ist die
// Nutzung nicht gedeckt. Am 30.07.2026 gefunden: der web-Skill sagte in zwei
// Referenzen "vollstaendige Attribution in VENDORING.md" zu, und die Datei gab
// es nicht (114 vendorierte Dateien ohne Lizenztext).
//
// Zwei Orte zaehlen, beide gleichwertig: eine skill-eigene VENDORING.md oder
// ein Eintrag im zentralen Protokoll des Repos. `ads` und `offers` haben keine
// eigene Datei und sind trotzdem sauber — sie stehen in der Tabelle des
// zentralen Protokolls. Wer nur nach der lokalen Datei sucht, meldet die beiden
// faelschlich (mein erster Handlauf tat genau das).
console.log('\nJeder vendor/-Ordner ist attributiert:\n');
{
  const zentralPfad = path.join(path.dirname(SKILLS), 'VENDORING.md');
  const zentral = fs.existsSync(zentralPfad) ? fs.readFileSync(zentralPfad, 'utf8') : '';
  // Fremdcode heisst nicht immer `vendor/`.
  //
  // Erste Fassung suchte nur nach Ordnern dieses Namens und meldete fuer den
  // web-Skill "kein vendor/-Ordner — nichts zu attributieren". Er hat 114
  // vendorierte Dateien, sie liegen in `references/ui-components/` (beUI v2,
  // MIT). Ein Waechter, der den groessten Fremdcode-Bestand des Repos
  // uebersieht, weil der Ordner anders heisst, ist genau der Pruefer, der
  // nichts prueft und gruen meldet.
  //
  // Zweite Quelle deshalb: die eigene VENDORING.md nennt ihre Abschnitte mit
  // Pfad ("## 1. `references/ui-components/`"). Was dort steht, ist per
  // Definition Fremdcode.
  const vendorOrdner = [];
  for (const unter of ['references/vendor', 'vendor']) {
    const p = path.join(ZIEL, unter);
    if (fs.existsSync(p)) vendorOrdner.push(unter);
  }
  // Dritte Quelle: Herkunftsnachweise IM Fremdcode selbst.
  //
  // Zirkelschluss vermeiden. Die zweite Quelle liest die eigene VENDORING.md —
  // fehlt die, findet die Wache keinen Fremdcode und meldet "nichts zu
  // attributieren". Genau der Fall, den sie fangen soll: bei der Gegenprobe am
  // 30.07.2026 verschwand mit der Datei auch der Befund. Eine Wache, deren
  // einzige Quelle das ist, was sie prueft, kann nie rot werden.
  //
  // Fremdcode traegt seine Herkunft aber selbst: Lizenzkopfzeilen, "Copyright
  // (c)", "@license", oder eine LICENSE-Datei im Ordner. Danach wird gesucht,
  // unabhaengig vom Ordnernamen und unabhaengig von jeder Attributionsdatei.
  const HERKUNFT_RE = /Copyright \(c\)|@license|SPDX-License-Identifier|Licensed under the/i;
  const codeMitLizenz = [];
  const suche = (rel, tiefe = 0) => {
    if (tiefe > 3 || codeMitLizenz.length) return;
    const abs = path.join(ZIEL, rel);
    let eintraege;
    try { eintraege = fs.readdirSync(abs, { withFileTypes: true }); } catch { return; }
    for (const e of eintraege) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const r = path.join(rel, e.name);
      if (e.isDirectory()) { suche(r, tiefe + 1); continue; }
      if (/^LICENSE/i.test(e.name)) { codeMitLizenz.push(rel); return; }
      if (!/\.(mjs|js|jsx|tsx?|css)$/.test(e.name)) continue;
      try {
        if (HERKUNFT_RE.test(fs.readFileSync(path.join(ZIEL, r), 'utf8').slice(0, 800))) {
          codeMitLizenz.push(rel); return;
        }
      } catch { /* unlesbar */ }
    }
  };
  for (const start of ['references', 'scripts']) suche(start);
  // Gemessen am 30.07.2026: im web-Skill findet diese Suche NICHTS. Die 113
  // beUI-Komponenten tragen keine Copyright-Zeile und der Ordner keine
  // LICENSE-Datei — genau die Luecke, die die eigene VENDORING.md im Kopf
  // beschreibt ("114 vendorierte Dateien lagen ohne den Lizenztext im Repo").
  // Die dritte Quelle ist also nicht falsch gebaut, sie ist LEER. Sie bleibt
  // trotzdem: sobald der Lizenztext nachgezogen wird, traegt sie, und bei
  // kuenftigem Vendoring mit ordentlichen Kopfzeilen greift sie sofort.
  //
  // Solange sie leer ist, bleibt der Zirkelschluss bestehen: ohne
  // Attributionsdatei findet die Wache keinen Fremdcode. Das ist gemeldet
  // (ops/review-inbox.md), nicht versteckt — eine Wache, die ihre eigene
  // Blindstelle verschweigt, ist schlimmer als keine.
  for (const r of codeMitLizenz) if (!vendorOrdner.includes(r)) vendorOrdner.push(r);

  const eigenePfad = path.join(ZIEL, 'VENDORING.md');
  if (fs.existsSync(eigenePfad)) {
    const txt = fs.readFileSync(eigenePfad, 'utf8');
    for (const m of txt.matchAll(/^#{2,3} [0-9]+\.\s+`([^`]+)`/gm)) {
      const rel = m[1].replace(/\/$/, '');
      if (fs.existsSync(path.join(ZIEL, rel)) && !vendorOrdner.includes(rel)) vendorOrdner.push(rel);
    }
  }
  if (!vendorOrdner.length) {
    zeile(true, 'kein vendor/-Ordner — nichts zu attributieren');
  } else {
    const lokal = fs.existsSync(path.join(ZIEL, 'VENDORING.md'));
    // Der Skillname im zentralen Protokoll, in Backticks oder als Ueberschrift.
    const name = path.basename(ZIEL);
    const imZentralen = new RegExp(`\`${name}\`|^### ${name}$|skills/${name}/`, 'm').test(zentral);
    zeile(lokal || imZentralen,
      `${vendorOrdner.length} vendor/-Ordner, Attribution: ${lokal ? 'eigene VENDORING.md' : ''}`
        + `${lokal && imZentralen ? ' + ' : ''}${imZentralen ? 'zentrales Protokoll' : ''}`
        || `${vendorOrdner.length} vendor/-Ordner`,
      (lokal || imZentralen) ? null
        : `fremder Code ohne Attribution: ${vendorOrdner.join(', ')} — bei MIT/Apache ist sie Bedingung der Nutzung`);
  }
}

console.log('\nJeder Skill aus requires_skills: existiert:\n');
{
  const roh = fs.readFileSync(path.join(ZIEL, 'SKILL.md'), 'utf8');
  const kopfEnde = roh.indexOf('\n---', 4);
  const kopf = kopfEnde > 0 ? roh.slice(0, kopfEnde) : '';
  // Beide YAML-Formen, obwohl heute alle 20 Skills die einzeilige nutzen:
  //   requires_skills: [eval@^0]     requires_skills:
  //                                    - eval@^0
  //
  // `loads:` war auch einmal nur einzeilig — inzwischen stehen 8 einzeilige
  // gegen 15 mehrzeilige, und genau dieser Wandel hat mich am 30.07.2026
  // ZWEIMAL erwischt (beide Male meldete die Wache eine leere Grundmenge und
  // daraus zehn Fehlalarme). Eine Annahme, die heute traegt, ist keine, die
  // morgen traegt; sie kostet hier eine Zeile.
  const zeileReq = (kopf.match(/^requires_skills:\s*\[[^\]]*\]/m)
    || kopf.match(/^requires_skills:\s*\n(?:[ \t]+-[^\n]*\n)+/m)
    || [''])[0];
  const namen = [...zeileReq.matchAll(/([a-z][a-z-]*)@/g)].map((m) => m[1]);
  const fehlend = namen.filter((n) =>
    !fs.existsSync(path.join(EIGENE, n, 'SKILL.md'))
    && !fs.existsSync(path.join(SKILLS, n, 'SKILL.md')));
  zeile(fehlend.length === 0,
    // Der Text muss zum Befund passen. Erste Fassung sagte auch im Fehlerfall
    // "alle vorhanden" und darunter "nicht gefunden: …" — eine Zeile, die sich
    // selbst widerspricht, zwingt den Leser zu raten, welche Haelfte gilt.
    !namen.length ? 'keine requires_skills: — nichts zu pruefen'
      : fehlend.length ? `${namen.length} verlangte(r) Skill(s), ${fehlend.length} fehlt/fehlen`
        : `${namen.length} verlangte(r) Skill(s), alle vorhanden`,
    fehlend.length ? `nicht gefunden: ${fehlend.join(', ')}` : null);

  // Existenz allein reicht nicht: `design@^0` heisst "Hauptversion 0". Springt
  // design auf 1.0.0, ist die Zusage gebrochen — und weil der Skill trotzdem
  // daliegt, faellt es sonst nirgends auf. Genau die Sorte Naht, die diese
  // Woche viermal offen war: beide Seiten funktionieren, nur ihre Verbindung
  // stimmt nicht mehr.
  const spanne = [...zeileReq.matchAll(/([a-z][a-z-]*)@\^(\d+)/g)];
  const falsch = [];
  for (const [, name, major] of spanne) {
    const datei = [path.join(EIGENE, name, 'SKILL.md'), path.join(SKILLS, name, 'SKILL.md')]
      .find((f) => fs.existsSync(f));
    if (!datei) continue;                       // Fehlen meldet schon die Zeile oben
    const v = fs.readFileSync(datei, 'utf8').match(/^version:\s*(\d+)\./m);
    if (!v) { falsch.push(`${name} (keine version: im Kopf)`); continue; }
    if (v[1] !== major) falsch.push(`${name}@^${major} verlangt, installiert ist ${v[1]}.x`);
  }
  zeile(falsch.length === 0,
    falsch.length === 0
      ? `${spanne.length} Versionsspanne(n), alle erfuellt`
      : `${falsch.length} von ${spanne.length} Versionsspannen verletzt`,
    falsch.length ? falsch.join(' | ') : null);

  // Und die Gegenrichtung: die Nachbar-Skills haben eigene requires_skills.
  // taste und ui-ux verlangen `design@^0`, copywriting `eval@^0` und
  // `no-ai-slop@^0` — vier Zusagen, die bisher niemand gemessen hat. Wer nur
  // sein eigenes Frontmatter prueft, sieht die halbe Abhaengigkeit.
  const nachbarn = ['taste', 'ui-ux', 'impeccable', 'copywriting', 'no-ai-slop'];
  const kaputt = [];
  let geprueftGesamt = 0;
  for (const skill of nachbarn) {
    const datei = path.join(EIGENE, skill, 'SKILL.md');
    if (!fs.existsSync(datei)) continue;
    const txt = fs.readFileSync(datei, 'utf8');
    const req = (txt.match(/^requires_skills:.*$/m) || [''])[0];
    for (const [, name, major] of req.matchAll(/([a-z][a-z-]*)@\^(\d+)/g)) {
      geprueftGesamt++;
      const ziel = [path.join(EIGENE, name, 'SKILL.md'), path.join(SKILLS, name, 'SKILL.md')]
        .find((f) => fs.existsSync(f));
      if (!ziel) { kaputt.push(`${skill} verlangt ${name} — fehlt`); continue; }
      const v = fs.readFileSync(ziel, 'utf8').match(/^version:\s*(\d+)\./m);
      if (!v) { kaputt.push(`${skill} -> ${name}: keine version:`); continue; }
      if (v[1] !== major) kaputt.push(`${skill} verlangt ${name}@^${major}, installiert ${v[1]}.x`);
    }
  }
  zeile(kaputt.length === 0,
    kaputt.length === 0
      ? `${geprueftGesamt} Abhaengigkeit(en) in den Nachbar-Skills, alle erfuellt`
      : `${kaputt.length} von ${geprueftGesamt} Abhaengigkeiten in Nachbar-Skills verletzt`,
    kaputt.length ? kaputt.join(' | ') : null);
}

console.log('\nJedes Werkzeug aus den completion_criteria existiert:\n');
{
  const skill = fs.readFileSync(path.join(ZIEL, 'SKILL.md'), 'utf8');
  const kopf = skill.slice(0, skill.indexOf('\n---', 4));
  const skripte = [...new Set([...kopf.matchAll(/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1]))];
  const fehlend = skripte.filter((s) => !fs.existsSync(path.join(ZIEL, 'scripts', s)));
  // `skripte.length > 0` stand hier als Wache — sinnvoll fuer `web`, das neun
  // Werkzeuge in seinen Kriterien nennt. Als ALLGEMEINE Regel ist sie falsch:
  // ein Zeiger-Skill wie `taste` oder ein Prosa-Skill wie `handoff` hat keine
  // Skripte, und "0 gefunden" ist dort die richtige Antwort, kein Fehler.
  //
  // Befund 30.07.2026 beim Lauf ueber alle 23 eigenen Skills: zehn meldeten
  // Exit 1 bei tot=0 — der Exit-Code kam allein aus dieser Wache. Ein Werkzeug,
  // das beim Uebertragen auf den zweiten Anwendungsfall Fehlalarm gibt, hat die
  // Annahme des ersten fest eingebaut.
  zeile(fehlend.length === 0,
    skripte.length
      ? `${skripte.length} Skript(e) in den Kriterien genannt, alle vorhanden`
      : 'keine Skripte in den Kriterien genannt — nichts zu pruefen',
    fehlend.length ? `fehlt: ${fehlend.join(', ')}` : (skripte.length ? null : 'keine gefunden — Muster pruefen'));
}

// --- Befehle in den Nachbar-Skills ---------------------------------------
// Der web-Skill ist nicht allein: impeccable, taste, ui-ux und copywriting sind
// Zeiger auf design. Wenn dort ein AUFRUF steht, muss er von seinem eigenen
// Ordner aus laufen — nicht "richtig gemeint mit Zusatz im Fliesstext".
//
// Befund 30.07.2026: drei solche Befehle liefen nicht.
//   ui-ux      python3 vendor/ui-ux-db/scripts/search.py …  ("im design-Verzeichnis")
//   impeccable node scripts/detect.mjs                       (zweimal)
// Beide trugen den Hinweis, wo sie gemeint sind — und scheiterten beim Kopieren
// mit "No such file or directory". Ein Befehl in einem Skill soll laufen, nicht
// erst uebersetzt werden.
console.log('\nBefehle in den Nachbar-Skills laufen von dort aus:\n');
for (const [skill, datei] of [
  ['impeccable', 'SKILL.md'],
  ['taste', 'SKILL.md'],
  ['ui-ux', 'SKILL.md'],
  ['copywriting', 'SKILL.md'],
]) {
  const pfad = path.join(EIGENE, skill, datei);
  if (!fs.existsSync(pfad)) { zeile(false, `${skill}/${datei} fehlt`); continue; }
  const txt = fs.readFileSync(pfad, 'utf8');
  // Aufrufe der Form `node <pfad>` / `python3 <pfad>` in Backticks.
  const befehle = [...txt.matchAll(/`(?:node|python3)\s+([A-Za-z0-9_.\/-]+\.(?:mjs|py))/g)]
    .map((m) => m[1]);
  const kaputt = befehle.filter((b) => {
    if (b.startsWith('/')) return !fs.existsSync(b);
    return !fs.existsSync(path.resolve(EIGENE, skill, b));
  });
  zeile(kaputt.length === 0,
    `${skill}: ${befehle.length} Aufruf(e), alle vom eigenen Ordner aus lauffaehig`,
    kaputt.length ? `laeuft nicht: ${[...new Set(kaputt)].join(', ')}` : null);
}

// --- Die loads-Liste ist die schwerste Sorte Verweis -------------------
// Was in `loads:` steht, wird beim Skill-Start automatisch gelesen. Ein toter
// Eintrag dort ist schwerer als eine Textstelle: der Skill startet mit einer
// fehlenden Wissensquelle, und niemand merkt es, weil nichts danach fragt.
//
// Gepruefte Skills: die vier Zeiger plus design und web selbst. `loads: []` ist
// gueltig und haeufig (die Zeiger laden absichtlich nichts eigenes) — leer ist
// kein Fehler, nur ein toter Pfad ist einer.
console.log('\nJeder loads-Eintrag existiert:\n');
for (const [name, wurzel] of [
  ['web', WEB],
  ['design', path.join(SKILLS, 'design')],
  ['impeccable', path.join(EIGENE, 'impeccable')],
  ['taste', path.join(EIGENE, 'taste')],
  ['ui-ux', path.join(EIGENE, 'ui-ux')],
  ['no-ai-slop', path.join(EIGENE, 'no-ai-slop')],
  ['copywriting', path.join(EIGENE, 'copywriting')],
]) {
  const datei = path.join(wurzel, 'SKILL.md');
  if (!fs.existsSync(datei)) { zeile(false, `${name}: SKILL.md fehlt`); continue; }
  const txt = fs.readFileSync(datei, 'utf8');
  const block = txt.match(/^loads:\s*(\[[^\]]*\]|(?:\n\s+-\s+\S+)+)/m);
  if (!block) { zeile(false, `${name}: kein loads-Feld gefunden`); continue; }
  const eintraege = [...block[1].matchAll(/[-\s[]\s*([A-Za-z0-9_][A-Za-z0-9_./-]+\.(?:md|html|json|mjs))/g)]
    .map((m) => m[1]);
  const tot_ = eintraege.filter((e) => !fs.existsSync(path.resolve(wurzel, e)));
  // Der Text muss zum Urteil passen: "alle vorhanden" neben einem [!!] ist
  // Unsinn und schickt den Leser in die falsche Richtung. Beim Bruchtest am
  // 30.07.2026 stand genau das da.
  zeile(tot_.length === 0,
    tot_.length === 0
      ? `${name}: ${eintraege.length} Eintrag/Eintraege, alle vorhanden`
      : `${name}: ${tot_.length} von ${eintraege.length} Eintraegen fehlen`,
    tot_.length ? `fehlt: ${tot_.join(', ')}` : null);
}

// --- Die G2-Rubrik liegt in einem ANDEREN Repo --------------------------
// `references/loop2-ablauf.md` verspricht "Copy sektionsweise gegen Rubrik
// `evals/rubrics/web.md`, Schwelle 0.7". Die Datei liegt nicht im Skill, sondern
// im Betriebs-Repo — genau so, wie der eval-Skill es vorgibt ("Rubriken unter
// evals/rubrics/ des jeweiligen Repos").
//
// Ein Verweis ueber Repo-Grenzen ist die zerbrechlichste Sorte: er faellt beim
// Lesen nicht auf, und niemand aendert beide Seiten gleichzeitig. Geprueft wird
// deshalb nicht nur, DASS die Datei existiert, sondern ob ihre Schwelle noch zu
// der passt, die dieser Skill in seinen completion_criteria zusagt.
console.log('\nDie G2-Rubrik im Betriebs-Repo passt zur Zusage:\n');
{
  const rubrik = path.join(REPO, 'evals', 'rubrics', 'web.md');
  if (!fs.existsSync(rubrik)) {
    zeile(false, 'evals/rubrics/web.md im Betriebs-Repo fehlt',
      'loop2-ablauf.md verspricht G2 gegen diese Rubrik — ohne sie ist G2 unbelegt');
  } else {
    const txt = fs.readFileSync(rubrik, 'utf8');
    const skill = fs.readFileSync(path.join(WEB, 'SKILL.md'), 'utf8');
    const zusage = skill.match(/G2 auf jedem Ship-Copy-Block >= ([\d.,]+)/);
    const inRubrik = txt.match(/Startschwelle \*\*([\d.,]+)\*\*/);
    const norm = (x) => Number(String(x).replace(',', '.'));
    zeile(!!zusage && !!inRubrik && norm(zusage[1]) === norm(inRubrik[1]),
      `Schwelle: SKILL.md sagt ${zusage ? zusage[1] : '?'}, Rubrik sagt ${inRubrik ? inRubrik[1] : '?'}`,
      zusage && inRubrik && norm(zusage[1]) === norm(inRubrik[1]) ? null
        : 'zwei Repos, eine Zahl — beide nachziehen');
    // "min. 4/5" muss zur Fragenzahl passen: eine Rubrik, die 5 Fragen
    // ankuendigt und 6 stellt, verschiebt die Schwelle still.
    // NUR die Pflichtfragen. Die Rubrik fuehrt unter "## Optional (nur wenn im
    // Auftrag verlangt)" eine sechste ("Menschliche Sprache?"), die nicht in die
    // Schwelle zaehlt. Erster Versuch zaehlte sie mit und meldete "angekuendigt
    // 5, gezaehlt 6" — ein Fehlalarm aus einem Zaehler, der die Ueberschrift
    // darueber ignoriert. Dieselbe Sorte wie die 118 Verweis-Fehlalarme: das
    // Muster stimmte, der Kontext nicht.
    const pflichtteil = txt.slice(
      txt.indexOf('## Die Ja/Nein-Fragen'),
      txt.indexOf('## Optional') >= 0 ? txt.indexOf('## Optional') : undefined,
    );
    const fragen = (pflichtteil.match(/^\d+\. \*\*/gm) || []).length;
    const angekuendigt = txt.match(/(\d+) Ja\/Nein-Fragen/);
    zeile(!angekuendigt || Number(angekuendigt[1]) === fragen,
      `Fragen: angekuendigt ${angekuendigt ? angekuendigt[1] : '?'}, gezaehlt ${fragen}`,
      !angekuendigt || Number(angekuendigt[1]) === fragen ? null
        : 'die Rubrik zaehlt anders als sie ankuendigt');
  }
}

console.log(`\n${fehler === 0 ? 'Alle Verweise' : 'NICHT alle Verweise'} loesen auf.`);
if (fehler) process.exit(1);
