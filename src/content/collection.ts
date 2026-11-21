// The Collection page copy (brief §4.3; client website brief deck slides 17, 21; Website Audit deck
// 2026-11-20). Each bar shows: pack photo, name, tagline + sub-line, where the idea came from, and an
// orders button that pre-fills the contact form. The audit removed the cosmetic-safety-report line
// (slide 39) and the closing "Bulk orders, talk to us" band (slide 41) from this page.

import type { PageHeroArt } from "@/components/brand/page-hero"

import { ordersCta, site } from "./site"

export const collection = {
  seo: {
    title: "The Collection",
    description: "Meet all five Wonder Beauty Bars: Rose, Lavender, Aloe Vera, Lemon and Coconut.",
  },
  // The page hero (owner, phase 3: "this hero is shit and it doesnt need text below but make it go z-index and
  // then make the text over it"): the range picture (audit slide 40, all five flavours in one picture) is the
  // background layer, with the page title and the formula line over it in white; no caption and no text
  // block below it. Home gold. Round 7 (owner: "dont make the text overlap ... generate a better hero for it be
  // creative"): a new "weightless" picture (the five real boxes and bars floating with botanicals), nothing left of
  // x 43% on wide screens and nothing above y 38% on phones; the copy stays within x 40% / the top 36%.
  hero: {
    eyebrow: site.taglines.everyScent,
    title: { before: "Five botanicals", emphasis: "One beauty bar" },
    // "botanicals" / "One beauty" are the widest parts; the two lines wrap to four at hero size.
    titleEm: 4.3,
    titleLines: 4,
    formula: site.taglines.formula,
    art: {
      src: "/brand-assets/home-hero-art/collection-hero.webp?v=r7",
      width: 2400,
      height: 1350,
      position: "70% 50%",
      calm: { x: 0.4, y: 1 },
      mobile: { src: "/brand-assets/home-hero-art/collection-hero-mobile.webp?v=r7", width: 1260, height: 2240, position: "50% 100%", calm: { x: 1, y: 0.36 } },
      alt: "Campaign image: the five Wonder boxes and bars floating with their botanicals against a warm gold wall: Rose, Lavender, Coconut, Lemon and Aloe Vera",
    } satisfies PageHeroArt,
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
    ctaHeading: "Bulk orders, talk to us",
  },
} as const
