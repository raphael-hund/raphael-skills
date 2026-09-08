# X-Posts Volltext-Dokumentation (2026-09-07)

Auftrag: Vollständige Texte, Bildbeschreibungen und zitierte Prompts von drei X-Posts
lesen und dokumentieren. Zugriff erfolgte über den Browser-MCP mit dem VPS-Dauerprofil
(nicht bei X eingeloggt, aber alle drei Posts sind öffentlich als "Artikel"/Post ohne
Login lesbar gewesen, ohne Login-Zwang, ohne Blockade, ohne Threadreader/xcancel
nötig). Alle Zitate sind wörtlich aus dem Original übernommen (Englisch, da die Posts
auf Englisch verfasst sind). Screenshots liegen in `x-shots/`.

Hinweis zur Arbeitsumgebung: Der Browser lief während der Recherche parallel zu einem
weiteren Prozess ausserhalb dieser Aufgabe, der wiederholt eigene Tabs
öffnete und die aktive Tab-Auswahl veränderte (sichtbar an fremden Seiten wie
land-book.com, Abduzeedo, One Page Love, Designspiration in der Tab-Liste). Dadurch
sind einige Screenshot-Versuche fehlgeschlagen bzw. auf die falsche Seite gegangen;
die hier abgelegten Screenshots wurden erst nach Kontrolle des Ergebnisses als korrekt
bestätigt.

---

## Post 1: https://x.com/LexnLin/status/2050179260892029179

- **Autor**: Leon Lin (@LexnLin), verifizierter Account
- **Datum**: 13:43 · 1. Mai 2026
- **Format**: X-"Artikel" (Long-Form-Post) mit Titel "How To Turn An Image Into A
  Website (EXAMPLE)"
- **Statistik zum Aufrufzeitpunkt**: 200.863 Anzeigen, 31 Antworten, 74 Reposts,
  866 „Gefällt mir", 2045 Lesezeichen

### Vollständiger Text (wörtlich)

> How To Turn An Image Into A Website (EXAMPLE)
>
> You may have read this tutorial and still asked how do I turn gpt-images-2.0
> generated images into code using for example codex.
>
> This tutorial should hopefully clarify everything with an example :)
>
> [Referenz-Link im Text: https://x.com/i/web/status/2048791596137632126]
>
> **Generate images of the website you like**
>
> Step one is to generate images for your website on chatgpt.com using
> https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md
> Copy the content of the file and drop it into the prompt or add the Markdown file.
>
> [Bild: siehe bild01/bild02]
>
> In this example I used this prompt:
>
> > Based on this skill above, generate images for a website for an AI agency. The
> > design should include eight sections, with one image per section, eight distinct
> > images in total. The website should feel polished and clean and rather minimalist
> > with less info, but with striking image effects/visuals and creative layouts. Use
> > orange as the main color. All images should be horizontal
>
> **TIPS:**
> - Please run your prompt multiple times in different chats to get more results to
>   choose from
> - Use thinking mode for better quality
> - Generate one image per website section
> - images 2.0 can generate up to 10images at once
>
> **Optional: refine/iterate till you get the perfect result**
>
> Just prompt and refine in chatgpt till you get a really nice result.
>
> Use this to edit one image at a time.
>
> [Bild: siehe bild02]
>
> Or change the style of all images.
>
> [Bild: siehe bild03]
>
> If you're done, download all images.
>
> **Extract all images**
>
> Now you need to extract all assets from your images. So this means for example
> these:
>
> [Bild: siehe bild04, zwei Bilder mit rot markierten Einzelelementen]
>
> This is how I extract these images:
>
> [Bild: siehe bild04/bild05]
>
> Prompt:
>
> > extract the images on the right, generate them total should be 7 extracted
> > generated images, please dont change them, they should look exactly the same
>
> [Bild: siehe bild05, Ergebnis der Extraktion]
>
> Prompt:
>
> > in this image there are 4 images used. extract them and generate all 4. so
> > generate 4 different images in total
>
> **Remove background of your assets**
>
> Sadly chatgpt no longer has the feature of generating transparent images anymore
> (hope it will be there again soon :))
>
> I personally use https://express.adobe.com/home/tools/remove-background (free)
>
> [Bild: siehe bild06, Adobe-Express-Tool "Hintergrund entfernen"]
>
> **Turn it into a website**
>
> I'm using Codex for building this website.
>
> Work on one section everytime. Start by adding your first section and prompting
> something like this:
>
> > lets build a website.
> > i will provide the images and you just clone the rest of the website. so do NOT
> > generate or build the asset in this image. focus on the components and details.
> > here is the hero section. copy it. after that give me the dir of the folder where i
> > need to put my images in  use react + nextjs
> > start local dev server afterwards
>
> [Bild: siehe bild06/bild07, Codex-CLI-Chatverlauf mit diesem Prompt]
>
> Afterwards codex will cook and tell you something this:
>
> [Bild: siehe bild07, Codex-Terminal-Ausgabe]
>
> Built the Next.js/React hero clone and started the local dev server:
> http://127.0.0.1:3002
> Put your provided right-side hero artwork here: 📄 images
> Use this exact filename so it loads automatically: hero-visual.png
>
> Put your asset image that you extracted into that folder. (Either refresh the site
> or tell codex that you've added it)
>
> And there you go
>
> The result
>
> [Bild: siehe bild08, fertige "Nexora"-Website, Hero-Sektion]
>
> Original
>
> [Bild: siehe bild08, das ursprünglich generierte Referenzbild]
>
> These were 2 prompts. You can refine it of course by fixing sizes and positioning of
> components.
>
> ---
>
> Do the same for all the other sections. If you encounter alignment issues or
> overlapping:
> Screenshot it, give it to codex, let it fix it
>
> You need to be patient. Nothing crazy comes after one prompt.
>
> > "Good things come to those who wait."
>
> **Next steps**
> - Add scroll animations
> - Add hover animations
> - Focus on details and responsiveness
>
> You can add these by just prompting Codex to add them:
>
> > Add animations when scrolling into a new section. Should feel smooth and clean
>
> **My result**
>
> [Video/Bild: siehe bild09, abspielbares 17-Sekunden-Video der fertigen Website]
>
> So everything you actually need is ChatGPT images 2.0 and Codex.
>
> Github code: https://github.com/Leonxlnx/tutorialnexora
>
> ---
>
> If you have questions, reply or dm me :)
>
> Happy codexmaxxing!

### Zitierte Prompts (Sammlung, wörtlich)

1. Bild-Generierungs-Prompt (Website-Sektionen):
   > Based on this skill above, generate images for a website for an AI agency. The
   > design should include eight sections, with one image per section, eight distinct
   > images in total. The website should feel polished and clean and rather minimalist
   > with less info, but with striking image effects/visuals and creative layouts. Use
   > orange as the main color. All images should be horizontal

2. Extraktions-Prompt 1 (7 Bilder aus einer Referenz extrahieren): **das ist der vom
   Auftrag angefragte Element-Extraktions-Prompt**:
   > extract the images on the right, generate them total should be 7 extracted
   > generated images, please dont change them, they should look exactly the same

3. Extraktions-Prompt 2 (4 Bilder aus einer anderen Referenz extrahieren):
   > in this image there are 4 images used. extract them and generate all 4. so
   > generate 4 different images in total

4. Codex-Bau-Prompt (erste Sektion, Hero):
   > lets build a website.
   > i will provide the images and you just clone the rest of the website. so do NOT
   > generate or build the asset in this image. focus on the components and details.
   > here is the hero section. copy it. after that give me the dir of the folder where i
   > need to put my images in  use react + nextjs
   > start local dev server afterwards

5. Codex-Animations-Prompt:
   > Add animations when scrolling into a new section. Should feel smooth and clean

### Bilder (Screenshots in `x-shots/post1-lexnlin-2050179260892029179/`)

Zusätzlich liegt eine vollständige Ganzseiten-Aufnahme unter
`x-shots/post1-lexnlin-2050179260892029179-full.png` (1896×9528px, gesamter Artikel
inkl. Thread-Antworten).

- **bild01-artikel-kopf-und-skill-link.png**: Artikelkopf mit Autor, Titel "How To
  Turn An Image Into A Website (EXAMPLE)", Einleitungstext und Link auf
  `imagegen-frontend-web/SKILL.md` im Repo `Leonxlnx/taste-skill`.
- **bild02-imagegen-prompt-und-ergebnis.png**: ChatGPT-Oberfläche (dunkles Theme) mit
  generiertem Website-Bild "AI products. Beautifully engineered." (orange/beige,
  glasartige geometrische Formen), plus der volle Bild-Generierungs-Prompt und die
  4 Tipps sowie ein zweites ChatGPT-Fenster mit Edit-Eingabefeld "remove the 3 cards
  on the right".
- **bild03-stil-aenderung-liquid-glass.png**: Zweites ChatGPT-Fenster, gleiches
  Website-Bild, Eingabefeld mit Prompt "change the theme to liquid glass", zeigt
  den Stil-Iterationsschritt.
- **bild04-website-vorlage-mit-markierten-elementen.png**: Zwei Referenzbilder der
  generierten "Nexora"-Website (Hero "AI products. Beautifully engineered." und
  zweite Sektion "AI solutions that solve real problems.") mit rot umrandeten
  Rechtecken um die einzelnen zu extrahierenden Grafikelemente (Glasformen, Icons,
  Datenkarten).
- **bild05-extraktions-prompt-7-bilder.png**: ChatGPT-Chatverlauf mit dem
  Extraktions-Prompt "extract the images on the right, generate them total should be
  7 extracted generated images, please dont change them, they should look exactly the
  same" und dem Ergebnis (7 einzeln extrahierte Assets als Vorschau-Kacheln rechts),
  plus zweiter Chat mit dem 4-Bilder-Extraktions-Prompt.
- **bild06-hintergrund-entfernen-adobe.png**: Vorher/Nachher, links das
  freigestellte Glasform-Asset auf Transparenz-Schachbrett, rechts die Oberfläche von
  Adobe Express "Hintergrund entfernen" mit Hintergrund-Kategorien-Auswahl.
- **bild07-codex-terminal-output.png**: Codex-CLI-Chat mit dem "lets build a
  website…"-Prompt (Hero-Sektion) und der Terminal-Ausgabe "Built the Next.js/React
  hero clone and started the local dev server: http://127.0.0.1:3002 … Use this exact
  filename so it loads automatically: hero-visual.png".
- **bild08-ergebnis-vs-original.png**: Direkter Vergleich, oben "The result" (fertig
  gebaute Nexora-Website im Browser, Next.js/React), darunter "Original" (das
  ursprünglich generierte Referenzbild), nahezu identisch.
- **bild09-finales-ergebnis-video.png**: Eingebettetes 17-Sekunden-Video ("My
  result") der fertigen, animierten Nexora-Website mit Scroll-Interaktion.
- **bild10-thread-antworten.png**: Screenshot der ersten Antworten unter dem Post
  (siehe Abschnitt "Antworten" unten).

### Verlinkte Repos/Tools

- `https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md`
 , der Skill, mit dem die Referenzbilder generiert werden.
- `https://express.adobe.com/home/tools/remove-background`, kostenloses
  Freistell-Tool (Ersatz für die inzwischen fehlende ChatGPT-Transparenz-Funktion).
- `https://github.com/Leonxlnx/tutorialnexora`, vollständiger Code des im Tutorial
  gebauten Beispiels ("Nexora"-Website).

### Antworten / Thread-Fortsetzungen des Autors

- Leon Lin (@LexnLin), 1. Mai, zitiert `x.com/UsmanBa01143676/status/2050103711998099609`
  mit dem Kommentar "A useful tip :)". Die zitierte Antwort von **Usman Bashir**
  (@UsmanBa01143676) lautet wörtlich: "Let me give you a tip. If you ask ChatGPT to
  describe your web design image so that you can tell it to web designer that you
  want things like this, it will give you a detailed brief, which, when fed into
  Codex along with your reference image, you will get an exact web design."
- Leon Lin (@LexnLin), 1. Mai, postet einen Link zu einem geteilten ChatGPT-Chat
  (`chatgpt.com/share/69f4a756-2d54-83eb-a08a-7edf7f677dd4`) mit dem Kommentar "proof
  for people who said this is fake".
- **Yan** (@Your_Fav_Dev_, verifiziert), 1. Mai, postet ein 22-Sekunden-Video mit dem
  Kommentar: "Did a (a little) sanity check, rebuilt the site. verified you can, in
  fact, build this with just codex. thanks for the lesson.". ein externer Nachbau-
  Beleg eines Nachbauers; der Autor selbst hat dort nicht geantwortet.

---

## Post 2: https://x.com/LexnLin/status/2076422557180608888

- **Autor**: Leon Lin (@LexnLin), verifizierter Account
- **Datum**: 23:44 · 12. Juli 2026
- **Format**: X-Artikel mit Titel "How To Actually Design With AI"
- **Statistik zum Aufrufzeitpunkt**: 861.861 Anzeigen, 51 Antworten, 177 Reposts,
  2223 „Gefällt mir", 6516 Lesezeichen
- **Bilder**: Keine inhaltstragenden Bilder/Screenshots im Artikeltext selbst (reiner
  Fliesstext, nur das generische X-Artikel-Coverbild als Kachel). Es wurde daher kein
  Einzel-Screenshot in einen eigenen Bildordner gelegt; der Versuch eines
  Ganzseiten-Screenshots ist durch die oben beschriebene Tab-Fremdübernahme
  fehlgeschlagen und wurde als für den Auftrag nicht nötig eingestuft (kein Bildinhalt
  zu dokumentieren).

### Vollständiger Text (wörtlich)

> How To Actually Design With AI
>
> Design has always been one of the areas where AI struggles to match human ability.
> But most people still misunderstand what designing with AI actually means.
> Designing with AI does not mean asking it to do everything for you. The idea,
> direction, feeling, and creativity should still come from you.
>
> AI is there to help you execute.
>
> Here is the process in simple terms:
>
> You develop the idea.
> You gather inspiration.
> You translate your thinking into prompts and use AI to build it.
>
> You can use tools like Cursor, Codex, Claude, or any harness. Basically at its
> core, you are turning your thoughts into instructions. AI can execute extremely
> well, but it still lacks true creativity. It understands design rules like
> spacing, typography, color theory, and hierarchy.
>
> But it does not understand taste. It does not know what feels original,
> meaningful, or genuinely good.
>
> That is the gap.
>
> You cannot give AI real taste yet, but you can work around that limitation.
>
> **Method 1: Use a Design Skill**
>
> This is the fastest approach. If you are short on time or working on something
> small, you can rely on prebuilt design skills.
>
> Some examples:
>
> Impeccable
> Emil Kowalski's UI skills
> Skills.sh
> TasteSkill
>
> TasteSkill Version 2 is also coming soon with a dedicated GPT 5.6 one first. :)
>
> The process is simple:
>
> Add a design skill.
> Give the AI context.
> Prompt it a few times to create your site/app/poster
> Fix obvious issues.
> Ship it.
>
> The result will usually be decent. It may still feel similar to other
> AI-generated designs, but good skills help avoid the worst mistakes/slop. This is
> what most people use.
>
> **Method 2: Design It Yourself With AI**
>
> If you want something that actually stands out, you need to go deeper. You want
> people to land on your product and feel that real thought went into it. That
> requires a more intentional process.
>
> You might be building:
>
> A mobile app
> A desktop app
> A website
> A landing page
> A dashboard
> A poster
>
> Whatever it is, you need a clear direction first. If you do not know what you are
> building, AI will not figure it out for you.
>
> Start With Meaning
>
> Before anything else, define the foundation.
>
> Ask yourself:
>
> Who is this for?
> What problem does it solve?
> What should it feel like?
> What should it represent?
>
> The UI should reflect the meaning of the product. Write this down. You can also
> use AI here, but not for design. Let it ask you questions instead.
>
> For example:
>
> What is the product about?
> Who is the audience?
> What feeling should it communicate?
> What should the branding feel like?
> What colors and fonts fit?
> Should it feel minimal, playful, premium, technical, or experimental?
>
> Collect Inspiration
>
> Once you have direction, start collecting references. A strong source is Mobbin.
>
> It has real product screens across many categories. Do not just look at designs
> and think "this looks good."
>
> Ask yourself why.
>
> Is it the layout?
> The spacing?
> The typography?
> The structure?
> The interaction?
>
> Save anything useful.
>
> Organize it into folders like:
>
> Navigation
> Heroes
> Pricing
> Cards
> Mobile screens
> Dashboards
> Animations
> Typography
>
> Build your own reference library over time. That is also hw you develop "taste".
>
> (The Mobbin link is an affiliate link. You can get 10% off your first three
> months, and I may receive a commission at no extra cost.)
>
> Other useful sources:
>
> Pinterest
> Cosmos
> Awwwards
> Webflow Templates
> Craftwork
> Rebrand Gallery
> Component Gallery
> Savee
> Lummi
>
> also:
>
> Do not copy entire designs. Combine ideas into something that fits your product.
>
> Map the Structure
>
> Now define what you actually need to build.
>
> For a website:
>
> Navigation
> Hero
> Features
> Pricing
> Testimonials
> CTA
> Footer
>
> For apps:
>
> Onboarding
> Home
> Search
> Profile
> Settings
> Core flows
> Empty states
>
> Each section needs clear content.
>
> For example, a hero needs:
>
> Headline
> Description
> CTA
> Visual
>
> AI can help with copy, but clarity still comes from you.
>
> Build Component by Component
>
> Now you start building. Take individual ideas from your references and adapt
> them.
>
> Instead of saying: "Build me a full website"
>
> Say: "Create a hero section based on this style, adapted to my branding."
>
> Work step by step:
>
> Navigation
> Hero
> Cards
> Buttons
> Typography
> Details
>
> AI performs much better with smaller tasks. You also keep control.
>
> Generate Custom Assets
>
> Use image generation when needed. Tools like GPT Images 2.0 or Seedream 5.0 are
> strong enough now.
>
> Give clear context:
>
> Colors
> Style
> Composition
> Use case
>
> Avoid generic stock images. Custom visuals make everything feel more cohesive.
>
> The Workflow
>
> The full process:
>
> Define the idea
> Clarify purpose and audience
> Set branding direction
> Collect references
> Organize them
> Map structure
> Build components
> Generate assets
> Add interactions
> Refine everything
>
> This produces far better results than one prompt.
>
> **Method 3: Use an Inspiration Board**
>
> There is a faster middle ground. Instead of building everything piece by piece,
> you can give AI a curated set of references.
>
> Collect screenshots from:
>
> Mobbin
> Awwwards
> Webflow
> Craftwork
> Rebrand Gallery
> Component Gallery
> Savee
> Cosmos
> Pinterest
>
> Then tell the AI:
>
> "Combine the style and direction of these references into a design for my
> product. Do not copy directly."
>
> Still give full context first. Let the AI ask questions. Then generate.
>
> This is faster than building everything manually, but still much better than a
> generic prompt.
>
> The Three Approaches
>
> 1. Design Skills
>
> Fast, decent results.
>
> 2. Component-by-Component
>
> Slow, highest quality.
>
> 3. Inspiration Board
>
> Balanced approach.
>
> Additional Tools
>
> SVG Generation
>
> Use Quiver to create SVGs.
>
> SVGs allow for better animations because elements are separate.
>
> Video
>
> Use tools like Google Flow.
>
> Video can enhance:
>
> Hero sections
> Backgrounds
> Product demos
>
> Image Libraries
>
> Use platforms like Lummi when needed.
>
> Just make sure images match your brand.
>
> Layering
>
> Use background removal and layering to add:
>
> Depth
> Motion
> Interaction
>
> Small details do make a big difference.
>
> Final Thoughts
>
> AI should not replace your thinking.
>
> You still decide:
>
> What to build
> Why it matters
> Who it is for
> What it should feel like
>
> AI just helps you execute faster. The best results will not come from better
> prompts. They will come from better taste.
>
> I will share more about design, development, and building + tuts on making your
> first money online with AI soon. :)
>
> If you have questions, leave a reply! Hope this helped. :)

### Zitierte Prompt-Formulierungen im Text

- "Create a hero section based on this style, adapted to my branding." (Beispiel für
  komponentenweises Bauen statt "Build me a full website")
- "Combine the style and direction of these references into a design for my product.
  Do not copy directly." (Prompt für Methode 3, Inspiration Board)

### Verlinkte Tools/Quellen (im Fliesstext genannt, keine anklickbaren Repo-Links
mit Zielseiten aus dem Snapshot ersichtlich ausser Mobbin als Affiliate-Link)

Design-Skills: Impeccable, Emil Kowalski's UI skills, Skills.sh, TasteSkill (v2
angekündigt, zuerst mit dediziertem GPT-5.6).
Referenzquellen: Mobbin (Affiliate-Link, 10 % Rabatt auf die ersten drei Monate),
Pinterest, Cosmos, Awwwards, Webflow Templates, Craftwork, Rebrand Gallery,
Component Gallery, Savee, Lummi.
Weitere Tools: Quiver (SVG-Generierung), Google Flow (Video).

### Antworten / Thread-Fortsetzungen des Autors

- Leon Lin (@LexnLin), 12. Juli, eigene Anschlussantwort im Thread: "(btw I yapped
  30min to whispr and then edited the article with Codex)". bestätigt, dass der
  Artikel per Diktat (Wispr) plus Codex-Überarbeitung entstanden ist.
- **Jan M** (@jannotjohnn, verifiziert), 12. Juli, Antwort (nicht vom Autor): "As
  always, mate, thanks for your guide when doing the design, I always use your
  skill". Bezug auf einen von Leon Lin verbreiteten Design-Skill (vermutlich
  TasteSkill/taste-skill-Repo).

---

## Post 3: https://x.com/EXM7777/status/2092250905655812121

- **Autor**: Machina (@EXM7777), verifizierter Account
- **Datum**: 16:01 · 25. Aug. 2026
- **Statistik zum Aufrufzeitpunkt**: 1,1 Mio. Anzeigen, 132 Antworten, 373 Reposts,
  6547 „Gefällt mir", 17.471 Lesezeichen

### Vollständiger Text (wörtlich)

> i finally cracked frontend design with AI... without using any skill
>
> frontend needs taste to not look like slop, and i'm more of an engineer than an
> artist, so i'm genuinely bad at it
>
> my way around it: collecting inspirations and modules from other people, building
> a lego of components
>
> resources you can send to your agents:
> - beautifului.dev
> - beui.dev
> - rareui.com
> - transitions.dev
> - ui.shadcn.com
>
> it's VERY easy for agents to edit components once they have the code
>
> you send the link, your agent fetches the full list of components, then you ask
> it to find the best way to integrate them into your frontend foundation
>
> the easiest way i found to make your UI/UX drastically better without being a
> genius designer

### Bild (Screenshot: `x-shots/post3-exm7777-2092250905655812121-full.png` und
Ausschnitt `x-shots/post3-exm7777-2092250905655812121-bild1-crop.png`)

Ein eingebettetes Bild (Screenshot einer Website/eines Tools, vermutlich
`beautifului.dev` selbst): Oben links Logo "UI" mit dem Slogan "Beautiful UI for
AI-native interfaces.", darunter eine linke Navigationsspalte mit Komponentennamen
(Loading State, Thinking, Streaming Text, Approval Card, Tool Chips, Task Rows,
Chat, Insight Cards, Code Block, Fine-tune Card, Selection Actions). Rechts daneben
Beispiel-UI-Ausschnitte: ein Flowchart-Widget ("Flowchart — Workflow trigger and
condition steps on a dotted canvas" mit Knoten "Trigger → New order created",
Bedingungslogik "If order.flavor is Rocky Road and order.topping is …") sowie ein
Liniendiagramm-Widget mit der Beispielfrage "Should I rebalance flavors?". Das Bild
illustriert direkt die im Text genannte Ressource `beautifului.dev` als Bibliothek
fertiger UI-Komponenten für KI-Agenten.

### Verlinkte Repos/Tools

- `beautifului.dev` (https://www.beautifului.dev/)
- `beui.dev` (https://beui.dev/)
- `rareui.com` (https://www.rareui.com/)
- `transitions.dev` (https://transitions.dev/)
- `ui.shadcn.com` (https://ui.shadcn.com/)

### Antworten / Thread-Fortsetzungen des Autors

- Machina (@EXM7777), 25. Aug., eigene Anschlussantwort: ein Link-Karten-Post zu
  `weeklyaiops.com` mit dem Kartentitel "Meet your AI co-founder today", dies wirkt
  wie ein unabhängiger/werblicher Folgepost und nicht wie eine inhaltliche
  Threadfortsetzung zum Design-Thema; textlich keine eigene Ergänzung des Autors zum
  ursprünglichen Post enthalten.
- **Julius** (@localjulius, verifiziert), 25. Aug., Antwort (nicht vom Autor): "I use
  Mobbin MCP and all I do is browse apps I like and build my own internal list of
  components to be re-used in future projects.". ergänzender Community-Kommentar,
  keine Antwort des Autors selbst.

---

## Zusammenfassung Bildablage

```
x-shots/
├── post1-lexnlin-2050179260892029179-full.png        (Ganzseiten-Screenshot, kompletter Artikel + Thread)
├── post1-lexnlin-2050179260892029179/
│   ├── bild01-artikel-kopf-und-skill-link.png
│   ├── bild02-imagegen-prompt-und-ergebnis.png
│   ├── bild03-stil-aenderung-liquid-glass.png
│   ├── bild04-website-vorlage-mit-markierten-elementen.png
│   ├── bild05-extraktions-prompt-7-bilder.png
│   ├── bild06-hintergrund-entfernen-adobe.png
│   ├── bild07-codex-terminal-output.png
│   ├── bild08-ergebnis-vs-original.png
│   ├── bild09-finales-ergebnis-video.png
│   └── bild10-thread-antworten.png
├── post3-exm7777-2092250905655812121-full.png        (Ganzseiten-Screenshot inkl. Cookie-/Login-Overlay)
└── post3-exm7777-2092250905655812121-bild1-crop.png  (Ausschnitt: eingebettetes beautifului.dev-Bild)
```

Für Post 2 (LexnLin, "How To Actually Design With AI") existieren keine
inhaltstragenden Bilder, der Artikel ist reiner Fliesstext ohne Screenshots/Figuren
im Post selbst, daher kein eigener Bildordner.
