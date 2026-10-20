import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Uppercase link with a gold underline (starter .text-link). `light` for dark bands. */
export function TextLink({
  href,
  children,
  arrow = false,
  light = false,
  className,
}: {
  href: string
  children: React.ReactNode
  arrow?: boolean
  light?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-2 border-b border-gold pb-[5px] text-[10px] uppercase tracking-[0.12em] transition-colors hover:text-gold",
        light ? "text-paper hover:text-gilt" : "text-ink",
        className,
      )}
    >
      {children}
      {arrow && <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </Link>
  )
}
