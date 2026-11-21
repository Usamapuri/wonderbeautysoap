import { Star } from "lucide-react"

import { Lines } from "@/components/brand/lines"
import { productBySlug } from "@/content/products"
import { reviews, reviewsSection } from "@/content/reviews"
import { reveal, revealGroup } from "@/lib/reveal"

// "Kind words, well lathered" — the Bolt prototype's review cards, near the end of Home (deck slide 9), back at
// the owner's request (phase 3), with three reviews the owner confirmed as genuine. A review flagged `sample`
// would carry a visible "Sample review" tag (real text, dark rose for 4.5:1). No review structured data.
export function Reviews() {
  if (reviews.length === 0) return null
  return (
    <section aria-labelledby="reviews-heading" className="px-section py-section">
      <div {...reveal()} className="mb-heading mx-auto max-w-[1210px] md:flex md:items-end md:justify-between md:gap-10">
        <h2 id="reviews-heading" className="font-display type-section">
          <Lines lines={reviewsSection.heading} />
        </h2>
        <p className="type-copy mt-5 max-w-[360px] text-ink-soft md:mt-0">{reviewsSection.body}</p>
      </div>

      <ul {...revealGroup} className="gap-grid mx-auto grid max-w-[1210px] md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.name} className="card-pop p-card flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <span role="img" aria-label="5 out of 5" className="flex gap-1 text-gold">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden className="size-3.5 fill-current" />
                ))}
              </span>
              {r.sample && (
                <span className="type-label rounded-md px-2 py-1 font-medium uppercase tracking-[0.14em] text-botanical-rose outline-1 outline-botanical-rose outline-dashed">
                  {reviewsSection.sampleLabel}
                </span>
              )}
            </div>
            <blockquote className="font-display mt-6 flex-1 text-[clamp(21px,1.9vw,26px)] leading-[1.28]">“{r.quote}”</blockquote>
            <footer className="mt-8 border-t border-line pt-5">
              <p className="type-meta font-medium uppercase tracking-[0.2em]">{r.name}</p>
              {/* City and bar side by side with spacing, no dot (owner 2026-11-21). */}
              <p className="type-label mt-1.5 flex flex-wrap gap-x-4 uppercase tracking-[0.2em] text-ink-muted">
                <span>{r.city}</span>
                <span>{productBySlug(r.bar)?.variety}</span>
              </p>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  )
}
