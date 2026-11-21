// Customer reviews, near the end of Home (deck slide 9: "Customer reviews at the end").
//
// The site owner confirmed on 2026-11-21 that these three are genuine customer reviews ("they are real"), so they
// carry no tag. The client should hold each quoted customer's permission to be quoted. A placeholder review can still
// be marked with `sample: true`, which shows the visible "Sample review" tag on its card. No review structured data.

import type { ProductSlug } from "./products"

export type Review = {
  quote: string
  name: string
  city: string
  bar: ProductSlug
  /** Placeholder copy only: shows the visible "Sample review" tag. Genuine reviews omit it. */
  sample?: true
}

export const reviewsSection = {
  heading: ["Kind words,", "well lathered"],
  body: "A few notes from people who make Wonder part of their everyday",
  sampleLabel: "Sample review",
} as const

export const reviews: Review[] = [
  {
    quote: "The lavender bar makes my evening shower feel like a ritual. It is gentle, beautifully packaged and lasts far longer than I expected.",
    name: "Mariam K",
    city: "Lahore",
    bar: "lavender",
  },
  {
    quote: "I bought the lemon bar as a gift and ended up keeping it. The scent is bright without being overpowering, and the box feels incredibly special.",
    name: "Ayesha R",
    city: "Karachi",
    bar: "lemon",
  },
  {
    quote: "Wonder has the rare combination of a beautiful product and a genuinely thoughtful purpose. Coconut is now a permanent part of my bathroom shelf.",
    name: "Hassan A",
    city: "Islamabad",
    bar: "coconut",
  },
]
