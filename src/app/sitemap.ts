import type { MetadataRoute } from "next"

import { products } from "@/content/products"
import { barHref, nav, site } from "@/content/site"

// /sitemap.xml (Next file convention, app/sitemap.ts): the ten routes, i.e. the five tabs and the five
// flavour pages, on site.url. No lastModified: under cacheComponents a prerendered file must not read the
// clock, and a fixed date would go stale.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...nav.map((item) => item.href), ...products.map((p) => barHref(p.slug))]
  return paths.map((path) => ({ url: new URL(path, site.url).href }))
}
