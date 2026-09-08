#!/usr/bin/env node
/** Validate page-map metadata, not browser behaviour or SEO performance. */
import { readFile } from 'node:fs/promises';

const TYPES = new Set(['home', 'service-hub', 'service', 'location', 'case-study', 'guide', 'about', 'contact', 'legal']);
const STATUSES = new Set(['planned', 'built', 'verified']);
const TEXT_FIELDS = ['id', 'intent', 'uniqueValue', 'primaryAction', 'contentSource'];
const EVIDENCE_FIELDS = ['desktop', 'mobile', 'html', 'functional'];
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const placeholder = value => /^(?:todo|tbd|tbc|fixme|placeholder|pending)(?:$|[\s:._-])|^(?:n\/?a|none|null|undefined|not applicable|not available|to be (?:done|determined|added)|coming soon|\.\.\.|[-—])$/i.test(value.trim());

function validLocale(value) {
  if (!nonempty(value)) return false;
  try { return Intl.getCanonicalLocales(value).length === 1; }
  catch { return false; }
}

function httpUrl(value) {
  if (!nonempty(value) || value !== value.trim() || !/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && !url.hash ? url : null;
  } catch { return null; }
}

function routeProblem(value) {
  if (!nonempty(value) || value !== value.trim()) return 'must be a nonempty trimmed route';
  // Decode repeatedly so encoded traversal and protocol-relative paths cannot hide.
  let decoded = value;
  for (let pass = 0; pass < 8; pass++) {
    if (!decoded.startsWith('/') || decoded.startsWith('//')) return 'must start with one /';
    if (/[?#\\\s\u0000-\u001f\u007f]/.test(decoded)) return 'must not contain queries, fragments, backslashes, whitespace, or control characters';
    if (decoded.split('/').some(segment => segment === '.' || segment === '..')) return 'must not contain traversal segments';
    if (!decoded.includes('%')) return null;
    let next;
    try { next = decodeURIComponent(decoded); } catch { return 'contains invalid percent encoding'; }
    if (next === decoded) return null;
    decoded = next;
  }
  return 'contains excessive nested percent encoding';
}

function usage() {
  return 'Usage: node validate-page-map.mjs <page-map.json> [--phase plan|release] [--scope-map <agreed-page-map.json>]';
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(usage());
    return;
  }
  let input;
  let phase = 'plan';
  let phaseSeen = false;
  let scopeMap;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--phase' && !phaseSeen) {
      phaseSeen = true;
      phase = args[++i];
    } else if (args[i] === '--scope-map' && scopeMap === undefined) {
      scopeMap = args[++i];
      if (!scopeMap || scopeMap.startsWith('-')) throw new Error(usage());
    } else if (!args[i].startsWith('-') && input === undefined) {
      input = args[i];
    } else {
      throw new Error(`Invalid or repeated argument: ${args[i]}\n${usage()}`);
    }
  }
  if (!input || !['plan', 'release'].includes(phase)) throw new Error(usage());

  let data;
  try { data = JSON.parse(await readFile(input, 'utf8')); }
  catch (error) { throw new Error(`Cannot read valid JSON from ${input}: ${error.message}`); }

  const errors = [];
  const report = (where, message) => errors.push(`${where}: ${message}`);
  if (!isObject(data)) throw new Error('Root must be a JSON object.');
  if (data.version !== 1) report('version', 'must be 1');
  const siteUrl = httpUrl(data.siteUrl);
  if (!siteUrl) report('siteUrl', 'must be an absolute HTTP(S) URL without credentials or fragment');
  if (!Array.isArray(data.pages) || data.pages.length === 0) report('pages', 'must be a nonempty array');

  const pages = Array.isArray(data.pages) ? data.pages : [];
  const byRoute = new Map();
  const ids = new Set();
  const canonicalOwners = new Map();

  for (const [index, page] of pages.entries()) {
    const where = `pages[${index}]`;
    if (!isObject(page)) { report(where, 'must be an object'); continue; }
    for (const field of TEXT_FIELDS) {
      if (!nonempty(page[field])) report(`${where}.${field}`, 'must be nonempty text');
      else if (phase === 'release' && placeholder(page[field])) report(`${where}.${field}`, 'must not be a placeholder');
    }
    if (nonempty(page.id)) {
      const id = page.id.trim();
      if (ids.has(id)) report(`${where}.id`, `duplicate id ${JSON.stringify(id)}`);
      ids.add(id);
    }
    const routeError = routeProblem(page.route);
    if (routeError) report(`${where}.route`, routeError);
    else if (byRoute.has(page.route)) report(`${where}.route`, `duplicate route ${JSON.stringify(page.route)}`);
    else byRoute.set(page.route, page);

    if (!TYPES.has(page.type)) report(`${where}.type`, `must be one of ${[...TYPES].join(', ')}`);
    if (Object.hasOwn(page, 'locale')) {
      if (!validLocale(page.locale)) report(`${where}.locale`, 'must be a nonempty valid BCP 47 locale string');
    } else if (page.type === 'home' && page.route !== '/') {
      report(`${where}.locale`, 'a non-root home page requires an explicit valid BCP 47 locale string');
    }
    if (!STATUSES.has(page.buildStatus)) report(`${where}.buildStatus`, 'must be planned, built, or verified');
    if (phase === 'release' && page.buildStatus !== 'verified') report(`${where}.buildStatus`, 'release requires verified');
    if (typeof page.indexable !== 'boolean') report(`${where}.indexable`, 'must be a boolean');

    const canonical = httpUrl(page.canonical);
    if (!canonical) report(`${where}.canonical`, 'must be an absolute HTTP(S) URL without credentials or fragment');
    else if (page.indexable === true) {
      if (siteUrl && canonical.origin !== siteUrl.origin) report(`${where}.canonical`, 'indexable canonical must have the same origin as siteUrl');
      if (siteUrl && !routeError && canonical.href !== new URL(page.route, siteUrl.origin).href) {
        report(`${where}.canonical`, 'a distinct indexable launch page requires its own route as canonical (including the declared slash policy)');
      }
      if (canonicalOwners.has(canonical.href)) report(`${where}.canonical`, `duplicate indexable canonical also used by ${canonicalOwners.get(canonical.href)}`);
      else canonicalOwners.set(canonical.href, where);
    }

    if (!Array.isArray(page.proofSources)) report(`${where}.proofSources`, 'must be an array; use [] when no proof is available');
    else page.proofSources.forEach((source, n) => {
      if (!nonempty(source) || (phase === 'release' && placeholder(source))) report(`${where}.proofSources[${n}]`, 'must contain meaningful source text');
    });

    if (!Array.isArray(page.links)) report(`${where}.links`, 'must be an array of local routes');
    else page.links.forEach((link, n) => {
      const problem = routeProblem(link);
      if (problem) report(`${where}.links[${n}]`, problem);
      else if (link === page.route) report(`${where}.links[${n}]`, 'self-links do not count as internal linking');
    });

    if (page.evidence !== undefined && !isObject(page.evidence)) report(`${where}.evidence`, 'must be an object');
    if (phase === 'release') {
      for (const field of EVIDENCE_FIELDS) {
        const value = isObject(page.evidence) ? page.evidence[field] : undefined;
        if (!nonempty(value) || placeholder(value)) report(`${where}.evidence.${field}`, 'release requires a non-placeholder evidence reference');
      }
    }
  }

  const home = byRoute.get('/');
  if (!home || home.type !== 'home') report('pages', 'a home page with route / and type home is required');
  for (const [index, page] of pages.entries()) {
    if (!isObject(page)) continue;
    if (!Array.isArray(page.links)) continue;
    for (const [n, link] of page.links.entries()) {
      if (!routeProblem(link) && !byRoute.has(link)) report(`pages[${index}].links[${n}]`, `route ${JSON.stringify(link)} does not exist in pages`);
    }
    if (phase === 'release' && page.type === 'service-hub' && !page.links.some(link => byRoute.get(link)?.type === 'service')) {
      report(`pages[${index}].links`, 'a service-hub must link to at least one service subpage');
    }
  }

  // Listed links are declared crawlable edges. The browser review verifies that declaration.
  const reached = new Set();
  const queue = home ? ['/'] : [];
  for (let i = 0; i < queue.length; i++) {
    const route = queue[i];
    if (reached.has(route)) continue;
    reached.add(route);
    const page = byRoute.get(route);
    if (page && Array.isArray(page.links)) for (const link of page.links) if (byRoute.has(link) && !reached.has(link)) queue.push(link);
  }
  for (const [route, page] of byRoute) if (page.indexable === true && !reached.has(route)) report(route, 'indexable page is not reachable from / through listed links');

  // Compare with the agreed scope, not a page count invented by this tool.
  // The caller retains this snapshot; it is not tamper-proof or a browser oracle.
  if (scopeMap !== undefined) {
    let agreed;
    try { agreed = JSON.parse(await readFile(scopeMap, 'utf8')); }
    catch (error) { throw new Error(`Cannot read agreed scope ${scopeMap}: ${error.message}`); }
    if (!isObject(agreed) || agreed.version !== 1 || !Array.isArray(agreed.pages) || !agreed.pages.length || !httpUrl(agreed.siteUrl)) {
      throw new Error('Agreed scope must be a version 1 page map with siteUrl and nonempty pages.');
    }
    if (siteUrl && new URL(agreed.siteUrl).origin !== siteUrl.origin) report('scope', 'site origin differs from agreed scope');
    const agreedRoutes = new Set();
    for (const expected of agreed.pages) {
      if (!isObject(expected) || routeProblem(expected.route) || !nonempty(expected.id) || typeof expected.indexable !== 'boolean' || !httpUrl(expected.canonical)) {
        throw new Error('Agreed scope contains an invalid route contract.');
      }
      if (agreedRoutes.has(expected.route)) throw new Error('Agreed scope contains duplicate routes.');
      agreedRoutes.add(expected.route);
      const actual = byRoute.get(expected.route);
      if (!actual) report('scope', `agreed route ${JSON.stringify(expected.route)} is missing`);
      else for (const field of ['id', 'indexable', 'canonical']) {
        if (actual[field] !== expected[field]) report(`scope:${expected.route}.${field}`, 'differs from agreed scope; resolve the scope change explicitly');
      }
    }
    for (const route of byRoute.keys()) if (!agreedRoutes.has(route)) report('scope', `route ${JSON.stringify(route)} is outside agreed scope`);
  }

  if (errors.length) {
    console.error(`CONTRACT_INVALID (${errors.length} issue${errors.length === 1 ? '' : 's'})`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(`CONTRACT_VALID — ${phase} phase, ${pages.length} pages.`);
  console.log('Metadata consistency only; this does not certify browser behaviour, evidence authenticity, accessibility, indexing, rankings, or SEO performance.');
}

main().catch(error => {
  console.error(`CONTRACT_INVALID\n- ${error.message}`);
  process.exitCode = 1;
});
