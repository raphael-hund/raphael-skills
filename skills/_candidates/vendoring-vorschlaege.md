# vendoring-vorschlaege.md — Kandidatenliste aus RoundtableSpace 22-Skills-Liste

Herkunft: RoundtableSpace 22-Skills-Starter-Liste (Skills #1 der Setup-Upgrade-Recherche
28.07.2026), Original-Tweet-Fund `evidence: RoundtableSpace_2082001862178255071`. Von den
22 gelisteten Skills sind 18 bereits im Setup vorhanden oder durch bestehende Skills
redundant abgedeckt (Detail-Abgleich: `harness-kontext.md` Abschnitt 7). Die folgenden
4 sind echte Lücken — hier als Kandidaten dokumentiert, **kein Install, kein Vendor-Pull**.
Vendoring-Politik gilt unverändert ("Pin, kein Masseninstall!" — VENDORING.md Zeile 3:
"Vendoring nur aus den von Raphael benannten Repos"). Freigabe/Ablehnung erst bei
nächster Vendoring-Runde durch Raphael.

Status: **candidate** — keiner der 4 Einträge ist aktiv oder installiert.

---

## 1. agent-browser

- **Zweck:** Browser-Steuerungs-Skill für Claude (Navigation, Interaktion, Scraping über
  einen echten Browser statt reinem HTTP-Fetch).
- **Quelle:** RoundtableSpace 22-Skills-Liste, Original-Tweet
  `evidence: RoundtableSpace_2082001862178255071`.
- **Was im Bestand fehlt:** kein Browser-Steuerungs-Skill für Claude im aktuellen Setup
  (bestehende Skills wie `gstack-browse` / `gstack-connect-chrome` decken g-stack-eigene
  Workflows ab, aber kein generisches Claude-Browser-Steuerungs-Äquivalent existiert).
- **Vendoring-Aufwand:** mittel — externes Repo, Commit-Pin + Audit nötig, Abgleich mit
  bereits vorhandenen `gstack-browse`/`gstack-connect-chrome`-Skills auf Überschneidung
  vor Übernahme.

## 2. claude-hud

- **Zweck:** Live-Sicht auf Agenten-Aktivität (Dashboard/HUD während Claude-Sessions
  laufen).
- **Quelle:** RoundtableSpace 22-Skills-Liste, Original-Tweet
  `evidence: RoundtableSpace_2082001862178255071`.
- **Was im Bestand fehlt:** kein Äquivalent — im aktuellen Setup gibt es keine Live-HUD
  für laufende Agenten.
- **Vendoring-Aufwand:** mittel — externes Repo, Commit-Pin + Audit nötig, plus Prüfung,
  ob es mit bestehendem Monitoring (z. B. Cron-Heartbeats, Session-Monitor) kollidiert
  oder sich ergänzt.

## 3. remotion

- **Zweck:** Video-Erzeugung React-basiert (programmatische Videos aus React-Komponenten
  statt klassischer Video-Pipeline).
- **Quelle:** RoundtableSpace 22-Skills-Liste, Original-Tweet
  `evidence: RoundtableSpace_2082001862178255071`.
- **Was im Bestand fehlt:** teilweise durch den bestehenden `video`-Skill abgedeckt, aber
  nicht React-basiert — echte Lücke bleibt der React-Rendering-Ansatz selbst.
- **Vendoring-Aufwand:** hoch — eigenes Framework mit Rendering-Pipeline (Node/React,
  Video-Encoding-Abhängigkeiten), größerer Audit- und Integrationsaufwand als reine
  Skill-Textdateien.

## 4. humanizer

- **Zweck:** Text "humanisieren" (KI-Text-Erkennungsmerkmale reduzieren/glätten).
- **Quelle:** RoundtableSpace 22-Skills-Liste, Original-Tweet
  `evidence: RoundtableSpace_2082001862178255071`.
- **Was im Bestand fehlt:** echte Lücke, aber `no-ai-slop` deckt bereits einen Teil der
  Funktion ab — vor Übernahme prüfen, ob der Rest-Bedarf die Installation eines eigenen
  Skills rechtfertigt oder ob `no-ai-slop` erweitert werden sollte.
- **Vendoring-Aufwand:** niedrig bis mittel — abhängig davon, ob als eigenständiger Skill
  vendoriert oder als Ergänzung in `no-ai-slop` eingearbeitet wird.

---

## Promotion-Weg

Keiner dieser 4 Kandidaten wird automatisch installiert. Nächste Vendoring-Runde:
Raphael sichtet diese Liste, entscheidet pro Eintrag Freigabe oder Ablehnung. Erst danach
folgt (falls freigegeben) echtes Vendoring mit Commit-Pin + Audit nach VENDORING.md.
