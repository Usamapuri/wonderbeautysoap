"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ordersCta } from "@/content/site"
import { cn } from "@/lib/utils"

/**
 * Appears once the visitor has scrolled past the first screen and steps aside at the footer:
 * on phones, a bulk-orders bar (the site's one goal) with a back-to-top button; on larger screens,
 * just back-to-top (the header already carries "Bulk orders"). Not on Get in Touch, which is the form.
 */
export function FloatingActions() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let footerInView = false
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8 && !footerInView)
    const footer = document.querySelector("footer")
    const io = new IntersectionObserver(([entry]) => {
      footerInView = entry.isIntersecting
      update()
    })
    if (footer) io.observe(footer)
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", update)
    }
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }
  const onContact = pathname === "/contact"

  return (
    <div
      aria-hidden={!visible || undefined}
      inert={!visible}
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex items-center justify-end gap-2 transition-[opacity,translate] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] sm:inset-x-auto sm:right-5 sm:bottom-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {!onContact && (
        <Button asChild variant="wonder" size="wonder" className="flex-1 shadow-pop sm:hidden">
          <Link href={ordersCta.href}>{ordersCta.label}</Link>
        </Button>
      )}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        className="grid size-11 shrink-0 place-items-center rounded-lg border border-ink/20 bg-paper/95 text-ink shadow-pop backdrop-blur-md transition-colors hover:border-ink hover:bg-ink hover:text-paper"
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  )
}
