import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from vendor_skill_packs import (
    PackSpec,
    ImportError,
    build_name_map,
    import_pack,
    main,
    normalize_skill,
    rewrite_references,
    update_registries,
)


class NamespaceTests(unittest.TestCase):
    def test_maps_generic_names_to_pack_namespace(self):
        self.assertEqual(
            build_name_map(["lfg", "ce-plan"], "ce-"),
            {"lfg": "ce-lfg", "ce-plan": "ce-plan"},
        )
        self.assertEqual(
            build_name_map(["poteto-mode", "tdd"], "pstack-"),
            {"poteto-mode": "pstack-poteto-mode", "tdd": "pstack-tdd"},
        )

    def test_rewrite_never_leaves_unprefixed_internal_commands(self):
        text = "Use /poteto-mode, /tdd and subagent_type: poteto-agent."
        rewritten = rewrite_references(
            text,
            {
                "poteto-mode": "pstack-poteto-mode",
                "tdd": "pstack-tdd",
                "poteto-agent": "pstack-poteto-agent",
            },
        )
        self.assertIn("/pstack-poteto-mode", rewritten)
        self.assertIn("/pstack-tdd", rewritten)
        self.assertIn("pstack-poteto-agent", rewritten)
        self.assertNotIn("/poteto-mode", rewritten)
        self.assertNotIn("/tdd", rewritten)

    def test_rewrite_does_not_modify_external_or_absolute_paths(self):
        text = "https://example.test/tdd /root/tdd skills/tdd/SKILL.md"
        rewritten = rewrite_references(text, {"tdd": "pstack-tdd"})
        self.assertEqual(rewritten, "https://example.test/tdd /root/tdd skills/pstack-tdd/SKILL.md")


class ImportTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.source = self.root / "source"
        self.target = self.root / "target" / "pack"
        self.source.mkdir()
        (self.source / "skills").mkdir()
        self._write_skill("brainstorm", '"Explore the work."', "references/guide.md")
        self._write_skill(
            "plan",
            '"Plan the work."',
            "references/source.md",
            metadata=(
                "metadata:\n"
                "  raphael-version: \"1.2.3\"\n"
                "  raphael-class: \"F\"\n"
                "  raphael-scope: \"agency\"\n"
                "  raphael-sensitivity: \"internal\"\n"
                "  raphael-completion-criteria: '[\"Source criterion\"]'\n"
            ),
        )
        self._write_skill("lfg", '"Ship the work."', "")
        (self.source / "LICENSE").write_text("MIT License\n", encoding="utf-8")
        subprocess.run(["git", "-C", str(self.source), "init", "-q"], check=True)
        subprocess.run(["git", "-C", str(self.source), "config", "user.email", "test@example.test"], check=True)
        subprocess.run(["git", "-C", str(self.source), "config", "user.name", "Test"], check=True)
        subprocess.run(["git", "-C", str(self.source), "add", "."], check=True)
        subprocess.run(["git", "-C", str(self.source), "commit", "-qm", "fixture"], check=True)
        self.commit = subprocess.run(
            ["git", "-C", str(self.source), "rev-parse", "HEAD"],
            check=True,
            capture_output=True,
            text=True,
        ).stdout.strip()

    def tearDown(self):
        self.temp.cleanup()

    def _write_skill(self, name, description, reference, metadata=""):
        skill = self.source / "skills" / name
        skill.mkdir(parents=True)
        body = "# Skill\n"
        if reference:
            (skill / "references").mkdir()
            (skill / reference).write_text("Use /plan.\n", encoding="utf-8")
            body += f"Read [{name}]({reference}) and use /plan.\n"
        (skill / "SKILL.md").write_text(
            f"---\nname: {name}\ndescription: {description}\n{metadata}---\n\n{body}",
            encoding="utf-8",
        )

    def test_import_namespaces_and_writes_manifest(self):
        spec = PackSpec("fixture", self.source, self.target, "ce-", 3)
        result = import_pack(spec, self.commit)
        self.assertEqual(
            sorted(entry["target_name"] for entry in result["skills"]),
            ["ce-brainstorm", "ce-lfg", "ce-plan"],
        )
        self.assertEqual(
            json.loads((self.target / "source-manifest.json").read_text(encoding="utf-8"))["source_commit"],
            self.commit,
        )
        self.assertEqual(next(entry for entry in result["skills"] if entry["target_name"] == "ce-plan")["version"], "1.2.3")
        self.assertIn("/ce-plan", (self.target / "ce-brainstorm" / "SKILL.md").read_text(encoding="utf-8"))
        self.assertEqual((self.target / "ce-brainstorm" / "references" / "guide.md").read_text(encoding="utf-8"), "Use /ce-plan.\n")

    def test_import_rejects_symlinked_skill_component(self):
        references = self.source / "skills" / "plan" / "references"
        symlink = references / "outside"
        symlink.symlink_to(self.root)
        spec = PackSpec("fixture", self.source, self.target, "ce-", 3)
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)
        self.assertFalse(self.target.exists())

    def test_import_does_not_replace_foreign_target(self):
        self.target.mkdir(parents=True)
        (self.target / "keep.txt").write_text("keep", encoding="utf-8")
        spec = PackSpec("fixture", self.source, self.target, "ce-", 3)
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)
        self.assertEqual((self.target / "keep.txt").read_text(encoding="utf-8"), "keep")

    def test_normalize_skill_writes_portable_contract(self):
        source = self.source / "skills" / "plan" / "SKILL.md"
        target = self.root / "normalized"
        normalize_skill(source, target, "ce-plan", "fixture", {})
        text = (target / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("name: ce-plan", text)
        self.assertIn('Trigger: \\"/ce-plan\\"', text)
        self.assertIn('raphael-version: "1.2.3"', text)
        self.assertIn('raphael-class: "F"', text)
        self.assertIn('raphael-scope: "agency"', text)
        self.assertIn('raphael-sensitivity: "internal"', text)
        self.assertIn('raphael-completion-criteria: "[\\\"Source criterion\\\"]"', text)


class RegistryTests(unittest.TestCase):
    def test_registries_add_only_new_names(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "codex").mkdir()
            (root / "claude").mkdir()
            (root / "kimi").mkdir()
            (root / "index.json").write_text(
                json.dumps({"generated_by": "test", "skill_count": 1, "skills": [{"name": "existing", "version": "1.0.0", "path": "skills/existing/SKILL.md", "description": "Existing"}]}),
                encoding="utf-8",
            )
            (root / "codex" / "compatibility.json").write_text(
                json.dumps({"schema_version": 1, "skills": {"existing": {"source": "skills/existing/SKILL.md", "mode": "source-adapter", "rationale": "existing", "triggers": ["/existing"]}}}),
                encoding="utf-8",
            )
            (root / "claude" / "compatibility.json").write_text(
                json.dumps({"schema_version": 1, "helper_id": "raphael.claude-skills", "target": "claude-code>=2.1", "inventory_source": "../codex/compatibility.json", "expected_count": 1, "native_overrides": {"kimi-sol": "claude/skills/kimi-sol/SKILL.md"}}),
                encoding="utf-8",
            )
            (root / "kimi" / "compatibility.json").write_text(
                json.dumps({"schema_version": 1, "target": "kimi-code-0.28.1", "skills": {"existing": {"source": "skills/existing/SKILL.md", "mode": "source-adapter"}}}),
                encoding="utf-8",
            )
            entries = [{"name": "new-skill", "version": "1.0.0", "path": "skills/imported/new-skill/SKILL.md", "description": 'Trigger: "/new-skill"'}]
            runtime = [{"name": "new-skill", "source": "skills/imported/new-skill/SKILL.md", "mode": "source-adapter"}]
            with patch("vendor_skill_packs.REPO_ROOT", root):
                update_registries(entries + entries, runtime + runtime)
                update_registries(entries, runtime)
            index = json.loads((root / "index.json").read_text(encoding="utf-8"))
            codex = json.loads((root / "codex" / "compatibility.json").read_text(encoding="utf-8"))
            self.assertEqual([entry["name"] for entry in index["skills"]], ["existing", "new-skill"])
            self.assertEqual(set(codex["skills"]), {"existing", "new-skill"})
            self.assertEqual(json.loads((root / "claude" / "compatibility.json").read_text(encoding="utf-8"))["expected_count"], 2)


class CliTests(unittest.TestCase):
    def test_import_requires_exact_commit(self):
        self.assertEqual(main(["--import", "pstack", "--source", "/tmp/source"]), 2)


if __name__ == "__main__":
    unittest.main()
