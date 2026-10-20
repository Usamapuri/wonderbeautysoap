"use client"

import { useEffect } from "react"

const PENDING = "[data-reveal]:not([data-revealed]), [data-reveal-group]:not([data-revealed])"
const STAGGER_MS = 90
const MAX_STAGGER = 6

/**
 * One IntersectionObserver for the whole site: marks [data-reveal] / [data-reveal-group] elements
 * as revealed the first time they enter the viewport (CSS in globals.css does the animation).
 * A MutationObserver picks up elements added later — client navigations, Suspense content.
 */
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.dataset.revealReady = ""

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          if (el.hasAttribute("data-reveal-group")) {
            Array.from(el.children).forEach((child, i) => {
              ;(child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, MAX_STAGGER) * STAGGER_MS}ms`)
            })
          }
          el.setAttribute("data-revealed", "")
          io.unobserve(el)
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )

    let frame = 0
    const scan = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => document.querySelectorAll(PENDING).forEach((el) => io.observe(el)))
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
