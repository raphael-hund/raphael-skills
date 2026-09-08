#!/usr/bin/env node
// design-mcp.mjs — Refero, Mobbin und 21st per JSON-RPC (tools/call) ohne mcp__*-Tools.
// Kein npm-Dep, nur node:-Module + fetch. Schreiben nur mit --out.
//
//   node design-mcp.mjs --help

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const UA = 'raphael-web-design-mcp/1.0';
const FETCH_TIMEOUT_MS = 45_000;
const DOWNLOAD_TIMEOUT_MS = 60_000;
const RAW_STDOUT_LIMIT = 4_000;

const REFERO_URL = 'https://api.refero.design/mcp';
const MOBBIN_URL = 'https://api.mobbin.com/mcp';
const DEV21_URL = 'https://21st.dev/api/mcp';

const CLAUDE_JSON = '/root/.claude.json';
const CREDENTIALS_JSON = '/root/.claude/.credentials.json';
const AUTH_21ST = path.join(os.homedir(), '.config', '21st', 'auth.json');
const MOBBIN_REFRESH_HINT = 'python3 /root/tools/auth-relays/mobbin-refresh.py --force';

const HELP = `Usage:
  node design-mcp.mjs refero styles search|get · screens search|get|image|similar · flows search|get
  node design-mcp.mjs mobbin screens|flows|sections "<q>" [--platform web|ios] [--out <dir>] [--json]
  node design-mcp.mjs 21st search|get|inspiration|logo|theme … [--out <dir>] [--json]
  node design-mcp.mjs tools [--json]
  node design-mcp.mjs --help

Statt mcp__*/npx/open: JSON-RPC tools/call + Datei-out (kein Base64 im Kontext).
Auth: Refero Bearer ~/.claude.json · Mobbin accessToken credentials.json (mobbin|) · 21st x-api-key auth.json|API_KEY_21ST.
Mobbin SSE; bei 401: python3 /root/tools/auth-relays/mobbin-refresh.py --force (Exit 3).
Exit: 0 ok · 1 nichts gefunden · 2 Bedienfehler · 3 HOST_UNAVAILABLE/Auth.
Lizenz: nur Inspiration — keine 1:1-Übernahme von Screens/Code/Marken.`;

function die(message) {
  console.error(`design-mcp: ${message}\n\n${HELP}`);
  process.exit(2);
}

function dieApi(message, code = 1) {
  console.error(`design-mcp: ${message}`);
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

function ensureOutDir(flags, why) {
  if (!flags.out) die(`${why} braucht --out <verzeichnis>`);
  const dest = path.resolve(flags.out);
  fs.mkdirSync(dest, { recursive: true });
  return dest;
}

function writeOut(file, content, encoding = 'utf8') {
  const dest = path.resolve(file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, encoding);
  return dest;
}

function safeSlug(value, fallback = 'item') {
  const slug = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || fallback;
}

function siteName(site) {
  if (!site) return '';
  if (typeof site === 'string') return site;
  return site.name || site.title || site.domain || site.url || '';
}

function truncateStdout(text) {
  const raw = String(text || '');
  if (raw.length <= RAW_STDOUT_LIMIT) return raw;
  return `${raw.slice(0, RAW_STDOUT_LIMIT)}\n… [gekuerzt ${raw.length} Zeichen; --out nutzen fuer Volltext]`;
}

export function parseCli(argv) {
  const flags = {
    json: false,
    limit: null,
    page: null,
    out: null,
    platform: null,
    mode: null,
    type: null,
    size: null,
  };
  const positional = [];
  const knownBool = new Set(['--json', '--help']);
  const knownValue = new Set(['--limit', '--page', '--out', '--platform', '--mode', '--type', '--size']);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (knownValue.has(arg)) {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) die(`${arg} braucht einen Wert`);
      i += 1;
      flags[arg.slice(2)] = value;
    } else if (arg.startsWith('--')) {
      if (!knownBool.has(arg) && !knownValue.has(arg)) die(`unbekanntes Flag ${arg}`);
    } else positional.push(arg);
  }
  return { flags, positional };
}

function readJsonFile(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function readReferoAuth(claudeJson) {
  const headers = claudeJson?.mcpServers?.refero?.headers || {};
  const auth = headers.Authorization || headers.authorization || null;
  if (!auth) return null;
  return String(auth);
}

export function readMobbinToken(credentials) {
  const oauth = credentials?.mcpOAuth || {};
  const key = Object.keys(oauth).find((k) => String(k).startsWith('mobbin|'));
  if (!key) return null;
  const entry = oauth[key];
  const token = entry?.accessToken || null;
  return token ? String(token) : null;
}

export function read21stToken(authJson, env = process.env) {
  if (env.API_KEY_21ST) return String(env.API_KEY_21ST);
  if (!authJson) return null;
  const token = authJson.token || authJson['.token'] || null;
  return token ? String(token) : null;
}

function loadReferoAuth() {
  let data;
  try {
    data = readJsonFile(CLAUDE_JSON);
  } catch (error) {
    die(`Refero-Auth nicht lesbar (${CLAUDE_JSON}): ${error instanceof Error ? error.message : String(error)}`);
  }
  const auth = readReferoAuth(data);
  if (!auth) die(`Refero Authorization fehlt in ${CLAUDE_JSON} (mcpServers.refero.headers.Authorization)`);
  return auth;
}

function loadMobbinToken() {
  let data;
  try {
    data = readJsonFile(CREDENTIALS_JSON);
  } catch (error) {
    die(`Mobbin-Auth nicht lesbar (${CREDENTIALS_JSON}): ${error instanceof Error ? error.message : String(error)}`);
  }
  const token = readMobbinToken(data);
  if (!token) die(`Mobbin accessToken fehlt in ${CREDENTIALS_JSON} (mcpOAuth Key beginnt mit mobbin|). ${MOBBIN_REFRESH_HINT}`);
  return token;
}

function load21stToken() {
  if (process.env.API_KEY_21ST) return String(process.env.API_KEY_21ST);
  let data = null;
  try {
    data = readJsonFile(AUTH_21ST);
  } catch (error) {
    die(`21st-Auth nicht lesbar (${AUTH_21ST}) und API_KEY_21ST fehlt: ${error instanceof Error ? error.message : String(error)}`);
  }
  const token = read21stToken(data, process.env);
  if (!token) die(`21st token fehlt in ${AUTH_21ST} (.token) und API_KEY_21ST ist leer`);
  return token;
}

export function parseSseJsonRpc(raw) {
  const text = String(raw || '');
  let last = null;
  let lastError = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('data:')) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === '[DONE]') continue;
    // Jedes data:-Event einzeln parsen; letztes vollstaendiges jsonrpc-result gewinnt.
    try {
      const obj = JSON.parse(payload);
      if (obj && typeof obj === 'object' && (Object.prototype.hasOwnProperty.call(obj, 'result') || Object.prototype.hasOwnProperty.call(obj, 'error'))) {
        last = obj;
      }
    } catch (error) {
      lastError = error;
    }
  }
  if (last) return last;
  const trimmed = text.trim();
  if (trimmed.startsWith('{')) return JSON.parse(trimmed);
  if (lastError) throw lastError;
  throw new Error('keine SSE data:-Zeile');
}

export function extractMcpText(rpc) {
  const content = rpc?.result?.content;
  if (!Array.isArray(content)) return '';
  const texts = content.filter((c) => c && c.type === 'text' && typeof c.text === 'string').map((c) => c.text);
  if (!texts.length) return '';
  // Mobbin mischt JSON-Text mit Caption-Zeilen/Images: ersten JSON-Block bevorzugen.
  const jsonPart = texts.find((t) => {
    const trimmed = String(t || '').trim();
    return trimmed.startsWith('{') || trimmed.startsWith('[');
  });
  if (jsonPart && texts.length > 1) return jsonPart;
  return texts.join('\n\n');
}

export function extractMcpImages(rpc) {
  const content = rpc?.result?.content;
  if (!Array.isArray(content)) return [];
  return content.filter((c) => c && c.type === 'image' && c.data);
}

function endOfJsonValue(raw) {
  const s = String(raw || '');
  const start = s.search(/[\{\[]/);
  if (start < 0) return -1;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (ch === '\\') {
        escape = true;
        continue;
      }
      if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{' || ch === '[') depth += 1;
    else if (ch === '}' || ch === ']') {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

export function parseJsonText(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (firstError) {
    // Mobbin haengt nach dem JSON Caption-Text an ("JSON after JSON").
    const end = endOfJsonValue(raw);
    if (end > 0) {
      try {
        return JSON.parse(raw.slice(0, end));
      } catch {
        throw firstError;
      }
    }
    throw firstError;
  }
}

export function parseReferoStyleRecords(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  const data = parseJsonText(text);
  const records = data?.records || [];
  return records.map((row) => ({
    id: row.uuid || row.id || row.style_id || '',
    title: row.title || row.name || '',
    url: row.url || (row.uuid ? `https://styles.refero.design/style/${row.uuid}` : ''),
    platform: row.platform || '',
    preview_url: row.preview_url || '',
    description: row.description || '',
  })).filter((row) => row.id);
}

function asReferoScreenRows(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.records)) return data.records;
  if (Array.isArray(data.screens)) return data.screens;
  if (data.screen && typeof data.screen === 'object') return [data.screen];
  if (data.data != null) {
    const nested = asReferoScreenRows(data.data);
    if (nested.length) return nested;
  }
  if (data.uuid || data.id || data.screen_id) return [data];
  return [];
}

export function parseReferoScreenRecords(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  let data = null;
  try {
    data = parseJsonText(text);
  } catch {
    data = null;
  }
  const records = asReferoScreenRows(data);
  return records.map((row) => ({
    id: row.uuid || row.id || row.screen_id || '',
    title: siteName(row.site) || row.title || row.name || '',
    url: row.refero_url || row.page_url || '',
    page_url: row.page_url || '',
    platform: row.platform || '',
    thumbnail_url: row.thumbnail_url || '',
    content: typeof row.content === 'string' ? row.content : '',
  })).filter((row) => row.id);
}

export function parseReferoFlowRecords(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  const data = parseJsonText(text);
  const records = data?.records || [];
  return records.map((row) => ({
    id: row.id ?? row.flow_id ?? '',
    title: row.name || row.title || '',
    url: row.refero_url || '',
    platform: row.platform || '',
    screens_count: row.screens_count ?? null,
    site: siteName(row.site),
    description: row.description || '',
  })).filter((row) => row.id !== '' && row.id != null);
}

export function parseReferoStyleMarkdown(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  return String(text || '').trim() ? `${String(text).trim()}\n` : '';
}

export function parseReferoStyleTitle(markdown) {
  const m = String(markdown || '').match(/^#\s+(.+?)(?:\s+—|\s+-|\n|$)/m);
  return m ? m[1].trim() : 'style';
}

export function parseMobbinScreens(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  const data = parseJsonText(text);
  const screens = data?.screens || [];
  return screens.map((row) => ({
    id: row.id || '',
    title: row.app_name || row.name || '',
    url: row.mobbin_url || '',
    image_url: row.image_url || '',
    platform: row.platform || '',
    app: row.app_name || '',
  })).filter((row) => row.id);
}

export function parseMobbinFlows(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  const data = parseJsonText(text);
  const flows = data?.flows || [];
  return flows.map((row) => ({
    id: row.id || '',
    title: row.name || '',
    url: row.mobbin_url || '',
    app: row.app_name || '',
    platform: row.platform || '',
    screen_count: row.screen_count ?? null,
    image_url: row.screens?.[0]?.image_url || row.image_url || '',
  })).filter((row) => row.id);
}

export function parseMobbinSections(rpcOrText) {
  const text = typeof rpcOrText === 'string' ? rpcOrText : extractMcpText(rpcOrText);
  const data = parseJsonText(text);
  const sections = data?.sections || [];
  return sections.map((row) => ({
    id: row.id || '',
    title: row.site_name || row.name || '',
    url: row.mobbin_url || '',
    image_url: row.image_url || '',
    site: row.site_name || '',
  })).filter((row) => row.id);
}

export function parse21stSearch(text) {
  const raw = String(text || '');
  const items = [];
  const re = /###\s+\[([^\]]+)\]\s+(.+?)\s+\[id:\s*([^\]]+)\]\s*\nby\s+([^\n]+)/g;
  for (const match of raw.matchAll(re)) {
    const type = match[1].trim();
    const title = match[2].trim();
    const id = match[3].trim();
    const author = match[4].trim();
    const after = raw.slice(match.index, match.index + 600);
    const preview = after.match(/preview:\s*(\S+)/)?.[1] || '';
    const install = after.match(/install:\s*(.+)/)?.[1]?.trim() || '';
    items.push({ id, type, title, author, preview, install, url: preview || `https://21st.dev` });
  }
  return items;
}

export function parse21stInspiration(text) {
  const raw = String(text || '');
  const items = [];
  const re = /(\d+)\.\s+\[([^\]]+)\]\s+(.+?)\s+\((\d+)%\)\s*\n\s*(?:Matches[^\n]*\n\s*)?(https?:\/\/\S+)/g;
  for (const match of raw.matchAll(re)) {
    items.push({
      rank: Number(match[1]),
      type: match[2].trim(),
      title: match[3].trim(),
      confidence: Number(match[4]),
      url: match[5].trim(),
    });
  }
  return items;
}

export function parse21stLogo(text) {
  const raw = String(text || '');
  const items = [];
  const re = /###\s+([^\n[]+?)\s+\[([^\]]+)\]\s*\n(?:svg:\s*(\S+)\s*\n)?(?:dark:\s*(\S+)\s*\n)?(?:site:\s*(\S+)\s*\n)?/g;
  for (const match of raw.matchAll(re)) {
    items.push({
      title: match[1].trim(),
      category: match[2].trim(),
      svg: match[3] || '',
      dark: match[4] || '',
      site: match[5] || '',
      url: match[3] || match[5] || '',
    });
  }
  return items;
}

export function parse21stComponentFiles(text) {
  const raw = String(text || '');
  const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() || 'component';
  const base = title.replace(/\s+—\s+.*$/, '').trim() || 'component';
  const fences = [...raw.matchAll(/##\s+(Component|Demo)(?:\s+\([^)\n]+\))?\s*\n```tsx\n([\s\S]*?)```/g)];
  let component = null;
  let demo = null;
  for (const fence of fences) {
    if (fence[1] === 'Component') component = fence[2].replace(/\s+$/, '') + '\n';
    if (fence[1] === 'Demo') demo = fence[2].replace(/\s+$/, '') + '\n';
  }
  // Fallback: first two tsx fences
  if (!component) {
    const all = [...raw.matchAll(/```tsx\n([\s\S]*?)```/g)];
    if (all[0]) component = all[0][1].replace(/\s+$/, '') + '\n';
    if (all[1]) demo = all[1][1].replace(/\s+$/, '') + '\n';
  }
  return { title: base, component, demo, install: raw.match(/install:\s*(.+)/)?.[1]?.trim() || '' };
}

export function parse21stThemeCss(text) {
  const raw = String(text || '');
  const title = raw.match(/^#\s+(.+?)(?:\s*\(theme\))?$/m)?.[1]?.trim() || 'theme';
  const css = raw.match(/```css\n([\s\S]*?)```/)?.[1];
  return {
    title,
    css: css ? `${css.replace(/\s+$/, '')}\n` : '',
    page: raw.match(/page:\s*(\S+)/)?.[1] || '',
  };
}

export function parseToolsList(rpc) {
  const tools = rpc?.result?.tools || [];
  return tools.map((t) => t.name).filter(Boolean);
}

export function extFromMime(mime, fallback = '.bin') {
  const m = String(mime || '').toLowerCase();
  if (m.includes('png')) return '.png';
  if (m.includes('jpeg') || m.includes('jpg')) return '.jpg';
  if (m.includes('webp')) return '.webp';
  if (m.includes('gif')) return '.gif';
  if (m.includes('svg')) return '.svg';
  return fallback;
}

export function decodeImageData(data) {
  if (Buffer.isBuffer(data)) return data;
  const raw = String(data || '');
  // data-URL vermeiden/abschneiden, nur payload nehmen
  const comma = raw.indexOf(',');
  const b64 = raw.startsWith('data:') && comma >= 0 ? raw.slice(comma + 1) : raw;
  return Buffer.from(b64, 'base64');
}

async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (error) {
    if (error?.name === 'AbortError') {
      const err = new Error(`Timeout nach ${timeoutMs}ms (${url})`);
      err.code = 'HOST_UNAVAILABLE';
      throw err;
    }
    const err = new Error(error instanceof Error ? error.message : String(error));
    err.code = 'HOST_UNAVAILABLE';
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function mcpRequest({ url, headers, method, params, sse = false }) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method,
    params: params || {},
  });
  const accept = sse ? 'application/json, text/event-stream' : 'application/json';
  let response;
  try {
    response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        Accept: accept,
        'Content-Type': 'application/json',
        'User-Agent': UA,
        ...headers,
      },
      body,
    }, FETCH_TIMEOUT_MS);
  } catch (error) {
    dieApi(`${url}: ${error.message}`, 3);
  }

  if (response.status === 401 && sse) {
    dieApi(`Mobbin 401 Unauthorized — Token refreshen: ${MOBBIN_REFRESH_HINT}`, 3);
  }
  if (response.status === 401) {
    dieApi(`${url}: 401 Unauthorized`, 3);
  }
  if (response.status === 406) {
    dieApi(`${url}: 406 Not Acceptable (Accept-Header pruefen)`, 3);
  }
  if (!response.ok) {
    const snippet = (await response.text().catch(() => '')).slice(0, 240).replace(/\s+/g, ' ');
    dieApi(`${url}: HTTP ${response.status}${snippet ? ` — ${snippet}` : ''}`, response.status >= 500 ? 3 : 1);
  }

  const raw = await response.text();
  let rpc;
  try {
    rpc = sse ? parseSseJsonRpc(raw) : JSON.parse(raw);
  } catch (error) {
    dieApi(`Antwort nicht parsebar: ${error instanceof Error ? error.message : String(error)}`, 1);
  }
  if (rpc?.error) {
    const msg = rpc.error.message || JSON.stringify(rpc.error);
    dieApi(`JSON-RPC Fehler: ${msg}`, 1);
  }
  if (rpc?.result?.isError) {
    const msg = extractMcpText(rpc) || 'isError=true';
    dieApi(msg, 1);
  }
  return rpc;
}

async function downloadBinary(url, headers = {}) {
  let response;
  try {
    response = await fetchWithTimeout(url, {
      method: 'GET',
      headers: { 'User-Agent': UA, ...headers },
    }, DOWNLOAD_TIMEOUT_MS);
  } catch (error) {
    dieApi(`Download ${url}: ${error.message}`, 3);
  }
  if (!response.ok) dieApi(`Download ${url}: HTTP ${response.status}`, 1);
  const buf = Buffer.from(await response.arrayBuffer());
  const mime = response.headers.get('content-type') || '';
  return { buf, mime };
}

function formatRows(rows, columns) {
  return rows.map((row) => columns.map((c) => row[c] ?? '').join('\t')).join('\n');
}

function requirePlatform(flags) {
  const p = flags.platform;
  if (p !== 'web' && p !== 'ios') die('--platform web|ios ist Pflicht');
  return p;
}

async function cmdTools(flags) {
  const referoAuth = loadReferoAuth();
  const mobToken = loadMobbinToken();
  const tok21 = load21stToken();

  const [refero, mobbin, dev21] = await Promise.all([
    mcpRequest({
      url: REFERO_URL,
      headers: { Authorization: referoAuth },
      method: 'tools/list',
      params: {},
    }),
    mcpRequest({
      url: MOBBIN_URL,
      headers: { Authorization: `Bearer ${mobToken}` },
      method: 'tools/list',
      params: {},
      sse: true,
    }),
    mcpRequest({
      url: DEV21_URL,
      headers: { 'x-api-key': tok21 },
      method: 'tools/list',
      params: {},
    }),
  ]);

  const data = {
    refero: parseToolsList(refero),
    mobbin: parseToolsList(mobbin),
    '21st': parseToolsList(dev21),
  };
  const text = [
    `refero\t${data.refero.join(',')}`,
    `mobbin\t${data.mobbin.join(',')}`,
    `21st\t${data['21st'].join(',')}`,
  ].join('\n');
  emitJsonOrText(flags, data, text);
}

async function cmdRefero(subcommand, rest, flags) {
  const auth = loadReferoAuth();
  const headers = { Authorization: auth };

  if (subcommand === 'styles') {
    const action = rest[0];
    if (action === 'search') {
      const query = rest.slice(1).join(' ').trim();
      if (!query) die('refero styles search braucht eine Query');
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_search_styles',
          arguments: { query, page: pageOf(flags, 1), response_format: 'json' },
        },
      });
      const items = parseReferoStyleRecords(rpc);
      if (!items.length) {
        if (flags.json) console.log('[]');
        dieApi('nichts gefunden', 1);
      }
      emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      return;
    }
    if (action === 'get') {
      const idsRaw = rest[1];
      if (!idsRaw) die('refero styles get braucht uuid[,uuid]');
      const ids = idsRaw.split(',').map((s) => s.trim()).filter(Boolean);
      if (!ids.length) die('refero styles get braucht uuid[,uuid]');
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_get_style',
          arguments: ids.length === 1
            ? { style_id: ids[0], response_format: 'md' }
            : { style_ids: ids, response_format: 'md' },
        },
      });
      const md = parseReferoStyleMarkdown(rpc);
      if (!md) dieApi('nichts gefunden', 1);
      const out = [];
      if (flags.out) {
        const dir = ensureOutDir(flags, 'refero styles get');
        // Bei mehreren IDs kommt oft ein kombinierter Markdown; je Style-Heading splitten.
        const chunks = md.split(/(?=^# )/m).map((c) => c.trim()).filter(Boolean);
        const parts = chunks.length ? chunks : [md.trim()];
        for (let i = 0; i < parts.length; i++) {
          const body = `${parts[i].trim()}\n`;
          const title = parseReferoStyleTitle(body);
          const id = ids[i] || safeSlug(title);
          const file = writeOut(path.join(dir, `${safeSlug(id)}.md`), body);
          out.push({ id, title, file });
        }
        emitJsonOrText(flags, out, formatRows(out, ['id', 'title', 'file']));
      } else {
        const payload = { ids, markdown: md };
        emitJsonOrText(flags, payload, truncateStdout(md));
      }
      return;
    }
    die(`unbekanntes refero styles Kommando: ${action || '(fehlt)'}`);
  }

  if (subcommand === 'screens') {
    const action = rest[0];
    if (action === 'search') {
      const query = rest.slice(1).join(' ').trim();
      if (!query) die('refero screens search braucht eine Query');
      const platform = requirePlatform(flags);
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_search_screens',
          arguments: { query, platform, page: pageOf(flags, 1), response_format: 'json' },
        },
      });
      const items = parseReferoScreenRecords(rpc);
      if (!items.length) {
        if (flags.json) console.log('[]');
        dieApi('nichts gefunden', 1);
      }
      emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      return;
    }
    if (action === 'get') {
      const idsRaw = rest[1];
      if (!idsRaw) die('refero screens get braucht id[,id]');
      const ids = idsRaw.split(',').map((s) => s.trim()).filter(Boolean);
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_get_screen',
          arguments: ids.length === 1
            ? { screen_id: ids[0], response_format: 'json' }
            : { screen_ids: ids, response_format: 'json' },
        },
      });
      const items = parseReferoScreenRecords(rpc);
      if (!items.length) {
        if (flags.json) console.log('[]');
        dieApi('nichts gefunden', 1);
      }
      emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      return;
    }
    if (action === 'image') {
      const id = rest[1];
      if (!id) die('refero screens image braucht eine id');
      const dir = ensureOutDir(flags, 'refero screens image');
      const size = flags.size === 'full' ? 'full' : 'thumbnail';
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_get_screen_image',
          arguments: { screen_id: id, image_size: size },
        },
      });
      const images = extractMcpImages(rpc);
      if (!images.length) dieApi('kein Bild in der Antwort', 1);
      const img = images[0];
      const ext = extFromMime(img.mimeType, '.jpg');
      const file = writeOut(path.join(dir, `${safeSlug(id)}${ext}`), decodeImageData(img.data));
      // Nur Pfad ausgeben (kein Base64)
      const payload = { id, file, mimeType: img.mimeType || '' };
      emitJsonOrText(flags, payload, file);
      return;
    }
    if (action === 'similar') {
      const id = rest[1];
      if (!id) die('refero screens similar braucht eine id');
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_get_similar_screens',
          arguments: { screen_id: id, limit: limitOf(flags, 5), response_format: 'json' },
        },
      });
      const items = parseReferoScreenRecords(rpc);
      if (!items.length) {
        if (flags.json) console.log('[]');
        dieApi('nichts gefunden', 1);
      }
      emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      return;
    }
    die(`unbekanntes refero screens Kommando: ${action || '(fehlt)'}`);
  }

  if (subcommand === 'flows') {
    const action = rest[0];
    if (action === 'search') {
      const query = rest.slice(1).join(' ').trim();
      if (!query) die('refero flows search braucht eine Query');
      const platform = requirePlatform(flags);
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_search_flows',
          arguments: { query, platform, page: pageOf(flags, 1), response_format: 'json' },
        },
      });
      const items = parseReferoFlowRecords(rpc);
      if (!items.length) {
        if (flags.json) console.log('[]');
        dieApi('nichts gefunden', 1);
      }
      emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      return;
    }
    if (action === 'get') {
      const idRaw = rest[1];
      if (!idRaw) die('refero flows get braucht eine id');
      const ids = idRaw.split(',').map((s) => s.trim()).filter(Boolean).map((v) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : v;
      });
      const rpc = await mcpRequest({
        url: REFERO_URL,
        headers,
        method: 'tools/call',
        params: {
          name: 'refero_get_flow',
          arguments: ids.length === 1
            ? { flow_id: ids[0], response_format: 'json' }
            : { flow_ids: ids, response_format: 'json' },
        },
      });
      const items = parseReferoFlowRecords(rpc);
      if (!items.length) {
        // get liefert oft ein grosses JSON — falls Records leer, Rohtext kuerzen
        const text = extractMcpText(rpc);
        if (!text) dieApi('nichts gefunden', 1);
        if (flags.out) {
          const dir = ensureOutDir(flags, 'refero flows get');
          const file = writeOut(path.join(dir, `flow-${safeSlug(String(ids[0]))}.json`), `${text}\n`);
          emitJsonOrText(flags, { id: ids[0], file }, file);
        } else {
          emitJsonOrText(flags, { id: ids[0], text }, truncateStdout(text));
        }
        return;
      }
      if (!flags.json && !flags.out) {
        emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      } else if (flags.out) {
        const dir = ensureOutDir(flags, 'refero flows get');
        const text = extractMcpText(rpc);
        const file = writeOut(path.join(dir, `flow-${safeSlug(String(ids[0]))}.json`), `${text}\n`);
        emitJsonOrText(flags, { ...items[0], file }, formatRows([{ ...items[0], file }], ['id', 'title', 'url', 'file']));
      } else {
        emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'url']));
      }
      return;
    }
    die(`unbekanntes refero flows Kommando: ${action || '(fehlt)'}`);
  }

  die(`unbekanntes refero Kommando: ${subcommand || '(fehlt)'}`);
}

async function saveMobbinImages(items, dir, token) {
  const out = [];
  for (const item of items) {
    let file = '';
    if (item.image_url) {
      const { buf, mime } = await downloadBinary(item.image_url, {
        Authorization: `Bearer ${token}`,
        Accept: 'image/*,application/octet-stream',
      });
      const ext = extFromMime(mime, path.extname(new URL(item.image_url).pathname) || '.jpg');
      file = writeOut(path.join(dir, `${safeSlug(item.id)}${ext || '.jpg'}`), buf);
    }
    out.push({ ...item, file });
  }
  return out;
}

async function cmdMobbin(subcommand, rest, flags) {
  const token = loadMobbinToken();
  const headers = { Authorization: `Bearer ${token}` };
  const query = rest.join(' ').trim();

  if (subcommand === 'screens') {
    if (!query) die('mobbin screens braucht eine Query');
    const platform = requirePlatform(flags);
    const mode = flags.mode || 'standard';
    if (mode !== 'standard' && mode !== 'deep') die('--mode standard|deep');
    const rpc = await mcpRequest({
      url: MOBBIN_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'search_screens',
        arguments: {
          query,
          platform,
          mode,
          limit: limitOf(flags, 5),
          image_format: 'jpg',
        },
      },
      sse: true,
    });
    let items = parseMobbinScreens(rpc);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    if (flags.out) {
      const dir = ensureOutDir(flags, 'mobbin screens');
      items = await saveMobbinImages(items, dir, token);
    }
    emitJsonOrText(
      flags,
      items,
      formatRows(items.map((r) => ({ id: r.id, app: r.app || r.title, mobbin_url: r.url, datei: r.file || '' })), ['id', 'app', 'mobbin_url', 'datei']),
    );
    return;
  }

  if (subcommand === 'flows') {
    if (!query) die('mobbin flows braucht eine Query');
    const platform = requirePlatform(flags);
    const rpc = await mcpRequest({
      url: MOBBIN_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'search_flows',
        arguments: {
          query,
          platform,
          limit: limitOf(flags, 5),
          image_format: 'jpg',
        },
      },
      sse: true,
    });
    let items = parseMobbinFlows(rpc);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    if (flags.out) {
      const dir = ensureOutDir(flags, 'mobbin flows');
      items = await saveMobbinImages(items, dir, token);
    }
    emitJsonOrText(
      flags,
      items,
      formatRows(items.map((r) => ({ id: r.id, app: r.app || r.title, mobbin_url: r.url, datei: r.file || '' })), ['id', 'app', 'mobbin_url', 'datei']),
    );
    return;
  }

  if (subcommand === 'sections') {
    if (!query) die('mobbin sections braucht eine Query');
    const rpc = await mcpRequest({
      url: MOBBIN_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'search_sections',
        arguments: {
          query,
          limit: limitOf(flags, 5),
          image_format: 'jpg',
        },
      },
      sse: true,
    });
    let items = parseMobbinSections(rpc);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    if (flags.out) {
      const dir = ensureOutDir(flags, 'mobbin sections');
      items = await saveMobbinImages(items, dir, token);
    }
    emitJsonOrText(
      flags,
      items,
      formatRows(items.map((r) => ({ id: r.id, app: r.site || r.title, mobbin_url: r.url, datei: r.file || '' })), ['id', 'app', 'mobbin_url', 'datei']),
    );
    return;
  }

  die(`unbekanntes mobbin Kommando: ${subcommand || '(fehlt)'}`);
}

async function cmd21st(subcommand, rest, flags) {
  const token = load21stToken();
  const headers = { 'x-api-key': token };

  if (subcommand === 'search') {
    const query = rest.join(' ').trim();
    if (!query) die('21st search braucht eine Query');
    const type = flags.type || undefined;
    if (type && !['component', 'theme', 'template', 'all'].includes(type)) {
      die('--type component|theme|template');
    }
    const rpc = await mcpRequest({
      url: DEV21_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'search',
        arguments: {
          query,
          ...(type ? { type } : {}),
          limit: limitOf(flags, 8),
        },
      },
    });
    const text = extractMcpText(rpc);
    const items = parse21stSearch(text);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    emitJsonOrText(flags, items, formatRows(items, ['id', 'title', 'author']));
    return;
  }

  if (subcommand === 'get') {
    const idRaw = rest[0];
    if (!idRaw) die('21st get braucht eine id');
    const id = Number(idRaw);
    if (!Number.isFinite(id)) die('21st get id muss eine Zahl sein');
    const rpc = await mcpRequest({
      url: DEV21_URL,
      headers,
      method: 'tools/call',
      params: { name: 'get_component', arguments: { id } },
    });
    const text = extractMcpText(rpc);
    const parsed = parse21stComponentFiles(text);
    if (!parsed.component) dieApi('keine Component-TSX in der Antwort', 1);
    if (flags.out) {
      const dir = ensureOutDir(flags, '21st get');
      const slug = safeSlug(parsed.title);
      const files = [];
      const compFile = writeOut(path.join(dir, `${slug}.tsx`), parsed.component);
      files.push(compFile);
      let demoFile = '';
      if (parsed.demo) {
        demoFile = writeOut(path.join(dir, `${slug}.demo.tsx`), parsed.demo);
        files.push(demoFile);
      }
      const payload = { id, title: parsed.title, files, install: parsed.install };
      emitJsonOrText(flags, payload, formatRows([{ id, title: parsed.title, url: '', datei: files.join(',') }], ['id', 'title', 'url', 'datei']).replace(/\t\t/g, '\t'));
    } else {
      emitJsonOrText(flags, { id, ...parsed, text }, truncateStdout(text));
    }
    return;
  }

  if (subcommand === 'inspiration') {
    const query = rest.join(' ').trim();
    if (!query) die('21st inspiration braucht eine Query');
    const rpc = await mcpRequest({
      url: DEV21_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'get_inspiration',
        arguments: { query, limit: limitOf(flags, 8) },
      },
    });
    const text = extractMcpText(rpc);
    const items = parse21stInspiration(text);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    emitJsonOrText(flags, items, formatRows(items, ['title', 'type', 'url']));
    return;
  }

  if (subcommand === 'logo') {
    const query = rest.join(' ').trim();
    if (!query) die('21st logo braucht eine Query');
    const rpc = await mcpRequest({
      url: DEV21_URL,
      headers,
      method: 'tools/call',
      params: {
        name: 'search_logo',
        arguments: { query, limit: limitOf(flags, 8) },
      },
    });
    const text = extractMcpText(rpc);
    let items = parse21stLogo(text);
    if (!items.length) {
      if (flags.json) console.log('[]');
      dieApi('nichts gefunden', 1);
    }
    if (flags.out) {
      const dir = ensureOutDir(flags, '21st logo');
      const saved = [];
      for (const item of items) {
        if (!item.svg) continue;
        const { buf } = await downloadBinary(item.svg);
        const file = writeOut(path.join(dir, `${safeSlug(item.title)}.svg`), buf);
        saved.push({ ...item, file });
      }
      items = saved.length ? saved : items;
      emitJsonOrText(flags, items, formatRows(items.map((r) => ({ id: r.title, title: r.title, url: r.svg || r.url, datei: r.file || '' })), ['id', 'title', 'url', 'datei']));
    } else {
      emitJsonOrText(flags, items, formatRows(items.map((r) => ({ id: r.title, title: r.title, url: r.svg || r.url })), ['id', 'title', 'url']));
    }
    return;
  }

  if (subcommand === 'theme') {
    const id = rest[0];
    if (!id) die('21st theme braucht eine id');
    const rpc = await mcpRequest({
      url: DEV21_URL,
      headers,
      method: 'tools/call',
      params: { name: 'get_theme', arguments: { id } },
    });
    const text = extractMcpText(rpc);
    const parsed = parse21stThemeCss(text);
    if (!parsed.css) dieApi('kein CSS in der Antwort', 1);
    if (flags.out) {
      const dir = ensureOutDir(flags, '21st theme');
      const file = writeOut(path.join(dir, `${safeSlug(parsed.title || id)}.css`), parsed.css);
      emitJsonOrText(flags, { id, title: parsed.title, page: parsed.page, file }, `${id}\t${parsed.title}\t${parsed.page}\t${file}`);
    } else {
      emitJsonOrText(flags, { id, ...parsed }, truncateStdout(parsed.css));
    }
    return;
  }

  die(`unbekanntes 21st Kommando: ${subcommand || '(fehlt)'}`);
}

async function main(argv) {
  const { flags, positional } = parseCli(argv);
  if (positional.length === 0 || positional[0] === 'help' || argv.includes('--help')) {
    console.log(HELP);
    process.exit(0);
  }
  const [source, ...rest] = positional;
  if (source === 'tools') {
    await cmdTools(flags);
    return;
  }
  if (source === 'refero') {
    await cmdRefero(rest[0], rest.slice(1), flags);
    return;
  }
  if (source === 'mobbin') {
    await cmdMobbin(rest[0], rest.slice(1), flags);
    return;
  }
  if (source === '21st') {
    await cmd21st(rest[0], rest.slice(1), flags);
    return;
  }
  die(`unbekannte Quelle ${source} (refero|mobbin|21st|tools)`);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`design-mcp: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(error?.code === 'HOST_UNAVAILABLE' ? 3 : 1);
  });
}
