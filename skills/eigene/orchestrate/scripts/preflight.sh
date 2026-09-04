#!/usr/bin/env bash
# orchestrate Preflight (04.09.2026): vor jedem Fan-out.
# 1. Jede Modellfamilie über die tatsächliche Base-URL der Session anpingen (10 s).
# 2. Fremden laufenden Workflow im Ziel-Worktree erkennen.
# 3. Leaf-Budget (Sekunden/Tool-Calls) ausgeben, damit Pakete danach geschnitten werden.
# Ausgabe: eine Zeile je Familie OK/DOWN, dann BUDGET, dann OWNER. Exit 0 immer;
# der Controller entscheidet (DOWN-Familie = im Script als BLOCKED behandeln, Fallback laut dispatch.md).
set -u
BASE="${ANTHROPIC_BASE_URL:-https://api.anthropic.com}"
WT="${1:-}"
KEYFILE=/etc/raphael-gateway/mac-gateway-key
KEY="${ANTHROPIC_API_KEY:-}"
if [ -z "$KEY" ] && [ -r "$KEYFILE" ]; then KEY="$(tr -d '\n' < "$KEYFILE")"; fi
if [ -z "$KEY" ] && sudo -n test -r "$KEYFILE" 2>/dev/null; then KEY="$(sudo -n cat "$KEYFILE" | tr -d '\n')"; fi
probe() {
  local fam="$1" model="$2" code t0 t1
  t0=$(date +%s.%N)
  code=$(timeout 15 curl -s -o /dev/null -w '%{http_code}' "$BASE/v1/messages" \
    -H "x-api-key: $KEY" -H "Authorization: Bearer $KEY" -H 'anthropic-version: 2023-06-01' \
    -H 'content-type: application/json' \
    -d "{\"model\":\"$model\",\"max_tokens\":4,\"messages\":[{\"role\":\"user\",\"content\":\"ok\"}]}" 2>/dev/null || echo 000)
  t1=$(date +%s.%N)
  local note=""
  [ "$code" = 402 ] && note=" GUTHABEN-LEER"
  printf 'FAMILIE %-6s %-22s %s %.1fs%s\n' "$fam" "$model" "$([ "$code" = 200 ] && echo OK || echo "DOWN($code)")" "$(echo "$t1-$t0" | bc)" "$note"
}
echo "BASE_URL $BASE"
probe fable  claude-fable-5-1
probe opus   claude-opus-5
probe sol    gpt-5.6-sol
probe luna   gpt-5.6-luna
probe grok   claude-gw-xai-4.6
# Grok-Guthaben direkt am VPS-Proxy (402 = Build usage balance exhausted; Mac-Gateway zeigt nur 503 auth_unavailable)
gc=$(timeout 20 curl -s -o /tmp/pf-grok8317.json -w '%{http_code}' http://127.0.0.1:8317/v1/messages -H "Authorization: Bearer $KEY" -H 'anthropic-version: 2023-06-01' -H 'content-type: application/json' -d '{"model":"xai/grok-4.6","max_tokens":4,"messages":[{"role":"user","content":"ok"}]}' 2>/dev/null || echo 000)
[ "$gc" = 402 ] && echo "FAMILIE grok   VPS-8317               DOWN(402) GUTHABEN-LEER: $(head -c 120 /tmp/pf-grok8317.json)"
echo "BUDGET leaf_seconds=${RAPHAEL_SUBAGENT_MAX_SECONDS:-3600} leaf_tools=${RAPHAEL_SUBAGENT_MAX_TOOLS:-200} (raphael-subagent-budget-guard; Bau-Paket ≤ 2–3 Routen, Zeitbudget im Prompt)"
echo "PROFIL $(cat /root/.claude/fleet-profile 2>/dev/null || echo multi-family)"
if [ -n "$WT" ]; then
  # fremde Runs: workflow-json mit status running, deren Script den Worktree-Pfad nennt
  found=0
  # Ein laufender Run hat noch keine wf_*.json (die entsteht beim Ende); er hat ein
  # subagents/workflows/wf_*/journal.jsonl mit started-Zeilen ohne result/failed und Aktivitaet < 15 min.
  now=$(date +%s)
  for jl in /root/.claude/projects/*/*/subagents/workflows/wf_*/journal.jsonl; do
    [ -f "$jl" ] || continue
    d=$(dirname "$jl"); id=$(basename "$d")
    [ -f "$(dirname "$(dirname "$(dirname "$d")")")/workflows/$id.json" ] && continue   # beendet
    started=$(grep -c '"type":"started"' "$jl" 2>/dev/null); done_=$(grep -cE '"type":"(result|failed)"' "$jl" 2>/dev/null)
    [ "${started:-0}" -gt "${done_:-0}" ] || continue
    newest=$(ls -t "$d"/agent-*.jsonl 2>/dev/null | head -1); [ -n "$newest" ] || continue
    age=$(( now - $(stat -c %Y "$newest") )); [ "$age" -lt 900 ] || continue
    if grep -q "$WT" "$newest" 2>/dev/null; then
      echo "OWNER FREMDER-RUN $id laeuft in $WT (Aktivitaet vor ${age}s) — erst stoppen lassen, dann starten"; found=1
    fi
  done
  [ "$found" = 0 ] && echo "OWNER frei: kein laufender Workflow nennt $WT"
fi
exit 0
