#!/usr/bin/env python3
"""Prüft einen Primary Text gegen die gemessenen Korpus-Werte.

Aufruf:  pruefen.py <datei.txt>        einzelne Datei
         pruefen.py --text "..."       Text direkt
Exit-Code 1, sobald ein hartes Kriterium reisst.

Grenzwerte stammen aus 56 deutschen Ad-Texten (Korpus 03.08.2026), nicht aus
Geschmack. Belege: references/referenz-korpus.md
"""
import argparse
import re
import sys

MAX_HOOK = 125        # Metas "Mehr anzeigen"-Schnitt
MAX_DASH = 1          # 98 % des Korpus haben null
MIN_ABSAETZE = 5
MAX_ABSATZ = 250      # Median im Korpus: 102
MIN_ZEICHEN = 300
MAX_ZEICHEN = 2100


def absaetze(text):
    return [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]


def pruefe(text, name="Text"):
    fehler, hinweise = [], []
    abs_ = absaetze(text)

    if not abs_:
        return [f"{name}: leer"], []

    hook = abs_[0]
    if len(hook) > MAX_HOOK:
        fehler.append(
            f"Hook {len(hook)} Zeichen (max {MAX_HOOK}) — Meta schneidet ab: "
            f"…{hook[MAX_HOOK - 25:MAX_HOOK]}|ABGESCHNITTEN"
        )

    dashes = len(re.findall(r"\s—\s", text))
    if dashes > MAX_DASH:
        fehler.append(f"{dashes} Gedankenstriche (max {MAX_DASH}) — Punkt setzen statt —")

    if len(abs_) < MIN_ABSAETZE:
        fehler.append(f"nur {len(abs_)} Absätze (min {MIN_ABSAETZE})")

    for i, p in enumerate(abs_, 1):
        if len(p) > MAX_ABSATZ:
            fehler.append(f"Absatz {i} hat {len(p)} Zeichen (max {MAX_ABSATZ}) — teilen")

    if not MIN_ZEICHEN <= len(text) <= MAX_ZEICHEN:
        fehler.append(f"{len(text)} Zeichen (Korpus: {MIN_ZEICHEN}-{MAX_ZEICHEN})")

    if not re.search(r"\d", text):
        fehler.append("keine Zahl im Text (96 % des Korpus nennen eine)")

    cta = abs_[-1]
    if not re.search(
        r"(?i)\b(klick|trag dich|sichere dir|meld|buche|schreib|kommentiere|hol dir)\b",
        cta,
    ):
        hinweise.append("letzter Absatz ohne Imperativ-CTA (45 % des Korpus haben einen)")
    if len(cta) > 200:
        hinweise.append(f"CTA {len(cta)} Zeichen — im Korpus sind es im Median 57")

    listen = len(re.findall(r"\n[✅✔❌👉→•]", text))
    if listen > 12:
        hinweise.append(f"{listen} Listenpunkte — im Korpus selten mehr als eine Liste")

    saetze = [s for s in re.split(r"(?<=[.!?])\s+", text) if len(s.split()) > 2]
    if saetze:
        kurz = sum(1 for s in saetze if len(s.split()) <= 8) / len(saetze)
        if kurz < 0.15:
            hinweise.append(
                f"nur {kurz:.0%} kurze Sätze (<=8 Wörter); im Korpus sind es 30 %"
            )
    return fehler, hinweise


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("datei", nargs="?")
    ap.add_argument("--text")
    args = ap.parse_args()

    if args.text:
        texte = [("--text", args.text)]
    elif args.datei:
        texte = [(args.datei, open(args.datei, encoding="utf-8").read())]
    else:
        ap.error("Datei oder --text angeben")

    schlimm = 0
    for name, t in texte:
        fehler, hinweise = pruefe(t, name)
        abs_n = len(absaetze(t))
        print(f"\n=== {name} === {len(t)} Zeichen, {abs_n} Absätze")
        for f in fehler:
            print(f"  FEHLER   {f}")
        for h in hinweise:
            print(f"  hinweis  {h}")
        if not fehler and not hinweise:
            print("  in Ordnung")
        schlimm += len(fehler)

    print(f"\n{schlimm} harte Verstösse")
    return 1 if schlimm else 0


if __name__ == "__main__":
    sys.exit(main())
