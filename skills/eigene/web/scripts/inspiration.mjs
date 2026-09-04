#!/usr/bin/env node
// Liest UI-Inspiration (Refero, Navbar Gallery, Magic UI, React Bits, 21st,
// Landdding, Awwwards, Siteinspire, Curated, GetLayers, Behance, Inspora, Swiped)
// über Jina Reader, sonst Firecrawl; einzelne Quellen per fetch. shot über Playwright.
// Kein Login, kein Cache, Schreiben nur mit --out (shot: nur --out-Verzeichnis).
//
//   node inspiration.mjs --help
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const UA = 'raphael-web-inspiration/1.0';
const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0 Safari/537.36';
const CLI_21ST = '/root/.local/bin/21st';
const DEFAULT_SHOT_OUT = '/tmp/inspiration-shots';
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
  node inspiration.mjs 21st code <suchbegriff|id> [--out <verzeichnis>] [--json]
  node inspiration.mjs landdding list [<kategorie>] [--limit 20] [--json]
  node inspiration.mjs landdding get <slug|url> [--json]
  node inspiration.mjs awwwards list [<tag>] [--limit 30] [--json]
  node inspiration.mjs awwwards get <slug|url> [--json]
  node inspiration.mjs siteinspire list [<kategorie>] [--limit 20] [--json]
  node inspiration.mjs siteinspire get <id-slug|url> [--json]
  node inspiration.mjs curated list [--limit 30] [--json]
  node inspiration.mjs getlayers list [--limit 40] [--grep <substr>] [--json]
  node inspiration.mjs getlayers get <slug|url> [--json]
  node inspiration.mjs behance search "<query>" [--limit 20] [--json]
  node inspiration.mjs behance get <id|url> [--json]
  node inspiration.mjs inspora list [--limit 20] [--json]
  node inspiration.mjs swiped list [--limit 20] [--json]
  node inspiration.mjs mobbin [--json]
  node inspiration.mjs shot <url> [--out <verzeichnis>] [--mobile] [--full] [--wait <ms>] [--json]
  node inspiration.mjs --help

Liest Seiten über https://r.jina.ai/<url>; Fallback: firecrawl scrape <url> -f markdown --only-main-content.
siteinspire nur Firecrawl (Jina = Vercel 429). awwwards/getlayers/inspora: HTML per fetch.
Registry-JSON (Magic UI, React Bits) per fetch. Timeout 45s, User-Agent ${UA}.
Kein Cache, kein Login, keine Cookies. Schreiben nur mit --out.
shot: Playwright-PNG nach --out (Default /tmp/inspiration-shots). PNG danach mit Read ansehen — ein Pfad ohne Ansehen zählt nicht als gesehen.
Bei Bot-Schutz: raphael-chrome open <url>; raphael-chrome screenshot <id> <png>.
Mobbin: kein Netz, nur MCP-Hinweis. Swiped: Design-Posts von X/LinkedIn, keine Websites.
curated/inspora: nur list (kein get).

Exit: 0 ok · 1 nichts gefunden · 2 Bedienfehler · 3 HOST_UNAVAILABLE (Kanal in der Meldung).

Lizenz: Refero, Navbar Gallery, 21st = Inspiration/Analyse (Muster, Tokens, Struktur),
keine Layout-/Asset-Kopie. Magic UI (MIT) und React Bits (MIT, Registry) = einzelne
Komponente übernehmbar, danach Werkzeugtabelle in art-direction.md + Router-Anker
#sections/#motion/#background, wie tool-usecase-router.md verlangt.
Lizenz: alle Galerien nur Inspiration/Analyse; Screenshots nur intern (Design-DNA, PRUEFGEGEN), nie in Kundenauslieferung.`;

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
  const flags = { json: false, all: false, mobile: false, full: false, limit: null, out: null, grep: null, wait: null };
  const positional = [];
  const known = new Set(['--json', '--help', '--all', '--mobile', '--full', '--limit', '--out', '--grep', '--wait']);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (arg === '--all') flags.all = true;
    else if (arg === '--mobile') flags.mobile = true;
    else if (arg === '--full') flags.full = true;
    else if (arg === '--limit' || arg === '--out' || arg === '--grep' || arg === '--wait') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) die(`${arg} braucht einen Wert`);
      i += 1;
      if (arg === '--limit') flags.limit = value;
      else if (arg === '--out') flags.out = value;
      else if (arg === '--wait') flags.wait = value;
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


function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&');
}

function stripRefParam(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    parsed.searchParams.delete('ref');
    const query = parsed.searchParams.toString();
    return `${parsed.origin}${parsed.pathname}${query ? `?${query}` : ''}${parsed.hash}`;
  } catch {
    return raw.replace(/\?ref=[^&#]*/i, '').replace(/&ref=[^&#]*/i, '').replace(/\?$/, '');
  }
}

export function parseLandddingList(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const re = /https?:\/\/(?:www\.)?landdding\.com\/l\/([a-z0-9-]+)/gi;
  for (const match of text.matchAll(re)) {
    const slug = match[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    const before = text.slice(Math.max(0, match.index - 800), match.index);
    const prev = before.lastIndexOf('landdding.com/l/');
    const window = prev >= 0 ? before.slice(prev) : before;
    const alts = [...window.matchAll(/!\[[^\]]*?:\s*([^\]\n]+?)\s*—\s*website design on Landdding/gi)];
    // Kategorie-Seiten (/c/<kat>) tragen den Titel als Link-Title "…" hinter der URL,
    // nicht im Bild-Alt (gemessen 03.09.2026 an /c/agency).
    const linkTitle = String(markdown).slice(match.index, match.index + 400).match(/^\S+\s+"([^"\n]+)"\)/)?.[1];
    const title = (alts.at(-1)?.[1] || linkTitle || slug.replace(/-/g, ' ')).replace(/\s+/g, ' ').trim();
    items.push({ title, url: `https://landdding.com/l/${slug}`, slug });
  }
  return items;
}

export function parseLandddingItem(markdown) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  const title = header.replace(/\s+-\s+Landdding.*$/i, '').trim();
  const body = markdownBody(text);
  const visitMatch = body.match(/\[Visit Website\]\((https?:\/\/[^)]+)\)/i);
  const visit = stripRefParam(visitMatch?.[1] || '');
  let thumbnail = '';
  const branded = body.match(/!\[[^\]]*website design on Landdding[^\]]*\]\((https?:\/\/[^)]+)\)/i);
  if (branded) thumbnail = branded[1];
  else {
    const sanity = body.match(/\((https?:\/\/[^)]*cdn\.sanity\.io[^)]+)\)/i);
    if (sanity) thumbnail = sanity[1];
  }
  return { title, visit, thumbnail };
}

export function parseAwwwardsList(html) {
  const text = String(html || '');
  const items = [];
  const seen = new Set();
  const re = /data-collectable-model-value="([^"]+)"/g;
  for (const match of text.matchAll(re)) {
    let obj;
    try {
      obj = JSON.parse(decodeHtmlEntities(match[1]));
    } catch {
      continue;
    }
    const slug = String(obj.slug || obj.collectableIdentifier || '').trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const rel = obj.images?.thumbnail || obj.collectableImage || '';
    items.push({
      title: String(obj.title || obj.collectableTitle || slug),
      slug,
      url: `https://www.awwwards.com/sites/${slug}`,
      tags: Array.isArray(obj.tags) ? obj.tags.map((tag) => String(tag)) : [],
      thumbnail: rel ? `https://assets.awwwards.com/awards/${rel}` : '',
    });
  }
  return items;
}

export function parseAwwwardsItem(html) {
  const text = String(html || '');
  const title = decodeHtmlEntities(text.match(/<title>([^<]+)<\/title>/i)?.[1] || '').trim();
  const og = text.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    || text.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  const fromCard = parseAwwwardsList(text)[0];
  return {
    title,
    screenshot: og?.[1] || fromCard?.thumbnail || '',
    tags: fromCard?.tags || [],
  };
}

export function parseSiteinspireList(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const re = /\[!\[([^\]]+)\]\((https?:\/\/r2\.siteinspire\.com[^)]+)\)\]\((https?:\/\/(?:www\.)?siteinspire\.com\/website\/(\d+-[a-z0-9-]+))\)/gi;
  for (const match of text.matchAll(re)) {
    const name = match[1].replace(/\s+/g, ' ').trim();
    const idSlug = match[4].toLowerCase();
    if (seen.has(idSlug)) continue;
    if (/^mobbin$/i.test(name) || /mobbin\.com/i.test(match[3])) continue;
    seen.add(idSlug);
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 900);
    const visitMatch = after.match(/\[Visit\s+[^\]]+?\s+website\]\((https?:\/\/[^)]+)\)/i);
    let visit = visitMatch ? stripRefParam(visitMatch[1]) : '';
    if (/mobbin\.com/i.test(visit)) visit = '';
    items.push({
      name,
      url: `https://www.siteinspire.com/website/${idSlug}`,
      visit,
      thumbnail: match[2],
    });
  }
  return items;
}

export function parseSiteinspireItem(markdown) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  let title = header.replace(/\s+[–—-]\s*SiteInspire.*$/i, '').trim();
  const body = markdownBody(text);
  const similarAt = body.search(/^##\s+Similar/im);
  const main = similarAt >= 0 ? body.slice(0, similarAt) : body;
  if (!title) {
    for (const match of main.matchAll(/!\[([^\]]+)\]\(https?:\/\/r2\.siteinspire\.com/gi)) {
      const alt = match[1].replace(/\s+/g, ' ').trim();
      if (/^mobbin$/i.test(alt) || /mobile/i.test(alt)) continue;
      title = alt.replace(/\s*—\s*mobile.*$/i, '').trim();
      break;
    }
  }
  let visit = '';
  const dest = markdownDestinations(main).find((url) => !/siteinspire\.com|mobbin\.com|r2\.siteinspire/i.test(url));
  if (dest) visit = stripRefParam(dest);
  if (!visit) {
    const wrap = [...main.matchAll(/\]\((https?:\/\/[^)]+)\)/g)]
      .map((match) => match[1])
      .find((url) => !/siteinspire\.com|mobbin\.com|r2\.siteinspire/i.test(url));
    if (wrap) visit = stripRefParam(wrap);
  }
  if (!visit) {
    const named = main.match(/\[Visit\s+[^\]]+?\s+website\]\((https?:\/\/[^)]+)\)/i);
    if (named && !/mobbin\.com|siteinspire\.com/i.test(named[1])) visit = stripRefParam(named[1]);
  }
  let thumbnail = '';
  for (const match of main.matchAll(/!\[([^\]]*)\]\((https?:\/\/r2\.siteinspire\.com[^)]+)\)/gi)) {
    if (/mobbin/i.test(match[1]) || /mobile/i.test(match[1]) || /mobbin-ghost/i.test(match[2])) continue;
    thumbnail = match[2];
    break;
  }
  const categories = [];
  const seen = new Set();
  const catRe = /\[([^\]]+)\]\(https?:\/\/(?:www\.)?siteinspire\.com\/websites(?:\?categories=|\/category\/)[^)]+\)/gi;
  for (const match of body.matchAll(catRe)) {
    const name = match[1].replace(/\\+\s*/g, ' ').replace(/\s+/g, ' ').trim();
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    categories.push(name);
  }
  return { title, visit, thumbnail, categories };
}

export function parseCuratedList(markdown) {
  const text = String(markdown || '');
  const items = [];
  const re = /!\[(?:Image\s+\d+:\s*)?Screenshot of the (.+?) website\]\((https?:\/\/marketstorage\.b-cdn\.net[^)]+)\)/gi;
  for (const match of text.matchAll(re)) {
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 280).trimStart();
    const videoMatch = after.match(/^\[Video[^\]]*\]\((https?:\/\/[^)]+\.mp4[^)]*)\)/i);
    items.push({
      name: match[1].replace(/\s+/g, ' ').trim(),
      thumbnail: match[2],
      video: videoMatch ? videoMatch[1] : null,
    });
  }
  return items;
}

function findGetlayersThumb(html, slug) {
  const escaped = String(slug || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!escaped) return null;
  // Live-HTML (gemessen 03.09.2026): templates/<slug>.webp ODER gehasht templates/<slug>-<hex>.webp
  // (auch URL-kodiert in /_next/image?url=…%2Ftemplates%2F…).
  const re = new RegExp(`templates(?:/|%2F)(${escaped}(?:-[0-9a-f]+)?)\\.webp`, 'i');
  const match = String(html || '').match(re);
  if (!match) return null;
  return `https://storage.getlayers.ai/templates/${match[1]}.webp`;
}

export function parseGetlayersList(html) {
  const text = String(html || '');
  const items = [];
  const seen = new Set();
  const re = /<a[^>]*href="\/layer\/([a-z0-9-]+)"[^>]*>([^<]+)<\/a>/gi;
  for (const match of text.matchAll(re)) {
    const slug = match[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    const name = decodeHtmlEntities(match[2]).replace(/\s+/g, ' ').trim();
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 500);
    const cat = after.match(/class="card-sub">([^<]+)/i);
    const category = decodeHtmlEntities(cat?.[1] || '').replace(/\s+/g, ' ').trim();
    items.push({
      name,
      slug,
      url: `https://www.getlayers.ai/layer/${slug}`,
      category,
      thumbnail: findGetlayersThumb(text, slug),
    });
  }
  return items;
}

export function parseGetlayersItem(markdown, slug) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  const title = header.replace(/\s+[–—-]\s*GetLayers.*$/i, '').trim();
  const body = markdownBody(text);
  const urls = [];
  for (const match of body.matchAll(/https?:\/\/storage\.getlayers\.ai\/[^\s)"'\\]+/gi)) {
    urls.push(match[0].replace(/\\+$/, ''));
  }
  for (const match of body.matchAll(/url=https?%3A%2F%2Fstorage\.getlayers\.ai%2F([^&)\]\s]+)/gi)) {
    try { urls.push(`https://storage.getlayers.ai/${decodeURIComponent(match[1])}`); } catch { /* skip */ }
  }
  const uniqueUrls = unique(urls);
  const needle = String(slug || '').toLowerCase();
  const preview = (needle && uniqueUrls.find((url) => url.toLowerCase().includes(`/${needle}.`) || url.toLowerCase().includes(`/${needle}-`)))
    || uniqueUrls[0]
    || '';
  const video = uniqueUrls.find((url) => /\.mp4(?:$|\?)/i.test(url))
    || (body.match(/https?:\/\/[^\s)"']+\.mp4(?:\?[^\s)"']*)?/i) || [])[0]
    || null;
  return { title, preview, video };
}

export function parseBehanceSearch(markdown) {
  const text = String(markdown || '');
  const items = [];
  const seen = new Set();
  const re = /https?:\/\/(?:www\.)?behance\.net\/gallery\/(\d+)\/([A-Za-z0-9-]+)/g;
  for (const match of text.matchAll(re)) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    const slug = match[2];
    items.push({
      id,
      title: slug.replace(/-/g, ' '),
      url: `https://www.behance.net/gallery/${id}/${slug}`,
    });
  }
  return items;
}

export function parseBehanceItem(markdown) {
  const text = String(markdown || '');
  const header = text.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || '';
  const title = header.split(/\s+::\s+/)[0].replace(/\s+-\s+(?:Behance|Adobe).*$/i, '').trim();
  const images = unique(
    [...text.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^\s)"'\]]+/g)]
      .map((match) => match[0].replace(/[.,;]+$/, '')),
  ).slice(0, 12);
  return { title, images };
}

export function parseInsporaList(html) {
  const text = String(html || '');
  const items = [];
  const seen = new Set();
  const re = /href="\/posts\/([a-z0-9-]+)"/gi;
  for (const match of text.matchAll(re)) {
    const slug = match[1].toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 1500);
    const media = (after.match(/https:\/\/media\.inspora\.design\/[^\s"'>]+\.(?:webp|mp4)/i) || [])[0] || '';
    items.push({
      slug,
      url: `https://www.inspora.design/posts/${slug}`,
      media,
    });
  }
  return items;
}

export function parseSwipedList(markdown) {
  const text = markdownBody(String(markdown || ''));
  const items = [];
  const re = /(^|\n)([A-Z][A-Za-z][A-Za-z /&-]{0,48})\n+\s*!\[[^\]]*\]\((https?:\/\/[^)]+)\)\s*\n+\s*\*\*([^*]+)\*\*([^\n]*)\n+([\s\S]*?)\n+_([\d,]+)_\s+_([\d,]+)_\s+_([\d,]+)_/g;
  for (const match of text.matchAll(re)) {
    const category = match[2].trim();
    if (/^(Markdown Content|Title|URL Source|Content)$/i.test(category)) continue;
    const author = match[4].replace(/\s+/g, ' ').trim();
    const afterName = match[5] || '';
    const handleMatch = afterName.match(/@[A-Za-z0-9_.]+/);
    const block = match[6] || '';
    const video = (block.match(/\[Video[^\]]*\]\((https?:\/\/[^)]+)\)/i) || [])[1];
    const photo = (block.match(/!\[[^\]]*\]\((https?:\/\/pbs\.twimg\.com\/media\/[^)]+)\)/i) || [])[1];
    const textBody = block
      .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\[Video[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\bRead more\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 280);
    items.push({
      category,
      author,
      handle: handleMatch ? handleMatch[0] : '',
      text: textBody,
      media: video || photo || '',
      likes: match[7],
    });
  }
  return items;
}

function hostUnavailable(url, detail) {
  const error = new Error(`HOST_UNAVAILABLE ${url} (${detail})`);
  error.code = 'HOST_UNAVAILABLE';
  return error;
}

function readViaFirecrawl(url) {
  // Kein -o /dev/stdout: spawnSync oeffnet /dev/stdout nicht (ENXIO, gemessen 03.09.2026).
  const run = spawnSync('firecrawl', ['scrape', url, '-f', 'markdown', '--only-main-content'], {
    encoding: 'utf8',
    timeout: FIRECRAWL_TIMEOUT_MS,
    cwd: os.tmpdir(),
    maxBuffer: 12 * 1024 * 1024,
  });
  if (run.error) throw new Error(`firecrawl missing: ${run.error.message}`);
  let body = run.stdout || '';
  const trimmed = body.trim();
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      body = parsed.markdown || parsed.data?.markdown || parsed.data?.content || body;
    } catch { /* raw markdown that happens to start with a brace */ }
  }
  if (!String(body).trim()) {
    const detail = `${run.stderr || ''}${run.stdout || ''}`.split('\n').find(Boolean) || `exit ${run.status}`;
    throw new Error(`firecrawl failed: ${detail}`);
  }
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

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { accept: 'text/html,application/xhtml+xml,*/*', 'user-agent': BROWSER_UA },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const body = await res.text();
    if (!res.ok) throw hostUnavailable(url, `fetch: HTTP ${res.status}`);
    if (!body.trim()) throw hostUnavailable(url, 'fetch: empty body');
    return body;
  } catch (error) {
    if (error && error.code === 'HOST_UNAVAILABLE') throw error;
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
  if (command === 'code') {
    const query = rest.join(' ').trim();
    if (!query) die('21st code braucht einen Suchbegriff oder eine ID');
    const loggedIn = Boolean(process.env.TWENTYFIRST_TOKEN || process.env.API_KEY_21ST)
      || fs.existsSync(path.join(os.homedir(), '.config', '21st', 'auth.json'));
    if (!loggedIn) {
      console.error('inspiration: 21st CLI nicht eingeloggt: 21st login (Link aus /tmp/21st-auth-url.txt) oder API-Key von https://21st.dev/settings/api-keys als API_KEY_21ST');
      process.exit(1);
    }
    const bin = fs.existsSync(CLI_21ST) ? CLI_21ST : '21st';
    const looksId = /^(?:component:)?\d+$/i.test(query);
    const args = looksId
      ? ['get', query, '--json']
      : ['search', query, '--type', 'c', '--limit', '5', '--json'];
    const run = spawnSync(bin, args, {
      encoding: 'utf8',
      timeout: FETCH_TIMEOUT_MS,
      maxBuffer: 12 * 1024 * 1024,
      env: process.env,
    });
    if (run.error) {
      console.error(`inspiration: 21st CLI: ${run.error.message}`);
      process.exit(1);
    }
    // --out: Komponente + Demo als Dateien ablegen (Builder-Plan, 04.09.2026), sonst JSON durchreichen.
    if (looksId && flags.out && run.status === 0) {
      let parsed;
      try { parsed = JSON.parse(run.stdout); } catch { die('21st get lieferte kein JSON'); }
      const comp = parsed.component || parsed;
      const code = comp.componentCode || '';
      if (!code) emptyResult(flags);
      const root = path.resolve(flags.out);
      fs.mkdirSync(root, { recursive: true });
      const slug = slugify(comp.name || `component-${comp.id || query}`) || `component-${query}`;
      const compFile = safeJoin(root, `${slug}.tsx`);
      fs.writeFileSync(compFile, code);
      let demoFile = null;
      if (comp.demoCode) { demoFile = safeJoin(root, `${slug}.demo.tsx`); fs.writeFileSync(demoFile, comp.demoCode); }
      const deps = comp.registryDependencies && typeof comp.registryDependencies === 'object' ? comp.registryDependencies : {};
      const payload = { id: String(comp.id || query), name: comp.name || null, component: compFile, demo: demoFile, installCommand: comp.installCommand || null, registryDependencies: deps };
      const lines = [`component\t${compFile}`];
      if (demoFile) lines.push(`demo\t${demoFile}`);
      if (comp.installCommand) lines.push(`install\t${comp.installCommand}`);
      const depNames = Object.keys(deps);
      if (depNames.length) lines.push(`registryDependencies\t${depNames.join(', ')}`);
      emitJsonOrText(flags, payload, lines.join('\n'));
      process.exit(0);
    }
    if (run.stdout) process.stdout.write(run.stdout.endsWith('\n') ? run.stdout : `${run.stdout}\n`);
    if (run.stderr) process.stderr.write(run.stderr);
    process.exit(run.status == null ? 1 : run.status);
  }
  die(`unbekanntes Kommando für 21st: ${command || '(fehlt)'}`);
}


function formatSimpleGet(title, fields) {
  const lines = [`# ${title || ''}`.trimEnd(), ''];
  for (const [label, value] of fields) {
    if (value == null || value === '') continue;
    if (Array.isArray(value)) {
      if (!value.length) continue;
      lines.push(`## ${label}`);
      for (const item of value) lines.push(`- ${item}`);
      lines.push('');
    } else {
      lines.push(`${label}: ${value}`, '');
    }
  }
  return lines.join('\n').trimEnd();
}

function parseSlugTarget(raw, kind, re, prefix) {
  const value = String(raw || '').trim();
  const fromUrl = value.match(re);
  const slug = (fromUrl ? fromUrl[1] : value.replace(/^\/+/, '').split('/').filter(Boolean).pop() || '').replace(/\/+$/, '');
  if (!slug) die(`${kind} get braucht einen Slug oder eine URL`);
  return { slug, url: `${prefix}${slug}` };
}

async function cmdLanddding(command, rest, flags) {
  if (command === 'list') {
    if (rest.length > 1) die('landdding list kennt höchstens eine Kategorie');
    const cat = rest[0];
    if (cat && !/^[a-z0-9-]+$/i.test(cat)) die(`ungültige Landdding-Kategorie ${cat}`);
    const url = cat ? `https://landdding.com/c/${cat.toLowerCase()}` : 'https://landdding.com/';
    const page = await readMarkdown(url);
    const items = applyLimit(parseLandddingList(page.body), limitOf(flags, 20));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['title', 'url', 'slug']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('landdding get braucht genau einen Slug oder eine URL');
    const target = parseSlugTarget(rest[0], 'landdding', /landdding\.com\/l\/([a-z0-9-]+)/i, 'https://landdding.com/l/');
    if (!/^[a-z0-9-]+$/i.test(target.slug)) die('landdding get braucht einen Slug oder eine URL');
    const page = await readMarkdown(target.url);
    const item = parseLandddingItem(page.body);
    if (!item.title && !item.visit && !item.thumbnail) emptyResult(flags);
    const payload = { slug: target.slug, url: target.url, ...item };
    emitJsonOrText(flags, payload, formatSimpleGet(item.title || target.slug, [
      ['Visit', item.visit],
      ['Thumbnail', item.thumbnail],
    ]));
    process.exit(0);
  }
  die(`unbekanntes Kommando für landdding: ${command || '(fehlt)'}`);
}

async function cmdAwwwards(command, rest, flags) {
  if (command === 'list') {
    if (rest.length > 1) die('awwwards list kennt höchstens einen Tag');
    const tag = rest[0];
    if (tag && !/^[a-z0-9-]+$/i.test(tag)) die(`ungültiger Awwwards-Tag ${tag}`);
    const url = tag
      ? `https://www.awwwards.com/websites/${tag.toLowerCase()}/`
      : 'https://www.awwwards.com/websites/';
    const html = await fetchHtml(url);
    const items = applyLimit(parseAwwwardsList(html), limitOf(flags, 30));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['title', 'url', 'slug']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('awwwards get braucht genau einen Slug oder eine URL');
    const target = parseSlugTarget(rest[0], 'awwwards', /awwwards\.com\/sites\/([a-z0-9-]+)/i, 'https://www.awwwards.com/sites/');
    if (!/^[a-z0-9-]+$/i.test(target.slug)) die('awwwards get braucht einen Slug oder eine URL');
    const html = await fetchHtml(target.url);
    const item = parseAwwwardsItem(html);
    if (!item.title && !item.screenshot) emptyResult(flags);
    const payload = { slug: target.slug, url: target.url, ...item };
    emitJsonOrText(flags, payload, formatSimpleGet(item.title || target.slug, [
      ['Screenshot', item.screenshot],
      ['Tags', item.tags],
    ]));
    process.exit(0);
  }
  die(`unbekanntes Kommando für awwwards: ${command || '(fehlt)'}`);
}

async function cmdSiteinspire(command, rest, flags) {
  if (command === 'list') {
    if (rest.length > 1) die('siteinspire list kennt höchstens eine Kategorie');
    const cat = rest[0];
    if (cat && !/^[a-z0-9-]+$/i.test(cat)) die(`ungültige Siteinspire-Kategorie ${cat}`);
    const url = cat
      ? `https://www.siteinspire.com/websites/category/${cat.toLowerCase()}`
      : 'https://www.siteinspire.com/websites';
    const page = readViaFirecrawl(url);
    const items = applyLimit(parseSiteinspireList(page.body), limitOf(flags, 20));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['name', 'url', 'visit']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('siteinspire get braucht genau eine id-slug oder URL');
    const target = parseSlugTarget(rest[0], 'siteinspire', /siteinspire\.com\/website\/(\d+-[a-z0-9-]+)/i, 'https://www.siteinspire.com/website/');
    if (!/^\d+-[a-z0-9-]+$/i.test(target.slug)) die('siteinspire get braucht eine id-slug oder URL');
    const page = readViaFirecrawl(target.url);
    const item = parseSiteinspireItem(page.body);
    if (!item.title && !item.visit && !item.thumbnail) emptyResult(flags);
    const payload = { slug: target.slug, url: target.url, ...item };
    emitJsonOrText(flags, payload, formatSimpleGet(item.title || target.slug, [
      ['Visit', item.visit],
      ['Thumbnail', item.thumbnail],
      ['Kategorien', item.categories],
    ]));
    process.exit(0);
  }
  die(`unbekanntes Kommando für siteinspire: ${command || '(fehlt)'}`);
}

async function cmdCurated(command, rest, flags) {
  if (command === 'get') {
    console.error('inspiration: nur list; Screenshot über shot <thumbnail-URL nicht nötig, Thumbnail ist bereits ein Screenshot>');
    process.exit(2);
  }
  if (command !== 'list') die(`unbekanntes Kommando für curated: ${command || '(fehlt)'}`);
  if (rest.length) die('curated list kennt keine Positionsargumente');
  const page = await readMarkdown('https://curated.design/');
  const items = applyLimit(parseCuratedList(page.body), limitOf(flags, 30));
  if (!items.length) emptyResult(flags);
  emitJsonOrText(flags, items, formatList(items, ['name', 'thumbnail', 'video']));
  process.exit(0);
}

async function cmdGetlayers(command, rest, flags) {
  if (command === 'list') {
    if (rest.length) die('getlayers list kennt keine Positionsargumente');
    const html = await fetchHtml('https://www.getlayers.ai/');
    let items = parseGetlayersList(html);
    if (flags.grep) {
      const needle = String(flags.grep).toLowerCase();
      items = items.filter((row) => `${row.name} ${row.slug} ${row.category}`.toLowerCase().includes(needle));
    }
    items = applyLimit(items, limitOf(flags, 40));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['name', 'url', 'category', 'slug']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('getlayers get braucht genau einen Slug oder eine URL');
    const target = parseSlugTarget(rest[0], 'getlayers', /getlayers\.ai\/layer\/([a-z0-9-]+)/i, 'https://www.getlayers.ai/layer/');
    if (!/^[a-z0-9-]+$/i.test(target.slug)) die('getlayers get braucht einen Slug oder eine URL');
    const page = await readMarkdown(target.url);
    const item = parseGetlayersItem(page.body, target.slug);
    if (!item.title && !item.preview) emptyResult(flags);
    const payload = { slug: target.slug, url: target.url, ...item };
    emitJsonOrText(flags, payload, formatSimpleGet(item.title || target.slug, [
      ['Preview', item.preview],
      ['Video', item.video],
    ]));
    process.exit(0);
  }
  die(`unbekanntes Kommando für getlayers: ${command || '(fehlt)'}`);
}

async function cmdBehance(command, rest, flags) {
  if (command === 'search') {
    const query = rest.join(' ').trim();
    if (!query) die('behance search braucht eine Query');
    const url = `https://www.behance.net/search/projects?field=${encodeURIComponent(query)}`;
    const page = await readMarkdown(url);
    const items = applyLimit(parseBehanceSearch(page.body), limitOf(flags, 20));
    if (!items.length) emptyResult(flags);
    emitJsonOrText(flags, items, formatList(items, ['id', 'title', 'url']));
    process.exit(0);
  }
  if (command === 'get') {
    if (rest.length !== 1) die('behance get braucht eine ID oder URL');
    const raw = rest[0];
    const fromUrl = String(raw).match(/behance\.net\/gallery\/(\d+)\/([A-Za-z0-9-]+)/i);
    let id;
    let slug = 'project';
    let url;
    if (fromUrl) {
      id = fromUrl[1];
      slug = fromUrl[2];
      url = `https://www.behance.net/gallery/${id}/${slug}`;
    } else if (/^\d+$/.test(String(raw))) {
      id = String(raw);
      url = `https://www.behance.net/gallery/${id}/${slug}`;
    } else {
      die('behance get braucht eine ID oder URL');
    }
    const page = await readMarkdown(url);
    const item = parseBehanceItem(page.body);
    if (!item.title && !item.images.length) emptyResult(flags);
    const payload = { id, url, ...item };
    emitJsonOrText(flags, payload, formatSimpleGet(item.title || id, [['Bilder', item.images]]));
    process.exit(0);
  }
  die(`unbekanntes Kommando für behance: ${command || '(fehlt)'}`);
}

async function cmdInspora(command, rest, flags) {
  if (command === 'get') {
    console.error('inspiration: Detailseite hinter Vercel-Checkpoint (HTTP 429); Medien-URL aus list nutzen oder raphael-chrome');
    process.exit(2);
  }
  if (command !== 'list') die(`unbekanntes Kommando für inspora: ${command || '(fehlt)'}`);
  if (rest.length) die('inspora list kennt keine Positionsargumente');
  const html = await fetchHtml('https://www.inspora.design/');
  const items = applyLimit(parseInsporaList(html), limitOf(flags, 20));
  if (!items.length) emptyResult(flags);
  emitJsonOrText(flags, items, formatList(items, ['slug', 'url', 'media']));
  process.exit(0);
}

async function cmdSwiped(command, rest, flags) {
  if (command !== 'list') die(`unbekanntes Kommando für swiped: ${command || '(fehlt)'}`);
  if (rest.length) die('swiped list kennt keine Positionsargumente');
  const page = await readMarkdown('https://swiped.design/');
  const items = applyLimit(parseSwipedList(page.body), limitOf(flags, 20));
  if (!items.length) emptyResult(flags);
  emitJsonOrText(flags, items, formatList(items, ['category', 'author', 'handle', 'likes']));
  process.exit(0);
}

function cmdMobbin(command, rest, flags) {
  if (command && command !== 'list') die(`unbekanntes Kommando für mobbin: ${command}`);
  const payload = { source: 'mobbin', access: 'mcp', server: 'mobbin' };
  const text = 'Mobbin läuft über den MCP-Server mobbin (OAuth, Profil raphael): Tools mcp__mobbin__* in der Session nutzen (Status: /root/tools/raphael-mcp-ondemand.sh status). Öffentliche Seite zeigt ohne Login nur die Landingpage.';
  emitJsonOrText(flags, payload, text);
  process.exit(0);
}

function waitMsOf(flags) {
  if (flags.wait == null) return 4000;
  const n = Number(flags.wait);
  if (!Number.isInteger(n) || n < 0) die('--wait muss eine ganze Zahl >= 0 sein');
  return n;
}

function shotFileSlug(targetUrl) {
  let parsed;
  try { parsed = new URL(targetUrl); } catch { die(`shot: ungültige URL ${targetUrl}`); }
  const raw = `${parsed.hostname}${parsed.pathname}`.replace(/\/+$/, '');
  return (raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'shot');
}

async function dismissCookies(page) {
  const candidates = [
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("Accept")',
    'button:has-text("Akzeptieren")',
    'button:has-text("Alle akzeptieren")',
    'button:has-text("Alle Cookies akzeptieren")',
    'button:has-text("Got it")',
    'button:has-text("I agree")',
    '[id*="accept"]:visible',
    'a:has-text("Accept all")',
  ];
  // Zwei Durchläufe: Modals wie bei Awwwards erscheinen erst nach dem ersten Wait
  // (gemessen 04.09.2026: Klick kam vor dem Modal, PNG zeigte das Overlay).
  for (let round = 0; round < 2; round++) {
    let hit = false;
    for (const sel of candidates) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 400 })) {
          await btn.click({ timeout: 2000 });
          await page.waitForTimeout(800);
          hit = true;
          break;
        }
      } catch {
        /* Banner-Variante nicht da */
      }
    }
    if (hit) break;
    await page.waitForTimeout(1500);
  }
  // Fallback: Overlay-Modal aus dem DOM entfernen, wenn der Klick es nicht schloss
  // (Awwwards: <span class="button"> ohne Handler im Screenshot-Kontext, gemessen 04.09.2026).
  try {
    await page.evaluate(() => {
      let n = 0;
      for (const e of document.querySelectorAll('[class*="cookie"],[id*="cookie"],[class*="Cookie"],[class*="consent"],[id*="consent"]')) {
        const r = e.getBoundingClientRect();
        if (r.height > 80 && getComputedStyle(e).display !== 'none') { e.remove(); n++; }
      }
      if (n) { document.body.style.overflow = 'auto'; document.documentElement.style.overflow = 'auto'; }
    });
  } catch { /* Seite ohne DOM-Zugriff */ }
  return;
  for (const sel of candidates) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click();
        await page.waitForTimeout(800);
      }
    } catch {
      /* Banner-Variante nicht da */
    }
  }
}

async function cmdShot(rest, flags) {
  const target = rest.join(' ').trim();
  if (!target) die('shot braucht eine URL');
  let parsed;
  try { parsed = new URL(target); } catch { die(`shot: ungültige URL ${target}`); }
  if (!/^https?:$/i.test(parsed.protocol)) die('shot braucht eine http(s)-URL');
  const outDir = path.resolve(flags.out || DEFAULT_SHOT_OUT);
  fs.mkdirSync(outDir, { recursive: true });
  const slug = shotFileSlug(parsed.href);
  const { chromium } = await import('/usr/lib/node_modules/playwright/index.mjs');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=swiftshader',
      '--disable-software-rasterizer',
      '--force-color-profile=srgb',
      '--disable-lcd-text',
      '--hide-scrollbars',
    ],
  });
  const viewports = [{ width: 1440, height: 900, label: '1440' }];
  if (flags.mobile) viewports.push({ width: 390, height: 844, label: '390' });
  const paths = [];
  let title = '';
  let finalUrl = parsed.href;
  try {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        userAgent: BROWSER_UA,
        locale: 'en-US',
      });
      try {
        await page.goto(parsed.href, { waitUntil: 'domcontentloaded', timeout: 45_000 });
        await page.waitForTimeout(waitMsOf(flags));
        await dismissCookies(page);
        title = await page.title();
        finalUrl = page.url();
        if (/Security Checkpoint|Just a moment|Attention Required/i.test(title || '')) {
          throw Object.assign(new Error(`Bot-Schutz: Seite über raphael-chrome (VPS-Chrome mit echtem Profil) öffnen: raphael-chrome open ${parsed.href}; raphael-chrome screenshot <id> <png>`), { code: 'BOT_SHIELD' });
        }
        const dest = path.join(outDir, `${slug}-${vp.label}.png`);
        await page.screenshot({ path: dest, fullPage: Boolean(flags.full) });
        paths.push(dest);
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }
  const payload = { paths, title, url: finalUrl, out: outDir };
  const text = [`title: ${title}`, `url: ${finalUrl}`, ...paths.map((file) => `png: ${file}`)].join('\n');
  emitJsonOrText(flags, payload, text);
  process.exit(0);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help')) {
    console.log(HELP);
    process.exit(0);
  }
  const { flags, positional } = parseCli(argv);
  const [source, command, ...rest] = positional;
  if (!source) die('Quelle fehlt (refero|navbar|magicui|reactbits|21st|landdding|awwwards|siteinspire|curated|getlayers|behance|inspora|swiped|mobbin|shot)');
  try {
    if (source === 'refero') await cmdRefero(command, rest, flags);
    else if (source === 'navbar') await cmdNavbar(command, rest, flags);
    else if (source === 'magicui') await cmdMagicui(command, rest, flags);
    else if (source === 'reactbits') await cmdReactbits(command, rest, flags);
    else if (source === '21st') await cmd21st(command, rest, flags);
    else if (source === 'landdding') await cmdLanddding(command, rest, flags);
    else if (source === 'awwwards') await cmdAwwwards(command, rest, flags);
    else if (source === 'siteinspire') await cmdSiteinspire(command, rest, flags);
    else if (source === 'curated') await cmdCurated(command, rest, flags);
    else if (source === 'getlayers') await cmdGetlayers(command, rest, flags);
    else if (source === 'behance') await cmdBehance(command, rest, flags);
    else if (source === 'inspora') await cmdInspora(command, rest, flags);
    else if (source === 'swiped') await cmdSwiped(command, rest, flags);
    else if (source === 'mobbin') cmdMobbin(command, rest, flags);
    else if (source === 'shot') await cmdShot([command, ...rest].filter(Boolean), flags);
    else die(`unbekannte Quelle ${source}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error && error.code === 'HOST_UNAVAILABLE') {
      console.error(`inspiration: ${message}`);
      process.exit(3);
    }
    if (error && error.code === 'BOT_SHIELD') {
      console.error(`inspiration: ${message}`);
      process.exit(1);
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
