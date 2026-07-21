# Stitch-Workflow — Design-Screens mit Google Stitch (bindende Regeln)

> Gilt immer, wenn Screens/Layouts ueber Google Stitch (stitch.googleapis.com/mcp
> bzw. `npx @_davideast/stitch-mcp`) erzeugt werden. Verstoesse sind die drei
> Fehler, die Raphael am 21.07.2026 explizit geruegt hat — nie wiederholen.

## Die drei eisernen Regeln

1. **Bilder NIEMALS von Stitch generieren lassen.**
   Alle Bilder entstehen mit Higgsfield (GPT Image 2 fuer Referenz-/Illustrations-
   arbeit, Policy siehe Memory `bildgenerierung-policy`). Fertige Bilder werden
   per `stitch-mcp upload-image -p <projekt> -f <datei> --title "ASSET <name>"`
   ins Projekt geladen. Im Prompt an Stitch stehen nur PLATZHALTER
   ("neutraler hellgrauer Bild-Platzhalter, Seitenverhaeltnis 3:2") — nie
   "generiere ein Foto von...". Erfundene Stock-Portraits im Output = Fail,
   Screen neu prompten.

2. **Schrift: Die Marken-Fonts werden IMMER exakt benannt.**
   Stitch hat eine feste Font-Enum-Liste (kein Cal Sans, kein Poppins). Vorgehen:
   - Im Design-System die naechstliegenden Stellvertreter setzen und die echten
     Fonts im designMd dokumentieren. Sorglos: Headlines Cal Sans SemiBold →
     Stellvertreter `MANROPE`; Body Poppins → Stellvertreter `DM_SANS`.
   - In JEDEM Screen-Prompt: "Headlines semibold/fett, eng zugerichtet" —
     Stitch rendert sonst duenne Default-Schnitte.
   - Beim Code-Export (Next.js) werden IMMER die echten Marken-Fonts gesetzt;
     der Stellvertreter ist nur fuers Stitch-Preview.

3. **Farben: exakt drei Rollen, per Design-System erzwungen, nie nur im Prompt.**
   PRIMARY / SECONDARY / NEUTRAL mit exakten Hex-Werten ueber
   `create_design_system`/`update_design_system` (`overridePrimaryColor`,
   `overrideSecondaryColor`, `overrideNeutralColor`, `customColor`) setzen UND
   ausformuliert ins `designMd` schreiben. Jeder `generate_screen_from_text`-Call
   MUSS `designSystem: "assets/<id>"` uebergeben — ohne Design-System-Parameter
   wuerfelt Stitch eigene Farben (Navy-Fail vom 21.07.).

## Der Loop (pro Screen, max 4 Runden)

```
1. PROMPT   Design-System-Referenz + Sektion-Spez (Copy WOERTLICH) + Platzhalter-Anweisungen
2. RENDER   generate_screen_from_text (projectId, deviceType, modelId GEMINI_3_1_PRO,
            designSystem!) — dauert Minuten; NICHT retrien, sondern list_screens pollen (30s)
3. SCHAUEN  get_screen_image → Base64 → PNG → MIT AUGEN gegen Checkliste pruefen
            (Sorglos: docs/masterplan/51-stitch-checkliste.md)
4. DIFF     Abweichungsliste → naechster Prompt = NUR die Korrekturen, nummeriert,
            plus "alle uebrigen Texte wortgetreu behalten"
5. GATE     bestanden → naechste Sektion. 4x gescheitert → Sektion manuell in Code bauen.
```

## API-Krams (erspart Debugging)

- HTTP-MCP direkt: `POST https://stitch.googleapis.com/mcp`, Headers
  `Content-Type: application/json`, `Accept: application/json, text/event-stream`,
  `X-Goog-Api-Key: <key>`. Tools: create_project, list_projects, get_project,
  list_screens, get_screen, generate_screen_from_text, edit_screens,
  generate_variants, create/update/list_design_systems, upload_design_md,
  apply_design_system, delete_project.
- Der davideast-Proxy ergaenzt: get_screen_code, get_screen_image, build_site
  (+ CLI upload-image/serve/site). Upload-Erfolg parst man aus
  `(?<=screenId: )\d+`, nicht aus `screens/<hex>`.
- `generate_screen_from_text` braucht `projectId` OHNE `projects/`-Prefix;
  `update_design_system` braucht `projectId` UND `name: assets/<id>`.
- Screen fertig? `list_screens` pollen; Antwort steckt als JSON-String in
  `result.content[0].text`.
- get_screen_image liefert `imageContent` (Base64) — decodieren, als PNG lesen.

## Uebersetzungs-Phase (Stitch → Produktion)

Stitch-HTML ist Referenz, nie Produktionscode. Export nach Next.js: echte Fonts,
echte Assets (AVIF/WebP, sprechende Namen), motion/react-Animationen,
Playwright-Screenshot-Abgleich gegen das Stitch-Soll bis deckungsgleich.
