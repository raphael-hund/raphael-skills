---
name: raphael-chrome
version: 0.1.0
description: >-
  Steuert Raphaels dauerhaften VPS-Chrome (CDP 127.0.0.1:9222) mit Logins und
  Passwort-Autofill. Nutzen für Browser-Arbeit, Trello/Airtable/Google-UI,
  API-Keys aus Web-Oberflächen holen, Screenshots, Klicks. Prefer this over
  Orca computer-use for websites. Triggers: chrome, browser, trello login,
  airtable, CDP, 9222, Passwort autofill, website klicken.
class: O
scope: agency
sensitivity: internal
completion_criteria:
  - "Aktion im VPS-Chrome ausgeführt und per Screenshot oder DOM-State verifiziert"
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
raphael-chrome click <id> 'css-selector'          # Default = menschlicher Mausklick
raphael-chrome type <id> 'input[name=x]' 'text'   # Default = Tasten mit Delay
raphael-chrome human-click <id> 'css-selector'
raphael-chrome human-type <id> 'css-selector' 'text'
raphael-chrome press <id> Enter
raphael-chrome stealth <id>                       # Fingerprint-Patches
raphael-chrome challenge <id>                     # Cloudflare/Turnstile Status
raphael-chrome wait-challenge <id> [ms]           # warten bis Challenge weg
raphael-chrome autofill-hint <id>
raphael-chrome close <id>
```

Fallback-Pfad zum Script:

```bash
node /root/raphael-command-center/tools/vps-cdp-browser.js health
```

Env (optional):
- `RAPHAEL_CHROME_CHALLENGE_MS` — Wartezeit bei open/goto (Default 10–12s)
- `RAPHAEL_CHROME_DOM_CLICK=1` / `RAPHAEL_CHROME_DOM_TYPE=1` — alte schnelle DOM-Pfad

## Arbeitsablauf

1. `health` — wenn tot: `systemctl status raphael-chrome` (nicht selbst mit Passwort starten).
2. `open <url>` oder bestehenden Tab aus `tabs` nehmen. Open injiziert Stealth und wartet soft auf Challenges.
3. Bei Bot-Check: `challenge <id>` → `wait-challenge <id> 25000` → erneut `snapshot`.
4. `snapshot` / `screenshot` lesen.
5. Interagieren mit `click` / `type` / `press` (menschlich standard).
6. Login-Form: `autofill-hint` → Chrome füllt gespeicherte Credentials → `press Enter`.
7. API-Keys / Tokens: aus UI kopieren via `eval` nur den **sichtbaren** Key-Wert, dann nach `/root/.secrets/api-keys.env` schreiben (`chmod 600`). **Nie** in Git, Chat-Logs minimal halten.
8. Fertig: Tab `close` wenn Müll.

## Botschutz / Cloudflare (was geht, was nicht)

**Mit an Board:**
- Headed Chrome (kein Headless), Sandbox an, reales Profil + Cookies
- `navigator.webdriver` weg, UA/Languages DE, AutomationControlled disabled
- Menschliche Mausbewegung + Tasten-Delays (Default bei click/type)
- Challenge-Erkennung + Warten (JS-Challenge / „Just a moment“)

**Harte Grenze:**
- Interaktives Turnstile/Captcha, bei dem ein Mensch klicken muss → Raphael per VNC
- Schlechte VPS-IP-Reputation → bleibt Rest-Risiko

## Codex / Sol

Für Computer-Control-Aufgaben `sol-worker` oder `codex exec` mit diesem Skill.
Web = immer CDP (`raphael-chrome`). Orca computer nur für native Desktop-Fenster.

## Verbote

- Keine Passwort-DB dumpfen / `Login Data` entschlüsseln.
- Keine Secrets in Repo/PROGRESS/Worklog im Klartext.
- Kein `--remote-debugging-address=0.0.0.0`.
- Interaktives Captcha: Raphael per VNC, nicht raten.

## Wenn CDP hängt

Symptom: `Runtime.evaluate` Timeout, Browser-Version antwortet noch.

1. `bash /root/raphael-command-center/tools/kill-playwright-cdp-noise.sh`
2. Sonst: `sudo -n systemctl restart raphael-chrome`
3. Erneut `raphael-chrome health`

Ursache oft: zu viele Playwright-MCP-Prozesse auf Port 9222.

## Runbook

`/root/raphael-command-center/ops/runbooks/chrome-computer-use.md`
