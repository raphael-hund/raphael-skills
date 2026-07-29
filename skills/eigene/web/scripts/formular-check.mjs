#!/usr/bin/env node
// formular-check.mjs — prueft die Formularfelder, an denen eine Landingpage
// ihre Leads verliert. Laeuft gegen die gerenderte Seite, nicht gegen Quellcode.
//
//   node formular-check.mjs --url http://localhost:5280/ [--json] [--strict]
//
// Exit 0 = keine Blocker. Exit 1 = mindestens ein Blocker. Exit 2 = Lauf kaputt.
//
// WARUM ES DIESES SKRIPT GIBT — die Luecke ist gemessen, nicht vermutet.
// Testfall 29.07.2026: eine Seite mit <input type="text" name="e"> fuer die
// E-Mail-Adresse, ohne autocomplete, ohne inputmode. axe meldete 0 Violations
// (31 Passes), craft-check meldete keinen einzigen Formular-Befund. Beide haben
// recht: axe prueft Zugaenglichkeit, craft-check prueft Handwerk am Aussehen.
// Ob das Feld auf dem Handy die richtige Tastatur oeffnet und ob der
// Passwortmanager es ausfuellt, fragt keiner von beiden.
//
// Auf einer Landingpage ist das Formular die EINZIGE Conversion. Ein
// E-Mail-Feld mit Buchstabentastatur kostet mehr Leads als jeder Kontrastfehler.
//
// ABGRENZUNG: Zugaenglichkeit (Label vorhanden, Kontrast, Fokus) gehoert axe und
// craft-check. Hier stehen nur die Regeln, die BEIDE nicht haben. Wo sich das
// ueberschneiden wuerde, steht hier bewusst nichts — zwei Prueferstimmen zum
// selben Befund machen ihn nicht wahrer, nur lauter.
//
// Regelherkunft: Vercel Web Interface Guidelines (Abschnitte Forms, Touch &
// Interaction, Anti-patterns) — github.com/vercel-labs/web-interface-guidelines,
// dazu die Formular-Reihenfolge aus references/landingpage-struktur.md.
// Der Vercel-Skill dazu holt seine Regeln live per WebFetch; hier sind genau die
// maschinell pruefbaren davon fest verdrahtet, damit das Tor ohne Netz urteilt.

import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';

const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const URL_ = get('url', null);
const AS_JSON = args.includes('--json');
const STRICT = args.includes('--strict');

if (!URL_) { console.error('usage: formular-check.mjs --url <url> [--json] [--strict]'); process.exit(2); }

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
let findings;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto(URL_, { waitUntil: 'networkidle', timeout: 45000 });
  if (!res || !res.ok()) {
    console.error(`Navigation fehlgeschlagen: ${URL_} -> ${res ? res.status() : 'kein Response'}`);
    process.exit(2);
  }
  await page.waitForTimeout(700);

  findings = await page.evaluate(() => {
    const out = [];
    const add = (level, id, marker, msg, sample) => out.push({ level, id, marker, msg, sample: sample || null });
    const sel = (el) => {
      const id = el.id ? `#${el.id}` : '';
      const nm = el.getAttribute('name') ? `[name="${el.getAttribute('name')}"]` : '';
      return `${el.tagName.toLowerCase()}${id}${nm}`;
    };
    const sichtbar = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
    };

    // Nur echte Eingabefelder. Knoepfe, Hidden-Felder und Checkboxen haben
    // andere Regeln und wuerden hier nur Rauschen erzeugen.
    const OHNE_TASTATUR = new Set(['hidden', 'submit', 'button', 'reset', 'image',
      'checkbox', 'radio', 'file', 'range', 'color']);
    const felder = [...document.querySelectorAll('input, textarea, select')]
      .filter((el) => !OHNE_TASTATUR.has((el.getAttribute('type') || 'text').toLowerCase()))
      .filter(sichtbar);

    // Gibt es ueberhaupt ein Formular? Kein Befund, nur eine ehrliche Ansage —
    // eine Seite ohne Formular ist nicht kaputt, sie ist nur nicht gemeint.
    if (felder.length === 0) {
      add('INFO', 'F0', 'Kein Formular', 'keine sichtbaren Eingabefelder auf dieser Seite');
      return out;
    }

    // ---- F1: richtiger input-type. Das ist die teuerste Zeile im Formular:
    // type="text" fuer eine E-Mail oeffnet auf dem Handy die Buchstabentastatur
    // ohne @ und ohne Punkt. Der Besucher tippt dreimal, bevor die Adresse steht.
    //
    // Erkannt wird ueber name/id/autocomplete/Label — also darueber, wofuer das
    // Feld gedacht ist, nicht darueber, was hineingetippt wird.
    const beschriftung = (el) => {
      const teile = [el.getAttribute('name') || '', el.id || '',
        el.getAttribute('placeholder') || '', el.getAttribute('autocomplete') || '',
        el.getAttribute('aria-label') || ''];
      const lab = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null;
      if (lab) teile.push(lab.textContent || '');
      const umschliessend = el.closest('label');
      if (umschliessend) teile.push(umschliessend.textContent || '');
      return teile.join(' ').toLowerCase();
    };

    const ERWARTET = [
      { was: 'E-Mail', typ: 'email', muster: /\b(e-?mail|mail)\b/ },
      { was: 'Telefon', typ: 'tel', muster: /\b(tel|telefon|phone|handy|mobil|rufnummer)\b/ },
      { was: 'Website/URL', typ: 'url', muster: /\b(url|website|webseite|homepage|domain)\b/ },
    ];

    for (const el of felder) {
      if (el.tagName !== 'INPUT') continue;
      const typ = (el.getAttribute('type') || 'text').toLowerCase();
      const txt = beschriftung(el);
      for (const e of ERWARTET) {
        if (!e.muster.test(txt)) continue;
        if (typ !== e.typ) {
          add('BLOCK', 'F1', 'Falscher input-type',
            `${e.was}-Feld hat type="${typ}" statt type="${e.typ}" — auf dem Handy oeffnet die falsche Tastatur`,
            sel(el));
        }
        break;
      }
    }

    // ---- F2: autocomplete. Ohne das Attribut bietet kein Browser und kein
    // Passwortmanager das Ausfuellen an — der Besucher tippt alles von Hand.
    // Gepueft wird nur bei Feldern, die erkennbar Kontaktdaten wollen; ein
    // Suchfeld oder eine Freitextfrage braucht das ausdruecklich NICHT.
    const KONTAKT = /\b(e-?mail|mail|tel|telefon|phone|handy|mobil|name|vorname|nachname|firma|company|stra(ss|ß)e|plz|ort|adresse)\b/;
    for (const el of felder) {
      const txt = beschriftung(el);
      if (!KONTAKT.test(txt)) continue;
      const ac = (el.getAttribute('autocomplete') || '').trim().toLowerCase();
      // "off" ist eine bewusste Entscheidung (z. B. gegen Passwortmanager-
      // Popups in Nicht-Login-Formularen) und darum kein Befund.
      if (!ac) {
        add('WARN', 'F2', 'autocomplete fehlt',
          'Kontaktdaten-Feld ohne autocomplete — Browser und Passwortmanager koennen nicht ausfuellen',
          sel(el));
      }
    }

    // ---- F3: Paste-Blockade. Wer das Einfuegen verbietet, verliert jeden
    // Besucher, der seine Adresse aus dem Passwortmanager holt. Erkennbar ist
    // nur der Inline-Handler; ein per addEventListener gesetzter bleibt
    // unsichtbar — deshalb steht hier WARN und keine Bestanden-Behauptung.
    for (const el of felder) {
      const h = el.getAttribute('onpaste') || '';
      if (/preventdefault|return\s+false/i.test(h)) {
        add('BLOCK', 'F3', 'Einfuegen blockiert',
          'onpaste verhindert das Einfuegen — Passwortmanager und Copy-Paste sind tot', sel(el));
      }
    }

    // ---- F4: Touch-Zielgroesse der Felder auf dem Handy misst M13 nicht, und
    // die Desktop-Hit-Area (M16 in craft-check) gilt nur fuer Klickflaechen.
    // Ein 28px hohes Eingabefeld ist auf dem Telefon nicht treffsicher.
    // Gepueft wird hier NUR die Hoehe — die Breite ist bei Feldern eine
    // Layout-Frage, keine Treffsicherheitsfrage.
    for (const el of felder) {
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 36) {
        add('WARN', 'F4', 'Feld zu flach',
          `Eingabefeld nur ${Math.round(r.height)}px hoch (Ziel >= 40px, absolute Untergrenze 36px)`, sel(el));
      }
    }

    // ---- F5: Font-Size unter 16px in einem Feld laesst iOS Safari beim Fokus
    // in die Seite hineinzoomen. Der Besucher landet in einer verschobenen
    // Ansicht und muss zurueckwischen. Das ist keine Geschmacksfrage, das ist
    // dokumentiertes Browserverhalten.
    for (const el of felder) {
      const fs_ = parseFloat(getComputedStyle(el).fontSize) || 0;
      if (fs_ > 0 && fs_ < 16) {
        add('WARN', 'F5', 'iOS-Zoom beim Fokus',
          `Feld mit ${fs_}px Schrift — iOS Safari zoomt beim Antippen in die Seite (>= 16px verhindert das)`,
          sel(el));
      }
    }

    // ---- F6: Reihenfolge. Harte Regel aus references/landingpage-struktur.md
    // und aus web/SKILL.md completion_criteria: Kontaktdaten kommen ZULETZT.
    // Erst qualifizieren, dann nach der E-Mail fragen — wer oben nach der
    // Adresse fragt, verliert die Leute, die noch nicht ueberzeugt sind.
    //
    // Gepueft wird pro <form>, in DOM-Reihenfolge. Ein Formular mit nur einem
    // Feld hat keine Reihenfolge und wird uebersprungen.
    const IST_KONTAKT = /\b(e-?mail|mail|tel|telefon|phone|handy|mobil|rufnummer)\b/;
    for (const form of [...document.querySelectorAll('form')].filter(sichtbar)) {
      const eigene = felder.filter((el) => form.contains(el));
      if (eigene.length < 2) continue;
      const kontaktIdx = eigene.map((el, i) => (IST_KONTAKT.test(beschriftung(el)) ? i : -1))
        .filter((i) => i >= 0);
      if (!kontaktIdx.length) continue;
      const letzterAndere = eigene.map((el, i) => (IST_KONTAKT.test(beschriftung(el)) ? -1 : i))
        .filter((i) => i >= 0).pop();
      if (letzterAndere !== undefined && Math.min(...kontaktIdx) < letzterAndere) {
        add('WARN', 'F6', 'Kontaktdaten zu frueh',
          `Kontaktfeld an Position ${Math.min(...kontaktIdx) + 1} von ${eigene.length}, danach kommen noch Sachfragen`
          + ' — Kontaktdaten gehoeren ans Ende (landingpage-struktur.md)',
          sel(eigene[Math.min(...kontaktIdx)]));
      }
    }

    // ---- F7: Absende-Knopf. Ein von Anfang an deaktivierter Knopf sieht aus
    // wie ein kaputtes Formular; die Regel ist "aktiv bis der Request laeuft".
    for (const form of [...document.querySelectorAll('form')].filter(sichtbar)) {
      const knopf = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
      if (!knopf) {
        add('WARN', 'F7', 'Kein Absende-Knopf',
          'Formular ohne submit-Knopf — Enter-Absenden allein ist auf dem Handy unerreichbar', sel(form));
        continue;
      }
      if (knopf.disabled) {
        add('WARN', 'F7', 'Absende-Knopf deaktiviert',
          'submit-Knopf ist beim Laden deaktiviert — soll bis zum Absenden aktiv bleiben', sel(knopf));
      }
    }

    add('INFO', 'F8', 'Umfang',
      `${felder.length} Eingabefeld(er) in ${document.querySelectorAll('form').length} Formular(en) geprueft`);

    return out;
  });
} catch (e) {
  console.error(`formular-check kaputt: ${e.message}`);
  process.exit(2);
} finally {
  await browser.close();
}

const blockers = findings.filter((f) => f.level === 'BLOCK');
const warns = findings.filter((f) => f.level === 'WARN');
const infos = findings.filter((f) => f.level === 'INFO');

if (AS_JSON) {
  console.log(JSON.stringify({ url: URL_, blockers, warns, infos }, null, 2));
} else {
  console.log(`formular-check — ${URL_}\n`);
  for (const f of [...blockers, ...warns, ...infos]) {
    console.log(`[${f.level}] ${f.id} ${f.marker}: ${f.msg}`);
    if (f.sample) console.log(`        ${f.sample}`);
  }
  console.log(`\n${blockers.length} Blocker, ${warns.length} Warnungen, ${infos.length} Hinweise`);
}

process.exit(blockers.length > 0 || (STRICT && warns.length > 0) ? 1 : 0);
