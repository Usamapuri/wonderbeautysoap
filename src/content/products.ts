// The five Wonder Beauty Bars, in the order of the client's website brief deck (slides 2, 17, 21).
// Exactly five. Copy sources:
//   tagline / subLine — slide 21 ("All 5 flavours" table)
//   mood              — slide 17 tagline column (also on slide 20)
//   origin.place      — slide 17 "Origin of the idea"; origin.story — slide 13 (Wonder Room, founder's words)
// Client website audit (2026-11, approved copy; supersedes the brief where it differs):
//   description       — audit slides 28, 30, 32, 34, 36, word for word, one string per paragraph.
//                       It answers the brief's "scent description" request (slide 17). One exception,
//                       on the user's instruction: Lavender's free-of line drops "sulfates" (see Lavender).
//   ingredients       — audit slides 29, 31, 33, 35, 37, word for word (after "Ingredients: "). Do not
//                       "correct" spellings or punctuation without the client's written confirmation.
//   netWeight         — audit slide 28: 125 g for every flavour.
//   views             — audit slide 26: front, left, right, back, inside (owner 2026-11-21: Left and Right
//                       replace the flat Side panels). Only real pack artwork is shown; views
//                       with no approved artwork are left out (no visible placeholders). Inside shows the
//                       bar in its own colour (`barColour`, owner-confirmed): the client's soap photo, cut
//                       out; Coconut is the untouched photo, and the other four have their colour applied
//                       digitally (an approximation until the client photographs each coloured bar), so the
//                       view never calls them photographs. A fifth "Video" view (audit slide 44) is added
//                       where a supplied product film exists (`film`).
//   campaign          — AI-made campaign images of the real product (public/brand-assets/home-hero-art/):
//                       `collection` (1:1) is the card image wherever a flavour card appears. Flavour pages
//                       carry no campaign image (owner, 2026-11-21); the 4:5 portraits are unused there. Each image passed a 200%
//                       check of its pack against the approved artwork; the 4:5 "detail" shots did not (their
//                       background box is an AI redraw) and are not used. No on-page AI caption (owner).
// `bestFor` still needs client-confirmed copy (slide 17 asks for it); never write new benefit claims.

import { productPage } from "./product-page"

export type ProductSlug = "rose" | "lavender" | "aloe-vera" | "lemon" | "coconut"

/** One view in the flavour page's pack gallery. All fields are serialisable (client component). */
export type ProductView =
  | { id: "front" | "left" | "right" | "back"; kind: "image"; label: string; src: string; alt: string; /** packshot on white: multiply onto the clay well */ blend: boolean }
  | { id: "inside"; kind: "cutout"; label: string; src: string; width: number; height: number; alt: string; note: string }
  | { id: "video"; kind: "video"; label: string; src: string; poster: string; alt: string }

/** An AI-made campaign image of the real product. width/height = the file's pixel size. */
export type CampaignImage = { src: string; width: number; height: number; alt: string }

const campaignArt = "/brand-assets/home-hero-art"

/**
 * Back view pictures (owner 2026-11-21): a pack-shot scene (a blank carton drawn by Sol) with the
 * client's real dieline back panel placed on it, sized like the Front view (960×800), at
 * public/brand-assets/home-hero-art/<slug>-back.webp. The owner chose to publish the back panel as
 * printed, with only "RETAIL PRICE RS. 150/-" patched out; DELIVERY-NOTES lists what that panel shows
 * that differs from the site. The panel is the same on all five packs (only the box's bottom face
 * differs). A flavour without an entry here has no Back tab.
 */
const backAltFor = (variety: string) =>
  `Back of the Wonder ${variety} pack, turned over: the printed back panel with the product description, ingredients, net weight and maker`
const backArt: Partial<Record<ProductSlug, string>> = {
  rose: backAltFor("Rose"),
  lavender: backAltFor("Lavender"),
  "aloe-vera": backAltFor("Aloe Vera"),
  lemon: backAltFor("Lemon"),
  coconut: backAltFor("Coconut"),
}

/** The bar from inside the box (981×700, transparent): the client's soap photo, cut out and edge-cleaned,
 *  coloured per flavour (see `views` above). */
const insideCutout = (slug: ProductSlug) => ({ src: `${campaignArt}/wonder-soap-${slug}.webp`, width: 981, height: 700 })

/** Film of the soap (audit slide 44), from the media pipeline. */
export type ProductFilm = { src: string; poster: string; alt: string }

// Audit slide 44 ("actual video of soap"). 6:5 edits (960x800, silent loop + same-name WebP poster) cut by
// the media pipeline from the client's supplied clips ("801 by 1200px videos" 1–3); see
// /tmp/wonder-audit-media-plan.txt. Whether those clips are real camera footage could not be verified; the
// owner removed the on-page label that said so (2026-11-21), and DELIVERY-NOTES keeps that record. Only Lavender and Aloe Vera have
// supplied clips; Rose, Lemon and Coconut keep the pack views until the client supplies footage.
// `scene` describes what the edit actually shows (checked frame by frame), for the alt text.
const suppliedFilm = (slug: ProductSlug, variety: string, scene: string): ProductFilm => ({
  src: `/brand-assets/audit-media/video/flavour-${slug}-6x5.mp4`,
  poster: `/brand-assets/audit-media/video/flavour-${slug}-6x5.webp`,
  alt: `Wonder Beauty Bar — ${variety}: ${scene}`,
})

export type Product = {
  slug: ProductSlug
  variety: string
  name: string
  /** Botanical illustration cropped from the approved dieline (scripts/prepare_assets.py). */
  botanical: string
  /** Approved packaging render on the studio background (6:5). */
  image: string
  /** Display line, e.g. "Meet me in Paris." */
  tagline: string
  /** Supporting line, e.g. "Soft petals, golden hour." */
  subLine: string
  /** Short mood line, e.g. "Softly romantic" — also the title of the variety's concept artwork. */
  mood: string
  /** Where the idea for the scent came from, in the founder's words. */
  origin: { place: string; story: string }
  /** Client-supplied concept artwork for the variety, showing the matching bare bar. */
  artwork: { src: string; alt: string }
  /** Product description from the client's audit, one string per paragraph, word for word. */
  description: string[]
  /** Ingredients from the client's audit, word for word (the list after "Ingredients: "). */
  ingredients: string
  /** Net weight (audit slide 28). */
  netWeight: string
  /** "Best for" line — client-confirmed only. Not shown until supplied (owner 2026-11-21: no visible
   *  placeholders); listed in DELIVERY-NOTES. */
  bestFor?: string
  /** Optional film of the actual soap (audit slide 44); adds a Video view when set. */
  film?: ProductFilm
  /** Pack views for the flavour page (audit slide 26), in display order. */
  views: ProductView[]
  /** AI-made campaign image used as the flavour's card picture wherever a flavour card appears. */
  campaign: { collection: CampaignImage }
  /** The bar's own colour, in the owner's words (each flavour's bar is coloured; Coconut's is white). */
  barColour: string
  /** CSS colour token for the per-flavour accent. */
  accent: string
}

type Input = Omit<Product, "name" | "botanical" | "image" | "netWeight" | "bestFor" | "views" | "campaign">

const product = (p: Input): Product => {
  const name = `Wonder Beauty Bar — ${p.variety}`
  const bar = `the ${p.barColour} Wonder bar`
  const image = `/brand-assets/products/${p.slug}-pack.webp`
  const { views: label } = productPage
  const backAlt = backArt[p.slug]
  const views: ProductView[] = [
    { id: "front", kind: "image", label: label.front, src: image, alt: `${name}: the box, front view`, blend: true },
    // Left and Right (owner 2026-11-21, replacing the flat end panels): pack shots of the box's two ends.
    { id: "left", kind: "image", label: label.left, src: `${campaignArt}/${p.slug}-side-left.webp`, alt: `${name}: the box's left end, with the W monogram, and the front receding to the right`, blend: true },
    { id: "right", kind: "image", label: label.right, src: `${campaignArt}/${p.slug}-side-right.webp`, alt: `${name}: the box's right end, with "Wonder Beauty Bar" printed upright, and the front receding to the left`, blend: true },
    // Back: shown for every flavour listed in `backArt` (no visible placeholder otherwise).
    ...(backAlt ? [{ id: "back", kind: "image", label: label.back, src: `${campaignArt}/${p.slug}-back.webp`, alt: backAlt, blend: true } satisfies ProductView] : []),
    {
      id: "inside",
      kind: "cutout",
      label: label.inside,
      ...insideCutout(p.slug),
      alt: `The bar inside the ${p.variety} box: a ${p.barColour} oval Wonder Beauty Bar with “Wonder” embossed across it`,
      note: productPage.inside.note,
    },
  ]
  if (p.film) views.push({ id: "video", kind: "video", label: label.video, ...p.film })
  return {
    ...p,
    name,
    botanical: `/brand-assets/botanicals/${p.slug}.webp`,
    image,
    netWeight: productPage.netWeight,
    views,
    campaign: {
      // All five share one set-up (checked): the box upright behind the bar on a gold-rimmed dish.
      collection: {
        src: `${campaignArt}/${p.slug}-collection.webp`,
        width: 1254,
        height: 1254,
        alt: `Campaign image: the Wonder ${p.variety} box standing behind ${bar} on a gold-rimmed dish, against a warm taupe backdrop`,
      },
    },
  }
}

export const products: Product[] = [
  product({
    slug: "rose",
    barColour: "pink",
    variety: "Rose",
    tagline: "Meet me in Paris.",
    subLine: "Soft petals, golden hour.",
    mood: "Softly romantic",
    origin: {
      place: "Paris, France",
      story: "Paris, the city of love, is where I met my wife. How could I not make a Rose? Soft, romantic and timeless.",
    },
    artwork: { src: "/brand-assets/flavors/rose-bar.webp", alt: "Rose concept artwork: a pink Wonder bar with rose petals and lather" },
    // Audit slides 34 (description) and 35 (ingredients), word for word.
    description: [
      "It starts with love, as do all things made in Paris: a love of beauty, artistry, and quality found throughout the local markets. Our curated assortment of modern fragrances is inspired by journeys through these markets, which celebrate flavors, aromas, and life. Enriched with the skin-caring ingredient Rose, our soap gently removes dirt and grime, leaving skin feeling loved and a fragrance that stays with you.",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Sodium Laurate, Sodium Hydroxide, Sodium Sulphate, Sodium Chloride, Potassium Hydroxide, Tetrasodium EDTA, Talcum Powder Water Solvent, Propylene Glycol, Sorbitol, Stearic Acid, Citric Acid, Glycerine, Sine Adipe Lac, Castor Oil, Olea Europaea Fruit Oil, Rose Flower Oil, CI 77891 Titanium Dioxide, CI 45410 Pink Colourant",
    accent: "var(--botanical-rose)",
  }),
  product({
    slug: "lavender",
    barColour: "lavender",
    variety: "Lavender",
    tagline: "Countryside romance.",
    subLine: "Purple fields, slow mornings.",
    mood: "Calm in a bar",
    origin: {
      place: "Surrey, UK",
      story:
        "I spent years living in the UK, where I discovered rows of purple lavender stretching to the horizon. Mayfield Lavender in Surrey is one of the best-known lavender fields in the country. That calm, quiet feeling became our Lavender bar.",
    },
    artwork: { src: "/brand-assets/flavors/lavender-bar.webp", alt: "Lavender concept artwork: a purple Wonder bar with lavender sprigs and lather" },
    // Audit slides 28 (description) and 29 (ingredients), word for word, with one client-directed change:
    // "sulfates" is removed from the free-of sentence because the bar contains Sodium Sulphate (the user
    // confirmed Lavender has sulphate, 2026-11-21). Sodium Sulphate stays in the ingredients.
    description: [
      "Our signature scent, Lavender, is a charismatic and intensely botanical fragrance. Inspired by the endless fields of lavender in Mayfield, Surrey, it is floral and sweet, with green and spicy notes.",
      "The rich yet gently cleansing formula of our Lavender Soap Bar creates a creamy lather that cleanses without stripping the skin. Designed for everyday use, this bar leaves skin feeling refreshed, soft, and lightly scented with calming lavender.",
      "Free of parabens, paraffins, phthalates, GMOs, and petrochemicals. Treat yourself to our luxuriously rich bar soap, delicately scented and made with pure ingredients.",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Sodium Laurate, Sodium Hydroxide, Sodium Sulphate, Sodium Chloride, Potassium Hydroxide, Tetrasodium EDTA, Talcum Powder Water Solvent, Propylene Glycol, Sorbitol, Stearic Acid, Citric Acid, Glycerine, Sine Adipe Lac, Castor Oil, Olea Europaea Fruit Oil, Lavandula Angustifolia Flower Oil, CI 77891 Titanium Dioxide, CI 77742 Purple Colourant",
    film: suppliedFilm("lavender", "Lavender", "the purple bar among lavender sprigs as foam rises, then lathered on the face"),
    accent: "var(--botanical-lavender)",
  }),
  product({
    slug: "aloe-vera",
    barColour: "green",
    variety: "Aloe Vera",
    tagline: "The K-beauty promise.",
    subLine: "Fresh, dewy, minimal.",
    mood: "Fresh, soothing moisture",
    origin: {
      place: "Seoul, Korea",
      story:
        "As a skincare enthusiast, aloe vera had to be part of the collection. Korean skincare introduced me to aloe vera as a staple for soothing, fresh and hydrated-feeling skin.",
    },
    artwork: { src: "/brand-assets/flavors/aloe-vera-bar.webp", alt: "Aloe Vera concept artwork: a green Wonder bar with fresh aloe leaves" },
    // Audit slides 36 (description) and 37 (ingredients), word for word.
    description: [
      "Immerse yourself in a rich lather and a delightful scent while treating your skin to a nourishing cleanse. This soap works in two ways: it gently removes the impurities that cause dull skin, and it cares for your skin while preserving its natural balance. Made with aloe vera, well known for its soothing, moisturizing, and protective properties, it is suitable for all skin types.",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Sodium Laurate, Sodium Hydroxide, Sodium Sulphate, Sodium Chloride, Potassium Hydroxide, Tetrasodium EDTA, Talcum Powder Water Solvent, Propylene Glycol, Sorbitol, Stearic Acid, Citric Acid, Glycerine, Sine Adipe Lac, Castor Oil, Olea Europaea Fruit Oil, Aloe Barbadensis Extract, CI 77891 Titanium Dioxide, CI 61570 Green Colourant",
    film: suppliedFilm("aloe-vera", "Aloe Vera", "aloe gel dripping from a leaf onto the green bar, then lathered between the hands"),
    accent: "var(--botanical-aloe-vera)",
  }),
  product({
    slug: "lemon",
    barColour: "yellow",
    variety: "Lemon",
    tagline: "An Amalfi sunset.",
    subLine: "Bright, zesty, golden hour.",
    mood: "A citrus afternoon",
    origin: {
      place: "Amalfi, Italy",
      story:
        "Wonder was born in Amalfi, on a sunny afternoon, while I was eating a lemon sorbet. The fresh, bright citrus stopped me in my tracks. I thought: I want my soap to smell like this.",
    },
    artwork: { src: "/brand-assets/flavors/lemon-bar.webp", alt: "Lemon concept artwork: a yellow Wonder bar with lemon slices and lather" },
    // Audit slides 30 (description) and 31 (ingredients), word for word.
    description: [
      "Each of these incredibly nourishing, balancing, hydrating, and protective delights starts with a powerful foundation that includes Lemon. These natural wonders have antibacterial, humectant, and antioxidant properties. All are fragranced with the clear, sweet scent of fresh, zesty lemon, which reminds you of Italian sorbets and sunsets in Amalfi. Freshness and summer love are what this bar encapsulates.",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Sodium Laurate, Sodium Hydroxide, Sodium Sulphate, Sodium Chloride, Potassium Hydroxide, Tetrasodium EDTA, Talcum Powder Water Solvent, Propylene Glycol, Sorbitol, Stearic Acid, Citric Acid, Glycerine, Sine Adipe Lac, Castor Oil, Olea Europaea Fruit Oil, Leomon Peel Oil, CI 77891 Titanium Dioxide, CI 47005 Yellow Colourant",
    accent: "var(--botanical-lemon)",
  }),
  product({
    slug: "coconut",
    barColour: "white",
    variety: "Coconut",
    tagline: "Sipping coconuts in Bali.",
    subLine: "Warm, creamy, barefoot.",
    mood: "The island daydream",
    origin: {
      place: "Bali, Indonesia",
      story:
        "Bali was our honeymoon. Warm sand, ocean air and coconut everywhere. I can't imagine travelling without coconut, so it came home with me, in a bar.",
    },
    artwork: { src: "/brand-assets/flavors/coconut-bar.webp", alt: "Coconut concept artwork: a white Wonder bar with coconut halves and creamy lather" },
    // Audit slides 32 (description) and 33 (ingredients), word for word.
    description: [
      "This refreshing, cooling coconut scent floods your skin and provides a sense of relief on hot summer days. Coconut has the vibrant freshness of the air after a thunderstorm, and the refreshing feeling of a shower under a waterfall, creating a decadent bathing experience. This bar also has anti-ageing properties that will leave your skin silky soft and radiant. This is summer in a bar!",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Sodium Laurate, Sodium Hydroxide, Sodium Sulphate, Sodium Chloride, Potassium Hydroxide, Tetrasodium EDTA, Talcum Powder Water Solvent, Propylene Glycol, Sorbitol, Stearic Acid, Citric Acid, Glycerine, Sine Adipe Lac, Castor Oil, Olea Europaea Fruit Oil, Coconut Oil, CI 77891 Titanium Dioxide",
    accent: "var(--botanical-coconut)",
  }),
]

export const productSlugs = products.map((p) => p.slug)

export const productBySlug = (slug: string | null | undefined) => products.find((p) => p.slug === slug)
