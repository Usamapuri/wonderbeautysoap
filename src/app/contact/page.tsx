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

export const metadata: Metadata = contact.seo

// Get in Touch (deck slide 19). The site targets bulk orders, so the page's centre is one enquiry
// card: the bulk brief (left) and the form (right) share a frame, height and shadow. Contact details
// sit in an aligned strip below it; socials in the closing band.
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
          <SplitText text={heading.title.before.trim()} now />{" "}
          <Em>
            <SplitText text={heading.title.emphasis} now start={1} />
          </Em>
        </h1>
        <p className="mx-auto max-w-[390px] text-xs leading-[1.9] text-ink-soft sm:text-[13px]">{heading.body}</p>
      </section>

      <div className="rise-group mx-auto max-w-[1180px] px-4 pt-5 pb-[75px] sm:px-6 sm:pt-[30px] sm:pb-[110px]">
        <div className="relative grid overflow-hidden rounded-lg border border-gold/30 shadow-pop before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1 before:bg-linear-to-r before:from-gold before:via-gilt before:to-gold md:grid-cols-[0.82fr_1.18fr]">
          <BulkPanel />
          <Suspense fallback={<div className="min-h-[640px] bg-stone" />}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="mt-10 sm:mt-14">
          <ContactDetails />
        </div>
      </div>

      <section {...revealGroup} aria-labelledby="social-heading" className="bg-stone px-5 pt-[55px] pb-[68px] text-center sm:pt-[70px] sm:pb-[85px]">
        <Eyebrow center>{social.eyebrow}</Eyebrow>
        <h2 id="social-heading" className="font-display mt-5 mb-6 text-[clamp(44px,5vw,68px)]">
          {social.heading}
        </h2>
        <SocialTextLinks />
      </section>
    </>
  )
}
