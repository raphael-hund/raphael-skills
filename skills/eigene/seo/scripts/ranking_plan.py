#!/usr/bin/env python3
"""Build a ranking plan from SERP-like Top-N + GSC-like query rows.

Deterministic. No network. Does not invent volumes.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

AI_ENGINES = (
    "Google AI Overviews",
    "Google AI Mode",
    "ChatGPT",
    "Perplexity",
    "Bing Copilot",
)

REQUIRED_SECTIONS = (
    "Keyword-Ziele",
    "Google-Aktionen",
    "KI-Engine-Aktionen",
    "Beleg-Zeiger",
    "30-Tage-Schritte",
    "90-Tage-Schritte",
)

QUICK_WIN_LO = 4.0
QUICK_WIN_HI = 10.0
QUICK_WIN_IMPR = 100.0
GAP_IMPR = 50.0
REFRESH_IMPR = 200.0
REFRESH_POS = 10.0


def _load_json(path: Path):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"ranking_plan: Datei unlesbar: {path} ({exc})") from exc
    return data


def _flatten_gsc_export(data):
    """Accept gsc_read.py --export (schema seo-gsc-read/1) and list/legacy shapes."""
    if isinstance(data, list):
        return data
    if not isinstance(data, dict):
        raise SystemExit("ranking_plan: JSON muss eine Liste oder ein Objekt mit rows sein")
    snapshots = data.get("snapshots")
    if isinstance(snapshots, list):
        rows = []
        for snap in snapshots:
            if isinstance(snap, dict):
                rows.extend(snap.get("top_queries") or [])
        if rows or data.get("schema") == "seo-gsc-read/1":
            return rows
    if isinstance(data.get("top_queries"), list):
        return data["top_queries"]
    return None


def _as_list(data, key=None):
    if key in (None, "queries", "gsc"):
        flat = _flatten_gsc_export(data)
        if flat is not None:
            return flat
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and key and isinstance(data.get(key), list):
        return data[key]
    if isinstance(data, dict):
        for candidate in ("rows", "queries", "items", "results", "serp"):
            if isinstance(data.get(candidate), list):
                return data[candidate]
    raise SystemExit("ranking_plan: JSON muss eine Liste oder ein Objekt mit rows sein")


def _num(row, *keys):
    for key in keys:
        if key in row and row[key] is not None:
            try:
                return float(row[key])
            except (TypeError, ValueError):
                continue
    return 0.0


def _text(row, *keys):
    for key in keys:
        value = row.get(key)
        if value is not None and str(value).strip():
            return str(value).strip()
    return ""


def _page_dimension_present(row):
    return any(key in row for key in ("page", "url"))


def classify_gsc(row, serp_urls):
    query = _text(row, "query", "keys", "keyword")
    page = _text(row, "page", "url")
    impressions = _num(row, "impressions")
    clicks = _num(row, "clicks")
    position = _num(row, "position")
    ctr = _num(row, "ctr")
    # Live GSC query rows have no page field. Missing key ≠ content gap.
    page_empty = _page_dimension_present(row) and not page
    if page_empty and impressions >= GAP_IMPR:
        klass = "content_gap"
    elif QUICK_WIN_LO <= position <= QUICK_WIN_HI and impressions >= QUICK_WIN_IMPR:
        klass = "quick_win"
    elif position > REFRESH_POS and impressions >= REFRESH_IMPR:
        klass = "refresh"
    else:
        klass = "watch"
    return {
        "query": query,
        "page": page,
        "impressions": impressions,
        "clicks": clicks,
        "ctr": ctr,
        "position": position,
        "class": klass,
    }


def build_plan(property_name, serp_rows, gsc_rows, grayhat=False):
    serp_sorted = sorted(
        serp_rows,
        key=lambda row: (_num(row, "rank", "position"), _text(row, "url", "link")),
    )
    serp_urls = {_text(row, "url", "link") for row in serp_sorted if _text(row, "url", "link")}
    classified = [classify_gsc(row, serp_urls) for row in gsc_rows]
    classified = [row for row in classified if row["query"]]
    classified.sort(key=lambda row: (row["class"], -row["impressions"], row["query"]))

    money = max(classified, key=lambda row: row["clicks"], default=None)
    if money:
        money = dict(money)
        money["class"] = "money"

    features = set()
    for row in serp_sorted:
        raw = row.get("features") or row.get("serp_features") or []
        if isinstance(raw, str):
            features.add(raw.lower())
        elif isinstance(raw, list):
            features.update(str(item).lower() for item in raw)

    evidence = [
        f"SERP-Export: {len(serp_sorted)} Zeilen (Input --serp)",
        f"GSC-Export: {len(classified)} Query-Zeilen (Input --gsc)",
    ]

    keyword_lines = []
    for row in classified:
        pointer = f"[gsc:{row['query']}|pos={row['position']}|impr={row['impressions']}|class={row['class']}]"
        keyword_lines.append(f"- {row['query']} — {row['class']} {pointer}")
    if not keyword_lines:
        keyword_lines.append("- (keine GSC-Query-Zeilen im Input)")

    google_actions = []
    for row in classified:
        if row["class"] == "quick_win":
            google_actions.append(
                f"- Quick Win „{row['query']}“: Title/H1 und 4–11 kontextuelle Links auf die vorhandene URL, keine neue Seite."
            )
        elif row["class"] == "content_gap":
            google_actions.append(
                f"- Content-Lücke „{row['query']}“: Intent gegen SERP prüfen, dann eine URL — nur wenn Top-N den Seitentyp bestätigt."
            )
        elif row["class"] == "refresh":
            google_actions.append(
                f"- Refresh „{row['query']}“: bestehende URL updaten (Antwort oben, Datum, interne Links)."
            )
    if money:
        google_actions.append(
            f"- Money-Query „{money['query']}“: 4–11 kontextuelle Links, Ankertext variieren (Nav/Footer zählen nicht)."
        )
    if any("cheap" in row["query"].lower() or "günstig" in row["query"].lower() for row in classified):
        google_actions.append(
            "- cheap/günstig-Modifier im Title belassen, wenn die Query ihn trägt."
        )
    if not google_actions:
        google_actions.append("- Keine automatische Google-Aktion: GSC-Zeilen unter den Schwellen.")

    aio_extra = " AIO-Feature in der SERP: eine Seite muss Range, Treiber und Caveat tragen."
    if "aio" not in features and "ai overview" not in features:
        aio_extra = ""
    ai_actions = {
        "Google AI Overviews": (
            f"Antwortkomplette Money-Seite; Konsenszahl zuerst, eigene Zahl darunter; "
            f"Scope der AIO-Antwort matchen (nicht nur Stadt, wenn die AIO Provinz sagt).{aio_extra}"
        ),
        "Google AI Mode": (
            "Freshness < 3 Monate auf den zitierfähigen Blöcken; Entity/sameAs; "
            "separat scoren, nicht mit AIO gleichsetzen."
        ),
        "ChatGPT": (
            "134–167-Wort-Block mit eigener Zahl; Brand-Mentions auf Wikipedia/Reddit/YouTube; "
            "GPTBot/OAI-SearchBot nicht in robots.txt sperren."
        ),
        "Perplexity": (
            "Community-validierte Quellen + zitierbarer Definitionssatz in den ersten 60 Wörtern; "
            "PerplexityBot erlauben."
        ),
        "Bing Copilot": (
            "Seite in den Bing-Index bringen (IndexNow); dieselben 10 Buyer-Questions monatlich wiederholen; "
            "Bing Places bei Local."
        ),
    }

    steps_30 = [
        "- Technik: Title/Canonical/robots/Sitemap/CWV der Money-URLs (0 Blocker).",
        "- GSC-Read-Snapshot fahren (`scripts/gsc_read.py --live`) oder Setup-Fallback dokumentieren.",
        "- Alle quick_win-Queries: On-Page + 4–11 interne kontextuelle Links.",
        "- Eine komplette Antwort oben auf der stärksten URL (erste 30 % der Seite).",
    ]
    steps_90 = [
        "- Pillar + 5–7 Spokes zum stärksten Cluster, Pflichtlinks beide Richtungen.",
        "- Statistik- oder Originaldaten-Seite als Zitationsköder (eigene Zahlen).",
        "- KI-Engines: dieselben Buyer-Questions 3× über Tage prüfen, nicht einmal.",
        "- Local nur wenn relevant: GBP-Kategorie/NAP, kein Keyword-Firmenname.",
        "- Refresh jeder URL, die Impressions hält und älter als 90 Tage ist.",
    ]

    grayhat_lines = []
    if grayhat:
        grayhat_lines = [
            "- Parasite-pSEO auf Medium/Substack/GitHub für `best X for ICP in City` — Risiko: Penalty (Site-Reputation / Scaled-Content). Nur nach Raphael-Go.",
            "- Expired-Domain-301 auf die Money-Domain — Risiko: Penalty / Ban. Nur nach Raphael-Go.",
            "- PBN oder gekaufte Keyword-Anker — Risiko: Penalty. Nur nach Raphael-Go.",
            "- Review-Gating oder Fake-GBP-Name — Risiko: rechtlich + Ban. Nicht vorschlagen.",
        ]

    lines = [
        f"# Ranking-Plan — {property_name}",
        "",
        "## Keyword-Ziele",
        *keyword_lines,
        "",
        "## Google-Aktionen",
        *google_actions,
        "",
        "## KI-Engine-Aktionen",
    ]
    for engine in AI_ENGINES:
        lines.append(f"- {engine}: {ai_actions[engine]}")
    lines.extend(
        [
            "",
            "## Beleg-Zeiger",
            *[f"- {item}" for item in evidence],
            "",
            "## 30-Tage-Schritte",
            *steps_30,
            "",
            "## 90-Tage-Schritte",
            *steps_90,
        ]
    )
    if grayhat_lines:
        lines.extend(["", "## Graustufen (nur nach Raphael-Go)", *grayhat_lines])
    lines.append("")
    return "\n".join(lines)


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Ranking-Plan aus SERP+GSC-Zeilen")
    parser.add_argument("--property", required=True)
    parser.add_argument("--serp", required=True, type=Path)
    parser.add_argument("--gsc", required=True, type=Path)
    parser.add_argument("--grayhat", action="store_true")
    parser.add_argument("--json", action="store_true")
    return parser.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)
    serp_rows = _as_list(_load_json(args.serp), "serp")
    gsc_rows = _as_list(_load_json(args.gsc), "queries")
    text = build_plan(args.property, serp_rows, gsc_rows, grayhat=args.grayhat)
    if args.json:
        payload = {
            "property": args.property,
            "sections": REQUIRED_SECTIONS,
            "engines": list(AI_ENGINES),
            "markdown": text,
        }
        sys.stdout.write(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    else:
        sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
