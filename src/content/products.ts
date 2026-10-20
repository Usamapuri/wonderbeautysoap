// The five Wonder Beauty Bars, in brief order (§4.3, Appendix A). Exactly five — do not add or reorder.
// `note` and `mood` are the Replit starter's wording. `scentNote` and `skinType` must be
// client-confirmed copy (§10); never write new benefit claims.

import { placeholder, type Placeholder } from "./placeholder"

export type ProductSlug = "coconut" | "aloe-vera" | "lemon" | "lavender" | "rose"

export type Product = {
  slug: ProductSlug
  variety: string
  name: string
  /** Botanical illustration cropped from the approved dieline (scripts/prepare_assets.py). */
  botanical: string
  /** Approved packaging render on the taupe studio background. */
  image: string
  /** One-line note (starter copy). */
  note: string
  /** Mood line for the variety's imagined world (starter copy). */
  mood: string
  /** Starter concept artwork for the variety — AI concept, bare bar, no packaging. */
  artwork: { src: string; alt: string }
  /** Scent / ingredient note for The Collection — client-confirmed only. */
  scentNote: string | Placeholder
  /** Who it is for / skin feel — client-confirmed only. */
  skinType: string | Placeholder
  /** Tailwind colour token for the sparing per-variety accent. */
  accent: string
}

const product = (
  slug: ProductSlug,
  variety: string,
  note: string,
  mood: string,
  artwork: Product["artwork"],
  accent: string,
): Product => ({
  slug,
  variety,
  name: `Wonder Beauty Bar — ${variety}`,
  botanical: `/brand-assets/botanicals/${slug}.webp`,
  image: `/brand-assets/products/${slug}.webp`,
  note,
  mood,
  artwork,
  scentNote: placeholder(`${variety} scent/ingredient note`),
  skinType: placeholder(`${variety} — who it is for / skin feel`),
  accent,
})

export const products: Product[] = [
  product(
    "coconut",
    "Coconut",
    "A familiar tropical note, in illustrated form.",
    "The island daydream",
    { src: "/brand-assets/flavors/coconut-beach.webp", alt: "Coconut campaign concept: a bar on sunlit beach sand" },
    "bg-botanical-coconut",
  ),
  product(
    "aloe-vera",
    "Aloe Vera",
    "A botanical classic in the Wonder range.",
    "A moment of freshness",
    { src: "/brand-assets/flavors/aloe-freshness.webp", alt: "Aloe Vera campaign concept: a bar among fresh aloe leaves" },
    "bg-botanical-aloe-vera",
  ),
  product(
    "lemon",
    "Lemon",
    "Bright citrus character for an everyday bar.",
    "A citrus afternoon",
    { src: "/brand-assets/flavors/lemon-italy.webp", alt: "Lemon campaign concept: lemon trees on the Amalfi coast" },
    "bg-botanical-lemon",
  ),
  product(
    "lavender",
    "Lavender",
    "An illustrated take on a much-loved bloom.",
    "The evening garden",
    { src: "/brand-assets/flavors/lavender-royal.webp", alt: "Lavender campaign concept: lavender bars before a field at dusk" },
    "bg-botanical-lavender",
  ),
  product(
    "rose",
    "Rose",
    "Soft floral character with a recognisable pack.",
    "Softly romantic",
    { src: "/brand-assets/flavors/rose-editorial.webp", alt: "Rose campaign concept: sculpted rose soaps in a rose-toned set" },
    "bg-botanical-rose",
  ),
]

export const productSlugs = products.map((p) => p.slug)

export const productBySlug = (slug: string | null | undefined) => products.find((p) => p.slug === slug)
