import { home } from "@/content/home"

// Brand promises (deck slides 20 + 24) and the on-pack "Dermatologist Recommended" line. Do not add
// other claims here (§0 rule 4).
function Run({ hidden = false }: { hidden?: boolean }) {
  const items = [...home.promises, ...home.promises]
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((line, i) => (
        <li key={i} className="flex items-center">
          <span className="px-7 whitespace-nowrap sm:px-10">{line}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-gilt" />
        </li>
      ))}
    </ul>
  )
}

export function PromiseStrip() {
  return (
    <section aria-label="The Wonder promise" className="overflow-hidden bg-ink py-[18px] text-[9px] font-medium uppercase tracking-[0.24em] text-paper sm:text-[10px]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
        <Run />
        <div className="flex motion-reduce:hidden">
          <Run hidden />
        </div>
      </div>
    </section>
  )
}
