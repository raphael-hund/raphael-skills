#!/bin/bash
# Follow an extraction run: review every packet that has proposals, repeat
# until the extractor is gone and nothing is left to review. Idempotent.
# usage: follow_reviews.sh <run-dir> <extract-pid> [workers] [extra review args...]
set -u

usage() {
  printf 'usage: follow_reviews.sh <run-dir> <extract-pid> [workers] [weitere review.py-Argumente]\n' >&2
}

case "${1:-}" in
  -h|--help)
    cat <<'HILFE'
follow_reviews.sh - begleitet einen Extraktionslauf und reviewt jedes Paket
mit Vorschlaegen, bis der Extraktor beendet ist und nichts mehr offen ist.

Aufruf: bash follow_reviews.sh <run-dir> <extract-pid> [workers] [weitere review.py-Argumente]

  <run-dir>       Laufverzeichnis mit proposals.jsonl und reviews.jsonl
  <extract-pid>   PID des laufenden Extraktors; endet sie, folgt ein letzter Durchgang
  [workers]       parallele review.py-Worker, Vorgabe 6

Idempotent. Exit 0 = Durchlauf beendet, 2 = Aufruf abgelehnt.
HILFE
    exit 0
    ;;
esac

if [ "$#" -lt 2 ]; then
  usage
  exit 2
fi
case "$1" in -*) usage; exit 2 ;; esac
case "$2" in -*) usage; exit 2 ;; esac

RUN_DIR="$1"; EXTRACT_PID="$2"; WORKERS="${3:-6}"; shift 3 || shift $#
cd "$(dirname "$0")"
while true; do
  python3 review.py --proposals "$RUN_DIR/proposals.jsonl" --output "$RUN_DIR/reviews.jsonl" --workers "$WORKERS" "$@" 2>&1 | tail -2
  if ! kill -0 "$EXTRACT_PID" 2>/dev/null; then
    # extractor finished: one final pass, then stop
    python3 review.py --proposals "$RUN_DIR/proposals.jsonl" --output "$RUN_DIR/reviews.jsonl" --workers "$WORKERS" "$@" 2>&1 | tail -2
    echo "FOLLOW_DONE $(date -u +%H:%M:%S)"
    exit 0
  fi
  sleep 60
done
