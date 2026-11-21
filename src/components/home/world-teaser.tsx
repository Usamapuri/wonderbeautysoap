import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// The link to Around the World (deck slide 3; image per audit slide 21): the heading and button beside
// one picture at its own ratio (declutter pass 2026-11-21: one picture instead of a strip of two).
export function WorldTeaser() {
  const { world } = home
  const [photo] = world.photos
  return (
    <section aria-labelledby="world-heading" className="bg-stone px-section py-section">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div {...reveal()}>
          <Eyebrow>{world.eyebrow}</Eyebrow>
          <h2 id="world-heading" className="font-display type-section mt-5">
            <SplitText text={world.heading} />
          </h2>
          <Button asChild variant="wonder-outline" size="wonder" className="mt-8">
            <Link href={world.cta.href}>
              {world.cta.label} <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
          </Button>
        </div>
        <div {...reveal(120)} className="tile-pop relative bg-clay" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 850px) 100vw, 56vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}
