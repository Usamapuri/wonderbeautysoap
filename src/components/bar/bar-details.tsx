import { productPage } from "@/content/product-page"
import type { Product } from "@/content/products"
import { revealGroup } from "@/lib/reveal"

// The flavour's description and ingredients (client audit slide 27), shown in full and word for word
// as supplied (slides 28–37). Stacked panels after the client's reference product page (slide 43).
export function BarDetails({ product }: { product: Product }) {
  const { details } = productPage
  return (
    <div {...revealGroup} className="mt-12 flex flex-col gap-3 md:mt-14">
      <section aria-labelledby="bar-description-heading" className="rounded-lg border border-line bg-parchment p-6 sm:p-8">
        <h2 id="bar-description-heading" className="text-[9px] font-medium tracking-[0.24em] text-gold uppercase">
          {details.description}
        </h2>
        <div className="mt-4 flex flex-col gap-3.5 text-[12px] leading-[1.75] text-ink-soft">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section aria-labelledby="bar-ingredients-heading" className="rounded-lg border border-line bg-parchment p-6 sm:p-8">
        <h2 id="bar-ingredients-heading" className="text-[9px] font-medium tracking-[0.24em] text-gold uppercase">
          {details.ingredients}
        </h2>
        <p className="mt-4 text-[11px] leading-[1.8] text-ink-soft">{product.ingredients}</p>
        <p className="mt-5 border-t border-line pt-4 text-[11px] text-ink-soft">
          <span className="mr-2 text-[8px] tracking-[0.18em] text-ink-muted uppercase">{details.netWeight}</span>
          {product.netWeight}
        </p>
      </section>
    </div>
  )
}
