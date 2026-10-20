import Image from "next/image"

import { home } from "@/content/home"
import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// §4.1 #8 — retail photographs. Name or show only retailers the client has confirmed (§10).
export function RetailStrip() {
  return (
    <section
      {...revealGroup}
      aria-label="Wonder Beauty Soap around town"
      className="grid grid-cols-2 gap-2 px-[22px] pb-20 sm:grid-cols-[1.15fr_0.85fr_1fr] sm:gap-3.5 sm:px-[clamp(24px,8vw,128px)] sm:pb-[115px]"
    >
      {home.retail.map((tile, i) => (
        <figure
          key={tile.src}
          className={cn(
            "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-linear-to-t after:from-ink/55 after:to-transparent group relative m-0 h-[220px] overflow-hidden bg-clay sm:h-[330px]",
            i === 0 && "col-span-2 h-[270px] sm:col-span-1 sm:h-[330px]",
            i === 1 && "sm:mt-[46px]",
          )}
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(max-width: 560px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <figcaption className="absolute z-10 bottom-3.5 left-[15px] text-[9px] uppercase tracking-[0.15em] text-paper [text-shadow:0_1px_10px_rgb(0_0_0/50%)]">
            {tile.caption}
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
