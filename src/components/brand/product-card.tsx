import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Product } from "@/content/products"
import { barHref } from "@/content/site"
import { cn } from "@/lib/utils"

/** Flavour card: opens the flavour's own page; origin as plain "City, Country". Pictured with the flavour's
 *  square campaign image (AI-made scene, real pack art); no on-page caption (owner). */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const image = product.campaign.collection
  return (
    <article style={{ "--accent": product.accent } as CSSProperties} className={cn("card-pop group/card flex h-full min-w-0 flex-col", className)}>
      {/* Square frame = the image's own ratio, so nothing is cropped. */}
      <div className="relative aspect-square overflow-hidden bg-clay">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 850px) 50vw, 240px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/card:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pt-3.5 pb-4 sm:px-4 sm:pt-[18px] sm:pb-5">
        {/* The origin as plain text, "City, Country", with no dot beside it (owner 2026-11-21). */}
        <p className="type-label tracking-[0.2em] text-ink-muted">{product.origin.place.toUpperCase()}</p>
        <h3 className="font-display type-card-sm mt-2.5">{product.variety}</h3>
        <p className="font-display mt-1.5 text-[17px] leading-tight text-gold italic">{product.tagline}</p>
        <p className="type-small mt-1.5 mb-4 text-ink-soft">{product.subLine}</p>
        <Link
          href={barHref(product.slug)}
          prefetch
          aria-label={`Discover the ${product.variety} bar`}
          className="group mt-auto inline-flex min-h-10 w-fit items-center gap-[9px] type-label font-medium uppercase tracking-[0.16em] hover:text-gold"
        >
          Discover
          <ArrowRight aria-hidden className="size-4 text-gold transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
