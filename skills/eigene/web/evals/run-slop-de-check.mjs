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
function scanne(text) {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'slop-de-'));
  try {
    fs.writeFileSync(path.join(ordner, 'index.html'),
      `<!doctype html><html lang="de"><body><p>${text}</p></body></html>`);
    let roh;
    try {
      roh = execFileSync('node', [SCAN, ordner, `--rules=${REGELN}`, '--json'],
        { encoding: 'utf8' });
    } catch (e) {
      roh = String(e.stdout || '');
    }
    return JSON.parse(roh);
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

const ids = (json) => (json.findings || []).map((f) => f.id);

let fehler = 0;
const zeile = (ok, text, detail) => {
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// --- 1. Treffer -----------------------------------------------------------
console.log('\nSlop-Check DEUTSCH — findet der Scanner deutsche Floskeln?\n');
console.log('Diese muessen anschlagen — sonst laeuft das Tor auf Deutsch blind:\n');
for (const [erwartet, satz] of TREFFER) {
  const gefunden = ids(scanne(satz));
  zeile(gefunden.includes(erwartet),
    `${erwartet}  "${satz.slice(0, 52)}${satz.length > 52 ? '…' : ''}"`,
    gefunden.includes(erwartet) ? null : `erwartet ${erwartet}, bekam [${gefunden.join(', ') || 'nichts'}]`);
}

// --- 2. Ruhe --------------------------------------------------------------
console.log('\nDiese muessen still bleiben — sonst ist der Regelsatz unbrauchbar:\n');
for (const satz of RUHE) {
  const gefunden = ids(scanne(satz)).filter((i) => i.startsWith('de-'));
  zeile(gefunden.length === 0,
    `"${satz.slice(0, 56)}${satz.length > 56 ? '…' : ''}"`,
    gefunden.length ? `Falsch-Positiv: ${gefunden.join(', ')}` : null);
}

// --- 2b. Bewusste Grenzen -------------------------------------------------
console.log('\nBewusst nicht abgedeckt — muss still bleiben, ist keine Luecke:\n');
for (const [satz, warum] of BEWUSST_BLIND) {
  const gefunden = ids(scanne(satz)).filter((i) => i.startsWith('de-'));
  zeile(gefunden.length === 0, `"${satz}"  (${warum})`,
    gefunden.length ? `schlaegt jetzt an (${gefunden.join(', ')}) — Muster zu breit nachgeruestet?` : null);
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
const gesamt = TREFFER.length + RUHE.length + BEWUSST_BLIND.length + 5;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Der deutsche Slop-Schutz ist luecken- oder laermhaft.');
  process.exit(1);
}
console.log('Eine deutsche Floskel-Seite kommt nicht mehr gruen durchs Tor.');
