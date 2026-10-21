import type { Metadata } from "next"
import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { PageCta } from "@/components/brand/page-cta"
import { Em } from "@/components/brand/page-hero"
import { CollectionItem } from "@/components/collection/collection-item"
import { collection } from "@/content/collection"
import { products } from "@/content/products"

export const metadata: Metadata = collection.seo

// Brief §4.3 — exactly five bars, in order, no prices and no buy buttons.
export default function CollectionPage() {
  const { heading, feature, cta } = collection
  return (
    <>
      <section aria-labelledby="collection-title" className="rise-group px-[22px] pt-[70px] pb-[30px] text-center sm:px-6 sm:pt-[95px] sm:pb-[45px]">
        <Eyebrow center>{heading.eyebrow}</Eyebrow>
        <h1
          id="collection-title"
          className="font-display mt-7 mb-6 text-[clamp(55px,15vw,82px)] leading-[0.8] tracking-[-0.055em] sm:text-[clamp(60px,8vw,112px)]"
        >
          {heading.title.before}
          <br />
          <Em>{heading.title.emphasis}</Em>
        </h1>
        <p className="mx-auto max-w-[440px] text-xs leading-[1.9] text-ink-soft sm:text-[13px]">{heading.body}</p>
        <p className="mt-4 text-[9px] uppercase tracking-[0.18em] text-gold">{heading.formula}</p>
      </section>

      {/* The lineup fills its frame edge to edge (no inner mat), at its own 1800×1020 ratio. */}
      <figure className="mx-4 mt-3 mb-10 animate-[rise-in_0.85s_0.25s_both] text-center sm:mx-auto sm:mt-[15px] sm:mb-[65px] sm:w-[min(1100px,calc(100%-48px))]">
        <Image
          src={feature.src}
          alt={feature.alt}
          width={1800}
          height={1020}
          preload
          sizes="(max-width: 560px) 100vw, 1100px"
          className="block w-full rounded-lg shadow-card"
        />
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

      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.action} />
    </>
  )
}
