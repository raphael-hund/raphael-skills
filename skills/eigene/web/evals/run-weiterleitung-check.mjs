#!/usr/bin/env node
// run-weiterleitung-check.mjs — nennt der Bericht die Seite, die geprueft wurde?
//
//   node evals/run-weiterleitung-check.mjs
//
// WARUM (Befund 31.07.2026)
// Der Server-Check des Tores akzeptiert jeden 2xx- und 3xx-Code als
// "erreichbar", und Playwright folgt einer Weiterleitung stillschweigend.
// Geprueft wird dann eine ANDERE Seite als die genannte.
//
// Gemessen gegen einen 302 von / auf /ziel: axe-run, craft-check und
// formular-check berichteten alle drei ueber die angefragte URL, angesehen
// hatten sie das Ziel. Der Bericht sagte "craft-check — http://.../", der
// Befund stammte von "/ziel".
//
// Eine Weiterleitung ist kein Fehler, sondern normaler Web-Betrieb:
// http->https, / -> /de/, Domain-Umzug, Trailing-Slash-Normalisierung. Genau
// deshalb darf der Lauf nicht abbrechen. Aber wer den Bericht liest, muss
// wissen, welche Seite gemeint ist — sonst sucht er den Mangel auf der
// falschen und findet dort nichts.
//
// WAS DIESE EVAL PRUEFT
// Zwei Seiten aus einem Testserver: eine leitet weiter, eine nicht.
//   1. mit Weiterleitung  -> Bericht nennt die Ziel-URL, Lauf geht normal weiter
//   2. ohne Weiterleitung -> KEIN Hinweis (sonst waere er Rauschen)
//   3. JSON-Modus         -> Felder `geprueft` und `umgeleitet` stimmen
//
// Punkt 2 ist so wichtig wie Punkt 1: ein Hinweis, der immer erscheint, wird
// ueberlesen und schuetzt dann niemanden mehr.
//
// Exit 0 = alle Punkte fuer jedes Werkzeug. Exit 1 = mindestens einer verletzt.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wegwerfOrdner, altlastWeg } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 240000;
const PORT = Number(process.env.WEITERLEITUNG_PORT || 5461);
// Zweiter Server unter anderem Hostnamen (localhost statt 127.0.0.1) fuer den
// Fall "Weiterleitung fuehrt aus der geprueften Domain heraus".
const PORT_FREMD = PORT + 1;

const WERKZEUGE = ['axe-run.mjs', 'craft-check.mjs', 'formular-check.mjs'];

altlastWeg('weiterleitung-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

const httpCode = (pfad = '/', port = PORT) => {
  const r = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${port}${pfad}`], { encoding: 'utf8' });
  return (r.stdout || '').trim();
};

const fehlend = WERKZEUGE.filter((n) => !fs.existsSync(path.join(SKRIPTE, n)));
if (fehlend.length) {
  console.error(`Werkzeug fehlt: ${fehlend.join(', ')}`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

for (const p of [PORT, PORT_FREMD]) if (httpCode('/', p) !== '000') {
  console.error(`Port ${PORT} ist fremdbelegt — diese Eval kann nichts messen.`);
  console.error('Sie liefe gegen eine fremde Seite und gaebe deren Ergebnis als');
  console.error('eigenes aus. Anderen Port setzen: WEITERLEITUNG_PORT=<frei>');
  console.error(`(belegt werden ${PORT} und ${PORT_FREMD})`);
  process.exit(2);
}

const ORDNER = wegwerfOrdner('weiterleitung-');

const SEITE = '<!doctype html><html lang="de"><head><meta charset="utf-8">'
  + '<title>Ziel</title></head><body><h1>Ueberschrift</h1>'
  + '<p>Ein Absatz mit genug Text, damit die Pruefer etwas zu sehen haben.</p>'
  + '<form><label for="a">Name</label><input id="a" name="a"></form>'
  + '</body></html>';

// EIN Server, drei Pfade: / leitet weiter, /ziel und /direkt liefern direkt.
// Threading, weil ein Browser mehrere Anfragen parallel stellt — ein
// einthreadiger Server blockiert dabei und laesst jedes Werkzeug ins Timeout
// laufen (gemessen 31.07.2026, kostete drei Fehlversuche).
const SERVER_PY = `
import http.server, socketserver
SEITE = ${JSON.stringify(SEITE)}.encode()
class H(http.server.BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    def do_GET(self):
        weg = self.path.rstrip('/') or '/'
        if weg == '/fremd-weg':
            # Anderer Hostname, damit der Host-Vergleich anschlaegt.
            self.send_response(302)
            self.send_header('Location', 'http://localhost:${PORT_FREMD}/dort')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return
        if weg == '/':
            self.send_response(302)
            self.send_header('Location', '/ziel')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(SEITE)))
        self.end_headers()
        self.wfile.write(SEITE)
    def log_message(self, *a): pass
class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
import threading
threading.Thread(target=lambda: S(('127.0.0.1', ${PORT_FREMD}), H).serve_forever(), daemon=True).start()
S(('127.0.0.1', ${PORT}), H).serve_forever()
`;

const SERVER_DATEI = path.join(ORDNER, 'server.py');
fs.writeFileSync(SERVER_DATEI, SERVER_PY);
const server = spawn('python3', [SERVER_DATEI], { stdio: 'ignore' });

let bereit = false;
for (let i = 0; i < 50 && !bereit; i += 1) {
  if (httpCode('/direkt') === '200') bereit = true;
  else spawnSync('sleep', ['0.2']);
}
if (!bereit) {
  server.kill('SIGKILL');
  console.error(`Eigener Testserver auf ${PORT} antwortet nach 10s nicht.`);
  console.error('Ohne ihn misst diese Eval nichts und saehe trotzdem sauber aus.');
  process.exit(2);
}

console.log(`Weiterleitungs-Check — ${WERKZEUGE.length} Browser-Werkzeuge\n`);
console.log('Wer eine Weiterleitung verschweigt, nennt die falsche Seite:\n');

const laufen = (name, pfad, extra = []) => spawnSync('node',
  [path.join(SKRIPTE, name), '--url', `http://127.0.0.1:${PORT}${pfad}`, ...extra],
  { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024 });

const HINWEIS_RE = /weitergeleitet auf/i;

for (const name of WERKZEUGE) {
  // 1. Mit Weiterleitung: Hinweis da, Ziel genannt, Lauf nicht abgebrochen.
  const um = laufen(name, '/');
  const ausUm = `${um.stdout || ''}${um.stderr || ''}`;
  if (um.error && um.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (weitergeleitet)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else if (um.status === 2) {
    zeile(false, `${name} nennt das Ziel der Weiterleitung`,
      `Exit 2 — eine Weiterleitung ist normaler Web-Betrieb, kein Abbruchgrund: ${ausUm.trim().split('\n')[0].slice(0, 44)}`);
  } else {
    zeile(HINWEIS_RE.test(ausUm) && ausUm.includes('/ziel'),
      `${name} nennt das Ziel der Weiterleitung`,
      HINWEIS_RE.test(ausUm)
        ? 'Hinweis da, aber ohne die Ziel-URL — dann weiss der Leser weiter nicht, welche Seite gemeint ist'
        : 'kein Hinweis — der Bericht nennt die angefragte URL, geprueft wurde eine andere Seite');
  }

  // 2. Ohne Weiterleitung: KEIN Hinweis. Ein Hinweis, der immer erscheint,
  //    wird ueberlesen und schuetzt dann niemanden mehr.
  const direkt = laufen(name, '/direkt');
  const ausD = `${direkt.stdout || ''}${direkt.stderr || ''}`;
  if (direkt.error && direkt.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (direkt)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(!HINWEIS_RE.test(ausD), `${name} schweigt ohne Weiterleitung`,
      'meldet eine Weiterleitung, wo keine war — ein Hinweis in jedem Bericht wird ueberlesen');
  }
}

// 3. JSON-Modus: nur axe-run hat einen, und dort muessen die Felder stimmen.
{
  const r = laufen('axe-run.mjs', '/', ['--json']);
  let daten = null;
  try { daten = JSON.parse(r.stdout || '{}'); } catch { /* bleibt null */ }
  zeile(Boolean(daten) && daten.umgeleitet === true && String(daten.geprueft || '').endsWith('/ziel'),
    'axe-run --json meldet geprueft und umgeleitet',
    daten
      ? `geprueft="${daten.geprueft}" umgeleitet=${daten.umgeleitet} — ein Werkzeug, das im Text warnt und im JSON schweigt, taeuscht jeden Automaten`
      : 'keine lesbare JSON-Ausgabe');
}

// --- 4. Das Tor und der Host-Wechsel --------------------------------------
// Eine Weiterleitung INNERHALB der Domain ist harmlos. Eine, die auf einen
// anderen Host fuehrt, ist es nicht: dann bewertet das Tor die Seite eines
// fremden Anbieters und meldet das Ergebnis als eigenes.
//
// Gemessen 01.08.2026 gegen einen 302 auf einen anderen Hostnamen: das Tor
// meldete "server PASS — HTTP 302" und lief durch, ohne den Wechsel je zu
// erwaehnen. Ein gruenes Tor ueber eine fremde Seite ist das teuerste
// Missverstaendnis, das dieses Werkzeug produzieren kann.
console.log('\nDas Tor und der Host-Wechsel:\n');
{
  const gate = path.join(SKRIPTE, 'g1-gate.mjs');
  const torLauf = (pfad) => spawnSync('node',
    [gate, '--url', `http://127.0.0.1:${PORT}${pfad}`, '--no-shots'],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 32 * 1024 * 1024 });

  const fremd = torLauf('/fremd-weg');
  const ausF = `${fremd.stdout || ''}${fremd.stderr || ''}`;
  zeile(fremd.status === 2 && /anderen Host/i.test(ausF),
    'g1-gate bricht ab, wenn die Weiterleitung den Host wechselt',
    fremd.status === 2
      ? 'Exit 2, aber ohne den Grund zu nennen — wer liest, sucht den Fehler woanders'
      : `Exit ${fremd.status} — das Tor bewertet eine fremde Domain als eigene`);

  // Gegenprobe im selben Lauf: die domaininterne Weiterleitung darf NICHT
  // abbrechen. Sonst waere die Wache unbrauchbar, weil / -> /de/ Alltag ist.
  const intern = torLauf('/');
  const ausI = `${intern.stdout || ''}${intern.stderr || ''}`;
  zeile(intern.status !== 2 && /weiter auf/i.test(ausI),
    'g1-gate laeuft bei domaininterner Weiterleitung weiter und nennt das Ziel',
    intern.status === 2
      ? 'Exit 2 auf einer harmlosen Weiterleitung — die Wache ist zu scharf'
      : 'laeuft, nennt aber das Ziel nicht — der Bericht meint dann die falsche Seite');
}

server.kill('SIGKILL');

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens ein Bericht nennt nicht die Seite, die wirklich geprueft wurde.');
  process.exit(1);
}
console.log('Jeder Bericht nennt die Seite, die wirklich geprueft wurde.');
