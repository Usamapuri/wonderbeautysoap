import type { Metadata } from "next"

import { PageCta } from "@/components/brand/page-cta"
import { SocialTextLinks } from "@/components/brand/social-links"
import { WorldHero } from "@/components/world/world-hero"
import { WorldRegions } from "@/components/world/world-regions"
import { world } from "@/content/world"

export const metadata: Metadata = world.seo

// Around the World (deck slide 18; formerly "In the City"), redesigned on the owner's request
// (2026-11-21): hero picture with the title, the four regions as one grid with the countries line,
// then the closing band. The former real photos (London, "Spotted at") are no
// longer shown here: generated pictures never stand in for real store or location photos.
export default function AroundTheWorldPage() {
  const { cta } = world
  return (
    <>
      <WorldHero />
      <WorldRegions />
      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.action} tone="stone">
        <p className="mt-9 mb-2 text-[8px] uppercase tracking-[0.18em] text-ink-muted">{cta.follow}</p>
        <SocialTextLinks only={cta.channels} />
      </PageCta>
    </>
  )
}
