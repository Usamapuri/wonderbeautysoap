import { PageHero } from "@/components/brand/page-hero"
import { world } from "@/content/world"

// Around the World's opening (deck slide 18: "Wonder, wherever you are."): the shared gold page hero (owner,
// phase 3), white title in the picture's calm top-left, above the pinned route (top on phones).
export function WorldHero() {
  const { hero } = world
  return <PageHero id="world-title" eyebrow={hero.eyebrow} title={hero.title} titleEm={hero.titleEm} titleLines={hero.titleLines} art={hero.art} />
}
