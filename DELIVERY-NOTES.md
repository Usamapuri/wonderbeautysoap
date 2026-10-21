# Delivery notes

Open placeholders, interim assets and decisions, per brief §0 rule 3. Keep this current: the site cannot launch while anything under "Open placeholders" is reachable (`grep -r "placeholder(" src/content`).

## Status

| Phase | State |
|---|---|
| 1 Foundation (tokens, fonts, header/footer, shared components, content files) | Done |
| 2 Pages: Home, The Collection, Our Story, In the City, Contact | Built. Awaiting client content (below) |
| 3 §6 AI campaign set (real packaging composited) | Not started. In the City runs on interim concept art |
| 4 Email pop-up (Mailchimp) + contact form (Formspree) | Built and tested against mocked endpoints. Needs the client's real endpoint IDs |
| 5 Content load + client sign-off | Waiting on client (§10) |
| 6 QA & go-live | Not started |

Verified on the production build: every route returns 200 and prerenders statically · no horizontal scroll at 360/390/768/1440 px on any page · 30/30 behaviour checks pass (form validation, `?product=`/`?type=bulk` pre-fill, bulk CTA, Formspree success/failure/retry + subject pattern, collection anchors, pop-up timing/ESC/backdrop/30-day snooze/2-impression cap/contact suppression/mobile bottom sheet/Mailchimp JSONP).

## Deployment

- **Review URL:** https://wonder-beauty-soap.vercel.app, deployed 2026-10-21 with the Vercel CLI (`vercel deploy --prod`) to the developer's Hobby team (`abdullah-yaqoobs-projects/wonder-beauty-soap`). No custom domain; Spaceship DNS untouched.
- `*.vercel.app` hosts send `X-Robots-Tag: noindex` (`next.config.ts`), so the placeholder-bearing review URL stays out of search. The custom domain is unaffected. `.vercelignore` keeps `brand-assets/`, `scripts/` and `.claude/` out of the upload.
- **Not Git-connected yet:** linking `Usamapuri/wonderbeautysoap` failed because Vercel's GitHub app isn't installed on that account. Until it is (repo owner installs it, then `vercel git connect`), redeploy with `vercel deploy --prod` from a clean `main`.
- **Before launch (§7.2):** transfer the project to the client-owned Vercel team (Project → Settings → Transfer), then add the env vars below and the domain.

## Open placeholders (client to supply, §10)

| Page | Content file | Placeholder |
|---|---|---|
| The Collection | `src/content/products.ts` | Scent/ingredient note for all 5 bars |
| The Collection | `src/content/products.ts` | Who it's for / skin feel for all 5 bars |
| Our Story › Timeline | `src/content/story.ts` | 2019 first-bar story · early years (first packaging, first stockist/order) · when the range grew to five · why the rebrand happened |
| Our Story › Rebrand | `src/content/story.ts` | The rebrand narrative (why the new identity and packaging) |

## Needs client approval or input

- **Our Story founder note**: the starter's wording is used as-is (`story.founder`). It adds detail beyond the brief's facts (eczema, families and babies), so it needs the client's written approval (§10).
- **Team**: `src/content/team.ts` is empty, so the section is hidden. Needs photo, name, role, one-line bio and consent per person.
- **Then & Now**: uses crops of the client's own photos showing the genuine old Coconut and Rose packs. Request front-on photos of every pre-rebrand variety (drop them in `brand-assets/source/old-packaging/<slug>.jpg` and re-run `scripts/prepare_assets.py`).
- **Contact**: minimum order quantity, response-time wording, and phone/WhatsApp/address are all hidden until supplied (`src/content/contact.ts`, set from `null`).
- **Pop-up**: headline/copy approval; incentive line (none until approved) in `src/content/popup.ts`.
- **Retail/real photos** (Home retail strip, Home brand intro, In the City "Wonder, as it is."): real photos showing the **old packaging**. Confirm the client is happy to show them, and whether any retailer may be identified.
- **Bestseller**: affects §6 scene emphasis.
- **Dieline back-panel text** (ingredients, "Paraben Free", "Germ Protection", Rs. 150, 125 g) is deliberately not published. It needs explicit approval (§0 rule 4, §13 #10), and prices are out of scope regardless.
- "Good to know: no medical advice" line on Contact is starter wording. Keep unless the client objects.

## Integrations to wire before launch (§9)

- **Formspree**: set `NEXT_PUBLIC_FORMSPREE_ID` (Vercel env var). Until set, the contact form falls back to opening a pre-filled email draft to hello@ (it still works, but this isn't the launch behaviour).
- **Mailchimp**: set `NEXT_PUBLIC_MAILCHIMP_ACTION` to the audience's embedded-form action URL. Until set, the pop-up shows its error state on submit. **Launch blocker.**
- After setting both, send real test submissions per §5 acceptance (each enquiry type → hello@, sign-up appears in the audience).

## Interim assets

- **In the City gallery**: the starter's concept art (`flavors/*`: bare bars, no packaging), labelled as AI concepts, with the disclaimer on the page. Replace with the §6 set (`/brand-assets/city/<scene>-<variety>.webp`, real packaging composited) in `src/content/city.ts`.
- **The Collection "imagined world" strips** use the same starter concept art per variety.
- **Home campaign film**: poster only. The mp4 isn't on the starter's live deployment, so get it from the Replit source export, put it in `public/brand-assets/videos/`, and set `home.film.src`.
- **Logo**: the starter's text wordmark is used until the client's SVG arrives. Favicon/app icon = W monogram cropped from the dieline.

## Decisions

**2026-10-21: replicate the original site** (https://wonder-beauty-soaps--zainabshahid062.replit.app/). Where the brief and the original disagree, the original wins, except for the client's change requests and anything that would publish AI-drawn packaging:
- **Home** = the original's sections and order (Botanical Edit with 3 concept photos, "Recognisable by nature" London band, "Beauty belongs in the everyday" aloe band). Brief additions kept: the on-pack promise strip under the hero, and the bulk-order CTA. The brief's 5-botanical panel and city teaser were removed. Botanical illustrations still appear on The Collection.
- **Nav** = original order and labels (Home · In the city · Our story · The collection · Contact). Hero link = "Discover Wonder".
- **In the City** = the original's 2-column card layout, filled with the safe concept images (bare bars). The original's 4 images with AI-drawn packs are still excluded (brief §6). Original closing CTA ("Find your Wonder.") plus Instagram/TikTok links.
- **Our Story** = the original page (hero, founder note, values band, CTA) with the brief's timeline, Then & Now, rebrand and team inserted before the CTA.
- **Polish layer ported from the original:** button and badge shadows, product-card hover lift, animated nav underline, hero rise-in animation, tinted footer band, exact surface colours. The gold frames behind the In the City hero and the Home brand-intro photo are not used, because they don't render on the original.
- **Scroll fade-in animations** (2026-10-21, developer request; not in the original): sections fade up as they scroll into view, and first-screen content rises in on load. Disabled for reduced-motion users, and nothing is hidden without JS.
- The original's campaign video is broken on its own deployment too (the mp4 URL returns HTML), so the poster-only frame matches what visitors see there.

- **Stack:** Next.js 16 + shadcn/ui + Tailwind v4 instead of the starter's Vite SPA (developer decision; overrides brief §7). Vercel preset is Next.js, and no SPA rewrite is needed.
- **Starter `campaign/*.webp` not used anywhere.** Those images show AI-drawn packs (brief §6). Kept in `brand-assets/starter/campaign/` for reference only.
- **Card notes and mood lines** use the starter's Collection copy (e.g. "A familiar tropical note, in illustrated form." / "The island daydream").
- Closing CTA *For bulk orders, talk to us* → `/contact?type=bulk`.
- Contact layout: details → bulk panel in the left column, form on the right (stacked in that order on phones), matching the brief's order.
