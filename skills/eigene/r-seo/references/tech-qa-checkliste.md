# Tech-QA-Checkliste (G1, deterministisch — 0 Blocker = hart)

Skript-getrieben, Exit-Code entscheidet. Ein Blocker = kein Publish.

## Meta
- Title 1×, eindeutig, < ~60 Zeichen, Keyword vorne.
- Meta-Description vorhanden, 1×, ~150–160 Zeichen.
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
- hreflang korrekt, falls mehrsprachig.

## Output
`client-<name>/seo/tech-qa-<datum>.md` — Liste `OK|BLOCKER` je Punkt. Publish erst bei 0 Blockern.
