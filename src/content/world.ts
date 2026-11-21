// Around the World (deck slide 18; formerly "In the City" — /in-the-city redirects here), as
// amended by the Website Audit deck (2026-11-20) and the owner (2026-11-21: "generate a hero image,
// make the layout better and replace the images in that page with better images").
//
// Layout: a hero picture with the title, the four regions in the client's order (audit slide 50: UK,
// EU, AU, PK) as one even grid, the countries as one line (slide 52), the closing band. No on-page
// AI caption (owner, 2026-11-21).
// The pictures are AI-made campaign still-lifes of the real pack and bar with a regional mood: no
// shops, landmarks or people. They are not photos taken in those places, so no region names a place or
// claims a photo was taken there. The former real photos (London, the "Spotted at" store collage) are
// no longer on this page; their files stay in public/ and are listed as unused in DELIVERY-NOTES.

import { site } from "./site"

export type WorldImage = { src: string; width: number; height: number; alt: string }

export type Region = {
  /** Short code shown as the label, e.g. "UK". */
  code: string
  name: string
  image: WorldImage
}

// Pictures (AI-generated campaign scenes with the client's real pack art and soap; see DELIVERY-NOTES).
// width/height = each file's pixel size.
const art = "/brand-assets/home-hero-art"
const still = (file: string, alt: string): WorldImage => ({ src: `${art}/${file}`, width: 1440, height: 1800, alt })

export const world = {
  seo: {
    title: "Around the World",
    description: "Wonder, wherever you are. Available in the EU, UK, Pakistan and Australia.",
  },

  hero: {
    eyebrow: "Around the world",
    title: { before: "Wonder,", emphasis: "wherever you are." },
    // The tab's description line from deck slide 2 ("Global presence through pictures and videos.") was
    // removed at the owner's request (2026-11-21).
    // The travel-route picture (owner 2026-11-21, replacing the Coconut table scene at the same paths): calm,
    // light wall top-left on wide screens and across the top on phones, where the ink title sits.
    image: {
      src: `${art}/world-hero.webp`,
      width: 2400,
      height: 1350,
      position: "50% 50%",
      mobile: { src: `${art}/world-hero-mobile.webp`, width: 1440, height: 1800, position: "50% 30%" },
      alt: "Campaign image: a travel route of brass pins and thread ending in a paper plane, with Wonder boxes and bars tumbling into a woven basket on a stone ledge",
    },
  },

  regions: [
    { code: "UK", name: "United Kingdom", image: still("world-uk.webp", "Campaign image: the Wonder Lavender box and bar on a window ledge beaded with rain, beside a teacup") },
    { code: "EU", name: "European Union", image: still("world-eu.webp", "Campaign image: the Wonder Lemon box and bar on terracotta tiles beside an olive sprig") },
    { code: "AU", name: "Australia", image: still("world-australia.webp", "Campaign image: hands lathering a green Wonder bar under a brass tap, with a Wonder Aloe Vera box on the ledge") },
    { code: "PK", name: "Pakistan", image: still("world-pakistan.webp", "Campaign image: a Wonder Rose box and bar beside a carved stone basin with floating jasmine, seen from above") },
  ] satisfies Region[] as Region[],

  // "Simple map or list of countries where Wonder is available" (brief slide 18). The client's text, in
  // the client's order (audit slide 52: "EU UK PAKISTAN AUSTRALIA – just add the text").
  availability: {
    heading: "Available in",
    countries: ["EU", "UK", "Pakistan", "Australia"],
  },

  cta: {
    eyebrow: site.taglines.wherever,
    heading: "Don’t see your country yet? Talk to us.",
    action: { label: "Talk to us", href: "/contact?type=stockist" },
    follow: "Follow along",
    channels: ["Instagram", "TikTok"] as const,
  },
} as const
