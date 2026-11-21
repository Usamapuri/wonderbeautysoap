import type { CSSProperties } from "react"
import Link from "next/link"
import { getImageProps } from "next/image"
import { ArrowDown } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"

// rhode-style opening: one large rounded panel with the page title and a link down to "Who we are".
// The picture is a still (owner request 2026-11-21: "a separate hero image for Our Story"; it replaces
// the video the audit asked for, S23): a 16:9 version, and a 4:5 one for phones, chosen with
// art direction (Next.js getImageProps + <picture>). The lower-right of the picture is calm and light, so
// the copy sits bottom-right at every size, in ink (no darkening wash).
export function StoryHero() {
  const { hero } = story
  const { image } = hero
  // Two candidates, so no `preload` (it would fetch both): eager + high priority (the LCP image).
  const common = { alt: image.alt, sizes: "(max-width: 1800px) 100vw, 1760px", loading: "eager" as const, fetchPriority: "high" as const }
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: image.mobile.src, width: image.mobile.width, height: image.mobile.height })
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: image.src, width: image.width, height: image.height })
  return (
    <section aria-labelledby="story-title" className="wrap-wide px-3 pt-3 sm:px-5 sm:pt-5">
      <div>
        <div className="relative isolate min-h-[560px] overflow-hidden rounded-lg sm:min-h-[640px] md:min-h-[clamp(560px,calc(100svh-120px),780px)]">
          <picture>
            <source media="(max-width: 639px)" srcSet={tall} />
            <source srcSet={wide} />
            <img
              {...rest}
              alt={image.alt}
              className="absolute inset-0 size-full object-cover object-(--pos-m) sm:object-(--pos)"
              style={{ "--pos": image.position, "--pos-m": image.mobile.position } as CSSProperties}
            />
          </picture>
          <div className="rise-group absolute inset-x-0 bottom-0 flex flex-col items-end gap-6 p-7 text-right text-ink sm:p-12 md:p-16">
            <Eyebrow tone="ink">{hero.eyebrow}</Eyebrow>
            <h1 id="story-title" className="font-display type-title max-w-[640px]">
              <SplitText text={hero.title.before} now /> <em className="text-gold">
                <SplitText text={hero.title.emphasis} now start={1} />
              </em>
            </h1>
            <Button asChild variant="wonder" size="wonder">
              <Link href={hero.cta.href}>
                {hero.cta.label} <ArrowDown aria-hidden className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
