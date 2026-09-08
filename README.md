# raphael-skills

Kleiner Quellbestand für die tatsächlich verwendeten Skills. Bereinigt am 06.09.2026.

## Aktiver Kern

Auf dem VPS sind siebzehn Skills aktiv. Sechzehn davon liegen in diesem Repo:
**3d-brain, ads, audit, brain, copywriting, design, grill-me, higgsfield, level-up,
link, onboard, seo, task-observer, treg, watch und web**.

Ein weiterer Skill beschreibt interne VPS-Infrastruktur und liegt deshalb bewusst
ausserhalb dieses oeffentlichen Repos, unter `/root/skills-lokal/`. Er ist per
Symlink in allen drei Einstiegsorten genauso aktiv wie die uebrigen.

Seit dem 07.09.2026 gibt es genau eine Quelle je Skill. Alle drei Einstiegsorte
enthalten denselben Satz Symlinks, die direkt auf die kanonische Quelle unter
`skills/` zeigen:

- `/root/.claude/skills` (Claude Code)
- `/root/.codex/skills` (Codex)
- `/root/.agents/skills` (harness-neutral)

Es gibt keine Adapter-Stubs mehr. Wer einen Skill ändert, ändert die Quelle unter
`skills/` — alle Harnesses sehen die Änderung sofort, ohne Versionsparität zu pflegen.

Planung, Ausführung, Code-Review und Subagents verwenden die nativen Funktionen
der jeweiligen App. Die zusätzlichen Compound-Engineering-Pflichtworkflows,
Orchestrierungsadapter und breiten Skill-Installer sind archiviert.

## Was hier noch liegt

- `skills/`: kanonische Quellen und konkret benötigte Supportmodule. Ads nutzt
  beispielsweise die bestehenden Video-, Static-, Copy- und Recherche-Referenzen.
  Supportmodule sind keine zusätzlichen global aktivierten Skills.
- `tools/`: vorhandene Index-Erstellung und Prüfung.
- `index.json`: die 28 verbleibenden kanonischen Definitionen, einschließlich
  Supportmodulen. Diese Zahl ist nicht die Anzahl aktiver Skills.

Die früheren `codex/skills/` und `kimi/skills/` Adapter sind am 07.09.2026 entfallen
und liegen unter `/root/archiv/skills-adapter-2026-09-07/`. Sie waren Stubs, die nur
auf die kanonische Quelle verwiesen; die Harnesses zeigen jetzt direkt dorthin.

`skills/eigene/web` ist seit dem 07.09.2026 MAKE Web Astra (Version 2.0.0):
HTML-first-Websites, 56 Inspirationsquellen, 50 UI-Bibliotheken, native Motion,
Bildsuche, GPT Image und SEO. Claude (`/web`), Codex (`$web`) und `.agents`
zeigen per Symlink auf diese Quelle. Der vorherige Web-Skill 1.6.0 liegt unter
`skills/eigene/_archiv/web-1.6.0-bis-2026-09-06/`; higgsfield, visual-aaa,
ads-video und design verweisen für ihre Bild- und Prüfhelfer dorthin.
Einzelne Skripte unter `web/scripts` und `visual-aaa/scripts` bleiben für eine
bereits laufende Website-Prüfung erreichbar; sie aktivieren keinen Skill.

## Pflege

Quellen am vorhandenen Ort ändern. Keine vollständigen Importpakete oder
Adapterflotten automatisch installieren. Herkunft und Lizenzhinweise der
behaltenen Dateien erhalten.

Nach Quelländerungen: `python3 tools/build-index.py` und anschließend
`python3 tools/build-index.py --check`. Der Index installiert nichts.

## Archiv und Host-Grenze

Entfernte Dateien samt unversionierter Änderungen liegen unter
`/root/archiv/setup-bereinigung-runde2-2026-09-06`. Die vier eingebetteten
Git-Arbeitskopien wurden mit `git worktree move` dorthin verschoben.
Das Original-Manifest und die Prüfungen stehen unter
`/root/eingang/ausgang/setup-bereinigung-runde2-2026-09-06`.
Die beabsichtigten getrackten Löschungen sind im Git-Index vorgemerkt, damit
parallele Reparatur-Tasks sie nicht per `git checkout` zurückholen. Es wurde
kein Commit erstellt. Das vorherige Git-Index-Abbild ist im Archiv gesichert.

Auf dem Mac existierte ein abweichender älterer Quellbestand. Er wurde separat
bereinigt; die aktuelle Kopplung beider Syncthing-Ordner ist nicht bestätigt.
Die Mac-Sicherungen liegen unter
`~/.local/share/setup-bereinigung-runde2-2026-09-06`.
