import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// A note from the founder (deck slide 15), laid out like rhode's "A note from Hailey" (slide 14): the note on a
// quiet panel, signed off below. Phase 3 (owner: "make the our story bit more illustrative"): illustrated with
// one campaign picture (the lavender bar travelling in a gold tin in an open carry-on), beside the note on wide
// screens and above it on phones; the note is left-aligned beside the picture.
//
// Type fixed per audit slide 46: the opening line is balanced over two even lines (it used to leave
// "person." alone), its opening quote mark hangs outside the text, apostrophes are typographic like the
// quote marks, and the note uses one serif size for the two short lines and one sans size for the rest.
// The two short lines ("So I made it." / "One bar you never want to travel without.") are upright, in the
// heading's display face and weight, one step smaller than the heading (owner request 2026-11-21: no
// italics in the note).
export function FounderNote() {
  const { founder } = story
  const last = founder.lines.length - 1
  return (
    <section aria-labelledby="founder-heading" className="wrap-wide px-3 pt-3 sm:px-5 sm:pt-5">
      <div {...reveal()} className="panel bg-parchment grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[clamp(40px,5vw,88px)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src={founder.image.src}
            alt={founder.image.alt}
            width={founder.image.width}
            height={founder.image.height}
            sizes="(max-width: 850px) calc(100vw - 64px), 40vw"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: founder.image.position }}
          />
        </div>
        <div>
          <Eyebrow>
            <h2 id="founder-heading">{founder.eyebrow}</h2>
          </Eyebrow>
          <blockquote className="mt-8 max-w-[640px]">
            <p className="font-display type-section relative max-w-[620px] text-balance">
              <span aria-hidden className="absolute -translate-x-full">
                “
              </span>
              <span className="sr-only">“</span>
              <SplitText text={founder.lead} />
            </p>
            {founder.lines.map((line, i) => (
              <p
                key={line}
                className={cn(
                  "mt-6 text-pretty",
                  i === 1 || i === 2 ? "font-display type-card max-w-[620px] text-balance" : "max-w-[560px] text-[15px] leading-[1.8] text-ink-soft",
                )}
              >
                {line}
                {i === last && "”"}
              </p>
            ))}
          </blockquote>
          <p className="font-display mt-10 text-[30px] leading-none text-gold">{founder.signature}</p>
          <p className="type-label mt-2 uppercase tracking-[0.24em] text-ink-muted">{founder.company}</p>
        </div>
      </div>
    </section>
  )
}
