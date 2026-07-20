# Google RSA Output Spec (mandatory when generating Google Search RSAs)

> Vendored near-verbatim from coreyhaines31/marketingskills,
> `skills/ads/references/rsa-output-spec.md` (MIT license) — kept in English
> as a hard, literal checklist. Applies whenever a client's Loop-3 work
> includes Google Search ads, not only Meta.

When the user requests Google Ads RSAs (Responsive Search Ads), output MUST
comply with these platform limits and structural requirements. Do not output
any RSA that violates them.

## Hard limits per RSA (enforce before responding)

- **Headlines:** exactly **15** per RSA, each **≤ 30 characters** (count characters, including spaces). Render as `1. ... (NN chars)` so the reader can verify.
- **Descriptions:** exactly **4** per RSA, each **≤ 90 characters**.
- **Paths:** up to 2 path fields, each **≤ 15 characters**.
- **Final URL:** present, https.
- **Pinning:** state any pinned positions explicitly. Default = unpinned unless the client asks.
- **Per-account guardrail:** Google enforces **3 RSAs max per ad group**. If asked for more, group them by ad group.

## Required sidecar artifacts (always include with the RSA request)

1. **Ad group structure** — list each ad group with its theme, target keywords (match types), and which RSAs map to it.
2. **Negative keyword list** — minimum **8** entries, group-level vs. campaign-level called out.
3. **Sitelinks** (≥ 4), **Callouts** (≥ 4, ≤ 25 chars), **Structured snippets** if relevant.

## Output ORDER (mandatory — emit in this order so nothing is dropped if the output runs long)

1. Ad group structure (short)
2. Negative keywords (≥8, emit before the RSAs)
3. Sitelinks (≥4)
4. Callouts (≥4)
5. RSA1, RSA2, RSA3 (largest section, last)

## Output template (mandatory shape)

```
Ad group structure:
- AG1 [theme]: keywords (match types) → RSA1, RSA2

Negative keywords:
  Campaign-level: <kw>, <kw> (≥4)
  Ad-group level: AG1: <kw>, <kw> (≥4 more — TOTAL ≥8)

Sitelinks (≥4): <title (≤25)> | <desc1 (≤35)> | <desc2 (≤35)> | URL

Callouts (≥4, each ≤25 chars): <callout>

RSA1 — [ad group name]
  Final URL: https://...
  Path1: ...   Path2: ...
  Headlines (15, each ≤30 chars): 1. <headline> (NN chars) ... 15. ...
  Descriptions (4, each ≤90 chars): 1. <description> (NN chars) ... 4. ...
  Pinning: H1=none; H2=none; ... (or explicit pins)
```

## Self-check before responding

- [ ] Each RSA has exactly 15 headlines, exactly 4 descriptions.
- [ ] Every headline ≤30 chars, every description ≤90 chars — character counts printed.
- [ ] Negative keyword list labelled and ≥8 entries.
- [ ] Ad group structure labelled.

If any check fails, rewrite before responding. Do not ship partial RSAs — this
is the same discipline as claims-qa: an incomplete RSA set is a blocked output,
not a "good enough for now" output.
