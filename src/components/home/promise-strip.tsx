import { home } from "@/content/home"

// The on-pack promise words, Glow · Hydrate · Protect (audit slide 8). Do not add other claims
// here (§0 rule 4). Each run repeats the words enough times to be wider than a zoomed-out screen,
// so the loop never shows a gap.
const REPEAT = 8

function Run({ hidden = false }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEAT }, () => home.promises).flat()
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((line, i) => (
        <li key={i} aria-hidden={(!hidden && i >= home.promises.length) || undefined} className="flex items-center">
          <span className="px-7 whitespace-nowrap sm:px-10">{line}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-gilt" />
        </li>
      ))}
    </ul>
  )
}

export function PromiseStrip() {
  return (
    <section aria-label="The Wonder promise" className="overflow-hidden bg-ink py-[18px] type-label font-medium uppercase tracking-[0.24em] text-paper sm:type-meta">
      <div className="flex w-max animate-[marquee_60s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
        <Run />
        <div className="flex motion-reduce:hidden">
          <Run hidden />
        </div>
      </div>
    </section>
  )
}
