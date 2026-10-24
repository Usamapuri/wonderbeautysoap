import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// A note from the founder (deck slide 15), laid out like rhode's "A note from Hailey" (slide 14):
// a centred note on a quiet panel, signed off below.
export function FounderNote() {
  const { founder } = story
  return (
    <section aria-labelledby="founder-heading" className="px-3 pt-3 sm:px-5 sm:pt-5">
      <div {...reveal()} className="rounded-lg bg-parchment px-7 py-16 text-center sm:px-12 sm:py-24 md:py-28">
        <Eyebrow center>
          <h2 id="founder-heading">{founder.eyebrow}</h2>
        </Eyebrow>
        <blockquote className="mx-auto mt-9 max-w-[760px]">
          <p className="font-display text-[clamp(34px,4.4vw,60px)] leading-[1.05]">
            <SplitText text={`“${founder.lead}`} />
          </p>
          {founder.lines.map((line, i) => (
            <p
              key={line}
              className={
                i === 1 || i === 2
                  ? "font-display mt-6 text-[clamp(22px,2.4vw,32px)] leading-[1.2] italic"
                  : "mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.8] text-ink-soft"
              }
            >
              {line}
              {i === founder.lines.length - 1 && "”"}
            </p>
          ))}
        </blockquote>
        <p className="font-display mt-12 text-[30px] leading-none text-gold italic">{founder.signature}</p>
        <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-ink-muted">{founder.company}</p>
      </div>
    </section>
  )
}
