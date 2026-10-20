import { Suspense } from "react"
import type { Metadata } from "next"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Em } from "@/components/brand/page-hero"
import { SocialTextLinks } from "@/components/brand/social-links"
import { BulkPanel } from "@/components/contact/bulk-panel"
import { ContactDetails } from "@/components/contact/contact-details"
import { ContactForm } from "@/components/contact/contact-form"
import { contact } from "@/content/contact"
import { revealGroup } from "@/lib/reveal"

export const metadata: Metadata = contact.seo

// Brief §4.5 order: direct details → bulk & trade panel → form (→ response time, only if confirmed).
export default function ContactPage() {
  const { heading, social } = contact
  return (
    <>
      <section aria-labelledby="contact-title" className="rise-group px-[22px] pt-[56px] pb-6 text-center sm:px-6 sm:pt-[100px] sm:pb-[55px]">
        <Eyebrow center>{heading.eyebrow}</Eyebrow>
        <h1
          id="contact-title"
          className="font-display mt-6 mb-4 text-[clamp(60px,18vw,95px)] leading-[0.8] tracking-[-0.055em] sm:mt-7 sm:mb-[22px] md:text-[clamp(68px,9vw,132px)]"
        >
          {heading.title.before}
          <Em>{heading.title.emphasis}</Em>
        </h1>
        <p className="mx-auto max-w-[390px] text-xs leading-[1.9] text-ink-soft sm:text-[13px]">{heading.body}</p>
      </section>

      <div className="rise-group mx-auto grid max-w-[1110px] items-start gap-[13px] px-4 pt-5 pb-[75px] sm:gap-[35px] sm:px-6 sm:pt-[30px] sm:pb-[120px] md:grid-cols-[0.75fr_1.25fr] md:gap-[clamp(38px,6vw,90px)]">
        <div className="flex flex-col gap-8 md:pt-[30px]">
          <ContactDetails />
          <BulkPanel />
        </div>
        <Suspense fallback={<div className="min-h-[640px] bg-sand" />}>
          <ContactForm />
        </Suspense>
      </div>

      <section {...revealGroup} aria-labelledby="social-heading" className="bg-wheat px-5 pt-[55px] pb-[68px] text-center sm:pt-[70px] sm:pb-[85px]">
        <Eyebrow center>{social.eyebrow}</Eyebrow>
        <h2 id="social-heading" className="font-display mt-5 mb-6 text-[clamp(44px,5vw,68px)]">
          {social.heading}
        </h2>
        <SocialTextLinks />
      </section>
    </>
  )
}
