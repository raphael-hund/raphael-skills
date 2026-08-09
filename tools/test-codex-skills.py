#!/usr/bin/env python3
"""Deterministic, dependency-free checks for the Codex adapter registry.

This is intentionally a plain executable test (rather than a pytest suite) so
CI and a fresh Codex installation can run it with ``python3`` alone.  It
expects native files to have been supplied by their owning executor; source
adapters are checked byte-for-byte against the builder.
"""
from __future__ import annotations

import importlib.util
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SYNC_PATH = REPO_ROOT / "tools" / "sync-codex-skills.py"
COMPAT_PATH = REPO_ROOT / "codex" / "compatibility.json"
CANONICAL_REPO = "/root/raphael-skills"
NATIVE_THREAD = {"dynamic-workflow", "orchestrate", "sdd"}
NATIVE_EXTERNAL = {"kimi-sol"}
BANNED_NATIVE_TOKENS = (
    "spawn_agent",
    "send_message",
    "followup_task",
    "wait_agent",
    "interrupt_agent",
)
REQUIRED_THREAD_TOOLS = (
    "list_projects",
    "create_thread",
    "list_threads",
    "wait_threads",
    "send_message_to_thread",
    "read_thread",
)


def load_sync():
    spec = importlib.util.spec_from_file_location("sync_codex_skills", SYNC_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"sync script not importable: {SYNC_PATH}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sync = load_sync()


class Checks:
    def __init__(self) -> None:
        self.failures: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        if not condition:
            self.failures.append(message)

    def report(self) -> int:
        if self.failures:
            print("Codex adapter tests: FAIL")
            for failure in self.failures:
                print(f"  - {failure}")
            return 1
        print("Codex adapter tests: OK")
        return 0


def run(command: list[str], home: Path, *, extra_env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    env = os.environ.copy()
    env["HOME"] = str(home)
    if extra_env:
        env.update(extra_env)
    return subprocess.run(command, cwd=REPO_ROOT, env=env, text=True, capture_output=True)


def generated_description(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    fm = sync.parse_top_level_keys(sync.extract_frontmatter(text) or [])
    return fm.get("description", {}).get("raw", "").strip()


def source_trigger_candidates(description: str) -> list[str]:
    """Extract quoted trigger phrases and standalone slash commands.

    Slash commands inside a quoted natural phrase (for example ``"vor
    /clear"``) remain part of that phrase; a separately quoted ``"/clear"``
    still yields the exact slash candidate.
    """
    match = re.search(r"Trigger(?:-Worte)?\s*:\s*", description, re.IGNORECASE)
    if not match:
        return []
    segment = description[match.end():]
    candidates: list[str] = []
    spans: list[tuple[int, int]] = []
    for quoted in re.finditer(r'"([^"]+)"', segment):
        value = quoted.group(1).strip()
        if value:
            candidates.append(value)
        spans.append(quoted.span())
    unquoted = re.sub(r'"[^"]+"', " ", segment)
    for slash in re.finditer(r"(?<![-A-Za-z0-9_])/[A-Za-z][A-Za-z0-9-]*", unquoted):
        candidates.append(slash.group(0))
    return list(dict.fromkeys(candidates))


def check_registry_and_sources(c: Checks, registry: dict[str, dict]) -> tuple[dict, dict]:
    source_paths = sync.source_files()
    source_names: list[str] = []
    for path in source_paths:
        sf = sync.validate_skill_file(path)
        c.check(sf.ok, f"source validation failed: {path}: {sf.errors}")
        fm = sync.parse_top_level_keys(sync.extract_frontmatter(path.read_text(encoding="utf-8")) or [])
        source_names.append(fm.get("name", {}).get("raw", "").strip())
    c.check(len(source_names) == len(set(source_names)), "source skill names are not unique")
    source_registry = {
        name for name, entry in registry.items()
        if entry.get("mode") != "native-external-review"
    }
    c.check(len(source_paths) == len(source_registry), f"source/registry count differs: {len(source_paths)} vs {len(source_registry)}")
    c.check(set(source_names) == source_registry, "registry/source name sets differ")
    for name, entry in registry.items():
        c.check(entry.get("mode") in {"source-adapter", "canonical-link", "native-thread", "native-external-review"}, f"{name}: invalid mode")
        c.check(bool(entry.get("rationale", "").strip()), f"{name}: empty rationale")
        triggers = entry.get("triggers")
        c.check(isinstance(triggers, list) and bool(triggers), f"{name}: empty trigger array")
        source = REPO_ROOT / entry.get("source", "")
        c.check(source.is_file(), f"{name}: source path missing: {source}")
        if name in NATIVE_THREAD:
            expected_mode = "native-thread"
        elif name in NATIVE_EXTERNAL:
            expected_mode = "native-external-review"
        elif name == "web":
            expected_mode = "canonical-link"
        else:
            expected_mode = "source-adapter"
        c.check(entry.get("mode") == expected_mode, f"{name}: wrong mode (expected {expected_mode})")
        if name not in NATIVE_EXTERNAL:
            description = sync.parse_top_level_keys(sync.extract_frontmatter(source.read_text(encoding="utf-8")) or []).get("description", {}).get("raw", "")
            for candidate in source_trigger_candidates(description):
                c.check(candidate in triggers, f"{name}: source trigger candidate missing from registry: {candidate!r}")
    return registry, {
        name: REPO_ROOT / entry["source"]
        for name, entry in registry.items()
        if entry.get("mode") != "native-external-review"
    }


def check_generated(c: Checks, registry: dict[str, dict], sources: dict[str, Path]) -> None:
    expected = sync.expected_files(registry, {name: (path, sync.parse_top_level_keys(sync.extract_frontmatter(path.read_text(encoding="utf-8")) or [])) for name, path in sources.items()})
    for path, content in expected.items():
        c.check(path.is_file(), f"missing generated file: {path}")
        if path.is_file():
            c.check(path.read_text(encoding="utf-8") == content, f"generated content drift: {path}")
    for name, entry in registry.items():
        skill_dir = REPO_ROOT / "codex" / "skills" / name
        skill_file = skill_dir / "SKILL.md"
        manifest = skill_dir / "agents" / "openai.yaml"
        c.check(skill_file.is_file(), f"{name}: adapter SKILL.md missing")
        c.check(manifest.is_file(), f"{name}: agents/openai.yaml missing")
        if not skill_file.is_file():
            continue
        adapter_text = skill_file.read_text(encoding="utf-8")
        if entry["mode"] == "source-adapter":
            source_abs = f"{CANONICAL_REPO}/{entry['source']}"
            c.check(source_abs in adapter_text, f"{name}: canonical absolute source path missing")
            source_file = Path(source_abs)
            c.check(source_file.is_file(), f"{name}: canonical source path unreadable")
            desc = generated_description(skill_file)
            stale = sync._has_stale_token(desc)
            c.check(stale is None, f"{name}: stale token in description: {stale}")
            c.check("<" not in desc and ">" not in desc, f"{name}: angle bracket in description")
            for trigger in entry["triggers"]:
                normalized = sync.normalize_trigger(name, trigger, entry)
                c.check(normalized in desc, f"{name}: normalized trigger absent from description: {normalized!r}")
        elif entry["mode"] == "canonical-link":
            c.check(skill_dir.is_symlink(), f"{name}: canonical repository bridge is not a symlink")
            if skill_dir.is_symlink():
                c.check(os.readlink(skill_dir) == "../../skills/eigene/web", f"{name}: canonical repository bridge target drift")
            source_file = REPO_ROOT / entry["source"]
            c.check(skill_file.resolve() == source_file.resolve(), f"{name}: bridge does not resolve to canonical source")
            c.check(skill_file.read_bytes() == source_file.read_bytes(), f"{name}: bridge bytes differ from canonical source")
            c.check(not sync.validate_canonical_link(name, entry), f"{name}: canonical-link validator failed")
            c.check("Codex source adapter" not in adapter_text, f"{name}: adapter prose remains")
        elif entry["mode"] == "native-thread":
            native_dir = skill_dir
            native_texts = [
                path.read_text(encoding="utf-8", errors="replace")
                for path in native_dir.rglob("*")
                if path.is_file()
            ]
            c.check(bool(native_texts), f"{name}: native skill directory has no readable files")
            check_native(c, name, "\n".join(native_texts), entry)
            if name == "dynamic-workflow":
                c.check((native_dir / "references" / "thread-muster.md").is_file(), "dynamic-workflow: thread-muster reference missing")
        else:
            lowered = adapter_text.lower()
            c.check(name == "kimi-sol", f"{name}: unexpected native external-review skill")
            for status in ("not_ready", "approval_required", "reviewer_unavailable", "malformed_artifact", "verified"):
                c.check(status in lowered, f"{name}: external-review status missing {status}")
            c.check("external-model" in lowered, f"{name}: audited External-Model contract missing")
            for trigger in entry["triggers"]:
                c.check(trigger in adapter_text, f"{name}: native external trigger absent: {trigger!r}")
        if manifest.is_file():
            check_manifest(c, name, manifest.read_text(encoding="utf-8"))
    stale = sync.stale_adapter_paths(registry)
    c.check(not stale, "stale adapter directories detected: " + ", ".join(map(str, stale)))


def check_manifest(c: Checks, name: str, text: str) -> None:
    values: dict[str, str] = {}
    c.check(re.search(r"^interface:\s*$", text, re.MULTILINE) is not None, f"{name}: manifest interface block missing")
    for line in text.splitlines():
        match = re.match(r"^\s{2}(display_name|short_description|default_prompt):\s*([\"'])(.*)\2\s*$", line)
        if match:
            values[match.group(1)] = match.group(3)
    for key in ("display_name", "short_description", "default_prompt"):
        c.check(key in values, f"{name}: manifest field {key} missing or unquoted")
    if "short_description" in values:
        c.check(25 <= len(values["short_description"]) <= 64, f"{name}: short_description not 25..64 chars")
    if "default_prompt" in values:
        c.check(f"${name}" in values["default_prompt"], f"{name}: default_prompt does not name ${name}")


def check_native(c: Checks, name: str, text: str, entry: dict) -> None:
    lowered = text.lower()
    for token in BANNED_NATIVE_TOKENS:
        # ``send_message_to_thread`` is an allowed native API and contains
        # ``send_message`` as a substring, so inspect identifier boundaries.
        forbidden = re.search(r"(?<![a-z0-9_])" + re.escape(token) + r"(?![a-z0-9_])", lowered)
        c.check(forbidden is None, f"{name}: forbidden agent/tool token present: {token}")
    for tool in REQUIRED_THREAD_TOOLS:
        c.check(tool in text, f"{name}: native thread tool contract missing {tool}")
    c.check("queued" in lowered or "eingereiht" in lowered, f"{name}: queued clientThreadId reconciliation missing")
    c.check("clientthreadid" in lowered, f"{name}: clientThreadId reconciliation missing")
    c.check(re.search(r"max\s*8|höchstens\s+acht|at\s+most\s+eight", lowered) is not None, f"{name}: max-8 thread limit missing")
    c.check("cursor" in lowered, f"{name}: cursor pagination requirement missing")
    model_omission = re.search(r"(?:omit|omission|without|ohne)[^\n]{0,50}\bmodel\b", lowered)
    model_omission = model_omission or ("model" in lowered and ("weg" in lowered or "weglassen" in lowered))
    c.check(model_omission is not None, f"{name}: model omission rule missing")
    c.check("approval" in lowered or "freigabe" in lowered, f"{name}: approval handling missing")
    c.check("::created-thread{threadid=" in lowered, f"{name}: threadId created-thread directive missing")
    c.check("::created-thread{clientthreadid=" in lowered, f"{name}: clientThreadId created-thread directive missing")
    # Registry aliases are the audited bridge from source wording to native
    # Codex wording; every normalized trigger must remain discoverable.
    for trigger in entry["triggers"]:
        normalized = sync.normalize_trigger(name, trigger, entry)
        c.check(normalized in text, f"{name}: native trigger alias absent: {normalized!r}")


def check_install_contract(c: Checks, registry: dict[str, dict]) -> None:
    names = sorted(registry)
    command = [sys.executable, str(SYNC_PATH), "--install"]
    with tempfile.TemporaryDirectory(prefix="raphael-codex-test-") as temp:
        home = Path(temp)
        dry = run(command + ["--dry-run"], home)
        c.check(dry.returncode == 0, f"install dry-run failed: {dry.stdout}{dry.stderr}")
        c.check(not (home / ".agents" / "skills").exists(), "dry-run created HOME files")

        real = run(command, home)
        c.check(real.returncode == 0, f"real install failed: {real.stdout}{real.stderr}")
        root = home / ".agents" / "skills"
        for name in names:
            target = root / name
            c.check(target.is_symlink(), f"installed manifest name is not a symlink: {name}")
            if target.is_symlink():
                c.check(Path(target).exists(), f"installed symlink is broken: {name}")
                c.check(os.readlink(target) == str(REPO_ROOT / "codex" / "skills" / name), f"{name}: symlink target is not direct repository skill path")
        again = run(command, home)
        c.check(again.returncode == 0, f"idempotent install failed: {again.stdout}{again.stderr}")

        foreign_home = home / "foreign"
        foreign_root = foreign_home / ".agents" / "skills"
        foreign_root.mkdir(parents=True)
        (foreign_root / "foreign-skill").write_text("leave me", encoding="utf-8")
        foreign_install = run(command, foreign_home)
        c.check(foreign_install.returncode == 0, f"foreign entry blocked install: {foreign_install.stdout}{foreign_install.stderr}")
        c.check((foreign_root / "foreign-skill").read_text(encoding="utf-8") == "leave me", "foreign skill was modified")
        c.check(all((foreign_root / name).is_symlink() for name in names), "foreign entry install did not create all manifest links")

        conflict_home = home / "conflict"
        conflict_root = conflict_home / ".agents" / "skills"
        conflict_root.mkdir(parents=True)
        (conflict_root / "ads").write_text("foreign manifest name", encoding="utf-8")
        conflict = run(command, conflict_home)
        c.check(conflict.returncode != 0, "manifest-name file conflict unexpectedly succeeded")
        c.check((conflict_root / "ads").read_text(encoding="utf-8") == "foreign manifest name", "conflicting skill was modified")
        c.check(not any((conflict_root / name).is_symlink() for name in names if name != "ads"), "conflict preflight created partial links")

        injected_home = home / "injected"
        injected_home.mkdir()
        injected = run(command, injected_home, extra_env={"RAPHAEL_CODEX_TESTING": "1", "RAPHAEL_CODEX_FAIL_AFTER": "2"})
        c.check(injected.returncode != 0, "injected install unexpectedly succeeded")
        injected_root = injected_home / ".agents" / "skills"
        c.check(not any((injected_root / name).is_symlink() for name in names), "injected install did not roll back all links")

        post_create_home = home / "post-create"
        post_create_home.mkdir()
        post_create = run(
            command,
            post_create_home,
            extra_env={"RAPHAEL_CODEX_TESTING": "1", "RAPHAEL_CODEX_FAIL_POST_CREATE": "1"},
        )
        c.check(post_create.returncode != 0, "post-create failure injection unexpectedly succeeded")
        post_create_root = post_create_home / ".agents" / "skills"
        c.check(
            not any((post_create_root / name).is_symlink() for name in names),
            "post-create failure left a manifest link behind",
        )

        # Swap the pathname after the installer has opened its no-follow
        # descriptor. Writes must remain anchored to that descriptor and must
        # never land in the attacker-controlled replacement directory.
        swapped_home = home / "swapped"
        swapped_root = swapped_home / ".agents" / "skills"
        swapped_root.mkdir(parents=True)
        held_root = swapped_home / ".agents" / "skills-held"
        outside = home / "swap-outside"
        outside.mkdir()
        original_link = sync.os.link
        swapped = False

        def swap_parent_then_link(*args, **kwargs):
            nonlocal swapped
            if not swapped:
                swapped = True
                swapped_root.rename(held_root)
                os.symlink(outside, swapped_root)
            return original_link(*args, **kwargs)

        previous_home = os.environ.get("HOME")
        try:
            os.environ["HOME"] = str(swapped_home)
            sync.os.link = swap_parent_then_link
            swapped_result = sync.install()
        finally:
            sync.os.link = original_link
            if previous_home is None:
                os.environ.pop("HOME", None)
            else:
                os.environ["HOME"] = previous_home
        c.check(swapped_result == 0, "parent-swap install failed instead of remaining fd-anchored")
        c.check(swapped, "parent-swap hook was not exercised")
        c.check(not list(outside.iterdir()), "parent-swap redirected writes outside the held directory")
        c.check(all((held_root / name).is_symlink() for name in names), "fd-anchored directory did not receive every link")

        relative_home = run(command, Path("relative-home"))
        c.check(relative_home.returncode != 0, "relative HOME unexpectedly accepted")

        redirected_home = home / "redirected"
        redirected_target = home / "redirect-target"
        redirected_target.mkdir()
        redirected_home.mkdir()
        os.symlink(redirected_target, redirected_home / ".agents")
        redirected = run(command, redirected_home)
        c.check(redirected.returncode != 0, "symlinked .agents root unexpectedly accepted")
        c.check(not any(redirected_target.iterdir()), "symlinked .agents root received writes")

        # Follow one installed adapter and prove that its embedded canonical
        # source path is readable; this catches links to copied/generated text.
        adapter_name = names[0]
        adapter = root / adapter_name / "SKILL.md"
        text = adapter.read_text(encoding="utf-8")
        match = re.search(r"`(/root/raphael-skills/[^`]+/SKILL\.md)`", text)
        c.check(match is not None, f"{adapter_name}: installed adapter has no absolute source path")
        if match:
            c.check(Path(match.group(1)).is_file(), f"{adapter_name}: embedded source path unreadable")
            c.check("Read/Bash" in text and "AskUserQuestion" in text, f"{adapter_name}: Codex mapping contract missing")


def main() -> int:
    c = Checks()
    try:
        registry = sync.load_registry()
        strict_sources = sync.inspect_sources(registry)
        registry, sources = check_registry_and_sources(c, registry)
        c.check(set(strict_sources) == set(sources), "strict source inspection differs from test inventory")
        # The builder itself is the oracle for exact generated bytes.
        check_generated(c, registry, sources)
        if not c.failures:
            check_install_contract(c, registry)
    except Exception as exc:
        c.failures.append(f"test harness error: {exc}")
    return c.report()


if __name__ == "__main__":
    raise SystemExit(main())
