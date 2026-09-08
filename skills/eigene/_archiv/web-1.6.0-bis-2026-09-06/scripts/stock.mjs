#!/usr/bin/env node
// stock.mjs — Shutterstock-Bilder suchen, sichten, lizenzieren und in bilder.mjs legen.
//
//   node stock.mjs search "<query>" [--limit 10] [--page 1] [--orientation …] [--json]
//   node stock.mjs show <id> [--json]
//   node stock.mjs preview <id> [--out <verzeichnis>]
//   node stock.mjs license <id> [--size huge|medium|small] [--subscription <id>] [--sandbox] [--json]
//   node stock.mjs redownload <license_id> [--out <verzeichnis>] [--json]
//   node stock.mjs licenses [--limit 20] [--page 1] [--json]
//   node stock.mjs quota [--json]
//   node stock.mjs similar <id> [--limit 10] [--json]
//   node stock.mjs add <license_id|datei> <assets-dir> [--typ T] [--motiv "…"] [--style "…"]
//   node stock.mjs --help
//
// Auth: SHUTTERSTOCK_API_TOKEN aus /root/.secrets/api-keys.env (Bearer).
// API: https://api.shutterstock.com/v2 · --sandbox: api-sandbox (Lizenz-Tests).
// Kein npm, nur node:-Module + globales fetch. Timeout 45s.

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const UA = 'raphael-web-stock/1.0';
const FETCH_TIMEOUT_MS = 45_000;
const API_LIVE = 'https://api.shutterstock.com/v2';
const API_SANDBOX = 'https://api-sandbox.shutterstock.com/v2';
const SECRETS = '/root/.secrets/api-keys.env';
const AUTH_HINT = '/root/tools/auth-relays/README.md (Shutterstock)';
const DEFAULT_PREVIEW_OUT = '/tmp/stock-previews';
const DEFAULT_LICENSE_OUT = '/tmp/stock-dl';
const HIER = path.dirname(fileURLToPath(import.meta.url));
const BILDER = path.join(HIER, 'bilder.mjs');

const HELP = `Usage:
  node stock.mjs search "<query>" [--limit 10] [--page 1] [--orientation horizontal|vertical|square] [--people <n>] [--no-people] [--color <hex>] [--type photo|illustration|vector|all] (Default photo) [--safe] [--json]
  node stock.mjs show <id> [--json]
  node stock.mjs preview <id> [--out <verzeichnis>]
  node stock.mjs license <id> [--size huge|medium|small] [--subscription <id>] [--search-id <sid>] [--editorial] [--out <verzeichnis>] [--sandbox] [--json]
  node stock.mjs redownload <license_id> [--out <verzeichnis>] [--json]
  node stock.mjs licenses [--limit 20] [--page 1] [--json]
  node stock.mjs quota [--json]
  node stock.mjs similar <id> [--limit 10] [--json]
  node stock.mjs add <license_id|datei> <assets-dir> [--typ T] [--motiv "…"] [--style "…"] [--image-id <id>]
  node stock.mjs --help

Shutterstock v2. Token = Bearer aus ${SECRETS}. Fehlt der Token → siehe ${AUTH_HINT}.
--sandbox nur für Lizenz-Tests (api-sandbox, kein Kontingent). User-Agent ${UA}, Timeout 45s.

Regeln:
  · Standardlizenz aus Raphaels Abo.
  · Stock nie als „Kundenbeweis“ ausgeben.
  · Personenbilder nur model-released.
  · Editorial nur mit --editorial.
  · Jedes lizenzierte Bild über "stock add" in bilder-index.json + stock-lizenzen.json.
  · Higgsfield bleibt Default für markenspezifische Szenen (Router #bilder);
    Stock ist der Weg für echte Fotos/Menschen/Orte.

Exit: 0 ok · 1 nichts gefunden / API-Fehler · 2 Bedienfehler / kein Token / Editorial ohne --editorial · 3 HOST_UNAVAILABLE.`;

function die(message) {
  console.error(`stock: ${message}\n\n${HELP}`);
  process.exit(2);
}

function dieApi(message, code = 1) {
  console.error(`stock: ${message}`);
  process.exit(code);
}

function limitOf(flags, fallback) {
  if (flags.limit == null) return fallback;
  const n = Number(flags.limit);
  if (!Number.isInteger(n) || n < 1) die('--limit muss eine ganze Zahl >= 1 sein');
  return n;
}

function pageOf(flags, fallback = 1) {
  if (flags.page == null) return fallback;
  const n = Number(flags.page);
  if (!Number.isInteger(n) || n < 1) die('--page muss eine ganze Zahl >= 1 sein');
  return n;
}

function emitJsonOrText(flags, data, text) {
  if (flags.json) console.log(JSON.stringify(data, null, 2));
  else console.log(text);
}

export function parseCli(argv) {
  const flags = {
    json: false,
    sandbox: false,
    safe: false,
    editorial: false,
    'no-people': false,
    limit: null,
    page: null,
    out: null,
    orientation: null,
    people: null,
    color: null,
    type: null,
    size: null,
    subscription: null,
    'search-id': null,
    typ: null,
    motiv: null,
    style: null,
    'image-id': null,
  };
  const positional = [];
  const knownBool = new Set(['--json', '--help', '--sandbox', '--safe', '--editorial', '--no-people']);
  const knownValue = new Set([
    '--limit', '--page', '--out', '--orientation', '--people', '--color', '--type',
    '--size', '--subscription', '--search-id', '--typ', '--motiv', '--style', '--image-id',
  ]);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (arg === '--sandbox') flags.sandbox = true;
    else if (arg === '--safe') flags.safe = true;
    else if (arg === '--editorial') flags.editorial = true;
    else if (arg === '--no-people') flags['no-people'] = true;
    else if (knownValue.has(arg)) {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) die(`${arg} braucht einen Wert`);
      i += 1;
      const key = arg.slice(2);
      flags[key] = value;
    } else if (arg.startsWith('--')) {
      if (!knownBool.has(arg) && !knownValue.has(arg)) die(`unbekanntes Flag ${arg}`);
    } else positional.push(arg);
  }
  return { flags, positional };
}

export function readTokenFromEnvText(text) {
  const raw = String(text || '');
  const match = raw.match(/^\s*export\s+SHUTTERSTOCK_API_TOKEN=(.+)\s*$/m);
  if (!match) return null;
  let value = match[1].trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return value || null;
}

function readToken() {
  let text;
  try {
    text = fs.readFileSync(SECRETS, 'utf8');
  } catch (error) {
    die(`Token-Datei nicht lesbar (${SECRETS}): ${error instanceof Error ? error.message : String(error)}. Siehe ${AUTH_HINT}`);
  }
  const token = readTokenFromEnvText(text);
  if (!token) die(`SHUTTERSTOCK_API_TOKEN fehlt in ${SECRETS}. Siehe ${AUTH_HINT}`);
  return token;
}

function apiBase(flags) {
  return flags.sandbox ? API_SANDBOX : API_LIVE;
}

function hostUnavailable(url, detail) {
  const error = new Error(`HOST_UNAVAILABLE ${url} (${detail})`);
  error.code = 'HOST_UNAVAILABLE';
  return error;
}

async function apiFetch(token, base, method, route, { query, body } = {}) {
  const url = new URL(base + route);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value == null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  const headers = {
    accept: 'application/json',
    authorization: `Bearer ${token}`,
    'user-agent': UA,
  };
  let payload;
  if (body !== undefined) {
    headers['content-type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: payload,
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (error) {
    throw hostUnavailable(url.href, error instanceof Error ? error.message : String(error));
  }
  const text = await res.text();
  let json = null;
  if (text.trim()) {
    try { json = JSON.parse(text); } catch { json = null; }
  }
  if (!res.ok) {
    const apiMessage = (json && (json.message || json.error || json.Message)) || text.trim().slice(0, 240) || `HTTP ${res.status}`;
    const err = new Error(`API ${res.status}: ${apiMessage}`);
    err.code = 'API_ERROR';
    err.status = res.status;
    err.apiMessage = apiMessage;
    throw err;
  }
  return json;
}

async function downloadFile(url, destPath) {
  let res;
  try {
    res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (error) {
    throw hostUnavailable(url, error instanceof Error ? error.message : String(error));
  }
  if (!res.ok) {
    const err = new Error(`Download HTTP ${res.status}`);
    err.code = 'API_ERROR';
    err.status = res.status;
    throw err;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ctype = (res.headers.get('content-type') || '').toLowerCase();
  let finalPath = destPath;
  if (/\bpng\b/.test(ctype) && !/\.png$/i.test(finalPath)) {
    finalPath = finalPath.replace(/\.(jpe?g|bin)$/i, '') + '.png';
  } else if (/\bjpe?g\b/.test(ctype) && !/\.jpe?g$/i.test(finalPath)) {
    finalPath = finalPath.replace(/\.(png|bin)$/i, '') + '.jpg';
  }
  fs.mkdirSync(path.dirname(finalPath), { recursive: true });
  fs.writeFileSync(finalPath, buf);
  return finalPath;
}

function clip(text, n) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  return `${s.slice(0, n - 1)}…`;
}

export function parseSearch(payload) {
  const data = payload || {};
  const items = [];
  for (const row of data.data || []) {
    const assets = row.assets || {};
    const huge = assets.huge_jpg || {};
    items.push({
      id: String(row.id),
      description: row.description || '',
      aspect: row.aspect ?? null,
      width: huge.width ?? null,
      height: huge.height ?? null,
      preview: assets.preview_1000?.url || null,
      thumb: assets.large_thumb?.url || null,
      is_editorial: Boolean(row.is_editorial),
      contributor: row.contributor?.id || row.contributor?.name || null,
    });
  }
  return {
    search_id: data.search_id || null,
    total_count: data.total_count ?? items.length,
    items,
  };
}

export function parseImage(payload) {
  const row = payload || {};
  const assets = row.assets || {};
  const huge = assets.huge_jpg || {};
  const keywords = Array.isArray(row.keywords) ? row.keywords.slice(0, 20) : [];
  const categories = Array.isArray(row.categories)
    ? row.categories.map((c) => (typeof c === 'string' ? c : c?.name)).filter(Boolean)
    : [];
  let modelReleased = null;
  if (typeof row.has_model_release === 'boolean') modelReleased = row.has_model_release;
  else if (Array.isArray(row.model_releases) && row.model_releases.length) modelReleased = true;
  else if (Array.isArray(row.releases) && row.releases.length) modelReleased = true;
  return {
    id: String(row.id || ''),
    description: row.description || '',
    keywords,
    categories,
    aspect: row.aspect ?? null,
    width: huge.width ?? null,
    height: huge.height ?? null,
    is_editorial: Boolean(row.is_editorial),
    model_released: modelReleased,
    preview: assets.preview_1500?.url || assets.preview_1000?.url || null,
  };
}

export function parseLicense(payload) {
  const row = (payload && payload.data && payload.data[0]) || payload || {};
  return {
    license_id: row.license_id || row.id || null,
    image_id: row.image_id || row.image?.id || null,
    download_url: row.download?.url || null,
    allotment_charge: row.allotment_charge ?? null,
  };
}

export function parseSubscriptions(payload) {
  const list = [];
  for (const row of (payload && payload.data) || []) {
    const allot = row.allotment || {};
    list.push({
      id: String(row.id || ''),
      license: row.license || '',
      description: row.description || '',
      downloads_left: allot.downloads_left ?? null,
      downloads_limit: allot.downloads_limit ?? null,
      end_time: allot.end_time || null,
      expiration_time: row.expiration_time || null,
      asset_type: row.asset_type || null,
    });
  }
  return list;
}

export function parseLicenses(payload) {
  const items = [];
  for (const row of (payload && payload.data) || []) {
    items.push({
      id: String(row.id || ''),
      image_id: row.image?.id != null ? String(row.image.id) : null,
      license: row.license || '',
      download_time: row.download_time || null,
      subscription_id: row.subscription_id || null,
      is_downloadable: Boolean(row.is_downloadable),
    });
  }
  return {
    total_count: payload?.total_count ?? items.length,
    page: payload?.page ?? null,
    per_page: payload?.per_page ?? null,
    items,
  };
}

export function formatQuota(subs) {
  const lines = ['id\tlicense\tdescription\tleft/limit\twindow_end\texpiration'];
  for (const s of subs) {
    const idShort = s.id.length > 12 ? `${s.id.slice(0, 12)}…` : s.id;
    const left = s.downloads_left == null && s.downloads_limit == null
      ? '-'
      : `${s.downloads_left ?? '?'}/${s.downloads_limit ?? '?'}`;
    lines.push([
      idShort,
      s.license || '',
      clip(s.description, 40),
      left,
      s.end_time || '-',
      s.expiration_time || '-',
    ].join('\t'));
  }
  return lines.join('\n');
}

function formatSearchText(parsed) {
  const header = `# search_id=${parsed.search_id || '-'} total=${parsed.total_count ?? 0}`;
  const lines = parsed.items.map((item) => [
    item.id,
    item.aspect ?? '',
    clip(item.description, 70),
    item.preview || '',
  ].join('\t'));
  return [header, ...lines].join('\n');
}

function formatShowText(img) {
  const size = (img.width && img.height) ? `${img.width}×${img.height}` : '-';
  return [
    `id\t${img.id}`,
    `description\t${img.description}`,
    `keywords\t${(img.keywords || []).join(', ')}`,
    `categories\t${(img.categories || []).join(', ')}`,
    `aspect\t${img.aspect ?? ''}`,
    `huge_jpg\t${size}`,
    `is_editorial\t${img.is_editorial}`,
    `model_released\t${img.model_released == null ? '-' : img.model_released}`,
    `preview\t${img.preview || ''}`,
  ].join('\n');
}

/** Dateiname aus bilder.mjs-add-Stdout: "+ name.avif  (id=…)" */
export function parseBilderAddDatei(stdout) {
  const text = String(stdout || '');
  const m = text.match(/\+\s+(\S+\.avif)\s+\(id=/);
  if (m) return m[1];
  const n = text.match(/(\S+\.avif)\s+\(id=/);
  return n ? n[1] : null;
}

function latestBilderDatei(assetsDir) {
  const idxPath = path.join(assetsDir, 'bilder-index.json');
  if (!fs.existsSync(idxPath)) return null;
  try {
    const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
    const images = Array.isArray(idx?.images) ? idx.images : [];
    const last = images[images.length - 1];
    return last?.datei || null;
  } catch {
    return null;
  }
}

function appendStockLizenz(assetsDir, entry) {
  const dest = path.join(assetsDir, 'stock-lizenzen.json');
  let list = [];
  if (fs.existsSync(dest)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(dest, 'utf8'));
      list = Array.isArray(parsed) ? parsed : (parsed.licenses || []);
    } catch {
      dieApi(`stock-lizenzen.json kaputt: ${dest}`);
    }
  }
  const key = entry.license_id;
  if (key) {
    const idx = list.findIndex((row) => row.license_id === key);
    if (idx >= 0) list[idx] = { ...list[idx], ...entry };
    else list.push(entry);
  } else {
    list.push(entry);
  }
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.writeFileSync(dest, `${JSON.stringify(list, null, 2)}\n`);
  return dest;
}

async function cmdSearch(query, flags) {
  if (!query) die('search braucht eine Query');
  const token = readToken();
  const queryParams = {
    query,
    per_page: limitOf(flags, 10),
    page: pageOf(flags, 1),
    sort: 'relevance',
  };
  if (flags.orientation) {
    if (!['horizontal', 'vertical', 'square'].includes(flags.orientation)) {
      die('--orientation muss horizontal|vertical|square sein');
    }
    queryParams.orientation = flags.orientation;
  }
  if (flags['no-people']) queryParams.people_number = 0;
  else if (flags.people != null) {
    const n = Number(flags.people);
    if (!Number.isInteger(n) || n < 0) die('--people muss eine ganze Zahl >= 0 sein');
    queryParams.people_number = n;
    queryParams.people_model_released = true;
  }
  if (flags.color) queryParams.color = String(flags.color).replace(/^#/, '');
  // Foto-Default (zugangskarte.md): ohne --type nur Fotos, sonst mischt Shutterstock Vektoren und Illustrationen hinein.
  const imageType = flags.type || 'photo';
  if (!['photo', 'illustration', 'vector', 'all'].includes(imageType)) {
    die('--type muss photo|illustration|vector|all sein');
  }
  if (imageType !== 'all') queryParams.image_type = imageType;
  if (flags.safe) queryParams.safe = true;

  const raw = await apiFetch(token, apiBase(flags), 'GET', '/images/search', { query: queryParams });
  const parsed = parseSearch(raw);
  if (!parsed.items.length) {
    if (flags.json) console.log(JSON.stringify(parsed, null, 2));
    dieApi('nichts gefunden');
  }
  emitJsonOrText(flags, parsed, formatSearchText(parsed));
}

async function cmdShow(id, flags) {
  if (!id) die('show braucht eine Bild-ID');
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'GET', `/images/${encodeURIComponent(id)}`, {
    query: { view: 'full' },
  });
  const img = parseImage(raw);
  emitJsonOrText(flags, img, formatShowText(img));
}

async function cmdPreview(id, flags) {
  if (!id) die('preview braucht eine Bild-ID');
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'GET', `/images/${encodeURIComponent(id)}`, {
    query: { view: 'full' },
  });
  const url = raw?.assets?.preview_1000?.url;
  if (!url) dieApi('kein preview_1000 für dieses Bild');
  const outDir = path.resolve(flags.out || DEFAULT_PREVIEW_OUT);
  const dest = path.join(outDir, `${id}-preview.jpg`);
  const saved = await downloadFile(url, dest);
  emitJsonOrText(flags, { id: String(id), path: saved, url }, saved);
}

async function cmdLicense(id, flags) {
  if (!id) die('license braucht eine Bild-ID');
  const size = flags.size || 'huge';
  if (!['huge', 'medium', 'small'].includes(size)) die('--size muss huge|medium|small sein');
  const token = readToken();
  const base = apiBase(flags);
  const meta = await apiFetch(token, API_LIVE, 'GET', `/images/${encodeURIComponent(id)}`, {
    query: { view: 'full' },
  });
  if (meta?.is_editorial && !flags.editorial) {
    die('Bild ist Editorial — nur mit --editorial lizenzieren (und nur wenn erlaubt)');
  }
  const imageBody = { image_id: String(id) };
  if (flags.subscription) imageBody.subscription_id = flags.subscription;
  if (flags['search-id']) imageBody.search_id = flags['search-id'];
  if (flags.editorial) imageBody.editorial_acknowledgement = true;

  const raw = await apiFetch(token, base, 'POST', '/images/licenses', {
    query: { size },
    body: { images: [imageBody] },
  });
  const lic = parseLicense(raw);
  if (!lic.license_id) dieApi('Lizenzantwort ohne license_id');

  let saved = null;
  const outDir = flags.out ? path.resolve(flags.out) : null;
  if (outDir && lic.download_url) {
    const dest = path.join(outDir, `shutterstock-${id}.jpg`);
    saved = await downloadFile(lic.download_url, dest);
  }

  const payload = {
    license_id: lic.license_id,
    image_id: lic.image_id || String(id),
    allotment_charge: lic.allotment_charge,
    download_url: lic.download_url,
    path: saved,
    sandbox: Boolean(flags.sandbox),
  };
  const text = [
    `license_id\t${payload.license_id}`,
    `charge\t${payload.allotment_charge ?? '-'}`,
    `path\t${saved || '-'}`,
  ].join('\n');
  emitJsonOrText(flags, payload, text);
}

async function cmdRedownload(licenseId, flags) {
  if (!licenseId) die('redownload braucht eine license_id');
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'POST', `/images/licenses/${encodeURIComponent(licenseId)}/downloads`, {
    body: {},
  });
  const url = raw?.data?.download?.url || raw?.download?.url || raw?.url;
  if (!url) dieApi('redownload ohne download.url');
  const imageId = raw?.data?.image_id || raw?.image_id || raw?.data?.image?.id || null;
  const outDir = path.resolve(flags.out || DEFAULT_LICENSE_OUT);
  const dest = path.join(outDir, `shutterstock-${imageId || licenseId}.jpg`);
  const saved = await downloadFile(url, dest);
  const payload = { license_id: licenseId, image_id: imageId, path: saved, download_url: url };
  emitJsonOrText(flags, payload, saved);
}

async function cmdLicenses(flags) {
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'GET', '/images/licenses', {
    query: { per_page: limitOf(flags, 20), page: pageOf(flags, 1) },
  });
  const parsed = parseLicenses(raw);
  if (!parsed.items.length) {
    if (flags.json) console.log(JSON.stringify(parsed, null, 2));
    dieApi('keine Lizenzen gefunden');
  }
  const text = [
    `# total=${parsed.total_count ?? parsed.items.length}`,
    ...parsed.items.map((row) => [
      row.id,
      row.image_id || '',
      row.license,
      row.download_time || '',
      row.subscription_id || '',
      row.is_downloadable,
    ].join('\t')),
  ].join('\n');
  emitJsonOrText(flags, parsed, text);
}

async function cmdQuota(flags) {
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'GET', '/user/subscriptions');
  const subs = parseSubscriptions(raw);
  if (!subs.length) {
    if (flags.json) console.log(JSON.stringify(subs, null, 2));
    dieApi('keine Abos gefunden');
  }
  emitJsonOrText(flags, subs, formatQuota(subs));
}

async function cmdSimilar(id, flags) {
  if (!id) die('similar braucht eine Bild-ID');
  const token = readToken();
  const raw = await apiFetch(token, apiBase(flags), 'GET', `/images/${encodeURIComponent(id)}/similar`, {
    query: { per_page: limitOf(flags, 10), page: 1 },
  });
  const parsed = parseSearch({
    search_id: raw?.search_id || null,
    total_count: raw?.total_count ?? (raw?.data || []).length,
    data: raw?.data || [],
  });
  if (!parsed.items.length) {
    if (flags.json) console.log(JSON.stringify(parsed, null, 2));
    dieApi('nichts gefunden');
  }
  emitJsonOrText(flags, parsed, formatSearchText(parsed));
}

async function lookupLicenseMeta(token, licenseId) {
  // Blättert die ersten Seiten; für add mit Datei-Argument reicht ein Treffer.
  for (let page = 1; page <= 5; page++) {
    const raw = await apiFetch(token, API_LIVE, 'GET', '/images/licenses', {
      query: { per_page: 100, page },
    });
    const parsed = parseLicenses(raw);
    const hit = parsed.items.find((row) => row.id === licenseId);
    if (hit) return hit;
    if (!parsed.items.length) break;
    if (parsed.total_count != null && page * 100 >= parsed.total_count) break;
  }
  return null;
}

async function cmdAdd(source, assetsDir, flags) {
  if (!source || !assetsDir) die('add braucht <license_id|datei> und <assets-dir>');
  const dir = path.resolve(assetsDir);
  fs.mkdirSync(dir, { recursive: true });

  let datei = null;
  let licenseId = null;
  let imageId = flags['image-id'] || null;
  let subscriptionId = null;
  let licenseName = null;
  let downloadTime = null;
  let hint = null;

  if (fs.existsSync(source) && fs.statSync(source).isFile()) {
    datei = path.resolve(source);
    if (flags['image-id']) {
      // Felder aus stock licenses nachschlagen, wenn möglich — license_id bleibt null.
      try {
        const token = readToken();
        for (let page = 1; page <= 5; page++) {
          const raw = await apiFetch(token, API_LIVE, 'GET', '/images/licenses', {
            query: { per_page: 100, page },
          });
          const parsed = parseLicenses(raw);
          const hit = parsed.items.find((row) => row.image_id === String(flags['image-id']));
          if (hit) {
            licenseId = hit.id;
            subscriptionId = hit.subscription_id;
            licenseName = hit.license;
            downloadTime = hit.download_time;
            imageId = hit.image_id || imageId;
            break;
          }
          if (!parsed.items.length) break;
          if (parsed.total_count != null && page * 100 >= parsed.total_count) break;
        }
      } catch {
        // Nachschlagen ist Hilfestellung, kein Abbruch.
      }
      if (!licenseId) {
        hint = 'license_id null — Datei-Argument; Eintrag nicht in licenses gefunden';
        console.error(`stock: ${hint}`);
      }
    } else {
      hint = 'license_id null — Datei-Argument ohne --image-id';
      console.error(`stock: ${hint}`);
    }
  } else {
    licenseId = source;
    const token = readToken();
    const meta = await lookupLicenseMeta(token, licenseId);
    if (meta) {
      imageId = imageId || meta.image_id;
      subscriptionId = meta.subscription_id;
      licenseName = meta.license;
      downloadTime = meta.download_time;
    }
    const outDir = DEFAULT_LICENSE_OUT;
    fs.mkdirSync(outDir, { recursive: true });
    const raw = await apiFetch(token, API_LIVE, 'POST', `/images/licenses/${encodeURIComponent(licenseId)}/downloads`, {
      body: {},
    });
    const url = raw?.data?.download?.url || raw?.download?.url || raw?.url;
    if (!url) dieApi('redownload ohne download.url');
    imageId = imageId || raw?.data?.image_id || raw?.image_id || raw?.data?.image?.id || null;
    const dest = path.join(outDir, `shutterstock-${imageId || licenseId}.jpg`);
    datei = await downloadFile(url, dest);
  }

  const args = [BILDER, 'add', dir, datei, '--quelle', 'geliefert', '--modell', `shutterstock:${imageId || 'unbekannt'}`];
  if (flags.typ) args.push('--typ', flags.typ);
  if (flags.motiv) args.push('--motiv', flags.motiv);
  if (flags.style) args.push('--style', flags.style);

  const run = spawnSync(process.execPath, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (run.stdout) process.stdout.write(run.stdout);
  if (run.stderr) process.stderr.write(run.stderr);

  // Lizenznachweis muss auf die von bilder.mjs erzeugte AVIF zeigen, nicht auf die Quelldatei.
  const lizenzDatei = (run.status === 0 ? latestBilderDatei(dir) : null)
    || parseBilderAddDatei(run.stdout)
    || path.basename(datei);
  appendStockLizenz(dir, {
    image_id: imageId,
    license_id: licenseId,
    subscription_id: subscriptionId,
    license: licenseName,
    download_time: downloadTime,
    datei: lizenzDatei,
    hinweis: hint || undefined,
  });

  if (run.status != null && run.status !== 0) process.exit(run.status);
  if (run.error) dieApi(`bilder.mjs: ${run.error.message}`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv[0] === '-h') {
    console.log(HELP);
    process.exit(0);
  }
  const { flags, positional } = parseCli(argv);
  const [command, ...rest] = positional;
  if (!command) die('Kommando fehlt (search|show|preview|license|redownload|licenses|quota|similar|add)');

  try {
    if (command === 'search') await cmdSearch(rest[0], flags);
    else if (command === 'show') await cmdShow(rest[0], flags);
    else if (command === 'preview') await cmdPreview(rest[0], flags);
    else if (command === 'license') await cmdLicense(rest[0], flags);
    else if (command === 'redownload') await cmdRedownload(rest[0], flags);
    else if (command === 'licenses') await cmdLicenses(flags);
    else if (command === 'quota') await cmdQuota(flags);
    else if (command === 'similar') await cmdSimilar(rest[0], flags);
    else if (command === 'add') await cmdAdd(rest[0], rest[1], flags);
    else die(`unbekanntes Kommando ${command}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error && error.code === 'HOST_UNAVAILABLE') {
      console.error(`stock: ${message}`);
      process.exit(3);
    }
    console.error(`stock: ${message}`);
    process.exit(1);
  }
}

const invokedDirectly = Boolean(process.argv[1]) && (
  import.meta.url === pathToFileURL(process.argv[1]).href
  || import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
);
if (invokedDirectly) await main();
