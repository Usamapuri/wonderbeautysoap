import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { city } from "@/content/city"
import { reveal, revealGroup } from "@/lib/reveal"

// The client's real photographs, kept visibly separate from the AI concepts (starter .city-real).
// To drop this band (brief §4.4: only if the photos hold up), remove <RealPhotos /> from the page.
export function RealPhotos() {
  const { real } = city
  return (
    <section
      aria-labelledby="real-heading"
      className="grid items-center gap-7 bg-fern px-[22px] pt-[65px] pb-[75px] text-paper sm:px-[clamp(24px,8vw,128px)] sm:pt-[85px] sm:pb-[105px] md:grid-cols-[0.72fr_1.28fr] md:gap-[7vw]"
    >
      <div {...reveal()}>
        <Eyebrow tone="gilt">{real.eyebrow}</Eyebrow>
        <h2 id="real-heading" className="font-display my-[22px] text-[clamp(44px,5vw,68px)]">
          {real.heading}
        </h2>
        <p className="max-w-[360px] text-xs leading-[1.8] text-paper/80">{real.body}</p>
      </div>
      <div {...revealGroup} className="grid max-w-[650px] grid-cols-2 items-start gap-[9px] sm:gap-[13px] md:max-w-none">
        {real.photos.map((p, i) => (
          <figure key={p.src} className={i % 2 === 1 ? "m-0 mt-[30px] sm:mt-[55px]" : "m-0"}>
            <div className="relative aspect-[0.78] sm:aspect-[0.86]">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 850px) 50vw, 30vw" className="object-cover" />
            </div>
            <figcaption className="pt-2.5 text-[9px] uppercase tracking-[0.1em] text-paper/80">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
