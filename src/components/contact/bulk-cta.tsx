"use client"

import { useRouter } from "next/navigation"
import { ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Pre-sets the form's enquiry type (via ?type=bulk, which ContactForm reads) and scrolls to it. */
export function BulkCta({ label }: { label: string }) {
  const router = useRouter()
  return (
    <Button
      asChild
      variant="wonder-outline"
      size="wonder"
      className="mt-7 border-gilt text-paper [--btn-fill:var(--gilt)] hover:text-ink"
    >
      <a
        href="/contact?type=bulk#enquiry"
        onClick={(e) => {
          e.preventDefault()
          router.replace("/contact?type=bulk", { scroll: false })
          window.dispatchEvent(new CustomEvent("wonder:enquiry-type", { detail: "bulk" }))
          document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" })
          document.getElementById("enquiry-name")?.focus({ preventScroll: true })
        }}
      >
        {label} <ArrowDown aria-hidden className="size-3.5" />
      </a>
    </Button>
  )
}
