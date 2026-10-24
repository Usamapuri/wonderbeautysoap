import { Lines } from "@/components/brand/lines"
import { PageCta } from "@/components/brand/page-cta"
import { CampaignFilm } from "@/components/home/campaign-film"
import { CollectionPreview } from "@/components/home/collection-preview"
import { DesignEco } from "@/components/home/design-eco"
import { Hero } from "@/components/home/hero"
import { MissionVision } from "@/components/home/mission-vision"
import { PromiseStrip } from "@/components/home/promise-strip"
import { Reviews } from "@/components/home/reviews"
import { ScentStories } from "@/components/home/scent-stories"
import { Welcome } from "@/components/home/welcome"
import { WorldTeaser } from "@/components/home/world-teaser"
import { home } from "@/content/home"

// Section order: the client's website brief deck (slide 3 — welcome, mission, vision, products,
// where it's sold; slide 9 — reviews at the end), laid out after the Gisou home page.
export default function HomePage() {
  const { closing } = home
  return (
    <>
      <Hero />
      <PromiseStrip />
      <Welcome />
      <CampaignFilm />
      <DesignEco />
      <ScentStories />
      <MissionVision />
      <CollectionPreview />
      <WorldTeaser />
      <Reviews />
      <PageCta eyebrow={closing.eyebrow} heading={<Lines lines={closing.heading} />} primary={closing.primaryCta} secondary={closing.secondaryCta} />
    </>
  )
}
