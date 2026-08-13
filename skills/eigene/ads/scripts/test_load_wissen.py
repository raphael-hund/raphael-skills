#!/usr/bin/env python3
"""Beweis: load-wissen läuft ohne Second Brain."""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE / "load-wissen.py"


def run(*extra: str, env: dict | None = None) -> subprocess.CompletedProcess[str]:
    e = os.environ.copy()
    if env:
        e.update(env)
    return subprocess.run(
        [sys.executable, str(SCRIPT), *extra],
        capture_output=True,
        text=True,
        env=e,
    )


def assert_ok(name: str, p: subprocess.CompletedProcess[str]) -> None:
    if p.returncode != 0:
        raise SystemExit(f"FAIL {name}: exit {p.returncode}\n{p.stdout}\n{p.stderr}")
    out = p.stdout
    if "SEGMENT=local-service-handwerk" not in out:
        raise SystemExit(f"FAIL {name}: Segment falsch\n{out}")
    if "ANDERE_SEGMENTE_NICHT_GELADEN=agenturen-coaching,b2b-dienstleister,uebertragbar" not in out:
        raise SystemExit(f"FAIL {name}: andere Segmente nicht ausgeschlossen\n{out}")
    if "BLOCKED" in out:
        raise SystemExit(f"FAIL {name}: BLOCKED ohne Brain verboten\n{out}")
    if "references/maerkte/local-service-handwerk.md" not in out:
        raise SystemExit(f"FAIL {name}: Skill-Segment nicht geladen\n{out}")
    print(f"PASS {name}")


def main() -> int:
    assert_ok("no-brain-flag", run("--skill", "ads", "--kunde", "make", "--no-brain"))
    assert_ok(
        "brain-missing",
        run("--skill", "ads", "--kunde", "make", env={"ADS_BRAIN": "/tmp/ads-brain-gibt-es-nicht"}),
    )
    for skill in ("ads-research", "ads-video", "ads-statics", "ads-copy"):
        assert_ok(f"no-brain-{skill}", run("--skill", skill, "--kunde", "make", "--no-brain"))
    print("PASS all")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
