import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"

type Action = { label: string; href: string }

/** Closing band for inner pages (starter .page-cta). `children` render below the buttons. */
export function PageCta({
  eyebrow,
  heading,
  primary,
  secondary,
  children,
  className,
}: {
  eyebrow: string
  heading: string
  primary?: Action
  secondary?: Action
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section {...revealGroup} aria-label={heading} className={cn("bg-stone px-[22px] pt-[70px] pb-[78px] text-center sm:pt-[95px] sm:pb-[105px]", className)}>
      <Eyebrow center>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-[23px] mb-[27px] text-[clamp(46px,13vw,67px)] sm:text-[clamp(48px,7vw,85px)]">{heading}</h2>
      {(primary || secondary) && (
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          {primary && (
            <Button asChild variant="wonder" size="wonder">
              <Link href={primary.href}>
                {primary.label} <ArrowUpRight aria-hidden className="size-3.5" />
              </Link>
            </Button>
          )}
          {secondary && (
            <Button asChild variant="wonder-outline" size="wonder">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
