# Anfänger-Pfad — web-Skill in 5 Minuten

**Zweck:** Ein Agent, der den Skill zum ersten Mal nutzt, weiß sofort **welche
2–4 Dateien** er laden muss — nicht alle 30 References. (Cockpit-Detail-Ablauf
danach: `loop2-ablauf.md`.)

**Regel:** SKILL.md = Dach und Gates. Detail nur in der Datei aus der Tabelle
unten. Nie die ganze `raphael-loads`-Liste auf einmal lesen.

---

## 1. Auftrag wählen (erster Treffer gewinnt)

| Du sollst … | Lade genau diese Dateien (Reihenfolge) | Fertig-Kriterium |
|---|---|---|
| **Neue Landingpage / Ads-LP** von null | `landingpage-struktur.md` → `loop2-ablauf.md` → Skill **design** (taste-Linie **in** design, nicht Skill `taste`) → `tool-usecase-router.md` + `resource-access.mjs show "<Name>"` + Werkzeugtabelle in `art-direction.md` **vor** npm i → `qa-faecher.md` | Form im Fold, Kontaktdaten zuletzt, axe=0, `werkzeug-gate.mjs` Exit 0 |
| **Mehrseitige Website** planen | `sitemap-section-planung.md` → `informationsarchitektur.md` → `loop2-ablauf.md` | Abnahme-Checkliste in sitemap-section-planung grün |
| **Nur Design/Look polieren** | design-Skill (nicht taste/impeccable extra) + `screenshot-kritik-loop.md` + `shot-sweep.mjs` | Sweep + PNGs gelesen + Fixliste leer |
| **Ship / Launch-Check** | `qa-faecher.md` → `agentur-rubrik.md` → `agent-roster.md` → `vercel-git-deploy.md` | Fächer 1–6 grün, Rubrik 1–25 oder Ausnahme; Org-`origin` + Preview |
| **Premium/Gauntlet** (gegen Weltklasse) | `screenshot-kritik-loop.md` (inkl. 3b Blind-A/B) → `agentur-rubrik.md` → `lexlin-design-prinzipien.md` + `damien-design-methodik.md` | Blind-A/B dokumentiert, max 3 Zyklen |
| **Referenzseite nachbauen** (URL) | `web-clone-playbook.md` **zuerst** (Lizenz!) → dann Clone-Scripts | Lizenz-Check schriftlich vor Code |
| **Screenshot/Bild nachbauen** | `rebuild-from-image.md` → `bildgenerierung.md` nur für echte Assets | Pixel-Check 1440/768/390 |
| **Bilder generieren** | `tool-usecase-router.md` #grafik-baum → nur bei `#bilder` → `bildgenerierung.md` | AVIF + `bilder-index.json` |
| **Komponenten/Tools wählen** (oder vor jedem `npm i`) | `tool-usecase-router.md` → **Werkzeugtabelle** in `client-<name>/web/art-direction.md` (Spalten: Bedarf\|Werkzeug\|Befehl\|Gate\|Router-Anker\|geprüft-am) | `werkzeug-gate.mjs` Exit 0 — ohne Tabelle kein Install |
| **Motion-Komponente einbauen** | `motion-doktrin.md` → `ui-components/INDEX.md` | `motion/react`, `useReducedMotion` |
| **Popup / Lead-Magnet / Free-Tool** | `conversion-elemente.md` → `qa-faecher.md` Formular-Regeln | Kontaktdaten zuletzt, kein Fake-Thank-you mittendrin |
| **CRO an Bestandsseite** | `cro-diagnose.md` → optional `experiment-programm.md` | Claims nur aus echten Analytics |
| **Security Formular/API** | `security-audit-playbook.md` (+ OWASP aus code-review bei Consent) | Fail-open-Defaults raus |

Wenn **mehrere** Zeilen passen: die **oberste** zuerst fertig machen, dann die nächste.
Website **bauen** und Skill **verbessern** gleichzeitig? → Skill zuerst (dieser Pfad),
Site nur auf expliziten Raphael-Auftrag.

---

## 2. Absolute Pflicht in jedem visuellen Auftrag

1. **Dev-URL kennen** (z. B. `http://127.0.0.1:3310`).
2. **Sweep mit `--base`** — ohne `--base` bricht das Skript mit Exit 2 ab (kein stiller Falsch-Port mehr):

```bash
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base http://127.0.0.1:<PORT> \
  --out /tmp/<projekt>-shots \
  --routes /,/kontakt
```

3. Jedes PNG **per Read ansehen** (nicht nur erzeugen).
4. Design-G1:

```bash
node /root/raphael-skills/skills/design/scripts/detect.mjs <dateien>
# nie: npx impeccable detect
```

5. Wer baut, reviewt nicht. Rollen: `agent-roster.md`.
6. Nach jeder Router-Wahl **genau einen** Katalognamen nutzen:
   `node /root/raphael-skills/skills/eigene/web/scripts/resource-access.mjs show "<Name>"`.
   Keine 160-Link-Liste. Unbekannter Name = Exit 1, nicht raten.
7. Inspiration App/Flows: Mobbin. Zuerst
   `/root/tools/raphael-mcp-ondemand.sh status`. MCP OFF → `raphael-chrome`
   oder AgentReach. Nie ein Browse erfinden.
8. Fonts: Adobe-Kit nachschlagen
   (`node …/adobe-fonts-kit.mjs show <Familie>`), keine Adobe-`.woff` ins Repo.

---

## 3. Minimal-Pipeline (Landing, ohne Ablenkung)

```
Dossier lesen (ICP/OFFER/PROOF/VOICE)
  → strategy.md (4 Meaning-Fragen, loop2-ablauf)
  → Section-Plan (landingpage-struktur ODER sitemap-section-planung)
  → Copy sektionsweise (copywriting G1→G2)
  → art-direction.md (design-Skill + Tokens; optional lexlin/damien bei Premium)
  → Werkzeugtabelle (tool-usecase-router) — OHNE Tabelle kein npm i
  → Build (eine Familie)
  → Shot-Sweep + QA-Fächer (andere Familie reviewt)
  → Launch nur mit Raphael-Signatur
```

Outputs: `client-<name>/web/strategy.md`, `sitemap.md`, `copy/`, `art-direction.md`, `src/`.

---

## 4. Was du **nicht** als Anfänger brauchst

| Datei | Erst laden wenn … |
|---|---|
| `frontend-referenzbibliothek.md` | Router-Zeile zeigt ausdrücklich hin (max 3 URLs) |
| `ui-layouts-catalog.md` | Vokabular für ungewöhnliche Layouts |
| `design-systeme-vergleich.md` | Brief verlangt fremdes System (Fluent/Carbon/…) |
| `remotion-produktionsweg.md` | echtes Video/Composition, kein CSS-Motion |
| `readonly-db-rolle.md` | Build braucht DB-Lesezugriff |
| `domain-safe-browsing-checkliste.md` | Launch auf junger Domain |
| `vercel-git-deploy.md` | Git-Anbindung, Org+privat, Vercel-Plugin-Skills |
| `experiment-programm.md` | laufendes A/B-Programm, nicht ein Fix |
| `templates/statistics-page-template.html` | Statistik-/Linkbait-Seite |

---

## 5. Top-10 Anfänger-Fallen (sofort vermeiden)

1. **Alle References laden** → Context tot. Nur Tabelle §1.
2. **`--base` vergessen** bei shot-sweep → Exit 2 mit Usage (früher: stille Shots auf 5280).
3. **`fullPage: true`** / captureBeyondViewport → verbotene Shot-Doktrin.
4. **`npx impeccable detect`** → falsche Regeln; nur lokales `detect.mjs`.
5. **`npm i framer-motion`** → muss `motion` / Import `motion/react` sein.
6. **Zweites Icon-Set** neben Lucide → Bundle + Stilbruch.
7. **npm i ohne Werkzeugtabelle** → `werkzeug-gate.mjs` rot, kein Launch.
8. **Formular: E-Mail zuerst** → G1-Fail; Kontaktdaten immer zuletzt.
9. **Eigenen Build reviewen** → Regel 8; andere Modellfamilie.
10. **Production deploy ohne Signatur** → Rot-Klasse, nie autonom.

---

## 6. AAA vs. WCAG (Begriff klären)

- **AAA in diesem Skill** = Top-Tier Visual/SEO/Trust (`agentur-rubrik.md`), **nicht** WCAG AAA.
- **Barrierefreiheit** bleibt **WCAG AA** (axe = 0) in QA-Fach 3.

---

## 7. Ein-Befehl-Checks (kopieren)

```bash
# Skill gültig?
python3 /root/raphael-skills/tools/validate-skill.py \
  /root/raphael-skills/skills/eigene/web

# Werkzeuge dokumentiert?
node /root/raphael-skills/skills/eigene/web/scripts/werkzeug-gate.mjs <projekt-root>

# Screenshots (Port anpassen!)
node /root/raphael-skills/skills/eigene/web/scripts/shot-sweep.mjs \
  --base http://127.0.0.1:3000 --out /tmp/web-shots --routes /
```

*verify Anfänger-Pfad:* Agent nennt vor dem ersten Edit die gewählte Zeile aus §1
und die geladenen Dateipfade. Fehlt das → Skill nicht befolgt.
