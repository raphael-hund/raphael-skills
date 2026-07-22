#!/usr/bin/env python3
"""Integration tests for the local Sol runner's ephemeral output contract."""
from __future__ import annotations

import base64
import os
import subprocess
import tempfile
from pathlib import Path


RUNNER = Path("/root/.kimi-code/skills/sol-subagent/scripts/run-sol.sh")
EXPECTED_FINAL = """REVIEW_PASS
request_id: runner-contract-test
artifact_sha256: 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
findings: none
tests: fake runner passed
"""


def make_fake_codex(path: Path) -> None:
    path.write_text(
        """#!/usr/bin/env bash
set -euo pipefail
final_file=""
while [ "$#" -gt 0 ]; do
  if [ "$1" = "--output-last-message" ]; then
    final_file="$2"
    shift 2
  else
    shift
  fi
done
cat >/dev/null
printf 'fake codex transcript on %s\\n' "${CODEX_HOME:-missing}"
printf '%s' "$FAKE_SOL_FINAL" >"$final_file"
""",
        encoding="utf-8",
    )
    path.chmod(0o755)


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="sol-runner-test-") as raw:
        root = Path(raw)
        repo = root / "repo"
        repo.mkdir()
        subprocess.run(["git", "init", "-q", str(repo)], check=True)
        fake_codex = root / "fake-codex"
        make_fake_codex(fake_codex)
        temp_root = root / "tmp"
        temp_root.mkdir()
        env = dict(os.environ)
        env.update(
            {
                "TMPDIR": str(temp_root),
                "RAPHAEL_SOL_TESTING": "1",
                "RAPHAEL_SOL_CODEX_BINARY": str(fake_codex),
                "FAKE_SOL_FINAL": EXPECTED_FINAL,
            }
        )
        result = subprocess.run(
            [str(RUNNER), "read", str(repo)],
            input="Review the bounded artifact.",
            text=True,
            capture_output=True,
            env=env,
        )
        assert result.returncode == 0, result.stdout + result.stderr
        assert "fake codex transcript" in result.stdout
        assert "SOL_SUBAGENT_STATUS=ok" in result.stdout
        assert "SOL_SUBAGENT_SEAT=1" in result.stdout
        assert "SOL_SUBAGENT_OUTPUT=streamed" in result.stdout
        expected_b64 = base64.b64encode(EXPECTED_FINAL.encode()).decode()
        assert f"SOL_SUBAGENT_FINAL_B64={expected_b64}" in result.stdout
        assert "SOL_SUBAGENT_FINAL=/" not in result.stdout
        assert "SOL_SUBAGENT_BASELINE=/" not in result.stdout
        assert not list(temp_root.iterdir()), "runner left sensitive temporary artifacts"

    print("Sol subagent runner tests: OK (streamed, lossless final, ephemeral cleanup)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
