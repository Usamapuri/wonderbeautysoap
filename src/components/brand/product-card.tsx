import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Product } from "@/content/products"
import { barHref } from "@/content/site"
import { cn } from "@/lib/utils"

/** Flavour card: opens the flavour's own page; flavour accent on the dot. */
export function ProductCard({ product, index, className }: { product: Product; index: number; className?: string }) {
  return (
    <article style={{ "--accent": product.accent } as CSSProperties} className={cn("card-pop group/card flex h-full min-w-0 flex-col", className)}>
      {/* 6:5 well = the render's own ratio, so the whole pack shows. */}
      <div className="relative aspect-[6/5] overflow-hidden bg-clay">
        <Image
          src={product.image}
          alt={`${product.name} package`}
          fill
          sizes="(max-width: 850px) 50vw, 240px"
          className="object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/card:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pt-3.5 pb-4 sm:px-4 sm:pt-[18px] sm:pb-5">
        <div className="flex items-center gap-2 text-[8px] tracking-[0.2em] text-ink-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-(--accent)" />
          {String(index + 1).padStart(2, "0")} · {product.origin.place.toUpperCase()}
        </div>
        <h3 className="font-display mt-2.5 text-[25px] leading-[0.95] sm:text-[28px]">{product.variety}</h3>
        <p className="font-display mt-1.5 text-[15px] leading-tight text-gold italic">{product.tagline}</p>
        <p className="mt-1.5 mb-4 text-[9px] leading-[1.6] text-ink-soft sm:text-[10px]">{product.subLine}</p>
        <Link
          href={barHref(product.slug)}
          prefetch
          aria-label={`Discover the ${product.variety} bar`}
          className="group mt-auto inline-flex min-h-10 w-fit items-center gap-[9px] text-[8px] font-medium uppercase tracking-[0.16em] hover:text-gold"
        >
          Discover
          <ArrowRight aria-hidden className="size-4 text-gold transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
