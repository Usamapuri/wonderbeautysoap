import Link from "next/link"

import { BrandMark } from "@/components/brand/brand-mark"
import { SocialLinks } from "@/components/brand/social-links"
import { products } from "@/content/products"
import { barHref, nav, ordersCta, site } from "@/content/site"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-[9px] font-medium uppercase tracking-[0.24em] text-gilt">{title}</h2>
      <ul className="flex flex-col">{children}</ul>
    </div>
  )
}

const itemClass = "inline-flex min-h-9 items-center text-[12px] text-paper/80 transition-colors hover:text-gilt"

// Ink footer on one aligned grid (deck slide 29: "please work on its alignment"): the Royal Basket
// logo + footer line (slide 19), the five tabs, the five bars, bulk orders. rhode-style oversized
// wordmark below.
export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <div className="grid gap-x-8 gap-y-10 px-[22px] pt-16 pb-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:px-[clamp(22px,4vw,64px)] md:pt-20">
        <div className="sm:col-span-2 md:col-span-1">
          <BrandMark tone="cream" className="[&_img]:h-[84px] sm:[&_img]:h-[96px]" />
          <p className="font-display mt-7 max-w-[280px] text-[30px] leading-[1.05]">{site.taglines.footer}</p>
          <SocialLinks light className="-ml-3 mt-5" />
        </div>
        <Column title="Explore">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={itemClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="The bars">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={barHref(p.slug)} prefetch className={itemClass}>
                {p.variety}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="Bulk orders">
          <li>
            <a href={`mailto:${site.email}`} className={`${itemClass} underline decoration-gilt/60 underline-offset-4`}>
              {site.email}
            </a>
          </li>
          <li>
            <Link href={ordersCta.href} className={itemClass}>
              {ordersCta.label}
            </Link>
          </li>
        </Column>
      </div>

      <p aria-hidden className="font-display select-none overflow-hidden pb-[0.08em] text-center text-[clamp(64px,15.5vw,250px)] leading-[0.85] tracking-[-0.035em] whitespace-nowrap text-paper/[0.07]">
        {site.brand}
      </p>

      <div className="flex flex-col items-center gap-5 border-t border-paper/15 px-[22px] py-6 sm:flex-row sm:justify-between md:px-[clamp(22px,4vw,64px)]">
        <p className="text-[9px] tracking-[0.12em] text-paper/60">
          © {site.company}
        </p>
        <p className="text-[9px] uppercase tracking-[0.24em] text-paper/60">
          {site.productLine} · {site.taglines.everydayLuxury.replace(".", "")}
        </p>
      </div>
    </footer>
  )
}
