import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { contact } from "@/content/contact"
import { site } from "@/content/site"

// The bulk-order brief: the left pane of the enquiry card on Get in Touch (the form is the right
// pane), so it reads as part of one bulk-order enquiry rather than a separate box.
export function BulkPanel() {
  const { bulk, details } = contact
  return (
    <aside aria-labelledby="bulk-heading" className="bronze-glow p-panel flex flex-col">
      <Eyebrow tone="cream">{bulk.eyebrow}</Eyebrow>
      <h2 id="bulk-heading" className="font-display type-card mt-5 mb-5">
        <Lines lines={bulk.heading} now />
      </h2>
      <p className="type-copy max-w-[360px] text-paper/85">{bulk.body}</p>
      <ul className="mt-6 grid gap-3 border-t border-paper/20 pt-6 text-[13px]">
        {bulk.include.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {bulk.minimumOrder && <p className="type-copy mt-5 text-paper/85">{bulk.minimumOrder}</p>}
      <div className="mt-auto pt-10">
        <p className="type-label uppercase tracking-[0.2em] text-paper/70">{details.emailLabel}</p>
        {/* Plain, selectable text, not a mailto link (client error deck, slide 29: "Just display our email"). */}
        <p className="mt-2 inline-flex min-h-10 items-center text-[14px] break-all text-paper select-all">{site.email}</p>
      </div>
    </aside>
  )
}
