// The flavour page's loading state (its App Shell): the hero's layout in quiet placeholder blocks
// (pack stage + view thumbnails, then the definition), so the page appears at once on navigation and
// the content settles into the same places.
export function BarSkeleton() {
  return (
    <section aria-busy className="grid items-start gap-10 px-section pt-10 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-[clamp(40px,6vw,96px)] md:pt-14 md:pb-24">
      <span className="sr-only">Loading the flavour…</span>
      <div aria-hidden className="flex flex-col gap-3 sm:gap-4">
        <div className="aspect-[6/5] animate-pulse rounded-lg bg-clay" />
        {/* The three views shared by every flavour, in the same grid as BarViews. */}
        <div className="grid grid-cols-[repeat(4,minmax(0,84px))] gap-1.5 sm:gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="m-1 aspect-[6/5] rounded-lg bg-stone" />
          ))}
        </div>
      </div>
      <div aria-hidden className="flex flex-col gap-4">
        <span className="h-2.5 w-40 rounded-sm bg-stone" />
        <span className="mt-6 h-2.5 w-56 rounded-sm bg-stone" />
        <span className="h-20 w-64 animate-pulse rounded-md bg-stone" />
        <span className="mt-2 h-7 w-72 rounded-md bg-stone" />
        <span className="h-3 w-52 rounded-sm bg-stone" />
        <span className="mt-6 h-px w-full bg-line" />
        <span className="h-3 w-full max-w-[420px] rounded-sm bg-stone" />
        <span className="h-3 w-3/4 max-w-[320px] rounded-sm bg-stone" />
        <span className="mt-4 h-12 w-64 rounded-lg bg-stone" />
      </div>
    </section>
  )
}
