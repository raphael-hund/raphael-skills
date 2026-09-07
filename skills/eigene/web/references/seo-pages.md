# Search architecture and implemented SEO pages

Read before sitemap/content work and before release. The acceptance object is a complete useful page at a working route, not a keyword list, planned sitemap or thin generated template.

## Research to route decisions

Establish the real offer, territory, audiences, terminology, existing URLs, conversions and available proof. Use existing authorised data sources before adding services. Distinguish observed search demand, inferred intent and unknown metrics. Save query/market/date/source; no invented volume, ranking, competition or traffic estimates.

Group queries by the decision or task they express and inspect current result types where available. Map a cluster to a useful existing or new page. Several pages receiving impressions for one query is a signal to investigate, not proof that they harm each other. Preserve valuable existing URLs and document merge/redirect decisions.

| Page family | When to build | Required distinct value |
|---|---|---|
| Service hub | Visitors must compare related services | Clear selection help and paths to substantive service pages |
| Service detail | A real offer has distinct intent | Scope, fit, process, limitations, proof, practical questions and action |
| Location/service area | Actual local delivery has useful specifics | Truthful coverage, relevant constraints, examples or logistics; no invented office |
| Case study | Verifiable work supports a buying decision | Situation, work, evidence, outcome context and permitted assets |
| Guide/comparison | A genuine decision deserves explanation | Complete useful answer, expertise, supporting sources and relevant next step |
| About/contact | Visitors need identity and a reliable action | Real business/people/contact information and functional paths |

Do not create all combinations of service and city, keyword synonyms as duplicate pages, or pages whose only change is a place name. More content is useful only when it adds something. Don't use keyword-density targets, uniqueness percentages or minimum word counts as acceptance rules. [Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

For Raphael's full-site scope, the plan must explicitly decide every relevant service and supporting intent. Implement all accepted launch pages. If evidence for a requested local page is missing, find it or identify the missing factual input; do not quietly replace the multi-page build with a homepage.

## Per-page brief and content model

Each page brief covers: intent, distinct value, audience, primary action, evidence sources, section purposes, main answer/offer, relevant objections, proof placement, internal links, metadata and schema. Page families share components, not identical prose. Headlines and body structure should stay understandable to humans while accurately describing the subject.

Use a typed content model in the website and keep the route inventory aligned with it. Navigation, sitemap and canonical generation should derive from a single source where practical. Add contextual links where they help readers; hubs, breadcrumbs and contextual links complement each other. Do not use arbitrary inbound-link quotas.

## SEO-PAGE-MAP.json contract

The included validator accepts this compact project schema. Extra project-specific fields such as title, description, section briefs and redirect history can be added; the checker does not validate them automatically. The optional `locale` field is validated as a nonempty language tag recognised by `Intl.getCanonicalLocales`.

```json
{
  "version": 1,
  "siteUrl": "https://example.com",
  "pages": [
    {
      "id": "home",
      "route": "/",
      "type": "home",
      "intent": "Understand the business and choose the relevant service",
      "uniqueValue": "Verified offer and clear navigation to the complete service range",
      "primaryAction": "Reach the real enquiry destination",
      "contentSource": "PRODUCT.md and approved page brief",
      "proofSources": [],
      "indexable": true,
      "canonical": "https://example.com/",
      "links": ["/services"],
      "buildStatus": "planned"
    }
  ]
}
```

This excerpt illustrates a page; it is not a complete passing map because its service link must also have a record. Replace the example origin. Declare all route records before running the checker.

Required fields for each record: nonempty `id`, `route`, `intent`, `uniqueValue`, `primaryAction`, `contentSource`; `proofSources` array; Boolean `indexable`; absolute `canonical`; internal `links` array; `buildStatus`. Supported types: `home`, `service-hub`, `service`, `location`, `case-study`, `guide`, `about`, `contact`, `legal`. Supported statuses: `planned`, `built`, `verified`.

Keep exactly one root `home` record at `/`, which can be a language selector. Additional `home` records such as `/de/` and `/en/` require an explicit valid `locale`, for example `de-CH` or `en`. The locale need not equal the URL segment. Include their real crawlable links from the root and onward into their own pages. This model checks declared locale syntax and reachability; it does not validate translation, HTML language, reciprocal hreflang or server redirects. Inspect those separately. A redirect-only root requires a documented project-schema adaptation reflecting the actual HTTP entrypoint.

For release, add `evidence` with non-placeholder `desktop`, `mobile`, `html`, `functional` references. These can reference local artifacts or stable evidence URLs. Inspect their contents separately; the validator checks strings and consistency, not their truth. `functional` may reference a shared test only when it genuinely covers that route's controls/destinations. A page with no interactive controls still needs navigation/direct-loading verification.

Desktop/mobile evidence should resolve to current reviewed records in the shared screenshot manifest, as specified in [screenshots.md](screenshots.md). Open both the record and its actual images; a valid manifest reference is not a visual pass.

The declared link graph omits self-links such as a homepage logo pointing at its own page; this is a modelling convention, not a ban on self-links in the live UI.

For the full-site workflow retain the agreed map as `SEO-PAGE-MAP.approved.json` before implementation, then run release with `--scope-map SEO-PAGE-MAP.approved.json`. This compares route sets, IDs, intended indexing and canonicals, so deleting unfinished pages from the working map does not pass against the original scope. Update that snapshot only for an explicit scope decision, not to silence missing work. It is a comparison baseline, not an immutable security boundary. A deliberately single-page task remains valid when that is the agreed scope.

The checker rejects duplicate identities/routes/canonicals, wrong-origin or non-self indexable canonicals, invalid local paths, broken declared link targets and indexable pages unreachable from `/`. Release requires verified pages and evidence, and a service hub linked to a real service-detail record. This deliberately targets omission risks, not aesthetic scores. A distinct indexable launch route must use its own canonical URL, including the explicit slash/file policy. Intentional duplicate/cross-domain canonical syndication is outside this local-business launch schema; handle a genuinely authorised exception explicitly instead of misusing `indexable:false` to silence the checker.

## Technical implementation and verification

For every route inspect both complete response HTML and hydrated/rendered DOM: meaningful page content, true headings and landmarks, title/description, canonical, intended indexing, crawlable `<a href>` navigation, loaded assets and correct direct URL behaviour. Google's ability to render JavaScript is not a reason to ship blank initial shells when prerendering is supported. [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Give route metadata one coherent owner across shared layout and page overrides. Check actual rendered titles/descriptions, canonical, robots and Open Graph URL for conflicts or duplicates; social previews need truthful text plus absolute, stable, retrievable image URLs and correct dimensions. The public image must work without an authenticated editor session. Keep per-page locale/pagination decisions consistent with the page map. Noindex is not access control, and a valid social card is not SEO performance evidence (UI Skills `ibelick/fixing-metadata`).

Validate sitemap URLs against intended indexable canonical routes and successful responses. Check robots and meta/X-Robots together: blocking crawling is not the same as a reliable noindex instruction. Preview restrictions must not accidentally remain on production. Inspect final hosting response statuses, redirects, unknown routes, trailing-slash policy and canonical origins.

For multilingual sites, plan distinct locale URLs, accurate language signals and reciprocal hreflang where applicable; check canonical/locale consistency without treating translation alone as local relevance. Handle pagination, filters and duplicate URL variants according to the real content and host.

Choose structured data from actual entities/content and currently supported documentation. QAPage describes a single question with user-submitted answers; it is not a replacement type for an ordinary editorial FAQ. Do not promise review stars from a business's own LocalBusiness/Organization ratings or embedded third-party review widget. [QAPage](https://developers.google.com/search/docs/appearance/structured-data/qapage), [Review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet). Never invent ratings, reviews, credentials, locations or outcomes. Do not promise rich results from markup. As verified 2026-09-06, Google's updates announce FAQ rich-result retirement on 2026-05-07; recheck eligibility when working on a later project. Useful FAQ content remains useful without a rich-result claim. [Google Search updates](https://developers.google.com/search/updates).

AI search receives clear, source-supported content and ordinary technical accessibility. Do not require arbitrary answer-block lengths or treat llms.txt as a ranking requirement. If crawler controls are relevant, distinguish search, training and user-triggered access using current provider documentation; do not unblock training as a supposed search prerequisite. [Google AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [OpenAI crawlers](https://developers.openai.com/api/docs/bots).

## Release evidence

Every accepted page: built route, complete useful content, independent desktop/mobile screenshots, HTML/status/metadata record, incoming crawl path and functioning local controls. Verify actual rendered links against the declared graph. Preserve old-URL redirect checks for redesigns. The content reviewer verifies proof sources and page differentiation, not just the number of words.

Report frontend implementation separately from observed search performance. A fresh public URL can be reachable without yet indexed or ranked. Do not guarantee top rankings, perfect SEO or conversion uplift from technical tests.
