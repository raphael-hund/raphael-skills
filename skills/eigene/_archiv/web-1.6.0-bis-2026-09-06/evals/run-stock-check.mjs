#!/usr/bin/env node
/**
 * run-stock-check.mjs — Parser und CLI von stock.mjs.
 *
 * Offline gegen Fixtures unter evals/fixtures/stock/. Netz nur mit --netz:
 * dann laufen Live-Aufrufe (quota, search, show, preview, sandbox-license, licenses).
 * KEIN echter license-Aufruf ohne --sandbox.
 *
 *   node evals/run-stock-check.mjs
 *   node evals/run-stock-check.mjs --netz
 *
 * Exit 0 = Parser, Hilfe und (optional) Netz wie erwartet.
 * Exit 1 = mindestens eine Prüfung fehlgeschlagen.
 * Exit 2 = Fixture oder Skript fehlt (nicht geprüft).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseSearch,
  parseImage,
  parseLicense,
  parseSubscriptions,
  parseLicenses,
  formatQuota,
  readTokenFromEnvText,
  parseBilderAddDatei,
} from '../scripts/stock.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FIX = path.join(HIER, 'fixtures', 'stock');
const SCRIPT = path.join(HIER, '..', 'scripts', 'stock.mjs');
const NETZ = process.argv.includes('--netz');

const files = {
  search: path.join(FIX, 'search.json'),
  image: path.join(FIX, 'image-full.json'),
  license: path.join(FIX, 'license.json'),
  subscriptions: path.join(FIX, 'subscriptions.json'),
  licenses: path.join(FIX, 'licenses.json'),
  envText: path.join(FIX, 'api-keys.env.txt'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) {
    console.error(`FEHLER: Fixture fehlt (${name}): ${file}`);
    process.exit(2);
  }
}
if (!fs.existsSync(SCRIPT)) {
  console.error(`FEHLER: Skript fehlt: ${SCRIPT}`);
  process.exit(2);
}

let fehler = 0;
let geprueft = 0;
function zeile(ok, text, detail) {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const read = (file) => fs.readFileSync(file, 'utf8');

console.log('\nStock — Parser (offline) und CLI\n');

const search = parseSearch(readJson(files.search));
zeile(search.items.length === 2 && search.search_id === 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'parseSearch: search_id + 2 Items', `${search.items.length} Treffer`);
zeile(
  search.total_count === 4962
    && search.items[0].id === '2165394859'
    && /executive/i.test(search.items[0].description)
    && search.items[0].preview
    && search.items[0].thumb
    && search.items[0].width === 3122
    && search.items[0].height === 4000,
  'parseSearch: id/description/preview/thumb/huge_jpg',
);
zeile(
  search.items.every((row) => row.id && typeof row.aspect === 'number' && row.preview),
  'parseSearch: jedes Item hat id/aspect/preview',
);

const image = parseImage(readJson(files.image));
zeile(image.id === '2165394859' && /executive/i.test(image.description), 'parseImage: id + description');
zeile(
  image.keywords.length === 20
    && image.categories.includes('People')
    && image.width === 3122
    && image.height === 4000
    && image.is_editorial === false
    && image.model_released === true
    && /preview_1500|stock-photo/.test(image.preview || ''),
  'parseImage: keywords≤20, categories, huge, model_released, preview_1500',
);

const license = parseLicense(readJson(files.license));
zeile(
  license.license_id === 'a4f9caff-5a21-430d-a461-fe7808610454'
    && license.image_id === '2165394859'
    && /download\.shutterstock\.com/.test(license.download_url || '')
    && license.allotment_charge === 1,
  'parseLicense: license_id/image_id/download.url/charge',
);

const subs = parseSubscriptions(readJson(files.subscriptions));
zeile(subs.length === 3, 'parseSubscriptions: 3 Abos', `${subs.length}`);
zeile(
  subs[0].license === 'standard'
    && subs[0].downloads_left === 100
    && subs[0].downloads_limit === 100
    && /2026-09-04/.test(subs[0].end_time || '')
    && /2026-09-05/.test(subs[0].expiration_time || '')
    && subs[0].id.startsWith('ZGU0ZjBiYjk2'),
  'parseSubscriptions: left/limit/end/expiration',
);

const quotaText = formatQuota(subs);
zeile(
  /^id\tlicense\tdescription\tleft\/limit\twindow_end\texpiration/m.test(quotaText)
    && /ZGU0ZjBiYjk2…/.test(quotaText)
    && /100\/100/.test(quotaText)
    && /Standard Image License/.test(quotaText),
  'formatQuota: Tabelle mit gekürzter id',
);

const licenses = parseLicenses(readJson(files.licenses));
zeile(licenses.total_count === 96 && licenses.items.length === 2, 'parseLicenses: total + 2 Items');
zeile(
  licenses.items[0].id === 'e1d2a2f8969090a54ee39ad75012849766'
    && licenses.items[0].image_id === '144338077'
    && licenses.items[0].license === 'standard'
    && licenses.items[0].is_downloadable === true
    && licenses.items[0].subscription_id
    && licenses.items[0].download_time,
  'parseLicenses: id/image.id/license/download_time/subscription/is_downloadable',
);

const token = readTokenFromEnvText(read(files.envText));
zeile(token === 'fixture_token_xyz_should_match', 'readTokenFromEnvText findet Token im Fixture-env');
zeile(readTokenFromEnvText('export OTHER=1\n') == null, 'readTokenFromEnvText: ohne Token = null');

zeile(
  parseBilderAddDatei('+ buero-meeting-test.avif  (id=buero-meeting-test)\n  ! bitte nachtragen: erstellt\n') === 'buero-meeting-test.avif',
  'parseBilderAddDatei: AVIF aus bilder.mjs-Stdout',
);
zeile(parseBilderAddDatei('kein plus\n') == null, 'parseBilderAddDatei: ohne Treffer = null');

{
  const help = spawnSync(process.execPath, [SCRIPT, '--help'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${help.stdout || ''}${help.stderr || ''}`;
  zeile(help.status === 0, '--help Exit 0');
  zeile(/preview <id>/.test(aus) && /--json/.test(aus), '--help kennt preview und --json');
  zeile(
    /stock\.mjs/.test(aus)
      && /Kundenbeweis/.test(aus)
      && /model-released/.test(aus)
      && /--editorial/.test(aus)
      && /stock add/.test(aus)
      && /Higgsfield/.test(aus)
      && /auth-relays\/README\.md \(Shutterstock\)/.test(aus),
    '--help nennt Kundenbeweis, Editorial, stock add, Higgsfield',
  );
}

{
  const unknown = spawnSync(process.execPath, [SCRIPT, '--unknown-flag'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${unknown.stderr || ''}${unknown.stdout || ''}`;
  zeile(unknown.status === 2 && /unbekanntes Flag/.test(aus), 'unbekanntes Flag Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'license'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /license braucht eine Bild-ID/.test(aus), 'license ohne id Exit 2');
}

if (NETZ) {
  console.log('\nStock — Netz\n');
  const run = (args, timeout = 90000) => spawnSync(process.execPath, [SCRIPT, ...args], {
    encoding: 'utf8',
    timeout,
    maxBuffer: 12 * 1024 * 1024,
  });
  const parseOut = (proc) => {
    const raw = (proc.stdout || '').trim();
    try { return JSON.parse(raw); } catch { return null; }
  };

  {
    const proc = run(['quota', '--json']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].id && data[0].license,
      'netz: quota ≥1 Abo',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }

  let firstId = null;
  {
    const proc = run(['search', 'office', '--limit', '3', '--json']);
    const data = parseOut(proc);
    firstId = data?.items?.[0]?.id || null;
    zeile(
      proc.status === 0 && data?.search_id && Array.isArray(data?.items) && data.items.length >= 1,
      'netz: search office ≥1 mit search_id',
      `exit ${proc.status} n=${Array.isArray(data?.items) ? data.items.length : 'kein-json'} search_id=${data?.search_id || '-'}`,
    );
  }

  {
    if (!firstId) {
      zeile(false, 'netz: show — keine id aus search');
    } else {
      const proc = run(['show', firstId, '--json']);
      const data = parseOut(proc);
      zeile(
        proc.status === 0 && data?.id === firstId && data?.description,
        'netz: show <erste id> hat description',
        `exit ${proc.status} id=${data?.id || '-'}`,
      );
    }
  }

  {
    if (!firstId) {
      zeile(false, 'netz: preview — keine id aus search');
    } else {
      const outDir = '/tmp/stock-previews-eval';
      fs.mkdirSync(outDir, { recursive: true });
      const proc = run(['preview', firstId, '--out', outDir]);
      const saved = (proc.stdout || '').trim().split('\n').filter(Boolean).pop();
      let size = 0;
      try { size = saved && fs.existsSync(saved) ? fs.statSync(saved).size : 0; } catch { size = 0; }
      zeile(
        proc.status === 0 && saved && fs.existsSync(saved) && size > 20 * 1024,
        'netz: preview Datei > 20 KB',
        `exit ${proc.status} path=${saved || '-'} size=${size}`,
      );
    }
  }

  {
    if (!firstId) {
      zeile(false, 'netz: license --sandbox — keine id');
    } else {
      const proc = run(['license', firstId, '--sandbox', '--json'], 120000);
      const data = parseOut(proc);
      zeile(
        proc.status === 0 && data?.license_id,
        'netz: license --sandbox → license_id',
        `exit ${proc.status} license_id=${data?.license_id || '-'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
      );
    }
  }

  {
    const proc = run(['licenses', '--limit', '3', '--json']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data?.items) && data.items.length >= 1,
      'netz: licenses ≥1',
      `exit ${proc.status} n=${Array.isArray(data?.items) ? data.items.length : 'kein-json'}`,
    );
  }
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log(NETZ ? 'Stock-Parser und Netz-Aufrufe stimmen.' : 'Stock-Parser und CLI stimmen.');
