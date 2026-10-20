// In the City copy (brief §4.4, client change request #4). Wording from the Replit starter.

import { products, type ProductSlug } from "./products"
import { site } from "./site"

export type CityVisual = {
  src: string
  alt: string
  scene: string
  title: string
  variety: ProductSlug
}

const varietyName = (slug: ProductSlug) => products.find((p) => p.slug === slug)!.variety

// Shown in the original site's 2-column card layout (developer decision 2026-10-21).
// INTERIM: the starter's concept art (bare bars, no packaging) until the §6 set — real
// Wonder packaging composited into each scene — is delivered as /brand-assets/city/<scene>-<variety>.webp.
// Never use the starter's campaign/*.webp: those show AI-drawn packs.
const visuals: CityVisual[] = ([
  { src: "/brand-assets/flavors/coconut-beach.webp", scene: "Beach", title: "The island daydream", variety: "coconut" },
  { src: "/brand-assets/flavors/aloe-freshness.webp", scene: "Still life", title: "A moment of freshness", variety: "aloe-vera" },
  { src: "/brand-assets/flavors/lemon-italy.webp", scene: "Amalfi coast", title: "A citrus afternoon", variety: "lemon" },
  { src: "/brand-assets/flavors/lavender-royal.webp", scene: "Lavender fields", title: "The evening garden", variety: "lavender" },
  { src: "/brand-assets/flavors/rose-editorial.webp", scene: "Editorial", title: "Softly romantic", variety: "rose" },
] satisfies Omit<CityVisual, "alt">[]).map((v) => ({ ...v, alt: `AI-generated campaign concept: ${v.scene}, featuring ${varietyName(v.variety)}` }))

export const city = {
  seo: {
    title: "In the City",
    description: "AI-generated campaign concepts imagining Wonder Beauty Soap out in the world, alongside real brand photographs.",
  },
  hero: {
    eyebrow: "Wonder, out in the world",
    title: { before: "In the", emphasis: "city." },
    body: "From a familiar shop shelf to a faraway street, imagine Wonder finding its place in the everyday.",
    image: {
      src: "/brand-assets/lifestyle/london-lineup.webp",
      alt: "Wonder Beauty Soap packages photographed beside the London Eye",
      caption: "A real-life brand photograph from London.",
    },
  },
  disclaimer: {
    eyebrow: `${["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"][visuals.length - 1]} imagined scenes`,
    text: site.cityDisclaimer,
  },
  visuals,
  conceptLabel: "AI-generated campaign concept",
  varietyName,
  // Real photographs: keep only if they sit well next to the campaign set (brief §4.4).
  real: {
    eyebrow: "Real-life photographs",
    heading: "Wonder, as it is.",
    body: "A few un-staged glimpses of the brand photographed around London and in a shop. These are separate from the imagined campaign concepts above.",
    photos: [
      { src: "/brand-assets/lifestyle/london-coconut.webp", alt: "Wonder Coconut Beauty Soap held beside the River Thames in London", caption: "Beside the Thames, London" },
      { src: "/brand-assets/lifestyle/in-store.webp", alt: "Wonder Beauty Soap among products in a shopping basket", caption: "A moment in a shop" },
    ],
  },
  // The original's closing CTA, plus the brief's follow links (§4.4).
  cta: {
    eyebrow: "Five botanicals, one range",
    heading: "Find your Wonder.",
    action: { label: "See the collection", href: "/collection" },
    follow: "Follow along",
    channels: ["Instagram", "TikTok"] as const,
  },
} as const
