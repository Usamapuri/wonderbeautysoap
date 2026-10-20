# Wonder Beauty Soap — Website Build Brief (Agent-Ready)

**Client:** Wonder Beauty Soap ("Wonder Beauty Bar") · Royal Basket Group
**Developer:** Abdullah
**Status of this document:** Complete, self-contained build brief. A coding agent can implement the site from this file alone — every URL, email, product name and page spec needed is inside it (see also Appendix A: Master Data).

---

## 0. How to use this brief

**You are building a portfolio website for the soap brand Wonder Beauty Soap.** Read this whole document before writing code.

Ground rules:
1. **Design reference is law.** A starter site exists at https://wonder-beauty-soaps--zainabshahid062.replit.app/ — reproduce its overall layout, look and feel closely. Do not redesign, do not introduce a new visual identity.
2. **Portfolio only.** No shop, cart, checkout, prices, accounts or payments anywhere on the site.
3. **Never invent facts.** Do not invent prices, discounts, retailers, awards, ingredients, statistics, team members or testimonials. Where content is not yet supplied, build the section with the structure in place and use a clearly marked placeholder from §10's list (e.g. `[CLIENT TO SUPPLY: team member 1 photo]`), and log it in the delivery notes.
4. **Claims discipline.** The only product claims allowed are the ones printed on the packaging: "Triple Action Formula — Glow | Hydrate | Protect" and "Dermatologist Recommended". Per-bar benefit wording must come from §4.3's table or the client — do not write new benefit claims.
5. **All contact/social values come from Appendix A.** Hard-code them from there, in one shared config/constants file so they are editable in one place.
6. **Email must not break.** The domain's email is hosted at Spaceship. The DNS change in §7 must preserve every existing MX/TXT mail record.
7. Ask the developer (Abdullah) about anything ambiguous rather than guessing.

---

## 1. Project snapshot

| Item | Detail |
|---|---|
| Brand | Wonder Beauty Soap / Wonder Beauty Bar, by Royal Basket Group |
| Site type | Portfolio / brand showcase — **no e-commerce, no checkout** |
| Domain | `www.royalbasketgroup.com` (apex: `royalbasketgroup.com`) |
| Registrar + DNS + email host | Spaceship |
| Contact email | `hello@royalbasketgroup.com` (hosted on Spaceship — must keep working after launch) |
| Instagram | https://www.instagram.com/wonderbeautysoap (@wonderbeautysoap) |
| TikTok | https://www.tiktok.com/@royal_basket_group (@royal_basket_group) |
| Facebook | https://www.facebook.com/share/1KZhQyQ8e8/?mibextid=wwXIfr |
| Design reference | Replit starter (React/Vite SPA): https://wonder-beauty-soaps--zainabshahid062.replit.app/ |
| Code repo | https://github.com/Usamapuri/wonderbeautysoap |
| Deployment target | Vercel, custom domain attached, Git-push auto-deploy |
| Brand hero line | "A little everyday wonder." |
| Pack taglines | "Triple Action Formula — Glow \| Hydrate \| Protect" · "Dermatologist Recommended" |

**Products (exactly 5):** Wonder Beauty Bar in **Coconut, Aloe Vera, Lemon, Lavender, Rose**.

**Assets already in hand**
- [ ] Logo file supplied by client (`high-resolution-color-logo (1).png`) — request an SVG/vector version too if one exists
- [ ] New packaging renders for all 5 bars on the taupe studio background (Lemon, Rose, Aloe Vera, Coconut, Lavender — supplied as images). These are the approved product images; use them as-is, do not re-render or AI-alter the packs.
- [ ] Replit starter site (live URL above + exportable project) — its copy, section order and asset naming (e.g. `/brand-assets/products/lineup.webp`) are the starting point. Note: files a non-technical user downloads from Replit's preview are usually *build output* (compiled JS/CSS) — get the **source** export per §9 before relying on it.
- [ ] Client's own London photos (currently on the starter's In the City page — to be replaced/augmented, see §6)
- [ ] Screenshot of Spaceship Multi-User Access instructions (client-supplied)

**Still missing at brief time** — see the client request checklist in §10.

---

## 2. Goals and scope

**Goals**
1. A polished portfolio site that presents the 5-bar range as a premium, giftable brand.
2. Drive enquiries: general questions, **bulk orders and trade/business enquiries** via the Contact page.
3. Grow an owned audience: email list sign-ups via a pop-up (updates, launches, offers).
4. Tell the brand story: founded 2019, rebrand journey, the people behind it.
5. Hand over a site the client can keep current — editing workflow defined in §8.

**In scope**
- 5 pages: Home, Our Story, The Collection, In the City, Contact (§4)
- Email sign-up pop-up (§5.1)
- Contact form with enquiry-type routing (§5.2)
- AI-generated vertical campaign visuals for In the City (§6)
- Vercel deployment + custom domain + SSL (§7)
- Basic SEO/social meta, favicon, footer with socials

**Out of scope (this phase)**
- Online shop, cart, checkout, payments, customer accounts
- Blog / news section (possible later phase)
- Multi-language versions
- Paid advertising landing pages

---

## 3. Design system to carry over from the Replit starter

Reproduce the starter's system — do not redesign. Extract the values from the starter's CSS/source and lock them into the codebase as design tokens (CSS variables or Tailwind theme config) before building pages.

**Palette**
- Base: cream / ivory (`#FAF6EF`-family — confirm exact hex from starter CSS)
- Warm taupe / bronze mid-tones (the studio background of the packaging renders, `#B49B7F`-family)
- Deep bronze-brown for text and footer (`#3E2F23`-family)
- Accent: antique gold for rules, buttons, hover states
- Per-product botanical accent colours taken from the pack illustrations (lemon yellow, rose red/pink, aloe green, coconut brown, lavender purple) — used sparingly on product cards only

**Typography**
- Display: elegant high-contrast serif (the starter's display face — identify from its CSS; if it is a webfont, self-host it or use the Google Fonts equivalent, e.g. Cormorant Garamond / Playfair Display — whichever matches the starter)
- Body: clean, warm sans or light serif exactly as per starter — match, don't substitute silently
- Letter-spaced uppercase for eyebrows/labels (e.g. "— FOUR IMAGINED SCENES"), as in the starter

**Mood** — "A little everyday wonder." Premium but warm; everyday luxury; botanical, calm, unhurried. No loud colours, no discount-store energy, no clip-art.

**Imagery rules**
- Product always on the cream/taupe studio look — consistent lighting and background across all 5 bars
- Botanical illustration per variety is the brand's visual signature — one botanical per product, everywhere that product appears
- Lifestyle/campaign imagery: vertical formats for In the City (§6); warm grade to sit with the palette (no cold/blue casts)
- All web images delivered as WebP, sized for their slot (hero ≤ ~200 KB, cards ≤ ~80 KB); keep originals in the repo under `/brand-assets/`, mirroring the starter's folder convention

**Layout carry-over**
- Same header (logo, nav, restrained), same section rhythm and generous whitespace, same footer structure with socials
- Reuse the starter's section order on Home (§4.1)
- Responsive: fully usable at 360 px wide; nav collapses to a simple menu on mobile; no horizontal scrolling anywhere

**Shared components to build once and reuse**
Header/nav · Footer · Button (primary gold outline/solid per starter) · Eyebrow label · Product card · Timeline item · Gallery grid · Email pop-up (§5.1) · Contact form (§5.2) · Section heading block.

**Acceptance criteria — design system**
- [ ] Tokens for palette + type exist in one config location; no stray one-off colours in page code
- [ ] Side-by-side with the starter at desktop and mobile widths, the new site's Home page is recognisably the same design (same order, spacing feel, type hierarchy)
- [ ] All images on the site are WebP (except logo/favicon) and lazy-loaded below the fold

---

## 4. Sitemap and per-page build specs

**Routes:** `/` (Home) · `/our-story` · `/collection` · `/in-the-city` · `/contact`

**Global elements on every page:** header nav (Home · Our Story · The Collection · In the City · Contact), footer (logo, `hello@royalbasketgroup.com`, social icons linking to the Appendix A URLs, small print), email pop-up (§5.1), favicon generated from the logo mark. Header nav highlights the active page. Footer social icons open in a new tab.

**Copy storage rule (applies to all pages):** put all page copy, product data and team data in structured content files (e.g. `src/content/products.ts`, `src/content/story.ts`, `src/content/team.ts`) — never buried inside components — so wording edits after launch are single-file changes (see §8).

### 4.1 Home (`/`)

Build these sections in this order:

| # | Section | Build spec |
|---|---|---|
| 1 | Hero | Full-width product lineup image (`/brand-assets/products/lineup.webp` from starter assets). Headline: "A little everyday wonder." Sub-line introducing the five botanical varieties. Two CTAs: *Explore the Collection* → `/collection`; *Our Story* → `/our-story` |
| 2 | Promise strip | Marquee or static strip: "Triple Action Formula — Glow · Hydrate · Protect" · "Dermatologist Recommended" |
| 3 | The Botanical Edit | Editorial section: one panel per botanical (Coconut, Aloe Vera, Lemon, Lavender, Rose) with its botanical illustration and 1–2 lines from the starter's copy |
| 4 | Campaign video | The starter's bath/bubbles video: autoplay, muted, loop, `playsInline`, with a poster frame; pause off-screen (IntersectionObserver) |
| 5 | The Collection preview | 5 product cards (new packaging render, name, one-line note, *View* → `/collection#<slug>` deep link) |
| 6 | In the City teaser | 2–3 vertical campaign visuals from §6 + link to `/in-the-city` |
| 7 | Brand intro | Short founder-story paragraph (sensitive-skin origin — full version in §4.2) + link to `/our-story` |
| 8 | Retail strip | Retail shots from the starter. Only name/show retailers the client has confirmed (§10) |
| 9 | Closing CTA | Full-width band: *Explore the Collection* + *For bulk orders, talk to us* → `/contact` |

**Acceptance criteria — Home**
- [ ] All 9 sections present, in order, visually matching the starter's rhythm at 1440 px and 390 px
- [ ] Hero headline is exactly "A little everyday wonder."; both hero CTAs navigate correctly
- [ ] Each of the 5 preview cards deep-links to the correct Collection anchor
- [ ] Video autoplays muted with poster, and does not block first paint (LCP image is the hero, preloaded)

### 4.2 Our Story (`/our-story`) — client change request #1

Build:
1. **Opening story block.** The founding story: brand started in **2019**; the founder's very sensitive skin and the search for a locally available bar for sensitive/dry skin that felt luxurious but stayed affordable. Use client-approved text (§10) — until supplied, structure the block with a marked placeholder; do not invent biographical details beyond the facts in this brief.
2. **Timeline** (vertical timeline component), one entry per milestone:
   1. 2019 — the first bar / why it started
   2. The early years — first packaging, first customers (facts from client, §10)
   3. Growth — the range expands to five varieties
   4. The rebrand — why the new identity and packaging happened
   5. Today — the new gold-and-white packaging, the range as it stands
3. **Then & Now packaging gallery.** For each variety with an old-packaging photo: old photo beside the new packaging render (side-by-side or before/after slider), captioned with the variety name. Show only varieties that actually have old photos — never fabricate an "old" pack.
4. **The rebrand section.** Short narrative: gold-and-white packaging, botanical illustrations — what changed (identity, packaging) and what stayed (the formula promise: Glow · Hydrate · Protect).
5. **Meet the Team.** Grid (data from `src/content/team.ts`): photo, name, role, one-line bio per member. Build for 3–6 members; layout must stay clean with 2 or with 6. All content client-supplied (§10); render the section only when at least one real member exists — no placeholder people on the live site.
6. **Closing CTA** → `/collection` and `/contact`.

**Acceptance criteria — Our Story**
- [ ] Timeline renders all 5 milestones in order with year labels where known
- [ ] Then & Now pairs use the genuine old photos and the current renders of the *same* variety
- [ ] Team grid is fully data-driven (adding a member = adding one content entry, no component edits)
- [ ] No invented facts anywhere on the page; every placeholder still open is listed in delivery notes

### 4.3 The Collection (`/collection`)

Build:
- Intro block: five varieties, one triple-action formula.
- **One product section/card per bar**, in this order: Coconut, Aloe Vera, Lemon, Lavender, Rose. Each contains:
  - New packaging render (consistent taupe studio background)
  - Botanical illustration accent for that variety
  - Product name: "Wonder Beauty Bar — <Variety>"
  - Scent/ingredient note and who it is for — from client-confirmed copy only (§10)
  - Shared promise line: "Triple Action Formula — Glow | Hydrate | Protect · Dermatologist Recommended"
  - *Enquire about this bar →* link to `/contact` with that product pre-selected in the form
  - Anchor ID: `#coconut`, `#aloe-vera`, `#lemon`, `#lavender`, `#rose`
- Product data lives in `src/content/products.ts` with fields: `slug, name, botanical, image, note, skinType`.

**Acceptance criteria — The Collection**
- [ ] Exactly 5 products, correct names/order/anchors; Home cards land on the right anchors
- [ ] No prices, no buy/add-to-cart buttons anywhere
- [ ] Every card's enquire link arrives at Contact with the correct product pre-selected
- [ ] All 5 renders share the same background/lighting treatment

### 4.4 In the City (`/in-the-city`) — client change request #4

Build:
- Editorial gallery: the AI-generated **vertical** campaign visuals from §6 in a masonry/editorial grid, each with a short caption (city/scene + the featured variety).
- Keep 2–4 of the client's real London photos (London Eye, River Thames) only if they grade acceptably after editing; the AI set carries the page. Do not mix grades jarringly — if a real photo looks weak next to the set, drop it.
- **Honesty disclaimer — required, keep from the starter.** Place this text (or the starter's exact wording) visibly on the page:
  > "These AI-generated images are campaign concepts created to explore the Wonder world. They are not documentary photographs, customer images or claims about where the products are sold."
- Closing CTA: follow on Instagram/TikTok (Appendix A URLs).

**Acceptance criteria — In the City**
- [ ] All gallery images are vertical (4:5 or 9:16), WebP, lazy-loaded, with alt text naming scene + variety
- [ ] Every product shown in the visuals is the real Wonder packaging composited per §6 — no AI-rendered pack text
- [ ] Disclaimer is present and readable on the page (not hidden in a footer tooltip)

### 4.5 Contact (`/contact`) — client change request #2

Build, in this order:
1. **Direct details block (above the form):** heading, `hello@royalbasketgroup.com` as a clickable `mailto:` link, social links, one line that the team replies to questions and business opportunities. Add phone/WhatsApp/address **only if** the client supplies them (§10) — never invent contact details.
2. **Bulk & trade panel (prominent, visually distinct):** heading for bulk orders, retail/stocking and distribution enquiries; bullet list of what to include (business name, location, estimated quantity); CTA button *Start a bulk enquiry* that scrolls to the form and pre-sets enquiry type to *Bulk order / Trade*.
3. **Contact form** per §5.2, fields: name, email, enquiry type (`General question · Bulk order · Stock the range · Press / other`), product of interest (optional; the 5 bars + "Not product-specific"), message, consent checkbox ("You may contact me about my enquiry").
4. **Response-time line** — only with client-confirmed wording (§10); omit rather than promise an unconfirmed SLA.

**Acceptance criteria — Contact**
- [ ] Email address visible without scrolling on mobile and desktop; `mailto:` works
- [ ] Bulk panel is visually distinct and its CTA pre-sets the form's enquiry type
- [ ] Form submits successfully to the §5.2 handler and shows success/error states; a real test message reaches `hello@royalbasketgroup.com`

---

## 5. Features

### 5.1 Email list pop-up — client change request #3

**Purpose:** invite visitors to subscribe for brand updates, new product launches and offers.

**Provider decision (list storage):**
- **Recommended: Mailchimp.** Create the account under the client's own email (`hello@royalbasketgroup.com`) so the client owns the list. Reasons: it is an actual mailing-list tool (audience management, unsubscribe handling, campaign sending the client can do themselves later), it has a free tier sufficient for launch, and it accepts sign-ups from a custom-designed form via its embedded-form endpoint — so the pop-up can be fully on-brand instead of using Mailchimp's generic pop-up.
- Alternatives considered: Brevo (also fine, similar model); Klaviyo (e-commerce oriented — unnecessary here); Formspree/Web3Forms alone (they forward emails but are **not** list managers — no campaigns, no unsubscribe handling — acceptable only as a stopgap).
- Implementation: custom pop-up UI (below) that POSTs to the Mailchimp embedded-form endpoint for the account's audience. Enable double opt-in if the client wants stricter list quality; default single opt-in + a clear success message. Store nothing locally.

**Pop-up behaviour spec:**
- Trigger: first visit only — after **12 seconds** on site *or* **50% scroll depth**, whichever comes later. Never during the first 3 seconds. Do not trigger on the Contact page after a form interaction.
- Frequency cap: once shown and dismissed → do not show again for **30 days** (localStorage timestamp). After a successful subscribe → never show again (localStorage flag). Hard cap: max 2 impressions per visitor, ever, without subscribing.
- Dismissal: visible ✕ close button (min 40×40 px tap target), ESC key, and backdrop click all dismiss. No forced wait, no "confirm-shaming" decline text — decline label is a plain "No thanks".
- Mobile: bottom-sheet style card, max 70% of viewport height, does not cover the header nav, respects safe-area insets, page scroll locks only while open.
- Accessibility: focus moves into the pop-up on open and returns to the page on close; labelled email input; sufficient contrast on cream background (bronze-brown text, not light gold text on cream).
- Design: on-brand — cream card, gold rule, serif headline (e.g. "Join the Wonder list"), one line of copy (updates, launches, offers), single email field + *Subscribe* button. Optional incentive line only if the client approves one (§10) — do not invent a discount.
- States: idle → submitting (button disabled, spinner) → success ("You're on the list — welcome to the Wonder world." + close button) / error (inline message, field preserved).

**Acceptance criteria — pop-up**
- [ ] Appears per trigger rules on a fresh browser profile; does not appear on second visit within 30 days
- [ ] All three dismiss paths work; after subscribing it never reappears (verify by clearing only site cache, not localStorage)
- [ ] A test sign-up lands in the Mailchimp audience (verify in the Mailchimp dashboard)
- [ ] Mobile: bottom sheet, no layout shift of the underlying page, close target reachable one-handed
- [ ] Keyboard-only path: can tab to the field, submit, and close with ESC

### 5.2 Contact form handling

**Options:**
- **Recommended for launch: Formspree.** No backend to maintain; submissions delivered by email to `hello@royalbasketgroup.com`; built-in spam filtering; free tier covers expected enquiry volume. Create the form endpoint under an account the client can be added to.
- Alternative: a Vercel serverless function + Resend (more moving parts, full control, no third-party form branding) — choose only if Formspree limits/branding become a problem.
- Either way the front-end behaviour is identical, so the handler can be swapped later without page changes: keep the submit logic in one `submitEnquiry()` helper.

**Form behaviour spec:**
- Client-side validation: name, valid email, enquiry type, message (min ~10 chars), consent checkbox required. Inline errors under fields, in brand styling.
- Spam: honeypot field + the provider's filtering; no visible CAPTCHA unless spam actually becomes a problem.
- Pre-selection: `/contact?product=lemon` (and `?type=bulk`) pre-fills the form — used by Collection cards (§4.3) and the bulk panel (§4.5). Parse query params on load.
- States: submitting (disabled button) → success panel replacing the form ("Thank you — we'll reply by email.") / error panel with retry and a fallback line: "Or email us directly at hello@royalbasketgroup.com".
- The submission payload must include the enquiry type and product so the client can triage bulk orders at a glance; set the email subject pattern: `[Website] <Enquiry type> — <Name>`.

**Acceptance criteria — contact form**
- [ ] Test submissions for each enquiry type arrive at `hello@royalbasketgroup.com` with correct subject pattern
- [ ] Invalid email / empty message / unchecked consent are blocked with inline errors
- [ ] `?product=` and `?type=bulk` deep links pre-fill correctly
- [ ] Success and failure states both reachable and styled on-brand (simulate failure by blocking the endpoint)

---

## 6. AI imagery workstream — In the City visuals

**Problem being solved:** the client's own London photos look weak on the site. Replace/augment them with professionally designed AI-generated vertical campaign visuals featuring the actual Wonder soap, keeping the honesty disclaimer (§4.4).

**Scene list (produce 8–10 final verticals; each features one variety):**
1. Shower scene — model using the bar, abundant bubbles/foam, warm steamy light (hero visual of the page)
2. Paris street / café — bar + botanical on a café table, Haussmann-style street behind
3. Hotel room — bar on a marble bathroom vanity, plush towels, warm lamps
4. Beach — bar on a woven mat/towel with botanical, sea behind, golden hour
5. London — bar with a London backdrop (red bus / Thames mood) to sit alongside the client's real London photos
6. Bathroom shelf ritual — morning routine flat-lay, botanicals around the bar
7. Spa / hammam mood — steam, stone, eucalyptus-style greenery
8. Gift moment — hands holding the boxed bar with ribbon (no face needed)
Assign varieties across scenes so all 5 appear at least once; repeat the strongest variety (client's bestseller, if they name one) twice.

**Packaging consistency method (critical):**
- The Wonder packaging in every image must be **the real packaging**. AI image generators mangle pack text and logos — never let the generator draw the pack.
- Workflow per scene: (a) generate the scene with a plain placeholder object (unbranded bar/box shape) or clear placement space, at the right aspect ratio; (b) composite the genuine packaging render/photo into the scene with an image editor (perspective, scale, shadow, reflection matched); (c) if using an AI editor instead, feed the real pack image as a locked reference and manually verify the pack text pixel-by-pixel against the approved render — reject any output where "WONDER", "Beauty Bar", the variety name or the taglines are altered.
- Keep each scene's variety consistent: scene botanical = the featured bar's botanical (lemon scene → Lemon bar).

**Formats & delivery:**
- Vertical only: master at 4:5 (e.g. 1600×2000) and, for the shower/hero visual, also 9:16. Export web versions as WebP ≤ ~150 KB each.
- Warm colour grade across the whole set to match §3's palette; no cold/blue casts; skin tones natural.
- File naming: `/brand-assets/city/<scene>-<variety>.webp` (e.g. `paris-cafe-lemon.webp`).
- Keep generation prompts + source files in the project folder for reproducibility.

**Integration steps:**
1. Generate scenes → 2. Composite real packaging → 3. QA pass (hands/fingers, pack text, botanical match, grade) → 4. Export WebP → 5. Add to `src/content/` gallery data with captions → 6. Confirm disclaimer present on the page (§4.4).

**Acceptance criteria — AI imagery**
- [ ] 8–10 verticals delivered, all 5 varieties represented, naming convention followed
- [ ] Zoomed to 200%, every pack's text matches the approved packaging exactly
- [ ] No anatomical artefacts (hands/fingers) in any shipped image
- [ ] Set looks like one campaign: consistent warm grade and light

---

## 7. Tech setup and deployment pipeline

**Stack:** keep the starter's stack — React + Vite SPA, client-side routing. Do not migrate frameworks.

### 7.1 Repo setup
1. Clone https://github.com/Usamapuri/wonderbeautysoap (access per §9).
2. Get the Replit **source** (not build output) per §9 and commit it as the starting point on `main`, or rebuild page-by-page against the live reference — developer's call, but the reference's copy and assets must end up in the repo either way.
3. Branching: `main` = production. Feature branches → pull request → Vercel preview URL → merge to deploy. No direct pushes to `main` after launch except trivial copy fixes.
4. Add `vercel.json` with an SPA fallback rewrite so deep links work on Vercel:
   `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
5. Put all site-wide values (email, socials, domain) in one constants file sourced from Appendix A.

### 7.2 Vercel project
1. Create the Vercel project under a team the **client owns** (client signs up with `hello@royalbasketgroup.com`; developer added as member) so the client keeps the asset if the relationship ends.
2. Import the GitHub repo. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`, install command default.
3. Confirm production branch = `main`; preview deployments enabled for all other branches/PRs.
4. No environment secrets are needed at launch (Formspree/Mailchimp endpoints are public form URLs).

### 7.3 Custom domain + DNS on Spaceship (go-live)
Do these steps in order, during a low-traffic window, and **read step 3 twice**:

1. In Vercel → Project → Settings → Domains: add `royalbasketgroup.com` and `www.royalbasketgroup.com`. Set `www.royalbasketgroup.com` as the primary domain; the apex redirects to it.
2. Vercel will display the required records — expected values: **A record** `@` → `76.76.21.21`, and **CNAME** `www` → `cname.vercel-dns.com`. Use exactly what Vercel shows if it differs.
3. In Spaceship → the domain → DNS records: **first screenshot the entire existing record list** (backup). Then delete only any existing `A`/`AAAA`/`CNAME` records for `@` and `www` that point at old hosting. **Do not touch: MX records, or TXT records for SPF/DKIM/DMARC — those run the client's email (`hello@royalbasketgroup.com` on Spaceship mail).** Keep the domain's nameservers on Spaceship — do not delegate nameservers to Vercel.
4. Add the two records from step 2.
5. Wait for propagation (typically minutes, can take a few hours). Vercel auto-detects the records and issues the SSL certificate (Let's Encrypt) — no manual certificate step.
6. Verify: `https://www.royalbasketgroup.com` loads with a valid padlock; `https://royalbasketgroup.com` redirects to it; a deep link (e.g. `/collection`) loads directly without a 404.
7. **Verify email:** send a test email *to* `hello@royalbasketgroup.com` from an external account and reply from it. If either fails, compare Spaceship DNS against the step-3 screenshot and restore any mail record that was changed.

**Acceptance criteria — deployment**
- [ ] Every push to `main` deploys automatically; PRs produce preview URLs
- [ ] Both domain variants resolve over HTTPS with valid SSL, one canonical (www)
- [ ] Deep links and page refreshes on all 5 routes return the app, not 404
- [ ] Test email round-trip to/from `hello@royalbasketgroup.com` passes after the DNS change

---

## 8. Editing after launch — the client's Vercel question, answered

**Client asked: "Once the website is published on Vercel, can we keep editing stuff, like wording?" — Yes.** Publishing is not a lock-in. The workflow is:

- Any wording/image change is made in the GitHub repo → push (or merged PR) → **Vercel automatically rebuilds and redeploys**, typically live within about a minute. Nothing is edited "on Vercel" directly; Vercel is just the publisher.
- Before anything goes live, the same change can be reviewed on a **preview URL** (every branch/PR gets one) and only merged when approved.
- If an edit goes wrong, Vercel's dashboard offers **instant rollback** to the previous deployment.

**Options for who edits:**
| Option | How it works | Trade-off |
|---|---|---|
| A. Developer edits (launch default) | Client messages changes; developer edits the content files (§4 copy-storage rule) and pushes | Zero extra build cost; client depends on developer for every tweak |
| B. Headless CMS (phase-2 option) | Add Sanity: client logs into a friendly studio and edits text/images/team/products themselves; saving triggers a rebuild via webhook | Extra setup (~half a day) + a small learning curve for the client; best if the client will update often |
| C. GitHub web editor | Client edits files directly on github.com | Not recommended — too technical and error-prone for a non-technical client |

**Recommendation:** launch with **A** (all copy already lives in `src/content/` files, so edits are quick and safe), and offer **B (Sanity)** once the client sees how often they actually change wording. Either way, the client never needs to touch Vercel itself.

---

## 9. Access checklist — who does what

Nothing in this section is optional; the build blocks without these. **Client** = Wonder Beauty Soap / Royal Basket Group side. **Developer** = Abdullah.

### Spaceship (domain + DNS + email)
- [ ] **Client:** contact Spaceship support (chat/ticket) and request **Multi-User Access** be enabled for the account. Per Spaceship's process, the client provides support with (a) the email address registered to the main Spaceship account and (b) the email address of the team member to be granted access (the developer's email).
- [ ] **Client:** after Spaceship confirms activation, add the developer as a team member / domain manager in the Spaceship account.
- [ ] **Developer:** once added, verify access by opening the domain's DNS record list (read-only check; change nothing until go-live, §7.3).
- [ ] Note: the client stays account owner throughout — the developer never needs the client's Spaceship password.

### GitHub
- [ ] **Repo owner (Usamapuri account):** add the developer as a collaborator on https://github.com/Usamapuri/wonderbeautysoap with write access (or transfer the repo to an account the client controls — client's choice, developer advises).
- [ ] **Developer:** clone, verify `npm install && npm run build` works locally before changing anything.

### Replit (design reference source)
- [ ] **Client:** from the Replit project, either (a) use Replit's GitHub integration to push the **source** to the repo, or (b) download the project as a zip from the editor (source files — not the deployed preview files) and send it to the developer.
- [ ] **Developer:** confirm the export contains source (`package.json`, `src/`, public assets incl. `/brand-assets/`) — the client previously downloaded files that were compiled build output (`index.html` + hashed JS/CSS), which cannot be edited; if the zip is build output, fall back to rebuilding against the live reference site.

### Vercel
- [ ] **Client:** create a Vercel account/team using `hello@royalbasketgroup.com` (or authorise the developer's team in writing — client-owned is preferred).
- [ ] **Developer:** connect the GitHub repo, configure per §7.2, add the developer as team member.

### Mailchimp + Formspree (features, §5)
- [ ] **Client:** create the Mailchimp account with `hello@royalbasketgroup.com`; add the developer as a user (Admin or Manager) so the audience form endpoint can be wired up.
- [ ] **Developer:** create the Formspree form, set delivery to `hello@royalbasketgroup.com`, hand the account/form over to the client or add them as a member.

---

## 10. Content needed from the client — request checklist

Send this list to the client as-is. The site can be *built* without most of it, but it cannot be *launched* with placeholders.

**Brand story (for Our Story, §4.2)**
- [ ] The founding story in the client's words: how and why the brand started in 2019, the founder's sensitive-skin motivation, key moments since (first stockist, first big order, range growing to five)
- [ ] Written approval of the final Our Story copy before launch

**Old packaging (for Then & Now, §4.2)**
- [ ] Photos of the old packaging — ideally one per variety that existed pre-rebrand, front-on, highest resolution available (phone photos acceptable if sharp and well lit)

**Team (for Meet the Team, §4.2)**
- [ ] For each member: photo, full name, role/title, one-line bio
- [ ] Confirmation each person is happy to appear on the public site

**Products (for The Collection, §4.3)**
- [ ] Per bar: confirmed scent/ingredient note, who it is for / skin feel, bar size/weight if it will be shown
- [ ] Confirmation of which claims may be used beyond the on-pack lines ("Triple Action Formula — Glow | Hydrate | Protect", "Dermatologist Recommended")
- [ ] Which variety is the bestseller/hero (affects Home and §6 emphasis)

**Contact & trade (for Contact, §4.5)**
- [ ] Bulk/trade details: minimum order quantity (if any), what buyers should include, who reads bulk enquiries
- [ ] Response-time wording the client will commit to (e.g. "within 2 working days") — or "don't show one"
- [ ] Optional: phone/WhatsApp number and/or address if they want them public

**Retail (for Home strip, §4.1)**
- [ ] Which retailers/stockists may be named or shown in photos

**Email pop-up (§5.1)**
- [ ] Approval of pop-up headline/copy; decision on whether to offer an incentive (and what) — no incentive will be invented by the developer

**Brand files**
- [ ] Logo as SVG/vector if it exists; highest-resolution PNG otherwise

---

## 11. Phased timeline (~2–3 weeks)

Assumes client content (§10) arrives progressively; phases 3 can run parallel to 2.

| Phase | Days | Work | Deliverable |
|---|---|---|---|
| 0. Access & assets | 1–2 | §9 checklist: Spaceship multi-user request sent, GitHub access, Replit source obtained, accounts (Vercel/Mailchimp/Formspree) created | Working repo the developer can build from; access confirmed |
| 1. Foundation | 2–4 | Design tokens from starter (§3), shared components, routing for 5 pages, constants file, content files structure | Empty-but-styled skeleton of all 5 pages on a Vercel preview URL |
| 2. Core pages | 4–8 | Home, Collection, Our Story, Contact built per §4 (story/team sections structured, awaiting final content) | All pages complete with supplied content, preview URL for client review |
| 3. AI imagery (parallel) | 5–9 | §6 scene production, packaging compositing, QA, WebP export; In the City page completed | Final In the City gallery live on preview |
| 4. Features | 8–10 | Pop-up wired to Mailchimp (§5.1), contact form wired to Formspree (§5.2), deep-link pre-fills | Tested sign-up + enquiry round-trips on preview |
| 5. Content load & review | 10–13 | Load remaining §10 content (story text, old packs, team), client reviews preview, wording edits round(s) | Client sign-off on the preview URL in writing |
| 6. QA & go-live | 13–15 | §12 checklists, DNS switch per §7.3, email verification, handover notes (how edits work, §8) | Site live on `www.royalbasketgroup.com`; email verified; handover done |

---

## 12. QA checklist and go-live checklist

**QA (on the preview URL, before DNS)**
- [ ] All 5 routes + every anchor/deep link work; refresh on each route doesn't 404
- [ ] Responsive pass at 360 / 390 / 768 / 1440 px: no horizontal scroll, tap targets ≥ 40 px, nav usable
- [ ] Cross-browser: Chrome, Safari (iOS), Firefox — layout, video, pop-up
- [ ] Images: WebP, sized to slot, alt text present; hero LCP image preloaded; total page weight sane on 4G
- [ ] Video: muted autoplay works on iOS Safari; poster shows before load
- [ ] Pop-up: full §5.1 acceptance criteria pass, including the 30-day suppression
- [ ] Forms: full §5.2 acceptance criteria pass, including failure state
- [ ] Content proofread against Appendix A (names, email, URLs, product order, taglines spelled exactly)
- [ ] SEO/social: unique `<title>` + meta description per page; OG/Twitter tags with the lineup image (per the starter's head: title pattern "Wonder Beauty Soap — five botanical varieties"); favicon present; `robots` allows indexing
- [ ] Accessibility basics: heading order, form labels, focus visible, colour contrast on cream backgrounds
- [ ] No placeholder text, no invented facts, no lorem ipsum anywhere reachable

**Go-live (day of DNS switch)**
- [ ] Client sign-off on preview received
- [ ] Spaceship DNS fully screenshotted before any change (§7.3 step 3)
- [ ] Only `@`/`www` web records changed; MX + SPF/DKIM/DMARC TXT records untouched (diff against screenshot)
- [ ] HTTPS valid on www; apex redirects to www; deep links load
- [ ] Test email round-trip to/from `hello@royalbasketgroup.com` passes
- [ ] Test pop-up sign-up + test contact submission on the **live** domain pass
- [ ] Social links in footer open the correct profiles
- [ ] Handover note sent to client: how to request edits (§8), who owns which account (§9)

---

## 13. Risks and open questions

| # | Risk / question | Mitigation / owner |
|---|---|---|
| 1 | DNS change breaks the client's email | Screenshot-first rule + MX/TXT preservation (§7.3); post-change email test is a go-live gate |
| 2 | Replit export turns out to be build output, not source | §9 fallback: rebuild against the live reference; decide in Phase 0, not mid-build |
| 3 | Client content (§10) arrives late — story, old packs, team | Build structure first with marked placeholders; launch date keys off content sign-off, not code completion |
| 4 | Spaceship Multi-User Access needs support round-trips and delays DNS access | Client starts it in Phase 0 (longest-lead item); developer can build everything else meanwhile |
| 5 | AI visuals with inaccurate pack text undermine trust | §6 compositing rule: real packaging only, 200% text QA, disclaimer on the page |
| 6 | Pop-up annoys visitors / hurts the premium feel | §5.1 timing + frequency caps + plain "No thanks"; review sign-up vs dismissal after 30 days live |
| 7 | Open: does the client want self-editing (CMS) from day one? | Default is developer-edits (§8 option A); ask once content changes start — don't build the CMS speculatively |
| 8 | Open: pop-up incentive (discount/offer) — approved? | Ask the client (§10); ship without an incentive if undecided |
| 9 | Open: which domain is canonical — plan assumes `www` primary, apex redirects | Confirm with client at Phase 6; either is fine technically, pick one and be consistent for SEO |
| 10 | Open: bar weight, ingredients lists, and any regulatory wording for product pages | Only publish client-confirmed details (§10); when in doubt, leave it off |

---

## Appendix A — Master data (copy values from here exactly)

| Key | Value |
|---|---|
| Brand name | Wonder Beauty Soap (product line: Wonder Beauty Bar) |
| Company | Royal Basket Group |
| Domain | www.royalbasketgroup.com (apex: royalbasketgroup.com) |
| Email | hello@royalbasketgroup.com |
| Instagram | https://www.instagram.com/wonderbeautysoap |
| TikTok | https://www.tiktok.com/@royal_basket_group |
| Facebook | https://www.facebook.com/share/1KZhQyQ8e8/?mibextid=wwXIfr |
| GitHub repo | https://github.com/Usamapuri/wonderbeautysoap |
| Design reference | https://wonder-beauty-soaps--zainabshahid062.replit.app/ |
| Registrar / DNS / email host | Spaceship |
| Hero headline | "A little everyday wonder." |
| On-pack tagline 1 | Triple Action Formula — Glow \| Hydrate \| Protect |
| On-pack tagline 2 | Dermatologist Recommended |
| Product 1 | Wonder Beauty Bar — Coconut (anchor `#coconut`) |
| Product 2 | Wonder Beauty Bar — Aloe Vera (anchor `#aloe-vera`) |
| Product 3 | Wonder Beauty Bar — Lemon (anchor `#lemon`) |
| Product 4 | Wonder Beauty Bar — Lavender (anchor `#lavender`) |
| Product 5 | Wonder Beauty Bar — Rose (anchor `#rose`) |
| Founded | 2019 |
| In the City disclaimer | "These AI-generated images are campaign concepts created to explore the Wonder world. They are not documentary photographs, customer images or claims about where the products are sold." |

*End of brief.*
