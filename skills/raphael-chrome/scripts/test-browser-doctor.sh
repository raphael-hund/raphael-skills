#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
DOCTOR="$ROOT/browser-doctor.sh"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/bin"

cat >"$TMP/bin/raphael-chrome" <<'EOF'
#!/usr/bin/env bash
case "${1:-}" in
  health)
    [ "${FAKE_HEALTH:-ok}" = ok ]
    ;;
  tabs)
    printf '{"pages":[{"id":"FAKE123"}]}\n'
    ;;
  eval)
    [ "${FAKE_RUNTIME:-ok}" = ok ] && printf '{"eval":{"value":{"readyState":"complete"}}}\n'
    ;;
  newtab)
    printf '{"target":{"id":"FAKE123"}}\n'
    ;;
  *)
    exit 2
    ;;
esac
EOF

cat >"$TMP/bin/pgrep" <<'EOF'
#!/usr/bin/env bash
if [[ "$*" == *'type=renderer'* ]]; then
  count="${FAKE_RENDERERS:-2}"
  [ -f "${FAKE_STATE:-/nonexistent}" ] && count=2
  for i in $(seq 1 "$count"); do printf '%s renderer\n' "$i"; done
elif [[ "$*" == *'playwright-mcp'* ]]; then
  exit 1
fi
EOF

cat >"$TMP/bin/sudo" <<'EOF'
#!/usr/bin/env bash
: >"${FAKE_STATE:?}"
EOF

chmod +x "$TMP/bin/"*

run_expect() {
  local expected="$1"; shift
  set +e
  output="$(PATH="$TMP/bin:$PATH" RAPHAEL_CHROME_NOISE_KILLER=/bin/true "$DOCTOR" "$@" 2>&1)"
  status=$?
  set -e
  if [ "$status" -ne "$expected" ]; then
    printf 'expected exit %s, got %s: %s\n' "$expected" "$status" "$output" >&2
    exit 1
  fi
  printf '%s\n' "$output"
}

FAKE_HEALTH=ok FAKE_RENDERERS=2 run_expect 0 check | grep -q '"health":"ok"'
FAKE_HEALTH=failed FAKE_RENDERERS=2 run_expect 10 check | grep -q '"health":"failed"'
FAKE_HEALTH=ok FAKE_RENDERERS=0 run_expect 11 check | grep -q '"renderers":0'
FAKE_HEALTH=ok FAKE_RUNTIME=failed FAKE_RENDERERS=2 run_expect 14 check | grep -q '"runtime":"failed"'

STATE="$TMP/restarted"
FAKE_HEALTH=ok FAKE_RENDERERS=0 FAKE_STATE="$STATE" run_expect 0 repair | grep -q '"repaired":true'
test -f "$STATE"

printf 'browser-doctor tests: PASS\n'
