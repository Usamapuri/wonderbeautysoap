"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { BrandMark } from "@/components/brand/brand-mark"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav, site } from "@/content/site"
import { cn } from "@/lib/utils"

// A tab is current on its own page and below it (The Collection stays current on a flavour page).
const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

// The header button: the site's primary button; on its own page a gold ring marks it as current, and
// keyboard focus keeps the button's own focus ring.
const headerCtaClass = "aria-[current=page]:ring-1 aria-[current=page]:ring-gold aria-[current=page]:ring-offset-2 aria-[current=page]:ring-offset-paper"

// Gold hairline that draws in from the left on hover and stays on the current page.
const linkClass = (active: boolean) =>
  cn(
    "relative inline-flex h-10 items-center type-label font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-250 hover:text-gold lg:type-meta",
    "after:absolute after:bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-[right] after:duration-250 hover:after:right-0",
    active ? "after:right-0" : "after:right-full",
  )

// Every tab is a plain link (owner request 2026-11-21: "The Collection" opens the collection page,
// which leads on to each flavour; no dropdown, overriding audit slide 38). "Get in Touch" is the
// header's one button, at the right end of the nav, on wide screens and in the phone menu.
export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Once the page scrolls, the header tightens and lifts off the content with a soft shadow.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = nav.filter((item) => !item.cta)
  const cta = nav.find((item) => item.cta)

  return (
    <>
      <div className="flex min-h-8 items-center justify-center bg-ink px-[18px] py-1.5 text-center type-label uppercase tracking-[0.22em] text-paper/80">
        {site.topline}
        <span className="hidden sm:inline">&nbsp;· {site.taglines.footer}</span>
      </div>
      {/* Sticky, except on very short screens (landscape phones, browser zoomed in), where a pinned
          header would cover too much of the page (audit slide 54). */}
      <header
        data-scrolled={scrolled || undefined}
        className="group sticky top-0 z-30 border-b border-header-rule bg-paper/95 backdrop-blur-md transition-[box-shadow,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] data-scrolled:bg-paper/90 data-scrolled:shadow-[0_8px_24px_#25231d14] [@media(max-height:480px)]:static"
      >
        <div className="wrap-wide flex h-(--header-height) items-center justify-between gap-6 px-[22px] transition-[height] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-data-scrolled:h-[60px] md:px-[clamp(22px,4vw,64px)] md:group-data-scrolled:h-[64px] [&>a:first-child_img]:transition-[height] [&>a:first-child_img]:duration-300 group-data-scrolled:[&>a:first-child_img]:h-[26px]">
          <BrandMark />

          {/* The header's former "Bulk orders" button was removed (audit slide 6). */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-[clamp(18px,2.4vw,40px)]">
              {links.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
              {cta && (
                <li className="ml-[clamp(0px,0.8vw,12px)]">
                  <Button asChild variant="wonder" size="wonder" className={headerCtaClass}>
                    <Link href={cta.href} aria-current={isActive(pathname, cta.href) ? "page" : undefined}>
                      {cta.label}
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open navigation menu" className="grid size-10 place-items-center rounded-md text-ink md:hidden">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="top" className="max-h-svh gap-0 overflow-y-auto border-rule bg-paper pt-[calc(var(--header-height)+8px)] shadow-none">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav aria-label="Mobile navigation" className="flex flex-col pb-4">
                {links.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn("block border-t border-rule px-6 py-[17px] type-meta font-medium uppercase tracking-[0.18em]", active ? "text-gold" : "text-ink")}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                {/* The same "Get in Touch" button as on wide screens (it replaces the menu's former orders
                    button; the contact form opens on "Bulk order" either way). */}
                {cta && (
                  <div className="border-t border-rule px-6 pt-5">
                    <Button asChild variant="wonder" size="wonder" className={cn("w-full", headerCtaClass)}>
                      <Link href={cta.href} onClick={() => setOpen(false)} aria-current={isActive(pathname, cta.href) ? "page" : undefined}>
                        {cta.label}
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
