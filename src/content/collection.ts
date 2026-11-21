// The Collection page copy (brief §4.3; client website brief deck slides 17, 21; Website Audit deck
// 2026-11-20). Each bar shows: pack photo, name, tagline + sub-line, where the idea came from, and an
// orders button that pre-fills the contact form. The audit removed the cosmetic-safety-report line
// (slide 39) and the closing "Bulk orders, talk to us." band (slide 41) from this page.

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
  // Audit slide 40 ("provide new image"): all five flavours in one picture. Since 2026-11-21 (owner) a
  // campaign range portrait, 16:9 on wide screens and 4:5 on phones, replacing the still from the client's
  // five-bar film. width/height = each file's pixel size; `packshot` = product on a white studio background
  // (multiplied onto the clay well).
  feature: {
    src: "/brand-assets/home-hero-art/collection-hero.webp",
    width: 2400,
    height: 1350,
    mobile: { src: "/brand-assets/home-hero-art/collection-hero-mobile.webp", width: 1440, height: 1800 },
    alt: "Campaign image: the five Wonder flavours, each box and bar on a travertine plinth with its botanical: Rose, Lavender, Coconut, Aloe Vera and Lemon",
    caption: "All 5 flavours",
    packshot: false as boolean,
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
    // The flavour hero's button to /collection.
    others: "All 5 flavours",
    // Heading above the other four flavours on each flavour page (owner 2026-11-21: not simply "other
    // flavours"; each flavour is tied to a place, so the travel idea).
    othersHeading: "Where to next?",
    ctaEyebrow: "Bulk orders",
    ctaHeading: "Bulk orders, talk to us.",
  },
} as const
