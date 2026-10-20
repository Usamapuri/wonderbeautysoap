import Image from "next/image"
import Link from "next/link"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { Button } from "@/components/ui/button"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// The original's "editorial" section: short founder story (sensitive-skin origin) + link to /our-story.
export function BrandIntro() {
  const { intro } = home
  return (
    <section aria-labelledby="intro-heading" className="grid items-center gap-[clamp(42px,9vw,140px)] bg-paper px-section py-section md:grid-cols-[1.05fr_0.95fr]">
      <div {...reveal()} className="relative h-[105vw] sm:h-[min(500px,75vw)] md:h-[500px]">
        <Image src={intro.image.src} alt={intro.image.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
      </div>
      <div {...reveal(150)}>
        <Eyebrow>{intro.eyebrow}</Eyebrow>
        <h2 id="intro-heading" className="font-display my-[22px] text-[clamp(47px,5.3vw,78px)]">
          <Lines lines={intro.heading} />
        </h2>
        {intro.body.map((p) => (
          <p key={p} className="mb-3 max-w-[420px] text-xs leading-[1.9] text-ink-soft">
            {p}
          </p>
        ))}
        <Button asChild variant="wonder" size="wonder" className="mt-[22px]">
          <Link href={intro.cta.href}>{intro.cta.label}</Link>
        </Button>
      </div>
    </section>
  )
}
