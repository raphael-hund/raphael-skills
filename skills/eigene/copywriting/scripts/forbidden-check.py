#!/usr/bin/env python3
"""Prüft einen Text deterministisch gegen /root/.claude/forbidden.md.

Aufruf:  forbidden-check.py <datei.md>          einzelne Datei
         forbidden-check.py --text "..."        Text direkt
         forbidden-check.py --doku <datei.md>   Doku-Modus (siehe unten)
Exit-Code 1, sobald ein hartes Muster greift.

Zweck: Das completion_criterion "forbidden.md = 0 Treffer" war vorher reine
Selbsteinschätzung. Ein Modell findet den eigenen Slop schlecht — es hat ihn
erzeugt, weil es ihn für gut hält. Dieses Skript misst statt zu urteilen.

Grenze der Maschine: Regex findet Form, nicht Bedeutung. A3 (Isokolon-Metapher)
und B4-Kontext bleiben beim menschlichen oder Judge-Blick. Das Skript ersetzt
den Eval-Agenten nicht, es filtert vor ihm.

Doku-Modus (--doku): schaltet Zeilen ab, die in Regelwerk-Dateien legitim sind —
Negativ-Beispiele mit ✗/✓, Blockzitate, Tabellen, Überschriften, Verbotslisten.
Für normale Copy NICHT verwenden.
"""
import argparse
import re
import sys

# --- A. Struktur ------------------------------------------------------------

# A2: "nicht X, sondern Y" plus die getarnte Variante "X, nicht Y".
# "statt"/"nie als" sind bewusst NICHT hier — sie ziehen sachliche Grenzen
# (forbidden.md A2, Abschnitt "Abgrenzung").
# Die getarnte Variante ist "X, nicht Y" mit einem NOMEN oder ADJEKTIV als Y —
# der zweite Teil spiegelt den ersten. Kein Treffer bei ", nicht nur" (Steigerung),
# ", nicht schätzen" (Verb = echte Anweisung) und ", nicht im/als/aus" (Präposition
# leitet eine sachliche Abgrenzung ein).
A2_MUSTER = [
    (
        r"\b(?:nicht|keine?[nrms]?)\s+[^.!?]{1,60}?,?\s+sondern\b",
        "A2 Antithese 'nicht X, sondern Y'",
    ),
    (
        r",\s+(?:nicht|keine?n?s?)\s+(?!nur\b|im\b|als\b|aus\b|bei\b|von\b|zu\b|mehr\b)"
        r"(?:der|die|das|ein|eine|einen)?\s*[A-Za-zÄÖÜäöü]+(?:\s|[.,;:!?]|$)",
        "A2 getarnt 'X, nicht Y'",
    ),
    (r"\bes geht nicht um\b", "A2 'Es geht nicht um X'"),
]

# Ausnahmen: Formen, die nach Komma verneinen, aber KEINE Antithese-Figur sind.
#
# Die Figur A2 spiegelt dieselbe Sache in zwei Begriffen ("Standard, nicht
# Ausnahme"). Eine Anweisung grenzt dagegen eine Alternative ab ("gehört
# hierher, nicht dorthin") — das ist normale Präzisierung und muss durchgehen.
# Ohne diese Trennung meldet das Skript jede zweite Regelzeile in der Skill-Doku
# (gemessen 2026-08-13: 22 Fehlalarme über 9 ads-video-Referenzdateien).
_NEG = r"(?:nicht|keine?[nrms]?)"
A2_AUSNAHMEN = [
    # Verb oder Partizip: ", nicht schätzen", ", nicht poliert"
    re.compile(rf",\s+{_NEG}\s+\w+(?:en|eln|ern|iert)\b", re.I),
    # Orts-/Richtungsangabe: ", nicht hierher", ", nicht in die Drehliste"
    re.compile(rf",\s+{_NEG}\s+(?:hier|dort|da)\w*\b", re.I),
    re.compile(rf",\s+{_NEG}\s+(?:in|an|auf|zu|bei|vor|nach|über)\s", re.I),
    # Komparativ: ", nicht schwächer"
    re.compile(rf",\s+{_NEG}\s+\w+er\b", re.I),
    # Satz läuft nach der Verneinung weiter: ", kein Ziel; bei Zweifel …"
    re.compile(rf",\s+{_NEG}\s+[^.!?]{{1,25}}[;:]", re.I),
    # Zweite Verneinung in einer Aufzählung: "keine Fachbegriffe, keine …"
    re.compile(rf"{_NEG}\s+\w+,\s+{_NEG}\s", re.I),
    # Bullet-Zeile: "✅ Festpreis, keine Erfolgsbeteiligung" ist ein
    # Aufzählungspunkt aus zwei Merkmalen, keine Antithese-Figur.
    re.compile(r"^\s*[✅✔❌👉→•\-*]\s", re.I),
    # Sachangabe mit "kein/keine" plus Nomen, die KEIN Gegenstueck zum ersten
    # Teil ist: "…, kein Build nötig", "…, keine Übernahme von Code",
    # "…, kein Foto". Die Antithese-Figur spiegelt dagegen denselben Begriff
    # ("Standard, nicht Ausnahme"). Marker: Nomen + Ergaenzung statt blossem
    # Gegenbegriff am Satzende.
    re.compile(rf",\s+{_NEG}\s+\w+\s+(?:nötig|noetig|erforderlich|von|fuer|für)\b", re.I),
    # Klammer-Einschub als Sachhinweis: "(… ist X, keine Y — nicht laden.)"
    re.compile(rf"\(.*,\s+{_NEG}\s+\w+", re.I),
    # Aufzaehlung ohne Gegenbegriff: "einfache Wörter, keine Fachbegriffe, keine …"
    # Der Marker ist ein Doppelpunkt VOR der Aufzaehlung oder ein Komma DANACH:
    # die Verneinung ist ein Listenelement, kein Spiegelbegriff.
    re.compile(rf":\s*[^.!?]*,\s+{_NEG}\s+\w+", re.I),
    re.compile(rf",\s+{_NEG}\s+\w+,\s", re.I),
    # Zeilenumbruch mitten in der Aufzaehlung: "…, kein langes\n Vorspiel".
    # Nur wenn ein ADJEKTIV am Zeilenende steht (der Satz laeuft weiter) —
    # ein Nomen am Zeilenende waere der Spiegelbegriff einer Antithese
    # ("Standard, nicht Ausnahme") und muss weiter anschlagen.
    # KEIN re.I hier: die Gross-/Kleinschreibung IST das Unterscheidungsmerkmal.
    re.compile(rf",\s+(?:nicht|keine?[nrms]?)\s+[a-zäöüß]+$"),
    # Verb-Anweisung nach Komma: "…, nicht ungegroundet weiterproduzieren".
    # Zwei Woerter, das zweite ist ein Verb -> Anweisung, keine Antithese.
    re.compile(rf",\s+{_NEG}\s+[a-zäöüß]+\s+\w+(?:en|eln|ern)\b", re.I),
]

# A5: Drei-Wort-Triade als Slogan — drei Substantive mit Komma und "und/oder",
# ohne Verb im Umfeld. Nur bei Großschreibung (deutsche Substantive).
A5_MUSTER = r"\b([A-ZÄÖÜ]\w{3,}),\s+([A-ZÄÖÜ]\w{3,})\s+(und|oder)\s+([A-ZÄÖÜ]\w{3,})\b"

# A9: "Stell dir vor"-Einstieg. Immersions-Trick als Satzmuster, keine Floskel.
A9_MUSTER = [
    (r"\bstell(e)?\s+(dir|sie sich)\s+vor\b", "A9 'Stell dir vor'-Einstieg"),
    (r"\bwas wäre,?\s+wenn\b", "A9 'Was wäre, wenn'"),
]

# B4b: Verstärker vor der Zahl. B4 greift nicht, weil eine Zahl dabeisteht.
B4B_VERSTAERKER = [
    "wirklich", "absolut", "extrem", "super", "mega", "total", "echt krass",
]

# B6b: Bindestrich-Kunstwort. Der Slop-Marker ist ein ABSTRAKTES Schmuckwort
# in einem der beiden Teile ("Excellence", "Wohlfühl"), nicht der Bindestrich
# selbst — "Festpreis-Angebot" ist normales Deutsch und bleibt erlaubt.
B6B_MUSTER = r"\b([A-ZÄÖÜ]\w{3,}s?)-([A-ZÄÖÜ]\w{3,})\b"
B6B_SCHMUCKTEILE = {
    "excellence", "wohlfühl", "sorglos", "rundum", "premium", "power",
    "perfekt", "traum", "wunsch", "erfolgs", "zukunfts", "profi",
}

# --- B. Floskeln ------------------------------------------------------------

B1_RAEUSPERN = [
    "gute frage", "kurz gesagt", "lass uns eintauchen", "in der heutigen welt",
    "es ist wichtig zu verstehen", "hier ist die sache", "im grunde genommen",
]

B2_HEDGING = [
    "könnte möglicherweise", "tendenziell eher", "in gewisser weise",
    "unter umständen vielleicht", "relativ gesehen",
]

B3_META = [
    "ich habe jetzt sorgfältig", "nach umfassender analyse", "hoffe, das hilft",
    "lass mich wissen, ob", "ich hoffe, das hilft", "gerne helfe ich",
    "was denkst du?",
]

B4_ADJEKTIVE = [
    "robust", "nahtlos", "leistungsstark", "ganzheitlich", "maßgeschneidert",
    "innovativ", "zukunftssicher", "revolutionär", "einzigartig",
    "state-of-the-art", "synergien", "perfekt abgestimmt",
]

B5_AI_VOICE = [
    "sag goodbye zu", "das ändert alles", "game-changer", "gamechanger",
    "auf das nächste level", "endlich verstehen", "-theater",
]

# B8: Fake-Dringlichkeit. Knappheit ohne pruefbaren Grund. Eine Zahl daneben
# ("nur noch 3 Plaetze") macht sie nicht belegt — sie ist unpruefbar.
B8_DRINGLICHKEIT = [
    "bevor es zu spät ist", "nur noch wenige", "nur für kurze zeit",
    "sichere dir jetzt", "jetzt zuschlagen", "verpasse nicht",
    "die nachfrage ist enorm", "melde dich heute noch",
    "nur solange der vorrat reicht", "letzte chance",
]

# B9: Buzzword-Kette. Drei oder mehr Marketing-Abstrakta in einem Satz.
# Einzeln sind sie erlaubt (Fachpublikum), die Haeufung ist das Signal.
B9_BUZZWORDS = [
    "datengetrieben", "skalierbar", "growth", "automatisierung", "nachhaltig",
    "dynamisch", "ganzheitlich", "innovativ", "digital", "strategisch",
    "effizient", "agil", "transformation", "synergie", "potenzial",
    "ki-gestützt", "ai-gestützt", "zukunftsorientiert", "kundenzentriert",
]

# --- D. Deutsch -------------------------------------------------------------

D2_FUNKTIONSVERB = [
    "zur anwendung bringen", "in erfahrung bringen", "einsatz finden",
    "zur durchführung", "in abzug bringen", "zur verfügung stellen",
]

# D1: Nominalstil — "die/der/das <Nomen>ung des/der/von" ist das klarste Signal.
# Groß-/Kleinschreibung offen halten: der Treffer soll auch in kleingeschriebenen
# Fragmenten greifen ("die durchführung der optimierung").
D1_MUSTER = (
    r"\b(?:die|der|das)\s+\w+(?:ung|heit|keit|nis|schaft)\s+"
    r"(?:des|der|von|beim|zur)\b"
)

# D4: Anglizismus mit deutschem Alltagswort. Ads-Jargon ist ausgenommen.
D4_ANGLIZISMEN = [
    "challengen", "aligned", "leveragen", "committed sein", "gecancelt",
]

# --- C. Interpunktion (quantifiziert) ---------------------------------------

C_GRENZEN = {
    "em_dash_pro_500w": 1,
    "ausrufezeichen": 1,
    "rhetorische_fragen": 2,
    "doppelpunkt_enthuellung": 1,
}

DOPPELPUNKT_ENTHUELLUNG = r"\b(Die Wahrheit|Das Problem|Die Lösung|Der Grund|Die Antwort)\s*:"


def _doku_zeile_ueberspringen(s: str, roh: str = "", vorzeile=None) -> bool:
    """Zeilen, die in einer Regelwerk-Datei legitim gegen die Regeln verstoßen.

    Ein Regelwerk MUSS die verbotenen Wörter nennen, sonst kann es sie nicht
    verbieten. Ohne diese Filter meldet das Skript die Verbotsliste selbst als
    Verstoß und wird unbrauchbar.
    """
    if not s:
        return True
    if s.startswith(("#", ">", "|", "-", "*")):
        return True
    if re.match(r"^\d+[.)]", s):
        return True
    if "✗" in s or "✓" in s:
        return True

    # Verbotsliste: Wortaufzählung mit · oder mit >=2 Anführungspaaren.
    # Zwei zitierte Wendungen in einer Zeile sind eine Liste, keine Prosa.
    if "·" in s:
        return True
    if s.count('"') >= 4:
        return True

    # Zeile besteht überwiegend aus Zitaten -> Beispielsammlung.
    # Deutsche Anführungszeichen („…") mitzählen, sonst rutschen umbrochene
    # Verbotslisten in der Skill-Doku durch den Filter.
    zitiert = sum(
        len(m) for m in re.findall(r'"([^"]*)"|„([^"]*)"', s) for m in m if m
    )
    if zitiert and zitiert / max(len(s), 1) > 0.4:
        return True

    # Semikolon-getrennte Zitatkette: »„X"; „Y" ohne Zahl; …« ist eine
    # Aufzählung von Verboten, keine Prosa.
    if s.count(";") >= 1 and ("„" in s or '"' in s):
        return True

    # Reine Wortliste: >=4 Kommas und kein Satzende. Eine Verbotsliste nennt
    # die verbotenen Wörter ("intricate, meticulous, bolster, garner, …") und
    # darf dafür nicht selbst gemeldet werden.
    if s.count(",") >= 4 and not re.search(r"[.!?]\s", s):
        return True

    # Regel-Definition mit Platzhaltern: "Nicht X — sondern Y" beschreibt die
    # Figur, statt sie zu benutzen. Erkennbar an einzelnen Großbuchstaben-Variablen.
    if re.search(r"\b[XYZ]\b", s):
        return True

    # Regel-Definition: nennt eine Regel-ID (A1, B4b, C, D2, V12, R5, F1).
    if re.search(r"\b(?:[A-F]\d{1,2}[a-z]?|[VRFST]\d{1,2})\b", s):
        return True

    # Beat-/Struktur-Notation mit Pfeilen ist keine Prosa.
    if "→" in s or "->" in s:
        return True

    # Metasprache über die Regeln selbst.
    if re.search(r"(Regel|Muster|Ausnahme|Verstoß|Fail|Slop-Beleg|Abgrenzung|Test)\b", s):
        return True

    # Eingerückte Fortsetzung einer übersprungenen Zeile erbt deren Status.
    # Ohne das reisst jede umbrochene Verbotsliste in der Skill-Doku
    # ("… maßgeschneidert, ganzheitlich,\n   innovativ. Beleg: …").
    if vorzeile is not None and roh.startswith((" ", "\t")):
        if _doku_zeile_ueberspringen(vorzeile.strip(), vorzeile):
            return True

    return False


# Korpus-Dateien enthalten woertlich zitierte Fremd-Anzeigen als Beleg.
# Sie zu redigieren waere Datenfaelschung: die Regeln beruhen darauf, dass
# dort steht, was der Markt TATSAECHLICH schreibt — Slop eingeschlossen.
KORPUS_MARKER = re.compile(
    r"^#\s.*\b(Korpus|Referenz-Korpus|Swipe-File|Transkript)\b", re.I | re.M
)


def ist_korpus(text: str) -> bool:
    """True, wenn die Datei sich im Titel als Zitat-Sammlung ausweist."""
    return bool(KORPUS_MARKER.search(text[:400]))


def _saetze(text: str):
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text) if s.strip()]


def pruefe(text: str, name: str = "Text", doku: bool = False):
    fehler, hinweise = [], []
    zeilen = text.splitlines()

    def melde(nr, code, zitat, hart=True):
        eintrag = f"Z{nr} [{code}] {zitat[:75]}"
        (fehler if hart else hinweise).append(eintrag)

    # zeilenweise Muster
    #
    # Code-Bloecke (```) enthalten in Skill-Doku woertliche Ad-Beispiele.
    # Der Zeilenfilter allein sieht das nicht — er kennt nur die eine Zeile.
    # Deshalb hier ein Zustand ueber die Schleife.
    in_block = False
    for nr, roh in enumerate(zeilen, 1):
        s = roh.strip()
        if s.startswith("```"):
            in_block = not in_block
            continue
        if doku and in_block:
            continue
        vor = zeilen[nr - 2] if nr >= 2 else None
        if doku and _doku_zeile_ueberspringen(s, roh, vor):
            continue
        if not s:
            continue
        low = s.lower()

        for muster, code in A2_MUSTER:
            if re.search(muster, s, re.I):
                if "getarnt" in code and any(a.search(s) for a in A2_AUSNAHMEN):
                    continue
                melde(nr, code, s)

        for muster, code in A9_MUSTER:
            if re.search(muster, s, re.I):
                melde(nr, code, s)

        if re.search(A5_MUSTER, s):
            melde(nr, "A5 Drei-Wort-Triade", s, hart=False)

        # B4b: Verstärker nur melden, wenn eine Zahl im selben Satz steht —
        # sonst greift bereits B4.
        if re.search(r"\d", s):
            for w in B4B_VERSTAERKER:
                if re.search(rf"\b{re.escape(w)}\b", low):
                    melde(nr, f"B4b Verstärker vor Zahl '{w}'", s)

        for links, rechts in re.findall(B6B_MUSTER, s):
            teile = f"{links}{rechts}".lower()
            if any(sw in teile for sw in B6B_SCHMUCKTEILE):
                melde(nr, f"B6b Kunstwort '{links}-{rechts}'", s, hart=False)

        # B7: Emoji-Bullets, die nur ein Adjektiv tragen.
        bullets = re.findall(r"[✅✔❌👉→•]\s*([^\n✅✔❌👉→•]{1,30})", s)
        if len(bullets) >= 3 and all(len(b.split()) <= 2 for b in bullets):
            melde(nr, "B7 Emoji-Bullets ohne Information", s)

        for w in B1_RAEUSPERN:
            if w in low:
                melde(nr, f"B1 Räuspern '{w}'", s)
        for w in B2_HEDGING:
            if w in low:
                melde(nr, f"B2 Hedging '{w}'", s)
        for w in B3_META:
            if w in low:
                melde(nr, f"B3 Meta-Kommentar '{w}'", s)
        # Deutsche Adjektive flektieren: "robust" -> "robuste", "robusten".
        # Ohne die Endungs-Klasse rutscht jedes attributive Adjektiv durch.
        for w in B4_ADJEKTIVE:
            if re.search(rf"\b{re.escape(w)}(?:e[srmn]?|en|em)?\b", low):
                melde(nr, f"B4 Wert-Adjektiv '{w}'", s)
        for w in B5_AI_VOICE:
            if w in low:
                melde(nr, f"B5 AI-Voice '{w}'", s)
        for w in B8_DRINGLICHKEIT:
            if w in low:
                melde(nr, f"B8 Fake-Dringlichkeit '{w}'", s)

        # B9 greift erst bei Haeufung: drei Buzzwords in einem Satz.
        treffer_b9 = [
            w for w in B9_BUZZWORDS if re.search(rf"\b{re.escape(w)}\w*", low)
        ]
        if len(treffer_b9) >= 3:
            melde(nr, f"B9 Buzzword-Kette ({', '.join(treffer_b9[:4])})", s)
        for w in D2_FUNKTIONSVERB:
            if w in low:
                melde(nr, f"D2 Funktionsverbgefüge '{w}'", s)
        for w in D4_ANGLIZISMEN:
            if re.search(rf"\b{re.escape(w)}\b", low):
                melde(nr, f"D4 Anglizismus '{w}'", s)

        if re.search(D1_MUSTER, s, re.I):
            melde(nr, "D1 Nominalstil", s)

    # Fließtext für Zählungen. Code-Blöcke zählen nicht mit — sonst verzerren
    # zitierte Ad-Beispiele die Em-Dash-Dichte und den Generik-Test.
    if doku:
        gefiltert, im_block = [], False
        for i, l in enumerate(zeilen):
            if l.strip().startswith("```"):
                im_block = not im_block
                continue
            if im_block:
                continue
            if _doku_zeile_ueberspringen(
                l.strip(), l, zeilen[i - 1] if i else None
            ):
                continue
            gefiltert.append(l)
        body = "\n".join(gefiltert)
    else:
        body = text

    woerter = len(body.split())

    # C: Em-Dash-Dichte
    em = len(re.findall(r"\s—\s", body))
    erlaubt = max(1, round(woerter / 500))
    if em > erlaubt:
        fehler.append(f"[C] {em} Em-Dash bei {woerter} Wörtern (max {erlaubt})")

    # C: Ausrufezeichen
    ausruf = body.count("!")
    if ausruf > C_GRENZEN["ausrufezeichen"]:
        hinweise.append(f"[C] {ausruf} Ausrufezeichen (max 1, Ads max 2)")

    # C: rhetorische Fragen
    fragen = body.count("?")
    if fragen > C_GRENZEN["rhetorische_fragen"]:
        hinweise.append(f"[C] {fragen} Fragezeichen (max 2)")

    # C: Doppelpunkt-Enthüllung
    dp = len(re.findall(DOPPELPUNKT_ENTHUELLUNG, body))
    if dp > C_GRENZEN["doppelpunkt_enthuellung"]:
        fehler.append(f"[C] {dp} Doppelpunkt-Enthüllungen (max 1)")

    # E3: Generik-Test, maschinell.
    #
    # Die Muster-Regeln oben finden Slop-FORMEN. Sie finden keine Slop-LEERE:
    # "Als erfahrener Partner an Ihrer Seite begleiten wir Sie auf dem Weg zu
    # mehr Sichtbarkeit" enthaelt kein verbotenes Wort und passierte das Gate.
    # Ein Text ohne jede Zahl und ohne Eigennamen kann fuer jeden Wettbewerber
    # derselben Branche stehen. Das ist messbar.
    # Eine Eigennamen-Heuristik scheitert am Deutschen: dort ist JEDES
    # Substantiv gross. Messbar ist stattdessen die Belegdichte — Zahl,
    # Zeitangabe, Waehrung, Prozent, Ortsname mit Praeposition.
    if not doku and woerter >= 25:
        # Eine Erfahrungs-Zahl ("seit 10 Jahren", "über 20 Jahre Erfahrung")
        # ist KEIN Beleg. Sie sagt nichts darüber, was der Kunde bekommt, und
        # steht bei jedem Wettbewerber. Sie wird vor der Zählung entfernt.
        pruef = re.sub(
            r"\b(?:seit|über|mehr als|rund|circa|ca\.)\s+\d+\s*"
            r"(?:Jahren?|Jahrzehnten?|Monaten?)\b",
            " ",
            body,
            flags=re.I,
        )
        belege = 0
        if re.search(r"\d", pruef):
            belege += 1
        if re.search(r"\b(?:in|nach|binnen|innerhalb)\s+\w*\s*\d", pruef, re.I):
            belege += 1
        if re.search(r"[€$%]|\bEuro\b|\bProzent\b", pruef, re.I):
            belege += 1
        if re.search(r"\b(?:aus|in)\s+[A-ZÄÖÜ][a-zäöüß]{3,}(?:\s|,|\.)", pruef):
            belege += 1

        if belege == 0:
            fehler.append(
                f"[E3] Generik-Verdacht: kein einziger Beleg auf {woerter} Wörter "
                f"(keine Zahl, keine Frist, kein Betrag, kein Ort). "
                f"Erfahrungs-Zahlen wie 'seit 10 Jahren' zählen nicht — sie "
                f"stehen bei jedem Wettbewerber. Eine Zahl einsetzen, die sagt, "
                f"was der Kunde bekommt."
            )

    # A1/A6/A7: Satzrhythmus
    saetze = _saetze(body)
    laengen = [len(s.split()) for s in saetze]

    # A1 Staccato-Paar: zwei kurze Sätze (<=5 W) in Folge mit gleicher Länge.
    # Ausnahme "Informationssprung": trägt der zweite Teil eine Zahl oder Frist,
    # ist es ein erlaubter Hook (forbidden.md A1, Ausnahme 2).
    for i in range(len(laengen) - 1):
        a, b = laengen[i], laengen[i + 1]
        if a <= 5 and b <= 5 and abs(a - b) <= 1:
            sprung = bool(re.search(r"\d", saetze[i + 1]))
            if sprung:
                hinweise.append(
                    f"[A1-ok] Informationssprung ({a}+{b} W, Zahl im 2. Teil): "
                    f"{saetze[i][:30]} / {saetze[i + 1][:30]}"
                )
            else:
                hinweise.append(
                    f"[A1] Staccato-Verdacht ({a}+{b} W): "
                    f"{saetze[i][:35]} / {saetze[i + 1][:35]}"
                )

    # A8 Kontrast-Dreisprung: drei Sätze in Folge mit gleichem Satzanfang.
    for i in range(len(saetze) - 2):
        anf = [" ".join(s.split()[:2]).lower().strip(".,!?") for s in saetze[i:i + 3]]
        if len(set(anf)) == 1 and len(anf[0]) > 3:
            hinweise.append(f"[A8] Kontrast-Dreisprung '{anf[0]} …': {saetze[i][:40]}")

    # A6 Parataxe: drei+ Sätze unter 8 Wörtern in Folge
    lauf = 0
    for i, n in enumerate(laengen):
        lauf = lauf + 1 if n < 8 else 0
        if lauf == 3:
            hinweise.append(f"[A6] Parataxe-Kette ab: {saetze[i - 2][:45]}")

    # A7: drei Sätze in Folge mit fast gleicher Wortzahl.
    # Kanal-Ausnahme: im SEO-/Body-Korridor (15-25 W) sind ähnliche Längen
    # unvermeidlich und gewollt (forbidden.md A7, Kanal-Ausnahme).
    for i in range(len(laengen) - 2):
        f3 = laengen[i:i + 3]
        if min(f3) >= 4 and max(f3) - min(f3) <= 1:
            if min(f3) >= 13:
                continue  # Erklär-Korridor, kein Slop
            hinweise.append(f"[A7] Gleichlange Sätze {f3}: {saetze[i][:45]}")

    return fehler, hinweise


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("datei", nargs="*")
    ap.add_argument("--text")
    ap.add_argument(
        "--doku",
        action="store_true",
        help="Regelwerk-Modus: ✗/✓-Zeilen, Zitate, Tabellen, Listen ignorieren",
    )
    args = ap.parse_args()

    if args.text:
        texte = [("--text", args.text)]
    elif args.datei:
        texte = [(d, open(d, encoding="utf-8").read()) for d in args.datei]
    else:
        ap.error("Datei oder --text angeben")

    schlimm = 0
    for name, t in texte:
        kurz = name.split("/")[-1]

        # Zitat-Korpora werden nur im Doku-Modus uebersprungen. Wer eine
        # Korpus-Datei direkt prueft, will das Ergebnis sehen.
        if args.doku and ist_korpus(t):
            print(f"\n=== {kurz} === uebersprungen (Zitat-Korpus, Fremdtext)")
            continue

        fehler, hinweise = pruefe(t, name, doku=args.doku)
        print(f"\n=== {kurz} === {len(t.split())} Wörter")
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
