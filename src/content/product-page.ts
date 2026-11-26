// Labels for each flavour page (/collection/[slug]) added for the client's website audit
// (2026-11, "Website Audit .pptx"):
//   slide 26 — pack views for each flavour (the owner removed the side views on 2026-11-26)
//   slide 27 — "Add description and ingredients on each flavour"
//   slide 28 — "Do add net weight of the soap for each flavour – 125 grms"
//   slide 44 — "Actual video of soap" (Lavender and Aloe Vera only; supplied clips)
// Short labels only; the per-flavour copy itself lives in products.ts.

export const productPage = {
  views: {
    /** Accessible name of the view switcher, after the variety: "Lavender pack views". */
    list: "pack views",
    front: "Front",
    back: "Back",
    inside: "Inside",
    video: "Video",
  },
  /** The Inside view: the bar in its own colour, cut out from the client's soap photo (products.ts). */
  inside: {
    note: "The bar inside the box",
  },
  details: {
    description: "Description",
    ingredients: "Ingredients",
    netWeight: "Net weight",
  },
  /** Audit slide 28: "125 GRMS", the same for all five flavours. */
  netWeight: "125 g",
} as const
