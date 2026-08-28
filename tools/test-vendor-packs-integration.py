#!/usr/bin/env python3
"""Integration guards for the vendored external skill packs.

Checks the namespace invariant, the pinned provenance and the agentcookie
secrecy contract against the packages that are actually on disk.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PACKS = REPO_ROOT / "vendor-packs"
COMPOUND = PACKS / "compound-engineering"
PSTACK = PACKS / "pstack"
AGENTCOOKIE = PACKS / "agentcookie"
CE_EXECUTION_SUFFIXES = {".sh", ".py", ".yaml", ".yml"}
FABLE_ROUTE = re.compile(r"(?i)(?:\bfable\b|claude:fable|claude-fable(?:[-*][A-Za-z0-9._-]*)?)")
EXPLICIT_PROHIBITION = re.compile(
    r"(?i)\b(?:forbidden|prohibited|not allowed|unzulässig|verboten|reject|rejects|deny|denied|"
    r"disallow|unsupported|unavailable|block(?:ed|s)?|fail[- ]closed)\b"
)

EXPECTED = {
    COMPOUND: ("ce-", 33, "5985d821b9413f590184531d4c35e435d2356abb"),
    PSTACK: ("pstack-", 44, "bdf7aa355337897f167153e05069aca505dae17c"),
}

SECRET_ASSIGNMENT = re.compile(
    r"(?i)\b(cookie|token|secret|api[_-]?key|password|pairing[_-]?code)\s*[:=]\s*"
    r"['\"]?[A-Za-z0-9_./+-]{16,}"
)


def skill_dirs(pack: Path, prefix: str) -> list[Path]:
    return sorted(path for path in pack.iterdir() if path.is_dir() and path.name.startswith(prefix))


class NamespaceTests(unittest.TestCase):
    def test_each_pack_has_the_expected_namespaced_skills(self):
        for pack, (prefix, count, _) in EXPECTED.items():
            with self.subTest(pack=pack.name):
                dirs = skill_dirs(pack, prefix)
                self.assertEqual(len(dirs), count)
                for path in dirs:
                    self.assertTrue((path / "SKILL.md").is_file())

    def test_no_skill_directory_escapes_its_namespace(self):
        for pack, (prefix, _, _) in EXPECTED.items():
            with self.subTest(pack=pack.name):
                for path in pack.iterdir():
                    if path.is_dir():
                        self.assertTrue(path.name.startswith(prefix), path.name)

    def test_skill_ids_are_globally_unique(self):
        names: list[str] = []
        for pack, (prefix, _, _) in EXPECTED.items():
            names.extend(path.name for path in skill_dirs(pack, prefix))
        names.append(AGENTCOOKIE.name)
        self.assertEqual(len(names), len(set(names)))
        self.assertEqual(len(names), 78)

    def test_poteto_mode_is_namespaced_with_its_playbooks(self):
        poteto = PSTACK / "pstack-poteto-mode"
        self.assertTrue((poteto / "SKILL.md").is_file())
        self.assertTrue((poteto / "playbooks").is_dir())
        text = (poteto / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("pstack-poteto-agent", text)


class CompoundEngineeringRouteSafetyTests(unittest.TestCase):
    def test_execution_surfaces_do_not_allow_fable_routes(self):
        violations: list[str] = []
        for path in sorted(
            candidate
            for candidate in COMPOUND.rglob("*")
            if candidate.is_file() and candidate.suffix in CE_EXECUTION_SUFFIXES
        ):
            for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
                if FABLE_ROUTE.search(line) and not EXPLICIT_PROHIBITION.search(line):
                    violations.append(f"{path.relative_to(REPO_ROOT)}:{line_number}: {line.strip()}")
        self.assertEqual(violations, [])


class ProvenanceTests(unittest.TestCase):
    def test_manifests_pin_the_declared_commit_and_count(self):
        for pack, (_, count, commit) in EXPECTED.items():
            with self.subTest(pack=pack.name):
                manifest = json.loads((pack / "source-manifest.json").read_text(encoding="utf-8"))
                self.assertEqual(manifest["source_commit"], commit)
                self.assertEqual(len(manifest["skills"]), count)

    def test_ce_safety_overlay_hashes_match_normalized_files(self):
        manifest = json.loads((COMPOUND / "source-manifest.json").read_text(encoding="utf-8"))
        overlay = manifest["safety_overlay"]
        self.assertEqual(overlay["policy"], "fable-routes-blocked")
        for relative, expected in overlay["target_sha256"].items():
            path = COMPOUND / relative
            self.assertTrue(path.is_file(), relative)
            import hashlib
            actual = hashlib.sha256(path.read_bytes()).hexdigest()
            self.assertEqual(actual, expected, relative)

    def test_vendoring_document_names_every_source(self):
        text = (PACKS / "VENDORING.md").read_text(encoding="utf-8")
        for _, (_, _, commit) in EXPECTED.items():
            self.assertIn(commit, text)
        self.assertIn("e498e93bcaac867386dfba12ea709882dff037ba", text)
        self.assertIn("skillsdirectory", text)


class AgentCookieSafetyTests(unittest.TestCase):
    def test_skill_states_the_operational_contract(self):
        text = (AGENTCOOKIE / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("agentcookie doctor", text)
        self.assertIn("status --json", text)
        self.assertIn("BLOCKED", text)

    def test_no_secret_material_is_committed(self):
        for path in AGENTCOOKIE.rglob("*"):
            if path.is_file():
                with self.subTest(path=path.name):
                    self.assertIsNone(SECRET_ASSIGNMENT.search(path.read_text(encoding="utf-8")))


class AgentPromptTests(unittest.TestCase):
    def test_vendored_agents_are_namespaced_leaf_workers(self):
        for name in ("pstack-poteto-agent", "pstack-comment-sicko"):
            path = REPO_ROOT / "agents" / f"{name}.md"
            with self.subTest(agent=name):
                text = path.read_text(encoding="utf-8")
                self.assertIn(f"name: {name}", text)
                self.assertIn("Leaf", text)
                self.assertNotRegex(text, r"(?i)fable[^\n]{0,60}(worker|advisor|reviewer|fallback)\b(?![^\n]*verboten)")


if __name__ == "__main__":
    unittest.main()
