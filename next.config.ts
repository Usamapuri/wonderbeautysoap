import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Next 16 optimizes a local image with a query string only if it matches a pattern here. Every local image
  // without a query stays allowed; the art files replaced in place under home-hero-art/ carry the version
  // suffix (src/content/products.ts ART_VERSION; keep the two in step when bumping it).
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      { pathname: "/brand-assets/home-hero-art/**", search: "?v=r9" },
    ],
  },
  // Keep the *.vercel.app URLs out of search; only the custom domain should be indexed.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  // "In the City" was renamed "Around the World" (client website brief deck, 2026-10-25).
  // No host redirect here: www.royalbasketgroup.com is the primary domain on Vercel and the apex redirects
  // to it at the platform level (owner, 2026-11-23). A www/apex rule in this file would loop.
  async redirects() {
    return [{ source: "/in-the-city", destination: "/around-the-world", permanent: true }];
  },
};

export default nextConfig;
