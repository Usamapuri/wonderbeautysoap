import { reveal } from "@/lib/reveal"
import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"
import { Lines } from "./lines"

/** Centred eyebrow + serif heading + short intro, used to open most sections. */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  body,
  className,
}: {
  id?: string
  eyebrow: string
  heading: readonly string[]
  body?: string
  className?: string
}) {
  return (
    <div {...reveal()} className={cn("mb-heading mx-auto max-w-[760px] text-center", className)}>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display type-section mt-5 mb-3.5">
        <Lines lines={heading} />
      </h2>
      {body && <p className="mx-auto max-w-[46ch] text-xs leading-[1.8] text-ink-soft">{body}</p>}
    </div>
  )
}
