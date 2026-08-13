#!/usr/bin/env python3
"""Pre-Flight-Validator fuer ultra-loop-Workflow-Scripts (.js).

HERKUNFT: uebernommen aus
  /root/tools/vendor/alirezarezvani-skills/engineering/workflow-builder/skills/workflow-builder/scripts/validate_workflow.py
  (Repo alirezarezvani-skills, Commit aa8d778811a557a2c28ccadda4cf3d0bd028a4cc,
  2026-07-17 15:02:50 +0200, Lizenz MIT — Code-Uebernahme laut Lizenz erlaubt).

ANGEPASST an UNSERE Workflow-Realitaet (workflow-vorlage.md /
runden-protokoll.md), gegenueber dem Original:
  - check_node_apis, check_parallel_thunks, check_filter_boolean,
    check_agent_present, check_loops_guarded, check_size ENTFERNT — unsere
    Vorlage nutzt parallel()/pipeline() anders (Thunks sind bei uns Standard,
    nicht die Ausnahme) und die 524288-Byte-Kappe/Node-API-Verbote gehoerten
    zu einer anderen Laufzeitumgebung; hier sind sie irrefuehrend.
  - check_meta: Pure-Literal-Regel (kein Template-String, kein Spread, kein
    Funktionsaufruf) 1:1 uebernommen — das ist bei uns weiterhin ein
    Parser-Killer.
  - check_nondeterminism: Date.now()/Math.random()/new Date() 1:1
    uebernommen (Resume-Bruch ist bei uns identisch real).
  - check_args_falle: NEU. Warnt, wenn "args" im Script vorkommt, aber NICHT
    das defensive Parse-Muster aus workflow-vorlage.md
    (`typeof args === 'string' ? JSON.parse(args) : (args || [])`) benutzt
    wird — haeufigster Crash laut unserer Vorlage.
  - check_slice_falle: NEU. Warnt vor `.slice(` auf `JSON.stringify(...)` in
    agent()-Prompts — die "Slice-Falle" aus workflow-vorlage.md (3x real
    passiert, R13/R15): stiller Datenverlust an Folge-Agenten statt Datei+Pfad.
  - check_model_fable: NEU. FAIL bei Fable als `model` oder `agentType` —
    ultra-loop/SKILL.md verbietet Fable-Subagents explizit (NIE Fable).
  - check_multimodel_fleet: ENTFERNT am 25.07.2026 (Anweisung Raphael).
    Prueft nichts mehr; die Cross-Vendor-Absicherung liegt beim Cockpit.
  - render()/verdict()/CLI-Grundgeruest (argparse, --json, --sample) 1:1
    uebernommen, SAMPLE auf unsere Regeln erweitert.

Stdlib only. Heuristisch (Regex/Text) — fuehrt die Datei nicht aus. Keine
Netz-Calls, kein exec.
"""
import argparse
import re
import sys

FAIL, WARN, PASS = "FAIL", "WARN", "PASS"


def _strip_comments(src):
    """Entfernt // und /* */ Kommentare, haelt Zeilenzahl stabil (Original 1:1)."""
    out = []
    i, n = 0, len(src)
    in_line = in_block = in_str = False
    str_ch = ""
    while i < n:
        c = src[i]
        nxt = src[i + 1] if i + 1 < n else ""
        if in_line:
            if c == "\n":
                in_line = False
                out.append(c)
            else:
                out.append(" ")
            i += 1
        elif in_block:
            if c == "*" and nxt == "/":
                in_block = False
                out.append("  ")
                i += 2
            else:
                out.append("\n" if c == "\n" else " ")
                i += 1
        elif in_str:
            out.append(c)
            if c == "\\":
                if nxt:
                    out.append(nxt)
                    i += 2
                    continue
            elif c == str_ch:
                in_str = False
            i += 1
        else:
            if c == "/" and nxt == "/":
                in_line = True
                out.append("  ")
                i += 2
            elif c == "/" and nxt == "*":
                in_block = True
                out.append("  ")
                i += 2
            elif c in "\"'`":
                in_str = True
                str_ch = c
                out.append(c)
                i += 1
            else:
                out.append(c)
                i += 1
    return "".join(out)


def _lineno(src, idx):
    return src.count("\n", 0, idx) + 1


def check_meta(code, findings):
    m = re.search(r"export\s+const\s+meta\s*=", code)
    if not m:
        findings.append((FAIL, None, "Kein `export const meta = {...}` gefunden (Pflicht, erste Anweisung)."))
        return
    head = code[:m.start()]
    head_sig = re.sub(r"^\s*import\b.*$", "", head, flags=re.MULTILINE).strip()
    if head_sig:
        findings.append((WARN, _lineno(code, m.start()),
                         "`meta` ist evtl. nicht die erste Anweisung — vor allen anderen Code stellen (imports davor erlaubt)."))
    brace_start = code.find("{", m.end())
    if brace_start == -1:
        findings.append((FAIL, _lineno(code, m.start()), "`meta` ist kein Objekt-Literal."))
        return
    depth, j = 0, brace_start
    while j < len(code):
        if code[j] == "{":
            depth += 1
        elif code[j] == "}":
            depth -= 1
            if depth == 0:
                break
        j += 1
    body = code[brace_start:j + 1]
    ln = _lineno(code, brace_start)
    if "name" not in body:
        findings.append((FAIL, ln, "`meta` fehlt Pflichtfeld `name`."))
    if "description" not in body:
        findings.append((FAIL, ln, "`meta` fehlt Pflichtfeld `description`."))
    # Pure-Literal-Regel: kein Template-String, kein Spread, kein Funktionsaufruf.
    if "`" in body:
        findings.append((FAIL, ln, "`meta` enthaelt einen Template-String — muss reines Literal sein (einfache Anfuehrungszeichen)."))
    if "..." in body:
        findings.append((FAIL, ln, "`meta` enthaelt Spread (`...`) — muss reines Literal sein."))
    # Funktionsaufruf-Check NUR ausserhalb von String-Literalen pruefen — sonst
    # feuert er auf normalen Fliesstext in der description (z.B. "triagieren
    # (promotion-reif...)" hat "triagieren(" NICHT als Call gemeint). ANGEPASST
    # ggue. Original: dort feuerte die Regel auf jedem Identifier+"(" im ganzen
    # body, auch innerhalb von '...'/"..."-Strings — false positive bei uns,
    # weil unsere description-Texte oft Klammern nach Woertern haben.
    masked = re.sub(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"", lambda mm: " " * len(mm.group(0)), body)
    if re.search(r"[A-Za-z_$][\w$]*\s*\(", masked):
        findings.append((FAIL, ln, "`meta` enthaelt einen Funktionsaufruf — muss reines Literal sein (keine Variablen/Calls)."))
    for reserved in ("__proto__", "constructor", "prototype"):
        if reserved in body:
            findings.append((FAIL, ln, f"`meta` nutzt reservierten Key `{reserved}` (Parser lehnt ab)."))


def check_nondeterminism(code, findings):
    for pat, msg in [
        (r"\bMath\.random\s*\(", "Math.random() ist verboten (nicht reproduzierbar, bricht Resume) — Prompt per Index variieren."),
        (r"\bDate\.now\s*\(", "Date.now() ist verboten (bricht Resume) — Zeitstempel ueber `args` reingeben."),
        (r"\bnew\s+Date\s*\(\s*\)", "argloses `new Date()` ist verboten (bricht Resume) — `new Date(konkreterWert)` nutzen oder ueber `args`."),
    ]:
        for m in re.finditer(pat, code):
            findings.append((FAIL, _lineno(code, m.start()), msg))


def check_model_fable(code, findings):
    """ultra-loop/SKILL.md: NIE Fable-Subagents.

    Bekannte Grenze: dies ist eine Heuristik auf dem Quelltext, keine harte
    Garantie. Sie erkennt nur das woertliche Literal model:'fable'
    (case-insensitiv, faengt also auch 'Fable'/'FABLE'). Verschleierung durch
    Variablen-Concat (z.B. `const m='fa'+'ble'; agent('p',{model:m})`) kann
    dieser statische Check prinzipbedingt nicht erfassen. Die Cockpit-
    Letztverifikation (siehe ultra-loop/SKILL.md, Abschnitt zur finalen
    Pruefung vor dem Merge) ist die eigentliche Grenze gegen sowas — dieser
    Check ist nur eine fruehe Advisory-Warnung, kein hartes Gate.

    Backtick-Template-Strings werden vor dem Match maskiert: echte
    Modell-Konfiguration steht in `model:'...'`/`model:"..."` (einfache/
    doppelte Anfuehrungszeichen), waehrend Kritiker-Agent-Prompts (Backtick-
    Templates) das Fable-Verbot haeufig als Text zitieren — ohne Maskierung
    false-positiv FAIL auf legitimen Prompt-Text.
    """
    masked = re.sub(r"`(?:[^`\\]|\\.)*`", lambda mm: " " * len(mm.group(0)), code)
    patterns = (
        r"model\s*:\s*['\"]fable['\"]",
        r"agentType\s*:\s*['\"][^'\"]*fable[^'\"]*['\"]",
    )
    for pattern in patterns:
        for m in re.finditer(pattern, masked, re.I):
            findings.append((FAIL, _lineno(code, m.start()),
                             "Fable-Subagents sind verboten — Fable bleibt das Cockpit; Worker laufen ueber Sol/Kimi/Luna/Sonnet/Haiku."))


def check_multimodel_fleet(code, findings):
    """Entfernt am 25.07.2026 auf Anweisung von Raphael.

    Frueher: FAIL, wenn nicht Sol, Kimi UND Luna als `agentType` vorkamen.
    Die Regel hat die Migration blockiert, als ein OpenAI-Ausfall
    (`biscuit_baker_service_me_circuit_open`) Sol und Luna gleichzeitig
    ausgeknockt hat — sie war damit nicht mehr erfuellbar, obwohl Claude und
    Kimi lieferten.

    Was damit NICHT mehr geprueft wird: dass der Verifier aus einer anderen
    Modellfamilie stammt als der schreibende Agent. Diese Absicherung liegt
    jetzt allein beim Cockpit. Alte Fassung: validate-workflow.py.bak-20260725-122305
    """
    return


def check_args_falle(code, findings):
    """Warnt, wenn `args` benutzt wird ohne das defensive typeof-Parse-Muster
    aus workflow-vorlage.md (`typeof args === 'string' ? JSON.parse(args) : (args || [])`)."""
    if not re.search(r"\bargs\b", code):
        return
    if re.search(r"typeof\s+args\s*===?\s*['\"]string['\"]", code):
        return
    for m in re.finditer(r"\bargs\b", code):
        findings.append((WARN, _lineno(code, m.start()),
                         "`args` wird benutzt, aber kein defensives typeof-Parse-Muster gefunden "
                         "(`typeof args === 'string' ? JSON.parse(args) : (args || [])`) — "
                         "haeufigster Crash laut workflow-vorlage.md."))
        break  # ein Hinweis reicht, sonst Spam bei mehrfacher Nutzung


def check_slice_falle(code, findings):
    """Slice-Falle aus workflow-vorlage.md: JSON.stringify(...).slice(0, N) in
    agent()-Prompts verliert still Daten (3x real passiert, R13/R15)."""
    for m in re.finditer(r"JSON\.stringify\([^)]*\)\s*\.slice\s*\(", code):
        findings.append((WARN, _lineno(code, m.start()),
                         "Slice-Falle: JSON.stringify(...).slice(0, N) im Prompt kappt Daten still — "
                         "Zwischenergebnis stattdessen als Datei ins Scratchpad schreiben und dem "
                         "Folge-Agenten den PFAD geben (siehe workflow-vorlage.md, Faustregel: >8k Zeichen = Datei)."))


def validate(raw):
    findings = []
    code = _strip_comments(raw)
    check_meta(code, findings)
    check_nondeterminism(code, findings)
    check_model_fable(code, findings)
    check_multimodel_fleet(code, findings)
    check_args_falle(code, findings)
    check_slice_falle(code, findings)
    return findings


def verdict(findings):
    if any(f[0] == FAIL for f in findings):
        return FAIL
    if any(f[0] == WARN for f in findings):
        return WARN
    return PASS


def render(findings, path):
    v = verdict(findings)
    lines = [f"[{v}] {path}"]
    if not findings:
        lines.append("  Keine Probleme gefunden. Workflow sieht strukturell valide aus.")
    for sev, ln, msg in sorted(findings, key=lambda f: (f[0] != FAIL, f[1] or 0)):
        loc = f"Zeile {ln}" if ln else "Datei"
        lines.append(f"  {sev} ({loc}): {msg}")
    return "\n".join(lines)


SAMPLE = """export const meta = {
  name: 'schlechtes-beispiel',
  description: `Template-Strings sind verboten`,
}

const ts = Date.now()
const x = typeof args === 'undefined' ? [] : args
const gross = await agent(`Daten: ${JSON.stringify(riesig).slice(0, 12000)}`,
  { label: 'x', phase: 'Fix', model: 'fable' })
"""


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("path", nargs="?", help="Pfad zu einer Workflow-.js-Datei")
    p.add_argument("--json", action="store_true", help="Funde als JSON ausgeben")
    p.add_argument("--sample", action="store_true", help="eingebautes, absichtlich kaputtes Beispiel pruefen")
    args = p.parse_args(argv)

    if args.sample or not args.path:
        if not args.path and not args.sample:
            print("Kein Pfad angegeben; pruefe eingebautes --sample. --help fuer Optionen.\n", file=sys.stderr)
        raw, label = SAMPLE, "<sample>"
    else:
        try:
            with open(args.path, "r", encoding="utf-8") as fh:
                raw = fh.read()
        except OSError as e:
            print(f"Konnte {args.path} nicht lesen: {e}", file=sys.stderr)
            return 2
        label = args.path

    findings = validate(raw)
    if args.json:
        import json
        print(json.dumps({
            "path": label,
            "verdict": verdict(findings),
            "findings": [{"severity": s, "line": ln, "message": m} for s, ln, m in findings],
        }, indent=2, ensure_ascii=False))
    else:
        print(render(findings, label))
    return 1 if verdict(findings) == FAIL else 0


if __name__ == "__main__":
    sys.exit(main())
