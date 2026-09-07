# Conversion-Elemente — Popups, Formular-Reibung, Lead-Magnets, Free-Tools

**Wofür:** Taktik-Sammlung für die Build/QA-Phase, wenn eine Kundenwebsite
über die reine Ads-Landingpage hinausgeht: E-Mail-Popup, allgemeines
Kontaktformular, Downloadable als Lead-Magnet, ggf. ein kleines Gratis-Tool
als Linkmagnet. Auf SMB-Kundenwebsites relevante Taktiken; SaaS-spezifische
Themen (Trial-Aktivierung, Freemium-Gating) bewusst weggelassen.

**Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
`skills/popups/`, `skills/signup/`, `skills/lead-magnets/`,
`skills/free-tools/` (MIT-Lizenz).

## Popups / Overlays

**Trigger-Strategien:**
- Zeitbasiert: 30–60 Sekunden (nicht 5 Sekunden — wirkt aufdringlich).
- Scroll-basiert: 25–50 % Scrolltiefe — zeigt Content-Engagement, gut für
  lange Blogartikel.
- Exit-Intent: Cursor bewegt sich Richtung Schließen/Verlassen — letzte
  Chance. Mobile-Alternative: Zurück-Button/Scroll-nach-oben erkennen.
- Klick-getriggert: Nutzer initiiert selbst ("PDF herunterladen" → Popup-Formular)
  — quasi reibungslos, da selbst-selektiert.

**Design-Regeln:** Schließen-Button sichtbar (oben rechts, Konvention) —
Nutzer, die ihn nicht finden, verlassen die Seite komplett statt zu schließen.
Desktop 400–600px breit, nie den ganzen Screen abdecken. Mobile: Bottom-Slide
statt Vollbild-Overlay (Google bewertet aufdringliche Mobile-Interstitials
negativ für SEO). Frequenz-Cap: maximal einmal pro Session, Dismissal
7–30 Tage merken.

**Copy-Formeln für den CTA-Button:** Ich-Perspektive funktioniert besser
("Meinen Rabatt sichern" statt "Deinen Rabatt sichern"), spezifisch statt
generisch ("Guide zusenden" statt "Absenden").

**Benchmarks (Richtwerte):** E-Mail-Popup 2–5 % Konversion, Exit-Intent
3–10 %, klick-getriggert deutlich höher (selbst-selektiert).

## Formular-Reibung (allgemeines Kontaktformular, nicht die Ads-Landingpage)

Für die Ads-Landingpage gilt die harte Mikro-Commitment-Regel aus
`qa-faecher.md`. Für ein allgemeines Website-Kontaktformular zusätzlich:

- **Jedes Feld reduziert die Konversion** — pro Feld fragen: brauchen wir das
  wirklich vor dem ersten Kontakt, oder können wir es später erfragen?
- Pflichtfeld-Minimum: Name, E-Mail/Telefon, Nachricht. Firma/Branche/Budget
  sind meist verzichtbar oder gehören ins Sales-Gespräch.
- Labels sichtbar halten (nicht nur als Placeholder — Placeholder verschwinden
  beim Tippen, Nutzer verlieren die Übersicht, was sie gerade ausfüllen).
- Inline-Validierung statt Fehler erst beim Absenden.
- Bei Mehrschritt-Formularen: Fortschrittsanzeige, leichte Fragen zuerst,
  schwere Fragen später (nach psychologischem Commitment).

## Lead-Magnets (Downloadables)

**Grundprinzipien:**
- Ein konkretes Problem lösen, nicht ein breites Thema behandeln ("So
  schreibst du Angebote, die Kunden annehmen" statt "Verkaufs-Guide").
- Hoher gefühlter Wert, geringer Zeitaufwand — in unter 30 Minuten
  konsumierbar, sofort umsetzbarer Nutzen.
- Natürlicher Pfad zum eigenen Angebot — löst ein Problem, das das Angebot
  auch löst.

**Format-Auswahl (Aufwand vs. Wirkung):**

| Format | Aufwand | Gut für |
|---|---|---|
| Checkliste | niedrig | schnelle Erfolge, Prozess-Schritte |
| Cheat-Sheet | niedrig | Referenzmaterial |
| Vorlage (Dokument/Sheet) | niedrig-mittel | wiederholbare Prozesse |
| E-Book/Guide | hoch | tiefe Bildung, Autorität |

**Gating-Regel:** Minimum erfragen — jedes weitere Feld reduziert die
Konversion um 5–10 %. E-Mail allein hat die höchste Konversion; E-Mail+Name
für Personalisierung; E-Mail+Firma nur bei hochwertigen Angeboten.

**Landingpage-Struktur fürs Downloadable:** Headline mit klarem Nutzen →
Vorschau/Mockup des Inhalts → 3–5 Bulletpoints "was drin ist" → Social Proof
(Download-Zahl, Testimonials) → minimales Formular → FAQ (Ist es wirklich
kostenlos? Welches Format?).

## Free-Tools (Engineering-as-Marketing)

Nur relevant, wenn ein Kunde Kapazität für ein kleines Gratis-Tool
(Rechner, Generator, Checker) als Linkmagnet/Lead-Quelle hat — die
Ausnahme, nicht die Regel bei SMB-Websites.

**Bewertungs-Kurzcheck (1–5 je Faktor, vor Bau):** Suchnachfrage vorhanden ·
Zielgruppe passt zu Käufern · Einzigartigkeit vs. Bestehendem · natürlicher
Pfad zum Angebot · Bau-Machbarkeit · Wartungsaufwand (invers) ·
Linkbuilding-Potenzial. Unter 15 Punkten: eher nicht bauen.

**MVP-Scope:** Nur die Kernfunktion, die zuverlässig funktioniert; klarer
Input, offensichtlicher Output, mobile-tauglich; einfache Lead-Erfassung
(E-Mail). Zuerst weglassen: Account-Erstellung, Ergebnis-Speicherung,
Perfektionismus im Design.
