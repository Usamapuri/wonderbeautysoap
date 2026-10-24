# Pages (client website brief deck, 2026-10-25)

Routes: `/` · `/our-story` · `/collection` · `/collection/[slug]` (5 prerendered flavour pages) · `/around-the-world` (`/in-the-city` 308-redirects here) · `/contact` (tab label "Get in Touch"). Each page composes section components from `src/components/<area>/`, reads copy from `src/content/<page>.ts`, and exports `metadata` (titles render as "… — Royal Basket").

Copy rule: the deck's own text (or existing site text shown in its screenshots). Missing content → `placeholder()` (rendered by `<Copy>`) + a line in `DELIVERY-NOTES.md`. Every call to action is bulk orders (`ordersCta`).

## Home `/` — deck slides 3–9, Gisou layout (`components/home/`, `content/home.ts`)

Hero (Bolt opening "Scent. / *Lather.* / Wonder.", kept as the client asked) → promise marquee (brand promises) → Welcome note 1 (split into short lines, portrait photo) → campaign film banner (poster until an AI video is supplied) → Welcome note 2 (design statement, eco-friendly box packaging split banner, closing line) → all 5 flavours collage ("Every scent tells a story" / "Wonder, wherever you are.") → Mission + Vision panels → the five product cards → where Wonder is sold (real photos → Around the World) → reviews at the end ("Kind words, well lathered.", samples marked) → closing band.

## Our Story `/our-story` — deck slides 10–16, rhode layout (`components/story/`, `content/story.ts`)

Hero panel ("Our Story") → Who we are (centred note) → Our values (picture + ruled list of 5) → Why Wonder? (the three-cell `ValuesBand` the client liked) → Wonder Room (carousel of the 5 origin stories) → A note from the founder (centred, signed) → CEO's promise (split panel; draft awaiting approval) → team (hidden while `team.ts` is empty) → closing band.

## The Collection `/collection` — slides 17, 21 (`components/collection/`, `content/collection.ts`)

Heading + on-pack formula line + cosmetic safety report (placeholder until the PDF arrives) → the lineup → aligned grid of 5 cards (pack, name, tagline, sub-line, origin, "For orders, speak to us", "Discover"). Order: Rose, Lavender, Aloe Vera, Lemon, Coconut.

## Flavour page `/collection/[slug]` — slide 17 "each product page needs…" (`components/bar/`)

Definition: whole pack, name, tagline + sub-line (slide 21), origin of the idea (slide 17), scent and "Best for" (placeholders), on-pack lines, bulk button (pre-fills bar + "Bulk order") → History: the founder's origin story (slide 13) beside the flavour's concept art → "All 5 flavours" (the other four cards) → bulk-orders band. Unknown slugs → not found. Every flavour link on the site (nav dropdown, cards, collage, Wonder Room, footer, Around the World) opens these pages via `barHref(slug)`.

**Instant navigation:** everything that reads `params` sits under `<Suspense fallback={<BarSkeleton />}>` (the route's App Shell under Partial Prefetching), and every flavour link uses `<Link prefetch>` so the slug resolves before the click. Without this the dev overlay shows the "URL data outside of Suspense" Insight and clicks wait on the server. Use the same pattern for any future dynamic route.

## Around the World `/around-the-world` — slide 18 (`components/world/`, `content/world.ts`)

Bronze hero "Wonder, wherever you are." → real photographs grouped by place (London; Store visits — location to confirm) → five scent origins (concept art + AI disclaimer) → "Available in" (countries + video reel placeholders) → "Don't see your country yet? Talk to us." + follow links.

## Get in Touch `/contact` — slide 19 (`components/contact/`, `content/contact.ts`)

"Let's talk." → one enquiry card: bronze bulk brief (left: what to include, email) + the form (right: defaults to "Bulk order"; `?type=` / `?product=` pre-fill), one frame with a gold top bar → aligned details strip (reply line, good to know; phone/WhatsApp/address once supplied) → "Wonder, in your feed." (socials). Address/map hidden until supplied. Footer line everywhere: "Made with care, from us to you."

## Acceptance (every page)

Builds and prerenders; no horizontal scroll at 360/390/768/1440; no console errors; reveals fire on scroll; buttons follow the three-variant rule; labels/taglines use the palette rules; images fit their frames; nothing invented; placeholders and samples listed in DELIVERY-NOTES.
