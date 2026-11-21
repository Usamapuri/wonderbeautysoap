import type { Metadata } from "next"
import { getImageProps } from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Em } from "@/components/brand/em"
import { CollectionItem } from "@/components/collection/collection-item"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import { products } from "@/content/products"
import { cn } from "@/lib/utils"

export const metadata: Metadata = collection.seo

// The Collection landing page (the header tab opens it; audit slide 38). Brief §4.3 + deck slide 17
// — exactly five bars in the deck's order, no prices and no buy buttons. The safety-report line
// (audit slide 39) and the closing bulk band (slide 41) were removed; each card keeps its own
// bulk-orders button.
export default function CollectionPage() {
  const { heading, feature } = collection
  // Art direction (Next.js getImageProps + <picture>): the 4:5 range portrait on phones, 16:9 above. It is the
  // page's largest image, so it loads eagerly at high priority (no <link rel="preload">: two candidates).
  const common = { alt: feature.alt, sizes: "(max-width: 560px) 100vw, 1100px", loading: "eager" as const, fetchPriority: "high" as const }
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: feature.mobile.src, width: feature.mobile.width, height: feature.mobile.height })
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: feature.src, width: feature.width, height: feature.height })
  return (
    <>
      <section aria-labelledby="collection-title" className="rise-group px-[22px] pt-[70px] pb-[30px] text-center sm:px-6 sm:pt-[95px] sm:pb-[45px]">
        <Eyebrow center>{heading.eyebrow}</Eyebrow>
        <h1
          id="collection-title"
          className="font-display type-title mt-7 mb-6 tracking-[-0.035em]"
        >
          <SplitText text={heading.title.before} now />
          <br />
          <Em>
            <SplitText text={heading.title.emphasis} now start={2} />
          </Em>
        </h1>
        <p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-gold">{heading.formula}</p>
      </section>

      {/* The feature image fills its frame edge to edge (no inner mat), at its own ratio (4:5 on phones, 16:9 above). */}
      <figure className="mx-4 mt-3 mb-10 animate-[rise-in_0.85s_0.25s_both] text-center sm:mx-auto sm:mt-[15px] sm:mb-[65px] sm:w-[min(1100px,calc(100%-48px))]">
        <div className={cn("overflow-hidden rounded-lg shadow-card", feature.packshot && "bg-clay")}>
          <picture>
            <source media="(max-width: 639px)" srcSet={tall} width={feature.mobile.width} height={feature.mobile.height} />
            <source srcSet={wide} width={feature.width} height={feature.height} />
            <img {...rest} alt={feature.alt} className={cn("block h-auto w-full", feature.packshot && "mix-blend-multiply")} />
          </picture>
        </div>
        <figcaption className="pt-3 text-[8px] uppercase tracking-[0.19em] text-ink-muted">{feature.caption}</figcaption>
      </figure>

      {/* Aligned card grid: 1 / 2 / 3 per row; a short last row is centred. Cards in a row share a height. */}
      <section
        aria-label="All Wonder Beauty Bar varieties"
        className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-3.5 px-4 pb-[65px] sm:gap-[18px] sm:px-6 sm:pb-[100px] md:px-[clamp(18px,4vw,60px)]"
      >
        {products.map((p, i) => (
          <CollectionItem key={p.slug} product={p} index={i} />
        ))}
      </section>
    </>
  )
}
