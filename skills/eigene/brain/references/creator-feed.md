# Creator-Feed ins Brain

Ein öffentliches Profil (Instagram-Reels, vergleichbare Short-Feeds) wird
**nicht** als ein Video behandelt. Reihenfolge bleibt ein Modus pro Durchgang:
`einspeisen` → `verdichten` → `sichten`. Dieses File ist der Weg, nicht ein
siebter Modus.

Belegter Lauf: `@startrunningads` / Zac Regan, 2026-08-30, 41 Reels, 500 Nuggets.
Ergänzung aus `@marc.mev`, 06.09.2026: Reels und Carousel-Videos getrennt erfassen;
ein zusätzliches Einzelvideo blieb trotz abgeschlossenem Profil-Crawl erreichbar.
Beleg: `/root/raphael-brain/raw/bookmark-2026-09-06-marc-evers-medien-nachpruefung.md`.

## Wann

Raphael nennt ein Profil oder „alle Videos/Reels von X ins Brain", plus thematische
Nuggets, plus Anbindung an einen Verbraucherskill (`ads`, `copywriting`, …).

## 1. Liste einfrieren (`einspeisen`, davor)

1. `agent-reach doctor --json` — Instagram: `active_backend` oft leer auf dem VPS.
2. **Keine** yt-dlp-Playlist auf `/reels/` oder `/username/` (Extractor broken,
   landet auf Login).
3. Verfügbaren öffentlichen Profilabruf nutzen, etwa eine bestehende Apify-
   Anbindung. Sowohl Reels als auch den paginierten Posts-Feed bis zum belegten
   Ende erfassen. Bei Carousel-Posts jedes Video in `childPosts` aufnehmen.
   Frühere Bookmarks und einzelne Post-URLs gegen den Bestand abgleichen.
4. Die Medien-ID ist der Primärschlüssel; Shortcode und URL bleiben Referenzen.
   Pro Video auch Parent-Post, Position im Carousel, Publisher, Veröffentlichungs-
   und Abrufzeit sowie Erhebungsquelle sichern. Collabs anhand Profil/Verknüpfung
   prüfen und getrennt kennzeichnen; nicht alle anderen Publisher blind verwerfen.
5. Nach Veröffentlichungszeit sortieren, nicht nach angehefteter Profilposition.
   API-Zähler, tatsächlich gelieferte IDs, Crawl-Ende und ungelöste Differenzen
   getrennt dokumentieren. Individuell erreichbare Posts können im Feed fehlen.
6. Liste nach `/tmp/<slug>/index.json` einfrieren und eine bereinigte Kopie als
   Quellenregister im Brain sichern. Bestehende IDs wiederverwenden; Änderungen
   der Quellenabdeckung als Nachtrag festhalten. Signed URLs und Kommentare
   gehören nicht ins dauerhafte Register.

Öffentliche Zugriffe zuerst. Falls eine vorhandene autorisierte Cookie-Jar
benötigt wird, nur eine private temporäre Kopie verwenden: yt-dlp kann sie
zurückschreiben. Keine fremden Browser-Sitzungen auslesen oder Zugangssperren umgehen.

Download je Shortcode: `https://www.instagram.com/p/<SHORT>/`.
Transkript: erst Auto-Subs, sonst
`/root/raphael-command-center/ops/bin/transkribieren <mp4> small <en|de>`.
Einzelnes Reel-Sezieren bleibt [watch](/root/raphael-skills/skills/eigene/watch/SKILL.md).

## 2. Raw (`einspeisen`)

Je Video eine zitierfähige Auswertung, beispielsweise
`raw/bookmark-<YYYY-MM-DD>-<creator>-<SHORT>.md`. Aktuelle Präfixe aus Brain-AGENTS
nutzen; ältere `resource-`-Dateien unverändert lassen. Bestehende Sammel-Rawfiles
über genaue Abschnittszeilen wiederverwenden. Raw und Kandidaten ausschliesslich
über `scripts/brain-write.py` anlegen; Rohquellen niemals überschreiben.

Bei Carousel-Videos Parent-URL plus Position und eigene Medien-ID nennen.
Eine Caption ist kein Sprachtranskript. Fehlender Ton, unklare ASR, kurze
Musikfragmente und persönlich betrachtete Frames erhalten ihren eigenen Status.
Keinen Fach-Nugget aus Lifestyle-Bildern erfinden; der Kontexteintrag erfüllt
die Abdeckung, ohne eine neue Handlungsempfehlung vorzutäuschen.

Sidecar `*.provenance.md` **mit** der Raw-Datei, nicht danach in einem Rutsch
mit Verdichten. Pflichtfelder für `candidate-provenance.py`:

- `source_id`: genau `SRC-YYYYMMDD-NNNN` (vier Ziffern, kein Slug)
- `source_type`: `bookmark` (Instagram/X) oder `other`
- `sha256` der Raw-Datei, `tenant`, `sensitivity`, `captured_at` ISO-8601
- `status: active`, `original_filename` und konkrete Abrufadresse/Erhebungsmethode

Worker-Ergebnisse auf Disk schreiben (`/tmp/<slug>/shard-N.json`). Ein fehlendes
StructuredOutput ist kein verlorenes Artefakt, wenn die JSON-Datei liegt.

Gate: Sidecar existiert, Hash stimmt, `raw-integrity-check.sh` zeigt die Datei
als NEU (nicht „Hash abweichend").

## 3. Thematische Nuggets (`verdichten`)

Nicht eine Wiki-Seite pro Reel und nicht acht Sammelseiten, die Details begraben.

1. Atomares Nugget = **eine** anwendbare Behauptung, mit `raw/…/<SHORT>.md:<zeile>`.
2. Genau ein Thema pro Nugget. Themenliste vor dem Fan-out einfrieren.
3. Eine Kandidatenseite pro Thema plus Index plus Matrix (Medien-ID und ggf.
   Parent/Position → Themen und Belege, 0-Orphans-Test). Gegen vorhandene Themen
   abgleichen; Ergänzungen für einen Merge als Kandidat vorbereiten.
   Recuts behalten ihre IDs und bekommen einen gemeinsamen Inhaltsbezug;
   Wiederholungen erhöhen nicht die Zahl unabhängiger Belege.
4. `## Quelle` enthält Zeilen, die **nur** `raw/pfad.md:N` sind — kein `- ` davor,
   kein Fließtext in derselben Zeile. Sonst findet `brain-promote.py` keine Quelle
   (`_SOURCE` ist zeilengebunden).

Gate: jede Medien-ID der eingefrorenen Liste hat mindestens einen belegten
Aussage-, Kontext- oder Lückeneintrag. Jeder JSON-Nugget steht auf genau einer
Themenseite; TLDR ≤ 25 Wörter. Herkunft, Audio-/Bildabdeckung und verbleibende
Lücken müssen zum tatsächlichen Abruf passen.

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
# Herkunft und Struktur der tatsächlich geschriebenen Quellen/Kandidaten
python3 /root/raphael-brain/scripts/candidate-provenance.py
bash /root/raphael-brain/scripts/wiki-lint.sh --changed-only
```

Zusätzlich die ID-Mengen von eingefrorenem Inventar, Auswertung und Quellenmatrix
auf Gleichheit prüfen; Dubletten nur über Inhaltsbezug markieren, keine IDs
verlieren. Sidecar-Hashes und Zeitmarken gegen die tatsächlichen Medien prüfen.
Globale Altfehler getrennt von Fehlern des aktuellen Imports berichten.

## Gilt nicht wenn

- Ein einzelnes Video zur Swipe-Analyse: nur `watch`.
- Login-Wand ohne Cookies und ohne einzelne öffentliche URLs: `BLOCKED`, nicht raten.
- Kundenmaterial: Kundenrepo, nicht zentrales Brain.
