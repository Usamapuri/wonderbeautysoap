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
      <div {...reveal()} className="panel bg-parchment grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-[clamp(32px,4vw,56px)]">
        <div>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <h2 id="values-heading" className="font-display type-section mt-5">
            <SplitText text={values.heading} />
          </h2>
        </div>
        <ul {...revealGroup} className="border-t border-line">
          {values.list.map((v) => (
            <li key={v} className="border-b border-line py-4">
              <span className="font-display type-card">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
