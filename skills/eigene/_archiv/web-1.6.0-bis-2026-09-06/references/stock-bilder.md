# Stock-Bilder über Shutterstock (`scripts/stock.mjs`)

**Wofür:** Echte Fotos (Menschen, Orte, Produkte) aus Raphaels Shutterstock-Abo
lizenzieren und ins Kundenprojekt legen. Kommandos: `node scripts/stock.mjs --help`.

Higgsfield bleibt Default für markenspezifische Szenen (Router `#bilder`).
Stock ist der Weg für echte Fotos, Menschen und Orte.

## Abo

Multi-Asset unbegrenzt bis **05.08.2027**. Standardlizenz für Bilder, Video
und Musik. Per API **100 Downloads pro Tag je Medientyp** (images/video/audio/sfx);
API-Free 500/Monat. Gemessen 03.09.2026: Token gültig (User Raphael Hund), 5 Abos.

## Wann Stock statt Higgsfield

- Echte Menschen, Orte, Produkte (kein KI-Look).
- Kunde verbietet KI-Bilder.
- Nahes Gesicht — laut `bildgenerierung.md` echtes Foto, nicht Recraft/GPT.

Sonst Higgsfield (GPT Image 2). Ein Motiv pro Sektion.

## Ablauf

1. `search "<query>"` mit `--people` / `--orientation` passend zur Art Direction
   (`--safe`, `--type photo` üblich).
2. Kandidaten `preview <id>` — Datei per **Read** ansehen. Deckel: **6 Previews
   pro Bedarf**. Pfad ohne Ansehen = nicht gesehen. Default-Ordner `/tmp/stock-previews`.
3. Wahl in `art-direction.md` notieren: Motiv, warum, Bild-ID.
4. `license <id> --out /root/clients/client-<name>/web/assets/stock/`
   (Default-Größe `huge`). Editorial nur mit `--editorial` und Anlass.
5. `stock add <license_id|datei> <assets-dir> [--typ T] [--motiv "…"] [--style "…"]`
   schreibt AVIF + Zeile in `bilder-index.json`.
6. `stock-lizenzen.json` im Assets-Ordner ist der Lizenznachweis und bleibt im Repo.

```bash
node scripts/stock.mjs search "office team meeting" --people 3 --orientation horizontal --limit 10
node scripts/stock.mjs preview <id>
node scripts/stock.mjs show <id>
node scripts/stock.mjs license <id> --out /root/clients/client-<name>/web/assets/stock/
node scripts/stock.mjs add <license_id> /root/clients/client-<name>/web/assets --typ foto --motiv "…"
node scripts/stock.mjs quota
```

`--sandbox` nur für Lizenz-Tests, verbraucht kein Kontingent.

## Regeln

- Standardlizenz: Website/Ads/Social ok. **Kein Merch, kein Print >500k,
  kein Logo/Marke** aus dem Foto.
- Stock **nie als Kundenbeweis** ausgeben.
- Personenbilder nur **model-released** (`search --people`, `show` prüft
  Releases). Editorial nur mit `--editorial` und begründetem Anlass; ohne Flag Exit 2.
- Ein Motiv pro Sektion. Higgsfield bleibt Default für Markenszenen.
- Jedes lizenzierte Bild über `stock add` — sonst fehlt der Nachweis.

## Auth

Token `SHUTTERSTOCK_API_TOKEN` in `/root/.secrets/api-keys.env`. App
**Raphael VPS CLI**, Callback `localhost`. Fehlt der Token → Exit 2 mit Hinweis
auf `/root/tools/auth-relays/README.md` (Shutterstock). Erneuerung dort,
Abschnitt Shutterstock, Aufgabe 5. Token nie ausgeben. Verfällt bei
Passwort- oder E-Mail-Änderung.

Offizielle CLI `shutterstock` (venv `/root/.local/venvs/shutterstock`, Env
`SHUTTERSTOCK_API_TOKEN`) nur Fallback für andere Endpunkte (videos, audio, cv).
Bilder laufen über `scripts/stock.mjs`.

## Exit-Codes

| Code | Bedeutung |
|---|---|
| 0 | ok |
| 1 | nichts gefunden / API-Fehler (403 Missing scope, 404, 429); Meldung nennt `message` |
| 2 | Bedienfehler, kein Token, Editorial ohne `--editorial` |
| 3 | `HOST_UNAVAILABLE` (Netz) |

`--json` überall. Unbekanntes Flag = Exit 2. Timeout 45 s. Basis
`https://api.shutterstock.com/v2` (Sandbox: `api-sandbox.shutterstock.com/v2`).
