import Link from "next/link"

import { BrandMark } from "@/components/brand/brand-mark"
import { SocialLinks } from "@/components/brand/social-links"
import { nav, site } from "@/content/site"

// Starter footer (tinted band: wordmark · tagline · nav) plus the brief's email, socials and small print.
export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-shell px-6 py-9 md:px-[clamp(24px,8vw,128px)]">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <BrandMark />
        <div className="flex flex-col gap-1.5 md:items-center md:text-center">
          <p className="text-[9px] tracking-[0.08em] text-ink-muted">{site.topline}</p>
          <div className="-ml-3 flex flex-wrap items-center gap-x-2 md:ml-0">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-10 items-center px-3 text-[11px] tracking-[0.04em] text-ink underline decoration-gold underline-offset-4 hover:text-gold md:px-0 md:pr-2"
            >
              {site.email}
            </a>
            <SocialLinks />
          </div>
          <p className="text-[8px] tracking-[0.08em] text-ink-muted">
            © {site.company} · {site.brand}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-[17px] gap-y-2 md:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-1 text-[9px] uppercase tracking-[0.12em] transition-colors duration-200 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
