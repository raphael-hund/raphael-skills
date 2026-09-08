---
name: raphael-chrome
version: 0.3.1
description: >-
  Steuert und repariert Raphaels dauerhaften VPS-Chrome (CDP 127.0.0.1:9222)
  mit persistenten Logins und Passwort-Autofill. Nutzen fuer Login, Session,
  Autofill und Klick im eigenen Chrome. Oeffentliche Suche, Scrape und PDF
  zuerst ueber firecrawl. Trigger: chrome, browser, VPS-Browser,
  Cloudflare, CAPTCHA, Renderer, CDP, 9222, Passwort autofill, website klicken.
class: O
scope: agency
sensitivity: internal
source: Eigene Capability-Primitive fuer Raphaels verwalteten VPS-Chrome
completion_criteria:
  - "scripts/browser-doctor.sh check endet mit exit 0 und meldet health=ok, runtime=ok sowie mindestens einen Renderer"
  - "scripts/smoke-browser-runtime.sh meldet PASS fuer Runtime, contenteditable-Ersatz und Challenge-Erkennung/-Warten"
  - "Die angeforderte Browser-Aktion ist per DOM-State oder Screenshot belegt"
  - "Eine interaktive CAPTCHA-, Turnstile- oder MFA-Pruefung wurde an Raphael uebergeben statt automatisiert geloest"
---

# raphael-chrome — VPS Chrome steuern

## Wann

Login, Session, Autofill, Klick und Screenshot im eigenen VPS-Chrome.
API-Key aus einer Web-Oberfläche holen. **Nicht** für öffentliche Suche,
Scrape oder PDF: zuerst Skill `firecrawl`. **Nicht** für HTTP-API mit
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
/root/raphael-skills/skills/raphael-chrome/scripts/browser-doctor.sh check
/root/raphael-skills/skills/raphael-chrome/scripts/browser-doctor.sh repair
/root/raphael-skills/skills/raphael-chrome/scripts/smoke-browser-runtime.sh
raphael-chrome tabs
raphael-chrome open https://trello.com/
raphael-chrome snapshot <id> 8000
raphael-chrome screenshot <id> /tmp/out.png
raphael-chrome click <id> 'css-selector'          # Default = menschlicher Mausklick
raphael-chrome type <id> 'input[name=x]' 'text'   # Default = Tasten mit Delay
raphael-chrome upload <id> '#upload-files' /abs/bild-a.png /abs/bild-b.png
raphael-chrome download-generated <id> /abs/mockup.png
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

1. `scripts/browser-doctor.sh check` ausfuehren. Bei Exit 10, 11 oder 14 einmal `repair`, danach erneut `check`; nur Exit 0 mit `health=ok` und `runtime=ok` ist arbeitsfaehig.
2. `open <url>` oder bestehenden Tab aus `tabs` nehmen. `open` injiziert Stealth und wartet soft auf Challenges.
3. Nach Navigation `snapshot` pruefen. Leerer Titel/URL trotz `health` ist ein Renderer-Fehler: `repair`, dann Navigation einmal wiederholen.
4. Bei Bot-Check `challenge <id>` → `wait-challenge <id> 25000` → erneut `snapshot` ausfuehren.
5. `snapshot` oder `screenshot` lesen und mit `click`, `type` oder `press` interagieren.
6. Login-Form: `autofill-hint` ausfuehren. Nur wenn `has_pass: true` und das Feld danach tatsaechlich gefuellt ist, absenden; sonst Raphael fuer die einmalige Eingabe ueber VNC anfragen.
7. API-Keys/Tokens nur als sichtbaren Wert auslesen, nach `/root/.secrets/api-keys.env` schreiben und `chmod 600` setzen. Ausgabe und Git-Logs frei von Secrets halten.
8. Aktion mit DOM-State oder Screenshot verifizieren; Muell-Tabs schliessen.

## Botschutz / Cloudflare (was geht, was nicht)

**Mit an Board:**
- Headed Chrome (kein Headless), Sandbox an, reales Profil + Cookies
- `navigator.webdriver` weg, UA/Languages DE, AutomationControlled disabled
- Menschliche Mausbewegung + Tasten-Delays (Default bei click/type)
- Challenge-Erkennung + Warten (JS-Challenge / „Just a moment“)

**Harte Grenze:**
- Interaktives Turnstile, CAPTCHA, MFA oder Passwort ohne funktionierendes Browser-Autofill → Raphael per VNC
- Schlechte VPS-IP-Reputation → alternativen legitimen Netzwerkzugang oder API-Zugang nutzen, nicht die Pruefung umgehen

## Codex / Sol

Login und Session immer über CDP `127.0.0.1:9222` (`raphael-chrome`).
Öffentliche Suche, Scrape, PDF zuerst `firecrawl`.
Orca computer nur für native Desktop-Fenster.

`codex exec` und die Codex-TUI nutzen denselben Chrome über MCP `vps-chrome`
(`@playwright/mcp --cdp-endpoint http://127.0.0.1:9222`) in:
`/root/tools/model-lanes/codex-home`, `/root/.codex-1`, `/root/.codex-2`, `/root/.codex`.
In der TUI: `/mcp` zeigt `vps-chrome`.
Passwörter bleiben in Chrome (`gnome-libsecret`). Autofill über die Login-UI,
nicht über eine Google-Password-Manager-API.

Der eingebaute Codex-Browser der ChatGPT-Desktop-App ist hier nicht der Weg.
Offizielle Doku: Browser ist in Codex CLI / IDE-Extension nicht verfügbar.

## Verbote

- Keine Passwort-DB dumpfen / `Login Data` entschlüsseln.
- Keine Secrets in Repo/PROGRESS/Worklog im Klartext.
- Kein `--remote-debugging-address=0.0.0.0`.
- Keine CAPTCHA-/Turnstile-Umgehung, kein Solver-Dienst, kein Fingerprint- oder Proxy-Rotationsversuch.
- Interaktive Identitaetspruefung: Raphael per VNC, nicht raten.

## Wenn CDP oder Renderer haengt

Symptome: `Runtime.evaluate` Timeout, Screenshot-Fehler, leere URL nach Navigation oder `health` antwortet trotz fehlender Renderer.

1. `scripts/browser-doctor.sh check` ausfuehren.
2. Bei Exit 10/11/14 genau einmal `scripts/browser-doctor.sh repair` ausfuehren. Exit 14 bedeutet: CDP-HTTP und Renderer leben, aber die Seiten-Runtime antwortet nicht.
3. `check` erneut ausfuehren und eine harmlose Seite per `goto` + `snapshot` pruefen.
4. Bleibt der Check rot, Dienststatus und Root-Screenshot sichern und Raphael informieren.

`repair` beendet verwaiste Playwright-CDP-Prozesse nur im Fehlerfall und startet den verwalteten Dienst neu. Das persistente Profil bleibt erhalten.

## Runbook

`/root/raphael-command-center/ops/runbooks/chrome-computer-use.md`
