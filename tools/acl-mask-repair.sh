#!/usr/bin/env bash
# ACL-Maske reparieren (Raphael 04.09.2026). Laeuft als root per systemd-Timer.
# Eintraege mit user:raphael-claude und mask::--- bekommen mask rw- (Datei) bzw.
# rwx (Verzeichnis/ausfuehrbar). Scope: nur was der Session-User liest
# (Konfig, Hooks, Skills, Agents, Tool-Skripte); Session-Muell, Runs, Caches,
# Secrets und root-only-Ablagen bleiben draussen.
# Modi: (default) inkrementell = ctime < 15 min; --full = ganzer Scope; --dry-run.
# Log: /var/log/acl-mask-repair.log
set -uo pipefail
DRY=0; FULL=0
for a in "$@"; do case "$a" in --dry-run) DRY=1;; --full) FULL=1;; esac; done
ROOTS=(
  /root/.claude/settings.json /root/.claude/settings.local.json /root/.claude/CLAUDE.md /root/.claude/.credentials.json
  /root/.claude/hooks /root/.claude/agents /root/.claude/rules /root/.claude/skills /root/.claude/commands
  /root/.claude/session-env /root/.claude/fix-journal /root/.claude/skill-observations /root/.claude/skill-updates
  /root/.claude/visual-harness/state /root/.claude/visual-harness/previews /root/.claude/visual-harness/runs /root/.claude/paste-cache
  /root/.agents /root/.codex/AGENTS.md /root/.grok/AGENTS.md /root/.kimi-code/AGENTS.md
)
# /root/tools nur flach plus Skript-Unterordner, nie vendor/model-lanes/secrets
TOOLS_MAX=2
PRUNE=( -path /root/tools/vendor -o -path /root/tools/model-lanes -o -path /root/tools/secrets -o -path /root/tools/vault
        -o -path /root/tools/auth-relays -o -path /root/tools/node-deps -o -path /root/tools/vps-browser
        -o -path /root/tools/whisper.cpp -o -name node_modules -o -name __pycache__ -o -name .git -o -name .cache -o -name .venv )
AGE=(); [ "$FULL" = 1 ] || AGE=( -cmin -15 )
LOG=/var/log/acl-mask-repair.log
existing=(); for r in "${ROOTS[@]}"; do [ -e "$r" ] && existing+=("$r"); done
n=0
while IFS= read -r -d '' f; do
  acl=$(getfacl -p --omit-header "$f" 2>/dev/null) || continue
  case "$acl" in *"user:raphael-claude:"*) ;; *) continue;; esac
  case "$acl" in *"mask::---"*) ;; *) continue;; esac
  if [ -d "$f" ] || [ -x "$f" ]; then m=rwx; else m=rw-; fi
  if [ "$DRY" = 1 ]; then echo "WUERDE m::$m $f"; else
    setfacl -m "m::$m" "$f" && echo "$(date -Iseconds) repariert m::$m $f" >> "$LOG"
  fi
  n=$((n+1))
done < <( { find "${existing[@]}" -xdev \( -name node_modules -o -name __pycache__ -o -name .git \) -prune -o \( -type f -o -type d \) "${AGE[@]}" -print0 2>/dev/null
            find /root/tools -xdev -maxdepth "$TOOLS_MAX" \( "${PRUNE[@]}" \) -prune -o \( -type f -o -type d \) "${AGE[@]}" -print0 2>/dev/null; } )
[ "$n" -gt 0 ] && echo "$n Eintraege $( [ "$DRY" = 1 ] && echo gefunden || echo repariert) ($( [ "$FULL" = 1 ] && echo full || echo inkrementell))"
exit 0
