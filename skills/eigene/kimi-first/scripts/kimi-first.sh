#!/usr/bin/env bash
# kimi-first.sh — delegiere ein Arbeitspaket an die NATIVE Kimi-CLI (kimi -p,
# non-interaktiv). Kimi arbeitet in seiner eigenen Harness mit eigenen Tools.
# Ablauf: Prompt -> Temp-Datei -> (cd <repo> && kimi -p ...) -> Output-Datei.
# Fallback-Kette: Abo 1 (~/.kimi-code, Default) -> Abo 2 (KIMI_CODE_HOME=~/.kimi-code-2).
# Danach reviewt CLAUDE den Diff (SKILL.md), fährt Tests selbst, behält den Merge.
set -euo pipefail

SKILLS_DIR=/root/raphael-skills/skills
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../../_shared/first-cli-contract.sh
source "$SCRIPT_DIR/../../_shared/first-cli-contract.sh"

usage_text() {
  cat <<'EOF'
usage: kimi-first.sh <repo-pfad> [prompt...]
       (ohne prompt-Argumente wird der Prompt von stdin gelesen)

beispiele:
  kimi-first.sh /root/clients/client-acme "Fasse alle Transkripte in raw/ zusammen."
  cat aufgabe.txt | kimi-first.sh /root/clients/client-acme
EOF
}

case "${1:-}" in
  --help|-h) usage_text; exit 0 ;;
esac
[ "$#" -ge 1 ] || { usage_text >&2; exit 2; }

REPO="$1"; shift
[ -d "$REPO" ] || { echo "Fehler: Repo-Pfad '$REPO' existiert nicht." >&2; exit 2; }
command -v kimi >/dev/null 2>&1 || { echo "Fehler: 'kimi' CLI nicht im PATH gefunden." >&2; exit 127; }

WORK="$(mktemp -d /tmp/kimi-first.XXXXXX)"
PROMPTFILE="$WORK/prompt.txt"
OUTFILE="$WORK/output.txt"
if [ "$#" -ge 1 ]; then RAW_PROMPT="$*"; else RAW_PROMPT="$(cat)"; fi
case "$RAW_PROMPT" in
  *[![:space:]]*) : ;;
  *) echo "Fehler: leerer Prompt." >&2; exit 2 ;;
esac
{
  first_cli_contract Kimi "" "$SKILLS_DIR"
  printf '%s\n' "$RAW_PROMPT"
} > "$PROMPTFILE"

run_seat() {  # $1 = KIMI_CODE_HOME oder "" für Default
  local home_env=()
  [ -n "$1" ] && home_env=(KIMI_CODE_HOME="$1")
  (cd "$REPO" && env "${home_env[@]}" \
    kimi -m kimi-code/k3 -p "$(cat "$PROMPTFILE")" --skills-dir "$SKILLS_DIR") | tee "$OUTFILE"
}

if run_seat ""; then
  echo "[kimi-first] Kimi fertig (Abo 1)." >&2
elif run_seat /root/.kimi-code-2; then
  echo "[kimi-first] Kimi fertig (Abo 2, Fallback)." >&2
else
  echo "[kimi-first] FEHLER: beide Kimi-Abos fehlgeschlagen. Aufgabe selbst machen oder codex-first." >&2
  exit 1
fi

echo "[kimi-first] Output: $OUTFILE" >&2
if git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[kimi-first] Diff-Übersicht (git diff --stat):" >&2
  git -C "$REPO" diff --stat >&2 || true
fi
echo "[kimi-first] JETZT CLAUDE: Diff streng reviewen, Tests SELBST fahren, nur geprüfte Hunks mergen." >&2
