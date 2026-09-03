#!/usr/bin/env bash
# Rot, wenn /handoff wieder Produktarbeit im selben Turn erlaubt
# oder die Closeout-Härtegrenze fehlt.
set -euo pipefail
SKILL="${1:-$(dirname "$0")/../SKILL.md}"
fail=0
must_have=(
  "Härtegrenze"
  "höchstens 8 Tool-Runden"
  "Keine neue Produktarbeit"
  "Git nur Write-Set"
  "Kein Abschluss mit neuer Arbeit"
)
must_not=(
  "Punkt 1 im selben Turn"
  "unstuck](/root/raphael-skills/skills/methodik/unstuck/SKILL.md) fahren"
)
for s in "${must_have[@]}"; do
  if ! grep -q -- "$s" "$SKILL"; then
    echo "FAIL missing: $s"
    fail=1
  fi
done
for s in "${must_not[@]}"; do
  if grep -q -- "$s" "$SKILL"; then
    echo "FAIL forbidden: $s"
    fail=1
  fi
done
if grep -q "Lies zuerst (Modus SESSION):.*AGENTS.md" "$SKILL"; then
  echo "FAIL still forces AGENTS.md full read"
  fail=1
fi
if [[ "$fail" -eq 0 ]]; then
  echo "PASS $SKILL"
fi
exit "$fail"
