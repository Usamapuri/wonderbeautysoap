import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import type { Product } from "@/content/products"
import { site } from "@/content/site"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// A flavour's history (deck slide 13, Wonder Room): where the idea came from, in the founder's
// words, beside the flavour's concept artwork (labelled as an AI concept).
export function BarStory({ product }: { product: Product }) {
  const { bar, labels } = collection
  return (
    <section aria-labelledby="bar-story-heading" className="grid gap-3 px-3 sm:px-5 md:grid-cols-2">
      {/* Square frame = the square concept artwork. */}
      <figure {...reveal()} className="tile-pop relative m-0 aspect-square bg-clay">
        <Image src={product.artwork.src} alt={product.artwork.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
        <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 bg-linear-to-b from-transparent to-ink/65 px-6 pt-10 pb-5 text-paper">
          <span className="text-[7px] uppercase tracking-[0.2em]">{labels.artwork} · AI concept</span>
          <strong className="font-display text-[28px] leading-none font-normal">{product.mood}</strong>
        </figcaption>
      </figure>
      <div {...reveal(120)} className="flex flex-col justify-center rounded-lg bg-parchment p-8 sm:p-12 md:p-16">
        <Eyebrow>{bar.storyEyebrow}</Eyebrow>
        <p className="mt-3 text-[11px] leading-[1.7] text-ink-muted">{story.wonderRoom.heading}</p>
        <h2 id="bar-story-heading" className="font-display mt-8 text-[clamp(38px,4.4vw,64px)] leading-[0.95]">
          <SplitText text={`${product.variety} · ${product.origin.place}`} />
        </h2>
        <blockquote className="font-display mt-7 text-[clamp(21px,2.1vw,28px)] leading-[1.35]">“{product.origin.story}”</blockquote>
        <p className="font-display mt-9 text-[26px] leading-none text-gold italic">{bar.signature}</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-ink-muted">{site.company}</p>
      </div>
    </section>
  )
}
