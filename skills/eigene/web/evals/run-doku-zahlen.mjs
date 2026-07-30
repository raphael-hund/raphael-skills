#!/usr/bin/env node
/**
 * run-doku-zahlen.mjs — stimmen die Fallzahlen in SKILL.md noch?
 *
 * SKILL.md verspricht neben jedem Eval-Aufruf eine Fallzahl:
 *   node evals/run-craft-check.mjs   # 12 Faelle + Kontrolle
 *
 * Diese Zahl ist eine zweite Wahrheitsquelle. Sie veraltet still, weil nichts
 * sie an die Evals bindet: wer einen Fall hinzufuegt, aendert die Eval, nicht
 * den Prosa-Kommentar. Am 30.07.2026 gemessen — 6 von 14 Zahlen waren falsch,
 * craft stand als "12 Faelle" in der Doku und lief mit 22.
 *
 * Warum das mehr ist als Kosmetik: Wer die Doku liest und "12 Faelle" erwartet,
 * haelt einen Lauf mit 12 Faellen fuer vollstaendig — obwohl 10 fehlen. Die
 * Umfang-Wache (run-eval-umfang.mjs) faengt genau diesen Fall, aber nur gegen
 * ihren eigenen Sollstand. Wer stattdessen der Doku glaubt, bekommt keine
 * Warnung. Eine falsche Zahl in der Doku ist dieselbe Klasse Fehler wie eine
 * geratene Zahl im Pruefbericht: sie sieht gemessen aus.
 *
 * Quelle der Wahrheit ist evals/eval-umfang.json — der Sollstand, den die
 * Umfang-Wache aus echten Laeufen schreibt. Diese Eval vergleicht nur; sie
 * fuehrt keine Evals aus und braucht deshalb weder Browser noch Server.
 *
 * Aufruf:
 *   node evals/run-doku-zahlen.mjs
 *   node evals/run-doku-zahlen.mjs --aktualisieren   # Doku an die Messung anpassen
 *
 * Exit 0 = alle Zahlen stimmen, 1 = mindestens eine Zahl ist falsch,
 * 2 = Sollstand oder SKILL.md fehlt (nicht geprueft, nicht bestanden).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const MD = path.join(SKILL, 'SKILL.md');
const STAND = path.join(HIER, 'eval-umfang.json');
const AKTUALISIEREN = process.argv.includes('--aktualisieren');

for (const [p, was] of [[MD, 'SKILL.md'], [STAND, 'eval-umfang.json']]) {
  if (!fs.existsSync(p)) {
    console.error(`FEHLER: ${was} nicht gefunden: ${p}`);
    console.error('Ohne beide Seiten ist nichts zu vergleichen — nicht geprueft.');
    process.exit(2);
  }
}

const stand = JSON.parse(fs.readFileSync(STAND, 'utf8'));
let md = fs.readFileSync(MD, 'utf8');

// "node evals/run-x.mjs [--flag wert]   # 12 Faelle ..." — die Zahl direkt hinter
// dem Rautenzeichen. Zwischen Dateiname und # koennen Flags stehen (--nur M6),
// die einen Teillauf zeigen; solche Zeilen sind KEINE Aussage ueber den
// Gesamtumfang und werden uebersprungen.
// Der Rest der Zeile hinter "Faelle" wird MITGELESEN (Gruppe 4). Ohne ihn endet
// der Treffer bei "Faelle", und ein "+ Kontrolle" dahinter ist fuer jede Pruefung
// unsichtbar — genau so ist mein erster Schutz ins Leere gelaufen: die Regel
// stand da, sah richtig aus und testete einen String, der den Zusatz gar nicht
// enthielt. Ein Test auf Text, den das Muster abgeschnitten hat, ist immer gruen.
const MUSTER = /node evals\/(run-[a-z0-9-]+\.mjs)([^#\n]*)#\s*(\d+)\s*F(?:ä|ae)lle([^\n]*)/g;

// Zweite Form, gefunden am 30.07.2026: nicht jede Fallzahl steht als
// Kommentar hinter einem Befehl. Im Fliesstext heisst es
// "`node evals/run-bilder-check.mjs` (9 Faelle: 5 Ausbruchsversuche, ...)".
// Das MUSTER oben verlangt ein `#`, also fielen diese Stellen komplett durch —
// run-bilder-check stand mit 9 in der Doku und faehrt 12. Eine Wache, die nur
// eine Schreibweise kennt, meldet die andere nie.
const MUSTER_FLIESS = /evals\/(run-[a-z0-9-]+\.mjs)`?\s*\((\d+)\s*F(?:ä|ae)lle([^)\n]*)/g;

const funde = [];
const gesehen = new Set();
for (const m of md.matchAll(MUSTER)) {
  const [ganz, datei, zwischen, zahl, rest] = m;
  if (/--\S/.test(zwischen)) continue; // Teillauf, keine Umfangsaussage
  funde.push({ ganz, datei, doku: Number(zahl), zahl, rest });
  gesehen.add(datei);
}
for (const m of md.matchAll(MUSTER_FLIESS)) {
  const [ganz, datei, zahl, rest] = m;
  // Doppelt genannte Evals nur einmal pruefen — sonst zaehlt dieselbe Aussage
  // zweimal und die Gesamtzahl bewegt sich, ohne dass etwas dazukam.
  if (gesehen.has(datei)) continue;
  gesehen.add(datei);
  funde.push({ ganz, datei, doku: Number(zahl), zahl, rest });
}

let fehler = 0;
let ohneStand = 0;
let ersetzt = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

console.log('\nDoku-Zahlen — verspricht SKILL.md noch den echten Umfang?\n');
console.log(`${funde.length} Fallzahlen in SKILL.md, Sollstand mit ${Object.keys(stand).length} Eintraegen.\n`);

for (const f of funde) {
  const ist = stand[f.datei];
  if (ist === undefined) {
    // Kein Sollstand heisst NICHT "stimmt". Die Eval ist entweder ausgenommen
    // (Browser/Laufzeit) oder neu — in beiden Faellen ist die Doku-Zahl
    // ungeprueft. Sie als gruen zu melden waere derselbe Fehler wie ein
    // Pruefer, der ohne Eingabe "bestanden" sagt.
    ohneStand++;
    zeile(true, `${f.datei}: Doku sagt ${f.doku} — UNGEPRUEFT (kein Sollstand)`);
    continue;
  }
  if (ist === f.doku) {
    zeile(true, `${f.datei}: ${f.doku} Faelle`);
  } else if (/^\s*\+/.test(f.rest)) {
    // "12 Faelle + Kontrolle" zaehlt einen Teil bewusst NEBEN der Zahl. Die
    // gemessenen 22 enthalten die Kontrollfaelle bereits; stumpf ersetzt
    // entstuende "22 Faelle + Kontrolle" — einmal mitgezaehlt, einmal
    // danebengeschrieben. Die Wache waere gruen und der Satz falscher als
    // vorher. Ein Korrekturwerkzeug, das den Pruefer zufriedenstellt und die
    // Aussage verschlechtert, ist schlimmer als gar keins: danach liest den
    // Satz niemand mehr.
    // craft-check zeigt drei Zaehlweisen — 24 gedruckte Zeilen, 22 als
    // Schlusszahl, 12 in der Doku. Welche gemeint ist, kann nur ein Mensch
    // entscheiden.
    zeile(false, `${f.datei}: Doku sagt ${f.doku}, gemessen sind ${ist}`,
      'Zusatz nach der Zahl ("+ ...") — von Hand pruefen, --aktualisieren fasst das nicht an');
  } else {
    zeile(false, `${f.datei}: Doku sagt ${f.doku}, gemessen sind ${ist}`,
      AKTUALISIEREN ? 'wird korrigiert' : 'mit --aktualisieren anpassen');
    if (AKTUALISIEREN) {
      md = md.replace(f.ganz, f.ganz.replace(new RegExp(`${f.zahl}(\\s*F(?:ä|ae)lle)`), `${ist}$1`));
      ersetzt++;
    }
  }
}

if (AKTUALISIEREN && ersetzt) {
  fs.writeFileSync(MD, md);
  console.log(`\n${ersetzt} Zahl(en) in SKILL.md korrigiert.`);
  // Nicht "Exit 0, fertig": von Hand zu pruefende Zeilen bleiben offen. Ein
  // --aktualisieren, das gruen meldet, obwohl es Zeilen bewusst uebersprungen
  // hat, waere genau das falsche Gruen, das diese Wache verhindern soll.
  const offen = fehler - ersetzt;
  if (offen) {
    console.log(`${offen} Zeile(n) NICHT angefasst — Zusatz nach der Zahl, von Hand pruefen.`);
    process.exit(1);
  }
  console.log('Der naechste Lauf muss gruen sein — sonst hat das Ersetzen nicht gegriffen.');
  process.exit(0);
}

// --- Regelzahlen, nicht nur Fallzahlen ----------------------------------
// SKILL.md nennt auch, wie viele REGELN ein Pruefer hat ("craft-check.mjs hat
// 23 echte Pruefstellen"). Die veraltet genauso wie eine Fallzahl — und tat es:
// bis zum 30.07.2026 stand dort "28 Regeln (M1-M25, T1-T10)", eine Zahl aus
// einem grep ueber die ganze Datei, die Kommentar-Erwaehnungen mitzaehlte.
// Gemessen sind es 23 add()-Stellen. Eine Abdeckungszahl, die zu NIEDRIG luegt,
// kostet genauso Zeit wie eine zu hohe: man sucht Fixtures fuer Regeln, die es
// nicht gibt.
{
  const doku = md.match(/craft-check\.mjs`? hat \*\*(\d+) echte Pruefstellen/);
  const quelle = fs.readFileSync(path.join(SKILL, 'scripts', 'craft-check.mjs'), 'utf8');
  const echt = new Set(
    [...quelle.matchAll(/add\('[A-Z]+', '([MT][0-9/]+)'/g)]
      .flatMap((m) => m[1].split('/').map((x) => (/^\d/.test(x) ? `M${x}` : x))),
  ).size;
  if (!doku) {
    zeile(false, 'keine Regelzahl zu craft-check.mjs in SKILL.md gefunden',
      'umformuliert? Dann dieses Muster anpassen, nicht die Pruefung entfernen');
  } else {
    zeile(Number(doku[1]) === echt,
      `craft-check.mjs: SKILL.md sagt ${doku[1]} Pruefstellen, gezaehlt sind ${echt}`,
      Number(doku[1]) === echt ? null : 'Zahl in SKILL.md nachziehen');
  }
}

// --- Der Tastatur-Befund und sein Stand ---------------------------------
// SKILL.md nennt "7 von 10 zusammengesetzten Widgets" und behauptet daneben, alle
// sieben seien repariert. Beide Haelften sind messbar, und beide veralten: die 10
// aendert sich mit jeder neuen Komponente, der Nullstand mit jedem Rueckschritt.
//
// Befund 30.07.2026: der Abschnitt nannte den Befund im PRAESENS ("haben saubere
// Rollen und keine Tastaturbedienung") und sagte nirgends, dass die sieben
// repariert sind. Wer nur diesen Abschnitt liest, vermutet sieben offene
// Baustellen. Eine Doku, die einen behobenen Befund wie einen offenen darstellt,
// kostet dieselbe Zeit wie eine falsche Zahl.
{
  const dokuWidgets = md.match(/\*\*(\d+) von (\d+)\*\* zusammengesetzten Widgets/);
  let aus = '';
  try {
    aus = execFileSync('node',
      [path.join(SKILL, 'scripts', 'tastatur-check.mjs'), path.join(SKILL, 'references', 'ui-components')],
      { encoding: 'utf8', timeout: 300000 });
  } catch (e) {
    aus = `${e.stdout || ''}${e.stderr || ''}`;
  }
  const gefunden = aus.match(/(\d+) zusammengesetzte Widget/);
  const blocker = aus.match(/(\d+) Blocker/);
  if (!dokuWidgets) {
    zeile(false, 'keine Aussage "N von M zusammengesetzten Widgets" in SKILL.md gefunden');
  } else if (!gefunden) {
    console.error('\nFEHLER: tastatur-check nennt keine Widget-Zahl — nicht geprueft.');
    process.exit(2);
  } else {
    zeile(Number(dokuWidgets[2]) === Number(gefunden[1]),
      `Widgets: SKILL.md sagt "von ${dokuWidgets[2]}", gefunden werden ${gefunden[1]}`,
      Number(dokuWidgets[2]) === Number(gefunden[1]) ? null : 'Zahl in SKILL.md nachziehen');
    // "Alle sieben sind repariert" ist nur wahr, solange 0 Blocker gemeldet werden.
    const behauptetRepariert = /Alle sieben sind seit .* repariert/.test(md);
    const nullBlocker = !blocker || Number(blocker[1]) === 0;
    zeile(!behauptetRepariert || nullBlocker,
      `Reparatur-Stand: SKILL.md sagt "alle repariert", Pruefer meldet ${blocker ? blocker[1] : 0} Blocker`,
      behauptetRepariert && !nullBlocker
        ? 'entweder ein Widget ist zurueckgefallen oder die Aussage muss weg' : null);
  }
}

// --- Zahlen in den References ---------------------------------------------
// SKILL.md ist nicht der einzige Ort mit Fallzahlen. Das Klon-Playbook nannte
// "21 Faelle", waehrend die Eval 28 fuhr — dieselbe Klasse Fehler wie im
// Frontmatter, nur eine Datei weiter. Wer die Zahl dort liest, haelt einen Lauf
// mit 21 Faellen fuer vollstaendig.
{
  const playbook = path.join(SKILL, 'references', 'web-clone-playbook.md');
  if (!fs.existsSync(playbook)) {
    zeile(false, 'web-clone-playbook.md nicht gefunden — verschoben?');
  } else {
    const txt = fs.readFileSync(playbook, 'utf8');
    const m = txt.match(/run-klon-gate\.mjs`? \((\d+) F(?:ä|ae)lle/);
    const soll = stand['run-klon-gate.mjs'];
    zeile(m && soll && Number(m[1]) === soll,
      `web-clone-playbook.md: sagt ${m ? m[1] : '?'} Klon-Faelle, Sollstand kennt ${soll ?? '?'}`,
      m && Number(m[1]) === soll ? null : 'Zahl im Playbook nachziehen');
  }
}

// --- Die eval_scorecard im Frontmatter -----------------------------------
// Sie ist der erste Ort, den ein fremder Agent liest, um zu wissen, wie tief
// dieser Skill geprueft ist — und sie war beim Anlegen am 30.07.2026 schon
// falsch: "24 Evals" notiert, waehrend der Umfang-Waechter 25 zaehlte. Eine
// Zahl ueber die Pruefung, die selbst ungeprueft ist, ist genau der Fehler,
// den dieser Skill an sechs anderen Stellen gefunden hat.
{
  const scorecardZahl = (muster) => {
    const m = md.match(muster);
    return m ? Number(m[1]) : null;
  };
  // Sollwert ist NICHT die Zahl der Sollstand-Eintraege: der Sollstand speichert
  // nur Evals mit einer festen Fallzahl, waehrend zwei Wachen (doku-zahlen,
  // verweise-check) ohne Fallzahl laufen und trotzdem geprueft werden. Erster
  // Versuch verglich gegen `Object.keys(stand)` und meldete deshalb "sagt 25,
  // Sollstand kennt 23" — ein Fehlalarm gegen die falsche Groesse. Gemessen
  // wird, was der Umfang-Waechter wirklich faehrt: alle run-*.mjs minus die
  // ausdruecklich ausgenommenen.
  const dateien = fs.readdirSync(HIER).filter((f) => /^run-.*\.mjs$/.test(f)).length;
  const ausgenommen = (fs.readFileSync(path.join(HIER, 'run-eval-umfang.mjs'), 'utf8')
    .match(/^\s*'run-[a-z-]+\.mjs':/gm) || []).length;
  const evalAnzahl = dateien - ausgenommen;

  const dokuEvals = scorecardZahl(/run-eval-umfang\.mjs — (\d+) Evals/);
  zeile(dokuEvals === evalAnzahl,
    `Scorecard: sagt ${dokuEvals ?? '?'} gepruefte Evals, der Waechter faehrt ${evalAnzahl}`,
    dokuEvals === evalAnzahl ? null : 'Zahl in der eval_scorecard nachziehen');

  // "N weitere Pruefer-Evals" — die drei Wachen sind einzeln genannt, der Rest
  // pauschal. Zusammen muss es die Zahl der run-*.mjs-Dateien ergeben.
  const weitere = scorecardZahl(/"(\d+) weitere Pruefer-Evals/);
  const genannt = (md.match(/^\s*- "evals\/run-/gm) || []).length;
  zeile(weitere !== null && weitere + genannt === dateien,
    `Scorecard: ${genannt} einzeln + ${weitere ?? '?'} pauschal = ${weitere === null ? '?' : weitere + genannt}, `
      + `im Ordner liegen ${dateien}`,
    weitere !== null && weitere + genannt === dateien ? null
      : 'Summe der Scorecard deckt den evals-Ordner nicht');
}

if (ohneStand) {
  console.log(`\n  ${ohneStand} Doku-Zahl(en) ohne Sollstand — ungepruefte Versprechen.`);
  console.log('  Betrifft ausgenommene Evals (Browser/Laufzeit): einzeln nachfahren.');
}

// +1 fuer die Regelzahl-Pruefung oben, die kein `funde`-Eintrag ist.
console.log(`\n${funde.length + 6 - fehler - ohneStand}/${funde.length + 6 - ohneStand} gepruefte Doku-Zahlen stimmen`
  + `${ohneStand ? ` (${ohneStand} ohne Sollstand)` : ''}.`);
if (fehler) {
  console.log('SKILL.md verspricht einen Umfang, den die Evals nicht haben.');
  process.exit(1);
}
console.log('Wer der Doku glaubt, erwartet die richtige Zahl an Faellen.');
process.exit(0);
