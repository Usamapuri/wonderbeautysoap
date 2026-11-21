import type { CSSProperties } from "react"

/**
 * Props that make an element fade up when it scrolls into view (handled by <RevealObserver />).
 * `delay` (ms) staggers side-by-side elements. Spread onto any element: <div {...reveal(120)}>.
 * Don't combine with your own `style` prop — merge it instead.
 */
// <RevealObserver /> may mark an element revealed (data-revealed) before React hydrates it — for
// content that streams in later — so these elements opt out of the attribute hydration warning.
export const reveal = (delay = 0) => ({
  "data-reveal": "",
  suppressHydrationWarning: true,
  ...(delay > 0 && { style: { "--reveal-delay": `${delay}ms` } as CSSProperties }),
})

/** Props that reveal an element's children one after another (90 ms apart, set in globals.css) when it scrolls into view. */
export const revealGroup = { "data-reveal-group": "", suppressHydrationWarning: true } as const
