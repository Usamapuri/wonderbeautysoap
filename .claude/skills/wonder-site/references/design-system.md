# Design system (brief §3), extracted from the Replit starter

Every value here was read from the starter's compiled CSS (`wonder-beauty-soaps--zainabshahid062.replit.app/assets/index-*.css`) and is implemented in `src/app/globals.css`. **Match, don't substitute.** If a new colour seems needed, add it as a token in `globals.css` (`:root` + `@theme inline`) with a comment. Never put a raw hex value in a component.

## Palette (Tailwind class → value)

| Token | Hex | Use |
|---|---|---|
| `paper` | #f6f0e5 | ivory: light text on dark bands, button text. **Not a background** (it reads as white) |
| `ink` | #30251e | text, footer (deep bronze-brown) |
| `ink-soft` | #6b6256 | body copy on cream |
| `ink-muted` | #857968 | captions, small labels |
| `gold` | #9a7131 | antique gold: rules, text-link underline, hover, emphasised headline word |
| `gilt` | #d6c48d | light gold on dark (moss) bands |
| `leaf` | #53664b | primary button, eyebrows, text selection |
| `rose` | #a95e68 | rare accent; placeholder marker |
| `rule` | #3c302233 | hairlines (header/footer borders) |
| `sand` | #e9e2d3 | **PRIMARY cream**: page base (body), header, mobile menu, footer, every hero, pop-up. The site is cream, never white (developer, 2026-10-22) |
| `linen` | #e8dfcf | (spare; too close to sand to separate sections) |
| `stone` | #ded3bc | contrast bands on the cream: botanical edit, then & now, In the City note, Contact social, closing CTAs |
| `clay` | #ded4c0 | product image well |
| `oat` | #e8e0ce | (spare) |
| `moss` | #4e614b | campaign film band (paper text) |
| `fern` | #526c50 | "Recognisable by nature" band, In the City real-photo band |
| `parchment` / `vellum` / `wheat` | #f0ebdf / #eee8dc / #e5dccb | raised surfaces a step lighter than the cream: `.card-pop` gradient (parchment → vellum, hover → wheat), contact-form panel, values cells; `wheat` also for the topline bar and promise strip |
| `shell` | #f0eadd | (spare; the footer is `sand`) |
| `taupe` | #b49b7f | packaging studio background |
| `botanical-{coconut,aloe-vera,lemon,lavender,rose}` | pack colours | **product cards only, sparingly** (e.g. the dot before "VARIETY 01") |

shadcn semantic tokens (`background`, `primary`, `border`, `ring` …) are mapped to the starter's HSL values, so shadcn components inherit the brand automatically. `background` = sand, `card`/`popover` = parchment, `muted` = wheat. `--radius` is 0.5rem and **`rounded-lg` (8px) is the one corner** for cards, buttons, image frames, fields, panels and the pop-up (developer request 2026-10-22; the starter was square). Nested corners stay concentric (outer = 8px + padding, e.g. the film frame). Full-bleed bands and sections stay square.

**Section rhythm:** cream (`sand`) is the default for every section; alternate with `stone` where two cream sections would otherwise meet, or with the dark `moss`/`fern` bands. Cards and panels sit on the cream a step lighter (`parchment`), never on near-white.

## Typography

- Body: **Against** (`font-sans`), 14px base, `letter-spacing: .012em`. Paragraphs are usually `text-xs leading-[1.8–1.9] text-ink-soft`.
- Display: **Abhaya Libre SemiBold** (`font-serif`, or the `font-display` utility = serif, 600, `tracking-[-0.04em]`, `leading-[0.9]`).
- Both fonts are the client's files in `src/fonts/`, loaded with `next/font/local` in `layout.tsx`. Do not swap them for Google Fonts.
- Uppercase labels: 8–10px, `tracking-[0.12em–0.24em]`. The `<Eyebrow>` component renders them; no leading dash/rule (removed 2026-10-22).

| Element | Classes (from starter) |
|---|---|
| Hero h1 | `font-display text-[clamp(60px,8.4vw,128px)] leading-[0.79] tracking-[-0.045em]`; 850px: `clamp(70px,13vw,118px)`; 560px: `clamp(66px,17vw,94px)`; emphasised word `text-gold not-italic` |
| Page h1 (inner pages) | `font-display text-[clamp(68px,9vw,132px)] leading-[0.8] tracking-[-0.055em]` |
| Section h2 | `font-display text-[clamp(43px,5.2vw,76px)] leading-[0.93]` (via `<SectionHeading>`) |
| Band/editorial h2 | `font-display text-[clamp(44px,5vw,70px)]`–`clamp(47px,5.3vw,78px)` |
| CTA h2 | `font-display text-[clamp(48px,7vw,92px)] tracking-[-0.045em]` |
| Card title | `font-display text-[25px] sm:text-[28px] leading-[0.95] tracking-normal` |
| Eyebrow | `text-[9px] uppercase tracking-[0.24em] text-leaf` (no rule) |
| Nav link | `text-[10px] uppercase tracking-[0.16em]`, hover/active gold |
| Caption on photo | `text-[9px] uppercase tracking-[0.15em] text-paper` + text shadow, over a bottom scrim `after:bg-linear-to-t after:from-ink/55` |

## Layout & spacing

- Breakpoints are overridden to the starter's: **`sm` = 560px, `md` = 850px**. `lg`/`xl` are Tailwind defaults. Mobile-first: unprefixed = phone.
- Section padding: `px-section` (clamp 22–128px), `py-section` (clamp 82–115px).
- Header: sticky, `h-(--header-height)` (74px, 66px ≤850px), `bg-paper/95 backdrop-blur-md border-b border-rule`. A 34px `oat` topline sits above it.
- Card grids are **aligned** (no staggered offsets; developer request 2026-10-22): equal columns, cards in a row share a height (`h-full` + `flex-col`, CTA `mt-auto`). A short last row is centred: grids of 5 use `flex flex-wrap justify-center` with fixed widths (1/2/3 per row), and a lone 5th card on a 2-col phone grid sits centred at one column's width.
- **Images fit their frames**: give each frame its image's own aspect ratio (product renders `aspect-[6/5]`, square concept art `aspect-square`, portrait lifestyle photos `aspect-[2/3]`, page-hero photos `aspect-[3/2]`) so nothing important is cropped and no gaps/mats show. For a row of mixed photos, size columns by aspect ratio (`grid-cols-(--cols)` with `<w/h>fr` per photo, see `home/retail-strip.tsx`) so they share one height uncropped.
- Framed images: an offset gold hairline frame behind or around the photo (`after:border after:border-gold`, offset 12–17px).
- Decorative gold hairline circles in the `sand` range section (`border-gold/25 rounded-full`, off-canvas top-left).
- Usable at 360px wide, with no horizontal scroll and tap targets ≥ 40px (`min-h-10` / `size-10`).

## Shared components (build once, reuse)

| Component | File | Notes |
|---|---|---|
| Header/nav | `layout/site-header.tsx` | client; active link via `usePathname`; shadcn `Sheet side="top"` for mobile; nav order from `site.ts` |
| Footer | `layout/site-footer.tsx` | wordmark, `mailto:` email, social icons (new tab), nav, small print |
| Button | `ui/button.tsx` | `variant="wonder"` (leaf solid; deeper-green slanted fill sweeps in on hover) / `"wonder-outline"` (gold outline; gold fill sweeps in, text turns paper), `size="wonder"`, rounded-lg, 2px lift + `shadow-pop` on hover; use `asChild` + `next/link`. On dark bands override `[--btn-fill:var(--gilt)]` + text colours (see `contact/bulk-cta.tsx`) |
| Text link | `brand/text-link.tsx` | uppercase, gold underline, optional arrow; `light` on dark bands |
| Eyebrow | `brand/eyebrow.tsx` | `tone` leaf / gilt / muted, `center` |
| Section heading | `brand/section-heading.tsx` | eyebrow + h2 lines + intro |
| Product card | `brand/product-card.tsx` | render in `bg-clay` well with multiply, "VARIETY 0n", name, note, *View →* `/collection#slug` |
| Copy | `brand/copy.tsx` | prints content; placeholders render as a dashed rose box |
| Social links | `brand/social-links.tsx` | `simple-icons` paths (lucide has no brand icons) |
| Still to build | — | timeline item, gallery grid, then-and-now pair, team card, email pop-up, contact form (see pages.md / features.md) |

## Polish layer (the original's late overrides, ported)

`shadow-lift` on `wonder` buttons · `shadow-note` on the hero badge · cards use `.card-pop` (rounded-lg, hairline border, warm gradient surface; on hover lift 6px, `shadow-pop`, gold-tinted border, gradient slides a shade warmer, image zooms 1.04) · photo tiles with captions on the image use `.tile-pop` (lift + soft gilt sheen; captions need `z-10`) · framed images get `rounded-lg` + `shadow-card` · nav links draw a 1px gold underline from the left on hover and keep it on the current page (text stays ink) · hero copy and image `rise-in` (14px, staggered 60/130/200/270ms, image 0.85s at 200ms; delays set inline) · footer on `bg-sand` · header hairline `border-header-rule`. Reduced motion is honoured globally.

## Entrance motion

- **First screen** (Home hero, page heroes, Collection heading, Contact layout): add the CSS class `rise-group` to the parent. Its children rise in on load, staggered 60/130/200/270/340 ms. Hero images use `animate-[rise-in_0.85s_0.2s_both]`. No JS is involved, so LCP isn't held back by hydration.
- **Everything below the fold** fades up 36px when scrolled into view: spread `{...reveal(delayMs?)}` from `@/lib/reveal` onto a block, or `{...revealGroup}` onto a container to stagger its children 90 ms apart. Side-by-side pairs use `reveal()` + `reveal(120–150)`. Long lists (collection rows, gallery cards, timeline items) reveal per item, not as one group.
- `<RevealObserver />` (mounted once in `layout.tsx`) runs a single IntersectionObserver and adds `data-revealed`. A MutationObserver catches content added later. Next 16 keeps visited routes mounted but hidden, and their elements reveal when shown again.
- Content is only hidden when `html.js` is set (inline head script) **and** motion is allowed, and the script drops `js` if the observer hasn't started within 3 s. So no-JS, reduced-motion and failed-JS visitors always see everything.
- **Page transitions:** `src/app/template.tsx` wraps every page in React's `<ViewTransition enter="page-enter" exit="page-exit">`. The template remounts on each route change, so the old page fades out (160 ms) and the new one fades up (560 ms); CSS lives under "Page transitions" in `globals.css`. Search-param/hash changes don't animate. Browsers without view transitions just swap pages; reduced motion disables it.
- The animations use `transform`/`opacity`, so hover effects stay on `translate`/`scale`. Don't put `reveal()` on an element whose `mix-blend-multiply` image blends with a background *outside* it: the animation's stacking context would isolate the blend. Put it on a wrapper that contains the background.

## Mood & imagery

"A little everyday wonder." Premium but warm: botanical, calm, unhurried. No loud colours, no discount energy, no clip-art, corners stay a restrained rounded-lg (no pills or big "app" radii). Product imagery is always on the taupe studio look. One botanical per variety, everywhere that variety appears. Campaign imagery uses a warm grade with no blue casts, and verticals on In the City. Motion is calm: marquee, scroll reveals, page fade transitions, card lift + slow image zoom on hover, 2px button lift with a fill sweep. Reduced motion is respected globally in `globals.css`.
