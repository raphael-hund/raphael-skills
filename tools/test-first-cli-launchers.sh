#!/usr/bin/env bash
# Deterministic tests for codex-first, kimi-first, and grok-first.
# Provider binaries are replaced with local stubs; no model call is made.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

CODEX_LAUNCHER="$ROOT/skills/eigene/codex-first/scripts/codex-first.sh"
KIMI_LAUNCHER="$ROOT/skills/eigene/kimi-first/scripts/kimi-first.sh"
GROK_LAUNCHER="$ROOT/skills/eigene/grok-first/scripts/grok-first.sh"
LOG="$TMP/calls.log"
BIN="$TMP/bin"
REPO="$TMP/repo"
mkdir -p "$BIN" "$REPO"
git -C "$REPO" init -q
git -C "$REPO" config user.email test@example.invalid
git -C "$REPO" config user.name Test
printf 'fixture\n' > "$REPO/README.md"
git -C "$REPO" add README.md
git -C "$REPO" commit -qm fixture

fails=0

pass() { echo "  ok   $1"; }
fail() { echo "  FAIL $1"; fails=$((fails + 1)); }
expect_success() {
  local name="$1"; shift
  if "$@" >"$TMP/stdout" 2>"$TMP/stderr"; then pass "$name"; else fail "$name"; fi
}
expect_exit() {
  local name="$1" want="$2"; shift 2
  "$@" >"$TMP/stdout" 2>"$TMP/stderr"
  local got=$?
  if [ "$got" -eq "$want" ]; then pass "$name"; else fail "$name (expected $want, got $got)"; fi
}
expect_log() {
  local name="$1" pattern="$2"
  if grep -Fq -- "$pattern" "$LOG"; then pass "$name"; else fail "$name (missing: $pattern)"; fi
}

for skill in codex-first kimi-first grok-first; do
  if jq -e --arg skill "$skill" '.skills[$skill]' "$ROOT/codex/compatibility.json" >/dev/null; then
    pass "$skill is in canonical registry"
  else
    fail "$skill is in canonical registry"
  fi
done

cat > "$BIN/codex" <<'EOF'
#!/usr/bin/env bash
prompt="$(cat)"
printf 'codex home=%s args=%s stdin=%s\n' "${CODEX_HOME:-}" "$*" "$prompt" >> "$FIRST_CLI_TEST_LOG"
if [ "${CODEX_HOME:-}" = "/root/.codex-1" ] && [ "${FAIL_FIRST_CODEX:-0}" = 1 ]; then exit 42; fi
printf 'CODEX-STUB-OK\n'
EOF
cat > "$BIN/kimi" <<'EOF'
#!/usr/bin/env bash
printf 'kimi home=%s cwd=%s args=%s\n' "${KIMI_CODE_HOME:-default}" "$PWD" "$*" >> "$FIRST_CLI_TEST_LOG"
# FAIL_FIRST_KIMI=1: Abo 1 (default home) fails; Abo 2 succeeds.
# FAIL_BOTH_KIMI_ABO=1: both subscription homes fail; Moonshot backup succeeds.
if [ "${FAIL_FIRST_KIMI:-0}" = 1 ] && [ "${KIMI_CODE_HOME:-default}" = "default" ]; then exit 43; fi
if [ "${FAIL_BOTH_KIMI_ABO:-0}" = 1 ]; then
  case " $* " in
    *" moonshot-ai/kimi-k3 "*) ;;
    *) exit 43 ;;
  esac
fi
printf 'KIMI-STUB-OK\n'
EOF
cat > "$BIN/grok" <<'EOF'
#!/usr/bin/env bash
prompt_file=""
previous=""
for argument in "$@"; do
  if [ "$previous" = "--prompt-file" ]; then prompt_file="$argument"; fi
  previous="$argument"
done
prompt=""
[ -n "$prompt_file" ] && prompt="$(cat "$prompt_file")"
printf 'grok cwd=%s args=%s\n' "$PWD" "$*" >> "$FIRST_CLI_TEST_LOG"
printf 'grok prompt=%s\n' "$prompt" >> "$FIRST_CLI_TEST_LOG"
printf 'GROK-STUB-OK\n'
EOF
chmod +x "$BIN/codex" "$BIN/kimi" "$BIN/grok"
export PATH="$BIN:$PATH"
export FIRST_CLI_TEST_LOG="$LOG"

: > "$LOG"
expect_success "codex-first uses native CLI" "$CODEX_LAUNCHER" luna "$REPO" "CODEX-PROMPT-MARKER"
expect_log "codex-first selects profile" "args=exec --profile luna"
expect_log "codex-first passes working directory" "-C $REPO"
expect_log "codex-first keeps the user prompt in stdin" "CODEX-PROMPT-MARKER"
expect_log "codex-first uses stdin marker" "-C $REPO -"
expect_log "codex-first requires root skill selection" "Pruefe vor der Arbeit die verfuegbaren Raphael-Skills"
expect_log "codex-first exposes a sandbox-readable skill catalog" "Skill-Katalog fuer diesen Lauf: /tmp/codex-first."
expect_log "codex-first passes skills to children" "exakten Skill-Namen und SKILL.md-Pfade"
expect_log "codex-first fails closed on unreadable skills" "beende mit BLOCKED"
codex_skills_path="$(sed -n 's/^\[codex-first\] Skills: //p' "$TMP/stdout" | tail -1)"
if [ -r "$codex_skills_path/tdd/SKILL.md" ]; then pass "codex runtime catalog is flat by skill name"; else fail "codex runtime catalog is flat by skill name"; fi

: > "$LOG"
FAIL_FIRST_CODEX=1 expect_success "codex-first falls back to seat 2" "$CODEX_LAUNCHER" sol "$REPO" "fallback"
expect_log "codex-first tried seat 1" "codex home=/root/.codex-1"
expect_log "codex-first tried seat 2" "codex home=/root/.codex-2"
expect_log "Sol may spawn native subagents" "Sol darf native Codex-Subagents"
expect_log "Sol routes bounded children" "Luna fuer Mechanik und Terra fuer Architektur"

for home in /root/.codex-1 /root/.codex-2; do
  if grep -Fqx 'model_reasoning_effort = "high"' "$home/sol.config.toml"; then
    pass "Sol is high in $home"
  else
    fail "Sol is high in $home"
  fi
  if grep -Fqx 'model_reasoning_effort = "max"' "$home/luna.config.toml"; then
    pass "Luna is max in $home"
  else
    fail "Luna is max in $home"
  fi
done

: > "$LOG"
expect_success "kimi-first uses native CLI" "$KIMI_LAUNCHER" "$REPO" "KIMI-PROMPT-MARKER"
expect_log "kimi-first runs in target directory" "kimi home=default cwd=$REPO"
expect_log "kimi-first uses prompt mode" "-p ARBEITSVERTRAG FUER DIE NATIVE Kimi-CLI"
expect_log "kimi-first keeps the user prompt" "KIMI-PROMPT-MARKER"
expect_log "kimi-first pins K3" "-m cliproxy/k3"
expect_log "kimi-first loads canonical skills" "--skills-dir /root/raphael-skills/skills"
expect_log "kimi-first names its skill catalog" "Skill-Katalog fuer diesen Lauf: /root/raphael-skills/skills"
expect_log "kimi-first requires root skill selection" "Pruefe vor der Arbeit die verfuegbaren Raphael-Skills"
expect_log "kimi-first passes skills to children" "exakten Skill-Namen und SKILL.md-Pfade"

for home in /root/.kimi-code /root/.kimi-code-2; do
  if grep -A2 '^\[thinking\]' "$home/config.toml" | grep -Fqx 'effort = "high"'; then
    pass "Kimi is high in $home"
  else
    fail "Kimi is high in $home"
  fi
done

if grep -Fq 'exakten Skill-Namen und absoluten SKILL.md-Pfad' /root/.kimi-code/agents/kimi-driver.md; then
  pass "Kimi driver passes exact skills to children"
else
  fail "Kimi driver passes exact skills to children"
fi

KIMI_GPT_RUNNER=/root/.kimi-code/skills/gpt-subagent/scripts/run-gpt-subagent.sh
if sed -n '/^  luna)/,/^    ;;/p' "$KIMI_GPT_RUNNER" | grep -Fqx '    route_effort="max"'; then
  pass "Kimi to Luna bridge uses maximum effort"
else
  fail "Kimi to Luna bridge uses maximum effort"
fi

KIMI_GROK_RUNNER=/root/.kimi-code/skills/grok-subagent/scripts/run-grok-subagent.sh
if sed -n '/^  grok)/,/^    ;;/p' "$KIMI_GROK_RUNNER" | grep -Fqx '    route_effort="xhigh"'; then
  pass "Kimi to Grok bridge uses maximum effort"
else
  fail "Kimi to Grok bridge uses maximum effort"
fi
if sed -n '/^  grok)/,/^    ;;/p' "$KIMI_GROK_RUNNER" | grep -Fqx '    route_model="grok-4.6"'; then
  pass "Kimi to Grok bridge uses Grok 4.6"
else
  fail "Kimi to Grok bridge uses Grok 4.6"
fi
if grep -Fq 'Grok 4.6 mit Reasoning-Effort `xhigh`' /root/.kimi-code/skills/grok-subagent/SKILL.md; then
  pass "Kimi Grok skill documents maximum effort"
else
  fail "Kimi Grok skill documents maximum effort"
fi
if grep -Fq 'GPT-5.6 Luna immer mit Effort `max`' /root/.kimi-code/skills/gpt-subagent/SKILL.md; then
  pass "Kimi GPT skill documents Luna maximum effort"
else
  fail "Kimi GPT skill documents Luna maximum effort"
fi

: > "$LOG"
FAIL_FIRST_KIMI=1 expect_success "kimi-first falls back to subscription 2" "$KIMI_LAUNCHER" "$REPO" "fallback"
expect_log "kimi-first tried subscription 1" "kimi home=default"
expect_log "kimi-first tried subscription 2" "kimi home=/root/.kimi-code-2"
if grep -Fq 'moonshot-ai/kimi-k3' "$LOG"; then
  fail "kimi-first skips Moonshot when Abo 2 works"
else
  pass "kimi-first skips Moonshot when Abo 2 works"
fi

: > "$LOG"
FAIL_BOTH_KIMI_ABO=1 expect_success "kimi-first falls back to Moonshot after both subscriptions" "$KIMI_LAUNCHER" "$REPO" "payg-backup"
expect_log "kimi-first tried subscription 1 before PAYG" "kimi home=default"
expect_log "kimi-first tried subscription 2 before PAYG" "kimi home=/root/.kimi-code-2"
expect_log "kimi-first tries Moonshot only after seats fail" "moonshot-ai/kimi-k3"
if awk '
  /kimi home=default/ && $0 ~ /cliproxy\/k3/ && !a { a=NR }
  /kimi home=\/root\/.kimi-code-2/ && !b { b=NR }
  /moonshot-ai\/kimi-k3/ && !c { c=NR }
  END { exit !(a && b && c && a<b && b<c) }
' "$LOG"; then
  pass "kimi-first order is Abo1 then Abo2 then Moonshot"
else
  fail "kimi-first order is Abo1 then Abo2 then Moonshot"
fi

mv "$BIN/kimi" "$BIN/kimi.stub"
expect_exit "kimi-first reports a missing CLI" 127 env PATH="$BIN:/usr/bin:/bin" \
  "$KIMI_LAUNCHER" "$REPO" "missing-cli"
mv "$BIN/kimi.stub" "$BIN/kimi"
expect_exit "kimi-first rejects an empty user prompt" 2 "$KIMI_LAUNCHER" "$REPO" "   "

: > "$LOG"
expect_success "grok-first uses native CLI" "$GROK_LAUNCHER" "$REPO" "GROK-PROMPT-MARKER"
expect_log "grok-first sets target directory" "args=--cwd $REPO"
expect_log "grok-first uses a prompt file" "--prompt-file "
if grep -E '^grok .*args=' "$LOG" | grep -Fq -- "GROK-PROMPT-MARKER"; then fail "grok prompt stays out of argv"; else pass "grok prompt stays out of argv"; fi
expect_log "grok-first disables web access" "--disable-web-search"
expect_log "grok-first does not auto-approve arbitrary tools" "--permission-mode acceptEdits"
expect_log "grok-first uses its maximum effort" "--reasoning-effort xhigh"
expect_log "grok-first requires root skill selection" "Pruefe vor der Arbeit die verfuegbaren Raphael-Skills"
expect_log "grok-first names its skill catalog" "Skill-Katalog fuer diesen Lauf: /root/raphael-skills/skills"
expect_log "grok-first passes skills to children" "exakten Skill-Namen und SKILL.md-Pfade"
if grep -Fq -- "--always-approve" "$LOG"; then fail "grok-first avoids always-approve"; else pass "grok-first avoids always-approve"; fi

for worker in "$ROOT/agents/grok-worker.md" /root/.grok/agents/grok-worker.md; do
  if grep -Fqx 'effort: xhigh' "$worker" && grep -Fqx 'model: grok-4.6' "$worker"; then
    pass "Grok worker uses maximum effort in $worker"
  else
    fail "Grok worker uses maximum effort in $worker"
  fi
done

if grep -q 'Kein Exklusiv-Modell' "$ROOT/agents/qa.md" && grep -q 'Luna + Grok' "$ROOT/agents/README.md"; then
  pass "canonical QA role is a job cut, not a Luna lock"
else
  fail "canonical QA role is a job cut, not a Luna lock"
fi
if grep -q 'Kein Exklusiv-Modell' "$ROOT/agents/reviewer.md" && grep -q 'andere Familie' "$ROOT/agents/README.md"; then
  pass "canonical reviewer is other-family, not a Sol lock"
else
  fail "canonical reviewer is other-family, not a Sol lock"
fi

if grep -Fq 'exakten Skill-Namen und absoluten SKILL.md-Pfad' /root/.claude/CLAUDE.md; then
  pass "global subagent rules pass exact skills to children"
else
  fail "global subagent rules pass exact skills to children"
fi

printf 'secret\n' > "$REPO/.env"
git -C "$REPO" add .env
git -C "$REPO" commit -qm secret-fixture
: > "$LOG"
expect_exit "grok-first blocks tracked secret candidates" 3 "$GROK_LAUNCHER" "$REPO" "must-not-run"
if [ ! -s "$LOG" ]; then pass "grok CLI was not called after gate failure"; else fail "grok CLI was called after gate failure"; fi

git -C "$REPO" rm --cached -q .env
printf '.env\n' > "$REPO/.gitignore"
git -C "$REPO" add .gitignore
git -C "$REPO" commit -qm ignored-secret-fixture
: > "$LOG"
expect_exit "grok-first blocks ignored secret candidates" 3 "$GROK_LAUNCHER" "$REPO" "must-not-run"
if [ ! -s "$LOG" ]; then pass "grok CLI was not called for ignored secrets"; else fail "grok CLI was called for ignored secrets"; fi

rm "$REPO/.env"
expect_exit "grok-first rejects an empty user prompt" 2 "$GROK_LAUNCHER" "$REPO" "   "

echo
if [ "$fails" -eq 0 ]; then
  echo "First-CLI launcher tests: OK"
  exit 0
fi
echo "First-CLI launcher tests: FAIL ($fails)"
exit 1
