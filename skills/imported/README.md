# imported/ — vendorte Fremd-Skills

Platzhalter. Noch nichts vendored (Stand skills v1).

Wenn ein Fremd-Skill uebernommen wird (z. B. superpowers-Subset, mattpocock/skills,
Anthropic-Offizielle pdf/docx/xlsx/brand-guidelines/frontend-design):

1. Fork/Kopie, NIE Marketplace-Auto-Update.
2. Auf einen Commit-Hash pinnen, Hash in `VENDORING.md` des Skills dokumentieren.
3. Umbenennen in den `r-*`-Namespace (Kollisionsfreiheit).
4. SessionStart-Hooks des Fremd-Skills entschaerfen, Telemetrie hart aus.
5. Vorher lesen + Supply-Chain-Scan (siehe README.md im Repo-Wurzelverzeichnis,
   Abschnitt "Vendoring-Politik").
6. Jeder vendorte Skill bekommt sein eigenes `VENDORING.md` nach Vorbild
   `skills/r-design/VENDORING.md`.

Siehe auch `skills/r-design/` — dort ist die Fusion aus drei Fremd-Skills bereits
nach diesem Muster vendored (Referenzimplementierung).
