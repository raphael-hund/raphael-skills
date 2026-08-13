# Retro-Muster — Reibungspunkt-Analyse aus Transkripten

> Herkunft: destilliert aus github.com/giannimassi/agent-retro, Commit
> `b09bc15e05ea6d757eaa11756ba1ccfd351385dd`, Lizenz MIT (Copyright Gianni
> Massi). Paraphrasiert, keine Übernahme von Code/Text. Ergänzt unsere
> Runden-Protokoll-Praxis (Protokoll-Snapshot → Sonnet destilliert →
> Opus-Erfindungs-Check → Doktrin-Check) um eine Methode, WIE aus dem
> Rohmaterial überhaupt Reibungspunkte gefunden werden — das war bei uns
> bisher nicht systematisiert.

## Wofür das gut ist

Unser Runden-Protokoll hält fest, WAS eine Runde tat (Funde, Fixes, Commits).
Es sagt nichts darüber, WARUM eine Runde Reibung hatte — Korrekturen,
Umwege, verworfene Ansätze. Bei größeren Retros (z.B. Sonderrunden,
Skill-Nachschärfung) lohnt dieses Muster als Zusatzschritt vor der
Sonnet-Destillation.

## Reibungspunkte finden (Signalwörter im Transkript)

Suche im Rohmaterial nach diesen Mustern in User-Nachrichten:
- **Korrektur**: "nein", "nicht das", "falsch", "so nicht"
- **Umlenkung**: "mach stattdessen X", "anderer Ansatz"
- **Wiederholung**: "hab ich schon gesagt", "wie erwähnt"
- **Stopp**: "warte", "stopp", "rückgängig"
- **Frust**: auffällig kurze Antworten nach vorher ausführlichem Austausch

## Root-Cause-Kette (nicht beim Symptom stehenbleiben)

```
Korrektur/Umweg → was wurde falsch gemacht → warum
  → falsche Annahme? fehlender Kontext? schlechte Skill-Anleitung? falsches Werkzeug?
```

Jeder Fund braucht diese Kette, nicht nur "X lief schlecht".

## Konkrete Fehlermuster, die sich lohnen zu prüfen

- **Verschwendete Agent-Dispatches**: Kosten/Aufwand vs. genutztes Ergebnis —
  wurde ein Subagent-Output verworfen oder nur teilweise verwendet?
  Bei rundenübergreifenden „X wurde doppelt gemacht"-Behauptungen ZUERST die
  Startzeiten der beiden Dispatches vergleichen (meta.json / journal-Reihenfolge):
  Ein Dispatch ist nur dann redundant, wenn er NACH dem bereits fertigen
  Ergebnis lief. Ein Such-/Recherche-Dispatch, der einen Kandidaten VOR dessen
  Vendorisierung vorschlägt, ist die Entdeckung, kein Duplikat — Kausalität
  nicht rückwärts lesen.
- **Übergroße Tool-Ergebnisse**: z.B. ein großer Read, dessen Inhalt nie
  wieder referenziert wurde — Zeichen für fehlendes Offset/Limit oder dass
  ein gezielterer Zugriff gereicht hätte.
- **Wiederholte Versuche**: dasselbe Werkzeug 3+ mal hintereinander mit
  wechselnden Eingaben — meist Zeichen für zu wenig Kontext vor dem ersten
  Versuch.
- **Abgebrochene Ansätze**: mehrere Schritte in eine Richtung, dann kompletter
  Schwenk — zu früh committet, bevor das Problem verstanden war?
- **Überengineering**: mehr Schritte/Dispatches als die Aufgabe brauchte —
  hat eine Skill-Anleitung zu einem schwereren Prozess gedrängt als nötig?
- **Unnötige Rückfragen**: Information war eigentlich in Datei/Memory
  verfügbar — Skill hat nicht gesagt, wo nachzuschauen ist.

## Skill-Fund-Kategorien (wenn die Reibung von einer Skill-Anleitung kam)

- **Triggering**: Skill hätte feuern sollen und tat es nicht (oder umgekehrt)
- **Fehlende Anleitung**: Skill deckt einen aufgetretenen Randfall nicht ab
- **Falsche Anleitung**: Skill sagte X, Y wäre besser gewesen
- **Zu starr**: Skill erzwang einen Prozess, der nicht passte
- **Zu offen**: Skill überließ eine Entscheidung dem Modell, bei der es
  konsistent falsch entscheidet
- **Fehlendes Werkzeug/Skript**: Skill beschreibt einen manuellen Prozess,
  der eigentlich automatisiert gehört

Für jeden Fund: der konkrete SKILL.md-Textänderungsvorschlag (Vorher/Nachher),
nicht "Skill X verbessern".

## Einordnung als Wahl, kein Automatismus

Dieses Muster ist ein *zusätzlicher Analyseschritt vor* der bestehenden
Kette (Snapshot → Sonnet-Destillation → Opus-Erfindungs-Check →
Doktrin-Check), kein Ersatz. Einsetzen, wenn eine Runde/Session spürbare
Reibung hatte und die Ursache unklar ist — nicht bei jeder Routine-Runde
(Overhead unnötig bei glatten Runden ohne Korrekturen).
