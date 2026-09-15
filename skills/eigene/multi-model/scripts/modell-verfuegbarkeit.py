#!/usr/bin/env python3
"""Modellgenaue Verfuegbarkeit gegen das lokale Gateway (Port 8318).

Prueft je Alias, ob das GELIEFERTE Modell dem ANGEFRAGTEN entspricht, und
liest den Failover-Header mit. Damit wird die Luecke geschlossen, die der
familienweise Preflight offen laesst: "LIEFERBAR gpt" sagt nicht, ob Astra,
Sol, Luna und Terra alle einzeln liefern.

Exit 0: jeder gepruefte Alias liefert sein angefragtes Modell.
Exit 1: mindestens ein Alias weicht ab oder faellt aus (Namensliste auf stderr).
Exit 2: Gateway nicht erreichbar.

Aufruf:
  modell-verfuegbarkeit.py                    # alle relevanten Aliase
  modell-verfuegbarkeit.py --json             # maschinenlesbar
  modell-verfuegbarkeit.py --nur claude-gw-astra-6,claude-gw-xai-4.6
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

GATEWAY = os.environ.get("RAPHAEL_GATEWAY", "http://127.0.0.1:8318")
KEY_PATH = os.environ.get("RAPHAEL_API_KEY_FILE", "/root/.cli-proxy-api/api-key.txt")
TIMEOUT = int(os.environ.get("RAPHAEL_PROBE_TIMEOUT", "110"))

# Alias -> MENGE zulaessiger gelieferter Modell-IDs. Quelle der Erwartung ist
# raphael_failover_policy.py (DEFAULT_ALIAS_MAP); hier bewusst als Literal,
# damit eine Aenderung dort sichtbar wird statt still mitzuwandern.
#
# Mehrere Werte nur, wo verschiedene OEM-IDs dasselbe Modell bezeichnen
# (DeepSeek liefert die API-ID "deepseek-flash" fuer "deepseek-4.1-flash").
# Zwei Modelle derselben Familie sind NICHT austauschbar, wenn sie getrennte
# Kontingenttoepfe haben: Sol -> Terra ist ein Failover und bleibt einer.
ERWARTET = {
    "claude-opus-5": ("claude-opus-5",),
    "claude-fable-5-1": ("claude-fable-5-1",),
    "claude-fable-5": ("claude-fable-5",),
    "claude-sonnet-5": ("claude-sonnet-5",),
    "claude-haiku-4-5": ("claude-haiku-4-5-20251001", "claude-haiku-4-5"),
    "claude-gw-astra-6": ("gpt-6-astra",),
    "claude-gw-sol-5.6": ("gpt-5.6-sol",),
    "claude-gw-luna-5.6": ("gpt-5.6-luna",),
    "claude-gw-terra-5.6": ("gpt-5.6-terra",),
    "claude-gw-flash-3.8": ("gemini-3.8-flash",),
    "claude-gw-seek-4.1-flash": ("deepseek-4.1-flash", "deepseek-flash"),
    "claude-gw-spark-1.3": ("muse-spark-1.3",),
    "claude-gw-xai-4.6": ("xai/grok-4.6", "grok-4.6"),
    "claude-gw-k3": ("kimi-k3",),
}


def api_key() -> str:
    try:
        with open(KEY_PATH, "r", encoding="utf-8") as fh:
            return fh.read().strip()
    except OSError:
        return os.environ.get("RAPHAEL_API_KEY", "")


def probe(alias: str, key: str) -> dict:
    """Ein 8-Token-Aufruf. Liest Status, geliefertes Modell und Failover-Header."""
    body = json.dumps(
        {
            "model": alias,
            "max_tokens": 8,
            "messages": [{"role": "user", "content": "ping"}],
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        GATEWAY + "/v1/messages",
        data=body,
        headers={
            "content-type": "application/json",
            "anthropic-version": "2023-06-01",
            "x-api-key": key,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            status = resp.status
            geliefert_header = resp.headers.get("X-Raphael-Upstream-Model", "")
            failover = resp.headers.get("X-Raphael-Model-Failover", "")
            raw = resp.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as exc:
        status = exc.code
        geliefert_header = exc.headers.get("X-Raphael-Upstream-Model", "") if exc.headers else ""
        failover = exc.headers.get("X-Raphael-Model-Failover", "") if exc.headers else ""
        raw = exc.read().decode("utf-8", "replace")
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        return {
            "status": 0,
            "geliefert": "",
            "failover": "",
            "ok": False,
            "detail": "Gateway nicht erreichbar: %s" % exc,
        }

    geliefert = geliefert_header
    detail = ""
    if not geliefert and raw:
        # Fehlerkoerper traegt kein Modellfeld; nur zur Diagnose.
        try:
            detail = json.loads(raw).get("error", {}).get("message", "")[:200]
        except (ValueError, AttributeError):
            detail = raw[:200]
    return {
        "status": status,
        "geliefert": geliefert,
        "failover": failover,
        "ok": status == 200 and not failover,
        "detail": detail,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--nur", help="Komma-Liste von Aliasen statt aller")
    ap.add_argument("--json", action="store_true", help="JSON statt Tabelle")
    args = ap.parse_args()

    aliase = list(ERWARTET)
    if args.nur:
        gewuenscht = [a.strip() for a in args.nur.split(",") if a.strip()]
        unbekannt = [a for a in gewuenscht if a not in ERWARTET]
        if unbekannt:
            print("Unbekannter Alias: %s" % ", ".join(unbekannt), file=sys.stderr)
            return 1
        aliase = gewuenscht

    key = api_key()
    if not key:
        print("Kein API-Key (%s)" % KEY_PATH, file=sys.stderr)
        return 2

    ergebnisse = []
    for alias in aliase:
        erg = probe(alias, key)
        erg["angefragt"] = alias
        erg["erwartet"] = ERWARTET[alias][0]
        erg["erwartet_alle"] = list(ERWARTET[alias])
        erg["modell_ok"] = erg["geliefert"] in ERWARTET[alias]
        erg["ok"] = erg["ok"] and erg["modell_ok"]
        ergebnisse.append(erg)

    if args.json:
        print(json.dumps(ergebnisse, indent=2, ensure_ascii=False))
    else:
        print("%-26s %-6s %-24s %-24s %s" % ("ALIAS", "HTTP", "ERWARTET", "GELIEFERT", "URTEIL"))
        for e in ergebnisse:
            urteil = "liefert" if e["ok"] else ("FAILOVER" if e["failover"] else "AUSFALL")
            print(
                "%-26s %-6s %-24s %-24s %s"
                % (e["angefragt"], e["status"], e["erwartet"], e["geliefert"] or "-", urteil)
            )
            if e["detail"] and not e["ok"]:
                print("    %s" % e["detail"])

    kaputt = [e["angefragt"] for e in ergebnisse if not e["ok"]]
    if kaputt:
        print("\nUNGELIEFERT: %s" % ", ".join(kaputt), file=sys.stderr)
        return 1
    if not any(e["status"] for e in ergebnisse):
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
