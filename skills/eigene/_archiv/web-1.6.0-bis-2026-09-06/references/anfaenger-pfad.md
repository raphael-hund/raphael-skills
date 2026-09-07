# Auftrag wählen

Wähle nach dem verlangten Ergebnis. Lade zuerst nur die genannte Einstiegsdatei;
weitere Fachquellen kommen bei der dort beschriebenen Entscheidung hinzu.
Eine reine UI-Detailaufgabe darf direkt bei `design` bleiben. Sobald ein
Web-Auftrag mehrere Fachaufgaben verbindet, hält `web` den Gesamtabschluss.

## Sieben Auftragspfade

| Auftrag | Einstieg | Ergebnis und passende Prüfung |
|---|---|---|
| Inspiration | `modus-inspiration.md` | Begründete, tatsächlich untersuchte Referenzen; kein Bau-Gate. |
| Plan-only | `rolle-plan.md` | Aktueller vollständiger Plan mit Quellen, Abhängigkeiten und Abnahmekriterien; kein Capture einer ungebauten Seite. |
| Neubau / Redesign | `rolle-plan.md`, danach `rolle-bau.md` | Frühes repräsentatives Ergebnis, integrierte Website und Nachweise für die verlangten Inhalte, Ansichten und Nutzerwege. |
| Kleine Bestandsänderung | `rolle-bau.md` mit Auftrag oder Reproducer | Gezielter Patch und Prüfung des veränderten Verhaltens; bei sichtbarer Änderung auch der betroffenen Darstellung. |
| Referenznachbau | `web-clone-playbook.md` für Website-URL, `rebuild-from-image.md` für Bild, `video-evidence-contract.md` für Video-/Scroll-Demo | Nachvollziehbare Referenztreue und verlangte Funktionen; zeitliche Abläufe aus tatsächlich gesehenen Bildfolgen ableiten, unbekanntes Verhalten benennen. |
| Explizite Kritik | `rolle-kritik.md` | Priorisierte belegte Befunde zu den gestellten Fragen; keine ungefragten Änderungen. |
| Launch | `rolle-launch.md` | Beauftragte Veröffentlichung samt geprüftem Ziel, Revision und wesentlicher Funktion. |

Landingpage und mehrseitige Website sind Umfangsvarianten. Vorschau und Launch
sind Abnahmestufen. Mehrere Arbeitsschritte desselben Auftrags bleiben bei einem
Owner. Ein Planauftrag wird nicht durch eine vorgeschaltete Kunden-Vorschau ersetzt.

## Passende Details nachladen

- Planung einer Landingpage: `landingpage-struktur.md`; Planung mehrerer Routen:
  `sitemap-section-planung.md` und bei relevanten Abhängigkeiten `website-plan`.
- Offene visuelle Entscheidung: `design`, vorhandenes Kunden-`DESIGN.md` und
  passende Referenzen. `stil-regeln.md` nennt Geltungsbereich und Herkunft;
  `muster-bibliothek/INDEX.md` erschließt vorhandene Cases.
- Neue oder geänderte Texte: `copywriting`, aktueller Copy-Owner und Kundenquellen.
- Geänderte Interaktion: Browser-/Projektprüfungen nach `qa-faecher.md`. Ein
  visueller Beleg ersetzt die Funktionsprüfung nicht.
- Unabhängige Arbeitspakete: `orchestrate` mit dem tatsächlich verfügbaren
  Host-Adapter. Ein einfacher Patch braucht dafür keine künstliche Flotte.
- Neue Gestaltung, Komponenten oder externe Zugänge: Raphaels passenden Eintrag
  aus `zugangskarte.md` wählen; `inspirations-quellen.md` führt vom konkreten
  Quellenfund zur nachgewiesenen Anwendung im vorhandenen Projektstack.

## Sichtprüfung und Werkzeugnutzung

Nutze die echte HTTP-Ansicht des aktuellen Builds. Für vergleichbare Bilder
können 1440×900 und 390×844 dienen; Layout, Reflow und betroffene Zustände
bestimmen weitere Ansichten. Ein Übersichtsbild hilft bei langen Seiten;
Details müssen in ausreichender Auflösung sichtbar sein.

`shot-sweep` erfasst Bilder. Zustandsherstellung und schreibende Aktionen sind
ausdrückliche Szenarien mit erwarteter Wirkung. Stabilisierung durch `--static`
wird gekennzeichnet; der normale Ladeablauf wird bei Bedarf gesondert geprüft.

Referenzen werden tatsächlich angesehen, bevor gestalterische Entscheidungen
daraus abgeleitet werden. Ein Toolname oder eine URL-Liste ist kein Nutzungsbeleg.
Lokale Komponenten erschließt `resources/components/INDEX.md`; externe Ressourcen
`scripts/resource-access.mjs show|open`. Fehlender Zugang wird mit Datum und Grund
benannt, nicht als leere erfolgreiche Recherche ausgegeben.

## Reference-Routing


| Anliegen | Datei |
|---|---|
| Arbeitsschritt vertiefen | `references/rolle-plan.md` / `rolle-kritik.md` / `rolle-bau.md` / `rolle-launch.md` |
| Prüffragen und zusätzliche Reviews | `references/kritik-matrix.md` |
| Handoff-Format, Truth-Dateien, Rotation (Detail) | `references/planner-executor-protokoll.md` |
| Erster Einstieg / Auftrag wählen | `references/anfaenger-pfad.md` |
| Stilhinweise und vorhandene Cases | `references/stil-regeln.md` + `references/muster-bibliothek/INDEX.md` |
| Welche Skills lädt ein Site-Build (und welche nie) | `references/load-graph.md` |
| Referenzseite einlernen (Geschmack-Training) | `references/muster-bibliothek/_template.md` |
| Loop-2 Reihenfolge, Meaning-Capture, Gates, Output-Pfade | `references/loop2-ablauf.md` |
| Ads-Landing: eine Aktion, Formular-Reihenfolge | `references/landingpage-struktur.md` |
| Mehrseitige Sitemap und Section-Plan | `references/sitemap-section-planung.md` |
| IA-Wissen (Nav, URLs, Linkgraph) | `references/informationsarchitektur.md` |
| Fachrollen und Delegation | `references/agent-roster.md` + `references/orchestrierung.md` |
| Neues Modell bekommt eine Rolle (drei Pflicht-Fälle) | `evals/modell-eignung/README.md` |
| Tools/Defaults statt Link-Dump | `references/tool-usecase-router.md` |
| Auftragsbezogene Qualitätsnachweise | `references/qa-faecher.md` |
| AAA Visual/SEO/Trust (≠ WCAG AAA) | `references/agentur-rubrik.md` |
| Visuelle Prüfung und gezielter Referenzvergleich | `references/screenshot-kritik-loop.md` |
| Completion-Kette, run-evidence.json | `references/run-evidence-contract.md` |
| Premium Landing-Regeln (16) | `references/lexlin-design-prinzipien.md` |
| Foundations→Components→Composition | `references/damien-design-methodik.md` |
| URL-Referenz nachbauen + Lizenz | `references/web-clone-playbook.md` |
| Bild/Screenshot nachbauen | `references/rebuild-from-image.md` |
| Video-/Scroll-Demo untersuchen und anwenden | `references/video-evidence-contract.md` |
| Higgsfield / GPT Image 2 | Skill `higgsfield` zuerst; CLI-Katalog `references/bildgenerierung.md` |
| Echtes Stock-Foto lizenzieren (Shutterstock) | `references/stock-bilder.md` |
| Neue Illustration vs. bestehendes Asset; Inhalt+Stil referenzieren | Skill `higgsfield` + `references/bildgenerierung.md` Abschnitt **Neue Illustration vs. wiederverwenden** |
| Motion-Regeln | `references/motion-doktrin.md` |
| Copy-paste Motion-UI (beUI v2) | `references/ui-components/INDEX.md` |
| Lokale Vendor-Komponenten (zehn Quellen, offline zuerst) | `resources/components/INDEX.md`, dann `resources/components/<site>/INDEX.md` |
| Default-Stack Next/Tailwind/shadcn/`motion` | `references/radix-shadcn-tailwind-stack.md` |
| Popup/Lead-Magnet | `references/conversion-elemente.md` |
| CRO Bestandsseite | `references/cro-diagnose.md` |
| A/B-Programm | `references/_archiv/experiment-programm.md` |
| Security Formulare/Supply-Chain | `references/security-audit-playbook.md` |
| Custom-Code gegen AI-Slop + Oxlint anti-slop | `references/code-qualitaets-checkliste.md` |
| Junge Domain vor Launch | `references/_archiv/domain-safe-browsing-checkliste.md` |
| Statistik-Linkbait HTML | `references/templates/statistics-page-template.html` |
| Vercel-Git, Remotes Org+privat | `references/vercel-git-deploy.md` |
| Adobe Fonts Library | `node scripts/adobe-fonts-kit.mjs show <Familie>` |
| Genau eine Ressource nach Router-Wahl | `scripts/resource-access.mjs show "<Name>"` = lokale Metadaten; Zur tatsächlichen Nutzung: `node scripts/resource-access.mjs open "<exakter Name>"` öffnet die Katalog-URL und liest die Site. URL-Dump allein zählt nicht als Nutzung. |
| Inspiration: passende Quellen und Bilder | `references/modus-inspiration.md` |
| Welche Quelle wie nutzen (MCP/Skript/Vendor/open/Login) | `references/zugangskarte.md` |
| Inspiration / einzelne Fremdkomponente holen | `references/inspirations-quellen.md` |
| Raphaels Quellenpool nach Einsatzzweck | `references/zugangskarte.md#raphaels-quellen-vom-05092026`; vollständiger Katalog: `references/frontend-referenzbibliothek.md` |
