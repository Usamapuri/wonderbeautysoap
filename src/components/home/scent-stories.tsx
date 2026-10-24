import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { products } from "@/content/products"
import { barHref } from "@/content/site"
import { reveal, revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// All five flavours (deck slides 25, 26, 30) as a Gisou-style collage: one large square and four
// small squares — the concept artwork is square, so every tile shows it whole. Each tile opens the
// flavour's own page.
export function ScentStories() {
  const { scents } = home
  return (
    <section aria-labelledby="scents-heading" className="bg-stone px-section py-section">
      <div {...reveal()} className="mx-auto mb-10 max-w-[1240px] sm:mb-14 md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <Eyebrow>{scents.eyebrow}</Eyebrow>
          <h2 id="scents-heading" className="font-display mt-5 text-[clamp(44px,5.6vw,82px)]">
            <SplitText text={scents.heading} />
          </h2>
        </div>
      </div>

      <ul {...revealGroup} className="mx-auto grid max-w-[1240px] grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-4">
        {products.map((p, i) => (
          <li key={p.slug} className={cn(i === 0 && "col-span-2 md:row-span-2")}>
            <Link href={barHref(p.slug)} className="tile-pop group block aspect-square">
              <Image
                src={p.artwork.src}
                alt={p.artwork.alt}
                fill
                sizes={i === 0 ? "(max-width: 850px) 100vw, 50vw" : "(max-width: 850px) 50vw, 25vw"}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/70 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 z-10 p-4 text-paper sm:p-5">
                <span className="block text-[8px] font-medium uppercase tracking-[0.2em] text-gilt sm:text-[9px]">
                  {p.variety} · {p.origin.place}
                </span>
                <span className={cn("font-display mt-1.5 block leading-[1.05]", i === 0 ? "text-[clamp(28px,3.4vw,46px)]" : "text-[19px] sm:text-[24px]")}>
                  {p.tagline}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p {...reveal(150)} className="mx-auto mt-4 max-w-[1240px] text-[8px] tracking-[0.12em] text-ink-muted sm:text-right">
        {scents.footnote}
      </p>
    </section>
  )
}
