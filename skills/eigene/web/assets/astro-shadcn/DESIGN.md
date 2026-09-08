# HTML first, one React island

Bounded technical proof for the parent integration task. Direct build authorized;
no customer branding, images, generated concepts, deployment or React dev tools.

References: [official Radix Dialog example](https://ui.shadcn.com/docs/components/radix/dialog)
and [Card example](https://ui.shadcn.com/docs/components/card). Preserve their real
composition, title/description, border, spacing and accessible dismiss behavior.
The user’s existing warm-neutral technical-probe direction owns the page style;
the nearby scrollcraft probe contributes system fonts, constrained reading width,
plain navigation and visible focus, not its dark/accent palette.

| Decision | Contract |
| --- | --- |
| Canvas / ink | Warm paper #f6f4ef; surface #fffcf7; ink #292824; muted #625f57 |
| Border / focus | Border #d9d4c9; focus and action #315b4b; action text #fff |
| Typography | System sans 16px/1.6; H1 32–52px; H2 24px; UI 14/18px; mono labels 12px |
| Layout | 1000px max width; 24px desktop / 20px mobile gutters; one column below 720px |
| Spacing / radius | 4px unit; sections 32–48px; card 24px; radius 8/12px |
| Components | Native header/nav/main/section/footer; upstream SSR Card; one hydrated Dialog |
| Interaction | Pending disabled trigger until hydration; always-native details link; labelled dialog; Escape and close restore focus; focus trap |
| Motion | Upstream 200ms opacity/scale; no motion under reduced-motion preference |
| Accessibility | Visible outlines; native form labels; 44px custom trigger/close targets; readable mobile layout |

CSS contract: page CSS remains authored CSS. Tailwind 4 uses an explicit source
allowlist and omits global Preflight. Native CSS @scope bounds utility selectors
to `.shadcn-scope` containers, including one stable #shadcn-portals div owned
by the Astro document, outside the island. DialogPortal targets this container.
The overlay and dialog content must be descendants of that container: using the
portal elements themselves as scope roots left their utility classes unapplied
in Chromium 151 (observed position:static, overlay height:0). The upstream source
is preserved in vendor/shadcn; the local DialogPortal adaptation is recorded as a diff.
An attempted wrapper inside Portal was rejected because it caused immediate
unmount before child exit animations. The final stable external container keeps
animated children directly under Portal and needs no effect cleanup: normal
document navigation owns its lifetime; Radix unmounts its children after exit.
Global theme variables, @property registrations and animation keyframes remain
shared: this is not Shadow DOM or complete style isolation. A small scoped reset
supplies the border/box-sizing/font assumptions needed by upstream components.
Shared semantic variables live on :root so body portals inherit them. A theme on
an island ancestor alone would not reach a portal; multiple simultaneous local
themes need a portal container or explicit portal token scope. @scope requires a
modern browser; this proof tests Chromium 151 and does not claim legacy support.
Native page selectors can still style island descendants: the unlayered page h2
rule wins over layered component typography. This is intentional here, and is
another reason not to call this complete style isolation.

Success evidence: raw built HTML contains native content and Card with exactly
one hydrated island; static service route serves 200 and requests no JavaScript;
dialog opens/dismisses with focus restore; JavaScript-off and failed-download
paths retain content/navigation; desktop/mobile screenshots; native heading/form
computed-style baseline unchanged by component CSS; exact raw/gzip asset sizes.
