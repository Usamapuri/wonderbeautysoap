import { isPlaceholder } from "@/content/placeholder"

/**
 * Prints a content value. Placeholders render as a visibly marked block so they can't be missed
 * on preview — the site must not launch while any are reachable (§12).
 */
export function Copy({ value }: { value: string }) {
  if (!isPlaceholder(value)) return value
  return (
    <mark className="bg-transparent px-1 font-sans text-[9px] tracking-[0.08em] text-rose outline outline-1 outline-dashed outline-rose">
      {value}
    </mark>
  )
}
