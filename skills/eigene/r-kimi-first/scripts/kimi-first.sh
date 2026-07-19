#!/usr/bin/env bash
# kimi-first.sh — delegiere ein Arbeitspaket an die Kimi-CLI (Kimi K3 / 1M Kontext,
# Weg 2, non-interaktiv). EIGENER Code (kein Fremdcode vendored). Siehe SKILL.md +
# raphael-command-center/ops/ROUTING.md.
#
# Ablauf: Prompt -> Temp-Datei -> (cd <repo> && kimi -p "$(cat $PROMPTFILE)"
#         --skills-dir /root/raphael-skills/skills) -> Output-Datei.
# Fallback-Kette: Abo 1 (Default-Home ~/.kimi-code) -> Abo 2.
#   Abo 2 wird über die Umgebungsvariable KIMI_HOME_2 angesteuert (Pfad zum zweiten
#   Kimi-Config-Home). Ist sie nicht gesetzt, gibt es keinen zweiten Seat und der Helper
#   meldet das klar (dann selbst bauen oder an Codex/r-codex-first geben).
# Effort steckt fest auf "high" in ~/.kimi-code/config.toml (k3.default_effort=high) —
# hier NICHT überschrieben.
#
# Danach reviewt CLAUDE den Diff/Output (SKILL.md), fährt Tests selbst, behält den Merge.
set -euo pipefail

SKILLS_DIR="/root/raphael-skills/skills"

usage() {
  cat >&2 <<'EOF'
usage: kimi-first.sh <repo-pfad> [prompt...]
       (ohne prompt-Argumente wird der Prompt von stdin gelesen)

beispiele:
  kimi-first.sh /root/clients/client-acme "Fasse alle Transkripte in raw/ zusammen."
  cat aufgabe.txt | kimi-first.sh /root/clients/client-acme

optional: KIMI_HOME_2=/root/.kimi-code-2 aktiviert den Fallback auf Abo 2.
EOF
  exit 2
}

[ "$#" -ge 1 ] || usage
REPO="$1"; shift
[ -d "$REPO" ] || { echo "Fehler: Repo-Pfad existiert nicht: $REPO" >&2; exit 2; }

if ! command -v kimi >/dev/null 2>&1; then
  echo "Fehler: 'kimi' CLI nicht im PATH gefunden." >&2; exit 127
fi

if [ "$#" -gt 0 ]; then PROMPT="$*"; else PROMPT="$(cat)"; fi
case "$PROMPT" in
  *[![:space:]]*) : ;;
  *) echo "Fehler: leerer Prompt." >&2; exit 2 ;;
esac

WORK="$(mktemp -d "${TMPDIR:-/tmp}/kimi-first.XXXXXX")"
PROMPTFILE="$WORK/prompt.txt"
OUTFILE="$WORK/output.txt"
printf '%s\n' "$PROMPT" > "$PROMPTFILE"

run_abo() {  # $1 = optionaler KIMI-Home-Pfad ("" = Default-Home)
  local home="$1"
  if [ -n "$home" ]; then
    ( cd "$REPO" && KIMI_HOME="$home" kimi -p "$(cat "$PROMPTFILE")" --skills-dir "$SKILLS_DIR" )
  else
    ( cd "$REPO" && kimi -p "$(cat "$PROMPTFILE")" --skills-dir "$SKILLS_DIR" )
  fi
}

echo "[kimi-first] Repo=$REPO"
echo "[kimi-first] Prompt: $PROMPTFILE"
echo "[kimi-first] Output: $OUTFILE"

ABO=""
if run_abo "" >"$OUTFILE" 2>&1; then
  ABO=1
else
  echo "[kimi-first] Abo 1 (Default-Home) fehlgeschlagen." | tee -a "$OUTFILE" >&2
  if [ -n "${KIMI_HOME_2:-}" ] && [ -d "${KIMI_HOME_2:-}" ]; then
    echo "[kimi-first] Fallback -> Abo 2 ($KIMI_HOME_2)" | tee -a "$OUTFILE" >&2
    if run_abo "$KIMI_HOME_2" >>"$OUTFILE" 2>&1; then
      ABO=2
    else
      echo "[kimi-first] BEIDE Kimi-Abos fehlgeschlagen. Log: $OUTFILE" >&2
      exit 1
    fi
  else
    echo "[kimi-first] Kein Abo 2 konfiguriert (KIMI_HOME_2 nicht gesetzt/ungültig)." >&2
    echo "[kimi-first] Nächster Schritt: selbst bauen oder an Codex (r-codex-first) geben." >&2
    exit 1
  fi
fi

echo "[kimi-first] Kimi fertig (Abo $ABO)."
echo "[kimi-first] Diff-Übersicht im Repo (git diff --stat):"
git -C "$REPO" --no-pager diff --stat 2>/dev/null || echo "  (kein Git-Repo oder kein Diff)"
echo
echo "[kimi-first] JETZT CLAUDE: Diff/Output streng reviewen (r-code-review), Tests SELBST"
echo "             fahren, nur geprüfte Hunks mergen. Kimis Selbstauskunft NICHT vertrauen."
