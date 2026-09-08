#!/usr/bin/env bash
# Lokale Startbedingungen des gewaehlten Adapters; keine Providerinferenz.
# Exit 0: lokale Voraussetzungen erfuellt; 1: BLOCKED; 2: ungueltiger Aufruf.
set -u
cwd=""
provider=""
required=()
while [ "$#" -gt 0 ]; do
  case "$1" in
    --cwd|--provider|--require)
      [ "$#" -ge 2 ] || { printf 'ERROR missing value for %s\n' "$1"; exit 2; }
      case "$1" in
        --cwd) cwd="$2" ;;
        --provider) provider="$2" ;;
        --require) required+=("$2") ;;
      esac
      shift 2
      ;;
    --help)
      printf 'Usage: preflight.sh --cwd /absolute/project [--provider kimi|codex|claude] [--require TOOL ...]\n'
      exit 0
      ;;
    /*)
      [ -z "$cwd" ] || { printf 'ERROR unexpected argument\n'; exit 2; }
      cwd="$1"; shift
      ;;
    *) printf 'ERROR unknown argument: %s\n' "$1"; exit 2 ;;
  esac
done
case "$cwd" in /*) ;; *) printf 'ERROR --cwd must be absolute\n'; exit 2 ;; esac
case "$provider" in ''|kimi|codex|claude) ;; *) printf 'ERROR unknown provider\n'; exit 2 ;; esac
status=0
if [ -d "$cwd" ]; then
  printf 'WORKSPACE PASS %s\n' "$cwd"
else
  printf 'WORKSPACE BLOCKED directory missing: %s\n' "$cwd"
  status=1
fi
if [ -n "$provider" ]; then required+=("$provider"); fi
for tool in "${required[@]}"; do
  if [[ ! "$tool" =~ ^[a-zA-Z0-9][a-zA-Z0-9._+-]*$ ]]; then
    printf 'ERROR invalid tool name\n'; exit 2
  fi
  if command -v "$tool" >/dev/null 2>&1; then
    printf 'TOOL PASS %s installed\n' "$tool"
  else
    printf 'TOOL BLOCKED %s missing\n' "$tool"
    status=1
  fi
done
printf 'PROVIDER NOT_RUN %s: local installation does not prove authentication or inference\n' "${provider:-none-selected}"
printf 'OWNERSHIP NOT_RUN: root checks write_set; cli-worker acquires its directory lease at start\n'
if [ "$status" -eq 0 ]; then printf 'PREFLIGHT PASS local prerequisites only\n'; else printf 'PREFLIGHT BLOCKED\n'; fi
exit "$status"
