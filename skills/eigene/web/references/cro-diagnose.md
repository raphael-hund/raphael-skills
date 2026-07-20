# CRO-Diagnose-Framework — warum konvertiert eine Seite nicht

**Wofür:** Systematische Diagnose, wenn eine bestehende Seite (Homepage,
Landingpage, Preisseite, Formular) schlecht konvertiert — Ergänzung zum
`cro-learn`-Schritt im Haupt-SKILL.md. Für die reine Ads-Landingpage-Struktur
selbst siehe `landingpage-struktur.md`; dies hier ist die Diagnose-Brille für
jede Art Website-Seite.

**Herkunft:** kondensiert aus `coreyhaines/marketingskills`,
`skills/cro/SKILL.md` (MIT-Lizenz).

## Diagnose-Reihenfolge (nach Wirkungsgrad, wichtigstes zuerst)

1. **Value-Proposition-Klarheit (höchste Wirkung).** Versteht ein Besucher in
   5 Sekunden, was das ist und warum es ihn betrifft? Ist der Hauptnutzen
   konkret und differenziert, in der Sprache des Kunden (nicht Firmenjargon)?
   Häufigster Fehler: Feature-fokussiert statt Nutzen-fokussiert, oder zu
   vage/zu clever (Klarheit geopfert).
2. **Headline-Wirksamkeit.** Kommuniziert sie den Kernnutzen? Ist sie
   konkret genug (Zahlen, Zeitrahmen, Details)? Passt sie zur Botschaft der
   Trafficquelle (Ad-zu-Landingpage-Message-Match)?
3. **CTA-Platzierung, -Copy, -Hierarchie.** Genau ein klarer primärer CTA,
   sichtbar ohne Scrollen? Button-Copy kommuniziert Nutzen statt nur Aktion
   ("Jetzt Angebot anfordern" statt "Absenden"). Logische Primär-/
   Sekundär-CTA-Struktur, CTA an Entscheidungspunkten wiederholt.
4. **Visuelle Hierarchie/Scanbarkeit.** Erfasst jemand beim Überfliegen die
   Kernbotschaft? Sind die wichtigsten Elemente visuell prominent, genug
   Weißraum? Unterstützen Bilder die Botschaft oder lenken sie ab?
5. **Vertrauenssignale/Social Proof.** Logos, Testimonials (spezifisch,
   zugeordnet, mit Foto), Case-Study-Ausschnitte mit echten Zahlen,
   Bewertungen. Platzierung: nahe CTAs und nach Nutzen-Aussagen.
6. **Einwandsbehandlung.** Preis/Wert-Bedenken, "funktioniert das für meinen
   Fall?", Umsetzungsaufwand, "was wenn es nicht funktioniert?" — adressiert
   über FAQ, Garantie, Vergleichscontent, Prozess-Transparenz.
7. **Reibungspunkte.** Zu viele Formularfelder, unklare nächste Schritte,
   verwirrende Navigation, unnötige Pflichtfelder, Mobile-Probleme, lange
   Ladezeiten.

## Ausgabeformat für eine CRO-Diagnose

- **Quick Wins** (sofort umsetzbar, wahrscheinlich sofortige Wirkung)
- **High-Impact-Changes** (mehr Aufwand, aber deutlich mehr Wirkung)
- **Test-Ideen** (Hypothesen für A/B-Tests statt Annahmen — siehe
  `experiment-programm.md`)
- **Copy-Alternativen** für Headline/CTA: 2–3 Varianten mit Begründung

## Seitentyp-spezifische Brille

- **Homepage:** klare Positionierung für kalte Besucher, schneller Pfad zur
  häufigsten Konversion, bedient sowohl "kaufbereit" als auch "recherchiert
  noch".
- **Landingpage:** Message-Match zur Trafficquelle, ein CTA (Navigation
  entfernen wenn möglich), vollständiges Argument auf einer Seite.
- **Preisseite:** klarer Plan-Vergleich, empfohlener Plan markiert, "welcher
  Plan passt zu mir?"-Angst adressieren.
- **Leistungsseite:** Feature mit Nutzen verknüpfen, Anwendungsfälle/Beispiele,
  klarer Pfad zu Testen/Kaufen.

## Formular-Optimierung (Kurzfassung)

Deckt sich mit den harten QA-Regeln in `qa-faecher.md` (Mikro-Commitments,
Kontaktdaten zuletzt). Zusätzlich: Inline-Validierung statt nur beim Absenden,
spezifische Fehlermeldungen mit Recovery-Pfad ("E-Mail bereits registriert" +
Link zum Login), Formular bei Fehler nicht leeren, Fokus aufs Problemfeld.
