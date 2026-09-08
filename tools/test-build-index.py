#!/usr/bin/env python3
"""Regression tests for build-index skill discovery."""
from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

TOOLS = Path(__file__).resolve().parent


def load_build_index():
    spec = importlib.util.spec_from_file_location(
        "build_index", TOOLS / "build-index.py"
    )
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class DiscoverSkillFilesTests(unittest.TestCase):
    def test_excludes_embedded_catalogs_and_preserves_registered_skills(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            skills_dir = Path(tmp) / "skills"
            paths = [
                "eigene/alpha/SKILL.md",
                "imported/beta/SKILL.md",
                "eigene/web/resources/components/card/SKILL.md",
                "imported/beta/resources/examples/demo/SKILL.md",
                "eigene/web/vendor/library/SKILL.md",
                "imported/beta/vendor/library/SKILL.md",
                "_candidates/draft/SKILL.md",
                "eigene/_restored-20260827/old/SKILL.md",
            ]
            for relative_path in paths:
                skill_file = skills_dir / relative_path
                skill_file.parent.mkdir(parents=True, exist_ok=True)
                skill_file.touch()

            discovered = [
                path.relative_to(skills_dir).as_posix()
                for path in load_build_index().discover_skill_files(skills_dir)
            ]

            self.assertEqual(
                discovered,
                ["eigene/alpha/SKILL.md", "imported/beta/SKILL.md"],
            )


if __name__ == "__main__":
    raise SystemExit(unittest.main(verbosity=2))
