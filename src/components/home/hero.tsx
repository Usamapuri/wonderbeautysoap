import Link from "next/link"
import { ArrowDown } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { HeroArt, heroArtVars } from "@/components/home/hero-art"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"

// The first screen (audit slides 1–2: "I want the first loading page to be a video"): the layered
// lifestyle campaign picture (hero-art.tsx), graded golden caramel, whose scene plays as a slow, gentle
// loop behind the still layer of real boxes. The copy has the earlier hero's treatment, as the client
// asked (2026-11-21: "use this colour combination", "text in white", "same spacing and font"): the Bolt
// opening "Scent. / Lather. / Wonder.", middle word italic and indented, in white (#fff: the earlier cream
// at 80-85% opacity falls below 4.5:1 on the gold), with the earlier hero's type scale and spacing
// (eyebrow → heading 32px, heading → sub-line 32px, sub-line → button 36px). Its sizes are capped only
// where the picture needs it (globals.css .hero-copy): on wide screens the column stops short of her hands
// and the text ends above the boxes on the ledge; on phones and upright tablets all copy stays in the top
// 35% of the frame, above the glow around her hair, and on phones the button sits below her hands. The plate's poster is the
// LCP image: eager, high priority, no <link rel="preload"> (two art-directed candidates).
export function Hero() {
  const { hero } = home
  const [first, middle, last] = hero.headline
  return (
    <section
      aria-labelledby="hero-heading"
      style={heroArtVars(hero.art)}
      className="relative isolate overflow-hidden bg-bronze text-white [container-type:inline-size]"
    >
      <HeroArt art={hero.art} />

      <div className="hero-copy hero-copy-desk wrap-wide relative z-30 px-[22px] sm:px-[clamp(24px,6vw,96px)]">
        {/* No max-width utility here: on wide screens .hero-copy-desk sets it from the product's position. */}
        <div className="rise-group">
          <Eyebrow tone="white">{hero.eyebrow}</Eyebrow>
          <h1 id="hero-heading" className="hero-title font-display leading-[0.86] text-white">
            <span className="block">
              <SplitText text={first} now />
            </span>
            <span className="block pl-[0.4em] italic">
              <SplitText text={middle} now start={1} />
            </span>
            <span className="block">
              <SplitText text={last} now start={2} />
            </span>
          </h1>
          {/* Width and the gaps above the heading and the sub-line come from .hero-title / .hero-sub in
              globals.css (they change with the picture); no margin or max-width utilities here, which would
              override them. */}
          <p className="hero-sub text-[13px] leading-[1.8] text-white">{hero.sub}</p>
        </div>
        {/* The small "Scent · Glow · Wonder" line that sat under the button was dropped in the declutter
            pass (2026-11-21): it repeated the heading, and the promise strip follows directly. */}
        <div className="rise-group">
          <Button asChild variant="wonder" size="wonder">
            <Link href={hero.primaryCta.href}>
              {hero.primaryCta.label} <ArrowDown aria-hidden className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
