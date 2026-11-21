import { Lines } from "@/components/brand/lines"
import { PageCta } from "@/components/brand/page-cta"
import { CampaignFilm } from "@/components/home/campaign-film"
import { CollectionPreview } from "@/components/home/collection-preview"
import { Hero } from "@/components/home/hero"
import { MissionVision } from "@/components/home/mission-vision"
import { PromiseStrip } from "@/components/home/promise-strip"
import { Reviews } from "@/components/home/reviews"
import { Welcome } from "@/components/home/welcome"
import { WhyWonder } from "@/components/home/why-wonder"
import { WorldTeaser } from "@/components/home/world-teaser"
import { home } from "@/content/home"

// Section order: the client's website brief deck (slide 3 — welcome, mission, vision, products,
// where it's sold; slide 9 — reviews at the end), laid out after the Gisou home page. The scent
// artwork collage ("Wonder, wherever you are.") was removed (audit slide 16). The design statement and the eco
// packaging panel were removed at the owner's request (phase 3). Reviews are back at the owner's
// request (phase 3), near the end as before: three customer reviews the owner confirmed as genuine.
export default function HomePage() {
  const { closing } = home
  return (
    <>
      <Hero />
      <PromiseStrip />
      <WhyWonder />
      <Welcome />
      <CampaignFilm />
      <MissionVision />
      <CollectionPreview />
      <WorldTeaser />
      <Reviews />
      <PageCta eyebrow={closing.eyebrow} heading={<Lines lines={closing.heading} />} primary={closing.primaryCta} secondary={closing.secondaryCta} />
    </>
  )
}
