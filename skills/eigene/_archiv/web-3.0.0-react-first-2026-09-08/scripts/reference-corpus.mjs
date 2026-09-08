#!/usr/bin/env node
// Offline retrieval for source studies. Does not crawl or assign quality scores.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const corpusDir = fileURLToPath(new URL('../references/corpus/', import.meta.url));
const argv = process.argv.slice(2);
const command = argv.shift() || 'list';
const opts = {};
for (let i = 0; i < argv.length; i++) {
  const k = argv[i];
  if (!['--query', '--type', '--domain'].includes(k) || !argv[i + 1] || argv[i + 1].startsWith('--')) {
    console.error('Usage: reference-corpus.mjs list|search|validate [--query text] [--type text] [--domain host]');
    process.exit(2);
  }
  opts[k.slice(2)] = argv[++i];
}
if (!['list', 'search', 'validate'].includes(command)) {
  console.error('Unknown command: ' + command);
  process.exit(2);
}
const errors = [];
const sites = [];
const supplements = [];
for (const file of (await readdir(corpusDir)).filter(f => f.endsWith('.json')).sort()) {
  let data;
  try { data = JSON.parse(await readFile(path.join(corpusDir, file), 'utf8')); }
  catch (e) { errors.push(`${file}: invalid JSON: ${e.message}`); continue; }
  if (!Array.isArray(data.sites)) { supplements.push(file); continue; }
  for (const site of data.sites) sites.push({ ...site, sourceFile: file });
}
const isUrl = value => {
  try { return ['http:', 'https:'].includes(new URL(value).protocol); }
  catch { return false; }
};
const ids = new Set();
const evidenceLabels = new Set(['web_text', 'web_text_partial', 'indexed_text', 'blocked', 'dom', 'screenshot', 'state_sequence', 'video', 'measured']);
for (const site of sites) {
  const label = `${site.sourceFile}:${site.id || '(missing id)'}`;
  if (!site.id || ids.has(site.id)) errors.push(`${label}: missing/duplicate site id`);
  ids.add(site.id);
  if (!isUrl(site.url)) errors.push(`${label}: invalid site URL`);
  if (!site.category || !site.role) errors.push(`${label}: category and role required`);
  if (!Array.isArray(site.pages) || site.pages.length === 0) errors.push(`${label}: explicit page access records required`);
  for (const p of site.pages || []) {
    if (!isUrl(p.url) || !p.type) errors.push(`${label}: invalid page URL/type`);
    if (!Array.isArray(p.evidence) || p.evidence.length === 0) errors.push(`${label}:${p.url}: evidence labels required`);
    else if (p.evidence.some(e => !evidenceLabels.has(e))) errors.push(`${label}:${p.url}: unknown evidence label`);
    if (!Array.isArray(p.observations) || !Array.isArray(p.limitations)) errors.push(`${label}:${p.url}: observations/limitations arrays required`);
  }
  if (!Array.isArray(site.limitations)) errors.push(`${label}: site limitations required`);
}
if (!sites.length) errors.push('No site records found');
if (errors.length) {
  console.error(JSON.stringify({ valid: false, errors }, null, 2));
  process.exit(1);
}
if (command === 'validate') {
  const pages = sites.flatMap(s => s.pages);
  console.log(JSON.stringify({ valid: true, siteRecords: sites.length, domains: new Set(sites.map(s => new URL(s.url).hostname.replace(/^www\./, ''))).size, pageRecords: pages.length, distinctURLs: new Set(pages.map(p => p.url)).size, evidenceLabels: [...new Set(pages.flatMap(p => p.evidence))].sort(), supplements, limitation: 'Structural validation only; URL variants are not canonicalised and no visual review is certified.' }, null, 2));
} else {
  const norm = x => String(x || '').normalize('NFKD').toLowerCase();
  const words = norm(opts.query).split(/\s+/).filter(Boolean);
  const selected = sites.filter(s => !opts.domain || new URL(s.url).hostname.replace(/^www\./, '') === opts.domain.replace(/^www\./, '')).flatMap(s => {
    const siteText = norm([s.id, s.category, s.role, JSON.stringify(s.patterns)].join(' '));
    const pages = s.pages.filter(p => (!opts.type || norm(p.type).includes(norm(opts.type))) && words.every(w => (siteText + ' ' + norm(JSON.stringify(p))).includes(w)));
    if (!pages.length) return [];
    return [{ id: s.id, url: s.url, category: s.category, role: s.role, sourceFile: s.sourceFile, pageCount: pages.length, ...(command === 'search' ? { pages, patterns: s.patterns, limitations: s.limitations } : { pageTypes: [...new Set(pages.map(p => p.type))] }) }];
  });
  console.log(JSON.stringify({ sites: selected, supplements, note: 'Read linked source studies and inspect visual evidence before design decisions.' }, null, 2));
}
