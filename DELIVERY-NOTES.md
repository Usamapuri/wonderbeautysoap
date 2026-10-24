# Delivery notes

Open placeholders, samples, interim assets and decisions, per brief §0 rule 3. Keep this current: the site cannot launch while anything under "Open placeholders" or "Samples" is reachable (`grep -rn "placeholder(\|sample: true" src/content`).

## Status (2026-10-25)

| Area | State |
|---|---|
| Redesign to the client's Wonder_Website_Brief.pptx | Done: five tabs, deck copy, Bolt theme, Gisou-style Home, rhode-style Our Story, per-flavour pages |
| Brand | Royal Basket (Group) is the site's brand; Wonder is the soap |
| Focus | Bulk orders only: every call to action leads to the bulk-order enquiry |
| Contact form (Formspree) | Built; defaults to "Bulk order". Needs the client's Formspree ID |
| Email pop-up (Mailchimp) | Built. Needs the Mailchimp action URL (see "Decisions" — consider removing for a bulk-only site) |
| Client content | Waiting on the items below |
| QA & go-live | Preview QA passing; DNS not started |

Verified on the production build (motion + layout suites): every route returns 200 and prerenders statically (incl. the five `/collection/<flavour>` pages) · no horizontal scroll at 360/390/768/1440 px · no console errors · scroll reveals fire as blocks reach the screen · header dropdown → flavour page shows definition + history · the flavour page's bulk button pre-fills the form (Bulk order + bar) · the form defaults to Bulk order · only the three brand button variants are used · page transitions run · nothing hidden with reduced motion · `/in-the-city` 308-redirects to `/around-the-world` · headings reveal word by word (on load / on scroll) · the header compacts on scroll · the phone bulk bar shows after the first screen, hides at the footer and stays off Get in Touch.

## Deployment

- **Review URL:** https://wonder-beauty-soap.vercel.app, deployed with the Vercel CLI (`vercel deploy --prod`) to the developer's Hobby team (`abdullah-yaqoobs-projects/wonder-beauty-soap`). No custom domain; Spaceship DNS untouched.
- `*.vercel.app` hosts send `X-Robots-Tag: noindex` (`next.config.ts`). `.vercelignore` keeps `brand-assets/`, `scripts/` and `.claude/` out of the upload.
- **Not Git-connected:** Vercel's GitHub app isn't installed on the `Usamapuri` account. Until it is (repo owner installs it, then `vercel git connect`), redeploy with `vercel deploy --prod` from a clean `main`.
- **Before launch (§7.2):** transfer the project to the client-owned Vercel team, then add the env vars below and the domain.

## Open placeholders (client to supply, §10)

| Where | Content file | Placeholder |
|---|---|---|
| Each flavour page | `src/content/products.ts` | Scent description, all 5 bars (deck slide 17) |
| Each flavour page | `src/content/products.ts` | "Best for" line, all 5 bars (deck slide 17) |
| The Collection | `src/content/collection.ts` | Cosmetic safety report (PDF) — set `safetyReport.href` (deck slide 21) |
| Around the World | `src/content/world.ts` | List of countries where Wonder is available (slide 18) |
| Around the World | `src/content/world.ts` | Short video reel: customer and retailer clips (slide 18) |
| Around the World | `src/content/world.ts` | City / country of the store photos ("Store visits") |

## Samples (must be replaced or removed before launch)

- **Reviews** (Home, "Kind words, well lathered."): the three reviews come from the client's Bolt prototype and are marked "Sample review" on the page (`sample: true` in `src/content/reviews.ts`). Replace with real reviews the customers agreed to have published, then set `sample: false`; or delete them (the section hides when the list is empty). Never publish invented reviews as real.

## Needs client approval or input

- **CEO's promise** (Our Story): the deck marks it "Draft wording. Ali to approve." Shown on the preview as written.
- **A note from the founder** (Our Story): taken from deck slide 15, which is a hidden slide. Confirm it is final.
- **Lemon picture**: the deck asks for the soap to show in all 5 flavour pictures (slide 30). Coconut, Aloe Vera, Lavender and Rose show a bar; the Lemon (Amalfi) concept shows no bar. Needs a new Lemon picture (concept art with a plain bar, or a real photo).
- **New images / AI video**: the deck asks for a new hero picture, new images and AI videos (slides 21, 23, 26, 31). None were supplied, so the hero uses the Lemon pack render and the campaign band uses the bath poster. Drop a video in `public/brand-assets/videos/` and set `home.film.src`.
- **Address and map** (Get in Touch, slide 19): not supplied, so hidden (`contact.details.address`).
- **Team** (Our Story, slide 2): `src/content/team.ts` is empty, so the section is hidden.
- **Real photographs** (Home, Around the World) show the **previous packaging**. Confirm the client is happy to show them, and whether any retailer may be identified. One basket photo shows third-party brands.
- **Contact**: minimum order quantity, response-time wording, phone/WhatsApp are hidden until supplied.
- **Dieline back-panel text** (ingredients, "Paraben Free", prices, weights) is deliberately not published (§0 rule 4).
- **Environmental claim**: "eco-friendly box packaging … helps reduce our carbon footprint" is the client's own wording (slide 6). Advise the client to keep evidence for it.

## Integrations to wire before launch (§9)

- **Formspree**: set `NEXT_PUBLIC_FORMSPREE_ID`. Until set, the form falls back to opening a pre-filled email draft to hello@.
- **Mailchimp**: set `NEXT_PUBLIC_MAILCHIMP_ACTION`. Until set, the pop-up shows its error state on submit.

## Interim assets

- **Flavour artwork** (collage, Wonder Room, flavour pages, Around the World origins): the starter's concept art (bare bars, no packaging), always labelled as AI concepts. Never use the starter's `campaign/*.webp` (AI-drawn packs, brief §6).
- **Logo**: the Royal Basket Group logo from the deck (slide 22), keyed to transparency by `scripts/prepare_assets.py` (source: `brand-assets/source/logos/royal-basket-group.png`). Swap in a vector file when the client sends one. Favicon/app icon are generated from it.

## Decisions

**2026-10-25: rebuild to the client's website brief deck** (`Wonder_Website_Brief.pptx`, repo root):
- **Copy** is the deck's own text, or the existing site text visible in the deck's screenshots (developer: "use all texts strictly"). Long paragraphs are split into short lines, as the deck allows ("you can break it down, no paragraphs"). Section labels like "Our mission" restate the deck's headings.
- **Structure** = the deck's five tabs: Home · Our Story · The Collection (dropdown of the 5 bars) · Around the World (was In the City; old URL redirects) · Get in Touch.
- **Brand = Royal Basket** (developer, 2026-10-25): Royal Basket Group logo in the header and footer, page titles "… — Royal Basket", icons from the logo. Wonder stays the soap.
- **Bulk orders only** (developer, 2026-10-25): header button "Bulk orders", every closing band and flavour page leads to `/contact?type=bulk` (pre-filling the bar where known), the form pre-selects "Bulk order". The consumer newsletter pop-up is still on — remove `<EmailPopup />` from `src/app/layout.tsx` if it doesn't suit a bulk-only site.
- **Flavour pages** `/collection/<flavour>` (deck slide 17 "each product page needs…"): pack photo, name, tagline + sub-line (slide 21), origin of the idea (slide 17), the founder's origin story (slide 13), scent and "Best for" (to supply), bulk button. Every flavour link on the site opens them.
- **Product order** = the deck's: Rose, Lavender, Aloe Vera, Lemon, Coconut.
- **Theme** = the client's Bolt prototype (developer pasted its CSS): cream #f6f2e8, ink #25231d, gold #d7b45d, bronze glow for statement bands; DM Serif Display + DM Sans (self-hosted, `size-adjust` keeps the existing type scale). The Bolt opening ("Scent. Lather. Wonder.") is kept as the client asked (slide 4).
- **Layout references** (developer): Home after gisou.com, Our Story after rhode's About page. The "Why Wonder?" three-cell band keeps the design the client liked.
- **Consistency rules** (developer, 2026-10-25): primary action = solid ink button; secondary = outline (ink on light, cream on dark); no text links as calls to action; taglines always gold, the per-flavour accent only as a small dot; labels gold on cream, gilt on ink, cream on bronze.
- **Motion & UX pass** (developer, 2026-10-25): display headings reveal word by word (`SplitText` / `Lines`; first-screen headings on load, the rest on scroll), eyebrows settle in from wide tracking, photos ease out of a slight zoom, the hero pack floats; the header compacts with a shadow on scroll; phones get a floating "For orders, speak to us" bar + back-to-top after the first screen (not on Get in Touch); "Skip to content" link. All motion is off for reduced motion.
- **Get in Touch layout** (developer, 2026-10-25: the bulk card "looked isolated"): the bulk brief and the form are now one enquiry card (bronze brief left, form right, one frame and gold top bar); the reply line and good-to-know sit in an aligned strip below; socials in the closing band. The separate "Start a bulk enquiry" button was removed (the form beside it already defaults to Bulk order).
- **Removed** with the old structure: the timeline, Then & Now and rebrand sections (placeholder-heavy, not in the deck), the old founder copy, the In the City concept gallery, the W monogram lock-up.

Earlier decisions still in force: Next.js 16 + shadcn/ui + Tailwind v4 stack; rounded-lg corners; aligned card grids; image frames at each image's own aspect ratio; scroll reveals and page fade transitions (reduced-motion safe, nothing hidden without JS).
