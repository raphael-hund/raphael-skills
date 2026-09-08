#!/usr/bin/env node
/**
 * run-design-mcp-check.mjs — Parser und CLI von design-mcp.mjs.
 *
 * Offline gegen Fixtures unter evals/fixtures/design-mcp/. Netz nur mit --netz:
 * dann Live-Calls: refero styles search + screens get, mobbin screens limit 1
 * und flows limit 1 mit --out /tmp/rh-design-mcp, 21st search limit 2; Datei >1 kB.
 *
 *   node evals/run-design-mcp-check.mjs
 *   node evals/run-design-mcp-check.mjs --netz
 *
 * Exit 0 = Parser, Hilfe und (optional) Netz wie erwartet.
 * Exit 1 = mindestens eine Pruefung fehlgeschlagen.
 * Exit 2 = Fixture oder Skript fehlt (nicht geprueft).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseCli,
  parseSseJsonRpc,
  extractMcpText,
  extractMcpImages,
  parseReferoStyleRecords,
  parseReferoScreenRecords,
  parseReferoFlowRecords,
  parseReferoStyleMarkdown,
  parseReferoStyleTitle,
  parseMobbinScreens,
  parseMobbinFlows,
  parseMobbinSections,
  parse21stSearch,
  parse21stInspiration,
  parse21stLogo,
  parse21stComponentFiles,
  parse21stThemeCss,
  parseToolsList,
  decodeImageData,
  readReferoAuth,
  readMobbinToken,
  read21stToken,
} from '../scripts/design-mcp.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FIX = path.join(HIER, 'fixtures', 'design-mcp');
const SCRIPT = path.join(HIER, '..', 'scripts', 'design-mcp.mjs');
const NETZ = process.argv.includes('--netz');
const NETZ_OUT = '/tmp/rh-design-mcp';

const files = {
  referoStyles: path.join(FIX, 'refero-styles-search.json'),
  referoStyleMd: path.join(FIX, 'refero-style.md.json'),
  referoScreens: path.join(FIX, 'refero-screens-search.json'),
  referoGetScreen: path.join(FIX, 'refero-get-screen.json'),
  referoGetScreenSingle: path.join(FIX, 'refero-get-screen-single.json'),
  referoSimilar: path.join(FIX, 'refero-similar-screens.json'),
  referoFlows: path.join(FIX, 'refero-flows-search.json'),
  referoGetFlow: path.join(FIX, 'refero-get-flow.json'),
  referoImage: path.join(FIX, 'refero-screen-image.json'),
  referoTools: path.join(FIX, 'refero-tools-list.json'),
  mobbinScreens: path.join(FIX, 'mobbin-screens.sse'),
  mobbinFlows: path.join(FIX, 'mobbin-flows.sse'),
  mobbinFlowsMultipart: path.join(FIX, 'mobbin-flows-multipart.sse'),
  mobbinSections: path.join(FIX, 'mobbin-sections.sse'),
  mobbinTools: path.join(FIX, 'mobbin-tools-list.json'),
  search21: path.join(FIX, '21st-search.json'),
  get21: path.join(FIX, '21st-get-component.json'),
  insp21: path.join(FIX, '21st-inspiration.json'),
  logo21: path.join(FIX, '21st-logo.json'),
  theme21: path.join(FIX, '21st-theme.json'),
  tools21: path.join(FIX, '21st-tools-list.json'),
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

const read = (file) => fs.readFileSync(file, 'utf8');
const readJson = (file) => JSON.parse(read(file));

console.log('\nDesign-MCP — Parser (offline) und CLI\n');

{
  const { flags, positional } = parseCli(['refero', 'styles', 'search', 'q', '--page', '2', '--json']);
  zeile(flags.json === true && flags.page === '2' && positional.join(' ') === 'refero styles search q', 'parseCli: flags + positional');
}

{
  const rpc = readJson(files.referoStyles);
  const items = parseReferoStyleRecords(rpc);
  zeile(items.length >= 2, 'parseReferoStyleRecords ≥2', `${items.length}`);
  zeile(
    items.some((row) => row.id === '9552d07f-2f68-4dd7-a0e9-d779d4a31562' && /Audyr/i.test(row.title) && /audyr\.com/.test(row.url)),
    'parseReferoStyleRecords: Audyr id/title/url',
  );
}

{
  const rpc = readJson(files.referoStyleMd);
  const md = parseReferoStyleMarkdown(rpc);
  zeile(/^# Audyr — Style Reference/m.test(md) && /--color-ink/.test(md), 'parseReferoStyleMarkdown extrahiert MD');
  zeile(parseReferoStyleTitle(md) === 'Audyr', 'parseReferoStyleTitle → Audyr');
}

{
  const rpc = readJson(files.referoScreens);
  const items = parseReferoScreenRecords(rpc);
  zeile(items.length >= 1 && items[0].id && /ManyChat/i.test(items[0].title), 'parseReferoScreenRecords: ManyChat');
  const similar = parseReferoScreenRecords(readJson(files.referoSimilar));
  zeile(similar.length === 2 && similar[0].id.startsWith('48b87627'), 'parseReferoScreenRecords similar = 2');
  const batch = parseReferoScreenRecords(readJson(files.referoGetScreen));
  zeile(batch.length === 1 && batch[0].id.startsWith('5c1a397c'), 'parseReferoScreenRecords get records[]');
  const single = parseReferoScreenRecords(readJson(files.referoGetScreenSingle));
  zeile(single.length === 1 && single[0].id.startsWith('5c1a397c') && /ManyChat/i.test(single[0].title), 'parseReferoScreenRecords get Einzelobjekt');
}

{
  const flows = parseReferoFlowRecords(readJson(files.referoFlows));
  zeile(flows.length === 2 && flows[0].id === 11398 && /Checkout Link Editor/.test(flows[0].title), 'parseReferoFlowRecords');
}

{
  const rpc = readJson(files.referoImage);
  const images = extractMcpImages(rpc);
  zeile(images.length === 1 && /jpeg/.test(images[0].mimeType || ''), 'extractMcpImages: 1 jpeg');
  const buf = decodeImageData(images[0].data);
  zeile(Buffer.isBuffer(buf) && buf.length > 20 && buf[0] === 0xff && buf[1] === 0xd8, 'decodeImageData: JPEG-Header');
}

{
  const sse = read(files.mobbinScreens);
  const rpc = parseSseJsonRpc(sse);
  const items = parseMobbinScreens(rpc);
  zeile(items.length === 1 && items[0].id.startsWith('359a26bc') && items[0].app === 'Higgsfield', 'parseMobbinScreens aus SSE');
  zeile(/mobbin\.com\/screens\//.test(items[0].url) && /mobbin\.com\/api\/mcp\/short\//.test(items[0].image_url), 'parseMobbinScreens url/image_url');
}

{
  const flows = parseMobbinFlows(parseSseJsonRpc(read(files.mobbinFlows)));
  zeile(flows.length === 1 && flows[0].id.startsWith('c05af68f') && flows[0].title === 'Onboarding', 'parseMobbinFlows');
  const multi = parseSseJsonRpc(read(files.mobbinFlowsMultipart));
  const multiFlows = parseMobbinFlows(multi);
  zeile(multiFlows.length === 1 && multiFlows[0].id.startsWith('c05af68f'), 'parseSseJsonRpc: letztes data:-Event + JSON vor Caption');
  const sections = parseMobbinSections(parseSseJsonRpc(read(files.mobbinSections)));
  zeile(sections.length === 1 && sections[0].site === 'AngelList', 'parseMobbinSections');
}

{
  const text = extractMcpText(readJson(files.search21));
  const items = parse21stSearch(text);
  zeile(items.length === 2 && items[0].id === '8374' && /Pricing table/i.test(items[0].title), 'parse21stSearch');
  const insp = parse21stInspiration(extractMcpText(readJson(files.insp21)));
  zeile(insp.length === 2 && insp[0].confidence === 70 && /21st\.dev\/@/.test(insp[0].url), 'parse21stInspiration');
  const logos = parse21stLogo(extractMcpText(readJson(files.logo21)));
  zeile(logos.length === 1 && logos[0].title === 'Vercel' && /svgl\.app\/library\/vercel\.svg/.test(logos[0].svg), 'parse21stLogo');
  const comp = parse21stComponentFiles(extractMcpText(readJson(files.get21)));
  zeile(/PricingTable/.test(comp.component || '') && /Demo/.test(comp.demo || '') && /Pricing table/i.test(comp.title), 'parse21stComponentFiles');
  const theme = parse21stThemeCss(extractMcpText(readJson(files.theme21)));
  zeile(/Violet Bloom/i.test(theme.title) && /--primary:\s*#7033ff/.test(theme.css), 'parse21stThemeCss');
}

{
  zeile(parseToolsList(readJson(files.referoTools)).includes('refero_search_styles'), 'parseToolsList refero');
  zeile(parseToolsList(readJson(files.mobbinTools)).includes('search_screens'), 'parseToolsList mobbin');
  zeile(parseToolsList(readJson(files.tools21)).includes('get_component'), 'parseToolsList 21st');
}

{
  zeile(!!readReferoAuth({ mcpServers: { refero: { headers: { Authorization: 'Bearer x' } } } }), 'readReferoAuth findet Bearer');
  zeile(readMobbinToken({ mcpOAuth: { 'mobbin|abc': { accessToken: 'tok' } } }) === 'tok', 'readMobbinToken findet accessToken');
  zeile(read21stToken({ token: 'abc' }, {}) === 'abc', 'read21stToken aus auth.json');
  zeile(read21stToken({}, { API_KEY_21ST: 'envtok' }) === 'envtok', 'read21stToken aus env');
}

{
  const help = spawnSync(process.execPath, [SCRIPT, '--help'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${help.stdout || ''}${help.stderr || ''}`;
  const helpBody = (help.stdout || '').trimEnd();
  const helpLines = helpBody ? helpBody.split(/\n/).length : 0;
  zeile(help.status === 0, '--help Exit 0');
  zeile(helpLines > 0 && helpLines <= 12, `--help ≤12 Zeilen (ist ${helpLines})`);
  zeile(
    /design-mcp\.mjs/.test(aus)
      && /refero styles search/.test(aus)
      && /mobbin screens/.test(aus)
      && /21st search/.test(aus)
      && /tools/.test(aus)
      && /Statt mcp__/.test(aus)
      && /kein Base64/.test(aus)
      && /mobbin-refresh\.py --force/.test(aus)
      && /Exit: 0 ok/.test(aus)
      && /nur Inspiration/.test(aus)
      && /keine 1:1/.test(aus),
    '--help nennt Wann/JSON-RPC, Lizenz, Auth-Hinweis, Exit-Vertrag',
  );
}

{
  const unknown = spawnSync(process.execPath, [SCRIPT, '--unknown-flag'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${unknown.stderr || ''}${unknown.stdout || ''}`;
  zeile(unknown.status === 2 && /unbekanntes Flag/.test(aus), 'unbekanntes Flag Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'refero', 'styles', 'search'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /braucht eine Query/.test(aus), 'refero styles search ohne Query Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'mobbin', 'screens', 'pricing'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /--platform/.test(aus), 'mobbin screens ohne --platform Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'refero', 'screens', 'image', 'abc'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /--out/.test(aus), 'refero screens image ohne --out Exit 2');
}

if (NETZ) {
  console.log('\nDesign-MCP — Netz\n');
  fs.mkdirSync(NETZ_OUT, { recursive: true });
  const run = (args, timeout = 120000) => spawnSync(process.execPath, [SCRIPT, ...args], {
    encoding: 'utf8',
    timeout,
    maxBuffer: 12 * 1024 * 1024,
  });

  {
    const proc = run(['refero', 'styles', 'search', 'saas pricing', '--page', '1', '--json']);
    let data = null;
    try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].id && data[0].title,
      'netz: refero styles search ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0]?.slice(0, 120) || ''}`,
    );
  }

  {
    const outDir = path.join(NETZ_OUT, 'mobbin-screens');
    fs.mkdirSync(outDir, { recursive: true });
    const proc = run([
      'mobbin', 'screens', 'pricing page with plan cards',
      '--platform', 'web', '--mode', 'standard', '--limit', '1',
      '--out', outDir, '--json',
    ]);
    let data = null;
    try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
    const file = data?.[0]?.file || '';
    let size = 0;
    try { size = file && fs.existsSync(file) ? fs.statSync(file).size : 0; } catch { size = 0; }
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && file && size > 1024,
      'netz: mobbin screens --out Datei >1 kB',
      `exit ${proc.status} file=${file || '-'} size=${size} ${(proc.stderr || '').split('\n')[0]?.slice(0, 120) || ''}`,
    );
  }

  {
    let screenId = null;
    {
      const search = run(['refero', 'screens', 'search', 'pricing', '--platform', 'web', '--json']);
      let rows = null;
      try { rows = JSON.parse((search.stdout || '').trim()); } catch { rows = null; }
      screenId = Array.isArray(rows) && rows[0]?.id ? rows[0].id : null;
      zeile(search.status === 0 && !!screenId, 'netz: refero screens search liefert UUID', `exit ${search.status} id=${screenId || '-'}`);
    }
    {
      const proc = run(['refero', 'screens', 'get', screenId || 'missing', '--json']);
      let data = null;
      try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
      zeile(
        !!screenId && proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].id === screenId,
        'netz: refero screens get Einzelobjekt/records',
        `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0]?.slice(0, 120) || ''}`,
      );
    }
  }

  {
    const outDir = path.join(NETZ_OUT, 'mobbin-flows');
    fs.mkdirSync(outDir, { recursive: true });
    const proc = run([
      'mobbin', 'flows', 'onboarding',
      '--platform', 'web', '--limit', '1',
      '--out', outDir, '--json',
    ]);
    let data = null;
    try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
    const file = data?.[0]?.file || '';
    let size = 0;
    try { size = file && fs.existsSync(file) ? fs.statSync(file).size : 0; } catch { size = 0; }
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].id,
      'netz: mobbin flows limit 1 (SSE/JSON vor Caption)',
      `exit ${proc.status} id=${data?.[0]?.id || '-'} file=${file || '-'} size=${size} ${(proc.stderr || '').split('\n')[0]?.slice(0, 120) || ''}`,
    );
  }

  {
    const proc = run(['21st', 'search', 'pricing table', '--type', 'component', '--limit', '2', '--json']);
    let data = null;
    try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].id,
      'netz: 21st search limit 2 ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0]?.slice(0, 120) || ''}`,
    );
  }
}

console.log(`\n${fehler ? 'FAIL' : 'PASS'}: ${geprueft - fehler}/${geprueft} ok`);
process.exit(fehler ? 1 : 0);
