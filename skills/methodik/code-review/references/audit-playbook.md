# Audit-Playbook — 9 Kategorien für die tiefe Durchsicht

Für einen vollständigen Codebase-Audit statt eines schnellen Diff-Reviews.
Tiefe an die Repo-Größe anpassen — ein 2K-Zeilen-CLI braucht einen leichteren
Pass als ein 500K-Zeilen-Monorepo.

**Ein Fund ist nur ein Fund mit Evidenz.** "Hat wahrscheinlich irgendwo
N+1-Queries" ist kein Fund; "`orders/api.ts:142` löst pro Bestellposition eine
eigene Query in einer Schleife aus" ist einer.

## 1. Correctness / Bugs

Die vertrauenswürdigste Kategorie — echte Bugs durch Lesen, nicht Spekulation.

- Fehlerbehandlung: verschluckte Exceptions, leere catch-Blöcke, fehlende
  Error-States in UI-Code.
- Async-Gefahren: nicht awaitete Promises, Race Conditions auf Shared State,
  fehlendes Cleanup (stale Closures, nie entfernte Listener).
- Null/Undefined-Flows: Non-Null-Assertions auf Werten, die null sein können.
- Grenzfälle: Off-by-one, Leer-Collection, Timezone/Locale-Annahmen.
- State Machines: unmögliche Zustandskombinationen, unbehandelte Branches
  (`default:` das stillschweigend nichts tut).
- Nebenläufigkeit: Check-then-act auf Shared Resources, fehlende Transaktionen,
  Idempotenz bei Retries (Webhooks, Queues).
- Type-Escape-Hatches: Cluster von `any`/`as`/`@ts-ignore` — jeder ist eine
  Stelle, an der der Compiler übergangen wurde.
- Resource-Leaks: nicht geschlossene Handles/Verbindungen/Subscriptions.

## 2. Security

Nur das bewerten, was direkt durch Code-Evidenz gestützt ist. Funde defensiv
formulieren: Muster benennen, Produktions-Impact erklären, Fix beschreiben —
nie einen lauffähigen Exploit-String oder eine Schritt-für-Schritt-Missbrauchs-
anleitung ins Ergebnis schreiben.

**Umgang mit Secrets:** nie einen echten Secret-Wert in einen Fund/Plan
kopieren (die Datei wird committet). Nur `file:line` + Credential-Typ nennen,
Fix immer inkl. Rotation, nicht nur Entfernen (ein committetes Secret ist
auch nach dem Löschen verbrannt).

**By-Design ist kein Fund:** Standard-Plattform-Konventionen (z. B.
`https_proxy` respektieren, `~/.netrc` lesen) sind beabsichtigt. Ein in einem
ADR/Decision-Doc festgehaltener Trade-off ist ebenfalls entschieden — außer
die *Implementierung* fügt Risiko über die Konvention/Entscheidung hinaus
hinzu. Eine **veraltete ADR ist selbst ein Fund**: wenn der Code vom
Decision-Doc abgewichen ist, den Drift melden (Doku oder Code ist falsch —
beides sollte das Team wissen), nicht die Doku nutzen, um den Fund zu
unterdrücken.

- Credential-Hygiene: hartkodierte Keys/Tokens, Credentials in committeten
  `.env`, Credentials in Logs/History.
- Daten, die in Interpreter/privilegierte APIs fließen: SQL/Shell aus
  Request-Daten zusammengesetzt, HTML-Sinks mit User-Content, dynamische
  Execution-APIs mit Runtime-Input, Pfade aus Request-Daten (Path Traversal).
- Zugriffskontrolle: Endpunkte ohne serverseitige Identitätsprüfung,
  Autorisierung nur im Client, Objektzugriff per ID ohne Ownership-Check
  (IDOR), fehlender CSRF-Schutz auf state-ändernden Routen.
- Input-Verträge: API-Grenzen ohne Schema-Validierung, File-Upload ohne
  Typ-/Größen-/Storage-Constraints, Mass Assignment aus Request-Daten.
- Dependency-Posture: Audit-Kommando des Ökosystems (`npm audit`,
  `pip-audit`, `cargo audit`) read-only laufen lassen — nur kritische/hohe
  Advisories auf erreichbarem Runtime-/Build-Code melden.
- Produktionskonfiguration: zu breites CORS mit Credentials, fehlende
  Security-Header (CSP), Cookies ohne `HttpOnly`/`Secure`/`SameSite`,
  Debug-Modus in Produktion.
- Datenminimierung: PII/sensible Daten in Logs, Stack Traces an Clients.

## 3. Performance

Algorithmische/architektonische Gewinne suchen, keine Mikro-Optimierung.

- N+1-Muster: Query/Fetch pro Item in Schleifen oder pro Listenzeile.
- Falsche Komplexität: verschachtelte Scans über dieselbe Collection, wo
  eine Map-Lookup gehört.
- Caching-Lücken: identische teure Berechnungen/Fetches pro Request/Render
  wiederholt; fehlende Memoization/HTTP-Caching auf stabilen Daten.
- Payload-Größe: Overfetching, fehlende Pagination, große JSON an Clients.
- Frontend: schwere Deps für triviale Nutzung, fehlendes Code-Splitting,
  unoptimierte Bilder/Fonts, Render-Waterfalls.
- Backend: synchrone Arbeit, die in eine Queue gehört, fehlende Indexe (nur
  mit Schema-Beleg behaupten), Connection-per-Request statt Pooling.
- Build/CI: langsame CI durch fehlendes Caching, redundante Pipeline-Schritte.

## 4. Testabdeckung

Ziel ist nicht ein Prozentwert — sondern *welcher ungetestete Code gefährlich
ist*.

- Kritische Pfade (Geld, Auth, Datenmutation) mit null/trivialer Abdeckung
  identifizieren.
- Module mit hoher Churn-Rate (`git log`) + keine Tests = Top-Refactor-
  Risiko → "erst Characterization-Tests"-Kandidat.
- Bestehende Testqualität: Tests, die nichts Aussagekräftiges asserten,
  Mocking, das die Mocks testet, ungelesene Snapshot-Tests, Flakiness
  (echte Timer, echtes Netz, Order-Dependence).
- Fehlende Testschichten: nur Unit ohne Integration an API-Grenzen (oder
  umgekehrt: langsames E2E für das, was ein Unit-Test fangen würde).
- Verifikations-Infrastruktur: gibt es einen Ein-Kommando-Weg, zu wissen,
  dass die Codebasis funktioniert? Falls nicht: das ist Fund #1.

## 5. Tech Debt & Architektur

- Duplikation: dieselbe Logik 3+ mal implementiert, divergierte Kopien.
- Layering-Verstöße: UI importiert Data-Layer-Internals, zirkuläre Deps,
  "utils"-Module als Krimskrams-Schublade mit hohem Fan-in.
- Toter Code: unexportierte/ungenutzte Module, vollständig ausgerollte
  Feature-Flags, die noch verzweigen, auskommentierte Blöcke ohne
  Erklärung.
- God Objects: Dateien eine Größenordnung über dem Repo-Median, die alles
  anfasst; Funktionen mit zweistelliger Parameterzahl.
- Inkonsistente Muster: drei Wege für Datenfetching/Fehlerbehandlung/Styling
  im selben Repo — den Gewinner (den zuletzt konvergierten) wählen, Rest
  konsolidieren.

## 6. Dependencies & Migrationen

- Major-Version-Rückstand mit echtem Kosten (EOL, Security-Fix-Cutoff),
  nicht jeder Minor-Bump.
- Deprecated APIs mit angekündigtem Removal.
- Verwaiste Dependencies (Jahre kein Release, archiviertes Repo) auf
  kritischen Pfaden.
- Doppelte Dependencies für dasselbe Problem (zwei Date-Libs, zwei
  HTTP-Clients).
- Pro Migrations-Kandidat den Blast-Radius (betroffene Dateien) schätzen —
  das bestimmt Aufwand und ob es sich überhaupt lohnt.

## 7. DX & Tooling

- Fehlend/kaputt: Typecheck-Skript, Lint-Config, Formatter, Pre-Commit-Hooks.
- Langsame Feedback-Loops: Dev-Server/Test-Start in Minuten, kein Watch-Mode.
- Onboarding-Reibung: falsche/unvollständige README-Setup-Schritte,
  undokumentierte Env-Vars.
- Fehlendes `CLAUDE.md`/`AGENTS.md` in Repos, in denen Agenten Pläne
  ausführen werden — hoher Leverage, als Fund empfehlen.

## 8. Doku

Niedrigste Standard-Priorität — nur flaggen, wo Fehlen echte Kosten hat:

- Öffentliche API-Fläche ohne Referenz-Doku.
- Architektur-Entscheidungen, die niemand rekonstruieren kann.
- Aktiv falsche Doku (schlimmer als fehlende) — Setup-Anleitungen,
  API-Beispiele, die nicht mehr compilieren.

## 9. Direction — wohin will diese Codebase?

Zukunftsgerichtet: nicht was kaputt ist, sondern was diese Codebase werden
will. **Evidenz-Pflicht:** jeder Vorschlag muss ein Zitat aus dem Repo selbst
haben — ein Vorschlag, der auf jedes Projekt der Kategorie zuträfe ("Dark
Mode hinzufügen") ist Rauschen, kein Fund. Signalquellen:

- **Unerledigte Absicht:** TODO/FIXME-Cluster um ein Thema, nie ausgerollte
  Feature-Flags, angefangene/verwaiste Module.
- **Versprochen, nicht geliefert:** README/Roadmap-Versprechen ohne Code,
  No-op-CLI-Flags. Ein PRD/`PRODUCT.md`, das Nutzer/Use-Cases benennt, ist
  das stärkste Grounding-Signal — nie etwas vorschlagen, das ein Decision-
  Doc schon abgelehnt hat (den Widerspruch stattdessen benennen).
- **Oberflächen-Asymmetrien:** einseitige Paare (Export ohne Import, Create
  ohne Bulk-Create), CRUD minus eine Operation.
- **Das Naheliegende:** Fähigkeiten, die die bestehende Architektur
  unverhältnismäßig günstig macht.

Direction-Funde nutzen das Standardformat mit zwei Anpassungen: **Impact**
ist Produkt-/Nutzerwert, **Confidence** spiegelt, wie belegt der Vorschlag
ist — nicht Gewissheit, dass er richtig ist. Strategie gehört dem
Auftraggeber; die Rolle des Reviews ist, begründete Optionen mit ehrlichen
Trade-offs zu liefern.

---

## Finding-Format (Pflicht für jeden Fund, jeder Kategorie)

```markdown
### [KATEGORIE-NN] Kurzer, imperativer Titel

- **Evidence**: `pfad/datei.ts:123` — ein Satz, was dort steht. (2–5
  stärkste Stellen; bei Häufung "und ~N ähnliche Stellen" vermerken.)
- **Impact**: was schiefgeht / was es kostet. Konkret, nicht "suboptimal".
- **Effort**: S (Stunden) / M (ca. ein Tag) / L (mehrere Tage) — für den Fix
  inkl. Tests.
- **Risk**: was der Fix kaputt machen könnte; LOW/MED/HIGH + eine Zeile warum.
- **Confidence**: HIGH (Code gelesen, sicher) / MED (starkes Signal, muss
  verifiziert werden) / LOW (Geruch, braucht Untersuchung). LOW-Confidence-
  Funde dürfen gemeldet werden, bekommen aber einen "untersuchen"-Plan, nie
  einen "fixen"-Plan direkt.
- **Fix sketch**: 1–3 Sätze. Nicht der Plan — nur genug, um den Aufwand
  ehrlich einzuschätzen.
```

## Priorisierungs-Rubrik

Funde nach **Leverage = Impact ÷ Effort, abgewertet durch Confidence und
Fix-Risiko** ordnen. Tiebreaker:

1. Was andere Funde entblockt (Verifikations-Baseline, Characterization
   Tests) schwimmt nach oben.
2. Security-Funde mit HIGH Confidence schwimmen über gleich-leverage
   Nicht-Security-Funde.
3. Funde mit sauberer Verifikationsgeschichte bevorzugen — Executor-Modelle
   gelingen dort eher.
4. "Nicht wert, es zu tun" ist ein gültiges Verdikt — mit einer Zeile
   Begründung festhalten, damit es niemand erneut auditiert.
