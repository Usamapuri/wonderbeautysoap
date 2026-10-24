// The Collection page copy (brief §4.3; client website brief deck slides 17, 21).
// Each bar shows: pack photo, name, tagline + sub-line, where the idea came from, scent description,
// "Best for" line, and an orders button that pre-fills the contact form.

import { placeholder } from "./placeholder"
import { ordersCta, site } from "./site"

export const collection = {
  seo: {
    title: "The Collection",
    description: "Meet all five Wonder Beauty Bars: Rose, Lavender, Aloe Vera, Lemon and Coconut.",
  },
  heading: {
    eyebrow: site.taglines.everyScent,
    title: { before: "Five botanicals.", emphasis: "One beauty bar." },
    formula: site.taglines.formula,
  },
  feature: {
    src: "/brand-assets/products/lineup.webp",
    alt: "All five Wonder Beauty Bars: Rose, Lavender, Aloe Vera, Lemon and Coconut",
    caption: "All 5 flavours",
  },
  // Designer note (slide 21): "Add Cosmetic safety report". Set `href` to the PDF once supplied.
  safetyReport: {
    label: "Cosmetic safety report",
    href: null as string | null,
    pending: placeholder("cosmetic safety report (PDF)"),
  },
  labels: {
    inspired: "Origin of the idea",
    discover: "Discover",
    scent: "Scent",
    bestFor: "Best for",
    order: ordersCta.label,
    artwork: "An imagined world",
  },
  promise: `${site.taglines.formula} · ${site.taglines.dermatologist}`,
  // Each flavour's own page (/collection/[slug]): definition (slide 21 tagline + sub-line, slide 17
  // origin) and history (slide 13, the founder's words), plus the bulk-orders button (slide 17).
  bar: {
    breadcrumb: "The Collection",
    storyEyebrow: "Wonder Room",
    signature: "Founder",
    others: "All 5 flavours",
    ctaEyebrow: "Bulk orders",
    ctaHeading: "Bulk orders, talk to us.",
  },
  cta: {
    eyebrow: site.taglines.celebration,
    heading: "Bulk orders, talk to us.",
    action: { label: ordersCta.label, href: ordersCta.href },
    secondary: { label: "Our story", href: "/our-story" },
  },
} as const
