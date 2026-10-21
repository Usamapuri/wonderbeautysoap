import { cn } from "@/lib/utils"

const tones = {
  leaf: "text-leaf",
  gilt: "text-gilt",
  muted: "text-ink-muted",
} as const

/** Letter-spaced uppercase section label — "FOUR IMAGINED SCENES". */
export function Eyebrow({
  children,
  tone = "leaf",
  center = false,
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  center?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3 text-[9px] uppercase tracking-[0.24em]", center && "justify-center", tones[tone], className)}>
      {children}
    </div>
  )
}
