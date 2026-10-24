import { Star } from "lucide-react"

import { Lines } from "@/components/brand/lines"
import { productBySlug } from "@/content/products"
import { reviews, reviewsSection } from "@/content/reviews"
import { reveal, revealGroup } from "@/lib/reveal"

// "Kind words, well lathered." — the Bolt prototype's review cards, at the end of Home (deck
// slide 9). Sample reviews carry a visible marker until the client supplies real ones.
export function Reviews() {
  if (reviews.length === 0) return null
  return (
    <section aria-labelledby="reviews-heading" className="px-section py-section">
      <div {...reveal()} className="mx-auto mb-10 max-w-[1240px] sm:mb-14 md:flex md:items-end md:justify-between md:gap-10">
        <h2 id="reviews-heading" className="font-display text-[clamp(46px,6vw,88px)]">
          <Lines lines={reviewsSection.heading} />
        </h2>
        <p className="mt-5 max-w-[360px] text-[13px] leading-[1.8] text-ink-soft md:mt-0">{reviewsSection.body}</p>
      </div>

      <ul {...revealGroup} className="mx-auto grid max-w-[1240px] gap-3.5 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.name} className="card-pop flex flex-col p-7 sm:p-9">
            <div className="flex items-center justify-between gap-3">
              <span role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-gold">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden className="size-3.5 fill-current" />
                ))}
              </span>
              {r.sample && (
                <span className="rounded-md px-2 py-1 text-[7px] uppercase tracking-[0.14em] text-rose outline-1 outline-rose outline-dashed">
                  {reviewsSection.sampleLabel}
                </span>
              )}
            </div>
            <blockquote className="font-display mt-6 flex-1 text-[clamp(21px,1.9vw,26px)] leading-[1.28]">“{r.quote}”</blockquote>
            <footer className="mt-8 border-t border-line pt-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em]">{r.name}</p>
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-ink-muted">
                {r.city} · {productBySlug(r.bar)?.variety}
              </p>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  )
}
