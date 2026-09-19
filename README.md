> Seit 16.09.2026 ist `/Volumes/STORAGE/05 SYSTEM/SKILLS/shared` auf dem Mac die Hauptquelle.
> `/root/skills` auf dem VPS ist die empfangende Betriebskopie. Die folgenden
> Pfade und Befehle beschreiben die VPS-Anbindung; Mac-Anbindung: `../README.md`.

# Gemeinsame Skills

Stand: 16.09.2026. `/root/skills` ist die zentrale Quelle fuer die VPS-Skills.
Der alte Pfad `/root/raphael-skills` ist nur eine Kompatibilitaets-Verknuepfung.

## Inhalt

- `catalog/`: alle 63 freigeschalteten Skills als Verknuepfungen, keine Kopien.
- `skills/eigene/`: eigene Fachskills, einschliesslich `web` und `web-design`.
- `skills/design/`: vorhandener Design-Skill.
- `skills/imported/treg/`: vorhandener treg-Skill.
- `plugins/superpowers/`: offizieller Checkout von obra/superpowers, Version 6.3.0.
- `plugins/compound-engineering/`: offizieller Checkout von EveryInc/compound-engineering-plugin, Version 3.26.3.
- `manifest.json`: Quellen, Plugin-Versionen, Git-Commits und ZIP-Pruefsumme.
- `tools/sync-links.py`: prueft/repariert die Verknuepfungen.

Die bisherige Unterteilung der Fachquellen bleibt erhalten, damit relative
Verweise und Git-Historie nicht durch eine weitere Umstrukturierung brechen.

## Anbindung

| Umgebung | Eigene Skills | Fremdplugins |
|---|---|---|
| Codex | `~/.codex/skills/` und `~/.agents/skills/`, direkte Links | nativ registriert |
| Claude Code | `~/.claude/skills/`, direkte Links | nativ registriert |
| Kimi | `~/.kimi/skills` → `catalog/` | Skill-Dateien im Katalog |
| Cursor | `~/.cursor/skills` → `catalog/` | Skill-Dateien im Katalog |

Kimi CLI ist auf diesem VPS derzeit nicht installiert. Sein Skill-Suchpfad ist
vorbereitet; eine echte Kimi-Session wurde nicht getestet. Die portablen Links
stellen Skills bereit, keine host-spezifischen Plugin-Hooks oder Tools.

Codex und Claude erhalten Plugin-Skills ueber ihre native Installation.
Darum stehen diese nicht zusaetzlich in ihren allgemeinen Skill-Suchordnern.
Die Plugin-Manager verwalten installierte Cache-Snapshots; diese sind generiert
und kein Ort fuer manuelle Aenderungen. Die zentrale Marketplace-Quelle ist
jeweils der Checkout in `plugins/`.

Codex-Systemskills in `~/.codex/skills/.system` und vom Desktop verwaltete
App-Plugins bleiben vom Anbieter verwaltet. Sie werden nicht in dieses
Fachskill-Repository kopiert.

## Pflege

Neue eigene Skills unter `skills/eigene/<name>/SKILL.md` ablegen, dann:

```bash
python3 /root/skills/tools/sync-links.py --apply
python3 /root/skills/tools/sync-links.py
```

Plugins gezielt in ihren Checkouts aktualisieren und danach mit den nativen
Plugin-Managern neu installieren/aktualisieren. Git-Commits und Versionen in
`manifest.json` nach gepruefter Aktualisierung nachziehen. Keine automatischen
Git-Updates eingerichtet. Nach Plugin-Aenderungen neue Sessions starten.

Beispiele in Codex: `$superpowers:brainstorming` und
`$compound-engineering:ce-plan`.

`web-design` stammt aus Raphaels `web-design 3.zip`; alle 14 Markdown-Dateien
wurden unveraendert uebernommen. macOS-Metadaten wurden ausgelassen. Der bisherige
`web`-Skill bleibt erhalten. Seine identische Claude-Kopie wurde archiviert.
Der bisherige Web-Skill enthaelt vier eingebettete Vendor-Skills, die Codex
rekursiv findet; sie sind keine weiteren Eintraege im 63er-Katalog.

Syncthing verwendet `/root/skills` bei unveraenderter Folder-ID `skills`.
Der Zustand anderer Geraete wurde nicht geprueft.

Sicherung: `/root/archiv/vps-aufraeumen-2026-09-16/`.
Die vorgefundenen lokalen SEO-Aenderungen wurden beibehalten.
