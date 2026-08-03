#!/usr/bin/env python3
"""Dependency-free deterministic tests for the Kimi adapter registry."""
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
SYNC_PATH = REPO_ROOT / "tools" / "sync-kimi-skills.py"
KIMI_COMPAT_PATH = REPO_ROOT / "kimi" / "compatibility.json"
CODEX_COMPAT_PATH = REPO_ROOT / "codex" / "compatibility.json"
NATIVE_AGENT = {"dynamic-workflow", "orchestrate", "sdd", "ultra-loop", "kimi-first"}
NATIVE_REVIEW = {"kimi-sol"}
NO_LEGACY_THREAD_WORDING = re.compile(r"\bcodex[- ](?:thread|task)s?\b", re.IGNORECASE)
KIMI_0281_TODO_FIELDS = {"title", "status"}
KIMI_0281_TODO_STATUSES = {"pending", "in_progress", "done"}


def load_sync():
    spec = importlib.util.spec_from_file_location("sync_kimi_skills", SYNC_PATH)
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
            print("Kimi adapter tests: FAIL")
            for failure in self.failures:
                print(f"  - {failure}")
            return 1
        print("Kimi adapter tests: OK")
        return 0


def run(command: list[str], home: Path, *, extra_env: dict[str, str] | None = None) -> subprocess.CompletedProcess[str]:
    env = os.environ.copy()
    env["HOME"] = str(home)
    env.pop("KIMI_CODE_HOME", None)
    if extra_env:
        env.update(extra_env)
    return subprocess.run(command, cwd=REPO_ROOT, env=env, text=True, capture_output=True)


def check_registry(c: Checks, registry: dict[str, dict]) -> None:
    codex = json.loads(CODEX_COMPAT_PATH.read_text(encoding="utf-8"))["skills"]
    kimi_json = json.loads(KIMI_COMPAT_PATH.read_text(encoding="utf-8"))
    c.check(len(registry) == len(codex), f"Kimi/Codex inventory count differs: {len(registry)} vs {len(codex)}")
    mapped = {name: entry.get("codex_name", name) for name, entry in registry.items()}
    c.check(set(mapped.values()) == set(codex) and len(set(mapped.values())) == len(mapped), "Kimi registry is not bijective with Codex inventory")
    c.check(kimi_json.get("target") == "kimi-code-0.28.1", "Kimi target is not pinned to 0.28.1")
    for name, entry in registry.items():
        mode = entry["mode"]
        expected_mode = sync._native_mode(name, codex[mapped[name]])
        c.check(mode == expected_mode, f"{name}: mode {mode!r}, expected {expected_mode!r}")
        codex_name = mapped[name]
        c.check(entry["source"] == (f"kimi/skills/{name}/SKILL.md" if name in NATIVE_AGENT | NATIVE_REVIEW else codex[codex_name]["source"]), f"{name}: source mismatch")
        c.check(isinstance(entry.get("triggers"), list) and bool(entry["triggers"]), f"{name}: missing inherited trigger audit")


def check_frontmatter(c: Checks, registry: dict[str, dict]) -> None:
    sources = sync._source_entries(registry)
    expected = sync.expected_files(registry, sources)
    for path, content in expected.items():
        c.check(path.is_file(), f"missing generated adapter: {path}")
        if path.is_file():
            c.check(path.read_text(encoding="utf-8") == content, f"generated adapter drift: {path}")
            c.check(sync.validate_kimi_skill(path, path.parent.name) == [], f"invalid Kimi frontmatter: {path}")
            text = path.read_text(encoding="utf-8")
            c.check(NO_LEGACY_THREAD_WORDING.search(text) is None, f"legacy Codex-thread wording leaked: {path}")
            c.check("Read the complete canonical source file" in text, f"canonical source instruction missing: {path}")
            for tool in sync.KIMI_TOOLS:
                c.check(tool in text, f"{path}: Kimi mapping missing {tool}")
    for name, entry in registry.items():
        path = REPO_ROOT / entry["source"]
        c.check(path.is_file(), f"registered native/source path missing: {path}")
        if entry["mode"] == "canonical-link":
            bridge = REPO_ROOT / "kimi" / "skills" / name
            c.check(bridge.is_symlink(), f"{name}: canonical repository bridge is not a symlink")
            if bridge.is_symlink():
                c.check(os.readlink(bridge) == sync.canonical_bridge_target(entry), f"{name}: canonical repository bridge target drift")
            c.check((bridge / "SKILL.md").resolve() == path.resolve(), f"{name}: bridge does not resolve to canonical source")
            c.check(not sync.validate_canonical_link(name, entry), f"{name}: canonical-link validator failed")
        elif entry["mode"] != "source-adapter" and path.is_file():
            c.check(sync.validate_native_skill(name, path, entry["mode"]) == [], f"invalid native Kimi skill: {path}")
    c.check(not sync.stale_adapter_paths(registry), "unregistered Kimi skill directory present")
    codex_first = (REPO_ROOT / "kimi" / "skills" / "codex-first" / "SKILL.md").read_text(encoding="utf-8")
    c.check("Codex-CLI" in codex_first and "codex exec" in codex_first, "codex-first external Codex route was neutralized")
    writing = (REPO_ROOT / "kimi" / "skills" / "raphael-writing-skills" / "SKILL.md").read_text(encoding="utf-8")
    c.check("does not require agents/openai.yaml" in writing, "Kimi writing-skills metadata contract is wrong")


def check_native_runtime_contracts(c: Checks) -> None:
    """Lock skills to the captured Kimi Code 0.28.1 runtime schemas."""
    native_names = NATIVE_AGENT | NATIVE_REVIEW
    texts = {
        name: (REPO_ROOT / "kimi" / "skills" / name / "SKILL.md").read_text(encoding="utf-8")
        for name in native_names
    }
    for name, text in texts.items():
        lowered = text.lower()
        c.check(all(field in lowered for field in KIMI_0281_TODO_FIELDS), f"{name}: captured TodoList fields missing")
        c.check(all(status in lowered for status in KIMI_0281_TODO_STATUSES), f"{name}: captured TodoList statuses missing")
        c.check("genau ein" in lowered or "exactly one" in lowered, f"{name}: exactly-one in_progress rule missing")

    for name in NATIVE_AGENT:
        lowered = texts[name].lower()
        c.check(".kimi/workflows/<run-id>.json" in lowered and "atom" in lowered, f"{name}: atomic workspace ledger missing")
        c.check("resume_agent_ids" in lowered and "resume" in lowered, f"{name}: Agent/AgentSwarm resume contract missing")
        c.check(bool(re.search(r"do not (?:call|use).*agent.*agentswarm", lowered, re.DOTALL)), f"{name}: descendant dispatch prohibition missing")

    for name in {"dynamic-workflow", "orchestrate", "sdd", "ultra-loop"}:
        lowered = texts[name].lower()
        c.check("best_effort_authorized" in lowered and "resume" in lowered, f"{name}: task-scoped best-effort resume latch missing")

    dynamic_blocks = re.findall(r"```json\n(.*?)\n```", texts["dynamic-workflow"], flags=re.DOTALL)
    ledger = None
    for block in dynamic_blocks:
        try:
            candidate = json.loads(block)
        except json.JSONDecodeError:
            continue
        if isinstance(candidate, dict) and isinstance(candidate.get("nodes"), dict):
            ledger = candidate
            break
    c.check(ledger is not None, "dynamic-workflow: parseable DAG ledger example missing")
    if ledger is not None:
        nodes = ledger["nodes"]
        c.check(2 <= len(nodes) <= 6, "dynamic-workflow: example is not a 2-6 node DAG")
        c.check(any(node.get("deps") for node in nodes.values() if isinstance(node, dict)), "dynamic-workflow: example has no dependency edge")

    sdd = texts["sdd"].lower()
    c.check("focused red" in sdd and "non-tdd" in sdd and "bereits gruener test" in sdd, "sdd: fail-closed Red/exception contract missing")
    c.check(bool(re.search(r"nach jedem.*fix.*green.*bevor beide reviews", sdd, re.DOTALL)), "sdd: Green-after-every-fix contract missing")

    kimi_sol = texts["kimi-sol"]
    lowered_sol = kimi_sol.lower()
    exact_triggers = ["/kimi-sol", "Kimi→Sol", "Kimi -> Sol", "Kimi mit Sol prüfen", "Kimi mit Sol pruefen"]
    c.check(all(trigger.lower() in lowered_sol for trigger in exact_triggers), "kimi-sol: exact trigger inventory missing")
    c.check("generische Review-Wuensche" in kimi_sol and "aktivieren diesen Skill nicht" in kimi_sol, "kimi-sol: negative trigger isolation missing")
    c.check(all(marker in kimi_sol for marker in ("SOL_SUBAGENT_STATUS", "SOL_SUBAGENT_SEAT", "SOL_SUBAGENT_OUTPUT", "SOL_SUBAGENT_FINAL_B64")), "kimi-sol: runner evidence fields missing")
    c.check("run-sol.sh" in kimi_sol and "`read`" in kimi_sol, "kimi-sol: read-only runner contract missing")
    c.check("frischen Einmalfreigabe" in kimi_sol or "frische Einmalfreigabe" in kimi_sol, "kimi-sol: fresh one-call approval missing")
    c.check(re.search(r"(?m)^reviewer_context_id\s*:", kimi_sol) is None, "kimi-sol: impossible reviewer_context_id verdict field remains")
    c.check("${KIMI_SKILL_DIR}" not in kimi_sol, "kimi-sol: wrong current-skill runner variable remains")
    runner = Path("/root/.kimi-code/skills/sol-subagent/scripts/run-sol.sh").read_text(encoding="utf-8")
    c.check("--output-last-message" in runner and "SOL_SUBAGENT_FINAL_B64=" in runner, "sol-subagent runner has no lossless final-message marker")
    c.check("trap cleanup EXIT HUP INT TERM" in runner and "SOL_SUBAGENT_OUTPUT=streamed" in runner, "sol-subagent runner does not clean up and stream output")

    mutation_cases = [
        ("kimi-first", texts["kimi-first"].replace('{"title":"Dispatch bounded worker","status":"in_progress"}', '{"title":"Dispatch bounded worker","status":"in_progress","deps":[]}'), "illegal Todo field"),
        ("dynamic-workflow", texts["dynamic-workflow"].replace("Do not call Agent or AgentSwarm", "Do not delegate", 1), "missing descendant prohibition"),
        ("sdd", texts["sdd"].replace("Green erneut", "Green wieder"), "missing Green-after-fix wording"),
        ("kimi-sol", texts["kimi-sol"].replace("- `Kimi mit Sol pruefen`", "- `Kimi mit Sol pruefen`\n- `generic review`"), "broadened trigger list"),
        ("kimi-sol", texts["kimi-sol"].replace("SOL_SUBAGENT_FINAL_B64", "SOL_SUBAGENT_OUTPUT"), "missing final-message artifact"),
    ]
    with tempfile.TemporaryDirectory(prefix="kimi-native-mutations-") as td:
        for name, mutated, label in mutation_cases:
            path = Path(td) / f"{name}.md"
            path.write_text(mutated, encoding="utf-8")
            mode = "native-kimi-review" if name in NATIVE_REVIEW else "native-kimi-agent"
            c.check(bool(sync.validate_native_skill(name, path, mode)), f"native validator accepted {label}")


def check_install(c: Checks, registry: dict[str, dict]) -> None:
    command = [sys.executable, str(SYNC_PATH), "--install"]
    names = sorted(registry)
    with tempfile.TemporaryDirectory(prefix="raphael-kimi-test-") as temp:
        root = Path(temp)
        kimi_home = root / "custom-kimi-home"
        dry = run(command + ["--dry-run"], root, extra_env={"KIMI_CODE_HOME": str(kimi_home)})
        c.check(dry.returncode == 0, f"dry-run failed: {dry.stdout}{dry.stderr}")
        c.check(not kimi_home.exists(), "dry-run mutated KIMI_CODE_HOME")

        skills = kimi_home / "skills"
        skills.mkdir(parents=True)
        (skills / "gpt-subagent").write_text("preserve gpt", encoding="utf-8")
        (skills / "sol-subagent").write_text("preserve sol", encoding="utf-8")
        foreign = skills / "foreign-skill"
        foreign.write_text("leave me", encoding="utf-8")
        real = run(command, root, extra_env={"KIMI_CODE_HOME": str(kimi_home)})
        c.check(real.returncode == 0, f"install failed: {real.stdout}{real.stderr}")
        for name in names:
            target = skills / name
            c.check(target.is_symlink(), f"registered target is not a symlink: {name}")
            if target.is_symlink():
                c.check(os.readlink(target) == str(REPO_ROOT / "kimi" / "skills" / name), f"{name}: divergent link target")
                c.check(target.exists(), f"{name}: broken installed symlink")
        c.check(foreign.read_text(encoding="utf-8") == "leave me", "foreign skill changed")
        c.check((skills / "gpt-subagent").read_text(encoding="utf-8") == "preserve gpt", "gpt-subagent changed")
        c.check((skills / "sol-subagent").read_text(encoding="utf-8") == "preserve sol", "sol-subagent changed")
        again = run(command, root, extra_env={"KIMI_CODE_HOME": str(kimi_home)})
        c.check(again.returncode == 0, f"idempotent install failed: {again.stdout}{again.stderr}")

        conflict_home = root / "conflict-home"
        conflict_skills = conflict_home / "skills"
        conflict_skills.mkdir(parents=True)
        (conflict_skills / "ads").write_text("foreign occupant", encoding="utf-8")
        conflict = run(command, root, extra_env={"KIMI_CODE_HOME": str(conflict_home)})
        c.check(conflict.returncode != 0, "foreign occupant did not block preflight")
        c.check((conflict_skills / "ads").read_text(encoding="utf-8") == "foreign occupant", "conflict occupant changed")
        c.check(not any((conflict_skills / name).is_symlink() for name in names if name != "ads"), "conflict created partial links")

        broken_home = root / "broken-home"
        broken_skills = broken_home / "skills"
        broken_skills.mkdir(parents=True)
        os.symlink(str(root / "missing-target"), broken_skills / "ads")
        broken = run(command, root, extra_env={"KIMI_CODE_HOME": str(broken_home)})
        c.check(broken.returncode != 0, "broken symlink did not block preflight")
        c.check(os.path.lexists(broken_skills / "ads"), "broken symlink was removed")

        broad = run(command, root, extra_env={"KIMI_CODE_HOME": "/"})
        c.check(broad.returncode != 0, "dangerously broad KIMI_CODE_HOME was accepted")

        real_parent = root / "real-parent"
        real_parent.mkdir()
        linked_parent = root / "linked-parent"
        os.symlink(real_parent, linked_parent)
        traversed = run(command, root, extra_env={"KIMI_CODE_HOME": str(linked_parent / "kimi")})
        c.check(traversed.returncode != 0, "symlinked KIMI_CODE_HOME component was accepted")
        c.check(not (real_parent / "kimi").exists(), "symlink-component rejection still created files")

        rollback_home = root / "rollback-home"
        injected = run(command, root, extra_env={"KIMI_CODE_HOME": str(rollback_home), "RAPHAEL_KIMI_TESTING": "1", "RAPHAEL_KIMI_FAIL_AFTER": "2"})
        c.check(injected.returncode != 0, "rollback injection unexpectedly succeeded")
        rollback_skills = rollback_home / "skills"
        c.check(not any((rollback_skills / name).is_symlink() for name in names), "rollback left owned links behind")

        post_home = root / "post-create-home"
        post = run(command, root, extra_env={"KIMI_CODE_HOME": str(post_home), "RAPHAEL_KIMI_TESTING": "1", "RAPHAEL_KIMI_FAIL_POST_CREATE": "1"})
        c.check(post.returncode != 0, "post-create rollback injection unexpectedly succeeded")
        c.check(not any((post_home / "skills" / name).is_symlink() for name in names), "post-create rollback left links")


def main() -> int:
    checks = Checks()
    try:
        registry = sync.load_registry()
        check_registry(checks, registry)
        check_frontmatter(checks, registry)
        check_native_runtime_contracts(checks)
        if not checks.failures:
            check_install(checks, registry)
    except Exception as exc:
        checks.failures.append(f"test harness error: {exc}")
    return checks.report()


if __name__ == "__main__":
    raise SystemExit(main())
