import { Eyebrow } from "@/components/brand/eyebrow"
import { SplitText } from "@/components/brand/split-text"
import { world } from "@/content/world"

// Hero banner (deck slide 18: "Wonder, wherever you are."), in the Bolt bronze glow.
export function WorldHero() {
  const { hero } = world
  return (
    <section
      aria-labelledby="world-title"
      className="bronze-glow relative isolate overflow-hidden px-[22px] pt-[72px] pb-[84px] sm:px-[clamp(24px,6vw,96px)] md:pt-28 md:pb-32"
    >
      <span aria-hidden className="pointer-events-none absolute top-[-30%] right-[-14%] -z-10 aspect-square w-[min(820px,110vw)] rounded-full border border-paper/20" />
      <div className="rise-group max-w-[980px]">
        <Eyebrow tone="cream">{hero.eyebrow}</Eyebrow>
        <h1 id="world-title" className="font-display mt-8 text-[clamp(60px,15vw,96px)] leading-[0.9] text-paper md:text-[clamp(84px,9.5vw,150px)]">
          <SplitText text={hero.title.before} now />
          <br />
          <em>
            <SplitText text={hero.title.emphasis} now start={1} />
          </em>
        </h1>
        <p className="mt-8 max-w-[460px] text-[13px] leading-[1.8] text-paper/85">{hero.body}</p>
      </div>
    </section>
  )
}
