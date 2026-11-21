import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BarDetails } from "@/components/bar/bar-details"
import { BarViews } from "@/components/bar/bar-views"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import { productPage } from "@/content/product-page"
import type { Product } from "@/content/products"

// A flavour's definition (deck slides 17 + 21) and, from the client's audit, its pack views
// (slide 26), description and ingredients (slide 27) and net weight (slide 28). The pack views stay
// in sight on wide screens while the details scroll beside them.
export function BarHero({ product }: { product: Product }) {
  const { labels, bar } = collection
  return (
    <section
      aria-labelledby="bar-title"
      style={{ "--accent": product.accent } as CSSProperties}
      className="grid items-start gap-10 px-section pt-10 pb-section md:grid-cols-[1.1fr_0.9fr] md:gap-[clamp(40px,6vw,96px)] md:pt-14"
    >
      <div className="animate-[rise-in_0.85s_0.15s_both] md:sticky md:top-[calc(var(--header-height)+24px)]">
        <BarViews views={product.views} variety={product.variety} listLabel={productPage.views.list} />
      </div>

      <div>
        <div className="rise-group">
          <nav aria-label="Breadcrumb" className="type-label font-medium uppercase tracking-[0.2em] text-ink-muted">
            <Link href="/collection" className="hover:text-gold">
              {bar.breadcrumb}
            </Link>
            <span aria-hidden className="px-2">/</span>
            <span aria-current="page" className="text-ink">
              {product.variety}
            </span>
          </nav>
          {/* The flavour's name alone (owner 2026-11-21: no "Variety 0N" label and no "Wonder Beauty Bar"
              kicker above it). */}
          <h1 id="bar-title" className="font-display type-title mt-8">
            <SplitText text={product.variety} now />
          </h1>
          <div>
            <p className="font-display mt-5 text-[clamp(26px,2.6vw,38px)] leading-tight text-gold italic">{product.tagline}</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-ink-soft">{product.subLine}</p>
          </div>
          <dl className="type-copy mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="type-label uppercase tracking-[0.18em] text-ink-muted">{labels.inspired}</dt>
              <dd className="mt-1 text-ink">{product.origin.place}</dd>
            </div>
            <div>
              <dt className="type-label uppercase tracking-[0.18em] text-ink-muted">{productPage.details.netWeight}</dt>
              <dd className="mt-1 text-ink">{product.netWeight}</dd>
            </div>
            {/* "Best for" shows only once the client supplies it (no visible placeholder). */}
            {product.bestFor && (
              <div className="sm:col-span-2">
                <dt className="type-label uppercase tracking-[0.18em] text-ink-muted">{labels.bestFor}</dt>
                <dd className="mt-1 text-ink-soft">{product.bestFor}</dd>
              </div>
            )}
          </dl>
          <p className="type-label mt-6 uppercase tracking-[0.14em] text-gold">{collection.promise}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button asChild variant="wonder" size="wonder">
              <Link href={`/contact?type=bulk&product=${product.slug}`}>
                {labels.order} <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            </Button>
            <Button asChild variant="wonder-outline" size="wonder">
              <Link href="/collection">{bar.others}</Link>
            </Button>
          </div>
        </div>

        <BarDetails product={product} />
      </div>
    </section>
  )
}
