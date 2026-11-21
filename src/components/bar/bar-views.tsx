"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { Tabs } from "radix-ui"

import { CampaignVideo } from "@/components/brand/campaign-video"
import type { ProductView } from "@/content/products"
import { cn } from "@/lib/utils"

// The flavour's pack, view by view (audit slide 26: "front, back, side, inside on each flavour").
// WAI-ARIA tabs (Radix): the thumbnails are a tablist, so arrow keys / Home / End move between views,
// and each view is a labelled tabpanel. Every stage keeps the pack render's 6:5 frame, so switching
// views never shifts the layout. A view without approved artwork is left out (owner 2026-11-21: no
// visible placeholders). Front, Left, Right and Back are pack shots; Inside shows the bar.

const STAGE = "relative aspect-[6/5] overflow-hidden rounded-lg bg-clay shadow-pop"
const STAGE_SIZES = "(max-width: 850px) calc(100vw - 48px), 52vw"
// Thumbnails: one row of up to six slots (front, left, right, back, inside, video), each at most 84px wide
// and narrower when the column is (phones, the two-column layout on small laptops), so a sixth Video tab
// never wraps and thumbnails are the same size on every flavour. BarSkeleton mirrors this row.
const THUMB_ROW = "grid grid-cols-[repeat(6,minmax(0,84px))] gap-1.5 sm:gap-3"

export function BarViews({ views, variety, listLabel }: { views: ProductView[]; variety: string; listLabel: string }) {
  return (
    <Tabs.Root defaultValue={views[0].id} className="flex flex-col gap-3 sm:gap-4">
      {views.map((view) => (
        <Tabs.Content key={view.id} value={view.id} className="rounded-lg data-[state=active]:animate-[page-fade_0.35s_both]">
          <Stage view={view} />
        </Tabs.Content>
      ))}

      <Tabs.List aria-label={`${variety} ${listLabel}`} className={THUMB_ROW}>
        {views.map((view) => (
          <Tabs.Trigger
            key={view.id}
            value={view.id}
            className="group/thumb flex w-full min-w-0 flex-col items-center gap-1.5 rounded-lg p-1 text-[8px] font-medium tracking-[0.18em] text-ink-muted uppercase transition-colors hover:text-ink data-[state=active]:text-ink"
          >
            <span
              aria-hidden
              className={cn(
                "relative flex aspect-[6/5] w-full items-center justify-center overflow-hidden rounded-lg border bg-clay transition-[border-color,box-shadow]",
                "border-line",
                "group-hover/thumb:border-gold group-data-[state=active]/thumb:border-gold group-data-[state=active]/thumb:shadow-[0_0_0_1px_var(--gold)]",
              )}
            >
              <Thumb view={view} />
            </span>
            {view.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

function Stage({ view }: { view: ProductView }) {
  switch (view.kind) {
    case "image":
      // The front render is the page's largest image, so it is preloaded. A packshot on white (`blend`:
      // Front and Back) multiplies onto the clay well, like every pack on the site.
      return (
        <figure className={cn(STAGE, "m-0")}>
          <Image src={view.src} alt={view.alt} fill preload={view.id === "front"} sizes={STAGE_SIZES} className={cn("object-cover", view.blend && "mix-blend-multiply")} />
        </figure>
      )
    case "cutout":
      // The bar from inside the box: the client's own soap photo, cut out, standing in the clay well
      // with a soft drop shadow. Contained with room around it, so the whole bar always shows.
      return (
        <figure className={cn(STAGE, "m-0")}>
          <div className="absolute inset-x-[16%] top-[14%] bottom-[22%]">
            <Image
              src={view.src}
              alt={view.alt}
              fill
              sizes="(max-width: 850px) 70vw, 36vw"
              className="object-contain drop-shadow-[0_18px_22px_rgb(37_35_29/22%)]"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-3 text-center text-[8px] tracking-[0.18em] text-ink-muted uppercase sm:bottom-4">{view.note}</figcaption>
        </figure>
      )
    case "video":
      // The film is the same 6:5 shape as the stage. No on-video label (the owner removed it, 2026-11-21;
      // DELIVERY-NOTES keeps the clips' provenance).
      return (
        <figure className={cn(STAGE, "m-0")}>
          <CampaignVideo src={view.src} poster={view.poster} label={view.alt} sizes={STAGE_SIZES} />
        </figure>
      )
  }
}

function Thumb({ view }: { view: ProductView }) {
  switch (view.kind) {
    case "image":
      return <Image src={view.src} alt="" fill sizes="84px" className={cn("object-cover", view.blend && "mix-blend-multiply")} />
    case "cutout":
      return <Image src={view.src} alt="" fill sizes="84px" className="object-contain p-[14%]" />
    case "video":
      return (
        <>
          <Image src={view.poster} alt="" fill sizes="84px" className="object-cover" />
          <span className="relative flex size-6 items-center justify-center rounded-full bg-ink/70 text-paper">
            <Play className="size-3 translate-x-px fill-current" />
          </span>
        </>
      )
  }
}
