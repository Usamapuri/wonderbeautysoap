"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu } from "lucide-react"

import { BrandMark } from "@/components/brand/brand-mark"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { products } from "@/content/products"
import { barHref, nav, ordersCta, site } from "@/content/site"
import { cn } from "@/lib/utils"

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

// Gold hairline that draws in from the left on hover and stays on the current page.
const linkClass = (active: boolean) =>
  cn(
    "relative inline-flex h-10 items-center text-[9px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-250 hover:text-gold lg:text-[10px]",
    "after:absolute after:bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-[right] after:duration-250 hover:after:right-0",
    active ? "after:right-0" : "after:right-full",
  )

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

  return (
    <>
      <div className="flex min-h-8 items-center justify-center bg-ink px-[18px] py-1.5 text-center text-[8px] uppercase tracking-[0.22em] text-paper/80 sm:text-[9px]">
        {site.topline}
        <span className="hidden sm:inline">&nbsp;· {site.taglines.footer.replace(".", "")}</span>
      </div>
      <header
        data-scrolled={scrolled || undefined}
        className="sticky top-0 z-30 flex h-(--header-height) items-center justify-between gap-6 border-b border-header-rule bg-paper/95 px-[22px] backdrop-blur-md transition-[height,box-shadow,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] data-scrolled:h-[60px] data-scrolled:bg-paper/90 data-scrolled:shadow-[0_8px_24px_#25231d14] md:px-[clamp(22px,4vw,64px)] md:data-scrolled:h-[64px] [&>a:first-child_img]:transition-[height] [&>a:first-child_img]:duration-300 data-scrolled:[&>a:first-child_img]:h-[40px]"
      >
        <BrandMark />

        <NavigationMenu viewport={false} aria-label="Main navigation" className="hidden md:flex">
          <NavigationMenuList className="gap-[clamp(18px,2.4vw,40px)]">
            {nav.map((item) => {
              const active = isActive(pathname, item.href)
              if (!item.bars) {
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                )
              }
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      linkClass(active),
                      "h-10 rounded-none bg-transparent p-0 hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent [&>svg]:ml-1.5 [&>svg]:size-3",
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!mt-3 !rounded-lg !bg-paper p-2 !shadow-pop !ring-line md:w-[380px]">
                    <ul className="grid gap-0.5">
                      {products.map((p) => (
                        <li key={p.slug}>
                          <NavigationMenuLink asChild>
                            <Link href={barHref(p.slug)} className="group flex items-center gap-3.5 rounded-md p-2 hover:bg-parchment focus:bg-parchment">
                              <span className="relative aspect-[6/5] w-[58px] shrink-0 overflow-hidden rounded-md bg-clay">
                                <Image src={p.image} alt="" fill sizes="58px" className="object-cover mix-blend-multiply" />
                              </span>
                              <span className="flex flex-col gap-1">
                                <span className="font-display text-[19px] leading-none tracking-normal text-ink">{p.variety}</span>
                                <span className="text-[9px] tracking-[0.06em] text-ink-muted">{p.tagline}</span>
                              </span>
                              <span aria-hidden className="ml-auto size-2 rounded-full opacity-70" style={{ backgroundColor: p.accent }} />
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="mt-1 flex items-center justify-between rounded-md border-t border-line px-2 pt-3 pb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-ink hover:bg-transparent hover:text-gold focus:bg-transparent"
                      >
                        View the whole collection <ArrowRight aria-hidden className="size-3.5" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild variant="wonder" size="wonder" className="hidden min-h-10 py-[11px] lg:inline-flex">
          <Link href={ordersCta.href}>{ordersCta.short}</Link>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open navigation menu" className="grid size-10 place-items-center rounded-md text-ink md:hidden">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="top" className="max-h-svh gap-0 overflow-y-auto border-rule bg-paper pt-[calc(var(--header-height)+8px)] shadow-none">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav aria-label="Mobile navigation" className="flex flex-col pb-4">
              {nav.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <div key={item.href} className="border-t border-rule">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn("block px-6 py-[17px] text-[10px] font-medium uppercase tracking-[0.18em]", active ? "text-gold" : "text-ink")}
                    >
                      {item.label}
                    </Link>
                    {item.bars && (
                      <ul className="grid grid-cols-2 gap-x-4 px-6 pb-4">
                        {products.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={barHref(p.slug)}
                              onClick={() => setOpen(false)}
                              className="flex min-h-10 items-center gap-2.5 text-[12px] text-ink-soft"
                            >
                              <span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
                              {p.variety}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
              <div className="border-t border-rule px-6 pt-5">
                <Button asChild variant="wonder" size="wonder" className="w-full">
                  <Link href={ordersCta.href} onClick={() => setOpen(false)}>
                    {ordersCta.label}
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}
