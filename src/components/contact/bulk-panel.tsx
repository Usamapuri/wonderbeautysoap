import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { contact } from "@/content/contact"
import { site } from "@/content/site"

// The bulk-order brief: the left pane of the enquiry card on Get in Touch (the form is the right
// pane), so it reads as part of one bulk-order enquiry rather than a separate box.
export function BulkPanel() {
  const { bulk, details } = contact
  return (
    <aside aria-labelledby="bulk-heading" className="bronze-glow flex flex-col p-8 sm:p-10 md:p-12">
      <Eyebrow tone="cream">{bulk.eyebrow}</Eyebrow>
      <h2 id="bulk-heading" className="font-display mt-5 mb-5 text-[clamp(40px,4.4vw,58px)]">
        <Lines lines={bulk.heading} now />
      </h2>
      <p className="max-w-[360px] text-[12px] leading-[1.8] text-paper/85">{bulk.body}</p>
      <ul className="mt-6 grid gap-3 border-t border-paper/20 pt-6 text-[13px]">
        {bulk.include.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4">
            <span className="font-display w-7 shrink-0 text-[18px] leading-none text-paper/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
      {bulk.minimumOrder && <p className="mt-5 text-[12px] text-paper/85">{bulk.minimumOrder}</p>}
      <div className="mt-auto pt-10">
        <p className="text-[8px] uppercase tracking-[0.2em] text-paper/70">{details.emailLabel}</p>
        <a href={`mailto:${site.email}`} className="mt-2 inline-flex min-h-10 items-center text-[14px] text-paper underline decoration-paper/50 underline-offset-4 hover:decoration-paper">
          {site.email}
        </a>
      </div>
    </aside>
  )
}
