#!/usr/bin/env bash
set -euo pipefail
export LC_ALL=C

usage() {
  cat <<'USAGE'
Usage: bash media-extract.sh VIDEO_URL_OR_FILE [EMPTY_OUTPUT_DIRECTORY]
       bash media-extract.sh --doctor

Creates first-15-second contact sheets, body frames, metadata and available
JSON3 subtitles. Extraction is not a playback or completed visual review.
Local files need ffmpeg, ffprobe and jq. Downloads additionally need yt-dlp.
Optional ADS_COOKIES_FILE names an explicitly provided Netscape cookie file.
Optional ADS_BODY_STEP sets body sampling seconds (default 3.5).
No automatic cookie discovery, remote ASR, model API or Brain write occurs.
USAGE
}

fail() { printf '%s\n' "ERROR: $*" >&2; exit 2; }

case "${1:-}" in
  -h|--help) usage; exit 0 ;;
  --doctor)
    result=0
    for tool in ffmpeg ffprobe jq; do
      if command -v "$tool" >/dev/null 2>&1; then printf 'OK %s\n' "$tool";
      else printf 'MISSING %s (required)\n' "$tool"; result=1; fi
    done
    if command -v yt-dlp >/dev/null 2>&1; then printf 'OK yt-dlp (URL downloads)\n';
    else printf 'MISSING yt-dlp (optional for local files)\n'; fi
    exit "$result"
    ;;
  -*) fail "Unknown option: $1" ;;
esac
[[ $# -ge 1 && $# -le 2 ]] || { usage >&2; exit 2; }
input=$1
for tool in ffmpeg ffprobe jq; do
  command -v "$tool" >/dev/null 2>&1 || fail "Missing runtime tool: $tool"
done
body_step=${ADS_BODY_STEP:-3.5}
[[ $body_step =~ ^[0-9]+([.][0-9]+)?$ ]] || fail 'ADS_BODY_STEP must be a positive number.'
awk -v value="$body_step" 'BEGIN{exit !(value>0)}' || fail 'ADS_BODY_STEP must exceed zero.'
download=1
if [[ -f $input ]]; then
  download=0
  video="$(cd -- "$(dirname -- "$input")" && pwd -P)/$(basename -- "$input")"
else
  [[ $input == https://* || $input == http://* ]] || fail 'Input is neither an existing file nor an HTTP(S) URL.'
  command -v yt-dlp >/dev/null 2>&1 || fail 'URL downloads require yt-dlp.'
fi
if [[ $# -eq 2 ]]; then
  work=$2
  mkdir -p -- "$work"
  [[ -z $(find "$work" -mindepth 1 -print -quit) ]] || fail 'Output directory must be empty to avoid mixed evidence.'
else
  work=$(mktemp -d "${TMPDIR:-/tmp}/ads-media.XXXXXX")
fi
work=$(cd -- "$work" && pwd -P)
if [[ $download -eq 1 ]]; then
  cookie_args=()
  if [[ -n ${ADS_COOKIES_FILE:-} ]]; then
    [[ -f $ADS_COOKIES_FILE ]] || fail 'ADS_COOKIES_FILE does not name an existing file.'
    cookie_args=(--cookies "$ADS_COOKIES_FILE")
  fi
  yt-dlp --ignore-config --no-playlist --no-progress "${cookie_args[@]}" \
    --write-auto-subs --write-subs --sub-langs 'de.*,en.*' --sub-format json3 \
    -f 'bv*[height<=720]+ba/b[height<=720]/b' --merge-output-format mp4 \
    --print after_move:filepath -o "$work/source.%(ext)s" -- "$input" > "$work/download-path.txt"
  IFS= read -r video < "$work/download-path.txt"
  [[ -f $video ]] || fail 'Downloader returned no usable local video.'
fi
ffprobe -v error -show_format -show_streams -of json "$video" > "$work/media.json"
jq -e 'any(.streams[]; .codec_type == "video")' "$work/media.json" >/dev/null || fail 'Source has no video stream.'
duration=$(jq -r '.format.duration // (.streams[] | select(.codec_type == "video") | .duration)' "$work/media.json" | head -1)
[[ $duration =~ ^[0-9]+([.][0-9]+)?$ ]] || fail 'Could not read video duration.'
mkdir "$work/hook" "$work/body"
ffmpeg -hide_banner -loglevel error -nostdin -t 15 -i "$video" \
  -vf 'fps=15,scale=320:-1,tile=5x5' -frames:v 9 "$work/hook/hook-%02d.jpg"
if awk -v value="$duration" 'BEGIN{exit !(value>15)}'; then
  ffmpeg -hide_banner -loglevel error -nostdin -ss 15 -i "$video" \
    -vf "fps=1/$body_step,scale=480:-1" "$work/body/body-%04d.jpg"
fi
transcript_status=missing
for subtitle in "$work"/*.json3; do
  [[ -f $subtitle ]] || continue
  transcript_status=available
  jq -c '.events[]? | select(.segs != null) |
    {start_seconds: ((.tStartMs // 0)/1000), text: ([.segs[]?.utf8 // ""] | join(""))} |
    select(.text | test("\\S"))' "$subtitle" > "${subtitle%.json3}.transcript.jsonl"
done
hook_count=$(find "$work/hook" -type f -name '*.jpg' | wc -l | tr -d ' ')
body_count=$(find "$work/body" -type f -name '*.jpg' | wc -l | tr -d ' ')
[[ $hook_count -gt 0 ]] || fail 'No hook frames were produced.'
jq -n --arg video "$video" --arg transcript "$transcript_status" \
  --argjson duration "$duration" --argjson hook_count "$hook_count" \
  --argjson body_count "$body_count" --argjson step "$body_step" \
  '{video:$video,duration_seconds:$duration,hook_sheets:$hook_count,body_frames:$body_count,
    hook:{start_seconds:0,max_seconds:15,fps:15,tiles_per_sheet:25},
    body:{start_seconds:15,interval_seconds:$step},transcript:$transcript,
    playback:"not_performed",visual_review:"pending",speech_review:"pending"}' > "$work/evidence.json"
printf 'Evidence: %s/evidence.json\nHook sheets: %s\nBody frames: %s\nTranscript: %s\n' \
  "$work" "$hook_count" "$body_count" "$transcript_status"
printf 'Playback not performed. Open the frames and available transcript before making content claims.\n'
