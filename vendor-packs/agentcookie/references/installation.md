# agentcookie — Installation und Betriebspfade

Herkunft: `mvanhorn/agentcookie`, Tag `v1.0.0`, Commit
`e498e93bcaac867386dfba12ea709882dff037ba`, MIT. Nur Bedienwissen ist vendored.

## Bezug

Das Programm wird nicht in dieses Repository kopiert. Es wird auf der jeweiligen Maschine
aus der gepinnten Quelle gebaut oder als offizielles Release-Binary bezogen:

```bash
go install github.com/mvanhorn/agentcookie/cmd/agentcookie@v1.0.0
```

Vor der ersten Nutzung wird die Version der tatsächlich aufgerufenen CLI belegt. Eine nicht
auffindbare oder abweichende Version ist `BLOCKED`, kein stiller Weiterlauf.

## Pfade

| Pfad | Inhalt |
|---|---|
| `/usr/local/bin/agentcookie` | ausführbares Programm auf Mac und Linux |
| `~/.config/agentcookie/sink.yaml` | Listen-Adresse, Peer, CDP-Endpunkt |
| `~/.config/agentcookie/blocklist.yaml` | Cookie-Policy (Allowlist oder Blocklist) |
| `~/.config/systemd/user/agentcookie-sink.service` | Dauerbetrieb des Sinks |

Der lokale Cookie-Sidecar auf dem Sink liegt unverschlüsselt vor. Sein Pfad und Inhalt
werden nicht in Berichte, Prompts oder das Repository übernommen.

## Voraussetzungen

- Tailscale läuft auf beiden Maschinen und beide sind im selben autorisierten Tailnet.
- Der Chrome auf dem Linux-Sink läuft mit einem loopback-gebundenen Debugging-Port,
  üblicherweise `--remote-debugging-port=9223`.
- `doctor` prüft die Ports 9222 bis 9229 und 9400 sowie die Policy.

## Transport und Grenzen

Die Übertragung ist AES-256-GCM-versiegelt und läuft über den WireGuard-Kanal des
Tailnets. Der CDP-Port bleibt loopback-gebunden; jeder Prozess desselben Nutzers könnte
sich sonst anhängen.

Chrome Device-Bound Session Credentials lassen sich nicht kopieren. Google- und
Workspace-Sessions brauchen deshalb einen lokalen Login auf dem Sink.

## Prüfen ohne Geheimnisse

```bash
agentcookie doctor
agentcookie status --json
```

Aus `status --json` werden ausschließlich Statusfelder gelesen, etwa der zuletzt genutzte
Schreibmodus und die Anzahl injizierter Cookies. Cookie-Werte sind keine zulässige
Prüfausgabe.

Auf dem Linux-Sink ist „0 Cookies in Chromes SQLite“ der erwartete Zustand. Der Beleg für
Erfolg ist die Live-Injektion über das DevTools-Protokoll, nicht die Datenbankdatei.

## Nicht geprüft

Ein echter Mac-zu-Linux-Pairing-Lauf ist erst mit einem erreichbaren, autorisierten
Mac-Endpunkt prüfbar. Ohne ihn bleibt dieser Teil `nicht geprüft`.
