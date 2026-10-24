import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// Who we are (deck slide 11), as a centred note panel like rhode's "A note from Hailey".
export function WhoWeAre() {
  const { whoWeAre } = story
  return (
    <section id="who-we-are" aria-labelledby="who-heading" className="scroll-mt-[calc(var(--header-height)+16px)] px-3 pt-3 sm:px-5 sm:pt-5">
      <div {...reveal()} className="rounded-lg bg-parchment px-7 py-16 text-center sm:px-12 sm:py-24 md:py-28">
        <Eyebrow center>
          <h2 id="who-heading">{whoWeAre.eyebrow}</h2>
        </Eyebrow>
        <p className="font-display mx-auto mt-8 max-w-[880px] text-[clamp(28px,3.6vw,50px)] leading-[1.15]">
          <SplitText text={whoWeAre.lead} />
        </p>
        <p className="mx-auto mt-8 max-w-[520px] text-[14px] leading-[1.8] text-ink-soft">{whoWeAre.body}</p>
      </div>
    </section>
  )
}
