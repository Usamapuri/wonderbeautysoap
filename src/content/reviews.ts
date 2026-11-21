// Customer reviews, shown at the end of Home (deck slide 9: "Customer reviews at the end").
//
// The audit (slide 22) asked to remove the "Sample review" marker. The three reviews it marked were
// sample copy from the client's Bolt prototype, not real customers, so they were removed rather
// than shown unmarked: invented testimonials must never be published as real. The section hides
// while this list is empty. To add a real review, the client supplies the customer's words and
// permission to publish them; add it here with `sample: false`.

import type { ProductSlug } from "./products"

export type Review = {
  quote: string
  name: string
  city: string
  bar: ProductSlug
  /** true = placeholder copy, shown with a visible marker. Real reviews only for launch. */
  sample: boolean
}

export const reviewsSection = {
  heading: ["Kind words,", "well lathered."],
  body: "A few notes from people who make Wonder part of their everyday.",
  sampleLabel: "Sample review",
} as const

export const reviews: Review[] = []
