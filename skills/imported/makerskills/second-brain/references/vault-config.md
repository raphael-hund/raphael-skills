# Vault config

The Second Brain vault location and tool.

| Field | Value |
|---|---|
| **Path** | `/root/raphael-brain/` (VPS; explizites `SECOND_BRAIN_VAULT` nur bei benanntem anderen Ziel) |
| **Tool** | Obsidian (markdown-based) |
| **Schema source** | `<path>/CLAUDE.md` (authoritative — always read first) |
| **Backup** | Git; Rohquellen unverändert erhalten |

## Folders

| Folder | Purpose | Modifiable by `second-brain`? |
|---|---|---|
| `raw/` | Unprocessed source material | ✅ über `scripts/brain-write.py` |
| `wiki/_candidates/` | Belegte Entwürfe | ✅ über `scripts/brain-write.py` |
| kanonisches `wiki/` | Freigegebenes Wissen | nur `scripts/brain-promote.py` mit Authorization; auch Änderungen über Kandidaten |
| `wiki/index.md` | Vollständiger globaler Wissensindex | nur autorisierte Promotion/Änderung |
| `/root/eingang/ausgang/<thema>/` | Nutzerartefakte, vom Mac erreichbar | ✅ erstellen |
| `Inbox/` | Quick-capture inbox | ❌ off-limits — `Quick Capture.md` is for raw thoughts before they hit `raw/` |
| `Projects/` | Project-specific notes | ❌ off-limits — `pm` skill territory |
| `Daily/` | Daily notes | ❌ off-limits |
| `Templates/` | Note templates | ❌ off-limits |
| `Notes/` | Misc | ❌ off-limits |
| `Tasks.md` | Task list | ❌ off-limits |
| `Kanban.md` | Personal kanban | ❌ off-limits — `pm` skill territory |
| `Home.md` | Vault home | ❌ off-limits |

## Switching vaults

If the user moves the vault or wants to use a different setup (Logseq, plain markdown dir, Notion):

1. Update **Path** above
2. If the tool changes, note any structural differences (e.g., Logseq uses `journals/` and `pages/`)
3. Ensure the new vault has a CLAUDE.md or schema doc the skill can read at Step 1

## Note

The skill always reads `<vault>/CLAUDE.md` at start. If the user updates their schema there, the skill picks it up automatically — no need to keep this skill's `schema.md` in sync.
