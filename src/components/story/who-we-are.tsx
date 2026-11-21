import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// Who we are (deck slide 11), as a centred note panel like rhode's "A note from Hailey".
export function WhoWeAre() {
  const { whoWeAre } = story
  return (
    <section id="who-we-are" aria-labelledby="who-heading" className="wrap-wide scroll-mt-[calc(var(--header-height)+16px)] px-3 pt-3 sm:px-5 sm:pt-5">
      <div {...reveal()} className="panel bg-parchment text-center">
        <Eyebrow center>
          <h2 id="who-heading">{whoWeAre.eyebrow}</h2>
        </Eyebrow>
        <p className="font-display type-card mx-auto mt-7 max-w-[820px] text-balance">
          <SplitText text={whoWeAre.lead} />
        </p>
        <p className="mx-auto mt-6 max-w-[46ch] text-[14px] leading-[1.75] text-ink-soft">{whoWeAre.body}</p>
      </div>
    </section>
  )
}
