import { PageHero } from "@/components/brand/page-hero"
import { story } from "@/content/story"

// Our Story's opening: the shared gold page hero (owner, phase 3), white title in the picture's calm left
// (top on phones) and the link down to "Who we are".
export function StoryHero() {
  const { hero } = story
  return <PageHero id="story-title" eyebrow={hero.eyebrow} title={hero.title} titleEm={hero.titleEm} titleLines={hero.titleLines} cta={hero.cta} art={hero.art} />
}
