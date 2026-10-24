import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"

// rhode-style opening: one large rounded picture panel with the page title and a link down to
// "Who we are".
export function StoryHero() {
  const { hero } = story
  return (
    <section aria-labelledby="story-title" className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="relative isolate min-h-[560px] overflow-hidden rounded-lg text-paper sm:min-h-[640px] md:min-h-[min(780px,calc(100svh-120px))]">
        <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="100vw" className="object-cover object-[60%_50%]" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="rise-group absolute inset-x-0 bottom-0 flex flex-col items-start gap-6 p-7 sm:p-12 md:items-end md:p-16 md:text-right">
          <Eyebrow tone="cream">{hero.eyebrow}</Eyebrow>
          <h1 id="story-title" className="font-display max-w-[640px] text-[clamp(64px,16vw,96px)] leading-[0.9] md:text-[clamp(80px,9vw,140px)]">
            <SplitText text={hero.title.before} now /> <em className="text-gilt">
              <SplitText text={hero.title.emphasis} now start={1} />
            </em>
          </h1>
          <Button asChild variant="wonder-light" size="wonder">
            <Link href={hero.cta.href}>
              {hero.cta.label} <ArrowDown aria-hidden className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
