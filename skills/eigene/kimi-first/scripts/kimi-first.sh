#!/usr/bin/env bash
# Explicit interactive launcher for the single admitted native Kimi seat.
set -euo pipefail

RAPHAEL=/root/raphael-command-center/bin/raphael
KIMI_CODE_HOME=/root/.kimi-code-2

# Der Hilfetext einmal, zwei Wege hinaus: --help ist kein Fehlerfall
# (stdout, Exit 0), ein falscher Aufruf schon (stderr, Exit 2). Bis zum
# 03.08.2026 endete auch --help mit Exit 2 — in einer Kette liest das jedes
# Skript als "Werkzeug kaputt".
HILFE="usage: kimi-first.sh --seat kimi-2 --task TASK --project REPO [raphael harness options]"

usage() {
  echo "$HILFE" >&2
  exit 2
}

case "${1:-}" in
  --help|-h)
    echo "$HILFE"
    exit 0
    ;;
esac

[ "$#" -ge 2 ] || usage
[ "$1" = "--seat" ] || usage
SEAT=$2
shift 2
[ "$SEAT" = "kimi-2" ] || { echo "Fehler: nur --seat kimi-2 ist aktiviert." >&2; exit 2; }
[ -t 0 ] && [ -t 1 ] || { echo "Fehler: Kimi ist ausschließlich interaktiv erlaubt." >&2; exit 2; }
[ -x "$RAPHAEL" ] || { echo "Fehler: Raphael-Selector fehlt: $RAPHAEL" >&2; exit 127; }

export KIMI_CODE_HOME
exec "$RAPHAEL" harness kimi --seat "$SEAT" --model kimi "$@"
