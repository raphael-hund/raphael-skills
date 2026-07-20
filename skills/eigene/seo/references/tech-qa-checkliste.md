# Tech-QA-Checkliste (G1, deterministisch — 0 Blocker = hart)

Skript-getrieben, Exit-Code entscheidet. Ein Blocker = kein Publish.

## Meta
- Title 1×, eindeutig, < ~60 Zeichen, Keyword vorne.
- Meta-Description vorhanden, 1×, ~150–160 Zeichen.
- Intent-Match: Title/Description versprechen exakt, was die Seite hält (kein Snippet-Bait) —
  Lücke Erwartung↔Inhalt ist ein Blocker.
- Genau eine H1, sinnvolle H2/H3-Hierarchie (keine Sprünge).

## Schema
- Passender Schema.org-Typ (Article/Product/FAQ/LocalBusiness…) valide (JSON-LD).
- Kein doppeltes/widersprüchliches Markup.

## Canonical
- Selbst-referenzierender Canonical korrekt (kein Canonical auf falsche URL).
- Keine Index/Noindex-Widersprüche, robots-Meta konsistent.

## Links
- Link-Check: keine Broken Links (intern/extern), keine Redirect-Ketten.
- Interne Verlinkung laut Brief gesetzt (Pillar ↔ Cluster).
- Bilder: Alt-Texte, sinnvolle Dateinamen, komprimiert.

## Weitere Blocker
- Duplicate Content (Title/Description/Body) gegen Bestand.
- Ladezeit/CWV grob im grünen Bereich (Verweis Lighthouse aus r-web-QA).
- hreflang korrekt, falls mehrsprachig (siehe `regeln-technischer-audit.md` für die volle
  hreflang/i18n-Checkliste).

## Sonderfall Linkbait-/PR-Seiten: "Hoard the juice" — Zero-Outbound-Links (Blocker)

Statistik-/Research-Seiten, die als Linkable Asset für Digital-PR gebaut werden (siehe
`taktiken-linkbuilding-digitalpr.md`), haben eine eigene, härtere Regel: Die ausgelieferte
HTML darf **keinen einzigen** `<a>`-Tag auf eine fremde Domain enthalten. Grund: die Seite
soll Links *anziehen*, nicht welche *verschenken*.

- **Check:** `grep 'href="http' seite.html` darf nur den Canonical-Link und Links auf die
  eigene Domain zurückgeben. Jeder Treffer auf eine fremde Domain ist ein Blocker.
- Quellenangaben bei Statistiken stehen als Klartext (`(Quelle: HubSpot, 2026)`), nie als
  klickbarer Link — auch nicht mit `nofollow` (gilt seit 2020 nur als Hinweis für Google,
  kein verlässlicher Schutz).
- Interne Anchor-Links (`#abschnitt`) und ein Autoren-CTA auf die eigene Domain sind erlaubt.
- Diese Regel gilt **nur** für bewusst als Linkmagnet gebaute PR-/Statistik-Seiten, nicht für
  normale Content-Briefs — dort gilt die normale Backlink-Taktik (siehe Taktiken-Referenz).

## Output
`client-<name>/seo/tech-qa-<datum>.md` — Liste `OK|BLOCKER` je Punkt. Publish erst bei 0 Blockern.
