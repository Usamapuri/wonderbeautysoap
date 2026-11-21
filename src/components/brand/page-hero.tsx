import type { CSSProperties } from "react"
import Link from "next/link"
import { getImageProps } from "next/image"
import { ArrowDown } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { Button } from "@/components/ui/button"

/** One still of a page hero: the file, its pixel size, object-position and the calm area for the copy. */
type HeroStill = {
  src: string
  width: number
  height: number
  /** CSS object-position, "x% y%". */
  position: string
  /** The calm area as fractions of the picture: the copy stays left of `x` and above `y`. */
  calm: { x: number; y: number }
}

export type PageHeroArt = HeroStill & {
  /** 9:16 still for phones and upright tablets (up to a 6:5 screen, as on Home). */
  mobile: HeroStill
  alt: string
}

const pct = (position: string, i: 0 | 1) => Number.parseFloat(position.split(" ")[i]) / 100

// The gold page opening shared by Our Story, The Collection and Around the World (owner, phase 3: "follow the
// golden theme for the hero section as we did for Home"). A full-bleed still in the gold palette, with the
// eyebrow, the two-line title, and the intro or button where the page has them, set over it in white in the
// Home hero's type family and scale steps (DM Serif Display, leading 0.86, second line italic). The copy sits
// in the picture's calm area: the hero works out where that area lands after object-fit: cover (globals.css
// .page-hero), so the title shrinks only where the area is small. 16:9 picture on wide screens, 9:16 on phones
// and upright tablets, chosen with art direction (Next.js getImageProps + <picture>); stills only, no loop.
export function PageHero({
  id,
  eyebrow,
  title,
  titleEm,
  titleLines = 2,
  intro,
  cta,
  art,
}: {
  id: string
  eyebrow: string
  title: { before: string; emphasis: string }
  /** Width in em of the title's widest unbreakable part (a word or short phrase), DM Serif Display at 92%. */
  titleEm: number
  /** Lines the title takes when it wraps at that width (both title lines can wrap at word boundaries). */
  titleLines?: number
  intro?: string
  cta?: { label: string; href: string }
  art: PageHeroArt
}) {
  // Two candidates, so no `preload` (it would fetch both): eager + high priority (the LCP image). Served as the
  // files themselves (`unoptimized`), so the version suffix on each src (?v=…, bumped when the art worker replaces
  // a file in place) reaches the browser and no optimiser cache can show an old picture; the files are already
  // web-sized WebP (100–250 KB).
  const common = { alt: art.alt, loading: "eager" as const, fetchPriority: "high" as const, unoptimized: true }
  const { props: rest } = getImageProps({ ...common, src: art.src, width: art.width, height: art.height })
  const tall = art.mobile.src
  const wide = art.src

  const vars = {
    "--d-ar": art.width / art.height,
    "--d-fx": pct(art.position, 0),
    "--d-fy": pct(art.position, 1),
    "--d-cx": art.calm.x,
    "--d-cy": art.calm.y,
    "--m-ar": art.mobile.width / art.mobile.height,
    "--m-fx": pct(art.mobile.position, 0),
    "--m-fy": pct(art.mobile.position, 1),
    "--m-cy": art.mobile.calm.y,
    "--d-pos": art.position,
    "--m-pos": art.mobile.position,
    "--title-em": titleEm,
    "--title-h": titleLines * 0.86 + 0.6, // lines + glyph overhang + the em-based gaps above and below
    // Height of what follows the title (gaps included): the intro line, the button.
    "--after-d": `${(intro ? 48 : 0) + (cta ? 82 : 0)}px`,
    "--after-m": `${(intro ? 42 : 0) + (cta ? 66 : 0)}px`,
  } as CSSProperties

  return (
    <section aria-labelledby={id} style={vars} className="page-hero relative isolate overflow-hidden bg-bronze text-white [container-type:inline-size]">
      <div className="page-hero-frame relative">
        <picture>
          <source media="(max-aspect-ratio: 6/5)" srcSet={tall} width={art.mobile.width} height={art.mobile.height} />
          <source srcSet={wide} width={art.width} height={art.height} />
          <img {...rest} alt={art.alt} className="page-hero-img absolute inset-0 size-full object-cover" />
        </picture>
        <div className="page-hero-calm absolute inset-0">
          <div className="page-hero-copy rise-group">
            <Eyebrow tone="white">{eyebrow}</Eyebrow>
            <h1 id={id} className="page-hero-title font-display leading-[0.86] text-white">
              <span className="block">
                <SplitText text={title.before} now />
              </span>
              <span className="block italic">
                <SplitText text={title.emphasis} now start={1} />
              </span>
            </h1>
            {/* A "Name — A | B | C" line keeps its triplet together, so it never breaks at a bar. */}
            {intro && (
              <p className="page-hero-intro type-label uppercase tracking-[0.18em] text-white">
                {intro.includes(" — ") ? (
                  <>
                    {intro.split(" — ")[0]} — <span className="whitespace-nowrap">{intro.split(" — ").slice(1).join(" — ")}</span>
                  </>
                ) : (
                  intro
                )}
              </p>
            )}
            {cta && (
              <div className="page-hero-cta">
                <Button asChild variant="wonder" size="wonder">
                  <Link href={cta.href}>
                    {cta.label} <ArrowDown aria-hidden className="size-3.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
