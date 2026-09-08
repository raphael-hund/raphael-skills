#!/usr/bin/env bash
# watch-extract.sh — lädt ein Video (YouTube/IG/TikTok/…) nach /tmp und sampelt es
# für die Analyse durch watch: Hook-Kontaktbögen + Body-Einzelbilder + Transkript.
# EIGENER Code (kein Fremdcode vendored). Siehe SKILL.md.
#
# Zwei-Stufen-Sampling (Spec: ops/quellenreview-2026-07-19.md Teil D, "Das Gist"):
#   Hook = erste 15 s mit 15 fps, gekachelt als Kontaktbögen (5x5-Tiles)
#   Body = ab Sekunde 15, 1 Frame pro 3,5 s
# Transkript: YouTube -> --write-auto-subs, Format json3 (NIE srt/vtt --
#             Auto-Untertitel wiederholen beim Konvertieren jede Zeile doppelt),
#             danach zu .txt flachgeklopft. IG/TikTok -> Frames-only
#             (On-Screen-Text trägt die Botschaft).
set -euo pipefail

usage_text() {
  cat <<'EOF'
usage: watch-extract.sh <video-url|lokaler-pfad> [arbeits-verzeichnis]

beispiel:
  watch-extract.sh "https://www.youtube.com/watch?v=..."
  watch-extract.sh "https://www.tiktok.com/@user/video/..." /tmp/r-watch-meinreel
  watch-extract.sh /pfad/zur/zoom-aufnahme.mp4 /tmp/r-watch-call

Ist das erste Argument eine existierende Datei, wird der Download uebersprungen
(Riverside/Zoom/Loom-Exporte, eigene Aufnahmen). Ohne Arbeits-Verzeichnis wird
/tmp/watch.XXXXXX angelegt.
EOF
}

usage() {
  usage_text >&2
  exit 2
}

# --help ist kein Fehlerfall: Hilfe auf stdout, Exit 0. Ohne diesen Zweig
# reichte "--help" bis zu yt-dlp durch, und der Aufrufer bekam DESSEN Hilfe
# (Exit 1) statt der von watch-extract. Gemessen 03.08.2026.
case "${1:-}" in
  --help|-h)
    usage_text
    exit 0
    ;;
esac

# Ein unbekanntes Flag ist kein Video. Ohne diesen Zweig landete "--tippfehler"
# als URL bei yt-dlp, das dann 20 Sekunden lang erfolglos aufloeste — gemessen
# 03.08.2026 (Exit 124 nach Timeout). Wer sich vertippt, soll das sofort
# erfahren, nicht nach einer halben Minute mit einer fremden Fehlermeldung.
case "${1:-}" in
  -*)
    echo "Unbekanntes Flag: $1" >&2
    echo "Erlaubt: --help. Sonst wird eine Video-URL erwartet." >&2
    exit 2
    ;;
esac

[ "$#" -ge 1 ] || usage
URL="$1"
WORK="${2:-$(mktemp -d "${TMPDIR:-/tmp}/watch.XXXXXX")}"
mkdir -p "$WORK"

# Lokale Datei? Dann wird kein yt-dlp gebraucht.
LOCAL=0
[ -f "$URL" ] && LOCAL=1

REQUIRED_TOOLS="ffmpeg"
[ "$LOCAL" -eq 1 ] || REQUIRED_TOOLS="yt-dlp ffmpeg"
for tool in $REQUIRED_TOOLS; do
  command -v "$tool" >/dev/null 2>&1 || { echo "Fehler: '$tool' nicht im PATH." >&2; exit 127; }
done

VIDEO="$WORK/video.mp4"

if [ "$LOCAL" -eq 1 ]; then
  # --- Lokale Datei: Download ueberspringen ----------------------------------
  # Kein Kopieren/Konvertieren — ffmpeg liest direkt von der Quelle.
  # Transkript gibt es hier nicht (kein Whisper, siehe SKILL.md) -> Frames-only.
  VIDEO="$URL"
  echo "Lokale Datei erkannt — Download uebersprungen: $VIDEO"
else

# --- Download (+ Auto-Subs bei YouTube) -------------------------------------
# Subs sind best effort: schlägt der Sub-Download fehl (z. B. HTTP 429 Rate-Limit),
# wird ohne Subs erneut versucht — das Video ist der Pflichtteil, das Transkript
# die Kür (Frames-only ist der dokumentierte Fallback).
case "$URL" in
  *youtube.com*|*youtu.be*)
    # Gotcha: NIE --convert-subs srt/vtt auf Auto-Subs anfordern — die
    # Auto-generierte Spur wiederholt beim Konvertieren nach SRT/VTT jede
    # Zeile doppelt (rollende Untertitel). Immer --sub-format json3 anfordern
    # und selbst zu Rohtext flachklopfen (siehe unten).
    if ! yt-dlp --write-auto-subs --sub-langs "de.*,en.*" --sub-format json3 \
      -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
      -o "$WORK/video.%(ext)s" "$URL"; then
      echo "Hinweis: Download mit Auto-Subs fehlgeschlagen — Retry ohne Subs." >&2
      yt-dlp -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
        -o "$WORK/video.%(ext)s" "$URL"
    fi
    ;;
  *instagram.com*)
    # Cookies zuerst (wenn sie leben), sonst Apify — der stabile Weg.
    COOKIES="/root/.secrets/instagram-cookies-netscape.txt"
    if ! yt-dlp --cookies "$COOKIES" \
      -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
      -o "$WORK/video.%(ext)s" "$URL"; then
      echo "Hinweis: Instagram via yt-dlp/Cookies fehlgeschlagen — Apify." >&2
      /root/raphael-command-center/ops/bin/ig-video-holen "$URL" "$WORK/video.mp4"
    fi
    ;;
  *)
    yt-dlp -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
      -o "$WORK/video.%(ext)s" "$URL"
    ;;
esac

# Echter Dateiname auflösen (Extension kann durch Merge variieren)
[ -f "$VIDEO" ] || VIDEO="$(ls "$WORK"/video.* | grep -v -E '\.(json3|srt|vtt)$' | head -1)"
[ -f "$VIDEO" ] || { echo "Fehler: kein Video heruntergeladen." >&2; exit 1; }

fi

DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO" 2>/dev/null || echo '?')"
echo "Video: $VIDEO (Dauer: ${DUR%.*} s)"

# --- Hook: erste 15 s, 15 fps, gekachelt (5x5) -------------------------------
mkdir -p "$WORK/hook" "$WORK/body"
ffmpeg -hide_banner -loglevel error -t 15 -i "$VIDEO" \
  -vf "fps=15,scale=320:-1,tile=5x5" -frames:v 9 "$WORK/hook/hook-%02d.jpg"

# --- Body: ab Sekunde 15, 1 Frame / 3,5 s ------------------------------------
ffmpeg -hide_banner -loglevel error -ss 15 -i "$VIDEO" \
  -vf "fps=1/3.5,scale=480:-1" "$WORK/body/body-%04d.jpg"

# --- Transkript: json3 -> Rohtext flachklopfen -------------------------------
SUBS_JSON3="$(ls "$WORK"/video.*.json3 2>/dev/null | head -1 || true)"
SUBS_TXT=""
if [ -n "$SUBS_JSON3" ]; then
  SUBS_TXT="${SUBS_JSON3%.json3}.txt"
  python3 - "$SUBS_JSON3" "$SUBS_TXT" <<'PY'
import json, html, re, sys
src, dst = sys.argv[1], sys.argv[2]
data = json.load(open(src, encoding="utf-8"))
parts = ["".join(s.get("utf8", "") for s in (e.get("segs") or [])) for e in data.get("events", [])]
txt = re.sub(r"\s+", " ", html.unescape(" ".join(p.strip() for p in parts if p.strip()))).strip()
open(dst, "w", encoding="utf-8").write(txt)
PY
fi

echo "---"
echo "Arbeitsverzeichnis: $WORK"
echo "Hook-Bögen:  $(ls "$WORK"/hook/hook-*.jpg 2>/dev/null | wc -l)  ($WORK/hook/)"
echo "Body-Frames: $(ls "$WORK"/body/body-*.jpg 2>/dev/null | wc -l)  ($WORK/body/)"
if [ -n "$SUBS_TXT" ] && [ -f "$SUBS_TXT" ]; then
  echo "Transkript:  $SUBS_TXT"
else
  echo "Transkript:  keins (Frames-only; On-Screen-Text aus den Frames lesen)"
fi
