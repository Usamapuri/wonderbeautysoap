import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Product } from "@/content/products"
import { cn } from "@/lib/utils"

/** Collection preview card (starter .product-card). Links to the variety's anchor on /collection. */
export function ProductCard({ product, index, className }: { product: Product; index: number; className?: string }) {
  return (
    <article className={cn("group/card flex min-w-0 flex-col border border-ink/15 bg-card/60 transition-[translate,box-shadow] duration-350 hover:-translate-y-[5px] hover:shadow-raise", className)}>
      <div className="relative grid aspect-[0.85] place-items-center overflow-hidden bg-clay sm:aspect-[0.98]">
        <Image
          src={product.image}
          alt={`${product.name} package`}
          fill
          sizes="(max-width: 850px) 50vw, 240px"
          className="object-cover mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/card:scale-[1.07]"
        />
      </div>
      <div className="flex flex-1 flex-col px-[11px] pt-3.5 pb-[17px] sm:px-[15px] sm:pt-[18px] sm:pb-5">
        <div className="flex items-center gap-2 text-[8px] tracking-[0.2em] text-ink-muted">
          <span aria-hidden className={cn("size-1.5 rounded-full", product.accent)} />
          VARIETY {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="font-display mt-[9px] mb-[13px] text-[25px] leading-[0.95] tracking-normal sm:text-[28px]">
          {product.variety}
        </h3>
        <p className="mb-[15px] min-h-8 text-[9px] leading-[1.6] text-ink-soft sm:text-[10px]">Wonder Beauty Bar · {product.variety}</p>
        <Link
          href={`/collection#${product.slug}`}
          aria-label={`View ${product.name}`}
          className="group mt-auto inline-flex min-h-10 w-fit items-center gap-[9px] text-[8px] uppercase tracking-[0.14em] hover:text-gold"
        >
          View
          <ArrowRight aria-hidden className="size-4 text-gold transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
