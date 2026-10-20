import { story } from "@/content/story"
import { reveal } from "@/lib/reveal"

// Opening story block (§4.2 #1).
export function FounderNote() {
  const { founder } = story
  return (
    <section
      aria-labelledby="founder-heading"
      className="grid gap-6 px-6 pt-[68px] pb-[78px] sm:grid-cols-[150px_1fr] sm:gap-[35px] sm:px-[8vw] sm:py-[85px] md:grid-cols-[220px_1fr] md:gap-[clamp(32px,7vw,110px)] md:px-[clamp(24px,15vw,235px)] md:pt-[120px] md:pb-[130px]"
    >
      <div {...reveal()} className="flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-ink-muted sm:flex-col sm:items-start sm:pt-2">
        <span className="font-display text-[26px] tracking-normal text-gold sm:text-[34px]">{founder.number}</span>
        <h2 id="founder-heading">{founder.label}</h2>
        <span className="text-leaf">{founder.since}</span>
      </div>
      <div {...reveal(120)} className="max-w-[690px]">
        <p className="font-display mb-8 text-[32px] leading-[1.12] tracking-[-0.02em] sm:text-[clamp(28px,3vw,42px)]">{founder.lead}</p>
        {founder.body.map((p) => (
          <p key={p} className="mb-[21px] text-xs leading-[2] text-ink-soft sm:text-[13px]">
            {p}
          </p>
        ))}
        <span className="font-display mt-[18px] inline-block text-[22px] tracking-normal text-leaf">{founder.signature}</span>
      </div>
    </section>
  )
}
