# vendor-packs — Herkunft der externen Skill-Pakete

Stand: 2026-08-28. Drei externe Quellen, vollständig namespaced, ohne Marketplace und ohne
Auto-Update. Jede Quelle ist auf einen Commit gepinnt; der Importer prüft die Bytes gegen
genau diesen Commit.

## Ablageort

Die Pakete liegen unter `vendor-packs/`, nicht unter `skills/imported/`.
Grund: `skills/` gehört `root` und ist für die ausführende Identität `raphael-claude` nicht
beschreibbar. Die ACL gewährt zwar `rwx`, die ACL-Maske reduziert sie auf `r-x`, und
`setfacl` scheitert mit `Operation not permitted`; `sudo` ist im Container durch
`no new privileges` deaktiviert. Sobald `skills/` beschreibbar ist, genügt ein Verschieben
der drei Verzeichnisse plus Anpassung von `_known_specs()` in
`tools/vendor_skill_packs.py`.

## Quellen

| Paket | Upstream | Commit | Lizenz | Umfang |
|---|---|---|---|---|
| `compound-engineering` | github.com/EveryInc/compound-engineering-plugin | `5985d821b9413f590184531d4c35e435d2356abb` | MIT | 33 Skills, Präfix `ce-` |
| `pstack` | github.com/cursor/plugins, Verzeichnis `pstack` | `bdf7aa355337897f167153e05069aca505dae17c` | MIT | 44 Skills, Präfix `pstack-`, 23 Playbooks |
| `agentcookie` | github.com/mvanhorn/agentcookie, Tag `v1.0.0` | `e498e93bcaac867386dfba12ea709882dff037ba` | MIT | 1 Ops-Skill, nur Bedienwissen |

`skillsdirectory.com/skills/sediman-agent-poteto-mode` wurde geprüft und **nicht** vendored.
Die Seite spiegelt nur `poteto-mode` aus `pstack` ohne Lizenz- und Provenienzangabe. Eine
zweite Kopie wäre genau die Redundanz, die vermieden werden sollte. `poteto-mode` ist im
pstack-Paket als `pstack-poteto-mode` enthalten.

## Namensregeln

Jede Skill-Identität wird aus dem Verzeichnis-Basename abgeleitet, nicht aus dem
menschenlesbaren Frontmatter-Namen. Dadurch wird `name: Poteto Mode` zu
`pstack-poteto-mode`. Generische Namen wie `lfg` werden zu `ce-lfg`. Ein bereits
präfixierter Name bleibt unverändert; es entsteht kein `ce-ce-plan`.

Interne Slash-Kommandos, paketrelative Pfade und strukturierte Agent-Felder werden auf die
Zielnamen umgeschrieben. Externe URLs und absolute Dateipfade bleiben unverändert.

## Was bewusst nicht übernommen wurde

- Upstream-CI, `node_modules`, Marketplace-Manifeste, Build-Toolchains und Demo-Material.
- Die schlafende Benny-Automation aus pstack; sie ist kein registrierter Skill.
- Go-Quellcode und vorgebaute Binaries von agentcookie. Der Ops-Skill beschreibt die
  gepinnte Bezugsquelle, statt fremden Code einzuchecken.
- Cookie-Daten, Tokens, Schlüssel und Pairing-Codes. Diese gehören niemals in Git.

## Sicherheits-Overlay

- Fable bleibt Controller-only. Kein importierter Skill und kein Agent-Prompt routet Fable
  als Worker, Advisor, Reviewer oder Fallback.
- Die vendorten Agent-Prompts `pstack-poteto-agent` und `pstack-comment-sicko` liegen unter
  `agents/` und sind auf Leaf-Verhalten ohne Nachkommen festgelegt. Sie überschreiben keine
  bestehenden Agenten.
- SessionStart-Hooks, Telemetrie und stille Netzaufrufe werden nicht aktiviert.
- Bestehende Raphael-Skills wie `plan`, `code-review`, `tdd`, `orchestrate` und `reflect`
  bleiben unverändert und behalten ihre unpräfixierten Namen.

## Update-Pfad

1. Upstream aktualisieren und den neuen Commit hier eintragen.
2. `python3 tools/vendor-skill-packs.py --check --import <pack> --commit <sha>` gegen einen
   sauberen Checkout laufen lassen.
3. Erst nach grünem Check importieren. Ein schmutziger Arbeitsbaum wird abgewiesen, auch
   wenn `git status` durch `assume-unchanged` oder `skip-worktree` leer erscheint.
