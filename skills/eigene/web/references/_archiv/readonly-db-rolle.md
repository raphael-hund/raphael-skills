# Read-Only-DB-Rolle für Agenten — sicherer Datenzugriff

**Wofür:** Sobald ein Agent für ein Kundenprojekt direkten Datenbankzugriff
(Supabase/Postgres) braucht, um Content/Daten zu prüfen (z. B. CMS-Content,
Formular-Einträge während der QA) — dieses Muster als sichere Referenz
nutzen, statt Ad-hoc-Zugangsdaten mit Schreibrechten zu teilen.

**Herkunft:** kondensiert aus `davidondrej/skills`,
`skills/ops-and-setup/create-readonly-db-role/SKILL.md` (MIT-Lizenz).

## Das Muster — 3 Schichten

1. **Harte Wand — Grants.** Die Rolle bekommt nur SELECT, sonst nichts.
   Schreiben ist unmöglich, nicht nur unerwünscht.
2. **Denylist statt Allowlist.** SELECT auf ALLE aktuellen + zukünftigen
   Tabellen in `public` gewähren (via Default Privileges), danach die
   sensiblen Tabellen (API-Keys, Webhook-Payloads, Secrets) einzeln
   entziehen. Nie das `auth`-Schema gewähren. Neue Tabellen sind automatisch
   lesbar — neue sensible Tabellen brauchen einen manuellen Entzug.
3. **Weiche Leitplanken.** `default_transaction_read_only = on` plus
   `statement_timeout = '10s'`.

**RLS-Fallstrick:** Hat eine Tabelle Row Level Security und keine Policy
erwähnt die neue Rolle, liefert jedes SELECT 0 Zeilen. Fix: `alter role ...
bypassrls` — sicher, weil Bypass nur die Zeilenfilterung überspringt; die
SELECT-only-Grants und die Denylist gelten weiterhin.

## SQL-Vorlage

```sql
-- 1. Rolle + weiche Leitplanken
create role agents_readonly with login password 'ERSETZEN';
alter role agents_readonly set default_transaction_read_only = on;
alter role agents_readonly set statement_timeout = '10s';

-- 2. Die eigentliche Wand: SELECT-only, Denylist-Modell
grant usage on schema public to agents_readonly;
grant select on all tables in schema public to agents_readonly;
alter default privileges for role postgres in schema public
  grant select on tables to agents_readonly;   -- zukünftige Tabellen automatisch lesbar

-- 3. Denylist: sensible Tabellen bleiben unsichtbar (pro Projekt anpassen)
revoke select on table public.api_keys from agents_readonly;
revoke select on table public.email_webhook_events from agents_readonly;

-- 4. nur falls RLS aktiv ist und keine Policy diese Rolle abdeckt
alter role agents_readonly bypassrls;
```

Zurückrollen: `drop owned by agents_readonly; drop role agents_readonly;`

## Ablauf

1. Prüfen, ob die Rolle schon existiert (`select rolname from pg_roles where rolname = 'agents_readonly';`).
2. Denylist gemeinsam mit dem Menschen festlegen — welche Tabellen enthalten
   Secrets/PII, die Agenten nie sehen dürfen?
3. SQL **zuerst in eine Repo-Datei** schreiben (z. B.
   `docs/database/create-agents-readonly-role.sql`) mit Kommentaren: was/warum/
   wie anwenden/wie verifizieren/wie zurückrollen. SQL nie nur im Chat
   übergeben.
4. **Der Mensch wendet es an** — Agenten führen nie DDL auf Produktionsdaten
   aus. Bei Supabase: komplette Datei in den SQL-Editor einfügen, danach die
   Query aus der Editor-Historie löschen (enthält das Passwort). Passwort im
   Passwort-Manager ablegen.
5. Connection-String als lokale Env-Variable verdrahten (nie committen).
   Supabase Session-Pooler: Username ist `agents_readonly.<project-ref>`,
   Port 5432.
6. Mit der Verifikationsschleife unten prüfen.

## Verifikationsschleife (alle müssen bestehen)

```bash
URL="$MYPROJ_READONLY_DB_URL"
psql "$URL" -X -c "select current_user;"                      # -> agents_readonly
psql "$URL" -X -c "show statement_timeout;"                   # -> 10s
psql "$URL" -X -c "select count(*) from public.<grosse_tabelle>;"  # -> echte Zahl, NICHT 0
psql "$URL" -X -c "delete from public.<beliebige_tabelle> where false;"
# -> ERROR: read-only transaction (weiche Leitplanke)
psql "$URL" -X -c "begin; set transaction read write; delete from public.<beliebige_tabelle> where false; rollback;"
# -> ERROR: permission denied (die harte Wand)
psql "$URL" -X -c "select * from public.<denylisted> limit 1;"    # -> ERROR: permission denied
psql "$URL" -X -c "select * from auth.users limit 1;"             # -> ERROR: permission denied
```

Schreibversuche müssen **zweifach** blockiert werden: einmal durch die
Read-Only-Leitplanke, einmal durch `permission denied` mit ausgeschalteter
Leitplanke. Schlägt ein Check fehl: Grants korrigieren, ALLE Checks erneut
laufen lassen.

## Fehlerbilder

- **Jede Tabelle liefert 0 Zeilen** → RLS aktiv, Rolle hat keine Policy →
  `bypassrls` ergänzen.
- **Ein Schreibversuch gelang während der Verifikation** → Grants falsch.
  Stopp, alles entziehen, Vorlage neu anwenden.
- **Supabase-Auth fehlgeschlagen** → Pooler-Username muss
  `agents_readonly.<project-ref>` sein, nicht die nackte Rolle.

## Regel

Schreibzugriff auf Produktionsdaten bleibt **immer** menschlich. Diese Rolle
ist nur für Lesezugriff zur Content-/Daten-Prüfung während QA, nie ein Weg
zu automatisierten Schreibvorgängen.
