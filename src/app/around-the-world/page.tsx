import type { Metadata } from "next"

import { Copy } from "@/components/brand/copy"
import { Eyebrow } from "@/components/brand/eyebrow"
import { PageCta } from "@/components/brand/page-cta"
import { SocialTextLinks } from "@/components/brand/social-links"
import { ScentOrigins } from "@/components/world/scent-origins"
import { WorldGalleries } from "@/components/world/world-galleries"
import { WorldHero } from "@/components/world/world-hero"
import { SplitText } from "@/components/brand/split-text"
import { world } from "@/content/world"
import { reveal } from "@/lib/reveal"

export const metadata: Metadata = world.seo

// Around the World (deck slide 18; formerly "In the City"): hero banner, real photographs grouped by
// place, where each scent was born, where Wonder is available, and the closing line.
export default function AroundTheWorldPage() {
  const { availability, cta } = world
  return (
    <>
      <WorldHero />
      <WorldGalleries />
      <ScentOrigins />

      <section aria-labelledby="availability-heading" className="px-section py-section">
        <div {...reveal()} className="mx-auto grid max-w-[1100px] gap-8 rounded-lg border border-line bg-parchment p-8 sm:p-12 md:grid-cols-[0.8fr_1.2fr] md:p-16">
          <div>
            <Eyebrow>{availability.eyebrow}</Eyebrow>
            <h2 id="availability-heading" className="font-display mt-5 text-[clamp(40px,4.6vw,64px)]">
              <SplitText text={availability.heading} />
            </h2>
          </div>
          <div className="flex flex-col gap-4 self-end text-[12px] leading-[1.8]">
            <p>
              <Copy value={availability.countries} />
            </p>
            <p>
              <Copy value={availability.reel} />
            </p>
          </div>
        </div>
      </section>

      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.action} tone="stone">
        <p className="mt-9 mb-2 text-[8px] uppercase tracking-[0.18em] text-ink-muted">{cta.follow}</p>
        <SocialTextLinks only={cta.channels} />
      </PageCta>
    </>
  )
}
