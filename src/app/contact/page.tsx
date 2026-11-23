import { Suspense } from "react"
import type { Metadata } from "next"

import { Eyebrow } from "@/components/brand/eyebrow"
import { Em } from "@/components/brand/em"
import { SocialTextLinks } from "@/components/brand/social-links"
import { BulkPanel } from "@/components/contact/bulk-panel"
import { ContactDetails } from "@/components/contact/contact-details"
import { ContactForm } from "@/components/contact/contact-form"
import { SplitText } from "@/components/brand/split-text"
import { contact } from "@/content/contact"
import { revealGroup } from "@/lib/reveal"

export const metadata: Metadata = { ...contact.seo, alternates: { canonical: "/contact" } }

// Get in Touch (deck slide 19). The site targets bulk orders, so the page's centre is one enquiry
// card: the bulk brief (left) and the form (right) share a frame, height and shadow. The reply-line
// and "Good to know" strip below it was removed (audit slide 47); phone / address appear there only
// once supplied. Socials in the closing band.
export default function ContactPage() {
  const { heading, social } = contact
  return (
    <>
      <section aria-labelledby="contact-title" className="rise-group px-section pt-section text-center">
        <Eyebrow center>{heading.eyebrow}</Eyebrow>
        <h1
          id="contact-title"
          className="font-display type-title mt-6 mb-4 tracking-[-0.04em] sm:mt-7 sm:mb-[22px]"
        >
          <SplitText text={heading.title.before.trim()} now />{" "}
          <Em>
            <SplitText text={heading.title.emphasis} now start={1} />
          </Em>
        </h1>
        <p className="mx-auto max-w-[390px] text-xs leading-[1.9] text-ink-soft sm:text-[13px]">{heading.body}</p>
      </section>

      <div className="rise-group mx-auto max-w-[1180px] px-3 pt-heading pb-section sm:px-5">
        <div className="relative grid overflow-hidden rounded-lg border border-gold/30 shadow-pop before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:bg-linear-to-r before:from-gold before:via-gilt before:to-gold md:grid-cols-[0.82fr_1.18fr]">
          <BulkPanel />
          <Suspense fallback={<div className="min-h-[640px] bg-stone" />}>
            <ContactForm />
          </Suspense>
        </div>
        <ContactDetails />
      </div>

      <section {...revealGroup} aria-labelledby="social-heading" className="bg-stone px-section py-section text-center">
        <Eyebrow center>{social.eyebrow}</Eyebrow>
        <h2 id="social-heading" className="font-display mt-5 mb-6 text-[clamp(44px,5vw,68px)]">
          {social.heading}
        </h2>
        <SocialTextLinks />
      </section>
    </>
  )
}
