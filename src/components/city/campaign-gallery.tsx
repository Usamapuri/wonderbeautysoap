import Image from "next/image"

import { city } from "@/content/city"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// The original's .campaign-grid: two staggered columns of captioned cards. Every card states it is
// an AI concept.
export function CampaignGallery() {
  return (
    <section aria-label="AI-generated campaign concepts" className="px-5 pt-[42px] pb-[75px] sm:px-[clamp(24px,8vw,128px)] sm:pt-[70px] sm:pb-[115px]">
      <ul className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 sm:gap-[22px]">
        {city.visuals.map((v, i) => (
          <li key={v.src} {...reveal(i % 2 === 1 ? 120 : 0)} className={cn(i % 2 === 1 && "sm:mt-[85px]")}>
            <figure className="group m-0 overflow-hidden bg-linen">
              <div className="relative aspect-[0.98] overflow-hidden sm:aspect-[1.2]">
                <Image
                  src={v.src}
                  alt={v.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]"
                />
              </div>
              <figcaption className="flex min-h-[90px] flex-col justify-center gap-[7px] px-[22px] py-[19px] sm:min-h-[105px]">
                <span className="text-[8px] uppercase tracking-[0.17em] text-ink-muted">
                  {v.scene} · {city.varietyName(v.variety)}
                </span>
                <strong className="font-display text-[27px] leading-none tracking-normal sm:text-[31px]">{v.title}</strong>
                <small className="text-[8px] uppercase tracking-[0.17em] text-rose">{city.conceptLabel}</small>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
