import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { barHref } from "@/content/site"
import { reveal } from "@/lib/reveal"

// One bar on /collection: pack, name, the deck's tagline + sub-line (slide 21) and origin (slide 17),
// then "Discover" (the flavour's own page, with its scent, "Best for" line and story) and the
// bulk-orders button. Anchor id = slug for old /collection#slug links.
export function CollectionItem({ product, index }: { product: Product; index: number }) {
  const { labels } = collection
  return (
    <article
      {...reveal((index % 3) * 110)}
      id={product.slug}
      aria-labelledby={`${product.slug}-name`}
      style={{ "--accent": product.accent } as CSSProperties}
      className="card-pop group flex w-full scroll-mt-[calc(var(--header-height)+16px)] flex-col sm:w-[calc(50%-9px)] lg:w-[calc((100%-36px)/3)]"
    >
      <Link href={barHref(product.slug)} prefetch tabIndex={-1} aria-hidden className="relative block aspect-square overflow-hidden bg-clay">
        {/* The flavour's square campaign image (AI-made scene, real pack art), at its own ratio. The grid
            below carries the caption; the link is a duplicate of "Discover", so the image is decorative. */}
        <Image
          src={product.campaign.collection.src}
          alt=""
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        {/* Owner requests 2026-11-21: no pack illustration, no "Wonder Beauty Bar" line and no "Variety 0N"
            label above the name; the card opens with the flavour's name. */}
        <h2 id={`${product.slug}-name`} className="font-display type-card">
          {product.variety}
        </h2>
        <p className="font-display mt-2 text-[22px] leading-tight text-gold italic">{product.tagline}</p>
        <p className="type-small mt-1 text-ink-soft">{product.subLine}</p>

        <p className="type-small mt-5 border-t border-line pt-4">
          <span className="type-label block uppercase tracking-[0.16em] text-ink-muted">{labels.inspired}</span>
          {product.origin.place}
        </p>

        <div className="mt-auto grid gap-2.5 pt-6">
          <Button asChild variant="wonder" size="wonder">
            <Link href={`/contact?type=bulk&product=${product.slug}`}>{labels.order}</Link>
          </Button>
          <Button asChild variant="wonder-outline" size="wonder">
            <Link href={barHref(product.slug)} prefetch>
              {labels.discover} <span className="sr-only">the {product.variety} bar</span>
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
