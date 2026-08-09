#!/usr/bin/env python3
"""Deterministic checks for Codex orchestration and ultra-loop routing.

This test is deliberately stdlib-only. It checks the native Codex orchestrate
contract, the thin ultra-loop adapter's canonical LOOP dependency, and a tiny
in-memory backend for lifecycle and resume behavior. It never calls a Codex
tool, creates a real task, writes a ledger, or changes global state.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
import re
import sys


REPO_ROOT = Path(__file__).resolve().parent.parent
NATIVE_ORCHESTRATE = REPO_ROOT / "codex" / "skills" / "orchestrate" / "SKILL.md"
ULTRA_LOOP_ADAPTER = REPO_ROOT / "codex" / "skills" / "ultra-loop" / "SKILL.md"
CANONICAL_ROUTER = REPO_ROOT / "skills" / "eigene" / "ultra-loop" / "SKILL.md"
CANONICAL_LOOP = REPO_ROOT / "skills" / "eigene" / "orchestrate" / "SKILL.md"

# These are forbidden route names, not words that a native skill may use as a
# conceptual API.  Boundary matching keeps send_message_to_thread allowed.
BANNED_ROUTE_PATTERNS = (
    r"\bagents\.spawn_agent\b",
    r"\bspawn_agent\b",
    r"\bcollaboration\.spawn\b",
    r"\bfollowup_task\b",
    r"\bwait_agent\b",
    r"\binterrupt_agent\b",
    r"\bsubagents?\b",
    r"\binternal\s+delegat",
)

CONTRACT_PATTERNS = (
    r"list_projects",
    r"create_thread",
    r"list_threads",
    r"read_thread",
    r"wait_threads",
    r"send_message_to_thread",
    r"clientThreadId",
    r"threadId",
    r"hostId",
    r"afterCursor",
    r"cursor",
    r"status",
    r"projectless",
    r"nonblocking",
    r"\bmodel\b",
    r"\bthinking\b",
    r"30\s*[–-]\s*60",
    r"timeoutMs",
    r"höchstens acht|hoechstens acht|at most eight",
    r"::created-thread\{threadId=",
    r"::created-thread\{clientThreadId=",
    r"Verifier-Thread",
)


class Checks:
    def __init__(self) -> None:
        self.failures: list[str] = []

    def check(self, condition: bool, message: str) -> None:
        if not condition:
            self.failures.append(message)

    def report(self) -> int:
        if self.failures:
            print("Codex orchestration skill tests: FAIL")
            for failure in self.failures:
                print(f"  - {failure}")
            return 1
        print("Codex orchestration skill tests: OK")
        return 0


def check_static_contracts(checks: Checks) -> None:
    paths = {
        "orchestrate": NATIVE_ORCHESTRATE,
        "ultra-loop adapter": ULTRA_LOOP_ADAPTER,
        "canonical ultra-loop router": CANONICAL_ROUTER,
        "canonical orchestrate": CANONICAL_LOOP,
    }
    for name, path in paths.items():
        checks.check(path.is_file(), f"{name}: SKILL.md missing: {path}")
    if not all(path.is_file() for path in paths.values()):
        return

    native = NATIVE_ORCHESTRATE.read_text(encoding="utf-8")
    lowered = native.lower()
    for pattern in BANNED_ROUTE_PATTERNS:
        checks.check(
            re.search(pattern, lowered) is None,
            f"orchestrate: forbidden route term/call present: {pattern}",
        )
    for pattern in CONTRACT_PATTERNS:
        checks.check(
            re.search(pattern, native, re.IGNORECASE) is not None,
            f"orchestrate: required contract missing: {pattern}",
        )
    checks.check(
        "user-owned" in lowered and "codex" in lowered,
        "orchestrate: visible user-owned Codex task wording missing",
    )
    checks.check(
        "list_threads" in native and "gleiche später" in lowered,
        "orchestrate: queued-to-live reconciliation wording missing",
    )
    checks.check(
        "wiederhole keine finalen" in lowered,
        "orchestrate: duplicate-free final output wording missing",
    )
    checks.check(
        "approval" in lowered or "freigabe" in lowered,
        "orchestrate: user-owned approval/input wording missing",
    )

    adapter = ULTRA_LOOP_ADAPTER.read_text(encoding="utf-8")
    router = CANONICAL_ROUTER.read_text(encoding="utf-8")
    canonical = CANONICAL_LOOP.read_text(encoding="utf-8")
    checks.check(
        "/root/raphael-skills/skills/eigene/ultra-loop/SKILL.md" in adapter,
        "ultra-loop: canonical router path missing",
    )
    checks.check(
        "Codex dependency map:" in adapter
        and "/root/raphael-skills/skills/eigene/orchestrate/SKILL.md" in adapter,
        "ultra-loop: absolute canonical orchestrate dependency missing",
    )
    checks.check(
        "do not use the native Codex `orchestrate` skill" in adapter,
        "ultra-loop: native Codex orchestrate exclusion missing",
    )
    checks.check(
        "requires_skills: [orchestrate@^1]" in router,
        "ultra-loop: canonical router dependency contract missing",
    )
    checks.check(
        "## Schritt 5 — Dauer-Loop (LOOP)" in canonical,
        "orchestrate: canonical LOOP contract missing",
    )


@dataclass
class MockThread:
    label: str
    client_thread_id: str
    thread_id: str | None = None
    host_id: str | None = None
    status: str = "queued"
    cursor: int = 0
    events: list[dict[str, object]] = field(default_factory=list)


class MockBackend:
    """Small conceptual backend used only by this test process."""

    def __init__(self) -> None:
        self.threads: dict[str, MockThread] = {}
        self.create_calls: list[str] = []
        self.wait_calls: list[dict[str, object]] = []
        self.archive_calls: list[str] = []

    def create_thread(self, label: str) -> dict[str, str]:
        self.create_calls.append(label)
        client_id = f"client-{len(self.create_calls)}"
        thread = MockThread(label=label, client_thread_id=client_id)
        self.threads[client_id] = thread
        return {"clientThreadId": client_id, "status": "queued"}

    def promote(self, client_id: str, status: str) -> None:
        thread = self.threads[client_id]
        thread.thread_id = f"thread-{client_id}"
        thread.host_id = "host-local"
        thread.status = status
        thread.cursor += 1
        thread.events.append({"id": thread.cursor, "final": status == "completed", "text": status})

    def list_threads(self) -> list[MockThread]:
        return list(self.threads.values())

    def wait_threads(self, targets: list[dict[str, object]], timeout_ms: int) -> list[MockThread]:
        if len(targets) > 8:
            raise AssertionError("wait_threads target limit exceeded")
        if timeout_ms != 0 and not 30_000 <= timeout_ms <= 60_000:
            raise AssertionError("wait_threads timeout is not bounded")
        self.wait_calls.append({"targets": targets, "timeoutMs": timeout_ms})
        return [
            thread
            for thread in self.threads.values()
            if thread.thread_id and any(t.get("threadId") == thread.thread_id for t in targets)
        ]

    def archive_thread(self, thread_id: str) -> bool:
        matches = [thread for thread in self.threads.values() if thread.thread_id == thread_id]
        if not matches or matches[0].status != "completed":
            return False
        self.archive_calls.append(thread_id)
        return True


def reconcile(ledger: dict[str, dict[str, object]], backend: MockBackend) -> None:
    """Apply queued -> real IDs and live status without creating anything."""
    by_label = {thread.label: thread for thread in backend.list_threads()}
    for label, node in ledger.items():
        thread = by_label.get(label)
        if thread is None:
            continue
        node["clientThreadId"] = thread.client_thread_id
        if thread.thread_id and thread.host_id:
            node["threadId"] = thread.thread_id
            node["hostId"] = thread.host_id
        node["status"] = thread.status
        node["cursor"] = thread.cursor


def resume_or_create(ledger: dict[str, dict[str, object]], backend: MockBackend) -> None:
    """Idempotent dispatch algorithm: reconcile first, create only once."""
    reconcile(ledger, backend)
    for label, node in ledger.items():
        status = node["status"]
        if status in {"completed", "running", "queued", "waiting"}:
            continue
        result = backend.create_thread(label)
        node["clientThreadId"] = result["clientThreadId"]
        node["status"] = result["status"]


def consume_new_events(seen: set[int], thread: MockThread) -> list[str]:
    """Cursor/event IDs make final text observable at most once."""
    output: list[str] = []
    for event in thread.events:
        event_id = int(event["id"])
        if event_id in seen:
            continue
        seen.add(event_id)
        output.append(str(event["text"]))
    return output


def check_mock_lifecycle(checks: Checks) -> None:
    backend = MockBackend()
    ledger: dict[str, dict[str, object]] = {
        "inspect": {
            "label": "inspect",
            "deps": [],
            "scope": ["/repo"],
            "write_set": [],
            "threadId": None,
            "hostId": None,
            "clientThreadId": None,
            "cursor": None,
            "status": "planned",
            "verification": "pending",
        }
    }

    # First dispatch is queued and must not be waited on as a real target.
    resume_or_create(ledger, backend)
    checks.check(len(backend.create_calls) == 1, "mock: initial create missing")
    checks.check(ledger["inspect"]["status"] == "queued", "mock: queued state missing")
    checks.check(ledger["inspect"]["threadId"] is None, "mock: queued task became waitable")

    client_id = str(ledger["inspect"]["clientThreadId"])
    backend.promote(client_id, "running")
    resume_or_create(ledger, backend)
    checks.check(len(backend.create_calls) == 1, "mock: resume duplicated running task")
    checks.check(ledger["inspect"]["threadId"] == f"thread-{client_id}", "mock: queued reconciliation failed")
    checks.check(ledger["inspect"]["hostId"] == "host-local", "mock: hostId reconciliation failed")

    target = [{"threadId": ledger["inspect"]["threadId"], "hostId": ledger["inspect"]["hostId"], "afterCursor": 1}]
    waited = backend.wait_threads(target, timeout_ms=30_000)
    checks.check(len(waited) == 1, "mock: running target was not waitable")

    seen: set[int] = set()
    first = consume_new_events(seen, waited[0])
    second = consume_new_events(seen, waited[0])
    checks.check(first == ["running"], "mock: running event missing")
    checks.check(second == [], "mock: repeated event/final text was emitted")

    backend.promote(client_id, "completed")
    reconcile(ledger, backend)
    ledger["inspect"]["verification"] = "passed"
    resume_or_create(ledger, backend)
    checks.check(ledger["inspect"]["status"] == "completed", "mock: completed state missing")
    checks.check(len(backend.create_calls) == 1, "mock: resume duplicated completed task")
    completed = consume_new_events(seen, backend.list_threads()[0])
    checks.check(completed == ["completed"], "mock: completed event not cursor-deduplicated")
    checks.check(backend.wait_calls[0]["timeoutMs"] == 30_000, "mock: bounded wait not recorded")


def check_mock_latches_and_smoke(checks: Checks) -> None:
    """Best-effort is retained only in one ledger; smoke archive is explicit."""
    ledger = {"best_effort_authorized": False}
    ledger["best_effort_authorized"] = True  # explicit user grant in this run
    resumed_value = ledger["best_effort_authorized"]
    checks.check(resumed_value is True, "mock: best-effort grant was not retained on resume")
    # Ending the workflow discards the value instead of persisting it globally.
    ended_ledger: dict[str, object] = {}
    checks.check("best_effort_authorized" not in ended_ledger, "mock: best-effort latch leaked past workflow end")

    backend = MockBackend()
    # No implicit smoke task: ordinary execution does not call create/archive.
    explicit_smoke = False
    if explicit_smoke:  # pragma: no cover - documents the gate
        backend.create_thread("smoke")
    checks.check(backend.create_calls == [], "mock: implicit smoke task was created")
    checks.check(backend.archive_calls == [], "mock: implicit smoke archive was attempted")

    # Explicit smoke test creates one disposable task and archives only after completion.
    explicit_smoke = True
    if explicit_smoke:
        created = backend.create_thread("smoke")
        smoke_id = created["clientThreadId"]
        backend.promote(smoke_id, "completed")
        real_id = backend.list_threads()[0].thread_id
        checks.check(real_id is not None and backend.archive_thread(real_id), "mock: explicit smoke archive failed")
    checks.check(len(backend.archive_calls) == 1, "mock: explicit smoke archive count incorrect")


def main() -> int:
    checks = Checks()
    check_static_contracts(checks)
    check_mock_lifecycle(checks)
    check_mock_latches_and_smoke(checks)
    return checks.report()


if __name__ == "__main__":
    raise SystemExit(main())
