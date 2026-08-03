#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CANONICAL_DIR = ROOT / "skills" / "eigene" / "web"
CANONICAL_SKILL = CANONICAL_DIR / "SKILL.md"
FRONTEND_LIBRARY = CANONICAL_DIR / "references" / "frontend-referenzbibliothek.md"
TOOL_ROUTER = CANONICAL_DIR / "references" / "tool-usecase-router.md"
FRONTEND_SOURCE_URL = "https://x.com/LexnLin/status/2083898950755471520"
MOBBIN_URL = "https://mobbin.com/"
MOBBIN_AFFILIATE_PREFIX = "https://mobbin.com/?referrer_workspace_id="
BRIDGES = {
    ROOT / "codex" / "skills" / "web": "../../skills/eigene/web",
    ROOT / "kimi" / "skills" / "web": "../../skills/eigene/web",
}
RUNTIME_NEUTRAL_FILES = [
    CANONICAL_SKILL,
    CANONICAL_DIR / "references" / "loop2-ablauf.md",
    CANONICAL_DIR / "references" / "screenshot-kritik-loop.md",
    CANONICAL_DIR / "references" / "rebuild-from-image.md",
    TOOL_ROUTER,
]
BANNED_MARKERS = (
    "Codex source adapter",
    "Kimi source adapter",
    "Read the complete canonical source file",
    "Claude/Cockpit",
)
BANNED_EXECUTION_TERMS = re.compile(
    r"\b(?:Claude|Codex|Kimi|Hermes|Fable|Opus|Sonnet|Haiku|Terra|Cockpit)\b|/codex:review",
    re.IGNORECASE,
)
REQUIRED_USE_CASES = (
    "FAQ",
    "Icons",
    "Motion",
    "Stock",
    "Inspiration",
    "Formular",
    "Fonts",
    "Shader",
    "Gradient",
)
SECTION_FIELD_MARKERS = ("**Bedarf**", "**Default**", "**Install/Use**", "**Gate**", "**Nie**")


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot import {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def fail(message: str) -> None:
    raise AssertionError(message)


def main() -> int:
    validator = load_module("shared_web_validator", ROOT / "tools" / "validate-skill.py")
    codex_sync = load_module("shared_web_codex_sync", ROOT / "tools" / "sync-codex-skills.py")
    kimi_sync = load_module("shared_web_kimi_sync", ROOT / "tools" / "sync-kimi-skills.py")

    canonical_bytes = CANONICAL_SKILL.read_bytes()
    canonical_hash = hashlib.sha256(canonical_bytes).hexdigest()
    for bridge, expected_target in BRIDGES.items():
        if not bridge.is_symlink():
            fail(f"bridge is not a symlink: {bridge}")
        if os.readlink(bridge) != expected_target:
            fail(f"bridge target mismatch: {bridge} -> {os.readlink(bridge)!r}")
        bridged_skill = bridge / "SKILL.md"
        if bridged_skill.resolve() != CANONICAL_SKILL.resolve():
            fail(f"bridge does not resolve to canonical SKILL.md: {bridge}")
        if bridged_skill.read_bytes() != canonical_bytes:
            fail(f"bridge bytes differ: {bridge}")
        if hashlib.sha256(bridged_skill.read_bytes()).hexdigest() != canonical_hash:
            fail(f"bridge SHA-256 differs: {bridge}")

    text = CANONICAL_SKILL.read_text(encoding="utf-8")
    frontmatter = validator.extract_frontmatter(text) or []
    fields = validator.parse_top_level_keys(frontmatter)
    if set(fields) != {"name", "description", "metadata"}:
        fail(f"portable frontmatter keys differ: {sorted(fields)}")
    metadata, metadata_errors = validator.parse_metadata_strings(frontmatter)
    if metadata_errors:
        fail("portable metadata errors: " + "; ".join(metadata_errors))
    for key in validator.PORTABLE_METADATA_FIELDS:
        if key not in metadata:
            fail(f"portable metadata field missing: {key}")
    for key in validator.PORTABLE_JSON_LIST_FIELDS:
        value = json.loads(metadata[key])
        if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
            fail(f"portable metadata field is not a string list: {key}")

    validation = validator.validate_skill_file(CANONICAL_SKILL)
    if validation.errors:
        fail("canonical validator errors: " + "; ".join(validation.errors))
    manifest = CANONICAL_DIR / "agents" / "openai.yaml"
    if codex_sync.validate_openai_manifest(manifest, "web"):
        fail("canonical OpenAI manifest is invalid")

    combined = "\n".join(path.read_text(encoding="utf-8") for path in RUNTIME_NEUTRAL_FILES)
    for marker in BANNED_MARKERS:
        if marker.lower() in combined.lower():
            fail(f"adapter marker remains: {marker}")
    match = BANNED_EXECUTION_TERMS.search(combined)
    if match:
        fail(f"fixed runtime/model execution term remains: {match.group(0)}")

    if list((CANONICAL_DIR / "references").rglob("SKILL.md")):
        fail("reference resource was promoted to an independent skill")
    loads = json.loads(metadata["raphael-loads"])
    if "references/frontend-referenzbibliothek.md" not in loads:
        fail("frontend reference library is not declared in raphael-loads")
    if "references/tool-usecase-router.md" not in loads:
        fail("tool use-case router is not declared in raphael-loads")
    if not TOOL_ROUTER.is_file():
        fail("tool use-case router file missing")

    criteria = json.loads(metadata["raphael-completion-criteria"])
    if not any("tool-usecase-router.md" in item for item in criteria):
        fail("completion criteria missing tool-usecase-router requirement")
    if not any("Messlatte" in item or "Motion-Hero" in item for item in criteria):
        fail("completion criteria missing Messlatte scenario requirement")
    if not any("160" in item or "Link-Dump" in item or "Linkliste" in item for item in criteria):
        fail("completion criteria missing anti link-dump requirement")

    # components step must force router-first with Bedarf/Default language nearby
    components_match = re.search(
        r"5\.\s+\*\*components\*\* —(.{0,4000}?)\n6\.\s+\*\*build\*\*",
        text,
        re.S,
    )
    if not components_match:
        fail("SKILL.md components step not found in expected numbered form")
    components = components_match.group(1)
    required = {
        "tool-usecase-router.md": "tool-usecase-router.md" in components,
        "erzwingung": any(
            verb in components.lower()
            for verb in ("zuerst", "pflicht", "kein überspringen", "muss", "freigabe für schritt")
        ),
        "Default": "Default" in components or "default" in components.lower(),
        "Install": "Install" in components or "install" in components.lower(),
        "frontend-referenzbibliothek.md": "frontend-referenzbibliothek.md" in components,
        "anti-full-install": (
            "nie die gesamte Liste" in components
            or "gesamte Liste" in components
            or "nie die gesamte" in components
        ),
    }
    for key, ok in required.items():
        if not ok:
            fail(f"components step missing forced router language: {key}")

    if "Werkzeugtabelle" not in components:
        fail("components step does not require the Werkzeugtabelle artifact")

    build_match = re.search(r"6\.\s+\*\*build\*\* —(.{0,2000}?)\n7\.\s+\*\*", text, re.S)
    if not build_match or "tool-usecase-router.md" not in build_match.group(1):
        fail("build step does not reference tool-usecase-router.md")
    build = build_match.group(1)
    if "npm i" not in build or "ohne" not in build.lower():
        fail("build step does not forbid installing without a Werkzeugtabelle row")
    if "Werkzeugtabelle" not in build:
        fail("build step does not reference the Werkzeugtabelle")

    gate_script = CANONICAL_DIR / "scripts" / "werkzeug-gate.mjs"
    if not gate_script.is_file():
        fail("werkzeug-gate.mjs missing")
    gate_text = gate_script.read_text(encoding="utf-8")
    for marker in ("framer-motion", "useReducedMotion", "package.json", "lucide-react"):
        if marker not in gate_text:
            fail(f"werkzeug-gate.mjs does not check: {marker}")

    qa_text = (CANONICAL_DIR / "references" / "qa-faecher.md").read_text(encoding="utf-8")
    if "werkzeug-gate.mjs" not in qa_text:
        fail("qa-faecher Fach 4 does not run the Werkzeug-Gate")

    criteria_blob = " ".join(criteria)
    if "Werkzeugtabelle" not in criteria_blob:
        fail("completion criteria missing Werkzeugtabelle artifact requirement")
    if "package.json" not in criteria_blob:
        fail("completion criteria missing dependency-coverage requirement")

    anti_dump_ok = any(
        needle in text
        for needle in (
            "Link-Dump",
            "Linkliste",
            "160er-Kandidatenliste",
            "160 Links",
            "nicht die 160",
        )
    )
    if not anti_dump_ok:
        fail("SKILL.md lacks anti link-dump guidance")

    router_text = TOOL_ROUTER.read_text(encoding="utf-8")
    for marker in (
        "npx shadcn@latest add accordion",
        "npx shadcn@latest add dialog",
        "lucide-react",
        "useReducedMotion",
        "bildgenerierung.md",
        "Messlatte-Szenario",
        "npm i lucide-react",
    ):
        if marker not in router_text:
            fail(f"tool use-case router missing concrete marker: {marker}")

    # Messlatte table must include the four install/use paths
    if "Messlatte-Szenario" not in router_text:
        fail("messlatte section missing")
    for marker in (
        "add accordion",
        "lucide-react",
        "bildgenerierung.md",
        "ui-components",
    ):
        # all four must appear before the detailed ### sections (schnellwahl)
        head = router_text.split("## Router nach Bedarf")[0]
        if marker not in head:
            fail(f"messlatte quick-table missing marker: {marker}")

    # Structural integrity: each ### section has Bedarf/Default/Install/Gate/Nie
    sections = re.split(r"\n###\s+", router_text)
    body_sections = sections[1:]
    if len(body_sections) < 10:
        fail(f"tool use-case router has too few ### sections ({len(body_sections)})")
    for raw in body_sections:
        title = raw.splitlines()[0].strip()
        for field in SECTION_FIELD_MARKERS:
            if field not in raw:
                fail(f"router section {title!r} missing field {field}")

    for need in REQUIRED_USE_CASES:
        if need.lower() not in router_text.lower():
            fail(f"required use-case family missing from router: {need}")

    # Router itself must not become a 160-link dump
    router_urls = re.findall(r"https?://[^)>\s]+", router_text)
    if len(set(router_urls)) > 25:
        fail(f"tool router looks like a link dump ({len(set(router_urls))} unique URLs)")

    library_text = FRONTEND_LIBRARY.read_text(encoding="utf-8")
    if "tool-usecase-router.md" not in library_text:
        fail("frontend library does not point back to tool-usecase-router.md")
    for marker, minimum in (
        ("**Bedarf:**", 9),
        ("**Default (Router):**", 9),
        ("**Gate:**", 9),
        ("**Nie:**", 9),
    ):
        if library_text.count(marker) < minimum:
            fail(
                f"frontend library use-case heads incomplete: {marker} "
                f"{library_text.count(marker)}x, mindestens {minimum} erwartet"
            )
    if "Ausgabe-Deckel" not in library_text:
        fail("frontend library missing output cap")
    # library heads should mention router section pointers
    if "Router §" not in library_text and "Router §" not in library_text.replace("§", "§"):
        if "Router" not in library_text:
            fail("frontend library use-case heads lack router pointers")

    library_urls = [url.rstrip("`.,;:") for url in re.findall(r"https?://[^)>\s]+", library_text)]
    if FRONTEND_SOURCE_URL not in library_urls:
        fail("frontend reference library source URL is missing")
    resource_urls = [url for url in library_urls if url != FRONTEND_SOURCE_URL]
    if len(set(resource_urls)) != 160:
        fail(
            "frontend reference library must contain exactly 160 unique resource URLs "
            f"(found {len(set(resource_urls))} unique)"
        )
    if MOBBIN_URL not in resource_urls:
        fail("neutral Mobbin URL is missing")
    if any(url.startswith(MOBBIN_AFFILIATE_PREFIX) for url in resource_urls):
        fail("Mobbin affiliate URL remains in the frontend reference library")

    codex_registry = codex_sync.load_registry()
    if codex_sync.validate_canonical_link("web", codex_registry["web"]):
        fail("Codex canonical-link validation failed")
    codex_web_registry = {"web": codex_registry["web"]}
    if codex_sync.expected_files(codex_web_registry, {}):
        fail("Codex builder would generate inside the canonical web bridge")

    kimi_registry = kimi_sync.load_registry()
    if kimi_sync.validate_canonical_link("web", kimi_registry["web"]):
        fail("Kimi canonical-link validation failed")
    kimi_web_registry = {"web": kimi_registry["web"]}
    if kimi_sync.expected_files(kimi_web_registry, {}):
        fail("Kimi builder would generate inside the canonical web bridge")

    print(f"Shared web identity: OK (sha256={canonical_hash})")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(f"Shared web identity: FAIL\n  - {exc}", file=sys.stderr)
        raise SystemExit(1)
