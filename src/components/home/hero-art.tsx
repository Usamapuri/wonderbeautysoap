import type { CSSProperties } from "react"
import { getImageProps } from "next/image"

import { CampaignVideo } from "@/components/brand/campaign-video"
import { cn } from "@/lib/utils"

// The layered Home opening (audit slides 1–2 asked for a video first screen). Back to front: the
// scenic plate (opaque; with a short seamless loop made from that plate alone), the product layer (a
// transparent still: the client's real box mockup and real soap, on exactly the same canvas as the
// plate) and, in hero.tsx, the copy. Both layers sit in one "canvas" box that has the art's own ratio
// and covers the hero like object-fit: cover (container query units, globals.css), so plate and
// product stay registered pixel for pixel at every size; `focus` picks which part of the canvas
// survives the crop. The loop's push-in is anchored at `anchor`, where the product meets its
// surface, so the still product never appears to slide. With reduced motion no clip is mounted
// (CampaignVideo) and the plate stays still. Without a loop, a slow CSS ease-in plays instead.
//
// Art direction: the portrait pair while PORTRAIT_QUERY matches. The same query is written out in
// globals.css (.hero-canvas, .hero-copy, .hero-wash); keep them in step.

export type HeroLayerPair = {
  /** Opaque scenic plate (back layer), .webp. */
  background: string
  /** Transparent product layer on exactly the same canvas as `background`, .webp. */
  foreground: string
  /** Pixel size of the canvas (both files). */
  width: number
  height: number
  /** Part of the canvas kept in view when the frame crops it, in % (like object-position). */
  focus: { x: number; y: number }
  /** Where the product touches its surface, in % of the canvas: the fixed point of the motion. */
  anchor: { x: number; y: number }
  /** Left edge of what the copy must not touch, in % of the canvas width: on the desktop pair the copy
   *  column stops short of it; on the portrait pair the sub-line does. */
  clear?: number
  /** Desktop: top of what sits under the copy column (the boxes on the ledge), in % of the canvas height;
   *  the heading ends above it. Portrait: top of the face; the heading ends above it unless it already
   *  stays left of `clear`. */
  floor?: number
  /** Desktop: left edge of what sits under the copy column (the boxes and their shadow), in % of the
   *  canvas width; the sub-line stays left of it, so it may pass beside them. */
  under?: number
  /** Seamless loop made from this plate alone (H.264, same ratio); `background` is its poster. */
  loop?: string
}

export type HeroArtContent = {
  desktop: HeroLayerPair
  mobile: HeroLayerPair
  /** Describes the whole picture (plate + product); the product layer itself is decorative. */
  alt: string
}

/** Viewport shapes up to 6:5 get the portrait pair (phones, tablets held upright, squarish windows). */
export const PORTRAIT_QUERY = "(max-aspect-ratio: 6/5)"

// The canvas is wider than the screen when the frame is taller than the art's ratio.
const SIZES = `${PORTRAIT_QUERY} 110vw, 100vw`

/** CSS variables for the hero section: the canvas geometry of both pairs (read by .hero-canvas and .hero-copy). */
export function heroArtVars({ desktop, mobile }: HeroArtContent): CSSProperties {
  const pair = (p: "d" | "m", a: HeroLayerPair) => ({
    [`--${p}-w`]: a.width,
    [`--${p}-h`]: a.height,
    [`--${p}-fx`]: a.focus.x / 100,
    [`--${p}-fy`]: a.focus.y / 100,
    [`--${p}-ax`]: `${a.anchor.x}%`,
    [`--${p}-ay`]: `${a.anchor.y}%`,
    [`--${p}-clear`]: (a.clear ?? 0) / 100,
    [`--${p}-floor`]: (a.floor ?? 100) / 100,
    [`--${p}-under`]: (a.under ?? 100) / 100,
  })
  return { ...pair("d", desktop), ...pair("m", mobile) } as CSSProperties
}

/** One layer as an art-directed <picture> (getImageProps, per the Next.js Image docs). */
function Layer({ desktop, mobile, alt }: { desktop: string; mobile: string; alt: string }) {
  // Two candidates, so no `preload` (it would fetch both); eager + high priority instead.
  const common = { alt, fill: true, sizes: SIZES, loading: "eager" as const, fetchPriority: "high" as const }
  const {
    props: { srcSet: tall },
  } = getImageProps({ ...common, src: mobile })
  const {
    props: { srcSet: wide, ...rest },
  } = getImageProps({ ...common, src: desktop })
  return (
    <picture>
      <source media={PORTRAIT_QUERY} srcSet={tall} />
      <source srcSet={wide} />
      <img {...rest} alt={alt} className="object-cover" />
    </picture>
  )
}

export function HeroArt({ art }: { art: HeroArtContent }) {
  const { desktop, mobile } = art
  const loop = desktop.loop && mobile.loop ? { desktop: desktop.loop, mobile: mobile.loop } : null
  return (
    <div className={cn("hero-art absolute inset-0 overflow-hidden", loop && "hero-art-loop")}>
      <div className="hero-canvas">
        {/* Back layer: the plate (the LCP image), under its loop when there is one. */}
        <div className="hero-layer hero-plate z-0">
          {loop ? (
            <CampaignVideo
              src={loop.desktop}
              poster={desktop.background}
              portrait={{ src: loop.mobile, poster: mobile.background, query: PORTRAIT_QUERY }}
              label={art.alt}
              sizes={SIZES}
              preload
            />
          ) : (
            <Layer desktop={desktop.background} mobile={mobile.background} alt={art.alt} />
          )}
        </div>
        {/* Product layer, on its own z-index above the plate. Decorative: the plate's alt describes both. */}
        <div aria-hidden className="hero-layer hero-product pointer-events-none z-10">
          <Layer desktop={desktop.foreground} mobile={mobile.foreground} alt="" />
        </div>
      </div>
    </div>
  )
}
