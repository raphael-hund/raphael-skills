#!/usr/bin/env bash
set -euo pipefail

CLI="${RAPHAEL_CHROME_CLI:-raphael-chrome}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
TARGET_ID=""

cleanup() {
  if [ -n "$TARGET_ID" ]; then
    "$CLI" close "$TARGET_ID" >/dev/null 2>&1 || true
  fi
  rm -rf "$TMP"
}
trap cleanup EXIT

"$ROOT/browser-doctor.sh" check >"$TMP/doctor.json"
"$CLI" newtab about:blank >"$TMP/newtab.json"
TARGET_ID="$(python3 - "$TMP/newtab.json" <<'PY'
import json
import sys
print(json.load(open(sys.argv[1], encoding="utf-8"))["target"]["id"])
PY
)"

"$CLI" eval "$TARGET_ID" '(()=>{document.body.innerHTML="<div id=smoke-editor contenteditable=true><p>STALE</p></div><div class=cf-turnstile></div>";return true})()' >/dev/null
RAPHAEL_CHROME_DOM_TYPE=1 "$CLI" type "$TARGET_ID" '#smoke-editor' 'REPLACEMENT' >/dev/null
"$CLI" eval "$TARGET_ID" 'document.querySelector("#smoke-editor").innerText' >"$TMP/editor.json"
python3 - "$TMP/editor.json" <<'PY'
import json
import sys
value = json.load(open(sys.argv[1], encoding="utf-8"))["eval"]["value"]
if value != "REPLACEMENT":
    raise SystemExit(f"contenteditable replacement failed: {value!r}")
PY

"$CLI" challenge "$TARGET_ID" >"$TMP/challenge.json"
python3 - "$TMP/challenge.json" <<'PY'
import json
import sys
value = json.load(open(sys.argv[1], encoding="utf-8"))["challenge"]
if not value.get("active") or value.get("kind") != "cloudflare":
    raise SystemExit(f"challenge detection failed: {value!r}")
PY

"$CLI" eval "$TARGET_ID" 'document.querySelector(".cf-turnstile").remove()' >/dev/null
"$CLI" wait-challenge "$TARGET_ID" 2000 >"$TMP/wait.json"
python3 - "$TMP/wait.json" <<'PY'
import json
import sys
value = json.load(open(sys.argv[1], encoding="utf-8"))["wait_challenge"]
if not value.get("passed"):
    raise SystemExit(f"challenge wait failed: {value!r}")
PY

"$CLI" eval "$TARGET_ID" '(()=>{const s=document.createElement("script");s.src="/cdn-cgi/challenge-platform/scripts/jsd/api.js";document.head.appendChild(s);return true})()' >/dev/null
"$CLI" challenge "$TARGET_ID" >"$TMP/passive-jsd.json"
python3 - "$TMP/passive-jsd.json" <<'PY'
import json
import sys
value = json.load(open(sys.argv[1], encoding="utf-8"))["challenge"]
if value.get("active"):
    raise SystemExit(f"passive Cloudflare JSD false positive: {value!r}")
PY

printf '{"runtime":"PASS","contenteditable":"PASS","challenge_detect":"PASS","challenge_wait":"PASS","passive_jsd":"PASS"}\n'
