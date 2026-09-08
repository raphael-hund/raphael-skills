// Deterministic tests use fixtures; they do not make paid requests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parseArgs, redact, isPublicAddress, validateURL, inspectImage, createClient, request } from '../scripts/find-images.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 12"><path d="M0 0h24v12z"/></svg>');
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWZkAAAAASUVORK5CYII=', 'base64');
const response = (value, url = 'https://assets.example.com/image', contentType = 'image/svg+xml') => ({ buffer: Buffer.isBuffer(value) ? value : Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)), status: 200, headers: { 'content-type': contentType }, url });
const result = (url = 'https://assets.example.com/image') => ({ url, width: null, height: null, source: 'fixture', page: 'https://example.com/source', license_hint: 'Fixture' });
const options = (download, max = 1) => ({ command: 'logo', query: 'fixture', provider: 'auto', max, download });
async function temporary(t) {
  const folder = await fs.mkdtemp(path.join(ROOT, '.tmp-'));
  t.after(() => fs.rm(folder, { force: true, recursive: true }));
  return folder;
}
function client(fetcher, env = {}) { return createClient({ fetcher, env, warn: () => {} }); }

test('CLI parses multiword queries, options and literal flags', () => {
  assert.deepEqual(parseArgs(['photo', 'dachdecker', 'bei der arbeit', '--max=3']), { command: 'photo', query: 'dachdecker bei der arbeit', max: 3, provider: 'auto', download: null });
  assert.equal(parseArgs(['search', '--', '--literal']).query, '--literal');
  assert.equal(parseArgs(['--help']).help, true);
});
test('CLI rejects missing query, unknown providers and invalid counts', () => {
  for (const args of [[], ['logo'], ['video', 'roof'], ['logo', 'google', '--max', '0'], ['icon', 'phone', '--max', '2.5'], ['icon', 'phone', '--max', '51'], ['photo', 'x', '--provider', 'bing'], ['search', 'x', '--download'], ['search', 'x', '--wat']]) assert.throws(() => parseArgs(args));
});
test('Secret redaction handles encoded tokens, nested values and quotation marks', () => {
  const secret = 'demo-"secret/&value';
  const output = redact({ url: `https://img.logo.dev/a.com?token=${encodeURIComponent(secret)}`, nested: [secret, null, 3], plain: 'unchanged' }, { LOGO_DEV_TOKEN: secret });
  assert.equal(output.url, 'https://img.logo.dev/a.com?token=[REDACTED]');
  assert.deepEqual(output.nested, ['[REDACTED]', null, 3]);
  assert.equal(redact('https://example.com?api_key=other&x=2', {}), 'https://example.com?api_key=[REDACTED]&x=2');
});
test('Local IPv4, IPv6, mapped and metadata addresses are blocked', async () => {
  for (const address of ['127.0.0.1', '0.0.0.0', '10.1.2.3', '169.254.169.254', '172.16.1.1', '192.168.1.1', '100.64.0.1', '::1', '::ffff:127.0.0.1', 'fc00::1', 'fe80::1', '2002:7f00:1::']) assert.equal(isPublicAddress(address), false, address);
  for (const address of ['1.1.1.1', '8.8.8.8', '2606:4700:4700::1111']) assert.equal(isPublicAddress(address), true);
  for (const url of ['file:///etc/passwd', 'http://127.1', 'http://2130706433', 'http://[::1]', 'http://host.local', 'https://user:pass@example.com', 'https://example.com:22']) assert.throws(() => validateURL(url));
  await assert.rejects(request('http://169.254.169.254/latest/meta-data'), /Lokale/);
});
test('SVG dimensions use viewBox or explicit pixel size', () => {
  assert.deepEqual(inspectImage(SVG), { type: 'image/svg+xml', ext: 'svg', width: 24, height: 12 });
  assert.equal(inspectImage(Buffer.from('<?xml version="1.0"?><svg width="48px" height="32"><title>AT&amp;T</title></svg>')).width, 48);
});
test('HTML, fake SVG, active SVG and truncated raster files are rejected', () => {
  for (const text of ['<html><svg></svg></html>', '<!-- <svg></svg> -->', '<svg onload="run()"></svg>', '<svg><script>run()</script></svg>', '<svg><foreignObject/></svg>', '<svg><image href="https://tracker.example/a"/></svg>', '<svg><style>@import "x"</style></svg>', '<svg><use href="&#x68;ttps://example.com"/></svg>', '<?xml-stylesheet href="https://example.com/style"?><svg/>', '<!DOCTYPE svg><svg/>', '{"error":"no key"}', '<svg viewBox="0 0 -3 20"></svg>']) assert.throws(() => inspectImage(Buffer.from(text)), undefined, text);
  assert.throws(() => inspectImage(PNG.subarray(0, 33)), /unvollständig/);
});
test('PNG signature wins over extension and MIME', () => assert.deepEqual(inspectImage(PNG), { type: 'image/png', ext: 'png', width: 1, height: 1 }));
test('GIF, JPEG and WebP header dimensions are read', () => {
  const gif = Buffer.from('474946383961020003000000003b', 'hex');
  assert.equal(inspectImage(gif).height, 3);
  const jpeg = Buffer.from('ffd8ffc0001108000c001803011100021100031100ffd9', 'hex');
  assert.equal(inspectImage(jpeg).width, 24);
  const webp = Buffer.alloc(30); webp.write('RIFF'); webp.writeUInt32LE(22, 4); webp.write('WEBPVP8X', 8); webp.writeUInt32LE(10, 16); webp.writeUIntLE(23, 24, 3); webp.writeUIntLE(11, 27, 3);
  assert.equal(inspectImage(webp).width, 24); assert.equal(inspectImage(webp).height, 12);
});
test('AVIF brand and ispe dimensions are read', () => {
  const avif = Buffer.alloc(40); avif.writeUInt32BE(20, 0); avif.write('ftypavif', 4); avif.write('avif', 16); avif.writeUInt32BE(20, 20); avif.write('ispe', 24); avif.writeUInt32BE(24, 32); avif.writeUInt32BE(12, 36);
  assert.deepEqual(inspectImage(avif), { type: 'image/avif', ext: 'avif', width: 24, height: 12 });
});
test('Logo auto priority stops at Simple Icons', async () => {
  const urls = [];
  const c = client(async url => { urls.push(url); return response(SVG, url); });
  const found = await c.search(options(null));
  assert.equal(found.results[0].source, 'simpleicons'); assert.equal(urls.length, 1);
});
test('Logo fallback reaches SVGL and preserves exact brand variants', async () => {
  const urls = [];
  const c = client(async url => { urls.push(url); if (url.includes('simpleicons')) throw new Error('HTTP 404'); return response([{ title: 'Fixture Plus', route: 'https://svgl.app/plus.svg' }, { title: 'Fixture', route: { light: 'https://svgl.app/light.svg', dark: 'https://svgl.app/dark.svg' }, wordmark: 'https://svgl.app/wordmark.svg', url: 'https://fixture.example' }], url); });
  const found = await c.search(options(null));
  assert.equal(found.results.length, 3); assert.equal(found.results[0].source, 'svgl'); assert.equal(urls.length, 2);
});
test('Logo priority visits keyed providers before Commons and DDG', async () => {
  const c = client(async () => { throw new Error('offline fixture'); }, { LOGO_DEV_TOKEN: 'demo-token', BRANDFETCH_API_KEY: 'demo-key' });
  const found = await c.search({ ...options(null), query: 'missing.example' });
  assert.deepEqual(found.attempts.map(a => a.provider), ['simpleicons', 'svgl', 'logodev', 'brandfetch', 'wikimedia', 'duckduckgo']);
});
test('Logo.dev supports company names without inventing a domain', async () => {
  let requested;
  const c = client(async url => { requested = url; return response(SVG, url); }, { LOGO_DEV_PUBLISHABLE_KEY: 'demo-publishable-key' });
  const found = await c.providers.logodev('Test Company');
  assert.match(requested, /\/name\/Test%20Company\?token=/); assert.equal(found[0].page, 'https://www.logo.dev');
});
test('Brandfetch client ID alone does not make a prohibited CDN download', async () => {
  const c = client(async () => assert.fail('No CDN fetch expected'), { BRANDFETCH_CLIENT_ID: 'demo-client' });
  await assert.rejects(c.providers.brandfetch('google.com'), /Browser-Hotlinking/);
});
test('Iconify preserves per-collection attribution', async () => {
  const c = client(async url => response({ icons: ['lucide:phone'], collections: { lucide: { license: { title: 'ISC', url: 'https://example.com/LICENSE' } } } }, url));
  const found = await c.providers.iconify('phone', 3);
  assert.equal(found[0].url, 'https://api.iconify.design/lucide/phone.svg'); assert.match(found[0].license_hint, /ISC/); assert.equal(found[0].width, null);
});
test('DDG extracts fresh vqd, original image URLs, dimensions and source page', async () => {
  const urls = [];
  const c = client(async (url, opts) => {
    urls.push(url);
    if (!url.includes('/i.js')) return response('<script>vqd="4-12345";</script>', url);
    assert.equal(new URL(url).searchParams.get('vqd'), '4-12345'); assert.match(opts.headers.Referer, /iax=images/);
    return response({ results: [{ image: 'https://example.com/original.jpg', thumbnail: 'https://example.com/thumb.jpg', url: 'https://example.com/story', width: 2000, height: 1000 }] }, url);
  });
  const found = await c.providers.duckduckgo('dachdecker bei der arbeit');
  assert.equal(found[0].url, 'https://example.com/original.jpg'); assert.equal(found[0].width, 2000); assert.equal(found[0].page, 'https://example.com/story'); assert.equal(urls.length, 2);
});
test('Photo auto falls back to Commons when DDG has no token', async () => {
  const c = client(async url => url.includes('duckduckgo') ? response('<html>challenge</html>', url) : response({ query: { pages: { 1: { index: 1, title: 'File:Roofer.jpg', imageinfo: [{ url: 'https://upload.wikimedia.org/roofer.jpg', descriptionurl: 'https://commons.wikimedia.org/wiki/File:Roofer.jpg', width: 1200, height: 800, extmetadata: { LicenseShortName: { value: 'CC BY 4.0' }, Artist: { value: '<a>Photographer</a>' } } }] } } } }, url));
  const found = await c.search({ ...options(null), command: 'photo', query: 'roofer' });
  assert.equal(found.results[0].source, 'wikimedia'); assert.equal(found.results[0].attribution, 'Photographer'); assert.match(found.attempts[0].error, /vqd/);
});
test('Search filters duplicate URLs, stock preview hosts and private addresses', async () => {
  const c = client(async url => response({ images: [
    { imageUrl: 'https://as1.ftcdn.net/a.jpg' }, { imageUrl: 'https://img.freepik.com/a.jpg' }, { imageUrl: 'https://c8.alamy.com/a.jpg' }, { imageUrl: 'https://example.com/watermarked.jpg' }, { imageUrl: 'http://127.0.0.1/a.jpg' }, { imageUrl: 'https://example.com/good.jpg' }, { imageUrl: 'https://example.com/good.jpg' },
  ] }, url), { SERPER_API_KEY: 'demo-key' });
  const found = await c.search({ ...options(null), command: 'search', provider: 'serper' });
  assert.deepEqual(found.results.map(r => r.url), ['https://example.com/good.jpg']);
});
test('Optional keyed APIs construct authentication and image fields', async () => {
  const calls = [];
  const c = client(async (url, opts) => { calls.push({ url, opts });
    if (url.includes('unsplash')) return response({ results: [{ urls: { regular: 'https://images.unsplash.com/a' }, links: { html: 'https://unsplash.com/photos/a', download_location: 'https://api.unsplash.com/photos/a/download' }, width: 2000, height: 1000, user: { name: 'A' } }] }, url);
    if (url.includes('pexels')) return response({ photos: [{ src: { original: 'https://images.pexels.com/a.jpg' }, url: 'https://pexels.com/photo/a', width: 100, height: 50, photographer: 'B' }] }, url);
    if (url.includes('brandfetch')) return response({ logos: [{ type: 'logo', formats: [{ src: 'https://assets.example.com/brand.svg', width: 24, height: 12 }] }] }, url);
    if (url.includes('serpapi')) return response({ images_results: [{ original: 'https://example.com/a.jpg', original_width: 100, original_height: 50, link: 'https://example.com/page' }] }, url);
    if (url.includes('googleapis')) return response({ items: [{ link: 'https://example.com/a.jpg', image: { width: 100, height: 50, contextLink: 'https://example.com/page' } }] }, url);
    return response({ images: [{ imageUrl: 'https://example.com/a.jpg', imageWidth: 100, imageHeight: 50, link: 'https://example.com/page' }] }, url);
  }, { UNSPLASH_ACCESS_KEY: 'u-key', PEXELS_API_KEY: 'p-key', BRANDFETCH_API_KEY: 'b-key', SERPER_API_KEY: 's-key', SERPAPI_API_KEY: 'sa-key', GOOGLE_API_KEY: 'g-key', GOOGLE_CX: 'cx-id' });
  for (const name of ['unsplash', 'pexels', 'brandfetch', 'serpapi', 'google', 'serper']) assert.equal((await c.providers[name]('example.com', 2)).length, 1);
  assert.equal(calls[0].opts.headers.Authorization, 'Client-ID u-key'); assert.equal(calls[1].opts.headers.Authorization, 'p-key'); assert.equal(calls[2].opts.headers.Authorization, 'Bearer b-key');
  assert.equal(new URL(calls[3].url).searchParams.get('engine'), 'google_images'); assert.equal(new URL(calls[4].url).searchParams.get('searchType'), 'image'); assert.equal(calls[5].opts.method, 'POST'); assert.equal(calls[5].opts.headers['X-API-KEY'], 's-key');
});
test('Missing optional keys are explicit errors without requests', async () => {
  const c = client(async () => assert.fail('No network request expected'));
  for (const name of ['logodev', 'brandfetch', 'unsplash', 'pexels', 'serper', 'serpapi', 'google']) await assert.rejects(c.providers[name]('example.com', 2), /Schlüssel fehlt/);
});
test('Manifest records hash, source, date, actual type and merged runs', async t => {
  const folder = await temporary(t); const c = client(async url => response(PNG, url, 'text/html'));
  const first = await c.download([result('https://assets.example.com/wrong.svg')], options(folder));
  assert.match(first[0].file, /\.png$/); assert.equal(first[0].mime, 'image/png'); assert.equal(first[0].width, 1);
  assert.equal(first[0].sha256, createHash('sha256').update(PNG).digest('hex'));
  await c.download([result('https://assets.example.com/wrong.svg')], options(folder));
  const manifest = JSON.parse(await fs.readFile(path.join(folder, 'manifest.json'), 'utf8'));
  assert.equal(manifest.assets.length, 1); assert.equal(manifest.runs.length, 2); assert.equal(manifest.assets[0].declared_content_type, 'text/html'); assert.ok(Date.parse(manifest.assets[0].fetched_at));
});
test('Download skips HTML and counts successful files toward --max', async t => {
  const folder = await temporary(t); const c = client(async url => response(url.endsWith('bad') ? '<html>bad</html>' : SVG, url));
  const output = await c.download([result('https://example.com/bad'), result('https://example.com/good')], options(folder));
  assert.equal(output.length, 1);
  const m = JSON.parse(await fs.readFile(path.join(folder, 'manifest.json'), 'utf8'));
  assert.equal(m.runs[0].errors.length, 1); assert.equal(m.assets.length, 1);
});
test('All failed downloads still create a manifest with error evidence', async t => {
  const folder = await temporary(t); const c = client(async () => { throw new Error('HTTP 403'); });
  assert.deepEqual(await c.download([result()], options(folder)), []);
  const m = JSON.parse(await fs.readFile(path.join(folder, 'manifest.json'), 'utf8'));
  assert.equal(m.assets.length, 0); assert.match(m.runs[0].errors[0].error, /403/);
});
test('Manifest redacts API credentials including encoded values', async t => {
  const folder = await temporary(t); const secret = 'demo/secret+token';
  const c = client(async url => response(SVG, url), { LOGO_DEV_TOKEN: secret });
  await c.download([result(`https://img.logo.dev/example.com?token=${encodeURIComponent(secret)}`)], options(folder));
  const text = await fs.readFile(path.join(folder, 'manifest.json'), 'utf8');
  assert.ok(!text.includes(secret)); assert.ok(!text.includes(encodeURIComponent(secret))); assert.match(text, /REDACTED/);
});
test('Malformed and foreign manifests are preserved', async t => {
  const folder = await temporary(t); const c = client(async url => response(SVG, url));
  for (const text of ['{broken', '{"schema_version":99,"assets":[],"runs":[]}']) {
    await fs.writeFile(path.join(folder, 'manifest.json'), text);
    await assert.rejects(c.download([result()], options(folder)));
    assert.equal(await fs.readFile(path.join(folder, 'manifest.json'), 'utf8'), text);
    await assert.rejects(fs.stat(path.join(folder, '.image-search.lock')), { code: 'ENOENT' });
  }
});
test('Lock and symlinked manifest are preserved without writes', async t => {
  const folder = await temporary(t); const c = client(async url => response(SVG, url));
  await fs.writeFile(path.join(folder, '.image-search.lock'), 'existing lock');
  await assert.rejects(c.download([result()], options(folder)), /gesperrt/);
  assert.equal(await fs.readFile(path.join(folder, '.image-search.lock'), 'utf8'), 'existing lock');
  await fs.unlink(path.join(folder, '.image-search.lock'));
  await fs.writeFile(path.join(folder, 'untouched.json'), '{}');
  await fs.symlink(path.join(folder, 'untouched.json'), path.join(folder, 'manifest.json'));
  await assert.rejects(c.download([result()], options(folder)), /reguläre Datei/);
  assert.equal(await fs.readFile(path.join(folder, 'untouched.json'), 'utf8'), '{}');
});
test('Symlinked image targets are rejected', async t => {
  const folder = await temporary(t); const sha = createHash('sha256').update(SVG).digest('hex');
  await fs.writeFile(path.join(folder, 'untouched'), 'original');
  await fs.symlink(path.join(folder, 'untouched'), path.join(folder, `${sha}.svg`));
  const c = client(async url => response(SVG, url));
  assert.deepEqual(await c.download([result()], options(folder)), []);
  assert.equal(await fs.readFile(path.join(folder, 'untouched'), 'utf8'), 'original');
});
test('Unsplash download tracking uses authenticated canonical endpoint', async t => {
  const folder = await temporary(t); const calls = [];
  const c = client(async (url, opts) => { calls.push({ url, opts }); return response(url.includes('api.unsplash.com') ? { url: 'https://images.unsplash.com/a' } : PNG, url); }, { UNSPLASH_ACCESS_KEY: 'demo-key' });
  const output = await c.download([{ ...result('https://images.unsplash.com/a'), source: 'unsplash', download_tracking_url: 'https://api.unsplash.com/photos/a/download' }], options(folder));
  assert.equal(output.length, 1); assert.equal(calls.length, 2); assert.equal(calls[1].opts.headers.Authorization, 'Client-ID demo-key');
});
test('Unsplash cannot send its secret to an untrusted tracking URL', async t => {
  const folder = await temporary(t); let count = 0;
  const c = client(async url => { count++; return response(PNG, url); }, { UNSPLASH_ACCESS_KEY: 'demo-key' });
  const output = await c.download([{ ...result(), source: 'unsplash', download_tracking_url: 'https://example.com/steal' }], options(folder));
  assert.equal(output.length, 0); assert.equal(count, 1);
});
