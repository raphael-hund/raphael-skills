#!/usr/bin/env python3
"""Deterministic, no-network checks for the upstream gstack bridge.

The real pinned checkout is only inspected or generated in the helper's
disposable clone.  Transaction tests use temporary roots and never touch a
user's HOME.
"""
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SYNC_PATH = ROOT / "tools" / "sync-codex-upstream-skills.py"
SOURCE = Path("/root/tools/vendor/gstack")


def load_sync():
    spec = importlib.util.spec_from_file_location("sync_upstream", SYNC_PATH)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sync = load_sync()
REGISTRY = sync.load_registry()


def expect_error(fn, needle: str | None = None) -> None:
    try:
        fn()
    except sync.SyncError as exc:
        if needle:
            assert needle.lower() in str(exc).lower(), (needle, exc)
        return
    raise AssertionError("expected SyncError")


def write_generated(root: Path, entries: list[dict[str, str]], root_entry: dict[str, str]) -> None:
    for entry in entries + [root_entry]:
        directory = root / entry["generated_name"]
        (directory / "agents").mkdir(parents=True)
        name = entry["source_name"]
        (directory / "SKILL.md").write_text(f"---\nname: {name}\ndescription: test\n---\nbody\n", encoding="utf-8")
        (directory / "agents" / "openai.yaml").write_text("interface:\n  display_name: test\n", encoding="utf-8")


def test_manifest_and_strict_bijection() -> None:
    commit = sync.validate_source_provenance(SOURCE, REGISTRY)
    assert commit == REGISTRY["repository"]["pinned_commit"]
    entries, root_entry = sync.derive_source_manifest(SOURCE, REGISTRY)
    assert len(entries) == 53
    assert len(entries) == REGISTRY["source_manifest"]["expected_prefixed_count"] == 53
    assert len(entries) + 1 == REGISTRY["source_manifest"]["expected_discoverable_count"] == REGISTRY["source_manifest"]["expected_generated_count"] == 54
    with tempfile.TemporaryDirectory(prefix="upstream-generated-") as td:
        generated = Path(td) / ".agents" / "skills"
        generated.mkdir(parents=True)
        write_generated(generated, entries, root_entry)
        sync.validate_generated(Path(td), REGISTRY, entries, root_entry)
        (generated / entries[0]["generated_name"]).rename(generated / "gstack-missing")
        expect_error(lambda: sync.validate_generated(Path(td), REGISTRY, entries, root_entry), "generated")
        (generated / "gstack-missing").rename(generated / entries[0]["generated_name"])
        extra = generated / "gstack-extra"
        (extra / "agents").mkdir(parents=True)
        (extra / "SKILL.md").write_text("---\nname: extra\n---\nbody\n", encoding="utf-8")
        (extra / "agents" / "openai.yaml").write_text("x\n", encoding="utf-8")
        expect_error(lambda: sync.validate_generated(Path(td), REGISTRY, entries, root_entry), "generated")


def test_duplicate_source_names() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-duplicate-") as td:
        checkout = Path(td)
        (checkout / "SKILL.md.tmpl").write_text("---\nname: gstack\n---\n", encoding="utf-8")
        for directory in ("one", "two"):
            (checkout / directory).mkdir()
            (checkout / directory / "SKILL.md.tmpl").write_text("---\nname: same\n---\n", encoding="utf-8")
        reg = json.loads(json.dumps(REGISTRY))
        reg["source_manifest"]["expected_prefixed_count"] = 2
        expect_error(lambda: sync.derive_source_manifest(checkout, reg), "duplicate")


def test_roots_foreign_and_rollback() -> None:
    for value in ("", "relative", "/", "/tmp", "/root", "/home"):
        expect_error(lambda value=value: sync.validate_root(value, "root"))
    with tempfile.TemporaryDirectory(prefix="upstream-links-") as td:
        base = Path(td)
        user, share, state = base / "user", base / "share", base / "state"
        destination = user / ".agents" / "skills" / "gstack-test"
        target_a = share / "gstack" / "a" / "skills" / "gstack-test"
        target_b = share / "gstack" / "b" / "skills" / "gstack-test"
        desired_a = [{"id": "one", "destination": str(destination), "target": str(target_a)}]
        sync.validate_graph(desired_a, None)
        # An unrecorded regular file is never overwritten.
        destination.parent.mkdir(parents=True)
        destination.write_text("foreign", encoding="utf-8")
        expect_error(lambda: sync.validate_graph(desired_a, None), "unrecorded")
        destination.unlink()
        # Injected failure removes run-created links and leaves no state.
        state_obj = {"schema_version": 1}
        old = os.environ.get("GSTACK_SYNC_INJECT_FAILURE_AFTER")
        os.environ["GSTACK_SYNC_INJECT_FAILURE_AFTER"] = "1"
        try:
            expect_error(lambda: sync.transactional_links(desired_a, state / "state.json", state_obj, None, None), "injected")
        finally:
            if old is None:
                os.environ.pop("GSTACK_SYNC_INJECT_FAILURE_AFTER", None)
            else:
                os.environ["GSTACK_SYNC_INJECT_FAILURE_AFTER"] = old
        assert not destination.exists() and not destination.is_symlink()
        assert not (state / "state.json").exists()
        # Idempotence and attested stale-target repair.
        sync.transactional_links(desired_a, state / "state.json", state_obj, None, None)
        before = (state / "state.json").read_bytes()
        sync.transactional_links(desired_a, state / "state.json", state_obj, before, state_obj)
        assert (state / "state.json").read_bytes() == before
        destination.unlink()
        os.symlink(str(target_b), destination)
        previous = {"links": [{"id": "one", "destination": str(destination), "target": str(target_b)}]}
        desired_b = [{"id": "one", "destination": str(destination), "target": str(target_a)}]
        sync.validate_graph(desired_b, previous)
        sync.transactional_links(desired_b, state / "state.json", state_obj, before, previous)
        assert sync._read_current_link(destination) == str(target_a.resolve())


def test_component_symlinks_and_concurrent_replacement_are_fail_closed() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-hardening-") as td:
        base = Path(td)
        outside = base / "outside"
        outside.mkdir()
        user = base / "user"
        user.mkdir()
        os.symlink(outside, user / ".agents")
        destination = user / ".agents" / "skills" / "gstack-test"
        desired = [{"id": "one", "destination": str(destination), "target": str(base / "pack" / "skill")}]
        expect_error(lambda: sync.validate_graph(desired, None), "symlinked component")

        safe_user = base / "safe-user"
        raced_destination = safe_user / ".agents" / "skills" / "gstack-test"
        raced_desired = [{"id": "one", "destination": str(raced_destination), "target": str(base / "pack" / "skill")}]
        state_path = base / "state" / "state.json"
        old = os.environ.get("GSTACK_SYNC_INJECT_FAILURE_AFTER")
        os.environ["GSTACK_SYNC_INJECT_FAILURE_AFTER"] = "1"

        def replace_created(_event: str, path: Path) -> None:
            path.unlink()
            os.symlink(str(base / "foreign-target"), path)

        try:
            expect_error(
                lambda: sync.transactional_links(
                    raced_desired,
                    state_path,
                    {"schema_version": 1},
                    None,
                    None,
                    _test_hook=replace_created,
                ),
                "preserved foreign objects",
            )
        finally:
            if old is None:
                os.environ.pop("GSTACK_SYNC_INJECT_FAILURE_AFTER", None)
            else:
                os.environ["GSTACK_SYNC_INJECT_FAILURE_AFTER"] = old
        assert raced_destination.is_symlink()
        assert os.readlink(raced_destination) == str(base / "foreign-target")

        # Descendant symlinks below state/share roots are rejected before a
        # write can be redirected outside the selected roots.
        share = base / "share"
        share.mkdir()
        os.symlink(outside, share / "gstack")
        expect_error(lambda: sync._ensure_dir(share / "gstack" / "nested"), "unsafe directory component")
        state = base / "state-safe"
        state.mkdir()
        os.symlink(outside, state / "raphael-codex-skills")
        expect_error(lambda: sync._ensure_dir(state / "raphael-codex-skills"), "unsafe directory component")


def test_temp_apply_has_exact_unique_live_catalog() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-apply-") as td:
        base = Path(td)
        user, share, state = base / "user", base / "share", base / "state"
        command = [
            "python3", str(SYNC_PATH), "--apply", "--source-root", str(SOURCE),
            "--user-root", str(user), "--share-root", str(share), "--state-root", str(state),
        ]
        proc = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
        assert proc.returncode == 0, proc.stderr
        state_obj = json.loads((state / "raphael-codex-skills" / "upstream-links.json").read_text(encoding="utf-8"))
        pack = Path(state_obj["pack_root"])
        ids = {item["id"] for item in state_obj["links"]}
        assert "discovery:gstack-router" in ids
        assert "root-skill" not in ids and "root-manifest" not in ids
        router = user / ".agents" / "skills" / "gstack-router"
        assert router.is_symlink() and (router / "SKILL.md").is_file()
        assert sync._frontmatter_name(router / "SKILL.md") == "gstack"
        assert not (user / ".agents" / "skills" / "gstack" / "SKILL.md").exists()
        runtime_documents = list((pack / "runtime").rglob("SKILL.md")) + list((pack / "runtime").rglob("SKILL.md.tmpl"))
        assert runtime_documents == []
        sync.validate_live_catalog(state_obj["links"], 54)
        upgrade_runtime = user / ".codex" / "skills" / "gstack" / "gstack-upgrade" / "SKILL.md"
        assert upgrade_runtime.is_file()
        assert not (user / ".agents" / "skills" / "gstack-upgrade").exists()
        upgrade_link = next(item for item in state_obj["links"] if item["id"] == "global-runtime:gstack-upgrade")
        assert Path(upgrade_link["target"]) == pack / "skills" / "gstack-upgrade"
        missing_targets = [item for item in state_obj["links"] if not Path(item["target"]).exists()]
        assert not missing_targets, missing_targets
        generated_documents = [pack / "root" / "SKILL.md", *sorted((pack / "skills").glob("*/SKILL.md"))]
        referencing_upgrade = [path for path in generated_documents if "$GSTACK_ROOT/gstack-upgrade/SKILL.md" in path.read_text(encoding="utf-8")]
        assert referencing_upgrade and upgrade_runtime.is_file()
        documents = [pack / "root" / "SKILL.md", *sorted((pack / "skills").glob("*/SKILL.md"))]
        identities = [sync._frontmatter_name(path) for path in documents]
        assert len(documents) == len(identities) == len(set(identities)) == 54


def test_pack_promotion_parent_swap_cannot_redirect_writes() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-promotion-") as td:
        base = Path(td)
        share_parent = base / "share" / "gstack"
        share_parent.mkdir(parents=True)
        pack_stage = base / "pack-stage"
        pack_stage.mkdir()
        (pack_stage / "payload.txt").write_text("trusted\n", encoding="utf-8")
        digest = sync._tree_hash(pack_stage)
        marker = {
            "schema_version": sync.SCHEMA_VERSION,
            "helper_id": REGISTRY["helper_id"],
            "helper_version": REGISTRY["helper_version"],
            "pinned_commit": REGISTRY["repository"]["pinned_commit"],
            "registry_sha256": sync.registry_hash(),
            "generated_discoverable_count": 54,
            "tree_sha256": digest,
        }
        (pack_stage / REGISTRY["pack"]["manifest_file"]).write_bytes(sync._json_bytes(marker))
        pack = share_parent / "test-pack"
        moved_parent = base / "share" / "gstack-moved"
        outside = base / "outside"
        outside.mkdir()

        def swap_parent(_event: str, path: Path) -> None:
            path.rename(moved_parent)
            os.symlink(outside, path)

        expect_error(
            lambda: sync.promote_pack(pack_stage, pack, share_parent, digest, REGISTRY, _test_hook=swap_parent),
            "parent changed",
        )
        assert list(outside.iterdir()) == []
        assert not (moved_parent / pack.name).exists()
        assert not list(moved_parent.glob(".test-pack.staging-*"))


def test_cleanup_child_directory_swap_preserves_replacement() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-cleanup-race-") as td:
        root = Path(td)
        stage = root / "stage"
        child = stage / "child"
        child.mkdir(parents=True)
        (child / "owned.txt").write_text("owned\n", encoding="utf-8")
        parent_fd = sync._open_directory_fd(root, create=False)
        stage_st = os.stat("stage", dir_fd=parent_fd, follow_symlinks=False)
        swapped = False

        def swap_child(_event: str, directory_fd: int, name: str) -> None:
            nonlocal swapped
            if swapped or name != "child":
                return
            swapped = True
            os.rename("child", "old-child", src_dir_fd=directory_fd, dst_dir_fd=directory_fd)
            os.mkdir("child", dir_fd=directory_fd)
            flags = os.O_RDONLY | os.O_DIRECTORY
            if hasattr(os, "O_NOFOLLOW"):
                flags |= os.O_NOFOLLOW
            replacement_fd = os.open("child", flags, dir_fd=directory_fd)
            try:
                file_fd = os.open("foreign.txt", os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600, dir_fd=replacement_fd)
                os.close(file_fd)
            finally:
                os.close(replacement_fd)

        try:
            removed = sync._remove_tree_at(
                parent_fd,
                "stage",
                (stage_st.st_dev, stage_st.st_ino),
                _test_hook=swap_child,
            )
        finally:
            os.close(parent_fd)
        assert not removed
        assert swapped
        assert (stage / "child" / "foreign.txt").is_file()
        assert (stage / "old-child" / "owned.txt").is_file()


def test_default_dry_run_is_non_mutating() -> None:
    with tempfile.TemporaryDirectory(prefix="upstream-dry-") as td:
        base = Path(td)
        user, share, state = base / "user", base / "share", base / "state"
        proc = subprocess.run(
            ["python3", str(SYNC_PATH), "--source-root", str(SOURCE), "--user-root", str(user), "--share-root", str(share), "--state-root", str(state)],
            cwd=ROOT, text=True, capture_output=True,
        )
        assert proc.returncode == 0, proc.stderr
        assert not user.exists() and not share.exists() and not state.exists()


def main() -> int:
    test_manifest_and_strict_bijection()
    test_duplicate_source_names()
    test_roots_foreign_and_rollback()
    test_component_symlinks_and_concurrent_replacement_are_fail_closed()
    test_temp_apply_has_exact_unique_live_catalog()
    test_pack_promotion_parent_swap_cannot_redirect_writes()
    test_cleanup_child_directory_swap_preserves_replacement()
    test_default_dry_run_is_non_mutating()
    print("Codex upstream bridge tests: OK (54 generated skills; 53 gstack-* identities + root)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
