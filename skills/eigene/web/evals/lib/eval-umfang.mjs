// eval-umfang.mjs — geteilter Kern der Umfang-Wache.
//
// Zweimal dieselbe Datei zu haben waere genau der Fehler, den dieser Skill an
// anderer Stelle bekaempft (zwei Motion-Doktrinen, zwei Kopien der Detektor-
// Regeln). Der web- und der design-Skill unterscheiden sich nur in drei Werten:
// welcher Ordner, welche Stand-Datei, welche Evals ausgenommen sind.
//
// Warum es die Wache gibt, steht im aufrufenden Skript.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Die Schlusszeile der meisten Evals hat die Form "N/M wie erwartet." — daraus
// kommt die Zahl. Wer eine Eval ohne erkennbare Fallzahl baut, faellt hier auf.
export function fallzahl(evalOrdner, datei, cwd) {
  let aus = '';
  try {
    aus = execFileSync('node', [path.join(evalOrdner, datei)],
      { encoding: 'utf8', timeout: 900000, cwd });
  } catch (e) {
    aus = `${e.stdout || ''}${e.stderr || ''}`;
    if (!aus) return { fehlerText: `Lauf abgebrochen: ${String(e.message).split('\n')[0]}` };
  }
  // Eine Eval, die selbst sagt "dieser Abschnitt misst nichts", hat ihre Faelle
  // nicht alle ausgefuehrt — ihre Fallzahl ist dann zu KLEIN, ohne dass etwas
  // geloescht wurde. Das muss vor dem Zahlenvergleich raus, sonst meldet die
  // Wache "geschrumpft" und klingt dabei praeziser als ihre Grundlage.
  // Am 30.07.2026 genau so passiert: bilder-check konnte unter Fork-Mangel kein
  // Testbild erzeugen, meldete "9/10", die Wache daraus "nur noch 10 Faelle,
  // erwartet mindestens 12". Eine Zahl sieht gemessen aus. Diese war geraten.
  const blind = aus.match(/^\s*\[!!\][^\n]*\n\s*(?:[^\n]*misst[^\n]*nichts[^\n]*)/m)
    || aus.match(/^[^\n]*misst (?:dieser Abschnitt|hier) nichts/m);

  const m = [...aus.matchAll(/^(\d+)\/(\d+)(?: Faelle)? wie erwartet\./gm)].pop();
  if (m && blind) {
    return {
      zahl: null,
      form: `UNVOLLSTAENDIG (${m[2]} Faelle liefen, ein Abschnitt misst nichts)`,
      werkzeugFehlt: true,
    };
  }
  if (m) return { zahl: Number(m[2]), gruen: Number(m[1]), form: 'N/M' };

  // Andere Ausgabeformen. Erster Versuch im web-Skill meldete run-lib-lookup.mjs
  // als "keine Fallzahl gefunden" — formal richtig, praktisch ein Fehlalarm: die
  // Eval protokolliert mit "OK  <was>" statt einer Schlusszahl. Eine Vermutung
  // ueber die FORM statt einer Messung des Inhalts.
  const libs = aus.match(/^(\d+) Libraries, jede/m);
  if (libs) return { zahl: Number(libs[1]), form: 'Libraries' };
  if (/Alle Verweise loesen auf/.test(aus)) return { zahl: null, form: 'ohne Fallzahl' };
  const okZeilen = (aus.match(/^OK\s{2,}/gm) || []).length;
  if (okZeilen > 0) return { zahl: okZeilen, form: 'OK-Zeilen' };

  // "Werkzeug fehlt" ist etwas anderes als "Eval geschrumpft" — dieselbe
  // Unterscheidung, die das G1-Tor zwischen Exit 1 und Exit 2 macht. Eine Eval,
  // die ihren Browser nicht starten konnte, hat NICHTS ueber ihren Umfang
  // gesagt; sie als "geschrumpft" zu melden schickt den Leser in die falsche
  // Richtung. Am 30.07.2026 genau so passiert: craft-check konnte waehrend
  // paralleler Browser-Laeufe kein Chrome bekommen, und die Wache meldete
  // "keine Fallzahl gefunden" — als waere die Eval kaputt.
  if (/laeuft nicht|Chrome\/Playwright vorhanden|browser\.newPage|ETIMEDOUT|SIGKILL/i.test(aus)) {
    return { zahl: null, form: 'UEBERSPRUNGEN (Werkzeug/Browser nicht verfuegbar)', werkzeugFehlt: true };
  }
  return { fehlerText: 'keine Fallzahl in der Ausgabe gefunden' };
}

export function umfangPruefen({ evalOrdner, standDatei, ausgenommen, cwd, aktualisieren }) {
  const evals = fs.readdirSync(evalOrdner)
    .filter((f) => f.startsWith('run-') && f.endsWith('.mjs'))
    .filter((f) => !ausgenommen[f])
    .sort();

  let fehler = 0;
  const zeile = (ok, text, detail) => {
    if (!ok) fehler++;
    console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
    if (detail) console.log(`         ${detail}`);
  };

  const alt = fs.existsSync(standDatei) ? JSON.parse(fs.readFileSync(standDatei, 'utf8')) : {};
  const neu = {};
  const uebersprungen = [];

  console.log('\nEval-Umfang — hat jede Eval noch ihre Faelle?\n');
  console.log(`${evals.length} Evals, ${Object.keys(ausgenommen).length} ausgenommen (Gruende im Aufrufer).\n`);

  for (const datei of evals) {
    const r = fallzahl(evalOrdner, datei, cwd);
    if (r.fehlerText) { zeile(false, `${datei}: ${r.fehlerText}`); continue; }
    if (r.zahl === null) {
      // Uebersprungen ist nicht bestanden — aber auch kein Umfang-Fehler. Es
      // wird gezaehlt und am Ende genannt, damit "24/24" nicht so aussieht, als
      // waere ueberall gemessen worden.
      if (r.werkzeugFehlt) uebersprungen.push(datei);
      zeile(true, `${datei}: ${r.form}`);
      continue;
    }
    neu[datei] = r.zahl;
    const erwartet = alt[datei];
    if (erwartet === undefined) {
      zeile(true, `${datei}: ${r.zahl} Faelle (neu aufgenommen)`);
    } else if (r.zahl < erwartet) {
      zeile(false, `${datei}: nur noch ${r.zahl} Faelle, erwartet mindestens ${erwartet}`,
        'entweder ein Fall wurde geloescht (dann Zahl mit --aktualisieren anpassen) '
        + 'oder eine Liste ist still leergelaufen');
    } else if (r.zahl > erwartet) {
      zeile(true, `${datei}: ${r.zahl} Faelle (${r.zahl - erwartet} mehr als zuletzt)`);
    } else {
      zeile(true, `${datei}: ${r.zahl} Faelle`);
    }
  }

  if (aktualisieren || !fs.existsSync(standDatei)) {
    fs.writeFileSync(standDatei, `${JSON.stringify(neu, null, 2)}\n`);
    console.log(`\n${aktualisieren ? 'Stand geschrieben' : 'Erster Lauf — Stand angelegt'}: ${standDatei}`);
  }

  if (uebersprungen.length) {
    console.log(`\n  ${uebersprungen.length} Eval(s) uebersprungen (Werkzeug/Browser fehlte): ${uebersprungen.join(', ')}`);
    console.log('  Ihr Umfang ist damit UNGEPRUEFT, nicht bestaetigt — einzeln nachfahren.');
  }

  console.log(`\n${evals.length - fehler - uebersprungen.length}/${evals.length - uebersprungen.length} gepruefte Evals mit vollem Umfang.`);
  if (fehler) {
    console.log('Eine Eval ist geschrumpft oder meldet keine Fallzahl mehr.');
    return 1;
  }
  console.log('Keine Eval hat still ihre Faelle verloren.');
  return 0;
}
