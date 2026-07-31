#!/usr/bin/env node
/**
 * run-slop-de-check.mjs — laeuft der Slop-Scanner wirklich auf DEUTSCH?
 *
 * Befund 29.07.2026: `scan-ai-slop.mjs` ist englischsprachig (vendoriert aus
 * kill-ai-slop). Eine deutsche Landingpage mit "maßgeschneiderte Lösungen",
 * "in der heutigen schnelllebigen Welt", "auf das nächste Level", "Schluss mit
 * Meeting-Theater" und "Rundum-sorglos-Paket" ergab:
 *
 *     {filesScanned: 1, hits: 0, findings: []}   Exit 0
 *
 * Das Gate machte daraus "0 Slop-Tells", bestanden. Raphaels Kundenseiten sind
 * praktisch alle deutsch — der schaerfste Copy-Pruefer des Tors war auf genau
 * der Sprache blind, die ausgeliefert wird.
 *
 * Diese Eval prueft drei Dinge, die je einzeln falsches Gruen erzeugen wuerden:
 *   1. TREFFER  — jedes Muster aus rules.de.mjs findet seinen Beispielsatz.
 *   2. RUHE     — sauberer deutscher Fachtext loest KEINEN Treffer aus.
 *                 (Ein Regelsatz, der auf allem anschlaegt, wird abgeschaltet
 *                  und schuetzt dann gar nichts.)
 *   3. EINSTUFUNG — de-14 blockt im Gate, de-15/de-16 warnen nur.
 *
 * Braucht keinen Browser und keinen Server, aber den echten Scanner.
 *
 *   node evals/run-slop-de-check.mjs
 *
 * Exit 0 = alle Faelle wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const SCAN = path.resolve(SKILL, '../../design/scripts/scan-ai-slop.mjs');
const REGELN = path.resolve(SKILL, '../../design/scripts/rules.de.mjs');
const GATE = path.join(SKILL, 'scripts', 'g1-gate.mjs');

for (const [was, p] of [['Scanner', SCAN], ['Regelsatz', REGELN], ['Gate', GATE]]) {
  if (!fs.existsSync(p)) {
    console.error(`FEHLER: ${was} nicht gefunden: ${p}`);
    process.exit(1);
  }
}

// --- Testfaelle -----------------------------------------------------------
// Jeder Satz stammt aus copywriting/references/floskel-verbote.md. Steht dort
// eine Floskel, die hier keinen Fall hat, ist der Regelsatz unvollstaendig.
const TREFFER = [
  ['de-14', 'In der heutigen schnelllebigen digitalen Welt zaehlt Tempo.'],
  ['de-14', 'Es ist wichtig zu beachten, dass die Ladezeit sinkt.'],
  ['de-14', 'Tauchen Sie ein in unsere Produktwelt.'],
  ['de-14', 'Wir freuen uns, Ihnen mitteilen zu können: es ist da.'],
  ['de-14', 'Es geht nicht nur um Software, sondern um Haltung.'],
  ['de-14', 'Sagen Sie goodbye zu Papierkram.'],
  ['de-14', 'Schluss mit endlosen Abstimmungsrunden.'],
  ['de-14', 'Wir heben Ihr Geschaeft auf das nächste Level.'],
  ['de-14', 'Wir beenden das Meeting-Theater.'],
  ['de-14', 'Ihre Reise beginnt mit einem Klick.'],
  ['de-16', 'Wir bieten maßgeschneiderte Lösungen für den Mittelstand.'],
  ['de-16', 'Ein ganzheitlicher Ansatz für Ihr Marketing.'],
  ['de-16', 'Nahtlose Integration in Ihre Systeme.'],
  ['de-16', 'Das Rundum-sorglos-Paket, alles aus einer Hand.'],
  ['de-16', 'Unserem Design fehlt nie das gewisse Etwas.'],
  ['de-16', 'Das ist bahnbrechend und revolutionär zugleich.'],
  ['de-15', 'Jetzt kaufen! Sofort starten! Nie wieder warten!'],
  // Nach dem Roast verschaerft — die Muster sind enger, muessen den Kern aber
  // weiterhin treffen. Ohne diese Faelle waere "keine Fehlalarme mehr" auch
  // dadurch erreichbar, dass die Regel gar nichts mehr findet.
  ['de-14', 'Wir beenden das Prozess-Theater in Ihrer Abteilung.'],
  ['de-14', 'Schluss mit Papierkram.'],
  ['de-16', 'Unsere revolutionäre Plattform verbindet alles.'],
  ['de-16', 'Eine bahnbrechende Lösung für Ihr Lager.'],
  // Abdeckungsmessung 29.07.2026: diese standen in floskel-verbote.md, aber in
  // keinem Muster. "Wir entfesseln Ihr Potenzial" lief vorbei, weil nur die
  // Wortstellung "Potenzial entfesseln" abgedeckt war — im Deutschen steht das
  // Verb aber genauso oft vorn.
  ['de-14', 'Es sei angemerkt, dass die Frist laeuft.'],
  ['de-14', 'Entdecken Sie die Welt von Morgen.'],
  ['de-14', 'Die Customer Journey beginnt hier.'],
  ['de-16', 'Das ist das Nonplusultra der Branche.'],
  ['de-16', 'Ein echter Game-Changer fuer Ihr Team.'],
  ['de-16', 'Das i-Tuepfelchen auf Ihrem Projekt.'],
  ['de-16', 'Wir entfesseln Ihr Potenzial.'],
  ['de-16', 'Wir bieten nahtlose Ablaeufe und einzigartige Qualitaet.'],
  // --- Nachgetragen 31.07.2026 ------------------------------------------
  // Gemessen: vier der 26 Muster in rules.de.mjs hatten keinen einzigen
  // Testsatz — obwohl der Kopf dieser Datei "jedes Muster findet seinen
  // Beispielsatz" verspricht. Alle vier funktionierten bei der Pruefung; das
  // ist Glueck, kein Nachweis. Ein Muster ohne Testsatz kann beim naechsten
  // Umbau still kaputtgehen, und die Eval bliebe gruen.
  //
  // Der Gedankenstrich in der ersten Zeile ist ein echter Halbgeviertstrich —
  // das Muster verlangt ihn (oder Bindestrich) VOR "sondern". Die schon
  // vorhandene Variante "nicht nur ..., sondern" ohne Strich trifft ein
  // anderes Muster derselben Regel.
  ['de-14', 'Wir liefern nicht nur Tempo — sondern auch Qualitaet.'],
  ['de-16', 'Eine Marke voller Potenziale wartet auf Sie.'],
  ['de-16', 'Jetzt das Potenzial entfesseln und durchstarten.'],
  ['de-15', 'Wirklich?! Das haetten Sie nicht gedacht.'],
];

// Steht in floskel-verbote.md, ist aber bewusst NICHT als Muster gebaut: eine
// Dreier-Aufzaehlung ist strukturell nicht von einer echten Leistungsliste zu
// unterscheiden. Der Fall steht hier, damit niemand ihn spaeter fuer eine
// vergessene Luecke haelt und ein Muster nachruestet, das jede Aufzaehlung rot
// faerbt. Er wird geprueft: er MUSS still bleiben.
const BEWUSST_BLIND = [
  ['Schnell, einfach und effektiv.', 'Dreier-Aufzaehlung — nicht greppbar, siehe rules.de.mjs'],
];

// Diese Saetze sind normales, gutes Deutsch. Ein Treffer hier ist ein
// Falsch-Positiv und macht den Regelsatz unbrauchbar.
const RUHE = [
  'Der Umzug kostet 890 Euro und dauert einen Tag.',
  'Wir raeumen Kellerraeume in Muenchen und Umgebung.',
  'Die Reise nach Rom dauert zwei Stunden ab Flughafen.',
  'Das Formular hat vier Felder und braucht 30 Sekunden.',
  'Rufen Sie an: 089 123456. Wir sind ab 8 Uhr erreichbar.',
  'Unser Team besteht aus elf Monteuren mit Fachausbildung.',
  'Die Integration laeuft ueber eine dokumentierte REST-Schnittstelle.',
  'Jetzt anfragen!',
  // --- Roast-Funde 29.07.2026 -------------------------------------------
  // Diese sechs schlugen in der ersten Fassung an, zwei davon als BLOCKER.
  // Sie stehen hier dauerhaft, weil genau solche Saetze auf Raphaels
  // Handwerker-Seiten vorkommen — ein Waechter, der sie rot faerbt, wird
  // abgeschaltet und schuetzt danach gar nichts mehr.
  'Wir haben das Stadttheater Karlsruhe saniert.',
  'Der Theater-Umbau dauerte vier Monate.',
  'Unser Buero liegt am Theaterplatz 4.',
  'Schluss mit der Debatte um die Kostenverteilung.',
  'Eine bahnbrechende Studie der TU Muenchen belegt das.',
  'Wegweisende Urteile des BGH aus dem Jahr 2019.',
];

// --- Hilfen ---------------------------------------------------------------
// EIN Scanner-Aufruf fuer alle Saetze, nicht einer pro Satz.
//
// Die erste Fassung startete pro Testfall einen eigenen node-Prozess. Bei 50
// Faellen sind das 50 Interpreter-Starts; auf dem VPS unter Last (29.07.2026:
// Load 100) lief die Eval damit ueber zehn Minuten und wurde zweimal vom
// Zeitlimit abgeschossen. Eine Eval, die niemand zu Ende laufen laesst, prueft
// nichts.
//
// Stattdessen: jeder Satz auf eine eigene Zeile derselben Datei, ein Lauf, die
// Zuordnung ueber die Zeilennummer. Der Scanner meldet `line` je Treffer.
// Das ist auch naeher am Ernstfall — dort steht der Satz ebenfalls in einer
// Seite mit anderen Zeilen und nicht allein.
function scanneAlle(saetze) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'slop-de-'));
  try {
    // Zeile 1 ist der doctype, ab Zeile 2 kommen die Saetze: Satz i steht auf
    // Zeile i+2. Ein <p> pro Zeile, damit kein Muster ueber zwei Saetze hinweg
    // greift und einen Treffer dem falschen Fall zuschreibt.
    const html = ['<!doctype html><html lang="de"><body>']
      .concat(saetze.map((s) => `<p>${s}</p>`))
      .concat(['</body></html>']).join('\n');
    fs.writeFileSync(path.join(ordner, 'index.html'), html);
    let roh;
    try {
      roh = execFileSync('node', [SCAN, ordner, `--rules=${REGELN}`, '--json'],
        { encoding: 'utf8' });
    } catch (e) {
      roh = String(e.stdout || '');
    }
    const json = JSON.parse(roh);
    // zeile -> Set der dort gefundenen Tell-IDs
    const proZeile = new Map();
    for (const f of json.findings || []) {
      for (const h of f.hits || []) {
        if (!proZeile.has(h.line)) proZeile.set(h.line, new Set());
        proZeile.get(h.line).add(f.id);
      }
    }
    return saetze.map((_, i) => [...(proZeile.get(i + 2) || [])]);
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

// Der Regelsatz selbst — fuer die Laufzeitmessung direkt geladen.
const REGELSATZ = (await import(REGELN)).default;


let fehler = 0;
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// --- 1. Treffer -----------------------------------------------------------
console.log('\nSlop-Check DEUTSCH — findet der Scanner deutsche Floskeln?\n');
console.log('Diese muessen anschlagen — sonst laeuft das Tor auf Deutsch blind:\n');
const trefferErg = scanneAlle(TREFFER.map(([, s]) => s));
for (const [i, [erwartet, satz]] of TREFFER.entries()) {
  const gefunden = trefferErg[i];
  zeile(gefunden.includes(erwartet),
    `${erwartet}  "${satz.slice(0, 52)}${satz.length > 52 ? '…' : ''}"`,
    gefunden.includes(erwartet) ? null : `erwartet ${erwartet}, bekam [${gefunden.join(', ') || 'nichts'}]`);
}

// --- 2. Ruhe --------------------------------------------------------------
console.log('\nDiese muessen still bleiben — sonst ist der Regelsatz unbrauchbar:\n');
const ruheErg = scanneAlle(RUHE);
for (const [i, satz] of RUHE.entries()) {
  const gefunden = ruheErg[i].filter((x) => x.startsWith('de-'));
  zeile(gefunden.length === 0,
    `"${satz.slice(0, 56)}${satz.length > 56 ? '…' : ''}"`,
    gefunden.length ? `Falsch-Positiv: ${gefunden.join(', ')}` : null);
}

// --- 2b. Bewusste Grenzen -------------------------------------------------
console.log('\nBewusst nicht abgedeckt — muss still bleiben, ist keine Luecke:\n');
const blindErg = scanneAlle(BEWUSST_BLIND.map(([s]) => s));
for (const [i, [satz, warum]] of BEWUSST_BLIND.entries()) {
  const gefunden = blindErg[i].filter((x) => x.startsWith('de-'));
  zeile(gefunden.length === 0, `"${satz}"  (${warum})`,
    gefunden.length ? `schlaegt jetzt an (${gefunden.join(', ')}) — Muster zu breit nachgeruestet?` : null);
}

// --- 2c. Laufzeit ---------------------------------------------------------
// Die Muster enthalten begrenzte Quantifizierer ((?:\w+ ){0,2}?, {0,120}).
// Das ist die Stelle, an der jemand spaeter versehentlich zwei unbegrenzte
// Wiederholungen ineinander schachtelt und den Scanner damit auf boesartigen
// Eingaben haengen laesst. Gemessen wird CPU-Zeit, nicht Wanduhr: der VPS hatte
// am 29.07.2026 Load 100, und ein Wanduhr-Limit haette hier falschen Alarm
// geschlagen (94s Laufzeit bei 0,1s Rechenzeit).
console.log('\nLaufzeit der Muster — begrenzte Quantifizierer, kein Backtracking:\n');
{
  const boese = [
    'a'.repeat(2000),
    'Wir sind ' + 'sehr '.repeat(400) + 'gut.',
    '!'.repeat(600),
    'Schluss mit ' + 'x'.repeat(1500),
    'nicht nur ' + '-'.repeat(1500),
  ];
  const vorher = process.cpuUsage();
  for (const s of boese) {
    for (const t of REGELSATZ) for (const p of t.patterns) p.test(s);
  }
  const cpuMs = (process.cpuUsage(vorher).user + process.cpuUsage(vorher).system) / 1000;
  zeile(cpuMs < 500,
    `${boese.length} boesartige Eingaben gegen alle Muster: ${cpuMs.toFixed(0)}ms CPU`,
    cpuMs < 500 ? null : 'ueber 500ms — ein Muster backtrackt, bitte Quantifizierer pruefen');
}

// --- 3. Einstufung im Gate ------------------------------------------------
console.log('\nEinstufung im Tor — nur die Textstimme darf die Auslieferung stoppen:\n');
const gateQuelle = fs.readFileSync(GATE, 'utf8');
const blockBlock = gateQuelle.slice(
  gateQuelle.indexOf('const SLOP_BLOCK = new Set('),
  gateQuelle.indexOf(']);', gateQuelle.indexOf('const SLOP_BLOCK = new Set(')));
zeile(blockBlock.includes("'de-14'"), "de-14 steht in SLOP_BLOCK (blockt)");
zeile(!blockBlock.includes("'de-15'"), "de-15 blockt nicht (nur Warnung)");
zeile(!blockBlock.includes("'de-16'"), "de-16 blockt nicht (nur Warnung)");

// Und: reicht das Gate den Regelsatz ueberhaupt an den Scanner weiter?
zeile(gateQuelle.includes('rules.de.mjs') && gateQuelle.includes('--rules='),
  'Gate uebergibt --rules=rules.de.mjs an den Scanner');
zeile(gateQuelle.includes('rules.de.mjs fehlt'),
  'fehlender Regelsatz steht im Urteilstext, statt still englisch zu laufen');

// --- Schluss --------------------------------------------------------------
// Die Summe zaehlt sich selbst.
//
// Sie stand hier als Handzahl. Bei run-bilder-check war so eine Formel
// nachweislich falsch: gemeldet wurden 9/9, waehrend zwoelf Faelle liefen — drei
// geprueft Faelle blieben unerwaehnt. Der Fehler macht nichts kaputt, er
// VERSCHWEIGT eigene Arbeit, und er wird bei jedem Zusatz neu falsch, weil die
// Zahl an einer Stelle steht, die niemand anfasst, wenn er einen Fall ergaenzt.
//
// Geprueft 30.07.2026: in dieser Datei stimmte sie noch. Umgebaut wird trotzdem
// — die Bauart ist der Fehler, nicht erst sein Eintreten.
// --- 3b. Kein Muster ohne Testsatz ----------------------------------------
// Der Kopf dieser Datei verspricht "jedes Muster findet seinen Beispielsatz".
// Bis zum 31.07.2026 war das eine Behauptung: vier der 26 Muster hatten
// keinen. Sie funktionierten zufaellig alle — aber ein Muster ohne Testsatz
// kann beim naechsten Umbau still kaputtgehen, und die Eval bliebe gruen.
//
// Diese Wache dreht die Richtung um: nicht "laufen meine Saetze durch?",
// sondern "hat jedes Muster einen Satz, der es auslöst?". Sie faellt beim
// naechsten neu ergaenzten Muster sofort auf, nicht erst beim naechsten
// Handzaehlen.
console.log('\nJedes Muster braucht einen Beispielsatz — sonst prueft es niemand:\n');
{
  const saetze = TREFFER.map(([, satz]) => satz);
  const ohne = [];
  for (const t of REGELSATZ) {
    for (const muster of t.patterns) {
      // Globale Regexe merken sich ihre Position — ohne lastIndex-Reset
      // liefert derselbe Ausdruck beim zweiten Satz false.
      const trifft = saetze.some((satz) => { muster.lastIndex = 0; return muster.test(satz); });
      if (!trifft) ohne.push(`${t.id}: ${String(muster).slice(0, 55)}`);
    }
  }
  const gesamtMuster = REGELSATZ.reduce((n, t) => n + t.patterns.length, 0);
  zeile(ohne.length === 0,
    `alle ${gesamtMuster} Muster aus rules.de.mjs haben einen Beispielsatz in TREFFER`,
    ohne.length === 0 ? null
      : `${ohne.length} ohne Satz — ${ohne.slice(0, 3).join(' | ')}${ohne.length > 3 ? ' …' : ''}`);
}

// --- 4. Der Regelsatz muss auch wirklich ankommen -------------------------
// Alles oben prueft die MUSTER. Dieser Abschnitt prueft den WEG: der beste
// deutsche Regelsatz nuetzt nichts, wenn der Aufruf ihn unterwegs verliert.
//
// Befund 31.07.2026: scan-ai-slop liest Wert-Flags ausschliesslich als
// `--rules=<pfad>`. Wer `--rules <pfad>` mit Leerzeichen tippt, verliert den
// Regelsatz KOMMENTARLOS — gemessen an einer Datei mit zwei deutschen Floskeln
// fiel die Trefferzahl von 2 auf 1, Exit blieb 0. Der Lauf sah aus wie ein
// deutscher Scan und war ein englischer.
console.log('\nDer Weg zum Regelsatz — verliert der Aufruf ihn unterwegs?\n');
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'slop-de-weg-'));
  fs.writeFileSync(path.join(ordner, 'a.js'),
    'const t = "seamless und massgeschneiderte Loesungen";\n');

  const zahl = (argv) => {
    try {
      const roh = execFileSync('node', [SCAN, ordner, ...argv, '--json'],
        // stderr des Kindes schlucken: die erwarteten Fehlermeldungen der
      // Flag-Wache gehoeren nicht ins Eval-Protokoll, sonst liest sich ein
      // bestandener Fall wie ein Absturz.
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
      return JSON.parse(roh).hits;
    } catch (e) { return { fehler: e.status ?? 'kaputt' }; }
  };

  const mit = zahl([`--rules=${REGELN}`]);
  const ohne = zahl([]);
  zeile(typeof mit === 'number' && typeof ohne === 'number' && mit > ohne,
    `--rules=<pfad> findet mehr als ohne (${JSON.stringify(mit)} statt ${JSON.stringify(ohne)})`,
    typeof mit === 'number' && typeof ohne === 'number' && mit > ohne ? null
      : 'Ohne diesen Unterschied belegt der naechste Fall nichts.');

  const getrennt = zahl(['--rules', REGELN]);
  zeile(typeof getrennt === 'object' && getrennt.fehler === 2,
    '--rules <pfad> mit Leerzeichen wird abgelehnt (Exit 2), nicht still ignoriert',
    typeof getrennt === 'object' && getrennt.fehler === 2 ? null
      : typeof getrennt === 'number'
        ? `lief durch und meldete ${getrennt} Treffer — der Regelsatz ging verloren`
        : `Exit ${getrennt.fehler} statt 2`);

  const vertippt = zahl(['--jsonn']);
  zeile(typeof vertippt === 'object' && vertippt.fehler === 2,
    'ein unbekanntes Flag wird abgelehnt (Exit 2), nicht stillschweigend ignoriert',
    typeof vertippt === 'object' && vertippt.fehler === 2 ? null
      : typeof vertippt === 'number'
        ? `lief mit Standardwerten durch und meldete ${vertippt} Treffer`
        : `Exit ${vertippt.fehler} statt 2`);

  fs.rmSync(ordner, { recursive: true, force: true });
}

const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der deutsche Slop-Schutz ist luecken- oder laermhaft.');
  process.exit(1);
}
console.log('Eine deutsche Floskel-Seite kommt nicht mehr gruen durchs Tor.');
