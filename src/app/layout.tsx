import type { Metadata } from "next"
import localFont from "next/font/local"

import { EmailPopup } from "@/components/email-popup"
import { RevealObserver } from "@/components/reveal-observer"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { site } from "@/content/site"

import "./globals.css"

// The starter's two faces, self-hosted from the client's font files (brief §3).
const against = localFont({
  src: "../fonts/against-regular.ttf",
  weight: "400",
  variable: "--font-against",
  display: "swap",
})

const abhaya = localFont({
  src: "../fonts/AbhayaLibre-SemiBold.ttf",
  weight: "600",
  variable: "--font-abhaya",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s — ${site.brand}` },
  description: site.seo.description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `js` (added before paint) enables the scroll reveals; suppressHydrationWarning covers that class.
    <html lang="en" className={`${against.variable} ${abhaya.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* If the reveal observer hasn't started within 3 s (script error, very slow device), drop the
            flag so nothing stays hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!('revealReady' in d.dataset))d.classList.remove('js')},3000)})(document.documentElement)",
          }}
        />
      </head>
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <EmailPopup />
        <RevealObserver />
      </body>
    </html>
  )
}
