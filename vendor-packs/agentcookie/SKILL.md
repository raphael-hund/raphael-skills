---
name: agentcookie
version: 0.1.0
description: >
  Hält die Browser-Session eines autorisierten Mac verschlüsselt über Tailscale mit
  einer Linux-Agentenbox synchron, damit Agenten dort unter der eigenen Identität im
  Browser arbeiten. Prüft CLI, Pairing, Tailscale, CDP und Cookie-Policy und meldet
  fehlende Infrastruktur als BLOCKED statt als Erfolg.
  Trigger: "agentcookie", "Browser-Session synchronisieren", "Agent ist im Browser
  ausgeloggt", "Cookies auf den Linux-Agenten", "Session-Sync Mac Linux".
class: G
scope: agency
sensitivity: secret
source: >
  mvanhorn/agentcookie @ e498e93bcaac867386dfba12ea709882dff037ba (tag v1.0.0), MIT.
  Nur Bedienwissen vendored; kein Go-Quellcode und kein Binary im Repository.
loads:
  - references/installation.md
completion_criteria:
  - "Die genutzte agentcookie-CLI ist mit ihrer Version belegt; fehlt sie, lautet das Ergebnis BLOCKED"
  - "Pairing, Tailscale-Erreichbarkeit und der loopback-gebundene CDP-Endpunkt sind mit echter Befehlsausgabe belegt"
  - "Die wirksame Cookie-Policy ist genannt und entspricht Allowlist oder leerer Freigabe, solange Raphael nichts anderes ausdrücklich anordnet"
  - "Kein Cookie-Wert, Token, Schlüssel oder Sidecar-Pfadinhalt steht in Ausgabe, Bericht oder Repository"
  - "Ein fehlender Mac-Endpunkt, fehlendes Pairing oder fehlendes CDP ist als BLOCKED beziehungsweise nicht geprüft gemeldet, nie als PASS"
---

# agentcookie — autorisierte Browser-Session auf der Agentenbox

**Zweck (1 Satz):** Der Linux-Agent soll im Browser als Raphael eingeloggt sein, ohne dass
Cookie-Material jemals in ein Repository, ein Log oder einen Prompt gelangt.

Dieser Skill ist **Infrastruktur**, kein Engineering-Workflow. Wie Code geschrieben,
geprüft und geliefert wird, gehört zu `pstack-poteto-mode` und den `ce-*`-Skills. Hier geht
es ausschließlich um die Frage, **ob** die Browser-Session gültig ist.

## Schritt 1 — Lage feststellen, bevor irgendetwas geändert wird

```bash
agentcookie doctor
agentcookie status --json
```

`doctor` prüft Tailscale-Bindung, den CDP-Port und die Policy. `status --json` wird **nur**
auf Statusfelder gelesen, etwa Schreibmodus und Anzahl injizierter Cookies. Cookie-Werte
sind keine zulässige Prüfausgabe und werden nicht angezeigt, zitiert oder gespeichert.

Fehlt die CLI, fehlt das Pairing, antwortet Tailscale nicht oder ist kein CDP-Endpunkt
erreichbar, endet der Lauf als **BLOCKED**. Ein nicht erreichbarer Mac ist `nicht geprüft`,
niemals ein bestandener Check.

## Schritt 2 — Rolle wählen

| Rolle | Wann | Kern |
|---|---|---|
| `source` | der Mac, an dem Raphael tatsächlich browst | liest Chrome-Cookies read-only und versiegelt sie |
| `sink` | die Linux-Agentenbox | empfängt und injiziert live in den laufenden Browser |

```bash
agentcookie wizard install --as source
agentcookie wizard install --as sink
agentcookie pair --as sink --peer <host> --code <code> --pair-url <url>
agentcookie sink
```

Der Pairing-Code ist ein Geheimnis. Er wird nicht in Dateien, Berichte oder Nachrichten
geschrieben.

## Schritt 3 — Erfolg richtig lesen

Auf dem Linux-Sink werden **0 Cookies in Chromes SQLite** geschrieben. Das ist der
Normalfall und kein Fehler. Der Erfolg ist die Live-Injektion über das DevTools-Protokoll.
Wer die SQLite-Datei als Beleg heranzieht, misst die falsche Stelle.

## Harte Grenzen

- **Standard ist Allowlist beziehungsweise leere Freigabe.** Eine breite „sync-all“-Policy
  gilt erst nach Raphaels ausdrücklicher Anordnung für eine benannte Box.
- **CDP bleibt loopback-gebunden.** Jeder Prozess desselben Nutzers kann sich sonst
  anhängen und injizierte Cookies mitlesen.
- **Transport ist ausschließlich das autorisierte Tailscale-Netz**, verschlüsselt.
- **Google- und Workspace-Sessions gelten als nicht kopierbar** (DBSC). Dort hilft nur ein
  lokaler Login auf dem Sink. Das Gegenteil wird nie behauptet.
- **Nichts Geheimes ins Repository.** Keine Cookie-Datenbank, kein Sidecar-Inhalt, kein
  Schlüssel, kein Pairing-Code, kein Binary.
- **Fremde Sessions bleiben unberührt.** Dieser Skill synchronisiert nur Raphaels eigene,
  ausdrücklich autorisierte Identität.

## Gotchas

- Der unverschlüsselte Sidecar-Speicher auf dem Sink ist ein reales Risiko. Die Box gilt
  als vertrauenswürdig oder der Sync unterbleibt.
- Ein leeres `status --json` heißt „nicht verbunden“, nicht „nichts zu tun“.
- Kopierte Google-Cookies laufen binnen Minuten ab. Wer das als Fehler des Tools meldet,
  hat die DBSC-Grenze übersehen.
- Installationsdetails, Pfade und Versionsanker stehen in
  [`references/installation.md`](references/installation.md) und werden nur bei Bedarf geladen.
