import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import vendor_skill_packs as vendor
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
        text = "https://example.test/tdd /root/tdd (/tdd/SKILL.md) skills/tdd/SKILL.md"
        rewritten = rewrite_references(text, {"tdd": "pstack-tdd"})
        self.assertEqual(rewritten, "https://example.test/tdd /root/tdd (/tdd/SKILL.md) skills/pstack-tdd/SKILL.md")

    def test_rewrite_agent_names_only_in_structured_fields_or_package_paths(self):
        text = (
            "Mention poteto-agent in prose. https://example.test/poteto-agent /root/poteto-agent\n"
            "subagent_type: poteto-agent\n"
            '{"agent_id": "poteto-agent"}\n'
            "pstack/agents/poteto-agent.md agents/poteto-agent.md"
        )
        rewritten = rewrite_references(text, {"poteto-agent": "pstack-poteto-agent"})
        self.assertEqual(
            rewritten,
            (
                "Mention poteto-agent in prose. https://example.test/poteto-agent /root/poteto-agent\n"
                "subagent_type: pstack-poteto-agent\n"
                '{"agent_id": "pstack-poteto-agent"}\n'
                "pstack/agents/pstack-poteto-agent.md agents/pstack-poteto-agent.md"
            ),
        )

    def test_rewrite_package_paths_and_derived_agent_ids(self):
        text = "pstack/skills/poteto-mode/SKILL.md ../../skills/poteto-mode/SKILL.md and subagent_type: poteto-agent (pstack/agents/poteto-agent.md)"
        rewritten = rewrite_references(
            text,
            {"poteto-mode": "pstack-poteto-mode", "poteto-agent": "pstack-poteto-agent"},
        )
        self.assertEqual(
            rewritten,
            "pstack/skills/pstack-poteto-mode/SKILL.md ../../skills/pstack-poteto-mode/SKILL.md and subagent_type: pstack-poteto-agent (pstack/agents/pstack-poteto-agent.md)",
        )


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

    def _commit_all(self, message="fixture update"):
        subprocess.run(["git", "-C", str(self.source), "add", "."], check=True)
        subprocess.run(["git", "-C", str(self.source), "commit", "-qm", message], check=True)
        self.commit = subprocess.run(
            ["git", "-C", str(self.source), "rev-parse", "HEAD"],
            check=True,
            capture_output=True,
            text=True,
        ).stdout.strip()

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
        self.assertEqual(
            next(entry for entry in result["skills"] if entry["original_name"] == "brainstorm")["source_sha256"],
            vendor._sha256(self.source / "skills" / "brainstorm" / "SKILL.md"),
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

    def test_human_name_uses_safe_directory_identity_and_rewrites_agent(self):
        (self.source / "skills" / "brainstorm").rename(self.source / "skills" / "poteto-mode")
        source = self.source / "skills" / "poteto-mode" / "SKILL.md"
        source.write_text(
            source.read_text(encoding="utf-8").replace("name: brainstorm", "name: Poteto Mode").replace(
                "# Skill", 'subagent_type: "poteto-agent"\npstack/skills/poteto-mode/SKILL.md\n# Skill'
            ),
            encoding="utf-8",
        )
        self._commit_all()
        result = import_pack(PackSpec("fixture", self.source, self.target, "pstack-", 3), self.commit)
        self.assertIn("pstack-poteto-mode", [entry["target_name"] for entry in result["skills"]])
        text = (self.target / "pstack-poteto-mode" / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn('subagent_type: "pstack-poteto-agent"', text)
        self.assertIn("pstack/skills/pstack-poteto-mode/SKILL.md", text)

    def test_template_permalink_is_not_a_local_link(self):
        source = self.source / "skills" / "brainstorm" / "SKILL.md"
        source.write_text(source.read_text(encoding="utf-8") + "\n[origin](<permalink>)\n", encoding="utf-8")
        self._commit_all()
        import_pack(PackSpec("fixture", self.source, self.target, "ce-", 3), self.commit)
        self.assertTrue((self.target / "source-manifest.json").is_file())

    def test_dirty_or_ignored_source_is_rejected(self):
        spec = PackSpec("fixture", self.source, self.target, "ce-", 3)
        tracked = self.source / "skills" / "brainstorm" / "SKILL.md"
        original = tracked.read_text(encoding="utf-8")
        tracked.write_text(original + "\ntracked dirty\n", encoding="utf-8")
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)
        tracked.write_text(original, encoding="utf-8")
        (self.source / "untracked.txt").write_text("untracked\n", encoding="utf-8")
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)
        (self.source / "untracked.txt").unlink()
        tracked.write_text(original + "\nstaged\n", encoding="utf-8")
        subprocess.run(["git", "-C", str(self.source), "add", str(tracked)], check=True)
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)
        subprocess.run(["git", "-C", str(self.source), "reset", "--", str(tracked)], check=True)
        tracked.write_text(original, encoding="utf-8")
        (self.source / ".gitignore").write_text("ignored.txt\n", encoding="utf-8")
        self._commit_all("ignore fixture")
        (self.source / "ignored.txt").write_text("ignored\n", encoding="utf-8")
        with self.assertRaises(ImportError):
            import_pack(spec, self.commit)

    def test_pinning_rejects_assume_unchanged_and_skip_worktree_changes(self):
        spec = PackSpec("fixture", self.source, self.target, "ce-", 3)
        tracked = self.source / "skills" / "brainstorm" / "SKILL.md"
        original = tracked.read_text(encoding="utf-8")
        relative = tracked.relative_to(self.source).as_posix()
        for flag in ("assume-unchanged", "skip-worktree"):
            with self.subTest(flag=flag):
                try:
                    tracked.write_text(original + f"\n{flag} hidden change\n", encoding="utf-8")
                    subprocess.run(["git", "-C", str(self.source), "update-index", f"--{flag}", relative], check=True)
                    status = subprocess.run(
                        ["git", "-C", str(self.source), "status", "--porcelain=v1", "--ignored"],
                        check=True,
                        capture_output=True,
                        text=True,
                    )
                    self.assertEqual(status.stdout, "")
                    with self.assertRaises(ImportError):
                        import_pack(spec, self.commit)
                finally:
                    subprocess.run(["git", "-C", str(self.source), "update-index", f"--no-{flag}", relative], check=True)
                    tracked.write_text(original, encoding="utf-8")

    def test_build_failure_cleans_staging_and_rejects_symlinked_tmp_parent(self):
        source = self.source / "skills" / "brainstorm" / "SKILL.md"
        source.write_text(source.read_text(encoding="utf-8") + "\n[bad](missing.md)\n", encoding="utf-8")
        self._commit_all()
        with tempfile.TemporaryDirectory() as temporary:
            with patch.dict(os.environ, {"TMPDIR": temporary}):
                with self.assertRaises(ImportError):
                    import_pack(PackSpec("fixture", self.source, self.target, "ce-", 3), self.commit)
                self.assertEqual(list(Path(temporary).glob("raphael-skill-import-*")), [])
            real_parent = Path(temporary) / "real"
            real_parent.mkdir()
            linked_parent = Path(temporary) / "linked"
            linked_parent.symlink_to(real_parent, target_is_directory=True)
            with patch.dict(os.environ, {"TMPDIR": str(linked_parent)}):
                with self.assertRaises(ImportError):
                    import_pack(PackSpec("fixture", self.source, self.target, "ce-", 3), self.commit)


class RegistryTests(unittest.TestCase):
    def _write_registries(self, root: Path):
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

    def test_registries_add_only_new_names(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_registries(root)
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

    def test_registry_sources_reject_non_repository_paths(self):
        invalid = ["https://example.test/skill", "file:skill", "C:/skill", "\\\\server\\share", "~/skill", "./skills/skill", "skills/./skill", "skills/../skill", "skills//skill", "skills\\skill"]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_registries(root)
            with patch("vendor_skill_packs.REPO_ROOT", root):
                for value in invalid:
                    with self.subTest(value=value), self.assertRaises(ImportError):
                        update_registries([{"name": "new-skill", "path": value}], [])


class CliTests(unittest.TestCase):
    def test_import_requires_exact_commit(self):
        self.assertEqual(main(["--import", "pstack", "--source", "/tmp/source"]), 2)

    def test_standalone_check_requires_pack(self):
        self.assertEqual(main(["--check"]), 2)

    def test_current_compound_engineering_and_pstack_checks(self):
        ce = Path("/root/.cursor/plugins/local/compound-engineering")
        ce_commit = subprocess.run(["git", "-C", str(ce), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
        self.assertEqual(main(["--check", "--import", "compound-engineering", "--commit", ce_commit]), 0)
        vendor_repo = Path("/root/tools/vendor/coding-slop-cursor-plugins")
        pstack_commit = subprocess.run(["git", "-C", str(vendor_repo), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
        discovered = vendor._discover_skills(vendor._known_specs()["pstack"])
        self.assertEqual(len(discovered), 44)
        self.assertIn("poteto-mode", [name for name, _, _ in discovered])
        with tempfile.TemporaryDirectory(prefix="pstack-clean-test-") as temporary:
            clone = Path(temporary) / "repo"
            subprocess.run(["git", "clone", "--quiet", "--no-checkout", str(vendor_repo), str(clone)], check=True)
            subprocess.run(["git", "-C", str(clone), "checkout", "--quiet", "--detach", pstack_commit], check=True)
            self.assertEqual(
                main(["--check", "--import", "pstack", "--source", str(clone / "pstack"), "--commit", pstack_commit]),
                0,
            )

    def test_registry_failure_rolls_back_package_and_registries(self):
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as source_directory:
            root = Path(directory)
            source = Path(source_directory) / "source"
            source.mkdir()
            (source / "skills" / "fixture").mkdir(parents=True)
            (source / "skills" / "fixture" / "SKILL.md").write_text("---\nname: fixture\ndescription: fixture\n---\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(source), "init", "-q"], check=True)
            subprocess.run(["git", "-C", str(source), "config", "user.email", "test@example.test"], check=True)
            subprocess.run(["git", "-C", str(source), "config", "user.name", "Test"], check=True)
            subprocess.run(["git", "-C", str(source), "add", "."], check=True)
            subprocess.run(["git", "-C", str(source), "commit", "-qm", "fixture"], check=True)
            commit = subprocess.run(["git", "-C", str(source), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
            RegistryTests()._write_registries(root)
            spec = PackSpec("fixture", source, root / "skills" / "imported" / "fixture", "fixture-", 1)
            import_pack(spec, commit)
            before_package = {path.relative_to(spec.target_root): path.read_bytes() for path in spec.target_root.rglob("*") if path.is_file()}
            registry_paths = [root / "index.json", root / "codex" / "compatibility.json", root / "claude" / "compatibility.json", root / "kimi" / "compatibility.json"]
            before_registries = {path: path.read_bytes() for path in registry_paths}
            original_write = vendor._atomic_json_write
            calls = 0

            def fail_second_write(path, value):
                nonlocal calls
                calls += 1
                if calls == 2:
                    raise OSError("injected registry failure")
                original_write(path, value)

            with patch("vendor_skill_packs.REPO_ROOT", root), patch("vendor_skill_packs._known_specs", return_value={"fixture": spec}), patch("vendor_skill_packs._atomic_json_write", side_effect=fail_second_write):
                self.assertEqual(main(["--import", "fixture", "--commit", commit]), 2)
            after_package = {path.relative_to(spec.target_root): path.read_bytes() for path in spec.target_root.rglob("*") if path.is_file()}
            self.assertEqual(after_package, before_package)
            self.assertEqual({path: path.read_bytes() for path in registry_paths}, before_registries)

    def test_backup_cleanup_failure_keeps_committed_package_and_registries(self):
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as source_directory:
            root = Path(directory)
            source = Path(source_directory) / "source"
            source.mkdir()
            skill = source / "skills" / "fixture"
            skill.mkdir(parents=True)
            skill_file = skill / "SKILL.md"
            skill_file.write_text("---\nname: fixture\ndescription: fixture\n---\n\nold\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(source), "init", "-q"], check=True)
            subprocess.run(["git", "-C", str(source), "config", "user.email", "test@example.test"], check=True)
            subprocess.run(["git", "-C", str(source), "config", "user.name", "Test"], check=True)
            subprocess.run(["git", "-C", str(source), "add", "."], check=True)
            subprocess.run(["git", "-C", str(source), "commit", "-qm", "fixture"], check=True)
            RegistryTests()._write_registries(root)
            spec = PackSpec("fixture", source, root / "skills" / "imported" / "fixture", "fixture-", 1)
            first_commit = subprocess.run(["git", "-C", str(source), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
            import_pack(spec, first_commit)
            old_package = {path.relative_to(spec.target_root): path.read_bytes() for path in spec.target_root.rglob("*") if path.is_file()}
            skill_file.write_text("---\nname: fixture\ndescription: fixture\n---\n\nnew\n", encoding="utf-8")
            subprocess.run(["git", "-C", str(source), "add", "."], check=True)
            subprocess.run(["git", "-C", str(source), "commit", "-qm", "updated fixture"], check=True)
            commit = subprocess.run(["git", "-C", str(source), "rev-parse", "HEAD"], check=True, capture_output=True, text=True).stdout.strip()
            with patch("vendor_skill_packs.REPO_ROOT", root), patch("vendor_skill_packs._known_specs", return_value={"fixture": spec}), patch("vendor_skill_packs._discard_package_backup", side_effect=OSError("injected cleanup failure")):
                self.assertEqual(main(["--import", "fixture", "--commit", commit]), 0)
            new_package = {path.relative_to(spec.target_root): path.read_bytes() for path in spec.target_root.rglob("*") if path.is_file()}
            self.assertNotEqual(new_package, old_package)
            self.assertTrue(list(spec.target_root.parent.glob(".fixture.raphael-old-*")))
            index = json.loads((root / "index.json").read_text(encoding="utf-8"))
            codex = json.loads((root / "codex" / "compatibility.json").read_text(encoding="utf-8"))
            claude = json.loads((root / "claude" / "compatibility.json").read_text(encoding="utf-8"))
            kimi = json.loads((root / "kimi" / "compatibility.json").read_text(encoding="utf-8"))
            expected_source = "skills/imported/fixture/fixture-fixture/SKILL.md"
            self.assertIn("fixture-fixture", [entry["name"] for entry in index["skills"]])
            self.assertEqual(codex["skills"]["fixture-fixture"]["source"], expected_source)
            self.assertEqual(kimi["skills"]["fixture-fixture"]["source"], expected_source)
            self.assertEqual(claude["expected_count"], len(codex["skills"]))


if __name__ == "__main__":
    unittest.main()
