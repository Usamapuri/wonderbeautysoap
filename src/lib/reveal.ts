import type { CSSProperties } from "react"

/**
 * Props that make an element fade up when it scrolls into view (handled by <RevealObserver />).
 * `delay` (ms) staggers side-by-side elements. Spread onto any element: <div {...reveal(120)}>.
 * Don't combine with your own `style` prop — merge it instead.
 */
export const reveal = (delay = 0) => ({
  "data-reveal": "",
  ...(delay > 0 && { style: { "--reveal-delay": `${delay}ms` } as CSSProperties }),
})

/** Props that reveal an element's children one after another (90 ms apart) when it scrolls into view. */
export const revealGroup = { "data-reveal-group": "" } as const
