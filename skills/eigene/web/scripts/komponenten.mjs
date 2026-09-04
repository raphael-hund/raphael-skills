#!/usr/bin/env node
// Findet, zeigt und zieht genau eine Komponente aus Registry-, Vendor-, npm-
// oder HTML-Bibliotheken. Keine Installation, kein Login, keine npm-Abhängigkeit.
//
//   node komponenten.mjs --help
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const UA = 'raphael-web-komponenten/1.0';
const FETCH_TIMEOUT_MS = 45_000;
const JINA = 'https://r.jina.ai/';
const SHADCN_CLI = '/root/.npm/_npx/d66c5096c7023bfb/node_modules/shadcn/dist/index.js';
const WEB_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const REGISTRIES_URL = 'https://ui.shadcn.com/r/registries.json';
const VENDOR_INDEX = path.join(WEB_ROOT, 'resources', 'components', 'INDEX.md');

const HELP = `Usage: node scripts/komponenten.mjs libs [--json]
       node scripts/komponenten.mjs search <lib|@namespace> "<query>" [--json]
       node scripts/komponenten.mjs view <@namespace/name> [--json]
       node scripts/komponenten.mjs get <@namespace/name> --out <verzeichnis> [--json]
       node scripts/komponenten.mjs install-hint <@namespace/name> [--json]
Dieses Skript statt npx shadcn add: EINE Komponente vor dem Einbau finden, prüfen oder nach --out ziehen.
npx shadcn add erst nach Prüfung nutzen; install-hint druckt nur den Befehl und führt nichts aus.
MCP/design-mcp für 21st.dev nutzen; HTML/npm-Dokumentation und Vendor-INDEX mit open lesen.
Registry-Lizenzen gelten nur mit Item-, package.json- oder LICENSE-Beleg, sonst „prüfen“.
Exit: 0 ok · 1 nichts gefunden/Quellfehler · 2 Bedienfehler · 3 HOST_UNAVAILABLE.`;

const EXTRA_LIBS = Object.freeze([
  { name: '21st.dev', aliases: ['21st'], route: '21st', way: 'node scripts/design-mcp.mjs 21st search|get …', license: 'prüfen', use: 'einzelne Community-Komponenten' },
  { name: 'shadcn/ui', aliases: ['shadcn'], route: 'vendor', way: 'vendor:shadcn-ui', license: 'MIT', use: 'Default-Primitives und Blocks' },
  { name: 'Beautiful UI', route: 'vendor', way: 'vendor:beautifului', license: 'MIT', use: 'Agent- und Daten-UI' },
  { name: 'beUI', route: 'vendor', way: 'vendor:beui-dev', license: 'MIT', use: 'Motion- und Agent-Komponenten' },
  { name: 'Rare UI', route: 'vendor', way: 'vendor:rareui', license: 'MIT', use: 'expressive Einzelwidgets' },
  { name: 'Transitions.dev', route: 'vendor', way: 'vendor:transitions-dev', license: 'prüfen', use: 'Transition-Rezepte' },
  { name: 'UI Skills', route: 'vendor', way: 'vendor:ui-skills', license: 'MIT; Fremd-Skills prüfen', use: 'Skill- und Pattern-Recherche' },
  { name: 'Origin UI', route: 'vendor', way: 'vendor:coss-origin-ui', license: 'AGPL-3.0-or-later', use: 'Registry-Varianten' },
  { name: 'ReUI', route: 'vendor', way: 'vendor:reui', license: 'MIT', use: 'shadcn-kompatible Varianten' },
  { name: 'Design System Checklist', route: 'vendor', way: 'vendor:design-system-checklist', license: 'prüfen', use: 'Design-System-Audit' },
  { name: 'You do not need animations', route: 'vendor', way: 'vendor:emil-no-animations', license: 'prüfen', use: 'Motion-Entscheidungsreferenz' },
  { name: 'Magic UI', aliases: ['@magicui'], route: 'registry-alias', way: 'registry:@magicui', license: 'MIT', use: 'animierte React-Komponenten' },
  { name: 'Aceternity UI', aliases: ['@aceternity'], route: 'registry-alias', way: 'registry:@aceternity', license: 'prüfen', use: 'animierte React-Komponenten und Hintergründe' },
  { name: 'Shadcn Blocks', aliases: ['@shadcnblocks'], route: 'registry-alias', way: 'registry:@shadcnblocks', license: 'prüfen', use: 'fertige shadcn-Sektionen und Blocks' },
  { name: 'Motion Primitives', aliases: ['@motion-primitives'], route: 'registry-alias', way: 'registry:@motion-primitives', license: 'prüfen', use: 'Motion-Primitives' },
  { name: 'Cult UI', aliases: ['@cult-ui'], route: 'registry-alias', way: 'registry:@cult-ui', license: 'prüfen', use: 'shadcn-kompatible Komponenten' },
  { name: 'React Bits', aliases: ['@react-bits', 'reactbits'], route: 'registry-alias', way: 'registry:@react-bits', license: 'MIT', use: 'animierte React-Komponenten' },
  { name: 'shadcn.io', route: 'html', way: 'html:https://www.shadcn.io/components', license: 'prüfen', use: 'shadcn-Komponenten und Blocks' },
  { name: 'Ruixen UI', route: 'html', way: 'html:https://ruixen.com/components', license: 'prüfen', use: 'React-Komponenten' },
  { name: 'Untitled UI React', route: 'html', way: 'html:https://www.untitledui.com/react/components', license: 'prüfen', use: 'React-UI; Login möglich' },
  { name: 'Park UI', route: 'html', way: 'html:https://park-ui.com/docs/components/accordion', license: 'prüfen', use: 'Panda-Komponenten' },
  { name: 'Hover.dev', route: 'html', way: 'html:https://www.hover.dev/components', license: 'prüfen', use: 'animierte React-Komponenten' },
  { name: 'Animata', route: 'html', way: 'html:https://animata.design/docs', license: 'prüfen', use: 'Copy-paste Motion-Komponenten' },
  { name: 'Shoogle', route: 'open', way: 'open:https://shoogle.dev (JS-App ohne statische Docs; im Browser ansehen)', license: 'prüfen', use: 'Komponenten' },
  { name: 'Float UI', route: 'html', way: 'html:https://floatui.com/components', license: 'prüfen', use: 'Tailwind-HTML-Sections' },
  { name: 'HyperUI', route: 'html', way: 'html:https://www.hyperui.dev/components/marketing/', license: 'MIT', use: 'Tailwind-HTML-Komponenten' },
  { name: 'Meraki UI', route: 'html', way: 'html:https://merakiui.com/components', license: 'MIT', use: 'Tailwind-HTML-Komponenten' },
  { name: 'Preline UI', route: 'html', way: 'html:https://preline.co/docs/index.html; npm:preline', license: 'MIT', use: 'Tailwind-Komponenten' },
  { name: 'daisyUI', route: 'html', way: 'html:https://daisyui.com/components/; npm:daisyui', license: 'MIT', use: 'Tailwind-Komponenten' },
  { name: 'Mantine', route: 'npm', way: 'npm:@mantine/core; html:https://mantine.dev/core/package/', license: 'MIT', use: 'React-Komponenten außerhalb des Default-Stacks' },
  { name: 'tsParticles', route: 'npm', way: 'npm:@tsparticles/react; html:https://particles.js.org/docs/', license: 'MIT', use: 'Partikel-Hintergründe nur nach Router-Budget' },
  { name: 'Vanta.js', route: 'npm', way: 'npm:vanta; html:https://www.vantajs.com/', license: 'MIT', use: 'WebGL-Hintergründe nur nach Router-Budget' },
  { name: 'Three.js', route: 'npm', way: 'npm:three; html:https://threejs.org/docs/', license: 'MIT', use: '3D/WebGL nur nach Router-Budget' },
  { name: 'OGL', route: 'npm', way: 'npm:ogl; html:https://oframe.github.io/ogl/', license: 'MIT', use: 'WebGL nur nach Router-Budget' },
  { name: 'PixiJS', route: 'npm', way: 'npm:pixi.js; html:https://pixijs.com/8.x/guides', license: 'MIT', use: '2D-WebGL nur nach Router-Budget' },
  { name: 'React Three Fiber', route: 'npm', way: 'npm:@react-three/fiber; html:https://r3f.docs.pmnd.rs/getting-started/introduction', license: 'MIT', use: 'React/Three nur nach Router-Budget' },
  { name: 'Theatre.js', route: 'npm', way: 'npm:@theatre/core; html:https://www.theatrejs.com/docs/latest', license: 'Apache-2.0', use: 'Motion-Sequenzen nur nach Router-Budget' },
  { name: 'GSAP', route: 'npm', way: 'npm:gsap; html:https://gsap.com/docs/v3/', license: 'prüfen', use: 'Animation nur nach Router-Budget' },
  { name: 'React Native Reusables', route: 'npm', way: 'npm:@react-native-reusables/cli; html:https://reactnativereusables.com', license: 'prüfen', use: 'React-Native-Primitives' },
  { name: 'gluestack UI', route: 'npm', way: 'npm:@gluestack-ui/core; html:https://gluestack.io/ui/docs/components/all-components', license: 'prüfen', use: 'React-Native-Komponenten' },
  { name: 'Tamagui', aliases: ['Tamagui UI'], route: 'npm', way: 'npm:tamagui; html:https://tamagui.dev/ui/intro', license: 'MIT', use: 'Universal/RN-Komponenten' },
  { name: 'React Native Paper', route: 'npm', way: 'npm:react-native-paper; html:https://reactnativepaper.com/components', license: 'MIT', use: 'Material RN-Komponenten' },
  { name: 'React Native UI Lib', aliases: ['RN UI Lib'], route: 'npm', way: 'npm:react-native-ui-lib; html:https://wix.github.io/react-native-ui-lib/docs/components', license: 'MIT', use: 'RN-Komponenten' },
  { name: 'React Native Elements', route: 'npm', way: 'npm:@rneui/themed; html:https://reactnativeelements.com/docs/components/overview', license: 'MIT', use: 'RN-Komponenten' },
  { name: 'UI Kitten', route: 'npm', way: 'npm:@ui-kitten/components; html:https://akveo.github.io/react-native-ui-kitten/docs/components/components-overview', license: 'MIT', use: 'Eva/RN-Komponenten' },
  { name: 'Composables UI', route: 'html', way: 'html:https://composables.com/ui', license: 'prüfen', use: 'Mobile UI' },
  { name: 'Jetpack Compose Samples', route: 'html', way: 'html:https://github.com/android/compose-samples', license: 'Apache-2.0', use: 'Android-Compose-Beispiele' },
  { name: 'GetWidget', route: 'npm', way: 'npm:getwidget; html:https://docs.getwidget.dev', license: 'prüfen', use: 'Flutter-Widgets' },
]);

function failUsage(message) {
  const error = new Error(message);
  error.code = 'USAGE';
  throw error;
}

export function parseCli(argv) {
  const flags = { json: false, out: null };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') flags.json = true;
    else if (arg === '--help') flags.help = true;
    else if (arg === '--out') {
      const value = argv[++i];
      if (!value || value.startsWith('--')) failUsage('--out braucht ein Verzeichnis');
      flags.out = value;
    } else if (arg.startsWith('--')) failUsage(`unbekanntes Flag ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function parseJson(input, label = 'JSON') {
  if (typeof input === 'object' && input !== null) return input;
  try { return JSON.parse(String(input || '')); }
  catch (error) { throw new Error(`${label} ungültig: ${error instanceof Error ? error.message : String(error)}`); }
}

export function parseRegistries(input) {
  const data = parseJson(input, 'registries.json');
  const rows = Array.isArray(data) ? data : Array.isArray(data?.registries) ? data.registries : [];
  return rows.map((row) => ({
    name: String(row?.name || '').trim(),
    homepage: String(row?.homepage || '').trim(),
    url: String(row?.url || '').trim(),
    description: String(row?.description || '').trim(),
    status: String(row?.health?.status || '').trim(),
  })).filter((row) => /^@[a-z0-9._-]+$/i.test(row.name) && row.url.includes('{name}'));
}

export function parseRegistryIndex(input, namespace = '') {
  const data = parseJson(input, 'Registry-Index');
  const source = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  const seen = new Set();
  const rows = [];
  for (const item of source) {
    const name = String(item?.name || item?.slug || '').trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    rows.push({
      name,
      title: String(item?.title || name).trim(),
      description: String(item?.description || '').trim(),
      type: String(item?.type || '').trim(),
      registry: String(item?.registry || namespace).trim(),
      target: String(item?.addCommandArgument || (namespace ? `${namespace}/${name}` : name)).trim(),
    });
  }
  return rows;
}

export function parseShadcnSearch(input, namespace = '') {
  return parseRegistryIndex(input, namespace);
}

function normalizeLicense(value) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(' OR ') || 'prüfen';
  if (value && typeof value === 'object') return String(value.type || value.name || 'prüfen');
  return String(value || '').trim() || 'prüfen';
}

export function parsePackageLicense(input) {
  const data = parseJson(input, 'package.json');
  return normalizeLicense(data?.license || data?.licenses);
}

export function parseRegistryItem(input, context = {}) {
  const data = parseJson(input, 'Registry-Item');
  const files = Array.isArray(data?.files) ? data.files.map((file, index) => ({
    path: String(file?.path || file?.target || `component-${index + 1}.tsx`).replace(/^[/\\]+/, ''),
    type: String(file?.type || '').trim(),
    content: typeof file?.content === 'string' ? file.content : '',
  })) : [];
  return {
    name: String(data?.name || context.name || '').trim(),
    title: String(data?.title || data?.name || context.name || '').trim(),
    type: String(data?.type || '').trim(),
    description: String(data?.description || '').trim(),
    license: normalizeLicense(data?.license || context.license),
    licenseSource: data?.license ? 'registry-item' : context.licenseSource || 'nicht belegt',
    dependencies: [...new Set((Array.isArray(data?.dependencies) ? data.dependencies : []).map(String).filter(Boolean))],
    devDependencies: [...new Set((Array.isArray(data?.devDependencies) ? data.devDependencies : []).map(String).filter(Boolean))],
    registryDependencies: [...new Set((Array.isArray(data?.registryDependencies) ? data.registryDependencies : []).map((v) => typeof v === 'string' ? v : v?.name).filter(Boolean))],
    files,
  };
}

function cleanMarkdownUrl(value) {
  return String(value || '').trim().replace(/^<|>$/g, '').replace(/\\([()])/g, '$1');
}

export function parseDocsComponents(markdown, docsUrl = '') {
  const text = String(markdown || '');
  const rows = [];
  const seen = new Set();
  const base = (() => { try { return new URL(docsUrl); } catch { return null; } })();
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (const match of text.matchAll(re)) {
    const title = match[1].replace(/^!/, '').replace(/\s+/g, ' ').trim();
    let href = cleanMarkdownUrl(match[2].split(/\s+["']/)[0]);
    if (!title || !href || /^(github|twitter|discord|login|sign in|home)$/i.test(title)) continue;
    try { if (base) href = new URL(href, base).href; } catch { continue; }
    if (!/^https?:\/\//i.test(href)) continue;
    let pathname = '';
    try { pathname = new URL(href).pathname; } catch { continue; }
    if (!/(component|block|section|ui|docs)/i.test(pathname) && !/(button|card|hero|navbar|dialog|input|menu|table|form)/i.test(title)) continue;
    const key = href.replace(/\/$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ name: title, title, url: href });
  }
  if (rows.length < 3 && base && /hyperui\.dev$/i.test(base.hostname) && /\/components\//.test(base.pathname)) {
    const fenced = [...text.matchAll(/```(?:html|jsx|tsx)?\s*\n([\s\S]*?)```/gi)]
      .filter((match) => match[1].trim().length >= 80);
    const rawHtml = fenced.length ? [] : text.split(/(?=<div class="(?:mx-auto|max-w-7xl))/g)
      .filter((part) => part.trimStart().startsWith('<div') && part.length >= 200);
    const rawExamples = rawHtml.flatMap((part) => {
      const cards = part.split(/(?=\n {4}<div class="[^"]*(?:border|shadow)[^"]*")/g)
        .filter((card) => /(?:\$\d+|Get Started|What's included)/.test(card));
      return cards.length >= 2 ? cards : [part];
    });
    const examples = fenced.length ? fenced : rawExamples.map((part) => [part, part]);
    for (let index = 0; index < examples.length; index++) {
      rows.push({
        name: `${path.basename(base.pathname) || 'component'}-${index + 1}`,
        title: `${path.basename(base.pathname) || 'Component'} ${index + 1}`,
        description: `Beispiel ${index + 1} auf ${base.pathname}`,
        url: `${base.href.replace(/\/$/, '')}#example-${index + 1}`,
      });
    }
  }
  return rows;
}

export function parseVendorIndex(markdown, root = path.join(WEB_ROOT, 'resources', 'components')) {
  const rows = [];
  for (const line of String(markdown || '').split(/\r?\n/)) {
    if (!/^\|/.test(line) || /^\|\s*(?:Quelle|[-:])/i.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim().replace(/`/g, ''));
    if (cells.length < 5) continue;
    const folder = cells[1].replace(/\/$/, '');
    if (!folder || folder.includes('Lokaler Ordner')) continue;
    rows.push({ name: cells[0], folder, path: path.join(root, folder), content: cells[2], license: cells[3] || 'prüfen', use: cells[4] });
  }
  return rows;
}

export function itemUrlFromTemplate(template, name) {
  if (!String(template).includes('{name}')) failUsage('Registry-URL hat kein {name}-Template');
  const clean = String(name || '').trim().replace(/^[/\\]+/, '');
  if (!clean || clean.includes('..') || /[/\\]/.test(clean)) failUsage('Komponentenname muss ein einzelner Registry-Slug sein');
  // {style} lässt sich ohne Registry-Konfiguration nicht beweisen; ReUI nutzt new-york als dokumentierten Default.
  return String(template).replaceAll('{style}', 'new-york').replaceAll('{name}', encodeURIComponent(clean));
}

export function parseRegistryTarget(raw) {
  const match = String(raw || '').trim().match(/^(@[a-z0-9._-]+)\/([^/\\]+)$/i);
  if (!match || match[2] === '.' || match[2] === '..') failUsage('Ziel muss @namespace/name sein');
  return { namespace: match[1], name: match[2], target: `${match[1]}/${match[2]}` };
}

function hostUnavailable(url, detail) {
  const error = new Error(`HOST_UNAVAILABLE ${url} (${detail})`);
  error.code = 'HOST_UNAVAILABLE';
  return error;
}

async function fetchText(url, accept = 'application/json, text/plain, */*') {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { accept, 'user-agent': UA }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    const body = await response.text();
    if (response.status === 404) { const error = new Error(`nicht gefunden: ${url}`); error.code = 'NOT_FOUND'; throw error; }
    if (response.status === 429) throw hostUnavailable(url, `HTTP 429; lokale Vendor-Kopien in resources/components/INDEX.md prüfen`);
    if (!response.ok) throw hostUnavailable(url, `HTTP ${response.status}`);
    if (!body.trim()) throw hostUnavailable(url, 'leere Antwort');
    return body;
  } catch (error) {
    if (error?.code === 'NOT_FOUND' || error?.code === 'HOST_UNAVAILABLE') throw error;
    throw hostUnavailable(url, error instanceof Error ? error.message : String(error));
  }
}

async function fetchJson(url) {
  const body = await fetchText(url);
  try { return JSON.parse(body); }
  catch (error) { throw hostUnavailable(url, `ungültiges JSON: ${error instanceof Error ? error.message : String(error)}`); }
}

async function readRegistries() {
  return parseRegistries(await fetchJson(REGISTRIES_URL));
}

function registryBaseUrls(template) {
  let url;
  try { url = new URL(String(template).replace('{style}', 'new-york').replace('{name}', '__ITEM__')); }
  catch { return []; }
  const dir = url.pathname.slice(0, url.pathname.indexOf('__ITEM__'));
  return [...new Set([
    new URL(`${dir}registry.json`, url.origin).href,
    new URL(`${dir}index.json`, url.origin).href,
    new URL('/r/registry.json', url.origin).href,
    new URL('/registry.json', url.origin).href,
    new URL('/index.json', url.origin).href,
  ])];
}

function readLicenseEvidence(dir) {
  const packageFile = path.join(dir, 'package.json');
  if (fs.existsSync(packageFile)) {
    try { const license = parsePackageLicense(fs.readFileSync(packageFile, 'utf8')); if (license !== 'prüfen') return { license, source: packageFile }; } catch { /* LICENSE fallback */ }
  }
  const names = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE', 'LICENSE-STATUS.txt'];
  for (const name of names) {
    const file = path.join(dir, name);
    if (!fs.existsSync(file)) continue;
    const head = fs.readFileSync(file, 'utf8').slice(0, 600);
    let license = 'prüfen';
    if (/GNU AFFERO GENERAL PUBLIC LICENSE[\s\S]{0,80}Version 3/i.test(head)) license = 'AGPL-3.0';
    else if (/GNU GENERAL PUBLIC LICENSE[\s\S]{0,80}Version 3/i.test(head)) license = 'GPL-3.0';
    else if (/Apache License[\s\S]{0,80}Version 2/i.test(head)) license = 'Apache-2.0';
    else if (/MIT License/i.test(head)) license = 'MIT';
    return { license, source: file };
  }
  return { license: 'prüfen', source: 'nicht belegt' };
}

function libsPayload(registries, vendors) {
  const registryRows = registries.map((row) => ({ name: row.name, way: `registry:${row.name}`, license: 'prüfen', use: row.description || 'shadcn-kompatible Registry', url: row.url, status: row.status || undefined }));
  const byFolder = new Map(vendors.map((row) => [row.folder, row]));
  const extras = EXTRA_LIBS.flatMap((row) => {
    if (row.route !== 'vendor') return [row];
    const vendor = byFolder.get(row.way.slice('vendor:'.length));
    if (!vendor && row.name !== 'You do not need animations') return [];
    return [{ ...row, license: vendor?.license || 'prüfen', licenseSource: vendor?.licenseSource || 'nicht belegt' }];
  });
  return [...extras, ...registryRows];
}

function emit(flags, data, text) {
  if (flags.json) console.log(JSON.stringify(data, null, 2));
  else process.stdout.write(`${text.replace(/\s+$/, '')}\n`);
}

function noResults(flags, message = 'nichts gefunden') {
  if (flags.json) console.log('[]');
  const error = new Error(message);
  error.code = 'EMPTY';
  throw error;
}

function table(rows, keys, headers = keys) {
  return [headers.join(' | '), ...rows.map((row) => keys.map((key) => row[key] ?? '').join(' | '))].join('\n');
}

function failUnknownLib(source, registries) {
  const names = [...new Set([...EXTRA_LIBS.map((row) => row.name), ...registries.map((row) => row.name)])];
  failUsage(`Bibliothek nicht gefunden: ${source}\nBekannte Libraries/Namespaces: ${names.join(', ')}`);
}

function resolveStaticLib(raw, vendors) {
  const needle = String(raw || '').trim().toLowerCase();
  const compact = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9@]+/g, '');
  const extras = EXTRA_LIBS.find((row) => row.name.toLowerCase() === needle
    || row.way.toLowerCase() === needle
    || compact(row.name) === compact(needle)
    || (row.aliases || []).some((alias) => alias.toLowerCase() === needle || compact(alias) === compact(needle)));
  if (extras) return extras;
  const vendor = vendors.find((row) => row.name.toLowerCase() === needle || row.folder.toLowerCase() === needle || `vendor:${row.folder}` === needle);
  if (vendor) return { name: vendor.name, route: 'vendor', way: `vendor:${vendor.folder}`, license: vendor.license, use: vendor.use };
  return null;
}

function runShadcnSearch(namespace, query) {
  if (!fs.existsSync(SHADCN_CLI)) return null;
  const run = spawnSync(process.execPath, [SHADCN_CLI, 'search', namespace, '-q', query], {
    encoding: 'utf8', timeout: FETCH_TIMEOUT_MS, maxBuffer: 12 * 1024 * 1024, cwd: os.tmpdir(), env: process.env,
  });
  if (run.error || run.status !== 0 || !String(run.stdout || '').trim()) return null;
  try { return parseShadcnSearch(run.stdout, namespace); } catch { return null; }
}

async function searchRegistry(registry, query) {
  let unavailable = 0;
  for (const url of registryBaseUrls(registry.url)) {
    try {
      const rows = parseRegistryIndex(await fetchJson(url), registry.name);
      if (rows.length) return { rows, channel: url };
    } catch (error) {
      if (error?.code === 'HOST_UNAVAILABLE') unavailable++;
    }
  }
  const fallback = runShadcnSearch(registry.name, query);
  if (fallback) return { rows: fallback, channel: 'shadcn-cli' };
  if (unavailable) throw hostUnavailable(registry.homepage || registry.url, 'Registry-Indizes und shadcn-CLI nicht verfügbar');
  return { rows: [], channel: 'registry-index' };
}

async function searchDocs(lib, query) {
  const docsUrl = lib.way.match(/html:(https?:\/\/[^;\s]+)/)?.[1];
  if (!docsUrl) failUsage(`${lib.name} hat keinen HTML-Dokumentationsweg`);
  let targetUrl = docsUrl;
  if (/hyperui\.dev$/i.test(new URL(docsUrl).hostname) && /^[a-z0-9-]+$/i.test(query)) {
    targetUrl = new URL(query.replace(/^\/+|\/+$/g, ''), `${docsUrl.replace(/\/+$/, '')}/`).href;
  }
  let rows = [];
  let channel = `${JINA}${targetUrl}`;
  try {
    const body = await fetchText(channel, 'text/markdown, text/plain, */*');
    rows = parseDocsComponents(body, targetUrl);
  } catch (error) {
    if (error?.code !== 'HOST_UNAVAILABLE') throw error;
  }
  if (rows.length < 3) {
    // Jina liefert bei manchen Docs (Float UI, HyperUI-Index) nur Fließtext ohne Links: rohes HTML lesen.
    const html = await fetchText(targetUrl, 'text/html, */*');
    const fromHtml = parseHtmlAnchors(html, targetUrl);
    if (fromHtml.length > rows.length) { rows = fromHtml; channel = targetUrl; }
  }
  return { rows, channel };
}

export function parseHtmlAnchors(html, docsUrl) {
  const rows = [];
  const seen = new Set();
  let base;
  try { base = new URL(docsUrl); } catch { return rows; }
  const re = /<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of String(html || '').matchAll(re)) {
    let href;
    try { href = new URL(match[1], base).href; } catch { continue; }
    if (new URL(href).hostname !== base.hostname) continue;
    const pathname = new URL(href).pathname;
    if (!/(component|block|section|ui|docs)/i.test(pathname) || pathname.replace(/\/$/, '') === base.pathname.replace(/\/$/, '')) continue;
    const title = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || path.basename(pathname);
    const key = href.replace(/\/$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({ name: title, title, url: href });
  }
  return rows;
}

function recursiveJsonFiles(root, max = 4000) {
  const out = [];
  const stack = [root];
  while (stack.length && out.length < max) {
    const dir = stack.pop();
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.next')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.isFile() && entry.name.endsWith('.json')) out.push(full);
    }
  }
  return out;
}

function searchVendor(vendor, query) {
  const root = path.join(WEB_ROOT, 'resources', 'components', vendor.way.slice('vendor:'.length));
  const needle = query.toLowerCase();
  const rows = [];
  const seen = new Set();
  for (const file of recursiveJsonFiles(root)) {
    let data;
    try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { continue; }
    for (const item of parseRegistryIndex(data)) {
      if (!`${item.name} ${item.title} ${item.description}`.toLowerCase().includes(needle) || seen.has(item.name)) continue;
      seen.add(item.name);
      rows.push({ ...item, target: file, registry: `vendor:${path.basename(root)}` });
    }
  }
  return { rows, channel: root };
}

function anchorFor(item) {
  const haystack = `${item.name} ${item.title} ${item.type} ${item.description}`.toLowerCase();
  if (/(background|aurora|gradient|pattern|beam|particle|grid|meteors|ripple|globe|orb)/.test(haystack)) return '#background';
  if (/(motion|animat|marquee|transition|scroll|reveal|hover|cursor|text effect|carousel)/.test(haystack)) return '#motion';
  return '#sections';
}

function safeDestination(root, relative) {
  const base = path.resolve(root);
  const normalized = String(relative || '').replaceAll('\\', '/').replace(/^\/+/, '');
  if (!normalized || normalized.split('/').includes('..')) failUsage(`unsicherer Registry-Dateipfad: ${relative}`);
  const dest = path.resolve(base, normalized);
  if (dest !== base && !dest.startsWith(`${base}${path.sep}`)) failUsage(`Registry-Dateipfad verlässt --out: ${relative}`);
  return dest;
}

export function writeRegistryFiles(itemInput, outDir) {
  const item = itemInput?.files ? itemInput : parseRegistryItem(itemInput);
  if (!outDir) failUsage('get braucht --out <verzeichnis>');
  if (!item.files.length) { const error = new Error('Registry-Item enthält keine Dateien'); error.code = 'EMPTY'; throw error; }
  const root = path.resolve(outDir);
  fs.mkdirSync(root, { recursive: true });
  const files = [];
  const destinations = new Set();
  for (const file of item.files) {
    if (typeof file.content !== 'string' || !file.content.length) { const error = new Error(`Datei ohne content: ${file.path}`); error.code = 'EMPTY'; throw error; }
    const basename = path.basename(String(file.path || '').replaceAll('\\', '/'));
    const dest = safeDestination(root, basename);
    if (destinations.has(dest)) failUsage(`mehrere Registry-Dateien haben denselben Dateinamen: ${basename}`);
    destinations.add(dest);
    fs.writeFileSync(dest, file.content);
    files.push(dest);
  }
  return files;
}

function formatItem(target, item, url) {
  const lines = [`# ${item.title || item.name || target}`, '', `Ziel: ${target}`, `Quelle: ${url}`, `Typ: ${item.type || 'prüfen'}`, `Lizenz: ${item.license} (${item.licenseSource})`, ''];
  lines.push('## Dateien');
  for (const file of item.files) lines.push(`- ${file.path}${file.type ? ` (${file.type})` : ''}`);
  lines.push('', `Dependencies: ${item.dependencies.join(', ') || '(keine)'}`, `Dev-Dependencies: ${item.devDependencies.join(', ') || '(keine)'}`, `Registry-Dependencies: ${item.registryDependencies.join(', ') || '(keine)'}`);
  return lines.join('\n');
}

async function loadRegistryTarget(raw) {
  const target = parseRegistryTarget(raw);
  const registries = await readRegistries();
  const registry = registries.find((row) => row.name.toLowerCase() === target.namespace.toLowerCase());
  if (!registry) { const error = new Error(`Namespace nicht gefunden: ${target.namespace}`); error.code = 'EMPTY'; throw error; }
  const url = itemUrlFromTemplate(registry.url, target.name);
  let data;
  try { data = await fetchJson(url); }
  catch (error) { if (error?.code === 'NOT_FOUND') { error.code = 'EMPTY'; } throw error; }
  return { target, registry, url, item: parseRegistryItem(data, { name: target.name }) };
}

async function cmdLibs(flags, rest) {
  if (rest.length) failUsage('libs kennt keine Positionsargumente');
  const [registries, index] = await Promise.all([readRegistries(), Promise.resolve(fs.readFileSync(VENDOR_INDEX, 'utf8'))]);
  const vendors = parseVendorIndex(index).map((vendor) => {
    const evidence = readLicenseEvidence(vendor.path);
    return { ...vendor, license: evidence.license, licenseSource: evidence.source };
  });
  const rows = libsPayload(registries, vendors);
  emit(flags, rows, table(rows, ['name', 'way', 'license', 'use'], ['name', 'weg', 'lizenz', 'wofür']));
}

async function cmdSearch(flags, rest) {
  if (rest.length < 2) failUsage('search braucht <lib|@namespace> und eine Query');
  const source = rest[0];
  const query = rest.slice(1).join(' ').trim();
  if (!query) failUsage('search braucht eine Query');
  const vendors = parseVendorIndex(fs.readFileSync(VENDOR_INDEX, 'utf8'));
  let result;
  let sourceName = source;
  if (source.startsWith('@')) {
    const registries = await readRegistries();
    const registry = registries.find((row) => row.name.toLowerCase() === source.toLowerCase());
    if (!registry) failUnknownLib(source, registries);
    result = await searchRegistry(registry, query);
  } else {
    const lib = resolveStaticLib(source, vendors);
    if (!lib) failUnknownLib(source, await readRegistries());
    sourceName = lib.name;
    if (lib.route === '21st') {
      const hint = { name: '21st', command: `node scripts/design-mcp.mjs 21st search ${JSON.stringify(query)}`, note: 'Komponenten-Code über design-mcp.mjs 21st get <id> --out <dir>' };
      emit(flags, [hint], flags.json ? '' : `${hint.name}\t${hint.command}\t${hint.note}`);
      return;
    }
    if (lib.route === 'registry-alias') {
      const registries = await readRegistries();
      const namespace = lib.way.slice('registry:'.length);
      const registry = registries.find((row) => row.name.toLowerCase() === namespace.toLowerCase());
      if (!registry) failUnknownLib(source, registries);
      result = await searchRegistry(registry, query);
    } else if (lib.route === 'vendor') result = searchVendor(lib, query);
    else if (lib.route === 'html' || lib.route === 'npm') result = await searchDocs(lib, query);
    else failUsage(`${lib.name}: kein Suchweg definiert`);
  }
  // Mehrwort-Query: jedes Wort muss vorkommen (Reihenfolge egal); "hero section" trifft so auch "Hero Section Dark".
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const rows = result.rows.filter((row) => {
    const hay = `${row.name} ${row.title} ${row.description || ''} ${row.url || ''}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
  if (!rows.length) noResults(flags);
  const payload = rows.map((row) => ({ ...row, source: sourceName, channel: result.channel }));
  const plain = payload.map((row) => ({ ...row, target: row.target || row.url || '' }));
  emit(flags, payload, table(plain, ['target', 'title', 'description'], ['ziel', 'titel', 'beschreibung']));
}

async function cmdView(flags, rest) {
  if (rest.length !== 1) failUsage('view braucht genau <@namespace/name>');
  const loaded = await loadRegistryTarget(rest[0]);
  const payload = { target: loaded.target.target, url: loaded.url, ...loaded.item };
  emit(flags, payload, formatItem(loaded.target.target, loaded.item, loaded.url));
}

async function cmdGet(flags, rest) {
  if (rest.length !== 1) failUsage('get braucht genau <@namespace/name>');
  if (!flags.out) failUsage('get braucht --out <verzeichnis>');
  const loaded = await loadRegistryTarget(rest[0]);
  const files = writeRegistryFiles(loaded.item, flags.out);
  const anchor = anchorFor(loaded.item);
  const row = `| ${loaded.item.title || loaded.target.name} | components/build | genau eine Komponente aus ${loaded.target.namespace} | ${loaded.target.target}; ${files.length} Datei(en); Dependencies: ${loaded.item.dependencies.join(', ') || 'keine'}; Registry: ${loaded.item.registryDependencies.join(', ') || 'keine'}; Lizenz: ${loaded.item.license} | Lizenz, a11y, Reduced Motion und echten Build prüfen | ${anchor} |`;
  const payload = {
    target: loaded.target.target, url: loaded.url, out: path.resolve(flags.out), files,
    dependencies: loaded.item.dependencies, devDependencies: loaded.item.devDependencies,
    registryDependencies: loaded.item.registryDependencies, license: loaded.item.license,
    licenseSource: loaded.item.licenseSource, routerAnchor: anchor, toolTableRow: row,
  };
  const lines = [
    ...files.map((file) => `datei\t${file}`),
    `dependencies\t${loaded.item.dependencies.join(', ') || '(keine)'}`,
    `devDependencies\t${loaded.item.devDependencies.join(', ') || '(keine)'}`,
    `registryDependencies\t${loaded.item.registryDependencies.join(', ') || '(keine)'}`,
    `lizenz\t${loaded.item.license}\t${loaded.item.licenseSource}`,
    `router\t${anchor}`,
    'werkzeugtabelle\tBedarf | Loop-Schritt | Default | Install/Use | Gate | Router-Anker',
    row,
  ];
  emit(flags, payload, lines.join('\n'));
}

function cmdInstallHint(flags, rest) {
  if (rest.length !== 1) failUsage('install-hint braucht genau <@namespace/name>');
  const target = parseRegistryTarget(rest[0]);
  const command = `npx shadcn@latest add ${target.target}`;
  emit(flags, { target: target.target, command, executed: false }, command);
}

// Stabile Namen für Offline-Evals und kleine Integrationen.
export const parseRegistryDirectory = parseRegistries;
export const parseRegistryCatalog = parseRegistries;
export const parseRegistrySearch = parseShadcnSearch;
export const parseRegistryItems = parseRegistryIndex;
export const parseHtmlComponents = parseDocsComponents;
export const parseDocsLinks = parseDocsComponents;
export const parseNpmLicense = parsePackageLicense;
export const resolveRegistryItemUrl = itemUrlFromTemplate;

async function main() {
  let parsed;
  try { parsed = parseCli(process.argv.slice(2)); }
  catch (error) { console.error(`komponenten: ${error.message}\n\n${HELP}`); process.exit(2); }
  if (parsed.flags.help) { console.log(HELP); process.exit(0); }
  const [command, ...rest] = parsed.positional;
  if (!command) { console.error(`komponenten: Kommando fehlt\n\n${HELP}`); process.exit(2); }
  try {
    if (command === 'libs') await cmdLibs(parsed.flags, rest);
    else if (command === 'search') await cmdSearch(parsed.flags, rest);
    else if (command === 'view') await cmdView(parsed.flags, rest);
    else if (command === 'get') await cmdGet(parsed.flags, rest);
    else if (command === 'install-hint') cmdInstallHint(parsed.flags, rest);
    else failUsage(`unbekanntes Kommando ${command}`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error?.code === 'USAGE') { console.error(`komponenten: ${message}\n\n${HELP}`); process.exit(2); }
    if (error?.code === 'HOST_UNAVAILABLE') { console.error(`komponenten: ${message}`); process.exit(3); }
    console.error(`komponenten: ${message}`);
    process.exit(1);
  }
}

const invokedDirectly = Boolean(process.argv[1]) && (
  import.meta.url === pathToFileURL(process.argv[1]).href
  || import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
);
if (invokedDirectly) await main();
