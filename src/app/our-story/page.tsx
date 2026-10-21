import type { Metadata } from "next"

import { PageCta } from "@/components/brand/page-cta"
import { Em, PageHero } from "@/components/brand/page-hero"
import { FounderNote } from "@/components/story/founder-note"
import { Rebrand } from "@/components/story/rebrand"
import { TeamGrid } from "@/components/story/team-grid"
import { ValuesBand } from "@/components/story/values-band"
import { ThenAndNow } from "@/components/story/then-and-now"
import { Timeline } from "@/components/story/timeline"
import { story } from "@/content/story"

export const metadata: Metadata = story.seo

// Original page (hero → founder note → values band → CTA) with the brief's §4.2 sections slotted in
// before the CTA: timeline → then & now → rebrand → team.
export default function OurStoryPage() {
  const { hero, cta } = story
  return (
    <>
      <PageHero
        id="story-title"
        eyebrow={hero.eyebrow}
        title={
          <>
            {hero.title.before}
            <br />
            {hero.title.middle}
            <Em>{hero.title.emphasis}</Em>
          </>
        }
        body={hero.body}
        image={hero.image}
        multiply
      />
      <FounderNote />
      <ValuesBand cells={story.values} />
      <Timeline />
      <ThenAndNow />
      <Rebrand />
      <TeamGrid />
      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.primary} secondary={cta.secondary} />
    </>
  )
}
