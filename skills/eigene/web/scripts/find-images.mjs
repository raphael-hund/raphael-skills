#!/usr/bin/env node
// Node 22+, standard library only. Remote assets and metadata are untrusted.
import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import net from 'node:net';
import { createHash, randomUUID } from 'node:crypto';
import { promises as fs, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const UA = 'Mozilla/5.0 (compatible; MAKE-Web-ImageSearch/1.0; local asset research)';
const MAX_BYTES = 25 * 1024 * 1024;
const TIMEOUT = 20000;
const UNKNOWN = 'Keine Lizenzangabe vom Suchdienst; Quellseite gespeichert.';
const PROVIDERS = ['simpleicons', 'svgl', 'logodev', 'brandfetch', 'wikimedia', 'duckduckgo', 'iconify', 'unsplash', 'pexels', 'serper', 'serpapi', 'google'];
const KEY_NAMES = ['SERPER_API_KEY', 'SERPAPI_API_KEY', 'SERPAPI_KEY', 'GOOGLE_API_KEY', 'GOOGLE_CSE_API_KEY', 'GOOGLE_CSE_ID', 'GOOGLE_CX', 'GOOGLE_SEARCH_CX', 'UNSPLASH_ACCESS_KEY', 'UNSPLASH_API_KEY', 'PEXELS_API_KEY', 'LOGO_DEV_TOKEN', 'LOGODEV_TOKEN', 'LOGO_DEV_PUBLISHABLE_KEY', 'BRANDFETCH_CLIENT_ID', 'BRANDFETCH_API_KEY'];

export function redact(value, env = process.env) {
  if (Array.isArray(value)) return value.map(v => redact(v, env));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, redact(v, env)]));
  if (typeof value !== 'string') return value;
  let text = value;
  for (const key of KEY_NAMES) if (env[key]) {
    text = text.split(env[key]).join('[REDACTED]');
    text = text.split(encodeURIComponent(env[key])).join('[REDACTED]');
  }
  return text.replace(/([?&](?:key|api_key|token|client_id|clientid|access_key)=)[^&#\s"<>]*/gi, '$1[REDACTED]');
}

export function parseArgs(argv) {
  const options = { max: 5, provider: 'auto', download: null };
  if (argv.includes('--help') || argv.includes('-h')) return { help: true };
  const command = argv[0];
  if (!['logo', 'icon', 'photo', 'search'].includes(command)) throw new Error('Unterbefehl fehlt: logo, icon, photo oder search. Siehe --help.');
  const words = [];
  let literal = false;
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--') { literal = true; continue; }
    if (!literal && arg.startsWith('--')) {
      const [flag, inline] = arg.split(/=(.*)/s);
      if (!['--max', '--download', '--provider'].includes(flag)) throw new Error(`Unbekannte Option: ${flag}`);
      const value = inline ?? argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`Wert fehlt für ${flag}`);
      if (flag === '--max') {
        if (!/^\d+$/.test(value) || +value < 1 || +value > 50) throw new Error('--max muss eine ganze Zahl von 1 bis 50 sein.');
        options.max = +value;
      } else if (flag === '--download') options.download = path.resolve(value);
      else options.provider = value;
    } else words.push(arg);
  }
  const query = words.join(' ').trim();
  if (!query || query.length > 500) throw new Error('Suchbegriff muss 1 bis 500 Zeichen enthalten.');
  if (options.provider !== 'auto' && !PROVIDERS.includes(options.provider)) throw new Error(`Unbekannter Anbieter: ${options.provider}`);
  return { command, query, ...options };
}

export function isPublicAddress(address) {
  const a = address.replace(/^\[|\]$/g, '').toLowerCase();
  if (net.isIP(a) === 4) {
    const [x, y] = a.split('.').map(Number);
    return !(x === 0 || x === 10 || x === 127 || x >= 224 || (x === 100 && y >= 64 && y <= 127) || (x === 169 && y === 254) || (x === 172 && y >= 16 && y <= 31) || (x === 192 && [0, 168].includes(y)) || (x === 198 && [18, 19].includes(y)));
  }
  // Permit global unicast IPv6 only; reject local, mapped IPv4 and transition ranges.
  return net.isIP(a) === 6 && /^[23][0-9a-f]{3}:/.test(a) && !/^200[12]:/.test(a);
}

export function validateURL(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Nur öffentliche HTTP(S)-URLs ohne Zugangsdaten erlaubt.');
  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  if (url.port && !['80', '443'].includes(url.port)) throw new Error('Unzulässiger Netzwerkport.');
  if (hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal') || (net.isIP(hostname) && !isPublicAddress(hostname))) throw new Error('Lokale Netzwerkadresse abgewiesen.');
  return url;
}

function safeLookup(hostname, options, callback) {
  // Validate the addresses actually passed to the socket, avoiding a DNS check/use race.
  dns.lookup(hostname, { all: true, verbatim: true }, (error, addresses) => {
    if (error) return callback(error);
    if (!addresses.length || addresses.some(a => !isPublicAddress(a.address))) return callback(new Error('DNS liefert eine gesperrte Netzwerkadresse.'));
    if (options.all) return callback(null, addresses);
    const candidate = addresses.find(a => !options.family || a.family === options.family) ?? addresses[0];
    callback(null, candidate.address, candidate.family);
  });
}

export async function request(value, options = {}, redirects = 0) {
  const url = validateURL(value);
  const limit = options.limit ?? MAX_BYTES;
  const response = await new Promise((resolve, reject) => {
    const transport = url.protocol === 'https:' ? https : http;
    const req = transport.request(url, {
      method: options.method ?? 'GET', lookup: safeLookup,
      headers: { 'User-Agent': UA, Accept: '*/*', 'Accept-Encoding': 'identity', ...options.headers },
    }, res => {
      res.on('error', reject);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume(); resolve({ status: res.statusCode, headers: res.headers, buffer: Buffer.alloc(0), url: url.href }); return;
      }
      if (Number(res.headers['content-length']) > limit) { res.destroy(new Error('Antwort überschreitet das Grössenlimit.')); return; }
      const chunks = []; let size = 0;
      res.on('data', chunk => {
        size += chunk.length;
        if (size > limit) res.destroy(new Error('Antwort überschreitet das Grössenlimit.'));
        else chunks.push(chunk);
      });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, buffer: Buffer.concat(chunks), url: url.href }));
      res.on('aborted', () => reject(new Error('Antwort vorzeitig abgebrochen.')));
    });
    const timer = setTimeout(() => req.destroy(new Error(`Zeitlimit von ${TIMEOUT / 1000} Sekunden erreicht.`)), TIMEOUT);
    req.on('close', () => clearTimeout(timer));
    req.on('error', reject);
    req.end(options.body);
  });
  if (response.status >= 300 && response.status < 400 && response.headers.location) {
    if (redirects >= 4) throw new Error('Zu viele Weiterleitungen.');
    const next = validateURL(new URL(response.headers.location, url).href);
    if (url.protocol === 'https:' && next.protocol !== 'https:') throw new Error('HTTPS-Weiterleitung auf HTTP abgewiesen.');
    const headers = { ...options.headers };
    if (next.origin !== url.origin) {
      for (const key of Object.keys(headers)) if (/authorization|api.?key|cookie/i.test(key)) delete headers[key];
    }
    const follow = { ...options, headers };
    if (response.status === 303 || ([301, 302].includes(response.status) && options.method === 'POST')) { follow.method = 'GET'; delete follow.body; }
    return request(next.href, follow, redirects + 1);
  }
  if (response.status < 200 || response.status >= 300) throw new Error(`HTTP ${response.status} von ${url.hostname}`);
  return response;
}

function dimensions(width, height) {
  width = Number(width); height = Number(height);
  return { width: Number.isFinite(width) && width > 0 ? width : null, height: Number.isFinite(height) && height > 0 ? height : null };
}

export function inspectImage(buffer) {
  let type, ext, width = null, height = null;
  if (buffer.length >= 33 && buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) && buffer.toString('ascii', 12, 16) === 'IHDR') {
    if (buffer.indexOf(Buffer.from('IEND')) < 0) throw new Error('PNG unvollständig.');
    type = 'image/png'; ext = 'png'; width = buffer.readUInt32BE(16); height = buffer.readUInt32BE(20);
  } else if (buffer.length >= 10 && /^GIF8[79]a$/.test(buffer.toString('ascii', 0, 6))) {
    if (buffer.at(-1) !== 0x3b) throw new Error('GIF unvollständig.');
    type = 'image/gif'; ext = 'gif'; width = buffer.readUInt16LE(6); height = buffer.readUInt16LE(8);
  } else if (buffer.length >= 12 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    type = 'image/jpeg'; ext = 'jpg';
    for (let i = 2; i < buffer.length - 8;) {
      if (buffer[i] !== 0xff) break;
      while (buffer[i] === 0xff) i++;
      const marker = buffer[i++];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      const length = buffer.readUInt16BE(i);
      if (length < 2 || i + length > buffer.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 8) { height = buffer.readUInt16BE(i + 3); width = buffer.readUInt16BE(i + 5); break; }
      i += length;
    }
    if (!width || buffer.lastIndexOf(Buffer.from([0xff, 0xd9])) < 10) throw new Error('JPEG unvollständig oder ohne Bildgrösse.');
  } else if (buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    if (buffer.readUInt32LE(4) + 8 > buffer.length) throw new Error('WebP unvollständig.');
    type = 'image/webp'; ext = 'webp';
    const format = buffer.toString('ascii', 12, 16);
    if (format === 'VP8X') { width = 1 + buffer.readUIntLE(24, 3); height = 1 + buffer.readUIntLE(27, 3); }
    else if (format === 'VP8 ' && buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) { width = buffer.readUInt16LE(26) & 0x3fff; height = buffer.readUInt16LE(28) & 0x3fff; }
    else if (format === 'VP8L' && buffer[20] === 0x2f) { const bits = buffer.readUInt32LE(21); width = (bits & 0x3fff) + 1; height = ((bits >>> 14) & 0x3fff) + 1; }
    if (!width) throw new Error('WebP-Bildgrösse nicht lesbar.');
  } else if (buffer.length >= 24 && buffer.toString('ascii', 4, 8) === 'ftyp' && /avif|avis/.test(buffer.toString('ascii', 8, Math.min(buffer.readUInt32BE(0), buffer.length)))) {
    type = 'image/avif'; ext = 'avif';
    const at = buffer.indexOf(Buffer.from('ispe'));
    if (at >= 4 && at + 16 <= buffer.length && buffer.readUInt32BE(at - 4) >= 20) { width = buffer.readUInt32BE(at + 8); height = buffer.readUInt32BE(at + 12); }
  } else if (buffer.length >= 22 && buffer.readUInt32LE(0) === 0x00010000 && buffer.readUInt16LE(4) > 0) {
    type = 'image/x-icon'; ext = 'ico'; width = buffer[6] || 256; height = buffer[7] || 256;
    if (buffer.readUInt32LE(18) + buffer.readUInt32LE(14) > buffer.length) throw new Error('ICO unvollständig.');
  } else {
    let text;
    try { text = new TextDecoder('utf-8', { fatal: true }).decode(buffer); } catch { throw new Error('Unbekannte Bildsignatur.'); }
    const svg = text.replace(/^﻿/, '').replace(/^\s*<\?xml\s[^?]*\?>/i, '').replace(/<!--[^]*?-->/g, '').trim();
    const root = svg.match(/^<svg\b([^>]*?)(\/?)>/i);
    if (!root || (!root[2] && !/<\/svg>\s*$/i.test(svg))) throw new Error('Keine Bilddatei; HTML/JSON oder unbekanntes Format.');
    // Reject active content conservatively; this is not a general-purpose XML sanitizer.
    if (/<!DOCTYPE|<!ENTITY|<\s*(?:script|handler|foreignObject|iframe|object|embed|animate\w*|set)\b|\son[a-z]+\s*=|@import|javascript\s*:|<\?xml-stylesheet|&(?!(?:amp|lt|gt|apos|quot|#\d{1,7}|#x[0-9a-f]{1,6});)[a-z#][\w]*;/i.test(svg)) throw new Error('SVG enthält aktive oder nicht unterstützte Inhalte.');
    for (const match of svg.matchAll(/(?:href|src)\s*=\s*["']([^"']*)["']|url\(\s*["']?([^)'"\s]+)/gi)) {
      if (!(match[1] ?? match[2]).startsWith('#')) throw new Error('SVG enthält externe Ressourcen.');
    }
    type = 'image/svg+xml'; ext = 'svg';
    const attr = name => root[1].match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, 'i'))?.[1];
    const vb = attr('viewBox')?.trim().split(/[\s,]+/).map(Number);
    const absolute = value => /^\d+(?:\.\d+)?(?:px)?$/.test(value ?? '') ? parseFloat(value) : null;
    width = absolute(attr('width')) ?? (vb?.length === 4 ? vb[2] : null);
    height = absolute(attr('height')) ?? (vb?.length === 4 ? vb[3] : null);
  }
  if ((width !== null && (!Number.isFinite(width) || width <= 0 || width > 100000)) || (height !== null && (!Number.isFinite(height) || height <= 0 || height > 100000)) || (width && height && width * height > 200000000)) throw new Error('Unplausible Bildgrösse.');
  return { type, ext, width, height };
}

const normalize = text => text.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
function simpleSlug(query) {
  const aliases = { 'google.com': 'google', 'stripe.com': 'stripe', 'github.com': 'github', 'paypal.com': 'paypal', 'visa.com': 'visa' };
  return aliases[query.toLowerCase()] ?? normalize(query.replace(/&/g, 'and').replace(/\+/g, 'plus').replace(/\./g, 'dot'));
}
function domainFrom(query) {
  let domain = query.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0];
  if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)) throw new Error('Für diesen Logoanbieter eine bekannte Firmendomain angeben, etwa google.com.');
  return domain;
}
const cleanHTML = text => String(text ?? '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
function item(url, source, page, width, height, license_hint = UNKNOWN, extra = {}) {
  return { url, ...dimensions(width, height), source, page: page ?? null, license_hint, ...extra };
}
function isPreview(result) {
  try { return /(^|\.)(alamy\.com|gettyimages\.[a-z.]+|istockphoto\.com|shutterstock\.com|dreamstime\.com|depositphotos\.com|123rf\.com|ftcdn\.net|stock\.adobe\.com|freepik\.com|stockfood\.com|agefotostock\.com|mauritius-images\.com)$/.test(new URL(result.url).hostname) || /(?:watermark|watermarked|largepreviews|stock-photo-preview)/i.test(result.url); } catch { return true; }
}

export function createClient({ env = process.env, fetcher = request, warn = message => console.error(`[bildsuche] ${redact(message, env)}`) } = {}) {
  const cache = new Map();
  const firstKey = (...names) => names.map(n => env[n]).find(Boolean);
  const key = (...names) => { const value = firstKey(...names); if (!value) throw new Error(`Schlüssel fehlt: ${names.join(' oder ')}`); return value; };
  const json = async (url, options = {}) => {
    const response = await fetcher(url, { limit: 8 * 1024 * 1024, ...options });
    try { return JSON.parse(response.buffer.toString('utf8')); } catch { throw new Error(`JSON erwartet von ${new URL(url).hostname}; mögliche Suchsperre.`); }
  };
  const image = async url => {
    const response = cache.get(url) ?? await fetcher(url);
    const info = inspectImage(response.buffer);
    cache.set(url, response);
    return { response, info };
  };
  const providers = {
    async simpleicons(q) {
      const slug = simpleSlug(q);
      if (!slug) return [];
      const url = `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`;
      const { info } = await image(url);
      return [item(url, 'simpleicons', `https://simpleicons.org/?q=${encodeURIComponent(q)}`, info.width, info.height, 'Sammlung: CC0-1.0; markenspezifische Angaben auf der Quellseite.', { title: q, variant: 'monochrome' })];
    },
    async svgl(q) {
      const data = await json(`https://api.svgl.app?search=${encodeURIComponent(q.replace(/\.com$/i, ''))}`);
      if (!Array.isArray(data)) throw new Error('SVGL-Antwort ohne Trefferliste.');
      const exact = data.filter(x => normalize(x.title) === normalize(q.replace(/\.com$/i, '')));
      return exact.flatMap(x => {
        const variants = typeof x.route === 'string' ? [['default', x.route]] : Object.entries(x.route ?? {});
        if (x.wordmark) variants.push(...(typeof x.wordmark === 'string' ? [['wordmark', x.wordmark]] : Object.entries(x.wordmark).map(([k, v]) => [`wordmark-${k}`, v])));
        return variants.map(([variant, url]) => item(url, 'svgl', x.url ?? 'https://svgl.app', null, null, 'Markenasset aus SVGL; Anbieter nennt Markenrechte. Metadaten: https://svgl.app', { title: x.title, variant }));
      });
    },
    async logodev(q) {
      const token = key('LOGO_DEV_TOKEN', 'LOGODEV_TOKEN', 'LOGO_DEV_PUBLISHABLE_KEY');
      let domain = null;
      try { domain = domainFrom(q); } catch { /* The API also supports company-name lookup. */ }
      const identifier = domain ?? `name/${encodeURIComponent(q)}`;
      const url = `https://img.logo.dev/${identifier}?token=${encodeURIComponent(token)}&size=512&format=png&fallback=404`;
      const { info } = await image(url);
      return [item(url, 'logodev', domain ? `https://${domain}` : 'https://www.logo.dev', info.width, info.height, 'Logo.dev: tarifabhängige Attribution und Speicherregeln; https://www.logo.dev/pricing', { credential_required: true })];
    },
    async brandfetch(q) {
      const domain = domainFrom(q);
      if (!firstKey('BRANDFETCH_API_KEY') && firstKey('BRANDFETCH_CLIENT_ID')) {
        // The free Logo CDN documents browser hotlinking and excludes programmatic downloads.
        throw new Error('Brandfetch-Client-ID gilt für Browser-Hotlinking. CLI-Downloads benötigen BRANDFETCH_API_KEY für die Brand API; nächster Anbieter.');
      }
      const data = await json(`https://api.brandfetch.io/v2/brands/${domain}`, { headers: { Authorization: `Bearer ${key('BRANDFETCH_API_KEY')}` } });
      return (data.logos ?? []).flatMap(logo => (logo.formats ?? []).map(f => item(f.src, 'brandfetch', `https://${domain}`, f.width, f.height, 'Brandfetch Brand API; Markenangaben auf der Quellseite.', { variant: logo.type }))).sort((a, b) => Number(b.url.endsWith('.svg')) - Number(a.url.endsWith('.svg')));
    },
    async iconify(q, count) {
      const data = await json(`https://api.iconify.design/search?query=${encodeURIComponent(q)}&limit=${Math.max(32, count)}`);
      return (data.icons ?? []).map(id => {
        const [prefix, name] = id.split(':'); const collection = data.collections?.[prefix];
        return item(`https://api.iconify.design/${prefix}/${name}.svg`, 'iconify', `https://icon-sets.iconify.design/${prefix}/${name}/`, null, null, collection?.license ? `${collection.license.title}; ${collection.license.url ?? collection.license.spdx ?? ''}` : UNKNOWN, { title: id });
      });
    },
    async wikimedia(q, count) {
      const params = new URLSearchParams({ action: 'query', generator: 'search', gsrsearch: q, gsrnamespace: '6', gsrlimit: String(Math.min(50, count)), prop: 'imageinfo', iiprop: 'url|size|extmetadata', format: 'json' });
      const data = await json(`https://commons.wikimedia.org/w/api.php?${params}`);
      if (data.error) throw new Error(`Wikimedia: ${data.error.code}`);
      return Object.values(data.query?.pages ?? {}).sort((a, b) => a.index - b.index).flatMap(p => (p.imageinfo ?? []).filter(i => /\.(svg|png|jpe?g|gif|webp|avif)(?:\?|$)/i.test(i.url)).map(i => {
        const m = i.extmetadata ?? {};
        return item(i.url, 'wikimedia', i.descriptionurl, i.width, i.height, [m.LicenseShortName?.value, m.LicenseUrl?.value, m.Restrictions?.value].filter(Boolean).map(cleanHTML).join('; ') || UNKNOWN, { title: p.title, attribution: cleanHTML(m.Artist?.value), attribution_required: m.AttributionRequired?.value ?? null });
      }));
    },
    async duckduckgo(q) {
      const home = `https://duckduckgo.com/?${new URLSearchParams({ q, iax: 'images', ia: 'images' })}`;
      const response = await fetcher(home, { limit: 2 * 1024 * 1024 });
      const html = response.buffer.toString('utf8');
      const vqd = html.match(/\bvqd\s*[:=]\s*["']([^"']+)["']/)?.[1] ?? html.match(/\bvqd=([\d-]+)/)?.[1];
      if (!vqd) throw new Error('DuckDuckGo liefert keinen vqd-Token; mögliche Suchsperre.');
      const data = await json(`https://duckduckgo.com/i.js?${new URLSearchParams({ l: 'de-de', o: 'json', q, vqd, f: ',,,', p: '1' })}`, { headers: { Referer: home, Accept: 'application/json' } });
      if (!Array.isArray(data.results)) throw new Error('DuckDuckGo liefert keine Bildliste; mögliche Suchsperre.');
      return data.results.map(r => item(r.image, 'duckduckgo', r.url, r.width, r.height, UNKNOWN, { title: r.title }));
    },
    async unsplash(q, count) {
      const auth = `Client-ID ${key('UNSPLASH_ACCESS_KEY', 'UNSPLASH_API_KEY')}`;
      const data = await json(`https://api.unsplash.com/search/photos?${new URLSearchParams({ query: q, per_page: String(Math.min(30, count)) })}`, { headers: { Authorization: auth, 'Accept-Version': 'v1' } });
      return (data.results ?? []).map(r => item(r.urls?.regular, 'unsplash', r.links?.html, r.width, r.height, 'Unsplash API: Attribution, Hotlinking und Download-Tracking; https://unsplash.com/documentation', { title: r.alt_description, attribution: r.user?.name, attribution_url: r.user?.links?.html, download_tracking_url: r.links?.download_location, embed_url: r.urls?.regular, dimensions_hint: 'Originalmasse vom Anbieter; Downloadmasse separat prüfen.' }));
    },
    async pexels(q, count) {
      const data = await json(`https://api.pexels.com/v1/search?${new URLSearchParams({ query: q, per_page: String(Math.min(80, count)) })}`, { headers: { Authorization: key('PEXELS_API_KEY') } });
      return (data.photos ?? []).map(r => item(r.src?.original, 'pexels', r.url, r.width, r.height, 'Pexels-Lizenz und API-Bedingungen: https://www.pexels.com/license/; https://www.pexels.com/api/', { title: r.alt, attribution: r.photographer, attribution_url: r.photographer_url }));
    },
    async serper(q, count) {
      const data = await json('https://google.serper.dev/images', { method: 'POST', headers: { 'X-API-KEY': key('SERPER_API_KEY'), 'Content-Type': 'application/json' }, body: JSON.stringify({ q, num: Math.min(100, count), gl: 'ch', hl: 'de' }) });
      return (data.images ?? []).map(r => item(r.imageUrl, 'serper', r.link, r.imageWidth, r.imageHeight, UNKNOWN, { title: r.title }));
    },
    async serpapi(q) {
      const data = await json(`https://serpapi.com/search.json?${new URLSearchParams({ engine: 'google_images', q, api_key: key('SERPAPI_API_KEY', 'SERPAPI_KEY'), hl: 'de', gl: 'ch' })}`);
      if (data.error) throw new Error(`SerpAPI: ${data.error}`);
      return (data.images_results ?? []).map(r => item(r.original, 'serpapi', r.link, r.original_width, r.original_height, UNKNOWN, { title: r.title }));
    },
    async google(q, count) {
      const data = await json(`https://www.googleapis.com/customsearch/v1?${new URLSearchParams({ key: key('GOOGLE_CSE_API_KEY', 'GOOGLE_API_KEY'), cx: key('GOOGLE_CSE_ID', 'GOOGLE_CX', 'GOOGLE_SEARCH_CX'), searchType: 'image', q, num: String(Math.min(10, count)) })}`);
      if (data.error) throw new Error(`Google: ${data.error.message}`);
      return (data.items ?? []).map(r => item(r.link, 'google', r.image?.contextLink, r.image?.width, r.image?.height, UNKNOWN, { title: r.title }));
    },
  };

  async function search(options) {
    const { command, query, max, provider } = options;
    const attempts = []; const count = Math.min(100, Math.max(20, max * 3));
    let order;
    if (provider !== 'auto') order = [provider];
    else if (command === 'logo') order = ['simpleicons', 'svgl', ...(firstKey('LOGO_DEV_TOKEN', 'LOGODEV_TOKEN', 'LOGO_DEV_PUBLISHABLE_KEY') ? ['logodev'] : []), ...(firstKey('BRANDFETCH_CLIENT_ID', 'BRANDFETCH_API_KEY') ? ['brandfetch'] : []), 'wikimedia', 'duckduckgo'];
    else if (command === 'icon') order = ['iconify'];
    else if (command === 'photo') order = ['duckduckgo', ...(firstKey('UNSPLASH_ACCESS_KEY', 'UNSPLASH_API_KEY') ? ['unsplash'] : []), ...(firstKey('PEXELS_API_KEY') ? ['pexels'] : []), 'wikimedia'];
    else order = ['duckduckgo', ...(firstKey('SERPER_API_KEY') ? ['serper'] : []), ...(firstKey('SERPAPI_API_KEY', 'SERPAPI_KEY') ? ['serpapi'] : []), ...(firstKey('GOOGLE_CSE_API_KEY', 'GOOGLE_API_KEY') && firstKey('GOOGLE_CSE_ID', 'GOOGLE_CX', 'GOOGLE_SEARCH_CX') ? ['google'] : []), 'wikimedia'];
    for (const name of order.filter(name => !options.excludeProviders?.includes(name))) {
      try {
        const q = command === 'logo' && ['wikimedia', 'duckduckgo'].includes(name) ? `${query} logo` : query;
        const found = await providers[name](q, count); const seen = new Set();
        const results = found.filter(r => {
          try { validateURL(r.url); } catch { return false; }
          if (seen.has(r.url) || isPreview(r)) return false;
          seen.add(r.url); return true;
        });
        attempts.push({ provider: name, found: found.length, usable_candidates: results.length });
        if (results.length) return { results: results.slice(0, count), attempts };
      } catch (error) { attempts.push({ provider: name, error: redact(error.message, env) }); warn(`${name}: ${error.message}`); }
    }
    return { results: [], attempts };
  }

  async function download(results, options, attempts = []) {
    const directory = options.download;
    await fs.mkdir(directory, { recursive: true });
    const lock = path.join(directory, '.image-search.lock');
    const handle = await fs.open(lock, 'wx').catch(error => { throw new Error(`Downloadordner gesperrt oder nicht schreibbar: ${error.code}`); });
    let temporary;
    try {
      await handle.writeFile(JSON.stringify({ pid: process.pid, started_at: new Date().toISOString() }));
      const manifestPath = path.join(directory, 'manifest.json');
      let manifest = { schema_version: 1, assets: [], runs: [] };
      try {
        const stat = await fs.lstat(manifestPath);
        if (!stat.isFile() || stat.isSymbolicLink()) throw new Error('Manifest ist keine reguläre Datei.');
        manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
        if (manifest.schema_version !== 1 || !Array.isArray(manifest.assets) || !Array.isArray(manifest.runs)) throw new Error('Vorhandenes Manifest hat ein unbekanntes Schema.');
      } catch (error) { if (error.code !== 'ENOENT') throw error; }
      const run = { id: randomUUID(), command: options.command, query: options.query, searched_at: new Date().toISOString(), provider: options.provider, attempts, requested_max: options.max, files: [], errors: [] };
      const downloaded = [];
      for (const result of results) {
        if (downloaded.length >= options.max) break;
        try {
          const { response, info } = await image(result.url);
          cache.delete(result.url);
          if (result.source === 'unsplash') {
            if (!result.download_tracking_url) throw new Error('Unsplash-Download-Tracking fehlt.');
            const tracking = validateURL(result.download_tracking_url);
            if (tracking.origin !== 'https://api.unsplash.com' || !/^\/photos\/[^/]+\/download$/.test(tracking.pathname)) throw new Error('Unsplash-Tracking-URL abgewiesen.');
            await json(tracking.href, { headers: { Authorization: `Client-ID ${key('UNSPLASH_ACCESS_KEY', 'UNSPLASH_API_KEY')}`, 'Accept-Version': 'v1' } });
          }
          const sha256 = createHash('sha256').update(response.buffer).digest('hex');
          const filename = `${sha256}.${info.ext}`; const file = path.join(directory, filename);
          try { await fs.writeFile(file, response.buffer, { flag: 'wx' }); }
          catch (error) {
            if (error.code !== 'EEXIST') throw error;
            const stat = await fs.lstat(file);
            if (!stat.isFile() || stat.isSymbolicLink() || createHash('sha256').update(await fs.readFile(file)).digest('hex') !== sha256) throw new Error('Vorhandene Zieldatei weicht vom Inhaltshash ab.');
          }
          const asset = redact({ ...result, ...dimensions(info.width, info.height), original_width: result.width, original_height: result.height, file: filename, fetched_at: new Date().toISOString(), final_url: response.url, sha256, bytes: response.buffer.length, mime: info.type, extension: info.ext, declared_content_type: response.headers['content-type'] ?? null, type_check: info.ext === 'svg' ? 'svg-root-and-active-content-check' : 'magic-bytes-and-header', run_id: run.id }, env);
          const existing = manifest.assets.findIndex(a => a.sha256 === sha256 && a.url === asset.url && a.page === asset.page);
          if (existing >= 0) manifest.assets[existing] = { ...manifest.assets[existing], ...asset };
          else manifest.assets.push(asset);
          downloaded.push({ ...asset, file }); run.files.push(filename);
        } catch (error) { run.errors.push(redact({ url: result.url, source: result.source, error: error.message }, env)); warn(`Download verworfen: ${error.message}`); }
      }
      run.finished_at = new Date().toISOString(); manifest.updated_at = run.finished_at; manifest.runs.push(redact(run, env));
      temporary = path.join(directory, `.manifest-${randomUUID()}.tmp`);
      await fs.writeFile(temporary, `${JSON.stringify(redact(manifest, env), null, 2)}\n`, { flag: 'wx' });
      await fs.rename(temporary, manifestPath); temporary = null;
      if (downloaded.length < options.max) warn(`${downloaded.length} von höchstens ${options.max} Dateien geladen; Details im Manifest.`);
      return downloaded;
    } finally {
      if (temporary) await fs.unlink(temporary).catch(() => {});
      await handle.close(); await fs.unlink(lock);
    }
  }
  return { search, download, providers };
}

export async function main(argv = process.argv.slice(2)) {
  try {
    const options = parseArgs(argv);
    if (options.help) {
      console.log(`Bildsuche für Node 22, ohne Abhängigkeiten\n\n  node find-images.mjs logo <firma|slug> [Optionen]\n  node find-images.mjs icon <begriff> [Optionen]\n  node find-images.mjs photo <query> [Optionen]\n  node find-images.mjs search <query> [Optionen]\n\n  --max N          Höchstens N Ergebnisse/erfolgreiche Downloads, 1–50, Standard 5\n  --download DIR   Bilder und ergänzendes manifest.json speichern\n  --provider NAME  auto oder ${PROVIDERS.join(', ')}\n\nJSON auf stdout; Diagnosen auf stderr. Exit 0: Treffer, 2: leer, 1: Fehler.\n--download prüft Dateiinhalte; SVG nur als externe Bilddatei einbauen.\nSchlüssel aus Umgebungsvariablen; siehe image-search.md. Keine .env-Dateien laden.`);
      return 0;
    }
    const client = createClient();
    const excluded = []; let hadCandidates = false;
    while (true) {
      const { results, attempts } = await client.search({ ...options, excludeProviders: excluded });
      excluded.push(...attempts.map(a => a.provider));
      hadCandidates ||= results.length > 0;
      const output = options.download ? await client.download(results, options, attempts) : results.slice(0, options.max);
      if (output.length) { console.log(JSON.stringify(redact(output), null, 2)); return 0; }
      if (!options.download || options.provider !== 'auto' || !results.length) {
        console.log('[]');
        console.error('[bildsuche] Keine passenden Dateien; Suchbegriff oder Anbieter wechseln.');
        return hadCandidates ? 1 : 2;
      }
      console.error('[bildsuche] Alle Downloads dieses Anbieters fehlgeschlagen; nächster Anbieter.');
    }
  } catch (error) { console.error(`[bildsuche] ${redact(error.message)}`); console.log('[]'); return 1; }
}

const invokedDirectly = (() => {
  if (!process.argv[1]) return false;
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
})();
if (invokedDirectly) process.exitCode = await main(); // Symlink-Aufrufe (~/.claude/skills/web, ~/.codex/skills/web) eingeschlossen.
