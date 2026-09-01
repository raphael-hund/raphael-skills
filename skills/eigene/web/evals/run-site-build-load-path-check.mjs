#!/usr/bin/env node
/**
 * run-site-build-load-path-check.mjs — Site-Build laedt keine Einzel-Skills
 * und nutzt den gelieferten Lookup.
 *
 * Treibt die echten Skripte: resource-access.mjs show / check und
 * shot-sweep.mjs ohne --base. Kein Mock der Lookup-Funktion.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HIER, '..');
const SKILL = path.join(WEB, 'SKILL.md');
const WEBSITE_PLAN = path.join(WEB, '..', 'website-plan', 'SKILL.md');
const HANDOFF = path.join(WEB, 'references', 'loop2-ablauf.md');
const QA = path.join(WEB, 'references', 'qa-faecher.md');
const ACCESS = path.join(WEB, 'scripts', 'resource-access.mjs');
const SWEEP = path.join(WEB, 'scripts', 'shot-sweep.mjs');
const DESIGN = path.join(WEB, '..', '..', 'design', 'SKILL.md');
const COPY = path.join(WEB, '..', 'copywriting', 'SKILL.md');
const LOOP = path.join(WEB, 'references', 'screenshot-kritik-loop.md');
const GROK_IMP = '/root/.grok/skills/impeccable/SKILL.md';
const GROK_UIUX = '/root/.grok/skills/ui-ux-pro-max/SKILL.md';
const CLAUDE_IMP = '/root/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/SKILL.md';
const CLAUDE_DESIGN_PLUGIN = '/root/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.13.0/.claude/skills/design/SKILL.md';
const GROK_PLUGIN_IMP = '/root/.grok/installed-plugins/impeccable-plugin-54fcaebb/plugin/skills/impeccable/SKILL.md';
const GROK_CFG = '/root/.grok/config.toml';

let fehler = 0;
let geprueft = 0;
const zeile = (ok, text, detail) => {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (detail) console.log(`         ${detail}`);
};

const skill = fs.readFileSync(SKILL, 'utf8');
const websitePlan = fs.readFileSync(WEBSITE_PLAN, 'utf8');
const handoff = fs.readFileSync(HANDOFF, 'utf8');
const u2Handoff = [websitePlan, skill, handoff].join('\n');
const qa = fs.readFileSync(QA, 'utf8');
const design = fs.readFileSync(DESIGN, 'utf8');

console.log('\nSite-Build Load-Path — Einzel-Skills nicht Pflicht, Lookup echt\n');

zeile(
  /keine Pflicht-Loads/.test(skill)
    && /routen auf `design` bzw\.\s*`copywriting`/.test(skill),
  'web SKILL.md: design + copywriting, Einzel-Skills keine Pflicht-Loads',
);
zeile(
  !/Mitgeladene Skills \(keine Dateien\): `design`, `impeccable`, `taste`, `ui-ux`/.test(skill),
  'web SKILL.md listet taste/impeccable/ui-ux nicht mehr als Mitgeladen',
);
zeile(
  /plan-manifest\.json/.test(websitePlan)
    && /plan-verification\.json/.test(websitePlan)
    && /manifest_sha256/.test(websitePlan)
    && /aktuelle Plan-Hashes/.test(websitePlan),
  'website-plan SKILL.md bindet v3-Manifest, Receipt und aktuelle Plan-Hashes',
);
zeile(
  /`web` ist der einzige Agency-Website-Workflow-Owner/.test(skill)
    && /`visual-aaa` ist das \*\*terminale\*\*[\s\S]*kein zweiter Workflow-Owner/.test(skill)
    && /keine Capture-Pflicht/.test(skill)
    && /keine Capture-Pflicht/.test(websitePlan)
    && /Kein Production-Code/.test(websitePlan),
  'U1 bleibt erhalten: web ist Owner, visual-aaa terminales Gate, website-plan plan-only',
);
zeile(
  !/sequential-page-controller/.test(u2Handoff)
    && !/Child-Agenten|keine Agent-|keine versteckten Agenten/i.test(u2Handoff)
    && /Legacy-only-Pläne[\s\S]*bestehen nicht mehr/.test(websitePlan),
  'U2-Handoff enthaelt keinen toten Controller, No-Agent-Vertrag oder aktiven Legacy-Pfad',
);
zeile(
  /Receipt, Manifest-Hash und\s+aktuelle Plan-Hashes/.test(skill)
    && /Receipt, Manifest-Hash und\s+aktuelle Plan-Hashes/.test(handoff)
    && /Route-Abhängigkeiten, Write-Sets und Shared Owners/.test(skill)
    && /Abhängigkeiten oder überlappende Pfade erzwingen Reihenfolge/.test(handoff)
    && /disjunkte\nPakete dürfen parallel laufen/.test(handoff),
  'web-Handoff prueft Receipt und aktuelle Hashes vor adaptiver Paketbildung',
);
zeile(
  /requires_skills:\s*\[\]/.test(design) && /Site-Build kommt über/.test(design),
  'design SKILL.md: kein impeccable-Require, Site-Build über web',
);
zeile(
  /AI-Slop-Sequenz/.test(qa) && /design ZUERST/.test(qa) && /copywriting G1→G2/.test(qa),
  'qa-faecher.md: eine Slop-Sequenz (design zuerst, dann copywriting G1→G2)',
);
zeile(
  /rules\.de\.mjs/.test(qa),
  'qa-faecher.md haengt DE-Regeln an scan-ai-slop',
);
zeile(
  /G1 anti-slop/.test(qa) && /npx oxlint/.test(qa) && /install-anti-slop/.test(qa),
  'qa-faecher.md Fach 4 verlangt oxlint anti-slop bei Custom-TS/JS',
);
const codeQ = fs.readFileSync(path.join(WEB, 'references', 'code-qualitaets-checkliste.md'), 'utf8');
zeile(
  /Oxlint anti-slop/.test(codeQ) && /install-anti-slop/.test(codeQ) && /dmmulroy\/anti-slop/.test(codeQ),
  'code-qualitaets-checkliste.md nennt Oxlint anti-slop und Install-Befehl',
);

const copy = fs.readFileSync(COPY, 'utf8');
const reqZeile = (copy.match(/^requires_skills:.*$/m) || [''])[0];
zeile(
  /eval@\^0/.test(reqZeile) && !/no-ai-slop/.test(reqZeile),
  'copywriting requires nur eval, nicht no-ai-slop',
);

const loop = fs.readFileSync(LOOP, 'utf8');
const bIstKimi = /Visuelle Kritik B \| `kimi-recherche`/.test(loop);
const bIstOpus = /Visuelle Kritik B \| `opus-critic`/.test(loop);
const webPaar = /Grok \+ `kimi-recherche` nach Opus-Bau/.test(skill)
  && /Kritiker = Grok \+ `kimi-recherche`/.test(skill);
zeile(
  bIstKimi && !bIstOpus && webPaar,
  'Kritik-Paarung einheitlich: A=Grok, B=kimi-recherche (kein opus-critic als B)',
);

function grokRouter(pfad, verboten) {
  const txt = fs.readFileSync(pfad, 'utf8');
  const kurz = txt.split(/\n/).length <= 30;
  const doktrin = verboten.some((m) => txt.includes(m));
  return { kurz, doktrin, txt };
}
const imp = grokRouter(GROK_IMP, ['award-winning design director', 'Core principles:']);
zeile(
  imp.kurz && !imp.doktrin && /design\/scripts\/detect\.mjs/.test(imp.txt),
  'Grok-Host impeccable ist kurzer Router auf design detect',
);
const uiux = grokRouter(GROK_UIUX, ['Searchable database of UI/UX', 'Rule Categories by Priority']);
zeile(
  uiux.kurz && !uiux.doktrin && /ui-ux-db-nutzung\.md/.test(uiux.txt),
  'Grok-Host ui-ux-pro-max ist kurzer Router auf ui-ux-db-nutzung',
);

const ccImp = grokRouter(CLAUDE_IMP, ['award-winning design director', 'Core principles:']);
zeile(
  ccImp.kurz && !ccImp.doktrin && /design\/scripts\/detect\.mjs/.test(ccImp.txt),
  'Claude Plugin-Cache impeccable ist kurzer Router auf design detect',
);
const ccDes = grokRouter(CLAUDE_DESIGN_PLUGIN, ['Gemini AI', 'corporate identity program', 'GEMINI_API_KEY']);
zeile(
  ccDes.kurz && !ccDes.doktrin && /raphael-skills\/skills\/design/.test(ccDes.txt),
  'Claude Plugin-Cache design ist Router auf kanonisches design',
);
const grokPlug = grokRouter(GROK_PLUGIN_IMP, ['award-winning design director', 'Core principles:']);
zeile(
  grokPlug.kurz && !grokPlug.doktrin && /design\/scripts\/detect\.mjs/.test(grokPlug.txt),
  'Grok-Plugin-Kopie impeccable ist kurzer Router',
);
const grokCfg = fs.readFileSync(GROK_CFG, 'utf8');
const plugBlock = grokCfg.match(/\[plugins\]\s*enabled\s*=\s*\[([\s\S]*?)\]/);
const plugListe = plugBlock ? plugBlock[1] : '';
zeile(
  Boolean(plugBlock) && !/"impeccable"/.test(plugListe),
  'Grok config.toml laedt Plugin impeccable nicht',
);

function show(name) {
  return spawnSync('node', [ACCESS, 'show', name], { encoding: 'utf8', timeout: 15000 });
}

for (const [name, marker] of [
  ['React Bits', 'reactbits.dev'],
  ['GSAP', 'gsap.com'],
  ['Lucide', 'lucide.dev'],
]) {
  const r = show(name);
  const aus = `${r.stdout || ''}${r.stderr || ''}`;
  zeile(
    r.status === 0 && aus.includes(name) && /https:\/\//.test(aus) && aus.includes(marker),
    `resource-access show "${name}" liefert URL/Metadaten`,
    r.status === 0 ? null : (r.stderr || aus).split('\n')[0],
  );
}

{
  const r = show('DieseBibliothekGibtEsNicht');
  const aus = `${r.stderr || ''}${r.stdout || ''}`;
  zeile(
    r.status === 1 && /Resource not found/.test(aus),
    'resource-access show Unbekannt = ehrlicher Fail (Exit 1)',
  );
}

zeile(
  /resource-access\.mjs open/.test(skill) && /URL-Dump allein zählt nicht/.test(skill),
  'web SKILL.md: open nach Router-Wahl Pflicht, URL-Dump zählt nicht',
);

{
  const r = spawnSync('node', [SWEEP], { encoding: 'utf8', timeout: 15000 });
  const aus = `${r.stderr || ''}${r.stdout || ''}`;
  zeile(
    r.status === 2 && /--base/.test(aus),
    'shot-sweep ohne --base = Exit 2 Usage',
  );
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
if (fehler) process.exit(1);
console.log('Load-Path und Lookups stimmen.');
