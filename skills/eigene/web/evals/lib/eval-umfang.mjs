// eval-umfang.mjs — geteilter Kern der Umfang-Wache.
//
// Zweimal dieselbe Datei zu haben waere genau der Fehler, den dieser Skill an
// anderer Stelle bekaempft (zwei Motion-Doktrinen, zwei Kopien der Detektor-
// Regeln). Der web- und der design-Skill unterscheiden sich nur in drei Werten:
// welcher Ordner, welche Stand-Datei, welche Evals ausgenommen sind.
//
// Warum es die Wache gibt, steht im aufrufenden Skript.

import fs from 'node:fs';
import os from 'node:os';
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
  // "gepruefte Doku-Zahlen" (web) und "Zahlen" (design) — zwei Wachen desselben
  // Zwecks mit leicht verschiedenem Satzbau. Beide meinen dasselbe.
  // Der Punkt am Ende ist nicht garantiert: seit dem 30.07.2026 haengt
  // run-doku-zahlen "(1 ohne Sollstand)" an. Mein eigener Zusatz hat das
  // Muster gebrochen und die Eval als geschrumpft gemeldet.
  const zahlen = aus.match(/^(\d+)\/(\d+) (?:gepruefte Doku-)?Zahlen stimmen/m);
  if (zahlen) return { zahl: Number(zahlen[2]), gruen: Number(zahlen[1]), form: 'Doku-Zahlen' };

  // Fuenfte Form: "23/24 Skills wie erwartet." — dieselbe N/M-Struktur, aber
  // die Einheit ist ein Skill, kein Fall. Das Grundmuster oben verlangt genau
  // "wie erwartet." am Zeilenende und trifft es deshalb nicht.
  const skills = aus.match(/^(\d+)\/(\d+) Skills wie erwartet\./m);
  if (skills) return { zahl: Number(skills[2]), gruen: Number(skills[1]), form: 'Skills' };

  // Sechste Form: "55/55 Skripte wie erwartet." — wieder N/M, wieder eine
  // andere Einheit. Beim vierten Mal ist klar: das Grundmuster sollte die
  // Einheit offen lassen, statt jedes neue Wort einzeln zu lernen.
  const einheit = aus.match(/^(\d+)\/(\d+) [A-Za-zÄÖÜäöü-]+ wie erwartet\./m);
  if (einheit) return { zahl: Number(einheit[2]), gruen: Number(einheit[1]), form: 'N/M mit Einheit' };

  const libs = aus.match(/^(\d+) Libraries, jede/m);
  if (libs) return { zahl: Number(libs[1]), form: 'Libraries' };
  if (/Alle Verweise loesen auf/.test(aus)) return { zahl: null, form: 'ohne Fallzahl' };
  // Einrueckung und beide Markierungs-Konventionen zulassen.
  //
  // `^OK` verlangte Spalte 0. Gemessen am 31.07.2026: run-lib-lookup druckt
  // "OK   <was>" ohne Einrueckung, der Pfad liefert 13 Faelle — richtig. Ruecke
  // ich die Ausgabe kosmetisch um zwei Leerzeichen ein, liefert er 0, und die
  // Wache meldet "keine Fallzahl gefunden" fuer eine intakte Eval.
  //
  // Der Bestand kennt zwei Konventionen nebeneinander: 18x "!!" fuer den
  // Fehlerfall, 11x "ROT". Wer eine Eval von der einen auf die andere
  // umstellt, darf die Wache nicht blenden. Beide zaehlen jetzt mit, und die
  // Klammerform `  [OK]` ebenfalls — sonst haengt die Erkennung an einem
  // Detail, das jede Formatierung kippt.
  const okZeilen = (aus.match(/^\s*(?:\[(?:OK|!!|ROT)\]|OK|ROT)\s{2,}/gm) || []).length;
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

// Laeuft gerade eine Sabotage? Dann sind Pruefer-Dateien absichtlich beschaedigt.
//
// Die Sabotage-Evals sperren sich gegen EINANDER (sonst schreiben sie sich
// gegenseitig kaputte Pruefer als "Original" zurueck). Kein anderer Lauf kannte
// diese Sperre — und die Umfang-Wache faehrt 25 Evals nacheinander.
//
// Gemessen am 30.07.2026: mit `add('WARN', 'M3')` statt BLOCK im craft-Pruefer
// meldet run-craft-check 21/22 statt 22/22. Die Umfang-Wache liest daraus
// "geschrumpft" — ein Befund, der wie ein echter Qualitaetsfehler aussieht,
// obwohl die Eval tadellos ist. Nicht als Absturz erkennbar, nicht als
// Umgebungsproblem: als Fehler an der falschen Stelle.
//
// Exit 2 statt Exit 1, denn das ist kein Urteil ueber die Evals — es ist gar
// keins. Dieselbe Trennung wie ueberall im Skill.
function sabotageLaeuft(tmpdir) {
  for (const name of ['run-sabotage.lock', 'run-sabotage-design.lock']) {
    const p = path.join(tmpdir, name);
    if (!fs.existsSync(p)) continue;
    let pid;
    try { pid = Number(fs.readFileSync(p, 'utf8').trim()); } catch { continue; }
    if (!pid) continue;
    // Eine Leiche ist keine laufende Sabotage. Die Sabotage-Eval selbst
    // uebernimmt verwaiste Sperren; hier nur nachsehen, ob der Prozess lebt.
    try { process.kill(pid, 0); return { name, pid }; } catch { /* tot */ }
  }
  return null;
}

export function umfangPruefen({ evalOrdner, standDatei, ausgenommen, cwd, aktualisieren }) {
  const sab = sabotageLaeuft(os.tmpdir());
  if (sab) {
    console.error(`\nEin Sabotage-Lauf ist aktiv (${sab.name}, PID ${sab.pid}).`);
    console.error('Waehrend dessen sind Pruefer-Dateien absichtlich beschaedigt —');
    console.error('jede Fallzahl aus diesem Lauf waere ein Urteil ueber einen kaputten Pruefer.');
    console.error('Erst den Sabotage-Lauf abwarten, dann erneut.');
    return 2;
  }
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
  // "Keine Eval hat still ihre Faelle verloren" setzt voraus, dass es einen
  // Vergleichswert GAB. Neu aufgenommene Evals hatten keinen — ueber sie sagt
  // der Lauf nichts.
  //
  // Gemessen am 30.07.2026: Sollstand geloescht -> 27 von 28 Evals melden
  // "(neu aufgenommen)", der Lauf endet mit 28/28, Exit 0 und genau diesem
  // Satz. Wer die Datei loescht (sie sieht aus wie eine Zwischenablage),
  // schreibt damit jede Schrumpfung fest: eine Eval, die von 22 auf 12 Faelle
  // gefallen ist, gilt danach mit 12 als Soll.
  //
  // Die 27 Warnzeilen stehen zwar da — aber die Schlusszeile ist die, die man
  // sich merkt. Dieselbe Asymmetrie wie bei "2/2 gepruefte Evals", wo drei von
  // fuenf ausgenommen waren: der Hinweis stand im Kopf, gemerkt hat man das
  // Ende.
  const neuAufgenommen = evals.filter((d) => alt[d] === undefined && neu[d] !== undefined).length;
  if (neuAufgenommen) {
    console.log(`${neuAufgenommen} von ${evals.length} Evals hatten KEINEN Sollwert — ueber sie sagt`);
    console.log('dieser Lauf nichts. Erst der naechste kann eine Schrumpfung sehen.');
    if (neuAufgenommen > evals.length / 2) {
      console.log('Mehr als die Haelfte neu: fehlte die Stand-Datei? Dann ist jede bisherige');
      console.log('Schrumpfung soeben als Sollwert festgeschrieben worden.');
    }
  }
  // Nur die, die WIRKLICH gemessen wurden: `evals.length` zaehlt auch
  // uebersprungene mit. Am 31.07.2026 stand deshalb "28/28 geprueft" ueber
  // "Keine der 29 bekannten Evals" — zwei richtige Zahlen, die sich zu
  // widersprechen scheinen, weil eine Eval (run-ordner-check, Browser fehlte)
  // in der einen mitzaehlt und in der anderen nicht.
  const verglichen = evals.filter((d) => alt[d] !== undefined && neu[d] !== undefined).length;
  console.log(`Keine der ${verglichen} verglichenen Evals hat still ihre Faelle verloren.`);
  return 0;
}
