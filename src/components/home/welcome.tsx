import Image from "next/image"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Welcome note, part 1 (deck slide 5), broken into short lines — "no paragraphs" (slide 6).
export function Welcome() {
  const { welcome } = home
  return (
    <section
      aria-labelledby="welcome-heading"
      className="grid items-center gap-12 px-section py-section md:grid-cols-[0.85fr_1.15fr] md:gap-[clamp(40px,7vw,110px)]"
    >
      {/* 2:3 frame = the portrait photo's own ratio. */}
      <div {...reveal()} className="relative mx-auto aspect-[2/3] w-full max-w-[400px] overflow-hidden rounded-lg shadow-card">
        <Image src={welcome.image.src} alt={welcome.image.alt} fill sizes="(max-width: 560px) 100vw, 400px" className="object-cover" />
      </div>

      <div {...reveal(150)}>
        <Eyebrow>{welcome.eyebrow}</Eyebrow>
        <h2 id="welcome-heading" className="font-display mt-6 text-[clamp(44px,5.4vw,80px)]">
          <Lines lines={welcome.heading} />
        </h2>
        <p className="mt-6 max-w-[470px] text-[14px] leading-[1.7] text-ink-soft">{welcome.lead}</p>

        <ol className="mt-9 max-w-[520px] border-t border-line">
          {welcome.points.map((p, i) => (
            <li key={p.title} className="flex items-baseline gap-5 border-b border-line py-4">
              <span className="font-display text-[22px] leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[12px] leading-[1.7] text-ink-soft">
                <strong className="font-medium text-ink">{p.title}</strong> {p.body}
              </p>
            </li>
          ))}
        </ol>

        <p className="font-display mt-9 max-w-[500px] text-[clamp(22px,2.2vw,30px)] leading-[1.2] italic">{welcome.pull}</p>
      </div>
    </section>
  )
}
