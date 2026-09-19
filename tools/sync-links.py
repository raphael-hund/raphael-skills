#!/usr/bin/env python3
"""Check or refresh shared skill links. Never overwrite real directories."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--apply', action='store_true')
args = parser.parse_args()
manifest_path = ROOT / 'manifest.json'
manifest = json.loads(manifest_path.read_text())
local, plugins = {}, {}
for base in [ROOT / 'skills/eigene', ROOT / 'skills/imported']:
    for entry in sorted(base.glob('*/SKILL.md')):
        name = entry.parent.name
        if name in local:
            raise SystemExit(f'Duplicate local skill: {name}')
        local[name] = str(entry.parent)
local['design'] = str(ROOT / 'skills/design')
for repo in sorted((ROOT / 'plugins').iterdir()):
    for entry in sorted((repo / 'skills').glob('*/SKILL.md')):
        name = entry.parent.name
        if name in local or name in plugins:
            raise SystemExit(f'Skill name collision: {name}')
        plugins[name] = str(entry.parent)
all_skills = {**local, **plugins}
expected = {ROOT / 'catalog' / name: Path(target) for name, target in all_skills.items()}
for host in ['.codex', '.claude', '.agents']:
    expected.update({Path('/root') / host / 'skills' / name: Path(target) for name, target in local.items()})
for host in ['.kimi', '.cursor']:
    expected[Path('/root') / host / 'skills'] = ROOT / 'catalog'

errors = []
for link, target in expected.items():
    if not target.exists():
        errors.append(f'Missing source: {target}')
        continue
    if link.is_symlink() and link.resolve() == target.resolve():
        continue
    if not args.apply:
        errors.append(f'Incorrect link: {link} -> {target}')
        continue
    if link.exists() and not link.is_symlink():
        errors.append(f'Refusing to overwrite real file/directory: {link}')
        continue
    link.parent.mkdir(parents=True, exist_ok=True)
    if link.is_symlink():
        link.unlink()
    link.symlink_to(target, target_is_directory=True)

# Report stale entries for review; do not delete user files automatically.
folders = [(ROOT / 'catalog', set(all_skills))]
folders += [(Path('/root') / h / 'skills', set(local)) for h in ['.codex', '.claude', '.agents']]
for folder, names in folders:
    if folder.exists():
        for entry in folder.iterdir():
            if not entry.name.startswith('.') and entry.name not in names:
                errors.append(f'Unmanaged discovery entry: {entry}')
for key, value in [('local', local), ('plugin_skills', plugins)]:
    if manifest.get(key) != value:
        if args.apply:
            manifest[key] = dict(sorted(value.items()))
        else:
            errors.append(f'Manifest out of date: {key}')
if args.apply and not errors:
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {len(local)} local + {len(plugins)} plugin skills; {len(expected)} links verified.')
