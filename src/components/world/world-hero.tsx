import type { CSSProperties } from "react"
import { getImageProps } from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { world } from "@/content/world"

// Hero (deck slide 18: "Wonder, wherever you are."): one large rounded picture panel with the title,
// like Our Story's opening. 16:9 picture on wide screens, 4:5 on phones and upright tablets (art direction
// with Next.js getImageProps + <picture>); the copy sits on the picture's calm, light side, in ink, and the
// title is sized to that calm area (globals.css .world-frame / .world-title).
export function WorldHero() {
  const { hero } = world
  const { image } = hero
  const common = { alt: image.alt, sizes: "(max-width: 1800px) 100vw, 1760px", loading: "eager" as const, fetchPriority: "high" as const }
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: image.mobile.src, width: image.mobile.width, height: image.mobile.height })
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: image.src, width: image.width, height: image.height })
  return (
    <section aria-labelledby="world-title" className="wrap-wide px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="world-frame relative isolate overflow-hidden rounded-lg">
        <picture>
          <source media="(max-width: 639px), (max-width: 1023px) and (orientation: portrait)" srcSet={tall} />
          <source srcSet={wide} />
          <img
            {...rest}
            alt={image.alt}
            className="world-img absolute inset-0 size-full object-cover"
            style={{ "--pos": image.position, "--pos-m": image.mobile.position } as CSSProperties}
          />
        </picture>
        {/* Ink copy on the picture's calm, light area (art manifest): the top 28% on the 4:5 picture, the
            top-left (x 0-42%, y 0-40%) on the 16:9 one. Column width and title size come from globals.css. */}
        {/* A size container covering the frame (its units resolve against the frame), holding the copy. */}
        <div className="world-calm absolute inset-0">
          <div className="world-copy rise-group absolute inset-x-0 top-0 flex flex-col gap-6 p-7 text-ink sm:p-12 md:p-16">
            <Eyebrow tone="ink">{hero.eyebrow}</Eyebrow>
            <h1 id="world-title" className="world-title font-display">
              <SplitText text={hero.title.before} now />
              <br />
              <em className="text-gold">
                <SplitText text={hero.title.emphasis} now start={1} />
              </em>
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
