import type { CSSProperties } from "react"
import { Plane } from "lucide-react"

import { site } from "@/content/site"
import { world } from "@/content/world"
import { reveal } from "@/lib/reveal"

// Where Wonder is available, as ONE card (owner, phase 3: "per image location in around the world should be
// removed rather make something creative and make it one card display", then "make this card better be
// creative and dont use the golden color for it use the other website colors"). A boarding pass in the site's
// ink and cream, with the bars' pastels as the stops' markers: a header row ("Available in", the brand as the
// carrier), the four regions as stops on a dashed flight line (codes large like airport codes, full names
// beneath), a perforated tear line and a stub carrying the footer tagline beside a decorative stripe. No gold.
// The line draws on and the plane flies from the first stop to the last once the card scrolls into view; with
// reduced motion it is all simply drawn. Across the ticket from 640px wide; on phones the ticket stands
// upright, stops top to bottom and the stub at the foot. The regions are a real list; the line, plane,
// perforation and stripe are decorative.
export function WorldRegions() {
  const { regions, availability, pass } = world
  return (
    <section aria-labelledby="regions-heading" className="wrap-wide px-section py-section">
      <div {...reveal()} className="pass">
        <div className="pass-main">
          <div className="pass-head">
            <h2 id="regions-heading" className="type-label font-medium uppercase tracking-[0.24em] text-paper/75">
              {availability.heading}
            </h2>
            <p className="text-right">
              <span className="type-label block uppercase tracking-[0.24em] text-paper/60">{pass.carrierLabel}</span>
              <span className="font-display mt-1 block text-[20px] leading-none text-paper">{site.brand}</span>
            </p>
          </div>

          <div className="pass-route">
            <span aria-hidden className="pass-line" />
            <span aria-hidden className="pass-plane">
              <Plane className="size-5" strokeWidth={1.5} />
            </span>
            <ul className="pass-stops">
              {regions.map((r) => (
                <li key={r.code} className="pass-stop" style={{ "--stop": `var(--bar-${r.pastel})` } as CSSProperties}>
                  <span aria-hidden className="pass-code font-display">
                    {r.code}
                  </span>
                  <span aria-hidden className="pass-marker" />
                  <span className="pass-name">
                    <span className="sr-only">{r.code}: </span>
                    {r.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="pass-perf" />

        <div className="pass-stub">
          <p className="pass-tagline font-display">{site.taglines.footer}</p>
          <span aria-hidden className="pass-stripe" />
        </div>
      </div>
    </section>
  )
}
