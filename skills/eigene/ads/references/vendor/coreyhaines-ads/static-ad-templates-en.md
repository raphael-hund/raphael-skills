# Static Ad Template Library (15 templates)

> Vendored/condensed from coreyhaines31/marketingskills, `skills/ad-creative/references/static-ad-templates.md`
> (MIT license). Kept in English per repo convention (dense reference catalog).
> Used by r-ads step 6 (statics) as the structural menu when briefing static creatives.

Fifteen structural layout frameworks for static (image) ad creative. Cycle through
**all** of them for a batch rather than clustering on 2-3 favorites — template
diversity is angle diversity, and the winner is usually not the one you'd pick by hand.

**Grounding rule (non-negotiable):** every variation cites its source — a real
review, a winning ad, or a real ad comment. No invented claims, stats, or
testimonials. Pull copy from customer language verbatim, don't paraphrase into
marketing-speak. This is r-ads' claims-qa discipline applied one step earlier, at
brief time — see also `../claims-verbote.md`.

## The 15 templates

1. **Headline Statement** — one bold claim, single hero shot, minimal background. Source from your strongest hook or most-repeated review benefit.
2. **Us vs. Them** — two columns, "old way"/competitor greyed out vs. your product full colour, 4-6 comparison rows. Source from switching-language reviews.
3. **Stat Callout** — one giant, real, defensible number (60%+ of the visual) + one line of context. Never invent the number.
4. **Review Card** — a five-star testimonial styled as a real review-platform screenshot (Trustpilot/G2/App-Store look, matched to where your buyers actually read reviews). Verbatim quote.
5. **Testimonial Stack** — three short quotes vertically, each covering a *different* objection/benefit, not the same praise three times.
6. **Before/After** — split image + arrow, states labelled in the customer's own words. Compliance note: before/after claims are regulated in health, finance, beauty — check platform policy first.
7. **Problem/Solution** — pain on top in customer's exact wording, product's one-line answer below.
8. **Founder Message** — handwritten-style/plain-text note, no product glamour shot, one honest paragraph. Collapses if fabricated — only use a real founding story.
9. **Feature/Ingredient Spotlight** — hero image centre, 4-6 radiating callouts on the features/ingredients buyers actually ask about (not your full feature list).
10. **Press Mention** — "As seen in" logo row + one real quote from real coverage. Check logo-usage terms; only outlets that actually covered you.
11. **Lifestyle Hero** — one photo doing the work, 5-8 words of identity-flavoured copy, product in a real environment.
12. **Numbered List** — "N reasons [audience] switch to [brand]", icon + short line per row, each a distinct angle (pain / outcome / proof / differentiator / price).
13. **FAQ Card** — a real objection as the question (phrased as customers phrase it), answered directly. Source from ad-comment objections.
14. **Competitor Callout** — name a specific competitor/category default, one clear, factual, defensible axis of difference. Comparative-advertising rules apply — check what the platform allows.
15. **Origin Story** — founder/team photo, 2-3 short paragraphs on the specific frustration that started it. Pairs better with warm/retargeting audiences than cold.

## Per-concept output format

```markdown
## Concept [N]: [Template Name]
**Headline**: ...
**Body**: [if the template uses it]
**Visual**: [layout description specific enough for a designer/image tool to build without guessing]
**Grounded in**: [which review / winning ad / comment this traces to — quoted or named]
```

For a batch, add an `INDEX.md` listing every concept with template type + grounding
source, so the reviewer scans the whole batch in ~2 minutes.

## Batch distribution rule

Standard 50-concept batch → 3-4 variations per template across all 15. If
performance data shows some templates reliably win for this brand, shift to
60% proven / 40% full-cycle coverage — but never drop coverage to zero. The
template that's tired this month is the one worth revisiting next month.

## Client/stakeholder approval: the creative review page

When someone other than the author needs to pick winners (client, partner),
don't hand over raw markdown — use the self-contained HTML review artifact at
`../../assets/creative-review-template.html` (one file, no build, no
dependencies, hostable anywhere or sent as an attachment). It renders each
concept as an in-feed platform mockup, breaks carousels into a labelled
frame-by-frame storyboard, and must disclose what's grounded in real assets
(the disclosure block is required, not optional — same grounding rule as
above, made visible to the client). Populate its `DATA` object (a JSON block,
not executable JS) from the generated concepts.
