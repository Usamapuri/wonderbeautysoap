import { SplitText } from "@/components/brand/split-text"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

export type ValueCell = { heading: readonly string[]; body: string }

// The "Why Wonder?" band the client liked (brief decision 2026-10-25): three cells divided by 1px
// hairlines, the middle one tinted; on hover a cell's gradient slides a shade warmer.
// Owner request 2026-11-21: larger headings and no dead space. Even padding on all sides, the heading
// and body set as one block that sits at the top of the cell, a wider body measure, and the
// two-line heading kept to the same line count as the others where it fits (it wraps naturally),
// so equal-height cells no longer leave a large empty lower half. The "01 / Why Wonder" number labels
// above the headings were removed (owner, phase 3: "remove the numbering from the site").
export function ValuesBand({ cells, className }: { cells: readonly ValueCell[]; className?: string }) {
  return (
    <div {...revealGroup} className={cn("grid gap-px border-y border-rule bg-ink/18 md:grid-cols-3", className)}>
      {cells.map((v, i) => (
        <div
          key={v.heading.join(" ")}
          className={cn(
            "flex flex-col gap-4 bg-linear-to-b bg-size-[100%_200%] bg-top p-[clamp(26px,3.6vw,52px)] transition-[background-position] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] hover:bg-bottom sm:gap-5",
            i === 1 ? "from-wheat via-wheat to-stone" : "from-parchment via-parchment to-wheat",
          )}
        >
          <h3 className="font-display text-[clamp(44px,4.6vw,68px)] leading-[0.95] text-balance">
            <SplitText text={v.heading.join(" ")} />
          </h3>
          <p className="max-w-[44ch] text-[13px] leading-[1.75] text-ink-soft">{v.body}</p>
        </div>
      ))}
    </div>
  )
}
