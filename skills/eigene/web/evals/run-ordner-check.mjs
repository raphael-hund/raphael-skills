#!/usr/bin/env node
/**
 * run-ordner-check.mjs — liest jeder Pruefer den Ordner, fuer den er gebaut ist?
 *
 * Bis 29.07.2026 bekamen alle dateilesenden Pruefer dasselbe `--src`. Sie
 * brauchen aber Gegensaetzliches:
 *
 *   Import-Check   -> QUELLE (import-Zeilen stehen nur in .tsx/.jsx)
 *   Slop-Scan      -> BUILD  (dort steht der ausgelieferte Text)
 *   Routen-Zaehler -> BUILD  (er zaehlt ausgelieferte HTML-Seiten)
 *
 * An der MAKE-Website gemessen: derselbe Scan ergab 96 Treffer in der Quelle
 * und 6 im Build. Mit `--src .` bekommt man 90 Befunde ueber Dateien, die nie
 * ausgeliefert werden — der Laerm, an dem ein Waechter stirbt. Mit `--src dist`
 * verliert man den Import-Check ganz.
 *
 * Der Bau hier ist bewusst gemein: die QUELLE enthaelt eine Floskel, die im
 * BUILD nicht vorkommt. Liest der Slop-Scan die Quelle, meldet er sie — und
 * genau daran erkennt man, dass er den falschen Ordner liest.
 *
 * Der Kernfall braucht einen laufenden Server (der Lauf startet ihn selbst):
 * bei totem Port bricht das Tor ab, bevor der Slop-Scan drankommt — und dann
 * besteht der Test, ohne etwas gemessen zu haben.
 *
 *   node evals/run-ordner-check.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKILL = path.join(HIER, '..');
const GATE = path.join(SKILL, 'scripts', 'g1-gate.mjs');

let fehler = 0;
let geprueft = 0;   // von zeile() hochgezaehlt
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// --- Projekt bauen --------------------------------------------------------
// Quelle: eine .tsx mit Floskel. Build: saubere HTML ohne Floskel.
function projektBauen({ buildName = 'dist' } = {}) {
  const p = fs.mkdtempSync(path.join(os.tmpdir(), 'ordner-'));
  fs.mkdirSync(path.join(p, 'src'), { recursive: true });
  fs.writeFileSync(path.join(p, 'src', 'App.tsx'),
    'export const t = "Wir heben Ihr Geschäft auf das nächste Level.";\n');
  if (buildName) {
    fs.mkdirSync(path.join(p, buildName), { recursive: true });
    fs.writeFileSync(path.join(p, buildName, 'index.html'),
      '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>T</title></head>'
      + '<body><h1>Kellerraeumung in Muenchen</h1><p>Der Umzug kostet 890 Euro.</p></body></html>\n');
  }
  return p;
}

// Der Kernfall braucht einen ANTWORTENDEN Server: bei totem Port bricht das Tor
// vor dem Slop-Scan ab, und dann steht in beiden Faellen "keine ai-slop-Zeile" —
// der Test besteht, ohne etwas gemessen zu haben. Erster Anlauf 29.07.2026 tat
// genau das; nur die Gegenprobe hat es aufgedeckt.
const HAFEN = Number(process.env.ORDNER_PORT || 5511);
let server;
function serverAn(ordner) {
  serverAus();
  server = spawn('python3', ['-m', 'http.server', String(HAFEN), '--directory', ordner],
    { stdio: 'ignore' });
  spawnSync('sleep', ['2']);
}
function serverAus() { if (server) { server.kill(); server = null; } }
process.on('exit', serverAus);
// `process.on('exit')` laeuft bei einem SIGNAL NICHT — und genau so werden
// diese Evals abgebrochen, wenn jemand `timeout 600 node evals/...` faehrt oder
// Strg-C drueckt. Der Server ueberlebt dann, wird von systemd adoptiert (PPID 1)
// und haelt seinen Port fest; der naechste Lauf misst gegen einen FREMDEN
// Server oder bricht mit "Port belegt" ab.
//
// Gemessen am 30.07.2026: drei verwaiste Testserver, ueber vier Stunden alt,
// auf 5377/5378/5379. An einem Minimalbeispiel nachgestellt — ohne
// Signal-Handler ueberlebt der Server SIGTERM, mit Handler bleibt 0 uebrig.
for (const sig of ['SIGTERM', 'SIGINT', 'SIGHUP']) {
  process.on(sig, () => { serverAus(); process.exit(2); });
}

function torQuelle(argv) {
  const r = spawnSync('node', [GATE, ...argv], { encoding: 'utf8', timeout: 120000 });
  return `${r.stdout || ''}${r.stderr || ''}`;
}

console.log('\nOrdner-Check — liest jeder Pruefer seinen eigenen Ordner?\n');

// --- 1. Build wird selbst gefunden ---------------------------------------
console.log('Ohne --build muss der uebliche Build-Ordner gefunden werden:\n');
for (const name of ['dist', 'build', 'out']) {
  const p = projektBauen({ buildName: name });
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--no-shots']);
  const zeigt = new RegExp(`Build\\s+\\(Slop, Routen\\): ${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/${name}\\b`);
  zeile(zeigt.test(aus), `${name}/ wird als Build erkannt`,
    zeigt.test(aus) ? null : (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 2. --build schlaegt die Selbstsuche ---------------------------------
console.log('\n--build muss die Selbstsuche schlagen:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  fs.mkdirSync(path.join(p, 'eigen'), { recursive: true });
  fs.writeFileSync(path.join(p, 'eigen', 'index.html'), '<!doctype html><html lang="de"><body>x</body></html>');
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--build', path.join(p, 'eigen'), '--no-shots']);
  zeile(aus.includes(`${p}/eigen   [--build]`), 'expliziter --build gewinnt gegen gefundenes dist/',
    (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 3. Ohne Build-Ordner: --src gilt als Build ---------------------------
console.log('\nStatische Seite ohne Bundler — --src IST der Build:\n');
{
  const p = projektBauen({ buildName: null });
  fs.writeFileSync(path.join(p, 'index.html'), '<!doctype html><html lang="de"><body>x</body></html>');
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--src', p, '--no-shots']);
  zeile(aus.includes('kein Build-Ordner — --src gilt als Build'),
    'ohne dist/ faellt es sichtbar auf --src zurueck',
    (aus.match(/Build.*$/m) || ['keine Build-Zeile'])[0]);
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 4. Der eigentliche Punkt: Slop liest den Build ----------------------
console.log('\nDer Kern — die Floskel steht NUR in der Quelle:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  serverAn(path.join(p, 'dist'));
  const aus = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--no-shots']);
  const slopZeile = (aus.match(/^\[(?:PASS|FAIL)\] ai-slop.*$/m) || [''])[0];
  const meldetFloskel = /de-14|naechste level|nächste level/i.test(slopZeile);
  zeile(!meldetFloskel, 'Slop-Scan meldet die Quell-Floskel NICHT',
    meldetFloskel ? `liest die Quelle statt des Builds: ${slopZeile}` : slopZeile || '(keine ai-slop-Zeile)');

  // Gegenprobe: zeigt man den Build absichtlich auf die Quelle, MUSS sie kommen.
  // Sonst prueft der Fall oben gar nichts.
  const aus2 = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--build', path.join(p, 'src'), '--no-shots']);
  const slopZeile2 = (aus2.match(/^\[(?:PASS|FAIL)\] ai-slop.*$/m) || [''])[0];
  zeile(/de-14|deutsche/i.test(slopZeile2), 'Gegenprobe: auf die Quelle gezeigt, findet er sie sehr wohl',
    slopZeile2 || '(keine ai-slop-Zeile — dann misst der Fall darueber nichts)');
  serverAus();
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 5. --build als unbekanntes Flag darf nicht abgelehnt werden ---------
console.log('\nDas Flag selbst:\n');
{
  const aus = torQuelle(['--url', 'http://127.0.0.1:1/', '--build', '/tmp', '--no-shots']);
  zeile(!aus.includes('Unbekanntes Flag'), '--build steht in der Flag-Liste',
    aus.includes('Unbekanntes Flag') ? 'wird als Tippfehler abgelehnt' : null);
}

// --- 5b. shot-sweep muss --url verstehen und Tippfehler ablehnen ---------
// Von den vier Pruefern mit URL-Argument nehmen drei `--url`; shot-sweep hiess
// als einziges `--base`. Ein `--url` fiel dort still auf den Default 5280
// zurueck: das Skript fotografierte klaglos eine ANDERE Seite und lieferte ein
// volles Manifest dazu. Gemessen am 30.07.2026 — `--url ...:59999` ergab
// "navigating to http://localhost:5280/".
//
// Geprueft wird die Wirkung, nicht die Schreibweise im Code: das Manifest muss
// die uebergebene Adresse tragen. Ein Test auf "steht --url in der Quelle?"
// waere auch dann gruen, wenn der Wert nirgends ankommt.
console.log('\nshot-sweep und sein Adress-Flag:\n');
{
  const sweep = path.join(HIER, '..', 'scripts', 'shot-sweep.mjs');
  const ziel = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-flag-'));
  const lauf = (argv) => spawnSync('node', [sweep, ...argv, '--out', ziel],
    { encoding: 'utf8', timeout: 120000 });

  // Adresse, an der nichts lauscht: der Lauf scheitert so oder so. Entscheidend
  // ist allein, WELCHE Adresse im Manifest steht.
  const tot = 'http://127.0.0.1:59997';
  lauf(['--url', `${tot}/`]);
  const mpfad = path.join(ziel, 'manifest.json');
  const m = fs.existsSync(mpfad) ? JSON.parse(fs.readFileSync(mpfad, 'utf8')) : null;
  zeile(m?.base === tot, '--url landet wirklich in der Zieladresse',
    m ? `Manifest sagt: ${m.base}` : '(kein Manifest geschrieben)');

  const tipp = lauf(['--urll', `${tot}/`]);
  zeile(tipp.status === 2 && /Unbekanntes Flag/.test(`${tipp.stdout}${tipp.stderr}`),
    'vertipptes Flag wird abgelehnt statt still ignoriert',
    `exit=${tipp.status}`);

  fs.rmSync(ziel, { recursive: true, force: true });
}

// --- 6. Der Exit-Code muss im Text stehen --------------------------------
// Zweimal am 29.07.2026 ging er an einer Pipe verloren (`| grep`, `| tail`),
// beide Male mit dem falschen Schluss "meldet Blocker und besteht trotzdem".
// Ein Urteil, das man beim Weiterreichen verliert, gehoert auch in den Text.
console.log('\nDas Urteil muss die Pipe ueberleben:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  serverAn(path.join(p, 'dist'));
  const aus = torQuelle(['--url', `http://localhost:${HAFEN}/`, '--src', p, '--no-shots']);
  const schluss = (aus.match(/^G1 (?:GERISSEN|BESTANDEN|KANN NICHT URTEILEN).*$/m) || [''])[0];
  zeile(/\(Exit [012]\)/.test(schluss), 'Schlusszeile nennt den Exit-Code',
    schluss || '(keine Schlusszeile gefunden)');
  serverAus();
  fs.rmSync(p, { recursive: true, force: true });
}

// --- 7. Ein abgestuerzter Pruefer ist kein Qualitaetsurteil --------------
// Bis 30.07.2026 hatte `run()` im Tor KEINE Zeitgrenze: die Pruefer begrenzen
// nur die Navigation (page.goto, 45s), haengt einer danach, wartete das Tor
// unbegrenzt mit. In dieser Umgebung passiert — ein Browser-Lauf hing 980
// Sekunden und hielt seinen Port.
//
// Beim Einbau der Grenze fiel der schwerere Fehler auf: brechen die Pruefer ab,
// meldete das Tor "G1 GERISSEN (Exit 1)". Exit 1 heisst "Qualitaet gerissen"
// und schickt jemanden los, Fehler auf einer Seite zu suchen, die nie geprueft
// wurde. Die Detailzeilen sagten den Grund ("kaputt: ETIMEDOUT") — nur der
// Exit-Code log.
//
// Erzwungen wird der Abbruch ueber G1_FRIST_MS. Geprueft wird der EXIT-CODE,
// nicht der Text: die Meldung war ja schon vorher richtig, falsch war das
// Urteil.
console.log('\nAbgestuerzte Pruefer duerfen nicht als Qualitaetsfehler gelten:\n');
{
  const p = projektBauen({ buildName: 'dist' });
  serverAn(path.join(p, 'dist'));
  const lauf = (env) => spawnSync('node', [GATE,
    '--url', `http://localhost:${HAFEN}/`, '--src', p, '--build', path.join(p, 'dist'), '--no-shots'],
  { encoding: 'utf8', timeout: 300000, env: { ...process.env, ...env } });

  // Die Frist muss den SERVER-CHECK ueberleben und die Pruefer toeten.
  //
  // Erster Versuch nahm 1 ms — da stirbt schon das `curl` der Erreichbarkeit,
  // und das Tor endet mit "Server nicht erreichbar — Gate kann nicht urteilen",
  // ebenfalls Exit 2. Der Fall war gruen, MASS aber einen anderen Weg: mit
  // stillgelegter Huerde bestand er unveraendert. Ein Test, der das richtige
  // Ergebnis aus dem falschen Grund bekommt, ist kein Test.
  // 1500 ms: curl kommt durch (Millisekunden), jeder Browser-Pruefer nicht.
  const kaputt = lauf({ G1_FRIST_MS: '1500' });
  const ausK = `${kaputt.stdout || ''}${kaputt.stderr || ''}`;
  // Beweis mitpruefen: Exit 2 allein genuegt nicht, es muss AUS DIESEM GRUND
  // kommen. Sonst faengt der Fall jeden beliebigen Exit-2-Weg ein.
  zeile(kaputt.status === 2 && /Pruefer abgestuerzt/.test(ausK),
    'alle Pruefer abgestuerzt -> Exit 2 (kein Urteil)',
    kaputt.status === 2 && /Pruefer abgestuerzt/.test(ausK) ? null
      : `exit=${kaputt.status}, Schluss: ${(ausK.match(/^G1 .*$/m) || ['(keiner)'])[0]}`);

  // Der Abbruch darf keine Browser-Leichen hinterlassen.
  //
  // Der Timeout schickt SIGTERM ans Werkzeug, nicht an dessen Kinder.
  // Lighthouse startet ein eigenes Chrome und raeumt es nur auf, wenn es
  // normal endet. Gemessen am 30.07.2026 direkt nach dem Einbau der Frist:
  // 56 -> 65 Chrome-Prozesse durch EINEN abgebrochenen Lauf; auf der Maschine
  // lagen da schon 91 Chromes mit 6,2 GB aus einer halben Stunde Tor-Laeufen.
  // Ein Fix, der ein neues Leck aufreisst, ist keiner.
  //
  // Gezaehlt werden nur VERWAISTE Lighthouse-Profile (PPID 1). Fremde
  // Browser-Agents haben einen eigenen Profilpfad und einen lebenden
  // Elternprozess — ein pauschales `pkill chrome` waere hier grob fahrlaessig.
  const leichen = () => {
    const r = spawnSync('ps', ['-eo', 'pid,ppid,args'], { encoding: 'utf8', timeout: 10000 });
    return (r.stdout || '').split('\n')
      .filter((z) => /--user-data-dir=\/tmp\/lighthouse\./.test(z) && /^\s*\d+\s+1\s/.test(z)).length;
  };
  zeile(leichen() === 0, 'kein verwaister Browser nach dem Abbruch',
    leichen() === 0 ? null : `${leichen()} Lighthouse-Chrome(s) mit PPID 1 uebrig`);

  // Alte Laufordner muessen altern, frische bleiben.
  //
  // Jeder Lauf legt einen eigenen Ordner an (gegen die Kollision zweier
  // gleichzeitiger Laeufe). Weggeraeumt hat ihn niemand: gemessen am
  // 30.07.2026 lagen 912 Ordner mit 291 MB in /tmp, aeltester drei Tage alt.
  // Auf 344 GB frei kein akutes Problem — aber ein Wachstum ohne Grenze ist
  // eins auf Zeit, und ein voller /tmp macht JEDEN Pruefer kaputt.
  //
  // Beide Richtungen, weil ein Aufraeumer, der zu viel loescht, schlimmer ist
  // als einer, der nichts tut: er nimmt einem parallelen Lauf den Bericht weg.
  {
    const alt = path.join(os.tmpdir(), 'g1-gate-EVALALT');
    const neu = path.join(os.tmpdir(), 'g1-gate-EVALNEU');
    fs.mkdirSync(alt, { recursive: true });
    fs.mkdirSync(neu, { recursive: true });
    const dreissigStunden = new Date(Date.now() - 30 * 60 * 60 * 1000);
    fs.utimesSync(alt, dreissigStunden, dreissigStunden);

    // EIN Lauf fuer beide Fragen. Vorher standen hier zwei identische
    // `lauf({})` — einer fuer die Ordner-Alterung, einer als Gegenrichtung zur
    // Absturz-Huerde. Beide brauchen dasselbe: einen normalen Tor-Durchlauf
    // ohne Zeitgrenze. Gemessen am 30.07.2026 kostete diese Eval dadurch 236
    // Sekunden, mehr als jede andere ausser craft-check; ein voller Tor-Lauf
    // mit Lighthouse und Browser-Pruefern ist der teuerste Einzelschritt im
    // ganzen Skill.
    //
    // Das ist kein Schoenheitsthema: eine Eval, deren Lauf zu lange dauert,
    // wird beim naechsten Mal uebersprungen — und ein uebersprungener Pruefer
    // ist genau das, wogegen dieser Skill gebaut ist.
    const normal = lauf({});

    zeile(!fs.existsSync(alt), 'Laufordner aelter als 24h wird aufgeraeumt',
      fs.existsSync(alt) ? 'liegt noch da — /tmp waechst unbegrenzt' : null);
    zeile(fs.existsSync(neu), 'frischer Laufordner bleibt liegen',
      fs.existsSync(neu) ? null : 'geloescht — ein paralleler Lauf verliert seinen Bericht');

    fs.rmSync(alt, { recursive: true, force: true });
    fs.rmSync(neu, { recursive: true, force: true });

    // Gegenrichtung: ohne erzwungenen Abbruch darf die Absturz-Huerde NICHT
    // greifen. Ohne sie koennte sie auf alles anschlagen und der Abbruch-Fall
    // oben bestuende trotzdem.
    zeile(normal.status !== 2 || !/Pruefer abgestuerzt/.test(`${normal.stdout}`),
      'ohne Abbruch greift die Absturz-Huerde nicht',
      `exit=${normal.status}`);
  }

  serverAus();
  fs.rmSync(p, { recursive: true, force: true });
}

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
const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Ein Pruefer liest den falschen Ordner — sein Urteil gilt fuer Dateien, die niemand bekommt.');
  process.exit(1);
}
console.log('Importe kommen aus der Quelle, Slop und Routen aus dem Build.');

