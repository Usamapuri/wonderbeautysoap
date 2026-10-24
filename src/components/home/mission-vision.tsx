import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

type Visual = { src: string; alt: string; width: number; height: number }

// Image panel at the photo's own aspect ratio. On wide screens it also stretches to the row height
// (the row is at least as tall as the picture), so a much longer text panel would crop it slightly.
function Picture({ image, className }: { image: Visual; className?: string }) {
  return (
    <div {...reveal()} style={{ aspectRatio: `${image.width} / ${image.height}` }} className={cn("tile-pop relative w-full bg-clay", className)}>
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
    </div>
  )
}

// Mission and vision (deck slides 7–8: "visual" beside each), as rhode-style side-by-side panels.
export function MissionVision() {
  const { mission, vision } = home
  return (
    <section aria-label="Our mission and vision" className="grid gap-3 px-3 py-3 sm:px-5 sm:py-5">
      <div className="grid items-stretch gap-3 md:grid-cols-[0.75fr_1.25fr]">
        <Picture image={mission.image} className="md:h-full" />
        <div {...reveal(120)} className="flex flex-col justify-between gap-10 rounded-lg bg-parchment p-8 sm:p-12 md:p-16">
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <p className="font-display text-[clamp(30px,3.6vw,54px)] leading-[1.08]">
            <SplitText text={mission.text} />
          </p>
        </div>
      </div>

      <div className="grid items-stretch gap-3 md:grid-cols-2">
        <div {...reveal()} className="order-2 flex flex-col justify-between gap-10 rounded-lg bg-ink p-8 text-paper sm:p-12 md:order-1">
          <Eyebrow tone="gilt">{vision.eyebrow}</Eyebrow>
          <div>
            <p className="font-display text-[clamp(24px,2.1vw,32px)] leading-[1.15]">{vision.text}</p>
            <p className="font-display mt-5 text-[clamp(22px,2.2vw,30px)] text-gilt italic">{vision.signOff}</p>
            <p className="mt-8 max-w-[440px] border-t border-paper/15 pt-5 text-[12px] leading-[1.75] text-paper/75">{vision.second}</p>
          </div>
        </div>
        <Picture image={vision.image} className="order-1 md:order-2 md:h-full" />
      </div>
    </section>
  )
}
