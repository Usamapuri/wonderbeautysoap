import type { Metadata } from "next"

import { PageCta } from "@/components/brand/page-cta"
import { CeoPromise } from "@/components/story/ceo-promise"
import { FounderNote } from "@/components/story/founder-note"
import { OurValues } from "@/components/story/our-values"
import { StoryHero } from "@/components/story/story-hero"
import { TeamGrid } from "@/components/story/team-grid"
import { WhoWeAre } from "@/components/story/who-we-are"
import { story } from "@/content/story"

export const metadata: Metadata = { ...story.seo, alternates: { canonical: "/our-story" } }

// Section order: the client's website brief deck, slide 10. Layout after rhode's About page:
// rounded panels with narrow gutters. The Wonder Room artwork row was removed (audit slides 24–25),
// and "Why Wonder?" moved to Home (owner request 2026-11-21).
export default function OurStoryPage() {
  const { cta } = story
  return (
    <>
      <StoryHero />
      <WhoWeAre />
      <OurValues />
      <FounderNote />
      <CeoPromise />
      <TeamGrid />
      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.primary} secondary={cta.secondary} className="mt-3 sm:mt-5" />
    </>
  )
}
