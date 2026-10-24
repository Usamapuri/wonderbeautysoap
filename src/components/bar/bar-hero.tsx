import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Copy } from "@/components/brand/copy"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { site } from "@/content/site"

// A flavour's definition (deck slides 17 + 21): the whole pack, tagline, sub-line, origin of the
// idea, scent and "Best for" (client to supply), on-pack lines, and the bulk-orders button.
export function BarHero({ product, index }: { product: Product; index: number }) {
  const { labels, bar } = collection
  return (
    <section
      aria-labelledby="bar-title"
      style={{ "--accent": product.accent } as CSSProperties}
      className="grid items-center gap-10 px-section pt-10 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-[clamp(40px,6vw,96px)] md:pt-14 md:pb-24"
    >
      <div className="animate-[rise-in_0.85s_0.15s_both]">
        {/* 6:5 = the render's own ratio, so the whole pack shows. */}
        <div className="relative aspect-[6/5] overflow-hidden rounded-lg bg-clay shadow-pop">
          <Image src={product.image} alt={`${product.name} package`} fill preload sizes="(max-width: 850px) 100vw, 55vw" className="object-cover mix-blend-multiply" />
        </div>
      </div>

      <div className="rise-group">
        <nav aria-label="Breadcrumb" className="text-[9px] font-medium uppercase tracking-[0.2em] text-ink-muted">
          <Link href="/collection" className="hover:text-gold">
            {bar.breadcrumb}
          </Link>
          <span aria-hidden className="px-2">/</span>
          <span aria-current="page" className="text-ink">
            {product.variety}
          </span>
        </nav>
        <div>
          <p className="mt-8 flex items-center gap-2 text-[9px] tracking-[0.2em] text-ink-muted">
            <span aria-hidden className="size-2 rounded-full bg-(--accent)" />
            VARIETY {String(index + 1).padStart(2, "0")} · {product.origin.place.toUpperCase()}
          </p>
          <h1 id="bar-title" className="font-display mt-3 text-[clamp(64px,16vw,96px)] leading-[0.9] md:text-[clamp(72px,8vw,124px)]">
            <span className="mb-3 block font-sans text-[9px] font-medium tracking-[0.2em] text-ink-muted uppercase">{site.productLine}</span>
            <SplitText text={product.variety} now />
          </h1>
        </div>
        <div>
          <p className="font-display mt-5 text-[clamp(26px,2.6vw,38px)] leading-tight text-gold italic">{product.tagline}</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{product.subLine}</p>
        </div>
        <dl className="mt-8 grid gap-5 border-t border-line pt-6 text-[12px] leading-[1.6] sm:grid-cols-2">
          <div>
            <dt className="text-[8px] uppercase tracking-[0.18em] text-ink-muted">{labels.inspired}</dt>
            <dd className="mt-1 text-ink">{product.origin.place}</dd>
          </div>
          <div>
            <dt className="text-[8px] uppercase tracking-[0.18em] text-ink-muted">{labels.scent}</dt>
            <dd className="mt-1 text-ink-soft">
              <Copy value={product.scentNote} />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[8px] uppercase tracking-[0.18em] text-ink-muted">{labels.bestFor}</dt>
            <dd className="mt-1 text-ink-soft">
              <Copy value={product.bestFor} />
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-[9px] uppercase tracking-[0.14em] text-gold">{collection.promise}</p>
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
    </section>
  )
}
