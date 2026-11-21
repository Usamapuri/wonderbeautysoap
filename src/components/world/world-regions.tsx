import Image from "next/image"

import { world } from "@/content/world"
import { reveal, revealGroup } from "@/lib/reveal"

// The four regions in the client's order (audit slide 50), as one even grid of 4:5 frames: two per row
// on phones, four on wide screens. Each picture is an AI-made still-life with a regional mood, so the
// label names the region only, never a place. Then the countries as one line (audit slide 52). No AI
// caption on the page (owner, 2026-11-21); DELIVERY-NOTES records what each picture is.
export function WorldRegions() {
  const { regions, availability } = world
  return (
    <section aria-labelledby="regions-heading" className="wrap-wide px-section py-section">
      <h2 id="regions-heading" className="sr-only">
        {availability.heading}
      </h2>
      <ul {...revealGroup} className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {regions.map((r) => (
          <li key={r.code}>
            <figure className="m-0">
              <div className="relative overflow-hidden rounded-lg bg-clay" style={{ aspectRatio: `${r.image.width} / ${r.image.height}` }}>
                <Image src={r.image.src} alt={r.image.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-2.5">
                <span className="text-[9px] font-medium tracking-[0.22em] text-gold">{r.code}</span>
                <span className="font-display text-[clamp(20px,1.8vw,26px)] leading-none">{r.name}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p {...reveal()} className="font-display mt-12 text-center text-[clamp(24px,2.6vw,36px)] leading-tight sm:mt-16">
        <span className="mr-3 align-middle font-sans text-[9px] font-medium tracking-[0.22em] text-gold uppercase">{availability.heading}</span>
        {availability.countries.join(" · ")}
      </p>
    </section>
  )
}
