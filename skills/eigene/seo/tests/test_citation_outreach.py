#!/usr/bin/env python3
"""Test-first gate for the citation-outreach engine (stdlib unittest)."""

from __future__ import annotations

import contextlib
import importlib.util
import io
import json
import sqlite3
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "citation_outreach.py"
SCHEMA = ROOT / "references" / "citation-outreach" / "pipeline.schema.json"


def load_engine():
    spec = importlib.util.spec_from_file_location("citation_outreach", SCRIPT)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


ENGINE = load_engine()


def write_json(path: Path, data) -> Path:
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return path


def write_jsonl(path: Path, rows) -> Path:
    path.write_text("".join(json.dumps(row) + "\n" for row in rows), encoding="utf-8")
    return path


def parse_stdout(text: str):
    text = text.strip()
    if not text:
        return {}
    return json.loads(text.splitlines()[-1] if text.splitlines()[-1].startswith("{") else text)


class EngineCase(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.dir = Path(self.tmp.name)
        self.client = "acme"
        self.workspace = self.dir / "ws"
        self.config_path = self.dir / "config.json"
        write_json(self.config_path, self._config())

    def tearDown(self):
        self.tmp.cleanup()

    def _config(self, **overrides):
        cfg = {
            "schema_version": 1,
            "client_id": self.client,
            "campaign_id": "camp-acme",
            "cadence_profile": "prompt_4_9",
            "mode": "offline",
            "own_domains": ["acme.example"],
            "close_rate_formula_id": "live_placements_over_shortlist",
            "brand": {
                "name": "Acme",
                "who_for": "small teams that need a simple CRM",
                "target_link_url": "https://acme.example/compare/crm",
                "mention_angle": "best for non-designers on a team",
                "do_not_say": ["synergy"],
            },
            "connectors": {},
        }
        cfg.update(overrides)
        return cfg

    def run_cli(self, *args, config=None, workspace=None):
        argv = [
            "--config",
            str(config or self.config_path),
            "--workspace",
            str(workspace or self.workspace),
            *args,
        ]
        buf = io.StringIO()
        err = io.StringIO()
        with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(err):
            code = ENGINE.main(argv)
        out = buf.getvalue()
        try:
            data = json.loads(out) if out.strip() else {}
        except json.JSONDecodeError:
            data = {"_raw": out}
        return code, data, err.getvalue()

    def init_ws(self):
        code, data, err = self.run_cli("init")
        self.assertEqual(code, 0, err or data)
        return data

    def db(self):
        return sqlite3.connect(self.workspace / "citation_outreach.sqlite")

    def export(self):
        code, data, err = self.run_cli("export")
        self.assertEqual(code, 0, err or data)
        return data

    def seed_editorial(self, extra=()):
        rows = [
            {
                "date": "2026-08-03",
                "model": "ChatGPT",
                "prompt": "best crm for small teams",
                "prompt_id": "p1",
                "page_title": "12 CRMs for small teams",
                "url": "https://Blog.Example.com/blog/best-crms#top",
                "domain": "blog.example.com",
                "page_type": "listicle",
                "site_type": "blog",
            },
            {
                "date": "2026-08-03",
                "model": "Perplexity",
                "prompt": "best crm for small teams",
                "prompt_id": "p1",
                "page_title": "12 CRMs for small teams",
                "url": "https://blog.example.com/blog/best-crms",
                "domain": "blog.example.com",
                "page_type": "listicle",
                "site_type": "blog",
            },
        ]
        rows.extend(extra)
        path = self.dir / "citations.jsonl"
        write_jsonl(path, rows)
        return path


class InitAndTenantTests(EngineCase):
    def test_init(self):
        data = self.init_ws()
        self.assertTrue(data.get("ok"))
        self.assertEqual(data.get("client_id"), "acme")
        db = self.workspace / "citation_outreach.sqlite"
        self.assertTrue(db.is_file())
        con = sqlite3.connect(db)
        names = {row[0] for row in con.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        con.close()
        for table in (
            "cited_urls",
            "shortlist",
            "contacts",
            "drafts",
            "replies",
            "placements",
            "approvals",
            "weekly_reports",
            "events",
        ):
            self.assertIn(table, names)
        self.assertTrue((self.workspace / ".citation-outreach-client").is_file())

    def test_tenant_isolation(self):
        self.init_ws()
        other_ws = self.dir / "ws-b"
        other_cfg = self.dir / "b.json"
        write_json(
            other_cfg,
            self._config(client_id="beta", campaign_id="camp-beta"),
        )
        code, data, err = self.run_cli("init", config=other_cfg, workspace=other_ws)
        self.assertEqual(code, 0, err or data)
        cites = self.seed_editorial()
        code, data, err = self.run_cli("import-citations", str(cites))
        self.assertEqual(code, 0, err or data)
        code, exp_a, err = self.run_cli("export")
        self.assertEqual(code, 0, err)
        code, exp_b, err = self.run_cli("export", config=other_cfg, workspace=other_ws)
        self.assertEqual(code, 0, err)
        self.assertGreater(len(exp_a["tables"]["cited_urls"]), 0)
        self.assertEqual(len(exp_b["tables"]["cited_urls"]), 0)
        # foreign config against this workspace is blocked
        code, data, err = self.run_cli("export", config=other_cfg, workspace=self.workspace)
        self.assertEqual(code, 2)
        self.assertFalse(data.get("ok"))


class CitationAndShortlistTests(EngineCase):
    def test_citation_dedupe(self):
        self.init_ws()
        path = self.seed_editorial()
        code, first, err = self.run_cli("import-citations", str(path))
        self.assertEqual(code, 0, err or first)
        code, second, err = self.run_cli("import-citations", str(path))
        self.assertEqual(code, 0, err or second)
        exp = self.export()
        urls = exp["tables"]["cited_urls"]
        self.assertEqual(len(urls), 2, "same file twice plus URL-normalization must not duplicate")
        keys = {row["dedupe_key"] for row in urls}
        self.assertEqual(len(keys), 2)
        canons = {row["canonical_url"] for row in urls}
        self.assertEqual(canons, {"https://blog.example.com/blog/best-crms"})

    def test_shortlist_exclusion(self):
        self.init_ws()
        extra = [
            {
                "date": "2026-08-03",
                "model": "ChatGPT",
                "prompt": "best crm",
                "prompt_id": "p1",
                "page_title": "reddit thread",
                "url": "https://www.reddit.com/r/crm/comments/abc",
                "domain": "reddit.com",
                "page_type": "thread",
                "site_type": "social",
            },
            {
                "date": "2026-08-03",
                "model": "Grok",
                "prompt": "best crm",
                "prompt_id": "p1",
                "page_title": "G2 CRM category",
                "url": "https://www.g2.com/categories/crm",
                "domain": "g2.com",
                "page_type": "directory",
                "site_type": "review",
            },
            {
                "date": "2026-08-03",
                "model": "Gemini",
                "prompt": "best crm",
                "prompt_id": "p1",
                "page_title": "Vendor home",
                "url": "https://other.example/",
                "domain": "other.example",
                "page_type": "homepage",
                "site_type": "marketing",
            },
            {
                "date": "2026-08-03",
                "model": "ChatGPT",
                "prompt": "best crm",
                "prompt_id": "p1",
                "page_title": "Our compare page",
                "url": "https://acme.example/compare/crm",
                "domain": "acme.example",
                "page_type": "comparison",
                "site_type": "blog",
            },
        ]
        path = self.seed_editorial(extra)
        self.assertEqual(self.run_cli("import-citations", str(path))[0], 0)
        code, data, err = self.run_cli("build-shortlist")
        self.assertEqual(code, 0, err or data)
        exp = self.export()
        pages = exp["tables"]["shortlist"]
        self.assertEqual(len(pages), 1)
        self.assertEqual(pages[0]["canonical_url"], "https://blog.example.com/blog/best-crms")
        self.assertGreaterEqual(pages[0]["citation_count"], 2)
        cited = exp["tables"]["cited_urls"]
        excluded = {row["canonical_url"]: row["exclusion_reason"] for row in cited if row["status"] == "excluded"}
        self.assertTrue(any("reddit.com" in url for url in excluded))
        self.assertTrue(any("g2.com" in url for url in excluded))
        self.assertTrue(any(url.rstrip("/") == "https://other.example" or url.endswith("other.example/") or "other.example" in url for url in excluded))
        self.assertTrue(any("acme.example" in url for url in excluded))


class ContactDraftApprovalTests(EngineCase):
    def _ready_shortlist(self):
        self.init_ws()
        path = self.seed_editorial()
        self.assertEqual(self.run_cli("import-citations", str(path))[0], 0)
        self.assertEqual(self.run_cli("build-shortlist")[0], 0)

    def test_max5_contacts(self):
        self._ready_shortlist()
        rows = []
        for i in range(6):
            rows.append(
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": f"Editor {i}",
                    "role": "editor",
                    "email": f"editor{i}@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            )
        path = write_jsonl(self.dir / "contacts.jsonl", rows)
        code, data, err = self.run_cli("import-contacts", str(path))
        self.assertEqual(code, 0, err or data)
        contacts = self.export()["tables"]["contacts"]
        active = [c for c in contacts if c["status"] != "dropped"]
        self.assertEqual(len(active), 5)
        self.assertEqual(data.get("dropped_over_cap"), 1)

    def test_invalid_email_drop(self):
        self._ready_shortlist()
        rows = [
            {
                "page_url": "https://blog.example.com/blog/best-crms",
                "domain": "blog.example.com",
                "person_name": "Bad Mail",
                "role": "editor",
                "email": "not-an-email",
                "discovery_source": "Hunter",
                "zerobounce_status": "valid",
            },
            {
                "page_url": "https://blog.example.com/blog/best-crms",
                "domain": "blog.example.com",
                "person_name": "Invalid ZB",
                "role": "editor",
                "email": "dead@blog.example.com",
                "discovery_source": "Hunter",
                "zerobounce_status": "invalid",
            },
            {
                "page_url": "https://blog.example.com/blog/best-crms",
                "domain": "blog.example.com",
                "person_name": "Good",
                "role": "editor",
                "email": "good@blog.example.com",
                "discovery_source": "Hunter",
                "zerobounce_status": "catch_all",
            },
        ]
        path = write_jsonl(self.dir / "contacts.jsonl", rows)
        code, data, err = self.run_cli("import-contacts", str(path))
        self.assertEqual(code, 0, err or data)
        contacts = self.export()["tables"]["contacts"]
        emails = {c["email_normalized"] for c in contacts if c["status"] != "dropped"}
        self.assertEqual(emails, {"good@blog.example.com"})
        self.assertGreaterEqual(data.get("dropped_invalid"), 2)

    def test_draft_no_send(self):
        self._ready_shortlist()
        path = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(path))[0], 0)
        code, data, err = self.run_cli("create-drafts")
        self.assertEqual(code, 0, err or data)
        drafts = self.export()["tables"]["drafts"]
        self.assertEqual(len(drafts), 3)
        for draft in drafts:
            self.assertIsNone(draft["sent_at"])
            self.assertNotEqual(draft["status"], "sent")
            self.assertEqual(draft["cadence_profile_id"], "prompt_4_9")
            self.assertIn(draft["planned_delay_days"], (0, 4, 9))
        src = SCRIPT.read_text(encoding="utf-8")
        self.assertNotIn("def send(", src)
        self.assertNotIn("smtplib", src)
        self.assertNotIn("urllib.request", src)
        self.assertNotRegex(src, r"def\s+pay\(")
        self.assertNotIn("credit_card", src)

    def test_approval_hash_invalidation(self):
        self._ready_shortlist()
        path = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(path))[0], 0)
        self.assertEqual(self.run_cli("create-drafts")[0], 0)
        draft = self.export()["tables"]["drafts"][0]
        code, data, err = self.run_cli(
            "approve", "--kind", "send", "--id", draft["draft_id"], "--by", "raphael"
        )
        self.assertEqual(code, 0, err or data)
        self.assertTrue(data.get("ok"))
        approvals = self.export()["tables"]["approvals"]
        self.assertEqual(len(approvals), 1)
        self.assertEqual(approvals[0]["status"], "approved")
        self.assertTrue(approvals[0]["valid"])
        con = self.db()
        con.execute("UPDATE drafts SET body = body || ' MUTATED' WHERE draft_id = ?", (draft["draft_id"],))
        con.commit()
        con.close()
        exp = self.export()
        invalidated = [a for a in exp["tables"]["approvals"] if a["target_id"] == draft["draft_id"]]
        self.assertEqual(len(invalidated), 1)
        self.assertFalse(invalidated[0]["valid"])
        self.assertEqual(invalidated[0]["status"], "revoked")

    def test_bounce_suppression(self):
        self._ready_shortlist()
        path = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(path))[0], 0)
        replies = write_jsonl(
            self.dir / "replies.jsonl",
            [
                {
                    "smartlead_message_id": "bounce-1",
                    "email": "Ada@Blog.Example.com",
                    "domain": "blog.example.com",
                    "classification": "bounce",
                    "received_at": "2026-08-20T10:00:00Z",
                    "body": "mailbox does not exist",
                }
            ],
        )
        code, data, err = self.run_cli("import-replies", str(replies))
        self.assertEqual(code, 0, err or data)
        contact = self.export()["tables"]["contacts"][0]
        self.assertEqual(contact["suppression_status"], "suppressed")
        self.assertIn(contact["status"], {"bounced", "suppressed"})
        code, data, err = self.run_cli("create-drafts")
        self.assertEqual(code, 0, err or data)
        self.assertEqual(len(self.export()["tables"]["drafts"]), 0)

    def test_live_before_payment(self):
        self._ready_shortlist()
        path = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(path))[0], 0)
        replies = write_jsonl(
            self.dir / "replies.jsonl",
            [
                {
                    "smartlead_message_id": "fee-1",
                    "email": "ada@blog.example.com",
                    "domain": "blog.example.com",
                    "classification": "interested_fee",
                    "received_at": "2026-08-21T10:00:00Z",
                    "body": "sure, 80 usd",
                    "fee_amount": 80,
                    "currency": "USD",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-replies", str(replies))[0], 0)
        code, data, err = self.run_cli("propose-placement")
        self.assertEqual(code, 0, err or data)
        placement = self.export()["tables"]["placements"][0]
        self.assertFalse(placement["payment_eligible"])
        self.assertNotEqual(placement["payment_status"], "paid")
        code, data, err = self.run_cli(
            "approve",
            "--kind",
            "offer",
            "--id",
            placement["placement_id"],
            "--by",
            "raphael",
        )
        self.assertEqual(code, 0, err or data)
        placement = self.export()["tables"]["placements"][0]
        self.assertFalse(placement["payment_eligible"], "approved fee is reserved, not payable before live")
        code, data, err = self.run_cli(
            "verify-placement",
            "--id",
            placement["placement_id"],
            "--live-url",
            "https://blog.example.com/blog/best-crms",
            "--brand-present",
            "--link-present",
        )
        self.assertEqual(code, 0, err or data)
        placement = self.export()["tables"]["placements"][0]
        self.assertEqual(placement["live_status"], "live_verified")
        self.assertTrue(placement["payment_eligible"])
        self.assertEqual(placement["payment_status"], "eligible_after_live")
        self.assertIsNone(placement.get("paid_at"))
        src = SCRIPT.read_text(encoding="utf-8")
        self.assertNotIn("def execute_payment", src)
        self.assertNotIn("def pay_placement", src)


class WeeklyDemoDoctorTests(EngineCase):
    def test_weekly_stalls(self):
        self.init_ws()
        path = self.seed_editorial()
        self.assertEqual(self.run_cli("import-citations", str(path))[0], 0)
        self.assertEqual(self.run_cli("build-shortlist")[0], 0)
        con = self.db()
        con.execute("UPDATE shortlist SET created_at = '2026-08-28T00:00:00+00:00'")
        con.execute(
            """
            INSERT INTO replies (
                reply_id, client_id, campaign_id, smartlead_message_id, thread_id,
                contact_id, domain, sequence_id, received_at, body_ref_or_hash,
                classification, classified_by, classified_at, next_action,
                offer_or_placement_id, status, dedupe_key, created_at, updated_at
            ) VALUES (
                'r-unclass', 'acme', 'camp-acme', 'm-unclass', '',
                '', 'blog.example.com', '', '2026-08-30T00:00:00+00:00', 'x',
                '', '', '', '',
                '', 'received_unclassified', 'dk-unclass',
                '2026-08-30T00:00:00+00:00', '2026-08-30T00:00:00+00:00'
            )
            """
        )
        con.execute(
            """
            INSERT INTO placements (
                placement_id, client_id, campaign_id, shortlist_id, reply_id,
                canonical_page_url, domain, target_link_url, proposed_headline,
                proposed_copy, copy_word_count, placement_position, fee_type,
                fee_amount, currency, page_value_prompts, page_value_model_count,
                offer_status, offer_approval_status, live_status, payment_status,
                dedupe_key, created_at, updated_at, approved_payload_hash
            ) VALUES (
                'p-drop', 'acme', 'camp-acme', '', '',
                'https://blog.example.com/blog/best-crms', 'blog.example.com',
                'https://acme.example/compare/crm', 'h', 'c', 1, 'after 6',
                'fee', 80, 'USD', 'p1', 1, 'approved_reserved', 'approved',
                'dropped', 'blocked', 'dk-drop',
                '2026-08-20T00:00:00+00:00', '2026-08-20T00:00:00+00:00', ''
            )
            """
        )
        con.commit()
        con.close()
        code, data, err = self.run_cli("weekly-report", "--as-of", "2026-09-01T00:00:00Z")
        self.assertEqual(code, 0, err or data)
        rules = {s["rule"] for s in data["stalls"]}
        self.assertIn("shortlist_without_contact_48h", rules)
        self.assertIn("unclassified_reply_24h", rules)
        self.assertIn("live_mention_dropped", rules)

        path = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                    "found_at": "2026-08-28T00:00:00Z",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(path))[0], 0)
        con = self.db()
        con.execute("UPDATE contacts SET created_at = '2026-08-28T00:00:00+00:00', verified_at = '2026-08-28T00:00:00+00:00'")
        con.commit()
        con.close()
        code, data, err = self.run_cli("weekly-report", "--as-of", "2026-09-01T00:00:00Z")
        self.assertEqual(code, 0, err or data)
        rules = {s["rule"] for s in data["stalls"]}
        self.assertIn("verified_contact_without_draft_48h", rules)
        self.assertEqual(self.run_cli("create-drafts")[0], 0)
        con = self.db()
        con.execute("UPDATE drafts SET created_at = '2026-08-28T00:00:00+00:00'")
        con.commit()
        con.close()
        code, data, err = self.run_cli("weekly-report", "--as-of", "2026-09-01T00:00:00Z")
        self.assertEqual(code, 0, err or data)
        rules = {s["rule"] for s in data["stalls"]}
        self.assertIn("unsent_draft_48h", rules)

    def test_idempotent_demo(self):
        cites = write_jsonl(
            self.dir / "citations.jsonl",
            [
                {
                    "date": "2026-08-03",
                    "model": "ChatGPT",
                    "prompt": "best crm for small teams",
                    "prompt_id": "p1",
                    "page_title": "12 CRMs",
                    "url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "page_type": "listicle",
                    "site_type": "blog",
                }
            ],
        )
        contacts = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        replies = write_jsonl(
            self.dir / "replies.jsonl",
            [
                {
                    "smartlead_message_id": "fee-1",
                    "email": "ada@blog.example.com",
                    "domain": "blog.example.com",
                    "classification": "interested_blurb",
                    "received_at": "2026-08-21T10:00:00Z",
                    "body": "send a blurb",
                }
            ],
        )
        write_json(
            self.config_path,
            self._config(
                fixtures={
                    "citations": str(cites),
                    "contacts": str(contacts),
                    "replies": str(replies),
                }
            ),
        )
        code, data, err = self.run_cli("demo")
        self.assertEqual(code, 0, err or data)
        self.assertTrue(data.get("ok"))
        self.assertTrue(data.get("idempotent"))
        self.assertEqual(data.get("network_calls"), 0)
        self.assertEqual(data["first"]["cited_urls"], data["second"]["cited_urls"])
        self.assertEqual(data["first"]["shortlist"], data["second"]["shortlist"])
        self.assertEqual(data["first"]["contacts"], data["second"]["contacts"])
        self.assertEqual(data["first"]["drafts"], data["second"]["drafts"])

    def test_doctor_offline_ready(self):
        self.init_ws()
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 0, err or data)
        self.assertEqual(data.get("overall"), "READY")
        blob = json.dumps(data)
        for needle in ("sk-", "xoxb-", "-----BEGIN", "api_key_value"):
            self.assertNotIn(needle, blob.lower() if needle != "-----BEGIN" else blob)
        for name in (
            "CrowdReply",
            "Sheets",
            "Smartlead",
            "Snov",
            "Prospeo",
            "Hunter",
            "ZeroBounce",
            "Slack",
        ):
            self.assertIn(name, data["connectors"])
            self.assertIn(data["connectors"][name]["status"], ("READY", "AUTH_REQUIRED", "MISSING", "BLOCKED"))

    def test_help_documents_exit_codes(self):
        proc = subprocess.run(
            [sys.executable, str(SCRIPT), "--help"],
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(proc.returncode, 0, proc.stderr)
        text = proc.stdout + proc.stderr
        self.assertIn("Exit codes", text)
        self.assertIn("0", text)
        self.assertIn("1", text)
        self.assertIn("2", text)
        self.assertIn("never sends", text.lower())
        self.assertTrue(SCHEMA.is_file())
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        for key in (
            "cited_urls",
            "shortlist",
            "contacts",
            "drafts",
            "replies",
            "placements",
            "approvals",
            "weekly_reports",
            "events",
        ):
            self.assertIn(key, schema.get("tables", schema.get("entities", {})))

    def test_cadence_no_mix(self):
        self.init_ws()
        path = self.seed_editorial()
        self.assertEqual(self.run_cli("import-citations", str(path))[0], 0)
        self.assertEqual(self.run_cli("build-shortlist")[0], 0)
        contacts = write_jsonl(
            self.dir / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        self.assertEqual(self.run_cli("import-contacts", str(contacts))[0], 0)
        self.assertEqual(self.run_cli("create-drafts")[0], 0)
        write_json(self.config_path, self._config(cadence_profile="hook_2_3"))
        code, data, err = self.run_cli("create-drafts")
        self.assertEqual(code, 2, err or data)
        self.assertFalse(data.get("ok"))


class ConfigContractTests(EngineCase):
    def _live_pages(self, published=True, url=None, page_type="comparison"):
        return [
            {
                "id": "compare-crm",
                "title": "CRM compare",
                "url": url or "https://acme.example/compare/crm",
                "page_type": page_type,
                "status": "live" if published else "planned",
                "published": published,
            }
        ]

    def test_live_unpublished_blocked_target_pages(self):
        write_json(
            self.config_path,
            self._config(mode="live", target_pages=self._live_pages(published=False)),
        )
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 2, err or data)
        blob = json.dumps(data) + err
        self.assertIn("BLOCKED_TARGET_PAGES", blob)
        self.assertFalse(data.get("ok"))

    def test_live_published_homepage_blocked(self):
        write_json(
            self.config_path,
            self._config(
                mode="live",
                target_pages=self._live_pages(
                    published=True, url="https://acme.example/", page_type="homepage"
                ),
            ),
        )
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 2, err or data)
        self.assertIn("BLOCKED_TARGET_PAGES", json.dumps(data) + err)

    def test_live_target_link_mismatch_blocked(self):
        write_json(
            self.config_path,
            self._config(
                mode="live",
                target_pages=self._live_pages(
                    published=True, url="https://acme.example/guides/other"
                ),
            ),
        )
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 2, err or data)
        self.assertIn("BLOCKED_TARGET_PAGES", json.dumps(data) + err)

    def test_live_published_reaches_connector_status(self):
        write_json(
            self.config_path,
            self._config(mode="live", target_pages=self._live_pages(published=True)),
        )
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 0, err or data)
        self.assertTrue(data.get("ok"))
        self.assertIn("connectors", data)
        self.assertIn("CrowdReply", data["connectors"])
        self.assertIn(
            data.get("overall"), ("READY", "AUTH_REQUIRED", "MISSING", "BLOCKED")
        )
        self.assertNotIn("BLOCKED_TARGET_PAGES", json.dumps(data))

    def test_cli_config_before_and_after_subcommand(self):
        before = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--config",
                str(self.config_path),
                "--workspace",
                str(self.workspace),
                "doctor",
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        after = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "doctor",
                "--config",
                str(self.config_path),
                "--workspace",
                str(self.workspace),
            ],
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(before.returncode, 0, before.stderr + before.stdout)
        self.assertEqual(after.returncode, 0, after.stderr + after.stdout)
        self.assertTrue(json.loads(before.stdout).get("ok"))
        self.assertTrue(json.loads(after.stdout).get("ok"))

    def test_cli_does_not_swallow_subcommand_options(self):
        argv = ENGINE.normalize_argv(
            [
                "approve",
                "--kind",
                "send",
                "--id",
                "d1",
                "--by",
                "raphael",
                "--config",
                str(self.config_path),
                "--workspace",
                str(self.workspace),
            ]
        )
        args = ENGINE.build_parser().parse_args(argv)
        self.assertEqual(args.command, "approve")
        self.assertEqual(args.kind, "send")
        self.assertEqual(args.id, "d1")
        self.assertEqual(args.by, "raphael")
        self.assertEqual(args.config, str(self.config_path))
        self.assertEqual(args.workspace, str(self.workspace))

    def test_relative_fixture_paths_from_tmp_cwd(self):
        pack = self.dir / "pack"
        fx = pack / "fixtures"
        fx.mkdir(parents=True)
        write_jsonl(
            fx / "citations.jsonl",
            [
                {
                    "date": "2026-08-03",
                    "model": "ChatGPT",
                    "prompt": "best crm for small teams",
                    "prompt_id": "p1",
                    "page_title": "12 CRMs",
                    "url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "page_type": "listicle",
                    "site_type": "blog",
                }
            ],
        )
        write_jsonl(
            fx / "contacts.jsonl",
            [
                {
                    "page_url": "https://blog.example.com/blog/best-crms",
                    "domain": "blog.example.com",
                    "person_name": "Ada Editor",
                    "role": "editor",
                    "email": "ada@blog.example.com",
                    "discovery_source": "Snov",
                    "zerobounce_status": "valid",
                }
            ],
        )
        write_jsonl(
            fx / "replies.jsonl",
            [
                {
                    "smartlead_message_id": "fee-1",
                    "email": "ada@blog.example.com",
                    "domain": "blog.example.com",
                    "classification": "interested_blurb",
                    "received_at": "2026-08-21T10:00:00Z",
                    "body": "send a blurb",
                }
            ],
        )
        cfg_path = pack / "config.json"
        write_json(
            cfg_path,
            self._config(
                fixtures={
                    "citations": "fixtures/citations.jsonl",
                    "contacts": "fixtures/contacts.jsonl",
                    "replies": "fixtures/replies.jsonl",
                }
            ),
        )
        proc = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "demo",
                "--config",
                str(cfg_path),
                "--workspace",
                str(self.workspace),
            ],
            check=False,
            capture_output=True,
            text=True,
            cwd="/tmp",
        )
        self.assertEqual(proc.returncode, 0, proc.stderr + proc.stdout)
        payload = json.loads(proc.stdout)
        self.assertTrue(payload.get("ok"))
        self.assertTrue(payload.get("idempotent"))
        self.assertEqual(payload.get("network_calls"), 0)

    def test_schema_version_missing_fail_closed(self):
        cfg = self._config()
        del cfg["schema_version"]
        write_json(self.config_path, cfg)
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 1, err or data)
        self.assertFalse(data.get("ok"))
        self.assertIn("schema_version", str(data.get("error", "")))

    def test_schema_version_wrong_fail_closed(self):
        write_json(self.config_path, self._config(schema_version=99))
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 1, err or data)
        self.assertFalse(data.get("ok"))
        self.assertIn("schema_version", str(data.get("error", "")))

    def test_unknown_top_level_key_fail_closed(self):
        cfg = self._config()
        cfg["own_domians"] = ["typo.example"]
        write_json(self.config_path, cfg)
        code, data, err = self.run_cli("doctor")
        self.assertEqual(code, 1, err or data)
        self.assertFalse(data.get("ok"))
        self.assertIn("own_domians", str(data.get("error", "")))

    def test_schema_documents_config_contract(self):
        schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
        contract = schema.get("config_contract") or {}
        self.assertEqual(contract.get("schema_version"), 1)
        self.assertEqual(contract.get("fixture_path_base"), "config_dir")
        self.assertEqual(contract.get("blocked", {}).get("BLOCKED_TARGET_PAGES"), 2)
        self.assertIn("target_pages", contract)
        self.assertIn("2", str(schema.get("exit_codes", {})))


if __name__ == "__main__":
    unittest.main()
