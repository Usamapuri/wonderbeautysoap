import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { site } from "@/content/site"

// The Bolt prototype's opening, kept as the client asked (deck slide 4): bronze glow, a faint
// circle, "Scent. / Lather. / Wonder." with the middle word italic and indented. The pack image
// is the LCP element, so it is preloaded.
export function Hero() {
  const { hero } = home
  const [first, middle, last] = hero.headline
  return (
    <section
      aria-labelledby="hero-heading"
      className="bronze-glow relative isolate grid items-center gap-12 overflow-hidden px-[22px] pt-[60px] pb-[72px] sm:px-[clamp(24px,6vw,96px)] md:min-h-[min(820px,calc(100svh-108px))] md:grid-cols-[1.05fr_0.95fr] md:gap-[clamp(32px,5vw,80px)] md:py-20"
    >
      <span aria-hidden className="pointer-events-none absolute top-[6%] right-[-18%] -z-10 aspect-square w-[min(860px,110vw)] rounded-full border border-paper/20" />

      <div className="rise-group relative">
        <Eyebrow tone="cream">{hero.eyebrow}</Eyebrow>
        <h1 id="hero-heading" className="font-display mt-8 text-[clamp(76px,21vw,118px)] leading-[0.86] text-paper md:text-[clamp(96px,10.5vw,170px)]">
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
        <p className="mt-8 max-w-[430px] text-[13px] leading-[1.8] text-paper/85">{hero.sub}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Button asChild variant="wonder" size="wonder">
            <Link href={hero.primaryCta.href}>
              {hero.primaryCta.label} <ArrowDown aria-hidden className="size-3.5" />
            </Link>
          </Button>
          <Button asChild variant="wonder-light" size="wonder">
            <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
          </Button>
        </div>
        <p className="mt-12 text-[9px] font-medium uppercase tracking-[0.42em] text-paper/70">{site.taglines.promiseWords.join(" · ")}</p>
      </div>

      <div className="relative animate-[rise-in_0.85s_0.2s_both]">
        {/* A slow float gives the pack a little life; stopped for reduced motion. */}
        <div className="relative mx-auto aspect-[6/5] w-full max-w-[600px] animate-[float_7s_ease-in-out_1.2s_infinite] overflow-hidden rounded-lg shadow-pop motion-reduce:animate-none">
          <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="(max-width: 850px) 100vw, 45vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
