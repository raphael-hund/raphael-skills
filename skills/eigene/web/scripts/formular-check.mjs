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

// Ein unbekanntes Flag ist ein Aufruffehler und muss SO heissen. Bis zum
// 31.07.2026 druckte dieses Skript darauf nur seine Aufrufzeile — die Meldung
// las sich wie "Argument fehlt", und wer sich vertippt hat, sucht am falschen
// Ende. Exit 2 war schon richtig, der Text nicht.
const FLAG_ERLAUBT = ['url', 'json', 'strict', 'help'];
{
  const fremd = args.filter((a) => a.startsWith('--') && !FLAG_ERLAUBT.includes(a.slice(2)));
  if (fremd.length) {
    console.error(`Unbekanntes Flag: ${fremd.join(', ')}`);
    console.error(`Erlaubt: ${FLAG_ERLAUBT.map((k) => `--${k}`).join(' ')}`);
    process.exit(2);
  }
}
const get = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const URL_ = get('url', null);
const AS_JSON = args.includes('--json');
const STRICT = args.includes('--strict');

// `--help` lief bis zum 31.07.2026 in denselben Zweig wie ein VERGESSENES
// --url: richtige Zeile, aber auf stderr und mit Exit 2. Exit 2 heisst in
// diesem Skill 'Werkzeug kaputt' — wer Hilfe anfordert, hat nichts falsch
// gemacht und soll Exit 0 auf stdout bekommen.
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('usage: formular-check.mjs --url <url> [--json] [--strict]');
  console.log('Prueft Formulare einer laufenden Seite auf Bedienbarkeit.');
  console.log('Exit 0 = sauber, 1 = Befund, 2 = Werkzeug/Umgebung kaputt.');
  process.exit(0);
}
if (!URL_) { console.error('usage: formular-check.mjs --url <url> [--json] [--strict]'); process.exit(2); }

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
let abbruch = false;
// Vor dem try deklariert: die Ausgabe steht NACH dem finally, und eine
// Konstante aus dem try-Block ist dort nicht sichtbar (ReferenceError,
// gemessen 31.07.2026).
let ZIEL_URL = URL_;
let UMGELEITET = false;
let findings;
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const res = await page.goto(URL_, { waitUntil: 'networkidle', timeout: 45000 });
  // NICHT hier beenden: `process.exit()` im try-Block ueberspringt das
  // finally, in dem browser.close() steht. Der Browser blieb offen und
  // hinterliess sein Profil unter /tmp. Gemessen 31.07.2026 gegen einen
  // toten Server: reproduzierbar +1 Profilordner pro Lauf.
  // Werfen statt beenden — der catch unten macht daraus Exit 2, und das
  // finally raeumt vorher auf.
  if (!res || !res.ok()) {
    throw new Error(`Navigation fehlgeschlagen: ${URL_} -> ${res ? res.status() : 'kein Response'}`);
  }

  // Eine Antwort kann HTTP 200 melden und trotzdem unvollstaendig sein: der
  // Server verspricht per Content-Length mehr, als er dann sendet, und schliesst
  // die Verbindung mittendrin. Playwright meldet dafuer weiter res.ok() === true,
  // und Chrome ergaenzt die fehlenden Tags selbst — im DOM sieht die halbe Seite
  // aus wie eine ganze.
  //
  // Gemessen 31.07.2026 gegen einen Server, der 5000 Bytes ankuendigt und nach 44
  // abbricht: craft-check meldete drei BLOCK-Befunde, formular-check "kein
  // Formular auf dieser Seite". Beides sind Urteile ueber Text, der nie ankam —
  // und "kein Formular" ist die gefaehrlichere Haelfte, weil sie gruen ist.
  //
  // res.body() ist der verlaessliche Nachweis: bei abgebrochener Uebertragung
  // wirft es, bei vollstaendiger liefert es genau Content-Length viele Bytes.
  try {
    const roh = await res.body();
    const kopf = res.headers();
    const versprochen = Number(kopf['content-length'] || 0);
    // Content-Length zaehlt die Bytes AUF DER LEITUNG, res.body() liefert sie
    // ENTPACKT. Bei Content-Encoding sind das zwei verschiedene Zahlen, und
    // ihr Vergleich sagt nichts ueber Vollstaendigkeit.
    //
    // Meist ist entpackt groesser, weshalb der Vergleich zufaellig gutging.
    // Gemessen 31.07.2026 mit gzip auf Stufe 0 (nur verpackt, nicht
    // komprimiert): 337 Bytes auf der Leitung, 314 entpackt — alle drei
    // Werkzeuge lehnten eine vollstaendige, korrekt ausgelieferte Seite als
    // unvollstaendig ab. Dieselbe Umkehrung tritt bei jeder schlecht
    // komprimierbaren kleinen Antwort auf.
    //
    // Bei kodierter Antwort schuetzt allein, dass res.body() ueberhaupt
    // gelingt: bei abgebrochener Uebertragung scheitert das Entpacken.
    const kodiert = Boolean(kopf['content-encoding']);
    // Ein UTF-8-BOM (EF BB BF) zaehlt in Content-Length mit, wird von Chrome
    // aber beim Dekodieren entfernt — res.body() liefert dann genau 3 Bytes
    // weniger. Gemessen 01.08.2026 an einer BOM-Seite: 120 angekuendigt, 117
    // empfangen, und die Wache lehnte eine vollstaendige Seite als
    // unvollstaendig ab (Exit 2 statt Urteil).
    //
    // Windows-Editoren und alte CMS-Exporte schreiben das BOM bis heute. Genau
    // solche Dateien landen in Kundenprojekten.    //
    // Oeffnet diese Ausnahme ein Loch fuer echte 3-Byte-Abbrueche? Gemessen
    // 01.08.2026 mit einem Server, der genau 3 Bytes zurueckhaelt: Chrome
    // wartet vergeblich auf den Rest und laeuft ins Timeout — die Wache wird
    // dort gar nicht erreicht. Der Fall endet mit Exit 2 aus anderem Grund.
    const bomLuecke = versprochen - roh.length === 3 ? 3 : 0;
    if (!kodiert && versprochen && roh.length + bomLuecke < versprochen) {
      throw new Error(`Antwort unvollstaendig: ${roh.length} von ${versprochen} Bytes empfangen`);
    }
  } catch (e) {
    if (/unvollstaendig/.test(e.message)) throw e;
    throw new Error(`Antwort nicht lesbar (Uebertragung abgebrochen?): ${e.message.split('\n')[0]}`);
  }


  // Weiterleitungen sichtbar machen. Der Server-Check des Tores akzeptiert
  // 3xx als "erreichbar", und Playwright folgt der Kette stillschweigend —
  // geprueft wird dann eine ANDERE Seite als die genannte. Gemessen
  // 31.07.2026 gegen einen 302 auf /ziel: alle drei Werkzeuge berichteten
  // ueber die angefragte URL, angesehen hatten sie das Ziel.
  //
  // Das ist kein Fehler, sondern normaler Web-Betrieb (http->https, / ->
  // /de/). Aber wer den Bericht liest, muss wissen, welche Seite gemeint ist:
  // sonst sucht er den Mangel auf der falschen.
  ZIEL_URL = page.url();
  UMGELEITET = ZIEL_URL.replace(/\/$/, '') !== URL_.replace(/\/$/, '');

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
      const s = getComputedStyle(el);
      if (s.visibility === 'hidden' || s.display === 'none') return false;
      // `display: contents` loest die eigene Box auf — das Element hat dann
      // Breite 0, ist aber sehr wohl da, und seine Kinder sind sichtbar.
      // Sol-Befund 29.07.2026: ein <form style="display:contents"> fiel aus der
      // Sichtbarkeitspruefung und damit aus F6/F7 komplett heraus. Ein
      // fehlender Absende-Knopf blieb gruen.
      if (s.display === 'contents') return true;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };

    // Auch in Shadow Roots suchen. Sol-Befund 29.07.2026: `querySelectorAll`
    // steigt nicht in ein <lead-form> mit Shadow DOM ein — ein komplettes
    // Kontaktformular blieb ungeprueft, auch mit --strict. Web-Components sind
    // bei eingekauften Formular-Widgets (Booking, CRM-Embed) der Normalfall.
    const tiefSuchen = (wurzel, wahl, raus = []) => {
      raus.push(...wurzel.querySelectorAll(wahl));
      for (const el of wurzel.querySelectorAll('*')) {
        if (el.shadowRoot) tiefSuchen(el.shadowRoot, wahl, raus);
      }
      return raus;
    };

    // Nur echte Eingabefelder. Knoepfe, Hidden-Felder und Checkboxen haben
    // andere Regeln und wuerden hier nur Rauschen erzeugen.
    // `file` steht bewusst NICHT mehr drin: ein E-Mail-Feld mit type="file" ist
    // genau der Fehler, den F1 finden soll (Sol-Befund 29.07.2026) — die
    // Ausschlussliste hatte ihn vorher unsichtbar gemacht.
    const OHNE_TASTATUR = new Set(['hidden', 'submit', 'button', 'reset', 'image',
      'checkbox', 'radio', 'range', 'color']);
    const felder = tiefSuchen(document, 'input, textarea, select')
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
      // `aria-labelledby` zeigt auf ein beliebiges Element, oft ein <span> statt
      // eines <label>. Ohne diesen Zweig blieb ein so beschriftetes E-Mail-Feld
      // komplett ungeprueft — gemessen 29.07.2026 an einer Testseite.
      // Mehrere IDs sind erlaubt und werden per Leerzeichen getrennt.
      for (const id of (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean)) {
        const ziel = document.getElementById(id);
        if (ziel) teile.push(ziel.textContent || '');
      }
      // Zuletzt: das direkt davorstehende Textelement. Viele Formulare setzen ein
      // <span>/<div> ueber das Feld, ohne es zu verknuepfen — fuer den Besucher
      // ist das die Beschriftung, fuer den Browser nichts. Nur kurze Texte, damit
      // kein ganzer Absatz als Feldname gilt.
      const vor = el.previousElementSibling;
      if (vor && !vor.querySelector('input, select, textarea')) {
        const t = (vor.textContent || '').trim();
        if (t && t.length <= 40) teile.push(t);
      }
      // Typografische Bindestriche vereinheitlichen. Sol-Befund 29.07.2026:
      // "E‑Mail" mit U+2011 (non-breaking hyphen) ist fuer das Auge dasselbe
      // Wort, fuer ein Regex mit ASCII-Bindestrich ein anderes — und genau so
      // schreiben es Redaktionssysteme und Word-Importe. Dasselbe gilt fuer
      // Gedankenstriche und weiche Trennstellen (U+00AD), die unsichtbar sind.
      return teile.join(' ').toLowerCase()
        .replace(/[‐-―−]/g, '-')
        .replace(/[­​-‍﻿]/g, '');
    };

    // Kein `\b` am Wortende: Deutsch bildet Komposita. "Telefonnummer",
    // "Mailadresse", "Geschaeftsemail" und "Firmenwebseite" sind dasselbe Feld
    // wie "Telefon" — mit Wortgrenze hinten faellt jedes davon durch.
    // Gemessen 29.07.2026: "Telefonnummer" blieb ungeprueft.
    // Vorne bleibt die Grenze, sonst traefe "detail" auf "tel".
    const ERWARTET = [
      { was: 'E-Mail', typ: 'email', muster: /(\be-?mail|\bmail(?:adresse)?)/ },
      { was: 'Telefon', typ: 'tel', muster: /(\btel|\bphone|\bhandy|\bmobil|\brufnummer)/ },
      { was: 'Website/URL', typ: 'url', muster: /(\burl\b|\bwebsite|\bwebseite|\bhomepage|\bdomain)/ },
    ];

    // Die offenen Wortanfaenge oben treffen auch Woerter, die kein Kontaktfeld
    // meinen. Ein Moebelhaus mit einem Feld "Mobiliar" bekaeme sonst die
    // Aufforderung, es auf type="tel" zu stellen — falsches Rot, und nach dem
    // dritten Fehlalarm schaut niemand mehr hin.
    // Geprueft 29.07.2026 gegen: detail, hotel, artikel, beschreibung,
    // nachricht, betreff (alle sauber) sowie die drei hier.
    const KEIN_KONTAKT = /\b(mobiliar|handyman|mailbox|telefonat|telefonnotiz)\b/;

    for (const el of felder) {
      if (el.tagName !== 'INPUT') continue;
      const typ = (el.getAttribute('type') || 'text').toLowerCase();
      const txt = beschriftung(el);
      if (KEIN_KONTAKT.test(txt)) continue;
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
    // Wie bei ERWARTET: keine Wortgrenze am Ende (deutsche Komposita).
    // `\bort\b` bliebe sonst an "Wohnort" haengen, `\bname\b` an "Nachname".
    const KONTAKT = /(\be-?mail|\bmail|\btel|\bphone|\bhandy|\bmobil|name|\bfirma|\bcompany|stra(ss|ß)e|\bplz\b|\bort\b|wohnort|adresse)/;
    for (const el of felder) {
      const txt = beschriftung(el);
      if (!KONTAKT.test(txt) || KEIN_KONTAKT.test(txt)) continue;
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
        continue;
      }
      // Ein per addEventListener gesetzter Blocker ist im DOM unsichtbar
      // (Sol-Befund 29.07.2026). Statt danach zu suchen, wird er ausprobiert:
      // ein echtes paste-Event abschicken und nachsehen, ob es abgewuergt wurde.
      // Das ist die einzige verlaessliche Antwort — sie gilt fuer beide
      // Schreibweisen und laesst sich nicht durch Code-Kosmetik umgehen.
      let blockiert = false;
      try {
        const ev = new ClipboardEvent('paste', { bubbles: true, cancelable: true });
        el.dispatchEvent(ev);
        blockiert = ev.defaultPrevented;
      } catch { /* ClipboardEvent nicht baubar — dann bleibt es beim Attribut-Check */ }
      if (blockiert) {
        add('BLOCK', 'F3', 'Einfuegen blockiert',
          'ein paste-Handler ruft preventDefault() — Passwortmanager und Copy-Paste sind tot', sel(el));
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
    const IST_KONTAKT = /(\be-?mail|\bmail|\btel|\bphone|\bhandy|\bmobil|\brufnummer)/;

    // Viele Formulare haben gar kein <form>-Element — React-Widgets sammeln die
    // Felder und schicken sie per fetch(). Sol-Befund 29.07.2026: F6 und F7
    // liefen ausschliesslich ueber `querySelectorAll('form')`, also blieb ein
    // reines Label+Input-Konstrukt in beiden Regeln unsichtbar. Fehlt das
    // <form>, gilt das Dokument selbst als der eine Container.
    const container = tiefSuchen(document, 'form').filter(sichtbar);
    const gruppen = container.length
      ? container.map((f) => ({ el: f, felder: felder.filter((x) => f.contains(x)) }))
      : [{ el: document.body, felder }];

    for (const { felder: eigene } of gruppen) {
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
    for (const { el: form } of gruppen) {
      // Ein `hidden`- oder `display:none`-Knopf erfuellt die Regel nicht: fuer
      // den Besucher existiert er nicht. Sol-Befund 29.07.2026 — vorher zaehlte
      // `querySelector` jeden Treffer, auch einen unsichtbaren.
      const knoepfe = [...form.querySelectorAll(
        'button[type="submit"], input[type="submit"], button:not([type])')].filter(sichtbar);
      if (!knoepfe.length) {
        add('WARN', 'F7', 'Kein Absende-Knopf',
          'Kein sichtbarer submit-Knopf — Enter-Absenden allein ist auf dem Handy unerreichbar',
          sel(form));
        continue;
      }
      // Sind ALLE deaktiviert, kann niemand absenden. Reicht einer, ist gut.
      if (knoepfe.every((k) => k.disabled)) {
        add('WARN', 'F7', 'Absende-Knopf deaktiviert',
          'submit-Knopf ist beim Laden deaktiviert — soll bis zum Absenden aktiv bleiben', sel(knoepfe[0]));
      }
    }

    add('INFO', 'F8', 'Umfang',
      `${felder.length} Eingabefeld(er) in ${document.querySelectorAll('form').length} Formular(en) geprueft`);

    return out;
  });
} catch (e) {
  console.error(`formular-check kaputt: ${e.message}`);
  // Auch hier NICHT beenden: `process.exit()` im catch ueberspringt das
  // finally genauso wie im try. Gemessen 31.07.2026 mit einer
  // Debug-Zeile im finally — sie erschien nie, und jeder Abbruch liess
  // ein Chrome-Profil in /tmp liegen. Merken statt beenden; der Aufruf
  // steht nach dem finally.
  abbruch = true;
} finally {
  await browser.close();
}
if (abbruch) process.exit(2);

const blockers = findings.filter((f) => f.level === 'BLOCK');
const warns = findings.filter((f) => f.level === 'WARN');
const infos = findings.filter((f) => f.level === 'INFO');

if (AS_JSON) {
  console.log(JSON.stringify({ url: URL_, blockers, warns, infos }, null, 2));
} else {
  console.log(`formular-check — ${URL_}`);
  if (UMGELEITET) console.log(`  (weitergeleitet auf ${ZIEL_URL} — geprueft wurde diese Seite)`);
  console.log();
  for (const f of [...blockers, ...warns, ...infos]) {
    console.log(`[${f.level}] ${f.id} ${f.marker}: ${f.msg}`);
    if (f.sample) console.log(`        ${f.sample}`);
  }
  console.log(`\n${blockers.length} Blocker, ${warns.length} Warnungen, ${infos.length} Hinweise`);
}

process.exit(blockers.length > 0 || (STRICT && warns.length > 0) ? 1 : 0);
