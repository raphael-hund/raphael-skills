---
name: grok-first
version: 0.1.0
description: >
  Delegiert ein Arbeitspaket an die native Grok-Build-CLI. Grok arbeitet
  headless in seiner eigenen Harness; der aufrufende Agent prueft Diff und
  Tests danach selbst. Trigger: "/grok-first", "an Grok geben", "grok -p",
  "schnelle Serien-Edits", "Cross-Vendor-Bau".
class: O
scope: agency
sensitivity: internal
loads:
  - scripts/grok-first.sh
completion_criteria:
  - "Das Secrets-Gate hat das Zielrepo freigegeben; Exit 3 beendet den Lauf"
  - "Grok und jedes gestartete Kind haben passende Raphael-Skills anhand von Name und SKILL.md-Pfad geladen"
  - "Der native Grok-Lauf war erfolgreich und sein Output-Pfad wurde ausgegeben"
  - "Der aufrufende Agent hat den erzeugten Diff mit Datei- und Zeilenbelegen geprueft"
  - "Der aufrufende Agent hat die passenden Tests selbst erfolgreich ausgefuehrt"
---

# grok-first

## Zweck

Ein klar begrenztes Arbeitspaket wird mit `grok -p` in der nativen Grok-CLI
bearbeitet. Die normalen Grok-Subagent-Lanes bleiben davon getrennt und koennen
weiterhin durch den allgemeinen Router genutzt werden.

Der Launcher setzt den maximal von Grok 1.0.3 unterstuetzten Reasoning-Effort
`xhigh`. Die CLI nennt diese oberste Stufe nicht `max`.

## Geeignete Aufgaben

- Viele kleine, klar definierte Edits
- Serien-Umbenennungen und mechanische Migrationen
- Schnelle Fixes nach einer festen Schrittliste

Fuer offene Architekturfragen oder tiefe Reviews ist `codex-first` die bessere
explizite CLI-Route.

## Sicherheits-Gate

Der Launcher prueft vor dem Start alle vorhandenen Dateinamen im Zielpfad auf
Secret-Kandidaten, auch ignorierte und ungetrackte Dateien. Exit 3 bedeutet:
Grok wurde nicht gestartet. Die gemeldeten Dateien werden erst bereinigt oder
aus dem Scope entfernt; das Gate bleibt aktiv.

## Ablauf

1. Ziel und erlaubte Dateien im Prompt eng benennen.
2. Passende Raphael-Skills aus dem Harness-Katalog waehlen und lesen. Bei nativen
   Subagents jedem Kind Skill-Namen und absolute `SKILL.md`-Pfade mitgeben.
3. Den nativen Launcher ausfuehren:

   ```bash
   scripts/grok-first.sh /root/website-projects/foo "Benenne nur in src/ die v1-Helper auf v2 um."
   cat aufgabe.txt | scripts/grok-first.sh /root/website-projects/foo
   ```

4. Den ausgegebenen Diff vollstaendig lesen.
5. Passende Tests selbst ausfuehren; Groks Selbstauskunft ist kein Testbeleg.
6. Nur gepruefte, beabsichtigte Aenderungen behalten.

## Grenzen

- Websuche und Web-Fetch bleiben fuer diesen Build-Lauf deaktiviert.
- Grok darf Datei-Edits bestaetigen, aber keine beliebigen Tool-Aufrufe automatisch freigeben.
- Auth-Daten aus `~/.grok` werden nie in Prompt, Log oder Repo kopiert.
- Ein fehlgeschlagenes Secrets-Gate wird nicht umgangen.
