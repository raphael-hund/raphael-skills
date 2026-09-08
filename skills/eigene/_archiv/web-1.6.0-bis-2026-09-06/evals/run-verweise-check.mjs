#!/usr/bin/env node
// Prueft den erreichbaren Referenzgraph ab SKILL.md, nicht jeden Markdown-Baum.
// Direkte Archiv-/Vendor-Ziele muessen existieren; ihre Inhalte sind kein aktiver
// Skill-Vertrag. Import-, Lizenz-, Stil- und Versionspruefungen haben eigene Evals.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(HIER, '..');
const DEFAULT_SKILLS = path.resolve(WEB, '..', '..');
const HELP = `Usage:
  node run-verweise-check.mjs [--skill web] [--skills-root <skills>]
    [--skill-root <absoluter-skill-ordner>] [--json]

Start: SKILL.md, loads/metadata.raphael-loads, requires_skills und aktive
Markdown-Verweise. Jeder relative Verweis behaelt seinen Datei-/Skill-Kontext.
Archiv, Vendor, Case-Daten und Laufzeitausgaben werden getrennt ausgewiesen.
Fenced Code, Herkunftsfelder und reine Dateinennungen sind keine Verweislisten.
Exit 0 = aufgeloest; 1 = fehlendes Ziel/ungueltige Metadaten;
2 = nicht geprueft (z. B. fehlender Einstieg oder null Verweise).`;
const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const result = {
  schema: 'web/references/v1', scope: 'active-reference-graph', status: 'NOT_CHECKED',
  checked: 0, documents: [], missing: [], errors: [], excluded: [],
};
function output(code) {
  if (jsonMode) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`\nVerweise-Check: ${result.documents.length} aktive Dokumente, ${result.checked} Verweise.\n`);
    for (const entry of result.missing) {
      console.log(`  [!!] ${entry.source}:${entry.line}`);
      console.log(`         zeigen ins Leere: ${entry.target}`);
    }
    for (const entry of result.errors) console.log(`  [!!] ${entry.source || 'Pruefer'}: ${entry.message}`);
    const reasons = new Map();
    for (const entry of result.excluded) reasons.set(entry.reason, (reasons.get(entry.reason) || 0) + 1);
    if (reasons.size) console.log(`  Nicht vertieft: ${[...reasons].map(([name, count]) => `${name} (${count})`).join(', ')}.`);
    if (result.status === 'PASS') console.log(`  [OK] ${result.checked} gepruefte Verweise loesen auf.`);
    else console.log(`  ${result.status}: ${result.missing.length} fehlende Ziele, ${result.errors.length} weitere Befunde.`);
    if (result.checked > 0) console.log(`\n${Math.max(0, result.checked - result.missing.length)}/${result.checked} Pfade aufgeloest.`);
  }
  process.exitCode = code;
}
function value(flag, fallback) {
  const index = args.indexOf(flag);
  if (index < 0) return fallback;
  if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${flag} braucht einen Wert`);
  return args[index + 1];
}
function within(root, file) {
  const rel = path.relative(root, file);
  return rel === '' || (!rel.startsWith(`..${path.sep}`) && rel !== '..' && !path.isAbsolute(rel));
}
function skillDirectories(root) {
  const found = new Map();
  const priority = (dir) => {
    const parts = path.relative(root, dir).split(path.sep);
    return parts[0] === 'eigene' ? 0 : parts.length === 1 ? 1 : parts[0] === 'methodik' ? 2 : 3;
  };
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.') || ['node_modules', 'vendor', 'resources', 'references', 'evals'].includes(entry.name)) continue;
      const child = path.join(dir, entry.name);
      if (fs.existsSync(path.join(child, 'SKILL.md'))) {
        if (!found.has(entry.name) || priority(child) < priority(found.get(entry.name))) found.set(entry.name, child);
      }
      else walk(child);
    }
  };
  walk(root);
  return found;
}

// Leichter Parser fuer die beiden bestehenden Frontmatter-Vertraege. Kein
// zweiter YAML-Linter: nur deklarierte Listen lesen, unlesbare Listen melden.
function frontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { fields: [], body: lines, offset: 0 };
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end < 0) throw new Error('Frontmatter ohne schliessendes ---');
  return { fields: lines.slice(1, end), body: lines.slice(end + 1), offset: end + 1 };
}
function field(lines, name, nested = false) {
  const pattern = new RegExp(`^${nested ? '[ \\t]+' : ''}${name}:\\s*(.*)$`);
  const index = lines.findIndex((line) => pattern.test(line));
  if (index < 0) return null;
  const indent = lines[index].match(/^\s*/)[0].length;
  const block = [];
  for (let i = index + 1; i < lines.length; i++) {
    if (!lines[i].trim() || lines[i].trim().startsWith('#')) continue;
    if (lines[i].match(/^\s*/)[0].length <= indent) break;
    block.push(lines[i]);
  }
  return { raw: lines[index].match(pattern)[1].trim(), block, line: index + 2 };
}
function scalar(raw) {
  const value = raw.trim();
  if (value.startsWith('"')) return JSON.parse(value);
  if (value.startsWith("'")) {
    if (!value.endsWith("'")) throw new Error('Unvollstaendiger gequoteter Wert');
    return value.slice(1, -1).replaceAll("''", "'");
  }
  return value.replace(/\s+#.*$/, '').trim();
}
function inlineList(raw) {
  if (!raw.startsWith('[') || !raw.endsWith(']')) throw new Error('Liste erwartet');
  const inner = raw.slice(1, -1).trim();
  if (!inner) return [];
  const parts = [];
  let start = 0, quote = null;
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    if (quote === '"' && char === '\\') { i++; continue; }
    if (quote === "'" && char === "'" && inner[i + 1] === "'") { i++; continue; }
    if (quote) { if (char === quote) quote = null; }
    else if (char === '"' || char === "'") quote = char;
    else if (char === ',') { parts.push(inner.slice(start, i)); start = i + 1; }
  }
  if (quote) throw new Error('Unvollstaendiger gequoteter Listeneintrag');
  parts.push(inner.slice(start));
  return parts.map(scalar);
}
function listField(fields, legacy, portable) {
  const metadata = field(fields, 'metadata');
  const namespaced = metadata ? field(metadata.block, portable, true) : null;
  const entry = namespaced || field(fields, legacy);
  if (!entry) return { values: [], line: 1 };
  let values;
  if (namespaced) {
    values = JSON.parse(scalar(entry.raw));
  } else if (entry.raw.startsWith('[')) {
    values = inlineList(entry.raw.replace(/\s+#.*$/, ''));
  } else if (!entry.raw) {
    values = [];
    for (const line of entry.block) {
      const item = line.trim();
      if (item.startsWith('- ')) values.push(item.slice(2));
      else if (values.length) values[values.length - 1] += ` ${item}`;
      else throw new Error(`${legacy}: Listeneintrag erwartet`);
    }
    values = values.map(scalar);
  } else throw new Error(`${legacy}: Liste erwartet`);
  if (!Array.isArray(values) || values.some((item) => typeof item !== 'string' || !item.trim())) throw new Error(`${portable}: Liste nichtleerer Strings erwartet`);
  return { values, line: namespaced ? metadata.line + entry.line - 1 : entry.line };
}

const LOCAL_PREFIXES = new Set(['references', 'scripts', 'evals', 'resources', 'assets', 'vendor', 'registry', 'rules']);
const PROJECT_NAMES = new Set(['run-evidence.json', 'state-spec.json', 'manifest.json', 'plan-manifest.json', 'plan-verification.json']);
const PATH_TOKEN = /(?:^|[\s=("',])((?:\.{1,2}\/|\/)?[A-Za-z0-9_@.-]+(?:\/[A-Za-z0-9_@.+-]+)*\.(?:md|mjs|js|py|json|html|tsx?|jsx|css|sh|ya?ml)(?:#[A-Za-z0-9_-]+)?)(?=$|[\s)"',;])/g;
function inlineTargets(text, skills) {
  const found = [];
  if (/^\s*(?:export|import|const|let|var)\b/.test(text)) return found;
  for (const match of text.matchAll(PATH_TOKEN)) {
    const target = match[1];
    const first = target.split('/')[0];
    if (target.startsWith('/') || target.startsWith('./') || target.startsWith('../') || LOCAL_PREFIXES.has(first) || skills.has(first) || ['skills', 'eigene', 'methodik', 'wiki', 'raw', 'ops'].includes(first)) found.push(target);
  }
  return found;
}
function links(lines, offset, skills) {
  const found = [];
  let fence = null, paragraph = 0, provenance = false;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!line.trim()) { paragraph++; provenance = false; }
    if (/^\s*(?:\*\*)?(?:Herkunft(?: der Auswahl)?|Quelle|Sources?|Provenance):/i.test(line)) provenance = true;
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence = marker[1][0]; else if (marker[1][0] === fence) fence = null; continue; }
    if (fence) continue;
    const entries = [];
    for (const match of line.matchAll(/!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^)]*)?\)/g)) entries.push({ target: match[1] || match[2], position: match.index, kind: 'markdown' });
    const definition = line.match(/^\s*\[[^\]]+\]:\s*(\S+)/);
    if (definition) entries.push({ target: definition[1], position: 0, kind: 'markdown' });
    for (const match of line.matchAll(/`([^`]+)`/g)) {
      for (const target of inlineTargets(match[1], skills)) entries.push({ target, position: match.index, kind: 'inline' });
    }
    for (const entry of entries.sort((a, b) => a.position - b.position)) found.push({ ...entry, line: index + offset + 1, paragraph, provenance });
  }
  return found;
}
function terminalReason(file, owner) {
  const rel = path.relative(owner, file).split(path.sep);
  if (path.basename(file) === 'VENDORING.md') return 'provenance-document';
  if (rel.some((part) => ['_archiv', '_archive', 'archive', 'archives', 'plans'].includes(part))) return 'historical';
  if (rel.includes('muster-bibliothek')) return 'case-data';
  if (rel[0] === 'evals') return 'eval-data';
  if (rel.includes('vendor') || rel.includes('node_modules') || ((rel.includes('ui-components') || rel.join('/').startsWith('resources/components/')) && path.basename(file) !== 'INDEX.md')) return 'vendor';
  return null;
}

try {
  if (args.includes('--help')) { console.log(HELP); process.exit(0); }
  for (const arg of args) if (arg.startsWith('--') && !['--help', '--json', '--skill', '--skills-root', '--skill-root'].includes(arg)) throw new Error(`Unbekanntes Flag ${arg}`);
  const skillsRoot = path.resolve(value('--skills-root', DEFAULT_SKILLS));
  const skills = skillDirectories(skillsRoot);
  const name = value('--skill', 'web');
  const targetRoot = path.resolve(value('--skill-root', skills.get(name) || path.join(skillsRoot, name)));
  const start = path.join(targetRoot, 'SKILL.md');
  if (!fs.existsSync(start)) throw new Error(`SKILL.md nicht gefunden: ${start}`);
  const queue = [{ file: start, owner: targetRoot }];
  const seen = new Set();
  const checked = new Map();
  function ownerOf(file, fallback) {
    let dir = path.dirname(file);
    while (within(skillsRoot, dir)) {
      if (fs.existsSync(path.join(dir, 'SKILL.md'))) return dir;
      if (dir === skillsRoot) break;
      dir = path.dirname(dir);
    }
    return fallback;
  }
  function candidates(target, source, owner, kind) {
    if (kind === 'dependency') return skills.has(target) ? [path.join(skills.get(target), 'SKILL.md')] : [];
    if (path.isAbsolute(target)) return [target];
    if (kind === 'markdown') return [path.resolve(path.dirname(source), target)];
    if (target.startsWith('./') || target.startsWith('../')) return [path.resolve(path.dirname(source), target)];
    if (target.startsWith('evals/rubrics/')) return [path.resolve('/root/raphael-command-center', target)];
    const parts = target.split('/');
    if (LOCAL_PREFIXES.has(parts[0])) return [path.resolve(owner, target)];
    if (parts[0] === 'skills') return [path.resolve(path.dirname(skillsRoot), target)];
    if (['eigene', 'methodik', 'imported'].includes(parts[0])) return [path.resolve(skillsRoot, target)];
    if (skills.has(parts[0])) return [path.resolve(skills.get(parts[0]), ...parts.slice(1))];
    if (['wiki', 'raw'].includes(parts[0])) return [path.resolve('/root/raphael-brain', target)];
    if (parts[0] === 'ops') return [path.resolve('/root/raphael-command-center', target)];
    return [path.resolve(path.dirname(source), target)];
  }
  function check(entry, source, owner) {
    let target = entry.target;
    if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) return;
    const excluded = (reason) => result.excluded.push({ source, target, reason });
    if (entry.kind === 'inline' && entry.provenance && !path.isAbsolute(target)) { excluded('provenance'); return; }
    if (/[<>{}*$]|…/.test(target)) { excluded('runtime-template'); return; }
    if (entry.kind === 'inline' && !LOCAL_PREFIXES.has(target.split('/')[0]) && PROJECT_NAMES.has(path.basename(target))) { excluded('runtime-artifact'); return; }
    if (entry.kind === 'inline' && !entry.provenance && (target.startsWith('/tmp/') || target.startsWith('/root/eingang/ausgang/')) && !within(skillsRoot, target) && !within(targetRoot, target)) { excluded('runtime-artifact'); return; }
    if (entry.kind === 'inline' && target.startsWith('/') && !/^\/(?:root|home|tmp|usr|etc|opt|var)\//.test(target)) { excluded('url-or-runtime-path'); return; }
    target = decodeURIComponent(target.replace(/[?#].*$/, ''));
    if (!target) return;
    const key = JSON.stringify([source, owner, target, entry.kind === 'dependency' ? 'dependency' : 'path']);
    if (checked.has(key)) return checked.get(key);
    checked.set(key, null);
    result.checked++;
    const attempted = candidates(target, source, owner, entry.kind);
    const resolved = attempted.find((file) => fs.existsSync(file));
    if (!resolved) { result.missing.push({ source, line: entry.line, target, kind: entry.kind, attempted }); return; }
    const actual = fs.realpathSync(resolved);
    checked.set(key, actual);
    if (entry.kind === 'dependency') { excluded('dependency-entry'); return actual; }
    const targetOwner = ownerOf(actual, owner);
    const reason = terminalReason(actual, targetOwner);
    if (reason) { excluded(reason); return actual; }
    if (!within(skillsRoot, actual) && !within(targetRoot, actual)) { excluded('external-resource'); return actual; }
    if (entry.provenance) { excluded('provenance-source'); return actual; }
    if (path.extname(actual) === '.md' && fs.statSync(actual).isFile()) queue.push({ file: actual, owner: targetOwner });
    return actual;
  }
  while (queue.length) {
    const { file, owner } = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    result.documents.push(file);
    const raw = fs.readFileSync(file, 'utf8');
    let fm;
    try { fm = frontmatter(raw); }
    catch (error) { result.errors.push({ source: file, message: error.message }); continue; }
    if (path.basename(file) === 'SKILL.md') {
      try {
        for (const [legacy, portable, kind] of [
          ['loads', 'raphael-loads', 'load'],
          ['requires_skills', 'raphael-requires-skills', 'dependency'],
          ['completion_criteria', 'raphael-completion-criteria', 'criterion'],
        ]) {
          const declared = listField(fm.fields, legacy, portable);
          for (const item of declared.values) {
            const targets = kind === 'criterion' ? inlineTargets(item, skills) : [kind === 'dependency' ? item.split('@')[0] : item];
            for (const target of targets) check({ target, line: declared.line, kind }, file, owner);
          }
        }
      } catch (error) { result.errors.push({ source: file, message: error.message }); }
    }
    let paragraph = null, paragraphOwner = owner;
    for (const entry of links(fm.body, fm.offset, skills)) {
      if (entry.paragraph !== paragraph) { paragraph = entry.paragraph; paragraphOwner = owner; }
      const resolved = check(entry, file, paragraphOwner);
      if (resolved && path.basename(resolved) === 'SKILL.md') paragraphOwner = path.dirname(resolved);
    }
  }
  result.status = result.missing.length || result.errors.length ? 'FAIL' : result.checked > 0 ? 'PASS' : 'NOT_CHECKED';
  output(result.status === 'PASS' ? 0 : result.status === 'FAIL' ? 1 : 2);
} catch (error) {
  result.status = 'BLOCKED';
  result.errors.push({ message: error.message });
  output(2);
}
