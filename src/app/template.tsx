import { ViewTransition } from "react"

// Page transitions. The template remounts on every route change, so the old page plays its exit
// (quick fade) and the new page its enter (fade up) — see "Page transitions" in globals.css.
// Navigations within a page (?type=bulk, #anchors) don't remount it, so they don't animate.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}
