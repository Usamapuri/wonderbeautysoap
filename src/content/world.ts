// Around the World (deck slide 18; formerly "In the City" — /in-the-city redirects here), as
// amended by the Website Audit deck (2026-11-20) and the owner (2026-11-21 and phase 3).
//
// Layout: the gold page hero with the title, then ONE card with the four regions on a drawn route (owner,
// phase 3: "per image location in around the world should be removed rather make something creative and make
// it one card display"), then the closing band. The four regional pictures are no longer shown; their files
// stay in public/ and are listed as unused in DELIVERY-NOTES, as are the former real photos (London, the
// "Spotted at" store collage). No on-page AI caption (owner, 2026-11-21).

import type { PageHeroArt } from "@/components/brand/page-hero"

import { ART_VERSION } from "./products"
import { site } from "./site"

export type Region = {
  /** Short code shown large on the boarding pass, e.g. "UK". */
  code: string
  name: string
  /** The bar pastel for its marker (a --bar-* token in globals.css). */
  pastel: "rose" | "lavender" | "aloe-vera" | "lemon" | "coconut"
}

// The hero picture (an AI-generated campaign scene with the client's real pack art and soap; see DELIVERY-NOTES).
const art = "/brand-assets/home-hero-art"

export const world = {
  seo: {
    title: "Around the World",
    description: "Wonder, wherever you are. Available in the EU, UK, Pakistan and Australia.",
  },

  hero: {
    eyebrow: "Around the world",
    title: { before: "Wonder,", emphasis: "wherever you are" },
    // "wherever" is the widest part; the title wraps to three lines at hero size.
    titleEm: 3.7,
    titleLines: 3,
    // The tab's description line from deck slide 2 ("Global presence through pictures and videos.") was
    // removed at the owner's request (2026-11-21).
    // The travel-route picture, regraded gold for the shared page hero (owner, phase 3), white title in the calm
    // top-left (x 0-42%, y 0-45%; the pins and thread start at about y 47%) and across the top ~32% on phones.
    art: {
      src: `${art}/world-hero.webp${ART_VERSION}`,
      width: 2400,
      height: 1350,
      position: "50% 50%",
      calm: { x: 0.42, y: 0.45 },
      mobile: { src: `${art}/world-hero-mobile.webp${ART_VERSION}`, width: 1260, height: 2240, position: "50% 100%", calm: { x: 1, y: 0.32 } },
      alt: "Campaign image: a travel route of brass pins and thread ending in a paper plane, with Wonder boxes and bars tumbling into a woven basket, in warm gold light",
    } satisfies PageHeroArt,
  },

  // "Simple map or list of countries where Wonder is available" (brief slide 18), in the client's order and
  // wording (audit slide 52: "EU UK PAKISTAN AUSTRALIA – just add the text"); shown as the pins of the region
  // card, so the countries line is not repeated.
  availability: {
    heading: "Available in",
  },
  regions: [
    { code: "EU", name: "European Union", pastel: "lavender" },
    { code: "UK", name: "United Kingdom", pastel: "rose" },
    { code: "PK", name: "Pakistan", pastel: "aloe-vera" },
    { code: "AU", name: "Australia", pastel: "lemon" },
  ] satisfies Region[] as Region[],
  // The boarding pass's one field label (the carrier is the brand); its stub carries the footer tagline.
  pass: {
    carrierLabel: "Carrier",
  },

  cta: {
    eyebrow: site.taglines.wherever,
    heading: "Don’t see your country yet? Talk to us",
    action: { label: "Talk to us", href: "/contact?type=stockist" },
    follow: "Follow along",
    channels: ["Instagram", "TikTok"] as const,
  },
} as const
