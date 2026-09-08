// Re-run public integrations with provider credentials removed from the child environment.
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { inspectImage } from '../scripts/find-images.mjs';
const root = path.dirname(fileURLToPath(import.meta.url));
const script = path.resolve(root, '../scripts/find-images.mjs');
const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/SERP|GOOGLE|BING|UNSPLASH|PEXELS|BRANDFETCH|LOGODEV|LOGO_DEV/i.test(name)));
const cases = [
  ['logo-google', ['logo', 'google', '--max', '1']],
  ['logo-stripe', ['logo', 'stripe', '--max', '1']],
  ['icon-phone', ['icon', 'phone', '--max', '3']],
  ['photo-dachdecker', ['photo', 'dachdecker bei der arbeit', '--max', '3']],
  ['svgl-google', ['logo', 'google', '--provider', 'svgl', '--max', '2']],
  ['wikimedia-google', ['logo', 'google', '--provider', 'wikimedia', '--max', '2']],
  ['search-zurich-final', ['search', 'Zürich Altstadt Limmat', '--max', '2']],
];
const records = [];
for (const [name, args] of cases) {
  const directory = path.join(root, name); await fs.mkdir(directory, { recursive: true });
  const command = [script, ...args, '--download', directory];
  const tested_at = new Date().toISOString();
  const { exit_code, stdout, stderr } = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, command, { env }); let stdout = '', stderr = '';
    const timeout = setTimeout(() => child.kill('SIGTERM'), 180000);
    child.stdout.on('data', chunk => { stdout += chunk; }); child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject); child.on('close', exit_code => { clearTimeout(timeout); resolve({ exit_code, stdout, stderr }); });
  });
  await fs.writeFile(path.join(directory, 'results.json'), stdout); await fs.writeFile(path.join(directory, 'stderr.txt'), stderr);
  const record = { name, command: [process.execPath, ...command], tested_at, keys_removed: true, exit_code };
  try {
    assert.equal(exit_code, 0); const results = JSON.parse(stdout); assert.ok(results.length > 0);
    const manifest = JSON.parse(await fs.readFile(path.join(directory, 'manifest.json'), 'utf8'));
    for (const item of results) {
      const buffer = await fs.readFile(item.file); const info = inspectImage(buffer);
      assert.equal(createHash('sha256').update(buffer).digest('hex'), item.sha256);
      assert.equal(info.type, item.mime); assert.equal(info.width, item.width); assert.equal(info.height, item.height);
      assert.ok(item.source && item.page && item.fetched_at && item.license_hint);
      assert.ok(manifest.assets.some(a => a.sha256 === item.sha256 && a.source === item.source));
    }
    record.count = results.length; record.hashes_and_headers_valid = true;
  } catch (error) { record.error = error.message; process.exitCode = 1; }
  records.push(record); console.log(JSON.stringify(record));
}
await fs.writeFile(path.join(root, 'live-runs-final.json'), JSON.stringify(records, null, 2) + '\n');
