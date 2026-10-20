import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { productBySlug } from "@/content/products"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// §4.2 #3 — genuine old pack beside today's render of the SAME variety. Only varieties with a
// real old photo are listed in story.thenAndNow.pairs; the section disappears if there are none.
export function ThenAndNow() {
  const { thenAndNow } = story
  if (thenAndNow.pairs.length === 0) return null
  return (
    <section aria-labelledby="then-now-heading" className="bg-sand px-section py-section">
      <div {...reveal()} className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:flex sm:items-end sm:justify-between sm:gap-10">
        <div>
          <Eyebrow>
            {thenAndNow.number} · {thenAndNow.eyebrow}
          </Eyebrow>
          <h2 id="then-now-heading" className="font-display mt-[22px] text-[clamp(44px,5vw,68px)]">
            <Lines lines={thenAndNow.heading} />
          </h2>
        </div>
        <p className="mt-5 max-w-[340px] text-xs leading-[1.85] text-ink-soft sm:mt-0">{thenAndNow.body}</p>
      </div>

      <ul className="mx-auto grid max-w-[1100px] gap-10 sm:gap-14">
        {thenAndNow.pairs.map((pair) => {
          const product = productBySlug(pair.slug)!
          return (
            <li key={pair.slug} {...reveal()}>
              <figure className="m-0">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {[
                    { label: thenAndNow.beforeLabel, src: pair.before.src, alt: pair.before.alt, multiply: false },
                    { label: thenAndNow.afterLabel, src: product.image, alt: `The ${product.variety} bar in today's gold-and-white packaging`, multiply: true },
                  ].map((side) => (
                    <div key={side.label}>
                      <div className="relative aspect-[6/5] overflow-hidden bg-clay">
                        <Image
                          src={side.src}
                          alt={side.alt}
                          fill
                          sizes="(max-width: 850px) 50vw, 540px"
                          className={side.multiply ? "object-cover mix-blend-multiply" : "object-cover"}
                        />
                      </div>
                      <span className="mt-2.5 block text-[8px] uppercase tracking-[0.18em] text-ink-muted">{side.label}</span>
                    </div>
                  ))}
                </div>
                <figcaption className="font-display mt-1 flex items-center gap-3 text-[27px] tracking-normal">
                  <span aria-hidden className={`size-1.5 rounded-full ${product.accent}`} />
                  {product.variety}
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
