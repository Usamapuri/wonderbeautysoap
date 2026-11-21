import Image from "next/image"

import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// "Our mission" / "Our vision" are set as real section titles, not small labels (audit slides
// 17–18), and each panel's text is centred in its panel (slide 17: "the text should have been in
// the middle"). Declutter pass 2026-11-21 (owner: "too much pics"): the mission panel runs full width
// without the picture that used to sit beside it; the vision keeps its picture (audit slide 19).
export function MissionVision() {
  const { mission, vision } = home
  return (
    <section aria-label="Our mission and vision" className="wrap-wide grid gap-3 px-3 py-3 sm:gap-5 sm:px-5 sm:py-5">
      <div {...reveal()} className="panel flex flex-col items-center justify-center gap-7 bg-parchment text-center">
        <h2 className="font-display type-section text-gold">
          <SplitText text={mission.eyebrow} />
        </h2>
        <p className="font-display type-card max-w-[860px] text-balance">
          <SplitText text={mission.text} />
        </p>
      </div>

      <div className="grid items-stretch gap-3 sm:gap-5 md:grid-cols-2">
        <div {...reveal()} className="panel order-2 flex flex-col justify-center gap-7 bg-ink text-paper md:order-1">
          <h2 className="font-display type-section text-gilt">
            <SplitText text={vision.eyebrow} />
          </h2>
          <div>
            <p className="font-display text-[clamp(22px,2vw,30px)] leading-[1.2]">{vision.text}</p>
            <p className="font-display mt-5 text-[clamp(22px,2vw,30px)] text-gilt italic">{vision.signOff}</p>
            <p className="mt-7 max-w-[46ch] border-t border-paper/15 pt-5 text-[12px] leading-[1.75] text-paper/75">{vision.second}</p>
          </div>
        </div>
        {/* The picture at its own ratio; beside the text on wide screens it takes the row's height. */}
        <div
          {...reveal(120)}
          style={{ aspectRatio: `${vision.image.width} / ${vision.image.height}` }}
          className={cn("tile-pop relative order-1 w-full bg-clay md:order-2 md:h-full")}
        >
          <Image src={vision.image.src} alt={vision.image.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
