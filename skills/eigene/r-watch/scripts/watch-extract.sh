#!/usr/bin/env bash
# watch-extract.sh — lädt ein Video (YouTube/IG/TikTok/…) nach /tmp und sampelt es
# für die Analyse durch r-watch: Hook-Kontaktbögen + Body-Einzelbilder + Transkript.
# EIGENER Code (kein Fremdcode vendored). Siehe SKILL.md.
#
# Zwei-Stufen-Sampling (Spec: ops/quellenreview-2026-07-19.md Teil D, "Das Gist"):
#   Hook = erste 15 s mit 15 fps, gekachelt als Kontaktbögen (5x5-Tiles)
#   Body = ab Sekunde 15, 1 Frame pro 3,5 s
# Transkript: YouTube -> --write-auto-subs (kein Whisper nötig);
#             IG/TikTok -> Frames-only (On-Screen-Text trägt die Botschaft).
set -euo pipefail

usage() {
  cat >&2 <<'EOF'
usage: watch-extract.sh <video-url> [arbeits-verzeichnis]

beispiel:
  watch-extract.sh "https://www.youtube.com/watch?v=..."
  watch-extract.sh "https://www.tiktok.com/@user/video/..." /tmp/r-watch-meinreel

Ohne Arbeits-Verzeichnis wird /tmp/r-watch.XXXXXX angelegt.
EOF
  exit 2
}

[ "$#" -ge 1 ] || usage
URL="$1"
WORK="${2:-$(mktemp -d "${TMPDIR:-/tmp}/r-watch.XXXXXX")}"
mkdir -p "$WORK"

for tool in yt-dlp ffmpeg; do
  command -v "$tool" >/dev/null 2>&1 || { echo "Fehler: '$tool' nicht im PATH." >&2; exit 127; }
done

VIDEO="$WORK/video.mp4"

# --- Download (+ Auto-Subs bei YouTube) -------------------------------------
# Subs sind best effort: schlägt der Sub-Download fehl (z. B. HTTP 429 Rate-Limit),
# wird ohne Subs erneut versucht — das Video ist der Pflichtteil, das Transkript
# die Kür (Frames-only ist der dokumentierte Fallback).
case "$URL" in
  *youtube.com*|*youtu.be*)
    if ! yt-dlp --write-auto-subs --sub-langs "de.*,en.*" --convert-subs srt \
      -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
      -o "$WORK/video.%(ext)s" "$URL"; then
      echo "Hinweis: Download mit Auto-Subs fehlgeschlagen — Retry ohne Subs." >&2
      yt-dlp -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
        -o "$WORK/video.%(ext)s" "$URL"
    fi
    ;;
  *)
    yt-dlp -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
      -o "$WORK/video.%(ext)s" "$URL"
    ;;
esac

# Echter Dateiname auflösen (Extension kann durch Merge variieren)
[ -f "$VIDEO" ] || VIDEO="$(ls "$WORK"/video.* | grep -v -E '\.(srt|vtt)$' | head -1)"
[ -f "$VIDEO" ] || { echo "Fehler: kein Video heruntergeladen." >&2; exit 1; }

DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO" 2>/dev/null || echo '?')"
echo "Video: $VIDEO (Dauer: ${DUR%.*} s)"

# --- Hook: erste 15 s, 15 fps, gekachelt (5x5) -------------------------------
mkdir -p "$WORK/hook" "$WORK/body"
ffmpeg -hide_banner -loglevel error -t 15 -i "$VIDEO" \
  -vf "fps=15,scale=320:-1,tile=5x5" -frames:v 9 "$WORK/hook/hook-%02d.jpg"

# --- Body: ab Sekunde 15, 1 Frame / 3,5 s ------------------------------------
ffmpeg -hide_banner -loglevel error -ss 15 -i "$VIDEO" \
  -vf "fps=1/3.5,scale=480:-1" "$WORK/body/body-%04d.jpg"

# --- Transkript-Fund melden ---------------------------------------------------
SUBS="$(ls "$WORK"/video.*.srt 2>/dev/null | head -1 || true)"

echo "---"
echo "Arbeitsverzeichnis: $WORK"
echo "Hook-Bögen:  $(ls "$WORK"/hook/hook-*.jpg 2>/dev/null | wc -l)  ($WORK/hook/)"
echo "Body-Frames: $(ls "$WORK"/body/body-*.jpg 2>/dev/null | wc -l)  ($WORK/body/)"
if [ -n "$SUBS" ]; then
  echo "Transkript:  $SUBS"
else
  echo "Transkript:  keins (Frames-only; On-Screen-Text aus den Frames lesen)"
fi
