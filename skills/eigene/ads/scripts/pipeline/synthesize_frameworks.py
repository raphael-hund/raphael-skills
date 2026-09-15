#!/usr/bin/env python3
"""Synthesize Framework candidates and contradiction notes from reviewed lessons.

Input: the lesson registry written by materialize.py (one line per candidate
lesson) plus the candidate pages themselves. Lessons are grouped by topic; a
rotating synthesis model (Astra, Fable, Opus) proposes frameworks that name
their underlying lesson_ids and flags contradictions between lessons as
explicit dispute notes. Every framework references only lesson_ids that exist;
anything else is dropped and logged. Output is candidate-only.

  python3 synthesize_frameworks.py propose      -> run/frameworks/proposals.jsonl
  python3 synthesize_frameworks.py materialize  -> wiki/_candidates/ads/frameworks-<run>/
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

from common import BRAIN_ROOT, REVIEW_MODELS, RUN_DATE, RUN_ROOT, UNTRUSTED_NOTE, call_json, read_jsonl, run_parallel, slugify

OUT_DIR = RUN_ROOT / "frameworks"
CAND_REL = f"wiki/_candidates/ads/frameworks-{RUN_DATE}"
AXES = ("awareness", "ICP", "offer", "funnel_stage", "format", "budget", "market")
MAX_PER_CALL = 45

SYSTEM = (
    "Du bist Redakteur eines Ads-Wissenssystems für deutsche B2B-Leadgeneration (Agentur MAKE). "
    "Du bekommst geprüfte Einzel-Lessons eines Themas mit IDs und sollst daraus Frameworks synthetisieren: "
    "ein Framework ist eine geordnete Struktur (Schritte, Entscheidungsbaum, Matrix oder Checkliste), die mehrere Lessons zu einer anwendbaren Vorgehensweise verbindet. "
    "Erfinde keine Inhalte, die nicht in den Lessons stehen; jede Aussage im Framework muss auf genannte lesson_ids zurückgehen. "
    "Widersprüche zwischen Lessons werden nicht geglättet, sondern als eigene Streitnotiz mit offener Variable ausgewiesen. "
    "Antworte ausschließlich mit einem JSON-Objekt. " + UNTRUSTED_NOTE
)

PROMPT = """Thema: {topic}   Quellen im Paket: {sources}
Anzahl Lessons: {n}

Jede Lesson: id | Quelle | Titel | Aussage | Anwendung (gekürzt)

{lessons}

Aufgabe:
1. frameworks: 1 bis 4 Frameworks für dieses Thema. Pro Framework:
   - title (deutsch, konkret), framework_type: author_framework (alle Lessons aus einer Autorenquelle, Struktur stammt vom Autor) | synthesis_framework (verbindet mehrere Quellen oder ordnet Lessons neu),
   - zweck (1 Satz), struktur: Liste von Schritten/Elementen, jeder Schritt als {{"schritt": "...", "lessons": ["LES-..."]}},
   - underlying_lessons: alle verwendeten IDs, syntheseleistung (was das Framework über die Einzel-Lessons hinaus leistet, 1-2 Sätze),
   - anwendung_make (wie MAKE es im Ads-Prozess anwendet, 2-4 Sätze), grenze (wo es nicht gilt), testfrage (eine offene, messbare Frage).
2. contradictions: Liste echter Widersprüche zwischen zwei Lessons: {{"statements": ["LES-a","LES-b"], "context_axes": [aus {axes}], "open_variable": "welche Kontextvariable entscheidet", "testvorschlag": "..."}}. Leer, wenn keiner.
3. unassigned: lesson_ids, die in kein Framework passen (Liste).

Nur IDs aus der Liste verwenden. Antworte nur mit JSON: {{"frameworks": [...], "contradictions": [...], "unassigned": [...]}}
"""


def section(text: str, heading: str) -> str:
    m = re.search(rf"(?ms)^## {re.escape(heading)}\s*$\n(.*?)(?=^## |\Z)", text)
    return m.group(1).strip() if m else ""


def load_lessons(registry: Path, only_reviewed: bool) -> dict[str, dict]:
    lessons: dict[str, dict] = {}
    for row in read_jsonl(registry):
        if only_reviewed and row.get("review_status") != "astra_reviewed":
            continue
        path = BRAIN_ROOT / row["path"]
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        fm = dict(l.split(":", 1) for l in text.split("---", 2)[1].splitlines() if ":" in l)
        fm = {k.strip(): v.strip().strip('"') for k, v in fm.items()}
        lessons[row["lesson_id"]] = {
            **row,
            "aussage": section(text, "Aussage"),
            "anwendung": section(text, "Anwendung"),
            "source_locator": fm.get("source_locator", ""),
            "provenance_type": fm.get("provenance_type", ""),
            "quelle_raw": re.findall(r"`(raw/[^`:]+):(\d+)`", text)[:1],
        }
    return lessons


def packets(lessons: dict[str, dict]) -> list[dict]:
    by_topic: dict[str, list[dict]] = defaultdict(list)
    for les in lessons.values():
        by_topic[les.get("topic") or "other"].append(les)
    out = []
    for topic, items in sorted(by_topic.items()):
        items.sort(key=lambda x: (x["source_id"], x["lesson_id"]))
        if len(items) < 3:
            continue
        for i in range(0, len(items), MAX_PER_CALL):
            chunk = items[i : i + MAX_PER_CALL]
            out.append({"id": f"{topic}-{i // MAX_PER_CALL + 1:02d}", "topic": topic, "lessons": chunk})
    return out


def propose_worker(pk: dict) -> dict:
    ids = {l["lesson_id"] for l in pk["lessons"]}
    lines = []
    for l in pk["lessons"]:
        lines.append(f"{l['lesson_id']} | {l['source_id']} | {l['title']} | {l['aussage'][:300]} | {l['anwendung'][:200]}")
    prompt = PROMPT.format(
        topic=pk["topic"], n=len(pk["lessons"]), axes=", ".join(AXES),
        sources=", ".join(sorted({l["source_id"] for l in pk["lessons"]})),
        lessons="\n".join(lines),
    )
    result = call_json(REVIEW_MODELS, SYSTEM, prompt, pk["id"], attempts=4)
    data = result["data"]
    if not isinstance(data, dict):
        raise ValueError("non-object answer")
    dropped: list[str] = []
    frameworks = []
    for fw in data.get("frameworks") or []:
        under = [x for x in (fw.get("underlying_lessons") or []) if x in ids]
        dropped += [x for x in (fw.get("underlying_lessons") or []) if x not in ids]
        struct = []
        for st in fw.get("struktur") or []:
            if isinstance(st, dict):
                struct.append({"schritt": str(st.get("schritt", "")), "lessons": [x for x in (st.get("lessons") or []) if x in ids]})
            else:
                struct.append({"schritt": str(st), "lessons": []})
        if len(under) < 2 or not fw.get("title"):
            continue
        srcs = {l["source_id"] for l in pk["lessons"] if l["lesson_id"] in under}
        ftype = str(fw.get("framework_type") or "").strip()
        if ftype not in ("author_framework", "synthesis_framework"):
            ftype = "author_framework" if len(srcs) == 1 else "synthesis_framework"
        if len(srcs) > 1:
            ftype = "synthesis_framework"
        frameworks.append({
            "title": str(fw["title"]).strip(), "framework_type": ftype, "zweck": str(fw.get("zweck", "")),
            "struktur": struct, "underlying_lessons": under, "sources": sorted(srcs),
            "syntheseleistung": str(fw.get("syntheseleistung", "")), "anwendung_make": str(fw.get("anwendung_make", "")),
            "grenze": str(fw.get("grenze", "")), "testfrage": str(fw.get("testfrage", "")),
        })
    contradictions = []
    for c in data.get("contradictions") or []:
        st = [x for x in (c.get("statements") or []) if x in ids]
        if len(st) < 2:
            continue
        contradictions.append({
            "statements": st[:2],
            "context_axes": [a for a in (c.get("context_axes") or []) if a in AXES] or ["market"],
            "open_variable": str(c.get("open_variable", "")).strip() or "Nicht benannt.",
            "testvorschlag": str(c.get("testvorschlag", "")).strip(),
        })
    return {
        "id": pk["id"], "topic": pk["topic"], "lesson_ids": sorted(ids), "model": result["response_model"],
        "frameworks": frameworks, "contradictions": contradictions,
        "unassigned": [x for x in (data.get("unassigned") or []) if x in ids], "dropped_ids": dropped,
        "elapsed_s": result.get("elapsed_s"),
    }


def stage_propose(args: argparse.Namespace) -> None:
    lessons = load_lessons(args.registry, only_reviewed=not args.include_unreviewed)
    pks = packets(lessons)
    out = OUT_DIR / "proposals.jsonl"
    done = {r["id"] for r in read_jsonl(out)}
    todo = [p for p in pks if p["id"] not in done]
    if args.limit:
        todo = todo[: args.limit]
    print(f"lessons={len(lessons)} packets={len(pks)} done={len(done)} todo={len(todo)}", file=sys.stderr)
    print(json.dumps(run_parallel(todo, propose_worker, out, args.workers, "frameworks")))


# ---------------------------------------------------------------- materialize

def yaml_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def brain_write(rel_path: str, payload: str) -> tuple[bool, str]:
    (BRAIN_ROOT / rel_path).parent.mkdir(parents=True, exist_ok=True)
    op = "replace" if (BRAIN_ROOT / rel_path).exists() else "create"
    proc = subprocess.run([sys.executable, str(BRAIN_ROOT / "scripts/brain-write.py"), "--root", str(BRAIN_ROOT), op, "--path", rel_path],
                          input=payload.encode("utf-8"), capture_output=True)
    return proc.returncode == 0, (proc.stderr or proc.stdout).decode("utf-8", errors="replace").strip()


def tldr_of(text: str) -> str:
    words = text.replace("\n", " ").split()
    return " ".join(words[:24]).rstrip(".,;:") + "."


def render_framework(fw: dict, fw_id: str, lessons: dict[str, dict], model: str, topic: str) -> str:
    under = fw["underlying_lessons"]
    les_lines = "\n".join(f"- `{i}` [[{Path(lessons[i]['path']).stem}]] — {lessons[i]['title']}" for i in under if i in lessons)
    steps = "\n".join(f"{n}. {s['schritt']}" + (f" ({', '.join(s['lessons'])})" if s["lessons"] else "") for n, s in enumerate(fw["struktur"], 1)) or "Nicht dokumentiert."
    raw_lines = sorted({f"`{q[0]}:{q[1]}`" for i in under if i in lessons for q in lessons[i]["quelle_raw"]})
    quelle = "\n".join(raw_lines) or "- Keine raw-Belege in den zugrunde liegenden Lessons."
    tags = ["ads", "framework", topic.replace("_", "-")] + [slugify(s, 30) for s in fw["sources"]]
    return f"""---
title: {yaml_str(fw['title'])}
type: framework
confidence: low
status: candidate
sensitivity: internal
tenant: agency
created: {RUN_DATE}
tags: [{', '.join(dict.fromkeys(tags))}]
framework_id: {fw_id}
framework_type: {fw['framework_type']}
framework_status: candidate
underlying_lessons: [{', '.join(under)}]
test_ids: []
approved_by: null
synthesized_by: {yaml_str(model)}
topic: {topic}
sources: [{', '.join(fw['sources'])}]
---

# {fw['title']}

## TLDR

{tldr_of(fw['zweck'] or fw['title'])}

## Zweck

{fw['zweck'] or 'Nicht dokumentiert.'}

## Struktur

{steps}

## Regeln

- Jede Stufe geht auf die in Klammern genannten Lessons zurück; das Framework fügt keine neuen Behauptungen hinzu.
- Status `candidate`: redaktioneller Vorschlag, nicht getestet. `tested` erst mit Test-Referenz (Segment, Variable, Baseline, Messgröße, Zeitraum, Ergebnis, Entscheidung).

## Taktiken

{fw['anwendung_make'] or 'Nicht dokumentiert.'}

## Beispiele

- Siehe Beispiele in den zugrunde liegenden Lessons (Liste unter Verbindungen).

## Gilt nicht wenn

{fw['grenze'] or 'Nicht dokumentiert.'}

## Syntheseleistung

{fw['syntheseleistung'] or 'Nicht dokumentiert.'}

## Testfrage

{fw['testfrage'] or 'Nicht dokumentiert.'}

## Verbindungen

{les_lines}

## Quelle

{quelle}

- Synthese am {RUN_DATE} durch {model} aus {len(under)} geprüften Lessons (Thema {topic}).
"""


def render_contradiction(c: dict, con_id: str, test_id: str, lessons: dict[str, dict], model: str, topic: str) -> str:
    a, b = c["statements"]
    la, lb = lessons.get(a, {}), lessons.get(b, {})
    raw_lines = sorted({f"`{q[0]}:{q[1]}`" for l in (la, lb) for q in l.get("quelle_raw", [])})
    title = f"Widerspruch {topic}: {la.get('title', a)[:60]} vs. {lb.get('title', b)[:60]}"
    return f"""---
title: {yaml_str(title)}
type: dispute-note
confidence: low
status: candidate
sensitivity: internal
tenant: agency
created: {RUN_DATE}
tags: [ads, widerspruch, {topic.replace('_', '-')}]
contradiction_id: {con_id}
statements: [{a}, {b}]
context_axes: [{', '.join(c['context_axes'])}]
open_variable: {yaml_str(c['open_variable'])}
test_id: {test_id}
topic: {topic}
synthesized_by: {yaml_str(model)}
---

# {title}

## TLDR

Zwei geprüfte Lessons widersprechen sich; die Entscheidung hängt an: {c['open_variable'][:120]}

## Regeln

- Nicht glätten: beide Aussagen bleiben als eigene Lessons stehen, bis der Test entscheidet.
- Offene Variable: {c['open_variable']}
- Kontextachsen: {', '.join(c['context_axes'])}

## Taktiken

- Testvorschlag ({test_id}): {c['testvorschlag'] or 'Noch nicht formuliert.'}

## Beispiele

- `{a}` [[{Path(la.get('path', a)).stem}]]: {la.get('aussage', '')[:300]}
- `{b}` [[{Path(lb.get('path', b)).stem}]]: {lb.get('aussage', '')[:300]}

## Gilt nicht wenn

- Der Widerspruch löst sich auf, sobald eine der Kontextachsen die Geltung beider Aussagen trennt; dann werden beide Lessons um die Grenze ergänzt.

## Quelle

{chr(10).join(raw_lines) or '- Keine raw-Belege in den beteiligten Lessons.'}

- Streitnotiz am {RUN_DATE} durch {model}.
"""


def stage_materialize(args: argparse.Namespace) -> None:
    lessons = load_lessons(args.registry, only_reviewed=False)
    proposals = read_jsonl(OUT_DIR / "proposals.jsonl")
    reg_path = OUT_DIR / "framework_registry.jsonl"
    registry = {r["key"]: r for r in read_jsonl(reg_path)}
    counters = {"FW": 0, "CON": 0, "TEST": 0}
    for r in registry.values():
        kind, n = r["id"].split("-")[0], int(r["id"].split("-")[2])
        counters[kind] = max(counters[kind], n)
        if r.get("test_id"):
            counters["TEST"] = max(counters["TEST"], int(r["test_id"].split("-")[2]))

    def next_id(kind: str) -> str:
        counters[kind] += 1
        return f"{kind}-{RUN_DATE.replace('-', '')}-{counters[kind]:04d}"

    written = failed = 0
    fw_paths, con_paths = [], []
    for prop in sorted(proposals, key=lambda p: p["id"]):
        for n, fw in enumerate(prop["frameworks"], 1):
            key = f"{prop['id']}-FW{n}"
            if key not in registry:
                registry[key] = {"key": key, "id": next_id("FW"), "title": fw["title"]}
                reg_path.parent.mkdir(parents=True, exist_ok=True)
                reg_path.open("a", encoding="utf-8").write(json.dumps(registry[key], ensure_ascii=False) + "\n")
            fw_id = registry[key]["id"]
            rel = f"{CAND_REL}/{fw_id.lower()}-{slugify(fw['title'], 50)}.md"
            ok, msg = brain_write(rel, render_framework(fw, fw_id, lessons, prop["model"], prop["topic"]))
            written += ok
            failed += not ok
            fw_paths.append(rel)
            if not ok:
                print(f"FAIL {rel}: {msg[:200]}", file=sys.stderr)
        for n, c in enumerate(prop["contradictions"], 1):
            key = f"{prop['id']}-CON{n}"
            if key not in registry:
                registry[key] = {"key": key, "id": next_id("CON"), "test_id": next_id("TEST")}
                reg_path.open("a", encoding="utf-8").write(json.dumps(registry[key], ensure_ascii=False) + "\n")
            con_id, test_id = registry[key]["id"], registry[key]["test_id"]
            rel = f"{CAND_REL}/widerspruch/{con_id.lower()}-{slugify(prop['topic'], 20)}.md"
            ok, msg = brain_write(rel, render_contradiction(c, con_id, test_id, lessons, prop["model"], prop["topic"]))
            written += ok
            failed += not ok
            con_paths.append(rel)
            if not ok:
                print(f"FAIL {rel}: {msg[:200]}", file=sys.stderr)
    all_paths = [str(BRAIN_ROOT / p) for p in fw_paths + con_paths if (BRAIN_ROOT / p).exists()]
    if all_paths:
        proc = subprocess.run([sys.executable, str(Path(__file__).resolve().parents[1] / "validate-schema.py"), *all_paths], capture_output=True, text=True)
        print(proc.stdout.strip() or proc.stderr.strip()[-800:])
    print(json.dumps({"frameworks": len(fw_paths), "contradictions": len(con_paths), "written": written, "failed": failed}))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("stage", choices=("propose", "materialize"))
    ap.add_argument("--registry", type=Path, default=RUN_ROOT / "lesson_registry.jsonl")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--include-unreviewed", action="store_true")
    args = ap.parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if args.stage == "propose":
        stage_propose(args)
    else:
        stage_materialize(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
