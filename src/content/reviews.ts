// Customer reviews, near the end of Home (deck slide 9: "Customer reviews at the end").
//
// Back at the owner's request (phase 3: "WE NEED TO ADD REVIEWS SECTION IN THE HOMEPAGE"). The three reviews below are
// SAMPLE copy from the client's Bolt prototype, restored from git (commit 047baf7), not real customers. Each carries
// `sample: true`, which shows a visible "Sample review" tag on its card; never remove the tag or publish them as real,
// and add no review structured data for them. To publish a real review, the client supplies the customer's words and
// permission; add it here without `sample` (and delete the samples), and its tag goes.

import type { ProductSlug } from "./products"

export type Review = {
  quote: string
  name: string
  city: string
  bar: ProductSlug
  /** Placeholder copy: shows the visible "Sample review" tag. Real reviews omit it. */
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
    sample: true,
  },
  {
    quote: "I bought the lemon bar as a gift and ended up keeping it. The scent is bright without being overpowering, and the box feels incredibly special.",
    name: "Ayesha R",
    city: "Karachi",
    bar: "lemon",
    sample: true,
  },
  {
    quote: "Wonder has the rare combination of a beautiful product and a genuinely thoughtful purpose. Coconut is now a permanent part of my bathroom shelf.",
    name: "Hassan A",
    city: "Islamabad",
    bar: "coconut",
    sample: true,
  },
]
