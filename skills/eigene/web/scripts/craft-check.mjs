#!/usr/bin/env node
// craft-check.mjs — misst die Handwerks-Merkmale, an denen sich eine
// 10k-Agentur-Seite von einer KI-Seite unterscheidet. Laeuft gegen die
// gerenderte Seite (Computed Styles), nicht gegen den Quellcode.
//
// Grundlage: Recherche 27.07.2026, Merkmale M1-M25 + KI-Tells T1-T10.
// Belegt in ../references/agentur-merkmale.md.
//
//   node craft-check.mjs --url http://localhost:5280/ [--json] [--strict]
//
// Exit 0 = keine Blocker. Exit 1 = mindestens ein Blocker. Exit 2 = Lauf kaputt.
// --strict macht zusaetzlich WARN zu Blockern.
//
// Ehrlichkeitsregel: Dieses Skript misst NUR, was messbar ist. Ob die
// Bildwelt echt ist (M24) oder die Typo-Wahl begruendet (M7), entscheidet
// der Screenshot-Blick — das steht als INFO drin, nie als Pass.

import { chromium } from '/usr/lib/node_modules/playwright/index.mjs';

const args = process.argv.slice(2);

// Ein unbekanntes Flag ist ein Aufruffehler und muss SO heissen. Bis zum
// 31.07.2026 druckte dieses Skript darauf nur seine Aufrufzeile — die Meldung
// las sich wie "Argument fehlt", und wer sich vertippt hat, sucht am falschen
// Ende. Exit 2 war schon richtig, der Text nicht.
const FLAG_ERLAUBT = ['url', 'json', 'strict', 'textseite', 'help'];
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
// Reiner Rechtstext (Impressum, Datenschutz, AGB): dort ist "kein Bild" richtig,
// nicht kaputt. Muss ausdruecklich gesetzt werden — siehe M24 weiter unten.
const TEXTSEITE = args.includes('--textseite');

// `--help` lief bis zum 31.07.2026 in denselben Zweig wie ein VERGESSENES
// --url: richtige Zeile, aber auf stderr und mit Exit 2. Exit 2 heisst in
// diesem Skill 'Werkzeug kaputt' — wer Hilfe anfordert, hat nichts falsch
// gemacht und soll Exit 0 auf stdout bekommen.
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('usage: craft-check.mjs --url <url> [--json] [--strict]');
  console.log('Prueft handwerkliche Details einer laufenden Seite.');
  console.log('Exit 0 = sauber, 1 = Befund, 2 = Werkzeug/Umgebung kaputt.');
  process.exit(0);
}
if (!URL_) { console.error('usage: craft-check.mjs --url <url> [--json] [--strict]'); process.exit(2); }

// Die fuenf Fonts, die 2026 als KI-Herkunftssignal gelten (T1).
const KI_FONTS = ['inter', 'space grotesk', 'geist', 'manrope', 'plus jakarta sans'];

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

  await page.waitForTimeout(900);

  findings = await page.evaluate(([KI_FONTS, TEXTSEITE]) => {
    const out = [];
    const add = (level, id, marker, msg, sample) => out.push({ level, id, marker, msg, sample: sample || null });
    const px = (v) => parseFloat(v) || 0;
    const vis = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && px(s.opacity) > 0.05;
    };
    const all = [...document.querySelectorAll('body *')].filter(vis);
    const sel = (el) => {
      const id = el.id ? `#${el.id}` : '';
      const cls = typeof el.className === 'string' && el.className.trim()
        ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };

    // ---- M1: Typo-Skala. Verwendete font-sizes einsammeln, Verhaeltnisse pruefen.
    const textEls = all.filter((el) => el.children.length === 0 && (el.textContent || '').trim().length > 1);
    const sizes = [...new Set(textEls.map((el) => Math.round(px(getComputedStyle(el).fontSize))))].sort((a, b) => a - b);
    // `sizes.length > 1` stand hier bis 29.07.2026 als Wache — und schloss damit
    // genau den schlimmsten Fall aus: EINE Textgroesse fuer die ganze Seite,
    // Ueberschrift wie Fliesstext. Das ist Faktor 1.0, flacher geht Hierarchie
    // nicht, und der Pruefer schwieg dazu. Gefunden beim Bauen der Eval: der
    // Testfall `*{font-size:17px}` loeste M8 nicht aus, obwohl er das Extrem
    // dieser Regel ist. Ab EINER Groesse wird geprueft; die Spannweite ist dann
    // 1.0 und die Meldung stimmt weiter.
    if (sizes.length >= 1) {
      const spread = sizes[sizes.length - 1] / sizes[0];
      if (spread < 1.8) {
        add('BLOCK', 'M8', 'Hierarchie-Kontrast',
          `flache Hierarchie: alle Textgroessen zwischen ${sizes[0]}px und ${sizes[sizes.length - 1]}px (Faktor ${spread.toFixed(2)}, erwartet >= 1.8)`,
          sizes.join('/'));
      }
      if (sizes.length > 7) {
        add('WARN', 'M1', 'Typo-Skala',
          `${sizes.length} verschiedene Textgroessen — Agentur-Seiten kommen mit 4-6 aus`, sizes.join('/'));
      }
    }

    // ---- M2: 8pt-Grid. Spacing-Werte auf 4er-Vielfache pruefen.
    const spacings = [];
    for (const el of all.slice(0, 800)) {
      const s = getComputedStyle(el);
      for (const p of ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'gap', 'rowGap']) {
        const v = px(s[p]);
        if (v > 0 && v < 200) spacings.push(v);
      }
    }
    const offGrid = spacings.filter((v) => Math.abs(v % 4) > 0.6 && Math.abs((v % 4) - 4) > 0.6);
    if (spacings.length > 10 && offGrid.length / spacings.length > 0.25) {
      add('WARN', 'M2', 'Vertikaler Rhythmus',
        `${Math.round(offGrid.length / spacings.length * 100)}% der Abstaende liegen nicht auf dem 4px-Raster`,
        [...new Set(offGrid)].slice(0, 6).map((v) => `${v}px`).join(' '));
    }

    // ---- M12: Spacing nach Beziehung. Ein einziger Gap-Wert ueberall = Tell 31.
    const gaps = all.map((el) => px(getComputedStyle(el).gap)).filter((v) => v > 0);
    if (gaps.length >= 6) {
      const uniq = [...new Set(gaps.map((v) => Math.round(v)))];
      if (uniq.length === 1) {
        add('BLOCK', 'M12', 'Spacing-Beziehung',
          `EIN einziger gap-Wert (${uniq[0]}px) auf allen ${gaps.length} Flex/Grid-Containern — loescht die Gruppierungs-Information (Tell 31)`);
      }
    }

    // ---- M3: Satzspiegel. Body-Text nicht breiter als ~75 Zeichen.
    for (const el of textEls) {
      const t = (el.textContent || '').trim();
      if (t.length < 120) continue;
      const s = getComputedStyle(el);
      const fs = px(s.fontSize);
      if (fs > 24) continue;                       // Display-Type ist ausgenommen
      const ch = el.getBoundingClientRect().width / (fs * 0.5);  // ~0.5em pro Zeichen
      if (ch > 85) {
        add('BLOCK', 'M3', 'Satzspiegel',
          `Fliesstext ~${Math.round(ch)} Zeichen breit (Ziel <= 75ch)`, sel(el));
        break;
      }
    }

    // ---- M4: text-wrap balance/pretty auf Ueberschriften.
    const heads = [...document.querySelectorAll('h1, h2')].filter(vis);
    const unbalanced = heads.filter((el) => !['balance', 'pretty'].includes(getComputedStyle(el).textWrap));
    if (heads.length && unbalanced.length === heads.length) {
      add('WARN', 'M4', 'text-wrap',
        `keine einzige von ${heads.length} Ueberschriften nutzt text-wrap: balance/pretty`, sel(unbalanced[0]));
    }

    // ---- M7/T1: Font-Identitaet.
    const bodyFont = getComputedStyle(document.body).fontFamily.toLowerCase();
    const hit = KI_FONTS.find((f) => bodyFont.includes(f));
    if (hit) {
      add('WARN', 'T1', 'KI-Font',
        `Body nutzt "${hit}" — 2026 eines der lautesten KI-Herkunftssignale. Nur mit begruendeter Wahl behalten.`, bodyFont.slice(0, 80));
    }

    // ---- M9: Konzentrische Radien. Kind-Radius muss < Eltern-Radius sein.
    for (const el of all.slice(0, 600)) {
      const pr = px(getComputedStyle(el).borderTopLeftRadius);
      if (pr < 4) continue;
      const pad = px(getComputedStyle(el).paddingLeft);
      if (pad < 2) continue;
      for (const kid of [...el.children].filter(vis)) {
        const kr = px(getComputedStyle(kid).borderTopLeftRadius);
        if (kr >= 4 && Math.abs(kr - pr) < 1.5) {
          add('BLOCK', 'M9', 'Konzentrische Radien',
            `Kind und Eltern haben denselben Radius (${pr}px) bei ${pad}px Padding — innen muss ${Math.max(0, pr - pad)}px sein`,
            `${sel(el)} > ${sel(kid)}`);
          break;
        }
      }
      if (out.some((f) => f.id === 'M9')) break;
    }

    // ---- M11: Border XOR Shadow ("ghost card").
    let ghost = 0; let ghostSample = null;
    for (const el of all.slice(0, 600)) {
      const s = getComputedStyle(el);
      const hasBorder = px(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none';
      const hasShadow = s.boxShadow && s.boxShadow !== 'none';
      if (hasBorder && hasShadow && px(s.borderTopLeftRadius) > 2) { ghost++; if (!ghostSample) ghostSample = sel(el); }
    }
    if (ghost >= 3) {
      add('WARN', 'M11', 'Tiefen-Disziplin',
        `${ghost} Elemente haben Border UND Shadow gleichzeitig ("ghost card") — eins von beiden waehlen`, ghostSample);
    }

    // ---- M10: Radius-Disziplin. Zu viele verschiedene Radien.
    const radii = [...new Set(all.map((el) => Math.round(px(getComputedStyle(el).borderTopLeftRadius))).filter((v) => v > 0))];
    if (radii.length > 5) {
      add('WARN', 'M10', 'Radius-Skala',
        `${radii.length} verschiedene Radien (${radii.slice(0, 8).join('/')}px) — eine kleine Skala reicht`);
    }

    // ---- M16: Hit-Areas >= 40x40 (Desktop-Floor).
    const clickables = [...document.querySelectorAll('a, button, [role="button"], input[type="submit"]')].filter(vis);
    const tiny = clickables.filter((el) => {
      const r = el.getBoundingClientRect();
      // Inline-Links im Fliesstext sind ausgenommen — die duerfen zeilenhoch sein.
      const inline = getComputedStyle(el).display === 'inline' && el.closest('p, li');
      return !inline && (r.height < 40 || r.width < 40);
    });
    if (tiny.length) {
      add('BLOCK', 'M16', 'Hit-Area',
        `${tiny.length} Klickflaeche(n) kleiner als 40x40px`,
        tiny.slice(0, 3).map((el) => { const r = el.getBoundingClientRect(); return `${sel(el)} ${Math.round(r.width)}x${Math.round(r.height)}`; }).join(', '));
    }

    // ---- M17: Focus sichtbar. outline:none ohne Ersatz.
    const killedFocus = clickables.filter((el) => {
      const s = getComputedStyle(el);
      const noOutline = s.outlineStyle === 'none' || px(s.outlineWidth) === 0;
      const noShadow = !s.boxShadow || s.boxShadow === 'none';
      return noOutline && noShadow;
    });
    // Nur melden, wenn das Stylesheet outline aktiv wegnimmt (sonst greift der Browser-Default).
    const sheetKillsOutline = [...document.styleSheets].some((ss) => {
      try { return [...ss.cssRules].some((r) => r.style && /outline\s*:\s*(none|0)/i.test(r.cssText) && !/focus-visible/i.test(r.selectorText || '')); }
      catch { return false; }
    });
    if (sheetKillsOutline && killedFocus.length) {
      add('BLOCK', 'M17', 'Focus-Indikator',
        `CSS setzt outline:none ohne :focus-visible-Ersatz — Tastatur-Nutzung wird unsichtbar`, sel(killedFocus[0]));
    }

    // ---- M18: prefers-reduced-motion muss im CSS vorkommen, wenn animiert wird.
    const animated = all.filter((el) => {
      const s = getComputedStyle(el);
      return (s.transitionDuration && parseFloat(s.transitionDuration) > 0) || (s.animationName && s.animationName !== 'none');
    });
    let hasRM = false;
    for (const ss of [...document.styleSheets]) {
      try { if ([...ss.cssRules].some((r) => (r.conditionText || '').includes('prefers-reduced-motion'))) { hasRM = true; break; } }
      catch { /* cross-origin sheet */ }
    }
    if (animated.length >= 3 && !hasRM) {
      add('BLOCK', 'M18', 'Reduced Motion',
        `${animated.length} animierte Elemente, aber keine @media (prefers-reduced-motion)-Regel`);
    }

    // ---- M19: transition: all ist verboten (animiert unabsichtlich Layout).
    // Achtung: transitionProperty ist per Default "all", auch ohne jede Transition.
    // Ohne Dauer-Pruefung meldet das jede statische Seite falsch.
    const dur = (s) => (s.transitionDuration || '').split(',').reduce((m, v) => Math.max(m, parseFloat(v) || 0), 0);
    const transAll = all.filter((el) => {
      const s = getComputedStyle(el);
      return (s.transitionProperty || '').trim() === 'all' && dur(s) > 0;
    });
    if (transAll.length) {
      add('WARN', 'M19', 'Motion-Budget',
        `${transAll.length} Element(e) mit transition-property: all — nur transform/opacity animieren`, sel(transAll[0]));
    }

    // ---- T7: hover:scale-105-Reflex (Springy-Hover ueberall).
    const scaled = all.filter((el) => {
      const s = getComputedStyle(el);
      if (dur(s) <= 0) return false;
      const prop = (s.transitionProperty || '').trim();
      return /scale|transform/i.test(prop) || prop === 'all';
    });
    if (scaled.length > 8) {
      add('WARN', 'T7', 'Springy-Hover', `${scaled.length} Elemente animieren transform/scale — Motion ohne Information`);
    }

    // ---- T2: Indigo-Violett-Gradient.
    const grads = all.map((el) => getComputedStyle(el).backgroundImage).filter((v) => v && v.includes('gradient'));
    const violet = grads.filter((g) => /(99,\s*102,\s*241|168,\s*85,\s*247|139,\s*92,\s*246)/.test(g));
    if (violet.length) {
      add('BLOCK', 'T2', 'KI-Gradient',
        `${violet.length}x der Indigo-Violett-Verlauf (#6366f1/#a855f7) — das Factory-Setting jeder KI-Seite`, violet[0].slice(0, 90));
    }

    // ---- T9: erfundene Stat-Row.
    const bodyTxt = document.body.innerText || '';
    // Kein \b am Ende: nach "+" oder "%" steht kein Wortzeichen, die Grenze traefe nie.
    const fakeStats = (bodyTxt.match(/\b(?:\d+[kKmM]\+|\d{2,}\+|99[.,]9\s*%|100\s*%|24\/7)/g) || []);
    if (fakeStats.length >= 2) {
      add('WARN', 'T9', 'Runde Zahlen',
        `Verdaechtige Rund-Zahlen: ${[...new Set(fakeStats)].join(', ')} — jede muss belegbar sein, sonst vergiftet sie die echten daneben`);
    }

    // ---- T8: Em-Dash (design-Doktrin: null sichtbare Em-Dashes).
    const dashes = (bodyTxt.match(/[—–]/g) || []).length;
    if (dashes) add('BLOCK', 'T8', 'Em-Dash', `${dashes} sichtbare Em-/En-Dashes im Text — Doktrin ist null`);

    // ---- T5: Kicker-Reflex (uppercase Mini-Label ueber jeder Ueberschrift).
    const kickers = all.filter((el) => {
      const s = getComputedStyle(el);
      const t = (el.textContent || '').trim();
      return el.children.length === 0 && t.length > 2 && t.length < 30
        && s.textTransform === 'uppercase' && px(s.fontSize) < 15 && px(s.letterSpacing) > 0.5;
    });
    if (kickers.length >= 3) {
      add('WARN', 'T5', 'Kicker-Reflex',
        `${kickers.length} uppercase Mini-Label — pruefen, ob sie mehr sagen als die Ueberschrift darunter`,
        kickers.slice(0, 3).map((el) => (el.textContent || '').trim()).join(' | '));
    }

    // ---- M6: tabular-nums auf Zahlenreihen.
    const numeric = textEls.filter((el) => /^[\s$€£]*[\d.,]+\s*[%+kKmM]*\s*$/.test((el.textContent || '').trim()) && (el.textContent || '').trim().length > 1);
    if (numeric.length >= 3) {
      const noTab = numeric.filter((el) => !(getComputedStyle(el).fontVariantNumeric || '').includes('tabular'));
      if (noTab.length === numeric.length) {
        add('WARN', 'M6', 'tabular-nums',
          `${numeric.length} Zahlenwerte ohne font-variant-numeric: tabular-nums (springen beim Aendern)`, (noTab[0].textContent || '').trim());
      }
    }

    // ---- M23: Head-Polish.
    const headMissing = [];
    if (!document.querySelector('link[rel~="icon"]')) headMissing.push('favicon');
    if (!document.querySelector('meta[property="og:image"]')) headMissing.push('og:image');
    if (!document.querySelector('meta[property="og:title"]')) headMissing.push('og:title');
    if (!document.querySelector('meta[name="theme-color"]')) headMissing.push('theme-color');
    if (!document.querySelector('meta[name="description"]')) headMissing.push('description');
    if (headMissing.length) {
      add(headMissing.includes('description') ? 'BLOCK' : 'WARN', 'M23', 'Head-Polish',
        `fehlt im <head>: ${headMissing.join(', ')}`);
    }

    // ---- M22: explizite Bildmasse gegen CLS.
    const imgs = [...document.querySelectorAll('img')].filter(vis);
    const noDim = imgs.filter((el) => !el.getAttribute('width') || !el.getAttribute('height'));
    if (noDim.length) {
      add('WARN', 'M22', 'CLS',
        `${noDim.length}/${imgs.length} Bilder ohne explizite width/height`, noDim[0].getAttribute('src') || '?');
    }

    // ---- M24: Bildwelt. OB ein Bild gut ist, entscheidet der Blick (INFO).
    // DASS ueberhaupt eines da ist, ist eine Zahl — und die kann das Skript zaehlen.
    //
    // Panel-Befund 27.07.2026 am Beweis-Build: 98/100/100/100, null Verstoesse,
    // und trotzdem "nicht ausliefern" — auf der Seite eines Sanierungsbetriebs war
    // kein einziges Foto. Das Tor hat es nicht gemerkt, weil M24 komplett INFO war.
    // Hintergrundbilder in CSS zaehlen mit; nur Icon-Groesse zaehlt nicht als Bildwelt.
    const grafik = [...document.querySelectorAll('img, picture, video')].filter(vis)
      .concat([...document.querySelectorAll('body *')].filter((el) => {
        if (!vis(el)) return false;
        const bg = getComputedStyle(el).backgroundImage || '';
        return bg.startsWith('url(');            // Verlaeufe sind keine Bildwelt
      }));
    const echteFlaeche = grafik.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width >= 120 && r.height >= 120;   // alles darunter ist Icon/Logo
    });
    // Rechtstexte (Impressum, Datenschutz, AGB) haben legitim kein Bild. Dort waere
    // ein Blocker falsches Rot — also mit --textseite abschaltbar, aber NICHT
    // stillschweigend: wer die Ausnahme will, muss sie hinschreiben.
    if (echteFlaeche.length === 0 && !TEXTSEITE) {
      add('BLOCK', 'M24', 'Bildwelt fehlt',
        'kein einziges Bild ueber Icon-Groesse auf der Seite — eine Agenturseite ohne Bildwelt gibt es nicht'
        + ' (reiner Rechtstext? dann --textseite)');
    }
    add('INFO', 'M24/M25', 'Bildwelt + Proof',
      `${imgs.length} <img>, ${echteFlaeche.length} Flaechenbilder — echt oder Stock, entscheidet der Blick, nicht dieses Skript`);
    add('INFO', 'M20', 'Signature-Moment',
      `${animated.length} animierte Elemente — genau EIN Signature-Moment pro Seite ist das Ziel`);

    return out;
  }, [KI_FONTS, TEXTSEITE]);

  // ---- M13: Mobile. Ein zweiter Durchgang auf 390x844, weil die haesslichsten
  // Fehler erst dort entstehen: ein Grid, das nie umbricht, und alles laeuft
  // seitlich aus dem Bild. Auf 1440 ist davon nichts zu sehen — genau deshalb
  // faellt es sonst erst dem Besucher auf.
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mob.goto(URL_, { waitUntil: 'networkidle', timeout: 45000 });
  await mob.waitForTimeout(700);
  const mobile = await mob.evaluate(() => {
    const out = [];
    const vw = document.documentElement.clientWidth;

    // Seitliches Auslaufen der ganzen Seite.
    const docW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    if (docW > vw + 2) {
      out.push({ level: 'BLOCK', id: 'M13', marker: 'Mobile-Overflow',
        msg: `Seite ist ${docW}px breit bei ${vw}px Viewport — horizontales Scrollen`, sample: null });
    }

    // Einzelne Elemente, die rechts aus dem Bild ragen.
    const over = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (getComputedStyle(el).position === 'fixed') continue;
      if (r.right > vw + 2) {
        over.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''} (bis ${Math.round(r.right)}px)`);
      }
    }
    if (over.length) {
      out.push({ level: 'BLOCK', id: 'M13', marker: 'Mobile-Overflow',
        msg: `${over.length} Element(e) ragen rechts aus dem Bild`, sample: over.slice(0, 4).join(', ') });
    }

    // Mehrspaltige Raster, die auf dem Handy mehrspaltig geblieben sind.
    const stuck = [];
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      if (s.display !== 'grid') continue;
      const cols = (s.gridTemplateColumns || '').split(' ').filter(Boolean);
      if (cols.length > 1 && el.getBoundingClientRect().width > vw * 0.6) {
        stuck.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''} (${cols.length} Spalten)`);
      }
    }
    if (stuck.length) {
      out.push({ level: 'WARN', id: 'M13', marker: 'Mobile-Raster',
        msg: `${stuck.length} Raster bleiben auf 390px mehrspaltig`, sample: stuck.slice(0, 4).join(', ') });
    }
    return out;
  });
  await mob.close();
  findings.push(...mobile);
} catch (e) {
  console.error(`craft-check kaputt: ${e.message}`);
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
  console.log(`craft-check — ${URL_}`);
  if (UMGELEITET) console.log(`  (weitergeleitet auf ${ZIEL_URL} — geprueft wurde diese Seite)`);
  console.log();
  for (const f of [...blockers, ...warns, ...infos]) {
    console.log(`[${f.level}] ${f.id} ${f.marker}: ${f.msg}`);
    if (f.sample) console.log(`        ${f.sample}`);
  }
  console.log(`\n${blockers.length} Blocker, ${warns.length} Warnungen, ${infos.length} Hinweise`);
}

const fail = blockers.length > 0 || (STRICT && warns.length > 0);
process.exit(fail ? 1 : 0);
