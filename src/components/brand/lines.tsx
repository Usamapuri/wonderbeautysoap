import { Fragment } from "react"

import { SplitText, wordCount } from "./split-text"

/**
 * Renders a display heading stored as an array of lines, with <br> between them. The words reveal
 * one after another across all lines (SplitText); `now` plays on load instead of on scroll.
 */
export function Lines({ lines, now = false }: { lines: readonly string[]; now?: boolean }) {
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + wordCount(l), 0))
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      <SplitText text={line} now={now} start={starts[i]} />
    </Fragment>
  ))
}
