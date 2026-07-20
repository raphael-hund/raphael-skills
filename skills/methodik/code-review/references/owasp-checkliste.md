# OWASP-Checkliste — Top 10:2025 + ASVS-Kern

**Herkunft:** destilliert aus [agamm/claude-code-owasp](https://github.com/agamm/claude-code-owasp)
(MIT-Lizenz, vendored nach `/root/tools/vendor/claude-code-owasp`). Gekürzt und
auf Agentur-Realität gemappt: Next.js-Websites, Kontaktformulare, Airtable-
und Meta-API-Anbindungen (Ads-Sync). Kein Enterprise-Kram (HSM, Pen-Testing-
Level-3) — nur was bei uns tatsächlich vorkommt.

Nutzen: bei Code-Reviews von Formularen, API-Routes, Server-Actions,
Webhook-Handlern und Integrations-Skripten (Meta/Pipedrive/Airtable) als
Zusatz-Checkliste neben `zwei-achsen-review.md` / `audit-playbook.md` laden.

## OWASP Top 10:2025 — Quick Reference

| # | Risiko | Worauf achten (Agentur-Kontext) |
|---|--------|----------------------------------|
| A01 | Broken Access Control | Next.js API-Routes/Server-Actions: Auth-Check auf JEDER Route, nicht nur im Middleware-Layer vermuten. Kunden-IDs/Airtable-Record-IDs nie ungeprüft aus der Anfrage übernehmen (IDOR). |
| A02 | Security Misconfiguration | `.env`/Secrets nie im Repo, CORS auf Kundendomains beschränken, Default-Configs (Next.js `output`, Debug-Modus) für Prod härten. |
| A03 | Software Supply Chain Failures | `package-lock.json` committen, `npm audit` vor Deploy, keine ungeprüften Low-Star-Pakete für Ads-/Formular-Logik. |
| A04 | Cryptographic Failures | Meta/Airtable-API-Keys nie im Client-Bundle (`NEXT_PUBLIC_*` nur für wirklich öffentliche Werte), TLS überall, Tokens nicht loggen. |
| A05 | Injection | Formular-Input server-seitig validieren (Zod o. ä.) bevor er an Airtable/Meta-API/DB geht; keine String-Konkatenation in Queries. |
| A06 | Insecure Design | Rate-Limiting auf Kontaktformularen (Spam/Abuse), Webhook-Endpunkte gegen Replay/Flood absichern. |
| A07 | Authentication Failures | Falls Kunden-Login existiert: Sessions/Token korrekt invalidieren, keine schwachen Passwort-Regeln. |
| A08 | Software or Data Integrity Failures | Webhook-Payloads (Meta, Pipedrive) signaturprüfen wo verfügbar, keine ungeprüfte Deserialisierung von Fremd-Daten. |
| A09 | Security Logging and Alerting Failures | Fehlgeschlagene Formular-Submits / API-Fehler loggen (ohne PII im Klartext), damit Ausfälle auffallen statt still zu verpuffen. |
| A10 | Mishandling of Exceptional Conditions | Bei Airtable/Meta-API-Fehlern fail-closed (keine Anfrage stillschweigend verwerfen als "erfolgreich"), keine Stacktraces an den Client. |

## Checkliste: Formulare (Next.js Kontakt-/Lead-Formulare)

- [ ] Server-seitige Validierung aller Felder (nicht nur Client-seitig)
- [ ] Rate-Limiting / Honeypot / Captcha gegen Spam-Submits
- [ ] Keine Secrets (Airtable-Token, API-Keys) im Client-Bundle
- [ ] Eingaben vor Weiterleitung an Airtable/CRM sauber escaped/typisiert
- [ ] Fehlermeldungen an Nutzer generisch, Details nur ins Server-Log
- [ ] E-Mail-/Telefon-Felder gegen Injection in nachgelagerte Mail-Templates geprüft

## Checkliste: Airtable-/Meta-API-Integrationen

- [ ] API-Keys/Access-Tokens in Env-Vars oder Vault, nie hart codiert
- [ ] Least-Privilege-Scopes (z. B. Meta-Ad-Token nur Lesezugriff wo möglich)
- [ ] Webhook-Endpunkte verifizieren Absender (Signatur/Secret-Header)
- [ ] Retries/Timeouts gesetzt — kein endloses Hängen bei API-Ausfall
- [ ] Response-Daten aus Fremd-APIs validiert, bevor sie in eigene DB/UI landen
- [ ] Cron-/Sync-Jobs: Fehler landen im Log/Alert, nicht stillschweigend verschluckt

## ASVS-Kern (Level 1 — für alle Agentur-Projekte Pflicht)

- Passwörter (falls vorhanden) min. 12 Zeichen, gegen Breach-Listen geprüft
- Rate-Limiting auf Login/Formular-Endpunkten
- Session-Tokens mit ausreichender Entropie (128+ Bit)
- HTTPS überall, keine gemischten Inhalte

**Level 2 (bei sensiblen Kundendaten, z. B. eigene Kunden-Logins/CRM-Zugriff):**
zusätzlich MFA für sensible Aktionen, sauberes Schlüsselmanagement,
durchgängiges Security-Logging.

## Sichere Muster (Kurzreferenz)

```
# UNSAFE — String-Konkatenation
db.execute(f"SELECT * FROM leads WHERE email = '{email}'")

# SAFE — parametrisiert
db.execute("SELECT * FROM leads WHERE email = %s", (email,))
```

```
# UNSAFE — fail-open bei API-Fehler
try:
    return meta_api.check_budget(account)
except Exception:
    return True  # gefährlich!

# SAFE — fail-closed
try:
    return meta_api.check_budget(account)
except Exception as e:
    log.error(e)
    return False
```

## Agentic-AI-Risiken (relevant bei eigenen Agenten/Automationen)

| Risiko | Kurzform | Mitigation |
|--------|----------|------------|
| Goal Hijacking | Prompt Injection ändert Agenten-Ziel | Eingaben klar als "untrusted data" markieren, nie als Instruktionen behandeln |
| Tool Misuse | Agent nutzt Tools zweckfremd | Least-Privilege-Scopes, I/O validieren |
| Identity/Privilege Abuse | Geerbte/übertragene Credentials missbraucht | Kurzlebige, scoped Tokens statt Dauer-Keys |
| Supply-Chain (MCP/Plugins) | Kompromittierte MCP-Server/Skills | Herkunft prüfen, sandboxen, Allowlist |
| Unerwartete Code-Ausführung | Agent generiert/exekutiert unsicheren Code | Sandbox, Freigabe bei kritischen Aktionen |
| Memory/Context Poisoning | Manipulierte RAG-/Kontextdaten | Quellen nach Vertrauensstufe trennen |

**Volle Tiefe (LLM Top 10, ASVS Level 2/3, 20+ Sprachen mit Safe/Unsafe-Beispielen):**
siehe Original-Skill unter `/root/tools/vendor/claude-code-owasp/.claude/skills/owasp-security/`.
