#!/usr/bin/env python3
"""build-skill-registry.py — dependency-free Autoload-Registry-Generator.

Erzeugungsrichtung ist einseitig: Dateisystem -> Registry -> Config.
Quelle ist ausschliesslich /root/.claude/skills/*/SKILL.md (Top-Level, ID =
Verzeichnisname). Die Registry (/root/.claude/skill-inventory-all.json) ist das
Erzeugnis, nie die Quelle.

Vertrag: /root/eingang/2026-09-01-skill-betriebssystem-klarplan.md
Regeln:  Regelkaskade R1-R14 in dieser Datei
Schema:  /root/.claude/skill-os/registry.schema.json

Usage:
    python3 tools/build-skill-registry.py --check          # Drift gegen Platte (Exit 1 bei Drift)
    python3 tools/build-skill-registry.py --write-registry # Z1 schreiben
    python3 tools/build-skill-registry.py --write-settings  # Z2 (nur skillOverrides)
    python3 tools/build-skill-registry.py --write-inventory # menschenlesbare Ansicht
    python3 tools/build-skill-registry.py --out DIR         # read-only nach DIR (Tests)
"""
from __future__ import annotations

import argparse
import collections
import json
import os
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

SKILLS_ROOT = Path("/root/.claude/skills")
REGISTRY_PATH = Path("/root/.claude/skill-inventory-all.json")
SETTINGS_PATH = Path("/root/.claude/settings.json")
INVENTORY_MD_PATH = Path("/root/skill-inventar.md")
LEGACY_INVENTORY = REGISTRY_PATH  # Altbestand liegt heute am selben Ort

SCHEMA_VERSION = 1
GENERATED_BY = "raphael-skills/tools/build-skill-registry.py"

# §7 Schritt 1: die einzigen zugelassenen Ausnahmen, mit Begruendung (G1/U9).
DISCOVER_ALLOWLIST = {
    "_shared": "kein Skill, gemeinsame Ressourcen ohne SKILL.md",
    "visual-harness": "kein Skill-Verzeichnis mit SKILL.md; Hooks nicht registriert",
}

# ---------------------------------------------------------------------------
# Frontmatter — zweistufig (Vertrag §0, Pflichtpruefung T4)
# ---------------------------------------------------------------------------

TOP_KEY_RE = re.compile(r"^([A-Za-z0-9_.-]+):\s*(.*)$")
NESTED_KEY_RE = re.compile(r"^(\s+)([A-Za-z0-9_.-]+):\s*(.*)$")


def scalar_value(raw: str) -> str:
    """Wie validate-skill.py::_scalar_value — YAML-Inline-Kommentar und
    umschliessende Anfuehrungszeichen entfernen."""
    val = raw.split(" #", 1)[0].strip()
    if len(val) >= 2 and val[0] == val[-1] and val[0] in ("'", '"'):
        val = val[1:-1].strip()
    return val


def extract_frontmatter(text: str) -> list[str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return []
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return lines[1:i]
    return []


def parse_list_value(raw: str, block: list[str]) -> list[str]:
    """Inline-Liste [a, b] oder Blockliste '- item'."""
    raw = raw.strip()
    out: list[str] = []
    if raw.startswith("[") and raw.endswith("]"):
        inner = raw[1:-1].strip()
        if inner:
            for part in inner.split(","):
                v = scalar_value(part)
                # Versionssuffix wie copywriting@^0 abschneiden
                v = v.split("@", 1)[0].strip()
                if v:
                    out.append(v)
    for line in block:
        s = line.strip()
        if s.startswith("- "):
            v = scalar_value(s[2:])
            v = v.split("@", 1)[0].strip()
            if v:
                out.append(v)
    return out


def parse_frontmatter(text: str) -> dict:
    """Liest Frontmatter auf BEIDEN Ebenen.

    Rueckgabe: {"top": {key: raw}, "nested": {parent: {key: raw}},
                "top_blocks": {key: [lines]}}

    Ein einstufiger Parser findet nur 63 statt 143 class-Traeger und laesst R3
    und R10 fuer 80 Skills ins Leere laufen (Vertrag §0). Deshalb ist die
    verschachtelte Ebene hier Pflicht, nicht Komfort.
    """
    fm = extract_frontmatter(text)
    top: dict[str, str] = {}
    top_blocks: dict[str, list[str]] = {}
    nested: dict[str, dict[str, str]] = {}
    current_top: str | None = None
    i = 0
    n = len(fm)
    while i < n:
        line = fm[i]
        if not line.strip() or line.strip().startswith("#"):
            i += 1
            continue
        m = TOP_KEY_RE.match(line)
        if m:
            current_top = m.group(1)
            top[current_top] = m.group(2)
            block: list[str] = []
            j = i + 1
            while j < n and (fm[j].startswith(" ") or fm[j].startswith("\t") or not fm[j].strip()):
                block.append(fm[j])
                j += 1
            top_blocks[current_top] = block
            # verschachtelte Schluessel der ersten Einrueckungsebene mitnehmen
            sub: dict[str, str] = {}
            for bline in block:
                bm = NESTED_KEY_RE.match(bline)
                if bm:
                    sub.setdefault(bm.group(2), bm.group(3))
            if sub:
                nested[current_top] = sub
            i = j
            continue
        i += 1
    return {"top": top, "nested": nested, "top_blocks": top_blocks}


def fm_class(fm: dict) -> str | None:
    """class ODER metadata.raphael-class — die eine neue Parselogik (§3)."""
    if "class" in fm["top"]:
        v = scalar_value(fm["top"]["class"])
        if v:
            return v
    v = fm["nested"].get("metadata", {}).get("raphael-class")
    if v is not None:
        v = scalar_value(v)
        if v:
            return v
    return None


def fm_flag(fm: dict, key: str) -> bool:
    v = fm["top"].get(key)
    if v is None:
        for sub in fm["nested"].values():
            if key in sub:
                v = sub[key]
                break
    if v is None:
        return False
    return scalar_value(v).lower() == "true"


def fm_text(fm: dict, key: str) -> str:
    raw = fm["top"].get(key, "")
    val = raw.strip()
    if val in (">", "|", ">-", "|-", ""):
        block = fm["top_blocks"].get(key, [])
        val = " ".join(b.strip() for b in block if b.strip())
    return val.strip().strip("'\"").strip()


# ---------------------------------------------------------------------------
# Schritt 1 — Menge bilden
# ---------------------------------------------------------------------------

def discover(root: Path = SKILLS_ROOT) -> list[str]:
    """Ein Top-Level-Skill ist genau ein direkter Eintrag E, fuer den E/SKILL.md
    eine regulaere, lesbare Datei ist (Symlinks aufgeloest). ID =
    Verzeichnisname. Keine Rekursion, keine Plugin-Namespaces."""
    ids: list[str] = []
    for entry in sorted(os.listdir(root)):
        skill_file = root / entry / "SKILL.md"
        try:
            if skill_file.is_file() and os.access(skill_file, os.R_OK):
                ids.append(entry)
        except OSError:
            continue
    return ids


def resolved_source(skill_id: str, root: Path = SKILLS_ROOT) -> str:
    return str((root / skill_id / "SKILL.md").resolve())


# ---------------------------------------------------------------------------
# Belegte Regel-Mitgliedslisten (aus /tmp/autoload-family-rules.md)
# ---------------------------------------------------------------------------

R1_CONTRACT_VIOLATION = {"ralph-loop", "visual-harness"}

R2_FANOUT = {
    "arena", "swarm", "interrogate", "reflect", "poteto-mode",
    "pstack-arena", "pstack-swarm", "pstack-interrogate", "pstack-reflect",
    "pstack-poteto-mode", "orchestrate-gauntlet", "design-loop",
    "design-review", "design-consultation", "ce-lfg", "ce-work",
}
R2_ROUTER_DUPES = {"design-loop", "design-review", "design-consultation", "orchestrate-gauntlet"}

R4_FRONT_DOORS = {"web", "design", "brain", "company-brain"}

R5_ABSORBED = {
    "taste": "design", "ui-ux": "design", "ui-ux-pro-max": "design",
    "impeccable": "design", "emil-design-eng": "design",
    "apple-design": "design", "web-anti-slop": "web",
}

R6_AUTOMATIC = {
    "unslop", "kunden-chat", "writing-for-agents", "typescript-best-practices",
    "careful", "guard", "no-mistakes", "unstuck", "git-guardrails-claude-code",
}

R7_GATES = {"visual-aaa", "eval"}

R8_QA = {
    "ship", "finish", "qa", "qa-only", "browse", "canary", "review",
    "code-review", "land-and-deploy", "benchmark", "watch",
}
R8_NEVER_WHEN = {
    "ship": ["als Live-Verifikation ausgeben"],
    "finish": ["als Live-Verifikation ausgeben"],
    "qa": ["read-only-Paket", "Kritiker-Rolle"],
    "land-and-deploy": ["Repo ist nicht GitHub"],
    "canary": ["ohne Baseline vor dem Deploy"],
    "benchmark": ["ohne Baseline vor dem Deploy"],
    "watch": ["Deploy ueberwachen"],
}
R8_CONFLICTS = {"watch": ["canary"]}

# R9: Gegenausnahmen — unpraefixierte Fassung zeigt auf einen fremden Skill.
R9_COUNTER_EXCEPTIONS = {"tdd", "teach"}

R10_CE_PHASES = {"ce-simplify-code", "ce-test-browser", "ce-test-xcode"}
R10_CE_DUPLICATED = {
    "ce-plan", "ce-brainstorm", "ce-code-review", "ce-debug", "ce-handoff",
    "ce-commit", "ce-commit-push-pr", "ce-ideate", "ce-explain", "ce-worktree",
    "ce-strategy", "ce-doc-review", "ce-pov", "ce-polish", "ce-prototype",
    "ce-promote", "ce-optimize", "ce-dogfood", "ce-setup",
    "ce-resolve-pr-feedback",
}
R10_CE_UNVERIFIED = {"ce-lfg", "ce-work"}
R10_NEVER_WHEN = {
    "ce-work": ["eigene Delegationshoheit ausueben"],
    "ce-code-review": [
        "als einziger Kritiker eines Opus-Builds gelten, solange die Familie des Peers unbelegt ist"
    ],
    "ce-proof": ["Kundenprojekt ohne Egress-Freigabe"],
}

R11_MAINTENANCE = {
    "skill-update", "skillify", "writing-skills", "writing-great-skills",
    "extract-approach", "autolearn", "learn", "install-anti-slop",
    "printingpress", "workflow-registration-audit-ultracode",
    "ce-compound-refresh", "ce-setup", "gstack-upgrade", "setup-pstack",
    "setup-matt-pocock-skills", "setup-ts-deep-modules", "sync-gbrain",
    "setup-gbrain", "vendor-listing",
}

# R12: belegte kaputte Handoffs (status broken -> Schema deprecated? nein:
# activation bleibt, status wird broken -> Schema-Mapping siehe map_status).
R12_BROKEN = {
    "website-plan": ["sequential-page-controller (fehlt)"],
    "poteto-mode": ["deslop (fehlt)", "control-cli (fehlt)", "control-ui (fehlt)",
                    "create-skill (fehlt)"],
}

# U2: Anti-Slop-Ueberschuss -> internal/owner unslop (R5-Muster).
U2_ANTI_SLOP = {
    "web-anti-slop", "no-ai-slop", "anti-slop-dmmulroy",
    "code-slop-asyrafhussin", "deslop-brianlovin", "deslop-davila",
    "deslop-poteto", "desloppify-peteromallet",
}

# U1/U3: Experimente -> explicit/experimental (Vertrag §9: NIE hidden ohne Owner
# wenn erreichbar bleiben soll; Vertrag setzt hier explicit/experimental).
U1_EXPERIMENTS = {
    "i-have-adhd", "thermo-nuclear-cursor", "karpathy-guidelines", "wait-what",
    "loop-me", "ask-matt", "pick-ui-library", "improve-animations",
    "review-animations", "poteto", "peteto",
}

# Sichtbarkeitsordnung (C §3): disabled < hidden < gate < explicit < auto
VISIBILITY_ORDER = ["disabled", "hidden", "gate", "explicit", "auto"]
TERMINAL = {"disabled", "gate"}


class Decision:
    """Ergebnis der Regelkaskade in C-Vokabular, vor der Schema-Abbildung."""

    def __init__(self, skill_id: str):
        self.id = skill_id
        self.activation: str | None = None
        self.activation_rule: str | None = None
        self.terminal = False
        self.owner: str | None = None
        self.status: str | None = None
        self.canonical_of: str | None = None
        self.scope: str | None = None
        self.requires: list[str] = []
        self.conflicts: list[str] = []
        self.never_when: list[str] = []
        self.rules: list[str] = []

    def set_activation(self, value: str, rule: str, terminal: bool = False) -> None:
        """Erste greifende Regel setzt; bei Konflikt gewinnt niedrigere
        Sichtbarkeit; terminal (R1/R7) wird nie ueberstimmt."""
        if rule not in self.rules:
            self.rules.append(rule)
        if self.activation is None:
            self.activation = value
            self.activation_rule = rule
            self.terminal = terminal
            return
        if self.terminal:
            return
        if terminal:
            self.activation = value
            self.activation_rule = rule
            self.terminal = True
            return
        if VISIBILITY_ORDER.index(value) < VISIBILITY_ORDER.index(self.activation):
            self.activation = value
            self.activation_rule = rule

    def note(self, rule: str) -> None:
        if rule not in self.rules:
            self.rules.append(rule)


# ---------------------------------------------------------------------------
# Schritt 3 — Regelkaskade R1 -> R14
# ---------------------------------------------------------------------------

def classify(skill_id: str, fm: dict, all_ids: set[str]) -> Decision:
    d = Decision(skill_id)
    cls = fm_class(fm)
    dmi = fm_flag(fm, "disable-model-invocation")

    # R1 — Vertragsverbot, terminal
    if skill_id in R1_CONTRACT_VIOLATION:
        d.set_activation("disabled", "R1", terminal=True)
        d.owner = "none"
        d.status = "deprecated"
        d.never_when.append("immer")

    # R2 — Fan-out-Owner-Kollision
    if skill_id in R2_FANOUT:
        d.set_activation("explicit", "R2")
        d.conflicts.append("Workflow")
        d.never_when.append("im SUBSTANTIELL-Zweig (loop §4)")
        if d.owner is None:
            d.owner = "self"
        if skill_id in R2_ROUTER_DUPES and d.status is None:
            d.status = "deprecated"

    # R3 — disable-model-invocation: true (beide Ebenen gelesen)
    if dmi:
        d.set_activation("explicit", "R3")
        if d.owner is None:
            d.owner = "self"

    # R4 — Front Door
    if skill_id in R4_FRONT_DOORS:
        d.set_activation("auto", "R4")
        d.owner = "self"
        if d.status is None:
            d.status = "canonical"
        for req in parse_list_value(
            fm["top"].get("raphael-requires-skills", ""),
            fm["top_blocks"].get("raphael-requires-skills", []),
        ):
            d.requires.append(req)
        for req in parse_list_value(
            fm["top"].get("requires-skills", ""),
            fm["top_blocks"].get("requires-skills", []),
        ):
            d.requires.append(req)
        if skill_id == "web":
            d.never_when.extend([
                "UI-Detailarbeit an bestehendem Frontend",
            ])

    # R5 — vom Front Door absorbierte Quelle
    if skill_id in R5_ABSORBED:
        owner = R5_ABSORBED[skill_id]
        d.set_activation("hidden", "R5")
        if d.owner is None or d.owner == "self":
            d.owner = owner
        if d.status is None:
            d.status = "duplicate"
            d.canonical_of = owner

    # U2 — Anti-Slop-Ueberschuss (R5-Muster, owner unslop)
    if skill_id in U2_ANTI_SLOP and skill_id != "web-anti-slop":
        d.set_activation("hidden", "R5/U2")
        d.owner = "unslop"
        d.status = "duplicate"
        d.canonical_of = "unslop"

    # R6 — Automatik-Gruppe
    if skill_id in R6_AUTOMATIC:
        d.set_activation("auto", "R6")
        d.owner = "none"
        d.scope = "global"
        if d.status is None:
            d.status = "canonical"

    # R7 — Artefakt-Gate, terminal
    if skill_id in R7_GATES:
        d.set_activation("gate", "R7", terminal=True)
        d.owner = "none"
        d.scope = "step"
        if d.status is None:
            d.status = "canonical"

    # R8 — QA/Ops-Pruefarten. Ausnahme: qa und qa-only sind per Nutzeranweisung
    # getrennte Auto-Router (Intents 'prüf und reparier' vs. 'prüf nur'); die
    # uebrigen neun R8-Skills bleiben explicit.
    if skill_id in R8_QA and skill_id not in K7_AUTO_ROUTERS:
        d.set_activation("explicit", "R8")
        if d.owner is None:
            d.owner = "self"
        d.scope = d.scope or "step"
        d.never_when.extend(R8_NEVER_WHEN.get(skill_id, []))
        d.conflicts.extend(R8_CONFLICTS.get(skill_id, []))
        if d.status is None:
            d.status = "canonical"
    elif skill_id in R8_QA:
        # Auto-Router-Ausnahme: scope/never_when/conflicts der Pruefart gelten
        # unveraendert weiter, nur die activation kommt aus K7.
        d.scope = d.scope or "step"
        d.never_when.extend(R8_NEVER_WHEN.get(skill_id, []))
        d.conflicts.extend(R8_CONFLICTS.get(skill_id, []))
        d.note("R8")

    # R9 — pstack-Doppelregistrierung
    if skill_id.startswith("pstack-"):
        bare = skill_id[len("pstack-"):]
        if bare in all_ids:
            if bare in R9_COUNTER_EXCEPTIONS:
                # Die bare Fassungen tdd/teach stammen aus anderen Skill-Familien.
                # Die P-Stack-Fassungen bleiben deshalb eigenständig, laden aber
                # nur intern über poteto und feuern nie als zweiter Hauptmodus.
                d.set_activation("hidden", "R9-Ausnahme")
                d.owner = PSTACK_OWNER
                d.status = "canonical"
                d.conflicts.append(bare)
            else:
                # Nutzeranweisung 2/5: Owner ist poteto, nicht das deprecated
                # poteto-mode. Ein deprecated Owner ist keine Route.
                d.set_activation("hidden", "R9")
                d.owner = PSTACK_OWNER
                d.status = "duplicate"
                d.canonical_of = bare
    if skill_id in R9_COUNTER_EXCEPTIONS and f"pstack-{skill_id}" in all_ids:
        d.note("R9-Ausnahme")
        d.conflicts.append(f"pstack-{skill_id}")
        if d.status is None:
            d.status = "canonical"

    # R10 — ce-*
    if skill_id in R10_CE_PHASES:
        d.set_activation("hidden", "R10")
        d.owner = "ce-lfg"
        if d.status is None:
            d.status = "canonical"
    elif skill_id in R10_CE_DUPLICATED:
        d.set_activation("explicit", "R10")
        if d.owner is None:
            d.owner = "self"
        if d.status is None:
            bare = skill_id[len("ce-"):]
            d.status = "duplicate"
            d.canonical_of = bare if bare in all_ids else skill_id
    elif skill_id in R10_CE_UNVERIFIED:
        d.set_activation("explicit", "R10")
        d.owner = "self"
        d.status = "unverified"
    elif skill_id.startswith("ce-"):
        d.set_activation("explicit", "R10")
        if d.owner is None:
            d.owner = "self"
        if d.status is None:
            d.status = "canonical"
    if skill_id in R10_NEVER_WHEN:
        d.never_when.extend(R10_NEVER_WHEN[skill_id])

    # R11 — Maintenance
    if skill_id in R11_MAINTENANCE:
        d.set_activation("explicit", "R11")
        if d.owner is None:
            d.owner = "none"
        d.scope = d.scope or "global"
        if d.status is None:
            d.status = "canonical"

    # R12 — kaputter Handoff: status broken, activation bleibt
    if skill_id in R12_BROKEN:
        d.note("R12")
        d.requires.extend(R12_BROKEN[skill_id])
        d.status = "broken"
        if d.activation is None:
            d.set_activation("explicit", "R12")
            d.owner = d.owner or "self"

    # K7/5 — bare P-Stack-Methode: internal unter poteto, kein eigener Spawn.
    # Greift nur, wenn pstack-<id> existiert und der bare Skill nicht schon
    # eine staerkere Rolle hat (R2/R4/R6/R7/R8 haben Vorrang ueber set_activation).
    if (
        skill_id != PSTACK_OWNER
        and f"pstack-{skill_id}" in all_ids
        and skill_id not in R9_COUNTER_EXCEPTIONS
        and d.activation is None
    ):
        d.set_activation("hidden", "K7/P-Stack")
        d.owner = PSTACK_OWNER
        if d.status is None:
            d.status = "canonical"

    # K7/5 — ads-* internal unter ads.
    if skill_id.startswith("ads-") and "ads" in all_ids and d.activation is None:
        d.set_activation("hidden", "K7/ads")
        d.owner = "ads"
        if d.status is None:
            d.status = "canonical"

    # K7/5 — investigate internal unter debug.
    if skill_id in K7_INTERNAL_OWNER and d.activation is None:
        d.set_activation("hidden", "K7/internal")
        d.owner = K7_INTERNAL_OWNER[skill_id]
        if d.status is None:
            d.status = "canonical"

    # K7 — Auto-Router. Nur Skills mit echtem Trigger-Block oder Klarplan-Intent.
    # Steht VOR U1/R14, damit poteto nicht als Experiment versandet.
    if skill_id in K7_AUTO_ROUTERS and d.activation is None:
        d.set_activation("auto", "K7", terminal=True)
        d.owner = "self"
        d.status = "canonical"
    if skill_id in K7_NEVER_WHEN:
        d.never_when.extend(K7_NEVER_WHEN[skill_id])

    # U1/U3 — Experimente
    if skill_id in U1_EXPERIMENTS and d.activation is None:
        d.set_activation("explicit", "R14/U1")
        d.owner = "self"
        d.status = "unverified"

    # R14 — Auffangregel
    if d.activation is None:
        d.set_activation("explicit", "R14")
        d.owner = d.owner or "self"
        if d.status is None:
            d.status = "unverified"

    if d.owner is None:
        d.owner = "self"
    if d.status is None:
        d.status = "canonical"
    if d.scope is None:
        sc = scalar_value(fm["top"].get("scope", ""))
        d.scope = sc if sc else ""
    if cls:
        d.note(f"class:{cls}")
    return d


# ---------------------------------------------------------------------------
# Schritt 5 — Vokabular auf das Schema abbilden (Vertrag §7)
# ---------------------------------------------------------------------------

def map_activation(d: Decision) -> tuple[str, str]:
    """C-Vokabular -> Schema-activation. Rueckgabe (activation, status_hint)."""
    a = d.activation
    if a == "disabled":
        # Schema kennt kein disabled; hidden + deprecated ist die Entsprechung.
        return "hidden", "deprecated"
    if a == "gate":
        return "always", ""
    if a == "auto":
        if d.activation_rule in ("R4", "K7"):
            return "auto-router", ""
        return "always", ""
    if a == "hidden":
        # hidden -> internal WENN ein Owner != none existiert, sonst hidden.
        # Ohne Owner waere internal unerreichbar und G3 rot.
        if d.owner and d.owner not in ("none", "self"):
            return "internal", ""
        return "hidden", ""
    return "explicit", ""


STATUS_MAP = {
    "canonical": "active",
    "alias": "duplicate",
    "duplicate": "duplicate",
    "deprecated": "deprecated",
    "broken": "deprecated",
    "unverified": "experimental",
}


def map_scope(d: Decision, activation: str) -> str:
    """C: global|agency|client|project -> Schema: session|task|step."""
    sc = (d.scope or "").split(":", 1)[0].strip()
    if sc == "step":
        return "step"
    if sc == "global":
        return "session"
    if sc in ("agency", "client", "project"):
        return "task"
    if d.activation_rule in ("R7",) or "R8" in d.rules:
        return "step"
    if activation == "always":
        return "session"
    # Default: task — die konservative Wahl (§9).
    return "task"


TRIGGER_MARKERS = ("Trigger:", "Triggert bei", "Triggers:", "Use when", "Nutze bei")
QUOTED_RE = re.compile(r"[\"„”“']([^\"„”“']{4,160})[\"„”“']")


def usable_phrase(value: str) -> bool:
    """Extraktions-Haertung (Vertrag §2): Erfolgskriterien, Saetze und Pfade
    sind keine Intents. Ohne diese drei Filter liefert die Extraktion Muell wie
    '/root/.claude/forbidden.md' oder 'Jede Zahl im Report hat eine Quelle
    (...) — sonst Block' und der Hook feuert zufaellig.
    """
    if value.startswith("/") and value.count("/") > 1:
        return False  # Dateipfad; /loop hat nur einen Slash und bleibt
    if len(value) > 60:
        return False  # Satz, kein Intent
    if any(ch in value for ch in (";", "—", "(")):
        return False
    return True


def split_auto_when(description: str, skill_id: str) -> list[str]:
    """auto_when AUSSCHLIESSLICH aus vorhandenem description/triggers, nie
    erfunden (C §6).

    Vorrang hat ein expliziter Trigger-Block; darin stehen die Phrasen in
    Anfuehrungszeichen ('Trigger: "Website bauen", "Landingpage bauen"').
    Nur wenn es keinen gibt, wird die Beschreibung in Saetze zerlegt.
    """
    if not description:
        return []
    text = description
    has_marker = False
    for marker in TRIGGER_MARKERS:
        if marker in text:
            text = text.split(marker, 1)[1]
            has_marker = True
            break

    out: list[str] = []
    seen: set[str] = set()

    def add(value: str) -> None:
        value = value.replace('\\"', '"').strip().strip("\\").strip('"„“').strip(".,;").strip()
        if len(value) < 4 or len(value) > 160 or value in seen:
            return
        if not usable_phrase(value):
            return
        seen.add(value)
        out.append(value)

    quoted = QUOTED_RE.findall(text)
    if quoted:
        for q in quoted:
            add(q)
            if len(out) >= 16:
                break
        if out:
            return out

    source = text if has_marker else description
    for p in re.split(r"[.;]\s+|\s*[|·]\s*", source):
        add(p.strip().strip('"„“'))
        if len(out) >= 6:
            break
    return out


def yaml_triggers(fm: dict) -> list[str]:
    """gstack-Skills tragen die Intents in einem eigenen 'triggers:'-Block
    statt im description-Fliesstext (qa, qa-only, investigate)."""
    out: list[str] = []
    for raw in parse_list_value(
        fm["top"].get("triggers", ""), fm["top_blocks"].get("triggers", [])
    ):
        v = raw.strip()
        if 4 <= len(v) <= 160 and usable_phrase(v) and v not in out:
            out.append(v)
    return out[:8]


# ---------------------------------------------------------------------------
# K7 — Auto-Router. Owner-Zuschnitt und die im Klarplan beschlossenen Intents.
# ---------------------------------------------------------------------------

# Klarplan-Intents: die EINZIGE zugelassene Neuschoepfung (Vertrag §2). Alles
# andere muss woertlich aus Trigger:/Use when/triggers stammen.
KLARPLAN_AUTO_WHEN = {
    # poteto ist der aktive Auto-Router fuer nichttriviale technische Arbeit.
    "poteto": [
        "Bug reproduzieren",
        "Root Cause finden",
        "Refactor",
        "Architektur entwerfen",
        "TDD",
        "technische Migration",
    ],
    # qa und qa-only sind getrennte Intents: reparieren vs. nur berichten.
    "qa": ["prüf und reparier", "teste und reparier"],
    "qa-only": ["prüf nur", "nichts reparieren"],
}

# Owner-Umhaengung (Regel 5). internal-Kinder erreichen ihren Owner ueber
# dessen requires; der Owner selbst ist auto-router oder explicit.
K7_INTERNAL_OWNER = {
    "investigate": "debug",
}

# poteto uebernimmt die P-Stack-Owner-Rolle von poteto-mode. poteto-mode bleibt
# deprecated und ist kein Owner mehr (Nutzeranweisung 2).
PSTACK_OWNER = "poteto"

# Kandidaten fuer K7: Owner mit echtem Trigger-Block plus die Klarplan-Intents.
K7_AUTO_ROUTERS = {
    "ads", "research", "debug", "plan", "seo", "copywriting",
    "poteto", "qa", "qa-only",
}

# Generisches "planen" darf Website-Kontexte nicht vor web gewinnen (U-NW1/U14/U-WP*).
K7_NEVER_WHEN = {
    "plan": [
        "Website bauen",
        "Website planen",
        "Website-Kritik",
    ],
}


# ---------------------------------------------------------------------------
# Registry bauen
# ---------------------------------------------------------------------------

def load_legacy() -> dict[str, dict]:
    """Altbestand (267 Eintraege, 5 Felder) fuer purpose/category/confidence."""
    if not LEGACY_INVENTORY.exists():
        return {}
    try:
        data = json.loads(LEGACY_INVENTORY.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}
    entries = data if isinstance(data, list) else data.get("skills", [])
    out = {}
    for e in entries:
        if isinstance(e, dict) and "name" in e:
            out[e["name"]] = e
    return out


def first_sentence(text: str) -> str:
    text = (text or "").strip()
    if not text:
        return ""
    m = re.split(r"(?<=[.!?])\s+", text)
    return m[0].strip() if m else text


def build_entries(root: Path = SKILLS_ROOT) -> tuple[list[dict], dict]:
    ids = discover(root)
    all_ids = set(ids)
    legacy = load_legacy()
    settings_overrides = read_settings().get("skillOverrides", {})

    decisions: dict[str, Decision] = {}
    frontmatters: dict[str, dict] = {}
    for sid in ids:
        try:
            text = (root / sid / "SKILL.md").read_text(encoding="utf-8", errors="replace")
        except OSError:
            text = ""
        fm = parse_frontmatter(text)
        frontmatters[sid] = fm
        decisions[sid] = classify(sid, fm, all_ids)

    entries: list[dict] = []
    for sid in ids:
        d = decisions[sid]
        fm = frontmatters[sid]
        activation, status_hint = map_activation(d)
        status = status_hint or STATUS_MAP.get(d.status, "experimental")
        description = fm_text(fm, "description")
        scope = map_scope(d, activation)

        # owner: 'none'/'self' sind C-Sonderwerte; Schema kennt nur Namen oder
        # 'system'. G3: system nur bei scope session + activation always.
        owner = d.owner
        if owner == "self":
            owner = sid
        elif owner == "none":
            # G3/T5: 'system' ist nur bei scope session + activation always
            # zulaessig. Ein R7-Artefakt-Gate wirkt auf einen Arbeitsschritt
            # (scope step) und traegt deshalb sich selbst als Owner statt
            # 'system' — sonst waere T5 rot.
            if activation == "always" and scope == "session":
                owner = "system"
            else:
                owner = sid
        if owner not in all_ids and owner != "system":
            owner = sid

        if activation in ("explicit", "hidden"):
            auto_when = []
        elif sid in KLARPLAN_AUTO_WHEN:
            # Klarplan-Intent plus was der eigene triggers-Block hergibt.
            auto_when = list(
                dict.fromkeys(KLARPLAN_AUTO_WHEN[sid] + yaml_triggers(fm))
            )[:8]
        else:
            auto_when = split_auto_when(description, sid) or yaml_triggers(fm)

        legacy_entry = legacy.get(sid, {})
        purpose = legacy_entry.get("purpose") or first_sentence(description) or f"Skill {sid}."
        category = legacy_entry.get("category") or "Unklassifiziert"
        confidence = legacy_entry.get("confidence") if sid in legacy else "mittel"

        evidence = [resolved_source(sid), f"family-rules:{d.activation_rule}"]

        requires = [r for r in dict.fromkeys(d.requires)]
        conflicts = [c for c in dict.fromkeys(d.conflicts)]

        entry = {
            "name": sid,
            "purpose": purpose,
            "category": category,
            "source": resolved_source(sid),
            "confidence": confidence or "mittel",
            "activation": activation,
            "owner": owner,
            "scope": scope,
            "auto_when": auto_when,
            "never_when": list(dict.fromkeys(d.never_when)),
            "requires": requires,
            "conflicts": conflicts,
            "evidence": evidence,
            "status": status,
        }
        if status == "duplicate":
            canon = d.canonical_of if d.canonical_of in all_ids else None
            entry["canonical_of"] = canon or (owner if owner in all_ids else sid)
        entries.append(entry)

    entries = prune_ambiguous_auto_when(entries)
    entries = close_graph(entries, all_ids)
    entries.sort(key=lambda e: e["name"])

    registry = collections.OrderedDict([
        ("schema_version", SCHEMA_VERSION),
        ("generated_by", GENERATED_BY),
        ("generated_at", "2026-09-01T00:00:00Z"),
        ("source_root", str(root)),
        ("skill_count", len(entries)),
        ("skills", entries),
    ])
    return entries, registry


def word_match(haystack: str, phrase: str) -> bool:
    """Exakte Entsprechung von wordMatch() im Hook: Unicode-Wortgrenzen mit
    '/' als Grenzzeichen. Damit misst der Generator dieselbe Treffermenge, die
    der Hook zur Laufzeit sieht — sonst waere die Simulation wertlos."""
    p = (phrase or "").strip()
    if not p:
        return False
    esc = re.escape(p)
    try:
        return re.search(
            rf"(^|[^\w/])(?:{esc})([^\w/]|$)", haystack, re.IGNORECASE | re.UNICODE
        ) is not None
    except re.error:
        return p.lower() in haystack.lower()


def hook_usable(phrase: str) -> bool:
    """Entsprechung von usablePhrase() im Hook — kuerzere Phrasen sieht der
    Hook nie, sie duerfen die Simulation also auch nicht bestehen."""
    p = (phrase or "").strip()
    if not p:
        return False
    if p.startswith("/"):
        return len(p) >= 2
    if len(p) >= 5:
        return True
    return len(p) >= 3 and p == p.upper()


def prune_ambiguous_auto_when(entries: list[dict]) -> list[dict]:
    """Nutzeranweisung 7: fuer jede Auto-Phrase wird gegen ALLE Kandidaten
    simuliert. Eine Phrase, die nicht eindeutig ihren eigenen Skill auswaehlt,
    wird verworfen. Hat ein Skill danach keine eindeutige Phrase mehr, faellt
    er auf explicit zurueck statt fail-closed im Hook zu verpuffen.

    Das ist derselbe Test, den pickMode() zur Laufzeit fuehrt: mehr als ein
    getroffener Kandidat = kein Modus. Was hier ueberlebt, routet dort auch.
    """
    routers = [e for e in entries if e["activation"] == "auto-router"]

    def never_blocked(entry: dict, prompt: str) -> bool:
        return any(
            hook_usable(nw) and word_match(prompt, nw)
            for nw in entry.get("never_when") or []
        )

    def hits_skill(entry: dict, prompt: str) -> bool:
        if never_blocked(entry, prompt):
            return False
        return any(
            hook_usable(cand) and word_match(prompt, cand)
            for cand in entry.get("auto_when") or []
        )

    for e in routers:
        kept = []
        for phrase in e["auto_when"]:
            if not hook_usable(phrase):
                continue
            # Simulation wie pickMode: never_when filtert vor der Eindeutigkeit.
            hitters = [o["name"] for o in routers if hits_skill(o, phrase)]
            if set(hitters) == {e["name"]}:
                kept.append(phrase)
        e["auto_when"] = kept

    # Kein eindeutiger Einstieg -> explicit. R4-Front-Doors sind davon
    # ausgenommen: sie sind vertraglich gesetzt und bereits belegt.
    for e in routers:
        if not e["auto_when"] and e["name"] not in R4_FRONT_DOORS:
            e["activation"] = "explicit"
            e["auto_when"] = []
    return entries


def close_graph(entries: list[dict], all_ids: set[str]) -> list[dict]:
    """Schritt 7 — requires/conflicts auf existierende IDs beschraenken,
    conflicts symmetrisch schliessen (G4), Zyklen abbrechen (G5)."""
    by_name = {e["name"]: e for e in entries}

    for e in entries:
        # requires: nur existierende IDs; '(fehlt)'-Marker fallen raus, weil
        # das Schema nur skillName zulaesst (Kante ins Leere waere T7 rot).
        e["requires"] = [r for r in e["requires"] if r in all_ids and r != e["name"]]
        e["conflicts"] = [c for c in e["conflicts"] if c in all_ids and c != e["name"]]

    # G4: conflicts symmetrisch schliessen.
    for e in list(entries):
        for c in list(e["conflicts"]):
            other = by_name.get(c)
            if other is not None and e["name"] not in other["conflicts"]:
                other["conflicts"].append(e["name"])

    # requires ∩ conflicts leer
    for e in entries:
        conf = set(e["conflicts"])
        e["requires"] = [r for r in e["requires"] if r not in conf]

    # Kein requires auf deprecated/duplicate — ABER erst vor der G3-Kante, denn
    # eine Owner->internal-Kante ist genau der Ladeweg, der einen internal-Skill
    # erreichbar macht. Wuerde sie hier mitgefiltert, waere G3 fuer jeden
    # internal/duplicate-Skill rot und der Skill unerreichbar.
    for e in entries:
        e["requires"] = [
            r for r in e["requires"]
            if by_name.get(r, {}).get("status") not in ("deprecated", "duplicate")
        ]

    # G3: internal-Skill muss von seinem Owner in requires gefuehrt werden.
    # Laeuft NACH dem Statusfilter und ist von ihm ausgenommen.
    for e in entries:
        if e["activation"] == "internal":
            owner = by_name.get(e["owner"])
            if owner is None or owner["name"] == e["name"]:
                continue
            if e["name"] in owner["conflicts"]:
                continue
            if e["name"] not in owner["requires"]:
                owner["requires"].append(e["name"])

    # G5: Zyklen brechen den Lauf ab.
    cycle = find_cycle({e["name"]: e["requires"] for e in entries})
    if cycle:
        raise SystemExit(f"S3/G5: requires-Zyklus: {' -> '.join(cycle)}")

    for e in entries:
        e["requires"] = sorted(set(e["requires"]))
        e["conflicts"] = sorted(set(e["conflicts"]))
    return entries


def find_cycle(graph: dict[str, list[str]]) -> list[str] | None:
    WHITE, GREY, BLACK = 0, 1, 2
    color = {n: WHITE for n in graph}
    stack: list[str] = []

    def visit(n: str) -> list[str] | None:
        color[n] = GREY
        stack.append(n)
        for m in graph.get(n, []):
            if m not in color:
                continue
            if color[m] == GREY:
                return stack[stack.index(m):] + [m]
            if color[m] == WHITE:
                r = visit(m)
                if r:
                    return r
        stack.pop()
        color[n] = BLACK
        return None

    for n in sorted(graph):
        if color[n] == WHITE:
            r = visit(n)
            if r:
                return r
    return None


# ---------------------------------------------------------------------------
# Z2 — skillOverrides ableiten (Vertrag §10)
# ---------------------------------------------------------------------------

OVERRIDE_MAP = {
    "always": None,          # kein Eintrag = on
    "auto-router": None,     # kein Eintrag = on
    "internal": "name-only",
    "explicit": "name-only",
    "hidden": "user-invocable-only",
}


def derive_overrides(entries: list[dict], existing: dict) -> dict:
    out: dict[str, str] = {}
    for e in entries:
        val = OVERRIDE_MAP[e["activation"]]
        if val is None:
            continue
        # Fail-closed: eine bereits getroffene, strengere Entscheidung wird
        # nicht aufgeweicht. 'user-invocable-only' ist strenger als
        # 'name-only'; wer sie gesetzt hat, hat das Modell bewusst
        # ausgeschlossen. Die Ableitung darf sie nicht stillschweigend
        # zurueckdrehen (CLAUDE.md §2: kein Zurueckholen von Verworfenem).
        if existing.get(e["name"]) == "user-invocable-only":
            val = "user-invocable-only"
        out[e["name"]] = val
    # U8: die 5 Ghost-Overrides bleiben unangetastet stehen.
    known = {e["name"] for e in entries}
    for name, val in existing.items():
        if name not in known:
            out[name] = val
    return collections.OrderedDict(sorted(out.items()))


def read_settings() -> collections.OrderedDict:
    if not SETTINGS_PATH.exists():
        return collections.OrderedDict()
    return json.loads(SETTINGS_PATH.read_text(encoding="utf-8"),
                      object_pairs_hook=collections.OrderedDict)


def dumps(obj) -> str:
    return json.dumps(obj, indent=2, ensure_ascii=False, sort_keys=False) + "\n"


ACTIVATION_LABELS = collections.OrderedDict([
    ("auto-router", "Automatische Router"),
    ("always", "Immer aktive Regeln"),
    ("internal", "Interne Spezialisten"),
    ("explicit", "Explizite und seltene Skills"),
    ("hidden", "Ausgeblendete Skills"),
])


def md_cell(value: object) -> str:
    return " ".join(str(value or "").split()).replace("|", "\\|")


def build_markdown(entries: list[dict]) -> str:
    """Menschenlesbare Ansicht derselben Registry, nie zweite Quelle."""
    activation_counts = collections.Counter(e["activation"] for e in entries)
    status_counts = collections.Counter(e["status"] for e in entries)
    lines = [
        "# Skill-Inventar",
        "",
        "**Stand:** 01. September 2026  ",
        f"**Registrierte Skills:** {len(entries)}  ",
        "**Quelle:** `/root/.claude/skills/*/SKILL.md`, erzeugt durch "
        "`/root/raphael-skills/tools/build-skill-registry.py`.",
        "",
        "Dieses Dokument ist eine erzeugte Ansicht. Die maschinenlesbare Registry "
        "liegt unter `/root/.claude/skill-inventory-all.json`. Nicht von Hand bearbeiten.",
        "",
        "## So benutzt du das System",
        "",
        "Du musst die Namen nicht lernen. Formuliere Ziel, Fertig-Bedingung und Grenzen. "
        "Automatische Router wählen die passende Familie; interne Spezialisten lädt nur ihr Owner.",
        "",
        "| Klasse | Anzahl | Verhalten |",
        "|---|---:|---|",
    ]
    behavior = {
        "auto-router": "Wird aus einer eindeutigen Nutzerabsicht gewählt.",
        "always": "Gilt sitzungsweit oder als festes Gate.",
        "internal": "Lädt ausschließlich über seinen Owner.",
        "explicit": "Läuft nur bei ausdrücklicher Wahl oder sicherem Sonderfall.",
        "hidden": "Bleibt installiert, darf nicht automatisch feuern.",
    }
    for activation, label in ACTIVATION_LABELS.items():
        lines.append(f"| {label} | {activation_counts.get(activation, 0)} | {behavior[activation]} |")
    lines.extend([
        "",
        "## Lebenszyklus",
        "",
        "| Status | Anzahl |",
        "|---|---:|",
    ])
    for status in ("active", "experimental", "duplicate", "deprecated", "unclassified"):
        lines.append(f"| {status} | {status_counts.get(status, 0)} |")

    for activation, label in ACTIVATION_LABELS.items():
        group = [e for e in entries if e["activation"] == activation]
        lines.extend([
            "",
            f"## {label} ({len(group)})",
            "",
            "| Skill | Owner | Scope | Status | Zweck |",
            "|---|---|---|---|---|",
        ])
        for e in group:
            lines.append(
                f"| `{md_cell(e['name'])}` | `{md_cell(e['owner'])}` | "
                f"{md_cell(e['scope'])} | {md_cell(e['status'])} | {md_cell(e['purpose'])} |"
            )
    lines.extend([
        "",
        "> Skills werden nur bei passender Absicht geladen. Interne Spezialisten laufen "
        "nicht selbstständig und starten keinen zweiten Owner.",
        "",
    ])
    return "\n".join(lines)


def stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")


def ensure_backup(target: Path) -> Path:
    """S2: Backup VOR dem ersten Schreiben. Nie ein bestehendes Backup
    ueberschreiben, nie eines loeschen."""
    dated = target.with_name(target.name + ".bak-2026-09-01")
    if dated.exists() and dated.stat().st_size > 0:
        return dated
    fresh = target.with_name(f"{target.name}.bak-autoload-{stamp()}")
    if fresh.exists():
        raise SystemExit(f"S2: Backup {fresh} existiert bereits")
    shutil.copy2(target, fresh)
    return fresh


def atomic_write(target: Path, content: str) -> None:
    st = target.stat() if target.exists() else None
    tmp = target.with_name(target.name + ".tmp-autoload")
    tmp.write_text(content, encoding="utf-8")
    if st is not None:
        os.chmod(tmp, st.st_mode & 0o7777)
        try:
            os.chown(tmp, st.st_uid, st.st_gid)
        except PermissionError:
            pass
    os.replace(tmp, target)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--write-registry", action="store_true")
    ap.add_argument("--write-settings", action="store_true")
    ap.add_argument("--write-inventory", action="store_true")
    ap.add_argument("--out", type=str, default=None)
    args = ap.parse_args(argv[1:])

    entries, registry = build_entries()

    # S5 / S10 / S9 — Stopbedingungen vor jedem Schreiben.
    if len(entries) < 300:
        print(f"S5: len(A)={len(entries)} < 300 — abgebrochen.")
        return 1
    for e in entries:
        if e["status"] == "unclassified":
            print(f"S10: {e['name']} bekaeme unclassified — abgebrochen.")
            return 1
        if e["activation"] in ("always", "auto-router") and not e["evidence"]:
            print(f"S9: {e['name']} ist {e['activation']} ohne evidence — abgebrochen.")
            return 1

    new_registry = dumps(registry)
    new_inventory = build_markdown(entries)
    settings = read_settings()
    overrides = derive_overrides(entries, settings.get("skillOverrides", {}))

    if args.out:
        outdir = Path(args.out)
        outdir.mkdir(parents=True, exist_ok=True)
        (outdir / "skill-inventory-all.json").write_text(new_registry, encoding="utf-8")
        (outdir / "skill-inventar.md").write_text(new_inventory, encoding="utf-8")
        new_settings = collections.OrderedDict(settings)
        new_settings["skillOverrides"] = overrides
        (outdir / "settings.json").write_text(dumps(new_settings), encoding="utf-8")
        print(f"read-only nach {outdir} geschrieben ({len(entries)} Skills, "
              f"{len(overrides)} Overrides).")
        return 0

    if args.check:
        old = REGISTRY_PATH.read_text(encoding="utf-8") if REGISTRY_PATH.exists() else ""
        old_md = INVENTORY_MD_PATH.read_text(encoding="utf-8") if INVENTORY_MD_PATH.exists() else ""
        stale = []
        if old != new_registry:
            stale.append("skill-inventory-all.json")
        if old_md != new_inventory:
            stale.append("skill-inventar.md")
        if stale:
            print("veraltet: " + ", ".join(stale) + " — Generator mit passenden --write-* Flags ausfuehren.")
            return 1
        print(f"Registry und Inventar aktuell ({len(entries)} Skills).")
        return 0

    wrote = False
    if args.write_registry:
        # S6: fremde schema_version nicht ueberschreiben.
        if REGISTRY_PATH.exists():
            try:
                cur = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
                if isinstance(cur, dict):
                    sv = cur.get("schema_version")
                    if sv is not None and sv != SCHEMA_VERSION:
                        print(f"S6: schema_version {sv} != {SCHEMA_VERSION} — abgebrochen.")
                        return 1
            except json.JSONDecodeError:
                pass
        bak = ensure_backup(REGISTRY_PATH)
        atomic_write(REGISTRY_PATH, new_registry)
        print(f"{REGISTRY_PATH} geschrieben ({len(entries)} Skills). Backup: {bak}")
        wrote = True

    if args.write_settings:
        bak = ensure_backup(SETTINGS_PATH)
        before = {k: v for k, v in settings.items() if k != "skillOverrides"}
        new_settings = collections.OrderedDict(settings)
        new_settings["skillOverrides"] = overrides
        after = {k: v for k, v in new_settings.items() if k != "skillOverrides"}
        if before != after or list(settings.keys()) != list(new_settings.keys()):
            print("S4: ein anderer Top-Level-Key haette sich geaendert — abgebrochen.")
            return 1
        atomic_write(SETTINGS_PATH, dumps(new_settings))
        print(f"{SETTINGS_PATH}: skillOverrides geschrieben ({len(overrides)} Eintraege). "
              f"Backup: {bak}")
        wrote = True

    if args.write_inventory:
        bak = ensure_backup(INVENTORY_MD_PATH)
        atomic_write(INVENTORY_MD_PATH, new_inventory)
        print(f"{INVENTORY_MD_PATH} geschrieben ({len(entries)} Skills). Backup: {bak}")
        wrote = True

    if not wrote:
        print(f"{len(entries)} Skills klassifiziert, {len(overrides)} Overrides abgeleitet. "
              f"Kein Schreibmodus gewaehlt.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
