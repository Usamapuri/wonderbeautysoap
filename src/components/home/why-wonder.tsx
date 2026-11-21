import { SplitText } from "@/components/brand/split-text"
import { ValuesBand } from "@/components/story/values-band"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// "Why Wonder?" (brief slide 11), in the full-width three-cell band the client liked. Moved from Our
// Story to Home, near the top (owner request 2026-11-21).
export function WhyWonder() {
  const { whyWonder } = home
  return (
    <section aria-labelledby="why-heading" className="pt-section">
      <h2 {...reveal()} id="why-heading" className="font-display type-section mb-heading px-section text-center">
        <SplitText text={whyWonder.eyebrow} />
      </h2>
      <ValuesBand cells={whyWonder.cells} />
    </section>
  )
}
