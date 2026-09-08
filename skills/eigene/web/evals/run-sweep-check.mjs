#!/usr/bin/env node
/**
 * run-sweep-check.mjs — prueft, ob das Gate einen leeren Screenshot-Sweep merkt.
 *
 * Der Sweep ist die Grundlage jeder Sichtpruefung: was er nicht fotografiert,
 * sieht der Panel-Schritt nie. Bis zum 29.07.2026 hing das Urteil allein an
 * `r.error` im Manifest — vier Sweeps, die nichts fotografiert hatten, kamen
 * damit als Gruen durch (Manifest ohne Routen, Route ohne Bilder, fehlende
 * Routen, Dateinamen ohne Datei). Ein Nichts besteht sonst jede Pruefung.
 *
 * Geprueft wird in beide Richtungen:
 *   falsches Gruen — jedes leere oder unvollstaendige Manifest muss reissen
 *   falsches Rot   — ein echter, vollstaendiger Sweep muss durchgehen
 *
 * Braucht weder Browser noch Server.
 *
 *   node evals/run-sweep-check.mjs
 *
 * Exit 0 = jede Erwartung erfuellt.
 * Exit 1 = mindestens ein Fall falsch behandelt.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const GATE = path.join(HIER, '..', 'scripts', 'g1-gate.mjs');

// Wie in run-budget-check.mjs / run-kaputte-ausgaben.mjs: das Gate ist ein
// Skript und laeuft beim Import sofort los. Wir schneiden die beiden Funktionen
// heraus, die das Urteil faellen. Wird eine umbenannt, schlaegt dieser Lauf
// fehl — auch das ist ein Signal.
const quelle = fs.readFileSync(GATE, 'utf8');
function schneide(marke, schluss) {
  const a = quelle.indexOf(marke);
  if (a < 0) {
    console.error(`FEHLER: "${marke}" nicht im Gate gefunden — umbenannt?`);
    process.exit(1);
  }
  const b = quelle.indexOf(schluss, a);
  if (b < 0) {
    console.error(`FEHLER: Ende von "${marke}" nicht gefunden.`);
    process.exit(1);
  }
  return quelle.slice(a, b + schluss.length);
}
const listeTeil = schneide('function liste(', '\n}\n');
const maengelTeil = schneide('function sweepMaengel(', '\n}\n');
const sweepMaengel = new Function('fs', 'path', `
  ${listeTeil}
  ${maengelTeil}
  return sweepMaengel;
`)(fs, path);

// Ein Ordner mit genau einer echten Datei — so laesst sich "Datei existiert"
// von "Datei behauptet" unterscheiden.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-check-'));
fs.writeFileSync(path.join(tmp, 'da.png'), 'x');

const bild = (f) => ({ file: f, y: 0, kind: 'fold' });

// --- Faelle ---------------------------------------------------------------
// `reisst` heisst: sweepMaengel muss mindestens einen Mangel melden.
const REISSEN = [
  {
    was: 'Manifest ganz ohne Routen',
    manifest: { routes: [] }, verlangt: ['/'],
  },
  {
    was: 'Route ohne einen einzigen Screenshot',
    manifest: { routes: [{ route: '/', status: 200, shots: [] }] }, verlangt: ['/'],
  },
  {
    was: 'nur 1 von 3 verlangten Routen im Manifest',
    manifest: { routes: [{ route: '/', shots: [bild('da.png')] }] },
    verlangt: ['/', '/team', '/preise'],
  },
  {
    was: 'Dateiname im Manifest, aber keine Datei auf der Platte',
    manifest: { routes: [{ route: '/', shots: [bild('gibtsnicht.png')] }] }, verlangt: ['/'],
  },
  {
    was: 'gemeldeter Navigationsfehler (der alte, einzige Fall)',
    manifest: { routes: [{ route: '/', error: 'HTTP 500', shots: [] }] }, verlangt: ['/'],
  },
  {
    was: 'eine Route gut, eine leer',
    manifest: { routes: [
      { route: '/', shots: [bild('da.png')] },
      { route: '/team', shots: [] },
    ] },
    verlangt: ['/', '/team'],
  },
  {
    was: 'shots fehlt als Feld ganz',
    manifest: { routes: [{ route: '/' }] }, verlangt: ['/'],
  },
];

const DURCHLASSEN = [
  {
    was: 'eine Route, ein echtes Bild',
    manifest: { routes: [{ route: '/', status: 200, shots: [bild('da.png')] }] },
    verlangt: ['/'],
  },
  {
    was: 'Schraegstrich am Ende zaehlt als dieselbe Route',
    manifest: { routes: [{ route: '/team/', shots: [bild('da.png')] }] },
    verlangt: ['/team'],
  },
  {
    was: 'Desktop + Mobile: dieselbe Route zweimal im Manifest',
    manifest: { routes: [
      { route: '/', shots: [bild('da.png')] },
      { route: '/', shots: [bild('da.png')] },
    ] },
    verlangt: ['/'],
  },
];

// Kaputte Manifeste duerfen nicht still als "keine Maengel" gelten — dafuer
// sorgt liste(). Sie muss werfen, nicht [] zurueckgeben.
const WERFEN = [
  { was: 'Manifest ohne routes-Feld', manifest: { base: 'x' } },
  { was: 'routes ist eine Zahl',      manifest: { routes: 0 } },
  { was: 'Manifest ist null',         manifest: null },
];

let rot = 0;
let gezaehlt = 0;
const sag = (s) => console.log(s);
const lauf = (f) => sweepMaengel(f.manifest, f.verlangt, tmp);

sag(`Sweep-Check — Testordner ${tmp}\n`);
sag('Diese Manifeste MUESSEN reissen — jedes ist ein Sweep, der nichts gesehen hat:\n');

for (const f of REISSEN) {
  let maengel = null, fehler = null;
  try { maengel = lauf(f); } catch (e) { fehler = e.message; }
  const ok = !fehler && maengel.length > 0;
  if (!ok) rot++;
  gezaehlt += 1;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwarteter Absturz: ${fehler}`);
  else if (!ok) sag('         durchgelassen — kein einziger Mangel gemeldet');
  else sag(`         ${maengel.join(' | ')}`);
}

sag('\nDiese muessen durchgehen — sonst ist das Tor nur in die andere Richtung kaputt:\n');

for (const f of DURCHLASSEN) {
  let maengel = null, fehler = null;
  try { maengel = lauf(f); } catch (e) { fehler = e.message; }
  const ok = !fehler && maengel.length === 0;
  if (!ok) rot++;
  gezaehlt += 1;
  sag(`  [${ok ? 'OK' : 'ROT'}]   ${f.was}`);
  if (fehler) sag(`         unerwarteter Absturz: ${fehler}`);
  else if (!ok) sag(`         faelschlich gerissen: ${maengel.join(' | ')}`);
}

sag('\nEin unlesbares Manifest ist kein sauberer Sweep — es muss werfen:\n');

for (const f of WERFEN) {
  let geworfen = false, meldung = '';
  try { sweepMaengel(f.manifest, ['/'], tmp); } catch (e) { geworfen = true; meldung = e.message; }
  if (!geworfen) rot++;
  gezaehlt += 1;
  sag(`  [${geworfen ? 'OK' : 'ROT'}]   ${f.was}`);
  if (geworfen) sag(`         ${meldung}`);
  else sag('         still als "keine Maengel" durchgelassen');
}

// --- Der Exit-Code von shot-sweep.mjs selbst ---------------------------
// Bis hierher prueft diese Eval die AUSWERTUNG des Manifests im Gate. Was sie
// nicht prueft: ob shot-sweep seine fehlgeschlagenen Routen ueberhaupt als
// Exit-Code weitergibt. Befund 30.07.2026 durch den Sabotage-Lauf —
// `process.exitCode = 1` zu `= 0` geaendert, und keine Eval merkte es. Ein
// Sweep, der nichts fotografiert hat, meldet dann Erfolg, und der Panel-Schritt
// kritisiert Bilder, die es nicht gibt.
//
// Geprueft am echten Lauf gegen eine Route, die es nicht gibt (HTTP 404).
sag('');
{
  const { execFileSync, spawn, spawnSync } = await import('node:child_process');
  const fsN = await import('node:fs');
  const osN = await import('node:os');
  const pathN = await import('node:path');
  const HIER_ = pathN.dirname(new URL(import.meta.url).pathname);
  const SWEEP = pathN.join(HIER_, '..', 'scripts', 'shot-sweep.mjs');
  const ordner = fsN.mkdtempSync(pathN.join(osN.tmpdir(), 'sweep-exit-'));
  // Eine ECHTE Seite: shot-sweep meldet eine fast leere Seite selbst als Fehler
  // ("leere Seite, 4 Zeichen Text") — dann waere der Exit-Code aus dem falschen
  // Grund 1, und der Test bewiese nichts.
  fsN.writeFileSync(pathN.join(ordner, 'index.html'),
    '<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Sweep</title></head><body>'
    + '<h1>Sanierung in Karlsruhe</h1>'
    + '<p>Wir sanieren Wohnungen und Haeuser. Nach dem Ortstermin bekommen Sie einen '
    + 'Festpreis, einen Ansprechpartner und ein Datum zum Einzug.</p>'
    + '<p>Bad, Kueche, komplette Wohnungen — meist in elf Werktagen.</p></body></html>');
  const PORT_ = Number(process.env.SWEEP_EXIT_PORT || 5453);
  let messbar = true;

  // Vor dem Start pruefen, ob der Port frei ist. Ist er fremdbelegt, startet
  // python3 gar nicht — der Test lief dann gegen die FREMDE Seite und meldete
  // trotzdem gruen. Gemessen 31.07.2026: mit einem fremden Server auf 5453
  // ergab dieser Lauf 13/13, obwohl der eigene Server nie existierte.
  const belegt = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${PORT_}/`], { encoding: 'utf8' });
  if (belegt.stdout && belegt.stdout.trim() !== '000') {
    sag(`ROT  Port ${PORT_} ist fremdbelegt — dieser Fall kann nicht messen`);
    sag('       Ohne eigenen Server liefe der Test gegen eine fremde Seite');
    sag('       und meldete ihr Ergebnis als eigenes. SWEEP_EXIT_PORT setzen.');
    rot++;
    messbar = false;
  }

  const server = messbar
    ? spawn('python3', ['-m', 'http.server', String(PORT_)], { cwd: ordner, stdio: 'ignore' })
    : null;

  // Aktiv warten statt blind schlafen: 1500 ms reichen auf dieser Maschine,
  // auf einer langsameren nicht — und ein Test, der zufaellig durchfaellt,
  // wird abgeschaltet statt repariert.
  let bereit = false;
  for (let i = 0; messbar && i < 40 && !bereit; i += 1) {
    const q = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
      '-w', '%{http_code}', `http://127.0.0.1:${PORT_}/`], { encoding: 'utf8' });
    if (q.stdout && q.stdout.trim() === '200') bereit = true;
    else spawnSync('sleep', ['0.2']);
  }
  if (messbar && !bereit) {
    server.kill('SIGKILL');
    fsN.rmSync(ordner, { recursive: true, force: true });
    sag(`ROT  eigener Testserver auf ${PORT_} antwortet nicht — nichts gemessen`);
    rot++;
    messbar = false;
  }
  let code = 0;
  if (messbar && bereit) try {
    execFileSync('node', [SWEEP, '--base', `http://localhost:${PORT_}`,
      '--routes', '/,/gibt-es-nicht', '--out', pathN.join(ordner, 'out')],
      { encoding: 'utf8', timeout: 300000 });
  } catch (e) { code = e.status ?? 1; }
  if (server) server.kill('SIGKILL');
  fsN.rmSync(ordner, { recursive: true, force: true });
  // Bei nicht messbarem Fall ist die Zeile oben schon rot gezaehlt — hier
  // nicht doppelt zaehlen und nicht faelschlich gruen melden.
  const ok = messbar && bereit && code === 1;
  if (!ok && messbar && bereit) rot++;
  // Bei nicht messbarem Fall steht der Grund schon oben. Eine zweite rote
  // Zeile ueber dieselbe Ursache liest sich wie ein zweiter Defekt.
  if (messbar && bereit) sag(`${ok ? 'OK  ' : 'ROT '} shot-sweep.mjs endet mit Exit 1, wenn eine Route fehlschlaegt`);
  if (!ok) sag(`       bekam Exit ${code} — ein Sweep ohne Bilder meldet Erfolg`);
}

// --- U4B: State-Capture-Vertrag (AE3) ----------------------------------------
{
  const { execFileSync, spawn, spawnSync } = await import('node:child_process');
  const fsN = await import('node:fs');
  const osN = await import('node:os');
  const pathN = await import('node:path');
  const HIER_ = pathN.dirname(new URL(import.meta.url).pathname);
  const SWEEP = pathN.join(HIER_, '..', 'scripts', 'shot-sweep.mjs');
  const quelleSweep = fsN.readFileSync(SWEEP, 'utf8');

  sag('\nU4B State-Capture — Quelle:\n');
  const srcChecks = [
    [/capture_profile/.test(quelleSweep) && /static:\s*STATIC/.test(quelleSweep)
      && /states:\s*STATES/.test(quelleSweep) && /mobile:\s*MOBILE/.test(quelleSweep),
      'capture_profile ehrlich fuer --static/--states/--mobile'],
    [/web\/shot-sweep\/v2/.test(quelleSweep) && /run_id/.test(quelleSweep)
      && /build_revision/.test(quelleSweep),
      'Schema v2 plus run_id/build_revision'],
    [/state-focus/.test(quelleSweep) && /open-expanded/.test(quelleSweep)
      && /state-hover/.test(quelleSweep),
      'getrennte hover/focus/open-expanded Receipts'],
    [/page\.route\s*\(/.test(quelleSweep) && /fulfill/.test(quelleSweep)
      && /assert_loading|loading/.test(quelleSweep),
      'Loading per Intercept-Hold, dann Terminalcapture'],
    [/setup failed/.test(quelleSweep) && /state_matrix/.test(quelleSweep),
      'Setup-Fehler landet in failed, nicht als PASS'],
    [/keyboard/.test(quelleSweep) && /axe/.test(quelleSweep)
      && /playwright_ref/.test(quelleSweep) && /aria/.test(quelleSweep),
      'State-Receipts tragen Keyboard/ARIA/Axe oder Playwright-Ref'],
    [/nur Hover/.test(quelleSweep),
      'states=true nur Hover ist FAIL'],
    [/FRISCH geladener Seite/.test(quelleSweep),
      'Reload vor Klickpass bleibt'],
    [/animations:\s*['"]disabled['"]/.test(quelleSweep)
      && !/fullPage:\s*true/.test(quelleSweep),
      'animations disabled, kein fullPage'],
  ];
  for (const [ok, was] of srcChecks) {
    gezaehlt += 1;
    if (!ok) rot++;
    sag(`  [${ok ? 'OK' : 'ROT'}]   ${was}`);
  }

  sag('\nU4B State-Capture — echter Sweep gegen Fixture:\n');
  const PORT_S = Number(process.env.STATE_SWEEP_PORT || 5491);
  const ordner = fsN.mkdtempSync(pathN.join(osN.tmpdir(), 'sweep-states-'));
  const seite = pathN.join(ordner, 'site');
  const out = pathN.join(ordner, 'out');
  fsN.mkdirSync(seite);
  fsN.writeFileSync(pathN.join(seite, 'index.html'), `<!doctype html>
<html lang="de"><head><meta charset="utf-8"><title>State Fixture</title>
<style>
body{margin:0;font-family:sans-serif;background:#f4efe6;color:#12212b}
header{padding:16px;background:#153043;color:#fff}
main{padding:24px;min-height:500px}
button:focus,a:focus{outline:3px solid #1f5f4a}
button:hover,a:hover{background:#c8e6d0;color:#12212b}
#menu{display:none;background:#fff;color:#12212b;padding:8px}
</style></head><body>
<header><nav>
  <a href="/">Home</a>
  <button type="button" id="menubtn" aria-expanded="false" aria-controls="menu">Menue</button>
  <ul id="menu" role="menu"><li><a href="/a" role="menuitem">Alpha</a></li></ul>
</nav></header>
<main>
  <button type="button" class="aktion" id="aktion-a">Aktion A</button>
  <button type="button" class="aktion" id="aktion-b">Aktion B</button>
  <ul id="items"><li>Eintrag 1</li></ul>
  <form id="contact">
    <label>Name <input name="name" required value="Ada"></label>
    <button type="submit">Senden</button>
  </form>
  <p id="status" role="status" hidden>Gesendet</p>
  <p id="alert" role="alert" hidden>Fehler</p>
  <p id="loading" aria-live="polite" hidden>Laedt</p>
</main>
<script>
const btn=document.getElementById('menubtn');
const menu=document.getElementById('menu');
btn.addEventListener('click',()=>{
  const open=btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded', open?'false':'true');
  menu.style.display=open?'none':'block';
  if(!open) menu.querySelector('a').focus();
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    btn.setAttribute('aria-expanded','false');
    menu.style.display='none';
    btn.focus();
  }
});
document.getElementById('contact').addEventListener('submit',async e=>{
  e.preventDefault();
  const loading=document.getElementById('loading');
  const status=document.getElementById('status');
  const alert=document.getElementById('alert');
  loading.hidden=false; status.hidden=true; alert.hidden=true;
  try{
    const r=await fetch('/api/submit',{method:'POST',body:'{}'});
    loading.hidden=true;
    if(r.ok) status.hidden=false; else alert.hidden=false;
  }catch{ loading.hidden=true; alert.hidden=false; }
});
</script>
</body></html>`);
  const bookingReceipt = pathN.join(ordner, 'booking-receipt.json');
  fsN.writeFileSync(bookingReceipt, JSON.stringify({
    test: 'tests/booking.spec.ts',
    shots: ['booking-open.png'],
    axe: { violations: 0 },
    keyboard: ['Tab', 'Enter'],
    focus: 'dialog',
    role: 'dialog',
    name: 'Buchung',
  }));
  const specPath = pathN.join(ordner, 'state-spec.json');
  fsN.writeFileSync(specPath, JSON.stringify({
    schema: 'web/state-spec/v1',
    scenarios: [
      {
        id: 'contact-submit',
        route: '/',
        states: ['loading', 'success', 'error'],
        prepare: { selector: 'input[name=name]', fill: 'Ada' },
        trigger: { selector: 'form#contact button[type=submit]', action: 'click' },
        hold: { url: '**/api/submit' },
        assert_loading: { selector: '#loading:not([hidden])' },
        success: { status: 200, body: '{"ok":true}', assert: { selector: '[role=status]:not([hidden])' } },
        error: { status: 400, body: '{"ok":false}', assert: { selector: '[role=alert]:not([hidden])' } },
      },
      {
        id: 'items-empty',
        route: '/',
        states: ['empty'],
        setup: { evaluate: "document.getElementById('items').innerHTML=''" },
        assert: { selector: '#items:empty' },
      },
      {
        id: 'broken-setup',
        route: '/',
        states: ['empty'],
        setup: { evaluate: "throw new Error('setup boom')" },
        assert: { selector: '#items' },
      },
    ],
    playwright_refs: [
      { id: 'booking-complex', test: 'tests/booking.spec.ts', receipt: bookingReceipt },
    ],
    not_applicable: [],
  }));

  const belegtS = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
    '-w', '%{http_code}', `http://127.0.0.1:${PORT_S}/`], { encoding: 'utf8' });
  let messbarS = true;
  if (belegtS.stdout && belegtS.stdout.trim() !== '000') {
    sag('  [ROT]   State-Fixture-Port frei');
    sag(`         Port ${PORT_S} fremdbelegt — STATE_SWEEP_PORT setzen.`);
    rot++; gezaehlt += 1;
    messbarS = false;
  } else {
    gezaehlt += 1;
    sag('  [OK]   State-Fixture-Port frei');
  }

  const serverS = messbarS
    ? spawn('python3', ['-m', 'http.server', String(PORT_S), '--bind', '127.0.0.1'],
      { cwd: seite, stdio: 'ignore' })
    : null;
  let bereitS = false;
  for (let i = 0; messbarS && i < 40 && !bereitS; i += 1) {
    const q = spawnSync('curl', ['-s', '-o', '/dev/null', '-m', '2',
      '-w', '%{http_code}', `http://127.0.0.1:${PORT_S}/`], { encoding: 'utf8' });
    if (q.stdout && q.stdout.trim() === '200') bereitS = true;
    else spawnSync('sleep', ['0.2']);
  }
  if (messbarS && !bereitS) {
    serverS?.kill('SIGKILL');
    sag('  [ROT]   State-Fixture-Server antwortet');
    rot++; gezaehlt += 1;
    messbarS = false;
  } else if (messbarS) {
    gezaehlt += 1;
    sag('  [OK]   State-Fixture-Server antwortet');
  }

  let sweepText = '';
  let sweepCode = 0;
  if (messbarS && bereitS) {
    try {
      sweepText = execFileSync('node', [
        SWEEP,
        '--base', `http://127.0.0.1:${PORT_S}`,
        '--out', out,
        '--routes', '/',
        '--static', '--states', '--mobile', '--no-interact',
        '--run-id', 'u4b-run',
        '--build-revision', 'rev-u4b',
        '--state-spec', specPath,
      ], { encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024 });
    } catch (e) {
      sweepCode = e.status ?? 1;
      sweepText = `${e.stdout || ''}${e.stderr || ''}${e.message || ''}`;
    }
  }
  if (serverS) serverS.kill('SIGKILL');

  const manPath = pathN.join(out, 'manifest.json');
  let man = null;
  try { man = JSON.parse(fsN.readFileSync(manPath, 'utf8')); } catch { man = null; }

  const live = (ok, was, detail) => {
    gezaehlt += 1;
    if (!ok) rot++;
    sag(`  [${ok ? 'OK' : 'ROT'}]   ${was}`);
    if (!ok && detail) sag(`         ${detail}`);
  };

  if (!messbarS || !bereitS) {
    live(false, 'State-Sweep lief', 'Server nicht messbar');
  } else {
    const launchFail = /browserType\.launch|Executable doesn't exist|Failed to launch/i.test(sweepText);
    if (launchFail) {
      live(false, 'State-Sweep Playwright startbar', sweepText.trim().split('\n').slice(-4).join(' | '));
    } else {
      live(!!man, 'Manifest geschrieben', manPath);
      const profile = man?.capture_profile || {};
      live(profile.static === true && profile.states === true && profile.mobile === true,
        'capture_profile static/states/mobile alle true', JSON.stringify(profile));
      live(man?.schema === 'web/shot-sweep/v2'
        && man?.run_id === 'u4b-run'
        && man?.build_revision === 'rev-u4b',
        'schema/run_id/build_revision',
        `schema=${man?.schema} run=${man?.run_id} rev=${man?.build_revision}`);
      const shots = (man?.routes || []).flatMap((r) => r.shots || []);
      const kinds = shots.map((s) => s.state || s.kind);
      const has = (re) => kinds.some((k) => re.test(String(k || '')));
      live(has(/hover/), 'Hover-Receipt vorhanden', kinds.slice(0, 12).join(','));
      live(has(/focus/), 'Focus-Receipt vorhanden');
      live(has(/open-expanded|open_expanded|expanded/), 'Open/Expanded-Receipt vorhanden');
      live(has(/loading/), 'Loading-Receipt vorhanden');
      live(has(/success/), 'Success-Receipt vorhanden');
      live(has(/error/), 'Error-Receipt vorhanden');
      live(has(/empty/), 'Empty-Receipt vorhanden');
      const focusTargets = new Set(shots.filter((s) => /focus/.test(String(s.state || s.kind || '')))
        .map((s) => s.target));
      live(focusTargets.size >= 2, 'zwei Targets brauchen zwei Focus-Receipts',
        [...focusTargets].join(','));
      const mobileShot = shots.some((s) => s.viewport_label === 'mobile'
        || (s.viewport && s.viewport.width === 390))
        || (man?.routes || []).some((r) => (r.shots || []).length
          && (r.viewport_label === 'mobile' || r.label === 'mobile'));
      live(mobileShot || (man?.routes || []).length >= 2, 'Mobile-Route im Manifest',
        `routes=${(man?.routes || []).length}`);
      const matrix = man?.state_matrix || {};
      const failed = matrix.failed || [];
      live(failed.some((f) => /broken-setup|setup boom|setup failed/i.test(JSON.stringify(f))),
        'broken-setup steht in failed', JSON.stringify(failed).slice(0, 240));
      const brokenShot = shots.some((s) => /broken-setup/.test(JSON.stringify(s)));
      live(!brokenShot, 'Setup-Fehler erzeugt keinen Success-Shot');
      const captured = matrix.captured || [];
      live(captured.some((c) => c.playwright_ref || /booking/.test(JSON.stringify(c))),
        'Playwright-Ref als captured', JSON.stringify(captured.filter((c) => c.playwright_ref)).slice(0, 200));
      const sample = shots.find((s) => /focus|open-expanded|loading/.test(String(s.state || s.kind || '')));
      live(!!sample && (sample.keyboard || sample.role || sample.axe || sample.playwright_ref),
        'State-Receipt hat Keyboard/Role/Axe', JSON.stringify(sample && {
          kind: sample.kind, state: sample.state, keyboard: sample.keyboard,
          role: sample.role, name: sample.name, axe: sample.axe,
        }));
      const hoverOnly = kinds.length > 0
        && kinds.every((k) => /hover/.test(String(k || '')))
        && !kinds.some((k) => /focus|open|loading|success|error|empty/.test(String(k || '')));
      live(!hoverOnly && profile.states === true,
        'states=true ist nicht nur Hover', kinds.slice(0, 20).join(','));
      live(sweepCode === 1 || sweepCode === 0,
        'Sweep endet mit Exit 0 oder 1 (nicht 2)', `Exit ${sweepCode}`);
    }
  }
  try { fsN.rmSync(ordner, { recursive: true, force: true }); } catch { /* tmp */ }
}

// Selbst zaehlen statt Listen zu addieren.
//
// Hier stand `... + 1` fuer eine Zusatzpruefung, die es nicht (mehr) gibt:
// gemessen am 31.07.2026 druckt der Lauf 13 Zeilen und behauptete 14. Die
// Listen haben 7 + 3 + 3 Eintraege; die +1 zaehlte eine Pruefung, die
// nirgends stattfindet. Ein zu HOHER Sollwert ist die stillere Haelfte des
// Problems: die Eval meldet dauerhaft "13/14" und sieht aus, als fehle
// dauerhaft etwas.
//
// Fuenfter Formel-Fall dieser Serie (detect-check, naht-check, craft-check,
// doku-zahlen, jetzt sweep-check).
// Untergrenze gegen die Gegenrichtung: faellt eine Zaehlstelle oder ein
// ganzer Abschnitt aus, zaehlt `gezaehlt` einfach weniger und "10/10" saehe
// gruen aus. Genau das trat bei der Gegenprobe am 31.07.2026 ein. Die drei
// Listen sind die bekannte Untergrenze.
const MINDESTENS = REISSEN.length + DURCHLASSEN.length + WERFEN.length;
if (gezaehlt < MINDESTENS) {
  sag(`\nNur ${gezaehlt} Pruefungen gelaufen, mindestens ${MINDESTENS} erwartet.`);
  sag('Ein Abschnitt ist still ausgefallen — das ist kein bestandener Lauf.');
  process.exit(2);
}
const gesamt = gezaehlt;
sag(`\n${gesamt - rot}/${gesamt} wie erwartet.`);
if (rot) {
  sag('Ein Sweep ohne Bilder kommt als Gruen durch. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
sag('Ein Sweep, der nichts fotografiert hat, besteht nicht mehr.');
