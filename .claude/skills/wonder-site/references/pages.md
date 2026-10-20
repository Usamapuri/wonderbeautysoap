# Pages (brief §4)

Routes: `/` · `/our-story` · `/collection` · `/in-the-city` · `/contact`. Each is `src/app/<route>/page.tsx`, composed from section components in `src/components/<page>/`, with copy in `src/content/<page>.ts` and a page `metadata` export with a unique title and description.

**On every page** (already in `layout.tsx`): topline, sticky header with the active link highlighted, footer with email and socials (new tab), favicon/OG from the file conventions. The email pop-up (features.md) is mounted in the layout once built.

Starter copy for each page can be recovered from the live starter bundle (`/assets/index-*.js`, search for the page's heading text). Prefer it over writing new copy.

---

## Home `/` (built)

Replicates the original's Home: Hero → *Promise strip (brief addition)* → Botanical Edit (3 concept photos) → Campaign film → Collection preview → "Recognisable by nature" band (`real-world.tsx`, links to In the City) → Brand intro → "Beauty belongs in the everyday" (`quiet-detail.tsx`) → Retail strip → Closing CTA (+ bulk CTA, brief addition). Copy is in `src/content/home.ts`; components are in `src/components/home/`. Brief §4.1's 5-botanical panel and city teaser were dropped in favour of the original (2026-10-21).

Acceptance:
- [ ] Section-for-section match with the original at 1440 and 390px (plus the two additions)
- [ ] Hero headline reads exactly "A little everyday wonder."; CTAs go to `/collection` and `/our-story`
- [ ] Each of the 5 cards deep-links to `/collection#<slug>`
- [ ] Video autoplays muted with a poster, pauses off-screen, and doesn't block first paint; the hero image is preloaded (LCP)

Open items: video file (`home.film.src`; also broken on the original), retailer confirmation.

## The Collection `/collection` (built: `app/collection/page.tsx`, `components/collection/collection-item.tsx`, `content/collection.ts`)

- Intro: five varieties, one triple-action formula (starter `.collection-heading`: eyebrow, h1 `clamp(60px,8vw,112px)`, centred paragraph).
- One section per bar in order Coconut, Aloe Vera, Lemon, Lavender, Rose, with `id={product.slug}` (`#coconut #aloe-vera #lemon #lavender #rose`). The header is sticky, so `scroll-padding-top` in globals.css keeps anchors clear of it. Each section contains:
  - render (`product.image`, multiply on `bg-clay`) + botanical accent (`product.botanical`)
  - title "Wonder Beauty Bar — <Variety>" (`product.name`)
  - `scentNote` and `skinType` through `<Copy>` (client-confirmed only)
  - shared promise line: `site.taglines.formula` · `site.taglines.dermatologist`
  - *Enquire about this bar →* `/contact?product=<slug>`
- Starter look: `.collection-item` alternating `bg-sand`/`#e5dccb` rows, 2-col grid → 1 col ≤560px.
- Data: `src/content/products.ts` (`slug, name, botanical, image, note, skinType` + `scentNote`, `editLine`, `accent`). Exactly 5 entries.

Acceptance: exactly 5 bars with the correct names, order and anchors · no prices or buy buttons · every enquire link pre-selects the right product · all renders share one background treatment.

## Our Story `/our-story` (built: `components/story/*`, `content/story.ts` + `team.ts`)

Content files: `src/content/story.ts` and `src/content/team.ts`.
1. **Opening story block.** Facts allowed: founded **2019**, the founder's very sensitive skin, the search for a locally available bar for sensitive/dry skin that felt luxurious but stayed affordable. The full text must be client-approved; until then use a placeholder and add no biographical detail.
2. **Timeline** (vertical; build a reusable `TimelineItem`): 2019 the first bar · early years (first packaging, first customers) · growth to five varieties · the rebrand · today (gold-and-white packaging). Show year labels only where known. Milestone text comes from the client.
3. **Then & Now gallery.** Old-pack photo beside the new render for the *same* variety (side-by-side, or a before/after slider). Render only varieties that have a genuine old photo. Old photos go in `brand-assets/source/old-packaging/` → `public/brand-assets/story/old-<slug>.webp`. Never fabricate an "old" pack. Note: the starter's lifestyle photos (`london-coconut`, `rose-at-retail`, `in-store`) show the old design and are candidates, so ask the client.
4. **Rebrand section.** What changed (identity, gold-and-white packaging, botanical illustrations) and what stayed (Glow · Hydrate · Protect).
5. **Meet the Team.** Data-driven grid from `team.ts` (`{ name, role, bio, photo }[]`): photo, name, role, one-line bio. Must look clean with 2 to 6 members. **Render the section only when `team.length > 0`. No placeholder people on the live site.**
6. Closing CTA → `/collection` and `/contact`.

Starter look: `.story-hero` (`bg-sand`, image with multiply), `.founder-copy` (lead in serif `clamp(28px,3vw,42px)`), `.story-values` (3 cells with 1px gaps, alternating paper/#e5dccb).

Acceptance: 5 milestones in order · genuine same-variety pairs · adding a team member = adding one data entry · no invented facts, with all open placeholders in DELIVERY-NOTES.md.

## In the City `/in-the-city` (built: `components/city/*`, `content/city.ts`; gallery uses interim concept art)

Content file: `src/content/city.ts` (`{ src, alt, scene, variety, caption }[]`).
- The original's 2-column staggered `.campaign-card` grid (cards 1.2:1, 0.98:1 on phones), each with a caption of scene + featured variety. When the §6 set arrives, ask the developer whether to keep this layout or switch to the brief's vertical (4:5) cards. The starter's `.campaign-card` has an image, a small uppercase place line, a serif title and an "AI-generated campaign concept" note in `text-rose`.
- Keep 2–4 of the client's real London photos only if they hold up next to the set. The starter's `.city-real` band (`moss` background, "Wonder, as it is.") keeps them visibly separate from the concepts.
- **Disclaimer is required and visible** (`site.cityDisclaimer`), near the top, not in a tooltip or the footer.
- Closing CTA: follow on Instagram / TikTok (`socials` from site.ts).
- Do NOT use the starter's `campaign/*.webp`. They show AI-drawn packs, which §6 forbids.

Acceptance: all images vertical, WebP, lazy, with alt text naming scene and variety · every pack shown is real composited packaging · disclaimer readable on the page.

## Contact `/contact` (built: `components/contact/*`, `content/contact.ts`, `lib/enquiry.ts`)

Content file: `src/content/contact.ts`. Order:
1. **Direct details** (above the form, visible without scrolling on mobile): heading, `mailto:` `site.email`, social links, and a line that the team replies to questions and business opportunities. Add phone, WhatsApp or address **only** if the client supplies them.
2. **Bulk & trade panel**, visually distinct (e.g. `bg-moss text-paper` or a gold-framed `bg-sand` panel). It covers bulk orders, retail/stocking and distribution, plus a list of what to include (business name, location, estimated quantity). Its CTA *Start a bulk enquiry* scrolls to the form and sets enquiry type = bulk.
3. **Contact form** (features.md): name, email, enquiry type (`General question · Bulk order · Stock the range · Press / other`), product (optional: 5 bars + "Not product-specific"), message, consent checkbox.
4. **Response-time line** only with client-confirmed wording. Otherwise omit it.

Pre-fill: `?product=<slug>` and `?type=bulk` are read with `useSearchParams` inside a `<Suspense>` boundary (required under cacheComponents). The bulk CTA sets state directly and scrolls.

Acceptance: email visible without scrolling · bulk CTA pre-sets the type · success and error states work · a real test reaches `hello@royalbasketgroup.com`.

## SEO per page

Title pattern: `title.template` is `%s — Wonder Beauty Soap`, and Home uses `site.seo.title` ("Wonder Beauty Soap — five botanical varieties"). Each page sets its own `description`. The OG image comes from `src/app/opengraph-image.jpg` (the lineup). `robots` allows indexing.
