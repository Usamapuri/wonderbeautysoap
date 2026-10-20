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
    <div {...reveal()} className={cn("mx-auto mb-9 max-w-[760px] text-center sm:mb-14", className)}>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display mt-5 mb-3.5 text-[clamp(43px,5.2vw,76px)] leading-[0.93]">
        <Lines lines={heading} />
      </h2>
      {body && <p className="mx-auto max-w-[480px] text-xs leading-[1.8] text-ink-soft">{body}</p>}
    </div>
  )
}
