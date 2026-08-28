# Spec: Compound Engineering, pstack und agentcookie

Planned at: raphael-skills @ 8adf445e6677318364605faccb8b4f16ad3e0521 · Datum: 2026-08-28 · Status: DESIGN FREIGEGEBEN, SPEZIFIKATIONSREVIEW AUSSTEHEND
Quelle: Nutzerauftrag mit drei URLs, lokale Vendor-Prüfung und Quell-Reviews. Die SkillsDirectory-Seite ist Discovery-Material, nicht die Primärquelle.

## 1. Ziel und Vertrag

Der kanonische Skill-Bestand bekommt drei reproduzierbare externe Ergänzungen:

1. Compound Engineering mit allen 33 Skills unter eindeutigen `ce-*`-Namen.
2. pstack mit allen 44 Skills unter eindeutigen `pstack-*`-Namen, einschließlich `pstack-poteto-mode`.
3. agentcookie als eigenständiger Ops-Skill für die autorisierte Mac-Linux-Browser-Session-Synchronisation.

Der Bestand darf keine bestehenden Raphael-Namen überschreiben oder dieselbe Verantwortung als unpräfixierte zweite Variante anbieten. `plan`, `orchestrate`, `code-review`, `tdd`, `reflect` und andere bestehende Skills bleiben die Raphael-Varianten. Die externen Pakete bleiben über ihre Präfixe bewusst separat aufrufbar.

## 2. Befund und Quellen

| Quelle | Rolle | Revisionsanker | Lizenz | Entscheidung |
|---|---|---|---|---|
| `EveryInc/compound-engineering-plugin` | 33 Skills für Brainstorm, Plan, Work, Simplify, Review und Compound-Learnings | `5985d821b9413f590184531d4c35e435d2356abb` | MIT | Vollständig namespaced vendoren |
| `cursor/plugins/pstack` | 44 Engineering-Skills, Playbooks, Prinzipien und Poteto-Einstieg | `bdf7aa355337897f167153e05069aca505dae17c` | MIT | Vollständig namespaced vendoren |
| `mvanhorn/agentcookie` | Cookie-/Session-Synchronisation über Tailscale und CDP | `e498e93bcaac867386dfba12ea709882dff037ba` (`v1.0.0`) | MIT | Als Ops-Skill und gepinnte Tool-Quelle integrieren |
| `skillsdirectory.com/skills/sediman-agent-poteto-mode` | Drittanbieter-Spiegel des Poteto-Einstiegs | keine belastbare Primärrevision | nicht sichtbar | Nur als Discovery-Quelle dokumentieren, nicht vendoren |

pstack und Poteto Mode sind keine zwei unabhängigen Quellen. `poteto-mode` ist ein Bestandteil von pstack. Die SkillsDirectory-Seite wird deshalb nicht zusätzlich als Skill kopiert.

## 3. Architektur

### 3.1 Dateibestand

Der Import erzeugt diese kanonischen Bereiche:

```text
skills/imported/compound-engineering/
  ce-*/SKILL.md
  ce-*/references/**
  VENDORING.md
  source-manifest.json

skills/imported/pstack/
  pstack-*/SKILL.md
  pstack-poteto-mode/playbooks/**
  pstack-*/references/**
  VENDORING.md
  source-manifest.json

skills/ops/agentcookie/
  SKILL.md
  VENDORING.md
  references/**
```

Die Kopie enthält die für die Skills erforderlichen lokalen References, Playbooks und Assets. Upstream-CI, `node_modules`, Marketplace-Metadaten, Build-Tooling, Demo-Material und die nicht registrierte Benny-Automation gehören nicht zum kanonischen Runtime-Bestand.

### 3.2 Namensregeln

- Jeder CE-Skill erhält `ce-` als Präfix. Ein generischer Upstream-Name wie `lfg` wird zu `ce-lfg`.
- Jeder pstack-Skill erhält `pstack-` als Präfix. `poteto-mode` wird zu `pstack-poteto-mode`.
- pstack-Agent-Prompts erhalten `pstack-` als Identitätspräfix. Ein vorhandener globaler Agent namens `poteto-agent` wird nicht überschrieben.
- `agentcookie` ist durch den Projektnamen bereits eindeutig und erhält keinen zweiten künstlichen Alias.
- Alle internen Skill-Aufrufe, Markdown-Links, Playbook-Verweise und Agent-IDs werden auf die Zielnamen umgeschrieben.
- Die Originalnamen bleiben im Quellmanifest als Daten erhalten, nicht als zusätzliche Trigger.

### 3.3 Sicherheits- und Host-Overlay

Vollständiges Namespacing bedeutet vollständige Skill-Abdeckung, nicht blindes Übernehmen unsicherer Laufzeitannahmen. Vor der Aktivierung wird ein kleiner, dokumentierter Raphael-Overlay angewandt:

- Fable bleibt Controller-only. pstack-Defaults oder Anweisungen, die Fable als Worker, Advisor oder Reviewer einsetzen, werden auf die zulässige Runtime-Routing-Schicht umgestellt oder als nicht ausführbar markiert.
- Host-spezifische Setup-Schritte, die fremde Settings überschreiben, werden auf den jeweiligen namespaced Bereich begrenzt. Ein pstack-Setup darf keine bestehenden Raphael- oder Fremdregeln clobbern.
- SessionStart-Hooks, Telemetrie, Marketplace-Auto-Updates und stille Netzaufrufe werden entfernt oder deaktiviert.
- Cross-runtime Skills dürfen keine Claude-only Variablen oder absolute Upstream-Installationspfade voraussetzen.
- Jeder entfernte oder normalisierte Bestandteil wird in `VENDORING.md` mit Grund und Zielverhalten genannt.

## 4. Datenfluss

### 4.1 Compound Engineering

`/ce-brainstorm` erzeugt Anforderungen. `/ce-plan` bereichert sie um die Umsetzung. `/ce-work` arbeitet den Plan ab. `/ce-simplify-code` bereinigt nur frisch erzeugten Code. `/ce-code-review` prüft den tatsächlichen Diff. `/ce-compound` schreibt genau ein belegtes Learning in den CE-Artifact-Root. Die übrigen CE-Skills bleiben über `ce-*` direkt erreichbar.

CE darf die bestehenden Raphael-Skills nicht still ersetzen. Ein Nutzer kann bewusst zwischen `ce-plan` und `plan` wählen. Die Registry zeigt beide Namen mit ihrer Herkunft.

### 4.2 pstack

`/pstack-poteto-mode` ist der pstack-Einstieg und routet ausschließlich zu `pstack-*`. Die 22 Playbooks bleiben unter `pstack-poteto-mode/playbooks/`. Prinzipien und Utility-Skills bleiben unter ihren namespaced Namen direkt erreichbar. Die pstack-Kopie verwendet keine unpräfixierten Aufrufe wie `/plan`, `/tdd` oder `/reflect`.

### 4.3 agentcookie

`/agentcookie` prüft zuerst die vorhandene CLI, die Konfiguration, Tailscale und den lokalen CDP-Endpunkt. Danach führt der Nutzer die passende Quelle-/Sink-Aktion aus. Der Skill verarbeitet keine Cookie-Inhalte im Prompt und schreibt keine Cookie-Daten, Tokens oder Schlüssel in das Repository.

Sichere Defaults sind Allowlist beziehungsweise leere Freigabe, loopback-only CDP und verschlüsselte Übertragung innerhalb des autorisierten Tailscale-Netzes. Google-/DBSC-Sessions gelten als nicht kopierbar. Ein fehlendes Pairing, eine fehlende CLI oder ein nicht erreichbarer Endpunkt ergibt `BLOCKED`, nie einen simulierten PASS.

## 5. Import und Reproduzierbarkeit

Der Import erfolgt über ein deterministisches Werkzeug, nicht über händisches Kopieren von 78 Skill-Dateien. Das Werkzeug:

1. liest nur die gepinnten Quell-Checkouts oder einen exakten Commit;
2. validiert Lizenzdatei, erwartete Quellen und erlaubte Verzeichnisgrenzen;
3. erstellt die Zielnamen und eine vollständige Original-zu-Ziel-Tabelle;
4. schreibt Frontmatter nach dem Raphael-Skill-Vertrag, ohne die fachliche Upstream-Struktur unnötig umzuschreiben;
5. rewritet interne Links und Aufrufe und prüft, dass kein alter externer Name als aktiver Aufruf übrig bleibt;
6. schreibt Hashes, Commit, Lizenz und Normalisierungen in `source-manifest.json` und `VENDORING.md`.

Ein zweiter Lauf mit denselben Quellen muss denselben Zielzustand erzeugen. Ein fehlender Quell-Commit, eine Namenskollision, ein ungültiger Skill-Vertrag oder ein nicht auflösbarer interner Link beendet den Lauf vor jeder Registry- oder Runtime-Änderung.

## 6. Runtime-Registries

`index.json` erhält die 78 neuen eindeutigen Skill-Einträge. Claude-, Codex- und Kimi-Registries erhalten dieselben namespaced Quellen. Der Installer darf vorhandene unpräfixierte Skills oder fremde Dateien nicht ersetzen.

Die pstack-Agent-Prompts werden als namespaced Runtime-Assets dokumentiert. Sie werden nur aktiviert, wenn das jeweilige Harness ihre echte Modell- und Toolgrenze kennt. Kein Import darf aus der pstack-Quelle einen Fable-Worker erzeugen.

`agentcookie` wird als wiederverwendbarer Ops-Skill registriert. Das Go-Programm selbst bleibt außerhalb des Skill-Repositories als gepinnte Vendor-Quelle und wird nicht als unreviewtes Binary in Git eingecheckt.

## 7. Validierung und Abnahme

### 7.1 Deterministische Gates

- Importer gegen isolierte Temp-Checkouts mit festem Quell-Commit.
- Erwartete Skill-Anzahl: 33 CE, 44 pstack, 1 agentcookie.
- Jede aktive Skill-ID ist eindeutig und trägt den erwarteten Namespace.
- Jede `SKILL.md` erfüllt Frontmatter, Gotchas und Completion-Kriterien.
- Alle internen Links, Playbook-Pfade und namespaced Aufrufe lösen auf.
- Verbotene Hooks, Telemetrie, Fable-Worker-Konfigurationen und absolute Fremdpfade werden erkannt.
- `python3 tools/validate-skill.py` und `python3 tools/build-index.py` laufen erfolgreich.
- Claude-, Codex- und Kimi-Sync-Checks laufen zuerst als Dry-Run und danach im konfliktfreien Check-Modus.
- Fremde Dateien und bestehende Raphael-Skills bleiben im Diff unverändert.

### 7.2 agentcookie-Gates

- Der gepinnte Quell-Commit und die MIT-Lizenz sind nachweisbar.
- Build- oder Installationspfad ist auf der Zielplattform reproduzierbar.
- `agentcookie doctor` prüft Tailscale, CDP und Policy ohne Cookie-Werte auszugeben.
- `agentcookie status --json` wird nur auf Statusfelder geprüft; Cookie-Werte gelten als nicht zulässige Testausgabe.
- Ein echter Mac-Linux-Pairing-Lauf bleibt `nicht geprüft`, solange kein erreichbarer Mac-Endpunkt und kein autorisiertes Tailscale-/CDP-Setup vorhanden sind.

### 7.3 Abnahmekriterien

Abnahme ist PASS, wenn alle mechanischen Gates grün sind, jede Quelle und Normalisierung dokumentiert ist, die Runtime-Dry-Runs keine Konflikte melden und die drei externen Pakete ausschließlich über ihre eindeutigen Namen erreichbar sind. Provider-, Netzwerk- oder fehlende Mac-Endpunkt-Fehler sind BLOCKED und werden nicht als Produkt-PASS gezählt.

## 8. Nicht-Ziele

- Keine Zusammenführung von CE und pstack zu einem vierten, konkurrierenden Planungs- oder Review-Skill.
- Keine Entfernung oder Umschreibung bestehender Raphael-Skills.
- Kein Marketplace-Auto-Update und kein unpinned Live-Download.
- Kein Einchecken von Cookie-Daten, privaten Schlüsseln oder vorgebauten agentcookie-Binaries.
- Kein vollständiger Import der CE-/pstack-Repository-Toolchains, CI-Konfigurationen oder Demo-Automationen.
- Kein Versprechen, dass Google-/DBSC-Sessions synchronisierbar sind.

## 9. Umsetzungsgrenzen

Die Umsetzung erfolgt in getrennten, verifizierbaren Einheiten:

1. Quellmanifeste, Namensmapping und Importer.
2. CE-Paket inklusive Frontmatter- und Link-Normalisierung.
3. pstack-Paket inklusive Playbooks, Prinzipien und Sicherheits-Overlay.
4. agentcookie-Ops-Skill und gepinnte Tool-Provenienz.
5. Index-, Runtime-Registries und Dry-Run-Sync.
6. Vollständige Gates, externe Familienprüfung und Review-Inbox-Eintrag.

STOP, wenn der zitierte Quell-Commit nicht verfügbar ist, die Kopie mehr Dateien als den festgelegten Skill-Payload umfasst, ein bestehender Name überschrieben würde, interne Verweise nicht vollständig namespaced werden können oder ein Fable-Worker als ausführbare Route übrig bleibt.

## 10. Offene, nicht blockierende Prüfungen

- Der echte Mac-Linux-Pairing-Lauf für `agentcookie` ist erst nach einem erreichbaren autorisierten Endpunkt prüfbar.
- Die Laufzeit-Registrierung von namespaced Agent-Prompts muss je Harness gegen die dort tatsächlich unterstützte Agent-Schnittstelle geprüft werden.
- Upstream-Versionen werden nicht automatisch aktualisiert. Ein späteres Update braucht einen neuen Commit-Anker und einen neuen Import-Review.
