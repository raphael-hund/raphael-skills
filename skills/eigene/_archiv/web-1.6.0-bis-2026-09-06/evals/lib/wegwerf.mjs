// wegwerf.mjs — Temp-Ordner anlegen, die auch beim Abbruch verschwinden.
//
//   import { wegwerfOrdner } from './lib/wegwerf.mjs';
//   const ordner = wegwerfOrdner('meine-eval-');
//
// WARUM (Befund 31.07.2026)
// 24 Evals legen Fixture-Ordner per mkdtempSync an. Beim normalen Ende raeumen
// die meisten auf; bricht der Lauf ab (Strg-C, Timeout des Aufrufers, SIGKILL
// des Elternprozesses), bleibt der Ordner liegen. Gemessen an
// run-spuren-check: drei abgebrochene Laeufe, zwei Ordner geblieben.
//
// Einzeln bemerkt das niemand — ein Ordner mit ein paar KB. Ueber Wochen wird
// daraus dasselbe Bild wie bei den 2833 Chrome-Profilen: nicht der Platz ist
// das Problem, sondern die Anzahl. Jedes readdir ueber /tmp wird langsamer,
// und mehrere Wachen dieses Skills lesen genau dieses Verzeichnis.
//
// WAS DIESER HELFER ANDERS MACHT
// `process.on('exit')` allein genuegt NICHT: es feuert bei Signalen nicht.
// Deshalb zusaetzlich SIGTERM/SIGINT/SIGHUP. Gegen SIGKILL hilft nichts —
// dafuer gibt es die Altlast-Funktion unten.
//
// Aufraeumfehler werden geschluckt: ein Aufraeumen, das den Lauf abbricht,
// waere schlimmer als der belegte Platz.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const offen = new Set();
let verdrahtet = false;

function allesWeg() {
  for (const p of offen) {
    try { fs.rmSync(p, { recursive: true, force: true }); } catch { /* egal */ }
  }
  offen.clear();
}

function verdrahten() {
  if (verdrahtet) return;
  verdrahtet = true;
  process.on('exit', allesWeg);
  // `exit` feuert bei Signalen NICHT. Ohne diese Schleife bleibt bei jedem
  // Strg-C ein Ordner liegen.
  for (const sig of ['SIGTERM', 'SIGINT', 'SIGHUP']) {
    process.on(sig, () => {
      allesWeg();
      // Nicht 0: der Lauf wurde abgebrochen, nicht bestanden. In diesem Skill
      // heisst 2 "es wurde nichts geprueft" — genau das ist hier der Fall.
      process.exit(2);
    });
  }
}

/**
 * Legt einen Temp-Ordner an, der beim Prozessende und bei den ueblichen
 * Abbruch-Signalen automatisch verschwindet.
 */
export function wegwerfOrdner(praefix) {
  verdrahten();
  const p = fs.mkdtempSync(path.join(os.tmpdir(), praefix));
  offen.add(p);
  return p;
}

/** Vorzeitig aufraeumen (der Ordner wird dann nicht doppelt geloescht). */
export function wegwerfen(p) {
  offen.delete(p);
  try { fs.rmSync(p, { recursive: true, force: true }); } catch { /* egal */ }
}

/**
 * Altlasten desselben Praefixes entfernen, die aelter sind als `stundenAlt`.
 *
 * Gegen SIGKILL hilft kein Handler — dort bleibt nur, beim naechsten Lauf
 * aufzuraeumen. Bewusst nach ALTER und nicht "alles ausser meinem": wer zwei
 * Evals parallel faehrt, wuerde der anderen sonst den Ordner unter den Fuessen
 * wegziehen. Nur eigene Ordner, damit auf einem geteilten Rechner keine
 * fremden Laeufe getroffen werden.
 */
export function altlastWeg(praefix, stundenAlt = 6) {
  const grenze = Date.now() - stundenAlt * 60 * 60 * 1000;
  let weg = 0;
  try {
    for (const name of fs.readdirSync(os.tmpdir())) {
      if (!name.startsWith(praefix)) continue;
      const p = path.join(os.tmpdir(), name);
      if (offen.has(p)) continue;
      try {
        const s = fs.statSync(p);
        if (s.uid !== process.getuid()) continue;
        if (s.mtimeMs > grenze) continue;
        fs.rmSync(p, { recursive: true, force: true });
        weg += 1;
      } catch { /* verschwunden oder fremd — dann nicht unser Problem */ }
    }
  } catch { /* tmpdir unlesbar — dann eben nicht aufraeumen */ }
  return weg;
}
