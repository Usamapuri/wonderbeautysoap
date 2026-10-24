import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Welcome note, part 2 (deck slide 6): the design statement, the eco-friendly box packaging banner
// ("give it space on Home", slide 21) and the closing line. The banner is a split panel: copy on
// ink beside the lineup render at its own ratio, so text never sits on the packs.
export function DesignEco() {
  const { design } = home
  const { eco } = design
  return (
    <section aria-labelledby="eco-heading" className="px-3 py-section sm:px-5">
      <p {...reveal()} className="font-display mx-auto max-w-[940px] px-[10px] text-center text-[clamp(28px,3.9vw,54px)] leading-[1.12]">
        <SplitText text={design.statement} />
      </p>

      <div {...reveal()} className="mt-14 grid overflow-hidden rounded-lg bg-ink text-paper md:mt-20 md:grid-cols-[0.75fr_1.25fr]">
        <div className="order-2 flex flex-col justify-center p-8 sm:p-12 md:order-1 md:p-14">
          <Eyebrow tone="gilt">{eco.eyebrow}</Eyebrow>
          <h2 id="eco-heading" className="font-display mt-5 mb-2 text-[clamp(38px,4.4vw,64px)] leading-[0.95]">
            <SplitText text={eco.heading} />
          </h2>
          {eco.lines.map((line) => (
            <p key={line} className="mt-3 max-w-[440px] text-[12px] leading-[1.75] text-paper/80 sm:text-[13px]">
              {line}
            </p>
          ))}
        </div>
        {/* 1800×1020 = the lineup render's own ratio. */}
        <div className="group relative order-1 aspect-[1800/1020] overflow-hidden md:order-2 md:aspect-auto md:min-h-full">
          <Image
            src={eco.image.src}
            alt={eco.image.alt}
            fill
            sizes="(max-width: 850px) 100vw, 62vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <p {...reveal()} className="mx-auto mt-14 max-w-[600px] px-[10px] text-center text-[14px] leading-[1.8] text-ink-soft md:mt-20">
        {design.closing}
      </p>
    </section>
  )
}
