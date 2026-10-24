import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { story } from "@/content/story"
import { team } from "@/content/team"
import { reveal, revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// §4.2 #5 — fully data-driven from src/content/team.ts. Renders nothing until a real member exists.
export function TeamGrid() {
  if (team.length === 0) return null
  const { team: copy } = story
  return (
    <section aria-labelledby="team-heading" className="px-section py-section">
      <div {...reveal()} className="mb-10 text-center sm:mb-14">
        <Eyebrow center>
          {copy.eyebrow}
        </Eyebrow>
        <h2 id="team-heading" className="font-display mt-5 text-[clamp(44px,5vw,68px)]">
          <Lines lines={copy.heading} />
        </h2>
      </div>
      {/* Centred flex-wrap keeps 2, 3, 4, 5 or 6 people balanced without layout changes. */}
      <ul {...revealGroup} className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-4 gap-y-10 sm:gap-x-6">
        {team.map((m) => (
          <li key={m.name} className={cn("card-pop group w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)]", team.length === 4 && "md:w-[calc(25%-18px)]")}>
            <div className="relative aspect-[4/5] overflow-hidden bg-clay">
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role}`}
                fill
                sizes="(max-width: 560px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="px-4 pt-4 pb-5">
              <h3 className="font-display text-[26px] leading-none tracking-normal">{m.name}</h3>
              <p className="mt-1.5 text-[8px] uppercase tracking-[0.18em] text-gold">{m.role}</p>
              <p className="mt-2 text-[11px] leading-[1.8] text-ink-soft">{m.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
