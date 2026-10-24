import { Copy } from "@/components/brand/copy"
import { PhotoRow } from "@/components/brand/photo-row"
import { SplitText } from "@/components/brand/split-text"
import { world } from "@/content/world"
import { reveal } from "@/lib/reveal"

// Real photographs grouped by place (deck slide 18), each row sized so no photo is cropped.
export function WorldGalleries() {
  return (
    <div className="flex flex-col gap-16 px-section py-section sm:gap-24">
      {world.galleries.map((g) => (
        <section key={g.place} aria-label={g.place}>
          <div {...reveal()} className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4 sm:mb-9">
            <h2 className="font-display text-[clamp(36px,4.4vw,60px)]">
              <SplitText text={g.place} />
            </h2>
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold">
              <Copy value={g.country} />
            </p>
          </div>
          <PhotoRow photos={g.photos} />
        </section>
      ))}
    </div>
  )
}
