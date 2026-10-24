---
name: wonder-site
description: Build, extend or QA the Royal Basket website for its Wonder beauty bars (Royal Basket Group) in this repo — Next.js App Router + shadcn/ui + Tailwind v4, implementing the client's Wonder_Website_Brief.pptx on top of implementation-plan.md. Use for any work on its pages (Home, Our Story, The Collection and the five flavour pages, Around the World, Get in Touch), the bulk-order form, the email pop-up, brand assets/imagery, content edits, Vercel deployment or Spaceship DNS go-live.
---

# Royal Basket × Wonder website

Two briefs: `implementation-plan.md` (scope, rules, acceptance criteria) and the client's **`Wonder_Website_Brief.pptx`** (repo root; 2026-10-25), which sets the current structure, copy and taglines. Read the deck's text with `python scripts/slide_text.py` from the pptx skill, or see `DELIVERY-NOTES.md` → Decisions.

## Current direction (developer decisions, 2026-10-25)

- **Brand = Royal Basket (Group)**; Wonder is the soap. Royal Basket Group logo in the header/footer, titles "… — Royal Basket".
- **Bulk orders only.** Every call to action leads to `/contact?type=bulk` (with `&product=<slug>` where known); the form pre-selects "Bulk order".
- **Copy = the deck's own text**, or existing site text visible in its screenshots. Don't write new marketing copy; short labels may restate the deck's headings. Long deck paragraphs may be split into short lines ("no paragraphs").
- **Five tabs:** Home · Our Story · The Collection (dropdown of the 5 bars) · Around the World (`/in-the-city` redirects) · Get in Touch. Each flavour has its own page, `/collection/<slug>`: definition (tagline, sub-line, origin) + history (the founder's origin story) + bulk button.
- **Look:** the client's Bolt prototype theme, Home after gisou.com, Our Story after rhode's About page, consistent buttons/colours. See [references/design-system.md](references/design-system.md).

## Non-negotiable rules (brief §0)

1. **Follow the design system** in [references/design-system.md](references/design-system.md) (Bolt theme, tokens in `src/app/globals.css`). Keep colours, buttons and motion consistent across pages.
2. **Portfolio only.** No shop, cart, checkout, prices, accounts or payments, and no "buy" buttons anywhere.
3. **Never invent facts.** Never invent prices, retailers, awards, ingredients, statistics, team members, testimonials/reviews, biography details or response times. Sample reviews stay visibly marked (`sample: true` in `src/content/reviews.ts`) until the client supplies real ones. Missing content becomes `placeholder("…")` from `src/content/placeholder.ts`. It renders visibly marked through `<Copy>`. Log it in `DELIVERY-NOTES.md`.
4. **Claims discipline.** Only the on-pack lines are allowed: "Triple Action Formula — Glow | Hydrate | Protect" and "Dermatologist Recommended". Per-bar benefit wording comes from the client only. The dieline back panels carry extra text (ingredients, "Paraben Free", prices, weights). Do NOT publish any of it unless the client confirms it in writing (§10, §13 #10).
5. **One source of truth for master data.** Brand, email, socials, taglines, the orders CTA (`ordersCta`), flavour links (`barHref`) and the AI disclaimer live in `src/content/site.ts`. Never hard-code them in components.
6. **Never alter the packaging.** Never let AI draw or alter it. On-site product imagery is the approved mockups, or real photos.
7. **Email must not break at go-live.** Preserve every MX/TXT record on Spaceship (§7.3).
8. If something is ambiguous, ask the developer (Abdullah). Don't guess.

## Stack decision (deviation from brief §7)

The developer chose **Next.js 16 (App Router, Turbopack, `cacheComponents` + `partialPrefetching`) + shadcn/ui (radix-nova style, `radix-ui`, lucide) + Tailwind v4**, instead of the starter's Vite SPA. Consequences:
- Each route is a real prerendered page. **No `vercel.json` SPA rewrite is needed**, and deep links and refreshes work by default.
- Vercel framework preset is **Next.js**, with build `next build`. Ignore the brief's "Vite / dist" lines.
- This Next.js version differs from older training data. **Read `node_modules/next/dist/docs/` before using an API you are not sure of** (see `AGENTS.md`). Known gotchas:
  - `next/image`: `priority` is deprecated, so use `preload` (hero only). `images.qualities` defaults to `[75]`.
  - `useSearchParams()` must sit under `<Suspense>` (Contact pre-fill). `usePathname()` is fine on these static routes.
  - Don't call `new Date()`/`Date.now()` in Server Components. Prerendering under cacheComponents rejects it.
  - `LayoutProps`/`PageProps` are generated global types. `tsc` alone errors until `next build` or `next typegen` has run.
- shadcn components are added with `npx shadcn@latest add <name>`. `cn` comes from the `cn` package (re-exported by `@/lib/utils`).

## Project map

```
implementation-plan.md      the original brief (scope, rules)
Wonder_Website_Brief.pptx   the client's website brief deck (structure, copy, taglines) — not committed
DELIVERY-NOTES.md           open placeholders, samples, interim assets, decisions (keep current)
brand-assets/source/        client originals: mockups/ (approved renders), dielines/, logos/ (Royal Basket Group)
brand-assets/starter/       assets carried over from the Replit starter
scripts/prepare_assets.py   originals -> public/brand-assets/*.webp, botanicals, logos, icons, OG image
public/brand-assets/        products/ botanicals/ flavors/ lifestyle/ logos/ (videos/ when supplied)
src/fonts/                  DM Sans + DM Serif Display (Bolt theme), via next/font/local with size-adjust
src/app/                    routes (/, /our-story, /collection, /collection/[slug], /around-the-world, /contact),
                            template.tsx (page transitions), globals.css (tokens, utilities, motion)
src/content/                ALL copy + data: site.ts (brand, taglines, nav, ordersCta, barHref, integrations),
                            products.ts (5 bars: tagline, sub-line, mood, origin + story), home.ts, story.ts,
                            collection.ts, world.ts, contact.ts, reviews.ts, team.ts, popup.ts, placeholder.ts
src/lib/enquiry.ts          submitEnquiry(): the ONLY contact-form transport (Formspree, mailto fallback)
src/lib/subscribe.ts        subscribe(): Mailchimp JSONP sign-up
src/components/ui/          shadcn primitives (Button variants `wonder`, `wonder-outline`, `wonder-light`)
src/components/brand/       Eyebrow, SectionHeading, SplitText, Lines, BrandMark, PhotoRow, ProductCard, PageCta,
                            Copy, Em, SocialLinks
src/components/layout/      SiteHeader (dropdown, compact on scroll, Sheet on phones), SiteFooter
src/components/<area>/      home/, story/, bar/ (flavour pages), collection/, world/, contact/
src/components/floating-actions.tsx   phone bulk-orders bar + back-to-top
```

## How to build a page or section

1. Read the page's spec and acceptance criteria in [references/pages.md](references/pages.md), and the matching brief section.
2. **Put the copy in `src/content/<page>.ts` first.** Use starter wording where it exists. Use client copy where it was supplied. Otherwise use `placeholder()`. Components only read content.
3. Build each section as a component in `src/components/<page>/`, then compose them in `src/app/<route>/page.tsx` in the brief's order. Export `metadata` with a unique title and description.
4. Style only with tokens and brand components (design-system.md). No raw hex values, no one-off colours. Backgrounds are cream (`sand` base, `stone` contrast bands, `parchment` cards/panels; never white). Corners are `rounded-lg` on cards, buttons, image frames, fields and panels (bands stay square); cards use `.card-pop`, photo tiles `.tile-pop`; frames take their image's aspect ratio (design-system.md).
5. Give new sections entrance motion: `rise-group` for first-screen content, `{...reveal()}` / `{...revealGroup}` below the fold (design-system.md → Entrance motion).
6. Images go through `next/image` with real `sizes`. Product renders use `mix-blend-multiply` on a `bg-clay` well. Hero is `preload`; everything else is lazy. Alt text names the variety and scene.
7. Verify: `npm run build` (must pass), `npm run lint`, then check at 360/390/768/1440 px with no horizontal scroll (see deploy-and-qa.md for the screenshot recipe). Update `DELIVERY-NOTES.md`.

## Build order (brief §11)

| Phase | Work | Reference |
|---|---|---|
| 1 Foundation | tokens, fonts, shared components, header/footer, content files | design-system.md (**done**) |
| 2 Core pages | Home, Our Story, The Collection + 5 flavour pages, Around the World, Get in Touch (**rebuilt to the client deck 2026-10-25**; awaiting client content) | pages.md |
| 3 Imagery | AI vertical campaign set composited with real packaging → replace interim city visuals | assets-and-imagery.md |
| 4 Features | pop-up + contact form (**built**; set `NEXT_PUBLIC_FORMSPREE_ID` / `NEXT_PUBLIC_MAILCHIMP_ACTION`) | features.md |
| 5 Content load | client copy, old-pack photos, team, then client sign-off on the preview URL | pages.md, DELIVERY-NOTES.md |
| 6 QA & go-live | QA checklist, Vercel domain, Spaceship DNS, email round-trip | deploy-and-qa.md |

Current open items live in `DELIVERY-NOTES.md`. Read it before starting work, and update it when you finish.

## References

- [references/design-system.md](references/design-system.md): exact palette, type scale, spacing, breakpoints and component recipes from the starter
- [references/pages.md](references/pages.md): per-route build specs, data shapes and acceptance criteria
- [references/features.md](references/features.md): email pop-up and contact form behaviour, shadcn components, Mailchimp/Formspree wiring
- [references/assets-and-imagery.md](references/assets-and-imagery.md): asset pipeline, file naming, the §6 AI campaign workflow and its QA
- [references/deploy-and-qa.md](references/deploy-and-qa.md): Vercel, Spaceship DNS with email preservation, editing after launch, QA and go-live checklists
