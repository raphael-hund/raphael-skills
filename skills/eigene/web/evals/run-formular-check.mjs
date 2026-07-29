#!/usr/bin/env node
/**
 * run-formular-check.mjs — prueft den Formular-Pruefer, nicht ein Formular.
 *
 * Der Pruefer erkennt Kontaktfelder an ihrer Beschriftung. Jede Heuristik hat
 * zwei Versagensarten, und beide muessen geprueft werden:
 *
 *   UEBERSEHEN  — ein echtes E-Mail-Feld faellt durch die Erkennung. Das Tor
 *                 meldet gruen, das Handy oeffnet die falsche Tastatur.
 *   FEHLALARM   — ein Feld, das nichts mit Kontakt zu tun hat, wird angemeckert.
 *                 Nach dem dritten Fehlalarm schaut niemand mehr hin, und dann
 *                 uebersieht man den echten Befund.
 *
 * Befunde 29.07.2026, alle beim ersten Lauf gefunden:
 *   - aria-labelledby statt <label for>  -> Feld blieb komplett ungeprueft
 *   - "Telefonnummer" (deutsches Kompositum) -> \btelefon\b traf nie
 *   - nach der Lockerung: "Mobiliar" wurde als Telefonfeld gemeldet
 *
 *   node evals/run-formular-check.mjs
 *
 * Braucht einen Browser (Playwright), aber keinen fremden Server — der Lauf
 * startet seinen eigenen.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const PRUEFER = path.join(HIER, '..', 'scripts', 'formular-check.mjs');
const PORT = Number(process.env.FORMULAR_PORT || 5391);

const kopf = (titel) => `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${titel}</title>
<meta name="description" content="Testseite fuer den Formular-Pruefer."></head><body><h1>${titel}</h1>`;
const fuss = '</body></html>';
const FELD = 'style="font-size:16px;min-height:44px;width:20em"';

// Jede Seite aendert GENAU EINEN Umstand. Reisst eine an zwei Regeln, weiss man
// nicht, welche davon den Fehler wirklich sieht.
const FAELLE = [
  {
    name: 'sauber',
    erwartet: { blocker: 0, exit: 0 },
    was: 'korrekt gebautes Formular — darf NICHT anschlagen',
    html: `<form><label for="e">E-Mail</label>
<input id="e" type="email" name="email" autocomplete="email" ${FELD}>
<label for="t">Telefon</label>
<input id="t" type="tel" name="telefon" autocomplete="tel" ${FELD}>
<button type="submit" style="min-height:44px">Senden</button></form>`,
  },
  {
    name: 'label-for',
    erwartet: { blocker: 1, exit: 1 },
    was: 'E-Mail per <label for> beschriftet, type="text"',
    html: `<form><label for="e">E-Mail</label>
<input id="e" type="text" name="email" autocomplete="email" ${FELD}></form>`,
  },
  {
    name: 'aria-labelledby',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Beschriftung nur per aria-labelledby auf ein <span>',
    html: `<form><span id="lbl">E-Mail-Adresse</span>
<input aria-labelledby="lbl" type="text" name="f1" autocomplete="email" ${FELD}></form>`,
  },
  {
    name: 'kompositum',
    erwartet: { blocker: 1, exit: 1 },
    was: '"Telefonnummer" statt "Telefon" — deutsches Kompositum',
    html: `<form><label for="t">Telefonnummer</label>
<input id="t" type="text" name="feld_b" autocomplete="tel" ${FELD}></form>`,
  },
  {
    name: 'ohne-form-tag',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Feld liegt ausserhalb eines <form>',
    html: `<label for="e">E-Mail</label>
<input id="e" type="text" name="email" autocomplete="email" ${FELD}>`,
  },
  {
    name: 'nur-placeholder',
    erwartet: { blocker: 1, exit: 1 },
    was: 'kein Label, nur placeholder und ein kryptischer name',
    html: `<form><input type="text" name="f3" placeholder="ihre.mail@example.com" autocomplete="email" ${FELD}></form>`,
  },
  {
    name: 'fehlalarm-mobiliar',
    erwartet: { blocker: 0, exit: 0 },
    was: '"Mobiliar" ist kein Telefonfeld — darf NICHT anschlagen',
    html: `<form><label for="m">Vorhandenes Mobiliar</label>
<input id="m" type="text" name="mobiliar" ${FELD}></form>`,
  },
  {
    name: 'fehlalarm-freitext',
    erwartet: { blocker: 0, exit: 0 },
    was: 'Betreff/Nachricht/Detail — keins davon ist ein Kontaktfeld',
    html: `<form><label for="b">Betreff</label><input id="b" type="text" name="betreff" ${FELD}>
<label for="d">Detail zur Anfrage</label><input id="d" type="text" name="detail" ${FELD}>
<label for="n">Ihre Nachricht</label><textarea id="n" name="nachricht" ${FELD}></textarea></form>`,
  },
  {
    name: 'paste-gesperrt',
    erwartet: { blocker: 1, exit: 1 },
    was: 'onpaste verhindert das Einfuegen (F3)',
    html: `<form><label for="e">E-Mail</label>
<input id="e" type="email" name="email" autocomplete="email" onpaste="return false" ${FELD}></form>`,
  },

  // --- Ab hier: Befunde aus der Sol-Pruefung vom 29.07.2026. Auftrag war eine
  // einzige Richtung — "finde Wege, auf denen ein kaputtes Formular gruen
  // gemeldet wird". Alle vier waren echt und sind hier festgenagelt, damit sie
  // beim naechsten Umbau nicht zurueckkommen.
  {
    name: 'shadow-dom',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Sol: Formular in einem Shadow Root (Web-Component)',
    html: `<lead-form></lead-form>
<script>
class LeadForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<label for="se">E-Mail</label>' +
      '<input id="se" type="text" name="email" autocomplete="email" ${FELD}>';
  }
}
customElements.define('lead-form', LeadForm);
<\/script>`,
  },
  {
    name: 'paste-dynamisch',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Sol: paste-Blocker per addEventListener statt onpaste-Attribut',
    html: `<form><label for="e">E-Mail</label>
<input id="e" type="email" name="email" autocomplete="email" ${FELD}></form>
<script>document.getElementById('e').addEventListener('paste', (e) => e.preventDefault());<\/script>`,
  },
  {
    name: 'display-contents',
    erwartet: { blocker: 0, exit: 0 },
    was: 'Sol: <form style="display:contents"> muss trotzdem F7 durchlaufen',
    // Kein Blocker (F7 ist WARN) — geprueft wird, dass der Lauf das Formular
    // ueberhaupt SIEHT. Vorher fiel es aus der Sichtbarkeitspruefung heraus.
    html: `<form style="display:contents">
<label for="a">Welcher Raum?</label><input id="a" type="text" name="raum" ${FELD}>
<label for="e">E-Mail</label><input id="e" type="email" name="email" autocomplete="email" ${FELD}>
<button type="submit" style="min-height:44px">Senden</button></form>`,
  },
  {
    name: 'typografischer-strich',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Sol: "E‑Mail" mit Unicode-Bindestrich (U+2011) statt ASCII',
    html: `<form><label for="e">E‑Mail</label>
<input id="e" type="text" name="f9" autocomplete="email" ${FELD}></form>`,
  },
  {
    name: 'file-statt-email',
    erwartet: { blocker: 1, exit: 1 },
    was: 'Sol: type="file" auf einem E-Mail-Feld — war durch OHNE_TASTATUR verdeckt',
    html: `<form><label for="e">E-Mail</label>
<input id="e" type="file" name="email" ${FELD}></form>`,
  },
];

const wurzel = fs.mkdtempSync('/tmp/formular-eval-');
for (const f of FAELLE) {
  const d = path.join(wurzel, f.name);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, 'index.html'), kopf(f.name) + f.html + fuss);
}

const server = spawnSync('bash', ['-c',
  `cd ${wurzel} && (python3 -m http.server ${PORT} >/dev/null 2>&1 & echo $!) && sleep 2`], { encoding: 'utf8' });
const pid = (server.stdout || '').trim();
process.on('exit', () => { if (pid) spawnSync('kill', [pid]); });

// Beweis, dass DIESER Server antwortet und nicht ein fremder auf demselben Port.
const kennung = `probe-${process.pid}.txt`;
fs.writeFileSync(path.join(wurzel, kennung), 'formular');
const probe = spawnSync('curl', ['-fsS', '-m', '5', `http://localhost:${PORT}/${kennung}`], { encoding: 'utf8' });
if (probe.status !== 0 || (probe.stdout || '').trim() !== 'formular') {
  console.error(`Port ${PORT} antwortet nicht mit unserem Server (belegt?).`);
  console.error('Anderen Port setzen: FORMULAR_PORT=5392 node evals/run-formular-check.mjs');
  process.exit(2);
}

console.log(`Formular-Pruefer — ${FAELLE.length} Faelle auf Port ${PORT}\n`);

let rot = 0;
for (const f of FAELLE) {
  const r = spawnSync('node', [PRUEFER, '--url', `http://localhost:${PORT}/${f.name}/`, '--json'],
    { encoding: 'utf8', timeout: 90000 });
  let blocker = null;
  try {
    blocker = JSON.parse(r.stdout || '').blockers.length;
  } catch { /* unlesbar -> bleibt null, faellt unten auf */ }

  const ok = r.status === f.erwartet.exit && blocker === f.erwartet.blocker;
  console.log(`${ok ? 'OK  ' : 'ROT '} ${f.name.padEnd(20)} exit=${r.status} blocker=${blocker}  ${f.was}`);
  if (!ok) {
    rot++;
    if (blocker === null) console.log(`       Ausgabe unlesbar: ${(r.stderr || '').split('\n')[0]}`);
    else console.log(`       erwartet exit=${f.erwartet.exit} blocker=${f.erwartet.blocker}`);
    console.log(f.erwartet.blocker === 0
      ? '       Fehlalarm: der Pruefer meckert ein Feld an, das kein Kontaktfeld ist.'
      : '       Uebersehen: ein kaputtes Kontaktfeld kaeme durchs Tor.');
  }
}

console.log(`\n${FAELLE.length - rot}/${FAELLE.length} wie erwartet.`);
if (rot) {
  console.log('Die Erkennung stimmt nicht wie dokumentiert. Erst reparieren, dann ausliefern.');
  process.exit(1);
}
console.log('Der Pruefer findet jedes kaputte Kontaktfeld und laesst die anderen in Ruhe.');
