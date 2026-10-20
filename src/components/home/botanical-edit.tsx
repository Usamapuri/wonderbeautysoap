import Image from "next/image"

import { Lines } from "@/components/brand/lines"
import { home } from "@/content/home"
import { reveal, revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// The original's "flavor story": three imagined worlds, staggered, with a concept-art footnote.
export function BotanicalEdit() {
  const { botanicalEdit } = home
  return (
    <section
      aria-label={botanicalEdit.label}
      className="relative bg-linen px-5 pt-[66px] pb-[57px] sm:px-[6vw] sm:pt-[76px] sm:pb-[66px] md:px-[clamp(22px,8vw,128px)] md:pt-[104px] md:pb-[88px]"
    >
      <div {...reveal()} className="mx-auto mb-[35px] max-w-[1240px] border-b border-ink/20 pb-[19px] sm:flex sm:items-end sm:justify-between">
        <span className="text-[8px] uppercase tracking-[0.22em] text-ink-muted">{botanicalEdit.eyebrow}</span>
        <h2 className="font-display mt-[17px] text-[39px] leading-[0.92] tracking-normal sm:mt-0 sm:text-right sm:text-[clamp(34px,4.3vw,60px)]">
          <Lines lines={botanicalEdit.lead} />
        </h2>
      </div>

      <div {...revealGroup} className="mx-auto grid max-w-[1240px] grid-cols-2 items-start gap-2.5 sm:grid-cols-[1fr_1fr_1.15fr] sm:gap-[15px]">
        {botanicalEdit.images.map((img, i) => (
          <figure
            key={img.src}
            className={cn(
              "group relative m-0",
              i === 1 && "sm:mt-[46px]",
              i === 2 && "col-span-2 w-[78%] justify-self-center sm:col-span-1 sm:mt-3 sm:w-auto sm:justify-self-auto",
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden sm:h-[clamp(220px,38vw,350px)] md:h-[clamp(260px,34vw,470px)]",
                i === 2 ? "h-[260px]" : "h-[220px]",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 560px) 50vw, 33vw"
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.018]"
              />
            </div>
            <figcaption className="font-display block px-px py-2.5 text-[23px] tracking-normal sm:flex sm:items-baseline sm:justify-between sm:gap-3 sm:py-[13px] sm:text-[27px]">
              {img.variety}
              <small className="mt-1.5 block font-sans text-[8px] font-normal uppercase tracking-[0.15em] text-ink-muted sm:mt-0 sm:text-right">
                {img.mood}
              </small>
            </figcaption>
          </figure>
        ))}
      </div>
      <p {...reveal(200)} className="mx-auto mt-3.5 max-w-[1240px] text-[8px] tracking-[0.12em] text-ink-muted sm:text-right">{botanicalEdit.footnote}</p>
    </section>
  )
}
