# Landingpage-Struktur — Besucher → qualifizierte Leads

**TLDR:** Eine Ads-Landingpage hat genau EINE Aufgabe: aus einem Besucher einen
**qualifizierten** Lead machen. Kein Website-Menü. Das Formular ist eine Kette kleiner Ja's
(Kontaktdaten zuletzt). Reihenfolge nach Überzeugungskraft. Testimonials als Beweis-Masse.

**Herkunft:** Synthese aus einem Facebook-Ads-Kurs (Q1) + Ads-Coach-Reel (Q2),
konsolidiert in `/root/agency-os-plan/analysis/source-lessons-2026-07-19.md` (Abschnitt 2).
Status der Quelle: Kandidat/Review — ⭐-Punkte sind belastbar, ⚠️/Hypothesen sind als solche
markiert und **selbst per A/B-Test zu verifizieren** (echte Analytics, G4).

---

## 1. Landingpage = eine Aktion (kein Website-Denken)

- **Kein Menü, kein Blog, kein "About us".** Nur ein CTA, der exakt zur Anzeige passt.
- **Formular direkt einbetten** — nicht hinter eine "Apply Now"-Button-Seite legen.
  *Beleg: ein Extra-Klick auf eine separate Formularseite halbierte die Conversion.*
- **CTA/Formular im oder knapp unter dem Fold**, nicht ans Seitenende. *Fast 100 % sehen
  oberhalb des Folds, nur ~5 % scrollen bis zum Ende.*

## 2. Formular = Kette kleiner Mikro-Commitments

Streng nach **aufsteigendem Widerstand** ordnen (harte QA-Regel, siehe `qa-faecher.md`):

1. **Identifikation** — niedrigster Widerstand: "Welche Beschreibung passt zu dir?"
2. **Qualifizierung** — Branche, Team-Größe, **Website-URL** (statt Firmenname: Social-Profile
   darüber auffindbar + grober "Wallet-Test").
3. **Kontaktdaten ZULETZT** — Name → E-Mail → Telefon. Nie als erste Frage.

Warum: jede kleine Zustimmung erhöht die Wahrscheinlichkeit der nächsten (Konsistenzprinzip);
Kontaktdaten sind das höchste Commitment. *Beleg: Kontaktdaten nach vorne → Conversion brach
ein; zurück ans Ende → Conversion vervierfacht.*

**Die Reihenfolge prüft seit 29.07. ein Skript mit:**
`node scripts/formular-check.mjs --url <url>` meldet F6, wenn ein Kontaktfeld vor
einer Sachfrage steht. Es ist eine Heuristik (es liest Feldnamen und Labels, nicht
den Sinn der Frage) und darum WARN, nicht BLOCK — mit `--strict` wird sie rot.
Ein F6-Befund ist ein Anlass zum Hinsehen, kein Urteil.

**Die Feld-Mechanik prüft dasselbe Skript hart:** Ein E-Mail-Feld muss
`type="email"` tragen, ein Telefonfeld `type="tel"` (F1, BLOCK). Mit `type="text"`
öffnet das Telefon die Buchstabentastatur ohne `@` — der Lead tippt dreimal,
bevor die Adresse steht. Dazu `autocomplete` (F2), Feldhöhe ab 40px (F4) und
Feldschrift ab 16px, sonst zoomt iOS Safari beim Antippen in die Seite (F5).

Das ist keine Kosmetik: In dieser Kette ist das Formular die **einzige**
Conversion. Jede Reibung im Feld wirkt wie eine zusätzliche Frage.

Mechanik:
- **Drop-off pro Slide messen** und Ausreißer-Frage fixen (⭐).
- **Freitext → Radio-Select**, sobald die häufigsten Antworten bekannt sind (springt automatisch
  weiter, weniger Reibung als Tippen/Checkbox).
- Harte Fragen (Budget/Zeit) gehören eher in den Sales-Call als ins Formular — im Formular gibt
  der Lead die widerstandsärmste Antwort.

## 3. Thank-You-/Zwischenseiten

- **Vor dem letzten Schritt kein Abschluss-Wording** ("Danke/Glückwunsch/Geschafft") — schließt
  die Schleife im Kopf → Tab-Close. Stattdessen "Fast geschafft" + Fortschritt.
- Zuerst eine **Identitätsaussage** zum Zustimmen, dann No-Show-/No-BS-Policy.
  *Beleg: ein Identitäts-Textblock hob die Show-Rate 60 % → ~75 %.*

## 4. Seiten-Reihenfolge (nach Überzeugungskraft sortieren)

1. **Big Idea / stärkstes Ergebnis** ganz oben (Result + Feeling in der Headline).
2. **FAQ höher ziehen** — vor die Testimonials, aber nach der Big Idea.
   ⚠️ **Hypothese** ("FAQ vor Testimonials erhöht fast immer die Conversion") — selbst A/B-testen.
3. **"Für wen ist das?"**-Sektion mit konkreten Branchen/Berufen (klärt "funktioniert das für
   meine Branche?" — ~85–90 % der Zweifel).
4. **Testimonials** (siehe unten).
5. Details/weitere Einwände unten (wer weit scrollt, sucht mehr Details).

### FAQ in 4 Quadranten
1. **Erstfragen** — wie funktioniert's, welcher Support.
2. **Folgefragen** — wie schnell Ergebnisse.
3. **Einwände** — "ich bin nicht technikaffin", "ich habe keine Zeit".
4. **Erwartungsmanagement** — was der Lead realistisch bekommt.

## 5. Testimonials = Beweis-Masse

- **Video oder echter Screenshot** (voller Name/Handle) statt Fließtext — in KI-skeptischer Zeit
  ist Text leicht anzuzweifeln.
- Nach **Identität/Branche labeln** (Thumbnail "Isaac – Men's Online Fitness Coach" statt nur
  Name) — die stille Frage ist "hat das bei jemandem wie mir funktioniert?".
- **Hook-first schneiden:** emotional stärksten Moment zuerst, nicht die Vorstellung.
- **Menge NICHT wegkürzen** — Volumen selbst ist der Beweis. *Beleg: Reduktion auf die 4 größten
  halbierte die Conversion.* Ohne echte Testimonials ersatzweise Vorträge/Podcasts/Awards.

## 6. Bild statt Textblock

- Erklär-Textblöcke/Bullet-Listen durch aussagegleiche Bilder ergänzen/ersetzen
  (*Split-Test Dot-Points vs. Dot-Points+Foto → Conversion verdoppelt*).
- Landingpage-Video: stumm autoplay mit **fest eingebrannten Untertiteln** (kein Klick zum Start);
  wichtigste Inhalte in die ersten ~30 s.
- Echtes Foto von Gründer/Team vor echtem Publikum als Hintergrund/Trust-Hebel (⭐, aber n=1).

## Grauzone / vor Übernahme prüfen (⚠️)
Künstliche Knappheit, "Pflichtfeld ohne Sternchen", weiche Disqualifikation — im Rohmaterial
schwach belegt oder UX-fragwürdig. Nur bewusst und mit echtem Test einsetzen (AGENTS.md-Grenzen).
