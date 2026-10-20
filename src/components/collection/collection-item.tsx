import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Copy } from "@/components/brand/copy"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// One bar on /collection (starter .collection-item). Anchor id = slug, so Home cards land here.
export function CollectionItem({ product, index }: { product: Product; index: number }) {
  const { labels } = collection
  return (
    <article
      {...reveal(index % 2 === 1 ? 120 : 0)}
      id={product.slug}
      aria-labelledby={`${product.slug}-name`}
      className={cn(
        "group grid scroll-mt-[calc(var(--header-height)+16px)] grid-cols-1 overflow-hidden sm:grid-cols-[1fr_0.9fr]",
        index === 1 || index === 4 ? "bg-wheat" : "bg-vellum",
        // The odd fifth bar sits centred under the two-column grid.
        index === 4 && "md:col-span-2 md:mx-auto md:w-[calc(50%-9px)]",
      )}
    >
      <div className="relative grid aspect-[6/5] place-items-center overflow-hidden bg-clay sm:aspect-auto sm:min-h-[260px]">
        <Image
          src={product.image}
          alt={`${product.name} package`}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 25vw"
          className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col px-5 py-6 sm:p-[clamp(18px,2vw,30px)]">
        <div className="flex items-start justify-between gap-2">
          <span className="flex items-center gap-2 pt-1 text-[8px] tracking-[0.18em] text-ink-muted">
            <span aria-hidden className={cn("size-1.5 rounded-full", product.accent)} />
            VARIETY {String(index + 1).padStart(2, "0")}
          </span>
          <Image
            src={product.botanical}
            alt=""
            width={72}
            height={72}
            className="size-12 object-contain mix-blend-multiply sm:size-[72px]"
          />
        </div>
        <h2 id={`${product.slug}-name`} className="font-display mt-1 mb-3 text-[30px] leading-[0.95] tracking-normal sm:text-[clamp(28px,3vw,43px)]">
          <span className="mb-1.5 block font-sans text-[8px] font-normal tracking-[0.18em] text-ink-muted uppercase">
            Wonder Beauty Bar —
          </span>
          {product.variety}
        </h2>
        <p className="text-[9px] leading-[1.7] text-ink-soft sm:text-[10px]">{product.note}</p>

        <dl className="mt-3 space-y-2 text-[9px] leading-[1.6] sm:text-[10px]">
          <div>
            <dt className="text-[8px] uppercase tracking-[0.14em] text-ink-muted">{labels.scent}</dt>
            <dd className="text-ink-soft">
              <Copy value={product.scentNote} />
            </dd>
          </div>
          <div>
            <dt className="text-[8px] uppercase tracking-[0.14em] text-ink-muted">{labels.skin}</dt>
            <dd className="text-ink-soft">
              <Copy value={product.skinType} />
            </dd>
          </div>
        </dl>

        <p className="mt-4 border-t border-rule pt-3 text-[8px] leading-[1.7] tracking-[0.08em]">{collection.promise}</p>
        <Link
          href={`/contact?product=${product.slug}`}
          className="group/link mt-auto inline-flex min-h-10 w-fit items-center gap-2 pt-2 text-[8px] uppercase tracking-[0.14em] hover:text-gold"
        >
          {labels.enquire}
          <ArrowRight aria-hidden className="size-4 text-gold transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      <figure className="relative col-span-full m-0 overflow-hidden bg-stone">
        <div className="relative h-[210px] md:h-[clamp(160px,18vw,250px)]">
          <Image
            src={product.artwork.src}
            alt={product.artwork.alt}
            fill
            sizes="(max-width: 850px) 100vw, 50vw"
            className="object-cover transition-transform duration-[650ms] group-hover:scale-[1.025]"
          />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-linear-to-b from-transparent to-ink/60 px-5 pt-[30px] pb-[15px] text-paper">
          <span className="text-[7px] uppercase tracking-[0.2em]">{labels.artwork} · AI concept</span>
          <strong className="font-display text-[27px] leading-none tracking-normal">{product.mood}</strong>
        </figcaption>
      </figure>
    </article>
  )
}
