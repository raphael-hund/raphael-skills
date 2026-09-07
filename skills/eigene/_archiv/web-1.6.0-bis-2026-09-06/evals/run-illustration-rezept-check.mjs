#!/usr/bin/env node
/**
 * run-illustration-rezept-check.mjs — neuer-Illustration-Teil + CLI-Env.
 *
 * Prueft den gelieferten Skill-Text und die gelieferte CLI-Env-Datei.
 * Kein nachgebautes Rezept im Test: Dateien werden gelesen, Pflichtbegriffe
 * und Env-Keys muessen in den echten Dateien stehen.
 *
 *   node evals/run-illustration-rezept-check.mjs
 *
 * Exit 0 = Abschnitt + Env-Quelle vollstaendig. Exit 1 = Luecke.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const DOK = path.join(HIER, '..', 'references', 'bildgenerierung.md');
const SKILL = path.join(HIER, '..', 'SKILL.md');
const ENV = '/usr/local/bin/higgsfield-env';
const WRAP = '/usr/local/bin/higgsfield';

let fehler = 0;
let geprueft = 0;
function zeile(ok, text, detail) {
  geprueft++;
  if (!ok) fehler++;
  console.log(`  [${ok ? 'OK' : '!!'}]   ${text}`);
  if (!ok && detail) console.log(`         ${detail}`);
}

console.log('\nIllustration-Rezept + Higgsfield-Env\n');

if (!fs.existsSync(DOK)) {
  console.error(`FEHLER: ${DOK} fehlt`);
  process.exit(2);
}
const text = fs.readFileSync(DOK, 'utf8');
const skill = fs.existsSync(SKILL) ? fs.readFileSync(SKILL, 'utf8') : '';

const start = text.indexOf('## Neue Illustration vs. wiederverwenden');
const ende = text.indexOf('## Der Entscheidungsbaum');
zeile(start >= 0, 'Eigener Abschnitt „Neue Illustration vs. wiederverwenden“');
zeile(ende > start, 'Abschnitt steht vor dem Modell-Entscheidungsbaum');
const teil = start >= 0 && ende > start ? text.slice(start, ende) : '';

for (const wort of [
  'Wiederverwenden',
  'Neue Illustration',
  'Inhaltkontext',
  'Stilkontext',
  'Referenz',
  'Dresden',
  'Map',
  'Screenshot',
  'gpt_image_2',
  '--image',
  'Abnahme',
  'Einbau',
  'Ausfaden',
]) {
  zeile(teil.includes(wort), `Abschnitt nennt „${wort}“`);
}

zeile(
  /Referenzen vorhanden[\s\S]*GPT Image 2/.test(text),
  'Bestehende Doktrin: Referenz → GPT Image 2 bleibt stehen',
);
zeile(
  !/Recraft.*Illustration/.test(teil) || /Recraft für Illustration/.test(teil),
  'Abschnitt verbietet Recraft für Illustration',
);
zeile(
  skill.includes('Neue Illustration vs. wiederverwenden'),
  'SKILL.md routet auf den neuen Abschnitt',
);

zeile(fs.existsSync(ENV), `Env-Quelle existiert: ${ENV}`);
zeile(fs.existsSync(WRAP), `Wrapper existiert: ${WRAP}`);
if (fs.existsSync(ENV)) {
  const env = fs.readFileSync(ENV, 'utf8');
  zeile(env.includes('HIGGSFIELD_CONFIG_PATH'), 'Env setzt HIGGSFIELD_CONFIG_PATH');
  zeile(env.includes('HIGGSFIELD_CREDENTIALS_PATH'), 'Env setzt HIGGSFIELD_CREDENTIALS_PATH');
  zeile(env.includes('HIGGSFIELD_WORKSPACE_ID'), 'Env setzt HIGGSFIELD_WORKSPACE_ID');
  zeile(
    !/access_token|refresh_token|sk-|hf_[A-Za-z0-9]{10,}/.test(env),
    'Env-Datei enthält keine Token-Werte',
  );
  zeile(
    env.includes('/root/.config/higgsfield/config.json'),
    'Config-Pfad zeigt auf die gemeinsame Dauer-Datei',
  );
}
if (fs.existsSync(WRAP)) {
  const wrap = fs.readFileSync(WRAP, 'utf8');
  zeile(wrap.includes('higgsfield-env'), 'Wrapper lädt die gemeinsame Env-Datei');
  zeile(
    wrap.includes('@higgsfield/cli/bin/higgsfield.js'),
    'Wrapper startet die echte CLI, nicht einen Stub',
  );
}

console.log(`\n${geprueft - fehler}/${geprueft} wie erwartet.`);
process.exit(fehler ? 1 : 0);
