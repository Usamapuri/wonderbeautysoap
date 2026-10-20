import Link from "next/link"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { Button } from "@/components/ui/button"
import { home } from "@/content/home"
import { revealGroup } from "@/lib/reveal"

// §4.1 #9 — full-width band: collection + bulk-order route to Contact.
export function ClosingCta() {
  const { closing } = home
  return (
    <section {...revealGroup} aria-labelledby="closing-heading" className="bg-stone px-6 pt-[95px] pb-[100px] text-center">
      <Eyebrow center>{closing.eyebrow}</Eyebrow>
      <h2 id="closing-heading" className="font-display my-6 text-[clamp(48px,7vw,92px)] tracking-[-0.045em]">
        <Lines lines={closing.heading} />
      </h2>
      <p className="mx-auto mb-[27px] max-w-[410px] text-xs leading-[1.8] text-ink-soft">{closing.body}</p>
      <div className="flex flex-wrap items-center justify-center gap-3.5">
        <Button asChild variant="wonder" size="wonder">
          <Link href={closing.primaryCta.href}>{closing.primaryCta.label}</Link>
        </Button>
        <Button asChild variant="wonder-outline" size="wonder">
          <Link href={closing.secondaryCta.href}>{closing.secondaryCta.label}</Link>
        </Button>
      </div>
    </section>
  )
}
