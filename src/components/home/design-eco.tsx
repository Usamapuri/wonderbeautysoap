import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Welcome note, part 2 (deck slide 6): the design statement, the eco-friendly box packaging banner
// ("give it space on Home", slide 21) and the closing line.
//
// The statement sits on a picture that stays still while the page scrolls past it (audit slides
// 13–14, alchimiasoap.it reference), in the same rounded frame as the film above, so the two flow
// together. The picture is `position: fixed` inside a `clip-path` frame: unlike
// `background-attachment: fixed`, that also works on iOS and with next/image. Nothing in the frame
// may carry a transform (e.g. a reveal), or the picture would scroll with it.
export function DesignEco() {
  const { design } = home
  const { eco } = design
  return (
    <section aria-labelledby="eco-heading" className="wrap-wide px-3 pt-3 pb-section sm:px-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-lg text-paper [clip-path:inset(0_round_var(--radius-lg))]">
        <div aria-hidden className="fixed inset-0 -z-10">
          <Image src={design.backdrop.src} alt={design.backdrop.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/60" />
        </div>
        <div className="flex min-h-[clamp(340px,62svh,560px)] items-center justify-center px-6 py-20 sm:px-12">
          <p {...reveal()} className="font-display mx-auto max-w-[940px] text-center text-[clamp(28px,3.9vw,54px)] leading-[1.12] text-balance [text-shadow:0_2px_24px_rgb(37_35_29/35%)]">
            <SplitText text={design.statement} />
          </p>
        </div>
      </div>

      <div {...reveal()} className="mt-3 grid overflow-hidden rounded-lg bg-ink text-paper sm:mt-5 md:grid-cols-[0.75fr_1.25fr]">
        <div className="order-2 flex flex-col justify-center p-8 sm:p-12 md:order-1 md:p-14">
          <Eyebrow tone="gilt">{eco.eyebrow}</Eyebrow>
          <h2 id="eco-heading" className="font-display type-section mt-5 mb-2">
            <SplitText text={eco.heading} />
          </h2>
          {eco.lines.map((line) => (
            <p key={line} className="mt-3 max-w-[440px] text-[12px] leading-[1.75] text-paper/80 sm:text-[13px]">
              {line}
            </p>
          ))}
        </div>
        {/* The image keeps its own ratio on phones. Beside the text the frame takes the row's height,
            and the packs are always shown whole (audit slide 15: the old crop cut their tops off): a
            packshot on white sits in the clay well (multiply), like every other pack on the site; a
            render with its own backdrop sits on a soft, blurred copy of itself. */}
        <div
          style={{ aspectRatio: `${eco.image.width} / ${eco.image.height}` }}
          className="group relative order-1 overflow-hidden bg-clay md:order-2 md:aspect-auto! md:min-h-full"
        >
          {!eco.image.packshot && (
            <Image src={eco.image.src} alt="" aria-hidden fill sizes="(max-width: 850px) 100vw, 62vw" className="scale-110 object-cover blur-2xl" />
          )}
          <Image
            src={eco.image.src}
            alt={eco.image.alt}
            fill
            sizes="(max-width: 850px) 100vw, 62vw"
            className={`object-contain transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03] ${eco.image.packshot ? "p-[4%] mix-blend-multiply" : ""}`}
          />
        </div>
      </div>

      <p {...reveal()} className="mx-auto mt-14 max-w-[600px] px-[10px] text-center text-[14px] leading-[1.8] text-ink-soft md:mt-20">
        {design.closing}
      </p>
    </section>
  )
}
