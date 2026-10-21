import { Copy } from "@/components/brand/copy"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { story, type Milestone } from "@/content/story"
import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// One milestone: dot on the gold rule, year (or stage) label, title, body.
export function TimelineItem({ milestone, last }: { milestone: Milestone; last: boolean }) {
  return (
    <li {...reveal()} className="relative grid gap-2 pb-11 pl-9 last:pb-0 sm:grid-cols-[150px_1fr] sm:gap-8 sm:pl-12">
      <span aria-hidden className="absolute top-1.5 left-0 size-[13px] rotate-45 border border-gold bg-sand" />
      {!last && <span aria-hidden className="absolute top-6 bottom-1 left-1.5 w-px bg-gold/40" />}
      <div
        className={cn(
          milestone.isYear
            ? "font-display text-[34px] leading-none tracking-normal text-gold"
            : "pt-1.5 text-[9px] uppercase tracking-[0.18em] text-gold",
        )}
      >
        {milestone.label}
      </div>
      <div>
        <h3 className="font-display text-[clamp(26px,2.6vw,36px)] leading-[1] tracking-[-0.02em]">{milestone.title}</h3>
        <div className="mt-2.5 max-w-[520px] space-y-2 text-xs leading-[1.85] text-ink-soft">
          {milestone.body.map((line) => (
            <p key={line}>
              <Copy value={line} />
            </p>
          ))}
        </div>
      </div>
    </li>
  )
}

// §4.2 #2 — vertical timeline, milestones in order.
export function Timeline() {
  const { timeline } = story
  return (
    <section aria-labelledby="timeline-heading" className="bg-sand px-section py-section">
      <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-[clamp(40px,7vw,110px)]">
        <div {...reveal()}>
          <Eyebrow>
            {timeline.number} · {timeline.eyebrow}
          </Eyebrow>
          <h2 id="timeline-heading" className="font-display mt-[22px] text-[clamp(44px,5vw,68px)]">
            <Lines lines={timeline.heading} />
          </h2>
        </div>
        <ol>
          {timeline.milestones.map((m, i) => (
            <TimelineItem key={m.title} milestone={m} last={i === timeline.milestones.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}
