import { CampaignVideo } from "@/components/brand/campaign-video"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Lines } from "@/components/brand/lines"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// Welcome note, part 1 (deck slide 5), broken into short lines — "no paragraphs" (slide 6). The
// clip's portrait frame is larger than before (audit slide 10: "increase size").
export function Welcome() {
  const { welcome } = home
  return (
    <section
      aria-labelledby="welcome-heading"
      className="wrap-wide grid items-center gap-12 px-section py-section md:grid-cols-[1fr_1fr] md:gap-[clamp(40px,6vw,96px)]"
    >
      <div {...reveal()} className="relative mx-auto aspect-[2/3] w-full max-w-[560px] overflow-hidden rounded-lg shadow-card">
        <CampaignVideo src={welcome.video} poster={welcome.image.src} label={welcome.image.alt} sizes="(max-width: 850px) min(560px, 100vw), 560px" />
      </div>

      <div {...reveal(150)}>
        <Eyebrow>{welcome.eyebrow}</Eyebrow>
        <h2 id="welcome-heading" className="font-display type-section mt-6">
          <Lines lines={welcome.heading} />
        </h2>
        <div className="mt-6 max-w-[470px] text-[14px] leading-[1.7] text-ink-soft">
          {welcome.lead.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/* The points were numbered 01-03 until the owner asked for no numbering (phase 3). */}
        <ul className="mt-9 max-w-[520px] border-t border-line">
          {welcome.points.map((p) => (
            <li key={p.title} className="border-b border-line py-4">
              <p className="type-copy text-ink-soft">
                <strong className="font-medium text-ink">{p.title}</strong> {p.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="font-display mt-9 max-w-[500px] text-[clamp(22px,2.2vw,30px)] leading-[1.2] italic">{welcome.pull}</p>
      </div>
    </section>
  )
}
