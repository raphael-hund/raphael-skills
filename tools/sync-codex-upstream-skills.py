#!/usr/bin/env python3
"""Build and safely install the pinned gstack Codex skill pack.

The command deliberately has a conservative default: it is a dry run.  An
explicit ``--apply`` is required before anything below the supplied roots is
created or changed.  Generation always happens in a disposable clone; the
canonical vendor checkout is never used as a generator output directory.
"""
from __future__ import annotations

import argparse
import ctypes
import errno
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import uuid
from pathlib import Path
from typing import Any, Iterable

REPO_ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = REPO_ROOT / "codex" / "upstream-skills.json"
DEFAULT_SOURCE_ROOT = Path("/root/tools/vendor/gstack")
DEFAULT_USER_ROOT = Path.home()
DEFAULT_SHARE_ROOT = DEFAULT_USER_ROOT / ".local" / "share" / "raphael-skills"
DEFAULT_STATE_ROOT = DEFAULT_USER_ROOT / ".local" / "state"

EXPECTED_HELPER_ID = "raphael.gstack-upstream-codex"
SCHEMA_VERSION = 1


class SyncError(RuntimeError):
    """A preflight or transactional safety failure."""


def _die(message: str) -> None:
    raise SyncError(message)


def _json_bytes(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2).encode("utf-8") + b"\n"


def registry_hash(path: Path = REGISTRY_PATH) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_registry(path: Path = REGISTRY_PATH) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise SyncError(f"registry missing: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SyncError(f"registry is not valid JSON: {exc}") from exc
    if not isinstance(data, dict) or data.get("schema_version") != SCHEMA_VERSION:
        _die("unsupported upstream registry schema")
    if data.get("helper_id") != EXPECTED_HELPER_ID:
        _die("registry helper_id mismatch")
    repo = data.get("repository")
    if not isinstance(repo, dict) or not re.fullmatch(r"[0-9a-f]{40}", str(repo.get("pinned_commit", ""))):
        _die("registry pinned_commit must be a 40-character SHA-1")
    if not isinstance(repo.get("url"), str) or not repo["url"].startswith("https://"):
        _die("registry repository URL is invalid")
    gen = data.get("generator")
    if not isinstance(gen, dict) or gen.get("command") != ["bun", "run", "gen:skill-docs", "--host", "codex"]:
        _die("registry must use the official Codex generator command")
    runtime_build = data.get("runtime_build")
    if (
        not isinstance(runtime_build, dict)
        or runtime_build.get("commands") != [["bun", "install", "--frozen-lockfile"], ["bun", "run", "build"]]
        or runtime_build.get("required_outputs") != ["browse/dist/browse", "browse/dist/find-browse", "browse/dist/server-node.mjs"]
    ):
        _die("registry must use the pinned official runtime build")
    sm = data.get("source_manifest")
    if not isinstance(sm, dict) or sm.get("expected_generated_count") != 54 or sm.get("expected_discoverable_count") != 54 or sm.get("expected_prefixed_count") != 53:
        _die("registry source manifest count is not the pinned 54 (53 prefixed + root)")
    for key in ("root_template", "skill_template_glob", "generated_prefix", "root_generated_directory", "excluded_source_directories"):
        if key not in sm:
            _die(f"registry source manifest missing {key}")
    if sm["excluded_source_directories"] != ["codex", "connect-chrome"]:
        _die("registry exclusions must remain explicit and deterministic")
    pack = data.get("pack")
    state = data.get("state")
    graph = data.get("link_graph")
    if not isinstance(pack, dict) or pack.get("root_template") != "{share_root}/gstack/{pinned_commit}-bridge-v5":
        _die("registry pack root template is invalid")
    migration = data.get("migration")
    if (
        not isinstance(migration, dict)
        or migration.get("accepted_prior_registry_sha256") != [
            "bc26955f27c36daa2a8bcca1adaa82fca19afd44d13b6363c9e6ffe8ff51f8e7",
            "c33d9e459af5b196ae697c48303e276c989d790a189b8b35cac5cc1c1659ac01",
            "bf02cf53774ee56c268796f5f8dc6bf3540d4e301fa808741c33526e5aee77bc",
            "aaa00a7ecdbdc7abb85c3bd93f21787f26cfdcc14b8eafbb7101ae043fc9fd09",
        ]
        or migration.get("accepted_prior_helper_versions") != ["1.0.0", "2.0.0", "3.0.0", "4.0.0"]
    ):
        _die("registry migration allowlist is invalid")
    if not isinstance(state, dict) or state.get("path_template") != "{state_root}/raphael-codex-skills/upstream-links.json":
        _die("registry state path template is invalid")
    if not isinstance(graph, dict):
        _die("registry link_graph is missing")
    for key in ("global_runtime_assets", "global_runtime_files", "sidecar_runtime_assets", "root_files"):
        if not isinstance(graph.get(key), list) or not graph[key] or any(not isinstance(x, str) or not x or Path(x).is_absolute() or ".." in Path(x).parts for x in graph[key]):
            _die(f"registry link_graph.{key} must contain safe relative paths")
    if graph["global_runtime_assets"] != ["bin", "browse/dist", "browse/bin", "gstack-upgrade", "ETHOS.md"] or graph["global_runtime_files"] != ["review/checklist.md", "review/TODOS-format.md"] or graph["sidecar_runtime_assets"] != ["bin", "browse", "review", "qa", "ETHOS.md"] or graph["root_files"] != ["SKILL.md", "agents/openai.yaml"] or graph.get("root_discovery_name") != "gstack-router":
        _die("registry runtime/link graph differs from the audited Codex host config")
    return data


def _run(args: list[str], cwd: Path, *, check: bool = True, timeout: int = 300) -> subprocess.CompletedProcess[str]:
    proc = subprocess.run(args, cwd=cwd, text=True, capture_output=True, timeout=timeout)
    if check and proc.returncode:
        detail = (proc.stderr or proc.stdout).strip()
        _die(f"command failed ({' '.join(args)}): {detail[-1000:]}")
    return proc


def validate_root(value: str | os.PathLike[str], label: str) -> Path:
    raw = os.fspath(value)
    if not raw or not raw.strip():
        _die(f"{label} cannot be empty")
    p = Path(raw)
    if not p.is_absolute():
        _die(f"{label} must be an absolute path")
    p = Path(os.path.normpath(raw))
    # A root, a standard system/home directory, or an otherwise very broad
    # path is never a valid test/install root.  Temp fixtures are deeper.
    broad = {"/", "/tmp", "/var", "/usr", "/opt", "/root", "/home", "/workspace", "/root/tools", "/root/raphael-skills"}
    if str(p) in broad or len(p.parts) < 3:
        _die(f"{label} is dangerously broad: {p}")
    if any(part in {".git", ".codex", ".agents"} for part in p.parts[1:]):
        _die(f"{label} must be a parent root, not an installed skill directory: {p}")
    for ancestor in p.parents:
        if ancestor == p.anchor:
            break
        if ancestor.is_symlink():
            _die(f"{label} traverses a symlinked parent: {ancestor}")
    return p


def validate_roots(user: Path, share: Path, state: Path) -> None:
    roots = {"user-root": user, "share-root": share, "state-root": state}
    for name, root in roots.items():
        if root.is_symlink() or (root.exists() and not root.is_dir()):
            _die(f"{name} must be an ordinary directory root: {root}")
    vals = list(roots.items())
    for i, (name_a, a) in enumerate(vals):
        for name_b, b in vals[i + 1:]:
            # The normal layout intentionally nests share/state below the
            # user's home root.  Only share/state overlap is unsafe; an
            # explicit user-root is still checked for broadness by the CLI.
            if a == b or (name_a != "user-root" and name_b != "user-root" and (a in b.parents or b in a.parents)):
                _die(f"{name_a} and {name_b} overlap")


def _tracked_clean(source: Path) -> None:
    if not (source / ".git").exists():
        _die(f"source root is not a git checkout: {source}")
    status = _run(["git", "status", "--porcelain", "--untracked-files=no"], source).stdout.strip()
    if status:
        _die(f"source checkout has tracked modifications: {status.splitlines()[0]}")
    _run(["git", "diff", "--cached", "--quiet"], source)


def validate_source_provenance(source: Path, registry: dict[str, Any]) -> str:
    source = source.resolve()
    _tracked_clean(source)
    commit = _run(["git", "rev-parse", "HEAD"], source).stdout.strip()
    expected = registry["repository"]["pinned_commit"]
    if commit != expected:
        _die(f"source HEAD {commit} is not pinned commit {expected}")
    remote = _run(["git", "config", "--get", "remote.origin.url"], source, check=False).stdout.strip()
    if remote and remote.rstrip("/") not in {registry["repository"]["url"].rstrip("/"), "git@github.com:garrytan/gstack.git"}:
        _die(f"source remote is foreign: {remote}")
    return commit


def validate_runtime_build(source: Path, registry: dict[str, Any]) -> None:
    missing = [rel for rel in registry["runtime_build"]["required_outputs"] if not (source / rel).is_file()]
    if missing:
        _die(f"pinned runtime build is incomplete: {missing}")
    for rel in ("browse/dist/browse", "browse/dist/find-browse"):
        if not os.access(source / rel, os.X_OK):
            _die(f"pinned runtime output is not executable: {source / rel}")


def prepare_runtime_build(source: Path, registry: dict[str, Any]) -> None:
    for command in registry["runtime_build"]["commands"]:
        _run(list(command), source, timeout=900)
    validate_source_provenance(source, registry)
    validate_runtime_build(source, registry)


def _frontmatter_name(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    if not text.strip():
        _die(f"empty skill template: {path}")
    match = re.search(r"^name:\s*([^\s#]+)\s*$", text, re.MULTILINE)
    if not match:
        _die(f"frontmatter name missing: {path}")
    return match.group(1).strip('"\'')


def derive_source_manifest(checkout: Path, registry: dict[str, Any]) -> tuple[list[dict[str, str]], dict[str, str]]:
    sm = registry["source_manifest"]
    root = checkout / sm["root_template"]
    if not root.is_file():
        _die(f"root source template missing: {root}")
    root_name = _frontmatter_name(root)
    if root_name != sm["root_generated_directory"]:
        _die(f"root source name {root_name!r} is not gstack")
    discovered: list[tuple[str, Path]] = []
    for path in sorted(checkout.glob(sm["skill_template_glob"])):
        if path.is_file() and path.name == "SKILL.md.tmpl":
            discovered.append((path.parent.name, path))
    excluded = set(sm["excluded_source_directories"])
    entries: list[dict[str, str]] = []
    names: set[str] = set()
    generated: set[str] = set()
    for directory, path in discovered:
        if directory in excluded:
            continue
        name = _frontmatter_name(path)
        if name in names:
            _die(f"duplicate source skill name: {name}")
        generated_name = name if name.startswith(sm["generated_prefix"]) else sm["generated_prefix"] + name
        if generated_name in generated:
            _die(f"duplicate generated skill name: {generated_name}")
        names.add(name)
        generated.add(generated_name)
        entries.append({"source": path.relative_to(checkout).as_posix(), "source_name": name, "generated_name": generated_name})
    expected = sm["expected_prefixed_count"]
    if len(entries) != expected:
        _die(f"source manifest count mismatch: expected {expected}, found {len(entries)}")
    return entries, {"source": root.relative_to(checkout).as_posix(), "source_name": root_name, "generated_name": "gstack"}


def _copy_tree(src: Path, dst: Path) -> None:
    if src.is_symlink():
        target = os.readlink(src)
        dst.parent.mkdir(parents=True, exist_ok=True)
        os.symlink(target, dst)
    elif src.is_dir():
        shutil.copytree(src, dst, symlinks=True)
    elif src.is_file():
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
    else:
        _die(f"runtime asset missing: {src}")


def _tree_hash(root: Path) -> str:
    h = hashlib.sha256()
    if not root.exists():
        return ""
    for path in sorted(root.rglob("*"), key=lambda p: p.relative_to(root).as_posix()):
        rel = path.relative_to(root).as_posix()
        if rel == "PACK-MANIFEST.json":
            continue
        h.update(rel.encode() + b"\0")
        if path.is_symlink():
            h.update(b"L\0" + os.readlink(path).encode() + b"\0")
        elif path.is_file():
            h.update(b"F\0" + path.read_bytes() + b"\0")
        elif path.is_dir():
            h.update(b"D\0")
        else:
            _die(f"unsupported pack entry: {path}")
    return h.hexdigest()


def _assert_no_escape(root: Path) -> None:
    for p in root.rglob("*"):
        if p.is_symlink():
            resolved = (p.parent / os.readlink(p)).resolve()
            if root not in resolved.parents and resolved != root:
                _die(f"pack symlink escapes immutable pack: {p} -> {os.readlink(p)}")


def validate_generated(checkout: Path, registry: dict[str, Any], entries: list[dict[str, str]], root_entry: dict[str, str]) -> None:
    generated_root = checkout / ".agents" / "skills"
    if not generated_root.is_dir():
        _die("official generator did not create .agents/skills")
    expected = {e["generated_name"] for e in entries}
    children = list(generated_root.iterdir())
    allowed_children = expected | {"gstack"}
    unexpected_children = [p.name for p in children if p.name not in allowed_children]
    if unexpected_children:
        _die(f"generated skill root has extra entries: {sorted(unexpected_children)}")
    if any(p.name != "gstack" and p.is_symlink() for p in children):
        _die("generated skill root contains an unexpected symlink")
    actual_dirs = {p.name for p in children if p.is_dir() and not p.is_symlink() and p.name != "gstack"}
    if actual_dirs != expected:
        _die(f"generated skill bijection mismatch (missing={sorted(expected - actual_dirs)}, extra={sorted(actual_dirs - expected)})")
    root_dir = generated_root / "gstack"
    if not root_dir.is_dir():
        _die("generated root sidecar gstack is missing")
    for entry in entries + [root_entry]:
        directory = generated_root / entry["generated_name"]
        skill = directory / "SKILL.md"
        meta = directory / "agents" / "openai.yaml"
        if not skill.is_file() or not skill.read_text(encoding="utf-8").strip():
            _die(f"generated skill missing/nonempty SKILL.md: {skill}")
        if not meta.is_file() or not meta.read_text(encoding="utf-8").strip():
            _die(f"generated skill missing/nonempty openai.yaml: {meta}")
        text = skill.read_text(encoding="utf-8")
        name_match = re.search(r"^name:\s*([^\s#]+)", text, re.MULTILINE)
        if not name_match:
            _die(f"generated frontmatter name missing: {skill}")
        generated_name = name_match.group(1).strip('"\'')
        if entry["generated_name"] == "gstack":
            if generated_name != "gstack":
                _die(f"generated root frontmatter name mismatch: {generated_name}")
        # The official external-host generator prefixes the *directory* while
        # preserving the source frontmatter name (for example directory
        # gstack-autoplan, frontmatter name: autoplan).  Validate that exact
        # source→directory bijection rather than inventing a non-official
        # frontmatter rewrite.
        elif generated_name != entry["source_name"] or not entry["generated_name"].startswith(registry["source_manifest"]["generated_prefix"]):
            _die(f"generated frontmatter/name mismatch: {skill}")
    # Empty files and unexpected symlinked skill content are rejected.  The
    # official Codex generator produces regular files only in these dirs.
    for directory in [generated_root / e["generated_name"] for e in entries] + [root_dir]:
        for p in directory.rglob("*"):
            if p.is_file() and not p.read_bytes():
                _die(f"empty generated dependency: {p}")
            if p.is_symlink():
                _die(f"unexpected generated symlink: {p}")


def build_pack(checkout: Path, runtime_source: Path, registry: dict[str, Any], entries: list[dict[str, str]], root_entry: dict[str, str], temp_root: Path) -> tuple[Path, str]:
    pack = temp_root / "pack"
    skills = pack / "skills"
    root = pack / "root"
    runtime = pack / "runtime"
    skills.mkdir(parents=True)
    generated_root = checkout / ".agents" / "skills"
    for entry in entries:
        _copy_tree(generated_root / entry["generated_name"], skills / entry["generated_name"])
    _copy_tree(generated_root / "gstack", root)
    graph = registry["link_graph"]
    runtime_sources: set[str] = set(graph["global_runtime_assets"] + graph["global_runtime_files"])
    runtime_sources.update(graph["sidecar_runtime_assets"])
    # A sidecar asset such as ``browse`` covers the global ``browse/bin`` and
    # ``browse/dist`` entries.  Copy each source tree once, from shallowest to
    # deepest, so copytree never collides with an already copied parent.
    selected: list[str] = []
    for rel in sorted(runtime_sources, key=lambda x: (len(Path(x).parts), x)):
        if any(Path(rel) == Path(parent) or Path(parent) in Path(rel).parents for parent in selected):
            continue
        selected.append(rel)
    for rel in selected:
        _copy_tree(runtime_source / rel, runtime / rel)
    # Runtime assets are dependencies of the generated skills, not additional
    # discovery entries.  Some upstream asset directories also carry their
    # source SKILL.md/SKILL.md.tmpl; retaining those would expose duplicate
    # identities (browse, qa, review, gstack-upgrade) to recursive loaders.
    for candidate in list(runtime.rglob("SKILL.md")) + list(runtime.rglob("SKILL.md.tmpl")):
        if candidate.is_symlink() or candidate.is_file():
            candidate.unlink()
    runtime_skill_files = [p for p in runtime.rglob("SKILL.md") if p.is_file() or p.is_symlink()]
    runtime_templates = [p for p in runtime.rglob("SKILL.md.tmpl") if p.is_file() or p.is_symlink()]
    if runtime_skill_files or runtime_templates:
        _die("runtime pack still contains discoverable skill documents")
    skill_files = [root / "SKILL.md"] + [skills / e["generated_name"] / "SKILL.md" for e in entries]
    if len(skill_files) != registry["source_manifest"]["expected_discoverable_count"] or any(not p.is_file() for p in skill_files):
        _die("pack does not contain exactly the registered discoverable skill documents")
    identities = [_frontmatter_name(p) for p in skill_files]
    if len(identities) != len(set(identities)):
        _die("pack contains duplicate effective skill identities")
    _assert_no_escape(pack)
    digest = _tree_hash(pack)
    marker = {
        "schema_version": SCHEMA_VERSION,
        "helper_id": registry["helper_id"],
        "helper_version": registry["helper_version"],
        "pinned_commit": registry["repository"]["pinned_commit"],
        "registry_sha256": registry_hash(),
        "generated_discoverable_count": len(entries),
        "tree_sha256": digest,
    }
    (pack / registry["pack"]["manifest_file"]).write_bytes(_json_bytes(marker))
    return pack, digest


def clone_and_generate(source: Path, registry: dict[str, Any], work: Path) -> tuple[Path, list[dict[str, str]], dict[str, str]]:
    entries, root_entry = derive_source_manifest(source, registry)
    clone = work / "checkout"
    _run(["git", "clone", "--quiet", "--no-hardlinks", str(source), str(clone)], work)
    _run(["git", "checkout", "--quiet", registry["repository"]["pinned_commit"]], clone)
    # This is intentionally the literal, audited command from hosts/codex.ts.
    _run(list(registry["generator"]["command"]), clone, timeout=900)
    validate_generated(clone, registry, entries, root_entry)
    return clone, entries, root_entry


def _pack_paths(registry: dict[str, Any], share: Path, commit: str) -> tuple[Path, Path]:
    root = Path(registry["pack"]["root_template"].format(share_root=share, pinned_commit=commit))
    if not root.is_absolute() or root.name != f"{commit}-bridge-v5":
        _die("pack root resolved unexpectedly")
    return root, root.parent


def _desired_links(registry: dict[str, Any], user: Path, pack: Path, source: Path, entries: list[dict[str, str]]) -> list[dict[str, str]]:
    graph = registry["link_graph"]
    out: list[dict[str, str]] = []
    def add(ident: str, destination: Path, target: Path) -> None:
        out.append({"id": ident, "destination": str(destination), "target": str(target)})
    global_root = user / ".codex" / "skills" / "gstack"
    sidecar_root = user / ".agents" / "skills" / "gstack"
    for rel in graph["global_runtime_assets"] + graph["global_runtime_files"]:
        # Upstream's official Codex runtime root intentionally exposes the
        # generated upgrade skill here because every generated preamble reads
        # $GSTACK_ROOT/gstack-upgrade/SKILL.md.  It is omitted from the flat
        # discovery links below, so recursive loaders still see it once.
        target = pack / "skills" / "gstack-upgrade" if rel == "gstack-upgrade" else source / rel
        add("global-runtime:" + rel, global_root / rel, target)
    # Codex discovers a linked skill directory, but does not treat a SKILL.md
    # symlink nested in an ordinary runtime container as a catalog entry. Keep
    # the runtime-only sidecar document-free and expose the generated root via
    # one standalone directory link whose frontmatter identity remains gstack.
    add("discovery:gstack-router", user / ".agents" / "skills" / graph["root_discovery_name"], pack / "root")
    for rel in graph["sidecar_runtime_assets"]:
        target = source / rel if rel in {"bin", "ETHOS.md"} else pack / "runtime" / rel
        add("sidecar-runtime:" + rel, sidecar_root / rel, target)
    for entry in entries:
        if entry["generated_name"] == "gstack-upgrade":
            continue
        add("discovery:" + entry["generated_name"], user / ".agents" / "skills" / entry["generated_name"], pack / "skills" / entry["generated_name"])
    return out


def _normalize_target(destination: Path, raw: str) -> str:
    target = Path(raw)
    return str((destination.parent / target).resolve()) if not target.is_absolute() else str(target.resolve())


def _read_current_link(destination: Path) -> str | None:
    if not destination.is_symlink():
        return None
    return _normalize_target(destination, os.readlink(destination))


def _validate_directory_prefix(path: Path) -> None:
    """lstat every existing component without ever following a symlink."""
    if not path.is_absolute():
        _die(f"path must be absolute: {path}")
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current /= part
        try:
            st = os.lstat(current)
        except FileNotFoundError:
            return
        if os.path.islink(current):
            _die(f"path traverses a symlinked component: {current}")
        if not os.path.isdir(current):
            _die(f"path component is not a directory: {current}")


def _open_directory_fd(path: Path, *, create: bool) -> int:
    """Open an absolute directory via no-follow dirfd traversal.

    Returning the final fd makes later leaf operations immune to a parent
    path being swapped after validation.
    """
    if not path.is_absolute():
        _die(f"path must be absolute: {path}")
    flags = os.O_RDONLY | os.O_DIRECTORY
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    fd = os.open(path.anchor, flags)
    try:
        for part in path.parts[1:]:
            try:
                next_fd = os.open(part, flags, dir_fd=fd)
            except FileNotFoundError:
                if not create:
                    raise
                try:
                    os.mkdir(part, mode=0o755, dir_fd=fd)
                except FileExistsError:
                    pass
                try:
                    next_fd = os.open(part, flags, dir_fd=fd)
                except OSError as exc:
                    raise SyncError(f"directory component changed during creation: {path}") from exc
            except OSError as exc:
                raise SyncError(f"unsafe directory component below {path}: {part}") from exc
            os.close(fd)
            fd = next_fd
        return fd
    except Exception:
        os.close(fd)
        raise


def _link_snapshot(path: Path) -> tuple[int, int, str] | None:
    try:
        fd = _open_directory_fd(path.parent, create=False)
    except FileNotFoundError:
        return None
    try:
        try:
            st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            return None
        if (st.st_mode & 0o170000) != 0o120000:
            _die(f"link destination is not a symlink: {path}")
        raw = os.readlink(path.name, dir_fd=fd)
        return st.st_dev, st.st_ino, raw
    finally:
        os.close(fd)


def _unlink_link_if_owned(path: Path, owned: tuple[int, int, str]) -> bool:
    """Unlink only the exact symlink inode/target created or attested by us."""
    try:
        fd = _open_directory_fd(path.parent, create=False)
    except FileNotFoundError:
        return True
    try:
        try:
            st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            return True
        if (st.st_dev, st.st_ino) != owned[:2] or (st.st_mode & 0o170000) != 0o120000:
            return False
        try:
            raw = os.readlink(path.name, dir_fd=fd)
        except OSError:
            return False
        if raw != owned[2]:
            return False
        os.unlink(path.name, dir_fd=fd)
        return True
    finally:
        os.close(fd)


def _create_link_no_clobber(path: Path, target: str) -> tuple[int, int, str]:
    fd = _open_directory_fd(path.parent, create=True)
    try:
        try:
            os.symlink(target, path.name, dir_fd=fd)
        except FileExistsError as exc:
            raise SyncError(f"destination appeared during apply: {path}") from exc
        st = os.stat(path.name, dir_fd=fd, follow_symlinks=False)
        raw = os.readlink(path.name, dir_fd=fd)
        return st.st_dev, st.st_ino, raw
    finally:
        os.close(fd)


def _validate_destination_parent(path: Path) -> None:
    _validate_directory_prefix(path.parent)


def _state_expected(registry: dict[str, Any], state_path: Path, links: list[dict[str, str]], pack: Path, commit: str) -> dict[str, Any]:
    return {
        "schema_version": SCHEMA_VERSION,
        "helper_id": registry["helper_id"],
        "helper_version": registry["helper_version"],
        "registry_sha256": registry_hash(),
        "pinned_commit": commit,
        "pack_root": str(pack),
        "links": links,
    }


def validate_existing_state(state_path: Path, registry: dict[str, Any], desired: list[dict[str, str]], pack: Path, commit: str) -> tuple[dict[str, Any] | None, bytes | None]:
    if not state_path.exists():
        return None, None
    if state_path.is_symlink() or not state_path.is_file():
        _die(f"state path is not a regular file: {state_path}")
    previous_bytes = state_path.read_bytes()
    try:
        previous = json.loads(previous_bytes.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise SyncError(f"malformed state file: {state_path}") from exc
    required = {"schema_version", "helper_id", "helper_version", "registry_sha256", "pinned_commit", "pack_root", "links"}
    if not isinstance(previous, dict) or set(previous) != required:
        _die("state schema is foreign or incomplete")
    current_registry_hash = registry_hash()
    prior_hashes = set(registry["migration"]["accepted_prior_registry_sha256"])
    is_current = previous["registry_sha256"] == current_registry_hash
    is_allowed_prior = (
        previous["registry_sha256"] in prior_hashes
        and previous["helper_version"] in registry["migration"]["accepted_prior_helper_versions"]
    )
    if previous["schema_version"] != SCHEMA_VERSION or previous["helper_id"] != registry["helper_id"] or not (is_current or is_allowed_prior):
        _die("state schema/helper/registry hash mismatch")
    if previous["pinned_commit"] != commit or not isinstance(previous["pack_root"], str) or not Path(previous["pack_root"]).is_absolute():
        _die("state provenance mismatch")
    previous_pack = Path(previous["pack_root"])
    allowed_pack_names = {pack.name}
    if is_allowed_prior:
        allowed_pack_names.update({commit, f"{commit}-bridge-v2", f"{commit}-bridge-v3", f"{commit}-bridge-v4"})
    if previous_pack.parent != pack.parent or previous_pack.name not in allowed_pack_names:
        _die("state pack_root is outside the registered immutable pack namespace")
    if is_current and previous_pack != pack:
        _die("current state does not reference the current immutable pack")
    links = previous["links"]
    if not isinstance(links, list) or any(not isinstance(x, dict) or set(x) != {"id", "destination", "target"} for x in links):
        _die("state links are malformed")
    ids = [x["id"] for x in links]
    destinations = [x["destination"] for x in links]
    if len(ids) != len(set(ids)) or len(destinations) != len(set(destinations)) or any(not isinstance(i, str) or not isinstance(d, str) or not isinstance(x["target"], str) or not Path(d).is_absolute() or not Path(x["target"]).is_absolute() for i, d, x in zip(ids, destinations, links)):
        _die("state links must have unique absolute ids and destinations")
    desired_by_id = {x["id"]: x for x in desired}
    desired_ids = set(desired_by_id)
    prior_ids = set(ids)
    prior_v4_ids = (desired_ids - {"discovery:gstack-router"}) | {"root-skill", "root-manifest"}
    allowed_prior_id_sets = {
        frozenset(prior_v4_ids),
        frozenset(prior_v4_ids | {"discovery:gstack-upgrade"}),
    }
    is_registered_migration = is_allowed_prior and frozenset(prior_ids) in allowed_prior_id_sets
    if prior_ids != desired_ids and not is_registered_migration:
        _die("state does not attest the complete registered link graph")
    discovery_parents = {
        Path(item["destination"]).parent
        for item in desired
        if item["id"].startswith("discovery:")
    }
    if len(discovery_parents) != 1:
        _die("registered discovery graph does not have one parent")
    discovery_parent = next(iter(discovery_parents))
    retired_destinations = {
        "discovery:gstack-upgrade": discovery_parent / "gstack-upgrade",
        "root-skill": discovery_parent / "gstack" / "SKILL.md",
        "root-manifest": discovery_parent / "gstack" / "agents" / "openai.yaml",
    }
    retired_targets = {
        "discovery:gstack-upgrade": previous_pack / "skills" / "gstack-upgrade",
        "root-skill": previous_pack / "root" / "SKILL.md",
        "root-manifest": previous_pack / "root" / "agents" / "openai.yaml",
    }
    for old in links:
        dest = Path(old["destination"])
        if old["id"] in retired_destinations and is_registered_migration:
            if dest != retired_destinations[old["id"]] or Path(old["target"]) != retired_targets[old["id"]]:
                _die("retired discovery link is not the exact prior registered link")
        elif old["destination"] != desired_by_id[old["id"]]["destination"]:
            _die(f"state destination is not the registered destination: {dest}")
        old_target = Path(old["target"])
        if is_current and old["id"] in desired_by_id:
            if old["target"] != desired_by_id[old["id"]]["target"]:
                _die(f"current state target is not the registered target: {old_target}")
        elif old["id"] in desired_by_id:
            new_target = Path(desired_by_id[old["id"]]["target"])
            expected_prior_target = previous_pack / new_target.relative_to(pack) if new_target == pack or pack in new_target.parents else new_target
            if old_target != expected_prior_target:
                _die(f"prior state target is not the registered prior target: {old_target}")
        if _read_current_link(dest) != _normalize_target(dest, old["target"]):
            _die(f"current link does not match prior valid state: {dest}")
    return previous, previous_bytes


def validate_graph(desired: list[dict[str, str]], previous: dict[str, Any] | None) -> dict[str, str]:
    prior_by_dest = {x["destination"]: x["target"] for x in (previous or {}).get("links", [])}
    current: dict[str, str] = {}
    for item in desired:
        dest = Path(item["destination"])
        _validate_destination_parent(dest)
        if dest.exists() or dest.is_symlink():
            if not dest.is_symlink():
                _die(f"unrecorded file/directory at link destination: {dest}")
            actual = _read_current_link(dest)
            expected = _normalize_target(dest, item["target"])
            if actual != expected and str(dest) not in prior_by_dest:
                _die(f"foreign symlink at destination: {dest}")
            current[str(dest)] = actual or ""
        else:
            current[str(dest)] = ""
    return prior_by_dest


def validate_managed_containers(user: Path, desired: list[dict[str, str]], previous: dict[str, Any] | None = None) -> None:
    """Reject foreign entries in the two managed gstack containers.

    Unrelated user skills are deliberately left alone, but every existing
    ``gstack``/``gstack-*`` entry and every child below the two fixed gstack
    roots must be registered in the graph.  This makes a typo or foreign link
    fail closed instead of being silently shadowed by a later install.
    """
    destinations = {Path(item["destination"]) for item in desired}
    destinations.update(Path(item["destination"]) for item in (previous or {}).get("links", []))
    discovery_parent = user / ".agents" / "skills"
    if discovery_parent.is_dir() and not discovery_parent.is_symlink():
        for child in discovery_parent.iterdir():
            if child.name == "gstack" or child.name.startswith("gstack-"):
                if child not in destinations and not any(child in d.parents for d in destinations):
                    _die(f"unrecorded gstack discovery entry: {child}")
    for container in (user / ".codex" / "skills" / "gstack", user / ".agents" / "skills" / "gstack"):
        if not container.exists():
            continue
        if container.is_symlink() or not container.is_dir():
            _die(f"managed gstack container is not a real directory: {container}")
        allowed_children = {p.relative_to(container).parts[0] for p in destinations if container in p.parents}
        for child in container.iterdir():
            if child.name not in allowed_children:
                if (
                    container == user / ".agents" / "skills" / "gstack"
                    and child.name == "agents"
                    and child.is_dir()
                    and not child.is_symlink()
                    and not any(child.iterdir())
                ):
                    # bridge-v4 linked agents/openai.yaml into the runtime
                    # sidecar. Its parent directory remains after retiring
                    # that link and is removed during the next apply.
                    continue
                _die(f"unrecorded entry below managed gstack container: {child}")


def remove_empty_legacy_sidecar_directory(user: Path) -> None:
    """Remove only bridge-v4's attested, now-empty sidecar agents directory."""
    sidecar = user / ".agents" / "skills" / "gstack"
    try:
        sidecar_fd = _open_directory_fd(sidecar, create=False)
    except FileNotFoundError:
        return
    flags = os.O_RDONLY | os.O_DIRECTORY | getattr(os, "O_NOFOLLOW", 0)
    try:
        try:
            agents_fd = os.open("agents", flags, dir_fd=sidecar_fd)
        except FileNotFoundError:
            return
        except OSError as exc:
            raise SyncError(f"legacy sidecar agents entry is unsafe: {sidecar / 'agents'}") from exc
        try:
            if os.listdir(agents_fd):
                _die(f"legacy sidecar agents directory is not empty: {sidecar / 'agents'}")
        finally:
            os.close(agents_fd)
        try:
            os.rmdir("agents", dir_fd=sidecar_fd)
        except OSError as exc:
            raise SyncError(f"legacy sidecar agents directory changed during cleanup: {sidecar / 'agents'}") from exc
    finally:
        os.close(sidecar_fd)


def validate_live_catalog(desired: list[dict[str, str]], expected_count: int) -> None:
    """Prove that the installed graph exposes one document per identity."""
    skill_documents: list[Path] = []
    for item in desired:
        ident = item["id"]
        destination = Path(item["destination"])
        target = Path(item["target"])
        if ident.startswith("discovery:"):
            skill_documents.append(destination / "SKILL.md")
        elif ident == "global-runtime:gstack-upgrade":
            skill_documents.append(destination / "SKILL.md")
            if target.name != "gstack-upgrade" or target.parent.name != "skills":
                _die("upgrade runtime path does not target the official generated skill")
        elif "runtime:" in ident:
            if target.is_dir() and any(p.name in {"SKILL.md", "SKILL.md.tmpl"} for p in target.rglob("*")):
                _die(f"runtime dependency exposes a nested skill document: {target}")
            if target.name in {"SKILL.md", "SKILL.md.tmpl"}:
                _die(f"runtime dependency is a skill document: {target}")
    if len(skill_documents) != expected_count or any(not p.is_file() for p in skill_documents):
        _die(f"live catalog does not expose exactly {expected_count} skill documents")
    identities = [_frontmatter_name(p) for p in skill_documents]
    if len(identities) != len(set(identities)):
        duplicates = sorted({name for name in identities if identities.count(name) > 1})
        _die(f"live catalog contains duplicate skill identities: {duplicates}")


def _ensure_dir(path: Path) -> None:
    fd = _open_directory_fd(path, create=True)
    os.close(fd)


def _copy_tree_into_fd(source: Path, destination_fd: int) -> None:
    """Copy a trusted staged tree without resolving the destination by path."""
    for child in sorted(source.iterdir(), key=lambda p: p.name):
        st = os.lstat(child)
        if (st.st_mode & 0o170000) == 0o120000:
            os.symlink(os.readlink(child), child.name, dir_fd=destination_fd)
        elif (st.st_mode & 0o170000) == 0o040000:
            os.mkdir(child.name, st.st_mode & 0o777, dir_fd=destination_fd)
            flags = os.O_RDONLY | os.O_DIRECTORY
            if hasattr(os, "O_NOFOLLOW"):
                flags |= os.O_NOFOLLOW
            child_fd = os.open(child.name, flags, dir_fd=destination_fd)
            try:
                _copy_tree_into_fd(child, child_fd)
            finally:
                os.close(child_fd)
        elif (st.st_mode & 0o170000) == 0o100000:
            source_flags = os.O_RDONLY
            destination_flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL
            if hasattr(os, "O_NOFOLLOW"):
                source_flags |= os.O_NOFOLLOW
                destination_flags |= os.O_NOFOLLOW
            source_fd = os.open(child, source_flags)
            target_fd = os.open(child.name, destination_flags, st.st_mode & 0o777, dir_fd=destination_fd)
            try:
                while True:
                    chunk = os.read(source_fd, 1024 * 1024)
                    if not chunk:
                        break
                    view = memoryview(chunk)
                    while view:
                        written = os.write(target_fd, view)
                        view = view[written:]
                os.fsync(target_fd)
            finally:
                os.close(target_fd)
                os.close(source_fd)
        else:
            _die(f"unsupported staged pack entry: {child}")


def _remove_tree_at(parent_fd: int, name: str, owned: tuple[int, int], *, _test_hook: Any | None = None) -> bool:
    """Remove a created directory only while its device/inode remain ours."""
    try:
        st = os.stat(name, dir_fd=parent_fd, follow_symlinks=False)
    except FileNotFoundError:
        return True
    if (st.st_dev, st.st_ino) != owned or (st.st_mode & 0o170000) != 0o040000:
        return False
    flags = os.O_RDONLY | os.O_DIRECTORY
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    if _test_hook is not None:
        _test_hook("before-cleanup-open", parent_fd, name)
    directory_fd = os.open(name, flags, dir_fd=parent_fd)
    try:
        opened = os.fstat(directory_fd)
        if (opened.st_dev, opened.st_ino) != owned:
            return False
        for child_name in os.listdir(directory_fd):
            child_st = os.stat(child_name, dir_fd=directory_fd, follow_symlinks=False)
            if (child_st.st_mode & 0o170000) == 0o040000:
                if not _remove_tree_at(
                    directory_fd,
                    child_name,
                    (child_st.st_dev, child_st.st_ino),
                    _test_hook=_test_hook,
                ):
                    return False
            else:
                # Every child belongs to our unpredictable staging directory;
                # compare its inode immediately before unlinking.
                check = os.stat(child_name, dir_fd=directory_fd, follow_symlinks=False)
                if (check.st_dev, check.st_ino) != (child_st.st_dev, child_st.st_ino):
                    return False
                os.unlink(child_name, dir_fd=directory_fd)
    finally:
        os.close(directory_fd)
    check = os.stat(name, dir_fd=parent_fd, follow_symlinks=False)
    if (check.st_dev, check.st_ino) != owned:
        return False
    os.rmdir(name, dir_fd=parent_fd)
    return True


def _directory_fd_matches_path(fd: int, path: Path) -> bool:
    try:
        path_st = os.lstat(path)
    except FileNotFoundError:
        return False
    fd_st = os.fstat(fd)
    return (path_st.st_mode & 0o170000) == 0o040000 and (path_st.st_dev, path_st.st_ino) == (fd_st.st_dev, fd_st.st_ino)


def _rename_noreplace(parent_fd: int, source_name: str, destination_name: str) -> None:
    libc = ctypes.CDLL(None, use_errno=True)
    renameat2 = getattr(libc, "renameat2", None)
    if renameat2 is None:
        _die("secure renameat2(RENAME_NOREPLACE) is unavailable")
    renameat2.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p, ctypes.c_uint]
    renameat2.restype = ctypes.c_int
    result = renameat2(parent_fd, os.fsencode(source_name), parent_fd, os.fsencode(destination_name), 1)
    if result != 0:
        error = ctypes.get_errno()
        if error == errno.EEXIST:
            _die(f"immutable pack appeared during promotion: {destination_name}")
        raise SyncError(f"secure immutable pack promotion failed: {os.strerror(error)}")


def promote_pack(
    pack_stage: Path,
    pack: Path,
    share_parent: Path,
    expected_hash: str,
    registry: dict[str, Any],
    *,
    _test_hook: Any | None = None,
) -> None:
    _ensure_dir(share_parent)
    parent_fd = _open_directory_fd(share_parent, create=False)
    stage_name = "." + pack.name + ".staging-" + uuid.uuid4().hex
    stage_owned: tuple[int, int] | None = None
    promoted = False
    try:
        try:
            existing = os.stat(pack.name, dir_fd=parent_fd, follow_symlinks=False)
        except FileNotFoundError:
            existing = None
        if existing is not None:
            if (existing.st_mode & 0o170000) != 0o040000:
                _die(f"foreign immutable pack path: {pack}")
            validate_existing_pack(Path(f"/proc/self/fd/{parent_fd}") / pack.name, expected_hash, registry)
            return
        os.mkdir(stage_name, 0o755, dir_fd=parent_fd)
        stage_st = os.stat(stage_name, dir_fd=parent_fd, follow_symlinks=False)
        stage_owned = (stage_st.st_dev, stage_st.st_ino)
        flags = os.O_RDONLY | os.O_DIRECTORY
        if hasattr(os, "O_NOFOLLOW"):
            flags |= os.O_NOFOLLOW
        stage_fd = os.open(stage_name, flags, dir_fd=parent_fd)
        try:
            _copy_tree_into_fd(pack_stage, stage_fd)
        finally:
            os.close(stage_fd)
        validate_existing_pack(Path(f"/proc/self/fd/{parent_fd}") / stage_name, expected_hash, registry)
        if _test_hook is not None:
            _test_hook("before-promote", share_parent)
        if not _directory_fd_matches_path(parent_fd, share_parent):
            _die(f"immutable pack parent changed during promotion: {share_parent}")
        _rename_noreplace(parent_fd, stage_name, pack.name)
        promoted = True
        if not _directory_fd_matches_path(parent_fd, share_parent):
            if not _remove_tree_at(parent_fd, pack.name, stage_owned):
                _die("pack parent changed and promoted pack could not be safely recovered")
            promoted = False
            _die(f"immutable pack parent changed during promotion: {share_parent}")
    finally:
        if stage_owned is not None and not promoted:
            try:
                if not _remove_tree_at(parent_fd, stage_name, stage_owned):
                    _die(f"staging pack was concurrently replaced: {stage_name}")
            except FileNotFoundError:
                pass
        os.close(parent_fd)


def validate_existing_pack(pack: Path, expected_hash: str, registry: dict[str, Any]) -> None:
    if pack.exists() or pack.is_symlink():
        if pack.is_symlink() or not pack.is_dir():
            _die(f"foreign immutable pack path: {pack}")
        marker_path = pack / registry["pack"]["manifest_file"]
        if not marker_path.is_file():
            _die(f"immutable pack has no manifest: {pack}")
        try:
            marker = json.loads(marker_path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise SyncError(f"immutable pack manifest malformed: {pack}") from exc
        if marker.get("helper_id") != registry["helper_id"] or marker.get("pinned_commit") != registry["repository"]["pinned_commit"] or marker.get("registry_sha256") != registry_hash() or marker.get("tree_sha256") != expected_hash or _tree_hash(pack) != expected_hash:
            _die(f"immutable pack differs from the validated pinned pack: {pack}")


def _file_snapshot(path: Path) -> tuple[int, int, str] | None:
    try:
        parent_fd = _open_directory_fd(path.parent, create=False)
    except FileNotFoundError:
        return None
    try:
        try:
            st = os.stat(path.name, dir_fd=parent_fd, follow_symlinks=False)
        except FileNotFoundError:
            return None
        if (st.st_mode & 0o170000) != 0o100000:
            _die(f"state path is not a regular file: {path}")
        flags = os.O_RDONLY
        if hasattr(os, "O_NOFOLLOW"):
            flags |= os.O_NOFOLLOW
        fd = os.open(path.name, flags, dir_fd=parent_fd)
        try:
            payload = b""
            while True:
                chunk = os.read(fd, 1024 * 1024)
                if not chunk:
                    break
                payload += chunk
        finally:
            os.close(fd)
        return st.st_dev, st.st_ino, hashlib.sha256(payload).hexdigest()
    finally:
        os.close(parent_fd)


def _write_temp_file(parent_fd: int, name: str, payload: bytes) -> tuple[int, int, str]:
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL
    if hasattr(os, "O_NOFOLLOW"):
        flags |= os.O_NOFOLLOW
    fd = os.open(name, flags, 0o600, dir_fd=parent_fd)
    try:
        view = memoryview(payload)
        while view:
            written = os.write(fd, view)
            view = view[written:]
        os.fsync(fd)
        st = os.fstat(fd)
        return st.st_dev, st.st_ino, hashlib.sha256(payload).hexdigest()
    finally:
        os.close(fd)


def _unlink_file_if_owned(path: Path, owned: tuple[int, int, str]) -> bool:
    current = _file_snapshot(path)
    if current is None:
        return True
    if current != owned:
        return False
    parent_fd = _open_directory_fd(path.parent, create=False)
    try:
        # Recheck through the same parent fd immediately before unlink.
        st = os.stat(path.name, dir_fd=parent_fd, follow_symlinks=False)
        if (st.st_dev, st.st_ino) != owned[:2] or (st.st_mode & 0o170000) != 0o100000:
            return False
        os.unlink(path.name, dir_fd=parent_fd)
        return True
    finally:
        os.close(parent_fd)


def transactional_links(
    desired: list[dict[str, str]],
    state_path: Path,
    state_obj: dict[str, Any],
    previous_bytes: bytes | None,
    previous: dict[str, Any] | None,
    *,
    retired: list[dict[str, str]] | None = None,
    _test_hook: Any | None = None,
) -> None:
    operations: list[dict[str, Any]] = []
    state_tmp: tuple[Path, tuple[int, int, str]] | None = None
    state_installed: tuple[int, int, str] | None = None
    inject_raw = os.environ.get("GSTACK_SYNC_INJECT_FAILURE_AFTER", "")
    inject = int(inject_raw) if inject_raw.isdigit() else None
    prior_targets = {x["destination"]: x["target"] for x in (previous or {}).get("links", [])}
    try:
        for item in retired or []:
            dest = Path(item["destination"])
            old_owned = _link_snapshot(dest)
            if old_owned is None or _normalize_target(dest, old_owned[2]) != _normalize_target(dest, item["target"]):
                _die(f"retired destination changed during apply: {dest}")
            if not _unlink_link_if_owned(dest, old_owned):
                _die(f"retired destination raced during apply: {dest}")
            operations.append({"destination": dest, "old": old_owned, "new": None})
        for index, item in enumerate(desired, start=1):
            dest, target = Path(item["destination"]), Path(item["target"])
            expected = _normalize_target(dest, str(target))
            old_owned = _link_snapshot(dest)
            actual = _normalize_target(dest, old_owned[2]) if old_owned else None
            if actual == expected:
                continue
            if old_owned is not None:
                prior = prior_targets.get(str(dest))
                if prior is None or actual != _normalize_target(dest, prior):
                    _die(f"destination changed during apply: {dest}")
                if not _unlink_link_if_owned(dest, old_owned):
                    _die(f"destination raced during apply: {dest}")
            op = {"destination": dest, "old": old_owned, "new": None}
            operations.append(op)
            op["new"] = _create_link_no_clobber(dest, str(target))
            if _test_hook is not None:
                _test_hook("after-link", dest)
            if inject is not None and index >= inject:
                _die("injected failure for rollback test")
        state_before = _file_snapshot(state_path)
        if previous_bytes is None:
            if state_before is not None:
                _die(f"state appeared during apply: {state_path}")
        elif state_before is None or state_before[2] != hashlib.sha256(previous_bytes).hexdigest():
            _die(f"state changed during apply: {state_path}")
        state_parent_fd = _open_directory_fd(state_path.parent, create=True)
        try:
            tmp_name = "." + state_path.name + ".tmp-" + uuid.uuid4().hex
            tmp_path = state_path.parent / tmp_name
            tmp_owned = _write_temp_file(state_parent_fd, tmp_name, _json_bytes(state_obj))
            state_tmp = (tmp_path, tmp_owned)
            if _file_snapshot(state_path) != state_before:
                _die(f"state raced during apply: {state_path}")
            os.replace(tmp_name, state_path.name, src_dir_fd=state_parent_fd, dst_dir_fd=state_parent_fd)
            state_tmp = None
        finally:
            os.close(state_parent_fd)
        state_installed = _file_snapshot(state_path)
        if state_installed is None:
            _die(f"state install disappeared: {state_path}")
    except Exception as original:
        recovery_errors: list[str] = []
        if state_tmp is not None and not _unlink_file_if_owned(*state_tmp):
            recovery_errors.append(f"temporary state was concurrently replaced: {state_tmp[0]}")
        if state_installed is not None:
            if previous_bytes is None:
                if not _unlink_file_if_owned(state_path, state_installed):
                    recovery_errors.append(f"installed state was concurrently replaced: {state_path}")
            elif _file_snapshot(state_path) == state_installed:
                parent_fd = _open_directory_fd(state_path.parent, create=False)
                try:
                    restore_name = "." + state_path.name + ".restore-" + uuid.uuid4().hex
                    restore_path = state_path.parent / restore_name
                    restore_owned = _write_temp_file(parent_fd, restore_name, previous_bytes)
                    if _file_snapshot(state_path) == state_installed:
                        os.replace(restore_name, state_path.name, src_dir_fd=parent_fd, dst_dir_fd=parent_fd)
                    elif not _unlink_file_if_owned(restore_path, restore_owned):
                        recovery_errors.append(f"restore temporary was concurrently replaced: {restore_path}")
                finally:
                    os.close(parent_fd)
            else:
                recovery_errors.append(f"installed state was concurrently replaced: {state_path}")
        for op in reversed(operations):
            dest, new_owned, old_owned = op["destination"], op["new"], op["old"]
            if new_owned is not None and not _unlink_link_if_owned(dest, new_owned):
                recovery_errors.append(f"created link was concurrently replaced: {dest}")
                continue
            if old_owned is not None:
                try:
                    _create_link_no_clobber(dest, old_owned[2])
                except SyncError:
                    recovery_errors.append(f"could not restore attested link without clobbering: {dest}")
        if recovery_errors:
            raise SyncError(f"{original}; rollback preserved foreign objects: {'; '.join(recovery_errors)}") from original
        raise


def run(mode: str, source_root: Path, user_root: Path, share_root: Path, state_root: Path, registry: dict[str, Any]) -> int:
    validate_roots(user_root, share_root, state_root)
    for root in (user_root, share_root, state_root):
        _validate_directory_prefix(root)
    commit = validate_source_provenance(source_root, registry)
    if mode == "apply":
        prepare_runtime_build(source_root, registry)
    else:
        validate_runtime_build(source_root, registry)
    state_path = Path(registry["state"]["path_template"].format(state_root=state_root))
    pack, share_parent = _pack_paths(registry, share_root, commit)
    with tempfile.TemporaryDirectory(prefix="raphael-gstack-sync-") as td:
        work = Path(td)
        checkout, entries, root_entry = clone_and_generate(source_root, registry, work)
        pack_stage, tree_hash = build_pack(checkout, source_root, registry, entries, root_entry, work)
        desired = _desired_links(registry, user_root, pack, source_root, entries)
        # Even a dry-run/check must reject a foreign immutable path; neither
        # mode is allowed to silently plan over an untrusted pack.
        validate_existing_pack(pack, tree_hash, registry)
        previous, previous_bytes = validate_existing_state(state_path, registry, desired, pack, commit)
        validate_managed_containers(user_root, desired, previous)
        validate_graph(desired, previous)
        desired_ids = {item["id"] for item in desired}
        retired = [item for item in (previous or {}).get("links", []) if item["id"] not in desired_ids]
        marker_state = _state_expected(registry, state_path, desired, pack, commit)
        if mode == "check":
            if not pack.is_dir() or _tree_hash(pack) != tree_hash:
                _die(f"immutable pack missing or differs: {pack}")
            if previous is None:
                _die(f"state missing: {state_path}")
            if previous.get("pack_root") != str(pack):
                _die("state pack_root does not match current immutable pack")
            for item in desired:
                if _read_current_link(Path(item["destination"])) != _normalize_target(Path(item["destination"]), item["target"]):
                    _die(f"link target differs from desired graph: {item['destination']}")
            validate_live_catalog(desired, registry["source_manifest"]["expected_discoverable_count"])
            print(f"OK: pinned gstack pack {commit}, {len(entries) + 1} generated skills (53 gstack-* identities + root)")
            return 0
        if mode == "dry-run":
            print(f"DRY-RUN: would promote {pack} ({len(entries) + 1} generated skills; 53 gstack-* identities + root)")
            for item in retired:
                print(f"  retire {item['destination']}")
            for item in desired:
                actual = _read_current_link(Path(item["destination"]))
                expected = _normalize_target(Path(item["destination"]), item["target"])
                if actual != expected:
                    print(f"  link {item['destination']} -> {item['target']}")
            print(f"  state {state_path}")
            return 0
        promote_pack(pack_stage, pack, share_parent, tree_hash, registry)
        transactional_links(desired, state_path, marker_state, previous_bytes, previous, retired=retired)
        remove_empty_legacy_sidecar_directory(user_root)
        validate_managed_containers(user_root, desired)
        validate_live_catalog(desired, registry["source_manifest"]["expected_discoverable_count"])
        print(f"APPLIED: {pack} ({len(entries) + 1} generated skills; 53 gstack-* identities + root)")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--dry-run", action="store_const", const="dry-run", dest="mode")
    modes.add_argument("--check", action="store_const", const="check", dest="mode")
    modes.add_argument("--apply", action="store_const", const="apply", dest="mode")
    parser.add_argument("--source-root", default=str(DEFAULT_SOURCE_ROOT))
    parser.add_argument("--user-root", default=None)
    parser.add_argument("--share-root", default=str(DEFAULT_SHARE_ROOT))
    parser.add_argument("--state-root", default=str(DEFAULT_STATE_ROOT))
    args = parser.parse_args(argv)
    args.mode = args.mode or "dry-run"
    args.source_root = validate_root(args.source_root, "source-root")
    # HOME is the intentional default install root.  An explicitly supplied
    # HOME-like path still goes through the broad-path guard.
    args.user_root = DEFAULT_USER_ROOT if args.user_root is None else validate_root(args.user_root, "user-root")
    args.share_root = validate_root(args.share_root, "share-root")
    args.state_root = validate_root(args.state_root, "state-root")
    return args


def main(argv: list[str] | None = None) -> int:
    try:
        args = parse_args(argv or sys.argv[1:])
        registry = load_registry()
        return run(args.mode, args.source_root, args.user_root, args.share_root, args.state_root, registry)
    except (SyncError, subprocess.TimeoutExpired) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
