import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { products } from "@/content/products"
import { barHref } from "@/content/site"
import { world } from "@/content/world"
import { reveal } from "@/lib/reveal"

// Where each scent was born (deck slide 18, optional "map linking each scent to its origin place").
// Concept artwork, so the AI disclaimer sits right under the heading.
export function ScentOrigins() {
  const { origins } = world
  return (
    <section aria-labelledby="origins-heading" className="bg-stone px-section py-section">
      <div {...reveal()} className="mx-auto mb-10 max-w-[1240px] sm:mb-14 md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <Eyebrow>{origins.eyebrow}</Eyebrow>
          <h2 id="origins-heading" className="font-display mt-5 text-[clamp(44px,5.6vw,80px)]">
            <Lines lines={origins.heading} />
          </h2>
        </div>
        <div className="mt-5 max-w-[420px] md:mt-0">
          <p className="text-[10px] leading-[1.7] text-ink-muted">{origins.disclaimer}</p>
        </div>
      </div>

      {/* Aligned cards: 2 / 3 / 5 per row, a short last row centred; square frames for the square art. */}
      <ul className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-3.5">
        {products.map((p, i) => (
          <li key={p.slug} {...reveal((i % 5) * 80)} className="w-[calc(50%-7px)] sm:w-[calc((100%-28px)/3)] lg:w-[calc((100%-56px)/5)]">
            <Link href={barHref(p.slug)} className="card-pop group flex h-full flex-col">
              <span className="relative block aspect-square overflow-hidden">
                <Image
                  src={p.artwork.src}
                  alt={p.artwork.alt}
                  fill
                  sizes="(max-width: 560px) 50vw, (max-width: 1024px) 33vw, 240px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.05]"
                />
              </span>
              <span className="flex flex-1 flex-col p-4 sm:p-5">
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-gold">{p.origin.place}</span>
                <span className="font-display mt-1.5 text-[24px] leading-none">{p.variety}</span>
                <span className="mt-2 text-[10px] leading-[1.6] text-ink-soft">{p.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
