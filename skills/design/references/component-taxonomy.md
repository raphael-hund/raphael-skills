# Component Taxonomy — The Complete UI Map

> **Load when:** scoping what to build (which page types, sections, elements, flows) or auditing a design for completeness — before styling starts.
> **Skip when:** the page structure is fixed and only implementation/styling details remain (then load the topical file: `layout-and-sections.md`, `buttons.md`, etc.).
> **Canonical for:** the 7-axis UI inventory, component discipline values §9.

> Load this file to know **what exists**: every page type, section, element, flow, pattern,
> and style a design can draw from. Use it to scope a build ("which page types does this
> site need?"), to audit completeness ("does this checkout have an empty state?"), and to
> pick components deliberately instead of defaulting to hero + 3-cards + footer.
>
> Distilled and deduplicated from **Refero** (45 Page Types, 44 Flows, 87 UX Patterns,
> 69 UI Elements, 40+ industries) and **Mobbin** (82 Elements, 72 Flows, 153 Sections,
> 99 Styles, 319 Categories). For deep visual research on any entry: browse
> **refero.design** and **mobbin.com** on demand.

## TOC

1. [The 7-Axis Model](#1-the-7-axis-model)
2. [Axis 1 — Page Types](#2-axis-1--page-types)
3. [Axis 2 — Sections](#3-axis-2--sections)
4. [Axis 3 — UI Elements](#4-axis-3--ui-elements)
5. [Axis 4 — Flows](#5-axis-4--flows)
6. [Axis 5 — UX Patterns](#6-axis-5--ux-patterns)
7. [Axis 6 — Styles & Aesthetics](#7-axis-6--styles--aesthetics)
8. [Axis 7 — Industries](#8-axis-7--industries)
9. [Component Recipe Index — The Essential 29](#9-component-recipe-index)
10. [Research Pointers](#10-research-pointers)

---

## 1. The 7-Axis Model

Describe any UI job as a coordinate across 7 axes:

| Axis | Question it answers | Example |
|---|---|---|
| **Page Types** | What page is this? | Pricing page, checkout, 404 |
| **Sections** | What blocks compose the page? | Hero, logo wall, FAQ accordion |
| **UI Elements** | What widgets fill the sections? | Button, modal, table, toast |
| **Flows** | What multi-step tasks must work? | Signup, checkout, password reset |
| **UX Patterns** | What state/behavior does it need? | Empty state, loading, confirmation |
| **Styles** | What aesthetic language? | Editorial, brutalist, glassmorphism |
| **Industries** | What domain conventions apply? | Fintech, health, real estate |

**Usage rule:** before designing, name the coordinate. "A dark editorial (Style) SaaS
(Industry) pricing page (Page Type) with comparison table + FAQ (Sections), segmented
toggle (Elements), subscribing flow (Flow), trial-and-freemium pattern (UX Pattern)."
Every unnamed axis is a decision made by accident.

---

## 2. Axis 1 — Page Types

Complete deduplicated list, grouped by job (merged from Refero Page Types + Mobbin Screens + site categories):

| Group | Page types |
|---|---|
| **Marketing** | Home, Product/Landing, Pricing, Features/Solution, Blog, Blog Post, Case Study, Changelog/Newsroom & Updates, Media Kit/Press, About, Careers, Contact |
| **Auth & Onboarding** | Log In, Sign Up, Reset/Forgot Password, Verification, Welcome Screen, Launch/Splash, Walkthrough, Guided Tour, Account Setup, Onboarding Forms |
| **Commerce** | Catalog/Shop, Product Details, Cart & Bags, Checkout, Order Confirmation, Order History/Detail, Paywall & Subscription, Wallet & Balance, Payment Method |
| **App Core** | Dashboard, Discover/Browse, Social Feed, Stories, Search Results, Task Management, Content Management, Whiteboard, Quiz & Poll, Notifications |
| **Account & Utility** | Profile & Account, Settings/Preferences, Widget, Cancel Subscription, Delete Account, Notification Settings, Downloads/Offline |
| **Support** | Help & Support Center, FAQ Page, Chat/Chatbot |
| **Legal & Trust** | Privacy Policy, Terms & Conditions, Responsibility/Compliance, Security/Trust Center |
| **Error & Edge** | 404, Error Page, Maintenance/Coming Soon, Permission Request, Offline |

---

## 3. Axis 2 — Sections

Page-section building blocks (deduplicated from Mobbin's 153 Site Sections + observed site skeletons). A landing page is a sequence of 6–10 of these:

| Group | Sections |
|---|---|
| **Frame** | Announcement Bar, Navigation Header, Mega Menu, Footer, Mega-Wordmark Footer, Cookie Banner, Anchor Navigation, Sticky CTA Bar |
| **Opening** | Hero (product-first / editorial / video / functional-form), Logo Wall / Press Strip ("as seen in"), Stats/Metrics Band |
| **Pitch** | Feature Grid / Bento, How-It-Works (3 steps), Comparison Table, Before/After, Product Showcase / Screenshot Stage, Exploded-UI Composition, Integration Grid / App-Icon Wall, Video Section, Manifesto / Mission Statement |
| **Proof** | Testimonials (card grid / quote wall / carousel), Reviews & Ratings, Case Study Cards, Awards & Badges, Team/Mentor Grid, Customer Map/Counter |
| **Conversion** | Pricing Table (with billing toggle), CTA Banner/Section, Lead-Capture Form, Newsletter/Email Capture, Booking/Quote Calculator (multi-step funnel), App Download (QR + device mockup), Promo/Countdown Bar |
| **Content** | Blog Card Grid, Events List, Media Gallery, Carousel/Slider, Map & Store Locator, Career Listings, FAQ Accordion, Table of Contents (long-form) |
| **Utility** | Contact Form, Chat Widget, Search Bar Section, Filter/Category Chips, Back-to-Top, Language/Locale Selector |

**Canonical marketing skeleton:** `layout-and-sections.md` §3 (observed across 21 analyzed sites) — Hero → Social proof (reviews/stats/press, immediately after hero) → How-it-works/Value props (3) → Feature detail → Pricing → CTA/App-download → Footer. Deviate deliberately, not by default.

---

## 4. Axis 3 — UI Elements

Complete widget inventory (merged Refero 69 + Mobbin 82 + Glossary 59), grouped:

| Group | Elements |
|---|---|
| **Bars** | Top Navigation Bar, Sidebar/Side Navigation, Drawer, Tab Bar, Toolbar, Footer |
| **Actions** | Button (primary/secondary/ghost/outline/link/icon), Floating Action Button, Dropdown Button, Split Button, Share Button, Sign-in Button, Refresh Button |
| **Inputs** | Text Field, Text Area, Search Bar, Dropdown/Select, Combobox, Multi-Select, Checkbox, Radio Button, Switch/Toggle, Slider, Date Picker, Time Picker, Color Picker, File Upload, Rating Control, Stepper, Editable Text |
| **Navigation** | Tabs, Segmented Control, Pagination, Page Control, Breadcrumbs, Navigation Menu, Anchor/Table of Contents, Link |
| **Containers** | Card, Tile, Accordion/Collapse, Carousel, List, Stacked List, Grid List, Table, Tree View, Gallery/Media Gallery, Map, Code Snippet |
| **Overlays** | Modal/Dialog, Drawer/Side Sheet, Bottom Sheet (+ expanded), Action Sheet, Popover, Dropdown Menu, Context Menu, Edit Menu, Tooltip, Toast/Pop-up Notification, Full-Screen Overlay, Mega Menu, Alert, Coach Marks, Command Palette |
| **Feedback & Status** | Badge, Chip/Tag, Status Dot, Notification Dot/Bell, Progress Bar/Indicator, Step Indicator, Loading Indicator/Spinner, Skeleton, Empty State, Error Message, Banner |
| **Data Display** | Line/Bar Chart, Pie/Donut Chart, Trend Chart, Stat/Metric Card, Avatar (+ stack), Currency, Map Pin, QR Code, Keyboard Key |
| **Graphics** | Icon, Illustration, 3D Illustration, Photo, Hero Image, Product Image, Logo Wall, Sticker, Thumbnail, Gradient, Animation |

---

## 5. Axis 4 — Flows

Multi-step user journeys (merged Refero 44 + Mobbin 72). Design flows as sequences, not screens:

| Group | Flows |
|---|---|
| **First-time** | Onboarding/Signing Up, Browsing Tutorial, Exploring, Verifying |
| **Auth & Account** | Logging In/Out, Resetting Password, Creating Account, Switching Account, Deleting/Deactivating Account, Connecting & Linking, Editing Profile, Setting Up |
| **Commerce** | Adding to Cart, Checking Out, Purchasing/Ordering, Booking/Reserving, Subscribing/Upgrading, Canceling Subscription/Order/Refunding, Transferring Money/Donating, Redeeming, Gifting, Paying/Payment Method |
| **Content CRUD** | Adding & Creating, Editing/Updating, Deleting/Removing, Archiving, Reordering, Moving, Copying/Duplicating, Marking, Saving to Collection, Bookmarking/Favoriting/Pinning, Publishing/Listing, Uploading/Downloading, Importing/Exporting |
| **Discovery** | Searching/Finding, Filtering & Sorting, Selecting/Choosing, Switching View, Browsing/Discovering |
| **Media** | Recording Audio/Video, Taking Photos/Scanning, Media Editing, Drawing/Annotating, Listening to Audio, Watching Video |
| **Social** | Inviting/Referring People, Joining/Accepting, Leaving, Chatting & Messaging, Commenting/Replying, Sharing, Liking/Upvoting, Following/Subscribing, Reviewing/Rating, Giving Feedback, Flagging/Reporting, Banning/Blocking, Muting |
| **System** | Enabling/Disabling, Turning On/Off, Showing/Hiding, Permissions, Notifications Management, Switching to Dark Mode, Scheduling, Logging/Tracking, Starting & Completing, Requesting |

---

## 6. Axis 5 — UX Patterns

States and behaviors every flow needs (Refero 87, grouped). Audit: does each flow have its failure/empty/loading states designed?

| Group | Patterns |
|---|---|
| **Page States** | Empty State, Loading & Connecting, Error, Success, Confirmation, Permission, Add & Create, Edit, Delete, Select, Searching, Filter & Sorting, Upload & Download |
| **Onboarding** | Quickstart Guide, Walkthrough, Coach Marks, Progress Setup |
| **Marketing** | Product Features, Bento Grid, Ads & Promo Offer, Promo Code, Email Subscription |
| **Commerce & Finance** | Billing & Plans, Trial & Freemium, Payment Method, Money Transfer, Shopping |
| **Content** | Activity & Notification Feed, News Feed, Article & Text, Stats, Checklist & To Do, Kanban Board, Files, Event, Playlist, Audio Player, Video Player, Mini Player, Templates, Tutorial & Education, Suggestion & Similar Items, Wish List & Bookmark, Trash & Archive, Quiz/Mini Game, Size Guide, Augmented Reality, Shortcuts |
| **Utility** | AI Assistant, Chatbot, Calendar, Date & Time, Timeline & History, Timer & Clock, Location & Address, Map, Camera & Scanner, Audio & Video Recorder, Calling, Browser, Text Editing, Design Editing, Media Editing, Task |
| **Social** | Reviews & Rating, Comments, Chat & Messages, Like & Reactions, Share, Followers & Following, Members, Groups & Community, Leaderboard, Achievements & Awards, Social Post, Add & Invite People, Flag & Report, Ban & Block |
| **System & Misc** | Dark Mode, Drag & Drop, Pull to Action/Refresh, Swipe Actions, User Menu, Save, FAQ, Feedback & Survey, Press, Booking, Food & Recipe, Draw |

---

## 7. Axis 6 — Styles & Aesthetics

Visual languages (Mobbin's 99 Site Styles, compressed to families). Pick ONE primary + max one accent style:

| Family | Members |
|---|---|
| **Color fields** | Dark, Black, Light/Clean, Black-and-White, Monochrome, Colorful, Pastel, single-hue sites (blue/green/pink…) |
| **Gradient languages** | Aura Gradient, Dark Gradient, Duotone, Gradient-pink/color variants, Mesh |
| **Depth & Material** | Glassmorphism/Frosted, 3D, Isometric, Neumorphism (avoid), Claymorphism (avoid), Flat |
| **Texture & Retro** | Pixel/Retro-8-bit, Halftone/Dither, Grain/Noise, Paper/Print, Brutalism |
| **Editorial** | Editorial/Magazine, Swiss/Grid, Kinetic Typography, Bold Type, Serif-luxe, Japanese/Minimal |
| **Motion-first** | Animated, Interactive, Scroll-driven, Video-hero, Parallax |
| **Shape systems** | Geometric Shapes, Organic/Blob, Bento Grid, Grid Layout, Arch/Mask systems |
| **Theme** | Dark Mode, Futuristic/Cyberpunk, Fun/Playful, Illustrated |

---

## 8. Axis 7 — Industries

Domain conventions (merged Refero Sites + Mobbin App Categories, 40+ → families):

| Family | Industries |
|---|---|
| **Tech** | SaaS, AI Tools, Developer Tools, Productivity, Project Management, Collaboration, Communication, Design & Media Tools |
| **Money** | Finance/Fintech, Banking, Crypto/Web3, Insurance, Accounting/Paperwork, Fundraising |
| **Commerce** | E-commerce, Marketplace, Food Delivery, Shopping/DTC, Real Estate/Proptech |
| **Health** | Health & Wellness, Fitness/Sports, Medical/Healthcare, Meditation |
| **Life** | Food & Drink, Travel & Booking, Transport/Mobility, Home & Decor, Lifestyle, Kids, Dating, Pets |
| **Media** | Entertainment, Music/Audio, Video Streaming, News, Magazines, Books, Photo, Games |
| **Society** | Education, Jobs & Recruitment, Legal/Law, Government/Nonprofit, Weather, Reference, Maps & Navigation, Scheduling Tools |

---

## 9. Component Recipe Index

The 29 highest-leverage components. Each entry: **core discipline · variants · what makes it expensive**.
This index is canonical for component-level disciplines and values; placement, page frequency,
and caps are canonical in `layout-and-sections.md` §3+§5.
For effect parameters see `figma-effects-cookbook.md`; for button engineering see `buttons.md`;
for imagery inside components see `image-asset-strategy.md`; for motion see `motion-and-animation.md`.

**Navbar** — One line, ≤ 80 px tall, one persistent CTA. · Variants: floating capsule/pill (current trend), sticky solid, transparent-over-hero → solid on scroll, split islands (links left, CTA right). · Expensive: glass blur 20–24 px + 1 px border + inner top highlight; smooth background transition on scroll.

**Hero** — Headline ≤ 2 lines, subline ≤ 20 words, max one primary CTA, fits the first viewport. · Variants: product-first (dashboard mockup emerges from glow), editorial (photo/arch masks), functional (booking/zip form embedded), video, mini-minimalist. · Expensive: one hero asset with consistent light + grade; avoid the default left-text/right-image unless genuinely strongest.

**Feature Grid / Bento** — N features → exactly N cells, no empty filler cells; vary span and media per cell. · Variants: symmetric 3-up (boring — avoid), bento with 2–3 visually rich cells, zig-zag splits (consecutive cap: `layout-and-sections.md` §5), masonry. · Expensive: real UI fragments or illustrations per cell, `grid-flow-dense`, icon discipline (one family, one stroke weight).

**Pricing Table** — 3 tiers max; the recommended tier is elevated + ribbon-labeled; CTA hierarchy inverts on the recommended card. · Variants: card row with billing toggle, comparison matrix (feature × tier with checks), inverted dark-on-dark recommended card. · Expensive: typographic price parity ("Custom" same size as "$99"), segmented Monthly/Annual toggle, full-width CTAs matching card padding.

**Testimonial** — Real names, roles, photos, or company logos; quote ≤ 3 lines. Never fabricate. · Variants: 3-card checkerboard (photo/navy/cream), quote wall, carousel with metric micro-tables, press-quote cards linking out. · Expensive: portrait photography in mask frames; mono-caps "lab report" voice as signature.

**CTA Section** — One message, one action, no competing links; often the page's darkest/boldest surface. · Variants: banner over photo with scrim, solid accent block, footer-adjacent mega CTA, calculator entry. · Expensive: full-bleed imagery or 3D finale; countdown/urgency only when real.

**Footer** — 4-column grid (brand blurb + 2–3 link columns + newsletter), legal row, social icons in quiet circles. · Variants: standard columns, rounded-top dark block, link lists with "/" separators (brutalist). · Expensive: baseline-aligned column headers, newsletter input with inner shadow, locale selectors.

**Mega-Wordmark Footer** — Giant cropped wordmark (bleeding off bottom edge) above/below the link grid. · Variants: cropped mid-x-height, with ornament disc, outline-only type. · Expensive: optical alignment (ignore punctuation), bleed = confidence; ~40 % of footer height.

**Card** — Nested-radius math: inner radius ≈ outer − padding; separation by fill steps first, shadow second, border last. · Variants: flat (fill contrast), elevated (2-layer shadow stack), outlined (1 px hairline), image-top + body, glass (dark contexts only). · Expensive: colored shadows matching fill, consistent internal padding (24–32 px), whole-card hover lift.

**Modal / Dialog** — One decision per modal; backdrop `rgba(0,0,0,0.5)` + blur; radius 16–24 px; escape + scrim-click to close. · Variants: centered dialog, promo modal with media, confirmation (destructive = red primary). · Expensive: entrance spring (scale 0.95 → 1, fade), focus trap, scroll lock.

**Toast** — Bottom-corner stack, auto-dismiss 4–6 s, icon + one line + optional action. · Variants: success/error/info with status color chips, social-proof live toast ("…just withdrew $6,180"), undo action toast. · Expensive: slide-up + fade spring, stacking queue, pause-on-hover.

**Form / Input** — Labels above fields, 44–52 px field height, radius 8–12 px, focus ring in accent, error text below field. · Variants: single-column, inline email+submit pill (hero capture), multi-field lead forms, floating-label. · Expensive: inner shadow on dark inputs, inline validation states, disabled/loading states designed.

**Dashboard Sidebar** — 240–260 px, grouped items, active state = tinted pill behind item (accent @ 15–20 %), icons + labels. · Variants: collapsible rail (~90 px icons only), with section headers, with user card at bottom. · Expensive: consistent 8 px item pitch, mono-caps group labels, active-state color discipline.

**Stat Card** — One number (36–56 px, tabular nums) + label (12–13 px muted) + optional delta chip. · Variants: glass over imagery, flat with hairline, with sparkline, icon-led. · Expensive: tabular figures, delta semantics (green = good), colored shadow on accent variants.

**Marquee / Logo Cloud** — Grayscale logos at 60–70 % opacity, 48–64 px gaps, ~120 px tall band, "Trusted by…" caption optional. · Variants: static strip, infinite scroll marquee, black band with white logos. · Expensive: uniform optical sizing (normalize heights, not widths), fade edges on scrollers; never fake logos.

**Accordion / FAQ** — One open item at a time (usually), chevron rotates 180°, answer ≤ 4 lines. · Variants: hairline-separated rows, card-based, two-tone headline above ("Wir haben die Antworten."), numbered. · Expensive: height animation with measured auto-height, plus/minus icon morph, schema markup for SEO.

**Tabs** — Active tab = fill or underline, inactive = muted text; content swaps without layout shift. · Variants: underline tabs, pill tabs, card tabs for product catalogs, vertical tabs in settings. · Expensive: sliding indicator animation (transform, not width), keyboard arrow navigation.

**Table** — Sticky header, row hover fill, right-align numerals, tabular nums, 48–56 px row height. · Variants: hairline rows, striped (subtle), dense (dashboards), with row actions on hover. · Expensive: column sorting affordances, empty/loading states, responsive collapse to cards.

**Badge / Pill** — Status semantics only: fill = accent @ 10 % + text = accent full; radius 999 px; 11–12 px medium label. · Variants: dot + label, icon + label (section-marker chips), outline pill, squircle chip (8 px radius — more engineered). · Expensive: "New/Recommended" placement overlapping card edges; consistent uppercase tracking +8 %.

**Avatar Stack** — 28–40 px circles, 2 px background-colored stroke, overlap ~10 px, max 4 + "+N" counter. · Variants: with star rating (trust micro-element), in nav as social proof, in cards as collaborators. · Expensive: real photos only, consistent crop (face-centered), subtle drop shadow.

**Search Input** — 40–48 px tall, icon left, ⌘K hint right (products), radius 10–999 px per dialect. · Variants: nav-embedded, hero-sized (command-bar feel), filter-bar with chips. · Expensive: focus expansion, recent-searches dropdown, debounced results with skeletons.

**Dropdown / Select** — Chevrons signal it; menu radius 10–12 px, item height 36–40 px, check on selected. · Variants: native-feel select, combobox with typeahead, multi-select with chips, mega dropdown in navs. · Expensive: typeahead filtering, flip-on-overflow positioning, keyboard-first navigation.

**Tooltip** — Dark pill (or inverse of surface), 8 px radius, 10–12 px label, 6 px tail, 150 ms delay. · Variants: label-only, rich (keycap hint "Tab", chart values), chart crosshair tooltip. · Expensive: collision-aware placement, spring entrance, never tooltips on touch-critical info.

**Breadcrumb** — ≤ 4 levels, chevron or "/" separators, current page plain text (not link). · Variants: hairline-separated, with icons, collapsed middle ("…"). · Expensive: schema.org markup; usually invisible — only add where hierarchy is real.

**Pagination** — Prev/Next + ≤ 7 page slots with ellipsis; active page = filled or underlined. · Variants: numbered, infinite scroll with scroll-triggered fade, "Load more" button, cursor-based (API products). · Expensive: URL-synced state, prefetch on hover; prefer infinite scroll for feeds, numbers for tables.

**Empty State** — Illustration or icon + one-line explanation + one primary action. Never a blank area or bare "No data". · Variants: first-run (onboarding CTA), zero-results (clear filters action), error (retry). · Expensive: custom illustration in brand style, copy that teaches what will appear here.

**Skeleton** — Match the real layout's shape exactly; shimmer sweep 1.2–1.5 s; background = surface, bones = surface +4–8 % lightness. · Variants: text-line bones, card bones, chart placeholder. · Expensive: pulse respects `prefers-reduced-motion`; never spinners for content areas — skeletons only.

**Calendar Widget** — Week strip or month grid; selected day = accent pill with colored shadow; events as sub-cards. · Variants: 7-day strip (mobile), month grid, agenda list, date-picker popover. · Expensive: nested-radius math, accent reserved for state + action only, avatar stacks on events.

**Multi-Step Funnel** — Numbered steps (active = filled, inactive = muted), one decision per screen, progress always visible, back always possible. · Variants: step pills, progress hairline, option cards (image/icon + label), embedded calculator (conversion king on local-service sites). · Expensive: per-step validation, animated step transitions, summary screen before submit, time-promise microcopy ("2 Min").

---

## 10. Research Pointers

- **refero.design** — real product screens by Page Type / Flow / UX Pattern / UI Element; use when you need 20 real examples of e.g. "paywalls with plan selection" or "dashboards with charts".
- **mobbin.com** — 600k+ screens; browse by Elements / Flows / Screens, and for websites by Categories × Sections × Styles (+ Colors); use for section-level and style-level reference.
- Workflow: name the 7-axis coordinate → pull 5–10 references → extract patterns (see `screenshot-autopsy.md`) → design your variant. Never copy a single reference 1:1.
