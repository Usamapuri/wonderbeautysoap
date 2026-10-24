import { Fragment, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

/**
 * Word-by-word text reveal: each word rises out of its own mask (CSS in globals.css, "Text motion").
 * Inside a [data-reveal] block the words play when the block scrolls into view; `now` plays them on
 * load (first-screen headings). Screen readers get the plain text once; the split copy is hidden.
 * `start` offsets the stagger, so several lines of one heading continue the same sequence.
 */
export function SplitText({ text, now = false, start = 0, className }: { text: string; now?: boolean; start?: number; className?: string }) {
  const words = text.split(" ")
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={cn(now && "split-now", className)}>
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="split-word">
              <span style={{ "--w": start + i } as CSSProperties}>{word}</span>
            </span>
          </Fragment>
        ))}
      </span>
    </>
  )
}

/** Number of words in a string — for continuing a stagger across lines. */
export const wordCount = (text: string) => text.split(" ").length
