import Image from "next/image"
import Link from "next/link"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

// The Royal Basket Group logo — the site's brand (developer decision 2026-10-25; Wonder is the
// soap). Since the Website Audit deck (2026-11-20, slide 3 "new logo") it is the lock-up without
// "EST. 2026", as on the deck's new logo: the client's existing logo file with the EST arc cropped
// off, keyed to transparency (public/brand-assets/audit-media/logo/). Raster only until a vector arrives.
// The lock-up is wide and short, so it is set at roughly the old logo's width.
export function BrandMark({ tone = "ink", className }: { tone?: "ink" | "cream"; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.company} home`} className={cn("inline-flex shrink-0 items-center no-underline", className)}>
      <Image
        src={`/brand-assets/audit-media/logo/royal-basket-${tone}.png`}
        alt={site.company}
        width={561}
        height={243}
        className="h-[30px] w-auto sm:h-[34px]"
      />
    </Link>
  )
}
