// Customer reviews, shown at the end of Home (deck slide 9: "Customer reviews at the end").
//
// The three below come from the client's Bolt prototype and are SAMPLE copy until the client
// confirms real reviews with the customer's permission (developer decision 2026-10-25). While
// `sample` is true each card is visibly marked as a sample. Never publish invented reviews as real:
// replace each entry with a real review (or delete it), then set `sample: false`.

import type { ProductSlug } from "./products"

export type Review = {
  quote: string
  name: string
  city: string
  bar: ProductSlug
  sample: boolean
}

export const reviewsSection = {
  heading: ["Kind words,", "well lathered."],
  body: "A few notes from people who make Wonder part of their everyday.",
  sampleLabel: "Sample review",
} as const

export const reviews: Review[] = [
  {
    quote: "The lavender bar makes my evening shower feel like a ritual. It is gentle, beautifully packaged and lasts far longer than I expected.",
    name: "Mariam K.",
    city: "Lahore",
    bar: "lavender",
    sample: true,
  },
  {
    quote: "I bought the lemon bar as a gift and ended up keeping it. The scent is bright without being overpowering, and the box feels incredibly special.",
    name: "Ayesha R.",
    city: "Karachi",
    bar: "lemon",
    sample: true,
  },
  {
    quote: "Wonder has the rare combination of a beautiful product and a genuinely thoughtful purpose. Coconut is now a permanent part of my bathroom shelf.",
    name: "Hassan A.",
    city: "Islamabad",
    bar: "coconut",
    sample: true,
  },
]
