---

name: raphael-chrome
description: >-
  Steuert Raphaels dauerhaften VPS-Chrome (CDP 127.0.0.1:9222) mit Logins und
  Passwort-Autofill. Nutzen für Browser-Arbeit, Trello/Airtable/Google-UI,
  API-Keys aus Web-Oberflächen holen, Screenshots, Klicks. Prefer this over
  Orca computer-use for websites. Triggers: chrome, browser, trello login,
  airtable, CDP, 9222, Passwort autofill, website klicken.
version: 0.1.0
class: O
scope: agency
sensitivity: internal
completion_criteria:
  - "CDP 9222 erreichbar oder Ausfall benannt"
  - "Aktion nur auf freigegebenen Domains/Profil"
---

# raphael-chrome — VPS Chrome steuern

## Wann

Jede Web-UI-Aufgabe auf dem VPS: einloggen, durchklicken, API-Key anlegen,
Formular ausfüllen, Screenshot, Session prüfen. **Nicht** für HTTP-API mit
bereits vorhandenem Token in `/root/.secrets/api-keys.env`.

## Architektur (kurz)

- Dienst: `raphael-chrome.service` (User `browser-agent`)
- Profil: `/var/lib/browser-agent/chrome-profile` — persistent, ~595 Logins
- CDP: nur `127.0.0.1:9222`
- Passwörter: `gnome-libsecret` (nie Klartext in Agent-Output)
- CLI: `raphael-chrome` → `tools/vps-cdp-browser.js`
- MCP: Playwright `@playwright/mcp --cdp-endpoint http://127.0.0.1:9222`

Desktop-Apps (nicht Browser-DOM) → Skill `computer-use` / `orca-computer`.

## CLI

```bash
raphael-chrome health
raphael-chrome tabs
raphael-chrome open https://trello.com/
raphael-chrome snapshot <id> 8000
raphael-chrome screenshot <id> /tmp/out.png
raphael-chrome click <id> 'css-selector'
raphael-chrome type <id> 'input[name=x]' 'text'
raphael-chrome press <id> Enter
raphael-chrome autofill-hint <id>
raphael-chrome close <id>
```

Fallback-Pfad zum Script:

```bash
node /root/raphael-command-center/tools/vps-cdp-browser.js health
```

## Arbeitsablauf

1. `health` — wenn tot: `systemctl status raphael-chrome` (nicht selbst mit Passwort starten).
2. `open <url>` oder bestehenden Tab aus `tabs` nehmen.
3. `snapshot` / `screenshot` lesen.
4. Interagieren mit `click` / `type` / `press`.
5. Login-Form: `autofill-hint` → Chrome füllt gespeicherte Credentials → `press Enter`.
6. API-Keys / Tokens: aus UI kopieren via `eval` nur den **sichtbaren** Key-Wert, dann nach `/root/.secrets/api-keys.env` schreiben (`chmod 600`). **Nie** in Git, Chat-Logs minimal halten.
7. Fertig: Tab `close` wenn Müll.

## Codex / Sol

Für Computer-Control-Aufgaben `sol-worker` oder `codex exec` mit diesem Skill.
Web = immer CDP (`raphael-chrome`). Orca computer nur für native Desktop-Fenster.

## Verbote

- Keine Passwort-DB dumpfen / `Login Data` entschlüsseln.
- Keine Secrets in Repo/PROGRESS/Worklog im Klartext.
- Kein `--remote-debugging-address=0.0.0.0`.
- Cloudflare-Captcha: Raphael per VNC, nicht raten.

## Runbook

`/root/raphael-command-center/ops/runbooks/chrome-computer-use.md`
