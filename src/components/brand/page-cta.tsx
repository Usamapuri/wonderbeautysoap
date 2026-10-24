import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SplitText } from "@/components/brand/split-text"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

import { Eyebrow } from "./eyebrow"

type Action = { label: string; href: string }

/**
 * Closing band for every page. `bronze` (default) is the Bolt statement glow; `stone` is the light
 * variant for bands that carry ink-coloured extras (e.g. social links). `children` render below.
 */
export function PageCta({
  eyebrow,
  heading,
  primary,
  secondary,
  tone = "bronze",
  children,
  className,
}: {
  eyebrow: string
  heading: React.ReactNode
  primary?: Action
  secondary?: Action
  tone?: "bronze" | "stone"
  children?: React.ReactNode
  className?: string
}) {
  const dark = tone === "bronze"
  return (
    <section
      {...revealGroup}
      aria-label={typeof heading === "string" ? heading : undefined}
      className={cn("px-[22px] pt-[74px] pb-[82px] text-center sm:pt-[100px] sm:pb-[110px]", dark ? "bronze-glow" : "bg-stone", className)}
    >
      <Eyebrow center tone={dark ? "cream" : "gold"}>
        {eyebrow}
      </Eyebrow>
      <h2 className="font-display mx-auto mt-[23px] mb-[30px] max-w-[900px] text-[clamp(42px,11vw,64px)] sm:text-[clamp(48px,6.4vw,84px)]">
        {typeof heading === "string" ? <SplitText text={heading} /> : heading}
      </h2>
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
            <Button asChild variant={dark ? "wonder-light" : "wonder-outline"} size="wonder">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
