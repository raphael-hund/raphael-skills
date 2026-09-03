# Ist-Stand bestehende Bookmark-Pipeline, 02.09.2026

- `/root/raphael-brain/scripts/bookmarks_sync/bookmarks_sync.py` und README existieren.
- Die dort dokumentierte Runtime `/root/tools/bookmarks/venv/bin/python` fehlt.
- Der dort dokumentierte Wrapper `/root/raphael-command-center/ops/bin/bookmarks-sync.sh` fehlt.
- `sudo crontab -l -u root` enthält keinen Bookmark-Job; es gibt keinen aktiven Bookmark-Timer.
- `/root/tools/secrets/bookmarks.env` enthält X_AUTH_TOKEN und X_CT0, wurde nur auf Vorhandensein geprüft; Werte wurden nicht gelesen oder kopiert.
- `/root/.secrets/api-keys.env` enthält TWITTER_AUTH_TOKEN und TWITTER_CT0.
- `/root/.local/bin/twitter bookmarks -n 100 --json` lief am 02.09.2026 erfolgreich: 100 Datensätze, 100 eindeutige IDs, Schema `ok/schema_version/data`; kosmetische Warnung `Failed to init ClientTransaction`.
- Test-Rohdatei liegt privat unter `/tmp/web-setup-bookmarks-20260902/bookmarks.json`, Modus 600, SHA-256 `e78ee40d3fe108985b147cd136d4da513a88f4e55a9984e600f6b9a3771cfb51`.

Folge für Ticket 16: Kein zweiter Downloader neben einer funktionierenden Pipeline wird gebaut. Da die dokumentierte alte Pipeline operativ fehlt, darf ein neuer dünner Adapter die funktionierende `twitter`-CLI als Quelle verwenden. Er muss seine Ausgabe in die bestehende Brain-Struktur integrieren oder die Abweichung ausdrücklich dokumentieren. Secrets bleiben außerhalb von Repo und Prompts.
