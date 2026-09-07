# Taktiken — Linkbuilding & Digital PR

Konkrete, umsetzbare Taktiken zum Backlink-Aufbau. Anders als die Regeln-Referenzen hier
bewusst als Handlungsanleitung geschrieben: wann tun, wie tun, mit welcher Heuristik.

Quellen: Give-to-get-Prinzip und Statistik-Seiten-Methodik in eigenen Worten aus dem
distribb-skill (kein LICENSE-File, daher nur Paraphrase, keine Übernahme von API-Calls/Code)
und aus dem qwoted-seo-backlinks-skill (MIT, näher am Original übernehmbar) destilliert;
Directory-Taktiken aus coreyhaines/marketingskills `directory-submissions` (MIT), übersetzt
und condensiert.

## Grundprinzip: Give-to-get

Die stabilste Backlink-Taktik ist ein echter Linktausch zwischen thematisch verwandten
Business-Websites: nur wer selbst Links vergibt, bekommt welche zurück. Praktisch heißt das:

- Vor dem Schreiben eines Artikels klären, welche 1–2 externen, thematisch passenden Seiten
  als natürliche Referenz eingebaut werden können — nicht nachträglich reindrücken.
- Anchor-Text immer thematisch relevant, nie "hier klicken" oder generisch.
- Nie unbelegte Behauptungen über die verlinkte Seite aufstellen.
- Diese Regel gilt für **normale** Content-Artikel. Die Ausnahme sind bewusst als Linkmagnet
  gebaute PR-/Statistikseiten (siehe unten) — die verschenken bewusst keine Links.

## Digital PR über Journalisten-Plattformen (HARO-Nachfolger wie Qwoted)

Vierstufiges Playbook für Backlinks über Journalisten-Anfragen:

1. **Onboarding** — einmalig ein Experten-Profil des Kunden anlegen (Name, Bio 2–4 Sätze,
   Business-URL, Kontakt-E-Mail). **Die Business-URL ist der Backlink-Anker** — ohne sie kein
   Backlink, das ist der ganze Zweck der Übung. Vor jedem Überschreiben eines vorhandenen
   Profil-Felds explizit Alt-Version vs. Neu-Version zeigen und Freigabe holen.
2. **Opportunity-Suche** — Journalisten-Anfragen nach Thema durchsuchen, nach Publikations-
   Reichweite, Deadline-Nähe und fachlicher Passung zum Kunden priorisieren. Nur Anfragen
   vorschlagen, zu denen der Kunde wirklich Expertise hat — irrelevante Pitches schaden dem
   Account-Ruf dauerhaft.
3. **Stats-Page-Entscheidung** (siehe Scoring-Tabelle unten) — bei genug Score eine sourcierte
   Statistikseite bauen, bevor gepitcht wird.
4. **Pitch** — 2–4 kurze Absätze, max. 250–400 Wörter: erster Satz warum der Kunde für *diese*
   Anfrage qualifiziert ist, dann 2–4 konkrete, zitierbare Insights (Zahlen schlagen
   Plattitüden), bei Stats-Page ein Link darauf im zweiten Absatz plus 2–3 markante Zahlen
   direkt im Pitch-Text, letzter Satz mit Credit-Format-Wunsch. Immer zuerst als Entwurf zeigen,
   nie ungeprüft an den Journalisten senden — das ist eine echte Nachricht an eine echte Person.

### Scoring-Heuristik: lohnt sich eine Statistikseite vor dem Pitch?

| Signal | Gewichtung |
|---|---|
| Thema breit genug, dass öffentliche Daten existieren (z. B. "KI im Marketing") | +2 |
| Kundengeschäft berührt das Thema ohnehin → Seite bringt Dauer-Traffic | +2 |
| Deadline ≥24 h entfernt (Recherche braucht Zeit) | +1 |
| Mehrere Anfragen im selben Themen-Cluster (eine Seite bedient mehrere Pitches) | +2 |
| Anfrage fragt explizit nach "Statistiken/Daten/Trends" | +3 |
| Hyper-nischig, nur für eine einzige Publikation relevant | −1 |
| Deadline <12 h | −3 |
| Reine Founder-Story/Meinungsfrage ohne Datenbezug | −3 |
| Bezahlte Platzierung (anderer ROI-Rahmen) | −2 |

**Regel:** Ab Gesamtscore ≥2 eine Statistikseite vorschlagen, sonst direkt pitchen. Den Score
immer transparent mitliefern, damit der Kunde die Empfehlung nachvollziehen kann.

## Statistikseiten als Linkable Asset

Das wertvollste eigenständige Backlink-Asset: eine URL, auf die Monate lang Journalisten und
AI-Suchmaschinen zeigen — nicht ein Einweg-Artikel.

**Wann bauen:** Thema ist breit genug für einen echten Datenüberblick, es gibt mehrere geplante
Outreach-Aktionen zum selben Thema, oder der Kunde will AI-Suchsichtbarkeit auf einem Thema
gewinnen. **Wann nicht:** Thema ist rein qualitativ/anekdotisch, Deadline unter 24 h, oder es
gibt bereits eine aktuelle, gute Statistikseite zum Thema — dann normalen Artikel schreiben.

### Recherche-Priorität (Quellenhierarchie)

1. Primärforschung von Analystenfirmen (Gartner, Forrester, McKinsey, Deloitte, BCG, IDC …).
2. Herstellereigene "State of X"-Reports mit genannter Methodik (HubSpot, Salesforce,
   Semrush, Ahrefs, Stripe State-of-X …).
3. Fachpresse mit Originalrecherche (Search Engine Land, HBR, MIT Sloan Review …).
4. Behörden-/zwischenstaatliche Daten (Statistisches Bundesamt, Eurostat, OECD, UN).
5. Akademisch/peer-reviewed.
6. Marktgrößen-Reports (IMARC, Grand View Research …).
7. Seriöse Umfragen (Pew, Edelman, YouGov …).

**Vermeiden:** Listicle-Blogs, die sich nur gegenseitig zitieren (immer zur Primärquelle
zurückverfolgen); Pressemitteilungen ohne Rohdaten; KI-generierte Statistik-Roundups (Quelle
der meisten halluzinierten Zahlen im Netz); Wikipedia als Primärquelle (die dort zitierte
Originalquelle nehmen); Zahlen älter als 3 Jahre außer als einzig verfügbare Zahl (dann Jahr
klar labeln).

### Qualitätsbar — jede einzelne Zahl muss ALLE sechs Kriterien erfüllen

1. Hat eine **benannte Quelle** (Organisation/Publikation, nicht "Experten sagen").
2. Hat ein **Jahr**.
3. Ist **spezifisch** (Zahl/Prozent/Verhältnis, keine vage Formulierung wie "viele Firmen").
4. Hat eine **echte, tatsächlich abgerufene URL** (nur für die eigene Verifikation — landet
   nicht als klickbarer Link im fertigen Text, siehe Tech-QA-Regel "Hoard the juice").
5. Ist **wortgetreu zitiert** (kein Runden, kein Extrapolieren).
6. Die Quell-URL funktioniert zum Zeitpunkt des Schreibens.

**Ziel-Mengen:** 40–80 Statistiken auf der ganzen Seite, 5–12 pro Abschnitt, mindestens 8
unterschiedliche Quell-Domains, ≥60 % aktuelles/Vorjahr. Widersprechen sich zwei seriöse
Quellen bei derselben Kennzahl: beide mit Attribution nennen, nicht eine auswählen.

**Nie erfinden.** Ist eine Zahl nicht verifizierbar, fliegt sie raus. Eine erfundene Zahl, die
ein Journalist entlarvt, beschädigt den Ruf des Kunden dauerhaft.

**Technische Pflicht beim Bauen:** Zero-Outbound-Links (siehe `tech-qa-checkliste.md`,
Abschnitt "Hoard the juice") — Quellenangaben nur als Klartext, Article- + FAQPage-Schema
(siehe `regeln-schema-markup.md`), Umfang 1.500–3.500 Wörter (Statistikseiten werden gescannt,
nicht gelesen — keine 10.000-Wort-"ultimativen Guides").

## Directory-Submissions & Launch-Backlinks

Directory-Einträge sind die **Fundament-Schicht**, nie die ganze Strategie: sie liefern
DoFollow-Backlinks (hebt die Domain-Autorität der ganzen Seite), Discovery-Fläche für
kauf-bereite Besucher, und Zitations-Futter für AI-Suchmaschinen.

**Regel 1 — erst Ziel-Seite, dann Directory:** nie in ein Directory eintragen, bevor die
verlinkte Landingpage live, indexiert und vollständig ist (Pricing-Seite, Datenschutz/AGB,
Logo-Assets, echte Screenshots, ein H1 mit sauberer Hierarchie).

**Regel 2 — Positionierung variiert pro Directory-Typ**, nie dieselbe Beschreibung überall
copy-pasten (AI-Engines und Google werten Duplicate Content ab):

| Directory-Typ | Framing |
|---|---|
| Startup-Directories | Ergebnis/Outcome |
| SaaS-Directories | "Alternative zu X"-Framing |
| KI-Directories | KI-first-Architektur |
| Branchen-Verzeichnisse | Fachtiefe/ROI |
| Lokale Verzeichnisse | NAP-Konsistenz, Region |

**Product-Hunt-Launch (falls relevant für Kunden mit SaaS-Produkt):** Launch dienstags bis
donnerstags um 00:01 Pacific Time, die ersten 2 Stunden entscheiden über algorithmische
Reichweite, nie um Upvotes bitten (wirkt spamig und wird 2026 algorithmisch abgestraft) —
stattdessen um ehrliches Feedback fragen, das konvertiert nachweislich besser.

**Review-Plattformen (G2/Capterra) — das 10-in-30-Protokoll:** 20 zufriedene Nutzer direkt per
E-Mail mit Direktlink zur Bewertung anschreiben (kein Formular dazwischen), ein moderates
Dankeschön anbieten (z. B. Gutschein — bei G2/TrustRadius ausdrücklich erlaubt), einmal nach 5
Tagen nachfassen. Realistische Konversion: 50 % → 10 Bewertungen aus 20 Anfragen. 10
Bewertungen sind die Schwelle für die Aufnahme ins Grid.

## Borja-Taktiken (2026-08)

Zehn Linkbuilding-Taktiken, Missing Visual, Article Trailer, Trojan-Listicle-Outreach mit 5.000-RD-Filter, Journalisten-Score mit Schwelle 3 und Statistikseite ohne Backlinks: `playbooks-borjafat.md` Abschnitte 7 und 8. Exchange-Netzwerke und Parasite bleiben Graustufen.

## Gotchas

- **Erfundene Statistiken sind irreversibel.** Eine vom Journalisten entlarvte Zahl zerstört
  die Glaubwürdigkeit dauerhaft — Belegpflicht gilt hier genauso hart wie im Content-Brief.
- **Zero-Outbound-Links ist eine bewusste Ausnahme**, nicht die neue Normalregel — normale
  Content-Artikel geben weiterhin 1–2 externe Links (Give-to-get), nur die Linkmagnet-Seite
  selbst nicht.
- **Nie Pitches ohne Nutzer-Freigabe absenden** — ein Pitch ist eine echte Nachricht an eine
  echte Person, kein Testlauf.
- **Nie irrelevante Opportunities pitchen**, nur weil eine Deadline drängt — Journalisten und
  Plattformen merken sich schlechte Trefferquoten.
