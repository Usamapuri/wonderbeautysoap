"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { BrandMark } from "@/components/brand/brand-mark"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav, site } from "@/content/site"
import { cn } from "@/lib/utils"

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-[34px] items-center justify-center bg-wheat px-[18px] py-1.5 text-center text-[8px] uppercase tracking-[0.17em] text-ink-soft sm:text-[10px]">
        {site.topline}
      </div>
      <header className="sticky top-0 z-30 flex h-(--header-height) items-center justify-between border-b border-header-rule bg-sand/95 px-[22px] backdrop-blur-md md:px-[clamp(22px,6vw,88px)]">
        <BrandMark />

        <nav aria-label="Main navigation" className="hidden items-center gap-[17px] sm:flex md:gap-[clamp(20px,3.6vw,54px)]">
          {nav.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                // Gold hairline that draws in from the left on hover and stays on the current page.
                className={cn(
                  "relative py-2 text-[8px] uppercase tracking-[0.16em] text-ink transition-colors duration-250 hover:text-gold md:text-[10px]",
                  "after:absolute after:bottom-px after:left-0 after:h-px after:bg-gold after:transition-[right] after:duration-250 hover:after:right-0",
                  active ? "after:right-0" : "after:right-full",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open navigation menu"
            className="grid size-10 place-items-center text-ink sm:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="top" className="gap-0 border-rule bg-sand pt-[calc(var(--header-height)+8px)] shadow-none">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {nav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "border-t border-rule px-6 py-[17px] text-[10px] uppercase tracking-[0.16em]",
                      active ? "text-gold" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
