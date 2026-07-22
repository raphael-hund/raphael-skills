#!/usr/bin/env python3
"""Offline checks for the native ``kimi-sol`` skill.

The test intentionally never contacts a provider or invokes Codex/Kimi/Sol.  It
checks trigger isolation, the two-field Codex metadata, safety wording, the
compatibility entry, and the byte/hash/verdict helper contract.
"""
from __future__ import annotations

import ast
import importlib.util
import json
import re
import sys
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
SKILL_DIR = REPO_ROOT / "codex" / "skills" / "kimi-sol"
SKILL_PATH = SKILL_DIR / "SKILL.md"
KIMI_FIRST_PATH = REPO_ROOT / "codex" / "skills" / "kimi-first" / "SKILL.md"
COMPAT_PATH = REPO_ROOT / "codex" / "compatibility.json"
PACKET_PATH = SKILL_DIR / "scripts" / "kimi_sol_packet.py"


class Checks:
    def __init__(self) -> None:
        self.failures: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        if not condition:
            self.failures.append(message)

    def report(self) -> int:
        if self.failures:
            print("Kimi-Sol skill tests: FAIL")
            for failure in self.failures:
                print(f"  - {failure}")
            return 1
        print("Kimi-Sol skill tests: OK")
        return 0


def load_packet_module():
    spec = importlib.util.spec_from_file_location("kimi_sol_packet", PACKET_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot import helper: {PACKET_PATH}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def parse_frontmatter(path: Path) -> tuple[dict[str, str], str]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise AssertionError(f"{path}: frontmatter opening marker missing")
    try:
        end = next(index for index, line in enumerate(lines[1:], 1) if line.strip() == "---")
    except StopIteration as exc:
        raise AssertionError(f"{path}: frontmatter closing marker missing") from exc
    fields: dict[str, str] = {}
    current: str | None = None
    for line in lines[1:end]:
        match = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if match:
            current, raw = match.groups()
            fields[current] = raw.strip().strip('"\'')
        elif current and line.strip():
            fields[current] += " " + line.strip()
    return fields, "\n".join(lines[end + 1 :])


def load_registry() -> dict[str, Any]:
    data = json.loads(COMPAT_PATH.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or not isinstance(data.get("skills"), dict):
        raise AssertionError("compatibility registry shape is invalid")
    return data["skills"]


def trigger_matches(prompt: str, skill: str, registry: dict[str, Any]) -> set[str]:
    """Match only complete explicit phrases, never the bare word ``Kimi``."""

    matches: set[str] = set()
    for name, entry in registry.items():
        for trigger in entry.get("triggers", []):
            if trigger.startswith("/"):
                found = re.search(r"(?<![A-Za-z0-9_-])" + re.escape(trigger) + r"(?![A-Za-z0-9_-])", prompt)
            else:
                found = re.search(r"(?<!\w)" + re.escape(trigger) + r"(?!\w)", prompt, re.IGNORECASE)
            if found:
                matches.add(name)
    # A prompt mixing two audited families is ambiguous and must not silently
    # select either workflow.
    return matches if len(matches) <= 1 else set()


def check_metadata_and_triggers(c: Checks, registry: dict[str, Any]) -> None:
    for path, expected_name in ((SKILL_PATH, "kimi-sol"), (KIMI_FIRST_PATH, "kimi-first")):
        c.check(path.is_file(), f"missing skill metadata: {path}")
        if not path.is_file():
            continue
        fields, body = parse_frontmatter(path)
        c.check(set(fields) == {"name", "description"}, f"{expected_name}: frontmatter must contain only name+description")
        c.check(fields.get("name") == expected_name, f"{expected_name}: frontmatter name mismatch")
        description = fields.get("description", "")
        c.check(1 <= len(description) <= 1024, f"{expected_name}: description length outside 1..1024")
        c.check("<" not in description and ">" not in description, f"{expected_name}: description contains angle brackets")
        if expected_name == "kimi-sol":
            required_body_terms = (
                "external status",
                "resolve",
                "READY",
                "callable",
                "APPROVAL_REQUIRED",
                "NOT_READY",
                "REVIEWER_UNAVAILABLE",
                "MALFORMED_ARTIFACT",
                "REVIEW_REJECTED",
                "VERIFIED",
                "SHA-256",
                "bytegenau",
                "versiegelt",
                "unabhängig",
                "kein automatischer",
                "Merge",
                "Commit",
                "Push",
            )
            lowered_body = body.lower()
            for term in required_body_terms:
                c.check(term.lower() in lowered_body, f"kimi-sol: required instruction missing {term!r}")
            c.check("kimi-first" in body, "kimi-sol: trigger-isolation relationship to kimi-first missing")
            c.check("/kimi-sol" in description and "Kimi→Sol" in description, "kimi-sol: explicit trigger metadata missing")
    c.check(registry.get("kimi-sol", {}).get("mode") == "native-external-review", "kimi-sol: precise native mode missing")
    c.check(registry.get("kimi-sol", {}).get("source") == "codex/skills/kimi-sol/SKILL.md", "kimi-sol: source relationship must point to native skill")
    c.check(
        registry.get("kimi-sol", {}).get("triggers")
        == ["/kimi-sol", "Kimi→Sol", "Kimi -> Sol", "Kimi mit Sol prüfen", "Kimi mit Sol pruefen"],
        "kimi-sol: trigger inventory changed or broadened",
    )
    c.check(registry.get("kimi-first", {}).get("mode") == "source-adapter", "kimi-first: existing mode changed")

    matrix = {
        "/kimi-sol": {"kimi-sol"},
        "Kimi→Sol": {"kimi-sol"},
        "Kimi -> Sol": {"kimi-sol"},
        "Kimi mit Sol prüfen": {"kimi-sol"},
        "Kimi mit Sol pruefen": {"kimi-sol"},
        "/kimi-first": {"kimi-first"},
        "an Kimi geben": {"kimi-first"},
        "kimi -p": {"kimi-first"},
        "riesiger Kontext": {"kimi-first"},
        "Kimi": set(),
        "Kimi prüfen": set(),
        "Kimi mit Sol anschauen": set(),
        "Kimi -> Sol und riesiger Kontext": set(),
    }
    for prompt, expected in matrix.items():
        actual = trigger_matches(prompt, "kimi-sol", registry)
        c.check(actual == expected, f"trigger matrix {prompt!r}: got {sorted(actual)}, expected {sorted(expected)}")


def check_safety_contract(c: Checks) -> None:
    text = SKILL_PATH.read_text(encoding="utf-8").lower()
    required_prohibitions = (
        "keine credential",
        "key-aktion",
        "provider-vorbereitung",
        "authentifizierung",
        "auth-mutation",
        "connect-",
        "repair-",
        "trust-helper",
        "gate 0",
        "billing-bestätigung",
        "automatischer fallback",
        "nativer agent-shortcut",
    )
    for phrase in required_prohibitions:
        c.check(phrase in text, f"kimi-sol: hard prohibition missing {phrase!r}")
    # The skill must not smuggle an executable Kimi/native-agent path into the
    # instructions.  Status/resolve/invoke are discussed only as lifecycle
    # operations; there is no CLI, credential variable, or native spawn call.
    banned_literals = (
        "kimi -p",
        "KIMI_HOME",
        "--acknowledge-billing",
        "spawn_agent",
        "agents.spawn_agent",
        "subprocess.run",
        "os.system(",
        "requests.get(",
    )
    raw = SKILL_PATH.read_text(encoding="utf-8")
    for literal in banned_literals:
        c.check(literal not in raw, f"kimi-sol: forbidden executable path present {literal!r}")
    c.check("automatic fallback" not in raw.lower(), "kimi-sol: English automatic-fallback phrase unexpectedly present")


def check_offline_helper(c: Checks, packet: Any) -> None:
    raw = b"Kimi output\n\x00byte-preserved\xff"
    route = {"role": "researcher", "provider": "openrouter", "model": "moonshotai/kimi-k3", "effort": "max"}
    handoff = packet.build_review_handoff(
        raw,
        request_id="req-001",
        artifact_id="artifact-001",
        producer_context_id="kimi-context",
        reviewer_context_id="sol-context",
        route=route,
    )
    c.check(packet.validate_handoff(handoff) == raw, "helper changed raw artifact bytes")
    c.check(handoff["artifact"]["artifact_sha256"] == packet.sha256_bytes(raw), "helper hash is not deterministic SHA-256")
    verdict = {
        "schema_version": 1,
        "kind": "sol-review-verdict",
        "request_id": "req-001",
        "artifact_sha256": packet.sha256_bytes(raw),
        "reviewer": {"provider": "openai", "model": "sol", "context_id": "sol-context"},
        "verdict": "ACCEPT",
        "findings": [{"id": "F-1", "disposition": "ACCEPT", "evidence": "line 1", "location": "artifact"}],
        "tests": [{"command": "local-check", "result": "pass"}],
    }
    c.check(packet.check_verdict(verdict, handoff) == packet.REVIEW_IN_PROGRESS, "valid verdict did not enter review-in-progress state")
    c.check(len(packet.validate_verdict(verdict, handoff)) == 1, "valid verdict findings were not returned")

    reject = dict(verdict, verdict="REJECT")
    c.check(packet.check_verdict(reject, handoff) == packet.REVIEW_REJECTED, "REJECT verdict was not fail-closed")

    malformed_hash = dict(verdict, artifact_sha256="0" * 64)
    c.check(packet.check_verdict(malformed_hash, handoff) == packet.MALFORMED_VERDICT, "hash mismatch was not MALFORMED_VERDICT")
    for kwargs, expected_status in (
        ({"exact_ready": False, "callable_now": False, "fresh_approval": True}, packet.NOT_READY),
        ({"exact_ready": True, "callable_now": True, "fresh_approval": False}, packet.APPROVAL_REQUIRED),
    ):
        try:
            packet.require_invoke_gate(**kwargs)
        except packet.PacketError as exc:
            c.check(exc.status == expected_status, f"invoke gate returned {exc.status}, expected {expected_status}")
        else:
            c.check(False, f"invoke gate unexpectedly passed for {expected_status}")
    try:
        packet.require_invoke_gate(exact_ready=True, callable_now=True, fresh_approval=True)
    except packet.PacketError as exc:  # pragma: no cover - diagnostic guard
        c.check(False, f"valid invoke gate failed: {exc.status}")
    malformed = dict(handoff, artifact=dict(handoff["artifact"], artifact_sha256="0" * 64))
    try:
        packet.validate_handoff(malformed)
    except packet.PacketError as exc:
        c.check(exc.status == packet.MALFORMED_ARTIFACT, "bad artifact hash did not fail as MALFORMED_ARTIFACT")
    else:
        c.check(False, "bad artifact hash unexpectedly validated")
    try:
        packet.build_review_handoff(
            raw,
            request_id="req-001",
            artifact_id="artifact-001",
            producer_context_id="same-context",
            reviewer_context_id="same-context",
            route=route,
        )
    except packet.PacketError as exc:
        c.check(exc.status == packet.REVIEWER_UNAVAILABLE, "same-context review did not fail closed")
    else:
        c.check(False, "same-context review unexpectedly constructed")
    try:
        packet.build_artifact(b"", request_id="req-001", artifact_id="a", producer_context_id="p")
    except packet.PacketError as exc:
        c.check(exc.status == packet.MALFORMED_ARTIFACT, "empty artifact did not fail closed")
    else:
        c.check(False, "empty artifact unexpectedly constructed")

    for status in (packet.NOT_READY, packet.APPROVAL_REQUIRED, packet.REVIEWER_UNAVAILABLE, packet.MALFORMED_ARTIFACT, packet.REVIEW_REJECTED, packet.VERIFIED):
        c.check(status in packet.STATUSES, f"status missing from helper: {status}")
    tree = ast.parse(PACKET_PATH.read_text(encoding="utf-8"))
    forbidden_modules = {"subprocess", "socket", "urllib", "requests", "httpx"}
    imports = {
        node.names[0].name.split(".")[0]
        for node in ast.walk(tree)
        if isinstance(node, ast.Import) and node.names
    }
    imports.update(
        node.module.split(".")[0]
        for node in ast.walk(tree)
        if isinstance(node, ast.ImportFrom) and node.module
    )
    c.check(not imports & forbidden_modules, f"helper imports forbidden live-I/O modules: {sorted(imports & forbidden_modules)}")


def main() -> int:
    c = Checks()
    try:
        registry = load_registry()
        packet = load_packet_module()
    except Exception as exc:  # pragma: no cover - diagnostic guard
        c.check(False, f"test setup failed: {exc}")
        return c.report()
    check_metadata_and_triggers(c, registry)
    check_safety_contract(c)
    check_offline_helper(c, packet)
    # The current sync generator intentionally predates native-external-review;
    # keep this visible rather than pretending a normal adapter sync supports it.
    try:
        sync_path = REPO_ROOT / "tools" / "sync-codex-skills.py"
        sync_text = sync_path.read_text(encoding="utf-8")
        if "native-external-review" not in sync_text:
            print("NOTE: sync-codex-skills.py does not yet support native-external-review (expected integration follow-up).")
    except OSError as exc:
        c.check(False, f"could not inspect sync generator: {exc}")
    return c.report()


if __name__ == "__main__":
    raise SystemExit(main())
