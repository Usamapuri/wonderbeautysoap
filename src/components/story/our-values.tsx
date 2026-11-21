import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { story } from "@/content/story"
import { reveal, revealGroup } from "@/lib/reveal"

// Our values (deck slide 12): one panel, the heading beside the values as a ruled list. The picture
// that used to sit beside it (a supplied clip) was dropped in the 2026-11-21 declutter pass (owner:
// "too much pics"); the page keeps its hero and the CEO picture.
export function OurValues() {
  const { values } = story
  return (
    <section aria-labelledby="values-heading" className="wrap-wide px-3 pt-3 sm:px-5 sm:pt-5">
      <div {...reveal()} className="panel bg-parchment grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-16">
        <div>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <h2 id="values-heading" className="font-display type-section mt-5">
            <SplitText text={values.heading} />
          </h2>
        </div>
        <ul {...revealGroup} className="border-t border-line">
          {values.list.map((v, i) => (
            <li key={v} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <span className="font-display type-card">{v}.</span>
              <span className="text-[9px] tracking-[0.2em] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
