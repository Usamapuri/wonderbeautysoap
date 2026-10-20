import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { contact } from "@/content/contact"

import { BulkCta } from "./bulk-cta"

// §4.5 #2 — visually distinct bulk & trade panel. Its CTA sets ?type=bulk (the form listens for it)
// and jumps to the form.
export function BulkPanel() {
  const { bulk } = contact
  return (
    <section aria-labelledby="bulk-heading" className="bg-moss p-7 text-paper sm:p-10">
      <Eyebrow tone="gilt">{bulk.eyebrow}</Eyebrow>
      <h2 id="bulk-heading" className="font-display mt-5 mb-4 text-[clamp(36px,4vw,50px)]">
        <Lines lines={bulk.heading} />
      </h2>
      <p className="text-[11px] leading-[1.8] text-paper/80">{bulk.body}</p>
      <ul className="mt-4 space-y-2 text-xs">
        {bulk.include.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span aria-hidden className="size-1.5 rotate-45 bg-gilt" />
            {item}
          </li>
        ))}
      </ul>
      {bulk.minimumOrder && <p className="mt-4 text-[11px] text-gilt">{bulk.minimumOrder}</p>}
      <BulkCta label={bulk.cta} />
    </section>
  )
}
