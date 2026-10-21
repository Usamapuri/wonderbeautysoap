import { home } from "@/content/home"

// §4.1 #2 — the two on-pack lines only. Do not add other claims here (§0 rule 4).
function Run({ hidden = false }: { hidden?: boolean }) {
  const items = [...home.promise, ...home.promise]
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((line, i) => (
        <li key={i} className="flex items-center">
          <span className="px-7 whitespace-nowrap sm:px-10">{line}</span>
          <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  )
}

export function PromiseStrip() {
  return (
    <section
      aria-label="The Wonder promise"
      className="overflow-hidden border-y border-rule bg-wheat py-[18px] text-[9px] uppercase tracking-[0.22em] text-ink sm:text-[10px]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
        <Run />
        <div className="flex motion-reduce:hidden">
          <Run hidden />
        </div>
      </div>
    </section>
  )
}
