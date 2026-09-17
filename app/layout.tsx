import type { Metadata } from "next"
import { Raleway } from "next/font/google"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import {
  IMMOASK_FB_APP_ID,
  IMMOASK_FB_PAGES,
  immoAskIcons,
  immoAskSocialOpenGraph,
  immoAskSocialTwitter,
} from "@/lib/seo/site"

import "./globals.css"

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.immoask.com"),

  title: {
    default: "ImmoAsk – Immobilier au Togo",
    template: "%s | ImmoAsk",
  },

  description:
    "Trouvez des appartements, maisons, terrains et opportunités immobilières avec ImmoAsk.",

  keywords: [
    "immobilier Togo",
    "immobilier Lomé",
    "appartement à louer",
    "maison à vendre",
    "terrain à vendre",
  ],

  icons: immoAskIcons,

  openGraph: immoAskSocialOpenGraph({
    images: ["/images/og-default.jpg"],
  }),

  twitter: immoAskSocialTwitter(),

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={raleway.variable}>
      <head>
        <meta property="fb:app_id" content={IMMOASK_FB_APP_ID} />
        <meta property="fb:pages" content={IMMOASK_FB_PAGES} />
        <meta property="og:rich_attachment" content="true" />
      </head>
      <body className={`${raleway.className} flex min-h-screen flex-col bg-background font-sans text-foreground antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
