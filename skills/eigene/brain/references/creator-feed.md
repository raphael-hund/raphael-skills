# Creator-Feed ins Brain

Ein öffentliches Profil (Instagram-Reels, vergleichbare Short-Feeds) wird
**nicht** als ein Video behandelt. Reihenfolge bleibt ein Modus pro Durchgang:
`einspeisen` → `verdichten` → `sichten`. Dieses File ist der Weg, nicht ein
siebter Modus.

Belegter Lauf: `@startrunningads` / Zac Regan, 2026-08-30, 41 Reels, 500 Nuggets.

## Wann

Raphael nennt ein Profil oder „alle Videos/Reels von X ins Brain", plus thematische
Nuggets, plus Anbindung an einen Verbraucherskill (`ads`, `copywriting`, …).

## 1. Liste einfrieren (`einspeisen`, davor)

1. `agent-reach doctor --json` — Instagram: `active_backend` oft leer auf dem VPS.
2. **Keine** yt-dlp-Playlist auf `/reels/` oder `/username/` (Extractor broken,
   landet auf Login).
3. Shortcodes sammeln: vorhandene Bookmarks, Websuche, einzelne Post-URLs.
   Jede URL mit `yt-dlp --skip-download` gegen denselben `uploader_id` prüfen.
4. Liste nach `/tmp/<slug>/index.json` schreiben. Ab da ist die Menge eingefroren.

Cookies: Netscape-Jar nach `/tmp` **kopieren** (beschreibbar). yt-dlp schreibt die
Jar zurück und kann `sessionid` verlieren. Original unter `~/.agent-reach/` nicht
als Schreibziel nutzen.

Download je Shortcode: `https://www.instagram.com/p/<SHORT>/`.
Transkript: erst Auto-Subs, sonst
`/root/raphael-command-center/ops/bin/transkribieren <mp4> small <en|de>`.
Einzelnes Reel-Sezieren bleibt [watch](/root/raphael-skills/skills/eigene/watch/SKILL.md).

## 2. Raw (`einspeisen`)

Eine Datei je Reel: `raw/resource-<YYYY-MM-DD>-<creator>-<SHORT>.md`
(Präfix `resource-` für Fremdmaterial; `bookmark-` nur wenn es wirklich ein
gespeicherter Post ohne Transkript ist).

Sidecar `*.provenance.md` **mit** der Raw-Datei, nicht danach in einem Rutsch
mit Verdichten. Pflichtfelder für `candidate-provenance.py`:

- `source_id`: genau `SRC-YYYYMMDD-NNNN` (vier Ziffern, kein Slug)
- `source_type`: `bookmark` (Instagram/X) oder `other`
- `sha256` der Raw-Datei, `tenant`, `sensitivity`, `captured_at` ISO-8601
- `status: active`

Worker-Ergebnisse auf Disk schreiben (`/tmp/<slug>/shard-N.json`). Ein fehlendes
StructuredOutput ist kein verlorenes Artefakt, wenn die JSON-Datei liegt.

Gate: Sidecar existiert, Hash stimmt, `raw-integrity-check.sh` zeigt die Datei
als NEU (nicht „Hash abweichend").

## 3. Thematische Nuggets (`verdichten`)

Nicht eine Wiki-Seite pro Reel und nicht acht Sammelseiten, die Details begraben.

1. Atomares Nugget = **eine** anwendbare Behauptung, mit `raw/…/<SHORT>.md:<zeile>`.
2. Genau ein Thema pro Nugget. Themenliste vor dem Fan-out einfrieren.
3. Eine Kandidatenseite pro Thema plus Index plus Matrix (Shortcode → Themen,
   0-Orphans-Test).
4. `## Quelle` enthält Zeilen, die **nur** `raw/pfad.md:N` sind — kein `- ` davor,
   kein Fließtext in derselben Zeile. Sonst findet `brain-promote.py` keine Quelle
   (`_SOURCE` ist zeilengebunden).

Gate: jede Shortcode der eingefrorenen Liste ≥ 1 Nugget; jedes JSON-Nugget steht
auf genau einer Themenseite; TLDR ≤ 25 Wörter.

## 4. Verbraucherskill

Der Feed selbst bleibt im Brain. Ein Skill wie `ads` bekommt höchstens:

- eine Playbook-Datei unter `references/` mit Katalog + Themenlinks
- eine Zeile in `wissens-router.md` / `load-wissen.py`

Keine Kundendaten, keine zweiten Transkriptkopien im Skill.

## 5. Freigabe und Git (`sichten`)

Raphaels „freigeben" ist die inhaltliche Autorisierung. Technisch:

1. One-shot JSON in privatem Ordner (`/root/.brain-auth`, `0700`), Datei `0600`
   root-owned: `schema`, `candidate`, `candidate_sha256`, `target`, `expires_at`,
   `nonce`.
2. `brain-promote.py` (nicht `--yes` von `approve-candidate.sh`).
3. **Zwei Git-Commits**, sonst `brain-precommit` rot:
   - Commit A: `raw/` + `wiki/_candidates/` (Kandidat muss in Git liegen).
   - Commit B: Löschen der Kandidaten + Add der kanonischen Seiten
     (`git` sieht `R099`). Receipts müssen zum kanonischen Blob passen.
4. `wiki/hot.md` **nicht** stagen (`canonical-m-denied`).
5. Pre-commit liest `.git/brain-write-receipts` als root-owned `0700` —
   `git commit` deshalb als dieselbe uid wie die Receipts (hier: root).

Zielordner für Ads-Handwerk: `wiki/craft/ads/lehren/`.

## Check (pass/fail)

```bash
# Liste eingefroren?
test -s /tmp/<slug>/index.json
# Jede Raw hat Sidecar
ls /root/raphael-brain/raw/resource-*-<creator>-*.md | rg -v provenance | wc -l
# Quelle-Zeilen zeilenrein
python3 - <<'PY'
import re, pathlib, sys
pat=re.compile(r'(?m)^\s*`?(raw/[A-Za-z0-9._/-]+):(\d+)`?\s*$')
root=pathlib.Path('/root/raphael-brain/wiki/_candidates')
bad=0
for p in root.glob('*.md'):
    if pat.search(p.read_text()) is None and 'zac-nuggets' in p.name:
        print('keine standalone Quelle', p.name); bad=1
sys.exit(bad)
PY
```

## Gilt nicht wenn

- Ein einzelnes Video zur Swipe-Analyse: nur `watch`.
- Login-Wand ohne Cookies und ohne einzelne öffentliche URLs: `BLOCKED`, nicht raten.
- Kundenmaterial: Kundenrepo, nicht zentrales Brain.
