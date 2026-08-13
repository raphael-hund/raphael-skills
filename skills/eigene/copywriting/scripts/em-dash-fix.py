#!/usr/bin/env python3
"""Ersetzt Em-Dashes als Denkpause durch korrekte Zeichensetzung.

Aufruf:  em-dash-fix.py <datei.md> [...]        schreibt
         em-dash-fix.py --dry <datei.md> [...]  zeigt nur

Warum ein Skript: Ein Subagent hat diese Aufgabe von Hand versucht und jeden
Em-Dash durch " . " ersetzt — freistehende Punkte mitten im Satz, über neun
Dateien. Die Ersetzung folgt festen grammatischen Regeln und gehoert deshalb
in Code, nicht in ein Sprachmodell.

Regeln, nach Prioritaet:
  1. Folgt ein Hauptsatz (Subjekt + finites Verb), wird der Dash zum Punkt und
     das erste Wort gross geschrieben.
  2. Folgt eine Konjunktion (und/aber/oder/sonst/denn), wird er zum Komma.
  3. Folgt eine Apposition oder Ergaenzung, wird er zum Doppelpunkt.
  4. Sonst Komma.

Nie angefasst:
  - Ueberschriften (# ...)
  - Listenzeilen, die mit einem Zitat beginnen (Beleg-Zeilen)
  - Quellenangaben nach einem schliessenden Anfuehrungszeichen
  - Code-Bloecke und Tabellen
"""
import argparse
import re
import sys
from pathlib import Path

# Dateien, die sich im Titel als Zitat-Sammlung ausweisen, bleiben unangetastet.
# Gleiche Erkennung wie in forbidden-check.py.
KORPUS_MARKER = re.compile(
    r"^#\s.*\b(Korpus|Referenz-Korpus|Swipe-File|Transkript)\b", re.I | re.M
)

KONJUNKTION = re.compile(
    r"^(und|aber|oder|sonst|denn|doch|also|bzw\.|beziehungsweise)\b", re.I
)

# Finites Verb am Satzanfang deutet auf einen eigenstaendigen Hauptsatz.
HAUPTSATZ = re.compile(
    r"^(der|die|das|dort|hier|dann|jeder|jede|jedes|ein|eine|einen|wer|was|"
    r"es|sie|er|wir|du|ich|man|diese[rs]?|beide|alle|kein|nur|so|damit|dabei|"
    r"deshalb|dadurch|siehe|nimm|nutze|schreib|streiche|pruefe|prüfe)\b",
    re.I,
)


def _ueberspringen(zeile: str) -> bool:
    s = zeile.strip()
    if not s or s.startswith(("#", "|", "```", ">")):
        return True
    # Beleg-Zeile: Liste, die ein Zitat oder eine Quellenangabe traegt.
    if s.startswith(("-", "*")) and ('„' in s or '"' in s):
        return True
    # Der Em-Dash kann IM Zitat stehen und dort ein Negativ-Beispiel tragen
    # ("Aus „X — Y" wird „X. Y""). Nur dann die Zeile ganz auslassen: wenn der
    # Dash zwischen einem oeffnenden und einem schliessenden Zitatzeichen liegt.
    k = s.find("—")
    # Backtick-Inhalt ist Code, Pfad oder Formatvorlage. Dort ist der Em-Dash
    # Teil der Vorlage ("`[These] — [Aufloesung]`") und darf nicht ersetzt
    # werden; sonst passt der Marker nicht mehr zum erzeugenden Skript.
    # Liegt der Dash INNERHALB eines Backtick-Paars, ist er Teil einer Vorlage.
    # Zaehlt man die Backticks vor dem Dash und die Zahl ist ungerade, steht
    # der Dash im Code-Bereich. Das deckt auch mehrzeilige Vorlagen ab,
    # bei denen der schliessende Backtick erst in der naechsten Zeile folgt.
    if k >= 0 and s[:k].count("`") % 2 == 1:
        return True
    if k >= 0:
        for auf, zu_zeichen in (("„", '"“”'), ('"', '"“”'), ("»", "«")):
            i = s.find(auf)
            if i < 0 or i > k:
                continue
            j = min(
                (p for p in (s.find(z, i + 1) for z in zu_zeichen) if p > i),
                default=-1,
            )
            if j > k:
                return True
    return False


def _ersetze(match: re.Match, hat_doppelpunkt: bool = False) -> str:
    rest = match.group("rest")
    wort = rest.split()[0] if rest.split() else ""

    if KONJUNKTION.match(rest):
        return f", {rest}"
    if HAUPTSATZ.match(rest):
        return f". {wort[:1].upper()}{wort[1:]}{rest[len(wort):]}"
    # Steht schon ein Doppelpunkt im Satz, waere ein zweiter Kauderwelsch
    # ("Material holen: Dossier und Transkript: beides zwingend").
    # Dann traegt ein Komma den Nachtrag.
    if hat_doppelpunkt:
        return f", {rest}"
    return f": {rest}"


# Quellenangabe am Zeilenende: »… — Marc Evers, ad_archive_id 123«.
# Erkennbar an Eigenname plus Kennung/Domain/Klammer, ODER an einer
# nummerierten Beleg-Zeile. Kommt auch OHNE Anfuehrungszeichen vor.
QUELLE = re.compile(
    r"—\s+[A-ZÄÖÜ][\w.\-]*(?:\s+[A-ZÄÖÜ][\w.\-]*)*\s*"
    r"(?:,\s*(?:ad_archive_id|Stand|Quelle)|\.\w{2,4}\b|\()"
)


def fixe_zeile(zeile: str) -> str:
    if _ueberspringen(zeile):
        return zeile
    # Quellenangabe nach Zitat-Ende nicht anfassen: »…" — Marc Evers«
    if re.search(r'["“]\s+—\s+[A-ZÄÖÜ]', zeile):
        return zeile
    if QUELLE.search(zeile):
        return zeile
    # Nummerierte Beleg-Zeile einer Zitatliste: »7. Ich bringe … — Pascal Harting«
    if re.match(r"^\s*\d+\.\s", zeile) and re.search(r"—\s+[A-ZÄÖÜ]", zeile):
        return zeile
    # Em-Dash am Zeilenende: der Satz laeuft in der naechsten Zeile weiter.
    # Ein Doppelpunkt traegt den Uebergang, ohne die Folgezeile zu kennen.
    if re.search(r"\s+—\s*$", zeile):
        return re.sub(r"\s+—\s*$", ":", zeile)

    hat_dp = ":" in zeile.split("—")[0]
    return re.sub(
        r"\s+—\s+(?P<rest>\S.*)$", lambda m: _ersetze(m, hat_dp), zeile
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("dateien", nargs="+")
    ap.add_argument("--dry", action="store_true", help="nur zeigen, nicht schreiben")
    args = ap.parse_args()

    gesamt = 0
    for p in args.dateien:
        pfad = Path(p)
        roh = pfad.read_text(encoding="utf-8")

        # Zitat-Korpora enthalten woertliche Fremd-Anzeigen als Beleg.
        # Ihre Zeichensetzung zu aendern waere Datenfaelschung: die Regeln
        # beruhen darauf, dass dort steht, was der Markt wirklich schreibt.
        if KORPUS_MARKER.search(roh[:400]):
            print(f"{pfad.name}: uebersprungen (Zitat-Korpus)")
            continue

        alt = roh.splitlines()
        neu, geaendert = [], 0
        for zeile in alt:
            fix = fixe_zeile(zeile)
            if fix != zeile:
                geaendert += 1
                if args.dry:
                    print(f"  {pfad.name}")
                    print(f"    - {zeile.strip()[:88]}")
                    print(f"    + {fix.strip()[:88]}")
            neu.append(fix)
        if geaendert and not args.dry:
            pfad.write_text("\n".join(neu) + "\n", encoding="utf-8")
        if geaendert:
            print(f"{pfad.name}: {geaendert} Ersetzungen")
        gesamt += geaendert

    print(f"\n{gesamt} Ersetzungen{' (dry-run)' if args.dry else ''}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
