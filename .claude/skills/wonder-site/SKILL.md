---
name: wonder-site
description: Build, extend or QA the Wonder Beauty Soap portfolio website (Royal Basket Group) in this repo — Next.js App Router + shadcn/ui + Tailwind v4, implementing implementation-plan.md. Use for any work on its pages (Home, Our Story, The Collection, In the City, Contact), the email pop-up, the contact form, brand assets/imagery, content edits, Vercel deployment or Spaceship DNS go-live.
---

# Wonder Beauty Soap website

The brief is `implementation-plan.md` at the repo root. It is the source of truth for scope, copy rules, page specs and acceptance criteria. This skill turns it into a Next.js + shadcn implementation guide. When the two disagree, the brief wins, except for the stack (see "Stack decision").

## Replicate the original (developer decision 2026-10-21)

The site replicates **https://wonder-beauty-soaps--zainabshahid062.replit.app/**: its sections, order, copy, nav and look. Where the brief and the original disagree, **the original wins**, except for:
- the client's change requests (Our Story additions, Contact bulk panel and form, email pop-up, In the City honesty disclaimer)
- brief features the original lacks (Collection enquire links and anchors, the promise strip, the bulk CTA)
- anything that would publish AI-drawn packaging (§6)

`DELIVERY-NOTES.md` → "Decisions" lists every resolved conflict. The original's compiled CSS/JS (`/assets/index-*.css|js`) is the reference for exact values and copy. Compare side by side with the screenshot recipe in deploy-and-qa.md.

## Non-negotiable rules (brief §0)

1. **The original Replit site is the reference: reproduce it, never redesign it.** Its exact tokens, including its late "polish" overrides, are already in `src/app/globals.css`. See [references/design-system.md](references/design-system.md).
2. **Portfolio only.** No shop, cart, checkout, prices, accounts or payments, and no "buy" buttons anywhere.
3. **Never invent facts.** Never invent prices, retailers, awards, ingredients, statistics, team members, testimonials, biography details or response times. Missing content becomes `placeholder("…")` from `src/content/placeholder.ts`. It renders visibly marked through `<Copy>`. Log it in `DELIVERY-NOTES.md`.
4. **Claims discipline.** Only the on-pack lines are allowed: "Triple Action Formula — Glow | Hydrate | Protect" and "Dermatologist Recommended". Per-bar benefit wording comes from the client only. The dieline back panels carry extra text (ingredients, "Paraben Free", prices, weights). Do NOT publish any of it unless the client confirms it in writing (§10, §13 #10).
5. **One source of truth for master data.** Email, socials, domain, taglines and the disclaimer live in `src/content/site.ts`, copied from brief Appendix A. Never hard-code them in components.
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
implementation-plan.md      the brief
DELIVERY-NOTES.md           open placeholders, interim assets, decisions (keep current)
brand-assets/source/        client originals: mockups/ (approved renders), dielines/ (flat artwork)
brand-assets/starter/       assets carried over from the Replit starter (live-site download)
scripts/prepare_assets.py   originals -> public/brand-assets/*.webp, botanicals, icons, OG image
public/brand-assets/        web-ready WebP: products/ botanicals/ flavors/ lifestyle/ (city/ videos/ later)
src/fonts/                  Against (body) + Abhaya Libre SemiBold (display), via next/font/local
src/app/                    routes; globals.css = design tokens; icon/apple-icon/opengraph-image
src/content/                ALL copy + data: site.ts (master data + integrations), products.ts, home.ts, collection.ts,
                            story.ts, team.ts, city.ts, contact.ts, popup.ts, placeholder.ts
src/lib/enquiry.ts          submitEnquiry(): the ONLY contact-form transport (Formspree, mailto fallback)
src/lib/subscribe.ts        subscribe(): Mailchimp JSONP sign-up
src/components/ui/          shadcn primitives (Button has brand variants `wonder`, `wonder-outline`, size `wonder`)
src/components/brand/       Eyebrow, SectionHeading, TextLink, Lines, BrandMark, SocialLinks/SocialTextLinks,
                            ProductCard, Copy, PageHero (+ Em), PageCta
src/components/layout/      SiteHeader (sticky, active link, Sheet mobile menu), SiteFooter
src/components/email-popup.tsx  §5.1 pop-up, mounted once in layout.tsx
src/components/<page>/      one file per page section: home/ collection/ story/ city/ contact/
```

## How to build a page or section

1. Read the page's spec and acceptance criteria in [references/pages.md](references/pages.md), and the matching brief section.
2. **Put the copy in `src/content/<page>.ts` first.** Use starter wording where it exists. Use client copy where it was supplied. Otherwise use `placeholder()`. Components only read content.
3. Build each section as a component in `src/components/<page>/`, then compose them in `src/app/<route>/page.tsx` in the brief's order. Export `metadata` with a unique title and description.
4. Style only with tokens and brand components (design-system.md). No raw hex values, no one-off colours, and square corners.
5. Give new sections entrance motion: `rise-group` for first-screen content, `{...reveal()}` / `{...revealGroup}` below the fold (design-system.md → Entrance motion).
6. Images go through `next/image` with real `sizes`. Product renders use `mix-blend-multiply` on a `bg-clay` well. Hero is `preload`; everything else is lazy. Alt text names the variety and scene.
7. Verify: `npm run build` (must pass), `npm run lint`, then check at 360/390/768/1440 px with no horizontal scroll (see deploy-and-qa.md for the screenshot recipe). Update `DELIVERY-NOTES.md`.

## Build order (brief §11)

| Phase | Work | Reference |
|---|---|---|
| 1 Foundation | tokens, fonts, shared components, header/footer, content files | design-system.md (**done**) |
| 2 Core pages | Home, The Collection, Our Story, In the City, Contact (**all built**; awaiting client copy) | pages.md |
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
