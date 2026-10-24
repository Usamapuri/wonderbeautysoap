import type { Metadata } from "next"
import localFont from "next/font/local"

import { EmailPopup } from "@/components/email-popup"
import { FloatingActions } from "@/components/floating-actions"
import { RevealObserver } from "@/components/reveal-observer"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { site } from "@/content/site"

import "./globals.css"

// The Bolt prototype's faces (DM Sans + DM Serif Display, OFL, self-hosted from Google Fonts).
// size-adjust keeps the site's type scale, which was tuned for the larger Against / Abhaya Libre
// faces: DM Sans has a ~1.38× smaller x-height than Against, DM Serif Display a ~1.1× larger one.
const dmSans = localFont({
  src: [
    { path: "../fonts/DMSans-Variable.woff2", weight: "400 600", style: "normal" },
    { path: "../fonts/DMSans-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "132%" }],
})

const dmSerif = localFont({
  src: [
    { path: "../fonts/DMSerifDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/DMSerifDisplay-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-dm-serif",
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "92%" }],
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
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} antialiased`} suppressHydrationWarning>
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
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-ink px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        <EmailPopup />
        <RevealObserver />
      </body>
    </html>
  )
}
