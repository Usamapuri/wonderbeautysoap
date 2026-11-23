// Our Story copy, from the client's Wonder_Website_Brief.pptx (2026-10-25), laid out after rhode's
// About page (the developer's reference), as amended by the Website Audit deck (2026-11-20).
// Section order follows brief slide 10: who we are → our values → a note from the founder → CEO's
// promise. "Why Wonder?" moved to Home (owner request 2026-11-21). The Wonder Room card row (concept artwork) was removed (audit slides
// 24–25); each flavour's origin story stays on its own flavour page.
// The founder's note was on a hidden slide (15); the CEO's promise is "draft wording, Ali to
// approve" (slide 16). Both are listed in DELIVERY-NOTES until the client signs them off.

import type { PageHeroArt } from "@/components/brand/page-hero"

import { ART_VERSION } from "./products"
import { ordersCta, site } from "./site"

export const story = {
  seo: {
    title: "Our Story",
    description: "Who we are, our values, a note from the founder and the CEO’s promise.",
  },

  // Gold page hero (owner, phase 3: "make the our story bit more illustrative and dont be generic be creative
  // and golden theme should be followed"; same treatment as Home). The picture shows the founder's idea: one
  // Wonder bar in golden light, ten plain bottles in shadow. An AI-generated scene (Sol) with the client's
  // real lavender bar photo standing on the plinth. Calm area: the left ~42% (16:9) and the top ~38% (9:16).
  hero: {
    eyebrow: site.company,
    title: { before: "Our", emphasis: "Story" },
    titleEm: 2.2,
    titleLines: 2,
    cta: { label: "Who we are", href: "#who-we-are" },
    art: {
      src: `/brand-assets/home-hero-art/our-story-hero.webp${ART_VERSION}`,
      width: 2400,
      height: 1350,
      position: "70% 50%",
      calm: { x: 0.42, y: 1 },
      mobile: { src: `/brand-assets/home-hero-art/our-story-hero-mobile.webp${ART_VERSION}`, width: 1260, height: 2240, position: "50% 100%", calm: { x: 1, y: 0.36 } },
      alt: "Campaign image: a lavender Wonder bar on a lit stone plinth, with ten plain bottles and jars in shadow behind it",
    } satisfies PageHeroArt,
  },

  // Slide 11.
  whoWeAre: {
    eyebrow: "Who we are",
    lead: "At Royal Basket, our philosophy is to create premium quality soap that leaves your skin hydrated and happy, at a price that’s easy on the pocket.",
    body: "We believe a daily ritual should feel special, smell wonderful, and be kind to your skin.",
  },

  // Slide 12.
  values: {
    eyebrow: "Royal Basket Group",
    heading: "Our values",
    list: ["Simplicity", "Affordability", "Authenticity", "Quality", "Transparency"],
  },

  // Brief slide 13. No longer a section here (audit slides 24–25); the flavour pages still use these
  // words above each flavour's origin story (products.ts → origin).
  wonderRoom: {
    eyebrow: "Wonder Room",
    heading: "Every journey has a story. This is ours.",
  },

  // Slide 15 (hidden in the deck), laid out like rhode's "A note from Hailey" (slide 14).
  founder: {
    eyebrow: "A note from the founder",
    lead: "I’ve always been a one-bar person.",
    lines: [
      "Soap for my hair. My body. My hands. My face. I never understood why we needed ten different bottles when one good bar could do it all.",
      "So I made it.",
      "One bar you never want to travel without.",
      "Premium quality that leaves your skin soft and happy, and stays easy on your pocket. That’s my promise.",
    ],
    signature: "Founder",
    company: site.company,
    // Phase 3 illustration (AI-generated scene, Sol, with the client's real lavender bar photo laid in the tin).
    image: {
      src: `/brand-assets/home-hero-art/our-story-travel.webp${ART_VERSION}`,
      width: 1440,
      height: 1800,
      position: "50% 45%",
      alt: "Campaign image: an open carry-on with folded linen, sunglasses and a lavender Wonder bar in an open gold tin",
    },
  },

  // Slide 16 — draft wording, Ali to approve.
  ceo: {
    eyebrow: "CEO’s promise",
    lead: "At Wonder, we believe the things we use every day should be kind to us.",
    body: [
      "Soap is the simplest ritual there is. You use it every morning, every night, and it touches the skin of everyone you love. So it should be good: gentle, honest, and within reach for everyone, not just a few.",
      "That’s the standard our whole team works to, every day.",
    ],
    promise: "My promise to you: gentle on your skin, honest in what we make, and always affordable. Every bar of Wonder is made with the same care we would want for our own families.",
    thanks: "Thank you for letting Wonder be part of your day.",
    signature: "CEO",
    company: site.company,
    image: {
      src: "/brand-assets/campaign/bathroom-ritual.webp",
      alt: "Wonder Beauty Bar in a shell-shaped dish beside a warm bath",
    },
  },

  team: {
    eyebrow: "Meet the team",
    heading: ["The people", "behind Wonder"],
  },

  cta: {
    eyebrow: site.taglines.everyScent,
    heading: site.taglines.everydayLuxury,
    primary: { label: ordersCta.label, href: ordersCta.href },
    secondary: { label: "Explore the collection", href: "/collection" },
  },
} as const
