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
    // Exit 2 heisst im ganzen Skill "Werkzeug/Umgebung kaputt, NICHT geprueft" —
    // dieselbe Trennung, die das G1-Tor zwischen Exit 1 und Exit 2 macht. Die
    // Wache las bisher nur den Text und musste jeden neuen Abbruchgrund einzeln
    // als Muster nachtragen. Am 30.07.2026 fiel formular-check durch, weil Port
    // 5391 belegt war: Exit 2, klare eigene Meldung — und die Wache nannte es
    // "keine Fallzahl gefunden", also einen Eval-Defekt. Der Exit-Code sagt es
    // bereits; ihn zu ignorieren und stattdessen Formulierungen zu raten, ist
    // die schwaechere Quelle.
    if (e.status === 2) {
      const grund = (aus.match(/^[^\n]*(?:belegt|antwortet nicht|nicht gefunden|nicht installiert|nicht moeglich)[^\n]*$/mi) || [])[0];
      return {
        zahl: null,
        form: `UEBERSPRUNGEN (Exit 2 — ${grund ? grund.trim() : 'Umgebung nicht bereit'})`,
        werkzeugFehlt: true,
      };
    }
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
  // Vierte Form, gefunden am 30.07.2026: run-doku-zahlen schliesst mit
  // "17/17 gepruefte Doku-Zahlen stimmen." — dieselbe N/M-Struktur, aber ein
  // anderes Verb. Der Wachhund meldete sie deshalb als "keine Fallzahl", also
  // als geschrumpfte Eval. Sie war vollzaehlig; nur ihr Satzbau war neu.
  const zahlen = aus.match(/^(\d+)\/(\d+) gepruefte Doku-Zahlen stimmen\./m);
  if (zahlen) return { zahl: Number(zahlen[2]), gruen: Number(zahlen[1]), form: 'Doku-Zahlen' };

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
    // Eine Eval, die gerade UEBERSPRUNGEN oder blind war, steht nicht in `neu` —
    // ihr alter Sollstand wuerde beim Schreiben verschwinden. Danach meldet jede
    // spaetere Zahl "neu aufgenommen", auch eine geschrumpfte: die Wache haette
    // ihr Gedaechtnis genau fuer die Eval verloren, bei der sie nichts sah.
    // Gemessen am 30.07.2026 an einem Testordner: Sollstand 12 einer blinden
    // Eval war nach einem Lauf mit --aktualisieren spurlos weg.
    // Nicht gemessene Werte bleiben deshalb stehen; nur echte Messungen
    // ueberschreiben. Eintraege geloeschter Evals fallen weiter raus.
    const behalten = {};
    for (const datei of evals) {
      if (datei in neu) behalten[datei] = neu[datei];
      else if (alt[datei] !== undefined) behalten[datei] = alt[datei];
    }
    fs.writeFileSync(standDatei, `${JSON.stringify(behalten, null, 2)}\n`);
    console.log(`\n${aktualisieren ? 'Stand geschrieben' : 'Erster Lauf — Stand angelegt'}: ${standDatei}`);
  }

  if (uebersprungen.length) {
    console.log(`\n  ${uebersprungen.length} Eval(s) uebersprungen (Werkzeug/Browser fehlte): ${uebersprungen.join(', ')}`);
    console.log('  Ihr Umfang ist damit UNGEPRUEFT, nicht bestaetigt — einzeln nachfahren.');
  }

  // Die Schlusszeile ist die Zeile, die man sich merkt — sie muss allein
  // stimmen. Im design-Skill las sie "2/2 gepruefte Evals mit vollem Umfang":
  // klingt vollstaendig, waehrend 3 von 5 Evals nie angefasst wurden (darunter
  // die groesste mit 39 Faellen). Die Zahl der Ausnahmen steht zwar im Kopf,
  // aber wer nur das Ende liest, haelt eine Teilpruefung fuer eine ganze.
  const ausZahl = Object.keys(ausgenommen).length;
  const anhang = ausZahl ? ` (${ausZahl} ausgenommen — einzeln fahren)` : '';
  console.log(`\n${evals.length - fehler - uebersprungen.length}/${evals.length - uebersprungen.length} gepruefte Evals mit vollem Umfang${anhang}.`);
  if (fehler) {
    console.log('Eine Eval ist geschrumpft oder meldet keine Fallzahl mehr.');
    return 1;
  }
  console.log('Keine Eval hat still ihre Faelle verloren.');
  return 0;
}
