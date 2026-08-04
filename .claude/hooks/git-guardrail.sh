#!/usr/bin/env bash
# git-guardrail.sh — PreToolUse hook fuer den Bash-Tool.
#
# Blockiert deterministisch eine feste Liste destruktiver Git-Befehle:
#   git push --force / -f   git reset --hard   git clean -f*   git branch -D
#
# Das ist bewusst KEIN interaktiv wartender Hook (der waere auf dem unbeaufsichtigten VPS
# verboten, siehe AGENTS.md Regel 11 / shared/security.md) — er entscheidet sofort und
# ohne Rueckfrage. Exit 0 = erlauben, Exit 2 = blocken (stderr geht als Grund an das Modell).
#
# Erwartet auf stdin ein JSON-Objekt mit .tool_input.command (Claude Code PreToolUse-Format).

set -uo pipefail

input="$(cat 2>/dev/null || true)"
[ -z "$input" ] && exit 0

if command -v jq >/dev/null 2>&1; then
  cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"
else
  # Fallback ohne jq: grobe Extraktion des "command"-Felds per sed.
  cmd="$(printf '%s' "$input" | sed -n 's/.*"command"[[:space:]]*:[[:space:]]*"\(\([^"\\]\|\\.\)*\)".*/\1/p' | head -n1)"
fi

[ -z "$cmd" ] && exit 0

reason=""

if printf '%s' "$cmd" | grep -Eq 'git([[:space:]]+[a-zA-Z0-9._-]+)*[[:space:]]+push([[:space:]]+[^|;&]*)?(--force([[:space:]=]|$)|--force-with-lease|[[:space:]]-f([[:space:]]|$))'; then
  reason="git push --force"
elif printf '%s' "$cmd" | grep -Eq 'git([[:space:]]+[a-zA-Z0-9._-]+)*[[:space:]]+reset[[:space:]]+[^|;&]*--hard'; then
  reason="git reset --hard"
elif printf '%s' "$cmd" | grep -Eq 'git([[:space:]]+[a-zA-Z0-9._-]+)*[[:space:]]+clean[[:space:]]+[^|;&]*-[a-zA-Z]*f'; then
  reason="git clean -f"
elif printf '%s' "$cmd" | grep -Eq 'git([[:space:]]+[a-zA-Z0-9._-]+)*[[:space:]]+branch[[:space:]]+[^|;&]*-D'; then
  reason="git branch -D"
fi

if [ -n "$reason" ]; then
  {
    echo "BLOCKED von git-guardrail.sh: destruktiver Git-Befehl erkannt (${reason})."
    echo "Befehl: ${cmd}"
    echo "Siehe AGENTS.md Regel 4 (zurueckspulen statt korrigieren) und shared/security.md."
    echo "Falls wirklich noetig: Raphael fragen, nicht selbst umgehen."
  } >&2
  exit 2
fi

exit 0
