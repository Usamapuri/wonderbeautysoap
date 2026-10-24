import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { barHref, site } from "@/content/site"
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
      <Link href={barHref(product.slug)} tabIndex={-1} aria-hidden className="relative block aspect-[6/5] overflow-hidden bg-clay">
        {/* 6:5 = the render's own ratio, so the whole pack shows. */}
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        <div className="flex items-start justify-between gap-2">
          <span className="flex items-center gap-2 pt-1 text-[8px] tracking-[0.18em] text-ink-muted">
            <span aria-hidden className="size-2 rounded-full bg-(--accent)" />
            VARIETY {String(index + 1).padStart(2, "0")}
          </span>
          <Image src={product.botanical} alt="" width={72} height={72} className="size-12 object-contain mix-blend-multiply sm:size-[64px]" />
        </div>
        <h2 id={`${product.slug}-name`} className="font-display mt-1 text-[clamp(32px,3vw,42px)] leading-[0.95]">
          <span className="mb-1.5 block font-sans text-[8px] font-normal tracking-[0.18em] text-ink-muted uppercase">{site.productLine}</span>
          {product.variety}
        </h2>
        <p className="font-display mt-2 text-[20px] leading-tight text-gold italic">{product.tagline}</p>
        <p className="mt-1 text-[10px] leading-[1.7] text-ink-soft">{product.subLine}</p>

        <p className="mt-5 border-t border-line pt-4 text-[10px] leading-[1.6]">
          <span className="block text-[8px] uppercase tracking-[0.16em] text-ink-muted">{labels.inspired}</span>
          {product.origin.place}
        </p>

        <div className="mt-auto grid gap-2.5 pt-6">
          <Button asChild variant="wonder" size="wonder">
            <Link href={`/contact?type=bulk&product=${product.slug}`}>{labels.order}</Link>
          </Button>
          <Button asChild variant="wonder-outline" size="wonder">
            <Link href={barHref(product.slug)}>
              {labels.discover} <span className="sr-only">the {product.variety} bar</span>
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
