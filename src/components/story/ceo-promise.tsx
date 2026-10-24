import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// CEO's promise (deck slide 16 — draft wording, awaiting the client's approval): rhode-style split
// panel, picture beside the letter, the promise itself set apart.
export function CeoPromise() {
  const { ceo } = story
  return (
    <section aria-labelledby="ceo-heading" className="grid gap-3 px-3 pt-3 sm:px-5 sm:pt-5 md:grid-cols-[0.9fr_1.1fr]">
      {/* Square frame = the square concept artwork. */}
      <div {...reveal()} className="tile-pop relative aspect-square bg-clay md:aspect-auto md:min-h-full">
        <Image src={ceo.image.src} alt={ceo.image.alt} fill sizes="(max-width: 850px) 100vw, 45vw" className="object-cover" />
      </div>
      <div {...reveal(120)} className="rounded-lg bg-ink p-8 text-paper sm:p-12 md:p-16">
        <Eyebrow tone="gilt">
          <h2 id="ceo-heading">{ceo.eyebrow}</h2>
        </Eyebrow>
        <p className="font-display mt-7 text-[clamp(30px,3.4vw,48px)] leading-[1.08]">
          <SplitText text={ceo.lead} />
        </p>
        {ceo.body.map((p) => (
          <p key={p} className="mt-5 max-w-[560px] text-[13px] leading-[1.85] text-paper/80">
            {p}
          </p>
        ))}
        <p className="font-display mt-9 text-[clamp(21px,2.1vw,28px)] leading-[1.3] text-gilt italic">{ceo.promise}</p>
        <p className="mt-8 text-[13px] leading-[1.8] text-paper/80">{ceo.thanks}</p>
        <p className="font-display mt-8 text-[30px] leading-none text-gilt italic">{ceo.signature}</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-paper/60">{ceo.company}</p>
      </div>
    </section>
  )
}
