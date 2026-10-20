import { Lines } from "@/components/brand/lines"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

export type ValueCell = { label: string; heading: readonly string[]; body: string }

// The original's .story-values band: three cells divided by 1px hairlines, middle cell tinted.
export function ValuesBand({ cells, className }: { cells: readonly ValueCell[]; className?: string }) {
  return (
    <div {...revealGroup} className={cn("grid gap-px border-y border-rule bg-ink/18 md:grid-cols-3", className)}>
      {cells.map((v, i) => (
        <div
          key={v.label}
          className={cn("px-[26px] pt-[38px] pb-[42px] sm:px-[clamp(22px,5vw,70px)] sm:pt-[55px] sm:pb-[65px]", i === 1 ? "bg-wheat" : "bg-parchment")}
        >
          <span className="text-[8px] uppercase tracking-[0.17em] text-ink-muted">{v.label}</span>
          <h3 className="font-display mt-[27px] mb-[17px] text-[45px] sm:text-[clamp(38px,4vw,58px)]">
            <Lines lines={v.heading} />
          </h3>
          <p className="max-w-[260px] text-[11px] leading-[1.85] text-ink-soft">{v.body}</p>
        </div>
      ))}
    </div>
  )
}
