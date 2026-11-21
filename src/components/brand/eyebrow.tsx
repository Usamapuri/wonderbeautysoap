import { cn } from "@/lib/utils"

const tones = {
  gold: "text-gold",
  gilt: "text-gilt", // on ink bands
  cream: "text-paper/80", // on the bronze glow, where gold would be too faint
  white: "text-white", // on the gold Home opening picture, where cream at 80% falls below 4.5:1
  muted: "text-ink-muted",
  ink: "text-ink", // on photography or artwork, where the gold labels fall below 4.5:1
} as const

/**
 * Letter-spaced uppercase section label — "FOUR IMAGINED SCENES". A tagline passed as text loses its
 * full stop here (labels don't take one).
 */
export function Eyebrow({
  children,
  tone = "gold",
  center = false,
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  center?: boolean
  className?: string
}) {
  return (
    <div className={cn("eyebrow type-label flex items-center gap-3 font-medium uppercase tracking-[0.24em]", center && "justify-center", tones[tone], className)}>
      {typeof children === "string" ? children.replace(/\.$/, "") : children}
    </div>
  )
}
