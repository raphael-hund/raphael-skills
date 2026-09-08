#!/usr/bin/env node
/** Check declared skill paths and the real resource/CLI contracts without model calls. */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.resolve(WEB, '../../..');
const SOURCES = [
  path.join(WEB, 'SKILL.md'),
  path.join(ROOT, 'skills/design/SKILL.md'),
  path.join(ROOT, 'skills/eigene/copywriting/SKILL.md'),
  path.join(ROOT, 'skills/eigene/website-plan/SKILL.md'),
  path.join(ROOT, 'skills/eigene/visual-aaa/SKILL.md'),
];
const ACCESS = path.join(WEB, 'scripts/resource-access.mjs');
const SWEEP = path.join(WEB, 'scripts/shot-sweep.mjs');
let errors = 0;
let checked = 0;
function check(ok, message, detail = '') {
  checked++;
  if (!ok) errors++;
  console.log(`  [${ok ? 'OK' : '!!'}] ${message}${detail ? `: ${detail}` : ''}`);
}

// Use the registry's frontmatter parser for conventional and portable metadata.
const parse = spawnSync('python3', ['-B', '-c', `
import importlib.util, json, sys
from pathlib import Path
spec = importlib.util.spec_from_file_location('registry', sys.argv[1])
gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gen)
result = []
for filename in sys.argv[2:]:
    source = Path(filename)
    fm = gen.parse_frontmatter(source.read_text())
    fields = {}
    for target, keys in [('loads', ['loads', 'raphael-loads']), ('requires', ['requires_skills', 'requires-skills', 'raphael-requires-skills'])]:
        values = []
        for key in keys:
            values.extend(gen.parse_list_value(fm['top'].get(key, ''), fm['top_blocks'].get(key, [])))
            raw = fm['nested'].get('metadata', {}).get(key)
            if raw:
                values.extend(gen.parse_list_value(gen.scalar_value(raw), []))
        fields[target] = list(dict.fromkeys(values))
    result.append(dict(name=gen.scalar_value(fm['top'].get('name', '')), source=str(source.resolve()), **fields))
print(json.dumps(result))
`, path.join(ROOT, 'tools/build-skill-registry.py'), ...SOURCES], { encoding: 'utf8', timeout: 15000 });
check(parse.status === 0, 'existing frontmatter parser reads all five active entrypoints', parse.error?.message || parse.stderr?.trim());
let entries = [];
if (parse.status === 0) {
  try { entries = JSON.parse(parse.stdout); }
  catch (error) { check(false, 'frontmatter output is valid JSON', error.message); }
}
check(entries.length === SOURCES.length, 'all declared entrypoints were inspected');
const byName = new Map(entries.map((entry) => [entry.name, entry]));
const absorbed = ['taste', 'ui-ux', 'ui-ux-pro-max', 'impeccable', 'emil-design-eng', 'apple-design'];
const web = byName.get('web');
const design = byName.get('design');
const copy = byName.get('copywriting');
check(web && ['design', 'copywriting', 'website-plan', 'visual-aaa'].every((name) => web.requires.includes(name)), 'Web exposes the available specialist skills');
check(web && ![...absorbed, 'web-anti-slop'].some((name) => web.requires.includes(name)), 'Web has no absorbed-source or duplicate anti-slop dependency');
check(design && !absorbed.some((name) => design.requires.includes(name)), 'Design does not require its absorbed sources again');
check(copy && !copy.requires.includes('no-ai-slop'), 'Copy has no duplicate no-ai-slop dependency');

for (const entry of entries) {
  check(Boolean(entry.name) && fs.realpathSync(entry.source) === entry.source, `${entry.name}: canonical source resolves`);
  for (const load of entry.loads) {
    const target = path.resolve(path.dirname(entry.source), load);
    check(fs.existsSync(target) && fs.statSync(target).isFile(), `${entry.name}: declared load exists`, load);
  }
  for (const name of entry.requires) {
    const target = path.join('/root/.claude/skills', name, 'SKILL.md');
    check(fs.existsSync(target) && fs.statSync(target).isFile(), `${entry.name}: specialist source resolves`, name);
  }
}
for (const host of ['codex', 'kimi']) {
  const bridge = path.join(ROOT, host, 'skills/web/SKILL.md');
  const body = fs.existsSync(bridge) ? fs.readFileSync(bridge, 'utf8') : '';
  const adapterTarget = body.match(/Read the complete canonical source file before acting:\s*`([^`]+)`/)?.[1];
  const resolved = adapterTarget && path.isAbsolute(adapterTarget) && fs.existsSync(adapterTarget)
    ? fs.realpathSync(adapterTarget)
    : (fs.existsSync(bridge) ? fs.realpathSync(bridge) : null);
  check(resolved === fs.realpathSync(SOURCES[0]), `${host}: Web bridge resolves the canonical source (link or source adapter)`);
}

function show(name) {
  return spawnSync('node', [ACCESS, 'show', name], { encoding: 'utf8', timeout: 15000 });
}
for (const [name, marker] of [['React Bits', 'reactbits.dev'], ['GSAP', 'gsap.com'], ['Lucide', 'lucide.dev']]) {
  const result = show(name);
  const output = `${result.stdout || ''}${result.stderr || ''}`;
  check(result.status === 0 && output.includes(name) && output.includes(marker) && /https:\/\//.test(output),
    `resource-access show ${name}: real URL and metadata`, result.error?.message || (result.status ? result.stderr?.split('\n')[0] : ''));
}
const unknown = show('DieseBibliothekGibtEsNicht');
check(unknown.status === 1 && /Resource not found/.test(`${unknown.stderr || ''}${unknown.stdout || ''}`),
  'unknown resource returns an honest failure (exit 1)', unknown.error?.message);
const sweep = spawnSync('node', [SWEEP], { encoding: 'utf8', timeout: 15000 });
check(sweep.status === 2 && /--base/.test(`${sweep.stderr || ''}${sweep.stdout || ''}`),
  'shot-sweep without --base returns usage (exit 2)', sweep.error?.message);

console.log(`\n${checked - errors}/${checked} checks passed.`);
if (!checked || errors) process.exit(1);
console.log('Declared load paths and real resource/CLI contracts verified; provider and visual quality not tested.');
