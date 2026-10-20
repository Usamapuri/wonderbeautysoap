import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { TextLink } from "@/components/brand/text-link"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// The original's "promise band": a real London photograph beside the signature-look copy,
// leading on to In the City.
export function RealWorld() {
  const { realWorld } = home
  return (
    <section aria-labelledby="real-world-heading" className="grid bg-fern text-paper md:min-h-[460px] md:grid-cols-2">
      <div {...reveal()} className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] md:min-h-[460px] max-md:max-h-[480px]">
        <Image src={realWorld.image.src} alt={realWorld.image.alt} fill sizes="(max-width: 850px) 100vw, 50vw" className="object-cover" />
      </div>
      <div {...reveal(150)} className="flex flex-col justify-center px-[8vw] py-[58px] md:p-[clamp(48px,7vw,105px)]">
        <Eyebrow tone="gilt">{realWorld.eyebrow}</Eyebrow>
        <h2 id="real-world-heading" className="font-display my-[25px] text-[clamp(44px,5vw,70px)]">
          <Lines lines={realWorld.heading} />
        </h2>
        <p className="max-w-[430px] text-xs leading-[1.8] text-paper/80">{realWorld.body}</p>
        <TextLink href={realWorld.cta.href} light className="mt-[18px]">
          {realWorld.cta.label}
        </TextLink>
      </div>
    </section>
  )
}
