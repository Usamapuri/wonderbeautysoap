"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import { productBySlug } from "@/content/products"
import { barHref } from "@/content/site"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// Wonder Room (deck slide 13): where each scent came from, in the founder's words. A swipeable
// card row with arrow buttons, like rhode's ingredient carousel. Native scroll-snap, so touch,
// trackpad and keyboard (Tab into a card) all work without the buttons.
export function WonderRoom() {
  const { wonderRoom } = story
  const rail = useRef<HTMLUListElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector("li")
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 14), behavior: "smooth" })
  }

  return (
    <section aria-labelledby="room-heading" className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="overflow-hidden rounded-lg bg-stone py-14 sm:py-20">
        <div {...reveal()} className="mb-10 flex flex-col gap-6 px-7 sm:px-12 md:flex-row md:items-end md:justify-between md:px-16">
          <div>
            <Eyebrow>{wonderRoom.eyebrow}</Eyebrow>
            <h2 id="room-heading" className="font-display mt-5 max-w-[640px] text-[clamp(40px,5vw,72px)]">
              <SplitText text={wonderRoom.heading} />
            </h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous story" className="grid size-11 place-items-center rounded-lg border border-ink/30 transition-colors hover:border-ink hover:bg-ink hover:text-paper">
              <ArrowLeft className="size-4" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next story" className="grid size-11 place-items-center rounded-lg border border-ink/30 transition-colors hover:border-ink hover:bg-ink hover:text-paper">
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <ul
          ref={rail}
          className="flex snap-x snap-mandatory scroll-px-7 gap-3.5 overflow-x-auto px-7 pt-2 pb-6 [scrollbar-width:none] sm:scroll-px-12 sm:px-12 md:scroll-px-16 md:px-16 [&::-webkit-scrollbar]:hidden"
        >
          {wonderRoom.order.map((slug) => {
            const p = productBySlug(slug)!
            return (
              <li key={slug} className="w-[82%] shrink-0 snap-start sm:w-[46%] md:w-[31%] lg:w-[28%]">
                <article className="card-pop group flex h-full flex-col">
                  {/* Square frame = the square concept artwork. */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={p.artwork.src}
                      alt={p.artwork.alt}
                      fill
                      sizes="(max-width: 560px) 82vw, (max-width: 850px) 46vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-gold">
                      {p.variety} · {p.origin.place}
                    </p>
                    <p className="mt-4 flex-1 text-[13px] leading-[1.8] text-ink-soft">{p.origin.story}</p>
                    <Link href={barHref(p.slug)} prefetch className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] hover:text-gold">
                      {collection.labels.discover} <span className="sr-only">the {p.variety} bar</span> <ArrowRight aria-hidden className="size-3.5 text-gold" />
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 px-7 text-[8px] tracking-[0.12em] text-ink-muted sm:px-12 md:px-16">{wonderRoom.footnote}</p>
      </div>
    </section>
  )
}
