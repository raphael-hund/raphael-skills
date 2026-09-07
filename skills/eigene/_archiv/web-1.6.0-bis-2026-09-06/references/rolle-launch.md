# Veröffentlichen und den Abschluss prüfen

Launch ist die beauftragte Veröffentlichung einer Website. Lies das konkrete
Ziel, den aktuellen Stand, gültige vorhandene Belege und noch offene
Produktionsanforderungen. Bereits autorisierte Aktionen brauchen keine zweite
Freigaberunde. Eine fehlende echte Produktentscheidung oder unklarer Zielzugang
wird nach Ausschöpfen der unabhängigen Arbeit benannt.

## Vor dem Außenabschluss

| Bereich | Erforderlicher Nachweis |
|---|---|
| Auftrag und Scope | Verlangte Seiten/Funktionen vollständig; aktuelle Kunden-Neins eingehalten. |
| Inhalt und Copy | Aussagen, Zahlen, Marken und Testimonials belegt; neue/geänderte Copy nach `copywriting` geprüft. Web-Ship-Copy gegen die vorhandene Web-Rubrik, Schwelle 0.7. |
| Darstellung | Aktuelle relevante Ansichten geprüft; offene auftragsrelevante visuelle Fehler beseitigt. |
| Funktionen | Kritische Nutzerwege einschließlich relevantem Fehler-/Recoveryfall erfolgreich; UI und Netzwerk-/Datenwirkung stimmen. |
| Technik und A11y | Passende Projektchecks, Links/Assets, indexierbares Markup, relevante axe-Befunde sowie Tastatur/Fokus/Reflow geprüft. Gemessene Leistungswerte erfüllen den Projektvertrag. |
| Ziel und Betrieb | Tatsächliches Deploymentziel/Revision, HTTPS, Domain/Redirects/Canonical und erforderliche Integrationen bestätigt. Datenschutz, Impressum und Consent soweit für das Projekt erforderlich. |

Offene `FAKT-GATE`-Punkte werden durch echte Quellen aufgelöst oder die betroffene
Aussage wird im Auftragsrahmen entfernt. Erfundener Proof geht nicht als echt
raus. Marken-Assets kommen aus nachvollziehbarer Quelle; Lizenz-/Nutzungsgrenzen
eines Referenznachbaus bleiben nach `web-clone-playbook.md` erhalten.

`agentur-rubrik.md` kann konkrete zusätzliche Qualitätsfragen liefern. Eine
feste Zahl von Reviews oder ein universelles Blind-A/B sind keine Voraussetzung
für jede Veröffentlichung. Raphaels subjektive Wahl bleibt seine Entscheidung;
sie wird nicht durch ein technisches PASS simuliert.

## Gültige Belege zusammenführen

Wenn der Auftrag oder Projektvertrag eine maschinelle Gesamtabnahme verlangt,
verbindet `run-evidence.json` die aktuelle Vertrags-/Buildidentität mit den
verlangten Belegen. Nach verändertem Build `bind-build`; anschließend passende
erfolgreiche Belege anhängen. CLI und Anforderungswahl stehen in
`run-evidence-contract.md`. Ein bereits freigegebener Stand für eine benannte
Staging-Domain braucht keinen zusätzlichen Dateisatz: vorhandene gültige
Nachweise nutzen und Veröffentlichung samt tatsächlichem Ziel prüfen.

```bash
node /root/raphael-skills/skills/eigene/web/scripts/run-evidence.mjs   validate --out <run-out> --ready
```

Ein erfolgreicher Worker-Rücklauf, bloße Dateiexistenz oder ein visuelles
Teilurteil ist kein Gesamt-PASS. Fehlgeschlagene, veraltete oder unvollständige
Pflichtbelege bleiben offen. `visual-aaa` liefert innerhalb Web nur den
angeforderten visuellen Anteil dieser Prüfung.

## Ausführen und nachweisen

Nutze den bestehenden Deployweg des Projekts; Git/Vercel-Details stehen bei
entsprechendem Ziel in `vercel-git-deploy.md`. Vor der Mutation Repo, Remote,
Branch/Revision, Umgebung und Domain deterministisch auflösen. Gültige
Ziel-/Egress-Guards bleiben wirksam.

Nach dem Deploy tatsächliche Erreichbarkeit, ausgelieferte Revision und den
wesentlichen Nutzerweg im autorisierten Testmodus prüfen. Produktionsdaten
nicht durch einen generischen Screenshot-Sweep verändern.

Abschluss: erreichbarer Link für Raphael, tatsächlich ausgeführte Außenaktion,
relevante Prüfergebnisse und benannte Grenzen. Ein Dateipfad oder Transportlog
allein bestätigt keine Mac-Zustellung. Weiteres CRO-Lernen folgt nur einem
entsprechenden Auftrag und echten Analytics.
