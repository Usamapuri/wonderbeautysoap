import { cn } from "@/lib/utils"

const tones = {
  gold: "text-gold",
  gilt: "text-gilt", // on ink bands
  cream: "text-paper/80", // on the bronze glow, where gold would be too faint
  muted: "text-ink-muted",
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
    <div className={cn("eyebrow flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em]", center && "justify-center", tones[tone], className)}>
      {typeof children === "string" ? children.replace(/\.$/, "") : children}
    </div>
  )
}
