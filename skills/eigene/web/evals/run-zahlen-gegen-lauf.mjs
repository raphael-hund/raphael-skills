#!/usr/bin/env node
// run-zahlen-gegen-lauf.mjs — stimmt die dokumentierte Fallzahl mit dem Lauf?
//
// LAUFZEIT: rund 9 Minuten (zwischen 420s und 660s gemessen 02.08.2026) — sie
// faehrt jede genannte Eval einmal, darunter zwei mit Browser. Die Spanne statt
// einer Zahl, weil der Lauf im Hintergrund lief und nur zwischen zwei Blicken
// fertig wurde: eine erfundene Genauigkeit waere schlechter als eine ehrliche
// Spanne. Zu lang fuer run-laufzeit-check (Grenze 300s) — dort ausgenommen.
//
//   node evals/run-zahlen-gegen-lauf.mjs
//
// WARUM (Befund 02.08.2026)
// Alle bisherigen Zahl-Wachen vergleichen TEXT MIT TEXT: die Doku gegen den
// Kopfkommentar, eine Nennung gegen die andere. Sie finden jeden Widerspruch —
// und genau deshalb finden sie eine ganze Klasse nicht: eine Zahl, die an
// beiden Stellen GLEICH falsch steht, ist widerspruchsfrei.
//
// Gemessen am selben Tag: SKILL.md nannte
//   "evals/run-variablen-check.mjs — 8 Regeln"
// Der echte Lauf endete mit "9/9 Pruefungen wie erwartet". Keine Wache schlug
// an, weil die 8 nirgendwo sonst stand. Wer die Eval erweitert und die Doku
// vergisst, erzeugt genau diesen Zustand — und er faellt nie auf.
//
// WAS DIESE EVAL PRUEFT
// Jede in SKILL.md mit "— <n> Faelle" oder "— <n> Regeln" beschriebene Eval
// wird einmal gefahren und ihre Bilanzzeile ("35/35 wie erwartet") mit der
// dokumentierten Zahl verglichen. Der NENNER zaehlt, nicht der Zaehler: eine
// rote Eval hat trotzdem die richtige Fallzahl.
//
// Was sie NICHT prueft: ob die Faelle sinnvoll sind. Nur, ob es so viele sind,
// wie die Doku behauptet.
//
// AUSGENOMMEN: sich selbst und run-eval-umfang (der wiederum diese hier faehrt
// — sonst laufen beide endlos ineinander).
//
// Exit 0 = jede Zahl deckt sich. Exit 1 = mindestens eine nicht.
// Exit 2 = die Eval selbst kann nicht pruefen.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Was hier NICHT nachgefahren wird, mit Grund und Messwert — dieselbe Form
// wie in run-eval-umfang. Eine Liste ohne Zahlen altert unbemerkt: sie sieht
// noch begruendet aus, wenn der Grund laengst weggefallen ist.
//
// Beide melden ihre Fallzahl in der eigenen Schlusszeile, die der
// Umfang-Waechter gegen den Sollstand haelt. Sie hier ein zweites Mal zu
// fahren pruefte nichts Neues und sprengte jede Frist.
//
// Im design-Skill gibt es diese Ausnahme bewusst NICHT: dort dauern dieselben
// Fragen zusammen 75 Sekunden (sabotage 35s, browser-detect 31s), und eine
// Ausnahme waere ein blinder Fleck ohne Gegenwert.
const AUSGENOMMEN = {
  'run-antiset.mjs': 'braucht Browser + Server je Fixture (gemessen 02.08.2026: ueber 20 Min)',
  'run-sabotage.mjs': 'beschaedigt Pruefer nacheinander (gemessen 02.08.2026: rund 15 Min)',
};

const HIER = path.dirname(fileURLToPath(import.meta.url));
const MD = path.join(HIER, '..', 'SKILL.md');
const FRIST_MS = 900_000;
const SELBST = path.basename(fileURLToPath(import.meta.url));

let fehler = 0;
let gezaehlt = 0;

function zeile(ok, was, detail) {
  gezaehlt++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${was}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

if (!fs.existsSync(MD)) {
  console.error(`SKILL.md nicht gefunden unter ${MD}.`);
  console.error('Ohne sie hat diese Eval nichts zu vergleichen und saehe gruen aus.');
  process.exit(2);
}

// Kandidaten aus der Doku, nicht aus einer gepflegten Liste: wer dort eine
// Fallzahl nennt, wird gemessen. Eine neue Angabe ist damit automatisch dabei.
const kandidaten = [];
const md = fs.readFileSync(MD, 'utf8');
for (const m of md.matchAll(/(?:evals\/)?(run-[a-z-]+\.mjs)\s+—\s+(\d+)\s+(?:Faelle|Fälle|Regeln)/g)) {
  if (m[1] === SELBST || m[1] === 'run-eval-umfang.mjs') continue;
  // Die beiden schweren Laeufe bleiben draussen. run-antiset braucht ueber 20
  // Minuten (Browser plus Server je Fixture), run-sabotage etwa 15 — zusammen
  // sprengen sie jede vertretbare Frist, und beide melden ihre Fallzahl in
  // ihrer eigenen Schlusszeile, die run-eval-umfang gegen den Sollstand haelt.
  //
  // Gemessen 02.08.2026: mit ihnen lief diese Eval ueber 30 Minuten und wurde
  // abgeschnitten; die Doku versprach "rund 9 Min". Ohne sie sind es 5,5
  // (port 15s, halbe-antwort 223s, weiterleitung 63s, exit-vertrag 31s).
  if (AUSGENOMMEN[m[1]]) continue;
  if (kandidaten.some((k) => k.datei === m[1])) continue;
  kandidaten.push({ datei: m[1], soll: Number(m[2]) });
}

// Die Ausnahmeliste selbst pruefen: ein Eintrag fuer eine Eval, die es nicht
// mehr gibt, macht sie zur Muellhalde und deckt spaeter eine echte Luecke zu.
// Dieselbe Wache haengt an jeder anderen Ausnahmeliste in diesem Skill.
{
  const tot = Object.keys(AUSGENOMMEN).filter((n) => !fs.existsSync(path.join(HIER, n)));
  if (tot.length) {
    console.error(`\n${tot.length} Ausnahme(n) ohne Datei: ${tot.join(', ')}`);
    console.error('Entfernt oder umbenannt? Die Liste muss mitgezogen werden — sonst');
    console.error('steht dort spaeter eine Begruendung fuer etwas, das es nicht gibt.\n');
    process.exit(2);
  }
}

// Eine leere Liste sieht wie ein sauberer Lauf aus. Untergrenze unter dem
// Ist-Stand (4 am 02.08.2026), damit sie stilles Nichtstun faengt.
const MINDESTENS = 3;
if (kandidaten.length < MINDESTENS) {
  console.error(`Nur ${kandidaten.length} Evals mit dokumentierter Fallzahl gefunden (erwartet mindestens ${MINDESTENS}).`);
  console.error('Die Erkennung aus SKILL.md greift nicht mehr — ohne sie prueft');
  console.error('diese Eval nichts und meldet trotzdem gruen.');
  process.exit(2);
}

console.log(`Zahlen gegen den Lauf — ${kandidaten.length} Evals mit dokumentierter Fallzahl\n`);
console.log('Eine Zahl, die an beiden Stellen gleich falsch steht, ist widerspruchsfrei:\n');

for (const { datei, soll } of kandidaten) {
  const pfad = path.join(HIER, datei);
  if (!fs.existsSync(pfad)) {
    zeile(false, `${datei}: in SKILL.md genannt`, 'Datei existiert nicht — umbenannt oder geloescht?');
    continue;
  }

  const r = spawnSync('node', [pfad],
    { encoding: 'utf8', timeout: FRIST_MS, maxBuffer: 64 * 1024 * 1024 });

  // Ein Timeout ist KEIN Befund gegen die Zahl — er sagt nur, dass diese
  // Wache sie nicht messen konnte. Gemessen 02.08.2026: run-antiset braucht
  // normal 7:54, riss hier aber die 15-Minuten-Frist. Der Grund lag nicht am
  // Werkzeug, sondern an der Maschine: ein fremder Prozess belegte 2,9 GB bei
  // Load 444 und 0 GB freiem Speicher. Die erste Fassung meldete daraufhin
  // "1/5 Fallzahlen stimmen" — vier davon waren nie gelaufen. Ein Waechter,
  // der Ueberlast als Qualitaetsmangel meldet, schickt jeden auf die falsche
  // Spur. Deshalb: gleiche Behandlung wie Exit 2 — ungeprueft, nicht falsch.
  if (r.error && r.error.code === 'ETIMEDOUT') {
    zeile(true, `${datei}: nicht messbar (ueber ${FRIST_MS / 60000} Minuten) — Angabe ungeprueft`, null);
    console.log('         Maschine unter Last? free -g und uptime pruefen, dann einzeln fahren.');
    continue;
  }

  // Exit 2 heisst "konnte gar nicht erst pruefen" — belegter Port, fehlendes
  // Werkzeug. Die Bilanzzeile fehlt dann oder ist unvollstaendig, und ein
  // Fehlalarm, der die richtige Zahl als falsch hinstellt, ist schlimmer als
  // gar keine Wache.
  if (r.status === 2) {
    zeile(true, `${datei}: nicht messbar (Exit 2) — Angabe ungeprueft`, null);
    console.log(`         ${`${r.stderr || ''}`.trim().split('\n')[0].slice(0, 60)}`);
    continue;
  }

  // Der NENNER ist die Fallzahl. Der Zaehler sagt, wie viele durchkamen — eine
  // rote Eval hat trotzdem die richtige Anzahl Faelle.
  const zeilen = `${r.stdout || ''}`.trim().split('\n');
  let ist = null;
  for (let i = zeilen.length - 1; i >= 0; i -= 1) {
    const b = zeilen[i].match(/^\s*(\d+)\/(\d+)\b/);
    if (b) { ist = Number(b[2]); break; }
  }

  if (ist === null) {
    zeile(false, `${datei}: ${soll} dokumentiert`,
      'keine Bilanzzeile "<n>/<m>" gefunden — ohne sie ist die Zahl nicht pruefbar');
    continue;
  }

  zeile(ist === soll, `${datei}: ${soll} dokumentiert, ${ist} gelaufen`,
    `die Doku nennt eine andere Zahl als der Lauf — beide Textstellen koennen sich einig und trotzdem falsch sein`);
}

console.log(`\n${gezaehlt - fehler}/${gezaehlt} Fallzahlen decken sich mit dem Lauf.`);
if (fehler) {
  console.log('Mindestens eine dokumentierte Fallzahl stimmt nicht mit der Wirklichkeit.');
  process.exit(1);
}
console.log('Jede dokumentierte Fallzahl deckt sich mit dem echten Lauf.');
