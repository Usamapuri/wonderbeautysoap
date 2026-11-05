# Design system (Royal Basket × Wonder, 2026-10-25)

Source of truth for every visual decision. Tokens live in `src/app/globals.css`; use them, never raw hex in components. The theme is the client's **Bolt prototype** (the developer pasted its CSS); layouts follow the developer's references: **Home after gisou.com**, **Our Story after rhode's About page**. Brand = **Royal Basket (Group)**; Wonder is the soap.

## Palette

| Token | Value | Use |
|---|---|---|
| `paper` / `sand` | #f6f2e8 | page base (cream, never white) and light text on dark bands |
| `ink` | #25231d | text, primary buttons, top bar, footer, ink panels |
| `ink-soft` / `ink-muted` | #5c574d / #777064 | body copy / captions, labels |
| `gold` | #8f7130 | readable gold on cream: taglines, eyebrows, emphasis, links, rules |
| `gilt` | #d7b45d | bright gold: stars, selection, labels and accents on **ink** bands |
| `bronze` / `bronze-glow` | #8a6e46 / #c4a676 | the `bronze-glow` statement bands (hero, closing CTAs, bulk panel) |
| `stone` | #ece4d3 | alternate light band |
| `parchment` / `vellum` / `wheat` | #efe8d8 / #ebe3d1 / #e4d9c3 | cards and panels (the Bolt review card), card gradient, card hover end |
| `clay` | #e6dcc8 | image wells |
| `line` | #dcd2bf | card borders, ruled lists |
| `rose` | #a95e68 | placeholder / sample markers only |
| `botanical-*` | per flavour | the small accent dot only (deck: "each flavour can have its own accent colour") |

shadcn tokens map onto these (`background` = paper, `card`/`popover` = parchment, `primary` = ink, `ring` = gold, `border` = line).

**Section rhythm:** cream by default; `stone` where two cream sections would meet; `ink` and `bronze-glow` for statement moments. Labels are `gold` on cream, `gilt` on ink, `cream` on bronze (gold is too faint there).

## Type

- **DM Serif Display** (`font-display` = serif, 400, `tracking-[-0.025em]`, `leading-[0.95]`) for display; italic for emphasis ("*Lather.*").
- **DM Sans** for everything else. Both self-hosted in `src/fonts/` via `next/font/local`, with `size-adjust` (132% sans, 92% serif) so the existing `text-[9px]…text-[13px]` scale reads at a normal size. Don't "fix" small-looking class values without checking the rendered size.
- Eyebrows: `<Eyebrow>` (9px, medium, uppercase, 0.24em). Tones: `gold` (default), `gilt`, `cream`, `muted`. No leading dash. A trailing full stop is dropped automatically.
- Taglines (e.g. "Meet me in Paris.") are always `font-display italic text-gold`.

## Corners, surfaces, hover

- **`rounded-lg` (8px) is the one corner** for cards, buttons, image frames, fields, panels. Nested corners stay concentric. Full-bleed bands stay square.
- `.card-pop`: parchment gradient card with a `line` border; hover lifts 6px, deepens the shadow, warms the border, slides the gradient a shade darker; the image zooms 1.04.
- `.tile-pop`: rounded photo tile with the caption on the image; hover lifts and fades in a gilt sheen (captions need `z-10`).
- `.bronze-glow`: the Bolt radial gradient, with paper text.

## Buttons (consistency rules, developer 2026-10-25)

| Variant | Use |
|---|---|
| `wonder` | **Primary**: solid ink, bronze fill sweeps in on hover. Bulk orders is the site's one goal, so it's usually this. |
| `wonder-outline` | Secondary on light backgrounds: ink outline, ink fill sweeps in. |
| `wonder-light` | Secondary on bronze/ink/photo backgrounds: cream outline, cream fill sweeps in. |

All use `size="wonder"`, `asChild` + `next/link`. Never use an underlined text link as a call to action next to buttons. Inside cards, the small "Discover →" link is the card affordance.

## Layout

- Breakpoints: **`sm` = 560px, `md` = 850px** (Tailwind `lg` = 1024px for 3-up grids). Mobile-first.
- `px-section` / `py-section` for section padding. rhode-style pages use inset rounded panels with 12/20px gutters (`px-3 pt-3 sm:px-5 sm:pt-5`).
- Card grids are aligned: equal widths, cards in a row share a height, a short last row is centred (`flex flex-wrap justify-center`).
- **Images fit their frames:** each frame takes its image's own aspect ratio (packs `6/5`, concept art square, portraits `2/3`, the lineup `1800/1020`). Rows of mixed photos use `<PhotoRow>` (columns sized by aspect ratio, shared height, nothing cropped).
- Header: ink top bar (taglines), then the sticky cream header (Royal Basket Group logo, five tabs, The Collection dropdown of the 5 bars, solid "Bulk orders" button ≥1024px). It compacts with a soft shadow once scrolled.
- Footer: ink, aligned four-column grid, giant faint "Royal Basket" wordmark (rhode style).
- Phones: a floating "For orders, speak to us" bar + back-to-top appears after the first screen and steps aside at the footer (`floating-actions.tsx`); not on Get in Touch.

## Motion (all off for reduced motion; nothing hidden without JS)

- **First screen:** `rise-group` on the parent (children rise in on load). Hero images `animate-[rise-in_…]`.
- **Scroll reveals:** `{...reveal(delay?)}` / `{...revealGroup}` from `@/lib/reveal`; `<RevealObserver />` marks blocks `data-revealed`.
- **Text:** display headings use `<SplitText text … />` (or `<Lines lines … />`, which splits too): each word rises out of a mask. Inside a reveal block they play when it scrolls in; pass `now` for first-screen headings. Screen readers get the plain text. Eyebrows inside revealed blocks settle in from wide tracking; photos ease out of a slight zoom.
- **Page transitions:** `src/app/template.tsx` + React `<ViewTransition>` (old page fades out, new fades up).
- **Ambient:** the promise marquee; the hero pack floats slowly.
- Animations use `transform`/`opacity`; hover uses the `translate`/`scale` properties, so they compose.
