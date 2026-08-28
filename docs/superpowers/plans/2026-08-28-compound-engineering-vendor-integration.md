# Compound Engineering, pstack und agentcookie Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compound Engineering, pstack und agentcookie werden als reproduzierbare, namespaced Skill-Bestände in `raphael-skills` integriert und über Claude, Codex und Kimi ohne Namenskonflikte verfügbar gemacht.

**Architecture:** Ein dependency-freier Python-Importer erzeugt aus drei gepinnten Quellen namespaced Skill-Verzeichnisse, normalisiert nur das für den Raphael-Skill-Vertrag und die Laufzeitgrenzen erforderliche Frontmatter und schreibt eine Original-zu-Ziel-Manifestdatei. CE bleibt unter `ce-*`, pstack unter `pstack-*`, agentcookie bleibt als eindeutig benannter Ops-Skill getrennt. Bestehende Raphael-Skills und fremde Runtime-Dateien werden nicht ersetzt.

**Tech Stack:** Python 3 Standardbibliothek, Markdown/YAML-Subset aus `tools/validate-skill.py`, JSON-Registries, Git-Commit-Pinning, Go-CLI-Prüfung für agentcookie, Claude-/Codex-/Kimi-Sync-Skripte.

**Spec:** `docs/specs/2026-08-28-compound-engineering-vendor-integration-design.md`

## Global Constraints

- `skills/imported/compound-engineering/` enthält alle 33 CE-Skills unter `ce-*`.
- `skills/imported/pstack/` enthält alle 44 pstack-Skills unter `pstack-*`, einschließlich `pstack-poteto-mode`.
- `agentcookie` bleibt außerhalb beider Engineering-Pakete als eigener Ops-Skill.
- pstack `bdf7aa355337897f167153e05069aca505dae17c`, Compound Engineering `5985d821b9413f590184531d4c35e435d2356abb`, agentcookie `e498e93bcaac867386dfba12ea709882dff037ba`.
- SkillsDirectory ist Discovery-Material, nicht die Primärquelle und nicht ein zweiter vendorter Skill.
- Fable bleibt Controller-only; kein namespaced Skill darf Fable als Worker, Advisor oder Reviewer ausführbar routen.
- SessionStart-Hooks, Telemetrie, Marketplace-Auto-Updates und stille Netzaufrufe werden nicht aktiviert.
- Keine Cookie-Daten, Tokens, Schlüssel oder vorgebauten agentcookie-Binaries werden in Git geschrieben.
- Importfehler, Namenskonflikte, fehlende Quellen und nicht auflösbare lokale Links beenden den Lauf vor Registry- oder Runtime-Änderungen.
- Fremde uncommittete Änderungen im Arbeitsbaum bleiben unberührt; es werden nur konkret erzeugte Pfade gestaged.

---

## Datei- und Verantwortlichkeitskarte

- `tools/vendor-skill-packs.py` besitzt Quellauflösung, Namespace-Mapping, Frontmatter-Normalisierung, Link-Rewrite, Manifest-Erzeugung und Registry-Aktualisierung.
- `tools/test-vendor-skill-packs.py` prüft den Importer in isolierten Temp-Fixtures und testet Kollisionen, Pfadgrenzen und Namespace-Invarianten.
- `skills/imported/compound-engineering/` enthält ausschließlich den CE-Skill-Payload, `VENDORING.md` und `source-manifest.json`.
- `skills/imported/pstack/` enthält ausschließlich den pstack-Skill-Payload, Playbooks, Prinzipien, `VENDORING.md` und `source-manifest.json`.
- `skills/ops/agentcookie/` enthält den Ops-Skill, die CLI-/Policy-Referenz, `VENDORING.md` und `source-manifest.json`.
- `codex/compatibility.json`, `claude/compatibility.json` und `kimi/compatibility.json` erhalten dieselbe namespaced Inventar-Erweiterung.
- `index.json` bleibt ein generiertes Ergebnis von `tools/build-index.py`.
- `tools/test-agentcookie-skill.py` prüft die statischen Cookie- und Secrets-Grenzen.
- `ops/review-inbox.md` erhält den für Skill-Mutationen erforderlichen Review-Eintrag.

---

### Task 1: Deterministischen Vendor-Importer bauen

**Files:**
- Create: `tools/vendor-skill-packs.py`
- Create: `tools/test-vendor-skill-packs.py`

**Interfaces:**
- `PackSpec(source_label: str, source_root: Path, target_root: Path, prefix: str, expected_count: int)` beschreibt eine Quelle.
- `build_name_map(skill_names: list[str], prefix: str) -> dict[str, str]` liefert jedes Original auf seinen namespaced Namen.
- `normalize_skill(source: Path, target: Path, target_name: str, source_label: str, overlay: dict[str, str]) -> None` schreibt eine einzelne portable `SKILL.md` mit dem Raphael-Vertrag.
- `rewrite_references(text: str, name_map: dict[str, str]) -> str` ersetzt interne Skill-Aufrufe, Links und Agent-IDs ohne externe Pfadkomponenten zu erzeugen.
- `import_pack(spec: PackSpec, source_commit: str) -> dict` erzeugt Zielbaum und `source-manifest.json` atomar in einem Staging-Verzeichnis.
- `update_registries(index_entries: list[dict], namespaced_entries: list[dict]) -> None` ergänzt Codex, Claude und Kimi nur um neue eindeutige Namen.
- `main(argv: list[str]) -> int` unterstützt `--check`, `--import`, `--source`, `--commit` und `--dry-run`; ohne exakten Commit endet der Lauf mit Exit-Code 2.

- [ ] **Step 1: Write the failing test**

```python
# tools/test-vendor-skill-packs.py
import tempfile
import unittest
from pathlib import Path

from vendor_skill_packs import build_name_map, rewrite_references


class NamespaceTests(unittest.TestCase):
    def test_maps_generic_names_to_pack_namespace(self):
        self.assertEqual(
            build_name_map(["lfg", "ce-plan"], "ce-"),
            {"lfg": "ce-lfg", "ce-plan": "ce-ce-plan"},
        )
        self.assertEqual(
            build_name_map(["poteto-mode", "tdd"], "pstack-"),
            {"poteto-mode": "pstack-poteto-mode", "tdd": "pstack-tdd"},
        )

    def test_rewrite_never_leaves_unprefixed_internal_commands(self):
        text = "Use /poteto-mode, /tdd and subagent_type: poteto-agent."
        rewritten = rewrite_references(
            text,
            {"poteto-mode": "pstack-poteto-mode", "tdd": "pstack-tdd", "poteto-agent": "pstack-poteto-agent"},
        )
        self.assertIn("/pstack-poteto-mode", rewritten)
        self.assertIn("/pstack-tdd", rewritten)
        self.assertIn("pstack-poteto-agent", rewritten)
        self.assertNotIn("/poteto-mode", rewritten)
        self.assertNotIn("/tdd", rewritten)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: FAIL with `ModuleNotFoundError: No module named 'vendor_skill_packs'`.

- [ ] **Step 3: Write minimal implementation**

Create `tools/vendor_skill_packs.py` as the importable implementation module and keep `tools/vendor-skill-packs.py` as the CLI shim. The first implementation must provide these exact functions:

```python
# tools/vendor_skill_packs.py
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PackSpec:
    source_label: str
    source_root: Path
    target_root: Path
    prefix: str
    expected_count: int


def build_name_map(skill_names: list[str], prefix: str) -> dict[str, str]:
    return {name: name if name.startswith(prefix) else f"{prefix}{name}" for name in skill_names}


def rewrite_references(text: str, name_map: dict[str, str]) -> str:
    rewritten = text
    for source, target in sorted(name_map.items(), key=lambda item: len(item[0]), reverse=True):
        rewritten = rewritten.replace(f"/{source}", f"/{target}")
        rewritten = rewritten.replace(f"subagent_type: {source}", f"subagent_type: {target}")
        rewritten = rewritten.replace(f"skills/{source}/", f"skills/{target}/")
    return rewritten
```

The CLI must stage each generated package under `${TMPDIR:-/tmp}/raphael-skill-import-<uid>/`, reject symlinked source components, verify the source commit with `git -C <source> rev-parse HEAD`, and replace only the target package when every file and manifest check has passed.

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: PASS. Also run: `python3 tools/vendor-skill-packs.py --help`.

- [ ] **Step 5: Commit**

```bash
git add tools/vendor-skill-packs.py tools/vendor_skill_packs.py tools/test-vendor-skill-packs.py
git commit -m "feat(vendor): add deterministic namespaced pack importer"
```

---

### Task 2: Compound Engineering namespaced importieren

**Files:**
- Create: `skills/imported/compound-engineering/ce-*/SKILL.md`
- Create: `skills/imported/compound-engineering/ce-*/references/**`
- Create: `skills/imported/compound-engineering/VENDORING.md`
- Create: `skills/imported/compound-engineering/source-manifest.json`
- Modify: `tools/vendor-skill-packs.py`
- Test: `tools/test-vendor-skill-packs.py`

**Interfaces:**
- Consumes `PackSpec("compound-engineering", Path("/root/.cursor/plugins/local/compound-engineering"), Path("skills/imported/compound-engineering"), "ce-", 33)`.
- Produces 33 valid `SKILL.md` files whose `name` fields are unique and mit `ce-` beginnen.
- Produces a manifest with `source_commit`, `source_url`, `license`, `original_name`, `target_name`, `source_sha256` and `target_sha256` for every skill.

- [ ] **Step 1: Write the failing test**

Add a fixture-based test that creates `ce-brainstorm`, `ce-plan` and `lfg` source directories and asserts that the import result contains `ce-brainstorm`, `ce-plan` and `ce-lfg`, that a source `name: lfg` is normalized, and that the manifest records all three original names.

```python
def test_compound_import_namespaces_all_source_names(self):
    result = import_pack(self.compound_fixture, "5985d821b9413f590184531d4c35e435d2356abb")
    names = sorted(entry["target_name"] for entry in result["skills"])
    self.assertEqual(names, ["ce-brainstorm", "ce-lfg", "ce-plan"])
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: FAIL because `import_pack` does not yet create a namespaced CE manifest.

- [ ] **Step 3: Write minimal implementation**

Register the CE source in the CLI and preserve each skill's local `references/` tree. Normalize frontmatter to the seven Raphael fields and append `## Gotchas` only when the source has none. Keep the source body intact except for `ce-*` link and command rewrites. Use `class: M`, `scope: global`, `sensitivity: public` as defaults and preserve source description plus a namespaced trigger tail.

Write `VENDORING.md` with the exact source URL, commit, MIT license, count 33, omitted plugin tooling, and the reason `lfg` is renamed to `ce-lfg`. Do not copy `.git`, `node_modules`, CI files or the upstream marketplace checkout.

- [ ] **Step 4: Run tests to verify it passes**

Run: `python3 tools/vendor-skill-packs.py --import compound-engineering --source /root/.cursor/plugins/local/compound-engineering --commit 5985d821b9413f590184531d4c35e435d2356abb`

Expected: `imported compound-engineering: 33 skills`.

Run: `python3 tools/validate-skill.py skills/imported/compound-engineering`

Expected: every CE skill reports `[OK]` and no error is emitted.

- [ ] **Step 5: Commit**

```bash
git add skills/imported/compound-engineering tools/vendor-skill-packs.py tools/test-vendor-skill-packs.py
git commit -m "feat(compound-engineering): vendor namespaced skill pack"
```

---

### Task 3: pstack und Poteto namespaced importieren

**Files:**
- Create: `skills/imported/pstack/pstack-*/SKILL.md`
- Create: `skills/imported/pstack/pstack-poteto-mode/playbooks/**`
- Create: `skills/imported/pstack/pstack-*/references/**`
- Create: `skills/imported/pstack/VENDORING.md`
- Create: `skills/imported/pstack/source-manifest.json`
- Create: `agents/pstack-poteto-agent.md`
- Create: `agents/pstack-comment-sicko.md`
- Modify: `tools/vendor-skill-packs.py`
- Test: `tools/test-vendor-skill-packs.py`

**Interfaces:**
- Consumes `PackSpec("pstack", Path("/root/tools/vendor/coding-slop-cursor-plugins/pstack"), Path("skills/imported/pstack"), "pstack-", 44)`.
- Produces `pstack-poteto-mode`, all pstack principles, all pstack utility/playbook entry skills and two namespaced agent prompts.
- The generated pstack package may refer only to `pstack-*` commands and `pstack-*` agent IDs for its own components.

- [ ] **Step 1: Write the failing test**

Add tests for the generic-name mapping and the safety overlay:

```python
def test_pstack_import_renames_mode_and_agents(self):
    result = import_pack(self.pstack_fixture, "bdf7aa355337897f167153e05069aca505dae17c")
    self.assertIn("pstack-poteto-mode", result["target_names"])
    self.assertIn("pstack-tdd", result["target_names"])
    self.assertEqual(result["agent_names"], ["pstack-comment-sicko", "pstack-poteto-agent"])


def test_pstack_overlay_removes_fable_worker_route(self):
    text = self.read_generated("pstack-poteto-mode/SKILL.md")
    self.assertNotRegex(text, r"(?i)Fable[^\n]{0,80}(worker|advisor|reviewer)")
    self.assertNotIn("subagent_type: poteto-agent", text)
    self.assertIn("subagent_type: pstack-poteto-agent", text)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: FAIL because pstack agent names and the safety overlay are not generated.

- [ ] **Step 3: Write minimal implementation**

Import all 44 pstack skill directories and the `poteto-mode/playbooks/` tree. Rename `poteto-mode`, `tdd`, `how`, `why`, `reflect`, `swarm`, `unslop` and every other source name to its `pstack-*` form, including the generic `lfg`-style names if present. Rewrite Markdown links, slash commands, `subagent_type` values and relative playbook paths.

Apply only these runtime overlays:

- Replace executable Fable worker, advisor and reviewer routes with the existing runtime's controller and cross-family reviewer contract.
- Keep the `pstack-*` playbook and principle content, but do not enable a worker model that the Raphael contract forbids.
- Rewrite `setup-pstack` so it cannot overwrite unrelated rules and reports unsupported host-specific configuration rather than creating a conflicting global rule.
- Preserve dormant Benny automation as omitted non-skill material and document the omission in `VENDORING.md`.

Create the two agent prompt files with namespaced identities. The prompts must say they are leaf workers, must not spawn descendants and must follow the current runtime's model boundary. They remain discoverable assets and do not overwrite existing `poteto-agent` or `Comment Sicko` entries.

- [ ] **Step 4: Run tests to verify it passes**

Run: `python3 tools/vendor-skill-packs.py --import pstack --source /root/tools/vendor/coding-slop-cursor-plugins/pstack --commit bdf7aa355337897f167153e05069aca505dae17c`

Expected: `imported pstack: 44 skills` and two namespaced agent prompts.

Run: `python3 tools/validate-skill.py skills/imported/pstack`

Expected: every pstack skill reports `[OK]`.

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: PASS, including the Fable-route safety test.

- [ ] **Step 5: Commit**

```bash
git add skills/imported/pstack agents/pstack-poteto-agent.md agents/pstack-comment-sicko.md tools/vendor-skill-packs.py tools/test-vendor-skill-packs.py
git commit -m "feat(pstack): vendor namespaced engineering skills"
```

---

### Task 4: agentcookie als Ops-Skill integrieren

**Files:**
- Create: `skills/ops/agentcookie/SKILL.md`
- Create: `skills/ops/agentcookie/references/installation.md`
- Create: `skills/ops/agentcookie/VENDORING.md`
- Create: `skills/ops/agentcookie/source-manifest.json`
- Create: `tools/test-agentcookie-skill.py`
- Modify: `skills/ops/README.md`

**Interfaces:**
- `agentcookie` bleibt der einzige aktive Skillname für dieses Projekt, weil der Projektname bereits eindeutig ist.
- Der Skill dokumentiert `wizard install --as source|sink`, `pair`, `sink`, `doctor` und `status --json`.
- Die Referenz nennt die gepinnte Quelle und Build-Variante, schreibt aber keine Cookie-Werte, Tokens oder privaten Schlüssel.

- [ ] **Step 1: Write the failing test**

```python
# tools/test-agentcookie-skill.py
from pathlib import Path
import unittest

SKILL = Path("skills/ops/agentcookie/SKILL.md")


class AgentCookieSafetyTests(unittest.TestCase):
    def test_skill_has_safe_ops_contract(self):
        text = SKILL.read_text(encoding="utf-8")
        self.assertIn("agentcookie doctor", text)
        self.assertIn("status --json", text)
        self.assertIn("BLOCKED", text)
        self.assertNotIn("cookies-plain.db", text)
        self.assertNotRegex(text, r"(?i)(cookie|token|secret)\s*[:=]\s*[A-Za-z0-9_./+-]{16,}")


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 tools/test-agentcookie-skill.py`

Expected: FAIL because the Ops-Skill does not exist.

- [ ] **Step 3: Write minimal implementation**

Write `SKILL.md` with `name: agentcookie`, `version: 0.1.0`, `class: G`, `scope: agency`, `sensitivity: secret`, and completion criteria for CLI presence, policy validation and explicit `BLOCKED` handling. Use `references/installation.md` for platform-specific installation facts.

The skill must enforce these conditions:

- The default policy is allowlist or empty policy.
- CDP is loopback-only and Tailscale is the transport boundary.
- Google and DBSC sessions are not treated as portable.
- Missing CLI, missing pairing, missing CDP or missing Tailscale is `BLOCKED`.
- `status --json` output is checked only for status fields, never cookie values.
- No command writes cookie data into the repository.

Write `VENDORING.md` with `mvanhorn/agentcookie`, tag `v1.0.0`, commit `e498e93bcaac867386dfba12ea709882dff037ba`, MIT license, and the decision not to copy Go source or a binary into `raphael-skills`.

- [ ] **Step 4: Run tests to verify it passes**

Run: `python3 tools/test-agentcookie-skill.py`

Expected: PASS.

Run: `python3 tools/validate-skill.py skills/ops/agentcookie`

Expected: `[OK]`.

If `/root/tools/vendor/agentcookie` exists, run: `git -C /root/tools/vendor/agentcookie rev-parse HEAD` and `go test ./...` from that checkout. If the checkout or a live Mac pair is absent, record that state as `nicht geprüft`, not PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/ops/agentcookie skills/ops/README.md tools/test-agentcookie-skill.py
git commit -m "feat(agentcookie): add secure browser-session ops skill"
```

---

### Task 5: Index und Runtime-Registries erweitern

**Files:**
- Modify: `codex/compatibility.json`
- Modify: `claude/compatibility.json`
- Modify: `kimi/compatibility.json`
- Modify: `index.json`
- Modify: `tools/vendor-skill-packs.py`
- Test: `tools/test-vendor-skill-packs.py`

**Interfaces:**
- `codex/compatibility.json` enthält jeden neuen Skill mit `source`, `mode`, `rationale` und `triggers`.
- `claude/compatibility.json.expected_count == len(codex.skills)` bleibt wahr.
- `kimi/compatibility.json` bildet jeden Codex-Namen genau einmal auf dieselbe Source ab.
- `index.json` wird ausschließlich durch `python3 tools/build-index.py` erzeugt.

- [ ] **Step 1: Write the failing test**

```python
def test_registry_names_are_unique_and_namespaced(self):
    registries = self.load_registries()
    new_names = {
        name
        for name in registries["codex"]["skills"]
        if name.startswith(("ce-", "pstack-")) or name == "agentcookie"
    }
    self.assertEqual(len(new_names), 78)
    self.assertTrue(all(name.startswith(("ce-", "pstack-")) or name == "agentcookie" for name in new_names))
    self.assertEqual(set(registries["codex"]["skills"]), set(registries["kimi"]["skills"]))
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 tools/test-vendor-skill-packs.py`

Expected: FAIL because the three runtime registries do not contain the 78 new names.

- [ ] **Step 3: Write minimal implementation**

Have the importer derive each new registry entry from the generated `source-manifest.json`. Use `mode: source-adapter` for all portable imported skills. Generate triggers from the namespaced command plus the source description's explicit trigger phrases. Update Claude's `expected_count` and keep its `inventory_source` unchanged. Generate Kimi entries from the same Codex inventory and preserve existing native exceptions.

Run `python3 tools/build-index.py` after all new `SKILL.md` files exist. Do not hand-edit generated `index.json`.

- [ ] **Step 4: Run tests to verify it passes**

Run: `python3 tools/build-index.py --check`

Expected: `index.json aktuell (...)`.

Run: `python3 tools/sync-codex-skills.py --check`

Expected: source inventory and generated adapters are consistent.

Run: `python3 tools/sync-kimi-skills.py --check`

Expected: Kimi and Codex inventories match exactly.

Run: `python3 tools/sync-claude-skills.py --check`

Expected: Claude source inventory is consistent.

- [ ] **Step 5: Commit**

```bash
git add codex/compatibility.json claude/compatibility.json kimi/compatibility.json index.json tools/vendor-skill-packs.py tools/test-vendor-skill-packs.py
git commit -m "feat(registry): expose namespaced vendor skills"
```

---

### Task 6: Gates, Runtime-Aktivierung und Review-Inbox

**Files:**
- Modify: `ops/review-inbox.md` in `/root/raphael-command-center`
- Test: all generated package paths and registry paths

**Interfaces:**
- `python3 tools/validate-skill.py` is the frontmatter gate.
- `python3 tools/build-index.py --check` is the index gate.
- `python3 tools/sync-claude-skills.py --check`, `python3 tools/sync-codex-skills.py --check` and `python3 tools/sync-kimi-skills.py --check` are the runtime inventory gates.
- `agentcookie doctor` is an optional live infrastructure gate and reports `nicht geprüft` when no authorized pair exists.

- [ ] **Step 1: Run the complete deterministic gate set**

Run in `/root/raphael-skills`:

```bash
python3 tools/validate-skill.py
python3 tools/build-index.py --check
python3 tools/test-vendor-skill-packs.py
python3 tools/test-agentcookie-skill.py
python3 tools/sync-codex-skills.py --check
python3 tools/sync-kimi-skills.py --check
python3 tools/sync-claude-skills.py --check
```

Expected: every command exits 0. Any provider, network or missing-endpoint error remains `BLOCKED`.

- [ ] **Step 2: Run conflict-free dry-run installation**

```bash
python3 tools/sync-codex-skills.py --install --dry-run
python3 tools/sync-kimi-skills.py --install --dry-run
python3 tools/sync-claude-skills.py --install --dry-run
```

Expected: all new paths are `create` or `unchanged`; no existing foreign path is listed as `conflict`.

- [ ] **Step 3: Activate the namespaced runtime entries**

```bash
python3 tools/sync-codex-skills.py --install
python3 tools/sync-kimi-skills.py --install
python3 tools/sync-claude-skills.py --install
```

Expected: only the 78 namespaced skill entries are newly linked; pre-existing unprefixed skills remain unchanged.

- [ ] **Step 4: Verify installed targets**

```bash
python3 tools/sync-codex-skills.py --check
python3 tools/sync-kimi-skills.py --check
python3 tools/sync-claude-skills.py --verify-install
```

Expected: every namespaced entry resolves to the canonical repository source and no symlink points into a mutable upstream checkout.

- [ ] **Step 5: Record the mutation review**

Append one entry to `/root/raphael-command-center/ops/review-inbox.md` naming the three source commits, 78 new skill IDs, the `agentcookie` Ops-Skill, all deterministic gates, and the live pairing state `nicht geprüft` when no Mac endpoint exists. Do not alter unrelated review entries.

- [ ] **Step 6: Cross-family read-only review**

Run an independent read-only review over the actual diff with `pruefer-code`. The reviewer checks namespace uniqueness, path safety, registry parity, Fable prohibition, no secret material, and that imported skill bodies do not accidentally route to unprefixed names. Apply only verified findings and rerun the complete gate set.

- [ ] **Step 7: Final commit**

```bash
git add skills/imported/compound-engineering skills/imported/pstack skills/ops/agentcookie agents/pstack-poteto-agent.md agents/pstack-comment-sicko.md tools/vendor-skill-packs.py tools/vendor_skill_packs.py tools/test-vendor-skill-packs.py tools/test-agentcookie-skill.py codex/compatibility.json claude/compatibility.json kimi/compatibility.json index.json /root/raphael-command-center/ops/review-inbox.md
git commit -m "feat(skill-packs): add namespaced compound engineering stack"
```

The final staging command must be executed from a repository that accepts both repository paths, or split into one commit in each repository. Never use `git add -A`.

---

## Stop Conditions

- The quoted source commit differs from the checkout HEAD. Re-read the source and update the manifest before copying.
- Any target name already belongs to a different canonical or foreign skill. Stop without overwriting it.
- A generated skill references a missing local resource or an unprefixed sibling command.
- A pstack route leaves Fable as an executable worker, advisor or reviewer.
- A registry update would change an unrelated entry or a foreign symlink.
- `agentcookie` would require cookie values, private keys, a live Mac endpoint or a secret in Git to continue. Mark the live part `nicht geprüft` and finish the offline integration.
- A deterministic gate fails after two targeted repair attempts. Report the exact failing path and gate as `BLOCKED`; do not weaken the gate.
