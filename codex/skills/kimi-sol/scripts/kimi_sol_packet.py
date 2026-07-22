#!/usr/bin/env python3
"""Offline packet and artifact checks for the ``kimi-sol`` skill.

This module deliberately has no subprocess, network, provider, credential, or
filesystem side effects.  It treats the Kimi response as bytes, carries those
bytes with a lossless base64 transport encoding, and checks their SHA-256 before
the independent Sol reviewer can accept a handoff.
"""
from __future__ import annotations

import base64
import binascii
import hashlib
import re
from typing import Any, Mapping

SCHEMA_VERSION = 1
MAX_ARTIFACT_BYTES = 2 * 1024 * 1024

NOT_READY = "NOT_READY"
APPROVAL_REQUIRED = "APPROVAL_REQUIRED"
ARTIFACT_READY = "ARTIFACT_READY"
REVIEW_IN_PROGRESS = "REVIEW_IN_PROGRESS"
REVIEWER_UNAVAILABLE = "REVIEWER_UNAVAILABLE"
MALFORMED_ARTIFACT = "MALFORMED_ARTIFACT"
MALFORMED_VERDICT = "MALFORMED_VERDICT"
REVIEW_REJECTED = "REVIEW_REJECTED"
VERIFIED = "VERIFIED"

STATUSES = frozenset(
    {
        NOT_READY,
        APPROVAL_REQUIRED,
        ARTIFACT_READY,
        REVIEW_IN_PROGRESS,
        REVIEWER_UNAVAILABLE,
        MALFORMED_ARTIFACT,
        MALFORMED_VERDICT,
        REVIEW_REJECTED,
        VERIFIED,
    }
)

_ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$")
_SHA_RE = re.compile(r"^[0-9a-f]{64}$")
_ROUTE_KEYS = frozenset({"role", "provider", "model", "effort"})


class PacketError(ValueError):
    """A fail-closed packet error with a user-visible status."""

    def __init__(self, status: str, message: str):
        if status not in STATUSES:
            raise ValueError(f"unknown status: {status}")
        super().__init__(message)
        self.status = status


def sha256_bytes(raw_artifact: bytes | bytearray | memoryview) -> str:
    """Return the deterministic lowercase SHA-256 of the exact input bytes."""

    return hashlib.sha256(bytes(raw_artifact)).hexdigest()


def require_invoke_gate(*, exact_ready: bool, callable_now: bool, fresh_approval: bool) -> None:
    """Check the non-I/O gate immediately before a potentially paid Invoke.

    The function only returns when all three facts are true; it never performs
    an invocation and never changes lifecycle state.
    """

    if exact_ready is not True or callable_now is not True:
        raise PacketError(NOT_READY, "exact External-Model role is not READY/callable")
    if fresh_approval is not True:
        raise PacketError(APPROVAL_REQUIRED, "fresh approval for this exact invocation is missing")


def _require_id(value: Any, field: str) -> str:
    if not isinstance(value, str) or not _ID_RE.fullmatch(value):
        raise PacketError(MALFORMED_ARTIFACT, f"{field} must be a bounded identifier")
    return value


def _require_route(route: Any) -> dict[str, str]:
    if not isinstance(route, Mapping) or set(route) != _ROUTE_KEYS:
        raise PacketError(MALFORMED_ARTIFACT, "route must contain role/provider/model/effort only")
    result: dict[str, str] = {}
    for key in sorted(_ROUTE_KEYS):
        value = route[key]
        if not isinstance(value, str) or not value.strip() or len(value) > 256:
            raise PacketError(MALFORMED_ARTIFACT, f"route.{key} must be a bounded non-empty string")
        result[key] = value
    return result


def _raw_bytes(raw_artifact: bytes | bytearray | memoryview) -> bytes:
    if not isinstance(raw_artifact, (bytes, bytearray, memoryview)):
        raise PacketError(MALFORMED_ARTIFACT, "artifact must be bytes")
    raw = bytes(raw_artifact)
    if not raw or len(raw) > MAX_ARTIFACT_BYTES:
        raise PacketError(MALFORMED_ARTIFACT, "artifact is empty or exceeds the bounded size")
    return raw


def build_artifact(
    raw_artifact: bytes | bytearray | memoryview,
    *,
    request_id: str,
    artifact_id: str,
    producer_context_id: str,
) -> dict[str, Any]:
    """Build an immutable-by-contract artifact envelope without I/O."""

    raw = _raw_bytes(raw_artifact)
    return {
        "schema_version": SCHEMA_VERSION,
        "kind": "kimi-sol-artifact",
        "request_id": _require_id(request_id, "request_id"),
        "artifact_id": _require_id(artifact_id, "artifact_id"),
        "artifact_encoding": "base64",
        "artifact_b64": base64.b64encode(raw).decode("ascii"),
        "artifact_sha256": sha256_bytes(raw),
        "artifact_bytes": len(raw),
        "producer_context_id": _require_id(producer_context_id, "producer_context_id"),
    }


def decode_artifact(artifact: Mapping[str, Any], *, expected_request_id: str | None = None) -> bytes:
    """Decode and verify the exact bytes represented by an artifact envelope."""

    if not isinstance(artifact, Mapping):
        raise PacketError(MALFORMED_ARTIFACT, "artifact envelope is not an object")
    required = {
        "schema_version",
        "kind",
        "request_id",
        "artifact_id",
        "artifact_encoding",
        "artifact_b64",
        "artifact_sha256",
        "artifact_bytes",
        "producer_context_id",
    }
    if set(artifact) != required:
        raise PacketError(MALFORMED_ARTIFACT, "artifact envelope fields are not exact")
    if artifact["schema_version"] != SCHEMA_VERSION or artifact["kind"] != "kimi-sol-artifact":
        raise PacketError(MALFORMED_ARTIFACT, "unsupported artifact schema")
    request_id = _require_id(artifact["request_id"], "request_id")
    if expected_request_id is not None and request_id != expected_request_id:
        raise PacketError(MALFORMED_ARTIFACT, "artifact request_id does not match packet")
    _require_id(artifact["artifact_id"], "artifact_id")
    _require_id(artifact["producer_context_id"], "producer_context_id")
    if artifact["artifact_encoding"] != "base64" or not isinstance(artifact["artifact_b64"], str):
        raise PacketError(MALFORMED_ARTIFACT, "artifact transport encoding is invalid")
    encoded = artifact["artifact_b64"]
    try:
        raw = base64.b64decode(encoded.encode("ascii"), validate=True)
    except (UnicodeEncodeError, binascii.Error) as exc:
        raise PacketError(MALFORMED_ARTIFACT, "artifact base64 is malformed") from exc
    if not raw or len(raw) > MAX_ARTIFACT_BYTES:
        raise PacketError(MALFORMED_ARTIFACT, "decoded artifact is empty or too large")
    if not isinstance(artifact["artifact_bytes"], int) or artifact["artifact_bytes"] != len(raw):
        raise PacketError(MALFORMED_ARTIFACT, "artifact byte length does not match payload")
    digest = artifact["artifact_sha256"]
    if not isinstance(digest, str) or not _SHA_RE.fullmatch(digest) or digest != sha256_bytes(raw):
        raise PacketError(MALFORMED_ARTIFACT, "artifact SHA-256 does not match payload")
    return raw


def build_review_handoff(
    raw_artifact: bytes | bytearray | memoryview,
    *,
    request_id: str,
    artifact_id: str,
    producer_context_id: str,
    reviewer_context_id: str,
    route: Mapping[str, Any],
) -> dict[str, Any]:
    """Build the Sol handoff; reject a self-review before any dispatch."""

    request = _require_id(request_id, "request_id")
    producer = _require_id(producer_context_id, "producer_context_id")
    reviewer = _require_id(reviewer_context_id, "reviewer_context_id")
    if producer == reviewer:
        raise PacketError(REVIEWER_UNAVAILABLE, "producer and reviewer contexts must differ")
    return {
        "schema_version": SCHEMA_VERSION,
        "kind": "kimi-sol-review-handoff",
        "request_id": request,
        "artifact": build_artifact(
            raw_artifact,
            request_id=request,
            artifact_id=artifact_id,
            producer_context_id=producer,
        ),
        "route": _require_route(route),
        "reviewer": {
            "provider": "openai",
            "model": "sol",
            "context_id": reviewer,
            "independent": True,
        },
        "review_contract": {
            "verdict": ["ACCEPT", "REJECT"],
            "finding_disposition": ["ACCEPT", "REJECT"],
            "require_hash_match": True,
            "no_execution": True,
        },
    }


def validate_handoff(handoff: Mapping[str, Any]) -> bytes:
    """Validate a handoff and return the exact artifact bytes for Sol."""

    if not isinstance(handoff, Mapping):
        raise PacketError(MALFORMED_ARTIFACT, "review handoff is not an object")
    required = {"schema_version", "kind", "request_id", "artifact", "route", "reviewer", "review_contract"}
    if set(handoff) != required:
        raise PacketError(MALFORMED_ARTIFACT, "review handoff fields are not exact")
    if handoff["schema_version"] != SCHEMA_VERSION or handoff["kind"] != "kimi-sol-review-handoff":
        raise PacketError(MALFORMED_ARTIFACT, "unsupported review handoff schema")
    request = _require_id(handoff["request_id"], "request_id")
    raw = decode_artifact(handoff["artifact"], expected_request_id=request)
    _require_route(handoff["route"])
    reviewer = handoff["reviewer"]
    if not isinstance(reviewer, Mapping) or set(reviewer) != {"provider", "model", "context_id", "independent"}:
        raise PacketError(REVIEWER_UNAVAILABLE, "reviewer route is malformed")
    if reviewer["provider"] != "openai" or reviewer["model"] != "sol" or reviewer["independent"] is not True:
        raise PacketError(REVIEWER_UNAVAILABLE, "reviewer is not the independent Sol route")
    reviewer_context = _require_id(reviewer["context_id"], "reviewer_context_id")
    producer_context = handoff["artifact"]["producer_context_id"]
    if reviewer_context == producer_context:
        raise PacketError(REVIEWER_UNAVAILABLE, "reviewer context equals producer context")
    contract = handoff["review_contract"]
    if not isinstance(contract, Mapping) or contract.get("require_hash_match") is not True or contract.get("no_execution") is not True:
        raise PacketError(MALFORMED_ARTIFACT, "review contract does not require hash/no-execution checks")
    return raw


def validate_verdict(
    verdict: Mapping[str, Any],
    handoff: Mapping[str, Any],
    *,
    expected_reviewer_context_id: str | None = None,
) -> list[dict[str, Any]]:
    """Validate an independent Sol verdict and return its accepted/rejected findings.

    A valid ``REJECT`` verdict raises ``PacketError(REVIEW_REJECTED, ...)`` so
    callers cannot accidentally treat it as an approval.
    """

    try:
        raw = validate_handoff(handoff)
    except PacketError:
        raise
    if not isinstance(verdict, Mapping):
        raise PacketError(MALFORMED_VERDICT, "verdict is not an object")
    required = {"schema_version", "kind", "request_id", "artifact_sha256", "reviewer", "verdict", "findings", "tests"}
    if set(verdict) != required:
        raise PacketError(MALFORMED_VERDICT, "verdict fields are not exact")
    if verdict["schema_version"] != SCHEMA_VERSION or verdict["kind"] != "sol-review-verdict":
        raise PacketError(MALFORMED_VERDICT, "unsupported verdict schema")
    if verdict["request_id"] != handoff["request_id"]:
        raise PacketError(MALFORMED_VERDICT, "verdict request_id does not match handoff")
    if verdict["artifact_sha256"] != handoff["artifact"]["artifact_sha256"] or verdict["artifact_sha256"] != sha256_bytes(raw):
        raise PacketError(MALFORMED_VERDICT, "verdict hash does not match original bytes")
    reviewer = verdict["reviewer"]
    if not isinstance(reviewer, Mapping) or set(reviewer) != {"provider", "model", "context_id"}:
        raise PacketError(MALFORMED_VERDICT, "verdict reviewer identity is malformed")
    if reviewer["provider"] != "openai" or reviewer["model"] != "sol":
        raise PacketError(MALFORMED_VERDICT, "verdict reviewer is not Sol")
    context_id = _require_id(reviewer["context_id"], "reviewer_context_id")
    expected = expected_reviewer_context_id or handoff["reviewer"]["context_id"]
    if context_id != expected or context_id == handoff["artifact"]["producer_context_id"]:
        raise PacketError(REVIEWER_UNAVAILABLE, "verdict is not from the distinct Sol context")
    if verdict["verdict"] not in {"ACCEPT", "REJECT"}:
        raise PacketError(MALFORMED_VERDICT, "unknown verdict value")
    findings = verdict["findings"]
    if not isinstance(findings, list):
        raise PacketError(MALFORMED_VERDICT, "findings must be a list")
    seen: set[str] = set()
    for finding in findings:
        if not isinstance(finding, Mapping) or set(finding) != {"id", "disposition", "evidence", "location"}:
            raise PacketError(MALFORMED_VERDICT, "finding schema is malformed")
        finding_id = _require_id(finding["id"], "finding.id")
        if finding_id in seen or finding["disposition"] not in {"ACCEPT", "REJECT"}:
            raise PacketError(MALFORMED_VERDICT, "finding id/disposition is invalid")
        if not isinstance(finding["evidence"], str) or not finding["evidence"].strip() or not isinstance(finding["location"], str) or not finding["location"].strip():
            raise PacketError(MALFORMED_VERDICT, "finding evidence/location is empty")
        seen.add(finding_id)
    if not isinstance(verdict["tests"], list):
        raise PacketError(MALFORMED_VERDICT, "tests must be a list")
    if verdict["verdict"] == "REJECT":
        raise PacketError(REVIEW_REJECTED, "Sol explicitly rejected the artifact")
    return [dict(finding) for finding in findings]


def check_verdict(verdict: Mapping[str, Any], handoff: Mapping[str, Any]) -> str:
    """Return a status without weakening fail-closed behavior."""

    try:
        validate_verdict(verdict, handoff)
    except PacketError as exc:
        return exc.status
    return REVIEW_IN_PROGRESS


__all__ = [
    "APPROVAL_REQUIRED",
    "ARTIFACT_READY",
    "MALFORMED_ARTIFACT",
    "MALFORMED_VERDICT",
    "MAX_ARTIFACT_BYTES",
    "NOT_READY",
    "PacketError",
    "REVIEWER_UNAVAILABLE",
    "REVIEW_IN_PROGRESS",
    "REVIEW_REJECTED",
    "STATUSES",
    "VERIFIED",
    "build_artifact",
    "build_review_handoff",
    "check_verdict",
    "decode_artifact",
    "require_invoke_gate",
    "sha256_bytes",
    "validate_handoff",
    "validate_verdict",
]
