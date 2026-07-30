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
const REPO = '/root/raphael-command-center';          // Betriebs-Repo

// Reihenfolge egal — ein Pfad gilt als gut, sobald EINE Wurzel ihn aufloest.
const WURZELN = [
  ['im Skill', WEB],
  ['Nachbar-Skill (eigene/)', EIGENE],
  ['Skill-Wurzel', SKILLS],
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
];

const dateien = markdownDateien(WEB);
const gefunden = new Map();      // pfad -> [quelle:zeile]
for (const f of dateien) {
  const rel = path.relative(WEB, f);
  const alleZeilen = fs.readFileSync(f, 'utf8').split('\n');
  for (const [i, zeile_] of alleZeilen.entries()) {
    // Herkunftsangaben laufen oft ueber zwei Zeilen:
    //   **Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
    //   `skills/cro/SKILL.md` (MIT-Lizenz).
    // Der Pfad steht dann in Zeile 2, das Wort "Herkunft" in Zeile 1. Ein Test
    // auf die EINE Zeile findet ihn nicht — dritter Fehlalarm-Schub desselben
    // Laufs. Also die Vorzeile mitlesen.
    const umfeld = `${alleZeilen[i - 1] || ''}\n${zeile_}`;
    PFAD_RE.lastIndex = 0;
    let m;
    // Herkunftsangaben sind KEINE lokalen Verweise. "kondensiert aus
    // `coreyhaines/marketingskills`, `skills/cro/SKILL.md`" nennt eine Datei in
    // einem FREMDEN Repo — die soll hier nicht existieren, und ihr Fehlen ist
    // kein Fehler. Zweiter Fehlalarm-Schub am 30.07.2026: sechs von zehn
    // Restmeldungen waren genau das (skills/cro, skills/ab-testing,
    // skills/improve, skills/site-architecture, skills/ops-and-setup/…).
    // Wer die "reparieren" will, erfindet Pfade fuer Repos, die es hier nie gab.
    const istHerkunft = /Herkunft|Quelle|kondensiert|destilliert|vendoriert|Original|github\.com/i.test(umfeld);
    while ((m = PFAD_RE.exec(zeile_)) !== null) {
      const p = m[1];
      if (AUSNAHMEN.some((a) => a.test(p))) continue;
      if (istHerkunft) continue;
      if (!gefunden.has(p)) gefunden.set(p, []);
      gefunden.get(p).push(`${rel}:${i + 1}`);
    }
  }
}

function loest(p) {
  for (const [name, wurzel] of WURZELN) {
    if (fs.existsSync(path.resolve(wurzel, p))) return name;
  }
  return null;
}

console.log('\nVerweise-Check — zeigt jeder genannte Pfad auf etwas Echtes?\n');
const tot = [];
const proWurzel = new Map();
for (const [p, stellen] of gefunden) {
  const wo = loest(p);
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
console.log('\nJedes Werkzeug aus den completion_criteria existiert:\n');
{
  const skill = fs.readFileSync(path.join(WEB, 'SKILL.md'), 'utf8');
  const kopf = skill.slice(0, skill.indexOf('\n---', 4));
  const skripte = [...new Set([...kopf.matchAll(/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1]))];
  const fehlend = skripte.filter((s) => !fs.existsSync(path.join(WEB, 'scripts', s)));
  zeile(fehlend.length === 0 && skripte.length > 0,
    `${skripte.length} Skript(e) in den Kriterien genannt, alle vorhanden`,
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

console.log(`\n${fehler === 0 ? 'Alle Verweise' : 'NICHT alle Verweise'} loesen auf.`);
if (fehler) process.exit(1);
