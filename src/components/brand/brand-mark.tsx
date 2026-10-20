import Link from "next/link"

import { cn } from "@/lib/utils"

// Text wordmark as in the starter. Swap for the client's logo file once the SVG arrives (§10).
export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Wonder Beauty Soap home"
      className={cn("inline-flex flex-col items-center leading-none text-ink no-underline", className)}
    >
      <strong className="font-display text-[27px] leading-[0.8] tracking-[-0.04em] sm:text-[31px]">WONDER</strong>
      <span className="mt-[7px] text-[8px] tracking-[0.29em]">BEAUTY SOAP</span>
    </Link>
  )
}
