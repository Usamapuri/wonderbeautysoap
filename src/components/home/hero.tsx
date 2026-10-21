import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/brand/eyebrow"
import { TextLink } from "@/components/brand/text-link"
import { Button } from "@/components/ui/button"
import { home } from "@/content/home"

// §4.1 #1 — lineup hero. The lineup image is the LCP element, so it is preloaded.
export function Hero() {
  const { hero } = home
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate grid grid-cols-1 items-center px-[7vw] pt-[52px] pb-[74px] before:absolute before:top-[45%] before:left-[54%] before:-z-10 before:size-[48vw] before:max-h-[600px] before:max-w-[600px] before:-translate-1/2 before:rounded-full before:bg-[radial-gradient(circle,var(--glow),transparent_68%)] sm:pt-[66px] md:min-h-[min(760px,calc(100svh-104px))] md:grid-cols-[45%_55%] md:px-[clamp(24px,7.7vw,120px)] md:pt-[50px] md:pb-[65px]"
    >
      {/* Staggered rise-in on load, as in the starter. */}
      <div className="rise-group relative z-10 md:pb-[2.4rem]">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1
          id="hero-heading"
          className="font-display mt-7 mb-[22px] text-[clamp(66px,17vw,94px)] leading-[0.79] tracking-[-0.045em] sm:text-[clamp(70px,13vw,118px)] md:text-[clamp(60px,8.4vw,128px)]"
        >
          {hero.headline.before}
          <br />
          <em className="text-gold not-italic">{hero.headline.emphasis}</em>
          <br />
          {hero.headline.after}
        </h1>
        <p className="max-w-[350px] text-xs leading-[1.8] text-ink-soft">{hero.sub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-[22px]">
          <Button asChild variant="wonder" size="wonder">
            <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
          </Button>
          <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
        </div>
      </div>

      <div className="relative mx-[-3vw] mt-2.5 min-w-0 animate-[rise-in_0.85s_0.2s_both] md:m-0">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          preload
          sizes="(max-width: 850px) 100vw, 60vw"
          className="block w-full rounded-lg mix-blend-multiply md:-ml-[3%] md:w-[112%] md:max-w-[850px]"
        />
        <div className="absolute right-[4%] bottom-0 flex size-[82px] rotate-[9deg] flex-col items-center justify-center rounded-full border border-gold bg-sand/85 text-center shadow-note text-[7px] leading-[1.5] uppercase tracking-[0.13em] text-gold sm:size-[105px] sm:text-[8px] md:right-[-1%] md:bottom-[8%]">
          <b className="font-display text-[20px] tracking-normal sm:text-[25px]">{hero.badge.value}</b>
          {hero.badge.label[0]}
          <br />
          {hero.badge.label[1]}
        </div>
      </div>

      <div className="absolute bottom-6 left-[7vw] hidden font-serif text-xs font-semibold tracking-[0.12em] text-ink-muted md:left-[clamp(24px,7.7vw,120px)] md:block">
        <span className="text-gold">01</span> / 05 &nbsp; {hero.index}
      </div>
    </section>
  )
}
