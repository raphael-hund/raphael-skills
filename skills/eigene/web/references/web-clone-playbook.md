# Web-Clone-Playbook — Referenzseite als Vorlage nachbauen

**Wofür:** Wenn eine bestehende Website (Kunden-Wunschreferenz, Wettbewerber-
Landingpage) als Vorlage für ein neues Projekt dienen soll — "baue mir etwas
Ähnliches wie Website X", "clone diese Landingpage als Baseline".

**Herkunft:** kondensiert aus `claude-skill-web-clone` (Jane / @xiaoerzhan,
MIT-Lizenz) — vollständige Attribution in `VENDORING-NOTE.md` dieses Skills.
Pfade auf Raphaels Linux-Umgebung umgeschrieben, chinesische Originalprosa
ins Deutsche übertragen und auf Agentur-Alltag (SMB-Websites, keine
WebGL-Exoten) gekürzt.

## Eiserne Regel: echter Quellcode zuerst, nie KI-Vermutungen abschreiben

Jede KI-generierte "Clone-Analyse" gilt als **potenziell komplett
halluziniert** im Code-Teil, bis sie Zeile für Zeile gegen den echten
Quellcode verifiziert ist. Belegter Schadensfall aus der Quelle: Eine
KI-Analyse beschrieb eine WebGL-Seite als "Ray-Marching + Signed-Distance-
Field", tatsächlich war es eine analytische Ray-Sphere-Intersection kombiniert
mit SVG `feDisplacementMap` — zwei völlig verschiedene Implementierungen.
Wer die falsche Beschreibung abschreibt, baut etwas Anderes und Langsameres.

**Konsequenz:** Erster Schritt ist immer "echten Source finden", nicht
"Website scrapen und Vermutungen anstellen".

## Entscheidungsbaum (der Reihe nach, keine Schritte überspringen)

0. **Projekt-Skeleton anlegen** — eigenes Verzeichnis pro Clone-Vorhaben,
   `NOTES.md` von Anfang an mitführen (Vorlage unten).
1. **Zuerst nach echtem Source suchen** (GitHub, `gh api repos/<u>/<r>`,
   Domain-Slug ist oft der Repo-/User-Name) — **bevor** man scrapt. Spart
   typischerweise die meiste Arbeit, wenn die Seite Open Source ist.
2. **Kein Source gefunden → Browser-Recon.** Framework/Fonts/Canvas/DOM
   erfassen, Screenshots bei 3 Breakpoints (Desktop/Tablet/Mobile).
3. **Komplexität einstufen (L1–L6), bevor irgendetwas versprochen wird**
   (Tabelle unten) — verhindert Überversprechen gegenüber dem Kunden.
4. **Pfad wählen** je nach Recon-Ergebnis:
   - Statisches HTML/CSS ohne Framework → Mirror + Tracking löschen + Copy
     tauschen.
   - React/Vue/Next (Content-Site) → Framework-Rebuild, mit eigenem Content
     füllen.
   - SPA/datengetrieben → API-Fixtures per Network-Capture, lokal mocken.
   - Mehrseitig → Route-Crawl für Sitemap, dann pro Seitentyp eine Vorlage.
   - Komplexe Interaktion → Interaction-Probe (Hover/Click/Scroll-Zustände),
     nicht nur den ersten Bildschirm abfotografieren.
   - WebGL/Canvas/Three.js → nur bei Bedarf, siehe Kurzhinweis am Ende.
5. **Projekt aufsetzen**, Original als Read-Only-Baseline behalten.
6. **Tracking entfernen + NOTES.md + echte Browser-Verifikation** (nicht nur
   "sollte laufen" behaupten — lokal starten, Konsole auf Fehler prüfen,
   Screenshot gegen Original vergleichen).
7. **Content gegen den eigenen Content tauschen** — Ziel ist immer "die
   eigene Seite des Kunden", nie eine 1:1-Kopie zum Ausliefern.

## Lizenz- und Attributions-Check (Pflicht vor jedem Clone)

```bash
gh api repos/<user>/<repo> | jq '.license'
```

| Lizenz | Was erlaubt ist |
|---|---|
| MIT / Apache / BSD / Unlicense | Ändern und live schalten erlaubt, Attribution beibehalten |
| **Keine LICENSE-Datei / nicht deklariert** | **Alle Rechte vorbehalten per Default.** Nur lokal lernen/nachbauen, Autor nennen, **kein öffentliches Redeploy ohne Erlaubnis** |
| Proprietär / ausdrücklich untersagt | Nur lesen/lernen, nicht kopieren, nicht deployen |

**Harte Regel:** "Auf GitHub öffentlich sichtbar" ist **nicht** gleich
"MIT-lizenziert". Bei Unklarheit: nachfragen statt annehmen. Dieser Check ist
Teil des Launch-Gates (siehe Haupt-SKILL.md, Abschnitt Launch) — ein Clone
ohne geklärte Lizenz geht nicht live.

## Komplexitätsskala L1–L6 (Kundenerwartung kalibrieren)

| Stufe | Typ | Übliche Wiedergabetreue | Standard-Grenze |
|---|---|---|---|
| L1 | Statisches HTML/CSS | 90–98 % | Fast pixelgenau möglich, Bildrechte separat prüfen |
| L2 | CMS/Content-Site | 70–90 % | Frontend nachbaubar, CMS-Backend nicht |
| L3 | React/Vue/Next Content-Frontend | 65–90 % | Daten/API per lokalem JSON-Mock ersetzbar |
| L4 | Animierte Brand-Site (GSAP, Scroll) | 50–80 % | Hauptvisuals nachbaubar, Mikro-Interaktionen oft nur angenähert |
| L5 | WebGL/Canvas/Three.js | 30–95 % | Mit Source hoch erreichbar, ohne Source erst technisch aufschlüsseln |
| L6 | SaaS/E-Commerce/Login-System | Nur Anzeigeschicht | Server-Business-Logik, Auth, Payment werden **nie** versprochen |

**Diese Prozente waren bis 29.07.2026 reine Prosa.** Sie standen hier zur
Kundenkalibrierung — und nichts hat je nachgemessen, ob ein Klon sie erreicht.
`visual-diff.mjs` rechnet gleichzeitig eine Note von 5 bis 1 aus und endet danach
**immer** mit Exit 0, egal wie schlecht sie ist (`process.exit(1)` steht dort nur
im `catch`-Block). Zwei Hälften derselben Frage, die sich nie begegnet sind.

```bash
node scripts/web-clone/klon-gate.mjs --stufe L2 --diff visual-diff.json --audit audit.json
```

Das Tor hält die gemessene Wiedergabetreue gegen die **Untergrenze** der Stufe —
bewusst das untere Ende des Bereichs oben: die Tabelle beschreibt, was üblich
erreichbar ist, das Tor fragt nach dem Minimum davon.

| Stufe | Tor verlangt |
|---|---|
| L1 | ≥ 90 % |
| L2 | ≥ 70 % |
| L3 | ≥ 65 % |
| L4 | ≥ 50 % |
| L5 / L6 | keine Pixel-Grenze — ehrlich als `[SKIP]` |

`--stufe` wird **nicht geraten**: sie entscheidet, was der Klon leisten muss.
Fehlt sie, endet das Tor mit Exit 2. Dasselbe gilt für ein fehlendes
`diffRatio` — „Feld fehlt" ist nicht „0 Abweichung", und ein vertipptes Flag
fällt nicht still auf den Default zurück.

**Ohne `--audit` ist der Blocker-Check `[SKIP]`, nicht bestanden.** Ein Klon mit
dem Analytics-Code der fremden Seite ist ein Rechtsproblem, kein
Schönheitsfehler. Und wie im G1-Tor: sind **alle** Prüfer übersprungen (L5 ohne
Audit), gibt es Exit 2 statt Grün — übersprungen ist kein Urteil.

Belegt: `node evals/run-klon-gate.mjs` (21 Fälle — 8 müssen reißen, 7 sind
Exit 2, 5 müssen bestehen; dazu eine Prüfung, dass `visual-diff` weiterhin nicht
selbst blockt, damit dieses Tor nicht unbemerkt überflüssig wird).

**Nie versprechen:** Login, Payment, Bestellprozesse, Such-/Empfehlungslogik,
Server-seitige Business-Logik, proprietäre APIs, urheberrechtlich geschütztes
Material.

## Doku-Vorlage — NOTES.md (Pflicht pro Clone-Vorhaben)

```markdown
# <Projektname> · Clone-Notizen

## Quelle
- Original-URL:
- Source-Repo (falls vorhanden):
- Original-Autor:
- Lizenz: MIT / Apache / KEINE / proprietär  ← siehe Lizenz-Check oben
- Attributionspflicht:

## Tech-Stack
- Framework / Kernlibs / Node-Version:

## Vorab-Einschätzung
- Komplexität: L1–L6
- Empfohlener Modus: treuer Nachbau / visueller Nachbau / Content-Umbau
- Was hochtreu geht:
- Was nur angenähert geht:
- Was NICHT nachgebaut wird:
- Hauptrisiko: Lizenz / Assets / Login / API / Performance / Responsive

## Was geändert wurde
- Tracking entfernt: (Zeilen/Dateien)
- ...

## Verifikation
- [ ] Lokal gestartet, Konsole ohne Fehler
- [ ] Screenshot-Vergleich gegen Original
- [ ] Mehrseitig: Routen-Abgleich gemacht
- [ ] Interaktionsreich: Hover/Click/Scroll-Zustände geprüft
- Nicht verifizierbare Punkte (ehrlich dokumentieren, nichts vorspiegeln):
```

Bei größeren/komplexeren Clones zusätzlich (nur bei Bedarf, kein Pflichtteil):
`TEARDOWN.md` (technische Aufschlüsselung mit Quellzeilen-Belegen),
`CLONE_REPORT.md` (Original-vs-Clone-Vergleichstabelle für Reporting),
`CLONE_AUDIT.md` (Scan auf Tracking-Reste, Fremdmarken-Reste, TODOs,
riskante externe URLs — Pflicht-Check unmittelbar vor Launch).

## Automatisierungs-Scripts (vendoriert, optional)

Unter `scripts/web-clone/` liegen die Playwright-Node-Scripts der
Originalquelle (MIT), Pfade auf Linux umgeschrieben. Reine CLI-Tools, keine
Hooks, kein Autostart — nur explizit aufrufen, wenn Playwright im Zielsystem
verfügbar ist (`npm install -D playwright` im jeweiligen Clone-Projekt):

- `recon-site.mjs` — Framework/Fonts/Canvas/DOM erfassen + 3 Breakpoint-Screenshots.
- `asset-harvest.mjs` — Bilder/CSS/JS aus dem Recon-Ergebnis herunterladen.
- `network-capture.mjs` — API-Traffic als Fixtures für SPA-Mocking sichern.
- `route-crawl.mjs` — Mehrseiten-Sitemap crawlen (Screenshots pro Route).
- `interaction-probe.mjs` — Hover/Click/Scroll/Drag-Zustände automatisiert erfassen.
- `mirror-site.mjs` — vollständiges Asset-Mirroring für statisch gebaute Seiten.
- `visual-diff.mjs` — Pixel-Diff Original vs. Clone. **Urteilt nicht selbst**
  (immer Exit 0) — die Zahl wird von `klon-gate.mjs` gegen die Stufen-Grenze
  gehalten, siehe Komplexitätsskala oben.
- `klon-gate.mjs` — das Annahme-Tor: Wiedergabetreue gegen L1–L6 plus
  Launch-Blocker aus dem Audit, in einem Exit-Code.
- `audit-clone.mjs` — Scan auf Tracking-Reste/Fremdmarken/TODOs/riskante URLs vor Launch — deckt sich mit dem QA-Fächer-Schritt im Haupt-SKILL.md.
- `sourcemap-hunt.mjs`, `compare-recon.mjs`, `dna-scaffold.mjs`, `init-clone.mjs` — Zusatzwerkzeuge für Source-Map-Suche, automatisierten Vergleichsreport, Design-DNA-Grundgerüst, Projekt-Skeleton.

## WebGL/Canvas-Reverse-Engineering — nur als Prinzip, nicht als Fachwissen

Für den seltenen Fall eines WebGL-schweren Kunden-Referenzprojekts: drei
Grundsätze aus der Quelle, ohne das volle Shader-Fachdetail zu übernehmen
(zu nischig für den Agentur-Alltag):

1. **Beweisgrad pro Befund markieren:** SOURCE (echter Code/Source-Map/Laufzeit-Dump) vs. PARTIAL (Indiz, noch zu belegen) vs. GUESS (optisch geraten). Ungekennzeichnet = GUESS. Vor dem Abschreiben immer auf SOURCE heben.
2. **No-Compensation-Regel:** nie Helligkeit/Speed/Rauschen anpassen, um einen Timing- oder Koordinatenfehler zu verschleiern — der Fehler bleibt ein Fehler, nur besser versteckt.
3. **Baseline-first:** erst eine pixelgenaue 1:1-Rohwiedergabe mit echten Draw-Calls/Shadern verifizieren, danach erst umbauen/refactorn.

Für den Vollausbau (Marbles-Fallstudie, feDisplacementMap-Technik) bei Bedarf
das Original-Repo `claude-skill-web-clone` (vendoriert unter
`/root/tools/vendor/claude-skill-web-clone/references/`) konsultieren.
