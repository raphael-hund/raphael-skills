#!/usr/bin/env python3
"""CLI regressions for the skill-local Ads knowledge loader.

Run with: uv run --with pytest pytest test_load_wissen.py
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from collections.abc import Mapping
from pathlib import Path
from typing import Final

SCRIPT: Final = Path(__file__).resolve().with_name("load-wissen.py")


def run(
    *extra: str,
    env: Mapping[str, str] | None = None,
    script: Path = SCRIPT,
) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    environment["ADS_BRAIN"] = ""
    environment.update(env or {})
    return subprocess.run(
        [sys.executable, str(script), *extra],
        capture_output=True,
        text=True,
        env=environment,
        check=False,
    )


def fake_brain(root: Path) -> Path:
    """Expose a safe marker if the loader invokes the old Brain index hook."""
    scripts = root / "scripts"
    scripts.mkdir(parents=True)
    marker = root / "brain-was-touched"
    (scripts / "brain-context.py").write_text(
        "from pathlib import Path\n"
        f"Path({str(marker)!r}).write_text('touched')\n",
        encoding="utf-8",
    )
    return marker


def test_default_never_touches_brain(tmp_path: Path) -> None:
    # Given an available ADS_BRAIN index with an observable side effect.
    brain = tmp_path / "brain"
    marker = fake_brain(brain)
    # When invoking the default path without --no-brain.
    result = run("--skill", "ads", env={"ADS_BRAIN": str(brain)})
    # Then Brain is untouched and the source is explicitly local.
    assert not marker.exists(), result.stdout
    assert result.returncode == 0, result.stdout + result.stderr
    assert "BRAIN=off" in result.stdout
    assert "WISSEN=skill-local" in result.stdout


def test_missing_customer_selects_neutral_segment() -> None:
    # Given no customer-specific input.
    # When invoking the loader with only its required argument.
    result = run("--skill", "ads")
    # Then no customer is implicitly selected.
    assert result.returncode == 0, result.stdout + result.stderr
    assert "SEGMENT=uebertragbar\n" in result.stdout


def test_unknown_customer_selects_neutral_segment() -> None:
    # Given a customer not in the known map.
    # When loading its knowledge.
    result = run("--skill", "ads", "--kunde", "unbekannter-kunde")
    # Then the neutral segment remains usable.
    assert result.returncode == 0, result.stdout + result.stderr
    assert "SEGMENT=uebertragbar\n" in result.stdout


def test_known_customer_keeps_explicit_mapping() -> None:
    # Given the existing MAKE mapping.
    # When explicitly requesting MAKE.
    result = run("--skill", "ads", "--kunde", "make")
    # Then only its service segment is selected.
    assert result.returncode == 0, result.stdout + result.stderr
    assert "SEGMENT=local-service-handwerk\n" in result.stdout
    assert (
        "ANDERE_SEGMENTE_NICHT_GELADEN=agenturen-coaching,b2b-dienstleister,uebertragbar"
        in result.stdout
    )


def test_explicit_segment_overrides_customer() -> None:
    # Given a known customer and an explicit B2B segment.
    # When both arguments are passed.
    result = run("--skill", "ads", "--kunde", "make", "--segment", "b2b-dienstleister")
    # Then the explicit segment wins.
    assert result.returncode == 0, result.stdout + result.stderr
    assert "SEGMENT=b2b-dienstleister\n" in result.stdout


def test_no_brain_flag_remains_accepted(tmp_path: Path) -> None:
    # Given an old caller that still passes --no-brain.
    brain = tmp_path / "brain"
    marker = fake_brain(brain)
    # When it invokes the current loader.
    result = run("--skill", "ads", "--no-brain", env={"ADS_BRAIN": str(brain)})
    # Then compatibility does not re-enable any Brain access.
    assert result.returncode == 0, result.stdout + result.stderr
    assert not marker.exists()
    assert "BRAIN=off" in result.stdout


def test_missing_local_segment_does_not_fall_back_to_brain(tmp_path: Path) -> None:
    # Given a local skill missing its market file, but both Brain fallbacks exist.
    local = tmp_path / "skills" / "ads"
    (local / "scripts").mkdir(parents=True)
    copied_script = local / "scripts" / SCRIPT.name
    shutil.copyfile(SCRIPT, copied_script)
    refs = local / "references"
    refs.mkdir()
    for reference in (SCRIPT.parents[1] / "references").iterdir():
        if reference.name != "maerkte":
            (refs / reference.name).symlink_to(reference, target_is_directory=reference.is_dir())
    brain = tmp_path / "brain"
    marker = fake_brain(brain)
    approved = brain / "wiki/craft/ads/maerkte/uebertragbar"
    approved.mkdir(parents=True)
    (approved / "knowledge.md").write_text("# Brain fallback\n", encoding="utf-8")
    candidate = brain / "wiki/_candidates/maerkte"
    candidate.mkdir(parents=True)
    (candidate / "uebertragbar.md").write_text("# Candidate fallback\n", encoding="utf-8")
    # When requesting the absent local segment.
    result = run(
        "--skill", "ads", "--segment", "uebertragbar",
        env={"ADS_BRAIN": str(brain)}, script=copied_script,
    )
    # Then the missing skill source is an error; no Brain fallback is consulted.
    assert result.returncode == 2, result.stdout + result.stderr
    assert "SEGMENT_STATUS=missing\n" in result.stdout
    assert f"SEGMENT_PATH={refs / 'maerkte/uebertragbar.md'}\n" in result.stdout
    assert not marker.exists()


def test_legacy_skill_choices_still_resolve() -> None:
    # Given the four existing legacy CLI choices.
    for skill in ("ads-research", "ads-video", "ads-statics", "ads-copy"):
        # When selecting an existing choice.
        result = run("--skill", skill, "--kunde", "make")
        # Then every required reference exists and the segment resolves.
        assert result.returncode == 0, result.stdout + result.stderr
        assert "SEGMENT=local-service-handwerk\n" in result.stdout
        assert "BRAIN=off" in result.stdout


def test_standalone_copy_resolves_all_modes(tmp_path: Path) -> None:
    local = tmp_path / "standalone-ads"
    shutil.copytree(SCRIPT.parents[1], local)
    for skill in ("ads", "ads-research", "ads-video", "ads-statics", "ads-copy"):
        result = run("--skill", skill, script=local / "scripts/load-wissen.py")
        assert result.returncode == 0, result.stdout + result.stderr
        assert "MISSING" not in result.stdout


def test_bad_skill_choice_is_rejected() -> None:
    # Given an unsupported skill.
    # When supplied to the CLI.
    result = run("--skill", "unknown")
    # Then argument parsing rejects it.
    assert result.returncode == 2


def test_bad_segment_choice_is_rejected() -> None:
    # Given an unsupported segment.
    # When supplied to the CLI.
    result = run("--skill", "ads", "--segment", "unknown")
    # Then argument parsing rejects it.
    assert result.returncode == 2


if __name__ == "__main__":
    raise SystemExit(
        subprocess.run(
            [sys.executable, "-m", "pytest", __file__, "-q"], check=False,
        ).returncode,
    )
