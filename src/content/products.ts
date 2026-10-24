// The five Wonder Beauty Bars, in the order of the client's website brief deck (slides 2, 17, 21).
// Exactly five. Copy sources:
//   tagline / subLine — slide 21 ("All 5 flavours" table)
//   mood              — slide 17 tagline column (also on slide 20)
//   origin.place      — slide 17 "Origin of the idea"; origin.story — slide 13 (Wonder Room, founder's words)
// `scentNote` and `bestFor` still need client-confirmed copy (slide 17 asks for them); never write
// new benefit claims.

import { placeholder, type Placeholder } from "./placeholder"

export type ProductSlug = "rose" | "lavender" | "aloe-vera" | "lemon" | "coconut"

export type Product = {
  slug: ProductSlug
  variety: string
  name: string
  /** Botanical illustration cropped from the approved dieline (scripts/prepare_assets.py). */
  botanical: string
  /** Approved packaging render on the studio background (6:5). */
  image: string
  /** Display line, e.g. "Meet me in Paris." */
  tagline: string
  /** Supporting line, e.g. "Soft petals, golden hour." */
  subLine: string
  /** Short mood line, e.g. "Softly romantic" — also the title of the variety's concept artwork. */
  mood: string
  /** Where the idea for the scent came from, in the founder's words. */
  origin: { place: string; story: string }
  /** Concept artwork for the variety — AI concept, bare bar, no packaging. */
  artwork: { src: string; alt: string }
  /** Scent description for The Collection — client-confirmed only. */
  scentNote: string | Placeholder
  /** "Best for" line — client-confirmed only. */
  bestFor: string | Placeholder
  /** CSS colour token for the per-flavour accent. */
  accent: string
}

type Input = Omit<Product, "name" | "botanical" | "image" | "scentNote" | "bestFor">

const product = (p: Input): Product => ({
  ...p,
  name: `Wonder Beauty Bar — ${p.variety}`,
  botanical: `/brand-assets/botanicals/${p.slug}.webp`,
  image: `/brand-assets/products/${p.slug}.webp`,
  scentNote: placeholder(`${p.variety} scent description`),
  bestFor: placeholder(`${p.variety} "Best for" line`),
})

export const products: Product[] = [
  product({
    slug: "rose",
    variety: "Rose",
    tagline: "Meet me in Paris.",
    subLine: "Soft petals, golden hour.",
    mood: "Softly romantic",
    origin: {
      place: "Paris, France",
      story: "Paris, the city of love, is where I met my wife. How could I not make a Rose? Soft, romantic and timeless.",
    },
    artwork: { src: "/brand-assets/flavors/rose-editorial.webp", alt: "Rose concept artwork: sculpted rose soaps in a rose-toned set" },
    accent: "var(--botanical-rose)",
  }),
  product({
    slug: "lavender",
    variety: "Lavender",
    tagline: "Countryside romance.",
    subLine: "Purple fields, slow mornings.",
    mood: "Calm in a bar",
    origin: {
      place: "Surrey, UK",
      story:
        "I spent years living in the UK, where I discovered rows of purple lavender stretching to the horizon. Mayfield Lavender in Surrey is one of the best-known lavender fields in the country. That calm, quiet feeling became our Lavender bar.",
    },
    artwork: { src: "/brand-assets/flavors/lavender-royal.webp", alt: "Lavender concept artwork: lavender bars before a field at dusk" },
    accent: "var(--botanical-lavender)",
  }),
  product({
    slug: "aloe-vera",
    variety: "Aloe Vera",
    tagline: "The K-beauty promise.",
    subLine: "Fresh, dewy, minimal.",
    mood: "Fresh, soothing moisture",
    origin: {
      place: "Seoul, Korea",
      story:
        "As a skincare enthusiast, aloe vera had to be part of the collection. Korean skincare introduced me to aloe vera as a staple for soothing, fresh and hydrated-feeling skin.",
    },
    artwork: { src: "/brand-assets/flavors/aloe-freshness.webp", alt: "Aloe Vera concept artwork: a bar among fresh aloe leaves" },
    accent: "var(--botanical-aloe-vera)",
  }),
  product({
    slug: "lemon",
    variety: "Lemon",
    tagline: "An Amalfi sunset.",
    subLine: "Bright, zesty, golden hour.",
    mood: "A citrus afternoon",
    origin: {
      place: "Amalfi, Italy",
      story:
        "Wonder was born in Amalfi, on a sunny afternoon, while I was eating a lemon sorbet. The fresh, bright citrus stopped me in my tracks. I thought: I want my soap to smell like this.",
    },
    // No bar in this artwork yet: the deck asks for soap in all five pictures (see DELIVERY-NOTES).
    artwork: { src: "/brand-assets/flavors/lemon-italy.webp", alt: "Lemon concept artwork: lemons above the Amalfi coast" },
    accent: "var(--botanical-lemon)",
  }),
  product({
    slug: "coconut",
    variety: "Coconut",
    tagline: "Sipping coconuts in Bali.",
    subLine: "Warm, creamy, barefoot.",
    mood: "The island daydream",
    origin: {
      place: "Bali, Indonesia",
      story:
        "Bali was our honeymoon. Warm sand, ocean air and coconut everywhere. I can't imagine travelling without coconut, so it came home with me, in a bar.",
    },
    artwork: { src: "/brand-assets/flavors/coconut-beach.webp", alt: "Coconut concept artwork: a bar on sunlit beach sand" },
    accent: "var(--botanical-coconut)",
  }),
]

export const productSlugs = products.map((p) => p.slug)

export const productBySlug = (slug: string | null | undefined) => products.find((p) => p.slug === slug)
