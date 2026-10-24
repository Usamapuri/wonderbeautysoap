import type { CSSProperties } from "react"
import Image from "next/image"

import { revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

export type RowPhoto = { src: string; width: number; height: number; alt: string; caption: string }

/**
 * A row of captioned photos whose column widths follow each photo's aspect ratio, so every tile
 * shares one height and nothing is cropped. On phones a row of three becomes two side by side plus
 * one full-width (put the landscape shot last); rows of one or two stay as they are.
 */
export function PhotoRow({ photos, className }: { photos: readonly RowPhoto[]; className?: string }) {
  const fr = (p: RowPhoto) => `${(p.width / p.height).toFixed(3)}fr`
  const phone = photos.length === 3 ? photos.slice(0, 2) : photos
  return (
    <div
      {...revealGroup}
      style={{ "--cols-phone": phone.map(fr).join(" "), "--cols": photos.map(fr).join(" ") } as CSSProperties}
      className={cn("grid grid-cols-(--cols-phone) items-start gap-2.5 sm:grid-cols-(--cols) sm:gap-3.5", className)}
    >
      {photos.map((photo, i) => (
        <figure
          key={photo.src}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          className={cn(
            "tile-pop group m-0 bg-clay after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-1/3 after:bg-linear-to-t after:from-ink/60 after:to-transparent",
            photos.length === 3 && i === 2 && "col-span-2 sm:col-span-1",
          )}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 560px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
          />
          <figcaption className="absolute bottom-3.5 left-[15px] z-10 text-[9px] font-medium uppercase tracking-[0.18em] text-paper [text-shadow:0_1px_10px_rgb(0_0_0/50%)]">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
