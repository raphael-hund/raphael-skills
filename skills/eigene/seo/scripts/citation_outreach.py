#!/usr/bin/env python3
"""Citation outreach engine. Never sends, publishes, or pays.

Mandantenisolierter SQLite-State. Offline JSONL/CSV. Human-Gate für send/offer.
Payment bleibt unimplementiert. live_verified ist Pflicht vor payment-eligible.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import posixpath
import re
import sqlite3
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

SCHEMA_VERSION = 1
DB_NAME = "citation_outreach.sqlite"
MARKER = ".citation-outreach-client"
CADENCES = {
    "hook_2_3": (0, 2, 3),
    "prompt_4_9": (0, 4, 9),
}
EDITORIAL_TYPES = {"article", "listicle", "comparison", "guide", "review_roundup"}
EDITORIAL_SITES = {"blog", "news", "editorial"}
SOCIAL_HOSTS = {
    "reddit.com",
    "x.com",
    "twitter.com",
    "linkedin.com",
    "facebook.com",
    "fb.com",
    "quora.com",
    "youtube.com",
    "youtu.be",
}
REVIEW_HOSTS = {
    "g2.com",
    "capterra.com",
    "trustpilot.com",
    "apps.apple.com",
    "play.google.com",
}
GENERIC_LOCAL = {
    "info",
    "editor",
    "hello",
    "contact",
    "support",
    "sales",
    "office",
    "admin",
    "press",
    "team",
}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
LIVE_CONNECTORS = (
    ("CrowdReply", ("CROWDREPLY_API_KEY", "CROWDREPLY_MCP_TOKEN")),
    ("Sheets", ("GOOGLE_SHEETS_CREDENTIALS", "GOOGLE_APPLICATION_CREDENTIALS")),
    ("Smartlead", ("SMARTLEAD_API_KEY",)),
    ("Snov", ("SNOV_API_KEY", "SNOV_CLIENT_ID")),
    ("Prospeo", ("PROSPEO_API_KEY",)),
    ("Hunter", ("HUNTER_API_KEY",)),
    ("ZeroBounce", ("ZEROBOUNCE_API_KEY",)),
    ("Slack", ("SLACK_BOT_TOKEN", "SLACK_TOKEN")),
)
ALLOWED_STATUSES = {"READY", "AUTH_REQUIRED", "MISSING", "BLOCKED"}
ALLOWED_CONFIG_KEYS = {
    "schema_version",
    "client_id",
    "campaign_id",
    "cadence_profile",
    "mode",
    "own_domains",
    "close_rate_formula_id",
    "notes",
    "brand",
    "target_pages",
    "live",
    "connectors",
    "fixtures",
    "workspace",
}
GLOBAL_ARGV_VALUE_FLAGS = ("--config", "--workspace")
GLOBAL_ARGV_BOOL_FLAGS = ("--json",)
TABLES = (
    "cited_urls",
    "shortlist",
    "contacts",
    "drafts",
    "replies",
    "placements",
    "approvals",
    "weekly_reports",
    "events",
)


class EngineError(Exception):
    def __init__(self, message: str, code: int = 1):
        super().__init__(message)
        self.code = code


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def parse_iso(value: str) -> datetime:
    raw = (value or "").strip()
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    dt = datetime.fromisoformat(raw)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


def sha_join(*parts) -> str:
    blob = "\0".join("" if p is None else str(p) for p in parts)
    return hashlib.sha256(blob.encode("utf-8")).hexdigest()


def canonical_json(obj) -> str:
    return json.dumps(obj, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def payload_hash(obj) -> str:
    return hashlib.sha256(canonical_json(obj).encode("utf-8")).hexdigest()


def host_key(host: str) -> str:
    h = (host or "").strip().lower()
    if h.startswith("www."):
        h = h[4:]
    return h


def normalize_url(url: str) -> str:
    raw = (url or "").strip()
    if not raw:
        raise EngineError("empty url")
    parts = urlsplit(raw)
    scheme = (parts.scheme or "https").lower()
    host = (parts.hostname or "").lower()
    if not host:
        raise EngineError(f"url without host: {url}")
    port = parts.port
    netloc = host
    if port and port not in (80, 443):
        netloc = f"{host}:{port}"
    path = parts.path or "/"
    path = posixpath.normpath(path)
    if path in (".", ""):
        path = "/"
    if not path.startswith("/"):
        path = "/" + path
    if (parts.path.endswith("/") or parts.path == "") and path != "/":
        path += "/"
    return urlunsplit((scheme, netloc, path, parts.query, ""))


def normalize_email(email: str) -> str:
    return (email or "").strip().lower()


def is_generic(email: str) -> bool:
    local = normalize_email(email).split("@", 1)[0]
    return local in GENERIC_LOCAL


def classify_page(url: str, domain: str, page_type: str, site_type: str, own_domains):
    canon = normalize_url(url)
    parts = urlsplit(canon)
    host = host_key(parts.hostname or domain)
    path = parts.path or "/"
    ptype = (page_type or "").strip().lower()
    site = (site_type or "").strip().lower()
    own = {host_key(d) for d in own_domains}
    if host in own or host_key(domain) in own:
        return "excluded", "own_site", ptype, site, canon, host
    if host in SOCIAL_HOSTS or site in {"social", "ugc"}:
        return "excluded", "social_ugc", ptype, site, canon, host
    if host in REVIEW_HOSTS or site in {"review", "directory"}:
        return "excluded", "review_directory", ptype, site, canon, host
    if ptype == "homepage" or path in {"", "/"}:
        return "excluded", "homepage", ptype or "homepage", site, canon, host
    if ptype in {"landing", "product"}:
        return "excluded", ptype, ptype, site, canon, host
    editorial = ptype in EDITORIAL_TYPES and (site in EDITORIAL_SITES or not site)
    if not editorial:
        if any(token in path for token in ("/blog/", "/news/", "/guide", "/guides/")):
            editorial = True
            ptype = ptype or "article"
            site = site or "blog"
    if editorial:
        return "retained", "", ptype, site or "blog", canon, host
    return "excluded", "not_editorial", ptype, site, canon, host


def is_homepage_url(url: str, page_type: str = "") -> bool:
    if (page_type or "").strip().lower() == "homepage":
        return True
    if not (url or "").strip():
        return True
    path = urlsplit(normalize_url(url)).path or "/"
    return path in {"", "/"}


def resolve_config_relative(config_dir: Path, raw: str) -> str:
    p = Path(raw)
    if p.is_absolute():
        return str(p)
    return str((config_dir / p).resolve())


def normalize_argv(argv):
    """Hoist global --config/--workspace/--json so they work before or after the subcommand."""
    argv = list(argv)
    globals_out = []
    rest = []
    i = 0
    while i < len(argv):
        tok = argv[i]
        if tok in GLOBAL_ARGV_VALUE_FLAGS and i + 1 < len(argv):
            globals_out.extend([tok, argv[i + 1]])
            i += 2
            continue
        if tok.startswith("--config=") or tok.startswith("--workspace="):
            globals_out.append(tok)
            i += 1
            continue
        if tok in GLOBAL_ARGV_BOOL_FLAGS:
            globals_out.append(tok)
            i += 1
            continue
        rest.append(tok)
        i += 1
    return globals_out + rest


def load_config(path: Path) -> dict:
    path = Path(path)
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise EngineError(f"config unreadable: {path} ({exc})", 1) from exc
    if not isinstance(data, dict):
        raise EngineError("config must be a JSON object", 1)
    unknown = sorted(k for k in data if k not in ALLOWED_CONFIG_KEYS)
    if unknown:
        raise EngineError("unknown config keys: " + ", ".join(unknown), 1)
    if data.get("schema_version") != SCHEMA_VERSION:
        raise EngineError("schema_version must be 1", 1)
    for key in ("client_id", "campaign_id", "cadence_profile"):
        if not str(data.get(key) or "").strip():
            raise EngineError(f"config missing {key}", 1)
    cadence = data["cadence_profile"]
    if cadence not in CADENCES:
        raise EngineError("cadence_profile must be hook_2_3 or prompt_4_9", 1)
    mode = (data.get("mode") or "offline").strip().lower()
    if mode not in ("offline", "live"):
        raise EngineError("mode must be offline or live", 1)
    brand = data.get("brand")
    if not isinstance(brand, dict):
        raise EngineError("brand is required", 1)
    target_link = str(brand.get("target_link_url") or "").strip()
    if not target_link:
        raise EngineError("brand.target_link_url required", 1)
    target_link_canon = normalize_url(target_link)
    if is_homepage_url(target_link_canon):
        raise EngineError("target_link_url must not be a homepage", 1)
    if "target_pages" in data and data.get("target_pages") is None:
        raise EngineError("target_pages must be a list", 1)
    pages = data.get("target_pages") or []
    if not isinstance(pages, list):
        raise EngineError("target_pages must be a list", 1)
    published_non_home = []
    for i, page in enumerate(pages):
        if not isinstance(page, dict):
            raise EngineError(f"target_pages[{i}] must be an object", 1)
        url = str(page.get("url") or "").strip()
        if not url:
            raise EngineError(f"target_pages[{i}].url required", 1)
        if not isinstance(page.get("published"), bool):
            raise EngineError(f"target_pages[{i}].published must be boolean", 1)
        canon = normalize_url(url)
        if page.get("published") is True and not is_homepage_url(canon, page.get("page_type") or ""):
            published_non_home.append(canon)
    if mode == "live":
        if target_link_canon not in published_non_home:
            raise EngineError("BLOCKED_TARGET_PAGES", 2)
    data["own_domains"] = [host_key(d) for d in (data.get("own_domains") or [])]
    data["mode"] = mode
    data["schema_version"] = SCHEMA_VERSION
    data["brand"] = brand
    config_dir = path.resolve().parent
    data["_config_path"] = str(path.resolve())
    data["_config_dir"] = str(config_dir)
    fixtures = data.get("fixtures") or {}
    if fixtures and not isinstance(fixtures, dict):
        raise EngineError("fixtures must be an object", 1)
    if isinstance(fixtures, dict) and fixtures:
        resolved = {}
        for key, val in fixtures.items():
            if isinstance(val, str) and val:
                resolved[key] = resolve_config_relative(config_dir, val)
            else:
                resolved[key] = val
        data["fixtures"] = resolved
    return data


def read_rows(path: Path):
    if not path.is_file():
        raise EngineError(f"import file missing: {path}", 1)
    suffix = path.suffix.lower()
    if suffix == ".csv":
        with path.open(newline="", encoding="utf-8") as fh:
            return list(csv.DictReader(fh))
    text = path.read_text(encoding="utf-8").strip()
    if not text:
        return []
    if text.startswith("["):
        data = json.loads(text)
        if not isinstance(data, list):
            raise EngineError("JSON import must be a list", 1)
        return data
    rows = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        rows.append(json.loads(line))
    return rows


def connect(workspace: Path) -> sqlite3.Connection:
    db = workspace / DB_NAME
    con = sqlite3.connect(str(db))
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON")
    return con


def emit_event(con, cfg, action, entity="", entity_id="", detail=None):
    con.execute(
        """INSERT INTO events (event_id, client_id, campaign_id, at, actor, action, entity, entity_id, detail_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            sha_join(cfg["client_id"], action, entity, entity_id, now_iso(), str(time.time_ns()), canonical_json(detail or {})),
            cfg["client_id"],
            cfg["campaign_id"],
            now_iso(),
            "engine",
            action,
            entity,
            entity_id,
            canonical_json(detail or {}),
        ),
    )


SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS cited_urls (
  citation_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  pull_id TEXT NOT NULL,
  observed_date TEXT,
  model TEXT,
  prompt_id TEXT,
  prompt_text TEXT,
  page_title TEXT,
  url_raw TEXT,
  canonical_url TEXT NOT NULL,
  domain TEXT,
  source_system TEXT,
  status TEXT,
  exclusion_reason TEXT,
  page_type TEXT,
  site_type TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS shortlist (
  shortlist_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  domain TEXT,
  page_title TEXT,
  citation_count INTEGER,
  distinct_model_count INTEGER,
  distinct_prompt_count INTEGER,
  first_cited_at TEXT,
  last_cited_at TEXT,
  source_models TEXT,
  page_type TEXT,
  site_type TEXT,
  rank INTEGER,
  status TEXT,
  review_decision TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  dedupe_key TEXT NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS contacts (
  contact_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  shortlist_id TEXT,
  canonical_page_url TEXT,
  domain TEXT,
  person_name TEXT,
  role TEXT,
  email_original TEXT,
  email_normalized TEXT,
  discovery_source TEXT,
  zerobounce_status TEXT,
  is_generic INTEGER,
  priority_rank INTEGER,
  suppression_status TEXT,
  found_at TEXT,
  verified_at TEXT,
  status TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS drafts (
  draft_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  shortlist_id TEXT,
  contact_id TEXT,
  canonical_page_url TEXT,
  domain TEXT,
  article_title_exact TEXT,
  target_link_url TEXT,
  mention_angle TEXT,
  sequence_step INTEGER,
  cadence_profile_id TEXT,
  planned_delay_days INTEGER,
  subject TEXT,
  body TEXT,
  word_count INTEGER,
  status TEXT,
  send_approval_status TEXT,
  send_approved_by TEXT,
  send_approved_at TEXT,
  approved_payload_hash TEXT,
  sent_at TEXT,
  email_normalized TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS replies (
  reply_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  smartlead_message_id TEXT,
  thread_id TEXT,
  contact_id TEXT,
  domain TEXT,
  sequence_id TEXT,
  received_at TEXT,
  body_ref_or_hash TEXT,
  classification TEXT,
  classified_by TEXT,
  classified_at TEXT,
  next_action TEXT,
  offer_or_placement_id TEXT,
  status TEXT,
  email_normalized TEXT,
  fee_amount REAL,
  currency TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS placements (
  placement_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  shortlist_id TEXT,
  reply_id TEXT,
  canonical_page_url TEXT,
  domain TEXT,
  target_link_url TEXT,
  proposed_headline TEXT,
  proposed_copy TEXT,
  copy_word_count INTEGER,
  placement_position TEXT,
  fee_type TEXT,
  fee_amount REAL,
  currency TEXT,
  page_value_prompts TEXT,
  page_value_model_count INTEGER,
  offer_status TEXT,
  offer_approval_status TEXT,
  offer_approved_by TEXT,
  offer_approved_at TEXT,
  approved_payload_hash TEXT,
  live_status TEXT,
  live_url TEXT,
  live_checked_at TEXT,
  brand_present INTEGER,
  link_present INTEGER,
  dropped_at TEXT,
  payment_status TEXT,
  paid_at TEXT,
  payment_id TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS approvals (
  approval_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  target_table TEXT,
  target_id TEXT,
  payload_hash TEXT,
  payload_json TEXT,
  status TEXT,
  approved_by TEXT,
  approved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(kind, target_id)
);
CREATE TABLE IF NOT EXISTS weekly_reports (
  report_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT NOT NULL,
  week_id TEXT,
  generated_at TEXT,
  status TEXT,
  metrics_json TEXT,
  stalls_json TEXT,
  close_rate_formula_id TEXT,
  dedupe_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
  event_id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  campaign_id TEXT,
  at TEXT,
  actor TEXT,
  action TEXT,
  entity TEXT,
  entity_id TEXT,
  detail_json TEXT
);
"""


def init_db(con):
    con.executescript(SCHEMA_SQL)


def ensure_workspace(cfg, workspace: Path, create: bool):
    workspace = workspace.resolve()
    marker = workspace / MARKER
    if create:
        workspace.mkdir(parents=True, exist_ok=True)
        if marker.is_file():
            existing = marker.read_text(encoding="utf-8").strip()
            if existing != cfg["client_id"]:
                raise EngineError("workspace belongs to another client", 2)
        else:
            marker.write_text(cfg["client_id"] + "\n", encoding="utf-8")
        con = connect(workspace)
        init_db(con)
        con.commit()
        con.close()
        return workspace
    if not marker.is_file():
        raise EngineError(f"workspace not initialized: {workspace}", 2)
    existing = marker.read_text(encoding="utf-8").strip()
    if existing != cfg["client_id"]:
        raise EngineError("workspace belongs to another client", 2)
    return workspace


def ok(command: str, **extra):
    payload = {"ok": True, "command": command}
    payload.update(extra)
    return payload


def row_dict(row) -> dict:
    return {k: row[k] for k in row.keys()}


def count_table(con, name: str) -> int:
    return int(con.execute(f"SELECT COUNT(*) FROM {name}").fetchone()[0])


def draft_payload(row) -> dict:
    return {
        "draft_id": row["draft_id"],
        "subject": row["subject"],
        "body": row["body"],
        "contact_id": row["contact_id"],
        "canonical_page_url": row["canonical_page_url"],
        "cadence_profile_id": row["cadence_profile_id"],
        "sequence_step": row["sequence_step"],
        "target_link_url": row["target_link_url"],
        "email_normalized": row["email_normalized"],
    }


def placement_payload(row) -> dict:
    return {
        "placement_id": row["placement_id"],
        "proposed_headline": row["proposed_headline"],
        "proposed_copy": row["proposed_copy"],
        "fee_amount": row["fee_amount"],
        "currency": row["currency"],
        "canonical_page_url": row["canonical_page_url"],
        "placement_position": row["placement_position"],
        "target_link_url": row["target_link_url"],
    }


def payment_eligible(row) -> bool:
    return (
        row["live_status"] == "live_verified"
        and row["offer_approval_status"] == "approved"
        and (row["payment_status"] or "") != "paid"
        and not row["paid_at"]
    )


def refresh_approvals(con):
    for row in con.execute("SELECT * FROM approvals"):
        valid = False
        if row["kind"] == "send":
            draft = con.execute("SELECT * FROM drafts WHERE draft_id = ?", (row["target_id"],)).fetchone()
            if draft:
                valid = payload_hash(draft_payload(draft)) == row["payload_hash"]
        elif row["kind"] == "offer":
            plc = con.execute("SELECT * FROM placements WHERE placement_id = ?", (row["target_id"],)).fetchone()
            if plc:
                valid = payload_hash(placement_payload(plc)) == row["payload_hash"]
        status = row["status"]
        if row["status"] == "approved" and not valid:
            status = "revoked"
            if row["kind"] == "send":
                con.execute(
                    "UPDATE drafts SET send_approval_status = 'revoked' WHERE draft_id = ?",
                    (row["target_id"],),
                )
            elif row["kind"] == "offer":
                con.execute(
                    "UPDATE placements SET offer_approval_status = 'revoked' WHERE placement_id = ?",
                    (row["target_id"],),
                )
        con.execute(
            "UPDATE approvals SET status = ?, updated_at = ? WHERE approval_id = ?",
            (status, now_iso(), row["approval_id"]),
        )


def dump_tables(con) -> dict:
    refresh_approvals(con)
    con.commit()
    out = {}
    for name in TABLES:
        rows = [row_dict(r) for r in con.execute(f"SELECT * FROM {name}")]
        if name == "placements":
            for row in rows:
                row["payment_eligible"] = payment_eligible(row)
        if name == "approvals":
            for row in rows:
                row["valid"] = row["status"] == "approved"
        out[name] = rows
    return out


def cmd_init(cfg, workspace: Path, _args):
    workspace = ensure_workspace(cfg, workspace, create=True)
    con = connect(workspace)
    emit_event(con, cfg, "init", "workspace", str(workspace))
    con.commit()
    con.close()
    return ok(
        "init",
        client_id=cfg["client_id"],
        campaign_id=cfg["campaign_id"],
        workspace=str(workspace),
        db=str(workspace / DB_NAME),
    )


def probe_connector(name, env_names, cfg) -> dict:
    override = ((cfg.get("connectors") or {}).get(name) or {})
    if isinstance(override, str):
        override = {"status": override}
    claimed = str(override.get("status") or "").upper()
    present = any(os.environ.get(key) for key in env_names)
    if claimed in ALLOWED_STATUSES and claimed != "READY":
        status = claimed
    elif present:
        status = "AUTH_REQUIRED"
    else:
        status = "MISSING"
    if cfg.get("mode") == "offline" and status == "READY":
        status = "MISSING"
    return {"status": status, "env_present": bool(present)}


def cmd_doctor(cfg, workspace: Path, _args):
    connectors = {name: probe_connector(name, envs, cfg) for name, envs in LIVE_CONNECTORS}
    overall = "READY" if cfg.get("mode") == "offline" else "AUTH_REQUIRED"
    if cfg.get("mode") == "live":
        statuses = {c["status"] for c in connectors.values()}
        if "BLOCKED" in statuses:
            overall = "BLOCKED"
        elif "MISSING" in statuses:
            overall = "MISSING"
        else:
            overall = "AUTH_REQUIRED"
    marker_ok = False
    if workspace and (workspace / MARKER).is_file():
        marker_ok = (workspace / MARKER).read_text(encoding="utf-8").strip() == cfg["client_id"]
    return ok(
        "doctor",
        overall=overall,
        mode=cfg.get("mode") or "offline",
        connectors=connectors,
        workspace_ready=marker_ok,
        offline_adapter="READY",
    )


def cmd_import_citations(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    rows = read_rows(Path(args.path))
    con = connect(workspace)
    inserted = 0
    updated = 0
    ts = now_iso()
    for raw in rows:
        url = raw.get("url") or raw.get("canonical_url") or ""
        page_type = raw.get("page_type") or ""
        site_type = raw.get("site_type") or ""
        domain = raw.get("domain") or ""
        status, reason, ptype, site, canon, host = classify_page(
            url, domain, page_type, site_type, cfg["own_domains"]
        )
        model = raw.get("model") or ""
        prompt_id = raw.get("prompt_id") or sha_join(raw.get("prompt") or "")[:12]
        pull_id = raw.get("pull_id") or raw.get("date") or "default"
        key = sha_join(cfg["client_id"], cfg["campaign_id"], pull_id, model, prompt_id, canon)
        citation_id = "u-" + key[:16]
        exists = con.execute("SELECT 1 FROM cited_urls WHERE dedupe_key = ?", (key,)).fetchone()
        con.execute(
            """INSERT INTO cited_urls (
                citation_id, client_id, campaign_id, pull_id, observed_date, model,
                prompt_id, prompt_text, page_title, url_raw, canonical_url, domain,
                source_system, status, exclusion_reason, page_type, site_type,
                dedupe_key, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(dedupe_key) DO UPDATE SET
                page_title=excluded.page_title,
                status=excluded.status,
                exclusion_reason=excluded.exclusion_reason,
                updated_at=excluded.updated_at
            """,
            (
                citation_id,
                cfg["client_id"],
                cfg["campaign_id"],
                pull_id,
                raw.get("date") or raw.get("observed_date") or "",
                model,
                prompt_id,
                raw.get("prompt") or raw.get("prompt_text") or "",
                raw.get("page_title") or "",
                url,
                canon,
                host or host_key(domain),
                raw.get("source_system") or "offline_jsonl",
                status,
                reason,
                ptype,
                site,
                key,
                ts,
                ts,
            ),
        )
        if exists:
            updated += 1
        else:
            inserted += 1
    emit_event(con, cfg, "import-citations", "cited_urls", detail={"inserted": inserted, "updated": updated})
    con.commit()
    total = count_table(con, "cited_urls")
    con.close()
    return ok("import-citations", inserted=inserted, updated=updated, total=total)


def cmd_build_shortlist(cfg, workspace: Path, _args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    con = connect(workspace)
    ts = now_iso()
    pages = con.execute(
        """
        SELECT canonical_url, domain,
               COUNT(*) AS citation_count,
               COUNT(DISTINCT model) AS distinct_model_count,
               COUNT(DISTINCT prompt_id) AS distinct_prompt_count,
               MIN(observed_date) AS first_cited_at,
               MAX(observed_date) AS last_cited_at,
               GROUP_CONCAT(DISTINCT model) AS source_models,
               MAX(page_title) AS page_title,
               MAX(page_type) AS page_type,
               MAX(site_type) AS site_type
        FROM cited_urls
        WHERE client_id = ? AND campaign_id = ? AND status = 'retained'
        GROUP BY canonical_url, domain
        ORDER BY citation_count DESC, distinct_model_count DESC, canonical_url ASC
        """,
        (cfg["client_id"], cfg["campaign_id"]),
    ).fetchall()
    rank = 0
    for page in pages:
        rank += 1
        key = sha_join(cfg["client_id"], cfg["campaign_id"], page["canonical_url"])
        sid = "s-" + key[:16]
        exists = con.execute("SELECT created_at FROM shortlist WHERE dedupe_key = ?", (key,)).fetchone()
        created = exists["created_at"] if exists else ts
        con.execute(
            """INSERT INTO shortlist (
                shortlist_id, client_id, campaign_id, canonical_url, domain, page_title,
                citation_count, distinct_model_count, distinct_prompt_count, first_cited_at,
                last_cited_at, source_models, page_type, site_type, rank, status,
                review_decision, created_at, updated_at, dedupe_key
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(dedupe_key) DO UPDATE SET
                citation_count=excluded.citation_count,
                distinct_model_count=excluded.distinct_model_count,
                distinct_prompt_count=excluded.distinct_prompt_count,
                last_cited_at=excluded.last_cited_at,
                source_models=excluded.source_models,
                rank=excluded.rank,
                updated_at=excluded.updated_at
            """,
            (
                sid,
                cfg["client_id"],
                cfg["campaign_id"],
                page["canonical_url"],
                page["domain"],
                page["page_title"],
                page["citation_count"],
                page["distinct_model_count"],
                page["distinct_prompt_count"],
                page["first_cited_at"],
                page["last_cited_at"],
                page["source_models"],
                page["page_type"],
                page["site_type"],
                rank,
                "candidate",
                "pending",
                created,
                ts,
                key,
            ),
        )
    emit_event(con, cfg, "build-shortlist", "shortlist", detail={"count": rank})
    con.commit()
    total = count_table(con, "shortlist")
    con.close()
    return ok("build-shortlist", count=total)


def lookup_shortlist(con, cfg, url: str, domain: str):
    canon = ""
    try:
        canon = normalize_url(url) if url else ""
    except EngineError:
        canon = url
    row = None
    if canon:
        row = con.execute(
            "SELECT * FROM shortlist WHERE client_id = ? AND canonical_url = ?",
            (cfg["client_id"], canon),
        ).fetchone()
    if row is None and domain:
        row = con.execute(
            "SELECT * FROM shortlist WHERE client_id = ? AND domain = ? ORDER BY citation_count DESC",
            (cfg["client_id"], host_key(domain)),
        ).fetchone()
    return row


def cmd_import_contacts(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    rows = read_rows(Path(args.path))
    con = connect(workspace)
    parsed = []
    dropped_invalid = 0
    for raw in rows:
        email_orig = raw.get("email") or raw.get("email_original") or ""
        email = normalize_email(email_orig)
        zb = (raw.get("zerobounce_status") or "valid").strip().lower()
        if zb == "catch-all":
            zb = "catch_all"
        if not EMAIL_RE.match(email) or zb == "invalid":
            dropped_invalid += 1
            continue
        domain = host_key(raw.get("domain") or (email.split("@", 1)[1] if "@" in email else ""))
        parsed.append(
            {
                "raw": raw,
                "email": email,
                "email_orig": email_orig,
                "domain": domain,
                "generic": is_generic(email),
                "zb": zb,
            }
        )
    selected = []
    dropped_over_cap = 0
    by_domain = {}
    for item in parsed:
        by_domain.setdefault(item["domain"], []).append(item)
    for domain, items in by_domain.items():
        named = [i for i in items if not i["generic"]]
        generic = [i for i in items if i["generic"]]
        chosen = []
        seen_email = set()
        for item in named:
            if item["email"] in seen_email:
                continue
            if len(chosen) >= 5:
                dropped_over_cap += 1
                continue
            chosen.append(item)
            seen_email.add(item["email"])
        if not chosen:
            for item in generic:
                if item["email"] in seen_email:
                    continue
                if len(chosen) >= 2:
                    dropped_over_cap += 1
                    continue
                chosen.append(item)
                seen_email.add(item["email"])
        else:
            dropped_over_cap += len(generic)
        selected.extend(chosen)
    ts = now_iso()
    inserted = 0
    for idx, item in enumerate(selected):
        raw = item["raw"]
        url = raw.get("page_url") or raw.get("canonical_page_url") or ""
        sl = lookup_shortlist(con, cfg, url, item["domain"])
        zb = item["zb"]
        eligible = zb in {"valid", "catch_all"}
        status = "eligible_for_draft" if eligible else "dropped"
        key = sha_join(cfg["client_id"], cfg["campaign_id"], url and normalize_url(url) or "", item["email"])
        cid = "c-" + key[:16]
        exists = con.execute("SELECT 1 FROM contacts WHERE dedupe_key = ?", (key,)).fetchone()
        found_at = raw.get("found_at") or ts
        verified_at = raw.get("verified_at") or (ts if eligible else "")
        con.execute(
            """INSERT INTO contacts (
                contact_id, client_id, campaign_id, shortlist_id, canonical_page_url,
                domain, person_name, role, email_original, email_normalized,
                discovery_source, zerobounce_status, is_generic, priority_rank,
                suppression_status, found_at, verified_at, status, dedupe_key,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(dedupe_key) DO UPDATE SET
                person_name=excluded.person_name,
                role=excluded.role,
                zerobounce_status=excluded.zerobounce_status,
                status=excluded.status,
                updated_at=excluded.updated_at
            """,
            (
                cid,
                cfg["client_id"],
                cfg["campaign_id"],
                sl["shortlist_id"] if sl else "",
                sl["canonical_url"] if sl else (normalize_url(url) if url else ""),
                item["domain"],
                raw.get("person_name") or "",
                raw.get("role") or "",
                item["email_orig"],
                item["email"],
                raw.get("discovery_source") or "",
                zb,
                1 if item["generic"] else 0,
                idx + 1,
                "none",
                found_at,
                verified_at,
                status,
                key,
                found_at,
                ts,
            ),
        )
        if not exists:
            inserted += 1
    emit_event(
        con,
        cfg,
        "import-contacts",
        "contacts",
        detail={"inserted": inserted, "dropped_invalid": dropped_invalid, "dropped_over_cap": dropped_over_cap},
    )
    con.commit()
    total = count_table(con, "contacts")
    con.close()
    return ok(
        "import-contacts",
        inserted=inserted,
        dropped_invalid=dropped_invalid,
        dropped_over_cap=dropped_over_cap,
        total=total,
    )


def pad_words(text: str, minimum: int = 80) -> str:
    extra = (
        " This is a mention request for an existing list, not a guest-post pitch."
        " We will not claim synergy and we will not send fake compliments."
        " Please reply if a mention plus link is possible on the page the models already cite."
    )
    out = text
    while len(out.split()) < minimum:
        out += extra
    return out


def render_draft(cfg, contact, step: int) -> tuple[str, str]:
    brand = cfg.get("brand") or {}
    title = contact["page_title"] or contact["canonical_page_url"]
    name = (contact["person_name"] or "there").split()[0]
    target = brand.get("target_link_url") or ""
    if not target:
        raise EngineError("brand.target_link_url required", 1)
    if urlsplit(normalize_url(target)).path in {"", "/"}:
        raise EngineError("target_link_url must not be a homepage", 1)
    who = brand.get("who_for") or "teams that need a clear mention"
    angle = brand.get("mention_angle") or ""
    brand_name = brand.get("name") or cfg["client_id"]
    if step == 1:
        subject = f"Mention on {title}"
        body = (
            f"{title}\n\n"
            f"Hi {name}, I am writing from {brand_name} about your article {title} "
            f"at {contact['canonical_page_url']}. Could you add a mention plus a link "
            f"in the list you already have? {brand_name} is for {who}. "
            f"The matching page is {target}. Angle: {angle}."
        )
    elif step == 2:
        subject = f"Follow-up: {title}"
        body = (
            f"{title}\n\n"
            f"Hi {name}, following up on the mention ask for {title}. "
            f"{brand_name} is for {who}. Link page: {target}."
        )
    else:
        subject = f"Last note: {title}"
        body = (
            f"{title}\n\n"
            f"Hi {name}, last follow-up on {title}. Mention plus link, not a new article. "
            f"{brand_name} is for {who}. Link page: {target}."
        )
    return subject, pad_words(body)


def cmd_create_drafts(cfg, workspace: Path, _args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    con = connect(workspace)
    existing = [
        r[0]
        for r in con.execute(
            "SELECT DISTINCT cadence_profile_id FROM drafts WHERE client_id = ? AND cadence_profile_id IS NOT NULL AND cadence_profile_id != ''",
            (cfg["client_id"],),
        )
    ]
    cadence = cfg["cadence_profile"]
    if existing and any(c != cadence for c in existing):
        con.close()
        raise EngineError("cadence_profile mix blocked; campaign already uses another profile", 2)
    delays = CADENCES[cadence]
    contacts = con.execute(
        """
        SELECT c.*, s.page_title
        FROM contacts c
        LEFT JOIN shortlist s ON s.shortlist_id = c.shortlist_id
        WHERE c.client_id = ? AND c.campaign_id = ?
          AND c.status = 'eligible_for_draft'
          AND IFNULL(c.suppression_status, 'none') NOT IN ('suppressed', 'bounce')
          AND c.zerobounce_status IN ('valid', 'catch_all')
        """,
        (cfg["client_id"], cfg["campaign_id"]),
    ).fetchall()
    ts = now_iso()
    created = 0
    for contact in contacts:
        for step, delay in enumerate(delays, start=1):
            key = sha_join(
                cfg["client_id"],
                cfg["campaign_id"],
                contact["canonical_page_url"],
                contact["email_normalized"],
                step,
                cadence,
            )
            subject, body = render_draft(cfg, contact, step)
            did = "d-" + key[:16]
            exists = con.execute("SELECT 1 FROM drafts WHERE dedupe_key = ?", (key,)).fetchone()
            con.execute(
                """INSERT INTO drafts (
                    draft_id, client_id, campaign_id, shortlist_id, contact_id,
                    canonical_page_url, domain, article_title_exact, target_link_url,
                    mention_angle, sequence_step, cadence_profile_id, planned_delay_days,
                    subject, body, word_count, status, send_approval_status, sent_at,
                    email_normalized, dedupe_key, created_at, updated_at, approved_payload_hash
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(dedupe_key) DO UPDATE SET
                    subject=excluded.subject,
                    body=excluded.body,
                    word_count=excluded.word_count,
                    updated_at=excluded.updated_at
                """,
                (
                    did,
                    cfg["client_id"],
                    cfg["campaign_id"],
                    contact["shortlist_id"],
                    contact["contact_id"],
                    contact["canonical_page_url"],
                    contact["domain"],
                    contact["page_title"] or "",
                    (cfg.get("brand") or {}).get("target_link_url") or "",
                    (cfg.get("brand") or {}).get("mention_angle") or "",
                    step,
                    cadence,
                    delay,
                    subject,
                    body,
                    len(body.split()),
                    "drafted",
                    "pending",
                    None,
                    contact["email_normalized"],
                    key,
                    ts,
                    ts,
                    "",
                ),
            )
            if not exists:
                created += 1
    emit_event(con, cfg, "create-drafts", "drafts", detail={"created": created})
    con.commit()
    total = count_table(con, "drafts")
    con.close()
    return ok("create-drafts", created=created, total=total, sent=0)


def cmd_import_replies(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    rows = read_rows(Path(args.path))
    con = connect(workspace)
    ts = now_iso()
    inserted = 0
    for raw in rows:
        email = normalize_email(raw.get("email") or "")
        msg_id = raw.get("smartlead_message_id") or ""
        received = raw.get("received_at") or ts
        body = raw.get("body") or ""
        classification = (raw.get("classification") or "").strip().lower()
        key = sha_join(cfg["client_id"], cfg["campaign_id"], msg_id or "", email, received, sha_join(body)[:12])
        contact = None
        if email:
            contact = con.execute(
                "SELECT * FROM contacts WHERE client_id = ? AND email_normalized = ?",
                (cfg["client_id"], email),
            ).fetchone()
        status = "classified" if classification else "received_unclassified"
        next_action = ""
        if classification == "bounce":
            next_action = "route_finder_suppress"
            status = "suppressed"
            if contact:
                con.execute(
                    """UPDATE contacts SET suppression_status = 'suppressed', status = 'bounced', updated_at = ?
                       WHERE contact_id = ?""",
                    (ts, contact["contact_id"]),
                )
                con.execute(
                    """UPDATE drafts SET status = 'suppressed', updated_at = ?
                       WHERE contact_id = ? AND sent_at IS NULL""",
                    (ts, contact["contact_id"]),
                )
        elif classification in {"interested_blurb", "interested_fee"}:
            next_action = "propose_placement"
        elif classification == "not_fit":
            next_action = "close"
        elif classification == "wrong_person":
            next_action = "ask_correct_person"
        elif classification == "out_of_office":
            next_action = "waiting"
        rid = "r-" + key[:16]
        exists = con.execute("SELECT 1 FROM replies WHERE dedupe_key = ?", (key,)).fetchone()
        con.execute(
            """INSERT INTO replies (
                reply_id, client_id, campaign_id, smartlead_message_id, thread_id,
                contact_id, domain, sequence_id, received_at, body_ref_or_hash,
                classification, classified_by, classified_at, next_action,
                offer_or_placement_id, status, email_normalized, fee_amount, currency,
                dedupe_key, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(dedupe_key) DO UPDATE SET
                classification=excluded.classification,
                status=excluded.status,
                next_action=excluded.next_action,
                updated_at=excluded.updated_at
            """,
            (
                rid,
                cfg["client_id"],
                cfg["campaign_id"],
                msg_id,
                raw.get("thread_id") or "",
                contact["contact_id"] if contact else "",
                host_key(raw.get("domain") or (contact["domain"] if contact else "")),
                raw.get("sequence_id") or "",
                received,
                sha_join(body),
                classification,
                "import" if classification else "",
                ts if classification else "",
                next_action,
                "",
                status,
                email,
                float(raw["fee_amount"]) if raw.get("fee_amount") not in (None, "") else None,
                raw.get("currency") or "",
                key,
                received,
                ts,
            ),
        )
        if not exists:
            inserted += 1
    emit_event(con, cfg, "import-replies", "replies", detail={"inserted": inserted})
    con.commit()
    total = count_table(con, "replies")
    con.close()
    return ok("import-replies", inserted=inserted, total=total)


def mention_copy(cfg, page_title: str) -> tuple[str, str]:
    brand = cfg.get("brand") or {}
    headline = f"{brand.get('name') or cfg['client_id']} for teams that need a mention"
    copy = pad_words(
        f"{headline}. {brand.get('name') or cfg['client_id']} is for {brand.get('who_for') or 'operators'}. "
        f"It fits articles such as {page_title}. Angle: {brand.get('mention_angle') or ''}. "
        f"Link the comparison page rather than the homepage.",
        60,
    )
    return headline, copy


def cmd_propose_placement(cfg, workspace: Path, _args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    con = connect(workspace)
    ts = now_iso()
    replies = con.execute(
        """SELECT * FROM replies WHERE client_id = ? AND campaign_id = ?
           AND classification IN ('interested_blurb', 'interested_fee')""",
        (cfg["client_id"], cfg["campaign_id"]),
    ).fetchall()
    created = 0
    for reply in replies:
        contact = None
        if reply["contact_id"]:
            contact = con.execute("SELECT * FROM contacts WHERE contact_id = ?", (reply["contact_id"],)).fetchone()
        url = contact["canonical_page_url"] if contact else ""
        sl = lookup_shortlist(con, cfg, url, reply["domain"])
        canon = sl["canonical_url"] if sl else url
        headline, copy = mention_copy(cfg, sl["page_title"] if sl else canon)
        fee_type = "fee" if reply["classification"] == "interested_fee" else "none"
        fee_amount = reply["fee_amount"] if fee_type == "fee" else 0
        key = sha_join(cfg["client_id"], cfg["campaign_id"], reply["reply_id"], canon, payload_hash({"copy": copy}))
        pid = "p-" + key[:16]
        exists = con.execute("SELECT 1 FROM placements WHERE dedupe_key = ?", (key,)).fetchone()
        models = sl["distinct_model_count"] if sl else 0
        con.execute(
            """INSERT INTO placements (
                placement_id, client_id, campaign_id, shortlist_id, reply_id,
                canonical_page_url, domain, target_link_url, proposed_headline,
                proposed_copy, copy_word_count, placement_position, fee_type,
                fee_amount, currency, page_value_prompts, page_value_model_count,
                offer_status, offer_approval_status, live_status, payment_status,
                dedupe_key, created_at, updated_at, approved_payload_hash
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(dedupe_key) DO UPDATE SET updated_at=excluded.updated_at
            """,
            (
                pid,
                cfg["client_id"],
                cfg["campaign_id"],
                sl["shortlist_id"] if sl else "",
                reply["reply_id"],
                canon,
                reply["domain"],
                (cfg.get("brand") or {}).get("target_link_url") or "",
                headline,
                copy,
                len(copy.split()),
                "in the alternatives section",
                fee_type,
                fee_amount or 0,
                reply["currency"] or "USD",
                sl["source_models"] if sl else "",
                models,
                "proposed",
                "pending",
                "not_started",
                "not_due",
                key,
                ts,
                ts,
                "",
            ),
        )
        con.execute(
            "UPDATE replies SET offer_or_placement_id = ?, status = 'action_drafted', updated_at = ? WHERE reply_id = ?",
            (pid, ts, reply["reply_id"]),
        )
        if not exists:
            created += 1
    emit_event(con, cfg, "propose-placement", "placements", detail={"created": created})
    con.commit()
    total = count_table(con, "placements")
    con.close()
    return ok("propose-placement", created=created, total=total)


def cmd_approve(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    kind = args.kind
    if kind not in {"send", "offer"}:
        raise EngineError("approve kind must be send or offer (payment unimplemented)", 1)
    if kind == "payment":
        raise EngineError("payment unimplemented", 2)
    target_id = args.id
    by = args.by or "human"
    con = connect(workspace)
    ts = now_iso()
    if kind == "send":
        row = con.execute("SELECT * FROM drafts WHERE draft_id = ?", (target_id,)).fetchone()
        if row is None:
            con.close()
            raise EngineError("draft not found", 1)
        payload = draft_payload(row)
        table = "drafts"
        con.execute(
            """UPDATE drafts SET send_approval_status = 'approved', send_approved_by = ?,
               send_approved_at = ?, approved_payload_hash = ?, updated_at = ?
               WHERE draft_id = ?""",
            (by, ts, payload_hash(payload), ts, target_id),
        )
    else:
        row = con.execute("SELECT * FROM placements WHERE placement_id = ?", (target_id,)).fetchone()
        if row is None:
            con.close()
            raise EngineError("placement not found", 1)
        payload = placement_payload(row)
        table = "placements"
        con.execute(
            """UPDATE placements SET offer_approval_status = 'approved', offer_status = 'approved_reserved',
               offer_approved_by = ?, offer_approved_at = ?, approved_payload_hash = ?,
               payment_status = 'reserved', updated_at = ?
               WHERE placement_id = ?""",
            (by, ts, payload_hash(payload), ts, target_id),
        )
    digest = payload_hash(payload)
    aid = "a-" + sha_join(cfg["client_id"], kind, target_id)[:16]
    con.execute(
        """INSERT INTO approvals (
            approval_id, client_id, campaign_id, kind, target_table, target_id,
            payload_hash, payload_json, status, approved_by, approved_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'approved', ?, ?, ?, ?)
        ON CONFLICT(kind, target_id) DO UPDATE SET
            payload_hash=excluded.payload_hash,
            payload_json=excluded.payload_json,
            status='approved',
            approved_by=excluded.approved_by,
            approved_at=excluded.approved_at,
            updated_at=excluded.updated_at
        """,
        (
            aid,
            cfg["client_id"],
            cfg["campaign_id"],
            kind,
            table,
            target_id,
            digest,
            canonical_json(payload),
            by,
            ts,
            ts,
            ts,
        ),
    )
    emit_event(con, cfg, "approve", table, target_id, {"kind": kind, "by": by})
    con.commit()
    con.close()
    return ok("approve", kind=kind, id=target_id, payload_hash=digest, sent=False, paid=False)


def cmd_verify_placement(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    con = connect(workspace)
    row = con.execute("SELECT * FROM placements WHERE placement_id = ?", (args.id,)).fetchone()
    if row is None:
        con.close()
        raise EngineError("placement not found", 1)
    ts = now_iso()
    brand = bool(args.brand_present)
    link = bool(args.link_present)
    if brand and link:
        live_status = "live_verified"
        payment_status = "eligible_after_live" if row["offer_approval_status"] == "approved" else "not_due"
    else:
        live_status = "not_live"
        payment_status = "blocked"
    con.execute(
        """UPDATE placements SET live_status = ?, live_url = ?, live_checked_at = ?,
           brand_present = ?, link_present = ?, payment_status = ?, updated_at = ?
           WHERE placement_id = ?""",
        (
            live_status,
            args.live_url or row["canonical_page_url"],
            ts,
            1 if brand else 0,
            1 if link else 0,
            payment_status,
            ts,
            args.id,
        ),
    )
    emit_event(con, cfg, "verify-placement", "placements", args.id, {"live_status": live_status})
    con.commit()
    row = con.execute("SELECT * FROM placements WHERE placement_id = ?", (args.id,)).fetchone()
    out = row_dict(row)
    out["payment_eligible"] = payment_eligible(out)
    con.close()
    return ok("verify-placement", placement=out)


def age_hours(ts: str, as_of: datetime) -> float:
    if not ts:
        return 0.0
    try:
        return (as_of - parse_iso(ts)).total_seconds() / 3600.0
    except ValueError:
        return 0.0


def cmd_weekly_report(cfg, workspace: Path, args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    formula = cfg.get("close_rate_formula_id")
    if not formula:
        raise EngineError("close_rate_formula_id required before weekly-report", 2)
    as_of = parse_iso(args.as_of) if args.as_of else datetime.now(timezone.utc)
    con = connect(workspace)
    stalls = []
    for sl in con.execute("SELECT * FROM shortlist WHERE client_id = ?", (cfg["client_id"],)):
        contacts = con.execute(
            "SELECT COUNT(*) FROM contacts WHERE shortlist_id = ? OR canonical_page_url = ?",
            (sl["shortlist_id"], sl["canonical_url"]),
        ).fetchone()[0]
        if contacts == 0 and age_hours(sl["created_at"], as_of) > 48:
            stalls.append(
                {
                    "rule": "shortlist_without_contact_48h",
                    "entity_id": sl["shortlist_id"],
                    "age_hours": age_hours(sl["created_at"], as_of),
                }
            )
    for c in con.execute(
        "SELECT * FROM contacts WHERE client_id = ? AND status = 'eligible_for_draft'",
        (cfg["client_id"],),
    ):
        drafts = con.execute("SELECT COUNT(*) FROM drafts WHERE contact_id = ?", (c["contact_id"],)).fetchone()[0]
        stamp = c["verified_at"] or c["created_at"]
        if drafts == 0 and age_hours(stamp, as_of) > 48:
            stalls.append(
                {
                    "rule": "verified_contact_without_draft_48h",
                    "entity_id": c["contact_id"],
                    "age_hours": age_hours(stamp, as_of),
                }
            )
    for d in con.execute("SELECT * FROM drafts WHERE client_id = ? AND sent_at IS NULL", (cfg["client_id"],)):
        if d["status"] != "sent" and age_hours(d["created_at"], as_of) > 48:
            stalls.append(
                {
                    "rule": "unsent_draft_48h",
                    "entity_id": d["draft_id"],
                    "age_hours": age_hours(d["created_at"], as_of),
                }
            )
    for r in con.execute("SELECT * FROM replies WHERE client_id = ?", (cfg["client_id"],)):
        unclassified = (not r["classification"]) or r["status"] == "received_unclassified"
        if unclassified and age_hours(r["received_at"] or r["created_at"], as_of) > 24:
            stalls.append(
                {
                    "rule": "unclassified_reply_24h",
                    "entity_id": r["reply_id"],
                    "age_hours": age_hours(r["received_at"] or r["created_at"], as_of),
                }
            )
    for p in con.execute("SELECT * FROM placements WHERE client_id = ? AND live_status = 'dropped'", (cfg["client_id"],)):
        stalls.append({"rule": "live_mention_dropped", "entity_id": p["placement_id"], "age_hours": 0})
    classes = [
        "interested_blurb",
        "interested_fee",
        "not_fit",
        "wrong_person",
        "out_of_office",
        "existing_relationship",
        "bounce",
    ]
    replies_by_type = {k: 0 for k in classes}
    for row in con.execute("SELECT classification, COUNT(*) AS n FROM replies WHERE client_id = ? GROUP BY classification", (cfg["client_id"],)):
        if row["classification"] in replies_by_type:
            replies_by_type[row["classification"]] = row["n"]
    shortlisted = count_table(con, "shortlist")
    contacts_found = count_table(con, "contacts")
    contacts_verified = con.execute(
        "SELECT COUNT(*) FROM contacts WHERE client_id = ? AND zerobounce_status IN ('valid', 'catch_all')",
        (cfg["client_id"],),
    ).fetchone()[0]
    drafts_queued = con.execute(
        "SELECT COUNT(*) FROM drafts WHERE client_id = ? AND sent_at IS NULL",
        (cfg["client_id"],),
    ).fetchone()[0]
    live = con.execute(
        "SELECT COUNT(*) FROM placements WHERE client_id = ? AND live_status = 'live_verified'",
        (cfg["client_id"],),
    ).fetchone()[0]
    spend = con.execute(
        """SELECT COALESCE(SUM(fee_amount), 0) FROM placements
           WHERE client_id = ? AND offer_approval_status = 'approved'""",
        (cfg["client_id"],),
    ).fetchone()[0]
    numerator = live
    denominator = shortlisted
    close_rate = (numerator / denominator) if denominator else None
    iso = as_of.isocalendar()
    week_id = f"{iso.year}-W{iso.week:02d}"
    metrics = {
        "mentions_live_total": live,
        "shortlisted_pages": shortlisted,
        "contacts_found": contacts_found,
        "contacts_verified": contacts_verified,
        "drafts_queued": drafts_queued,
        "replies_by_type": replies_by_type,
        "spend_committed_approved_fees": spend,
        "close_rate_numerator": numerator,
        "close_rate_denominator": denominator,
        "close_rate": close_rate,
        "close_rate_formula_id": formula,
    }
    key = sha_join(cfg["client_id"], cfg["campaign_id"], week_id, "0")
    rid = "w-" + key[:16]
    ts = now_iso()
    con.execute(
        """INSERT INTO weekly_reports (
            report_id, client_id, campaign_id, week_id, generated_at, status,
            metrics_json, stalls_json, close_rate_formula_id, dedupe_key, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'digest_written', ?, ?, ?, ?, ?, ?)
        ON CONFLICT(dedupe_key) DO UPDATE SET
            metrics_json=excluded.metrics_json,
            stalls_json=excluded.stalls_json,
            generated_at=excluded.generated_at,
            updated_at=excluded.updated_at
        """,
        (
            rid,
            cfg["client_id"],
            cfg["campaign_id"],
            week_id,
            ts,
            canonical_json(metrics),
            canonical_json(stalls),
            formula,
            key,
            ts,
            ts,
        ),
    )
    emit_event(con, cfg, "weekly-report", "weekly_reports", rid)
    con.commit()
    con.close()
    return ok("weekly-report", week_id=week_id, metrics=metrics, stalls=stalls)


def cmd_export(cfg, workspace: Path, _args):
    workspace = ensure_workspace(cfg, workspace, create=False)
    con = connect(workspace)
    tables = dump_tables(con)
    con.close()
    return ok("export", client_id=cfg["client_id"], db=str(workspace / DB_NAME), tables=tables)


def snapshot_counts(con) -> dict:
    return {
        "cited_urls": count_table(con, "cited_urls"),
        "shortlist": count_table(con, "shortlist"),
        "contacts": count_table(con, "contacts"),
        "drafts": count_table(con, "drafts"),
        "replies": count_table(con, "replies"),
        "placements": count_table(con, "placements"),
    }


def run_pipeline(cfg, workspace: Path):
    fixtures = cfg.get("fixtures") or {}
    cites = fixtures.get("citations")
    contacts = fixtures.get("contacts")
    replies = fixtures.get("replies")
    if not cites:
        raise EngineError("demo fixtures.citations missing", 1)
    ns = argparse.Namespace
    cmd_import_citations(cfg, workspace, ns(path=cites))
    cmd_build_shortlist(cfg, workspace, ns())
    if contacts:
        cmd_import_contacts(cfg, workspace, ns(path=contacts))
        cmd_create_drafts(cfg, workspace, ns())
    if replies:
        cmd_import_replies(cfg, workspace, ns(path=replies))
        cmd_propose_placement(cfg, workspace, ns())
    cmd_weekly_report(cfg, workspace, ns(as_of=None))


def cmd_demo(cfg, workspace: Path, args):
    if args.workspace:
        ws = ensure_workspace(cfg, workspace, create=True)
        cleanup = None
    else:
        import tempfile

        cleanup = tempfile.TemporaryDirectory()
        ws = ensure_workspace(cfg, Path(cleanup.name) / "ws", create=True)
    cmd_init(cfg, ws, args)
    run_pipeline(cfg, ws)
    con = connect(ws)
    first = snapshot_counts(con)
    con.close()
    run_pipeline(cfg, ws)
    con = connect(ws)
    second = snapshot_counts(con)
    con.close()
    idempotent = first == second
    result = ok(
        "demo",
        client_id=cfg["client_id"],
        workspace=str(ws),
        first=first,
        second=second,
        idempotent=idempotent,
        network_calls=0,
    )
    if cleanup is not None:
        cleanup.cleanup()
    if not idempotent:
        raise EngineError("demo was not idempotent", 3)
    return result


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="citation_outreach.py",
        description="Citation outreach engine. Never sends, publishes, or pays.",
        epilog=(
            "Exit codes:\n"
            "  0  success\n"
            "  1  usage or validation error\n"
            "  2  blocked (tenant, connector, cadence mix, human-gate, invalid approval, BLOCKED_TARGET_PAGES)\n"
            "  3  internal error\n"
            "JSON is written to stdout for automation. The engine never sends, publishes, or pays."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--config", required=False, help="client config JSON")
    parser.add_argument("--workspace", required=False, help="tenant workspace directory")
    parser.add_argument("--json", action="store_true", default=True, help="JSON output (default)")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("init", help="create tenant workspace and sqlite state")
    sub.add_parser("doctor", help="fail-closed connector status, no secret values")
    p = sub.add_parser("import-citations", help="JSONL/CSV cited URL import")
    p.add_argument("path")
    sub.add_parser("build-shortlist", help="editorial shortlist from retained citations")
    p = sub.add_parser("import-contacts", help="JSONL/CSV contacts; max 5 per domain")
    p.add_argument("path")
    sub.add_parser("create-drafts", help="write drafts only; never send")
    p = sub.add_parser("import-replies", help="JSONL/CSV replies; bounce suppresses")
    p.add_argument("path")
    sub.add_parser("propose-placement", help="draft offer card; never pay")
    p = sub.add_parser("approve", help="hash-bound human approval for send or offer")
    p.add_argument("--kind", required=True, choices=("send", "offer"))
    p.add_argument("--id", required=True)
    p.add_argument("--by", required=True)
    p = sub.add_parser("verify-placement", help="record live QA; no network")
    p.add_argument("--id", required=True)
    p.add_argument("--live-url", default="")
    p.add_argument("--brand-present", action="store_true")
    p.add_argument("--link-present", action="store_true")
    p = sub.add_parser("weekly-report", help="rollup plus stalls")
    p.add_argument("--as-of", default="")
    sub.add_parser("export", help="JSON dump of tenant tables")
    sub.add_parser("demo", help="temp workspace, fixtures twice, prove idempotency")
    return parser


COMMANDS = {
    "init": cmd_init,
    "doctor": cmd_doctor,
    "import-citations": cmd_import_citations,
    "build-shortlist": cmd_build_shortlist,
    "import-contacts": cmd_import_contacts,
    "create-drafts": cmd_create_drafts,
    "import-replies": cmd_import_replies,
    "propose-placement": cmd_propose_placement,
    "approve": cmd_approve,
    "verify-placement": cmd_verify_placement,
    "weekly-report": cmd_weekly_report,
    "export": cmd_export,
    "demo": cmd_demo,
}


def main(argv=None) -> int:
    argv = sys.argv[1:] if argv is None else list(argv)
    argv = normalize_argv(argv)
    parser = build_parser()
    try:
        args = parser.parse_args(argv)
    except SystemExit as exc:
        code = exc.code
        if code in (None, 0):
            return 0
        return 1
    if not args.command:
        parser.print_help()
        return 1
    if not args.config:
        print(json.dumps({"ok": False, "error": "--config is required", "code": 1}))
        return 1
    try:
        cfg = load_config(Path(args.config))
        workspace = Path(args.workspace or cfg.get("workspace") or Path(args.config).resolve().parent / "workspace")
        result = COMMANDS[args.command](cfg, workspace, args)
        print(json.dumps(result, ensure_ascii=True, default=str))
        return 0
    except EngineError as exc:
        print(json.dumps({"ok": False, "error": str(exc), "code": exc.code}))
        return exc.code
    except Exception as exc:
        print(json.dumps({"ok": False, "error": str(exc), "code": 3}))
        return 3


if __name__ == "__main__":
    sys.exit(main())
