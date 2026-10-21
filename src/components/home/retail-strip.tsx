import type { CSSProperties } from "react"
import Image from "next/image"

import { home } from "@/content/home"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// §4.1 #8 — retail photographs. Name or show only retailers the client has confirmed (§10).
// Column widths follow each photo's aspect ratio, so the tiles share one height and none is cropped.
export function RetailStrip() {
  const { retail } = home
  const fr = (t: (typeof retail)[number]) => `${(t.width / t.height).toFixed(3)}fr`
  return (
    <section
      {...revealGroup}
      aria-label="Wonder Beauty Soap around town"
      style={{ "--cols-phone": `${fr(retail[0])} ${fr(retail[1])}`, "--cols": retail.map(fr).join(" ") } as CSSProperties}
      className="grid grid-cols-(--cols-phone) items-start gap-2.5 px-[22px] pb-20 sm:grid-cols-(--cols) sm:gap-3.5 sm:px-[clamp(24px,8vw,128px)] sm:pb-[115px]"
    >
      {retail.map((tile, i) => (
        <figure
          key={tile.src}
          style={{ aspectRatio: `${tile.width} / ${tile.height}` }}
          className={cn(
            "tile-pop group m-0 bg-clay after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-linear-to-t after:from-ink/55 after:to-transparent",
            i === 2 && "col-span-2 sm:col-span-1",
          )}
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(max-width: 560px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
          />
          <figcaption className="absolute z-10 bottom-3.5 left-[15px] text-[9px] uppercase tracking-[0.15em] text-paper [text-shadow:0_1px_10px_rgb(0_0_0/50%)]">
            {tile.caption}
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
