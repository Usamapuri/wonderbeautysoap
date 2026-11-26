// Home page copy, strictly from the client's Wonder_Website_Brief.pptx (2026-10-25) — the deck's
// own text, or the existing site text shown in its screenshots — as amended by the client's
// Website Audit deck (2026-11-20, "audit slide N" below), which supersedes the brief wherever it
// specifies a change. Section order follows brief slide 3 (welcome → mission → vision → products →
// where it's sold), laid out after the Gisou home page.
// Order: hero (moving campaign picture), promises, welcome, film, design, mission, vision, products,
// world, reviews (hidden until real reviews exist), closing. The scent-artwork collage was removed
// (audit slide 16).

import type { HeroArtContent } from "@/components/home/hero-art"
import type { ValueCell } from "@/components/story/values-band"

import { ordersCta, site } from "./site"

const art = "/brand-assets/home-hero-art"
const motion = "/brand-assets/home-hero-motion"

export const home = {
  // The Bolt prototype's opening (brief slide 4) over a full-screen moving picture (audit slides 1–2,
  // after rhode.com's video first screen).
  hero: {
    // Audit slide 4.
    eyebrow: "Rich, creamy lather in scents you’ll love",
    // Rendered as three lines; the middle word is italic and indented, as in the prototype.
    headline: ["Scent", "Lather", "Wonder"],
    headlineText: site.taglines.hero,
    // Audit slide 5.
    sub: "Beautifully scented soaps with a rich, creamy lather. Premium quality in five flavours.",
    // The "For orders, speak to us" button beside it was removed (audit slide 7).
    primaryCta: { label: "Explore the collection", href: "/collection" },
    // The layered lifestyle campaign picture (owner 2026-11-21), 16:9 for wide screens and 9:16 for phones
    // and upright tablets. Background: an AI-generated scene (Sol) of a woman in a robe lathering a pink
    // bar in a warm washroom; the bar she holds is part of that scene. Foreground: the client's real Rose and
    // Lavender box mockups on the ledge, with drawn-in shadows. Loop: a gentle 10 s push-in (up to 1.8%)
    // made from the background alone, anchored where the boxes meet the ledge; no light change over her face.
    // Geometry from the art manifest, in % of each canvas:
    //   desktop: face x 59–89 / y 0–40; hands x 54–81 / y 51–91; boxes x 29.9–42.8 / y 69.6–81.9 (shadow
    //            from x 26.8). `clear` = the hands' left edge (the copy column stops 40px short of it);
    //            `floor` = top of the boxes (the heading ends above it); `under` = the boxes' shadow edge
    //            (the sub-line stays left of it, passing beside the boxes).
    //   portrait: face x 51–83 / y 37–66; hands x 38–81 / y 71–90; boxes x 1.4–17.7 / y 70.5–82.1.
    //            `clear` = the face's left edge and `floor` = its top (the heading ends above the face or
    //            stays left of it; the sub-line stays left of it); the button sits at the foot of the
    //            frame, below the hands.
    art: {
      desktop: {
        background: `${art}/home-hero-background.webp`,
        foreground: `${art}/home-hero-foreground.webp`,
        width: 2400,
        height: 1350,
        focus: { x: 60, y: 50 },
        anchor: { x: 36, y: 82 },
        clear: 54,
        floor: 69.6,
        under: 26.8,
        loop: `${motion}/home-hero-plate-16x9.mp4`,
      },
      mobile: {
        background: `${art}/home-hero-mobile-background.webp`,
        foreground: `${art}/home-hero-mobile-foreground.webp`,
        width: 1260,
        height: 2240,
        focus: { x: 10, y: 100 },
        anchor: { x: 9.5, y: 82 },
        clear: 51,
        floor: 37,
        loop: `${motion}/home-hero-plate-9x16.mp4`,
      },
      alt: "Campaign image: a woman in a cream robe lathering a pink Wonder bar in a warm washroom, with Wonder Rose and Lavender boxes on the stone ledge beside her",
    } satisfies HeroArtContent as HeroArtContent,
  },

  // Audit slide 8: the strip now carries the on-pack promise words only.
  promises: site.taglines.formulaWords,

  // Brief slide 11 "Why Wonder? (three columns or icons)", in the three-cell band the client liked.
  // Moved here from Our Story (owner request 2026-11-21: "add the why wonder in home page"); the copy
  // is unchanged.
  whyWonder: {
    eyebrow: "Why Wonder?",
    cells: [
      {
        heading: ["One bar", "does it all"],
        body: "Intentionally crafted for everyday care, with thoughtful ingredients and scents to help you glow, hydrate and protect.",
      },
      {
        heading: ["Affordability"],
        body: "From the beginning, we wanted to make premium everyday care more affordable, without compromising on quality.",
      },
      {
        heading: ["Nourishing"],
        body: "Gentle everyday cleansing that helps maintain your skin’s natural moisture, leaving it feeling soft and cared for.",
      },
    ] satisfies ValueCell[],
  },


  // Slides 5–6, broken into short lines ("no paragraphs") with visuals in between.
  welcome: {
    eyebrow: "Welcome",
    // Audit slide 9 (the client's three lines; spelling corrected).
    heading: ["A premium quality", "soap brand"],
    lead: ["Made with a promise to hydrate, moisturise and protect your skin.", "Designed with love and attention."],
    // The client's sentences, split into a bold lead and the rest.
    points: [
      { title: "Carefully selected ingredients,", body: "including fragrant flowers and botanicals." },
      { title: "Packed with care", body: "by our own people, for you." },
      { title: "Innovation, experimentation and design", body: "in everyday beauty." },
    ],
    pull: "Every bar is a small multisensory experience: rich lather, a lovely scent and a feel that stays with you.",
    // Audit slide 10 ("new video and longer"): a ~9 s ritual edit of the supplied clips (Lavender
    // face ritual, Aloe Vera hands lather, Lavender bar lather), 2:3 like the frame, at 1080x1620.
    video: "/brand-assets/audit-media/video/home-welcome-ritual-2x3.mp4",
    image: {
      src: "/brand-assets/audit-media/video/home-welcome-ritual-2x3.webp",
      alt: "Wonder Lavender and Aloe Vera Beauty Bars in a skincare ritual",
    },
  },

  // The video banner between the welcome notes. Its text is the client's new copy (audit slides
  // 11–12: "Replace this text" / "New text for this page"): the first line leads, the rest follow.
  film: {
    heading: { before: "Premium care", emphasis: "in every bar" },
    lines: ["Creamy lather, lasting fragrance.", "Crafted with care. Made to wonder."],
    src: "/brand-assets/videos/wonder-collection.mp4",
    poster: "/brand-assets/videos/wonder-collection-poster-rounded.webp",
    label: "All five Wonder Beauty Bars surrounded by lather",
  },

  // Slide 6 + designer note "Eco-friendly box packaging is a selling point: give it space on Home".
  // The welcome note's second part (deck slide 6) is gone: the design statement over a fixed backdrop (audit
  // slides 13–14) and then the eco-friendly packaging panel with its closing line (audit slide 15) were deleted
  // at the owner's request (phase 3: "DELETE THIS section", "remove a better way to wrap luxury section as well").

  // Slides 7–8. Labels set larger and the mission centred in its panel (audit slides 17–18).
  mission: {
    eyebrow: "Our mission",
    text: "To make everyday luxury accessible to all, with a gentle, moisturising, beautifully scented beauty bar made with care for every skin type, at a price everyone can afford.",
  },
  vision: {
    eyebrow: "Our vision",
    text: "Our vision is to offer products you can trust. In a world full of big claims and marketing gimmicks, Wonder promises to stay honest: quality ingredients, careful craftsmanship and a product we are proud to stand behind.",
    signOff: "From us to you",
    // Slide 8 notes: optional second vision line.
    second: "To become the most loved everyday beauty bar in the region, and a name that travels.",
    // Audit slide 19 campaign still, with the lower edge of the bar retouched.
    image: {
      src: "/brand-assets/audit-media/image/home-vision-rounded.webp",
      alt: "A Wonder Beauty Bar resting on a silver tray over soft satin",
      width: 1024,
      height: 683,
    },
  },

  products: {
    eyebrow: "The collection",
    heading: ["Five botanicals", "One beauty bar"],
    // The tagline as a sentence: here it is the paragraph under the heading, so it keeps its full stop (owner
    // rule: headings without, paragraphs with). The closing band's heading below stays without one.
    body: `${site.taglines.celebration}.`,
    more: { label: "See the whole collection", href: "/collection" },
  },

  // The strip linking to Around the World (slide 3). Audit slide 21 ("supply new images"): the store
  // photos (previous packaging, other brands in the basket) moved to Around the World's "Spotted at"
  // collage, and two supplied campaign stills take their place. They show no shop or place, so they
  // carry no captions. width/height = the WebP's pixel size; the strip fits every photo uncropped.
  world: {
    eyebrow: "Around the world",
    heading: site.taglines.everydayLuxury,
    cta: { label: "See Wonder around the world", href: "/around-the-world" },
    photos: [
      // One picture (declutter pass 2026-11-21; it was two).
      { src: "/brand-assets/audit-media/image/home-world-landscape.webp", width: 1800, height: 1200, alt: "Hands lathering a Wonder Beauty Bar" },
    ],
  },

  closing: {
    eyebrow: site.taglines.everydayLuxury,
    heading: ["Lather that feels like", "a little celebration"],
    primaryCta: { label: "Explore the collection", href: "/collection" },
    secondaryCta: { label: ordersCta.label, href: ordersCta.href },
  },
} as const
