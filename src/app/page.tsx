import { BotanicalEdit } from "@/components/home/botanical-edit"
import { BrandIntro } from "@/components/home/brand-intro"
import { CampaignFilm } from "@/components/home/campaign-film"
import { ClosingCta } from "@/components/home/closing-cta"
import { CollectionPreview } from "@/components/home/collection-preview"
import { Hero } from "@/components/home/hero"
import { PromiseStrip } from "@/components/home/promise-strip"
import { QuietDetail } from "@/components/home/quiet-detail"
import { RealWorld } from "@/components/home/real-world"
import { RetailStrip } from "@/components/home/retail-strip"

// Section order replicates the original site's Home; PromiseStrip is the one brief addition.
export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <BotanicalEdit />
      <CampaignFilm />
      <CollectionPreview />
      <RealWorld />
      <BrandIntro />
      <QuietDetail />
      <RetailStrip />
      <ClosingCta />
    </>
  )
}
