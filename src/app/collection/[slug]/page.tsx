import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BarHero } from "@/components/bar/bar-hero"
import { BarSkeleton } from "@/components/bar/bar-skeleton"
import { BarStory } from "@/components/bar/bar-story"
import { PageCta } from "@/components/brand/page-cta"
import { ProductCard } from "@/components/brand/product-card"
import { SplitText } from "@/components/brand/split-text"
import { collection } from "@/content/collection"
import { productBySlug, products } from "@/content/products"
import { barHref, ordersCta, site } from "@/content/site"
import { reveal, revealGroup } from "@/lib/reveal"

type Params = PageProps<"/collection/[slug]">["params"]

// One page per flavour (deck slide 17: "Each product page needs …"): definition with the pack views,
// history beside the flavour's campaign portrait, the other four flavours and the bulk-orders band.
// All five are prerendered.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/collection/[slug]">): Promise<Metadata> {
  const product = productBySlug((await params).slug)
  if (!product) return {}
  // The tagline has no full stop (display line) and the sub-line ends with one, so the description reads
  // "Wonder Beauty Bar — Rose. Meet me in Paris. Soft petals, golden hour."
  const title = product.variety
  const description = `${product.name}. ${product.tagline}. ${product.subLine}`
  const path = barHref(product.slug)
  // A child's openGraph/twitter replaces the layout's whole object, so the shared fields are repeated here.
  // The social title matches the page's <title> (layout template "%s — Royal Basket"); og:url is the canonical
  // URL on site.url. The og:image still comes from app/opengraph-image.jpg.
  const socialTitle = `${title} — ${site.brand}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.brand, title: socialTitle, description, url: new URL(path, site.url).href },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  }
}

// Everything here depends on the URL's slug, so it sits under <Suspense>: the route's App Shell is
// the skeleton, which keeps client navigation instant (Partial Prefetching). Flavour links also use
// prefetch={true}, which resolves the slug ahead of the click, so the skeleton rarely shows.
export default function BarPage({ params }: PageProps<"/collection/[slug]">) {
  return (
    <Suspense fallback={<BarSkeleton />}>
      <Bar params={params} />
    </Suspense>
  )
}

async function Bar({ params }: { params: Params }) {
  const product = productBySlug((await params).slug)
  if (!product) notFound()
  const { bar } = collection
  const others = products.filter((p) => p.slug !== product.slug)

  return (
    <>
      <BarHero product={product} />
      <BarStory product={product} />

      <section aria-labelledby="others-heading" className="px-section py-section">
        <h2 {...reveal()} id="others-heading" className="font-display type-section mb-heading text-center">
          <SplitText text={bar.othersHeading} />
        </h2>
        <div {...revealGroup} className="mx-auto grid max-w-[1000px] grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-4">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <PageCta
        eyebrow={bar.ctaEyebrow}
        heading={bar.ctaHeading}
        primary={{ label: ordersCta.label, href: `/contact?type=bulk&product=${product.slug}` }}
        secondary={{ label: bar.breadcrumb, href: "/collection" }}
      />
    </>
  )
}
