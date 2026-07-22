---
name: kimi-sol
version: 1.0.0
description: >
  Fuehrt nach ausdruecklichem Aufruf einen Kimi-K3-Entwurf aus und laesst
  genau diesen Entwurf unabhaengig von Codex Sol pruefen. Trigger nur:
  "/kimi-sol", "Kimi→Sol", "Kimi -> Sol", "Kimi mit Sol prüfen" oder
  "Kimi mit Sol pruefen". Generische Review-Wuensche aktivieren den Skill nicht.
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# kimi-sol — Kimi-Entwurf, Sol-Pruefung in Claude Code

Dieser Skill laeuft nur nach einem der exakten Trigger im Frontmatter. Ein
allgemeines „review das“ oder „hol eine Zweitmeinung“ reicht nicht.

## Ablauf

1. Forme aus der Nutzeraufgabe ein begrenztes Kimi-Arbeitspaket mit Ziel,
   Kontext, Constraints und erwartetem Ergebnis. Kimi darf keine externen
   Seiteneffekte ausfuehren, die nicht bereits von der Nutzeraufgabe gedeckt
   sind.
2. Starte Kimi einmalig und nicht-interaktiv:

   ```bash
   /root/.kimi-code/bin/kimi --auto --output-format text -p "<vollstaendiges Arbeitspaket>"
   ```

   Bewahre den ausgegebenen Entwurf im laufenden Claude-Kontext auf. Leere,
   abgebrochene oder offensichtlich malformed Ausgabe ist `NOT_READY`; dann
   nicht so tun, als haette Sol etwas geprueft.
3. Baue ein read-only Review-Paket. Es enthaelt die Originalaufgabe, Kimis
   vollstaendigen Entwurf, pruefbare Akzeptanzkriterien und verlangt als erste
   nichtleere Finalzeile exakt `REVIEW_PASS` oder `REVIEW_FAIL`, gefolgt von
   Belegen, Findings und ausgefuehrten Tests.
4. Rufe den vorhandenen Sol-Runner genau einmal auf:

   ```bash
   /root/.kimi-code/skills/sol-subagent/scripts/run-sol.sh read "<absoluter Repo-Pfad>" <<'SOL_PACKET'
   <vollstaendiges Review-Paket>
   SOL_PACKET
   ```

5. Akzeptiere ein Review nur, wenn die Runner-Ausgabe alle Marker enthaelt:
   `SOL_SUBAGENT_STATUS=ok`, `SOL_SUBAGENT_SEAT=1` oder `2`, exakt
   `SOL_SUBAGENT_OUTPUT=streamed` und einen nicht-leeren
   `SOL_SUBAGENT_FINAL_B64`-Wert. Dekodiere den Base64-Wert vollstaendig und
   akzeptiere nur `REVIEW_PASS` oder `REVIEW_FAIL` als erste nichtleere Zeile.
   Der Runner loescht seine temporaeren Artefakte beim Exit. Ein blosses
   „route accepted“, das gestreamte Transkript oder ein selbst erfundenes
   Verdikt gilt nicht.
6. Bei `REVIEW_FAIL`: die im gestreamten Review belegten Fehler knapp nennen;
   keine automatische Schreib-/Fix-Runde starten. Bei `REVIEW_PASS`: Ergebnis
   als `VERIFIED` ausgeben. Bei fehlendem Runner, Kimi-Fehler, malformed Marker
   oder Tool-/Provider-Ausfall ehrlich `REVIEWER_UNAVAILABLE` beziehungsweise
   `MALFORMED_ARTIFACT` melden.

## Ausgabe

Nenne immer Status, Kimi-Ergebnis in knapper Form und Sol-Verdikt. Behaupte
niemals eine unabhaengige Sol-Pruefung ohne die Marker aus Schritt 5.
