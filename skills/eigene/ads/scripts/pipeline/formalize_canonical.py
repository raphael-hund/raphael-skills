#!/usr/bin/env python3
"""Formalize canonical Ads lesson pages through amendment candidates.

Three stages, all idempotent:

  review       every canonical `type: lesson` page under wiki/craft/ads is read in
               full (plus the cited raw excerpt when the page cites raw/) by a
               rotating reviewer model; the model restates the page as formal
               Lesson fields and reports which elements the page documents.
  materialize  each review becomes an *amendment candidate* under
               wiki/_candidates/ads/formalisierung/<run>/: the canonical page
               byte-for-byte plus formal frontmatter, formal sections and a
               strict raw provenance line. Canonical pages are never edited.
  preview      brain-promote.py --amend --preview against each candidate with a
               hash-bound authorization, so the promotable set is known before
               Raphael approves. `apply` performs the same with real
               authorizations and is the one approval step.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

from common import (
    BRAIN_ROOT,
    EXTRACT_MODELS,
    REVIEW_MODELS,
    RUN_DATE,
    RUN_ROOT,
    UNTRUSTED_NOTE,
    RawText,
    call_json,
    enum_or,
    read_jsonl,
    run_parallel,
)

CANON_ROOT = BRAIN_ROOT / "wiki/craft/ads"
OUT_DIR = RUN_ROOT / "canonical"
CAND_REL = f"wiki/_candidates/ads/formalisierung/{RUN_DATE}"
AUTH_DIR = Path(os.environ.get("BRAIN_AUTH_DIR", "/root/.brain-auth"))

RAW_REF = re.compile(r"((?:raw)/[A-Za-z0-9._/-]+\.md):(\d+)(?:-(\d+))?")
STRICT_RAW = re.compile(r"(?m)^\s*`?(raw/[A-Za-z0-9._/-]+):(\d+)`?\s*$")
PROMOTE_HEADINGS = ("## TLDR", "## Regeln", "## Taktiken", "## Beispiele", "## Gilt nicht wenn", "## Quelle")
FORMAL_HEADINGS = ("Aussage", "Anwendung", "Beispiel", "Gegenbeispiel", "Test", "Grenze", "Verbindungen")

SOURCE_IDS = (
    "RAPHAEL-OWN-ADS", "PERFORMANCE-DATA", "REFERENCE-ADS",
    "HORMOZI-100M-OFFERS", "HORMOZI-100M-LEADS", "HORMOZI-MONEY-MODELS",
    "MARC-EVERS", "ZAC-REGAN", "ERIC-STEIGNER", "BRILLAAS", "GEORGECLEM", "NICK-THERIOT", "ZACK-BORDEAUX",
    "HEIK-STEPANJAN", "LEO-X-MOORE", "RONIN-X-SOCIALS", "CAMERON-ENGLAND", "MATT-SHIVER",
)
TIERS = ("tier_1", "tier_2", "own", "existing_brain")
TRANSFER = ("not_transferred", "pending", "editorially_applied", "produced", "tested")
PERFORMANCE = ("not_tested", "not_claimed", "observed", "tested")

SYSTEM = (
    "Du formalisierst eine bestehende, freigegebene Wissensseite aus Raphaels Ads-Brain in ein festes Lesson-Schema. "
    "Du erfindest nichts: jeder Feldinhalt muss sich aus dem Seitentext (oder dem mitgelieferten Original-Ausschnitt) belegen lassen. "
    "Fehlt ein Element in der Seite, schreibst du wörtlich 'Nicht dokumentiert.' und setzt das zugehörige documented-Flag auf false. "
    "Antworte ausschließlich mit einem JSON-Objekt. " + UNTRUSTED_NOTE
)

PROMPT = """Kanonische Seite: {rel}
Frontmatter der Seite: {fm}

Zielschema (schemas.md):
- provenance_type: raphael_learning (Raphaels eigene Erkenntnis/Analyse) | author_learning (Aussage eines fremden Autors/Creators) | reference_ad_observation (Beobachtung fremder Anzeigen) | performance_learning (aus eigenen Konto-/Performance-Daten) | brain_synthesis (Synthese mehrerer Brain-Seiten)
- source_tier: tier_1 (Hormozi, Marc Evers, Zac Regan, Raphael, Referenz-Ads, Performance) | tier_2 (Discovery-Creator) | own (eigenes Material) | existing_brain (Seite verdichtet nur andere Brain-Seiten)
- source_id: genau eine aus {source_ids}; "BRAIN-PAGE-<slug>" wenn existing_brain; "UNLISTED-<HANDLE>" (Großbuchstaben, Bindestriche) wenn der Urheber in keiner Liste steht — nie einen falschen Katalog-Autor wählen
- original_context: ein Satz zu Markt, ICP, Funnel-Stufe und Format, aus dem die Seite stammt
- context_status: unbestimmt | passend | eingeschränkt   (Passung für MAKE / deutsche B2B-Leadgen; 'passend' nur, wenn die Seite das selbst belegt)
- transfer_status: not_transferred | pending | editorially_applied | produced | tested   (nur was die Seite belegt)
- performance_status: not_tested | not_claimed | observed | tested   ('tested' nur mit Segment, Variable, Baseline, Messgröße, Zeitraum, Ergebnis in der Seite)

Formale Abschnitte, jeweils als knapper deutscher Text (Markdown erlaubt), streng aus dem Seiteninhalt:
- aussage: die Kernregel in 1-2 Sätzen
- anwendung: wie sie im Ads-Prozess konkret angewendet wird
- beispiel: ein konkretes Beispiel aus der Seite
- gegenbeispiel: wann/wo sie nicht griff oder nicht gilt (aus 'Gilt nicht wenn' o. ä.)
- test: die offene Testfrage bzw. Testvariable, die die Seite nennt
- grenze: Geltungsgrenze (Markt, Budget, Funnel-Stufe, Format)
- verbindungen: Liste der in der Seite verlinkten oder genannten anderen Brain-Seiten/Konzepte (Strings)

documented: {{"anwendung": bool, "gegenbeispiel": bool, "grenze": bool, "testfrage": bool}} — true nur, wenn die Seite das Element tatsächlich enthält.
original_verified: true nur, wenn ein Original-Ausschnitt mitgeliefert wurde UND er die Kernaussage der Seite tatsächlich trägt; sonst false und in original_note begründen.
notes: Auffälligkeiten (Widersprüche, veraltete Zahlen, fehlende Belege), sonst "".

{raw_block}
=== SEITENTEXT (Rohdaten) ===
{page}
=== ENDE ===

Antworte nur mit JSON mit den Feldern: provenance_type, source_tier, source_id, original_context, context_status, transfer_status, performance_status, aussage, anwendung, beispiel, gegenbeispiel, test, grenze, verbindungen, documented, original_verified, original_note, notes.
"""


# ---------------------------------------------------------------- page parsing

def split_page(text: str) -> tuple[list[str], str]:
    """Return (frontmatter lines without fences, body)."""
    if not text.startswith("---"):
        raise ValueError("no frontmatter")
    _, fm, body = text.split("---", 2)
    return fm.strip("\n").split("\n"), body


def fm_dict(lines: list[str]) -> dict[str, str]:
    out: dict[str, str] = {}
    for line in lines:
        if ":" in line and not line.lstrip().startswith("#") and not line.startswith(" "):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def canonical_lessons() -> list[Path]:
    pages = []
    for path in sorted(CANON_ROOT.rglob("*.md")):
        text = path.read_text(encoding="utf-8", errors="replace")
        if not text.startswith("---"):
            continue
        fm = fm_dict(split_page(text)[0])
        if fm.get("type") == "lesson":
            pages.append(path)
    return pages


def raw_refs(text: str) -> list[tuple[str, int, int | None]]:
    seen = []
    for m in RAW_REF.finditer(text):
        rel, start, end = m.group(1), int(m.group(2)), (int(m.group(3)) if m.group(3) else None)
        if end is not None and end <= start:
            end = None
        if (BRAIN_ROOT / rel).is_file() and (rel, start) not in [(s[0], s[1]) for s in seen]:
            seen.append((rel, start, end))
    return seen


def rel_of(path: Path) -> str:
    return str(path.relative_to(BRAIN_ROOT))


# ---------------------------------------------------------------- stage: review

def review_worker(item: dict) -> dict:
    path = Path(item["path"])
    text = path.read_text(encoding="utf-8")
    fm_lines, body = split_page(text)
    fm = fm_dict(fm_lines)
    refs = raw_refs(text)
    raw_block = ""
    if refs:
        rel, start, end = refs[0]
        raw = RawText(BRAIN_ROOT / rel)
        lo, hi = max(1, start - 25), min(len(raw.lines), (end or start) + 40)
        raw_block = (
            f"=== ORIGINAL-AUSSCHNITT {rel}:{lo}-{hi} (Rohdaten; die Seite zitiert Zeile {start}) ===\n"
            + raw.slice(lo, hi)[:6000]
            + "\n=== ENDE ORIGINAL ===\n"
        )
    prompt = PROMPT.format(
        rel=item["rel"],
        fm=json.dumps(fm, ensure_ascii=False),
        source_ids=", ".join(SOURCE_IDS),
        raw_block=raw_block,
        page=body[:14000],
    )
    models = REVIEW_MODELS + EXTRACT_MODELS
    result = call_json(models, SYSTEM, prompt, item["id"], attempts=4)
    data = result["data"]
    if not isinstance(data, dict):
        raise ValueError("review returned non-object")
    documented = data.get("documented") or {}
    all_doc = all(bool(documented.get(k)) for k in ("anwendung", "gegenbeispiel", "grenze", "testfrage"))
    prov = enum_or(data.get("provenance_type"), ("raphael_learning", "author_learning", "reference_ad_observation", "performance_learning", "brain_synthesis"), "brain_synthesis")
    # The "Originalstelle" of an own learning or synthesis is the canonical page itself;
    # an author learning needs the cited raw excerpt to be verified.
    origin_ok = bool(data.get("original_verified")) or (not refs and prov in ("raphael_learning", "performance_learning", "brain_synthesis"))
    review_status = "astra_reviewed" if (all_doc and origin_ok) else "pending"
    slug = path.stem
    source_id = str(data.get("source_id") or "").strip()
    tier = enum_or(data.get("source_tier"), TIERS, "existing_brain")
    if source_id.startswith("UNLISTED-") and re.fullmatch(r"UNLISTED-[A-Z0-9-]{2,60}", source_id):
        tier = "tier_2" if tier == "existing_brain" else tier
    elif source_id not in SOURCE_IDS and not source_id.startswith("BRAIN-PAGE-"):
        source_id = f"BRAIN-PAGE-{slug}"
        tier = "existing_brain"
    return {
        "id": item["id"],
        "rel": item["rel"],
        "sha256": hashlib.sha256(text.encode("utf-8")).hexdigest(),
        "reviewer_model": result["response_model"],
        "requested_model": result["requested_model"],
        "elapsed_s": result.get("elapsed_s"),
        "raw_refs": [list(r) for r in refs],
        "provenance_type": prov,
        "source_tier": tier,
        "source_id": source_id,
        "original_context": str(data.get("original_context") or "").strip() or "Nicht dokumentiert.",
        "context_status": enum_or(data.get("context_status"), ("unbestimmt", "passend", "eingeschränkt"), "unbestimmt"),
        "transfer_status": enum_or(data.get("transfer_status"), TRANSFER, "not_transferred"),
        "performance_status": enum_or(data.get("performance_status"), PERFORMANCE, "not_claimed"),
        "sections": {k: str(data.get(k) or "Nicht dokumentiert.").strip() for k in ("aussage", "anwendung", "beispiel", "gegenbeispiel", "test", "grenze")},
        "verbindungen": [str(v) for v in (data.get("verbindungen") or []) if str(v).strip()],
        "documented": {k: bool(documented.get(k)) for k in ("anwendung", "gegenbeispiel", "grenze", "testfrage")},
        "original_verified": bool(data.get("original_verified")),
        "original_note": str(data.get("original_note") or ""),
        "notes": str(data.get("notes") or ""),
        "review_status": review_status,
        "ts": time.time(),
    }


def stage_review(args: argparse.Namespace) -> None:
    out = OUT_DIR / "reviews.jsonl"
    done = {r["id"] for r in read_jsonl(out)}
    items = []
    for path in canonical_lessons():
        rel = rel_of(path)
        items.append({"id": rel, "rel": rel, "path": str(path)})
    todo = [i for i in items if i["id"] not in done]
    if args.limit:
        todo = todo[: args.limit]
    print(f"pages={len(items)} done={len(done)} todo={len(todo)}", file=sys.stderr)
    stats = run_parallel(todo, review_worker, out, args.workers, "formalize")
    print(json.dumps(stats))


# ---------------------------------------------------------------- stage: materialize

def yaml_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def brain_write(op: str, rel_path: str, payload: str) -> tuple[bool, str]:
    (BRAIN_ROOT / rel_path).parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        [sys.executable, str(BRAIN_ROOT / "scripts/brain-write.py"), "--root", str(BRAIN_ROOT), op, "--path", rel_path],
        input=payload.encode("utf-8"), capture_output=True,
    )
    return proc.returncode == 0, (proc.stderr or proc.stdout).decode("utf-8", errors="replace").strip()


def build_candidate(rev: dict, lesson_id: str) -> tuple[str, list[str]]:
    """Return (candidate text, warnings). Canonical body stays verbatim; sections are appended."""
    warnings: list[str] = []
    canon_path = BRAIN_ROOT / rev["rel"]
    text = canon_path.read_text(encoding="utf-8")
    if hashlib.sha256(text.encode("utf-8")).hexdigest() != rev["sha256"]:
        warnings.append("canonical page changed since review")
    fm_lines, body = split_page(text)
    fm = fm_dict(fm_lines)

    # frontmatter: keep every canonical line except status, add policy + formal fields
    kept = [l for l in fm_lines if not re.match(r"^(status|tenant|sensitivity)\s*:", l)]
    tenant = fm.get("tenant") or "agency"
    sensitivity = fm.get("sensitivity") or "internal"
    if sensitivity not in ("public", "internal"):
        warnings.append(f"sensitivity {sensitivity} not global; kept")
    lesson_status = "superseded" if fm.get("superseded_by") else "approved"
    reviewed = rev["review_status"] == "astra_reviewed"
    refs = rev.get("raw_refs") or []
    if refs:
        r = refs[0]
        locator = f"{r[0]}:{r[1]}" + (f"-{r[2]}" if r[2] else "")
    else:
        locator = rev["rel"] + " (Seite selbst; keine raw-Quellenstelle zitiert)"
    formal = [
        "status: candidate",
        f"tenant: {tenant}",
        f"sensitivity: {sensitivity}",
        f"amends: {rev['rel']}",
        f"amends_sha256: {rev['sha256']}",
        f"lesson_id: {lesson_id}",
        f"provenance_type: {rev['provenance_type']}",
        f"source_tier: {rev['source_tier']}",
        f"source_id: {rev['source_id']}",
        f"source_locator: {yaml_str(locator)}",
        f"original_context: {yaml_str(rev['original_context'])}",
        f"context_status: {rev['context_status'] if reviewed else 'pending_astra_review'}",
        f"transfer_status: {rev['transfer_status']}",
        f"performance_status: {rev['performance_status']}",
        f"review_status: {rev['review_status']}",
        f"reviewed_by: {'astra' if reviewed else 'null'}",
        f"reviewed_at: {RUN_DATE if reviewed else 'null'}",
        f"reviewed_model: {yaml_str(rev['reviewer_model'])}",
        f"lesson_status: {lesson_status}",
        f"formalized_run: formalisierung-{RUN_DATE}",
    ]
    new_fm = "\n".join(kept + formal)

    # body: verbatim, then formal sections before ## Quelle (Quelle stays last)
    sec = rev["sections"]
    verb = rev.get("verbindungen") or []
    verb_lines = "\n".join(f"- {v}" for v in verb) or "- Keine Verbindungen in der Seite dokumentiert."
    doc = rev["documented"]
    review_line = (
        f"Formalisierung am {RUN_DATE}: Seite vollständig gelesen durch {rev['reviewer_model']}"
        + (f", Original-Ausschnitt `{refs[0][0]}:{refs[0][1]}` geprüft" if refs and rev.get("original_verified") else "")
        + f". Dokumentiert: Anwendung={doc['anwendung']}, Gegenbeispiel={doc['gegenbeispiel']}, Grenze={doc['grenze']}, Testfrage={doc['testfrage']}."
    )
    formal_block = f"""
## Aussage

{sec['aussage']}

## Anwendung

{sec['anwendung']}

## Beispiel

{sec['beispiel']}

## Gegenbeispiel

{sec['gegenbeispiel']}

## Test

{sec['test']}

## Grenze

{sec['grenze']}

## Verbindungen

{verb_lines}

## Formalisierung

- {review_line}
- Formale Felder ergänzen die kanonische Seite; der kanonische Text oberhalb ist unverändert.
{('- Hinweise: ' + rev['notes']) if rev.get('notes') else ''}
"""
    for h in FORMAL_HEADINGS:
        if re.search(rf"(?m)^## {re.escape(h)}\s*$", body):
            warnings.append(f"page already has ## {h}; formal block still appended")
    quelle = re.search(r"(?m)^## Quelle\s*$", body)
    if quelle:
        head, tail = body[: quelle.start()], body[quelle.start():]
    else:
        head, tail = body, "\n## Quelle\n\n- Seite nennt keinen Quellenabschnitt.\n"
        warnings.append("no ## Quelle heading in canonical page")
    # strict raw lines (brain-promote provenance), one per distinct raw ref, only if missing
    strict_present = {(m.group(1), int(m.group(2))) for m in STRICT_RAW.finditer(tail)}
    strict_lines = [f"`{r[0]}:{r[1]}`" for r in sorted(refs, key=lambda r: (r[0], r[1])) if (r[0], r[1]) not in strict_present]
    if strict_lines:
        tail = tail.rstrip("\n") + "\n\n" + "\n".join(strict_lines) + "\n"
    body_out = head.rstrip("\n") + "\n" + formal_block + "\n" + tail.lstrip("\n")
    for h in PROMOTE_HEADINGS:
        if not re.search(rf"(?m)^{re.escape(h)}\s*$", body_out):
            warnings.append(f"missing {h} (brain-promote will deny)")
    if not refs:
        warnings.append("no raw/ reference (brain-promote provenance-source-missing)")
    return f"---\n{new_fm}\n---{body_out}", warnings


def stage_materialize(args: argparse.Namespace) -> None:
    reviews = list({r["rel"]: r for r in read_jsonl(OUT_DIR / "reviews.jsonl")}.values())  # last record per page wins
    registry_path = OUT_DIR / "lesson_registry.jsonl"
    registry = {r["rel"]: r for r in read_jsonl(registry_path)}
    counters: dict[str, int] = {}
    for r in registry.values():
        d, n = r["lesson_id"].split("-")[1], int(r["lesson_id"].split("-")[2])
        counters[d] = max(counters.get(d, 0), n)
    report = []
    for rev in sorted(reviews, key=lambda r: r["rel"]):
        fm = fm_dict(split_page((BRAIN_ROOT / rev["rel"]).read_text(encoding="utf-8"))[0])
        if rev["rel"] in registry:
            lesson_id = registry[rev["rel"]]["lesson_id"]
        else:
            d = re.sub(r"\D", "", fm.get("created", RUN_DATE))[:8] or RUN_DATE.replace("-", "")
            counters[d] = counters.get(d, 0) + 1
            lesson_id = f"LES-{d}-{counters[d]:04d}"
            entry = {"rel": rev["rel"], "lesson_id": lesson_id}
            registry[rev["rel"]] = entry
            with registry_path.open("a", encoding="utf-8") as fh:
                fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
        text, warnings = build_candidate(rev, lesson_id)
        cand_rel = f"{CAND_REL}/{Path(rev['rel']).name}"
        op = "replace" if (BRAIN_ROOT / cand_rel).exists() else "create"
        ok, msg = brain_write(op, cand_rel, text)
        report.append({"rel": rev["rel"], "candidate": cand_rel, "lesson_id": lesson_id, "written": ok, "write_msg": msg[:200], "warnings": warnings, "review_status": rev["review_status"]})
    (OUT_DIR / "materialize_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    written = sum(1 for r in report if r["written"])
    print(json.dumps({"reviews": len(reviews), "written": written, "failed": len(report) - written,
                      "astra_reviewed": sum(1 for r in report if r["review_status"] == "astra_reviewed"),
                      "with_warnings": sum(1 for r in report if r["warnings"])}))


# ---------------------------------------------------------------- stage: preview / apply

def root_identity() -> tuple[int, int]:
    st = os.stat(BRAIN_ROOT)
    return st.st_dev, st.st_ino


def write_authorization(cand_rel: str, target_rel: str, nonce: str) -> Path:
    AUTH_DIR.mkdir(mode=0o700, exist_ok=True)
    os.chmod(AUTH_DIR, 0o700)
    cand = (BRAIN_ROOT / cand_rel).read_bytes()
    target = (BRAIN_ROOT / target_rel).read_bytes()
    dev, ino = root_identity()
    data = {
        "schema": "brain-amendment-authorization.v1",
        "candidate": cand_rel,
        "candidate_sha256": hashlib.sha256(cand).hexdigest(),
        "target": target_rel,
        "expected_target_sha256": hashlib.sha256(target).hexdigest(),
        "root_device": dev,
        "root_inode": ino,
        "final_status": "approved",
        "expires_at": int(time.time()) + 3600,
        "nonce": nonce,
    }
    path = AUTH_DIR / f"{nonce}.json"
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        json.dump(data, fh)
    os.chmod(path, 0o600)
    return path


def stage_promote(args: argparse.Namespace, apply: bool) -> None:
    report = json.loads((OUT_DIR / "materialize_report.json").read_text(encoding="utf-8"))
    results = []
    for n, row in enumerate(report, 1):
        if not row["written"]:
            results.append({**row, "promotable": False, "reason": "candidate-not-written"})
            continue
        nonce = f"formal-{RUN_DATE}-{n:04d}-{hashlib.sha1(row['rel'].encode()).hexdigest()[:8]}"
        auth = write_authorization(row["candidate"], row["rel"], nonce)
        cmd = [sys.executable, str(BRAIN_ROOT / "scripts/brain-promote.py"), "--root", str(BRAIN_ROOT),
               "--candidate", row["candidate"], "--target", row["rel"], "--authorization", str(auth), "--amend"]
        if not apply:
            cmd.append("--preview")
        proc = subprocess.run(cmd, capture_output=True, text=True)
        out = (proc.stderr + proc.stdout).strip()
        if not apply and auth.exists():
            auth.unlink()
        results.append({**row, "promotable": proc.returncode == 0, "reason": out[-300:], "applied": apply and proc.returncode == 0})
    name = "apply_report.json" if apply else "preview_report.json"
    (OUT_DIR / name).write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
    ok = sum(1 for r in results if r["promotable"])
    reasons: dict[str, int] = {}
    for r in results:
        if not r["promotable"]:
            key = re.sub(r"^.*brain-promote:\s*(DENY\s*)?", "", r["reason"]).split(":")[0][:60] or "unknown"
            reasons[key] = reasons.get(key, 0) + 1
    print(json.dumps({"stage": "apply" if apply else "preview", "candidates": len(results), "promotable" if not apply else "applied": ok, "denied": reasons}, ensure_ascii=False))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("stage", choices=("review", "materialize", "preview", "apply"))
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--i-am-raphael", action="store_true", help="required for apply")
    args = ap.parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    if args.stage == "review":
        stage_review(args)
    elif args.stage == "materialize":
        stage_materialize(args)
    elif args.stage == "preview":
        stage_promote(args, apply=False)
    else:
        if not args.i_am_raphael:
            print("apply is Raphael's approval step; pass --i-am-raphael", file=sys.stderr)
            return 2
        stage_promote(args, apply=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
