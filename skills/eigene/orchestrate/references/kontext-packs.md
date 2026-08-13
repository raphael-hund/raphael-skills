# Kontext-Packs — automatisches Kontext-Setup je Node

Jeder Node bekommt ein bewusst geschnürtes Pack. Grundsatz: **so eng wie
möglich** — der Draft-Node bekommt NUR den Brief, nicht die ganze Recherche
(Kontext-Enge ist ein Feature: sie zwingt die Kette, gute Zwischenartefakte
zu bauen).

## Bausteine (nach Bedarf kombinieren)

| Baustein | Pfad/Mechanik | Wann |
|---|---|---|
| Brain-Hot-Cache | `/root/raphael-brain/wiki/hot.md` | Nodes, die Firmen-/Kunden-Wissen brauchen (research, brief) |
| Brain-Wiki gezielt | `grep`-Treffer in `/root/raphael-brain/wiki/` — nur PFADE nennen, Agent liest selbst | research |
| Skill-Zuweisung | im Prompt: "Nutze den Skill <name> (Skill-Tool)" — max 2 pro Node | wenn ein Skill die Methode vorgibt (copywriting, seo, ads) |
| Projekt-Kontext | `CLAUDE.md`/`AGENTS.md` des Zielordners + konkrete Dateipfade | Bau-Nodes |
| Vorergebnisse | IMMER als Dateipfad, nie inline >8k Zeichen (Slice-Falle) | jeder Folge-Node |
| Frozen Rules | wörtlich in jeden Node-Prompt | immer |
| Output-Vertrag | Zielpfad + Schema im Prompt ("Schreibe nach X, gib {…} zurück") | immer |

## Worker-Wahl je Node-Typ (aus ROUTING.md, Kurzform)

| Node-Typ | Worker | Grund |
|---|---|---|
| Recherche/Zweitmeinung | kimi-recherche | dritte Modellfamilie, nur lesen |
| Deutsche Texte, Frontend | kimi-worker | K3-Stärken |
| Bau/Draft allgemein | sonnet-worker | Preis-Leistung |
| Massen-Lesen, Gates ausführen, mechanische Edits | haiku-worker | billig |
| Tests, Mechanik, klar begrenzte Umbauten | luna-worker | GPT-Werkbank |
| Urteil/Score/Abnahme | sol-pruefer | unabhängiger Prüfer, läuft nativ (B9) |

Verifier möglichst aus anderer Familie als der Schreiber (Empfehlung;
bei Anbieter-Ausfall frei wählen und protokollieren).

## Automatik im Skill-Ablauf

Beim Kompilieren der Karte baut das Cockpit pro Node den Prompt aus:
`[Rolle+Auftrag] + [Frozen Rules] + [Long-Horizon-Hinweis] + [Kontext-Pack-Pfade] + [Skill-Zuweisung] + [Output-Vertrag]`.
Nichts davon fragt Raphael — die Karte enthält alles.

**Long-Horizon-Hinweis (bei Codex/Kimi-Workern Pflicht, bei Claude-Workern
empfohlen):** wortgleich zur Long-Horizon-Klausel in orchestrate/SKILL.md — "long horizon session,
human is away": autonom weiterarbeiten, bis Gates grün oder Budget/Rundenlimit
erreicht; bei Unsicherheit nicht stoppen und nicht auf Rückfrage warten;
Rot-Klassen bleiben bindend. Grund: Codex/Kimi-Adapter erben das private
CLAUDE.md (Autonomie-Doktrin) NICHT — ohne diesen Baustein bleibt ein
kimi-worker/luna-worker-Node mitten im Graphen stehen und fragt ins Leere.
