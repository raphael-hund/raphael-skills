# Legacy: HTML/CSS mit Komponenteninseln (nur für bestehende HTML-/Astro-Projekte)

**Status seit 08.09.2026:** Der Standardstack ist React (Next.js), siehe [stack.md](stack.md). Dieses Modul gilt nur noch für gezielte Änderungen an bestehenden HTML- oder Astro-Websites. Für neue Projekte nicht laden.

Raphael korrigierte am 07.09.2026: HTML-first soll shadcn/ui und andere passende Libraries nutzen können. Es bedeutet nicht, dass jede React-Komponente von Hand nachgebaut werden muss. Die ganze Website braucht dafür keine React-App zu werden. Dieses Modul ersetzt die frühere ausschliessliche Wahl zwischen Vanilla-Portierung und vollständiger React-Anwendung.

## Passenden Einbau wählen

| Ausgangslage | Weg | Tatsächliche Laufzeit |
|---|---|---|
| Einfache Website, native Elemente reichen | HTML/CSS, Vanilla-JS und passende frameworkfreie Libraries | Nur das benötigte JavaScript |
| Neue HTML-orientierte Website mit shadcn oder anderen React-Bausteinen | Bevorzugt Astro als statischer Builder, echte Komponenten gezielt importieren | Statische Bausteine ohne Client-React; interaktive Inseln mit React |
| Bestehende HTML-/CMS-Seite mit einem React-Widget | Eigenes gebündeltes Widget in einem abgegrenzten DOM-Container | React und Widgetcode für diesen Bereich; vorhandene Seite bleibt bestehen |
| Umfangreiche Anwendung mit zusammenhängenden Ansichten und Zuständen | Begründete React-Anwendungsarchitektur | Gemeinsame App-Laufzeit statt künstlich zerschnittener Inseln |

Ein konkreter Nutzen durch geprüfte Komponentenwiederverwendung reicht für eine begrenzte Insel. Die frühere Anforderung an viele verbundene Ansichten gilt für den Wechsel zur **gesamten React-Anwendung**, nicht für einen einzelnen shadcn-Baustein. Kosten, Funktion und Wartbarkeit bleiben Teil der Entscheidung.

## Bevorzugter Hybridweg: Astro

Die Seiten und Layouts werden in `.astro` mit normalem HTML, eigenen CSS-Klassen und Build-Templates geschrieben. Astro erzeugt pro Route vollständiges HTML; normales statisches Hosting reicht bei statischem Output. React-Komponenten laufen ohne `client:*` nur beim Rendern auf dem Server beziehungsweise beim Build. Interaktive Komponenten erhalten gezielt eine Client-Direktive. shadcn dokumentiert diesen Einbau offiziell. [shadcn mit Astro](https://ui.shadcn.com/docs/installation/astro), [Astro Framework-Komponenten](https://docs.astro.build/en/guides/framework-components/).

Konzeptionelles Beispiel; `LeistungsKarte` und `TerminDialog` sind eigene React-Wrapper um ausgewählte shadcn-Komponenten:

```astro
---
import LeistungsKarte from '../components/LeistungsKarte';
import TerminDialog from '../components/TerminDialog';
---
<main>
  <h1>Die echte Leistung und ihr Nutzen</h1>
  <p>Vollständiger, quellenbasierter Inhalt steht bereits im HTML.</p>
  <LeistungsKarte />
  <TerminDialog client:load />
  <a href="/kontakt/">Kontaktseite öffnen</a>
</main>
```

Die Karte braucht keine Hydration, solange sie tatsächlich statisch ist. Der Dialog braucht React im Browser. Eine komplette zusammengehörige Interaktion inklusive Trigger, Inhalt und benötigtem Provider gehört in **eine** Insel. React-Context überträgt sich nicht automatisch zwischen getrennten Inseln. Props müssen für die jeweilige Rendergrenze geeignet sein; Browser-APIs nicht während statischen Renderns aufrufen.

| Hydration | Einsatz |
|---|---|
| Keine `client:*`-Direktive | Reine Darstellung, etwa Card, Badge oder ein normaler Link; vorher auf tatsächliche Interaktivität prüfen |
| `client:load` | Sofort benötigte Interaktion, insbesondere sichtbare Navigation oder Dialogtrigger |
| `client:visible` | Weiter unten liegendes Widget, dessen spätere Aktivierung vertretbar ist |
| `client:idle` | Nachrangige Interaktion; die Wartezeit darf keinen scheinbar kaputten Control erzeugen |
| `client:only="react"` | Nur wenn die Komponente nicht serverseitig renderbar ist; sichtbaren Fallback bereitstellen, wesentliche SEO-Inhalte ausserhalb erhalten |

Ohne Hydration ist ein interaktiver React-Button nicht automatisch funktionsfähig. Keine wichtigen Aktionen hinter einem noch inaktiven Trigger verstecken. Für den ersten Besuch, abgeschaltetes oder fehlgeschlagenes JavaScript einen nutzbaren HTML-Weg behalten; bei Bedarf einen echten Link erst nach erfolgreicher Hydration zum Dialogtrigger erweitern. Ein blosses `noscript` deckt einen fehlgeschlagenen JavaScript-Download nicht ab. [Astro Client-Direktiven](https://docs.astro.build/en/reference/directives-reference/#client-directives).

## CSS, Tokens und Portale gemeinsam behandeln

Eigene Seiten-CSS und kompiliertes Tailwind für Bibliothekskomponenten können nebeneinander bestehen. DESIGN.md und eine kanonische Tokenquelle bestimmen Farben, Typografie, Radien und Zustände. Keine zweite unverbundene Bibliothekstheme anlegen. Tailwind ist ein Build-Werkzeug für CSS; es verlangt für sich allein keine React-Laufzeit.

Bei bestehendem Seiten-CSS die benötigten Tailwind-Teile gezielt importieren und den globalen Preflight-Reset bewusst wählen oder weglassen. Ohne Preflight können Komponenten lokale Basisregeln für etwa Rahmen, Box-Sizing und Formschriften benötigen. **Das Weglassen des Resets und CSS-Layers sind keine vollständige Selektorisolierung.** Bei Kollisionen passende Präfixe oder klar abgegrenzte Selektoren einsetzen und generierte Klassen prüfen. [Tailwind Preflight](https://tailwindcss.com/docs/preflight).

Dialoge, Menüs und Tooltips können in `document.body` portalen. Ein Theme nur am Inselcontainer oder `.astro`-scoped CSS erreicht diese Elemente dann nicht. Gemeinsame Tokens am passenden Vorfahren bereitstellen oder einen bewusst gewählten Portalcontainer verwenden. Fokus, Escape, Rückkehr zum Trigger, Scroll-Lock, Überdeckung und Touchverhalten am echten Portal testen. Shadow DOM und iframe sind wegen anderer Styling-, Fokus- und Layoutgrenzen keine automatische Standardlösung.

## Weitere Libraries

- **Frameworkfreie JS-/CSS-Libraries:** direkt in Astro oder normalem HTML als gezielt geladenes Modul einsetzen; Initialisierung und Cleanup an den tatsächlichen Seitenlebenszyklus binden. Keine zweite DOM-Steuerung innerhalb eines von React verwalteten Teilbaums.
- **React-Komponenten aus shadcn, 21st.dev oder anderen Quellen:** Imports, Lizenz, Primitive, Provider, Assets und Frameworkannahmen lesen. Reine Darstellung statisch rendern; nötige Interaktion in einer React-Insel. Ein Next.js-Router, Server Actions oder eine bestimmte App-Umgebung lassen sich nicht durch `client:load` ersetzen. Solche Abhängigkeiten passend adaptieren oder eine kompatible Komponente wählen. Nicht jede Library wurde dadurch automatisch getestet.
- **Andere Frameworks:** Astro unterstützt mehrere Integrationen. Eine weitere Browser-Runtime nur für einen konkreten Nutzen aufnehmen; React-Bausteine teilen sich nach Möglichkeit dieselbe gebündelte React-Version.
- **Wenn ausdrücklich keinerlei React im Browser gewünscht ist:** statische React-Bausteine beim Build rendern oder frameworkfreie Komponenten wählen. [Basecoat](https://basecoatui.com/installation/) ist eine separate HTML/Tailwind-/JavaScript-Alternative mit shadcn-nahem Ansatz. Es ist kein eingebettetes Original-shadcn und keine pauschale API-Kompatibilitätszusage; hier als Alternative recherchiert, nicht als ausgeführte Integration abgenommen. Seine CSS-/Script-Auswahl und Reihenfolge aus der aktuellen Anleitung übernehmen; nicht pauschal alle Komponenten laden.

## Bestehendes HTML erhalten

Wenn Astro für ein einzelnes Widget unnötig wäre, kann ein gebündelter React-Einstieg einen ausgewiesenen Container mit `createRoot` übernehmen. Native Navigation, Inhalt und Links bleiben ausserhalb. Bereits serverseitig erzeugtes React-Markup benötigt `hydrateRoot` statt `createRoot`; manuell ähnlich aussehendes HTML garantiert keine passende Hydration. Eindeutige DOM-Zuständigkeit und Cleanup bei Entfernung des Widgets erhalten. Dieser alternative Weg ist durch React dokumentiert; die begleitende Probe verwendet Astro. [React in Teilen einer Seite](https://react.dev/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react).

## Prüfen und dokumentieren

Das [ausgeführte Astro-/shadcn-Beispiel](../assets/astro-shadcn/README.md) liegt mit Quellcode, Versions-Lock und MIT-Herkunft im Skill. Es enthält eine statische Card, genau eine Dialog-Insel und eine HTML-Unterseite ohne JavaScript. Die Testgestaltung ist keine Vorgabe für Kundenwebsites. Der gemessene Beispielstand benötigt auf der Startseite rund 84 KB gzip externe JavaScript-Dateien plus den Inline-Bootstrap; die statische Unterseite lädt keinen React-Client. Für andere Komponenten erneut messen.

Das Beispiel nutzt einen vom HTML-Dokument bereitgestellten Portalcontainer als CSS-Grenze. Einen beliebigen Wrapper direkt in Radix Portal zu setzen kann dessen Erkennung laufender Exit-Animationen unterbrechen. Deshalb vorhandene Primitive-Lebenszyklen erhalten und Öffnen, Schliessen, vollständiges Entfernen und Reduced Motion prüfen. Die Referenz enthält den dazu ausgeführten Regressionstest.

Im Komponentenabschnitt von DESIGN.md festhalten: Quelle/Version, Ausgabe als HTML oder Client-Insel, Direktive und Begründung, Provider-/Portalgrenze, Tokens, Fallback und gelieferte JS-/CSS-Kosten. Vorbereitete Quellkomponenten und Node-Build-Abhängigkeiten sind von tatsächlich im Browser geladenen Dateien zu unterscheiden.

Roh-HTML, direkten Aufruf der Unterseiten, relevante Inhalte und Links ohne JavaScript prüfen. Mit JavaScript die echte Interaktion, Fokus, Hydration, mobile Darstellung und Styling neben den nativen Elementen prüfen. Produktionsgrössen und tatsächliche Requests messen; eine kleine Insel kann durch React und ihre Primitive trotzdem merkliche Laufzeitkosten verursachen. Keine Null-JavaScript-Aussage für eine Seite mit hydrierten React-Inseln. Eine statische Route ohne Insel soll keinen unnötigen React-Client laden. Reale SEO- und Formverträge aus dem Hauptskill bleiben bestehen.
