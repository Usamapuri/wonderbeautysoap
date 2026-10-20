import { cn } from "@/lib/utils"

const tones = {
  leaf: "text-leaf",
  gilt: "text-gilt",
  muted: "text-ink-muted",
} as const

/** Letter-spaced uppercase label preceded by a short rule — "— FOUR IMAGINED SCENES". */
export function Eyebrow({
  children,
  tone = "leaf",
  center = false,
  rule = true,
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof tones
  center?: boolean
  rule?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[9px] uppercase tracking-[0.24em]",
        rule && "before:h-px before:w-7 before:bg-current",
        center && "justify-center",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}
