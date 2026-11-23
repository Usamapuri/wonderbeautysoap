import type { Metadata } from "next"

import { PageHero } from "@/components/brand/page-hero"
import { CollectionItem } from "@/components/collection/collection-item"
import { collection } from "@/content/collection"
import { products } from "@/content/products"

export const metadata: Metadata = { ...collection.seo, alternates: { canonical: "/collection" } }

// The Collection landing page (the header tab opens it; audit slide 38). Brief §4.3 + deck slide 17
// — exactly five bars in the deck's order, no prices and no buy buttons. The safety-report line
// (audit slide 39) and the closing bulk band (slide 41) were removed; each card keeps its own
// bulk-orders button. Phase 3 (owner): the range picture is the page hero, with the title over it in white
// and the flavour list directly after it.
export default function CollectionPage() {
  const { hero } = collection
  return (
    <>
      <PageHero id="collection-title" eyebrow={hero.eyebrow} title={hero.title} titleEm={hero.titleEm} titleLines={hero.titleLines} intro={hero.formula} art={hero.art} />

      {/* Aligned card grid: 1 / 2 / 3 per row; a short last row is centred. Cards in a row share a height. */}
      <section
        aria-label="All Wonder Beauty Bar varieties"
        className="wrap-wide gap-grid flex flex-wrap justify-center px-section py-section"
      >
        {products.map((p, i) => (
          <CollectionItem key={p.slug} product={p} index={i} />
        ))}
      </section>
    </>
  )
}
