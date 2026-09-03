#!/usr/bin/env node
// Liest UI-Inspiration (Refero, Navbar Gallery, Magic UI, React Bits, 21st)
// über Jina Reader, sonst Firecrawl. Kein Login, kein Cache, Schreiben nur mit --out.
//
//   node inspiration.mjs --help
//   node inspiration.mjs refero search "<query>" [--limit 10] [--json]
//   node inspiration.mjs refero get <styleId|url> [--out <datei.md>] [--json]
//   node inspiration.mjs navbar list [typ] [--limit 20] [--json]
//   node inspiration.mjs navbar get <slug|url> [--json]
//   node inspiration.mjs magicui list [--grep <substr>] [--json]
//   node inspiration.mjs magicui get <name> [--out <pfad.tsx>] [--json]
//   node inspiration.mjs reactbits list [--grep <substr>] [--all] [--json]
//   node inspiration.mjs reactbits get <Name> [--out <pfad.tsx>] [--json]
//   node inspiration.mjs 21st search <kategorie|begriff> [--limit 20] [--json]
//   node inspiration.mjs 21st get <@author/slug|url> [--json]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const UA = 'raphael-web-inspiration/1.0';
const FETCH_TIMEOUT_MS = 45_000;
const FIRECRAWL_TIMEOUT_MS = 60_000;
const JINA = 'https://r.jina.ai/';
const STYLE_UUID = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';
const REACTBITS_SUFFIX = /-(?:JS|TS)-(?:CSS|TW)$/;

const HELP = `Usage:
  node inspiration.mjs refero search "<query>" [--limit 10] [--json]
  node inspiration.mjs refero get <styleId|url> [--out <datei.md>] [--json]
  node inspiration.mjs navbar list [static|dropdowns|mega-menu|side-bar|search-bar|<typ>] [--limit 20] [--json]
  node inspiration.mjs navbar get <slug|url> [--json]
  node inspiration.mjs magicui list [--grep <substr>] [--json]
  node inspiration.mjs magicui get <name> [--out <pfad.tsx>] [--json]
  node inspiration.mjs reactbits list [--grep <substr>] [--all] [--json]
  node inspiration.mjs reactbits get <Name> [--out <pfad.tsx>] [--json]
  node inspiration.mjs 21st search <kategorie|begriff> [--limit 20] [--json]
  node inspiration.mjs 21st get <@author/slug|url> [--json]
  node inspiration.mjs --help

Liest Seiten über https://r.jina.ai/<url>; Fallback: firecrawl scrape <url> -f markdown --only-main-content.
Registry-JSON (Magic UI, React Bits) per fetch. Timeout 45s, User-Agent ${UA}.
Kein Cache, kein Login, keine Cookies. Schreiben nur mit --out.

Exit: 0 ok · 1 nichts gefunden · 2 Bedienfehler · 3 HOST_UNAVAILABLE (Kanal in der Meldung).

Lizenz: Refero, Navbar Gallery, 21st = Inspiration/Analyse (Muster, Tokens, Struktur),
keine Layout-/Asset-Kopie. Magic UI (MIT) und React Bits (MIT, Registry) = einzelne
Komponente übernehmbar, danach Werkzeugtabelle in art-direction.md + Router-Anker
#sections/#motion/#background, wie tool-usecase-router.md verlangt.`;

function die(message) {
  console.error(`inspiration: ${message}\n\n${HELP}`);
  process.exit(2);
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

function limitOf(flags, fallback) {
  if (flags.limit == null) return fallback;
  const n = Number(flags.limit);
  if (!Number.isInteger(n) || n < 1) die('--limit muss eine ganze Zahl >= 1 sein');
  return n;
}

function applyLimit(items, n) {
  return items.slice(0, n);
}

function emptyResult(flags) {
  if (flags.json) console.log('[]');
  console.error('inspiration: nichts gefunden');
  process.exit(1);
}

function emitJsonOrText(flags, data, text) {
  if (flags.json) console.log(JSON.stringify(data, null, 2));
  else console.log(text);
}

function writeOut(file, content) {
  const dest = path.resolve(file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
  return dest;
}

function parseCli(argv) {
  const flags = { json: false, all: false, limit: null, out: null, grep: null };
  const positional = [];
  const known = new Set(['--json', '--help', '--all', '--limit', '--out', '--grep']);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (arg === '--all') flags.all = true;
    else if (arg === '--limit' || arg === '--out' || arg === '--grep') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) die(`${arg} braucht einen Wert`);
      i += 1;
      if (arg === '--limit') flags.limit = value;
      else if (arg === '--out') flags.out = value;
      else flags.grep = value;
    } else if (arg.startsWith('--')) {
      if (!known.has(arg)) die(`unbekanntes Flag ${arg}`);
    } else positional.push(arg);
  }
  return { flags, positional };
}

export function parseReferoSearch(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const headed = new RegExp(`###\\s+([^\\]\\n]+?)\\s*\\]\\((https?://styles\\.refero\\.design/style/(${STYLE_UUID}))\\)`, 'g');
  for (const match of text.matchAll(headed)) {
    const styleId = match[3].toLowerCase();
    if (seen.has(styleId)) continue;
    seen.add(styleId);
    items.push({
      title: match[1].replace(/\s+/g, ' ').trim(),
      url: `https://styles.refero.design/style/${styleId}`,
      styleId,
    });
  }
  const bare = new RegExp(`https?://styles\\.refero\\.design/style/(${STYLE_UUID})`, 'g');
  for (const match of text.matchAll(bare)) {
    const styleId = match[1].toLowerCase();
    if (seen.has(styleId)) continue;
    seen.add(styleId);
    const before = text.slice(Math.max(0, match.index - 280), match.index);
    const heading = before.match(/###\s+([^\]\n]+)\s*$/);
    items.push({
      title: heading ? heading[1].replace(/\s+/g, ' ').trim() : styleId,
      url: `https://styles.refero.design/style/${styleId}`,
      styleId,
    });
  }
  return items;
}

export function parseReferoStyle(markdown) {
  const text = String(markdown || '');
  const start = text.search(/```(?:markdown|md)?\r?\n#\s/);
  if (start >= 0) {
    const after = text.slice(start);
    const open = after.match(/```(?:markdown|md)?\r?\n/);
    const inner = after.slice(open[0].length);
    const close = inner.lastIndexOf('```');
    const body = (close >= 0 ? inner.slice(0, close) : inner).trim();
    if (body) return `${body}\n`;
  }
  const fence = text.match(/```(?:markdown|md)?\r?\n([\s\S]*?)```/);
  if (fence && fence[1].trim()) return `${fence[1].trim()}\n`;
  const marked = text.match(/Markdown Content:\s*\n([\s\S]+)/);
  const body = (marked ? marked[1] : text).trim();
  return body ? `${body}\n` : '';
}

export function parseNavbarList(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const re = /https?:\/\/(?:www\.)?navbar\.gallery\/navbar\/([a-z0-9-]+)/gi;
  for (const match of text.matchAll(re)) {
    const slug = match[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    const after = text.slice(match.index, match.index + 420);
    const alt = after.match(/!\[[^\]]*:\s*([^\]]+)\]\(/);
    const name = (alt?.[1] || slug.replace(/-/g, ' ')).trim();
    items.push({ name, url: `https://www.navbar.gallery/navbar/${slug}` });
  }
  return items;
}

function markdownBody(markdown) {
  const text = String(markdown || '');
  const at = text.search(/Markdown Content:\s*\n/);
  return at >= 0 ? text.slice(text.indexOf('\n', at) + 1) : text;
}

function markdownDestinations(text, imageOnly = false) {
  const out = [];
  const re = imageOnly ? /!\[[^\]]*\]\(/g : /\[[^\]]*\]\(/g;
  for (const match of text.matchAll(re)) {
    const start = match.index + match[0].length;
    if (!/^https?:\/\//i.test(text.slice(start))) continue;
    let i = start;
    let depth = 1;
    while (i < text.length && depth > 0) {
      const ch = text[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === '\n') break;
      i++;
    }
    if (depth === 0) out.push(text.slice(start, i - 1));
  }
  return out;
}

export function parseNavbarItem(markdown) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  let title = header
    .replace(/\s*[–—-]\s*Navbar Gallery.*$/i, '')
    .replace(/\s+(?:Mega Menu|Dropdowns?|Static|Side Bar|Search Bar|Announcement|Full Screen|Breadcrumbs)\s+Navigation Design$/i, '')
    .trim();
  const body = markdownBody(text);
  if (!title) {
    const alt = body.match(/!\[[^\]]*:\s*([^\]]+)\]\(/);
    title = alt?.[1]?.trim() || '';
  }
  const type = body.match(/Navbar Type\s*\n+\[([^\]]+)\]/i)?.[1]?.trim()
    || body.match(/\[(Mega Menu|Dropdowns?|Static|Side Bar|Search Bar|Announcement|Full Screen|Breadcrumbs)\]/i)?.[1]
    || '';
  const images = unique(markdownDestinations(body, true)
    .filter((url) => /cdn\.navbar\.gallery/i.test(url) || /\.(?:avif|webp|png|jpe?g)(?:$|\?)/i.test(url)))
    .filter((url) => !/Icon-|IconDropdown|icon-/i.test(url));
  const videos = unique([
    ...body.matchAll(/\((https?:\/\/[^)\s]+\.(?:mp4|webm|mov)[^)]*)\)/gi),
    ...body.matchAll(/\[Video[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi),
  ].map((m) => m[1]).filter((url) => /\.(?:mp4|webm|mov)(?:$|\?)/i.test(url)));
  let description = '';
  for (const line of body.split(/\n/)) {
    const trimmed = line.trim();
    if (trimmed.length < 40) continue;
    if (/^[#*>`|\-\[!]/.test(trimmed)) continue;
    if (/Navbar Gallery|Desktop view|Mobile view|Visit Website|Designed by|Submitted by|Navbar Type|Website Type|Sponsored|All Types|Subscribe/i.test(trimmed)) continue;
    description = trimmed;
    break;
  }
  return { title, description, type, images, videos };
}

export function parseRegistryList(json, options = {}) {
  const data = typeof json === 'string' ? JSON.parse(json) : json;
  const items = Array.isArray(data?.items) ? data.items : [];
  let rows = items.map((item) => ({
    name: item?.name || '',
    title: item?.title || '',
    description: item?.description || '',
  })).filter((row) => row.name);
  if (options.variant) {
    const suffix = options.variant;
    rows = rows.filter((row) => row.name.endsWith(suffix));
  }
  if (options.grep) {
    const needle = String(options.grep).toLowerCase();
    rows = rows.filter((row) => `${row.name} ${row.title} ${row.description}`.toLowerCase().includes(needle));
  }
  return rows;
}

export function parse21stSearch(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const headed = /(?:###\s+([^\]\n]+?)\s*)?\]\((https?:\/\/21st\.dev\/@([^/]+)\/components\/([^)\s]+))\)/g;
  for (const match of text.matchAll(headed)) {
    const author = decodeURIComponent(match[3]);
    const slug = match[4].replace(/\/+$/, '');
    const url = `https://21st.dev/@${author}/components/${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    const title = (match[1] || '').replace(/\s+by\s+.+$/i, '').replace(/\s+/g, ' ').trim()
      || slug.split('/').filter(Boolean).pop();
    items.push({ title, author, url });
  }
  const bare = /https?:\/\/21st\.dev\/@([^/]+)\/components\/([^\s)"']+)/g;
  for (const match of text.matchAll(bare)) {
    const author = decodeURIComponent(match[1]);
    const slug = match[2].replace(/[.,;]+$/g, '').replace(/\/+$/, '');
    const url = `https://21st.dev/@${author}/components/${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    items.push({ title: slug.split('/').filter(Boolean).pop(), author, url });
  }
  return items;
}

function markdownSection(markdown, heading) {
  const re = new RegExp(`^##\\s+${heading}\\s*$`, 'im');
  const match = markdown.match(re);
  if (!match) return '';
  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = rest.search(/^##\s+/m);
  return (next >= 0 ? rest.slice(0, next) : rest).trim();
}

export function parse21stItem(markdown) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  const body = markdownBody(text);
  const first = body.split(/\n/).map((line) => line.trim()).find(Boolean) || '';
  // Titel immer aus dem Jina-Header; die erste Body-Zeile ist nur bei "/Titel" der Titel,
  // sonst bereits die Beschreibung (gemessen 03.09.2026 an @waleedkibhen/saa-s-template).
  let title = header.split('|')[0].trim();
  const firstIsTitle = /^\/[^\s/]/.test(first) || (title && first.replace(/^\/+/, '').trim() === title);
  if (!title) title = first.replace(/^\/+/, '').replace(/^#+\s*/, '').trim();
  let description = '';
  for (const line of body.split(/\n/)) {
    const trimmed = line.trim();
    if (!trimmed || (firstIsTitle && trimmed === first)) continue;
    if (/^[#>`|\-\[!*]/.test(trimmed) || /^```/.test(trimmed)) continue;
    if (/^\/[A-Za-z]/.test(trimmed)) continue;
    if (/Similar components|Dependencies|License|Tags|Published/i.test(trimmed)) break;
    description = trimmed;
    break;
  }
  const usage = (body.match(/```[^\n]*\n([\s\S]*?)```/) || [])[1]?.trim() || '';
  const dependencies = markdownSection(body, 'Dependencies');
  const license = markdownSection(body, 'License');
  const source = body.match(/\[Source\]\((https?:\/\/[^)]+)\)/i)?.[1]
    || body.match(/\bSource:\s*(https?:\/\/\S+)/i)?.[1]
    || null;
  return { title, description, usage, dependencies, license, source };
}

function hostUnavailable(url, detail) {
  const error = new Error(`HOST_UNAVAILABLE ${url} (${detail})`);
  error.code = 'HOST_UNAVAILABLE';
  return error;
}

function readViaFirecrawl(url) {
  const run = spawnSync('firecrawl', ['scrape', url, '-f', 'markdown', '--only-main-content', '-o', '/dev/stdout'], {
    encoding: 'utf8',
    timeout: FIRECRAWL_TIMEOUT_MS,
    cwd: os.tmpdir(),
    maxBuffer: 12 * 1024 * 1024,
  });
  if (run.error) throw new Error(`firecrawl missing: ${run.error.message}`);
  if (run.status !== 0) {
    const detail = `${run.stderr || ''}${run.stdout || ''}`.split('\n').find(Boolean) || `exit ${run.status}`;
    throw new Error(`firecrawl failed: ${detail}`);
  }
  let body = run.stdout || '';
  const trimmed = body.trim();
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      body = parsed.markdown || parsed.data?.markdown || parsed.data?.content || body;
    } catch { /* raw markdown that happens to start with a brace */ }
  }
  if (!String(body).trim()) throw new Error('firecrawl empty body');
  return { channel: 'firecrawl', httpStatus: 200, body: String(body) };
}

async function readMarkdown(url) {
  let jinaError = '';
  try {
    const res = await fetch(`${JINA}${url}`, {
      redirect: 'follow',
      headers: { accept: 'text/markdown, text/plain, */*', 'user-agent': UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const body = await res.text();
    if (res.ok && body.trim().length > 40) return { channel: 'jina', httpStatus: res.status, body };
    jinaError = `jina HTTP ${res.status}`;
  } catch (error) {
    jinaError = `jina: ${error instanceof Error ? error.message : String(error)}`;
  }
  try {
    return readViaFirecrawl(url);
  } catch (error) {
    const firecrawlError = error instanceof Error ? error.message : String(error);
    throw hostUnavailable(url, `jina: ${jinaError}; firecrawl: ${firecrawlError}`);
  }
}

async function readJson(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { accept: 'application/json, text/plain, */*', 'user-agent': UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const body = await res.text();
    if (res.status === 404) {
      const error = new Error(`nicht gefunden: ${url}`);
      error.code = 'NOT_FOUND';
      throw error;
    }
    if (!res.ok) throw hostUnavailable(url, `fetch: HTTP ${res.status}`);
    try {
      return JSON.parse(body);
    } catch (error) {
      throw hostUnavailable(url, `fetch: JSON ${error instanceof Error ? error.message : String(error)}`);
    }
  } catch (error) {
    if (error && (error.code === 'HOST_UNAVAILABLE' || error.code === 'NOT_FOUND')) throw error;
    throw hostUnavailable(url, `fetch: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function formatList(items, keys) {
  return items.map((item) => keys.map((key) => item[key] ?? '').join('\t')).join('\n');
}

function formatNavbarItem(item) {
  const lines = [`# ${item.title || 'Navbar'}`, ''];
  if (item.description) lines.push(item.description, '');
  if (item.type) lines.push(`Typ: ${item.type}`, '');
  if (item.images.length) {
    lines.push('## Bilder');
    for (const url of item.images) lines.push(`- ${url}`);
    lines.push('');
  }
  if (item.videos.length) {
    lines.push('## Videos');
    for (const url of item.videos) lines.push(`- ${url}`);
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

function format21stItem(item) {
  const source = item.source || 'nicht gefunden';
  const lines = [`# ${item.title || '21st'}`, ''];
  if (item.description) lines.push(item.description, '');
  if (item.usage) {
    lines.push('## Usage', '```', item.usage, '```', '');
  }
  lines.push('## Dependencies', item.dependencies || '(keine)', '');
  lines.push('## License', item.license || '(keine)', '');
  lines.push('## Source', source, '');
  lines.push(`Code hinter Login; Quelle: ${source}, falls vorhanden dort holen`);
  return lines.join('\n');
}

function formatRegistryGet(item) {
  const files = Array.isArray(item.files) ? item.files : [];
  const chunks = files.map((file) => {
    const label = file.path || 'file';
    const content = file.content || '';
    return files.length > 1 ? `// --- ${label} ---\n${content}` : content;
  });
  const body = chunks.join('\n\n').replace(/\s+$/, '');
  const extras = [];
  if (Array.isArray(item.dependencies) && item.dependencies.length) extras.push(`dependencies: ${item.dependencies.join(', ')}`);
  if (Array.isArray(item.registryDependencies) && item.registryDependencies.length) extras.push(`registryDependencies: ${item.registryDependencies.join(', ')}`);
  return extras.length ? `${body}\n\n${extras.join('\n')}` : body;
}

function parseReferoTarget(raw) {
  const match = String(raw || '').match(new RegExp(STYLE_UUID));
  if (!match) die('refero get braucht eine Style-UUID oder Style-URL');
  const styleId = match[0].toLowerCase();
  return { styleId, url: `https://styles.refero.design/style/${styleId}` };
}

function parseNavbarTarget(raw) {
  const fromUrl = String(raw || '').match(/navbar\.gallery\/navbar\/([a-z0-9-]+)/i);
  const slug = (fromUrl ? fromUrl[1] : String(raw || '').replace(/^\/+/, '').split('/').pop() || '').toLowerCase();
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) die('navbar get braucht einen Slug oder eine navbar.gallery-URL');
  return { slug, url: `https://www.navbar.gallery/navbar/${slug}` };
}

function parse21stTarget(raw) {
  const value = String(raw || '').trim();
  const fromUrl = value.match(/21st\.dev\/@([^/]+)\/components\/(.+?)$/i);
  if (fromUrl) {
    const author = decodeURIComponent(fromUrl[1]);
    const slug = fromUrl[2].replace(/\/+$/, '');
    return { author, slug, url: `https://21st.dev/@${author}/components/${slug}` };
  }
  const compact = value.match(/^@?([^/]+)\/(.+)$/);
  if (!compact) die('21st get braucht @author/slug oder eine 21st.dev-URL');
  const author = compact[1].replace(/^@/, '');
  const slug = compact[2].replace(/\/+$/, '');
  return { author, slug, url: `https://21st.dev/@${author}/components/${slug}` };
}

function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function safeJoin(root, rel) {
  const dest = path.resolve(root, rel);
  const base = path.resolve(root) + path.sep;
  if (dest !== path.resolve(root) && !dest.startsWith(base)) die(`--out-Pfad verlässt das Zielverzeichnis: ${rel}`);
  return dest;
}

async function cmdRefero(command, rest, flags) {
  if (command === 'search') {
    const query = rest.join(' ').trim();
    if (!query) die('refero search braucht eine Query');
    const url = `https://styles.refero.design/?q=${encodeURIComponent(query)}`;
    const page = await readMarkdown(url);
    const items = applyLimit(parseReferoSearch(page.body), limitOf(flags, 10));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['title', 'url', 'styleId']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('refero get braucht genau eine Style-UUID oder URL');
    const target = parseReferoTarget(rest[0]);
    const page = await readMarkdown(target.url);
    const markdown = parseReferoStyle(page.body);
    if (!markdown.trim()) emptyResult(flags);
    if (flags.out) writeOut(flags.out, markdown);
    if (flags.json) {
      console.log(JSON.stringify({ styleId: target.styleId, url: target.url, out: flags.out || null, markdown: flags.out ? undefined : markdown }, null, 2));
    } else if (!flags.out) {
      process.stdout.write(markdown.endsWith('\n') ? markdown : `${markdown}\n`);
    }
    process.exit(0);
  }
  die(`unbekanntes Kommando für refero: ${command || '(fehlt)'}`);
}

async function cmdNavbar(command, rest, flags) {
  if (command === 'list') {
    if (rest.length > 1) die('navbar list kennt höchstens einen Typ');
    const type = rest[0];
    if (type && !/^[a-z0-9-]+$/i.test(type)) die(`ungültiger Navbar-Typ ${type}`);
    const url = type
      ? `https://www.navbar.gallery/type/${type.toLowerCase()}`
      : 'https://www.navbar.gallery/browse';
    const page = await readMarkdown(url);
    const items = applyLimit(parseNavbarList(page.body), limitOf(flags, 20));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['name', 'url']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('navbar get braucht genau einen Slug oder eine URL');
    const target = parseNavbarTarget(rest[0]);
    const page = await readMarkdown(target.url);
    const item = parseNavbarItem(page.body);
    if (!item.title && !item.description && !item.images.length) emptyResult(flags);
    const payload = { slug: target.slug, url: target.url, ...item };
    emitJsonOrText(flags, payload, formatNavbarItem(item));
    process.exit(0);
  }
  die(`unbekanntes Kommando für navbar: ${command || '(fehlt)'}`);
}

async function cmdMagicui(command, rest, flags) {
  if (command === 'list') {
    if (rest.length) die('magicui list kennt keine Positionsargumente');
    const data = await readJson('https://magicui.design/r/registry.json');
    const items = parseRegistryList(data, { grep: flags.grep });
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['name', 'description']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('magicui get braucht genau einen Namen');
    const name = rest[0];
    let item;
    try {
      item = await readJson(`https://magicui.design/r/${encodeURIComponent(name)}.json`);
    } catch (error) {
      if (error && error.code === 'NOT_FOUND') emptyResult(flags);
      throw error;
    }
    const files = Array.isArray(item.files) ? item.files : [];
    const content = files[0]?.content || '';
    if (!content && !flags.json) emptyResult(flags);
    if (flags.out && content) writeOut(flags.out, content);
    if (flags.json) console.log(JSON.stringify(item, null, 2));
    else if (!flags.out) console.log(formatRegistryGet(item));
    else {
      const extras = [];
      if (Array.isArray(item.dependencies) && item.dependencies.length) extras.push(`dependencies: ${item.dependencies.join(', ')}`);
      if (Array.isArray(item.registryDependencies) && item.registryDependencies.length) extras.push(`registryDependencies: ${item.registryDependencies.join(', ')}`);
      if (extras.length) console.log(extras.join('\n'));
    }
    process.exit(0);
  }
  die(`unbekanntes Kommando für magicui: ${command || '(fehlt)'}`);
}

async function cmdReactbits(command, rest, flags) {
  if (command === 'list') {
    if (rest.length) die('reactbits list kennt keine Positionsargumente');
    const data = await readJson('https://reactbits.dev/r/registry.json');
    const items = parseRegistryList(data, { grep: flags.grep, variant: flags.all ? undefined : '-TS-TW' });
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['name', 'description']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('reactbits get braucht genau einen Namen');
    const given = rest[0];
    const name = REACTBITS_SUFFIX.test(given) ? given : `${given}-TS-TW`;
    let item;
    try {
      item = await readJson(`https://reactbits.dev/r/${encodeURIComponent(name)}.json`);
    } catch (error) {
      if (error && error.code === 'NOT_FOUND') emptyResult(flags);
      throw error;
    }
    const files = Array.isArray(item.files) ? item.files : [];
    if (!files.length && !flags.json) emptyResult(flags);
    if (flags.out) {
      const root = path.resolve(flags.out);
      fs.mkdirSync(root, { recursive: true });
      for (const file of files) {
        const rel = String(file.path || 'component.tsx').replace(/^\/+/, '');
        const dest = safeJoin(root, rel);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, file.content || '');
      }
    }
    if (flags.json) console.log(JSON.stringify(item, null, 2));
    else if (!flags.out) console.log(formatRegistryGet(item));
    else {
      const extras = [];
      if (Array.isArray(item.dependencies) && item.dependencies.length) extras.push(`dependencies: ${item.dependencies.join(', ')}`);
      if (Array.isArray(item.registryDependencies) && item.registryDependencies.length) extras.push(`registryDependencies: ${item.registryDependencies.join(', ')}`);
      if (extras.length) console.log(extras.join('\n'));
    }
    process.exit(0);
  }
  die(`unbekanntes Kommando für reactbits: ${command || '(fehlt)'}`);
}

async function cmd21st(command, rest, flags) {
  if (command === 'search') {
    const query = rest.join(' ').trim();
    if (!query) die('21st search braucht eine Kategorie oder einen Begriff');
    const slug = slugify(query);
    if (!slug) die('21st search braucht eine Kategorie oder einen Begriff');
    const url = `https://21st.dev/community/components/s/${encodeURIComponent(slug)}`;
    const page = await readMarkdown(url);
    const items = applyLimit(parse21stSearch(page.body), limitOf(flags, 20));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['title', 'author', 'url']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('21st get braucht @author/slug oder eine URL');
    const target = parse21stTarget(rest[0]);
    // 21st Registry https://21st.dev/r/<author>/<slug> liefert 403 ohne Login — nicht aufrufen.
    const page = await readMarkdown(target.url);
    const item = parse21stItem(page.body);
    if (!item.title && !item.usage) emptyResult(flags);
    const payload = { author: target.author, slug: target.slug, url: target.url, ...item, login: `Code hinter Login; Quelle: ${item.source || 'nicht gefunden'}, falls vorhanden dort holen` };
    emitJsonOrText(flags, payload, format21stItem(item));
    process.exit(0);
  }
  die(`unbekanntes Kommando für 21st: ${command || '(fehlt)'}`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help')) {
    console.log(HELP);
    process.exit(0);
  }
  const { flags, positional } = parseCli(argv);
  const [source, command, ...rest] = positional;
  if (!source) die('Quelle fehlt (refero|navbar|magicui|reactbits|21st)');
  try {
    if (source === 'refero') await cmdRefero(command, rest, flags);
    else if (source === 'navbar') await cmdNavbar(command, rest, flags);
    else if (source === 'magicui') await cmdMagicui(command, rest, flags);
    else if (source === 'reactbits') await cmdReactbits(command, rest, flags);
    else if (source === '21st') await cmd21st(command, rest, flags);
    else die(`unbekannte Quelle ${source}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error && error.code === 'HOST_UNAVAILABLE') {
      console.error(`inspiration: ${message}`);
      process.exit(3);
    }
    console.error(`inspiration: ${message}`);
    process.exit(1);
  }
}

const invokedDirectly = Boolean(process.argv[1]) && (
  import.meta.url === pathToFileURL(process.argv[1]).href
  || import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
);
if (invokedDirectly) await main();
