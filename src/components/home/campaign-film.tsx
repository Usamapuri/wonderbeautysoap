import { CampaignVideo } from "@/components/brand/campaign-video"
import { home } from "@/content/home"
import { reveal } from "@/lib/reveal"

// The video banner between the two welcome notes, copy over the picture (Gisou home reference),
// with the client's new text (audit slides 11–12).
export function CampaignFilm() {
  const { film } = home
  return (
    <section aria-labelledby="film-heading" className="wrap-wide px-3 sm:px-5">
      <div {...reveal()} className="relative isolate min-h-[560px] overflow-hidden rounded-lg text-paper sm:min-h-[620px] md:min-h-[clamp(560px,88svh,760px)]">
        <CampaignVideo src={film.src} poster={film.poster} label={film.label} sizes="(max-width: 1800px) 100vw, 1760px" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/25 to-transparent md:bg-linear-to-r md:from-ink/75 md:via-ink/30" />
        <div className="p-panel relative flex min-h-[inherit] flex-col justify-end md:max-w-[640px] md:justify-center">
          <h2 id="film-heading" className="font-display mb-6 text-[clamp(52px,13vw,80px)] leading-[0.9] md:text-[clamp(60px,6.4vw,100px)]">
            {film.heading.before}
            <br />
            <em className="text-gilt">{film.heading.emphasis}</em>
          </h2>
          {film.lines.map((line) => (
            <p key={line} className="max-w-[420px] text-[14px] leading-[1.8] text-paper/90">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
