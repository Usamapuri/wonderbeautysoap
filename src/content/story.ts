// Our Story copy (brief §4.2, client change request #1).
// Facts allowed without client input: founded 2019; the founder's very sensitive skin; the search
// for a locally available bar for sensitive/dry skin that felt luxurious but stayed affordable;
// five varieties; the gold-and-white rebrand with botanical illustrations. Everything else is
// starter wording awaiting client approval, or a placeholder.

import { placeholder, type Placeholder } from "./placeholder"
import { site } from "./site"

export type Milestone = {
  /** Year label, or a short stage label when the year is not known. */
  label: string
  isYear: boolean
  title: string
  body: (string | Placeholder)[]
}

export type ThenAndNow = {
  slug: "coconut" | "aloe-vera" | "lemon" | "lavender" | "rose"
  /** Genuine photo of the pre-rebrand pack. Never fabricate one. */
  before: { src: string; alt: string }
}

export const story = {
  seo: {
    title: "Our Story",
    description: "The personal experience and thoughtful ambition behind Wonder Beauty Soap, founded in 2019.",
  },

  hero: {
    eyebrow: "The reason Wonder began",
    title: { before: "It started", middle: "with ", emphasis: "my skin." },
    body: "A personal experience became a simple ambition: make a beauty bar with sensitive and dry skin in mind.",
    image: {
      src: "/brand-assets/products/lineup.webp",
      alt: "The Wonder Beauty Bar collection in its botanical illustrated packaging",
      caption: "The Wonder Beauty Bar range.",
    },
  },

  // Opening story block. STARTER WORDING — needs the client's written approval before launch (§10).
  founder: {
    number: "01",
    label: "A note from the owner",
    since: `Since ${site.founded}`,
    lead: "“I know what it is to search for something as ordinary as a bar of soap, and still not feel sure it will suit my skin.”",
    body: [
      "My own experience of very sensitive skin and eczema made finding a locally available soap that did not trigger reactions difficult. I wanted to create something that began with that reality—with sensitive and dry skin in mind, and with care for people living with skin conditions.",
      "I also imagined a bar that could feel like a small everyday luxury without being out of reach. That idea included families, babies and anyone who wanted a gentler-feeling place to begin. It is an aspiration behind Wonder, not a promise that the bar is right for everyone.",
      "Wonder is my attempt to bring thoughtfulness and a little beauty to an everyday essential. I hope the collection feels considered, welcoming and lovely to reach for.",
    ],
    signature: "The owner, Wonder Beauty Soap",
  },

  // The original site's values band (starter wording), shown right after the founder note.
  values: [
    { label: "01 / Origin", heading: ["Personal,", "not perfect."], body: "Wonder began with lived experience and a wish to approach everyday cleansing with more consideration." },
    { label: "02 / Intention", heading: ["Thoughtful", "by design."], body: "Our intention is to make a considered beauty bar, with a luxurious feel and an accessible spirit." },
    { label: "03 / Invitation", heading: ["Make it", "your own."], body: "Explore the five varieties and learn more about the Wonder Beauty Bar range." },
  ],

  timeline: {
    number: "02",
    eyebrow: "The journey",
    heading: [`From ${site.founded}`, "to today."],
    milestones: [
      {
        label: String(site.founded),
        isYear: true,
        title: "The first bar",
        body: [placeholder("2019 — how the first bar came about, in the founder's words")],
      },
      {
        label: "The early years",
        isYear: false,
        title: "First packaging, first customers",
        body: [placeholder("early years — first packaging, first stockist or first big order")],
      },
      {
        label: "Growth",
        isYear: false,
        title: "The range grows to five",
        body: ["Coconut, Aloe Vera, Lemon, Lavender and Rose.", placeholder("when and how the range grew to five")],
      },
      {
        label: "The rebrand",
        isYear: false,
        title: "A new identity",
        body: [placeholder("why the rebrand happened")],
      },
      {
        label: "Today",
        isYear: false,
        title: "Gold-and-white, five botanicals",
        body: ["The new gold-and-white packaging, with a botanical illustration for every variety."],
      },
    ] satisfies Milestone[],
  },

  thenAndNow: {
    number: "03",
    eyebrow: "Then & now",
    heading: ["A new look", "for Wonder."],
    body: "The packaging before the rebrand, beside the packaging today.",
    beforeLabel: "Before the rebrand",
    afterLabel: "Today",
    // Only varieties with a genuine old-pack photo. These are crops of the client's own photos;
    // swap in front-on shots when supplied (brand-assets/source/old-packaging/<slug>.jpg).
    pairs: [
      {
        slug: "coconut",
        before: { src: "/brand-assets/story/old-coconut.webp", alt: "The Coconut bar in its packaging before the rebrand" },
      },
      {
        slug: "rose",
        before: { src: "/brand-assets/story/old-rose.webp", alt: "The Rose bar in its packaging before the rebrand" },
      },
    ] satisfies ThenAndNow[],
  },

  rebrand: {
    number: "04",
    eyebrow: "The rebrand",
    heading: ["What changed,", "what stayed."],
    why: placeholder("the rebrand — why the new identity and packaging happened"),
    values: [
      {
        label: "01 / What changed",
        heading: ["A new", "identity."],
        body: "A new WONDER wordmark and W monogram, dressed in gold-and-white packaging.",
      },
      {
        label: "02 / What changed",
        heading: ["A botanical", "for every bar."],
        body: "Each variety carries its own illustration: coconut, aloe vera, lemon, lavender and rose.",
      },
      {
        label: "03 / What stayed",
        heading: ["The same", "promise."],
        body: `${site.taglines.formula}. ${site.taglines.dermatologist}.`,
      },
    ],
  },

  team: {
    number: "05",
    eyebrow: "Meet the team",
    heading: ["The people", "behind Wonder."],
  },

  cta: {
    eyebrow: "A range shaped by its own point of view",
    heading: "Meet Wonder.",
    primary: { label: "Explore the collection", href: "/collection" },
    secondary: { label: "Get in touch", href: "/contact" },
  },
} as const
