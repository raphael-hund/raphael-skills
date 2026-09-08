# Design-Systeme-Vergleich — Entscheidungsregeln

**Wofür:** Bevor Code entsteht, das richtige System wählen (oder bewusst keins).
Kombiniert `design/references/taste-kern.md` §4 (Brief → System-Map, Geschmack
zuerst) mit Fakten aus den Systemen selbst. **Ein System pro Projekt** — nie
zwei UI-Kits gleichzeitig installieren, nie 90% der Tokens überschreiben (dann
lieber kein System, sondern native CSS + Tailwind).

Herkunft Radix-Fakten: `/root/tools/vendor/radix-themes` (Source gelesen,
Stand 20.07.26). Andere Systeme: bekanntes Fachwissen, nicht per WebFetch
nachverifiziert (siehe Rückmeldung am Ende dieses Auftrags) — bei
API-Detailfragen im Zweifel offiziell nachschlagen statt aus dieser Datei
zitieren.

## 1. Wann welches System (Kunde/Projekt-Typ → System)

| Projekt-Typ / Brief-Signal | System | Warum |
|---|---|---|
| Agentur-Landingpage, Marketing, AI-SaaS | Tailwind v4 (+ shadcn nach Bedarf) | Kein Komponenten-Zwang, volle Design-Freiheit, schnell |
| Modernes SaaS-Produkt, eigene Optik, aber App-Komplexität (Formulare, Tabellen, Modals) | Radix Primitives/Themes + shadcn/ui | A11y-Grundlage fertig, Optik bleibt frei anpassbar |
| Internes Tool / Dashboard, wenig Design-Budget | Radix Themes (Theme-Panel-Defaults) | Fertige Optik, wenig Anpassungsaufwand nötig |
| Microsoft/Enterprise-Windows-Kontext, Teams-/Office-Anmutung | Fluent UI (`@fluentui/react-components`) | Erwartungskonform für M365-Nutzer |
| IBM-B2B, Analytics-/Data-Viz-lastig | Carbon (`@carbon/react`) | Eingebaute Data-Viz-Regeln, Enterprise-Dichte |
| Shopify-App (App Store Review verlangt es faktisch) | Polaris | Merchant-UX-Konventionen, Review-Pflicht bei Shopify-Apps |
| Atlassian-Ökosystem (Jira/Confluence-Plugin, internes Tool im Atlassian-Stil) | Atlassian Design System (`@atlaskit/*`) | Konsistenz mit Host-Produkt |
| Google-nahes Produkt, Android-Begleit-Web | Material Design 3 (`@material/web`) | Erwartungskonform, riesiges Ökosystem |
| Next.js-App generell (Routing/Layout/Metadata) | Next.js-Konventionen (App Router) | Kein Design-System, aber Struktur-Pflicht für Performance/SEO |
| Aesthetik statt System (Glassmorphism, Brutalism, Editorial) | Kein Kit — native CSS + Tailwind | Es gibt kein offizielles "Aesthetik"-Paket, ehrlich als Approximation labeln |

Regel aus taste-kern.md: Der Brief entscheidet, nicht der eigene Lieblings-Stack.
Passt kein Eintrag, lieber generischer bleiben (Tailwind + eigene Komponenten)
als ein falsches Enterprise-Kit zu erzwingen.

## 2. Token-Architektur-Vergleich

| System | Wie Tokens definiert sind | Anpassungstiefe |
|---|---|---|
| **Radix Themes** | CSS-Custom-Properties je Skala: `color` (12-stufig pro Accent/Gray, hell+dunkel+alpha-Varianten automatisch generiert), `space`, `radius`, `shadow`, `typography` (Font-Size/Line-Height/Letter-Spacing-Skalen), `cursor`. Skalierung über einen globalen `scaling`-Faktor (1 Zahl steuert alle Größen konsistent). Theme wird über `<Theme accentColor radius scaling>`-Props gesetzt, kein CSS-Rebuild nötig. | Radikal token-first: Farbe/Radius/Scaling sind Props, keine Overrides. Wer 90% der generierten Farbstufen überschreibt, nutzt Radix falsch. |
| **Tailwind (v4)** | Tokens in `@theme`/CSS-Variablen (v4) bzw. `tailwind.config` (v3): Farbpalette, Spacing-Skala, Breakpoints, Font-Sizes — alles frei definierbar, kein festes Design dahinter. | Maximale Freiheit, aber auch maximale Verantwortung: Konsistenz ist Disziplin, nicht erzwungen. |
| **Material Design 3** | Tokens aus einem generierten Farbsystem (dynamische Farbe aus einer Seed-Farbe, "Material You"), feste Typografie-Skala (Display/Headline/Title/Body/Label), Elevation-Stufen. | Bewusst restriktiv — Abweichen von der Skala bricht die Material-Erwartung der Nutzer. |
| **Carbon (IBM)** | 2x-Grid-Spacing-Skala, feste Type-Skala für Dichte (kompakte Enterprise-Tabellen), Farbthemen (White/Gray 10/Gray 90/Gray 100) statt freier Paletten. | Absichtlich weniger Freiheit als Material — Enterprise-Konsistenz über viele Teams wichtiger als Individualität. |
| **Fluent UI** | Design-Tokens über Theme-Objekte (Farbe, Typografie, Elevation), an Windows-11-Fluent-Sprache angelehnt (Akzentfarbe, Reveal-Effekte, Depth). | Mittel — Theme-Objekt austauschbar, aber Fluent-Optik bleibt erkennbar. |
| **Polaris** | Sass/CSS-Custom-Properties, enger an Shopify-Merchant-UI gekoppelt; Farbpalette und Spacing fest, Fokus liegt auf Content-Patterns statt Reinstyling. | Gering — Polaris ist für Shopify-Apps gedacht, nicht für Rebranding. |

Kurzformel: Radix und Tailwind sind **Werkzeuge** (Token-Layer, das Design bleibt
offen). Material, Carbon, Fluent, Polaris, Atlassian sind **Marken-Systeme**
(Tokens transportieren eine fremde Produktidentität mit).

## 3. Was man aus jedem System lernt — auch ohne es zu installieren

| System | Lern-Ertrag ohne Installation |
|---|---|
| **Polaris (Shopify)** | Content-Guidelines: Merchant-freundlicher Ton, Fehlermeldungen als Lösungsvorschlag formulieren statt nur Fehler benennen, Aktionsbuttons nach Wichtigkeit sortiert (primär rechts). Gute Vorlage für jede B2B-Tool-Microcopy. |
| **Carbon (IBM)** | Data-Viz-Regeln: feste Farbpaletten für Kategorial-/Sequential-/Diverging-Charts mit Colorblind-Save-Prüfung, Diagrammtypen nach Datenfrage (nicht nach Optik) gewählt, Tabellen-Dichte-Stufen (compact/normal) für Analytics-Screens. Übertragbar auf jedes Dashboard, auch außerhalb von Carbon. |
| **Atlassian Design System** | Empty-States als eigene Design-Disziplin: Illustration + ein Satz Erklärung + genau eine primäre Aktion, nie eine leere Fläche ohne Ausweg. Auch: Humor-Kalibrierung in Fehlermeldungen (freundlich, nie flapsig bei Datenverlust). |
| **Material Design** | Elevation/Z-Achsen-Denken (Schatten = Bedeutungsträger für Hierarchie, nicht Dekoration), Motion-Prinzip "Objekte bleiben während Übergängen glaubwürdig" (kein Teleportieren von Elementen). |
| **Fluent UI** | Depth/Reveal als eigenständige Interaktionssprache (Hover-Beleuchtung als Affordanz-Signal statt reiner Farbwechsel), Konsistenz über Formfaktoren (Maus/Touch/Pen) hinweg mitdenken. |
| **Radix (Primitives)** | A11y-Referenzimplementierung: Fokus-Trapping in Dialogen, Tastatur-Navigation in Menüs/Comboboxen, ARIA-Rollen korrekt verdrahtet — auch wer Radix nicht nutzt, sollte diese Muster nachbauen. |
| **shadcn/ui** | Zeigt, wie man Radix-Primitives + Tailwind so kombiniert, dass Komponenten **kopiert statt importiert** werden (kein Vendor-Lock-in, volles Styling-Recht). Modell für eigene Komponenten-Bibliotheken. |
| **Framer Motion** | Deklaratives Gesten-/Layout-Animation-Vokabular (`layout`, `AnimatePresence`, Spring-Configs) — Referenz für "wie beschreibt man Bewegung als Zustand statt als Keyframe-Liste". |
| **Atlassian + Carbon zusammen** | Beide zeigen: Enterprise-Systeme investieren überproportional in Tabellen/Formulare/Leerzustände, nicht in Hero-Sections — Marketing-Websites brauchen andere Prioritäten als interne Tools. |

## 4. Next.js-Konventionen (kein Design-System, aber Struktur-Pflicht)

Next.js selbst definiert keine Optik, aber Konventionen, die jedes der oben
genannten Systeme respektieren sollte:

- App Router: `app/`-Struktur, `layout.tsx` für geteiltes Shell-Markup (Header/Footer
  einmal, nicht pro Seite), `loading.tsx`/`error.tsx` als eigene States statt
  Inline-Spinner-Logik.
- Server Components als Default — Client-Components (`"use client"`) gezielt nur
  dort, wo Interaktivität/Browser-APIs gebraucht werden (Formulare, Framer-Motion-
  Animationen, Radix-Popover-States).
- `next/image` für jedes Bild (automatisches Lazy-Loading + Größen-Optimierung) —
  kein rohes `<img>` in Marketing-Seiten, das ist ein Lighthouse-Fehler (G1, hart
  laut `qa-faecher.md`).
- Metadata über die `metadata`-API/`generateMetadata`, nicht per Hand in `<head>`.

## Entscheidungsregel in einem Satz

Brief nennt eine Marke/Plattform → deren offizielles System nehmen und nicht
nachbauen. Brief nennt eine Ästhetik oder "modernes SaaS" → Tailwind + Radix/
shadcn als Default-Stack (siehe `radix-shadcn-tailwind-stack.md`). Unsicher →
lieber der generischere, austauschbarere Stack.
