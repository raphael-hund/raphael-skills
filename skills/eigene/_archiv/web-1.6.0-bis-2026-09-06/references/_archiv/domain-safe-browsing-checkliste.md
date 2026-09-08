# Domain-Safe-Browsing-Checkliste — Launch-Gate für neue Domains

**Wofür:** Ads-Landingpages laufen oft auf jungen Domains mit Formularen —
genau das Muster, das Google-Safe-Browsing-Flags auslöst ("Gefährliche
Website"-Warnung in Chrome/Brave/Safari/Firefox/Edge, gefüttert von einer
gemeinsamen Google-Blockliste). Ein geflaggter Domain-Launch killt eine ganze
Testwelle. Diese Checkliste ist Teil des Launch-Gates im Haupt-SKILL.md
(Abschnitt "Launch") — vor jedem Go-Live auf neuer Domain durchgehen.

**Herkunft:** kondensiert aus `davidondrej/skills`,
`skills/ops-and-setup/google-safe-browsing/SKILL.md` (MIT-Lizenz).

## Schnellcheck: ist eine Domain schon geflaggt?

```bash
curl -s "https://transparencyreport.google.com/transparencyreport/api/v3/safebrowsing/status?site=<domain>"
```

Apex-Domain UND `www.`-Variante separat prüfen — sie werden getrennt bewertet.
Menschenlesbare Version: `https://transparencyreport.google.com/safe-browsing/search?url=<domain>`.

## Präventions-Checkliste (jedes neue öffentliche Web-Projekt)

1. **Keine Fremdmarken in der Domain.** `firma-x-tool.de` (Firma X ist nicht
   der Kunde) + Login/Formular = automatischer Phishing-Verdacht, plus
   Markenrecht-Risiko. Nur Domains verwenden, die der Kunde/die Agentur
   selbst besitzt.
2. **Crawler dürfen nie direkt auf ein Zugangsdaten-Formular landen.** Für
   anonyme Besucher: neutrale Landingpage ohne Login-Feld, klarer Betreiber-
   Hinweis ("Betrieben von ..."), bei Namensähnlichkeit zu einer bekannten
   Marke ein "nicht verbunden mit ..." ergänzen.
3. **Search Console am Tag 1, jede Domain.** Domain-Property anlegen, TXT-Record
   beim Registrar setzen. Das ist der einzige Kanal, über den Google VOR dem
   roten Warnbildschirm warnt, und die einzige Tür für eine Review-Anfrage
   nach einem Flag.
4. **Öffentliche URL = öffentliche Seite.** "Ist nur intern gedacht" heißt für
   den Klassifikator nichts. Verwaiste Anmeldeformulare auf eigentlich
   Invite-only-Tools entfernen — junge Domain + E-Mail-Sammelformular wirkt
   wie ein Harvesting-Kit.
5. **Wie ein Fremder verifizieren.** `curl -sL https://<domain>/` und prüfen:
   landet auf neutralem Content, kein Passwortfeld, keine Fremdmarke in
   Title/Headings.

## Diagnose, wenn schon geflaggt

1. Schnellcheck auf Apex und `www` laufen lassen, Flag + Kategorie
   bestätigen.
2. Seite anonym abrufen (`curl -sL`), exakt sehen was der Googlebot sieht:
   Markennamen in Domain/Title/Headings, sofortiger Redirect auf ein
   Zugangsdatenformular, öffentliche E-Mail-Sammelformulare, junges
   Domain-Alter (`whois`).
3. Git-Historie ist meist eine falsche Spur — Auslöser ist ein Re-Crawl/
   eine Neubewertung oder eine Nutzermeldung, kein aktueller Commit. Nur
   überfliegen, um eingeschleuste Scripts/kompromittierte Dependencies
   auszuschließen.

## Recovery

1. Öffentliche Oberfläche zuerst fixen (Präventions-Checkliste oben) und
   deployen. Eine Review gegen eine unveränderte, phishy Oberfläche wird
   abgelehnt, und wiederholte Verstöße dauern länger.
2. Domain in Search Console verifizieren (DNS-TXT beim Registrar, wirkt
   innerhalb von Minuten).
3. Search Console → Sicherheitsprobleme → Review anfordern. Ein bis zwei
   sachliche Sätze: was die Seite ist, wer sie nutzt, was geändert wurde.
4. Übliche Bearbeitungszeit 1–3 Tage. Verifizieren: Schnellcheck erneut
   laufen lassen, bis `STATUS 1`, dann im Browser bestätigen.
5. Enthält die Domain selbst eine Fremdmarke: das entfernte Flag bleibt
   provisorisch, Re-Flag-Risiko bleibt hoch. Dauerhafte Lösung ist der
   Umzug auf eine neutrale Domain.
