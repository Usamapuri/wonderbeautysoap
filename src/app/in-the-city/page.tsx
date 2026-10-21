import type { Metadata } from "next"

import { Eyebrow } from "@/components/brand/eyebrow"
import { PageCta } from "@/components/brand/page-cta"
import { Em, PageHero } from "@/components/brand/page-hero"
import { SocialTextLinks } from "@/components/brand/social-links"
import { CampaignGallery } from "@/components/city/campaign-gallery"
import { RealPhotos } from "@/components/city/real-photos"
import { city } from "@/content/city"
import { reveal } from "@/lib/reveal"

export const metadata: Metadata = city.seo

// Brief §4.4. The honesty disclaimer is required and must stay visible near the top.
export default function InTheCityPage() {
  const { hero, disclaimer, cta } = city
  return (
    <>
      <PageHero
        id="city-title"
        eyebrow={hero.eyebrow}
        title={
          <>
            {hero.title.before}
            <br />
            <Em>{hero.title.emphasis}</Em>
          </>
        }
        body={hero.body}
        image={hero.image}
      />

      <section {...reveal()} aria-label="About these images" className="bg-stone px-[22px] py-9 sm:flex sm:items-start sm:gap-6 sm:px-[clamp(24px,10vw,160px)] sm:py-[54px] md:gap-[45px]">
        <Eyebrow className="mb-[19px] shrink-0 pt-1 sm:mb-0 sm:basis-[190px] md:basis-[250px]">{disclaimer.eyebrow}</Eyebrow>
        <p className="max-w-[650px] text-[13px] leading-[1.85] text-ink">{disclaimer.text}</p>
      </section>

      <CampaignGallery />
      <RealPhotos />

      <PageCta eyebrow={cta.eyebrow} heading={cta.heading} primary={cta.action}>
        <p className="mt-9 mb-2 text-[8px] uppercase tracking-[0.18em] text-ink-muted">{cta.follow}</p>
        <SocialTextLinks only={cta.channels} />
      </PageCta>
    </>
  )
}
