import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { ProductCard } from "@/components/brand/product-card"
import { SectionHeading } from "@/components/brand/section-heading"
import { Button } from "@/components/ui/button"
import { home } from "@/content/home"
import { products } from "@/content/products"
import { reveal, revealGroup } from "@/lib/reveal"
import { cn } from "@/lib/utils"

// Products: all five packs, each opening its own flavour page (deck slide 3).
export function CollectionPreview() {
  const { products: section } = home
  return (
    <section
      aria-labelledby="collection-heading"
      className="relative overflow-hidden px-section py-section before:pointer-events-none before:absolute before:top-[-205px] before:left-[-190px] before:size-[390px] before:rounded-full before:border before:border-gold/25 after:pointer-events-none after:absolute after:top-[-280px] after:left-[-265px] after:size-[540px] after:rounded-full after:border after:border-gold/25"
    >
      <SectionHeading id="collection-heading" eyebrow={section.eyebrow} heading={section.heading} body={section.body} />
      <div {...revealGroup} className="relative z-10 mx-auto grid max-w-[1210px] grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-5">
        {products.map((p, i) => (
          <ProductCard
            key={p.slug}
            product={p}
            index={i}
            className={cn(i === products.length - 1 && "col-span-2 w-[calc(50%-5px)] justify-self-center sm:w-[calc(50%-7px)] md:col-span-1 md:w-auto md:justify-self-stretch")}
          />
        ))}
      </div>
      <div {...reveal(200)} className="mt-[38px] flex justify-center">
        <Button asChild variant="wonder-outline" size="wonder">
          <Link href={section.more.href}>
            {section.more.label} <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
