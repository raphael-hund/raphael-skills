#!/usr/bin/env bash
# codex-first.sh — delegiere ein Arbeitspaket an die Codex-CLI (GPT-5.6, Weg 2,
# non-interaktiv). EIGENER Code (kein Fremdcode vendored). Siehe SKILL.md +
# raphael-command-center/ops/ROUTING.md.
#
# Ablauf: Prompt -> Temp-Datei -> `codex exec --profile <sol|terra|luna> -C <repo>`
# -> Output-Datei. Fallback-Kette Seat 1 (/root/.codex-1) -> Seat 2 (/root/.codex-2).
# Danach reviewt CLAUDE den Diff (siehe SKILL.md), fährt Tests selbst, behält den Merge.
#
# Effort wird NICHT hier gesetzt — er steckt fest in der jeweiligen V2-Profildatei
# (sol.config.toml=medium, terra/luna.config.toml=high). approval_policy/sandbox kommen
# aus der Basis-config.toml; die in AGENTS.md Regel 11 namentlich verbotenen YOLO-Sandbox-
# Flags werden hier bewusst NICHT gesetzt.
set -euo pipefail

usage() {
  cat >&2 <<'EOF'
usage: codex-first.sh <sol|terra|luna> <repo-pfad> [prompt...]
       (ohne prompt-Argumente wird der Prompt von stdin gelesen)

beispiele:
  codex-first.sh terra /root/clients/client-acme "Migriere src/ von v1 auf v2 API."
  echo "Fixe den Off-by-one in pager.ts" | codex-first.sh sol /root/clients/client-acme
EOF
  exit 2
}

[ "$#" -ge 2 ] || usage
PROFILE="$1"; REPO="$2"; shift 2
case "$PROFILE" in
  sol|terra|luna) ;;
  *) echo "Fehler: Profil muss sol|terra|luna sein (war: '$PROFILE')" >&2; usage ;;
esac
[ -d "$REPO" ] || { echo "Fehler: Repo-Pfad existiert nicht: $REPO" >&2; exit 2; }

if ! command -v codex >/dev/null 2>&1; then
  echo "Fehler: 'codex' CLI nicht im PATH gefunden." >&2; exit 127
fi

# Prompt: restliche Argumente, sonst stdin.
if [ "$#" -gt 0 ]; then PROMPT="$*"; else PROMPT="$(cat)"; fi
case "$PROMPT" in
  *[![:space:]]*) : ;;                       # enthält mind. ein Nicht-Whitespace-Zeichen
  *) echo "Fehler: leerer Prompt." >&2; exit 2 ;;
esac

WORK="$(mktemp -d "${TMPDIR:-/tmp}/codex-first.XXXXXX")"
PROMPTFILE="$WORK/prompt.txt"
OUTFILE="$WORK/output.txt"
printf '%s\n' "$PROMPT" > "$PROMPTFILE"

run_seat() {  # $1 = CODEX_HOME
  CODEX_HOME="$1" codex exec --profile "$PROFILE" --sandbox workspace-write \
    -C "$REPO" "$(cat "$PROMPTFILE")"
}

echo "[codex-first] Profil=$PROFILE  Repo=$REPO"
echo "[codex-first] Prompt: $PROMPTFILE"
echo "[codex-first] Output: $OUTFILE"

SEAT=""
if run_seat /root/.codex-1 >"$OUTFILE" 2>&1; then
  SEAT=1
else
  echo "[codex-first] Seat 1 (/root/.codex-1) fehlgeschlagen -> Fallback Seat 2" | tee -a "$OUTFILE" >&2
  if run_seat /root/.codex-2 >>"$OUTFILE" 2>&1; then
    SEAT=2
  else
    echo "[codex-first] BEIDE Codex-Seats fehlgeschlagen. Vollständiges Log: $OUTFILE" >&2
    echo "[codex-first] Nächster Schritt: selbst bauen oder an Kimi (kimi-first) geben." >&2
    exit 1
  fi
fi

echo "[codex-first] Codex fertig (Seat $SEAT)."
echo "[codex-first] Diff-Übersicht im Repo (git diff --stat):"
git -C "$REPO" --no-pager diff --stat 2>/dev/null || echo "  (kein Git-Repo oder kein Diff)"
echo
echo "[codex-first] JETZT CLAUDE: Diff streng reviewen (code-review), Tests SELBST fahren,"
echo "              nur geprüfte Hunks mergen. Codex' Selbstauskunft NICHT vertrauen."
