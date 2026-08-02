#!/usr/bin/env node
/**
 * run-dna-scaffold-check.mjs — haelt das Skelett seine eigene Doktrin ein?
 *
 * `dna-scaffold.mjs` schreibt eine design-dna.json und hat im Dateikopf eine
 * ausdrueckliche Disziplin: „只搬侦察里'真实抓到'的信号，绝不编造" — nur was die
 * Aufklaerung wirklich abgegriffen hat, niemals erfinden. Bei einem Werkzeug,
 * dessen Ausgabe spaeter als Design-Wahrheit gelesen wird, ist das die einzige
 * Regel, die zaehlt: ein erfundener Wert im Skelett wird zur Vorgabe, sobald
 * ihn niemand mehr hinterfragt.
 *
 * Gefunden 30.07.2026 durch systematisches Suchen NACH SKILL-GRENZE: der
 * design-Skill hat 29 Skripte und hatte eine einzige Eval. Vier davon faellen
 * ein Urteil oder schreiben eine Datei; dieses hier hatte keine.
 *
 * Der Befund: bei EINER gefundenen Schrift setzt das Skelett sie fuer ZWEI
 * Rollen (`heading` UND `body`, Zeile 158: `nonMono[1] || nonMono[0]`). Das ist
 * eine Ableitung, keine abgegriffene Tatsache — und der Begleittext behauptet
 * „已据真实信号填写" (nach echten Signalen gefuellt), ohne die Ableitung zu
 * nennen. Wer die Datei liest, haelt zwei Zuordnungen fuer gemessen, wo eine
 * gemessen und eine geraten ist.
 *
 * Diese Eval prueft beide Richtungen:
 *   1. LEER    Ohne --recon bleibt jedes Feld leer. Kein Platzhalter, keine
 *              Vermutung, kein "sans-serif" als Notnagel.
 *   2. TREU    Mit --recon steht nur drin, was in der Recon-Datei stand.
 *   3. EHRLICH Wo das Skelett ableitet, muss es das sagen.
 *
 * Braucht weder Browser noch Netz.
 *
 *   node evals/run-dna-scaffold-check.mjs
 *
 * Exit 0 = jeder Fall wie erwartet. Exit 1 = mindestens einer daneben.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const SKRIPT = path.join(HIER, '..', 'scripts', 'dna-scaffold.mjs');
if (!fs.existsSync(SKRIPT)) {
  console.error(`FEHLER: dna-scaffold.mjs nicht gefunden: ${SKRIPT}`);
  process.exit(2);
}

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

// Jedes Blatt des Baums mit seinem Pfad — nur so faellt ein erfundener Wert
// tief unten ueberhaupt auf.
function* blaetter(o, pfad = '') {
  if (o && typeof o === 'object' && !Array.isArray(o)) {
    for (const [k, v] of Object.entries(o)) yield* blaetter(v, `${pfad}.${k}`);
  } else if (Array.isArray(o)) {
    for (let i = 0; i < o.length; i++) yield* blaetter(o[i], `${pfad}[${i}]`);
  } else {
    yield [pfad, o];
  }
}
const gefuellt = (dna) => [...blaetter(dna)]
  .filter(([, v]) => v !== '' && v !== null && v !== 0 && v !== false);

function lauf(recon, name = 'Testseite') {
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'dna-eval-'));
  try {
    const argv = [SKRIPT, '--out', path.join(ordner, 'dna.json'), '--name', name];
    if (recon !== null) {
      const rp = path.join(ordner, 'recon.json');
      fs.writeFileSync(rp, JSON.stringify(recon));
      argv.push('--recon', rp);
    }
    const r = spawnSync('node', argv, { encoding: 'utf8', timeout: 60000 });
    const ziel = path.join(ordner, 'dna.json');
    return {
      code: r.status,
      dna: fs.existsSync(ziel) ? JSON.parse(fs.readFileSync(ziel, 'utf8')) : null,
      aus: `${r.stdout || ''}${r.stderr || ''}`,
    };
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

console.log('\nDNA-Skelett — nur abgegriffene Signale, nichts erfunden?\n');

// --- 1. Ohne Aufklaerung bleibt alles leer --------------------------------
console.log('Ohne --recon darf NICHTS gefuellt sein ausser dem Namen:\n');
{
  const { code, dna } = lauf(null, 'Testseite');
  if (!dna) {
    zeile(false, 'Skelett wird geschrieben', `Exit ${code}, keine Datei`);
  } else {
    const g = gefuellt(dna);
    // Erlaubt sind nur: der uebergebene Name und die Selbstbeschreibung.
    const fremd = g.filter(([p]) => !/\.meta\.name$|_scaffold_note$|_recon_signals/.test(p));
    zeile(fremd.length === 0, `Skelett leer (${[...blaetter(dna)].length} Blaetter)`,
      fremd.length ? `erfunden: ${fremd.slice(0, 4).map(([p, v]) => `${p}=${JSON.stringify(v)}`).join(', ')}` : null);
    zeile(dna.meta?.name === 'Testseite', '--name landet in meta.name');
  }
}

// --- 2. Mit Aufklaerung nur das, was drinstand ----------------------------
console.log('\nMit --recon nur uebernehmen, was die Recon-Datei nennt:\n');
{
  const { dna } = lauf({ fonts: ['Barlow Condensed'], colors: [], frameworks: [] });
  const fam = dna?.design_system?.typography?.font_families || {};
  zeile(fam.heading === 'Barlow Condensed', 'gefundene Schrift wird heading');
  zeile(fam.mono === '', 'keine Mono gefunden -> mono bleibt leer',
    fam.mono === '' ? null : `mono = ${JSON.stringify(fam.mono)} — erfunden`);
  zeile((dna?._recon_signals?.fonts || []).includes('Barlow Condensed'),
    'das Rohsignal steht unter _recon_signals');

  // Der Befund vom 30.07.2026: bei EINER Schrift wird sie auch `body`. Das ist
  // eine Ableitung. Sie darf sein — aber sie muss dastehen, sonst liest der
  // Naechste zwei Messungen, wo eine gemessen und eine geraten ist.
  const abgeleitet = fam.body === fam.heading && fam.body !== '';
  const genannt = /abgeleitet|同一字体|body.*heading|nur eine Schrift/i
    .test(String(dna?._scaffold_note || ''));
  zeile(!abgeleitet || genannt,
    'wird body aus heading abgeleitet, sagt der Begleittext es',
    abgeleitet && !genannt
      ? `body = heading = "${fam.body}", aber _scaffold_note nennt die Ableitung nicht`
      : null);
}

// --- 3. Zwei Schriften: keine Ableitung noetig ----------------------------
console.log('\nZwei Schriften — jede Rolle hat ihr eigenes Signal:\n');
{
  const { dna } = lauf({ fonts: ['Barlow Condensed', 'Outfit'], colors: [], frameworks: [] });
  const fam = dna?.design_system?.typography?.font_families || {};
  zeile(fam.heading === 'Barlow Condensed' && fam.body === 'Outfit',
    'heading und body je aus eigenem Signal',
    `heading=${JSON.stringify(fam.heading)} body=${JSON.stringify(fam.body)}`);
}

// --- 4. Mono wird erkannt, nicht geraten ---------------------------------
console.log('\nEine Mono-Schrift gehoert in mono, nicht in heading:\n');
{
  const { dna } = lauf({ fonts: ['JetBrains Mono', 'Outfit'], colors: [], frameworks: [] });
  const fam = dna?.design_system?.typography?.font_families || {};
  zeile(fam.mono === 'JetBrains Mono' && fam.heading === 'Outfit',
    'Mono erkannt, Rest korrekt zugeordnet',
    `mono=${JSON.stringify(fam.mono)} heading=${JSON.stringify(fam.heading)}`);
}

// --- 5. Kaputte Recon-Datei: kein stiller Erfolg -------------------------
console.log('\nUnbrauchbare Aufklaerung darf nicht als Erfolg durchgehen:\n');
{
  const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'dna-eval-'));
  try {
    const rp = path.join(ordner, 'kaputt.json');
    fs.writeFileSync(rp, '{ das ist kein JSON');
    const r = spawnSync('node', [SKRIPT, '--out', path.join(ordner, 'dna.json'),
      '--recon', rp, '--name', 'X'], { encoding: 'utf8', timeout: 60000 });
    const aus = `${r.stdout || ''}${r.stderr || ''}`;
    // Entweder Abbruch mit Hinweis, oder Weiterlaufen mit LEEREM Skelett und
    // sichtbarer Warnung. Was nicht sein darf: still ein leeres Skelett als
    // "aus recon vorgefuellt" melden.
    const zielDa = fs.existsSync(path.join(ordner, 'dna.json'));
    const sagtWas = /recon|json|fehler|error|warn/i.test(aus);
    zeile(r.status !== 0 || sagtWas,
      'kaputte recon.json faellt auf (Abbruch oder Warnung)',
      r.status === 0 && !sagtWas
        ? `Exit 0, kein Hinweis, Datei ${zielDa ? 'geschrieben' : 'fehlt'}`
        : null);
  } finally {
    fs.rmSync(ordner, { recursive: true, force: true });
  }
}

// --- 6. Die zweite Kopie darf nicht auseinanderlaufen ---------------------
// Dieselbe Datei liegt zweimal im Baum: hier und unter
// eigene/web/scripts/web-clone/. Der Ableitungs-Fix ging am 30.07.2026 nur in
// diese Fassung; die andere verschwieg die Ableitung weiter — gemessen, nicht
// vermutet (body==heading in beiden, _abgeleitet nur hier).
//
// Ein Fix, der nur eine von zwei Kopien erreicht, ist schlimmer als keiner: er
// erzeugt den Eindruck, das Problem sei erledigt. Darum prueft die Eval jetzt
// mit, dass beide dieselbe Antwort geben.
console.log('\nDie zweite Kopie im web-Skill muss dasselbe tun:\n');
{
  const zwilling = path.resolve(HIER, '..', '..', 'eigene', 'web', 'scripts',
    'web-clone', 'dna-scaffold.mjs');
  if (!fs.existsSync(zwilling)) {
    zeile(true, 'keine zweite Kopie vorhanden — nichts abzugleichen');
  } else {
    const ordner = fs.mkdtempSync(path.join(os.tmpdir(), 'dna-zwilling-'));
    try {
      const rp = path.join(ordner, 'recon.json');
      fs.writeFileSync(rp, JSON.stringify({ fonts: ['Barlow Condensed'], colors: [], frameworks: [] }));
      const ziel = path.join(ordner, 'dna.json');
      spawnSync('node', [zwilling, '--out', ziel, '--recon', rp, '--name', 'X'],
        { encoding: 'utf8', timeout: 60000 });
      const dna = fs.existsSync(ziel) ? JSON.parse(fs.readFileSync(ziel, 'utf8')) : null;
      const fam = dna?.design_system?.typography?.font_families || {};
      const abgeleitet = fam.body === fam.heading && fam.body !== '';
      const vermerkt = (dna?._abgeleitet || []).length > 0;
      zeile(!abgeleitet || vermerkt,
        'web-clone/dna-scaffold.mjs vermerkt die Ableitung ebenfalls',
        abgeleitet && !vermerkt
          ? 'body wird abgeleitet, _abgeleitet ist leer — der Fix fehlt in dieser Kopie'
          : null);
    } finally {
      fs.rmSync(ordner, { recursive: true, force: true });
    }
  }
}

const gesamt = geprueft;
console.log(`\n${gesamt - fehler}/${gesamt} wie erwartet.`);
if (fehler) {
  console.log('Das Skelett behauptet mehr, als die Aufklaerung hergibt.');
  process.exit(1);
}
console.log('Das Skelett traegt nur ein, was gemessen wurde — und sagt, wo es ableitet.');
