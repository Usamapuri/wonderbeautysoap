import Image from "next/image"

import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"

/**
 * Inner-page hero (starter .page-hero): copy left, captioned image right.
 * `framed` adds the offset gold frame (In the City); `multiply` lays a taupe render onto the band.
 */
export function PageHero({
  id,
  eyebrow,
  title,
  body,
  image,
  framed = false,
  multiply = false,
  className,
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  body: string
  image: { src: string; alt: string; caption: string }
  framed?: boolean
  multiply?: boolean
  className?: string
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "grid items-center gap-7 px-[22px] pt-[49px] pb-[65px] sm:px-[clamp(24px,8vw,128px)] sm:pt-[58px] md:min-h-[630px] md:grid-cols-[0.88fr_1.12fr] md:gap-[clamp(32px,7vw,110px)] md:pt-[65px] md:pb-[90px]",
        className,
      )}
    >
      <div className="rise-group relative z-10 md:py-[30px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id={id}
          className="font-display mt-8 mb-[26px] text-[clamp(64px,18vw,94px)] leading-[0.8] tracking-[-0.055em] sm:text-[clamp(66px,12vw,108px)] md:text-[clamp(68px,9vw,132px)]"
        >
          {title}
        </h1>
        <p className="max-w-[390px] text-xs leading-[1.9] text-ink-soft sm:text-[13px]">{body}</p>
      </div>
      <figure
        className={cn(
          "relative isolate m-0 animate-[rise-in_0.85s_0.2s_both]",
          framed && "before:absolute before:inset-[-12px_12px_12px_-12px] before:-z-10 before:border before:border-gold sm:before:inset-[-17px_17px_17px_-17px]",
        )}
      >
        {/* 3:2 matches the landscape hero photos, so they fill the frame without heavy cropping. */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg shadow-card">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(max-width: 850px) 100vw, 55vw"
            className={cn("object-cover", multiply && "mix-blend-multiply")}
          />
        </div>
        <figcaption className="mt-[11px] text-[9px] uppercase tracking-[0.11em] text-ink-muted">{image.caption}</figcaption>
      </figure>
    </section>
  )
}

/** Gold-emphasised word inside a display heading. */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="text-gold not-italic">{children}</em>
}
