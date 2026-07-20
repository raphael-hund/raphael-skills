#!/usr/bin/env bash
# Explicit interactive launcher for the single admitted native Kimi seat.
set -euo pipefail

RAPHAEL=/root/raphael-command-center/bin/raphael
KIMI_CODE_HOME=/root/.kimi-code-2

usage() {
  echo "usage: kimi-first.sh --seat kimi-2 --task TASK --project REPO [raphael harness options]" >&2
  exit 2
}

[ "$#" -ge 2 ] || usage
[ "$1" = "--seat" ] || usage
SEAT=$2
shift 2
[ "$SEAT" = "kimi-2" ] || { echo "Fehler: nur --seat kimi-2 ist aktiviert." >&2; exit 2; }
[ -t 0 ] && [ -t 1 ] || { echo "Fehler: Kimi ist ausschließlich interaktiv erlaubt." >&2; exit 2; }
[ -x "$RAPHAEL" ] || { echo "Fehler: Raphael-Selector fehlt: $RAPHAEL" >&2; exit 127; }

export KIMI_CODE_HOME
exec "$RAPHAEL" harness kimi --seat "$SEAT" --model kimi "$@"
