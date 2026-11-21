import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { site } from "@/content/site"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// A flavour's history (deck slide 13, Wonder Room): where the idea came from, in the founder's words,
// beside the flavour's botanical illustration from its own pack. The client's audit (slide 45) removed
// the AI concept artwork that used to sit here, and the owner asked for no campaign image on flavour
// pages (2026-11-21).
export function BarStory({ product }: { product: Product }) {
  const { bar } = collection
  return (
    <section aria-labelledby="bar-story-heading" className="wrap-wide grid gap-3 px-3 sm:gap-5 sm:px-5 md:grid-cols-2">
      {/* Square well; the illustration (about square, on white) sits whole inside it. */}
      <figure {...reveal()} className="relative m-0 aspect-square overflow-hidden rounded-lg bg-clay">
        <Image
          src={product.botanical}
          alt={`${product.variety} illustration from the Wonder ${product.variety} pack`}
          fill
          sizes="(max-width: 850px) 100vw, 50vw"
          className="object-contain p-[14%] mix-blend-multiply"
        />
      </figure>
      <div {...reveal(120)} className="panel flex flex-col justify-center bg-parchment">
        <Eyebrow>{bar.storyEyebrow}</Eyebrow>
        <p className="type-small mt-3 text-ink-muted">{story.wonderRoom.heading}</p>
        <h2 id="bar-story-heading" className="font-display type-section mt-7">
          {/* Flavour and place on two lines, no dot between them (owner 2026-11-21). */}
          <Lines lines={[product.variety, product.origin.place]} />
        </h2>
        <blockquote className="font-display mt-6 max-w-[36ch] text-[clamp(21px,2.1vw,28px)] leading-[1.35]">“{product.origin.story}”</blockquote>
        <p className="font-display mt-8 text-[26px] leading-none text-gold italic">{bar.signature}</p>
        <p className="type-label mt-2 uppercase tracking-[0.24em] text-ink-muted">{site.company}</p>
      </div>
    </section>
  )
}
