# Security-Audit-Playbook (Web/Landingpages)

**Quelle:** destilliert aus `github.com/trailofbits/skills` (Vendor-Kopie:
`/root/tools/vendor/trailofbits-skills`, CC-BY-SA-4.0, siehe unten). Für Web-Marketing-
relevante Themen: Formulare, Kundendaten, Landingpage-Konfiguration, npm-Supply-Chain.
Tooling-Tiefe (CodeQL/SARIF/Semgrep) bewusst nicht dupliziert — dafür Original-Plugin
`plugins/static-analysis` nutzen, falls je gebraucht.

**Führungs-Regel (Dopplung mit OWASP-Checkliste vermeiden):** Dieses Playbook führt bei
Fail-Open/Fail-Closed-Doktrin (Regel 1), Footgun-Konfiguration/CORS/Webhook-Signaturen
(Regel 2) und npm-Supply-Chain-Tiefe (Regel 3) für den Web-Build-Schritt. Bei Code-Reviews
von Formularen/API-Routes/Webhooks zusätzlich `methodik/code-review/references/owasp-checkliste.md`
laden — die dortigen A02/A03/A05/A08/A10-Einträge und die Airtable-Checkliste sind der
Code-Review-Zusatzcheck, keine eigenständige Zweitquelle. Wird eine Regel hier geändert,
owasp-checkliste.md gegenprüfen (und umgekehrt) statt beide getrennt driften zu lassen.

## Doktrin

Ein Formular oder eine Landingpage ist erst "sicher", wenn der **einfachste** Pfad für
Entwickler/Agenten auch der **sichere** Pfad ist ("Pit of Success", Quelle: `plugins/sharp-edges`).
Kein Feature ist "sicher genug", weil es dokumentiert ist oder "eh niemand das ausnutzen würde" —
diese zwei Sätze sind Rationalisierungen, keine Argumente.

## Regel 1 — Fail-Open erkennen (Kundendaten/Secrets)

Quelle: `plugins/insecure-defaults/skills/insecure-defaults/SKILL.md` + dessen
`references/examples.md`. Die vier Quellvermerke in dieser Datei nennen eine
fremde Plugin-Sammlung, die auf diesem Rechner nicht liegt — sie belegen die
Herkunft der Regeln, sie sind kein Verweis zum Nachschlagen. Der relative Pfad
stand bis 03.08.2026 ohne dieses "dessen" da und las sich wie ein Verweis in
den eigenen references-Ordner.

**Prüffrage:** Was passiert, wenn eine Config/ENV-Variable fehlt — stürzt die App ab
(fail-secure, sicher) oder läuft sie mit einem Default weiter (fail-open, Finding)?

- **Fail-open (kritisch):** `SECRET = env.get('KEY') or 'default'` — App läuft mit
  schwachem/bekanntem Secret weiter.
- **Fail-secure (sicher):** `SECRET = env['KEY']` — App crasht ohne Config.

Taktik: grep nach `\|\|\s*['"]`, `or ['"]`, `ENV.fetch(...default:`, `getenv(...) or`,
`DEBUG=true`, `CORS.*\*`, `AUTH.*false` in Konfig-/Auth-/Formular-Handler-Code. Für jeden
Treffer den Codepfad nachverfolgen: Läuft das in Produktion, oder ist es ein Test-Fixture
(`test/`, `.example`)? Nur Produktionscode zählt als Finding.

**Beispiel — Formular-Backend mit Klartext-Fallback (Muster aus Vendor-Quelle):**
```js
// unsicher: läuft mit Default-Passwort weiter, wenn ENV fehlt
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin123';
```
Für Kunden-Leadformulare heißt das konkret: Formular-Handler, die Leads/Kontaktdaten in
eine DB oder ein CRM schreiben, dürfen beim Fehlen von API-Keys/DB-Credentials **nicht**
stillschweigend mit Test-/Default-Werten weiterlaufen — sonst landen Kundendaten
unbemerkt in einer falschen/ungesicherten Umgebung.

## Regel 2 — Footgun-Konfiguration in Formular-/Integrations-APIs

Quelle: `plugins/sharp-edges/skills/sharp-edges/SKILL.md`.

Jede Konfigurationsoption, die dem Entwickler/Agenten die Wahl eines Sicherheitsmechanismus
überlässt (Algorithmus, Modus, CORS-Origin, Webhook-Secret-Prüfung an/aus), ist ein
potenzieller Footgun. Typische Stellen bei Landingpages/Formularen:

- Formular-Endpoint akzeptiert CORS `*` "damit es überall funktioniert" → jede fremde
  Seite kann das Formular fremdsubmitten/Spam erzeugen.
- Webhook-Verifizierung (Stripe, Meta CAPI, Zapier) mit `verify_signature: false` als
  "temporärer" Debug-Schalter, der nie zurückgesetzt wird.
- Passwort-/Token-Hashing-Funktion, die dem Aufrufer den Algorithmus offen lässt
  (`hash_type: 'md5'` als eine der erlaubten Optionen).

Taktik: Bei jeder Config-Option mit Sicherheitsbezug fragen — ist der sichere Wert der
**einzige** oder zumindest der **Default**-Wert? Wenn nein: Finding, unabhängig davon ob
"eh niemand die unsichere Option wählen würde".

## Regel 3 — npm-Supply-Chain-Risiko vor Landingpage-Launch

Quelle: `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor/SKILL.md`.

Vor Launch (v.a. bei Formular-/Tracking-/Payment-Integrationen mit Drittanbieter-npm-Paketen)
grob prüfen, ob eine Abhängigkeit eines der folgenden Risikomerkmale hat:

1. **Ein-Personen-Projekt** ohne Organisation/Firma dahinter (Bus-Faktor 1 — left-pad-Fall).
2. **Unmaintained** — lange keine Updates, im README als "seeking maintainer" markiert.
3. **Geringe Popularität** relativ zu Alternativen im selben Bereich (wenige Downloads/Stars
   heißt: wenige Augen, die bösartigen Code bemerken würden).
4. **Hochrisiko-Features**: FFI, Deserialisierung, dynamisches Nachladen/Ausführen von
   Fremdcode zur Laufzeit.
5. **Bekannte kritische CVEs**, besonders viele relativ zur Popularität.
6. **Kein Security-Kontakt** (kein `SECURITY.md`, keine Kontaktadresse für Meldungen).

Taktik: Für jedes neue npm-Paket im Formular-/Tracking-Stack (z.B. Formular-Validierung,
Analytics-SDKs, Payment-Wrapper) diese 6 Punkte kurz gegenchecken, bevor es in ein
Kundenprojekt kommt. Bei Treffer: Alternative mit besserer Wartungslage suchen (bevorzugt
direkter Nachfolger/Drop-in-Replacement) statt das Risiko stillschweigend zu übernehmen.

## Regel 4 — Agenten-Pipelines (CI/CD) mit KI-Agenten absichern

Quelle: `plugins/agentic-actions-auditor/skills/agentic-actions-auditor/SKILL.md`
(nur kurz erwähnt — volle Tiefe dort, falls GitHub-Actions-Workflows mit Claude Code
Action/Codex/Gemini CLI im Kundenprojekt laufen).

Kernpunkte, die auch für unsere eigenen Agenten-Setups gelten:
- Tool-Allowlists sind kein vollständiger Schutz — selbst `echo` kann per
  Subshell-Expansion (`echo $(env)`) Secrets exfiltrieren.
- Daten können über `env:`-Blöcke ohne sichtbaren `${{ }}`-Ausdruck im Prompt selbst
  trotzdem attacker-controlled beim Agenten ankommen ("env var intermediary miss").
- `pull_request_target`/`issue_comment`-Trigger öffnen Workflows für externen Input auch
  ohne Schreibrechte des Angreifers.

## Rote Flaggen aus dem Vendor-Repo selbst (Meta-Ebene)

Beim Vendoring am 20.07.26 geprüft:
- **Lizenz:** CC-BY-SA-4.0 (Attribution-ShareAlike) — Weitergabe/Anpassung erlaubt,
  Namensnennung + Share-Alike-Pflicht bei Weiterverbreitung des Originalmaterials.
- **Kein Root-`.claude/`-Ordner** — nur `.claude-plugin/`-Manifeste pro Plugin (Plugin-
  Marketplace-Struktur), daher keine Umbenennung nach `.claude.vendored-disabled` nötig.
- **Hooks vorhanden** in mehreren Plugins (`modern-python/hooks`, `gh-cli/hooks`,
  `skill-improver/hooks`, `fp-check/hooks`) — u.a. SessionStart-Hooks, die `uv`/`gh`/`pip`
  durch Shims ersetzen bzw. GitHub-Fetches auf `gh`-CLI umleiten
  (`gh-cli/hooks/intercept-github-curl.sh`, `intercept-github-fetch.sh`). Diese Skills
  wurden **nicht** symlinkt/aktiviert — reine Kenntnisnahme, keine Installation.
- **Keine Netz-Calls/Auto-Update/exec-von-Fremd-Input** in den hier destillierten Skills
  (insecure-defaults, sharp-edges, supply-chain-risk-auditor) — diese sind reine
  Lese-/Grep-Analyse-Anleitungen (`allowed-tools: Read Grep Glob Bash`), kein
  Netzwerkzugriff im Skill-Text selbst.

## Nicht dupliziert

Statische-Analyse-Tooling-Tiefe (CodeQL, Semgrep-Regeln, SARIF-Parsing) bewusst nicht
übernommen — bei Bedarf `plugins/static-analysis/` und `plugins/semgrep-rule-creator/`
im Vendor-Pfad direkt nachschlagen.
