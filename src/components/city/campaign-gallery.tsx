import Image from "next/image"

import { city } from "@/content/city"
import { reveal } from "@/lib/reveal"

// The original's .campaign-grid, as aligned captioned cards (1 / 2 / 3 per row, a short last row
// centred). Every card states it is an AI concept.
export function CampaignGallery() {
  return (
    <section aria-label="AI-generated campaign concepts" className="px-5 pt-[42px] pb-[75px] sm:px-[clamp(24px,6vw,96px)] sm:pt-[70px] sm:pb-[115px]">
      <ul className="mx-auto flex max-w-[1240px] flex-wrap justify-center gap-5 sm:gap-[22px]">
        {city.visuals.map((v, i) => (
          <li key={v.src} {...reveal((i % 3) * 110)} className="flex w-full sm:w-[calc(50%-11px)] lg:w-[calc((100%-44px)/3)]">
            <figure className="card-pop group m-0 flex w-full flex-col">
              {/* Square frame = the square concept art, so nothing is cropped. */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={v.src}
                  alt={v.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex min-h-[90px] flex-1 flex-col justify-center gap-[7px] px-[22px] py-[19px] sm:min-h-[105px]">
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
