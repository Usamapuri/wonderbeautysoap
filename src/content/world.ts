// Around the World (deck slide 18; formerly "In the City" — /in-the-city redirects here).
// Hero banner, a gallery grouped by place, where each scent was born, where Wonder is available,
// and the closing line. Gallery photos are the client's real photographs (they show the previous
// packaging); the scent-origin cards use concept artwork and carry the AI disclaimer.

import { placeholder } from "./placeholder"
import { site } from "./site"

export type WorldPhoto = { src: string; width: number; height: number; alt: string; caption: string }

export const world = {
  seo: {
    title: "Around the World",
    description: "Wonder, wherever you are. Global presence through pictures and videos.",
  },

  hero: {
    eyebrow: "Around the world",
    title: { before: "Wonder,", emphasis: "wherever you are." },
    // Deck slide 2, the tab's description.
    body: "Global presence through pictures and videos.",
  },

  // Grouped by country or city (slide 18). width/height = the WebP's pixel size, so each row can
  // size its columns to fit every photo uncropped.
  galleries: [
    {
      place: "London",
      country: "United Kingdom",
      photos: [
        { src: "/brand-assets/lifestyle/london-lineup.webp", width: 1200, height: 801, alt: "Wonder Beauty Soap packages beside the London Eye", caption: "By the London Eye" },
        { src: "/brand-assets/lifestyle/london-coconut.webp", width: 801, height: 1200, alt: "A Wonder Coconut Beauty Soap held beside the River Thames", caption: "Beside the Thames" },
      ] satisfies WorldPhoto[],
    },
    {
      place: "Store visits",
      // Where these store photos were taken is not confirmed yet.
      country: placeholder("city / country of the store photos"),
      photos: [
        { src: "/brand-assets/lifestyle/in-store.webp", width: 801, height: 1200, alt: "Wonder Beauty Soap in a shopping basket in a store", caption: "A moment in a shop" },
        { src: "/brand-assets/lifestyle/rose-at-retail.webp", width: 900, height: 1200, alt: "A Wonder Rose Beauty Soap held in a shop", caption: "Rose, on the go" },
        { src: "/brand-assets/lifestyle/collection-basket.webp", width: 1200, height: 801, alt: "Wonder Beauty Soap packages in a shopping basket", caption: "Everyday discoveries" },
      ] satisfies WorldPhoto[],
    },
  ],

  // "Optional: map linking each scent to its origin place" — a list of the five origins.
  origins: {
    eyebrow: "Origin of the idea",
    heading: [site.taglines.everyScent],
    disclaimer: site.aiDisclaimer,
  },

  // "Simple map or list of countries where Wonder is available" + "Short video reel".
  availability: {
    eyebrow: "Where to find Wonder",
    heading: "Available in",
    countries: placeholder("list of countries where Wonder is available"),
    reel: placeholder("short video reel (customer and retailer clips)"),
  },

  cta: {
    eyebrow: site.taglines.wherever,
    heading: "Don't see your country yet? Talk to us.",
    action: { label: "Talk to us", href: "/contact?type=stockist" },
    follow: "Follow along",
    channels: ["Instagram", "TikTok"] as const,
  },
} as const
