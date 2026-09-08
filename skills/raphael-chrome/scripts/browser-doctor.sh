#!/usr/bin/env bash
set -u

MODE="${1:-check}"
SERVICE="${RAPHAEL_CHROME_SERVICE:-raphael-chrome.service}"
NOISE_KILLER="${RAPHAEL_CHROME_NOISE_KILLER:-/root/raphael-command-center/tools/kill-playwright-cdp-noise.sh}"
HEALTH_TIMEOUT="${RAPHAEL_CHROME_DOCTOR_TIMEOUT:-12}"

health_ok() {
  timeout "${HEALTH_TIMEOUT}s" raphael-chrome health >/tmp/raphael-chrome-doctor-health.json 2>/tmp/raphael-chrome-doctor-health.err
}

runtime_ok() {
  local tabs_file="/tmp/raphael-chrome-doctor-tabs.json" target_id
  if ! timeout "${HEALTH_TIMEOUT}s" raphael-chrome tabs >"$tabs_file" 2>/tmp/raphael-chrome-doctor-runtime.err; then
    return 1
  fi
  target_id="$(python3 - "$tabs_file" <<'PY'
import json
import sys

try:
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    pages = data.get("pages") or []
    print(pages[0].get("id", "") if pages else "")
except Exception:
    print("")
PY
)"
  if [ -z "$target_id" ]; then
    if ! timeout "${HEALTH_TIMEOUT}s" raphael-chrome newtab about:blank >"$tabs_file" 2>/tmp/raphael-chrome-doctor-runtime.err; then
      return 1
    fi
    target_id="$(python3 - "$tabs_file" <<'PY'
import json
import sys

try:
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    print((data.get("target") or {}).get("id", ""))
except Exception:
    print("")
PY
)"
  fi
  [ -n "$target_id" ] || return 1
  timeout "${HEALTH_TIMEOUT}s" raphael-chrome eval "$target_id" \
    '({readyState:document.readyState,href:location.href})' \
    >/tmp/raphael-chrome-doctor-runtime.json 2>/tmp/raphael-chrome-doctor-runtime.err
}

renderer_count() {
  pgrep -af '/opt/google/chrome/chrome --type=renderer' 2>/dev/null | wc -l | tr -d ' '
}

playwright_noise_count() {
  pgrep -af 'playwright-mcp.*(cdp-endpoint|127\.0\.0\.1:9222)' 2>/dev/null | wc -l | tr -d ' '
}

report() {
  local health="$1" runtime="$2" renderers="$3" noise="$4" repaired="$5"
  printf '{"health":"%s","runtime":"%s","renderers":%s,"playwright_cdp_processes":%s,"repaired":%s}\n' \
    "$health" "$runtime" "$renderers" "$noise" "$repaired"
}

check() {
  local renderers noise
  renderers="$(renderer_count)"
  noise="$(playwright_noise_count)"

  if ! health_ok; then
    report "failed" "unknown" "$renderers" "$noise" false
    return 10
  fi

  if [ "$renderers" -lt 1 ]; then
    report "ok" "failed" "$renderers" "$noise" false
    return 11
  fi

  if ! runtime_ok; then
    report "ok" "failed" "$renderers" "$noise" false
    return 14
  fi

  report "ok" "ok" "$renderers" "$noise" false
}

repair() {
  local before_health="failed" before_renderers before_noise after_renderers after_noise
  before_renderers="$(renderer_count)"
  before_noise="$(playwright_noise_count)"
  if health_ok; then before_health="ok"; fi

  if [ "$before_health" = "ok" ] && [ "$before_renderers" -ge 1 ]; then
    if runtime_ok; then
      report "ok" "ok" "$before_renderers" "$before_noise" false
      return 0
    fi
  fi

  if [ -x "$NOISE_KILLER" ]; then
    "$NOISE_KILLER" >/tmp/raphael-chrome-doctor-noise.log 2>&1 || true
  fi

  if ! sudo -n systemctl restart "$SERVICE"; then
    report "restart-failed" "failed" 0 "$(playwright_noise_count)" false
    return 12
  fi

  for _ in $(seq 1 20); do
    sleep 0.5
    after_renderers="$(renderer_count)"
    if health_ok && [ "$after_renderers" -ge 1 ] && runtime_ok; then
      after_noise="$(playwright_noise_count)"
      report "ok" "ok" "$after_renderers" "$after_noise" true
      return 0
    fi
  done

  report "failed-after-repair" "failed" "$(renderer_count)" "$(playwright_noise_count)" true
  return 13
}

case "$MODE" in
  check) check ;;
  repair) repair ;;
  *) printf 'usage: %s {check|repair}\n' "$0" >&2; exit 64 ;;
esac
