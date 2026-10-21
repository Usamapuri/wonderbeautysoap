// Home page copy. Replicates the original Replit site's Home (developer decision 2026-10-21:
// "original + small additions"); the only additions are the on-pack promise strip and the bulk CTA.
// Order: hero, promise, botanicalEdit, film, collection, realWorld, intro, quietDetail, retail, closing.

import { site } from "./site"

export const home = {
  hero: {
    eyebrow: "A beauty soap for every day",
    // Rendered as "A little / everyday / wonder." — the emphasised word is gold.
    headline: { before: "A little", emphasis: "everyday", after: "wonder." },
    headlineText: site.heroHeadline,
    sub: "Five botanical varieties. One familiar bar. Meet Wonder Beauty Soap, dressed in its gold-and-white signature.",
    primaryCta: { label: "Explore the collection", href: "/collection" },
    secondaryCta: { label: "Discover Wonder", href: "/our-story" },
    image: {
      src: "/brand-assets/products/lineup.webp",
      alt: "The Wonder Beauty Bar range: Coconut, Aloe Vera, Lemon, Lavender and Rose",
      width: 1800,
      height: 1020,
    },
    badge: { value: "05", label: ["botanical", "varieties"] },
    index: "THE WONDER RANGE",
  },

  promise: [site.taglines.formulaShort, site.taglines.dermatologist],

  // Concept artwork (bare bars, no packaging) — labelled as such by the footnote.
  botanicalEdit: {
    eyebrow: "The Botanical Edit",
    lead: ["Five small worlds.", "A Wonder of your own."],
    label: "Wonder, in five imagined worlds",
    images: [
      { src: "/brand-assets/flavors/coconut-beach.webp", alt: "Coconut beach campaign concept, with a bar on sunlit sand", variety: "Coconut", mood: "The island daydream" },
      { src: "/brand-assets/flavors/lemon-italy.webp", alt: "Lemon campaign concept among lemons on the Amalfi coast", variety: "Lemon", mood: "A citrus afternoon" },
      { src: "/brand-assets/flavors/rose-editorial.webp", alt: "Rose-toned editorial campaign concept with sculpted rose soaps", variety: "Rose", mood: "Softly romantic" },
    ],
    footnote: "Concept artwork, imagined for the Wonder world.",
  },

  film: {
    eyebrow: "A little pause in the day",
    heading: { before: "Let the day", emphasis: "soften." },
    body: "A quiet, imagined moment with Wonder. A reminder that an everyday ritual can still feel like your own.",
    caption: "Campaign film · Sound off",
    frameCaption: "Moving image concept · Wonder Beauty Soap",
    // The starter's mp4 is not on its live deployment — it comes with the Replit source export (§9).
    // Drop it at public/brand-assets/videos/wonder-bath-bubbles.mp4 and set `src` to that path.
    src: null as string | null,
    poster: "/brand-assets/flavors/bath-bubbles-poster.webp",
    label: "Muted Wonder campaign film showing a beauty bar beside a bath of bubbles",
  },

  collection: {
    eyebrow: "Find your Wonder",
    heading: ["Five botanicals.", "One beauty bar."],
    body: "A closer look at the Wonder Beauty Bar range. Each variety has its own botanical illustration and distinctive package.",
    more: { label: "See all five varieties", href: "/collection" },
  },

  // Links to In the City — the original's "promise band".
  realWorld: {
    eyebrow: "Wonder, in the real world",
    heading: ["Recognisable", "by nature."],
    body: "Gold lettering. Cream-and-white packs. Botanical illustrations that make each variety its own. Wonder’s signature look belongs to the everyday—and has a way of standing out.",
    cta: { label: "See Wonder out and about", href: "/in-the-city" },
    image: {
      src: "/brand-assets/lifestyle/london-lineup.webp",
      alt: "Wonder Beauty Soap packages photographed beside the London Eye",
    },
  },

  intro: {
    eyebrow: "Made from a personal idea",
    heading: ["A bar with", "a point of view."],
    body: [
      "Wonder began with the owner's experience of very sensitive skin and a wish for a locally available soap imagined with sensitive and dry skin in mind.",
      "That personal motivation became a broader aspiration: an everyday bar with a luxurious feel, at an affordable price.",
    ],
    cta: { label: "Read the story", href: "/our-story" },
    image: {
      src: "/brand-assets/lifestyle/london-coconut.webp",
      alt: "Wonder Coconut Beauty Soap held beside the River Thames in London",
    },
  },

  quietDetail: {
    eyebrow: "Little rituals, within reach",
    heading: ["Beauty belongs", "in the everyday."],
    body: "Wonder was imagined for the ordinary moments we return to: a fresh towel, warm water, a few minutes to yourself.",
    cta: { label: "The thought behind Wonder", href: "/our-story" },
    image: {
      src: "/brand-assets/flavors/aloe-freshness.webp",
      alt: "Aloe-inspired beauty bar campaign concept, surrounded by fresh aloe leaves",
    },
  },

  // Retail shots from the starter. Captions must not name a retailer until the client confirms it (§10).
  // width/height = the WebP's pixel size; the strip sizes each column so every photo fits uncropped.
  // On phones the first two sit side by side and the third spans the row, so keep a landscape shot last.
  retail: [
    { src: "/brand-assets/lifestyle/in-store.webp", width: 801, height: 1200, alt: "Wonder Beauty Soap among products in a shopping basket", caption: "A moment in a shop" },
    { src: "/brand-assets/lifestyle/rose-at-retail.webp", width: 900, height: 1200, alt: "Wonder Rose Beauty Soap held in a retail setting", caption: "Rose, on the go" },
    { src: "/brand-assets/lifestyle/collection-basket.webp", width: 1200, height: 801, alt: "Wonder Beauty Soap packages in a shopping basket", caption: "Everyday discoveries" },
  ],

  closing: {
    eyebrow: "Five ways to meet Wonder",
    heading: ["Which one", "will you choose?"],
    body: "Coconut, Aloe Vera, Lemon, Lavender or Rose. Take a closer look at the Wonder Beauty Bar collection.",
    primaryCta: { label: "Explore the collection", href: "/collection" },
    // Brief addition: route bulk buyers to Contact with "Bulk order" pre-selected.
    secondaryCta: { label: "For bulk orders, talk to us", href: "/contact?type=bulk" },
  },
} as const
