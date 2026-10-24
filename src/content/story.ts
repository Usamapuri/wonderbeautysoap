// Our Story copy, from the client's Wonder_Website_Brief.pptx (2026-10-25), laid out after rhode's
// About page (the developer's reference). Section order follows slide 10:
// who we are → our values → why Wonder? → Wonder Room → a note from the founder → CEO's promise.
// The founder's note was on a hidden slide (15); the CEO's promise is "draft wording, Ali to
// approve" (slide 16). Both are listed in DELIVERY-NOTES until the client signs them off.

import type { ValueCell } from "@/components/story/values-band"

import { ordersCta, site } from "./site"

export const story = {
  seo: {
    title: "Our Story",
    description: "Who we are, why Wonder, the Wonder Room, a note from the founder and the CEO's promise.",
  },

  // rhode-style opening: full-bleed picture with the page title and a link down to "Who we are".
  hero: {
    eyebrow: site.company,
    title: { before: "Our", emphasis: "Story" },
    cta: { label: "Who we are", href: "#who-we-are" },
    image: {
      src: "/brand-assets/products/lineup.webp",
      alt: "The five Wonder Beauty Bars in their gold-and-white boxes",
    },
  },

  // Slide 11.
  whoWeAre: {
    eyebrow: "Who we are",
    lead: "At Royal Basket, our philosophy is to create premium quality soap that leaves your skin hydrated and happy, at a price that's easy on the pocket.",
    body: "We believe a daily ritual should feel special, smell wonderful, and be kind to your skin.",
  },

  // Slide 12.
  values: {
    eyebrow: "Royal Basket Group",
    heading: "Our values.",
    list: ["Simplicity", "Affordability", "Authenticity", "Quality", "Transparency"],
    image: {
      src: "/brand-assets/flavors/aloe-freshness.webp",
      alt: "Aloe Vera concept artwork: a clear bar among fresh aloe leaves",
    },
  },

  // Slide 11 "Why Wonder? (three columns or icons)", in the three-cell band the client liked.
  whyWonder: {
    eyebrow: "Why Wonder?",
    cells: [
      {
        label: "01 / Why Wonder",
        heading: ["One bar", "does it all."],
        body: "Intentionally crafted for everyday care, with thoughtful ingredients and scents to help you glow, hydrate and protect.",
      },
      {
        label: "02 / Why Wonder",
        heading: ["Affordability."],
        body: "From the beginning, we wanted to make premium everyday care more affordable, without compromising on quality.",
      },
      {
        label: "03 / Why Wonder",
        heading: ["Nourishing."],
        body: "Gentle everyday cleansing that helps maintain your skin's natural moisture, leaving it feeling soft and cared for.",
      },
    ] satisfies ValueCell[],
  },

  // Slide 13. The stories themselves live on each product (products.ts → origin), in this order.
  wonderRoom: {
    eyebrow: "Wonder Room",
    heading: "Every journey has a story. This is ours.",
    order: ["lemon", "lavender", "rose", "aloe-vera", "coconut"] as const,
    footnote: "Pictures: concept artwork, imagined for the Wonder world.",
  },

  // Slide 15 (hidden in the deck), laid out like rhode's "A note from Hailey" (slide 14).
  founder: {
    eyebrow: "A note from the founder",
    lead: "I've always been a one-bar person.",
    lines: [
      "Soap for my hair. My body. My hands. My face. I never understood why we needed ten different bottles when one good bar could do it all.",
      "So I made it.",
      "One bar you never want to travel without.",
      "Premium quality that leaves your skin soft and happy, and stays easy on your pocket. That's my promise.",
    ],
    signature: "Founder",
    company: site.company,
  },

  // Slide 16 — draft wording, Ali to approve.
  ceo: {
    eyebrow: "CEO's promise",
    lead: "At Wonder, we believe the things we use every day should be kind to us.",
    body: [
      "Soap is the simplest ritual there is. You use it every morning, every night, and it touches the skin of everyone you love. So it should be good: gentle, honest, and within reach for everyone, not just a few.",
      "That's the standard our whole team works to, every day.",
    ],
    promise: "My promise to you: gentle on your skin, honest in what we make, and always affordable. Every bar of Wonder is made with the same care we would want for our own families.",
    thanks: "Thank you for letting Wonder be part of your day.",
    signature: "CEO",
    company: site.company,
    image: {
      src: "/brand-assets/flavors/bath-bubbles-poster.webp",
      alt: "Concept artwork: a Wonder bar resting beside a warm bath",
    },
  },

  team: {
    eyebrow: "Meet the team",
    heading: ["The people", "behind Wonder."],
  },

  cta: {
    eyebrow: site.taglines.everyScent,
    heading: site.taglines.everydayLuxury,
    primary: { label: ordersCta.label, href: ordersCta.href },
    secondary: { label: "Explore the collection", href: "/collection" },
  },
} as const
