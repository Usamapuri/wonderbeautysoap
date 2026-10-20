import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { TextLink } from "@/components/brand/text-link"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// The original's "quiet detail": a still-life concept image beside a short everyday-ritual note.
export function QuietDetail() {
  const { quietDetail } = home
  return (
    <section
      aria-labelledby="quiet-detail-heading"
      className="grid items-center gap-[34px] px-6 py-[72px] sm:grid-cols-[1fr_0.8fr] sm:gap-[42px] sm:px-[8vw] sm:py-[85px] md:gap-[clamp(40px,9vw,130px)] md:px-[clamp(22px,12vw,190px)] md:py-[120px]"
    >
      <div {...reveal()} className="relative aspect-[1.08] sm:aspect-[0.9]">
        <Image src={quietDetail.image.src} alt={quietDetail.image.alt} fill sizes="(max-width: 560px) 100vw, 45vw" className="object-cover" />
      </div>
      <div {...reveal(150)}>
        <Eyebrow>{quietDetail.eyebrow}</Eyebrow>
        <h2 id="quiet-detail-heading" className="font-display my-[25px] text-[56px] sm:text-[clamp(46px,6vw,78px)]">
          <Lines lines={quietDetail.heading} />
        </h2>
        <p className="mb-[25px] max-w-[390px] text-xs leading-[1.9] text-ink-soft">{quietDetail.body}</p>
        <TextLink href={quietDetail.cta.href}>{quietDetail.cta.label}</TextLink>
      </div>
    </section>
  )
}
