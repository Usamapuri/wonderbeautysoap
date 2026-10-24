"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { popup } from "@/content/popup"
import { subscribe } from "@/lib/subscribe"

// Brief §5.1 rules.
const STORAGE_KEY = "wonder-popup"
const DELAY_MS = 12_000 // ≥ 12 s on site …
const SCROLL_DEPTH = 0.5 // … and ≥ 50 % scroll, whichever comes later (never < 3 s)
const SNOOZE_MS = 30 * 24 * 60 * 60 * 1000 // dismissed → quiet for 30 days
const MAX_IMPRESSIONS = 2 // without subscribing, ever

type Memory = { shown: number; dismissedAt?: number; subscribed?: boolean }

const read = (): Memory => {
  try {
    return { shown: 0, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") }
  } catch {
    return { shown: 0 }
  }
}
const write = (m: Memory) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m))
  } catch {}
}
const contactTouched = () => {
  try {
    return sessionStorage.getItem("wonder-contact-touched") === "1"
  } catch {
    return false
  }
}

const eligible = (m: Memory) =>
  !m.subscribed && m.shown < MAX_IMPRESSIONS && !(m.dismissedAt && Date.now() - m.dismissedAt < SNOOZE_MS)

type Status = "idle" | "submitting" | "success" | "error"

export function EmailPopup() {
  const pathname = usePathname()
  const pathRef = useRef(pathname)
  useEffect(() => {
    pathRef.current = pathname
  }, [pathname])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  // Arm the trigger once per page load.
  useEffect(() => {
    if (!eligible(read())) return
    let timeReady = false
    let scrollReady = false
    let fired = false

    const maybeOpen = () => {
      if (fired || !timeReady || !scrollReady) return
      if (pathRef.current === "/contact" && contactTouched()) return
      fired = true
      const m = read()
      if (!eligible(m)) return
      write({ ...m, shown: m.shown + 1 })
      setOpen(true)
      cleanup()
    }
    const onScroll = () => {
      const doc = document.documentElement
      const depth = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1)
      if (depth >= SCROLL_DEPTH) {
        scrollReady = true
        maybeOpen()
      }
    }
    const timer = window.setTimeout(() => {
      timeReady = true
      maybeOpen()
    }, DELAY_MS)
    const cleanup = () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return cleanup
  }, [])

  const onOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next && status !== "success") write({ ...read(), dismissedAt: Date.now() })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!z.email().safeParse(email.trim()).success) {
      setError(popup.errors.invalid)
      return
    }
    setError(null)
    setStatus("submitting")
    try {
      await subscribe(email.trim())
      write({ ...read(), subscribed: true })
      setStatus("success")
    } catch {
      setStatus("error")
      setError(popup.errors.failed)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // Desktop: centred card. Phones: bottom sheet, ≤ 70 % of the viewport, clear of the safe area.
        className="max-h-[70svh] gap-0 overflow-y-auto rounded-lg border-t-2 border-gold bg-sand p-7 pb-[max(28px,env(safe-area-inset-bottom))] ring-0 sm:max-w-[440px] sm:border sm:border-gold/50 sm:p-10 max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:max-w-full max-sm:rounded-b-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:data-open:slide-in-from-bottom-10 [&>[data-slot=dialog-close]]:top-3 [&>[data-slot=dialog-close]]:right-3 [&>[data-slot=dialog-close]]:size-10 [&>[data-slot=dialog-close]]:rounded-lg"
      >
        <span className="text-[9px] uppercase tracking-[0.24em] text-gold">{popup.eyebrow}</span>
        <span aria-hidden className="mt-4 block h-px w-12 bg-gold" />
        <DialogTitle className="font-display mt-5 text-[40px] leading-[0.95] font-semibold text-ink">{popup.heading}</DialogTitle>

        {status === "success" ? (
          <div role="status" className="mt-4">
            <DialogDescription className="text-sm leading-[1.8] text-ink">{popup.success}</DialogDescription>
            <DialogClose asChild>
              <Button variant="wonder" size="wonder" className="mt-6">
                {popup.close}
              </Button>
            </DialogClose>
          </div>
        ) : (
          <>
            <DialogDescription className="mt-3 text-xs leading-[1.8] text-ink-soft">{popup.body}</DialogDescription>
            {popup.incentive && <p className="mt-2 text-xs text-gold">{popup.incentive}</p>}
            <form onSubmit={onSubmit} noValidate className="mt-6">
              <Label htmlFor="popup-email" className="text-[9px] font-normal uppercase tracking-[0.12em] text-ink">
                {popup.emailLabel}
              </Label>
              <Input
                id="popup-email"
                type="email"
                autoComplete="email"
                placeholder={popup.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error || undefined}
                aria-describedby={error ? "popup-error" : undefined}
                className="mt-2 h-auto rounded-lg border-ink/25 bg-parchment px-3 py-[13px] text-xs md:text-xs"
              />
              {error && (
                <p id="popup-error" role="alert" className="mt-2 text-[10px] text-destructive">
                  {error}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button type="submit" variant="wonder" size="wonder" disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <Loader2 aria-hidden className="size-3.5 animate-spin" /> {popup.submitting}
                    </>
                  ) : (
                    popup.submit
                  )}
                </Button>
                <DialogClose className="min-h-10 border-b border-transparent text-[10px] uppercase tracking-[0.12em] text-ink-soft hover:border-gold hover:text-ink">
                  {popup.decline}
                </DialogClose>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
