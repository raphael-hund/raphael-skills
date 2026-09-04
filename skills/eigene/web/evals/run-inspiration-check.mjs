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
  parseSupaheroList,
  parseSupaheroItem,
  parseCtaList,
  parseCtaItem,
  parseRecentList,
  parseRecentApi,
  parseFpsList,
  parseFpsItem,
  parsePostsList,
  parsePostsItem,
  parseLoadmoreList,
  parseLoadmoreItem,
  parseKineticsList,
  parseNotfoundList,
  parseCircleloadersList,
  parseUmanmadeList,
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
  supaheroList: path.join(FIX, 'supahero-list.html'),
  supaheroItem: path.join(FIX, 'supahero-item.html'),
  ctaList: path.join(FIX, 'cta-list.xml'),
  ctaItem: path.join(FIX, 'cta-item.html'),
  recentList: path.join(FIX, 'recent-list.xml'),
  fpsList: path.join(FIX, 'fps-list.xml'),
  fpsItem: path.join(FIX, 'fps-item.html'),
  postsList: path.join(FIX, 'posts-list.html'),
  postsItem: path.join(FIX, 'posts-item.html'),
  loadmoreList: path.join(FIX, 'loadmore-list.html'),
  loadmoreItem: path.join(FIX, 'loadmore-item.html'),
  kineticsList: path.join(FIX, 'kinetics-list.html'),
  notfoundList: path.join(FIX, 'notfound-list.html'),
  circleloadersList: path.join(FIX, 'circleloaders-list.html'),
  umanmadeList: path.join(FIX, 'umanmade-list.json'),
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

const supahero = parseSupaheroList(read(files.supaheroList));
zeile(
  supahero.length >= 3 && supahero[0]?.slug === 'anubi' && supahero[0]?.title === 'Anubi' && /heroes\/anubi\.webp/.test(supahero[0]?.media || ''),
  'parseSupaheroList: mindestens 3 Hero-Sektionen mit Titel/URL/Medien-URL',
  `${supahero.length} Treffer`,
);
const supaheroItem = parseSupaheroItem(read(files.supaheroItem));
zeile(
  supaheroItem.title === 'Anubi Hero Section' && /anubi\.webp/.test(supaheroItem.media) && supaheroItem.source === 'https://anubi.io/',
  'parseSupaheroItem: Titel, Medien-URL und Original',
);

const ctas = parseCtaList(read(files.ctaList));
zeile(
  ctas.length === 4 && ctas.every((row) => row.title && /cta\.gallery\/cta\//.test(row.url)) && ctas.some((row) => row.slug === 'sapphicindex'),
  'parseCtaList: nur /cta/<slug>, Titel und URL',
  `${ctas.length} Treffer`,
);
const ctaItem = parseCtaItem(read(files.ctaItem));
zeile(
  ctaItem.title === 'N49p' && /framerusercontent\.com/.test(ctaItem.media) && ctaItem.source === 'https://www.n49p.com/',
  'parseCtaItem: Titel, Medien-URL und Original',
);

const recent = parseRecentList(read(files.recentList));
zeile(
  recent.length === 4 && recent[0]?.title === 'Macos App Icon Screensaver' && recent.every((row) => /recent\.design\/i\//.test(row.url)),
  'parseRecentList: /i/<slug>, lesbarer Titel und URL',
  `${recent.length} Treffer`,
);

const recentApi = parseRecentApi({ json: { title: 'App Icon Screensaver', description: 'Motion reference', media: [{ url: 'https://cdn.recent.design/items/z3nbrck/0/3076x1986.mp4' }], source: { url: 'https://x.com/avstorm/status/1' } } });
zeile(
  recentApi.title === 'App Icon Screensaver' && /cdn\.recent\.design/.test(recentApi.media) && /x\.com\/avstorm/.test(recentApi.source),
  'parseRecentApi: Titel, Medien-URL und Original',
);

const fps = parseFpsList(read(files.fpsList));
zeile(
  fps.length === 4 && fps.every((row) => !/\/shots\/(?:watch|filter)\b/.test(row.url)) && fps.some((row) => /Duolingo XP Gained/.test(row.title)),
  'parseFpsList: nur einzelne Shots mit Titel und URL',
  `${fps.length} Treffer`,
);
const fpsItem = parseFpsItem(read(files.fpsItem));
zeile(
  /Duolingo XP Gained Fab Pop Animation/.test(fpsItem.title) && /main\.mp4/.test(fpsItem.media) && /floating reward button/.test(fpsItem.description),
  'parseFpsItem: Titel, Video und Beschreibung',
);

const posts = parsePostsList(read(files.postsList));
zeile(
  posts.length >= 4 && posts[0]?.title === 'ChatGPT: A new star enters the Chat' && /images\/posts\//.test(posts[0]?.media || '') && posts.every((row) => row.title && row.url),
  'parsePostsList: JSON-LD plus HTML-Medien mit Titel/URL/Medien-URL',
  `${posts.length} Treffer`,
);
const postsItem = parsePostsItem(read(files.postsItem));
zeile(
  postsItem.title === 'ChatGPT: A new star enters the Chat' && /images\/posts\//.test(postsItem.media) && /x\.com\/chatgpt/.test(postsItem.source),
  'parsePostsItem: Titel, Medien-URL und Original',
);


const loadmore = parseLoadmoreList(read(files.loadmoreList));
zeile(
  loadmore.length === 3 && loadmore[1]?.title === 'Too Busy Foundation'
    && loadmore.every((row) => row.slug && row.title && /loadmo\.re\/posts\//.test(row.url) && /loadmo\.re\/media\/.*\.(?:jpg|webp|png)/.test(row.image)),
  'parseLoadmoreList: 3 mobile Websites mit Titel, URL und Bild',
  `${loadmore.length} Treffer`,
);
const loadmoreItem = parseLoadmoreItem(read(files.loadmoreItem));
zeile(
  loadmoreItem.title === 'Sabrina Zeltner' && /sabrinazeltner-hp-cover\.jpg/.test(loadmoreItem.image) && loadmoreItem.source === 'https://sabrinazeltner.com/',
  'parseLoadmoreItem: Titel, Bild und Original',
);

const kinetics = parseKineticsList(read(files.kineticsList));
zeile(
  kinetics.length === 3 && kinetics[0]?.slug === 'card-resize' && kinetics[0]?.title === 'Card Resize'
    && /transition: height/.test(kinetics[0]?.snippet || '') && kinetics.every((row) => row.title && row.url && row.snippet),
  'parseKineticsList: 3 Kinetic-Type-CSS-Snippets mit Titel/URL/Code',
  `${kinetics.length} Treffer`,
);

const notfound = parseNotfoundList(read(files.notfoundList));
zeile(
  notfound.length === 3 && notfound[0]?.slug === 'vending-machine' && notfound[0]?.title === 'Out of Stock'
    && /<div class="vend-404"/.test(notfound[0]?.snippet || '') && notfound.every((row) => row.title && row.url && row.snippet),
  'parseNotfoundList: 3 404-CSS-Snippets aus copy-data',
  `${notfound.length} Treffer`,
);

const circleloaders = parseCircleloadersList(read(files.circleloadersList));
zeile(
  circleloaders.length === 3 && circleloaders[0]?.slug === 'latitude' && circleloaders[0]?.title === 'Latitude'
    && circleloaders.every((row) => row.title && row.url && /^<svg[\s>]/.test(row.snippet)),
  'parseCircleloadersList: 3 dekodierte SVG-Loader mit Titel/URL',
  `${circleloaders.length} Treffer`,
);

const umanmade = parseUmanmadeList(read(files.umanmadeList));
zeile(
  umanmade.length === 4 && umanmade[0]?.title === 'Dot Patterns by Zsolt Kacso'
    && umanmade.every((row) => row.title && /^https:\/\/www\.umanmade\.com\/post\/[a-z0-9-]+$/.test(row.url)),
  'parseUmanmadeList: nur Posts, Titel und kanonische Redirect-Ziel-URL',
  `${umanmade.length} Treffer`,
);

{
  const proc = spawnSync(process.execPath, [SCRIPT, 'supahero', 'get'], { encoding: 'utf8', timeout: 15000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  zeile(proc.status === 2 && /genau einen Slug oder eine URL/.test(aus), 'Galerie-get ohne Ziel Exit 2');
}

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
      && /X\/LinkedIn/.test(aus)
      && /supahero list/.test(aus) && /cta list/.test(aus) && /recent list/.test(aus) && /fps list/.test(aus) && /posts list/.test(aus)
      && /loadmore list/.test(aus) && /kinetics list/.test(aus) && /notfound list/.test(aus)
      && /circleloaders list/.test(aus) && /umanmade list/.test(aus)
      && /Lizenz je Galerie: nur Inspiration/.test(aus),
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
  // Seit 03.09.2026 ist das 21st-CLI eingeloggt; ohne Login gilt Exit 1 + Hinweis, mit Login Exit 0 + JSON.
  const eingeloggt = fs.existsSync(path.join(process.env.HOME || '/root', '.config', '21st', 'auth.json'));
  zeile(
    eingeloggt ? (proc.status === 0 && /"type":\s*"component"|installCommand|"id"/.test(aus)) : (proc.status === 1 && /21st CLI nicht eingeloggt/.test(aus) && /API_KEY_21ST/.test(aus)),
    eingeloggt ? '21st code mit Login Exit 0 + Treffer' : '21st code ohne Login Exit 1',
  );
}

{
  // --out schreibt Komponente + Demo (Builder-Plan 04.09.2026); ohne Login bleibt Exit 1.
  const proc = spawnSync(process.execPath, [SCRIPT, '21st', 'code', '4051', '--out', '/tmp/inspiration-eval-21st'], { encoding: 'utf8', timeout: 30000 });
  const aus = `${proc.stderr || ''}${proc.stdout || ''}`;
  const eingeloggt = fs.existsSync(path.join(process.env.HOME || '/root', '.config', '21st', 'auth.json'));
  const written = eingeloggt && fs.existsSync('/tmp/inspiration-eval-21st/hero-section.tsx') && fs.statSync('/tmp/inspiration-eval-21st/hero-section.tsx').size > 1000;
  zeile(
    eingeloggt ? (proc.status === 0 && /component\t/.test(aus) && written) : (proc.status === 1),
    eingeloggt ? '21st code <id> --out schreibt Komponente > 1 KB' : '21st code --out ohne Login Exit 1',
  );
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
  for (const source of ['supahero', 'cta', 'recent', 'fps', 'posts']) {
    const proc = run([source, 'list', '--limit', '5'], 120000);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 3
        && data.every((row) => row.title && row.url && row.media),
      `netz: ${source} list ≥3 mit Titel/URL/Medien-URL`,
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  for (const source of ['loadmore', 'kinetics', 'notfound', 'circleloaders', 'umanmade']) {
    const proc = run([source, 'list', '--limit', '3'], 120000);
    const data = parseOut(proc);
    zeile(
      proc.status === 0 && Array.isArray(data) && data.length >= 3
        && data.every((row) => row.title && row.url),
      `netz: ${source} list ≥3 mit Titel/URL`,
      `exit ${proc.status} n=${Array.isArray(data) ? data.length : 'kein-json'} ${(proc.stderr || '').split('\n')[0].slice(0, 120)}`,
    );
  }
  for (const [source, list] of [['supahero', supahero], ['cta', ctas], ['recent', recent], ['fps', fps], ['posts', posts]]) {
    const out = `/tmp/inspiration-eval-${source}-live.md`;
    const proc = spawnSync(process.execPath, [SCRIPT, source, 'get', list[0].slug, '--out', out], {
      encoding: 'utf8', timeout: 120000, maxBuffer: 12 * 1024 * 1024,
    });
    const content = fs.existsSync(out) ? read(out) : '';
    zeile(
      proc.status === 0 && /Medien-URL:/.test(content) && /Lizenz: .* nur Inspiration\./.test(content),
      `netz: ${source} get --out schreibt Medien-URL und Lizenz`,
      `exit ${proc.status}`,
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
