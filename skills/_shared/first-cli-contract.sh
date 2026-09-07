#!/usr/bin/env bash
# Shared prompt contract for explicit native provider-CLI delegation.

first_cli_contract() {
  local provider="$1" profile="${2:-}" skills_root="${3:-/root/raphael-skills/skills}"

  cat <<EOF
ARBEITSVERTRAG FUER DIE NATIVE ${provider}-CLI:
- Skill-Katalog fuer diesen Lauf: ${skills_root}
- Pruefe vor der Arbeit die verfuegbaren Raphael-Skills in diesem Katalog.
- Waehle alle Skills, die fachlich zum Auftrag passen, und lies jede gewaehlte SKILL.md vollstaendig, bevor du handelst.
- Nutze die gewaehlten Skills tatsaechlich; eine blosse Erwaehnung zaehlt nicht.
- Kannst du eine gewaehlte SKILL.md nicht vollstaendig lesen, beende mit BLOCKED. Behaupte keinen Erfolg und starte keine Kinder.
- Wenn du native Subagents oder Subthreads startest, bestimme vorher die passenden Skills pro Kind.
- Gib jedem Kind im Auftrag die exakten Skill-Namen und SKILL.md-Pfade. Das Kind liest diese Dateien selbst vor seiner ersten Aktion und folgt ihnen.
- Delegiere nur unabhaengige Pakete mit klaren Grenzen. Parallele Writer bekommen disjunkte Dateien oder isolierte Worktrees.
- Du bleibst Root: pruefe Diffs, Tests und Belege der Kinder selbst. Ein Kind darf keine weiteren Nachkommen starten.
EOF

  if [ "$provider" = "Codex" ] && [ "$profile" = "sol" ]; then
    cat <<'EOF'
- Sol darf native Codex-Subagents einstufig spawnen, wenn Zerlegung einen echten Parallelgewinn bringt.
- Nutze bis zu sechs parallele Kinder: Luna fuer Mechanik und Terra fuer Architektur oder Bulk-Arbeit.
- Sichtbare Codex-App-Subthreads sind nicht Teil dieses CLI-Laufs; hier gelten die nativen Codex-Subagents.
EOF
  fi

  cat <<'EOF'

NUTZERAUFTRAG:
EOF
}
