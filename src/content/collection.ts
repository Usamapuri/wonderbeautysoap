// The Collection page copy (brief §4.3). Wording from the Replit starter unless noted.

import { site } from "./site"

export const collection = {
  seo: {
    title: "The Collection",
    description: "Meet all five Wonder Beauty Bar varieties: Coconut, Aloe Vera, Lemon, Lavender and Rose.",
  },
  heading: {
    eyebrow: "A little everyday wonder",
    title: { before: "Five botanicals.", emphasis: "One beauty bar." },
    body: "Meet the Wonder Beauty Bar range, each variety presented in its own illustrated package.",
    // Brief §4.3 intro: five varieties, one triple-action formula.
    formula: site.taglines.formula,
  },
  feature: {
    src: "/brand-assets/products/lineup.webp",
    alt: "All five Wonder Beauty Bar varieties: Coconut, Aloe Vera, Lemon, Lavender and Rose",
    caption: "The Wonder Beauty Bar collection · Five varieties",
  },
  labels: {
    scent: "Scent & ingredients",
    skin: "Who it's for",
    enquire: "Enquire about this bar",
    artwork: "An imagined world",
  },
  promise: `${site.taglines.formula} · ${site.taglines.dermatologist}`,
  cta: {
    eyebrow: "Questions about Wonder?",
    heading: "We'd love to hear from you.",
    action: { label: "Get in touch", href: "/contact" },
  },
} as const
