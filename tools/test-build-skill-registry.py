#!/usr/bin/env python3
"""test-build-skill-registry.py — deterministische Tests T1-T7, T9.

Ohne LLM, ohne Netz, stdlib-only. Jeder Test hat eine Gegenprobe: ein Test, der
nicht rot werden kann, prueft nichts.

Ausgabeform (D §2):
    ok   <name>
    FAIL <name>: erwartet ..., bekommen ...
    <suite>: alle Pruefungen bestanden
"""
from __future__ import annotations

import importlib.util
import json
import re
import sys
import tempfile
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
SCHEMA_PATH = Path("/root/.claude/skill-os/registry.schema.json")

_spec = importlib.util.spec_from_file_location("bsr", TOOLS / "build-skill-registry.py")
gen = importlib.util.module_from_spec(_spec)
assert _spec.loader is not None
_spec.loader.exec_module(gen)

FAILS: list[str] = []


def check(name: str, ok: bool, expected: str = "", got: str = "") -> None:
    if ok:
        print(f"  ok   {name}")
    else:
        print(f"  FAIL {name}: erwartet {expected}, bekommen {got}")
        FAILS.append(name)


ENTRIES, REGISTRY = gen.build_entries()
BY_NAME = {e["name"]: e for e in ENTRIES}
ALL_IDS = set(BY_NAME)


# --------------------------------------------------------------------------
# T1 — --check Drift
# --------------------------------------------------------------------------
def t1_check_drift() -> None:
    print("T1 Drift (--check)")
    content = gen.dumps(REGISTRY)
    check("registry ist deterministisch (2 Laeufe gleich)",
          gen.dumps(gen.build_entries()[1]) == content, "identisch", "abweichend")
    inventory = gen.build_markdown(ENTRIES)
    check("menschenlesbares Inventar ist deterministisch",
          gen.build_markdown(gen.build_entries()[0]) == inventory, "identisch", "abweichend")
    check("Inventar enthaelt genau einen Tabellen-Eintrag je Skill",
          inventory.count("\n| `") == len(ENTRIES), str(len(ENTRIES)), str(inventory.count("\n| `")))

    # Gegenprobe: ein zusaetzliches Verzeichnis muss --check rot machen.
    with tempfile.TemporaryDirectory() as td:
        fake = Path(td) / "skills"
        fake.mkdir()
        (fake / "zzz-testskill").mkdir()
        (fake / "zzz-testskill" / "SKILL.md").write_text(
            "---\nname: zzz-testskill\ndescription: Testskill.\n---\n", encoding="utf-8")
        ids = gen.discover(fake)
        check("Gegenprobe: neues Verzeichnis wird entdeckt",
              ids == ["zzz-testskill"], "['zzz-testskill']", str(ids))


# --------------------------------------------------------------------------
# T2 — Schema (Veto)
# --------------------------------------------------------------------------
REQUIRED = ["name", "purpose", "category", "source", "confidence", "activation",
            "owner", "scope", "auto_when", "never_when", "requires", "conflicts",
            "evidence", "status"]
ACTIVATIONS = {"always", "auto-router", "internal", "explicit", "hidden"}
STATUSES = {"active", "experimental", "deprecated", "duplicate", "unclassified"}
SCOPES = {"session", "task", "step"}
CONFIDENCES = {"hoch", "mittel", "niedrig"}
NAME_RE = re.compile(r"^[A-Za-z0-9_.-]+(:[A-Za-z0-9_.-]+)?$")
SOURCE_RE = re.compile(r"^/.*SKILL\.md$")

ALLOWED = set(REQUIRED) | {"canonical_of"}


def validate_entry(e: dict) -> list[str]:
    errs = []
    for f in REQUIRED:
        if f not in e:
            errs.append(f"Pflichtfeld {f} fehlt")
    extra = set(e) - ALLOWED
    if extra:
        errs.append(f"additionalProperties: {sorted(extra)}")
    if not NAME_RE.match(e.get("name", "")):
        errs.append("name matcht nicht")
    if not SOURCE_RE.match(e.get("source", "")):
        errs.append("source matcht nicht")
    if e.get("activation") not in ACTIVATIONS:
        errs.append(f"activation {e.get('activation')}")
    if e.get("status") not in STATUSES:
        errs.append(f"status {e.get('status')}")
    if e.get("scope") not in SCOPES:
        errs.append(f"scope {e.get('scope')}")
    if e.get("confidence") not in CONFIDENCES:
        errs.append(f"confidence {e.get('confidence')}")
    for f in ("auto_when", "never_when", "requires", "conflicts", "evidence"):
        v = e.get(f)
        if not isinstance(v, list):
            errs.append(f"{f} ist keine Liste")
        elif len(v) != len(set(map(str, v))):
            errs.append(f"{f} nicht uniqueItems")
    if not e.get("evidence"):
        errs.append("evidence leer")
    if e.get("status") == "duplicate" and "canonical_of" not in e:
        errs.append("duplicate ohne canonical_of")
    if e.get("activation") in ("explicit", "hidden") and e.get("auto_when"):
        errs.append("explicit/hidden mit nichtleerem auto_when")
    return errs


def t2_schema() -> None:
    print("T2 Schema (Veto)")
    bad = []
    for e in ENTRIES:
        errs = validate_entry(e)
        if errs:
            bad.append(f"{e['name']}: {'; '.join(errs)}")
    check("alle Eintraege schema-valide", not bad, "0 Fehler",
          f"{len(bad)}: {bad[:3]}")

    missing = [e["name"] for e in ENTRIES if not Path(e["source"]).is_file()]
    check("jede source existiert auf der Platte", not missing, "0",
          f"{len(missing)}: {missing[:3]}")

    # Kopf
    check("schema_version == 1", REGISTRY["schema_version"] == 1, "1",
          str(REGISTRY["schema_version"]))
    check("skill_count == len(skills)",
          REGISTRY["skill_count"] == len(REGISTRY["skills"]),
          str(len(REGISTRY["skills"])), str(REGISTRY["skill_count"]))

    # 3 Mutationen einzeln — jede muss rot sein.
    m1 = dict(ENTRIES[0]); m1.pop("owner")
    check("Gegenprobe: fehlendes Pflichtfeld rot", bool(validate_entry(m1)),
          "Fehler", "keiner")
    m2 = dict(ENTRIES[0]); m2["status"] = "duplicate"; m2.pop("canonical_of", None)
    check("Gegenprobe: duplicate ohne canonical_of rot", bool(validate_entry(m2)),
          "Fehler", "keiner")
    m3 = dict(ENTRIES[0]); m3["activation"] = "explicit"; m3["auto_when"] = ["x"]
    check("Gegenprobe: explicit mit auto_when rot", bool(validate_entry(m3)),
          "Fehler", "keiner")


# --------------------------------------------------------------------------
# T3 — Abdeckung
# --------------------------------------------------------------------------
def t3_coverage() -> None:
    print("T3 Abdeckung")
    disk = set(gen.discover())
    reg = set(BY_NAME)
    check("A\\B leer (jeder Skill hat einen Datensatz)", not (disk - reg),
          "leer", str(sorted(disk - reg)[:5]))
    check("B\\A leer (kein Geister-Datensatz)", not (reg - disk),
          "leer", str(sorted(reg - disk)[:5]))
    names = [e["name"] for e in ENTRIES]
    check("keine Dublette", len(names) == len(set(names)),
          str(len(set(names))), str(len(names)))
    check("len(A) >= 300 (S5)", len(ENTRIES) >= 300, ">=300", str(len(ENTRIES)))
    check("Allowlist deckt genau die 2 Ausnahmen",
          set(gen.DISCOVER_ALLOWLIST) == {"_shared", "visual-harness"},
          "{_shared, visual-harness}", str(set(gen.DISCOVER_ALLOWLIST)))


# --------------------------------------------------------------------------
# T4 — Zweistufiger Parser (Pflichtpruefung, Vertrag §0)
# --------------------------------------------------------------------------
def t4_two_level_parser() -> None:
    print("T4 Zweistufiger Frontmatter-Parser")
    root = gen.SKILLS_ROOT
    top_only = 0
    nested_only = 0
    both = 0
    dist: dict[str, int] = {}
    for sid in gen.discover():
        text = (root / sid / "SKILL.md").read_text(encoding="utf-8", errors="replace")
        fm = gen.parse_frontmatter(text)
        t = gen.scalar_value(fm["top"].get("class", "")) or None
        n = fm["nested"].get("metadata", {}).get("raphael-class")
        n = gen.scalar_value(n) if n else None
        if t and n:
            both += 1
        elif t:
            top_only += 1
        elif n:
            nested_only += 1
        v = gen.fm_class(fm)
        if v:
            dist[v] = dist.get(v, 0) + 1

    union = top_only + nested_only + both
    check("Union class/metadata.raphael-class == 143", union == 143, "143", str(union))
    check("top-level == 63", top_only + both == 63, "63", str(top_only + both))
    check("nested == 80", nested_only + both == 80, "80", str(nested_only + both))
    check("Ueberschneidung == 0", both == 0, "0", str(both))
    expected = {"F": 18, "M": 95, "O": 17, "E": 5, "R": 4, "W": 2, "G": 2}
    check("Verteilung F18/M95/O17/E5/R4/W2/G2", dist == expected,
          str(expected), str(dist))
    how_phrases = BY_NAME["how"]["auto_when"]
    check("escaped Trigger-Anfuehrungen werden normalisiert",
          "how does X work" in how_phrases and all("\\" not in p for p in how_phrases),
          "saubere Phrasen", str(how_phrases))

    # Gegenprobe: ein einstufiger (flacher) Parser muss 63 und M18 liefern.
    flat_n = 0
    flat_dist: dict[str, int] = {}
    for sid in gen.discover():
        text = (root / sid / "SKILL.md").read_text(encoding="utf-8", errors="replace")
        for line in gen.extract_frontmatter(text):
            m = re.match(r"^class:\s*(.*)$", line)
            if m:
                flat_n += 1
                v = gen.scalar_value(m.group(1))
                flat_dist[v] = flat_dist.get(v, 0) + 1
                break
    check("Gegenprobe: einstufiger Parser findet nur 63", flat_n == 63, "63", str(flat_n))
    check("Gegenprobe: einstufiger Parser liefert M=18",
          flat_dist.get("M") == 18, "18", str(flat_dist.get("M")))


# --------------------------------------------------------------------------
# T5 — Owner
# --------------------------------------------------------------------------
def t5_owner() -> None:
    print("T5 Owner")
    bad = [e["name"] for e in ENTRIES
           if e["owner"] != "system" and e["owner"] not in ALL_IDS]
    check("jeder owner existiert", not bad, "0", f"{len(bad)}: {bad[:3]}")

    not_led = []
    for e in ENTRIES:
        if e["activation"] == "internal":
            owner = BY_NAME.get(e["owner"])
            if owner is None or e["name"] not in owner["requires"]:
                not_led.append(e["name"])
    check("internal wird vom Owner in requires gefuehrt (G3)", not not_led,
          "0", f"{len(not_led)}: {not_led[:3]}")

    bad_system = [e["name"] for e in ENTRIES if e["owner"] == "system"
                  and not (e["scope"] == "session" and e["activation"] == "always")]
    check("system nur bei scope session + activation always", not bad_system,
          "0", f"{len(bad_system)}: {bad_system[:3]}")

    multi = [e["name"] for e in ENTRIES if not isinstance(e["owner"], str)]
    check("genau ein Owner je Skill", not multi, "0", str(multi[:3]))


# --------------------------------------------------------------------------
# T6 — Konfliktgraph
# --------------------------------------------------------------------------
def t6_conflicts() -> None:
    print("T6 Konfliktgraph")
    asym = []
    for e in ENTRIES:
        for c in e["conflicts"]:
            other = BY_NAME.get(c)
            if other is None or e["name"] not in other["conflicts"]:
                asym.append(f"{e['name']}->{c}")
    check("conflicts symmetrisch (G4)", not asym, "0", f"{len(asym)}: {asym[:3]}")

    unreal = [f"{e['name']}->{c}" for e in ENTRIES for c in e["conflicts"]
              if c not in ALL_IDS]
    check("conflicts real", not unreal, "0", str(unreal[:3]))

    selfc = [e["name"] for e in ENTRIES if e["name"] in e["conflicts"]]
    check("kein Selbstkonflikt", not selfc, "0", str(selfc[:3]))

    overlap = [e["name"] for e in ENTRIES
               if set(e["requires"]) & set(e["conflicts"])]
    check("requires ∩ conflicts leer", not overlap, "0", str(overlap[:3]))

    # Gegenprobe: Kante einseitig loeschen muss rot sein.
    victim = next((e for e in ENTRIES if e["conflicts"]), None)
    if victim:
        c = victim["conflicts"][0]
        BY_NAME[c]["conflicts"].remove(victim["name"])
        broken = any(victim["name"] not in BY_NAME[x]["conflicts"]
                     for x in victim["conflicts"])
        check("Gegenprobe: einseitige Kante wird erkannt", broken, "rot", "gruen")
        BY_NAME[c]["conflicts"].append(victim["name"])
        BY_NAME[c]["conflicts"].sort()
    else:
        check("Gegenprobe: es gibt mindestens eine Konfliktkante", False,
              ">=1 Kante", "0")


# --------------------------------------------------------------------------
# T7 — Zyklen (Veto)
# --------------------------------------------------------------------------
def t7_cycles() -> None:
    print("T7 Zyklen (Veto)")
    graph = {e["name"]: e["requires"] for e in ENTRIES}
    cycle = gen.find_cycle(graph)
    check("kein requires-Zyklus (G5)", cycle is None, "keiner",
          " -> ".join(cycle) if cycle else "")

    dangling = [f"{n}->{r}" for n, rs in graph.items() for r in rs if r not in ALL_IDS]
    check("keine Kante ins Leere", not dangling, "0", str(dangling[:3]))

    def closure(n: str, depth: int = 0, seen: set | None = None) -> int:
        seen = seen or set()
        if n in seen or depth > 5:
            return depth
        seen.add(n)
        return max([depth] + [closure(r, depth + 1, seen) for r in graph.get(n, [])])

    deep = [n for n in graph if closure(n) > 3]
    check("Huelle <= 3", not deep, "0", f"{len(deep)}: {deep[:3]}")

    # Ausgenommen ist genau die G3-Kante Owner -> internal: sie IST der
    # Ladeweg, der einen internal-Skill erreichbar haelt. Jede andere Kante auf
    # deprecated/duplicate bleibt verboten.
    bad_req = [
        f"{e['name']}->{r}" for e in ENTRIES for r in e["requires"]
        if BY_NAME[r]["status"] in ("deprecated", "duplicate")
        and not (BY_NAME[r]["activation"] == "internal" and BY_NAME[r]["owner"] == e["name"])
    ]
    check("kein requires auf deprecated/duplicate (ausser G3-Owner-Kante)",
          not bad_req, "0", str(bad_req[:3]))

    # Gegenproben: Zyklen der Laenge 2 und 3.
    c2 = gen.find_cycle({"a": ["b"], "b": ["a"]})
    check("Gegenprobe: Zyklus Laenge 2 erkannt", c2 is not None, "erkannt", "keiner")
    c3 = gen.find_cycle({"a": ["b"], "b": ["c"], "c": ["a"]})
    check("Gegenprobe: Zyklus Laenge 3 erkannt", c3 is not None, "erkannt", "keiner")


# --------------------------------------------------------------------------
# T9 — Drift
# --------------------------------------------------------------------------
def t9_drift() -> None:
    print("T9 Drift gegen Baseline")
    root = gen.SKILLS_ROOT
    entries_dir = sorted(p.name for p in root.iterdir())
    check("314 Verzeichniseintraege", len(entries_dir) == 314, "314",
          str(len(entries_dir)))
    check("312 aufloesbare SKILL.md", len(ENTRIES) == 312, "312", str(len(ENTRIES)))

    broken = [p.name for p in root.iterdir()
              if p.is_symlink() and not p.resolve().exists()]
    check("0 kaputte Symlinks (S7)", not broken, "0", str(broken[:3]))

    unclass = [e["name"] for e in ENTRIES if e["status"] == "unclassified"]
    check("kein unclassified (S10)", not unclass, "0", str(unclass[:3]))

    no_ev = [e["name"] for e in ENTRIES
             if e["activation"] in ("always", "auto-router") and not e["evidence"]]
    check("jeder always/auto-router hat evidence (S9)", not no_ev, "0", str(no_ev[:3]))

    pstack = [e for e in ENTRIES if e["name"].startswith("pstack-")]
    check("44 pstack-Eintraege", len(pstack) == 44, "44", str(len(pstack)))

    off = [e["name"] for e in ENTRIES if e["activation"] == "off"]
    check("kein 'off' (S10)", not off, "0", str(off[:3]))


def main() -> int:
    print("test-build-skill-registry")
    t1_check_drift()
    t2_schema()
    t3_coverage()
    t4_two_level_parser()
    t5_owner()
    t6_conflicts()
    t7_cycles()
    t9_drift()
    print()
    if FAILS:
        print(f"test-build-skill-registry: {len(FAILS)} Pruefungen rot: {FAILS}")
        return 1
    print("test-build-skill-registry: alle Pruefungen bestanden")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
