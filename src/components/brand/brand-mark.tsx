import Image from "next/image"
import Link from "next/link"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

// The Royal Basket Group logo — the site's brand (developer decision 2026-10-25; Wonder is the
// soap). Keyed to transparency from the client's logo file by scripts/prepare_assets.py.
export function BrandMark({ tone = "ink", className }: { tone?: "ink" | "cream"; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.company} home`} className={cn("inline-flex shrink-0 items-center no-underline", className)}>
      <Image
        src={`/brand-assets/logos/royal-basket-group-${tone}.png`}
        alt={site.company}
        width={480}
        height={331}
        className="h-[46px] w-auto sm:h-[52px]"
      />
    </Link>
  )
}
