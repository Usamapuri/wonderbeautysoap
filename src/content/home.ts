// Home page copy, strictly from the client's Wonder_Website_Brief.pptx (2026-10-25) — the deck's
// own text, or the existing site text shown in its screenshots. Section order follows
// slide 3 (welcome → mission → vision → products → where it's sold), laid out after the Gisou home
// page the developer chose as the reference, with the reviews at the end (slide 9).
// Order: hero, promises, welcome, film, design, scents, mission, vision, products, world, reviews, closing.

import { ordersCta, site } from "./site"

export const home = {
  // Slide 4: "Keep the opening as is" — the Bolt prototype's opening.
  hero: {
    eyebrow: "Artisanal soap, made to travel",
    // Rendered as three lines; the middle word is italic and indented, as in the prototype.
    headline: ["Scent.", "Lather.", "Wonder."],
    headlineText: site.taglines.hero,
    sub: "Beautifully scented bars inspired by the places we love, made with care for the skin you live in.",
    primaryCta: { label: "Explore the collection", href: "/collection" },
    // Bulk orders only (developer decision 2026-10-25).
    secondaryCta: { label: ordersCta.label, href: ordersCta.href },
    image: {
      src: "/brand-assets/products/lemon.webp",
      alt: "The Wonder Lemon Beauty Bar in its gold-and-white box",
    },
  },

  promises: [...site.taglines.promises, site.taglines.everydayLuxury.replace(".", ""), site.taglines.dermatologist],

  // Slides 5–6, broken into short lines ("no paragraphs") with visuals in between.
  welcome: {
    eyebrow: "Welcome",
    heading: ["A Pakistani artisan", "soap brand."],
    lead: "Made with meticulous attention to detail, and with both skin comfort and sensory pleasure in mind.",
    // The client's sentences, split into a bold lead and the rest.
    points: [
      { title: "Carefully selected ingredients,", body: "including fragrant flowers and botanicals." },
      { title: "Packed with care", body: "by our own people, for you." },
      { title: "Innovation, experimentation and design", body: "in everyday beauty." },
    ],
    pull: "Every bar is a small multisensory experience: rich lather, a lovely scent and a feel that stays with you.",
    image: {
      src: "/brand-assets/lifestyle/london-coconut.webp",
      alt: "A Wonder Coconut Beauty Soap held beside the River Thames in London",
    },
  },

  // The visual between the welcome notes (slide 31: "AI video" goes here).
  film: {
    eyebrow: "A little pause in the day",
    heading: { before: "Let the day", emphasis: "soften." },
    body: "A quiet, imagined moment with Wonder. A reminder that an everyday ritual can still feel like your own.",
    caption: "Campaign film · Sound off",
    // No video supplied yet (deck slide 21: "Add AI videos"). Drop an mp4 at
    // public/brand-assets/videos/ and set `src` to its path; the poster shows until then.
    src: null as string | null,
    poster: "/brand-assets/flavors/bath-bubbles-poster.webp",
    label: "Wonder campaign film: a beauty bar beside a bath of bubbles",
  },

  // Slide 6 + designer note "Eco-friendly box packaging is a selling point: give it space on Home".
  design: {
    statement: "Elegance and design go into every pack, so your soap feels like a little luxury and not just a bathroom basic.",
    eco: {
      eyebrow: "Eco-friendly box packaging",
      heading: "A better way to wrap luxury.",
      lines: [
        "Instead of traditional wrappers and plastic packaging, Wonder comes in eco-friendly box packaging.",
        "It helps reduce our carbon footprint and gives you a luxury experience at an affordable price, because every customer matters to us.",
      ],
      image: {
        src: "/brand-assets/products/lineup.webp",
        alt: "All five Wonder Beauty Bars in their gold-and-white boxes",
      },
    },
    closing: "We love quality and beauty, and we want you to find both in every bar.",
  },

  // Slides 25, 26, 30: all five flavours, "Every scent tells a story", "Wonder, wherever you are."
  scents: {
    eyebrow: site.taglines.everyScent,
    heading: site.taglines.wherever,
    footnote: "Concept artwork, imagined for the Wonder world.",
  },

  // Slides 7–8.
  mission: {
    eyebrow: "Our mission",
    text: "To make everyday luxury accessible to all, with a gentle, moisturising, beautifully scented beauty bar made with care for every skin type, at a price everyone can afford.",
    image: {
      src: "/brand-assets/lifestyle/rose-at-retail.webp",
      alt: "A Wonder Rose Beauty Soap held in a shop",
      width: 900,
      height: 1200,
    },
  },
  vision: {
    eyebrow: "Our vision",
    text: "Our vision is to offer products you can trust. In a world full of big claims and marketing gimmicks, Wonder promises to stay honest: quality ingredients, careful craftsmanship and a product we are proud to stand behind.",
    signOff: "From us to you.",
    // Slide 8 notes: optional second vision line.
    second: "To become the most loved everyday beauty bar in the region, and a name that travels.",
    image: {
      src: "/brand-assets/lifestyle/london-lineup.webp",
      alt: "Wonder Beauty Soap packages photographed beside the London Eye",
      width: 1200,
      height: 801,
    },
  },

  products: {
    eyebrow: "The collection",
    heading: ["Five botanicals.", "One beauty bar."],
    body: site.taglines.celebration,
    more: { label: "See the whole collection", href: "/collection" },
  },

  // "Visuals of where Wonder is sold … linking to Around the World" (slide 3). Real photographs.
  // width/height = the WebP's pixel size; the strip sizes columns so every photo fits uncropped.
  world: {
    eyebrow: "Around the world",
    heading: site.taglines.everydayLuxury,
    cta: { label: "See Wonder around the world", href: "/around-the-world" },
    photos: [
      { src: "/brand-assets/lifestyle/in-store.webp", width: 801, height: 1200, alt: "Wonder Beauty Soap in a shopping basket in a store", caption: "A moment in a shop" },
      { src: "/brand-assets/lifestyle/collection-basket.webp", width: 1200, height: 801, alt: "Wonder Beauty Soap packages in a shopping basket", caption: "Everyday discoveries" },
    ],
  },

  closing: {
    eyebrow: site.taglines.everydayLuxury,
    heading: ["Lather that feels like", "a little celebration."],
    primaryCta: { label: "Explore the collection", href: "/collection" },
    secondaryCta: { label: ordersCta.label, href: ordersCta.href },
  },
} as const
