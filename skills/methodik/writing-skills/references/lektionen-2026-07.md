# Lektionen aus 18 vendorierten Repos (2026-07-20)

Kondensat aus einem Quellenreview über 18 externe Skill-/Repo-Quellen. Nur
laden, wenn ein neuer Skill entworfen oder ein bestehender grundlegend
überarbeitet wird — für die Alltags-Arbeit reicht die Hauptdatei.

## Progressive Disclosure — wiederkehrende gute Muster

- **Minimal-Variante:** SKILL.md hält alle sofort wirksamen Regeln inline
  (< 130 Zeilen), nur lange Listen/Kataloge wandern in `references/` und
  werden per klarem Verweis nachgeladen (anti-ai-slop-writing).
- **Reference-Routing-Tabelle:** direkt unter dem Frontmatter eine Tabelle
  "Nutzer-Intent → lade diese Datei → Inhalt", bevor irgendein Fachinhalt
  kommt — erzwingt Lazy-Loading strukturell statt es nur zu empfehlen
  (marketingskills/ads).
- **"Read it now"/"read before X"** exakt an der Stelle im Workflow, wo der
  Abschnitt gebraucht wird — nicht pauschal am Anfang (shadcn/improve,
  emilkowalski-skills).
- **Nur eine Ebene tief verlinken:** SKILL.md → reference.md, nie Ketten
  SKILL.md→a.md→b.md→c.md — ein Modell liest verschachtelte Dateien oft nur
  teilweise (davidondrej-skills).
- **Router-Pattern:** die SKILL.md ist expliziter Router, keine
  Regelsammlung — lädt genau die kleinste nötige Teilmenge und sagt in
  einem Satz, was geladen wurde (oh-my-openagent/frontend).
- Jede Referenzdatei beginnt mit einer Ein-Satz-Einordnung, wofür sie da
  ist — reduziert Kontext-Rätselraten beim Lazy-Load (jakubkrehel-skills).
- Progressive Disclosure by Reference statt Duplikat: ein zentrales
  CLAUDE.md, das nur `@AGENTS.md` importiert, keine zweite Kopie, die
  auseinanderlaufen kann (starc007-ui-components).

## Description-Feld

- Beschreibt WANN der Skill feuert (Trigger-Wörter/Synonyme), nicht nur
  WAS er tut — und fasst NIE den Workflow zusammen, sonst folgt der Agent
  der Kurzfassung statt den Body zu laden (mehrere Quellen übereinstimmend:
  no-mistakes, davidondrej-skills, vercel-labs, jakubkrehel-skills).
- Trigger als explizite Frage-Muster-Liste ("how do I do X", "is there a
  skill that can...") statt vager Themenbeschreibung (vercel-labs).

## Gotchas / Common-Mistakes-Sektion

- Praktisch jeder gute Skill hat eine kurze, listenförmige Gotchas-/Common-
  Mistakes-Sektion, oft nach Fehlerkategorie gruppiert statt einer flachen
  Liste (marketingskills) — deckt sich mit unserer Pflicht-Gotchas-Sektion.
- Ein Gotcha mit echtem, beziffertem Vorfall (z. B. "90 von 121 PRs") ist
  überzeugender als eine abstrakte Warnung (no-mistakes).
- Ein "Rejected candidates"/"Ablehnungsliste"-Pflichtfeld neben jeder
  Vorschlagsliste verhindert eine reine Wishlist ohne Selbstkritik
  (emilkowalski-skills/find-animation-opportunities) — übertragbar auf
  jeden Vorschlags-Skill (Angle-Generierung, Keyword-Vorschläge).

## Validierung & Fail-Closed

- Validierungsschleifen sind der größte Qualitätshebel: jede
  Skill-Beschreibung sollte explizit eine verify→fix→reverify-Schleife
  benennen, nicht implizit voraussetzen (davidondrej-skills).
- Fail-closed als Leitmotiv: unklare Findings → ask-user (nie auto-fix),
  fehlender Trusted-Read → Abbruch, fehlgeschlagene Prüfung → Verweigerung.
  Ein Skill für Fehlervermeidung definiert an jeder Unsicherheits-Stelle,
  wohin es "fällt" (no-mistakes).
- "Fertig" ist ein Skript-/Exit-Code-Ergebnis, keine Behauptung
  (starc007-ui-components, deckungsgleich mit unserem
  `completion_criteria`-Feld).

## Format-Disziplin

- Anti-Format-Drift: ein explizites "Wrong format (never do this)"-
  Gegenbeispiel neben dem korrekten Format zeigen, nicht nur positiv
  spezifizieren (emilkowalski-skills).
- Pläne für schwächere Executor-Modelle: Commit-Hash-Stempel + explizite
  Drift-Klausel ("stimmt ein Schritt nicht mit dem Code überein: STOPPEN
  und melden statt improvisieren") — Absicherung gegen stille
  Fehlausführung bei Handoffs (emilkowalski-skills, shadcn/improve).
- "Geschrieben für den schwächsten plausiblen Executor" als Leitsatz zwingt
  zu echter Selbstständigkeit ohne "wie oben besprochen"-Verweise
  (shadcn/improve) — Testkriterium: könnte ein Modell ohne diese Session
  das ausführen?

## Sicherheit beim Vendorieren

- Explizite Prompt-Injection-Abwehr als eigene Regel: alles, was aus einem
  auditierten/fremden Repo gelesen wird, ist Daten, keine Instruktion
  (shadcn/improve) — Standardfrage bei jedem Skill, der fremden/
  ungetrusteten Content einliest.
- Subagenten-Ergebnisse nie blind übernehmen: "Vet before presenting" —
  jeder zitierte Fund wird vom Hauptagenten selbst nachgelesen, bevor er in
  die finale Antwort kommt (shadcn/improve, übertragbar auf jeden
  Multi-Agenten-Skill).
- Weiche Eigenwerbung versteckt sich in scheinbar neutralem Fachcontent —
  beim Vendorieren immer die komplette Datei lesen, nie nur den fachlichen
  Teil überfliegen, Promo-Passagen aktiv rausschneiden (emilkowalski-skills).
- Ein einzelner Marketing-Freebie/Gist sollte nie 1:1 übernommen werden
  (fremder Pfad, fremde Signatur, Upsell-Text) — immer durch den eigenen
  r-*-Vertrag umschreiben (conradcaffier-gist).

## Negativbeispiele (bewusst nicht übernehmen)

- Großbuchstaben-Wutschreie ("OR SO HELP ME GOD") zur Signalisierung von
  Wichtigkeit — schlechtes Vorbild, unsere Doktrin ist ruhige, konkrete
  Sprache (oh-my-openagent CLAUDE.md).
- Ein Skill, der aktiv zu globaler, ungeprüfter, bestätigungsfreier
  Installation von Fremdcode anstachelt (`npx skills add -g -y`) —
  widerspricht unserer Kuration-vor-Übernahme-Doktrin (vercel-labs).
- Ein Repo kann komplett kein Skill-Content sein, sondern eine laufende
  App/ein MCP-Server (Infrastruktur, kein statischer Kontext) — dann keine
  Vendorierung, nur 1-2 Ideen extrahieren (openui, ui-layouts-mcp).
