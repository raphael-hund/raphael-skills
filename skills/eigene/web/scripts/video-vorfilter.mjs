#!/usr/bin/env node
// Mechanischer Vorfilter: harte Marker im Transkript, kein LLM und kein Geschmacksurteil.
import fs from 'node:fs';

const HELP = `Usage:
  node video-vorfilter.mjs --file <transkript.txt> [--json]
  cat transkript.txt | node video-vorfilter.mjs [--json]

Ausgabe: marker, score und empfehlung. Marker sind deterministische Regex-Treffer;
score ist die Zahl verschiedener Marker-Klassen.`;
const args = process.argv.slice(2);
if (args.includes('--help')) { console.log(HELP); process.exit(0); }
const known = new Set(['--file', '--json', '--help']);
for (const arg of args) if (arg.startsWith('--') && !known.has(arg)) { console.error(`video-vorfilter: unbekanntes Flag ${arg}\n\n${HELP}`); process.exit(2); }
const fileIndex = args.indexOf('--file');
if (fileIndex >= 0 && (!args[fileIndex + 1] || args[fileIndex + 1].startsWith('--'))) { console.error('video-vorfilter: --file braucht einen Pfad'); process.exit(2); }
let text = '';
try {
  text = fileIndex >= 0 ? fs.readFileSync(args[fileIndex + 1], 'utf8') : fs.readFileSync(0, 'utf8');
} catch (error) { console.error(`video-vorfilter: ${error.message}`); process.exit(2); }
if (!text.trim()) { console.error('video-vorfilter: leeres Transkript'); process.exit(2); }

const rules = [
  ['slash-command', /(?:^|\s)\/[a-z][a-z0-9_-]{1,30}\b/im],
  ['dateiname', /(?:^|[\s`"'(])(?:[\w.-]+\/)*[\w.-]+\.(?:md|mjs|js|jsx|ts|tsx|json|ya?ml|css|html|py|sh)\b/im],
  ['npm-befehl', /\b(?:npm|pnpm|yarn|bun)\s+(?:run\s+)?[a-z][\w:-]*/im],
  ['prompt-zitat', /\bprompt\s*:\s*["“][^"”\n]{8,}["”]/im],
  ['repo-url', /https?:\/\/(?:www\.)?(?:github\.com|gitlab\.com|bitbucket\.org)\/[^\s/]+\/[^\s)>.,]+/im],
];
const marker = [];
for (const [name, regex] of rules) {
  const match = text.match(regex);
  if (match) marker.push({ typ: name, fund: match[0].trim().slice(0, 180) });
}
const result = { marker, score: marker.length, empfehlung: marker.length ? 'vollauswertung' : 'nur-ledger' };
if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`score: ${result.score}`);
  console.log(`empfehlung: ${result.empfehlung}`);
  console.log('marker:');
  if (!marker.length) console.log('- keine');
  for (const item of marker) console.log(`- ${item.typ}: ${item.fund}`);
}
