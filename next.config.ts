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
  async redirects() {
    return [{ source: "/in-the-city", destination: "/around-the-world", permanent: true }];
  },
};

export default nextConfig;
