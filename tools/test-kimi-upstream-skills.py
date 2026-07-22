#!/usr/bin/env python3
"""Local, no-network tests for the Kimi upstream bridge."""
from __future__ import annotations

import importlib.util
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SYNC_PATH = ROOT / "tools" / "sync-kimi-upstream-skills.py"
SOURCE = Path("/root/tools/vendor/superpowers")
CODEX_REGISTRY = ROOT / "codex" / "upstream-skills.json"
CODEX_STATE = Path.home() / ".local" / "state" / "raphael-codex-skills" / "upstream-links.json"
CODEX_PACK = Path("/root/.local/share/raphael-skills/gstack/a3259400a366593e0c909dd9ac3e59752efd2488-bridge-v5")


def load_sync():
    spec = importlib.util.spec_from_file_location("kimi_upstream", SYNC_PATH)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sync = load_sync()
REGISTRY = sync.load_registry()


def fixture(base: Path) -> tuple[Path, Path, Path, Path]:
    home = base / "kimi"
    managed = home / "plugins" / "managed" / "superpowers"
    managed.mkdir(parents=True)
    shutil.copytree(SOURCE / "skills", managed / "skills", symlinks=True)
    (managed / ".kimi-plugin").mkdir()
    shutil.copy2(SOURCE / ".kimi-plugin" / "plugin.json", managed / ".kimi-plugin" / "plugin.json")
    installed = {"version": 1, "plugins": [{"id": "superpowers", "root": str(managed), "source": "local-path", "enabled": True, "originalSource": str(SOURCE)}]}
    (home / "plugins" / "installed.json").write_text(json.dumps(installed), encoding="utf-8")

    share = base / "share"
    pack = share / "gstack" / "a3259400a366593e0c909dd9ac3e59752efd2488-bridge-v5"
    shutil.copytree(CODEX_PACK, pack, symlinks=True)
    state_root = base / "state"
    state_path = state_root / "raphael-codex-skills" / "upstream-links.json"
    state_path.parent.mkdir(parents=True)
    state = json.loads(CODEX_STATE.read_text(encoding="utf-8"))
    state["pack_root"] = str(pack)
    for link in state["links"]:
        if link["id"] == "global-runtime:gstack-upgrade":
            link["target"] = str(pack / "skills" / "gstack-upgrade")
    state_path.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")
    return home, share, state_root, pack


def invoke(*args: str, env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["python3", str(SYNC_PATH), *args], cwd=ROOT, text=True, capture_output=True, env=env)


def test_real_inventory_and_counts() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-") as td:
        home, share, state, _ = fixture(Path(td))
        reg = sync.load_registry()
        sp = sync.validate_superpowers(home, SOURCE, reg)
        gs = sync.validate_gstack(share, state, reg)
        assert sp["bundle_count"] == 14
        assert gs["target"].name == "gstack-upgrade"


def test_real_collision_bridge_exposes_both_writing_skills() -> None:
    home = Path("/root/.kimi-code")
    plugin_link = home / "skills" / "writing-skills"
    raphael_link = home / "skills" / "raphael-writing-skills"
    assert plugin_link.is_symlink()
    assert plugin_link.resolve() == home / "plugins" / "managed" / "superpowers" / "skills" / "writing-skills"
    assert raphael_link.is_symlink()
    assert raphael_link.resolve() == ROOT / "kimi" / "skills" / "raphael-writing-skills"
    plugin_text = (plugin_link / "SKILL.md").read_text(encoding="utf-8")
    raphael_text = (raphael_link / "SKILL.md").read_text(encoding="utf-8")
    assert "name: writing-skills" in plugin_text
    assert 'name: "raphael-writing-skills"' in raphael_text


def test_registry_rejects_each_superpowers_identity_field_independently() -> None:
    original = json.loads((ROOT / "kimi" / "upstream-skills.json").read_text(encoding="utf-8"))
    for field in ("plugin_id", "plugin_name"):
        with tempfile.TemporaryDirectory(prefix="kimi-upstream-registry-") as td:
            changed = json.loads(json.dumps(original))
            changed["superpowers"][field] = "foreign"
            path = Path(td) / "registry.json"
            path.write_text(json.dumps(changed), encoding="utf-8")
            try:
                sync.load_registry(path)
            except sync.SyncError:
                pass
            else:
                raise AssertionError(f"registry accepted foreign {field}")


def test_dry_run_apply_check_idempotence_and_unrelated_skill() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-") as td:
        home, share, state, pack = fixture(Path(td))
        unrelated = home / "skills" / "keep-me"
        unrelated.mkdir(parents=True)
        (unrelated / "SKILL.md").write_text("keep", encoding="utf-8")
        common = ("--kimi-code-home", str(home), "--source-root", str(SOURCE), "--share-root", str(share), "--state-root", str(state))
        p = invoke("--dry-run", *common)
        assert p.returncode == 0, p.stderr
        link = home / "skills" / "gstack-upgrade"
        writing_link = home / "skills" / "writing-skills"
        assert not link.exists() and not link.is_symlink()
        assert not writing_link.exists() and not writing_link.is_symlink()
        p = invoke("--apply", *common)
        assert p.returncode == 0, p.stderr
        assert link.is_symlink() and link.resolve() == pack / "skills" / "gstack-upgrade"
        assert writing_link.is_symlink() and writing_link.resolve() == home / "plugins" / "managed" / "superpowers" / "skills" / "writing-skills"
        assert (unrelated / "SKILL.md").read_text(encoding="utf-8") == "keep"
        assert invoke("--apply", *common).returncode == 0
        assert invoke("--check", *common).returncode == 0
        assert invoke("--rollback", *common).returncode == 0
        assert not link.exists() and not link.is_symlink()
        assert not writing_link.exists() and not writing_link.is_symlink()


def test_apply_migrates_exact_attested_v4_gstack_link() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-v4-migration-") as td:
        home, share, state, pack = fixture(Path(td))
        old_pack = pack.with_name(pack.name.replace("bridge-v5", "bridge-v4"))
        old_target = old_pack / "skills" / "gstack-upgrade"
        old_target.mkdir(parents=True)
        destination = home / "skills" / "gstack-upgrade"
        destination.parent.mkdir(parents=True)
        os.symlink(old_target, destination)
        common = ("--kimi-code-home", str(home), "--source-root", str(SOURCE), "--share-root", str(share), "--state-root", str(state))
        applied = invoke("--apply", *common)
        assert applied.returncode == 0, applied.stderr
        assert destination.is_symlink()
        assert destination.resolve() == pack / "skills" / "gstack-upgrade"


def test_foreign_occupants_divergent_links_and_symlink_components() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-") as td:
        home, share, state, pack = fixture(Path(td))
        common = ("--kimi-code-home", str(home), "--source-root", str(SOURCE), "--share-root", str(share), "--state-root", str(state))
        destination = home / "skills" / "gstack-upgrade"
        destination.parent.mkdir(parents=True)
        destination.write_text("foreign", encoding="utf-8")
        assert invoke("--apply", *common).returncode != 0
        destination.unlink()
        destination.parent.mkdir(parents=True, exist_ok=True)
        os.symlink(str(pack / "skills" / "other"), destination)
        assert invoke("--apply", *common).returncode != 0
        destination.unlink()
        outside = Path(td) / "outside"
        outside.mkdir()
        shutil.rmtree(destination.parent)
        os.symlink(outside, home / "skills")
        assert invoke("--apply", *common).returncode != 0


def test_failure_injection_rolls_back_owned_link() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-") as td:
        home, share, state, _ = fixture(Path(td))
        common = ("--apply", "--kimi-code-home", str(home), "--source-root", str(SOURCE), "--share-root", str(share), "--state-root", str(state))
        env = dict(os.environ)
        env["KIMI_SYNC_INJECT_FAILURE_AFTER"] = "1"
        p = invoke(*common, env=env)
        assert p.returncode != 0
        link = home / "skills" / "gstack-upgrade"
        assert not link.exists() and not link.is_symlink()
        writing_link = home / "skills" / "writing-skills"
        assert not writing_link.exists() and not writing_link.is_symlink()


def test_after_link_callback_rolls_back_all_new_links_and_preserves_replacements() -> None:
    with tempfile.TemporaryDirectory(prefix="kimi-upstream-callback-rollback-") as td:
        base = Path(td)
        home, share, state, _ = fixture(base)
        calls: list[str] = []

        def fail_after_second(event: str, path: Path) -> None:
            if event != "after-link":
                return
            calls.append(path.name)
            if len(calls) == 2:
                raise RuntimeError("deterministic after-link failure")

        try:
            sync.run("apply", home, SOURCE, share, state, REGISTRY, _test_hook=fail_after_second)
        except RuntimeError as exc:
            assert str(exc) == "deterministic after-link failure"
        else:
            raise AssertionError("after-link callback unexpectedly succeeded")

        assert calls == ["writing-skills", "gstack-upgrade"]
        assert not (home / "skills" / "writing-skills").exists()
        assert not (home / "skills" / "writing-skills").is_symlink()
        assert not (home / "skills" / "gstack-upgrade").exists()
        assert not (home / "skills" / "gstack-upgrade").is_symlink()

    with tempfile.TemporaryDirectory(prefix="kimi-upstream-callback-foreign-") as td:
        base = Path(td)
        home, share, state, _ = fixture(base)
        foreign_target = base / "foreign-target"
        foreign_target.mkdir()

        def replace_then_fail(event: str, path: Path) -> None:
            if event != "after-link":
                return
            path.unlink()
            os.symlink(str(foreign_target), path)
            raise RuntimeError("deterministic foreign replacement")

        try:
            sync.run("apply", home, SOURCE, share, state, REGISTRY, _test_hook=replace_then_fail)
        except RuntimeError as exc:
            assert str(exc) == "deterministic foreign replacement"
        else:
            raise AssertionError("foreign replacement callback unexpectedly succeeded")

        writing_link = home / "skills" / "writing-skills"
        assert writing_link.is_symlink()
        assert os.readlink(writing_link) == str(foreign_target)
        assert not (home / "skills" / "gstack-upgrade").exists()
        assert not (home / "skills" / "gstack-upgrade").is_symlink()


if __name__ == "__main__":
    tests = [value for name, value in globals().items() if name.startswith("test_") and callable(value)]
    for test in tests:
        test()
        print(f"PASS {test.__name__}")
