#!/usr/bin/env python3
"""Raphael's one approval step for the reviewed candidate lessons and frameworks.

preview (default): for every astra_reviewed candidate lesson in the run
registry (plus framework/dispute candidates), run brain-promote.py --preview
with a hash-bound one-shot authorization and report whether the boundary
would accept it. Nothing is written to the canon.

apply --i-am-raphael: same, without --preview. Each promotion consumes its
own authorization. Targets are topic-first under wiki/craft/ads/lehren/<topic>/
(author folders are never topics; the source stays in frontmatter).
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
from collections import Counter
from pathlib import Path

from common import BRAIN_ROOT, RUN_DATE, RUN_ROOT, read_jsonl

AUTH_DIR = Path(os.environ.get("BRAIN_AUTH_DIR", "/root/.brain-auth"))
TOPIC_DIR = {
    "icp": "strategie", "situation": "strategie", "problem": "strategie", "angle": "creative", "hook": "creative",
    "mechanism": "creative", "proof": "creative", "offer": "strategie", "pricing": "strategie", "cta": "creative",
    "qualification": "strategie", "leadgen": "strategie", "lead_magnet": "strategie", "awareness": "strategie",
    "testing": "messung", "budget": "messung", "video": "creative", "static": "creative", "copy": "creative",
    "funnel": "strategie", "performance": "messung", "sales": "strategie", "account": "plattformen",
    "creative_strategy": "creative", "retention": "strategie", "other": "grundlagen",
}


def write_auth(cand_rel: str, target_rel: str, nonce: str) -> Path:
    AUTH_DIR.mkdir(mode=0o700, exist_ok=True)
    os.chmod(AUTH_DIR, 0o700)
    data = {
        "schema": "brain-promotion-authorization.v1",
        "candidate": cand_rel,
        "candidate_sha256": hashlib.sha256((BRAIN_ROOT / cand_rel).read_bytes()).hexdigest(),
        "target": target_rel,
        "expires_at": int(time.time()) + 7200,
        "nonce": nonce,
    }
    path = AUTH_DIR / f"{nonce}.json"
    fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        json.dump(data, fh)
    os.chmod(path, 0o600)
    return path


def plan() -> list[dict]:
    items = []
    for row in read_jsonl(RUN_ROOT / "lesson_registry.jsonl"):
        if row.get("review_status") != "astra_reviewed":
            continue
        cand = row["path"]
        if not (BRAIN_ROOT / cand).is_file():
            continue
        topic = row.get("topic") or "other"
        target = f"wiki/craft/ads/lehren/{TOPIC_DIR.get(topic, 'grundlagen')}/{Path(cand).name}"
        items.append({"kind": "lesson", "candidate": cand, "target": target, "lesson_id": row["lesson_id"], "source_id": row["source_id"], "topic": topic})
    fw_dir = BRAIN_ROOT / f"wiki/_candidates/ads/frameworks-{RUN_DATE}"
    for p in sorted(fw_dir.rglob("*.md")) if fw_dir.is_dir() else []:
        rel = str(p.relative_to(BRAIN_ROOT))
        sub = "widersprueche" if "/widerspruch/" in rel else "frameworks"
        items.append({"kind": "framework" if sub == "frameworks" else "dispute", "candidate": rel, "target": f"wiki/craft/ads/{sub}/{p.name}"})
    return items


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=("preview", "apply"), nargs="?", default="preview")
    ap.add_argument("--i-am-raphael", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--kind", choices=("lesson", "framework", "dispute"), default=None)
    args = ap.parse_args()
    if args.mode == "apply" and not args.i_am_raphael:
        print("apply ist Raphaels Freigabeschritt; --i-am-raphael erforderlich", file=sys.stderr)
        return 2
    items = plan()
    if args.kind:
        items = [i for i in items if i["kind"] == args.kind]
    if args.limit:
        items = items[: args.limit]
    out = RUN_ROOT / f"promotion_{args.mode}.jsonl"
    done = {r["candidate"] for r in read_jsonl(out) if r.get("ok")} if args.mode == "apply" else set()
    results = []
    for n, it in enumerate(items, 1):
        if it["candidate"] in done:
            continue
        if args.mode == "apply":
            (BRAIN_ROOT / it["target"]).parent.mkdir(parents=True, exist_ok=True)
        nonce = f"promo-{RUN_DATE}-{n:05d}-{hashlib.sha1(it['candidate'].encode()).hexdigest()[:8]}"
        auth = write_auth(it["candidate"], it["target"], nonce)
        cmd = [sys.executable, str(BRAIN_ROOT / "scripts/brain-promote.py"), "--root", str(BRAIN_ROOT),
               "--candidate", it["candidate"], "--target", it["target"], "--authorization", str(auth)]
        if args.mode == "preview":
            cmd.append("--preview")
        proc = subprocess.run(cmd, capture_output=True, text=True)
        if auth.exists():
            auth.unlink()
        msg = (proc.stderr + proc.stdout).strip()
        rec = {**it, "ok": proc.returncode == 0, "msg": msg[-240:], "mode": args.mode, "ts": time.time()}
        results.append(rec)
        with out.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
        if n % 100 == 0:
            print(f"[{args.mode}] {n}/{len(items)}", file=sys.stderr, flush=True)
    ok = sum(1 for r in results if r["ok"])
    reasons = Counter(re.sub(r"^.*DENY\s*", "", r["msg"]).split(":")[0][:50] or "unknown" for r in results if not r["ok"])
    print(json.dumps({"mode": args.mode, "planned": len(items), "ok": ok, "denied": dict(reasons), "by_kind": dict(Counter(i["kind"] for i in items))}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
