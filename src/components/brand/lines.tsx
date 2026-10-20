import { Fragment } from "react"

/** Renders copy stored as an array of lines with <br> between them. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}
