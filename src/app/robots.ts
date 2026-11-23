import type { MetadataRoute } from "next"

import { site } from "@/content/site"

// /robots.txt (Next file convention, app/robots.ts). The host comes from site.url, the one place the domain
// is written. The *.vercel.app hosts are kept out of search separately by an X-Robots-Tag header (next.config.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).href,
  }
}
