import { Copy } from "@/components/brand/copy"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

import { ValuesBand } from "./values-band"

// §4.2 #4 — what changed (identity, packaging) and what stayed (the formula promise).
// Laid out like the starter's .story-values band.
export function Rebrand() {
  const { rebrand } = story
  return (
    <section aria-labelledby="rebrand-heading">
      <div className="px-section pt-[clamp(82px,11vw,115px)] pb-12 sm:pb-16">
        <div {...reveal()} className="mx-auto max-w-[1100px] md:grid md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-[clamp(40px,7vw,110px)]">
          <div>
            <Eyebrow>
              {rebrand.number} · {rebrand.eyebrow}
            </Eyebrow>
            <h2 id="rebrand-heading" className="font-display mt-[22px] text-[clamp(44px,5vw,68px)]">
              <Lines lines={rebrand.heading} />
            </h2>
          </div>
          <p className="mt-6 max-w-[520px] text-[13px] leading-[1.9] text-ink-soft md:mt-0">
            <Copy value={rebrand.why} />
          </p>
        </div>
      </div>
      <ValuesBand cells={rebrand.values} />
    </section>
  )
}
