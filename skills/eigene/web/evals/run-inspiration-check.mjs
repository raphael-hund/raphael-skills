#!/usr/bin/env node
/**
 * run-inspiration-check.mjs — Parser und CLI von inspiration.mjs.
 *
 * Offline gegen Fixtures unter evals/fixtures/inspiration/. Netz nur mit --netz:
 * dann laufen Live-Aufrufe (Refero, Magic UI, React Bits, Navbar, 21st plus Runde 2).
 *
 *   node evals/run-inspiration-check.mjs
 *   node evals/run-inspiration-check.mjs --netz
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
  parseReferoSearch,
  parseReferoStyle,
  parseNavbarList,
  parseNavbarItem,
  parseRegistryList,
  parse21stSearch,
  parse21stItem,
  parseLandddingList,
  parseLandddingItem,
  parseAwwwardsList,
  parseSiteinspireList,
  parseCuratedList,
  parseGetlayersList,
  parseBehanceSearch,
  parseInsporaList,
  parseSwipedList,
} from '../scripts/inspiration.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const FIX = path.join(HIER, 'fixtures', 'inspiration');
const SCRIPT = path.join(HIER, '..', 'scripts', 'inspiration.mjs');
const NETZ = process.argv.includes('--netz');

const files = {
  referoSearch: path.join(FIX, 'refero-search.md'),
  referoStyle: path.join(FIX, 'refero-style.md'),
  navbarList: path.join(FIX, 'navbar-list.md'),
  navbarItem: path.join(FIX, 'navbar-item.md'),
  registry: path.join(FIX, 'registry.json'),
  search21: path.join(FIX, '21st-search.md'),
  item21: path.join(FIX, '21st-item.md'),
  landddingList: path.join(FIX, 'landdding-list.md'),
  landddingItem: path.join(FIX, 'landdding-item.md'),
  awwwardsList: path.join(FIX, 'awwwards-list.html'),
  siteinspireList: path.join(FIX, 'siteinspire-list.md'),
  curatedList: path.join(FIX, 'curated-list.md'),
  getlayersList: path.join(FIX, 'getlayers-list.html'),
  behanceSearch: path.join(FIX, 'behance-search.md'),
  insporaList: path.join(FIX, 'inspora-list.html'),
  swipedList: path.join(FIX, 'swiped-list.md'),
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

console.log('\nInspiration — Parser (offline) und CLI\n');

const refero = parseReferoSearch(read(files.referoSearch));
zeile(refero.length >= 3, 'parseReferoSearch findet mindestens 3 Styles', `${refero.length} Treffer`);
zeile(
  refero.some((row) => row.styleId === 'a0630421-7b66-48b4-aa14-6194a3b2c2b9' && /Fey/i.test(row.title) && /styles\.refero\.design\/style\//.test(row.url)),
  'parseReferoSearch: Fey hat title, url, styleId',
);
zeile(
  refero.every((row) => row.title && row.url && row.styleId && /^[0-9a-f-]{36}$/.test(row.styleId)),
  'parseReferoSearch: jedes Item hat title/url/styleId',
);

const style = parseReferoStyle(read(files.referoStyle));
zeile(/^# Fey — Style Reference/m.test(style) && !style.includes('```'), 'parseReferoStyle extrahiert DESIGN.md ohne Fence');
zeile(!/Footer noise/.test(style) && /--color-fey-ink/.test(style), 'parseReferoStyle: Tokens bleiben, Footer fällt weg');

const navs = parseNavbarList(read(files.navbarList));
zeile(navs.length >= 5, 'parseNavbarList findet mindestens 5 Navbar-Einträge', `${navs.length} Treffer`);
zeile(
  navs.some((row) => row.url.endsWith('/navbar/chesapeake-plywood') && /Chesapeake Plywood/i.test(row.name)),
  'parseNavbarList: Name + /navbar/<slug>',
);

const navItem = parseNavbarItem(read(files.navbarItem));
zeile(/Chesapeake Plywood/i.test(navItem.title) && /Mega Menu/i.test(navItem.type), 'parseNavbarItem: Titel und Typ');
zeile(
  navItem.images.length >= 1 && /wood solutions partner/.test(navItem.description),
  'parseNavbarItem: Beschreibung und Bild-URL',
);

const registry = JSON.parse(read(files.registry));
const magic = parseRegistryList(registry, { grep: 'marque' });
zeile(magic.length === 1 && magic[0].name === 'marquee', 'parseRegistryList --grep findet marquee');
const bitsDefault = parseRegistryList(registry, { variant: '-TS-TW' });
const bitsAll = parseRegistryList(registry);
zeile(
  bitsDefault.every((row) => row.name.endsWith('-TS-TW')) && bitsDefault.length === 2 && bitsAll.length > bitsDefault.length,
  'parseRegistryList Default-Filter TS-TW, --all zeigt mehr',
);

const found21 = parse21stSearch(read(files.search21));
zeile(found21.length >= 3, 'parse21stSearch findet mindestens 3 Komponenten', `${found21.length} Treffer`);
zeile(
  found21.some((row) => row.author === 'ncdai' && /hero-01/.test(row.url) && /Hero Golden Spiral/i.test(row.title)),
  'parse21stSearch: title, author, /@author/components/slug',
);

const item21 = parse21stItem(read(files.item21));
zeile(/Hero Golden Spiral/i.test(item21.title) && /golden spiral/.test(item21.description), 'parse21stItem: Titel und Beschreibung');
const item21b = parse21stItem(read(path.join(FIX, '21st-item-ohne-titelzeile.md')));
zeile(item21b.title === 'SaaS Template' && /^Modern Hero Section/.test(item21b.description) && !/^import/.test(item21b.description),
  'parse21stItem: ohne "/Titel"-Zeile Titel aus Header, Beschreibung erste Prosazeile');
zeile(
  /Hero01/.test(item21.usage) && /lucide-react/.test(item21.dependencies) && /MIT/.test(item21.license) && /github\.com/.test(item21.source || ''),
  'parse21stItem: Usage, Dependencies, License, Source',
);

const landList = parseLandddingList(read(files.landddingList));
zeile(landList.length >= 3, 'parseLandddingList findet mindestens 3 Einträge', `${landList.length} Treffer`);
zeile(
  landList.some((row) => row.slug === 'shadcn-space-6qf5j' && /Shadcn Space/i.test(row.title) && /landdding\.com\/l\/shadcn-space-6qf5j/.test(row.url)),
  'parseLandddingList: Shadcn Space title/url/slug',
);
const landItem = parseLandddingItem(read(files.landddingItem));
zeile(
  landItem.title === 'Situation Normal' && landItem.visit === 'https://situationnormal.co/' && /cdn\.sanity\.io/.test(landItem.thumbnail),
  'parseLandddingItem: title, visit ohne ?ref, thumbnail',
);

const awwList = parseAwwwardsList(read(files.awwwardsList));
zeile(awwList.length === 2, 'parseAwwwardsList findet 2 data-collectable-model-value', `${awwList.length} Treffer`);
zeile(
  awwList[0]?.slug === 'trevor-noah'
    && /Trevor Noah/i.test(awwList[0]?.title || '')
    && awwList[0]?.url === 'https://www.awwwards.com/sites/trevor-noah'
    && /assets\.awwwards\.com\/awards\/submissions\//.test(awwList[0]?.thumbnail || '')
    && awwList[0]?.tags.includes('Culture & Education'),
  'parseAwwwardsList: Trevor Noah title/slug/url/tags/thumbnail',
);

const siteList = parseSiteinspireList(read(files.siteinspireList));
zeile(siteList.length >= 2 && siteList.every((row) => !/mobbin/i.test(row.name)), 'parseSiteinspireList filtert Mobbin', `${siteList.length} Treffer`);
zeile(
  siteList.some((row) => row.name === 'Pasqua Wines' && row.visit === 'https://www.pasqua.it/' && /13560-pasqua-wines/.test(row.url) && /r2\.siteinspire\.com/.test(row.thumbnail)),
  'parseSiteinspireList: Pasqua name/url/visit ohne ref/thumbnail',
);

const curated = parseCuratedList(read(files.curatedList));
zeile(curated.length === 3, 'parseCuratedList findet 3 Screenshots', `${curated.length} Treffer`);
zeile(
  curated[0]?.name === 'Weeksync' && /marketstorage\.b-cdn\.net/.test(curated[0]?.thumbnail || '') && /\.mp4/.test(curated[0]?.video || '')
    && curated[1]?.name === 'Utopia Tokyo' && curated[1]?.video == null,
  'parseCuratedList: Video nur direkt danach, sonst null',
);

const layers = parseGetlayersList(read(files.getlayersList));
zeile(layers.length === 3 && new Set(layers.map((row) => row.slug)).size === 3, 'parseGetlayersList dedupt nach slug', `${layers.length} Treffer`);
zeile(
  layers.some((row) => row.slug === 'vesper' && row.name === 'Vesper' && row.category === 'SaaS' && row.thumbnail === 'https://storage.getlayers.ai/templates/vesper-06e69bbad0.webp')
    && layers.some((row) => row.slug === 'stride' && row.thumbnail == null)
    && layers.some((row) => row.slug === 'ai-studio' && row.thumbnail === 'https://storage.getlayers.ai/templates/ai-studio.webp'),
  'parseGetlayersList: Vesper-Hash-Thumb, AI-Studio exakt, Stride ohne webp = null',
);

const behance = parseBehanceSearch(read(files.behanceSearch));
zeile(behance.length === 3, 'parseBehanceSearch dedupt nach id', `${behance.length} Treffer`);
zeile(
  behance[0]?.id === '254833539' && /Real Estate Investment Platform UXUI Design/.test(behance[0]?.title) && !/[?]/.test(behance[0]?.url),
  'parseBehanceSearch: id/title/url ohne Query',
);

const inspora = parseInsporaList(read(files.insporaList));
zeile(inspora.length === 2, 'parseInsporaList dedupt nach slug', `${inspora.length} Treffer`);
zeile(
  inspora[0]?.slug === 'time-zones' && /inspora\.design\/posts\/time-zones/.test(inspora[0]?.url) && /media\.inspora\.design\/.+\.(webp|mp4)/.test(inspora[0]?.media),
  'parseInsporaList: slug/url/media',
);

const swiped = parseSwipedList(read(files.swipedList));
zeile(swiped.length === 3, 'parseSwipedList findet 3 Posts', `${swiped.length} Treffer`);
zeile(
  swiped[0]?.category === 'Personal' && swiped[0]?.author === 'Dinesh Subramani' && swiped[0]?.likes === '1,629' && /\.mp4/.test(swiped[0]?.media || '')
    && swiped[2]?.handle === '@nickbakeddesign' && /pbs\.twimg\.com\/media/.test(swiped[2]?.media || '') && (swiped[2]?.text || '').length <= 280,
  'parseSwipedList: category/author/handle/media/likes, Text ≤280',
);

{
  const help = spawnSync(process.execPath, [SCRIPT, '--help'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${help.stdout || ''}${help.stderr || ''}`;
  zeile(help.status === 0, '--help Exit 0');
  zeile(
    /inspiration\.mjs/.test(aus)
      && /Refero, Navbar Gallery, 21st/.test(aus)
      && /Magic UI \(MIT\)/.test(aus)
      && /art-direction\.md/.test(aus)
      && /#sections\/#motion\/#background/.test(aus)
      && /alle Galerien nur Inspiration\/Analyse/.test(aus)
      && /PNG danach mit Read ansehen/.test(aus)
      && /raphael-chrome/.test(aus)
      && /X\/LinkedIn/.test(aus),
    '--help nennt Lizenzregel, shot-Read und Dateiname',
  );
}

{
  const unknown = spawnSync(process.execPath, [SCRIPT, '--unknown-flag'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${unknown.stderr || ''}${unknown.stdout || ''}`;
  zeile(unknown.status === 2 && /unbekanntes Flag/.test(aus), 'unbekanntes Flag Exit 2');
}

{
  const source = spawnSync(process.execPath, [SCRIPT, 'landbook', 'search', 'x'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${source.stderr || ''}${source.stdout || ''}`;
  zeile(source.status === 2 && /unbekannte Quelle/.test(aus), 'unbekannte Quelle Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'curated', 'get', 'x'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /nur list/.test(aus), 'curated get Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'inspora', 'get', 'x'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /Vercel-Checkpoint/.test(aus), 'inspora get Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'mobbin'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stdout || ''}${proc.stderr || ''}`;
  zeile(proc.status === 0 && /mcp/i.test(aus), 'mobbin Exit 0 mit mcp');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'mobbin', '--json'], { encoding: 'utf8', timeout: 15000 });
  let data = null;
  try { data = JSON.parse((proc.stdout || '').trim()); } catch { data = null; }
  zeile(proc.status === 0 && data?.source === 'mobbin' && data?.access === 'mcp' && data?.server === 'mobbin', 'mobbin --json source/access/server');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'shot'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /shot braucht eine URL/.test(aus), 'shot ohne URL Exit 2');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'shot', '--help'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stdout || ''}${proc.stderr || ''}`;
  zeile(proc.status === 0 && /raphael-chrome/.test(aus), 'shot --help enthält raphael-chrome');
}

{
  const proc = spawnSync(process.execPath, [SCRIPT, '21st', 'code', 'hero'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 1 && /21st CLI nicht eingeloggt/.test(aus) && /API_KEY_21ST/.test(aus), '21st code ohne Login Exit 1');
}

if (NETZ) {
  console.log('\nInspiration — Netz\n');
  const run = (args, timeout = 90000) => spawnSync(process.execPath, [SCRIPT, ...args, '--json'], {
    encoding: 'utf8',
    timeout,
    maxBuffer: 12 * 1024 * 1024,
  });
  const parseOut = (proc) => {
    const raw = (proc.stdout || '').trim();
    try { return JSON.parse(raw); } catch { return null; }
  };

  {
    const proc = run(['refero', 'search', 'fintech', '--limit', '5']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && data[0].styleId,
      'netz: refero search fintech ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['magicui', 'get', 'marquee']);
    const blob = `${proc.stdout || ''}${proc.stderr || ''}`;
    zeile(
      proc.status === 0 && /Marquee/i.test(blob),
      'netz: magicui get marquee enthält Marquee',
      `exit ${proc.status}`,
    );
  }
  {
    const proc = run(['reactbits', 'list'], 120000);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 100,
      'netz: reactbits list ≥100',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
  {
    const proc = run(['navbar', 'list', 'mega-menu', '--limit', '10']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 5,
      'netz: navbar list mega-menu ≥5',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
  {
    const proc = run(['21st', 'search', 'hero', '--limit', '5']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 1 && /21st\.dev\/@/.test(data[0]?.url || ''),
      'netz: 21st search hero ≥1',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'}`,
    );
  }
  {
    const proc = run(['landdding', 'list', '--limit', '8']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 5 && data[0].slug,
      'netz: landdding list ≥5',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['awwwards', 'list', '--limit', '15']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 10 && /awwwards\.com\/sites\//.test(data[0]?.url || ''),
      'netz: awwwards list ≥10',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['siteinspire', 'list', '--limit', '8'], 120000);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 5 && data[0].name,
      'netz: siteinspire list ≥5',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['curated', 'list', '--limit', '8']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 5 && data[0].thumbnail,
      'netz: curated list ≥5',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['getlayers', 'list', '--limit', '15']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 10 && data[0].slug,
      'netz: getlayers list ≥10',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['behance', 'search', 'web design', '--limit', '8']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 3 && /behance\.net\/gallery\//.test(data[0]?.url || ''),
      'netz: behance search web design ≥3',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = run(['swiped', 'list', '--limit', '8']);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 3 && data[0].author,
      'netz: swiped list ≥3',
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  {
    const proc = spawnSync(process.execPath, [SCRIPT, 'shot', 'https://www.navbar.gallery/', '--out', '/tmp/inspiration-shots', '--wait', '4000', '--json'], {
      encoding: 'utf8',
      timeout: 90000,
      maxBuffer: 12 * 1024 * 1024,
    });
    const data = parseOut(proc);
    const png = Array.isArray(data?.paths) ? data.paths[0] : null;
    let size = 0;
    try { size = png && fs.existsSync(png) ? fs.statSync(png).size : 0; } catch { size = 0; }
    zeile(
      proc.status === 0 && png && fs.existsSync(png) && size > 20 * 1024,
      'netz: shot navbar.gallery PNG > 20 KB',
      `exit ${proc.status} png=${png || 'kein-pfad'} size=${size} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log(NETZ ? 'Inspiration-Parser und Netz-Aufrufe stimmen.' : 'Inspiration-Parser und CLI stimmen.');
