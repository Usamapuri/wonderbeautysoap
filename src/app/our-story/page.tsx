import type { Metadata } from "next"

import { Eyebrow } from "@/components/brand/eyebrow"
import { PageCta } from "@/components/brand/page-cta"
import { CeoPromise } from "@/components/story/ceo-promise"
import { FounderNote } from "@/components/story/founder-note"
import { OurValues } from "@/components/story/our-values"
import { StoryHero } from "@/components/story/story-hero"
import { TeamGrid } from "@/components/story/team-grid"
import { ValuesBand } from "@/components/story/values-band"
import { WhoWeAre } from "@/components/story/who-we-are"
import { WonderRoom } from "@/components/story/wonder-room"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

export const metadata: Metadata = story.seo

// Section order: the client's website brief deck, slide 10. Layout after rhode's About page:
// rounded panels with narrow gutters; "Why Wonder?" keeps the full-width three-cell band.
export default function OurStoryPage() {
  const { whyWonder, cta } = story
  return (
    <>
      <StoryHero />
      <WhoWeAre />
      <OurValues />

      <section aria-labelledby="why-heading" className="pt-16 sm:pt-24">
        <div {...reveal()} className="px-section pb-10 text-center sm:pb-14">
          <Eyebrow center>Royal Basket Group</Eyebrow>
          <h2 id="why-heading" className="font-display mt-5 text-[clamp(44px,6vw,84px)]">
            <SplitText text={whyWonder.eyebrow} />
          </h2>
        </div>
        <ValuesBand cells={whyWonder.cells} />
      </section>

      <WonderRoom />
      <FounderNote />
      <CeoPromise />
      <TeamGrid />
      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.primary} secondary={cta.secondary} className="mt-3 sm:mt-5" />
    </>
  )
}
