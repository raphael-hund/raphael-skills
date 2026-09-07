# Case: Kraftwerk Garage AG (Basel/Birsfelden)

| Feld | Wert |
|---|---|
| Slug | `kraftwerk-garage` |
| URL | `https://www.kraftwerk-garage.ch` (kanonischer Host aus `DESIGN.md` §7) |
| Sektor | `handwerk-local` — Dials 4 / 3 / 5 |
| Typ | House-Case |
| Datum der Studie | 30.08.2026 |
| Urteil | **GO-house-lock** |

Quelle: `/root/clients/kraftwerk/DESIGN.md`, bindend für alle Worker.
Wichtig: „Visuell KOMPLETT weg von der aktuellen Seite." Der Lock beschreibt
den Relaunch, nicht den Altbestand. Nichts von der alten
kraftwerk-garage.ch wird visuell übernommen.

## 1. Capture

**Status: fehlt.** Kein Shot-Sweep vorhanden. Ein Sweep muss ausserdem
benennen, ob er den Alt- oder den Relaunch-Stand zeigt — der Altstand ist
ausdrücklich kein Vorbild.

## 2. Tokens (exakt aus DESIGN.md §3)

| Token | Wert | Einsatz |
|---|---|---|
| `--kw-red` | `#D6001C` | Signalrot, nur CTAs, Akzentlinie, Highlights (~8 % Fläche) |
| `--kw-red-dark` | `#A80016` | Hover/Active |
| `--kw-black` | `#101114` | Text, Footer, dunkle Sektionen |
| `--kw-anthracite` | `#1C1E22` | Karten auf Dunkel, Fassaden-Bezug |
| `--kw-off` | `#F5F6F7` | helle Wechselsektionen |
| `--kw-line` | `#E3E5E8` | Hairlines |
| `--kw-grey` | `#5C616B` | Sekundärtext |
| Display | Archivo 700/800, `letter-spacing:-0.02em`, H1 `clamp(2.2rem, 5vw, 4.2rem)` |
| Body/UI | Inter 400/500/600, 16–18px, `line-height:1.6` |
| Radius | Karten 6px, Buttons 4px. Keine Pillen, keine Blobs. |
| Schatten | genau eine Stufe: `0 8px 30px rgb(16 17 20 / 0.08)` |
| Icons | Lucide, inline SVG, stroke 1.75 |

Grundton hell. Dunkle Sektionen sparsam: Footer plus maximal 1–2
Akzent-Sektionen pro Seite. Rot ist Signal, nie Fläche.

**Wiederkehrendes Markenzeichen:** die Energie-Linie, 3–4px rot, als
Unterstreichung von Eyebrows oder Slide-in-Akzent an Karten.

## 3. Sektionen-Inventar (Home, aus Sitemap §4)

| # | Sektion | Pattern-ID | Wie gebaut |
|---|---|---|---|
| 1 | Hero mit Doppel-CTA | `P-HERO-PHOTO` (Ausnahme, kein Default) | Zwei CTAs „Auto verkaufen" und „Occasionen" — gelockte Ausnahme, kein P-HERO-PHOTO-Default. |
| 2 | Trust-Bar | `P-PROOF-STRIP` | Google-Bewertungs-Widget als vorbereiteter Slot mit echtem Link-Platzhalter. Keine Fake-Sterne mit Zahl. |
| 3 | Ankauf-Teaser mit Mini-Prozess | `P-PROCESS-3` | Drei Schritte, echte Sequenz des Ankaufs. |
| 4 | Bestand-Teaser | `P-OFFER-PAIR` | AutoScout24-Einbindung als Link-Karte oder Embed-Slot. |
| 5 | Werkstatt-Kompetenz | `P-GALLERY` | Warm-neutrale echte Werkstatt-Anmutung, kein HDR-Hochglanz-Stock. |
| 6 | Über-uns-Teaser mit Inhaber | `P-PROOF-STRIP` | Inhaber Jeton als Gesicht der Firma. |
| 7 | Final-CTA | `P-CTA-END` | Eine rote Schlussaktion. |

Das Kernstück ist `fahrzeugankauf.html`: dreistufiges Formular,
**Kontaktdaten zuletzt** (G1), Fortschrittsanzeige mit roter Linie,
Success-State inline.

## 4. Raphael-Urteil

**GO-house-lock.** Begründung aus dem Briefing (10.08.2026):

- Idee „Werkstatt-Premium": hell, einladend, präzise, mit der Energie des
  Namens als roter Linie. Echte-Garage-Vertrauen statt
  Hochglanz-Showroom-Kitsch.
- Die Anti-Slop-Liste ist hier am schärfsten formuliert und trägt S12.
- Faktendisziplin: keine erfundenen Bewertungszahlen, keine erfundene
  Kundenanzahl, `priceRange` bewusst nicht gesetzt, weil kein belegter Fakt.
- Zahlen gross, aber nur belegbare Aussagen. Im Zweifel qualitativ statt Zahl.

## 5. Regel-Kandidaten

| Beobachtung | Regel-ID | Richtung | Status |
|---|---|---|---|
| Rot ist Signal, nie Fläche (~8 %) | S1 | GO | verbindlich |
| Dunkle Sektionen sparsam | S3 | GO | verbindlich |
| Buttons 4px, keine Pillen, keine Blobs | S4 | NO-GO | verbindlich |
| **Ausnahme zu S7:** Inter als Body/UI ist hier gelockt, nie als Display | S7 | Ausnahme | verbindlich |
| Keine Fake-Sterne, keine erfundenen Zahlen | S9-N | NO-GO | verbindlich |
| Keine Emoji-Icons, kein Gradient-Text, kein Glassmorphism | S12 | NO-GO | verbindlich |
| Keine generischen Purple/Blue-Gradients | S12 | NO-GO | verbindlich |
| Keine Karussells | S14 | NO-GO | bestätigt |
