#!/usr/bin/env node
// run-halbe-antwort-check.mjs — urteilt ein Werkzeug ueber eine halbe Seite?
//
//   node evals/run-halbe-antwort-check.mjs
//
// WARUM (Befund 31.07.2026)
// Ein Server kann HTTP 200 melden, per Content-Length 5000 Bytes ankuendigen
// und die Verbindung nach 44 Bytes schliessen. Playwright meldet dafuer weiter
// res.ok() === true, und Chrome ergaenzt die fehlenden Tags selbst — im DOM
// sieht die halbe Seite aus wie eine ganze.
//
// Gemessen gegen genau so einen Server:
//   craft-check     Exit 1, drei BLOCK-Befunde (M8, M23, M24)
//   axe-run         Exit 1, Violations
//   formular-check  Exit 0, "kein Formular auf dieser Seite"
//
// Alle drei sind Urteile ueber Text, der nie ankam. Der formular-check-Fall
// ist der gefaehrlichste, weil er GRUEN ist: eine Seite mit Formular kann so
// als formularlos durchgehen, wenn die Uebertragung vor dem <form> abbricht.
//
// Das passiert nicht nur bei kaputten Servern: abgebrochene Deploys, ein
// Proxy-Timeout, ein OOM-Kill im Anwendungsserver mitten in der Antwort. Genau
// in dem Moment ist ein gruenes Gate am teuersten.
//
// WAS DIESE EVAL PRUEFT
// Ein Testserver kuendigt mehr Bytes an, als er sendet. Jedes Browser-Werkzeug
// muss das erkennen und mit Exit 2 enden ("nichts geprueft"), nicht mit einem
// Urteil. Zur Kontrolle laeuft dieselbe Seite vollstaendig — dort muss das
// Werkzeug normal urteilen, sonst waere die Wache zu scharf und wuerde
// abgeschaltet statt benutzt.
//
// Exit 0 = jedes Werkzeug erkennt beides. Exit 1 = mindestens eines nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wegwerfOrdner, altlastWeg } from './lib/wegwerf.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPTE = path.join(HIER, '..', 'scripts');
const FRIST_MS = 180000;
const PORT_HALB = Number(process.env.HALB_PORT || 5431);
const PORT_GANZ = PORT_HALB + 1;
// Gzip-Faelle: Content-Length zaehlt die Bytes AUF DER LEITUNG, res.body()
// liefert sie ENTPACKT. Bei Stufe 0 (nur verpackt) ist die Leitung GROESSER
// als der Inhalt — genau die Umkehrung, an der die erste Fassung der Wache
// eine vollstaendige Seite ablehnte.
const PORT_GZIP = PORT_HALB + 2;
const PORT_GZIP_HALB = PORT_HALB + 3;

const WERKZEUGE = ['axe-run.mjs', 'craft-check.mjs', 'formular-check.mjs'];

altlastWeg('halbe-antwort-', 6);

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

const httpCode = (port) => {
  const r = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${port}/`], { encoding: 'utf8' });
  return (r.stdout || '').trim();
};

const fehlend = WERKZEUGE.filter((n) => !fs.existsSync(path.join(SKRIPTE, n)));
if (fehlend.length) {
  console.error(`Werkzeug fehlt: ${fehlend.join(', ')}`);
  console.error('Ohne sie prueft diese Eval nichts und meldete trotzdem gruen.');
  process.exit(2);
}

for (const p of [PORT_HALB, PORT_GANZ, PORT_GZIP, PORT_GZIP_HALB]) {
  if (httpCode(p) !== '000') {
    console.error(`Port ${p} ist fremdbelegt — diese Eval kann nichts messen.`);
    console.error('Sie liefe gegen eine fremde Seite. Anderen Port setzen:');
    console.error(`HALB_PORT=<frei>  (belegt werden <frei> bis <frei>+3)`);
    process.exit(2);
  }
}

const ORDNER = wegwerfOrdner('halbe-antwort-');

// Die Seite hat bewusst ein Formular: so faellt auf, wenn ein Werkzeug sie
// fuer formularlos haelt, weil der Rest nie ankam.
const GANZE_SEITE = '<!doctype html><html lang="de"><head><meta charset="utf-8">'
  + '<title>Halbe Antwort</title></head><body><h1>Ueberschrift</h1>'
  + '<p>Ein Absatz mit genug Text, damit die Seite nicht leer wirkt.</p>'
  + '<form><label for="a">Name</label><input id="a" name="a"></form>'
  + '</body></html>';

// Der Server: /halb kuendigt viel an und bricht ab, /ganz liefert vollstaendig.
const SERVER_PY = `
import http.server, time, sys
GANZ = ${JSON.stringify(GANZE_SEITE)}.encode()
class Halb(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        # Verspricht deutlich mehr, als gleich gesendet wird.
        self.send_header('Content-Length', str(len(GANZ) * 4))
        self.end_headers()
        self.wfile.write(GANZ[:44])
        self.wfile.flush()
        time.sleep(1)
        self.connection.close()
    def log_message(self, *a): pass
class Ganz(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(GANZ)))
        self.end_headers()
        self.wfile.write(GANZ)
    def log_message(self, *a): pass
import gzip
class Gzip0(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Stufe 0: verpackt, aber nicht komprimiert -> gzip GROESSER als roh.
        packed = gzip.compress(GANZ, 0)
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(packed)))
        self.end_headers()
        self.wfile.write(packed)
    def log_message(self, *a): pass
class GzipHalb(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        packed = gzip.compress(GANZ)
        self.send_response(200)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(packed)))
        self.end_headers()
        self.wfile.write(packed[:len(packed)//3])
        self.wfile.flush()
        time.sleep(1)
        self.connection.close()
    def log_message(self, *a): pass
import threading
threading.Thread(target=lambda: http.server.HTTPServer(('127.0.0.1', ${PORT_GANZ}), Ganz).serve_forever(), daemon=True).start()
threading.Thread(target=lambda: http.server.HTTPServer(('127.0.0.1', ${PORT_GZIP}), Gzip0).serve_forever(), daemon=True).start()
threading.Thread(target=lambda: http.server.HTTPServer(('127.0.0.1', ${PORT_GZIP_HALB}), GzipHalb).serve_forever(), daemon=True).start()
http.server.HTTPServer(('127.0.0.1', ${PORT_HALB}), Halb).serve_forever()
`;

const SERVER_DATEI = path.join(ORDNER, 'server.py');
fs.writeFileSync(SERVER_DATEI, SERVER_PY);
const server = spawn('python3', [SERVER_DATEI], { stdio: 'ignore' });

// Aktiv warten: der vollstaendige Port muss 200 liefern. Auf den halben zu
// warten waere sinnlos — dort ist ein Abbruch ja das Gewollte.
let bereit = false;
for (let i = 0; i < 50 && !bereit; i += 1) {
  if (httpCode(PORT_GANZ) === '200') bereit = true;
  else spawnSync('sleep', ['0.2']);
}
if (!bereit) {
  server.kill('SIGKILL');
  console.error(`Eigener Testserver auf ${PORT_GANZ} antwortet nach 10s nicht.`);
  console.error('Ohne ihn misst diese Eval nichts und saehe trotzdem sauber aus.');
  process.exit(2);
}

console.log(`Halbe-Antwort-Check — ${WERKZEUGE.length} Browser-Werkzeuge\n`);
console.log('HTTP 200 mit abgebrochener Uebertragung ist kein Pruefergebnis:\n');

const laufen = (name, port) => spawnSync('node',
  [path.join(SKRIPTE, name), '--url', `http://127.0.0.1:${port}/`],
  { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 16 * 1024 * 1024 });

for (const name of WERKZEUGE) {
  const halb = laufen(name, PORT_HALB);
  const ausH = `${halb.stdout || ''}${halb.stderr || ''}`;
  if (halb.error && halb.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (halbe Antwort)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(halb.status === 2, `${name} lehnt eine halbe Antwort ab (Exit 2)`,
      halb.status === 0
        ? 'Exit 0 — meldet die halbe Seite als sauber. Die gruene Haelfte des Fehlers.'
        : `Exit ${halb.status} — urteilt ueber Text, der nie ankam: ${ausH.trim().split('\n')[0].slice(0, 46)}`);
  }

  // Kontrolle: bei vollstaendiger Antwort muss normal geurteilt werden. Eine
  // Wache, die auch saubere Seiten ablehnt, wird abgeschaltet statt benutzt.
  const ganz = laufen(name, PORT_GANZ);
  if (ganz.error && ganz.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (ganze Antwort)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(ganz.status !== 2, `${name} urteilt bei vollstaendiger Antwort normal`,
      `Exit 2 auf einer gueltigen Seite — die Wache ist zu scharf: ${`${ganz.stderr || ''}`.trim().split('\n')[0].slice(0, 46)}`);
  }

  // Gzip, vollstaendig: Content-Length ist hier die Laenge AUF DER LEITUNG,
  // res.body() liefert entpackt. Bei Stufe 0 ist die Leitung groesser — die
  // erste Fassung der Wache lehnte deshalb eine vollstaendige Seite ab
  // (gemessen 31.07.2026: "Antwort unvollstaendig: 314 von 337 Bytes").
  const gz = laufen(name, PORT_GZIP);
  if (gz.error && gz.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (gzip vollstaendig)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(gz.status !== 2, `${name} akzeptiert vollstaendiges gzip (Leitung groesser als Inhalt)`,
      `Exit 2 — Content-Length gegen entpackte Bytes verglichen: ${`${gz.stderr || ''}`.trim().split('\n')[0].slice(0, 46)}`);
  }

  // Gzip, abgebrochen: hier MUSS die Ablehnung weiter greifen. Sonst waere die
  // Ausnahme oben ein Loch statt einer Korrektur.
  const gzh = laufen(name, PORT_GZIP_HALB);
  if (gzh.error && gzh.error.code === 'ETIMEDOUT') {
    zeile(false, `${name} (gzip abgebrochen)`, `keine Antwort binnen ${FRIST_MS / 1000}s`);
  } else {
    zeile(gzh.status === 2, `${name} lehnt abgebrochenes gzip ab (Exit 2)`,
      gzh.status === 0
        ? 'Exit 0 — meldet die halbe gzip-Seite als sauber'
        : `Exit ${gzh.status} — urteilt ueber einen abgebrochenen gzip-Strom`);
  }
}

server.kill('SIGKILL');

console.log(`\n${gezaehlt - fehler}/${gezaehlt} wie erwartet.`);
if (fehler) {
  console.log('Mindestens ein Werkzeug faellt ein Urteil ueber eine Seite, die es nie ganz sah.');
  process.exit(1);
}
console.log('Kein Werkzeug urteilt ueber eine halbe Seite.');
