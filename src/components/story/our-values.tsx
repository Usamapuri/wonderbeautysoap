import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal, revealGroup } from "@/lib/reveal"

// Our values (deck slide 12), as rhode's split panel: picture left, the values as a ruled list right.
export function OurValues() {
  const { values } = story
  return (
    <section aria-labelledby="values-heading" className="grid gap-3 px-3 pt-3 sm:px-5 sm:pt-5 md:grid-cols-2">
      {/* Square frame = the square concept artwork. */}
      <div {...reveal()} className="tile-pop relative aspect-square bg-clay">
        <Image src={values.image.src} alt={values.image.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
      </div>
      <div {...reveal(120)} className="flex flex-col justify-between gap-10 rounded-lg bg-parchment p-8 sm:p-12 md:p-16">
        <div>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <h2 id="values-heading" className="font-display mt-5 text-[clamp(44px,5vw,72px)]">
            <SplitText text={values.heading} />
          </h2>
        </div>
        <ul {...revealGroup} className="border-t border-line">
          {values.list.map((v, i) => (
            <li key={v} className="flex items-baseline justify-between gap-6 border-b border-line py-4 sm:py-5">
              <span className="font-display text-[clamp(26px,2.6vw,36px)] leading-none">{v}.</span>
              <span className="text-[9px] tracking-[0.2em] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
