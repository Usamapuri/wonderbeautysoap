import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Eyebrow } from "@/components/brand/eyebrow"
import { PhotoRow } from "@/components/brand/photo-row"
import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Where Wonder is sold: a strip of real photographs linking to Around the World (deck slide 3).
export function WorldTeaser() {
  const { world } = home
  return (
    <section aria-labelledby="world-heading" className="bg-stone px-section py-section">
      <div {...reveal()} className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>{world.eyebrow}</Eyebrow>
          <h2 id="world-heading" className="font-display mt-5 text-[clamp(40px,5vw,72px)]">
            <SplitText text={world.heading} />
          </h2>
        </div>
        <Button asChild variant="wonder-outline" size="wonder" className="self-start md:self-auto">
          <Link href={world.cta.href}>
            {world.cta.label} <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </Button>
      </div>
      <PhotoRow photos={world.photos} />
    </section>
  )
}
