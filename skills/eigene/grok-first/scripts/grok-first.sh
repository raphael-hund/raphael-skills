#!/usr/bin/env bash
# Run one bounded work package through the native Grok CLI.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../../_shared/first-cli-contract.sh
source "$SCRIPT_DIR/../../_shared/first-cli-contract.sh"

usage_text() {
  cat <<'EOF'
usage: grok-first.sh <repo-pfad> [prompt...]
       (ohne prompt-Argumente wird der Prompt von stdin gelesen)

beispiele:
  grok-first.sh /root/website-projects/foo "Benenne alle v1-Helper in src/ auf v2 um."
  cat aufgabe.txt | grok-first.sh /root/website-projects/foo
EOF
}

case "${1:-}" in
  --help|-h) usage_text; exit 0 ;;
esac
[ "$#" -ge 1 ] || { usage_text >&2; exit 2; }

REPO="$1"
shift
[ -d "$REPO" ] || { echo "Fehler: Repo-Pfad '$REPO' existiert nicht." >&2; exit 2; }
command -v grok >/dev/null 2>&1 || { echo "Fehler: 'grok' CLI nicht im PATH gefunden." >&2; exit 127; }

if ! git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[grok-first] HINWEIS: Kein Git-Repo; das Dateiscope ist nicht per Git pruefbar." >&2
fi

# Scan actual filenames, including ignored and untracked files. Contents are
# never printed; only relative candidate paths are reported.
HITS="$(find "$REPO" -type f \
  \( -name '.env' -o -name '.env.*' -o -iname '*secret*' -o -iname '*credential*' \
     -o -iname '*.pem' -o -iname '*.key' -o -iname '*.p12' -o -name 'id_rsa' \
     -o -name '.netrc' -o -name '.npmrc' -o -iname '*token*.txt' \
     -o -iname '*token*.json' -o -iname '*token*.env' \) \
  ! -iname '*.example' ! -iname '*.sample' -printf '%P\n' 2>/dev/null || true)"
if [ -n "$HITS" ]; then
  echo "[grok-first] ABBRUCH: Secret-Kandidaten im Zielpfad:" >&2
  echo "$HITS" >&2
  exit 3
fi

WORK="$(mktemp -d "${TMPDIR:-/tmp}/grok-first.XXXXXX")"
PROMPTFILE="$WORK/prompt.txt"
OUTFILE="$WORK/output.txt"
if [ "$#" -gt 0 ]; then RAW_PROMPT="$*"; else RAW_PROMPT="$(cat)"; fi
case "$RAW_PROMPT" in
  *[![:space:]]*) : ;;
  *) echo "Fehler: leerer Prompt." >&2; exit 2 ;;
esac
{
  first_cli_contract Grok "" /root/raphael-skills/skills
  printf '%s\n' "$RAW_PROMPT"
} > "$PROMPTFILE"

grok --cwd "$REPO" --disable-web-search --permission-mode acceptEdits \
  --reasoning-effort xhigh \
  --prompt-file "$PROMPTFILE" | tee "$OUTFILE"

echo "[grok-first] Output: $OUTFILE" >&2
if git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[grok-first] Diff-Uebersicht (git diff --stat):" >&2
  git -C "$REPO" diff --stat >&2 || true
fi
echo "[grok-first] Jetzt: Diff pruefen, Tests selbst fahren, nur gepruefte Aenderungen behalten." >&2
