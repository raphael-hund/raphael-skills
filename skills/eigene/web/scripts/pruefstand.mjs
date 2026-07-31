#!/usr/bin/env node
// pruefstand — statischen Build so ausliefern, wie die Produktion ihn ausliefert.
//
//   node pruefstand.mjs --dir dist --port 5399
//   node pruefstand.mjs --dir dist --port 5399 --routen     # nur die Routenliste ausgeben
//
// Warum es das gibt (Befund 28.07.2026, SalsaFlow):
// `python3 -m http.server dist/` meldete 172 tote Links. Kein einziger war echt.
// Die Seite laeuft auf Vercel mit `cleanUrls: true` — /team liefert dort team.html.
// Der nackte Dateiserver kennt diese Regel nicht und antwortet 404.
//
// Ein Tor, das unter falschen Bedingungen misst, produziert falsches Rot. Falsches
// Rot ist auf Dauer genauso schaedlich wie falsches Gruen: nach dem dritten Fehlalarm
// schaut niemand mehr hin. Der Pruefstand liest darum vercel.json und wendet
// cleanUrls, redirects und rewrites an, bevor er urteilen laesst.

import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const has = (n) => args.includes(`--${n}`);

const DIR = path.resolve(get('dir', 'dist'));
const PORT = Number(get('port', 5399));

// Port pruefen, bevor Node ihn ablehnt.
//
// Gemessen am 31.07.2026: `--port abc`, `--port -1` und `--port 99999` endeten
// mit einem 30-zeiligen Node-Stacktrace (RangeError ERR_SOCKET_BAD_PORT).
// Fachlich richtig, praktisch unlesbar: wer den Aufruf vertippt, sieht eine
// Fehlermeldung ueber `validatePort(options.port)` und sucht den Fehler im
// Werkzeug statt in seiner Eingabe.
//
// Dieselbe Ueberlegung wie beim Budget im G1-Tor: ein Wertebereich, den das
// Werkzeug kennt, gehoert VOR den Lauf — nicht in einen Stacktrace danach.
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error(`Unbrauchbarer Port: ${get('port', '')}`);
  console.error('Erlaubt sind ganze Zahlen von 1 bis 65535 (Standard: 5399).');
  process.exit(2);
}

if (!existsSync(DIR)) {
  console.error(`Ordner fehlt: ${DIR}`);
  process.exit(2);
}

// Die Produktionsregeln stehen in vercel.json neben dem Build-Ordner (oder darin).
// Fehlt die Datei, ist der Pruefstand ein normaler Dateiserver — aber er sagt das,
// statt es zu verschweigen.
function konfigLesen() {
  for (const p of [path.join(DIR, '..', 'vercel.json'), path.join(DIR, 'vercel.json')]) {
    if (!existsSync(p)) continue;
    try {
      return { pfad: p, cfg: JSON.parse(readFileSync(p, 'utf8')) };
    } catch (e) {
      console.error(`vercel.json unlesbar (${p}): ${e.message}`);
      process.exit(2);
    }
  }
  return { pfad: null, cfg: {} };
}

const { pfad: KONFIG_PFAD, cfg } = konfigLesen();
const CLEAN_URLS = cfg.cleanUrls === true;
const REDIRECTS = Array.isArray(cfg.redirects) ? cfg.redirects : [];
const REWRITES = Array.isArray(cfg.rewrites) ? cfg.rewrites : [];

// Vercel-Quellmuster sind Pfadmuster mit `(.*)`-Gruppen, keine echten RegExp.
// Nur diese eine Form kommt in unseren Projekten vor — mehr zu bauen waere geraten.
//
// Befund 28.07.2026 (evals/run-pruefstand.mjs): die Escape-Klasse hatte `*` und `(`
// vergessen. Aus `(.*)` wurde `(\.*)` — ein Muster, das nur auf Punkte passt. Jeder
// Wildcard-Redirect war damit still wirkungslos: /alt/irgendwas antwortete 404
// statt umzuleiten. Erst die Platzhalter herausschneiden, dann den Rest escapen.
const zuRegex = (muster) => new RegExp(`^${muster
  .split('(.*)')
  .map((teil) => teil.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('(.*)')}$`);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// Datei zu einem Pfad finden. Reihenfolge wie bei Vercel: exakt, dann index.html
// im Ordner, dann — nur bei cleanUrls — pfad.html.
function dateiFinden(pfad) {
  const roh = path.join(DIR, decodeURIComponent(pfad));
  if (!path.resolve(roh).startsWith(DIR)) return null;   // kein Ausbruch nach oben
  if (existsSync(roh) && statSync(roh).isFile()) return roh;
  const index = path.join(roh, 'index.html');
  if (existsSync(index) && statSync(index).isFile()) return index;
  if (CLEAN_URLS) {
    const html = `${roh.replace(/\/$/, '')}.html`;
    if (existsSync(html) && statSync(html).isFile()) return html;
  }
  return null;
}

// Alle Routen auflisten, die dieser Build ueberhaupt hat. Das Tor prueft sonst nur
// die Startseite und meldet gruen fuers Ganze — zwoelf Unterseiten ungesehen.
function routenSammeln(unter = DIR, praefix = '') {
  const raus = [];
  for (const e of readdirSync(unter, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'assets' || e.name === 'node_modules') continue;
    const voll = path.join(unter, e.name);
    if (e.isDirectory()) { raus.push(...routenSammeln(voll, `${praefix}/${e.name}`)); continue; }
    if (!e.name.endsWith('.html')) continue;
    if (e.name === '404.html') continue;
    raus.push(e.name === 'index.html'
      ? (praefix || '/')
      : `${praefix}/${CLEAN_URLS ? e.name.replace(/\.html$/, '') : e.name}`);
  }
  return raus.sort();
}

if (has('routen')) {
  console.log(routenSammeln().join(','));
  process.exit(0);
}

const server = createServer((req, res) => {
  let pfad = req.url.split('?')[0];

  for (const r of REDIRECTS) {
    if (!r.source || !r.destination) continue;
    if (zuRegex(r.source).test(pfad)) {
      res.writeHead(r.permanent ? 308 : 307, { Location: r.destination });
      return res.end();
    }
  }

  for (const r of REWRITES) {
    if (!r.source || !r.destination) continue;
    if (zuRegex(r.source).test(pfad)) { pfad = r.destination; break; }
  }

  const datei = dateiFinden(pfad);
  if (!datei) {
    // 404 bleibt 404. Eine SPA-Auffangregel waere hier falsch: sie macht aus jedem
    // toten Link eine 200-Antwort und schaltet die Link-Pruefung praktisch ab.
    const fallback = path.join(DIR, '404.html');
    const body = existsSync(fallback) ? readFileSync(fallback) : 'Not Found';
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(body);
  }

  res.writeHead(200, { 'Content-Type': MIME[path.extname(datei).toLowerCase()] || 'application/octet-stream' });
  res.end(readFileSync(datei));
});

server.listen(PORT, () => {
  const routen = routenSammeln();
  console.log(`Pruefstand: ${DIR} auf http://localhost:${PORT}`);
  console.log(KONFIG_PFAD
    ? `Produktionsregeln aus ${KONFIG_PFAD}: cleanUrls=${CLEAN_URLS}, ${REDIRECTS.length} Redirects, ${REWRITES.length} Rewrites`
    : 'Keine vercel.json gefunden — reiner Dateiserver, cleanUrls AUS.');
  console.log(`${routen.length} Routen: ${routen.join(',')}`);
});
